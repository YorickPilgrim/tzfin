;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(s) {
    const o = {}
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    )
  }
  function r(s) {
    if (s.ep) return
    s.ep = !0
    const o = n(s)
    fetch(s.href, o)
  }
})()
function Lr(e, t) {
  const n = Object.create(null),
    r = e.split(",")
  for (let s = 0; s < r.length; s++) n[r[s]] = !0
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s]
}
const G = {},
  Ot = [],
  Ue = () => {},
  Gi = () => !1,
  el = /^on[^a-z]/,
  Nn = (e) => el.test(e),
  Ir = (e) => e.startsWith("onUpdate:"),
  ue = Object.assign,
  Br = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  tl = Object.prototype.hasOwnProperty,
  K = (e, t) => tl.call(e, t),
  k = Array.isArray,
  Pt = (e) => Ln(e) === "[object Map]",
  _o = (e) => Ln(e) === "[object Set]",
  D = (e) => typeof e == "function",
  oe = (e) => typeof e == "string",
  Fn = (e) => typeof e == "symbol",
  te = (e) => e !== null && typeof e == "object",
  wo = (e) => (te(e) || D(e)) && D(e.then) && D(e.catch),
  Ro = Object.prototype.toString,
  Ln = (e) => Ro.call(e),
  nl = (e) => Ln(e).slice(8, -1),
  vo = (e) => Ln(e) === "[object Object]",
  Mr = (e) =>
    oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  mn = Lr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  In = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  rl = /-(\w)/g,
  Tt = In((e) => e.replace(rl, (t, n) => (n ? n.toUpperCase() : ""))),
  sl = /\B([A-Z])/g,
  yt = In((e) => e.replace(sl, "-$1").toLowerCase()),
  xo = In((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Jn = In((e) => (e ? `on${xo(e)}` : "")),
  mt = (e, t) => !Object.is(e, t),
  gn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  xn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  fr = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let fs
const dr = () =>
  fs ||
  (fs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {})
function jr(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = oe(r) ? cl(r) : jr(r)
      if (s) for (const o in s) t[o] = s[o]
    }
    return t
  } else if (oe(e) || te(e)) return e
}
const ol = /;(?![^(]*\))/g,
  il = /:([^]+)/,
  ll = /\/\*[^]*?\*\//g
