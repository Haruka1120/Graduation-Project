/*
 Highstock JS v6.0.2 (2017-10-20)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(Q, L) {
	"object" === typeof module && module.exports ? module.exports = Q.document ? L(Q) : L : Q.Highcharts = L(Q)
})("undefined" !== typeof window ? window : this, function(Q) {
	var L = function() {
		var a = Q.document,
			E = Q.navigator && Q.navigator.userAgent || "",
			D = a && a.createElementNS && !!a.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			F = /(edge|msie|trident)/i.test(E) && !Q.opera,
			t = /Firefox/.test(E),
			l = t && 4 > parseInt(E.split("Firefox/")[1], 10);
		return Q.Highcharts ? Q.Highcharts.error(16, !0) : {
			product: "Highstock",
			version: "6.0.2",
			deg2rad: 2 * Math.PI / 360,
			doc: a,
			hasBidiBug: l,
			hasTouch: a && void 0 !== a.documentElement.ontouchstart,
			isMS: F,
			isWebKit: /AppleWebKit/.test(E),
			isFirefox: t,
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: D,
			win: Q,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function() {},
			charts: []
		}
	}();
	(function(a) {
		a.timers = [];
		var E = a.charts,
			D = a.doc,
			F = a.win;
		a.error = function(t, l) {
			t = a.isNumber(t) ? "Highcharts error #" + t + ": www.highcharts.com/errors/" + t : t;
			if (l) throw Error(t);
			F.console && console.log(t)
		};
		a.Fx = function(a, l, p) {
			this.options = l;
			this.elem = a;
			this.prop = p
		};
		a.Fx.prototype = {
			dSetter: function() {
				var a = this.paths[0],
					l = this.paths[1],
					p = [],
					z = this.now,
					q = a.length,
					u;
				if (1 === z) p = this.toD;
				else if (q === l.length && 1 > z)
					for (; q--;) u = parseFloat(a[q]), p[q] = isNaN(u) ? a[q] : z * parseFloat(l[q] - u) + u;
				else p = l;
				this.elem.attr("d", p, null, !0)
			},
			update: function() {
				var a = this.elem,
					l = this.prop,
					p = this.now,
					z = this.options.step;
				if (this[l + "Setter"]) this[l + "Setter"]();
				else a.attr ? a.element && a.attr(l, p, null, !0) : a.style[l] = p + this.unit;
				z && z.call(a, p, this)
			},
			run: function(t, l, p) {
				var z = this,
					q = z.options,
					u = function(a) {
						return u.stopped ? !1 : z.step(a)
					},
					B = F.requestAnimationFrame || function(a) {
						setTimeout(a, 13)
					},
					e = function() {
						a.timers = a.grep(a.timers, function(a) {
							return a()
						});
						a.timers.length && B(e)
					};
				t === l ? (delete q.curAnim[this.prop], q.complete && 0 === a.keys(q.curAnim).length && q.complete()) : (this.startTime = +new Date, this.start = t, this.end = l, this.unit = p, this.now = this.start, this.pos = 0, u.elem = this.elem, u.prop = this.prop, u() && 1 === a.timers.push(u) && B(e))
			},
			step: function(t) {
				var l = +new Date,
					p, z = this.options,
					q = this.elem,
					u = z.complete,
					B = z.duration,
					e = z.curAnim;
				q.attr && !q.element ? t = !1 : t || l >= B + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), p = e[this.prop] = !0, a.objectEach(e, function(a) {
					!0 !== a && (p = !1)
				}), p && u && u.call(q), t = !1) : (this.pos = z.easing((l - this.startTime) / B), this.now = this.start + (this.end - this.start) * this.pos, this.update(), t = !0);
				return t
			},
			initPath: function(t, l, p) {
				function z(a) {
					var b,
						c;
					for (m = a.length; m--;) b = "M" === a[m] || "L" === a[m], c = /[a-zA-Z]/.test(a[m + 3]), b && c && a.splice(m + 1, 0, a[m + 1], a[m + 2], a[m + 1], a[m + 2])
				}

				function q(a, w) {
					for (; a.length < b;) {
						a[0] = w[b - a.length];
						var f = a.slice(0, c);
						[].splice.apply(a, [0, 0].concat(f));
						r && (f = a.slice(a.length - c), [].splice.apply(a, [a.length, 0].concat(f)), m--)
					}
					a[0] = "M"
				}

				function u(a, m) {
					for (var f = (b - a.length) / c; 0 < f && f--;) w = a.slice().splice(a.length / C - c, c * C), w[0] = m[b - c - f * c], g && (w[c - 6] = w[c - 2], w[c - 5] = w[c - 1]), [].splice.apply(a, [a.length / C, 0].concat(w)), r && f--
				}
				l = l || "";
				var B, e = t.startX,
					h = t.endX,
					g = -1 < l.indexOf("C"),
					c = g ? 7 : 3,
					b, w, m;
				l = l.split(" ");
				p = p.slice();
				var r = t.isArea,
					C = r ? 2 : 1,
					H;
				g && (z(l), z(p));
				if (e && h) {
					for (m = 0; m < e.length; m++)
						if (e[m] === h[0]) {
							B = m;
							break
						} else if (e[0] === h[h.length - e.length + m]) {
						B = m;
						H = !0;
						break
					}
					void 0 === B && (l = [])
				}
				l.length && a.isNumber(B) && (b = p.length + B * C * c, H ? (q(l, p), u(p, l)) : (q(p, l), u(l, p)));
				return [l, p]
			}
		};
		a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() {
			this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
		};
		a.extend = function(a, l) {
			var p;
			a || (a = {});
			for (p in l) a[p] = l[p];
			return a
		};
		a.merge = function() {
			var t, l = arguments,
				p, z = {},
				q = function(u, p) {
					"object" !== typeof u && (u = {});
					a.objectEach(p, function(e, h) {
						!a.isObject(e, !0) || a.isClass(e) || a.isDOMElement(e) ? u[h] = p[h] : u[h] = q(u[h] || {}, e)
					});
					return u
				};
			!0 === l[0] && (z = l[1], l = Array.prototype.slice.call(l, 2));
			p = l.length;
			for (t = 0; t < p; t++) z = q(z, l[t]);
			return z
		};
		a.pInt = function(a, l) {
			return parseInt(a, l || 10)
		};
		a.isString = function(a) {
			return "string" === typeof a
		};
		a.isArray = function(a) {
			a = Object.prototype.toString.call(a);
			return "[object Array]" === a || "[object Array Iterator]" === a
		};
		a.isObject = function(t, l) {
			return !!t && "object" === typeof t && (!l || !a.isArray(t))
		};
		a.isDOMElement = function(t) {
			return a.isObject(t) && "number" === typeof t.nodeType
		};
		a.isClass = function(t) {
			var l = t && t.constructor;
			return !(!a.isObject(t, !0) || a.isDOMElement(t) || !l || !l.name || "Object" === l.name)
		};
		a.isNumber = function(a) {
			return "number" === typeof a && !isNaN(a)
		};
		a.erase = function(a, l) {
			for (var p = a.length; p--;)
				if (a[p] === l) {
					a.splice(p, 1);
					break
				}
		};
		a.defined = function(a) {
			return void 0 !== a && null !== a
		};
		a.attr = function(t, l, p) {
			var z;
			a.isString(l) ? a.defined(p) ? t.setAttribute(l, p) : t && t.getAttribute && (z = t.getAttribute(l)) : a.defined(l) && a.isObject(l) && a.objectEach(l, function(a, p) {
				t.setAttribute(p, a)
			});
			return z
		};
		a.splat = function(t) {
			return a.isArray(t) ? t : [t]
		};
		a.syncTimeout = function(a, l, p) {
			if (l) return setTimeout(a, l, p);
			a.call(0, p)
		};
		a.pick = function() {
			var a = arguments,
				l, p, z = a.length;
			for (l = 0; l < z; l++)
				if (p = a[l], void 0 !== p && null !== p) return p
		};
		a.css = function(t, l) {
			a.isMS && !a.svg && l && void 0 !== l.opacity && (l.filter = "alpha(opacity\x3d" + 100 * l.opacity + ")");
			a.extend(t.style, l)
		};
		a.createElement = function(t, l, p, z, q) {
			t = D.createElement(t);
			var u = a.css;
			l && a.extend(t, l);
			q && u(t, {
				padding: 0,
				border: "none",
				margin: 0
			});
			p && u(t, p);
			z && z.appendChild(t);
			return t
		};
		a.extendClass = function(t, l) {
			var p = function() {};
			p.prototype = new t;
			a.extend(p.prototype, l);
			return p
		};
		a.pad = function(a, l, p) {
			return Array((l || 2) + 1 - String(a).length).join(p || 0) + a
		};
		a.relativeLength = function(a, l, p) {
			return /%$/.test(a) ? l * parseFloat(a) / 100 + (p || 0) : parseFloat(a)
		};
		a.wrap = function(a, l, p) {
			var t = a[l];
			a[l] = function() {
				var a = Array.prototype.slice.call(arguments),
					u = arguments,
					B = this;
				B.proceed = function() {
					t.apply(B, arguments.length ? arguments : u)
				};
				a.unshift(t);
				a = p.apply(this, a);
				B.proceed = null;
				return a
			}
		};
		a.getTZOffset = function(t) {
			var l = a.Date;
			return 6E4 * (l.hcGetTimezoneOffset && l.hcGetTimezoneOffset(t) || l.hcTimezoneOffset || 0)
		};
		a.dateFormat = function(t, l, p) {
			if (!a.defined(l) || isNaN(l)) return a.defaultOptions.lang.invalidDate || "";
			t = a.pick(t, "%Y-%m-%d %H:%M:%S");
			var z = a.Date,
				q = new z(l - a.getTZOffset(l)),
				u = q[z.hcGetHours](),
				B = q[z.hcGetDay](),
				e = q[z.hcGetDate](),
				h = q[z.hcGetMonth](),
				g = q[z.hcGetFullYear](),
				c = a.defaultOptions.lang,
				b = c.weekdays,
				w = c.shortWeekdays,
				m = a.pad,
				z = a.extend({
					a: w ? w[B] : b[B].substr(0, 3),
					A: b[B],
					d: m(e),
					e: m(e, 2, " "),
					w: B,
					b: c.shortMonths[h],
					B: c.months[h],
					m: m(h + 1),
					y: g.toString().substr(2, 2),
					Y: g,
					H: m(u),
					k: u,
					I: m(u % 12 || 12),
					l: u % 12 || 12,
					M: m(q[z.hcGetMinutes]()),
					p: 12 > u ? "AM" : "PM",
					P: 12 > u ? "am" : "pm",
					S: m(q.getSeconds()),
					L: m(Math.round(l % 1E3), 3)
				}, a.dateFormats);
			a.objectEach(z, function(a, b) {
				for (; - 1 !== t.indexOf("%" + b);) t = t.replace("%" + b, "function" === typeof a ? a(l) : a)
			});
			return p ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
		};
		a.formatSingle = function(t, l) {
			var p = /\.([0-9])/,
				z = a.defaultOptions.lang;
			/f$/.test(t) ? (p = (p = t.match(p)) ? p[1] : -1, null !== l && (l = a.numberFormat(l, p, z.decimalPoint, -1 < t.indexOf(",") ? z.thousandsSep : ""))) : l = a.dateFormat(t, l);
			return l
		};
		a.format = function(t, l) {
			for (var p = "{", z = !1, q, u, B, e, h = [], g; t;) {
				p = t.indexOf(p);
				if (-1 === p) break;
				q = t.slice(0, p);
				if (z) {
					q = q.split(":");
					u = q.shift().split(".");
					e = u.length;
					g = l;
					for (B = 0; B < e; B++) g && (g = g[u[B]]);
					q.length && (g = a.formatSingle(q.join(":"), g));
					h.push(g)
				} else h.push(q);
				t = t.slice(p + 1);
				p = (z = !z) ? "}" : "{"
			}
			h.push(t);
			return h.join("")
		};
		a.getMagnitude = function(a) {
			return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
		};
		a.normalizeTickInterval = function(t, l, p, z, q) {
			var u, B = t;
			p = a.pick(p, 1);
			u = t / p;
			l || (l = q ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === z && (1 === p ? l = a.grep(l, function(a) {
				return 0 === a % 1
			}) : .1 >= p && (l = [1 / p])));
			for (z = 0; z < l.length && !(B = l[z], q && B * p >= t || !q && u <= (l[z] + (l[z + 1] || l[z])) / 2); z++);
			return B = a.correctFloat(B * p, -Math.round(Math.log(.001) / Math.LN10))
		};
		a.stableSort = function(a, l) {
			var p = a.length,
				t, q;
			for (q = 0; q < p; q++) a[q].safeI = q;
			a.sort(function(a, q) {
				t = l(a, q);
				return 0 === t ? a.safeI - q.safeI : t
			});
			for (q = 0; q < p; q++) delete a[q].safeI
		};
		a.arrayMin = function(a) {
			for (var l = a.length, p = a[0]; l--;) a[l] < p && (p = a[l]);
			return p
		};
		a.arrayMax = function(a) {
			for (var l = a.length, p = a[0]; l--;) a[l] > p && (p = a[l]);
			return p
		};
		a.destroyObjectProperties = function(t, l) {
			a.objectEach(t, function(a, z) {
				a && a !== l && a.destroy && a.destroy();
				delete t[z]
			})
		};
		a.discardElement = function(t) {
			var l = a.garbageBin;
			l || (l = a.createElement("div"));
			t && l.appendChild(t);
			l.innerHTML = ""
		};
		a.correctFloat = function(a, l) {
			return parseFloat(a.toPrecision(l || 14))
		};
		a.setAnimation = function(t, l) {
			l.renderer.globalAnimation = a.pick(t, l.options.chart.animation, !0)
		};
		a.animObject = function(t) {
			return a.isObject(t) ? a.merge(t) : {
				duration: t ? 500 : 0
			}
		};
		a.timeUnits = {
			millisecond: 1,
			second: 1E3,
			minute: 6E4,
			hour: 36E5,
			day: 864E5,
			week: 6048E5,
			month: 24192E5,
			year: 314496E5
		};
		a.numberFormat = function(t, l, p, z) {
			t = +t || 0;
			l = +l;
			var q = a.defaultOptions.lang,
				u = (t.toString().split(".")[1] || "").split("e")[0].length,
				B, e, h = t.toString().split("e"); - 1 === l ? l = Math.min(u, 20) : a.isNumber(l) || (l = 2);
			e = (Math.abs(h[1] ? h[0] : t) + Math.pow(10, -Math.max(l, u) - 1)).toFixed(l);
			u = String(a.pInt(e));
			B = 3 < u.length ? u.length % 3 : 0;
			p = a.pick(p, q.decimalPoint);
			z = a.pick(z, q.thousandsSep);
			t = (0 > t ? "-" : "") + (B ? u.substr(0, B) + z : "");
			t += u.substr(B).replace(/(\d{3})(?=\d)/g, "$1" + z);
			l && (t += p + e.slice(-l));
			h[1] && (t += "e" + h[1]);
			return t
		};
		Math.easeInOutSine = function(a) {
			return -.5 * (Math.cos(Math.PI * a) - 1)
		};
		a.getStyle = function(t, l, p) {
			if ("width" === l) return Math.min(t.offsetWidth, t.scrollWidth) - a.getStyle(t, "padding-left") - a.getStyle(t, "padding-right");
			if ("height" === l) return Math.min(t.offsetHeight, t.scrollHeight) - a.getStyle(t, "padding-top") - a.getStyle(t, "padding-bottom");
			F.getComputedStyle || a.error(27, !0);
			if (t = F.getComputedStyle(t, void 0)) t = t.getPropertyValue(l), a.pick(p, "opacity" !== l) && (t = a.pInt(t));
			return t
		};
		a.inArray = function(t, l) {
			return (a.indexOfPolyfill || Array.prototype.indexOf).call(l, t)
		};
		a.grep = function(t, l) {
			return (a.filterPolyfill || Array.prototype.filter).call(t, l)
		};
		a.find = Array.prototype.find ? function(a, l) {
			return a.find(l)
		} : function(a, l) {
			var p, z = a.length;
			for (p = 0; p < z; p++)
				if (l(a[p], p)) return a[p]
		};
		a.map = function(a, l) {
			for (var p = [], z = 0, q = a.length; z < q; z++) p[z] = l.call(a[z], a[z], z, a);
			return p
		};
		a.keys = function(t) {
			return (a.keysPolyfill || Object.keys).call(void 0, t)
		};
		a.reduce = function(t, l, p) {
			return (a.reducePolyfill || Array.prototype.reduce).call(t, l, p)
		};
		a.offset = function(a) {
			var l = D.documentElement;
			a = a.parentElement ? a.getBoundingClientRect() : {
				top: 0,
				left: 0
			};
			return {
				top: a.top + (F.pageYOffset || l.scrollTop) - (l.clientTop || 0),
				left: a.left + (F.pageXOffset || l.scrollLeft) - (l.clientLeft || 0)
			}
		};
		a.stop = function(t, l) {
			for (var p = a.timers.length; p--;) a.timers[p].elem !== t || l && l !== a.timers[p].prop || (a.timers[p].stopped = !0)
		};
		a.each = function(t, l, p) {
			return (a.forEachPolyfill || Array.prototype.forEach).call(t, l, p)
		};
		a.objectEach = function(a, l, p) {
			for (var z in a) a.hasOwnProperty(z) && l.call(p, a[z], z, a)
		};
		a.addEvent = function(t, l, p) {
			var z = t.hcEvents = t.hcEvents || {},
				q = t.addEventListener || a.addEventListenerPolyfill;
			q && q.call(t, l, p, !1);
			z[l] || (z[l] = []);
			z[l].push(p);
			return function() {
				a.removeEvent(t, l, p)
			}
		};
		a.removeEvent = function(t, l, p) {
			function z(e, g) {
				var c = t.removeEventListener || a.removeEventListenerPolyfill;
				c && c.call(t, e, g, !1)
			}

			function q() {
				var e, g;
				t.nodeName && (l ? (e = {}, e[l] = !0) : e = B, a.objectEach(e, function(a, b) {
					if (B[b])
						for (g = B[b].length; g--;) z(b, B[b][g])
				}))
			}
			var u, B = t.hcEvents,
				e;
			B && (l ? (u = B[l] || [], p ? (e = a.inArray(p, u), -1 < e && (u.splice(e, 1), B[l] = u), z(l, p)) : (q(), B[l] = [])) : (q(), t.hcEvents = {}))
		};
		a.fireEvent = function(t, l, p, z) {
			var q;
			q = t.hcEvents;
			var u, B;
			p = p || {};
			if (D.createEvent && (t.dispatchEvent || t.fireEvent)) q = D.createEvent("Events"), q.initEvent(l, !0, !0), a.extend(q, p), t.dispatchEvent ? t.dispatchEvent(q) : t.fireEvent(l, q);
			else if (q)
				for (q = q[l] || [], u = q.length, p.target || a.extend(p, {
						preventDefault: function() {
							p.defaultPrevented = !0
						},
						target: t,
						type: l
					}), l = 0; l < u; l++)(B = q[l]) && !1 === B.call(t, p) && p.preventDefault();
			z && !p.defaultPrevented && z(p)
		};
		a.animate = function(t, l, p) {
			var z, q = "",
				u, B, e;
			a.isObject(p) || (e = arguments, p = {
				duration: e[2],
				easing: e[3],
				complete: e[4]
			});
			a.isNumber(p.duration) || (p.duration = 400);
			p.easing = "function" === typeof p.easing ? p.easing : Math[p.easing] || Math.easeInOutSine;
			p.curAnim = a.merge(l);
			a.objectEach(l, function(e, g) {
				a.stop(t, g);
				B = new a.Fx(t, p, g);
				u = null;
				"d" === g ? (B.paths = B.initPath(t, t.d, l.d), B.toD = l.d, z = 0, u = 1) : t.attr ? z = t.attr(g) : (z = parseFloat(a.getStyle(t, g)) || 0, "opacity" !== g && (q = "px"));
				u || (u = e);
				u && u.match && u.match("px") && (u = u.replace(/px/g, ""));
				B.run(z, u, q)
			})
		};
		a.seriesType = function(t, l, p, z, q) {
			var u = a.getOptions(),
				B = a.seriesTypes;
			u.plotOptions[t] = a.merge(u.plotOptions[l], p);
			B[t] = a.extendClass(B[l] || function() {}, z);
			B[t].prototype.type = t;
			q && (B[t].prototype.pointClass = a.extendClass(a.Point, q));
			return B[t]
		};
		a.uniqueKey = function() {
			var a = Math.random().toString(36).substring(2, 9),
				l = 0;
			return function() {
				return "highcharts-" + a + "-" + l++
			}
		}();
		F.jQuery && (F.jQuery.fn.highcharts = function() {
			var t = [].slice.call(arguments);
			if (this[0]) return t[0] ? (new(a[a.isString(t[0]) ? t.shift() : "Chart"])(this[0], t[0], t[1]), this) : E[a.attr(this[0], "data-highcharts-chart")]
		})
	})(L);
	(function(a) {
		var E = a.each,
			D = a.isNumber,
			F = a.map,
			t = a.merge,
			l = a.pInt;
		a.Color = function(p) {
			if (!(this instanceof a.Color)) return new a.Color(p);
			this.init(p)
		};
		a.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(a) {
					return [l(a[1]), l(a[2]), l(a[3]), parseFloat(a[4], 10)]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function(a) {
					return [l(a[1]), l(a[2]), l(a[3]), 1]
				}
			}],
			names: {
				none: "rgba(255,255,255,0)",
				white: "#ffffff",
				black: "#000000"
			},
			init: function(p) {
				var l, q, u, B;
				if ((this.input = p = this.names[p && p.toLowerCase ? p.toLowerCase() : ""] || p) && p.stops) this.stops = F(p.stops, function(e) {
					return new a.Color(e[1])
				});
				else if (p && p.charAt && "#" === p.charAt() && (l = p.length, p = parseInt(p.substr(1), 16), 7 === l ? q = [(p & 16711680) >> 16, (p & 65280) >> 8, p & 255, 1] : 4 === l && (q = [(p & 3840) >> 4 | (p & 3840) >> 8, (p & 240) >> 4 | p & 240, (p & 15) << 4 | p & 15, 1])), !q)
					for (u = this.parsers.length; u-- && !q;) B = this.parsers[u], (l = B.regex.exec(p)) && (q = B.parse(l));
				this.rgba = q || []
			},
			get: function(a) {
				var p = this.input,
					q = this.rgba,
					u;
				this.stops ? (u = t(p), u.stops = [].concat(u.stops), E(this.stops, function(q, e) {
					u.stops[e] = [u.stops[e][0], q.get(a)]
				})) : u = q && D(q[0]) ? "rgb" === a || !a && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")" : "a" === a ? q[3] : "rgba(" + q.join(",") + ")" : p;
				return u
			},
			brighten: function(a) {
				var p, q = this.rgba;
				if (this.stops) E(this.stops, function(q) {
					q.brighten(a)
				});
				else if (D(a) && 0 !== a)
					for (p = 0; 3 > p; p++) q[p] += l(255 * a), 0 > q[p] && (q[p] = 0), 255 < q[p] && (q[p] = 255);
				return this
			},
			setOpacity: function(a) {
				this.rgba[3] = a;
				return this
			},
			tweenTo: function(a, l) {
				var q = this.rgba,
					u = a.rgba;
				u.length && q && q.length ? (a = 1 !== u[3] || 1 !== q[3], l = (a ? "rgba(" : "rgb(") + Math.round(u[0] + (q[0] - u[0]) * (1 - l)) + "," + Math.round(u[1] + (q[1] - u[1]) * (1 - l)) + "," + Math.round(u[2] + (q[2] - u[2]) * (1 - l)) + (a ? "," + (u[3] + (q[3] - u[3]) * (1 - l)) : "") + ")") : l = a.input || "none";
				return l
			}
		};
		a.color = function(p) {
			return new a.Color(p)
		}
	})(L);
	(function(a) {
		var E, D, F = a.addEvent,
			t = a.animate,
			l = a.attr,
			p = a.charts,
			z = a.color,
			q = a.css,
			u = a.createElement,
			B = a.defined,
			e = a.deg2rad,
			h = a.destroyObjectProperties,
			g = a.doc,
			c = a.each,
			b = a.extend,
			w = a.erase,
			m = a.grep,
			r = a.hasTouch,
			C = a.inArray,
			H = a.isArray,
			A = a.isFirefox,
			K = a.isMS,
			f = a.isObject,
			x = a.isString,
			J = a.isWebKit,
			v = a.merge,
			d = a.noop,
			n = a.objectEach,
			G = a.pick,
			k = a.pInt,
			y = a.removeEvent,
			P = a.stop,
			M = a.svg,
			O = a.SVG_NS,
			N = a.symbolSizes,
			R = a.win;
		E = a.SVGElement = function() {
			return this
		};
		b(E.prototype, {
			opacity: 1,
			SVG_NS: O,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
			init: function(a, k) {
				this.element = "span" === k ? u(k) : g.createElementNS(this.SVG_NS, k);
				this.renderer = a
			},
			animate: function(I, k, y) {
				k = a.animObject(G(k, this.renderer.globalAnimation, !0));
				0 !== k.duration ? (y && (k.complete = y), t(this, I, k)) : (this.attr(I, null, y), k.step && k.step.call(this));
				return this
			},
			colorGradient: function(I, k, y) {
				var d = this.renderer,
					b, f, m, r, M, w, S, g, e, C, G = [],
					x;
				I.radialGradient ? f = "radialGradient" : I.linearGradient && (f = "linearGradient");
				f && (m = I[f], M = d.gradients, S = I.stops, C = y.radialReference, H(m) && (I[f] = m = {
					x1: m[0],
					y1: m[1],
					x2: m[2],
					y2: m[3],
					gradientUnits: "userSpaceOnUse"
				}), "radialGradient" === f && C && !B(m.gradientUnits) && (r = m, m = v(m, d.getRadialAttr(C, r), {
					gradientUnits: "userSpaceOnUse"
				})), n(m, function(a, I) {
					"id" !== I && G.push(I, a)
				}), n(S, function(a) {
					G.push(a)
				}), G = G.join(","), M[G] ? C = M[G].attr("id") : (m.id = C = a.uniqueKey(), M[G] = w = d.createElement(f).attr(m).add(d.defs), w.radAttr = r, w.stops = [], c(S, function(I) {
					0 === I[1].indexOf("rgba") ? (b = a.color(I[1]), g = b.get("rgb"), e = b.get("a")) : (g = I[1], e = 1);
					I = d.createElement("stop").attr({
						offset: I[0],
						"stop-color": g,
						"stop-opacity": e
					}).add(w);
					w.stops.push(I)
				})), x = "url(" + d.url + "#" + C + ")", y.setAttribute(k, x), y.gradient = G, I.toString = function() {
					return x
				})
			},
			applyTextOutline: function(I) {
				var k = this.element,
					y, d, b, n, f; - 1 !== I.indexOf("contrast") && (I = I.replace(/contrast/g, this.renderer.getContrast(k.style.fill)));
				I = I.split(" ");
				d = I[I.length - 1];
				if ((b = I[0]) && "none" !== b && a.svg) {
					this.fakeTS = !0;
					I = [].slice.call(k.getElementsByTagName("tspan"));
					this.ySetter = this.xSetter;
					b = b.replace(/(^[\d\.]+)(.*?)$/g, function(a, I, k) {
						return 2 * I + k
					});
					for (f = I.length; f--;) y = I[f], "highcharts-text-outline" === y.getAttribute("class") && w(I, k.removeChild(y));
					n = k.firstChild;
					c(I, function(a, I) {
						0 === I && (a.setAttribute("x", k.getAttribute("x")), I = k.getAttribute("y"), a.setAttribute("y", I || 0), null === I && k.setAttribute("y", 0));
						a = a.cloneNode(1);
						l(a, {
							"class": "highcharts-text-outline",
							fill: d,
							stroke: d,
							"stroke-width": b,
							"stroke-linejoin": "round"
						});
						k.insertBefore(a, n)
					})
				}
			},
			attr: function(a, k, y, d) {
				var I, b = this.element,
					c, f = this,
					v, m;
				"string" === typeof a && void 0 !== k && (I = a, a = {}, a[I] = k);
				"string" === typeof a ? f = (this[a + "Getter"] || this._defaultGetter).call(this, a, b) : (n(a, function(k, I) {
					v = !1;
					d || P(this, I);
					this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(I) && (c || (this.symbolAttr(a), c = !0), v = !0);
					!this.rotation || "x" !== I && "y" !== I || (this.doTransform = !0);
					v || (m = this[I + "Setter"] || this._defaultSetter, m.call(this, k, I, b), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(I) && this.updateShadows(I, k, m))
				}, this), this.afterSetters());
				y && y();
				return f
			},
			afterSetters: function() {
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			},
			updateShadows: function(a, k, y) {
				for (var I = this.shadows, d = I.length; d--;) y.call(I[d], "height" === a ? Math.max(k - (I[d].cutHeight || 0), 0) : "d" === a ? this.d : k, a, I[d])
			},
			addClass: function(a, k) {
				var I = this.attr("class") || ""; - 1 === I.indexOf(a) && (k || (a = (I + (I ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
				return this
			},
			hasClass: function(a) {
				return -1 !== C(a, (this.attr("class") || "").split(" "))
			},
			removeClass: function(a) {
				return this.attr("class", (this.attr("class") || "").replace(a, ""))
			},
			symbolAttr: function(a) {
				var k = this;
				c("x y r start end width height innerR anchorX anchorY".split(" "), function(I) {
					k[I] = G(a[I], k[I])
				});
				k.attr({
					d: k.renderer.symbols[k.symbolName](k.x, k.y, k.width, k.height, k)
				})
			},
			clip: function(a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
			},
			crisp: function(a, k) {
				var I = this,
					y = {},
					d;
				k = k || a.strokeWidth || 0;
				d = Math.round(k) % 2 / 2;
				a.x = Math.floor(a.x || I.x || 0) + d;
				a.y = Math.floor(a.y || I.y || 0) + d;
				a.width = Math.floor((a.width || I.width || 0) - 2 * d);
				a.height = Math.floor((a.height || I.height || 0) - 2 * d);
				B(a.strokeWidth) && (a.strokeWidth = k);
				n(a, function(a, k) {
					I[k] !== a && (I[k] = y[k] = a)
				});
				return y
			},
			css: function(a) {
				var I = this.styles,
					y = {},
					d = this.element,
					c, f = "",
					v, m = !I,
					r = ["textOutline", "textOverflow", "width"];
				a && a.color && (a.fill = a.color);
				I && n(a, function(a, k) {
					a !== I[k] && (y[k] = a, m = !0)
				});
				m && (I && (a = b(I, y)), c = this.textWidth = a && a.width && "auto" !== a.width && "text" === d.nodeName.toLowerCase() && k(a.width), this.styles = a, c && !M && this.renderer.forExport && delete a.width, K && !M ? q(this.element, a) : (v = function(a, k) {
					return "-" + k.toLowerCase()
				}, n(a, function(a, k) {
					-1 === C(k, r) && (f += k.replace(/([A-Z])/g, v) + ":" + a + ";")
				}), f && l(d, "style", f)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
				return this
			},
			strokeWidth: function() {
				return this["stroke-width"] || 0
			},
			on: function(a, k) {
				var I = this,
					y = I.element;
				r && "click" === a ? (y.ontouchstart = function(a) {
					I.touchEventFired = Date.now();
					a.preventDefault();
					k.call(y, a)
				}, y.onclick = function(a) {
					(-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (I.touchEventFired || 0)) && k.call(y, a)
				}) : y["on" + a] = k;
				return this
			},
			setRadialReference: function(a) {
				var k = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				k && k.radAttr && k.animate(this.renderer.getRadialAttr(a, k.radAttr));
				return this
			},
			translate: function(a, k) {
				return this.attr({
					translateX: a,
					translateY: k
				})
			},
			invert: function(a) {
				this.inverted = a;
				this.updateTransform();
				return this
			},
			updateTransform: function() {
				var a = this.translateX || 0,
					k = this.translateY || 0,
					y = this.scaleX,
					d = this.scaleY,
					b = this.inverted,
					c = this.rotation,
					n = this.matrix,
					f = this.element;
				b && (a += this.width, k += this.height);
				a = ["translate(" + a + "," + k + ")"];
				B(n) && a.push("matrix(" + n.join(",") + ")");
				b ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + G(this.rotationOriginX, f.getAttribute("x"), 0) + " " + G(this.rotationOriginY, f.getAttribute("y") || 0) + ")");
				(B(y) || B(d)) && a.push("scale(" + G(y, 1) + " " + G(d, 1) + ")");
				a.length && f.setAttribute("transform", a.join(" "))
			},
			toFront: function() {
				var a = this.element;
				a.parentNode.appendChild(a);
				return this
			},
			align: function(a, k, y) {
				var I, d, b, c, n = {};
				d = this.renderer;
				b = d.alignedObjects;
				var f, v;
				if (a) {
					if (this.alignOptions = a, this.alignByTranslate = k, !y || x(y)) this.alignTo = I = y || "renderer", w(b, this), b.push(this), y = null
				} else a = this.alignOptions, k = this.alignByTranslate,
					I = this.alignTo;
				y = G(y, d[I], d);
				I = a.align;
				d = a.verticalAlign;
				b = (y.x || 0) + (a.x || 0);
				c = (y.y || 0) + (a.y || 0);
				"right" === I ? f = 1 : "center" === I && (f = 2);
				f && (b += (y.width - (a.width || 0)) / f);
				n[k ? "translateX" : "x"] = Math.round(b);
				"bottom" === d ? v = 1 : "middle" === d && (v = 2);
				v && (c += (y.height - (a.height || 0)) / v);
				n[k ? "translateY" : "y"] = Math.round(c);
				this[this.placed ? "animate" : "attr"](n);
				this.placed = !0;
				this.alignAttr = n;
				return this
			},
			getBBox: function(a, k) {
				var y, d = this.renderer,
					I, n = this.element,
					f = this.styles,
					v, m = this.textStr,
					r, M = d.cache,
					w = d.cacheKeys,
					g;
				k = G(k, this.rotation);
				I = k * e;
				v = f && f.fontSize;
				void 0 !== m && (g = m.toString(), -1 === g.indexOf("\x3c") && (g = g.replace(/[0-9]/g, "0")), g += ["", k || 0, v, f && f.width, f && f.textOverflow].join());
				g && !a && (y = M[g]);
				if (!y) {
					if (n.namespaceURI === this.SVG_NS || d.forExport) {
						try {
							(r = this.fakeTS && function(a) {
								c(n.querySelectorAll(".highcharts-text-outline"), function(k) {
									k.style.display = a
								})
							}) && r("none"), y = n.getBBox ? b({}, n.getBBox()) : {
								width: n.offsetWidth,
								height: n.offsetHeight
							}, r && r("")
						} catch (T) {}
						if (!y || 0 > y.width) y = {
							width: 0,
							height: 0
						}
					} else y = this.htmlGetBBox();
					d.isSVG && (a = y.width, d = y.height, f && "11px" === f.fontSize && 17 === Math.round(d) && (y.height = d = 14), k && (y.width = Math.abs(d * Math.sin(I)) + Math.abs(a * Math.cos(I)), y.height = Math.abs(d * Math.cos(I)) + Math.abs(a * Math.sin(I))));
					if (g && 0 < y.height) {
						for (; 250 < w.length;) delete M[w.shift()];
						M[g] || w.push(g);
						M[g] = y
					}
				}
				return y
			},
			show: function(a) {
				return this.attr({
					visibility: a ? "inherit" : "visible"
				})
			},
			hide: function() {
				return this.attr({
					visibility: "hidden"
				})
			},
			fadeOut: function(a) {
				var k = this;
				k.animate({
					opacity: 0
				}, {
					duration: a || 150,
					complete: function() {
						k.attr({
							y: -9999
						})
					}
				})
			},
			add: function(a) {
				var k = this.renderer,
					y = this.element,
					d;
				a && (this.parentGroup = a);
				this.parentInverted = a && a.inverted;
				void 0 !== this.textStr && k.buildText(this);
				this.added = !0;
				if (!a || a.handleZ || this.zIndex) d = this.zIndexSetter();
				d || (a ? a.element : k.box).appendChild(y);
				if (this.onAdd) this.onAdd();
				return this
			},
			safeRemoveChild: function(a) {
				var k = a.parentNode;
				k && k.removeChild(a)
			},
			destroy: function() {
				var a = this,
					k = a.element || {},
					y = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup,
					d = k.ownerSVGElement;
				k.onclick = k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
				P(a);
				a.clipPath && d && (c(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function(k) {
					k.getAttribute("clip-path").match(RegExp('[("]#' + a.clipPath.element.id + '[)"]')) && k.removeAttribute("clip-path")
				}), a.clipPath = a.clipPath.destroy());
				if (a.stops) {
					for (d = 0; d < a.stops.length; d++) a.stops[d] = a.stops[d].destroy();
					a.stops = null
				}
				a.safeRemoveChild(k);
				for (a.destroyShadows(); y && y.div && 0 === y.div.childNodes.length;) k = y.parentGroup,
					a.safeRemoveChild(y.div), delete y.div, y = k;
				a.alignTo && w(a.renderer.alignedObjects, a);
				n(a, function(k, y) {
					delete a[y]
				});
				return null
			},
			shadow: function(a, k, y) {
				var d = [],
					b, n, f = this.element,
					c, I, v, m;
				if (!a) this.destroyShadows();
				else if (!this.shadows) {
					I = G(a.width, 3);
					v = (a.opacity || .15) / I;
					m = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
					for (b = 1; b <= I; b++) n = f.cloneNode(0), c = 2 * I + 1 - 2 * b, l(n, {
						isShadow: "true",
						stroke: a.color || "#000000",
						"stroke-opacity": v * b,
						"stroke-width": c,
						transform: "translate" + m,
						fill: "none"
					}), y && (l(n, "height", Math.max(l(n, "height") - c, 0)), n.cutHeight = c), k ? k.element.appendChild(n) : f.parentNode && f.parentNode.insertBefore(n, f), d.push(n);
					this.shadows = d
				}
				return this
			},
			destroyShadows: function() {
				c(this.shadows || [], function(a) {
					this.safeRemoveChild(a)
				}, this);
				this.shadows = void 0
			},
			xGetter: function(a) {
				"circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
				return this._defaultGetter(a)
			},
			_defaultGetter: function(a) {
				a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
				return a
			},
			dSetter: function(a, k, y) {
				a && a.join && (a = a.join(" "));
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				this[k] !== a && (y.setAttribute(k, a), this[k] = a)
			},
			dashstyleSetter: function(a) {
				var y, d = this["stroke-width"];
				"inherit" === d && (d = 1);
				if (a = a && a.toLowerCase()) {
					a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for (y = a.length; y--;) a[y] = k(a[y]) * d;
					a = a.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function(a) {
				this.element.setAttribute("text-anchor", {
					left: "start",
					center: "middle",
					right: "end"
				}[a])
			},
			opacitySetter: function(a, k, y) {
				this[k] = a;
				y.setAttribute(k, a)
			},
			titleSetter: function(a) {
				var k = this.element.getElementsByTagName("title")[0];
				k || (k = g.createElementNS(this.SVG_NS, "title"), this.element.appendChild(k));
				k.firstChild && k.removeChild(k.firstChild);
				k.appendChild(g.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "")))
			},
			textSetter: function(a) {
				a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
			},
			fillSetter: function(a, k, y) {
				"string" === typeof a ? y.setAttribute(k, a) : a && this.colorGradient(a, k, y)
			},
			visibilitySetter: function(a, k, y) {
				"inherit" === a ? y.removeAttribute(k) : this[k] !== a && y.setAttribute(k, a);
				this[k] = a
			},
			zIndexSetter: function(a, y) {
				var d = this.renderer,
					b = this.parentGroup,
					n = (b || d).element || d.box,
					f, c = this.element,
					v, m, d = n === d.box;
				f = this.added;
				var I;
				B(a) && (c.zIndex = a, a = +a, this[y] === a && (f = !1), this[y] = a);
				if (f) {
					(a = this.zIndex) && b && (b.handleZ = !0);
					y = n.childNodes;
					for (I = y.length - 1; 0 <= I && !v; I--)
						if (b = y[I], f = b.zIndex, m = !B(f), b !== c)
							if (0 > a && m && !d && !I) n.insertBefore(c, y[I]), v = !0;
							else if (k(f) <= a || m && (!B(a) || 0 <= a)) n.insertBefore(c, y[I + 1] || null), v = !0;
					v || (n.insertBefore(c, y[d ? 3 : 0] || null), v = !0)
				}
				return v
			},
			_defaultSetter: function(a, k, y) {
				y.setAttribute(k, a)
			}
		});
		E.prototype.yGetter = E.prototype.xGetter;
		E.prototype.translateXSetter = E.prototype.translateYSetter = E.prototype.rotationSetter = E.prototype.verticalAlignSetter = E.prototype.rotationOriginXSetter = E.prototype.rotationOriginYSetter = E.prototype.scaleXSetter = E.prototype.scaleYSetter = E.prototype.matrixSetter = function(a, k) {
			this[k] = a;
			this.doTransform = !0
		};
		E.prototype["stroke-widthSetter"] = E.prototype.strokeSetter = function(a, k, y) {
			this[k] = a;
			this.stroke && this["stroke-width"] ? (E.prototype.fillSetter.call(this, this.stroke, "stroke", y), y.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === k && 0 === a && this.hasStroke && (y.removeAttribute("stroke"), this.hasStroke = !1)
		};
		D = a.SVGRenderer = function() {
			this.init.apply(this, arguments)
		};
		b(D.prototype, {
			Element: E,
			SVG_NS: O,
			init: function(a, k, y, d, b, n) {
				var f;
				d = this.createElement("svg").attr({
					version: "1.1",
					"class": "highcharts-root"
				}).css(this.getStyle(d));
				f = d.element;
				a.appendChild(f); - 1 === a.innerHTML.indexOf("xmlns") && l(f, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = f;
				this.boxWrapper = d;
				this.alignedObjects = [];
				this.url = (A || J) && g.getElementsByTagName("base").length ? R.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
				this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highstock 6.0.2"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = n;
				this.forExport = b;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(k, y, !1);
				var c;
				A && a.getBoundingClientRect && (k = function() {
					q(a, {
						left: 0,
						top: 0
					});
					c = a.getBoundingClientRect();
					q(a, {
						left: Math.ceil(c.left) - c.left + "px",
						top: Math.ceil(c.top) - c.top + "px"
					})
				}, k(), this.unSubPixelFix = F(R, "resize", k))
			},
			getStyle: function(a) {
				return this.style = b({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, a)
			},
			setStyle: function(a) {
				this.boxWrapper.css(this.getStyle(a))
			},
			isHidden: function() {
				return !this.boxWrapper.getBBox().width
			},
			destroy: function() {
				var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				h(this.gradients || {});
				this.gradients = null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix && this.unSubPixelFix();
				return this.alignedObjects = null
			},
			createElement: function(a) {
				var k = new this.Element;
				k.init(this, a);
				return k
			},
			draw: d,
			getRadialAttr: function(a, k) {
				return {
					cx: a[0] - a[2] / 2 + k.cx * a[2],
					cy: a[1] - a[2] / 2 + k.cy * a[2],
					r: k.r * a[2]
				}
			},
			getSpanWidth: function(a, k) {
				var y = a.getBBox(!0).width;
				!M && this.forExport && (y = this.measureSpanWidth(k.firstChild.data, a.styles));
				return y
			},
			applyEllipsis: function(a, k, y, d) {
				var b = a.rotation,
					n = y,
					f, c = 0,
					v = y.length,
					m = function(a) {
						k.removeChild(k.firstChild);
						a && k.appendChild(g.createTextNode(a))
					},
					r;
				a.rotation = 0;
				n = this.getSpanWidth(a, k);
				if (r = n > d) {
					for (; c <= v;) f = Math.ceil((c + v) / 2), n = y.substring(0, f) + "\u2026", m(n), n = this.getSpanWidth(a, k), c === v ? c = v + 1 : n > d ? v = f - 1 : c = f;
					0 === v && m("")
				}
				a.rotation = b;
				return r
			},
			escapes: {
				"\x26": "\x26amp;",
				"\x3c": "\x26lt;",
				"\x3e": "\x26gt;",
				"'": "\x26#39;",
				'"': "\x26quot"
			},
			buildText: function(a) {
				var y = a.element,
					d = this,
					b = d.forExport,
					f = G(a.textStr, "").toString(),
					v = -1 !== f.indexOf("\x3c"),
					r = y.childNodes,
					I, w, C, e, x = l(y, "x"),
					h = a.styles,
					A = a.textWidth,
					N = h && h.lineHeight,
					P = h && h.textOutline,
					H = h && "ellipsis" === h.textOverflow,
					J = h && "nowrap" === h.whiteSpace,
					K = h && h.fontSize,
					R, u, p = r.length,
					h = A && !a.added && this.box,
					B = function(a) {
						var b;
						b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : K || d.style.fontSize || 12;
						return N ? k(N) : d.fontMetrics(b, a.getAttribute("style") ? a : y).h
					},
					t = function(a) {
						n(d.escapes, function(k, y) {
							a = a.replace(new RegExp(k, "g"), y)
						});
						return a
					};
				R = [f, H, J, N, P, K, A].join();
				if (R !== a.textCache) {
					for (a.textCache = R; p--;) y.removeChild(r[p]);
					v || P || H || A || -1 !== f.indexOf(" ") ? (I = /<.*class="([^"]+)".*>/, w = /<.*style="([^"]+)".*>/, C = /<.*href="([^"]+)".*>/, h && h.appendChild(y), f = v ? f.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [f], f = m(f, function(a) {
						return "" !== a
					}), c(f, function(k, f) {
						var n, v = 0;
						k = k.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
						n = k.split("|||");
						c(n, function(k) {
							if ("" !== k || 1 === n.length) {
								var c = {},
									m = g.createElementNS(d.SVG_NS, "tspan"),
									r, G;
								I.test(k) && (r = k.match(I)[1], l(m, "class", r));
								w.test(k) && (G = k.match(w)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), l(m, "style", G));
								C.test(k) && !b && (l(m, "onclick", 'location.href\x3d"' + k.match(C)[1] + '"'), l(m, "class", "highcharts-anchor"), q(m, {
									cursor: "pointer"
								}));
								k = t(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
								if (" " !== k) {
									m.appendChild(g.createTextNode(k));
									v ? c.dx = 0 : f && null !== x && (c.x = x);
									l(m, c);
									y.appendChild(m);
									!v && u && (!M && b && q(m, {
										display: "block"
									}), l(m, "dy", B(m)));
									if (A) {
										c = k.replace(/([^\^])-/g, "$1- ").split(" ");
										r = 1 < n.length || f || 1 < c.length && !J;
										var h = [],
											N, P = B(m),
											S = a.rotation;
										for (H && (e = d.applyEllipsis(a, m, k, A)); !H && r && (c.length || h.length);) a.rotation = 0, N = d.getSpanWidth(a, m), k = N > A, void 0 === e && (e = k), k && 1 !== c.length ? (m.removeChild(m.firstChild), h.unshift(c.pop())) : (c = h, h = [], c.length && !J && (m = g.createElementNS(O, "tspan"), l(m, {
											dy: P,
											x: x
										}), G && l(m, "style", G), y.appendChild(m)), N > A && (A = N)), c.length && m.appendChild(g.createTextNode(c.join(" ").replace(/- /g, "-")));
										a.rotation = S
									}
									v++
								}
							}
						});
						u = u || y.childNodes.length
					}), e && a.attr("title", a.textStr), h && h.removeChild(y), P && a.applyTextOutline && a.applyTextOutline(P)) : y.appendChild(g.createTextNode(t(f)))
				}
			},
			getContrast: function(a) {
				a = z(a).rgba;
				return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
			},
			button: function(a, k, y, d, f, c, n, m, r) {
				var M = this.label(a, k, y, r, null, null, null, null, "button"),
					w = 0;
				M.attr(v({
					padding: 8,
					r: 2
				}, f));
				var I, g, C, e;
				f = v({
					fill: "#f7f7f7",
					stroke: "#cccccc",
					"stroke-width": 1,
					style: {
						color: "#333333",
						cursor: "pointer",
						fontWeight: "normal"
					}
				}, f);
				I = f.style;
				delete f.style;
				c = v(f, {
					fill: "#e6e6e6"
				}, c);
				g = c.style;
				delete c.style;
				n = v(f, {
					fill: "#e6ebf5",
					style: {
						color: "#000000",
						fontWeight: "bold"
					}
				}, n);
				C = n.style;
				delete n.style;
				m = v(f, {
					style: {
						color: "#cccccc"
					}
				}, m);
				e = m.style;
				delete m.style;
				F(M.element, K ? "mouseover" : "mouseenter", function() {
					3 !== w && M.setState(1)
				});
				F(M.element, K ? "mouseout" : "mouseleave", function() {
					3 !== w && M.setState(w)
				});
				M.setState = function(a) {
					1 !== a && (M.state = w = a);
					M.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
					M.attr([f, c, n, m][a || 0]).css([I, g, C, e][a || 0])
				};
				M.attr(f).css(b({
					cursor: "default"
				}, I));
				return M.on("click", function(a) {
					3 !== w && d.call(M, a)
				})
			},
			crispLine: function(a, k) {
				a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - k % 2 / 2);
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + k % 2 / 2);
				return a
			},
			path: function(a) {
				var k = {
					fill: "none"
				};
				H(a) ? k.d = a : f(a) && b(k, a);
				return this.createElement("path").attr(k)
			},
			circle: function(a, k, y) {
				a = f(a) ? a : {
					x: a,
					y: k,
					r: y
				};
				k = this.createElement("circle");
				k.xSetter = k.ySetter = function(a, k, y) {
					y.setAttribute("c" + k, a)
				};
				return k.attr(a)
			},
			arc: function(a, k, y, d, b, c) {
				f(a) ? (d = a, k = d.y, y = d.r, a = d.x) : d = {
					innerR: d,
					start: b,
					end: c
				};
				a = this.symbol("arc", a, k, y, y, d);
				a.r = y;
				return a
			},
			rect: function(a, k, y, d, b, c) {
				b = f(a) ? a.r : b;
				var n = this.createElement("rect");
				a = f(a) ? a : void 0 === a ? {} : {
					x: a,
					y: k,
					width: Math.max(y, 0),
					height: Math.max(d, 0)
				};
				void 0 !== c && (a.strokeWidth = c, a = n.crisp(a));
				a.fill = "none";
				b && (a.r = b);
				n.rSetter = function(a, k, y) {
					l(y, {
						rx: a,
						ry: a
					})
				};
				return n.attr(a)
			},
			setSize: function(a, k, y) {
				var d = this.alignedObjects,
					f = d.length;
				this.width = a;
				this.height = k;
				for (this.boxWrapper.animate({
						width: a,
						height: k
					}, {
						step: function() {
							this.attr({
								viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
							})
						},
						duration: G(y, !0) ? void 0 : 0
					}); f--;) d[f].align()
			},
			g: function(a) {
				var k = this.createElement("g");
				return a ? k.attr({
					"class": "highcharts-" + a
				}) : k
			},
			image: function(a, k, y, d, f) {
				var c = {
					preserveAspectRatio: "none"
				};
				1 < arguments.length && b(c, {
					x: k,
					y: y,
					width: d,
					height: f
				});
				c = this.createElement("image").attr(c);
				c.element.setAttributeNS ? c.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.element.setAttribute("hc-svg-href", a);
				return c
			},
			symbol: function(a, k, y, d, f, n) {
				var m = this,
					v, r = /^url\((.*?)\)$/,
					M = r.test(a),
					w = !M && (this.symbols[a] ? a : "circle"),
					C = w && this.symbols[w],
					e = B(k) && C && C.call(this.symbols, Math.round(k), Math.round(y), d, f, n),
					h, x;
				C ? (v = this.path(e), v.attr("fill", "none"), b(v, {
					symbolName: w,
					x: k,
					y: y,
					width: d,
					height: f
				}), n && b(v, n)) : M && (h = a.match(r)[1], v = this.image(h), v.imgwidth = G(N[h] && N[h].width, n && n.width), v.imgheight = G(N[h] && N[h].height, n && n.height), x = function() {
					v.attr({
						width: v.width,
						height: v.height
					})
				}, c(["width", "height"], function(a) {
					v[a + "Setter"] = function(a, k) {
						var y = {},
							d = this["img" + k],
							f = "width" === k ? "translateX" : "translateY";
						this[k] = a;
						B(d) && (this.element && this.element.setAttribute(k, d), this.alignByTranslate || (y[f] = ((this[k] || 0) - d) / 2, this.attr(y)))
					}
				}), B(k) && v.attr({
					x: k,
					y: y
				}), v.isImg = !0, B(v.imgwidth) && B(v.imgheight) ? x() : (v.attr({
					width: 0,
					height: 0
				}), u("img", {
					onload: function() {
						var a = p[m.chartIndex];
						0 === this.width && (q(this, {
							position: "absolute",
							top: "-999em"
						}), g.body.appendChild(this));
						N[h] = {
							width: this.width,
							height: this.height
						};
						v.imgwidth = this.width;
						v.imgheight = this.height;
						v.element && x();
						this.parentNode && this.parentNode.removeChild(this);
						m.imgCount--;
						if (!m.imgCount && a && a.onload) a.onload()
					},
					src: h
				}), this.imgCount++));
				return v
			},
			symbols: {
				circle: function(a, k, y, d) {
					return this.arc(a + y / 2, k + d / 2, y / 2, d / 2, {
						start: 0,
						end: 2 * Math.PI,
						open: !1
					})
				},
				square: function(a, k, y, d) {
					return ["M", a, k, "L", a + y, k, a + y, k + d, a, k + d, "Z"]
				},
				triangle: function(a, k, y, d) {
					return ["M", a + y / 2, k, "L", a + y, k + d, a, k + d, "Z"]
				},
				"triangle-down": function(a, k, y, d) {
					return ["M", a, k, "L", a + y, k, a + y / 2, k + d, "Z"]
				},
				diamond: function(a, k, y, d) {
					return ["M", a + y / 2, k, "L", a + y, k + d / 2, a + y / 2, k + d, a, k + d / 2, "Z"]
				},
				arc: function(a, k, y, d, f) {
					var c = f.start,
						n = f.r || y,
						b = f.r || d || y,
						v = f.end - .001;
					y = f.innerR;
					d = G(f.open, .001 > Math.abs(f.end - f.start - 2 * Math.PI));
					var m = Math.cos(c),
						r = Math.sin(c),
						M = Math.cos(v),
						v = Math.sin(v);
					f = .001 > f.end - c - Math.PI ? 0 : 1;
					n = ["M", a + n * m, k + b * r, "A", n, b, 0, f, 1, a + n * M, k + b * v];
					B(y) && n.push(d ? "M" : "L", a + y * M, k + y * v, "A", y, y, 0, f, 0, a + y * m, k + y * r);
					n.push(d ? "" : "Z");
					return n
				},
				callout: function(a, k, y, d, f) {
					var n = Math.min(f && f.r || 0, y, d),
						c = n + 6,
						b = f && f.anchorX;
					f = f && f.anchorY;
					var v;
					v = ["M", a + n, k, "L", a + y - n, k, "C", a + y, k, a + y, k, a + y, k + n, "L", a + y, k + d - n, "C", a + y, k + d, a + y, k + d, a + y - n, k + d, "L", a + n, k + d, "C", a, k + d, a, k + d, a, k + d - n, "L", a, k + n, "C", a, k, a, k, a + n, k];
					b && b > y ? f > k + c && f < k + d - c ? v.splice(13, 3, "L", a + y, f - 6, a + y + 6, f, a + y, f + 6, a + y, k + d - n) : v.splice(13, 3, "L", a + y, d / 2, b, f, a + y, d / 2, a + y, k + d - n) : b && 0 > b ? f > k + c && f < k + d - c ? v.splice(33, 3, "L", a, f + 6, a - 6, f, a, f - 6, a, k + n) : v.splice(33, 3, "L", a, d / 2, b, f, a, d / 2, a, k + n) : f && f > d && b > a + c && b < a + y - c ? v.splice(23, 3, "L", b + 6, k + d, b, k + d + 6, b - 6, k + d, a + n, k + d) : f && 0 > f && b > a + c && b < a + y - c && v.splice(3, 3, "L", b - 6, k, b, k - 6, b + 6, k, y - n, k);
					return v
				}
			},
			clipRect: function(k, y, d, f) {
				var n = a.uniqueKey(),
					b = this.createElement("clipPath").attr({
						id: n
					}).add(this.defs);
				k = this.rect(k, y, d, f, 0).add(b);
				k.id = n;
				k.clipPath = b;
				k.count = 0;
				return k
			},
			text: function(a, k, y, d) {
				var f = {};
				if (d && (this.allowHTML || !this.forExport)) return this.html(a, k, y);
				f.x = Math.round(k || 0);
				y && (f.y = Math.round(y));
				if (a || 0 === a) f.text = a;
				a = this.createElement("text").attr(f);
				d || (a.xSetter = function(a, k, y) {
					var d = y.getElementsByTagName("tspan"),
						f, n = y.getAttribute(k),
						b;
					for (b = 0; b < d.length; b++) f = d[b], f.getAttribute(k) === n && f.setAttribute(k, a);
					y.setAttribute(k, a)
				});
				return a
			},
			fontMetrics: function(a, y) {
				a = a || y && y.style && y.style.fontSize || this.style && this.style.fontSize;
				a = /px/.test(a) ? k(a) : /em/.test(a) ? parseFloat(a) * (y ? this.fontMetrics(null, y.parentNode).f : 16) : 12;
				y = 24 > a ? a + 3 : Math.round(1.2 * a);
				return {
					h: y,
					b: Math.round(.8 * y),
					f: a
				}
			},
			rotCorr: function(a, k, y) {
				var d = a;
				k && y && (d = Math.max(d * Math.cos(k * e), 4));
				return {
					x: -a / 3 * Math.sin(k * e),
					y: d
				}
			},
			label: function(k, d, f, n, m, r, M, w, g) {
				var C = this,
					e = C.g("button" !== g && "label"),
					h = e.text = C.text("", 0, 0, M).attr({
						zIndex: 1
					}),
					G, x, A = 0,
					N = 3,
					P = 0,
					H, q, I, J, K, R = {},
					u, O, p = /^url\((.*?)\)$/.test(n),
					l = p,
					S, t, z, W;
				g && e.addClass("highcharts-" + g);
				l = p;
				S = function() {
					return (u || 0) % 2 / 2
				};
				t = function() {
					var a = h.element.style,
						k = {};
					x = (void 0 === H || void 0 === q || K) && B(h.textStr) && h.getBBox();
					e.width = (H || x.width || 0) + 2 * N + P;
					e.height = (q || x.height || 0) + 2 * N;
					O = N + C.fontMetrics(a && a.fontSize, h).b;
					l && (G || (e.box = G = C.symbols[n] || p ? C.symbol(n) : C.rect(), G.addClass(("button" === g ? "" : "highcharts-label-box") + (g ? " highcharts-" + g + "-box" : "")), G.add(e), a = S(), k.x = a, k.y = (w ? -O : 0) + a), k.width = Math.round(e.width), k.height = Math.round(e.height), G.attr(b(k, R)), R = {})
				};
				z = function() {
					var a = P + N,
						k;
					k = w ? 0 : O;
					B(H) && x && ("center" === K || "right" === K) && (a += {
						center: .5,
						right: 1
					}[K] * (H - x.width));
					if (a !== h.x || k !== h.y) h.attr("x", a), void 0 !== k && h.attr("y", k);
					h.x = a;
					h.y = k
				};
				W = function(a, k) {
					G ? G.attr(a, k) : R[a] = k
				};
				e.onAdd = function() {
					h.add(e);
					e.attr({
						text: k || 0 === k ? k : "",
						x: d,
						y: f
					});
					G && B(m) && e.attr({
						anchorX: m,
						anchorY: r
					})
				};
				e.widthSetter = function(k) {
					H = a.isNumber(k) ? k : null
				};
				e.heightSetter = function(a) {
					q = a
				};
				e["text-alignSetter"] = function(a) {
					K = a
				};
				e.paddingSetter = function(a) {
					B(a) && a !== N && (N = e.padding = a, z())
				};
				e.paddingLeftSetter = function(a) {
					B(a) && a !== P && (P = a, z())
				};
				e.alignSetter = function(a) {
					a = {
						left: 0,
						center: .5,
						right: 1
					}[a];
					a !== A && (A = a, x && e.attr({
						x: I
					}))
				};
				e.textSetter = function(a) {
					void 0 !== a && h.textSetter(a);
					t();
					z()
				};
				e["stroke-widthSetter"] = function(a, k) {
					a && (l = !0);
					u = this["stroke-width"] = a;
					W(k, a)
				};
				e.strokeSetter = e.fillSetter = e.rSetter = function(a, k) {
					"r" !== k && ("fill" === k && a && (l = !0), e[k] = a);
					W(k, a)
				};
				e.anchorXSetter = function(a, k) {
					m = e.anchorX = a;
					W(k, Math.round(a) - S() - I)
				};
				e.anchorYSetter = function(a, k) {
					r = e.anchorY = a;
					W(k, a - J)
				};
				e.xSetter = function(a) {
					e.x = a;
					A && (a -= A * ((H || x.width) + 2 * N));
					I = Math.round(a);
					e.attr("translateX", I)
				};
				e.ySetter = function(a) {
					J = e.y = Math.round(a);
					e.attr("translateY", J)
				};
				var aa = e.css;
				return b(e, {
					css: function(a) {
						if (a) {
							var k = {};
							a = v(a);
							c(e.textProps, function(y) {
								void 0 !== a[y] && (k[y] = a[y], delete a[y])
							});
							h.css(k)
						}
						return aa.call(e, a)
					},
					getBBox: function() {
						return {
							width: x.width + 2 * N,
							height: x.height + 2 * N,
							x: x.x - N,
							y: x.y - N
						}
					},
					shadow: function(a) {
						a && (t(), G && G.shadow(a));
						return e
					},
					destroy: function() {
						y(e.element, "mouseenter");
						y(e.element, "mouseleave");
						h && (h = h.destroy());
						G && (G = G.destroy());
						E.prototype.destroy.call(e);
						e = C = t = z = W = null
					}
				})
			}
		});
		a.Renderer = D
	})(L);
	(function(a) {
		var E = a.attr,
			D = a.createElement,
			F = a.css,
			t = a.defined,
			l = a.each,
			p = a.extend,
			z = a.isFirefox,
			q = a.isMS,
			u = a.isWebKit,
			B = a.pInt,
			e = a.SVGRenderer,
			h = a.win,
			g = a.wrap;
		p(a.SVGElement.prototype, {
			htmlCss: function(a) {
				var b = this.element;
				if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
				a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
				this.styles = p(this.styles, a);
				F(this.element, a);
				return this
			},
			htmlGetBBox: function() {
				var a = this.element;
				return {
					x: a.offsetLeft,
					y: a.offsetTop,
					width: a.offsetWidth,
					height: a.offsetHeight
				}
			},
			htmlUpdateTransform: function() {
				if (this.added) {
					var a = this.renderer,
						b = this.element,
						e = this.translateX || 0,
						m = this.translateY || 0,
						r = this.x || 0,
						g = this.y || 0,
						h = this.textAlign || "left",
						A = {
							left: 0,
							center: .5,
							right: 1
						}[h],
						q = this.styles;
					F(b, {
						marginLeft: e,
						marginTop: m
					});
					this.shadows && l(this.shadows, function(a) {
						F(a, {
							marginLeft: e + 1,
							marginTop: m + 1
						})
					});
					this.inverted && l(b.childNodes, function(d) {
						a.invertChild(d, b)
					});
					if ("SPAN" === b.tagName) {
						var f = this.rotation,
							x = B(this.textWidth),
							J = q && q.whiteSpace,
							v = [f, h, b.innerHTML, this.textWidth,
								this.textAlign
							].join();
						v !== this.cTT && (q = a.fontMetrics(b.style.fontSize).b, t(f) && this.setSpanRotation(f, A, q), F(b, {
							width: "",
							whiteSpace: J || "nowrap"
						}), b.offsetWidth > x && /[ \-]/.test(b.textContent || b.innerText) && F(b, {
							width: x + "px",
							display: "block",
							whiteSpace: J || "normal"
						}), this.getSpanCorrection(b.offsetWidth, q, A, f, h));
						F(b, {
							left: r + (this.xCorr || 0) + "px",
							top: g + (this.yCorr || 0) + "px"
						});
						u && (q = b.offsetHeight);
						this.cTT = v
					}
				} else this.alignOnAdd = !0
			},
			setSpanRotation: function(a, b, e) {
				var c = {},
					r = this.renderer.getTransformKey();
				c[r] = c.transform = "rotate(" + a + "deg)";
				c[r + (z ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + e + "px";
				F(this.element, c)
			},
			getSpanCorrection: function(a, b, e) {
				this.xCorr = -a * e;
				this.yCorr = -b
			}
		});
		p(e.prototype, {
			getTransformKey: function() {
				return q && !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : z ? "MozTransform" : h.opera ? "-o-transform" : ""
			},
			html: function(a, b, e) {
				var c = this.createElement("span"),
					r = c.element,
					w = c.renderer,
					h = w.isSVG,
					A = function(a, f) {
						l(["opacity", "visibility"], function(b) {
							g(a, b + "Setter", function(a, b, d, n) {
								a.call(this, b, d, n);
								f[d] = b
							})
						})
					};
				c.textSetter = function(a) {
					a !== r.innerHTML && delete this.bBox;
					r.innerHTML = this.textStr = a;
					c.htmlUpdateTransform()
				};
				h && A(c, c.element.style);
				c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(a, f) {
					"align" === f && (f = "textAlign");
					c[f] = a;
					c.htmlUpdateTransform()
				};
				c.attr({
					text: a,
					x: Math.round(b),
					y: Math.round(e)
				}).css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize,
					position: "absolute"
				});
				r.style.whiteSpace = "nowrap";
				c.css = c.htmlCss;
				h && (c.add = function(a) {
					var f, b = w.box.parentNode,
						m = [];
					if (this.parentGroup = a) {
						if (f = a.div, !f) {
							for (; a;) m.push(a), a = a.parentGroup;
							l(m.reverse(), function(a) {
								function d(k, y) {
									a[y] = k;
									q ? n[w.getTransformKey()] = "translate(" + (a.x || a.translateX) + "px," + (a.y || a.translateY) + "px)" : "translateX" === y ? n.left = k + "px" : n.top = k + "px";
									a.doTransform = !0
								}
								var n, v = E(a.element, "class");
								v && (v = {
									className: v
								});
								f = a.div = a.div || D("div", v, {
									position: "absolute",
									left: (a.translateX || 0) + "px",
									top: (a.translateY || 0) + "px",
									display: a.display,
									opacity: a.opacity,
									pointerEvents: a.styles && a.styles.pointerEvents
								}, f || b);
								n = f.style;
								p(a, {
									classSetter: function(a) {
										this.element.setAttribute("class", a);
										f.className = a
									},
									on: function() {
										m[0].div && c.on.apply({
											element: m[0].div
										}, arguments);
										return a
									},
									translateXSetter: d,
									translateYSetter: d
								});
								A(a, n)
							})
						}
					} else f = b;
					f.appendChild(r);
					c.added = !0;
					c.alignOnAdd && c.htmlUpdateTransform();
					return c
				});
				return c
			}
		})
	})(L);
	(function(a) {
		function E() {
			var q = a.defaultOptions.global,
				u = z.moment;
			if (q.timezone) {
				if (u) return function(a) {
					return -u.tz(a, q.timezone).utcOffset()
				};
				a.error(25)
			}
			return q.useUTC && q.getTimezoneOffset
		}

		function D() {
			var q = a.defaultOptions.global,
				u, l = q.useUTC,
				e = l ? "getUTC" : "get",
				h = l ? "setUTC" : "set",
				g = "Minutes Hours Day Date Month FullYear".split(" "),
				c = g.concat(["Milliseconds", "Seconds"]);
			a.Date = u = q.Date || z.Date;
			u.hcTimezoneOffset = l && q.timezoneOffset;
			u.hcGetTimezoneOffset = E();
			u.hcMakeTime = function(a, c, m, r, e, g) {
				var b;
				l ? (b = u.UTC.apply(0, arguments), b += t(b)) : b = (new u(a, c, p(m, 1), p(r, 0), p(e, 0), p(g, 0))).getTime();
				return b
			};
			for (q = 0; q < g.length; q++) u["hcGet" + g[q]] = e + g[q];
			for (q = 0; q < c.length; q++) u["hcSet" + c[q]] = h + c[q]
		}
		var F = a.color,
			t = a.getTZOffset,
			l = a.merge,
			p = a.pick,
			z = a.win;
		a.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {
				useUTC: !0
			},
			chart: {
				borderRadius: 0,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 20
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				layout: "horizontal",
				labelFormatter: function() {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					fontSize: "12px",
					fontWeight: "bold",
					textOverflow: "ellipsis"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: .5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: a.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: a.isTouchDevice ? 25 : 10,
				backgroundColor: F("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				href: "http://www.highcharts.com",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: "Highcharts.com"
			}
		};
		a.setOptions = function(q) {
			a.defaultOptions = l(!0, a.defaultOptions, q);
			D();
			return a.defaultOptions
		};
		a.getOptions = function() {
			return a.defaultOptions
		};
		a.defaultPlotOptions = a.defaultOptions.plotOptions;
		D()
	})(L);
	(function(a) {
		var E = a.correctFloat,
			D = a.defined,
			F = a.destroyObjectProperties,
			t = a.isNumber,
			l = a.merge,
			p = a.pick,
			z = a.deg2rad;
		a.Tick = function(a, u, p, e) {
			this.axis = a;
			this.pos = u;
			this.type = p || "";
			this.isNewLabel = this.isNew = !0;
			p || e || this.addLabel()
		};
		a.Tick.prototype = {
			addLabel: function() {
				var a = this.axis,
					u = a.options,
					B = a.chart,
					e = a.categories,
					h = a.names,
					g = this.pos,
					c = u.labels,
					b = a.tickPositions,
					w = g === b[0],
					m = g === b[b.length - 1],
					h = e ? p(e[g], h[g], g) : g,
					e = this.label,
					b = b.info,
					r;
				a.isDatetimeAxis && b && (r = u.dateTimeLabelFormats[b.higherRanks[g] || b.unitName]);
				this.isFirst = w;
				this.isLast = m;
				u = a.labelFormatter.call({
					axis: a,
					chart: B,
					isFirst: w,
					isLast: m,
					dateTimeLabelFormat: r,
					value: a.isLog ? E(a.lin2log(h)) : h,
					pos: g
				});
				D(e) ? e && e.attr({
					text: u
				}) : (this.labelLength = (this.label = e = D(u) && c.enabled ? B.renderer.text(u, 0, 0, c.useHTML).css(l(c.style)).add(a.labelGroup) : null) && e.getBBox().width, this.rotation = 0)
			},
			getLabelSize: function() {
				return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
			},
			handleOverflow: function(a) {
				var q = this.axis,
					l = a.x,
					e = q.chart.chartWidth,
					h = q.chart.spacing,
					g = p(q.labelLeft, Math.min(q.pos, h[3])),
					h = p(q.labelRight, Math.max(q.pos + q.len, e - h[1])),
					c = this.label,
					b = this.rotation,
					w = {
						left: 0,
						center: .5,
						right: 1
					}[q.labelAlign],
					m = c.getBBox().width,
					r = q.getSlotWidth(),
					C = r,
					H = 1,
					A, K = {};
				if (b) 0 > b && l - w * m < g ? A = Math.round(l / Math.cos(b * z) - g) : 0 < b && l + w * m > h && (A = Math.round((e - l) / Math.cos(b * z)));
				else if (e = l + (1 - w) * m, l - w * m < g ? C = a.x + C * (1 - w) - g : e > h && (C = h - a.x + C * w, H = -1), C = Math.min(r, C), C < r && "center" === q.labelAlign && (a.x += H * (r - C - w * (r - Math.min(m, C)))), m > C || q.autoRotation && (c.styles || {}).width) A = C;
				A && (K.width = A, (q.options.labels.style || {}).textOverflow || (K.textOverflow = "ellipsis"), c.css(K))
			},
			getPosition: function(a, p, l, e) {
				var h = this.axis,
					g = h.chart,
					c = e && g.oldChartHeight || g.chartHeight;
				return {
					x: a ? h.translate(p + l, null, null, e) + h.transB : h.left + h.offset + (h.opposite ? (e && g.oldChartWidth || g.chartWidth) - h.right - h.left : 0),
					y: a ? c - h.bottom + h.offset - (h.opposite ? h.height : 0) : c - h.translate(p + l, null, null, e) - h.transB
				}
			},
			getLabelPosition: function(a, p, l, e, h, g, c, b) {
				var w = this.axis,
					m = w.transA,
					r = w.reversed,
					C = w.staggerLines,
					H = w.tickRotCorr || {
						x: 0,
						y: 0
					},
					A = h.y;
				D(A) || (A = 0 === w.side ? l.rotation ? -8 : -l.getBBox().height : 2 === w.side ? H.y + 8 : Math.cos(l.rotation * z) * (H.y - l.getBBox(!1, 0).height / 2));
				a = a + h.x + H.x - (g && e ? g * m * (r ? -1 : 1) : 0);
				p = p + A - (g && !e ? g * m * (r ? 1 : -1) : 0);
				C && (l = c / (b || 1) % C, w.opposite && (l = C - l - 1), p += w.labelOffset / C * l);
				return {
					x: a,
					y: Math.round(p)
				}
			},
			getMarkPath: function(a, l, p, e, h, g) {
				return g.crispLine(["M", a, l, "L", a + (h ? 0 : -p), l + (h ? p : 0)], e)
			},
			renderGridLine: function(a, l, p) {
				var e = this.axis,
					h = e.options,
					g = this.gridLine,
					c = {},
					b = this.pos,
					w = this.type,
					m = e.tickmarkOffset,
					r = e.chart.renderer,
					C = w ? w + "Grid" : "grid",
					H = h[C + "LineWidth"],
					A = h[C + "LineColor"],
					h = h[C + "LineDashStyle"];
				g || (c.stroke = A, c["stroke-width"] = H, h && (c.dashstyle = h), w || (c.zIndex = 1), a && (c.opacity = 0), this.gridLine = g = r.path().attr(c).addClass("highcharts-" + (w ? w + "-" : "") + "grid-line").add(e.gridGroup));
				if (!a && g && (a = e.getPlotLinePath(b + m, g.strokeWidth() * p, a, !0))) g[this.isNew ? "attr" : "animate"]({
					d: a,
					opacity: l
				})
			},
			renderMark: function(a, l, B) {
				var e = this.axis,
					h = e.options,
					g = e.chart.renderer,
					c = this.type,
					b = c ? c + "Tick" : "tick",
					w = e.tickSize(b),
					m = this.mark,
					r = !m,
					C = a.x;
				a = a.y;
				var H = p(h[b + "Width"], !c && e.isXAxis ? 1 : 0),
					h = h[b + "Color"];
				w && (e.opposite && (w[0] = -w[0]), r && (this.mark = m = g.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(e.axisGroup), m.attr({
					stroke: h,
					"stroke-width": H
				})), m[r ? "attr" : "animate"]({
					d: this.getMarkPath(C, a, w[0], m.strokeWidth() * B, e.horiz, g),
					opacity: l
				}))
			},
			renderLabel: function(a, l, B, e) {
				var h = this.axis,
					g = h.horiz,
					c = h.options,
					b = this.label,
					w = c.labels,
					m = w.step,
					r = h.tickmarkOffset,
					C = !0,
					H = a.x;
				a = a.y;
				b && t(H) && (b.xy = a = this.getLabelPosition(H, a, b, g, w, r, e, m), this.isFirst && !this.isLast && !p(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(c.showLastLabel, 1) ? C = !1 : !g || h.isRadial || w.step || w.rotation || l || 0 === B || this.handleOverflow(a), m && e % m && (C = !1), C && t(a.y) ? (a.opacity = B, b[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (b.attr("y", -9999), this.isNewLabel = !0))
			},
			render: function(a, l, B) {
				var e = this.axis,
					h = e.horiz,
					g = this.getPosition(h, this.pos, e.tickmarkOffset, l),
					c = g.x,
					b = g.y,
					e = h && c === e.pos + e.len || !h && b === e.pos ? -1 : 1;
				B = p(B, 1);
				this.isActive = !0;
				this.renderGridLine(l, B, e);
				this.renderMark(g, B, e);
				this.renderLabel(g, l, B, a);
				this.isNew = !1
			},
			destroy: function() {
				F(this, this.axis)
			}
		}
	})(L);
	var Z = function(a) {
		var E = a.addEvent,
			D = a.animObject,
			F = a.arrayMax,
			t = a.arrayMin,
			l = a.color,
			p = a.correctFloat,
			z = a.defaultOptions,
			q = a.defined,
			u = a.deg2rad,
			B = a.destroyObjectProperties,
			e = a.each,
			h = a.extend,
			g = a.fireEvent,
			c = a.format,
			b = a.getMagnitude,
			w = a.grep,
			m = a.inArray,
			r = a.isArray,
			C = a.isNumber,
			H = a.isString,
			A = a.merge,
			K = a.normalizeTickInterval,
			f = a.objectEach,
			x = a.pick,
			J = a.removeEvent,
			v = a.splat,
			d = a.syncTimeout,
			n = a.Tick,
			G = function() {
				this.init.apply(this, arguments)
			};
		a.extend(G.prototype, {
			defaultOptions: {
				dateTimeLabelFormats: {
					millisecond: "%H:%M:%S.%L",
					second: "%H:%M:%S",
					minute: "%H:%M",
					hour: "%H:%M",
					day: "%e. %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y"
				},
				endOnTick: !1,
				labels: {
					enabled: !0,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					},
					x: 0
				},
				minPadding: .01,
				maxPadding: .01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickmarkPlacement: "between",
				tickPixelInterval: 100,
				tickPosition: "outside",
				title: {
					align: "middle",
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				maxPadding: .05,
				minPadding: .05,
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					allowOverlap: !1,
					enabled: !1,
					formatter: function() {
						return a.numberFormat(this.total, -1)
					},
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "#000000",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			},
			defaultRightAxisOptions: {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			},
			defaultBottomAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			defaultTopAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			init: function(a, y) {
				var k = y.isX,
					d = this;
				d.chart = a;
				d.horiz = a.inverted && !d.isZAxis ? !k : k;
				d.isXAxis = k;
				d.coll = d.coll || (k ? "xAxis" : "yAxis");
				d.opposite = y.opposite;
				d.side = y.side || (d.horiz ? d.opposite ? 0 : 2 : d.opposite ? 1 : 3);
				d.setOptions(y);
				var b = this.options,
					n = b.type;
				d.labelFormatter = b.labels.formatter || d.defaultLabelFormatter;
				d.userOptions = y;
				d.minPixelPadding = 0;
				d.reversed = b.reversed;
				d.visible = !1 !== b.visible;
				d.zoomEnabled = !1 !== b.zoomEnabled;
				d.hasNames = "category" === n || !0 === b.categories;
				d.categories = b.categories || d.hasNames;
				d.names = d.names || [];
				d.plotLinesAndBandsGroups = {};
				d.isLog = "logarithmic" === n;
				d.isDatetimeAxis = "datetime" === n;
				d.positiveValuesOnly = d.isLog && !d.allowNegativeLog;
				d.isLinked = q(b.linkedTo);
				d.ticks = {};
				d.labelEdge = [];
				d.minorTicks = {};
				d.plotLinesAndBands = [];
				d.alternateBands = {};
				d.len = 0;
				d.minRange = d.userMinRange = b.minRange || b.maxZoom;
				d.range = b.range;
				d.offset = b.offset || 0;
				d.stacks = {};
				d.oldStacks = {};
				d.stacksTouched = 0;
				d.max = null;
				d.min = null;
				d.crosshair = x(b.crosshair, v(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
				y = d.options.events; - 1 === m(d, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, d) : a.axes.push(d), a[d.coll].push(d));
				d.series = d.series || [];
				a.inverted && !d.isZAxis && k && void 0 === d.reversed && (d.reversed = !0);
				f(y, function(a, k) {
					E(d, k, a)
				});
				d.lin2log = b.linearToLogConverter || d.lin2log;
				d.isLog && (d.val2lin = d.log2lin, d.lin2val = d.lin2log)
			},
			setOptions: function(a) {
				this.options = A(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], A(z[this.coll], a))
			},
			defaultLabelFormatter: function() {
				var k = this.axis,
					y = this.value,
					d = k.categories,
					f = this.dateTimeLabelFormat,
					b = z.lang,
					n = b.numericSymbols,
					b = b.numericSymbolMagnitude || 1E3,
					v = n && n.length,
					m, r = k.options.labels.format,
					k = k.isLog ? Math.abs(y) : k.tickInterval;
				if (r) m = c(r, this);
				else if (d) m = y;
				else if (f) m = a.dateFormat(f, y);
				else if (v && 1E3 <= k)
					for (; v-- && void 0 === m;) d = Math.pow(b, v + 1), k >= d && 0 === 10 * y % d && null !== n[v] && 0 !== y && (m = a.numberFormat(y / d, -1) + n[v]);
				void 0 === m && (m = 1E4 <= Math.abs(y) ? a.numberFormat(y, -1) : a.numberFormat(y, -1, void 0, ""));
				return m
			},
			getSeriesExtremes: function() {
				var a = this,
					y = a.chart;
				a.hasVisibleSeries = !1;
				a.dataMin = a.dataMax = a.threshold = null;
				a.softThreshold = !a.isXAxis;
				a.buildStacks && a.buildStacks();
				e(a.series, function(k) {
					if (k.visible || !y.options.chart.ignoreHiddenSeries) {
						var d = k.options,
							f = d.threshold,
							b;
						a.hasVisibleSeries = !0;
						a.positiveValuesOnly && 0 >= f && (f = null);
						if (a.isXAxis) d = k.xData, d.length && (k = t(d), C(k) || k instanceof Date || (d = w(d, function(a) {
							return C(a)
						}), k = t(d)), a.dataMin = Math.min(x(a.dataMin, d[0]), k), a.dataMax = Math.max(x(a.dataMax, d[0]), F(d)));
						else if (k.getExtremes(), b = k.dataMax, k = k.dataMin, q(k) && q(b) && (a.dataMin = Math.min(x(a.dataMin, k), k), a.dataMax = Math.max(x(a.dataMax, b), b)), q(f) && (a.threshold = f), !d.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
					}
				})
			},
			translate: function(a, d, f, b, n, c) {
				var k = this.linkedParent || this,
					y = 1,
					v = 0,
					m = b ? k.oldTransA : k.transA;
				b = b ? k.oldMin : k.min;
				var r = k.minPixelPadding;
				n = (k.isOrdinal || k.isBroken || k.isLog && n) && k.lin2val;
				m || (m = k.transA);
				f && (y *= -1, v = k.len);
				k.reversed && (y *= -1, v -= y * (k.sector || k.len));
				d ? (a = (a * y + v - r) / m + b, n && (a = k.lin2val(a))) : (n && (a = k.val2lin(a)), a = C(b) ? y * (a - b) * m + v + y * r + (C(c) ? m * c : 0) : void 0);
				return a
			},
			toPixels: function(a, d) {
				return this.translate(a, !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
			},
			toValue: function(a, d) {
				return this.translate(a - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function(a, d, b, f, n) {
				var k = this.chart,
					y = this.left,
					c = this.top,
					v, m, r = b && k.oldChartHeight || k.chartHeight,
					e = b && k.oldChartWidth || k.chartWidth,
					w;
				v = this.transB;
				var g = function(a, k, d) {
					if (a < k || a > d) f ? a = Math.min(Math.max(k, a), d) : w = !0;
					return a
				};
				n = x(n, this.translate(a, null, null, b));
				a = b = Math.round(n + v);
				v = m = Math.round(r - n - v);
				C(n) ? this.horiz ? (v = c, m = r - this.bottom, a = b = g(a, y, y + this.width)) : (a = y, b = e - this.right, v = m = g(v, c, c + this.height)) : (w = !0, f = !1);
				return w && !f ? null : k.renderer.crispLine(["M", a, v, "L", b, m], d || 1)
			},
			getLinearTickPositions: function(a, d, b) {
				var k, y = p(Math.floor(d / a) * a);
				b = p(Math.ceil(b / a) * a);
				var f = [];
				if (this.single) return [d];
				for (d = y; d <= b;) {
					f.push(d);
					d = p(d + a);
					if (d === k) break;
					k = d
				}
				return f
			},
			getMinorTickInterval: function() {
				var a = this.options;
				return !0 === a.minorTicks ? x(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
			},
			getMinorTickPositions: function() {
				var a = this,
					d = a.options,
					b = a.tickPositions,
					f = a.minorTickInterval,
					n = [],
					c = a.pointRangePadding || 0,
					v = a.min - c,
					c = a.max + c,
					m = c - v;
				if (m && m / f < a.len / 3)
					if (a.isLog) e(this.paddedTicks, function(k, d, y) {
						d && n.push.apply(n, a.getLogTickPositions(f, y[d - 1], y[d], !0))
					});
					else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) n = n.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f), v, c, d.startOfWeek));
				else
					for (d = v + (b[0] - v) % f; d <= c && d !== n[0]; d += f) n.push(d);
				0 !== n.length && a.trimTicks(n);
				return n
			},
			adjustForMinRange: function() {
				var a = this.options,
					d = this.min,
					b = this.max,
					f, n, c, v, m, r, w, g;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (q(a.min) || q(a.max) ? this.minRange = null : (e(this.series, function(a) {
					r = a.xData;
					for (v = w = a.xIncrement ? 1 : r.length - 1; 0 < v; v--)
						if (m = r[v] - r[v - 1], void 0 === c || m < c) c = m
				}), this.minRange = Math.min(5 * c, this.dataMax - this.dataMin)));
				b - d < this.minRange && (n = this.dataMax - this.dataMin >= this.minRange, g = this.minRange, f = (g - b + d) / 2, f = [d - f, x(a.min, d - f)], n && (f[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = F(f), b = [d + g, x(a.max, d + g)], n && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = t(b), b - d < g && (f[0] = b - g, f[1] = x(a.min, b - g), d = F(f)));
				this.min = d;
				this.max = b
			},
			getClosest: function() {
				var a;
				this.categories ? a = 1 : e(this.series, function(k) {
					var d = k.closestPointRange,
						y = k.visible || !k.chart.options.chart.ignoreHiddenSeries;
					!k.noSharedTooltip && q(d) && y && (a = q(a) ? Math.min(a, d) : d)
				});
				return a
			},
			nameToX: function(a) {
				var k = r(this.categories),
					d = k ? this.categories : this.names,
					b = a.options.x,
					f;
				a.series.requireSorting = !1;
				q(b) || (b = !1 === this.options.uniqueNames ? a.series.autoIncrement() : m(a.name, d)); - 1 === b ? k || (f = d.length) : f = b;
				void 0 !== f && (this.names[f] = a.name);
				return f
			},
			updateNames: function() {
				var a = this;
				0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, e(this.series || [], function(k) {
					k.xIncrement = null;
					if (!k.points || k.isDirtyData) k.processData(), k.generatePoints();
					e(k.points, function(d, y) {
						var b;
						d.options && (b = a.nameToX(d), void 0 !== b && b !== d.x && (d.x = b, k.xData[y] = b))
					})
				}))
			},
			setAxisTranslation: function(a) {
				var k = this,
					d = k.max - k.min,
					b = k.axisPointRange || 0,
					f, n = 0,
					c = 0,
					v = k.linkedParent,
					m = !!k.categories,
					r = k.transA,
					g = k.isXAxis;
				if (g || m || b) f = k.getClosest(), v ? (n = v.minPointOffset, c = v.pointRangePadding) : e(k.series, function(a) {
					var d = m ? 1 : g ? x(a.options.pointRange, f, 0) : k.axisPointRange || 0;
					a = a.options.pointPlacement;
					b = Math.max(b, d);
					k.single || (n = Math.max(n, H(a) ? 0 : d / 2), c = Math.max(c, "on" === a ? 0 : d))
				}), v = k.ordinalSlope && f ? k.ordinalSlope / f : 1, k.minPointOffset = n *= v, k.pointRangePadding = c *= v, k.pointRange = Math.min(b, d), g && (k.closestPointRange = f);
				a && (k.oldTransA = r);
				k.translationSlope = k.transA = r = k.options.staticScale || k.len / (d + c || 1);
				k.transB = k.horiz ? k.left : k.bottom;
				k.minPixelPadding = r * n
			},
			minFromRange: function() {
				return this.max - this.range
			},
			setTickInterval: function(k) {
				var d = this,
					f = d.chart,
					n = d.options,
					c = d.isLog,
					v = d.log2lin,
					m = d.isDatetimeAxis,
					r = d.isXAxis,
					w = d.isLinked,
					h = n.maxPadding,
					G = n.minPadding,
					A = n.tickInterval,
					H = n.tickPixelInterval,
					J = d.categories,
					l = d.threshold,
					u = d.softThreshold,
					B, t, z, D;
				m || J || w || this.getTickAmount();
				z = x(d.userMin, n.min);
				D = x(d.userMax, n.max);
				w ? (d.linkedParent = f[d.coll][n.linkedTo], f = d.linkedParent.getExtremes(), d.min = x(f.min, f.dataMin), d.max = x(f.max, f.dataMax), n.type !== d.linkedParent.options.type && a.error(11, 1)) : (!u && q(l) && (d.dataMin >= l ? (B = l, G = 0) : d.dataMax <= l && (t = l, h = 0)), d.min = x(z, B, d.dataMin), d.max = x(D, t, d.dataMax));
				c && (d.positiveValuesOnly && !k && 0 >= Math.min(d.min, x(d.dataMin, d.min)) && a.error(10, 1), d.min = p(v(d.min), 15), d.max = p(v(d.max), 15));
				d.range && q(d.max) && (d.userMin = d.min = z = Math.max(d.dataMin, d.minFromRange()), d.userMax = D = d.max, d.range = null);
				g(d, "foundExtremes");
				d.beforePadding && d.beforePadding();
				d.adjustForMinRange();
				!(J || d.axisPointRange || d.usePercentage || w) && q(d.min) && q(d.max) && (v = d.max - d.min) && (!q(z) && G && (d.min -= v * G), !q(D) && h && (d.max += v * h));
				C(n.softMin) && (d.min = Math.min(d.min, n.softMin));
				C(n.softMax) && (d.max = Math.max(d.max, n.softMax));
				C(n.floor) && (d.min = Math.max(d.min, n.floor));
				C(n.ceiling) && (d.max = Math.min(d.max, n.ceiling));
				u && q(d.dataMin) && (l = l || 0, !q(z) && d.min < l && d.dataMin >= l ? d.min = l : !q(D) && d.max > l && d.dataMax <= l && (d.max = l));
				d.tickInterval = d.min === d.max || void 0 === d.min || void 0 === d.max ? 1 : w && !A && H === d.linkedParent.options.tickPixelInterval ? A = d.linkedParent.tickInterval : x(A, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) : void 0, J ? 1 : (d.max - d.min) * H / Math.max(d.len, H));
				r && !k && e(d.series, function(a) {
					a.processData(d.min !== d.oldMin || d.max !== d.oldMax)
				});
				d.setAxisTranslation(!0);
				d.beforeSetTickPositions && d.beforeSetTickPositions();
				d.postProcessTickInterval && (d.tickInterval = d.postProcessTickInterval(d.tickInterval));
				d.pointRange && !A && (d.tickInterval = Math.max(d.pointRange, d.tickInterval));
				k = x(n.minTickInterval, d.isDatetimeAxis && d.closestPointRange);
				!A && d.tickInterval < k && (d.tickInterval = k);
				m || c || A || (d.tickInterval = K(d.tickInterval, null, b(d.tickInterval), x(n.allowDecimals, !(.5 < d.tickInterval && 5 > d.tickInterval && 1E3 < d.max && 9999 > d.max)), !!this.tickAmount));
				this.tickAmount || (d.tickInterval = d.unsquish());
				this.setTickPositions()
			},
			setTickPositions: function() {
				var a = this.options,
					d, b = a.tickPositions;
				d = this.getMinorTickInterval();
				var f = a.tickPositioner,
					n = a.startOnTick,
					c = a.endOnTick;
				this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
				this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
				this.single = this.min === this.max && q(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
				this.tickPositions = d = b && b.slice();
				!d && (d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()]), this.tickPositions = d, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = d = f);
				this.paddedTicks = d.slice(0);
				this.trimTicks(d, n, c);
				this.isLinked || (this.single && 2 > d.length && (this.min -= .5, this.max += .5), b || f || this.adjustTickAmount())
			},
			trimTicks: function(a, d, f) {
				var k = a[0],
					b = a[a.length - 1],
					n = this.minPointOffset || 0;
				if (!this.isLinked) {
					if (d && -Infinity !== k) this.min = k;
					else
						for (; this.min - n > a[0];) a.shift();
					if (f) this.max = b;
					else
						for (; this.max + n < a[a.length - 1];) a.pop();
					0 === a.length && q(k) && a.push((b + k) / 2)
				}
			},
			alignToOthers: function() {
				var a = {},
					d, f = this.options;
				!1 === this.chart.options.chart.alignTicks || !1 === f.alignTicks || this.isLog || e(this.chart[this.coll], function(k) {
					var f = k.options,
						f = [k.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
					k.series.length && (a[f] ? d = !0 : a[f] = 1)
				});
				return d
			},
			getTickAmount: function() {
				var a = this.options,
					d = a.tickAmount,
					f = a.tickPixelInterval;
				!q(a.tickInterval) && this.len < f && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (d = 2);
				!d && this.alignToOthers() && (d = Math.ceil(this.len / f) + 1);
				4 > d && (this.finalTickAmt = d, d = 5);
				this.tickAmount = d
			},
			adjustTickAmount: function() {
				var a = this.tickInterval,
					d = this.tickPositions,
					f = this.tickAmount,
					b = this.finalTickAmt,
					n = d && d.length;
				if (n < f) {
					for (; d.length < f;) d.push(p(d[d.length - 1] + a));
					this.transA *= (n - 1) / (f - 1);
					this.max = d[d.length - 1]
				} else n > f && (this.tickInterval *= 2, this.setTickPositions());
				if (q(b)) {
					for (a = f = d.length; a--;)(3 === b && 1 === a % 2 || 2 >= b && 0 < a && a < f - 1) && d.splice(a, 1);
					this.finalTickAmt = void 0
				}
			},
			setScale: function() {
				var a, d;
				this.oldMin = this.min;
				this.oldMax = this.max;
				this.oldAxisLength = this.len;
				this.setAxisSize();
				d = this.len !== this.oldAxisLength;
				e(this.series, function(d) {
					if (d.isDirtyData || d.isDirty || d.xAxis.isDirty) a = !0
				});
				d || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
			},
			setExtremes: function(a, d, f, b, n) {
				var k = this,
					c = k.chart;
				f = x(f, !0);
				e(k.series, function(a) {
					delete a.kdTree
				});
				n = h(n, {
					min: a,
					max: d
				});
				g(k, "setExtremes", n, function() {
					k.userMin = a;
					k.userMax = d;
					k.eventArgs = n;
					f && c.redraw(b)
				})
			},
			zoom: function(a, d) {
				var k = this.dataMin,
					f = this.dataMax,
					b = this.options,
					n = Math.min(k, x(b.min, k)),
					b = Math.max(f, x(b.max, f));
				if (a !== this.min || d !== this.max) this.allowZoomOutside || (q(k) && (a < n && (a = n), a > b && (a = b)), q(f) && (d < n && (d = n), d > b && (d = b))), this.displayBtn = void 0 !== a || void 0 !== d, this.setExtremes(a, d, !1, void 0, {
					trigger: "zoom"
				});
				return !0
			},
			setAxisSize: function() {
				var d = this.chart,
					f = this.options,
					b = f.offsets || [0, 0, 0, 0],
					n = this.horiz,
					c = this.width = Math.round(a.relativeLength(x(f.width, d.plotWidth - b[3] + b[1]), d.plotWidth)),
					v = this.height = Math.round(a.relativeLength(x(f.height, d.plotHeight - b[0] + b[2]), d.plotHeight)),
					m = this.top = Math.round(a.relativeLength(x(f.top, d.plotTop + b[0]), d.plotHeight, d.plotTop)),
					f = this.left = Math.round(a.relativeLength(x(f.left, d.plotLeft + b[3]), d.plotWidth, d.plotLeft));
				this.bottom = d.chartHeight - v - m;
				this.right = d.chartWidth - c - f;
				this.len = Math.max(n ? c : v, 0);
				this.pos = n ? f : m
			},
			getExtremes: function() {
				var a = this.isLog,
					d = this.lin2log;
				return {
					min: a ? p(d(this.min)) : this.min,
					max: a ? p(d(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			},
			getThreshold: function(a) {
				var d = this.isLog,
					k = this.lin2log,
					f = d ? k(this.min) : this.min,
					d = d ? k(this.max) : this.max;
				null === a ? a = f : f > a ? a = f : d < a && (a = d);
				return this.translate(a, 0, 1, 0, 1)
			},
			autoLabelAlign: function(a) {
				a = (x(a, 0) - 90 * this.side + 720) % 360;
				return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
			},
			tickSize: function(a) {
				var d = this.options,
					k = d[a + "Length"],
					f = x(d[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
				if (f && k) return "inside" === d[a + "Position"] && (k = -k), [k, f]
			},
			labelMetrics: function() {
				var a = this.tickPositions && this.tickPositions[0] || 0;
				return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
			},
			unsquish: function() {
				var a = this.options.labels,
					d = this.horiz,
					f = this.tickInterval,
					b = f,
					n = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
					c, v = a.rotation,
					m = this.labelMetrics(),
					r, g = Number.MAX_VALUE,
					w, h = function(a) {
						a /= n || 1;
						a = 1 < a ? Math.ceil(a) : 1;
						return a * f
					};
				d ? (w = !a.staggerLines && !a.step && (q(v) ? [v] : n < x(a.autoRotationLimit, 80) && a.autoRotation)) && e(w, function(a) {
					var d;
					if (a === v || a && -90 <= a && 90 >= a) r = h(Math.abs(m.h / Math.sin(u * a))), d = r + Math.abs(a / 360), d < g && (g = d, c = a, b = r)
				}) : a.step || (b = h(m.h));
				this.autoRotation = w;
				this.labelRotation = x(c, v);
				return b
			},
			getSlotWidth: function() {
				var a = this.chart,
					d = this.horiz,
					f = this.options.labels,
					b = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
					n = a.margin[3];
				return d && 2 > (f.step || 0) && !f.rotation && (this.staggerLines || 1) * this.len / b || !d && (f.style && parseInt(f.style.width, 10) || n && n - a.spacing[3] || .33 * a.chartWidth)
			},
			renderUnsquish: function() {
				var a = this.chart,
					d = a.renderer,
					f = this.tickPositions,
					b = this.ticks,
					n = this.options.labels,
					c = this.horiz,
					v = this.getSlotWidth(),
					m = Math.max(1, Math.round(v - 2 * (n.padding || 5))),
					r = {},
					g = this.labelMetrics(),
					w = n.style && n.style.textOverflow,
					h, C = 0,
					G, x;
				H(n.rotation) || (r.rotation = n.rotation || 0);
				e(f, function(a) {
					(a = b[a]) && a.labelLength > C && (C = a.labelLength)
				});
				this.maxLabelLength = C;
				if (this.autoRotation) C > m && C > g.h ? r.rotation = this.labelRotation : this.labelRotation = 0;
				else if (v && (h = {
						width: m + "px"
					}, !w))
					for (h.textOverflow = "clip", G = f.length; !c && G--;)
						if (x = f[G], m = b[x].label) m.styles && "ellipsis" === m.styles.textOverflow ? m.css({
							textOverflow: "clip"
						}) : b[x].labelLength > v && m.css({
							width: v + "px"
						}), m.getBBox().height > this.len / f.length - (g.h - g.f) && (m.specCss = {
							textOverflow: "ellipsis"
						});
				r.rotation && (h = {
					width: (C > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
				}, w || (h.textOverflow = "ellipsis"));
				if (this.labelAlign = n.align || this.autoLabelAlign(this.labelRotation)) r.align = this.labelAlign;
				e(f, function(a) {
					var d = (a = b[a]) && a.label;
					d && (d.attr(r), h && d.css(A(h, d.specCss)), delete d.specCss, a.rotation = r.rotation)
				});
				this.tickRotCorr = d.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
			},
			hasData: function() {
				return this.hasVisibleSeries || q(this.min) && q(this.max) && !!this.tickPositions
			},
			addTitle: function(a) {
				var d = this.chart.renderer,
					k = this.horiz,
					f = this.opposite,
					b = this.options.title,
					n;
				this.axisTitle || ((n = b.textAlign) || (n = (k ? {
					low: "left",
					middle: "center",
					high: "right"
				} : {
					low: f ? "right" : "left",
					middle: "center",
					high: f ? "left" : "right"
				})[b.align]), this.axisTitle = d.text(b.text, 0, 0, b.useHTML).attr({
					zIndex: 7,
					rotation: b.rotation || 0,
					align: n
				}).addClass("highcharts-axis-title").css(b.style).add(this.axisGroup), this.axisTitle.isNew = !0);
				b.style.width || this.isRadial || this.axisTitle.css({
					width: this.len
				});
				this.axisTitle[a ? "show" : "hide"](!0)
			},
			generateTick: function(a) {
				var d = this.ticks;
				d[a] ? d[a].addLabel() : d[a] = new n(this, a)
			},
			getOffset: function() {
				var a = this,
					d = a.chart,
					b = d.renderer,
					n = a.options,
					c = a.tickPositions,
					v = a.ticks,
					m = a.horiz,
					r = a.side,
					g = d.inverted && !a.isZAxis ? [1, 0, 3, 2][r] : r,
					w, h, C = 0,
					G, A = 0,
					H = n.title,
					l = n.labels,
					J = 0,
					p = d.axisOffset,
					d = d.clipOffset,
					K = [-1, 1, 1, -1][r],
					u = n.className,
					B = a.axisParent,
					t = this.tickSize("tick");
				w = a.hasData();
				a.showAxis = h = w || x(n.showEmpty, !0);
				a.staggerLines = a.horiz && l.staggerLines;
				a.axisGroup || (a.gridGroup = b.g("grid").attr({
					zIndex: n.gridZIndex || 1
				}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(B), a.axisGroup = b.g("axis").attr({
					zIndex: n.zIndex || 2
				}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(B), a.labelGroup = b.g("axis-labels").attr({
					zIndex: l.zIndex || 7
				}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(B));
				w || a.isLinked ? (e(c, function(d, k) {
					a.generateTick(d, k)
				}), a.renderUnsquish(), !1 === l.reserveSpace || 0 !== r && 2 !== r && {
					1: "left",
					3: "right"
				}[r] !== a.labelAlign && "center" !== a.labelAlign || e(c, function(a) {
					J = Math.max(v[a].getLabelSize(), J)
				}), a.staggerLines && (J *= a.staggerLines, a.labelOffset = J * (a.opposite ? -1 : 1))) : f(v, function(a, d) {
					a.destroy();
					delete v[d]
				});
				H && H.text && !1 !== H.enabled && (a.addTitle(h), h && !1 !== H.reserveSpace && (a.titleOffset = C = a.axisTitle.getBBox()[m ? "height" : "width"], G = H.offset, A = q(G) ? 0 : x(H.margin, m ? 5 : 10)));
				a.renderLine();
				a.offset = K * x(n.offset, p[r]);
				a.tickRotCorr = a.tickRotCorr || {
					x: 0,
					y: 0
				};
				b = 0 === r ? -a.labelMetrics().h : 2 === r ? a.tickRotCorr.y : 0;
				A = Math.abs(J) + A;
				J && (A = A - b + K * (m ? x(l.y, a.tickRotCorr.y + 8 * K) : l.x));
				a.axisTitleMargin = x(G, A);
				p[r] = Math.max(p[r], a.axisTitleMargin + C + K * a.offset, A, w && c.length && t ? t[0] + K * a.offset : 0);
				n = n.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
				d[g] = Math.max(d[g], n)
			},
			getLinePath: function(a) {
				var d = this.chart,
					k = this.opposite,
					f = this.offset,
					b = this.horiz,
					n = this.left + (k ? this.width : 0) + f,
					f = d.chartHeight - this.bottom - (k ? this.height : 0) + f;
				k && (a *= -1);
				return d.renderer.crispLine(["M", b ? this.left : n, b ? f : this.top, "L", b ? d.chartWidth - this.right : n, b ? f : d.chartHeight - this.bottom], a)
			},
			renderLine: function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
					stroke: this.options.lineColor,
					"stroke-width": this.options.lineWidth,
					zIndex: 7
				}))
			},
			getTitlePosition: function() {
				var a = this.horiz,
					d = this.left,
					f = this.top,
					b = this.len,
					n = this.options.title,
					c = a ? d : f,
					v = this.opposite,
					m = this.offset,
					r = n.x || 0,
					e = n.y || 0,
					g = this.axisTitle,
					w = this.chart.renderer.fontMetrics(n.style && n.style.fontSize, g),
					g = Math.max(g.getBBox(null, 0).height - w.h - 1, 0),
					b = {
						low: c + (a ? 0 : b),
						middle: c + b / 2,
						high: c + (a ? b : 0)
					}[n.align],
					d = (a ? f + this.height : d) + (a ? 1 : -1) * (v ? -1 : 1) * this.axisTitleMargin + [-g, g, w.f, -g][this.side];
				return {
					x: a ? b + r : d + (v ? this.width : 0) + m + r,
					y: a ? d + e - (v ? this.height : 0) + m : b + e
				}
			},
			renderMinorTick: function(a) {
				var d = this.chart.hasRendered && C(this.oldMin),
					k = this.minorTicks;
				k[a] || (k[a] = new n(this, a, "minor"));
				d && k[a].isNew && k[a].render(null, !0);
				k[a].render(null, !1, 1)
			},
			renderTick: function(a, d) {
				var k = this.isLinked,
					f = this.ticks,
					b = this.chart.hasRendered && C(this.oldMin);
				if (!k || a >= this.min && a <= this.max) f[a] || (f[a] = new n(this, a)), b && f[a].isNew && f[a].render(d, !0, .1), f[a].render(d)
			},
			render: function() {
				var k = this,
					b = k.chart,
					c = k.options,
					v = k.isLog,
					m = k.lin2log,
					r = k.isLinked,
					g = k.tickPositions,
					w = k.axisTitle,
					h = k.ticks,
					G = k.minorTicks,
					x = k.alternateBands,
					A = c.stackLabels,
					H = c.alternateGridColor,
					J = k.tickmarkOffset,
					l = k.axisLine,
					q = k.showAxis,
					p = D(b.renderer.globalAnimation),
					K, u;
				k.labelEdge.length = 0;
				k.overlap = !1;
				e([h, G, x], function(a) {
					f(a, function(a) {
						a.isActive = !1
					})
				});
				if (k.hasData() || r) k.minorTickInterval && !k.categories && e(k.getMinorTickPositions(), function(a) {
					k.renderMinorTick(a)
				}), g.length && (e(g, function(a, d) {
					k.renderTick(a, d)
				}), J && (0 === k.min || k.single) && (h[-1] || (h[-1] = new n(k, -1, null, !0)), h[-1].render(-1))), H && e(g, function(d, f) {
					u = void 0 !== g[f + 1] ? g[f + 1] + J : k.max - J;
					0 === f % 2 && d < k.max && u <= k.max + (b.polar ? -J : J) && (x[d] || (x[d] = new a.PlotLineOrBand(k)), K = d + J, x[d].options = {
						from: v ? m(K) : K,
						to: v ? m(u) : u,
						color: H
					}, x[d].render(), x[d].isActive = !0)
				}), k._addedPlotLB || (e((c.plotLines || []).concat(c.plotBands || []), function(a) {
					k.addPlotBandOrLine(a)
				}), k._addedPlotLB = !0);
				e([h, G, x], function(a) {
					var k, n = [],
						c = p.duration;
					f(a, function(a, d) {
						a.isActive || (a.render(d, !1, 0), a.isActive = !1, n.push(d))
					});
					d(function() {
						for (k = n.length; k--;) a[n[k]] && !a[n[k]].isActive && (a[n[k]].destroy(), delete a[n[k]])
					}, a !== x && b.hasRendered && c ? c : 0)
				});
				l && (l[l.isPlaced ? "animate" : "attr"]({
					d: this.getLinePath(l.strokeWidth())
				}), l.isPlaced = !0, l[q ? "show" : "hide"](!0));
				w && q && (c = k.getTitlePosition(), C(c.y) ? (w[w.isNew ? "attr" : "animate"](c), w.isNew = !1) : (w.attr("y", -9999), w.isNew = !0));
				A && A.enabled && k.renderStackTotals();
				k.isDirty = !1
			},
			redraw: function() {
				this.visible && (this.render(), e(this.plotLinesAndBands, function(a) {
					a.render()
				}));
				e(this.series, function(a) {
					a.isDirty = !0
				})
			},
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function(a) {
				var d = this,
					k = d.stacks,
					b = d.plotLinesAndBands,
					n;
				a || J(d);
				f(k, function(a, d) {
					B(a);
					k[d] = null
				});
				e([d.ticks, d.minorTicks, d.alternateBands], function(a) {
					B(a)
				});
				if (b)
					for (a = b.length; a--;) b[a].destroy();
				e("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
					d[a] && (d[a] = d[a].destroy())
				});
				for (n in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[n] = d.plotLinesAndBandsGroups[n].destroy();
				f(d, function(a, k) {
					-1 === m(k, d.keepProps) && delete d[k]
				})
			},
			drawCrosshair: function(a, d) {
				var f, k = this.crosshair,
					b = x(k.snap, !0),
					n, c = this.cross;
				a || (a = this.cross && this.cross.e);
				this.crosshair && !1 !== (q(d) || !b) ? (b ? q(d) && (n = this.isXAxis ? d.plotX : this.len - d.plotY) : n = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), q(n) && (f = this.getPlotLinePath(d && (this.isXAxis ? d.x : x(d.stackY, d.y)), null, null, null, n) || null), q(f) ? (d = this.categories && !this.isRadial, c || (this.cross = c = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + k.className).attr({
					zIndex: x(k.zIndex, 2)
				}).add(), c.attr({
					stroke: k.color || (d ? l("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
					"stroke-width": x(k.width, 1)
				}).css({
					"pointer-events": "none"
				}), k.dashStyle && c.attr({
					dashstyle: k.dashStyle
				})), c.show().attr({
					d: f
				}), d && !k.width && c.attr({
					"stroke-width": this.transA
				}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
			},
			hideCrosshair: function() {
				this.cross && this.cross.hide()
			}
		});
		return a.Axis = G
	}(L);
	(function(a) {
		var E = a.Axis,
			D = a.Date,
			F = a.dateFormat,
			t = a.defaultOptions,
			l = a.defined,
			p = a.each,
			z = a.extend,
			q = a.getMagnitude,
			u = a.getTZOffset,
			B = a.normalizeTickInterval,
			e = a.pick,
			h = a.timeUnits;
		E.prototype.getTimeTicks = function(a, c, b, w) {
			var m = [],
				r = {},
				g = t.global.useUTC,
				H, A = new D(c - Math.max(u(c), u(b))),
				q = D.hcMakeTime,
				f = a.unitRange,
				x = a.count,
				J, v;
			if (l(c)) {
				A[D.hcSetMilliseconds](f >= h.second ? 0 : x * Math.floor(A.getMilliseconds() / x));
				if (f >= h.second) A[D.hcSetSeconds](f >= h.minute ? 0 : x * Math.floor(A.getSeconds() / x));
				if (f >= h.minute) A[D.hcSetMinutes](f >= h.hour ? 0 : x * Math.floor(A[D.hcGetMinutes]() / x));
				if (f >= h.hour) A[D.hcSetHours](f >= h.day ? 0 : x * Math.floor(A[D.hcGetHours]() / x));
				if (f >= h.day) A[D.hcSetDate](f >= h.month ? 1 : x * Math.floor(A[D.hcGetDate]() / x));
				f >= h.month && (A[D.hcSetMonth](f >= h.year ? 0 : x * Math.floor(A[D.hcGetMonth]() / x)), H = A[D.hcGetFullYear]());
				if (f >= h.year) A[D.hcSetFullYear](H - H % x);
				if (f === h.week) A[D.hcSetDate](A[D.hcGetDate]() - A[D.hcGetDay]() + e(w, 1));
				H = A[D.hcGetFullYear]();
				w = A[D.hcGetMonth]();
				var d = A[D.hcGetDate](),
					n = A[D.hcGetHours]();
				if (D.hcTimezoneOffset || D.hcGetTimezoneOffset) v = (!g || !!D.hcGetTimezoneOffset) && (b - c > 4 * h.month || u(c) !== u(b)), A = A.getTime(), J = u(A), A = new D(A + J);
				g = A.getTime();
				for (c = 1; g < b;) m.push(g), g = f === h.year ? q(H + c * x, 0) : f === h.month ? q(H, w + c * x) : !v || f !== h.day && f !== h.week ? v && f === h.hour ? q(H, w, d, n + c * x, 0, 0, J) - J : g + f * x : q(H, w, d + c * x * (f === h.day ? 1 : 7)), c++;
				m.push(g);
				f <= h.hour && 1E4 > m.length && p(m, function(a) {
					0 === a % 18E5 && "000000000" === F("%H%M%S%L", a) && (r[a] = "day")
				})
			}
			m.info = z(a, {
				higherRanks: r,
				totalRange: f * x
			});
			return m
		};
		E.prototype.normalizeTimeTickInterval = function(a, c) {
			var b = c || [
				["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1, 2]],
				["week", [1, 2]],
				["month", [1, 2, 3, 4, 6]],
				["year", null]
			];
			c = b[b.length - 1];
			var g = h[c[0]],
				m = c[1],
				r;
			for (r = 0; r < b.length && !(c = b[r], g = h[c[0]], m = c[1], b[r + 1] && a <= (g * m[m.length - 1] + h[b[r + 1][0]]) / 2); r++);
			g === h.year && a < 5 * g && (m = [1, 2, 5]);
			a = B(a / g, m, "year" === c[0] ? Math.max(q(a / g), 1) : 1);
			return {
				unitRange: g,
				count: a,
				unitName: c[0]
			}
		}
	})(L);
	(function(a) {
		var E = a.Axis,
			D = a.getMagnitude,
			F = a.map,
			t = a.normalizeTickInterval,
			l = a.pick;
		E.prototype.getLogTickPositions = function(a, z, q, u) {
			var p = this.options,
				e = this.len,
				h = this.lin2log,
				g = this.log2lin,
				c = [];
			u || (this._minorAutoInterval = null);
			if (.5 <= a) a = Math.round(a), c = this.getLinearTickPositions(a, z, q);
			else if (.08 <= a)
				for (var e = Math.floor(z), b, w, m, r, C, p = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; e < q + 1 && !C; e++)
					for (w = p.length, b = 0; b < w && !C; b++) m = g(h(e) * p[b]), m > z && (!u || r <= q) && void 0 !== r && c.push(r), r > q && (C = !0), r = m;
			else z = h(z), q = h(q), a = u ? this.getMinorTickInterval() : p.tickInterval, a = l("auto" === a ? null : a, this._minorAutoInterval, p.tickPixelInterval / (u ? 5 : 1) * (q - z) / ((u ? e / this.tickPositions.length : e) || 1)), a = t(a, null, D(a)), c = F(this.getLinearTickPositions(a, z, q), g), u || (this._minorAutoInterval = a / 5);
			u || (this.tickInterval = a);
			return c
		};
		E.prototype.log2lin = function(a) {
			return Math.log(a) / Math.LN10
		};
		E.prototype.lin2log = function(a) {
			return Math.pow(10, a)
		}
	})(L);
	(function(a, E) {
		var D = a.arrayMax,
			F = a.arrayMin,
			t = a.defined,
			l = a.destroyObjectProperties,
			p = a.each,
			z = a.erase,
			q = a.merge,
			u = a.pick;
		a.PlotLineOrBand = function(a, e) {
			this.axis = a;
			e && (this.options = e, this.id = e.id)
		};
		a.PlotLineOrBand.prototype = {
			render: function() {
				var l = this,
					e = l.axis,
					h = e.horiz,
					g = l.options,
					c = g.label,
					b = l.label,
					w = g.to,
					m = g.from,
					r = g.value,
					C = t(m) && t(w),
					H = t(r),
					A = l.svgElem,
					K = !A,
					f = [],
					x = g.color,
					J = u(g.zIndex, 0),
					v = g.events,
					f = {
						"class": "highcharts-plot-" + (C ? "band " : "line ") + (g.className || "")
					},
					d = {},
					n = e.chart.renderer,
					G = C ? "bands" : "lines",
					k = e.log2lin;
				e.isLog && (m = k(m), w = k(w), r = k(r));
				H ? (f = {
					stroke: x,
					"stroke-width": g.width
				}, g.dashStyle && (f.dashstyle = g.dashStyle)) : C && (x && (f.fill = x), g.borderWidth && (f.stroke = g.borderColor, f["stroke-width"] = g.borderWidth));
				d.zIndex = J;
				G += "-" + J;
				(x = e.plotLinesAndBandsGroups[G]) || (e.plotLinesAndBandsGroups[G] = x = n.g("plot-" + G).attr(d).add());
				K && (l.svgElem = A = n.path().attr(f).add(x));
				if (H) f = e.getPlotLinePath(r, A.strokeWidth());
				else if (C) f = e.getPlotBandPath(m, w, g);
				else return;
				K && f && f.length ? (A.attr({
					d: f
				}), v && a.objectEach(v, function(a, d) {
					A.on(d, function(a) {
						v[d].apply(l, [a])
					})
				})) : A && (f ? (A.show(), A.animate({
					d: f
				})) : (A.hide(), b && (l.label = b = b.destroy())));
				c && t(c.text) && f && f.length && 0 < e.width && 0 < e.height && !f.flat ? (c = q({
					align: h && C && "center",
					x: h ? !C && 4 : 10,
					verticalAlign: !h && C && "middle",
					y: h ? C ? 16 : 10 : C ? 6 : -4,
					rotation: h && !C && 90
				}, c), this.renderLabel(c, f, C, J)) : b && b.hide();
				return l
			},
			renderLabel: function(a, e, h, g) {
				var c = this.label,
					b = this.axis.chart.renderer;
				c || (c = {
					align: a.textAlign || a.align,
					rotation: a.rotation,
					"class": "highcharts-plot-" + (h ? "band" : "line") + "-label " + (a.className || "")
				}, c.zIndex = g, this.label = c = b.text(a.text, 0, 0, a.useHTML).attr(c).add(), c.css(a.style));
				g = e.xBounds || [e[1], e[4], h ? e[6] : e[1]];
				e = e.yBounds || [e[2], e[5], h ? e[7] : e[2]];
				h = F(g);
				b = F(e);
				c.align(a, !1, {
					x: h,
					y: b,
					width: D(g) - h,
					height: D(e) - b
				});
				c.show()
			},
			destroy: function() {
				z(this.axis.plotLinesAndBands, this);
				delete this.axis;
				l(this)
			}
		};
		a.extend(E.prototype, {
			getPlotBandPath: function(a, e) {
				var h = this.getPlotLinePath(e, null, null, !0),
					g = this.getPlotLinePath(a, null, null, !0),
					c = [],
					b = this.horiz,
					w = 1,
					m;
				a = a < this.min && e < this.min || a > this.max && e > this.max;
				if (g && h)
					for (a && (m = g.toString() === h.toString(), w = 0), a = 0; a < g.length; a += 6) b && h[a + 1] === g[a + 1] ? (h[a + 1] += w, h[a + 4] += w) : b || h[a + 2] !== g[a + 2] || (h[a + 2] += w, h[a + 5] += w), c.push("M", g[a + 1], g[a + 2], "L", g[a + 4], g[a + 5], h[a + 4], h[a + 5], h[a + 1], h[a + 2], "z"), c.flat = m;
				return c
			},
			addPlotBand: function(a) {
				return this.addPlotBandOrLine(a, "plotBands")
			},
			addPlotLine: function(a) {
				return this.addPlotBandOrLine(a, "plotLines")
			},
			addPlotBandOrLine: function(l, e) {
				var h = (new a.PlotLineOrBand(this, l)).render(),
					g = this.userOptions;
				h && (e && (g[e] = g[e] || [], g[e].push(l)), this.plotLinesAndBands.push(h));
				return h
			},
			removePlotBandOrLine: function(a) {
				for (var e = this.plotLinesAndBands, h = this.options, g = this.userOptions, c = e.length; c--;) e[c].id === a && e[c].destroy();
				p([h.plotLines || [], g.plotLines || [], h.plotBands || [], g.plotBands || []], function(b) {
					for (c = b.length; c--;) b[c].id === a && z(b, b[c])
				})
			},
			removePlotBand: function(a) {
				this.removePlotBandOrLine(a)
			},
			removePlotLine: function(a) {
				this.removePlotBandOrLine(a)
			}
		})
	})(L, Z);
	(function(a) {
		var E = a.dateFormat,
			D = a.each,
			F = a.extend,
			t = a.format,
			l = a.isNumber,
			p = a.map,
			z = a.merge,
			q = a.pick,
			u = a.splat,
			B = a.syncTimeout,
			e = a.timeUnits;
		a.Tooltip = function() {
			this.init.apply(this, arguments)
		};
		a.Tooltip.prototype = {
			init: function(a, g) {
				this.chart = a;
				this.options = g;
				this.crosshairs = [];
				this.now = {
					x: 0,
					y: 0
				};
				this.isHidden = !0;
				this.split = g.split && !a.inverted;
				this.shared = g.shared || this.split
			},
			cleanSplit: function(a) {
				D(this.chart.series, function(g) {
					var c = g && g.tt;
					c && (!c.isActive || a ? g.tt = c.destroy() : c.isActive = !1)
				})
			},
			getLabel: function() {
				var a = this.chart.renderer,
					g = this.options;
				this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, g.shape || "callout", null, null, g.useHTML, null, "tooltip").attr({
					padding: g.padding,
					r: g.borderRadius
				}), this.label.attr({
					fill: g.backgroundColor,
					"stroke-width": g.borderWidth
				}).css(g.style).shadow(g.shadow)), this.label.attr({
					zIndex: 8
				}).add());
				return this.label
			},
			update: function(a) {
				this.destroy();
				z(!0, this.chart.options.tooltip.userOptions, a);
				this.init(this.chart, z(!0, this.options, a))
			},
			destroy: function() {
				this.label && (this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
				clearTimeout(this.hideTimer);
				clearTimeout(this.tooltipTimeout)
			},
			move: function(a, g, c, b) {
				var e = this,
					m = e.now,
					r = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - m.x) || 1 < Math.abs(g - m.y)),
					h = e.followPointer || 1 < e.len;
				F(m, {
					x: r ? (2 * m.x + a) / 3 : a,
					y: r ? (m.y + g) / 2 : g,
					anchorX: h ? void 0 : r ? (2 * m.anchorX + c) / 3 : c,
					anchorY: h ? void 0 : r ? (m.anchorY + b) / 2 : b
				});
				e.getLabel().attr(m);
				r && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
					e && e.move(a, g, c, b)
				}, 32))
			},
			hide: function(a) {
				var g = this;
				clearTimeout(this.hideTimer);
				a = q(a, this.options.hideDelay, 500);
				this.isHidden || (this.hideTimer = B(function() {
					g.getLabel()[a ? "fadeOut" : "hide"]();
					g.isHidden = !0
				}, a))
			},
			getAnchor: function(a, g) {
				var c, b = this.chart,
					e = b.inverted,
					m = b.plotTop,
					r = b.plotLeft,
					h = 0,
					H = 0,
					A, l;
				a = u(a);
				c = a[0].tooltipPos;
				this.followPointer && g && (void 0 === g.chartX && (g = b.pointer.normalize(g)), c = [g.chartX - b.plotLeft,
					g.chartY - m
				]);
				c || (D(a, function(a) {
					A = a.series.yAxis;
					l = a.series.xAxis;
					h += a.plotX + (!e && l ? l.left - r : 0);
					H += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && A ? A.top - m : 0)
				}), h /= a.length, H /= a.length, c = [e ? b.plotWidth - H : h, this.shared && !e && 1 < a.length && g ? g.chartY - m : e ? b.plotHeight - h : H]);
				return p(c, Math.round)
			},
			getPosition: function(a, e, c) {
				var b = this.chart,
					g = this.distance,
					m = {},
					r = b.inverted && c.h || 0,
					h, H = ["y", b.chartHeight, e, c.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
					A = ["x", b.chartWidth, a, c.plotX + b.plotLeft,
						b.plotLeft, b.plotLeft + b.plotWidth
					],
					l = !this.followPointer && q(c.ttBelow, !b.inverted === !!c.negative),
					f = function(a, f, b, k, c, v) {
						var d = b < k - g,
							n = k + g + b < f,
							e = k - g - b;
						k += g;
						if (l && n) m[a] = k;
						else if (!l && d) m[a] = e;
						else if (d) m[a] = Math.min(v - b, 0 > e - r ? e : e - r);
						else if (n) m[a] = Math.max(c, k + r + b > f ? k : k + r);
						else return !1
					},
					x = function(a, f, b, k) {
						var d;
						k < g || k > f - g ? d = !1 : m[a] = k < b / 2 ? 1 : k > f - b / 2 ? f - b - 2 : k - b / 2;
						return d
					},
					J = function(a) {
						var d = H;
						H = A;
						A = d;
						h = a
					},
					v = function() {
						!1 !== f.apply(0, H) ? !1 !== x.apply(0, A) || h || (J(!0), v()) : h ? m.x = m.y = 0 : (J(!0), v())
					};
				(b.inverted || 1 < this.len) && J();
				v();
				return m
			},
			defaultFormatter: function(a) {
				var e = this.points || u(this),
					c;
				c = [a.tooltipFooterHeaderFormatter(e[0])];
				c = c.concat(a.bodyFormatter(e));
				c.push(a.tooltipFooterHeaderFormatter(e[0], !0));
				return c
			},
			refresh: function(a, e) {
				var c, b = this.options,
					g, m = a,
					r, h = {},
					H = [];
				c = b.formatter || this.defaultFormatter;
				var h = this.shared,
					A;
				b.enabled && (clearTimeout(this.hideTimer), this.followPointer = u(m)[0].series.tooltipOptions.followPointer, r = this.getAnchor(m, e), e = r[0], g = r[1], !h || m.series && m.series.noSharedTooltip ? h = m.getLabelConfig() : (D(m, function(a) {
					a.setState("hover");
					H.push(a.getLabelConfig())
				}), h = {
					x: m[0].category,
					y: m[0].y
				}, h.points = H, m = m[0]), this.len = H.length, h = c.call(h, this), A = m.series, this.distance = q(A.tooltipOptions.distance, 16), !1 === h ? this.hide() : (c = this.getLabel(), this.isHidden && c.attr({
					opacity: 1
				}).show(), this.split ? this.renderSplit(h, u(a)) : (b.style.width || c.css({
					width: this.chart.spacingBox.width
				}), c.attr({
					text: h && h.join ? h.join("") : h
				}), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(m.colorIndex, A.colorIndex)), c.attr({
					stroke: b.borderColor || m.color || A.color || "#666666"
				}), this.updatePosition({
					plotX: e,
					plotY: g,
					negative: m.negative,
					ttBelow: m.ttBelow,
					h: r[2] || 0
				})), this.isHidden = !1))
			},
			renderSplit: function(e, g) {
				var c = this,
					b = [],
					w = this.chart,
					m = w.renderer,
					r = !0,
					h = this.options,
					H = 0,
					A = this.getLabel();
				a.isString(e) && (e = [!1, e]);
				D(e.slice(0, g.length + 1), function(a, f) {
					if (!1 !== a) {
						f = g[f - 1] || {
							isHeader: !0,
							plotX: g[0].plotX
						};
						var e = f.series || c,
							C = e.tt,
							v = f.series || {},
							d = "highcharts-color-" + q(f.colorIndex, v.colorIndex, "none");
						C || (e.tt = C = m.label(null, null, null, "callout", null, null, h.useHTML).addClass("highcharts-tooltip-box " + d).attr({
							padding: h.padding,
							r: h.borderRadius,
							fill: h.backgroundColor,
							stroke: h.borderColor || f.color || v.color || "#333333",
							"stroke-width": h.borderWidth
						}).add(A));
						C.isActive = !0;
						C.attr({
							text: a
						});
						C.css(h.style).shadow(h.shadow);
						a = C.getBBox();
						v = a.width + C.strokeWidth();
						f.isHeader ? (H = a.height, v = Math.max(0, Math.min(f.plotX + w.plotLeft - v / 2, w.chartWidth - v))) : v = f.plotX + w.plotLeft - q(h.distance, 16) - v;
						0 > v && (r = !1);
						a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
						a -= w.plotTop;
						b.push({
							target: f.isHeader ? w.plotHeight + H : a,
							rank: f.isHeader ? 1 : 0,
							size: e.tt.getBBox().height + 1,
							point: f,
							x: v,
							tt: C
						})
					}
				});
				this.cleanSplit();
				a.distribute(b, w.plotHeight + H);
				D(b, function(a) {
					var f = a.point,
						b = f.series;
					a.tt.attr({
						visibility: void 0 === a.pos ? "hidden" : "inherit",
						x: r || f.isHeader ? a.x : f.plotX + w.plotLeft + q(h.distance, 16),
						y: a.pos + w.plotTop,
						anchorX: f.isHeader ? f.plotX + w.plotLeft : f.plotX + b.xAxis.pos,
						anchorY: f.isHeader ? a.pos + w.plotTop - 15 : f.plotY + b.yAxis.pos
					})
				})
			},
			updatePosition: function(a) {
				var e = this.chart,
					c = this.getLabel(),
					c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
				this.move(Math.round(c.x), Math.round(c.y || 0), a.plotX + e.plotLeft, a.plotY + e.plotTop)
			},
			getDateFormat: function(a, g, c, b) {
				var w = E("%m-%d %H:%M:%S.%L", g),
					m, r, h = {
						millisecond: 15,
						second: 12,
						minute: 9,
						hour: 6,
						day: 3
					},
					H = "millisecond";
				for (r in e) {
					if (a === e.week && +E("%w", g) === c && "00:00:00.000" === w.substr(6)) {
						r = "week";
						break
					}
					if (e[r] > a) {
						r = H;
						break
					}
					if (h[r] && w.substr(h[r]) !== "01-01 00:00:00.000".substr(h[r])) break;
					"week" !== r && (H = r)
				}
				r && (m = b[r]);
				return m
			},
			getXDateFormat: function(a, e, c) {
				e = e.dateTimeLabelFormats;
				var b = c && c.closestPointRange;
				return (b ? this.getDateFormat(b, a.x, c.options.startOfWeek, e) : e.day) || e.year
			},
			tooltipFooterHeaderFormatter: function(a, e) {
				e = e ? "footer" : "header";
				var c = a.series,
					b = c.tooltipOptions,
					g = b.xDateFormat,
					m = c.xAxis,
					r = m && "datetime" === m.options.type && l(a.key),
					h = b[e + "Format"];
				r && !g && (g = this.getXDateFormat(a, b, m));
				r && g && D(a.point && a.point.tooltipDateKeys || ["key"], function(a) {
					h = h.replace("{point." + a + "}", "{point." + a + ":" + g + "}")
				});
				return t(h, {
					point: a,
					series: c
				})
			},
			bodyFormatter: function(a) {
				return p(a, function(a) {
					var c = a.series.tooltipOptions;
					return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
				})
			}
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.attr,
			F = a.charts,
			t = a.color,
			l = a.css,
			p = a.defined,
			z = a.each,
			q = a.extend,
			u = a.find,
			B = a.fireEvent,
			e = a.isObject,
			h = a.offset,
			g = a.pick,
			c = a.removeEvent,
			b = a.splat,
			w = a.Tooltip;
		a.Pointer = function(a, b) {
			this.init(a, b)
		};
		a.Pointer.prototype = {
			init: function(a, b) {
				this.options = b;
				this.chart = a;
				this.runChartClick = b.chart.events && !!b.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				w && (a.tooltip = new w(a, b.tooltip), this.followTouchMove = g(b.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function(a) {
				var b = this.chart,
					c = b.options.chart,
					m = c.zoomType || "",
					b = b.inverted;
				/touch/.test(a.type) && (m = g(c.pinchType, m));
				this.zoomX = a = /x/.test(m);
				this.zoomY = m = /y/.test(m);
				this.zoomHor = a && !b || m && b;
				this.zoomVert = m && !b || a && b;
				this.hasZoom = a || m
			},
			normalize: function(a, b) {
				var c;
				c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
				b || (this.chartPosition = b = h(this.chart.container));
				return q(a, {
					chartX: Math.round(c.pageX - b.left),
					chartY: Math.round(c.pageY - b.top)
				})
			},
			getCoordinates: function(a) {
				var b = {
					xAxis: [],
					yAxis: []
				};
				z(this.chart.axes, function(c) {
					b[c.isXAxis ? "xAxis" : "yAxis"].push({
						axis: c,
						value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
					})
				});
				return b
			},
			findNearestKDPoint: function(a, b, c) {
				var m;
				z(a, function(a) {
					var r = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
					a = a.searchPoint(c, r);
					if ((r = e(a, !0)) && !(r = !e(m, !0))) var r = m.distX - a.distX,
						f = m.dist - a.dist,
						g = (a.series.group && a.series.group.zIndex) - (m.series.group && m.series.group.zIndex),
						r = 0 < (0 !== r && b ? r : 0 !== f ? f : 0 !== g ? g : m.series.index > a.series.index ? -1 : 1);
					r && (m = a)
				});
				return m
			},
			getPointFromEvent: function(a) {
				a = a.target;
				for (var b; a && !b;) b = a.point, a = a.parentNode;
				return b
			},
			getChartCoordinatesFromPoint: function(a, b) {
				var c = a.series,
					m = c.xAxis,
					c = c.yAxis;
				if (m && c) return b ? {
					chartX: m.len + m.pos - a.clientX,
					chartY: c.len + c.pos - a.plotY
				} : {
					chartX: a.clientX + m.pos,
					chartY: a.plotY + c.pos
				}
			},
			getHoverData: function(b, c, w, h, A, l, f) {
				var m, r = [],
					v = f && f.isBoosting;
				h = !(!h || !b);
				f = c && !c.stickyTracking ? [c] : a.grep(w, function(a) {
					return a.visible && !(!A && a.directTouch) && g(a.options.enableMouseTracking, !0) && a.stickyTracking
				});
				c = (m = h ? b : this.findNearestKDPoint(f, A, l)) && m.series;
				m && (A && !c.noSharedTooltip ? (f = a.grep(w, function(a) {
					return a.visible && !(!A && a.directTouch) && g(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
				}), z(f, function(a) {
					var d = u(a.points, function(a) {
						return a.x === m.x && !a.isNull
					});
					e(d) && (v && (d = a.getPoint(d)), r.push(d))
				})) : r.push(m));
				return {
					hoverPoint: m,
					hoverSeries: c,
					hoverPoints: r
				}
			},
			runPointActions: function(b, c) {
				var m = this.chart,
					e = m.tooltip && m.tooltip.options.enabled ? m.tooltip : void 0,
					r = e ? e.shared : !1,
					w = c || m.hoverPoint,
					f = w && w.series || m.hoverSeries,
					f = this.getHoverData(w, f, m.series, !!c || f && f.directTouch && this.isDirectTouch, r, b, {
						isBoosting: m.isBoosting
					}),
					h, w = f.hoverPoint;
				h = f.hoverPoints;
				c = (f = f.hoverSeries) && f.tooltipOptions.followPointer;
				r = r && f && !f.noSharedTooltip;
				if (w && (w !== m.hoverPoint || e && e.isHidden)) {
					z(m.hoverPoints || [], function(b) {
						-1 === a.inArray(b, h) && b.setState()
					});
					z(h || [], function(a) {
						a.setState("hover")
					});
					if (m.hoverSeries !== f) f.onMouseOver();
					m.hoverPoint && m.hoverPoint.firePointEvent("mouseOut");
					if (!w.series) return;
					w.firePointEvent("mouseOver");
					m.hoverPoints = h;
					m.hoverPoint = w;
					e && e.refresh(r ? h : w, b)
				} else c && e && !e.isHidden && (w = e.getAnchor([{}], b), e.updatePosition({
					plotX: w[0],
					plotY: w[1]
				}));
				this.unDocMouseMove || (this.unDocMouseMove = E(m.container.ownerDocument, "mousemove", function(b) {
					var f = F[a.hoverChartIndex];
					if (f) f.pointer.onDocumentMouseMove(b)
				}));
				z(m.axes, function(f) {
					var c = g(f.crosshair.snap, !0),
						d = c ? a.find(h, function(a) {
							return a.series[f.coll] === f
						}) : void 0;
					d || !c ? f.drawCrosshair(b, d) : f.hideCrosshair()
				})
			},
			reset: function(a, c) {
				var m = this.chart,
					e = m.hoverSeries,
					r = m.hoverPoint,
					g = m.hoverPoints,
					f = m.tooltip,
					w = f && f.shared ? g : r;
				a && w && z(b(w), function(b) {
					b.series.isCartesian && void 0 === b.plotX && (a = !1)
				});
				if (a) f && w && (f.refresh(w), r && (r.setState(r.state, !0), z(m.axes, function(a) {
					a.crosshair && a.drawCrosshair(null, r)
				})));
				else {
					if (r) r.onMouseOut();
					g && z(g, function(a) {
						a.setState()
					});
					if (e) e.onMouseOut();
					f && f.hide(c);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					z(m.axes, function(a) {
						a.hideCrosshair()
					});
					this.hoverX = m.hoverPoints = m.hoverPoint = null
				}
			},
			scaleGroups: function(a, b) {
				var c = this.chart,
					m;
				z(c.series, function(e) {
					m = a || e.getPlotBox();
					e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(m), e.markerGroup && (e.markerGroup.attr(m), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(m))
				});
				c.clipRect.attr(b || c.clipBox)
			},
			dragStart: function(a) {
				var b = this.chart;
				b.mouseIsDown = a.type;
				b.cancelClick = !1;
				b.mouseDownX = this.mouseDownX = a.chartX;
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function(a) {
				var b = this.chart,
					c = b.options.chart,
					m = a.chartX,
					e = a.chartY,
					g = this.zoomHor,
					f = this.zoomVert,
					w = b.plotLeft,
					h = b.plotTop,
					v = b.plotWidth,
					d = b.plotHeight,
					n, G = this.selectionMarker,
					k = this.mouseDownX,
					y = this.mouseDownY,
					l = c.panKey && a[c.panKey + "Key"];
				G && G.touch || (m < w ? m = w : m > w + v && (m = w + v), e < h ? e = h : e > h + d && (e = h + d), this.hasDragged = Math.sqrt(Math.pow(k - m, 2) + Math.pow(y - e, 2)), 10 < this.hasDragged && (n = b.isInsidePlot(k - w, y - h), b.hasCartesianSeries && (this.zoomX || this.zoomY) && n && !l && !G && (this.selectionMarker = G = b.renderer.rect(w, h, g ? 1 : v, f ? 1 : d, 0).attr({
					fill: c.selectionMarkerFill || t("#335cad").setOpacity(.25).get(),
					"class": "highcharts-selection-marker",
					zIndex: 7
				}).add()), G && g && (m -= k, G.attr({
					width: Math.abs(m),
					x: (0 < m ? 0 : m) + k
				})), G && f && (m = e - y, G.attr({
					height: Math.abs(m),
					y: (0 < m ? 0 : m) + y
				})), n && !G && c.panning && b.pan(a, c.panning)))
			},
			drop: function(a) {
				var b = this,
					c = this.chart,
					m = this.hasPinched;
				if (this.selectionMarker) {
					var e = {
							originalEvent: a,
							xAxis: [],
							yAxis: []
						},
						g = this.selectionMarker,
						f = g.attr ? g.attr("x") : g.x,
						w = g.attr ? g.attr("y") : g.y,
						h = g.attr ? g.attr("width") : g.width,
						v = g.attr ? g.attr("height") : g.height,
						d;
					if (this.hasDragged || m) z(c.axes, function(n) {
						if (n.zoomEnabled && p(n.min) && (m || b[{
								xAxis: "zoomX",
								yAxis: "zoomY"
							}[n.coll]])) {
							var c = n.horiz,
								k = "touchend" === a.type ? n.minPixelPadding : 0,
								r = n.toValue((c ? f : w) + k),
								c = n.toValue((c ? f + h : w + v) - k);
							e[n.coll].push({
								axis: n,
								min: Math.min(r, c),
								max: Math.max(r, c)
							});
							d = !0
						}
					}), d && B(c, "selection", e, function(a) {
						c.zoom(q(a, m ? {
							animation: !1
						} : null))
					});
					this.selectionMarker = this.selectionMarker.destroy();
					m && this.scaleGroups()
				}
				c && (l(c.container, {
					cursor: c._cursor
				}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function(a) {
				a = this.normalize(a);
				this.zoomOption(a);
				a.preventDefault && a.preventDefault();
				this.dragStart(a)
			},
			onDocumentMouseUp: function(b) {
				F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
			},
			onDocumentMouseMove: function(a) {
				var b = this.chart,
					c = this.chartPosition;
				a = this.normalize(a, c);
				!c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function(b) {
				var c = F[a.hoverChartIndex];
				c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
			},
			onContainerMouseMove: function(b) {
				var c = this.chart;
				p(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
				b = this.normalize(b);
				b.returnValue = !1;
				"mousedown" === c.mouseIsDown && this.drag(b);
				!this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
			},
			inClass: function(a, b) {
				for (var c; a;) {
					if (c = D(a, "class")) {
						if (-1 !== c.indexOf(b)) return !0;
						if (-1 !== c.indexOf("highcharts-container")) return !1
					}
					a = a.parentNode
				}
			},
			onTrackerMouseOut: function(a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement;
				this.isDirectTouch = !1;
				if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
			},
			onContainerClick: function(a) {
				var b = this.chart,
					c = b.hoverPoint,
					m = b.plotLeft,
					e = b.plotTop;
				a = this.normalize(a);
				b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (B(c.series, "click", q(a, {
					point: c
				})), b.hoverPoint && c.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - m, a.chartY - e) && B(b, "click", a)))
			},
			setDOMEvents: function() {
				var b = this,
					c = b.chart.container,
					e = c.ownerDocument;
				c.onmousedown = function(a) {
					b.onContainerMouseDown(a)
				};
				c.onmousemove = function(a) {
					b.onContainerMouseMove(a)
				};
				c.onclick = function(a) {
					b.onContainerClick(a)
				};
				E(c, "mouseleave", b.onContainerMouseLeave);
				1 === a.chartCount && E(e, "mouseup", b.onDocumentMouseUp);
				a.hasTouch && (c.ontouchstart = function(a) {
					b.onContainerTouchStart(a)
				}, c.ontouchmove = function(a) {
					b.onContainerTouchMove(a)
				}, 1 === a.chartCount && E(e, "touchend", b.onDocumentTouchEnd))
			},
			destroy: function() {
				var b = this,
					e = this.chart.container.ownerDocument;
				b.unDocMouseMove && b.unDocMouseMove();
				c(b.chart.container, "mouseleave", b.onContainerMouseLeave);
				a.chartCount || (c(e, "mouseup", b.onDocumentMouseUp), a.hasTouch && c(e, "touchend", b.onDocumentTouchEnd));
				clearInterval(b.tooltipTimeout);
				a.objectEach(b, function(a, c) {
					b[c] = null
				})
			}
		}
	})(L);
	(function(a) {
		var E = a.charts,
			D = a.each,
			F = a.extend,
			t = a.map,
			l = a.noop,
			p = a.pick;
		F(a.Pointer.prototype, {
			pinchTranslate: function(a, l, p, t, e, h) {
				this.zoomHor && this.pinchTranslateDirection(!0, a, l, p, t, e, h);
				this.zoomVert && this.pinchTranslateDirection(!1, a, l, p, t, e, h)
			},
			pinchTranslateDirection: function(a, l, p, t, e, h, g, c) {
				var b = this.chart,
					w = a ? "x" : "y",
					m = a ? "X" : "Y",
					r = "chart" + m,
					C = a ? "width" : "height",
					q = b["plot" + (a ? "Left" : "Top")],
					A, u, f = c || 1,
					x = b.inverted,
					J = b.bounds[a ? "h" : "v"],
					v = 1 === l.length,
					d = l[0][r],
					n = p[0][r],
					G = !v && l[1][r],
					k = !v && p[1][r],
					y;
				p = function() {
					!v && 20 < Math.abs(d - G) && (f = c || Math.abs(n - k) / Math.abs(d - G));
					u = (q - n) / f + d;
					A = b["plot" + (a ? "Width" : "Height")] / f
				};
				p();
				l = u;
				l < J.min ? (l = J.min, y = !0) : l + A > J.max && (l = J.max - A, y = !0);
				y ? (n -= .8 * (n - g[w][0]), v || (k -= .8 * (k - g[w][1])), p()) : g[w] = [n, k];
				x || (h[w] = u - q, h[C] = A);
				h = x ? 1 / f : f;
				e[C] = A;
				e[w] = l;
				t[x ? a ? "scaleY" : "scaleX" : "scale" + m] = f;
				t["translate" + m] = h * q + (n - h * d)
			},
			pinch: function(a) {
				var q = this,
					u = q.chart,
					z = q.pinchDown,
					e = a.touches,
					h = e.length,
					g = q.lastValidTouch,
					c = q.hasZoom,
					b = q.selectionMarker,
					w = {},
					m = 1 === h && (q.inClass(a.target, "highcharts-tracker") && u.runTrackerClick || q.runChartClick),
					r = {};
				1 < h && (q.initiated = !0);
				c && q.initiated && !m && a.preventDefault();
				t(e, function(a) {
					return q.normalize(a)
				});
				"touchstart" === a.type ? (D(e, function(a, b) {
					z[b] = {
						chartX: a.chartX,
						chartY: a.chartY
					}
				}), g.x = [z[0].chartX, z[1] && z[1].chartX], g.y = [z[0].chartY, z[1] && z[1].chartY], D(u.axes, function(a) {
					if (a.zoomEnabled) {
						var b = u.bounds[a.horiz ? "h" : "v"],
							c = a.minPixelPadding,
							e = a.toPixels(p(a.options.min, a.dataMin)),
							f = a.toPixels(p(a.options.max, a.dataMax)),
							m = Math.max(e, f);
						b.min = Math.min(a.pos, Math.min(e, f) - c);
						b.max = Math.max(a.pos + a.len, m + c)
					}
				}), q.res = !0) : q.followTouchMove && 1 === h ? this.runPointActions(q.normalize(a)) : z.length && (b || (q.selectionMarker = b = F({
					destroy: l,
					touch: !0
				}, u.plotBox)), q.pinchTranslate(z, e, w, b, r, g), q.hasPinched = c, q.scaleGroups(w, r), q.res && (q.res = !1, this.reset(!1, 0)))
			},
			touch: function(l, q) {
				var u = this.chart,
					t, e;
				if (u.index !== a.hoverChartIndex) this.onContainerMouseLeave({
					relatedTarget: !0
				});
				a.hoverChartIndex = u.index;
				1 === l.touches.length ? (l = this.normalize(l), (e = u.isInsidePlot(l.chartX - u.plotLeft, l.chartY - u.plotTop)) && !u.openMenu ? (q && this.runPointActions(l), "touchmove" === l.type && (q = this.pinchDown, t = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - l.chartX, 2) + Math.pow(q[0].chartY - l.chartY, 2)) : !1), p(t, !0) && this.pinch(l)) : q && this.reset()) : 2 === l.touches.length && this.pinch(l)
			},
			onContainerTouchStart: function(a) {
				this.zoomOption(a);
				this.touch(a, !0)
			},
			onContainerTouchMove: function(a) {
				this.touch(a)
			},
			onDocumentTouchEnd: function(l) {
				E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(l)
			}
		})
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.charts,
			F = a.css,
			t = a.doc,
			l = a.extend,
			p = a.noop,
			z = a.Pointer,
			q = a.removeEvent,
			u = a.win,
			B = a.wrap;
		if (!a.hasTouch && (u.PointerEvent || u.MSPointerEvent)) {
			var e = {},
				h = !!u.PointerEvent,
				g = function() {
					var b = [];
					b.item = function(a) {
						return this[a]
					};
					a.objectEach(e, function(a) {
						b.push({
							pageX: a.pageX,
							pageY: a.pageY,
							target: a.target
						})
					});
					return b
				},
				c = function(b, c, e, r) {
					"touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !D[a.hoverChartIndex] || (r(b), r = D[a.hoverChartIndex].pointer, r[c]({
						type: e,
						target: b.currentTarget,
						preventDefault: p,
						touches: g()
					}))
				};
			l(z.prototype, {
				onContainerPointerDown: function(a) {
					c(a, "onContainerTouchStart", "touchstart", function(a) {
						e[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY,
							target: a.currentTarget
						}
					})
				},
				onContainerPointerMove: function(a) {
					c(a, "onContainerTouchMove", "touchmove", function(a) {
						e[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY
						};
						e[a.pointerId].target || (e[a.pointerId].target = a.currentTarget)
					})
				},
				onDocumentPointerUp: function(a) {
					c(a, "onDocumentTouchEnd", "touchend", function(a) {
						delete e[a.pointerId]
					})
				},
				batchMSEvents: function(a) {
					a(this.chart.container, h ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
					a(this.chart.container, h ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
					a(t, h ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
				}
			});
			B(z.prototype, "init", function(a, c, e) {
				a.call(this, c, e);
				this.hasZoom && F(c.container, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				})
			});
			B(z.prototype, "setDOMEvents", function(a) {
				a.apply(this);
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(E)
			});
			B(z.prototype, "destroy", function(a) {
				this.batchMSEvents(q);
				a.call(this)
			})
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.css,
			F = a.discardElement,
			t = a.defined,
			l = a.each,
			p = a.isFirefox,
			z = a.marginNames,
			q = a.merge,
			u = a.pick,
			B = a.setAnimation,
			e = a.stableSort,
			h = a.win,
			g = a.wrap;
		a.Legend = function(a, b) {
			this.init(a, b)
		};
		a.Legend.prototype = {
			init: function(a, b) {
				this.chart = a;
				this.setOptions(b);
				b.enabled && (this.render(), E(this.chart, "endResize", function() {
					this.legend.positionCheckboxes()
				}))
			},
			setOptions: function(a) {
				var b = u(a.padding, 8);
				this.options = a;
				this.itemStyle = a.itemStyle;
				this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);
				this.itemMarginTop = a.itemMarginTop || 0;
				this.padding = b;
				this.initialItemY = b - 5;
				this.itemHeight = this.maxItemWidth = 0;
				this.symbolWidth = u(a.symbolWidth, 16);
				this.pages = []
			},
			update: function(a, b) {
				var c = this.chart;
				this.setOptions(q(!0, this.options, a));
				this.destroy();
				c.isDirtyLegend = c.isDirtyBox = !0;
				u(b, !0) && c.redraw()
			},
			colorizeItem: function(a, b) {
				a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				var c = this.options,
					e = a.legendItem,
					g = a.legendLine,
					h = a.legendSymbol,
					l = this.itemHiddenStyle.color,
					c = b ? c.itemStyle.color : l,
					A = b ? a.color || l : l,
					q = a.options && a.options.marker,
					f = {
						fill: A
					};
				e && e.css({
					fill: c,
					color: c
				});
				g && g.attr({
					stroke: A
				});
				h && (q && h.isMarker && (f = a.pointAttribs(), b || (f.stroke = f.fill = l)), h.attr(f))
			},
			positionItem: function(a) {
				var b = this.options,
					c = b.symbolPadding,
					b = !b.rtl,
					e = a._legendItemPos,
					g = e[0],
					e = e[1],
					h = a.checkbox;
				(a = a.legendGroup) && a.element && a.translate(b ? g : this.legendWidth - g - 2 * c - 4, e);
				h && (h.x = g, h.y = e)
			},
			destroyItem: function(a) {
				var b = a.checkbox;
				l(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
					a[b] && (a[b] = a[b].destroy())
				});
				b && F(a.checkbox)
			},
			destroy: function() {
				function a(a) {
					this[a] && (this[a] = this[a].destroy())
				}
				l(this.getAllItems(), function(b) {
					l(["legendItem", "legendGroup"], a, b)
				});
				l("clipRect up down pager nav box title group".split(" "), a, this);
				this.display = null
			},
			positionCheckboxes: function(a) {
				var b = this.group && this.group.alignAttr,
					c, e = this.clipHeight || this.legendHeight,
					g = this.titleHeight;
				b && (c = b.translateY, l(this.allItems, function(m) {
					var r = m.checkbox,
						h;
					r && (h = c + g + r.y + (a || 0) + 3, D(r, {
						left: b.translateX + m.checkboxOffset + r.x - 20 + "px",
						top: h + "px",
						display: h > c - 6 && h < c + e - 6 ? "" : "none"
					}))
				}))
			},
			renderTitle: function() {
				var a = this.options,
					b = this.padding,
					e = a.title,
					m = 0;
				e.text && (this.title || (this.title = this.chart.renderer.label(e.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
					zIndex: 1
				}).css(e.style).add(this.group)), a = this.title.getBBox(), m = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
					translateY: m
				}));
				this.titleHeight = m
			},
			setText: function(c) {
				var b = this.options;
				c.legendItem.attr({
					text: b.labelFormat ? a.format(b.labelFormat, c) : b.labelFormatter.call(c)
				})
			},
			renderItem: function(a) {
				var b = this.chart,
					c = b.renderer,
					e = this.options,
					g = "horizontal" === e.layout,
					h = this.symbolWidth,
					l = e.symbolPadding,
					A = this.itemStyle,
					p = this.itemHiddenStyle,
					f = this.padding,
					x = g ? u(e.itemDistance, 20) : 0,
					J = !e.rtl,
					v = e.width,
					d = e.itemMarginBottom || 0,
					n = this.itemMarginTop,
					G = a.legendItem,
					k = !a.series,
					y = !k && a.series.drawLegendSymbol ? a.series : a,
					t = y.options,
					M = this.createCheckboxForItem && t && t.showCheckbox,
					t = h + l + x + (M ? 20 : 0),
					z = e.useHTML,
					N = a.options.className;
				G || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + y.type + "-series highcharts-color-" + a.colorIndex + (N ? " " + N : "") + (k ? " highcharts-series-" + a.index : "")).attr({
					zIndex: 1
				}).add(this.scrollGroup), a.legendItem = G = c.text("", J ? h + l : -l, this.baseline || 0, z).css(q(a.visible ? A : p)).attr({
					align: J ? "left" : "right",
					zIndex: 2
				}).add(a.legendGroup), this.baseline || (h = A.fontSize, this.fontMetrics = c.fontMetrics(h, G), this.baseline = this.fontMetrics.f + 3 + n, G.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, y.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, G, z), M && this.createCheckboxForItem(a));
				this.colorizeItem(a, a.visible);
				A.width || G.css({
					width: (e.itemWidth || e.width || b.spacingBox.width) - t
				});
				this.setText(a);
				c = G.getBBox();
				A = a.checkboxOffset = e.itemWidth || a.legendItemWidth || c.width + t;
				this.itemHeight = c = Math.round(a.legendItemHeight || c.height || this.symbolHeight);
				g && this.itemX - f + A > (v || b.spacingBox.width - 2 * f - e.x) && (this.itemX = f, this.itemY += n + this.lastLineHeight + d, this.lastLineHeight = 0);
				this.maxItemWidth = Math.max(this.maxItemWidth, A);
				this.lastItemY = n + this.itemY + d;
				this.lastLineHeight = Math.max(c, this.lastLineHeight);
				a._legendItemPos = [this.itemX, this.itemY];
				g ? this.itemX += A : (this.itemY += n + c + d, this.lastLineHeight = c);
				this.offsetWidth = v || Math.max((g ? this.itemX - f - (a.checkbox ? 0 : x) : A) + f, this.offsetWidth)
			},
			getAllItems: function() {
				var a = [];
				l(this.chart.series, function(b) {
					var c = b && b.options;
					b && u(c.showInLegend, t(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
				});
				return a
			},
			adjustMargins: function(a, b) {
				var c = this.chart,
					e = this.options,
					g = e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0);
				e.floating || l([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(m, h) {
					m.test(g) && !t(a[h]) && (c[z[h]] = Math.max(c[z[h]], c.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * e[h % 2 ? "x" : "y"] + u(e.margin, 12) + b[h]))
				})
			},
			render: function() {
				var a = this,
					b = a.chart,
					g = b.renderer,
					m = a.group,
					h, C, p, A, u = a.box,
					f = a.options,
					x = a.padding;
				a.itemX = x;
				a.itemY = a.initialItemY;
				a.offsetWidth = 0;
				a.lastItemY = 0;
				m || (a.group = m = g.g("legend").attr({
					zIndex: 7
				}).add(), a.contentGroup = g.g().attr({
					zIndex: 1
				}).add(m), a.scrollGroup = g.g().add(a.contentGroup));
				a.renderTitle();
				h = a.getAllItems();
				e(h, function(a, b) {
					return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
				});
				f.reversed && h.reverse();
				a.allItems = h;
				a.display = C = !!h.length;
				a.lastLineHeight = 0;
				l(h, function(b) {
					a.renderItem(b)
				});
				p = (f.width || a.offsetWidth) + x;
				A = a.lastItemY + a.lastLineHeight + a.titleHeight;
				A = a.handleOverflow(A);
				A += x;
				u || (a.box = u = g.rect().addClass("highcharts-legend-box").attr({
					r: f.borderRadius
				}).add(m), u.isNew = !0);
				u.attr({
					stroke: f.borderColor,
					"stroke-width": f.borderWidth || 0,
					fill: f.backgroundColor || "none"
				}).shadow(f.shadow);
				0 < p && 0 < A && (u[u.isNew ? "attr" : "animate"](u.crisp.call({}, {
					x: 0,
					y: 0,
					width: p,
					height: A
				}, u.strokeWidth())), u.isNew = !1);
				u[C ? "show" : "hide"]();
				a.legendWidth = p;
				a.legendHeight = A;
				l(h, function(b) {
					a.positionItem(b)
				});
				C && m.align(q(f, {
					width: p,
					height: A
				}), !0, "spacingBox");
				b.isResizing || this.positionCheckboxes()
			},
			handleOverflow: function(a) {
				var b = this,
					c = this.chart,
					e = c.renderer,
					g = this.options,
					h = g.y,
					q = this.padding,
					c = c.spacingBox.height + ("top" === g.verticalAlign ? -h : h) - q,
					h = g.maxHeight,
					A, p = this.clipRect,
					f = g.navigation,
					x = u(f.animation, !0),
					J = f.arrowSize || 12,
					v = this.nav,
					d = this.pages,
					n, G = this.allItems,
					k = function(a) {
						"number" === typeof a ? p.attr({
							height: a
						}) : p && (b.clipRect = p.destroy(), b.contentGroup.clip());
						b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + q + "px,9999px," + (q + a) + "px,0)" : "auto")
					};
				"horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (c /= 2);
				h && (c = Math.min(c, h));
				d.length = 0;
				a > c && !1 !== f.enabled ? (this.clipHeight = A = Math.max(c - 20 - this.titleHeight - q, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, l(G, function(a, b) {
					var f = a._legendItemPos[1];
					a = Math.round(a.legendItem.getBBox().height);
					var k = d.length;
					if (!k || f - d[k - 1] > A && (n || f) !== d[k - 1]) d.push(n || f), k++;
					b === G.length - 1 && f + a - d[k - 1] > A && d.push(f);
					f !== n && (n = f)
				}), p || (p = b.clipRect = e.clipRect(0, q, 9999, 0), b.contentGroup.clip(p)), k(A), v || (this.nav = v = e.g().attr({
					zIndex: 1
				}).add(this.group), this.up = e.symbol("triangle", 0, 0, J, J).on("click", function() {
					b.scroll(-1, x)
				}).add(v), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").css(f.style).add(v), this.down = e.symbol("triangle-down", 0, 0, J, J).on("click", function() {
					b.scroll(1, x)
				}).add(v)), b.scroll(0), a = c) : v && (k(), this.nav = v.destroy(), this.scrollGroup.attr({
					translateY: 1
				}), this.clipHeight = 0);
				return a
			},
			scroll: function(a, b) {
				var c = this.pages,
					e = c.length;
				a = this.currentPage + a;
				var g = this.clipHeight,
					h = this.options.navigation,
					l = this.pager,
					A = this.padding;
				a > e && (a = e);
				0 < a && (void 0 !== b && B(b, this.chart), this.nav.attr({
					translateX: A,
					translateY: g + this.padding + 7 + this.titleHeight,
					visibility: "visible"
				}), this.up.attr({
					"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), l.attr({
					text: a + "/" + e
				}), this.down.attr({
					x: 18 + this.pager.getBBox().width,
					"class": a === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), this.up.attr({
					fill: 1 === a ? h.inactiveColor : h.activeColor
				}).css({
					cursor: 1 === a ? "default" : "pointer"
				}), this.down.attr({
					fill: a === e ? h.inactiveColor : h.activeColor
				}).css({
					cursor: a === e ? "default" : "pointer"
				}), b = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
					translateY: b
				}), this.currentPage = a, this.positionCheckboxes(b))
			}
		};
		a.LegendSymbolMixin = {
			drawRectangle: function(a, b) {
				var c = a.symbolHeight,
					e = a.options.squareSymbol;
				b.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, e ? c : a.symbolWidth, c, u(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(b.legendGroup)
			},
			drawLineMarker: function(a) {
				var b = this.options,
					c = b.marker,
					e = a.symbolWidth,
					g = a.symbolHeight,
					h = g / 2,
					l = this.chart.renderer,
					A = this.legendGroup;
				a = a.baseline - Math.round(.3 * a.fontMetrics.b);
				var p;
				p = {
					"stroke-width": b.lineWidth || 0
				};
				b.dashStyle && (p.dashstyle = b.dashStyle);
				this.legendLine = l.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(p).add(A);
				c && !1 !== c.enabled && (b = Math.min(u(c.radius, h), h), 0 === this.symbol.indexOf("url") && (c = q(c, {
					width: g,
					height: g
				}), b = 0), this.legendSymbol = c = l.symbol(this.symbol, e / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(A), c.isMarker = !0)
			}
		};
		(/Trident\/7\.0/.test(h.navigator.userAgent) || p) && g(a.Legend.prototype, "positionItem", function(a, b) {
			var c = this,
				e = function() {
					b._legendItemPos && a.call(c, b)
				};
			e();
			setTimeout(e)
		})
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.animate,
			F = a.animObject,
			t = a.attr,
			l = a.doc,
			p = a.Axis,
			z = a.createElement,
			q = a.defaultOptions,
			u = a.discardElement,
			B = a.charts,
			e = a.css,
			h = a.defined,
			g = a.each,
			c = a.extend,
			b = a.find,
			w = a.fireEvent,
			m = a.grep,
			r = a.isNumber,
			C = a.isObject,
			H = a.isString,
			A = a.Legend,
			K = a.marginNames,
			f = a.merge,
			x = a.objectEach,
			J = a.Pointer,
			v = a.pick,
			d = a.pInt,
			n = a.removeEvent,
			G = a.seriesTypes,
			k = a.splat,
			y = a.svg,
			P = a.syncTimeout,
			M = a.win,
			O = a.Chart = function() {
				this.getArgs.apply(this, arguments)
			};
		a.chart = function(a, d, b) {
			return new O(a, d, b)
		};
		c(O.prototype, {
			callbacks: [],
			getArgs: function() {
				var a = [].slice.call(arguments);
				if (H(a[0]) || a[0].nodeName) this.renderTo = a.shift();
				this.init(a[0], a[1])
			},
			init: function(d, b) {
				var k, n, c = d.series,
					e = d.plotOptions || {};
				d.series = null;
				k = f(q, d);
				for (n in k.plotOptions) k.plotOptions[n].tooltip = e[n] && f(e[n].tooltip) || void 0;
				k.tooltip.userOptions = d.chart && d.chart.forExport && d.tooltip.userOptions || d.tooltip;
				k.series = d.series = c;
				this.userOptions = d;
				d = k.chart;
				n = d.events;
				this.margin = [];
				this.spacing = [];
				this.bounds = {
					h: {},
					v: {}
				};
				this.labelCollectors = [];
				this.callback = b;
				this.isResizing = 0;
				this.options = k;
				this.axes = [];
				this.series = [];
				this.hasCartesianSeries = d.showAxes;
				var v = this;
				v.index = B.length;
				B.push(v);
				a.chartCount++;
				n && x(n, function(a, d) {
					E(v, d, a)
				});
				v.xAxis = [];
				v.yAxis = [];
				v.pointCount = v.colorCounter = v.symbolCounter = 0;
				v.firstRender()
			},
			initSeries: function(d) {
				var b = this.options.chart;
				(b = G[d.type || b.type || b.defaultSeriesType]) || a.error(17, !0);
				b = new b;
				b.init(this, d);
				return b
			},
			orderSeries: function(a) {
				var d = this.series;
				for (a = a || 0; a < d.length; a++) d[a] && (d[a].index = a, d[a].name = d[a].name || "Series " + (d[a].index + 1))
			},
			isInsidePlot: function(a, d, b) {
				var k = b ? d : a;
				a = b ? a : d;
				return 0 <= k && k <= this.plotWidth && 0 <= a && a <= this.plotHeight
			},
			redraw: function(d) {
				var b = this.axes,
					k = this.series,
					f = this.pointer,
					n = this.legend,
					v = this.isDirtyLegend,
					e, m, h = this.hasCartesianSeries,
					y = this.isDirtyBox,
					r, G = this.renderer,
					x = G.isHidden(),
					l = [];
				this.setResponsive && this.setResponsive(!1);
				a.setAnimation(d, this);
				x && this.temporaryDisplay();
				this.layOutTitles();
				for (d = k.length; d--;)
					if (r = k[d], r.options.stacking && (e = !0, r.isDirty)) {
						m = !0;
						break
					}
				if (m)
					for (d = k.length; d--;) r = k[d], r.options.stacking && (r.isDirty = !0);
				g(k, function(a) {
					a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), v = !0);
					a.isDirtyData && w(a, "updatedData")
				});
				v && n.options.enabled && (n.render(), this.isDirtyLegend = !1);
				e && this.getStacks();
				h && g(b, function(a) {
					a.updateNames();
					a.setScale()
				});
				this.getMargins();
				h && (g(b, function(a) {
					a.isDirty && (y = !0)
				}), g(b, function(a) {
					var d = a.min + "," + a.max;
					a.extKey !== d && (a.extKey = d, l.push(function() {
						w(a, "afterSetExtremes", c(a.eventArgs, a.getExtremes()));
						delete a.eventArgs
					}));
					(y || e) && a.redraw()
				}));
				y && this.drawChartBox();
				w(this, "predraw");
				g(k, function(a) {
					(y || a.isDirty) && a.visible && a.redraw();
					a.isDirtyData = !1
				});
				f && f.reset(!0);
				G.draw();
				w(this, "redraw");
				w(this, "render");
				x && this.temporaryDisplay(!0);
				g(l, function(a) {
					a.call()
				})
			},
			get: function(a) {
				function d(d) {
					return d.id === a || d.options && d.options.id === a
				}
				var k, f = this.series,
					n;
				k = b(this.axes, d) || b(this.series, d);
				for (n = 0; !k && n < f.length; n++) k = b(f[n].points || [], d);
				return k
			},
			getAxes: function() {
				var a = this,
					d = this.options,
					b = d.xAxis = k(d.xAxis || {}),
					d = d.yAxis = k(d.yAxis || {});
				g(b, function(a, d) {
					a.index = d;
					a.isX = !0
				});
				g(d, function(a, d) {
					a.index = d
				});
				b = b.concat(d);
				g(b, function(d) {
					new p(a, d)
				})
			},
			getSelectedPoints: function() {
				var a = [];
				g(this.series, function(d) {
					a = a.concat(m(d.data || [], function(a) {
						return a.selected
					}))
				});
				return a
			},
			getSelectedSeries: function() {
				return m(this.series, function(a) {
					return a.selected
				})
			},
			setTitle: function(a, d, b) {
				var k = this,
					n = k.options,
					c;
				c = n.title = f({
					style: {
						color: "#333333",
						fontSize: n.isStock ? "16px" : "18px"
					}
				}, n.title, a);
				n = n.subtitle = f({
					style: {
						color: "#666666"
					}
				}, n.subtitle, d);
				g([
					["title", a, c],
					["subtitle", d, n]
				], function(a, d) {
					var b = a[0],
						f = k[b],
						n = a[1];
					a = a[2];
					f && n && (k[b] = f = f.destroy());
					a && !f && (k[b] = k.renderer.text(a.text, 0, 0, a.useHTML).attr({
						align: a.align,
						"class": "highcharts-" + b,
						zIndex: a.zIndex || 4
					}).add(), k[b].update = function(a) {
						k.setTitle(!d && a, d && a)
					}, k[b].css(a.style))
				});
				k.layOutTitles(b)
			},
			layOutTitles: function(a) {
				var d = 0,
					b, k = this.renderer,
					f = this.spacingBox;
				g(["title", "subtitle"], function(a) {
					var b = this[a],
						n = this.options[a];
					a = "title" === a ? -3 : n.verticalAlign ? 0 : d + 2;
					var v;
					b && (v = n.style.fontSize, v = k.fontMetrics(v, b).b, b.css({
						width: (n.width || f.width + n.widthAdjust) + "px"
					}).align(c({
						y: a + v
					}, n), !1, "spacingBox"), n.floating || n.verticalAlign || (d = Math.ceil(d + b.getBBox(n.useHTML).height)))
				}, this);
				b = this.titleOffset !== d;
				this.titleOffset = d;
				!this.isDirtyBox && b && (this.isDirtyBox = b, this.hasRendered && v(a, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function() {
				var d = this.options.chart,
					b = d.width,
					d = d.height,
					k = this.renderTo;
				h(b) || (this.containerWidth = a.getStyle(k, "width"));
				h(d) || (this.containerHeight = a.getStyle(k, "height"));
				this.chartWidth = Math.max(0, b || this.containerWidth || 600);
				this.chartHeight = Math.max(0, a.relativeLength(d, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
			},
			temporaryDisplay: function(d) {
				var b = this.renderTo;
				if (d)
					for (; b && b.style;) b.hcOrigStyle && (a.css(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (l.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
				else
					for (; b && b.style;) {
						l.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, l.body.appendChild(b));
						if ("none" === a.getStyle(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
							display: b.style.display,
							height: b.style.height,
							overflow: b.style.overflow
						}, d = {
							display: "block",
							overflow: "hidden"
						}, b !== this.renderTo && (d.height = 0), a.css(b, d), b.offsetWidth || b.style.setProperty("display", "block", "important");
						b = b.parentNode;
						if (b === l.body) break
					}
			},
			setClassName: function(a) {
				this.container.className = "highcharts-container " + (a || "")
			},
			getContainer: function() {
				var b, k = this.options,
					f = k.chart,
					n, v;
				b = this.renderTo;
				var e = a.uniqueKey(),
					g;
				b || (this.renderTo = b = f.renderTo);
				H(b) && (this.renderTo = b = l.getElementById(b));
				b || a.error(13, !0);
				n = d(t(b, "data-highcharts-chart"));
				r(n) && B[n] && B[n].hasRendered && B[n].destroy();
				t(b, "data-highcharts-chart", this.index);
				b.innerHTML = "";
				f.skipClone || b.offsetWidth || this.temporaryDisplay();
				this.getChartSize();
				n = this.chartWidth;
				v = this.chartHeight;
				g = c({
					position: "relative",
					overflow: "hidden",
					width: n + "px",
					height: v + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				}, f.style);
				this.container = b = z("div", {
					id: e
				}, g, b);
				this._cursor = b.style.cursor;
				this.renderer = new(a[f.renderer] || a.Renderer)(b, n, v, null, f.forExport, k.exporting && k.exporting.allowHTML);
				this.setClassName(f.className);
				this.renderer.setStyle(f.style);
				this.renderer.chartIndex = this.index
			},
			getMargins: function(a) {
				var d = this.spacing,
					b = this.margin,
					k = this.titleOffset;
				this.resetMargins();
				k && !h(b[0]) && (this.plotTop = Math.max(this.plotTop, k + this.options.title.margin + d[0]));
				this.legend && this.legend.display && this.legend.adjustMargins(b, d);
				this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
				this.adjustPlotArea && this.adjustPlotArea();
				a || this.getAxisMargins()
			},
			getAxisMargins: function() {
				var a = this,
					d = a.axisOffset = [0, 0, 0, 0],
					b = a.margin;
				a.hasCartesianSeries && g(a.axes, function(a) {
					a.visible && a.getOffset()
				});
				g(K, function(k, f) {
					h(b[f]) || (a[k] += d[f])
				});
				a.setChartSize()
			},
			reflow: function(d) {
				var b = this,
					k = b.options.chart,
					f = b.renderTo,
					n = h(k.width) && h(k.height),
					c = k.width || a.getStyle(f, "width"),
					k = k.height || a.getStyle(f, "height"),
					f = d ? d.target : M;
				if (!n && !b.isPrinting && c && k && (f === M || f === l)) {
					if (c !== b.containerWidth || k !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = P(function() {
						b.container && b.setSize(void 0, void 0, !1)
					}, d ? 100 : 0);
					b.containerWidth = c;
					b.containerHeight = k
				}
			},
			initReflow: function() {
				var a = this,
					d;
				d = E(M, "resize", function(d) {
					a.reflow(d)
				});
				E(a, "destroy", d)
			},
			setSize: function(d, b, k) {
				var f = this,
					n = f.renderer;
				f.isResizing += 1;
				a.setAnimation(k, f);
				f.oldChartHeight = f.chartHeight;
				f.oldChartWidth = f.chartWidth;
				void 0 !== d && (f.options.chart.width = d);
				void 0 !== b && (f.options.chart.height = b);
				f.getChartSize();
				d = n.globalAnimation;
				(d ? D : e)(f.container, {
					width: f.chartWidth + "px",
					height: f.chartHeight + "px"
				}, d);
				f.setChartSize(!0);
				n.setSize(f.chartWidth, f.chartHeight, k);
				g(f.axes, function(a) {
					a.isDirty = !0;
					a.setScale()
				});
				f.isDirtyLegend = !0;
				f.isDirtyBox = !0;
				f.layOutTitles();
				f.getMargins();
				f.redraw(k);
				f.oldChartHeight = null;
				w(f, "resize");
				P(function() {
					f && w(f, "endResize", null, function() {
						--f.isResizing
					})
				}, F(d).duration)
			},
			setChartSize: function(a) {
				var d = this.inverted,
					b = this.renderer,
					f = this.chartWidth,
					k = this.chartHeight,
					n = this.options.chart,
					c = this.spacing,
					v = this.clipOffset,
					e, m, h, y;
				this.plotLeft = e = Math.round(this.plotLeft);
				this.plotTop = m = Math.round(this.plotTop);
				this.plotWidth = h = Math.max(0, Math.round(f - e - this.marginRight));
				this.plotHeight = y = Math.max(0, Math.round(k - m - this.marginBottom));
				this.plotSizeX = d ? y : h;
				this.plotSizeY = d ? h : y;
				this.plotBorderWidth = n.plotBorderWidth || 0;
				this.spacingBox = b.spacingBox = {
					x: c[3],
					y: c[0],
					width: f - c[3] - c[1],
					height: k - c[0] - c[2]
				};
				this.plotBox = b.plotBox = {
					x: e,
					y: m,
					width: h,
					height: y
				};
				f = 2 * Math.floor(this.plotBorderWidth / 2);
				d = Math.ceil(Math.max(f, v[3]) / 2);
				b = Math.ceil(Math.max(f, v[0]) / 2);
				this.clipBox = {
					x: d,
					y: b,
					width: Math.floor(this.plotSizeX - Math.max(f, v[1]) / 2 - d),
					height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, v[2]) / 2 - b))
				};
				a || g(this.axes, function(a) {
					a.setAxisSize();
					a.setAxisTranslation()
				})
			},
			resetMargins: function() {
				var a = this,
					d = a.options.chart;
				g(["margin", "spacing"], function(b) {
					var f = d[b],
						k = C(f) ? f : [f, f, f, f];
					g(["Top", "Right", "Bottom", "Left"], function(f, n) {
						a[b][n] = v(d[b + f], k[n])
					})
				});
				g(K, function(d, b) {
					a[d] = v(a.margin[b], a.spacing[b])
				});
				a.axisOffset = [0, 0, 0, 0];
				a.clipOffset = [0, 0, 0, 0]
			},
			drawChartBox: function() {
				var a = this.options.chart,
					d = this.renderer,
					b = this.chartWidth,
					f = this.chartHeight,
					k = this.chartBackground,
					n = this.plotBackground,
					c = this.plotBorder,
					v, e = this.plotBGImage,
					g = a.backgroundColor,
					m = a.plotBackgroundColor,
					h = a.plotBackgroundImage,
					y, r = this.plotLeft,
					G = this.plotTop,
					w = this.plotWidth,
					x = this.plotHeight,
					l = this.plotBox,
					A = this.clipRect,
					q = this.clipBox,
					p = "animate";
				k || (this.chartBackground = k = d.rect().addClass("highcharts-background").add(), p = "attr");
				v = a.borderWidth || 0;
				y = v + (a.shadow ? 8 : 0);
				g = {
					fill: g || "none"
				};
				if (v || k["stroke-width"]) g.stroke = a.borderColor, g["stroke-width"] = v;
				k.attr(g).shadow(a.shadow);
				k[p]({
					x: y / 2,
					y: y / 2,
					width: b - y - v % 2,
					height: f - y - v % 2,
					r: a.borderRadius
				});
				p = "animate";
				n || (p = "attr", this.plotBackground = n = d.rect().addClass("highcharts-plot-background").add());
				n[p](l);
				n.attr({
					fill: m || "none"
				}).shadow(a.plotShadow);
				h && (e ? e.animate(l) : this.plotBGImage = d.image(h, r, G, w, x).add());
				A ? A.animate({
					width: q.width,
					height: q.height
				}) : this.clipRect = d.clipRect(q);
				p = "animate";
				c || (p = "attr", this.plotBorder = c = d.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add());
				c.attr({
					stroke: a.plotBorderColor,
					"stroke-width": a.plotBorderWidth || 0,
					fill: "none"
				});
				c[p](c.crisp({
					x: r,
					y: G,
					width: w,
					height: x
				}, -c.strokeWidth()));
				this.isDirtyBox = !1
			},
			propFromSeries: function() {
				var a = this,
					d = a.options.chart,
					b, f = a.options.series,
					k, n;
				g(["inverted", "angular", "polar"], function(c) {
					b = G[d.type || d.defaultSeriesType];
					n = d[c] || b && b.prototype[c];
					for (k = f && f.length; !n && k--;)(b = G[f[k].type]) && b.prototype[c] && (n = !0);
					a[c] = n
				})
			},
			linkSeries: function() {
				var a = this,
					d = a.series;
				g(d, function(a) {
					a.linkedSeries.length = 0
				});
				g(d, function(d) {
					var b = d.options.linkedTo;
					H(b) && (b = ":previous" === b ? a.series[d.index - 1] : a.get(b)) && b.linkedParent !== d && (b.linkedSeries.push(d), d.linkedParent = b, d.visible = v(d.options.visible, b.options.visible, d.visible))
				})
			},
			renderSeries: function() {
				g(this.series, function(a) {
					a.translate();
					a.render()
				})
			},
			renderLabels: function() {
				var a = this,
					b = a.options.labels;
				b.items && g(b.items, function(f) {
					var k = c(b.style, f.style),
						n = d(k.left) + a.plotLeft,
						v = d(k.top) + a.plotTop + 12;
					delete k.left;
					delete k.top;
					a.renderer.text(f.html, n, v).attr({
						zIndex: 2
					}).css(k).add()
				})
			},
			render: function() {
				var a = this.axes,
					d = this.renderer,
					b = this.options,
					f, k, n;
				this.setTitle();
				this.legend = new A(this, b.legend);
				this.getStacks && this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				b = this.plotWidth;
				f = this.plotHeight -= 21;
				g(a, function(a) {
					a.setScale()
				});
				this.getAxisMargins();
				k = 1.1 < b / this.plotWidth;
				n = 1.05 < f / this.plotHeight;
				if (k || n) g(a, function(a) {
					(a.horiz && k || !a.horiz && n) && a.setTickInterval(!0)
				}), this.getMargins();
				this.drawChartBox();
				this.hasCartesianSeries && g(a, function(a) {
					a.visible && a.render()
				});
				this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
					zIndex: 3
				}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.hasRendered = !0
			},
			addCredits: function(a) {
				var d = this;
				a = f(!0, this.options.credits, a);
				a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
					a.href && (M.location.href = a.href)
				}).attr({
					align: a.position.align,
					zIndex: 8
				}).css(a.style).add().align(a.position), this.credits.update = function(a) {
					d.credits = d.credits.destroy();
					d.addCredits(a)
				})
			},
			destroy: function() {
				var d = this,
					b = d.axes,
					f = d.series,
					k = d.container,
					c, v = k && k.parentNode;
				w(d, "destroy");
				d.renderer.forExport ? a.erase(B, d) : B[d.index] = void 0;
				a.chartCount--;
				d.renderTo.removeAttribute("data-highcharts-chart");
				n(d);
				for (c = b.length; c--;) b[c] = b[c].destroy();
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (c = f.length; c--;) f[c] = f[c].destroy();
				g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
					var b = d[a];
					b && b.destroy && (d[a] = b.destroy())
				});
				k && (k.innerHTML = "", n(k), v && u(k));
				x(d, function(a, b) {
					delete d[b]
				})
			},
			isReadyToRender: function() {
				var a = this;
				return y || M != M.top || "complete" === l.readyState ? !0 : (l.attachEvent("onreadystatechange", function() {
					l.detachEvent("onreadystatechange", a.firstRender);
					"complete" === l.readyState && a.firstRender()
				}), !1)
			},
			firstRender: function() {
				var a = this,
					d = a.options;
				if (a.isReadyToRender()) {
					a.getContainer();
					w(a, "init");
					a.resetMargins();
					a.setChartSize();
					a.propFromSeries();
					a.getAxes();
					g(d.series || [], function(d) {
						a.initSeries(d)
					});
					a.linkSeries();
					w(a, "beforeRender");
					J && (a.pointer = new J(a, d));
					a.render();
					if (!a.renderer.imgCount && a.onload) a.onload();
					a.temporaryDisplay(!0)
				}
			},
			onload: function() {
				g([this.callback].concat(this.callbacks), function(a) {
					a && void 0 !== this.index && a.apply(this, [this])
				}, this);
				w(this, "load");
				w(this, "render");
				h(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
				this.onload = null
			}
		})
	})(L);
	(function(a) {
		var E, D = a.each,
			F = a.extend,
			t = a.erase,
			l = a.fireEvent,
			p = a.format,
			z = a.isArray,
			q = a.isNumber,
			u = a.pick,
			B = a.removeEvent;
		a.Point = E = function() {};
		a.Point.prototype = {
			init: function(a, h, g) {
				this.series = a;
				this.color = a.color;
				this.applyOptions(h, g);
				a.options.colorByPoint ? (h = a.options.colors || a.chart.options.colors, this.color = this.color || h[a.colorCounter], h = h.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === h && (a.colorCounter = 0)) : g = a.colorIndex;
				this.colorIndex = u(this.colorIndex, g);
				a.chart.pointCount++;
				return this
			},
			applyOptions: function(a, h) {
				var e = this.series,
					c = e.options.pointValKey || e.pointValKey;
				a = E.prototype.optionsToObject.call(this, a);
				F(this, a);
				this.options = this.options ? F(this.options, a) : a;
				a.group && delete this.group;
				c && (this.y = this[c]);
				this.isNull = u(this.isValid && !this.isValid(), null === this.x || !q(this.y, !0));
				this.selected && (this.state = "select");
				"name" in this && void 0 === h && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
				void 0 === this.x && e && (this.x = void 0 === h ? e.autoIncrement(this) : h);
				return this
			},
			optionsToObject: function(a) {
				var e = {},
					g = this.series,
					c = g.options.keys,
					b = c || g.pointArrayMap || ["y"],
					w = b.length,
					m = 0,
					r = 0;
				if (q(a) || null === a) e[b[0]] = a;
				else if (z(a))
					for (!c && a.length > w && (g = typeof a[0], "string" === g ? e.name = a[0] : "number" === g && (e.x = a[0]), m++); r < w;) c && void 0 === a[m] || (e[b[r]] = a[m]), m++, r++;
				else "object" === typeof a && (e = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
				return e
			},
			getClassName: function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
			},
			getZone: function() {
				var a = this.series,
					h = a.zones,
					a = a.zoneAxis || "y",
					g = 0,
					c;
				for (c = h[g]; this[a] >= c.value;) c = h[++g];
				c && c.color && !this.options.color && (this.color = c.color);
				return c
			},
			destroy: function() {
				var a = this.series.chart,
					h = a.hoverPoints,
					g;
				a.pointCount--;
				h && (this.setState(), t(h, this), h.length || (a.hoverPoints = null));
				if (this === a.hoverPoint) this.onMouseOut();
				if (this.graphic || this.dataLabel) B(this), this.destroyElements();
				this.legendItem && a.legend.destroyItem(this);
				for (g in this) this[g] = null
			},
			destroyElements: function() {
				for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], h, g = 6; g--;) h = a[g], this[h] && (this[h] = this[h].destroy())
			},
			getLabelConfig: function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function(a) {
				var e = this.series,
					g = e.tooltipOptions,
					c = u(g.valueDecimals, ""),
					b = g.valuePrefix || "",
					w = g.valueSuffix || "";
				D(e.pointArrayMap || ["y"], function(e) {
					e = "{point." + e;
					if (b || w) a = a.replace(e + "}", b + e + "}" + w);
					a = a.replace(e + "}", e + ":,." + c + "f}")
				});
				return p(a, {
					point: this,
					series: this.series
				})
			},
			firePointEvent: function(a, h, g) {
				var c = this,
					b = this.series.options;
				(b.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
				"click" === a && b.allowPointSelect && (g = function(a) {
					c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				});
				l(this, a, h, g)
			},
			visible: !0
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.animObject,
			F = a.arrayMax,
			t = a.arrayMin,
			l = a.correctFloat,
			p = a.Date,
			z = a.defaultOptions,
			q = a.defaultPlotOptions,
			u = a.defined,
			B = a.each,
			e = a.erase,
			h = a.extend,
			g = a.fireEvent,
			c = a.grep,
			b = a.isArray,
			w = a.isNumber,
			m = a.isString,
			r = a.merge,
			C = a.objectEach,
			H = a.pick,
			A = a.removeEvent,
			K = a.splat,
			f = a.SVGElement,
			x = a.syncTimeout,
			J = a.win;
		a.Series = a.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: {
				duration: 1E3
			},
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				radius: 4,
				states: {
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				align: "center",
				formatter: function() {
					return null === this.y ? "" : a.numberFormat(this.y, -1)
				},
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				padding: 5
			},
			cropThreshold: 300,
			pointRange: 0,
			softThreshold: !0,
			states: {
				hover: {
					animation: {
						duration: 50
					},
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: .25
					}
				},
				select: {
					marker: {}
				}
			},
			stickyTracking: !0,
			turboThreshold: 1E3,
			findNearestPointBy: "x"
		}, {
			isCartesian: !0,
			pointClass: a.Point,
			sorted: !0,
			requireSorting: !0,
			directTouch: !1,
			axisTypes: ["xAxis", "yAxis"],
			colorCounter: 0,
			parallelArrays: ["x", "y"],
			coll: "series",
			init: function(a, d) {
				var b = this,
					f, k = a.series,
					c;
				b.chart = a;
				b.options = d = b.setOptions(d);
				b.linkedSeries = [];
				b.bindAxes();
				h(b, {
					name: d.name,
					state: "",
					visible: !1 !== d.visible,
					selected: !0 === d.selected
				});
				f = d.events;
				C(f, function(a, d) {
					E(b, d, a)
				});
				if (f && f.click || d.point && d.point.events && d.point.events.click || d.allowPointSelect) a.runTrackerClick = !0;
				b.getColor();
				b.getSymbol();
				B(b.parallelArrays, function(a) {
					b[a + "Data"] = []
				});
				b.setData(d.data, !1);
				b.isCartesian && (a.hasCartesianSeries = !0);
				k.length && (c = k[k.length - 1]);
				b._i = H(c && c._i, -1) + 1;
				a.orderSeries(this.insert(k))
			},
			insert: function(a) {
				var d = this.options.index,
					b;
				if (w(d)) {
					for (b = a.length; b--;)
						if (d >= H(a[b].options.index, a[b]._i)) {
							a.splice(b + 1, 0, this);
							break
						} - 1 === b && a.unshift(this);
					b += 1
				} else a.push(this);
				return H(b, a.length - 1)
			},
			bindAxes: function() {
				var b = this,
					d = b.options,
					f = b.chart,
					c;
				B(b.axisTypes || [], function(k) {
					B(f[k], function(a) {
						c = a.options;
						if (d[k] === c.index || void 0 !== d[k] && d[k] === c.id || void 0 === d[k] && 0 === c.index) b.insert(a.series), b[k] = a, a.isDirty = !0
					});
					b[k] || b.optionalAxis === k || a.error(18, !0)
				})
			},
			updateParallelArrays: function(a, d) {
				var b = a.series,
					f = arguments,
					k = w(d) ? function(f) {
						var k = "y" === f && b.toYData ? b.toYData(a) : a[f];
						b[f + "Data"][d] = k
					} : function(a) {
						Array.prototype[d].apply(b[a + "Data"], Array.prototype.slice.call(f, 2))
					};
				B(b.parallelArrays, k)
			},
			autoIncrement: function() {
				var a = this.options,
					d = this.xIncrement,
					b, f = a.pointIntervalUnit,
					d = H(d, a.pointStart, 0);
				this.pointInterval = b = H(this.pointInterval, a.pointInterval, 1);
				f && (a = new p(d), "day" === f ? a = +a[p.hcSetDate](a[p.hcGetDate]() + b) : "month" === f ? a = +a[p.hcSetMonth](a[p.hcGetMonth]() + b) : "year" === f && (a = +a[p.hcSetFullYear](a[p.hcGetFullYear]() + b)), b = a - d);
				this.xIncrement = d + b;
				return d
			},
			setOptions: function(a) {
				var d = this.chart,
					b = d.options,
					f = b.plotOptions,
					k = (d.userOptions || {}).plotOptions || {},
					c = f[this.type];
				this.userOptions = a;
				d = r(c, f.series, a);
				this.tooltipOptions = r(z.tooltip, z.plotOptions.series && z.plotOptions.series.tooltip, z.plotOptions[this.type].tooltip, b.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip);
				this.stickyTracking = H(a.stickyTracking, k[this.type] && k[this.type].stickyTracking, k.series && k.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
				null === c.marker && delete d.marker;
				this.zoneAxis = d.zoneAxis;
				a = this.zones = (d.zones || []).slice();
				!d.negativeColor && !d.negativeFillColor || d.zones || a.push({
					value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
					className: "highcharts-negative",
					color: d.negativeColor,
					fillColor: d.negativeFillColor
				});
				a.length && u(a[a.length - 1].value) && a.push({
					color: this.color,
					fillColor: this.fillColor
				});
				return d
			},
			getCyclic: function(a, d, b) {
				var f, k = this.chart,
					n = this.userOptions,
					c = a + "Index",
					e = a + "Counter",
					v = b ? b.length : H(k.options.chart[a + "Count"], k[a + "Count"]);
				d || (f = H(n[c], n["_" + c]), u(f) || (k.series.length || (k[e] = 0), n["_" + c] = f = k[e] % v, k[e] += 1), b && (d = b[f]));
				void 0 !== f && (this[c] = f);
				this[a] = d
			},
			getColor: function() {
				this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || q[this.type].color, this.chart.options.colors)
			},
			getSymbol: function() {
				this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
			setData: function(f, d, n, c) {
				var k = this,
					e = k.points,
					v = e && e.length || 0,
					g, h = k.options,
					r = k.chart,
					x = null,
					G = k.xAxis,
					l = h.turboThreshold,
					A = this.xData,
					p = this.yData,
					q = (g = k.pointArrayMap) && g.length;
				f = f || [];
				g = f.length;
				d = H(d, !0);
				if (!1 !== c && g && v === g && !k.cropped && !k.hasGroupedData && k.visible) B(f, function(a, d) {
					e[d].update && a !== h.data[d] && e[d].update(a, !1, null, !1)
				});
				else {
					k.xIncrement = null;
					k.colorCounter = 0;
					B(this.parallelArrays, function(a) {
						k[a + "Data"].length = 0
					});
					if (l && g > l) {
						for (n = 0; null === x && n < g;) x = f[n], n++;
						if (w(x))
							for (n = 0; n < g; n++) A[n] = this.autoIncrement(),
								p[n] = f[n];
						else if (b(x))
							if (q)
								for (n = 0; n < g; n++) x = f[n], A[n] = x[0], p[n] = x.slice(1, q + 1);
							else
								for (n = 0; n < g; n++) x = f[n], A[n] = x[0], p[n] = x[1];
						else a.error(12)
					} else
						for (n = 0; n < g; n++) void 0 !== f[n] && (x = {
							series: k
						}, k.pointClass.prototype.applyOptions.apply(x, [f[n]]), k.updateParallelArrays(x, n));
					p && m(p[0]) && a.error(14, !0);
					k.data = [];
					k.options.data = k.userOptions.data = f;
					for (n = v; n--;) e[n] && e[n].destroy && e[n].destroy();
					G && (G.minRange = G.userMinRange);
					k.isDirty = r.isDirtyBox = !0;
					k.isDirtyData = !!e;
					n = !1
				}
				"point" === h.legendType && (this.processData(), this.generatePoints());
				d && r.redraw(n)
			},
			processData: function(b) {
				var d = this.xData,
					f = this.yData,
					c = d.length,
					k;
				k = 0;
				var e, v, g = this.xAxis,
					m, h = this.options;
				m = h.cropThreshold;
				var r = this.getExtremesFromAll || h.getExtremesFromAll,
					x = this.isCartesian,
					h = g && g.val2lin,
					w = g && g.isLog,
					l, A;
				if (x && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !b) return !1;
				g && (b = g.getExtremes(), l = b.min, A = b.max);
				if (x && this.sorted && !r && (!m || c > m || this.forceCrop))
					if (d[c - 1] < l || d[0] > A) d = [], f = [];
					else if (d[0] < l || d[c - 1] > A) k = this.cropData(this.xData, this.yData, l, A), d = k.xData, f = k.yData, k = k.start, e = !0;
				for (m = d.length || 1; --m;) c = w ? h(d[m]) - h(d[m - 1]) : d[m] - d[m - 1], 0 < c && (void 0 === v || c < v) ? v = c : 0 > c && this.requireSorting && a.error(15);
				this.cropped = e;
				this.cropStart = k;
				this.processedXData = d;
				this.processedYData = f;
				this.closestPointRange = v
			},
			cropData: function(a, d, b, f) {
				var k = a.length,
					c = 0,
					n = k,
					e = H(this.cropShoulder, 1),
					v;
				for (v = 0; v < k; v++)
					if (a[v] >= b) {
						c = Math.max(0, v - e);
						break
					}
				for (b = v; b < k; b++)
					if (a[b] > f) {
						n = b + e;
						break
					}
				return {
					xData: a.slice(c, n),
					yData: d.slice(c, n),
					start: c,
					end: n
				}
			},
			generatePoints: function() {
				var a = this.options,
					d = a.data,
					b = this.data,
					f, k = this.processedXData,
					c = this.processedYData,
					e = this.pointClass,
					g = k.length,
					m = this.cropStart || 0,
					h, r = this.hasGroupedData,
					a = a.keys,
					x, w = [],
					l;
				b || r || (b = [], b.length = d.length, b = this.data = b);
				a && r && (this.options.keys = !1);
				for (l = 0; l < g; l++) h = m + l, r ? (x = (new e).init(this, [k[l]].concat(K(c[l]))), x.dataGroup = this.groupMap[l]) : (x = b[h]) || void 0 === d[h] || (b[h] = x = (new e).init(this, d[h], k[l])), x && (x.index = h, w[l] = x);
				this.options.keys = a;
				if (b && (g !== (f = b.length) || r))
					for (l = 0; l < f; l++) l !== m || r || (l += g), b[l] && (b[l].destroyElements(), b[l].plotX = void 0);
				this.data = b;
				this.points = w
			},
			getExtremes: function(a) {
				var d = this.yAxis,
					f = this.processedXData,
					c, k = [],
					e = 0;
				c = this.xAxis.getExtremes();
				var v = c.min,
					g = c.max,
					m, h, r, x;
				a = a || this.stackedYData || this.processedYData || [];
				c = a.length;
				for (x = 0; x < c; x++)
					if (h = f[x], r = a[x], m = (w(r, !0) || b(r)) && (!d.positiveValuesOnly || r.length || 0 < r), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (f[x + 1] || h) >= v && (f[x - 1] || h) <= g, m && h)
						if (m = r.length)
							for (; m--;) null !== r[m] && (k[e++] = r[m]);
						else k[e++] = r;
				this.dataMin = t(k);
				this.dataMax = F(k)
			},
			translate: function() {
				this.processedXData || this.processData();
				this.generatePoints();
				var a = this.options,
					d = a.stacking,
					b = this.xAxis,
					f = b.categories,
					k = this.yAxis,
					c = this.points,
					e = c.length,
					g = !!this.modifyValue,
					m = a.pointPlacement,
					h = "between" === m || w(m),
					r = a.threshold,
					x = a.startFromThreshold ? r : 0,
					A, p, q, C, J = Number.MAX_VALUE;
				"between" === m && (m = .5);
				w(m) && (m *= H(a.pointRange || b.pointRange));
				for (a = 0; a < e; a++) {
					var t = c[a],
						K = t.x,
						z = t.y;
					p = t.low;
					var B = d && k.stacks[(this.negStacks && z < (x ? 0 : r) ? "-" : "") + this.stackKey],
						D;
					k.positiveValuesOnly && null !== z && 0 >= z && (t.isNull = !0);
					t.plotX = A = l(Math.min(Math.max(-1E5, b.translate(K, 0, 0, 0, 1, m, "flags" === this.type)), 1E5));
					d && this.visible && !t.isNull && B && B[K] && (C = this.getStackIndicator(C, K, this.index), D = B[K], z = D.points[C.key], p = z[0], z = z[1], p === x && C.key === B[K].base && (p = H(r, k.min)), k.positiveValuesOnly && 0 >= p && (p = null), t.total = t.stackTotal = D.total, t.percentage = D.total && t.y / D.total * 100, t.stackY = z, D.setOffset(this.pointXOffset || 0, this.barW || 0));
					t.yBottom = u(p) ? k.translate(p, 0, 1, 0, 1) : null;
					g && (z = this.modifyValue(z, t));
					t.plotY = p = "number" === typeof z && Infinity !== z ? Math.min(Math.max(-1E5, k.translate(z, 0, 1, 0, 1)), 1E5) : void 0;
					t.isInside = void 0 !== p && 0 <= p && p <= k.len && 0 <= A && A <= b.len;
					t.clientX = h ? l(b.translate(K, 0, 0, 0, 1, m)) : A;
					t.negative = t.y < (r || 0);
					t.category = f && void 0 !== f[t.x] ? f[t.x] : t.x;
					t.isNull || (void 0 !== q && (J = Math.min(J, Math.abs(A - q))), q = A);
					t.zone = this.zones.length && t.getZone()
				}
				this.closestPointRangePx = J
			},
			getValidPoints: function(a, d) {
				var b = this.chart;
				return c(a || this.points || [], function(a) {
					return d && !b.isInsidePlot(a.plotX, a.plotY, b.inverted) ? !1 : !a.isNull
				})
			},
			setClip: function(a) {
				var d = this.chart,
					b = this.options,
					f = d.renderer,
					k = d.inverted,
					c = this.clipBox,
					e = c || d.clipBox,
					v = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, e.height, b.xAxis, b.yAxis].join(),
					g = d[v],
					m = d[v + "m"];
				g || (a && (e.width = 0, k && (e.x = d.plotSizeX), d[v + "m"] = m = f.clipRect(k ? d.plotSizeX + 99 : -99, k ? -d.plotLeft : -d.plotTop, 99, k ? d.chartWidth : d.chartHeight)), d[v] = g = f.clipRect(e), g.count = {
					length: 0
				});
				a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
				!1 !== b.clip && (this.group.clip(a || c ? g : d.clipRect), this.markerGroup.clip(m), this.sharedClipKey = v);
				a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && v && d[v] && (c || (d[v] = d[v].destroy()), d[v + "m"] && (d[v + "m"] = d[v + "m"].destroy())))
			},
			animate: function(a) {
				var d = this.chart,
					b = D(this.options.animation),
					f;
				a ? this.setClip(b) : (f = this.sharedClipKey, (a = d[f]) && a.animate({
					width: d.plotSizeX,
					x: 0
				}, b), d[f + "m"] && d[f + "m"].animate({
					width: d.plotSizeX + 99,
					x: 0
				}, b), this.animate = null)
			},
			afterAnimate: function() {
				this.setClip();
				g(this, "afterAnimate");
				this.finishedAnimating = !0
			},
			drawPoints: function() {
				var a = this.points,
					d = this.chart,
					b, f, k, c, e = this.options.marker,
					g, m, h, r, x = this[this.specialGroup] || this.markerGroup,
					l = H(e.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * e.radius);
				if (!1 !== e.enabled || this._hasPointMarkers)
					for (f = 0; f < a.length; f++) k = a[f], b = k.plotY, c = k.graphic, g = k.marker || {}, m = !!k.marker, h = l && void 0 === g.enabled || g.enabled, r = k.isInside, h && w(b) && null !== k.y ? (b = H(g.symbol, this.symbol), k.hasImage = 0 === b.indexOf("url"), h = this.markerAttribs(k, k.selected && "select"), c ? c[r ? "show" : "hide"](!0).animate(h) : r && (0 < h.width || k.hasImage) && (k.graphic = c = d.renderer.symbol(b, h.x, h.y, h.width, h.height, m ? g : e).add(x)), c && c.attr(this.pointAttribs(k, k.selected && "select")), c && c.addClass(k.getClassName(), !0)) : c && (k.graphic = c.destroy())
			},
			markerAttribs: function(a, d) {
				var b = this.options.marker,
					f = a.marker || {},
					k = H(f.radius, b.radius);
				d && (b = b.states[d], d = f.states && f.states[d], k = H(d && d.radius, b && b.radius, k + (b && b.radiusPlus || 0)));
				a.hasImage && (k = 0);
				a = {
					x: Math.floor(a.plotX) - k,
					y: a.plotY - k
				};
				k && (a.width = a.height = 2 * k);
				return a
			},
			pointAttribs: function(a, d) {
				var b = this.options.marker,
					f = a && a.options,
					k = f && f.marker || {},
					c = this.color,
					e = f && f.color,
					g = a && a.color,
					f = H(k.lineWidth, b.lineWidth);
				a = a && a.zone && a.zone.color;
				c = e || a || g || c;
				a = k.fillColor || b.fillColor || c;
				c = k.lineColor || b.lineColor || c;
				d && (b = b.states[d], d = k.states && k.states[d] || {}, f = H(d.lineWidth, b.lineWidth, f + H(d.lineWidthPlus, b.lineWidthPlus, 0)), a = d.fillColor || b.fillColor || a, c = d.lineColor || b.lineColor || c);
				return {
					stroke: c,
					"stroke-width": f,
					fill: a
				}
			},
			destroy: function() {
				var a = this,
					d = a.chart,
					b = /AppleWebKit\/533/.test(J.navigator.userAgent),
					c, k, m = a.data || [],
					h, r;
				g(a, "destroy");
				A(a);
				B(a.axisTypes || [], function(d) {
					(r = a[d]) && r.series && (e(r.series, a), r.isDirty = r.forceRedraw = !0)
				});
				a.legendItem && a.chart.legend.destroyItem(a);
				for (k = m.length; k--;)(h = m[k]) && h.destroy && h.destroy();
				a.points = null;
				clearTimeout(a.animationTimeout);
				C(a, function(a, d) {
					a instanceof f && !a.survive && (c = b && "group" === d ? "hide" : "destroy", a[c]())
				});
				d.hoverSeries === a && (d.hoverSeries = null);
				e(d.series, a);
				d.orderSeries();
				C(a, function(d, b) {
					delete a[b]
				})
			},
			getGraphPath: function(a, d, b) {
				var f = this,
					k = f.options,
					c = k.step,
					n, e = [],
					g = [],
					m;
				a = a || f.points;
				(n = a.reversed) && a.reverse();
				(c = {
					right: 1,
					center: 2
				}[c] || c && 3) && n && (c = 4 - c);
				!k.connectNulls || d || b || (a = this.getValidPoints(a));
				B(a, function(n, h) {
					var v = n.plotX,
						r = n.plotY,
						x = a[h - 1];
					(n.leftCliff || x && x.rightCliff) && !b && (m = !0);
					n.isNull && !u(d) && 0 < h ? m = !k.connectNulls : n.isNull && !d ? m = !0 : (0 === h || m ? h = ["M", n.plotX, n.plotY] : f.getPointSpline ? h = f.getPointSpline(a, n, h) : c ? (h = 1 === c ? ["L", x.plotX, r] : 2 === c ? ["L", (x.plotX + v) / 2, x.plotY, "L", (x.plotX + v) / 2, r] : ["L", v, x.plotY], h.push("L", v, r)) : h = ["L", v, r], g.push(n.x), c && g.push(n.x), e.push.apply(e, h), m = !1)
				});
				e.xMap = g;
				return f.graphPath = e
			},
			drawGraph: function() {
				var a = this,
					d = this.options,
					b = (this.gappedPath || this.getGraphPath).call(this),
					f = [
						["graph", "highcharts-graph",
							d.lineColor || this.color, d.dashStyle
						]
					];
				B(this.zones, function(b, c) {
					f.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || a.color, b.dashStyle || d.dashStyle])
				});
				B(f, function(f, c) {
					var k = f[0],
						n = a[k];
					n ? (n.endX = b.xMap, n.animate({
						d: b
					})) : b.length && (a[k] = a.chart.renderer.path(b).addClass(f[1]).attr({
						zIndex: 1
					}).add(a.group), n = {
						stroke: f[2],
						"stroke-width": d.lineWidth,
						fill: a.fillGraph && a.color || "none"
					}, f[3] ? n.dashstyle = f[3] : "square" !== d.linecap && (n["stroke-linecap"] = n["stroke-linejoin"] = "round"), n = a[k].attr(n).shadow(2 > c && d.shadow));
					n && (n.startX = b.xMap, n.isArea = b.isArea)
				})
			},
			applyZones: function() {
				var a = this,
					d = this.chart,
					b = d.renderer,
					f = this.zones,
					k, c, e = this.clips || [],
					g, m = this.graph,
					h = this.area,
					r = Math.max(d.chartWidth, d.chartHeight),
					x = this[(this.zoneAxis || "y") + "Axis"],
					l, w, A = d.inverted,
					p, q, C, J, u = !1;
				f.length && (m || h) && x && void 0 !== x.min && (w = x.reversed, p = x.horiz, m && m.hide(), h && h.hide(), l = x.getExtremes(), B(f, function(f, n) {
					k = w ? p ? d.plotWidth : 0 : p ? 0 : x.toPixels(l.min);
					k = Math.min(Math.max(H(c, k), 0), r);
					c = Math.min(Math.max(Math.round(x.toPixels(H(f.value, l.max), !0)), 0), r);
					u && (k = c = x.toPixels(l.max));
					q = Math.abs(k - c);
					C = Math.min(k, c);
					J = Math.max(k, c);
					x.isXAxis ? (g = {
						x: A ? J : C,
						y: 0,
						width: q,
						height: r
					}, p || (g.x = d.plotHeight - g.x)) : (g = {
						x: 0,
						y: A ? J : C,
						width: r,
						height: q
					}, p && (g.y = d.plotWidth - g.y));
					A && b.isVML && (g = x.isXAxis ? {
						x: 0,
						y: w ? C : J,
						height: g.width,
						width: d.chartWidth
					} : {
						x: g.y - d.plotLeft - d.spacingBox.x,
						y: 0,
						width: g.height,
						height: d.chartHeight
					});
					e[n] ? e[n].animate(g) : (e[n] = b.clipRect(g), m && a["zone-graph-" + n].clip(e[n]), h && a["zone-area-" + n].clip(e[n]));
					u = f.value > l.max
				}), this.clips = e)
			},
			invertGroups: function(a) {
				function d() {
					B(["group", "markerGroup"], function(d) {
						b[d] && (f.renderer.isVML && b[d].attr({
							width: b.yAxis.len,
							height: b.xAxis.len
						}), b[d].width = b.yAxis.len, b[d].height = b.xAxis.len, b[d].invert(a))
					})
				}
				var b = this,
					f = b.chart,
					k;
				b.xAxis && (k = E(f, "resize", d), E(b, "destroy", k), d(a), b.invertGroups = d)
			},
			plotGroup: function(a, d, b, f, k) {
				var c = this[a],
					n = !c;
				n && (this[a] = c = this.chart.renderer.g().attr({
					zIndex: f || .1
				}).add(k));
				c.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (u(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (c.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
				c.attr({
					visibility: b
				})[n ? "attr" : "animate"](this.getPlotBox());
				return c
			},
			getPlotBox: function() {
				var a = this.chart,
					d = this.xAxis,
					b = this.yAxis;
				a.inverted && (d = b, b = this.xAxis);
				return {
					translateX: d ? d.left : a.plotLeft,
					translateY: b ? b.top : a.plotTop,
					scaleX: 1,
					scaleY: 1
				}
			},
			render: function() {
				var a = this,
					d = a.chart,
					b, f = a.options,
					k = !!a.animate && d.renderer.isSVG && D(f.animation).duration,
					c = a.visible ? "inherit" : "hidden",
					e = f.zIndex,
					g = a.hasRendered,
					m = d.seriesGroup,
					h = d.inverted;
				b = a.plotGroup("group", "series", c, e, m);
				a.markerGroup = a.plotGroup("markerGroup", "markers", c, e, m);
				k && a.animate(!0);
				b.inverted = a.isCartesian ? h : !1;
				a.drawGraph && (a.drawGraph(), a.applyZones());
				a.drawDataLabels && a.drawDataLabels();
				a.visible && a.drawPoints();
				a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
				a.invertGroups(h);
				!1 === f.clip || a.sharedClipKey || g || b.clip(d.clipRect);
				k && a.animate();
				g || (a.animationTimeout = x(function() {
					a.afterAnimate()
				}, k));
				a.isDirty = !1;
				a.hasRendered = !0
			},
			redraw: function() {
				var a = this.chart,
					d = this.isDirty || this.isDirtyData,
					b = this.group,
					f = this.xAxis,
					k = this.yAxis;
				b && (a.inverted && b.attr({
					width: a.plotWidth,
					height: a.plotHeight
				}), b.animate({
					translateX: H(f && f.left, a.plotLeft),
					translateY: H(k && k.top, a.plotTop)
				}));
				this.translate();
				this.render();
				d && delete this.kdTree
			},
			kdAxisArray: ["clientX", "plotY"],
			searchPoint: function(a, d) {
				var b = this.xAxis,
					f = this.yAxis,
					k = this.chart.inverted;
				return this.searchKDTree({
					clientX: k ? b.len - a.chartY + b.pos : a.chartX - b.pos,
					plotY: k ? f.len - a.chartX + f.pos : a.chartY - f.pos
				}, d)
			},
			buildKDTree: function() {
				function a(b, f, c) {
					var k, n;
					if (n = b && b.length) return k = d.kdAxisArray[f % c], b.sort(function(a, d) {
						return a[k] - d[k]
					}), n = Math.floor(n / 2), {
						point: b[n],
						left: a(b.slice(0, n), f + 1, c),
						right: a(b.slice(n + 1), f + 1, c)
					}
				}
				this.buildingKdTree = !0;
				var d = this,
					b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete d.kdTree;
				x(function() {
					d.kdTree = a(d.getValidPoints(null, !d.directTouch), b, b);
					d.buildingKdTree = !1
				}, d.options.kdNow ? 0 : 1)
			},
			searchKDTree: function(a, d) {
				function b(a, d, n, g) {
					var m = d.point,
						h = f.kdAxisArray[n % g],
						r, v, x = m;
					v = u(a[k]) && u(m[k]) ? Math.pow(a[k] - m[k], 2) : null;
					r = u(a[c]) && u(m[c]) ? Math.pow(a[c] - m[c], 2) : null;
					r = (v || 0) + (r || 0);
					m.dist = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
					m.distX = u(v) ? Math.sqrt(v) : Number.MAX_VALUE;
					h = a[h] - m[h];
					r = 0 > h ? "left" : "right";
					v = 0 > h ? "right" : "left";
					d[r] && (r = b(a, d[r], n + 1, g), x = r[e] < x[e] ? r : m);
					d[v] && Math.sqrt(h * h) < x[e] && (a = b(a, d[v], n + 1, g), x = a[e] < x[e] ? a : x);
					return x
				}
				var f = this,
					k = this.kdAxisArray[0],
					c = this.kdAxisArray[1],
					e = d ? "distX" : "dist";
				d = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				this.kdTree || this.buildingKdTree || this.buildKDTree();
				if (this.kdTree) return b(a, this.kdTree, d, d)
			}
		})
	})(L);
	(function(a) {
		var E = a.Axis,
			D = a.Chart,
			F = a.correctFloat,
			t = a.defined,
			l = a.destroyObjectProperties,
			p = a.each,
			z = a.format,
			q = a.objectEach,
			u = a.pick,
			B = a.Series;
		a.StackItem = function(a, h, g, c, b) {
			var e = a.chart.inverted;
			this.axis = a;
			this.isNegative = g;
			this.options = h;
			this.x = c;
			this.total = null;
			this.points = {};
			this.stack = b;
			this.rightCliff = this.leftCliff = 0;
			this.alignOptions = {
				align: h.align || (e ? g ? "left" : "right" : "center"),
				verticalAlign: h.verticalAlign || (e ? "middle" : g ? "bottom" : "top"),
				y: u(h.y, e ? 4 : g ? 14 : -6),
				x: u(h.x, e ? g ? -6 : 6 : 0)
			};
			this.textAlign = h.textAlign || (e ? g ? "right" : "left" : "center")
		};
		a.StackItem.prototype = {
			destroy: function() {
				l(this, this.axis)
			},
			render: function(a) {
				var e = this.options,
					g = e.format,
					g = g ? z(g, this) : e.formatter.call(this);
				this.label ? this.label.attr({
					text: g,
					visibility: "hidden"
				}) : this.label = this.axis.chart.renderer.text(g, null, null, e.useHTML).css(e.style).attr({
					align: this.textAlign,
					rotation: e.rotation,
					visibility: "hidden"
				}).add(a)
			},
			setOffset: function(a, h) {
				var e = this.axis,
					c = e.chart,
					b = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
					e = e.translate(0),
					e = Math.abs(b - e);
				a = c.xAxis[0].translate(this.x) + a;
				b = this.getStackBox(c, this, a, b, h, e);
				if (h = this.label) h.align(this.alignOptions, null, b), b = h.alignAttr, h[!1 === this.options.crop || c.isInsidePlot(b.x, b.y) ? "show" : "hide"](!0)
			},
			getStackBox: function(a, h, g, c, b, l) {
				var e = h.axis.reversed,
					r = a.inverted;
				a = a.plotHeight;
				h = h.isNegative && !e || !h.isNegative && e;
				return {
					x: r ? h ? c : c - l : g,
					y: r ? a - g - b : h ? a - c - l : a - c,
					width: r ? l : b,
					height: r ? b : l
				}
			}
		};
		D.prototype.getStacks = function() {
			var a = this;
			p(a.yAxis, function(a) {
				a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
			});
			p(a.series, function(e) {
				!e.options.stacking || !0 !== e.visible && !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + u(e.options.stack, ""))
			})
		};
		E.prototype.buildStacks = function() {
			var a = this.series,
				h = u(this.options.reversedStacks, !0),
				g = a.length,
				c;
			if (!this.isXAxis) {
				this.usePercentage = !1;
				for (c = g; c--;) a[h ? c : g - c - 1].setStackedPoints();
				for (c = 0; c < g; c++) a[c].modifyStacks()
			}
		};
		E.prototype.renderStackTotals = function() {
			var a = this.chart,
				h = a.renderer,
				g = this.stacks,
				c = this.stackTotalGroup;
			c || (this.stackTotalGroup = c = h.g("stack-labels").attr({
				visibility: "visible",
				zIndex: 6
			}).add());
			c.translate(a.plotLeft, a.plotTop);
			q(g, function(a) {
				q(a, function(a) {
					a.render(c)
				})
			})
		};
		E.prototype.resetStacks = function() {
			var a = this,
				h = a.stacks;
			a.isXAxis || q(h, function(e) {
				q(e, function(c, b) {
					c.touched < a.stacksTouched ? (c.destroy(), delete e[b]) : (c.total = null, c.cum = null)
				})
			})
		};
		E.prototype.cleanStacks = function() {
			var a;
			this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), q(a, function(a) {
				q(a, function(a) {
					a.cum = a.total
				})
			}))
		};
		B.prototype.setStackedPoints = function() {
			if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var e = this.processedXData,
					h = this.processedYData,
					g = [],
					c = h.length,
					b = this.options,
					l = b.threshold,
					m = b.startFromThreshold ? l : 0,
					r = b.stack,
					b = b.stacking,
					p = this.stackKey,
					q = "-" + p,
					A = this.negStacks,
					K = this.yAxis,
					f = K.stacks,
					x = K.oldStacks,
					J, v, d, n, G, k, y;
				K.stacksTouched += 1;
				for (G = 0; G < c; G++) k = e[G], y = h[G], J = this.getStackIndicator(J, k, this.index), n = J.key, d = (v = A && y < (m ? 0 : l)) ? q : p, f[d] || (f[d] = {}), f[d][k] || (x[d] && x[d][k] ? (f[d][k] = x[d][k], f[d][k].total = null) : f[d][k] = new a.StackItem(K, K.options.stackLabels, v, k, r)), d = f[d][k], null !== y && (d.points[n] = d.points[this.index] = [u(d.cum, m)], t(d.cum) || (d.base = n), d.touched = K.stacksTouched, 0 < J.index && !1 === this.singleStacks && (d.points[n][0] = d.points[this.index + "," + k + ",0"][0])), "percent" === b ? (v = v ? p : q, A && f[v] && f[v][k] ? (v = f[v][k], d.total = v.total = Math.max(v.total, d.total) + Math.abs(y) || 0) : d.total = F(d.total + (Math.abs(y) || 0))) : d.total = F(d.total + (y || 0)), d.cum = u(d.cum, m) + (y || 0), null !== y && (d.points[n].push(d.cum), g[G] = d.cum);
				"percent" === b && (K.usePercentage = !0);
				this.stackedYData = g;
				K.oldStacks = {}
			}
		};
		B.prototype.modifyStacks = function() {
			var a = this,
				h = a.stackKey,
				g = a.yAxis.stacks,
				c = a.processedXData,
				b, l = a.options.stacking;
			a[l + "Stacker"] && p([h, "-" + h], function(e) {
				for (var m = c.length, h, w; m--;)
					if (h = c[m], b = a.getStackIndicator(b, h, a.index, e), w = (h = g[e] && g[e][h]) && h.points[b.key]) a[l + "Stacker"](w, h, m)
			})
		};
		B.prototype.percentStacker = function(a, h, g) {
			h = h.total ? 100 / h.total : 0;
			a[0] = F(a[0] * h);
			a[1] = F(a[1] * h);
			this.stackedYData[g] = a[1]
		};
		B.prototype.getStackIndicator = function(a, h, g, c) {
			!t(a) || a.x !== h || c && a.key !== c ? a = {
				x: h,
				index: 0,
				key: c
			} : a.index++;
			a.key = [g, h, a.index].join();
			return a
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.animate,
			F = a.Axis,
			t = a.createElement,
			l = a.css,
			p = a.defined,
			z = a.each,
			q = a.erase,
			u = a.extend,
			B = a.fireEvent,
			e = a.inArray,
			h = a.isNumber,
			g = a.isObject,
			c = a.isArray,
			b = a.merge,
			w = a.objectEach,
			m = a.pick,
			r = a.Point,
			C = a.Series,
			H = a.seriesTypes,
			A = a.setAnimation,
			K = a.splat;
		u(a.Chart.prototype, {
			addSeries: function(a, b, c) {
				var f, d = this;
				a && (b = m(b, !0), B(d, "addSeries", {
					options: a
				}, function() {
					f = d.initSeries(a);
					d.isDirtyLegend = !0;
					d.linkSeries();
					b && d.redraw(c)
				}));
				return f
			},
			addAxis: function(a, c, e, g) {
				var d = c ? "xAxis" : "yAxis",
					f = this.options;
				a = b(a, {
					index: this[d].length,
					isX: c
				});
				c = new F(this, a);
				f[d] = K(f[d] || {});
				f[d].push(a);
				m(e, !0) && this.redraw(g);
				return c
			},
			showLoading: function(a) {
				var b = this,
					f = b.options,
					c = b.loadingDiv,
					d = f.loading,
					n = function() {
						c && l(c, {
							left: b.plotLeft + "px",
							top: b.plotTop + "px",
							width: b.plotWidth + "px",
							height: b.plotHeight + "px"
						})
					};
				c || (b.loadingDiv = c = t("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, b.container), b.loadingSpan = t("span", {
					className: "highcharts-loading-inner"
				}, null, c), E(b, "redraw", n));
				c.className = "highcharts-loading";
				b.loadingSpan.innerHTML = a || f.lang.loading;
				l(c, u(d.style, {
					zIndex: 10
				}));
				l(b.loadingSpan, d.labelStyle);
				b.loadingShown || (l(c, {
					opacity: 0,
					display: ""
				}), D(c, {
					opacity: d.style.opacity || .5
				}, {
					duration: d.showDuration || 0
				}));
				b.loadingShown = !0;
				n()
			},
			hideLoading: function() {
				var a = this.options,
					b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden", D(b, {
					opacity: 0
				}, {
					duration: a.loading.hideDuration || 100,
					complete: function() {
						l(b, {
							display: "none"
						})
					}
				}));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
			update: function(a, c, g) {
				var f = this,
					d = {
						credits: "addCredits",
						title: "setTitle",
						subtitle: "setSubtitle"
					},
					n = a.chart,
					r, k, x = [];
				if (n) {
					b(!0, f.options.chart, n);
					"className" in n && f.setClassName(n.className);
					if ("inverted" in n || "polar" in n) f.propFromSeries(), r = !0;
					"alignTicks" in n && (r = !0);
					w(n, function(a, d) {
						-1 !== e("chart." + d, f.propsRequireUpdateSeries) && (k = !0); - 1 !== e(d, f.propsRequireDirtyBox) && (f.isDirtyBox = !0)
					});
					"style" in n && f.renderer.setStyle(n.style)
				}
				a.colors && (this.options.colors = a.colors);
				a.plotOptions && b(!0, this.options.plotOptions, a.plotOptions);
				w(a, function(a, b) {
					if (f[b] && "function" === typeof f[b].update) f[b].update(a, !1);
					else if ("function" === typeof f[d[b]]) f[d[b]](a);
					"chart" !== b && -1 !== e(b, f.propsRequireUpdateSeries) && (k = !0)
				});
				z("xAxis yAxis zAxis series colorAxis pane".split(" "), function(d) {
					a[d] && (z(K(a[d]), function(a, b) {
						(b = p(a.id) && f.get(a.id) || f[d][b]) && b.coll === d && (b.update(a, !1), g && (b.touched = !0));
						if (!b && g)
							if ("series" === d) f.addSeries(a, !1).touched = !0;
							else if ("xAxis" === d || "yAxis" === d) f.addAxis(a, "xAxis" === d, !1).touched = !0
					}), g && z(f[d], function(a) {
						a.touched ? delete a.touched : x.push(a)
					}))
				});
				z(x, function(a) {
					a.remove(!1)
				});
				r && z(f.axes, function(a) {
					a.update({}, !1)
				});
				k && z(f.series, function(a) {
					a.update({}, !1)
				});
				a.loading && b(!0, f.options.loading, a.loading);
				r = n && n.width;
				n = n && n.height;
				h(r) && r !== f.chartWidth || h(n) && n !== f.chartHeight ? f.setSize(r, n) : m(c, !0) && f.redraw()
			},
			setSubtitle: function(a) {
				this.setTitle(void 0, a)
			}
		});
		u(r.prototype, {
			update: function(a, b, c, e) {
				function d() {
					f.applyOptions(a);
					null === f.y && k && (f.graphic = k.destroy());
					g(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = k.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.connector && (f.connector = f.connector.destroy()));
					r = f.index;
					h.updateParallelArrays(f, r);
					x.data[r] = g(x.data[r], !0) || g(a, !0) ? f.options : a;
					h.isDirty = h.isDirtyData = !0;
					!h.fixedBox && h.hasCartesianSeries && (v.isDirtyBox = !0);
					"point" === x.legendType && (v.isDirtyLegend = !0);
					b && v.redraw(c)
				}
				var f = this,
					h = f.series,
					k = f.graphic,
					r, v = h.chart,
					x = h.options;
				b = m(b, !0);
				!1 === e ? d() : f.firePointEvent("update", {
					options: a
				}, d)
			},
			remove: function(a, b) {
				this.series.removePoint(e(this, this.series.data), a, b)
			}
		});
		u(C.prototype, {
			addPoint: function(a, b, c, e) {
				var d = this.options,
					f = this.data,
					g = this.chart,
					k = this.xAxis,
					k = k && k.hasNames && k.names,
					h = d.data,
					r, v, x = this.xData,
					l, w;
				b = m(b, !0);
				r = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(r, [a]);
				w = r.x;
				l = x.length;
				if (this.requireSorting && w < x[l - 1])
					for (v = !0; l && x[l - 1] > w;) l--;
				this.updateParallelArrays(r, "splice", l, 0, 0);
				this.updateParallelArrays(r, l);
				k && r.name && (k[w] = r.name);
				h.splice(l, 0, a);
				v && (this.data.splice(l, 0, null), this.processData());
				"point" === d.legendType && this.generatePoints();
				c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(r, "shift"), h.shift()));
				this.isDirtyData = this.isDirty = !0;
				b && g.redraw(e)
			},
			removePoint: function(a, b, c) {
				var f = this,
					d = f.data,
					n = d[a],
					e = f.points,
					k = f.chart,
					g = function() {
						e && e.length === d.length && e.splice(a, 1);
						d.splice(a, 1);
						f.options.data.splice(a, 1);
						f.updateParallelArrays(n || {
							series: f
						}, "splice", a, 1);
						n && n.destroy();
						f.isDirty = !0;
						f.isDirtyData = !0;
						b && k.redraw()
					};
				A(c, k);
				b = m(b, !0);
				n ? n.firePointEvent("remove", null, g) : g()
			},
			remove: function(a, b, c) {
				function f() {
					d.destroy();
					n.isDirtyLegend = n.isDirtyBox = !0;
					n.linkSeries();
					m(a, !0) && n.redraw(b)
				}
				var d = this,
					n = d.chart;
				!1 !== c ? B(d, "remove", null, f) : f()
			},
			update: function(a, c) {
				var f = this,
					e = f.chart,
					d = f.userOptions,
					n = f.oldType || f.type,
					g = a.type || d.type || e.options.chart.type,
					k = H[n].prototype,
					h, r = ["group", "markerGroup", "dataLabelsGroup"],
					l = ["navigatorSeries", "baseSeries"],
					x = f.finishedAnimating && {
						animation: !1
					};
				if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, c);
				if (g && g !== n || void 0 !== a.zIndex) r.length = 0;
				f.options.isInternal && (l.length = 0);
				l = r.concat(l);
				z(l, function(a) {
					l[a] = f[a];
					delete f[a]
				});
				a = b(d, x, {
					index: f.index,
					pointStart: f.xData[0]
				}, {
					data: f.options.data
				}, a);
				f.remove(!1, null, !1);
				for (h in k) f[h] = void 0;
				u(f, H[g || n].prototype);
				z(l, function(a) {
					f[a] = l[a]
				});
				f.init(e, a);
				f.oldType = n;
				e.linkSeries();
				m(c, !0) && e.redraw(!1)
			}
		});
		u(F.prototype, {
			update: function(a, c) {
				var f = this.chart;
				a = f.options[this.coll][this.options.index] = b(this.userOptions, a);
				this.destroy(!0);
				this.init(f, u(a, {
					events: void 0
				}));
				f.isDirtyBox = !0;
				m(c, !0) && f.redraw()
			},
			remove: function(a) {
				for (var b = this.chart, f = this.coll, e = this.series, d = e.length; d--;) e[d] && e[d].remove(!1);
				q(b.axes, this);
				q(b[f], this);
				c(b.options[f]) ? b.options[f].splice(this.options.index, 1) : delete b.options[f];
				z(b[f], function(a, d) {
					a.options.index = d
				});
				this.destroy();
				b.isDirtyBox = !0;
				m(a, !0) && b.redraw()
			},
			setTitle: function(a, b) {
				this.update({
					title: a
				}, b)
			},
			setCategories: function(a, b) {
				this.update({
					categories: a
				}, b)
			}
		})
	})(L);
	(function(a) {
		var E = a.color,
			D = a.each,
			F = a.map,
			t = a.pick,
			l = a.Series,
			p = a.seriesType;
		p("area", "line", {
			softThreshold: !1,
			threshold: 0
		}, {
			singleStacks: !1,
			getStackPoints: function(l) {
				var p = [],
					u = [],
					z = this.xAxis,
					e = this.yAxis,
					h = e.stacks[this.stackKey],
					g = {},
					c = this.index,
					b = e.series,
					w = b.length,
					m, r = t(e.options.reversedStacks, !0) ? 1 : -1,
					C;
				l = l || this.points;
				if (this.options.stacking) {
					for (C = 0; C < l.length; C++) g[l[C].x] = l[C];
					a.objectEach(h, function(a, b) {
						null !== a.total && u.push(b)
					});
					u.sort(function(a, b) {
						return a - b
					});
					m = F(b, function() {
						return this.visible
					});
					D(u, function(a, b) {
						var l = 0,
							f, x;
						if (g[a] && !g[a].isNull) p.push(g[a]), D([-1, 1], function(e) {
							var l = 1 === e ? "rightNull" : "leftNull",
								d = 0,
								n = h[u[b + e]];
							if (n)
								for (C = c; 0 <= C && C < w;) f = n.points[C], f || (C === c ? g[a][l] = !0 : m[C] && (x = h[a].points[C]) && (d -= x[1] - x[0])), C += r;
							g[a][1 === e ? "rightCliff" : "leftCliff"] = d
						});
						else {
							for (C = c; 0 <= C && C < w;) {
								if (f = h[a].points[C]) {
									l = f[1];
									break
								}
								C += r
							}
							l = e.translate(l, 0, 1, 0, 1);
							p.push({
								isNull: !0,
								plotX: z.translate(a, 0, 0, 0, 1),
								x: a,
								plotY: l,
								yBottom: l
							})
						}
					})
				}
				return p
			},
			getGraphPath: function(a) {
				var p = l.prototype.getGraphPath,
					u = this.options,
					z = u.stacking,
					e = this.yAxis,
					h, g, c = [],
					b = [],
					w = this.index,
					m, r = e.stacks[this.stackKey],
					C = u.threshold,
					H = e.getThreshold(u.threshold),
					A, u = u.connectNulls || "percent" === z,
					K = function(f, g, h) {
						var l = a[f];
						f = z && r[l.x].points[w];
						var d = l[h + "Null"] || 0;
						h = l[h + "Cliff"] || 0;
						var n, x,
							l = !0;
						h || d ? (n = (d ? f[0] : f[1]) + h, x = f[0] + h, l = !!d) : !z && a[g] && a[g].isNull && (n = x = C);
						void 0 !== n && (b.push({
							plotX: m,
							plotY: null === n ? H : e.getThreshold(n),
							isNull: l,
							isCliff: !0
						}), c.push({
							plotX: m,
							plotY: null === x ? H : e.getThreshold(x),
							doCurve: !1
						}))
					};
				a = a || this.points;
				z && (a = this.getStackPoints(a));
				for (h = 0; h < a.length; h++)
					if (g = a[h].isNull, m = t(a[h].rectPlotX, a[h].plotX), A = t(a[h].yBottom, H), !g || u) u || K(h, h - 1, "left"), g && !z && u || (b.push(a[h]), c.push({
						x: h,
						plotX: m,
						plotY: A
					})), u || K(h, h + 1, "right");
				h = p.call(this, b, !0, !0);
				c.reversed = !0;
				g = p.call(this, c, !0, !0);
				g.length && (g[0] = "L");
				g = h.concat(g);
				p = p.call(this, b, !1, u);
				g.xMap = h.xMap;
				this.areaPath = g;
				return p
			},
			drawGraph: function() {
				this.areaPath = [];
				l.prototype.drawGraph.apply(this);
				var a = this,
					p = this.areaPath,
					u = this.options,
					B = [
						["area", "highcharts-area", this.color, u.fillColor]
					];
				D(this.zones, function(e, h) {
					B.push(["zone-area-" + h, "highcharts-area highcharts-zone-area-" + h + " " + e.className, e.color || a.color, e.fillColor || u.fillColor])
				});
				D(B, function(e) {
					var h = e[0],
						g = a[h];
					g ? (g.endX = p.xMap, g.animate({
						d: p
					})) : (g = a[h] = a.chart.renderer.path(p).addClass(e[1]).attr({
						fill: t(e[3], E(e[2]).setOpacity(t(u.fillOpacity, .75)).get()),
						zIndex: 0
					}).add(a.group), g.isArea = !0);
					g.startX = p.xMap;
					g.shiftUnit = u.step ? 2 : 1
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	})(L);
	(function(a) {
		var E = a.pick;
		a = a.seriesType;
		a("spline", "line", {}, {
			getPointSpline: function(a, F, t) {
				var l = F.plotX,
					p = F.plotY,
					z = a[t - 1];
				t = a[t + 1];
				var q, u, B, e;
				if (z && !z.isNull && !1 !== z.doCurve && !F.isCliff && t && !t.isNull && !1 !== t.doCurve && !F.isCliff) {
					a = z.plotY;
					B = t.plotX;
					t = t.plotY;
					var h = 0;
					q = (1.5 * l + z.plotX) / 2.5;
					u = (1.5 * p + a) / 2.5;
					B = (1.5 * l + B) / 2.5;
					e = (1.5 * p + t) / 2.5;
					B !== q && (h = (e - u) * (B - l) / (B - q) + p - e);
					u += h;
					e += h;
					u > a && u > p ? (u = Math.max(a, p), e = 2 * p - u) : u < a && u < p && (u = Math.min(a, p), e = 2 * p - u);
					e > t && e > p ? (e = Math.max(t, p), u = 2 * p - e) : e < t && e < p && (e = Math.min(t, p), u = 2 * p - e);
					F.rightContX = B;
					F.rightContY = e
				}
				F = ["C", E(z.rightContX, z.plotX), E(z.rightContY, z.plotY), E(q, l), E(u, p), l, p];
				z.rightContX = z.rightContY = null;
				return F
			}
		})
	})(L);
	(function(a) {
		var E = a.seriesTypes.area.prototype,
			D = a.seriesType;
		D("areaspline", "spline", a.defaultPlotOptions.area, {
			getStackPoints: E.getStackPoints,
			getGraphPath: E.getGraphPath,
			drawGraph: E.drawGraph,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	})(L);
	(function(a) {
		var E = a.animObject,
			D = a.color,
			F = a.each,
			t = a.extend,
			l = a.isNumber,
			p = a.merge,
			z = a.pick,
			q = a.Series,
			u = a.seriesType,
			B = a.svg;
		u("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1,
					shadow: !1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000",
					shadow: !1
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function() {
				q.prototype.init.apply(this, arguments);
				var a = this,
					h = a.chart;
				h.hasRendered && F(h.series, function(e) {
					e.type === a.type && (e.isDirty = !0)
				})
			},
			getColumnMetrics: function() {
				var a = this,
					h = a.options,
					g = a.xAxis,
					c = a.yAxis,
					b = g.reversed,
					l, m = {},
					r = 0;
				!1 === h.grouping ? r = 1 : F(a.chart.series, function(b) {
					var f = b.options,
						e = b.yAxis,
						g;
					b.type !== a.type || !b.visible && a.chart.options.chart.ignoreHiddenSeries || c.len !== e.len || c.pos !== e.pos || (f.stacking ? (l = b.stackKey, void 0 === m[l] && (m[l] = r++), g = m[l]) : !1 !== f.grouping && (g = r++), b.columnIndex = g)
				});
				var p = Math.min(Math.abs(g.transA) * (g.ordinalSlope || h.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
					q = p * h.groupPadding,
					A = (p - 2 * q) / (r || 1),
					h = Math.min(h.maxPointWidth || g.len, z(h.pointWidth, A * (1 - 2 * h.pointPadding)));
				a.columnMetrics = {
					width: h,
					offset: (A - h) / 2 + (q + ((a.columnIndex || 0) + (b ? 1 : 0)) * A - p / 2) * (b ? -1 : 1)
				};
				return a.columnMetrics
			},
			crispCol: function(a, h, g, c) {
				var b = this.chart,
					e = this.borderWidth,
					m = -(e % 2 ? .5 : 0),
					e = e % 2 ? .5 : 1;
				b.inverted && b.renderer.isVML && (e += 1);
				this.options.crisp && (g = Math.round(a + g) + m, a = Math.round(a) + m, g -= a);
				c = Math.round(h + c) + e;
				m = .5 >= Math.abs(h) && .5 < c;
				h = Math.round(h) + e;
				c -= h;
				m && c && (--h, c += 1);
				return {
					x: a,
					y: h,
					width: g,
					height: c
				}
			},
			translate: function() {
				var a = this,
					h = a.chart,
					g = a.options,
					c = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
					c = a.borderWidth = z(g.borderWidth, c ? 0 : 1),
					b = a.yAxis,
					l = a.translatedThreshold = b.getThreshold(g.threshold),
					m = z(g.minPointLength, 5),
					r = a.getColumnMetrics(),
					p = r.width,
					u = a.barW = Math.max(p, 1 + 2 * c),
					A = a.pointXOffset = r.offset;
				h.inverted && (l -= .5);
				g.pointPadding && (u = Math.ceil(u));
				q.prototype.translate.apply(a);
				F(a.points, function(c) {
					var f = z(c.yBottom, l),
						e = 999 + Math.abs(f),
						e = Math.min(Math.max(-e, c.plotY), b.len + e),
						g = c.plotX + A,
						r = u,
						d = Math.min(e, f),
						n, w = Math.max(e, f) - d;
					m && Math.abs(w) < m && (w = m, n = !b.reversed && !c.negative || b.reversed && c.negative, 0 === c.y && 0 >= a.dataMax && (n = !n), d = Math.abs(d - l) > m ? f - m : l - (n ? m : 0));
					c.barX = g;
					c.pointWidth = p;
					c.tooltipPos = h.inverted ? [b.len + b.pos - h.plotLeft - e, a.xAxis.len - g - r / 2, w] : [g + r / 2, e + b.pos - h.plotTop, w];
					c.shapeType = "rect";
					c.shapeArgs = a.crispCol.apply(a, c.isNull ? [g, l, r, 0] : [g, d, r, w])
				})
			},
			getSymbol: a.noop,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			drawGraph: function() {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function(a, h) {
				var e = this.options,
					c, b = this.pointAttrToOptions || {};
				c = b.stroke || "borderColor";
				var l = b["stroke-width"] || "borderWidth",
					m = a && a.color || this.color,
					r = a && a[c] || e[c] || this.color || m,
					q = a && a[l] || e[l] || this[l] || 0,
					b = e.dashStyle;
				a && this.zones.length && (m = a.getZone(), m = a.options.color || m && m.color || this.color);
				h && (a = p(e.states[h], a.options.states && a.options.states[h] || {}), h = a.brightness, m = a.color || void 0 !== h && D(m).brighten(a.brightness).get() || m, r = a[c] || r, q = a[l] || q, b = a.dashStyle || b);
				c = {
					fill: m,
					stroke: r,
					"stroke-width": q
				};
				b && (c.dashstyle = b);
				return c
			},
			drawPoints: function() {
				var a = this,
					h = this.chart,
					g = a.options,
					c = h.renderer,
					b = g.animationLimit || 250,
					w;
				F(a.points, function(e) {
					var m = e.graphic;
					if (l(e.plotY) && null !== e.y) {
						w = e.shapeArgs;
						if (m) m[h.pointCount < b ? "animate" : "attr"](p(w));
						else e.graphic = m = c[e.shapeType](w).add(e.group || a.group);
						g.borderRadius && m.attr({
							r: g.borderRadius
						});
						m.attr(a.pointAttribs(e, e.selected && "select")).shadow(g.shadow, null, g.stacking && !g.borderRadius);
						m.addClass(e.getClassName(), !0)
					} else m && (e.graphic = m.destroy())
				})
			},
			animate: function(a) {
				var e = this,
					g = this.yAxis,
					c = e.options,
					b = this.chart.inverted,
					l = {},
					m = b ? "translateX" : "translateY",
					r;
				B && (a ? (l.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(c.threshold))), b ? l.translateX = a - g.len : l.translateY = a, e.group.attr(l)) : (r = e.group.attr(m), e.group.animate({
					scaleY: 1
				}, t(E(e.options.animation), {
					step: function(a, b) {
						l[m] = r + b.pos * (g.pos - r);
						e.group.attr(l)
					}
				})), e.animate = null))
			},
			remove: function() {
				var a = this,
					h = a.chart;
				h.hasRendered && F(h.series, function(e) {
					e.type === a.type && (e.isDirty = !0)
				});
				q.prototype.remove.apply(a, arguments)
			}
		})
	})(L);
	(function(a) {
		a = a.seriesType;
		a("bar", "column", null, {
			inverted: !0
		})
	})(L);
	(function(a) {
		var E = a.Series;
		a = a.seriesType;
		a("scatter", "line", {
			lineWidth: 0,
			findNearestPointBy: "xy",
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
			}
		}, {
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			drawGraph: function() {
				this.options.lineWidth && E.prototype.drawGraph.call(this)
			}
		})
	})(L);
	(function(a) {
		var E = a.deg2rad,
			D = a.isNumber,
			F = a.pick,
			t = a.relativeLength;
		a.CenteredSeriesMixin = {
			getCenter: function() {
				var a = this.options,
					p = this.chart,
					z = 2 * (a.slicedOffset || 0),
					q = p.plotWidth - 2 * z,
					p = p.plotHeight - 2 * z,
					u = a.center,
					u = [F(u[0], "50%"), F(u[1], "50%"), a.size || "100%", a.innerSize || 0],
					B = Math.min(q, p),
					e, h;
				for (e = 0; 4 > e; ++e) h = u[e], a = 2 > e || 2 === e && /%$/.test(h), u[e] = t(h, [q, p, B, u[2]][e]) + (a ? z : 0);
				u[3] > u[2] && (u[3] = u[2]);
				return u
			},
			getStartAndEndRadians: function(a, p) {
				a = D(a) ? a : 0;
				p = D(p) && p > a && 360 > p - a ? p : a + 360;
				return {
					start: E * (a + -90),
					end: E * (p + -90)
				}
			}
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.CenteredSeriesMixin,
			F = a.defined,
			t = a.each,
			l = a.extend,
			p = D.getStartAndEndRadians,
			z = a.inArray,
			q = a.noop,
			u = a.pick,
			B = a.Point,
			e = a.Series,
			h = a.seriesType,
			g = a.setAnimation;
		h("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				distance: 30,
				enabled: !0,
				formatter: function() {
					return this.point.isNull ? void 0 : this.point.name
				},
				x: 0
			},
			ignoreHiddenPoint: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			states: {
				hover: {
					brightness: .1,
					shadow: !1
				}
			}
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
			animate: function(a) {
				var b = this,
					c = b.points,
					e = b.startAngleRad;
				a || (t(c, function(a) {
					var c = a.graphic,
						g = a.shapeArgs;
					c && (c.attr({
						r: a.startR || b.center[3] / 2,
						start: e,
						end: e
					}), c.animate({
						r: g.r,
						start: g.start,
						end: g.end
					}, b.options.animation))
				}), b.animate = null)
			},
			updateTotals: function() {
				var a, b = 0,
					e = this.points,
					g = e.length,
					h, l = this.options.ignoreHiddenPoint;
				for (a = 0; a < g; a++) h = e[a], b += l && !h.visible ? 0 : h.isNull ? 0 : h.y;
				this.total = b;
				for (a = 0; a < g; a++) h = e[a], h.percentage = 0 < b && (h.visible || !l) ? h.y / b * 100 : 0, h.total = b
			},
			generatePoints: function() {
				e.prototype.generatePoints.call(this);
				this.updateTotals()
			},
			translate: function(a) {
				this.generatePoints();
				var b = 0,
					c = this.options,
					e = c.slicedOffset,
					g = e + (c.borderWidth || 0),
					h, l, A, q = p(c.startAngle, c.endAngle),
					f = this.startAngleRad = q.start,
					q = (this.endAngleRad = q.end) - f,
					x = this.points,
					t, v = c.dataLabels.distance,
					c = c.ignoreHiddenPoint,
					d, n = x.length,
					G;
				a || (this.center = a = this.getCenter());
				this.getX = function(d, b, f) {
					A = Math.asin(Math.min((d - a[1]) / (a[2] / 2 + f.labelDistance), 1));
					return a[0] + (b ? -1 : 1) * Math.cos(A) * (a[2] / 2 + f.labelDistance)
				};
				for (d = 0; d < n; d++) {
					G = x[d];
					G.labelDistance = u(G.options.dataLabels && G.options.dataLabels.distance, v);
					this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, G.labelDistance);
					h = f + b * q;
					if (!c || G.visible) b += G.percentage / 100;
					l = f + b * q;
					G.shapeType = "arc";
					G.shapeArgs = {
						x: a[0],
						y: a[1],
						r: a[2] / 2,
						innerR: a[3] / 2,
						start: Math.round(1E3 * h) / 1E3,
						end: Math.round(1E3 * l) / 1E3
					};
					A = (l + h) / 2;
					A > 1.5 * Math.PI ? A -= 2 * Math.PI : A < -Math.PI / 2 && (A += 2 * Math.PI);
					G.slicedTranslation = {
						translateX: Math.round(Math.cos(A) * e),
						translateY: Math.round(Math.sin(A) * e)
					};
					l = Math.cos(A) * a[2] / 2;
					t = Math.sin(A) * a[2] / 2;
					G.tooltipPos = [a[0] + .7 * l, a[1] + .7 * t];
					G.half = A < -Math.PI / 2 || A > Math.PI / 2 ? 1 : 0;
					G.angle = A;
					h = Math.min(g, G.labelDistance / 5);
					G.labelPos = [a[0] + l + Math.cos(A) * G.labelDistance, a[1] + t + Math.sin(A) * G.labelDistance, a[0] + l + Math.cos(A) * h, a[1] + t + Math.sin(A) * h, a[0] + l, a[1] + t, 0 > G.labelDistance ? "center" : G.half ? "right" : "left", A]
				}
			},
			drawGraph: null,
			drawPoints: function() {
				var a = this,
					b = a.chart.renderer,
					e, g, h, p, q = a.options.shadow;
				q && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group));
				t(a.points, function(c) {
					g = c.graphic;
					if (c.isNull) g && (c.graphic = g.destroy());
					else {
						p = c.shapeArgs;
						e = c.getTranslate();
						var m = c.shadowGroup;
						q && !m && (m = c.shadowGroup = b.g("shadow").add(a.shadowGroup));
						m && m.attr(e);
						h = a.pointAttribs(c, c.selected && "select");
						g ? g.setRadialReference(a.center).attr(h).animate(l(p, e)) : (c.graphic = g = b[c.shapeType](p).setRadialReference(a.center).attr(e).add(a.group), c.visible || g.attr({
							visibility: "hidden"
						}), g.attr(h).attr({
							"stroke-linejoin": "round"
						}).shadow(q, m));
						g.addClass(c.getClassName())
					}
				})
			},
			searchPoint: q,
			sortByAngle: function(a, b) {
				a.sort(function(a, c) {
					return void 0 !== a.angle && (c.angle - a.angle) * b
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			getCenter: D.getCenter,
			getSymbol: q
		}, {
			init: function() {
				B.prototype.init.apply(this, arguments);
				var a = this,
					b;
				a.name = u(a.name, "Slice");
				b = function(b) {
					a.slice("select" === b.type)
				};
				E(a, "select", b);
				E(a, "unselect", b);
				return a
			},
			isValid: function() {
				return a.isNumber(this.y, !0) && 0 <= this.y
			},
			setVisible: function(a, b) {
				var c = this,
					e = c.series,
					g = e.chart,
					h = e.options.ignoreHiddenPoint;
				b = u(b, h);
				a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible : a, e.options.data[z(c, e.data)] = c.options, t(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
					if (c[b]) c[b][a ? "show" : "hide"](!0)
				}), c.legendItem && g.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), h && (e.isDirty = !0), b && g.redraw())
			},
			slice: function(a, b, e) {
				var c = this.series;
				g(e, c.chart);
				u(b, !0);
				this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
				c.options.data[z(this, c.data)] = this.options;
				this.graphic.animate(this.getTranslate());
				this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
			},
			getTranslate: function() {
				return this.sliced ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}
			},
			haloPath: function(a) {
				var b = this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
					innerR: this.shapeArgs.r,
					start: b.start,
					end: b.end
				})
			}
		})
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.arrayMax,
			F = a.defined,
			t = a.each,
			l = a.extend,
			p = a.format,
			z = a.map,
			q = a.merge,
			u = a.noop,
			B = a.pick,
			e = a.relativeLength,
			h = a.Series,
			g = a.seriesTypes,
			c = a.stableSort;
		a.distribute = function(a, e) {
			function b(a, b) {
				return a.target - b.target
			}
			var g, h = !0,
				l = a,
				p = [],
				w;
			w = 0;
			for (g = a.length; g--;) w += a[g].size;
			if (w > e) {
				c(a, function(a, b) {
					return (b.rank || 0) - (a.rank || 0)
				});
				for (w = g = 0; w <= e;) w += a[g].size, g++;
				p = a.splice(g - 1, a.length)
			}
			c(a, b);
			for (a = z(a, function(a) {
					return {
						size: a.size,
						targets: [a.target]
					}
				}); h;) {
				for (g = a.length; g--;) h = a[g], w = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, w - h.size / 2), e - h.size);
				g = a.length;
				for (h = !1; g--;) 0 < g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size, a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].pos + a[g - 1].size > e && (a[g - 1].pos = e - a[g - 1].size), a.splice(g, 1), h = !0)
			}
			g = 0;
			t(a, function(a) {
				var b = 0;
				t(a.targets, function() {
					l[g].pos = a.pos + b;
					b += l[g].size;
					g++
				})
			});
			l.push.apply(l, p);
			c(l, b)
		};
		h.prototype.drawDataLabels = function() {
			var b = this,
				c = b.options,
				e = c.dataLabels,
				g = b.points,
				h, l, A = b.hasRendered || 0,
				u, f, x = B(e.defer, !!c.animation),
				J = b.chart.renderer;
			if (e.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(e), f = b.plotGroup("dataLabelsGroup", "data-labels", x && !A ? "hidden" : "visible", e.zIndex || 6), x && (f.attr({
				opacity: +A
			}), A || E(b, "afterAnimate", function() {
				b.visible && f.show(!0);
				f[c.animation ? "animate" : "attr"]({
					opacity: 1
				}, {
					duration: 200
				})
			})), l = e, t(g, function(g) {
				var d, n = g.dataLabel,
					m, k, r = g.connector,
					v = !n,
					x;
				h = g.dlOptions || g.options && g.options.dataLabels;
				if (d = B(h && h.enabled, l.enabled) && !g.isNull) e = q(l, h), m = g.getLabelConfig(), x = e[g.formatPrefix + "Format"] || e.format, u = F(x) ? p(x, m) : (e[g.formatPrefix + "Formatter"] || e.formatter).call(m, e), x = e.style, m = e.rotation, x.color = B(e.color, x.color, b.color, "#000000"), "contrast" === x.color && (g.contrastColor = J.getContrast(g.color || b.color), x.color = e.inside || 0 > B(g.labelDistance, e.distance) || c.stacking ? g.contrastColor : "#000000"), c.cursor && (x.cursor = c.cursor), k = {
					fill: e.backgroundColor,
					stroke: e.borderColor,
					"stroke-width": e.borderWidth,
					r: e.borderRadius || 0,
					rotation: m,
					padding: e.padding,
					zIndex: 1
				}, a.objectEach(k, function(a, d) {
					void 0 === a && delete k[d]
				});
				!n || d && F(u) ? d && F(u) && (n ? k.text = u : (n = g.dataLabel = J[m ? "text" : "label"](u, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"), n.addClass("highcharts-data-label-color-" + g.colorIndex + " " + (e.className || "") + (e.useHTML ? "highcharts-tracker" : ""))), n.attr(k), n.css(x).shadow(e.shadow), n.added || n.add(f), b.alignDataLabel(g, n, e, null, v)) : (g.dataLabel = n = n.destroy(), r && (g.connector = r.destroy()))
			})
		};
		h.prototype.alignDataLabel = function(a, c, e, g, h) {
			var b = this.chart,
				m = b.inverted,
				r = B(a.plotX, -9999),
				f = B(a.plotY, -9999),
				x = c.getBBox(),
				p, v = e.rotation,
				d = e.align,
				n = this.visible && (a.series.forceDL || b.isInsidePlot(r, Math.round(f), m) || g && b.isInsidePlot(r, m ? g.x + 1 : g.y + g.height - 1, m)),
				q = "justify" === B(e.overflow, "justify");
			if (n && (p = e.style.fontSize, p = b.renderer.fontMetrics(p, c).b, g = l({
					x: m ? this.yAxis.len - f : r,
					y: Math.round(m ? this.xAxis.len - r : f),
					width: 0,
					height: 0
				}, g), l(e, {
					width: x.width,
					height: x.height
				}), v ? (q = !1, r = b.renderer.rotCorr(p, v), r = {
					x: g.x + e.x + g.width / 2 + r.x,
					y: g.y + e.y + {
						top: 0,
						middle: .5,
						bottom: 1
					}[e.verticalAlign] * g.height
				}, c[h ? "attr" : "animate"](r).attr({
					align: d
				}), f = (v + 720) % 360, f = 180 < f && 360 > f, "left" === d ? r.y -= f ? x.height : 0 : "center" === d ? (r.x -= x.width / 2, r.y -= x.height / 2) : "right" === d && (r.x -= x.width, r.y -= f ? 0 : x.height)) : (c.align(e, null, g), r = c.alignAttr), q ? a.isLabelJustified = this.justifyDataLabel(c, e, r, x, g, h) : B(e.crop, !0) && (n = b.isInsidePlot(r.x, r.y) && b.isInsidePlot(r.x + x.width, r.y + x.height)), e.shape && !v)) c[h ? "attr" : "animate"]({
				anchorX: m ? b.plotWidth - a.plotY : a.plotX,
				anchorY: m ? b.plotHeight - a.plotX : a.plotY
			});
			n || (c.attr({
				y: -9999
			}), c.placed = !1)
		};
		h.prototype.justifyDataLabel = function(a, c, e, g, h, l) {
			var b = this.chart,
				m = c.align,
				f = c.verticalAlign,
				r, p, v = a.box ? 0 : a.padding || 0;
			r = e.x + v;
			0 > r && ("right" === m ? c.align = "left" : c.x = -r, p = !0);
			r = e.x + g.width - v;
			r > b.plotWidth && ("left" === m ? c.align = "right" : c.x = b.plotWidth - r, p = !0);
			r = e.y + v;
			0 > r && ("bottom" === f ? c.verticalAlign = "top" : c.y = -r, p = !0);
			r = e.y + g.height - v;
			r > b.plotHeight && ("top" === f ? c.verticalAlign = "bottom" : c.y = b.plotHeight - r, p = !0);
			p && (a.placed = !l, a.align(c, null, h));
			return p
		};
		g.pie && (g.pie.prototype.drawDataLabels = function() {
			var b = this,
				c = b.data,
				e, g = b.chart,
				l = b.options.dataLabels,
				p = B(l.connectorPadding, 10),
				A = B(l.connectorWidth, 1),
				q = g.plotWidth,
				f = g.plotHeight,
				x, u = b.center,
				v = u[2] / 2,
				d = u[1],
				n, G, k, y, z = [
					[],
					[]
				],
				M, O, N, E, I = [0, 0, 0, 0];
			b.visible && (l.enabled || b._hasPointLabels) && (t(c, function(a) {
				a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
					width: "auto"
				}).css({
					width: "auto",
					textOverflow: "clip"
				}), a.dataLabel.shortened = !1)
			}), h.prototype.drawDataLabels.apply(b), t(c, function(a) {
				a.dataLabel && a.visible && (z[a.half].push(a), a.dataLabel._pos = null)
			}), t(z, function(c, h) {
				var m, r, x = c.length,
					A = [],
					w;
				if (x)
					for (b.sortByAngle(c, h - .5), 0 < b.maxLabelDistance && (m = Math.max(0, d - v - b.maxLabelDistance), r = Math.min(d + v + b.maxLabelDistance, g.plotHeight), t(c, function(a) {
							0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, d - v - a.labelDistance), a.bottom = Math.min(d + v + a.labelDistance, g.plotHeight), w = a.dataLabel.getBBox().height || 21, a.positionsIndex = A.push({
								target: a.labelPos[1] - a.top + w / 2,
								size: w,
								rank: a.y
							}) - 1)
						}), a.distribute(A, r + w - m)), E = 0; E < x; E++) e = c[E], r = e.positionsIndex,
						k = e.labelPos, n = e.dataLabel, N = !1 === e.visible ? "hidden" : "inherit", O = m = k[1], A && F(A[r]) && (void 0 === A[r].pos ? N = "hidden" : (y = A[r].size, O = e.top + A[r].pos)), delete e.positionIndex, M = l.justify ? u[0] + (h ? -1 : 1) * (v + e.labelDistance) : b.getX(O < e.top + 2 || O > e.bottom - 2 ? m : O, h, e), n._attr = {
							visibility: N,
							align: k[6]
						}, n._pos = {
							x: M + l.x + ({
								left: p,
								right: -p
							}[k[6]] || 0),
							y: O + l.y - 10
						}, k.x = M, k.y = O, B(l.crop, !0) && (G = n.getBBox().width, m = null, M - G < p ? (m = Math.round(G - M + p), I[3] = Math.max(m, I[3])) : M + G > q - p && (m = Math.round(M + G - q + p), I[1] = Math.max(m, I[1])), 0 > O - y / 2 ? I[0] = Math.max(Math.round(-O + y / 2), I[0]) : O + y / 2 > f && (I[2] = Math.max(Math.round(O + y / 2 - f), I[2])), n.sideOverflow = m)
			}), 0 === D(I) || this.verifyDataLabelOverflow(I)) && (this.placeDataLabels(), A && t(this.points, function(a) {
				var d;
				x = a.connector;
				if ((n = a.dataLabel) && n._pos && a.visible && 0 < a.labelDistance) {
					N = n._attr.visibility;
					if (d = !x) a.connector = x = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), x.attr({
						"stroke-width": A,
						stroke: l.connectorColor || a.color || "#666666"
					});
					x[d ? "attr" : "animate"]({
						d: b.connectorPath(a.labelPos)
					});
					x.attr("visibility", N)
				} else x && (a.connector = x.destroy())
			}))
		}, g.pie.prototype.connectorPath = function(a) {
			var b = a.x,
				c = a.y;
			return B(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
		}, g.pie.prototype.placeDataLabels = function() {
			t(this.points, function(a) {
				var b = a.dataLabel;
				b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
					width: b._attr.width + "px",
					textOverflow: "ellipsis"
				}), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
					y: -9999
				}))
			}, this)
		}, g.pie.prototype.alignDataLabel = u, g.pie.prototype.verifyDataLabelOverflow = function(a) {
			var b = this.center,
				c = this.options,
				g = c.center,
				h = c.minSize || 80,
				l, p = null !== c.size;
			p || (null !== g[0] ? l = Math.max(b[2] - Math.max(a[1], a[3]), h) : (l = Math.max(b[2] - a[1] - a[3], h), b[0] += (a[3] - a[1]) / 2), null !== g[1] ? l = Math.max(Math.min(l, b[2] - Math.max(a[0], a[2])), h) : (l = Math.max(Math.min(l, b[2] - a[0] - a[2]), h), b[1] += (a[0] - a[2]) / 2), l < b[2] ? (b[2] = l, b[3] = Math.min(e(c.innerSize || 0, l), l), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : p = !0);
			return p
		});
		g.column && (g.column.prototype.alignDataLabel = function(a, c, e, g, l) {
			var b = this.chart.inverted,
				m = a.series,
				r = a.dlBox || a.shapeArgs,
				f = B(a.below, a.plotY > B(this.translatedThreshold, m.yAxis.len)),
				x = B(e.inside, !!this.options.stacking);
			r && (g = q(r), 0 > g.y && (g.height += g.y, g.y = 0), r = g.y + g.height - m.yAxis.len, 0 < r && (g.height -= r), b && (g = {
				x: m.yAxis.len - g.y - g.height,
				y: m.xAxis.len - g.x - g.width,
				width: g.height,
				height: g.width
			}), x || (b ? (g.x += f ? 0 : g.width, g.width = 0) : (g.y += f ? g.height : 0, g.height = 0)));
			e.align = B(e.align, !b || x ? "center" : f ? "right" : "left");
			e.verticalAlign = B(e.verticalAlign, b || x ? "middle" : f ? "top" : "bottom");
			h.prototype.alignDataLabel.call(this, a, c, e, g, l);
			a.isLabelJustified && a.contrastColor && a.dataLabel.css({
				color: a.contrastColor
			})
		})
	})(L);
	(function(a) {
		var E = a.Chart,
			D = a.each,
			F = a.objectEach,
			t = a.pick,
			l = a.addEvent;
		E.prototype.callbacks.push(function(a) {
			l(a, "render", function() {
				var l = [];
				D(a.labelCollectors || [], function(a) {
					l = l.concat(a())
				});
				D(a.yAxis || [], function(a) {
					a.options.stackLabels && !a.options.stackLabels.allowOverlap && F(a.stacks, function(a) {
						F(a, function(a) {
							l.push(a.label)
						})
					})
				});
				D(a.series || [], function(a) {
					var p = a.options.dataLabels,
						q = a.dataLabelCollections || ["dataLabel"];
					(p.enabled || a._hasPointLabels) && !p.allowOverlap && a.visible && D(q, function(e) {
						D(a.points, function(a) {
							a[e] && (a[e].labelrank = t(a.labelrank, a.shapeArgs && a.shapeArgs.height), l.push(a[e]))
						})
					})
				});
				a.hideOverlappingLabels(l)
			})
		});
		E.prototype.hideOverlappingLabels = function(a) {
			var l = a.length,
				p, u, t, e, h, g, c, b, w, m = function(a, b, c, e, g, f, h, l) {
					return !(g > a + c || g + h < a || f > b + e || f + l < b)
				};
			for (u = 0; u < l; u++)
				if (p = a[u]) p.oldOpacity = p.opacity, p.newOpacity = 1, p.width || (t = p.getBBox(), p.width = t.width, p.height = t.height);
			a.sort(function(a, b) {
				return (b.labelrank || 0) - (a.labelrank || 0)
			});
			for (u = 0; u < l; u++)
				for (t = a[u], p = u + 1; p < l; ++p)
					if (e = a[p], t && e && t !== e && t.placed && e.placed && 0 !== t.newOpacity && 0 !== e.newOpacity && (h = t.alignAttr, g = e.alignAttr, c = t.parentGroup, b = e.parentGroup, w = 2 * (t.box ? 0 : t.padding || 0), h = m(h.x + c.translateX, h.y + c.translateY, t.width - w, t.height - w, g.x + b.translateX, g.y + b.translateY, e.width - w, e.height - w)))(t.labelrank < e.labelrank ? t : e).newOpacity = 0;
			D(a, function(a) {
				var b, c;
				a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
					a.hide()
				}, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
			})
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.Chart,
			F = a.createElement,
			t = a.css,
			l = a.defaultOptions,
			p = a.defaultPlotOptions,
			z = a.each,
			q = a.extend,
			u = a.fireEvent,
			B = a.hasTouch,
			e = a.inArray,
			h = a.isObject,
			g = a.Legend,
			c = a.merge,
			b = a.pick,
			w = a.Point,
			m = a.Series,
			r = a.seriesTypes,
			C = a.svg,
			H;
		H = a.TrackerMixin = {
			drawTrackerPoint: function() {
				var a = this,
					b = a.chart.pointer,
					f = function(a) {
						var f = b.getPointFromEvent(a);
						void 0 !== f && (b.isDirectTouch = !0, f.onMouseOver(a))
					};
				z(a.points, function(a) {
					a.graphic && (a.graphic.element.point = a);
					a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
				});
				a._hasTracking || (z(a.trackerGroups, function(c) {
					if (a[c]) {
						a[c].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
							b.onTrackerMouseOut(a)
						});
						if (B) a[c].on("touchstart", f);
						a.options.cursor && a[c].css(t).css({
							cursor: a.options.cursor
						})
					}
				}), a._hasTracking = !0)
			},
			drawTrackerGraph: function() {
				var a = this,
					b = a.options,
					f = b.trackByArea,
					c = [].concat(f ? a.areaPath : a.graphPath),
					e = c.length,
					g = a.chart,
					d = g.pointer,
					n = g.renderer,
					h = g.options.tooltip.snap,
					k = a.tracker,
					l, m = function() {
						if (g.hoverSeries !== a) a.onMouseOver()
					},
					r = "rgba(192,192,192," + (C ? .0001 : .002) + ")";
				if (e && !f)
					for (l = e + 1; l--;) "M" === c[l] && c.splice(l + 1, 0, c[l + 1] - h, c[l + 2], "L"), (l && "M" === c[l] || l === e) && c.splice(l, 0, "L", c[l - 2] + h, c[l - 1]);
				k ? k.attr({
					d: c
				}) : a.graph && (a.tracker = n.path(c).attr({
					"stroke-linejoin": "round",
					visibility: a.visible ? "visible" : "hidden",
					stroke: r,
					fill: f ? r : "none",
					"stroke-width": a.graph.strokeWidth() + (f ? 0 : 2 * h),
					zIndex: 2
				}).add(a.group), z([a.tracker, a.markerGroup], function(a) {
					a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
						d.onTrackerMouseOut(a)
					});
					b.cursor && a.css({
						cursor: b.cursor
					});
					if (B) a.on("touchstart", m)
				}))
			}
		};
		r.column && (r.column.prototype.drawTracker = H.drawTrackerPoint);
		r.pie && (r.pie.prototype.drawTracker = H.drawTrackerPoint);
		r.scatter && (r.scatter.prototype.drawTracker = H.drawTrackerPoint);
		q(g.prototype, {
			setItemEvents: function(a, b, f) {
				var e = this,
					g = e.chart.renderer.boxWrapper,
					h = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
				(f ? b : a.legendGroup).on("mouseover", function() {
					a.setState("hover");
					g.addClass(h);
					b.css(e.options.itemHoverStyle)
				}).on("mouseout", function() {
					b.css(c(a.visible ? e.itemStyle : e.itemHiddenStyle));
					g.removeClass(h);
					a.setState()
				}).on("click", function(d) {
					var b = function() {
						a.setVisible && a.setVisible()
					};
					d = {
						browserEvent: d
					};
					a.firePointEvent ? a.firePointEvent("legendItemClick", d, b) : u(a, "legendItemClick", d, b)
				})
			},
			createCheckboxForItem: function(a) {
				a.checkbox = F("input", {
					type: "checkbox",
					checked: a.selected,
					defaultChecked: a.selected
				}, this.options.itemCheckboxStyle, this.chart.container);
				E(a.checkbox, "click", function(b) {
					u(a.series || a, "checkboxClick", {
						checked: b.target.checked,
						item: a
					}, function() {
						a.select()
					})
				})
			}
		});
		l.legend.itemStyle.cursor = "pointer";
		q(D.prototype, {
			showResetZoom: function() {
				var a = this,
					b = l.lang,
					f = a.options.chart.resetZoomButton,
					c = f.theme,
					e = c.states,
					g = "chart" === f.relativeTo ? null : "plotBox";
				this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
					a.zoomOut()
				}, c, e && e.hover).attr({
					align: f.position.align,
					title: b.resetZoomTitle
				}).addClass("highcharts-reset-zoom").add().align(f.position, !1, g)
			},
			zoomOut: function() {
				var a = this;
				u(a, "selection", {
					resetSelection: !0
				}, function() {
					a.zoom()
				})
			},
			zoom: function(a) {
				var c, f = this.pointer,
					e = !1,
					g;
				!a || a.resetSelection ? (z(this.axes, function(a) {
					c = a.zoom()
				}), f.initiated = !1) : z(a.xAxis.concat(a.yAxis), function(a) {
					var d = a.axis;
					f[d.isXAxis ? "zoomX" : "zoomY"] && (c = d.zoom(a.min, a.max), d.displayBtn && (e = !0))
				});
				g = this.resetZoomButton;
				e && !g ? this.showResetZoom() : !e && h(g) && (this.resetZoomButton = g.destroy());
				c && this.redraw(b(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
			},
			pan: function(a, b) {
				var f = this,
					c = f.hoverPoints,
					e;
				c && z(c, function(a) {
					a.setState()
				});
				z("xy" === b ? [1, 0] : [1], function(b) {
					b = f[b ? "xAxis" : "yAxis"][0];
					var d = b.horiz,
						c = a[d ? "chartX" : "chartY"],
						d = d ? "mouseDownX" : "mouseDownY",
						g = f[d],
						k = (b.pointRange || 0) / 2,
						h = b.getExtremes(),
						l = b.toValue(g - c, !0) + k,
						k = b.toValue(g + b.len - c, !0) - k,
						m = k < l,
						g = m ? k : l,
						l = m ? l : k,
						k = Math.min(h.dataMin, b.toValue(b.toPixels(h.min) - b.minPixelPadding)),
						m = Math.max(h.dataMax, b.toValue(b.toPixels(h.max) + b.minPixelPadding)),
						r;
					r = k - g;
					0 < r && (l += r, g = k);
					r = l - m;
					0 < r && (l = m, g -= r);
					b.series.length && g !== h.min && l !== h.max && (b.setExtremes(g, l, !1, !1, {
						trigger: "pan"
					}), e = !0);
					f[d] = c
				});
				e && f.redraw(!1);
				t(f.container, {
					cursor: "move"
				})
			}
		});
		q(w.prototype, {
			select: function(a, c) {
				var f = this,
					g = f.series,
					h = g.chart;
				a = b(a, !f.selected);
				f.firePointEvent(a ? "select" : "unselect", {
					accumulate: c
				}, function() {
					f.selected = f.options.selected = a;
					g.options.data[e(f, g.data)] = f.options;
					f.setState(a && "select");
					c || z(h.getSelectedPoints(), function(a) {
						a.selected && a !== f && (a.selected = a.options.selected = !1, g.options.data[e(a, g.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
					})
				})
			},
			onMouseOver: function(a) {
				var b = this.series.chart,
					f = b.pointer;
				a = a ? f.normalize(a) : f.getChartCoordinatesFromPoint(this, b.inverted);
				f.runPointActions(a, this)
			},
			onMouseOut: function() {
				var a = this.series.chart;
				this.firePointEvent("mouseOut");
				z(a.hoverPoints || [], function(a) {
					a.setState()
				});
				a.hoverPoints = a.hoverPoint = null
			},
			importEvents: function() {
				if (!this.hasImportedEvents) {
					var b = this,
						e = c(b.series.options.point, b.options).events;
					b.events = e;
					a.objectEach(e, function(a, c) {
						E(b, c, a)
					});
					this.hasImportedEvents = !0
				}
			},
			setState: function(a, c) {
				var f = Math.floor(this.plotX),
					e = this.plotY,
					g = this.series,
					h = g.options.states[a] || {},
					d = p[g.type].marker && g.options.marker,
					n = d && !1 === d.enabled,
					l = d && d.states && d.states[a] || {},
					k = !1 === l.enabled,
					m = g.stateMarkerGraphic,
					r = this.marker || {},
					w = g.chart,
					u = g.halo,
					t, A = d && g.markerAttribs;
				a = a || "";
				if (!(a === this.state && !c || this.selected && "select" !== a || !1 === h.enabled || a && (k || n && !1 === l.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
					A && (t = g.markerAttribs(this, a));
					if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(g.pointAttribs(this, a), b(w.options.chart.animation, h.animation)), t && this.graphic.animate(t, b(w.options.chart.animation, l.animation, d.animation)), m && m.hide();
					else {
						if (a && l) {
							d = r.symbol || g.symbol;
							m && m.currentSymbol !== d && (m = m.destroy());
							if (m) m[c ? "animate" : "attr"]({
								x: t.x,
								y: t.y
							});
							else d && (g.stateMarkerGraphic = m = w.renderer.symbol(d, t.x, t.y, t.width, t.height).add(g.markerGroup), m.currentSymbol = d);
							m && m.attr(g.pointAttribs(this, a))
						}
						m && (m[a && w.isInsidePlot(f, e, w.inverted) ? "show" : "hide"](), m.element.point = this)
					}(f = h.halo) && f.size ? (u || (g.halo = u = w.renderer.path().add((this.graphic || m).parentGroup)), u[c ? "animate" : "attr"]({
						d: this.haloPath(f.size)
					}), u.attr({
						"class": "highcharts-halo highcharts-color-" + b(this.colorIndex, g.colorIndex)
					}), u.point = this, u.attr(q({
						fill: this.color || g.color,
						"fill-opacity": f.opacity,
						zIndex: -1
					}, f.attributes))) : u && u.point && u.point.haloPath && u.animate({
						d: u.point.haloPath(0)
					});
					this.state = a
				}
			},
			haloPath: function(a) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
			}
		});
		q(m.prototype, {
			onMouseOver: function() {
				var a = this.chart,
					b = a.hoverSeries;
				if (b && b !== this) b.onMouseOut();
				this.options.events.mouseOver && u(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this
			},
			onMouseOut: function() {
				var a = this.options,
					b = this.chart,
					f = b.tooltip,
					c = b.hoverPoint;
				b.hoverSeries = null;
				if (c) c.onMouseOut();
				this && a.events.mouseOut && u(this, "mouseOut");
				!f || this.stickyTracking || f.shared && !this.noSharedTooltip || f.hide();
				this.setState()
			},
			setState: function(a) {
				var c = this,
					f = c.options,
					g = c.graph,
					e = f.states,
					h = f.lineWidth,
					f = 0;
				a = a || "";
				if (c.state !== a && (z([c.group, c.markerGroup, c.dataLabelsGroup], function(b) {
						b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
					}), c.state = a, !e[a] || !1 !== e[a].enabled) && (a && (h = e[a].lineWidth || h + (e[a].lineWidthPlus || 0)), g && !g.dashstyle))
					for (h = {
							"stroke-width": h
						}, g.animate(h, b(c.chart.options.chart.animation, e[a] && e[a].animation)); c["zone-graph-" + f];) c["zone-graph-" + f].attr(h), f += 1
			},
			setVisible: function(a, b) {
				var f = this,
					c = f.chart,
					g = f.legendItem,
					e, d = c.options.chart.ignoreHiddenSeries,
					n = f.visible;
				e = (f.visible = a = f.options.visible = f.userOptions.visible = void 0 === a ? !n : a) ? "show" : "hide";
				z(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
					if (f[a]) f[a][e]()
				});
				if (c.hoverSeries === f || (c.hoverPoint && c.hoverPoint.series) === f) f.onMouseOut();
				g && c.legend.colorizeItem(f, a);
				f.isDirty = !0;
				f.options.stacking && z(c.series, function(a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				});
				z(f.linkedSeries, function(b) {
					b.setVisible(a, !1)
				});
				d && (c.isDirtyBox = !0);
				!1 !== b && c.redraw();
				u(f, e, {
					redraw: b
				})
			},
			show: function() {
				this.setVisible(!0)
			},
			hide: function() {
				this.setVisible(!1)
			},
			select: function(a) {
				this.selected = a = void 0 === a ? !this.selected : a;
				this.checkbox && (this.checkbox.checked = a);
				u(this, a ? "select" : "unselect")
			},
			drawTracker: H.drawTrackerGraph
		})
	})(L);
	(function(a) {
		var E = a.Chart,
			D = a.each,
			F = a.inArray,
			t = a.isArray,
			l = a.isObject,
			p = a.pick,
			z = a.splat;
		E.prototype.setResponsive = function(l) {
			var p = this.options.responsive,
				q = [],
				e = this.currentResponsive;
			p && p.rules && D(p.rules, function(g) {
				void 0 === g._id && (g._id = a.uniqueKey());
				this.matchResponsiveRule(g, q, l)
			}, this);
			var h = a.merge.apply(0, a.map(q, function(g) {
					return a.find(p.rules, function(a) {
						return a._id === g
					}).chartOptions
				})),
				q = q.toString() || void 0;
			q !== (e && e.ruleIds) && (e && this.update(e.undoOptions, l), q ? (this.currentResponsive = {
				ruleIds: q,
				mergedOptions: h,
				undoOptions: this.currentOptions(h)
			}, this.update(h, l)) : this.currentResponsive = void 0)
		};
		E.prototype.matchResponsiveRule = function(a, l) {
			var q = a.condition;
			(q.callback || function() {
				return this.chartWidth <= p(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= p(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= p(q.minWidth, 0) && this.chartHeight >= p(q.minHeight, 0)
			}).call(this) && l.push(a._id)
		};
		E.prototype.currentOptions = function(p) {
			function q(e, h, g, c) {
				var b;
				a.objectEach(e, function(a, m) {
					if (!c && -1 < F(m, ["series", "xAxis", "yAxis"]))
						for (e[m] = z(e[m]), g[m] = [], b = 0; b < e[m].length; b++) h[m][b] && (g[m][b] = {}, q(a[b], h[m][b], g[m][b], c + 1));
					else l(a) ? (g[m] = t(a) ? [] : {}, q(a, h[m] || {}, g[m], c + 1)) : g[m] = h[m] || null
				})
			}
			var B = {};
			q(p, this.options, B, 0);
			return B
		}
	})(L);
	(function(a) {
		var E = a.addEvent,
			D = a.Axis,
			F = a.Chart,
			t = a.css,
			l = a.dateFormat,
			p = a.defined,
			z = a.each,
			q = a.extend,
			u = a.noop,
			B = a.pick,
			e = a.timeUnits,
			h = a.wrap;
		h(a.Series.prototype, "init", function(a) {
			var c;
			a.apply(this, Array.prototype.slice.call(arguments, 1));
			(c = this.xAxis) && c.options.ordinal && E(this, "updatedData", function() {
				delete c.ordinalIndex
			})
		});
		h(D.prototype, "getTimeTicks", function(a, c, b, h, m, r, q, u) {
			var g = 0,
				t, f, x = {},
				w, v, d, n = [],
				G = -Number.MAX_VALUE,
				k = this.options.tickPixelInterval;
			if (!this.options.ordinal && !this.options.breaks || !r || 3 > r.length || void 0 === b) return a.call(this, c, b, h, m);
			v = r.length;
			for (t = 0; t < v; t++) {
				d = t && r[t - 1] > h;
				r[t] < b && (g = t);
				if (t === v - 1 || r[t + 1] - r[t] > 5 * q || d) {
					if (r[t] > G) {
						for (f = a.call(this, c, r[g], r[t], m); f.length && f[0] <= G;) f.shift();
						f.length && (G = f[f.length - 1]);
						n = n.concat(f)
					}
					g = t + 1
				}
				if (d) break
			}
			a = f.info;
			if (u && a.unitRange <= e.hour) {
				t = n.length - 1;
				for (g = 1; g < t; g++) l("%d", n[g]) !== l("%d", n[g - 1]) && (x[n[g]] = "day", w = !0);
				w && (x[n[0]] = "day");
				a.higherRanks = x
			}
			n.info = a;
			if (u && p(k)) {
				u = a = n.length;
				t = [];
				var y;
				for (w = []; u--;) g = this.translate(n[u]), y && (w[u] = y - g), t[u] = y = g;
				w.sort();
				w = w[Math.floor(w.length / 2)];
				w < .6 * k && (w = null);
				u = n[a - 1] > h ? a - 1 : a;
				for (y = void 0; u--;) g = t[u], h = Math.abs(y - g), y && h < .8 * k && (null === w || h < .8 * w) ? (x[n[u]] && !x[n[u + 1]] ? (h = u + 1, y = g) : h = u, n.splice(h, 1)) : y = g
			}
			return n
		});
		q(D.prototype, {
			beforeSetTickPositions: function() {
				var a, c = [],
					b = !1,
					e, h = this.getExtremes(),
					l = h.min,
					q = h.max,
					t, u = this.isXAxis && !!this.options.breaks,
					h = this.options.ordinal,
					D = Number.MAX_VALUE,
					f = this.chart.options.chart.ignoreHiddenSeries;
				e = "highcharts-navigator-xaxis" === this.options.className;
				!this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !e || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll, !e && p(this.userMin) && (this.min += this.options.overscroll));
				if (h || u) {
					z(this.series, function(b, e) {
						if (!(f && !1 === b.visible || !1 === b.takeOrdinalPosition && !u) && (c = c.concat(b.processedXData), a = c.length, c.sort(function(a, b) {
								return a - b
							}), D = Math.min(D, B(b.closestPointRange, D)), a))
							for (e = a - 1; e--;) c[e] === c[e + 1] && c.splice(e, 1)
					});
					a = c.length;
					if (2 < a) {
						e = c[1] - c[0];
						for (t = a - 1; t-- && !b;) c[t + 1] - c[t] !== e && (b = !0);
						!this.options.keepOrdinalPadding && (c[0] - l > e || q - c[c.length - 1] > e) && (b = !0)
					} else this.options.overscroll && (2 === a ? D = c[1] - c[0] : 1 === a ? (D = this.options.overscroll, c = [c[0], c[0] + D]) : D = this.overscrollPointsRange);
					b ? (this.options.overscroll && (this.overscrollPointsRange = D, c = c.concat(this.getOverscrollPositions())), this.ordinalPositions = c, e = this.ordinal2lin(Math.max(l, c[0]), !0), t = Math.max(this.ordinal2lin(Math.min(q, c[c.length - 1]), !0), 1), this.ordinalSlope = q = (q - l) / (t - e), this.ordinalOffset = l - e * q) : (this.overscrollPointsRange = B(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
				}
				this.isOrdinal = h && b;
				this.groupIntervalFactor = null
			},
			val2lin: function(a, c) {
				var b = this.ordinalPositions;
				if (b) {
					var e = b.length,
						g, h;
					for (g = e; g--;)
						if (b[g] === a) {
							h = g;
							break
						}
					for (g = e - 1; g--;)
						if (a > b[g] || 0 === g) {
							a = (a - b[g]) / (b[g + 1] - b[g]);
							h = g + a;
							break
						}
					c = c ? h : this.ordinalSlope * (h || 0) + this.ordinalOffset
				} else c = a;
				return c
			},
			lin2val: function(a, c) {
				var b = this.ordinalPositions;
				if (b) {
					var e = this.ordinalSlope,
						g = this.ordinalOffset,
						h = b.length - 1,
						l;
					if (c) 0 > a ? a = b[0] : a > h ? a = b[h] : (h = Math.floor(a), l = a - h);
					else
						for (; h--;)
							if (c = e * h + g, a >= c) {
								e = e * (h + 1) + g;
								l = (a - c) / (e - c);
								break
							} return void 0 !== l && void 0 !== b[h] ? b[h] + (l ? l * (b[h + 1] - b[h]) : 0) : a
				}
				return a
			},
			getExtendedPositions: function() {
				var a = this,
					c = a.chart,
					b = a.series[0].currentDataGrouping,
					e = a.ordinalIndex,
					h = b ? b.count + b.unitName : "raw",
					l = a.options.overscroll,
					p = a.getExtremes(),
					q, t;
				e || (e = a.ordinalIndex = {});
				e[h] || (q = {
					series: [],
					chart: c,
					getExtremes: function() {
						return {
							min: p.dataMin,
							max: p.dataMax + l
						}
					},
					options: {
						ordinal: !0
					},
					val2lin: D.prototype.val2lin,
					ordinal2lin: D.prototype.ordinal2lin
				}, z(a.series, function(e) {
					t = {
						xAxis: q,
						xData: e.xData.slice(),
						chart: c,
						destroyGroupedData: u
					};
					t.xData = t.xData.concat(a.getOverscrollPositions());
					t.options = {
						dataGrouping: b ? {
							enabled: !0,
							forced: !0,
							approximation: "open",
							units: [
								[b.unitName, [b.count]]
							]
						} : {
							enabled: !1
						}
					};
					e.processData.apply(t);
					q.series.push(t)
				}), a.beforeSetTickPositions.apply(q), e[h] = q.ordinalPositions);
				return e[h]
			},
			getOverscrollPositions: function() {
				var e = this.options.overscroll,
					c = this.overscrollPointsRange,
					b = [],
					h = this.dataMax;
				if (a.defined(c))
					for (b.push(h); h <= this.dataMax + e;) h += c, b.push(h);
				return b
			},
			getGroupIntervalFactor: function(a, c, b) {
				var e;
				b = b.processedXData;
				var g = b.length,
					h = [];
				e = this.groupIntervalFactor;
				if (!e) {
					for (e = 0; e < g - 1; e++) h[e] = b[e + 1] - b[e];
					h.sort(function(a, b) {
						return a - b
					});
					h = h[Math.floor(g / 2)];
					a = Math.max(a, b[0]);
					c = Math.min(c, b[g - 1]);
					this.groupIntervalFactor = e = g * h / (c - a)
				}
				return e
			},
			postProcessTickInterval: function(a) {
				var c = this.ordinalSlope;
				return c ? this.options.breaks ? this.closestPointRange : a / (c / this.closestPointRange) : a
			}
		});
		D.prototype.ordinal2lin = D.prototype.val2lin;
		h(F.prototype, "pan", function(a, c) {
			var b = this.xAxis[0],
				e = b.options.overscroll,
				g = c.chartX,
				h = !1;
			if (b.options.ordinal && b.series.length) {
				var l = this.mouseDownX,
					p = b.getExtremes(),
					q = p.dataMax,
					u = p.min,
					f = p.max,
					x = this.hoverPoints,
					J = b.closestPointRange || b.overscrollPointsRange,
					l = (l - g) / (b.translationSlope * (b.ordinalSlope || J)),
					v = {
						ordinalPositions: b.getExtendedPositions()
					},
					J = b.lin2val,
					d = b.val2lin,
					n;
				v.ordinalPositions ? 1 < Math.abs(l) && (x && z(x, function(a) {
					a.setState()
				}), 0 > l ? (x = v, n = b.ordinalPositions ? b : v) : (x = b.ordinalPositions ? b : v, n = v), v = n.ordinalPositions, q > v[v.length - 1] && v.push(q), this.fixedRange = f - u, l = b.toFixedRange(null, null, J.apply(x, [d.apply(x, [u, !0]) + l, !0]), J.apply(n, [d.apply(n, [f, !0]) + l, !0])), l.min >= Math.min(p.dataMin, u) && l.max <= Math.max(q, f) + e && b.setExtremes(l.min, l.max, !0, !1, {
					trigger: "pan"
				}), this.mouseDownX = g, t(this.container, {
					cursor: "move"
				})) : h = !0
			} else h = !0;
			h && (e && (b.max = b.dataMax + e), a.apply(this, Array.prototype.slice.call(arguments, 1)))
		})
	})(L);
	(function(a) {
		function E() {
			return Array.prototype.slice.call(arguments, 1)
		}

		function D(a) {
			a.apply(this);
			this.drawBreaks(this.xAxis, ["x"]);
			this.drawBreaks(this.yAxis, F(this.pointArrayMap, ["y"]))
		}
		var F = a.pick,
			t = a.wrap,
			l = a.each,
			p = a.extend,
			z = a.isArray,
			q = a.fireEvent,
			u = a.Axis,
			B = a.Series;
		p(u.prototype, {
			isInBreak: function(a, h) {
				var e = a.repeat || Infinity,
					c = a.from,
					b = a.to - a.from;
				h = h >= c ? (h - c) % e : e - (c - h) % e;
				return a.inclusive ? h <= b : h < b && 0 !== h
			},
			isInAnyBreak: function(a, h) {
				var e = this.options.breaks,
					c = e && e.length,
					b, l, m;
				if (c) {
					for (; c--;) this.isInBreak(e[c], a) && (b = !0, l || (l = F(e[c].showPoints, this.isXAxis ? !1 : !0)));
					m = b && h ? b && !l : b
				}
				return m
			}
		});
		t(u.prototype, "setTickPositions", function(a) {
			a.apply(this, Array.prototype.slice.call(arguments, 1));
			if (this.options.breaks) {
				var e = this.tickPositions,
					g = this.tickPositions.info,
					c = [],
					b;
				for (b = 0; b < e.length; b++) this.isInAnyBreak(e[b]) || c.push(e[b]);
				this.tickPositions = c;
				this.tickPositions.info = g
			}
		});
		t(u.prototype, "init", function(a, h, g) {
			var c = this;
			g.breaks && g.breaks.length && (g.ordinal = !1);
			a.call(this, h, g);
			a = this.options.breaks;
			c.isBroken = z(a) && !!a.length;
			c.isBroken && (c.val2lin = function(a) {
				var b = a,
					e, g;
				for (g = 0; g < c.breakArray.length; g++)
					if (e = c.breakArray[g], e.to <= a) b -= e.len;
					else if (e.from >= a) break;
				else if (c.isInBreak(e, a)) {
					b -= a - e.from;
					break
				}
				return b
			}, c.lin2val = function(a) {
				var b, e;
				for (e = 0; e < c.breakArray.length && !(b = c.breakArray[e], b.from >= a); e++) b.to < a ? a += b.len : c.isInBreak(b, a) && (a += b.len);
				return a
			}, c.setExtremes = function(a, c, e, g, h) {
				for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
				for (; this.isInAnyBreak(c);) c -= this.closestPointRange;
				u.prototype.setExtremes.call(this, a, c, e, g, h)
			}, c.setAxisTranslation = function(a) {
				u.prototype.setAxisTranslation.call(this, a);
				a = c.options.breaks;
				var b = [],
					e = [],
					g = 0,
					h, p, t = c.userMin || c.min,
					z = c.userMax || c.max,
					f = F(c.pointRangePadding, 0),
					x, J;
				l(a, function(a) {
					p = a.repeat || Infinity;
					c.isInBreak(a, t) && (t += a.to % p - t % p);
					c.isInBreak(a, z) && (z -= z % p - a.from % p)
				});
				l(a, function(a) {
					x = a.from;
					for (p = a.repeat || Infinity; x - p > t;) x -= p;
					for (; x < t;) x += p;
					for (J = x; J < z; J += p) b.push({
						value: J,
						move: "in"
					}), b.push({
						value: J + (a.to - a.from),
						move: "out",
						size: a.breakSize
					})
				});
				b.sort(function(a, b) {
					return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
				});
				h = 0;
				x = t;
				l(b, function(a) {
					h += "in" === a.move ? 1 : -1;
					1 === h && "in" === a.move && (x = a.value);
					0 === h && (e.push({
						from: x,
						to: a.value,
						len: a.value - x - (a.size || 0)
					}), g += a.value - x - (a.size || 0))
				});
				c.breakArray = e;
				c.unitLength = z - t - g + f;
				q(c, "afterBreaks");
				c.options.staticScale ? c.transA = c.options.staticScale : c.unitLength && (c.transA *= (z - c.min + f) / c.unitLength);
				f && (c.minPixelPadding = c.transA * c.minPointOffset);
				c.min = t;
				c.max = z
			})
		});
		t(B.prototype, "generatePoints", function(a) {
			a.apply(this, E(arguments));
			var e = this.xAxis,
				g = this.yAxis,
				c = this.points,
				b, l = c.length,
				m = this.options.connectNulls,
				r;
			if (e && g && (e.options.breaks || g.options.breaks))
				for (; l--;) b = c[l], r = null === b.y && !1 === m, r || !e.isInAnyBreak(b.x, !0) && !g.isInAnyBreak(b.y, !0) || (c.splice(l, 1), this.data[l] && this.data[l].destroyElements())
		});
		a.Series.prototype.drawBreaks = function(a, h) {
			var e = this,
				c = e.points,
				b, p, m, r;
			a && l(h, function(g) {
				b = a.breakArray || [];
				p = a.isXAxis ? a.min : F(e.options.threshold, a.min);
				l(c, function(c) {
					r = F(c["stack" + g.toUpperCase()], c[g]);
					l(b, function(b) {
						m = !1;
						if (p < b.from && r > b.to || p > b.from && r < b.from) m = "pointBreak";
						else if (p < b.from && r > b.from && r < b.to || p > b.from && r > b.to && r < b.from) m = "pointInBreak";
						m && q(a, m, {
							point: c,
							brk: b
						})
					})
				})
			})
		};
		a.Series.prototype.gappedPath = function() {
			var e = this.options.gapSize,
				h = this.points.slice(),
				g = h.length - 1,
				c = this.yAxis,
				b;
			if (e && 0 < g)
				for ("value" !== this.options.gapUnit && (e *= this.closestPointRange); g--;) h[g + 1].x - h[g].x > e && (b = (h[g].x + h[g + 1].x) / 2, h.splice(g + 1, 0, {
					isNull: !0,
					x: b
				}), this.options.stacking && (b = c.stacks[this.stackKey][b] = new a.StackItem(c, c.options.stackLabels, !1, b, this.stack), b.total = 0));
			return this.getGraphPath(h)
		};
		t(a.seriesTypes.column.prototype, "drawPoints", D);
		t(a.Series.prototype, "drawPoints", D)
	})(L);
	(function(a) {
		var E = a.arrayMax,
			D = a.arrayMin,
			F = a.Axis,
			t = a.defaultPlotOptions,
			l = a.defined,
			p = a.each,
			z = a.extend,
			q = a.format,
			u = a.isNumber,
			B = a.merge,
			e = a.pick,
			h = a.Point,
			g = a.Tooltip,
			c = a.wrap,
			b = a.Series.prototype,
			w = b.processData,
			m = b.generatePoints,
			r = b.destroy,
			C = {
				approximation: "average",
				groupPixelWidth: 2,
				dateTimeLabelFormats: {
					millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
					second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
					minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
					hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
					day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
					week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
					month: ["%B %Y", "%B", "-%B %Y"],
					year: ["%Y", "%Y", "-%Y"]
				}
			},
			H = {
				line: {},
				spline: {},
				area: {},
				areaspline: {},
				column: {
					approximation: "sum",
					groupPixelWidth: 10
				},
				arearange: {
					approximation: "range"
				},
				areasplinerange: {
					approximation: "range"
				},
				columnrange: {
					approximation: "range",
					groupPixelWidth: 10
				},
				candlestick: {
					approximation: "ohlc",
					groupPixelWidth: 10
				},
				ohlc: {
					approximation: "ohlc",
					groupPixelWidth: 5
				}
			},
			A = a.defaultDataGroupingUnits = [
				["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1]],
				["week", [1]],
				["month", [1, 3, 6]],
				["year", null]
			],
			K = a.approximations = {
				sum: function(a) {
					var b = a.length,
						f;
					if (!b && a.hasNulls) f = null;
					else if (b)
						for (f = 0; b--;) f += a[b];
					return f
				},
				average: function(a) {
					var b = a.length;
					a = K.sum(a);
					u(a) && b && (a /= b);
					return a
				},
				averages: function() {
					var a = [];
					p(arguments, function(b) {
						a.push(K.average(b))
					});
					return a
				},
				open: function(a) {
					return a.length ? a[0] : a.hasNulls ? null : void 0
				},
				high: function(a) {
					return a.length ? E(a) : a.hasNulls ? null : void 0
				},
				low: function(a) {
					return a.length ? D(a) : a.hasNulls ? null : void 0
				},
				close: function(a) {
					return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
				},
				ohlc: function(a, b, c, e) {
					a = K.open(a);
					b = K.high(b);
					c = K.low(c);
					e = K.close(e);
					if (u(a) || u(b) || u(c) || u(e)) return [a, b, c, e]
				},
				range: function(a, b) {
					a = K.low(a);
					b = K.high(b);
					if (u(a) || u(b)) return [a, b];
					if (null === a && null === b) return null
				}
			};
		b.groupData = function(a, b, c, e) {
			var d = this.data,
				f = this.options.data,
				g = [],
				k = [],
				h = [],
				l = a.length,
				m, r, q = !!b,
				v = [];
			e = "function" === typeof e ? e : K[e] || H[this.type] && K[H[this.type].approximation] || K[C.approximation];
			var t = this.pointArrayMap,
				x = t && t.length,
				w = 0;
			r = 0;
			var z, A;
			x ? p(t, function() {
				v.push([])
			}) : v.push([]);
			z = x || 1;
			for (A = 0; A <= l && !(a[A] >= c[0]); A++);
			for (A; A <= l; A++) {
				for (; void 0 !== c[w + 1] && a[A] >= c[w + 1] || A === l;) {
					m = c[w];
					this.dataGroupInfo = {
						start: r,
						length: v[0].length
					};
					r = e.apply(this, v);
					void 0 !== r && (g.push(m), k.push(r), h.push(this.dataGroupInfo));
					r = A;
					for (m = 0; m < z; m++) v[m].length = 0, v[m].hasNulls = !1;
					w += 1;
					if (A === l) break
				}
				if (A === l) break;
				if (t) {
					m = this.cropStart + A;
					var B = d && d[m] || this.pointClass.prototype.applyOptions.apply({
							series: this
						}, [f[m]]),
						J;
					for (m = 0; m < x; m++) J = B[t[m]], u(J) ? v[m].push(J) : null === J && (v[m].hasNulls = !0)
				} else m = q ? b[A] : null, u(m) ? v[0].push(m) : null === m && (v[0].hasNulls = !0)
			}
			return [g,
				k, h
			]
		};
		b.processData = function() {
			var a = this.chart,
				c = this.options.dataGrouping,
				g = !1 !== this.allowDG && c && e(c.enabled, a.options.isStock),
				h = this.visible || !a.options.chart.ignoreHiddenSeries,
				d;
			this.forceCrop = g;
			this.groupPixelWidth = null;
			this.hasProcessed = !0;
			if (!1 !== w.apply(this, arguments) && g) {
				this.destroyGroupedData();
				var n = this.processedXData,
					m = this.processedYData,
					k = a.plotSizeX,
					a = this.xAxis,
					r = a.options.ordinal,
					p = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
				if (p) {
					this.isDirty = d = !0;
					this.points = null;
					var q = a.getExtremes(),
						g = q.min,
						q = q.max,
						r = r && a.getGroupIntervalFactor(g, q, this) || 1,
						k = p * (q - g) / k * r,
						p = a.getTimeTicks(a.normalizeTimeTickInterval(k, c.units || A), Math.min(g, n[0]), Math.max(q, n[n.length - 1]), a.options.startOfWeek, n, this.closestPointRange),
						n = b.groupData.apply(this, [n, m, p, c.approximation]),
						m = n[0],
						r = n[1];
					if (c.smoothed && m.length) {
						c = m.length - 1;
						for (m[c] = Math.min(m[c], q); c-- && 0 < c;) m[c] += k / 2;
						m[0] = Math.max(m[0], g)
					}
					this.currentDataGrouping = p.info;
					this.closestPointRange = p.info.totalRange;
					this.groupMap = n[2];
					l(m[0]) && m[0] < a.dataMin && h && (a.min === a.dataMin && (a.min = m[0]), a.dataMin = m[0]);
					this.processedXData = m;
					this.processedYData = r
				} else this.currentDataGrouping = this.groupMap = null;
				this.hasGroupedData = d
			}
		};
		b.destroyGroupedData = function() {
			var a = this.groupedData;
			p(a || [], function(b, c) {
				b && (a[c] = b.destroy ? b.destroy() : null)
			});
			this.groupedData = null
		};
		b.generatePoints = function() {
			m.apply(this);
			this.destroyGroupedData();
			this.groupedData = this.hasGroupedData ? this.points : null
		};
		c(h.prototype, "update", function(b) {
			this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
		});
		c(g.prototype, "tooltipFooterHeaderFormatter", function(b, c, e) {
			var f = c.series,
				d = f.tooltipOptions,
				g = f.options.dataGrouping,
				h = d.xDateFormat,
				k, l = f.xAxis,
				m = a.dateFormat;
			return l && "datetime" === l.options.type && g && u(c.key) ? (b = f.currentDataGrouping, g = g.dateTimeLabelFormats, b ? (l = g[b.unitName], 1 === b.count ? h = l[0] : (h = l[1], k = l[2])) : !h && g && (h = this.getXDateFormat(c, d, l)), h = m(h, c.key), k && (h += m(k, c.key + b.totalRange - 1)), q(d[(e ? "footer" : "header") + "Format"], {
				point: z(c.point, {
					key: h
				}),
				series: f
			})) : b.call(this, c, e)
		});
		b.destroy = function() {
			for (var a = this.groupedData || [], b = a.length; b--;) a[b] && a[b].destroy();
			r.apply(this)
		};
		c(b, "setOptions", function(a, b) {
			a = a.call(this, b);
			var c = this.type,
				f = this.chart.options.plotOptions,
				d = t[c].dataGrouping;
			H[c] && (d || (d = B(C, H[c])), a.dataGrouping = B(d, f.series && f.series.dataGrouping, f[c].dataGrouping, b.dataGrouping));
			this.chart.options.isStock && (this.requireSorting = !0);
			return a
		});
		c(F.prototype, "setScale", function(a) {
			a.call(this);
			p(this.series, function(a) {
				a.hasProcessed = !1
			})
		});
		F.prototype.getGroupPixelWidth = function() {
			var a = this.series,
				b = a.length,
				c, e = 0,
				d = !1,
				g;
			for (c = b; c--;)(g = a[c].options.dataGrouping) && (e = Math.max(e, g.groupPixelWidth));
			for (c = b; c--;)(g = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / e || b && g.forced) && (d = !0);
			return d ? e : 0
		};
		F.prototype.setDataGrouping = function(a, b) {
			var c;
			b = e(b, !0);
			a || (a = {
				forced: !1,
				units: null
			});
			if (this instanceof F)
				for (c = this.series.length; c--;) this.series[c].update({
					dataGrouping: a
				}, !1);
			else p(this.chart.options.series, function(b) {
				b.dataGrouping = a
			}, !1);
			b && this.chart.redraw()
		}
	})(L);
	(function(a) {
		var E = a.each,
			D = a.Point,
			F = a.seriesType,
			t = a.seriesTypes;
		F("ohlc", "column", {
			lineWidth: 1,
			tooltip: {
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'
			},
			threshold: null,
			states: {
				hover: {
					lineWidth: 3
				}
			},
			stickyTracking: !0
		}, {
			directTouch: !1,
			pointArrayMap: ["open", "high", "low", "close"],
			toYData: function(a) {
				return [a.open, a.high, a.low, a.close]
			},
			pointValKey: "close",
			pointAttrToOptions: {
				stroke: "color",
				"stroke-width": "lineWidth"
			},
			pointAttribs: function(a, p) {
				p = t.column.prototype.pointAttribs.call(this, a, p);
				var l = this.options;
				delete p.fill;
				!a.options.color && l.upColor && a.open < a.close && (p.stroke = l.upColor);
				return p
			},
			translate: function() {
				var a = this,
					p = a.yAxis,
					z = !!a.modifyValue,
					q = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
				t.column.prototype.translate.apply(a);
				E(a.points, function(l) {
					E([l.open, l.high, l.low, l.close, l.low], function(t, e) {
						null !== t && (z && (t = a.modifyValue(t)), l[q[e]] = p.toPixels(t, !0))
					});
					l.tooltipPos[1] = l.plotHigh + p.pos - a.chart.plotTop
				})
			},
			drawPoints: function() {
				var a = this,
					p = a.chart;
				E(a.points, function(l) {
					var q, t, z, e, h = l.graphic,
						g, c = !h;
					void 0 !== l.plotY && (h || (l.graphic = h = p.renderer.path().add(a.group)), h.attr(a.pointAttribs(l, l.selected && "select")), t = h.strokeWidth() % 2 / 2, g = Math.round(l.plotX) - t, z = Math.round(l.shapeArgs.width / 2), e = ["M", g, Math.round(l.yBottom), "L", g, Math.round(l.plotHigh)], null !== l.open && (q = Math.round(l.plotOpen) + t, e.push("M", g, q, "L", g - z, q)), null !== l.close && (q = Math.round(l.plotClose) + t, e.push("M", g, q, "L", g + z, q)), h[c ? "attr" : "animate"]({
						d: e
					}).addClass(l.getClassName(), !0))
				})
			},
			animate: null
		}, {
			getClassName: function() {
				return D.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
			}
		})
	})(L);
	(function(a) {
		var E = a.defaultPlotOptions,
			D = a.each,
			F = a.merge,
			t = a.seriesType,
			l = a.seriesTypes;
		t("candlestick", "ohlc", F(E.column, {
			states: {
				hover: {
					lineWidth: 2
				}
			},
			tooltip: E.ohlc.tooltip,
			threshold: null,
			lineColor: "#000000",
			lineWidth: 1,
			upColor: "#ffffff",
			stickyTracking: !0
		}), {
			pointAttribs: function(a, t) {
				var p = l.column.prototype.pointAttribs.call(this, a, t),
					u = this.options,
					z = a.open < a.close,
					e = u.lineColor || this.color;
				p["stroke-width"] = u.lineWidth;
				p.fill = a.options.color || (z ? u.upColor || this.color : this.color);
				p.stroke = a.lineColor || (z ? u.upLineColor || e : e);
				t && (a = u.states[t], p.fill = a.color || p.fill, p.stroke = a.lineColor || p.stroke, p["stroke-width"] = a.lineWidth || p["stroke-width"]);
				return p
			},
			drawPoints: function() {
				var a = this,
					l = a.chart;
				D(a.points, function(p) {
					var t = p.graphic,
						q, e, h, g, c, b, w, m = !t;
					void 0 !== p.plotY && (t || (p.graphic = t = l.renderer.path().add(a.group)), t.attr(a.pointAttribs(p, p.selected && "select")).shadow(a.options.shadow), c = t.strokeWidth() % 2 / 2, b = Math.round(p.plotX) - c, q = p.plotOpen, e = p.plotClose, h = Math.min(q, e), q = Math.max(q, e), w = Math.round(p.shapeArgs.width / 2), e = Math.round(h) !== Math.round(p.plotHigh), g = q !== p.yBottom, h = Math.round(h) + c, q = Math.round(q) + c, c = [], c.push("M", b - w, q, "L", b - w, h, "L", b + w, h, "L", b + w, q, "Z", "M", b, h, "L", b, e ? Math.round(p.plotHigh) : h, "M", b, q, "L", b, g ? Math.round(p.yBottom) : q), t[m ? "attr" : "animate"]({
						d: c
					}).addClass(p.getClassName(), !0))
				})
			}
		})
	})(L);
	Z = function(a) {
		var E = a.each,
			D = a.seriesTypes,
			F = a.stableSort;
		return {
			translate: function() {
				D.column.prototype.translate.apply(this);
				var a = this.options,
					l = this.chart,
					p = this.points,
					z = p.length - 1,
					q, u, B = a.onSeries;
				q = B && l.get(B);
				var a = a.onKey || "y",
					B = q && q.options.step,
					e = q && q.points,
					h = e && e.length,
					g = this.xAxis,
					c = this.yAxis,
					b = g.getExtremes(),
					w = 0,
					m, r, C;
				if (q && q.visible && h)
					for (w = (q.pointXOffset || 0) + (q.barW || 0) / 2, q = q.currentDataGrouping, r = e[h - 1].x + (q ? q.totalRange : 0), F(p, function(a, b) {
							return a.x - b.x
						}), a = "plot" + a[0].toUpperCase() + a.substr(1); h-- && p[z] && !(q = p[z], m = e[h], m.x <= q.x && void 0 !== m[a] && (q.x <= r && (q.plotY = m[a], m.x < q.x && !B && (C = e[h + 1]) && void 0 !== C[a] && (q.plotY += (q.x - m.x) / (C.x - m.x) * (C[a] - m[a]))), z--, h++, 0 > z)););
				E(p, function(a, e) {
					var h;
					void 0 === a.plotY && (a.x >= b.min && a.x <= b.max ? a.plotY = l.chartHeight - g.bottom - (g.opposite ? g.height : 0) + g.offset - c.top : a.shapeArgs = {});
					a.plotX += w;
					(u = p[e - 1]) && u.plotX === a.plotX && (void 0 === u.stackIndex && (u.stackIndex = 0), h = u.stackIndex + 1);
					a.stackIndex = h
				})
			}
		}
	}(L);
	(function(a, E) {
		var D = a.addEvent,
			F = a.each,
			t = a.merge,
			l = a.noop,
			p = a.Renderer,
			z = a.seriesType,
			q = a.TrackerMixin,
			u = a.VMLRenderer,
			B = a.SVGRenderer.prototype.symbols;
		z("flags", "column", {
			pointRange: 0,
			shape: "flag",
			stackDistance: 12,
			textAlign: "center",
			tooltip: {
				pointFormat: "{point.text}\x3cbr/\x3e"
			},
			threshold: null,
			y: -30,
			fillColor: "#ffffff",
			lineWidth: 1,
			states: {
				hover: {
					lineColor: "#000000",
					fillColor: "#ccd6eb"
				}
			},
			style: {
				fontSize: "11px",
				fontWeight: "bold"
			}
		}, {
			sorted: !1,
			noSharedTooltip: !0,
			allowDG: !1,
			takeOrdinalPosition: !1,
			trackerGroups: ["markerGroup"],
			forceCrop: !0,
			init: a.Series.prototype.init,
			pointAttribs: function(a, h) {
				var e = this.options,
					c = a && a.color || this.color,
					b = e.lineColor,
					l = a && a.lineWidth;
				a = a && a.fillColor || e.fillColor;
				h && (a = e.states[h].fillColor, b = e.states[h].lineColor, l = e.states[h].lineWidth);
				return {
					fill: a || c,
					stroke: b || c,
					"stroke-width": l || e.lineWidth || 0
				}
			},
			translate: E.translate,
			drawPoints: function() {
				var e = this.points,
					h = this.chart,
					g = h.renderer,
					c, b, l = this.options,
					m = l.y,
					r, p, q, u, z, f, x, B = this.yAxis;
				for (p = e.length; p--;) q = e[p], x = q.plotX > this.xAxis.len, c = q.plotX, u = q.stackIndex, r = q.options.shape || l.shape, b = q.plotY, void 0 !== b && (b = q.plotY + m - (void 0 !== u && u * l.stackDistance)), z = u ? void 0 : q.plotX, f = u ? void 0 : q.plotY, u = q.graphic, void 0 !== b && 0 <= c && !x ? (u || (u = q.graphic = g.label("", null, null, r, null, null, l.useHTML).attr(this.pointAttribs(q)).css(t(l.style, q.style)).attr({
					align: "flag" === r ? "left" : "center",
					width: l.width,
					height: l.height,
					"text-align": l.textAlign
				}).addClass("highcharts-point").add(this.markerGroup), q.graphic.div && (q.graphic.div.point = q), u.shadow(l.shadow)), 0 < c && (c -= u.strokeWidth() % 2), u.attr({
					text: q.options.title || l.title || "A",
					x: c,
					y: b,
					anchorX: z,
					anchorY: f
				}), q.tooltipPos = h.inverted ? [B.len + B.pos - h.plotLeft - b, this.xAxis.len - c] : [c, b + B.pos - h.plotTop]) : u && (q.graphic = u.destroy());
				l.useHTML && a.wrap(this.markerGroup, "on", function(b) {
					return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
				})
			},
			drawTracker: function() {
				var a = this.points;
				q.drawTrackerPoint.apply(this);
				F(a, function(e) {
					var g = e.graphic;
					g && D(g.element, "mouseover", function() {
						0 < e.stackIndex && !e.raised && (e._y = g.y, g.attr({
							y: e._y - 8
						}), e.raised = !0);
						F(a, function(a) {
							a !== e && a.raised && a.graphic && (a.graphic.attr({
								y: a._y
							}), a.raised = !1)
						})
					})
				})
			},
			animate: l,
			buildKDTree: l,
			setClip: l
		});
		B.flag = function(a, h, g, c, b) {
			return ["M", b && b.anchorX || a, b && b.anchorY || h, "L", a, h + c, a, h, a + g, h, a + g, h + c, a, h + c, "Z"]
		};
		F(["circle", "square"], function(a) {
			B[a + "pin"] = function(e, g, c, b, l) {
				var h = l && l.anchorX;
				l = l && l.anchorY;
				"circle" === a && b > c && (e -= Math.round((b - c) / 2), c = b);
				e = B[a](e, g, c, b);
				h && l && e.push("M", h, g > l ? g : g + b, "L", h, l);
				return e
			}
		});
		p === u && F(["flag", "circlepin", "squarepin"], function(a) {
			u.prototype.symbols[a] = B[a]
		})
	})(L, Z);
	(function(a) {
		function E(a, b, c) {
			this.init(a, b, c)
		}
		var D = a.addEvent,
			F = a.Axis,
			t = a.correctFloat,
			l = a.defaultOptions,
			p = a.defined,
			z = a.destroyObjectProperties,
			q = a.each,
			u = a.fireEvent,
			B = a.hasTouch,
			e = a.isTouchDevice,
			h = a.merge,
			g = a.pick,
			c = a.removeEvent,
			b = a.wrap,
			w, m = {
				height: e ? 20 : 14,
				barBorderRadius: 0,
				buttonBorderRadius: 0,
				liveRedraw: a.svg && !e,
				margin: 10,
				minWidth: 6,
				step: .2,
				zIndex: 3,
				barBackgroundColor: "#cccccc",
				barBorderWidth: 1,
				barBorderColor: "#cccccc",
				buttonArrowColor: "#333333",
				buttonBackgroundColor: "#e6e6e6",
				buttonBorderColor: "#cccccc",
				buttonBorderWidth: 1,
				rifleColor: "#333333",
				trackBackgroundColor: "#f2f2f2",
				trackBorderColor: "#f2f2f2",
				trackBorderWidth: 1
			};
		l.scrollbar = h(!0, m, l.scrollbar);
		a.swapXY = w = function(a, b) {
			var c = a.length,
				e;
			if (b)
				for (b = 0; b < c; b += 3) e = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = e;
			return a
		};
		E.prototype = {
			init: function(a, b, c) {
				this.scrollbarButtons = [];
				this.renderer = a;
				this.userOptions = b;
				this.options = h(m, b);
				this.chart = c;
				this.size = g(this.options.size, this.options.height);
				b.enabled && (this.render(), this.initEvents(), this.addEvents())
			},
			render: function() {
				var a = this.renderer,
					b = this.options,
					c = this.size,
					e;
				this.group = e = a.g("scrollbar").attr({
					zIndex: b.zIndex,
					translateY: -99999
				}).add();
				this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
					x: 0,
					r: b.trackBorderRadius || 0,
					height: c,
					width: c
				}).add(e);
				this.track.attr({
					fill: b.trackBackgroundColor,
					stroke: b.trackBorderColor,
					"stroke-width": b.trackBorderWidth
				});
				this.trackBorderWidth = this.track.strokeWidth();
				this.track.attr({
					y: -this.trackBorderWidth % 2 / 2
				});
				this.scrollbarGroup = a.g().add(e);
				this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
					height: c,
					width: c,
					r: b.barBorderRadius || 0
				}).add(this.scrollbarGroup);
				this.scrollbarRifles = a.path(w(["M", -3, c / 4, "L", -3, 2 * c / 3, "M", 0, c / 4, "L", 0, 2 * c / 3, "M",
					3, c / 4, "L", 3, 2 * c / 3
				], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
				this.scrollbar.attr({
					fill: b.barBackgroundColor,
					stroke: b.barBorderColor,
					"stroke-width": b.barBorderWidth
				});
				this.scrollbarRifles.attr({
					stroke: b.rifleColor,
					"stroke-width": 1
				});
				this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
				this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
				this.drawScrollbarButton(0);
				this.drawScrollbarButton(1)
			},
			position: function(a, b, c, e) {
				var g = this.options.vertical,
					f = 0,
					h = this.rendered ? "animate" : "attr";
				this.x = a;
				this.y = b + this.trackBorderWidth;
				this.width = c;
				this.xOffset = this.height = e;
				this.yOffset = f;
				g ? (this.width = this.yOffset = c = f = this.size, this.xOffset = b = 0, this.barWidth = e - 2 * c, this.x = a += this.options.margin) : (this.height = this.xOffset = e = b = this.size, this.barWidth = c - 2 * e, this.y += this.options.margin);
				this.group[h]({
					translateX: a,
					translateY: this.y
				});
				this.track[h]({
					width: c,
					height: e
				});
				this.scrollbarButtons[1][h]({
					translateX: g ? 0 : c - b,
					translateY: g ? e - f : 0
				})
			},
			drawScrollbarButton: function(a) {
				var b = this.renderer,
					c = this.scrollbarButtons,
					e = this.options,
					g = this.size,
					f;
				f = b.g().add(this.group);
				c.push(f);
				f = b.rect().addClass("highcharts-scrollbar-button").add(f);
				f.attr({
					stroke: e.buttonBorderColor,
					"stroke-width": e.buttonBorderWidth,
					fill: e.buttonBackgroundColor
				});
				f.attr(f.crisp({
					x: -.5,
					y: -.5,
					width: g + 1,
					height: g + 1,
					r: e.buttonBorderRadius
				}, f.strokeWidth()));
				f = b.path(w(["M", g / 2 + (a ? -1 : 1), g / 2 - 3, "L", g / 2 + (a ? -1 : 1), g / 2 + 3, "L", g / 2 + (a ? 2 : -2), g / 2], e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
				f.attr({
					fill: e.buttonArrowColor
				})
			},
			setRange: function(a, b) {
				var c = this.options,
					e = c.vertical,
					g = c.minWidth,
					f = this.barWidth,
					h, l, m = this.rendered && !this.hasDragged ? "animate" : "attr";
				p(f) && (a = Math.max(a, 0), h = Math.ceil(f * a), this.calculatedWidth = l = t(f * Math.min(b, 1) - h), l < g && (h = (f - g + l) * a, l = g), g = Math.floor(h + this.xOffset + this.yOffset), f = l / 2 - .5, this.from = a, this.to = b, e ? (this.scrollbarGroup[m]({
					translateY: g
				}), this.scrollbar[m]({
					height: l
				}), this.scrollbarRifles[m]({
					translateY: f
				}), this.scrollbarTop = g, this.scrollbarLeft = 0) : (this.scrollbarGroup[m]({
					translateX: g
				}), this.scrollbar[m]({
					width: l
				}), this.scrollbarRifles[m]({
					translateX: f
				}), this.scrollbarLeft = g, this.scrollbarTop = 0), 12 >= l ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
			},
			initEvents: function() {
				var a = this;
				a.mouseMoveHandler = function(b) {
					var c = a.chart.pointer.normalize(b),
						e = a.options.vertical ? "chartY" : "chartX",
						g = a.initPositions;
					!a.grabbedCenter || b.touches && 0 === b.touches[0][e] || (c = a.cursorToScrollbarPosition(c)[e], e = a[e], e = c - e, a.hasDragged = !0, a.updatePosition(g[0] + e, g[1] + e), a.hasDragged && u(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMType: b.type,
						DOMEvent: b
					}))
				};
				a.mouseUpHandler = function(b) {
					a.hasDragged && u(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMType: b.type,
						DOMEvent: b
					});
					a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
				};
				a.mouseDownHandler = function(b) {
					b = a.chart.pointer.normalize(b);
					b = a.cursorToScrollbarPosition(b);
					a.chartX = b.chartX;
					a.chartY = b.chartY;
					a.initPositions = [a.from, a.to];
					a.grabbedCenter = !0
				};
				a.buttonToMinClick = function(b) {
					var c = t(a.to - a.from) * a.options.step;
					a.updatePosition(t(a.from - c), t(a.to - c));
					u(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				};
				a.buttonToMaxClick = function(b) {
					var c = (a.to - a.from) * a.options.step;
					a.updatePosition(a.from + c, a.to + c);
					u(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				};
				a.trackClick = function(b) {
					var c = a.chart.pointer.normalize(b),
						e = a.to - a.from,
						g = a.y + a.scrollbarTop,
						f = a.x + a.scrollbarLeft;
					a.options.vertical && c.chartY > g || !a.options.vertical && c.chartX > f ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
					u(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				}
			},
			cursorToScrollbarPosition: function(a) {
				var b = this.options,
					b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
				return {
					chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
					chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
				}
			},
			updatePosition: function(a, b) {
				1 < b && (a = t(1 - t(b - a)), b = 1);
				0 > a && (b = t(b - a), a = 0);
				this.from = a;
				this.to = b
			},
			update: function(a) {
				this.destroy();
				this.init(this.chart.renderer, h(!0, this.options, a), this.chart)
			},
			addEvents: function() {
				var a = this.options.inverted ? [1, 0] : [0, 1],
					b = this.scrollbarButtons,
					c = this.scrollbarGroup.element,
					e = this.mouseDownHandler,
					g = this.mouseMoveHandler,
					f = this.mouseUpHandler,
					a = [
						[b[a[0]].element, "click", this.buttonToMinClick],
						[b[a[1]].element, "click", this.buttonToMaxClick],
						[this.track.element, "click", this.trackClick],
						[c, "mousedown", e],
						[c.ownerDocument, "mousemove", g],
						[c.ownerDocument, "mouseup", f]
					];
				B && a.push([c, "touchstart", e], [c.ownerDocument, "touchmove", g], [c.ownerDocument, "touchend", f]);
				q(a, function(a) {
					D.apply(null, a)
				});
				this._events = a
			},
			removeEvents: function() {
				q(this._events, function(a) {
					c.apply(null, a)
				});
				this._events.length = 0
			},
			destroy: function() {
				var a = this.chart.scroller;
				this.removeEvents();
				q(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
					this[a] && this[a].destroy && (this[a] = this[a].destroy())
				}, this);
				a && this === a.scrollbar && (a.scrollbar = null, z(a.scrollbarButtons))
			}
		};
		b(F.prototype, "init", function(a) {
			var b = this;
			a.apply(b, Array.prototype.slice.call(arguments, 1));
			b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new E(b.chart.renderer, b.options.scrollbar, b.chart), D(b.scrollbar, "changed", function(a) {
				var c = Math.min(g(b.options.min, b.min), b.min, b.dataMin),
					e = Math.max(g(b.options.max, b.max), b.max, b.dataMax) - c,
					f;
				b.horiz && !b.reversed || !b.horiz && b.reversed ? (f = c + e * this.to, c += e * this.from) : (f = c + e * (1 - this.from), c += e * (1 - this.to));
				b.setExtremes(c, f, !0, !1, a)
			}))
		});
		b(F.prototype, "render", function(a) {
			var b = Math.min(g(this.options.min, this.min), this.min, g(this.dataMin, this.min)),
				c = Math.max(g(this.options.max, this.max), this.max, g(this.dataMax, this.max)),
				e = this.scrollbar,
				h = this.titleOffset || 0;
			a.apply(this, Array.prototype.slice.call(arguments, 1));
			if (e) {
				this.horiz ? (e.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : h + this.axisTitleMargin + this.offset), this.width, this.height), h = 1) : (e.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? h + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height), h = 0);
				if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[h] += this.scrollbar.size + this.scrollbar.options.margin;
				isNaN(b) || isNaN(c) || !p(this.min) || !p(this.max) ? e.setRange(0, 0) : (h = (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(h, b) : e.setRange(1 - b, 1 - h))
			}
		});
		b(F.prototype, "getOffset", function(a) {
			var b = this.horiz ? 2 : 1,
				c = this.scrollbar;
			a.apply(this, Array.prototype.slice.call(arguments, 1));
			c && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[b] += c.size + c.options.margin)
		});
		b(F.prototype, "destroy", function(a) {
			this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
			a.apply(this, Array.prototype.slice.call(arguments, 1))
		});
		a.Scrollbar = E
	})(L);
	(function(a) {
		function E(a) {
			this.init(a)
		}
		var D = a.addEvent,
			F = a.Axis,
			t = a.Chart,
			l = a.color,
			p = a.defaultOptions,
			z = a.defined,
			q = a.destroyObjectProperties,
			u = a.each,
			B = a.erase,
			e = a.error,
			h = a.extend,
			g = a.grep,
			c = a.hasTouch,
			b = a.isArray,
			w = a.isNumber,
			m = a.isObject,
			r = a.merge,
			C = a.pick,
			H = a.removeEvent,
			A = a.Scrollbar,
			K = a.Series,
			f = a.seriesTypes,
			x = a.wrap,
			J = [].concat(a.defaultDataGroupingUnits),
			v = function(a) {
				var b = g(arguments, w);
				if (b.length) return Math[a].apply(0, b)
			};
		J[4] = ["day", [1, 2, 3, 4]];
		J[5] = ["week", [1, 2, 3]];
		f = void 0 === f.areaspline ? "line" : "areaspline";
		h(p, {
			navigator: {
				height: 40,
				margin: 25,
				maskInside: !0,
				handles: {
					width: 7,
					height: 15,
					symbols: ["navigator-handle", "navigator-handle"],
					enabled: !0,
					lineWidth: 1,
					backgroundColor: "#f2f2f2",
					borderColor: "#999999"
				},
				maskFill: l("#6685c2").setOpacity(.3).get(),
				outlineColor: "#cccccc",
				outlineWidth: 1,
				series: {
					type: f,
					fillOpacity: .05,
					lineWidth: 1,
					compare: null,
					dataGrouping: {
						approximation: "average",
						enabled: !0,
						groupPixelWidth: 2,
						smoothed: !0,
						units: J
					},
					dataLabels: {
						enabled: !1,
						zIndex: 2
					},
					id: "highcharts-navigator-series",
					className: "highcharts-navigator-series",
					lineColor: null,
					marker: {
						enabled: !1
					},
					pointRange: 0,
					threshold: null
				},
				xAxis: {
					overscroll: 0,
					className: "highcharts-navigator-xaxis",
					tickLength: 0,
					lineWidth: 0,
					gridLineColor: "#e6e6e6",
					gridLineWidth: 1,
					tickPixelInterval: 200,
					labels: {
						align: "left",
						style: {
							color: "#999999"
						},
						x: 3,
						y: -4
					},
					crosshair: !1
				},
				yAxis: {
					className: "highcharts-navigator-yaxis",
					gridLineWidth: 0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: .1,
					maxPadding: .1,
					labels: {
						enabled: !1
					},
					crosshair: !1,
					title: {
						text: null
					},
					tickLength: 0,
					tickWidth: 0
				}
			}
		});
		a.Renderer.prototype.symbols["navigator-handle"] = function(a, b, c, f, e) {
			a = e.width / 2;
			b = Math.round(a / 3) + .5;
			e = e.height;
			return ["M", -a - 1, .5, "L", a, .5, "L", a, e + .5, "L", -a - 1, e + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, e - 3, "M", b - 1, 4, "L", b - 1, e - 3]
		};
		E.prototype = {
			drawHandle: function(a, b, c, f) {
				var d = this.navigatorOptions.handles.height;
				this.handles[b][f](c ? {
					translateX: Math.round(this.left + this.height / 2),
					translateY: Math.round(this.top + parseInt(a, 10) + .5 - d)
				} : {
					translateX: Math.round(this.left + parseInt(a, 10)),
					translateY: Math.round(this.top + this.height / 2 - d / 2 - 1)
				})
			},
			drawOutline: function(a, b, c, f) {
				var d = this.navigatorOptions.maskInside,
					e = this.outline.strokeWidth(),
					k = e / 2,
					e = e % 2 / 2,
					g = this.outlineHeight,
					h = this.scrollbarHeight,
					n = this.size,
					l = this.left - h,
					m = this.top;
				c ? (l -= k, c = m + b + e, b = m + a + e, a = ["M", l + g, m - h - e, "L", l + g, c, "L", l, c, "L", l, b, "L", l + g, b, "L", l + g, m + n + h].concat(d ? ["M", l + g, c - k, "L", l + g, b + k] : [])) : (a += l + h - e, b += l + h - e, m += k, a = ["M", l, m, "L", a, m, "L", a, m + g, "L", b, m + g, "L", b, m, "L", l + n + 2 * h, m].concat(d ? ["M", a - k, m, "L", b + k, m] : []));
				this.outline[f]({
					d: a
				})
			},
			drawMasks: function(a, b, c, f) {
				var d = this.left,
					e = this.top,
					k = this.height,
					g, h, n, l;
				c ? (n = [d, d, d], l = [e, e + a,
					e + b
				], h = [k, k, k], g = [a, b - a, this.size - b]) : (n = [d, d + a, d + b], l = [e, e, e], h = [a, b - a, this.size - b], g = [k, k, k]);
				u(this.shades, function(a, b) {
					a[f]({
						x: n[b],
						y: l[b],
						width: h[b],
						height: g[b]
					})
				})
			},
			renderElements: function() {
				var a = this,
					b = a.navigatorOptions,
					c = b.maskInside,
					f = a.chart,
					e = f.inverted,
					g = f.renderer,
					h;
				a.navigatorGroup = h = g.g("navigator").attr({
					zIndex: 8,
					visibility: "hidden"
				}).add();
				var l = {
					cursor: e ? "ns-resize" : "ew-resize"
				};
				u([!c, c, !c], function(d, c) {
					a.shades[c] = g.rect().addClass("highcharts-navigator-mask" + (1 === c ? "-inside" : "-outside")).attr({
						fill: d ? b.maskFill : "rgba(0,0,0,0)"
					}).css(1 === c && l).add(h)
				});
				a.outline = g.path().addClass("highcharts-navigator-outline").attr({
					"stroke-width": b.outlineWidth,
					stroke: b.outlineColor
				}).add(h);
				b.handles.enabled && u([0, 1], function(d) {
					b.handles.inverted = f.inverted;
					a.handles[d] = g.symbol(b.handles.symbols[d], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
					a.handles[d].attr({
						zIndex: 7 - d
					}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][d]).add(h);
					var c = b.handles;
					a.handles[d].attr({
						fill: c.backgroundColor,
						stroke: c.borderColor,
						"stroke-width": c.lineWidth
					}).css(l)
				})
			},
			update: function(a) {
				u(this.series || [], function(a) {
					a.baseSeries && delete a.baseSeries.navigatorSeries
				});
				this.destroy();
				r(!0, this.chart.options.navigator, this.options, a);
				this.init(this.chart)
			},
			render: function(b, c, f, e) {
				var d = this.chart,
					k, g, h = this.scrollbarHeight,
					l, n = this.xAxis;
				k = n.fake ? d.xAxis[0] : n;
				var m = this.navigatorEnabled,
					p, q = this.rendered;
				g = d.inverted;
				var r, t = d.xAxis[0].minRange,
					v = d.xAxis[0].options.maxRange;
				if (!this.hasDragged || z(f)) {
					if (!w(b) || !w(c))
						if (q) f = 0, e = n.width;
						else return;
					this.left = C(n.left, d.plotLeft + h + (g ? d.plotWidth : 0));
					this.size = p = l = C(n.len, (g ? d.plotHeight : d.plotWidth) - 2 * h);
					d = g ? h : l + 2 * h;
					f = C(f, n.toPixels(b, !0));
					e = C(e, n.toPixels(c, !0));
					w(f) && Infinity !== Math.abs(f) || (f = 0, e = d);
					b = n.toValue(f, !0);
					c = n.toValue(e, !0);
					r = Math.abs(a.correctFloat(c - b));
					r < t ? this.grabbedLeft ? f = n.toPixels(c - t, !0) : this.grabbedRight && (e = n.toPixels(b + t, !0)) : z(v) && r > v && (this.grabbedLeft ? f = n.toPixels(c - v, !0) : this.grabbedRight && (e = n.toPixels(b + v, !0)));
					this.zoomedMax = Math.min(Math.max(f, e, 0), p);
					this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(f, e), 0), p);
					this.range = this.zoomedMax - this.zoomedMin;
					p = Math.round(this.zoomedMax);
					f = Math.round(this.zoomedMin);
					m && (this.navigatorGroup.attr({
						visibility: "visible"
					}), q = q && !this.hasDragged ? "animate" : "attr", this.drawMasks(f, p, g, q), this.drawOutline(f, p, g, q), this.navigatorOptions.handles.enabled && (this.drawHandle(f, 0, g, q), this.drawHandle(p, 1, g, q)));
					this.scrollbar && (g ? (g = this.top - h, k = this.left - h + (m || !k.opposite ? 0 : (k.titleOffset || 0) + k.axisTitleMargin), h = l + 2 * h) : (g = this.top + (m ? this.height : -h), k = this.left - h), this.scrollbar.position(k, g, d, h), this.scrollbar.setRange(this.zoomedMin / l, this.zoomedMax / l));
					this.rendered = !0
				}
			},
			addMouseEvents: function() {
				var a = this,
					b = a.chart,
					f = b.container,
					e = [],
					g, h;
				a.mouseMoveHandler = g = function(b) {
					a.onMouseMove(b)
				};
				a.mouseUpHandler = h = function(b) {
					a.onMouseUp(b)
				};
				e = a.getPartsEvents("mousedown");
				e.push(D(f, "mousemove", g), D(f.ownerDocument, "mouseup", h));
				c && (e.push(D(f, "touchmove", g), D(f.ownerDocument, "touchend", h)), e.concat(a.getPartsEvents("touchstart")));
				a.eventsToUnbind = e;
				a.series && a.series[0] && e.push(D(a.series[0].xAxis, "foundExtremes", function() {
					b.navigator.modifyNavigatorAxisExtremes()
				}))
			},
			getPartsEvents: function(a) {
				var b = this,
					d = [];
				u(["shades", "handles"], function(c) {
					u(b[c], function(f, e) {
						d.push(D(f.element, a, function(a) {
							b[c + "Mousedown"](a, e)
						}))
					})
				});
				return d
			},
			shadesMousedown: function(a, b) {
				a = this.chart.pointer.normalize(a);
				var d = this.chart,
					c = this.xAxis,
					f = this.zoomedMin,
					e = this.left,
					g = this.size,
					h = this.range,
					l = a.chartX,
					n;
				d.inverted && (l = a.chartY, e = this.top);
				1 === b ? (this.grabbedCenter = l, this.fixedWidth = h, this.dragOffset = l - f) : (a = l - e - h / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + h >= g && (a = g - h, n = this.getUnionExtremes().dataMax), a !== f && (this.fixedWidth = h, b = c.toFixedRange(a, a + h, null, n), d.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
					trigger: "navigator"
				})))
			},
			handlesMousedown: function(a, b) {
				this.chart.pointer.normalize(a);
				a = this.chart;
				var d = a.xAxis[0],
					c = a.inverted && !d.reversed || !a.inverted && d.reversed;
				0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = c ? d.min : d.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = c ? d.max : d.min);
				a.fixedRange = null
			},
			onMouseMove: function(a) {
				var b = this,
					d = b.chart,
					c = b.left,
					f = b.navigatorSize,
					e = b.range,
					g = b.dragOffset,
					h = d.inverted;
				a.touches && 0 === a.touches[0].pageX || (a = d.pointer.normalize(a), d = a.chartX, h && (c = b.top, d = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, d - c, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, d - c)) : b.grabbedCenter && (b.hasDragged = !0, d < g ? d = g : d > f + g - e && (d = f + g - e), b.render(0, 0, d - g, d - g + e)), b.hasDragged && b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type, setTimeout(function() {
					b.onMouseUp(a)
				}, 0)))
			},
			onMouseUp: function(a) {
				var b = this.chart,
					d = this.xAxis,
					c = this.scrollbar,
					f, e, g = a.DOMEvent || a;
				(!this.hasDragged || c && c.hasDragged) && "scrollbar" !== a.trigger || (this.zoomedMin === this.otherHandlePos ? f = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (e = this.fixedExtreme), this.zoomedMax === this.size && (e = this.getUnionExtremes().dataMax), d = d.toFixedRange(this.zoomedMin, this.zoomedMax, f, e), z(d.min) && b.xAxis[0].setExtremes(Math.min(d.min, d.max), Math.max(d.min, d.max), !0, this.hasDragged ? !1 : null, {
					trigger: "navigator",
					triggerOp: "navigator-drag",
					DOMEvent: g
				}));
				"mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
			},
			removeEvents: function() {
				this.eventsToUnbind && (u(this.eventsToUnbind, function(a) {
					a()
				}), this.eventsToUnbind = void 0);
				this.removeBaseSeriesEvents()
			},
			removeBaseSeriesEvents: function() {
				var a = this.baseSeries || [];
				this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && u(a, function(a) {
					H(a, "updatedData", this.updatedDataHandler)
				}, this), a[0].xAxis && H(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
			},
			init: function(a) {
				var b = a.options,
					d = b.navigator,
					c = d.enabled,
					f = b.scrollbar,
					e = f.enabled,
					b = c ? d.height : 0,
					g = e ? f.height : 0;
				this.handles = [];
				this.shades = [];
				this.chart = a;
				this.setBaseSeries();
				this.height = b;
				this.scrollbarHeight = g;
				this.scrollbarEnabled = e;
				this.navigatorEnabled = c;
				this.navigatorOptions = d;
				this.scrollbarOptions = f;
				this.outlineHeight = b + g;
				this.opposite = C(d.opposite, !c && a.inverted);
				var h = this,
					f = h.baseSeries,
					e = a.xAxis.length,
					l = a.yAxis.length,
					m = f && f[0] && f[0].xAxis || a.xAxis[0];
				a.extraMargin = {
					type: h.opposite ? "plotTop" : "marginBottom",
					value: (c || !a.inverted ? h.outlineHeight : 0) + d.margin
				};
				a.inverted && (a.extraMargin.type = h.opposite ? "marginRight" : "plotLeft");
				a.isDirtyBox = !0;
				h.navigatorEnabled ? (h.xAxis = new F(a, r({
					breaks: m.options.breaks,
					ordinal: m.options.ordinal
				}, d.xAxis, {
					id: "navigator-x-axis",
					yAxis: "navigator-y-axis",
					isX: !0,
					type: "datetime",
					index: e,
					offset: 0,
					keepOrdinalPadding: !0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: 0,
					maxPadding: 0,
					zoomEnabled: !1
				}, a.inverted ? {
					offsets: [g, 0, -g, 0],
					width: b
				} : {
					offsets: [0, -g, 0, g],
					height: b
				})), h.yAxis = new F(a, r(d.yAxis, {
					id: "navigator-y-axis",
					alignTicks: !1,
					offset: 0,
					index: l,
					zoomEnabled: !1
				}, a.inverted ? {
					width: b
				} : {
					height: b
				})), f || d.series.data ? h.updateNavigatorSeries() : 0 === a.series.length && x(a, "redraw", function(b, d) {
					0 < a.series.length && !h.series && (h.setBaseSeries(), a.redraw = b);
					b.call(a, d)
				}), h.renderElements(), h.addMouseEvents()) : h.xAxis = {
					translate: function(b, d) {
						var c = a.xAxis[0],
							f = c.getExtremes(),
							e = c.len - 2 * g,
							k = v("min", c.options.min, f.dataMin),
							c = v("max", c.options.max, f.dataMax) - k;
						return d ? b * c / e + k : e * (b - k) / c
					},
					toPixels: function(a) {
						return this.translate(a)
					},
					toValue: function(a) {
						return this.translate(a, !0)
					},
					toFixedRange: F.prototype.toFixedRange,
					fake: !0
				};
				a.options.scrollbar.enabled && (a.scrollbar = h.scrollbar = new A(a.renderer, r(a.options.scrollbar, {
					margin: h.navigatorEnabled ? 0 : 10,
					vertical: a.inverted
				}), a), D(h.scrollbar, "changed", function(b) {
					var d = h.size,
						c = d * this.to,
						d = d * this.from;
					h.hasDragged = h.scrollbar.hasDragged;
					h.render(0, 0, d, c);
					(a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function() {
						h.onMouseUp(b)
					})
				}));
				h.addBaseSeriesEvents();
				h.addChartEvents()
			},
			getUnionExtremes: function(a) {
				var b = this.chart.xAxis[0],
					d = this.xAxis,
					c = d.options,
					f = b.options,
					e;
				a && null === b.dataMin || (e = {
					dataMin: C(c && c.min, v("min", f.min, b.dataMin, d.dataMin, d.min)),
					dataMax: C(c && c.max, v("max", f.max, b.dataMax, d.dataMax, d.max))
				});
				return e
			},
			setBaseSeries: function(a, b) {
				var d = this.chart,
					c = this.baseSeries = [];
				a = a || d.options && d.options.navigator.baseSeries || 0;
				u(d.series || [], function(b, d) {
					b.options.isInternal || !b.options.showInNavigator && (d !== a && b.options.id !== a || !1 === b.options.showInNavigator) || c.push(b)
				});
				this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(b)
			},
			updateNavigatorSeries: function(d) {
				var c = this,
					f = c.chart,
					e = c.baseSeries,
					g, l, m = c.navigatorOptions.series,
					q, t = {
						enableMouseTracking: !1,
						index: null,
						linkedTo: null,
						group: "nav",
						padXAxis: !1,
						xAxis: "navigator-x-axis",
						yAxis: "navigator-y-axis",
						showInLegend: !1,
						stacking: !1,
						isInternal: !0,
						visible: !0
					},
					v = c.series = a.grep(c.series || [], function(b) {
						var d = b.baseSeries;
						return 0 > a.inArray(d, e) ? (d && (H(d, "updatedData", c.updatedDataHandler), delete d.navigatorSeries), b.destroy(), !1) : !0
					});
				e && e.length && u(e, function(a) {
					var k = a.navigatorSeries,
						n = h({
							color: a.color
						}, b(m) ? p.navigator.series : m);
					k && !1 === c.navigatorOptions.adaptToUpdatedData || (t.name = "Navigator " + e.length, g = a.options || {}, q = g.navigatorOptions || {}, l = r(g, t, n, q), n = q.data || n.data, c.hasNavigatorData = c.hasNavigatorData || !!n, l.data = n || g.data && g.data.slice(0), k && k.options ? k.update(l, d) : (a.navigatorSeries = f.initSeries(l), a.navigatorSeries.baseSeries = a, v.push(a.navigatorSeries)))
				});
				if (m.data && (!e || !e.length) || b(m)) c.hasNavigatorData = !1, m = a.splat(m),
					u(m, function(a, b) {
						t.name = "Navigator " + (v.length + 1);
						l = r(p.navigator.series, {
							color: f.series[b] && !f.series[b].options.isInternal && f.series[b].color || f.options.colors[b] || f.options.colors[0]
						}, t, a);
						l.data = a.data;
						l.data && (c.hasNavigatorData = !0, v.push(f.initSeries(l)))
					});
				this.addBaseSeriesEvents()
			},
			addBaseSeriesEvents: function() {
				var a = this,
					b = a.baseSeries || [];
				b[0] && b[0].xAxis && D(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
				u(b, function(b) {
					D(b, "show", function(a) {
						this.navigatorSeries && this.navigatorSeries.setVisible(!0, a.redraw)
					});
					D(b, "hide", function(a) {
						this.navigatorSeries && this.navigatorSeries.setVisible(!1, a.redraw)
					});
					!1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && D(b, "updatedData", this.updatedDataHandler);
					D(b, "remove", function() {
						this.navigatorSeries && (B(a.series, this.navigatorSeries), this.navigatorSeries.remove(!1), delete this.navigatorSeries)
					})
				}, this)
			},
			modifyNavigatorAxisExtremes: function() {
				var a = this.xAxis,
					b;
				a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
			},
			modifyBaseAxisExtremes: function() {
				var a = this.chart.navigator,
					b = this.getExtremes(),
					c = b.dataMin,
					f = b.dataMax,
					b = b.max - b.min,
					e = a.stickToMin,
					g = a.stickToMax,
					h = this.options.overscroll,
					l, m, p = a.series && a.series[0],
					q = !!this.setExtremes;
				this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (e && (m = c, l = m + b), g && (l = f + h, e || (m = Math.max(l - b, p && p.xData ? p.xData[0] : -Number.MAX_VALUE))), q && (e || g) && w(m) && (this.min = this.userMin = m, this.max = this.userMax = l));
				a.stickToMin = a.stickToMax = null
			},
			updatedDataHandler: function() {
				var a = this.chart.navigator,
					b = this.navigatorSeries;
				a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size);
				a.stickToMin = w(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax);
				b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
			},
			addChartEvents: function() {
				D(this.chart, "redraw", function() {
					var a = this.navigator,
						b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
					b && a.render(b.min, b.max)
				})
			},
			destroy: function() {
				this.removeEvents();
				this.xAxis && (B(this.chart.xAxis, this.xAxis), B(this.chart.axes, this.xAxis));
				this.yAxis && (B(this.chart.yAxis, this.yAxis), B(this.chart.axes, this.yAxis));
				u(this.series || [], function(a) {
					a.destroy && a.destroy()
				});
				u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
					this[a] && this[a].destroy && this[a].destroy();
					this[a] = null
				}, this);
				u([this.handles], function(a) {
					q(a)
				}, this)
			}
		};
		a.Navigator = E;
		x(F.prototype, "zoom", function(a, b, c) {
			var d = this.chart,
				f = d.options,
				e = f.chart.zoomType,
				g = f.navigator,
				f = f.rangeSelector,
				h;
			this.isXAxis && (g && g.enabled || f && f.enabled) && ("x" === e ? d.resetZoomButton = "blocked" : "y" === e ? h = !1 : "xy" === e && (d = this.previousZoom, z(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
			return void 0 !== h ? h : a.call(this, b, c)
		});
		x(t.prototype, "init", function(a, b, c) {
			D(this, "beforeRender", function() {
				var a = this.options;
				if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new E(this)
			});
			a.call(this, b, c)
		});
		x(t.prototype, "setChartSize", function(a) {
			var b = this.legend,
				d = this.navigator,
				c, f, e, g;
			a.apply(this, [].slice.call(arguments, 1));
			d && (f = b && b.options, e = d.xAxis, g = d.yAxis, c = d.scrollbarHeight, this.inverted ? (d.left = d.opposite ? this.chartWidth - c - d.height : this.spacing[3] + c, d.top = this.plotTop + c) : (d.left = this.plotLeft + c, d.top = d.navigatorOptions.top || this.chartHeight - d.height - c - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (f && "bottom" === f.verticalAlign && f.enabled && !f.floating ? b.legendHeight + C(f.margin, 10) : 0)), e && g && (this.inverted ? e.options.left = g.options.left = d.left : e.options.top = g.options.top = d.top, e.setAxisSize(), g.setAxisSize()))
		});
		x(K.prototype, "addPoint", function(a, b, c, f, g) {
			var d = this.options.turboThreshold;
			d && this.xData.length > d && m(b, !0) && this.chart.navigator && e(20, !0);
			a.call(this, b, c, f, g)
		});
		x(t.prototype, "addSeries", function(a, b, c, f) {
			a = a.call(this, b, !1, f);
			this.navigator && this.navigator.setBaseSeries(null, !1);
			C(c, !0) && this.redraw();
			return a
		});
		x(K.prototype, "update", function(a, b, c) {
			a.call(this, b, !1);
			this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
			C(c, !0) && this.chart.redraw()
		});
		t.prototype.callbacks.push(function(a) {
			var b = a.navigator;
			b && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
		})
	})(L);
	(function(a) {
		function E(a) {
			this.init(a)
		}
		var D = a.addEvent,
			F = a.Axis,
			t = a.Chart,
			l = a.css,
			p = a.createElement,
			z = a.dateFormat,
			q = a.defaultOptions,
			u = q.global.useUTC,
			B = a.defined,
			e = a.destroyObjectProperties,
			h = a.discardElement,
			g = a.each,
			c = a.extend,
			b = a.fireEvent,
			w = a.Date,
			m = a.isNumber,
			r = a.merge,
			C = a.pick,
			H = a.pInt,
			A = a.splat,
			K = a.wrap;
		c(q, {
			rangeSelector: {
				verticalAlign: "top",
				buttonTheme: {
					"stroke-width": 0,
					width: 28,
					height: 18,
					padding: 2,
					zIndex: 7
				},
				floating: !1,
				x: 0,
				y: 0,
				height: void 0,
				inputPosition: {
					align: "right",
					x: 0,
					y: 0
				},
				buttonPosition: {
					align: "left",
					x: 0,
					y: 0
				},
				labelStyle: {
					color: "#666666"
				}
			}
		});
		q.lang = r(q.lang, {
			rangeSelectorZoom: "Zoom",
			rangeSelectorFrom: "From",
			rangeSelectorTo: "To"
		});
		E.prototype = {
			clickButton: function(a, b) {
				var c = this,
					f = c.chart,
					d = c.buttonOptions[a],
					e = f.xAxis[0],
					h = f.scroller && f.scroller.getUnionExtremes() || e || {},
					k = h.dataMin,
					l = h.dataMax,
					p, q = e && Math.round(Math.min(e.max, C(l, e.max))),
					r = d.type,
					t, h = d._range,
					x, w, z, B = d.dataGrouping;
				if (null !== k && null !== l) {
					f.fixedRange = h;
					B && (this.forcedDataGrouping = !0, F.prototype.setDataGrouping.call(e || {
						chart: this.chart
					}, B, !1));
					if ("month" === r || "year" === r) e ? (r = {
						range: d,
						max: q,
						dataMin: k,
						dataMax: l
					}, p = e.minFromRange.call(r), m(r.newMax) && (q = r.newMax)) : h = d;
					else if (h) p = Math.max(q - h, k), q = Math.min(p + h, l);
					else if ("ytd" === r)
						if (e) void 0 === l && (k = Number.MAX_VALUE, l = Number.MIN_VALUE, g(f.series, function(a) {
							a = a.xData;
							k = Math.min(a[0], k);
							l = Math.max(a[a.length - 1], l)
						}), b = !1), q = c.getYTDExtremes(l, k, u), p = x = q.min, q = q.max;
						else {
							D(f, "beforeRender", function() {
								c.clickButton(a)
							});
							return
						}
					else "all" === r && e && (p = k, q = l);
					p += d._offsetMin;
					q += d._offsetMax;
					c.setSelected(a);
					e ? e.setExtremes(p, q, C(b, 1), null, {
						trigger: "rangeSelectorButton",
						rangeSelectorButton: d
					}) : (t = A(f.options.xAxis)[0], z = t.range, t.range = h, w = t.min, t.min = x, D(f, "load", function() {
						t.range = z;
						t.min = w
					}))
				}
			},
			setSelected: function(a) {
				this.selected = this.options.selected = a
			},
			defaultButtons: [{
				type: "month",
				count: 1,
				text: "1m"
			}, {
				type: "month",
				count: 3,
				text: "3m"
			}, {
				type: "month",
				count: 6,
				text: "6m"
			}, {
				type: "ytd",
				text: "YTD"
			}, {
				type: "year",
				count: 1,
				text: "1y"
			}, {
				type: "all",
				text: "All"
			}],
			init: function(a) {
				var c = this,
					f = a.options.rangeSelector,
					e = f.buttons || [].concat(c.defaultButtons),
					d = f.selected,
					h = function() {
						var a = c.minInput,
							d = c.maxInput;
						a && a.blur && b(a, "blur");
						d && d.blur && b(d, "blur")
					};
				c.chart = a;
				c.options = f;
				c.buttons = [];
				a.extraTopMargin = f.height;
				c.buttonOptions = e;
				this.unMouseDown = D(a.container, "mousedown", h);
				this.unResize = D(a, "resize", h);
				g(e, c.computeButtonRange);
				void 0 !== d && e[d] && this.clickButton(d, !1);
				D(a, "load", function() {
					a.xAxis && a.xAxis[0] && D(a.xAxis[0], "setExtremes", function(b) {
						this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== b.trigger && "updatedData" !== b.trigger && c.forcedDataGrouping && this.setDataGrouping(!1, !1)
					})
				})
			},
			updateButtonStates: function() {
				var a = this.chart,
					b = a.xAxis[0],
					c = Math.round(b.max - b.min),
					e = !b.hasVisibleSeries,
					a = a.scroller && a.scroller.getUnionExtremes() || b,
					d = a.dataMin,
					h = a.dataMax,
					a = this.getYTDExtremes(h, d, u),
					l = a.min,
					k = a.max,
					p = this.selected,
					q = m(p),
					r = this.options.allButtonsEnabled,
					t = this.buttons;
				g(this.buttonOptions, function(a, f) {
					var g = a._range,
						m = a.type,
						n = a.count || 1,
						v = t[f],
						u = 0;
					a = a._offsetMax - a._offsetMin;
					f = f === p;
					var x = g > h - d,
						y = g < b.minRange,
						w = !1,
						z = !1,
						g = g === c;
					("month" === m || "year" === m) && c >= 864E5 * {
						month: 28,
						year: 365
					}[m] * n + a && c <= 864E5 * {
						month: 31,
						year: 366
					}[m] * n + a ? g = !0 : "ytd" === m ? (g = k - l + a === c, w = !f) : "all" === m && (g = b.max - b.min >= h - d, z = !f && q && g);
					m = !r && (x || y || z || e);
					n = f && g || g && !q && !w;
					m ? u = 3 : n && (q = !0, u = 2);
					v.state !== u && v.setState(u)
				})
			},
			computeButtonRange: function(a) {
				var b = a.type,
					c = a.count || 1,
					f = {
						millisecond: 1,
						second: 1E3,
						minute: 6E4,
						hour: 36E5,
						day: 864E5,
						week: 6048E5
					};
				if (f[b]) a._range = f[b] * c;
				else if ("month" === b || "year" === b) a._range = 864E5 * {
					month: 30,
					year: 365
				}[b] * c;
				a._offsetMin = C(a.offsetMin, 0);
				a._offsetMax = C(a.offsetMax, 0);
				a._range += a._offsetMax - a._offsetMin
			},
			setInputValue: function(a, b) {
				var c = this.chart.options.rangeSelector,
					f = this[a + "Input"];
				B(b) && (f.previousValue = f.HCTime, f.HCTime = b);
				f.value = z(c.inputEditDateFormat || "%Y-%m-%d", f.HCTime);
				this[a + "DateBox"].attr({
					text: z(c.inputDateFormat || "%b %e, %Y", f.HCTime)
				})
			},
			showInput: function(a) {
				var b = this.inputGroup,
					c = this[a + "DateBox"];
				l(this[a + "Input"], {
					left: "195px",
					top: "265px",
//					width: c.width - 2 + "px",
//					height: c.height - 2 + "px",
					width:  "20px",
					height: "20px",
					border: "2px solid silver"
				})
			},
			hideInput: function(a) {
				l(this[a + "Input"], {
					border: 0,
					width: "0px",
					height:"0px"
				});
				this.setInputValue(a)
			},
			drawInput: function(a) {
				function b() {
					var a = w.value,
						b = (h.inputDateParser || Date.parse)(a),
						d = e.xAxis[0],
						c = e.scroller && e.scroller.xAxis ? e.scroller.xAxis : d,
						g = c.dataMin,
						c = c.dataMax;
					b !== w.previousValue && (w.previousValue = b, m(b) || (b = a.split("-"), b = Date.UTC(H(b[0]), H(b[1]) - 1, H(b[2]))), m(b) && (u || (b += 6E4 * (new Date).getTimezoneOffset()), t ? b > f.maxInput.HCTime ? b = void 0 : b < g && (b = g) : b < f.minInput.HCTime ? b = void 0 : b > c && (b = c), void 0 !== b && d.setExtremes(t ? b : d.min, t ? d.max : b, void 0, void 0, {
						trigger: "rangeSelectorInput"
					})))
				}
				var f = this,
					e = f.chart,
					d = e.renderer.style || {},
					g = e.renderer,
					h = e.options.rangeSelector,
					k = f.div,
					t = "min" === a,
					w, z, A = this.inputGroup;
				this[a + "Label"] = z = g.label(q.lang[t ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
					padding: 2
				}).add(A);
				A.offset += z.width + 5;
				this[a + "DateBox"] = g = g.label("", A.offset).addClass("highcharts-range-input").attr({
					padding: 2,
					width: h.inputBoxWidth || 90,
					height: h.inputBoxHeight || 17,
					stroke: h.inputBoxBorderColor || "#cccccc",
					"stroke-width": 1,
					"text-align": "center"
				}).on("click", function() {
					f.showInput(a);
					f[a + "Input"].focus()
				}).add(A);
				A.offset += g.width + (t ? 10 : 0);
				this[a + "Input"] = w = p("input", {
					name: a,
					className: "highcharts-range-selector",
					type: "text"
				}, {
					top: e.plotTop + "px"
				}, k);
				z.css(r(d, h.labelStyle));
				g.css(r({
					color: "#333333"
				}, d, h.inputStyle));
				l(w, c({
					top: "290px",
					position: "relative",
					border: 0,
					width: "0px",
					height: "0px",
					padding: 0,
					textAlign: "center",
					fontSize: d.fontSize,
					fontFamily: d.fontFamily,
					left: "260px",
				}, h.inputStyle));
				w.onfocus = function() {
					f.showInput(a)
				};
				w.onblur = function() {
					f.hideInput(a)
				};
				w.onchange = b;
				w.onkeypress = function(a) {
					13 === a.keyCode && b()
				}
			},
			getPosition: function() {
				var a = this.chart,
					b = a.options.rangeSelector,
					a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
				return {
					buttonTop: a + b.buttonPosition.y,
					inputTop: a + b.inputPosition.y - 10
				}
			},
			getYTDExtremes: function(a, b, c) {
				var f = new w(a),
					d = f[w.hcGetFullYear]();
				c = c ? w.UTC(d, 0, 1) : +new w(d, 0, 1);
				b = Math.max(b || 0, c);
				f = f.getTime();
				return {
					max: Math.min(a || f, f),
					min: b
				}
			},
			render: function(a, b) {
				var c = this,
					f = c.chart,
					d = f.renderer,
					e = f.container,
					h = f.options,
					k = h.exporting && !1 !== h.exporting.enabled && h.navigation && h.navigation.buttonOptions,
					l = q.lang,
					m = c.div,
					r = h.rangeSelector,
					h = r.floating,
					t = c.buttons,
					m = c.inputGroup,
					u = r.buttonTheme,
					x = r.buttonPosition,
					w = r.inputPosition,
					z = r.inputEnabled,
					A = u && u.states,
					B = f.plotLeft,
					D, E = c.buttonGroup,
					F;
				F = c.rendered;
				var H = c.options.verticalAlign,
					K = f.legend,
					L = K && K.options,
					Y = x.y,
					X = w.y,
					Q = F || !1,
					T = 0,
					U = 0,
					V;
				if (!1 !== r.enabled) {
					F || (c.group = F = d.g("range-selector-group").attr({
						zIndex: 7
					}).add(), c.buttonGroup = E = d.g("range-selector-buttons").add(F), c.zoomText = d.text(l.rangeSelectorZoom, C(B + x.x, B), 15).css(r.labelStyle).add(E), D = C(B + x.x, B) + c.zoomText.getBBox().width + 5, g(c.buttonOptions, function(a, b) {
						t[b] = d.button(a.text, D, 0, function() {
							var d = a.events && a.events.click,
								f;
							d && (f = d.call(a));
							!1 !== f && c.clickButton(b);
							c.isActive = !0
						}, u, A && A.hover, A && A.select, A && A.disabled).attr({
							"text-align": "center"
						}).add(E);
						D += t[b].width + C(r.buttonSpacing, 5)
					}), !1 !== z && (c.div = m = p("div", null, {
						position: "relative",
						height: 0,
						zIndex: 1
					}), e.parentNode.insertBefore(m, e), c.inputGroup = m = d.g("input-group").add(F), m.offset = 0, c.drawInput("min"), c.drawInput("max")));
					B = f.plotLeft - f.spacing[3];
					c.updateButtonStates();
					k && this.titleCollision(f) && "top" === H && "right" === x.align && x.y + E.getBBox().height - 12 < (k.y || 0) + k.height && (T = -40);
					"left" === x.align ? V = x.x - f.spacing[3] : "right" === x.align && (V = x.x + T - f.spacing[1]);
					E.align({
						y: x.y,
						width: E.getBBox().width,
						align: x.align,
						x: V
					}, !0, f.spacingBox);
					c.group.placed = Q;
					c.buttonGroup.placed = Q;
					!1 !== z && (T = k && this.titleCollision(f) && "top" === H && "right" === w.align && w.y - m.getBBox().height - 12 < (k.y || 0) + k.height + f.spacing[0] ? -40 : 0, "left" === w.align ? V = B : "right" === w.align && (V = -Math.max(f.axisOffset[1], -T)), m.align({
						y: w.y,
						width: m.getBBox().width,
						align: w.align,
						x: w.x + V - 2
					}, !0, f.spacingBox), e = m.alignAttr.translateX + m.alignOptions.x - T + m.getBBox().x + 2, k = m.alignOptions.width, l = E.alignAttr.translateX + E.getBBox().x, V = E.getBBox().width + 20, (w.align === x.align || l + V > e && e + k > l && Y < X + m.getBBox().height) && m.attr({
						translateX: m.alignAttr.translateX + (f.axisOffset[1] >= -T ? 0 : -T),
						translateY: m.alignAttr.translateY + E.getBBox().height + 10
					}), c.setInputValue("min", a), c.setInputValue("max", b), c.inputGroup.placed = Q);
					c.group.align({
						verticalAlign: H
					}, !0, f.spacingBox);
					a = c.group.getBBox().height + 20;
					b = c.group.alignAttr.translateY;
					"bottom" === H && (K = L && "bottom" === L.verticalAlign && L.enabled && !L.floating ? K.legendHeight + C(L.margin, 10) : 0, a = a + K - 20, U = b - a - (h ? 0 : r.y) - 10);
					if ("top" === H) h && (U = 0), f.titleOffset && (U = f.titleOffset + f.options.title.margin), U += f.margin[0] - f.spacing[0] || 0;
					else if ("middle" === H)
						if (X === Y) U = 0 > X ? b + void 0 : b;
						else if (X || Y) U = 0 > X || 0 > Y ? U - Math.min(X, Y) : b - a + NaN;
					c.group.translate(r.x, r.y + Math.floor(U));
					!1 !== z && (c.minInput.style.marginTop = c.group.translateY + "px", c.maxInput.style.marginTop = c.group.translateY + "px");
					c.rendered = !0
				}
			},
			getHeight: function() {
				var a = this.options,
					b = this.group,
					c = a.y,
					e = a.buttonPosition.y,
					a = a.inputPosition.y,
					b = b ? b.getBBox(!0).height + 13 + c : 0,
					c = Math.min(a, e);
				if (0 > a && 0 > e || 0 < a && 0 < e) b += Math.abs(c);
				return b
			},
			titleCollision: function(a) {
				return !(a.options.title.text || a.options.subtitle.text)
			},
			update: function(a) {
				var b = this.chart;
				r(!0, b.options.rangeSelector, a);
				this.destroy();
				this.init(b);
				b.rangeSelector.render()
			},
			destroy: function() {
				var b = this,
					c = b.minInput,
					g = b.maxInput;
				b.unMouseDown();
				b.unResize();
				e(b.buttons);
				c && (c.onfocus = c.onblur = c.onchange = null);
				g && (g.onfocus = g.onblur = g.onchange = null);
				a.objectEach(b, function(a, c) {
					a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && h(this[c]));
					a !== E.prototype[c] && (b[c] = null)
				}, this)
			}
		};
		F.prototype.toFixedRange = function(a, b, c, e) {
			var d = this.chart && this.chart.fixedRange;
			a = C(c, this.translate(a, !0, !this.horiz));
			b = C(e, this.translate(b, !0, !this.horiz));
			c = d && (b - a) / d;
			.7 < c && 1.3 > c && (e ? a = b - d : b = a + d);
			m(a) || (a = b = void 0);
			return {
				min: a,
				max: b
			}
		};
		F.prototype.minFromRange = function() {
			var a = this.range,
				b = {
					month: "Month",
					year: "FullYear"
				}[a.type],
				c, e = this.max,
				d, g, h = function(a, c) {
					var d = new Date(a),
						e = d["get" + b]();
					d["set" + b](e + c);
					e === d["get" + b]() && d.setDate(0);
					return d.getTime() - a
				};
			m(a) ? (c = e - a, g = a) : (c = e + h(e, -a.count), this.chart && (this.chart.fixedRange = e - c));
			d = C(this.dataMin, Number.MIN_VALUE);
			m(c) || (c = d);
			c <= d && (c = d, void 0 === g && (g = h(c, a.count)), this.newMax = Math.min(c + g, this.dataMax));
			m(e) || (c = void 0);
			return c
		};
		K(t.prototype, "init", function(a, b, c) {
			D(this, "init", function() {
				this.options.rangeSelector.enabled && (this.rangeSelector = new E(this))
			});
			a.call(this, b, c)
		});
		K(t.prototype, "render", function(a, b, c) {
			var e = this.axes,
				d = this.rangeSelector;
			d && (g(e, function(a) {
				a.updateNames();
				a.setScale()
			}), this.getAxisMargins(), d.render(), e = d.options.verticalAlign, d.options.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)));
			a.call(this, b, c)
		});
		K(t.prototype, "update", function(b, c, e, g) {
			var d = this.rangeSelector,
				f;
			this.extraTopMargin = this.extraBottomMargin = !1;
			d && (d.render(), f = c.rangeSelector && c.rangeSelector.verticalAlign || d.options && d.options.verticalAlign, d.options.floating || ("bottom" === f ? this.extraBottomMargin = !0 : "middle" !== f && (this.extraTopMargin = !0)));
			b.call(this, a.merge(!0, c, {
				chart: {
					marginBottom: C(c.chart && c.chart.marginBottom, this.margin.bottom),
					spacingBottom: C(c.chart && c.chart.spacingBottom, this.spacing.bottom)
				}
			}), e, g)
		});
		K(t.prototype, "redraw", function(a, b, c) {
			var e = this.rangeSelector;
			e && !e.options.floating && (e.render(), e = e.options.verticalAlign, "bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0));
			a.call(this, b, c)
		});
		t.prototype.adjustPlotArea = function() {
			var a = this.rangeSelector;
			this.rangeSelector && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
		};
		t.prototype.callbacks.push(function(a) {
			function b() {
				c = a.xAxis[0].getExtremes();
				m(c.min) && e.render(c.min, c.max)
			}
			var c, e = a.rangeSelector,
				d, f;
			e && (f = D(a.xAxis[0], "afterSetExtremes", function(a) {
				e.render(a.min, a.max)
			}), d = D(a, "redraw", b), b());
			D(a, "destroy", function() {
				e && (d(), f())
			})
		});
		a.RangeSelector = E
	})(L);
	(function(a) {
		var E = a.arrayMax,
			D = a.arrayMin,
			F = a.Axis,
			t = a.Chart,
			l = a.defined,
			p = a.each,
			z = a.extend,
			q = a.format,
			u = a.grep,
			B = a.inArray,
			e = a.isNumber,
			h = a.isString,
			g = a.map,
			c = a.merge,
			b = a.pick,
			w = a.Point,
			m = a.Renderer,
			r = a.Series,
			C = a.splat,
			H = a.SVGRenderer,
			A = a.VMLRenderer,
			K = a.wrap,
			f = r.prototype,
			x = f.init,
			J = f.processData,
			v = w.prototype.tooltipFormatter;
		a.StockChart = a.stockChart = function(d, e, f) {
			var k = h(d) || d.nodeName,
				l = arguments[k ? 1 : 0],
				m = l.series,
				n = a.getOptions(),
				p, q = b(l.navigator && l.navigator.enabled, n.navigator.enabled, !0),
				r = q ? {
					startOnTick: !1,
					endOnTick: !1
				} : null,
				u = {
					marker: {
						enabled: !1,
						radius: 2
					}
				},
				v = {
					shadow: !1,
					borderWidth: 0
				};
			l.xAxis = g(C(l.xAxis || {}), function(a) {
				return c({
					minPadding: 0,
					maxPadding: 0,
					overscroll: 0,
					ordinal: !0,
					title: {
						text: null
					},
					labels: {
						overflow: "justify"
					},
					showLastLabel: !0
				}, n.xAxis, a, {
					type: "datetime",
					categories: null
				}, r)
			});
			l.yAxis = g(C(l.yAxis || {}), function(a) {
				p = b(a.opposite, !0);
				return c({
					labels: {
						y: -2
					},
					opposite: p,
					showLastLabel: !1,
					title: {
						text: null
					}
				}, n.yAxis, a)
			});
			l.series = null;
			l = c({
				chart: {
					panning: !0,
					pinchType: "x"
				},
				navigator: {
					enabled: q
				},
				scrollbar: {
					enabled: b(n.scrollbar.enabled, !0)
				},
				rangeSelector: {
					enabled: b(n.rangeSelector.enabled, !0)
				},
				title: {
					text: null
				},
				tooltip: {
					split: !0,
					crosshairs: !0
				},
				legend: {
					enabled: !1
				},
				plotOptions: {
					line: u,
					spline: u,
					area: u,
					areaspline: u,
					arearange: u,
					areasplinerange: u,
					column: v,
					columnrange: v,
					candlestick: v,
					ohlc: v
				}
			}, l, {
				isStock: !0
			});
			l.series = m;
			return k ? new t(d, l, f) : new t(l, e)
		};
		K(F.prototype, "autoLabelAlign", function(a) {
			var b = this.chart,
				c = this.options,
				b = b._labelPanes = b._labelPanes || {},
				d = this.options.labels;
			return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, "right") : a.apply(this, [].slice.call(arguments, 1))
		});
		K(F.prototype, "destroy", function(a) {
			var b = this.chart,
				c = this.options && this.options.top + "," + this.options.height;
			c && b._labelPanes && b._labelPanes[c] === this && delete b._labelPanes[c];
			return a.apply(this, Array.prototype.slice.call(arguments, 1))
		});
		K(F.prototype, "getPlotLinePath", function(c, f, m, k, q, r) {
			var d = this,
				n = this.isLinked && !this.series ? this.linkedParent.series : this.series,
				t = d.chart,
				u = t.renderer,
				v = d.left,
				w = d.top,
				y, x, z, A, C = [],
				D = [],
				G, E;
			if ("xAxis" !== d.coll && "yAxis" !== d.coll) return c.apply(this, [].slice.call(arguments, 1));
			D = function(a) {
				var b = "xAxis" === a ? "yAxis" : "xAxis";
				a = d.options[b];
				return e(a) ? [t[b][a]] : h(a) ? [t.get(a)] : g(n, function(a) {
					return a[b]
				})
			}(d.coll);
			p(d.isXAxis ? t.yAxis : t.xAxis, function(a) {
				if (l(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
					var b = a.isXAxis ? "yAxis" : "xAxis",
						b = l(a.options[b]) ? t[b][a.options[b]] : t[b][0];
					d === b && D.push(a)
				}
			});
			G = D.length ? [] : [d.isXAxis ? t.yAxis[0] : t.xAxis[0]];
			p(D, function(b) {
				-1 !== B(b, G) || a.find(G, function(a) {
					return a.pos === b.pos && a.len && b.len
				}) || G.push(b)
			});
			E = b(r, d.translate(f, null, null, k));
			e(E) && (d.horiz ? p(G, function(a) {
				var b;
				x = a.pos;
				A = x + a.len;
				y = z = Math.round(E + d.transB);
				if (y < v || y > v + d.width) q ? y = z = Math.min(Math.max(v, y), v + d.width) : b = !0;
				b || C.push("M", y, x, "L", z, A)
			}) : p(G, function(a) {
				var b;
				y = a.pos;
				z = y + a.len;
				x = A = Math.round(w + d.height - E);
				if (x < w || x > w + d.height) q ? x = A = Math.min(Math.max(w, x), d.top + d.height) : b = !0;
				b || C.push("M", y, x, "L", z, A)
			}));
			return 0 < C.length ? u.crispPolyLine(C, m || 1) : null
		});
		H.prototype.crispPolyLine = function(a, b) {
			var c;
			for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
			return a
		};
		m === A && (A.prototype.crispPolyLine = H.prototype.crispPolyLine);
		K(F.prototype, "hideCrosshair", function(a, b) {
			a.call(this, b);
			this.crossLabel && (this.crossLabel = this.crossLabel.hide())
		});
		K(F.prototype, "drawCrosshair", function(a, c, e) {
			var d, f;
			a.call(this, c, e);
			if (l(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
				a = this.chart;
				var g = this.options.crosshair.label,
					h = this.horiz;
				d = this.opposite;
				f = this.left;
				var m = this.top,
					n = this.crossLabel,
					p, r = g.format,
					t = "",
					u = "inside" === this.options.tickPosition,
					v = !1 !== this.crosshair.snap,
					w = 0;
				c || (c = this.cross && this.cross.e);
				p = h ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
				n || (n = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
					align: g.align || p,
					padding: b(g.padding, 8),
					r: b(g.borderRadius, 3),
					zIndex: 2
				}).add(this.labelGroup), n.attr({
					fill: g.backgroundColor || this.series[0] && this.series[0].color || "#666666",
					stroke: g.borderColor || "",
					"stroke-width": g.borderWidth || 0
				}).css(z({
					color: "#ffffff",
					fontWeight: "normal",
					fontSize: "11px",
					textAlign: "center"
				}, g.style)));
				h ? (p = v ? e.plotX + f : c.chartX, m += d ? 0 : this.height) : (p = d ? this.width + f : 0, m = v ? e.plotY + m : c.chartY);
				r || g.formatter || (this.isDatetimeAxis && (t = "%b %d, %Y"), r = "{value" + (t ? ":" + t : "") + "}");
				c = v ? e[this.isXAxis ? "x" : "y"] : this.toValue(h ? c.chartX : c.chartY);
				n.attr({
					text: r ? q(r, {
						value: c
					}) : g.formatter.call(this, c),
					x: p,
					y: m,
					visibility: "visible"
				});
				c = n.getBBox();
				if (h) {
					if (u && !d || !u && d) m = n.y - c.height
				} else m = n.y - c.height / 2;
				h ? (d = f - c.x, f = f + this.width - c.x) : (d = "left" === this.labelAlign ? f : 0, f = "right" === this.labelAlign ? f + this.width : a.chartWidth);
				n.translateX < d && (w = d - n.translateX);
				n.translateX + c.width >= f && (w = -(n.translateX + c.width - f));
				n.attr({
					x: p + w,
					y: m,
					anchorX: h ? p : this.opposite ? 0 : a.chartWidth,
					anchorY: h ? this.opposite ? a.chartHeight : 0 : m + c.height / 2
				})
			}
		});
		f.init = function() {
			x.apply(this, arguments);
			this.setCompare(this.options.compare)
		};
		f.setCompare = function(a) {
			this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
				var d = this.compareValue;
				if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
			} : null;
			this.userOptions.compare = a;
			this.chart.hasRendered && (this.isDirty = !0)
		};
		f.processData = function() {
			var a, b = -1,
				c, f, g = !0 === this.options.compareStart ? 0 : 1,
				h, l;
			J.apply(this, arguments);
			if (this.xAxis && this.processedYData)
				for (c = this.processedXData, f = this.processedYData, h = f.length, this.pointArrayMap && (b = B("close", this.pointArrayMap), -1 === b && (b = B(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < h - g; a++)
					if (l = f[a] && -1 < b ? f[a][b] : f[a], e(l) && c[a + g] >= this.xAxis.min && 0 !== l) {
						this.compareValue = l;
						break
					}
		};
		K(f, "getExtremes", function(a) {
			var b;
			a.apply(this, [].slice.call(arguments, 1));
			this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = D(b), this.dataMax = E(b))
		});
		F.prototype.setCompare = function(a, c) {
			this.isXAxis || (p(this.series, function(b) {
				b.setCompare(a)
			}), b(c, !0) && this.chart.redraw())
		};
		w.prototype.tooltipFormatter = function(c) {
			c = c.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, b(this.series.tooltipOptions.changeDecimals, 2)));
			return v.apply(this, [c])
		};
		K(r.prototype, "render", function(a) {
			this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = c(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
				width: this.xAxis.len,
				height: this.yAxis.len
			}) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
			a.call(this)
		});
		K(t.prototype, "getSelectedPoints", function(a) {
			var b = a.call(this);
			p(this.series, function(a) {
				a.hasGroupedData && (b = b.concat(u(a.points || [], function(a) {
					return a.selected
				})))
			});
			return b
		});
		K(t.prototype, "update", function(a, b) {
			"scrollbar" in b && this.navigator && (c(!0, this.options.scrollbar, b.scrollbar), this.navigator.update({}, !1), delete b.scrollbar);
			return a.apply(this, Array.prototype.slice.call(arguments, 1))
		})
	})(L);
	return L
});