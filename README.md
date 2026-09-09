# Application élève — "Profil en 6 couleurs" (Méthode RIASEC)

Application web **100% statique et serverless**, conçue pour être déployée directement sur **GitHub Pages**.

Aucune donnée n'est envoyée à un serveur : la saisie, les calculs de normalisation, le rendu du radar Chart.js et la production du fichier JSON s'exécutent entièrement côté client dans le navigateur de l'élève.

---

## 🧭 Fonctionnalités (Parcours en 7 écrans)

1. **Écran 1 — Identité** : Saisie du nom, prénom et classe (en mémoire JS locale).
2. **Écran 2 — Fiche papier (Partie B)** : Report des scores bruts (0 à 4) pour les 6 pôles RIASEC.
3. **Écran 3 — Questionnaire quantitatif (Affinage 12 questions)** : Échelle de 1 à 5, 2 questions par pôle.
   - Formule : `score_affine = score_papier + q1 + q2` (score brut sur 14, normalisé sur 10).
4. **Écran 4 — Graphique radar** : Visualisation Chart.js à 6 axes des dominantes RIASEC.
5. **Écran 5 — Moteur de règles & Métiers** : Extraction du Top 3 des dominantes, synthèse qualitative et 3 métiers suggérés avec vote d'intérêt (*Oui*, *Pourquoi pas*, *Non*).
6. **Écran 6 — Avis des parents reporté** : Questionnement familial guidé (traits observés, cohérence perçue, remarques).
7. **Écran 7 — Export JSON sécurisé** : Téléchargement direct du fichier `<nom>_<prenom>_profil.json`.

---

## 📁 Structure du projet

```
Orientation-profil-student/
├── index.html                   # Interface SPA (7 écrans)
├── style.css                    # Design moderne, accessible et responsive
├── app.js                       # Logique applicative, calculs, Chart.js et export
├── data/
│   ├── poles-definitions.json   # Définitions des 6 pôles (R, I, A, S, E, C)
│   └── metiers-mapping.json     # Table de correspondance combinaisons -> métiers
├── profil.md                    # Cahier des charges et spécifications
└── README.md                    # Présentation et guide de déploiement
```

---

## 🚀 Déploiement sur GitHub Pages (en 3 étapes)

1. **Pousser** les fichiers sur votre dépôt GitHub :
   ```bash
   git add .
   git commit -m "Déploiement initial de l'app élève Profil en 6 couleurs"
   git push origin main
   ```
2. Dans votre dépôt GitHub sur le navigateur, rendez-vous dans :
   - **Settings** > **Pages**
3. Sous **Build and deployment** :
   - **Source** : `Deploy from a branch`
   - **Branch** : `main` et dossier `/(root)`
   - Cliquez sur **Save**.

L'application est instantanément accessible en ligne, sans frais, prête pour les élèves en classe ou à la maison.
