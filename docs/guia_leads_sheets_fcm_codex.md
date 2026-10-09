# Guia de implementação para Codex: formulário, Google Sheets e push com Firebase

## Objetivo

Implementar no site React hospedado na Vercel um fluxo simples para captar leads e avisar a cliente por notificação push, inclusive quando o site não estiver aberto, desde que o navegador/dispositivo e as permissões permitam.

O projeto Firebase já foi criado. Este documento é o contexto funcional e técnico para a sessão do Codex.

### O que queremos

- Receber os dados enviados pelo formulário público.
- Registrar o lead em uma planilha do Google Sheets.
- Depois de salvar o lead, solicitar ao Firebase Cloud Messaging (FCM) o envio de uma notificação para o navegador/dispositivo da cliente.
- Ter no painel da cliente um botão **“Ativar notificações”**.
- Fazer tudo com o menor número de peças possível, sem servidor próprio rodando 24/7 e tentando ficar dentro dos níveis gratuitos disponíveis.
- Não perder um lead só porque o envio da notificação falhou.

Os dados da planilha serão dados básicos de contato/mensagem. Mesmo assim, nome, e-mail e telefone são dados pessoais: coletar somente o necessário e limitar o acesso à planilha.

## Arquitetura-alvo

Usar uma função serverless da Vercel como backend pequeno. Não é necessário manter um servidor tradicional ligado continuamente.

```text
Pessoa envia o formulário
        |
        v
Frontend React (Vercel)
        | POST /api/leads
        v
Função serverless da Vercel
        |-- 1. valida os campos
        |-- 2. grava o lead no Google Sheets
        |-- 3. solicita o push ao FCM
        v
Resposta HTTP para o frontend

Em paralelo, o FCM tenta entregar a notificação ao token registrado
        |
        v
Navegador/dispositivo da cliente exibe o push
```

### Decisão sobre o Apps Script

A implementação principal deste guia **não depende do Google Apps Script**. A função da Vercel será responsável por conversar com o Google Sheets e com o FCM. Isso mantém o fluxo em um único endpoint de backend.

Se a configuração da API do Google Sheets com conta de serviço ficar desnecessariamente trabalhosa, o Apps Script continua sendo uma alternativa, mas não implemente os dois caminhos ao mesmo tempo sem necessidade.

## Como a autorização e as chaves funcionam

Há dois tipos de configuração diferentes:

### Configuração pública do Firebase Web

O frontend usa a configuração do Firebase Web SDK, incluindo `apiKey`, `authDomain`, `projectId`, `messagingSenderId` e `appId`, além da chave pública VAPID usada pelo Web Push, quando exigida.

Esses valores de configuração do SDK Web não são equivalentes a uma credencial administrativa. Podem ser usados no frontend, com a configuração correta das APIs e regras.

### Credenciais privadas de servidor

A função da Vercel precisa de credenciais de servidor para:

- escrever na planilha usando a Google Sheets API;
- autenticar o envio de mensagens pela API HTTP v1 do FCM.

Usar uma conta de serviço do Google, com as permissões mínimas necessárias, e guardar as credenciais em **Environment Variables da Vercel**. Compartilhar a planilha com o e-mail da conta de serviço, dando somente acesso necessário.

**Nunca** colocar JSON de conta de serviço, chave privada, access token OAuth ou credenciais de envio em React, em arquivos públicos, no repositório ou em variáveis `VITE_*`. Variáveis `VITE_*` são incorporadas ao bundle público do frontend.

Não confundir:

- `Firebase Web API Key`: configuração pública do SDK Web;
- `VAPID public key`: chave pública usada para registrar Web Push;
- credencial de conta de serviço/OAuth: autorização privada para ações de servidor;
- token FCM: endereço de destino de um navegador/dispositivo registrado.

## Fluxo de ativação das notificações

A cliente precisa autorizar as notificações no navegador. Isso é uma configuração por navegador/dispositivo, não algo que o FCM possa ativar silenciosamente.

