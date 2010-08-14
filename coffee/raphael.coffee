###
Raphael 1.4.7 - JavaScript Vector Library

Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
CoffeeScript conversion by Paul Gillard
Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
###

functionCacher: (expensiveFunction, scope, postprocessor) ->
  cachedFunction: ->
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

class Raphael
  @version: '1.4.7'
  @hsrg: { hs: 1, rg: 1 }

  userAgentSupportsSVG: ->
    window.SVGAngle? || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")

  type: ->
    @userAgentType ?= if this.userAgentSupportsSVG() then "SVG" else "VML"

  is: (object, type) ->
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
  getRGB: (colour) ->
    if !colour or !!((colour = String(colour)).indexOf("-") + 1)
      return new RGB(-1, -1, -1).error()
    if colour == "none"
      return new RGB(-1, -1, -1)
    !(Raphael.hsrg.hasOwnProperty(colour.substring(0, 2)) or colour.charAt() == "#") and (colour = this.toHex(colour))
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

  _path2string: ->
    this.join(",").replace(/,?([achlmqrstvxz]),?/gi, "$1")

  @pathCommand: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig
  @pathValues: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig

  # TODO: Looks like this should be a Path class
  parsePathString: (pathString) ->
    if !pathString?
      return null
    paramCounts = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }
    data = []
    if this.is(pathString, "array") and this.is(pathString[0], "array")
      data = this.pathClone(pathString)
    if !data.length
      String(pathString).replace(Raphael.pathCommand, ((a, b, c) ->
        params = []
        name = String.prototype.toLowerCase.call(b)
        c.replace(Raphael.pathValues, ((a, b) ->
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

  findDotsAtSegment: (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) ->
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

  pathDimensions: (path) ->
    if path?
      return { x: 0, y: 0, width: 0, height: 0 }
    path = path2Curve(path)
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

  pathClone: (pathArray) ->
    res = []
    if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) # rough assumption
      pathArray = R.parsePathString(pathArray)
    i = -1
    for path in pathArray
      res[++i] = []
      j = -1
      for pathItem in path
        res[i][++j] = pathItem
    res.toString = this._path2string
    res

  pathToRelative: (pathArray) ->
    if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) # rough assumption
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

  pathToAbsolute: (pathArray) ->
    if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) # rough assumption
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

  lineToCurve: (x1, y1, x2, y2) ->
    [x1, y1, x2, y2, x2, y2]

  quadraticToCurve: (x1, y1, ax, ay, x2, y2) ->
    [ 1 / 3 * x1 + 2 / 3 * ax,
      1 / 3 * y1 + 2 / 3 * ay,
      1 / 3 * x2 + 2 / 3 * ax,
      1 / 3 * y2 + 2 / 3 * ay,
      x2,
      y2 ]

  arcToCurve: (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) ->
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

  findDotAtSegment: (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) ->
    t1 = 1 - t
    X = Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x
    Y = Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
    { x: X, y: Y }

  # TODO: curveDimensions was originally cached
  curveDimensions: (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) ->
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
    pathToCurve: (path, path2) ->
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
          pp.splice(i, 1);
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
    parseDots: (gradient) ->
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

    getContainer: (x, y, w, h) ->
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

    plugins: (con, add) ->
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

    tear: (el, paper) ->
      paper.top = el.prev if el == paper.top
      paper.bottom = el.next if el == paper.bottom
      el.next.prev = el.prev if el.next
      el.prev.next = el.next if el.prev

    tofront: (el, paper) ->
      if paper.top == el
        null
      else
        tear(el, paper)
        el.next = null
        el.prev = paper.top
        paper.top.next = el
        paper.top = el

    toback: (el, paper) ->
      if paper.bottom == el
        null
      else
        tear(el, paper)
        el.next = paper.bottom
        el.prev = null
        paper.bottom.prev = el
        paper.bottom = el

    insertafter: (el, el2, paper) ->
      tear(el, paper)
      paper.top = el if el2 == paper.top
      el2.next.prev = el if el2.next
      el.next = el2.next
      el.prev = el2
      el2.next = el

    insertbefore: (el, el2, paper) ->
      tear(el, paper)
      paper.bottom = el if el2 == paper.bottom
      el2.prev.next = el if el2.prev
      el.prev = el2.prev
      el2.prev = el
      el.next = el2

    removed: (methodname) ->
      ->
        throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object")

# Extends Raphael?
class Paper
  @svgNamespace: "http://www.w3.org/2000/svg"
  @xLinkNamespace: "http://www.w3.org/1999/xlink"

if Raphael.type == "SVG"
  Raphael::$ = (el, attr) ->
    if attr
      for key in attr
        if attr.hasOwnProperty key
          el.setAttribute(key, String(attr[key]))
    else
      el = document.createElementNS(Paper.prototype.svgNamespace, el)
      el.style.webkitTapHighlightColor = "rgba(0,0,0,0)"
      el

  Raphael::toString = ->
    "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version

  Raphael::thePath = (pathString, SVG) ->
    el = $("path")
    SVG.canvas.appendChild(el) if SVG.canvas
    p = new Element(el, SVG)
    p.type = "path"
    setFillAndStroke(p, { fill: "none", stroke: "#000", path: pathString })
    p

  Raphael::addGradientFill = (o, gradient, SVG) ->
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
    s.fill = E
    s.opacity = 1
    s.fillOpacity = 1
    1

  Raphael::updatePosition = (o) ->
    bbox = o.getBBox()
    $(o.pattern, { patternTransform: R.format("translate({0},{1})", bbox.x, bbox.y) })

  Raphael::setFillAndStroke = (o, params) ->
    dasharray =
      "": [0]
      "none": [0]
      "-": [3, 1]
      ".": [1, 1]
      "-.": [3, 1, 1, 1]
      "-..": [3, 1, 1, 1, 1, 1]
      ". ": [1, 3]
      "- ": [4, 3]
      "--": [8, 3]
      "- .": [4, 3, 1, 3]
      "--.": [8, 3, 1, 3]
      "--..": [8, 3, 1, 3, 1, 3]
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
    var rotxy = String(rot).split(separator);
    if !(rotxy.length - 1)
      rotxy = null
    else
      rotxy[1] = +rotxy[1]
      rotxy[2] = +rotxy[2]
    o.rotate(0, true) if parseFloat(rot)
    for att in params
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
          when "clip-rect":
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
            if (o.type == "path") {
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
          case "ry":
              if (att == "ry" && o.type == "rect") {
                  break;
              }
          case "cy":
              rotxy && (att == "y" || att == "cy") && (rotxy[2] += value - attrs[att]);
              node[setAttribute](att, value);
              o.pattern && updatePosition(o);
              break;
          case "r":
              if (o.type == "rect") {
                  $(node, {rx: value, ry: value});
              } else {
                  node[setAttribute](att, value);
              }
              break;
          case "src":
              if (o.type == "image") {
                  node.setAttributeNS(o.paper.xlink, "href", value);
              }
              break;
          case "stroke-width":
              node.style.strokeWidth = value;
              // Need following line for Firefox
              node[setAttribute](att, value);
              if (attrs["stroke-dasharray"]) {
                  addDashes(o, attrs["stroke-dasharray"]);
              }
              break;
          case "stroke-dasharray":
              addDashes(o, value);
              break;
          case "translation":
              var xy = String(value).split(separator);
              xy[0] = +xy[0] || 0;
              xy[1] = +xy[1] || 0;
              if (rotxy) {
                  rotxy[1] += xy[0];
                  rotxy[2] += xy[1];
              }
              translate.call(o, xy[0], xy[1]);
              break;
          case "scale":
              xy = String(value).split(separator);
              o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, isNaN(parseFloat(xy[2])) ? null : +xy[2], isNaN(parseFloat(xy[3])) ? null : +xy[3]);
              break;
          case "fill":
              var isURL = String(value).match(ISURL);
              if (isURL) {
                  el = $("pattern");
                  var ig = $("image");
                  el.id = "r" + (R._id++).toString(36);
                  $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                  $(ig, {x: 0, y: 0});
                  ig.setAttributeNS(o.paper.xlink, "href", isURL[1]);
                  el.appendChild(ig);
        
                  var img = document.createElement("img");
                  img.style.cssText = "position:absolute;left:-9999em;top-9999em";
                  img.onload = function () {
                      $(el, {width: this.offsetWidth, height: this.offsetHeight});
                      $(ig, {width: this.offsetWidth, height: this.offsetHeight});
                      document.body.removeChild(this);
                      o.paper.safari();
                  };
                  document.body.appendChild(img);
                  img.src = isURL[1];
                  o.paper.defs.appendChild(el);
                  node.style.fill = "url(#" + el.id + ")";
                  $(node, {fill: "url(#" + el.id + ")"});
                  o.pattern = el;
                  o.pattern && updatePosition(o);
                  break;
              }
              var clr = R.getRGB(value);
              if (!clr.error) {
                  delete params.gradient;
                  delete attrs.gradient;
                  !R.is(attrs.opacity, "undefined") &&
                      R.is(params.opacity, "undefined") &&
                      $(node, {opacity: attrs.opacity});
                  !R.is(attrs["fill-opacity"], "undefined") &&
                      R.is(params["fill-opacity"], "undefined") &&
                      $(node, {"fill-opacity": attrs["fill-opacity"]});
              } else if ((({circle: 1, ellipse: 1}).hasOwnProperty(o.type) || String(value).charAt() != "r") && addGradientFill(node, value, o.paper)) {
                  attrs.gradient = value;
                  attrs.fill = "none";
                  break;
              }
              clr.hasOwnProperty("o") && $(node, {"fill-opacity": clr.o > 1 ? clr.o / 100 : clr.o});
          case "stroke":
              clr = R.getRGB(value);
              node[setAttribute](att, clr.hex);
              att == "stroke" && clr.hasOwnProperty("o") && $(node, {"stroke-opacity": clr.o > 1 ? clr.o / 100 : clr.o});
              break;
          case "gradient":
              (({circle: 1, ellipse: 1}).hasOwnProperty(o.type) || String(value).charAt() != "r") && addGradientFill(node, value, o.paper);
              break;
          case "opacity":
          case "fill-opacity":
              if (attrs.gradient) {
                  var gradient = document.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                  if (gradient) {
                      var stops = gradient.getElementsByTagName("stop");
                      stops[stops.length - 1][setAttribute]("stop-opacity", value);
                  }
                  break;
              }
          default:
              att == "font-size" && (value = parseInt(value, 10) + "px");
              var cssrule = att.replace(/(\-.)/g, function (w) {
                  return String.prototype.toUpperCase.call(w.substring(1));
              });
              node.style[cssrule] = value;
              // Need following line for Firefox
              node[setAttribute](att, value);
              break;
        }
      }
    }
    
    tuneText(o, params);
    if (rotxy) {
        o.rotate(rotxy.join(S));
    } else {
        parseFloat(rot) && o.rotate(rot, true);
    }
};



functionCacher(Raphael.toHex, Raphael)
functionCacher(Raphael.getRGB, Raphael)
functionCacher(Raphael.pathDimensions, Raphael)
functionCacher(Raphael.pathToRelative, 0, Raphael.pathClone)
functionCacher(Raphael.pathToAbsolute, null, Raphael.pathClone)

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