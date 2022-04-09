---
layout: realisation
title: Escalade Montesquieu
folder: escalade-montesquieu/
desc: Site de la section escalade du lycée Montesquieu à Bordeaux.
img: preview
imgs: 
    - home
    - login
    - salle3d
    - salle3d-2
link: https://escalade-montesquieu.fr
github: https://github.com/arthaud-proust/fr.escalade-montesquieu
published: true
sitemap: 
    priority: 0.5
    changefreq: weekly
---

{% capture content %}
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <span>Juin 2020</span>
        <h2>Aux origines</h2>
        <p>
            Guilhem Granier, professeur d'EPS au lycée Montesquieu, me propose de réaliser le site de la section escalade. 
            À ce moment, j'ai rejoint cette section sportive depuis déjà deux ans.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <p>
            Je grimpe donc régulièrement dans la salle d'escalade, et je me forme en parallèle au développement de site.<br />
            Cette proposition tombe donc à merveille, en lien avec mon projet d'études.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <h2>Le besoin initial</h2>
        <p>
            L'idée est d'avoir un site fonctionnel pour que la section escalade puisse organiser des sorties, des sessions au lycée et afficher les informations importantes.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <h2>Les débuts</h2>
        <p>
            Nous commençons par établir un cahier des charges suivant ce premier besoin. <br/>
            Une fois cela fait, j'élabore un premier design à partir des spécifications de M.Granier.<br/>
            Cette maquette voyage beaucoup entre nous deux, et évolue jusqu'à sa version finale.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="home">
    <div class="intro-card">
        <span>Août 2020</span>
        <h2>Intégration du site</h2>
        <p>
            Planche de design dans une main, cahier des charges dans l'autre, je me tourne vers Laravel pour réaliser le site.<br/>
            Je commence à prendre en main ce framework, c'est l'occasion de continuer mon apprentissage!
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="login">
    <div class="intro-card">
        <span>Septembre 2020</span>
        <h2>Livraison de la première version</h2>
        <p>
            Développement de la première version terminé. Nous présentons le site aux élèves de la section, les premières sessions s'organisent, la galerie photo se remplit au fil des mois. Bref, le site prend vie.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="salle3d-2">
    <div class="intro-card">
        <span>Depuis Octobre 2020</span>
        <h2>Évolution du site</h2>
        <p>
            Le site a subi plusieurs modifications et ajouts depuis. J'ai par exemple commencé à ajouter la modélisation 3D de la salle.
            L'objectif étant de créer une plus grande connexion autour de la salle d'escalade du lycée.
        </p>
    </div>
</li>
{% endcapture %}

{% 
    include sections/realisation.html
    page=page
    content=content
%}
