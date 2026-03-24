from __future__ import annotations

import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from typing import Any


def send_json(
    handler: BaseHTTPRequestHandler,
    payload: dict[str, Any],
    status: HTTPStatus = HTTPStatus.OK,
) -> None:
    raw = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(raw)))
    handler.end_headers()
    handler.wfile.write(raw)
