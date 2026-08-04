from pydantic import BaseModel, Field

class InvestigationReport(BaseModel):
    investigation_report: str = Field(
        description="Professional investigation report for the software issue."
    )