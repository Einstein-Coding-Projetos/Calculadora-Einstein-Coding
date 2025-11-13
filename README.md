O projeto de calculadora do Einstein Coding se trata de um projeto de programação voltado para o desenvolvimento de um site que sirva como calculadora de notas para todos os alunos da FICSAE, isto é, como uma ferramenta para cálculo da média final em cada matéria, possibilitando planejamento prévio e consciência de notas. A ideia tem várias camadas, as quais serão implementadas à medida em que o projeto é desenvolvido. 
A meta inicial é entregar o MVP - uma versão mesmo que simples mas funcional do projeto - até o começo do primeiro semestre de 2026. A princípio, este primeiro MVP não terá login/senha para cada usuário, mas irá salvar os dados do usuário localmente (sem conta, mas de modo que o site possa ser fechado e aberto novamente, salvando os inputs do usuário). Alunos de qualquer curso poderão utilizar, tendo abas específicas para cada curso. Idealmente, cada aba terá links para calculadora de cada sala (T1, T2, etc), e já redirecionará o usuário para uma página com todas as matérias que aquela turma está tendo atualmente, com os pesos atualizados. Mas mudanças podem ser feitas pelos professores ou até matérias extra (como optativas) podem ser realizadas, por isso, os usuários também têm poder de alterar (apenas na sua versão do site, claro) tanto os pesos, quanto as avaliações ou matérias (isto é, o aluno pode adicionar/remover avaliações caso queira, além de poder também alterar os pesos. Isso se aplica também à matérias). 
Em versões mais futuras, o site terá login/senha para cada usuário, salvando os dados na nuvem. Médias de notas para avaliações (ou matérias) de turmas antigas estarão disponíveis para os alunos atuais. 

# Guia Rápido — Git + Django + Fluxo de Trabalho

> Use este passo a passo para instalar **Git** e **Django**, clonar a **main**, criar branches, editar, fazer **commit + push** e abrir **Pull Request**.

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
# Acesse: http://127.0.0.1:8000/

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
# se houver conflitos:
# 1) edite os arquivos marcados
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
