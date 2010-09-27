module("Colour");

// Instantiation of web colours

test("White", function() {
  rgbEqual(new Colour("white"), new RGB(255, 255, 255), "Correctly parsed");
});

test("White Smoke", function() {
  rgbEqual(new Colour("whitesmoke"), new RGB(245, 245, 245), "Correctly parsed");
});

test("Gainsboro", function() {
  rgbEqual(new Colour("gainsboro"), new RGB(220, 220, 220), "Correctly parsed");
});

test("Light Grey", function() {
  rgbEqual(new Colour("lightgrey"), new RGB(211, 211, 211), "Correctly parsed");
});

test("Silver", function() {
  rgbEqual(new Colour("silver"), new RGB(192, 192, 192), "Correctly parsed");
});

test("Dark Gray", function() {
  rgbEqual(new Colour("darkgray"), new RGB(169, 169, 169), "Correctly parsed");
});

test("Gray", function() {
  rgbEqual(new Colour("gray"), new RGB(128, 128, 128), "Correctly parsed");
});

test("Dim Gray", function() {
  rgbEqual(new Colour("dimgray"), new RGB(105, 105, 105), "Correctly parsed");
});

test("Black", function() {
  rgbEqual(new Colour("black"), new RGB(0, 0, 0), "Correctly parsed");
});

test("Rosy Brown", function() {
  rgbEqual(new Colour("rosybrown"), new RGB(188, 143, 143), "Correctly parsed");
});

test("Light Coral", function() {
  rgbEqual(new Colour("lightcoral"), new RGB(240, 128, 128), "Correctly parsed");
});

test("Indian Red", function() {
  rgbEqual(new Colour("indianred"), new RGB(205, 92, 92), "Correctly parsed");
});

test("Brown", function() {
  rgbEqual(new Colour("brown"), new RGB(165, 42, 42), "Correctly parsed");
});

test("Fire Brick", function() {
  rgbEqual(new Colour("firebrick"), new RGB(178, 34, 34), "Correctly parsed");
});

test("Red", function() {
  rgbEqual(new Colour("red"), new RGB(255, 0, 0), "Correctly parsed");
});

test("Dark Red", function() {
  rgbEqual(new Colour("darkred"), new RGB(139, 0, 0), "Correctly parsed");
});

test("Maroon", function() {
  rgbEqual(new Colour("maroon"), new RGB(128, 0, 0), "Correctly parsed");
});

test("Light Pink", function() {
  rgbEqual(new Colour("lightpink"), new RGB(255, 182, 193), "Correctly parsed");
});

test("Crimson", function() {
  rgbEqual(new Colour("crimson"), new RGB(220, 20, 60), "Correctly parsed");
});

test("Pale Violet Red", function() {
  rgbEqual(new Colour("palevioletred"), new RGB(219, 112, 147), "Correctly parsed");
});

test("Lavender Blush", function() {
  rgbEqual(new Colour("lavenderblush"), new RGB(255, 240, 245), "Correctly parsed");
});

test("Hot Pink", function() {
  rgbEqual(new Colour("hotpink"), new RGB(255, 105, 180), "Correctly parsed");
});

test("Deep Pink", function() {
  rgbEqual(new Colour("deeppink"), new RGB(255, 20, 147), "Correctly parsed");
});

test("Medium Violet Red", function() {
  rgbEqual(new Colour("mediumvioletred"), new RGB(199, 21, 133), "Correctly parsed");
});

test("Orchid", function() {
  rgbEqual(new Colour("orchid"), new RGB(218, 112, 214), "Correctly parsed");
});

test("Thistle", function() {
  rgbEqual(new Colour("thistle"), new RGB(216, 191, 216), "Correctly parsed");
});

test("Violet", function() {
  rgbEqual(new Colour("violet"), new RGB(238, 130, 238), "Correctly parsed");
});

test("Magenta", function() {
  rgbEqual(new Colour("magenta"), new RGB(255, 0, 255), "Correctly parsed");
});

test("Dark Magenta", function() {
  rgbEqual(new Colour("darkmagenta"), new RGB(139, 0, 139), "Correctly parsed");
});

