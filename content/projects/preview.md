---
layout: realisation
title: Preview
folder: preview/
desc: Visualisez, comparez, organisez, partagez vos photos depuis n'importe quel appareil.
img: preview
imgs: 
    - old-in-room
    - home
    - in-room
link: https://preview.arthaud.dev
published: true
sitemap: 
    priority: 0.5
    changefreq: weekly
---

{% capture content %}
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <span>Mars 2021</span>
        <h2>Aux origines</h2>
        <p>
            Lorsque je retouche des photos sur ligthroom depuis mon pc, j'ai envie de comparer l'affichage sur pc avec celui du téléphone avant de poster sur instagram.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="preview">
    <div class="intro-card">
        <!-- <span>Mars 2021</span> -->
        <h2>La (non)solution initiale</h2>
        <p>
            Pour afficher les images sur différents appareils, j'utilise un cable, je copie-colle la photo et l'ouvre.
        </p>
        <p class="pt">
            C'est long.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="old-in-room">
    <div class="intro-card">
        <!-- <span>Mars 2021</span> -->
        <h2>Une meilleure idée</h2>
        <p>
            Il me faut un service rapide, multi-plateforme, qui me permette de visualier un feed instagram ou un carousel.<br>
        </p>
        <p class="pt">
            Je crée alors la première version de InstaPreview.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="home">
    <div class="intro-card">
        <span>Octobre 2021</span>
        <h2>Reprendre l'existant</h2>
        <p>
            La première version, au design inspiré d'instagram commence à se faire vieille, et il y a beaucoup de bugs. Je décide de repartir de zéro, et de faire une version 2.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="in-room">
    <div class="intro-card">
        <!-- <span>Octobre 2021</span> -->
        <h2>Conception intuitive</h2>
        <p>
            J'effectue alors un travail d'ergonomie, et de design ux/ui. Les fonctionnalités sont retravaillées, le code refactorisé.<br>
            J'en profite également pour refaire le système d'échange de données en temps réel.
        </p>
    </div>
</li>
<li class="swiper-slide" data-cover="in-room">
    <div class="intro-card">
        <span>Novembre 2021</span>
        <h2>Site en bêta</h2>
        <p>
            Le service est disponible mais il est possible que des bugs ou des ralentissements soient présents. Vous pouvez me faire part de ceux que vous rencontrez à l'adresse <b>bug@arthaud.dev</b>
        </p>
    </div>
</li>
{% endcapture %}

{% 
    include sections/realisation.html
    page=page
    content=content
%}
