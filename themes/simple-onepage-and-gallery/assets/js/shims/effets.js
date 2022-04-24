import anime from 'animejs';
function setEffects() {
    const horizontalCordStates = {
        start: "M 0 50 Q 500 0 1000 50",
        middle: "M 0 50 Q 500 50 1000 50",
        end: "M 0 50 Q 500 100 1000 50",
    }

    const verticalCordStates = {
        start: "M 50 0 Q 00 500 50 1000",
        middle: "M 50 0 Q 50 500 50 1000",
        end: "M 50 0 Q 100 500 50 1000",
    }
   
      
    const horizontalCords = document.querySelectorAll('.component-horizontal-cord');
    for(const horizontalCord of horizontalCords) {
        horizontalCord.addEventListener('mouseover', function() {
            const pathToAnimate = horizontalCord.querySelector('.component-horizontal-cord-path')
            anime({
                targets: pathToAnimate,
                d: [horizontalCordStates.start, horizontalCordStates.middle],
                duration: 2000,
                easing: 'easeOutElastic(2, .1)'
            })
        })
    }

    const verticalCords = document.querySelectorAll('.component-vertical-cord');
    for(const verticalCord of verticalCords) {
        verticalCord.addEventListener('mouseover', function() {
            const pathToAnimate = verticalCord.querySelector('.component-vertical-cord-path')
            anime({
                targets: pathToAnimate,
                d: [verticalCordStates.start, verticalCordStates.middle],
                duration: 2000,
                easing: 'easeOutElastic(2, .1)'
            })
        })
    }

    // anime({
    //     targets: '.component-line-d',
    //     d: [
    //         {value: shapes[1].d}
    //     ],
    //     duration: 500,
    //     direction: 'alternate',
    //     autoplay: true,
    //     easing: 'easeInOutQuad',
    //     elasticity: 100,
    //     loop: true
    // });

}
module.exports = { setEffects };