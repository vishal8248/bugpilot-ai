from app.graph.workflow import graph

from app.services.database_service import (
    save_investigation,
    get_all_investigations,
    get_closed_investigations,
    get_investigation_by_id,
    close_ticket,
    get_closed_tickets_for_rag,
    get_history_ticket as get_history_ticket_db,
)

from app.services.RAG.retriever import retrieve_similar_bugs


def analyze_bug(title, description, environment, stack_trace):

    # Get closed tickets for RAG
    closed_tickets = get_closed_tickets_for_rag()

    # Build search query
    query = f"""
    Title:
    {title}

    Description:
    {description}

    Environment:
    {environment}

    Stack Trace:
    {stack_trace}
    """

    # Retrieve similar bugs
    similar_bugs = retrieve_similar_bugs(
        closed_tickets,
        query,
    )

    print("\n========== SIMILAR BUGS ==========\n")

    rag_context = ""
    similar_bug_list = []

    for doc in similar_bugs:

        print(doc.page_content)
        print("\n=============================\n")

        rag_context += doc.page_content
        rag_context += "\n\n-----------------\n\n"

        similar_bug_list.append(
            {
                "ticket_id": doc.metadata["ticket_id"],
                "title": doc.metadata["title"],
                "environment": doc.metadata["environment"],
                "solution": doc.page_content.split(
                    "VERIFIED ENGINEER SOLUTION"
                )[-1].strip(),
            }
        )

    print("\n================ RAG CONTEXT ================\n")
    print(rag_context)
    print("\n=============================================\n")

    # Initial LangGraph State
    initial_state = {
        "title": title,
        "description": description,
        "environment": environment,
        "stack_trace": stack_trace,

        # RAG
        "rag_context": rag_context,
        "similar_bugs": similar_bug_list,

        # AI Generated
        "issue_type": None,
        "severity": None,
        "assigned_team": None,
        "root_cause": None,
        "investigation_report": None,
    }

    # Run LangGraph
    result = graph.invoke(initial_state)

    # Preserve similar bugs after graph execution
    result["similar_bugs"] = similar_bug_list

    # Save investigation
    save_investigation(result)

    return result


def get_open_tickets():

    return get_all_investigations()


def get_ticket(ticket_id):

    ticket = get_investigation_by_id(ticket_id)

    if ticket is None:
        return None

    closed_tickets = get_closed_tickets_for_rag()

    query = f"""
    Title:
    {ticket[1]}

    Description:
    {ticket[2]}

    Environment:
    {ticket[3]}

    Stack Trace:
    {ticket[4]}
    """

    similar_docs = retrieve_similar_bugs(
        closed_tickets,
        query,
    )

    similar_bugs = []

    for doc in similar_docs:

        # Don't recommend the same ticket
        if doc.metadata["ticket_id"] == ticket[0]:
            continue

        similar_bugs.append(
            {
                "ticket_id": doc.metadata["ticket_id"],
                "title": doc.metadata["title"],
                "environment": doc.metadata["environment"],
                "solution": doc.page_content.split(
                    "VERIFIED ENGINEER SOLUTION"
                )[-1].strip(),
            }
        )

    return {
        "ticket": ticket,
        "similar_bugs": similar_bugs,
    }


def get_history_ticket(ticket_id):

    return get_history_ticket_db(ticket_id)


def close_open_ticket(ticket_id, actual_solution):

    close_ticket(ticket_id, actual_solution)


def get_history_tickets():

    return get_closed_investigations()