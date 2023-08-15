function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color || "black";
    ctx.lineWidth = 0.4;
    ctx.stroke();
    ctx.restore();
}


function drawText(ctx, text, x, y, color, font) {
    ctx.fillStyle = color || "black";
    ctx.font = font || "12px Verdana"; // Default font is 12px Arial if not specified
    ctx.imageSmoothingEnabled = true;
   
    ctx.fillText(text, x, y);
}


