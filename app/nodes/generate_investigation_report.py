from langchain_core.messages import HumanMessage

from app.state.state import BugState
from app.prompts.prompts import INVESTIGATION_REPORT_PROMPT
from app.utils.llm import llm
from app.schemas.investigation_report import InvestigationReport

def generate_investigation_report(state: BugState) -> BugState:

    prompt = f"""
    {INVESTIGATION_REPORT_PROMPT}

    You are investigating a software bug.

    Below are previous similar production incidents retrieved from the knowledge base.

    If they are relevant, use them while generating your investigation.
    If they are not relevant, ignore them.

    ==============================
    PREVIOUS SIMILAR INCIDENTS
    ==============================

    {state["rag_context"]}

    ==============================
    CURRENT BUG
    ==============================

    Title:
    {state["title"]}

    Description:
    {state["description"]}

    Environment:
    {state["environment"]}

    Stack Trace:
    {state["stack_trace"]}

    Issue Type:
    {state["issue_type"]}

    Severity:
    {state["severity"]}

    Assigned Team:
    {state["assigned_team"]}

    Root Cause:
    {state["root_cause"]}
    """

    structured_llm = llm.with_structured_output(
       InvestigationReport
    )

    response = structured_llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    state["investigation_report"] = response.investigation_report

    return state