test("Purple", function() {
  rgbEqual(new Colour("purple"), new RGB(128, 0, 128), "Correctly parsed");
});

test("Medium Orchid", function() {
  rgbEqual(new Colour("mediumorchid"), new RGB(186, 85, 211), "Correctly parsed");
});

test("Dark Violet", function() {
  rgbEqual(new Colour("darkviolet"), new RGB(148, 0, 211), "Correctly parsed");
});

test("Dark Orchid", function() {
  rgbEqual(new Colour("darkorchid"), new RGB(153, 50, 204), "Correctly parsed");
});

test("Indigo", function() {
  rgbEqual(new Colour("indigo"), new RGB(75, 0, 130), "Correctly parsed");
});

test("Blue Violet", function() {
  rgbEqual(new Colour("blueviolet"), new RGB(138, 43, 226), "Correctly parsed");
});

test("Medium Purple", function() {
  rgbEqual(new Colour("mediumpurple"), new RGB(147, 112, 219), "Correctly parsed");
});

test("Slate Blue", function() {
  rgbEqual(new Colour("slateblue"), new RGB(106, 90, 205), "Correctly parsed");
});

test("Dark Slate Blue", function() {
  rgbEqual(new Colour("darkslateblue"), new RGB(72, 61, 139), "Correctly parsed");
});

test("Medium Slate Blue", function() {
  rgbEqual(new Colour("mediumslateblue"), new RGB(123, 104, 238), "Correctly parsed");
});

test("Ghost White", function() {
  rgbEqual(new Colour("ghostwhite"), new RGB(248, 248, 255), "Correctly parsed");
});

test("Lavender", function() {
  rgbEqual(new Colour("lavender"), new RGB(230, 230, 250), "Correctly parsed");
});

test("Midnight Blue", function() {
  rgbEqual(new Colour("midnightblue"), new RGB(25, 25, 112), "Correctly parsed");
});

test("Blue", function() {
  rgbEqual(new Colour("blue"), new RGB(0, 0, 255), "Correctly parsed");
});

test("Medium Blue", function() {
  rgbEqual(new Colour("mediumblue"), new RGB(0, 0, 205), "Correctly parsed");
});

test("Dark Blue", function() {
  rgbEqual(new Colour("darkblue"), new RGB(0, 0, 139), "Correctly parsed");
});

test("Navy", function() {
  rgbEqual(new Colour("navy"), new RGB(0, 0, 128), "Correctly parsed");
});

test("Royal Blue", function() {
  rgbEqual(new Colour("royalblue"), new RGB(65, 105, 225), "Correctly parsed");
});

test("Cornflower Blue", function() {
  rgbEqual(new Colour("cornflowerblue"), new RGB(100, 149, 237), "Correctly parsed");
});

test("Light Steel Blue", function() {
  rgbEqual(new Colour("lightsteelblue"), new RGB(176, 196, 222), "Correctly parsed");
});

test("Light Slate Gray", function() {
  rgbEqual(new Colour("lightslategray"), new RGB(119, 136, 153), "Correctly parsed");
});

test("Slate Gray", function() {
  rgbEqual(new Colour("slategray"), new RGB(112, 128, 144), "Correctly parsed");
});

test("Dodger Blue", function() {
  rgbEqual(new Colour("dodgerblue"), new RGB(30, 144, 255), "Correctly parsed");
});

test("Alice Blue", function() {
  rgbEqual(new Colour("aliceblue"), new RGB(240, 248, 255), "Correctly parsed");
});

test("Steel Blue", function() {
  rgbEqual(new Colour("steelblue"), new RGB(70, 130, 180), "Correctly parsed");
});

test("Light Sky Blue", function() {
  rgbEqual(new Colour("lightskyblue"), new RGB(135, 206, 250), "Correctly parsed");
});

test("Sky Blue", function() {
  rgbEqual(new Colour("skyblue"), new RGB(135, 206, 235), "Correctly parsed");
});

test("Deep Sky Blue", function() {
  rgbEqual(new Colour("deepskyblue"), new RGB(0, 191, 255), "Correctly parsed");
});

