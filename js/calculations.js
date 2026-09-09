/**
 * @file calculations.js
 * @description Moteur de calculs RIASEC, normalisation et extraction des dominantes.
 * Documentation wiki : docs/wiki/modules-js.md#calculationsjs
 */

import { state, POLE_CODES } from './state.js';

/**
 * Calcule les scores affinés normalisés sur 10 à partir du papier et du questionnaire.
 * Formule : score_brut = score_papier (0-4) + q1 (1-5) + q2 (1-5) => total sur 14.
 * score_affine = (score_brut / 14) * 10.
 */
export function computeScores() {
  const poles = ['realiste', 'investigateur', 'artistique', 'social', 'entreprenant', 'conventionnel'];

  poles.forEach(p => {
    const papier = Number(state.resultats_papier[p]) || 0;
    const q1 = Number(state.questionnaire_quantitatif[p].q1) || 3;
    const q2 = Number(state.questionnaire_quantitatif[p].q2) || 3;
    const brut = papier + q1 + q2;

    const normalise = Math.round(((brut / 14) * 10) * 10) / 10;
    state.scores_affines[p] = normalise;
  });
}

/**
 * Identifie les 3 pôles dominants et forme le code RIASEC (ex: ["A", "S", "E"]).
 * @returns {Array<{pole: string, code: string, score: number}>} Top 3 pôles
 */
export function extractTopPoles() {
  const sorted = Object.entries(state.scores_affines)
    .sort((a, b) => b[1] - a[1]);

  const top3 = sorted.slice(0, 3).map(([pole, score]) => ({
    pole,
    code: POLE_CODES[pole],
    score
  }));

  state.code_resultat = top3.map(item => item.code);
  return top3;
}
