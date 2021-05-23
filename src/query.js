/* global HTMLElement */

class QueryElement {
  constructor (selector) {
    if (selector === document) { return (eventHandler) => { window.addEventListener('DOMContentLoaded', eventHandler) } }
    if (selector instanceof HTMLElement) { this.selected = [selector] } else { try { this.selected = document.querySelectorAll(selector) } catch { return null } }
  }

  on (event, callback) {
    for (const element of this.selected) {
      element.addEventListener(event, callback)
    }
  }

  outer (html = null) {
    if (html !== null) {
      for (const element of this.selected) {
        element.outerHTML = html
      }
    }
    return (this.selected[0] || { outerHTML: null }).outerHTML
  }

  inner (html = null) {
    if (html !== null) {
      for (const element of this.selected) {
        element.innerHTML = html
      }
    }
    return (this.selected[0] || { innerHTML: null }).innerHTML
  }

  text (txt = null) {
    if (txt !== null) {
      for (const element of this.selected) {
        element.innerText = txt
      }
    }
    return (this.selected[0] || { innerText: null }).innerText
  }

  any (key, value) {
    const keys = key.split('.')
    if (keys.length === 0) return false
    if (keys.length === 1) this.each((elem) => { elem.selected[0][keys[0]] = value })
    if (keys.length === 2) this.each((elem) => { elem.selected[0][keys[0]][keys[1]] = value })
    if (keys.length === 3) this.each((elem) => { elem.selected[0][keys[0]][keys[1]][keys[2]] = value })
    if (keys.length === 4) this.each((elem) => { elem.selected[0][keys[0]][keys[1]][keys[2]][keys[3]] = value })
    if (keys.length === 5) this.each((elem) => { elem.selected[0][keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value })
  }

  each (cb) {
    for (const element of this.selected) {
      cb(new QueryElement(element))
    }
  }

  removeClass (DOMclass) {
    for (var element of this.selected) {
      element.classList.remove(DOMclass)
    }
  }

  addClass (DOMclass) {
    for (var element of this.selected) {
      element.classList.add(DOMclass)
    }
  }

  toggleClass (DOMclass) {
    for (var element of this.selected) {
      element.classList.toggle(DOMclass)
    }
  }

  get (index) {
    return new QueryElement(this.selected[index])
  }

  hasClass (DOMclass) {
    let hasTheClass = false
    for (const element of this.selected) {
      for (const _class of element.classList) {
        if (_class === DOMclass) hasTheClass = true
      }
    }
    return hasTheClass
  }

  // Toggle visibility:
  hide () {
    for (const element of this.selected) {
      element.style.visibility = 'hidden'
    }
  }

  show () {
    for (const element of this.selected) {
      element.style.visibility = 'visible'
    }
  }

  toggleVisibility () {
    const vis = this.selected[0].style.visibility === 'visible'
    for (const element of this.selected) {
      if (vis) { element.style.visibility = 'hidden' } else { element.style.visibility = 'visible' }
    }
  }

  isVisible () {
    return !(this.selected[0].style.visibility === 'hidden')
  }

  // Display
  nodisplay () {
    for (const element of this.selected) {
      element.style.display = 'none'
    }
  }

  display (mode = 'block') {
    for (const element of this.selected) {
      element.style.display = mode
    }
  }

  toggleDisplay (mode = 'block') {
    const vis = this.selected[0].style.display !== 'none'
    for (const element of this.selected) {
      if (vis) { element.style.display = 'none' } else { element.style.display = mode }
    }
  }

  isDisplayed () {
    return !(this.selected[0].style.display === 'none')
  }

  // Remove Element:
  delete () {
    for (const element of this.selected) {
      element.outerHTML = ''
    }
  }

  // Blur:
  blur (radius) {
    if (typeof radius === 'number') {
      for (const element of this.selected) {
        element.style.filter = `blur(${radius}px)`
      }
    } else {
      for (const element of this.selected) {
        element.style.filter = `blur(${radius})`
      }
    }
  }

  unblur () {
    for (const element of this.selected) {
      element.style.filter = null
    }
  }

  append (something) {
    for (const element of this.selected) {
      element.append(something)
    }
  }
}

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
  trim: (text, maxChars = 300, suffix = ' [...]') => {
    // Trim Whitespace:
    text = text.trim()
    // If text is too long
    if ((text.length + suffix.length) >= (maxChars)) {
      // Trim text:

      let final = ''
      let i = 0
      for (const char of text) {
        if ((i + suffix.length) < (maxChars)) {
          final += char
        }
        i++
      }

      return final + suffix
    }

    return text
  },
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
  isElectron: function isELectron () { try { return !!((((process || { versions: undefined }).versions || { electron: false }).electron) || false) || navigator.userAgent.includes('Electron') } catch { return false } },
  loadStyle: function loadCSSStyles (css) {
    document.head.innerHTML += '<style type="text/css">' + css + '</style>'
  },
  makeDraggable: function createADraggableDiv (element, dragZone, ondrag = function () {}, ondragstart = function () {}, ondragclose = function () {}, options) {
    element = document.querySelector(element)
    dragZone = document.querySelector(dragZone)
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
    blink: null,
    electron: null
  }, */
  sel: function selectDOMElement (selector) {
    return new QueryElement(selector)
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
query.browsers.electron = query.isElectron()

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
if (query.browsers.electron) {
  query.browser = 'electron'
} else if (query.browsers.safari) {
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

const execute = (obj = { in: 0, repeat: 1, conditions: [true] }, func) => {
  setTimeout(() => {
    for (var i = 0; i < ((obj.repeat) || 1); i++) {
      let isTrue = true;
      (obj.conditions || [true]).forEach((condition) => {
        if (!condition) isTrue = false
      })

      if (isTrue) {
        (func || (() => { console.log('Test passed') }))()
      }
    }
  }, (obj.in || 0))
}

const catchlib = (func) => {
  try { func() } catch { return false }
  return true
}

window.query = query
window.queryjs = query
window.execute = execute
window.catchlib = catchlib
