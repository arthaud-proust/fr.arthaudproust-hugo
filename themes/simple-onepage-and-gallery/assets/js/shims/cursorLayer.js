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
            console.log(state, func);
            this[`updateEl_${state}`] = func;
        }

        console.log(this);
	}

	updateEl_NORMAL() {
		this.element.style.removeProperty("--w");
		this.element.style.removeProperty("--h");
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";
	}

    updateEl_ACTIVE() {
		this.element.style.removeProperty("--w");
		this.element.style.removeProperty("--h");
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";
	}

	updateEl_HOVER() {
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";
	}

	updateEl_HIDDEN() {
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
            this[`updateEl_${this.cursor.state.toText()}`]();
        } catch(e) {
            console.group('Warn');
            console.warn(`Layer ${this.name}: Undefined method for state ${this.cursor.state.toText()}`)
            console.error(e);
            console.groupEnd();
        }
	}
}


module.exports = { CursorLayer };