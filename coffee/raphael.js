var Element, HSB, HSL, Paper, RGB, Raphael, Set, _a, _b, _c, _d, _e, _f, addEvent, along, animation, animationElements, createNode, drag, dragMove, dragUp, functionCacher, getLengthFactory, getPointAtLength, getPointAtSegmentLength, getSubpathsAtLength, getTotalLength, preventDefault, preventTouch, segmentLength, stopPropagation, stopTouch, upto255;
var __hasProp = Object.prototype.hasOwnProperty;
/*
Raphael 1.4.7 - JavaScript Vector Library

Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
CoffeeScript conversion by Paul Gillard
Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
functionCacher = function(expensiveFunction, scope, postprocessor) {
  var cachedFunction;
  cachedFunction = function() {
    var arg, args, cache, count;
    arg = Array.prototype.slice.call(arguments, 0);
    args = arg.join("\u25ba");
    cache = (cachedFunction.cache = cachedFunction.cache || {});
    count = (cachedFunction.count = cachedFunction.count || []);
    if (cache.hasOwnProperty(args)) {
      if ((typeof postprocessor !== "undefined" && postprocessor !== null)) {
        return postprocessor(cache[args]);
      } else {
        return cache[args];
      }
    }
    if (count.length >= 1000) {
      delete cache[count.shift()];
    }
    count.push(args);
    cache[args] = expensiveFunction.apply(scope, arg);
    if ((typeof postprocessor !== "undefined" && postprocessor !== null)) {
      return postprocessor(cache[args]);
    } else {
      return cache[args];
    }
  };
  return cachedFunction;
};
Raphael = function() {};
Raphael.version = '1.4.7';
Raphael.hsrg = {
  hs: 1,
  rg: 1
};
Raphael.events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "orientationchange", "touchcancel", "gesturestart", "gesturechange", "gestureend"];
Raphael._oid = 0;
Raphael._id = 0;
Raphael.availableAttrs = {
  blur: 0,
  "clip-rect": "0 0 1e9 1e9",
  cursor: "default",
  cx: 0,
  cy: 0,
  fill: "#fff",
  "fill-opacity": 1,
  font: '10px "Arial"',
  "font-family": '"Arial"',
  "font-size": "10",
  "font-style": "normal",
  "font-weight": 400,
  gradient: 0,
  height: 0,
  href: "http://raphaeljs.com/",
  opacity: 1,
  path: "M0,0",
  r: 0,
  rotation: 0,
  rx: 0,
  ry: 0,
  scale: "1 1",
  src: "",
  stroke: "#000",
  "stroke-dasharray": "",
  "stroke-linecap": "butt",
  "stroke-linejoin": "butt",
  "stroke-miterlimit": 0,
  "stroke-opacity": 1,
  "stroke-width": 1,
  target: "_blank",
  "text-anchor": "middle",
  title: "Raphael",
  translation: "0 0",
  width: 0,
  x: 0,
  y: 0
};
Raphael.availableAnimAttrs = {
  along: "along",
  blur: "number",
  "clip-rect": "csv",
  cx: "number",
  cy: "number",
  fill: "colour",
  "fill-opacity": "number",
  "font-size": "number",
  height: "number",
  opacity: "number",
  path: "path",
  r: "number",
  rotation: "csv",
  rx: "number",
  ry: "number",
  scale: "csv",
  stroke: "colour",
  "stroke-opacity": "number",
  "stroke-width": "number",
  translation: "csv",
  width: "number",
  x: "number",
  y: "number"
};
Raphael.prototype.userAgentSupportsSVG = function() {
  var _a;
  return (typeof (_a = window.SVGAngle) !== "undefined" && _a !== null) || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
};
Raphael.prototype.type = function() {
  return this.userAgentType = (typeof this.userAgentType !== "undefined" && this.userAgentType !== null) ? this.userAgentType : this.userAgentSupportsSVG() ? "SVG" : "VML";
};
Raphael.prototype.is = function(object, type) {
  ({
    type: String.prototype.toLowerCase.call(type)
  });
  return (type === "object" && object === Object(object)) || (type === "undefined" && typeof object === type) || (type === "null" && object === null) || (type === "array" && Array.isArray && Array.isArray(object)) || String.prototype.toLowerCase.call(Object.prototype.toString.call(object).slice(8, -1)) === type;
};
Raphael.prototype.toHex = function(colour) {
  var i, range, temporaryBody, temporaryDocument, value;
  if (this.type() === "VML") {
    colour = String(colour).replace(/^\s+|\s+$/g, "");
    try {
      temporaryDocument = new window.ActiveXObject("htmlfile");
      temporaryDocument.write("<" + "body>");
      temporaryDocument.close();
      temporaryBody = temporaryDocument.body;
    } catch (error) {
      temporaryBody = window.createPopup().document.body;
    }
    range = temporaryBody.createTextRange();
    try {
      temporaryBody.style.color = colour;
      value = range.queryCommandValue("ForeColor");
      value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
      return "#" + ("000000" + value.toString(16)).slice(-6);
    } catch (error) {
      return "none";
    }
  } else {
    i = document.createElement("i");
    i.title = "Rapha\xebl Colour Picker";
    i.style.display = "none";
    document.body.appendChild(i);
    i.style.color = colour;
    return document.defaultView.getComputedStyle(i, "").getPropertyValue("color");
  }
};
Raphael.prototype.getRGB = function(colour) {
  var colourRegExp, commaSpaces, red, rgb, rgbo, t;
  if (!colour || !!((colour = String(colour)).indexOf("-") + 1)) {
    return new RGB(-1, -1, -1).error();
  }
  if (colour === "none") {
    return new RGB(-1, -1, -1);
  }
  !(Raphael.hsrg.hasOwnProperty(colour.substring(0, 2)) || colour.charAt() === "#") && (colour = this.toHex(colour));
  colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%)?)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i;
  commaSpaces = /\s*,\s*/;
  rgb = colour.match(colourRegExp);
  if ((typeof rgb !== "undefined" && rgb !== null)) {
    if (rgb[2]) {
      return new RGB(parseInt(rgb[2].substring(1, 3), 16), parseInt(rgb[2].substring(3, 5), 16), parseInt(rgb[2].substring(5), 16));
    }
    if (rgb[3]) {
      return new RGB(parseInt((t = rgb[3].charAt(1)) + t, 16), parseInt((t = rgb[3].charAt(2)) + t, 16), parseInt((t = rgb[3].charAt(3)) + t, 16));
    }
    if (rgb[4]) {
      rgbo = rgb[4].split(commaSpaces);
      return new RGB(parseFloat(rgbo[0]), parseFloat(rgbo[1]), parseFloat(rgbo[2]), parseFloat(rgbo[3]));
    }
    if (rgb[5]) {
      rgbo = rgb[5].split(commaSpaces);
      return new RGB(parseFloat(rgbo[0]) * 2.55, parseFloat(rgbo[1]) * 2.55, parseFloat(rgbo[2]) * 2.55, parseFloat(rgbo[3]));
    }
    if (rgb[6]) {
      rgb = rgb[6].split(commaSpaces);
      red = parseFloat(rgb[0]);
      (rgb[0].slice(-3) === "deg" || rgb[0].slice(-1) === "\xb0") && (red /= 360);
      return new HSB(red, parseFloat(rgb[1]), parseFloat(rgb[2])).toRGB();
    }
    if (rgb[7]) {
      rgb = rgb[7].split(commaSpaces);
      red = parseFloat(rgb[0]) * 2.55;
      (rgb[0].slice(-3) === "deg" || rgb[0].slice(-1) === "\xb0") && (red /= 360 * 2.55);
      return new HSB(red, parseFloat(rgb[1]) * 2.55, parseFloat(rgb[2]) * 2.55).toRGB();
    }
    if (rgb[8]) {
      rgb = rgb[8].split(commaSpaces);
      red = parseFloat(rgb[0]);
      (rgb[0].slice(-3) === "deg" || rgb[0].slice(-1) === "\xb0") && (red /= 360);
      return new HSL(red, parseFloat(rgb[1]), parseFloat(rgb[2])).toRGB();
    }
    if (rgb[9]) {
      rgb = rgb[9].split(commaSpaces);
      red = parseFloat(rgb[0]) * 2.55;
      (rgb[0].slice(-3) === "deg" || rgb[0].slice(-1) === "\xb0") && (red /= 360 * 2.55);
      return new HSL(red, parseFloat(rgb[1]) * 2.55, parseFloat(rgb[2]) * 2.55).toRGB();
    }
  }
  return new RGB(-1, -1, -1).error();
};
Raphael.prototype._path2string = function() {
  return this.join(",").replace(/,?([achlmqrstvxz]),?/gi, "$1");
};
Raphael.pathCommand = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig;
Raphael.pathValues = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
Raphael.prototype.parsePathString = function(pathString) {
  var data, paramCounts;
  if (!(typeof pathString !== "undefined" && pathString !== null)) {
    return null;
  }
  paramCounts = {
    a: 7,
    c: 6,
    h: 1,
    l: 2,
    m: 2,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    z: 0
  };
  data = [];
  if (this.is(pathString, "array") && this.is(pathString[0], "array")) {
    data = this.pathClone(pathString);
  };
  if (!data.length) {
    String(pathString).replace(Raphael.pathCommand, (function(a, b, c) {
      var _a, name, params;
      params = [];
      name = String.prototype.toLowerCase.call(b);
      c.replace(Raphael.pathValues, (function(a, b) {
        return b && params.push(+b);
      }));
      if (name === "m" && params.length > 2) {
        data.push([b].concat(params.splice(0, 2)));
        name = "1";
        b = b === "m" ? "l" : "L";
      }
      _a = [];
      while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));
        if (!paramCounts[name]) {
          break;
        }
      }
      return _a;
    }));
  };
  data.toString = this._path2string;
  return data;
};
Raphael.prototype.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  var alpha, ax, ay, cx, cy, mx, my, nx, ny, t1, x, y;
  t1 = 1 - t;
  x = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x;
  y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y;
  mx = p1x + 2 * t * (c1x - p1x) + t * t * (c2x - 2 * c1x + p1x);
  my = p1y + 2 * t * (c1y - p1y) + t * t * (c2y - 2 * c1y + p1y);
  nx = c1x + 2 * t * (c2x - c1x) + t * t * (p2x - 2 * c2x + c1x);
  ny = c1y + 2 * t * (c2y - c1y) + t * t * (p2y - 2 * c2y + c1y);
  ax = (1 - t) * p1x + t * c1x;
  ay = (1 - t) * p1y + t * c1y;
  cx = (1 - t) * c2x + t * p2x;
  cy = (1 - t) * c2y + t * p2y;
  alpha = (90 - Math.atan((mx - nx) / (my - ny)) * 180 / Math.PI);
  return {
    x: x,
    y: y,
    m: {
      x: mx,
      y: my
    },
    n: {
      x: nx,
      y: ny
    },
    start: {
      x: ax,
      y: ay
    },
    end: {
      x: cx,
      y: cy
    },
    alpha: alpha
  };
};
Raphael.prototype.pathDimensions = function(path) {
  var X, Y, _a, _b, _c, dim, p, x, xmin, y, ymin;
  if ((typeof path !== "undefined" && path !== null)) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
  path = path2Curve(path);
  x = (y = 0);
  X = (Y = []);
  _b = path;
  for (_a = 0, _c = _b.length; _a < _c; _a++) {
    p = _b[_a];
    if (p[0] === "M") {
      x = p[1];
      y = p[2];
      X.push(x);
      Y.push(y);
    } else {
      dim = curveDimensions(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
      X = X.concat(dim.min.x, dim.max.x);
      Y = Y.concat(dim.min.y, dim.max.y);
      x = p[5];
      y = p[6];
    }
  }
  xmin = Math.min.apply(0, X);
  ymin = Math.min.apply(0, Y);
  return {
    x: xmin,
    y: ymin,
    width: Math.max.apply(0, X) - xmin,
    height: Math.max.apply(0, Y) - ymin
  };
};
Raphael.prototype.pathClone = function(pathArray) {
  var _a, _b, _c, _d, _e, _f, i, j, path, pathItem, res;
  res = [];
  if ((!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array"))) {
    pathArray = Raphael.parsePathString(pathArray);
  };
  i = -1;
  _b = pathArray;
  for (_a = 0, _c = _b.length; _a < _c; _a++) {
    path = _b[_a];
    res[++i] = [];
    j = -1;
    _e = path;
    for (_d = 0, _f = _e.length; _d < _f; _d++) {
      pathItem = _e[_d];
      res[i][++j] = pathItem;
    }
  }
  res.toString = this._path2string;
  return res;
};
Raphael.prototype.pathToRelative = function(pathArray) {
  var _a, _b, i, j, k, len, mx, my, path, r, res, start, x, y;
  if ((!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array"))) {
    pathArray = Raphael.parsePathString(pathArray);
  };
  res = [];
  x = (y = (mx = (my = (start = 0))));
  if (pathArray[0][0] === "M") {
    mx = (x = pathArray[0][1]);
    my = (y = pathArray[0][2]);
    start++;
    res.push(["M", x, y]);
  }
  for (i = start; (start <= pathArray.length - 1 ? i <= pathArray.length - 1 : i >= pathArray.length - 1); (start <= pathArray.length - 1 ? i += 1 : i -= 1)) {
    r = (res[i] = []);
    path = pathArray[i];
    if (path[0] !== String.prototype.toLowerCase.call(path[0])) {
      r[0] = String.prototype.toLowerCase.call(path[0]);
      if ((_a = r[0]) === "a") {
        r[1] = path[1];
        r[2] = path[2];
        r[3] = path[3];
        r[4] = path[4];
        r[5] = path[5];
        r[6] = +(path[6] - x).toFixed(3);
        r[7] = +(path[7] - y).toFixed(3);
      } else if (_a === "v") {
        r[1] = +(path[1] - y).toFixed(3);
      } else if (_a === "m") {
        mx = path[1];
        my = path[2];
      } else {
        for (j = 1; (1 <= path.length - 1 ? j <= path.length - 1 : j >= path.length - 1); (1 <= path.length - 1 ? j += 1 : j -= 1)) {
          r[j] = +(path[j] - (j % 2 ? x : y)).toFixed(3);
        }
      }
    } else {
      if (path[0] === "m") {
        mx = path[1] + x;
        my = path[2] + y;
      }
      for (k = 0; (0 <= path.length - 1 ? k <= path.length - 1 : k >= path.length - 1); (0 <= path.length - 1 ? k += 1 : k -= 1)) {
        res[i][k] = path[k];
      }
    }
    len = res[i].length;
    if ((_b = res[i][0]) === "z") {
      x = mx;
      y = my;
    } else if (_b === "h") {
      x += +res[i][len - 1];
    } else if (_b === "v") {
      y += +res[i][len - 1];
    } else {
      x += +res[i][len - 2];
      y += +res[i][len - 1];
    }
  }
  res.toString = this._path2string;
  return res;
};
Raphael.prototype.pathToAbsolute = function(pathArray) {
  var _a, _b, i, j, k, len, mx, my, path, r, res, start, x, y;
  if ((!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array"))) {
    pathArray = Raphael.parsePathString(pathArray);
  };
  res = [];
  x = (y = (mx = (my = (start = 0))));
  if (pathArray[0][0] === "M") {
    mx = (x = +pathArray[0][1]);
    my = (y = +pathArray[0][2]);
    start++;
    res[0] = ["M", x, y];
  }
  for (i = start; (start <= pathArray.length - 1 ? i <= pathArray.length - 1 : i >= pathArray.length - 1); (start <= pathArray.length - 1 ? i += 1 : i -= 1)) {
    r = (res[i] = []);
    path = pathArray[i];
    if (path[0] !== String.prototype.toUpperCase.call(path[0])) {
      r[0] = String.prototype.toUpperCase.call(path[0]);
      if ((_a = r[0]) === "A") {
        r[1] = path[1];
        r[2] = path[2];
        r[3] = path[3];
        r[4] = path[4];
        r[5] = path[5];
        r[6] = +(path[6] + x);
        r[7] = +(path[7] + y);
      } else if (_a === "V") {
        r[1] = +(path[1] + y);
      } else if (_a === "H") {
        r[1] = +(path[1] + x);
      } else if (_a === "M") {
        mx = +path[1] + x;
        my = +path[2] + y;
      } else {
        for (j = 1; (1 <= path.length - 1 ? j <= path.length - 1 : j >= path.length - 1); (1 <= path.length - 1 ? j += 1 : j -= 1)) {
          r[j] = +path[j] + (j % 2 ? x : y);
        }
      }
    } else {
      for (k = 0; (0 <= path.length - 1 ? k <= path.length - 1 : k >= path.length - 1); (0 <= path.length - 1 ? k += 1 : k -= 1)) {
        res[i][k] = path[k];
      }
    }
    len = res[i].length;
    if ((_b = r[0]) === "Z") {
      x = mx;
      y = my;
    } else if (_b === "H") {
      x = r[1];
    } else if (_b === "V") {
      y = r[1];
    } else if (_b === "M") {
      mx = res[i][len - 2];
      my = res[i][len - 1];
    } else {
      x = res[i][len - 2];
      y = res[i][len - 1];
    }
  }
  res.toString = this._path2string;
  return res;
};
Raphael.prototype.lineToCurve = function(x1, y1, x2, y2) {
  return [x1, y1, x2, y2, x2, y2];
};
Raphael.prototype.quadraticToCurve = function(x1, y1, ax, ay, x2, y2) {
  return [1 / 3 * x1 + 2 / 3 * ax, 1 / 3 * y1 + 2 / 3 * ay, 1 / 3 * x2 + 2 / 3 * ax, 1 / 3 * y2 + 2 / 3 * ay, x2, y2];
};
Raphael.prototype.arcToCurve = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
  var PI, _120, c1, c2, cos, cx, cy, df, f1, f2, f2old, h, hx, hy, i, k, m1, m2, m3, m4, newres, rad, res, rx2, ry2, s1, s2, sin, t, x, x2old, xy, y, y2old;
  PI = Math.PI;
  _120 = PI * 120 / 180;
  rad = PI / 180 * (+angle || 0);
  res = [];
  ({
    rotate: function(x, y, rad) {
      var X, Y;
      X = x * Math.cos(rad) - y * Math.sin(rad);
      Y = x * Math.sin(rad) + y * Math.cos(rad);
      return {
        x: X,
        y: Y
      };
    }
  });
  if (!recursive) {
    xy = rotate(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotate(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;
    cos = Math.cos(PI / 180 * angle);
    sin = Math.sin(PI / 180 * angle);
    x = (x1 - x2) / 2;
    y = (y1 - y2) / 2;
    h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
    if (h > 1) {
      h = Math.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }
    rx2 = rx * rx;
    ry2 = ry * ry;
    k = (large_arc_flag === sweep_flag ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry).toFixed(7));
    f2 = Math.asin(((y2 - cy) / ry).toFixed(7));
    f1 = x1 < cx ? PI - f1 : f1;
    f2 = x2 < cx ? PI - f2 : f2;
    if (f1 < 0) {
      f1 = PI * 2 + f1;
    };
    if (f2 < 0) {
      f2 = PI * 2 + f2;
    };
    if (sweep_flag && f1 > f2) {
      f1 = f1 - PI * 2;
    };
    if (!sweep_flag && f2 > f1) {
      f2 = f2 - PI * 2;
    };
  } else {
    f1 = recursive[0];
    f2 = recursive[1];
    cx = recursive[2];
    cy = recursive[3];
  }
  df = f2 - f1;
  if (Math.abs(df) > _120) {
    f2old = f2;
    x2old = x2;
    y2old = y2;
    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = arcToCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  c1 = Math.cos(f1);
  s1 = Math.sin(f1);
  c2 = Math.cos(f2);
  s2 = Math.sin(f2);
  t = Math.tan(df / 4);
  hx = 4 / 3 * rx * t;
  hy = 4 / 3 * ry * t;
  m1 = [x1, y1];
  m2 = [x1 + hx * s1, y1 - hy * c1];
  m3 = [x2 + hx * s2, y2 - hy * c2];
  m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return [m2, m3, m4].concat(res);
  } else {
    res = [m2, m3, m4].concat(res).join().split(",");
    newres = [];
    for (i = 0; (0 <= res.length - 1 ? i <= res.length - 1 : i >= res.length - 1); (0 <= res.length - 1 ? i += 1 : i -= 1)) {
      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
    }
    return newres;
  }
};
Raphael.prototype.findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  var X, Y, t1;
  t1 = 1 - t;
  X = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x;
  Y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y;
  return {
    x: X,
    y: Y
  };
};
Raphael.prototype.curveDimensions = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
  var a, b, c, dot, t1, t2, x, y;
  a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x);
  b = 2 * (c1x - p1x) - 2 * (c2x - c1x);
  c = p1x - c1x;
  t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
  t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
  y = [p1y, p2y];
  x = [p1x, p2x];
  if (Math.abs(t1) > 1e12) {
    t1 = 0.5;
  }
  if (Math.abs(t2) > 1e12) {
    t2 = 0.5;
  }
  if (t1 > 0 && t1 < 1) {
    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
    x.push(dot.x);
    y.push(dot.y);
  }
  if (t2 > 0 && t2 < 1) {
    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
    x.push(dot.x);
    y.push(dot.y);
  }
  a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
  b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
  c = p1y - c1y;
  t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
  t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
  if (Math.abs(t1) > 1e12) {
    t1 = 0.5;
  }
  if (Math.abs(t2) > 1e12) {
    t2 = 0.5;
  }
  if (t1 > 0 && t1 < 1) {
    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
    x.push(dot.x);
    y.push(dot.y);
  }
  if (t2 > 0 && t2 < 1) {
    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
    x.push(dot.x);
    y.push(dot.y);
  }
  return {
    min: {
      x: Math.min.apply(0, x),
      y: Math.min.apply(0, y)
    },
    max: {
      x: Math.max.apply(0, x),
      y: Math.max.apply(0, y)
    },
    pathToCurve: function(path, path2) {
      var _a, attrs, attrs2, fixArc, fixM, i, p, p2, processPath, seg, seg2, seg2len, seglen;
      p = pathToAbsolute(path);
      if ((typeof path2 !== "undefined" && path2 !== null)) {
        p2 = pathToAbsolute(path2);
      }
      attrs = {
        x: 0,
        y: 0,
        bx: 0,
        by: 0,
        X: 0,
        Y: 0,
        qx: null,
        qy: null
      };
      attrs2 = {
        x: 0,
        y: 0,
        bx: 0,
        by: 0,
        X: 0,
        Y: 0,
        qx: null,
        qy: null
      };
      processPath = function(path, d) {
        var _a, _b, _c, _d, _e, nx, ny;
        if (!path) {
          return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        if (!((function(){ (_a = path[0]); for (var _c=0, _d=(_b = {
          T: 1,
          Q: 1
        }).length; _c<_d; _c++) { if (_b[_c] === _a) return true; } return false; }).call(this))) {
          d.qx = (d.qy = null);
        }
        if ((_e = path[0]) === "M") {
          d.X = path[1];
          d.Y = path[2];
          return path;
        } else if (_e === "A") {
          return ["C"].concat(arcToCurve.apply(0, [d.x, d.y].concat(path.slice(1))));
        } else if (_e === "S") {
          nx = d.x + (d.x - (d.bx || d.x));
          ny = d.y + (d.y - (d.by || d.y));
          return ["C", nx, ny].concat(path.slice(1));
        } else if (_e === "T") {
          d.qx = d.x + (d.x - (d.qx || d.x));
          d.qy = d.y + (d.y - (d.qy || d.y));
          return ["C"].concat(quadraticToCurve(d.x, d.y, d.qx, d.qy, path[1], path[2]));
        } else if (_e === "Q") {
          d.qx = path[1];
          d.qy = path[2];
          return ["C"].concat(quadraticToCurve(d.x, d.y, path[1], path[2], path[3], path[4]));
        } else if (_e === "L") {
          return ["C"].concat(lineToCurve(d.x, d.y, path[1], path[2]));
        } else if (_e === "H") {
          return ["C"].concat(lineToCurve(d.x, d.y, path[1], d.y));
        } else if (_e === "V") {
          return ["C"].concat(lineToCurve(d.x, d.y, d.x, path[1]));
        } else if (_e === "Z") {
          return ["C"].concat(lineToCurve(d.x, d.y, d.X, d.Y));
        }
      };
      fixArc = function(pp, i) {
        var ii, pi;
        if (pp[i].length > 7) {
          pp[i].shift();
          pi = pp[i];
          while (pi.length) {
            pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
          }
          pp.splice(i, 1);
          return (ii = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0));
        }
      };
      fixM = function(path1, path2, a1, a2, i) {
        var ii;
        if ((typeof path1 !== "undefined" && path1 !== null) && (typeof path2 !== "undefined" && path2 !== null) && path1[i][0] === "M" && path2[i][0] !== "M") {
          path2.splice(i, 0, ["M", a2.x, a2.y]);
          a1.bx = 0;
          a1.by = 0;
          a1.x = path1[i][1];
          a1.y = path1[i][2];
          return (ii = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0));
        }
      };
      _a = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0);
      for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
        p[i] = processPath(p[i], attrs);
        fixArc(p, i);
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          p2[i] = processPath(p2[i], attrs2);
        }
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          fixArc(p2, i);
        }
        fixM(p, p2, attrs, attrs2, i);
        fixM(p2, p, attrs2, attrs, i);
        seg = p[i];
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          seg2 = p2[i];
        }
        seglen = seg.length;
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          seg2len = seg2.length;
        }
        attrs.x = seg[seglen - 2];
        attrs.y = seg[seglen - 1];
        attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
        attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          attrs2.bx = parseFloat(seg2[seg2len - 4]) || attrs2.x;
        }
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          attrs2.by = parseFloat(seg2[seg2len - 3]) || attrs2.y;
        }
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          attrs2.x = seg2[seg2len - 2];
        }
        if ((typeof p2 !== "undefined" && p2 !== null)) {
          attrs2.y = seg2[seg2len - 1];
        }
      }
      return (typeof p2 !== "undefined" && p2 !== null) ? [p, p2] : p;
    },
    parseDots: function(gradient) {
      var _a, _b, d, dots, end, i, j, k, par, start;
      dots = [];
      _a = gradient.length;
      for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
        dot = {};
        par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
        dot.color = Raphael.getRGB(par[1]);
        if ((dot.color.error)) {
          return null;
        }
        dot.color = dot.color.hex;
        if ((typeof (_b = par[2]) !== "undefined" && _b !== null)) {
          dot.offset = par[2] + "%";
        }
        dots.push(dot);
      }
      for (i = 1; (1 <= dots.length - 1 ? i <= dots.length - 1 : i >= dots.length - 1); (1 <= dots.length - 1 ? i += 1 : i -= 1)) {
        if (!dots[i].offset) {
          start = parseFloat(dots[i - 1].offset || 0);
          end = 0;
          for (j = i + 1; (i + 1 <= dots.length - 1 ? j <= dots.length - 1 : j >= dots.length - 1); (i + 1 <= dots.length - 1 ? j += 1 : j -= 1)) {
            if (dots[j].offset) {
              end = dots[j].offset;
              break;
            }
          }
          if (!end) {
            end = 100;
            j = dots.length - 1;
          }
          end = parseFloat(end);
          d = (end - start) / (j - i + 1);
          for (k = i; (i <= j - 1 ? k <= j - 1 : k >= j - 1); (i <= j - 1 ? k += 1 : k -= 1)) {
            start += d;
            dots[k].offset = start + "%";
          }
        }
      }
      return dots;
    },
    getContainer: function(x, y, w, h) {
      var container;
      if (Raphael.is(x, "string") || Raphael.is(x, "object")) {
        container = Raphael.is(x, "string") ? document.getElementById(x) : x;
        return container.tagName ? y === null ? {
          container: container,
          width: container.style.pixelWidth || container.offsetWidth,
          height: container.style.pixelHeight || container.offsetHeight
        } : {
          container: container,
          width: y,
          height: w
        } : null;
      } else {
        return {
          container: 1,
          x: x,
          y: y,
          width: w,
          height: h
        };
      }
    },
    plugins: function(con, add) {
      var _a, _b, _c, _d, that;
      that = this;
      _a = []; _c = add;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        (function() {
          var _e, _f, _g;
          var prop = _c[_b];
          return _a.push((function() {
            if (add.hasOwnProperty(prop) && !((function(){ for (var _f=0, _g=con.length; _f<_g; _f++) { if (con[_f] === prop) return true; } return false; }).call(this))) {
              if ((_e = typeof add[prop]) === "function") {
                return (function(f) {
                  return (con[prop] = con === that ? f : (function() {
                    return f.apply(that, arguments);
                  }));
                })(add[prop]);
              } else if (_e === "object") {
                con[prop] = con[prop] || {};
                return plugins.call(this, con[prop], add[prop]);
              } else {
                return (con[prop] = add[prop]);
              }
            }
          }).call(this));
        }).call(this);
      }
      return _a;
    },
    tear: function(el, paper) {
      if (el === paper.top) {
        paper.top = el.prev;
      }
      if (el === paper.bottom) {
        paper.bottom = el.next;
      }
      if (el.next) {
        el.next.prev = el.prev;
      }
      if (el.prev) {
        return (el.prev.next = el.next);
      }
    },
    tofront: function(el, paper) {
      if (paper.top === el) {
        return null;
      } else {
        tear(el, paper);
        el.next = null;
        el.prev = paper.top;
        paper.top.next = el;
        return (paper.top = el);
      }
    },
    toback: function(el, paper) {
      if (paper.bottom === el) {
        return null;
      } else {
        tear(el, paper);
        el.next = paper.bottom;
        el.prev = null;
        paper.bottom.prev = el;
        return (paper.bottom = el);
      }
    },
    insertafter: function(el, el2, paper) {
      tear(el, paper);
      if (el2 === paper.top) {
        paper.top = el;
      }
      if (el2.next) {
        el2.next.prev = el;
      }
      el.next = el2.next;
      el.prev = el2;
      return (el2.next = el);
    },
    insertbefore: function(el, el2, paper) {
      tear(el, paper);
      if (el2 === paper.bottom) {
        paper.bottom = el;
      }
      if (el2.prev) {
        el2.prev.next = el;
      }
      el.prev = el2.prev;
      el2.prev = el;
      return (el.next = el2);
    },
    removed: function(methodname) {
      return function() {
        throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object");
      };
    }
  };
};
Paper = function() {};
Paper.svgNamespace = "http://www.w3.org/2000/svg";
Paper.xLinkNamespace = "http://www.w3.org/1999/xlink";
if (Raphael.type === "SVG") {
  Raphael.prototype.$ = function(el, attr) {
    var _a, _b, _c, _d, key;
    if (attr) {
      _a = []; _c = attr;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        key = _c[_b];
        _a.push(attr.hasOwnProperty(key) ? el.setAttribute(key, String(attr[key])) : null);
      }
      return _a;
    } else {
      el = document.createElementNS(Paper.prototype.svgNamespace, el);
      el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
      return el;
    }
  };
  Raphael.prototype.toString = function() {
    return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
  };
  Raphael.prototype.thePath = function(pathString, SVG) {
    var el, p;
    el = $("path");
    if (SVG.canvas) {
      SVG.canvas.appendChild(el);
    }
    p = new Element(el, SVG);
    p.type = "path";
    setFillAndStroke(p, {
      fill: "none",
      stroke: "#000",
      path: pathString
    });
    return p;
  };
  Raphael.prototype.addGradientFill = function(o, gradient, SVG) {
    var _a, angle, dots, el, fx, fy, i, id, max, s, stop, type, vector;
    type = "linear";
    fx = (fy = 0.5);
    s = o.style;
    gradient = String(gradient).replace(radial_gradient, function(all, _fx, _fy) {
      var dir;
      type = "radial";
      if (_fx && _fy) {
        fx = parseFloat(_fx);
        fy = parseFloat(_fy);
        dir = (fy > .5) * 2 - 1;
        if (Math.pow(fx - 0.5, 2) + Math.pow(fy - 0.5, 2) > 0.25) {
          fy = Math.sqrt(0.25 - Math.pow(fx - 0.5, 2)) * dir + 0.5;
          if (fy !== .5) {
            fy = fy.toFixed(5) - 1e-5 * dir;
          };
        }
      }
      return E;
    });
    gradient = gradient.split(/\s*\-\s*/);
    if (type === "linear") {
      angle = gradient.shift();
      angle = -parseFloat(angle);
      if (isNaN(angle)) {
        return null;
      }
      vector = [0, 0, Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)];
      max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
      vector[2] *= max;
      vector[3] *= max;
      if (vector[2] < 0) {
        vector[0] = -vector[2];
        vector[2] = 0;
      }
      if (vector[3] < 0) {
        vector[1] = -vector[3];
        vector[3] = 0;
      }
    }
    dots = parseDots(gradient);
    if (!dots) {
      return null;
    }
    id = o.getAttribute("fill");
    id = id.match(/^url\(#(.*)\)$/);
    if (id) {
      SVG.defs.removeChild(document.getElementById(id[1]));
    }
    el = $(type + "Gradient");
    el.id = "r" + (Raphael._id++).toString(36);
    $(el, type === "radial" ? {
      fx: fx,
      fy: fy
    } : {
      x1: vector[0],
      y1: vector[1],
      x2: vector[2],
      y2: vector[3]
    });
    SVG.defs.appendChild(el);
    _a = dots.length;
    for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
      stop = $("stop");
      $(stop, {
        offset: (function() {
          if (dots[i].offset) {
            return dots[i].offset;
          } else if (!i) {
            return "0%";
          } else {
            return "100%";
          }
        })(),
        "stop-color": dots[i].color || "##fff"
      });
      el.appendChild(stop);
    }
    $(o, {
      fill: "url(#" + el.id + ")",
      opacity: 1,
      "fill-opacity": 1
    });
    s.fill = E;
    s.opacity = 1;
    s.fillOpacity = 1;
    return 1;
  };
  Raphael.prototype.updatePosition = function(o) {
    var bbox;
    bbox = o.getBBox();
    return $(o.pattern, {
      patternTransform: Raphael.format("translate({0},{1})", bbox.x, bbox.y)
    });
  };
  Raphael.prototype.setFillAndStroke = function(o, params) {
    var _a, _b, _c, addDashes, att, attrs, clip, clr, cssrule, dasharray, el, gradient, hl, ig, img, isURL, node, pn, rc, rect, rot, rotxy, stops, value, xy;
    dasharray = {
      "": [0],
      "none": [0],
      "-": [3, 1],
      ".": [1, 1],
      "-.": [3, 1, 1, 1],
      "-..": [3, 1, 1, 1, 1, 1],
      ". ": [1, 3],
      "- ": [4, 3],
      "--": [8, 3],
      "- .": [4, 3, 1, 3],
      "--.": [8, 3, 1, 3],
      "--..": [8, 3, 1, 3, 1, 3]
    };
    node = o.node;
    attrs = o.attrs;
    rot = o.rotate();
    addDashes = function(o, value) {
      var butt, dashes, i, width;
      value = dasharray[String.prototype.toLowerCase.call(value)];
      if (value) {
        width = o.attrs["stroke-width"] || "1";
        butt = (({
          round: width,
          square: width,
          butt: 0
        })[o.attrs["stroke-linecap"] || params["stroke-linecap"]]) || 0;
        dashes = [];
        i = value.length;
        while (i -= 1) {
          dashes[i] = value[i] * width + (i % 2 ? 1 : -1) * butt;
        }
        return $(node, {
          "stroke-dasharray": dashes.join(",")
        });
      }
    };
    if (params.hasOwnProperty("rotation")) {
      rot = params.rotation;
    }
    rotxy = String(rot).split(separator);
    if (!(rotxy.length - 1)) {
      rotxy = null;
    } else {
      rotxy[1] = +rotxy[1];
      rotxy[2] = +rotxy[2];
    }
    if (parseFloat(rot)) {
      o.rotate(0, true);
    }
    _b = params;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      var att = _b[_a];
      if (params.hasOwnProperty(att)) {
        if (!this.availableAttrs.hasOwnProperty(att)) {
          continue;
        }
        value = params[att];
        attrs[att] = value;
        if (att === "blur") {
          o.blur(value);
        } else if (att === "rotation") {
          o.rotate(value, true);
        } else if (att === "href" || att === "title" || att === "target") {
          pn = node.parentNode;
          if (String.prototype.toLowerCase.call(pn.tagName) !== "a") {
            hl = $("a");
            pn.insertBefore(hl, node);
            hl.appendChild(node);
            pn = hl;
          }
          pn.setAttributeNS(o.paper.xlink, att, value);
        } else if (att === "cursor") {
          node.style.cursor = value;
        } else if (att === "clip-rect") {
          rect = String(value).split(separator);
          if (rect.length === 4) {
            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
            el = $("clipPath");
            rc = $("rect");
            el.id = "r" + (Raphael._id++).toString(36);
            $(rc, {
              x: rect[0],
              y: rect[1],
              width: rect[2],
              height: rect[3]
            });
            el.appendChild(rc);
            o.paper.defs.appendChild(el);
            $(node, {
              "clip-path": "url(#" + el.id + ")"
            });
            o.clip = rc;
          }
          if (!value) {
            clip = document.getElementById(node.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, E));
            if (clip) {
              clip.parentNode.removeChild(clip);
            }
            $(node, {
              "clip-path": E
            });
            delete o.clip;
          }
        } else if (att === "path") {
          if ((o.type === "path")) {
            $(node, {
              d: value ? (attrs.path = pathToAbsolute(value)) : "M0,0"
            });
          };
        } else if (att === "width" || att === "x") {
          if (att === "width") {
            node.setAttribute(att, value);
            if (attrs.fx) {
              att = "x";
              value = attrs.x;
            }
          }
          if (att === "x") {
            if (attrs.fx) {
              value = -attrs.x - (attrs.width || 0);
            };
          };
        } else if (att === "cx" || att === "rx") {
          if (att === "cx" || o.type !== "rect") {
            if (att === "cx" && rotxy) {
              rotxy[1] += value - attrs[att];
            }
            node.setAttribute(att, value);
            if (o.pattern) {
              updatePosition(o);
            }
          }
        } else if (att === "height" || att === "y") {
          if (att === "height") {
            node.setAttribute(att, value);
            if (attrs.fy) {
              att = "y";
              value = attrs.y;
            }
          }
          if (att === "y") {
            if (attrs.fy) {
              value = -attrs.y - (attrs.height || 0);
            };
          };
        } else if (att === "cy" || att === "ry") {
          if (att === "cy" || o.type !== "rect") {
            if (att === "cy" && rotxy) {
              rotxy[2] += value - attrs[att];
            }
            node.setAttribute(att, value);
            if (o.pattern) {
              updatePosition(o);
            }
          }
        } else if (att === "r") {
          if (o.type === "rect") {
            $(node, {
              rx: value,
              ry: value
            });
          } else {
            node.setAttribute(att, value);
          };
        } else if (att === "src") {
          if (o.type === "image") {
            node.setAttributeNS(o.paper.xlink, "href", value);
          };
        } else if (att === "stroke-width") {
          node.style.strokeWidth = value;
          node.setAttribute(att, value);
          if (attrs["stroke-dasharray"]) {
            addDashes(o, attrs["stroke-dasharray"]);
          };
        } else if (att === "stroke-dasharray") {
          addDashes(o, value);
        } else if (att === "translation") {
          xy = String(value).split(separator);
          xy[0] = +xy[0] || 0;
          xy[1] = +xy[1] || 0;
          if (rotxy) {
            rotxy[1] += xy[0];
            rotxy[2] += xy[1];
          }
          translate.call(o, xy[0], xy[1]);
        } else if (att === "scale") {
          xy = String(value).split(separator);
          o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, (isNaN(parseFloat(xy[2])) ? null : +xy[2]), (isNaN(parseFloat(xy[3])) ? null : +xy[3]));
        } else if (att === "fill") {
          isURL = String(value).match(ISURL);
          if (isURL) {
            el = $("pattern");
            ig = $("image");
            el.id = "r" + (Raphael._id++).toString(36);
            $(el, {
              x: 0,
              y: 0,
              patternUnits: "userSpaceOnUse",
              height: 1,
              width: 1
            });
            $(ig, {
              x: 0,
              y: 0
            });
            ig.setAttributeNS(o.paper.xlink, "href", isURL[1]);
            el.appendChild(ig);
            img = document.createElement("img");
            img.style.cssText = "position:absolute;left:-9999em;top-9999em";
            img.onload = function() {
              $(el, {
                width: this.offsetWidth,
                height: this.offsetHeight
              });
              $(ig, {
                width: this.offsetWidth,
                height: this.offsetHeight
              });
              document.body.removeChild(this);
              return o.paper.safari();
            };
            document.body.appendChild(img);
            img.src = isURL[1];
            o.paper.defs.appendChild(el);
            node.style.fill = "url(#" + el.id + ")";
            $(node, {
              fill: "url(#" + el.id + ")"
            });
            o.pattern = el;
            if (o.pattern) {
              updatePosition(o);
            }
          } else {
            clr = Raphael.getRGB(value);
            if (!clr.error) {
              delete params.gradient;
              delete attrs.gradient;
              if (!Raphael.is(attrs.opacity, "undefined") && Raphael.is(params.opacity, "undefined")) {
                $(node, {
                  opacity: attrs.opacity
                });
              };
              if (!Raphael.is(attrs["fill-opacity"], "undefined") && Raphael.is(params["fill-opacity"], "undefined")) {
                $(node, {
                  "fill-opacity": attrs["fill-opacity"]
                });
              };
              if (clr.hasOwnProperty("o")) {
                $(node, {
                  "fill-opacity": clr.o > 1 ? clr.o / 100 : clr.o
                });
              }
              node.setAttribute(att, clr.hex);
              if (att === "stroke" && clr.hasOwnProperty("o")) {
                $(node, {
                  "stroke-opacity": clr.o > 1 ? clr.o / 100 : clr.o
                });
              }
            } else if ((({
              circle: 1,
              ellipse: 1
            }).hasOwnProperty(o.type) || String(value).charAt() !== "r") && addGradientFill(node, value, o.paper)) {
              attrs.gradient = value;
              attrs.fill = "none";
            } else {
              if (clr.hasOwnProperty("o")) {
                $(node, {
                  "fill-opacity": clr.o > 1 ? clr.o / 100 : clr.o
                });
              }
              node.setAttribute(att, clr.hex);
              if (att === "stroke" && clr.hasOwnProperty("o")) {
                $(node, {
                  "stroke-opacity": clr.o > 1 ? clr.o / 100 : clr.o
                });
              }
            }
          }
        } else if (att === "stroke") {
          clr = Raphael.getRGB(value);
          node.setAttribute(att, clr.hex);
          if (att === "stroke" && clr.hasOwnProperty("o")) {
            $(node, {
              "stroke-opacity": clr.o > 1 ? clr.o / 100 : clr.o
            });
          }
        } else if (att === "gradient") {
          if (({
            circle: 1,
            ellipse: 1
          }).hasOwnProperty(o.type) || String(value).charAt() !== "r") {
            addGradientFill(node, value, o.paper);
          };
        } else if (att === "opacity" || att === "fill-opacity") {
          if (attrs.gradient) {
            gradient = document.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
            if (gradient) {
              stops = gradient.getElementsByTagName("stop");
              stops[stops.length - 1][setAttribute]("stop-opacity", value);
            }
          }
        } else {
          if (att === "font-size") {
            value = parseInt(value, 10) + "px";
          }
          cssrule = att.replace(/(\-.)/g, function(w) {
            return String.prototype.toUpperCase.call(w.substring(1));
          });
          node.style[cssrule] = value;
          node.setAttribute(att, value);
        }
      }
    }
    tuneText(o, params);
    if (rotxy) {
      return o.rotate(rotxy.join(S));
    } else {
      if (parseFloat(rot)) {
        return o.rotate(rot, true);
      }
    }
  };
  Raphael.prototype.tuneText = function(el, params) {
    var _a, _b, a, bb, dif, fontSize, i, leading, node, texts, tspan;
    leading = 1.2;
    if (el.type !== "text" || !(params.hasOwnProperty("text") || params.hasOwnProperty("font") || params.hasOwnProperty("font-size") || params.hasOwnProperty("x") || params.hasOwnProperty("y"))) {
      return null;
    }
    a = el.attrs;
    node = el.node;
    fontSize = node.firstChild ? parseInt(document.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
    if (params.hasOwnProperty("text")) {
      a.text = params.text;
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      texts = String(params.text).split("\n");
      _a = texts.length;
      for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
        if (texts[i]) {
          tspan = $("tspan");
          if (i) {
            $(tspan, {
              dy: fontSize * leading,
              x: a.x
            });
          }
          tspan.appendChild(document.createTextNode(texts[i]));
          node.appendChild(tspan);
        }
      }
    } else {
      texts = node.getElementsByTagName("tspan");
      _b = texts.length;
      for (i = o; (o <= _b ? i <= _b : i >= _b); (o <= _b ? i += 1 : i -= 1)) {
        if (i) {
          $(texts[i], {
            dy: fontSize * leading,
            x: a.x
          });
        }
      }
    }
    $(node, {
      y: a.y
    });
    bb = el.getBBox();
    dif = a.y - (bb.y + bb.height / 2);
    if (dif && isFinite(dif)) {
      return $(node, {
        y: a.y + dif
      });
    }
  };
  Element = function(node, svg) {
    var X, Y;
    X = 0;
    Y = 0;
    this[0] = node;
    this.id = Raphael._oid++;
    this.node = node;
    node.raphael = this;
    this.paper = svg;
    this.attrs = this.attrs || {};
    this.transformations = [];
    this._ = {
      tx: 0,
      ty: 0,
      rt: {
        deg: 0,
        cx: 0,
        cy: 0
      },
      sx: 1,
      sy: 1
    };
    if (!svg.bottom) {
      svg.bottom = this;
    }
    this.prev = svg.top;
    if (svg.top) {
      svg.top.next = this;
    }
    svg.top = this;
    this.next = null;
    return this;
  };
  Element.prototype.rotate = function(deg, cx, cy) {
    var bbox;
    if (this.removed) {
      return this;
    }
    if (deg === null) {
      if (this._.rt.cx) {
        return [this._.rt.deg, this._.rt.cx, this._.rt.cy].join(S);
      }
      return this._.rt.deg;
    }
    bbox = this.getBBox();
    deg = String(deg).split(separator);
    if (deg.length - 1) {
      cx = parseFloat(deg[1]);
      cy = parseFloat(deg[2]);
    }
    deg = parseFloat(deg[0]);
    if (cx !== null) {
      this._.rt.deg = deg;
    } else {
      this._.rt.deg += deg;
    };
    if (!(typeof cy !== "undefined" && cy !== null)) {
      cx = null;
    }
    this._.rt.cx = cx;
    this._.rt.cy = cy;
    cx = !(typeof cx !== "undefined" && cx !== null) ? bbox.x + bbox.width / 2 : cx;
    cy = !(typeof cy !== "undefined" && cy !== null) ? bbox.y + bbox.height / 2 : cy;
    if (!_.rt.deg) {
      this.transformations[0] = Raphael.format("rotate({0} {1} {2})", this._.rt.deg, cx, cy);
      if (this.clip) {
        $(this.clip, {
          transform: Raphael.format("rotate({0} {1} {2})", -this._.rt.deg, cx, cy)
        });
      }
    } else {
      this.transformations[0] = E;
      if (this.clip) {
        $(this.clip, {
          transform: E
        });
      }
    }
    $(this.node, {
      transform: this.transformations.join(S)
    });
    return this;
  };
  Element.prototype.hide = function() {
    if (!this.removed) {
      this.node.style.display = "none";
    }
    return this;
  };
  Element.prototype.show = function() {
    if (!this.removed) {
      this.node.style.display = "";
    }
    return this;
  };
  Element.prototype.remove = function() {
    var _a, _b, _c, i;
    if (this.removed) {
      return null;
    }
    tear(this, this.paper);
    this.node.parentNode.removeChild(this.node);
    _b = this;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      i = _b[_a];
      delete this[i];
    }
    return (this.removed = true);
  };
  Element.prototype.getBBox = function() {
    var _a, bb, bbox, hide, i;
    if (this.removed) {
      return this;
    }
    if (this.type === "path") {
      return pathDimensions(this.attrs.path);
    }
    if (this.node.style.display === "none") {
      this.show();
      hide = true;
    }
    bbox = {};
    try {
      bbox = this.node.getBBox();
    } catch (error) {

    } finally {
      bbox = bbox || {};
    }
    if (this.type === "text") {
      bbox = {
        x: bbox.x,
        y: Infinity,
        width: 0,
        height: 0
      };
      _a = this.node.getNumberOfChars();
      for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
        bb = this.node.getExtentOfChar(i);
        if (bb.y < bbox.y) {
          bbox.y = bb.y;
        }
        if (bb.y + bb.height - bbox.y > bbox.height) {
          bbox.height = bb.y + bb.height - bbox.y;
        }
        if (bb.x + bb.width - bbox.x > bbox.width) {
          bbox.width = bb.x + bb.width - bbox.x;
        }
      }
    }
    if (hide) {
      this.hide();
    }
    return bbox;
  };
  Element.prototype.attr = function(name, value) {
    var _a, _b, _c, _d, i, j, params, res, values;
    if (this.removed) {
      return this;
    }
    if (!(typeof name !== "undefined" && name !== null)) {
      res = {};
      _b = this.attrs;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        i = _b[_a];
        if (this.attrs.hasOwnProperty(i)) {
          res[i] = this.attrs[i];
        };
      }
      if (this._.rt.deg) {
        res.rotation = this.rotate();
      }
      if (this._.sx !== 1 || this._.sy !== 1) {
        res.scale = this.scale();
      }
      if (res.gradient && res.fill === "none") {
        if ((res.fill = res.gradient)) {
          delete res.gradient;
        };
      };
      return res;
    }
    if (!(typeof value !== "undefined" && value !== null) && Raphael.is(name, "string")) {
      if (name === "translation") {
        return translate.call(this);
      }
      if (name === "rotation") {
        return this.rotate();
      }
      if (name === "scale") {
        return this.scale();
      }
      if (name === "fill" && this.attrs.fill === "none" && this.attrs.gradient) {
        return this.attrs.gradient;
      }
      return this.attrs[name];
    }
    if (!(typeof value !== "undefined" && value !== null) && Raphael.is(name, "array")) {
      values = {};
      _d = name.length;
      for (j = 0; (0 <= _d ? j <= _d : j >= _d); (0 <= _d ? j += 1 : j -= 1)) {
        values[name[j]] = this.attr(name[j]);
      }
      return values;
    }
    if ((typeof value !== "undefined" && value !== null)) {
      params = {};
      params[name] = value;
      setFillAndStroke(this, params);
    } else if ((typeof name !== "undefined" && name !== null) && Raphael.is(name, "object")) {
      setFillAndStroke(this, name);
    }
    return this;
  };
  Element.prototype.toFront = function() {
    var svg;
    if (this.removed) {
      return this;
    }
    this.node.parentNode.appendChild(this.node);
    svg = this.paper;
    svg.top !== this && tofront(this, svg);
    return this;
  };
  Element.prototype.toBack = function() {
    var svg;
    if (this.removed) {
      return this;
    }
    if (this.node.parentNode.firstChild !== this.node) {
      this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
      toback(this, this.paper);
      svg = this.paper;
    }
    return this;
  };
  Element.prototype.insertAfter = function(element) {
    var node;
    if (this.removed) {
      return this;
    }
    node = element.node || element[element.length].node;
    if (node.nextSibling) {
      node.parentNode.insertBefore(this.node, node.nextSibling);
    } else {
      node.parentNode.appendChild(this.node);
    };
    insertafter(this, element, this.paper);
    return this;
  };
  Element.prototype.insertBefore = function(element) {
    var node;
    if (this.removed) {
      return this;
    }
    node = element.node || element[0].node;
    node.parentNode.insertBefore(this.node, node);
    insertbefore(this, element, this.paper);
    return this;
  };
  Element.prototype.blur = function(size) {
    var blur, fltr;
    if (+size !== 0) {
      fltr = $("filter");
      blur = $("feGaussianBlur");
      this.attrs.blur = size;
      fltr.id = "r" + (Raphael._id++).toString(36);
      $(blur, {
        stdDeviation: +size || 1.5
      });
      fltr.appendChild(blur);
      this.paper.defs.appendChild(fltr);
      this._blur = fltr;
      return $(this.node, {
        filter: "url(#" + fltr.id + ")"
      });
    } else {
      if (this._blur) {
        this._blur.parentNode.removeChild(this._blur);
        delete this._blur;
        delete this.attrs.blur;
      }
      return this.node.removeAttribute("filter");
    }
  };
  Raphael.prototype.theCircle = function(svg, x, y, r) {
    var el, res;
    el = $("circle");
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    res = new Element(el, svg);
    res.attrs = {
      cx: x,
      cy: y,
      r: r,
      fill: "none",
      stroke: "#000"
    };
    res.type = "circle";
    $(el, res.attrs);
    return res;
  };
  Raphael.prototype.theRect = function(svg, x, y, w, h, r) {
    var el, res;
    el = $("rect");
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    res = new Element(el, svg);
    res.attrs = {
      x: x,
      y: y,
      width: w,
      height: h,
      r: r || 0,
      rx: r || 0,
      ry: r || 0,
      fill: "none",
      stroke: "#000"
    };
    res.type = "rect";
    $(el, res.attrs);
    return res;
  };
  Raphael.prototype.theEllipse = function(svg, x, y, rx, ry) {
    var el, res;
    el = $("ellipse");
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    res = new Element(el, svg);
    res.attrs = {
      cx: x,
      cy: y,
      rx: rx,
      ry: ry,
      fill: "none",
      stroke: "#000"
    };
    res.type = "ellipse";
    $(el, res.attrs);
    return res;
  };
  Raphael.prototype.theImage = function(svg, src, x, y, w, h) {
    var el, res;
    el = $("image");
    $(el, {
      x: x,
      y: y,
      width: w,
      height: h,
      preserveAspectRatio: "none"
    });
    el.setAttributeNS(svg.xlink, "href", src);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    res = new Element(el, svg);
    res.attrs = {
      x: x,
      y: y,
      width: w,
      height: h,
      src: src
    };
    res.type = "image";
    return res;
  };
  Raphael.prototype.theText = function(svg, x, y, text) {
    var el, res;
    el = $("text");
    $(el, {
      x: x,
      y: y,
      "text-anchor": "middle"
    });
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    res = new Element(el, svg);
    res.attrs = {
      x: x,
      y: y,
      "text-anchor": "middle",
      text: text,
      font: this.availableAttrs.font,
      stroke: "none",
      fill: "#000"
    };
    res.type = "text";
    setFillAndStroke(res, res.attrs);
    return res;
  };
  Raphael.prototype.setSize = function(width, height) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    return this;
  };
  Raphael.prototype.create = function() {
    var cnvs, con, container, height, width, x, y;
    con = getContainer.apply(0, arguments);
    container = con && con.container;
    x = con.x;
    y = con.y;
    width = con.width;
    height = con.height;
    if (!container) {
      throw new Error("SVG container not found.");
    }
    cnvs = $("svg");
    x = x || 0;
    y = y || 0;
    width = width || 512;
    height = height || 342;
    $(cnvs, {
      xmlns: "http://www.w3.org/2000/svg",
      version: 1.1,
      width: width,
      height: height
    });
    if (container === 1) {
      cnvs.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px";
      document.body.appendChild(cnvs);
    } else {
      if (container.firstChild) {
        container.insertBefore(cnvs, container.firstChild);
      } else {
        container.appendChild(cnvs);
      };
    }
    container = new Paper();
    container.width = width;
    container.height = height;
    container.canvas = cnvs;
    plugins.call(container, container, Raphael.fn);
    container.clear();
    return container;
  };
  Paper.prototype.clear = function() {
    var c;
    c = this.canvas;
    while (c.firstChild) {
      c.removeChild(c.firstChild);
    }
    this.bottom = (this.top = null);
    (this.desc = $("desc")).appendChild(document.createTextNode("Created with Rapha\xebl"));
    c.appendChild(this.desc);
    return c.appendChild((this.defs = $("defs")));
  };
  Paper.prototype.remove = function() {
    var _a, _b, _c, _d, i;
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    _a = []; _c = this;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      i = _c[_b];
      _a.push((this[i] = removed(i)));
    }
    return _a;
  };
}
if (Raphael.type === "VML") {
  Raphael.prototype.path2vml = function(path) {
    var command, i, j, p, pa, r, res, total;
    total = /[ahqstv]/ig;
    command = pathToAbsolute;
    if (String(path).match(total)) {
      command = pathToCurve;
    }
    total = /[clmz]/g;
    if (command === pathToAbsolute && !String(path).match(total)) {
      res = String(path).replace(bites, function(all, command, args) {
        var isMove, res, vals;
        vals = [];
        isMove = String.prototype.toLowerCase.call(command) === "m";
        res = map[command];
        args.replace(val, function(value) {
          if (isMove && vals.length === 2) {
            res += vals + map[command === "m" ? "l" : "L"];
            vals = [];
          }
          return vals.push(Math.round(value * zoom));
        });
        return res + vals;
      });
      res;
    }
    pa = command(path);
    res = [];
    for (i = 0; (0 <= pa.length - 1 ? i <= pa.length - 1 : i >= pa.length - 1); (0 <= pa.length - 1 ? i += 1 : i -= 1)) {
      p = pa[i];
      r = String.prototype.toLowerCase.call(pa[i][0]);
      if (r === "z") {
        r = "x";
      }
      for (j = 1; (1 <= p.length - 1 ? j <= p.length - 1 : j >= p.length - 1); (1 <= p.length - 1 ? j += 1 : j -= 1)) {
        r += Math.round(p[j] * zoom) + (j !== p.length - 1 ? "," : E);
      }
      res.push(r);
    }
    return res.join(S);
  };
  Raphael.prototype.toString = function() {
    return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
  };
  Raphael.prototype.thePath = function(pathString, vml) {
    var attr, el, g, ol, p;
    g = createNode("group");
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = vml.coordsize;
    g.coordorigin = vml.coordorigin;
    el = createNode("shape");
    ol = el.style;
    ol.width = vml.width + "px";
    ol.height = vml.height + "px";
    el.coordsize = coordsize;
    el.coordorigin = vml.coordorigin;
    g.appendChild(el);
    p = new Element(el, g, vml);
    attr = {
      fill: "none",
      stroke: "#000"
    };
    if (pathString) {
      attr.path = pathString;
    }
    p.isAbsolute = true;
    p.type = "path";
    p.path = [];
    p.Path = E;
    setFillAndStroke(p, attr);
    vml.canvas.appendChild(g);
    return p;
  };
  Raphael.prototype.setFillAndStroke = function(o, params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, a, ampersand, ampersandRE, br, brtag, dasharray, div, dstyle, fill, group, isURL, leftAngle, leftAngleRE, newfill, newpath, newstroke, node, opacity, par, rect, res, s, stroke, strokeColor, width, xy;
    o.attrs = o.attrs || {};
    node = o.node;
    a = o.attrs;
    s = node.style;
    newpath = (params.x !== a.x || params.y !== a.y || params.width !== a.width || params.height !== a.height || params.r !== a.r) && o.type === "rect";
    res = o;
    _b = params;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      par = _b[_a];
      if (params.hasOwnProperty(par)) {
        a[par] = params[par];
      };
    }
    if (newpath) {
      a.path = rectPath(a.x, a.y, a.width, a.height, a.r);
      o.X = a.x;
      o.Y = a.y;
      o.W = a.width;
      o.H = a.height;
    }
    if (params.href) {
      node.href = params.href;
    }
    if (params.title) {
      node.title = params.title;
    }
    if (params.target) {
      node.target = params.target;
    }
    if (params.cursor) {
      s.cursor = params.cursor;
    }
    if ((function(){ for (var _d=0, _e=params.length; _d<_e; _d++) { if (params[_d] === "blur") return true; } return false; }).call(this)) {
      o.blur(params.blur);
    }
    if (params.path && o.type === "path" || newpath) {
      node.path = path2vml(a.path);
    };
    if (params.rotation !== null) {
      o.rotate(params.rotation, true);
    };
    if (params.translation) {
      xy = String(params.translation).split(separator);
      translate.call(o, xy[0], xy[1]);
      if (o._.rt.cx !== null) {
        o._.rt.cx += +xy[0];
        o._.rt.cy += +xy[1];
        o.setBox(o.attrs, xy[0], xy[1]);
      }
    }
    if (params.scale) {
      xy = String(params.scale).split(separator);
      o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, +xy[2] || null, +xy[3] || null);
    }
    if ((function(){ for (var _f=0, _g=params.length; _f<_g; _f++) { if (params[_f] === "clip-rect") return true; } return false; }).call(this)) {
      rect = String(params["clip-rect"]).split(separator);
      if (rect.length === 4) {
        rect[2] = +rect[2] + (+rect[0]);
        rect[3] = +rect[3] + (+rect[1]);
        div = node.clipRect || document.createElement("div");
        dstyle = div.style;
        group = node.parentNode;
        dstyle.clip = Raphael.format("rect({1}px {2}px {3}px {0}px)", rect);
        if (!node.clipRect) {
          dstyle.position = "absolute";
          dstyle.top = 0;
          dstyle.left = 0;
          dstyle.width = o.paper.width + "px";
          dstyle.height = o.paper.height + "px";
          group.parentNode.insertBefore(div, group);
          div.appendChild(group);
          node.clipRect = div;
        }
      }
      if (!params["clip-rect"]) {
        if (node.clipRect) {
          node.clipRect.style.clip = E;
        }
      }
    }
    if (o.type === "image" && params.src) {
      node.src = params.src;
    };
    if (o.type === "image" && params.opacity) {
      node.filterOpacity = ms + ".Alpha(opacity=" + (params.opacity * 100) + ")";
      s.filter = (node.filterMatrix || E) + (node.filterOpacity || E);
    }
    if (params.font) {
      s.font = params.font;
    }
    if (params["font-family"]) {
      s.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"';
    }
    if (params["font-size"]) {
      s.fontSize = params["font-size"];
    }
    if (params["font-weight"]) {
      s.fontWeight = params["font-weight"];
    }
    if (params["font-style"]) {
      s.fontStyle = params["font-style"];
    }
    if (params.opacity !== null || params["stroke-width"] !== null || params.fill !== null || params.stroke !== null || params["stroke-width"] !== null || params["stroke-opacity"] !== null || params["fill-opacity"] !== null || params["stroke-dasharray"] !== null || params["stroke-miterlimit"] !== null || params["stroke-linejoin"] !== null || params["stroke-linecap"] !== null) {
      node = o.shape || node;
      fill = node.getElementsByTagName("fill") && node.getElementsByTagName("fill")[0];
      newfill = false;
      if (!fill) {
        newfill = (fill = createNode("fill"));
      }
      if ((function(){ for (var _l=0, _m=(function(){ for (var _h=0, _i=params.length; _h<_i; _h++) { if (params[_h] === params || "opacity") return true; } return false; }).call(this).length; _l<_m; _l++) { if ((function(){ for (var _j=0, _k=params.length; _j<_k; _j++) { if (params[_j] === params || "opacity") return true; } return false; }).call(this)[_l] === "fill-opacity") return true; } return false; }).call(this)) {
        opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+Raphael.getRGB(params.fill).o + 1 || 2) - 1);
        if (opacity < 0) {
          opacity = 0;
        }
        if (opacity > 1) {
          opacity = 1;
        }
        fill.opacity = opacity;
      }
      if (params.fill) {
        fill.on = true;
      }
      if (fill.on === null || params.fill === "none") {
        fill.on = false;
      };
      if (fill.on && params.fill) {
        isURL = params.fill.match(ISURL);
        if (isURL) {
          fill.src = isURL[1];
          fill.type = "tile";
        } else {
          fill.color = Raphael.getRGB(params.fill).hex;
          fill.src = E;
          fill.type = "solid";
          if (Raphael.getRGB(params.fill).error && ((function(){ (_n = res.type); for (var _p=0, _q=(_o = ({
            circle: 1,
            ellipse: 1
          }) || String(params.fill).charAt() !== "r").length; _p<_q; _p++) { if (_o[_p] === _n) return true; } return false; }).call(this)) && addGradientFill(res, params.fill)) {
            a.fill = "none";
          };
        }
      }
      if (newfill) {
        node.appendChild(fill);
      }
      stroke = node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0];
      newstroke = false;
      if (!stroke) {
        newstroke = (stroke = createNode("stroke"));
      }
      if ((params.stroke && params.stroke !== "none") || params["stroke-width"] || params["stroke-opacity"] !== null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
        stroke.on = true;
      };
      if (params.stroke === "none" || stroke.on === null || params.stroke === 0 || params["stroke-width"] === 0) {
        stroke.on = false;
      }
      strokeColor = Raphael.getRGB(params.stroke);
      if (stroke.on && params.stroke) {
        stroke.color = strokeColor.hex;
      }
      opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
      width = (parseFloat(params["stroke-width"]) || 1) * 0.75;
      if (opacity < 0) {
        opacity = 0;
      }
      if (opacity > 1) {
        opacity = 1;
      }
      if (params["stroke-width"] === null) {
        width = a["stroke-width"];
      }
      if (params["stroke-width"]) {
        stroke.weight = width;
      }
      if (width && width < 1) {
        opacity *= width;
      }
      if (opacity) {
        stroke.weight = 1;
      }
      stroke.opacity = opacity;
      if (params["stroke-linejoin"]) {
        stroke.joinstyle = params["stroke-linejoin"] || "miter";
      }
      stroke.miterlimit = params["stroke-miterlimit"] || 8;
      if (params["stroke-linecap"]) {
        stroke.endcap = (function() {
          if (params["stroke-linecap"] === "butt") {
            return "flat";
          } else if (params["stroke-linecap"] === "square") {
            return "square";
          } else {
            return "round";
          }
        })();
      };
      if (params["stroke-dasharray"]) {
        dasharray = {
          "-": "shortdash",
          ".": "shortdot",
          "-.": "shortdashdot",
          "-..": "shortdashdotdot",
          ". ": "dot",
          "- ": "dash",
          "--": "longdash",
          "- .": "dashdot",
          "--.": "longdashdot",
          "--..": "longdashdotdot"
        };
        stroke.dashstyle = dasharray.hasOwnProperty(params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
      }
      if (newstroke) {
        node.appendChild(stroke);
      }
    }
    if (res.type === "text") {
      s = res.paper.span.style;
      if (a.font) {
        s.font = a.font;
      }
      if (a["font-family"]) {
        s.fontFamily = a["font-family"];
      }
      if (a["font-size"]) {
        s.fontSize = a["font-size"];
      }
      if (a["font-weight"]) {
        s.fontWeight = a["font-weight"];
      }
      if (a["font-style"]) {
        s.fontStyle = a["font-style"];
      }
      leftAngle = "<";
      ampersand = "&";
      leftAngleRE = (new RegExp(("" + (leftAngle)), "g"));
      ampersandRE = (new RegExp(("" + (ampersand)), "g"));
      br = "br";
      brtag = ("<" + (br) + ">");
      if (res.node.string) {
        res.paper.span.innerHTML = String(res.node.string).replace(leftAngleRE, "<").replace(ampersandRE, "&").replace(/\n/g, brtag);
      }
      res.W = (a.w = res.paper.span.offsetWidth);
      res.H = (a.h = res.paper.span.offsetHeight);
      res.X = a.x;
      res.Y = a.y + Math.round(res.H / 2);
      if ((_r = a["text-anchor"]) === "start") {
        res.node.style["v-text-align"] = "left";
        return (res.bbx = Math.round(res.W / 2));
      } else if (_r === "end") {
        res.node.style["v-text-align"] = "right";
        return (res.bbx = -Math.round(res.W / 2));
      } else {
        return (res.node.style["v-text-align"] = "center");
      }
    }
  };
  Raphael.prototype.addGradientFill = function(o, gradient) {
    var angle, attrs, clrs, dots, fill, fxfy, i, type;
    o.attrs = (typeof o.attrs !== "undefined" && o.attrs !== null) ? o.attrs : {};
    attrs = o.attrs;
    type = "linear";
    fxfy = ".5 .5";
    o.attrs.gradient = gradient;
    gradient = String(gradient).replace(radial_gradient, function(all, fx, fy) {
      type = "radial";
      if (fx && fy) {
        fx = parseFloat(fx);
        fy = parseFloat(fy);
        if (Math.pow(fx - 0.5, 2) + Math.pow(fy - 0.5, 2) > .25) {
          fy = Math.sqrt(0.25 - Math.pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5;
        };
        fxfy = fx + S + fy;
      }
      return E;
    });
    gradient = gradient.split(/\s*\-\s*/);
    if (type === "linear") {
      angle = gradient.shift();
      angle = -parseFloat(angle);
      if (isNaN(angle)) {
        return null;
      }
    }
    dots = parseDots(gradient);
    if (!dots) {
      return null;
    }
    o = o.shape || o.node;
    fill = o.getElementsByTagName("fill")[0] || createNode("fill");
    if (!fill.parentNode) {
      o.appendChild(fill);
    }
    if (dots.length) {
      fill.on = true;
      fill.method = "none";
      fill.color = dots[0].color;
      fill.color2 = dots[dots.length - 1].color;
      clrs = [];
      for (i = 0; (0 <= dot.length - 1 ? i <= dot.length - 1 : i >= dot.length - 1); (0 <= dot.length - 1 ? i += 1 : i -= 1)) {
        if (dots[i].offset) {
          clrs.push(dots[i].offset + S + dots[i].color);
        }
      }
      if (fill.colors) {
        if (clrs.length) {
          fill.colors.value = clrs.join();
        } else {
          fill.colors.value = "0% " + fill.color;
        };
      };
      if (type === "radial") {
        fill.type = "gradientradial";
        fill.focus = "100%";
        fill.focussize = fxfy;
        fill.focusposition = fxfy;
      } else {
        fill.type = "gradient";
        fill.angle = (270 - angle) % 360;
      }
    }
    return 1;
  };
  Element = function(node, group, vml) {
    var RotX, RotY, Rotation, Scale;
    Rotation = 0;
    RotX = 0;
    RotY = 0;
    Scale = 1;
    this[0] = node;
    this.id = Raphael._oid++;
    this.node = node;
    node.raphael = this;
    this.X = 0;
    this.Y = 0;
    this.attrs = {};
    this.Group = group;
    this.paper = vml;
    this._ = {
      tx: 0,
      ty: 0,
      rt: {
        deg: 0
      },
      sx: 1,
      sy: 1
    };
    if (!vml.bottom) {
      vml.bottom = this;
    }
    this.prev = vml.top;
    if (vml.top) {
      vml.top.next = this;
    }
    vml.top = this;
    this.next = null;
    return this;
  };
  Element.prototype.rotate = function(deg, cx, cy) {
    if (this.removed) {
      return this;
    }
    if (deg === null) {
      if (this._.rt.cx) {
        return [this._.rt.deg, this._.rt.cx, this._.rt.cy].join(S);
      }
      return this._.rt.deg;
    }
    deg = String(deg).split(separator);
    if (deg.length - 1) {
      cx = parseFloat(deg[1]);
      cy = parseFloat(deg[2]);
    }
    deg = parseFloat(deg[0]);
    if (cx !== null) {
      this._.rt.deg = deg;
    } else {
      this._.rt.deg += deg;
    };
    if (cy === null) {
      cx = null;
    }
    this._.rt.cx = cx;
    this._.rt.cy = cy;
    this.setBox(this.attrs, cx, cy);
    this.Group.style.rotation = this._.rt.deg;
    return this;
  };
  Element.prototype.setBox = function(params, cx, cy) {
    var _a, _b, _c, _d, attr, dim, gs, h, i, left, os, t, top, w, x, y;
    if (this.removed) {
      return this;
    }
    gs = this.Group.style;
    os = (this.shape && this.shape.style) || this.node.style;
    params = (typeof params !== "undefined" && params !== null) ? params : {};
    _b = params;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      i = _b[_a];
      if (params.hasOwnProperty(i)) {
        this.attrs[i] = params[i];
      };
    }
    cx = (typeof cx !== "undefined" && cx !== null) ? cx : this._.rt.cx;
    cy = (typeof cy !== "undefined" && cy !== null) ? cy : this._.rt.cy;
    attr = this.attrs;
    if ((_d = this.type) === "circle") {
      x = attr.cx - attr.r;
      y = attr.cy - attr.r;
      w = (h = attr.r * 2);
    } else if (_d === "ellipse") {
      x = attr.cx - attr.rx;
      y = attr.cy - attr.ry;
      w = attr.rx * 2;
      h = attr.ry * 2;
    } else if (_d === "image") {
      x = +attr.x;
      y = +attr.y;
      w = attr.width || 0;
      h = attr.height || 0;
    } else if (_d === "text") {
      this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join(E);
      x = attr.x - Math.round(this.W / 2);
      y = attr.y - this.H / 2;
      w = this.W;
      h = this.H;
    } else if (_d === "rect" || _d === "path") {
      if (!this.attrs.path) {
        x = 0;
        y = 0;
        w = this.paper.width;
        h = this.paper.height;
      } else {
        dim = pathDimensions(this.attrs.path);
        x = dim.x;
        y = dim.y;
        w = dim.width;
        h = dim.height;
      }
    } else {
      x = 0;
      y = 0;
      w = this.paper.width;
      h = this.paper.height;
    }
    cx = (typeof cx !== "undefined" && cx !== null) ? cx : (x + w / 2);
    cy = (typeof cy !== "undefined" && cy !== null) ? cy : (y + h / 2);
    left = cx - this.paper.width / 2;
    top = cy - this.paper.height / 2;
    gs.left !== (t = left + "px") && (gs.left = t);
    gs.top !== (t = top + "px") && (gs.top = t);
    this.X = pathlike.hasOwnProperty(this.type) ? -left : x;
    this.Y = pathlike.hasOwnProperty(this.type) ? -top : y;
    this.W = w;
    this.H = h;
    if (pathlike.hasOwnProperty(this.type)) {
      os.left = -left * zoom + "px";
      return (os.top = (t = -top * zoom + "px"));
    } else if (this.type === "text") {
      os.left = -left + "px";
      return (os.top = -top + "px");
    } else {
      gs.width = this.paper.width + "px";
      gs.height = this.paper.height + "px";
      os.left = x - left + "px";
      os.top = y - top + "px";
      os.width = w + "px";
      return (os.height = h + "px");
    }
  };
  Element.prototype.hide = function() {
    if (!this.removed) {
      this.Group.style.display = "none";
    }
    return this;
  };
  Element.prototype.show = function() {
    if (!this.removed) {
      this.Group.style.display = "block";
    }
    return this;
  };
  Element.prototype.getBBox = function() {
    if (this.removed) {
      return this;
    }
    if (pathlike.hasOwnProperty(this.type)) {
      return pathDimensions(this.attrs.path);
    }
    return {
      x: this.X + (this.bbx || 0),
      y: this.Y,
      width: this.W,
      height: this.H
    };
  };
  Element.prototype.remove = function() {
    var _a, _b, _c, i;
    if (this.removed) {
      return this;
    }
    tear(this, this.paper);
    this.node.parentNode.removeChild(this.node);
    this.Group.parentNode.removeChild(this.Group);
    if (this.shape) {
      this.shape.parentNode.removeChild(this.shape);
    }
    _b = this;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      i = _b[_a];
      delete this[i];
    }
    return (this.removed = true);
  };
  Element.prototype.attr = function(name, value) {
    var _a, _b, _c, i, params, res, values;
    if (this.removed) {
      return this;
    }
    if (!(typeof name !== "undefined" && name !== null)) {
      res = {};
      _b = this.attrs;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        i = _b[_a];
        if (this.attrs.hasOwnProperty(i)) {
          res[i] = this.attrs[i];
        };
      }
      if (this._.rt.deg) {
        res.rotation = this.rotate();
      }
      if (this._.sx !== 1 || this._.sy !== 1) {
        res.scale = this.scale();
      }
      if (res.gradient && res.fill === "none") {
        if ((res.fill = res.gradient)) {
          delete res.gradient;
        };
      };
      return res;
    }
    if (!(typeof value !== "undefined" && value !== null) && Raphael.is(name, "string")) {
      if (name === "translation") {
        return translate.call(this);
      }
      if (name === "rotation") {
        return this.rotate();
      }
      if (name === "scale") {
        return this.scale();
      }
      if (name === "fill" && this.attrs.fill === "none" && this.attrs.gradient) {
        return this.attrs.gradient;
      }
      return this.attrs[name];
    }
    if (this.attrs && !(typeof value !== "undefined" && value !== null) && Raphael.is(name, "array")) {
      values = {};
      for (i = 0; (0 <= name.length - 1 ? i <= name.length - 1 : i >= name.length - 1); (0 <= name.length - 1 ? i += 1 : i -= 1)) {
        values[name[i]] = this.attr(name[i]);
      }
      return values;
    }
    if ((typeof value !== "undefined" && value !== null)) {
      params = {};
      params[name] = value;
    }
    if (!(typeof value !== "undefined" && value !== null) && Raphael.is(name, "object")) {
      params = name;
    }
    if (params) {
      if (params.text && this.type === "text") {
        this.node.string = params.text;
      };
      setFillAndStroke(this, params);
      if (params.gradient && (({
        circle: 1,
        ellipse: 1
      }).hasOwnProperty(this.type) || String(params.gradient).charAt() !== "r")) {
        addGradientFill(this, params.gradient);
      };
      if (!pathlike.hasOwnProperty(this.type) || this._.rt.deg) {
        this.setBox(this.attrs);
      }
    }
    return this;
  };
  Element.prototype.toFront = function() {
    if (!this.removed) {
      this.Group.parentNode.appendChild(this.Group);
    }
    if (this.paper.top !== this) {
      tofront(this, this.paper);
    }
    return this;
  };
  Element.prototype.toBack = function() {
    if (this.removed) {
      return this;
    }
    if (this.Group.parentNode.firstChild !== this.Group) {
      this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
      toback(this, this.paper);
    }
    return this;
  };
  Element.prototype.insertAfter = function(element) {
    if (this.removed) {
      return this;
    }
    if (element.constructor === Set) {
      element = element[element.length];
    };
    if (element.Group.nextSibling) {
      element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
    } else {
      element.Group.parentNode.appendChild(this.Group);
    };
    insertafter(this, element, this.paper);
    return this;
  };
  Element.prototype.insertBefore = function(element) {
    if (this.removed) {
      return this;
    }
    if (element.constructor === Set) {
      element = element[0];
    };
    element.Group.parentNode.insertBefore(this.Group, element.Group);
    insertbefore(this, element, this.paper);
    return this;
  };
  Element.prototype.blur = function(size) {
    var blurregexp, f, s;
    blurregexp = /[ ]progid:\S+Blur\([^\)]+\)/g;
    s = this.node.runtimeStyle;
    f = s.filter;
    f = f.replace(blurregexp, E);
    if (+size !== 0) {
      !(attrs.blur = size);
      s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
      return (s.margin = Raphael.format("-{0}px 0 0 -{0}px", Math.round(+size || 1.5)));
    } else {
      s.filter = f;
      s.margin = 0;
      return delete this.attrs.blur;
    }
  };
  Raphael.prototype.theCircle = function(vml, x, y, r) {
    var g, o, ol, res;
    g = createNode("group");
    o = createNode("oval");
    ol = o.style;
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = coordsize;
    g.coordorigin = vml.coordorigin;
    g.appendChild(o);
    res = new Element(o, g, vml);
    res.type = "circle";
    setFillAndStroke(res, {
      stroke: "#000",
      fill: "none"
    });
    res.attrs.cx = x;
    res.attrs.cy = y;
    res.attrs.r = r;
    res.setBox({
      x: x - r,
      y: y - r,
      width: r * 2,
      height: r * 2
    });
    vml.canvas.appendChild(g);
    return res;
  };
  Raphael.prototype.rectPath = function(x, y, w, h, r) {
    return r ? Raphael.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", x + r, y, w - r * 2, r, -r, h - r * 2, r * 2 - w, r * 2 - h) : Raphael.format("M{0},{1}l{2},0,0,{3},{4},0z", x, y, w, h, -w);
  };
  Raphael.prototype.theRect = function(vml, x, y, w, h, r) {
    var a, path, res;
    path = rectPath(x, y, w, h, r);
    res = vml.path(path);
    a = res.attrs;
    res.X = (a.x = x);
    res.Y = (a.y = y);
    res.W = (a.width = w);
    res.H = (a.height = h);
    a.r = r;
    a.path = path;
    res.type = "rect";
    return res;
  };
  Raphael.prototype.theEllipse = function(vml, x, y, rx, ry) {
    var g, o, ol, res;
    g = createNode("group");
    o = createNode("oval");
    ol = o.style;
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = coordsize;
    g.coordorigin = vml.coordorigin;
    g.appendChild(o);
    res = new Element(o, g, vml);
    res.type = "ellipse";
    setFillAndStroke(res, {
      stroke: "#000"
    });
    res.attrs.cx = x;
    res.attrs.cy = y;
    res.attrs.rx = rx;
    res.attrs.ry = ry;
    res.setBox({
      x: x - rx,
      y: y - ry,
      width: rx * 2,
      height: ry * 2
    });
    vml.canvas.appendChild(g);
    return res;
  };
  Raphael.prototype.theImage = function(vml, src, x, y, w, h) {
    var g, o, ol, res;
    g = createNode("group");
    o = createNode("image");
    ol = o.style;
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = coordsize;
    g.coordorigin = vml.coordorigin;
    o.src = src;
    g.appendChild(o);
    res = new Element(o, g, vml);
    res.type = "image";
    res.attrs.src = src;
    res.attrs.x = x;
    res.attrs.y = y;
    res.attrs.w = w;
    res.attrs.h = h;
    res.setBox({
      x: x,
      y: y,
      width: w,
      height: h
    });
    vml.canvas.appendChild(g);
    return res;
  };
  Raphael.prototype.theText = function(vml, x, y, text) {
    var el, g, o, ol, path, ps, res;
    g = createNode("group");
    el = createNode("shape");
    ol = el.style;
    path = createNode("path");
    ps = path.style;
    o = createNode("textpath");
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = coordsize;
    g.coordorigin = vml.coordorigin;
    path.v = Raphael.format("m{0},{1}l{2},{1}", Math.round(x * 10), Math.round(y * 10), Math.round(x * 10) + 1);
    path.textpathok = true;
    ol.width = vml.width;
    ol.height = vml.height;
    o.string = String(text);
    o.on = true;
    el.appendChild(o);
    el.appendChild(path);
    g.appendChild(el);
    res = new Element(o, g, vml);
    res.shape = el;
    res.textpath = path;
    res.type = "text";
    res.attrs.text = text;
    res.attrs.x = x;
    res.attrs.y = y;
    res.attrs.w = 1;
    res.attrs.h = 1;
    setFillAndStroke(res, {
      font: this.availableAttrs.font,
      stroke: "none",
      fill: "#000"
    });
    res.setBox();
    vml.canvas.appendChild(g);
    return res;
  };
  Raphael.prototype.setSize = function(width, height) {
    var cs;
    cs = this.canvas.style;
    if (width === +width) {
      width += "px";
    }
    if (height === +height) {
      height += "px";
    }
    cs.width = width;
    cs.height = height;
    cs.clip = "rect(0 " + width + " " + height + " 0)";
    return this;
  };
  document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
  try {
    !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
    createNode = function(tagName) {
      return document.createElement('<' + 'rvml:' + tagName + ' class="rvml">');
    };
  } catch (error) {
    createNode = function(tagName) {
      return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
    };
  }
  Raphael.prototype.create = function() {
    var c, con, container, cs, height, res, width, x, y;
    con = getContainer.apply(0, arguments);
    container = con.container;
    height = con.height;
    width = con.width;
    x = con.x;
    y = con.y;
    if (!container) {
      throw new Error("VML container not found.");
    }
    res = new Paper();
    c = (res.canvas = document.createElement("div"));
    cs = c.style;
    x = (typeof x !== "undefined" && x !== null) ? x : 0;
    y = (typeof y !== "undefined" && y !== null) ? y : 0;
    width = (typeof width !== "undefined" && width !== null) ? width : 512;
    height = (typeof height !== "undefined" && height !== null) ? height : 342;
    if (width === +width) {
      width += "px";
    }
    if (height === +height) {
      height += "px";
    }
    res.width = 1e3;
    res.height = 1e3;
    res.coordsize = zoom * 1e3 + S + zoom * 1e3;
    res.coordorigin = "0 0";
    res.span = document.createElement("span");
    res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
    c.appendChild(res.span);
    cs.cssText = Raphael.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
    if (container === 1) {
      document.body.appendChild(c);
      cs.left = x + "px";
      cs.top = y + "px";
      cs.position = "absolute";
    } else {
      if (container.firstChild) {
        container.insertBefore(c, container.firstChild);
      } else {
        container.appendChild(c);
      };
    }
    plugins.call(res, res, Raphael.fn);
    return res;
  };
  Paper.prototype.clear = function() {
    this.canvas.innerHTML = E;
    this.span = document.createElement("span");
    this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
    this.canvas.appendChild(this.span);
    return (this.bottom = (this.top = null));
  };
  Paper.prototype.remove = function() {
    var _a, _b, _c, i;
    this.canvas.parentNode.removeChild(this.canvas);
    _b = this;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      i = _b[_a];
      this[i] = removed(i);
    }
    return true;
  };
}
if (((navigator.vendor === "Apple Computer, Inc.") && (navigator.userAgent.match(/Version\/(.*?)\s/)[1] < 4 || window.navigator.platform.slice(0, 2) === "iP"))) {
  Paper.prototype.safari = function() {
    var rect;
    rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
      stroke: "none"
    });
    return window.setTimeout(function() {
      return rect.remove();
    });
  };
} else {
  Paper.prototype.safari = function() {};
};
preventDefault = function() {
  return (this.returnValue = false);
};
preventTouch = function() {
  return this.originalEvent.preventDefault();
};
stopPropagation = function() {
  return (this.cancelBubble = true);
};
stopTouch = function() {
  return this.originalEvent.stopPropagation();
};
addEvent = (function() {
  if (document.addEventListener) {
    return function(obj, type, fn, element) {
      var f, realName;
      realName = supportsTouch && touchMap[type] ? touchMap[type] : type;
      f = function(e) {
        var _a, i, olde;
        if (supportsTouch && touchMap.hasOwnProperty(type)) {
          _a = (e.targetTouches && e.targetTouches.length - 1);
          for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
            if (e.targetTouches[i].target === obj) {
              olde = e;
              e = e.targetTouches[i];
              e.originalEvent = olde;
              e.preventDefault = preventTouch;
              e.stopPropagation = stopTouch;
              break;
            }
          }
        }
        return fn.call(element, e);
      };
      obj.addEventListener(realName, f, false);
      return function() {
        obj.removeEventListener(realName, f, false);
        return true;
      };
    };
  } else if (document.attachEvent) {
    return function(obj, type, fn, element) {
      var detacher, f;
      f = function(e) {
        e = e || window.event;
        e.preventDefault = e.preventDefault || preventDefault;
        e.stopPropagation = e.stopPropagation || stopPropagation;
        return fn.call(element, e);
      };
      obj.attachEvent("on" + type, f);
      detacher = function() {
        obj.detachEvent("on" + type, f);
        return true;
      };
      return detacher;
    };
  }
})();
drag = [];
dragMove = function(e) {
  var _a, dragi, i, j, touch, x, y;
  x = e.clientX;
  y = e.clientY;
  j = drag.length;
  _a = [];
  while (j--) {
    dragi = drag[j];
    if (supportsTouch) {
      i = e.touches.length;
      while (i--) {
        touch = e.touches[i];
        if (touch.identifier === dragi.el._drag.id) {
          x = touch.clientX;
          y = touch.clientY;
          (e.originalEvent ? e.originalEvent : e).preventDefault();
          break;
        }
      }
    } else {
      e.preventDefault();
    }
    if (dragi.move) {
      dragi.move.call(dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y);
    }
  }
  return _a;
};
dragUp = function() {
  var dragi, i;
  Raphael.unmousemove(dragMove).unmouseup(dragUp);
  i = drag.length;
  while (i--) {
    dragi = drag[i];
    dragi.el._drag = {};
    dragi.end && dragi.end.call(dragi.el);
  }
  return (drag = []);
};
_b = Raphael.events;
for (_a = 0, _c = _b.length; _a < _c; _a++) {
  (function() {
    var event = _b[_a];
    return (function(eventName) {
      Raphael[eventName] = (Element.prototype[eventName] = function(fn) {
        if (Raphael.is(fn, "function")) {
          this.events = this.events || [];
          this.events.push({
            name: eventName,
            f: fn,
            unbind: addEvent(this.shape || this.node || document, eventName, fn, this)
          });
        }
        return this;
      });
      return (Raphael["un" + eventName] = (Element.prototype["un" + eventName] = function(fn) {
        var events, l;
        events = this.events;
        l = events.length;
        while (l--) {
          if (events[l].name === eventName && events[l].f === fn) {
            events[l].unbind();
            events.splice(l, 1);
            if (!events.length) {
              delete this.events;
            }
            this;
          }
        }
        return this;
      }));
    })(event);
  })();
}
Element.prototype.hover = function(f_in, f_out) {
  return this.mouseover(f_in).mouseout(f_out);
};
Element.prototype.unhover = function(f_in, f_out) {
  return this.unmouseover(f_in).unmouseout(f_out);
};
Element.prototype.drag = function(onmove, onstart, onend) {
  this._drag = {};
  this.mousedown(function(e) {
    (e.originalEvent || e).preventDefault();
    this._drag.x = e.clientX;
    this._drag.y = e.clientY;
    this._drag.id = e.identifier;
    if (onstart) {
      onstart.call(this, e.clientX, e.clientY);
    }
    if (!drag.length) {
      Raphael.mousemove(dragMove).mouseup(dragUp);
    }
    return drag.push({
      el: this,
      move: onmove,
      end: onend
    });
  });
  return this;
};
Element.prototype.undrag = function(onmove, onstart, onend) {
  var _d, i;
  i = drag.length;
  _d = [];
  while (i--) {
    _d.push((function() {
      drag[i].el === this && (drag[i].move === onmove && drag[i].end === onend) && drag.splice(i, 1);
      if (!drag.length) {
        return Raphael.unmousemove(dragMove).unmouseup(dragUp);
      }
    }).call(this));
  }
  return _d;
};
Paper.prototype.circle = function(x, y, r) {
  return theCircle(this, x || 0, y || 0, r || 0);
};
Paper.prototype.rect = function(x, y, w, h, r) {
  return theRect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
};
Paper.prototype.ellipse = function(x, y, rx, ry) {
  return theEllipse(this, x || 0, y || 0, rx || 0, ry || 0);
};
Paper.prototype.path = function(pathString) {
  if (pathString && !Raphael.is(pathString, "string") && !Raphael.is(pathString[0], "array")) {
    pathString += E;
  }
  return thePath(Raphael.format.apply(Raphael, arguments), this);
};
Paper.prototype.image = function(src, x, y, w, h) {
  return theImage(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
};
Paper.prototype.text = function(x, y, text) {
  return theText(this, x || 0, y || 0, text || E);
};
Paper.prototype.set = function(itemsArray) {
  if (arguments.length > 1) {
    itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length);
  }
  return new Set(itemsArray);
};
Paper.prototype.setSize = Raphael.prototype.setSize;
Paper.prototype.top = (Paper.prototype.bottom = null);
Paper.prototype.raphael = Raphael;
Element.prototype.x_y = function() {
  return this.x + S + this.y;
};
Element.prototype.resetScale = function() {
  if ((this.removed)) {
    return this;
  }
  this._.sx = 1;
  this._.sy = 1;
  return (this.attrs.scale = "1 1");
};
Element.prototype.scale = function(x, y, cx, cy) {
  var P0, _d, _e, _f, _g, a, bb, dim2, dirx, diry, dx, dy, i, j, kx, ky, ncx, ncy, newh, neww, p, path, rcx, rcy, s, skip;
  if ((this.removed)) {
    return this;
  }
  if (x === null && y === null) {
    ({
      x: this._.sx,
      y: this._.sy,
      toString: this.x_y
    });
  };
  y = (typeof y !== "undefined" && y !== null) ? y : x;
  if (!+y) {
    y = x;
  }
  a = this.attrs(123);
  if (x !== 0) {
    bb = this.getBBox();
    rcx = bb.x + bb.width / 2;
    rcy = bb.y + bb.height / 2;
    kx = x / this._.sx;
    ky = y / this._.sy;
    cx = +cx || cx === 0 ? cx : rcx;
    cy = +cy || cy === 0 ? cy : rcy;
    dirx = ~~(x / Math.abs(x));
    diry = ~~(y / Math.abs(y));
    s = this.node.style;
    ncx = cx + (rcx - cx) * kx;
    ncy = cy + (rcy - cy) * ky;
    if ((_d = this.type) === "rect" || _d === "image") {
      neww = a.width * dirx * kx;
      newh = a.height * diry * ky;
      this.attr({
        height: newh,
        r: a.r * Math.min(dirx * kx, diry * ky),
        width: neww,
        x: ncx - neww / 2,
        y: ncy - newh / 2
      });
    } else if (_d === "circle" || _d === "ellipse") {
      this.attr({
        rx: a.rx * dirx * kx,
        ry: a.ry * diry * ky,
        r: a.r * Math.min(dirx * kx, diry * ky),
        cx: ncx,
        cy: ncy
      });
    } else if (_d === "text") {
      this.attr({
        x: ncx,
        y: ncy
      });
    } else if (_d === "path") {
      path = pathToRelative(a.path);
      skip = true;
      for (i = 0; (0 <= path.length - 1 ? i <= path.length - 1 : i >= path.length - 1); (0 <= path.length - 1 ? i += 1 : i -= 1)) {
        p = path[i];
        P0 = String.prototype.toUpperCase.call(p[0]);
        if (P0 === "M" && skip) {
          continue;
        } else {
          skip = false;
        }
        if (P0 === "A") {
          p[path[i].length - 2] *= kx;
          p[path[i].length - 1] *= ky;
          p[1] *= dirx * kx;
          p[2] *= diry * ky;
          p[5] = +!(dirx + diry ? !+p[5] : +p[5]);
        } else if (P0 === "H") {
          for (j = 1; (1 <= p.length - 1 ? j <= p.length - 1 : j >= p.length - 1); (1 <= p.length - 1 ? j += 1 : j -= 1)) {
            p[j] *= kx;
          }
        } else if (P0 === "V") {
          for (j = 1; (1 <= p.length - 1 ? j <= p.length - 1 : j >= p.length - 1); (1 <= p.length - 1 ? j += 1 : j -= 1)) {
            p[j] *= ky;
          }
        } else {
          for (j = 1; (1 <= p.length - 1 ? j <= p.length - 1 : j >= p.length - 1); (1 <= p.length - 1 ? j += 1 : j -= 1)) {
            p[j] *= j % 2 ? kx : ky;
          }
        }
      }
      dim2 = pathDimensions(path);
      dx = ncx - dim2.x - dim2.width / 2;
      dy = ncy - dim2.y - dim2.height / 2;
      path[0][1] += dx;
      path[0][2] += dy;
      this.attr({
        path: path
      });
    }
    if ((function(){ (_e = this.type); for (var _f=0, _g=({
      text: 1,
      image: 1
    }) && (dirx !== 1 || diry !== 1).length; _f<_g; _f++) { if (({
      text: 1,
      image: 1
    }) && (dirx !== 1 || diry !== 1)[_f] === _e) return true; } return false; }).call(this)) {
      if (this.transformations) {
        this.transformations[2] = "scale(".concat(dirx, ",", diry, ")");
        this.node[setAttribute]("transform", this.transformations.join(S));
        dx = dirx === -1 ? -a.x - (neww || 0) : a.x;
        dy = diry === -1 ? -a.y - (newh || 0) : a.y;
        this.attr({
          x: dx,
          y: dy
        });
        a.fx = dirx - 1;
        a.fy = diry - 1;
      } else {
        this.node.filterMatrix = ms + ".Matrix(M11=".concat(dirx, ", M12=0, M21=0, M22=", diry, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
        s.filter = (this.node.filterMatrix || E) + (this.node.filterOpacity || E);
      }
    } else {
      if (this.transformations) {
        this.transformations[2] = E;
        this.node[setAttribute]("transform", this.transformations.join(S));
        a.fx = 0;
        a.fy = 0;
      } else {
        this.node.filterMatrix = E;
        s.filter = (this.node.filterMatrix || E) + (this.node.filterOpacity || E);
      }
    }
    a.scale = [x, y, cx, cy].join(S);
    this._.sx = x;
    this._.sy = y;
  }
  return this;
};
Element.prototype.clone = function() {
  var attr;
  if (this.removed) {
    return null;
  }
  attr = this.attr();
  delete attr.scale;
  delete attr.translation;
  return this.paper[this.type]().attr(attr);
};
getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
  var _d, dot, i, j, len, old;
  len = 0;
  _d = [];
  for (i = 0; i <= 101; i++) {
    _d.push((function() {
      j = i / 100;
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, j);
      if (j) {
        len += Math.pow(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2), .5);
      }
      if (len >= length) {
        dot;
      };
      return (old = dot);
    })());
  }
  return _d;
};
functionCacher(getPointAtSegmentLength);
getLengthFactory = function(istotal, subpath) {
  return function(path, length, onlystart) {
    var i, l, len, p, point, sp, subpaths, x, y;
    path = pathToCurve(path);
    sp = "";
    subpaths = {};
    len = 0;
    for (i = 0; (0 <= path.length - 1 ? i <= path.length - 1 : i >= path.length - 1); (0 <= path.length - 1 ? i += 1 : i -= 1)) {
      p = path[i];
      if (p[0] === "M") {
        x = +p[1];
        y = +p[2];
      } else {
        l = segmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
        if (len + l > length) {
          if (subpath && !subpaths.start) {
            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
            sp += ["C", point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
            if (onlystart) {
              return sp;
            }
            subpaths.start = sp;
            sp = ["M", point.x, point.y + "C", point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
            len += l;
            x = +p[5];
            y = +p[6];
            continue;
          }
          if (!istotal && !subpath) {
            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
            ({
              x: point.x,
              y: point.y,
              alpha: point.alpha
            });
          }
        }
        len += l;
        x = +p[5];
        y = +p[6];
      }
      sp += p;
    }
    subpaths.end = sp;
    point = (function() {
      if (istotal) {
        return len;
      } else if (subpath) {
        return subpaths;
      } else {
        return Raphael.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1);
      }
    })();
    if (point.alpha) {
      point = {
        x: point.x,
        y: point.y,
        alpha: point.alpha
      };
    }
    return point;
  };
};
segmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
  var dot, i, j, len, old;
  old = {
    x: 0,
    y: 0
  };
  len = 0;
  for (i = 0; i <= 101; i++) {
    j = i / 100;
    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i);
    if (i) {
      len += Math.pow(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2), .5);
    }
    old = dot;
  }
  return len;
};
functionCacher(segmentLength);
getTotalLength = getLengthFactory(1);
getPointAtLength = getLengthFactory();
getSubpathsAtLength = getLengthFactory(0, 1);
Element.prototype.getTotalLength = function() {
  if (this.type !== "path") {
    return null;
  }
  if (this.node.getTotalLength) {
    return this.node.getTotalLength();
  }
  return getTotalLength(this.attrs.path);
};
Element.prototype.getPointAtLength = function(length) {
  if (this.type !== "path") {
    return null;
  }
  if (this.node.getPointAtLength) {
    return this.node.getPointAtLength(length);
  }
  return getPointAtLength(this.attrs.path, length);
};
Element.prototype.getSubpath = function(from, to) {
  var a;
  if (this.type !== "path") {
    return null;
  }
  if (Math.abs(this.getTotalLength() - to) < 1e-6) {
    return getSubpathsAtLength(this.attrs.path, from).end;
  }
  a = getSubpathsAtLength(this.attrs.path, to, 1);
  return from ? getSubpathsAtLength(a, from).end : a;
};
Raphael.easing_formulas = {
  linear: function(n) {
    return n;
  },
  "<": function(n) {
    return Math.pow(n, 3);
  },
  ">": function(n) {
    return Math.pow(n - 1, 3) + 1;
  },
  "<>": function(n) {
    n = n * 2;
    if (n < 1) {
      return Math.pow(n, 3) / 2;
    }
    n -= 2;
    return (Math.pow(n, 3) + 2) / 2;
  },
  backIn: function(n) {
    var s;
    s = 1.70158;
    return n * n * ((s + 1) * n - s);
  },
  backOut: function(n) {
    var s;
    n = n - 1;
    s = 1.70158;
    return n * n * ((s + 1) * n + s) + 1;
  },
  elastic: function(n) {
    var p, s;
    if (n === 0 || n === 1) {
      return n;
    }
    p = .3;
    s = p / 4;
    return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
  },
  bounce: function(n) {
    var l, p, s;
    s = 7.5625;
    p = 2.75;
    if (n < (1 / p)) {
      l = s * n * n;
    } else {
      if (n < (2 / p)) {
        n -= (1.5 / p);
        l = s * n * n + .75;
      } else {
        if (n < (2.5 / p)) {
          n -= (2.25 / p);
          l = s * n * n + .9375;
        } else {
          n -= (2.625 / p);
          l = s * n * n + .984375;
        }
      }
    }
    return l;
  }
};
animationElements = {
  length: 0
};
animation = function() {
  var Now, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, attr, callback, diff, e, easing, from, i, j, l, ms, now, point, pos, prev, set, t, that, time, to, x, y;
  Now = +new Date();
  _e = animationElements;
  for (_d = 0, _f = _e.length; _d < _f; _d++) {
    l = _e[_d];
    if (l !== "length" && animationElements.hasOwnProperty(l)) {
      e = animationElements[l];
      if (e.stop || e.el.removed) {
        delete animationElements[l];
        animationElements.length--;
        continue;
      }
      time = Now - e.start;
      ms = e.ms;
      easing = e.easing;
      from = e.from;
      diff = e.diff;
      to = e.to;
      t = e.t;
      prev = e.prev || 0;
      that = e.el;
      callback = e.callback;
      set = {};
      if (time < ms) {
        pos = Raphael.easing_formulas[easing] ? Raphael.easing_formulas[easing](time / ms) : time / ms;
        _h = from;
        for (_g = 0, _i = _h.length; _g < _i; _g++) {
          attr = _h[_g];
          if (from.hasOwnProperty(attr)) {
            if ((_j = Raphael.availableAnimAttrs[attr]) === "along") {
              now = pos * ms * diff[attr];
              if (to.back) {
                now = to.len - now;
              }
              point = getPointAtLength(to[attr], now);
              that.translate(diff.sx - diff.x || 0, diff.sy - diff.y || 0);
              diff.x = point.x;
              diff.y = point.y;
              that.translate(point.x - diff.sx, point.y - diff.sy);
              if (to.rot) {
                that.rotate(diff.r + point.alpha, point.x, point.y);
              }
            } else if (_j === "number") {
              now = +from[attr] + pos * ms * diff[attr];
            } else if (_j === "colour") {
              now = "rgb(" + [upto255(Math.round(from[attr].r + pos * ms * diff[attr].r)), upto255(Math.round(from[attr].g + pos * ms * diff[attr].g)), upto255(Math.round(from[attr].b + pos * ms * diff[attr].b))].join(",") + ")";
            } else if (_j === "path") {
              now = [];
              for (i = 0; (0 <= from[attr].length - 1 ? i <= from[attr].length - 1 : i >= from[attr].length - 1); (0 <= from[attr].length - 1 ? i += 1 : i -= 1)) {
                now[i] = [from[attr][i][0]];
                for (j = 1; (1 <= from[attr][i].length - 1 ? j <= from[attr][i].length - 1 : j >= from[attr][i].length - 1); (1 <= from[attr][i].length - 1 ? j += 1 : j -= 1)) {
                  now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                }
                now[i] = now[i].join(S);
              }
              now = now.join(S);
            } else if (_j === "csv") {
              if (attr === "translation") {
                x = diff[attr][0] * (time - prev);
                y = diff[attr][1] * (time - prev);
                t.x += x;
                t.y += y;
                now = x + S + y;
              } else if (attr === "rotation") {
                now = +from[attr][0] + pos * ms * diff[attr][0];
                if (from[attr][1]) {
                  now += "," + from[attr][1] + "," + from[attr][2];
                }
              } else if (attr === "scale") {
                now = [+from[attr][0] + pos * ms * diff[attr][0], +from[attr][1] + pos * ms * diff[attr][1], ((function(){ for (var _l=0, _m=(_k = to[attr]).length; _l<_m; _l++) { if (_k[_l] === 2) return true; } return false; }).call(this) ? to[attr][2] : E), ((function(){ for (var _o=0, _p=(_n = to[attr]).length; _o<_p; _o++) { if (_n[_o] === 3) return true; } return false; }).call(this) ? to[attr][3] : E)].join(S);
              } else if (attr === "clip-rect") {
                now = [];
                i = 4;
                while (i--) {
                  now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                }
              }
            }
            set[attr] = now;
          }
        }
        that.attr(set);
        if (that._run) {
          that._run.call(that);
        }
      } else {
        if (to.along) {
          point = getPointAtLength(to.along, to.len * !to.back);
          that.translate(diff.sx - (diff.x || 0) + point.x - diff.sx, diff.sy - (diff.y || 0) + point.y - diff.sy);
          if (to.rot) {
            that.rotate(diff.r + point.alpha, point.x, point.y);
          }
        }
        (t.x || t.y) && that.translate(-t.x, -t.y);
        if (to.scale) {
          to.scale += E;
        }
        that.attr(to);
        delete animationElements[l];
        animationElements.length--;
        that.in_animation = null;
        if (Raphael.is(callback, "function")) {
          callback.call(that);
        }
      }
      e.prev = time;
    }
  }
  if (Raphael.svg && that && that.paper) {
    that.paper.safari();
  }
  if (animationElements.length) {
    return window.setTimeout(animation);
  }
};
upto255 = function(color) {
  return Math.max(Math.min(color, 255), 0);
};
Element.prototype.translate = function(x, y) {
  var _d, path;
  if (x === null) {
    return {
      x: this._.tx,
      y: this._.ty,
      toString: this.x_y
    };
    this._.tx += +x;
    this._.ty += +y;
    if ((_d = this.type) === "circle" || _d === "ellipse") {
      this.attr({
        cx: +x + this.attrs.cx,
        cy: +y + this.attrs.cy
      });
    } else if (_d === "rect" || _d === "image" || _d === "text") {
      this.attr({
        x: +x + this.attrs.x,
        y: +y + this.attrs.y
      });
    } else if (_d === "path") {
      path = pathToRelative(this.attrs.path);
      path[0][1] += +x;
      path[0][2] += +y;
      this.attr({
        path: path
      });
    }
  }
  return this;
};
Element.prototype.animateWith = function(element, params, ms, easing, callback) {
  if (animationElements[element.id]) {
    params.start = animationElements[element.id].start;
  }
  return this.animate(params, ms, easing, callback);
};
along = function(isBack) {
  return function(path, ms, rotate, callback) {
    var params;
    params = {
      back: isBack
    };
    if (Raphael.is(rotate, "function")) {
      (callback = rotate);
    } else {
      (params.rot = rotate);
    };
    if (path && path.constructor === Element) {
      path = path.attrs.path;
    }
    if (path) {
      params.along = path;
    }
    return this.animate(params, ms, callback);
  };
};
Element.prototype.animateAlong = along();
Element.prototype.animateAlongBack = along(1);
Element.prototype.onAnimation = function(f) {
  this._run = f || 0;
  return this;
};
Element.prototype.animate = function(params, ms, easing, callback) {
  var _d, _e, _f, _g, _h, attr, bb, diff, from, from2, i, j, len, pathes, point, to, toColour, toPath, values;
  if (Raphael.is(easing, "function") || !easing) {
    callback = easing || null;
  };
  from = {};
  to = {};
  diff = {};
  _e = params;
  for (_d = 0, _f = _e.length; _d < _f; _d++) {
    attr = _e[_d];
    if (params.hasOwnProperty(attr)) {
      if (Raphael.availableAnimAttrs.hasOwnProperty(attr)) {
        from[attr] = this.attr(attr);
        if (from[attr] === null) {
          from[attr] = this.availableAttrs[attr];
        }
        to[attr] = params[attr];
        if ((_g = Raphael.availableAnimAttrs[attr]) === "along") {
          len = getTotalLength(params[attr]);
          point = getPointAtLength(params[attr], len * !!params.back);
          bb = this.getBBox();
          diff[attr] = len / ms;
          diff.tx = bb.x;
          diff.ty = bb.y;
          diff.sx = point.x;
          diff.sy = point.y;
          to.rot = params.rot;
          to.back = params.back;
          to.len = len;
          if (params.rot) {
            diff.r = parseFloat(this.rotate()) || 0;
          }
        } else if (_g === "number") {
          diff[attr] = (to[attr] - from[attr]) / ms;
        } else if (_g === "colour") {
          from[attr] = Raphael.getRGB(from[attr]);
          toColour = Raphael.getRGB(to[attr]);
          diff[attr] = {
            r: (toColour.r - from[attr].r) / ms,
            g: (toColour.g - from[attr].g) / ms,
            b: (toColour.b - from[attr].b) / ms
          };
        } else if (_g === "path") {
          pathes = pathToCurve(from[attr], to[attr]);
          from[attr] = pathes[0];
          toPath = pathes[1];
          diff[attr] = [];
          for (i = 0; (0 <= from[attr].length - 1 ? i <= from[attr].length - 1 : i >= from[attr].length - 1); (0 <= from[attr].length - 1 ? i += 1 : i -= 1)) {
            diff[attr][i] = [0];
            for (j = 1; (1 <= from[attr][i].length - 1 ? j <= from[attr][i].length - 1 : j >= from[attr][i].length - 1); (1 <= from[attr][i].length - 1 ? j += 1 : j -= 1)) {
              diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
            }
          }
        } else if (_g === "csv") {
          values = String(params[attr]).split(separator);
          from2 = String(from[attr]).split(separator);
          if (attr === "translation") {
            from[attr] = [0, 0];
            diff[attr] = [values[0] / ms, values[1] / ms];
          } else if (attr === "rotation") {
            from[attr] = (typeof (_h = (from2[1] === values[1] && from2[2] === values[2])) !== "undefined" && _h !== null) ? (from2[1] === values[1] && from2[2] === values[2]) : {
              from2: [0, values[1], values[2]]
            };
            diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0];
          } else if (attr === "scale") {
            params[attr] = values;
            from[attr] = String(from[attr]).split(separator);
            diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][1]) / ms, 0, 0];
          } else if (attr === "clip-rect") {
            from[attr] = String(from[attr]).split(separator);
            diff[attr] = [];
            i = 4;
            while (i--) {
              diff[attr][i] = (values[i] - from[attr][i]) / ms;
            }
          }
          to[attr] = values;
        }
      }
    }
  }
  this.stop();
  this.in_animation = 1;
  animationElements[this.id] = {
    start: params.start || +new Date(),
    ms: ms,
    easing: easing,
    from: from,
    diff: diff,
    to: to,
    el: this,
    callback: callback,
    t: {
      x: 0,
      y: 0
    }
  };
  if (++animationElements.length === 1) {
    animation();
  }
  return this;
};
Element.prototype.stop = function() {
  if (animationElements[this.id]) {
    animationElements.length--;
  }
  delete animationElements[this.id];
  return this;
};
Element.prototype.translate = function(x, y) {
  return this.attr({
    translation: x + " " + y
  });
};
Element.prototype.toString = function() {
  return "Rapha\xebl\u2019s object";
};
Raphael.ae = animationElements;
Set = function() {};
Set.prototype.contructor = function(items) {
  var _d, i;
  this.items = [];
  this.length = 0;
  this.type = "set";
  if (items) {
    _d = [];
    for (i = 0; (0 <= items.length - 1 ? i <= items.length - 1 : i >= items.length - 1); (0 <= items.length - 1 ? i += 1 : i -= 1)) {
      _d.push((function() {
        if (items[i] && (items[i].constructor === Element || items[i].constructor === Set)) {
          this[this.items.length] = (this.items[this.items.length] = items[i]);
          return this.length++;
        }
      }).call(this));
    }
    return _d;
  }
};
Set.prototype.push = function() {
  var i, item, len;
  for (i = 0; (0 <= arguments.length - 1 ? i <= arguments.length - 1 : i >= arguments.length - 1); (0 <= arguments.length - 1 ? i += 1 : i -= 1)) {
    item = arguments[i];
    if (item && (item.constructor === Element || item.constructor === Set)) {
      len = this.items.length;
      this[len] = (this.items[len] = item);
      this.length++;
    }
  }
  return this;
};
Set.prototype.pop = function() {
  delete this[this.length--];
  return this.items.pop();
};
Set.prototype.attr = function(name, value) {
  var i, j;
  if (name && Raphael.is(name, "array") && Raphael.is(name[0], "object")) {
    for (j = 0; (0 <= name.length - 1 ? j <= name.length - 1 : j >= name.length - 1); (0 <= name.length - 1 ? j += 1 : j -= 1)) {
      this.items[j].attr(name[j]);
    }
  } else {
    for (i = 0; (0 <= this.items.length - 1 ? i <= this.items.length - 1 : i >= this.items.length - 1); (0 <= this.items.length - 1 ? i += 1 : i -= 1)) {
      this.items[i].attr(name, value);
    }
  }
  return this;
};
Set.prototype.animate = function(params, ms, easing, callback) {
  var collector, i, item, len, set;
  if (Raphael.is(easing, "function") || !easing) {
    callback = easing || null;
  }
  len = this.items.length;
  i = len;
  set = this;
  if (callback) {
    collector = function() {
      return !--len && callback.call(set);
    };
  };
  easing = Raphael.is(easing, "string") ? easing : collector;
  item = this.items[--i].animate(params, ms, easing, collector);
  while (i--) {
    this.items[i].animateWith(item, params, ms, easing, collector);
  }
  return this;
};
Set.prototype.insertAfter = function(el) {
  var i;
  i = this.items.length;
  while (i--) {
    this.items[i].insertAfter(el);
  }
  return this;
};
Set.prototype.getBBox = function() {
  var _d, box, h, i, w, x, y;
  x = (y = (w = (h = [])));
  _d = this.items.length;
  for (i = _d; (_d <= 0 ? i <= 0 : i >= 0); (_d <= 0 ? i += 1 : i -= 1)) {
    box = this.items[i].getBBox();
    x.push(box.x);
    y.push(box.y);
    w.push(box.x + box.width);
    h.push(box.y + box.height);
  }
  x = Math.min.apply(0, x);
  y = Math.min.apply(0, y);
  return {
    x: x,
    y: y,
    width: Math.max.apply(0, w) - x,
    height: Math.max.apply(0, h) - y
  };
};
Set.prototype.clone = function(s) {
  var i;
  s = new Set();
  for (i = 0; (0 <= this.items.length - 1 ? i <= this.items.length - 1 : i >= this.items.length - 1); (0 <= this.items.length - 1 ? i += 1 : i -= 1)) {
    s.push(this.items[i].clone());
  }
  return s;
};
_e = Element.prototype;
for (_d = 0, _f = _e.length; _d < _f; _d++) {
  (function() {
    var method = _e[_d];
    return Element.prototype.hasOwnProperty(method) ? (Set.prototype[method] = (function(methodname) {
      return function() {
        var i;
        for (i = 0; (0 <= this.items.length - 1 ? i <= this.items.length - 1 : i >= this.items.length - 1); (0 <= this.items.length - 1 ? i += 1 : i -= 1)) {
          this.items[i][methodname].apply(this.items[i], arguments);
        }
        return this;
      };
    })(method)) : null;
  })();
}
Raphael.prototype.registerFont = function(font) {
  var _g, _h, _i, _j, _k, _l, family, fontcopy, prop;
  if (!font.face) {
    return font;
  }
  this.fonts = this.fonts || {};
  fontcopy = {
    w: font.w,
    face: {},
    glyphs: {}
  };
  family = font.face["font-family"];
  _h = font.face;
  for (_g = 0, _i = _h.length; _g < _i; _g++) {
    prop = _h[_g];
    if (font.face.hasOwnProperty(prop)) {
      fontcopy.face[prop] = font.face[prop];
    };
  }
  if (this.fonts[family]) {
    this.fonts[family].push(fontcopy);
  } else {
    this.fonts[family] = [fontcopy];
  };
  if (!font.svg) {
    fontcopy.face["units-per-em"] = parseInt(font.face["units-per-em"], 10);
    _k = font.glyphs;
    for (_j = 0, _l = _k.length; _j < _l; _j++) {
      (function() {
        var _m, _n, _o, _p, k, path;
        var glyph = _k[_j];
        if (font.glyphs.hasOwnProperty(glyph)) {
          path = font.glyphs[glyph];
          fontcopy.glyphs[glyph] = {
            w: path.w,
            k: {},
            d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function(command) {
              return (({
                l: "L",
                c: "C",
                x: "z",
                t: "m",
                r: "l",
                v: "c"
              })[command]) || "M";
            }) + "z"
          };
          if (path.k) {
            _m = []; _o = path.k;
            for (_n = 0, _p = _o.length; _n < _p; _n++) {
              k = _o[_n];
              _m.push(path.hasOwnProperty(k) ? (fontcopy.glyphs[glyph].k[k] = path.k[k]) : null);
            }
            return _m;
          }
        }
      })();
    }
  }
  return font;
};
Paper.prototype.getFont = function(family, weight, style, stretch) {
  var _g, _h, _i, font, fontName, i, name, thefont;
  stretch = stretch || "normal";
  style = style || "normal";
  weight = +weight || ({
    normal: 400,
    bold: 700,
    lighter: 300,
    bolder: 800
  })[weight] || 400;
  if (!Raphael.fonts) {
    return null;
  }
  font = Raphael.fonts[family];
  if (!font) {
    name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
    _h = Raphael.fonts;
    for (_g = 0, _i = _h.length; _g < _i; _g++) {
      fontName = _h[_g];
      if (Raphael.fonts.hasOwnProperty(fontName)) {
        if (name.test(fontName)) {
          font = Raphael.fonts[fontName];
          break;
        }
      }
    }
  }
  if (font) {
    for (i = 0; (0 <= font.length - 1 ? i <= font.length - 1 : i >= font.length - 1); (0 <= font.length - 1 ? i += 1 : i -= 1)) {
      thefont = font[i];
      if (thefont.face["font-weight"] === weight && (thefont.face["font-style"] === style || !thefont.face["font-style"]) && thefont.face["font-stretch"] === stretch) {
        break;
      }
    }
  }
  return thefont;
};
Paper.prototype.print = function(x, y, string, font, size, origin) {
  var bb, curr, height, i, letters, out, path, prev, scale, shift, top;
  origin = (typeof origin !== "undefined" && origin !== null) ? origin : "middle";
  out = this.set();
  letters = String(string).split(E);
  shift = 0;
  path = E;
  if (Raphael.is(font, string)) {
    font = this.getFont(font);
  }
  if (font) {
    scale = (size || 16) / font.face["units-per-em"];
    bb = font.face.bbox.split(separator);
    top = +bb[0];
    height = +bb[1] + (origin === "baseline" ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);
    for (i = 0; (0 <= letters.length - 1 ? i <= letters.length - 1 : i >= letters.length - 1); (0 <= letters.length - 1 ? i += 1 : i -= 1)) {
      prev = i && font.glyphs[letters[i - 1]] || {};
      curr = font.glyphs[letters[i]];
      shift += i ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) : 0;
      if (curr && curr.d) {
        out.push(this.path(curr.d).attr({
          fill: "#000",
          stroke: "none",
          translation: [shift, 0]
        }));
      }
    }
    out.scale(scale, scale, top, height).translate(x - top, y - height);
  }
  return out;
};
Raphael.prototype.format = function(token, params) {
  var args, formatrg;
  formatrg = /\{(\d+)\}/g;
  args = Raphael.is(params, "array") ? [0].concat(params) : arguments;
  if (token && Raphael.is(token, "string") && args.length - 1) {
    token = token.replace(formatrg, function(str, i) {
      return args[++i] === null ? E : args[i];
    });
  };
  return token || E;
};
Raphael.prototype.ninja = function() {
  if (oldRaphael.was) {
    (Raphael = oldRaphael.is);
  } else {
    delete Raphael;
  };
  return Raphael;
};
Raphael.el = Element.prototype;
functionCacher(Raphael.toHex, Raphael);
functionCacher(Raphael.getRGB, Raphael);
functionCacher(Raphael.pathDimensions, Raphael);
functionCacher(Raphael.pathToRelative, 0, Raphael.pathClone);
functionCacher(Raphael.pathToAbsolute, null, Raphael.pathClone);
RGB = function(red, green, blue, opacity) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  if (isFinite(opacity)) {
    this.opacity = opacity;
  }
  return this;
};
RGB.rg = /^(?=[\da-f]$)/;
RGB.prototype.toString = function() {
  return this.hex();
};
RGB.prototype.error = function() {
  this.error = true;
  return this;
};
RGB.prototype.hex = function() {
  var blue, green, red;
  red = (~~this.red).toString(16).replace(RGB.rg, "0");
  green = (~~this.green).toString(16).replace(RGB.rg, "0");
  blue = (~~this.blue).toString(16).replace(RGB.rg, "0");
  return "#" + red + green + blue;
};
RGB.prototype.toHSB = function() {
  var blue, brightness, delta, green, hue, max, min, red, saturation;
  red = this.red;
  green = this.green;
  blue = this.blue;
  if (red > 1 || green > 1 || blue > 1) {
    red /= 255;
    green /= 255;
    blue /= 255;
  }
  max = Math.max(red, green, blue);
  min = Math.min(red, green, blue);
  brightness = max;
  if (min === max) {
    new HSB(0, 0, max);
  } else {
    delta = max - min;
    saturation = delta / max;
    if (red === max) {
      hue = (green - blue) / delta;
    } else if (green === max) {
      hue = 2 + ((blue - red) / delta);
    } else {
      hue = 4 + ((red - green) / delta);
    }
    hue /= 6;
    hue < 0 && hue++;
    hue > 1 && hue--;
  }
  return new HSB(hue, saturation, brightness);
};
RGB.prototype.toHSL = function() {
  var blue, delta, green, hue, lightness, max, min, red, saturation;
  red = this.red;
  green = this.green;
  blue = this.blue;
  if (red > 1 || green > 1 || blue > 1) {
    red /= 255;
    green /= 255;
    blue /= 255;
  }
  max = Math.max(red, green, blue);
  min = Math.min(red, green, blue);
  lightness = (max + min) / 2;
  if (min === max) {
    new HSL(0, 0, lightness);
  } else {
    delta = max - min;
    saturation = lightness < 0.5 ? delta / (max + min) : delta / (2 - max - min);
    if (red === max) {
      hue = (green - blue) / delta;
    } else if (green === max) {
      hue = 2 + ((blue - red) / delta);
    } else {
      hue = 4 + ((red - green) / delta);
    }
    hue /= 6;
    hue < 0 && hue++;
    hue > 1 && hue--;
  }
  return new HSL(hue, saturation, lightness);
};
HSB = function(hue, saturation, brightness) {
  this.hue = hue;
  this.saturation = saturation;
  this.brightness = brightness;
  return this;
};
HSB.prototype.toString = function() {
  return "hsb(" + [this.hue, this.saturation, this.brightness] + ")";
};
HSB.prototype.hex = function() {
  return "#" + this.red;
};
HSB.prototype.toRGB = function() {
  var hsl;
  hsl = new HSL(this.hue, this.saturation, this.brightness / 2);
  return hsl.toRGB();
};
HSL = function(hue, saturation, lightness) {
  this.hue = hue;
  this.saturation = saturation;
  this.lightness = lightness;
  return this;
};
HSL.prototype.toString = function() {
  return "hsl(" + [this.hue, this.saturation, this.lightness] + ")";
};
HSL.prototype.toRGB = function() {
  var _g, channel, hue, index, lightness, rgb, rgbChannels, saturation, t1, t2, t3;
  hue = this.hue;
  saturation = this.saturation;
  lightness = this.lightness;
  if (this.hue > 1 || this.saturation > 1 || this.lightness > 1) {
    hue /= 255;
    saturation /= 255;
    lightness /= 255;
  }
  if (!saturation) {
    return new RGB(lightness, lightness, lightness);
  } else {
    rgb = new RGB();
    if (lightness < 0.5) {
      t2 = lightness * (1 + saturation);
    } else {
      t2 = lightness + saturation - lightness * saturation;
    };
    t1 = 2 * lightness - t2;
    rgbChannels = {
      red: 0,
      green: 1,
      blue: 2
    };
    _g = rgbChannels;
    for (channel in _g) {
      if (!__hasProp.call(_g, channel)) continue;
      index = _g[channel];
      t3 = hue + 1 / 3 * -(index - 1);
      t3 < 0 && t3++;
      t3 > 1 && t3--;
      if (t3 * 6 < 1) {
        rgb[channel] = t1 + (t2 - t1) * 6 * t3;
      } else if (t3 * 2 < 1) {
        rgb[channel] = t2;
      } else if (t3 * 3 < 2) {
        rgb[channel] = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        rgb[channel] = t1;
      }
    }
  }
  rgb.red *= 255;
  rgb.green *= 255;
  rgb.blue *= 255;
  return rgb;
};