test("Light Blue", function() {
  rgbEqual(new Colour("lightblue"), new RGB(173, 216, 230), "Correctly parsed");
});

test("Powder Blue", function() {
  rgbEqual(new Colour("powderblue"), new RGB(176, 224, 230), "Correctly parsed");
});

test("Cadet Blue", function() {
  rgbEqual(new Colour("cadetblue"), new RGB(95, 158, 160), "Correctly parsed");
});

test("Dark Turquoise", function() {
  rgbEqual(new Colour("darkturquoise"), new RGB(0, 206, 209), "Correctly parsed");
});

test("Azure", function() {
  rgbEqual(new Colour("azure"), new RGB(240, 255, 255), "Correctly parsed");
});

test("Light Cyan", function() {
  rgbEqual(new Colour("lightcyan"), new RGB(224, 255, 255), "Correctly parsed");
});

test("Pale Turquoise", function() {
  rgbEqual(new Colour("paleturquoise"), new RGB(175, 238, 238), "Correctly parsed");
});

test("Dark Slate Gray", function() {
  rgbEqual(new Colour("darkslategray"), new RGB(47, 79, 79), "Correctly parsed");
});

test("Cyan", function() {
  rgbEqual(new Colour("cyan"), new RGB(0, 255, 255), "Correctly parsed");
});

test("Dark Cyan", function() {
  rgbEqual(new Colour("darkcyan"), new RGB(0, 139, 139), "Correctly parsed");
});

test("Teal", function() {
  rgbEqual(new Colour("teal"), new RGB(0, 128, 128), "Correctly parsed");
});

test("Medium Turquoise", function() {
  rgbEqual(new Colour("mediumturquoise"), new RGB(72, 209, 204), "Correctly parsed");
});

test("Light Sea Green", function() {
  rgbEqual(new Colour("lightseagreen"), new RGB(32, 178, 170), "Correctly parsed");
});

test("Turquoise", function() {
  rgbEqual(new Colour("turquoise"), new RGB(64, 224, 208), "Correctly parsed");
});

test("Aquamarine", function() {
  rgbEqual(new Colour("aquamarine"), new RGB(127, 255, 212), "Correctly parsed");
});

test("Medium Aquamarine", function() {
  rgbEqual(new Colour("mediumaquamarine"), new RGB(102, 205, 170), "Correctly parsed");
});

test("Medium Spring Green", function() {
  rgbEqual(new Colour("mediumspringgreen"), new RGB(0, 250, 154), "Correctly parsed");
});

test("Mint Cream", function() {
  rgbEqual(new Colour("mintcream"), new RGB(245, 255, 250), "Correctly parsed");
});

test("Spring Green", function() {
  rgbEqual(new Colour("springgreen"), new RGB(0, 255, 127), "Correctly parsed");
});

test("Medium Sea Green", function() {
  rgbEqual(new Colour("mediumseagreen"), new RGB(60, 179, 113), "Correctly parsed");
});

test("Sea Green", function() {
  rgbEqual(new Colour("seagreen"), new RGB(46, 139, 87), "Correctly parsed");
});

test("Honeydew", function() {
  rgbEqual(new Colour("honeydew"), new RGB(240, 255, 240), "Correctly parsed");
});

test("Dark Sea Green", function() {
  rgbEqual(new Colour("darkseagreen"), new RGB(143, 188, 143), "Correctly parsed");
});

test("Pale Green", function() {
  rgbEqual(new Colour("palegreen"), new RGB(152, 251, 152), "Correctly parsed");
});

test("Light Green", function() {
  rgbEqual(new Colour("lightgreen"), new RGB(144, 238, 144), "Correctly parsed");
});

test("Forest Green", function() {
  rgbEqual(new Colour("forestgreen"), new RGB(34, 139, 34), "Correctly parsed");
});

test("Lime Green", function() {
  rgbEqual(new Colour("limegreen"), new RGB(50, 205, 50), "Correctly parsed");
});

test("Lime", function() {
  rgbEqual(new Colour("lime"), new RGB(0, 255, 0), "Correctly parsed");
});

