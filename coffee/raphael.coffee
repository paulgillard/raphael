###
Raphael 1.4.7 - JavaScript Vector Library

Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
CoffeeScript conversion by Paul Gillard
Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
###

functionCacher = (expensiveFunction, scope, postprocessor) ->
  cachedFunction = ->
    arg = Array.prototype.slice.call(arguments, 0)
    args = arg.join("\u25ba")
    cache = cachedFunction.cache = cachedFunction.cache || {}
    count = cachedFunction.count = cachedFunction.count || []
    if cache.hasOwnProperty(args)
      if postprocessor? then return postprocessor(cache[args]) else return cache[args]
    delete cache[count.shift()] if count.length >= 1000
    count.push(args)
    cache[args] = expensiveFunction.apply(scope, arg)
    if postprocessor? then return postprocessor(cache[args]) else return cache[args]
  return cachedFunction

Raphael = (->
  separator = /[, ]+/
  events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "orientationchange", "touchcancel", "gesturestart", "gesturechange", "gestureend"]
  availableAttrs = { blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://Rjs.com/", opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "R", translation: "0 0", width: 0, x: 0, y: 0 }
  availableAnimAttrs = { along: "along", blur: "number", "clip-rect": "csv", cx: "number", cy: "number", fill: "colour", "fill-opacity": "number", "font-size": "number", height: "number", opacity: "number", path: "path", r: "number", rotation: "csv", rx: "number", ry: "number", scale: "csv", stroke: "colour", "stroke-opacity": "number", "stroke-width": "number", translation: "csv", width: "number", x: "number", y: "number" }
  ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i

  class R
    @version: '1.4.7'
    @hsrg: { hs: 1, rg: 1 }
    @_oid: 0
    @_id: 0
    @type: if window.SVGAngle or document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") then "SVG" else "VML"
    @fn: {}

    constructor: ->
      if R.is(arguments[0], "array")
        a = arguments[0]
        cnv = create.apply(R, a.splice(0, 3 + R.is(a[0], "number")))
        res = cnv.set()
        for i in [0..a.length - 1]
          j = a[i] || {}
          elements.test(j.type) && res.push(cnv[j.type]().attr(j))
        return res
      # TODO: Typically a contructor should return this
      return create.apply(R, arguments)

    userAgentSupportsSVG: ->
      window.SVGAngle? || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")

    type: ->
      @userAgentType ?= if this.userAgentSupportsSVG() then "SVG" else "VML"

    @is: (object, type) ->
      type: String.prototype.toLowerCase.call(type)
      (type == "object" && object == Object(object)) ||
      (type == "undefined" && typeof object == type) ||
      (type == "null" && object == null) ||
      (type == "array" && Array.isArray && Array.isArray(object)) ||
      String.prototype.toLowerCase.call(Object.prototype.toString.call(object).slice(8, -1)) == type

    toHex: (colour) ->
      if this.type() == "VML"
        colour = String(colour).replace(/^\s+|\s+$/g, "")
        try
          temporaryDocument = new window.ActiveXObject("htmlfile")
          temporaryDocument.write "<" + "body>"
          temporaryDocument.close()
          temporaryBody = temporaryDocument.body
        catch error
          temporaryBody = window.createPopup().document.body
        range = temporaryBody.createTextRange()
        try
          temporaryBody.style.color = colour
          value = range.queryCommandValue("ForeColor")
          value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16)
          return "#" + ("000000" + value.toString(16)).slice(-6)
        catch error
          return "none"
      else
        i = document.createElement("i")
        i.title = "Rapha\xebl Colour Picker"
        i.style.display = "none"
        document.body.appendChild(i)
        i.style.color = colour
        return document.defaultView.getComputedStyle(i, "").getPropertyValue("color")

  # TODO: This should go on the string prototype
  R.getRGB = (colour) ->
    if !colour or !!((colour = String(colour)).indexOf("-") + 1)
      return new RGB(-1, -1, -1).error()
    if colour == "none"
      return new RGB(-1, -1, -1)
    !(R.hsrg.hasOwnProperty(colour.substring(0, 2)) or colour.charAt() == "#") and (colour = this.toHex(colour))
    colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%)?)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i
    commaSpaces = /\s*,\s*/
    rgb = colour.match(colourRegExp)
    if rgb?
      # (#[a-f\d]{6})
      # 
      # #a13f2c
      if rgb[2]
        return new RGB(parseInt(rgb[2].substring(1, 3), 16), parseInt(rgb[2].substring(3, 5), 16), parseInt(rgb[2].substring(5), 16))
      # (#[a-f\d]{3})
      # 
      # #a2f
      if rgb[3]
        return new RGB(parseInt((t = rgb[3].charAt(1)) + t, 16), parseInt((t = rgb[3].charAt(2)) + t, 16), parseInt((t = rgb[3].charAt(3)) + t, 16))
      # rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)
      # 
      # rgba(0.3, 0.4, 0.9)
      # rgba(0.3, 0.4, 0.9, 0.2)
      if rgb[4]
        rgbo = rgb[4].split(commaSpaces)
        return new RGB(parseFloat(rgbo[0]), parseFloat(rgbo[1]), parseFloat(rgbo[2]), parseFloat(rgbo[3]))
      # rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%)?)\s*\)
      # 
      # rgba(30%, 40%, 90%, 20%)
      # rgba(30%, 40%, 90%)
      if rgb[5]
        rgbo = rgb[5].split(commaSpaces)
        return new RGB(parseFloat(rgbo[0]) * 2.55, parseFloat(rgbo[1]) * 2.55, parseFloat(rgbo[2]) * 2.55, parseFloat(rgbo[3]))
      # hsb\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)
      # 
      # hsb(30deg, 0.8, 0.7)
      # hsb(30°, 0.8, 0.7)
      if rgb[6]
        rgb = rgb[6].split(commaSpaces)
        red = parseFloat(rgb[0])
        (rgb[0].slice(-3) == "deg" || rgb[0].slice(-1) == "\xb0") && (red /= 360)
        return new HSB(red, parseFloat(rgb[1]), parseFloat(rgb[2])).toRGB()
      # hsb\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)
      # 
      # hsb(3.3%, 80%, 70%)
      # hsb(30°, 80%, 70%)
      # hsb(30deg, 80%, 70%)
      if rgb[7]
        rgb = rgb[7].split(commaSpaces)
        red = parseFloat(rgb[0]) * 2.55
        (rgb[0].slice(-3) == "deg" || rgb[0].slice(-1) == "\xb0") && (red /= 360 * 2.55)
        return new HSB(red, parseFloat(rgb[1]) * 2.55, parseFloat(rgb[2]) * 2.55).toRGB()
      # hsl\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)
      # 
      # hsl(30deg, 0.8, 0.7)
      # hsl(30°, 0.8, 0.7)
      if rgb[8]
        rgb = rgb[8].split(commaSpaces)
        red = parseFloat(rgb[0])
        (rgb[0].slice(-3) == "deg" || rgb[0].slice(-1) == "\xb0") && (red /= 360)
        return new HSL(red, parseFloat(rgb[1]), parseFloat(rgb[2])).toRGB()
      # hsl\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)
      # 
      # hsl(8.3%, 80%, 70%)
      # hsl(30°, 80%, 70%)
      # hsl(30deg, 80%, 70%)
      if rgb[9]
        rgb = rgb[9].split(commaSpaces)
        red = parseFloat(rgb[0]) * 2.55
        (rgb[0].slice(-3) == "deg" || rgb[0].slice(-1) == "\xb0") && (red /= 360 * 2.55)
        return new HSL(red, parseFloat(rgb[1]) * 2.55, parseFloat(rgb[2]) * 2.55).toRGB()
    new RGB(-1, -1, -1).error()
  
  R._path2string = ->
    this.join(",").replace(/,?([achlmqrstvxz]),?/gi, "$1")
  
  pathCommand = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig
  pathValues = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig
  
  # TODO: Looks like this should be a Path class
  R.parsePathString = (pathString) ->
    if !pathString?
      return null
    paramCounts = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }
    data = []
    if R.is(pathString, "array") and R.is(pathString[0], "array")
      data = this.pathClone(pathString)
    if !data.length
      String(pathString).replace(R.pathCommand, ((a, b, c) ->
        params = []
        name = String.prototype.toLowerCase.call(b)
        c.replace(R.pathValues, ((a, b) ->
          b and params.push(+b)
        ))
        if name == "m" and params.length > 2
          data.push([b].concat(params.splice(0, 2)))
          name = "1"
          b = if b == "m" then "l" else "L"
        while params.length >= paramCounts[name]
          data.push([b].concat(params.splice(0, paramCounts[name])))
          if !paramCounts[name]
            break
      ))
    data.toString = this._path2string
    data
  
  R.findDotsAtSegment = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) ->
    t1 = 1 - t
    x = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x
    y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
    mx = p1x + 2 * t * (c1x - p1x) + t * t * (c2x - 2 * c1x + p1x)
    my = p1y + 2 * t * (c1y - p1y) + t * t * (c2y - 2 * c1y + p1y)
    nx = c1x + 2 * t * (c2x - c1x) + t * t * (p2x - 2 * c2x + c1x)
    ny = c1y + 2 * t * (c2y - c1y) + t * t * (p2y - 2 * c2y + c1y)
    ax = (1 - t) * p1x + t * c1x
    ay = (1 - t) * p1y + t * c1y
    cx = (1 - t) * c2x + t * p2x
    cy = (1 - t) * c2y + t * p2y
    alpha = (90 - Math.atan((mx - nx) / (my - ny)) * 180 / Math.PI)
    { x: x, y: y, m: { x: mx, y: my }, n: { x: nx, y: ny }, start: { x: ax, y: ay }, end: { x: cx, y: cy }, alpha: alpha }
  
  pathDimensions = (path) ->
    if path?
      return { x: 0, y: 0, width: 0, height: 0 }
    path = pathToCurve(path)
    x = y = 0
    X = Y = []
    for p in path
      if p[0] == "M"
        x = p[1]
        y = p[2]
        X.push x
        Y.push y
      else
        dim = curveDimensions(x, y, p[1], p[2], p[3], p[4], p[5], p[6])
        X = X.concat(dim.min.x, dim.max.x)
        Y = Y.concat(dim.min.y, dim.max.y)
        x = p[5]
        y = p[6]
    xmin = Math.min.apply(0, X)
    ymin = Math.min.apply(0, Y)
    { x: xmin, y: ymin, width: Math.max.apply(0, X) - xmin, height: Math.max.apply(0, Y) - ymin }
  
  pathClone = (pathArray) ->
    res = []
    if (!R.is(pathArray, "array") || !R.is(pathArray && pathArray[0], "array")) # rough assumption
      pathArray = R.parsePathString(pathArray)
    i = -1
    for path in pathArray
      res[++i] = []
      j = -1
      for pathItem in path
        res[i][++j] = pathItem
    res.toString = this._path2string
    res
  
  pathToRelative = (pathArray) ->
    if (!R.is(pathArray, "array") || !R.is(pathArray && pathArray[0], "array")) # rough assumption
      pathArray = R.parsePathString(pathArray)
    res = []
    x = y = mx = my = start = 0
    if pathArray[0][0] == "M"
      mx = x = pathArray[0][1]
      my = y = pathArray[0][2]
      start++
      res.push ["M", x, y]
    for i in [start..pathArray.length - 1]
      r = res[i] = []
      path = pathArray[i]
      if path[0] != String.prototype.toLowerCase.call(path[0])
        r[0] = String.prototype.toLowerCase.call(path[0])
        switch r[0]
          when "a"
            r[1] = path[1]
            r[2] = path[2]
            r[3] = path[3]
            r[4] = path[4]
            r[5] = path[5]
            r[6] = +(path[6] - x).toFixed(3)
            r[7] = +(path[7] - y).toFixed(3)
          when "v"
            r[1] = +(path[1] - y).toFixed(3)
          when "m"
            mx = path[1]
            my = path[2]
          else
            for j in [1..path.length - 1]
              r[j] = +(path[j] - (if j % 2 then x else y)).toFixed(3)
      else
        if path[0] == "m"
          mx = path[1] + x
          my = path[2] + y
        for k in [0..path.length - 1]
          res[i][k] = path[k]
      len = res[i].length
      switch res[i][0]
        when "z"
          x = mx
          y = my
        when "h"
          x += +res[i][len - 1]
        when "v"
          y += +res[i][len - 1]
        else
          x += +res[i][len - 2]
          y += +res[i][len - 1]
    res.toString = this._path2string
    res
  
  pathToAbsolute = (pathArray) ->
    if (!R.is(pathArray, "array") || !R.is(pathArray && pathArray[0], "array")) # rough assumption
      pathArray = R.parsePathString(pathArray)
    res = []
    x = y = mx = my = start = 0
    if pathArray[0][0] == "M"
      mx = x = +pathArray[0][1]
      my = y = +pathArray[0][2]
      start++
      res[0] = ["M", x, y]
    for i in [start..pathArray.length - 1]
      r = res[i] = []
      path = pathArray[i]
      if path[0] != String.prototype.toUpperCase.call(path[0])
        r[0] = String.prototype.toUpperCase.call(path[0])
        switch r[0]
          when "A"
            r[1] = path[1]
            r[2] = path[2]
            r[3] = path[3]
            r[4] = path[4]
            r[5] = path[5]
            r[6] = +(path[6] + x)
            r[7] = +(path[7] + y)
          when "V"
            r[1] = +(path[1] + y)
          when "H"
            r[1] = +(path[1] + x)
          when "M"
            mx = +path[1] + x
            my = +path[2] + y
          else
            for j in [1..path.length - 1]
              r[j] = +path[j] + (if j % 2 then x else y)
      else
        for k in [0..path.length - 1]
          res[i][k] = path[k]
      len = res[i].length
      switch r[0]
        when "Z"
          x = mx
          y = my
        when "H"
          x = r[1]
        when "V"
          y = r[1]
        when "M"
          mx = res[i][len - 2]
          my = res[i][len - 1]
        else
          x = res[i][len - 2]
          y = res[i][len - 1]
    res.toString = this._path2string
    res
  
  lineToCurve = (x1, y1, x2, y2) ->
    [x1, y1, x2, y2, x2, y2]
  
  quadraticToCurve = (x1, y1, ax, ay, x2, y2) ->
    [ 1 / 3 * x1 + 2 / 3 * ax,
      1 / 3 * y1 + 2 / 3 * ay,
      1 / 3 * x2 + 2 / 3 * ax,
      1 / 3 * y2 + 2 / 3 * ay,
      x2,
      y2 ]
  
  arcToCurve = (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) ->
    # for more information of where this math came from visit:
    # http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    PI = Math.PI
    _120 = PI * 120 / 180
    rad = PI / 180 * (+angle || 0)
    res = []
    # TODO: rotate was originally cached
    rotate: (x, y, rad) ->
      X = x * Math.cos(rad) - y * Math.sin(rad)
      Y = x * Math.sin(rad) + y * Math.cos(rad)
      { x: X, y: Y }
    if !recursive
      xy = rotate(x1, y1, -rad)
      x1 = xy.x
      y1 = xy.y
      xy = rotate(x2, y2, -rad)
      x2 = xy.x
      y2 = xy.y
      cos = Math.cos(PI / 180 * angle)
      sin = Math.sin(PI / 180 * angle)
      x = (x1 - x2) / 2
      y = (y1 - y2) / 2
      h = (x * x) / (rx * rx) + (y * y) / (ry * ry)
      if h > 1
        h = Math.sqrt(h)
        rx = h * rx
        ry = h * ry
      rx2 = rx * rx
      ry2 = ry * ry
      k = (if large_arc_flag == sweep_flag then -1 else 1) *
              Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)))
      cx = k * rx * y / ry + (x1 + x2) / 2
      cy = k * -ry * x / rx + (y1 + y2) / 2
      f1 = Math.asin(((y1 - cy) / ry).toFixed(7))
      f2 = Math.asin(((y2 - cy) / ry).toFixed(7))
      f1 = if x1 < cx then PI - f1 else f1
      f2 = if x2 < cx then PI - f2 else f2
      if f1 < 0
        f1 = PI * 2 + f1
      if f2 < 0
        f2 = PI * 2 + f2
      if sweep_flag and f1 > f2
        f1 = f1 - PI * 2
      if !sweep_flag and f2 > f1
        f2 = f2 - PI * 2
    else
      f1 = recursive[0]
      f2 = recursive[1]
      cx = recursive[2]
      cy = recursive[3]
    df = f2 - f1
    if Math.abs(df) > _120
      f2old = f2
      x2old = x2
      y2old = y2
      f2 = f1 + _120 * (if sweep_flag && f2 > f1 then 1 else -1)
      x2 = cx + rx * Math.cos(f2)
      y2 = cy + ry * Math.sin(f2)
      res = arcToCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy])
    df = f2 - f1
    c1 = Math.cos(f1)
    s1 = Math.sin(f1)
    c2 = Math.cos(f2)
    s2 = Math.sin(f2)
    t = Math.tan(df / 4)
    hx = 4 / 3 * rx * t
    hy = 4 / 3 * ry * t
    m1 = [x1, y1]
    m2 = [x1 + hx * s1, y1 - hy * c1]
    m3 = [x2 + hx * s2, y2 - hy * c2]
    m4 = [x2, y2]
    m2[0] = 2 * m1[0] - m2[0]
    m2[1] = 2 * m1[1] - m2[1]
    if recursive
      [m2, m3, m4].concat(res)
    else
      res = [m2, m3, m4].concat(res).join().split(",")
      newres = []
      for i in [0..res.length - 1]
        newres[i] = if i % 2 then rotate(res[i - 1], res[i], rad).y else rotate(res[i], res[i + 1], rad).x
      newres
  
  findDotAtSegment = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) ->
    t1 = 1 - t
    X = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x
    Y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
    { x: X, y: Y }
  
  # TODO: curveDimensions was originally cached
  curveDimensions = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) ->
    a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x)
    b = 2 * (c1x - p1x) - 2 * (c2x - c1x)
    c = p1x - c1x
    t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a
    t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a
    y = [p1y, p2y]
    x = [p1x, p2x]
    t1 = 0.5 if Math.abs(t1) > 1e12
    t2 = 0.5 if Math.abs(t2) > 1e12
    if t1 > 0 and t1 < 1
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1)
      x.push(dot.x)
      y.push(dot.y)
    if t2 > 0 and t2 < 1
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2)
      x.push(dot.x)
      y.push(dot.y)
    a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y)
    b = 2 * (c1y - p1y) - 2 * (c2y - c1y)
    c = p1y - c1y
    t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a
    t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a
    t1 = 0.5 if Math.abs(t1) > 1e12
    t2 = 0.5 if Math.abs(t2) > 1e12
    if t1 > 0 and t1 < 1
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1)
      x.push(dot.x)
      y.push(dot.y)
    if t2 > 0 and t2 < 1
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2)
      x.push(dot.x)
      y.push(dot.y)
    min: { x: Math.min.apply(0, x), y: Math.min.apply(0, y) }
    max: { x: Math.max.apply(0, x), y: Math.max.apply(0, y) }
  
  # TODO: pathToCurve was originally cached
  pathToCurve = (path, path2) ->
    p = pathToAbsolute(path)
    p2 = pathToAbsolute(path2) if path2?
    attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }
    attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }
    processPath = (path, d) ->
      return ["C", d.x, d.y, d.x, d.y, d.x, d.y] if !path
      d.qx = d.qy = null if !(path[0] in { T: 1, Q: 1 })
      switch path[0]
        when "M"
          d.X = path[1]
          d.Y = path[2]
          path
        when "A"
          ["C"].concat(arcToCurve.apply(0, [d.x, d.y].concat(path.slice(1))))
        when "S"
          nx = d.x + (d.x - (d.bx || d.x))
          ny = d.y + (d.y - (d.by || d.y))
          ["C", nx, ny].concat(path.slice(1))
        when "T"
          d.qx = d.x + (d.x - (d.qx || d.x))
          d.qy = d.y + (d.y - (d.qy || d.y))
          ["C"].concat(quadraticToCurve(d.x, d.y, d.qx, d.qy, path[1], path[2]))
        when "Q"
          d.qx = path[1]
          d.qy = path[2]
          ["C"].concat(quadraticToCurve(d.x, d.y, path[1], path[2], path[3], path[4]))
        when "L"
          ["C"].concat(lineToCurve(d.x, d.y, path[1], path[2]))
        when "H"
          ["C"].concat(lineToCurve(d.x, d.y, path[1], d.y))
        when "V"
          ["C"].concat(lineToCurve(d.x, d.y, d.x, path[1]))
        when "Z"
          ["C"].concat(lineToCurve(d.x, d.y, d.X, d.Y))
    fixArc = (pp, i) ->
      if pp[i].length > 7
        pp[i].shift()
        pi = pp[i]
        while pi.length
          pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)))
        pp.splice(i, 1)
        ii = Math.max(p.length, if p2? then p2.length else 0)
    fixM = (path1, path2, a1, a2, i) ->
      if path1? and path2? and path1[i][0] == "M" and path2[i][0] != "M"
        path2.splice(i, 0, ["M", a2.x, a2.y])
        a1.bx = 0
        a1.by = 0
        a1.x = path1[i][1]
        a1.y = path1[i][2]
        ii = Math.max(p.length, if p2? then p2.length else 0)
    for i in [0..Math.max(p.length, if p2? then p2.length else 0)]
      p[i] = processPath(p[i], attrs)
      fixArc(p, i)
      p2[i] = processPath(p2[i], attrs2) if p2?
      fixArc(p2, i) if p2?
      fixM(p, p2, attrs, attrs2, i)
      fixM(p2, p, attrs2, attrs, i)
      seg = p[i]
      seg2 = p2[i] if p2?
      seglen = seg.length
      seg2len = seg2.length if p2?
      attrs.x = seg[seglen - 2]
      attrs.y = seg[seglen - 1]
      attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x
      attrs.by = parseFloat(seg[seglen - 3]) || attrs.y
      attrs2.bx = parseFloat(seg2[seg2len - 4]) || attrs2.x if p2?
      attrs2.by = parseFloat(seg2[seg2len - 3]) || attrs2.y if p2?
      attrs2.x = seg2[seg2len - 2] if p2?
      attrs2.y = seg2[seg2len - 1] if p2?
    if p2? then [p, p2] else p
  
  # TODO: parseDots was originally cached
  parseDots = (gradient) ->
    dots = []
    for i in [0..gradient.length]
      dot = {}
      par = gradient[i].match(/^([^:]*):?([\d\.]*)/)
      dot.color = R.getRGB(par[1])
      return null if (dot.color.error)
      dot.color = dot.color.hex
      dot.offset = par[2] + "%" if par[2]?
      dots.push(dot)
    for i in [1..dots.length - 1]
      if !dots[i].offset
        start = parseFloat(dots[i - 1].offset || 0)
        end = 0
        for j in [i + 1..dots.length - 1]
          if dots[j].offset
            end = dots[j].offset
            break
        if !end
          end = 100
          j = dots.length - 1
        end = parseFloat(end)
        d = (end - start) / (j - i + 1)
        for k in [i..j - 1]
          start += d
          dots[k].offset = start + "%"
    dots
  
  getContainer = (x, y, w, h) ->
    if R.is(x, "string") || R.is(x, "object")
      container = if R.is(x, "string") then document.getElementById(x) else x
      if container.tagName
        if y == null
          container: container
          width: container.style.pixelWidth || container.offsetWidth
          height: container.style.pixelHeight || container.offsetHeight
        else
          { container: container, width: y, height: w }
    else
      { container: 1, x: x, y: y, width: w, height: h }
  
  plugins = (con, add) ->
    that = this
    for prop in add
      if add.hasOwnProperty(prop) and !(prop in con)
        switch typeof add[prop]
          when "function"
            ((f) ->
              con[prop] = if con == that then f else (-> f.apply(that, arguments))
            )(add[prop])
          when "object"
            con[prop] = con[prop] || {}
            plugins.call(this, con[prop], add[prop])
          else
            con[prop] = add[prop]
  
  tear = (el, paper) ->
    paper.top = el.prev if el == paper.top
    paper.bottom = el.next if el == paper.bottom
    el.next.prev = el.prev if el.next
    el.prev.next = el.next if el.prev
  
  tofront = (el, paper) ->
    if paper.top == el
      null
    else
      tear(el, paper)
      el.next = null
      el.prev = paper.top
      paper.top.next = el
      paper.top = el
  
  toback = (el, paper) ->
    if paper.bottom == el
      null
    else
      tear(el, paper)
      el.next = paper.bottom
      el.prev = null
      paper.bottom.prev = el
      paper.bottom = el
  
  insertafter = (el, el2, paper) ->
    tear(el, paper)
    paper.top = el if el2 == paper.top
    el2.next.prev = el if el2.next
    el.next = el2.next
    el.prev = el2
    el2.next = el
  
  insertbefore = (el, el2, paper) ->
    tear(el, paper)
    paper.bottom = el if el2 == paper.bottom
    el2.prev.next = el if el2.prev
    el.prev = el2.prev
    el2.prev = el
    el.next = el2
  
  removed = (methodname) ->
    ->
      throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object")
  
  # Extends R?
  class Paper
    @svgNamespace: "http://www.w3.org/2000/svg"
    @xLinkNamespace: "http://www.w3.org/1999/xlink"

  if R.type == "SVG"
    $ = (el, attr) ->
      if attr
        for name, value of attr
          if attr.hasOwnProperty name
            el.setAttribute(name, String(value))
      else
        el = document.createElementNS(Paper.svgNamespace, el)
        el.style.webkitTapHighlightColor = "rgba(0,0,0,0)"
        el

    R::toString = ->
      "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version

    thePath = (pathString, SVG) ->
      el = $("path")
      SVG.canvas.appendChild(el) if SVG.canvas
      p = new Element(el, SVG)
      p.type = "path"
      setFillAndStroke(p, { fill: "none", stroke: "#000", path: pathString })
      p

    addGradientFill = (o, gradient, SVG) ->
      type = "linear"
      fx = fy = 0.5
      s = o.style
      gradient = String(gradient).replace(radial_gradient, (all, _fx, _fy) ->
        type = "radial"
        if _fx and _fy
          fx = parseFloat(_fx)
          fy = parseFloat(_fy)
          dir = (fy > .5) * 2 - 1
          if Math.pow(fx - 0.5, 2) + Math.pow(fy - 0.5, 2) > 0.25
            fy = Math.sqrt(0.25 - Math.pow(fx - 0.5, 2)) * dir + 0.5
            if fy != .5
              fy = fy.toFixed(5) - 1e-5 * dir
        E
      )
      gradient = gradient.split /\s*\-\s*/
      if type == "linear"
        angle = gradient.shift()
        angle = -parseFloat(angle)
        if isNaN(angle)
          return null
        vector = [0, 0, Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)]
        max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1)
        vector[2] *= max
        vector[3] *= max
        if vector[2] < 0
          vector[0] = -vector[2]
          vector[2] = 0
        if vector[3] < 0
          vector[1] = -vector[3]
          vector[3] = 0
      dots = parseDots(gradient)
      if !dots
        return null
      id = o.getAttribute("fill")
      id = id.match /^url\(#(.*)\)$/
      SVG.defs.removeChild(document.getElementById(id[1])) if id
      el = $(type + "Gradient")
      el.id = "r" + (R._id++).toString(36)
      $(el, if type == "radial" then { fx: fx, fy: fy } else { x1: vector[0], y1: vector[1], x2: vector[2], y2: vector[3] })
      SVG.defs.appendChild(el)
      for i in [0..dots.length]
        stop = $("stop")
        $(stop, { offset: (if dots[i].offset then dots[i].offset else if !i then "0%" else "100%")
        "stop-color": dots[i].color || "##fff" }
        )
        el.appendChild(stop)
      $(o, { fill: "url(#" + el.id + ")", opacity: 1, "fill-opacity": 1 })
      s.fill = ""
      s.opacity = 1
      s.fillOpacity = 1
      1

    updatePosition = (o) ->
      bbox = o.getBBox()
      $(o.pattern, { patternTransform: R.format("translate({0},{1})", bbox.x, bbox.y) })

    setFillAndStroke = (o, params) ->
      dasharray = "": [0], "none": [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3],  "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]
      node = o.node
      attrs = o.attrs
      rot = o.rotate()
      addDashes = (o, value) ->
        value = dasharray[String.prototype.toLowerCase.call(value)]
        if value
          width = o.attrs["stroke-width"] || "1"
          butt = { round: width, square: width, butt: 0 }[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0
          dashes = []
          i = value.length
          while i -= 1
            dashes[i] = value[i] * width + (if i % 2 then 1 else -1) * butt
          $(node, { "stroke-dasharray": dashes.join(",") })
      rot = params.rotation if params.hasOwnProperty("rotation")
      rotxy = String(rot).split(separator)
      if !(rotxy.length - 1)
        rotxy = null
      else
        rotxy[1] = +rotxy[1]
        rotxy[2] = +rotxy[2]
      o.rotate(0, true) if parseFloat(rot)
      # TODO: name is same as value
      for att, name of params
        if params.hasOwnProperty(att)
          if !availableAttrs.hasOwnProperty(att)
            continue
          value = params[att]
          attrs[att] = value
          switch att
            when "blur"
              o.blur(value)
            when "rotation"
              o.rotate(value, true)
            when "href", "title", "target"
              pn = node.parentNode
              if String.prototype.toLowerCase.call(pn.tagName) != "a"
                hl = $("a")
                pn.insertBefore(hl, node)
                hl.appendChild(node)
                pn = hl
              pn.setAttributeNS(o.paper.xlink, att, value)
            when "cursor"
              node.style.cursor = value
            when "clip-rect"
              rect = String(value).split(separator)
              if rect.length == 4
                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode)
                el = $("clipPath")
                rc = $("rect")
                el.id = "r" + (R._id++).toString(36)
                $(rc,
                    x: rect[0]
                    y: rect[1]
                    width: rect[2]
                    height: rect[3]
                )
                el.appendChild(rc)
                o.paper.defs.appendChild(el)
                $(node, { "clip-path": "url(#" + el.id + ")" })
                o.clip = rc
              if !value
                clip = document.getElementById(node.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, E))
                clip.parentNode.removeChild(clip) if clip
                $(node, "clip-path": E)
                delete o.clip
            when "path"
              if (o.type == "path")
                $(node, { d: if value then attrs.path = pathToAbsolute(value) else "M0,0" })
            when "width", "x"
              if att == "width"
                node.setAttribute(att, value)
                if attrs.fx
                  att = "x"
                  value = attrs.x
              if att == "x"
                if attrs.fx
                  value = -attrs.x - (attrs.width || 0)
            when "cx", "rx"
              if att == "cx" or o.type != "rect"
                rotxy[1] += value - attrs[att] if att == "cx" and rotxy
                node.setAttribute(att, value)
                updatePosition(o) if o.pattern
            when "height", "y"
              if att == "height"
                node.setAttribute(att, value)
                if attrs.fy
                  att = "y"
                  value = attrs.y
              if att == "y"
                if attrs.fy
                  value = -attrs.y - (attrs.height || 0)
            when "cy", "ry"
              if att == "cy" or o.type != "rect"
                rotxy[2] += value - attrs[att] if att == "cy" and rotxy
                node.setAttribute(att, value)
                updatePosition(o) if o.pattern
            when "r"
              if o.type == "rect"
                  $(node, { rx: value, ry: value })
              else
                  node.setAttribute(att, value)
            when "src"
              if o.type == "image"
                node.setAttributeNS(o.paper.xlink, "href", value)
            when "stroke-width"
              node.style.strokeWidth = value
              # Need following line for Firefox
              node.setAttribute(att, value)
              if attrs["stroke-dasharray"]
                addDashes(o, attrs["stroke-dasharray"])
            when "stroke-dasharray"
              addDashes(o, value)
            when "translation"
              xy = String(value).split(separator)
              xy[0] = +xy[0] || 0
              xy[1] = +xy[1] || 0
              if rotxy
                rotxy[1] += xy[0]
                rotxy[2] += xy[1]
              translate.call(o, xy[0], xy[1])
            when "scale"
              xy = String(value).split(separator)
              o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, (if isNaN(parseFloat(xy[2])) then null else +xy[2]), (if isNaN(parseFloat(xy[3])) then null else +xy[3]))
            when "fill"
              isURL = String(value).match(ISURL)
              if isURL
                el = $("pattern")
                ig = $("image")
                el.id = "r" + (R._id++).toString(36)
                $(el, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 })
                $(ig, { x: 0, y: 0 })
                ig.setAttributeNS(o.paper.xlink, "href", isURL[1])
                el.appendChild(ig)
              
                img = document.createElement("img")
                img.style.cssText = "position:absolute;left:-9999em;top-9999em"
                img.onload = ->
                  $(el, { width: this.offsetWidth, height: this.offsetHeight })
                  $(ig, { width: this.offsetWidth, height: this.offsetHeight })
                  document.body.removeChild(this)
                  o.paper.safari()
                document.body.appendChild(img)
                img.src = isURL[1]
                o.paper.defs.appendChild(el)
                node.style.fill = "url(#" + el.id + ")"
                $(node, { fill: "url(#" + el.id + ")" })
                o.pattern = el
                updatePosition(o) if o.pattern
              else
                clr = R.getRGB(value)
                if !clr.error
                  delete params.gradient
                  delete attrs.gradient
                  if !R.is(attrs.opacity, "undefined") and R.is(params.opacity, "undefined")
                    $(node, { opacity: attrs.opacity })
                  if !R.is(attrs["fill-opacity"], "undefined") and R.is(params["fill-opacity"], "undefined")
                    $(node, { "fill-opacity": attrs["fill-opacity"] })
                  $(node, { "fill-opacity": if clr.o > 1 then clr.o / 100 else clr.o }) if clr.hasOwnProperty("o")
                  node.setAttribute(att, clr.hex)
                  $(node, { "stroke-opacity": if clr.o > 1 then clr.o / 100 else clr.o }) if att == "stroke" and clr.hasOwnProperty("o")
                else if (({ circle: 1, ellipse: 1 }).hasOwnProperty(o.type) || String(value).charAt() != "r") && addGradientFill(node, value, o.paper)
                  attrs.gradient = value
                  attrs.fill = "none"
                else
                  $(node, { "fill-opacity": if clr.o > 1 then clr.o / 100 else clr.o }) if clr.hasOwnProperty("o")
                  node.setAttribute(att, clr.hex)
                  $(node, { "stroke-opacity": if clr.o > 1 then clr.o / 100 else clr.o }) if att == "stroke" and clr.hasOwnProperty("o")
            when "stroke"
              clr = R.getRGB(value)
              node.setAttribute(att, clr.hex)
              $(node, { "stroke-opacity": if clr.o > 1 then clr.o / 100 else clr.o }) if att == "stroke" and clr.hasOwnProperty("o")
            when "gradient"
              if ({ circle: 1, ellipse: 1 }).hasOwnProperty(o.type) || String(value).charAt() != "r"
                addGradientFill(node, value, o.paper)
            when "opacity", "fill-opacity"
              if attrs.gradient
                gradient = document.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E))
                if gradient
                  stops = gradient.getElementsByTagName("stop")
                  stops[stops.length - 1][setAttribute]("stop-opacity", value)
            else
              value = parseInt(value, 10) + "px" if att == "font-size"
              cssrule = att.replace(/(\-.)/g, (w) ->
                String.prototype.toUpperCase.call(w.substring(1))
              )
              node.style[cssrule] = value
              # Need following line for Firefox
              node.setAttribute(att, value)
      tuneText(o, params)
      if rotxy
        o.rotate(rotxy.join(" "))
      else
        o.rotate(rot, true) if parseFloat(rot)

    tuneText = (el, params) ->
      leading = 1.2
      if el.type != "text" || !(params.hasOwnProperty("text") || params.hasOwnProperty("font") || params.hasOwnProperty("font-size") || params.hasOwnProperty("x") || params.hasOwnProperty("y"))
        return
      a = el.attrs
      node = el.node
      fontSize = if node.firstChild then parseInt(document.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) else 10
      if params.hasOwnProperty("text")
        a.text = params.text
        while node.firstChild
          node.removeChild(node.firstChild)
        texts = String(params.text).split("\n")
        for i in [0..texts.length]
          if texts[i]
            tspan = $("tspan")
            $(tspan, { dy: fontSize * leading, x: a.x }) if i
            tspan.appendChild(document.createTextNode(texts[i]))
            node.appendChild(tspan)
      else
        texts = node.getElementsByTagName("tspan")
        for i in [o..texts.length]
          $(texts[i], { dy: fontSize * leading, x: a.x }) if i
      $(node, { y: a.y })
      bb = el.getBBox()
      dif = a.y - (bb.y + bb.height / 2)
      $(node, { y: a.y + dif }) if dif and isFinite(dif)

    class Element
      constructor: (node, svg) ->
        X = 0
        Y = 0
        this[0] = node
        @id = R._oid++
        @node = node
        node.R = this
        @paper = svg
        @attrs = this.attrs || {}
        @transformations = [] # rotate, translate, scale
        @_ = 
          tx: 0
          ty: 0
          rt: { deg: 0, cx: 0, cy: 0 }
          sx: 1
          sy: 1
        svg.bottom = this if !svg.bottom
        @prev = svg.top
        svg.top.next = this if svg.top
        svg.top = this
        @next = null

      rotate: (deg, cx, cy) ->
        if @removed
          return this
        if !deg?
          if @_.rt.cx
            return [@_.rt.deg, @_.rt.cx, @_.rt.cy].join(" ")
          return @_.rt.deg
        bbox = this.getBBox()
        deg = String(deg).split(separator)
        if deg.length - 1
          cx = parseFloat(deg[1])
          cy = parseFloat(deg[2])
        deg = parseFloat(deg[0])
        if cx != null
          @_.rt.deg = deg
        else
          @_.rt.deg += deg
        cx = null if !cy?
        @_.rt.cx = cx
        @_.rt.cy = cy
        cx = if !cx? then bbox.x + bbox.width / 2 else cx
        cy = if !cy? then bbox.y + bbox.height / 2 else cy
        if !@_.rt.deg
          @transformations[0] = R.format("rotate({0} {1} {2})", @_.rt.deg, cx, cy)
          $(this.clip, { transform: R.format("rotate({0} {1} {2})", -@_.rt.deg, cx, cy) }) if @clip
        else
          @transformations[0] = ""
          $(this.clip, { transform: E }) if @clip
        $(this.node, { transform: @transformations.join(" ") })
        this

      hide: ->
        this.node.style.display = "none" if !@removed
        this

      show: ->
        this.node.style.display = "" if !@removed
        this

      remove: ->
        if @removed
          return
        tear(this, @paper)
        @node.parentNode.removeChild(@node)
        for i in this
          delete this[i]
        @removed = true

      getBBox: ->
        return this if @removed
        if @type == "path"
          return pathDimensions(@attrs.path)
        if @node.style.display == "none"
          this.show()
          hide = true
        bbox = {}
        try
          bbox = @node.getBBox()
        catch error
          # Firefox 3.0.x plays badly here
        finally
          bbox = bbox || {}
        if @type == "text"
          bbox = { x: bbox.x, y: Infinity, width: 0, height: 0 }
          for i in [0..@node.getNumberOfChars()]
            bb = @node.getExtentOfChar(i)
            bbox.y = bb.y if bb.y < bbox.y
            bbox.height = bb.y + bb.height - bbox.y if bb.y + bb.height - bbox.y > bbox.height
            bbox.width = bb.x + bb.width - bbox.x if bb.x + bb.width - bbox.x > bbox.width
        this.hide() if hide
        bbox

      attr: (name, value) ->
        return this if @removed
        if !name?
          res = {}
          for i in @attrs
            if @attrs.hasOwnProperty(i)
              res[i] = @attrs[i]
          res.rotation = this.rotate() if @_.rt.deg
          res.scale = this.scale() if @_.sx != 1 || @_.sy != 1
          if res.gradient and res.fill == "none"
            if res.fill = res.gradient
              delete res.gradient
          return res
        if !value? and R.is(name, "string")
          if name == "translation"
            return translate.call(this)
          if name == "rotation"
            return this.rotate()
          if name == "scale"
            return this.scale()
          if name == "fill" and @attrs.fill == "none" and @attrs.gradient
            return @attrs.gradient
          return @attrs[name]
        if !value? and R.is(name, "array")
          values = {}
          for j in [0..name.length]
            values[name[j]] = @attr(name[j])
          return values
        if value?
          params = {}
          params[name] = value
          setFillAndStroke(this, params)
        else if name? and R.is(name, "object")
          setFillAndStroke(this, name)
        this

      toFront: ->
        return this if @removed
        this.node.parentNode.appendChild(this.node)
        svg = this.paper
        svg.top != this && tofront(this, svg)
        this

      toBack: ->
        return this if @removed
        if @node.parentNode.firstChild != @node
          @node.parentNode.insertBefore(@node, @node.parentNode.firstChild)
          toback(this, @paper)
          svg = @paper
        this

      insertAfter: (element) ->
        return this if @removed
        node = element.node || element[element.length].node
        if node.nextSibling
          node.parentNode.insertBefore(@node, node.nextSibling)
        else
          node.parentNode.appendChild(@node)
        insertafter(this, element, @paper)
        this

      insertBefore: (element) ->
        return this if @removed
        node = element.node || element[0].node
        node.parentNode.insertBefore(@node, node)
        insertbefore(this, element, @paper)
        this

      blur: (size) ->
        # Experimental. No Safari support. Use it on your own risk.
        if +size != 0
          fltr = $("filter")
          blur = $("feGaussianBlur")
          @attrs.blur = size
          fltr.id = "r" + (R._id++).toString(36)
          $(blur, { stdDeviation: +size || 1.5 })
          fltr.appendChild(blur)
          @paper.defs.appendChild(fltr)
          @_blur = fltr
          $(@node, { filter: "url(#" + fltr.id + ")" })
        else
          if @_blur
            @_blur.parentNode.removeChild(@_blur)
            delete @_blur
            delete @attrs.blur
          @node.removeAttribute("filter")

    theCircle = (svg, x, y, r) ->
      el = $("circle")
      svg.canvas.appendChild(el) if svg.canvas
      res = new Element(el, svg)
      res.attrs = { cx: x, cy: y, r: r, fill: "none", stroke: "#000" }
      res.type = "circle"
      $(el, res.attrs)
      res

    theRect = (svg, x, y, w, h, r) ->
      el = $("rect")
      svg.canvas.appendChild(el) if svg.canvas
      res = new Element(el, svg)
      res.attrs = { x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000" }
      res.type = "rect"
      $(el, res.attrs)
      res

    theEllipse = (svg, x, y, rx, ry) ->
      el = $("ellipse")
      svg.canvas.appendChild(el) if svg.canvas
      res = new Element(el, svg)
      res.attrs = { cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000" }
      res.type = "ellipse"
      $(el, res.attrs)
      res

    theImage = (svg, src, x, y, w, h) ->
      el = $("image")
      $(el, { x: x, y: y, width: w, height: h, preserveAspectRatio: "none" })
      el.setAttributeNS(svg.xlink, "href", src)
      svg.canvas.appendChild(el) if svg.canvas
      res = new Element(el, svg)
      res.attrs = { x: x, y: y, width: w, height: h, src: src }
      res.type = "image"
      res

    theText = (svg, x, y, text) ->
      el = $("text")
      $(el, { x: x, y: y, "text-anchor": "middle" })
      svg.canvas.appendChild(el) if svg.canvas
      res = new Element(el, svg)
      res.attrs = { x: x, y: y, "text-anchor": "middle", text: text, font: availableAttrs.font, stroke: "none", fill: "#000" }
      res.type = "text"
      setFillAndStroke(res, res.attrs)
      res

    setSize = (width, height) ->
      @width = width || @width
      @height = height || @height
      @canvas.setAttribute("width", @width)
      @canvas.setAttribute("height", @height)
      this

    create = ->
      con = getContainer.apply(0, arguments)
      container = con && con.container
      x = con.x
      y = con.y
      width = con.width
      height = con.height
      if !container
        throw new Error("SVG container not found.")
      cnvs = $("svg")
      x = x || 0
      y = y || 0
      width = width || 512
      height = height || 342
      $(cnvs,
        xmlns: "http://www.w3.org/2000/svg"
        version: 1.1
        width: width
        height: height
      )
      if container == 1
        cnvs.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px"
        document.body.appendChild(cnvs)
      else
        if container.firstChild
          container.insertBefore(cnvs, container.firstChild)
        else
          container.appendChild(cnvs)
      container = new Paper
      container.width = width
      container.height = height
      container.canvas = cnvs
      plugins.call(container, container, R.fn)
      container.clear()
      container

    Paper::clear = ->
      c = @canvas
      while c.firstChild
        c.removeChild(c.firstChild)
      @bottom = @top = null
      (@desc = $("desc")).appendChild(document.createTextNode("Created with Rapha\xebl"))
      c.appendChild(@desc)
      c.appendChild(@defs = $("defs"))

    Paper::remove = ->
      @canvas.parentNode.removeChild(@canvas) if @canvas.parentNode
      for i in this
        this[i] = removed(i)

  if R.type == "VML"
    path2vml = (path) ->
      total = /[ahqstv]/ig
      command = pathToAbsolute
      command = pathToCurve if String(path).match(total)
      total = /[clmz]/g
      if command == pathToAbsolute and !String(path).match(total)
        res = String(path).replace(bites, (all, command, args) ->
          vals = []
          isMove = String.prototype.toLowerCase.call(command) == "m"
          res = map[command]
          args.replace(val, (value) ->
            if isMove and vals.length == 2
              res += vals + map[if command == "m" then "l" else "L"]
              vals = []
            vals.push(Math.round(value * zoom))
          )
          return res + vals
        )
        res
      pa = command(path)
      res = []
      for i in [0..pa.length - 1]
        p = pa[i]
        r = String.prototype.toLowerCase.call(pa[i][0])
        r = "x" if r == "z"
        for j in [1..p.length - 1]
          r += Math.round(p[j] * zoom) + (if j != p.length - 1 then "," else E)
        res.push(r)
      res.join(" ")

    R::toString = ->
      "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + @version

    thePath = (pathString, vml) ->
      g = createNode("group")
      g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px"
      g.coordsize = vml.coordsize
      g.coordorigin = vml.coordorigin
      el = createNode("shape")
      ol = el.style
      ol.width = vml.width + "px"
      ol.height = vml.height + "px"
      el.coordsize = coordsize
      el.coordorigin = vml.coordorigin
      g.appendChild(el)
      p = new Element(el, g, vml)
      attr = { fill: "none", stroke: "#000" }
      attr.path = pathString if pathString
      p.isAbsolute = true
      p.type = "path"
      p.path = []
      p.Path = ""
      setFillAndStroke(p, attr)
      vml.canvas.appendChild(g)
      p

    setFillAndStroke = (o, params) ->
      o.attrs = o.attrs || {}
      node = o.node
      a = o.attrs
      s = node.style
      newpath = (params.x != a.x or params.y != a.y or params.width != a.width or params.height != a.height or params.r != a.r) and o.type == "rect"
      res = o

      for att, value of params
        if params.hasOwnProperty(att)
          a[att] = params[att] # TODO: This is same as value
      if newpath
        a.path = rectPath(a.x, a.y, a.width, a.height, a.r)
        o.X = a.x
        o.Y = a.y
        o.W = a.width
        o.H = a.height
      node.href = params.href if params.href
      node.title = params.title if params.title
      node.target = params.target if params.target
      s.cursor = params.cursor if params.cursor
      o.blur(params.blur) if "blur" in params
      if params.path and o.type == "path" or newpath
        node.path = path2vml(a.path)
      if params.rotation != null
        o.rotate(params.rotation, true)
      if params.translation
        xy = String(params.translation).split(separator)
        translate.call(o, xy[0], xy[1])
        if o._.rt.cx != null
          o._.rt.cx +=+ xy[0]
          o._.rt.cy +=+ xy[1]
          o.setBox(o.attrs, xy[0], xy[1])
      if params.scale
        xy = String(params.scale).split(separator)
        o.scale(+xy[0] or 1, +xy[1] or +xy[0] or 1, +xy[2] or null, +xy[3] or null)
      if "clip-rect" in params
        rect = String(params["clip-rect"]).split(separator)
        if rect.length == 4
          rect[2] = +rect[2] + (+rect[0])
          rect[3] = +rect[3] + (+rect[1])
          div = node.clipRect or document.createElement("div")
          dstyle = div.style
          group = node.parentNode
          dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect)
          if !node.clipRect
            dstyle.position = "absolute"
            dstyle.top = 0
            dstyle.left = 0
            dstyle.width = o.paper.width + "px"
            dstyle.height = o.paper.height + "px"
            group.parentNode.insertBefore(div, group)
            div.appendChild(group)
            node.clipRect = div
        if !params["clip-rect"]
          node.clipRect.style.clip = "" if node.clipRect
      if o.type == "image" and params.src
        node.src = params.src
      if o.type == "image" and params.opacity
        node.filterOpacity = ms + ".Alpha(opacity=" + (params.opacity * 100) + ")"
        s.filter = (node.filterMatrix or E) + (node.filterOpacity or E)
      s.font = params.font if params.font
      s.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"' if params["font-family"]
      s.fontSize = params["font-size"] if params["font-size"]
      s.fontWeight = params["font-weight"] if params["font-weight"]
      s.fontStyle = params["font-style"] if params["font-style"]
      if params.opacity != null or params["stroke-width"] != null or params.fill != null or params.stroke != null or params["stroke-width"] != null or params["stroke-opacity"] != null or params["fill-opacity"] != null or params["stroke-dasharray"] != null or params["stroke-miterlimit"] != null or params["stroke-linejoin"] != null or params["stroke-linecap"] != null
        node = o.shape or node
        fill = node.getElementsByTagName("fill") && node.getElementsByTagName("fill")[0]
        newfill = false
        newfill = fill = createNode("fill") if !fill
        if "fill-opacity" in params or "opacity" in params
          opacity = ((+a["fill-opacity"] + 1 or 2) - 1) * ((+a.opacity + 1 or 2) - 1) * ((+R.getRGB(params.fill).o + 1 or 2) - 1)
          opacity = 0 if opacity < 0
          opacity = 1 if opacity > 1
          fill.opacity = opacity
        fill.on = true if params.fill
        if fill.on == null or params.fill == "none"
          fill.on = false
        if fill.on and params.fill
          isURL = params.fill.match(ISURL)
          if isURL
            fill.src = isURL[1]
            fill.type = "tile"
          else
            fill.color = R.getRGB(params.fill).hex
            fill.src = ""
            fill.type = "solid"
            if R.getRGB(params.fill).error and (res.type in { circle: 1, ellipse: 1 } or String(params.fill).charAt() != "r") and addGradientFill(res, params.fill)
              a.fill = "none"
        node.appendChild(fill) if newfill
        stroke = node.getElementsByTagName("stroke") and node.getElementsByTagName("stroke")[0]
        newstroke = false
        newstroke = stroke = createNode("stroke") if !stroke
        if (params.stroke && params.stroke != "none") or params["stroke-width"] or params["stroke-opacity"] != null or params["stroke-dasharray"] or params["stroke-miterlimit"] or params["stroke-linejoin"] or params["stroke-linecap"]
          stroke.on = true
        stroke.on = false if params.stroke == "none" or stroke.on == null or params.stroke == 0 or params["stroke-width"] == 0
        strokeColor = R.getRGB(params.stroke)
        stroke.color = strokeColor.hex if stroke.on and params.stroke
        opacity = ((+a["stroke-opacity"] + 1 or 2) - 1) * ((+a.opacity + 1 or 2) - 1) * ((+strokeColor.o + 1 or 2) - 1)
        width = (parseFloat(params["stroke-width"]) or 1) * 0.75
        opacity = 0 if opacity < 0
        opacity = 1 if opacity > 1
        width = a["stroke-width"] if params["stroke-width"] == null
        stroke.weight = width if params["stroke-width"]
        opacity *= width if width and width < 1
        stroke.weight = 1 if opacity
        stroke.opacity = opacity
        stroke.joinstyle = params["stroke-linejoin"] or "miter" if params["stroke-linejoin"]
        stroke.miterlimit = params["stroke-miterlimit"] or 8
        if params["stroke-linecap"]
          stroke.endcap = if params["stroke-linecap"] == "butt" then "flat" else if params["stroke-linecap"] == "square" then "square" else "round"
        if params["stroke-dasharray"]
          dasharray = { "-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot" }
          stroke.dashstyle = if dasharray.hasOwnProperty(params["stroke-dasharray"]) then dasharray[params["stroke-dasharray"]] else E
        node.appendChild(stroke) if newstroke
      if res.type == "text"
        s = res.paper.span.style
        s.font = a.font if a.font
        s.fontFamily = a["font-family"] if a["font-family"]
        s.fontSize = a["font-size"] if a["font-size"]
        s.fontWeight = a["font-weight"] if a["font-weight"]
        s.fontStyle = a["font-style"] if a["font-style"]
        leftAngle = "<"
        ampersand = "&"
        leftAngleRE = /#{leftAngle}/g
        ampersandRE = /#{ampersand}/g
        br = "br"
        brtag = "<#{br}>"
        res.paper.span.innerHTML = String(res.node.string).replace(leftAngleRE, "&#60;").replace(ampersandRE, "&#38;").replace(/\n/g, brtag) if res.node.string
        res.W = a.w = res.paper.span.offsetWidth
        res.H = a.h = res.paper.span.offsetHeight
        res.X = a.x
        res.Y = a.y + Math.round(res.H / 2)

        # text-anchor emulation
        switch a["text-anchor"]
          when "start"
            res.node.style["v-text-align"] = "left"
            res.bbx = Math.round(res.W / 2)
          when "end"
            res.node.style["v-text-align"] = "right"
            res.bbx = -Math.round(res.W / 2)
          else
            res.node.style["v-text-align"] = "center"
    addGradientFill = (o, gradient) ->
        o.attrs ?= {}
        attrs = o.attrs
        type = "linear"
        fxfy = ".5 .5"
        o.attrs.gradient = gradient
        gradient = String(gradient).replace(radial_gradient, (all, fx, fy) ->
          type = "radial"
          if fx and fy
            fx = parseFloat(fx)
            fy = parseFloat(fy)
            if Math.pow(fx - 0.5, 2) + Math.pow(fy - 0.5, 2) > .25
              fy = Math.sqrt(0.25 - Math.pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5
            fxfy = fx + S + fy
          E
        )
        gradient = gradient.split(/\s*\-\s*/)
        if type == "linear"
          angle = gradient.shift()
          angle = -parseFloat(angle)
          if isNaN(angle)
            return null
        dots = parseDots(gradient)
        if !dots
          return null
        o = o.shape or o.node
        fill = o.getElementsByTagName("fill")[0] || createNode("fill")
        o.appendChild(fill) if !fill.parentNode
        if dots.length
          fill.on = true
          fill.method = "none"
          fill.color = dots[0].color
          fill.color2 = dots[dots.length - 1].color
          clrs = []
          for i in [0..dot.length - 1]
            clrs.push(dots[i].offset + S + dots[i].color) if dots[i].offset
          if fill.colors
            if clrs.length
              fill.colors.value = clrs.join()
            else
              fill.colors.value =  "0% " + fill.color
          if type == "radial"
            fill.type = "gradientradial"
            fill.focus = "100%"
            fill.focussize = fxfy
            fill.focusposition = fxfy
          else
            fill.type = "gradient"
            fill.angle = (270 - angle) % 360
        1

    class Element
      constructor: (node, group, vml) ->
        Rotation = 0
        RotX = 0
        RotY = 0
        Scale = 1
        @[0] = node
        @id = R._oid++
        @node = node
        node.R = this
        @X = 0
        @Y = 0
        @attrs = {}
        @Group = group
        @paper = vml
        @_ =
          tx: 0
          ty: 0
          rt: { deg: 0 }
          sx: 1
          sy: 1
        vml.bottom = this if !vml.bottom
        @prev = vml.top
        vml.top.next = this if vml.top
        vml.top = this
        @next = null

      rotate: (deg, cx, cy) ->
        return this if this.removed
        if !deg?
          if @_.rt.cx
            return [@_.rt.deg, @_.rt.cx, @_.rt.cy].join(" ")
          return @_.rt.deg
        deg = String(deg).split(separator)
        if deg.length - 1
          cx = parseFloat(deg[1])
          cy = parseFloat(deg[2])
        deg = parseFloat(deg[0])
        if cx?
          @_.rt.deg = deg
        else
          @_.rt.deg += deg
        cx = null if !cy?
        @_.rt.cx = cx
        @_.rt.cy = cy
        this.setBox(@attrs, cx, cy)
        this.Group.style.rotation = @_.rt.deg
        # gradient fix for rotation. TODO
        # var fill = (this.shape || this.node).getElementsByTagName("fill");
        # fill = fill[0] || {};
        # var b = ((360 - this._.rt.deg) - 270) % 360;
        # !R.is(fill.angle, "undefined") && (fill.angle = b);
        this
  
      setBox: (params, cx, cy) ->
        return this if this.removed
        gs = this.Group.style
        os = (@shape and @shape.style) || @node.style
        params ?= {}
        for i in params
          if params.hasOwnProperty(i)
            @attrs[i] = params[i]
        cx ?= @_.rt.cx
        cy ?= @_.rt.cy
        attr = this.attrs
        switch this.type
          when "circle"
            x = attr.cx - attr.r
            y = attr.cy - attr.r
            w = h = attr.r * 2
          when "ellipse"
            x = attr.cx - attr.rx
            y = attr.cy - attr.ry
            w = attr.rx * 2
            h = attr.ry * 2
          when "image"
            x = +attr.x
            y = +attr.y
            w = attr.width || 0
            h = attr.height || 0
          when "text"
            @textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("")
            x = attr.x - Math.round(this.W / 2)
            y = attr.y - this.H / 2
            w = @W
            h = @H
          when "rect", "path"
            if !@attrs.path
              x = 0
              y = 0
              w = @paper.width
              h = @paper.height
            else
              dim = pathDimensions(@attrs.path)
              x = dim.x
              y = dim.y
              w = dim.width
              h = dim.height
          else
            x = 0
            y = 0
            w = @paper.width
            h = @paper.height
        cx ?= x + w / 2
        cy ?= y + h / 2
        left = cx - @paper.width / 2
        top = cy - @paper.height / 2
        gs.left != (t = left + "px") and (gs.left = t)
        gs.top != (t = top + "px") and (gs.top = t)
        @X = if pathlike.hasOwnProperty(this.type) then -left else x
        @Y = if pathlike.hasOwnProperty(this.type) then -top else y
        @W = w
        @H = h
        if pathlike.hasOwnProperty(@type)
          os.left = -left * zoom + "px"
          os.top = t = -top * zoom + "px"
        else if @type == "text"
          os.left = -left + "px"
          os.top = -top + "px"
        else
          gs.width = @paper.width + "px"
          gs.height = @paper.height + "px"
          os.left = x - left + "px"
          os.top = y - top + "px"
          os.width = w + "px"
          os.height = h + "px"
  
      hide: ->
        @Group.style.display = "none" if !this.removed
        this
  
      show: ->
        @Group.style.display = "block" if !this.removed
        this
  
      getBBox: ->
        return this if @removed
        if pathlike.hasOwnProperty(@type)
          return pathDimensions(@attrs.path)
        x: @X + (@bbx || 0)
        y: @Y
        width: @W
        height: @H
  
      remove: ->
        return this if @removed
        tear(this, @paper)
        @node.parentNode.removeChild(@node)
        @Group.parentNode.removeChild(@Group)
        @shape.parentNode.removeChild(@shape) if @shape
        for i in this
          delete @[i]
        @removed = true
  
      attr: (name, value) ->
        return this if @removed
        if !name?
          res = {}
          for i in @attrs
            if @attrs.hasOwnProperty(i)
              res[i] = this.attrs[i];
          res.rotation = this.rotate() if @_.rt.deg
          res.scale = this.scale() if @_.sx != 1 || @_.sy != 1
          if res.gradient and res.fill == "none"
            if res.fill = res.gradient
              delete res.gradient
          return res
        if !value? and R.is(name, "string")
            if name == "translation"
              return translate.call(this)
            if name == "rotation"
              return this.rotate()
            if name == "scale"
              return this.scale()
            if name == "fill" and @attrs.fill == "none" and @attrs.gradient
              return @attrs.gradient
            return @attrs[name]
        if @attrs and !value? and R.is(name, "array")
          values = {}
          for i in [0..name.length - 1]
            values[name[i]] = @attr(name[i])
          return values
        if value?
          params = {}
          params[name] = value
        params = name if !value? and R.is(name, "object")
        if params
          if params.text and @type == "text"
            @node.string = params.text
          setFillAndStroke(this, params)
          if params.gradient && (({ circle: 1, ellipse: 1 }).hasOwnProperty(this.type) || String(params.gradient).charAt() != "r")
            addGradientFill(this, params.gradient)
          this.setBox(@attrs) if !pathlike.hasOwnProperty(@type) or @_.rt.deg
        this
  
      toFront: ->
        @Group.parentNode.appendChild(@Group) if !@removed
        tofront(this, @paper) if @paper.top != this
        this
  
      toBack: ->
        return this if @removed
        if @Group.parentNode.firstChild != @Group
          @Group.parentNode.insertBefore(@Group, @Group.parentNode.firstChild)
          toback(this, @paper)
        this
      insertAfter: (element) ->
        return this if @removed
        if element.constructor == Set
          element = element[element.length]
        if element.Group.nextSibling
          element.Group.parentNode.insertBefore(@Group, element.Group.nextSibling)
        else
          element.Group.parentNode.appendChild(@Group)
        insertafter(this, element, @paper)
        this

      insertBefore: (element) ->
        return this if @removed
        if element.constructor == Set
          element = element[0]
        element.Group.parentNode.insertBefore(@Group, element.Group)
        insertbefore(this, element, @paper)
        this

      blur: (size) ->
        blurregexp = /[ ]progid:\S+Blur\([^\)]+\)/g
        s = @node.runtimeStyle
        f = s.filter
        f = f.replace(blurregexp, E)
        if +size != 0
          !attrs.blur = size
          s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")"
          s.margin = R.format("-{0}px 0 0 -{0}px", Math.round(+size || 1.5))
        else
          s.filter = f
          s.margin = 0
          delete @attrs.blur

    R::theCircle = (vml, x, y, r) ->
      g = createNode("group")
      o = createNode("oval")
      ol = o.style
      g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px"
      g.coordsize = coordsize
      g.coordorigin = vml.coordorigin
      g.appendChild(o)
      res = new Element(o, g, vml)
      res.type = "circle"
      setFillAndStroke(res, { stroke: "#000", fill: "none" })
      res.attrs.cx = x
      res.attrs.cy = y
      res.attrs.r = r
      res.setBox({ x: x - r, y: y - r, width: r * 2, height: r * 2 })
      vml.canvas.appendChild(g)
      res

    R::rectPath = (x, y, w, h, r) ->
      if r
        R.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", x + r, y, w - r * 2, r, -r, h - r * 2, r * 2 - w, r * 2 - h)
      else
        R.format("M{0},{1}l{2},0,0,{3},{4},0z", x, y, w, h, -w)

    R::theRect = (vml, x, y, w, h, r) ->
      path = rectPath(x, y, w, h, r)
      res = vml.path(path)
      a = res.attrs
      res.X = a.x = x
      res.Y = a.y = y
      res.W = a.width = w
      res.H = a.height = h
      a.r = r
      a.path = path
      res.type = "rect"
      res

    R::theEllipse = (vml, x, y, rx, ry) ->
      g = createNode("group")
      o = createNode("oval")
      ol = o.style
      g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px"
      g.coordsize = coordsize
      g.coordorigin = vml.coordorigin
      g.appendChild(o)
      res = new Element(o, g, vml)
      res.type = "ellipse"
      setFillAndStroke(res, {stroke: "#000"})
      res.attrs.cx = x
      res.attrs.cy = y
      res.attrs.rx = rx
      res.attrs.ry = ry
      res.setBox({ x: x - rx, y: y - ry, width: rx * 2, height: ry * 2 })
      vml.canvas.appendChild(g)
      res

    R::theImage = (vml, src, x, y, w, h) ->
      g = createNode("group")
      o = createNode("image")
      ol = o.style
      g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px"
      g.coordsize = coordsize
      g.coordorigin = vml.coordorigin
      o.src = src
      g.appendChild(o)
      res = new Element(o, g, vml)
      res.type = "image"
      res.attrs.src = src
      res.attrs.x = x
      res.attrs.y = y
      res.attrs.w = w
      res.attrs.h = h
      res.setBox({ x: x, y: y, width: w, height: h })
      vml.canvas.appendChild(g)
      res

    R::theText = (vml, x, y, text) ->
      g = createNode("group")
      el = createNode("shape")
      ol = el.style
      path = createNode("path")
      ps = path.style
      o = createNode("textpath")
      g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px"
      g.coordsize = coordsize
      g.coordorigin = vml.coordorigin
      path.v = R.format("m{0},{1}l{2},{1}", Math.round(x * 10), Math.round(y * 10), Math.round(x * 10) + 1)
      path.textpathok = true
      ol.width = vml.width
      ol.height = vml.height
      o.string = String(text)
      o.on = true
      el.appendChild(o)
      el.appendChild(path)
      g.appendChild(el)
      res = new Element(o, g, vml)
      res.shape = el
      res.textpath = path
      res.type = "text"
      res.attrs.text = text
      res.attrs.x = x
      res.attrs.y = y
      res.attrs.w = 1
      res.attrs.h = 1
      setFillAndStroke(res, { font: availableAttrs.font, stroke: "none", fill: "#000" })
      res.setBox()
      vml.canvas.appendChild(g)
      res

    R::setSize = (width, height) ->
      cs = this.canvas.style
      width += "px" if width == +width
      height += "px" if height == +height
      cs.width = width
      cs.height = height
      cs.clip = "rect(0 " + width + " " + height + " 0)"
      this

    document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
    try
      !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml")
      createNode = (tagName) ->
        document.createElement('<' + 'rvml:' + tagName + ' class="rvml">')
    catch error
      createNode = (tagName) ->
        document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')

    create = ->
      con = getContainer.apply(0, arguments)
      container = con.container
      height = con.height
      width = con.width
      x = con.x
      y = con.y
      if !container
        throw new Error("VML container not found.")
      res = new Paper
      c = res.canvas = document.createElement("div")
      cs = c.style
      x ?= 0
      y ?= 0
      width ?= 512
      height ?= 342
      width += "px" if width == +width
      height += "px" if height == +height
      res.width = 1e3
      res.height = 1e3
      res.coordsize = zoom * 1e3 + S + zoom * 1e3
      res.coordorigin = "0 0"
      res.span = document.createElement("span")
      res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"
      c.appendChild(res.span)
      cs.cssText = R.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height)
      if container == 1
        document.body.appendChild(c)
        cs.left = x + "px"
        cs.top = y + "px"
        cs.position = "absolute"
      else
        if container.firstChild
          container.insertBefore(c, container.firstChild)
        else
          container.appendChild(c)
      plugins.call(res, res, R.fn)
      res

    Paper::clear = ->
      @canvas.innerHTML = ""
      @span = document.createElement("span")
      @span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"
      @canvas.appendChild(@span)
      @bottom = @top = null

    Paper::remove = ->
      @canvas.parentNode.removeChild(@canvas)
      for i in this
        @[i] = removed(i)
      true

  # WebKit rendering bug workaround method
  if ((navigator.vendor == "Apple Computer, Inc.") and (navigator.userAgent.match(/Version\/(.*?)\s/)[1] < 4 or window.navigator.platform.slice(0, 2) == "iP"))
    Paper::safari = ->
      rect = @rect(-99, -99, @width + 99, @height + 99).attr({ stroke: "none" })
      window.setTimeout(->
        rect.remove()
      )
  else
    Paper::safari = ->

  preventDefault = ->
    this.returnValue = false

  preventTouch = ->
    this.originalEvent.preventDefault()

  stopPropagation = ->
    this.cancelBubble = true

  stopTouch = ->
    this.originalEvent.stopPropagation()

  addEvent = (->
    if document.addEventListener
      (obj, type, fn, element) ->
        realName = if supportsTouch and touchMap[type] then touchMap[type] else type
        f = (e) ->
          if supportsTouch and touchMap.hasOwnProperty(type)
            for i in [0..(e.targetTouches and e.targetTouches.length - 1)]
              if e.targetTouches[i].target == obj
                olde = e
                e = e.targetTouches[i]
                e.originalEvent = olde
                e.preventDefault = preventTouch
                e.stopPropagation = stopTouch
                break
          fn.call(element, e)
        obj.addEventListener(realName, f, false)
        ->
          obj.removeEventListener(realName, f, false)
          true
    else if document.attachEvent
      (obj, type, fn, element) ->
        f = (e) ->
          e = e || window.event
          e.preventDefault = e.preventDefault || preventDefault
          e.stopPropagation = e.stopPropagation || stopPropagation
          fn.call(element, e)
        obj.attachEvent("on" + type, f)
        detacher = ->
          obj.detachEvent("on" + type, f)
          true
        detacher
  )()

  drag = []
  dragMove = (e) ->
    x = e.clientX
    y = e.clientY
    j = drag.length
    while j--
      dragi = drag[j]
      if supportsTouch
        i = e.touches.length
        while i--
          touch = e.touches[i]
          if touch.identifier == dragi.el._drag.id
            x = touch.clientX
            y = touch.clientY
            (if e.originalEvent then e.originalEvent else e).preventDefault()
            break
      else
        e.preventDefault()
      dragi.move.call(dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y) if dragi.move

  dragUp = ->
    R.unmousemove(dragMove).unmouseup(dragUp)
    i = drag.length
    while i--
      dragi = drag[i]
      dragi.el._drag = {}
      dragi.end && dragi.end.call(dragi.el)
    drag = []

  for event in events
    ((eventName) ->
      R[eventName] = Element.prototype[eventName] = (fn) ->
        if R.is(fn, "function")
          this.events = this.events || []
          this.events.push({ name: eventName, f: fn, unbind: addEvent(this.shape || this.node || document, eventName, fn, this) })
        this
      R["un" + eventName] = Element.prototype["un" + eventName] = (fn) ->
        events = this.events
        l = events.length
        while l--
          if events[l].name == eventName and events[l].f == fn
            events[l].unbind()
            events.splice(l, 1)
            delete this.events if !events.length
            this
        this
    )(event)

  Element::hover = (f_in, f_out) ->
    @mouseover(f_in).mouseout(f_out)

  Element::unhover = (f_in, f_out) ->
    @unmouseover(f_in).unmouseout(f_out)

  Element::drag = (onmove, onstart, onend) ->
    @_drag = {}
    @mousedown((e) ->
      (e.originalEvent || e).preventDefault()
      @_drag.x = e.clientX
      @_drag.y = e.clientY
      @_drag.id = e.identifier
      onstart.call(this, e.clientX, e.clientY) if onstart
      R.mousemove(dragMove).mouseup(dragUp) if !drag.length
      drag.push({ el: this, move: onmove, end: onend })
    )
    this

  Element::undrag = (onmove, onstart, onend) ->
    i = drag.length
    while i--
      drag[i].el == this and (drag[i].move == onmove and drag[i].end == onend) and drag.splice(i, 1)
      R.unmousemove(dragMove).unmouseup(dragUp) if !drag.length

  Paper::circle = (x, y, r) ->
    theCircle(this, x || 0, y || 0, r || 0)

  Paper::rect = (x, y, w, h, r) ->
    theRect(this, x || 0, y || 0, w || 0, h || 0, r || 0)

  Paper::ellipse = (x, y, rx, ry) ->
    theEllipse(this, x || 0, y || 0, rx || 0, ry || 0)

  Paper::path = (pathString) ->
    pathString += "" if pathString and !R.is(pathString, "string") and !R.is(pathString[0], "array")
    thePath(R.format.apply(R, arguments), this)

  Paper::image = (src, x, y, w, h) -> 
    theImage(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0)

  Paper::text = (x, y, text) ->
    theText(this, x || 0, y || 0, text || E)

  Paper::set = (itemsArray) ->
    itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length) if arguments.length > 1
    new Set(itemsArray)

  Paper::setSize = R::setSize
  Paper::top = Paper.prototype.bottom = null
  Paper::R = R

  Element::x_y = ->
    this.x + S + this.y

  Element::resetScale = ->
    return this if (this.removed)
    @_.sx = 1
    @_.sy = 1
    @attrs.scale = "1 1"

  Element::scale = (x, y, cx, cy) ->
    return this if (this.removed)
    if !x? and !y?
      x: this._.sx
      y: this._.sy
      toString: this.x_y
    y ?= x
    y = x if !+y
    a = @attrs(123)
    if x != 0
      bb = this.getBBox()
      rcx = bb.x + bb.width / 2
      rcy = bb.y + bb.height / 2
      kx = x / @_.sx
      ky = y / @_.sy
      cx = if +cx || cx == 0 then cx else rcx
      cy = if +cy || cy == 0 then cy else rcy
      dirx = ~~(x / Math.abs(x))
      diry = ~~(y / Math.abs(y))
      s = @node.style
      ncx = cx + (rcx - cx) * kx
      ncy = cy + (rcy - cy) * ky
      switch @type
        when "rect", "image"
          neww = a.width * dirx * kx
          newh = a.height * diry * ky
          @attr(
            height: newh
            r: a.r * Math.min(dirx * kx, diry * ky)
            width: neww
            x: ncx - neww / 2
            y: ncy - newh / 2
          )
        when "circle", "ellipse"
          @attr(
            rx: a.rx * dirx * kx
            ry: a.ry * diry * ky
            r: a.r * Math.min(dirx * kx, diry * ky)
            cx: ncx
            cy: ncy
          )
        when "text"
          @attr(
            x: ncx
            y: ncy
          )
        when "path"
          path = pathToRelative(a.path)
          skip = true
          for i in [0..path.length - 1]
            p = path[i]
            P0 = String.prototype.toUpperCase.call(p[0])
            if P0 == "M" and skip
              continue
            else
              skip = false
            if P0 == "A"
              p[path[i].length - 2] *= kx
              p[path[i].length - 1] *= ky
              p[1] *= dirx * kx
              p[2] *= diry * ky
              p[5] = +!(if dirx + diry then !+p[5] else +p[5])
            else if P0 == "H"
              for j in [1..p.length - 1]
                p[j] *= kx
            else if P0 == "V"
              for j in [1..p.length - 1]
                p[j] *= ky
            else
              for j in [1..p.length - 1]
                p[j] *= if j % 2 then kx else ky
          dim2 = pathDimensions(path)
          dx = ncx - dim2.x - dim2.width / 2
          dy = ncy - dim2.y - dim2.height / 2
          path[0][1] += dx
          path[0][2] += dy
          @attr { path: path }
      if @type in { text: 1, image: 1 } and (dirx != 1 or diry != 1)
          if @transformations
            @transformations[2] = "scale(".concat(dirx, ",", diry, ")")
            @node[setAttribute]("transform", this.transformations.join(" "))
            dx = if dirx == -1 then -a.x - (neww || 0) else a.x
            dy = if diry == -1 then -a.y - (newh || 0) else a.y
            @attr { x: dx, y: dy }
            a.fx = dirx - 1
            a.fy = diry - 1
          else
            @node.filterMatrix = ms + ".Matrix(M11=".concat(dirx, ", M12=0, M21=0, M22=", diry, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')")
            s.filter = (this.node.filterMatrix || E) + (this.node.filterOpacity || E)
      else
          if @transformations
            @transformations[2] = ""
            @node[setAttribute]("transform", this.transformations.join(" "))
            a.fx = 0
            a.fy = 0
          else
            @node.filterMatrix = ""
            s.filter = (@node.filterMatrix || E) + (@node.filterOpacity || E)
      a.scale = [x, y, cx, cy].join(" ")
      @_.sx = x
      @_.sy = y
    this

  Element::clone = ->
    return null if @removed
    attr = @attr()
    delete attr.scale
    delete attr.translation
    @paper[@type]().attr(attr)

  getPointAtSegmentLength = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) ->
    len = 0
    for i in [0..101]
      j = i / 100
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, j)
      len += Math.pow(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2), .5) if j
      if len >= length
        dot
      old = dot

  functionCacher(getPointAtSegmentLength)

  getLengthFactory = (istotal, subpath) ->
    (path, length, onlystart) ->
      path = pathToCurve(path)
      sp = ""
      subpaths = {}
      len = 0
      for i in [0..path.length - 1]
        p = path[i]
        if p[0] == "M"
          x = +p[1]
          y = +p[2]
        else
          l = segmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6])
          if len + l > length
              if subpath and !subpaths.start
                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len)
                sp += ["C", point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y]
                return sp if onlystart
                subpaths.start = sp
                sp = ["M", point.x, point.y + "C", point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join()
                len += l
                x = +p[5]
                y = +p[6]
                continue
              if !istotal and !subpath
                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len)
                { x: point.x, y: point.y, alpha: point.alpha }
          len += l
          x = +p[5]
          y = +p[6]
        sp += p
      subpaths.end = sp
      point = if istotal then len else if subpath then subpaths else R.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1)
      point = { x: point.x, y: point.y, alpha: point.alpha } if point.alpha
      point

  segmentLength = (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) ->
    old = { x: 0, y: 0 }
    len = 0
    for i in [0..101]
      j = i / 100
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i)
      len += Math.pow(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2), .5) if i
      old = dot
    len

  functionCacher(segmentLength)

  getTotalLength = getLengthFactory(1)
  getPointAtLength = getLengthFactory()
  getSubpathsAtLength = getLengthFactory(0, 1)
  Element::getTotalLength = ->
    return if @type != "path"
    return this.node.getTotalLength() if @node.getTotalLength
    getTotalLength(this.attrs.path)

  Element::getPointAtLength = (length) ->
    return if @type != "path"
    return @node.getPointAtLength(length) if @node.getPointAtLength
    getPointAtLength(@attrs.path, length)

  Element::getSubpath = (from, to) ->
    return if @type != "path"
    if Math.abs(@getTotalLength() - to) < 1e-6
      return getSubpathsAtLength(@attrs.path, from).end
    a = getSubpathsAtLength(@attrs.path, to, 1)
    if from then getSubpathsAtLength(a, from).end else a

  # animation easing formulas
  R.easing_formulas =
    linear: (n) ->
      n

    "<": (n) ->
      Math.pow(n, 3)

    ">": (n) ->
      Math.pow(n - 1, 3) + 1

    "<>": (n) ->
      n = n * 2
      if n < 1
        return Math.pow(n, 3) / 2
      n -= 2
      (Math.pow(n, 3) + 2) / 2

    backIn: (n) ->
      s = 1.70158
      n * n * ((s + 1) * n - s)

    backOut: (n) ->
      n = n - 1
      s = 1.70158
      n * n * ((s + 1) * n + s) + 1

    elastic: (n) ->
      if n == 0 or n == 1
        return n
      p = .3
      s = p / 4
      Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1

    bounce: (n) ->
      s = 7.5625
      p = 2.75
      if n < (1 / p)
        l = s * n * n
      else
        if n < (2 / p)
          n -= (1.5 / p)
          l = s * n * n + .75
        else
          if n < (2.5 / p)
            n -= (2.25 / p)
            l = s * n * n + .9375
          else
            n -= (2.625 / p)
            l = s * n * n + .984375
      l

  animationElements = { length : 0 }
  animation = ->
    Now = +new Date
    for l in animationElements
      if l != "length" and animationElements.hasOwnProperty(l)
        e = animationElements[l]
        if e.stop or e.el.removed
          delete animationElements[l]
          animationElements.length--
          continue
        time = Now - e.start
        ms = e.ms
        easing = e.easing
        from = e.from
        diff = e.diff
        to = e.to
        t = e.t
        prev = e.prev or 0
        that = e.el
        callback = e.callback
        set = {}
        if time < ms
          pos = if R.easing_formulas[easing] then R.easing_formulas[easing](time / ms) else time / ms
          for attr in from
            if from.hasOwnProperty(attr)
              switch availableAnimAttrs[attr]
                when "along"
                  now = pos * ms * diff[attr]
                  now = to.len - now if to.back
                  point = getPointAtLength(to[attr], now)
                  that.translate(diff.sx - diff.x or 0, diff.sy - diff.y or 0)
                  diff.x = point.x
                  diff.y = point.y
                  that.translate(point.x - diff.sx, point.y - diff.sy)
                  that.rotate(diff.r + point.alpha, point.x, point.y) if to.rot
                when "number"
                  now = +from[attr] + pos * ms * diff[attr]
                when "colour"
                  now = "rgb(" + [
                      upto255(Math.round(from[attr].r + pos * ms * diff[attr].r)),
                      upto255(Math.round(from[attr].g + pos * ms * diff[attr].g)),
                      upto255(Math.round(from[attr].b + pos * ms * diff[attr].b))
                  ].join(",") + ")"
                when "path"
                  now = []
                  for i in [0..from[attr].length - 1]
                    now[i] = [from[attr][i][0]]
                    for j in [1..from[attr][i].length - 1]
                      now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j]
                    now[i] = now[i].join(" ")
                  now = now.join(" ")
                when "csv"
                  switch attr
                    when "translation"
                      x = diff[attr][0] * (time - prev)
                      y = diff[attr][1] * (time - prev)
                      t.x += x
                      t.y += y
                      now = x + S + y
                    when "rotation"
                      now = +from[attr][0] + pos * ms * diff[attr][0]
                      now += "," + from[attr][1] + "," + from[attr][2] if from[attr][1]
                    when "scale"
                      now = [+from[attr][0] + pos * ms * diff[attr][0], +from[attr][1] + pos * ms * diff[attr][1], (if 2 in to[attr] then to[attr][2] else E), (if 3 in to[attr] then to[attr][3] else E)].join(" ")
                    when "clip-rect"
                      now = []
                      i = 4
                      while i--
                        now[i] = +from[attr][i] + pos * ms * diff[attr][i]
              set[attr] = now
          that.attr(set)
          that._run.call(that) if that._run
        else
          if to.along
            point = getPointAtLength(to.along, to.len * !to.back)
            that.translate(diff.sx - (diff.x || 0) + point.x - diff.sx, diff.sy - (diff.y || 0) + point.y - diff.sy)
            that.rotate(diff.r + point.alpha, point.x, point.y) if to.rot
          (t.x or t.y) and that.translate(-t.x, -t.y)
          to.scale += "" if to.scale
          that.attr(to)
          delete animationElements[l]
          animationElements.length--
          that.in_animation = null
          callback.call(that) if R.is(callback, "function")
        e.prev = time
    that.paper.safari() if R.svg and that and that.paper
    window.setTimeout(animation) if animationElements.length

  upto255 = (color) ->
    Math.max(Math.min(color, 255), 0)

  Element::translate = (x, y) ->
    if !x?
      return { x: this._.tx, y: this._.ty, toString: this.x_y }
      this._.tx += +x
      this._.ty += +y
      switch this.type
        when "circle", "ellipse"
          this.attr({ cx: +x + this.attrs.cx, cy: +y + this.attrs.cy })
        when "rect", "image", "text"
          this.attr({x: +x + this.attrs.x, y: +y + this.attrs.y})
        when "path"
          path = pathToRelative(this.attrs.path)
          path[0][1] += +x
          path[0][2] += +y
          this.attr({ path: path })
    this

  Element::animateWith = (element, params, ms, easing, callback) ->
    params.start = animationElements[element.id].start if animationElements[element.id]
    @animate(params, ms, easing, callback)

  along = (isBack) ->
    return (path, ms, rotate, callback) ->
      params = { back: isBack }
      if R.is(rotate, "function") then (callback = rotate) else (params.rot = rotate)
      path = path.attrs.path if path and path.constructor == Element
      params.along = path if path
      this.animate(params, ms, callback)
  Element::animateAlong = along()
  Element::animateAlongBack = along(1)
  Element::onAnimation = (f) ->
    @_run = f or 0
    this

  Element::animate = (params, ms, easing, callback) ->
    if R.is(easing, "function") or !easing
      callback = easing or null
    from = {}
    to = {}
    diff = {}
    for attr in params
      if params.hasOwnProperty(attr)
        if availableAnimAttrs.hasOwnProperty(attr)
          from[attr] = @attr(attr)
          from[attr] = availableAttrs[attr] if !from[attr]?
          to[attr] = params[attr]
          switch availableAnimAttrs[attr]
            when "along"
              len = getTotalLength(params[attr])
              point = getPointAtLength(params[attr], len * !!params.back)
              bb = @getBBox()
              diff[attr] = len / ms
              diff.tx = bb.x
              diff.ty = bb.y
              diff.sx = point.x
              diff.sy = point.y
              to.rot = params.rot
              to.back = params.back
              to.len = len
              diff.r = parseFloat(@rotate()) or 0 if params.rot
            when "number"
              diff[attr] = (to[attr] - from[attr]) / ms
            when "colour"
              from[attr] = R.getRGB(from[attr])
              toColour = R.getRGB(to[attr])
              diff[attr] =
                r: (toColour.r - from[attr].r) / ms
                g: (toColour.g - from[attr].g) / ms
                b: (toColour.b - from[attr].b) / ms
            when "path"
              pathes = pathToCurve(from[attr], to[attr])
              from[attr] = pathes[0]
              toPath = pathes[1]
              diff[attr] = []
              for i in [0..from[attr].length - 1]
                diff[attr][i] = [0];
                for j in [1..from[attr][i].length - 1]
                  diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms
            when "csv"
              values = String(params[attr]).split(separator)
              from2 = String(from[attr]).split(separator)
              switch attr
                when "translation"
                  from[attr] = [0, 0]
                  diff[attr] = [values[0] / ms, values[1] / ms]
                when "rotation"
                  from[attr] = (from2[1] == values[1] && from2[2] == values[2]) ? from2 : [0, values[1], values[2]]
                  diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0]
                when "scale"
                  params[attr] = values
                  from[attr] = String(from[attr]).split(separator)
                  diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][1]) / ms, 0, 0]
                when "clip-rect"
                  from[attr] = String(from[attr]).split(separator)
                  diff[attr] = []
                  i = 4
                  while i--
                    diff[attr][i] = (values[i] - from[attr][i]) / ms
              to[attr] = values
    this.stop()
    @in_animation = 1
    animationElements[this.id] =
      start: params.start || +new Date
      ms: ms
      easing: easing
      from: from
      diff: diff
      to: to
      el: this
      callback: callback
      t: { x: 0, y: 0 }
    animation() if ++animationElements.length == 1
    this

  Element::stop = ->
    animationElements.length-- if animationElements[this.id]
    delete animationElements[@id]
    this

  Element::translate = (x, y) ->
    this.attr({ translation: x + " " + y })

  Element::toString = ->
    "Rapha\xebl\u2019s object"

  R.ae = animationElements

  class Set
    contructor: (items) ->
      @items = []
      @length = 0
      @type = "set"
      if items
        for i in [0..items.length - 1]
          if items[i] and (items[i].constructor == Element or items[i].constructor == Set)
            @[@items.length] = @items[@items.length] = items[i]
            @length++
  
    push: ->
      for i in [0..arguments.length -1]
        item = arguments[i];
        if item and (item.constructor == Element or item.constructor == Set)
          len = @items.length
          @[len] = @items[len] = item
          @length++
      this
  
    pop: ->
      delete @[@length--]
      @items.pop()

    attr: (name, value) ->
      if name and R.is(name, "array") and R.is(name[0], "object")
        for j in [0..name.length - 1]
          @items[j].attr(name[j])
      else
        for i in [0..@items.length - 1]
          @items[i].attr(name, value)
      this
  
    animate: (params, ms, easing, callback) ->
      callback = easing or null if R.is(easing, "function") or !easing
      len = @items.length
      i = len
      set = this
      if callback
        collector = ->
          !--len and callback.call(set)
  
      easing = if R.is(easing, "string") then easing else collector
      item = @items[--i].animate(params, ms, easing, collector)
      while i--
        @items[i].animateWith(item, params, ms, easing, collector)
      this
  
    insertAfter: (el) ->
      i = @items.length
      while i--
        @items[i].insertAfter(el)
      this
  
    getBBox: ->
      x = y = w = h = []
      for i in [@items.length..0]
      #for (var i = this.items.length; i--;) {
        box = @items[i].getBBox()
        x.push(box.x)
        y.push(box.y)
        w.push(box.x + box.width)
        h.push(box.y + box.height)
      x = Math.min.apply(0, x)
      y = Math.min.apply(0, y)
      x: x
      y: y
      width: Math.max.apply(0, w) - x
      height: Math.max.apply(0, h) - y
  
    clone: (s) ->
      s = new Set
      for i in [0..@items.length - 1]
       s.push(@items[i].clone())
      s

  for method in Element.prototype
    if Element.prototype.hasOwnProperty(method)
      Set.prototype[method] = ((methodname) ->
          (->
            for i in [0..@items.length - 1]
              @items[i][methodname].apply(@items[i], arguments)
            this)
      )(method)

  R::registerFont = (font) ->
    return font if !font.face
    this.fonts = this.fonts || {};
    fontcopy =
      w: font.w
      face: {}
      glyphs: {}
    family = font.face["font-family"]
    for prop in font.face
      if font.face.hasOwnProperty(prop)
        fontcopy.face[prop] = font.face[prop]
    if @fonts[family]
      @fonts[family].push(fontcopy)
    else
      @fonts[family] = [fontcopy]
    if !font.svg
      fontcopy.face["units-per-em"] = parseInt(font.face["units-per-em"], 10)
      for glyph in font.glyphs
        if font.glyphs.hasOwnProperty(glyph)
          path = font.glyphs[glyph]
          fontcopy.glyphs[glyph] =
            w: path.w,
            k: {},
            d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, (command) ->
                    { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[command] or "M"
                ) + "z"
          if path.k
            for k in path.k
              if path.hasOwnProperty(k)
                fontcopy.glyphs[glyph].k[k] = path.k[k]
    font

  Paper::getFont = (family, weight, style, stretch) ->
    stretch = stretch or "normal"
    style = style or "normal"
    weight = +weight or { normal: 400, bold: 700, lighter: 300, bolder: 800 }[weight] or 400
    return if !R.fonts
    font = R.fonts[family]
    if !font
      name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i")
      for fontName in R.fonts
        if R.fonts.hasOwnProperty(fontName)
          if name.test(fontName)
            font = R.fonts[fontName]
            break
    if font
      for i in [0..font.length - 1]
        thefont = font[i]
        if thefont.face["font-weight"] == weight and (thefont.face["font-style"] == style or !thefont.face["font-style"]) and thefont.face["font-stretch"] == stretch
          break
    thefont

  Paper::print = (x, y, string, font, size, origin) ->
    origin ?= "middle"; # baseline|middle
    out = @set()
    letters = String(string).split("")
    shift = 0
    path = ""
    font = @getFont(font) if R.is(font, string)
    if font
      scale = (size or 16) / font.face["units-per-em"]
      bb = font.face.bbox.split(separator)
      top = +bb[0]
      height = +bb[1] + (if origin == "baseline" then bb[3] - bb[1] + (+font.face.descent) else (bb[3] - bb[1]) / 2)
      for i in [0..letters.length - 1]
        prev = i and font.glyphs[letters[i - 1]] or {}
        curr = font.glyphs[letters[i]]
        shift += if i then (prev.w or font.w) + (prev.k and prev.k[letters[i]] or 0) else 0
        out.push(@path(curr.d).attr({ fill: "#000", stroke: "none", translation: [shift, 0] })) if curr and curr.d
      out.scale(scale, scale, top, height).translate(x - top, y - height)
    out

  R.format = (token, params) ->
    formatrg = /\{(\d+)\}/g
    args = if R.is(params, "array") then [0].concat(params) else arguments
    if token and R.is(token, "string") and args.length - 1
      token = token.replace(formatrg, (str, i) ->
        if !args[++i]? then E else args[i]
    )
    token or E

  R.ninja = ->
    if oldRaphael.was then (Raphael = oldRaphael.is) else delete Raphael
    R

  functionCacher(R.toHex, R)
  functionCacher(R.getRGB, R)
  functionCacher(R.pathDimensions, R)
  functionCacher(R.pathToRelative, 0, R.pathClone)
  functionCacher(R.pathToAbsolute, null, R.pathClone)

  R.el = Element.prototype
  R
)()

