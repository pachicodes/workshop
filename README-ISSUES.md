# 📝 Como Criar as Issues Automaticamente

Este guia explica como usar o script `create-issues.js` para criar todas as issues do `ISSUES.md` automaticamente no GitHub.

## 🔧 Pré-requisitos

1. **Node.js** instalado
2. **GitHub Personal Access Token**

## 📋 Passo a Passo

### 1. Instalar Dependências

```bash
npm install @octokit/rest
```

### 2. Criar um Personal Access Token no GitHub

1. Vá em: https://github.com/settings/tokens
2. Clique em **Generate new token** → **Generate new token (classic)**
3. Dê um nome (ex: "Create Issues Script")
4. Selecione as permissões:
   - ✅ `repo` (Full control of private repositories)
5. Clique em **Generate token**
6. **Copie o token** (você não verá ele novamente!)

### 3. Configurar o Token

Opção A - Variável de ambiente (recomendado):
```bash
export GITHUB_TOKEN="seu_token_aqui"
```

Opção B - Editar o arquivo `create-issues.js`:
- Abra o arquivo
- Altere `SEU_TOKEN_AQUI` pelo seu token
- **⚠️ Cuidado:** Não commite o arquivo com o token!

### 4. Configurar Owner e Repo

Edite o arquivo `create-issues.js` e altere:

```javascript
const REPO_OWNER = 'pachicodes'; // Seu username do GitHub
const REPO_NAME = 'gambiconf'; // Nome do seu repositório
```

### 5. Executar o Script

```bash
node create-issues.js
```

## ✨ O que o script faz?

1. Lê o arquivo `ISSUES.md`
2. Extrai todas as issues com seus detalhes
3. Cria cada issue no GitHub com:
   - Título
   - Descrição completa
   - Dicas de implementação
   - Prompt sugerido para o Copilot
   - Labels apropriadas (`enhancement`, `good first issue`, `intermediate`, `advanced`)

## 🏷️ Labels Criadas

O script adiciona automaticamente labels baseadas na dificuldade:

- ⭐ Fácil → `enhancement`, `good first issue`
- ⭐⭐ Intermediário → `enhancement`, `intermediate`
- ⭐⭐⭐ Avançado → `enhancement`, `advanced`

**Nota:** Se essas labels não existirem no seu repositório, o GitHub as criará automaticamente.

## 🔒 Segurança

**IMPORTANTE:** Nunca commite seu token do GitHub!

Adicione ao `.gitignore`:
```
.env
create-issues.js
```

Ou remova o token do arquivo após usar.

## 🐛 Troubleshooting

### "Error: Not Found"
- Verifique se o `REPO_OWNER` e `REPO_NAME` estão corretos
- Confirme que o token tem permissões de `repo`

### "Error: Bad credentials"
- Verifique se o token está correto
- Certifique-se de que o token não expirou

### "Error: Validation Failed"
- Pode ser que uma label não exista. O script tentará criar automaticamente.

---

**Dúvidas?** Abra uma issue! 😊
