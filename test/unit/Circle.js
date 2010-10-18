module("Circle");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  circle = new Circle(paper);
  equals(circle.attrs.cx, 0, "Value of cx");
  equals(circle.attrs.cy, 0, "Value of cy");
  equals(circle.attrs.r, 0, "Value of radius");
  equals(circle.attrs.fill, "none", "Value of fill");
  equals(circle.attrs.stroke, new RGB(0, 0, 0).hex(), "Value of stroke");
  equals(circle.type, "circle", "Value of type");
  // equals(circle.paper, paper, "Value of paper");
});

test("Instantiation with parameters", function() {
  paper = new Paper();
  circle = new Circle(paper, cx = 10, cy = 20, r = 30);
  equals(circle.attrs.cx, cx, "Value of cx");
  equals(circle.attrs.cy, cy, "Value of cy");
  equals(circle.attrs.r, r, "Value of radius");
});
