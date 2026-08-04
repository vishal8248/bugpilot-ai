from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

load_dotenv()

llm = init_chat_model(
    model="llama-3.3-70b-versatile",
    model_provider="groq",
    temperature=0,
)