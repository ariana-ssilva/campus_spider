#!/usr/bin/env python3
"""Entrypoint do backend Python seguindo organizacao MVC."""

from __future__ import annotations

from http.server import ThreadingHTTPServer

from backend.config import BASE_DIR, get_db_config
from backend.controllers.api_controller import ApiController
from backend.http_handler import AppHandler
from backend.models.repository import DataRepository


def main() -> None:
    db_config = get_db_config()
    repository = DataRepository(db_config)
    controller = ApiController(repository)

    AppHandler.controller = controller
    AppHandler.static_dir = BASE_DIR

    server = ThreadingHTTPServer(("0.0.0.0", 8080), AppHandler)
    print(
        "Servidor iniciado em http://localhost:8080 | "
        f"MySQL: {db_config['user']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    )
    server.serve_forever()


if __name__ == "__main__":
    main()
