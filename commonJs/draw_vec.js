const DIRECTION = {
  CLOCKWISE: -1, // Sentido horário
  ANTICLOCKWISE: 1, // Sentido anti-horário
};

class DrawVector extends Vector2D {
  constructor(params = {}) {
    super();
    this.direction = params.dir ? DIRECTION.ANTICLOCKWISE : DIRECTION.CLOCKWISE;

    this.angle = this.toRandian(params.angle) * this.direction || 0;

    if (params.pos) {
      this.x = params.pos.x;
      this.y = params.pos.y;
    }
    this.len = params.len;
    this.color = params.color;
    this.endPos = new Vector2D(this.x + this.len * Math.cos(this.angle), this.y + this.len * Math.sin(this.angle));
  }

  setLine(start, end) {
    this.x = start.x;
    this.y = start.y;
    this.endPos = end;
  }

  setColor(newColor) {
    this.color = newColor;
  }

  toRandian(degree) {
    return degree * (Math.PI / 180);
  }

  draw(ctx) {

    ctx.save()
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    const sideLength = -5;
    const sideAngle = Math.PI / 6; // 45 graus

    const sideVector1 = new Vector2D(sideLength * Math.cos(this.angle + sideAngle), sideLength * Math.sin(this.angle + sideAngle));

    const sideVector2 = new Vector2D(sideLength * Math.cos(this.angle - sideAngle), sideLength * Math.sin(this.angle - sideAngle));

    const endVector1 = this.endPos.add(sideVector1);
    const endVector2 = this.endPos.add(sideVector2);

    ctx.beginPath();
    ctx.moveTo(this.endPos.x, this.endPos.y);
    ctx.lineTo(endVector1.x, endVector1.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.endPos.x, this.endPos.y);
    ctx.lineTo(endVector2.x, endVector2.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    ctx.restore();
  }
}
