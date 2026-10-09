var SPREADSHEET_ID = '1aTAMLEyTBAq0cAIOsY2_cgmkX7lUCnhTeL1MF0_UDpo';

var SHEETS = {
  TOKENS: 'anaFormPushTokens',
  NOTIFICATIONS: 'anaFormPushNotifications',
  LOGS: 'anaFormPushLogs',
  LEADS: 'anaFormLeads'
};

var HEADERS = {
  TOKENS: [
    'token',
    'usuario_id',
    'usuario_email',
    'dispositivo',
    'navegador',
    'plataforma',
    'permissao_notificacao',
    'ativo',
    'registrado_em',
    'atualizado_em',
    'ultimo_acesso_em'
  ],

  NOTIFICATIONS: [
    'notificacao_id',
    'titulo',
    'mensagem',
    'link',
    'dados_adicionais',
    'tipo_destinatario',
    'destinatario_id',
    'status',
    'agendada_para',
    'criada_em',
    'enviada_em',
    'criada_por'
  ],

  LOGS: [
    'log_id',
    'notificacao_id',
    'token',
    'status_envio',
    'tentativa_em',
    'codigo_resposta',
    'mensagem_erro',
    'fcm_message_id'
  ],

  LEADS: [
    'lead_id',
    'nome',
    'email',
    'whatsapp',
    'assunto',
    'mensagem',
    'melhor_data',
    'criado_em'
  ]
};


// Cria as abas e garante que todos os cabeçalhos existam.
// Preserva os dados e os cabeçalhos que já existem.
function prepararPlanilha() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  garantirAba(ss, SHEETS.TOKENS, HEADERS.TOKENS);
  garantirAba(ss, SHEETS.NOTIFICATIONS, HEADERS.NOTIFICATIONS);
  garantirAba(ss, SHEETS.LOGS, HEADERS.LOGS);
  garantirAba(ss, SHEETS.LEADS, HEADERS.LEADS);

  return {
    tokens: ss.getSheetByName(SHEETS.TOKENS).getName(),
    notificacoes: ss.getSheetByName(SHEETS.NOTIFICATIONS).getName(),
    logs: ss.getSheetByName(SHEETS.LOGS).getName(),
    leads: ss.getSheetByName(SHEETS.LEADS).getName()
  };
}


function garantirAba(ss, nome, cabecalhos) {
  var sheet = ss.getSheetByName(nome);

  if (!sheet) {
    sheet = ss.insertSheet(nome);
  }

  var ultimaColuna = sheet.getLastColumn();

  if (ultimaColuna === 0) {
    sheet.getRange(1, 1, 1, cabecalhos.length)
      .setValues([cabecalhos]);
    sheet.setFrozenRows(1);
    return sheet;
  }

  var existentes = sheet
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0]
    .map(function (valor) {
      return String(valor).trim();
    });

  cabecalhos.forEach(function (cabecalho) {
    if (existentes.indexOf(cabecalho) === -1) {
      existentes.push(cabecalho);
      sheet.getRange(1, existentes.length).setValue(cabecalho);
    }
  });

  sheet.setFrozenRows(1);
  return sheet;
}


// Roteador principal — distingue leads de tokens pelo campo type.
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return resposta({ ok: false, error: 'Corpo da requisição ausente.' });
    }

    var body = JSON.parse(e.postData.contents);

    if (body.type === 'lead') {
      return registrarLead(body, lock);
    }

    return registrarToken(body, lock);

  } catch (err) {
    return resposta({ ok: false, error: err.message });
  }
}


// Registra um lead enviado pelo formulário de contato.
function registrarLead(body, lock) {
  var nome = String(body.nome || '').trim();
  var email = String(body.email || '').trim();

  if (!nome || !email) {
    return resposta({ ok: false, error: 'Nome e e-mail são obrigatórios.' });
  }

  lock.waitLock(10000);

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  garantirAba(ss, SHEETS.LEADS, HEADERS.LEADS);

  var sheet = ss.getSheetByName(SHEETS.LEADS);
  var ultimaLinha = sheet.getLastRow();
  var ultimaColuna = sheet.getLastColumn();

  var cabecalhos = sheet
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0]
    .map(function (v) { return String(v).trim(); });

  var agora = new Date();
  var leadId = 'lead_' + agora.getTime();
  var linha = new Array(ultimaColuna).fill('');

  function definir(campo, valor) {
    var i = cabecalhos.indexOf(campo);
    if (i !== -1 && valor !== undefined && valor !== null && valor !== '') {
      linha[i] = valor;
    }
  }

  definir('lead_id', leadId);
  definir('nome', nome);
  definir('email', email);
  definir('whatsapp', body.whatsapp);
  definir('assunto', body.assunto);
  definir('mensagem', body.mensagem);
  definir('melhor_data', body.melhor_data);
  definir('criado_em', agora);

  var novaLinha = Math.max(2, ultimaLinha + 1);
  sheet.getRange(novaLinha, 1, 1, ultimaColuna).setValues([linha]);
  SpreadsheetApp.flush();

  return resposta({ ok: true, message: 'Lead registrado.', lead_id: leadId });
}


