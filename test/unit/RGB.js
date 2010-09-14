module("RGB");

// Black

test("Implicitly opaque black", function() {
  red = green = blue = 0
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#000000", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 0), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 0), "HSL value");
});

test("Explicitly opaque black", function() {
  red = green = blue = 0
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#000000", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 0), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 0), "HSL value");
});

test("Explicitly translucent black", function() {
  red = green = blue = 0
  opacity = 0.4
  colour = new RGB(red, green, blue, opacity);
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
  red = 255
  green = blue = 0
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ff0000", "Hex value");
  same(colour.toHSB(), new HSB(0, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 1, 0.5), "HSL value");
});

test("Explicitly opaque red", function() {
  red = 255
  green = blue = 0
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff0000", "Hex value");
  same(colour.toHSB(), new HSB(0, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 1, 0.5), "HSL value");
});

test("Explicitly translucent red", function() {
  red = 255
  green = blue = 0
  opacity = 0.6
  colour = new RGB(red, green, blue, opacity);
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
  blue = 0
  red = green = 255
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ffff00", "Hex value");
  same(colour.toHSB(), new HSB(1 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(1 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque yellow", function() {
  blue = 0
  red = green = 255
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffff00", "Hex value");
  same(colour.toHSB(), new HSB(1 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(1 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent yellow", function() {
  blue = 0
  red = green = 255
  opacity = 0.9
  colour = new RGB(red, green, blue, opacity);
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
  green = 255
  red = blue = 0
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#00ff00", "Hex value");
  same(colour.toHSB(), new HSB(2 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(2 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque green", function() {
  green = 255
  red = blue = 0
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ff00", "Hex value");
  same(colour.toHSB(), new HSB(2 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(2 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent green", function() {
  green = 255
  red = blue = 0
  opacity = 0.9
  colour = new RGB(red, green, blue, opacity);
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
  red = 0
  blue = green = 255
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#00ffff", "Hex value");
  same(colour.toHSB(), new HSB(3 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(3 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque cyan", function() {
  red = 0
  blue = green = 255
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#00ffff", "Hex value");
  same(colour.toHSB(), new HSB(3 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(3 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent cyan", function() {
  red = 0
  blue = green = 255
  opacity = 0.9
  colour = new RGB(red, green, blue, opacity);
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
  blue = 255
  red = green = 0
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#0000ff", "Hex value");
  same(colour.toHSB(), new HSB(4 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(4 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque blue", function() {
  blue = 255
  red = green = 0
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#0000ff", "Hex value");
  same(colour.toHSB(), new HSB(4 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(4 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent blue", function() {
  blue = 255
  red = green = 0
  opacity = 0.9
  colour = new RGB(red, green, blue, opacity);
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
  green = 0
  red = blue = 255
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ff00ff", "Hex value");
  same(colour.toHSB(), new HSB(5 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(5 / 6, 1, 0.5), "HSL value");
});

test("Explicitly opaque magenta", function() {
  green = 0
  red = blue = 255
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ff00ff", "Hex value");
  same(colour.toHSB(), new HSB(5 / 6, 1, 1), "HSB value");
  same(colour.toHSL(), new HSL(5 / 6, 1, 0.5), "HSL value");
});

test("Explicitly translucent magenta", function() {
  green = 0
  red = blue = 255
  opacity = 0.9
  colour = new RGB(red, green, blue, opacity);
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
  red = green = blue = 255
  colour = new RGB(red, green, blue);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});

test("Explicitly opaque white", function() {
  red = green = blue = 255
  opacity = 1
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});

test("Explicitly translucent white", function() {
  red = green = blue = 255
  opacity = 0.6
  colour = new RGB(red, green, blue, opacity);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
  equals(colour.hex(), "#ffffff", "Hex value");
  same(colour.toHSB(), new HSB(0, 0, 1), "HSB value");
  same(colour.toHSL(), new HSL(0, 0, 1), "HSL value");
});
