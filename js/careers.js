/**
 * @file careers.js
 * @description Moteur de règles des correspondances RIASEC -> Métiers et templates qualitatifs.
 * Documentation wiki : docs/wiki/modules-js.md#careersjs
 */

import { state, POLE_COLORS } from './state.js';
import { extractTopPoles } from './calculations.js';

const FALLBACK_MAPPINGS = [
  { code: "RI", synthese: "Ton profil dominant Réaliste-Investigateur oriente vers la technique concrète et l'analyse.", metiers: ["Ingénieur mécanique / mécatronique", "Technicien de laboratoire", "Développeur de systèmes embarqués"] },
  { code: "RA", synthese: "Ton profil dominant Réaliste-Artistique oriente vers la matière et la création manuelle.", metiers: ["Architecte d'intérieur / Ébéniste", "Designer industriel", "Paysagiste / Créateur d'espaces"] },
  { code: "RS", synthese: "Ton profil dominant Réaliste-Social oriente vers le travail d'action au service d'autrui.", metiers: ["Kinésithérapeute / Ergothérapeute", "Éducateur sportif", "Pompier / Secouriste"] },
  { code: "RE", synthese: "Ton profil dominant Réaliste-Entreprenant oriente vers la réalisation de chantiers et le pilotage.", metiers: ["Conducteur de travaux", "Ingénieur logistique", "Entrepreneur du bâtiment / Artisan"] },
  { code: "RC", synthese: "Ton profil dominant Réaliste-Conventionnel oriente vers la précision technique et le respect des normes.", metiers: ["Technicien de maintenance", "Contrôleur qualité industrielle", "Géomètre / Topographe"] },
  { code: "IA", synthese: "Ton profil dominant Investigateur-Artistique oriente vers la recherche innovante et l'imagination.", metiers: ["Concepteur de jeux vidéo / Game Designer", "Chercheur en sciences cognitives / UX Researcher", "Scénariste / Rédacteur"] },
  { code: "IS", synthese: "Ton profil dominant Investigateur-Social oriente vers l'expertise au service de la santé et du savoir.", metiers: ["Médecin / Professionnel de santé", "Psychologue clinicien", "Enseignant-chercheur"] },
  { code: "IE", synthese: "Ton profil dominant Investigateur-Entreprenant oriente vers l'analyse stratégique et la prise de décision.", metiers: ["Data Analyst / Data Scientist", "Consultant en stratégie ou innovation", "Chef de produit technologique"] },
  { code: "IC", synthese: "Ton profil dominant Investigateur-Conventionnel oriente vers le traitement rigoureux des chiffres et données.", metiers: ["Analyste financier / Actuaire", "Expert en cybersécurité / Audit", "Statisticien / Bio-informaticien"] },
  { code: "AS", synthese: "Ton profil dominant Artistique-Social oriente vers l'expression créative et la médiation humaine.", metiers: ["Médiateur culturel / Animateur d'ateliers", "Art-thérapeute", "Graphiste / Directeur artistique"] },
  { code: "AE", synthese: "Ton profil dominant Artistique-Entreprenant oriente vers la création visuelle et la direction de projet.", metiers: ["Directeur artistique / Publicité", "Producteur audiovisuel / Événementiel", "Architecte d'espaces"] },
  { code: "AC", synthese: "Ton profil dominant Artistique-Conventionnel oriente vers le design soigné, la mise en page et l'édition.", metiers: ["Webdesigner / Intégrateur UI", "Éditeur / Maquettiste PAO", "Conservateur / Documentaliste"] },
  { code: "SE", synthese: "Ton profil dominant Social-Entreprenant oriente vers l'animation d'équipes et le relationnel dynamique.", metiers: ["Responsable Ressources Humaines", "Manager dans l'économie sociale / ONG", "Conseiller en insertion professionnelle"] },
  { code: "SC", synthese: "Ton profil dominant Social-Conventionnel oriente vers l'accompagnement des personnes et l'organisation.", metiers: ["Gestionnaire médico-social", "Assistant de service social", "Coordinateur pédagogique"] },
  { code: "EC", synthese: "Ton profil dominant Entreprenant-Conventionnel oriente vers le management, la négociation et la gestion.", metiers: ["Juriste d'entreprise / Notaire", "Directeur d'agence commerciale", "Auditeur de gestion / Contrôleur financier"] }
];

export function updateDominantsAndCareers() {
  const top3 = extractTopPoles();
  const c1 = top3[0].code;
  const c2 = top3[1].code;
  const pair = `${c1}${c2}`;
  const pairRev = `${c2}${c1}`;

  // Affichage badges
  const badgesBox = document.getElementById('profileCodeBadges');
  if (badgesBox) {
    badgesBox.innerHTML = '';
    top3.forEach((item, idx) => {
      const b = document.createElement('span');
      b.className = 'code-badge-large';
      b.style.backgroundColor = POLE_COLORS[item.pole];
      b.textContent = `${idx + 1}. ${item.pole.toUpperCase()} (${item.code})`;
      badgesBox.appendChild(b);
    });
  }

  const match = FALLBACK_MAPPINGS.find(m => m.code === pair || m.code === pairRev);
  const qualitativeEl = document.getElementById('qualitativeAnalysisText');

  let metiersList = [];
  if (match) {
    state.analyse_qualitative = match.synthese;
    metiersList = match.metiers.slice(0, 3);
  } else {
    state.analyse_qualitative = `Ton profil dominant est ${top3[0].pole}-${top3[1].pole}, ce qui oriente vers des métiers de polyvalence et de coordination.`;
    metiersList = ["Chef de projet polyvalent", "Chargé d'études et de mission", "Coordinateur de projets"];
  }

  if (qualitativeEl) qualitativeEl.textContent = state.analyse_qualitative;

  state.metiers_proposes = metiersList.map((m, idx) => ({
    metier: m,
    avis: state.metiers_proposes[idx]?.metier === m ? state.metiers_proposes[idx].avis : 'pourquoi_pas'
  }));

  renderCareersCards();
}

function renderCareersCards() {
  const listEl = document.getElementById('metiersCardsList');
  if (!listEl) return;
  listEl.innerHTML = '';

  state.metiers_proposes.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'metier-card';

    const title = document.createElement('span');
    title.className = 'metier-name';
    title.textContent = item.metier;

    const group = document.createElement('div');
    group.className = 'metier-opinion-buttons';

    const opts = [
      { val: 'oui', label: 'Oui 👍' },
      { val: 'pourquoi_pas', label: 'Pourquoi pas 🤔' },
      { val: 'non', label: 'Non 👎' }
    ];

    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-opinion ${item.avis === opt.val ? 'selected' : ''}`;
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        state.metiers_proposes[idx].avis = opt.val;
        group.querySelectorAll('.btn-opinion').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      group.appendChild(btn);
    });

    card.appendChild(title);
    card.appendChild(group);
    listEl.appendChild(card);
  });
}
