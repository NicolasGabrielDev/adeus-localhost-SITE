# Prompt: frontend Vue

## Contexto do projeto

- O projeto se chama `site-crud`: backend em Bun (`Bun.serve`) com Drizzle e PostgreSQL, e frontend em Vue 3 + Vite + JavaScript.
- Em desenvolvimento, o proxy do Vite encaminha `/api` para `http://localhost:9501` e remove o prefixo. Em produção, o Nginx faz o mesmo e serve o build do frontend na raiz `/`.
- Por isso, as rotas reais do backend não têm `/api`, mas o frontend sempre as chama com o prefixo `/api`.
- Nunca escreva `localhost`, host, porta ou URL absoluta (`http://...`) no código do frontend.

## Tarefa

- Crie somente o frontend em Vue 3 + Vite + JavaScript, usando `<script setup>` e as dependências existentes. Não adicione Router, Pinia, bibliotecas ou versões novas.
- Antes de implementar, leia o código existente para entender como o usuário estruturou o projeto. Confira também erros de digitação e inconsistências em nomes de arquivos, imports, rotas e campos. Não substitua escolhas existentes sem necessidade.
- Leia os anexos: `index.ts`, `categorias.ts`, `registros.ts`, `schema.ts`, o `package.json` do frontend e este `implementation.md`. Os handlers reais definem rotas, corpos e respostas.
- Faça perguntas antes de gerar apenas se faltar informação para integrar ou se uma inconsistência mudar o contrato da API. Não invente endpoints. Se não houver dúvida, entregue direto os três arquivos.
- Implemente a listagem e o cadastro de categorias, além do CRUD completo de registros: listar, criar, editar e excluir com confirmação. Inclua validação, carregamento, mensagens de erro e sucesso e estados vazios.
- Preserve o esquema. Categorias usam `nome` e `cor`. Registros usam `nome`, `descricao`, `categoria_id` e `ativo`. O tema muda rótulos e aparência, sem acrescentar campos ou processos. Não envie IDs ou datas geradas pelo servidor na criação ou edição.
- Use `fetch` com caminhos relativos iniciados por `/api`, conforme as rotas dos handlers. Ao carregar, consulte as listas de categorias e de registros (`/api/categorias` e `/api/registros`, se for o caso).
- Não implemente autenticação, usuários, sessões, JWT ou armazenamento de tokens.
- Trate erros `{ "erro": "mensagem" }`, falhas de rede e respostas `204` sem chamar `.json()`. Evite envios duplicados.
- Faça uma interface responsiva, em português do Brasil, com labels associados aos campos, foco visível e mensagens de status acessíveis.

## O que não alterar

- Não altere backend, banco, dependências, `package.json` nem `index.html`.
- O `vite.config.js` (proxy `/api`) e os scripts do `package.json` são configurados por mim, fora deste prompt. Não gere nem altere esses arquivos; apenas assuma o proxy descrito no contexto.
- Não importe nem use arquivos do template do Vite (`HelloWorld.vue`, `assets`, `vite.svg`).

## Produto final obrigatório

Retorne exatamente três arquivos completos, cada um com o caminho indicado antes do respectivo bloco de código:

1. `frontend/src/App.vue`: telas, estado e integração com a API.
2. `frontend/src/main.js`: importar Vue, `App.vue` e `./style.css`; montar em `#app`.
3. `frontend/src/style.css`: todos os estilos da interface.

Sem arquivos adicionais, comandos, explicações, TODOs, trechos omitidos ou pseudocódigo. Todos os imports devem resolver nesses três arquivos ou nas dependências já instaladas.

## Minha ideia para o projeto

Preencha os três campos abaixo antes de enviar este arquivo à IA.

- Quero criar um sistema de: [descreva o tema, por exemplo "biblioteca de livros" ou "controle de equipamentos"].
- O nome será: [nome do sistema].
- Quero que a interface tenha este estilo: [cores, aparência ou referência visual].
