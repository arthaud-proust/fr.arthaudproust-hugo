---
visibleInCms: true
draft: false
title: Life
date: 2023-09-04
image: /images/projects/life.jpg
description: Le jeu de la vie gamifié
technos:
  - vuejs
project_url: https://life.arthaud.dev
github_url: https://github.com/arthaud-proust/dev.arthaud.life
content:
  - paraph1: Originellement une preuve de compétences, j'ai décidé de le convertir
      en un jeu basé sur le "Jeu de la vie" de John Horton Conway.
    title: C'est quoi ?
  - title: La genèse
    paraph1: J'ai eu envie de mettre en pratique plusieurs éléments du livre "Clean
      architecture" de Robert C. Martin, et un ami développait le Jeu de la vie.
      C'est un algorithme simple et rapide à développer, sur lequel j'ai pu
      travailler quelques principes SOLID et les tests unitaires.
  - paraph1: J'ai commencé par un boilerplate avec TS et Jest. J'ai écrit mes tests
      unitaires puis j'ai écrit le code de logique au coeur du jeu (logique
      d'une cellule, de la matrice, d'un tour, ...).
    paraph2: "Au départ, pas besoin de front : mes tests unitaires me montraient que
      tout fonctionnait. Puis j'ai affiché les grilles dans la console. Ensuite,
      j'ai eu envie de profiter du découplage logique/front pour venir changer
      cette visualisation console par un front en vuejs qui serait plus
      interactif. Cela s'est opéré sans problème, et j'ai rapidement eu un front
      sobre et fonctionnel."
    title: Coder proprement, c'est chouette
  - title: Mais ça doit server
    paraph1: J'ai partagé le petit site à des amis. Malheureusement j'étais la tête
      dans le guidon et le projet n'avais pas beaucoup de but pour les
      utilisateur (en fait il n'avait pas d'utilisateur type). J'ai ajouté un
      tutoriel et puis je me suis demandé ce que je voulais faire. Continuer la
      preuve de compétence purement technique ? Aller vers un jeu avec une
      réelle utilisation ?
    paraph2: "Alors je suis parti sur un jeu. Car un projet sans utilisateurs c'est
      un projet qui ne rapporte pas d'argent, qui n'a pas de retours, qui ne
      s'améliore pas ? En partie. Je dois me confronter à des problématiques
      réelles, des évolutions qui n'émanent pas de moi. J'ai donc cherché à
      gamifier le jeu : j'ai ajouté une logique pour calculer un score, créé des
      tips pour informer le joueur au fur et à mesure (plutôt que le bombarder
      d'infos dès le début), etc. Certaines fonctionnalités sont passées,
      d'autres sont plus complexes (comme le \"pokédex\" de patterns de
      cellules)."
---
