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
    return {
        "engine": "postgres",
        "database_url": os.getenv("DATABASE_URL", "").strip(),
        "host": os.getenv("PGHOST", "127.0.0.1"),
        "port": int(os.getenv("PGPORT", "5432")),
        "user": os.getenv("PGUSER", "postgres"),
        "password": os.getenv("PGPASSWORD", "postgres"),
        "database": os.getenv("PGDATABASE", "campus_spider"),
        "sslmode": os.getenv("PGSSLMODE", "require"),
    }
