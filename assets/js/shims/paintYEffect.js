import anime from 'animejs';

function setPaintYComponents() {
    const PERCENTAGE = 120;
    const paintYComponentsToSet = document.querySelectorAll('[paint-y]');
    paintYComponentsToSet.forEach(component => {
        component.style = `transform: translateY(${PERCENTAGE}%); overflow: hidden;`
        component.innerHTML = `<div class="paint-y-inner" style="transform: translateY(-${PERCENTAGE}%)">${component.innerHTML}</div>`
    })
}

function animePaintYComponents(root) {
    const DURATION = 900;
    const DELAY = DURATION*0.4;
    const EASING = 'easeOutCubic'
    anime({
        targets: root.querySelectorAll('[paint-y]'),
        translateY: '0%',
        rotateZ: 0,
        easing: EASING,
        delay: function(el, i, l) {
            return i * DELAY;
        },
        duration: DURATION
    })
    anime({
        targets: root.querySelectorAll('[paint-y] > div.paint-y-inner'),
        translateY: '0%',
        rotateZ: 0,
        easing: EASING,
        delay: function(el, i, l) {
            return i * DELAY;
        },
        duration: DURATION
    })
}
module.exports= {
    setPaintYComponents,
    animePaintYComponents
}