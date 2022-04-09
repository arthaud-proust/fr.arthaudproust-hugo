---
layout: realisation
title: Site du CAPC Bordeaux
folder: capc/
desc: "Projet BUT MMI Bordeaux: refonte ergonomique et graphique d'un site."
img: preview
link: https://capc.netlify.app
github: https://github.com/studio-beauvoir/jekyll-capc
published: false
sitemap: 
    priority: 0.5
    changefreq: weekly
---

{% capture content %}
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/preview.jpg">
    <div class="intro-card">
        <span>Novembre 2021</span>
        <h2>Une refonte du site du Musée CAPC de Bordeaux?</h2>
        <p>
            C'est le projet sur lequel nous avons travaillé avec Quentin Wegera, Jason Nago, Leïly Coquard et Maxime Lust.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/preview.jpg">
    <div class="intro-card">
        <h2>La création du projet</h2>
        <p>
            Je tâte le terrain autour de moi, j'obtiens des avis favorables: bon nombre de personnes aimeraient participer à des concours photo.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/preview.jpg">
    <div class="intro-card">
        <h2>Les débuts</h2>
        <p>
            Je communique alors mon ambition et recrute ceux qui constituerons l'équipe Bordeaux Photo: Rédactrices, graphiste, photographes, membres du jury.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/site.jpg">
    <div class="intro-card">
        <span>Avril 2021</span>
        <h2>Création du site</h2>
        <p>
            Le site doit permettre aux gens de participer simplement. Après création du compte on peut envoyer sa photo pour l'évènement en cours.
            Le vote du jury s'y fait également, le calcul et l'affichage des résultats est automatisé.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/premier-concours.jpg">
    <div class="intro-card">
        <span>Avril 2021</span>
        <h2>Premier concours</h2>
        <p>
            On y est ! Premier thème choisi par le jury : Le temps passe.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/site.jpg">
    <div class="intro-card">
        <span>Avril à novembre 2021</span>
        <h2>Évolution du projet</h2>
        <p>
            L'équipe évolue, plusieurs autres concours s'organisent. Nous prévoyons l'ouverture à d'autres types d'évènements : rallyes à thèmes, concours sur google maps, etc.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="/assets/realisations/bordeaux-photo.fr/pause.jpg">
    <div class="intro-card">
        <span>Depuis novembre 2021</span>
        <h2>Nous sommes en pause</h2>
        <p>
            Chacun fait ses études, le temps manque... Le projet reste en suspens mais nous gardons en tête toutes les bonnes idées que nous avons.
        </p>
        <p class="pt">
            Le projet reprendra son cours on vous le promet :)
        </p>
    </div>
</li>
{% endcapture %}

{% 
    include sections/realisation.html
    page=page
    content=content
%}
