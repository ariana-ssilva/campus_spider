#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

MYSQL_HOST="${MYSQL_HOST:-127.0.0.1}"
MYSQL_PORT="${MYSQL_PORT:-3308}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-123456}"
MYSQL_DATABASE="${MYSQL_DATABASE:-campus_spider}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Erro: Docker nao encontrado no PATH."
  exit 1
fi

PYTHON_BIN="$ROOT_DIR/.venv/bin/python"

if [[ ! -x "$PYTHON_BIN" ]]; then
  echo "Erro: Python do venv nao encontrado em $PYTHON_BIN"
  echo "Ative/crie o ambiente virtual antes de executar."
  exit 1
fi

cd "$ROOT_DIR"

echo "[1/3] Subindo MySQL com Docker Compose..."
docker compose up -d mysql

echo "[2/3] Aguardando MySQL ficar saudavel..."
for _ in $(seq 1 60); do
  status="$(docker inspect --format='{{.State.Health.Status}}' mysql-campus-spider 2>/dev/null || true)"
  if [[ "$status" == "healthy" ]]; then
    break
  fi
  sleep 2
done

status="$(docker inspect --format='{{.State.Health.Status}}' mysql-campus-spider 2>/dev/null || true)"
if [[ "$status" != "healthy" ]]; then
  echo "Erro: MySQL nao ficou saudavel a tempo."
  echo "Dica: rode 'docker logs mysql-campus-spider' para diagnosticar."
  exit 1
fi

echo "[3/3] Iniciando aplicacao em http://localhost:8080..."
export MYSQL_HOST MYSQL_PORT MYSQL_USER MYSQL_PASSWORD MYSQL_DATABASE
exec "$PYTHON_BIN" "$ROOT_DIR/server.py"
