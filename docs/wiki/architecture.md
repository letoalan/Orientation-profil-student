# Wiki — Architecture Système

> 📍 **Index principal** : [Retour à docs/INDEX.md](../INDEX.md)  
> 🔗 **Documents connexes** : [Contrat de données](./data-contract.md) | [Modules JS](./modules-js.md) | [Design System](./design-system.md)

---

## 1. Principes Fondamentaux

L'application **"Profil en 6 couleurs"** répond à trois contraintes architecturales fortes :

1. **Zero-Backend (Serverless pur)** :
   - L'application est un ensemble de fichiers statiques (HTML5, CSS3, ES6 Modules).
   - Déployable sur n'importe quel CDN ou hébergement statique comme **GitHub Pages**.
   - Aucune base de données distante, aucune API REST / GraphQL, aucun abonnement requis.

2. **Confidentialité & RGPD par conception** :
   - Aucune information personnelle (nom, prénom, classe, réponses aux questionnaires, avis familial) n'est envoyée sur le réseau.
   - Les données restent strictement en mémoire dans l'objet JavaScript [`state`](./modules-js.md#statejs) de la session du navigateur.
   - L'élève garde la maîtrise absolue de ses données via le téléchargement local du fichier JSON.

3. **Autonomie et Résilience Hors Ligne** :
   - La table de correspondance des métiers est embarquée avec un mécanisme de secours intégré dans [`js/careers.js`](./modules-js.md#careersjs) garantissant le fonctionnement même si l'élève ouvre directement `index.html` en local (`file://`).

---

## 2. Cycle de Vie de la Session Élève

```mermaid
sequenceDiagram
    participant E as Élève
    participant UI as Interface HTML / DOM
    participant S as state.js (Session)
    participant C as calculations.js
    participant R as radar.js (Chart.js)
    participant M as careers.js
    participant Ex as export.js

    E->>UI: Saisie Nom, Prénom, Classe (Écran 1)
    UI->>S: Stockage mémoire (state.identite)
    E->>UI: Saisie scores papier 0-4 (Écran 2)
    UI->>S: Stockage (state.resultats_papier)
    E->>UI: Réponses 12 questions affinage (Écran 3)
    UI->>S: Stockage (state.questionnaire_quantitatif)
    UI->>C: computeScores()
    C->>S: Mise à jour state.scores_affines (/10)
    UI->>R: renderRadarChart() (Écran 4)
    UI->>M: updateDominantsAndCareers() (Écran 5)
    M->>S: Extraction Top 3 & Recommandation 3 métiers
    E->>UI: Saisie avis parents reporté (Écran 6)
    UI->>S: Stockage (state.avis_parent)
    E->>UI: Clic sur "Télécharger mon profil" (Écran 7)
    UI->>Ex: downloadJsonFile()
    Ex-->>E: Fichier nom_prenom_profil.json (Blob)
```

---

## 3. Déploiement GitHub Pages

1. Branche principale : `main`
2. Dossier source : `/ (root)`
3. Pas d'étape de compilation ni de `npm run build` : les navigateurs modernes chargent nativement `<script type="module" src="./js/main.js"></script>`.
