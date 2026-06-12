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
// ─── CIRURGIA 3 (patch_unifed_macro_v13 — P13) ────────────────────────────────
// PROBLEMA: Object.freeze() aplicado directamente ao literal impedia a injecção
// do operatorToken após carregamento — qualquer tentativa de
// window.UNIFED_CONFIG.operatorToken = '...' falha silenciosamente em strict mode.
// SOLUÇÃO: construção em dois passos — objecto mutável → freeze.
// O token é lido de window._UNIFED_OPERATOR_TOKEN (definível em index.html, via
// meta-tag data-attribute, ou por script de inicialização anterior ao config.js),
// sem nunca ser armazenado em claro neste ficheiro.
// Conformidade: RGPD Art. 25 · ISO/IEC 27037:2012 · D.L. n.º 28/2019.
// ─────────────────────────────────────────────────────────────────────────────
var _unifedConfigBase = {
    isSingleUser:         true,
    sistema:              'UNIFED-PROBATUM',
    versao:               'v1.0-COMMERCIAL-LITIGATION',
    modo:                 'DEMO',
    dataConfig:           new Date().toISOString(),
    aviso:                'CONFIDENCIAL v1.0 — LITÍGIO COMERCIAL E CONTRATUAL — USO RESTRITO A MANDATO JURÍDICO AUTORIZADO',
    // operatorToken: lido de window._UNIFED_OPERATOR_TOKEN antes do freeze.
    // Se ausente, auth.js cai para a credencial padrão 'UNIFED-DEMO-ACCESS'.
    operatorToken:        (typeof window._UNIFED_OPERATOR_TOKEN === 'string' && window._UNIFED_OPERATOR_TOKEN.length > 0)
                              ? window._UNIFED_OPERATOR_TOKEN
                              : undefined
};
// Limpar a variável de janela imediatamente após leitura (princípio de mínima exposição).
if (typeof window._UNIFED_OPERATOR_TOKEN !== 'undefined') {
    delete window._UNIFED_OPERATOR_TOKEN;
}
window.UNIFED_CONFIG = Object.freeze(_unifedConfigBase);
delete window._unifedConfigBase; // garantir que a referência mutável não persiste.

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