import { animePaintYComponents} from './paintYEffect';

function setScrollEffects() {
    setTimeout(setAllSectionScrollEffects, 1000);
}

function setAllSectionScrollEffects() {
    const sections = document.querySelectorAll('main > section, main > div > section');

    function handleSectionIntersect(entries, observer) {
        entries.forEach(entry=>{
            console.log(entry.target)
            if(entry.isIntersecting) {
                animePaintYComponents(entry.target)
            }
        })
    }
    const aboutSectionObserver = new IntersectionObserver(handleSectionIntersect, {
        threshold: 0.55
    });
    sections.forEach(section=>aboutSectionObserver.observe(section))
}

module.exports = { setScrollEffects };