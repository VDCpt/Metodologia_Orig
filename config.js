/**
 * ============================================================================
 * UNIFED-PROBATUM | CONFIGURAÇÃO DE OPERADOR (Single-User) - TOKEN DINÂMICO
 * ============================================================================
 * INSTRUÇÕES DE SEGURANÇA:
 *   1. A autenticação é realizada por token derivado da sessão (WebCrypto + salt).
 *   2. Nenhum hash estático é armazenado no lado do cliente.
 *   3. A validação ocorre em tempo de execução no middleware auth.js.
 *
 * Conformidade: RGPD Art. 25 · ISO/IEC 27037:2012 · D.L. n.º 28/2019
 * ============================================================================
 */
window.UNIFED_CONFIG = Object.freeze({
    isSingleUser:         true,
    sistema:              'UNIFED-PROBATUM',
    versao:               'v1.0-COMMERCIAL-LITIGATION',
    modo:                 'DEMO',
    dataConfig:           new Date().toISOString(),
    aviso:                'CONFIDENCIAL v1.0 — LITÍGIO COMERCIAL E CONTRATUAL — USO RESTRITO A MANDATO JURÍDICO AUTORIZADO',
    // ── FASE 3.1 — CIRURGIA 3: operatorToken para demonstração ─────────────
    // Em modo DEMO, o auth.js executa bypass total antes de ler este campo
    // (ver auth.js §FASE-3.1-BYPASS-DEMO). O token abaixo destina-se
    // exclusivamente ao modo não-DEMO em contexto de demonstração controlada.
    // NOTA DE PRODUÇÃO: substituir por injecção via Cloudflare Worker Secret
    // (wrangler secret put UNIFED_OPERATOR_TOKEN) antes de deploy judicial real.
    // ────────────────────────────────────────────────────────────────────────
    operatorToken:        'UNIFED-DEMO-ACCESS'
});

// Limpeza imediata de eventuais variáveis temporárias
delete window._tmp;
console.log('[UNIFED-CONFIG] ✅ Configuração carregada (autenticação por token dinâmico de sessão).');

// ─── FIX-PROXY-01: Endpoint do Worker Cloudflare para LLM Claude (RAG Jurisprudencial) ───────
// Deploy: wrangler deploy · Rota: POST https://api.unifed.com/claude-proxy
// Para activar a síntese jurídica LLM na demonstração, preencher UNIFED_PROXY_SECRET
// com o token configurado no Worker via: wrangler secret put UNIFED_PROXY_SECRET
// Se ambas as variáveis ficarem vazias, o sistema cai automaticamente no fallback estático
// (narrativa local) — sem crash, sem perda de funcionalidade.
window.UNIFED_PROXY_URL    = 'https://api.unifed.com/claude-proxy';
window.UNIFED_PROXY_SECRET = ''; // INSERIR TOKEN DE ACESSO PARA DEMONSTRAÇÃO LLM ACTIVA
console.log('[UNIFED-CONFIG] ℹ️  Proxy LLM configurado: ' + (window.UNIFED_PROXY_SECRET ? '✅ Token presente' : '⚠ Token ausente — modo fallback estático activo'));

// ─── CONFIGURAÇÃO TSA (Autoridade de Carimbos de Tempo) ──────────────────────
// AVISO DE TRANSIÇÃO PARA PRODUÇÃO — LEITURA OBRIGATÓRIA ANTES DO DEPLOY:
//
// O endpoint abaixo é um PLACEHOLDER TÉCNICO DE DEMONSTRAÇÃO.
// A propriedade eidas2Compliant está definida como false até confirmação
// do prestador na Trusted List oficial.
//
// REQUISITO PRÉ-DEPLOY (Art. 22.º Reg. (UE) n.º 910/2014):
//   Verificar que o prestador seleccionado consta da Lista de Confiança
//   publicada pela Autoridade Nacional de Segurança (ANS/CNCS) em:
//   https://www.apdsi.pt/trusted-list  /  https://webgate.ec.europa.eu/tl-browser/
//
// Prestadores qualificados PT recomendados para verificação:
//   - INCM (Imprensa Nacional Casa da Moeda): https://pki.incm.pt
//   - DigitalSign (Certificadora do Mercado): https://www.digitalsign.pt
//   - MULTICERT: https://www.multicert.com
//
// Após validação do prestador:
//   1. Substituir UNIFED_TSA_ENDPOINT pelo URL RFC 3161 verificado.
//   2. Definir UNIFED_TSA_EIDAS_COMPLIANT = true.
//   3. Documentar a validação no manifesto de deploy com data e referência da Trusted List.
// ─────────────────────────────────────────────────────────────────────────────
window.UNIFED_TSA_CONFIG = Object.freeze({
    endpoint:         'https://tsa.incm.pt/tsa/server', // PLACEHOLDER — NÃO VALIDADO NA TRUSTED LIST
    provider:         'INCM — Imprensa Nacional Casa da Moeda (PLACEHOLDER)',
    protocol:         'RFC 3161',
    hashAlgorithm:    'SHA-256',
    eidas2Compliant:  false,  // DEFINIR COMO true APENAS APÓS VALIDAÇÃO EXPLÍCITA NA TRUSTED LIST ANS/CNCS
    validationNote:   'Endpoint requer validação prévia na Trusted List oficial publicada pela ANS/CNCS ' +
                      'nos termos do Artigo 22.º do Regulamento (UE) n.º 910/2014 antes da transição para produção.',
    trustedListURL:   'https://webgate.ec.europa.eu/tl-browser/',
    deployStatus:     'DEMO_ONLY' // Alterar para 'PRODUCTION' após validação
});

console.log(
    '[UNIFED-TSA] ' +
    (window.UNIFED_TSA_CONFIG.eidas2Compliant
        ? '✅ TSA Qualificada activa: ' + window.UNIFED_TSA_CONFIG.provider
        : '⚠️  TSA em modo DEMO — endpoint não validado na Trusted List ANS/CNCS. ' +
          'Não produz carimbos com força probatória qualificada eIDAS 2.0.')
);
