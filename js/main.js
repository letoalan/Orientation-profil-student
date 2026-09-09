/**
 * @file main.js
 * @description Point d'entrée principal ES6, initialisation des formulaires et des événements.
 * Documentation wiki : docs/wiki/modules-js.md#mainjs
 */

import { state, POLES_LIST, QUESTIONS_CONFIG, POLE_COLORS } from './state.js';
import { goToStep } from './navigation.js';
import { downloadJsonFile } from './export.js';

document.addEventListener('DOMContentLoaded', () => {
  initPaperInputs();
  initQuestions();
  bindEvents();
});

function initPaperInputs() {
  const container = document.getElementById('polesInputGrid');
  if (!container) return;
  container.innerHTML = '';

  POLES_LIST.forEach(p => {
    const card = document.createElement('div');
    card.className = `pole-card pole-${p.code.toLowerCase()}`;
    card.innerHTML = `
      <div class="pole-header">
        <span class="pole-badge">${p.code}</span>
        <div>
          <h3>${p.nom}</h3>
          <span class="pole-sub">${p.sub}</span>
        </div>
      </div>
      <div class="stepper-counter">
        <button type="button" class="btn-step-minus" data-pole="${p.key}">−</button>
        <input type="number" id="papier-${p.key}" min="0" max="4" value="0" readonly>
        <button type="button" class="btn-step-plus" data-pole="${p.key}">+</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function initQuestions() {
  const container = document.getElementById('questionsContainer');
  if (!container) return;
  container.innerHTML = '';

  QUESTIONS_CONFIG.forEach((q, idx) => {
    const row = document.createElement('div');
    row.className = 'question-row';

    let optionsHtml = '';
    for (let r = 1; r <= 5; r++) {
      optionsHtml += `
        <div class="scale-option">
          <input type="radio" name="q_${q.pole}_${q.qId}" id="q_${q.pole}_${q.qId}_${r}" value="${r}" ${r === 3 ? 'checked' : ''}>
          <label for="q_${q.pole}_${q.qId}_${r}">${r}</label>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="question-content">
        <span class="question-pole-tag" style="background-color: ${POLE_COLORS[q.pole]};">${q.poleNom}</span>
        <div class="question-text">${idx + 1}. ${q.text}</div>
      </div>
      <div class="scale-options">${optionsHtml}</div>
    `;
    container.appendChild(row);
  });
}

function bindEvents() {
  // Délégation pour les boutons plus/moins
  document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('btn-step-plus')) {
      const p = target.getAttribute('data-pole');
      const input = document.getElementById(`papier-${p}`);
      if (input && Number(input.value) < 4) {
        input.value = Number(input.value) + 1;
        state.resultats_papier[p] = Number(input.value);
      }
    } else if (target.classList.contains('btn-step-minus')) {
      const p = target.getAttribute('data-pole');
      const input = document.getElementById(`papier-${p}`);
      if (input && Number(input.value) > 0) {
        input.value = Number(input.value) - 1;
        state.resultats_papier[p] = Number(input.value);
      }
    }
  });

  // Navigation Écran 1 à 7
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`btn-next-${i}`)?.addEventListener('click', () => goToStep(i + 1));
  }
  for (let i = 2; i <= 7; i++) {
    document.getElementById(`btn-prev-${i}`)?.addEventListener('click', () => goToStep(i - 1));
  }

  // Stepper cliquable pour retour
  document.querySelectorAll('.step-indicator').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = parseInt(btn.getAttribute('data-step'), 10);
      if (s < state.currentStep) goToStep(s);
    });
  });

  // Gestion radio proche 'Autre'
  document.querySelectorAll('input[name="parent_lien"]').forEach(r => {
    r.addEventListener('change', () => {
      const input = document.getElementById('parent-lien-autre');
      if (input) input.style.display = r.value === 'Autre' ? 'block' : 'none';
    });
  });

  // Téléchargement JSON & Recommencer
  document.getElementById('btnDownloadJson')?.addEventListener('click', downloadJsonFile);
  document.getElementById('btnRestart')?.addEventListener('click', () => {
    if (confirm('Recommencer à zéro ?')) window.location.reload();
  });
}
