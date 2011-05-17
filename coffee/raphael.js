var $, Arc, Circle, Colour, Curve, Element, Ellipse, HSB, HSBSequence, HSL, Image, Line, Paper, Path, Quadratic, RGB, RGBSequence, Raphael, RaphaelNew, Rectangle, SVGElement, Text, VMLElement, _a, _b, _c, _d, _e, functionCacher;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__superClass__ = parent.prototype;
  };
/*
Raphael 1.5.2 - JavaScript Vector Library

Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
CoffeeScript conversion by Paul Gillard
Licensed under the MIT (http://raphaeljs.com/license.html) license.
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
Paper = function() {
  this.customAttributes = {};
  return this;
};
Paper.svgNamespace = "http://www.w3.org/2000/svg";
Paper.xLinkNamespace = "http://www.w3.org/1999/xlink";
RaphaelNew = function() {};
RaphaelNew.version = '1.5.2';
RaphaelNew._oid = 0;
RaphaelNew.type = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
RaphaelNew.separator = /[, ]+/;
RaphaelNew.elements = {
  circle: 1,
  rect: 1,
  path: 1,
  ellipse: 1,
  text: 1,
  image: 1
};
RaphaelNew.events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "orientationchange", "touchcancel", "gesturestart", "gesturechange", "gestureend"];
RaphaelNew.availableAttrs = {
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
  href: "http://Rjs.com/",
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
  title: "R",
  translation: "0 0",
  width: 0,
  x: 0,
  y: 0
};
RaphaelNew.availableAnimAttrs = {
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
RaphaelNew.ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
RaphaelNew.radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;
RaphaelNew.isnan = {
  "NaN": 1,
  "Infinity": 1,
  "-Infinity": 1
};
RaphaelNew.bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/;
RaphaelNew.ms = " progid:DXImageTransform.Microsoft";
RaphaelNew.animKeyFrames = /^(from|to|\d+%?)$/;
RaphaelNew.commaSpaces = /\s*,\s*/;
RaphaelNew.hsrg = {
  hs: 1,
  rg: 1
};
RaphaelNew.p2s = /,?([achlmqrstvxz]),?/gi;
RaphaelNew.radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;
RaphaelNew.supportsTouch = (function(){ for (var _a=0, _b=document.length; _a<_b; _a++) { if (document[_a] === "createTouch") return true; } return false; }).call(this);
RaphaelNew.touchMap = {
  mousedown: "touchstart",
  mousemove: "touchmove",
  mouseup: "touchend"
};
RaphaelNew.is = function(object, type) {
  ({
    type: String.prototype.toLowerCase.call(type)
  });
  if (type === "finite") {
    return !RaphaelNew.isnan.hasOwnProperty(+object);
  }
  return (type === "null" && object === null) || (type === typeof object) || (type === "object" && object === Object(object)) || (type === "array" && Array.isArray && Array.isArray(object)) || Object.prototype.toString.call(object).slice(8, -1).toLowerCase() === type;
};
RaphaelNew.prototype.is = function(object, type) {
  return Raphael.is(object, type);
};
RaphaelNew.prototype.format = function(token, params) {
  var args, formatrg;
  formatrg = /\{(\d+)\}/g;
  args = this.is(params, "array") ? [0].concat(params) : arguments;
  if (token && this.is(token, "string") && args.length - 1) {
    token = token.replace(formatrg, function(str, i) {
      var _c;
      return !(typeof (_c = args[++i]) !== "undefined" && _c !== null) ? '' : args[i];
    });
  };
  return token || "";
};
RaphaelNew.prototype.preventDefault = function() {
  return (this.returnValue = false);
};
RaphaelNew.prototype.preventTouch = function() {
  return this.originalEvent.preventDefault();
};
RaphaelNew.prototype.stopPropagation = function() {
  return (this.cancelBubble = true);
};
RaphaelNew.prototype.stopTouch = function() {
  return this.originalEvent.stopPropagation();
};
RaphaelNew.drag = [];
RaphaelNew.prototype.dragMove = function(e) {
  var _c, dragi, i, j, scrollX, scrollY, touch, x, y;
  x = e.clientX;
  y = e.clientY;
  scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  j = this.drag.length;
  _c = [];
  while (j--) {
    dragi = this.drag[j];
    if (this.supportsTouch) {
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
    x += scrollX;
    y += scrollY;
    dragi.move && dragi.move.call(dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
  }
  return _c;
};
RaphaelNew.prototype.dragUp = function(e) {
  var dragi, i;
  RaphaelNew.unmousemove(dragMove).unmouseup(dragUp);
  i = this.drag.length;
  while (i--) {
    dragi = this.drag[i];
    dragi.el._drag = {};
    dragi.end && dragi.end.call(dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
  }
  return (this.drag = []);
};
if (document.addEventListener) {
  RaphaelNew.prototype.addEvent = function(obj, type, fn, element) {
    var f, realName;
    realName = this.supportsTouch && this.touchMap[type] ? this.touchMap[type] : type;
    f = function(e) {
      var _c, i, olde;
      if (this.supportsTouch && this.touchMap.hasOwnProperty(type)) {
        _c = (e.targetTouches && e.targetTouches.length - 1);
        for (i = 0; (0 <= _c ? i <= _c : i >= _c); (0 <= _c ? i += 1 : i -= 1)) {
          if (e.targetTouches[i].target === obj) {
            olde = e;
            e = e.targetTouches[i];
            e.originalEvent = olde;
            e.preventDefault = this.preventTouch;
            e.stopPropagation = this.stopTouch;
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
  RaphaelNew.prototype.addEvent = function(obj, type, fn, element) {
    var detacher, f;
    f = function(e) {
      e = e || window.event;
      e.preventDefault = e.preventDefault || this.preventDefault;
      e.stopPropagation = e.stopPropagation || this.stopPropagation;
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
_d = RaphaelNew.events;
for (_c = 0, _e = _d.length; _c < _e; _c++) {
  (function() {
    var event = _d[_c];
    return (function(eventName) {
      RaphaelNew[eventName] = (Element.prototype[eventName] = function(fn, scope) {
        if (RaphaelNew.is(fn, "function")) {
          this.events = this.events || [];
          this.events.push({
            name: eventName,
            f: fn,
            unbind: addEvent(this.shape || this.node || document, eventName, fn, scope || this)
          });
        }
        return this;
      });
      return (RaphaelNew["un" + eventName] = (Element.prototype["un" + eventName] = function(fn) {
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
RaphaelNew.animationElements = [];
RaphaelNew.animation = function() {
  var Now, _f, _g, _h, _i, _j, _k, _l, _m, _n, attr, diff, e, easing, from, from2, i, j, l, ms, now, point, pos, set, t, that, time, to, x, y;
  Now = +new Date();
  for (l = 0; (0 <= RaphaelNew.animationElements.length - 1 ? l <= RaphaelNew.animationElements.length - 1 : l >= RaphaelNew.animationElements.length - 1); (0 <= RaphaelNew.animationElements.length - 1 ? l += 1 : l -= 1)) {
    e = RaphaelNew.animationElements[l];
    if (e.stop || e.el.removed) {
      continue;
    }
    time = Now - e.start;
    ms = e.ms;
    easing = e.easing;
    from = e.from;
    diff = e.diff;
    to = e.to;
    t = e.t;
    that = e.el;
    set = {};
    if (time < ms) {
      pos = easing(time / ms);
      _g = from;
      for (attr in _g) {
        if (!__hasProp.call(_g, attr)) continue;
        _f = _g[attr];
        if ((_h = availableAnimAttrs[attr]) === "along") {
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
        } else if (_h === "number") {
          now = +from[attr] + pos * ms * diff[attr];
        } else if (_h === "colour") {
          now = "rgb(" + [upto255(Math.round(from[attr].red + pos * ms * diff[attr].red)), upto255(Math.round(from[attr].green + pos * ms * diff[attr].green)), upto255(Math.round(from[attr].blue + pos * ms * diff[attr].blue))].join(",") + ")";
        } else if (_h === "path") {
          now = [];
          _j = from[attr];
          for (i in _j) {
            if (!__hasProp.call(_j, i)) continue;
            _i = _j[i];
            now[i] = [from[attr][i][0]];
            _l = from[attr][i];
            for (j in _l) {
              if (!__hasProp.call(_l, j)) continue;
              _k = _l[j];
              if (j >= 1) {
                now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
              };
            }
            now[i] = now[i].join(" ");
          }
          now = now.join(" ");
        } else if (_h === "csv") {
          if (attr === "translation") {
            x = pos * ms * diff[attr][0] - t.x;
            y = pos * ms * diff[attr][1] - t.y;
            t.x += x;
            t.y += y;
            now = x + ' ' + y;
          } else if (attr === "rotation") {
            now = +from[attr][0] + pos * ms * diff[attr][0];
            if (from[attr][1]) {
              now += "," + from[attr][1] + "," + from[attr][2];
            }
          } else if (attr === "scale") {
            now = [+from[attr][0] + pos * ms * diff[attr][0], +from[attr][1] + pos * ms * diff[attr][1], ((typeof (_m = to[attr][2]) !== "undefined" && _m !== null) ? to[attr][2] : ""), ((typeof (_n = to[attr][3]) !== "undefined" && _n !== null) ? to[attr][3] : "")].join(" ");
          } else if (attr === "clip-rect") {
            now = [];
            i = 4;
            while (i--) {
              now[i] = +from[attr][i] + pos * ms * diff[attr][i];
            }
          }
        } else {
          from2 = [].concat(from[attr]);
          now = [];
          i = that.paper.customAttributes[attr].length;
          while (i--) {
            now[i] = +from2[i] + pos * ms * diff[attr][i];
          }
        }
        set[attr] = now;
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
        to.scale += "";
      }
      that.attr(to);
      RaphaelNew.animationElements.splice(l--, 1);
    }
  }
  if (R.svg && that && that.paper) {
    that.paper.safari();
  }
  if (RaphaelNew.animationElements.length) {
    setTimeout(RaphaelNew.animation);
  }
  return (RaphaelNew.easing_formulas = {
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
      var p, s;
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
  });
};
Element = function() {
  return RaphaelNew.apply(this, arguments);
};
__extends(Element, RaphaelNew);
Element.prototype.tear = function(paper) {
  if (this === paper.top) {
    paper.top = this.prev;
  }
  if (this === paper.bottom) {
    paper.bottom = this.next;
  }
  if (this.next) {
    this.next.prev = this.prev;
  }
  if (this.prev) {
    return (this.prev.next = this.next);
  }
};
Element.prototype.toFront = function(paper) {
  if (paper.top === this) {
    return null;
  } else {
    this.tear(paper);
    this.next = null;
    this.prev = paper.top;
    paper.top.next = this;
    return (paper.top = this);
  }
};
Element.prototype.toBack = function(paper) {
  if (paper.bottom === this) {
    return null;
  } else {
    this.tear(paper);
    this.next = paper.bottom;
    this.prev = null;
    paper.bottom.prev = this;
    return (paper.bottom = this);
  }
};
Element.prototype.insertAfter = function(element, paper) {
  this.tear(paper);
  if (element === paper.top) {
    paper.top = this;
  }
  if (element.next) {
    element.next.prev = this;
  }
  this.next = element.next;
  this.prev = element;
  return (element.next = this);
};
Element.prototype.insertBefore = function(element, paper) {
  this.tear(paper);
  if (element === paper.bottom) {
    paper.bottom = this;
  }
  if (element.prev) {
    element.prev.next = this;
  }
  this.prev = element.prev;
  element.prev = this;
  return (this.next = element);
};
Element.prototype.x_y = function() {
  return this.x + ' ' + this.y;
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
  var P0, _f, _g, _h, _i, _j, _k, _l, _m, _n, a, bb, dim2, dirx, diry, dkx, dky, dx, dy, fr, fx, fy, i, j, kx, ky, ncx, ncy, newh, neww, p, path, posx, posy, rcx, rcy, s, skip, value;
  if ((this.removed)) {
    return this;
  }
  if (!(typeof x !== "undefined" && x !== null) && !(typeof y !== "undefined" && y !== null)) {
    return {
      x: this._.sx,
      y: this._.sy,
      toString: this.x_y
    };
  }
  y = (typeof y !== "undefined" && y !== null) ? y : x;
  if (!+y) {
    y = x;
  }
  a = this.attrs;
  if (x !== 0) {
    bb = this.getBBox();
    rcx = bb.x + bb.width / 2;
    rcy = bb.y + bb.height / 2;
    kx = Math.abs(x / this._.sx);
    ky = Math.abs(y / this._.sy);
    cx = +cx || cx === 0 ? cx : rcx;
    cy = +cy || cy === 0 ? cy : rcy;
    posx = this._.sx > 0;
    posy = this._.sy > 0;
    dirx = ~~(x / Math.abs(x));
    diry = ~~(y / Math.abs(y));
    dkx = kx * dirx;
    dky = ky * diry;
    s = this.node.style;
    ncx = cx + Math.abs(rcx - cx) * dkx * ((rcx > cx) === posx ? 1 : -1);
    ncy = cy + Math.abs(rcy - cy) * dky * ((rcy > cy) === posy ? 1 : -1);
    fr = (x * dirx > y * diry ? ky : kx);
    if ((_f = this.type) === "rect" || _f === "image") {
      neww = a.width * kx;
      newh = a.height * ky;
      this.attr({
        height: newh,
        r: a.r * fr,
        width: neww,
        x: ncx - neww / 2,
        y: ncy - newh / 2
      });
    } else if (_f === "circle" || _f === "ellipse") {
      this.attr({
        rx: a.rx * kx,
        ry: a.ry * ky,
        r: a.r * fr,
        cx: ncx,
        cy: ncy
      });
    } else if (_f === "text") {
      this.attr({
        x: ncx,
        y: ncy
      });
    } else if (_f === "path") {
      path = pathToRelative(a.path);
      skip = true;
      fx = posx ? dkx : kx;
      fy = posy ? dky : ky;
      _g = path;
      for (i = 0, _h = _g.length; i < _h; i++) {
        value = _g[i];
        p = path[i];
        P0 = String.prototype.toUpperCase.call(p[0]);
        if (P0 === "M" && skip) {
          continue;
        } else {
          skip = false;
        }
        if (P0 === "A") {
          p[path[i].length - 2] *= fx;
          p[path[i].length - 1] *= fy;
          p[1] *= kx;
          p[2] *= ky;
          p[5] = +(dirx + diry ? !!+p[5] : !+p[5]);
        } else if (P0 === "H") {
          _i = p;
          for (j = 0, _j = _i.length; j < _j; j++) {
            value = _i[j];
            if (j >= 1) {
              p[j] *= fx;
            };
          }
        } else if (P0 === "V") {
          _k = p;
          for (j = 0, _l = _k.length; j < _l; j++) {
            value = _k[j];
            if (j >= 1) {
              p[j] *= fy;
            };
          }
        } else {
          _m = p;
          for (j = 0, _n = _m.length; j < _n; j++) {
            value = _m[j];
            if (j >= 1) {
              p[j] *= j % 2 ? fx : fy;
            };
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
    if ((this.type === "text" || this.type === "image") && (dirx !== 1 || diry !== 1)) {
      if (this.transformations) {
        this.transformations[2] = "scale(".concat(dirx, ",", diry, ")");
        this.node.setAttribute("transform", this.transformations.join(" "));
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
        s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
      }
    } else {
      if (this.transformations) {
        this.transformations[2] = "";
        this.node.setAttribute("transform", this.transformations.join(" "));
        a.fx = 0;
        a.fy = 0;
      } else {
        this.node.filterMatrix = "";
        s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
      }
    }
    a.scale = [x, y, cx, cy].join(" ");
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
Element.prototype.translate = function(x, y) {
  return this.attr({
    translation: x + " " + y
  });
};
Element.prototype.toString = function() {
  return "Rapha\xebl\u2019s object";
};
Element.prototype.hover = function(f_in, f_out, scope_in, scope_out) {
  return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
};
Element.prototype.unhover = function(f_in, f_out) {
  return this.unmouseover(f_in).unmouseout(f_out);
};
Element.prototype.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
  this._drag = {};
  this.mousedown(function(e) {
    var scrollX, scrollY;
    (e.originalEvent || e).preventDefault();
    scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    this._drag.x = e.clientX + scrollX;
    this._drag.y = e.clientY + scrollY;
    this._drag.id = e.identifier;
    if (onstart) {
      onstart.call(start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
    }
    if (!drag.length) {
      RaphaelNew.mousemove(dragMove).mouseup(dragUp);
    }
    return drag.push({
      el: this,
      move: onmove,
      end: onend,
      move_scope: move_scope,
      start_scope: start_scope,
      end_scope: end_scope
    });
  });
  return this;
};
Element.prototype.undrag = function(onmove, onstart, onend) {
  var i;
  i = drag.length;
  while (i--) {
    drag[i].el === this && (drag[i].move === onmove && drag[i].end === onend) && drag.splice(i, 1);
  }
  if (!drag.length) {
    return RaphaelNew.unmousemove(dragMove).unmouseup(dragUp);
  }
};
Element.prototype.animateWith = function(element, params, ms, easing, callback) {
  if (RaphaelNew.animationElements[element.id]) {
    params.start = RaphaelNew.animationElements[element.id].start;
  }
  return this.animate(params, ms, easing, callback);
};
Element.prototype.animateAlong = function(path, ms, rotate, callback) {
  var params;
  params = {
    back: false
  };
  if (R.is(rotate, "function")) {
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
Element.prototype.animateAlongBack = function(path, ms, rotate, callback) {
  var params;
  params = {
    back: true
  };
  if (R.is(rotate, "function")) {
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
Element.prototype.onAnimation = function(f) {
  this._run = f || 0;
  return this;
};
Element.prototype.cubicBezierAtTime = function(t, p1x, p1y, p2x, p2y, duration) {
  var _by, ax, ay, bx, cx, cy, sampleCurveX, solve, solveCurveX;
  cx = 3 * p1x;
  bx = 3 * (p2x - p1x) - cx;
  ax = 1 - cx - bx;
  cy = 3 * p1y;
  _by = 3 * (p2y - p1y) - cy;
  ay = 1 - cy - _by;
  sampleCurveX = function(t) {
    return ((ax * t + bx) * t + cx) * t;
  };
  solve = function(x, epsilon) {
    t = solveCurveX(x, epsilon);
    return ((ay * t + _by) * t + cy) * t;
  };
  solveCurveX = function(x, epsilon) {
    var d2, i, t0, t1, t2, x2;
    t2 = x;
    for (i = 0; i <= 7; i++) {
      x2 = sampleCurveX(t2) - x;
      if (abs(x2) < epsilon) {
        return t2;
      }
      d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
      if (abs(d2) < 1e-6) {
        break;
      }
      t2 = t2 - x2 / d2;
    }
    t0 = 0;
    t1 = 1;
    t2 = x;
    if (t2 < t0) {
      return t0;
    }
    if (t2 > t1) {
      return t1;
    }
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      };
      t2 = (t1 - t0) / 2 + t0;
    }
    return t2;
  };
  return solve(t, 1 / (200 * duration));
};
Element.prototype.animate = function(params, ms, easing, callback) {
  var _f, _g, _h, _i, _j, _k, _l, _m, _n, animateable, attr, attrs, bb, curve, diff, easyeasy, element, from, from2, i, j, key, keyframesRun, lastcall, len, name, pathes, point, to, toColour, toPath, values;
  element = this;
  element.timeouts = element.timeouts || [];
  if (R.is(easing, "function") || !easing) {
    callback = easing || null;
  };
  if (element.removed) {
    if (callback) {
      callback.call(element);
    }
    return element;
  }
  from = {};
  to = {};
  diff = {};
  animateable = false;
  _f = params;
  for (attr in _f) {
    if (!__hasProp.call(_f, attr)) continue;
    name = _f[attr];
    if (availableAnimAttrs.hasOwnProperty(attr) || element.paper.customAttributes.hasOwnProperty(attr)) {
      animateable = true;
      from[attr] = element.attr(attr);
      if (!(typeof (_g = from[attr]) !== "undefined" && _g !== null)) {
        from[attr] = availableAttrs[attr];
      }
      to[attr] = params[attr];
      if ((_h = availableAnimAttrs[attr]) === "along") {
        len = getTotalLength(params[attr]);
        point = getPointAtLength(params[attr], len * !!params.back);
        bb = element.getBBox();
        diff[attr] = len / ms;
        diff.tx = bb.x;
        diff.ty = bb.y;
        diff.sx = point.x;
        diff.sy = point.y;
        to.rot = params.rot;
        to.back = params.back;
        to.len = len;
        if (params.rot) {
          diff.r = parseFloat(element.rotate()) || 0;
        }
      } else if (_h === "number") {
        diff[attr] = (to[attr] - from[attr]) / ms;
      } else if (_h === "colour") {
        from[attr] = new Colour(from[attr]).toRGB();
        toColour = new Colour(to[attr]).toRGB();
        diff[attr] = new RGB((toColour.red - from[attr].red) / ms, (toColour.green - from[attr].green) / ms, (toColour.blue - from[attr].blue) / ms);
      } else if (_h === "path") {
        pathes = pathToCurve(from[attr], to[attr]);
        from[attr] = pathes[0];
        toPath = pathes[1];
        diff[attr] = [];
        _j = from[attr];
        for (i in _j) {
          if (!__hasProp.call(_j, i)) continue;
          _i = _j[i];
          diff[attr][i] = [0];
          _l = from[attr][i];
          for (j in _l) {
            if (!__hasProp.call(_l, j)) continue;
            _k = _l[j];
            if (j >= 1) {
              diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
            };
          }
        }
      } else if (_h === "csv") {
        values = String(params[attr]).split(RaphaelNew.separator);
        from2 = String(from[attr]).split(RaphaelNew.separator);
        if (attr === "translation") {
          from[attr] = [0, 0];
          diff[attr] = [values[0] / ms, values[1] / ms];
        } else if (attr === "rotation") {
          from[attr] = (from2[1] === values[1] && from2[2] === values[2]) ? from2 : [0, values[1], values[2]];
          diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0];
        } else if (attr === "scale") {
          params[attr] = values;
          from[attr] = String(from[attr]).split(RaphaelNew.separator);
          diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][1]) / ms, 0, 0];
        } else if (attr === "clip-rect") {
          from[attr] = String(from[attr]).split(RaphaelNew.separator);
          diff[attr] = [];
          i = 4;
          while (i--) {
            diff[attr][i] = (values[i] - from[attr][i]) / ms;
          }
        }
        to[attr] = values;
      } else {
        values = [].concat(params[attr]);
        from2 = [].concat(from[attr]);
        diff[attr] = [];
        i = element.paper.customAttributes[attr].length;
        while (i--) {
          diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
        }
      }
    }
  }
  if (!animateable) {
    attrs = [];
    _n = params;
    for (key in _n) {
      if (!__hasProp.call(_n, key)) continue;
      _m = _n[key];
      if (animKeyFrames.test(key)) {
        attr = {
          value: params[key]
        };
        if (key === "from") {
          key = 0;
        }
        if (key === "to") {
          key = 100;
        }
        attr.key = parseInt(key, 10);
        attrs.push(attr);
      }
    }
    attrs.sort(sortByKey);
    if (attrs[0].key) {
      attrs.unshift({
        key: 0,
        value: element.attrs
      });
      keyframesRun = function(attr, element, time, prev, prevcallback) {
        var dif;
        dif = time - prev;
        return element.timeouts.push(setTimeout(function() {
          R.is(prevcallback, "function") && prevcallback.call(element);
          return element.animate(attr, dif, attr.easing);
        }, prev));
      };
    }
    for (i = 0; (0 <= attrs.length - 1 ? i <= attrs.length - 1 : i >= attrs.length - 1); (0 <= attrs.length - 1 ? i += 1 : i -= 1)) {
      keyframesRun(attrs[i].value, element, ms / 100 * attrs[i].key, ms / 100 * (attrs[i - 1] && attrs[i - 1].key || 0), attrs[i - 1] && attrs[i - 1].value.callback);
    }
    lastcall = attrs[attrs.length - 1].value.callback;
    if (lastcall) {
      element.timeouts.push(setTimeout(function() {
        return lastcall.call(element);
      }, ms));
    };
  } else {
    easyeasy = R.easing_formulas[easing];
    if (!easyeasy) {
      easyeasy = String(easing).match(bezierrg);
      if (easyeasy && easyeasy.length === 5) {
        curve = easyeasy;
        easyeasy = function(t) {
          return this.cubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
        };
      } else {
        easyeasy = function(t) {
          return t;
        };
      }
    }
    RaphaelNew.animationElements.push({
      start: params.start || +new Date(),
      ms: ms,
      easing: easyeasy,
      from: from,
      diff: diff,
      to: to,
      el: element,
      t: {
        x: 0,
        y: 0
      }
    });
    if (R.is(callback, "function")) {
      element._ac = setTimeout(function() {
        return callback.call(element);
      }, ms);
    };
    if (RaphaelNew.animationElements.length === 1) {
      setTimeout(RaphaelNew.animation);
    }
  }
  return this;
};
Element.prototype.stop = function() {
  var _f, animationElement, i, index;
  _f = RaphaelNew.animationElements;
  for (index in _f) {
    if (!__hasProp.call(_f, index)) continue;
    animationElement = _f[index];
    if (animationElement.el.id === this.id) {
      RaphaelNew.animationElements.splice(index, 1);
    }
  }
  if (this.timeouts) {
    for (i = 0; (0 <= this.timeouts.length - 1 ? i <= this.timeouts.length - 1 : i >= this.timeouts.length - 1); (0 <= this.timeouts.length - 1 ? i += 1 : i -= 1)) {
      clearTimeout(this.timeouts[i]);
    }
  }
  this.timeouts = [];
  clearTimeout(this._ac);
  delete this._ac;
  return this;
};
if (RaphaelNew.type === "SVG") {
  $ = function(el, attr) {
    var _f, _g, name, value;
    if (attr) {
      _f = []; _g = attr;
      for (name in _g) {
        if (!__hasProp.call(_g, name)) continue;
        value = _g[name];
        _f.push(el.setAttribute(name, String(value)));
      }
      return _f;
    } else {
      el = document.createElementNS(Paper.svgNamespace, el);
      el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
      return el;
    }
  };
  SVGElement = function(node, svg) {
    var X, Y;
    X = 0;
    Y = 0;
    this[0] = node;
    this.id = RaphaelNew._oid++;
    this.node = node;
    node.R = this;
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
  __extends(SVGElement, Element);
  SVGElement.prototype.rotate = function(deg, cx, cy) {
    var bbox;
    if (this.removed) {
      return this;
    }
    if (!(typeof deg !== "undefined" && deg !== null)) {
      if (this._.rt.cx) {
        return [this._.rt.deg, this._.rt.cx, this._.rt.cy].join(" ");
      }
      return this._.rt.deg;
    }
    bbox = this.getBBox();
    deg = String(deg).split(RaphaelNew.separator);
    if (deg.length - 1) {
      cx = parseFloat(deg[1]);
      cy = parseFloat(deg[2]);
    }
    deg = parseFloat(deg[0]);
    if (cx !== null && cx !== false) {
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
    if (this._.rt.deg) {
      this.transformations[0] = this.format("rotate({0} {1} {2})", this._.rt.deg, cx, cy);
      if (this.clip) {
        $(this.clip, {
          transform: this.format("rotate({0} {1} {2})", -this._.rt.deg, cx, cy)
        });
      }
    } else {
      this.transformations[0] = "";
      if (this.clip) {
        $(this.clip, {
          transform: ''
        });
      }
    }
    $(this.node, {
      transform: this.transformations.join(" ")
    });
    return this;
  };
  SVGElement.prototype.hide = function() {
    if (!this.removed) {
      this.node.style.display = "none";
    }
    return this;
  };
  SVGElement.prototype.show = function() {
    if (!this.removed) {
      this.node.style.display = "";
    }
    return this;
  };
  SVGElement.prototype.remove = function() {
    var _f, _g, _h, i;
    if (this.removed) {
      return null;
    }
    this.tear(this.paper);
    this.node.parentNode.removeChild(this.node);
    _g = this;
    for (_f = 0, _h = _g.length; _f < _h; _f++) {
      i = _g[_f];
      delete this[i];
    }
    return (this.removed = true);
  };
  SVGElement.prototype.getBBox = function() {
    var bb, bbox, hide, index;
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
      index = this.node.getNumberOfChars();
      while (index--) {
        bb = this.node.getExtentOfChar(index);
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
  SVGElement.prototype.attr = function(name, value) {
    var _f, _g, _h, _i, _j, _k, _l, _m, i, j, key, par, params, res, subkey, values;
    if (this.removed) {
      return this;
    }
    if (!(typeof name !== "undefined" && name !== null)) {
      res = {};
      _g = this.attrs;
      for (i in _g) {
        if (!__hasProp.call(_g, i)) continue;
        _f = _g[i];
        res[i] = this.attrs[i];
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
    if (!(typeof value !== "undefined" && value !== null) && this.is(name, "string")) {
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
    if (!(typeof value !== "undefined" && value !== null) && this.is(name, "array")) {
      values = {};
      _i = name;
      for (j in _i) {
        if (!__hasProp.call(_i, j)) continue;
        _h = _i[j];
        values[name[j]] = this.attr(name[j]);
      }
      return values;
    }
    if ((typeof value !== "undefined" && value !== null)) {
      params = {};
      params[name] = value;
    } else if ((typeof name !== "undefined" && name !== null) && this.is(name, "object")) {
      params = name;
    }
    _k = this.paper.customAttributes;
    for (key in _k) {
      if (!__hasProp.call(_k, key)) continue;
      _j = _k[key];
      if (params.hasOwnProperty(key) && this.is(this.paper.customAttributes[key], "function")) {
        par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
        this.attrs[key] = params[key];
        _m = par;
        for (subkey in _m) {
          if (!__hasProp.call(_m, subkey)) continue;
          _l = _m[subkey];
          params[subkey] = par[subkey];
        }
      }
    }
    this.setFillAndStroke(params);
    return this;
  };
  SVGElement.prototype.toFront = function() {
    var svg;
    if (this.removed) {
      return this;
    }
    this.node.parentNode.appendChild(this.node);
    svg = this.paper;
    svg.top !== this && SVGElement.__superClass__.toFront.call(this, svg);
    return this;
  };
  SVGElement.prototype.toBack = function() {
    var svg;
    if (this.removed) {
      return this;
    }
    if (this.node.parentNode.firstChild !== this.node) {
      this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
      SVGElement.__superClass__.toBack.call(this, this.paper);
      svg = this.paper;
    }
    return this;
  };
  SVGElement.prototype.insertAfter = function(element) {
    var node;
    if (this.removed) {
      return this;
    }
    node = element.node || element[element.length - 1].node;
    if (node.nextSibling) {
      node.parentNode.insertBefore(this.node, node.nextSibling);
    } else {
      node.parentNode.appendChild(this.node);
    };
    SVGElement.__superClass__.insertAfter.call(this, element, this.paper);
    return this;
  };
  SVGElement.prototype.insertBefore = function(element) {
    var node;
    if (this.removed) {
      return this;
    }
    node = element.node || element[0].node;
    node.parentNode.insertBefore(this.node, node);
    SVGElement.__superClass__.insertBefore.call(this, element, this.paper);
    return this;
  };
  SVGElement.prototype.blur = function(size) {
    var blur, fltr;
    if (+size !== 0) {
      fltr = $("filter");
      blur = $("feGaussianBlur");
      this.attrs.blur = size;
      fltr.id = createUUID();
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
  SVGElement.prototype.setFillAndStroke = function(params) {
    var _f, _g, addDashes, att, clip, clr, cssrule, dasharray, el, gradient, hl, ig, img, isURL, pn, rc, rect, rot, rotxy, stops, value, xy;
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
    rot = this.rotate();
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
        return $(this.node, {
          "stroke-dasharray": dashes.join(",")
        });
      }
    };
    if (params.hasOwnProperty("rotation")) {
      rot = params.rotation;
    }
    rotxy = String(rot).split(RaphaelNew.separator);
    if (!(rotxy.length - 1)) {
      rotxy = null;
    } else {
      rotxy[1] = +rotxy[1];
      rotxy[2] = +rotxy[2];
    }
    if (parseFloat(rot)) {
      this.rotate(0, true);
    }
    _g = params;
    for (_f in _g) {
      if (!__hasProp.call(_g, _f)) continue;
      var att = _f;
      var name = _g[_f];
      if (!RaphaelNew.availableAttrs.hasOwnProperty(att)) {
        continue;
      }
      value = params[att];
      this.attrs[att] = value;
      if (att === "blur") {
        this.blur(value);
      } else if (att === "rotation") {
        this.rotate(value, true);
      } else if (att === "href" || att === "title" || att === "target") {
        pn = this.node.parentNode;
        if (String.prototype.toLowerCase.call(pn.tagName) !== "a") {
          hl = $("a");
          pn.insertBefore(hl, this.node);
          hl.appendChild(this.node);
          pn = hl;
        }
        if (att === "target" && value === "blank") {
          pn.setAttributeNS(Paper.xLinkNamespace, "show", "new");
        } else {
          pn.setAttributeNS(Paper.xLinkNamespace, att, value);
        };
      } else if (att === "cursor") {
        this.node.style.cursor = value;
      } else if (att === "clip-rect") {
        rect = String(value).split(RaphaelNew.separator);
        if (rect.length === 4) {
          this.clip && this.clip.parentNode.parentNode.removeChild(this.clip.parentNode);
          el = $("clipPath");
          rc = $("rect");
          el.id = createUUID();
          $(rc, {
            x: rect[0],
            y: rect[1],
            width: rect[2],
            height: rect[3]
          });
          el.appendChild(rc);
          this.paper.defs.appendChild(el);
          $(this.node, {
            "clip-path": "url(#" + el.id + ")"
          });
          this.clip = rc;
        }
        if (!value) {
          clip = document.getElementById(this.node.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, ""));
          if (clip) {
            clip.parentNode.removeChild(clip);
          }
          $(this.node, {
            "clip-path": ""
          });
          delete this.clip;
        }
      } else if (att === "path") {
        if ((this.type === "path")) {
          this.node.setAttribute(att, String(value));
        };
      } else if (att === "width") {
        this.node.setAttribute(att, value);
        if (this.attrs.fx) {
          value = -this.attrs.x - (this.attrs.width || 0);
          if (rotxy) {
            rotxy[1] += value - this.attrs['x'];
          }
          this.node.setAttribute('x', value);
          if (this.pattern) {
            this.updatePosition();
          }
        }
      } else if (att === "x") {
        if (this.attrs.fx) {
          value = -this.attrs.x - (this.attrs.width || 0);
        };
        if (rotxy) {
          rotxy[1] += value - this.attrs[att];
        }
        this.node.setAttribute(att, value);
        if (this.pattern) {
          this.updatePosition();
        }
      } else if (att === "rx") {
        if (this.type !== "rect") {
          this.node.setAttribute(att, value);
          if (this.pattern) {
            this.updatePosition();
          }
        }
      } else if (att === "cx") {
        if (rotxy) {
          rotxy[1] += value - this.attrs[att];
        }
        this.node.setAttribute(att, value);
        if (this.pattern) {
          this.updatePosition();
        }
      } else if (att === "height") {
        this.node.setAttribute(att, value);
        if (this.attrs.fy) {
          value = -this.attrs.y - (this.attrs.height || 0);
          if (rotxy) {
            rotxy[2] += value - this.attrs['y'];
          }
          this.node.setAttribute('y', value);
          if (this.pattern) {
            this.updatePosition();
          }
        }
      } else if (att === "y") {
        if (this.attrs.fy) {
          value = -this.attrs.y - (this.attrs.height || 0);
        };
        if (rotxy) {
          rotxy[2] += value - this.attrs[att];
        }
        this.node.setAttribute(att, value);
        if (this.pattern) {
          this.updatePosition();
        }
      } else if (att === "ry") {
        if (this.type !== "rect") {
          this.node.setAttribute(att, value);
          if (this.pattern) {
            this.updatePosition();
          }
        }
      } else if (att === "cy") {
        if (rotxy) {
          rotxy[2] += value - this.attrs[att];
        }
        this.node.setAttribute(att, value);
        if (this.pattern) {
          this.updatePosition();
        }
      } else if (att === "r") {
        if (this.type === "rect") {
          $(this.node, {
            rx: value,
            ry: value
          });
        } else {
          this.node.setAttribute(att, value);
        };
      } else if (att === "src") {
        if (this.type === "image") {
          this.node.setAttributeNS(Paper.xLinkNamespace, "href", value);
        };
      } else if (att === "stroke-width") {
        this.node.style.strokeWidth = value;
        this.node.setAttribute(att, value);
        if (this.attrs["stroke-dasharray"]) {
          addDashes(this, this.attrs["stroke-dasharray"]);
        };
      } else if (att === "stroke-dasharray") {
        addDashes(this, value);
      } else if (att === "translation") {
        xy = String(value).split(RaphaelNew.separator);
        xy[0] = +xy[0] || 0;
        xy[1] = +xy[1] || 0;
        if (rotxy) {
          rotxy[1] += xy[0];
          rotxy[2] += xy[1];
        }
        translate.call(this, xy[0], xy[1]);
      } else if (att === "scale") {
        xy = String(value).split(RaphaelNew.separator);
        this.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, (isNaN(parseFloat(xy[2])) ? null : +xy[2]), (isNaN(parseFloat(xy[3])) ? null : +xy[3]));
      } else if (att === "fill") {
        isURL = String(value).match(RaphaelNew.ISURL);
        if (isURL) {
          el = $("pattern");
          ig = $("image");
          el.id = createUUID();
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
          ig.setAttributeNS(Paper.xLinkNamespace, "href", isURL[1]);
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
            return this.paper.safari();
          };
          document.body.appendChild(img);
          img.src = isURL[1];
          this.paper.defs.appendChild(el);
          this.node.style.fill = "url(#" + el.id + ")";
          $(this.node, {
            fill: "url(#" + el.id + ")"
          });
          this.pattern = el;
          if (this.pattern) {
            this.updatePosition();
          }
        } else {
          clr = new Colour(value).toRGB();
          if (!clr.error) {
            delete params.gradient;
            delete this.attrs.gradient;
            if (!this.is(this.attrs.opacity, "undefined")) {
              if (this.is(params.opacity, "undefined")) {
                $(this.node, {
                  opacity: this.attrs.opacity
                });
              };
            };
            if (!this.is(this.attrs["fill-opacity"], "undefined") && this.is(params["fill-opacity"], "undefined")) {
              $(this.node, {
                "fill-opacity": this.attrs["fill-opacity"]
              });
            };
            if (clr.hasOwnProperty("opacity")) {
              $(this.node, {
                "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
              });
            };
            this.node.setAttribute(att, clr.hex());
          } else if ((({
            circle: 1,
            ellipse: 1
          }).hasOwnProperty(this.type) || String(value).charAt() !== "r") && this.node.addGradientFill(value, this.paper)) {
            this.attrs.gradient = value;
            this.attrs.fill = "none";
          } else {
            if (clr.hasOwnProperty("opacity")) {
              $(this.node, {
                "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
              });
            };
            this.node.setAttribute(att, clr.hex());
          }
        }
      } else if (att === "stroke") {
        clr = new Colour(value).toRGB();
        this.node.setAttribute(att, clr.hex());
        if (clr.hasOwnProperty("opacity")) {
          $(this.node, {
            "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
          });
        };
      } else if (att === "gradient") {
        if (({
          circle: 1,
          ellipse: 1
        }).hasOwnProperty(this.type) || String(value).charAt() !== "r") {
          this.node.addGradientFill(value, this.paper);
        };
      } else if (att === "opacity") {
        if (this.attrs.gradient && this.attrs.hasOwnProperty("stroke-opacity")) {
          $(this.node, {
            "stroke-opacity": value > 1 ? value / 100 : value
          });
        };
        if (this.attrs.gradient) {
          gradient = document.getElementById(this.node.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
          if (gradient) {
            stops = gradient.getElementsByTagName("stop");
            stops[stops.length - 1].setAttribute("stop-opacity", value);
          }
        } else {
          cssrule = att.replace(/(\-.)/g, function(w) {
            return String.prototype.toUpperCase.call(w.substring(1));
          });
          this.node.style[cssrule] = value;
          this.node.setAttribute(att, value);
        }
      } else if (att === "fill-opacity") {
        if (this.attrs.gradient) {
          gradient = document.getElementById(this.node.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
          if (gradient) {
            stops = gradient.getElementsByTagName("stop");
            stops[stops.length - 1].setAttribute("stop-opacity", value);
          }
        } else {
          cssrule = att.replace(/(\-.)/g, function(w) {
            return String.prototype.toUpperCase.call(w.substring(1));
          });
          this.node.style[cssrule] = value;
          this.node.setAttribute(att, value);
        }
      } else if (att === "font-size") {
        value = parseInt(value, 10) + "px";
        cssrule = att.replace(/(\-.)/g, function(w) {
          return String.prototype.toUpperCase.call(w.substring(1));
        });
        this.node.style[cssrule] = value;
        this.node.setAttribute(att, value);
      } else {
        cssrule = att.replace(/(\-.)/g, function(w) {
          return String.prototype.toUpperCase.call(w.substring(1));
        });
        this.node.style[cssrule] = value;
        this.node.setAttribute(att, value);
      }
    }
    this.tuneText(params);
    if (rotxy) {
      return this.rotate(rotxy.join(" "));
    } else {
      if (parseFloat(rot)) {
        return this.rotate(rot, true);
      }
    }
  };
  SVGElement.prototype.tuneText = function(params) {
    var _f, _g, bb, dif, fontSize, i, leading, texts, tspan, value;
    leading = 1.2;
    if (this.type !== "text" || !(params.hasOwnProperty("text") || params.hasOwnProperty("font") || params.hasOwnProperty("font-size") || params.hasOwnProperty("x") || params.hasOwnProperty("y"))) {
      return null;
    }
    fontSize = this.node.firstChild ? parseInt(document.defaultView.getComputedStyle(this.node.firstChild, "").getPropertyValue("font-size"), 10) : 10;
    if (params.hasOwnProperty("text")) {
      this.attrs.text = params.text;
      while (this.node.firstChild) {
        this.node.removeChild(this.node.firstChild);
      }
      texts = String(params.text).split("\n");
      _f = texts;
      for (i = 0, _g = _f.length; i < _g; i++) {
        value = _f[i];
        if (texts[i]) {
          tspan = $("tspan");
          if (i) {
            $(tspan, {
              dy: fontSize * leading,
              x: this.attrs.x
            });
          }
          tspan.appendChild(document.createTextNode(texts[i]));
          this.node.appendChild(tspan);
        }
      }
    } else {
      texts = this.node.getElementsByTagName("tspan");
      for (i = 0; (0 <= texts.length - 1 ? i <= texts.length - 1 : i >= texts.length - 1); (0 <= texts.length - 1 ? i += 1 : i -= 1)) {
        if (i) {
          $(texts[i], {
            dy: fontSize * leading,
            x: this.attrs.x
          });
        }
      }
    }
    $(this.node, {
      y: this.attrs.y
    });
    bb = this.getBBox();
    dif = this.attrs.y - (bb.y + bb.height / 2);
    if (dif && this.is(dif, "finite")) {
      return $(this.node, {
        y: this.attrs.y + dif
      });
    }
  };
  SVGElement.prototype.addGradientFill = function(gradient, SVG) {
    var _f, _g, angle, dots, el, fx, fy, i, id, max, s, stop, type, vector;
    type = "linear";
    fx = (fy = 0.5);
    s = this.style;
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
      return "";
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
    id = this.getAttribute("fill");
    id = id.match(/^url\(#(.*)\)$/);
    if (id) {
      SVG.defs.removeChild(document.getElementById(id[1]));
    }
    el = $(type + "Gradient");
    el.id = createUUID();
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
    _g = dots;
    for (i in _g) {
      if (!__hasProp.call(_g, i)) continue;
      _f = _g[i];
      stop = $("stop");
      $(stop, {
        offset: (function() {
          if (dots[i].offset) {
            return dots[i].offset;
          } else if (i === "0") {
            return "0%";
          } else {
            return "100%";
          }
        })(),
        "stop-color": dots[i].color || "##fff"
      });
      el.appendChild(stop);
    }
    $(this, {
      fill: "url(#" + el.id + ")",
      opacity: 1,
      "fill-opacity": 1
    });
    s.fill = "";
    s.opacity = 1;
    s.fillOpacity = 1;
    return 1;
  };
  SVGElement.prototype.updatePosition = function() {
    var bbox;
    bbox = this.getBBox();
    return $(this.pattern, {
      patternTransform: this.format("translate({0},{1})", bbox.x, bbox.y)
    });
  };
  Circle = function(svg, x, y, r) {
    var el;
    this.type = "circle";
    el = $(this.type);
    Circle.__superClass__.constructor.call(this, el, svg);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    this.attrs = {
      cx: x || 0,
      cy: y || 0,
      r: r || 0,
      fill: "none",
      stroke: "#000000"
    };
    $(el, this.attrs);
    this;
    return this;
  };
  __extends(Circle, SVGElement);
  Rectangle = function(svg, x, y, w, h, r) {
    var el;
    this.type = "rect";
    el = $(this.type);
    Rectangle.__superClass__.constructor.call(this, el, svg);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    this.attrs = {
      x: x || 0,
      y: y || 0,
      width: w || 0,
      height: h || 0,
      r: r || 0,
      rx: r || 0,
      ry: r || 0,
      fill: "none",
      stroke: "#000000"
    };
    $(el, this.attrs);
    this;
    return this;
  };
  __extends(Rectangle, SVGElement);
  Ellipse = function(svg, x, y, rx, ry) {
    var el;
    this.type = "ellipse";
    el = $(this.type);
    Ellipse.__superClass__.constructor.call(this, el, svg);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    this.attrs = {
      cx: x || 0,
      cy: y || 0,
      rx: rx || 0,
      ry: ry || 0,
      fill: "none",
      stroke: "#000000"
    };
    $(el, this.attrs);
    this;
    return this;
  };
  __extends(Ellipse, SVGElement);
  Image = function(svg, src, x, y, w, h) {
    var el;
    this.type = "image";
    el = $(this.type);
    $(el, {
      x: x,
      y: y,
      width: w,
      height: h,
      preserveAspectRatio: "none"
    });
    el.setAttributeNS(Paper.xLinkNamespace, "href", src);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    Image.__superClass__.constructor.call(this, el, svg);
    this.attrs = {
      x: x || 0,
      y: y || 0,
      width: w || 0,
      height: h || 0,
      src: src || "about:blank"
    };
    this;
    return this;
  };
  __extends(Image, SVGElement);
  Text = function(svg, text, x, y) {
    var el;
    this.type = "text";
    el = $(this.type);
    $(el, {
      x: x,
      y: y,
      "text-anchor": "middle"
    });
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    Text.__superClass__.constructor.call(this, el, svg);
    this.attrs = {
      x: x || 0,
      y: y || 0,
      "text-anchor": "middle",
      text: text,
      font: RaphaelNew.availableAttrs.font,
      stroke: "none",
      fill: "#000000"
    };
    this.setFillAndStroke(this.attrs);
    this;
    return this;
  };
  __extends(Text, SVGElement);
  Path = function(svg, pathString) {
    var el;
    this.type = "path";
    el = $(this.type);
    if (svg.canvas) {
      svg.canvas.appendChild(el);
    }
    Path.__superClass__.constructor.call(this, el, svg);
    this.attrs = {
      path: Path.parse(pathString),
      fill: "none",
      stroke: "#000000"
    };
    this.setFillAndStroke(this.attrs);
    this;
    return this;
  };
  __extends(Path, SVGElement);
  Line = function() {
    return Path.apply(this, arguments);
  };
  __extends(Line, Path);
  Quadratic = function() {
    return Path.apply(this, arguments);
  };
  __extends(Quadratic, Path);
  Curve = function() {
    return Path.apply(this, arguments);
  };
  __extends(Curve, Path);
  Arc = function() {
    return Path.apply(this, arguments);
  };
  __extends(Arc, Path);
} else {
  VMLElement = function(node, group, vml) {
    var RotX, RotY, Rotation, Scale;
    Rotation = 0;
    RotX = 0;
    RotY = 0;
    Scale = 1;
    this[0] = node;
    this.id = R._oid++;
    this.node = node;
    node.R = this;
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
  __extends(VMLElement, Element);
  VMLElement.prototype.rotate = function(deg, cx, cy) {
    if (this.removed) {
      return this;
    }
    if (!(typeof deg !== "undefined" && deg !== null)) {
      if (this._.rt.cx) {
        return [this._.rt.deg, this._.rt.cx, this._.rt.cy].join(" ");
      }
      return this._.rt.deg;
    }
    deg = String(deg).split(RaphaelNew.separator);
    if (deg.length - 1) {
      cx = parseFloat(deg[1]);
      cy = parseFloat(deg[2]);
    }
    deg = parseFloat(deg[0]);
    if ((typeof cx !== "undefined" && cx !== null)) {
      this._.rt.deg = deg;
    } else {
      this._.rt.deg += deg;
    };
    if (!(typeof cy !== "undefined" && cy !== null)) {
      cx = null;
    }
    this._.rt.cx = cx;
    this._.rt.cy = cy;
    this.setBox(this.attrs, cx, cy);
    this.Group.style.rotation = this._.rt.deg;
    return this;
  };
  VMLElement.prototype.setBox = function(params, cx, cy) {
    var _f, _g, _h, attr, dim, gs, h, i, left, os, t, top, w, x, y;
    if (this.removed) {
      return this;
    }
    gs = this.Group.style;
    os = (this.shape && this.shape.style) || this.node.style;
    params = (typeof params !== "undefined" && params !== null) ? params : {};
    _g = params;
    for (i in _g) {
      if (!__hasProp.call(_g, i)) continue;
      _f = _g[i];
      this.attrs[i] = params[i];
    }
    cx = (typeof cx !== "undefined" && cx !== null) ? cx : this._.rt.cx;
    cy = (typeof cy !== "undefined" && cy !== null) ? cy : this._.rt.cy;
    attr = this.attrs;
    if ((_h = this.type) === "circle") {
      x = attr.cx - attr.r;
      y = attr.cy - attr.r;
      w = (h = attr.r * 2);
    } else if (_h === "ellipse") {
      x = attr.cx - attr.rx;
      y = attr.cy - attr.ry;
      w = attr.rx * 2;
      h = attr.ry * 2;
    } else if (_h === "image") {
      x = +attr.x;
      y = +attr.y;
      w = attr.width || 0;
      h = attr.height || 0;
    } else if (_h === "text") {
      this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("");
      x = attr.x - Math.round(this.W / 2);
      y = attr.y - this.H / 2;
      w = this.W;
      h = this.H;
    } else if (_h === "rect" || _h === "path") {
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
  VMLElement.prototype.hide = function() {
    if (!this.removed) {
      this.Group.style.display = "none";
    }
    return this;
  };
  VMLElement.prototype.show = function() {
    if (!this.removed) {
      this.Group.style.display = "block";
    }
    return this;
  };
  VMLElement.prototype.getBBox = function() {
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
  VMLElement.prototype.remove = function() {
    var _f, _g, _h, i;
    if (this.removed) {
      return this;
    }
    this.tear(this.paper);
    this.node.parentNode.removeChild(this.node);
    this.Group.parentNode.removeChild(this.Group);
    if (this.shape) {
      this.shape.parentNode.removeChild(this.shape);
    }
    _g = this;
    for (_f = 0, _h = _g.length; _f < _h; _f++) {
      i = _g[_f];
      delete this[i];
    }
    return (this.removed = true);
  };
  VMLElement.prototype.attr = function(name, value) {
    var _f, _g, _h, _i, _j, _k, _l, _m, i, key, par, params, res, subkey, values;
    if (this.removed) {
      return this;
    }
    if (!(typeof name !== "undefined" && name !== null)) {
      res = {};
      _g = this.attrs;
      for (i in _g) {
        if (!__hasProp.call(_g, i)) continue;
        _f = _g[i];
        res[i] = this.attrs[i];
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
    if (!(typeof value !== "undefined" && value !== null) && this.is(name, "string")) {
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
    if (this.attrs && !(typeof value !== "undefined" && value !== null) && this.is(name, "array")) {
      values = {};
      _i = name;
      for (i in _i) {
        if (!__hasProp.call(_i, i)) continue;
        _h = _i[i];
        values[name[i]] = this.attr(name[i]);
      }
      return values;
    }
    if ((typeof value !== "undefined" && value !== null)) {
      params = {};
      params[name] = value;
    }
    if (!(typeof value !== "undefined" && value !== null) && this.is(name, "object")) {
      params = name;
    }
    if (params) {
      _k = this.paper.customAttributes;
      for (key in _k) {
        if (!__hasProp.call(_k, key)) continue;
        _j = _k[key];
        if (params.hasOwnProperty(key) && this.is(this.paper.customAttributes[key], "function")) {
          par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
          this.attrs[key] = params[key];
          _m = par;
          for (subkey in _m) {
            if (!__hasProp.call(_m, subkey)) continue;
            _l = _m[subkey];
            params[subkey] = par[subkey];
          }
        }
      }
      if (params.text && this.type === "text") {
        this.node.string = params.text;
      };
      this.setFillAndStroke(params);
      if (params.gradient && (({
        circle: 1,
        ellipse: 1
      }).hasOwnProperty(this.type) || String(params.gradient).charAt() !== "r")) {
        this.addGradientFill(params.gradient);
      };
      if (!pathlike.hasOwnProperty(this.type) || this._.rt.deg) {
        this.setBox(this.attrs);
      }
    }
    return this;
  };
  VMLElement.prototype.toFront = function() {
    if (!this.removed) {
      this.Group.parentNode.appendChild(this.Group);
    }
    if (this.paper.top !== this) {
      VMLElement.__superClass__.toFront.call(this, this.paper);
    }
    return this;
  };
  VMLElement.prototype.toBack = function() {
    if (this.removed) {
      return this;
    }
    if (this.Group.parentNode.firstChild !== this.Group) {
      this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
      VMLElement.__superClass__.toBack.call(this, this.paper);
    }
    return this;
  };
  VMLElement.prototype.insertAfter = function(element) {
    if (this.removed) {
      return this;
    }
    if (element.constructor === Set) {
      element = element[element.length - 1];
    };
    if (element.Group.nextSibling) {
      element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
    } else {
      element.Group.parentNode.appendChild(this.Group);
    };
    VMLElement.__superClass__.insertAfter.call(this, element, this.paper);
    return this;
  };
  VMLElement.prototype.insertBefore = function(element) {
    if (this.removed) {
      return this;
    }
    if (element.constructor === Set) {
      element = element[0];
    };
    element.Group.parentNode.insertBefore(this.Group, element.Group);
    VMLElement.__superClass__.insertBefore.call(this, element, this.paper);
    return this;
  };
  VMLElement.prototype.blur = function(size) {
    var blurregexp, f, s;
    blurregexp = /[ ]progid:\S+Blur\([^\)]+\)/g;
    s = this.node.runtimeStyle;
    f = s.filter;
    f = f.replace(blurregexp, "");
    if (+size !== 0) {
      !(attrs.blur = size);
      s.filter = f + ' ' + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
      return (s.margin = this.format("-{0}px 0 0 -{0}px", Math.round(+size || 1.5)));
    } else {
      s.filter = f;
      s.margin = 0;
      return delete this.attrs.blur;
    }
  };
  VMLElement.prototype.setFillAndStroke = function(params) {
    var _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, ampersand, ampersandRE, att, br, brtag, dasharray, div, dstyle, fill, group, isURL, leftAngle, leftAngleRE, newfill, newpath, newstroke, opacity, rect, res, s, stroke, strokeColor, width, xy;
    this.attrs = this.attrs || {};
    newpath = (params.x !== this.attrs.x || params.y !== this.attrs.y || params.width !== this.attrs.width || params.height !== this.attrs.height || params.r !== this.attrs.r) && this.type === "rect";
    res = this;
    _g = params;
    for (att in _g) {
      if (!__hasProp.call(_g, att)) continue;
      _f = _g[att];
      this.attrs[att] = params[att];
    }
    if (newpath) {
      this.attrs.path = rectPath(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height, this.attrs.r);
      this.X = this.attrs.x;
      this.Y = this.attrs.y;
      this.W = this.attrs.width;
      this.H = this.attrs.height;
    }
    if (params.href) {
      this.node.href = params.href;
    }
    if (params.title) {
      this.node.title = params.title;
    }
    if (params.target) {
      this.node.target = params.target;
    }
    if (params.cursor) {
      this.node.style.cursor = params.cursor;
    }
    if ((function(){ for (var _h=0, _i=params.length; _h<_i; _h++) { if (params[_h] === "blur") return true; } return false; }).call(this)) {
      this.blur(params.blur);
    }
    if (params.path && this.type === "path" || newpath) {
      this.node.path = path2vml(this.attrs.path);
    };
    if (params.rotation !== null) {
      this.rotate(params.rotation, true);
    };
    if (params.translation) {
      xy = String(params.translation).split(RaphaelNew.separator);
      translate.call(this, xy[0], xy[1]);
      if (this._.rt.cx !== null) {
        this._.rt.cx += +xy[0];
        this._.rt.cy += +xy[1];
        this.setBox(this.attrs, xy[0], xy[1]);
      }
    }
    if (params.scale) {
      xy = String(params.scale).split(RaphaelNew.separator);
      this.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, +xy[2] || null, +xy[3] || null);
    }
    if ((function(){ for (var _j=0, _k=params.length; _j<_k; _j++) { if (params[_j] === "clip-rect") return true; } return false; }).call(this)) {
      rect = String(params["clip-rect"]).split(RaphaelNew.separator);
      if (rect.length === 4) {
        rect[2] = +rect[2] + (+rect[0]);
        rect[3] = +rect[3] + (+rect[1]);
        div = this.node.clipRect || document.createElement("div");
        dstyle = div.style;
        group = this.node.parentNode;
        dstyle.clip = this.format("rect({1}px {2}px {3}px {0}px)", rect);
        if (!this.node.clipRect) {
          dstyle.position = "absolute";
          dstyle.top = 0;
          dstyle.left = 0;
          dstyle.width = this.paper.width + "px";
          dstyle.height = this.paper.height + "px";
          group.parentNode.insertBefore(div, group);
          div.appendChild(group);
          this.node.clipRect = div;
        }
      }
      if (!params["clip-rect"]) {
        if (this.node.clipRect) {
          this.node.clipRect.style.clip = "";
        }
      }
    }
    if (this.type === "image" && params.src) {
      this.node.src = params.src;
    };
    if (this.type === "image" && params.opacity) {
      this.node.filterOpacity = ms + ".Alpha(opacity=" + (params.opacity * 100) + ")";
      this.node.stylefilter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
    }
    if (params.font) {
      this.node.style.font = params.font;
    }
    if (params["font-family"]) {
      this.node.style.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"';
    }
    if (params["font-size"]) {
      this.node.style.fontSize = params["font-size"];
    }
    if (params["font-weight"]) {
      this.node.style.fontWeight = params["font-weight"];
    }
    if (params["font-style"]) {
      this.node.style.fontStyle = params["font-style"];
    }
    if (params.opacity !== null || params["stroke-width"] !== null || params.fill !== null || params.stroke !== null || params["stroke-width"] !== null || params["stroke-opacity"] !== null || params["fill-opacity"] !== null || params["stroke-dasharray"] !== null || params["stroke-miterlimit"] !== null || params["stroke-linejoin"] !== null || params["stroke-linecap"] !== null) {
      this.node = this.shape || this.node;
      fill = this.node.getElementsByTagName("fill") && this.node.getElementsByTagName("fill")[0];
      newfill = false;
      if (!fill) {
        newfill = (fill = createNode("fill"));
      }
      if ((function(){ for (var _p=0, _q=(function(){ for (var _l=0, _m=params.length; _l<_m; _l++) { if (params[_l] === params || "opacity") return true; } return false; }).call(this).length; _p<_q; _p++) { if ((function(){ for (var _n=0, _o=params.length; _n<_o; _n++) { if (params[_n] === params || "opacity") return true; } return false; }).call(this)[_p] === "fill-opacity") return true; } return false; }).call(this)) {
        opacity = ((+this.attrs["fill-opacity"] + 1 || 2) - 1) * ((+this.attrs.opacity + 1 || 2) - 1) * ((+new Colour(params.fill).toRGB().o() + 1 || 2) - 1);
        opacity = Math.min(Math.max(opacity, 0), 1);
        fill.opacity = opacity;
      }
      if (params.fill) {
        fill.on = true;
      }
      if (fill.on === null || params.fill === "none") {
        fill.on = false;
      };
      if (fill.on && params.fill) {
        isURL = params.fill.match(RaphaelNew.ISURL);
        if (isURL) {
          fill.src = isURL[1];
          fill.type = "tile";
        } else {
          fill.color = new Colour(params.fill).toRGB().hex();
          fill.src = "";
          fill.type = "solid";
          if (new Colour(params.fill).toRGB().error() && ((function(){ (_r = res.type); for (var _t=0, _u=(_s = ({
            circle: 1,
            ellipse: 1
          }) || String(params.fill).charAt() !== "r").length; _t<_u; _t++) { if (_s[_t] === _r) return true; } return false; }).call(this)) && red.addGradientFill(params.fill)) {
            this.attrs.fill = "none";
          };
        }
      }
      if (newfill) {
        this.node.appendChild(fill);
      }
      stroke = this.node.getElementsByTagName("stroke") && this.node.getElementsByTagName("stroke")[0];
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
      strokeColor = new Colour(params.stroke).toRGB();
      if (stroke.on && params.stroke) {
        stroke.color = strokeColor.hex();
      }
      opacity = ((+this.attrs["stroke-opacity"] + 1 || 2) - 1) * ((+this.attrs.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
      width = (parseFloat(params["stroke-width"]) || 1) * 0.75;
      opacity = Math.min(Math.max(opacity, 0), 1);
      if (params["stroke-width"] === null) {
        width = this.attrs["stroke-width"];
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
        stroke.dashstyle = dasharray.hasOwnProperty(params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : "";
      }
      if (newstroke) {
        this.node.appendChild(stroke);
      }
    }
    if (res.type === "text") {
      s = res.paper.span.style;
      if (this.attrs.font) {
        s.font = this.attrs.font;
      }
      if (this.attrs["font-family"]) {
        s.fontFamily = this.attrs["font-family"];
      }
      if (this.attrs["font-size"]) {
        s.fontSize = this.attrs["font-size"];
      }
      if (this.attrs["font-weight"]) {
        s.fontWeight = this.attrs["font-weight"];
      }
      if (this.attrs["font-style"]) {
        s.fontStyle = this.attrs["font-style"];
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
      res.W = (this.attrs.w = res.paper.span.offsetWidth);
      res.H = (this.attrs.h = res.paper.span.offsetHeight);
      res.X = this.attrs.x;
      res.Y = this.attrs.y + Math.round(res.H / 2);
      if ((_v = this.attrs["text-anchor"]) === "start") {
        res.node.style["v-text-align"] = "left";
        return (res.bbx = Math.round(res.W / 2));
      } else if (_v === "end") {
        res.node.style["v-text-align"] = "right";
        return (res.bbx = -Math.round(res.W / 2));
      } else {
        return (res.node.style["v-text-align"] = "center");
      }
    }
  };
  VMLElement.prototype.addGradientFill = function(gradient) {
    var _f, _g, angle, attrs, clrs, dots, fill, fxfy, i, o, type;
    this.attrs = (typeof this.attrs !== "undefined" && this.attrs !== null) ? this.attrs : {};
    attrs = this.attrs;
    type = "linear";
    fxfy = ".5 .5";
    this.attrs.gradient = gradient;
    gradient = String(gradient).replace(radial_gradient, function(all, fx, fy) {
      type = "radial";
      if (fx && fy) {
        fx = parseFloat(fx);
        fy = parseFloat(fy);
        if (Math.pow(fx - 0.5, 2) + Math.pow(fy - 0.5, 2) > .25) {
          fy = Math.sqrt(0.25 - Math.pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5;
        };
        fxfy = fx + ' ' + fy;
      }
      return "";
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
    o = this.shape || this.node;
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
      _g = dots;
      for (i in _g) {
        if (!__hasProp.call(_g, i)) continue;
        _f = _g[i];
        if (dots[i].offset) {
          clrs.push(dots[i].offset + ' ' + dots[i].color);
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
  Circle = function(vml, x, y, r) {
    var g, o, ol;
    g = createNode("group");
    o = createNode("oval");
    ol = o.style;
    g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
    g.coordsize = coordsize;
    g.coordorigin = vml.coordorigin;
    g.appendChild(o);
    Circle.__superClass__.constructor.call(this, o, g, vml);
    this.type = "circle";
    this.setFillAndStroke({
      stroke: "#000000",
      fill: "none"
    });
    this.attrs.cx = x;
    this.attrs.cy = y;
    this.attrs.r = r;
    this.setBox({
      x: x - r,
      y: y - r,
      width: r * 2,
      height: r * 2
    });
    vml.canvas.appendChild(g);
    this;
    return this;
  };
  __extends(Circle, VMLElement);
  Rectangle = function(vml, x, y, w, h, r) {
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
    res;
    return this;
  };
  __extends(Rectangle, VMLElement);
  Ellipse = function(vml, x, y, rx, ry) {
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
    this.setFillAndStroke({
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
    res;
    return this;
  };
  __extends(Ellipse, VMLElement);
  Image = function(vml, src, x, y, w, h) {
    var g, o, res;
    g = createNode("group");
    o = createNode("image");
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
    res;
    return this;
  };
  __extends(Image, VMLElement);
  Text = function(vml, text, x, y) {
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
    path.v = this.format("m{0},{1}l{2},{1}", Math.round(x * 10), Math.round(y * 10), Math.round(x * 10) + 1);
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
    this.setFillAndStroke({
      font: RaphaelNew.availableAttrs.font,
      stroke: "none",
      fill: "#000"
    });
    res.setBox();
    vml.canvas.appendChild(g);
    res;
    return this;
  };
  __extends(Text, VMLElement);
  Path = function(vml, pathString) {
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
      path: Path.parse(pathString),
      fill: "none",
      stroke: "#000"
    };
    p.type = "path";
    p.path = [];
    p.Path = "";
    this.setFillAndStroke(attr);
    vml.canvas.appendChild(g);
    p;
    return this;
  };
  __extends(Path, VMLElement);
}
Path.parse = function(rawData) {
  var data, paramCounts;
  if (!(typeof rawData !== "undefined" && rawData !== null)) {
    return [['m', 0, 0]];
  } else if (RaphaelNew.is(rawData, "array") && RaphaelNew.is(rawData[0], "array")) {
    return rawData;
  } else {
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
    String(rawData).replace(/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, (function(a, b, c) {
      var _f, name, params;
      params = [];
      name = String.prototype.toLowerCase.call(b);
      c.replace(/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, (function(a, b) {
        return b && params.push(+b);
      }));
      if (name === "m" && params.length > 2) {
        data.push([b].concat(params.splice(0, 2)));
        name = "1";
        b = b === "m" ? "l" : "L";
      }
      _f = [];
      while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));
        if (!paramCounts[name]) {
          break;
        }
      }
      return _f;
    }));
    return data;
  }
};
Path.prototype.toString = function() {
  return this.attrs.path.join(",").replace(/,?([achlmqrstvxz]),?/gi, "$1");
};
Path.prototype.toRelative = function() {
  var _f, _g, _h, _i, _j, _k, _l, _m, command, i, j, k, len, mx, my, r, res, start, x, y;
  res = [];
  x = (y = (mx = (my = (start = 0))));
  if (this.attrs.path[0][0] === "M") {
    mx = (x = this.attrs.path[0][1]);
    my = (y = this.attrs.path[0][2]);
    start++;
    res.push(["M", x, y]);
  }
  _g = this.attrs.path;
  for (i in _g) {
    if (!__hasProp.call(_g, i)) continue;
    _f = _g[i];
    if (i >= start) {
      r = (res[i] = []);
      command = this.attrs.path[i];
      if (command[0] !== String.prototype.toLowerCase.call(command[0])) {
        r[0] = String.prototype.toLowerCase.call(command[0]);
        if ((_h = r[0]) === "a") {
          r[1] = command[1];
          r[2] = command[2];
          r[3] = command[3];
          r[4] = command[4];
          r[5] = command[5];
          r[6] = +(command[6] - x).toFixed(3);
          r[7] = +(command[7] - y).toFixed(3);
        } else if (_h === "v") {
          r[1] = +(command[1] - y).toFixed(3);
        } else {
          if (r[0] === "m") {
            mx = command[1];
            my = command[2];
          }
          _j = command;
          for (j in _j) {
            if (!__hasProp.call(_j, j)) continue;
            _i = _j[j];
            if (j >= 1) {
              r[j] = +(command[j] - (j % 2 ? x : y)).toFixed(3);
            };
          }
        }
      } else {
        if (command[0] === "m") {
          mx = command[1] + x;
          my = command[2] + y;
        }
        _l = command;
        for (k in _l) {
          if (!__hasProp.call(_l, k)) continue;
          _k = _l[k];
          res[i][k] = command[k];
        }
      }
      len = res[i].length;
      if ((_m = res[i][0]) === "z") {
        x = mx;
        y = my;
      } else if (_m === "h") {
        x += +res[i][len - 1];
      } else if (_m === "v") {
        y += +res[i][len - 1];
      } else {
        x += +res[i][len - 2];
        y += +res[i][len - 1];
      }
    }
  }
  this.attrs.path = res;
  return this;
};
Path.prototype.toAbsolute = function() {
  var _f, _g, _h, _i, _j, _k, _l, _m, command, i, j, k, len, mx, my, r, res, start, x, y;
  res = [];
  x = (y = (mx = (my = (start = 0))));
  if (this.attrs.path[0][0] === "M") {
    mx = (x = +this.attrs.path[0][1]);
    my = (y = +this.attrs.path[0][2]);
    start++;
    res[0] = ["M", x, y];
  }
  _g = this.attrs.path;
  for (i in _g) {
    if (!__hasProp.call(_g, i)) continue;
    _f = _g[i];
    if (i >= start) {
      r = (res[i] = []);
      command = this.attrs.path[i];
      if (command[0] !== String.prototype.toUpperCase.call(command[0])) {
        r[0] = String.prototype.toUpperCase.call(command[0]);
        if ((_h = r[0]) === "A") {
          r[1] = command[1];
          r[2] = command[2];
          r[3] = command[3];
          r[4] = command[4];
          r[5] = command[5];
          r[6] = +(command[6] + x);
          r[7] = +(command[7] + y);
        } else if (_h === "V") {
          r[1] = +(command[1] + y);
        } else if (_h === "H") {
          r[1] = +(command[1] + x);
        } else {
          if (r[0] === "M") {
            mx = +command[1] + x;
            my = +command[2] + y;
          }
          _j = command;
          for (j in _j) {
            if (!__hasProp.call(_j, j)) continue;
            _i = _j[j];
            if (j >= 1) {
              r[j] = +command[j] + (j % 2 ? x : y);
            };
          }
        }
      } else {
        _l = command;
        for (k in _l) {
          if (!__hasProp.call(_l, k)) continue;
          _k = _l[k];
          res[i][k] = command[k];
        }
      }
      len = res[i].length;
      if ((_m = r[0]) === "Z") {
        x = mx;
        y = my;
      } else if (_m === "H") {
        x = r[1];
      } else if (_m === "V") {
        y = r[1];
      } else if (_m === "M") {
        x = (mx = res[i][len - 2]);
        y = (my = res[i][len - 1]);
      } else {
        x = res[i][len - 2];
        y = res[i][len - 1];
      }
    }
  }
  this.attrs.path = res;
  return this;
};
Raphael = (function() {
  var ISURL, R, Raphael, Set, _f, _g, _h, _i, _j, animKeyFrames, arcToCurve, availableAnimAttrs, availableAttrs, bezierrg, commaSpaces, create, createNode, createUUID, curveDimensions, curveslengths, elements, events, findDotAtSegment, getContainer, getLengthFactory, getPointAtLength, getPointAtSegmentLength, getSubpathsAtLength, getTotalLength, hsrg, isnan, lineToCurve, method, ms, oldRaphael, p2s, parseDots, path2vml, pathClone, pathDimensions, pathToCurve, plugins, quadraticToCurve, radial_gradient, removed, setSize, sortByKey, supportsTouch, touchMap, translate, upto255, version;
  elements = {
    circle: 1,
    rect: 1,
    path: 1,
    ellipse: 1,
    text: 1,
    image: 1
  };
  events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "orientationchange", "touchcancel", "gesturestart", "gesturechange", "gestureend"];
  availableAttrs = {
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
    href: "http://Rjs.com/",
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
    title: "R",
    translation: "0 0",
    width: 0,
    x: 0,
    y: 0
  };
  availableAnimAttrs = {
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
  ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
  radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;
  isnan = {
    "NaN": 1,
    "Infinity": 1,
    "-Infinity": 1
  };
  bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/;
  ms = " progid:DXImageTransform.Microsoft";
  animKeyFrames = /^(from|to|\d+%?)$/;
  commaSpaces = /\s*,\s*/;
  hsrg = {
    hs: 1,
    rg: 1
  };
  p2s = /,?([achlmqrstvxz]),?/gi;
  radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;
  supportsTouch = (function(){ for (var _f=0, _g=document.length; _f<_g; _f++) { if (document[_f] === "createTouch") return true; } return false; }).call(this);
  touchMap = {
    mousedown: "touchstart",
    mousemove: "touchmove",
    mouseup: "touchend"
  };
  sortByKey = function(a, b) {
    return a.key - b.key;
  };
  oldRaphael = {
    was: Object.prototype.hasOwnProperty.call(window, "Raphael") && window.Raphael,
    is: window.Raphael
  };
  R = function() {
    var _h, _i, a, cnv, i, j, res;
    if (R.is(arguments[0], "array")) {
      a = arguments[0];
      cnv = create.apply(R, a.splice(0, 3 + R.is(a[0], "number")));
      res = cnv.set();
      _i = a;
      for (i in _i) {
        if (!__hasProp.call(_i, i)) continue;
        _h = _i[i];
        j = a[i] || {};
        elements.hasOwnProperty(j.type) && res.push(cnv[j.type]().attr(j));
      }
      return res;
    }
    return create.apply(R, arguments);
    return this;
  };
  R.version = '1.5.2';
  R.hsrg = {
    hs: 1,
    rg: 1
  };
  R._oid = 0;
  R._id = 0;
  R.type = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
  R.fn = {};
  R.prototype.userAgentSupportsSVG = function() {
    var _h;
    return (typeof (_h = window.SVGAngle) !== "undefined" && _h !== null) || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
  };
  R.prototype.type = function() {
    return this.userAgentType = (typeof this.userAgentType !== "undefined" && this.userAgentType !== null) ? this.userAgentType : this.userAgentSupportsSVG() ? "SVG" : "VML";
  };
  R.is = function(object, type) {
    ({
      type: String.prototype.toLowerCase.call(type)
    });
    if (type === "finite") {
      return !isnan.hasOwnProperty(+object);
    }
    return (type === "null" && object === null) || (type === typeof object) || (type === "object" && object === Object(object)) || (type === "array" && Array.isArray && Array.isArray(object)) || Object.prototype.toString.call(object).slice(8, -1).toLowerCase() === type;
  };
  R.angle = function(x1, y1, x2, y2, x3, y3) {
    var x, y;
    if (x3 === null) {
      x = x1 - x2;
      y = y1 - y2;
      if (!x && !y) {
        return 0;
      }
      return ((x < 0) * 180 + Math.atan(-y / -x) * 180 / PI + 360) % 360;
    } else {
      return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
    }
  };
  R.rad = function(deg) {
    return deg % 360 * PI / 180;
  };
  R.deg = function(rad) {
    return rad * 180 / PI % 360;
  };
  R.snapTo = function(values, value, tolerance) {
    var i, rem;
    tolerance = R.is(tolerance, "finite") ? tolerance : 10;
    if (R.is(values, array)) {
      i = values.length;
      while (i--) {
        if ((Math.abs(values[i] - value) <= tolerance)) {
          return values[i];
        }
      }
    } else {
      values = +values;
      rem = value % values;
      if (rem < tolerance) {
        return value - rem;
      }
      if (rem > values - tolerance) {
        return value - rem + values;
      }
    }
    return value;
  };
  createUUID = function() {
    var i, s;
    s = [];
    i = 0;
    for (i = 0; i <= 31; i++) {
      s[i] = (~~(Math.random() * 16)).toString(16);
    }
    s[12] = 4;
    s[16] = ((s[16] & 3) | 8).toString(16);
    return "r-" + s.join("");
  };
  R.setWindow = function(newwin) {
    var doc, win;
    win = newwin;
    return (doc = win.document);
  };
  R.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
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
  pathDimensions = function(path) {
    var X, Y, _h, _i, _j, dim, p, x, xmin, y, ymin;
    if (!(typeof path !== "undefined" && path !== null)) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    path = pathToCurve(path);
    x = (y = 0);
    X = [];
    Y = [];
    _i = path;
    for (_h = 0, _j = _i.length; _h < _j; _h++) {
      p = _i[_h];
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
  pathClone = function(pathArray) {
    var _h, _i, _j, _k, _l, _m, i, j, path, pathItem, res;
    res = [];
    if ((!R.is(pathArray, "array") || !R.is(pathArray && pathArray[0], "array"))) {
      pathArray = R.parsePathString(pathArray);
    };
    i = -1;
    _i = pathArray;
    for (_h = 0, _j = _i.length; _h < _j; _h++) {
      path = _i[_h];
      res[++i] = [];
      j = -1;
      _l = path;
      for (_k = 0, _m = _l.length; _k < _m; _k++) {
        pathItem = _l[_k];
        res[i][++j] = pathItem;
      }
    }
    res.toString = R._path2string;
    return res;
  };
  lineToCurve = function(x1, y1, x2, y2) {
    return [x1, y1, x2, y2, x2, y2];
  };
  quadraticToCurve = function(x1, y1, ax, ay, x2, y2) {
    return [1 / 3 * x1 + 2 / 3 * ax, 1 / 3 * y1 + 2 / 3 * ay, 1 / 3 * x2 + 2 / 3 * ax, 1 / 3 * y2 + 2 / 3 * ay, x2, y2];
  };
  arcToCurve = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    var PI, _120, c1, c2, cos, cx, cy, df, f1, f2, f2old, h, hx, hy, i, k, m1, m2, m3, m4, newres, rad, res, rotate, rx2, ry2, s1, s2, sin, t, x, x2old, xy, y, y2old;
    PI = Math.PI;
    _120 = PI * 120 / 180;
    rad = PI / 180 * (+angle || 0);
    res = [];
    rotate = function(x, y, rad) {
      var X, Y;
      X = x * Math.cos(rad) - y * Math.sin(rad);
      Y = x * Math.sin(rad) + y * Math.cos(rad);
      return {
        x: X,
        y: Y
      };
    };
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
      f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
      f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
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
  findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var X, Y, t1;
    t1 = 1 - t;
    X = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x;
    Y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y;
    return {
      x: X,
      y: Y
    };
  };
  curveDimensions = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
    var a, b, c, dot, t1, t2, x, y;
    a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x);
    b = 2 * (c1x - p1x) - 2 * (c2x - c1x);
    c = p1x - c1x;
    t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
    t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
    y = [p1y, p2y];
    x = [p1x, p2x];
    if (Math.abs(t1) > "1e12") {
      t1 = 0.5;
    }
    if (Math.abs(t2) > "1e12") {
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
    if (Math.abs(t1) > "1e12") {
      t1 = 0.5;
    }
    if (Math.abs(t2) > "1e12") {
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
      }
    };
  };
  pathToCurve = function(path, path2) {
    var attrs, attrs2, fixArc, fixM, i, ii, p, p2, processPath, seg, seg2, seg2len, seglen;
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
      var _h, nx, ny;
      if (!path) {
        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
      }
      if (path[0] !== 'T' && path[0] !== 'Q') {
        d.qx = (d.qy = null);
      }
      if ((_h = path[0]) === "M") {
        d.X = path[1];
        d.Y = path[2];
        return path;
      } else if (_h === "A") {
        return ["C"].concat(arcToCurve.apply(0, [d.x, d.y].concat(path.slice(1))));
      } else if (_h === "S") {
        nx = d.x + (d.x - (d.bx || d.x));
        ny = d.y + (d.y - (d.by || d.y));
        return ["C", nx, ny].concat(path.slice(1));
      } else if (_h === "T") {
        d.qx = d.x + (d.x - (d.qx || d.x));
        d.qy = d.y + (d.y - (d.qy || d.y));
        return ["C"].concat(quadraticToCurve(d.x, d.y, d.qx, d.qy, path[1], path[2]));
      } else if (_h === "Q") {
        d.qx = path[1];
        d.qy = path[2];
        return ["C"].concat(quadraticToCurve(d.x, d.y, path[1], path[2], path[3], path[4]));
      } else if (_h === "L") {
        return ["C"].concat(lineToCurve(d.x, d.y, path[1], path[2]));
      } else if (_h === "H") {
        return ["C"].concat(lineToCurve(d.x, d.y, path[1], d.y));
      } else if (_h === "V") {
        return ["C"].concat(lineToCurve(d.x, d.y, d.x, path[1]));
      } else if (_h === "Z") {
        return ["C"].concat(lineToCurve(d.x, d.y, d.X, d.Y));
      } else {
        return path;
      }
    };
    fixArc = function(pp, i, ii) {
      var pi;
      if (pp[i].length > 7) {
        pp[i].shift();
        pi = pp[i];
        while (pi.length) {
          pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
        }
        pp.splice(i, 1);
        ii = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0) - 1;
      }
      return ii;
    };
    fixM = function(path1, path2, a1, a2, i, ii) {
      if ((typeof path1 !== "undefined" && path1 !== null) && (typeof path2 !== "undefined" && path2 !== null) && path1[i][0] === "M" && path2[i][0] !== "M") {
        path2.splice(i, 0, ["M", a2.x, a2.y]);
        a1.bx = 0;
        a1.by = 0;
        a1.x = path1[i][1];
        a1.y = path1[i][2];
        ii = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0) - 1;
      }
      return ii;
    };
    ii = Math.max(p.length, (typeof p2 !== "undefined" && p2 !== null) ? p2.length : 0) - 1;
    for (i = 0; (0 <= ii ? i <= ii : i >= ii); (0 <= ii ? i += 1 : i -= 1)) {
      p[i] = processPath(p[i], attrs);
      ii = fixArc(p, i, ii);
      if ((typeof p2 !== "undefined" && p2 !== null)) {
        p2[i] = processPath(p2[i], attrs2);
      }
      if ((typeof p2 !== "undefined" && p2 !== null)) {
        ii = fixArc(p2, i, ii);
      }
      ii = fixM(p, p2, attrs, attrs2, i, ii);
      ii = fixM(p2, p, attrs2, attrs, i, ii);
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
  };
  parseDots = function(gradient) {
    var _h, _i, _j, _k, _l, _m, d, dot, dots, end, i, j, k, par, start, value;
    dots = [];
    _h = gradient;
    for (i = 0, _i = _h.length; i < _i; i++) {
      value = _h[i];
      dot = {};
      par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
      dot.color = new Colour(par[1]).toRGB();
      if ((dot.color.error)) {
        return null;
      }
      dot.color = dot.color.hex();
      if (par[2]) {
        dot.offset = par[2] + "%";
      }
      dots.push(dot);
    }
    _j = dots;
    for (i = 0, _k = _j.length; i < _k; i++) {
      value = _j[i];
      if (i > 0 && i < dots.length - 1) {
        if (!dots[i].offset) {
          start = parseFloat(dots[i - 1].offset || 0);
          end = 0;
          _l = dots;
          for (j = 0, _m = _l.length; j < _m; j++) {
            value = _l[j];
            if (j >= i + 1) {
              if (dots[j].offset) {
                end = dots[j].offset;
                break;
              }
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
    }
    return dots;
  };
  getContainer = function(x, y, w, h) {
    var container;
    if (R.is(x, "string") || R.is(x, "object")) {
      container = R.is(x, "string") ? document.getElementById(x) : x;
      return container.tagName ? !(typeof y !== "undefined" && y !== null) ? {
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
  };
  plugins = function(con, add) {
    var _h, _i, _j, _k, prop, that;
    that = this;
    _i = []; _k = add;
    for (_j in _k) {
      if (!__hasProp.call(_k, _j)) continue;
      (function() {
        var _l, _m, _n;
        var prop = _j;
        var _h = _k[_j];
        return _i.push((function() {
          if (!((function(){ for (var _m=0, _n=con.length; _m<_n; _m++) { if (con[_m] === prop) return true; } return false; }).call(this))) {
            if ((_l = typeof add[prop]) === "function") {
              return (function(f) {
                return (con[prop] = con === that ? f : (function() {
                  return f.apply(that, arguments);
                }));
              })(add[prop]);
            } else if (_l === "object") {
              con[prop] = con[prop] || {};
              return plugins.call(this, con[prop], add[prop]);
            } else {
              return (con[prop] = add[prop]);
            }
          }
        }).call(this));
      }).call(this);
    }
    return _i;
  };
  removed = function(methodname) {
    return function() {
      throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object");
    };
  };
  if (R.type === "SVG") {
    R.prototype.toString = function() {
      return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    setSize = function(width, height) {
      this.width = width || this.width;
      this.height = height || this.height;
      this.canvas.setAttribute("width", this.width);
      this.canvas.setAttribute("height", this.height);
      return this;
    };
    create = function() {
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
      plugins.call(container, container, R.fn);
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
      var _h, _i, _j, _k, i;
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      _h = []; _j = this;
      for (_i = 0, _k = _j.length; _i < _k; _i++) {
        i = _j[_i];
        _h.push((this[i] = removed(i)));
      }
      return _h;
    };
  }
  if (R.type === "VML") {
    path2vml = function(path) {
      var _h, _i, _j, _k, command, i, j, p, pa, r, res, total;
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
      _i = pa;
      for (i in _i) {
        if (!__hasProp.call(_i, i)) continue;
        _h = _i[i];
        p = pa[i];
        r = String.prototype.toLowerCase.call(pa[i][0]);
        if (r === "z") {
          r = "x";
        }
        _k = p;
        for (j in _k) {
          if (!__hasProp.call(_k, j)) continue;
          _j = _k[j];
          if (j >= 1) {
            r += Math.round(p[j] * zoom) + (j !== p.length - 1 ? "," : "");
          };
        }
        res.push(r);
      }
      return res.join(" ");
    };
    R.prototype.toString = function() {
      return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    R.prototype.rectPath = function(x, y, w, h, r) {
      return r ? R.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", x + r, y, w - r * 2, r, -r, h - r * 2, r * 2 - w, r * 2 - h) : R.format("M{0},{1}l{2},0,0,{3},{4},0z", x, y, w, h, -w);
    };
    R.prototype.setSize = function(width, height) {
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
    create = function() {
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
      res.coordsize = zoom * 1e3 + ' ' + zoom * 1e3;
      res.coordorigin = "0 0";
      res.span = document.createElement("span");
      res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
      c.appendChild(res.span);
      cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
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
      plugins.call(res, res, R.fn);
      return res;
    };
    Paper.prototype.clear = function() {
      this.canvas.innerHTML = "";
      this.span = document.createElement("span");
      this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
      this.canvas.appendChild(this.span);
      return (this.bottom = (this.top = null));
    };
    Paper.prototype.remove = function() {
      var _h, _i, _j, i;
      this.canvas.parentNode.removeChild(this.canvas);
      _i = this;
      for (_h = 0, _j = _i.length; _h < _j; _h++) {
        i = _i[_h];
        this[i] = removed(i);
      }
      return true;
    };
  }
  version = navigator.userAgent.match(/Version\/(.*?)\s/);
  if ((navigator.vendor === "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) === "iP")) {
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
  Paper.prototype.circle = function(x, y, r) {
    return new Circle(this, x, y, r);
  };
  Paper.prototype.rect = function(x, y, w, h, r) {
    return new Rectangle(this, x, y, w, h, r);
  };
  Paper.prototype.ellipse = function(x, y, rx, ry) {
    return new Ellipse(this, x, y, rx, ry);
  };
  Paper.prototype.path = function(pathString) {
    if (pathString && !R.is(pathString, "string") && !R.is(pathString[0], "array")) {
      pathString += "";
    }
    return new Path(this, R.format.apply(R, arguments));
  };
  Paper.prototype.image = function(src, x, y, w, h) {
    return new Image(this, src, x, y, w, h);
  };
  Paper.prototype.text = function(x, y, text) {
    return new Text(this, String(text), x, y);
  };
  Paper.prototype.set = function(itemsArray) {
    if (arguments.length > 1) {
      itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length);
    }
    return new Set(itemsArray);
  };
  Paper.prototype.setSize = R.prototype.setSize;
  Paper.prototype.top = (Paper.prototype.bottom = null);
  Paper.prototype.R = R;
  curveslengths = {};
  getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
    var cache, dot, i, len, name, old, precision, total;
    len = 0;
    precision = 100;
    name = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y].join();
    cache = curveslengths[name];
    if (!cache) {
      curveslengths[name] = (cache = {
        data: []
      });
    }
    if (cache.timer) {
      clearTimeout(cache.timer);
    }
    cache.timer = setTimeout(function() {
      return delete curveslengths[name];
    }, 2000);
    if ((typeof length !== "undefined" && length !== null)) {
      total = getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
      precision = ~~total * 10;
    }
    for (i = 0; (0 <= precision ? i <= precision : i >= precision); (0 <= precision ? i += 1 : i -= 1)) {
      if (cache.data[length] > i) {
        dot = cache.data[i * precision];
      } else {
        dot = R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i / precision);
        cache.data[i] = dot;
      }
      if (i) {
        len += Math.pow(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2), .5);
      }
      if ((typeof length !== "undefined" && length !== null) && len >= length) {
        return dot;
      }
      old = dot;
    }
    if (!(typeof length !== "undefined" && length !== null)) {
      return len;
    }
  };
  getLengthFactory = function(istotal, subpath) {
    return function(path, length, onlystart) {
      var _h, _i, _j, l, len, p, point, sp, subpaths, x, y;
      path = pathToCurve(path);
      sp = "";
      subpaths = {};
      len = 0;
      _i = path;
      for (_h = 0, _j = _i.length; _h < _j; _h++) {
        p = _i[_h];
        if (p[0] === "M") {
          x = +p[1];
          y = +p[2];
        } else {
          l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
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
              return {
                x: point.x,
                y: point.y,
                alpha: point.alpha
              };
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
          return R.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1);
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
    return getPointAtLength(this.attrs.path, length);
  };
  Element.prototype.getSubpath = function(from, to) {
    var a;
    if (this.type !== "path") {
      return null;
    }
    if (Math.abs(this.getTotalLength() - to) < "1e-6") {
      return getSubpathsAtLength(this.attrs.path, from).end;
    }
    a = getSubpathsAtLength(this.attrs.path, to, 1);
    return from ? getSubpathsAtLength(a, from).end : a;
  };
  upto255 = function(color) {
    return Math.max(Math.min(color, 255), 0);
  };
  translate = function(x, y) {
    var _h, path;
    if (!(typeof x !== "undefined" && x !== null)) {
      return {
        x: this._.tx,
        y: this._.ty,
        toString: this.x_y
      };
    }
    this._.tx += +x;
    this._.ty += +y;
    if ((_h = this.type) === "circle" || _h === "ellipse") {
      this.attr({
        cx: +x + this.attrs.cx,
        cy: +y + this.attrs.cy
      });
    } else if (_h === "rect" || _h === "image" || _h === "text") {
      this.attr({
        x: +x + this.attrs.x,
        y: +y + this.attrs.y
      });
    } else if (_h === "path") {
      path = pathToRelative(this.attrs.path);
      path[0][1] += +x;
      path[0][2] += +y;
      this.attr({
        path: path
      });
    }
    return this;
  };
  Set = function(items) {
    var _h, _i, i;
    this.items = [];
    this.length = 0;
    this.type = "set";
    if (items) {
      _i = items;
      for (i in _i) {
        if (!__hasProp.call(_i, i)) continue;
        _h = _i[i];
        if (items[i] && (items[i].constructor === Element || items[i].constructor === Set)) {
          this[this.items.length] = (this.items[this.items.length] = items[i]);
          this.length++;
        }
      }
    }
    return this;
  };
  Set.prototype.push = function() {
    var _h, _i, i, item, len;
    _i = arguments;
    for (i in _i) {
      if (!__hasProp.call(_i, i)) continue;
      _h = _i[i];
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
    var _h, _i, _j, _k, i, j;
    if (name && R.is(name, "array") && R.is(name[0], "object")) {
      _i = name;
      for (j in _i) {
        if (!__hasProp.call(_i, j)) continue;
        _h = _i[j];
        this.items[j].attr(name[j]);
      }
    } else {
      _k = this.items;
      for (i in _k) {
        if (!__hasProp.call(_k, i)) continue;
        _j = _k[i];
        this.items[i].attr(name, value);
      }
    }
    return this;
  };
  Set.prototype.animate = function(params, ms, easing, callback) {
    var collector, i, item, len, set;
    if (R.is(easing, "function") || !easing) {
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
    easing = R.is(easing, "string") ? easing : collector;
    item = this.items[--i].animate(params, ms, easing, collector);
    while (i--) {
      if (this.items[i] && !this.items[i].removed) {
        this.items[i].animateWith(item, params, ms, easing, collector);
      }
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
    var _h, box, h, i, w, x, y;
    x = [];
    y = [];
    w = [];
    h = [];
    _h = this.items.length;
    for (i = _h; (_h <= 0 ? i <= 0 : i >= 0); (_h <= 0 ? i += 1 : i -= 1)) {
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
    var _h, _i, i;
    s = new Set();
    _i = this.items;
    for (i in _i) {
      if (!__hasProp.call(_i, i)) continue;
      _h = _i[i];
      s.push(this.items[i].clone());
    }
    return s;
  };
  _j = Element.prototype;
  for (_i in _j) {
    if (!__hasProp.call(_j, _i)) continue;
    (function() {
      var method = _i;
      var _h = _j[_i];
      return (Set.prototype[method] = (function(methodname) {
        return function() {
          var _k, _l, i;
          _l = this.items;
          for (i in _l) {
            if (!__hasProp.call(_l, i)) continue;
            _k = _l[i];
            this.items[i][methodname].apply(this.items[i], arguments);
          }
          return this;
        };
      })(method));
    })();
  }
  R.prototype.registerFont = function(font) {
    var _k, _l, _m, _n, _o, family, fontcopy, glyph, prop;
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
    _l = font.face;
    for (prop in _l) {
      if (!__hasProp.call(_l, prop)) continue;
      _k = _l[prop];
      fontcopy.face[prop] = font.face[prop];
    }
    if (this.fonts[family]) {
      this.fonts[family].push(fontcopy);
    } else {
      this.fonts[family] = [fontcopy];
    };
    if (!font.svg) {
      fontcopy.face["units-per-em"] = parseInt(font.face["units-per-em"], 10);
      _o = font.glyphs;
      for (_n in _o) {
        if (!__hasProp.call(_o, _n)) continue;
        (function() {
          var _p, _q, _r, k, path;
          var glyph = _n;
          var _m = _o[_n];
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
            _q = []; _r = path.k;
            for (k in _r) {
              if (!__hasProp.call(_r, k)) continue;
              _p = _r[k];
              _q.push((fontcopy.glyphs[glyph].k[k] = path.k[k]));
            }
            return _q;
          }
        })();
      }
    }
    return font;
  };
  Paper.prototype.getFont = function(family, weight, style, stretch) {
    var _k, _l, _m, _n, font, fontName, i, name, thefont;
    stretch = stretch || "normal";
    style = style || "normal";
    weight = +weight || ({
      normal: 400,
      bold: 700,
      lighter: 300,
      bolder: 800
    })[weight] || 400;
    if (!R.fonts) {
      return null;
    }
    font = R.fonts[family];
    if (!font) {
      name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
      _l = R.fonts;
      for (fontName in _l) {
        if (!__hasProp.call(_l, fontName)) continue;
        _k = _l[fontName];
        if (name.test(fontName)) {
          font = R.fonts[fontName];
          break;
        }
      }
    }
    if (font) {
      _n = font;
      for (i in _n) {
        if (!__hasProp.call(_n, i)) continue;
        _m = _n[i];
        thefont = font[i];
        if (thefont.face["font-weight"] === weight && (thefont.face["font-style"] === style || !thefont.face["font-style"]) && thefont.face["font-stretch"] === stretch) {
          break;
        }
      }
    }
    return thefont;
  };
  Paper.prototype.print = function(x, y, string, font, size, origin, letter_spacing) {
    var _k, _l, bb, curr, height, i, letters, out, path, prev, scale, shift, top;
    origin = (typeof origin !== "undefined" && origin !== null) ? origin : "middle";
    letter_spacing = Math.max(Math.min(letter_spacing || 0, 1), -1);
    out = this.set();
    letters = String(string).split("");
    shift = 0;
    path = "";
    if (R.is(font, string)) {
      font = this.getFont(font);
    }
    if (font) {
      scale = (size || 16) / font.face["units-per-em"];
      bb = font.face.bbox.split(RaphaelNew.separator);
      top = +bb[0];
      height = +bb[1] + (origin === "baseline" ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);
      _l = letters;
      for (i in _l) {
        if (!__hasProp.call(_l, i)) continue;
        _k = _l[i];
        prev = i && font.glyphs[letters[i - 1]] || {};
        curr = font.glyphs[letters[i]];
        shift += i ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
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
  R.ninja = function() {
    if (oldRaphael.was) {
      (window.Raphael = oldRaphael.is);
    } else {
      delete Raphael;
    };
    return R;
  };
  functionCacher(R.toHex, R);
  functionCacher(R.getRGB, R);
  functionCacher(R.pathDimensions, R);
  functionCacher(R.pathToRelative, 0, R.pathClone);
  functionCacher(R.pathToAbsolute, null, R.pathClone);
  R.el = Element.prototype;
  R.st = Set.prototype;
  return oldRaphael.was ? (window.Raphael = R) : (Raphael = R);
})();
Colour = function(colour) {
  var blue, brightness, colourRegExp, commaSpaces, green, hue, lightness, opacity, red, saturation, start, t, values;
  if (!colour || !!((colour = String(colour)).indexOf("-") + 1)) {
    return new RGB(-1, -1, -1).isError();
  }
  if (colour === "none") {
    return new RGB(-1, -1, -1).isNone();
  }
  start = colour.toLowerCase().substring(0, 2);
  if (start !== "hs" && start !== "rg" && !colour.charAt() !== "#") {
    colour = Colour.toHex(colour);
  };
  colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?\s*(?:,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?\s*(?:,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?\s*(?:,\s*[\d\.]+)?)%?\s*\))\s*$/i;
  commaSpaces = /\s*,\s*/;
  colour = colour.match(colourRegExp);
  if ((typeof colour !== "undefined" && colour !== null)) {
    if (colour[2]) {
      return new RGB(parseInt(colour[2].substring(1, 3), 16), parseInt(colour[2].substring(3, 5), 16), parseInt(colour[2].substring(5), 16));
    }
    if (colour[3]) {
      return new RGB(parseInt((t = colour[3].charAt(1)) + t, 16), parseInt((t = colour[3].charAt(2)) + t, 16), parseInt((t = colour[3].charAt(3)) + t, 16));
    }
    if (colour[4]) {
      values = colour[4].split(commaSpaces);
      red = parseFloat(values[0]);
      if (values[0].slice(-1) === "%") {
        red *= 2.55;
      }
      green = parseFloat(values[1]);
      if (values[1].slice(-1) === "%") {
        green *= 2.55;
      }
      blue = parseFloat(values[2]);
      if (values[2].slice(-1) === "%") {
        blue *= 2.55;
      }
      if (colour[1].toLowerCase().slice(0, 4) === "rgba") {
        opacity = parseFloat(values[3]);
      }
      if (values[3] && values[3].slice(-1) === "%") {
        opacity /= 100;
      }
      return new RGB(red, green, blue, opacity);
    }
    if (colour[5]) {
      values = colour[5].split(commaSpaces);
      hue = parseFloat(values[0]);
      if (values[0].slice(-1) === "%") {
        hue *= 3.6;
      }
      saturation = parseFloat(values[1]);
      if (values[1].slice(-1) === "%") {
        saturation /= 100;
      }
      brightness = parseFloat(values[2]);
      if (values[2].slice(-1) === "%") {
        brightness /= 100;
      }
      if (colour[1].toLowerCase().slice(0, 4) === "hsba") {
        opacity = parseFloat(values[3]);
      }
      if (values[3] && values[3].slice(-1) === "%") {
        opacity /= 100;
      }
      return new HSB(hue, saturation, brightness);
    }
    if (colour[6]) {
      values = colour[6].split(commaSpaces);
      hue = parseFloat(values[0]);
      if (values[0].slice(-1) === "%") {
        hue *= 3.6;
      }
      saturation = parseFloat(values[1]);
      if (values[1].slice(-1) === "%") {
        saturation /= 100;
      }
      lightness = parseFloat(values[2]);
      if (values[2].slice(-1) === "%") {
        lightness /= 100;
      }
      if (colour[1].toLowerCase().slice(0, 4) === "hsla") {
        opacity = parseFloat(values[3]);
      }
      if (values[3] && values[3].slice(-1) === "%") {
        opacity /= 100;
      }
      return new HSL(hue, saturation, lightness);
    }
  }
  new RGB(-1, -1, -1).isError();
  return this;
};
Colour.prototype.toRGB = function() {
  return this;
};
Colour.prototype.toHSB = function() {
  return this;
};
Colour.prototype.toHSL = function() {
  return this;
};
Colour.toHex = function(color) {
  var bod, docum, i, range, toHex, trim;
  if (Raphael.type === "VML") {
    trim = /^\s+|\s+$/g;
    try {
      docum = new ActiveXObject("htmlfile");
      docum.write("");
      docum.close();
      bod = docum.body;
    } catch (error) {
      bod = createPopup().document.body;
    }
    range = bod.createTextRange();
    toHex = functionCacher(function(color) {
      var value;
      try {
        bod.style.color = String(color).replace(trim, "");
        value = range.queryCommandValue("ForeColor");
        value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
        return "#" + ("000000" + value.toString(16)).slice(-6);
      } catch (error) {
        return "none";
      }
    });
  } else {
    i = document.createElement("i");
    i.title = "Rapha\xebl Colour Picker";
    i.style.display = "none";
    document.body.appendChild(i);
    toHex = functionCacher(function(color) {
      i.style.color = color;
      return document.defaultView.getComputedStyle(i, "").getPropertyValue("color");
    });
  }
  return toHex(color);
};
RGB = function(red, green, blue, opacity) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.opacity = isFinite(opacity) ? opacity : 1;
  this.max = Math.max(this.red, this.green, this.blue);
  this.min = Math.min(this.red, this.green, this.blue);
  this.chroma = this.max - this.min;
  return this;
};
__extends(RGB, Colour);
RGB.rg = /^(?=[\da-f]$)/;
RGB.prototype.toString = function() {
  return this.hex();
};
RGB.prototype.isError = function() {
  this.error = true;
  return this;
};
RGB.prototype.isNone = function() {
  this.none = true;
  return this;
};
RGB.prototype.hex = function() {
  return this.none ? 'none' : "#" + (16777216 | Math.round(this.blue) | (Math.round(this.green) << 8) | (Math.round(this.red) << 16)).toString(16).slice(1);
};
RGB.prototype.hue = function() {
  var _f;
  if (!(typeof (_f = this._hue) !== "undefined" && _f !== null)) {
    if (this.chroma === 0) {
      this._hue = 0;
    } else if (this.max === this.red) {
      this._hue = ((this.green - this.blue) / this.chroma).mod(6);
    } else if (this.max === this.green) {
      this._hue = ((this.blue - this.red) / this.chroma) + 2;
    } else if (this.max === this.blue) {
      this._hue = ((this.red - this.green) / this.chroma) + 4;
    }
    this._hue = Math.abs(this._hue) * 60;
  }
  return this._hue;
};
RGB.prototype.toHSB = function() {
  var saturation;
  saturation = this.chroma === 0 ? 0 : this.chroma / this.max;
  return this.hsb = (typeof this.hsb !== "undefined" && this.hsb !== null) ? this.hsb : new HSB(this.hue(), saturation, this.max / 255);
};
RGB.prototype.toHSL = function() {
  var _f, lightness, saturation;
  if (!(typeof (_f = this.hsl) !== "undefined" && _f !== null)) {
    lightness = (this.max + this.min) / 2;
    if (this.chroma === 0) {
      saturation = 0;
    } else if (lightness < 127.5) {
      saturation = (255 * this.chroma) / (2 * lightness);
    } else {
      saturation = (255 * this.chroma) / (510 - 2 * lightness);
    }
    this.hsl = new HSL(this.hue(), saturation / 255, lightness / 255);
  }
  return this.hsl;
};
RGBSequence = function(brightness) {
  this.hsbSequence = new HSBSequence();
  return this;
};
RGBSequence.prototype.next = function() {
  return this.hsbSequence.next().toRGB();
};
HSB = function(hue, saturation, brightness) {
  this.hue = hue.mod(360);
  this.saturation = saturation;
  this.brightness = brightness;
  return this;
};
__extends(HSB, Colour);
HSB.prototype.toString = function() {
  return "hsb(" + [this.hue, this.saturation, this.brightness] + ")";
};
HSB.prototype.toHSL = function() {
  return undefined;
};
HSB.prototype.toRGB = function(opacity) {
  var blue, chroma, green, m, red, second, segment;
  chroma = this.brightness * this.saturation;
  segment = this.hue / 60;
  second = chroma * (1 - Math.abs((segment % 2) - 1));
  red = (green = (blue = 0));
  if ((typeof segment !== "undefined" && segment !== null)) {
    if ((0 <= segment) && (segment < 1)) {
      red = chroma;
      green = second;
    } else if ((1 <= segment) && (segment < 2)) {
      red = second;
      green = chroma;
    } else if ((2 <= segment) && (segment < 3)) {
      green = chroma;
      blue = second;
    } else if ((3 <= segment) && (segment < 4)) {
      green = second;
      blue = chroma;
    } else if ((4 <= segment) && (segment < 5)) {
      red = second;
      blue = chroma;
    } else if ((5 <= segment) && (segment < 6)) {
      red = chroma;
      blue = second;
    }
  }
  m = this.brightness - chroma;
  red += m;
  green += m;
  blue += m;
  return new RGB(red * 255, green * 255, blue * 255, opacity);
};
HSBSequence = function(brightness) {
  this.brightness = brightness || 0.75;
  return this;
};
HSBSequence.prototype.next = function() {
  var _f;
  if ((typeof (_f = this.colour) !== "undefined" && _f !== null)) {
    this.colour.hue += 27;
    if (this.colour.hue >= 360) {
      this.colour.hue = 0;
      this.colour.saturation -= 0.2;
      if (this.colour.saturation <= 0) {
        this.colour.saturation = 1;
      };
    }
    return (this.colour = new HSB(this.colour.hue, this.colour.saturation, this.colour.brightness));
  } else {
    return (this.colour = new HSB(0, 1, this.brightness));
  }
};
HSL = function(hue, saturation, lightness) {
  this.hue = hue.mod(360);
  this.saturation = saturation;
  this.lightness = lightness;
  return this;
};
__extends(HSL, Colour);
HSL.prototype.toString = function() {
  return "hsl(" + [this.hue, this.saturation, this.lightness] + ")";
};
HSL.prototype.toHSB = function() {
  return undefined;
};
HSL.prototype.toRGB = function(opacity) {
  var blue, chroma, green, m, red, second, segment;
  if (this.lightness <= 0.5) {
    chroma = 2 * this.lightness * this.saturation;
  } else {
    chroma = (2 - 2 * this.lightness) * this.saturation;
  };
  segment = this.hue / 60;
  second = chroma * (1 - Math.abs((segment % 2) - 1));
  red = (green = (blue = 0));
  if ((typeof segment !== "undefined" && segment !== null)) {
    if ((0 <= segment) && (segment < 1)) {
      red = chroma;
      green = second;
    } else if ((1 <= segment) && (segment < 2)) {
      red = second;
      green = chroma;
    } else if ((2 <= segment) && (segment < 3)) {
      green = chroma;
      blue = second;
    } else if ((3 <= segment) && (segment < 4)) {
      green = second;
      blue = chroma;
    } else if ((4 <= segment) && (segment < 5)) {
      red = second;
      blue = chroma;
    } else if ((5 <= segment) && (segment < 6)) {
      red = chroma;
      blue = second;
    }
  }
  m = this.lightness - (chroma / 2);
  red += m;
  green += m;
  blue += m;
  return new RGB(red * 255, green * 255, blue * 255, opacity);
};
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};