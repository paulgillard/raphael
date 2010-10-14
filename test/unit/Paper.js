module("Paper");

// Namespaces

test("SVG Namespace", function() {
  equals(Paper.svgNamespace, "http://www.w3.org/2000/svg", "Value of namespace");
})

test("xLink Namespace", function() {
  equals(Paper.xLinkNamespace, "http://www.w3.org/1999/xlink", "Value of namespace");
})

// Instantiation

test("Instantiation", function() {
  paper = new Paper()
});
