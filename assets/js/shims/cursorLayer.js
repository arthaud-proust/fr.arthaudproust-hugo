class CursorLayer {
	constructor({cursor, name, speed, coef=1, updateEl={}}) {

        this.name = name;
        this.cursor = cursor;
		this.speed = speed;
		this.coef = coef;
		this.position = this.cursor.mouse;

		this.element = document.createElement('div');
        this.element.classList.add(`superCursor-layer`, `superCursor-layer-${this.name}`);
        this.cursor.element.appendChild(this.element);

        for(const [state, func] of Object.entries(updateEl)) {
            this[`updateEl_${state}`] = func;
        }
	}

	updateEl_NORMAL() {
		this.element.style.removeProperty("--w");
		this.element.style.removeProperty("--h");
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";
	}

	getDistanceFromMouse(mouse) {
		return {
			x: mouse.x - this.position.x,
			y: mouse.y - this.position.y
		};
	}

	updatePositionFromMouse(mouse) {
		let dist = this.getDistanceFromMouse(mouse);

		this.position = {
			x: this.position.x + dist.x * this.speed,
			y: this.position.y + dist.y * this.speed
		};
		return this;
	}

    

	updateDisplacementFromMouse(mouse) {
		let dist = this.getDistanceFromMouse(mouse);

		this.position = {
			x: this.position.x + dist.x * this.coef,
			y: this.position.y + dist.y * this.coef
		};
		return this;
	}

    setPositionFromMouse(mouse) {
		this.position = {
			x: mouse.x,
			y: mouse.y
		};
		return this;
	}

	updateEl() {
        try {
            if(this[`updateEl_${this.cursor.state.toText()}`]) {
                this[`updateEl_${this.cursor.state.toText()}`]();
            } else {
                this.updateEl_NORMAL();
            }
        } catch(e) {
            console.groupCollapsed(`Warn: Layer ${this.name}`);
            console.warn(`Layer ${this.name}: Undefined method for state ${this.cursor.state.toText()}`)
            console.error(e);
            console.groupEnd();
        }
	}
}


module.exports = { CursorLayer };