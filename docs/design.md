# Design du tableau de pilotage

Validé dans l'esprit par Robin le 22/11/2026, d'après ses exemples. À lire avant de toucher l'interface.

- Clair par défaut ; sombre « crépuscule » au choix (scène profonde, cadre en verre fumé, panneaux en verre clair).
- Scène derrière le verre : dégradé + 3 orbes qui dérivent + grain (`.scene`).
- Barre latérale de verre avec icônes (lucide-react), barre du haut en pilule avec boutons ronds, un grand panneau de verre
  qui porte la page, cartes avec pastille d'icône + badge + emplacement de courbe, barre d'onglets flottante en bas sur mobile.
- Classes (`app/globals.css`) : `.vitre`, `.vitre-coque`, `.vitre-panneau`, `.vitre-puits`, `.puce`, `.pastille`, `.bouton-rond`, `.carte-levee`.
- Connexion animée façon « Glassy OTP » : mot de passe puis 6 cases de verre (`components/ConnexionAnimee.tsx`).
- Jamais de fausse courbe ni de faux chiffre : pointillés et « Pas branché » tant que la source manque. Pas de mode démo (supprimé à la demande de Robin le 22/11).

| Onglet | Couleurs |
|---|---|
| Groupe | Neutres chauds (crème, sable) |
| Luma | Verre du studio Luma (lavande, violet) |
| Harmonie Yacht | « Verre glacier » d'Harmonie Yacht |
| Perso | Neutres |
