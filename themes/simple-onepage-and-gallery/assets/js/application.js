import "./bootstrap.js";
import * as utils from 'utils';
import {SuperCursor} from 'supercursor';

window.addEventListener('DOMContentLoaded', function() {
    // const SESSION_KEY_ANIM = 'arthaudproust-animation';

    // window.superCursor = new SuperCursor();
	// if(!utils.mobileAndTabletCheck()) {
	// 	superCursor.prepare();

    //     if(!utils.botCheck() && !sessionStorage.getItem(SESSION_KEY_ANIM)) {
    //         sessionStorage.setItem(SESSION_KEY_ANIM, true);
    //         document.body.classList.add('contentHidden');
    //         setTimeout(function(){
    //             superCursor.enable();
    //         }, 3500);
    //     } else {
    //         superCursor.enable();
    //     }
    // }

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
            // mousewheel: {
            //     enabled: true
            // }
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
        console.log(rootMargin);
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