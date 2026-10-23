from pydantic import BaseModel, Field
from typing import Optional


class ToolActivity(BaseModel):
    id: str
    tool: str
    status: str = "success"
    summary: str = ""
    timestamp: str = ""


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    tripId: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    trip: Optional[dict] = None
    toolActivity: list[ToolActivity] = Field(default_factory=list)
