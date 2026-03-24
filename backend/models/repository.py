from __future__ import annotations

from typing import Any

try:
    import mysql.connector as mysql_connector  # type: ignore[import-not-found]
    from mysql.connector import Error as MySQLError  # type: ignore[import-not-found]
except ImportError:
    mysql_connector = None

    class MySQLError(Exception):
        """Fallback error when mysql-connector-python is unavailable."""


class DataRepository:
    def __init__(self, config: dict[str, Any]) -> None:
        self.config = config
        self._init_database_if_needed()
        self._init_schema()

    def _connect(self):
        if mysql_connector is None:
            raise RuntimeError(
                "Pacote mysql-connector-python nao encontrado no ambiente Python ativo."
            )
        return mysql_connector.connect(**self.config)

    def _init_database_if_needed(self) -> None:
        config_no_db = {k: v for k, v in self.config.items() if k != "database"}
        database_name = self.config["database"]
        if mysql_connector is None:
            raise RuntimeError(
                "Pacote mysql-connector-python nao encontrado no ambiente Python ativo."
            )
        conn = mysql_connector.connect(**config_no_db)
        try:
            cursor = conn.cursor()
            cursor.execute(
                f"CREATE DATABASE IF NOT EXISTS `{database_name}` "
                "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
            conn.commit()
        finally:
            conn.close()

    def _init_schema(self) -> None:
        with self._connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY,
                    name VARCHAR(120) NOT NULL,
                    email VARCHAR(180) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) NOT NULL,
                    xp INT NOT NULL DEFAULT 0,
                    matches INT NOT NULL DEFAULT 0
                ) ENGINE=InnoDB;
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS words (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    word VARCHAR(180) NOT NULL,
                    theme VARCHAR(120) NOT NULL,
                    difficulty INT NOT NULL
                ) ENGINE=InnoDB;
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS games (
                    id INT PRIMARY KEY,
                    user_id INT NOT NULL,
                    suit_count INT NOT NULL,
                    result VARCHAR(20) NOT NULL,
                    score INT NOT NULL,
                    moves INT NOT NULL,
                    duration_seconds INT NOT NULL,
                    created_at VARCHAR(60) NOT NULL,
                    CONSTRAINT fk_games_users
                        FOREIGN KEY (user_id)
                        REFERENCES users(id)
                        ON DELETE CASCADE
                ) ENGINE=InnoDB;
                """
            )
            conn.commit()

    def read_bootstrap(self) -> dict[str, Any]:
        with self._connect() as conn:
            cursor = conn.cursor(dictionary=True)
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

        with self._connect() as conn:
            cursor = conn.cursor()
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
            conn.commit()
