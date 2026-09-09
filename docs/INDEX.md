# Wiki-Documentation — Application "Profil en 6 couleurs"

Bienvenue dans le centre de documentation interconnecté du projet **Profil en 6 couleurs (RIASEC)**.

L'application est une Single Page Application (SPA) **100% statique et serverless**, conçue pour être hébergée sans aucun frais sur **GitHub Pages** et s'exécutant intégralement côté client.

---

## 🗺️ Sommaire & Navigation Rapide

| Document | Objet & Contenu | Fichiers associés |
|---|---|---|
| 📐 [Architecture Système](./wiki/architecture.md) | Principes serverless, modèle RIASEC, cycle de vie des données | `index.html`, `profil.md` |
| 📋 [Contrat JSON d'échange](./wiki/data-contract.md) | Schéma de sortie, types de champs, validation | `js/export.js`, `profil.md` |
| ⚙️ [Modules JavaScript](./wiki/modules-js.md) | Rôle, exports et responsabilités de chaque module (< 200 lignes) | `js/*.js` |
| 🎨 [Design System & UI](./wiki/design-system.md) | Nuancier des 6 pôles, typographie, découpage CSS | `css/*.css`, `style.css` |

---

## 📂 Architecture des Fichiers Source (< 200 lignes)

Chaque fichier du dépôt a été conçu pour rester sous la barre des 200 lignes afin de garantir une lisibilité, une testabilité et une maintenabilité maximales.

```
Orientation-profil-student/
├── docs/                             # Documentation Wiki interconnectée
│   ├── INDEX.md                      # Index centralisateur (vous êtes ici)
│   └── wiki/
│       ├── architecture.md           # Architecture globale & cycle de vie
│       ├── data-contract.md          # Contrat JSON de sortie
│       ├── modules-js.md             # Documentation détaillée des modules JS
│       └── design-system.md          # Design tokens & styles modulaires
│
├── js/                               # Modules JavaScript natifs ES6
│   ├── state.js                      # État réactif global & constantes (65 lignes)
│   ├── calculations.js               # Calculs RIASEC & normalisation /10 (37 lignes)
│   ├── radar.js                      # Intégration Chart.js & barres (98 lignes)
│   ├── careers.js                    # Correspondances dominantes & métiers (93 lignes)
│   ├── export.js                     # Génération Blob JSON conforme (63 lignes)
│   ├── navigation.js                 # Stepper & validations d'écrans (109 lignes)
│   └── main.js                       # Initialisation & événements DOM (110 lignes)
│
├── css/                              # Modules CSS
│   ├── variables.css                 # Tokens de couleur & design (56 lignes)
│   ├── layout.css                    # Mise en page, stepper & boutons (187 lignes)
│   ├── screens-1-3.css               # Formulaires écrans 1, 2 et 3 (177 lignes)
│   └── screens-4-7.css               # Radar, cartes métiers, parents, export (163 lignes)
│
├── data/                             # Référentiels statiques
│   ├── poles-definitions.json        # Définitions des 6 pôles
│   └── metiers-mapping.json          # Correspondance combinaisons -> métiers
│
├── index.html                        # SPA 7 écrans (187 lignes)
├── style.css                         # Import centralisateur CSS (9 lignes)
├── profil.md                         # Spécification initiale
└── README.md                         # Guide de mise en ligne GitHub Pages
```

---

## 🔗 Liens croisés entre composants
- Le module [js/state.js](../js/state.js) alimente [js/calculations.js](../js/calculations.js) et [js/export.js](../js/export.js).
- Pour comprendre comment les calculs alimentent le radar, consultez [wiki/modules-js.md#radarjs](./wiki/modules-js.md#radarjs).
- Pour consulter la palette hexadécimale exacte, consultez [wiki/design-system.md#palette-riasec](./wiki/design-system.md#palette-riasec).
