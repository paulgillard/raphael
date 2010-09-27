module("HSB Sequence");

// Colour Iteration

test("Sequence with default brightness", function() {
  sequence = new HSBSequence();
  initial = new HSB(hue = 0, saturation = 1, brightness = 0.75);
  while (saturation >= 0) {
    while (hue < 360) {
      hsbEqual(sequence.next(), new HSB(hue, saturation, brightness), "Sequence is incremented");
      hue += 27;
    }
    hue = 0
    saturation -= 0.2;
  }
  hsbEqual(sequence.next(), initial, "Sequence loops back to beginning");
});

test("Sequence with defined brightness", function() {
  sequence = new HSBSequence(brightness = 0.5);
  initial = new HSB(hue = 0, saturation = 1, brightness);
  while (saturation >= 0) {
    while (hue < 360) {
      hsbEqual(sequence.next(), new HSB(hue, saturation, brightness), "Sequence is incremented");
      hue += 27;
    }
    hue = 0
    saturation -= 0.2;
  }
  hsbEqual(sequence.next(), initial, "Sequence loops back to beginning");
});
