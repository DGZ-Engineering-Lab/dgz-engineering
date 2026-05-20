def classFactory(iface):
    """
    QGIS Plugin class factory.
    Loads and instantiates the plugin controller class.
    """
    from .dgz_depurator_plugin import DgzDepuratorPlugin
    return DgzDepuratorPlugin(iface)
