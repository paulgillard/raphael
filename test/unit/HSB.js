module("HSB");

// Black

test("pure black", function() {
  colour = new HSB(hue = 0, saturation = 0, brightness = 0);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.4), new RGB(0, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Red

test("pure red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 0, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.6), new RGB(255, 0, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation red", function() {
  colour = new HSB(hue = 0, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(255, 64, 64), "RGB value");
});

test("low saturation red", function() {
  colour = new HSB(hue = 0, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(255, 191, 191), "RGB value");
});

test("zero saturation red", function() {
  colour = new HSB(hue = 0, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(255, 0, 0), "RGB value");
});

test("high brightness red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 0.875);
  same(colour.toRGB(), new RGB(223, 0, 0), "RGB value");
});

test("low brightness red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 0.125);
  same(colour.toRGB(), new RGB(32, 0, 0), "RGB value");
});

test("zero brightness red", function() {
  colour = new HSB(hue = 0, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal red", function() {
  colour = new HSB(hue = 0, saturation = 0.75, brightness = 0.75);
  same(colour.toRGB(), new RGB(191, 48, 48), "RGB value");
});

test("bright weak tonal red", function() {
  colour = new HSB(hue = 0, saturation = 0.25, brightness = 0.875);
  same(colour.toRGB(), new RGB(223, 167, 167), "RGB value");
});

test("dim strong tonal red", function() {
  colour = new HSB(hue = 0, saturation = 0.75, brightness = 0.625);
  same(colour.toRGB(), new RGB(159, 40, 40), "RGB value");
});

test("dim weak tonal red", function() {
  colour = new HSB(hue = 0, saturation = 0.25, brightness = 0.25);
  same(colour.toRGB(), new RGB(64, 48, 48), "RGB value");
});

// Yellow

test("pure yellow", function() {
  colour = new HSB(hue = 60, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 255, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation yellow", function() {
  colour = new HSB(hue = 60, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 64), "RGB value");
});

test("low saturation yellow", function() {
  colour = new HSB(hue = 60, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 191), "RGB value");
});

test("zero saturation yellow", function() {
  colour = new HSB(hue = 60, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness yellow", function() {
  colour = new HSB(hue = 60, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 0), "RGB value");
});

test("high brightness yellow", function() {
  colour = new HSB(hue = 60, saturation = 1, brightness = 0.875);
  same(colour.toRGB(), new RGB(223, 223, 0), "RGB value");
});

test("low brightness yellow", function() {
  colour = new HSB(hue = 60, saturation = 1, brightness = 0.125);
  same(colour.toRGB(), new RGB(32, 32, 0), "RGB value");
});

