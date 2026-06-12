/**
 * ============================================================================
 * UNIFED-PROBATUM | VERSION MANIFEST (patch_unifed_macro_v13 — P13)
 * ============================================================================
 * Fonte única de verdade para a versão do sistema.
 * Carregado PRIMEIRO em index.html (antes de qualquer outro script).
 * Norma: D.L. n.º 28/2019 — rastreabilidade de versões de software técnico-jurídica.
 * ============================================================================
 */
window.UNIFED_VERSION = Object.freeze({
    full:  'v1.0-COMMERCIAL-LITIGATION',
    major: 1,
    minor: 0,
    patch: 0,
    build: '2025-03-15',
    corte: 'v1.0-COMMERCIAL-LITIGATION'
});
console.log('[UNIFED-VERSION] ✅ Version manifest carregado:', window.UNIFED_VERSION.full);
