module("Path");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  path = new Path(paper);
  equals(path.attrs.fill, "none", "Value of fill");
  equals(path.attrs.stroke, "#000000", "Value of stroke");
  equals(path.attrs.path, "M0,0", "Value of path string");
  equals(path.type, "path", "Value of type");
  // equals(path.paper, paper, "Value of paper");
});

test("Instantiation with relative path string", function() {
  paper = new Paper();
  path = new Path(paper, "M70,100c40,0,60,100,100,100");
  equals(path.attrs.path, [["M", 70, 100], ["C", 110, 100, 130, 200, 170, 200]], "Value of path is an absolute array");
});

test("Instantiation with absolute path string", function() {
  paper = new Paper();
  path = new Path(paper, "M70,100C,110,100,130,200,170,200");
  equals(path.attrs.path, [["M", 70, 100], ["C", 110, 100, 130, 200, 170, 200]], "Value of path is an absolute array");
});

test("Instantiation with relative path array", function() {
  paper = new Paper();
  path = new Path(paper, [["M", 70, 100], ["c", 40, 0, 60, 100, 100, 100]]);
  equals(path.attrs.path, [["M", 70, 100], ["C", 110, 100, 130, 200, 170, 200]], "Value of path is an absolute array");
});

test("Instantiation with absolute path array", function() {
  paper = new Paper();
  path = new Path(paper, [["M", 70, 100], ["C", 110, 100, 130, 200, 170, 200]]);
  equals(path.attrs.path, [["M", 70, 100], ["C", 110, 100, 130, 200, 170, 200]], "Value of path is an absolute array");
});
