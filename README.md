# Campus Spider

Sistema web gamificado para ensino superior em HTML, CSS e JavaScript puro.

## Funcionalidades

- Login com perfis de professor e aluno.
- Jogo estilo Spider com cartas de palavras academicas.
- XP, nivel e partidas para alunos.
- Painel do professor com:
  - Adicao de novas palavras/temas/dificuldade.
  - CRUD completo de usuarios (criar, listar, editar e excluir).
  - CRUD completo de jogos (criar, listar, editar e excluir).
  - Ranking dos alunos.

## Arquitetura MVC (Backend Python)

- Model: `backend/models/repository.py`
  - Responsavel por conexao MySQL, schema e persistencia de dados.
- Controller: `backend/controllers/api_controller.py`
  - Orquestra regras dos endpoints (`health`, `bootstrap`, `sync`).
- View: `backend/views/json_view.py`
  - Padroniza respostas JSON HTTP.
- HTTP/Router: `backend/http_handler.py`
  - Faz roteamento das rotas API e entrega arquivos estaticos.
- Entrypoint: `server.py`
  - Inicializa dependencias MVC e sobe o servidor.

## Como executar

### Comando unico (recomendado)

No diretorio do projeto, rode:

```bash
bash start.sh
```

Esse comando:
- sobe o MySQL no Docker (`mysql-campus-spider`, porta `3308`),
- aguarda o banco ficar saudavel,
- inicia o servidor da aplicacao em `http://localhost:8080`.

Para parar o banco:

```bash
bash stop.sh
```

### Opcao recomendada: Docker Compose (MySQL em 3308)

1. Suba o MySQL do projeto:

```bash
docker compose up -d
```

2. Defina variaveis de ambiente (Linux):

```bash
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3308
export MYSQL_USER=root
export MYSQL_PASSWORD=123456
export MYSQL_DATABASE=campus_spider
```

3. Execute o servidor da aplicacao:

```bash
python3 server.py
```

4. Abra `http://localhost:8080` no navegador.
5. Faça login com uma conta de teste.

Para parar o banco:

```bash
docker compose down
```

### Opcao alternativa: MySQL ja existente

1. Garanta um servidor MySQL ativo.
2. Ajuste as variaveis abaixo para sua porta/usuario/senha.

Exemplo:

```bash
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3308
export MYSQL_USER=root
export MYSQL_PASSWORD=123456
export MYSQL_DATABASE=campus_spider
```

3. Execute o servidor:

```bash
python3 server.py
```

4. Abra `http://localhost:8080` no navegador.
5. Faça login com uma conta de teste.

## Banco de dados

- O banco `campus_spider` e as tabelas sao criados automaticamente na primeira execucao.
- Usuarios, palavras e jogos sao persistidos no MySQL via API (`/api/bootstrap` e `/api/sync`).
- Existe um modelo de variaveis em `.env.example`.
- O compose do projeto esta em `docker-compose.yml`.

## Credenciais de teste

- Professor: `prof@campus.com` / `123456`
- Aluno 1: `aluno1@campus.com` / `123456`
- Aluno 2: `aluno2@campus.com` / `123456`

## Regras do jogo

- Clique na carta do topo para selecionar.
- Clique em outra coluna para mover.
- Jogada valida quando a carta destino tem rank maior em 1.
- Sequencia completa (13 ate 1) no mesmo tema remove as 13 cartas.
- Distribuir pilha adiciona 1 carta em cada coluna (se todas tiverem cartas).
