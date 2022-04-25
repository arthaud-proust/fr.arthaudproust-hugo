import * as Turbo from "@hotwired/turbo"
import * as bootstrap from "./bootstrap.js";
import * as utils from './shims/utils';
import { SuperCursor } from './shims/supercursor';
import { setEffects } from './shims/effets';

addEventListener('turbo:load', function() {

    
    const SESSION_KEY_ANIM = 'arthaudproust-animation';

    window.superCursor = new SuperCursor({ root: document.body });

    superCursor.addLayer({
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
    });
    superCursor.addLayer({
        name: "outter",
        speed: 0.15,
        updateEl: {
            HOVER_TEXT: function() {
                if(this.cursor.elementHovered && this.cursor.elementHovered.dataset.hoverText) {
                    this.element.style.setProperty('--hoverText', `"${this.cursor.elementHovered.dataset.hoverText}"`);
                }
                this.element.style.left = this.position.x + "px";
                this.element.style.top = this.position.y + "px";
            }
        }
    })
    superCursor.init();
    if(!utils.mobileAndTabletCheck()) {
        superCursor.enable();
    } else {
        superCursor.disable();
    }

    setEffects();

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

            breakpoints: {
                576: { // >= sm
                    slidesPerView: 2,
                    spaceBetween: 16*1.5
                },
                992: { // >= lg
                    slidesPerView: 2,
                    spaceBetween: 16*1.5
                },

                1200: { // >= xl
                    slidesPerView: 2,
                    spaceBetween: 16*1.5
                },
            },
            mousewheel: {
                enabled: true
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
            },
            // autoHeight: true,
            // resistance: false,
            resistanceRatio: 0.9,
            spaceBetween: 16*1.5
            // mousewheel: {
            //     enabled: true
            // }
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
        
        const observer = new IntersectionObserver(handleSectionIntersect, options);

        for(let section of projectSections) {
            observer.observe(section)
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
    }
});