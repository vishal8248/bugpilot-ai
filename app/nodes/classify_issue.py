from langchain_core.messages import HumanMessage

from app.state.state import BugState
from app.prompts.prompts import EXTRACT_INFORMATION_PROMPT
from app.utils.llm import llm
from app.schemas.classification import IssueClassification


def classify_issue(state: BugState) -> BugState:

    prompt = f"""
    {EXTRACT_INFORMATION_PROMPT}

    Title:
    {state["title"]}

    Description:
    {state["description"]}

    Environment:
    {state["environment"]}

    Stack Trace:
    {state["stack_trace"]}
    """

    structured_llm = llm.with_structured_output(
        IssueClassification
    )

    response = structured_llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    state["issue_type"] = response.issue_type
    state["assigned_team"] = response.assigned_team

    return state