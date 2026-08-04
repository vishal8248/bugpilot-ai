from app.services.RAG.vector_store import build_vector_store


def retrieve_similar_bugs(closed_tickets, query):

    vector_store = build_vector_store(closed_tickets)

    if vector_store is None:
        return []

    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": 2
        }
    )

    documents = retriever.invoke(query)

    return documents