function cl(e) {
  const t = {}
  return (
    e
      .replace(ll, "")
      .split(ol)
      .forEach((n) => {
        if (n) {
          const r = n.split(il)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function kr(e) {
  let t = ""
  if (oe(e)) t = e
  else if (k(e))
    for (let n = 0; n < e.length; n++) {
      const r = kr(e[n])
      r && (t += r + " ")
    }
  else if (te(e)) for (const n in e) e[n] && (t += n + " ")
  return t.trim()
}
const ul =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  al = Lr(ul)
function Ao(e) {
  return !!e || e === ""
}
const ds = (e) =>
    oe(e)
      ? e
      : e == null
      ? ""
      : k(e) || (te(e) && (e.toString === Ro || !D(e.toString)))
      ? JSON.stringify(e, Oo, 2)
      : String(e),
  Oo = (e, t) =>
    t && t.__v_isRef
      ? Oo(e, t.value)
      : Pt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : _o(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : te(t) && !k(t) && !vo(t)
      ? String(t)
      : t
let xe
class Po {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = xe),
      !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = xe
      try {
        return (xe = this), t()
      } finally {
        xe = n
      }
    }
  }
  on() {
    xe = this
  }
  off() {
    xe = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop()
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function fl(e) {
  return new Po(e)
}
function dl(e, t = xe) {
  t && t.active && t.effects.push(e)
}
function hl() {
  return xe
}
const Hr = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  So = (e) => (e.w & ot) > 0,
  Co = (e) => (e.n & ot) > 0,
  pl = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ot
  },
  ml = (e) => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let r = 0; r < t.length; r++) {
        const s = t[r]
        So(s) && !Co(s) ? s.delete(e) : (t[n++] = s), (s.w &= ~ot), (s.n &= ~ot)
      }
      t.length = n
    }
  },
  hr = new WeakMap()
let Vt = 0,
  ot = 1
const pr = 30
let Oe
const dt = Symbol(""),
  mr = Symbol("")
class Ur {
  constructor(t, n = null, r) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      dl(this, r)
  }
  run() {
    if (!this.active) return this.fn()
    let t = Oe,
      n = rt
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = Oe),
        (Oe = this),
        (rt = !0),
        (ot = 1 << ++Vt),
        Vt <= pr ? pl(this) : hs(this),
        this.fn()
      )
    } finally {
      Vt <= pr && ml(this),
        (ot = 1 << --Vt),
        (Oe = this.parent),
        (rt = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    Oe === this
      ? (this.deferStop = !0)
      : this.active &&
        (hs(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function hs(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let rt = !0
const To = []
function jt() {
  To.push(rt), (rt = !1)
}
function kt() {
  const e = To.pop()
  rt = e === void 0 ? !0 : e
}
function be(e, t, n) {
  if (rt && Oe) {
    let r = hr.get(e)
    r || hr.set(e, (r = new Map()))
    let s = r.get(n)
    s || r.set(n, (s = Hr())), No(s)
  }
}
function No(e, t) {
  let n = !1
  Vt <= pr ? Co(e) || ((e.n |= ot), (n = !So(e))) : (n = !e.has(Oe)),
    n && (e.add(Oe), Oe.deps.push(e))
}
function Ve(e, t, n, r, s, o) {
  const i = hr.get(e)
  if (!i) return
  let l = []
  if (t === "clear") l = [...i.values()]
  else if (n === "length" && k(e)) {
    const c = Number(r)
    i.forEach((a, u) => {
      ;(u === "length" || (!Fn(u) && u >= c)) && l.push(a)
    })
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        k(e)
          ? Mr(n) && l.push(i.get("length"))
          : (l.push(i.get(dt)), Pt(e) && l.push(i.get(mr)))
        break
      case "delete":
        k(e) || (l.push(i.get(dt)), Pt(e) && l.push(i.get(mr)))
        break
      case "set":
        Pt(e) && l.push(i.get(dt))
        break
    }
  if (l.length === 1) l[0] && gr(l[0])
  else {
    const c = []
    for (const a of l) a && c.push(...a)
    gr(Hr(c))
  }
}
function gr(e, t) {
  const n = k(e) ? e : [...e]
  for (const r of n) r.computed && ps(r)
  for (const r of n) r.computed || ps(r)
}
function ps(e, t) {
  ;(e !== Oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const gl = Lr("__proto__,__v_isRef,__isVue"),
  Fo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Fn)
  ),
  ms = yl()
function yl() {
  const e = {}
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = W(this)
        for (let o = 0, i = this.length; o < i; o++) be(r, "get", o + "")
        const s = r[t](...n)
        return s === -1 || s === !1 ? r[t](...n.map(W)) : s
      }
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        jt()
        const r = W(this)[t].apply(this, n)
        return kt(), r
      }
    }),
    e
  )
}
function bl(e) {
  const t = W(this)
  return be(t, "has", e), t.hasOwnProperty(e)
}
class Lo {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._shallow = n)
  }
  get(t, n, r) {
    const s = this._isReadonly,
      o = this._shallow
    if (n === "__v_isReactive") return !s
    if (n === "__v_isReadonly") return s
    if (n === "__v_isShallow") return o
    if (n === "__v_raw" && r === (s ? (o ? Nl : jo) : o ? Mo : Bo).get(t))
      return t
    const i = k(t)
    if (!s) {
      if (i && K(ms, n)) return Reflect.get(ms, n, r)
      if (n === "hasOwnProperty") return bl
    }
    const l = Reflect.get(t, n, r)
    return (Fn(n) ? Fo.has(n) : gl(n)) || (s || be(t, "get", n), o)
      ? l
      : he(l)
      ? i && Mr(n)
        ? l
        : l.value
      : te(l)
      ? s
        ? Ho(l)
        : Mn(l)
      : l
  }
}
class Io extends Lo {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, s) {
    let o = t[n]
    if (Nt(o) && he(o) && !he(r)) return !1
    if (
      !this._shallow &&
      (!An(r) && !Nt(r) && ((o = W(o)), (r = W(r))), !k(t) && he(o) && !he(r))
    )
      return (o.value = r), !0
    const i = k(t) && Mr(n) ? Number(n) < t.length : K(t, n),
      l = Reflect.set(t, n, r, s)
    return (
      t === W(s) && (i ? mt(r, o) && Ve(t, "set", n, r) : Ve(t, "add", n, r)), l
    )
  }
  deleteProperty(t, n) {
    const r = K(t, n)
    t[n]
    const s = Reflect.deleteProperty(t, n)
    return s && r && Ve(t, "delete", n, void 0), s
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return (!Fn(n) || !Fo.has(n)) && be(t, "has", n), r
  }
  ownKeys(t) {
    return be(t, "iterate", k(t) ? "length" : dt), Reflect.ownKeys(t)
  }
}
class El extends Lo {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const _l = new Io(),
  wl = new El(),
  Rl = new Io(!0),
  Dr = (e) => e,
  Bn = (e) => Reflect.getPrototypeOf(e)
function un(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const s = W(e),
    o = W(t)
  n || (mt(t, o) && be(s, "get", t), be(s, "get", o))
  const { has: i } = Bn(s),
    l = r ? Dr : n ? Wr : Qt
  if (i.call(s, t)) return l(e.get(t))
  if (i.call(s, o)) return l(e.get(o))
  e !== s && e.get(t)
}
function an(e, t = !1) {
  const n = this.__v_raw,
    r = W(n),
    s = W(e)
  return (
    t || (mt(e, s) && be(r, "has", e), be(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  )
}
function fn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && be(W(e), "iterate", dt), Reflect.get(e, "size", e)
  )
}
function gs(e) {
  e = W(e)
  const t = W(this)
  return Bn(t).has.call(t, e) || (t.add(e), Ve(t, "add", e, e)), this
}
function ys(e, t) {
  t = W(t)
  const n = W(this),
    { has: r, get: s } = Bn(n)
  let o = r.call(n, e)
  o || ((e = W(e)), (o = r.call(n, e)))
  const i = s.call(n, e)
  return (
    n.set(e, t), o ? mt(t, i) && Ve(n, "set", e, t) : Ve(n, "add", e, t), this
  )
}
function bs(e) {
  const t = W(this),
    { has: n, get: r } = Bn(t)
  let s = n.call(t, e)
  s || ((e = W(e)), (s = n.call(t, e))), r && r.call(t, e)
  const o = t.delete(e)
  return s && Ve(t, "delete", e, void 0), o
}
function Es() {
  const e = W(this),
    t = e.size !== 0,
    n = e.clear()
  return t && Ve(e, "clear", void 0, void 0), n
}
function dn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = W(i),
      c = t ? Dr : e ? Wr : Qt
    return (
      !e && be(l, "iterate", dt), i.forEach((a, u) => r.call(s, c(a), c(u), o))
    )
  }
}
function hn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = W(s),
      i = Pt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = s[e](...r),
      u = n ? Dr : t ? Wr : Qt
    return (
      !t && be(o, "iterate", c ? mr : dt),
      {
        next() {
          const { value: d, done: p } = a.next()
          return p
            ? { value: d, done: p }
            : { value: l ? [u(d[0]), u(d[1])] : u(d), done: p }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function Qe(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}
function vl() {
  const e = {
      get(o) {
        return un(this, o)
      },
      get size() {
        return fn(this)
      },
      has: an,
      add: gs,
      set: ys,
      delete: bs,
      clear: Es,
      forEach: dn(!1, !1),
    },
    t = {
      get(o) {
        return un(this, o, !1, !0)
      },
      get size() {
        return fn(this)
      },
      has: an,
      add: gs,
      set: ys,
      delete: bs,
      clear: Es,
      forEach: dn(!1, !0),
    },
    n = {
      get(o) {
        return un(this, o, !0)
      },
      get size() {
        return fn(this, !0)
      },
      has(o) {
        return an.call(this, o, !0)
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: dn(!0, !1),
    },
    r = {
      get(o) {
        return un(this, o, !0, !0)
      },
      get size() {
        return fn(this, !0)
      },
      has(o) {
        return an.call(this, o, !0)
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: dn(!0, !0),
    }
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      ;(e[o] = hn(o, !1, !1)),
        (n[o] = hn(o, !0, !1)),
        (t[o] = hn(o, !1, !0)),
        (r[o] = hn(o, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [xl, Al, Ol, Pl] = vl()
function zr(e, t) {
  const n = t ? (e ? Pl : Ol) : e ? Al : xl
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(K(n, s) && s in r ? n : r, s, o)
}
const Sl = { get: zr(!1, !1) },
  Cl = { get: zr(!1, !0) },
  Tl = { get: zr(!0, !1) },
  Bo = new WeakMap(),
  Mo = new WeakMap(),
  jo = new WeakMap(),
  Nl = new WeakMap()
function Fl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2
    default:
      return 0
  }
}
function Ll(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fl(nl(e))
}
function Mn(e) {
  return Nt(e) ? e : qr(e, !1, _l, Sl, Bo)
}
function ko(e) {
  return qr(e, !1, Rl, Cl, Mo)
}
function Ho(e) {
  return qr(e, !0, wl, Tl, jo)
}
function qr(e, t, n, r, s) {
  if (!te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const o = s.get(e)
  if (o) return o
  const i = Ll(e)
  if (i === 0) return e
  const l = new Proxy(e, i === 2 ? r : n)
  return s.set(e, l), l
}
function St(e) {
  return Nt(e) ? St(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Nt(e) {
  return !!(e && e.__v_isReadonly)
}
function An(e) {
  return !!(e && e.__v_isShallow)
}
function Uo(e) {
  return St(e) || Nt(e)
}
function W(e) {
  const t = e && e.__v_raw
  return t ? W(t) : e
}
function Kr(e) {
  return xn(e, "__v_skip", !0), e
}
const Qt = (e) => (te(e) ? Mn(e) : e),
  Wr = (e) => (te(e) ? Ho(e) : e)
function Do(e) {
  rt && Oe && ((e = W(e)), No(e.dep || (e.dep = Hr())))
}
function zo(e, t) {
  e = W(e)
  const n = e.dep
  n && gr(n)
}
function he(e) {
  return !!(e && e.__v_isRef === !0)
}
function Ae(e) {
  return qo(e, !1)
}
function Il(e) {
  return qo(e, !0)
}
function qo(e, t) {
  return he(e) ? e : new Bl(e, t)
}
class Bl {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : W(t)),
      (this._value = n ? t : Qt(t))
  }
  get value() {
    return Do(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || An(t) || Nt(t)
    ;(t = n ? t : W(t)),
      mt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Qt(t)), zo(this))
  }
}
function ht(e) {
  return he(e) ? e.value : e
}
const Ml = {
  get: (e, t, n) => ht(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t]
    return he(s) && !he(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r)
  },
}
function Ko(e) {
  return St(e) ? e : new Proxy(e, Ml)
}
class jl {
  constructor(t, n, r, s) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ur(t, () => {
        this._dirty || ((this._dirty = !0), zo(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = W(this)
    return (
      Do(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
function kl(e, t, n = !1) {
  let r, s
  const o = D(e)
  return (
    o ? ((r = e), (s = Ue)) : ((r = e.get), (s = e.set)),
    new jl(r, s, o || !s, n)
  )
}
function st(e, t, n, r) {
  let s
  try {
    s = r ? e(...r) : e()
  } catch (o) {
    jn(o, t, n)
  }
  return s
}
function Te(e, t, n, r) {
  if (D(e)) {
    const o = st(e, t, n, r)
    return (
      o &&
        wo(o) &&
        o.catch((i) => {
          jn(i, t, n)
        }),
      o
    )
  }
  const s = []
  for (let o = 0; o < e.length; o++) s.push(Te(e[o], t, n, r))
  return s
}
function jn(e, t, n, r = !0) {
  const s = t ? t.vnode : null
  if (t) {
    let o = t.parent
    const i = t.proxy,
      l = n
    for (; o; ) {
      const a = o.ec
      if (a) {
        for (let u = 0; u < a.length; u++) if (a[u](e, i, l) === !1) return
      }
      o = o.parent
    }
    const c = t.appContext.config.errorHandler
    if (c) {
      st(c, null, 10, [e, i, l])
      return
    }
  }
  Hl(e, n, s, r)
}
function Hl(e, t, n, r = !0) {
  console.error(e)
}
let Gt = !1,
  yr = !1
const fe = []
let ke = 0
const Ct = []
let We = null,
  ut = 0
const Wo = Promise.resolve()
let Vr = null
function Vo(e) {
  const t = Vr || Wo
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Ul(e) {
  let t = ke + 1,
    n = fe.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = fe[r],
      o = en(s)
    o < e || (o === e && s.pre) ? (t = r + 1) : (n = r)
  }
  return t
}
function Yr(e) {
  ;(!fe.length || !fe.includes(e, Gt && e.allowRecurse ? ke + 1 : ke)) &&
    (e.id == null ? fe.push(e) : fe.splice(Ul(e.id), 0, e), Yo())
}
function Yo() {
  !Gt && !yr && ((yr = !0), (Vr = Wo.then(Xo)))
}
function Dl(e) {
  const t = fe.indexOf(e)
  t > ke && fe.splice(t, 1)
}
function zl(e) {
  k(e)
    ? Ct.push(...e)
    : (!We || !We.includes(e, e.allowRecurse ? ut + 1 : ut)) && Ct.push(e),
    Yo()
}
function _s(e, t = Gt ? ke + 1 : 0) {
  for (; t < fe.length; t++) {
    const n = fe[t]
    n && n.pre && (fe.splice(t, 1), t--, n())
  }
}
function $o(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)]
    if (((Ct.length = 0), We)) {
      We.push(...t)
      return
    }
    for (We = t, We.sort((n, r) => en(n) - en(r)), ut = 0; ut < We.length; ut++)
      We[ut]()
    ;(We = null), (ut = 0)
  }
}
const en = (e) => (e.id == null ? 1 / 0 : e.id),
  ql = (e, t) => {
    const n = en(e) - en(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Xo(e) {
  ;(yr = !1), (Gt = !0), fe.sort(ql)
  try {
    for (ke = 0; ke < fe.length; ke++) {
      const t = fe[ke]
      t && t.active !== !1 && st(t, null, 14)
    }
  } finally {
    ;(ke = 0),
      (fe.length = 0),
      $o(),
      (Gt = !1),
      (Vr = null),
      (fe.length || Ct.length) && Xo()
  }
}
function Kl(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || G
  let s = n
  const o = t.startsWith("update:"),
    i = o && t.slice(7)
  if (i && i in r) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: d, trim: p } = r[u] || G
    p && (s = n.map((b) => (oe(b) ? b.trim() : b))), d && (s = n.map(fr))
  }
  let l,
    c = r[(l = Jn(t))] || r[(l = Jn(Tt(t)))]
  !c && o && (c = r[(l = Jn(yt(t)))]), c && Te(c, e, 6, s)
  const a = r[l + "Once"]
  if (a) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), Te(a, e, 6, s)
  }
}
function Jo(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e)
  if (s !== void 0) return s
  const o = e.emits
  let i = {},
    l = !1
  if (!D(e)) {
    const c = (a) => {
      const u = Jo(a, t, !0)
      u && ((l = !0), ue(i, u))
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  return !o && !l
    ? (te(e) && r.set(e, null), null)
    : (k(o) ? o.forEach((c) => (i[c] = null)) : ue(i, o),
      te(e) && r.set(e, i),
      i)
}
function kn(e, t) {
  return !e || !Nn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, yt(t)) || K(e, t))
}
let Se = null,
  Hn = null
function On(e) {
  const t = Se
  return (Se = e), (Hn = (e && e.type.__scopeId) || null), t
}
function Wl(e) {
  Hn = e
}
function Vl() {
  Hn = null
}
function Yl(e, t = Se, n) {
  if (!t || e._n) return e
  const r = (...s) => {
    r._d && Ts(-1)
    const o = On(t)
    let i
    try {
      i = e(...s)
    } finally {
      On(o), r._d && Ts(1)
    }
    return i
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function Zn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: a,
    render: u,
    renderCache: d,
    data: p,
    setupState: b,
    ctx: _,
    inheritAttrs: w,
  } = e
  let F, T
  const L = On(e)
  try {
    if (n.shapeFlag & 4) {
      const S = s || r
      ;(F = je(u.call(S, S, d, o, b, p, _))), (T = c)
    } else {
      const S = t
      ;(F = je(
        S.length > 1 ? S(o, { attrs: c, slots: l, emit: a }) : S(o, null)
      )),
        (T = t.props ? c : $l(c))
    }
  } catch (S) {
    ;(Xt.length = 0), jn(S, e, 1), (F = ye(gt))
  }
  let H = F
  if (T && w !== !1) {
    const S = Object.keys(T),
      { shapeFlag: ne } = H
    S.length && ne & 7 && (i && S.some(Ir) && (T = Xl(T, i)), (H = Ft(H, T)))
  }
  return (
    n.dirs && ((H = Ft(H)), (H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (H.transition = n.transition),
    (F = H),
    On(L),
    F
  )
}
const $l = (e) => {
    let t
    for (const n in e)
      (n === "class" || n === "style" || Nn(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Xl = (e, t) => {
    const n = {}
    for (const r in e) (!Ir(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function Jl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = o.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && c >= 0) {
    if (c & 1024) return !0
    if (c & 16) return r ? ws(r, i, a) : !!i
    if (c & 8) {
      const u = t.dynamicProps
      for (let d = 0; d < u.length; d++) {
        const p = u[d]
        if (i[p] !== r[p] && !kn(a, p)) return !0
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? ws(r, i, a)
        : !0
      : !!i
  return !1
}
function ws(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let s = 0; s < r.length; s++) {
    const o = r[s]
    if (t[o] !== e[o] && !kn(n, o)) return !0
  }
  return !1
}
function Zl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const Ql = Symbol.for("v-ndc"),
  Gl = (e) => e.__isSuspense
function ec(e, t) {
  t && t.pendingBranch
    ? k(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : zl(e)
}
const pn = {}
function yn(e, t, n) {
  return Zo(e, t, n)
}
function Zo(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = G
) {
  var l
  const c = hl() === ((l = de) == null ? void 0 : l.scope) ? de : null
  let a,
    u = !1,
    d = !1
  if (
    (he(e)
      ? ((a = () => e.value), (u = An(e)))
      : St(e)
      ? ((a = () => e), (r = !0))
      : k(e)
      ? ((d = !0),
        (u = e.some((S) => St(S) || An(S))),
        (a = () =>
          e.map((S) => {
            if (he(S)) return S.value
            if (St(S)) return ft(S)
            if (D(S)) return st(S, c, 2)
          })))
      : D(e)
      ? t
        ? (a = () => st(e, c, 2))
        : (a = () => {
            if (!(c && c.isUnmounted)) return p && p(), Te(e, c, 3, [b])
          })
      : (a = Ue),
    t && r)
  ) {
    const S = a
    a = () => ft(S())
  }
  let p,
    b = (S) => {
      p = L.onStop = () => {
        st(S, c, 4)
      }
    },
    _
  if (nn)
    if (
      ((b = Ue),
      t ? n && Te(t, c, 3, [a(), d ? [] : void 0, b]) : a(),
      s === "sync")
    ) {
      const S = Vc()
      _ = S.__watcherHandles || (S.__watcherHandles = [])
    } else return Ue
  let w = d ? new Array(e.length).fill(pn) : pn
  const F = () => {
    if (L.active)
      if (t) {
        const S = L.run()
        ;(r || u || (d ? S.some((ne, V) => mt(ne, w[V])) : mt(S, w))) &&
          (p && p(),
          Te(t, c, 3, [S, w === pn ? void 0 : d && w[0] === pn ? [] : w, b]),
          (w = S))
      } else L.run()
  }
  F.allowRecurse = !!t
  let T
  s === "sync"
    ? (T = F)
    : s === "post"
    ? (T = () => ge(F, c && c.suspense))
    : ((F.pre = !0), c && (F.id = c.uid), (T = () => Yr(F)))
  const L = new Ur(a, T)
  t
    ? n
      ? F()
      : (w = L.run())
    : s === "post"
    ? ge(L.run.bind(L), c && c.suspense)
    : L.run()
  const H = () => {
    L.stop(), c && c.scope && Br(c.scope.effects, L)
  }
  return _ && _.push(H), H
}
function tc(e, t, n) {
  const r = this.proxy,
    s = oe(e) ? (e.includes(".") ? Qo(r, e) : () => r[e]) : e.bind(r, r)
  let o
  D(t) ? (o = t) : ((o = t.handler), (n = t))
  const i = de
  Lt(this)
  const l = Zo(s, o.bind(r), n)
  return i ? Lt(i) : pt(), l
}
function Qo(e, t) {
  const n = t.split(".")
  return () => {
    let r = e
    for (let s = 0; s < n.length && r; s++) r = r[n[s]]
    return r
  }
}
function ft(e, t) {
  if (!te(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), he(e))) ft(e.value, t)
  else if (k(e)) for (let n = 0; n < e.length; n++) ft(e[n], t)
  else if (_o(e) || Pt(e))
    e.forEach((n) => {
      ft(n, t)
    })
  else if (vo(e)) for (const n in e) ft(e[n], t)
  return e
}
function nc(e, t) {
  const n = Se
  if (n === null) return e
  const r = qn(n) || n.proxy,
    s = e.dirs || (e.dirs = [])
  for (let o = 0; o < t.length; o++) {
    let [i, l, c, a = G] = t[o]
    i &&
      (D(i) && (i = { mounted: i, updated: i }),
      i.deep && ft(l),
      s.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: a,
      }))
  }
  return e
}
function lt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs
  for (let i = 0; i < s.length; i++) {
    const l = s[i]
    o && (l.oldValue = o[i].value)
    let c = l.dir[r]
    c && (jt(), Te(c, n, 8, [e.el, l, e, t]), kt())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function Go(e, t) {
  return D(e) ? ue({ name: e.name }, t, { setup: e }) : e
}
const bn = (e) => !!e.type.__asyncLoader,
  ei = (e) => e.type.__isKeepAlive
function rc(e, t) {
  ti(e, "a", t)
}
function sc(e, t) {
  ti(e, "da", t)
}
function ti(e, t, n = de) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n
      for (; s; ) {
        if (s.isDeactivated) return
        s = s.parent
      }
      return e()
    })
  if ((Un(t, r, n), n)) {
    let s = n.parent
    for (; s && s.parent; ) ei(s.parent.vnode) && oc(r, t, n, s), (s = s.parent)
  }
}
function oc(e, t, n, r) {
  const s = Un(t, e, r, !0)
  si(() => {
    Br(r[t], s)
  }, n)
}
function Un(e, t, n = de, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return
          jt(), Lt(n)
          const l = Te(t, n, e, i)
          return pt(), kt(), l
        })
    return r ? s.unshift(o) : s.push(o), o
  }
}
const Xe =
    (e) =>
    (t, n = de) =>
      (!nn || e === "sp") && Un(e, (...r) => t(...r), n),
  ic = Xe("bm"),
  ni = Xe("m"),
  lc = Xe("bu"),
  cc = Xe("u"),
  ri = Xe("bum"),
  si = Xe("um"),
  uc = Xe("sp"),
  ac = Xe("rtg"),
  fc = Xe("rtc")
function dc(e, t = de) {
  Un("ec", e, t)
}
function Qn(e, t, n, r) {
  let s
  const o = n && n[r]
  if (k(e) || oe(e)) {
    s = new Array(e.length)
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, o && o[i])
  } else if (typeof e == "number") {
    s = new Array(e)
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
  } else if (te(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]))
    else {
      const i = Object.keys(e)
      s = new Array(i.length)
      for (let l = 0, c = i.length; l < c; l++) {
        const a = i[l]
        s[l] = t(e[a], a, l, o && o[l])
      }
    }
  else s = []
  return n && (n[r] = s), s
}
const br = (e) => (e ? (mi(e) ? qn(e) || e.proxy : br(e.parent)) : null),
  $t = ue(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => br(e.parent),
    $root: (e) => br(e.root),
    $emit: (e) => e.emit,
    $options: (e) => $r(e),
    $forceUpdate: (e) => e.f || (e.f = () => Yr(e.update)),
    $nextTick: (e) => e.n || (e.n = Vo.bind(e.proxy)),
    $watch: (e) => tc.bind(e),
  }),
  Gn = (e, t) => e !== G && !e.__isScriptSetup && K(e, t),
  hc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e
      let a
      if (t[0] !== "$") {
        const b = i[t]
        if (b !== void 0)
          switch (b) {
            case 1:
              return r[t]
            case 2:
              return s[t]
            case 4:
              return n[t]
            case 3:
              return o[t]
          }
        else {
          if (Gn(r, t)) return (i[t] = 1), r[t]
          if (s !== G && K(s, t)) return (i[t] = 2), s[t]
          if ((a = e.propsOptions[0]) && K(a, t)) return (i[t] = 3), o[t]
          if (n !== G && K(n, t)) return (i[t] = 4), n[t]
          Er && (i[t] = 0)
        }
      }
      const u = $t[t]
      let d, p
      if (u) return t === "$attrs" && be(e, "get", t), u(e)
      if ((d = l.__cssModules) && (d = d[t])) return d
      if (n !== G && K(n, t)) return (i[t] = 4), n[t]
      if (((p = c.config.globalProperties), K(p, t))) return p[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e
      return Gn(s, t)
        ? ((s[t] = n), !0)
        : r !== G && K(r, t)
        ? ((r[t] = n), !0)
        : K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let l
      return (
        !!n[i] ||
        (e !== G && K(e, i)) ||
        Gn(t, i) ||
        ((l = o[0]) && K(l, i)) ||
        K(r, i) ||
        K($t, i) ||
        K(s.config.globalProperties, i)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function Rs(e) {
  return k(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let Er = !0
function pc(e) {
  const t = $r(e),
    n = e.proxy,
    r = e.ctx
  ;(Er = !1), t.beforeCreate && vs(t.beforeCreate, e, "bc")
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: u,
    beforeMount: d,
    mounted: p,
    beforeUpdate: b,
    updated: _,
    activated: w,
    deactivated: F,
    beforeDestroy: T,
    beforeUnmount: L,
    destroyed: H,
    unmounted: S,
    render: ne,
    renderTracked: V,
    renderTriggered: we,
    errorCaptured: ze,
    serverPrefetch: bt,
    expose: Fe,
    inheritAttrs: Je,
    components: it,
    directives: Le,
    filters: Ut,
  } = t
  if ((a && mc(a, r, null), i))
    for (const Z in i) {
      const Y = i[Z]
      D(Y) && (r[Z] = Y.bind(n))
    }
  if (s) {
    const Z = s.call(n, n)
    te(Z) && (e.data = Mn(Z))
  }
  if (((Er = !0), o))
    for (const Z in o) {
      const Y = o[Z],
        qe = D(Y) ? Y.bind(n, n) : D(Y.get) ? Y.get.bind(n, n) : Ue,
        Ze = !D(Y) && D(Y.set) ? Y.set.bind(n) : Ue,
        Ie = Pe({ get: qe, set: Ze })
      Object.defineProperty(r, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => Ie.value,
        set: (me) => (Ie.value = me),
      })
    }
  if (l) for (const Z in l) oi(l[Z], r, n, Z)
  if (c) {
    const Z = D(c) ? c.call(n) : c
    Reflect.ownKeys(Z).forEach((Y) => {
      En(Y, Z[Y])
    })
  }
  u && vs(u, e, "c")
  function ie(Z, Y) {
    k(Y) ? Y.forEach((qe) => Z(qe.bind(n))) : Y && Z(Y.bind(n))
  }
  if (
    (ie(ic, d),
    ie(ni, p),
    ie(lc, b),
    ie(cc, _),
    ie(rc, w),
    ie(sc, F),
    ie(dc, ze),
    ie(fc, V),
    ie(ac, we),
    ie(ri, L),
    ie(si, S),
    ie(uc, bt),
    k(Fe))
  )
    if (Fe.length) {
      const Z = e.exposed || (e.exposed = {})
      Fe.forEach((Y) => {
        Object.defineProperty(Z, Y, {
          get: () => n[Y],
          set: (qe) => (n[Y] = qe),
        })
      })
    } else e.exposed || (e.exposed = {})
  ne && e.render === Ue && (e.render = ne),
    Je != null && (e.inheritAttrs = Je),
    it && (e.components = it),
    Le && (e.directives = Le)
}
function mc(e, t, n = Ue) {
  k(e) && (e = _r(e))
  for (const r in e) {
    const s = e[r]
    let o
    te(s)
      ? "default" in s
        ? (o = Ye(s.from || r, s.default, !0))
        : (o = Ye(s.from || r))
      : (o = Ye(s)),
      he(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o)
  }
}
function vs(e, t, n) {
  Te(k(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function oi(e, t, n, r) {
  const s = r.includes(".") ? Qo(n, r) : () => n[r]
  if (oe(e)) {
    const o = t[e]
    D(o) && yn(s, o)
  } else if (D(e)) yn(s, e.bind(n))
  else if (te(e))
    if (k(e)) e.forEach((o) => oi(o, t, n, r))
    else {
      const o = D(e.handler) ? e.handler.bind(n) : t[e.handler]
      D(o) && yn(s, o, e)
    }
}
function $r(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t)
  let c
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((a) => Pn(c, a, i, !0)), Pn(c, t, i)),
    te(t) && o.set(t, c),
    c
  )
}
function Pn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t
  o && Pn(e, o, n, !0), s && s.forEach((i) => Pn(e, i, n, !0))
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = gc[i] || (n && n[i])
      e[i] = l ? l(e[i], t[i]) : t[i]
    }
  return e
}
const gc = {
  data: xs,
  props: As,
  emits: As,
  methods: Yt,
  computed: Yt,
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  components: Yt,
  directives: Yt,
  watch: bc,
  provide: xs,
  inject: yc,
}
function xs(e, t) {
  return t
    ? e
      ? function () {
          return ue(
            D(e) ? e.call(this, this) : e,
            D(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function yc(e, t) {
  return Yt(_r(e), _r(t))
}
function _r(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Yt(e, t) {
  return e ? ue(Object.create(null), e, t) : t
}
function As(e, t) {
  return e
    ? k(e) && k(t)
      ? [...new Set([...e, ...t])]
      : ue(Object.create(null), Rs(e), Rs(t ?? {}))
    : t
}
function bc(e, t) {
  if (!e) return t
  if (!t) return e
  const n = ue(Object.create(null), e)
  for (const r in t) n[r] = pe(e[r], t[r])
  return n
}
function ii() {
  return {
    app: null,
    config: {
      isNativeTag: Gi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Ec = 0
function _c(e, t) {
  return function (r, s = null) {
    D(r) || (r = ue({}, r)), s != null && !te(s) && (s = null)
    const o = ii(),
      i = new WeakSet()
    let l = !1
    const c = (o.app = {
      _uid: Ec++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Yc,
      get config() {
        return o.config
      },
      set config(a) {},
      use(a, ...u) {
        return (
          i.has(a) ||
            (a && D(a.install)
              ? (i.add(a), a.install(c, ...u))
              : D(a) && (i.add(a), a(c, ...u))),
          c
        )
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), c
      },
      component(a, u) {
        return u ? ((o.components[a] = u), c) : o.components[a]
      },
      directive(a, u) {
        return u ? ((o.directives[a] = u), c) : o.directives[a]
      },
      mount(a, u, d) {
        if (!l) {
          const p = ye(r, s)
          return (
            (p.appContext = o),
            u && t ? t(p, a) : e(p, a, d),
            (l = !0),
            (c._container = a),
            (a.__vue_app__ = c),
            qn(p.component) || p.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__)
      },
      provide(a, u) {
        return (o.provides[a] = u), c
      },
      runWithContext(a) {
        Sn = c
        try {
          return a()
        } finally {
          Sn = null
        }
      },
    })
    return c
  }
}
let Sn = null
function En(e, t) {
  if (de) {
    let n = de.provides
    const r = de.parent && de.parent.provides
    r === n && (n = de.provides = Object.create(r)), (n[e] = t)
  }
}
function Ye(e, t, n = !1) {
  const r = de || Se
  if (r || Sn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Sn._context.provides
    if (s && e in s) return s[e]
    if (arguments.length > 1) return n && D(t) ? t.call(r && r.proxy) : t
  }
}
function wc(e, t, n, r = !1) {
  const s = {},
    o = {}
  xn(o, zn, 1), (e.propsDefaults = Object.create(null)), li(e, t, s, o)
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0)
  n ? (e.props = r ? s : ko(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o)
}
function Rc(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = W(s),
    [c] = e.propsOptions
  let a = !1
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps
      for (let d = 0; d < u.length; d++) {
        let p = u[d]
        if (kn(e.emitsOptions, p)) continue
        const b = t[p]
        if (c)
          if (K(o, p)) b !== o[p] && ((o[p] = b), (a = !0))
          else {
            const _ = Tt(p)
            s[_] = wr(c, l, _, b, e, !1)
          }
        else b !== o[p] && ((o[p] = b), (a = !0))
      }
    }
  } else {
    li(e, t, s, o) && (a = !0)
    let u
    for (const d in l)
      (!t || (!K(t, d) && ((u = yt(d)) === d || !K(t, u)))) &&
        (c
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (s[d] = wr(c, l, d, void 0, e, !0))
          : delete s[d])
    if (o !== l) for (const d in o) (!t || !K(t, d)) && (delete o[d], (a = !0))
  }
  a && Ve(e, "set", "$attrs")
}
function li(e, t, n, r) {
  const [s, o] = e.propsOptions
  let i = !1,
    l
  if (t)
    for (let c in t) {
      if (mn(c)) continue
      const a = t[c]
      let u
      s && K(s, (u = Tt(c)))
        ? !o || !o.includes(u)
          ? (n[u] = a)
          : ((l || (l = {}))[u] = a)
        : kn(e.emitsOptions, c) ||
          ((!(c in r) || a !== r[c]) && ((r[c] = a), (i = !0)))
    }
  if (o) {
    const c = W(n),
      a = l || G
    for (let u = 0; u < o.length; u++) {
      const d = o[u]
      n[d] = wr(s, c, d, a[d], e, !K(a, d))
    }
  }
  return i
}
function wr(e, t, n, r, s, o) {
  const i = e[n]
  if (i != null) {
    const l = K(i, "default")
    if (l && r === void 0) {
      const c = i.default
      if (i.type !== Function && !i.skipFactory && D(c)) {
        const { propsDefaults: a } = s
        n in a ? (r = a[n]) : (Lt(s), (r = a[n] = c.call(null, t)), pt())
      } else r = c
    }
    i[0] && (o && !l ? (r = !1) : i[1] && (r === "" || r === yt(n)) && (r = !0))
  }
  return r
}
function ci(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e)
  if (s) return s
  const o = e.props,
    i = {},
    l = []
  let c = !1
  if (!D(e)) {
    const u = (d) => {
      c = !0
      const [p, b] = ci(d, t, !0)
      ue(i, p), b && l.push(...b)
    }
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u)
  }
  if (!o && !c) return te(e) && r.set(e, Ot), Ot
  if (k(o))
    for (let u = 0; u < o.length; u++) {
      const d = Tt(o[u])
      Os(d) && (i[d] = G)
    }
  else if (o)
    for (const u in o) {
      const d = Tt(u)
      if (Os(d)) {
        const p = o[u],
          b = (i[d] = k(p) || D(p) ? { type: p } : ue({}, p))
        if (b) {
          const _ = Cs(Boolean, b.type),
            w = Cs(String, b.type)
          ;(b[0] = _ > -1),
            (b[1] = w < 0 || _ < w),
            (_ > -1 || K(b, "default")) && l.push(d)
        }
      }
    }
  const a = [i, l]
  return te(e) && r.set(e, a), a
}
function Os(e) {
  return e[0] !== "$"
}
function Ps(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? "null" : ""
}
function Ss(e, t) {
  return Ps(e) === Ps(t)
}
function Cs(e, t) {
  return k(t) ? t.findIndex((n) => Ss(n, e)) : D(t) && Ss(t, e) ? 0 : -1
}
const ui = (e) => e[0] === "_" || e === "$stable",
  Xr = (e) => (k(e) ? e.map(je) : [je(e)]),
  vc = (e, t, n) => {
    if (t._n) return t
    const r = Yl((...s) => Xr(t(...s)), n)
    return (r._c = !1), r
  },
  ai = (e, t, n) => {
    const r = e._ctx
    for (const s in e) {
      if (ui(s)) continue
      const o = e[s]
      if (D(o)) t[s] = vc(s, o, r)
      else if (o != null) {
        const i = Xr(o)
        t[s] = () => i
      }
    }
  },
  fi = (e, t) => {
    const n = Xr(t)
    e.slots.default = () => n
  },
  xc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = W(t)), xn(t, "_", n)) : ai(t, (e.slots = {}))
    } else (e.slots = {}), t && fi(e, t)
    xn(e.slots, zn, 1)
  },
  Ac = (e, t, n) => {
    const { vnode: r, slots: s } = e
    let o = !0,
      i = G
    if (r.shapeFlag & 32) {
      const l = t._
      l
        ? n && l === 1
          ? (o = !1)
          : (ue(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), ai(t, s)),
        (i = t)
    } else t && (fi(e, t), (i = { default: 1 }))
    if (o) for (const l in s) !ui(l) && i[l] == null && delete s[l]
  }
function Rr(e, t, n, r, s = !1) {
  if (k(e)) {
    e.forEach((p, b) => Rr(p, t && (k(t) ? t[b] : t), n, r, s))
    return
  }
  if (bn(r) && !s) return
  const o = r.shapeFlag & 4 ? qn(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    a = t && t.r,
    u = l.refs === G ? (l.refs = {}) : l.refs,
    d = l.setupState
  if (
    (a != null &&
      a !== c &&
      (oe(a)
        ? ((u[a] = null), K(d, a) && (d[a] = null))
        : he(a) && (a.value = null)),
    D(c))
  )
    st(c, l, 12, [i, u])
  else {
    const p = oe(c),
      b = he(c)
    if (p || b) {
      const _ = () => {
        if (e.f) {
          const w = p ? (K(d, c) ? d[c] : u[c]) : c.value
          s
            ? k(w) && Br(w, o)
            : k(w)
            ? w.includes(o) || w.push(o)
            : p
            ? ((u[c] = [o]), K(d, c) && (d[c] = u[c]))
            : ((c.value = [o]), e.k && (u[e.k] = c.value))
        } else
          p
            ? ((u[c] = i), K(d, c) && (d[c] = i))
            : b && ((c.value = i), e.k && (u[e.k] = i))
      }
      i ? ((_.id = -1), ge(_, n)) : _()
    }
  }
}
const ge = ec
function Oc(e) {
  return Pc(e)
}
function Pc(e, t) {
  const n = dr()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: u,
      parentNode: d,
      nextSibling: p,
      setScopeId: b = Ue,
      insertStaticContent: _,
    } = e,
    w = (
      f,
      h,
      m,
      g = null,
      R = null,
      v = null,
      C = !1,
      A = null,
      O = !!h.dynamicChildren
    ) => {
      if (f === h) return
      f && !zt(f, h) && ((g = E(f)), me(f, R, v, !0), (f = null)),
        h.patchFlag === -2 && ((O = !1), (h.dynamicChildren = null))
      const { type: x, ref: M, shapeFlag: I } = h
      switch (x) {
        case Dn:
          F(f, h, m, g)
          break
        case gt:
          T(f, h, m, g)
          break
        case er:
          f == null && L(h, m, g, C)
          break
        case _e:
          it(f, h, m, g, R, v, C, A, O)
          break
        default:
          I & 1
            ? ne(f, h, m, g, R, v, C, A, O)
            : I & 6
            ? Le(f, h, m, g, R, v, C, A, O)
            : (I & 64 || I & 128) && x.process(f, h, m, g, R, v, C, A, O, P)
      }
      M != null && R && Rr(M, f && f.ref, v, h || f, !h)
    },
    F = (f, h, m, g) => {
      if (f == null) r((h.el = l(h.children)), m, g)
      else {
        const R = (h.el = f.el)
        h.children !== f.children && a(R, h.children)
      }
    },
    T = (f, h, m, g) => {
      f == null ? r((h.el = c(h.children || "")), m, g) : (h.el = f.el)
    },
    L = (f, h, m, g) => {
      ;[f.el, f.anchor] = _(f.children, h, m, g, f.el, f.anchor)
    },
    H = ({ el: f, anchor: h }, m, g) => {
      let R
      for (; f && f !== h; ) (R = p(f)), r(f, m, g), (f = R)
      r(h, m, g)
    },
    S = ({ el: f, anchor: h }) => {
      let m
      for (; f && f !== h; ) (m = p(f)), s(f), (f = m)
      s(h)
    },
    ne = (f, h, m, g, R, v, C, A, O) => {
      ;(C = C || h.type === "svg"),
        f == null ? V(h, m, g, R, v, C, A, O) : bt(f, h, R, v, C, A, O)
    },
    V = (f, h, m, g, R, v, C, A) => {
      let O, x
      const { type: M, props: I, shapeFlag: j, transition: U, dirs: z } = f
      if (
        ((O = f.el = i(f.type, v, I && I.is, I)),
        j & 8
          ? u(O, f.children)
          : j & 16 &&
            ze(f.children, O, null, g, R, v && M !== "foreignObject", C, A),
        z && lt(f, null, g, "created"),
        we(O, f, f.scopeId, C, g),
        I)
      ) {
        for (const J in I)
          J !== "value" &&
            !mn(J) &&
            o(O, J, null, I[J], v, f.children, g, R, ae)
        "value" in I && o(O, "value", null, I.value),
          (x = I.onVnodeBeforeMount) && Me(x, g, f)
      }
      z && lt(f, null, g, "beforeMount")
      const Q = Sc(R, U)
      Q && U.beforeEnter(O),
        r(O, h, m),
        ((x = I && I.onVnodeMounted) || Q || z) &&
          ge(() => {
            x && Me(x, g, f), Q && U.enter(O), z && lt(f, null, g, "mounted")
          }, R)
    },
    we = (f, h, m, g, R) => {
      if ((m && b(f, m), g)) for (let v = 0; v < g.length; v++) b(f, g[v])
      if (R) {
        let v = R.subTree
        if (h === v) {
          const C = R.vnode
          we(f, C, C.scopeId, C.slotScopeIds, R.parent)
        }
      }
    },
    ze = (f, h, m, g, R, v, C, A, O = 0) => {
      for (let x = O; x < f.length; x++) {
        const M = (f[x] = A ? tt(f[x]) : je(f[x]))
        w(null, M, h, m, g, R, v, C, A)
      }
    },
    bt = (f, h, m, g, R, v, C) => {
      const A = (h.el = f.el)
      let { patchFlag: O, dynamicChildren: x, dirs: M } = h
      O |= f.patchFlag & 16
      const I = f.props || G,
        j = h.props || G
      let U
      m && ct(m, !1),
        (U = j.onVnodeBeforeUpdate) && Me(U, m, h, f),
        M && lt(h, f, m, "beforeUpdate"),
        m && ct(m, !0)
      const z = R && h.type !== "foreignObject"
      if (
        (x
          ? Fe(f.dynamicChildren, x, A, m, g, z, v)
          : C || Y(f, h, A, null, m, g, z, v, !1),
        O > 0)
      ) {
        if (O & 16) Je(A, h, I, j, m, g, R)
        else if (
          (O & 2 && I.class !== j.class && o(A, "class", null, j.class, R),
          O & 4 && o(A, "style", I.style, j.style, R),
          O & 8)
        ) {
          const Q = h.dynamicProps
          for (let J = 0; J < Q.length; J++) {
            const re = Q[J],
              ve = I[re],
              Rt = j[re]
            ;(Rt !== ve || re === "value") &&
              o(A, re, ve, Rt, R, f.children, m, g, ae)
          }
        }
        O & 1 && f.children !== h.children && u(A, h.children)
      } else !C && x == null && Je(A, h, I, j, m, g, R)
      ;((U = j.onVnodeUpdated) || M) &&
        ge(() => {
          U && Me(U, m, h, f), M && lt(h, f, m, "updated")
        }, g)
    },
    Fe = (f, h, m, g, R, v, C) => {
      for (let A = 0; A < h.length; A++) {
        const O = f[A],
          x = h[A],
          M =
            O.el && (O.type === _e || !zt(O, x) || O.shapeFlag & 70)
              ? d(O.el)
              : m
        w(O, x, M, null, g, R, v, C, !0)
      }
    },
    Je = (f, h, m, g, R, v, C) => {
      if (m !== g) {
        if (m !== G)
          for (const A in m)
            !mn(A) && !(A in g) && o(f, A, m[A], null, C, h.children, R, v, ae)
        for (const A in g) {
          if (mn(A)) continue
          const O = g[A],
            x = m[A]
          O !== x && A !== "value" && o(f, A, x, O, C, h.children, R, v, ae)
        }
        "value" in g && o(f, "value", m.value, g.value)
      }
    },
    it = (f, h, m, g, R, v, C, A, O) => {
      const x = (h.el = f ? f.el : l("")),
        M = (h.anchor = f ? f.anchor : l(""))
      let { patchFlag: I, dynamicChildren: j, slotScopeIds: U } = h
      U && (A = A ? A.concat(U) : U),
        f == null
          ? (r(x, m, g), r(M, m, g), ze(h.children, m, M, R, v, C, A, O))
          : I > 0 && I & 64 && j && f.dynamicChildren
          ? (Fe(f.dynamicChildren, j, m, R, v, C, A),
            (h.key != null || (R && h === R.subTree)) && di(f, h, !0))
          : Y(f, h, m, M, R, v, C, A, O)
    },
    Le = (f, h, m, g, R, v, C, A, O) => {
      ;(h.slotScopeIds = A),
        f == null
          ? h.shapeFlag & 512
            ? R.ctx.activate(h, m, g, C, O)
            : Ut(h, m, g, R, v, C, O)
          : Et(f, h, O)
    },
    Ut = (f, h, m, g, R, v, C) => {
      const A = (f.component = Hc(f, g, R))
      if ((ei(f) && (A.ctx.renderer = P), Uc(A), A.asyncDep)) {
        if ((R && R.registerDep(A, ie), !f.el)) {
          const O = (A.subTree = ye(gt))
          T(null, O, h, m)
        }
        return
      }
      ie(A, f, h, m, R, v, C)
    },
    Et = (f, h, m) => {
      const g = (h.component = f.component)
      if (Jl(f, h, m))
        if (g.asyncDep && !g.asyncResolved) {
          Z(g, h, m)
          return
        } else (g.next = h), Dl(g.update), g.update()
      else (h.el = f.el), (g.vnode = h)
    },
    ie = (f, h, m, g, R, v, C) => {
      const A = () => {
          if (f.isMounted) {
            let { next: M, bu: I, u: j, parent: U, vnode: z } = f,
              Q = M,
              J
            ct(f, !1),
              M ? ((M.el = z.el), Z(f, M, C)) : (M = z),
              I && gn(I),
              (J = M.props && M.props.onVnodeBeforeUpdate) && Me(J, U, M, z),
              ct(f, !0)
            const re = Zn(f),
              ve = f.subTree
            ;(f.subTree = re),
              w(ve, re, d(ve.el), E(ve), f, R, v),
              (M.el = re.el),
              Q === null && Zl(f, re.el),
              j && ge(j, R),
              (J = M.props && M.props.onVnodeUpdated) &&
                ge(() => Me(J, U, M, z), R)
          } else {
            let M
            const { el: I, props: j } = h,
              { bm: U, m: z, parent: Q } = f,
              J = bn(h)
            if (
              (ct(f, !1),
              U && gn(U),
              !J && (M = j && j.onVnodeBeforeMount) && Me(M, Q, h),
              ct(f, !0),
              I && $)
            ) {
              const re = () => {
                ;(f.subTree = Zn(f)), $(I, f.subTree, f, R, null)
              }
              J
                ? h.type.__asyncLoader().then(() => !f.isUnmounted && re())
                : re()
            } else {
              const re = (f.subTree = Zn(f))
              w(null, re, m, g, f, R, v), (h.el = re.el)
            }
            if ((z && ge(z, R), !J && (M = j && j.onVnodeMounted))) {
              const re = h
              ge(() => Me(M, Q, re), R)
            }
            ;(h.shapeFlag & 256 ||
              (Q && bn(Q.vnode) && Q.vnode.shapeFlag & 256)) &&
              f.a &&
              ge(f.a, R),
              (f.isMounted = !0),
              (h = m = g = null)
          }
        },
        O = (f.effect = new Ur(A, () => Yr(x), f.scope)),
        x = (f.update = () => O.run())
      ;(x.id = f.uid), ct(f, !0), x()
    },
    Z = (f, h, m) => {
      h.component = f
      const g = f.vnode.props
      ;(f.vnode = h),
        (f.next = null),
        Rc(f, h.props, g, m),
        Ac(f, h.children, m),
        jt(),
        _s(),
        kt()
    },
    Y = (f, h, m, g, R, v, C, A, O = !1) => {
      const x = f && f.children,
        M = f ? f.shapeFlag : 0,
        I = h.children,
        { patchFlag: j, shapeFlag: U } = h
      if (j > 0) {
        if (j & 128) {
          Ze(x, I, m, g, R, v, C, A, O)
          return
        } else if (j & 256) {
          qe(x, I, m, g, R, v, C, A, O)
          return
        }
      }
      U & 8
        ? (M & 16 && ae(x, R, v), I !== x && u(m, I))
        : M & 16
        ? U & 16
          ? Ze(x, I, m, g, R, v, C, A, O)
          : ae(x, R, v, !0)
        : (M & 8 && u(m, ""), U & 16 && ze(I, m, g, R, v, C, A, O))
    },
    qe = (f, h, m, g, R, v, C, A, O) => {
      ;(f = f || Ot), (h = h || Ot)
      const x = f.length,
        M = h.length,
        I = Math.min(x, M)
      let j
      for (j = 0; j < I; j++) {
        const U = (h[j] = O ? tt(h[j]) : je(h[j]))
        w(f[j], U, m, null, R, v, C, A, O)
      }
      x > M ? ae(f, R, v, !0, !1, I) : ze(h, m, g, R, v, C, A, O, I)
    },
    Ze = (f, h, m, g, R, v, C, A, O) => {
      let x = 0
      const M = h.length
      let I = f.length - 1,
        j = M - 1
      for (; x <= I && x <= j; ) {
        const U = f[x],
          z = (h[x] = O ? tt(h[x]) : je(h[x]))
        if (zt(U, z)) w(U, z, m, null, R, v, C, A, O)
        else break
        x++
      }
      for (; x <= I && x <= j; ) {
        const U = f[I],
          z = (h[j] = O ? tt(h[j]) : je(h[j]))
        if (zt(U, z)) w(U, z, m, null, R, v, C, A, O)
        else break
        I--, j--
      }
      if (x > I) {
        if (x <= j) {
          const U = j + 1,
            z = U < M ? h[U].el : g
          for (; x <= j; )
            w(null, (h[x] = O ? tt(h[x]) : je(h[x])), m, z, R, v, C, A, O), x++
        }
      } else if (x > j) for (; x <= I; ) me(f[x], R, v, !0), x++
      else {
        const U = x,
          z = x,
          Q = new Map()
        for (x = z; x <= j; x++) {
          const Ee = (h[x] = O ? tt(h[x]) : je(h[x]))
          Ee.key != null && Q.set(Ee.key, x)
        }
        let J,
          re = 0
        const ve = j - z + 1
        let Rt = !1,
          cs = 0
        const Dt = new Array(ve)
        for (x = 0; x < ve; x++) Dt[x] = 0
        for (x = U; x <= I; x++) {
          const Ee = f[x]
          if (re >= ve) {
            me(Ee, R, v, !0)
            continue
          }
          let Be
          if (Ee.key != null) Be = Q.get(Ee.key)
          else
            for (J = z; J <= j; J++)
              if (Dt[J - z] === 0 && zt(Ee, h[J])) {
                Be = J
                break
              }
          Be === void 0
            ? me(Ee, R, v, !0)
            : ((Dt[Be - z] = x + 1),
              Be >= cs ? (cs = Be) : (Rt = !0),
              w(Ee, h[Be], m, null, R, v, C, A, O),
              re++)
        }
        const us = Rt ? Cc(Dt) : Ot
        for (J = us.length - 1, x = ve - 1; x >= 0; x--) {
          const Ee = z + x,
            Be = h[Ee],
            as = Ee + 1 < M ? h[Ee + 1].el : g
          Dt[x] === 0
            ? w(null, Be, m, as, R, v, C, A, O)
            : Rt && (J < 0 || x !== us[J] ? Ie(Be, m, as, 2) : J--)
        }
      }
    },
    Ie = (f, h, m, g, R = null) => {
      const { el: v, type: C, transition: A, children: O, shapeFlag: x } = f
      if (x & 6) {
        Ie(f.component.subTree, h, m, g)
        return
      }
      if (x & 128) {
        f.suspense.move(h, m, g)
        return
      }
      if (x & 64) {
        C.move(f, h, m, P)
        return
      }
      if (C === _e) {
        r(v, h, m)
        for (let I = 0; I < O.length; I++) Ie(O[I], h, m, g)
        r(f.anchor, h, m)
        return
      }
      if (C === er) {
        H(f, h, m)
        return
      }
      if (g !== 2 && x & 1 && A)
        if (g === 0) A.beforeEnter(v), r(v, h, m), ge(() => A.enter(v), R)
        else {
          const { leave: I, delayLeave: j, afterLeave: U } = A,
            z = () => r(v, h, m),
            Q = () => {
              I(v, () => {
                z(), U && U()
              })
            }
          j ? j(v, z, Q) : Q()
        }
      else r(v, h, m)
    },
    me = (f, h, m, g = !1, R = !1) => {
      const {
        type: v,
        props: C,
        ref: A,
        children: O,
        dynamicChildren: x,
        shapeFlag: M,
        patchFlag: I,
        dirs: j,
      } = f
      if ((A != null && Rr(A, null, m, f, !0), M & 256)) {
        h.ctx.deactivate(f)
        return
      }
      const U = M & 1 && j,
        z = !bn(f)
      let Q
      if ((z && (Q = C && C.onVnodeBeforeUnmount) && Me(Q, h, f), M & 6))
        cn(f.component, m, g)
      else {
        if (M & 128) {
          f.suspense.unmount(m, g)
          return
        }
        U && lt(f, null, h, "beforeUnmount"),
          M & 64
            ? f.type.remove(f, h, m, R, P, g)
            : x && (v !== _e || (I > 0 && I & 64))
            ? ae(x, h, m, !1, !0)
            : ((v === _e && I & 384) || (!R && M & 16)) && ae(O, h, m),
          g && _t(f)
      }
      ;((z && (Q = C && C.onVnodeUnmounted)) || U) &&
        ge(() => {
          Q && Me(Q, h, f), U && lt(f, null, h, "unmounted")
        }, m)
    },
    _t = (f) => {
      const { type: h, el: m, anchor: g, transition: R } = f
      if (h === _e) {
        wt(m, g)
        return
      }
      if (h === er) {
        S(f)
        return
      }
      const v = () => {
        s(m), R && !R.persisted && R.afterLeave && R.afterLeave()
      }
      if (f.shapeFlag & 1 && R && !R.persisted) {
        const { leave: C, delayLeave: A } = R,
          O = () => C(m, v)
        A ? A(f.el, v, O) : O()
      } else v()
    },
    wt = (f, h) => {
      let m
      for (; f !== h; ) (m = p(f)), s(f), (f = m)
      s(h)
    },
    cn = (f, h, m) => {
      const { bum: g, scope: R, update: v, subTree: C, um: A } = f
      g && gn(g),
        R.stop(),
        v && ((v.active = !1), me(C, f, h, m)),
        A && ge(A, h),
        ge(() => {
          f.isUnmounted = !0
        }, h),
        h &&
          h.pendingBranch &&
          !h.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === h.pendingId &&
          (h.deps--, h.deps === 0 && h.resolve())
    },
    ae = (f, h, m, g = !1, R = !1, v = 0) => {
      for (let C = v; C < f.length; C++) me(f[C], h, m, g, R)
    },
    E = (f) =>
      f.shapeFlag & 6
        ? E(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : p(f.anchor || f.el),
    N = (f, h, m) => {
      f == null
        ? h._vnode && me(h._vnode, null, null, !0)
        : w(h._vnode || null, f, h, null, null, null, m),
        _s(),
        $o(),
        (h._vnode = f)
    },
    P = {
      p: w,
      um: me,
      m: Ie,
      r: _t,
      mt: Ut,
      mc: ze,
      pc: Y,
      pbc: Fe,
      n: E,
      o: e,
    }
  let B, $
  return t && ([B, $] = t(P)), { render: N, hydrate: B, createApp: _c(N, B) }
}
function ct({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function Sc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function di(e, t, n = !1) {
  const r = e.children,
    s = t.children
  if (k(r) && k(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o]
      let l = s[o]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = tt(s[o])), (l.el = i.el)),
        n || di(i, l)),
        l.type === Dn && (l.el = i.el)
    }
}
function Cc(e) {
  const t = e.slice(),
    n = [0]
  let r, s, o, i, l
  const c = e.length
  for (r = 0; r < c; r++) {
    const a = e[r]
    if (a !== 0) {
      if (((s = n[n.length - 1]), e[s] < a)) {
        ;(t[r] = s), n.push(r)
        continue
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l)
      a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r))
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i])
  return n
}
const Tc = (e) => e.__isTeleport,
  _e = Symbol.for("v-fgt"),
  Dn = Symbol.for("v-txt"),
  gt = Symbol.for("v-cmt"),
  er = Symbol.for("v-stc"),
  Xt = []
let Ce = null
function le(e = !1) {
  Xt.push((Ce = e ? null : []))
}
function Nc() {
  Xt.pop(), (Ce = Xt[Xt.length - 1] || null)
}
let tn = 1
function Ts(e) {
  tn += e
}
function hi(e) {
  return (
    (e.dynamicChildren = tn > 0 ? Ce || Ot : null),
    Nc(),
    tn > 0 && Ce && Ce.push(e),
    e
  )
}
function ce(e, t, n, r, s, o) {
  return hi(ee(e, t, n, r, s, o, !0))
}
function Fc(e, t, n, r, s) {
  return hi(ye(e, t, n, r, s, !0))
}
function vr(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key
}
const zn = "__vInternal",
  pi = ({ key: e }) => e ?? null,
  _n = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? oe(e) || he(e) || D(e)
        ? { i: Se, r: e, k: t, f: !!n }
        : e
      : null
  )
function ee(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === _e ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pi(t),
    ref: t && _n(t),
    scopeId: Hn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Se,
  }
  return (
    l
      ? (Jr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= oe(n) ? 8 : 16),
    tn > 0 &&
      !i &&
      Ce &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Ce.push(c),
    c
  )
}
const ye = Lc
function Lc(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === Ql) && (e = gt), vr(e))) {
    const l = Ft(e, t, !0)
    return (
      n && Jr(l, n),
      tn > 0 &&
        !o &&
        Ce &&
        (l.shapeFlag & 6 ? (Ce[Ce.indexOf(e)] = l) : Ce.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((Kc(e) && (e = e.__vccOpts), t)) {
    t = Ic(t)
    let { class: l, style: c } = t
    l && !oe(l) && (t.class = kr(l)),
      te(c) && (Uo(c) && !k(c) && (c = ue({}, c)), (t.style = jr(c)))
  }
  const i = oe(e) ? 1 : Gl(e) ? 128 : Tc(e) ? 64 : te(e) ? 4 : D(e) ? 2 : 0
  return ee(e, t, n, r, s, i, o, !0)
}
function Ic(e) {
  return e ? (Uo(e) || zn in e ? ue({}, e) : e) : null
}
function Ft(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? Mc(r || {}, t) : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && pi(l),
    ref:
      t && t.ref ? (n && s ? (k(s) ? s.concat(_n(t)) : [s, _n(t)]) : _n(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== _e ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ft(e.ssContent),
    ssFallback: e.ssFallback && Ft(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function Bc(e = " ", t = 0) {
  return ye(Dn, null, e, t)
}
function qt(e = "", t = !1) {
  return t ? (le(), Fc(gt, null, e)) : ye(gt, null, e)
}
function je(e) {
  return e == null || typeof e == "boolean"
    ? ye(gt)
    : k(e)
    ? ye(_e, null, e.slice())
    : typeof e == "object"
    ? tt(e)
    : ye(Dn, null, String(e))
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ft(e)
}
function Jr(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (k(t)) n = 16
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default
      s && (s._c && (s._d = !1), Jr(e, s()), s._c && (s._d = !0))
      return
    } else {
      n = 32
      const s = t._
      !s && !(zn in t)
        ? (t._ctx = Se)
        : s === 3 &&
          Se &&
          (Se.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    D(t)
      ? ((t = { default: t, _ctx: Se }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Bc(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Mc(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = kr([t.class, r.class]))
      else if (s === "style") t.style = jr([t.style, r.style])
      else if (Nn(s)) {
        const o = t[s],
          i = r[s]
        i &&
          o !== i &&
          !(k(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i)
      } else s !== "" && (t[s] = r[s])
  }
  return t
}
function Me(e, t, n, r = null) {
  Te(e, t, 7, [n, r])
}
const jc = ii()
let kc = 0
function Hc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || jc,
    o = {
      uid: kc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Po(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ci(r, s),
      emitsOptions: Jo(r, s),
      emit: null,
      emitted: null,
      propsDefaults: G,
      inheritAttrs: r.inheritAttrs,
      ctx: G,
      data: G,
      props: G,
      attrs: G,
      slots: G,
      refs: G,
      setupState: G,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Kl.bind(null, o)),
    e.ce && e.ce(o),
    o
  )
}
let de = null,
  Zr,
  vt,
  Ns = "__VUE_INSTANCE_SETTERS__"
;(vt = dr()[Ns]) || (vt = dr()[Ns] = []),
  vt.push((e) => (de = e)),
  (Zr = (e) => {
    vt.length > 1 ? vt.forEach((t) => t(e)) : vt[0](e)
  })
const Lt = (e) => {
    Zr(e), e.scope.on()
  },
  pt = () => {
    de && de.scope.off(), Zr(null)
  }
function mi(e) {
  return e.vnode.shapeFlag & 4
}
let nn = !1
function Uc(e, t = !1) {
  nn = t
  const { props: n, children: r } = e.vnode,
    s = mi(e)
  wc(e, n, s, t), xc(e, r)
  const o = s ? Dc(e, t) : void 0
  return (nn = !1), o
}
function Dc(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Kr(new Proxy(e.ctx, hc)))
  const { setup: r } = n
  if (r) {
    const s = (e.setupContext = r.length > 1 ? qc(e) : null)
    Lt(e), jt()
    const o = st(r, e, 0, [e.props, s])
    if ((kt(), pt(), wo(o))) {
      if ((o.then(pt, pt), t))
        return o
          .then((i) => {
            Fs(e, i, t)
          })
          .catch((i) => {
            jn(i, e, 0)
          })
      e.asyncDep = o
    } else Fs(e, o, t)
  } else gi(e, t)
}
function Fs(e, t, n) {
  D(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : te(t) && (e.setupState = Ko(t)),
    gi(e, n)
}
let Ls
function gi(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && Ls && !r.render) {
      const s = r.template || $r(e).template
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          a = ue(ue({ isCustomElement: o, delimiters: l }, i), c)
        r.render = Ls(s, a)
      }
    }
    e.render = r.render || Ue
  }
  {
    Lt(e), jt()
    try {
      pc(e)
    } finally {
      kt(), pt()
    }
  }
}
function zc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return be(e, "get", "$attrs"), t[n]
      },
    }))
  )
}
function qc(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return zc(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function qn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ko(Kr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in $t) return $t[n](e)
        },
        has(t, n) {
          return n in t || n in $t
        },
      }))
    )
}
function Kc(e) {
  return D(e) && "__vccOpts" in e
}
const Pe = (e, t) => kl(e, t, nn)
function yi(e, t, n) {
  const r = arguments.length
  return r === 2
    ? te(t) && !k(t)
      ? vr(t)
        ? ye(e, null, [t])
        : ye(e, t)
      : ye(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && vr(n) && (n = [n]),
      ye(e, t, n))
}
const Wc = Symbol.for("v-scx"),
  Vc = () => Ye(Wc),
  Yc = "3.3.8",
  $c = "http://www.w3.org/2000/svg",
  at = typeof document < "u" ? document : null,
  Is = at && at.createElement("template"),
  Xc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? at.createElementNS($c, e)
        : at.createElement(e, n ? { is: n } : void 0)
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      )
    },
    createText: (e) => at.createTextNode(e),
    createComment: (e) => at.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => at.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Is.innerHTML = r ? `<svg>${e}</svg>` : e
        const l = Is.content
        if (r) {
          const c = l.firstChild
          for (; c.firstChild; ) l.appendChild(c.firstChild)
          l.removeChild(c)
        }
        t.insertBefore(l, n)
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ]
    },
  },
  Jc = Symbol("_vtc")
