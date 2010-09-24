module("RGB");

// Instantiation

test("Instantiation of implicitly opaque colour", function() {
  colour = new RGB(red = 1, green = 2, blue = 3);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, 1, "Opacity value");
});

test("Instantiation of explicitly opaque colour", function() {
  colour = new RGB(red = 1, green = 2, blue = 3, opacity = 1);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
});

test("Instantiation of explicitly translucent colour", function() {
  colour = new RGB(red = 1, green = 2, blue = 3, opacity = 0.5);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
});

test("Instantiation of explicitly transparent colour", function() {
  colour = new RGB(red = 1, green = 2, blue = 3, opacity = 0);
  equals(colour.red, red, "Red value");
  equals(colour.green, green, "Green value");
  equals(colour.blue, blue, "Blue value");
  equals(colour.opacity, opacity, "Opacity value");
});

// Colours

test("White", function() {
  colour = new RGB(255, 255, 255);
  equal(colour.hex(), "#ffffff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 1), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("White Smoke", function() {
  colour = new RGB(245, 245, 245);
  equal(colour.hex(), "#f5f5f5", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.96078431372549), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.96078431372549), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Gainsboro", function() {
  colour = new RGB(220, 220, 220);
  equal(colour.hex(), "#dcdcdc", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.862745098039216), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.862745098039216), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Grey", function() {
  colour = new RGB(211, 211, 211);
  equal(colour.hex(), "#d3d3d3", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.827450980392157), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.827450980392157), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Silver", function() {
  colour = new RGB(192, 192, 192);
  equal(colour.hex(), "#c0c0c0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.752941176470588), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.752941176470588), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Gray", function() {
  colour = new RGB(169, 169, 169);
  equal(colour.hex(), "#a9a9a9", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.662745098039216), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.662745098039216), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Gray", function() {
  colour = new RGB(128, 128, 128);
  equal(colour.hex(), "#808080", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.501960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dim Gray", function() {
  colour = new RGB(105, 105, 105);
  equal(colour.hex(), "#696969", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0.411764705882353), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0.411764705882353), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Black", function() {
  colour = new RGB(0, 0, 0);
  equal(colour.hex(), "#000000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0, 0), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0, 0), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Rosy Brown", function() {
  colour = new RGB(188, 143, 143);
  equal(colour.hex(), "#bc8f8f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0.23936170212766, 0.737254901960784), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0.251396648044693, 0.649019607843137), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Coral", function() {
  colour = new RGB(240, 128, 128);
  equal(colour.hex(), "#f08080", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0.466666666666667, 0.941176470588235), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0.788732394366197, 0.72156862745098), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Indian Red", function() {
  colour = new RGB(205, 92, 92);
  equal(colour.hex(), "#cd5c5c", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0.551219512195122, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0.530516431924883, 0.582352941176471), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Brown", function() {
  colour = new RGB(165, 42, 42);
  equal(colour.hex(), "#a52a2a", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0.745454545454545, 0.647058823529412), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0.594202898550725, 0.405882352941176), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Fire Brick", function() {
  colour = new RGB(178, 34, 34);
  equal(colour.hex(), "#b22222", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 0.808988764044944, 0.698039215686274), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 0.679245283018868, 0.415686274509804), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Red", function() {
  colour = new RGB(255, 0, 0);
  equal(colour.hex(), "#ff0000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Red", function() {
  colour = new RGB(139, 0, 0);
  equal(colour.hex(), "#8b0000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 1, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 1, 0.272549019607843), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Maroon", function() {
  colour = new RGB(128, 0, 0);
  equal(colour.hex(), "#800000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(0, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(0, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Pink", function() {
  colour = new RGB(255, 182, 193);
  equal(colour.hex(), "#ffb6c1", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(350.958904109589, 0.286274509803922, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(350.958904109589, 1, 0.856862745098039), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Crimson", function() {
  colour = new RGB(220, 20, 60);
  equal(colour.hex(), "#dc143c", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(348, 0.909090909090909, 0.862745098039216), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(348, 0.833333333333333, 0.470588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Pale Violet Red", function() {
  colour = new RGB(219, 112, 147);
  equal(colour.hex(), "#db7093", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(340.373831775701, 0.488584474885845, 0.858823529411765), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(340.373831775701, 0.597765363128491, 0.649019607843137), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lavender Blush", function() {
  colour = new RGB(255, 240, 245);
  equal(colour.hex(), "#fff0f5", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(340, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(340, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Hot Pink", function() {
  colour = new RGB(255, 105, 180);
  equal(colour.hex(), "#ff69b4", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(330, 0.588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(330, 1, 0.705882352941176), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Deep Pink", function() {
  colour = new RGB(255, 20, 147);
  equal(colour.hex(), "#ff1493", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(327.574468085106, 0.92156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(327.574468085106, 1, 0.53921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Violet Red", function() {
  colour = new RGB(199, 21, 133);
  equal(colour.hex(), "#c71585", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(322.247191011236, 0.894472361809045, 0.780392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(322.247191011236, 0.809090909090909, 0.431372549019608), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Orchid", function() {
  colour = new RGB(218, 112, 214);
  equal(colour.hex(), "#da70d6", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(302.264150943396, 0.486238532110092, 0.854901960784314), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(302.264150943396, 0.588888888888889, 0.647058823529412), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Thistle", function() {
  colour = new RGB(216, 191, 216);
  equal(colour.hex(), "#d8bfd8", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(300, 0.115740740740741, 0.847058823529412), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(300, 0.242718446601942, 0.798039215686275), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Violet", function() {
  colour = new RGB(238, 130, 238);
  equal(colour.hex(), "#ee82ee", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(300, 0.453781512605042, 0.933333333333333), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(300, 0.76056338028169, 0.72156862745098), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Magenta", function() {
  colour = new RGB(255, 0, 255);
  equal(colour.hex(), "#ff00ff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(300, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(300, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Magenta", function() {
  colour = new RGB(139, 0, 139);
  equal(colour.hex(), "#8b008b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(300, 1, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(300, 1, 0.272549019607843), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Purple", function() {
  colour = new RGB(128, 0, 128);
  equal(colour.hex(), "#800080", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(300, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(300, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Orchid", function() {
  colour = new RGB(186, 85, 211);
  equal(colour.hex(), "#ba55d3", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(288.095238095238, 0.597156398104265, 0.827450980392157), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(288.095238095238, 0.588785046728972, 0.580392156862745), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Violet", function() {
  colour = new RGB(148, 0, 211);
  equal(colour.hex(), "#9400d3", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(282.085308056872, 1, 0.827450980392157), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(282.085308056872, 1, 0.413725490196078), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Orchid", function() {
  colour = new RGB(153, 50, 204);
  equal(colour.hex(), "#9932cc", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(280.12987012987, 0.754901960784314, 0.8), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(280.12987012987, 0.606299212598425, 0.498039215686275), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Indigo", function() {
  colour = new RGB(75, 0, 130);
  equal(colour.hex(), "#4b0082", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(274.615384615385, 1, 0.509803921568627), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(274.615384615385, 1, 0.254901960784314), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Blue Violet", function() {
  colour = new RGB(138, 43, 226);
  equal(colour.hex(), "#8a2be2", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(271.147540983607, 0.809734513274336, 0.886274509803921), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(271.147540983607, 0.759336099585062, 0.527450980392157), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Purple", function() {
  colour = new RGB(147, 112, 219);
  equal(colour.hex(), "#9370db", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(259.626168224299, 0.488584474885845, 0.858823529411765), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(259.626168224299, 0.597765363128491, 0.649019607843137), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Slate Blue", function() {
  colour = new RGB(106, 90, 205);
  equal(colour.hex(), "#6a5acd", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(248.347826086957, 0.560975609756097, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(248.347826086957, 0.534883720930233, 0.57843137254902), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Slate Blue", function() {
  colour = new RGB(72, 61, 139);
  equal(colour.hex(), "#483d8b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(248.461538461538, 0.56115107913669, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(248.461538461538, 0.39, 0.392156862745098), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Slate Blue", function() {
  colour = new RGB(123, 104, 238);
  equal(colour.hex(), "#7b68ee", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(248.507462686567, 0.563025210084034, 0.933333333333333), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(248.507462686567, 0.797619047619048, 0.670588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Ghost White", function() {
  colour = new RGB(248, 248, 255);
  equal(colour.hex(), "#f8f8ff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 0.0274509803921569, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 1, 0.986274509803922), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lavender", function() {
  colour = new RGB(230, 230, 250);
  equal(colour.hex(), "#e6e6fa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 0.08, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 0.666666666666666, 0.941176470588235), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Midnight Blue", function() {
  colour = new RGB(25, 25, 112);
  equal(colour.hex(), "#191970", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 0.776785714285714, 0.43921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 0.635036496350365, 0.268627450980392), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Blue", function() {
  colour = new RGB(0, 0, 255);
  equal(colour.hex(), "#0000ff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Blue", function() {
  colour = new RGB(0, 0, 205);
  equal(colour.hex(), "#0000cd", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 1, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 1, 0.401960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Blue", function() {
  colour = new RGB(0, 0, 139);
  equal(colour.hex(), "#00008b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 1, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 1, 0.272549019607843), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Navy", function() {
  colour = new RGB(0, 0, 128);
  equal(colour.hex(), "#000080", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(240, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(240, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Royal Blue", function() {
  colour = new RGB(65, 105, 225);
  equal(colour.hex(), "#4169e1", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(225, 0.711111111111111, 0.882352941176471), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(225, 0.727272727272727, 0.568627450980392), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Cornflower Blue", function() {
  colour = new RGB(100, 149, 237);
  equal(colour.hex(), "#6495ed", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(218.540145985401, 0.578059071729958, 0.929411764705882), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(218.540145985401, 0.791907514450867, 0.66078431372549), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Steel Blue", function() {
  colour = new RGB(176, 196, 222);
  equal(colour.hex(), "#b0c4de", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(213.913043478261, 0.207207207207207, 0.870588235294118), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(213.913043478261, 0.410714285714286, 0.780392156862745), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Slate Gray", function() {
  colour = new RGB(119, 136, 153);
  equal(colour.hex(), "#778899", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(210, 0.222222222222222, 0.6), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(210, 0.142857142857143, 0.533333333333333), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Slate Gray", function() {
  colour = new RGB(112, 128, 144);
  equal(colour.hex(), "#708090", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(210, 0.222222222222222, 0.564705882352941), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(210, 0.125984251968504, 0.501960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dodger Blue", function() {
  colour = new RGB(30, 144, 255);
  equal(colour.hex(), "#1e90ff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(209.6, 0.882352941176471, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(209.6, 1, 0.558823529411765), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Alice Blue", function() {
  colour = new RGB(240, 248, 255);
  equal(colour.hex(), "#f0f8ff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(208, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(208, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Steel Blue", function() {
  colour = new RGB(70, 130, 180);
  equal(colour.hex(), "#4682b4", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(207.272727272727, 0.611111111111111, 0.705882352941176), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(207.272727272727, 0.44, 0.490196078431373), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Sky Blue", function() {
  colour = new RGB(135, 206, 250);
  equal(colour.hex(), "#87cefa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(202.95652173913, 0.46, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(202.95652173913, 0.92, 0.754901960784314), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Sky Blue", function() {
  colour = new RGB(135, 206, 235);
  equal(colour.hex(), "#87ceeb", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(197.4, 0.425531914893617, 0.92156862745098), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(197.4, 0.714285714285714, 0.725490196078431), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Deep Sky Blue", function() {
  colour = new RGB(0, 191, 255);
  equal(colour.hex(), "#00bfff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(195.058823529412, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(195.058823529412, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Blue", function() {
  colour = new RGB(173, 216, 230);
  equal(colour.hex(), "#add8e6", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(194.736842105263, 0.247826086956522, 0.901960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(194.736842105263, 0.532710280373832, 0.790196078431373), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Powder Blue", function() {
  colour = new RGB(176, 224, 230);
  equal(colour.hex(), "#b0e0e6", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(186.666666666667, 0.234782608695652, 0.901960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(186.666666666667, 0.519230769230769, 0.796078431372549), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Cadet Blue", function() {
  colour = new RGB(95, 158, 160);
  equal(colour.hex(), "#5f9ea0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(181.846153846154, 0.40625, 0.627450980392157), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(181.846153846154, 0.254901960784314, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Turquoise", function() {
  colour = new RGB(0, 206, 209);
  equal(colour.hex(), "#00ced1", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180.861244019139, 1, 0.819607843137255), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180.861244019139, 1, 0.409803921568627), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Azure", function() {
  colour = new RGB(240, 255, 255);
  equal(colour.hex(), "#f0ffff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Cyan", function() {
  colour = new RGB(224, 255, 255);
  equal(colour.hex(), "#e0ffff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 0.12156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 1, 0.93921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Pale Turquoise", function() {
  colour = new RGB(175, 238, 238);
  equal(colour.hex(), "#afeeee", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 0.264705882352941, 0.933333333333333), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 0.649484536082474, 0.809803921568627), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Slate Gray", function() {
  colour = new RGB(47, 79, 79);
  equal(colour.hex(), "#2f4f4f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 0.40506329113924, 0.309803921568627), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 0.253968253968254, 0.247058823529412), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Cyan", function() {
  colour = new RGB(0, 255, 255);
  equal(colour.hex(), "#00ffff", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Cyan", function() {
  colour = new RGB(0, 139, 139);
  equal(colour.hex(), "#008b8b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 1, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 1, 0.272549019607843), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Teal", function() {
  colour = new RGB(0, 128, 128);
  equal(colour.hex(), "#008080", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(180, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(180, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Turquoise", function() {
  colour = new RGB(72, 209, 204);
  equal(colour.hex(), "#48d1cc", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(177.810218978102, 0.655502392344498, 0.819607843137255), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(177.810218978102, 0.59825327510917, 0.550980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Sea Green", function() {
  colour = new RGB(32, 178, 170);
  equal(colour.hex(), "#20b2aa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(176.712328767123, 0.820224719101124, 0.698039215686274), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(176.712328767123, 0.695238095238095, 0.411764705882353), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Turquoise", function() {
  colour = new RGB(64, 224, 208);
  equal(colour.hex(), "#40e0d0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(174, 0.714285714285714, 0.87843137254902), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(174, 0.720720720720721, 0.564705882352941), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Aquamarine", function() {
  colour = new RGB(127, 205, 170);
  equal(colour.hex(), "#7fcdaa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(153.076923076923, 0.380487804878049, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(153.076923076923, 0.438202247191011, 0.650980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Aquamarine", function() {
  colour = new RGB(102, 205, 170);
  equal(colour.hex(), "#66cdaa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(159.611650485437, 0.502439024390244, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(159.611650485437, 0.507389162561577, 0.601960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Spring Green", function() {
  colour = new RGB(0, 250, 154);
  equal(colour.hex(), "#00fa9a", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(156.96, 1, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(156.96, 1, 0.490196078431373), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Mint Cream", function() {
  colour = new RGB(245, 255, 250);
  equal(colour.hex(), "#f5fffa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(150, 0.0392156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(150, 1, 0.980392156862745), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Spring Green", function() {
  colour = new RGB(0, 255, 127);
  equal(colour.hex(), "#00ff7f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(149.882352941176, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(149.882352941176, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Medium Sea Green", function() {
  colour = new RGB(60, 179, 113);
  equal(colour.hex(), "#3cb371", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(146.72268907563, 0.664804469273743, 0.701960784313725), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(146.72268907563, 0.497907949790795, 0.468627450980392), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Sea Green", function() {
  colour = new RGB(46, 139, 87);
  equal(colour.hex(), "#2e8b57", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(146.451612903226, 0.669064748201439, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(146.451612903226, 0.502702702702703, 0.362745098039216), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Honeydew", function() {
  colour = new RGB(240, 255, 240);
  equal(colour.hex(), "#f0fff0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Sea Green", function() {
  colour = new RGB(143, 188, 143);
  equal(colour.hex(), "#8fbc8f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.23936170212766, 0.737254901960784), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 0.251396648044693, 0.649019607843137), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Pale Green", function() {
  colour = new RGB(152, 251, 152);
  equal(colour.hex(), "#98fb98", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.394422310756972, 0.984313725490196), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 0.925233644859813, 0.790196078431373), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Green", function() {
  colour = new RGB(144, 238, 144);
  equal(colour.hex(), "#90ee90", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.394957983193277, 0.933333333333333), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 0.734375, 0.749019607843137), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Forest Green", function() {
  colour = new RGB(34, 139, 34);
  equal(colour.hex(), "#228b22", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.755395683453237, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 0.606936416184971, 0.33921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lime Green", function() {
  colour = new RGB(50, 205, 50);
  equal(colour.hex(), "#32cd32", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 0.75609756097561, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 0.607843137254902, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lime", function() {
  colour = new RGB(0, 255, 0);
  equal(colour.hex(), "#00ff00", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Green", function() {
  colour = new RGB(0, 128, 0);
  equal(colour.hex(), "#008000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Green", function() {
  colour = new RGB(0, 100, 0);
  equal(colour.hex(), "#006400", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(120, 1, 0.392156862745098), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(120, 1, 0.196078431372549), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lawn Green", function() {
  colour = new RGB(124, 252, 0);
  equal(colour.hex(), "#7cfc00", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(90.4761904761905, 1, 0.988235294117647), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(90.4761904761905, 1, 0.494117647058824), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Chartreuse", function() {
  colour = new RGB(127, 255, 0);
  equal(colour.hex(), "#7fff00", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(90.1176470588235, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(90.1176470588235, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Green Yellow", function() {
  colour = new RGB(173, 255, 47);
  equal(colour.hex(), "#adff2f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(83.6538461538462, 0.815686274509804, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(83.6538461538462, 1, 0.592156862745098), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Olive Green", function() {
  colour = new RGB(85, 107, 47);
  equal(colour.hex(), "#556b2f", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(82, 0.560747663551402, 0.419607843137255), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(82, 0.38961038961039, 0.301960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Yellow Green", function() {
  colour = new RGB(154, 205, 50);
  equal(colour.hex(), "#9acd32", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(79.741935483871, 0.75609756097561, 0.803921568627451), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(79.741935483871, 0.607843137254902, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Olive Drab", function() {
  colour = new RGB(107, 142, 35);
  equal(colour.hex(), "#6b8e23", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(79.6261682242991, 0.753521126760563, 0.556862745098039), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(79.6261682242991, 0.604519774011299, 0.347058823529412), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Ivory", function() {
  colour = new RGB(255, 255, 240);
  equal(colour.hex(), "#fffff0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Beige", function() {
  colour = new RGB(245, 245, 220);
  equal(colour.hex(), "#f5f5dc", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 0.102040816326531, 0.96078431372549), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 0.555555555555556, 0.911764705882353), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Yellow", function() {
  colour = new RGB(255, 255, 224);
  equal(colour.hex(), "#ffffe0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 0.12156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 1, 0.93921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Goldenrod Yellow", function() {
  colour = new RGB(250, 250, 210);
  equal(colour.hex(), "#fafad2", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 0.16, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 0.799999999999999, 0.901960784313725), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Yellow", function() {
  colour = new RGB(255, 255, 0);
  equal(colour.hex(), "#ffff00", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Olive", function() {
  colour = new RGB(128, 128, 0);
  equal(colour.hex(), "#808000", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(60, 1, 0.501960784313726), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(60, 1, 0.250980392156863), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Khaki", function() {
  colour = new RGB(189, 183, 107);
  equal(colour.hex(), "#bdb76b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(55.609756097561, 0.433862433862434, 0.741176470588235), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(55.609756097561, 0.383177570093458, 0.580392156862745), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Pale Goldenrod", function() {
  colour = new RGB(238, 232, 170);
  equal(colour.hex(), "#eee8aa", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(54.7058823529412, 0.285714285714286, 0.933333333333333), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(54.7058823529412, 0.666666666666667, 0.8), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Lemon Chiffon", function() {
  colour = new RGB(255, 250, 205);
  equal(colour.hex(), "#fffacd", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(54, 0.196078431372549, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(54, 1, 0.901960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Khaki", function() {
  colour = new RGB(240, 230, 140);
  equal(colour.hex(), "#f0e68c", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(54, 0.416666666666667, 0.941176470588235), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(54, 0.769230769230769, 0.745098039215686), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Cornsilk", function() {
  colour = new RGB(255, 248, 220);
  equal(colour.hex(), "#fff8dc", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(48, 0.137254901960784, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(48, 1, 0.931372549019608), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Goldenrod", function() {
  colour = new RGB(218, 165, 32);
  equal(colour.hex(), "#daa520", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(42.9032258064516, 0.853211009174312, 0.854901960784314), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(42.9032258064516, 0.744, 0.490196078431373), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Goldenrod", function() {
  colour = new RGB(184, 134, 11);
  equal(colour.hex(), "#b8860b", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(42.6589595375723, 0.940217391304348, 0.72156862745098), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(42.6589595375723, 0.887179487179487, 0.382352941176471), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Floral White", function() {
  colour = new RGB(255, 250, 240);
  equal(colour.hex(), "#fffaf0", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(40, 0.0588235294117647, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(40, 1, 0.970588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Old Lace", function() {
  colour = new RGB(253, 245, 230);
  equal(colour.hex(), "#fdf5e6", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(39.1304347826087, 0.0909090909090909, 0.992156862745098), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(39.1304347826087, 0.851851851851851, 0.947058823529412), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Wheat", function() {
  colour = new RGB(245, 222, 179);
  equal(colour.hex(), "#f5deb3", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(39.0909090909091, 0.269387755102041, 0.96078431372549), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(39.0909090909091, 0.767441860465116, 0.831372549019608), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Orange", function() {
  colour = new RGB(255, 165, 0);
  equal(colour.hex(), "#ffa500", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(38.8235294117647, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(38.8235294117647, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Moccasin", function() {
  colour = new RGB(255, 228, 181);
  equal(colour.hex(), "#ffe4b5", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(38.1081081081081, 0.290196078431372, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(38.1081081081081, 1, 0.854901960784314), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Papaya Whip", function() {
  colour = new RGB(255, 239, 213);
  equal(colour.hex(), "#ffefd5", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(37.1428571428571, 0.164705882352941, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(37.1428571428571, 1, 0.917647058823529), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Blanched Almond", function() {
  colour = new RGB(255, 235, 205);
  equal(colour.hex(), "#ffebcd", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(36, 0.196078431372549, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(36, 1, 0.901960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Navajo White", function() {
  colour = new RGB(255, 222, 173);
  equal(colour.hex(), "#ffdead", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(35.8536585365854, 0.32156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(35.8536585365854, 1, 0.83921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Antique White", function() {
  colour = new RGB(250, 235, 215);
  equal(colour.hex(), "#faebd7", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(34.2857142857143, 0.14, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(34.2857142857143, 0.777777777777777, 0.911764705882353), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Burlywood", function() {
  colour = new RGB(222, 184, 135);
  equal(colour.hex(), "#deb887", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(33.7931034482759, 0.391891891891892, 0.870588235294118), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(33.7931034482759, 0.568627450980392, 0.7), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Orange", function() {
  colour = new RGB(255, 140, 0);
  equal(colour.hex(), "#ff8c00", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(32.9411764705882, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(32.9411764705882, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Bisque", function() {
  colour = new RGB(255, 228, 196);
  equal(colour.hex(), "#ffe4c4", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(32.5423728813559, 0.231372549019608, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(32.5423728813559, 1, 0.884313725490196), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Linen", function() {
  colour = new RGB(250, 240, 230);
  equal(colour.hex(), "#faf0e6", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(30, 0.08, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(30, 0.666666666666666, 0.941176470588235), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Peach Puff", function() {
  colour = new RGB(255, 218, 185);
  equal(colour.hex(), "#ffdab9", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(28.2857142857143, 0.274509803921569, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(28.2857142857143, 1, 0.862745098039216), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Sandy Brown", function() {
  colour = new RGB(244, 164, 96);
  equal(colour.hex(), "#f4a460", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(27.5675675675676, 0.60655737704918, 0.956862745098039), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(27.5675675675676, 0.870588235294118, 0.666666666666667), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Seashell", function() {
  colour = new RGB(255, 245, 238);
  equal(colour.hex(), "#fff5ee", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(24.7058823529412, 0.0666666666666667, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(24.7058823529412, 1, 0.966666666666667), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Chocolate", function() {
  colour = new RGB(210, 105, 30);
  equal(colour.hex(), "#d2691e", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(25, 0.857142857142857, 0.823529411764706), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(25, 0.75, 0.470588235294118), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Saddle Brown", function() {
  colour = new RGB(139, 69, 19);
  equal(colour.hex(), "#8b4513", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(25, 0.863309352517986, 0.545098039215686), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(25, 0.759493670886076, 0.309803921568627), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Sienna", function() {
  colour = new RGB(160, 82, 45);
  equal(colour.hex(), "#a0522d", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(19.304347826087, 0.71875, 0.627450980392157), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(19.304347826087, 0.560975609756097, 0.401960784313726), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Light Salmon", function() {
  colour = new RGB(255, 160, 122);
  equal(colour.hex(), "#ffa07a", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(17.1428571428571, 0.52156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(17.1428571428571, 1, 0.73921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Coral", function() {
  colour = new RGB(255, 127, 80);
  equal(colour.hex(), "#ff7f50", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(16.1142857142857, 0.686274509803922, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(16.1142857142857, 1, 0.656862745098039), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Orange Red", function() {
  colour = new RGB(255, 69, 0);
  equal(colour.hex(), "#ff4500", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(16.2352941176471, 1, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(16.2352941176471, 1, 0.5), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Dark Salmon", function() {
  colour = new RGB(233, 150, 122);
  equal(colour.hex(), "#e9967a", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(15.1351351351351, 0.476394849785408, 0.913725490196078), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(15.1351351351351, 0.716129032258064, 0.696078431372549), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Tomato", function() {
  colour = new RGB(255, 99, 71);
  equal(colour.hex(), "#ff6347", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(9.1304347826087, 0.72156862745098, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(9.1304347826087, 1, 0.63921568627451), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Misty Rose", function() {
  colour = new RGB(255, 228, 225);
  equal(colour.hex(), "#ffe4e1", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(6, 0.117647058823529, 1), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(6, 1, 0.941176470588235), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

test("Salmon", function() {
  colour = new RGB(250, 128, 114);
  equal(colour.hex(), "#fa8072", "Hex value");
  hsbEqual(colour.toHSB(), new HSB(6.17647058823529, 0.544, 0.980392156862745), "HSB conversion");
  rgbEqual(colour.toHSB().toRGB(), colour, "HSB conversion and back again");
  hslEqual(colour.toHSL(), new HSL(6.17647058823529, 0.931506849315068, 0.713725490196078), "HSL conversion");
  rgbEqual(colour.toHSL().toRGB(), colour, "HSL conversion and back again");
});

// Rounding

test("Values with a fraction below 0.5 are rounded down", function() {
  colour = new RGB(red = 100.25, green = 100.25, blue = 100.25);
  equals(colour.red, Math.round(red), "Red value rounded down");
  equals(colour.green, Math.round(green), "Green value rounded down");
  equals(colour.blue, Math.round(blue), "Blue value rounded down");
})

test("Values with a fraction on or above 0.5 are rounded up", function() {
  colour = new RGB(red = 100.5, green = 100.5, blue = 100.5);
  equals(colour.red, Math.round(red), "Red value rounded up");
  equals(colour.green, Math.round(green), "Green value rounded up");
  equals(colour.blue, Math.round(blue), "Blue value rounded up");
})
