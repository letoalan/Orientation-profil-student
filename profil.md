# Plan de codage — Application élève "Profil en 6 couleurs"
## Application serverless (GitHub Pages)

## Vue d'ensemble

Application 100% statique, sans backend, déployée sur GitHub Pages.
Aucune donnée n'est envoyée à un serveur : toute la logique (saisie, calculs, moteur de règles,
génération du graphique, export) s'exécute côté client, dans le navigateur.

Sortie unique : un fichier JSON téléchargé localement par l'élève,
qui sera traité ultérieurement par une application séparée (hors périmètre ici).

---

## Structure du dépôt

```
/index.html
/style.css
/app.js
/data/poles-definitions.json
/data/metiers-mapping.json
```

- `poles-definitions.json` : définitions des 6 pôles (nom, définition courte, activités associées)
- `metiers-mapping.json` : table de correspondance combinaisons de pôles dominants → métiers proposés
- `app.js` : logique de navigation entre écrans, calculs, moteur de règles, export
- Chart.js chargé via CDN (pas de build, pas de dépendances npm)

---

## Parcours applicatif (7 écrans, une seule page, navigation JS)

### Écran 1 — Identité

- Champs : Nom, Prénom, Classe
- Stockage en mémoire (objet JS `profil = {}`), aucune persistance

### Écran 2 — Résultats bruts (partie B papier)

- 6 champs numériques (0 à 4), un par pôle :
  Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel
- Reprend le comptage réalisé en classe sur la fiche papier

### Écran 3 — Questionnaire quantitatif (affinage, 12 questions)

Échelle 1 à 5 (pas du tout d'accord → tout à fait d'accord), 2 questions par pôle :

| Pôle | Question 1 | Question 2 |
|---|---|---|
| Réaliste | Je préfère apprendre en manipulant plutôt qu'en lisant | Je me sens à l'aise avec les outils, machines ou le sport |
| Investigateur | J'aime comprendre pourquoi les choses fonctionnent | Je passe du temps à chercher des réponses à mes questions |
| Artistique | J'ai besoin de m'exprimer de façon originale | Je me sens bien quand j'invente ou crée quelque chose |
| Social | Je me sens utile quand j'aide quelqu'un | Les autres me confient facilement leurs problèmes |
| Entreprenant | J'aime prendre des décisions pour un groupe | Je me sens à l'aise pour convaincre ou négocier |
| Conventionnel | J'aime que les choses soient bien rangées et prévues | Je respecte facilement des règles ou des procédures |

**Calcul (côté client, JS pur)** :
score_affine[pole] = resultats_papier[pole] + q1[pole] + q2[pole]
→ score brut sur une échelle 0-14, normalisé /10 pour l'affichage radar

### Écran 4 — Graphique radar

- Chart.js (CDN), radar à 6 axes
- Affichage immédiat des scores affinés, aucune dépendance serveur

### Écran 5 — Moteur d'analyse léger (règles, 100% client-side)

- Lecture de `metiers-mapping.json` : table statique combinaisons de 2-3 pôles dominants → liste de métiers
- Fonction JS : tri des 6 scores → extraction du top 3 → recherche de correspondance dans le mapping → 3 métiers proposés
- Génération d'une phrase qualitative simple à partir d'un template
  (ex. "Ton profil dominant est {pole1}-{pole2}, ce qui oriente vers des métiers de {registre}.")
- Affichage des 3 métiers, avec pour chacun un choix à cocher : Oui / Non / Pourquoi pas

### Écran 6 — Avis des parents (reporté par l'élève)

Consigne affichée : *"Pose à tes parents (ou à un adulte de ta famille) les questions suivantes.
Écoute leurs réponses, puis reporte-les toi-même dans les espaces prévus ci-dessous."*

1. Qui répond ? (mère / père / autre — préciser)
2. Selon toi, quels sont les deux traits de caractère qui me décrivent le mieux ? (champ libre court)
3. Le métier ou secteur que j'envisage te semble-t-il cohérent avec ce que tu observes de moi au quotidien ?
   (Oui / Non / Je ne sais pas) + champ "pourquoi"
4. As-tu une inquiétude ou une réserve sur ce projet ? (champ libre, facultatif)
5. Y a-t-il un domaine ou une activité que tu as remarqué chez moi et qui pourrait éclairer mon orientation,
   même si je n'y ai pas encore pensé ? (champ libre)

### Écran 7 — Export JSON

- Bouton "Télécharger mon profil"
- Génération du fichier `nom_prenom_profil.json` via `Blob` + `URL.createObjectURL`
- Aucun envoi réseau : téléchargement local uniquement

---

## Contrat JSON exporté (structure de sortie)

```json
{
  "identite": {
    "nom": "",
    "prenom": "",
    "classe": ""
  },
  "resultats_papier": {
    "realiste": 0, "investigateur": 0, "artistique": 0,
    "social": 0, "entreprenant": 0, "conventionnel": 0
  },
  "questionnaire_quantitatif": {
    "realiste": {"q1": 0, "q2": 0},
    "investigateur": {"q1": 0, "q2": 0},
    "artistique": {"q1": 0, "q2": 0},
    "social": {"q1": 0, "q2": 0},
    "entreprenant": {"q1": 0, "q2": 0},
    "conventionnel": {"q1": 0, "q2": 0}
  },
  "scores_affines": {
    "realiste": 0, "investigateur": 0, "artistique": 0,
    "social": 0, "entreprenant": 0, "conventionnel": 0
  },
  "code_resultat": ["", "", ""],
  "analyse_qualitative": "",
  "metiers_proposes": [
    {"metier": "", "avis": "oui|non|pourquoi_pas"},
    {"metier": "", "avis": "oui|non|pourquoi_pas"},
    {"metier": "", "avis": "oui|non|pourquoi_pas"}
  ],
  "avis_parent": {
    "lien": "",
    "traits_percus": "",
    "coherence_projet": "oui|non|je_ne_sais_pas",
    "coherence_pourquoi": "",
    "inquietude": "",
    "domaine_remarque": ""
  },
  "date_export": ""
}
```

---

## Déploiement

1. Créer le dépôt GitHub, pousser les fichiers sur la branche `main`
2. Activer GitHub Pages sur cette branche (dossier racine)
3. Aucune CI/CD, aucun build : site statique servi directement
4. Tester le parcours complet avec un jeu de données standard avant mise à disposition des élèves

---

## Ordre de développement recommandé (Antigravity / Gemini 3)

1. Scaffolder `index.html` + `style.css` avec les 7 écrans en navigation simple (show/hide de sections)
2. Implémenter la logique de calcul des scores affinés (Écran 3 → 4)
3. Intégrer Chart.js et générer le radar dynamique (Écran 4)
4. Construire `metiers-mapping.json` et le moteur de règles (Écran 5)
5. Implémenter l'écran avis parent (Écran 6)
6. Implémenter l'export JSON (Écran 7) et valider avec un jeu de données de test
7. Déployer sur GitHub Pages et tester le parcours de bout en bout

---

## Hors périmètre (pour rappel)

Le traitement des JSON exportés (import, base de données, dashboard, synthèse via connecteur MCP)
relève d'une application distincte, non serverless, à spécifier séparément.