test("Green", function() {
  rgbEqual(new Colour("green"), new RGB(0, 128, 0), "Correctly parsed");
});

test("Dark Green", function() {
  rgbEqual(new Colour("darkgreen"), new RGB(0, 100, 0), "Correctly parsed");
});

test("Lawn Green", function() {
  rgbEqual(new Colour("lawngreen"), new RGB(124, 252, 0), "Correctly parsed");
});

test("Chartreuse", function() {
  rgbEqual(new Colour("chartreuse"), new RGB(127, 255, 0), "Correctly parsed");
});

test("Green Yellow", function() {
  rgbEqual(new Colour("greenyellow"), new RGB(173, 255, 47), "Correctly parsed");
});

test("Dark Olive Green", function() {
  rgbEqual(new Colour("darkolivegreen"), new RGB(85, 107, 47), "Correctly parsed");
});

test("Yellow Green", function() {
  rgbEqual(new Colour("yellowgreen"), new RGB(154, 205, 50), "Correctly parsed");
});

test("Olive Drab", function() {
  rgbEqual(new Colour("olivedrab"), new RGB(107, 142, 35), "Correctly parsed");
});

test("Ivory", function() {
  rgbEqual(new Colour("ivory"), new RGB(255, 255, 240), "Correctly parsed");
});

test("Beige", function() {
  rgbEqual(new Colour("beige"), new RGB(245, 245, 220), "Correctly parsed");
});

test("Light Yellow", function() {
  rgbEqual(new Colour("lightyellow"), new RGB(255, 255, 224), "Correctly parsed");
});

test("Light Goldenrod Yellow", function() {
  rgbEqual(new Colour("lightgoldenrodyellow"), new RGB(250, 250, 210), "Correctly parsed");
});

test("Yellow", function() {
  rgbEqual(new Colour("yellow"), new RGB(255, 255, 0), "Correctly parsed");
});

test("Olive", function() {
  rgbEqual(new Colour("olive"), new RGB(128, 128, 0), "Correctly parsed");
});

test("Dark Khaki", function() {
  rgbEqual(new Colour("darkkhaki"), new RGB(189, 183, 107), "Correctly parsed");
});

test("Pale Goldenrod", function() {
  rgbEqual(new Colour("palegoldenrod"), new RGB(238, 232, 170), "Correctly parsed");
});

test("Lemon Chiffon", function() {
  rgbEqual(new Colour("lemonchiffon"), new RGB(255, 250, 205), "Correctly parsed");
});

test("Khaki", function() {
  rgbEqual(new Colour("khaki"), new RGB(240, 230, 140), "Correctly parsed");
});

test("Cornsilk", function() {
  rgbEqual(new Colour("cornsilk"), new RGB(255, 248, 220), "Correctly parsed");
});

test("Goldenrod", function() {
  rgbEqual(new Colour("goldenrod"), new RGB(218, 165, 32), "Correctly parsed");
});

test("Dark Goldenrod", function() {
  rgbEqual(new Colour("darkgoldenrod"), new RGB(184, 134, 11), "Correctly parsed");
});

test("Floral White", function() {
  rgbEqual(new Colour("floralwhite"), new RGB(255, 250, 240), "Correctly parsed");
});

test("Old Lace", function() {
  rgbEqual(new Colour("oldlace"), new RGB(253, 245, 230), "Correctly parsed");
});

test("Wheat", function() {
  rgbEqual(new Colour("wheat"), new RGB(245, 222, 179), "Correctly parsed");
});

test("Orange", function() {
  rgbEqual(new Colour("orange"), new RGB(255, 165, 0), "Correctly parsed");
});

test("Moccasin", function() {
  rgbEqual(new Colour("moccasin"), new RGB(255, 228, 181), "Correctly parsed");
});

test("Papaya Whip", function() {
  rgbEqual(new Colour("papayawhip"), new RGB(255, 239, 213), "Correctly parsed");
});

test("Blanched Almond", function() {
  rgbEqual(new Colour("blanchedalmond"), new RGB(255, 235, 205), "Correctly parsed");
});

test("Navajo White", function() {
  rgbEqual(new Colour("navajowhite"), new RGB(255, 222, 173), "Correctly parsed");
});