class RGB
  @rg: /^(?=[\da-f]$)/

  # TODO: Should correct to integers in range 0-255 / 0-1
  constructor: (red, green, blue, opacity) ->
    @red = red
    @green = green
    @blue = blue
    @opacity = opacity if isFinite(opacity)

  toString: ->
    this.hex()

  error: ->
    this.error = true
    this

  hex: ->
    red = (~~@red).toString(16).replace(RGB.rg, "0")
    green = (~~@green).toString(16).replace(RGB.rg, "0")
    blue = (~~@blue).toString(16).replace(RGB.rg, "0")
    return "#" + red + green + blue

  toHSB: ->
    red = @red
    green = @green
    blue = @blue
    if red > 1 or green > 1 or blue > 1
      red /= 255
      green /= 255
      blue /= 255
    max = Math.max(red, green, blue)
    min = Math.min(red, green, blue)
    brightness = max
    if min == max
      new HSB(0, 0, max)
    else
      delta = max - min
      saturation = delta / max
      if red == max
        hue = (green - blue) / delta
      else if green == max
        hue = 2 + ((blue - red) / delta)
      else
        hue = 4 + ((red - green) / delta)
      hue /= 6
      hue < 0 and hue++
      hue > 1 and hue--
    new HSB(hue, saturation, brightness)

  toHSL: ->
    red = @red
    green = @green
    blue = @blue
    if red > 1 or green > 1 or blue > 1
      red /= 255
      green /= 255
      blue /= 255
    max = Math.max(red, green, blue)
    min = Math.min(red, green, blue)
    lightness = (max + min) / 2
    if min == max
      new HSL(0, 0, lightness)
    else
      delta = max - min
      saturation = if lightness < 0.5 then delta / (max + min) else delta / (2 - max - min)
      if red == max
        hue = (green - blue) / delta
      else if green == max
        hue = 2 + ((blue - red) / delta)
      else
        hue = 4 + ((red - green) / delta)
      hue /= 6
      hue < 0 and hue++
      hue > 1 and hue--
    new HSL(hue, saturation, lightness)

