# Wiki — Contrat JSON d'Échange

> 📍 **Index principal** : [Retour à docs/INDEX.md](../INDEX.md)  
> 🔗 **Documents connexes** : [Architecture](./architecture.md) | [Module export.js](./modules-js.md#exportjs)

---

## 1. Description du Contrat

Le fichier JSON téléchargé par l'élève à l'Écran 7 constitue le pivot d'échange unique entre l'application de saisie élève et toute application aval (consultation enseignant, synthèse IA, archivage).

Le schéma est strictement conforme aux spécifications de [profil.md](../../profil.md#L98-L138).

---

## 2. Spécification des Clés

| Propriété | Type | Obligatoire | Description |
|---|---|:---:|---|
| `identite` | `Object` | Oui | Contient `nom` (String), `prenom` (String), `classe` (String). |
| `resultats_papier` | `Object` | Oui | Entiers (0 à 4) pour `realiste`, `investigateur`, `artistique`, `social`, `entreprenant`, `conventionnel`. |
| `questionnaire_quantitatif` | `Object` | Oui | Pour chaque pôle, sous-objet `{ "q1": 1-5, "q2": 1-5 }`. |
| `scores_affines` | `Object` | Oui | Nombres décimaux normalisés sur 10 : `((papier + q1 + q2) / 14) * 10`. |
| `code_resultat` | `Array<String>` | Oui | 3 lettres des pôles dominants triés par score décroissant (ex: `["I", "A", "S"]`). |
| `analyse_qualitative` | `String` | Oui | Phrase de synthèse générée à partir des 2 premiers pôles dominants. |
| `metiers_proposes` | `Array<Object>` | Oui | 3 objets avec `metier` (String) et `avis` (`"oui"` \| `"pourquoi_pas"` \| `"non"`). |
| `avis_parent` | `Object` | Oui | Réponses recueillies par l'élève : `lien`, `traits_percus`, `coherence_projet`, `coherence_pourquoi`, `inquietude`, `domaine_remarque`. |
| `date_export` | `String` | Oui | Horodatage ISO 8601 de la génération (ex: `2026-09-09T16:20:00.000Z`). |

---

## 3. Exemple Réel d'Export Valide

```json
{
  "identite": {
    "nom": "Dupont",
    "prenom": "Jean",
    "classe": "1ère Générale 2"
  },
  "resultats_papier": {
    "realiste": 1,
    "investigateur": 4,
    "artistique": 3,
    "social": 2,
    "entreprenant": 1,
    "conventionnel": 0
  },
  "questionnaire_quantitatif": {
    "realiste": {"q1": 2, "q2": 3},
    "investigateur": {"q1": 5, "q2": 5},
    "artistique": {"q1": 4, "q2": 5},
    "social": {"q1": 3, "q2": 3},
    "entreprenant": {"q1": 2, "q2": 2},
    "conventionnel": {"q1": 1, "q2": 2}
  },
  "scores_affines": {
    "realiste": 4.3,
    "investigateur": 10.0,
    "artistique": 8.6,
    "social": 5.7,
    "entreprenant": 3.6,
    "conventionnel": 2.1
  },
  "code_resultat": ["I", "A", "S"],
  "analyse_qualitative": "Ton profil dominant Investigateur-Artistique oriente vers la recherche innovante et l'imagination.",
  "metiers_proposes": [
    {"metier": "Concepteur de jeux vidéo / Game Designer", "avis": "oui"},
    {"metier": "Chercheur en sciences cognitives / UX Researcher", "avis": "pourquoi_pas"},
    {"metier": "Scénariste / Rédacteur", "avis": "non"}
  ],
  "avis_parent": {
    "lien": "Mère",
    "traits_percus": "Curieux et observateur",
    "coherence_projet": "oui",
    "coherence_pourquoi": "Toujours attiré par la création numérique.",
    "inquietude": "Secteur sélectif.",
    "domaine_remarque": "Aisance pour expliquer les nouvelles technologies."
  },
  "date_export": "2026-09-09T16:20:00.000Z"
}
```
