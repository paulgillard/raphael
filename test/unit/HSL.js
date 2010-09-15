module("HSL");

// Black

test("black", function() {
  colour = new HSL(hue = 0, saturation = 0, lightness = 0);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 0, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.4), new RGB(0, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Red

test("red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 0, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.6), new RGB(255, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Yellow

test("yellow", function() {
  colour = new HSL(hue = 1 / 6, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 255, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 0, opacity), "Explicitly translucent RGB value");
});

// Green

test("green", function() {
  colour = new HSL(hue = 2 / 6, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 255, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 0, opacity), "Explicitly translucent RGB value");
});

// Cyan

test("cyan", function() {
  colour = new HSL(hue = 3 / 6, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 255, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 255, opacity), "Explicitly translucent RGB value");
});

// Blue

test("blue", function() {
  colour = new HSL(hue = 4 / 6, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 0, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 0, 255, opacity), "Explicitly translucent RGB value");
});

// Magenta

test("magenta", function() {
  colour = new HSL(hue = 5 / 6, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 0, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 0, 255, opacity), "Explicitly translucent RGB value");
});

// White

test("white", function() {
  colour = new HSL(hue = 0, saturation = 0, lightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 255, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 255, opacity), "Explicitly translucent RGB value");
});
