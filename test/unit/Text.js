module("Text");

// Instantiation

test("Instantiation without parameters", function() {
  paper = new Paper();
  text = new Text(paper, textString = "Raphael - Cross-browser vector graphics the easy way.");
  equals(text.attrs.fill, "#000000", "Value of fill");
  equals(text.attrs.font, RaphaelNew.availableAttrs.font, "Value of font");
  equals(text.attrs.stroke, "none", "Value of stroke");
  equals(text.attrs.text, textString, "Value of text string");
  equals(text.attrs["text-anchor"], "middle", "Value of text-anchor");
  equals(text.attrs.x, 0, "Value of x");
  equals(text.attrs.y, 0, "Value of y");
  equals(text.type, "text", "Value of type");
  // equals(text.paper, paper, "Value of paper");
});

test("Instantiation with parameters", function() {
  paper = new Paper();
  text = new Text(paper, textString = "Raphael - Cross-browser vector graphics the easy way.", x = 10, y = 20);
  equals(text.attrs.text, textString, "Value of text string");
  equals(text.attrs.x, x, "Value of x");
  equals(text.attrs.y, y, "Value of y");
});
