from langchain_core.messages import HumanMessage

from app.state.state import BugState
from app.prompts.prompts import ROOT_CAUSE_PROMPT
from app.utils.llm import llm
from app.schemas.root_cause import RootCauseAnalysis

def classify_root_cause(state: BugState) -> BugState:

    prompt = f"""
    {ROOT_CAUSE_PROMPT}

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
        RootCauseAnalysis
    )

    response = structured_llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    state["root_cause"] = response.root_cause

    return state