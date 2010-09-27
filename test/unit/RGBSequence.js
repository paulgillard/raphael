module("RGB Sequence");

// Colour Iteration

test("Sequence with default brightness", function() {
  sequence = new RGBSequence();
  hsbSequence = new HSBSequence();
  i = 10;
  while (i--) {
    rgbEqual(sequence.next(), hsbSequence.next().toRGB(), "Sequence based on HSB sequence");
  }
});
