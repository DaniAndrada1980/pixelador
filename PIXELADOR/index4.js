const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
;('use strict')
function _classCallCheck(t, i) {
  if (!(t instanceof i))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(t, i) {
  for (var a = 0; a < i.length; a++) {
    var e = i[a]
    ;(e.enumerable = e.enumerable || !1),
      (e.configurable = !0),
      'value' in e && (e.writable = !0),
      Object.defineProperty(t, e.key, e)
  }
}
function _createClass(t, i, a) {
  return (
    i && _defineProperties(t.prototype, i),
    a && _defineProperties(t, a),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    t
  )
}
var pixelit = (function () {
  function t() {
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    _classCallCheck(this, t),
      (this.drawto = i.to || document.getElementById('pixelitcanvas')),
      (this.drawfrom = i.from || document.getElementById('pixelitimg')),
      this.hideFromImg(),
      (this.scale =
        i.scale && i.scale > 0 && i.scale <= 50 ? 0.01 * i.scale : 0.08),
      (this.palette = i.palette || [
        [140, 143, 174],
        [88, 69, 99],
        [62, 33, 55],
        [154, 99, 72],
        [215, 155, 125],
        [245, 237, 186],
        [192, 199, 65],
        [100, 125, 52],
        [228, 148, 58],
        [157, 48, 59],
        [210, 100, 113],
        [112, 55, 127],
        [126, 196, 193],
        [52, 133, 157],
        [23, 67, 75],
        [31, 14, 28],
      ]),
      (this.maxHeight = i.maxHeight),
      (this.maxWidth = i.maxWidth),
      (this.ctx = this.drawto.getContext('2d')),
      (this.endColorStats = {})
  }
  return (
    _createClass(t, [
      {
        key: 'hideFromImg',
        value: function () {
          return (
            (this.drawfrom.style.visibility = 'hidden'),
            (this.drawfrom.style.position = 'fixed'),
            (this.drawfrom.style.top = 0),
            (this.drawfrom.style.left = 0),
            this
          )
        },
      },
      {
        key: 'setFromImgSource',
        value: function (t) {
          return (this.drawfrom.src = t), this
        },
      },
      {
        key: 'setDrawFrom',
        value: function (t) {
          return (this.drawfrom = t), this
        },
      },
      {
        key: 'setDrawTo',
        value: function (t) {
          return (this.drawto = t), this
        },
      },
      {
        key: 'setPalette',
        value: function (t) {
          return (this.palette = t), this
        },
      },
      {
        key: 'setMaxWidth',
        value: function (t) {
          return (this.maxWidth = t), this
        },
      },
      {
        key: 'setMaxHeight',
        value: function (t) {
          return (this.maxHeight = t), this
        },
      },
      {
        key: 'setScale',
        value: function (t) {
          return (this.scale = t > 0 && t <= 50 ? 0.01 * t : 0.08), this
        },
      },
      {
        key: 'getPalette',
        value: function () {
          return this.palette
        },
      },
      {
        key: 'colorSim',
        value: function (t, i) {
          var a,
            e,
            h = 0
          for (a = 0, e = t.length; a < e; a++)
            h += (t[a] - i[a]) * (t[a] - i[a])
          return Math.sqrt(h)
        },
      },
      {
        key: 'similarColor',
        value: function (t) {
          var i,
            a = this,
            e = [],
            h = this.colorSim(t, this.palette[0])
          return (
            this.palette.forEach(function (r) {
              ;(i = a.colorSim(t, r)) <= h && ((e = r), (h = i))
            }),
            e
          )
        },
      },
      {
        key: 'pixelate',
        value: function () {
          ;(this.drawto.width = this.drawfrom.naturalWidth),
            (this.drawto.height = this.drawfrom.naturalHeight)
          var t = this.drawto.width * this.scale,
            i = this.drawto.height * this.scale,
            a = document.createElement('canvas')
          ;(a.width = this.drawto.width),
            (a.height = this.drawto.height),
            (a.style.visibility = 'hidden'),
            (a.style.position = 'fixed'),
            (a.style.top = '0'),
            (a.style.left = '0'),
            (this.drawto.width > 900 || this.drawto.height > 900) &&
              ((this.scale *= 0.5),
              (t = this.drawto.width * this.scale),
              (i = this.drawto.height * this.scale),
              (a.width = Math.max(t, i) + 50),
              (a.height = Math.max(t, i) + 50)),
            a.getContext('2d').drawImage(this.drawfrom, 0, 0, t, i),
            document.body.appendChild(a),
            (this.ctx.mozImageSmoothingEnabled = !1),
            (this.ctx.webkitImageSmoothingEnabled = !1),
            (this.ctx.imageSmoothingEnabled = !1)
          var e = this.drawfrom.naturalWidth
          this.drawfrom.naturalWidth > 300 &&
            (e +=
              this.drawfrom.naturalWidth > this.drawfrom.naturalHeight
                ? parseInt(
                    this.drawfrom.naturalWidth /
                      (this.drawfrom.naturalWidth * this.scale)
                  ) / 1.5
                : parseInt(
                    this.drawfrom.naturalWidth /
                      (this.drawfrom.naturalWidth * this.scale)
                  ))
          var h = this.drawfrom.naturalHeight
          return (
            this.drawfrom.naturalHeight > 300 &&
              (h +=
                this.drawfrom.naturalHeight > this.drawfrom.naturalWidth
                  ? parseInt(
                      this.drawfrom.naturalHeight /
                        (this.drawfrom.naturalHeight * this.scale)
                    ) / 1.5
                  : parseInt(
                      this.drawfrom.naturalHeight /
                        (this.drawfrom.naturalHeight * this.scale)
                    )),
            this.ctx.drawImage(a, 0, 0, t, i, 0, 0, e, h),
            a.remove(),
            this
          )
        },
      },
      {
        key: 'convertGrayscale',
        value: function () {
          for (
            var t = this.drawto.width,
              i = this.drawto.height,
              a = this.ctx.getImageData(0, 0, t, i),
              e = 0;
            e < a.height;
            e++
          )
            for (var h = 0; h < a.width; h++) {
              var r = 4 * e * a.width + 4 * h,
                s = (a.data[r] + a.data[r + 1] + a.data[r + 2]) / 3
              ;(a.data[r] = s), (a.data[r + 1] = s), (a.data[r + 2] = s)
            }
          return this.ctx.putImageData(a, 0, 0, 0, 0, a.width, a.height), this
        },
      },
      {
        key: 'convertPalette',
        value: function () {
          for (
            var t = this.drawto.width,
              i = this.drawto.height,
              a = this.ctx.getImageData(0, 0, t, i),
              e = 0;
            e < a.height;
            e++
          )
            for (var h = 0; h < a.width; h++) {
              var r = 4 * e * a.width + 4 * h,
                s = this.similarColor([a.data[r], a.data[r + 1], a.data[r + 2]])
              ;(a.data[r] = s[0]),
                (a.data[r + 1] = s[1]),
                (a.data[r + 2] = s[2])
            }
          return this.ctx.putImageData(a, 0, 0, 0, 0, a.width, a.height), this
        },
      },
      {
        key: 'resizeImage',
        value: function () {
          var t = document.createElement('canvas'),
            i = t.getContext('2d'),
            a = 1
          return this.maxWidth || this.maxHeight
            ? (this.maxWidth &&
                this.drawto.width > this.maxWidth &&
                (a = this.maxWidth / this.drawto.width),
              this.maxHeight &&
                this.drawto.height > this.maxHeight &&
                (a = this.maxHeight / this.drawto.height),
              (t.width = this.drawto.width),
              (t.height = this.drawto.height),
              i.drawImage(this.drawto, 0, 0),
              (this.drawto.width = this.drawto.width * a),
              (this.drawto.height = this.drawto.height * a),
              this.ctx.drawImage(
                t,
                0,
                0,
                t.width,
                t.height,
                0,
                0,
                this.drawto.width,
                this.drawto.height
              ),
              this)
            : 0
        },
      },
      {
        key: 'draw',
        value: function () {
          return (
            (this.drawto.width = this.drawfrom.width),
            (this.drawto.height = this.drawfrom.height),
            this.ctx.drawImage(this.drawfrom, 0, 0),
            this.resizeImage(),
            this
          )
        },
      },
      {
        key: 'saveImage',
        value: function () {
          var t = document.createElement('a')
          ;(t.download = 'safeimagekit-pixel-art.png'),
            (t.href = this.drawto
              .toDataURL('image/png')
              .replace('image/png', 'image/octet-stream')),
            document.querySelector('body').appendChild(t),
            t.click(),
            document.querySelector('body').removeChild(t)
          if (lang === 'en') {
            window.location.href = `/download?tool=${pageTool}`
          } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`
          }
        },
      },
    ]),
    t
  )
})()
;