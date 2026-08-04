from pydantic import BaseModel, Field

class IssueClassification(BaseModel):
    issue_type: str = Field(
        description="Category of the software issue"
    )

    assigned_team: str = Field(
        description="Team responsible for handling the issue"
    )