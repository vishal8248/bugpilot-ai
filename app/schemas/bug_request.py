from pydantic import BaseModel
from typing import Optional


class BugRequest(BaseModel):
    title: str
    description: str
    environment: str
    stack_trace: Optional[str] = ""