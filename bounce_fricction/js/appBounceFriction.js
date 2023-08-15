class AppBounceFriction {
  constructor(title, width, height, startY, startX) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.startY = startY;
    this.startX = startX;
    this.fricction = 100;
    this.bounce = 100;

    canvas.width = width; // Set the canvas width
    canvas.height = height; // Set the canvas height

    const originalWidth = 300;
    const originalHeight = 200;
    const scaleX = width / originalWidth; // Fator de escala na largura
    const scaleY = height / originalHeight; // Fator de escala na altura

    this.scale = Math.min(scaleX, scaleY);

    ctx.scale(this.scale, this.scale);

    this.vecOffset = new Vector2D(startX, startY);
    this.fricctionSlider = new Slider("friction", canvas, new Vector2D(startX + 50, startY + 130), 100, 0, 100, this.fricction, "green", this.scale);
    this.bounceSlider = new Slider("bounce", canvas, new Vector2D(startX + 50, startY + 160), 100, 0, 100, this.bounce, "red", this.scale);
  }

  start() {}

  update(deltaTime) {
    this.fricction = this.fricctionSlider.getValue();
    this.bounce = this.bounceSlider.getValue();
  }

  draw(ctx) {
    drawText(ctx, this.title, 5, 10, "white", "10px Arial");
    this.fricctionSlider.draw(ctx);
    this.bounceSlider.draw(ctx);

    var vec_a = new DrawVector({ pos: this.vecOffset, len: 100, angle: 270, color: "grey" });
    var vec_b = new DrawVector({ pos: vec_a.endPos, len: 100, color: "grey" });
    var rawVec = vec_a.add(vec_b.endPos.sub(this.vecOffset));

    const angleRadians = Math.atan2(vec_a.y - rawVec.y, rawVec.x - vec_a.x);
    var vec_ab = new DrawVector({ color: "orange", angle: angleRadians * (180 / Math.PI) });
    vec_ab.setLine(vec_a, rawVec);

    var vec_c = new DrawVector({ pos: rawVec, color: "green", len: this.fricction });
    var vec_d = new DrawVector({ pos: vec_c.endPos, angle: 90, color: "red", len: this.bounce });

    var rawVec2 = vec_c.add(vec_d.endPos.sub(vec_c));
    const angleRadians2 = Math.atan2(vec_c.y - rawVec2.y, rawVec2.x - vec_c.x);
    //vec_c.add(vec_d.endPos.sub(vec_c.pos));
    var vec_cd = new DrawVector({ color: "orange", angle: angleRadians2 * (180 / Math.PI) });
    vec_cd.setLine(vec_c, rawVec2);

    vec_a.draw(ctx);
    vec_b.draw(ctx);
    vec_ab.draw(ctx);
    vec_c.draw(ctx);
    vec_d.draw(ctx);
    vec_cd.draw(ctx);

    drawLine(ctx, -1, vec_a.endPos.y, 401, vec_a.endPos.y, "grey");
  }
}
