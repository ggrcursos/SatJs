class Slider {
    constructor(text, canvas, position, width, minValue, maxValue, initialValue, color, scale) {
        this.text = text;
        this.canvas = canvas;
        this.position = position;
        this.width = width;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.value = initialValue;
        this.dragging = false;
        this.color = color;
        this.scale = scale;

        this.textOffsetX = 20;
        this.textOffsetY = 10;
        this.sliderHeight = 10;
        this.isDraggingButton = false;

        this.updateValue = this.updateValue.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave);

        this.draw(); // Chama a função draw inicialmente
    }

    getValue() {
        return this.value;
    }

    draw() {
        const ctx = this.canvas.getContext("2d"); 

        ctx.fillRect(this.position.x, this.position.y, this.width, 1);

        const sliderX = this.position.x + (this.value - this.minValue) / (this.maxValue - this.minValue) * this.width;
        ctx.fillStyle = this.color;
        ctx.fillRect(sliderX - 5, this.position.y - this.sliderHeight / 2, 10, this.sliderHeight);

        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(`${this.text}: ${(this.value / this.maxValue).toFixed(2)}`, sliderX - this.textOffsetX, this.position.y - this.textOffsetY);

        if (this.isDraggingButton) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.strokeRect(sliderX - 5, this.position.y - this.sliderHeight / 2, 10, this.sliderHeight);
        }
    }

    updateValue(x) {
        const newValue = this.minValue + ((x - this.position.x) / this.width) * (this.maxValue - this.minValue);
        this.value = Math.max(this.minValue, Math.min(this.maxValue, newValue));
    }

    handleMouseDown(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) / this.scale;
        const mouseY = (event.clientY - rect.top) / this.scale;

        const sliderX = this.position.x + (this.value - this.minValue) / (this.maxValue - this.minValue) * this.width;
        if (
            mouseY >= this.position.y - this.sliderHeight / 2 &&
            mouseY <= this.position.y + this.sliderHeight / 2 &&
            mouseX >= sliderX - 5 &&
            mouseX <= sliderX + 5
        ) {
            this.dragging = true;
            this.isDraggingButton = true;
            this.canvas.style.cursor = "grabbing";
        }
    }

    handleMouseUp() {
        this.dragging = false;
        this.isDraggingButton = false;
        this.canvas.style.cursor = "default";
        this.draw(); // Atualiza o desenho após o soltar do mouse
    }

    handleMouseMove(event) {
        if (this.dragging) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = (event.clientX - rect.left) / this.scale;
            this.updateValue(mouseX);
            this.canvas.style.cursor = "grab";
            this.draw(); // Atualiza o desenho durante o arraste
        }
    }

    handleMouseLeave() {
        this.isDraggingButton = false;
        this.canvas.style.cursor = "default";
        this.draw(); // Atualiza o desenho quando o mouse sai do canvas
    }
}