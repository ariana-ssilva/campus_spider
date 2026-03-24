from __future__ import annotations

from typing import Any

try:
    import psycopg
    from psycopg import Error as PsycopgError
    from psycopg.rows import dict_row
except ImportError as exc:  # pragma: no cover
    psycopg = None
    IMPORT_ERROR = exc

    class PsycopgError(Exception):
        """Fallback error when psycopg is unavailable."""
else:
    IMPORT_ERROR = None


class RepositoryError(Exception):
    """Application-level repository error for database operations."""


class DataRepository:
    def __init__(self, config: dict[str, Any]) -> None:
        self.config = config
        self._init_schema()

    def _connect(self):
        if psycopg is None:
            raise RuntimeError(
                "Pacote psycopg nao encontrado no ambiente Python ativo. "
                f"Detalhe: {IMPORT_ERROR}"
            )

        database_url = str(self.config.get("database_url") or "").strip()
        if database_url:
            return psycopg.connect(database_url, sslmode=self.config.get("sslmode", "require"))

        return psycopg.connect(
            host=self.config.get("host", "127.0.0.1"),
            port=int(self.config.get("port", 5432)),
            user=self.config.get("user", "postgres"),
            password=self.config.get("password", ""),
            dbname=self.config.get("database", "campus_spider"),
            sslmode=self.config.get("sslmode", "disable"),
        )

    def _init_schema(self) -> None:
        try:
            with self._connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY,
                            name VARCHAR(120) NOT NULL,
                            email VARCHAR(180) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            role VARCHAR(20) NOT NULL,
                            xp INTEGER NOT NULL DEFAULT 0,
                            matches INTEGER NOT NULL DEFAULT 0
                        );
                        """
                    )
                    cursor.execute(
                        """
                        CREATE TABLE IF NOT EXISTS words (
                            id SERIAL PRIMARY KEY,
                            word VARCHAR(180) NOT NULL,
                            theme VARCHAR(120) NOT NULL,
                            difficulty INTEGER NOT NULL
                        );
                        """
                    )
                    cursor.execute(
                        """
                        CREATE TABLE IF NOT EXISTS games (
                            id INTEGER PRIMARY KEY,
                            user_id INTEGER NOT NULL,
                            suit_count INTEGER NOT NULL,
                            result VARCHAR(20) NOT NULL,
                            score INTEGER NOT NULL,
                            moves INTEGER NOT NULL,
                            duration_seconds INTEGER NOT NULL,
                            created_at VARCHAR(60) NOT NULL,
                            CONSTRAINT fk_games_users
                                FOREIGN KEY (user_id)
                                REFERENCES users(id)
                                ON DELETE CASCADE
                        );
                        """
                    )
        except PsycopgError as exc:
            raise RepositoryError(str(exc)) from exc

    def read_bootstrap(self) -> dict[str, Any]:
        try:
            with self._connect() as conn:
                with conn.cursor(row_factory=dict_row) as cursor:
                    cursor.execute("SELECT * FROM users ORDER BY id ASC")
                    users = cursor.fetchall()

                    cursor.execute("SELECT word, theme, difficulty FROM words ORDER BY id ASC")
                    words_rows = cursor.fetchall()

                    cursor.execute(
                        """
                        SELECT
                            id,
                            user_id,
                            suit_count,
                            result,
                            score,
                            moves,
                            duration_seconds,
                            created_at
                        FROM games
                        ORDER BY id ASC
                        """
                    )
                    games_rows = cursor.fetchall()
        except PsycopgError as exc:
            raise RepositoryError(str(exc)) from exc

        words = [
            {
                "word": row["word"],
                "theme": row["theme"],
                "difficulty": row["difficulty"],
            }
            for row in words_rows
        ]

        games = [
            {
                "id": row["id"],
                "userId": row["user_id"],
                "suitCount": row["suit_count"],
                "result": row["result"],
                "score": row["score"],
                "moves": row["moves"],
                "durationSeconds": row["duration_seconds"],
                "createdAt": row["created_at"],
            }
            for row in games_rows
        ]

        return {"users": users, "words": words, "games": games}

    def replace_all(self, payload: dict[str, Any]) -> None:
        users = payload.get("users", [])
        words = payload.get("words", [])
        games = payload.get("games", [])

        try:
            with self._connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("DELETE FROM games")
                    cursor.execute("DELETE FROM words")
                    cursor.execute("DELETE FROM users")

                    for user in users:
                        cursor.execute(
                            """
                            INSERT INTO users (id, name, email, password, role, xp, matches)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)
                            """,
                            (
                                int(user.get("id", 0)),
                                str(user.get("name", "")),
                                str(user.get("email", "")),
                                str(user.get("password", "")),
                                str(user.get("role", "student")),
                                int(user.get("xp", 0) or 0),
                                int(user.get("matches", 0) or 0),
                            ),
                        )

                    for word in words:
                        cursor.execute(
                            "INSERT INTO words (word, theme, difficulty) VALUES (%s, %s, %s)",
                            (
                                str(word.get("word", "")),
                                str(word.get("theme", "")),
                                int(word.get("difficulty", 1) or 1),
                            ),
                        )

                    for game in games:
                        cursor.execute(
                            """
                            INSERT INTO games (
                                id,
                                user_id,
                                suit_count,
                                result,
                                score,
                                moves,
                                duration_seconds,
                                created_at
                            )
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                            """,
                            (
                                int(game.get("id", 0)),
                                int(game.get("userId", 0)),
                                int(game.get("suitCount", 1) or 1),
                                str(game.get("result", "abandoned")),
                                int(game.get("score", 0) or 0),
                                int(game.get("moves", 0) or 0),
                                int(game.get("durationSeconds", 0) or 0),
                                str(game.get("createdAt", "")),
                            ),
                        )
        except PsycopgError as exc:
            raise RepositoryError(str(exc)) from exc
