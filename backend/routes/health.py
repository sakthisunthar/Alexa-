from fastapi import APIRouter
from ..config import settings

router = APIRouter()


@router.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "0.1.0",
        "aiProvider": settings.AI_PROVIDER if settings.ai_configured else "none",
        "aiConfigured": settings.ai_configured,
        "mcpServerUrl": settings.MCP_SERVER_URL,
    }
