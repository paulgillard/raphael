module("HSB");

// Black

test("black", function() {
  colour = new HSB(hue = 0, saturation = 0, brightness = 0);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 0, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.4), new RGB(0, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Red

test("red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 0, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.6), new RGB(255, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Yellow

test("yellow", function() {
  colour = new HSB(hue = 1 / 6, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 255, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 0, opacity), "Explicitly translucent RGB value");
});

// Green

test("green", function() {
  colour = new HSB(hue = 2 / 6, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 255, 0), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 0, opacity), "Explicitly translucent RGB value");
});

// Cyan

test("cyan", function() {
  colour = new HSB(hue = 3 / 6, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 255, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 255, opacity), "Explicitly translucent RGB value");
});

// Blue

test("blue", function() {
  colour = new HSB(hue = 4 / 6, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 0, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 0, 255, opacity), "Explicitly translucent RGB value");
});

// Magenta

test("magenta", function() {
  colour = new HSB(hue = 5 / 6, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 0, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 0, 255, opacity), "Explicitly translucent RGB value");
});

// White

test("white", function() {
  colour = new HSB(hue = 0, saturation = 0, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 255, 255), "Implicitly opaque RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 255, opacity), "Explicitly translucent RGB value");
});
