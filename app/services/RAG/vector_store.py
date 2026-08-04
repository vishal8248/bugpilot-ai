from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def build_vector_store(tickets):

    documents = []

    for ticket in tickets:

        content = f"""
        ========================
        BUG INFORMATION
        ========================
        
        Title:
        {ticket[1]}
        
        Description:
        {ticket[2]}
        
        Environment:
        {ticket[3]}
        
        Stack Trace:
        {ticket[4]}
        
        ========================
        VERIFIED ENGINEER SOLUTION
        ========================
        
        {ticket[10]}
        """

        documents.append(
            Document(
                page_content=content,
                metadata={
                    "ticket_id": ticket[0],
                    "title": ticket[1],
                    "environment": ticket[3],
                    "root_cause": ticket[8],
                },
            )
        )

    if len(documents) == 0:
        return None

    vector_store = FAISS.from_documents(
        documents,
        embeddings,
    )

    return vector_store