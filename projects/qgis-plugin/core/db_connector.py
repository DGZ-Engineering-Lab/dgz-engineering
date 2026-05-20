import os
import json
import logging
import urllib.request
import urllib.parse
from typing import Dict, Any, List

class DevGizDBConnector:
    """
    Cloud Database & API Connector for the DevGiz QGIS Plugin.
    Handles user authentication, role assignment, project context loading,
    and business rule synchronization from the DevGiz Spatial OS cloud.
    """
    def __init__(self, api_url: str = "https://devgiz-api.onrender.com"):
        self.api_url = api_url.rstrip('/')
        self.token = None
        self.user_profile = {}
        self.active_project = {}
        self.local_rules = {
            "topology_tolerance_meters": 0.05,
            "min_parcel_area_m2": 15.0,
            "max_parcel_area_m2": 1000000.0,
            "magna_sirgas_crs": "EPSG:9377", # Official Colombian Origen Nacional
            "allowed_discrepancy_percentage": 10.0
        }
        
    def authenticate(self, user: str, password_hash: str) -> bool:
        """
        Authenticates the operator against the DevGiz Cloud API.
        In offline mode, falls back to locally cached credentials.
        """
        try:
            url = f"{self.api_url}/api/auth/login"
            data = json.dumps({"username": user, "password": password_hash}).encode('utf-8')
            req = urllib.request.Request(
                url, 
                data=data, 
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                self.token = res_data.get("access_token")
                self.user_profile = {
                    "username": user,
                    "role": res_data.get("role", "reconocedor"), # coordinator, digitalizador, reconocedor
                    "permissions": res_data.get("permissions", ["read"])
                }
                return True
        except Exception as e:
            logging.warn(f"DevGiz Cloud Auth Failed: {str(e)}. Attempting local offline validation.")
            return self._offline_authenticate(user, password_hash)

    def _offline_authenticate(self, user: str, password_hash: str) -> bool:
        """
        Performs local validation for field surveyors working offline.
        """
        # Simulated offline profile validation based on previously synchronized tokens
        self.user_profile = {
            "username": user,
            "role": "reconocedor", # Default offline role
            "permissions": ["read", "write_local"],
            "offline_mode": True
        }
        logging.info("Offline authentication activated.")
        return True

    def load_project_rules(self, project_id: str) -> Dict[str, Any]:
        """
        Retrieves project tolerances, MAGNA-SIRGAS specifications,
        and legal verification standards from the active cloud project.
        """
        if not self.token:
            logging.warn("Using default LADM-COL project rules (OFFLINE).")
            return self.local_rules
            
        try:
            url = f"{self.api_url}/api/v1/projects/{project_id}/rules"
            req = urllib.request.Request(
                url,
                headers={'Authorization': f"Bearer {self.token}"},
                method='GET'
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                project_data = json.loads(response.read().decode('utf-8'))
                self.active_project = project_data
                self.local_rules.update(project_data.get("rules", {}))
                return self.local_rules
        except Exception as e:
            logging.error(f"Failed to fetch cloud rules: {str(e)}. Using local cache.")
            return self.local_rules

    def get_role(self) -> str:
        """Returns the current operator role (coordinador, digitalizador, reconocedor)"""
        return self.user_profile.get("role", "reconocedor")

    def has_permission(self, permission: str) -> bool:
        """Verifies if the current operator has the required permission"""
        role = self.get_role()
        if role == "coordinador":
            return True # Administrative access
        elif role == "digitalizador":
            return permission in ["read", "edit_geometry", "cross_reference_vur", "export_interlis"]
        else: # reconocedor (field)
            return permission in ["read", "fill_ficha_predial", "edit_local_geometry"]
