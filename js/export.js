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

export function downloadJsonFile() {
  const payload = buildExportPayload();
  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const cleanNom = state.identite.nom.toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'eleve';
  const cleanPrenom = state.identite.prenom.toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'profil';
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
