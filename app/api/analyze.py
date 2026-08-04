from fastapi import APIRouter

from app.schemas.bug_request import BugRequest
from app.services.investigation_service import analyze_bug

router = APIRouter()


@router.post("/analyze")
def analyze(request: BugRequest):

    result = analyze_bug(
        title=request.title,
        description=request.description,
        environment=request.environment,
        stack_trace=request.stack_trace,
    )

    return {
        "title": result["title"],
        "description": result["description"],
        "environment": result["environment"],
        "stack_trace": result["stack_trace"],
        "issue_type": result["issue_type"],
        "severity": result["severity"],
        "assigned_team": result["assigned_team"],
        "root_cause": result["root_cause"],
        "investigation_report": result["investigation_report"],
        "similar_bugs": result["similar_bugs"],
    }