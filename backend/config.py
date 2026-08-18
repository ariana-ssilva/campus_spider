from __future__ import annotations

import os
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_env_file() -> None:
    """Load key/value pairs from .env into process environment (best effort)."""
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"").strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


_load_env_file()


def get_db_config() -> dict[str, Any]:
    db_url = os.getenv("DATABASE_URL", "").strip()
    db_url_external = os.getenv("DATABASE_URL_EXTERNAL", "").strip()
    engine = os.getenv("DB_ENGINE", "").strip().lower()
    if not engine:
        engine = "postgres" if db_url else "mysql"

    return {
        "engine": engine,
        "database_url": db_url,
        "database_url_external": db_url_external,
        "host": os.getenv("DB_HOST", "127.0.0.1"),
        "port": int(os.getenv("DB_PORT", "3308")),
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv("DB_PASSWORD", "123456"),
        "database": os.getenv("DB_NAME", "campus_spider"),
        "sslmode": os.getenv("DB_SSLMODE", "prefer"),
    }