1. Exibir no painel um botão **“Ativar notificações”**.
2. Quando a cliente clicar, solicitar permissão com a API de notificações do navegador.
3. Registrar o Service Worker em `/firebase-messaging-sw.js`.
4. Inicializar Firebase Messaging e obter o token FCM com a chave pública VAPID.
5. Enviar esse token para uma função serverless, por exemplo `POST /api/push/register`.
6. Guardar o token em uma aba separada do Google Sheets, por exemplo `PushTokens`, ou em outro armazenamento simples disponível no projeto.
7. Permitir atualizar o token caso ele mude. Se a cliente trocar de navegador/dispositivo, deverá ativar novamente naquele dispositivo.

A interface deve mostrar estados simples: não ativado, ativando, ativado e erro/permissão negada. Não pedir permissão assim que a página abre; pedir após a ação explícita da cliente.

### Site fechado

Com o Service Worker configurado, o navegador pode receber push em segundo plano e mostrar uma notificação mesmo que a página do site esteja fechada. Isso não significa garantia absoluta: o dispositivo pode estar offline, a permissão pode estar bloqueada, o navegador pode estar fechado de forma que impeça a entrega ou o sistema operacional pode restringir notificações.

Criar o arquivo público `public/firebase-messaging-sw.js` conforme a versão atual do Firebase Web SDK e a documentação oficial. Confirmar que o arquivo fica acessível em `/firebase-messaging-sw.js` depois do deploy.

## Fluxo de envio do formulário

Criar uma função serverless, por exemplo `POST /api/leads`:

1. Receber os campos do formulário.
2. Validar os dados no servidor, mesmo que também exista validação no React.
3. Gravar o lead no Google Sheets.
4. Somente depois de confirmar o registro, tentar enviar o push via FCM para os tokens registrados.
5. Retornar ao frontend uma resposta clara sobre o registro do lead.

**Regra importante:** se a gravação no Sheets funcionar e o FCM falhar, o lead continua salvo. A falha do push deve ser registrada para diagnóstico, mas não deve transformar um lead salvo em uma falha total do formulário.

A resposta de sucesso da API do FCM significa que a solicitação foi aceita, não que a cliente viu a notificação na tela.

### Texto da notificação

Manter a notificação curta e genérica, por exemplo:

- Título: `Novo contato recebido`
- Corpo: `Você recebeu uma nova mensagem pelo site.`

Evitar incluir telefone, e-mail ou a mensagem completa do lead na notificação. A cliente pode abrir o painel/site para ver os detalhes.

## Endpoints sugeridos

Adaptar os nomes e a estrutura ao projeto existente, sem criar arquivos ou convenções duplicadas caso já haja uma estrutura equivalente.

### `POST /api/leads`

- Recebe os campos do formulário.
- Valida e normaliza os valores.
- Grava uma nova linha na aba de leads.
- Solicita o push aos tokens ativos.
- Retorna um resultado de registro ao frontend.

### `POST /api/push/register`

- Recebe o token FCM criado após a cliente conceder permissão.
- Valida que o token é uma string não vazia e aplica limites de tamanho/formato razoáveis.
- Registra ou atualiza o token para evitar duplicatas.
- Não deve receber nem expor credenciais privadas.

A rota de registro de token precisa de proteção proporcional ao projeto. Se já existe login no painel, restringir o registro ao usuário autenticado. Não confiar em CORS como mecanismo de autenticação. Se ainda não existe login, documentar essa limitação e escolher uma proteção simples antes de publicar, sem inventar um sistema de autenticação grande sem necessidade.

## Google Sheets

Usar uma aba para os leads, com colunas conforme os campos reais do formulário. Exemplo:

`id | nome | email | telefone | mensagem | criado_em | status`

Criar outra aba para os destinos push, se essa for a forma escolhida de persistência:

`token | ativo | criado_em | atualizado_em`

Ajustar às informações realmente coletadas pelo site. Não presumir que todos os campos do exemplo existem no formulário.

## Variáveis de ambiente

Os nomes finais devem seguir o padrão já usado no projeto. Sugestões para a função serverless:

- `GOOGLE_SERVICE_ACCOUNT_JSON` — credencial privada da conta de serviço, guardada somente na Vercel;
- `GOOGLE_SHEETS_SPREADSHEET_ID` — ID da planilha;
- `FIREBASE_PROJECT_ID` — ID do projeto Firebase usado pelo FCM.

A configuração Web pública do Firebase e a VAPID public key podem usar variáveis frontend, por exemplo `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` e `VITE_FIREBASE_VAPID_KEY`, desde que esses nomes combinem com a configuração atual do projeto.