function Zc(e, t, n) {
  const r = e[Jc]
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t)
}
const Qc = Symbol("_vod")
function Gc(e, t, n) {
  const r = e.style,
    s = oe(n)
  if (n && !s) {
    if (t && !oe(t)) for (const o in t) n[o] == null && xr(r, o, "")
    for (const o in n) xr(r, o, n[o])
  } else {
    const o = r.display
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      Qc in e && (r.display = o)
  }
}
const Bs = /\s*!important$/
function xr(e, t, n) {
  if (k(n)) n.forEach((r) => xr(e, t, r))
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n)
  else {
    const r = eu(e, t)
    Bs.test(n)
      ? e.setProperty(yt(r), n.replace(Bs, ""), "important")
      : (e[r] = n)
  }
}
const Ms = ["Webkit", "Moz", "ms"],
  tr = {}
function eu(e, t) {
  const n = tr[t]
  if (n) return n
  let r = Tt(t)
  if (r !== "filter" && r in e) return (tr[t] = r)
  r = xo(r)
  for (let s = 0; s < Ms.length; s++) {
    const o = Ms[s] + r
    if (o in e) return (tr[t] = o)
  }
  return t
}
const js = "http://www.w3.org/1999/xlink"
function tu(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(js, t.slice(6, t.length))
      : e.setAttributeNS(js, t, n)
  else {
    const o = al(t)
    n == null || (o && !Ao(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n)
  }
}
function nu(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "")
    return
  }
  const l = e.tagName
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      u = n ?? ""
    a !== u && (e.value = u), n == null && e.removeAttribute(t)
    return
  }
  let c = !1
  if (n === "" || n == null) {
    const a = typeof e[t]
    a === "boolean"
      ? (n = Ao(n))
      : n == null && a === "string"
      ? ((n = ""), (c = !0))
      : a === "number" && ((n = 0), (c = !0))
  }
  try {
    e[t] = n
  } catch {}
  c && e.removeAttribute(t)
}
function xt(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function ru(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const ks = Symbol("_vei")
function su(e, t, n, r, s = null) {
  const o = e[ks] || (e[ks] = {}),
    i = o[t]
  if (r && i) i.value = r
  else {
    const [l, c] = ou(t)
    if (r) {
      const a = (o[t] = cu(r, s))
      xt(e, l, a, c)
    } else i && (ru(e, l, i, c), (o[t] = void 0))
  }
}
const Hs = /(?:Once|Passive|Capture)$/
function ou(e) {
  let t
  if (Hs.test(e)) {
    t = {}
    let r
    for (; (r = e.match(Hs)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ":" ? e.slice(3) : yt(e.slice(2)), t]
}
let nr = 0
const iu = Promise.resolve(),
  lu = () => nr || (iu.then(() => (nr = 0)), (nr = Date.now()))
function cu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    Te(uu(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = lu()), n
}
function uu(e, t) {
  if (k(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    )
  } else return t
}
const Us = /^on[a-z]/,
  au = (e, t, n, r, s = !1, o, i, l, c) => {
    t === "class"
      ? Zc(e, r, s)
      : t === "style"
      ? Gc(e, n, r)
      : Nn(t)
      ? Ir(t) || su(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : fu(e, t, r, s)
        )
      ? nu(e, t, r, o, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        tu(e, t, r, s))
  }
function fu(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Us.test(t) && D(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Us.test(t) && oe(n))
    ? !1
    : t in e
}
const Ds = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1
  return k(t) ? (n) => gn(t, n) : t
}
function du(e) {
  e.target.composing = !0
}
function zs(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")))
}
const rr = Symbol("_assign"),
  hu = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e[rr] = Ds(s)
      const o = r || (s.props && s.props.type === "number")
      xt(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return
        let l = e.value
        n && (l = l.trim()), o && (l = fr(l)), e[rr](l)
      }),
        n &&
          xt(e, "change", () => {
            e.value = e.value.trim()
          }),
        t ||
          (xt(e, "compositionstart", du),
          xt(e, "compositionend", zs),
          xt(e, "change", zs))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ""
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      o
    ) {
      if (
        ((e[rr] = Ds(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === "number") && fr(e.value) === t))))
      )
        return
      const i = t ?? ""
      e.value !== i && (e.value = i)
    },
  },
  pu = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  mu = (e, t) => (n) => {
    if (!("key" in n)) return
    const r = yt(n.key)
    if (t.some((s) => s === r || pu[s] === r)) return e(n)
  },
  gu = ue({ patchProp: au }, Xc)
