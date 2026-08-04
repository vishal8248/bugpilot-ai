from langchain_core.messages import HumanMessage

from app.state.state import BugState
from app.prompts.prompts import SEVERITY_PROMPT
from app.utils.llm import llm
from app.schemas.severity import SeverityClassification

def classify_severity(state: BugState) -> BugState:

    prompt = f"""
    {SEVERITY_PROMPT}

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
        SeverityClassification
    )

    response = structured_llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    state["severity"] = response.severity

    return state