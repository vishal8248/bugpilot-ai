from pydantic import BaseModel, Field

class SeverityClassification(BaseModel):
    severity: str = Field(
        description="Severity level of the software issue. Choose only one: Low, Medium, High, Critical."
    )