import pytest

from core.vur_depurator import DgzVurDepurator


@pytest.fixture
def depurator():
    return DgzVurDepurator()


@pytest.mark.parametrize(
    ("calculated", "registered", "expected"),
    [
        (100.0, 100.0, "01_Cruce_Exitoso"),
        (109.9, 100.0, "01_Cruce_Exitoso"),
        (110.0, 100.0, "01_Cruce_Exitoso"),
        (111.0, 100.0, "02_Discrepancia_Area"),
        (50.0, 100.0, "02_Discrepancia_Area"),
        (100.0, 0.0, "04_Omision_Registral"),
        (100.0, -5.0, "04_Omision_Registral"),
    ],
)
def test_evaluate_discrepancy(depurator, calculated, registered, expected):
    status, description = depurator.evaluate_discrepancy(calculated, registered)
    assert status == expected
    assert description


def test_evaluate_discrepancy_respects_custom_tolerance(depurator):
    status, _ = depurator.evaluate_discrepancy(104.0, 100.0, tolerance_percentage=3.0)
    assert status == "02_Discrepancia_Area"
