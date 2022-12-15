import * as Turbo from "@hotwired/turbo"
import * as bootstrap from "./bootstrap.js";
import * as utils from './shims/utils';
import { SuperCursor } from './shims/supercursor';
import { setEffects } from './shims/effects';
import { setScrollEffects } from './shims/scrollEffects';
import { setPaintYComponents, animePaintYComponents } from './shims/paintYEffect';

var funcAfterAnimations = [];

addEventListener('turbo:before-render', function(event) {
    event.preventDefault();
    superCursor.setState(superCursor.states.COVER_PAGE)
    // document.getElementById('pageTransition').classList.remove('in')
    // document.getElementById('pageTransition').classList.add('out')
    setTimeout(()=>{
        superCursor.setState(superCursor.states.NORMAL)
        event.detail.resume()
    }, 700)
});


addEventListener('DOMContentLoaded', function() {
    window.superCursor = new SuperCursor({ 
        root: document.getElementById('keep'),
        layers: [
            {
                name: "pointer",
                speed: 0.9,
                coef: 0.8,
                updateEl: {
                    HOVER: function() {
                        if(this.cursor.elementHovered) {
                            let hvrElCoords = this.cursor.elementHovered.getBoundingClientRect();
                
                            
                            this.updateDisplacementFromMouse({
                                x: hvrElCoords.left + hvrElCoords.width/2,
                                y: hvrElCoords.top + hvrElCoords.height/2,
                            });
        
                            // this.el.style.setProperty("--w", hvrElCoords.width*1.3+"px");
                            // this.el.style.setProperty("--h", hvrElCoords.height*2+"px");
        
                            this.element.style.setProperty("--w", hvrElCoords.width*1.2+"px");	
                            this.element.style.setProperty("--h", hvrElCoords.height*1.5+"px");
                        }
                        this.element.style.left = this.position.x + "px";
                        this.element.style.top = this.position.y + "px";
                    }
                }
            },
            {
                name: "outter",
                speed: 0.13,
                updateEl: {
                    HOVER_TEXT: function() {
                        if(this.cursor.elementHovered) {
                            if(this.cursor.elementHovered.dataset && this.cursor.elementHovered.dataset.hoverText) {
                                this.element.style.setProperty('--hoverText', `"${this.cursor.elementHovered.dataset.hoverText}"`);
                            } else if(this.cursor.elementHovered.alt) {
                                this.element.style.setProperty('--hoverText', `"${this.cursor.elementHovered.alt}"`);
                            }
                        }
                        this.element.style.left = this.position.x + "px";
                        this.element.style.top = this.position.y + "px";
                    }
                }
            }
        ]
    });

    superCursor.init();
    superCursor.enable();
})


addEventListener('turbo:load', function() {
    superCursor.enable();
    if(!utils.mobileAndTabletCheck()) {
        superCursor.enableMouseMode()
    }
    
    const gridGutter = 16*3;
    
    
    const SESSION_KEY_ANIM = 'arthaudproust-animation';

    setPaintYComponents();
    setTimeout(()=>document.querySelectorAll('[anime-paint-y]').forEach(root=>animePaintYComponents(root)), 800);
    setEffects();
    setScrollEffects();

    const linksToCopy = document.querySelectorAll('.toCopy');
    for(let link of linksToCopy) {
        link.addEventListener('click', function() {
            if(!link.dataset.baseText) link.dataset.baseText = link.innerText;
            utils.copyTextToClipboard(link.innerText)
                .then(()=>{
                    link.innerText = `${link.dataset.baseText} (copié)`;
                })
                .catch(()=>{
                    link.innerText = `${link.dataset.baseText} (pas copié)`;
                })
                .finally(()=>{
                    setTimeout(function() {
                        link.innerText = link.dataset.baseText;
                    }, 4000);
                })
        })
    }

    const projectsGroup = document.getElementById('projects-group');
    if(projectsGroup) {

        projectsSwiper = new Swiper(projectsGroup, {
            // Optional parameters
            direction: 'horizontal',
            grabCursor: true,
            loop: false,
            // autoHeight: true,
            // resistance: false,
            resistanceRatio: 0.9,
            pagination: {
                el: '.swiper-pagination',
            },

            breakpoints: {
                576: { // >= sm
                    slidesPerView: 2,
                    spaceBetween: gridGutter
                },
                992: { // >= lg
                    slidesPerView: 2,
                    spaceBetween: gridGutter
                },

                1200: { // >= xl
                    slidesPerView: 2,
                    spaceBetween: gridGutter
                },
            },
            mousewheel: {
                enabled: true,
                releaseOnEdges: true,
                forceToAxis: true
            }
        });
        projectsSwiper.on('touchStart', function (swiper, event) {
            superCursor.setState(superCursor.states.ACTIVE);
        });
        projectsSwiper.on('sliderMove', function (swiper, event) {
            superCursor.updateMouseFromEvent(event);
        });
        
        projectsSwiper.on('touchEnd', function (swiper, event) {
            superCursor.setState(superCursor.states.NORMAL);
        });
    }

    const testimoniesGroup = document.getElementById('testimonies-group');
    if(testimoniesGroup) {

        testimoniesSwiper = new Swiper(testimoniesGroup, {
            grabCursor: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            // autoHeight: true,
            // resistance: false,
            resistanceRatio: 0.9,
            spaceBetween: 16*1.5,
            mousewheel: {
                enabled: true,
                releaseOnEdges: true,
                forceToAxis: true
            }
        });

        testimoniesSwiper.on('touchStart', function (swiper, event) {
            superCursor.setState(superCursor.states.ACTIVE);
        });
        testimoniesSwiper.on('sliderMove', function (swiper, event) {
            superCursor.updateMouseFromEvent(event);
        });
        
        testimoniesSwiper.on('touchEnd', function (swiper, event) {
            superCursor.setState(superCursor.states.NORMAL);
        });
    }

    const testimoniesCollapsibles = document.querySelectorAll('.testimonyCollapsible')
    testimoniesCollapsibles.forEach(collapse=>{
        collapse.addEventListener('hide.bs.collapse', function (event) {
            const button = event.target.nextElementSibling
            button.innerText = "Lire plus"
        })

        collapse.addEventListener('show.bs.collapse', function (event) {
            const button = event.target.nextElementSibling
            button.innerText = "Lire moins"
        })
    });



    const projectSectionsRoot = document.getElementById('project-sections-root');
    if(projectSectionsRoot) {
        const projectSections = document.querySelectorAll('.project-section')
        const projectImages = document.querySelectorAll('.project-image')
        const y = Math.round(window.innerHeight * 0.7)
        const rootMargin = `-${window.innerHeight - y - 1}px 0px -${y}px 0px`;
        const options = {
            rootMargin,
        }
        
        function showProjectImageOfSection(section) {
            for(let image of projectImages) {
                if(image.id !== section.dataset.image) {
                    image.classList.add('d-none');
                } else {
                    image.classList.remove('d-none');
                }
            }
        }

        function handleSectionIntersect(entries, observer) {
            for(let entry of entries) {
                if (entry.isIntersecting) {
                    showProjectImageOfSection(entry.target)
                }
            }
        }

        const observer = new IntersectionObserver(handleSectionIntersect, options);

        for(let section of projectSections) {
            observer.observe(section)
        }


    }
});