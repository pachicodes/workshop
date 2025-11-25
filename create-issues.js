// Script para criar issues no GitHub automaticamente a partir do ISSUES.md
// Requisitos: npm install @octokit/rest
// Uso: node create-issues.js

const { Octokit } = require('@octokit/rest');
const fs = require('fs');

// Configuração - ALTERE ESTES VALORES
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'SEU_TOKEN_AQUI';
const REPO_OWNER = 'pachicodes'; // Seu username do GitHub
const REPO_NAME = 'gambiconf'; // Nome do repositório

const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

// Parse do arquivo ISSUES.md
function parseIssuesFromMarkdown() {
  const content = fs.readFileSync('ISSUES.md', 'utf-8');
  const issues = [];
  
  // Regex para capturar cada issue
  const issueRegex = /## (.+?)\n\n\*\*Dificuldade:\*\* (.+?)\n\n\*\*Descrição:\*\*\n(.+?)\n\n\*\*Dicas:\*\*\n((?:- .+?\n)+)\n\*\*Pergunte ao Copilot:\*\*\n> (.+?)(?=\n\n---|\n\n##|$)/gs;
  
  let match;
  while ((match = issueRegex.exec(content)) !== null) {
    const [, title, difficulty, description, tips, copilotPrompt] = match;
    
    // Monta o corpo da issue
    const body = `**Dificuldade:** ${difficulty.trim()}

**Descrição:**
${description.trim()}

**Dicas:**
${tips.trim()}

**Pergunte ao Copilot:**
> ${copilotPrompt.trim()}

---

💡 **Dica:** Use o GitHub Copilot Chat com o prompt sugerido acima para começar!
`;
    
    // Define labels baseado na dificuldade
    const labels = ['enhancement'];
    if (difficulty.includes('⭐ Fácil')) {
      labels.push('good first issue');
    } else if (difficulty.includes('⭐⭐⭐ Avançado')) {
      labels.push('advanced');
    } else if (difficulty.includes('⭐⭐ Intermediário')) {
      labels.push('intermediate');
    }
    
    issues.push({
      title: title.trim(),
      body: body,
      labels: labels
    });
  }
  
  return issues;
}

// Cria as issues no GitHub
async function createIssues() {
  try {
    console.log('🚀 Iniciando criação de issues...\n');
    
    const issues = parseIssuesFromMarkdown();
    console.log(`📋 Encontradas ${issues.length} issues para criar\n`);
    
    for (const issue of issues) {
      try {
        console.log(`Criando: ${issue.title}`);
        
        const response = await octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: issue.title,
          body: issue.body,
          labels: issue.labels
        });
        
        console.log(`✅ Criada: #${response.data.number} - ${issue.title}\n`);
        
        // Aguarda 1 segundo entre cada criação para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Erro ao criar "${issue.title}":`, error.message);
      }
    }
    
    console.log('\n🎉 Processo concluído!');
    
  } catch (error) {
    console.error('❌ Erro ao processar issues:', error.message);
    process.exit(1);
  }
}

// Executa
createIssues();