// Recebe e registra tokens FCM enviados pelo site.
function registrarToken(body, lock) {
  var token = body.token;

  if (typeof token !== 'string' || !token.trim()) {
    return resposta({ ok: false, error: 'Token ausente ou inválido.' });
  }

  token = token.trim();
  lock.waitLock(10000);

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  garantirAba(ss, SHEETS.TOKENS, HEADERS.TOKENS);
  garantirAba(ss, SHEETS.NOTIFICATIONS, HEADERS.NOTIFICATIONS);
  garantirAba(ss, SHEETS.LOGS, HEADERS.LOGS);

  var sheet = ss.getSheetByName(SHEETS.TOKENS);
  var ultimaLinha = sheet.getLastRow();
  var ultimaColuna = sheet.getLastColumn();

  var cabecalhos = sheet
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0]
    .map(function (valor) { return String(valor).trim(); });

  var colunaToken = cabecalhos.indexOf('token') + 1;

  if (colunaToken === 0) {
    throw new Error('Coluna token não encontrada.');
  }

  var agora = new Date();
  var linhaToken = -1;

  if (ultimaLinha >= 2) {
    var tokens = sheet
      .getRange(2, colunaToken, ultimaLinha - 1, 1)
      .getValues();

    for (var i = 0; i < tokens.length; i++) {
      if (String(tokens[i][0]).trim() === token) {
        linhaToken = i + 2;
        break;
      }
    }
  }

  var novoRegistro = linhaToken === -1;
  var linha;

  if (novoRegistro) {
    linhaToken = Math.max(2, ultimaLinha + 1);
    linha = new Array(ultimaColuna).fill('');
  } else {
    linha = sheet.getRange(linhaToken, 1, 1, ultimaColuna).getValues()[0];
  }

  function definir(campo, valor) {
    var indice = cabecalhos.indexOf(campo);
    if (indice !== -1 && valor !== undefined && valor !== null) {
      linha[indice] = valor;
    }
  }

  definir('token', token);
  definir('atualizado_em', agora);
  definir('ultimo_acesso_em', agora);
  definir('ativo', true);

  if (novoRegistro) {
    definir('registrado_em', agora);
  }

  definir('usuario_id', body.usuario_id);
  definir('usuario_email', body.usuario_email);
  definir('dispositivo', body.dispositivo);
  definir('navegador', body.navegador);
  definir('plataforma', body.plataforma);
  definir('permissao_notificacao', body.permissao_notificacao);

  sheet.getRange(linhaToken, 1, 1, ultimaColuna).setValues([linha]);
  SpreadsheetApp.flush();

  return resposta({
    ok: true,
    message: novoRegistro ? 'Token registrado.' : 'Token atualizado.',
    novo: novoRegistro
  });
}


// Retorna os leads da planilha para o painel.
// Requer ?secret=VITE_APPS_SCRIPT_SECRET para evitar acesso aberto.
function doGet(e) {
  var secret = e && e.parameter && e.parameter.secret;
  var expected = PropertiesService.getScriptProperties().getProperty('SECRET');

  if (!expected || secret !== expected) {
    return resposta({ ok: false, error: 'Não autorizado.' });
  }

  var resource = e.parameter.resource;

  if (resource === 'leads') return buscarLeads();
  return resposta({ ok: false, error: 'Recurso desconhecido.' });
}

function buscarLeads() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  garantirAba(ss, SHEETS.LEADS, HEADERS.LEADS);

  var sheet = ss.getSheetByName(SHEETS.LEADS);
  var ultimaLinha = sheet.getLastRow();
  var ultimaColuna = sheet.getLastColumn();

  if (ultimaLinha < 2) {
    return resposta({ ok: true, leads: [] });
  }

  var cabecalhos = sheet
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0]
    .map(function (v) { return String(v).trim(); });

  var linhas = sheet
    .getRange(2, 1, ultimaLinha - 1, ultimaColuna)
    .getValues();

  var leads = linhas.map(function (linha) {
    var obj = {};
    cabecalhos.forEach(function (col, i) {
      var val = linha[i];
      obj[col] = val instanceof Date ? val.toISOString() : val;
    });
    return obj;
  });

  return resposta({ ok: true, leads: leads });
}


function resposta(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}


function testarPlanilha() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('Nome: ' + ss.getName());
  Logger.log('Abas: ' + ss.getSheets().map(function(s) { return s.getName(); }).join(', '));
  var resultado = prepararPlanilha();
  Logger.log('Resultado: ' + JSON.stringify(resultado));
}