class HSB
  constructor: (hue, saturation, brightness) ->
    @hue = hue
    @saturation = saturation
    @brightness = brightness

  toString: ->
    "hsb(" + [@hue, @saturation, @brightness] + ")"

  hex: ->
    "#" + @red

  toRGB: ->
    hsl = new HSL(@hue, @saturation, @brightness / 2)
    hsl.toRGB()

class HSL
  constructor: (hue, saturation, lightness) ->
    @hue = hue
    @saturation = saturation
    @lightness = lightness

  toString: ->
    "hsl(" + [@hue, @saturation, @lightness] + ")"

  toRGB: ->
    hue = @hue
    saturation = @saturation
    lightness = @lightness
    if @hue > 1 or @saturation > 1 or @lightness > 1
      hue /= 255
      saturation /= 255
      lightness /= 255
    if !saturation
      return new RGB(lightness, lightness, lightness)
    else
      rgb = new RGB()
      if lightness < 0.5
        t2 = lightness * (1 + saturation)
      else
        t2 = lightness + saturation - lightness * saturation
      t1 = 2 * lightness - t2
      rgbChannels = { red: 0, green: 1, blue: 2 }
      for channel, index of rgbChannels
        t3 = hue + 1 / 3 * -(index - 1)
        t3 < 0 and t3++
        t3 > 1 and t3--
        if t3 * 6 < 1
          rgb[channel] = t1 + (t2 - t1) * 6 * t3
        else if t3 * 2 < 1
          rgb[channel] = t2
        else if t3 * 3 < 2
          rgb[channel] = t1 + (t2 - t1) * (2 / 3 - t3) * 6 
        else
          rgb[channel] = t1
    rgb.red *= 255
    rgb.green *= 255
    rgb.blue *= 255
    rgb