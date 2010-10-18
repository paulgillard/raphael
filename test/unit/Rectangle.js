module("Rectangle");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  rectangle = new Rectangle(paper);
  equals(rectangle.attrs.fill, "none", "Value of fill");
  equals(rectangle.attrs.height, 0, "Value of height");
  equals(rectangle.attrs.r, 0, "Value of radius");
  equals(rectangle.attrs.rx, 0, "Value of rx");
  equals(rectangle.attrs.ry, 0, "Value of ry");
  equals(rectangle.attrs.stroke, new RGB(0, 0, 0).hex(), "Value of stroke");
  equals(rectangle.attrs.width, 0, "Value of width");
  equals(rectangle.attrs.x, 0, "Value of x");
  equals(rectangle.attrs.y, 0, "Value of y");
  equals(rectangle.type, "rect", "Value of type");
  // equals(rectangle.paper, paper, "Value of paper");
});

test("Instantiation with parameters", function() {
  paper = new Paper();
  rectangle = new Rectangle(paper, x = 10, y = 20, width = 30, height = 40, radius = 50);
  equals(rectangle.attrs.height, height, "Value of height");
  equals(rectangle.attrs.r, radius, "Value of radius");
  equals(rectangle.attrs.rx, radius, "Value of rx");
  equals(rectangle.attrs.ry, radius, "Value of ry");
  equals(rectangle.attrs.width, width, "Value of width");
  equals(rectangle.attrs.x, x, "Value of x");
  equals(rectangle.attrs.y, y, "Value of y");
});
