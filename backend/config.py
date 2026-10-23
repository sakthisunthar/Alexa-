import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "anthropic")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    AI_MODEL: str = os.getenv("AI_MODEL", "claude-sonnet-4-20250514")
    MCP_SERVER_URL: str = os.getenv("MCP_SERVER_URL", "http://localhost:8001/mcp")
    DB_PATH: str = os.getenv("DB_PATH", "data/trips.db")
    CORS_ORIGINS: list = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000"
    ).split(",")

    @property
    def ai_configured(self) -> bool:
        return bool(self.ANTHROPIC_API_KEY)


settings = Settings()
