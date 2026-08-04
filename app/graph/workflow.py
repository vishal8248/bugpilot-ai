from langgraph.graph import StateGraph, END

from app.state.state import BugState
from app.nodes.classify_issue import classify_issue
from app.nodes.classify_severity import classify_severity
from app.nodes.classify_root_cause import classify_root_cause
from app.nodes.generate_investigation_report import generate_investigation_report

workflow = StateGraph(BugState)

workflow.add_node("classify_issue", classify_issue)
workflow.add_node("classify_severity", classify_severity)
workflow.add_node("classify_root_cause", classify_root_cause)
workflow.add_node("generate_investigation_report", generate_investigation_report)

workflow.set_entry_point("classify_issue")

workflow.add_edge("classify_issue", "classify_severity")
workflow.add_edge("classify_severity", "classify_root_cause")
workflow.add_edge("classify_root_cause", "generate_investigation_report")
workflow.add_edge("generate_investigation_report", END)

graph = workflow.compile()