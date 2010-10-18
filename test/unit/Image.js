module("Image");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  image = new Image(paper);
  equals(image.attrs.height, 0, "Value of height");
  equals(image.attrs.src, "about:blank", "Value of src");
  equals(image.attrs.width, 0, "Value of width");
  equals(image.attrs.x, 0, "Value of x");
  equals(image.attrs.y, 0, "Value of y");
  equals(image.type, "image", "Value of type");
  // equals(image.paper, paper, "Value of paper");
});

test("Instantiation with parameters", function() {
  paper = new Paper();
  image = new Image(paper, src = "http://www.example.com/images/raphael.svg", x = 10, y = 20, width = 30, height = 40);
  equals(image.attrs.height, height, "Value of height");
  equals(image.attrs.src, src, "Value of src");
  equals(image.attrs.width, width, "Value of width");
  equals(image.attrs.x, x, "Value of x");
  equals(image.attrs.y, y, "Value of y");
});
