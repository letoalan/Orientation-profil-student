/**
 * @file radar.js
 * @description Génération et rendu du graphique radar Chart.js et des barres de scores.
 * Documentation wiki : docs/wiki/modules-js.md#radarjs
 */

import { state, POLE_COLORS } from './state.js';

let chartInstance = null;

const LABELS = [
  'Réaliste (R)', 'Investigateur (I)', 'Artistique (A)',
  'Social (S)', 'Entreprenant (E)', 'Conventionnel (C)'
];

/**
 * Initialise ou actualise le graphique radar Chart.js avec les scores affinés.
 */
export function renderRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const dataValues = [
    state.scores_affines.realiste,
    state.scores_affines.investigateur,
    state.scores_affines.artistique,
    state.scores_affines.social,
    state.scores_affines.entreprenant,
    state.scores_affines.conventionnel
  ];

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: LABELS,
      datasets: [{
        label: 'Score RIASEC (/10)',
        data: dataValues,
        backgroundColor: 'rgba(79, 70, 229, 0.22)',
        borderColor: '#4F46E5',
        borderWidth: 2.5,
        pointBackgroundColor: Object.values(POLE_COLORS),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5.5,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { stepSize: 2, backdropColor: 'transparent', color: '#94a3b8' },
          grid: { color: '#e2e8f0' },
          angleLines: { color: '#cbd5e1' },
          pointLabels: {
            font: { size: 12, weight: '700', family: 'Plus Jakarta Sans' },
            color: '#334155'
          }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

/**
 * Met à jour les barres horizontales sous le radar.
 */
export function renderScoreBars() {
  const container = document.getElementById('scoreBarsList');
  if (!container) return;
  container.innerHTML = '';

  const poles = [
    { key: 'realiste', label: 'Réaliste' },
    { key: 'investigateur', label: 'Investigateur' },
    { key: 'artistique', label: 'Artistique' },
    { key: 'social', label: 'Social' },
    { key: 'entreprenant', label: 'Entreprenant' },
    { key: 'conventionnel', label: 'Conventionnel' }
  ];

  poles.forEach(p => {
    const score = state.scores_affines[p.key] || 0;
    const color = POLE_COLORS[p.key];
    const pct = (score / 10) * 100;

    const el = document.createElement('div');
    el.className = 'score-bar-item';
    el.innerHTML = `
      <div class="score-bar-info">
        <span>${p.label}</span>
        <span style="color: ${color}; font-weight:700;">${score} / 10</span>
      </div>
      <div class="score-track">
        <div class="score-fill" style="width: ${pct}%; background-color: ${color};"></div>
      </div>
    `;
    container.appendChild(el);
  });
}