let qs
function yu() {
  return qs || (qs = Oc(gu))
}
const bu = (...e) => {
  const t = yu().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const s = Eu(r)
      if (!s) return
      const o = t._component
      !D(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "")
      const i = n(s, !1, s instanceof SVGElement)
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      )
    }),
    t
  )
}
function Eu(e) {
  return oe(e) ? document.querySelector(e) : e
}
var _u = !1
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const wu = Symbol()
var Ks
;(function (e) {
  ;(e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function")
})(Ks || (Ks = {}))
function Ru() {
  const e = fl(!0),
    t = e.run(() => Ae({}))
  let n = [],
    r = []
  const s = Kr({
    install(o) {
      ;(s._a = o),
        o.provide(wu, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach((i) => n.push(i)),
        (r = [])
    },
    use(o) {
      return !this._a && !_u ? r.push(o) : n.push(o), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  })
  return s
}
const bi =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAABJCAYAAABlyld4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAyiSURBVHgB7Z1PiNzWHcd/2/gQyJqMIU02kGC5xNBCTSen5uBSuenBvtRjaA/JxdpDjmHXt7YpeHJwc/Qu7a2Unb00BReyTinxIe2MiQ8pPewaB1LI4pVpIe4f2AlsSShJ1feVfm/mzdunvzOzk139PiCkkZ6eNNJXP/3e7/3RHKUQ7ZJHj9AO1YEv6NTcCQpJONJ8hQShJojYhdogYhdqw7Eoijw19/dt+d92g/57jWrBY6+1oui5PglHmT4su6+m75IgHG2uzinLHmBpbm6uY26RaIxwlFA674nPLtQGEbtQG0TsQm0QsQu1QcQu1AYRu1AbROxCbRCxC7VBxC7UBhG7UBtE7EJtELELtUHEPiHQVFpNDRK+tByjMXn4j0dp6afPD37/ZPlDap4p1jT81rsLdOP3z9Le3jF6+M9HR7YtPPkZLTz1KV148SGdV1PeccvQPLOrzvOvNA5K2L6aXaakibRnrMdsS02hmm7arUlz8txQs2/xzy2176WC+3lq1uWfq2q/FSqB2h/pLxZMfknlv2Xt76vZdTU1jEkDMSD9upp6at/QcXycu8dpz6k0/ZzzvapmAf+8otJvUAHGFvt77z8xIlT8Lir2zQ8atH1/3rkNeWLauneC1t48Ras/34wfADtNFfCgVIVv7BoZAnfQNKYOFcvXo1HBNfCmyLvxBp7ej8rToOz/Y6d1HbuZkd7nKVT/ySXO12n4sC6rqZ2Sl75OentYVOhgbLHf+tPT8fy5r+3Fwr31x6fp1Ve2qSx/+O17NP/Y54PfH6m8fvf2syq/hYEV//XqXwZp5uc/pxX1ALhYZouPhy54aX+TfPM4ZWCL0jZW3aZEzD1jnRZOixKLVhSf5yHv3+A8OnSwnMvZnvefYJl7+oe6ZngIAjUtUfK/1tS60Hw7ID3am1NyDZbwpsl4yNvmsagEY4kdItSW+fz3PqZf3j9Ne/85pqxxo7B119gCPK0eHrhEsOadN734WDduPkOLL4eD9M/nHGPhyU9z0xTFEjpu1CXXK9nYXtjiMJd53qNEFD6v69ABYgq1IqGVH67FMrtosN54iCH8RWs/WHeft193bNdWXV+nTsb1dzJWAfXG28/E84WnPqMfXfz7QLDvKGs8KRZf3hnku71znGYB9+Zq80/cvHNlL3RO/h4NLftNSt4YwD8qhV5+iLQ191O2awMR8DWxafM8pOThKMVYYr/z/lfjefObifU8/+LHg/Ww8JMCDxPY23uEZsRVY/lSCT+6KL6x3KNRtyigo8Ndnnsp269QUkgF5jW3rfpqFWNTWexwX3QBUYv8Oy/8O55D6GkFzyogWgPm57+gg4YLpB7/7EzSohvom4joTZ+t3ANeVzRKchg4yXOn38/XdpV/2ta9zfOwbLRJU1nspguj/WL46drlWFN+9iS4Y0R7zr7wL5oBLWN5nSaM5cKYfn6H50fClXG4amlAyCPW3bLqV6gilX0NhASBdmE0sPKIomzfPx5b+KqRj+QYDfrFr07Hy4j2XHDE2w8AHfeeROHNhX6Y+lZMHsLXr/KAEhFMHSWsdsbmfhWraoRrQUgZhW682VR6WPc4lq6W4Zu3eXOnTKjRppLYIULbhdHAlYHYIXTE3IsK9I2Vr1vHODE4Bh6oaz+7RzNCW9UwK1GGSLZybpC2WCNpEMUwwnFwZQ5E7GT5yhYh5Z/HdXXepgVs0jAGj4J3kOcKqu1tlQeui0dJZAYGAXmWLpSaVBK7jraYLoxGuzIQO2LkRcWO+LyLH/7gb5Xi9hPkRMF0aSLpUEoYkl/PWgiuVzvE4VPiynhTKi/YZLlqRQrmrZT1sMqLVByk7Rr5rY77/yta9uT+I44NK28DwcPXRrqirsyPlz4cLMOiQ/yY4y1xXFUgBS+FNCNQK4WClZeTzhYJrHGer73Mc4ioz697k9BYDiijZnFSKEEFNB5mREVXjGHEObgkVFTwXNGEgiyMAdynNo1JabGbLgzEvHQv2/C98+5CHIPP48L3R98AqDx6Y+Ub8dth7TenYlemOaEKopLoqEhcG2i3C9HYIkEtIeWLXUdakK6bk/awDFG4YVngFW57g4okCP52ifZCfWs+FqXFblYY2YVTk+2d+diq3/nzE4XE7uLVVz6K3xDIB9Gd1TNbNAN6NPSryzYBSIWr0T3+ifhz2sXUbxW4Mv6UCslTRZ3zMvvgeKinUivM1zPLuDxewbInlvysKoheey290Ii2LHgLlHFlbLAPojDIB9GdGQF/W7foy2u3UYZlY7mV5o+ya6OtPpZ7dDiBmwfrPq3yh0/ZYl8vFWcvE/NeNBpgwZWpytlvJ8eZdEVVUVjYuqJDt9uYBNotuZ1149mS64frMh1eesayTxMGIVH49RnTSimxI5So0bWlacAia2sOV6YqaBCm2byX5wJPDficIS/D77ye0najEHatbIFddOHXcxRiDws9Y7lJM6CkZU/awsCFyXNLsF1bfzNmXhazVnach2Yc2LqjOWnIq+CCdNESkn3FAajtZEE+npFlYCz3KB8zdNnKSXsSx8+asnbO29f+v0Xha6jLOzNpAlHYZ0evIt24q2i1PWLsOn4OV0Y3zy2L6bePWytbFbga6kZD8G1K3AmPl9vcO6kMhVwY49gIwyEqdJKPvZyRPKD8xmNzGdvyokI69l8F7BsXzA+w3mBAYcuuXRgIrWhFkWmVtz6o7oKgrTyYld+uwc3hECNED9fibkpSCBOVRFfIastRwYUhK23jELsy5hsqoANGvrwBxvzyhuW/96fQBFiYAJNrdF5jDvp1LFRDhtIQaoOIXagNInahNojYhdogYhdqg4hdqA0idqE2iNiF2iBiF2qDiF2oDdJcwIIbWaEZLVoYokHXhqsrnEoXtzx0jaOitmF/tO4b6dXEbWiCtM7DPBiSq0Vjh1td6u16ZC2cXy+tqx63e/Ls8+BtTf6fI6OcGcdw7ePT8NqAuzodb2ua14PzWiJjBAVX/1NjrHukxzFH+qlyPgElY/hgGa0nN0o308AF0Y3B6g5fC9Dm5RUWrp0OTVR3Oa3n2N7R+Vjr0R48yji+x/ut8DnoyXNsD/g4OI+rKfnpc/Qz/ms35Rw8a/0a56ePjX6lprBxnjtWPjtq6rnSG2k2c/J15bPJ68q1rRexD8GNx00tkG6ZL343cgyOxCLcYdE0jfVFxe7lbPeNdVq0DStti89hxfWfeD8ttFbWOURJz6ydKKN3lkPsOP4uZWCIuJGT5i3H+hXeVrjtuPjs1dA95PE6TRviokdJm/dJ9VlNI0xZ3+JzQBvyVoooPqGkf+1ammhY4HBrXi/pNjSM/V354vywLUhrEh0N2/67xnds0/CjD4UQsY+CGx/wK9t3JWBLjalHSd9UP0rvTNFG2oj9+xJ4bGG9HGuqfeKOVTbAenR9Wzf8eZcoTtJwING0Ec3iN1OJsV40G5xvN8Vz8CkZGjDMyANp+q40/H8fUIn+rLqA2ojG6EB8WLEvIsZkVNfhFCUixU3qqfmilS4goztdNByPsefKP0oG5rwaJV+eKErH+u1Zv9+KkvEUsd41rByE3TeEjjeMc7wWLlzGQ82pOXpXhVYSXWgsBeeL7/3gQcf/x8Nkfk8J+X6Sk03eseE2ZfX1HQFiDym5geWc/aNBYK9gEQfsi8NXhL9rfrsn7iwcDQt2Hg37o5IjP/iWFzmfogNz+jkWD+LcokTU8KfXrYgM1jesc0z9IBn3cY3dGbV8ylGsKPsxM50v0rcp6aeLOR7Sc8bwIHlCRZosnxzbHpAwPlzIiozfTS68taJhb/uWo9DYMQuFxn5BFE28gNq1jtXgNMvR6KgAu6Y7xeeyY+23ywXNwTkY+QWUfa1GCqgpaXZ1PnxOqf/VSuNTgWshlCDaH9FYtgTRYbfF3q8bjYbLRsTO62IxTEHs9jkGLtHxOXWz0vG6fSHVKIl87EblojGNlHM3Iz+bPHkZ+XY5TcPMm9eV6iMtlUqj4ALCPUBlCSowcGPMD+8i8uJyRRCVQUExqyCKh2EaI3rhfOOCLLs+OEbPka5DiV+e6o6gEBolYzL61qY2z3f4Ycf1gQviUfo3piB+XC/9MTTkuz43OlY9rm2X893gfOOxLVU67Trqoatxb/Sw3nALH9DovclljoQBbGFif5cSf3EQ5WDLEofzbH/a2LZh1Cbu+1IH5++nRTbsfDK296xaT6zb4gJxkHOOPU7nUVLjueE6R9c5OK7Plv6PEQ/UqvPj4yEfXRbMqun1afiAjeRr/cfcvARBEARBEARBEARBEARBEARBmA5SqZRDVKAzB5gr90FbYQZIc4F8xCAcEf4PaTg5zC4FuokAAAAASUVORK5CYII=",
  Ei = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, s] of t) n[r] = s
    return n
  }
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const At = typeof window < "u"
function vu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const X = Object.assign
function sr(e, t) {
  const n = {}
  for (const r in t) {
    const s = t[r]
    n[r] = Ne(s) ? s.map(e) : e(s)
  }
  return n
}
const Jt = () => {},
  Ne = Array.isArray,
  xu = /\/$/,
  Au = (e) => e.replace(xu, "")
