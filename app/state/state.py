from typing import TypedDict, Optional


class BugState(TypedDict):

    # User Input
    title: str
    description: str
    environment: str
    stack_trace: Optional[str]

    # RAG
    rag_context: Optional[str]
    similar_bugs: list

    # NEW
    similar_bugs: list

    # AI Generated
    issue_type: Optional[str]
    severity: Optional[str]
    assigned_team: Optional[str]
    root_cause: Optional[str]
    investigation_report: Optional[str]