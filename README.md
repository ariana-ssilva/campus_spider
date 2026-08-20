# Campus Spider

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11+" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ES6" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL 8.0" />
  <img src="https://img.shields.io/badge/PostgreSQL-Render-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

Campus Spider é uma plataforma educacional gamificada inspirada no clássico jogo de paciência Spider, desenvolvida para apoiar o processo de aprendizagem em ambiente acadêmico. A solução combina lógica de jogo, organização de conteúdos por tema, acompanhamento de desempenho e gestão administrativa para estudantes e professores.

A proposta do projeto é transformar o aprendizado em uma experiência mais envolvente, utilizando elementos de gamificação para aumentar motivação, persistência e engajamento dos alunos durante o estudo.

## 1. Visão geral

O sistema foi concebido para:

- tornar a aprendizagem mais dinâmica e interativa;
- permitir que professores gestionem conteúdos e acompanhem resultados;
- organizar estudos por temas e níveis de dificuldade;
- estimular o progresso por meio de XP, ranking e indicadores de desempenho;
- oferecer uma interface amigável e acessível em ambiente web.

## 2. Problema e justificativa

A educação digital frequentemente enfrenta dificuldades relacionadas à baixa motivação e ao baixo engajamento dos estudantes em atividades de revisão e consolidação de conhecimento. Em muitos contextos, os conteúdos acadêmicos são apresentados de forma estática, sem mecanismos que estimulem o interesse contínuo do aluno.

Diante disso, o Campus Spider propõe uma alternativa que combina elementos lúdicos com objetivos educacionais, promovendo a revisão de conceitos por meio de desafios, progresso gradual e feedback visual. A ideia central é usar a mecânica de jogo para favorecer a aprendizagem ativa e a retenção de informação.

## 3. Objetivos

### 3.1 Objetivo geral

Desenvolver uma plataforma web educacional gamificada que apoie a prática de estudo, o acompanhamento do desempenho e a gestão de conteúdos para professores e alunos.

### 3.2 Objetivos específicos

- criar uma interface funcional para alunos e professores;
- implementar mecanismos de autenticação e gestão de usuários;
- organizar conteúdos por temas e dificuldades;
- permitir a execução de partidas inspiradas em Spider;
- registrar progresso, pontuação e evolução de desempenho;
- estabelecer uma base para persistência de dados em ambiente local e produção.

## 4. Funcionalidades

### 4.1 Para alunos

- autenticação com login e cadastro;
- painel inicial com visão geral do progresso;
- módulos e desafios organizados por tema;
- partidas inspiradas em Spider com regras, pontuação e movimentação;
- acompanhamento de XP, nível, vitórias e desempenho;
- ranking entre estudantes;
- perfil pessoal com indicadores individuais.

### 4.2 Para professores

- painel administrativo central;
- cadastro, edição e exclusão de usuários;
- gestão de palavras e temas de estudo;
- acompanhamento de partidas e resultados;
- estatísticas gerais da turma;
- monitoramento de desempenho e progresso acadêmico.

### 4.3 Infraestrutura e experiência

- frontend em HTML, CSS e JavaScript;
- backend em Python com servidor HTTP próprio;
- arquitetura híbrida com persistência local no navegador e sincronização com banco de dados;
- MySQL em desenvolvimento local;
- PostgreSQL em produção no Render;
- comunicação entre frontend e backend por endpoints de API;
- estrutura organizada em módulos para facilitar manutenção e evolução.

## 5. Arquitetura da solução

A aplicação adota uma arquitetura híbrida de persistência:

- frontend: usa armazenamento local em `localStorage` para manter sessão, dados do usuário e estado do jogo;
- backend: utiliza banco relacional para persistência centralizada e sincronização de dados;
- API: o frontend consulta e envia dados por endpoints como `/api/bootstrap` e `/api/sync`.

Essa combinação torna a experiência mais responsiva no navegador e, ao mesmo tempo, organiza os dados principais em uma base de persistência do servidor para suporte a ambientes de produção e crescimento futuro.

## 6. Stack tecnológica

- Frontend: JavaScript, HTML e CSS
- Backend: Python
- Servidor HTTP: `ThreadingHTTPServer`
- Banco de dados local: MySQL 8.0
- Banco de dados em produção: PostgreSQL
- Deploy: Render
- Estrutura: arquitetura em camadas com backend, views e modelos simplificados

## 7. Estrutura do projeto

