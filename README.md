# Calculadora de Notas — Einstein Coding (FICSAE)

## Descrição
A **Calculadora de Notas** é um site voltado a todos os alunos da **FICSAE** para estimar a **média final por matéria** e planejar o desempenho ao longo do semestre.  
No **MVP** (entrega prevista para o **início do 1º semestre de 2026**), não haverá login/senha: os dados do aluno serão **salvos localmente no navegador**, permitindo fechar/abrir o site sem perder os inputs. O site terá **abas por curso** e, idealmente, **links por turma** (T1, T2, etc.) que já levem a uma página com as matérias e **pesos atualizados**.  
Como professores podem alterar regras (ou alunos cursarem optativas), **o usuário poderá ajustar localmente** pesos, avaliações e até matérias (adicionar/remover avaliações, alterar pesos e disciplinas) — sempre **apenas na sua versão** do site.

**Visão futura:** com **login/senha** e dados salvos na nuvem; **médias históricas** de avaliações/matérias de turmas anteriores para consulta pelos alunos atuais.

---

## Funcionalidades Principais (MVP)
- **Calculadora por Curso/Turma** — Seleção de curso e turma; listagem de matérias do período.
- **Regras de Avaliação** — Exibição de itens avaliativos com **pesos** e **máximos**.
- **Cálculo de Média Ponderada** — Resultado em tempo real (sem recarregar a página).
- **“Quanto Falta”** — Estimativa da nota necessária para atingir a média-alvo.
- **Salvamento Local** — Inputs persistem no **navegador (localStorage)**, sem conta.
- **Edição Local de Regras** — Usuário pode ajustar pesos/itens/matérias **só para si**.
- **Django Admin (equipe)** — Cadastro/atualização de cursos, disciplinas, pesos e itens.
- **Acessibilidade Básica** — Validação de faixas de nota, mensagens claras e layout responsivo.

### Funcionalidades Futuras
- **Autenticação** — Conta por usuário; dados sincronizados na nuvem.
- **Estatísticas Históricas** — Médias de turmas anteriores por avaliação/matéria.
- **Perfis e Cenários** — Salvar múltiplos cenários, comparar simulações, compartilhar links.
- **Relatórios** — Exportação/compartilhamento de resultados.

---

## Tecnologias Utilizadas
| Camada          | Tecnologias                                                                 |
|-----------------|------------------------------------------------------------------------------|
| Backend         | **Django 5** (Admin, ORM, Templates), Python 3.12+                          |
| Interatividade  | **HTMX** (atualizações parciais sem SPA)                                    |
| UI/Estilos      | **Tailwind CSS** (CDN no MVP)                                               |
| Banco de Dados  | **SQLite** (dev) / **PostgreSQL** (produção)                                |
| Deploy          | Render ou Railway                                                            |
| Observabilidade | Sentry (erros), Umami/Simple Analytics (analytics leve, sem cookies)        |
| Gestão          | Git + **GitHub Projects** (Kanban, Issues, PRs)                             |

---
# Guia Rápido — Git + Django + Fluxo de Trabalho

> Passo a passo único para instalar **Git** e **Django**, clonar a **main**, criar branch, editar, fazer **commit + push** e abrir **Pull Request**.

---

## 0) Pré-requisitos
- **Python** 3.10+ (recomendado 3.12)
- Acesso ao repositório no GitHub (URL HTTPS/SSH)

---

## 1) Instalar e configurar o **Git**
Verifique e configure:
git --version

## 2) Clonar o repositório e atualizar a main
Substitua <URL_DO_REPO> e <PASTA> pelos seus valores.
git clone <URL_DO_REPO> <PASTA>
cd <PASTA>
git checkout main
git pull --rebase origin main

## 3) Criar ambiente virtual e instalar Django
Execute dentro da pasta do repositório.

Windows (PowerShell)
powershell
pip install Django

macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install "Django>=5,<6"
python -c "import django; print('Django', __import__('django').get_version())"
Se o projeto Django ainda não existir (opcional):

## 4) Rodar localmente (Django)
python manage.py migrate
python manage.py runserver
Acesse: http://127.0.0.1:8000/

## 5) Fluxo de trabalho — branch → commit → push → PR

5.1 Criar branch a partir da main
git checkout main
git pull --rebase origin main
git checkout -b feat/minha-tarefa

5.2 Editar arquivos e preparar o commit
git status
git add -A
git commit -m "feat: descreva a mudança de forma objetiva"

Remover arquivo/pasta rastreado(a):
git rm caminho/arquivo
git rm -r caminho/pasta

Remover do repo mas manter no disco (ao adicionar no .gitignore):
git rm --cached caminho/arquivo_ou_pasta

5.3 Enviar a branch para o GitHub
git push -u origin feat/minha-tarefa
5.4 Abrir o Pull Request
No GitHub: base: main ← compare: feat/minha-tarefa

Preencha título/descrição e, se houver, relacione a issue: Fixes #123

## 6) Atualizar sua branch se a main mudou
git fetch origin
git rebase origin/main
se houver conflitos:
1) edite os arquivos marcados
git add <arquivos corrigidos>
git rebase --continue
git push --force-with-lease

## 7) Comandos úteis / resgate rápido
git status                      # estado do repo
git diff                        # difs não staged
git diff --staged               # difs staged
git log --oneline --graph       # histórico resumido
git restore <arquivo>           # desfaz alterações locais (antes do commit)
git restore --staged <arquivo>  # tira do staged
git revert <hash>               # cria commit que reverte outro (histórico preservado)

## 8) Link do Drive para colocar os planos de ensino
https://drive.google.com/drive/folders/1Ii-9y0VJJFHFQlAh77tBeVR0xBoO780J?usp=drive_link
