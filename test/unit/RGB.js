module("RGB");

// Black

test("Implicitly opaque black", function() {
  colour = new RGB(red = 0, green = 0, blue = 0);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#000000", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 0), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 0), "HSL value");
});

test("Explicitly opaque black", function() {
  colour = new RGB(red = 0, green = 0, blue = 0, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#000000", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 0), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 0), "HSL value");
});

test("Explicitly translucent black", function() {
  colour = new RGB(red = 0, green = 0, blue = 0, opacity = 0.4);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#000000", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 0), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 0), "HSL value");
});

// Red

test("Implicitly opaque red", function() {
  colour = new RGB(red = 255, green = 0, blue = 0);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ff0000", "Hex value");
  same(colour.toHSB(), new HSB(0, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 1, 0.5), "HSL value");
});

test("Explicitly opaque red", function() {
  colour = new RGB(red = 255, green = 0, blue = 0, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff0000", "Hex value");
  same(colour.toHSB(), new HSB(0, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 1, 0.5), "HSL value");
});

test("Explicitly translucent red", function() {
  colour = new RGB(red = 255, green = 0, blue = 0, opacity = 0.6);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff0000", "Hex value");
  same(colour.toHSB(), new HSB(0, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 1, 0.5), "HSL value");
});

// Yellow

test("Implicitly opaque yellow", function() {
  colour = new RGB(red = 255, green = 255, blue = 0);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ffff00", "Hex value");
  same(colour.toHSB(), new HSB(1 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(1 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque yellow", function() {
  colour = new RGB(red = 255, green = 255, blue = 0, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffff00", "Hex value");
  same(colour.toHSB(), new HSB(1 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(1 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent yellow", function() {
  colour = new RGB(red = 255, green = 255, blue = 0, opacity = 0.9);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffff00", "Hex value");
  same(colour.toHSB(), new HSB(1 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(1 / 6, 1, 0.5), "HSL value");
});

// Green

test("Implicitly opaque green", function() {
  colour = new RGB(red = 0, green = 255, blue = 0);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#00ff00", "Hex value");
  same(colour.toHSB(), new HSB(2 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(2 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque green", function() {
  colour = new RGB(red = 0, green = 255, blue = 0, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ff00", "Hex value");
  same(colour.toHSB(), new HSB(2 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(2 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent green", function() {
  colour = new RGB(red = 0, green = 255, blue = 0, opacity = 0.9);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ff00", "Hex value");
  same(colour.toHSB(), new HSB(2 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(2 / 6, 1, 0.5), "HSL value");
});

// Cyan

test("Implicitly opaque cyan", function() {
  colour = new RGB(red = 0, green = 255, blue = 255);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#00ffff", "Hex value");
  same(colour.toHSB(), new HSB(3 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(3 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque cyan", function() {
  colour = new RGB(red = 0, green = 255, blue = 255, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ffff", "Hex value");
  same(colour.toHSB(), new HSB(3 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(3 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent cyan", function() {
  colour = new RGB(red = 0, green = 255, blue = 255, opacity = 0.9);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ffff", "Hex value");
  same(colour.toHSB(), new HSB(3 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(3 / 6, 1, 0.5), "HSL value");
});

// Blue

test("Implicitly opaque blue", function() {
  colour = new RGB(red = 0, green = 0, blue = 255);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#0000ff", "Hex value");
  same(colour.toHSB(), new HSB(4 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(4 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque blue", function() {
  colour = new RGB(red = 0, green = 0, blue = 255, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#0000ff", "Hex value");
  same(colour.toHSB(), new HSB(4 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(4 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent blue", function() {
  colour = new RGB(red = 0, green = 0, blue = 255, opacity = 0.9);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#0000ff", "Hex value");
  same(colour.toHSB(), new HSB(4 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(4 / 6, 1, 0.5), "HSL value");
});

// Magenta

test("Implicitly opaque magenta", function() {
  colour = new RGB(red = 255, green = 0, blue = 255);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ff00ff", "Hex value");
  same(colour.toHSB(), new HSB(5 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(5 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque magenta", function() {
  colour = new RGB(red = 255, green = 0, blue = 255, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff00ff", "Hex value");
  same(colour.toHSB(), new HSB(5 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(5 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent magenta", function() {
  colour = new RGB(red = 255, green = 0, blue = 255, opacity = 0.9);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff00ff", "Hex value");
  same(colour.toHSB(), new HSB(5 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(5 / 6, 1, 0.5), "HSL value");
});

// White

test("Implicitly opaque white", function() {
  colour = new RGB(red = 255, green = 255, blue = 255);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});

test("Explicitly opaque white", function() {
  colour = new RGB(red = 255, green = 255, blue = 255, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});

test("Explicitly translucent white", function() {
  colour = new RGB(red = 255, green = 255, blue = 255, opacity = 0.6);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});
