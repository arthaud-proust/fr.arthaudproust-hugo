import { CursorLayer } from './cursorLayer';
import { Enum } from './enum';
class SuperCursor {
	constructor({root}) {

        this.root = root;

        this.element = document.createElement('div');
        this.element.id = 'superCursor';
        this.element.classList.add('state-HIDDEN');
        this.root.appendChild(this.element);

        this.states = Enum(
            'NORMAL',
            'HOVER',
            'ACTIVE',
            'HIDDEN',
        );
        this.state = this.states.HIDDEN;


        this.stateOn = {
			hover: [
				'a', 
                '.supercursor-hover'
				// '.hoverable',
				// '.underline', 
				// '.list-subitem span'
			],
			// hoverAlt: [
			// 	'.hoverable-alt'
			// ],
			hide: [
				'.supercursor-hide'
			],
		}

        this.enabled = false;

        this.layers = [];

        console.log(window);
        this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
    }


    addLayer(layerOpt) {
        this.layers.push(
            new CursorLayer({
                cursor: this,
                ...layerOpt
            })
        );
    }

    init() {
        document.addEventListener("mouseleave", ()=>this.disable())
		document.addEventListener("mouseenter", ()=>this.enable())
        document.addEventListener("mousedown", ()=>this.setState(this.states.ACTIVE))
        document.addEventListener("mouseup", ()=>this.setState(this.states.NORMAL))
        document.addEventListener("contextmenu", e=>{
            e.preventDefault();
        })

        document.addEventListener("mousemove", event=>this.updateMouseFromEvent(event))
        this.enable();
    }

    enable() {
        this.enabled = true;
        this.setState(this.states.NORMAL)
        this.element.removeAttribute('disabled');
        document.body.classList.add('superCursor-hide-cursor');
        
        for(let layer of this.layers) {
            layer.setPositionFromMouse(this.mouse);
        }
        
        this.animate();

              
    }

    disable() {
        this.setState(this.states.HIDDEN);
        document.body.classList.remove('superCursor-hide-cursor');
        this.enabled = false;
        this.element.setAttribute('disabled', true);
    }

    setState(newState) {
        if(newState===undefined) {
            console.warn("SuperCursor: undefined state provided");
        } else {
            this.element.classList.value = ''
            this.element.classList.add(`state-${newState.toText()}`);
            this.state = newState;
        }
    }

    updateMouseFromEvent(event) {
		this.mouse = {
			// x: event.pageX,
			// y: event.pageY
            x: event.clientX,
			y: event.clientY
		}
	}

    animate() {
        if(!this.enabled) return;

        this.elementHovered = document.elementFromPoint(this.mouse.x, this.mouse.y);
        let shouldChangeState = false;
        if(this.elementHovered) {
            for(let hideSelector of this.stateOn.hide) {
                let _shouldHide = this.elementHovered.matches(hideSelector) || this.elementHovered.closest(hideSelector);
                if(_shouldHide!==false && _shouldHide !==null) {
                    shouldChangeState = this.states.HIDDEN;
                    break;
                }
            }
    
            for(let hoverSelector of this.stateOn.hover) {
                let _shouldHover = this.elementHovered.matches(hoverSelector) || this.elementHovered.closest(hoverSelector);
                if(_shouldHover!==false && _shouldHover !==null) {
                    shouldChangeState = this.states.HOVER;
                    break;
                }
            }
        }

        if(shouldChangeState) {
            this.setState(shouldChangeState);
        } else if(this.state !== this.states.ACTIVE) {
            this.setState(this.states.NORMAL)
        }
        



        for(let layer of this.layers) {
            layer.updatePositionFromMouse(this.mouse);
            layer.updateEl(this.mouse);
        }

		requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = { SuperCursor };