test("Antique White", function() {
  rgbEqual(new Colour("antiquewhite"), new RGB(250, 235, 215), "Correctly parsed");
});

test("Burlywood", function() {
  rgbEqual(new Colour("burlywood"), new RGB(222, 184, 135), "Correctly parsed");
});

test("Dark Orange", function() {
  rgbEqual(new Colour("darkorange"), new RGB(255, 140, 0), "Correctly parsed");
});

test("Bisque", function() {
  rgbEqual(new Colour("bisque"), new RGB(255, 228, 196), "Correctly parsed");
});

test("Linen", function() {
  rgbEqual(new Colour("linen"), new RGB(250, 240, 230), "Correctly parsed");
});

test("Peach Puff", function() {
  rgbEqual(new Colour("peachpuff"), new RGB(255, 218, 185), "Correctly parsed");
});

test("Sandy Brown", function() {
  rgbEqual(new Colour("sandybrown"), new RGB(244, 164, 96), "Correctly parsed");
});

test("Seashell", function() {
  rgbEqual(new Colour("seashell"), new RGB(255, 245, 238), "Correctly parsed");
});

test("Chocolate", function() {
  rgbEqual(new Colour("chocolate"), new RGB(210, 105, 30), "Correctly parsed");
});

test("Saddle Brown", function() {
  rgbEqual(new Colour("saddlebrown"), new RGB(139, 69, 19), "Correctly parsed");
});

test("Sienna", function() {
  rgbEqual(new Colour("sienna"), new RGB(160, 82, 45), "Correctly parsed");
});

test("Light Salmon", function() {
  rgbEqual(new Colour("lightsalmon"), new RGB(255, 160, 122), "Correctly parsed");
});

test("Coral", function() {
  rgbEqual(new Colour("coral"), new RGB(255, 127, 80), "Correctly parsed");
});

test("Orange Red", function() {
  rgbEqual(new Colour("orangered"), new RGB(255, 69, 0), "Correctly parsed");
});

test("Dark Salmon", function() {
  rgbEqual(new Colour("darksalmon"), new RGB(233, 150, 122), "Correctly parsed");
});

test("Tomato", function() {
  rgbEqual(new Colour("tomato"), new RGB(255, 99, 71), "Correctly parsed");
});

test("Misty Rose", function() {
  rgbEqual(new Colour("mistyrose"), new RGB(255, 228, 225), "Correctly parsed");
});

test("Salmon", function() {
  rgbEqual(new Colour("salmon"), new RGB(250, 128, 114), "Correctly parsed");
});

// Instantiation of hex values

test("Hex value", function() {
  rgbEqual(new Colour("#a13f2c"), new RGB(161, 63, 44), "Correctly parsed");
});

test("Hex short-hand value", function() {
  rgbEqual(new Colour("#a3c"), new RGB(170, 51, 204), "Correctly parsed");
});

// Instantiation of RGB values

test("RGB values", function() {
  rgbEqual(new Colour("rgb(231, 34, 12)"), new RGB(231, 34, 12), "Correctly parsed");
});

test("RGBA values", function() {
  rgbEqual(new Colour("rgba(231, 34, 12, 0.2)"), new RGB(231, 34, 12, 0.2), "Correctly parsed");
});

test("RGB percentages", function() {
  // Blue should be 230 but suffers floating point error
  rgbEqual(new Colour("rgb(30%, 40%, 90%)"), new RGB(77, 102, 229), "Correctly parsed");
});

test("RGBA percentages", function() {
  // Blue should be 230 but suffers floating point error
  rgbEqual(new Colour("rgba(30%, 40%, 90%, 0.785)"), new RGB(77, 102, 229, 0.785), "Correctly parsed");
});

// Instantiation of RGB values

test("RGB values", function() {
  rgbEqual(new Colour("rgb(231, 34, 12)"), new RGB(231, 34, 12), "Correctly parsed");
});

test("RGBA values", function() {
  rgbEqual(new Colour("rgba(231, 34, 12, 0.2)"), new RGB(231, 34, 12, 0.2), "Correctly parsed");
});