A autenticação da conta de serviço pode precisar de um formato de variável diferente conforme a biblioteca escolhida. Não registrar valores secretos em logs. Nunca criar um `.env` com credenciais reais e fazer commit dele.

## Requisitos técnicos e de qualidade

- Antes de editar, inspecionar a estrutura, framework, scripts, convenções e versões já usadas no repositório.
- Reutilizar dependências e padrões existentes sempre que possível.
- Não migrar framework nem reestruturar o projeto sem necessidade.
- Manter TypeScript estrito caso já seja usado.
- Separar o código do Firebase Web do código de servidor. Nunca importar credenciais de servidor em módulos compartilhados com o frontend.
- Tratar respostas HTTP, timeouts, erros de planilha, erros do FCM e tokens inválidos.
- Evitar duplicar leads em caso de clique repetido quando for viável, sem adicionar complexidade desproporcional.
- Não declarar sucesso de push só porque a função foi chamada; diferenciar lead salvo de notificação enviada/aceita.
- Implementar mensagens de carregamento, sucesso e erro no formulário.
- Não implementar polling periódico. O push deve ser solicitado como parte do processamento do novo lead.
- Usar HTTPS em produção; a Vercel fornece HTTPS para os domínios hospedados.
- Conferir as condições atuais dos planos e limites gratuitos dos serviços antes de prometer custo zero, especialmente se o site for usado comercialmente.

## Ordem sugerida de implementação

1. **Inspecionar o projeto atual** e identificar o formulário, o painel e o padrão de rotas/API da Vercel.
2. **Configurar o Google Sheets** e a conta de serviço com acesso mínimo à planilha.
3. **Implementar e testar a gravação de lead** pela função serverless, antes de adicionar push.
4. **Conectar o formulário** e confirmar que os dados chegam corretamente ao Sheets.
5. **Configurar Firebase Web Messaging** e o Service Worker.
6. **Implementar o botão de ativação**, obter o token e registrá-lo.
7. **Implementar o envio server-side pelo FCM** e testar com um dispositivo autorizado.
8. **Integrar o envio do push ao fluxo de novo lead** sem comprometer o registro na planilha.
9. **Testar** com permissão aceita/negada, site em segundo plano/fechado, dispositivo offline, token inválido, erro no Sheets, erro no FCM e envio repetido.

## Critérios de conclusão

- [ ] O formulário envia os dados ao endpoint serverless.
- [ ] Um envio válido cria uma linha na planilha.
- [ ] Um erro no FCM não apaga nem invalida um lead já salvo.
- [ ] A cliente pode clicar em “Ativar notificações” e conceder permissão.
- [ ] O token FCM é registrado e pode ser atualizado.
- [ ] Um novo lead solicita o envio de uma notificação para o token registrado.
- [ ] A notificação funciona em segundo plano/ com a página fechada nos cenários suportados pelo navegador.
- [ ] Nenhuma credencial privada aparece no bundle do frontend ou no repositório.
- [ ] O frontend mostra estados compreensíveis para sucesso e falha.
- [ ] A implementação segue a estrutura e as convenções já existentes no repositório.

## Instrução para a sessão do Codex

Trate este arquivo como contexto de produto e arquitetura. Primeiro inspecione o repositório e apresente um plano curto alinhado à estrutura existente. Depois implemente em etapas pequenas, começando pela gravação no Sheets e testando-a antes de integrar o FCM. Não invente dados, campos, rotas ou telas que não sejam necessários. Se faltar algum dado de configuração (por exemplo, ID da planilha, nome dos campos do formulário ou estrutura de autenticação do painel), identifique-o claramente em vez de colocar segredos ou valores fictícios no código.

## Documentação oficial para consultar durante a implementação

- Firebase Cloud Messaging para Web: https://firebase.google.com/docs/cloud-messaging/js/client
- Receber mensagens no Web: https://firebase.google.com/docs/cloud-messaging/js/receive
- Enviar mensagens com FCM HTTP v1: https://firebase.google.com/docs/cloud-messaging/send/v1-api
- Google Sheets API: https://developers.google.com/sheets/api
- Contas de serviço do Google Cloud: https://cloud.google.com/iam/docs/service-accounts
- Variáveis de ambiente na Vercel: https://vercel.com/docs/projects/environment-variables
