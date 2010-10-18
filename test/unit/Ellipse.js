module("Ellipse");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  ellipse = new Ellipse(paper);
  equals(ellipse.attrs.cx, 0, "Value of cx");
  equals(ellipse.attrs.cy, 0, "Value of cy");
  equals(ellipse.attrs.fill, "none", "Value of fill");
  equals(ellipse.attrs.rx, 0, "Value of rx");
  equals(ellipse.attrs.ry, 0, "Value of ry");
  equals(ellipse.attrs.stroke, new RGB(0, 0, 0).hex(), "Value of stroke");
  equals(ellipse.type, "ellipse", "Value of type");
  // equals(ellipse.paper, paper, "Value of paper");
});

test("Instantiation with parameters", function() {
  paper = new Paper();
  ellipse = new Ellipse(paper, x = 10, y = 20, rx = 30, ry = 40);
  equals(ellipse.attrs.cx, x, "Value of cx");
  equals(ellipse.attrs.cy, y, "Value of cy");
  equals(ellipse.attrs.rx, rx, "Value of rx");
  equals(ellipse.attrs.ry, ry, "Value of ry");
});
