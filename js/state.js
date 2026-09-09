/**
 * @file state.js
 * @description État réactif global, constantes et configuration du modèle RIASEC.
 * Documentation wiki : docs/wiki/modules-js.md#statejs
 */

export const POLE_COLORS = {
  realiste: '#2563EB',
  investigateur: '#7C3AED',
  artistique: '#EC4899',
  social: '#10B981',
  entreprenant: '#F59E0B',
  conventionnel: '#06B6D4'
};

export const POLE_CODES = {
  realiste: 'R',
  investigateur: 'I',
  artistique: 'A',
  social: 'S',
  entreprenant: 'E',
  conventionnel: 'C'
};

export const POLES_LIST = [
  { key: 'realiste', code: 'R', nom: 'Réaliste', sub: 'Pratique & Manuel' },
  { key: 'investigateur', code: 'I', nom: 'Investigateur', sub: 'Logique & Scientifique' },
  { key: 'artistique', code: 'A', nom: 'Artistique', sub: 'Créatif & Intuitif' },
  { key: 'social', code: 'S', nom: 'Social', sub: 'Aide & Relationnel' },
  { key: 'entreprenant', code: 'E', nom: 'Entreprenant', sub: 'Action & Conviction' },
  { key: 'conventionnel', code: 'C', nom: 'Conventionnel', sub: 'Méthode & Organisation' }
];

export const QUESTIONS_CONFIG = [
  { pole: 'realiste', poleNom: 'Réaliste', qId: 'q1', text: 'Je préfère apprendre en manipulant plutôt qu’en lisant.' },
  { pole: 'realiste', poleNom: 'Réaliste', qId: 'q2', text: 'Je me sens à l’aise avec les outils, machines ou le sport.' },
  { pole: 'investigateur', poleNom: 'Investigateur', qId: 'q1', text: 'J’aime comprendre pourquoi et comment les choses fonctionnent.' },
  { pole: 'investigateur', poleNom: 'Investigateur', qId: 'q2', text: 'Je passe du temps à chercher des réponses approfondies à mes questions.' },
  { pole: 'artistique', poleNom: 'Artistique', qId: 'q1', text: 'J’ai besoin de m’exprimer de façon originale et personnelle.' },
  { pole: 'artistique', poleNom: 'Artistique', qId: 'q2', text: 'Je me sens bien et stimulé quand j’invente ou crée quelque chose.' },
  { pole: 'social', poleNom: 'Social', qId: 'q1', text: 'Je me sens utile et épanoui quand j’aide quelqu’un.' },
  { pole: 'social', poleNom: 'Social', qId: 'q2', text: 'Les autres viennent facilement me confier leurs soucis ou demander conseil.' },
  { pole: 'entreprenant', poleNom: 'Entreprenant', qId: 'q1', text: 'J’aime prendre des initiatives et décider pour un groupe.' },
  { pole: 'entreprenant', poleNom: 'Entreprenant', qId: 'q2', text: 'Je me sens à l’aise pour convaincre, négocier ou défendre un projet.' },
  { pole: 'conventionnel', poleNom: 'Conventionnel', qId: 'q1', text: 'J’aime que les choses soient bien rangées, prévues et ordonnées.' },
  { pole: 'conventionnel', poleNom: 'Conventionnel', qId: 'q2', text: 'Je respecte facilement des règles claires, des plannings ou des procédures.' }
];

export const state = {
  currentStep: 1,
  identite: { nom: '', prenom: '', classe: '' },
  resultats_papier: { realiste: 0, investigateur: 0, artistique: 0, social: 0, entreprenant: 0, conventionnel: 0 },
  questionnaire_quantitatif: {
    realiste: { q1: 3, q2: 3 }, investigateur: { q1: 3, q2: 3 }, artistique: { q1: 3, q2: 3 },
    social: { q1: 3, q2: 3 }, entreprenant: { q1: 3, q2: 3 }, conventionnel: { q1: 3, q2: 3 }
  },
  scores_affines: { realiste: 0, investigateur: 0, artistique: 0, social: 0, entreprenant: 0, conventionnel: 0 },
  code_resultat: [],
  analyse_qualitative: '',
  metiers_proposes: [
    { metier: '', avis: 'pourquoi_pas' },
    { metier: '', avis: 'pourquoi_pas' },
    { metier: '', avis: 'pourquoi_pas' }
  ],
  avis_parent: {
    lien: 'Mère', traits_percus: '', coherence_projet: 'oui',
    coherence_pourquoi: '', inquietude: '', domaine_remarque: ''
  },
  date_export: ''
};
