/**
 * @file navigation.js
 * @description Gestion des transitions entre les 7 écrans et validation des formulaires.
 * Documentation wiki : docs/wiki/modules-js.md#navigationjs
 */

import { state } from './state.js';
import { computeScores } from './calculations.js';
import { renderRadarChart, renderScoreBars } from './radar.js';
import { updateDominantsAndCareers } from './careers.js';

export function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 7) return;

  if (stepNumber > state.currentStep) {
    if (state.currentStep === 1 && !validateStep1()) return;
    if (state.currentStep === 2) syncStep2();
    if (state.currentStep === 3) syncStep3();
    if (state.currentStep === 6 && !validateStep6()) return;
  }

  document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${stepNumber}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.step-indicator').forEach(ind => {
    const s = parseInt(ind.getAttribute('data-step'), 10);
    ind.classList.remove('active');
    if (s === stepNumber) ind.classList.add('active');
    else if (s < stepNumber) ind.classList.add('completed');
    else ind.classList.remove('completed');
  });

  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = `${(stepNumber / 7) * 100}%`;

  state.currentStep = stepNumber;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (stepNumber === 4) {
    computeScores();
    renderRadarChart();
    renderScoreBars();
  } else if (stepNumber === 5) {
    updateDominantsAndCareers();
  } else if (stepNumber === 7) {
    renderSummaryScreen();
  }
}

function validateStep1() {
  const nom = document.getElementById('input-nom')?.value.trim();
  const prenom = document.getElementById('input-prenom')?.value.trim();
  const classe = document.getElementById('input-classe')?.value.trim();

  if (!nom || !prenom || !classe) {
    alert('Merci de renseigner ton nom, prénom et classe.');
    return false;
  }
  state.identite.nom = nom;
  state.identite.prenom = prenom;
  state.identite.classe = classe;
  return true;
}

function syncStep2() {
  ['realiste', 'investigateur', 'artistique', 'social', 'entreprenant', 'conventionnel'].forEach(p => {
    const el = document.getElementById(`papier-${p}`);
    if (el) state.resultats_papier[p] = parseInt(el.value, 10) || 0;
  });
}

function syncStep3() {
  ['realiste', 'investigateur', 'artistique', 'social', 'entreprenant', 'conventionnel'].forEach(p => {
    ['q1', 'q2'].forEach(qid => {
      const radio = document.querySelector(`input[name="q_${p}_${qid}"]:checked`);
      if (radio) state.questionnaire_quantitatif[p][qid] = parseInt(radio.value, 10);
    });
  });
}

function validateStep6() {
  const lienRadio = document.querySelector('input[name="parent_lien"]:checked');
  let lien = lienRadio ? lienRadio.value : 'Mère';
  if (lien === 'Autre') {
    const detail = document.getElementById('parent-lien-autre')?.value.trim();
    lien = detail ? `Autre (${detail})` : 'Autre proche';
  }

  const traits = document.getElementById('parent-traits')?.value.trim();
  if (!traits) {
    alert('Merci d’indiquer les 2 traits de caractère décrits par tes proches.');
    return false;
  }

  state.avis_parent = {
    lien,
    traits_percus: traits,
    coherence_projet: document.querySelector('input[name="parent_coherence"]:checked')?.value || 'oui',
    coherence_pourquoi: document.getElementById('parent-coherence-pourquoi')?.value.trim() || '',
    inquietude: document.getElementById('parent-inquietude')?.value.trim() || '',
    domaine_remarque: document.getElementById('parent-domaine')?.value.trim() || ''
  };
  return true;
}

function renderSummaryScreen() {
  document.getElementById('summaryStudentName').textContent = `${state.identite.prenom} ${state.identite.nom}`;
  document.getElementById('summaryStudentClass').textContent = state.identite.classe;
  document.getElementById('summaryProfileCode').textContent = state.code_resultat.join('');

  const list = document.getElementById('summaryMetiersList');
  if (list) {
    list.innerHTML = '';
    state.metiers_proposes.forEach(m => {
      const li = document.createElement('li');
      const icon = m.avis === 'oui' ? '🟢 Oui' : m.avis === 'pourquoi_pas' ? '🟡 Pourquoi pas' : '🔴 Non';
      li.textContent = `${m.metier} — ${icon}`;
      list.appendChild(li);
    });
  }

  const parentReview = document.getElementById('summaryParentReview');
  if (parentReview) {
    parentReview.textContent = `Avis donné par ${state.avis_parent.lien} : Traits « ${state.avis_parent.traits_percus} ». Cohérence projet : ${state.avis_parent.coherence_projet.toUpperCase()}.`;
  }
}
