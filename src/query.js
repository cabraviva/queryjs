// Times:
var queryTimes = {
  milisecond: 1
}

queryTimes.second = queryTimes.milisecond * 1000
queryTimes.minute = queryTimes.second * 60
queryTimes.hour = queryTimes.minute * 60
queryTimes.day = queryTimes.hour * 24
queryTimes.month = queryTimes.day * 31
queryTimes.year = queryTimes.day * 365
queryTimes.ms = queryTimes.milisecond

// Create query object:
var query = {
  queryFile: document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].src,
  Promise: window.Promise,
  time: {
    // Times:
    milisecond: queryTimes.ms,
    second: queryTimes.second,
    minute: queryTimes.minute,
    month: queryTimes.month,
    hour: queryTimes.hour,
    day: queryTimes.day,
    year: queryTimes.year,
    s: queryTimes.second,
    m: queryTimes.minute,
    h: queryTimes.hour,
    d: queryTimes.day,
    y: queryTimes.year,
    // Functions:
    ms: function (count) {
      return query.time.milisecond * count
    },
    miliseconds: function (count) {
      return query.time.milisecond * count
    },
    seconds: function (count) {
      return query.time.second * count
    },
    minutes: function (count) {
      return query.time.minutes * count
    },
    months: function (count) {
      return query.time.month * count
    },
    hours: function (count) {
      return query.time.hour * count
    },
    days: function (count) {
      return query.time.day * count
    },
    years: function (count) {
      return query.time.year * count
    },
    sleep: function (miliseconds) {
      return new query.Promise(resolve => setTimeout(resolve, miliseconds))
    },
    wait: function (miliseconds) {
      return new query.Promise(resolve => setTimeout(resolve, miliseconds))
    }
  },
  Sound: class Sound {
    constructor (audio) {
      this.src = audio.src
      this.preload = audio.preload || 'auto'
      this.autoPlay = audio.autoPlay || false
      this.volume = audio.volume || 1
      this.onEnd = audio.onended || function () {}
      this.init()
    }

    init () {
      this.audio = new window.Audio(this.src)
      this.audio.preload = this.preload
      this.audio.volume = this.volume
      if (this.autoPlay) { this.play() }
      // Events:
      this.audio.onended = this.onEnd
    }

    time (ms) {
      if (query.exist(ms)) {
        this.audio.currentTime = ms
      } else {
        return this.audio.currentTime
      }
    }

    play () {
      this.audio.play()
      this.isPlaying = true
    }

    pause () {
      this.audio.pause()
      this.isPlaying = false
    }

    stop () {
      this.pause()
    }

    toggle () {
      if (this.audio.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }

    toggleMute () {
      this.audio.muted = !this.audio.muted
    }

    mute () {
      this.audio.muted = true
    }

    unmute () {
      this.audio.muted = false
    }
  },
  loadStyle: function loadCSSStyles (css) {
    document.head.innerHTML += '<style type="text/css">' + css + '</style>'
  },
  makeDraggable: function createADraggableDiv (element, dragZone, ondrag = function () {}, ondragstart = function () {}, ondragclose = function () {}, options) {
    const opts = options || { scroll: false }
    element.style.position = opts.scroll || false ? 'fixed' : 'absolute'
    var pos1 = 0
    var pos2 = 0
    var pos3 = 0
    var pos4 = 0
    if (dragZone) {
      // if present, the header is where you move the DIV from:
      dragZone.onmousedown = dragMouseDown
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      element.onmousedown = dragMouseDown
    }

    function dragMouseDown (e) {
      if (ondragstart() !== false) {
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }
      e = e || window.event
      e.preventDefault()
    }

    function elementDrag (e) {
      ondrag()
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      element.style.top = (element.offsetTop - pos2) + 'px'
      element.style.left = (element.offsetLeft - pos1) + 'px'
    }

    function closeDragElement () {
      ondragclose()
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  },
  cookie: {
    set: function setCookie (name, value, expires/* value in ms */) {
      if (query.exist(expires)) {
        let date = new Date()
        date = new Date(date.getTime() + expires)
        const del = 'expires=' + date.toGMTString()
        date.setTime(date.getTime() + (del))
        document.cookie = name + '=' + value + '' + del
      } else {
        document.cookie = name + '=' + value + ''
      }
    },
    delete: function (name) {
      document.cookie = name + '= expires=Thu, 01-Jan-70 00:00:01 GMT'
    },
    get: function getCookie (ckiName) {
      const ckiVal = document.cookie.match('(^|)\\s*' + ckiName + '\\s*=\\s*([^]+)')
      return decodeURIComponent(ckiVal ? ckiVal.pop() : null)
    }
  },
  storage: {
    local: {
      get: function get (name, json) {
        if (query.exist(json)) { return JSON.parse(window.localStorage.getItem(name)) } else { return window.localStorage.getItem(name) }
      },
      set: function set (name, value) {
        return window.localStorage.setItem(name, value)
      },
      delete: function remove (name) {
        window.localStorage.removeItem(name)
      },
      clear: function clear () {
        window.localStorage.clear()
      }
    },
    session: {
      get: function get (name, json) {
        if (query.exist(json)) { return JSON.parse(window.localStorage.getItem(name)) } else { return window.localStorage.getItem(name) }
      },
      set: function set (name, value) {
        return window.localStorage.setItem(name, value)
      },
      delete: function remove (name) {
        window.sessionStorage.removeItem(name)
      },
      clear: function clear () {
        window.sessionStorage.clear()
      }
    }
  },
  locator: {
    getPos: function (thenDo) {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(thenDo)
      } else { console.error('[' + query.queryFile + '] Geolocation is not supported!'); return { type: 'error', err: 'Geolocation is not supported' } }
    }
  },
  goTo: function (page) {
    window.location.href = page
  },
  page: {
    navigate: function (page) {
      window.location.href = page
    },
    darkMode: function () {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    close: function () {
      return window.close()
    },
    reload: function () {
      window.location = window.location.href
    },
    history: {
      back: function (count) {
        if (query.exist(count)) {
          window.history.back(count)
        } else { window.history.back() }
      },
      forward: function (count) {
        if (query.exist(count)) {
          window.history.forward(count)
        } else { window.history.forward() }
      }
    }
  },
  Math: {

    add: function (addend, summand) {
      if (!query.exist(summand)) {
        return addend + 1
      } else {
        return addend + summand
      }
    },
    subtract: function (one, two) {
      if (!query.exist(two)) {
        return one - 1
      } else {
        return one - two
      }
    },
    multiplicate: function (one, two) {
      return one * two
    },
    modulo: function (one, two) {
      return one % two
    },
    divide: function (one, two) {
      return one / two
    },
    diff: function (one, two) {
      if (one > two) {
        return one - two
      } else {
        return two - one
      }
    },
    PI: 3.141592653589793
  },
  clearDOM: function () {
    document.querySelector('html').innerHTML = ''
  },
  exist: function (what) {
    if (what === null || what === undefined) { return false } else { return true }
  },
  conncetion: function () { return navigator.onLine },
  connceted: function () { return navigator.onLine },
  /* system: '', */
  lang: navigator.language,
  browsers: {},
  /* browser: '',
  browsers: {
    safari: null,
    chromium: null,
    chrome: null,
    webkit: null,
    ms: null,
    edge: null,
    ie: null,
    ie11: null,
    ieLower: null,
    opera: null,
    firefox: null,
    brave: null,
    blink: null
  }, */
  sel: function selectDOMElement (selector) {
    if (selector === document) {
      return function onReady (thenDo) { window.addEventListener('DOMContentLoaded', thenDo) }
    }
    var selected = document.querySelectorAll(selector)

    if (selected.length > 1) {
      selected.any = function (key, value) {
        const keys = key.split('.')
        if (keys.length === 1) {
          for (const element of this) {
            element[keys[0]] = value
          }
        } else if (keys.length === 2) {
          for (const element of this) {
            element[keys[0]][keys[1]] = value
          }
        } else if (keys.length === 3) {
          for (const element of this) {
            element[keys[0]][keys[1]][keys[2]] = value
          }
        } else if (keys.length === 4) {
          for (const element of this) {
            element[keys[0]][keys[1]][keys[2]][keys[3]] = value
          }
        }

        return true
      }

      selected.on = function addEventListener (e, t) {
        for (var element of this) {
          element.addEventListener(e, t)
        }
      }

      selected.removeClass = function (DOMclass) {
        for (var element of this) {
          element.classList.remove(DOMclass)
        }
      }

      selected.addClass = function (DOMclass) {
        for (var element of this) {
          element.classList.add(DOMclass)
        }
      }

      selected.toggleClass = function (DOMclass) {
        for (var element of this) {
          element.classList.toggle(DOMclass)
        }
      }

      // Toggle visibility:
      selected.hide = function () {
        for (const element of this) {
          element.style.visibility = 'hidden'
        }
      }

      selected.show = function () {
        for (const element of this) {
          element.style.visibility = 'visible'
        }
      }

      selected.toggleVisibility = function () {
        const vis = this[0].style.visibility === 'visible'
        for (const element of this) {
          if (vis) { element.style.visibility = 'hidden' } else { element.style.visibility = 'visible' }
        }
      }

      // Remove Element:
      selected.delete = function () {
        for (const element of this) {
          element.outerHTML = ''
        }
      }

      // Blur:
      selected.blur = function (radius) {
        if (typeof radius === 'number') {
          for (const element of this) {
            element.style.filter = `blur(${radius}px)`
          }
        } else {
          for (const element of this) {
            element.style.filter = `blur(${radius})`
          }
        }
      }

      selected.unblur = function () {
        for (const element of this) {
          element.style.filter = null
        }
      }

      // inner:
      selected.inner = function (html) {
        if (!query.exist(html)) {
          return this[0].innerHTML
        }
        for (const element of this) {
          element.innerHTML = html
        }
      }

      // outer:
      selected.outer = function (html) {
        if (!query.exist(html)) {
          return this[0].outerHTML
        }
        for (const element of this) {
          element.outerHTML = html
        }
      }

      // SET THE SELECTOR:
      selected.selector = selector

      return selected
    } else {
      var s = selected[0]

      s.on = function (e, t) {
        this.addEventListener(e, t)
      }

      s.removeClass = function (DOMclass) {
        this.classList.remove(DOMclass)
      }

      s.addClass = function (DOMclass) {
        this.classList.add(DOMclass)
      }

      s.toggleClass = function (DOMclass) {
        this.classList.toggle(DOMclass)
      }

      // Toggle visibility:
      s.hide = function () {
        this.style.visibility = 'hidden'
      }

      s.show = function () {
        this.style.visibility = 'visible'
      }

      s.toggleVisibility = function () {
        const vis = this[0].style.visibility === 'visible'
        if (vis) { this.style.visibility = 'hidden' } else { this.style.visibility = 'visible' }
      }

      // Remove Element:
      s.delete = function () {
        this.outerHTML = ''
      }

      // Blur:
      s.blur = function (radius) {
        if (typeof radius === 'number') {
          this.style.filter = `blur(${radius}px)`
        } else {
          this.style.filter = `blur(${radius})`
        }
      }

      selected.unblur = function () {
        this.style.filter = null
      }

      //  inner:
      selected.inner = function (html) {
        this.innerHTML = html
      }

      // outer:
      selected.outer = function (html) {
        this.outerHTML = html
      }

      s.selector = selector

      return s
    }
  }
}

// Initialize query:

// Set the browser:
query.browsers.chromium = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
query.browsers.edge = /Edg/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
query.browsers.opera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
query.browsers.firefox = typeof InstallTrigger !== 'undefined'
query.browsers.blink = (query.browsers.chromium || query.browsers.opera) && !!window.CSS
query.browsers.brave = query.exist(navigator.brave)

// It is ie10 or lower?
query.browsers.ieLower = (navigator.appName === 'Microsoft Internet Explorer')

// It is ie?
if (navigator.appName === 'Microsoft Internet Explorer') {
  query.browsers.ie = true
} else {
  query.browsers.ie = false
}

if (/rv:11.0/i.test(navigator.userAgent)/* && !navigator.appVersion.indexOf('Trident') === -1 */) {
  // Ie11!
  query.browsers.ie = true
  query.browsers.ie11 = true
  query.browsers.ieLower = false
}

query.browsers.safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

// Chromium based browsers
if (!query.browsers.edge && !query.browsers.brave && !query.browsers.opera) {
  query.browsers.chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
} else {
  // Chromium based browser (!!!No Chrome):
  query.browsers.chrome = false
}

// It is a ms browser?
if (query.browsers.edge || query.browsers.ie) {
  // It's a Microsoft browser:
  query.browsers.ms = true
} else {
  query.browsers.ms = false
}

// Not ie?
if (!query.browsers.ie) {
  query.browsers.ie11 = false
  query.browsers.ieLower = false
}

// It is a webkit browser?
if (query.browsers.safari || query.browsers.chrome || query.browsers.chromium) {
  // Yes, it is.
  query.browsers.webkit = true
} else { /* Non webkit browser: */ query.browsers.webkit = false }

// Set the browser property to the browser:
if (query.browsers.safari) {
  query.browser = 'safari'
} else if (query.browsers.opera) {
  query.browser = 'opera'
} else if (query.browsers.brave) {
  query.browser = 'brave'
} else if (query.browsers.edge) {
  query.browser = 'edge'
} else if (query.browsers.firefox) {
  query.browser = 'firefox'
} else if (query.browsers.ie) {
  query.browser = 'internet-explorer'
} else if (query.browsers.opera) {
  query.browser = 'chromium'
} else if (query.browsers.chrome) {
  query.browser = 'chrome'
} else {
  query.browser = 'unknown'
}

// Set the System:
if (navigator.platform.toLocaleLowerCase().indexOf('win') === 0) query.system = 'Windows'
if (navigator.platform.toLocaleLowerCase().indexOf('mac') === 0) query.system = 'MacOS'

// Set the cki shortcut for cookie:
query.cki = query.cookie

// Font loader:
query.loadFont = function loadCustomFontFromSpecificURL (name, url) {
  query.loadStyle('@font-face{font-family:\'' + name + '\'font-display:swapsrc:local(' + name + '),url(' + url + ')}')
}

// Script Loader:
query.loadScript = function loadScript (js) {
  document.head.innerHTML += `<script type="text/javascript">${js}</script>`
}

// External Script Loader:
query.loadExternalScript = function loadExternalScript (src) {
  document.head.innerHTML += `<script type="text/javascript" src="${src}"></script>`
}

// Refresh:
query.page.refresh = query.page.reload

// Background Services:
setInterval(function () { query.page.focus = document.hasFocus() }, 200)

// Add query to $:
const $ = query
const $$ = query.sel

// IE Error:
if (query.browsers.ie) {
  console.warn('[' + query.queryFile + '] query doesn\'t completly support Internet Explorer!')
}
// set Query to window:
if (!window.$) {
  window.$ = $
  window.$$ = $$
}
window.query = query
window.queryjs = query