function or(e, t, n = "/") {
  let r,
    s = {},
    o = "",
    i = ""
  const l = t.indexOf("#")
  let c = t.indexOf("?")
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = Cu(r ?? t, n)),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: i }
  )
}
function Ou(e, t) {
  const n = t.query ? e(t.query) : ""
  return t.path + (n && "?") + n + (t.hash || "")
}
function Ws(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/"
}
function Pu(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1
  return (
    r > -1 &&
    r === s &&
    It(t.matched[r], n.matched[s]) &&
    _i(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function It(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function _i(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!Su(e[n], t[n])) return !1
  return !0
}
function Su(e, t) {
  return Ne(e) ? Vs(e, t) : Ne(t) ? Vs(t, e) : e === t
}
function Vs(e, t) {
  return Ne(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t
}
function Cu(e, t) {
  if (e.startsWith("/")) return e
  if (!e) return t
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1]
  ;(s === ".." || s === ".") && r.push("")
  let o = n.length - 1,
    i,
    l
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") o > 1 && o--
      else break
  return (
    n.slice(0, o).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  )
}
var rn
;(function (e) {
  ;(e.pop = "pop"), (e.push = "push")
})(rn || (rn = {}))
var Zt
;(function (e) {
  ;(e.back = "back"), (e.forward = "forward"), (e.unknown = "")
})(Zt || (Zt = {}))
function Tu(e) {
  if (!e)
    if (At) {
      const t = document.querySelector("base")
      ;(e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""))
    } else e = "/"
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Au(e)
}
const Nu = /^[^#]+#/
function Fu(e, t) {
  return e.replace(Nu, "#") + t
}
function Lu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  }
}
const Kn = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Iu(e) {
  let t
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!s) return
    t = Lu(s, e)
  } else t = e
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function Ys(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const Ar = new Map()
function Bu(e, t) {
  Ar.set(e, t)
}
function Mu(e) {
  const t = Ar.get(e)
  return Ar.delete(e), t
}
let ju = () => location.protocol + "//" + location.host
function wi(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf("#")
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(l)
    return c[0] !== "/" && (c = "/" + c), Ws(c, "")
  }
  return Ws(n, e) + r + s
}
function ku(e, t, n, r) {
  let s = [],
    o = [],
    i = null
  const l = ({ state: p }) => {
    const b = wi(e, location),
      _ = n.value,
      w = t.value
    let F = 0
    if (p) {
      if (((n.value = b), (t.value = p), i && i === _)) {
        i = null
        return
      }
      F = w ? p.position - w.position : 0
    } else r(b)
    s.forEach((T) => {
      T(n.value, _, {
        delta: F,
        type: rn.pop,
        direction: F ? (F > 0 ? Zt.forward : Zt.back) : Zt.unknown,
      })
    })
  }
  function c() {
    i = n.value
  }
  function a(p) {
    s.push(p)
    const b = () => {
      const _ = s.indexOf(p)
      _ > -1 && s.splice(_, 1)
    }
    return o.push(b), b
  }
  function u() {
    const { history: p } = window
    p.state && p.replaceState(X({}, p.state, { scroll: Kn() }), "")
  }
  function d() {
    for (const p of o) p()
    ;(o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", u)
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: c, listen: a, destroy: d }
  )
}
function $s(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Kn() : null,
  }
}
function Hu(e) {
  const { history: t, location: n } = window,
    r = { value: wi(e, n) },
    s = { value: t.state }
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    )
  function o(c, a, u) {
    const d = e.indexOf("#"),
      p =
        d > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(d)) + c
          : ju() + e + c
    try {
      t[u ? "replaceState" : "pushState"](a, "", p), (s.value = a)
    } catch (b) {
      console.error(b), n[u ? "replace" : "assign"](p)
    }
  }
  function i(c, a) {
    const u = X({}, t.state, $s(s.value.back, c, s.value.forward, !0), a, {
      position: s.value.position,
    })
    o(c, u, !0), (r.value = c)
  }
  function l(c, a) {
    const u = X({}, s.value, t.state, { forward: c, scroll: Kn() })
    o(u.current, u, !0)
    const d = X({}, $s(r.value, c, null), { position: u.position + 1 }, a)
    o(c, d, !1), (r.value = c)
  }
  return { location: r, state: s, push: l, replace: i }
}
function Uu(e) {
  e = Tu(e)
  const t = Hu(e),
    n = ku(e, t.state, t.location, t.replace)
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o)
  }
  const s = X(
    { location: "", base: e, go: r, createHref: Fu.bind(null, e) },
    t,
    n
  )
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  )
}
function Du(e) {
  return typeof e == "string" || (e && typeof e == "object")
}
function Ri(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const Ge = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  vi = Symbol("")
var Xs
;(function (e) {
  ;(e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated")
})(Xs || (Xs = {}))
function Bt(e, t) {
  return X(new Error(), { type: e, [vi]: !0 }, t)
}
function Ke(e, t) {
  return e instanceof Error && vi in e && (t == null || !!(e.type & t))
}
const Js = "[^/]+?",
  zu = { sensitive: !1, strict: !1, start: !0, end: !0 },
  qu = /[.+*?^${}()[\]/\\]/g
function Ku(e, t) {
  const n = X({}, zu, t),
    r = []
  let s = n.start ? "^" : ""
  const o = []
  for (const a of e) {
    const u = a.length ? [] : [90]
    n.strict && !a.length && (s += "/")
    for (let d = 0; d < a.length; d++) {
      const p = a[d]
      let b = 40 + (n.sensitive ? 0.25 : 0)
      if (p.type === 0)
        d || (s += "/"), (s += p.value.replace(qu, "\\$&")), (b += 40)
      else if (p.type === 1) {
        const { value: _, repeatable: w, optional: F, regexp: T } = p
        o.push({ name: _, repeatable: w, optional: F })
        const L = T || Js
        if (L !== Js) {
          b += 10
          try {
            new RegExp(`(${L})`)
          } catch (S) {
            throw new Error(
              `Invalid custom RegExp for param "${_}" (${L}): ` + S.message
            )
          }
        }
        let H = w ? `((?:${L})(?:/(?:${L}))*)` : `(${L})`
        d || (H = F && a.length < 2 ? `(?:/${H})` : "/" + H),
          F && (H += "?"),
          (s += H),
          (b += 20),
          F && (b += -8),
          w && (b += -20),
          L === ".*" && (b += -50)
      }
      u.push(b)
    }
    r.push(u)
  }
  if (n.strict && n.end) {
    const a = r.length - 1
    r[a][r[a].length - 1] += 0.7000000000000001
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)")
  const i = new RegExp(s, n.sensitive ? "" : "i")
  function l(a) {
    const u = a.match(i),
      d = {}
    if (!u) return null
    for (let p = 1; p < u.length; p++) {
      const b = u[p] || "",
        _ = o[p - 1]
      d[_.name] = b && _.repeatable ? b.split("/") : b
    }
    return d
  }
  function c(a) {
    let u = "",
      d = !1
    for (const p of e) {
      ;(!d || !u.endsWith("/")) && (u += "/"), (d = !1)
      for (const b of p)
        if (b.type === 0) u += b.value
        else if (b.type === 1) {
          const { value: _, repeatable: w, optional: F } = b,
            T = _ in a ? a[_] : ""
          if (Ne(T) && !w)
            throw new Error(
              `Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`
            )
          const L = Ne(T) ? T.join("/") : T
          if (!L)
            if (F)
              p.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (d = !0))
            else throw new Error(`Missing required param "${_}"`)
          u += L
        }
    }
    return u || "/"
  }
  return { re: i, score: r, keys: o, parse: l, stringify: c }
}
function Wu(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n]
    if (r) return r
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 80
      ? 1
      : -1
    : 0
}
function Vu(e, t) {
  let n = 0
  const r = e.score,
    s = t.score
  for (; n < r.length && n < s.length; ) {
    const o = Wu(r[n], s[n])
    if (o) return o
    n++
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Zs(r)) return 1
    if (Zs(s)) return -1
  }
  return s.length - r.length
}
function Zs(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Yu = { type: 0, value: "" },
  $u = /[a-zA-Z0-9_]/
function Xu(e) {
  if (!e) return [[]]
  if (e === "/") return [[Yu]]
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`)
  function t(b) {
    throw new Error(`ERR (${n})/"${a}": ${b}`)
  }
  let n = 0,
    r = n
  const s = []
  let o
  function i() {
    o && s.push(o), (o = [])
  }
  let l = 0,
    c,
    a = "",
    u = ""
  function d() {
    a &&
      (n === 0
        ? o.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: a,
            regexp: u,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (a = ""))
  }
  function p() {
    a += c
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      ;(r = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        c === "/" ? (a && d(), i()) : c === ":" ? (d(), (n = 1)) : p()
        break
      case 4:
        p(), (n = r)
        break
      case 1:
        c === "("
          ? (n = 2)
          : $u.test(c)
          ? p()
          : (d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--)
        break
      case 2:
        c === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + c)
            : (n = 3)
          : (u += c)
        break
      case 3:
        d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (u = "")
        break
      default:
        t("Unknown state")
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${a}"`), d(), i(), s
}
function Ju(e, t, n) {
  const r = Ku(Xu(e.path), n),
    s = X(r, { record: e, parent: t, children: [], alias: [] })
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}
function Zu(e, t) {
  const n = [],
    r = new Map()
  t = eo({ strict: !1, end: !0, sensitive: !1 }, t)
  function s(u) {
    return r.get(u)
  }
  function o(u, d, p) {
    const b = !p,
      _ = Qu(u)
    _.aliasOf = p && p.record
    const w = eo(t, u),
      F = [_]
    if ("alias" in u) {
      const H = typeof u.alias == "string" ? [u.alias] : u.alias
      for (const S of H)
        F.push(
          X({}, _, {
            components: p ? p.record.components : _.components,
            path: S,
            aliasOf: p ? p.record : _,
          })
        )
    }
    let T, L
    for (const H of F) {
      const { path: S } = H
      if (d && S[0] !== "/") {
        const ne = d.record.path,
          V = ne[ne.length - 1] === "/" ? "" : "/"
        H.path = d.record.path + (S && V + S)
      }
      if (
        ((T = Ju(H, d, w)),
        p
          ? p.alias.push(T)
          : ((L = L || T),
            L !== T && L.alias.push(T),
            b && u.name && !Gs(T) && i(u.name)),
        _.children)
      ) {
        const ne = _.children
        for (let V = 0; V < ne.length; V++) o(ne[V], T, p && p.children[V])
      }
      ;(p = p || T),
        ((T.record.components && Object.keys(T.record.components).length) ||
          T.record.name ||
          T.record.redirect) &&
          c(T)
    }
    return L
      ? () => {
          i(L)
        }
      : Jt
  }
  function i(u) {
    if (Ri(u)) {
      const d = r.get(u)
      d &&
        (r.delete(u),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(i),
        d.alias.forEach(i))
    } else {
      const d = n.indexOf(u)
      d > -1 &&
        (n.splice(d, 1),
        u.record.name && r.delete(u.record.name),
        u.children.forEach(i),
        u.alias.forEach(i))
    }
  }
  function l() {
    return n
  }
  function c(u) {
    let d = 0
    for (
      ;
      d < n.length &&
      Vu(u, n[d]) >= 0 &&
      (u.record.path !== n[d].record.path || !xi(u, n[d]));

    )
      d++
    n.splice(d, 0, u), u.record.name && !Gs(u) && r.set(u.record.name, u)
  }
  function a(u, d) {
    let p,
      b = {},
      _,
      w
    if ("name" in u && u.name) {
      if (((p = r.get(u.name)), !p)) throw Bt(1, { location: u })
      ;(w = p.record.name),
        (b = X(
          Qs(
            d.params,
            p.keys.filter((L) => !L.optional).map((L) => L.name)
          ),
          u.params &&
            Qs(
              u.params,
              p.keys.map((L) => L.name)
            )
        )),
        (_ = p.stringify(b))
    } else if ("path" in u)
      (_ = u.path),
        (p = n.find((L) => L.re.test(_))),
        p && ((b = p.parse(_)), (w = p.record.name))
    else {
      if (((p = d.name ? r.get(d.name) : n.find((L) => L.re.test(d.path))), !p))
        throw Bt(1, { location: u, currentLocation: d })
      ;(w = p.record.name),
        (b = X({}, d.params, u.params)),
        (_ = p.stringify(b))
    }
    const F = []
    let T = p
    for (; T; ) F.unshift(T.record), (T = T.parent)
    return { name: w, path: _, params: b, matched: F, meta: ea(F) }
  }
  return (
    e.forEach((u) => o(u)),
    {
      addRoute: o,
      resolve: a,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: s,
    }
  )
}
function Qs(e, t) {
  const n = {}
  for (const r of t) r in e && (n[r] = e[r])
  return n
}
function Qu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Gu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  }
}
function Gu(e) {
  const t = {},
    n = e.props || !1
  if ("component" in e) t.default = n
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n
  return t
}
function Gs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function ea(e) {
  return e.reduce((t, n) => X(t, n.meta), {})
}
function eo(e, t) {
  const n = {}
  for (const r in e) n[r] = r in t ? t[r] : e[r]
  return n
}
function xi(e, t) {
  return t.children.some((n) => n === e || xi(e, n))
}
const Ai = /#/g,
  ta = /&/g,
  na = /\//g,
  ra = /=/g,
  sa = /\?/g,
  Oi = /\+/g,
  oa = /%5B/g,
  ia = /%5D/g,
  Pi = /%5E/g,
  la = /%60/g,
  Si = /%7B/g,
  ca = /%7C/g,
  Ci = /%7D/g,
  ua = /%20/g
