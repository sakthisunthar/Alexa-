from fastapi import APIRouter, HTTPException
from ..models import ChatRequest
from ..services.ai_service import generate_ai_response
from ..services.trip_service import get_trip

router = APIRouter()


@router.post("/api/chat")
async def chat(request: ChatRequest):
    trip_context = None
    if request.tripId:
        trip_context = get_trip(request.tripId)

    try:
        result = await generate_ai_response(request.message, trip_context)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Chat processing failed: {str(e)[:200]}"
        )
