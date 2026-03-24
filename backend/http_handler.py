from __future__ import annotations

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from backend.controllers.api_controller import ApiController
from backend.models.repository import RepositoryError
from backend.views.json_view import send_json


class AppHandler(SimpleHTTPRequestHandler):
    controller: ApiController
    static_dir: Path

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(self.static_dir), **kwargs)

    def _read_json_body(self) -> dict[str, Any]:
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        if not raw:
            return {}
        return json.loads(raw.decode("utf-8"))

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            send_json(self, self.controller.health())
            return

        if parsed.path == "/api/bootstrap":
            send_json(self, self.controller.bootstrap())
            return

        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path == "/api/sync":
            try:
                payload = self._read_json_body()
                result = self.controller.sync(payload)
            except (json.JSONDecodeError, ValueError, RepositoryError) as exc:
                send_json(self, {"ok": False, "error": str(exc)}, status=HTTPStatus.BAD_REQUEST)
                return

            send_json(self, result)
            return

        send_json(self, {"ok": False, "error": "Not found"}, status=HTTPStatus.NOT_FOUND)