function Qr(e) {
  return encodeURI("" + e)
    .replace(ca, "|")
    .replace(oa, "[")
    .replace(ia, "]")
}
function aa(e) {
  return Qr(e).replace(Si, "{").replace(Ci, "}").replace(Pi, "^")
}
function Or(e) {
  return Qr(e)
    .replace(Oi, "%2B")
    .replace(ua, "+")
    .replace(Ai, "%23")
    .replace(ta, "%26")
    .replace(la, "`")
    .replace(Si, "{")
    .replace(Ci, "}")
    .replace(Pi, "^")
}
function fa(e) {
  return Or(e).replace(ra, "%3D")
}
function da(e) {
  return Qr(e).replace(Ai, "%23").replace(sa, "%3F")
}
function ha(e) {
  return e == null ? "" : da(e).replace(na, "%2F")
}
function Cn(e) {
  try {
    return decodeURIComponent("" + e)
  } catch {}
  return "" + e
}
function pa(e) {
  const t = {}
  if (e === "" || e === "?") return t
  const r = (e[0] === "?" ? e.slice(1) : e).split("&")
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(Oi, " "),
      i = o.indexOf("="),
      l = Cn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : Cn(o.slice(i + 1))
    if (l in t) {
      let a = t[l]
      Ne(a) || (a = t[l] = [a]), a.push(c)
    } else t[l] = c
  }
  return t
}
function to(e) {
  let t = ""
  for (let n in e) {
    const r = e[n]
    if (((n = fa(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n)
      continue
    }
    ;(Ne(r) ? r.map((o) => o && Or(o)) : [r && Or(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o))
    })
  }
  return t
}
function ma(e) {
  const t = {}
  for (const n in e) {
    const r = e[n]
    r !== void 0 &&
      (t[n] = Ne(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r)
  }
  return t
}
const ga = Symbol(""),
  no = Symbol(""),
  Gr = Symbol(""),
  Ti = Symbol(""),
  Pr = Symbol("")
function Kt() {
  let e = []
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r)
        s > -1 && e.splice(s, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function nt(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || [])
  return () =>
    new Promise((i, l) => {
      const c = (d) => {
          d === !1
            ? l(Bt(4, { from: n, to: t }))
            : d instanceof Error
            ? l(d)
            : Du(d)
            ? l(Bt(2, { from: t, to: d }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof d == "function" &&
                o.push(d),
              i())
        },
        a = e.call(r && r.instances[s], t, n, c)
      let u = Promise.resolve(a)
      e.length < 3 && (u = u.then(c)), u.catch((d) => l(d))
    })
}
function ir(e, t, n, r) {
  const s = []
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i]
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (ya(l)) {
          const a = (l.__vccOpts || l)[t]
          a && s.push(nt(a, n, r, o, i))
        } else {
          let c = l()
          s.push(() =>
            c.then((a) => {
              if (!a)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                )
              const u = vu(a) ? a.default : a
              o.components[i] = u
              const p = (u.__vccOpts || u)[t]
              return p && nt(p, n, r, o, i)()
            })
          )
        }
    }
  return s
}
function ya(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  )
}
function ro(e) {
  const t = Ye(Gr),
    n = Ye(Ti),
    r = Pe(() => t.resolve(ht(e.to))),
    s = Pe(() => {
      const { matched: c } = r.value,
        { length: a } = c,
        u = c[a - 1],
        d = n.matched
      if (!u || !d.length) return -1
      const p = d.findIndex(It.bind(null, u))
      if (p > -1) return p
      const b = so(c[a - 2])
      return a > 1 && so(u) === b && d[d.length - 1].path !== b
        ? d.findIndex(It.bind(null, c[a - 2]))
        : p
    }),
    o = Pe(() => s.value > -1 && wa(n.params, r.value.params)),
    i = Pe(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        _i(n.params, r.value.params)
    )
  function l(c = {}) {
    return _a(c)
      ? t[ht(e.replace) ? "replace" : "push"](ht(e.to)).catch(Jt)
      : Promise.resolve()
  }
  return {
    route: r,
    href: Pe(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  }
}
const ba = Go({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ro,
    setup(e, { slots: t }) {
      const n = Mn(ro(e)),
        { options: r } = Ye(Gr),
        s = Pe(() => ({
          [oo(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [oo(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }))
      return () => {
        const o = t.default && t.default(n)
        return e.custom
          ? o
          : yi(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o
            )
      }
    },
  }),
  Ea = ba
function _a(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target")
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function wa(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n]
    if (typeof r == "string") {
      if (r !== s) return !1
    } else if (!Ne(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1
  }
  return !0
}
function so(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ""
}
const oo = (e, t, n) => e ?? t ?? n,
  Ra = Go({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ye(Pr),
        s = Pe(() => e.route || r.value),
        o = Ye(no, 0),
        i = Pe(() => {
          let a = ht(o)
          const { matched: u } = s.value
          let d
          for (; (d = u[a]) && !d.components; ) a++
          return a
        }),
        l = Pe(() => s.value.matched[i.value])
      En(
        no,
        Pe(() => i.value + 1)
      ),
        En(ga, l),
        En(Pr, s)
      const c = Ae()
      return (
        yn(
          () => [c.value, l.value, e.name],
          ([a, u, d], [p, b, _]) => {
            u &&
              ((u.instances[d] = a),
              b &&
                b !== u &&
                a &&
                a === p &&
                (u.leaveGuards.size || (u.leaveGuards = b.leaveGuards),
                u.updateGuards.size || (u.updateGuards = b.updateGuards))),
              a &&
                u &&
                (!b || !It(u, b) || !p) &&
                (u.enterCallbacks[d] || []).forEach((w) => w(a))
          },
          { flush: "post" }
        ),
        () => {
          const a = s.value,
            u = e.name,
            d = l.value,
            p = d && d.components[u]
          if (!p) return io(n.default, { Component: p, route: a })
          const b = d.props[u],
            _ = b
              ? b === !0
                ? a.params
                : typeof b == "function"
                ? b(a)
                : b
              : null,
            F = yi(
              p,
              X({}, _, t, {
                onVnodeUnmounted: (T) => {
                  T.component.isUnmounted && (d.instances[u] = null)
                },
                ref: c,
              })
            )
          return io(n.default, { Component: F, route: a }) || F
        }
      )
    },
  })
function io(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const Ni = Ra
function va(e) {
  const t = Zu(e.routes, e),
    n = e.parseQuery || pa,
    r = e.stringifyQuery || to,
    s = e.history,
    o = Kt(),
    i = Kt(),
    l = Kt(),
    c = Il(Ge)
  let a = Ge
  At &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual")
  const u = sr.bind(null, (E) => "" + E),
    d = sr.bind(null, ha),
    p = sr.bind(null, Cn)
  function b(E, N) {
    let P, B
    return (
      Ri(E) ? ((P = t.getRecordMatcher(E)), (B = N)) : (B = E), t.addRoute(B, P)
    )
  }
  function _(E) {
    const N = t.getRecordMatcher(E)
    N && t.removeRoute(N)
  }
  function w() {
    return t.getRoutes().map((E) => E.record)
  }
  function F(E) {
    return !!t.getRecordMatcher(E)
  }
  function T(E, N) {
    if (((N = X({}, N || c.value)), typeof E == "string")) {
      const m = or(n, E, N.path),
        g = t.resolve({ path: m.path }, N),
        R = s.createHref(m.fullPath)
      return X(m, g, {
        params: p(g.params),
        hash: Cn(m.hash),
        redirectedFrom: void 0,
        href: R,
      })
    }
    let P
    if ("path" in E) P = X({}, E, { path: or(n, E.path, N.path).path })
    else {
      const m = X({}, E.params)
      for (const g in m) m[g] == null && delete m[g]
      ;(P = X({}, E, { params: d(m) })), (N.params = d(N.params))
    }
    const B = t.resolve(P, N),
      $ = E.hash || ""
    B.params = u(p(B.params))
    const f = Ou(r, X({}, E, { hash: aa($), path: B.path })),
      h = s.createHref(f)
    return X(
      { fullPath: f, hash: $, query: r === to ? ma(E.query) : E.query || {} },
      B,
      { redirectedFrom: void 0, href: h }
    )
  }
  function L(E) {
    return typeof E == "string" ? or(n, E, c.value.path) : X({}, E)
  }
  function H(E, N) {
    if (a !== E) return Bt(8, { from: N, to: E })
  }
  function S(E) {
    return we(E)
  }
  function ne(E) {
    return S(X(L(E), { replace: !0 }))
  }
  function V(E) {
    const N = E.matched[E.matched.length - 1]
    if (N && N.redirect) {
      const { redirect: P } = N
      let B = typeof P == "function" ? P(E) : P
      return (
        typeof B == "string" &&
          ((B = B.includes("?") || B.includes("#") ? (B = L(B)) : { path: B }),
          (B.params = {})),
        X(
          { query: E.query, hash: E.hash, params: "path" in B ? {} : E.params },
          B
        )
      )
    }
  }
  function we(E, N) {
    const P = (a = T(E)),
      B = c.value,
      $ = E.state,
      f = E.force,
      h = E.replace === !0,
      m = V(P)
    if (m)
      return we(
        X(L(m), {
          state: typeof m == "object" ? X({}, $, m.state) : $,
          force: f,
          replace: h,
        }),
        N || P
      )
    const g = P
    g.redirectedFrom = N
    let R
    return (
      !f && Pu(r, B, P) && ((R = Bt(16, { to: g, from: B })), Ie(B, B, !0, !1)),
      (R ? Promise.resolve(R) : Fe(g, B))
        .catch((v) => (Ke(v) ? (Ke(v, 2) ? v : Ze(v)) : Y(v, g, B)))
        .then((v) => {
          if (v) {
            if (Ke(v, 2))
              return we(
                X({ replace: h }, L(v.to), {
                  state: typeof v.to == "object" ? X({}, $, v.to.state) : $,
                  force: f,
                }),
                N || g
              )
          } else v = it(g, B, !0, h, $)
          return Je(g, B, v), v
        })
    )
  }
  function ze(E, N) {
    const P = H(E, N)
    return P ? Promise.reject(P) : Promise.resolve()
  }
  function bt(E) {
    const N = wt.values().next().value
    return N && typeof N.runWithContext == "function"
      ? N.runWithContext(E)
      : E()
  }
  function Fe(E, N) {
    let P
    const [B, $, f] = xa(E, N)
    P = ir(B.reverse(), "beforeRouteLeave", E, N)
    for (const m of B)
      m.leaveGuards.forEach((g) => {
        P.push(nt(g, E, N))
      })
    const h = ze.bind(null, E, N)
    return (
      P.push(h),
      ae(P)
        .then(() => {
          P = []
          for (const m of o.list()) P.push(nt(m, E, N))
          return P.push(h), ae(P)
        })
        .then(() => {
          P = ir($, "beforeRouteUpdate", E, N)
          for (const m of $)
            m.updateGuards.forEach((g) => {
              P.push(nt(g, E, N))
            })
          return P.push(h), ae(P)
        })
        .then(() => {
          P = []
          for (const m of f)
            if (m.beforeEnter)
              if (Ne(m.beforeEnter))
                for (const g of m.beforeEnter) P.push(nt(g, E, N))
              else P.push(nt(m.beforeEnter, E, N))
          return P.push(h), ae(P)
        })
        .then(
          () => (
            E.matched.forEach((m) => (m.enterCallbacks = {})),
            (P = ir(f, "beforeRouteEnter", E, N)),
            P.push(h),
            ae(P)
          )
        )
        .then(() => {
          P = []
          for (const m of i.list()) P.push(nt(m, E, N))
          return P.push(h), ae(P)
        })
        .catch((m) => (Ke(m, 8) ? m : Promise.reject(m)))
    )
  }
  function Je(E, N, P) {
    l.list().forEach((B) => bt(() => B(E, N, P)))
  }
  function it(E, N, P, B, $) {
    const f = H(E, N)
    if (f) return f
    const h = N === Ge,
      m = At ? history.state : {}
    P &&
      (B || h
        ? s.replace(E.fullPath, X({ scroll: h && m && m.scroll }, $))
        : s.push(E.fullPath, $)),
      (c.value = E),
      Ie(E, N, P, h),
      Ze()
  }
  let Le
  function Ut() {
    Le ||
      (Le = s.listen((E, N, P) => {
        if (!cn.listening) return
        const B = T(E),
          $ = V(B)
        if ($) {
          we(X($, { replace: !0 }), B).catch(Jt)
          return
        }
        a = B
        const f = c.value
        At && Bu(Ys(f.fullPath, P.delta), Kn()),
          Fe(B, f)
            .catch((h) =>
              Ke(h, 12)
                ? h
                : Ke(h, 2)
                ? (we(h.to, B)
                    .then((m) => {
                      Ke(m, 20) && !P.delta && P.type === rn.pop && s.go(-1, !1)
                    })
                    .catch(Jt),
                  Promise.reject())
                : (P.delta && s.go(-P.delta, !1), Y(h, B, f))
            )
            .then((h) => {
              ;(h = h || it(B, f, !1)),
                h &&
                  (P.delta && !Ke(h, 8)
                    ? s.go(-P.delta, !1)
                    : P.type === rn.pop && Ke(h, 20) && s.go(-1, !1)),
                Je(B, f, h)
            })
            .catch(Jt)
      }))
  }
  let Et = Kt(),
    ie = Kt(),
    Z
  function Y(E, N, P) {
    Ze(E)
    const B = ie.list()
    return (
      B.length ? B.forEach(($) => $(E, N, P)) : console.error(E),
      Promise.reject(E)
    )
  }
  function qe() {
    return Z && c.value !== Ge
      ? Promise.resolve()
      : new Promise((E, N) => {
          Et.add([E, N])
        })
  }
  function Ze(E) {
    return (
      Z ||
        ((Z = !E),
        Ut(),
        Et.list().forEach(([N, P]) => (E ? P(E) : N())),
        Et.reset()),
      E
    )
  }
  function Ie(E, N, P, B) {
    const { scrollBehavior: $ } = e
    if (!At || !$) return Promise.resolve()
    const f =
      (!P && Mu(Ys(E.fullPath, 0))) ||
      ((B || !P) && history.state && history.state.scroll) ||
      null
    return Vo()
      .then(() => $(E, N, f))
      .then((h) => h && Iu(h))
      .catch((h) => Y(h, E, N))
  }
  const me = (E) => s.go(E)
  let _t
  const wt = new Set(),
    cn = {
      currentRoute: c,
      listening: !0,
      addRoute: b,
      removeRoute: _,
      hasRoute: F,
      getRoutes: w,
      resolve: T,
      options: e,
      push: S,
      replace: ne,
      go: me,
      back: () => me(-1),
      forward: () => me(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: ie.add,
      isReady: qe,
      install(E) {
        const N = this
        E.component("RouterLink", Ea),
          E.component("RouterView", Ni),
          (E.config.globalProperties.$router = N),
          Object.defineProperty(E.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => ht(c),
          }),
          At &&
            !_t &&
            c.value === Ge &&
            ((_t = !0), S(s.location).catch(($) => {}))
        const P = {}
        for (const $ in Ge)
          Object.defineProperty(P, $, { get: () => c.value[$], enumerable: !0 })
        E.provide(Gr, N), E.provide(Ti, ko(P)), E.provide(Pr, c)
        const B = E.unmount
        wt.add(E),
          (E.unmount = function () {
            wt.delete(E),
              wt.size < 1 &&
                ((a = Ge),
                Le && Le(),
                (Le = null),
                (c.value = Ge),
                (_t = !1),
                (Z = !1)),
              B()
          })
      },
    }
  function ae(E) {
    return E.reduce((N, P) => N.then(() => bt(P)), Promise.resolve())
  }
  return cn
}
function xa(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length)
  for (let i = 0; i < o; i++) {
    const l = t.matched[i]
    l && (e.matched.find((a) => It(a, l)) ? r.push(l) : n.push(l))
    const c = e.matched[i]
    c && (t.matched.find((a) => It(a, c)) || s.push(c))
  }
  return [n, r, s]
}
const Aa = { class: "wrapper" },
  Oa = {
    __name: "App",
    setup(e) {
      return (t, n) => (le(), ce("div", Aa, [ye(ht(Ni))]))
    },
  },
  Pa = Ei(Oa, [["__scopeId", "data-v-cfe6e029"]])
function Fi(e, t) {
  return function () {
    return e.apply(t, arguments)
  }
}
const { toString: Sa } = Object.prototype,
  { getPrototypeOf: es } = Object,
  Wn = ((e) => (t) => {
    const n = Sa.call(t)
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
  })(Object.create(null)),
  De = (e) => ((e = e.toLowerCase()), (t) => Wn(t) === e),
  Vn = (e) => (t) => typeof t === e,
  { isArray: Ht } = Array,
  sn = Vn("undefined")
function Ca(e) {
  return (
    e !== null &&
    !sn(e) &&
    e.constructor !== null &&
    !sn(e.constructor) &&
    Re(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  )
}
const Li = De("ArrayBuffer")
function Ta(e) {
  let t
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Li(e.buffer)),
    t
  )
}
const Na = Vn("string"),
  Re = Vn("function"),
  Ii = Vn("number"),
  Yn = (e) => e !== null && typeof e == "object",
  Fa = (e) => e === !0 || e === !1,
  wn = (e) => {
    if (Wn(e) !== "object") return !1
    const t = es(e)
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    )
  },
  La = De("Date"),
  Ia = De("File"),
  Ba = De("Blob"),
  Ma = De("FileList"),
  ja = (e) => Yn(e) && Re(e.pipe),
  ka = (e) => {
    let t
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Re(e.append) &&
          ((t = Wn(e)) === "formdata" ||
            (t === "object" &&
              Re(e.toString) &&
              e.toString() === "[object FormData]"))))
    )
  },
  Ha = De("URLSearchParams"),
  Ua = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
