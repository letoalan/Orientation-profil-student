/**
 * @file export.js
 * @description Construction stricte du contrat JSON d'échange et déclenchement du Blob local.
 * Documentation wiki : docs/wiki/modules-js.md#exportjs
 */

import { state } from './state.js';

export function buildExportPayload() {
  state.date_export = new Date().toISOString();

  return {
    identite: {
      nom: state.identite.nom,
      prenom: state.identite.prenom,
      classe: state.identite.classe
    },
    resultats_papier: {
      realiste: state.resultats_papier.realiste,
      investigateur: state.resultats_papier.investigateur,
      artistique: state.resultats_papier.artistique,
      social: state.resultats_papier.social,
      entreprenant: state.resultats_papier.entreprenant,
      conventionnel: state.resultats_papier.conventionnel
    },
    questionnaire_quantitatif: {
      realiste: { ...state.questionnaire_quantitatif.realiste },
      investigateur: { ...state.questionnaire_quantitatif.investigateur },
      artistique: { ...state.questionnaire_quantitatif.artistique },
      social: { ...state.questionnaire_quantitatif.social },
      entreprenant: { ...state.questionnaire_quantitatif.entreprenant },
      conventionnel: { ...state.questionnaire_quantitatif.conventionnel }
    },
    scores_affines: {
      realiste: state.scores_affines.realiste,
      investigateur: state.scores_affines.investigateur,
      artistique: state.scores_affines.artistique,
      social: state.scores_affines.social,
      entreprenant: state.scores_affines.entreprenant,
      conventionnel: state.scores_affines.conventionnel
    },
    code_resultat: [...state.code_resultat],
    analyse_qualitative: state.analyse_qualitative,
    metiers_proposes: state.metiers_proposes.map(m => ({ metier: m.metier, avis: m.avis })),
    avis_parent: { ...state.avis_parent },
    date_export: state.date_export
  };
}

/**
 * Nettoie et translittère une chaîne pour un nom de fichier ASCII sécurisé
 * (ex: 'Éléonore' -> 'eleonore', 'François' -> 'francois')
 */
function sanitizeForFilename(str, fallback = 'inconnu') {
  if (!str) return fallback;
  return str
    .trim()
    .normalize('NFD') // Décompose les accents (é -> e +  ́)
    .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') || fallback;
}

export function downloadJsonFile() {
  const payload = buildExportPayload();
  // Sérialisation propre avec indentation
  const jsonStr = JSON.stringify(payload, null, 2);

  // Ajout du BOM UTF-8 (\uFEFF) pour garantir qu'Excel, Bloc-notes et tous les parseurs
  // reconnaissent immédiatement et sans ambiguïté les caractères accentués français (é, è, ê, à, ç, œ, etc.)
  const blob = new Blob(['\uFEFF' + jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const cleanNom = sanitizeForFilename(state.identite.nom, 'eleve');
  const cleanPrenom = sanitizeForFilename(state.identite.prenom, 'profil');
  const filename = `${cleanNom}_${cleanPrenom}_profil.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  const msg = document.getElementById('downloadSuccessMsg');
  if (msg) msg.style.display = 'flex';
}