```text
campus-spider/
├── app.js
├── index.html
├── layout.js
├── styles.css
├── Dockerfile
├── docker-compose.yml
├── render.yaml
├── requirements.txt
├── server.py
├── start.sh
├── stop.sh
├── .gitignore
├── .env.example
├── README.md
├── backend/
│   ├── __init__.py
│   ├── config.py
│   ├── http_handler.py
│   ├── controllers/
│   │   └── api_controller.py
│   ├── models/
│   │   └── repository.py
│   └── views/
│       └── json_view.py
├── components/
│   ├── auth.html
│   ├── header.html
│   ├── main-content.html
│   ├── student-challenges.html
│   ├── student-home.html
│   ├── student-modules.html
│   ├── student-pages.html
│   ├── student-profile.html
│   ├── student-ranking.html
│   ├── suit-modal.html
│   ├── teacher-games.html
│   ├── teacher-home.html
│   ├── teacher-pages.html
│   ├── teacher-ranking.html
│   ├── teacher-users.html
│   ├── teacher-words.html
│   └── teacher-profile.html
├── data/
│   ├── menu-student.json
│   └── menu-teacher.json
├── icons/
└── .venv/
```

## 8. Requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Python 3.11+
- Docker
- Docker Compose
- Navegador moderno

## 9. Configuração local

### 9.1 Clone o repositório

```bash
git clone <url-do-repositorio>
cd campus-spider
```

### 9.2 Crie o ambiente virtual

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 9.3 Instale as dependências

```bash
pip install -r requirements.txt
```

### 9.4 Suba o banco local

```bash
docker compose up -d
```

Esse comando inicia o MySQL em container para o ambiente de desenvolvimento.

### 9.5 Configure as variáveis de ambiente

O sistema lê variáveis de ambiente para conexão com o banco, deploy e execução da aplicação. Um exemplo de configuração é:

```env
DB_ENGINE=mysql
DB_HOST=127.0.0.1
DB_PORT=3308
DB_USER=root
DB_PASSWORD=change_me
DB_NAME=campus_spider
PORT=8080
DATABASE_URL=
DATABASE_URL_EXTERNAL=
DB_SSLMODE=prefer
```

> O projeto usa MySQL em desenvolvimento local e pode utilizar PostgreSQL em produção quando a variável `DATABASE_URL` estiver configurada. 

## 10. Execução da aplicação

### Método 1: execução direta

```bash
source .venv/bin/activate
python server.py
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

### Método 2: script auxiliar

```bash
bash start.sh
```

Esse script:

- inicia o banco em Docker;
- aguarda a saúde do MySQL;
- inicializa o servidor da aplicação.

## 11. Fluxo de uso

### Como estudante

1. Faça login na plataforma.
2. Acesse o painel inicial.
3. Escolha um tema ou módulo de estudo.
4. Inicie um novo desafio.
5. Jogue com as regras da modalidade Spider.
6. Complete sequências, acumule XP e evolua na pontuação.
7. Acompanhe seu ranking e perfil pessoal.

### Como professor

1. Faça login com a conta docente.
2. Acesse o painel administrativo.
3. Cadastre palavras, temas e desafios.
4. Gerencie usuários e partidas.
5. Acompanhe o progresso da turma e os melhores desempenhos.

## 12. Deploy

O projeto está preparado para deploy no Render por meio do arquivo `render.yaml`.

Em produção, o sistema utiliza PostgreSQL quando as variáveis de ambiente da plataforma são configuradas corretamente.

## 13. Observações importantes

- O ambiente local usa MySQL por padrão.
- O backend serve os arquivos estáticos do frontend.
- A aplicação adota uma arquitetura híbrida: estado local no navegador + persistência centralizada em banco.
- A lógica do jogo e a persistência de dados foram separadas para favorecer manutenção e evolução.
- O projeto foi concebido para permitir expansão com novos módulos, conteúdos e integrações futuras.

## 14. Segurança e boas práticas

- o projeto evita defaults inseguros em variáveis críticas de ambiente;
- as informações sensíveis devem ficar em `.env` e fora do repositório;
- `localStorage` é adequado para protótipos e uso local, mas não substitui autenticação robusta em produção;
- recomenda-se evoluir para autenticação do lado do servidor, com sessão segura, cookies `HttpOnly`, proteção contra CSRF e hash forte de senhas.

## 15. Conclusão

Campus Spider representa uma proposta de sistema educacional gamificado com foco em aprendizagem ativa, engajamento e acompanhamento de desempenho. A solução combina elementos de jogo, gestão acadêmica e persistência de dados em um ambiente web funcional, servindo como base para futuras extensões na área de educação tecnológica e inovação em ensino.

## 16. Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais. Consulte o repositório e a documentação interna para verificar regras específicas de uso e distribuição.

---
