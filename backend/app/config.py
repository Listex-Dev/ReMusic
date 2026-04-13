from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "ReMusic API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api"
    cors_origins: list[str] = ["http://localhost:3000"]
    request_timeout_seconds: float = 15.0

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
