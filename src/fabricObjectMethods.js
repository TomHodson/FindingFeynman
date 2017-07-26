//add some methods to all fabric objects

//sclae the object so that it takes up no more than a certain fraction of the
//canvas that is given as an argument
fabric.Object.prototype.scaleToMaxXY = function(canvas, options) {
  var yScale = (options.height || 1) * canvas.height / this.getHeight();
  var xScale = (options.width || 1) * canvas.width / this.getWidth();
  this.scale(Math.min(xScale, yScale));
};
