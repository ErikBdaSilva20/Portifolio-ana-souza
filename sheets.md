# Google Sheets — Estrutura das Abas

Planilha ID: `1aTAMLEyTBAq0cAIOsY2_cgmkX7lUCnhTeL1MF0_UDpo`

Atualize este arquivo sempre que adicionar, remover ou renomear colunas.

---

## `anaFormPushTokens`

Tokens FCM registrados pelos dispositivos da Ana.

| Coluna | Tipo | Descrição |
|---|---|---|
| `token` | string | Token FCM do dispositivo |
| `usuario_id` | string | ID do usuário (opcional) |
| `usuario_email` | string | E-mail do usuário (opcional) |
| `dispositivo` | string | Identificação do dispositivo (opcional) |
| `navegador` | string | Navegador usado (opcional) |
| `plataforma` | string | Plataforma/OS (opcional) |
| `permissao_notificacao` | string | Estado da permissão (opcional) |
| `ativo` | boolean | Se o token está ativo |
| `registrado_em` | datetime | Primeira vez que o token foi salvo |
| `atualizado_em` | datetime | Última atualização do registro |
| `ultimo_acesso_em` | datetime | Último acesso registrado |

---

## `anaFormPushNotifications`

Notificações criadas pelo sistema.

| Coluna | Tipo | Descrição |
|---|---|---|
| `notificacao_id` | string | ID único da notificação |
| `titulo` | string | Título da notificação |
| `mensagem` | string | Corpo da notificação |
| `link` | string | URL de destino ao clicar |
| `dados_adicionais` | string | JSON com dados extras (opcional) |
| `tipo_destinatario` | string | `todos` ou `especifico` |
| `destinatario_id` | string | ID do destinatário (quando específico) |
| `status` | string | `pendente`, `enviada`, `erro` |
| `agendada_para` | datetime | Data/hora de envio agendado |
| `criada_em` | datetime | Criação do registro |
| `enviada_em` | datetime | Confirmação de envio |
| `criada_por` | string | Quem criou |

---

## `anaFormPushLogs`

Log de cada tentativa de envio de notificação.

| Coluna | Tipo | Descrição |
|---|---|---|
| `log_id` | string | ID único do log |
| `notificacao_id` | string | Referência à notificação |
| `token` | string | Token de destino |
| `status_envio` | string | `sucesso` ou `erro` |
| `tentativa_em` | datetime | Timestamp da tentativa |
| `codigo_resposta` | string | Código HTTP retornado pelo FCM |
| `mensagem_erro` | string | Mensagem de erro (quando aplicável) |
| `fcm_message_id` | string | ID retornado pelo FCM em caso de sucesso |

---

## `anaFormLeads` *(criada pelo Apps Script ao rodar `prepararPlanilha()`)*

Leads enviados pelo formulário de contato do site.

| Coluna | Tipo | Descrição |
|---|---|---|
| `lead_id` | string | ID único gerado no momento do envio |
| `nome` | string | Nome completo |
| `email` | string | E-mail de contato |
| `whatsapp` | string | Número de WhatsApp |
| `assunto` | string | Assunto selecionado no formulário |
| `mensagem` | string | Mensagem livre |
| `melhor_horario` | string | Melhor horário para contato (opcional) |
| `criado_em` | datetime | Timestamp do envio |
