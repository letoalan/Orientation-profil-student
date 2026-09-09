# Wiki — Design System & Styles Modulaires (`css/`)

> 📍 **Index principal** : [Retour à docs/INDEX.md](../INDEX.md)  
> 🔗 **Documents connexes** : [Architecture](./architecture.md) | [Modules JS](./modules-js.md)

Le style de l'application est conçu en **Vanilla CSS modulaire**, sans Tailwind ni préprocesseur, chaque module faisant **moins de 190 lignes**.

---

## 1. Palette RIASEC

Chaque dimension du modèle de John L. Holland est associée à une identité chromatique unique :

| Pôle | Code | Couleur Hex | Aperçu CSS | Profil psychologique |
|---|:---:|:---:|---|---|
| **Réaliste** | R | `#2563EB` | `var(--color-realiste)` | Concret, manuel, extérieur, technique |
| **Investigateur** | I | `#7C3AED` | `var(--color-investigateur)` | Logique, scientifique, curieux, analyste |
| **Artistique** | A | `#EC4899` | `var(--color-artistique)` | Créatif, intuitif, expressif, sensible |
| **Social** | S | `#10B981` | `var(--color-social)` | Empathique, aidant, communicant, altruiste |
| **Entreprenant** | E | `#F59E0B` | `var(--color-entreprenant)` | Leader, convaincant, décideur, dynamique |
| **Conventionnel** | C | `#06B6D4` | `var(--color-conventionnel)` | Méthodique, ordonné, rigoureux, précis |

---

## 2. Découpage des Modules CSS

### `variables.css` (56 lignes)
Définit les variables `:root` :
- Palette RIASEC ci-dessus.
- Nuances de fond (`--bg-app`, `--bg-surface`, `--bg-subtle`).
- Ombres portées (`--shadow-sm`, `--shadow-md`, `--shadow-lg`).
- Typographie : Google Font *Plus Jakarta Sans*.

### `layout.css` (187 lignes)
Structure globale et composants d'interface communs :
- `.app-container` : Largeur maximale 920px, centrage, disposition responsive.
- `.app-header` : Marque, logo à 6 pastilles et badge élève.
- `.stepper-nav` : Barre de progression dégradée et pastilles numérotées des 7 étapes.
- `.screen-actions` : Boutons d'action `btn-primary`, `btn-secondary`, `btn-outline`.

### `screens-1-3.css` (177 lignes)
Styles pour la phase de recueil des données :
- Écran 1 : Grille de saisie `.form-grid` et notice de confidentialité `.notice-box`.
- Écran 2 : Cartes `.pole-card` avec bordures colorées et compteurs incrémentaux `.stepper-counter`.
- Écran 3 : Lignes de questions `.question-row` et boutons radio de notation `.scale-options` (1 à 5).

### `screens-4-7.css` (163 lignes)
Styles pour la phase de restitution et conclusion :
- Écran 4 : Disposition grille du radar `.chart-layout` et barres de progression `.score-bar-item`.
- Écran 5 : Carte de code `.profile-code-card` et cartes métiers avec boutons d'avis `.btn-opinion`.
- Écran 6 : Formulaire d'avis parents `.parent-form-grid` et puces sélectionnables `.radio-pill-group`.
- Écran 7 : Fiche récapitulative `.export-summary-card` et gros bouton de téléchargement `.btn-download`.

### `style.css` (9 lignes)
Point d'assemblage unique importé dans `index.html` :
```css
@import './css/variables.css';
@import './css/layout.css';
@import './css/screens-1-3.css';
@import './css/screens-4-7.css';
```
