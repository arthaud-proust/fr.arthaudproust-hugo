import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import PhotoSwipeLightbox from 'photoswipe/lightbox';

const grids = document.querySelectorAll('.grid-masonry');
grids.forEach(grid=>{
    let msnry = new Masonry( grid, {
        // itemSelector: '.grid-item',
        // columnWidth: '.grid-sizer',
        percentPosition: true
    });
    imagesLoaded( grid ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
    });
})

const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery-images',
    children: '.gallery-image',
    pswpModule: () => import('photoswipe')
});
lightbox.init();


lightbox.on('pointerDown', (e) => {
    superCursor.setState(superCursor.states.ACTIVE);
});
lightbox.on('pointerMove', (e) => {
    superCursor.updateMouseFromEvent(e.originalEvent);
});
lightbox.on('pointerUp', (e) => {
    superCursor.setState(superCursor.states.NORMAL);
});