test("zero brightness yellow", function() {
  colour = new HSB(hue = 60, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal yellow", function() {
  colour = new HSB(hue = 60, saturation = 0.75, brightness = 0.75);
  same(colour.toRGB(), new RGB(191, 191, 48), "RGB value");
});

test("bright weak tonal yellow", function() {
colour = new HSB(hue = 60, saturation = 0.75, brightness = 0.625);
same(colour.toRGB(), new RGB(159, 159, 40), "RGB value");
});

test("dim strong tonal yellow", function() {
  colour = new HSB(hue = 60, saturation = 0.75, brightness = 0.375);
  same(colour.toRGB(), new RGB(96, 96, 24), "RGB value");
});

test("dim weak tonal yellow", function() {
  colour = new HSB(hue = 60, saturation = 0.25, brightness = 0.25);
  same(colour.toRGB(), new RGB(64, 64, 48), "RGB value");
});

// Green

test("pure green", function() {
  colour = new HSB(hue = 120, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 255, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation green", function() {
  colour = new HSB(hue = 120, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(64, 255, 64), "RGB value");
});

test("low saturation green", function() {
  colour = new HSB(hue = 120, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(191, 255, 191), "RGB value");
});

test("zero saturation green", function() {
  colour = new HSB(hue = 120, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness green", function() {
  colour = new HSB(hue = 120, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(0, 255, 0), "RGB value");
});

test("high brightness green", function() {
  colour = new HSB(hue = 120, saturation = 1, brightness = 0.75);
  same(colour.toRGB(), new RGB(0, 191, 0), "RGB value");
});

test("low brightness green", function() {
  colour = new HSB(hue = 120, saturation = 1, brightness = 0.375);
  same(colour.toRGB(), new RGB(0, 96, 0), "RGB value");
});

test("zero brightness green", function() {
  colour = new HSB(hue = 120, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal green", function() {
  colour = new HSB(hue = 120, saturation = 0.75, brightness = 0.875);
  same(colour.toRGB(), new RGB(56, 223, 56), "RGB value");
});

test("bright weak tonal green", function() {
  colour = new HSB(hue = 120, saturation = 0.25, brightness = 0.625);
  same(colour.toRGB(), new RGB(120, 159, 120), "RGB value");
});

test("dim strong tonal green", function() {
  colour = new HSB(hue = 120, saturation = 0.75, brightness = 0.125);
  same(colour.toRGB(), new RGB(8, 32, 8), "RGB value");
});

test("dim weak tonal green", function() {
  colour = new HSB(hue = 120, saturation = 0.25, brightness = 0.125);
  same(colour.toRGB(), new RGB(24, 32, 24), "RGB value");
});

// Cyan

test("pure cyan", function() {
  colour = new HSB(hue = 180, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 255, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(64, 255, 255), "RGB value");
});

test("low saturation cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(191, 255, 255), "RGB value");
});

test("zero saturation cyan", function() {
  colour = new HSB(hue = 180, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness cyan", function() {
  colour = new HSB(hue = 180, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(0, 255, 255), "RGB value");
});

test("high brightness cyan", function() {
  colour = new HSB(hue = 180, saturation = 1, brightness = 0.875);
  same(colour.toRGB(), new RGB(0, 223, 223), "RGB value");
});

test("low brightness cyan", function() {
  colour = new HSB(hue = 180, saturation = 1, brightness = 0.125);
  same(colour.toRGB(), new RGB(0, 32, 32), "RGB value");
});

test("zero brightness cyan", function() {
  colour = new HSB(hue = 180, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.75, brightness = 0.625);
  same(colour.toRGB(), new RGB(40, 159, 159), "RGB value");
});

test("bright weak tonal cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.25, brightness = 0.75);
  same(colour.toRGB(), new RGB(143, 191, 191), "RGB value");
});

test("dim strong tonal cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.75, brightness = 0.125);
  same(colour.toRGB(), new RGB(8, 32, 32), "RGB value");
});

test("dim weak tonal cyan", function() {
  colour = new HSB(hue = 180, saturation = 0.25, brightness = 0.375);
  same(colour.toRGB(), new RGB(72, 96, 96), "RGB value");
});

// Blue

test("pure blue", function() {
  colour = new HSB(hue = 240, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(0, 0, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 0, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation blue", function() {
  colour = new HSB(hue = 240, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(64, 64, 255), "RGB value");
});

test("low saturation blue", function() {
  colour = new HSB(hue = 240, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(191, 191, 255), "RGB value");
});

test("zero saturation blue", function() {
  colour = new HSB(hue = 240, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness blue", function() {
  colour = new HSB(hue = 240, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(0, 0, 255), "RGB value");
});

test("high brightness blue", function() {
  colour = new HSB(hue = 240, saturation = 1, brightness = 0.625);
  same(colour.toRGB(), new RGB(0, 0, 159), "RGB value");
});

test("low brightness blue", function() {
  colour = new HSB(hue = 240, saturation = 1, brightness = 0.375);
  same(colour.toRGB(), new RGB(0, 0, 96), "RGB value");
});

test("zero brightness blue", function() {
  colour = new HSB(hue = 240, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal blue", function() {
  colour = new HSB(hue = 240, saturation = 0.75, brightness = 0.875);
  same(colour.toRGB(), new RGB(56, 56, 223), "RGB value");
});

test("bright weak tonal blue", function() {
  colour = new HSB(hue = 240, saturation = 0.25, brightness = 0.625);
  same(colour.toRGB(), new RGB(120, 120, 159), "RGB value");
});

test("dim strong tonal blue", function() {
  colour = new HSB(hue = 240, saturation = 0.75, brightness = 0.25);
  same(colour.toRGB(), new RGB(16, 16, 64), "RGB value");
});

test("dim weak tonal blue", function() {
  colour = new HSB(hue = 240, saturation = 0.25, brightness = 0.375);
  same(colour.toRGB(), new RGB(72, 72, 96), "RGB value");
});

// Magenta

test("pure magenta", function() {
  colour = new HSB(hue = 300, saturation = 1, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 0, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 0, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.75, brightness = 1);
  same(colour.toRGB(), new RGB(255, 64, 255), "RGB value");
});

test("low saturation magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.25, brightness = 1);
  same(colour.toRGB(), new RGB(255, 191, 255), "RGB value");
});

test("zero saturation magenta", function() {
  colour = new HSB(hue = 300, saturation = 0, brightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("full brightness magenta", function() {
  colour = new HSB(hue = 300, saturation = 1, brightness = 1);
  same(colour.toRGB(), new RGB(255, 0, 255), "RGB value");
});

test("high brightness magenta", function() {
  colour = new HSB(hue = 300, saturation = 1, brightness = 0.875);
  same(colour.toRGB(), new RGB(223, 0, 223), "RGB value");
});

test("low brightness magenta", function() {
  colour = new HSB(hue = 300, saturation = 1, brightness = 0.125);
  same(colour.toRGB(), new RGB(32, 0, 32), "RGB value");
});

test("zero brightness magenta", function() {
  colour = new HSB(hue = 300, saturation = 1, brightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("bright strong tonal magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.75, brightness = 0.75);
  same(colour.toRGB(), new RGB(191, 48, 191), "RGB value");
});

test("bright weak tonal magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.25, brightness = 0.25);
  same(colour.toRGB(), new RGB(64, 48, 64), "RGB value");
});

test("dim strong tonal magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.75, brightness = 0.625);
  same(colour.toRGB(), new RGB(159, 40, 159), "RGB value");
});

test("dim weak tonal magenta", function() {
  colour = new HSB(hue = 300, saturation = 0.25, brightness = 0.25);
  same(colour.toRGB(), new RGB(64, 48, 64), "RGB value");
});

// White

test("pure white", function() {
  colour = new HSB(hue = 0, saturation = 0, brightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.brightness, brightness, "Brightness value");
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 255, opacity), "Explicitly translucent RGB value");
});
