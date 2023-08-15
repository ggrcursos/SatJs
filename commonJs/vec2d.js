class Vector2D {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    mult(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

   
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const length = this.length;
        return new Vector2D(this.x / length, this.y / length);
    }
}