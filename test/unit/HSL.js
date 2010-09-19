module("HSL");

// Black

test("pure black", function() {
  colour = new HSL(hue = 0, saturation = 0, lightness = 0);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.4), new RGB(0, 0, 0, opacity), "Explicitly translucent RGB value");
});

// Red

test("pure red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 0, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.6), new RGB(255, 0, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation red", function() {
  colour = new HSL(hue = 0, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(223, 32, 32), "RGB value");
});

test("low saturation red", function() {
  colour = new HSL(hue = 0, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(159, 96, 96), "RGB value");
});

test("zero saturation red", function() {
  colour = new HSL(hue = 0, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 0.75);
  same(colour.toRGB(), new RGB(255, 128, 128), "RGB value");
});

test("low lightness red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 0.25);
  same(colour.toRGB(), new RGB(128, 0, 0), "RGB value");
});

test("zero lightness red", function() {
  colour = new HSL(hue = 0, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal red", function() {
  colour = new HSL(hue = 0, saturation = 0.75, lightness = 0.75);
  same(colour.toRGB(), new RGB(239, 143, 143), "RGB value");
});

test("light weak tonal red", function() {
  colour = new HSL(hue = 0, saturation = 0.25, lightness = 0.875);
  same(colour.toRGB(), new RGB(231, 215, 215), "RGB value");
});

test("dark strong tonal red", function() {
  colour = new HSL(hue = 0, saturation = 0.75, lightness = 0.125);
  same(colour.toRGB(), new RGB(56, 8, 8), "RGB value");
});

test("dark weak tonal red", function() {
  colour = new HSL(hue = 0, saturation = 0.25, lightness = 0.25);
  same(colour.toRGB(), new RGB(80, 48, 48), "RGB value");
});

// Yellow

test("pure yellow", function() {
  colour = new HSL(hue = 60, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 255, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(223, 223, 32), "RGB value");
});

test("low saturation yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(159, 159, 96), "RGB value");
});

test("zero saturation yellow", function() {
  colour = new HSL(hue = 60, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness yellow", function() {
  colour = new HSL(hue = 60, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness yellow", function() {
  colour = new HSL(hue = 60, saturation = 1, lightness = 0.875);
  same(colour.toRGB(), new RGB(255, 255, 191), "RGB value");
});

test("low lightness yellow", function() {
  colour = new HSL(hue = 60, saturation = 1, lightness = 0.125);
  same(colour.toRGB(), new RGB(64, 64, 0), "RGB value");
});

test("zero lightness yellow", function() {
  colour = new HSL(hue = 60, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.75, lightness = 0.875);
  same(colour.toRGB(), new RGB(247, 247, 199), "RGB value");
});

test("light weak tonal yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.25, lightness = 0.75);
  same(colour.toRGB(), new RGB(207, 207, 175), "RGB value");
});

test("dark strong tonal yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.75, lightness = 0.25);
  same(colour.toRGB(), new RGB(112, 112, 16), "RGB value");
});

test("dark weak tonal yellow", function() {
  colour = new HSL(hue = 60, saturation = 0.25, lightness = 0.25);
  same(colour.toRGB(), new RGB(80, 80, 48), "RGB value");
});

// Green

test("pure green", function() {
  colour = new HSL(hue = 120, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 255, 0), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 0, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 0, opacity), "Explicitly translucent RGB value");
});

test("high saturation green", function() {
  colour = new HSL(hue = 120, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(32, 223, 32), "RGB value");
});

test("low saturation green", function() {
  colour = new HSL(hue = 120, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(96, 159, 96), "RGB value");
});

