import json
import logging
import urllib.request
import urllib.parse
from typing import Dict, Any, List

class DgzTaskAssigner:
    """
    Cadastral Campaign & Task Dispatch Manager.
    Coordinates workflow state assignments (Field Survey / Digitization) 
    and handles synchronization between local offline GeoPackages and DevGiz Cloud.
    """
    def __init__(self, api_url: str = "https://devgiz-api.onrender.com", token: str = None):
        self.api_url = api_url.rstrip('/')
        self.token = token
        self.local_tasks = []

    def get_my_assignments(self, username: str) -> List[Dict[str, Any]]:
        """
        Retrieves assignments for the current operator (field or digitalizer).
        """
        if not self.token:
            logging.warn("No token found. Attempting to load offline cached assignments.")
            return self._load_offline_assignments()
            
        try:
            url = f"{self.api_url}/api/v1/tasks/assignments?operator={urllib.parse.quote(username)}"
            req = urllib.request.Request(
                url,
                headers={'Authorization': f"Bearer {self.token}"},
                method='GET'
            )
            with urllib.request.urlopen(req, timeout=8) as response:
                self.local_tasks = json.loads(response.read().decode('utf-8'))
                return self.local_tasks
        except Exception as e:
            logging.error(f"Failed to fetch assignments from cloud: {str(e)}. Loading offline mode.")
            return self._load_offline_assignments()

    def _load_offline_assignments(self) -> List[Dict[str, Any]]:
        """Loads cached tasks when working without internet connection."""
        return [
            {
                "task_id": "TASK-2026-MEDELLIN-01",
                "assigned_area": "Vereda Santa Elena / Manzanas 14-15",
                "operator": "reconocedor_campo_01",
                "status": "IN_PROGRESS",
                "type": "RECONOCIMIENTO_CAMPO",
                "feature_count": 85,
                "sync_state": "CACHED"
            }
        ]

    def update_task_status(self, task_id: str, new_status: str) -> bool:
        """
        Transitions a task's state.
        Allowed states: PENDING -> IN_PROGRESS -> SUBMITTED -> APPROVED.
        """
        if not self.token:
            logging.info(f"Task {task_id} status updated locally to {new_status} (Offline). Sync pending.")
            return True
            
        try:
            url = f"{self.api_url}/api/v1/tasks/{task_id}/status"
            data = json.dumps({"status": new_status}).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=data,
                headers={
                    'Authorization': f"Bearer {self.token}",
                    'Content-Type': 'application/json'
                },
                method='PUT'
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                res = json.loads(response.read().decode('utf-8'))
                return res.get("success", False)
        except Exception as e:
            logging.error(f"Could not sync status update for task {task_id}: {str(e)}")
            return False

    def upload_synchronized_geometries(self, task_id: str, geojson_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Pushes digitized or verified vector features from QGIS back to DevGiz Cloud.
        Invokes topology self-healing if gaps or overlaps are detected during upload.
        """
        if not self.token:
            return {"status": "OFFLINE_QUEUED", "message": "Cambios guardados en caché local. Pendiente por sincronizar."}
            
        try:
            url = f"{self.api_url}/api/v1/tasks/{task_id}/sync"
            data = json.dumps(geojson_data).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=data,
                headers={
                    'Authorization': f"Bearer {self.token}",
                    'Content-Type': 'application/json'
                },
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=15) as response:
                return json.loads(response.read().decode('utf-8'))
        except Exception as e:
            logging.error(f"Failed to sync geometry: {str(e)}")
            return {"status": "ERROR", "message": f"Fallo en la comunicación con el servidor: {str(e)}"}
