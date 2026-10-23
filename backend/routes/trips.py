from fastapi import APIRouter, HTTPException
from ..models import TripRequest
from ..services.trip_service import generate_trip, get_trip

router = APIRouter()


@router.post("/api/trips/generate")
async def create_trip(request: TripRequest):
    try:
        trip = generate_trip(request.model_dump())
        return trip
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate trip: {str(e)[:200]}")


@router.get("/api/trips/{trip_id}")
async def retrieve_trip(trip_id: str):
    trip = get_trip(trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@router.post("/api/trips/{trip_id}/modify")
async def modify_trip(trip_id: str, body: dict):
    trip = get_trip(trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    from ..services.ai_service import generate_ai_response

    message = body.get("message", "")
    if not message:
        raise HTTPException(status_code=422, detail="Message is required")

    result = await generate_ai_response(message, trip)
    return result


@router.get("/api/trips/{trip_id}/tools")
async def get_tools(trip_id: str):
    return {"tools": []}