function on(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return
  let r, s
  if ((typeof e != "object" && (e = [e]), Ht(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e)
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length
    let l
    for (r = 0; r < i; r++) (l = o[r]), t.call(null, e[l], l, e)
  }
}
function Bi(e, t) {
  t = t.toLowerCase()
  const n = Object.keys(e)
  let r = n.length,
    s
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s
  return null
}
const Mi =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  ji = (e) => !sn(e) && e !== Mi
function Sr() {
  const { caseless: e } = (ji(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && Bi(t, s)) || s
      wn(t[o]) && wn(r)
        ? (t[o] = Sr(t[o], r))
        : wn(r)
        ? (t[o] = Sr({}, r))
        : Ht(r)
        ? (t[o] = r.slice())
        : (t[o] = r)
    }
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && on(arguments[r], n)
  return t
}
const Da = (e, t, n, { allOwnKeys: r } = {}) => (
    on(
      t,
      (s, o) => {
        n && Re(s) ? (e[o] = Fi(s, n)) : (e[o] = s)
      },
      { allOwnKeys: r }
    ),
    e
  ),
  za = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  qa = (e, t, n, r) => {
    ;(e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n)
  },
  Ka = (e, t, n, r) => {
    let s, o, i
    const l = {}
    if (((t = t || {}), e == null)) return t
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        (i = s[o]), (!r || r(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0))
      e = n !== !1 && es(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype)
    return t
  },
  Wa = (e, t, n) => {
    ;(e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length)
    const r = e.indexOf(t, n)
    return r !== -1 && r === n
  },
  Va = (e) => {
    if (!e) return null
    if (Ht(e)) return e
    let t = e.length
    if (!Ii(t)) return null
    const n = new Array(t)
    for (; t-- > 0; ) n[t] = e[t]
    return n
  },
  Ya = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && es(Uint8Array)),
  $a = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e)
    let s
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value
      t.call(e, o[0], o[1])
    }
  },
  Xa = (e, t) => {
    let n
    const r = []
    for (; (n = e.exec(t)) !== null; ) r.push(n)
    return r
  },
  Ja = De("HTMLFormElement"),
  Za = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s
    }),
  lo = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Qa = De("RegExp"),
  ki = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {}
    on(n, (s, o) => {
      let i
      ;(i = t(s, o, e)) !== !1 && (r[o] = i || s)
    }),
      Object.defineProperties(e, r)
  },
  Ga = (e) => {
    ki(e, (t, n) => {
      if (Re(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1
      const r = e[n]
      if (Re(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1
          return
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'")
          })
      }
    })
  },
  ef = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0
        })
      }
    return Ht(e) ? r(e) : r(String(e).split(t)), n
  },
  tf = () => {},
  nf = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  lr = "abcdefghijklmnopqrstuvwxyz",
  co = "0123456789",
  Hi = { DIGIT: co, ALPHA: lr, ALPHA_DIGIT: lr + lr.toUpperCase() + co },
  rf = (e = 16, t = Hi.ALPHA_DIGIT) => {
    let n = ""
    const { length: r } = t
    for (; e--; ) n += t[(Math.random() * r) | 0]
    return n
  }
function sf(e) {
  return !!(
    e &&
    Re(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  )
}
const of = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (Yn(r)) {
          if (t.indexOf(r) >= 0) return
          if (!("toJSON" in r)) {
            t[s] = r
            const o = Ht(r) ? [] : {}
            return (
              on(r, (i, l) => {
                const c = n(i, s + 1)
                !sn(c) && (o[l] = c)
              }),
              (t[s] = void 0),
              o
            )
          }
        }
        return r
      }
    return n(e, 0)
  },
  lf = De("AsyncFunction"),
  cf = (e) => e && (Yn(e) || Re(e)) && Re(e.then) && Re(e.catch),
  y = {
    isArray: Ht,
    isArrayBuffer: Li,
    isBuffer: Ca,
    isFormData: ka,
    isArrayBufferView: Ta,
    isString: Na,
    isNumber: Ii,
    isBoolean: Fa,
    isObject: Yn,
    isPlainObject: wn,
    isUndefined: sn,
    isDate: La,
    isFile: Ia,
    isBlob: Ba,
    isRegExp: Qa,
    isFunction: Re,
    isStream: ja,
    isURLSearchParams: Ha,
    isTypedArray: Ya,
    isFileList: Ma,
    forEach: on,
    merge: Sr,
    extend: Da,
    trim: Ua,
    stripBOM: za,
    inherits: qa,
    toFlatObject: Ka,
    kindOf: Wn,
    kindOfTest: De,
    endsWith: Wa,
    toArray: Va,
    forEachEntry: $a,
    matchAll: Xa,
    isHTMLForm: Ja,
    hasOwnProperty: lo,
    hasOwnProp: lo,
    reduceDescriptors: ki,
    freezeMethods: Ga,
    toObjectSet: ef,
    toCamelCase: Za,
    noop: tf,
    toFiniteNumber: nf,
    findKey: Bi,
    global: Mi,
    isContextDefined: ji,
    ALPHABET: Hi,
    generateString: rf,
    isSpecCompliantForm: sf,
    toJSONObject: of,
    isAsyncFn: lf,
    isThenable: cf,
  }
function q(e, t, n, r, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && (this.response = s)
}
y.inherits(q, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: y.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    }
  },
})
const Ui = q.prototype,
  Di = {}
;[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Di[e] = { value: e }
})
Object.defineProperties(q, Di)
Object.defineProperty(Ui, "isAxiosError", { value: !0 })
q.from = (e, t, n, r, s, o) => {
  const i = Object.create(Ui)
  return (
    y.toFlatObject(
      e,
      i,
      function (c) {
        return c !== Error.prototype
      },
      (l) => l !== "isAxiosError"
    ),
    q.call(i, e.message, t, n, r, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  )
}
const uf = null
function Cr(e) {
  return y.isPlainObject(e) || y.isArray(e)
}
function zi(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e
}
function uo(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return (s = zi(s)), !n && o ? "[" + s + "]" : s
        })
        .join(n ? "." : "")
    : t
}
function af(e) {
  return y.isArray(e) && !e.some(Cr)
}
const ff = y.toFlatObject(y, {}, null, function (t) {
  return /^is[A-Z]/.test(t)
})
function $n(e, t, n) {
  if (!y.isObject(e)) throw new TypeError("target must be an object")
  ;(t = t || new FormData()),
    (n = y.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (w, F) {
        return !y.isUndefined(F[w])
      }
    ))
  const r = n.metaTokens,
    s = n.visitor || u,
    o = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && y.isSpecCompliantForm(t)
  if (!y.isFunction(s)) throw new TypeError("visitor must be a function")
  function a(_) {
    if (_ === null) return ""
    if (y.isDate(_)) return _.toISOString()
    if (!c && y.isBlob(_))
      throw new q("Blob is not supported. Use a Buffer instead.")
    return y.isArrayBuffer(_) || y.isTypedArray(_)
      ? c && typeof Blob == "function"
        ? new Blob([_])
        : Buffer.from(_)
      : _
  }
  function u(_, w, F) {
    let T = _
    if (_ && !F && typeof _ == "object") {
      if (y.endsWith(w, "{}"))
        (w = r ? w : w.slice(0, -2)), (_ = JSON.stringify(_))
      else if (
        (y.isArray(_) && af(_)) ||
        ((y.isFileList(_) || y.endsWith(w, "[]")) && (T = y.toArray(_)))
      )
        return (
          (w = zi(w)),
          T.forEach(function (H, S) {
            !(y.isUndefined(H) || H === null) &&
              t.append(
                i === !0 ? uo([w], S, o) : i === null ? w : w + "[]",
                a(H)
              )
          }),
          !1
        )
    }
    return Cr(_) ? !0 : (t.append(uo(F, w, o), a(_)), !1)
  }
  const d = [],
    p = Object.assign(ff, {
      defaultVisitor: u,
      convertValue: a,
      isVisitable: Cr,
    })
  function b(_, w) {
    if (!y.isUndefined(_)) {
      if (d.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + w.join("."))
      d.push(_),
        y.forEach(_, function (T, L) {
          ;(!(y.isUndefined(T) || T === null) &&
            s.call(t, T, y.isString(L) ? L.trim() : L, w, p)) === !0 &&
            b(T, w ? w.concat(L) : [L])
        }),
        d.pop()
    }
  }
  if (!y.isObject(e)) throw new TypeError("data must be an object")
  return b(e), t
}
function ao(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  }
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r]
  })
}
function ts(e, t) {
  ;(this._pairs = []), e && $n(e, this, t)
}
const qi = ts.prototype
qi.append = function (t, n) {
  this._pairs.push([t, n])
}
qi.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, ao)
      }
    : ao
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1])
    }, "")
    .join("&")
}
function df(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]")
}
function Ki(e, t, n) {
  if (!t) return e
  const r = (n && n.encode) || df,
    s = n && n.serialize
  let o
  if (
    (s
      ? (o = s(t, n))
      : (o = y.isURLSearchParams(t) ? t.toString() : new ts(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#")
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o)
  }
  return e
}
class hf {
  constructor() {
    this.handlers = []
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    )
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null)
  }
  clear() {
    this.handlers && (this.handlers = [])
  }
  forEach(t) {
    y.forEach(this.handlers, function (r) {
      r !== null && t(r)
    })
  }
}
const fo = hf,
  Wi = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  pf = typeof URLSearchParams < "u" ? URLSearchParams : ts,
  mf = typeof FormData < "u" ? FormData : null,
  gf = typeof Blob < "u" ? Blob : null,
  yf = {
    isBrowser: !0,
    classes: { URLSearchParams: pf, FormData: mf, Blob: gf },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Vi = typeof window < "u" && typeof document < "u",
  bf = ((e) => Vi && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
    typeof navigator < "u" && navigator.product
  ),
  Ef =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  _f = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Vi,
        hasStandardBrowserEnv: bf,
        hasStandardBrowserWebWorkerEnv: Ef,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  He = { ..._f, ...yf }
function wf(e, t) {
  return $n(
    e,
    new He.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, s, o) {
          return He.isNode && y.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments)
        },
      },
      t
    )
  )
}
function Rf(e) {
  return y
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]))
}
function vf(e) {
  const t = {},
    n = Object.keys(e)
  let r
  const s = n.length
  let o
  for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o])
  return t
}
function Yi(e) {
  function t(n, r, s, o) {
    let i = n[o++]
    const l = Number.isFinite(+i),
      c = o >= n.length
    return (
      (i = !i && y.isArray(s) ? s.length : i),
      c
        ? (y.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !l)
        : ((!s[i] || !y.isObject(s[i])) && (s[i] = []),
          t(n, r, s[i], o) && y.isArray(s[i]) && (s[i] = vf(s[i])),
          !l)
    )
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const n = {}
    return (
      y.forEachEntry(e, (r, s) => {
        t(Rf(r), s, n, 0)
      }),
      n
    )
  }
  return null
}
function xf(e, t, n) {
  if (y.isString(e))
    try {
      return (t || JSON.parse)(e), y.trim(e)
    } catch (r) {
      if (r.name !== "SyntaxError") throw r
    }
  return (n || JSON.stringify)(e)
}
const ns = {
  transitional: Wi,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = y.isObject(t)
      if ((o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)))
        return s && s ? JSON.stringify(Yi(t)) : t
      if (
        y.isArrayBuffer(t) ||
        y.isBuffer(t) ||
        y.isStream(t) ||
        y.isFile(t) ||
        y.isBlob(t)
      )
        return t
      if (y.isArrayBufferView(t)) return t.buffer
      if (y.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        )
      let l
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return wf(t, this.formSerializer).toString()
        if ((l = y.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData
          return $n(l ? { "files[]": t } : t, c && new c(), this.formSerializer)
        }
      }
      return o || s ? (n.setContentType("application/json", !1), xf(t)) : t
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || ns.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json"
      if (t && y.isString(t) && ((r && !this.responseType) || s)) {
        const i = !(n && n.silentJSONParsing) && s
        try {
          return JSON.parse(t)
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? q.from(l, q.ERR_BAD_RESPONSE, this, null, this.response)
              : l
        }
      }
      return t
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: He.classes.FormData, Blob: He.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
}
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ns.headers[e] = {}
})
const rs = ns,
  Af = y.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Of = (e) => {
    const t = {}
    let n, r, s
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            ;(s = i.indexOf(":")),
              (n = i.substring(0, s).trim().toLowerCase()),
              (r = i.substring(s + 1).trim()),
              !(!n || (t[n] && Af[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r))
          }),
      t
    )
  },
  ho = Symbol("internals")
function Wt(e) {
  return e && String(e).trim().toLowerCase()
}
function Rn(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(Rn) : String(e)
}
function Pf(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
  let r
  for (; (r = n.exec(e)); ) t[r[1]] = r[2]
  return t
}
const Sf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
function cr(e, t, n, r, s) {
  if (y.isFunction(r)) return r.call(this, t, n)
  if ((s && (t = n), !!y.isString(t))) {
    if (y.isString(r)) return t.indexOf(r) !== -1
    if (y.isRegExp(r)) return r.test(t)
  }
}
function Cf(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}
function Tf(e, t) {
  const n = y.toCamelCase(" " + t)
  ;["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, i) {
        return this[r].call(this, t, s, o, i)
      },
      configurable: !0,
    })
  })
}
class Xn {
  constructor(t) {
    t && this.set(t)
  }
  set(t, n, r) {
    const s = this
    function o(l, c, a) {
      const u = Wt(c)
      if (!u) throw new Error("header name must be a non-empty string")
      const d = y.findKey(s, u)
      ;(!d || s[d] === void 0 || a === !0 || (a === void 0 && s[d] !== !1)) &&
        (s[d || c] = Rn(l))
    }
    const i = (l, c) => y.forEach(l, (a, u) => o(a, u, c))
    return (
      y.isPlainObject(t) || t instanceof this.constructor
        ? i(t, n)
        : y.isString(t) && (t = t.trim()) && !Sf(t)
        ? i(Of(t), n)
        : t != null && o(n, t, r),
      this
    )
  }
  get(t, n) {
    if (((t = Wt(t)), t)) {
      const r = y.findKey(this, t)
      if (r) {
        const s = this[r]
        if (!n) return s
        if (n === !0) return Pf(s)
        if (y.isFunction(n)) return n.call(this, s, r)
        if (y.isRegExp(n)) return n.exec(s)
        throw new TypeError("parser must be boolean|regexp|function")
      }
    }
  }
  has(t, n) {
    if (((t = Wt(t)), t)) {
      const r = y.findKey(this, t)
      return !!(r && this[r] !== void 0 && (!n || cr(this, this[r], r, n)))
    }
    return !1
  }
  delete(t, n) {
    const r = this
    let s = !1
    function o(i) {
      if (((i = Wt(i)), i)) {
        const l = y.findKey(r, i)
        l && (!n || cr(r, r[l], l, n)) && (delete r[l], (s = !0))
      }
    }
    return y.isArray(t) ? t.forEach(o) : o(t), s
  }
  clear(t) {
    const n = Object.keys(this)
    let r = n.length,
      s = !1
    for (; r--; ) {
      const o = n[r]
      ;(!t || cr(this, this[o], o, t, !0)) && (delete this[o], (s = !0))
    }
    return s
  }
  normalize(t) {
    const n = this,
      r = {}
    return (
      y.forEach(this, (s, o) => {
        const i = y.findKey(r, o)
        if (i) {
          ;(n[i] = Rn(s)), delete n[o]
          return
        }
        const l = t ? Cf(o) : String(o).trim()
        l !== o && delete n[o], (n[l] = Rn(s)), (r[l] = !0)
      }),
      this
    )
  }
  concat(...t) {
    return this.constructor.concat(this, ...t)
  }
  toJSON(t) {
    const n = Object.create(null)
    return (
      y.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && y.isArray(r) ? r.join(", ") : r)
      }),
      n
    )
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders"
  }
  static from(t) {
    return t instanceof this ? t : new this(t)
  }
  static concat(t, ...n) {
    const r = new this(t)
    return n.forEach((s) => r.set(s)), r
  }
  static accessor(t) {
    const r = (this[ho] = this[ho] = { accessors: {} }).accessors,
      s = this.prototype
    function o(i) {
      const l = Wt(i)
      r[l] || (Tf(s, i), (r[l] = !0))
    }
    return y.isArray(t) ? t.forEach(o) : o(t), this
  }
}
Xn.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
])
y.reduceDescriptors(Xn.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1)
  return {
    get: () => e,
    set(r) {
      this[n] = r
    },
  }
})
y.freezeMethods(Xn)
const $e = Xn
function ur(e, t) {
  const n = this || rs,
    r = t || n,
    s = $e.from(r.headers)
  let o = r.data
  return (
    y.forEach(e, function (l) {
      o = l.call(n, o, s.normalize(), t ? t.status : void 0)
    }),
    s.normalize(),
    o
  )
}
function $i(e) {
  return !!(e && e.__CANCEL__)
}
function ln(e, t, n) {
  q.call(this, e ?? "canceled", q.ERR_CANCELED, t, n),
    (this.name = "CanceledError")
}
y.inherits(ln, q, { __CANCEL__: !0 })
function Nf(e, t, n) {
  const r = n.config.validateStatus
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new q(
          "Request failed with status code " + n.status,
          [q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      )
}
const Ff = He.hasStandardBrowserEnv
  ? {
      write(e, t, n, r, s, o) {
        const i = [e + "=" + encodeURIComponent(t)]
        y.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
          y.isString(r) && i.push("path=" + r),
          y.isString(s) && i.push("domain=" + s),
          o === !0 && i.push("secure"),
          (document.cookie = i.join("; "))
      },
      read(e) {
        const t = document.cookie.match(
          new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
        )
        return t ? decodeURIComponent(t[3]) : null
      },
      remove(e) {
        this.write(e, "", Date.now() - 864e5)
      },
    }
  : {
      write() {},
      read() {
        return null
      },
      remove() {},
    }
function Lf(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function If(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
}
function Xi(e, t) {
  return e && !Lf(t) ? If(e, t) : t
}
const Bf = He.hasStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a")
      let r
      function s(o) {
        let i = o
        return (
          t && (n.setAttribute("href", i), (i = n.href)),
          n.setAttribute("href", i),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        )
      }
      return (
        (r = s(window.location.href)),
        function (i) {
          const l = y.isString(i) ? s(i) : i
          return l.protocol === r.protocol && l.host === r.host
        }
      )
    })()
  : (function () {
      return function () {
        return !0
      }
    })()
