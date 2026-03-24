from __future__ import annotations

from typing import Any

from backend.models.repository import DataRepository


class ApiController:
    def __init__(self, repository: DataRepository) -> None:
        self.repository = repository

    def health(self) -> dict[str, Any]:
        return {"ok": True}

    def bootstrap(self) -> dict[str, Any]:
        return self.repository.read_bootstrap()

    def sync(self, payload: dict[str, Any]) -> dict[str, Any]:
        self.repository.replace_all(payload)
        return {"ok": True}
