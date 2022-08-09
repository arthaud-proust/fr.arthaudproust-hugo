import { animePaintYComponents} from './paintYEffect';
import { isLandscapeView } from './utils';

function setScrollEffects() {
    setTimeout(setAllSectionScrollEffects, 1000);
}

function setAllSectionScrollEffects() {
    const sections = document.querySelectorAll('main > section, main > div > section');

    function handleSectionIntersect(entries, observer) {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
                animePaintYComponents(entry.target)
            }
        })
    }
    const aboutSectionObserver = new IntersectionObserver(handleSectionIntersect, {
        threshold: isLandscapeView() ? 0.55 : 0.3
    });
    sections.forEach(section=>aboutSectionObserver.observe(section))
}

module.exports = { setScrollEffects };