function Mf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e)
  return (t && t[1]) || ""
}
function jf(e, t) {
  e = e || 10
  const n = new Array(e),
    r = new Array(e)
  let s = 0,
    o = 0,
    i
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const a = Date.now(),
        u = r[o]
      i || (i = a), (n[s] = c), (r[s] = a)
      let d = o,
        p = 0
      for (; d !== s; ) (p += n[d++]), (d = d % e)
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), a - i < t)) return
      const b = u && a - u
      return b ? Math.round((p * 1e3) / b) : void 0
    }
  )
}
function po(e, t) {
  let n = 0
  const r = jf(50, 250)
  return (s) => {
    const o = s.loaded,
      i = s.lengthComputable ? s.total : void 0,
      l = o - n,
      c = r(l),
      a = o <= i
    n = o
    const u = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && i && a ? (i - o) / c : void 0,
      event: s,
    }
    ;(u[t ? "download" : "upload"] = !0), e(u)
  }
}
const kf = typeof XMLHttpRequest < "u",
  Hf =
    kf &&
    function (e) {
      return new Promise(function (n, r) {
        let s = e.data
        const o = $e.from(e.headers).normalize()
        let { responseType: i, withXSRFToken: l } = e,
          c
        function a() {
          e.cancelToken && e.cancelToken.unsubscribe(c),
            e.signal && e.signal.removeEventListener("abort", c)
        }
        let u
        if (y.isFormData(s)) {
          if (He.hasStandardBrowserEnv || He.hasStandardBrowserWebWorkerEnv)
            o.setContentType(!1)
          else if ((u = o.getContentType()) !== !1) {
            const [w, ...F] = u
              ? u
                  .split(";")
                  .map((T) => T.trim())
                  .filter(Boolean)
              : []
            o.setContentType([w || "multipart/form-data", ...F].join("; "))
          }
        }
        let d = new XMLHttpRequest()
        if (e.auth) {
          const w = e.auth.username || "",
            F = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : ""
          o.set("Authorization", "Basic " + btoa(w + ":" + F))
        }
        const p = Xi(e.baseURL, e.url)
        d.open(e.method.toUpperCase(), Ki(p, e.params, e.paramsSerializer), !0),
          (d.timeout = e.timeout)
        function b() {
          if (!d) return
          const w = $e.from(
              "getAllResponseHeaders" in d && d.getAllResponseHeaders()
            ),
            T = {
              data:
                !i || i === "text" || i === "json"
                  ? d.responseText
                  : d.response,
              status: d.status,
              statusText: d.statusText,
              headers: w,
              config: e,
              request: d,
            }
          Nf(
            function (H) {
              n(H), a()
            },
            function (H) {
              r(H), a()
            },
            T
          ),
            (d = null)
        }
        if (
          ("onloadend" in d
            ? (d.onloadend = b)
            : (d.onreadystatechange = function () {
                !d ||
                  d.readyState !== 4 ||
                  (d.status === 0 &&
                    !(d.responseURL && d.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(b)
              }),
          (d.onabort = function () {
            d && (r(new q("Request aborted", q.ECONNABORTED, e, d)), (d = null))
          }),
          (d.onerror = function () {
            r(new q("Network Error", q.ERR_NETWORK, e, d)), (d = null)
          }),
          (d.ontimeout = function () {
            let F = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded"
            const T = e.transitional || Wi
            e.timeoutErrorMessage && (F = e.timeoutErrorMessage),
              r(
                new q(
                  F,
                  T.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
                  e,
                  d
                )
              ),
              (d = null)
          }),
          He.hasStandardBrowserEnv &&
            (l && y.isFunction(l) && (l = l(e)), l || (l !== !1 && Bf(p))))
        ) {
          const w =
            e.xsrfHeaderName && e.xsrfCookieName && Ff.read(e.xsrfCookieName)
          w && o.set(e.xsrfHeaderName, w)
        }
        s === void 0 && o.setContentType(null),
          "setRequestHeader" in d &&
            y.forEach(o.toJSON(), function (F, T) {
              d.setRequestHeader(T, F)
            }),
          y.isUndefined(e.withCredentials) ||
            (d.withCredentials = !!e.withCredentials),
          i && i !== "json" && (d.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            d.addEventListener("progress", po(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            d.upload &&
            d.upload.addEventListener("progress", po(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((c = (w) => {
              d &&
                (r(!w || w.type ? new ln(null, e, d) : w),
                d.abort(),
                (d = null))
            }),
            e.cancelToken && e.cancelToken.subscribe(c),
            e.signal &&
              (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)))
        const _ = Mf(p)
        if (_ && He.protocols.indexOf(_) === -1) {
          r(new q("Unsupported protocol " + _ + ":", q.ERR_BAD_REQUEST, e))
          return
        }
        d.send(s || null)
      })
    },
  Tr = { http: uf, xhr: Hf }
y.forEach(Tr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t })
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t })
  }
})
const mo = (e) => `- ${e}`,
  Uf = (e) => y.isFunction(e) || e === null || e === !1,
  Ji = {
    getAdapter: (e) => {
      e = y.isArray(e) ? e : [e]
      const { length: t } = e
      let n, r
      const s = {}
      for (let o = 0; o < t; o++) {
        n = e[o]
        let i
        if (
          ((r = n),
          !Uf(n) && ((r = Tr[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new q(`Unknown adapter '${i}'`)
        if (r) break
        s[i || "#" + o] = r
      }
      if (!r) {
        const o = Object.entries(s).map(
          ([l, c]) =>
            `adapter ${l} ` +
            (c === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        )
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(mo).join(`
`)
            : " " + mo(o[0])
          : "as no adapter specified"
        throw new q(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        )
      }
      return r
    },
    adapters: Tr,
  }
function ar(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new ln(null, e)
}
function go(e) {
  return (
    ar(e),
    (e.headers = $e.from(e.headers)),
    (e.data = ur.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Ji.getAdapter(e.adapter || rs.adapter)(e).then(
      function (r) {
        return (
          ar(e),
          (r.data = ur.call(e, e.transformResponse, r)),
          (r.headers = $e.from(r.headers)),
          r
        )
      },
      function (r) {
        return (
          $i(r) ||
            (ar(e),
            r &&
              r.response &&
              ((r.response.data = ur.call(e, e.transformResponse, r.response)),
              (r.response.headers = $e.from(r.response.headers)))),
          Promise.reject(r)
        )
      }
    )
  )
}
const yo = (e) => (e instanceof $e ? e.toJSON() : e)
function Mt(e, t) {
  t = t || {}
  const n = {}
  function r(a, u, d) {
    return y.isPlainObject(a) && y.isPlainObject(u)
      ? y.merge.call({ caseless: d }, a, u)
      : y.isPlainObject(u)
      ? y.merge({}, u)
      : y.isArray(u)
      ? u.slice()
      : u
  }
  function s(a, u, d) {
    if (y.isUndefined(u)) {
      if (!y.isUndefined(a)) return r(void 0, a, d)
    } else return r(a, u, d)
  }
  function o(a, u) {
    if (!y.isUndefined(u)) return r(void 0, u)
  }
  function i(a, u) {
    if (y.isUndefined(u)) {
      if (!y.isUndefined(a)) return r(void 0, a)
    } else return r(void 0, u)
  }
  function l(a, u, d) {
    if (d in t) return r(a, u)
    if (d in e) return r(void 0, a)
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (a, u) => s(yo(a), yo(u), !0),
  }
  return (
    y.forEach(Object.keys(Object.assign({}, e, t)), function (u) {
      const d = c[u] || s,
        p = d(e[u], t[u], u)
      ;(y.isUndefined(p) && d !== l) || (n[u] = p)
    }),
    n
  )
}
const Zi = "1.6.2",
  ss = {}
;["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    ss[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
    }
  }
)
const bo = {}
ss.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      Zi +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    )
  }
  return (o, i, l) => {
    if (t === !1)
      throw new q(
        s(i, " has been removed" + (n ? " in " + n : "")),
        q.ERR_DEPRECATED
      )
    return (
      n &&
        !bo[i] &&
        ((bo[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, l) : !0
    )
  }
}
function Df(e, t, n) {
  if (typeof e != "object")
    throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE)
  const r = Object.keys(e)
  let s = r.length
  for (; s-- > 0; ) {
    const o = r[s],
      i = t[o]
    if (i) {
      const l = e[o],
        c = l === void 0 || i(l, o, e)
      if (c !== !0)
        throw new q("option " + o + " must be " + c, q.ERR_BAD_OPTION_VALUE)
      continue
    }
    if (n !== !0) throw new q("Unknown option " + o, q.ERR_BAD_OPTION)
  }
}
const Nr = { assertOptions: Df, validators: ss },
  et = Nr.validators
class Tn {
  constructor(t) {
    ;(this.defaults = t),
      (this.interceptors = { request: new fo(), response: new fo() })
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Mt(this.defaults, n))
    const { transitional: r, paramsSerializer: s, headers: o } = n
    r !== void 0 &&
      Nr.assertOptions(
        r,
        {
          silentJSONParsing: et.transitional(et.boolean),
          forcedJSONParsing: et.transitional(et.boolean),
          clarifyTimeoutError: et.transitional(et.boolean),
        },
        !1
      ),
      s != null &&
        (y.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : Nr.assertOptions(
              s,
              { encode: et.function, serialize: et.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase())
    let i = o && y.merge(o.common, o[n.method])
    o &&
      y.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (_) => {
          delete o[_]
        }
      ),
      (n.headers = $e.concat(i, o))
    const l = []
    let c = !0
    this.interceptors.request.forEach(function (w) {
      ;(typeof w.runWhen == "function" && w.runWhen(n) === !1) ||
        ((c = c && w.synchronous), l.unshift(w.fulfilled, w.rejected))
    })
    const a = []
    this.interceptors.response.forEach(function (w) {
      a.push(w.fulfilled, w.rejected)
    })
    let u,
      d = 0,
      p
    if (!c) {
      const _ = [go.bind(this), void 0]
      for (
        _.unshift.apply(_, l),
          _.push.apply(_, a),
          p = _.length,
          u = Promise.resolve(n);
        d < p;

      )
        u = u.then(_[d++], _[d++])
      return u
    }
    p = l.length
    let b = n
    for (d = 0; d < p; ) {
      const _ = l[d++],
        w = l[d++]
      try {
        b = _(b)
      } catch (F) {
        w.call(this, F)
        break
      }
    }
    try {
      u = go.call(this, b)
    } catch (_) {
      return Promise.reject(_)
    }
    for (d = 0, p = a.length; d < p; ) u = u.then(a[d++], a[d++])
    return u
  }
  getUri(t) {
    t = Mt(this.defaults, t)
    const n = Xi(t.baseURL, t.url)
    return Ki(n, t.params, t.paramsSerializer)
  }
}
y.forEach(["delete", "get", "head", "options"], function (t) {
  Tn.prototype[t] = function (n, r) {
    return this.request(
      Mt(r || {}, { method: t, url: n, data: (r || {}).data })
    )
  }
})
y.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, l) {
      return this.request(
        Mt(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      )
    }
  }
  ;(Tn.prototype[t] = n()), (Tn.prototype[t + "Form"] = n(!0))
})
const vn = Tn
class os {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.")
    let n
    this.promise = new Promise(function (o) {
      n = o
    })
    const r = this
    this.promise.then((s) => {
      if (!r._listeners) return
      let o = r._listeners.length
      for (; o-- > 0; ) r._listeners[o](s)
      r._listeners = null
    }),
      (this.promise.then = (s) => {
        let o
        const i = new Promise((l) => {
          r.subscribe(l), (o = l)
        }).then(s)
        return (
          (i.cancel = function () {
            r.unsubscribe(o)
          }),
          i
        )
      }),
      t(function (o, i, l) {
        r.reason || ((r.reason = new ln(o, i, l)), n(r.reason))
      })
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason)
      return
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t])
  }
  unsubscribe(t) {
    if (!this._listeners) return
    const n = this._listeners.indexOf(t)
    n !== -1 && this._listeners.splice(n, 1)
  }
  static source() {
    let t
    return {
      token: new os(function (s) {
        t = s
      }),
      cancel: t,
    }
  }
}
const zf = os
function qf(e) {
  return function (n) {
    return e.apply(null, n)
  }
}
function Kf(e) {
  return y.isObject(e) && e.isAxiosError === !0
}
const Fr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
}
Object.entries(Fr).forEach(([e, t]) => {
  Fr[t] = e
})
const Wf = Fr
function Qi(e) {
  const t = new vn(e),
    n = Fi(vn.prototype.request, t)
  return (
    y.extend(n, vn.prototype, t, { allOwnKeys: !0 }),
    y.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return Qi(Mt(e, s))
    }),
    n
  )
}
const se = Qi(rs)
se.Axios = vn
se.CanceledError = ln
se.CancelToken = zf
se.isCancel = $i
se.VERSION = Zi
se.toFormData = $n
se.AxiosError = q
se.Cancel = se.CanceledError
se.all = function (t) {
  return Promise.all(t)
}
se.spread = qf
se.isAxiosError = Kf
se.mergeConfig = Mt
se.AxiosHeaders = $e
se.formToJSON = (e) => Yi(y.isHTMLForm(e) ? new FormData(e) : e)
se.getAdapter = Ji.getAdapter
se.HttpStatusCode = Wf
se.default = se
const Vf = se,
  is = (e) => (Wl("data-v-8a93193b"), (e = e()), Vl(), e),
  Yf = is(() => ee("div", null, [ee("img", { src: bi, alt: "" })], -1)),
  $f = [Yf],
  Xf = { key: 0, class: "container" },
  Jf = { class: "searcher" },
  Zf = ["onKeydown"],
  Qf = { class: "centrium" },
  Gf = { key: 0 },
  ed = { key: 1 },
  td = ["src", "alt", "onClick"],
  nd = { key: 2 },
  rd = ["src", "alt", "onClick"],
  sd = { key: 2 },
  od = { key: 3, class: "modal-overlay" },
  id = is(() => ee("div", null, [ee("img", { src: bi, alt: "" })], -1)),
  ld = [id],
  cd = { class: "modal", style: { "background-color": "antiquewhite" } },
  ud = ["src", "alt"],
  ad = { key: 1, class: "likeSection" },
  fd = is(() => ee("h1", null, "Избранное", -1)),
  dd = ["src"],
  hd = {
    __name: "TZmain",
    setup(e) {
      const t = Ae(1),
        n = () => {
          t.value = 1
        },
        r = () => {
          t.value = 2
        },
        s = (S) => {
          o.value.push(S), H()
        },
        o = Ae([]),
        i = Ae([]),
        l = Ae(""),
        c = Ae([]),
        a = Ae(null),
        u = Ae(null),
        d = Ae(1),
        p = Ae(!1),
        b = Vf.create({
          baseURL: "https://api.unsplash.com",
          headers: {
            Authorization:
              "Client-ID dOr70LR7IxcflAmv0Uo5QF1oBm39_6tXJkZPih9fE0k",
          },
        }),
        _ = async () => {
          try {
            const S = await b.get("/photos/random", { params: { count: 8 } })
            i.value = S.data
          } catch (S) {
            console.error("Error fetching random photos", S)
          }
        },
        w = async () => {
          try {
            const S = await b.get("/search/photos", {
              params: { query: l.value, page: 1, per_page: 8 },
            })
            ;(c.value = S.data.results), (a.value = null), (d.value = 1)
          } catch (S) {
            ;(c.value = []),
              (a.value = "Ничего не найдено"),
              console.error("Error searching photos", S)
          }
        },
        F = async () => {
          try {
            p.value = !0
            const S = await b.get("/photos/random", { params: { count: 8 } })
            i.value = [...i.value, ...S.data]
          } catch (S) {
            console.error("Error loading more photos", S)
          } finally {
            p.value = !1
          }
        },
        T = async () => {
          try {
            p.value = !0
            const S = await b.get("/search/photos", {
              params: { query: l.value, page: d.value + 1, per_page: 8 },
            })
            ;(c.value = [...c.value, ...S.data.results]),
              d.value++,
              (hasMoreResults.value = S.data.results.length > 0)
          } catch (S) {
            console.error("Error loading more photos", S)
          } finally {
            p.value = !1
          }
        },
        L = (S) => {
          ;(u.value = S), (document.body.style.overflow = "hidden")
        },
        H = () => {
          ;(u.value = null), (document.body.style.overflow = "")
        }
      return (
        ni(() => {
          _()
        }),
        ri(() => {}),
        (S, ne) => (
          le(),
          ce(
            _e,
            null,
            [
              ee("header", { class: "header" }, [
                ee("div", { class: "icon", onClick: n }, $f),
                ee("div", { to: "/favorites", class: "fav", onClick: r }),
              ]),
              t.value === 1
                ? (le(),
                  ce("div", Xf, [
                    ee("div", Jf, [
                      nc(
                        ee(
                          "input",
                          {
                            "onUpdate:modelValue":
                              ne[0] || (ne[0] = (V) => (l.value = V)),
                            placeholder: "Введите запрос для поиска",
                            onKeydown: mu(w, ["enter"]),
                          },
                          null,
                          40,
                          Zf
                        ),
                        [[hu, l.value]]
                      ),
                      ee("button", { onClick: w }, "Искать"),
                    ]),
                    ee("div", Qf, [
                      a.value
                        ? (le(), ce("div", Gf, [ee("p", null, ds(a.value), 1)]))
                        : (le(),
                          ce("div", ed, [
                            (le(!0),
                            ce(
                              _e,
                              null,
                              Qn(
                                c.value,
                                (V) => (
                                  le(),
                                  ce(
                                    "img",
                                    {
                                      key: V.id,
                                      src: V.urls.regular,
                                      alt: V.alt_description,
                                      onClick: (we) => L(V),
                                    },
                                    null,
                                    8,
                                    td
                                  )
                                )
                              ),
                              128
                            )),
                          ])),
                      !c.value.length && !a.value
                        ? (le(),
                          ce("div", nd, [
                            (le(!0),
                            ce(
                              _e,
                              null,
                              Qn(
                                i.value,
                                (V) => (
                                  le(),
                                  ce(
                                    "img",
                                    {
                                      key: V.id,
                                      src: V.urls.regular,
                                      alt: V.alt_description,
                                      onClick: (we) => L(V),
                                    },
                                    null,
                                    8,
                                    rd
                                  )
                                )
                              ),
                              128
                            )),
                          ]))
                        : qt("", !0),
                    ]),
                    l.value
                      ? (le(),
                        ce(
                          "button",
                          { key: 0, class: "loadElse", onClick: T },
                          " Загрузить ещё "
                        ))
                      : (le(),
                        ce(
                          "button",
                          { key: 1, class: "loadElse", onClick: F },
                          " Загрузить ещё "
                        )),
                    p.value ? (le(), ce("p", sd, "Загрузка...")) : qt("", !0),
                    u.value
                      ? (le(),
                        ce("div", od, [
                          ee("header", { class: "headerModal" }, [
                            ee("div", { class: "icon", onClick: n }, ld),
                            ee("div", {
                              to: "/favorites",
                              class: "fav",
                              onClick: r,
                            }),
                          ]),
                          ee("div", cd, [
                            ee("span", { class: "close", onClick: H }, "×"),
                            ee(
                              "img",
                              {
                                src: u.value.urls.regular,
                                alt: u.value.alt_description,
                              },
                              null,
                              8,
                              ud
                            ),
                            ee("p", null, ds(u.value.description), 1),
                            ee(
                              "button",
                              {
                                style: {
                                  "background-color": "brown",
                                  color: "antiquewhite",
                                  padding: "5px 15px",
                                },
                                onClick:
                                  ne[1] ||
                                  (ne[1] = (V) => s(u.value.urls.regular)),
                              },
                              " like "
                            ),
                          ]),
                        ]))
                      : qt("", !0),
                  ]))
                : qt("", !0),
              t.value === 2
                ? (le(),
                  ce("div", ad, [
                    fd,
                    ee("div", null, [
                      (le(!0),
                      ce(
                        _e,
                        null,
                        Qn(
                          o.value,
                          (V) => (
                            le(), ce("img", { src: V, alt: "" }, null, 8, dd)
                          )
                        ),
                        256
                      )),
                    ]),
                  ]))
                : qt("", !0),
            ],
            64
          )
        )
      )
    },
  },
  Eo = Ei(hd, [["__scopeId", "data-v-8a93193b"]]),
  pd = [
    { path: "/home", name: "Home", alias: "/", component: Eo },
    { path: "/tzfin", name: "/Home", component: Eo },
  ],
  md = va({ history: Uu(), routes: pd }),
  gd = Ru(),
  ls = bu(Pa)
ls.use(md)
ls.use(gd)
ls.mount("#app")