test("zero saturation green", function() {
  colour = new HSL(hue = 120, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness green", function() {
  colour = new HSL(hue = 120, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness green", function() {
  colour = new HSL(hue = 120, saturation = 1, lightness = 0.75);
  same(colour.toRGB(), new RGB(128, 255, 128), "RGB value");
});

test("low lightness green", function() {
  colour = new HSL(hue = 120, saturation = 1, lightness = 0.125);
  same(colour.toRGB(), new RGB(0, 64, 0), "RGB value");
});

test("zero lightness green", function() {
  colour = new HSL(hue = 120, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal green", function() {
  colour = new HSL(hue = 120, saturation = 0.75, lightness = 0.75);
  same(colour.toRGB(), new RGB(143, 239, 143), "RGB value");
});

test("light weak tonal green", function() {
  colour = new HSL(hue = 120, saturation = 0.25, lightness = 0.875);
  same(colour.toRGB(), new RGB(215, 231, 215), "RGB value");
});

test("dark strong tonal green", function() {
  colour = new HSL(hue = 120, saturation = 0.75, lightness = 0.125);
  same(colour.toRGB(), new RGB(8, 56, 8), "RGB value");
});

test("dark weak tonal green", function() {
  colour = new HSL(hue = 120, saturation = 0.25, lightness = 0.25);
  same(colour.toRGB(), new RGB(48, 80, 48), "RGB value");
});

// Cyan

test("pure cyan", function() {
  colour = new HSL(hue = 180, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 255, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 255, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(32, 223, 223), "RGB value");
});

test("low saturation cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(96, 159, 159), "RGB value");
});

test("zero saturation cyan", function() {
  colour = new HSL(hue = 180, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness cyan", function() {
  colour = new HSL(hue = 180, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness cyan", function() {
  colour = new HSL(hue = 180, saturation = 1, lightness = 0.625);
  same(colour.toRGB(), new RGB(64, 255, 255), "RGB value");
});

test("low lightness cyan", function() {
  colour = new HSL(hue = 180, saturation = 1, lightness = 0.375);
  same(colour.toRGB(), new RGB(0, 191, 191), "RGB value");
});

test("zero lightness cyan", function() {
  colour = new HSL(hue = 180, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.75, lightness = 0.625);
  same(colour.toRGB(), new RGB(88, 231, 231), "RGB value");
});

test("light weak tonal cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.25, lightness = 0.75);
  same(colour.toRGB(), new RGB(175, 207, 207), "RGB value");
});

test("dark strong tonal cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.75, lightness = 0.125);
  same(colour.toRGB(), new RGB(8, 56, 56), "RGB value");
});

test("dark weak tonal cyan", function() {
  colour = new HSL(hue = 180, saturation = 0.25, lightness = 0.375);
  same(colour.toRGB(), new RGB(72, 120, 120), "RGB value");
});

// Blue

test("pure blue", function() {
  colour = new HSL(hue = 240, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(0, 0, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(0, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(0, 0, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation blue", function() {
  colour = new HSL(hue = 240, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(32, 32, 223), "RGB value");
});

test("low saturation blue", function() {
  colour = new HSL(hue = 240, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(96, 96, 159), "RGB value");
});

test("zero saturation blue", function() {
  colour = new HSL(hue = 240, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness blue", function() {
  colour = new HSL(hue = 240, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness blue", function() {
  colour = new HSL(hue = 240, saturation = 1, lightness = 0.625);
  same(colour.toRGB(), new RGB(64, 64, 255), "RGB value");
});

test("low lightness blue", function() {
  colour = new HSL(hue = 240, saturation = 1, lightness = 0.375);
  same(colour.toRGB(), new RGB(0, 0, 191), "RGB value");
});

test("zero lightness blue", function() {
  colour = new HSL(hue = 240, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal blue", function() {
  colour = new HSL(hue = 240, saturation = 0.75, lightness = 0.75);
  same(colour.toRGB(), new RGB(143, 143, 239), "RGB value");
});

test("light weak tonal blue", function() {
  colour = new HSL(hue = 240, saturation = 0.25, lightness = 0.875);
  same(colour.toRGB(), new RGB(215, 215, 231), "RGB value");
});

test("dark strong tonal blue", function() {
  colour = new HSL(hue = 240, saturation = 0.75, lightness = 0.125);
  same(colour.toRGB(), new RGB(8, 8, 56), "RGB value");
});

test("dark weak tonal blue", function() {
  colour = new HSL(hue = 240, saturation = 0.25, lightness = 0.25);
  same(colour.toRGB(), new RGB(48, 48, 80), "RGB value");
});

// Magenta

test("pure magenta", function() {
  colour = new HSL(hue = 300, saturation = 1, lightness = 0.5);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 0, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 0, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 0, 255, opacity), "Explicitly translucent RGB value");
});

test("high saturation magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.75, lightness = 0.5);
  same(colour.toRGB(), new RGB(223, 32, 223), "RGB value");
});

test("low saturation magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.25, lightness = 0.5);
  same(colour.toRGB(), new RGB(159, 96, 159), "RGB value");
});

test("zero saturation magenta", function() {
  colour = new HSL(hue = 300, saturation = 0, lightness = 0.5);
  same(colour.toRGB(), new RGB(128, 128, 128), "RGB value");
});

test("full lightness magenta", function() {
  colour = new HSL(hue = 300, saturation = 1, lightness = 1);
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
});

test("high lightness magenta", function() {
  colour = new HSL(hue = 300, saturation = 1, lightness = 0.875);
  same(colour.toRGB(), new RGB(255, 191, 255), "RGB value");
});

test("low lightness magenta", function() {
  colour = new HSL(hue = 300, saturation = 1, lightness = 0.125);
  same(colour.toRGB(), new RGB(64, 0, 64), "RGB value");
});

test("zero lightness magenta", function() {
  colour = new HSL(hue = 300, saturation = 1, lightness = 0);
  same(colour.toRGB(), new RGB(0, 0, 0), "RGB value");
});

test("light strong tonal magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.75, lightness = 0.875);
  same(colour.toRGB(), new RGB(247, 199, 247), "RGB value");
});

test("light weak tonal magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.25, lightness = 0.625);
  same(colour.toRGB(), new RGB(183, 135, 183), "RGB value");
});

test("dark strong tonal magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.75, lightness = 0.25);
  same(colour.toRGB(), new RGB(112, 16, 112), "RGB value");
});

test("dark weak tonal magenta", function() {
  colour = new HSL(hue = 300, saturation = 0.25, lightness = 0.25);
  same(colour.toRGB(), new RGB(80, 48, 80), "RGB value");
});

// White

test("pure white", function() {
  colour = new HSL(hue = 0, saturation = 0, lightness = 1);
  equals(colour.hue, hue, "Hue value");
  equals(colour.saturation, saturation, "Saturation value");
  equals(colour.lightness, lightness, "Lightness value");
  same(colour.toRGB(), new RGB(255, 255, 255), "RGB value");
  same(colour.toRGB(opacity = 1), new RGB(255, 255, 255, opacity), "Explicitly opaque RGB value");
  same(colour.toRGB(opacity = 0.9), new RGB(255, 255, 255, opacity), "Explicitly translucent RGB value");
});
