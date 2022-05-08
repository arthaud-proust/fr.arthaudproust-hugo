import { CursorLayer } from './cursorLayer';
import { Enum } from './enum';
class SuperCursor {
	constructor({root, layers}) {

        this.root = root;

        this.elId = 'superCursor'

        this.element = document.getElementById(this.elId);
        if(!this.element) {
            this.element = document.createElement('div');
            this.element.id = this.elId;
            this.element.setAttribute('disabled', true);
            this.root.appendChild(this.element);
        }
        while(this.element.lastChild) {
            this.element.lastChild.remove()
        }

        this.states = Enum(
            'NORMAL',
            'HOVER',
            'HOVER_TEXT',
            'HOVER_SEE',
            'ACTIVE',
            'HIDDEN',
            'ACTIVEABLE_X'
        );
        this.state = this.states.HIDDEN;


        this.stateOn = new Map();
        this.stateOn.set('HIDDEN', [
            // '.supercursor-hide',
            // '.offcanvas-backdrop'
        ]);
        this.stateOn.set('HOVER_TEXT', [
            '.supercursor-hover-text'
        ]);
        this.stateOn.set('HOVER_SEE', [
            '.supercursor-hover-see',
        ]);
        this.stateOn.set('HOVER', [
            'a', 
            '.supercursor-hover',
            '.pswp__button'
        ]);
        this.stateOn.set('ACTIVEABLE_X', [
            '.supercursor-activeable-x'
        ]);

        this.enabled = false;

        this.layers = [];

        for(const layer of layers) {
            this.addLayer(layer);
        }

        this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2,
            velocity: 0,
            direction: {
                x:0,
                y:0
            },
            movedAt: 0
		}
    }


    addLayer(layerOpt) {
        if( this.layers.filter(layer=>layer.name==layerOpt.name).length<=0) {
            this.layers.push(
                new CursorLayer({
                    cursor: this,
                    ...layerOpt
                })
            );
        }
    }

    init() {
        console.log('Supercursor initialized');
        document.addEventListener("mouseleave", ()=>this.disable())
		document.addEventListener("mouseenter", ()=>this.enable())
        document.addEventListener("mousedown", ()=>this.setState(this.states.ACTIVE))
        document.addEventListener("mouseup", ()=>this.setState(this.states.NORMAL))
        document.addEventListener("contextmenu", e=>{
            e.preventDefault();
        })

        document.addEventListener("mousemove", event=>this.updateMouseFromEvent(event))
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
        if(!this.enabled) return;
        if(newState===undefined) {
            console.warn("SuperCursor: undefined state provided");
        } else if (newState !== this.state) {
            this.element.classList.value = ''
            this.element.classList.add(`state-${newState.toText()}`);
            this.state = newState;
        }
    }

    updateMouseFromEvent(event) {
        if(!this.enabled) return;
		// this.mouse = {
		// 	x: event.pageX,
		// 	y: event.pageY
        // }

        const { x: oldX, y: oldY } = this.mouse, 
            { clientX: newX, clientY: newY } = event,
            movedAt = event.timeStamp;

        
        this.mouse.x = newX;
        this.mouse.y = newY;
        const dist = Math.sqrt(
            Math.pow(Math.abs(oldX-newX), 2)
            +
            Math.pow(Math.abs(oldY-newY), 2)
        );
        const time = movedAt - this.mouse.movedAt;
        
        this.mouse.direction.x = oldX == newX ? 0 : (oldX > newX ? -1 : 1);
        this.mouse.direction.y = oldY == newY ? 0 : (oldY > newY ? -1 : 1);

        this.mouse.velocity = (dist/time)*1000;

        this.mouse.lastMoved = movedAt;
	}

    animate() {
        if(!this.enabled) return;


        this.elementHovered = document.elementFromPoint(this.mouse.x, this.mouse.y);
        let shouldChangeState = false;
        if(this.elementHovered) {
            for(let [state, selectors] of this.stateOn) {
                if(shouldChangeState) break;
                // console.log(state);
                for(let selector of selectors) {
                    let shouldChange = this.elementHovered.matches(selector) || this.elementHovered.closest(selector);
                    if( shouldChange!==false && shouldChange !==null) {
                        shouldChangeState = this.states[state];
                        break;
                    }
                }
            }
        }

        if(this.state !== this.states.ACTIVE) {
            if(shouldChangeState) {
                this.setState(shouldChangeState);
            } else {
                this.setState(this.states.NORMAL)
            }
        }
        
        



        for(let layer of this.layers) {
            layer.updatePositionFromMouse(this.mouse);
            layer.updateEl(this.mouse);
        }

		requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = { SuperCursor };