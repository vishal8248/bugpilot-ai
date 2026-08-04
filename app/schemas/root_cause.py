from pydantic import BaseModel, Field

class RootCauseAnalysis(BaseModel):
    root_cause: str = Field(
        description="Most likely technical root cause of the software issue."
    )