test("RGB percentages", function() {
  // Blue should be 230 but suffers floating point error
  rgbEqual(new Colour("rgb(30%, 40%, 90%)"), new RGB(77, 102, 229), "Correctly parsed");
});

test("RGBA percentages", function() {
  // Blue should be 230 but suffers floating point error
  rgbEqual(new Colour("rgba(30%, 40%, 90%, 0.785)"), new RGB(77, 102, 229, 0.785), "Correctly parsed");
});

// Instantiation of HSB values

test("HSB deg and decimal values", function() {
  hsbEqual(new Colour("hsb(30deg, 0.8, 0.7)"), new HSB(30, 0.8, 0.7), "Correctly parsed");
});

test("HSB º and decimal values", function() {
  hsbEqual(new Colour("hsb(30°, 0.8, 0.7)"), new HSB(30, 0.8, 0.7), "Correctly parsed");
});

test("HSB percentage values", function() {
  hsbEqual(new Colour("hsb(3.3%, 80%, 70%)"), new HSB(3.3 * 3.6, 0.8, 0.7), "Correctly parsed");
});

test("HSB º and percentage values", function() {
  hsbEqual(new Colour("hsb(30°, 80%, 70%)"), new HSB(30, 0.8, 0.7), "Correctly parsed");
});

test("HSB deg and percentage values", function() {
  hsbEqual(new Colour("hsb(30deg, 80%, 70%)"), new HSB(30, 0.8, 0.7), "Correctly parsed");
});

test("HSBA deg and decimal values", function() {
  hsbEqual(new Colour("hsba(30deg, 0.8, 0.7, 0.2)"), new HSB(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSBA º and decimal values", function() {
  hsbEqual(new Colour("hsba(30°, 0.8, 0.7, 0.2)"), new HSB(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSBA percentage values", function() {
  hsbEqual(new Colour("hsba(3.3%, 80%, 70%, 20%)"), new HSB(3.3 * 3.6, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSBA º and percentage values", function() {
  hsbEqual(new Colour("hsba(30°, 80%, 70%, 20%)"), new HSB(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSBA deg and percentage values", function() {
  hsbEqual(new Colour("hsba(30deg, 80%, 70%, 20%)"), new HSB(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

// Instantiation of HSL values

test("HSL deg and decimal values", function() {
  hslEqual(new Colour("hsl(30deg, 0.8, 0.7)"), new HSL(30, 0.8, 0.7), "Correctly parsed");
});

test("HSL º and decimal values", function() {
  hslEqual(new Colour("hsl(30°, 0.8, 0.7)"), new HSL(30, 0.8, 0.7), "Correctly parsed");
});

test("HSL percentage values", function() {
  hslEqual(new Colour("hsl(3.3%, 80%, 70%)"), new HSL(3.3 * 3.6, 0.8, 0.7), "Correctly parsed");
});

test("HSL º and percentage values", function() {
  hslEqual(new Colour("hsl(30°, 80%, 70%)"), new HSL(30, 0.8, 0.7), "Correctly parsed");
});

test("HSL deg and percentage values", function() {
  hslEqual(new Colour("hsl(30deg, 80%, 70%)"), new HSL(30, 0.8, 0.7), "Correctly parsed");
});

test("HSLA deg and decimal values", function() {
  hslEqual(new Colour("hsla(30deg, 0.8, 0.7, 0.2)"), new HSL(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSLA º and decimal values", function() {
  hslEqual(new Colour("hsla(30°, 0.8, 0.7, 0.2)"), new HSL(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSLA percentage values", function() {
  hslEqual(new Colour("hsla(3.3%, 80%, 70%, 20%)"), new HSL(3.3 * 3.6, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSLA º and percentage values", function() {
  hslEqual(new Colour("hsla(30°, 80%, 70%, 20%)"), new HSL(30, 0.8, 0.7, 0.2), "Correctly parsed");
});

test("HSLA deg and percentage values", function() {
  hslEqual(new Colour("hsla(30deg, 80%, 70%, 20%)"), new HSL(30, 0.8, 0.7, 0.2), "Correctly parsed");
});
