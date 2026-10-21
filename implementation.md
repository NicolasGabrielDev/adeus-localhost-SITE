# Prompt: frontend Vue

## Contexto

O projeto `site-crud` usa Bun (`Bun.serve`), Drizzle e PostgreSQL no backend, e Vue 3 + Vite + JavaScript no frontend.

O frontend chama caminhos relativos com `/api`. Vite e Nginx encaminham essas chamadas ao backend removendo o prefixo. Nunca escreva host, porta ou URL absoluta no frontend.

## Antes de implementar

Leia `index.ts`, `categorias.ts`, `registros.ts`, `schema.ts`, o `package.json` do frontend e este `implementation.md`.

Confira a estrutura existente, erros de digitação, imports, rotas e campos. Preserve as escolhas do projeto. Os handlers definem métodos, caminhos, corpos e respostas; não invente contratos.

Pergunte antes de gerar somente se faltar um arquivo necessário ou houver uma inconsistência que impeça integrar com a API.

## Funcionalidades

- Categorias: listar e cadastrar.
- Registros: listar, criar, editar, cancelar edição e excluir com confirmação.
- Incluir validação, carregamento, mensagens de sucesso e erro, estados vazios e opção de tentar novamente.
- Carregar categorias e registros ao iniciar, de forma independente.

Preserve os campos da API:

- Categorias: `nome` e `cor`.
- Registros: `nome`, `descricao`, `categoria_id` e `ativo`.

O tema muda rótulos e aparência, sem acrescentar campos ou processos. Não envie IDs nem datas geradas pelo servidor nos corpos de criação ou edição.

## Qualidade do código

- Use `<script setup>`, Composition API e as dependências existentes.
- Escreva variáveis, funções e classes CSS em inglês; mantenha a interface em português do Brasil e preserve os nomes exigidos pela API.
- Use funções nomeadas e com responsabilidades claras para requisições, validação, payloads e ações da interface.
- Centralize o tratamento HTTP em uma função pequena e evite duplicação e abstrações desnecessárias.
- Use `computed` para valores derivados e mantenha a lógica extensa fora do template.
- Ao editar, copie os campos para o formulário sem modificar o objeto da listagem.
- Monte payloads explicitamente e respeite os tipos do backend, especialmente `categoria_id` e `ativo`.
- Preserve o formulário quando houver erro e limpe-o após sucesso ou cancelamento.
- Impeça envios duplicados com verificações nas funções e botões desabilitados.
- Use `try/catch/finally` para restaurar estados de carregamento.
- Não inclua código morto, logs de depuração ou comentários óbvios.

## API

Use `fetch` com caminhos relativos iniciados por `/api`, conforme os handlers.

- Verifique `response.ok`.
- Trate mensagens no formato `{ "message": "mensagem" }`, considerando o status HTTP para distinguir sucesso de erro.
- Trate falhas de rede e respostas inesperadas com mensagens compreensíveis.
- Não chame `.json()` em respostas `204` ou corpos vazios.
- Não suponha formatos de resposta que os handlers não garantam.
- Atualize as listas após alterações bem-sucedidas. Se apenas a atualização da lista falhar, não informe que a gravação falhou.
- Não implemente autenticação, tokens ou persistência local.

## Interface

Crie uma interface responsiva e coerente com o tema, usando HTML semântico, labels associados aos campos, foco visível e mensagens de status acessíveis.

Use `@submit.prevent`, tipos explícitos nos botões e chaves estáveis nas listas. Mostre erros próximos dos campos e não dependa apenas de cores para comunicar estados. A exclusão pode usar `window.confirm`.

Coloque todos os estilos em `style.css`, usando classes descritivas e variáveis CSS. Estilos inline apenas para valores dinâmicos.

## Restrições

Não altere backend, banco, dependências, `package.json`, `index.html` ou `vite.config.js`. O proxy e os scripts serão configurados por mim.

Não adicione Router, Pinia, bibliotecas, fontes externas ou arquivos adicionais. Não use arquivos do template do Vite, como `HelloWorld.vue`, `assets` ou `vite.svg`.

## Entrega

Retorne exatamente três arquivos completos, com o caminho antes de cada bloco de código:

1. `frontend/src/App.vue`
2. `frontend/src/main.js`: importar Vue, `App.vue` e `./style.css`; montar em `#app`.
3. `frontend/src/style.css`

Sem explicações, comandos, TODOs, pseudocódigo ou trechos omitidos. Revise imports, contrato da API e fluxos de criação, edição e exclusão antes de entregar.

## Minha ideia

- Sistema de: [tema].
- Nome: [nome do sistema].
- Estilo: [cores, aparência ou referência visual].
- Colocar aqui quaisquer mais alterações ou ideias para o front
