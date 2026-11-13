# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Doomsday Décompte : PWA statique (HTML/CSS/JS vanilla, aucune dépendance, aucun build) — calendrier de 15 cases qui se débloquent une par jour + compte à rebours avant la sortie d'*Avengers: Doomsday*. Code, commentaires et UI en français.

## Commandes

- Pas de build, pas de lint, pas de tests.
- Lancer en local (le service worker exige http, pas `file://`) : `python3 -m http.server 8000` à la racine.
- Déploiement : automatique sur GitHub Pages à chaque push sur `main` (`.github/workflows/pages.yml`).

## Architecture

- `videos.js` est le **seul fichier de contenu** : `CONFIG.DEBUT` (date de la case 1), `CONFIG.DOOMSDAY` (fin du compte à rebours) et le tableau `VIDEOS` ({ titre, lien }). Il est chargé en `<script>` classique avant `app.js`, qui utilise `CONFIG`/`VIDEOS` comme globales (pas de modules ES).
- `app.js` : la case `i` s'ouvre à minuit local le jour `DEBUT + i`. Toujours passer par `minuitLocal()` pour parser une date `AAAA-MM-JJ` (`new Date("AAAA-MM-JJ")` serait interprété en UTC et décalerait l'ouverture). Un `setInterval` d'1 s met à jour le compteur ; la grille n'est reconstruite que si le nombre de cases ouvertes change (`dernierEtat`). Un lien vide affiche « Lien bientôt disponible ».
- `sw.js` : stratégie réseau d'abord, cache en secours hors ligne (les nouveaux liens arrivent donc sans changer de version). Si on ajoute/renomme un fichier servi, mettre à jour `FICHIERS` et incrémenter `CACHE` (`doomsday-vN`).
- Pour tester le déblocage des cases, modifier temporairement `CONFIG.DEBUT` (ne pas le committer).

## Points d'attention

- Le workflow Pages publie **toute la racine du dépôt** (`path: .`) : tout fichier committé devient public. Ne pas committer de fichiers parasites (ex. dossiers `@eaDir` de Synology, comme dans `img doom/`).
- Chemins relatifs uniquement (`./`, `icons/...`) : le site est servi sous un sous-chemin GitHub Pages (`start_url`/`scope` du manifest à `./`).
- `.nojekyll` doit rester présent.
