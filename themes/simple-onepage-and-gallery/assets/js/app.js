import * as utils from 'utils';
import {SuperCursor} from 'supercursor';

window.addEventListener('DOMContentLoaded', function() {
    const SESSION_KEY_ANIM = 'arthaudproust-animation';
    window.superCursor = new SuperCursor();
	if(!utils.mobileAndTabletCheck()) {
		superCursor.prepare();

        if(!utils.botCheck() && !sessionStorage.getItem(SESSION_KEY_ANIM)) {
            sessionStorage.setItem(SESSION_KEY_ANIM, true);
            document.body.classList.add('contentHidden');
            setTimeout(function(){
                superCursor.enable();
            }, 3500);
        } else {
            superCursor.enable();
        }
    }


    const MAIN_SPEED = 1500;
    const MAIN_LINK_SPEED = 800;
    const SECTION_SPEED = 1000;

    const mainSlideStepper = document.getElementById('mainSlideStepper');
    const mainSlideName = document.getElementById('mainSlideName');
    const links = document.getElementById('links').querySelectorAll('a');
    const sections = Array.from(document.querySelectorAll('#main > div > section'));
    const sectionEl = document.querySelector('.section-swiper');
    var sectionSwiper;
    const pageArrows = {
        left: document.querySelector('.pageArrow.left'),
        right: document.querySelector('.pageArrow.right')
    };


    const mainSwiper = new Swiper('.main-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        speed: utils.mobileAndTabletCheck()?150:1500,
        mousewheel: {
            forceToAxis: false,
            eventsTarget: '.main-swiper'
        },
        parallax: true,
        // freeMode: {
        //     enabled: false,
        //     sticky: true,
        //     momentum: true,
        //     momentumRatio: 0.7,
        //     momentumVelocityRatio: 0.8,
        //     minimumVelocity: 0.5
        // },
        // sticky: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // hashNavigation: true,
        // centeredSlidesBounds: true,
        grabCursor: true,
        // resistance: false,
        shortSwipes: true,
        resistanceRatio: 1.2,
        longSwipesRatio: 0.1,
        threshold: 10,
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    try {
        sectionSwiper = new Swiper(sectionEl, {
            // Optional parameters
            direction: 'vertical',
            grabCursor: true,
            loop: false,
            freeMode: true,
            // autoHeight: true,
            // resistance: false,
            mousewheel: {
                forceToAxis: true,
                eventsTarget: sectionEl.closest('.swiper-slide')
            },
            resistanceRatio: 0.9,
        });
        sectionSwiper.on("reachBeginning", function(e) {
            if(mainSwiper.slides.length>0 && !mainSwiper.isBeginning) mainSwiper.slidePrev();
        });
        sectionSwiper.on("reachEnd", function(e) {
            if(mainSwiper.slides.length>0 && !mainSwiper.isEnd) mainSwiper.slideNext();
        });
        
        sectionSwiper.on("slideChange", function(e) {
            // if(Object.keys(sectionSwiper.slides[sectionSwiper.activeIndex].dataset).includes('skipNext')) {
            //     sectionSwiper.slideNext();
            // }
            if(Object.keys(sectionSwiper.slides[sectionSwiper.activeIndex].dataset).includes('skipPrev')) {
                sectionSwiper.slidePrev();
            }
            // e.activeIndex
            // try {
            //     const section = e.el.closest('section');
            //     const imageCover = document.getElementById('section-image-cover');
            //     if(!imageCover) return;
            //     const card = e.el.querySelectorAll('.swiper-slide')[e.activeIndex+1];
            //     const img = card.dataset.cover;
            //     if(!img) return;
            //     imageCover.src = img;
            // } catch(e) {}
            try {
                const imageCoverContainer = document.getElementById('section-image-cover-container');

                const imgs = Array.from(imageCoverContainer.children);
                imgs.forEach(img=>img.classList.add('d-none'));

                const newI = window.screen.width>576?e.activeIndex+1:e.activeIndex;

                const card = e.el.querySelectorAll('.swiper-slide')[newI];
                if(!card) throw new Error();
                const imgName = card.dataset.cover;
                if(!imgName) throw new Error();
                const img = imageCoverContainer.querySelector(`#sic-${imgName}`);
                img.classList.remove('d-none');
            } catch(e) {
                try {
                    document.getElementById('section-image-cover-container').querySelector(`#sic-preview`).classList.remove('d-none');
                }catch(e){}
            }
        })
    } catch(e){}


    
    

    const updateMainScroll = function (e) {
        refreshPageArrows();

        // return 
        if(mainSwiper.slides.length > 0) {

            // update le lien actuel
            Array.from(links).forEach(link=>{
                link.classList.toggle('active', link.dataset.to===mainSwiper.slides[mainSwiper.activeIndex].dataset.hash);
            })
            // mainSlideName.innerText = `${mainSwiper.slides[mainSwiper.activeIndex].getAttribute('aria-title')}`;
            // mainSlideStepper.innerText = `${mainSwiper.slides[mainSwiper.activeIndex].getAttribute('aria-label')} -`;
            refreshAnimations(mainSwiper.slides[mainSwiper.activeIndex]);
            if(
                mainSwiper.slides[mainSwiper.activeIndex].contains(sectionSwiper.el)
            ){
                if(sectionSwiper.isBeginning) {
                    // try{sectionSwiper.slideNext();}catch(e){}
                } 
                if(sectionSwiper.isEnd) {
                    try{sectionSwiper.slidePrev();}catch(e){}
                } 
                mainSwiper.mousewheel.disable();
            }else {
                mainSwiper.mousewheel.enable();
            }
        } else {
            Array.from(links).forEach(link=>{
                link.classList.remove('active');
            })
            // mainSlideName.innerText = `${document.querySelector('.swiper-slide[aria-title]').getAttribute('aria-title')}`;
            // mainSlideStepper.innerText = ``;
        }
    };

    updateMainScroll();

    mainSwiper.on("slideChange", updateMainScroll);
    
    refreshPageArrows();

    function slideToHash(to, instant=true) {
        if(to==="") return; 

        mainSwiper.slideTo(sections.indexOf(document.querySelector(`section[data-hash="${to}"]`)), instant?0:MAIN_LINK_SPEED);
    }

    slideToHash(window.location.hash.replace('#',''));

    mainSwiper.on('sliderMove', function (swiper, event) {
        mainSwiper.el.classList.add('grabbing');
        superCursor.updateMouseFromEvent(event);
        superCursor.setActive(true);
    });

    mainSwiper.on('touchEnd', function () {
        mainSwiper.el.classList.remove('grabbing');
        superCursor.setActive(false);
        // superCursor.setHidden(false);
    });

    pageArrows.left.addEventListener('click', function() {
        mainSwiper.slidePrev(MAIN_SPEED);
    });
    pageArrows.right.addEventListener('click', function() {
        mainSwiper.slideNext(MAIN_SPEED);
    });

    document.querySelectorAll('[on-click-section-prev]').forEach(el=>{
        el.addEventListener('click', function() {
            sectionSwiper.slidePrev(SECTION_SPEED);
        });
    })
    document.querySelectorAll('[on-click-section-next]').forEach(el=>{
        console.log(el);
        el.addEventListener('click', function() {
            sectionSwiper.slideNext(SECTION_SPEED);
        });
    })
    document.querySelectorAll("[on-click-section-n]").forEach(el=>{
        el.addEventListener('click', function() {
            sectionSwiper.slideTo(el.dataset.onClickSectionN, SECTION_SPEED);
        });
    })
    

    document.querySelectorAll('[on-click-main-prev]').forEach(el=>{
        el.addEventListener('click', function() {
            mainSwiper.slidePrev(MAIN_SPEED);
        });
    })
    document.querySelectorAll('[on-click-main-next]').forEach(el=>{
        el.addEventListener('click', function() {
            mainSwiper.slideNext(MAIN_SPEED);
        });
    })
    



    function refreshAnimations(el) {
        setTimeout(()=>{
            el.querySelectorAll('.toAnimate').forEach(function(element) {
                element.classList.add('animate');
            })
        }, utils.mobileAndTabletCheck()?50:500);
    }

    function refreshPageArrows() {
        pageArrows.left.classList.toggle('hidden', mainSwiper.isBeginning);
        pageArrows.right.classList.toggle('hidden', mainSwiper.isEnd || (mainSwiper.isBeginning && mainSwiper.slides.length===0));
    }


    

    links.forEach(link=>link.addEventListener('click', function() {
        utils.setMenu(false)
        slideToHash(link.dataset.to, false)
        sectionSwiper.slideTo(0);
    }));


    document.body.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        superCursor.setAlt(!superCursor.isAlt);
        return
    })

    document.getElementById('menu-toggle').addEventListener('click', utils.toggleMenu)

    document.querySelectorAll('.list-subitem, .lessMore').forEach(el=>{
        el.addEventListener('click', function(e) {
            if(e.target.tagName=="A" || e.target.parentElement.tagName=="A") {
                return;
            }
            const keepClosed = el.dataset.open==="true";
            document.querySelectorAll('.list-subitem, .lessMore').forEach(el=>{
                el.dataset.open = false;
            })

            el.dataset.open = keepClosed?"false":"true";

        })
    })


    document.querySelectorAll('.toCopy').forEach(element => {
        element.addEventListener('click', function() {
            element.dataset.text = this.innerText;
            element.innerText = `${element.dataset.text} (copié!)`;
            utils.copyTextToClipboard(element.dataset.text);
            setTimeout(function() {
                element.innerText = element.dataset.text;
            }, 4000);
        })
    });
});