function detectBrowserInfo() {
	var a,
	b,
	c = navigator.userAgent,
	d = navigator.appName,
	e = navigator.appVersion,
	f = "" + parseFloat(navigator.appVersion),
	g = {
		goog: "Chrome",
		moz: "Firefox",
		plugin: "Plugin",
		edge: "Edge"
	};
	-1 !== (a = c.indexOf("Opera")) ? (d = "Opera", f = c.substring(a + 6), -1 !== (a = c.indexOf("Version")) && (f = c.substring(a + 8)), b = g.goog) : -1 !== (a = c.indexOf("OPR")) ? (d = "Opera", f = c.substring(a + 4), -1 !== (a = c.indexOf("Version")) && (f = c.substring(a + 8)), b = g.goog) : -1 !== (a = c.indexOf("MSIE")) ? (d = "Microsoft Internet Explorer", f = c.substring(a + 5), b = g.goog) : -1 !== (a = c.indexOf("Edge")) ? (d = g.edge, f = c.substring(a + 5), b = g.edge) : -1 !== (a = c.indexOf("Chrome")) ? (d = g.goog, f = c.substring(a + 7), b = g.goog) : -1 !== (a = c.indexOf("Safari")) ? (d = "Safari", f = c.substring(a + 7), -1 !== (a = c.indexOf("Version")) && (f = c.substring(a + 8)), b = g.goog) : -1 !== (a = c.indexOf("Firefox")) ? (d = "Firefox", f = c.substring(a + 8), b = g.moz) : -1 !== (a = c.indexOf("Trident")) && (d = "Microsoft Internet Explorer", a = c.indexOf("rv"), f = c.substring(a + 3, a + 7), b = g.goog);
	var h,
	i,
	j = null,
	k = [{
			s: "Windows 3.11",
			r: /Win16/
		}, {
			s: "Windows 95",
			r: /(Windows 95|Win95|Windows_95)/
		}, {
			s: "Windows ME",
			r: /(Win 9x 4.90|Windows ME)/
		}, {
			s: "Windows 98",
			r: /(Windows 98|Win98)/
		}, {
			s: "Windows CE",
			r: /Windows CE/
		}, {
			s: "Windows 2000",
			r: /(Windows NT 5.0|Windows 2000)/
		}, {
			s: "Windows XP",
			r: /(Windows NT 5.1|Windows XP)/
		}, {
			s: "Windows Server 2003",
			r: /Windows NT 5.2/
		}, {
			s: "Windows Vista",
			r: /Windows NT 6.0/
		}, {
			s: "Windows 7",
			r: /(Windows 7|Windows NT 6.1)/
		}, {
			s: "Windows 8.1",
			r: /(Windows 8.1|Windows NT 6.3)/
		}, {
			s: "Windows 8",
			r: /(Windows 8|Windows NT 6.2)/
		}, {
			s: "Windows 10",
			r: /(Windows 10|Windows NT 10.0)/
		}, {
			s: "Windows NT 4.0",
			r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
		}, {
			s: "Windows ME",
			r: /Windows ME/
		}, {
			s: "Android",
			r: /Android/
		}, {
			s: "Open BSD",
			r: /OpenBSD/
		}, {
			s: "Sun OS",
			r: /SunOS/
		}, {
			s: "Linux",
			r: /(Linux|X11)/
		}, {
			s: "iOS",
			r: /(iPhone|iPad|iPod)/
		}, {
			s: "Mac OS X",
			r: /Mac OS X/
		}, {
			s: "Mac OS",
			r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
		}, {
			s: "QNX",
			r: /QNX/
		}, {
			s: "UNIX",
			r: /UNIX/
		}, {
			s: "BeOS",
			r: /BeOS/
		}, {
			s: "OS/2",
			r: /OS\/2/
		}, {
			s: "Search Bot",
			r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
		}
	];
	for (h in k)
		if (i = k[h], i.r.test(c)) {
			j = i.s;
			break
		}
	var l = null;
	switch (/Windows/.test(j) && (l = /Windows (.*)/.exec(j)[1], j = "Windows"), j) {
	case "Mac OS X":
		l = /Mac OS X (10[\.\_\d]+)/.exec(c)[1];
		break;
	case "Android":
		l = /Android ([\.\_\d]+)/.exec(c)[1];
		break;
	case "iOS":
		l = /OS (\d+)_(\d+)_?(\d+)?/.exec(e),
		l = l[1] + "." + l[2] + "." + (0 | l[3])
	}
	return {
		name: d,
		ver: f.toString(),
		os: j + " " + l,
		codebase: b
	}
}
function measureAppLoadingPerformance(a) {
	var b = 0,
	c = Number.MAX_VALUE,
	d = 0,
	e = "",
	f = "",
	g = window.performance;
	if (!("performance" in window && "timing" in window.performance && "navigation" in window.performance))
		return {
			support: "none",
			total: void 0
		};
	var h = g.timing.loadEventEnd - g.timing.navigationStart;
	if ("Chrome" === a.name || "Opera" === a.name) {
		var i,
		j = g.getEntriesByType("resource");
		for (i = 0; i < j.length; i++)
			j[i].duration > d && (f = j[i].name.substr(j[i].name.lastIndexOf("/") + 1), d = j[i].duration), j[i].duration < c && (e = j[i].name.substr(j[i].name.lastIndexOf("/") + 1), c = j[i].duration), j[i].name.indexOf("CALLSTATS_SRC_URLstatic/callstats") > -1 && (b = j[i].duration);
		return {
			support: "full",
			callstats: b,
			min: {
				name: e,
				time: c
			},
			max: {
				name: f,
				time: d
			},
			total: h
		}
	}
	return "Firefox" === a.name ? {
		support: "limited",
		total: h
	}
	 : void 0
}
function handleSessionTimersInIncomingRequest(a, b) {
	if (this.sessionTimers.enabled) {
		var c;
		a.session_expires && a.session_expires >= JsSIP.C.MIN_SESSION_EXPIRES ? (this.sessionTimers.currentExpires = a.session_expires, c = a.session_expires_refresher || "uas") : (this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires, c = "uas"),
		b.push("Session-Expires: " + this.sessionTimers.currentExpires + ";refresher=" + c),
		this.sessionTimers.refresher = "uas" === c,
		runSessionTimer.call(this)
	}
}
function handleSessionTimersInIncomingResponse(a) {
	if (this.sessionTimers.enabled) {
		var b;
		a.session_expires && a.session_expires >= JsSIP_C.MIN_SESSION_EXPIRES ? (this.sessionTimers.currentExpires = a.session_expires, b = a.session_expires_refresher || "uac") : (this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires, b = "uac"),
		this.sessionTimers.refresher = "uac" === b,
		runSessionTimer.call(this)
	}
}
function runSessionTimer() {
	var a = this,
	b = this.sessionTimers.currentExpires;
	this.sessionTimers.running = !0,
	clearTimeout(this.sessionTimers.timer),
	this.sessionTimers.refresher ? this.sessionTimers.timer = setTimeout(function () {
			a.status !== JsSIP.C.STATUS_TERMINATED && sendUpdate.call(a, {
				eventHandlers: {
					succeeded: function (b) {
						handleSessionTimersInIncomingResponse.call(a, b)
					}
				}
			})
		}, 500 * b) : this.sessionTimers.timer = setTimeout(function () {
			a.status !== JsSIP.C.STATUS_TERMINATED && a.terminate({
				cause: JsSIP_C.causes.REQUEST_TIMEOUT,
				status_code: 408,
				reason_phrase: "Session Timer Expired"
			})
		}, 1100 * b)
}
function setInvite2xxTimer(a, b) {
	var c = this,
	d = Timers.T1;
	this.timers.invite2xxTimer = setTimeout(function e() {
			c.status === JsSIP.C.STATUS_WAITING_FOR_ACK && (a.reply(200, null, ["Contact: " + c.contact], b), d < Timers.T2 && (d = 2 * d, d > Timers.T2 && (d = Timers.T2)), c.timers.invite2xxTimer = setTimeout(e, d))
		}, d)
}
function setACKTimer() {
	var a = this;
	this.timers.ackTimer = setTimeout(function () {
			a.status === JsSIP.C.STATUS_WAITING_FOR_ACK && (clearTimeout(a.timers.invite2xxTimer), sendRequest.call(a, JsSIP.C.BYE), ended.call(a, "remote", null, JsSIP.C.causes.NO_ACK))
		}, Timers.TIMER_H)
}
function ended(a, b, c) {
	this.end_time = new Date,
	this.close(),
	this.emit("ended", {
		originator: a,
		message: b || null,
		cause: c
	})
}
function extend(a, b) {
	var c = Object.prototype.toString,
	d = c.call({});
	for (var e in b)
		b[e] && d === c.call(b[e]) ? (a[e] = a[e] || {}, extend(a[e], b[e])) : a[e] = b[e];
	return a
}
!function (a) {
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = a();
	else if ("function" == typeof define && define.amd)
		define([], a);
	else {
		var b;
		b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
		b.JsSIP = a()
	}
}
(function () {
	var a;
	return function b(a, c, d) {
		function e(g, h) {
			if (!c[g]) {
				if (!a[g]) {
					var i = "function" == typeof require && require;
					if (!h && i)
						return i(g, !0);
					if (f)
						return f(g, !0);
					var j = new Error("Cannot find module '" + g + "'");
					throw j.code = "MODULE_NOT_FOUND",
					j
				}
				var k = c[g] = {
					exports: {}
				};
				a[g][0].call(k.exports, function (b) {
					var c = a[g][1][b];
					return e(c ? c : b)
				}, k, k.exports, b, a, c, d)
			}
			return c[g].exports
		}
		for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
			e(d[g]);
		return e
	}
	({
		1: [function (a, b, c) {
				var d = a("../package.json"),
				e = {
					USER_AGENT: d.title + " " + d.version,
					SIP: "sip",
					SIPS: "sips",
					causes: {
						CONNECTION_ERROR: "Connection Error",
						REQUEST_TIMEOUT: "Request Timeout",
						SIP_FAILURE_CODE: "SIP Failure Code",
						INTERNAL_ERROR: "Internal Error",
						BUSY: "Busy",
						REJECTED: "Rejected",
						REDIRECTED: "Redirected",
						UNAVAILABLE: "Unavailable",
						NOT_FOUND: "Not Found",
						ADDRESS_INCOMPLETE: "Address Incomplete",
						INCOMPATIBLE_SDP: "Incompatible SDP",
						MISSING_SDP: "Missing SDP",
						AUTHENTICATION_ERROR: "Authentication Error",
						BYE: "Terminated",
						WEBRTC_ERROR: "WebRTC Error",
						CANCELED: "Canceled",
						NO_ANSWER: "No Answer",
						EXPIRES: "Expires",
						NO_ACK: "No ACK",
						DIALOG_ERROR: "Dialog Error",
						USER_DENIED_MEDIA_ACCESS: "User Denied Media Access",
						BAD_MEDIA_DESCRIPTION: "Bad Media Description",
						RTP_TIMEOUT: "RTP Timeout"
					},
					SIP_ERROR_CAUSES: {
						REDIRECTED: [300, 301, 302, 305, 380],
						BUSY: [486, 600],
						REJECTED: [403, 603],
						NOT_FOUND: [404, 604],
						UNAVAILABLE: [480, 410, 408, 430],
						ADDRESS_INCOMPLETE: [484, 424],
						INCOMPATIBLE_SDP: [488, 606],
						AUTHENTICATION_ERROR: [401, 407]
					},
					ACK: "ACK",
					BYE: "BYE",
					CANCEL: "CANCEL",
					INFO: "INFO",
					INVITE: "INVITE",
					MESSAGE: "MESSAGE",
					NOTIFY: "NOTIFY",
					OPTIONS: "OPTIONS",
					REGISTER: "REGISTER",
					REFER: "REFER",
					UPDATE: "UPDATE",
					SUBSCRIBE: "SUBSCRIBE",
					REASON_PHRASE: {
						100: "Trying",
						180: "Ringing",
						181: "Call Is Being Forwarded",
						182: "Queued",
						183: "Session Progress",
						199: "Early Dialog Terminated",
						200: "OK",
						202: "Accepted",
						204: "No Notification",
						300: "Multiple Choices",
						301: "Moved Permanently",
						302: "Moved Temporarily",
						305: "Use Proxy",
						380: "Alternative Service",
						400: "Bad Request",
						401: "Unauthorized",
						402: "Payment Required",
						403: "Forbidden",
						404: "Not Found",
						405: "Method Not Allowed",
						406: "Not Acceptable",
						407: "Proxy Authentication Required",
						408: "Request Timeout",
						410: "Gone",
						412: "Conditional Request Failed",
						413: "Request Entity Too Large",
						414: "Request-URI Too Long",
						415: "Unsupported Media Type",
						416: "Unsupported URI Scheme",
						417: "Unknown Resource-Priority",
						420: "Bad Extension",
						421: "Extension Required",
						422: "Session Interval Too Small",
						423: "Interval Too Brief",
						424: "Bad Location Information",
						428: "Use Identity Header",
						429: "Provide Referrer Identity",
						430: "Flow Failed",
						433: "Anonymity Disallowed",
						436: "Bad Identity-Info",
						437: "Unsupported Certificate",
						438: "Invalid Identity Header",
						439: "First Hop Lacks Outbound Support",
						440: "Max-Breadth Exceeded",
						469: "Bad Info Package",
						470: "Consent Needed",
						478: "Unresolvable Destination",
						480: "Temporarily Unavailable",
						481: "Call/Transaction Does Not Exist",
						482: "Loop Detected",
						483: "Too Many Hops",
						484: "Address Incomplete",
						485: "Ambiguous",
						486: "Busy Here",
						487: "Request Terminated",
						488: "Not Acceptable Here",
						489: "Bad Event",
						491: "Request Pending",
						493: "Undecipherable",
						494: "Security Agreement Required",
						500: "JsSIP Internal Error",
						501: "Not Implemented",
						502: "Bad Gateway",
						503: "Service Unavailable",
						504: "Server Time-out",
						505: "Version Not Supported",
						513: "Message Too Large",
						580: "Precondition Failure",
						600: "Busy Everywhere",
						603: "Decline",
						604: "Does Not Exist Anywhere",
						606: "Not Acceptable"
					},
					ALLOWED_METHODS: "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO",
					ACCEPTED_BODY_TYPES: "application/sdp, application/dtmf-relay",
					MAX_FORWARDS: 69,
					SESSION_EXPIRES: 90,
					MIN_SESSION_EXPIRES: 60
				};
				b.exports = e
			}, {
				"../package.json": 47
			}
		],
		2: [function (a, b, c) {
				function d(a, b, c, d) {
					var h;
					return this.uac_pending_reply = !1,
					this.uas_pending_reply = !1,
					b.hasHeader("contact") ? (d = b instanceof g.IncomingResponse ? b.status_code < 200 ? e.STATUS_EARLY : e.STATUS_CONFIRMED : d || e.STATUS_CONFIRMED, h = b.parseHeader("contact"), "UAS" === c ? (this.id = {
								call_id: b.call_id,
								local_tag: b.to_tag,
								remote_tag: b.from_tag,
								toString: function () {
									return this.call_id + this.local_tag + this.remote_tag
								}
							}, this.state = d, this.remote_seqnum = b.cseq, this.local_uri = b.parseHeader("to").uri, this.remote_uri = b.parseHeader("from").uri, this.remote_target = h.uri, this.route_set = b.getHeaders("record-route")) : "UAC" === c && (this.id = {
								call_id: b.call_id,
								local_tag: b.from_tag,
								remote_tag: b.to_tag,
								toString: function () {
									return this.call_id + this.local_tag + this.remote_tag
								}
							}, this.state = d, this.local_seqnum = b.cseq, this.local_uri = b.parseHeader("from").uri, this.remote_uri = b.parseHeader("to").uri, this.remote_target = h.uri, this.route_set = b.getHeaders("record-route").reverse()), this.owner = a, a.ua.dialogs[this.id.toString()] = this, void f("new " + c + " dialog created with status " + (this.state === e.STATUS_EARLY ? "EARLY" : "CONFIRMED"))) : {
						error: "unable to create a Dialog without Contact header field"
					}
				}
				b.exports = d;
				var e = {
					STATUS_EARLY: 1,
					STATUS_CONFIRMED: 2
				};
				d.C = e;
				var f = a("debug")("JsSIP:Dialog"),
				g = a("./SIPMessage"),
				h = a("./Constants"),
				i = a("./Transactions"),
				j = a("./Dialog/RequestSender");
				d.prototype = {
					update: function (a, b) {
						this.state = e.STATUS_CONFIRMED,
						f("dialog " + this.id.toString() + "  changed to CONFIRMED state"),
						"UAC" === b && (this.route_set = a.getHeaders("record-route").reverse())
					},
					terminate: function () {
						f("dialog " + this.id.toString() + " deleted"),
						delete this.owner.ua.dialogs[this.id.toString()]
					},
					createRequest: function (a, b, c) {
						var d,
						e;
						return b = b && b.slice() || [],
						this.local_seqnum || (this.local_seqnum = Math.floor(1e4 * Math.random())),
						d = a === h.CANCEL || a === h.ACK ? this.local_seqnum : this.local_seqnum += 1,
						e = new g.OutgoingRequest(a, this.remote_target, this.owner.ua, {
								cseq: d,
								call_id: this.id.call_id,
								from_uri: this.local_uri,
								from_tag: this.id.local_tag,
								to_uri: this.remote_uri,
								to_tag: this.id.remote_tag,
								route_set: this.route_set
							}, b, c),
						e.dialog = this,
						e
					},
					checkInDialogRequest: function (a) {
						var b = this;
						if (this.remote_seqnum) {
							if (a.cseq < this.remote_seqnum)
								return a.method !== h.ACK && a.reply(500), !1;
							a.cseq > this.remote_seqnum && (this.remote_seqnum = a.cseq)
						} else
							this.remote_seqnum = a.cseq;
						if (a.method === h.INVITE || a.method === h.UPDATE && a.body) {
							if (this.uac_pending_reply === !0)
								a.reply(491);
							else {
								if (this.uas_pending_reply === !0) {
									var c = (10 * Math.random() | 0) + 1;
									return a.reply(500, null, ["Retry-After:" + c]),
									!1
								}
								this.uas_pending_reply = !0,
								a.server_transaction.on("stateChanged", function d() {
									this.state !== i.C.STATUS_ACCEPTED && this.state !== i.C.STATUS_COMPLETED && this.state !== i.C.STATUS_TERMINATED || (a.server_transaction.removeListener("stateChanged", d), b.uas_pending_reply = !1)
								})
							}
							a.hasHeader("contact") && a.server_transaction.on("stateChanged", function () {
								this.state === i.C.STATUS_ACCEPTED && (b.remote_target = a.parseHeader("contact").uri)
							})
						} else
							a.method === h.NOTIFY && a.hasHeader("contact") && a.server_transaction.on("stateChanged", function () {
								this.state === i.C.STATUS_COMPLETED && (b.remote_target = a.parseHeader("contact").uri)
							});
						return !0
					},
					sendRequest: function (a, b, c) {
						c = c || {};
						var d = c.extraHeaders && c.extraHeaders.slice() || [],
						e = c.body || null,
						f = this.createRequest(b, d, e),
						g = new j(this, a, f);
						return g.send(),
						f
					},
					receiveRequest: function (a) {
						this.checkInDialogRequest(a) && this.owner.receiveRequest(a)
					}
				}
			}, {
				"./Constants": 1,
				"./Dialog/RequestSender": 3,
				"./SIPMessage": 18,
				"./Transactions": 21,
				debug: 33
			}
		],
		3: [function (a, b, c) {
				function d(a, b, c) {
					this.dialog = a,
					this.applicant = b,
					this.request = c,
					this.reattempt = !1,
					this.reattemptTimer = null
				}
				b.exports = d;
				var e = a("../Constants"),
				f = a("../Transactions"),
				g = a("../RTCSession"),
				h = a("../RequestSender");
				d.prototype = {
					send: function () {
						var a = this,
						b = new h(this, this.dialog.owner.ua);
						b.send(),
						(this.request.method === e.INVITE || this.request.method === e.UPDATE && this.request.body) && b.clientTransaction.state !== f.C.STATUS_TERMINATED && (this.dialog.uac_pending_reply = !0, b.clientTransaction.on("stateChanged", function c() {
								this.state !== f.C.STATUS_ACCEPTED && this.state !== f.C.STATUS_COMPLETED && this.state !== f.C.STATUS_TERMINATED || (b.clientTransaction.removeListener("stateChanged", c), a.dialog.uac_pending_reply = !1)
							}))
					},
					onRequestTimeout: function () {
						this.applicant.onRequestTimeout()
					},
					onTransportError: function () {
						this.applicant.onTransportError()
					},
					receiveResponse: function (a) {
						var b = this;
						408 === a.status_code || 481 === a.status_code ? this.applicant.onDialogError(a) : a.method === e.INVITE && 491 === a.status_code ? this.reattempt ? this.applicant.receiveResponse(a) : (this.request.cseq.value = this.dialog.local_seqnum += 1, this.reattemptTimer = setTimeout(function () {
									b.applicant.owner.status !== g.C.STATUS_TERMINATED && (b.reattempt = !0, b.request_sender.send())
								}, 1e3)) : this.applicant.receiveResponse(a)
					}
				}
			}, {
				"../Constants": 1,
				"../RTCSession": 11,
				"../RequestSender": 17,
				"../Transactions": 21
			}
		],
		4: [function (a, b, c) {
				function d(a) {
					this.credentials = a,
					this.cnonce = null,
					this.nc = 0,
					this.ncHex = "00000000",
					this.algorithm = null,
					this.realm = null,
					this.nonce = null,
					this.opaque = null,
					this.stale = null,
					this.qop = null,
					this.method = null,
					this.uri = null,
					this.ha1 = null,
					this.response = null
				}
				b.exports = d;
				var e = a("debug")("JsSIP:DigestAuthentication"),
				f = a("debug")("JsSIP:ERROR:DigestAuthentication");
				f.log = console.warn.bind(console);
				var g = a("./Utils");
				d.prototype.get = function (a) {
					switch (a) {
					case "realm":
						return this.realm;
					case "ha1":
						return this.ha1;
					default:
						return void f('get() | cannot get "%s" parameter', a)
					}
				},
				d.prototype.authenticate = function (a, b) {
					var c,
					d;
					if (this.algorithm = b.algorithm, this.realm = b.realm, this.nonce = b.nonce, this.opaque = b.opaque, this.stale = b.stale, this.algorithm) {
						if ("MD5" !== this.algorithm)
							return f('authenticate() | challenge with Digest algorithm different than "MD5", authentication aborted'), !1
					} else
						this.algorithm = "MD5";
					if (!this.nonce)
						return f("authenticate() | challenge without Digest nonce, authentication aborted"), !1;
					if (!this.realm)
						return f("authenticate() | challenge without Digest realm, authentication aborted"), !1;
					if (!this.credentials.password) {
						if (!this.credentials.ha1)
							return f("authenticate() | no plain SIP password nor ha1 provided, authentication aborted"), !1;
						if (this.credentials.realm !== this.realm)
							return f('authenticate() | no plain SIP password, and stored `realm` does not match the given `realm`, cannot authenticate [stored:"%s", given:"%s"]', this.credentials.realm, this.realm), !1
					}
					if (b.qop)
						if (b.qop.indexOf("auth") > -1)
							this.qop = "auth";
						else {
							if (!(b.qop.indexOf("auth-int") > -1))
								return f('authenticate() | challenge without Digest qop different than "auth" or "auth-int", authentication aborted'), !1;
							this.qop = "auth-int"
						}
					else
						this.qop = null;
					return this.method = a.method,
					this.uri = a.ruri,
					this.cnonce = g.createRandomToken(12),
					this.nc += 1,
					d = Number(this.nc).toString(16),
					this.ncHex = "00000000".substr(0, 8 - d.length) + d,
					4294967296 === this.nc && (this.nc = 1, this.ncHex = "00000001"),
					this.credentials.password ? this.ha1 = g.calculateMD5(this.credentials.username + ":" + this.realm + ":" + this.credentials.password) : this.ha1 = this.credentials.ha1,
					"auth" === this.qop ? (c = g.calculateMD5(this.method + ":" + this.uri), this.response = g.calculateMD5(this.ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + c)) : "auth-int" === this.qop ? (c = g.calculateMD5(this.method + ":" + this.uri + ":" + g.calculateMD5(this.body ? this.body : "")), this.response = g.calculateMD5(this.ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + c)) : null === this.qop && (c = g.calculateMD5(this.method + ":" + this.uri), this.response = g.calculateMD5(this.ha1 + ":" + this.nonce + ":" + c)),
					e("authenticate() | response generated"),
					!0
				},
				d.prototype.toString = function () {
					var a = [];
					if (!this.response)
						throw new Error("response field does not exist, cannot generate Authorization header");
					return a.push("algorithm=" + this.algorithm),
					a.push('username="' + this.credentials.username + '"'),
					a.push('realm="' + this.realm + '"'),
					a.push('nonce="' + this.nonce + '"'),
					a.push('uri="' + this.uri + '"'),
					a.push('response="' + this.response + '"'),
					this.opaque && a.push('opaque="' + this.opaque + '"'),
					this.qop && (a.push("qop=" + this.qop), a.push('cnonce="' + this.cnonce + '"'), a.push("nc=" + this.ncHex)),
					"Digest " + a.join(", ")
				}
			}, {
				"./Utils": 25,
				debug: 33
			}
		],
		5: [function (a, b, c) {
				var d = {
					ConfigurationError: function () {
						var a = function (a, b) {
							this.code = 1,
							this.name = "CONFIGURATION_ERROR",
							this.parameter = a,
							this.value = b,
							this.message = this.value ? "Invalid value " + JSON.stringify(this.value) + ' for parameter "' + this.parameter + '"' : "Missing parameter: " + this.parameter
						};
						return a.prototype = new Error,
						a
					}
					(),
					InvalidStateError: function () {
						var a = function (a) {
							this.code = 2,
							this.name = "INVALID_STATE_ERROR",
							this.status = a,
							this.message = "Invalid status: " + a
						};
						return a.prototype = new Error,
						a
					}
					(),
					NotSupportedError: function () {
						var a = function (a) {
							this.code = 3,
							this.name = "NOT_SUPPORTED_ERROR",
							this.message = a
						};
						return a.prototype = new Error,
						a
					}
					(),
					NotReadyError: function () {
						var a = function (a) {
							this.code = 4,
							this.name = "NOT_READY_ERROR",
							this.message = a
						};
						return a.prototype = new Error,
						a
					}
					()
				};
				b.exports = d
			}, {}
		],
		6: [function (a, b, c) {
				b.exports = function () {
					function b(a) {
						return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"'
					}
					var c = {
						parse: function (c, d) {
							function e(a) {
								rd < td || (rd > td && (td = rd, ud = []), ud.push(a))
							}
							function f() {
								var a;
								return "\r\n" === c.substr(rd, 2) ? (a = "\r\n", rd += 2) : (a = null, 0 === sd && e('"\\r\\n"')),
								a
							}
							function g() {
								var a;
								return /^[0-9]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[0-9]")),
								a
							}
							function h() {
								var a;
								return /^[a-zA-Z]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[a-zA-Z]")),
								a
							}
							function i() {
								var a;
								return /^[0-9a-fA-F]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[0-9a-fA-F]")),
								a
							}
							function j() {
								var a;
								return a = m(),
								null === a && (a = n()),
								a
							}
							function k() {
								var a;
								return /^[\0-\xFF]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[\\0-\\xFF]")),
								a
							}
							function l() {
								var a;
								return /^["]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e('["]')),
								a
							}
							function m() {
								var a;
								return 32 === c.charCodeAt(rd) ? (a = " ", rd++) : (a = null, 0 === sd && e('" "')),
								a
							}
							function n() {
								var a;
								return 9 === c.charCodeAt(rd) ? (a = "\t", rd++) : (a = null, 0 === sd && e('"\\t"')),
								a
							}
							function o() {
								var a;
								return /^[a-zA-Z0-9]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[a-zA-Z0-9]")),
								a
							}
							function p() {
								var a;
								return 59 === c.charCodeAt(rd) ? (a = ";", rd++) : (a = null, 0 === sd && e('";"')),
								null === a && (47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"')), null === a && (63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (64 === c.charCodeAt(rd) ? (a = "@", rd++) : (a = null, 0 === sd && e('"@"')), null === a && (38 === c.charCodeAt(rd) ? (a = "&", rd++) : (a = null, 0 === sd && e('"&"')), null === a && (61 === c.charCodeAt(rd) ? (a = "=", rd++) : (a = null, 0 === sd && e('"="')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')), null === a && (44 === c.charCodeAt(rd) ? (a = ",", rd++) : (a = null, 0 === sd && e('","'))))))))))),
								a
							}
							function q() {
								var a;
								return a = o(),
								null === a && (a = r()),
								a
							}
							function r() {
								var a;
								return 45 === c.charCodeAt(rd) ? (a = "-", rd++) : (a = null, 0 === sd && e('"-"')),
								null === a && (95 === c.charCodeAt(rd) ? (a = "_", rd++) : (a = null, 0 === sd && e('"_"')), null === a && (46 === c.charCodeAt(rd) ? (a = ".", rd++) : (a = null, 0 === sd && e('"."')), null === a && (33 === c.charCodeAt(rd) ? (a = "!", rd++) : (a = null, 0 === sd && e('"!"')), null === a && (126 === c.charCodeAt(rd) ? (a = "~", rd++) : (a = null, 0 === sd && e('"~"')), null === a && (42 === c.charCodeAt(rd) ? (a = "*", rd++) : (a = null, 0 === sd && e('"*"')), null === a && (39 === c.charCodeAt(rd) ? (a = "'", rd++) : (a = null, 0 === sd && e('"\'"')), null === a && (40 === c.charCodeAt(rd) ? (a = "(", rd++) : (a = null, 0 === sd && e('"("')), null === a && (41 === c.charCodeAt(rd) ? (a = ")", rd++) : (a = null, 0 === sd && e('")"')))))))))),
								a
							}
							function s() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								37 === c.charCodeAt(rd) ? (a = "%", rd++) : (a = null, 0 === sd && e('"%"')),
								null !== a ? (b = i(), null !== b ? (d = i(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									return b.join("")
								}
									(f, a)),
								null === a && (rd = f),
								a
							}
							function t() {
								var a,
								b,
								c,
								d,
								e,
								g;
								for (d = rd, e = rd, g = rd, a = [], b = j(); null !== b; )
									a.push(b), b = j();
								if (null !== a ? (b = f(), null !== b ? a = [a, b] : (a = null, rd = g)) : (a = null, rd = g), a = null !== a ? a : "", null !== a) {
									if (c = j(), null !== c)
										for (b = []; null !== c; )
											b.push(c), c = j();
									else
										b = null;
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return null !== a && (a = function (a) {
									return " "
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function u() {
								var a;
								return a = t(),
								a = null !== a ? a : ""
							}
							function v() {
								var a,
								b,
								d,
								f,
								g;
								for (f = rd, g = rd, a = [], b = m(), null === b && (b = n()); null !== b; )
									a.push(b), b = m(), null === b && (b = n());
								return null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return ":"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function w() {
								var a,
								b,
								d,
								e,
								f,
								g,
								h;
								if (f = rd, g = rd, b = x(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = x();
								else
									a = null;
								if (null !== a) {
									for (b = [], h = rd, d = [], e = t(); null !== e; )
										d.push(e), e = t();
									for (null !== d ? (e = x(), null !== e ? d = [d, e] : (d = null, rd = h)) : (d = null, rd = h); null !== d; ) {
										for (b.push(d), h = rd, d = [], e = t(); null !== e; )
											d.push(e), e = t();
										null !== d ? (e = x(), null !== e ? d = [d, e] : (d = null, rd = h)) : (d = null, rd = h)
									}
									null !== b ? a = [a, b] : (a = null, rd = g)
								} else
									a = null, rd = g;
								return null !== a && (a = function (a) {
									return c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function x() {
								var a;
								return /^[!-~]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[!-~]")),
								null === a && (a = y()),
								a
							}
							function y() {
								var a;
								return /^[\x80-\uFFFF]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[\\x80-\\uFFFF]")),
								a
							}
							function z() {
								var a;
								return /^[\x80-\xBF]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[\\x80-\\xBF]")),
								a
							}
							function A() {
								var a;
								return a = g(),
								null === a && (/^[a-f]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[a-f]"))),
								a
							}
							function B() {
								var a,
								b,
								d;
								if (d = rd, b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"')))))))))))), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"'))))))))))));
								else
									a = null;
								return null !== a && (a = function (a) {
									return c.substring(rd, a)
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function C() {
								var a,
								b,
								d;
								if (d = rd, b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"'))))))))))), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"')))))))))));
								else
									a = null;
								return null !== a && (a = function (a) {
									return c.substring(rd, a)
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function D() {
								var a;
								return 40 === c.charCodeAt(rd) ? (a = "(", rd++) : (a = null, 0 === sd && e('"("')),
								null === a && (41 === c.charCodeAt(rd) ? (a = ")", rd++) : (a = null, 0 === sd && e('")"')), null === a && (60 === c.charCodeAt(rd) ? (a = "<", rd++) : (a = null, 0 === sd && e('"<"')), null === a && (62 === c.charCodeAt(rd) ? (a = ">", rd++) : (a = null, 0 === sd && e('">"')), null === a && (64 === c.charCodeAt(rd) ? (a = "@", rd++) : (a = null, 0 === sd && e('"@"')), null === a && (44 === c.charCodeAt(rd) ? (a = ",", rd++) : (a = null, 0 === sd && e('","')), null === a && (59 === c.charCodeAt(rd) ? (a = ";", rd++) : (a = null, 0 === sd && e('";"')), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (92 === c.charCodeAt(rd) ? (a = "\\", rd++) : (a = null, 0 === sd && e('"\\\\"')), null === a && (a = l(), null === a && (47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"')), null === a && (91 === c.charCodeAt(rd) ? (a = "[", rd++) : (a = null, 0 === sd && e('"["')), null === a && (93 === c.charCodeAt(rd) ? (a = "]", rd++) : (a = null, 0 === sd && e('"]"')), null === a && (63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null === a && (61 === c.charCodeAt(rd) ? (a = "=", rd++) : (a = null, 0 === sd && e('"="')), null === a && (123 === c.charCodeAt(rd) ? (a = "{", rd++) : (a = null, 0 === sd && e('"{"')), null === a && (125 === c.charCodeAt(rd) ? (a = "}", rd++) : (a = null, 0 === sd && e('"}"')), null === a && (a = m(), null === a && (a = n())))))))))))))))))),
								a
							}
							function E() {
								var a,
								b,
								d;
								if (d = rd, b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"')), null === b && (40 === c.charCodeAt(rd) ? (b = "(", rd++) : (b = null, 0 === sd && e('"("')), null === b && (41 === c.charCodeAt(rd) ? (b = ")", rd++) : (b = null, 0 === sd && e('")"')), null === b && (60 === c.charCodeAt(rd) ? (b = "<", rd++) : (b = null, 0 === sd && e('"<"')), null === b && (62 === c.charCodeAt(rd) ? (b = ">", rd++) : (b = null, 0 === sd && e('">"')), null === b && (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null === b && (92 === c.charCodeAt(rd) ? (b = "\\", rd++) : (b = null, 0 === sd && e('"\\\\"')), null === b && (b = l(), null === b && (47 === c.charCodeAt(rd) ? (b = "/", rd++) : (b = null, 0 === sd && e('"/"')), null === b && (91 === c.charCodeAt(rd) ? (b = "[", rd++) : (b = null, 0 === sd && e('"["')), null === b && (93 === c.charCodeAt(rd) ? (b = "]", rd++) : (b = null, 0 === sd && e('"]"')), null === b && (63 === c.charCodeAt(rd) ? (b = "?", rd++) : (b = null, 0 === sd && e('"?"')), null === b && (123 === c.charCodeAt(rd) ? (b = "{", rd++) : (b = null, 0 === sd && e('"{"')), null === b && (125 === c.charCodeAt(rd) ? (b = "}", rd++) : (b = null, 0 === sd && e('"}"'))))))))))))))))))))))))), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = o(), null === b && (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null === b && (46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null === b && (33 === c.charCodeAt(rd) ? (b = "!", rd++) : (b = null, 0 === sd && e('"!"')), null === b && (37 === c.charCodeAt(rd) ? (b = "%", rd++) : (b = null, 0 === sd && e('"%"')), null === b && (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null === b && (95 === c.charCodeAt(rd) ? (b = "_", rd++) : (b = null, 0 === sd && e('"_"')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (96 === c.charCodeAt(rd) ? (b = "`", rd++) : (b = null, 0 === sd && e('"`"')), null === b && (39 === c.charCodeAt(rd) ? (b = "'", rd++) : (b = null, 0 === sd && e('"\'"')), null === b && (126 === c.charCodeAt(rd) ? (b = "~", rd++) : (b = null, 0 === sd && e('"~"')), null === b && (40 === c.charCodeAt(rd) ? (b = "(", rd++) : (b = null, 0 === sd && e('"("')), null === b && (41 === c.charCodeAt(rd) ? (b = ")", rd++) : (b = null, 0 === sd && e('")"')), null === b && (60 === c.charCodeAt(rd) ? (b = "<", rd++) : (b = null, 0 === sd && e('"<"')), null === b && (62 === c.charCodeAt(rd) ? (b = ">", rd++) : (b = null, 0 === sd && e('">"')), null === b && (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null === b && (92 === c.charCodeAt(rd) ? (b = "\\", rd++) : (b = null, 0 === sd && e('"\\\\"')), null === b && (b = l(), null === b && (47 === c.charCodeAt(rd) ? (b = "/", rd++) : (b = null, 0 === sd && e('"/"')), null === b && (91 === c.charCodeAt(rd) ? (b = "[", rd++) : (b = null, 0 === sd && e('"["')), null === b && (93 === c.charCodeAt(rd) ? (b = "]", rd++) : (b = null, 0 === sd && e('"]"')), null === b && (63 === c.charCodeAt(rd) ? (b = "?", rd++) : (b = null, 0 === sd && e('"?"')), null === b && (123 === c.charCodeAt(rd) ? (b = "{", rd++) : (b = null, 0 === sd && e('"{"')), null === b && (125 === c.charCodeAt(rd) ? (b = "}", rd++) : (b = null, 0 === sd && e('"}"')))))))))))))))))))))))));
								else
									a = null;
								return null !== a && (a = function (a) {
									return c.substring(rd, a)
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function F() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (42 === c.charCodeAt(rd) ? (b = "*", rd++) : (b = null, 0 === sd && e('"*"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return "*"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function G() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (47 === c.charCodeAt(rd) ? (b = "/", rd++) : (b = null, 0 === sd && e('"/"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return "/"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function H() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return "="
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function I() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (40 === c.charCodeAt(rd) ? (b = "(", rd++) : (b = null, 0 === sd && e('"("')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return "("
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function J() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (41 === c.charCodeAt(rd) ? (b = ")", rd++) : (b = null,
										0 === sd && e('")"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return ")"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function K() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								62 === c.charCodeAt(rd) ? (a = ">", rd++) : (a = null, 0 === sd && e('">"')),
								null !== a ? (b = u(), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a) {
									return ">"
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function L() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								a = u(),
								null !== a ? (60 === c.charCodeAt(rd) ? (b = "<", rd++) : (b = null, 0 === sd && e('"<"')), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a) {
									return "<"
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function M() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (44 === c.charCodeAt(rd) ? (b = ",", rd++) : (b = null, 0 === sd && e('","')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return ","
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function N() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (59 === c.charCodeAt(rd) ? (b = ";", rd++) : (b = null, 0 === sd && e('";"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return ";"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function O() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = u(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = u(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return ":"
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function P() {
								var a,
								b,
								c,
								d;
								return c = rd,
								d = rd,
								a = u(),
								null !== a ? (b = l(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								null !== a && (a = function (a) {
									return '"'
								}
									(c)),
								null === a && (rd = c),
								a
							}
							function Q() {
								var a,
								b,
								c,
								d;
								return c = rd,
								d = rd,
								a = l(),
								null !== a ? (b = u(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								null !== a && (a = function (a) {
									return '"'
								}
									(c)),
								null === a && (rd = c),
								a
							}
							function R() {
								var a,
								b,
								c,
								d;
								if (d = rd, a = I(), null !== a) {
									for (b = [], c = S(), null === c && (c = W(), null === c && (c = R())); null !== c; )
										b.push(c), c = S(), null === c && (c = W(), null === c && (c = R()));
									null !== b ? (c = J(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)
								} else
									a = null, rd = d;
								return a
							}
							function S() {
								var a;
								return /^[!-']/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[!-']")),
								null === a && (/^[*-[]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[*-[]")), null === a && (/^[\]-~]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[\\]-~]")), null === a && (a = y(), null === a && (a = t())))),
								a
							}
							function T() {
								var a,
								b,
								d,
								e,
								f,
								g;
								if (f = rd, g = rd, a = u(), null !== a)
									if (b = l(), null !== b) {
										for (d = [], e = V(), null === e && (e = W()); null !== e; )
											d.push(e), e = V(), null === e && (e = W());
										null !== d ? (e = l(), null !== e ? a = [a, b, d, e] : (a = null, rd = g)) : (a = null, rd = g)
									} else
										a = null, rd = g;
								else
									a = null, rd = g;
								return null !== a && (a = function (a) {
									return c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function U() {
								var a,
								b,
								d,
								e,
								f,
								g;
								if (f = rd, g = rd, a = u(), null !== a)
									if (b = l(), null !== b) {
										for (d = [], e = V(), null === e && (e = W()); null !== e; )
											d.push(e), e = V(), null === e && (e = W());
										null !== d ? (e = l(), null !== e ? a = [a, b, d, e] : (a = null, rd = g)) : (a = null, rd = g)
									} else
										a = null, rd = g;
								else
									a = null, rd = g;
								return null !== a && (a = function (a) {
									return c.substring(rd - 1, a + 1)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function V() {
								var a;
								return a = t(),
								null === a && (33 === c.charCodeAt(rd) ? (a = "!", rd++) : (a = null, 0 === sd && e('"!"')), null === a && (/^[#-[]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[#-[]")), null === a && (/^[\]-~]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[\\]-~]")), null === a && (a = y())))),
								a
							}
							function W() {
								var a,
								b,
								d;
								return d = rd,
								92 === c.charCodeAt(rd) ? (a = "\\", rd++) : (a = null, 0 === sd && e('"\\\\"')),
								null !== a ? (/^[\0-\t]/.test(c.charAt(rd)) ? (b = c.charAt(rd), rd++) : (b = null, 0 === sd && e("[\\0-\\t]")), null === b && (/^[\x0B-\f]/.test(c.charAt(rd)) ? (b = c.charAt(rd), rd++) : (b = null, 0 === sd && e("[\\x0B-\\f]")), null === b && (/^[\x0E-]/.test(c.charAt(rd)) ? (b = c.charAt(rd), rd++) : (b = null, 0 === sd && e("[\\x0E-]")))), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function X() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return g = rd,
								h = rd,
								a = Z(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = aa(), d = null !== d ? d : "", null !== d ? (f = ea(), null !== f ? a = [a, b, d, f] : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h),
								null !== a && (a = function (a) {
									try {
										xd.uri = new vd(xd.scheme, xd.user, xd.host, xd.port),
										delete xd.scheme,
										delete xd.user,
										delete xd.host,
										delete xd.host_type,
										delete xd.port
									} catch (b) {
										xd = -1
									}
								}
									(g)),
								null === a && (rd = g),
								a
							}
							function Y() {
								var a,
								b,
								f,
								g,
								h,
								i,
								j,
								k;
								return j = rd,
								k = rd,
								a = Z(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (f = aa(), f = null !== f ? f : "", null !== f ? (g = ea(), null !== g ? (h = qa(), null !== h ? (i = Da(), i = null !== i ? i : "", null !== i ? a = [a, b, f, g, h, i] : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k),
								null !== a && (a = function (a) {
									try {
										xd.uri = new vd(xd.scheme, xd.user, xd.host, xd.port, xd.uri_params, xd.uri_headers),
										delete xd.scheme,
										delete xd.user,
										delete xd.host,
										delete xd.host_type,
										delete xd.port,
										delete xd.uri_params,
										"SIP_URI" === d && (xd = xd.uri)
									} catch (b) {
										xd = -1
									}
								}
									(j)),
								null === a && (rd = j),
								a
							}
							function Z() {
								var a;
								return a = $(),
								null === a && (a = _()),
								a
							}
							function $() {
								var a,
								b;
								return b = rd,
								"sips" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"sips"')),
								null !== a && (a = function (a, b) {
									xd.scheme = b.toLowerCase()
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function _() {
								var a,
								b;
								return b = rd,
								"sip" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"sip"')),
								null !== a && (a = function (a, b) {
									xd.scheme = b.toLowerCase()
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function aa() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return f = rd,
								g = rd,
								a = ba(),
								null !== a ? (h = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = da(), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h), b = null !== b ? b : "", null !== b ? (64 === c.charCodeAt(rd) ? (d = "@", rd++) : (d = null, 0 === sd && e('"@"')), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									xd.user = decodeURIComponent(c.substring(rd - 1, a))
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function ba() {
								var a,
								b;
								if (b = q(), null === b && (b = s(), null === b && (b = ca())), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = q(), null === b && (b = s(), null === b && (b = ca()));
								else
									a = null;
								return a
							}
							function ca() {
								var a;
								return 38 === c.charCodeAt(rd) ? (a = "&", rd++) : (a = null, 0 === sd && e('"&"')),
								null === a && (61 === c.charCodeAt(rd) ? (a = "=", rd++) : (a = null, 0 === sd && e('"="')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')), null === a && (44 === c.charCodeAt(rd) ? (a = ",", rd++) : (a = null, 0 === sd && e('","')), null === a && (59 === c.charCodeAt(rd) ? (a = ";", rd++) : (a = null, 0 === sd && e('";"')), null === a && (63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null === a && (47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"'))))))))),
								a
							}
							function da() {
								var a,
								b,
								d;
								for (d = rd, a = [], b = q(), null === b && (b = s(), null === b && (38 === c.charCodeAt(rd) ? (b = "&", rd++) : (b = null, 0 === sd && e('"&"')), null === b && (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (36 === c.charCodeAt(rd) ? (b = "$", rd++) : (b = null, 0 === sd && e('"$"')), null === b && (44 === c.charCodeAt(rd) ? (b = ",", rd++) : (b = null, 0 === sd && e('","')))))))); null !== b; )
									a.push(b), b = q(), null === b && (b = s(), null === b && (38 === c.charCodeAt(rd) ? (b = "&", rd++) : (b = null, 0 === sd && e('"&"')), null === b && (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')), null === b && (36 === c.charCodeAt(rd) ? (b = "$", rd++) : (b = null, 0 === sd && e('"$"')), null === b && (44 === c.charCodeAt(rd) ? (b = ",", rd++) : (b = null, 0 === sd && e('","'))))))));
								return null !== a && (a = function (a) {
									xd.password = c.substring(rd, a)
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function ea() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								a = fa(),
								null !== a ? (g = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = pa(), null !== d ? b = [b, d] : (b = null, rd = g)) : (b = null, rd = g), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function fa() {
								var a,
								b;
								return b = rd,
								a = ga(),
								null === a && (a = na(), null === a && (a = ja())),
								null !== a && (a = function (a) {
									return xd.host = c.substring(rd, a).toLowerCase(),
									xd.host
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function ga() {
								var a,
								b,
								d,
								f,
								g,
								h;
								for (f = rd, g = rd, a = [], h = rd, b = ha(), null !== b ? (46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h); null !== b; )
									a.push(b), h = rd, b = ha(), null !== b ? (46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h);
								return null !== a ? (b = ia(), null !== b ? (46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')), d = null !== d ? d : "", null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return xd.host_type = "domain",
									c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function ha() {
								var a,
								b,
								d,
								f;
								if (f = rd, a = o(), null !== a) {
									for (b = [], d = o(), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (95 === c.charCodeAt(rd) ? (d = "_", rd++) : (d = null, 0 === sd && e('"_"')))); null !== d; )
										b.push(d), d = o(), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (95 === c.charCodeAt(rd) ? (d = "_", rd++) : (d = null, 0 === sd && e('"_"'))));
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return a
							}
							function ia() {
								var a,
								b,
								d,
								f;
								if (f = rd, a = h(), null !== a) {
									for (b = [], d = o(), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (95 === c.charCodeAt(rd) ? (d = "_", rd++) : (d = null, 0 === sd && e('"_"')))); null !== d; )
										b.push(d), d = o(), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (95 === c.charCodeAt(rd) ? (d = "_", rd++) : (d = null, 0 === sd && e('"_"'))));
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return a
							}
							function ja() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								91 === c.charCodeAt(rd) ? (a = "[", rd++) : (a = null, 0 === sd && e('"["')),
								null !== a ? (b = ka(), null !== b ? (93 === c.charCodeAt(rd) ? (d = "]", rd++) : (d = null, 0 === sd && e('"]"')), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									return xd.host_type = "IPv6",
									c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function ka() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j,
								k,
								l,
								m,
								n,
								o,
								p,
								q,
								r;
								return p = rd,
								q = rd,
								a = la(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? (58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? (58 === c.charCodeAt(rd) ? (h = ":", rd++) : (h = null, 0 === sd && e('":"')), null !== h ? (i = la(), null !== i ? (58 === c.charCodeAt(rd) ? (j = ":", rd++) : (j = null, 0 === sd && e('":"')), null !== j ? (k = la(), null !== k ? (58 === c.charCodeAt(rd) ? (l = ":", rd++) : (l = null, 0 === sd && e('":"')), null !== l ? (m = la(), null !== m ? (58 === c.charCodeAt(rd) ? (n = ":", rd++) : (n = null, 0 === sd && e('":"')), null !== n ? (o = ma(), null !== o ? a = [a, b, d, f, g, h, i, j, k, l, m, n, o] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q),
								null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? (58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? (58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? (58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = la(), null !== j ? (58 === c.charCodeAt(rd) ? (k = ":", rd++) : (k = null, 0 === sd && e('":"')), null !== k ? (l = la(), null !== l ? (58 === c.charCodeAt(rd) ? (m = ":", rd++) : (m = null, 0 === sd && e('":"')), null !== m ? (n = ma(), null !== n ? a = [a, b, d, f, g, h, i, j, k, l, m, n] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? (58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? (58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? (58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = la(), null !== j ? (58 === c.charCodeAt(rd) ? (k = ":", rd++) : (k = null, 0 === sd && e('":"')), null !== k ? (l = ma(), null !== l ? a = [a, b, d, f, g, h, i, j, k, l] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? (58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? (58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? (58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = ma(), null !== j ? a = [a, b, d, f, g, h, i, j] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? (58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? (58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = ma(), null !== h ? a = [a, b, d, f, g, h] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? (58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = ma(), null !== f ? a = [a, b, d, f] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = ma(), null !== b ? a = [a, b] : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, "::" === c.substr(rd, 2) ? (a = "::", rd += 2) : (a = null, 0 === sd && e('"::"')), null !== a ? (b = la(), null !== b ? a = [a, b] : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? ("::" === c.substr(rd, 2) ? (b = "::", rd += 2) : (b = null, 0 === sd && e('"::"')), null !== b ? (d = la(), null !== d ? (58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? (58 === c.charCodeAt(rd) ? (h = ":", rd++) : (h = null, 0 === sd && e('":"')), null !== h ? (i = la(), null !== i ? (58 === c.charCodeAt(rd) ? (j = ":", rd++) : (j = null, 0 === sd && e('":"')), null !== j ? (k = la(), null !== k ? (58 === c.charCodeAt(rd) ? (l = ":", rd++) : (l = null, 0 === sd && e('":"')), null !== l ? (m = ma(), null !== m ? a = [a, b, d, f, g, h, i, j, k, l, m] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? ("::" === c.substr(rd, 2) ? (d = "::", rd += 2) : (d = null, 0 === sd && e('"::"')), null !== d ? (f = la(), null !== f ? (58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? (58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = la(), null !== j ? (58 === c.charCodeAt(rd) ? (k = ":", rd++) : (k = null, 0 === sd && e('":"')), null !== k ? (l = ma(), null !== l ? a = [a, b, d, f, g, h, i, j, k, l] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? (r = rd, 58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? d = [d, f] : (d = null, rd = r)) : (d = null, rd = r), d = null !== d ? d : "", null !== d ? ("::" === c.substr(rd, 2) ? (f = "::", rd += 2) : (f = null, 0 === sd && e('"::"')), null !== f ? (g = la(), null !== g ? (58 === c.charCodeAt(rd) ? (h = ":", rd++) : (h = null, 0 === sd && e('":"')), null !== h ? (i = la(), null !== i ? (58 === c.charCodeAt(rd) ? (j = ":", rd++) : (j = null, 0 === sd && e('":"')), null !== j ? (k = ma(), null !== k ? a = [a, b, d, f, g, h, i, j, k] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? (r = rd, 58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? d = [d, f] : (d = null, rd = r)) : (d = null, rd = r), d = null !== d ? d : "", null !== d ? (r = rd, 58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? f = [f, g] : (f = null, rd = r)) : (f = null, rd = r), f = null !== f ? f : "", null !== f ? ("::" === c.substr(rd, 2) ? (g = "::", rd += 2) : (g = null, 0 === sd && e('"::"')), null !== g ? (h = la(), null !== h ? (58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = ma(), null !== j ? a = [a, b, d, f, g, h, i, j] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? (r = rd, 58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? d = [d, f] : (d = null, rd = r)) : (d = null, rd = r), d = null !== d ? d : "", null !== d ? (r = rd, 58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? f = [f, g] : (f = null, rd = r)) : (f = null, rd = r), f = null !== f ? f : "", null !== f ? (r = rd, 58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? g = [g, h] : (g = null, rd = r)) : (g = null, rd = r), g = null !== g ? g : "", null !== g ? ("::" === c.substr(rd, 2) ? (h = "::", rd += 2) : (h = null, 0 === sd && e('"::"')), null !== h ? (i = ma(), null !== i ? a = [a, b, d, f, g, h, i] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? (r = rd, 58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? d = [d, f] : (d = null, rd = r)) : (d = null, rd = r), d = null !== d ? d : "", null !== d ? (r = rd, 58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? f = [f, g] : (f = null, rd = r)) : (f = null, rd = r), f = null !== f ? f : "", null !== f ? (r = rd, 58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? g = [g, h] : (g = null, rd = r)) : (g = null, rd = r), g = null !== g ? g : "", null !== g ? (r = rd, 58 === c.charCodeAt(rd) ? (h = ":", rd++) : (h = null, 0 === sd && e('":"')), null !== h ? (i = la(), null !== i ? h = [h, i] : (h = null, rd = r)) : (h = null, rd = r), h = null !== h ? h : "", null !== h ? ("::" === c.substr(rd, 2) ? (i = "::", rd += 2) : (i = null, 0 === sd && e('"::"')), null !== i ? (j = la(), null !== j ? a = [a, b, d, f, g, h, i, j] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q), null === a && (q = rd, a = la(), null !== a ? (r = rd, 58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? b = [b, d] : (b = null, rd = r)) : (b = null, rd = r), b = null !== b ? b : "", null !== b ? (r = rd, 58 === c.charCodeAt(rd) ? (d = ":", rd++) : (d = null, 0 === sd && e('":"')), null !== d ? (f = la(), null !== f ? d = [d, f] : (d = null, rd = r)) : (d = null, rd = r), d = null !== d ? d : "", null !== d ? (r = rd, 58 === c.charCodeAt(rd) ? (f = ":", rd++) : (f = null, 0 === sd && e('":"')), null !== f ? (g = la(), null !== g ? f = [f, g] : (f = null, rd = r)) : (f = null, rd = r), f = null !== f ? f : "", null !== f ? (r = rd, 58 === c.charCodeAt(rd) ? (g = ":", rd++) : (g = null, 0 === sd && e('":"')), null !== g ? (h = la(), null !== h ? g = [g, h] : (g = null, rd = r)) : (g = null, rd = r), g = null !== g ? g : "", null !== g ? (r = rd, 58 === c.charCodeAt(rd) ? (h = ":", rd++) : (h = null, 0 === sd && e('":"')), null !== h ? (i = la(), null !== i ? h = [h, i] : (h = null, rd = r)) : (h = null, rd = r), h = null !== h ? h : "", null !== h ? (r = rd, 58 === c.charCodeAt(rd) ? (i = ":", rd++) : (i = null, 0 === sd && e('":"')), null !== i ? (j = la(), null !== j ? i = [i, j] : (i = null, rd = r)) : (i = null, rd = r), i = null !== i ? i : "", null !== i ? ("::" === c.substr(rd, 2) ? (j = "::", rd += 2) : (j = null, 0 === sd && e('"::"')), null !== j ? a = [a, b, d, f, g, h, i, j] : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q)) : (a = null, rd = q))))))))))))))),
								null !== a && (a = function (a) {
									return xd.host_type = "IPv6",
									c.substring(rd, a)
								}
									(p)),
								null === a && (rd = p),
								a
							}
							function la() {
								var a,
								b,
								c,
								d,
								e;
								return e = rd,
								a = i(),
								null !== a ? (b = i(), b = null !== b ? b : "", null !== b ? (c = i(), c = null !== c ? c : "", null !== c ? (d = i(), d = null !== d ? d : "", null !== d ? a = [a, b, c, d] : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e),
								a
							}
							function ma() {
								var a,
								b,
								d,
								f;
								return f = rd,
								a = la(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = la(), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								null === a && (a = na()),
								a
							}
							function na() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j,
								k;
								return j = rd,
								k = rd,
								a = oa(),
								null !== a ? (46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null !== b ? (d = oa(), null !== d ? (46 === c.charCodeAt(rd) ? (f = ".", rd++) : (f = null, 0 === sd && e('"."')), null !== f ? (g = oa(), null !== g ? (46 === c.charCodeAt(rd) ? (h = ".", rd++) : (h = null, 0 === sd && e('"."')), null !== h ? (i = oa(), null !== i ? a = [a, b, d, f, g, h, i] : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k)) : (a = null, rd = k),
								null !== a && (a = function (a) {
									return xd.host_type = "IPv4",
									c.substring(rd, a)
								}
									(j)),
								null === a && (rd = j),
								a
							}
							function oa() {
								var a,
								b,
								d,
								f;
								return f = rd,
								"25" === c.substr(rd, 2) ? (a = "25", rd += 2) : (a = null, 0 === sd && e('"25"')),
								null !== a ? (/^[0-5]/.test(c.charAt(rd)) ? (b = c.charAt(rd), rd++) : (b = null, 0 === sd && e("[0-5]")), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null === a && (f = rd, 50 === c.charCodeAt(rd) ? (a = "2", rd++) : (a = null, 0 === sd && e('"2"')), null !== a ? (/^[0-4]/.test(c.charAt(rd)) ? (b = c.charAt(rd), rd++) : (b = null, 0 === sd && e("[0-4]")), null !== b ? (d = g(), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f), null === a && (f = rd, 49 === c.charCodeAt(rd) ? (a = "1", rd++) : (a = null, 0 === sd && e('"1"')), null !== a ? (b = g(), null !== b ? (d = g(), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f), null === a && (f = rd, /^[1-9]/.test(c.charAt(rd)) ? (a = c.charAt(rd), rd++) : (a = null, 0 === sd && e("[1-9]")), null !== a ? (b = g(), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f), null === a && (a = g())))),
								a
							}
							function pa() {
								var a,
								b,
								c,
								d,
								e,
								f,
								h;
								return f = rd,
								h = rd,
								a = g(),
								a = null !== a ? a : "",
								null !== a ? (b = g(), b = null !== b ? b : "", null !== b ? (c = g(), c = null !== c ? c : "", null !== c ? (d = g(), d = null !== d ? d : "", null !== d ? (e = g(), e = null !== e ? e : "", null !== e ? a = [a, b, c, d, e] : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h),
								null !== a && (a = function (a, b) {
									return b = parseInt(b.join("")),
									xd.port = b,
									b
								}
									(f, a)),
								null === a && (rd = f),
								a
							}
							function qa() {
								var a,
								b,
								d,
								f;
								for (a = [], f = rd, 59 === c.charCodeAt(rd) ? (b = ";", rd++) : (b = null, 0 === sd && e('";"')), null !== b ? (d = ra(), null !== d ? b = [b, d] : (b = null, rd = f)) : (b = null, rd = f); null !== b; )
									a.push(b), f = rd, 59 === c.charCodeAt(rd) ? (b = ";", rd++) : (b = null, 0 === sd && e('";"')), null !== b ? (d = ra(), null !== d ? b = [b, d] : (b = null, rd = f)) : (b = null, rd = f);
								return a
							}
							function ra() {
								var a;
								return a = sa(),
								null === a && (a = ta(), null === a && (a = ua(), null === a && (a = va(), null === a && (a = wa(), null === a && (a = xa(), null === a && (a = ya())))))),
								a
							}
							function sa() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								"transport=" === c.substr(rd, 10).toLowerCase() ? (a = c.substr(rd, 10), rd += 10) : (a = null, 0 === sd && e('"transport="')),
								null !== a ? ("udp" === c.substr(rd, 3).toLowerCase() ? (b = c.substr(rd, 3), rd += 3) : (b = null, 0 === sd && e('"udp"')), null === b && ("tcp" === c.substr(rd, 3).toLowerCase() ? (b = c.substr(rd, 3), rd += 3) : (b = null, 0 === sd && e('"tcp"')), null === b && ("sctp" === c.substr(rd, 4).toLowerCase() ? (b = c.substr(rd, 4), rd += 4) : (b = null, 0 === sd && e('"sctp"')), null === b && ("tls" === c.substr(rd, 3).toLowerCase() ? (b = c.substr(rd, 3), rd += 3) : (b = null, 0 === sd && e('"tls"')), null === b && (b = B())))), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a, b) {
									xd.uri_params || (xd.uri_params = {}),
									xd.uri_params.transport = b.toLowerCase()
								}
									(d, a[1])),
								null === a && (rd = d),
								a
							}
							function ta() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								"user=" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"user="')),
								null !== a ? ("phone" === c.substr(rd, 5).toLowerCase() ? (b = c.substr(rd, 5), rd += 5) : (b = null, 0 === sd && e('"phone"')), null === b && ("ip" === c.substr(rd, 2).toLowerCase() ? (b = c.substr(rd, 2), rd += 2) : (b = null, 0 === sd && e('"ip"')), null === b && (b = B())), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a, b) {
									xd.uri_params || (xd.uri_params = {}),
									xd.uri_params.user = b.toLowerCase()
								}
									(d, a[1])),
								null === a && (rd = d),
								a
							}
							function ua() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								"method=" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"method="')),
								null !== a ? (b = jb(), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a, b) {
									xd.uri_params || (xd.uri_params = {}),
									xd.uri_params.method = b
								}
									(d, a[1])),
								null === a && (rd = d),
								a
							}
							function va() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								"ttl=" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"ttl="')),
								null !== a ? (b = Vc(), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a, b) {
									xd.params || (xd.params = {}),
									xd.params.ttl = b
								}
									(d, a[1])),
								null === a && (rd = d),
								a
							}
							function wa() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								"maddr=" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"maddr="')),
								null !== a ? (b = fa(), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								null !== a && (a = function (a, b) {
									xd.uri_params || (xd.uri_params = {}),
									xd.uri_params.maddr = b
								}
									(d, a[1])),
								null === a && (rd = d),
								a
							}
							function xa() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return f = rd,
								g = rd,
								"lr" === c.substr(rd, 2).toLowerCase() ? (a = c.substr(rd, 2), rd += 2) : (a = null, 0 === sd && e('"lr"')),
								null !== a ? (h = rd, 61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null !== b ? (d = B(), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									xd.uri_params || (xd.uri_params = {}),
									xd.uri_params.lr = void 0
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function ya() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return f = rd,
								g = rd,
								a = za(),
								null !== a ? (h = rd, 61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null !== b ? (d = Aa(), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b, c) {
									xd.uri_params || (xd.uri_params = {}),
									c = "undefined" == typeof c ? void 0 : c[1],
									xd.uri_params[b.toLowerCase()] = c
								}
									(f, a[0], a[1])),
								null === a && (rd = f),
								a
							}
							function za() {
								var a,
								b,
								c;
								if (c = rd, b = Ba(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = Ba();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									return b.join("")
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function Aa() {
								var a,
								b,
								c;
								if (c = rd, b = Ba(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = Ba();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									return b.join("")
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function Ba() {
								var a;
								return a = Ca(),
								null === a && (a = q(), null === a && (a = s())),
								a
							}
							function Ca() {
								var a;
								return 91 === c.charCodeAt(rd) ? (a = "[", rd++) : (a = null, 0 === sd && e('"["')),
								null === a && (93 === c.charCodeAt(rd) ? (a = "]", rd++) : (a = null, 0 === sd && e('"]"')), null === a && (47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"')), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (38 === c.charCodeAt(rd) ? (a = "&", rd++) : (a = null, 0 === sd && e('"&"')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')))))))),
								a
							}
							function Da() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i;
								if (h = rd, 63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null !== a)
									if (b = Ea(), null !== b) {
										for (d = [], i = rd, 38 === c.charCodeAt(rd) ? (f = "&", rd++) : (f = null, 0 === sd && e('"&"')), null !== f ? (g = Ea(), null !== g ? f = [f, g] : (f = null, rd = i)) : (f = null, rd = i); null !== f; )
											d.push(f), i = rd, 38 === c.charCodeAt(rd) ? (f = "&", rd++) : (f = null, 0 === sd && e('"&"')), null !== f ? (g = Ea(), null !== g ? f = [f, g] : (f = null, rd = i)) : (f = null, rd = i);
										null !== d ? a = [a, b, d] : (a = null, rd = h)
									} else
										a = null, rd = h;
								else
									a = null, rd = h;
								return a
							}
							function Ea() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								a = Fa(),
								null !== a ? (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null !== b ? (d = Ga(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b, c) {
									b = b.join("").toLowerCase(),
									c = c.join(""),
									xd.uri_headers || (xd.uri_headers = {}),
									xd.uri_headers[b] ? xd.uri_headers[b].push(c) : xd.uri_headers[b] = [c]
								}
									(f, a[0], a[2])),
								null === a && (rd = f),
								a
							}
							function Fa() {
								var a,
								b;
								if (b = Ha(), null === b && (b = q(), null === b && (b = s())), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = Ha(), null === b && (b = q(), null === b && (b = s()));
								else
									a = null;
								return a
							}
							function Ga() {
								var a,
								b;
								for (a = [], b = Ha(), null === b && (b = q(), null === b && (b = s())); null !== b; )
									a.push(b), b = Ha(), null === b && (b = q(), null === b && (b = s()));
								return a
							}
							function Ha() {
								var a;
								return 91 === c.charCodeAt(rd) ? (a = "[", rd++) : (a = null, 0 === sd && e('"["')),
								null === a && (93 === c.charCodeAt(rd) ? (a = "]", rd++) : (a = null, 0 === sd && e('"]"')), null === a && (47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"')), null === a && (63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')))))))),
								a
							}
							function Ia() {
								var a;
								return a = kb(),
								null === a && (a = Ja()),
								a
							}
							function Ja() {
								var a,
								b,
								c,
								d,
								e,
								f;
								return f = rd,
								a = jb(),
								null !== a ? (b = m(), null !== b ? (c = Ka(), null !== c ? (d = m(), null !== d ? (e = _a(), null !== e ? a = [a, b, c, d, e] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Ka() {
								var a;
								return a = Y(),
								null === a && (a = La()),
								a
							}
							function La() {
								var a,
								b,
								d,
								f;
								return f = rd,
								a = Wa(),
								null !== a ? (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null !== b ? (d = Ma(), null === d && (d = Pa()), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Ma() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								a = Na(),
								null === a && (a = Oa()),
								null !== a ? (g = rd, 63 === c.charCodeAt(rd) ? (b = "?", rd++) : (b = null, 0 === sd && e('"?"')), null !== b ? (d = $a(), null !== d ? b = [b, d] : (b = null, rd = g)) : (b = null, rd = g), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Na() {
								var a,
								b,
								d,
								f;
								return f = rd,
								"//" === c.substr(rd, 2) ? (a = "//", rd += 2) : (a = null, 0 === sd && e('"//"')),
								null !== a ? (b = Xa(), null !== b ? (d = Oa(), d = null !== d ? d : "", null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Oa() {
								var a,
								b,
								d;
								return d = rd,
								47 === c.charCodeAt(rd) ? (a = "/", rd++) : (a = null, 0 === sd && e('"/"')),
								null !== a ? (b = Sa(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function Pa() {
								var a,
								b,
								c,
								d;
								if (d = rd, a = Ra(), null !== a) {
									for (b = [], c = Qa(); null !== c; )
										b.push(c), c = Qa();
									null !== b ? a = [a, b] : (a = null, rd = d)
								} else
									a = null, rd = d;
								return a
							}
							function Qa() {
								var a;
								return a = p(),
								null === a && (a = q(), null === a && (a = s())),
								a
							}
							function Ra() {
								var a;
								return a = q(),
								null === a && (a = s(), null === a && (59 === c.charCodeAt(rd) ? (a = ";", rd++) : (a = null, 0 === sd && e('";"')), null === a && (63 === c.charCodeAt(rd) ? (a = "?", rd++) : (a = null, 0 === sd && e('"?"')), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (64 === c.charCodeAt(rd) ? (a = "@", rd++) : (a = null, 0 === sd && e('"@"')), null === a && (38 === c.charCodeAt(rd) ? (a = "&", rd++) : (a = null, 0 === sd && e('"&"')), null === a && (61 === c.charCodeAt(rd) ? (a = "=", rd++) : (a = null, 0 === sd && e('"="')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')), null === a && (44 === c.charCodeAt(rd) ? (a = ",", rd++) : (a = null, 0 === sd && e('","')))))))))))),
								a
							}
							function Sa() {
								var a,
								b,
								d,
								f,
								g,
								h;
								if (g = rd, a = Ta(), null !== a) {
									for (b = [], h = rd, 47 === c.charCodeAt(rd) ? (d = "/", rd++) : (d = null, 0 === sd && e('"/"')), null !== d ? (f = Ta(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h); null !== d; )
										b.push(d), h = rd, 47 === c.charCodeAt(rd) ? (d = "/", rd++) : (d = null, 0 === sd && e('"/"')), null !== d ? (f = Ta(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h);
									null !== b ? a = [a, b] : (a = null, rd = g)
								} else
									a = null, rd = g;
								return a
							}
							function Ta() {
								var a,
								b,
								d,
								f,
								g,
								h;
								for (g = rd, a = [], b = Va(); null !== b; )
									a.push(b), b = Va();
								if (null !== a) {
									for (b = [], h = rd, 59 === c.charCodeAt(rd) ? (d = ";", rd++) : (d = null, 0 === sd && e('";"')), null !== d ? (f = Ua(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h); null !== d; )
										b.push(d), h = rd, 59 === c.charCodeAt(rd) ? (d = ";", rd++) : (d = null, 0 === sd && e('";"')), null !== d ? (f = Ua(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h);
									null !== b ? a = [a, b] : (a = null, rd = g)
								} else
									a = null, rd = g;
								return a
							}
							function Ua() {
								var a,
								b;
								for (a = [], b = Va(); null !== b; )
									a.push(b), b = Va();
								return a
							}
							function Va() {
								var a;
								return a = q(),
								null === a && (a = s(), null === a && (58 === c.charCodeAt(rd) ? (a = ":", rd++) : (a = null, 0 === sd && e('":"')), null === a && (64 === c.charCodeAt(rd) ? (a = "@", rd++) : (a = null, 0 === sd && e('"@"')), null === a && (38 === c.charCodeAt(rd) ? (a = "&", rd++) : (a = null, 0 === sd && e('"&"')), null === a && (61 === c.charCodeAt(rd) ? (a = "=", rd++) : (a = null, 0 === sd && e('"="')), null === a && (43 === c.charCodeAt(rd) ? (a = "+", rd++) : (a = null, 0 === sd && e('"+"')), null === a && (36 === c.charCodeAt(rd) ? (a = "$", rd++) : (a = null, 0 === sd && e('"$"')), null === a && (44 === c.charCodeAt(rd) ? (a = ",", rd++) : (a = null, 0 === sd && e('","')))))))))),
								a
							}
							function Wa() {
								var a,
								b,
								d,
								f,
								i;
								if (f = rd, i = rd, a = h(), null !== a) {
									for (b = [], d = h(), null === d && (d = g(), null === d && (43 === c.charCodeAt(rd) ? (d = "+", rd++) : (d = null, 0 === sd && e('"+"')), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')))))); null !== d; )
										b.push(d), d = h(), null === d && (d = g(), null === d && (43 === c.charCodeAt(rd) ? (d = "+", rd++) : (d = null, 0 === sd && e('"+"')), null === d && (45 === c.charCodeAt(rd) ? (d = "-", rd++) : (d = null, 0 === sd && e('"-"')), null === d && (46 === c.charCodeAt(rd) ? (d = ".",
															rd++) : (d = null, 0 === sd && e('"."'))))));
									null !== b ? a = [a, b] : (a = null, rd = i)
								} else
									a = null, rd = i;
								return null !== a && (a = function (a) {
									xd.scheme = c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function Xa() {
								var a;
								return a = Ya(),
								null === a && (a = Za()),
								a
							}
							function Ya() {
								var a,
								b,
								d,
								f;
								return d = rd,
								f = rd,
								a = aa(),
								null !== a ? (64 === c.charCodeAt(rd) ? (b = "@", rd++) : (b = null, 0 === sd && e('"@"')), null !== b ? a = [a, b] : (a = null, rd = f)) : (a = null, rd = f),
								a = null !== a ? a : "",
								null !== a ? (b = ea(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a = null !== a ? a : ""
							}
							function Za() {
								var a,
								b;
								if (b = q(), null === b && (b = s(), null === b && (36 === c.charCodeAt(rd) ? (b = "$", rd++) : (b = null, 0 === sd && e('"$"')), null === b && (44 === c.charCodeAt(rd) ? (b = ",", rd++) : (b = null, 0 === sd && e('","')), null === b && (59 === c.charCodeAt(rd) ? (b = ";", rd++) : (b = null, 0 === sd && e('";"')), null === b && (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null === b && (64 === c.charCodeAt(rd) ? (b = "@", rd++) : (b = null, 0 === sd && e('"@"')), null === b && (38 === c.charCodeAt(rd) ? (b = "&", rd++) : (b = null, 0 === sd && e('"&"')), null === b && (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"'))))))))))), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = q(), null === b && (b = s(), null === b && (36 === c.charCodeAt(rd) ? (b = "$", rd++) : (b = null, 0 === sd && e('"$"')), null === b && (44 === c.charCodeAt(rd) ? (b = ",", rd++) : (b = null, 0 === sd && e('","')), null === b && (59 === c.charCodeAt(rd) ? (b = ";", rd++) : (b = null, 0 === sd && e('";"')), null === b && (58 === c.charCodeAt(rd) ? (b = ":", rd++) : (b = null, 0 === sd && e('":"')), null === b && (64 === c.charCodeAt(rd) ? (b = "@", rd++) : (b = null, 0 === sd && e('"@"')), null === b && (38 === c.charCodeAt(rd) ? (b = "&", rd++) : (b = null, 0 === sd && e('"&"')), null === b && (61 === c.charCodeAt(rd) ? (b = "=", rd++) : (b = null, 0 === sd && e('"="')), null === b && (43 === c.charCodeAt(rd) ? (b = "+", rd++) : (b = null, 0 === sd && e('"+"')))))))))));
								else
									a = null;
								return a
							}
							function $a() {
								var a,
								b;
								for (a = [], b = Qa(); null !== b; )
									a.push(b), b = Qa();
								return a
							}
							function _a() {
								var a,
								b,
								d,
								f,
								h,
								i,
								j,
								k;
								if (j = rd, k = rd, "sip" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"SIP"')), null !== a)
									if (47 === c.charCodeAt(rd) ? (b = "/", rd++) : (b = null, 0 === sd && e('"/"')), null !== b) {
										if (f = g(), null !== f)
											for (d = []; null !== f; )
												d.push(f), f = g();
										else
											d = null;
										if (null !== d)
											if (46 === c.charCodeAt(rd) ? (f = ".", rd++) : (f = null, 0 === sd && e('"."')), null !== f) {
												if (i = g(), null !== i)
													for (h = []; null !== i; )
														h.push(i), i = g();
												else
													h = null;
												null !== h ? a = [a, b, d, f, h] : (a = null, rd = k)
											} else
												a = null, rd = k;
										else
											a = null, rd = k
									} else
										a = null, rd = k;
								else
									a = null, rd = k;
								return null !== a && (a = function (a) {
									xd.sip_version = c.substring(rd, a)
								}
									(j)),
								null === a && (rd = j),
								a
							}
							function ab() {
								var a;
								return "INVITE" === c.substr(rd, 6) ? (a = "INVITE", rd += 6) : (a = null, 0 === sd && e('"INVITE"')),
								a
							}
							function bb() {
								var a;
								return "ACK" === c.substr(rd, 3) ? (a = "ACK", rd += 3) : (a = null, 0 === sd && e('"ACK"')),
								a
							}
							function cb() {
								var a;
								return "OPTIONS" === c.substr(rd, 7) ? (a = "OPTIONS", rd += 7) : (a = null, 0 === sd && e('"OPTIONS"')),
								a
							}
							function db() {
								var a;
								return "BYE" === c.substr(rd, 3) ? (a = "BYE", rd += 3) : (a = null, 0 === sd && e('"BYE"')),
								a
							}
							function eb() {
								var a;
								return "CANCEL" === c.substr(rd, 6) ? (a = "CANCEL", rd += 6) : (a = null, 0 === sd && e('"CANCEL"')),
								a
							}
							function fb() {
								var a;
								return "REGISTER" === c.substr(rd, 8) ? (a = "REGISTER", rd += 8) : (a = null, 0 === sd && e('"REGISTER"')),
								a
							}
							function gb() {
								var a;
								return "SUBSCRIBE" === c.substr(rd, 9) ? (a = "SUBSCRIBE", rd += 9) : (a = null, 0 === sd && e('"SUBSCRIBE"')),
								a
							}
							function hb() {
								var a;
								return "NOTIFY" === c.substr(rd, 6) ? (a = "NOTIFY", rd += 6) : (a = null, 0 === sd && e('"NOTIFY"')),
								a
							}
							function ib() {
								var a;
								return "REFER" === c.substr(rd, 5) ? (a = "REFER", rd += 5) : (a = null, 0 === sd && e('"REFER"')),
								a
							}
							function jb() {
								var a,
								b;
								return b = rd,
								a = ab(),
								null === a && (a = bb(), null === a && (a = cb(), null === a && (a = db(), null === a && (a = eb(), null === a && (a = fb(), null === a && (a = gb(), null === a && (a = hb(), null === a && (a = ib(), null === a && (a = B()))))))))),
								null !== a && (a = function (a) {
									return xd.method = c.substring(rd, a),
									xd.method
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function kb() {
								var a,
								b,
								c,
								d,
								e,
								f;
								return f = rd,
								a = _a(),
								null !== a ? (b = m(), null !== b ? (c = lb(), null !== c ? (d = m(), null !== d ? (e = nb(), null !== e ? a = [a, b, c, d, e] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function lb() {
								var a,
								b;
								return b = rd,
								a = mb(),
								null !== a && (a = function (a, b) {
									xd.status_code = parseInt(b.join(""))
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function mb() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = g(),
								null !== a ? (b = g(), null !== b ? (c = g(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function nb() {
								var a,
								b,
								d;
								for (d = rd, a = [], b = p(), null === b && (b = q(), null === b && (b = s(), null === b && (b = y(), null === b && (b = z(), null === b && (b = m(), null === b && (b = n())))))); null !== b; )
									a.push(b), b = p(), null === b && (b = q(), null === b && (b = s(), null === b && (b = y(), null === b && (b = z(), null === b && (b = m(), null === b && (b = n()))))));
								return null !== a && (a = function (a) {
									xd.reason_phrase = c.substring(rd, a)
								}
									(d)),
								null === a && (rd = d),
								a
							}
							function ob() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = Vb(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = Vb(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = Vb(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function pb() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return f = rd,
								g = rd,
								a = E(),
								null !== a ? (h = rd, 64 === c.charCodeAt(rd) ? (b = "@", rd++) : (b = null, 0 === sd && e('"@"')), null !== b ? (d = E(), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									xd = c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function qb() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, a = F(), null === a)
									if (f = rd, a = rb(), null !== a) {
										for (b = [], g = rd, c = M(), null !== c ? (d = rb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
											b.push(c), g = rd, c = M(), null !== c ? (d = rb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
										null !== b ? a = [a, b] : (a = null, rd = f)
									} else
										a = null, rd = f;
								return null !== a && (a = function (a) {
									var b,
									c;
									for (c = xd.multi_header.length, b = 0; b < c; b++)
										if (null === xd.multi_header[b].parsed) {
											xd = null;
											break
										}
									xd = null !== xd ? xd.multi_header : -1
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function rb() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = X(), null === a && (a = sb()), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = ub(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = ub(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									var b;
									xd.multi_header || (xd.multi_header = []);
									try {
										b = new wd(xd.uri, xd.display_name, xd.params),
										delete xd.uri,
										delete xd.display_name,
										delete xd.params
									} catch (c) {
										b = null
									}
									xd.multi_header.push({
										possition: rd,
										offset: a,
										parsed: b
									})
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function sb() {
								var a,
								b,
								c,
								d,
								e;
								return e = rd,
								a = tb(),
								a = null !== a ? a : "",
								null !== a ? (b = L(), null !== b ? (c = Y(), null !== c ? (d = K(), null !== d ? a = [a, b, c, d] : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e),
								a
							}
							function tb() {
								var a,
								b,
								d,
								e,
								f,
								g,
								h;
								if (f = rd, g = rd, a = B(), null !== a) {
									for (b = [], h = rd, d = t(), null !== d ? (e = B(), null !== e ? d = [d, e] : (d = null, rd = h)) : (d = null, rd = h); null !== d; )
										b.push(d), h = rd, d = t(), null !== d ? (e = B(), null !== e ? d = [d, e] : (d = null, rd = h)) : (d = null, rd = h);
									null !== b ? a = [a, b] : (a = null, rd = g)
								} else
									a = null, rd = g;
								return null === a && (a = T()),
								null !== a && (a = function (a, b) {
									b = c.substring(rd, a).trim(),
									'"' === b[0] && (b = b.substring(1, b.length - 1)),
									xd.display_name = b
								}
									(f, a)),
								null === a && (rd = f),
								a
							}
							function ub() {
								var a;
								return a = vb(),
								null === a && (a = wb(), null === a && (a = zb())),
								a
							}
							function vb() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"q" === c.substr(rd, 1).toLowerCase() ? (a = c.substr(rd, 1), rd++) : (a = null, 0 === sd && e('"q"')),
								null !== a ? (b = H(), null !== b ? (d = yb(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.params || (xd.params = {}),
									xd.params.q = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function wb() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"expires" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"expires"')),
								null !== a ? (b = H(), null !== b ? (d = xb(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.params || (xd.params = {}),
									xd.params.expires = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function xb() {
								var a,
								b,
								c;
								if (c = rd, b = g(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = g();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									return parseInt(b.join(""))
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function yb() {
								var a,
								b,
								d,
								f,
								h,
								i,
								j,
								k;
								return i = rd,
								j = rd,
								48 === c.charCodeAt(rd) ? (a = "0", rd++) : (a = null, 0 === sd && e('"0"')),
								null !== a ? (k = rd, 46 === c.charCodeAt(rd) ? (b = ".", rd++) : (b = null, 0 === sd && e('"."')), null !== b ? (d = g(), d = null !== d ? d : "", null !== d ? (f = g(), f = null !== f ? f : "", null !== f ? (h = g(), h = null !== h ? h : "", null !== h ? b = [b, d, f, h] : (b = null, rd = k)) : (b = null, rd = k)) : (b = null, rd = k)) : (b = null, rd = k), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = j)) : (a = null, rd = j),
								null !== a && (a = function (a) {
									return parseFloat(c.substring(rd, a))
								}
									(i)),
								null === a && (rd = i),
								a
							}
							function zb() {
								var a,
								b,
								c,
								d,
								e,
								f;
								return d = rd,
								e = rd,
								a = B(),
								null !== a ? (f = rd, b = H(), null !== b ? (c = Ab(), null !== c ? b = [b, c] : (b = null, rd = f)) : (b = null, rd = f), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = e)) : (a = null, rd = e),
								null !== a && (a = function (a, b, c) {
									xd.params || (xd.params = {}),
									c = "undefined" == typeof c ? void 0 : c[1],
									xd.params[b.toLowerCase()] = c
								}
									(d, a[0], a[1])),
								null === a && (rd = d),
								a
							}
							function Ab() {
								var a;
								return a = B(),
								null === a && (a = fa(), null === a && (a = T())),
								a
							}
							function Bb() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = Cb(), null !== a) {
									for (b = [], f = rd, c = N(), null !== c ? (d = Db(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = N(), null !== c ? (d = Db(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function Cb() {
								var a;
								return "render" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"render"')),
								null === a && ("session" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"session"')), null === a && ("icon" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"icon"')), null === a && ("alert" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"alert"')), null === a && (a = B())))),
								a
							}
							function Db() {
								var a;
								return a = Eb(),
								null === a && (a = zb()),
								a
							}
							function Eb() {
								var a,
								b,
								d,
								f;
								return f = rd,
								"handling" === c.substr(rd, 8).toLowerCase() ? (a = c.substr(rd, 8), rd += 8) : (a = null, 0 === sd && e('"handling"')),
								null !== a ? (b = H(), null !== b ? ("optional" === c.substr(rd, 8).toLowerCase() ? (d = c.substr(rd, 8), rd += 8) : (d = null, 0 === sd && e('"optional"')), null === d && ("required" === c.substr(rd, 8).toLowerCase() ? (d = c.substr(rd, 8), rd += 8) : (d = null, 0 === sd && e('"required"')), null === d && (d = B())), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Fb() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = B(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function Gb() {
								var a,
								b,
								c;
								if (c = rd, b = g(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = g();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									xd = parseInt(b.join(""))
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function Hb() {
								var a,
								b;
								return b = rd,
								a = Ib(),
								null !== a && (a = function (a) {
									xd = c.substring(rd, a)
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function Ib() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g,
								h;
								if (g = rd, a = Jb(), null !== a)
									if (b = G(), null !== b)
										if (c = Ob(), null !== c) {
											for (d = [], h = rd, e = N(), null !== e ? (f = Pb(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h); null !== e; )
												d.push(e), h = rd, e = N(), null !== e ? (f = Pb(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h);
											null !== d ? a = [a, b, c, d] : (a = null, rd = g)
										} else
											a = null, rd = g;
									else
										a = null, rd = g;
								else
									a = null, rd = g;
								return a
							}
							function Jb() {
								var a;
								return a = Kb(),
								null === a && (a = Lb()),
								a
							}
							function Kb() {
								var a;
								return "text" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"text"')),
								null === a && ("image" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"image"')), null === a && ("audio" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"audio"')), null === a && ("video" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"video"')), null === a && ("application" === c.substr(rd, 11).toLowerCase() ? (a = c.substr(rd, 11), rd += 11) : (a = null, 0 === sd && e('"application"')), null === a && (a = Mb()))))),
								a
							}
							function Lb() {
								var a;
								return "message" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"message"')),
								null === a && ("multipart" === c.substr(rd, 9).toLowerCase() ? (a = c.substr(rd, 9), rd += 9) : (a = null, 0 === sd && e('"multipart"')), null === a && (a = Mb())),
								a
							}
							function Mb() {
								var a;
								return a = B(),
								null === a && (a = Nb()),
								a
							}
							function Nb() {
								var a,
								b,
								d;
								return d = rd,
								"x-" === c.substr(rd, 2).toLowerCase() ? (a = c.substr(rd, 2), rd += 2) : (a = null, 0 === sd && e('"x-"')),
								null !== a ? (b = B(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function Ob() {
								var a;
								return a = Mb(),
								null === a && (a = B()),
								a
							}
							function Pb() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = B(),
								null !== a ? (b = H(), null !== b ? (c = Qb(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function Qb() {
								var a;
								return a = B(),
								null === a && (a = T()),
								a
							}
							function Rb() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = Sb(),
								null !== a ? (b = t(), null !== b ? (c = jb(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function Sb() {
								var a,
								b,
								c;
								if (c = rd, b = g(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = g();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									xd.value = parseInt(b.join(""))
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function Tb() {
								var a,
								b;
								return b = rd,
								a = xb(),
								null !== a && (a = function (a, b) {
									xd = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function Ub() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = Vb(), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a, b) {
									xd.event = b.join("").toLowerCase()
								}
									(e, a[0])),
								null === a && (rd = e),
								a
							}
							function Vb() {
								var a,
								b,
								d,
								f,
								g,
								h;
								if (g = rd, a = C(), null !== a) {
									for (b = [], h = rd, 46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')), null !== d ? (f = C(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h); null !== d; )
										b.push(d), h = rd, 46 === c.charCodeAt(rd) ? (d = ".", rd++) : (d = null, 0 === sd && e('"."')), null !== d ? (f = C(), null !== f ? d = [d, f] : (d = null, rd = h)) : (d = null, rd = h);
									null !== b ? a = [a, b] : (a = null, rd = g)
								} else
									a = null, rd = g;
								return a
							}
							function Wb() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = X(), null === a && (a = sb()), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = Xb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = Xb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									var b = xd.tag;
									try {
										xd = new wd(xd.uri, xd.display_name, xd.params),
										b && xd.setParam("tag", b)
									} catch (c) {
										xd = -1
									}
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function Xb() {
								var a;
								return a = Yb(),
								null === a && (a = zb()),
								a
							}
							function Yb() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"tag" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"tag"')),
								null !== a ? (b = H(), null !== b ? (d = B(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.tag = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function Zb() {
								var a,
								b,
								c;
								if (c = rd, b = g(), null !== b)
									for (a = []; null !== b; )
										a.push(b), b = g();
								else
									a = null;
								return null !== a && (a = function (a, b) {
									xd = parseInt(b.join(""))
								}
									(c, a)),
								null === a && (rd = c),
								a
							}
							function $b() {
								var a,
								b;
								return b = rd,
								a = xb(),
								null !== a && (a = function (a, b) {
									xd = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function _b() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g,
								h,
								i,
								j;
								for (h = rd, i = rd, a = [], b = tb(); null !== b; )
									a.push(b), b = tb();
								if (null !== a)
									if (b = L(), null !== b)
										if (c = Y(), null !== c)
											if (d = K(), null !== d) {
												for (e = [], j = rd, f = N(), null !== f ? (g = zb(), null !== g ? f = [f, g] : (f = null, rd = j)) : (f = null, rd = j); null !== f; )
													e.push(f), j = rd, f = N(), null !== f ? (g = zb(), null !== g ? f = [f, g] : (f = null, rd = j)) : (f = null, rd = j);
												null !== e ? a = [a, b, c, d, e] : (a = null, rd = i)
											} else
												a = null, rd = i;
										else
											a = null, rd = i;
									else
										a = null, rd = i;
								else
									a = null, rd = i;
								return null !== a && (a = function (a) {
									try {
										xd = new wd(xd.uri, xd.display_name, xd.params)
									} catch (b) {
										xd = -1
									}
								}
									(h)),
								null === a && (rd = h),
								a
							}
							function ac() {
								var a;
								return a = bc()
							}
							function bc() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j;
								if (i = rd, "digest" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"Digest"')), null !== a)
									if (b = t(), null !== b)
										if (d = ec(), null !== d) {
											for (f = [], j = rd, g = M(), null !== g ? (h = ec(), null !== h ? g = [g, h] : (g = null, rd = j)) : (g = null, rd = j); null !== g; )
												f.push(g), j = rd, g = M(), null !== g ? (h = ec(), null !== h ? g = [g, h] : (g = null, rd = j)) : (g = null, rd = j);
											null !== f ? a = [a, b, d, f] : (a = null, rd = i)
										} else
											a = null, rd = i;
									else
										a = null, rd = i;
								else
									a = null, rd = i;
								return null === a && (a = cc()),
								a
							}
							function cc() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g,
								h;
								if (g = rd, a = B(), null !== a)
									if (b = t(), null !== b)
										if (c = dc(), null !== c) {
											for (d = [], h = rd, e = M(), null !== e ? (f = dc(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h); null !== e; )
												d.push(e), h = rd, e = M(), null !== e ? (f = dc(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h);
											null !== d ? a = [a, b, c, d] : (a = null, rd = g)
										} else
											a = null, rd = g;
									else
										a = null, rd = g;
								else
									a = null, rd = g;
								return a
							}
							function dc() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = B(),
								null !== a ? (b = H(), null !== b ? (c = B(), null === c && (c = T()), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function ec() {
								var a;
								return a = fc(),
								null === a && (a = hc(), null === a && (a = jc(), null === a && (a = lc(), null === a && (a = mc(), null === a && (a = nc(), null === a && (a = oc(), null === a && (a = dc()))))))),
								a
							}
							function fc() {
								var a,
								b,
								d,
								f;
								return f = rd,
								"realm" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"realm"')),
								null !== a ? (b = H(), null !== b ? (d = gc(), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function gc() {
								var a,
								b;
								return b = rd,
								a = U(),
								null !== a && (a = function (a, b) {
									xd.realm = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function hc() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j,
								k;
								if (j = rd, "domain" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"domain"')), null !== a)
									if (b = H(), null !== b)
										if (d = P(), null !== d)
											if (f = ic(), null !== f) {
												if (g = [], k = rd, i = m(), null !== i)
													for (h = []; null !== i; )
														h.push(i), i = m();
												else
													h = null;
												for (null !== h ? (i = ic(), null !== i ? h = [h, i] : (h = null, rd = k)) : (h = null, rd = k); null !== h; ) {
													if (g.push(h), k = rd, i = m(), null !== i)
														for (h = []; null !== i; )
															h.push(i), i = m();
													else
														h = null;
													null !== h ? (i = ic(), null !== i ? h = [h, i] : (h = null, rd = k)) : (h = null, rd = k)
												}
												null !== g ? (h = Q(), null !== h ? a = [a, b, d, f, g, h] : (a = null, rd = j)) : (a = null, rd = j)
											} else
												a = null, rd = j;
										else
											a = null, rd = j;
									else
										a = null, rd = j;
								else
									a = null, rd = j;
								return a
							}
							function ic() {
								var a;
								return a = La(),
								null === a && (a = Oa()),
								a
							}
							function jc() {
								var a,
								b,
								d,
								f;
								return f = rd,
								"nonce" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"nonce"')),
								null !== a ? (b = H(), null !== b ? (d = kc(), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function kc() {
								var a,
								b;
								return b = rd,
								a = U(),
								null !== a && (a = function (a, b) {
									xd.nonce = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function lc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"opaque" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"opaque"')),
								null !== a ? (b = H(), null !== b ? (d = U(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.opaque = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function mc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								"stale" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"stale"')),
								null !== a ? (b = H(), null !== b ? (g = rd, "true" === c.substr(rd, 4).toLowerCase() ? (d = c.substr(rd, 4), rd += 4) : (d = null, 0 === sd && e('"true"')), null !== d && (d = function (a) {
											xd.stale = !0
										}
											(g)), null === d && (rd = g), null === d && (g = rd, "false" === c.substr(rd, 5).toLowerCase() ? (d = c.substr(rd, 5), rd += 5) : (d = null, 0 === sd && e('"false"')), null !== d && (d = function (a) {
												xd.stale = !1
											}
												(g)), null === d && (rd = g)), null !== d ? a = [a, b, d] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function nc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"algorithm" === c.substr(rd, 9).toLowerCase() ? (a = c.substr(rd, 9), rd += 9) : (a = null, 0 === sd && e('"algorithm"')),
								null !== a ? (b = H(), null !== b ? ("md5" === c.substr(rd, 3).toLowerCase() ? (d = c.substr(rd, 3), rd += 3) : (d = null, 0 === sd && e('"MD5"')), null === d && ("md5-sess" === c.substr(rd, 8).toLowerCase() ? (d = c.substr(rd, 8), rd += 8) : (d = null, 0 === sd && e('"MD5-sess"')), null === d && (d = B())), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.algorithm = b.toUpperCase()
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function oc() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j,
								k,
								l;
								if (j = rd, "qop" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"qop"')), null !== a)
									if (b = H(), null !== b)
										if (d = P(), null !== d) {
											if (k = rd, f = pc(), null !== f) {
												for (g = [], l = rd, 44 === c.charCodeAt(rd) ? (h = ",", rd++) : (h = null, 0 === sd && e('","')), null !== h ? (i = pc(), null !== i ? h = [h, i] : (h = null, rd = l)) : (h = null, rd = l); null !== h; )
													g.push(h), l = rd, 44 === c.charCodeAt(rd) ? (h = ",", rd++) : (h = null, 0 === sd && e('","')), null !== h ? (i = pc(), null !== i ? h = [h, i] : (h = null, rd = l)) : (h = null, rd = l);
												null !== g ? f = [f, g] : (f = null, rd = k)
											} else
												f = null, rd = k;
											null !== f ? (g = Q(), null !== g ? a = [a, b, d, f, g] : (a = null, rd = j)) : (a = null, rd = j)
										} else
											a = null, rd = j;
									else
										a = null, rd = j;
								else
									a = null, rd = j;
								return a
							}
							function pc() {
								var a,
								b;
								return b = rd,
								"auth-int" === c.substr(rd, 8).toLowerCase() ? (a = c.substr(rd, 8), rd += 8) : (a = null, 0 === sd && e('"auth-int"')),
								null === a && ("auth" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"auth"')), null === a && (a = B())),
								null !== a && (a = function (a, b) {
									xd.qop || (xd.qop = []),
									xd.qop.push(b.toLowerCase())
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function qc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = B(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function rc() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = sc(), null !== a) {
									for (b = [], g = rd, c = M(), null !== c ? (d = sc(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = M(), null !== c ? (d = sc(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									var b,
									c;
									for (c = xd.multi_header.length, b = 0; b < c; b++)
										if (null === xd.multi_header[b].parsed) {
											xd = null;
											break
										}
									xd = null !== xd ? xd.multi_header : -1
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function sc() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = sb(), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									var b;
									xd.multi_header || (xd.multi_header = []);
									try {
										b = new wd(xd.uri, xd.display_name, xd.params),
										delete xd.uri,
										delete xd.display_name,
										delete xd.params
									} catch (c) {
										b = null
									}
									xd.multi_header.push({
										possition: rd,
										offset: a,
										parsed: b
									})
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function tc() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i;
								if (g = rd, h = rd, "sip" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"SIP"')), null === a && (a = B()), null !== a) {
									for (b = [], i = rd, d = N(), null !== d ? (f = uc(), null !== f ? d = [d, f] : (d = null, rd = i)) : (d = null, rd = i); null !== d; )
										b.push(d), i = rd, d = N(), null !== d ? (f = uc(), null !== f ? d = [d, f] : (d = null, rd = i)) : (d = null, rd = i);
									null !== b ? a = [a, b] : (a = null, rd = h)
								} else
									a = null, rd = h;
								return null !== a && (a = function (a, b) {
									if (xd.protocol = b.toLowerCase(), xd.params || (xd.params = {}), xd.params.text && '"' === xd.params.text[0]) {
										var c = xd.params.text;
										xd.text = c.substring(1, c.length - 1),
										delete xd.params.text
									}
								}
									(g, a[0])),
								null === a && (rd = g),
								a
							}
							function uc() {
								var a;
								return a = vc(),
								null === a && (a = zb()),
								a
							}
							function vc() {
								var a,
								b,
								d,
								f,
								h,
								i;
								if (h = rd, i = rd, "cause" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"cause"')), null !== a)
									if (b = H(), null !== b) {
										if (f = g(), null !== f)
											for (d = []; null !== f; )
												d.push(f), f = g();
										else
											d = null;
										null !== d ? a = [a, b, d] : (a = null, rd = i)
									} else
										a = null, rd = i;
								else
									a = null, rd = i;
								return null !== a && (a = function (a, b) {
									xd.cause = parseInt(b.join(""))
								}
									(h, a[2])),
								null === a && (rd = h),
								a
							}
							function wc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = B(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function xc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = yc(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = yc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = yc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function yc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = sb(), null !== a) {
									for (b = [], f = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function zc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = Ac(), null !== a) {
									for (b = [], f = rd, c = N(), null !== c ? (d = Bc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = N(), null !== c ? (d = Bc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function Ac() {
								var a,
								b;
								return b = rd,
								"active" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"active"')),
								null === a && ("pending" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"pending"')), null === a && ("terminated" === c.substr(rd, 10).toLowerCase() ? (a = c.substr(rd, 10), rd += 10) : (a = null, 0 === sd && e('"terminated"')), null === a && (a = B()))),
								null !== a && (a = function (a) {
									xd.state = c.substring(rd, a)
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function Bc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"reason" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"reason"')),
								null !== a ? (b = H(), null !== b ? (d = Cc(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									"undefined" != typeof b && (xd.reason = b)
								}
									(f, a[2])),
								null === a && (rd = f),
								null === a && (f = rd, g = rd, "expires" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"expires"')), null !== a ? (b = H(), null !== b ? (d = xb(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g), null !== a && (a = function (a, b) {
										"undefined" != typeof b && (xd.expires = b)
									}
										(f, a[2])), null === a && (rd = f), null === a && (f = rd, g = rd, "retry_after" === c.substr(rd, 11).toLowerCase() ? (a = c.substr(rd, 11), rd += 11) : (a = null, 0 === sd && e('"retry_after"')), null !== a ? (b = H(), null !== b ? (d = xb(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g), null !== a && (a = function (a, b) {
											"undefined" != typeof b && (xd.retry_after = b)
										}
											(f, a[2])), null === a && (rd = f), null === a && (a = zb()))),
								a
							}
							function Cc() {
								var a;
								return "deactivated" === c.substr(rd, 11).toLowerCase() ? (a = c.substr(rd, 11), rd += 11) : (a = null, 0 === sd && e('"deactivated"')),
								null === a && ("probation" === c.substr(rd, 9).toLowerCase() ? (a = c.substr(rd, 9), rd += 9) : (a = null, 0 === sd && e('"probation"')), null === a && ("rejected" === c.substr(rd, 8).toLowerCase() ? (a = c.substr(rd, 8), rd += 8) : (a = null, 0 === sd && e('"rejected"')), null === a && ("timeout" === c.substr(rd, 7).toLowerCase() ? (a = c.substr(rd, 7), rd += 7) : (a = null, 0 === sd && e('"timeout"')), null === a && ("giveup" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"giveup"')), null === a && ("noresource" === c.substr(rd, 10).toLowerCase() ? (a = c.substr(rd, 10), rd += 10) : (a = null, 0 === sd && e('"noresource"')), null === a && ("invariant" === c.substr(rd, 9).toLowerCase() ? (a = c.substr(rd, 9), rd += 9) : (a = null, 0 === sd && e('"invariant"')), null === a && (a = B()))))))),
								a
							}
							function Dc() {
								var a;
								return a = w(),
								a = null !== a ? a : ""
							}
							function Ec() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = B(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = B(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a = null !== a ? a : ""
							}
							function Fc() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = X(), null === a && (a = sb()), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = Gc(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = Gc(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									var b = xd.tag;
									try {
										xd = new wd(xd.uri, xd.display_name, xd.params),
										b && xd.setParam("tag", b)
									} catch (c) {
										xd = -1
									}
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function Gc() {
								var a;
								return a = Yb(),
								null === a && (a = zb()),
								a
							}
							function Hc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = Ic(), null !== a) {
									for (b = [], f = rd, c = M(), null !== c ? (d = Ic(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = M(), null !== c ? (d = Ic(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function Ic() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g,
								h;
								if (g = rd, a = Pc(), null !== a)
									if (b = t(), null !== b)
										if (c = Sc(), null !== c) {
											for (d = [], h = rd, e = N(), null !== e ? (f = Jc(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h); null !== e; )
												d.push(e), h = rd, e = N(), null !== e ? (f = Jc(), null !== f ? e = [e, f] : (e = null, rd = h)) : (e = null, rd = h);
											null !== d ? a = [a, b, c, d] : (a = null, rd = g)
										} else
											a = null, rd = g;
									else
										a = null, rd = g;
								else
									a = null, rd = g;
								return a
							}
							function Jc() {
								var a;
								return a = Kc(),
								null === a && (a = Lc(), null === a && (a = Mc(), null === a && (a = Nc(), null === a && (a = Oc(), null === a && (a = zb()))))),
								a
							}
							function Kc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"ttl" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"ttl"')),
								null !== a ? (b = H(), null !== b ? (d = Vc(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.ttl = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function Lc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"maddr" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"maddr"')),
								null !== a ? (b = H(), null !== b ? (d = fa(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.maddr = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function Mc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"received" === c.substr(rd, 8).toLowerCase() ? (a = c.substr(rd, 8), rd += 8) : (a = null, 0 === sd && e('"received"')),
								null !== a ? (b = H(), null !== b ? (d = na(), null === d && (d = ka()), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.received = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function Nc() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"branch" === c.substr(rd, 6).toLowerCase() ? (a = c.substr(rd, 6), rd += 6) : (a = null, 0 === sd && e('"branch"')),
								null !== a ? (b = H(), null !== b ? (d = B(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.branch = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function Oc() {
								var a,
								b,
								d,
								f,
								h,
								i,
								j;
								if (h = rd, i = rd, "rport" === c.substr(rd, 5).toLowerCase() ? (a = c.substr(rd, 5), rd += 5) : (a = null, 0 === sd && e('"rport"')), null !== a) {
									if (j = rd, b = H(), null !== b) {
										for (d = [], f = g(); null !== f; )
											d.push(f), f = g();
										null !== d ? b = [b, d] : (b = null, rd = j)
									} else
										b = null, rd = j;
									b = null !== b ? b : "",
									null !== b ? a = [a, b] : (a = null, rd = i)
								} else
									a = null, rd = i;
								return null !== a && (a = function (a) {
									"undefined" != typeof response_port && (xd.rport = response_port.join(""))
								}
									(h)),
								null === a && (rd = h),
								a
							}
							function Pc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								return f = rd,
								a = Qc(),
								null !== a ? (b = G(), null !== b ? (c = B(), null !== c ? (d = G(), null !== d ? (e = Rc(), null !== e ? a = [a, b, c, d, e] : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f)) : (a = null, rd = f),
								a
							}
							function Qc() {
								var a,
								b;
								return b = rd,
								"sip" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"SIP"')),
								null === a && (a = B()),
								null !== a && (a = function (a, b) {
									xd.protocol = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function Rc() {
								var a,
								b;
								return b = rd,
								"udp" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"UDP"')),
								null === a && ("tcp" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"TCP"')), null === a && ("tls" === c.substr(rd, 3).toLowerCase() ? (a = c.substr(rd, 3), rd += 3) : (a = null, 0 === sd && e('"TLS"')), null === a && ("sctp" === c.substr(rd, 4).toLowerCase() ? (a = c.substr(rd, 4), rd += 4) : (a = null, 0 === sd && e('"SCTP"')), null === a && (a = B())))),
								null !== a && (a = function (a, b) {
									xd.transport = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function Sc() {
								var a,
								b,
								c,
								d,
								e;
								return d = rd,
								a = Tc(),
								null !== a ? (e = rd, b = O(), null !== b ? (c = Uc(), null !== c ? b = [b, c] : (b = null, rd = e)) : (b = null, rd = e), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function Tc() {
								var a,
								b;
								return b = rd,
								a = na(),
								null === a && (a = ja(), null === a && (a = ga())),
								null !== a && (a = function (a) {
									xd.host = c.substring(rd, a)
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function Uc() {
								var a,
								b,
								c,
								d,
								e,
								f,
								h;
								return f = rd,
								h = rd,
								a = g(),
								a = null !== a ? a : "",
								null !== a ? (b = g(), b = null !== b ? b : "", null !== b ? (c = g(), c = null !== c ? c : "", null !== c ? (d = g(), d = null !== d ? d : "", null !== d ? (e = g(), e = null !== e ? e : "", null !== e ? a = [a, b, c, d, e] : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h)) : (a = null, rd = h),
								null !== a && (a = function (a, b) {
									xd.port = parseInt(b.join(""))
								}
									(f, a)),
								null === a && (rd = f),
								a
							}
							function Vc() {
								var a,
								b,
								c,
								d,
								e;
								return d = rd,
								e = rd,
								a = g(),
								null !== a ? (b = g(), b = null !== b ? b : "", null !== b ? (c = g(), c = null !== c ? c : "", null !== c ? a = [a, b, c] : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e),
								null !== a && (a = function (a, b) {
									return parseInt(b.join(""))
								}
									(d, a)),
								null === a && (rd = d),
								a
							}
							function Wc() {
								var a;
								return a = bc()
							}
							function Xc() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = Yc(), null !== a) {
									for (b = [], f = rd, c = N(), null !== c ? (d = Zc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = N(), null !== c ? (d = Zc(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function Yc() {
								var a,
								b;
								return b = rd,
								a = xb(),
								null !== a && (a = function (a, b) {
									xd.expires = b
								}
									(b, a)),
								null === a && (rd = b),
								a
							}
							function Zc() {
								var a;
								return a = $c(),
								null === a && (a = zb()),
								a
							}
							function $c() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"refresher" === c.substr(rd, 9).toLowerCase() ? (a = c.substr(rd, 9), rd += 9) : (a = null, 0 === sd && e('"refresher"')),
								null !== a ? (b = H(), null !== b ? ("uac" === c.substr(rd, 3).toLowerCase() ? (d = c.substr(rd, 3),
											rd += 3) : (d = null, 0 === sd && e('"uac"')), null === d && ("uas" === c.substr(rd, 3).toLowerCase() ? (d = c.substr(rd, 3), rd += 3) : (d = null, 0 === sd && e('"uas"'))), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.refresher = b.toLowerCase()
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function _c() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = B(),
								null !== a ? (b = v(), null !== b ? (c = ad(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function ad() {
								var a,
								b;
								for (a = [], b = x(), null === b && (b = z(), null === b && (b = t())); null !== b; )
									a.push(b), b = x(), null === b && (b = z(), null === b && (b = t()));
								return a
							}
							function bd() {
								var a,
								b;
								for (a = [], b = k(); null !== b; )
									a.push(b), b = k();
								return a
							}
							function cd() {
								var a,
								b,
								d;
								return d = rd,
								"uuid:" === c.substr(rd, 5) ? (a = "uuid:", rd += 5) : (a = null, 0 === sd && e('"uuid:"')),
								null !== a ? (b = dd(), null !== b ? a = [a, b] : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function dd() {
								var a,
								b,
								d,
								f,
								g,
								h,
								i,
								j,
								k,
								l,
								m;
								return l = rd,
								m = rd,
								a = fd(),
								null !== a ? (45 === c.charCodeAt(rd) ? (b = "-", rd++) : (b = null, 0 === sd && e('"-"')), null !== b ? (d = ed(), null !== d ? (45 === c.charCodeAt(rd) ? (f = "-", rd++) : (f = null, 0 === sd && e('"-"')), null !== f ? (g = ed(), null !== g ? (45 === c.charCodeAt(rd) ? (h = "-", rd++) : (h = null, 0 === sd && e('"-"')), null !== h ? (i = ed(), null !== i ? (45 === c.charCodeAt(rd) ? (j = "-", rd++) : (j = null, 0 === sd && e('"-"')), null !== j ? (k = gd(), null !== k ? a = [a, b, d, f, g, h, i, j, k] : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m)) : (a = null, rd = m),
								null !== a && (a = function (a, b) {
									xd = c.substring(rd + 5, a)
								}
									(l, a[0])),
								null === a && (rd = l),
								a
							}
							function ed() {
								var a,
								b,
								c,
								d,
								e;
								return e = rd,
								a = i(),
								null !== a ? (b = i(), null !== b ? (c = i(), null !== c ? (d = i(), null !== d ? a = [a, b, c, d] : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e)) : (a = null, rd = e),
								a
							}
							function fd() {
								var a,
								b,
								c;
								return c = rd,
								a = ed(),
								null !== a ? (b = ed(), null !== b ? a = [a, b] : (a = null, rd = c)) : (a = null, rd = c),
								a
							}
							function gd() {
								var a,
								b,
								c,
								d;
								return d = rd,
								a = ed(),
								null !== a ? (b = ed(), null !== b ? (c = ed(), null !== c ? a = [a, b, c] : (a = null, rd = d)) : (a = null, rd = d)) : (a = null, rd = d),
								a
							}
							function hd() {
								var a,
								b,
								c,
								d,
								e,
								f,
								g;
								if (e = rd, f = rd, a = X(), null === a && (a = sb()), null !== a) {
									for (b = [], g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g); null !== c; )
										b.push(c), g = rd, c = N(), null !== c ? (d = zb(), null !== d ? c = [c, d] : (c = null, rd = g)) : (c = null, rd = g);
									null !== b ? a = [a, b] : (a = null, rd = f)
								} else
									a = null, rd = f;
								return null !== a && (a = function (a) {
									try {
										xd = new wd(xd.uri, xd.display_name, xd.params)
									} catch (b) {
										xd = -1
									}
								}
									(e)),
								null === a && (rd = e),
								a
							}
							function id() {
								var a,
								b,
								c,
								d,
								e,
								f;
								if (e = rd, a = jd(), null !== a) {
									for (b = [], f = rd, c = N(), null !== c ? (d = kd(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f); null !== c; )
										b.push(c), f = rd, c = N(), null !== c ? (d = kd(), null !== d ? c = [c, d] : (c = null, rd = f)) : (c = null, rd = f);
									null !== b ? a = [a, b] : (a = null, rd = e)
								} else
									a = null, rd = e;
								return a
							}
							function jd() {
								var a,
								b,
								d,
								f,
								g,
								h;
								return f = rd,
								g = rd,
								a = E(),
								null !== a ? (h = rd, 64 === c.charCodeAt(rd) ? (b = "@", rd++) : (b = null, 0 === sd && e('"@"')), null !== b ? (d = E(), null !== d ? b = [b, d] : (b = null, rd = h)) : (b = null, rd = h), b = null !== b ? b : "", null !== b ? a = [a, b] : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a) {
									xd.call_id = c.substring(rd, a)
								}
									(f)),
								null === a && (rd = f),
								a
							}
							function kd() {
								var a;
								return a = ld(),
								null === a && (a = md(), null === a && (a = nd(), null === a && (a = zb()))),
								a
							}
							function ld() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"to-tag" === c.substr(rd, 6) ? (a = "to-tag", rd += 6) : (a = null, 0 === sd && e('"to-tag"')),
								null !== a ? (b = H(), null !== b ? (d = B(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.to_tag = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function md() {
								var a,
								b,
								d,
								f,
								g;
								return f = rd,
								g = rd,
								"from-tag" === c.substr(rd, 8) ? (a = "from-tag", rd += 8) : (a = null, 0 === sd && e('"from-tag"')),
								null !== a ? (b = H(), null !== b ? (d = B(), null !== d ? a = [a, b, d] : (a = null, rd = g)) : (a = null, rd = g)) : (a = null, rd = g),
								null !== a && (a = function (a, b) {
									xd.from_tag = b
								}
									(f, a[2])),
								null === a && (rd = f),
								a
							}
							function nd() {
								var a,
								b;
								return b = rd,
								"early-only" === c.substr(rd, 10) ? (a = "early-only", rd += 10) : (a = null, 0 === sd && e('"early-only"')),
								null !== a && (a = function (a) {
									xd.early_only = !0
								}
									(b)),
								null === a && (rd = b),
								a
							}
							function od(a) {
								a.sort();
								for (var b = null, c = [], d = 0; d < a.length; d++)
									a[d] !== b && (c.push(a[d]), b = a[d]);
								return c
							}
							function pd() {
								for (var a = 1, b = 1, d = !1, e = 0; e < Math.max(rd, td); e++) {
									var f = c.charAt(e);
									"\n" === f ? (d || a++, b = 1, d = !1) : "\r" === f || "\u2028" === f || "\u2029" === f ? (a++, b = 1, d = !0) : (b++, d = !1)
								}
								return {
									line: a,
									column: b
								}
							}
							var qd = {
								CRLF: f,
								DIGIT: g,
								ALPHA: h,
								HEXDIG: i,
								WSP: j,
								OCTET: k,
								DQUOTE: l,
								SP: m,
								HTAB: n,
								alphanum: o,
								reserved: p,
								unreserved: q,
								mark: r,
								escaped: s,
								LWS: t,
								SWS: u,
								HCOLON: v,
								TEXT_UTF8_TRIM: w,
								TEXT_UTF8char: x,
								UTF8_NONASCII: y,
								UTF8_CONT: z,
								LHEX: A,
								token: B,
								token_nodot: C,
								separators: D,
								word: E,
								STAR: F,
								SLASH: G,
								EQUAL: H,
								LPAREN: I,
								RPAREN: J,
								RAQUOT: K,
								LAQUOT: L,
								COMMA: M,
								SEMI: N,
								COLON: O,
								LDQUOT: P,
								RDQUOT: Q,
								comment: R,
								ctext: S,
								quoted_string: T,
								quoted_string_clean: U,
								qdtext: V,
								quoted_pair: W,
								SIP_URI_noparams: X,
								SIP_URI: Y,
								uri_scheme: Z,
								uri_scheme_sips: $,
								uri_scheme_sip: _,
								userinfo: aa,
								user: ba,
								user_unreserved: ca,
								password: da,
								hostport: ea,
								host: fa,
								hostname: ga,
								domainlabel: ha,
								toplabel: ia,
								IPv6reference: ja,
								IPv6address: ka,
								h16: la,
								ls32: ma,
								IPv4address: na,
								dec_octet: oa,
								port: pa,
								uri_parameters: qa,
								uri_parameter: ra,
								transport_param: sa,
								user_param: ta,
								method_param: ua,
								ttl_param: va,
								maddr_param: wa,
								lr_param: xa,
								other_param: ya,
								pname: za,
								pvalue: Aa,
								paramchar: Ba,
								param_unreserved: Ca,
								headers: Da,
								header: Ea,
								hname: Fa,
								hvalue: Ga,
								hnv_unreserved: Ha,
								Request_Response: Ia,
								Request_Line: Ja,
								Request_URI: Ka,
								absoluteURI: La,
								hier_part: Ma,
								net_path: Na,
								abs_path: Oa,
								opaque_part: Pa,
								uric: Qa,
								uric_no_slash: Ra,
								path_segments: Sa,
								segment: Ta,
								param: Ua,
								pchar: Va,
								scheme: Wa,
								authority: Xa,
								srvr: Ya,
								reg_name: Za,
								query: $a,
								SIP_Version: _a,
								INVITEm: ab,
								ACKm: bb,
								OPTIONSm: cb,
								BYEm: db,
								CANCELm: eb,
								REGISTERm: fb,
								SUBSCRIBEm: gb,
								NOTIFYm: hb,
								REFERm: ib,
								Method: jb,
								Status_Line: kb,
								Status_Code: lb,
								extension_code: mb,
								Reason_Phrase: nb,
								Allow_Events: ob,
								Call_ID: pb,
								Contact: qb,
								contact_param: rb,
								name_addr: sb,
								display_name: tb,
								contact_params: ub,
								c_p_q: vb,
								c_p_expires: wb,
								delta_seconds: xb,
								qvalue: yb,
								generic_param: zb,
								gen_value: Ab,
								Content_Disposition: Bb,
								disp_type: Cb,
								disp_param: Db,
								handling_param: Eb,
								Content_Encoding: Fb,
								Content_Length: Gb,
								Content_Type: Hb,
								media_type: Ib,
								m_type: Jb,
								discrete_type: Kb,
								composite_type: Lb,
								extension_token: Mb,
								x_token: Nb,
								m_subtype: Ob,
								m_parameter: Pb,
								m_value: Qb,
								CSeq: Rb,
								CSeq_value: Sb,
								Expires: Tb,
								Event: Ub,
								event_type: Vb,
								From: Wb,
								from_param: Xb,
								tag_param: Yb,
								Max_Forwards: Zb,
								Min_Expires: $b,
								Name_Addr_Header: _b,
								Proxy_Authenticate: ac,
								challenge: bc,
								other_challenge: cc,
								auth_param: dc,
								digest_cln: ec,
								realm: fc,
								realm_value: gc,
								domain: hc,
								URI: ic,
								nonce: jc,
								nonce_value: kc,
								opaque: lc,
								stale: mc,
								algorithm: nc,
								qop_options: oc,
								qop_value: pc,
								Proxy_Require: qc,
								Record_Route: rc,
								rec_route: sc,
								Reason: tc,
								reason_param: uc,
								reason_cause: vc,
								Require: wc,
								Route: xc,
								route_param: yc,
								Subscription_State: zc,
								substate_value: Ac,
								subexp_params: Bc,
								event_reason_value: Cc,
								Subject: Dc,
								Supported: Ec,
								To: Fc,
								to_param: Gc,
								Via: Hc,
								via_param: Ic,
								via_params: Jc,
								via_ttl: Kc,
								via_maddr: Lc,
								via_received: Mc,
								via_branch: Nc,
								response_port: Oc,
								sent_protocol: Pc,
								protocol_name: Qc,
								transport: Rc,
								sent_by: Sc,
								via_host: Tc,
								via_port: Uc,
								ttl: Vc,
								WWW_Authenticate: Wc,
								Session_Expires: Xc,
								s_e_expires: Yc,
								s_e_params: Zc,
								s_e_refresher: $c,
								extension_header: _c,
								header_value: ad,
								message_body: bd,
								uuid_URI: cd,
								uuid: dd,
								hex4: ed,
								hex8: fd,
								hex12: gd,
								Refer_To: hd,
								Replaces: id,
								call_id: jd,
								replaces_param: kd,
								to_tag: ld,
								from_tag: md,
								early_flag: nd
							};
							if (void 0 !== d) {
								if (void 0 === qd[d])
									throw new Error("Invalid rule name: " + b(d) + ".")
							} else
								d = "CRLF";
							var rd = 0,
							sd = 0,
							td = 0,
							ud = [],
							vd = a("./URI"),
							wd = a("./NameAddrHeader"),
							xd = {},
							yd = qd[d]();
							if (null === yd || rd !== c.length) {
								var zd = Math.max(rd, td),
								Ad = zd < c.length ? c.charAt(zd) : null,
								Bd = pd();
								return new this.SyntaxError(od(ud), Ad, zd, Bd.line, Bd.column),
								-1
							}
							return xd
						},
						toSource: function () {
							return this._source
						}
					};
					return c.SyntaxError = function (a, c, d, e, f) {
						function g(a, c) {
							var d,
							e;
							switch (a.length) {
							case 0:
								d = "end of input";
								break;
							case 1:
								d = a[0];
								break;
							default:
								d = a.slice(0, a.length - 1).join(", ") + " or " + a[a.length - 1]
							}
							return e = c ? b(c) : "end of input",
							"Expected " + d + " but " + e + " found."
						}
						this.name = "SyntaxError",
						this.expected = a,
						this.found = c,
						this.message = g(a, c),
						this.offset = d,
						this.line = e,
						this.column = f
					},
					c.SyntaxError.prototype = Error.prototype,
					c
				}
				()
			}, {
				"./NameAddrHeader": 9,
				"./URI": 24
			}
		],
		7: [function (a, b, c) {
				var d = a("debug")("JsSIP"),
				e = a("../package.json");
				d("version %s", e.version);
				var f = a("rtcninja"),
				g = a("./Constants"),
				h = a("./Exceptions"),
				i = a("./Utils"),
				j = a("./UA"),
				k = a("./URI"),
				l = a("./NameAddrHeader"),
				m = a("./Grammar"),
				n = a("./WebSocketInterface"),
				o = b.exports = {
					C: g,
					Exceptions: h,
					Utils: i,
					UA: j,
					URI: k,
					NameAddrHeader: l,
					WebSocketInterface: n,
					Grammar: m,
					debug: a("debug"),
					rtcninja: f
				};
				Object.defineProperties(o, {
					name: {
						get: function () {
							return e.title
						}
					},
					version: {
						get: function () {
							return e.version
						}
					}
				})
			}, {
				"../package.json": 47,
				"./Constants": 1,
				"./Exceptions": 5,
				"./Grammar": 6,
				"./NameAddrHeader": 9,
				"./UA": 23,
				"./URI": 24,
				"./Utils": 25,
				"./WebSocketInterface": 26,
				debug: 33,
				rtcninja: 38
			}
		],
		8: [function (a, b, c) {
				function d(a) {
					this.ua = a,
					this.data = {},
					f.EventEmitter.call(this)
				}
				b.exports = d;
				var e = a("util"),
				f = a("events"),
				g = a("./Constants"),
				h = a("./SIPMessage"),
				i = a("./Utils"),
				j = a("./RequestSender"),
				k = a("./Transactions"),
				l = a("./Exceptions");
				e.inherits(d, f.EventEmitter),
				d.prototype.send = function (a, b, c) {
					var d,
					e,
					f,
					i,
					k,
					l = a;
					if (void 0 === a || void 0 === b)
						throw new TypeError("Not enough arguments");
					if (a = this.ua.normalizeTarget(a), !a)
						throw new TypeError("Invalid target: " + l);
					c = c || {},
					k = c.extraHeaders && c.extraHeaders.slice() || [],
					i = c.eventHandlers || {},
					f = c.contentType || "text/plain",
					this.content_type = f;
					for (e in i)
						this.on(e, i[e]);
					this.closed = !1,
					this.ua.applicants[this] = this,
					k.push("Content-Type: " + f),
					this.request = new h.OutgoingRequest(g.MESSAGE, a, this.ua, null, k),
					b ? (this.request.body = b, this.content = b) : this.content = null,
					d = new j(this, this.ua),
					this.newMessage("local", this.request),
					d.send()
				},
				d.prototype.receiveResponse = function (a) {
					var b;
					if (!this.closed)
						switch (!0) {
						case /^1[0-9]{2}$/.test(a.status_code):
							break;
						case /^2[0-9]{2}$/.test(a.status_code):
							delete this.ua.applicants[this],
							this.emit("succeeded", {
								originator: "remote",
								response: a
							});
							break;
						default:
							delete this.ua.applicants[this],
							b = i.sipErrorCause(a.status_code),
							this.emit("failed", {
								originator: "remote",
								response: a,
								cause: b
							})
						}
				},
				d.prototype.onRequestTimeout = function () {
					this.closed || this.emit("failed", {
						originator: "system",
						cause: g.causes.REQUEST_TIMEOUT
					})
				},
				d.prototype.onTransportError = function () {
					this.closed || this.emit("failed", {
						originator: "system",
						cause: g.causes.CONNECTION_ERROR
					})
				},
				d.prototype.close = function () {
					this.closed = !0,
					delete this.ua.applicants[this]
				},
				d.prototype.init_incoming = function (a) {
					var b;
					this.request = a,
					this.content_type = a.getHeader("Content-Type"),
					a.body ? this.content = a.body : this.content = null,
					this.newMessage("remote", a),
					b = this.ua.transactions.nist[a.via_branch],
					!b || b.state !== k.C.STATUS_TRYING && b.state !== k.C.STATUS_PROCEEDING || a.reply(200)
				},
				d.prototype.accept = function (a) {
					a = a || {};
					var b = a.extraHeaders && a.extraHeaders.slice() || [],
					c = a.body;
					if ("incoming" !== this.direction)
						throw new l.NotSupportedError('"accept" not supported for outgoing Message');
					this.request.reply(200, null, b, c)
				},
				d.prototype.reject = function (a) {
					a = a || {};
					var b = a.status_code || 480,
					c = a.reason_phrase,
					d = a.extraHeaders && a.extraHeaders.slice() || [],
					e = a.body;
					if ("incoming" !== this.direction)
						throw new l.NotSupportedError('"reject" not supported for outgoing Message');
					if (b < 300 || b >= 700)
						throw new TypeError("Invalid status_code: " + b);
					this.request.reply(b, c, d, e)
				},
				d.prototype.newMessage = function (a, b) {
					"remote" === a ? (this.direction = "incoming", this.local_identity = b.to, this.remote_identity = b.from) : "local" === a && (this.direction = "outgoing", this.local_identity = b.from, this.remote_identity = b.to),
					this.ua.newMessage({
						originator: a,
						message: this,
						request: b
					})
				}
			}, {
				"./Constants": 1,
				"./Exceptions": 5,
				"./RequestSender": 17,
				"./SIPMessage": 18,
				"./Transactions": 21,
				"./Utils": 25,
				events: 28,
				util: 32
			}
		],
		9: [function (a, b, c) {
				function d(a, b, c) {
					var d;
					if (!(a && a instanceof e))
						throw new TypeError('missing or invalid "uri" parameter');
					this.uri = a,
					this.parameters = {};
					for (d in c)
						this.setParam(d, c[d]);
					Object.defineProperties(this, {
						display_name: {
							get: function () {
								return b
							},
							set: function (a) {
								b = 0 === a ? "0" : a
							}
						}
					})
				}
				b.exports = d;
				var e = a("./URI"),
				f = a("./Grammar");
				d.prototype = {
					setParam: function (a, b) {
						a && (this.parameters[a.toLowerCase()] = "undefined" == typeof b || null === b ? null : b.toString())
					},
					getParam: function (a) {
						if (a)
							return this.parameters[a.toLowerCase()]
					},
					hasParam: function (a) {
						if (a)
							return this.parameters.hasOwnProperty(a.toLowerCase()) && !0 || !1
					},
					deleteParam: function (a) {
						var b;
						if (a = a.toLowerCase(), this.parameters.hasOwnProperty(a))
							return b = this.parameters[a], delete this.parameters[a], b
					},
					clearParams: function () {
						this.parameters = {}
					},
					clone: function () {
						return new d(this.uri.clone(), this.display_name, JSON.parse(JSON.stringify(this.parameters)))
					},
					toString: function () {
						var a,
						b;
						a = this.display_name || 0 === this.display_name ? '"' + this.display_name + '" ' : "",
						a += "<" + this.uri.toString() + ">";
						for (b in this.parameters)
							a += ";" + b, null !== this.parameters[b] && (a += "=" + this.parameters[b]);
						return a
					}
				},
				d.parse = function (a) {
					return a = f.parse(a, "Name_Addr_Header"),
					a !== -1 ? a : void 0
				}
			}, {
				"./Grammar": 6,
				"./URI": 24
			}
		],
		10: [function (a, b, c) {
				function d(a, b) {
					var c = b,
					d = 0,
					e = 0;
					if (a.substring(c, c + 2).match(/(^\r\n)/))
						return -2;
					for (; 0 === d; ) {
						if (e = a.indexOf("\r\n", c), e === -1)
							return e;
						!a.substring(e + 2, e + 4).match(/(^\r\n)/) && a.charAt(e + 2).match(/(^\s+)/) ? c = e + 2 : d = e
					}
					return d
				}
				function e(a, b, c, d) {
					var e,
					f,
					g,
					j,
					k = b.indexOf(":", c),
					l = b.substring(c, k).trim(),
					m = b.substring(k + 1, d).trim();
					switch (l.toLowerCase()) {
					case "via":
					case "v":
						a.addHeader("via", m),
						1 === a.getHeaders("via").length ? (j = a.parseHeader("Via"), j && (a.via = j, a.via_branch = j.branch)) : j = 0;
						break;
					case "from":
					case "f":
						a.setHeader("from", m),
						j = a.parseHeader("from"),
						j && (a.from = j, a.from_tag = j.getParam("tag"));
						break;
					case "to":
					case "t":
						a.setHeader("to", m),
						j = a.parseHeader("to"),
						j && (a.to = j, a.to_tag = j.getParam("tag"));
						break;
					case "record-route":
						for (j = h.parse(m, "Record_Route"), j === -1 && (j = void 0), g = j.length, f = 0; f < g; f++)
							e = j[f], a.addHeader("record-route", m.substring(e.possition, e.offset)), a.headers["Record-Route"][a.getHeaders("record-route").length - 1].parsed = e.parsed;
						break;
					case "call-id":
					case "i":
						a.setHeader("call-id", m),
						j = a.parseHeader("call-id"),
						j && (a.call_id = m);
						break;
					case "contact":
					case "m":
						for (j = h.parse(m, "Contact"), j === -1 && (j = void 0), g = j.length, f = 0; f < g; f++)
							e = j[f], a.addHeader("contact", m.substring(e.possition, e.offset)), a.headers.Contact[a.getHeaders("contact").length - 1].parsed = e.parsed;
						break;
					case "content-length":
					case "l":
						a.setHeader("content-length", m),
						j = a.parseHeader("content-length");
						break;
					case "content-type":
					case "c":
						a.setHeader("content-type", m),
						j = a.parseHeader("content-type");
						break;
					case "cseq":
						a.setHeader("cseq", m),
						j = a.parseHeader("cseq"),
						j && (a.cseq = j.value),
						a instanceof i.IncomingResponse && (a.method = j.method);
						break;
					case "max-forwards":
						a.setHeader("max-forwards", m),
						j = a.parseHeader("max-forwards");
						break;
					case "www-authenticate":
						a.setHeader("www-authenticate", m),
						j = a.parseHeader("www-authenticate");
						break;
					case "proxy-authenticate":
						a.setHeader("proxy-authenticate", m),
						j = a.parseHeader("proxy-authenticate");
						break;
					case "session-expires":
					case "x":
						a.setHeader("session-expires", m),
						j = a.parseHeader("session-expires"),
						j && (a.session_expires = j.expires, a.session_expires_refresher = j.refresher);
						break;
					case "refer-to":
					case "r":
						a.setHeader("refer-to", m),
						j = a.parseHeader("refer-to"),
						j && (a.refer_to = j);
						break;
					case "replaces":
						a.setHeader("replaces", m),
						j = a.parseHeader("replaces"),
						j && (a.replaces = j);
						break;
					case "event":
					case "o":
						a.setHeader("event", m),
						j = a.parseHeader("event"),
						j && (a.event = j);
						break;
					default:
						a.setHeader(l, m),
						j = 0
					}
					return void 0 !== j || {
						error: 'error parsing header "' + l + '"'
					}
				}
				var f = {};
				b.exports = f;
				var g = a("debug")("JsSIP:ERROR:Parser");
				g.log = console.warn.bind(console);
				var h = a("./Grammar"),
				i = a("./SIPMessage");
				f.parseMessage = function (a, b) {
					var c,
					f,
					j,
					k,
					l,
					m = 0,
					n = a.indexOf("\r\n");
					if (n === -1)
						return void g("parseMessage() | no CRLF found, not a SIP message");
					if (f = a.substring(0, n), l = h.parse(f, "Request_Response"), l === -1)
						return void g('parseMessage() | error parsing first line of SIP message: "' + f + '"');
					for (l.status_code ? (c = new i.IncomingResponse, c.status_code = l.status_code, c.reason_phrase = l.reason_phrase) : (c = new i.IncomingRequest(b), c.method = l.method, c.ruri = l.uri), c.data = a, m = n + 2; ; ) {
						if (n = d(a, m), n === -2) {
							k = m + 2;
							break
						}
						if (n === -1)
							return void g("parseMessage() | malformed message");
						if (l = e(c, a, m, n), l !== !0)
							return void g("parseMessage() |", l.error);
						m = n + 2
					}
					return c.hasHeader("content-length") ? (j = c.getHeader("content-length"), c.body = a.substr(k, j)) : c.body = a.substring(k),
					c
				}
			}, {
				"./Grammar": 6,
				"./SIPMessage": 18,
				debug: 33
			}
		],
		11: [function (a, b, c) {
				function d(a) {
					P("new"),
					this.ua = a,
					this.status = M.STATUS_NULL,
					this.dialog = null,
					this.earlyDialogs = {},
					this.connection = null,
					this.is_confirmed = !1,
					this.late_sdp = !1,
					this.rtcOfferConstraints = null,
					this.rtcAnswerConstraints = null,
					this.localMediaStream = null,
					this.localMediaStreamLocallyGenerated = !1,
					this.rtcReady = !0,
					this.timers = {
						ackTimer: null,
						expiresTimer: null,
						invite2xxTimer: null,
						userNoAnswerTimer: null
					},
					this.direction = null,
					this.local_identity = null,
					this.remote_identity = null,
					this.start_time = null,
					this.end_time = null,
					this.tones = null,
					this.audioMuted = !1,
					this.videoMuted = !1,
					this.localHold = !1,
					this.remoteHold = !1,
					this.sessionTimers = {
						enabled: this.ua.configuration.session_timers,
						defaultExpires: T.SESSION_EXPIRES,
						currentExpires: null,
						running: !1,
						refresher: !1,
						timer: null
					},
					this.referSubscribers = {},
					this.data = {},
					O.EventEmitter.call(this)
				}
				function e(a, b) {
					var c = this,
					d = X.T1;
					this.timers.invite2xxTimer = setTimeout(function e() {
							c.status === M.STATUS_WAITING_FOR_ACK && (a.reply(200, null, ["Contact: " + c.contact], b), d < X.T2 && (d = 2 * d, d > X.T2 && (d = X.T2)), c.timers.invite2xxTimer = setTimeout(e, d))
						}, d)
				}
				function f() {
					var a = this;
					this.timers.ackTimer = setTimeout(function () {
							a.status === M.STATUS_WAITING_FOR_ACK && (P("no ACK received, terminating the session"), clearTimeout(a.timers.invite2xxTimer), t.call(a, T.BYE), G.call(a, "remote", null, T.causes.NO_ACK))
						}, X.TIMER_H)
				}
				function g(a, b) {
					var c = this;
					this.connection = new R.RTCPeerConnection(a, b),
					this.connection.onaddstream = function (a, b) {
						c.emit("addstream", {
							stream: b
						})
					},
					this.connection.onremovestream = function (a, b) {
						c.emit("removestream", {
							stream: b
						})
					},
					this.connection.oniceconnectionstatechange = function (a, b) {
						c.emit("iceconnectionstatechange", {
							state: b
						}),
						"failed" === b && c.terminate({
							cause: T.causes.RTP_TIMEOUT,
							status_code: 200,
							reason_phrase: T.causes.RTP_TIMEOUT
						})
					}
				}
				function h(a, b, c, d) {
					function e(d) {
						g.onicecandidate = function (c, d) {
							if (!d) {
								if (g.onicecandidate = null, f.rtcReady = !0, b) {
									var e = {
										originator: "local",
										type: a,
										sdp: g.localDescription.sdp
									};
									f.emit("sdp", e),
									b(e.sdp)
								}
								b = null
							}
						},
						g.setLocalDescription(d, function () {
							if ("complete" === g.iceGatheringState) {
								if (f.rtcReady = !0, b) {
									var c = {
										originator: "local",
										type: a,
										sdp: g.localDescription.sdp
									};
									f.emit("sdp", c),
									b(c.sdp)
								}
								b = null
							}
						}, function (a) {
							f.rtcReady = !0,
							c && c(a)
						})
					}
					P("createLocalDescription()");
					var f = this,
					g = this.connection;
					if (this.rtcReady = !1, "offer" === a)
						g.createOffer(e, function (a) {
							f.rtcReady = !0,
							c && c(a)
						}, d);
					else {
						if ("answer" !== a)
							throw new Error('createLocalDescription() | type must be "offer" or "answer", but "' + a + '" was given');
						g.createAnswer(e, function (a) {
							f.rtcReady = !0,
							c && c(a)
						}, d)
					}
				}
				function i(a, b, c) {
					var d,
					e,
					f = "UAS" === b ? a.to_tag : a.from_tag,
					g = "UAS" === b ? a.from_tag : a.to_tag,
					h = a.call_id + f + g;
					return e = this.earlyDialogs[h],
					c ? !!e || (e = new Z(this, a, b, Z.C.STATUS_EARLY), e.error ? (P(e.error), H.call(this, "remote", a, T.causes.INTERNAL_ERROR), !1) : (this.earlyDialogs[h] = e, !0)) : (this.from_tag = a.from_tag, this.to_tag = a.to_tag, e ? (e.update(a, b), this.dialog = e, delete this.earlyDialogs[h], !0) : (d = new Z(this, a, b), d.error ? (P(d.error), H.call(this, "remote", a, T.causes.INTERNAL_ERROR), !1) : (this.dialog = d, !0)))
				}
				function j(a) {
					function b(b) {
						b = b || {},
						o = !0;
						var c = b.status_code || 403,
						d = b.reason_phrase || "",
						e = b.extraHeaders && b.extraHeaders.slice() || [];
						if (this.status !== M.STATUS_CONFIRMED)
							return !1;
						if (c < 300 || c >= 700)
							throw new TypeError("Invalid status_code: " + c);
						a.reply(c, d, e)
					}
					function c() {
						d(function (b) {
							var c = ["Contact: " + l.contact];
							w.call(l, a, c),
							l.late_sdp && (b = u.call(l, b)),
							a.reply(200, null, c, b, function () {
								l.status = M.STATUS_WAITING_FOR_ACK,
								e.call(l, a, b),
								f.call(l)
							}),
							"function" == typeof p.callback && p.callback()
						}, function () {
							a.reply(500)
						})
					}
					function d(a, b) {
						l.late_sdp ? h.call(l, "offer", a, b, l.rtcOfferConstraints) : (l.remoteHold === !0 && n === !1 ? (l.remoteHold = !1, J.call(l, "remote")) : l.remoteHold === !1 && n === !0 && (l.remoteHold = !0, I.call(l, "remote")), h.call(l, "answer", a, b, l.rtcAnswerConstraints))
					}
					P("receiveReinvite()");
					var g,
					i,
					j,
					k,
					l = this,
					m = a.getHeader("Content-Type"),
					n = !1,
					o = !1,
					p = {
						request: a,
						callback: void 0,
						reject: b.bind(this)
					};
					if (this.emit("reinvite", p), !o)
						if (a.body) {
							if (this.late_sdp = !1, "application/sdp" !== m)
								return P("invalid Content-Type"), void a.reply(415);
							for (g = a.parseSDP(), i = 0; i < g.media.length; i++)
								if (k = g.media[i], da.indexOf(k.type) !== -1) {
									if (j = k.direction || g.direction || "sendrecv", "sendonly" !== j && "inactive" !== j) {
										n = !1;
										break
									}
									n = !0
								}
							var q = {
								originator: "remote",
								type: "offer",
								sdp: a.body
							};
							this.emit("sdp", q),
							this.connection.setRemoteDescription(new R.RTCSessionDescription({
									type: "offer",
									sdp: q.sdp
								}), c, function () {
								a.reply(488)
							})
						} else
							this.late_sdp = !0, c()
				}
				function k(a) {
					function b(b) {
						b = b || {},
						j = !0;
						var c = b.status_code || 403,
						d = b.reason_phrase || "",
						e = b.extraHeaders && b.extraHeaders.slice() || [];
						if (this.status !== M.STATUS_CONFIRMED)
							return !1;
						if (c < 300 || c >= 700)
							throw new TypeError("Invalid status_code: " + c);
						a.reply(c, d, e)
					}
					P("receiveUpdate()");
					var c,
					d,
					e,
					f,
					g = this,
					i = a.getHeader("Content-Type"),
					j = !1,
					k = !1,
					l = {
						request: a,
						callback: void 0,
						reject: b.bind(this)
					};
					if (this.emit("update", l), !j) {
						if (!a.body) {
							var m = [];
							return w.call(this, a, m),
							void a.reply(200, null, m)
						}
						if ("application/sdp" !== i)
							return P("invalid Content-Type"), void a.reply(415);
						for (c = a.parseSDP(), d = 0; d < c.media.length; d++)
							if (f = c.media[d], da.indexOf(f.type) !== -1) {
								if (e = f.direction || c.direction || "sendrecv", "sendonly" !== e && "inactive" !== e) {
									k = !1;
									break
								}
								k = !0
							}
						var n = {
							originator: "remote",
							type: "offer",
							sdp: a.body
						};
						this.emit("sdp", n),
						this.connection.setRemoteDescription(new R.RTCSessionDescription({
								type: "offer",
								sdp: n.sdp
							}), function () {
							g.remoteHold === !0 && k === !1 ? (g.remoteHold = !1, J.call(g, "remote")) : g.remoteHold === !1 && k === !0 && (g.remoteHold = !0, I.call(g, "remote")),
							h.call(g, "answer", function (b) {
								var c = ["Contact: " + g.contact];
								w.call(g, a, c),
								a.reply(200, null, c, b),
								"function" == typeof l.callback && l.callback()
							}, function () {
								a.reply(500)
							})
						}, function () {
							a.reply(488)
						}, this.rtcAnswerConstraints)
					}
				}
				function l(a) {
					function b(b, c) {
						var f,
						g;
						return c = c || {},
						b = "function" == typeof b ? b : null,
						(this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_CONFIRMED) && (f = new d(this.ua), f.on("progress", function (a) {
								e.notify(a.response.status_code, a.response.reason_phrase)
							}), f.on("accepted", function (a) {
								e.notify(a.response.status_code, a.response.reason_phrase)
							}), f.on("failed", function (a) {
								a.message ? e.notify(a.message.status_code, a.message.reason_phrase) : e.notify(487, a.cause)
							}), a.refer_to.uri.hasHeader("replaces") && (g = decodeURIComponent(a.refer_to.uri.getHeader("replaces")), c.extraHeaders = c.extraHeaders || [], c.extraHeaders.push("Replaces: " + g)), void f.connect(a.refer_to.uri.toAor(), c, b))
					}
					function c() {
						e.notify(603)
					}
					P("receiveRefer()");
					var e,
					f = this;
					return void 0 === typeof a.refer_to ? (P("no Refer-To header field present in REFER"), void a.reply(400)) : a.refer_to.uri.scheme !== T.SIP ? (P("Refer-To header field points to a non-SIP URI scheme"), void a.reply(416)) : (a.reply(202), e = new ba(this, a.cseq), void this.emit("refer", {
							request: a,
							accept: function (a, c) {
								b.call(f, a, c)
							},
							reject: function () {
								c.call(f)
							}
						}))
				}
				function m(a) {
					switch (P("receiveNotify()"), void 0 === typeof a.event && a.reply(400), a.event.event) {
					case "refer":
						var b = a.event.params.id,
						c = this.referSubscribers[b];
						if (!c)
							return void a.reply(481, "Subscription does not exist");
						c.receiveNotify(a),
						a.reply(200);
						break;
					default:
						a.reply(489)
					}
				}
				function n(a) {
					function b(b) {
						var c;
						return (this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_CONFIRMED) && (c = new d(this.ua), c.on("confirmed", function () {
								e.terminate()
							}), void c.init_incoming(a, b))
					}
					function c() {
						P("Replaced INVITE rejected by the user"),
						a.reply(486)
					}
					P("receiveReplaces()");
					var e = this;
					this.emit("replaces", {
						request: a,
						accept: function (a) {
							b.call(e, a)
						},
						reject: function () {
							c.call(e)
						}
					})
				}
				function o(a, b, c) {
					function d(a) {
						i.status !== M.STATUS_TERMINATED && (i.localMediaStream = a, a && i.connection.addStream(a), i.emit("peerconnection", {
								peerconnection: i.connection
							}), C.call(i, i.request), h.call(i, "offer", f, g, b))
					}
					function e() {
						i.status !== M.STATUS_TERMINATED && H.call(i, "local", null, T.causes.USER_DENIED_MEDIA_ACCESS)
					}
					function f(a) {
						i.isCanceled || i.status === M.STATUS_TERMINATED || (i.request.body = a, i.status = M.STATUS_INVITE_SENT, i.emit("sending", {
								request: i.request
							}), j.send())
					}
					function g() {
						i.status !== M.STATUS_TERMINATED && H.call(i, "system", null, T.causes.WEBRTC_ERROR)
					}
					var i = this,
					j = new $(i, this.ua);
					this.receiveResponse = function (a) {
						p.call(i, a)
					},
					c ? setTimeout(function () {
						d(c)
					}) : a.audio || a.video ? (this.localMediaStreamLocallyGenerated = !0, R.getUserMedia(a, d, e)) : d(null)
				}
				function p(a) {
					P("receiveInviteResponse()");
					var b,
					c,
					d,
					e = this;
					if (this.dialog && a.status_code >= 200 && a.status_code <= 299)
						return this.dialog.id.call_id === a.call_id && this.dialog.id.local_tag === a.from_tag && this.dialog.id.remote_tag === a.to_tag ? void t.call(this, T.ACK) : (c = new Z(this, a, "UAC"), void 0 !== c.error ? void P(c.error) : (c.sendRequest({
									owner: {
										status: M.STATUS_TERMINATED
									},
									onRequestTimeout: function () {},
									onTransportError: function () {},
									onDialogError: function () {},
									receiveResponse: function () {}
								}, T.ACK), void c.sendRequest({
									owner: {
										status: M.STATUS_TERMINATED
									},
									onRequestTimeout: function () {},
									onTransportError: function () {},
									onDialogError: function () {},
									receiveResponse: function () {}
								}, T.BYE)));
					if (this.isCanceled)
						return this.isCanceled = !1, void(a.status_code >= 100 && a.status_code < 200 ? this.request.cancel(this.cancelReason) : a.status_code >= 200 && a.status_code < 299 && s.call(this, a));
					if (this.status === M.STATUS_INVITE_SENT || this.status === M.STATUS_1XX_RECEIVED)
						switch (!0) {
						case /^100$/.test(a.status_code):
							this.status = M.STATUS_1XX_RECEIVED;
							break;
						case /^1[0-9]{2}$/.test(a.status_code):
							if (!a.to_tag) {
								P("1xx response received without to tag");
								break
							}
							if (a.hasHeader("contact") && !i.call(this, a, "UAC", !0))
								break;
							if (this.status = M.STATUS_1XX_RECEIVED, D.call(this, "remote", a), !a.body)
								break;
							d = {
								originator: "remote",
								type: "pranswer",
								sdp: a.body
							},
							this.emit("sdp", d),
							this.connection.setRemoteDescription(new R.RTCSessionDescription({
									type: "pranswer",
									sdp: d.sdp
								}), null, null);
							break;
						case /^2[0-9]{2}$/.test(a.status_code):
							if (this.status = M.STATUS_CONFIRMED, !a.body) {
								s.call(this, a, 400, T.causes.MISSING_SDP),
								H.call(this, "remote", a, T.causes.BAD_MEDIA_DESCRIPTION);
								break
							}
							if (!i.call(this, a, "UAC"))
								break;
							d = {
								originator: "remote",
								type: "answer",
								sdp: a.body
							},
							this.emit("sdp", d),
							this.connection.setRemoteDescription(new R.RTCSessionDescription({
									type: "answer",
									sdp: d.sdp
								}), function () {
								x.call(e, a),
								E.call(e, "remote", a),
								t.call(e, T.ACK),
								F.call(e, "local", null)
							}, function () {
								s.call(e, a, 488, "Not Acceptable Here"),
								H.call(e, "remote", a, T.causes.BAD_MEDIA_DESCRIPTION)
							});
							break;
						default:
							b = W.sipErrorCause(a.status_code),
							H.call(this, "remote", a, b)
						}
				}
				function q(a) {
					function b(a) {
						if (d.status !== M.STATUS_TERMINATED && (t.call(d, T.ACK), !i)) {
							if (x.call(d, a), !a.body)
								return void c();
							if ("application/sdp" !== a.getHeader("Content-Type"))
								return void c();
							var b = {
								originator: "remote",
								type: "answer",
								sdp: a.body
							};
							d.emit("sdp", b),
							d.connection.setRemoteDescription(new R.RTCSessionDescription({
									type: "answer",
									sdp: b.sdp
								}), function () {
								f.succeeded && f.succeeded(a)
							}, function () {
								c()
							})
						}
					}
					function c(a) {
						f.failed && f.failed(a)
					}
					P("sendReinvite()"),
					a = a || {};
					var d = this,
					e = a.extraHeaders || [],
					f = a.eventHandlers || {},
					g = a.rtcOfferConstraints || this.rtcOfferConstraints || null,
					i = !1;
					e.push("Contact: " + this.contact),
					e.push("Content-Type: application/sdp"),
					this.sessionTimers.running && e.push("Session-Expires: " + this.sessionTimers.currentExpires + ";refresher=" + (this.sessionTimers.refresher ? "uac" : "uas")),
					h.call(this, "offer", function (a) {
						a = u.call(d, a);
						var f = new _(d, T.INVITE);
						f.send({
							extraHeaders: e,
							body: a,
							eventHandlers: {
								onSuccessResponse: function (a) {
									b(a),
									i = !0
								},
								onErrorResponse: function (a) {
									c(a)
								},
								onTransportError: function () {
									d.onTransportError()
								},
								onRequestTimeout: function () {
									d.onRequestTimeout()
								},
								onDialogError: function () {
									d.onDialogError()
								}
							}
						})
					}, function () {
						c()
					}, g)
				}
				function r(a) {
					function b(a) {
						if (d.status !== M.STATUS_TERMINATED && !j)
							if (x.call(d, a), i) {
								if (!a.body)
									return void c();
								if ("application/sdp" !== a.getHeader("Content-Type"))
									return void c();
								var b = {
									originator: "remote",
									type: "answer",
									sdp: a.body
								};
								d.emit("sdp", b),
								d.connection.setRemoteDescription(new R.RTCSessionDescription({
										type: "answer",
										sdp: b.sdp
									}), function () {
									f.succeeded && f.succeeded(a)
								}, function () {
									c()
								})
							} else
								f.succeeded && f.succeeded(a)
					}
					function c(a) {
						f.failed && f.failed(a)
					}
					P("sendUpdate()"),
					a = a || {};
					var d = this,
					e = a.extraHeaders || [],
					f = a.eventHandlers || {},
					g = a.rtcOfferConstraints || this.rtcOfferConstraints || null,
					i = a.sdpOffer || !1,
					j = !1;
					if (e.push("Contact: " + this.contact), this.sessionTimers.running && e.push("Session-Expires: " + this.sessionTimers.currentExpires + ";refresher=" + (this.sessionTimers.refresher ? "uac" : "uas")), i)
						e.push("Content-Type: application/sdp"), h.call(this, "offer", function (a) {
							a = u.call(d, a);
							var f = new _(d, T.UPDATE);
							f.send({
								extraHeaders: e,
								body: a,
								eventHandlers: {
									onSuccessResponse: function (a) {
										b(a),
										j = !0
									},
									onErrorResponse: function (a) {
										c(a)
									},
									onTransportError: function () {
										d.onTransportError()
									},
									onRequestTimeout: function () {
										d.onRequestTimeout()
									},
									onDialogError: function () {
										d.onDialogError()
									}
								}
							})
						}, function () {
							c()
						}, g);
					else {
						var k = new _(d, T.UPDATE);
						k.send({
							extraHeaders: e,
							eventHandlers: {
								onSuccessResponse: function (a) {
									b(a)
								},
								onErrorResponse: function (a) {
									c(a)
								},
								onTransportError: function () {
									d.onTransportError()
								},
								onRequestTimeout: function () {
									d.onRequestTimeout()
								},
								onDialogError: function () {
									d.onDialogError()
								}
							}
						})
					}
				}
				function s(a, b, c) {
					P("acceptAndTerminate()");
					var d = [];
					b && (c = c || T.REASON_PHRASE[b] || "", d.push("Reason: SIP ;cause=" + b + '; text="' + c + '"')),
					(this.dialog || i.call(this, a, "UAC")) && (t.call(this, T.ACK), t.call(this, T.BYE, {
							extraHeaders: d
						})),
					this.status = M.STATUS_TERMINATED
				}
				function t(a, b) {
					P("sendRequest()");
					var c = new _(this, a);
					c.send(b)
				}
				function u(a) {
					var b,
					c,
					d;
					if (!this.localHold && !this.remoteHold)
						return a;
					if (a = S.parse(a), this.localHold && !this.remoteHold)
						for (P("mangleOffer() | me on hold, mangling offer"), c = a.media.length, b = 0; b < c; b++)
							d = a.media[b], da.indexOf(d.type) !== -1 && (d.direction ? "sendrecv" === d.direction ? d.direction = "sendonly" : "recvonly" === d.direction && (d.direction = "inactive") : d.direction = "sendonly");
					else if (this.localHold && this.remoteHold)
						for (P("mangleOffer() | both on hold, mangling offer"), c = a.media.length, b = 0; b < c; b++)
							d = a.media[b], da.indexOf(d.type) !== -1 && (d.direction = "inactive");
					else if (this.remoteHold)
						for (P("mangleOffer() | remote on hold, mangling offer"), c = a.media.length, b = 0; b < c; b++)
							d = a.media[b], da.indexOf(d.type) !== -1 && (d.direction ? "sendrecv" === d.direction ? d.direction = "recvonly" : "recvonly" === d.direction && (d.direction = "inactive") : d.direction = "recvonly");
					return S.write(a)
				}
				function v() {
					var a = !0,
					b = !0;
					(this.localHold || this.remoteHold) && (a = !1, b = !1),
					this.audioMuted && (a = !1),
					this.videoMuted && (b = !1),
					z.call(this, !a),
					A.call(this, !b)
				}
				function w(a, b) {
					if (this.sessionTimers.enabled) {
						var c;
						a.session_expires && a.session_expires >= T.MIN_SESSION_EXPIRES ? (this.sessionTimers.currentExpires = a.session_expires, c = a.session_expires_refresher || "uas") : (this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires, c = "uas"),
						b.push("Session-Expires: " + this.sessionTimers.currentExpires + ";refresher=" + c),
						this.sessionTimers.refresher = "uas" === c,
						y.call(this)
					}
				}
				function x(a) {
					if (this.sessionTimers.enabled) {
						var b;
						a.session_expires && a.session_expires >= T.MIN_SESSION_EXPIRES ? (this.sessionTimers.currentExpires = a.session_expires, b = a.session_expires_refresher || "uac") : (this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires, b = "uac"),
						this.sessionTimers.refresher = "uac" === b,
						y.call(this)
					}
				}
				function y() {
					var a = this,
					b = this.sessionTimers.currentExpires;
					this.sessionTimers.running = !0,
					clearTimeout(this.sessionTimers.timer),
					this.sessionTimers.refresher ? this.sessionTimers.timer = setTimeout(function () {
							a.status !== M.STATUS_TERMINATED && (P("runSessionTimer() | sending session refresh request"), r.call(a, {
									eventHandlers: {
										succeeded: function (b) {
											x.call(a, b)
										}
									}
								}))
						}, 500 * b) : this.sessionTimers.timer = setTimeout(function () {
							a.status !== M.STATUS_TERMINATED && (Q("runSessionTimer() | timer expired, terminating the session"), a.terminate({
									cause: T.causes.REQUEST_TIMEOUT,
									status_code: 408,
									reason_phrase: "Session Timer Expired"
								}))
						}, 1100 * b)
				}
				function z(a) {
					var b,
					c,
					d,
					e,
					f,
					g = this.connection.getLocalStreams();
					for (d = g.length, b = 0; b < d; b++)
						for (f = g[b].getAudioTracks(), e = f.length, c = 0; c < e; c++)
							f[c].enabled = !a
				}
				function A(a) {
					var b,
					c,
					d,
					e,
					f,
					g = this.connection.getLocalStreams();
					for (d = g.length, b = 0; b < d; b++)
						for (f = g[b].getVideoTracks(), e = f.length, c = 0; c < e; c++)
							f[c].enabled = !a;
				}
				function B(a, b) {
					P("newRTCSession"),
					this.ua.newRTCSession({
						originator: a,
						session: this,
						request: b
					})
				}
				function C(a) {
					P("session connecting"),
					this.emit("connecting", {
						request: a
					})
				}
				function D(a, b) {
					P("session progress"),
					this.emit("progress", {
						originator: a,
						response: b || null
					})
				}
				function E(a, b) {
					P("session accepted"),
					this.start_time = new Date,
					this.emit("accepted", {
						originator: a,
						response: b || null
					})
				}
				function F(a, b) {
					P("session confirmed"),
					this.is_confirmed = !0,
					this.emit("confirmed", {
						originator: a,
						ack: b || null
					})
				}
				function G(a, b, c) {
					P("session ended"),
					this.end_time = new Date,
					this.close(),
					this.emit("ended", {
						originator: a,
						message: b || null,
						cause: c
					})
				}
				function H(a, b, c) {
					P("session failed"),
					this.close(),
					this.emit("failed", {
						originator: a,
						message: b || null,
						cause: c
					})
				}
				function I(a) {
					P("session onhold"),
					v.call(this),
					this.emit("hold", {
						originator: a
					})
				}
				function J(a) {
					P("session onunhold"),
					v.call(this),
					this.emit("unhold", {
						originator: a
					})
				}
				function K(a) {
					P("session onmute"),
					v.call(this),
					this.emit("muted", {
						audio: a.audio,
						video: a.video
					})
				}
				function L(a) {
					P("session onunmute"),
					v.call(this),
					this.emit("unmuted", {
						audio: a.audio,
						video: a.video
					})
				}
				b.exports = d;
				var M = {
					STATUS_NULL: 0,
					STATUS_INVITE_SENT: 1,
					STATUS_1XX_RECEIVED: 2,
					STATUS_INVITE_RECEIVED: 3,
					STATUS_WAITING_FOR_ANSWER: 4,
					STATUS_ANSWERED: 5,
					STATUS_WAITING_FOR_ACK: 6,
					STATUS_CANCELED: 7,
					STATUS_TERMINATED: 8,
					STATUS_CONFIRMED: 9
				};
				d.C = M;
				var N = a("util"),
				O = a("events"),
				P = a("debug")("JsSIP:RTCSession"),
				Q = a("debug")("JsSIP:ERROR:RTCSession");
				Q.log = console.warn.bind(console);
				var R = a("rtcninja"),
				S = a("sdp-transform"),
				T = a("./Constants"),
				U = a("./Exceptions"),
				V = a("./Transactions"),
				W = a("./Utils"),
				X = a("./Timers"),
				Y = a("./SIPMessage"),
				Z = a("./Dialog"),
				$ = a("./RequestSender"),
				_ = a("./RTCSession/Request"),
				aa = a("./RTCSession/DTMF"),
				ba = a("./RTCSession/ReferNotifier"),
				ca = a("./RTCSession/ReferSubscriber"),
				da = ["audio", "video"];
				N.inherits(d, O.EventEmitter),
				d.prototype.isInProgress = function () {
					switch (this.status) {
					case M.STATUS_NULL:
					case M.STATUS_INVITE_SENT:
					case M.STATUS_1XX_RECEIVED:
					case M.STATUS_INVITE_RECEIVED:
					case M.STATUS_WAITING_FOR_ANSWER:
						return !0;
					default:
						return !1
					}
				},
				d.prototype.isEstablished = function () {
					switch (this.status) {
					case M.STATUS_ANSWERED:
					case M.STATUS_WAITING_FOR_ACK:
					case M.STATUS_CONFIRMED:
						return !0;
					default:
						return !1
					}
				},
				d.prototype.isEnded = function () {
					switch (this.status) {
					case M.STATUS_CANCELED:
					case M.STATUS_TERMINATED:
						return !0;
					default:
						return !1
					}
				},
				d.prototype.isMuted = function () {
					return {
						audio: this.audioMuted,
						video: this.videoMuted
					}
				},
				d.prototype.isOnHold = function () {
					return {
						local: this.localHold,
						remote: this.remoteHold
					}
				},
				d.prototype.isReadyToReOffer = function () {
					return this.rtcReady ? this.dialog ? this.dialog.uac_pending_reply !== !0 && this.dialog.uas_pending_reply !== !0 || (P("isReadyToReOffer() | there is another INVITE/UPDATE transaction in progress"), !1) : (P("isReadyToReOffer() | session not established yet"), !1) : (P("isReadyToReOffer() | internal WebRTC status not ready"), !1)
				},
				d.prototype.connect = function (a, b, c) {
					P("connect()"),
					b = b || {};
					var d,
					e,
					f = a,
					h = b.eventHandlers || {},
					i = b.extraHeaders && b.extraHeaders.slice() || [],
					j = b.mediaConstraints || {
						audio: !0,
						video: !0
					},
					k = b.mediaStream || null,
					l = b.pcConfig || {
						iceServers: []
					},
					m = b.rtcConstraints || null,
					n = b.rtcOfferConstraints || null;
					if (this.rtcOfferConstraints = n, this.rtcAnswerConstraints = b.rtcAnswerConstraints || null, this.sessionTimers.enabled && W.isDecimal(b.sessionTimersExpires) && (b.sessionTimersExpires >= T.MIN_SESSION_EXPIRES ? this.sessionTimers.defaultExpires = b.sessionTimersExpires : this.sessionTimers.defaultExpires = T.SESSION_EXPIRES), this.data = b.data || this.data, void 0 === a)
						throw new TypeError("Not enough arguments");
					if (!R.hasWebRTC())
						throw new U.NotSupportedError("WebRTC not supported");
					if (a = this.ua.normalizeTarget(a), !a)
						throw new TypeError("Invalid target: " + f);
					if (this.status !== M.STATUS_NULL)
						throw new U.InvalidStateError(this.status);
					for (d in h)
						this.on(d, h[d]);
					this.from_tag = W.newTag(),
					this.anonymous = b.anonymous || !1,
					this.isCanceled = !1,
					e = {
						from_tag: this.from_tag
					},
					this.contact = this.ua.contact.toString({
							anonymous: this.anonymous,
							outbound: !0
						}),
					this.anonymous && (e.from_display_name = "Anonymous", e.from_uri = "sip:anonymous@anonymous.invalid", i.push("P-Preferred-Identity: " + this.ua.configuration.uri.toString()), i.push("Privacy: id")),
					i.push("Contact: " + this.contact),
					i.push("Content-Type: application/sdp"),
					this.sessionTimers.enabled && i.push("Session-Expires: " + this.sessionTimers.defaultExpires),
					this.request = new Y.OutgoingRequest(T.INVITE, a, this.ua, e, i),
					this.id = this.request.call_id + this.from_tag,
					g.call(this, l, m),
					this.ua.sessions[this.id] = this,
					this.direction = "outgoing",
					this.local_identity = this.request.from,
					this.remote_identity = this.request.to,
					c ? c(this) : B.call(this, "local", this.request),
					o.call(this, j, n, k)
				},
				d.prototype.init_incoming = function (a, b) {
					P("init_incoming()");
					var c,
					d = this,
					e = a.getHeader("Content-Type");
					return a.body && "application/sdp" !== e ? void a.reply(415) : (this.status = M.STATUS_INVITE_RECEIVED, this.from_tag = a.from_tag, this.id = a.call_id + this.from_tag, this.request = a, this.contact = this.ua.contact.toString(), this.ua.sessions[this.id] = this, a.hasHeader("expires") && (c = 1e3 * a.getHeader("expires")), a.to_tag = W.newTag(), i.call(this, a, "UAS", !0) ? (a.body ? this.late_sdp = !1 : this.late_sdp = !0, this.status = M.STATUS_WAITING_FOR_ANSWER, this.timers.userNoAnswerTimer = setTimeout(function () {
									a.reply(408),
									H.call(d, "local", null, T.causes.NO_ANSWER)
								}, this.ua.configuration.no_answer_timeout), c && (this.timers.expiresTimer = setTimeout(function () {
										d.status === M.STATUS_WAITING_FOR_ANSWER && (a.reply(487), H.call(d, "system", null, T.causes.EXPIRES))
									}, c)), this.direction = "incoming", this.local_identity = a.to, this.remote_identity = a.from, b ? b(this) : B.call(this, "remote", a), void(this.status !== M.STATUS_TERMINATED && (a.reply(180, null, ["Contact: " + d.contact]), D.call(d, "local", null)))) : void a.reply(500, "Missing Contact header field"))
				},
				d.prototype.answer = function (a) {
					function b(a) {
						if (t.status !== M.STATUS_TERMINATED)
							if (t.localMediaStream = a, a && t.connection.addStream(a), t.request.body || t.emit("peerconnection", {
									peerconnection: t.connection
								}), t.late_sdp)
								d();
							else {
								var b = {
									originator: "remote",
									type: "offer",
									sdp: u.body
								};
								t.emit("sdp", b),
								t.connection.setRemoteDescription(new R.RTCSessionDescription({
										type: "offer",
										sdp: b.sdp
									}), d, function () {
									u.reply(488),
									H.call(t, "system", null, T.causes.WEBRTC_ERROR)
								})
							}
					}
					function c() {
						t.status !== M.STATUS_TERMINATED && (u.reply(480), H.call(t, "local", null, T.causes.USER_DENIED_MEDIA_ACCESS))
					}
					function d() {
						C.call(t, u),
						t.late_sdp ? h.call(t, "offer", j, k, t.rtcOfferConstraints) : h.call(t, "answer", j, k, B)
					}
					function j(a) {
						function b() {
							t.status = M.STATUS_WAITING_FOR_ACK,
							e.call(t, u, a),
							f.call(t),
							E.call(t, "local")
						}
						function c() {
							H.call(t, "system", null, T.causes.CONNECTION_ERROR)
						}
						t.status !== M.STATUS_TERMINATED && (w.call(t, u, v), u.reply(200, null, v, a, b, c))
					}
					function k() {
						t.status !== M.STATUS_TERMINATED && (u.reply(500), H.call(t, "system", null, T.causes.WEBRTC_ERROR))
					}
					P("answer()"),
					a = a || {};
					var l,
					m,
					n,
					o,
					p = !1,
					q = !1,
					r = !1,
					s = !1,
					t = this,
					u = this.request,
					v = a.extraHeaders && a.extraHeaders.slice() || [],
					x = a.mediaConstraints || {},
					y = a.mediaStream || null,
					z = a.pcConfig || {
						iceServers: []
					},
					A = a.rtcConstraints || null,
					B = a.rtcAnswerConstraints || null;
					if (this.rtcAnswerConstraints = B, this.rtcOfferConstraints = a.rtcOfferConstraints || null, this.sessionTimers.enabled && W.isDecimal(a.sessionTimersExpires) && (a.sessionTimersExpires >= T.MIN_SESSION_EXPIRES ? this.sessionTimers.defaultExpires = a.sessionTimersExpires : this.sessionTimers.defaultExpires = T.SESSION_EXPIRES), this.data = a.data || this.data, "incoming" !== this.direction)
						throw new U.NotSupportedError('"answer" not supported for outgoing RTCSession');
					if (this.status !== M.STATUS_WAITING_FOR_ANSWER)
						throw new U.InvalidStateError(this.status);
					if (this.status = M.STATUS_ANSWERED, !i.call(this, u, "UAS"))
						return void u.reply(500, "Error creating dialog");
					for (clearTimeout(this.timers.userNoAnswerTimer), v.unshift("Contact: " + t.contact), n = u.parseSDP(), Array.isArray(n.media) || (n.media = [n.media]), l = n.media.length; l--; ) {
						var D = n.media[l];
						"audio" === D.type && (p = !0, D.direction && "sendrecv" !== D.direction || (r = !0)),
						"video" === D.type && (q = !0, D.direction && "sendrecv" !== D.direction || (s = !0))
					}
					if (y && x.audio === !1)
						for (o = y.getAudioTracks(), m = o.length, l = 0; l < m; l++)
							y.removeTrack(o[l]);
					if (y && x.video === !1)
						for (o = y.getVideoTracks(), m = o.length, l = 0; l < m; l++)
							y.removeTrack(o[l]);
					y || void 0 !== x.audio || (x.audio = r),
					y || void 0 !== x.video || (x.video = s),
					y || p || (x.audio = !1),
					y || q || (x.video = !1),
					g.call(this, z, A),
					y ? b(y) : x.audio || x.video ? (t.localMediaStreamLocallyGenerated = !0, R.getUserMedia(x, b, c)) : b(null)
				},
				d.prototype.terminate = function (a) {
					P("terminate()"),
					a = a || {};
					var b,
					c,
					d = a.cause || T.causes.BYE,
					e = a.status_code,
					f = a.reason_phrase,
					g = a.extraHeaders && a.extraHeaders.slice() || [],
					h = a.body,
					i = this;
					if (this.status === M.STATUS_TERMINATED)
						throw new U.InvalidStateError(this.status);
					switch (this.status) {
					case M.STATUS_NULL:
					case M.STATUS_INVITE_SENT:
					case M.STATUS_1XX_RECEIVED:
						if (P("canceling session"), e && (e < 200 || e >= 700))
							throw new TypeError("Invalid status_code: " + e);
						e && (f = f || T.REASON_PHRASE[e] || "", b = "SIP ;cause=" + e + ' ;text="' + f + '"'),
						this.status === M.STATUS_NULL ? (this.isCanceled = !0, this.cancelReason = b) : this.status === M.STATUS_INVITE_SENT ? (this.isCanceled = !0, this.cancelReason = b) : this.status === M.STATUS_1XX_RECEIVED && this.request.cancel(b),
						this.status = M.STATUS_CANCELED,
						H.call(this, "local", null, T.causes.CANCELED);
						break;
					case M.STATUS_WAITING_FOR_ANSWER:
					case M.STATUS_ANSWERED:
						if (P("rejecting session"), e = e || 480, e < 300 || e >= 700)
							throw new TypeError("Invalid status_code: " + e);
						this.request.reply(e, f, g, h),
						H.call(this, "local", null, T.causes.REJECTED);
						break;
					case M.STATUS_WAITING_FOR_ACK:
					case M.STATUS_CONFIRMED:
						if (P("terminating session"), f = a.reason_phrase || T.REASON_PHRASE[e] || "", e && (e < 200 || e >= 700))
							throw new TypeError("Invalid status_code: " + e);
						e && g.push("Reason: SIP ;cause=" + e + '; text="' + f + '"'),
						this.status === M.STATUS_WAITING_FOR_ACK && "incoming" === this.direction && this.request.server_transaction.state !== V.C.STATUS_TERMINATED ? (c = this.dialog, this.receiveRequest = function (a) {
							a.method === T.ACK && (t.call(this, T.BYE, {
									extraHeaders: g,
									body: h
								}), c.terminate())
						}, this.request.server_transaction.on("stateChanged", function () {
								this.state === V.C.STATUS_TERMINATED && (t.call(i, T.BYE, {
										extraHeaders: g,
										body: h
									}), c.terminate())
							}), G.call(this, "local", null, d), this.dialog = c, this.ua.dialogs[c.id.toString()] = c) : (t.call(this, T.BYE, {
								extraHeaders: g,
								body: h
							}), G.call(this, "local", null, d))
					}
				},
				d.prototype.close = function () {
					P("close()");
					var a;
					if (this.status !== M.STATUS_TERMINATED) {
						if (this.connection)
							try {
								this.connection.close()
							} catch (b) {
								Q("close() | error closing the RTCPeerConnection: %o", b)
							}
						this.localMediaStream && this.localMediaStreamLocallyGenerated && (P("close() | closing local MediaStream"), R.closeMediaStream(this.localMediaStream));
						for (a in this.timers)
							clearTimeout(this.timers[a]);
						clearTimeout(this.sessionTimers.timer),
						this.dialog && (this.dialog.terminate(), delete this.dialog);
						for (a in this.earlyDialogs)
							this.earlyDialogs[a].terminate(), delete this.earlyDialogs[a];
						this.status = M.STATUS_TERMINATED,
						delete this.ua.sessions[this.id]
					}
				},
				d.prototype.sendDTMF = function (a, b) {
					function c() {
						var a,
						h;
						if (g.status === M.STATUS_TERMINATED || !g.tones || f >= g.tones.length)
							return void(g.tones = null);
						if (a = g.tones[f], f += 1, "," === a)
							h = 2e3;
						else {
							var i = new aa(g);
							b.eventHandlers = {
								failed: function () {
									g.tones = null
								}
							},
							i.send(a, b),
							h = d + e
						}
						setTimeout(c, h)
					}
					P("sendDTMF() | tones: %s", a);
					var d,
					e,
					f = 0,
					g = this;
					if (b = b || {}, d = b.duration || null, e = b.interToneGap || null, void 0 === a)
						throw new TypeError("Not enough arguments");
					if (this.status !== M.STATUS_CONFIRMED && this.status !== M.STATUS_WAITING_FOR_ACK)
						throw new U.InvalidStateError(this.status);
					if ("number" == typeof a && (a = a.toString()), !a || "string" != typeof a || !a.match(/^[0-9A-D#*,]+$/i))
						throw new TypeError("Invalid tones: " + a);
					if (d && !W.isDecimal(d))
						throw new TypeError("Invalid tone duration: " + d);
					if (d ? d < aa.C.MIN_DURATION ? (P('"duration" value is lower than the minimum allowed, setting it to ' + aa.C.MIN_DURATION + " milliseconds"), d = aa.C.MIN_DURATION) : d > aa.C.MAX_DURATION ? (P('"duration" value is greater than the maximum allowed, setting it to ' + aa.C.MAX_DURATION + " milliseconds"), d = aa.C.MAX_DURATION) : d = Math.abs(d) : d = aa.C.DEFAULT_DURATION, b.duration = d, e && !W.isDecimal(e))
						throw new TypeError("Invalid interToneGap: " + e);
					return e ? e < aa.C.MIN_INTER_TONE_GAP ? (P('"interToneGap" value is lower than the minimum allowed, setting it to ' + aa.C.MIN_INTER_TONE_GAP + " milliseconds"), e = aa.C.MIN_INTER_TONE_GAP) : e = Math.abs(e) : e = aa.C.DEFAULT_INTER_TONE_GAP,
					this.tones ? void(this.tones += a) : (this.tones = a, void c())
				},
				d.prototype.mute = function (a) {
					P("mute()"),
					a = a || {
						audio: !0,
						video: !1
					};
					var b = !1,
					c = !1;
					this.audioMuted === !1 && a.audio && (b = !0, this.audioMuted = !0, z.call(this, !0)),
					this.videoMuted === !1 && a.video && (c = !0, this.videoMuted = !0, A.call(this, !0)),
					b !== !0 && c !== !0 || K.call(this, {
						audio: b,
						video: c
					})
				},
				d.prototype.unmute = function (a) {
					P("unmute()"),
					a = a || {
						audio: !0,
						video: !0
					};
					var b = !1,
					c = !1;
					this.audioMuted === !0 && a.audio && (b = !0, this.audioMuted = !1, this.localHold === !1 && z.call(this, !1)),
					this.videoMuted === !0 && a.video && (c = !0, this.videoMuted = !1, this.localHold === !1 && A.call(this, !1)),
					b !== !0 && c !== !0 || L.call(this, {
						audio: b,
						video: c
					})
				},
				d.prototype.hold = function (a, b) {
					P("hold()"),
					a = a || {};
					var c,
					d = this;
					return (this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_CONFIRMED) && (this.localHold !== !0 && (!!this.isReadyToReOffer() && (this.localHold = !0, I.call(this, "local"), c = {
									succeeded: function () {
										b && b()
									},
									failed: function () {
										d.terminate({
											cause: T.causes.WEBRTC_ERROR,
											status_code: 500,
											reason_phrase: "Hold Failed"
										})
									}
								}, a.useUpdate ? r.call(this, {
									sdpOffer: !0,
									eventHandlers: c,
									extraHeaders: a.extraHeaders
								}) : q.call(this, {
									eventHandlers: c,
									extraHeaders: a.extraHeaders
								}), !0)))
				},
				d.prototype.unhold = function (a, b) {
					P("unhold()"),
					a = a || {};
					var c,
					d = this;
					return (this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_CONFIRMED) && (this.localHold !== !1 && (!!this.isReadyToReOffer() && (this.localHold = !1, J.call(this, "local"), c = {
									succeeded: function () {
										b && b()
									},
									failed: function () {
										d.terminate({
											cause: T.causes.WEBRTC_ERROR,
											status_code: 500,
											reason_phrase: "Unhold Failed"
										})
									}
								}, a.useUpdate ? r.call(this, {
									sdpOffer: !0,
									eventHandlers: c,
									extraHeaders: a.extraHeaders
								}) : q.call(this, {
									eventHandlers: c,
									extraHeaders: a.extraHeaders
								}), !0)))
				},
				d.prototype.renegotiate = function (a, b) {
					P("renegotiate()"),
					a = a || {};
					var c,
					d = this,
					e = a.rtcOfferConstraints || null;
					return (this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_CONFIRMED) && (!!this.isReadyToReOffer() && (c = {
								succeeded: function () {
									b && b()
								},
								failed: function () {
									d.terminate({
										cause: T.causes.WEBRTC_ERROR,
										status_code: 500,
										reason_phrase: "Media Renegotiation Failed"
									})
								}
							}, v.call(this), a.useUpdate ? r.call(this, {
								sdpOffer: !0,
								eventHandlers: c,
								rtcOfferConstraints: e,
								extraHeaders: a.extraHeaders
							}) : q.call(this, {
								eventHandlers: c,
								rtcOfferConstraints: e,
								extraHeaders: a.extraHeaders
							}), !0))
				},
				d.prototype.refer = function (a, b) {
					P("refer()");
					var c,
					d,
					e = this,
					f = a;
					if (this.status !== M.STATUS_WAITING_FOR_ACK && this.status !== M.STATUS_CONFIRMED)
						return !1;
					if (a = this.ua.normalizeTarget(a), !a)
						throw new TypeError("Invalid target: " + f);
					return c = new ca(this),
					c.sendRefer(a, b),
					d = c.outgoingRequest.cseq,
					this.referSubscribers[d] = c,
					c.on("requestFailed", function () {
						delete e.referSubscribers[d]
					}),
					c.on("accepted", function () {
						delete e.referSubscribers[d]
					}),
					c.on("failed", function () {
						delete e.referSubscribers[d]
					}),
					c
				},
				d.prototype.receiveRequest = function (a) {
					P("receiveRequest()");
					var b,
					c = this;
					if (a.method === T.CANCEL)
						this.status !== M.STATUS_WAITING_FOR_ANSWER && this.status !== M.STATUS_ANSWERED || (this.status = M.STATUS_CANCELED, this.request.reply(487), H.call(this, "remote", a, T.causes.CANCELED));
					else
						switch (a.method) {
						case T.ACK:
							if (this.status !== M.STATUS_WAITING_FOR_ACK)
								return;
							if (this.status = M.STATUS_CONFIRMED, clearTimeout(this.timers.ackTimer), clearTimeout(this.timers.invite2xxTimer), this.late_sdp) {
								if (!a.body) {
									this.terminate({
										cause: T.causes.MISSING_SDP,
										status_code: 400
									});
									break
								}
								var d = {
									originator: "remote",
									type: "answer",
									sdp: a.body
								};
								this.emit("sdp", d),
								this.connection.setRemoteDescription(new R.RTCSessionDescription({
										type: "answer",
										sdp: d.sdp
									}), function () {
									c.is_confirmed || F.call(c, "remote", a)
								}, function () {
									c.terminate({
										cause: T.causes.BAD_MEDIA_DESCRIPTION,
										status_code: 488
									})
								})
							} else
								this.is_confirmed || F.call(this, "remote", a);
							break;
						case T.BYE:
							this.status === M.STATUS_CONFIRMED ? (a.reply(200), G.call(this, "remote", a, T.causes.BYE)) : this.status === M.STATUS_INVITE_RECEIVED ? (a.reply(200), this.request.reply(487, "BYE Received"), G.call(this, "remote", a, T.causes.BYE)) : a.reply(403, "Wrong Status");
							break;
						case T.INVITE:
							this.status === M.STATUS_CONFIRMED ? a.hasHeader("replaces") ? n.call(this, a) : j.call(this, a) : a.reply(403, "Wrong Status");
							break;
						case T.INFO:
							this.status === M.STATUS_CONFIRMED || this.status === M.STATUS_WAITING_FOR_ACK || this.status === M.STATUS_INVITE_RECEIVED ? (b = a.getHeader("content-type"), b && b.match(/^application\/dtmf-relay/i) ? new aa(this).init_incoming(a) : a.reply(415)) : a.reply(403, "Wrong Status");
							break;
						case T.UPDATE:
							this.status === M.STATUS_CONFIRMED ? k.call(this, a) : a.reply(403, "Wrong Status");
							break;
						case T.REFER:
							this.status === M.STATUS_CONFIRMED ? l.call(this, a) : a.reply(403, "Wrong Status");
							break;
						case T.NOTIFY:
							this.status === M.STATUS_CONFIRMED ? m.call(this, a) : a.reply(403, "Wrong Status");
							break;
						default:
							a.reply(501)
						}
				},
				d.prototype.onTransportError = function () {
					Q("onTransportError()"),
					this.status !== M.STATUS_TERMINATED && this.terminate({
						status_code: 500,
						reason_phrase: T.causes.CONNECTION_ERROR,
						cause: T.causes.CONNECTION_ERROR
					})
				},
				d.prototype.onRequestTimeout = function () {
					P("onRequestTimeout"),
					this.status !== M.STATUS_TERMINATED && this.terminate({
						status_code: 408,
						reason_phrase: T.causes.REQUEST_TIMEOUT,
						cause: T.causes.REQUEST_TIMEOUT
					})
				},
				d.prototype.onDialogError = function () {
					Q("onDialogError()"),
					this.status !== M.STATUS_TERMINATED && this.terminate({
						status_code: 500,
						reason_phrase: T.causes.DIALOG_ERROR,
						cause: T.causes.DIALOG_ERROR
					})
				},
				d.prototype.newDTMF = function (a) {
					P("newDTMF()"),
					this.emit("newDTMF", a)
				},
				d.prototype.resetLocalMedia = function () {
					P("resetLocalMedia()"),
					this.localHold = !1,
					this.audioMuted = !1,
					this.videoMuted = !1,
					v.call(this)
				}
			}, {
				"./Constants": 1,
				"./Dialog": 2,
				"./Exceptions": 5,
				"./RTCSession/DTMF": 12,
				"./RTCSession/ReferNotifier": 13,
				"./RTCSession/ReferSubscriber": 14,
				"./RTCSession/Request": 15,
				"./RequestSender": 17,
				"./SIPMessage": 18,
				"./Timers": 20,
				"./Transactions": 21,
				"./Utils": 25,
				debug: 33,
				events: 28,
				rtcninja: 38,
				"sdp-transform": 44,
				util: 32
			}
		],
		12: [function (a, b, c) {
				function d(a) {
					this.owner = a,
					this.direction = null,
					this.tone = null,
					this.duration = null
				}
				b.exports = d;
				var e = {
					MIN_DURATION: 70,
					MAX_DURATION: 6e3,
					DEFAULT_DURATION: 100,
					MIN_INTER_TONE_GAP: 50,
					DEFAULT_INTER_TONE_GAP: 500
				};
				d.C = e;
				var f = a("debug")("JsSIP:RTCSession:DTMF"),
				g = a("debug")("JsSIP:ERROR:RTCSession:DTMF");
				g.log = console.warn.bind(console);
				var h = a("../Constants"),
				i = a("../Exceptions"),
				j = a("../RTCSession");
				d.prototype.send = function (a, b) {
					var c,
					d;
					if (void 0 === a)
						throw new TypeError("Not enough arguments");
					if (this.direction = "outgoing", this.owner.status !== j.C.STATUS_CONFIRMED && this.owner.status !== j.C.STATUS_WAITING_FOR_ACK)
						throw new i.InvalidStateError(this.owner.status);
					if (b = b || {}, c = b.extraHeaders ? b.extraHeaders.slice() : [], this.eventHandlers = b.eventHandlers || {}, "string" == typeof a)
						a = a.toUpperCase();
					else {
						if ("number" != typeof a)
							throw new TypeError("Invalid tone: " + a);
						a = a.toString()
					}
					if (!a.match(/^[0-9A-D#*]$/))
						throw new TypeError("Invalid tone: " + a);
					this.tone = a,
					this.duration = b.duration,
					c.push("Content-Type: application/dtmf-relay"),
					d = "Signal=" + this.tone + "\r\n",
					d += "Duration=" + this.duration,
					this.owner.newDTMF({
						originator: "local",
						dtmf: this,
						request: this.request
					}),
					this.owner.dialog.sendRequest(this, h.INFO, {
						extraHeaders: c,
						body: d
					})
				},
				d.prototype.receiveResponse = function (a) {
					switch (!0) {
					case /^1[0-9]{2}$/.test(a.status_code):
						break;
					case /^2[0-9]{2}$/.test(a.status_code):
						f("onSuccessResponse"),
						this.eventHandlers.onSuccessResponse && this.eventHandlers.onSuccessResponse(a);
						break;
					default:
						this.eventHandlers.onErrorResponse && this.eventHandlers.onErrorResponse(a)
					}
				},
				d.prototype.onRequestTimeout = function () {
					g("onRequestTimeout"),
					this.eventHandlers.onRequestTimeout && this.eventHandlers.onRequestTimeout()
				},
				d.prototype.onTransportError = function () {
					g("onTransportError"),
					this.eventHandlers.onTransportError && this.eventHandlers.onTransportError()
				},
				d.prototype.onDialogError = function () {
					g("onDialogError"),
					this.eventHandlers.onDialogError && this.eventHandlers.onDialogError()
				},
				d.prototype.init_incoming = function (a) {
					var b,
					c = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,
					d = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;
					this.direction = "incoming",
					this.request = a,
					a.reply(200),
					a.body && (b = a.body.split("\n"), b.length >= 1 && c.test(b[0]) && (this.tone = b[0].replace(c, "$2")), b.length >= 2 && d.test(b[1]) && (this.duration = parseInt(b[1].replace(d, "$2"), 10))),
					this.duration || (this.duration = e.DEFAULT_DURATION),
					this.tone ? this.owner.newDTMF({
						originator: "remote",
						dtmf: this,
						request: a
					}) : f("invalid INFO DTMF received, discarded")
				}
			}, {
				"../Constants": 1,
				"../Exceptions": 5,
				"../RTCSession": 11,
				debug: 33
			}
		],
		13: [function (a, b, c) {
				function d(a, b, c) {
					this.session = a,
					this.id = b,
					this.expires = c || e.expires,
					this.active = !0,
					this.notify(100)
				}
				b.exports = d;
				var e = {
					event_type: "refer",
					body_type: "message/sipfrag;version=2.0",
					expires: 300
				},
				f = a("debug")("JsSIP:RTCSession:ReferNotifier"),
				g = a("../Constants"),
				h = a("./Request");
				d.prototype.notify = function (a, b) {
					f("notify()");
					var c,
					d = this;
					if (this.active !== !1) {
						b = b || g.REASON_PHRASE[a] || "",
						c = a >= 200 ? "terminated;reason=noresource" : "active;expires=" + this.expires;
						var i = new h(this.session, g.NOTIFY);
						i.send({
							extraHeaders: ["Event: " + e.event_type + ";id=" + d.id, "Subscription-State: " + c, "Content-Type: " + e.body_type],
							body: "SIP/2.0 " + a + " " + b,
							eventHandlers: {
								onErrorResponse: function () {
									d.active = !1
								}
							}
						})
					}
				}
			}, {
				"../Constants": 1,
				"./Request": 15,
				debug: 33
			}
		],
		14: [function (a, b, c) {
				function d(a) {
					this.session = a,
					this.timer = null,
					this.outgoingRequest = null,
					h.EventEmitter.call(this)
				}
				function e() {
					console.log("removeSubscriber()"),
					clearTimeout(this.timer),
					this.session.referSubscriber = null
				}
				b.exports = d;
				var f = {
					expires: 120
				},
				g = a("util"),
				h = a("events"),
				i = a("debug")("JsSIP:RTCSession:ReferSubscriber"),
				j = a("../Constants"),
				k = a("../Grammar"),
				l = a("./Request");
				g.inherits(d, h.EventEmitter),
				d.prototype.sendRefer = function (a, b) {
					i("sendRefer()");
					var c,
					d,
					g,
					h = null,
					k = this;
					b = b || {},
					c = b.extraHeaders ? b.extraHeaders.slice() : [],
					d = b.eventHandlers || {};
					for (var m in d)
						this.on(m, d[m]);
					b.replaces && (h = b.replaces.request.call_id, h += ";to-tag=" + b.replaces.to_tag, h += ";from-tag=" + b.replaces.from_tag, h = encodeURIComponent(h)),
					g = "Refer-To: <" + a + (h ? "?Replaces=" + h : "") + ">",
					c.push(g);
					var n = new l(this.session, j.REFER);
					this.timer = setTimeout(function () {
							e.call(k)
						}, 1e3 * f.expires),
					n.send({
						extraHeaders: c,
						eventHandlers: {
							onSuccessResponse: function (a) {
								k.emit("requestSucceeded", {
									response: a
								})
							},
							onErrorResponse: function (a) {
								k.emit("requestFailed", {
									response: a,
									cause: j.causes.REJECTED
								})
							},
							onTransportError: function () {
								e.call(k),
								k.emit("requestFailed", {
									response: null,
									cause: j.causes.CONNECTION_ERROR
								})
							},
							onRequestTimeout: function () {
								e.call(k),
								k.emit("requestFailed", {
									response: null,
									cause: j.causes.REQUEST_TIMEOUT
								})
							},
							onDialogError: function () {
								e.call(k),
								k.emit("requestFailed", {
									response: null,
									cause: j.causes.DIALOG_ERROR
								})
							}
						}
					}),
					this.outgoingRequest = n.outgoingRequest
				},
				d.prototype.receiveNotify = function (a) {
					i("receiveNotify()");
					var b;
					if (a.body) {
						if (b = k.parse(a.body, "Status_Line"), b === -1)
							return void i('receiveNotify() | error parsing NOTIFY body: "' + a.body + '"');
						switch (!0) {
						case /^100$/.test(b.status_code):
							this.emit("trying", {
								request: a,
								status_line: b
							});
							break;
						case /^1[0-9]{2}$/.test(b.status_code):
							this.emit("progress", {
								request: a,
								status_line: b
							});
							break;
						case /^2[0-9]{2}$/.test(b.status_code):
							e.call(this),
							this.emit("accepted", {
								request: a,
								status_line: b
							});
							break;
						default:
							e.call(this),
							this.emit("failed", {
								request: a,
								status_line: b
							})
						}
					}
				}
			}, {
				"../Constants": 1,
				"../Grammar": 6,
				"./Request": 15,
				debug: 33,
				events: 28,
				util: 32
			}
		],
		15: [function (a, b, c) {
				function d(a, b) {
					if (e("new | %s", b), this.session = a, this.method = b, this.outgoingRequest = null, this.session.status !== i.C.STATUS_1XX_RECEIVED && this.session.status !== i.C.STATUS_WAITING_FOR_ANSWER && this.session.status !== i.C.STATUS_WAITING_FOR_ACK && this.session.status !== i.C.STATUS_CONFIRMED && this.session.status !== i.C.STATUS_TERMINATED)
						throw new h.InvalidStateError(this.session.status);
					if (this.session.status === i.C.STATUS_TERMINATED && b !== g.BYE)
						throw new h.InvalidStateError(this.session.status)
				}
				b.exports = d;
				var e = a("debug")("JsSIP:RTCSession:Request"),
				f = a("debug")("JsSIP:ERROR:RTCSession:Request");
				f.log = console.warn.bind(console);
				var g = a("../Constants"),
				h = a("../Exceptions"),
				i = a("../RTCSession");
				d.prototype.send = function (a) {
					a = a || {};
					var b = a.extraHeaders && a.extraHeaders.slice() || [],
					c = a.body || null;
					this.eventHandlers = a.eventHandlers || {},
					this.outgoingRequest = this.session.dialog.sendRequest(this, this.method, {
							extraHeaders: b,
							body: c
						})
				},
				d.prototype.receiveResponse = function (a) {
					switch (!0) {
					case /^1[0-9]{2}$/.test(a.status_code):
						e("onProgressResponse"),
						this.eventHandlers.onProgressResponse && this.eventHandlers.onProgressResponse(a);
						break;
					case /^2[0-9]{2}$/.test(a.status_code):
						e("onSuccessResponse"),
						this.eventHandlers.onSuccessResponse && this.eventHandlers.onSuccessResponse(a);
						break;
					default:
						e("onErrorResponse"),
						this.eventHandlers.onErrorResponse && this.eventHandlers.onErrorResponse(a)
					}
				},
				d.prototype.onRequestTimeout = function () {
					f("onRequestTimeout"),
					this.eventHandlers.onRequestTimeout && this.eventHandlers.onRequestTimeout()
				},
				d.prototype.onTransportError = function () {
					f("onTransportError"),
					this.eventHandlers.onTransportError && this.eventHandlers.onTransportError()
				},
				d.prototype.onDialogError = function () {
					f("onDialogError"),
					this.eventHandlers.onDialogError && this.eventHandlers.onDialogError()
				}
			}, {
				"../Constants": 1,
				"../Exceptions": 5,
				"../RTCSession": 11,
				debug: 33
			}
		],
		16: [function (a, b, c) {
				function d(a, b) {
					var c = 1;
					this.ua = a,
					this.transport = b,
					this.registrar = a.configuration.registrar_server,
					this.expires = a.configuration.register_expires,
					this.call_id = f.createRandomToken(22),
					this.cseq = 0,
					this.to_uri = a.configuration.uri,
					this.registrationTimer = null,
					this.registered = !1,
					this.contact = this.ua.contact.toString(),
					this.contact += ";+sip.ice",
					this.extraHeaders = [],
					this.extraContactParams = "",
					c && (this.contact += ";reg-id=" + c, this.contact += ';+sip.instance="<urn:uuid:' + this.ua.configuration.instance_id + '>"')
				}
				b.exports = d;
				var e = a("debug")("JsSIP:Registrator"),
				f = a("./Utils"),
				g = a("./Constants"),
				h = a("./SIPMessage"),
				i = a("./RequestSender");
				d.prototype = {
					setExtraHeaders: function (a) {
						Array.isArray(a) || (a = []),
						this.extraHeaders = a.slice()
					},
					setExtraContactParams: function (a) {
						a instanceof Object || (a = {}),
						this.extraContactParams = "";
						for (var b in a) {
							var c = a[b];
							this.extraContactParams += ";" + b,
							c && (this.extraContactParams += "=" + c)
						}
					},
					register: function () {
						var a,
						b,
						c,
						d = this;
						c = this.extraHeaders.slice(),
						c.push("Contact: " + this.contact + ";expires=" + this.expires + this.extraContactParams),
						c.push("Expires: " + this.expires),
						this.request = new h.OutgoingRequest(g.REGISTER, this.registrar, this.ua, {
								to_uri: this.to_uri,
								call_id: this.call_id,
								cseq: this.cseq += 1
							}, c),
						a = new i(this, this.ua),
						this.receiveResponse = function (a) {
							var c,
							h,
							i = a.getHeaders("contact").length;
							if (a.cseq === this.cseq)
								switch (null !== this.registrationTimer && (clearTimeout(this.registrationTimer), this.registrationTimer = null), !0) {
								case /^1[0-9]{2}$/.test(a.status_code):
									break;
								case /^2[0-9]{2}$/.test(a.status_code):
									if (a.hasHeader("expires") && (h = a.getHeader("expires")), !i) {
										e("no Contact header in response to REGISTER, response ignored");
										break
									}
									for (; i--; ) {
										if (c = a.parseHeader("contact", i), c.uri.user === this.ua.contact.uri.user) {
											h = c.getParam("expires");
											break
										}
										c = null
									}
									if (!c) {
										e("no Contact header pointing to us, response ignored");
										break
									}
									h || (h = this.expires),
									this.registrationTimer = setTimeout(function () {
											d.registrationTimer = null,
											d.register()
										}, 1e3 * h - 3e3),
									c.hasParam("temp-gruu") && (this.ua.contact.temp_gruu = c.getParam("temp-gruu").replace(/"/g, "")),
									c.hasParam("pub-gruu") && (this.ua.contact.pub_gruu = c.getParam("pub-gruu").replace(/"/g, "")),
									this.registered || (this.registered = !0, this.ua.registered({
											response: a
										}));
									break;
								case /^423$/.test(a.status_code):
									a.hasHeader("min-expires") ? (this.expires = a.getHeader("min-expires"), this.register()) : (e("423 response received for REGISTER without Min-Expires"), this.registrationFailure(a, g.causes.SIP_FAILURE_CODE));
									break;
								default:
									b = f.sipErrorCause(a.status_code),
									this.registrationFailure(a, b)
								}
						},
						this.onRequestTimeout = function () {
							this.registrationFailure(null, g.causes.REQUEST_TIMEOUT)
						},
						this.onTransportError = function () {
							this.registrationFailure(null, g.causes.CONNECTION_ERROR)
						},
						a.send()
					},
					unregister: function (a) {
						var b;
						if (!this.registered)
							return void e("already unregistered");
						a = a || {},
						this.registered = !1,
						null !== this.registrationTimer && (clearTimeout(this.registrationTimer), this.registrationTimer = null),
						b = this.extraHeaders.slice(),
						a.all ? (b.push("Contact: *" + this.extraContactParams), b.push("Expires: 0"), this.request = new h.OutgoingRequest(g.REGISTER, this.registrar, this.ua, {
									to_uri: this.to_uri,
									call_id: this.call_id,
									cseq: this.cseq += 1
								}, b)) : (b.push("Contact: " + this.contact + ";expires=0" + this.extraContactParams), b.push("Expires: 0"), this.request = new h.OutgoingRequest(g.REGISTER, this.registrar, this.ua, {
									to_uri: this.to_uri,
									call_id: this.call_id,
									cseq: this.cseq += 1
								}, b));
						var c = new i(this, this.ua);
						this.receiveResponse = function (a) {
							var b;
							switch (!0) {
							case /^1[0-9]{2}$/.test(a.status_code):
								break;
							case /^2[0-9]{2}$/.test(a.status_code):
								this.unregistered(a);
								break;
							default:
								b = f.sipErrorCause(a.status_code),
								this.unregistered(a, b)
							}
						},
						this.onRequestTimeout = function () {
							this.unregistered(null, g.causes.REQUEST_TIMEOUT)
						},
						this.onTransportError = function () {
							this.unregistered(null, g.causes.CONNECTION_ERROR)
						},
						c.send()
					},
					registrationFailure: function (a, b) {
						this.ua.registrationFailed({
							response: a || null,
							cause: b
						}),
						this.registered && (this.registered = !1, this.ua.unregistered({
								response: a || null,
								cause: b
							}))
					},
					unregistered: function (a, b) {
						this.registered = !1,
						this.ua.unregistered({
							response: a || null,
							cause: b || null
						})
					},
					onTransportClosed: function () {
						null !== this.registrationTimer && (clearTimeout(this.registrationTimer), this.registrationTimer = null),
						this.registered && (this.registered = !1, this.ua.unregistered({}))
					},
					close: function () {
						this.registered && this.unregister()
					}
				}
			}, {
				"./Constants": 1,
				"./RequestSender": 17,
				"./SIPMessage": 18,
				"./Utils": 25,
				debug: 33
			}
		],
		17: [function (a, b, c) {
				function d(a, b) {
					this.ua = b,
					this.applicant = a,
					this.method = a.request.method,
					this.request = a.request,
					this.auth = null,
					this.challenged = !1,
					this.staled = !1,
					b.status !== g.C.STATUS_USER_CLOSED || this.method === f.BYE && this.method === f.ACK || this.onTransportError()
				}
				b.exports = d;
				var e = a("debug")("JsSIP:RequestSender"),
				f = a("./Constants"),
				g = a("./UA"),
				h = a("./DigestAuthentication"),
				i = a("./Transactions");
				d.prototype = {
					send: function () {
						switch (this.method) {
						case "INVITE":
							this.clientTransaction = new i.InviteClientTransaction(this, this.request, this.ua.transport);
							break;
						case "ACK":
							this.clientTransaction = new i.AckClientTransaction(this, this.request, this.ua.transport);
							break;
						default:
							this.clientTransaction = new i.NonInviteClientTransaction(this, this.request, this.ua.transport)
						}
						this.clientTransaction.send()
					},
					onRequestTimeout: function () {
						this.applicant.onRequestTimeout()
					},
					onTransportError: function () {
						this.applicant.onTransportError()
					},
					receiveResponse: function (a) {
						var b,
						c,
						d,
						g = a.status_code;
						if (401 !== g && 407 !== g || null === this.ua.configuration.password && null === this.ua.configuration.ha1)
							this.applicant.receiveResponse(a);
						else {
							if (401 === a.status_code ? (c = a.parseHeader("www-authenticate"), d = "authorization") : (c = a.parseHeader("proxy-authenticate"), d = "proxy-authorization"), !c)
								return e(a.status_code + " with wrong or missing challenge, cannot authenticate"), void this.applicant.receiveResponse(a);
							if (!this.challenged || !this.staled && c.stale === !0) {
								if (this.auth || (this.auth = new h({
												username: this.ua.configuration.authorization_user,
												password: this.ua.configuration.password,
												realm: this.ua.configuration.realm,
												ha1: this.ua.configuration.ha1
											})), !this.auth.authenticate(this.request, c))
									return void this.applicant.receiveResponse(a);
								this.challenged = !0,
								this.ua.set("realm", this.auth.get("realm")),
								this.ua.set("ha1", this.auth.get("ha1")),
								c.stale && (this.staled = !0),
								b = a.method === f.REGISTER ? this.applicant.cseq += 1 : this.request.dialog ? this.request.dialog.local_seqnum += 1 : this.request.cseq + 1,
								this.request = this.request.clone(),
								this.request.cseq = b,
								this.request.setHeader("cseq", b + " " + this.method),
								this.request.setHeader(d, this.auth.toString()),
								this.send()
							} else
								this.applicant.receiveResponse(a)
						}
					}
				}
			}, {
				"./Constants": 1,
				"./DigestAuthentication": 4,
				"./Transactions": 21,
				"./UA": 23,
				debug: 33
			}
		],
		18: [function (a, b, c) {
				function d(a, b, c, d, e, f) {
					var g,
					h,
					i,
					m;
					return d = d || {},
					a && b && c ? (this.ua = c, this.headers = {}, this.method = a, this.ruri = b, this.body = f, this.extraHeaders = e && e.slice() || [], d.route_set ? this.setHeader("route", d.route_set) : c.configuration.use_preloaded_route && this.setHeader("route", "<" + c.transport.sip_uri + ";lr>"), this.setHeader("via", ""), this.setHeader("max-forwards", j.MAX_FORWARDS), g = d.to_display_name || 0 === d.to_display_name ? '"' + d.to_display_name + '" ' : "", g += "<" + (d.to_uri || b) + ">", g += d.to_tag ? ";tag=" + d.to_tag : "", this.to = new l.parse(g), this.setHeader("to", g), h = d.from_display_name || 0 === d.from_display_name ? '"' + d.from_display_name + '" ' : c.configuration.display_name ? '"' + c.configuration.display_name + '" ' : "", h += "<" + (d.from_uri || c.configuration.uri) + ">;tag=", h += d.from_tag || k.newTag(), this.from = new l.parse(h), this.setHeader("from", h), i = d.call_id || c.configuration.jssip_id + k.createRandomToken(15), this.call_id = i, this.setHeader("call-id", i), m = d.cseq || Math.floor(1e4 * Math.random()), this.cseq = m, void this.setHeader("cseq", m + " " + a)) : null
				}
				function e() {
					this.data = null,
					this.headers = null,
					this.method = null,
					this.via = null,
					this.via_branch = null,
					this.call_id = null,
					this.cseq = null,
					this.from = null,
					this.from_tag = null,
					this.to = null,
					this.to_tag = null,
					this.body = null,
					this.sdp = null
				}
				function f(a) {
					this.ua = a,
					this.headers = {},
					this.ruri = null,
					this.transport = null,
					this.server_transaction = null
				}
				function g() {
					this.headers = {},
					this.status_code = null,
					this.reason_phrase = null
				}
				b.exports = {
					OutgoingRequest: d,
					IncomingRequest: f,
					IncomingResponse: g
				};
				var h = a("debug")("JsSIP:SIPMessage"),
				i = a("sdp-transform"),
				j = a("./Constants"),
				k = a("./Utils"),
				l = a("./NameAddrHeader"),
				m = a("./Grammar");
				d.prototype = {
					setHeader: function (a, b) {
						var c,
						d;
						for (c = new RegExp("^\\s*" + a + "\\s*:", "i"), d = 0; d < this.extraHeaders.length; d++)
							c.test(this.extraHeaders[d]) && this.extraHeaders.splice(d, 1);
						this.headers[k.headerize(a)] = Array.isArray(b) ? b : [b]
					},
					getHeader: function (a) {
						var b,
						c,
						d = this.extraHeaders.length,
						e = this.headers[k.headerize(a)];
						if (e) {
							if (e[0])
								return e[0]
						} else
							for (b = new RegExp("^\\s*" + a + "\\s*:", "i"), c = 0; c < d; c++)
								if (e = this.extraHeaders[c], b.test(e))
									return e.substring(e.indexOf(":") + 1).trim()
					},
					getHeaders: function (a) {
						var b,
						c,
						d,
						e = this.headers[k.headerize(a)],
						f = [];
						if (e) {
							for (c = e.length, b = 0; b < c; b++)
								f.push(e[b]);
							return f
						}
						for (c = this.extraHeaders.length, d = new RegExp("^\\s*" + a + "\\s*:", "i"), b = 0; b < c; b++)
							e = this.extraHeaders[b], d.test(e) && f.push(e.substring(e.indexOf(":") + 1).trim());
						return f
					},
					hasHeader: function (a) {
						var b,
						c,
						d = this.extraHeaders.length;
						if (this.headers[k.headerize(a)])
							return !0;
						for (b = new RegExp("^\\s*" + a + "\\s*:", "i"), c = 0; c < d; c++)
							if (b.test(this.extraHeaders[c]))
								return !0;
						return !1
					},
					parseSDP: function (a) {
						return !a && this.sdp ? this.sdp : (this.sdp = i.parse(this.body || ""), this.sdp)
					},
					toString: function () {
						var a,
						b,
						c,
						d = "",
						e = [];
						d += this.method + " " + this.ruri + " SIP/2.0\r\n";
						for (a in this.headers)
							for (b = this.headers[a].length, c = 0; c < b; c++)
								d += a + ": " + this.headers[a][c] + "\r\n";
						for (b = this.extraHeaders.length, c = 0; c < b; c++)
							d += this.extraHeaders[c].trim() + "\r\n";
						switch (this.method) {
						case j.REGISTER:
							e.push("path", "gruu");
							break;
						case j.INVITE:
							this.ua.configuration.session_timers && e.push("timer"),
							(this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) && e.push("gruu"),
							e.push("ice", "replaces");
							break;
						case j.UPDATE:
							this.ua.configuration.session_timers && e.push("timer"),
							e.push("ice")
						}
						return e.push("outbound"),
						d += "Allow: " + j.ALLOWED_METHODS + "\r\n",
						d += "Supported: " + e + "\r\n",
						d += "User-Agent: " + j.USER_AGENT + "\r\n",
						this.body ? (b = k.str_utf8_length(this.body), d += "Content-Length: " + b + "\r\n\r\n", d += this.body) : d += "Content-Length: 0\r\n\r\n",
						d
					},
					clone: function () {
						var a = new d(this.method, this.ruri, this.ua);
						return Object.keys(this.headers).forEach(function (b) {
							a.headers[b] = this.headers[b].slice()
						}, this),
						a.body = this.body,
						a.extraHeaders = this.extraHeaders && this.extraHeaders.slice() || [],
						a.to = this.to,
						a.from = this.from,
						a.call_id = this.call_id,
						a.cseq = this.cseq,
						a
					}
				},
				e.prototype = {
					addHeader: function (a, b) {
						var c = {
							raw: b
						};
						a = k.headerize(a),
						this.headers[a] ? this.headers[a].push(c) : this.headers[a] = [c]
					},
					getHeader: function (a) {
						var b = this.headers[k.headerize(a)];
						if (b)
							return b[0] ? b[0].raw : void 0
					},
					getHeaders: function (a) {
						var b,
						c,
						d = this.headers[k.headerize(a)],
						e = [];
						if (!d)
							return [];
						for (c = d.length, b = 0; b < c; b++)
							e.push(d[b].raw);
						return e
					},
					hasHeader: function (a) {
						return !!this.headers[k.headerize(a)]
					},
					parseHeader: function (a, b) {
						var c,
						d,
						e;
						return a = k.headerize(a),
						b = b || 0,
						this.headers[a] ? b >= this.headers[a].length ? void h('not so many "' + a + '" headers present') : (c = this.headers[a][b], d = c.raw, c.parsed ? c.parsed : (e = m.parse(d, a.replace(/-/g, "_")), e === -1 ? (this.headers[a].splice(b, 1), void h('error parsing "' + a + '" header field with value "' + d + '"')) : (c.parsed = e, e))) : void h('header "' + a + '" not present')
					},
					s: function (a, b) {
						return this.parseHeader(a, b)
					},
					setHeader: function (a, b) {
						var c = {
							raw: b
						};
						this.headers[k.headerize(a)] = [c]
					},
					parseSDP: function (a) {
						return !a && this.sdp ? this.sdp : (this.sdp = i.parse(this.body || ""), this.sdp)
					},
					toString: function () {
						return this.data
					}
				},
				f.prototype = new e,
				f.prototype.reply = function (a, b, c, d, e, f) {
					var g,
					h,
					i,
					l,
					m,
					n = [],
					o = this.getHeader("To"),
					p = 0,
					q = 0;
					if (a = a || null, b = b || null, !a || a < 100 || a > 699)
						throw new TypeError("Invalid status_code: " + a);
					if (b && "string" != typeof b && !(b instanceof String))
						throw new TypeError("Invalid reason_phrase: " + b);
					if (b = b || j.REASON_PHRASE[a] || "", c = c && c.slice() || [], m = "SIP/2.0 " + a + " " + b + "\r\n", this.method === j.INVITE && a > 100 && a <= 200)
						for (g = this.getHeaders("record-route"), i = g.length, p; p < i; p++)
							m += "Record-Route: " + g[p] + "\r\n";
					for (h = this.getHeaders("via"), i = h.length, q; q < i; q++)
						m += "Via: " + h[q] + "\r\n";
					for (!this.to_tag && a > 100 ? o += ";tag=" + k.newTag() : this.to_tag && !this.s("to").hasParam("tag") && (o += ";tag=" + this.to_tag), m += "To: " + o + "\r\n", m += "From: " + this.getHeader("From") + "\r\n", m += "Call-ID: " + this.call_id + "\r\n", m += "CSeq: " + this.cseq + " " + this.method + "\r\n", i = c.length, l = 0; l < i; l++)
						m += c[l].trim() + "\r\n";
					switch (this.method) {
					case j.INVITE:
						this.ua.configuration.session_timers && n.push("timer"),
						(this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) && n.push("gruu"),
						n.push("ice", "replaces");
						break;
					case j.UPDATE:
						this.ua.configuration.session_timers && n.push("timer"),
						d && n.push("ice"),
						n.push("replaces")
					}
					n.push("outbound"),
					this.method === j.OPTIONS ? (m += "Allow: " + j.ALLOWED_METHODS + "\r\n", m += "Accept: " + j.ACCEPTED_BODY_TYPES + "\r\n") : 405 === a ? m += "Allow: " + j.ALLOWED_METHODS + "\r\n" : 415 === a && (m += "Accept: " + j.ACCEPTED_BODY_TYPES + "\r\n"),
					m += "Supported: " + n + "\r\n",
					d ? (i = k.str_utf8_length(d), m += "Content-Type: application/sdp\r\n", m += "Content-Length: " + i + "\r\n\r\n", m += d) : m += "Content-Length: 0\r\n\r\n",
					this.server_transaction.receiveResponse(a, m, e, f)
				},
				f.prototype.reply_sl = function (a, b) {
					var c,
					d,
					e = 0,
					f = this.getHeaders("via"),
					g = f.length;
					if (a = a || null, b = b || null, !a || a < 100 || a > 699)
						throw new TypeError("Invalid status_code: " + a);
					if (b && "string" != typeof b && !(b instanceof String))
						throw new TypeError("Invalid reason_phrase: " + b);
					for (b = b || j.REASON_PHRASE[a] || "", d = "SIP/2.0 " + a + " " + b + "\r\n", e; e < g; e++)
						d += "Via: " + f[e] + "\r\n";
					c = this.getHeader("To"),
					!this.to_tag && a > 100 ? c += ";tag=" + k.newTag() : this.to_tag && !this.s("to").hasParam("tag") && (c += ";tag=" + this.to_tag),
					d += "To: " + c + "\r\n",
					d += "From: " + this.getHeader("From") + "\r\n",
					d += "Call-ID: " + this.call_id + "\r\n",
					d += "CSeq: " + this.cseq + " " + this.method + "\r\n",
					d += "Content-Length: 0\r\n\r\n",
					this.transport.send(d)
				},
				g.prototype = new e
			}, {
				"./Constants": 1,
				"./Grammar": 6,
				"./NameAddrHeader": 9,
				"./Utils": 25,
				debug: 33,
				"sdp-transform": 44
			}
		],
		19: [function (a, b, c) {
				function d() {}
				b.exports = d;
				var e = a("./Utils"),
				f = a("./Grammar"),
				g = a("debug")("JsSIP:ERROR:Socket");
				d.isSocket = function (a) {
					if ("undefined" == typeof a)
						return g("undefined JsSIP.Socket instance"), !1;
					try {
						if (!e.isString(a.url))
							throw g("missing or invalid JsSIP.Socket url property"), new Error;
						if (!e.isString(a.via_transport))
							throw g("missing or invalid JsSIP.Socket via_transport property"), new Error;
						if (f.parse(a.sip_uri, "SIP_URI") === -1)
							throw g("missing or invalid JsSIP.Socket sip_uri property"), new Error
					} catch (b) {
						return !1
					}
					try {
						["connect", "disconnect", "send"].forEach(function (b) {
							if (!e.isFunction(a[b]))
								throw g("missing or invalid JsSIP.Socket method: " + b), new Error
						})
					} catch (b) {
						return !1
					}
					return !0
				}
			}, {
				"./Grammar": 6,
				"./Utils": 25,
				debug: 33
			}
		],
		20: [function (a, b, c) {
				var d = 500,
				e = 4e3,
				f = 5e3,
				g = {
					T1: d,
					T2: e,
					T4: f,
					TIMER_B: 64 * d,
					TIMER_D: 0 * d,
					TIMER_F: 64 * d,
					TIMER_H: 64 * d,
					TIMER_I: 0 * d,
					TIMER_J: 0 * d,
					TIMER_K: 0 * f,
					TIMER_L: 64 * d,
					TIMER_M: 64 * d,
					PROVISIONAL_RESPONSE_INTERVAL: 6e4
				};
				b.exports = g
			}, {}
		],
		21: [function (a, b, c) {
				function d(a, b, c) {
					var d;
					this.type = j.NON_INVITE_CLIENT,
					this.transport = c,
					this.id = "z9hG4bK" + Math.floor(1e7 * Math.random()),
					this.request_sender = a,
					this.request = b,
					d = "SIP/2.0/" + c.via_transport,
					d += " " + a.ua.configuration.via_host + ";branch=" + this.id,
					this.request.setHeader("via", d),
					this.request_sender.ua.newTransaction(this),
					l.EventEmitter.call(this)
				}
				function e(a, b, c) {
					var d,
					e = this;
					this.type = j.INVITE_CLIENT,
					this.transport = c,
					this.id = "z9hG4bK" + Math.floor(1e7 * Math.random()),
					this.request_sender = a,
					this.request = b,
					d = "SIP/2.0/" + c.via_transport,
					d += " " + a.ua.configuration.via_host + ";branch=" + this.id,
					this.request.setHeader("via", d),
					this.request_sender.ua.newTransaction(this),
					this.request.cancel = function (a) {
						e.cancel_request(e, a)
					},
					l.EventEmitter.call(this)
				}
				function f(a, b, c) {
					var d;
					this.transport = c,
					this.id = "z9hG4bK" + Math.floor(1e7 * Math.random()),
					this.request_sender = a,
					this.request = b,
					d = "SIP/2.0/" + c.via_transport,
					d += " " + a.ua.configuration.via_host + ";branch=" + this.id,
					this.request.setHeader("via", d),
					l.EventEmitter.call(this)
				}
				function g(a, b) {
					this.type = j.NON_INVITE_SERVER,
					this.id = a.via_branch,
					this.request = a,
					this.transport = a.transport,
					this.ua = b,
					this.last_response = "",
					a.server_transaction = this,
					this.state = j.STATUS_TRYING,
					b.newTransaction(this),
					l.EventEmitter.call(this)
				}
				function h(a, b) {
					this.type = j.INVITE_SERVER,
					this.id = a.via_branch,
					this.request = a,
					this.transport = a.transport,
					this.ua = b,
					this.last_response = "",
					a.server_transaction = this,
					this.state = j.STATUS_PROCEEDING,
					b.newTransaction(this),
					this.resendProvisionalTimer = null,
					a.reply(100),
					l.EventEmitter.call(this)
				}
				function i(a, b) {
					var c;
					switch (b.method) {
					case r.INVITE:
						if (c = a.transactions.ist[b.via_branch]) {
							switch (c.state) {
							case j.STATUS_PROCEEDING:
								c.transport.send(c.last_response);
								break;
							case j.STATUS_ACCEPTED:
							}
							return !0
						}
						break;
					case r.ACK:
						if (c = a.transactions.ist[b.via_branch], !c)
							return !1;
						if (c.state === j.STATUS_ACCEPTED)
							return !1;
						if (c.state === j.STATUS_COMPLETED)
							return c.state = j.STATUS_CONFIRMED, c.I = setTimeout(function () {
									c.timer_I()
								}, s.TIMER_I), !0;
						break;
					case r.CANCEL:
						return c = a.transactions.ist[b.via_branch],
						c ? (b.reply_sl(200), c.state !== j.STATUS_PROCEEDING) : (b.reply_sl(481), !0);
					default:
						if (c = a.transactions.nist[b.via_branch]) {
							switch (c.state) {
							case j.STATUS_TRYING:
								break;
							case j.STATUS_PROCEEDING:
							case j.STATUS_COMPLETED:
								c.transport.send(c.last_response)
							}
							return !0
						}
					}
				}
				b.exports = {
					C: null,
					NonInviteClientTransaction: d,
					InviteClientTransaction: e,
					AckClientTransaction: f,
					NonInviteServerTransaction: g,
					InviteServerTransaction: h,
					checkTransaction: i
				};
				var j = {
					STATUS_TRYING: 1,
					STATUS_PROCEEDING: 2,
					STATUS_CALLING: 3,
					STATUS_ACCEPTED: 4,
					STATUS_COMPLETED: 5,
					STATUS_TERMINATED: 6,
					STATUS_CONFIRMED: 7,
					NON_INVITE_CLIENT: "nict",
					NON_INVITE_SERVER: "nist",
					INVITE_CLIENT: "ict",
					INVITE_SERVER: "ist"
				};
				b.exports.C = j;
				var k = a("util"),
				l = a("events"),
				m = a("debug")("JsSIP:NonInviteClientTransaction"),
				n = a("debug")("JsSIP:InviteClientTransaction"),
				o = a("debug")("JsSIP:AckClientTransaction"),
				p = a("debug")("JsSIP:NonInviteServerTransaction"),
				q = a("debug")("JsSIP:InviteServerTransaction"),
				r = a("./Constants"),
				s = a("./Timers");
				k.inherits(d, l.EventEmitter),
				d.prototype.stateChanged = function (a) {
					this.state = a,
					this.emit("stateChanged")
				},
				d.prototype.send = function () {
					var a = this;
					this.stateChanged(j.STATUS_TRYING),
					this.F = setTimeout(function () {
							a.timer_F()
						}, s.TIMER_F),
					this.transport.send(this.request) || this.onTransportError()
				},
				d.prototype.onTransportError = function () {
					m("transport error occurred, deleting transaction " + this.id),
					clearTimeout(this.F),
					clearTimeout(this.K),
					this.stateChanged(j.STATUS_TERMINATED),
					this.request_sender.ua.destroyTransaction(this),
					this.request_sender.onTransportError()
				},
				d.prototype.timer_F = function () {
					m("Timer F expired for transaction " + this.id),
					this.stateChanged(j.STATUS_TERMINATED),
					this.request_sender.ua.destroyTransaction(this),
					this.request_sender.onRequestTimeout()
				},
				d.prototype.timer_K = function () {
					this.stateChanged(j.STATUS_TERMINATED),
					this.request_sender.ua.destroyTransaction(this)
				},
				d.prototype.receiveResponse = function (a) {
					var b = this,
					c = a.status_code;
					if (c < 200)
						switch (this.state) {
						case j.STATUS_TRYING:
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_PROCEEDING),
							this.request_sender.receiveResponse(a)
						}
					else
						switch (this.state) {
						case j.STATUS_TRYING:
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_COMPLETED),
							clearTimeout(this.F),
							408 === c ? this.request_sender.onRequestTimeout() : this.request_sender.receiveResponse(a),
							this.K = setTimeout(function () {
									b.timer_K()
								}, s.TIMER_K);
							break;
						case j.STATUS_COMPLETED:
						}
				},
				k.inherits(e, l.EventEmitter),
				e.prototype.stateChanged = function (a) {
					this.state = a,
					this.emit("stateChanged")
				},
				e.prototype.send = function () {
					var a = this;
					this.stateChanged(j.STATUS_CALLING),
					this.B = setTimeout(function () {
							a.timer_B()
						}, s.TIMER_B),
					this.transport.send(this.request) || this.onTransportError()
				},
				e.prototype.onTransportError = function () {
					clearTimeout(this.B),
					clearTimeout(this.D),
					clearTimeout(this.M),
					this.state !== j.STATUS_ACCEPTED && (n("transport error occurred, deleting transaction " + this.id), this.request_sender.onTransportError()),
					this.stateChanged(j.STATUS_TERMINATED),
					this.request_sender.ua.destroyTransaction(this)
				},
				e.prototype.timer_M = function () {
					n("Timer M expired for transaction " + this.id),
					this.state === j.STATUS_ACCEPTED && (clearTimeout(this.B), this.stateChanged(j.STATUS_TERMINATED), this.request_sender.ua.destroyTransaction(this))
				},
				e.prototype.timer_B = function () {
					n("Timer B expired for transaction " + this.id),
					this.state === j.STATUS_CALLING && (this.stateChanged(j.STATUS_TERMINATED), this.request_sender.ua.destroyTransaction(this), this.request_sender.onRequestTimeout())
				},
				e.prototype.timer_D = function () {
					n("Timer D expired for transaction " + this.id),
					clearTimeout(this.B),
					this.stateChanged(j.STATUS_TERMINATED),
					this.request_sender.ua.destroyTransaction(this)
				},
				e.prototype.sendACK = function (a) {
					var b = this;
					this.ack = "ACK " + this.request.ruri + " SIP/2.0\r\n",
					this.ack += "Via: " + this.request.headers.Via.toString() + "\r\n",
					this.request.headers.Route && (this.ack += "Route: " + this.request.headers.Route.toString() + "\r\n"),
					this.ack += "To: " + a.getHeader("to") + "\r\n",
					this.ack += "From: " + this.request.headers.From.toString() + "\r\n",
					this.ack += "Call-ID: " + this.request.headers["Call-ID"].toString() + "\r\n",
					this.ack += "CSeq: " + this.request.headers.CSeq.toString().split(" ")[0],
					this.ack += " ACK\r\n",
					this.ack += "Content-Length: 0\r\n\r\n",
					this.D = setTimeout(function () {
							b.timer_D()
						}, s.TIMER_D),
					this.transport.send(this.ack)
				},
				e.prototype.cancel_request = function (a, b) {
					var c = a.request;
					this.cancel = r.CANCEL + " " + c.ruri + " SIP/2.0\r\n",
					this.cancel += "Via: " + c.headers.Via.toString() + "\r\n",
					this.request.headers.Route && (this.cancel += "Route: " + c.headers.Route.toString() + "\r\n"),
					this.cancel += "To: " + c.headers.To.toString() + "\r\n",
					this.cancel += "From: " + c.headers.From.toString() + "\r\n",
					this.cancel += "Call-ID: " + c.headers["Call-ID"].toString() + "\r\n",
					this.cancel += "CSeq: " + c.headers.CSeq.toString().split(" ")[0] + " CANCEL\r\n",
					b && (this.cancel += "Reason: " + b + "\r\n"),
					this.cancel += "Content-Length: 0\r\n\r\n",
					this.state === j.STATUS_PROCEEDING && this.transport.send(this.cancel)
				},
				e.prototype.receiveResponse = function (a) {
					var b = this,
					c = a.status_code;
					if (c >= 100 && c <= 199)
						switch (this.state) {
						case j.STATUS_CALLING:
							this.stateChanged(j.STATUS_PROCEEDING),
							this.request_sender.receiveResponse(a);
							break;
						case j.STATUS_PROCEEDING:
							this.request_sender.receiveResponse(a)
						}
					else if (c >= 200 && c <= 299)
						switch (this.state) {
						case j.STATUS_CALLING:
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_ACCEPTED),
							this.M = setTimeout(function () {
									b.timer_M()
								}, s.TIMER_M),
							this.request_sender.receiveResponse(a);
							break;
						case j.STATUS_ACCEPTED:
							this.request_sender.receiveResponse(a)
						}
					else if (c >= 300 && c <= 699)
						switch (this.state) {
						case j.STATUS_CALLING:
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_COMPLETED),
							this.sendACK(a),
							this.request_sender.receiveResponse(a);
							break;
						case j.STATUS_COMPLETED:
							this.sendACK(a)
						}
				},
				k.inherits(f, l.EventEmitter),
				f.prototype.send = function () {
					this.transport.send(this.request) || this.onTransportError()
				},
				f.prototype.onTransportError = function () {
					o("transport error occurred for transaction " + this.id),
					this.request_sender.onTransportError()
				},
				k.inherits(g, l.EventEmitter),
				g.prototype.stateChanged = function (a) {
					this.state = a,
					this.emit("stateChanged")
				},
				g.prototype.timer_J = function () {
					p("Timer J expired for transaction " + this.id),
					this.stateChanged(j.STATUS_TERMINATED),
					this.ua.destroyTransaction(this)
				},
				g.prototype.onTransportError = function () {
					this.transportError || (this.transportError = !0, p("transport error occurred, deleting transaction " + this.id), clearTimeout(this.J), this.stateChanged(j.STATUS_TERMINATED), this.ua.destroyTransaction(this))
				},
				g.prototype.receiveResponse = function (a, b, c, d) {
					var e = this;
					if (100 === a)
						switch (this.state) {
						case j.STATUS_TRYING:
							this.stateChanged(j.STATUS_PROCEEDING),
							this.transport.send(b) || this.onTransportError();
							break;
						case j.STATUS_PROCEEDING:
							this.last_response = b,
							this.transport.send(b) ? c && c() : (this.onTransportError(), d && d())
						}
					else if (a >= 200 && a <= 699)
						switch (this.state) {
						case j.STATUS_TRYING:
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_COMPLETED),
							this.last_response = b,
							this.J = setTimeout(function () {
									e.timer_J()
								}, s.TIMER_J),
							this.transport.send(b) ? c && c() : (this.onTransportError(), d && d());
							break;
						case j.STATUS_COMPLETED:
						}
				},
				k.inherits(h, l.EventEmitter),
				h.prototype.stateChanged = function (a) {
					this.state = a,
					this.emit("stateChanged")
				},
				h.prototype.timer_H = function () {
					q("Timer H expired for transaction " + this.id),
					this.state === j.STATUS_COMPLETED && q("ACK not received, dialog will be terminated"),
					this.stateChanged(j.STATUS_TERMINATED),
					this.ua.destroyTransaction(this)
				},
				h.prototype.timer_I = function () {
					this.stateChanged(j.STATUS_TERMINATED)
				},
				h.prototype.timer_L = function () {
					q("Timer L expired for transaction " + this.id),
					this.state === j.STATUS_ACCEPTED && (this.stateChanged(j.STATUS_TERMINATED), this.ua.destroyTransaction(this))
				},
				h.prototype.onTransportError = function () {
					this.transportError || (this.transportError = !0, q("transport error occurred, deleting transaction " + this.id), null !== this.resendProvisionalTimer && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null), clearTimeout(this.L), clearTimeout(this.H), clearTimeout(this.I), this.stateChanged(j.STATUS_TERMINATED), this.ua.destroyTransaction(this))
				},
				h.prototype.resend_provisional = function () {
					this.transport.send(this.last_response) || this.onTransportError()
				},
				h.prototype.receiveResponse = function (a, b, c, d) {
					var e = this;
					if (a >= 100 && a <= 199)
						switch (this.state) {
						case j.STATUS_PROCEEDING:
							this.transport.send(b) || this.onTransportError(),
							this.last_response = b
						}
					if (a > 100 && a <= 199 && this.state === j.STATUS_PROCEEDING)
						null === this.resendProvisionalTimer && (this.resendProvisionalTimer = setInterval(function () {
									e.resend_provisional()
								}, s.PROVISIONAL_RESPONSE_INTERVAL));
					else if (a >= 200 && a <= 299)
						switch (this.state) {
						case j.STATUS_PROCEEDING:
							this.stateChanged(j.STATUS_ACCEPTED),
							this.last_response = b,
							this.L = setTimeout(function () {
									e.timer_L()
								}, s.TIMER_L),
							null !== this.resendProvisionalTimer && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null);
						case j.STATUS_ACCEPTED:
							this.transport.send(b) ? c && c() : (this.onTransportError(), d && d())
						}
					else if (a >= 300 && a <= 699)
						switch (this.state) {
						case j.STATUS_PROCEEDING:
							null !== this.resendProvisionalTimer && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null),
							this.transport.send(b) ? (this.stateChanged(j.STATUS_COMPLETED), this.H = setTimeout(function () {
										e.timer_H()
									}, s.TIMER_H), c && c()) : (this.onTransportError(), d && d())
						}
				}
			}, {
				"./Constants": 1,
				"./Timers": 20,
				debug: 33,
				events: 28,
				util: 32
			}
		],
		22: [function (a, b, c) {
				function d(a, b) {
					if (k("new()"), this.status = m.STATUS_DISCONNECTED, this.socket = null, this.sockets = [], this.recovery_options = b || m.recovery_options, this.recover_attempts = 0, this.recovery_timer = null, this.close_requested = !1, "undefined" == typeof a)
						throw new TypeError("Invalid argument. undefined 'sockets' argument");
					a instanceof Array || (a = [a]),
					a.forEach(function (a) {
						if (!j.isSocket(a.socket))
							throw new TypeError("Invalid argument. invalid 'JsSIP.Socket' instance");
						if (a.weight && !Number(a.weight))
							throw new TypeError("Invalid argument. 'weight' attribute is not a number");
						this.sockets.push({
							socket: a.socket,
							weight: a.weight || 0,
							status: m.SOCKET_STATUS_READY
						})
					}, this),
					Object.defineProperties(this, {
						via_transport: {
							get: function () {
								return this.socket.via_transport
							}
						},
						url: {
							get: function () {
								return this.socket.url
							}
						},
						sip_uri: {
							get: function () {
								return this.socket.sip_uri
							}
						}
					}),
					i.call(this)
				}
				function e() {
					this.recover_attempts = 0,
					this.status = m.STATUS_CONNECTED,
					null !== this.recovery_timer && (clearTimeout(this.recovery_timer), this.recovery_timer = null),
					this.onconnect({
						socket: this
					})
				}
				function f(a, b, c) {
					this.status = m.STATUS_DISCONNECTED,
					this.ondisconnect({
						socket: this.socket,
						error: a,
						code: b,
						reason: c
					}),
					this.close_requested || (a && (this.socket.status = m.SOCKET_STATUS_ERROR), h.call(this, a))
				}
				function g(a) {
					if ("\r\n" === a)
						return void k("received message with CRLF Keep Alive response");
					if ("string" != typeof a) {
						try {
							a = String.fromCharCode.apply(null, new Uint8Array(a))
						} catch (b) {
							return void k("received binary message failed to be converted into string, message discarded")
						}
						k("received binary message:\n\n" + a + "\n")
					} else
						k("received text message:\n\n" + a + "\n");
					this.ondata({
						transport: this,
						message: a
					})
				}
				function h() {
					var a,
					b = this;
					this.recover_attempts += 1,
					a = Math.floor(Math.random() * Math.pow(2, this.recover_attempts) + 1),
					a < this.recovery_options.min_interval ? a = this.recovery_options.min_interval : a > this.recovery_options.max_interval && (a = this.recovery_options.max_interval),
					k("reconnection attempt: " + this.recover_attempts + ". next connection attempt in " + a + " seconds"),
					this.recovery_timer = setTimeout(function () {
							b.close_requested || b.isConnected() || b.isConnecting() || (i.call(b), b.connect())
						}, 1e3 * a)
				}
				function i() {
					var a = [];
					if (this.sockets.forEach(function (b) {
							b.status !== m.SOCKET_STATUS_ERROR && (0 === a.length ? a.push(b) : b.weight > a[0].weight ? a = [b] : b.weight === a[0].weight && a.push(b))
						}), 0 === a.length)
						return this.sockets.forEach(function (a) {
							a.status = m.SOCKET_STATUS_READY
						}), void i.call(this);
					var b = Math.floor(Math.random() * a.length);
					this.socket = a[b].socket
				}
				b.exports = d;
				var j = a("./Socket"),
				k = a("debug")("JsSIP:Transport"),
				l = a("debug")("JsSIP:ERROR:Transport"),
				m = {
					STATUS_CONNECTED: 0,
					STATUS_CONNECTING: 1,
					STATUS_DISCONNECTED: 2,
					SOCKET_STATUS_READY: 0,
					SOCKET_STATUS_ERROR: 1,
					recovery_options: {
						min_interval: 2,
						max_interval: 30
					}
				};
				d.prototype.connect = function () {
					return k("connect()"),
					this.isConnected() ? void k("Transport is already connected") : this.isConnecting() ? void k("Transport is connecting") : (this.close_requested = !1, this.status = m.STATUS_CONNECTING, this.onconnecting({
							socket: this.socket,
							attempts: this.recover_attempts
						}), void(this.close_requested || (this.socket.onconnect = e.bind(this), this.socket.ondisconnect = f.bind(this), this.socket.ondata = g.bind(this), this.socket.connect())))
				},
				d.prototype.disconnect = function () {
					k("close()"),
					this.close_requested = !0,
					this.recover_attempts = 0,
					this.status = m.STATUS_DISCONNECTED,
					null !== this.recovery_timer && (clearTimeout(this.recovery_timer), this.recovery_timer = null),
					this.socket.onconnect = function () {},
					this.socket.ondisconnect = function () {},
					this.socket.ondata = function () {},
					this.socket.disconnect(),
					this.ondisconnect()
				},
				d.prototype.send = function (a) {
					if (k("send()"), !this.isConnected())
						return l("unable to send message, transport is not connected"), !1;
					var b = a.toString();
					return k("sending message:\n\n" + b + "\n"),
					this.socket.send(b)
				},
				d.prototype.isConnected = function () {
					return this.status === m.STATUS_CONNECTED
				},
				d.prototype.isConnecting = function () {
					return this.status === m.STATUS_CONNECTING
				}
			}, {
				"./Socket": 19,
				debug: 33
			}
		],
		23: [function (a, b, c) {
				function d(a) {
					if (this.cache = {
							credentials: {}
						}, this.configuration = {}, this.dynConfiguration = {}, this.dialogs = {}, this.applicants = {}, this.sessions = {}, this.transport = null, this.contact = null, this.status = i.STATUS_INIT, this.error = null, this.transactions = {
							nist: {},
							nict: {},
							ist: {},
							ict: {}
						}, this.data = {}, Object.defineProperties(this, {
							transactionsCount: {
								get: function () {
									var a,
									b = ["nist", "nict", "ist", "ict"],
									c = 0;
									for (a in b)
										c += Object.keys(this.transactions[b[a]])
											.length;
										return c
									}
								},
								nictTransactionsCount: {
									get: function () {
										return Object.keys(this.transactions.nict).length
									}
								},
								nistTransactionsCount: {
									get: function () {
										return Object.keys(this.transactions.nist).length
									}
								},
								ictTransactionsCount: {
									get: function () {
										return Object.keys(this.transactions.ict).length
									}
								},
								istTransactionsCount: {
									get: function () {
										return Object.keys(this.transactions.ist).length
									}
								}
							}), void 0 === a)throw new TypeError("Not enough arguments");
					try {
						this.loadConfig(a)
					} catch (b) {
						throw this.status = i.STATUS_NOT_READY,
						this.error = i.CONFIGURATION_ERROR,
						b
					}
					this._registrator = new p(this),
					k.EventEmitter.call(this),
					n.called || n()
				}
				function e(a) {
					this.emit("connecting", a)
				}
				function f(a) {
					this.status !== i.STATUS_USER_CLOSED && (this.status = i.STATUS_READY, this.error = null, this.emit("connected", a), this.dynConfiguration.register && this._registrator.register())
				}
				function g(a) {
					var b,
					c,
					d,
					e = ["nict", "ict", "nist", "ist"];
					for (d = e.length, b = 0; b < d; b++)
						for (c in this.transactions[e[b]])
							this.transactions[e[b]][c].onTransportError();
					this.emit("disconnected", a),
					this._registrator.onTransportClosed(),
					this.status !== i.STATUS_USER_CLOSED && (this.status = i.STATUS_NOT_READY, this.error = i.NETWORK_ERROR)
				}
				function h(a) {
					var b,
					c = a.transport,
					e = a.message;
					if (e = A.parseMessage(e, this), e && !(this.status === d.C.STATUS_USER_CLOSED && e instanceof B.IncomingRequest) && C(e, this, c))
						if (e instanceof B.IncomingRequest)
							e.transport = c, this.receiveRequest(e);
						else if (e instanceof B.IncomingResponse)
							switch (e.method) {
							case o.INVITE:
								b = this.transactions.ict[e.via_branch],
								b && b.receiveResponse(e);
								break;
							case o.ACK:
								break;
							default:
								b = this.transactions.nict[e.via_branch],
								b && b.receiveResponse(e)
							}
				}
				b.exports = d;
				var i = {
					STATUS_INIT: 0,
					STATUS_READY: 1,
					STATUS_USER_CLOSED: 2,
					STATUS_NOT_READY: 3,
					CONFIGURATION_ERROR: 1,
					NETWORK_ERROR: 2
				};
				d.C = i;
				var j = a("util"),
				k = a("events"),
				l = a("debug")("JsSIP:UA"),
				m = a("debug")("JsSIP:ERROR:UA");
				m.log = console.warn.bind(console);
				var n = a("rtcninja"),
				o = a("./Constants"),
				p = a("./Registrator"),
				q = a("./RTCSession"),
				r = a("./Message"),
				s = a("./Transactions"),
				t = a("./Transport"),
				u = a("./WebSocketInterface"),
				v = a("./Socket"),
				w = a("./Utils"),
				x = a("./Exceptions"),
				y = a("./URI"),
				z = a("./Grammar"),
				A = a("./Parser"),
				B = a("./SIPMessage"),
				C = a("./sanityCheck");
				j.inherits(d, k.EventEmitter),
				d.prototype.start = function () {
					function a() {
						l("restarting UA"),
						b.status = i.STATUS_READY,
						b.transport.connect()
					}
					l("start()");
					var b = this;
					this.status === i.STATUS_INIT ? this.transport.connect() : this.status === i.STATUS_USER_CLOSED ? this.isConnected() ? this.once("disconnected", a) : a() : l(this.status === i.STATUS_READY ? "UA is in READY status, not restarted" : "ERROR: connection is down, Auto-Recovery system is trying to reconnect"),
					this.dynConfiguration.register = this.configuration.register
				},
				d.prototype.register = function () {
					l("register()"),
					this.dynConfiguration.register = !0,
					this._registrator.register()
				},
				d.prototype.unregister = function (a) {
					l("unregister()"),
					this.dynConfiguration.register = !1,
					this._registrator.unregister(a)
				},
				d.prototype.registrator = function () {
					return this._registrator
				},
				d.prototype.isRegistered = function () {
					return !!this._registrator.registered
				},
				d.prototype.isConnected = function () {
					return this.transport.isConnected()
				},
				d.prototype.call = function (a, b) {
					l("call()");
					var c;
					return c = new q(this),
					c.connect(a, b),
					c
				},
				d.prototype.sendMessage = function (a, b, c) {
					l("sendMessage()");
					var d;
					return d = new r(this),
					d.send(a, b, c),
					d
				},
				d.prototype.terminateSessions = function (a) {
					l("terminateSessions()");
					for (var b in this.sessions)
						this.sessions[b].isEnded() || this.sessions[b].terminate(a)
				},
				d.prototype.stop = function () {
					l("stop()");
					var a,
					b,
					c,
					d = this;
					if (this.dynConfiguration = {}, this.status === i.STATUS_USER_CLOSED)
						return void l("UA already closed");
					this._registrator.close(),
					c = Object.keys(this.sessions).length;
					for (a in this.sessions) {
						l("closing session " + a);
						try {
							this.sessions[a].terminate()
						} catch (e) {}
					}
					for (b in this.applicants)
						try {
							this.applicants[b].close()
						} catch (e) {}
					this.status = i.STATUS_USER_CLOSED,
					0 === this.nistTransactionsCount && 0 === this.nictTransactionsCount && 0 === this.ictTransactionsCount && 0 === this.istTransactionsCount && 0 === c ? d.transport.disconnect() : setTimeout(function () {
						d.transport.disconnect()
					}, 2e3)
				},
				d.prototype.normalizeTarget = function (a) {
					return w.normalizeTarget(a, this.configuration.hostport_params)
				},
				d.prototype.get = function (a) {
					switch (a) {
					case "realm":
						return this.configuration.realm;
					case "ha1":
						return this.configuration.ha1;
					default:
						return void m('get() | cannot get "%s" parameter in runtime', a)
					}
					return !0
				},
				d.prototype.set = function (a, b) {
					switch (a) {
					case "password":
						this.configuration.password = String(b);
						break;
					case "realm":
						this.configuration.realm = String(b);
						break;
					case "ha1":
						this.configuration.ha1 = String(b),
						this.configuration.password = null;
						break;
					case "display_name":
						if (z.parse('"' + b + '"', "display_name") === -1)
							return m('set() | wrong "display_name"'), !1;
						this.configuration.display_name = b;
						break;
					default:
						return m('set() | cannot set "%s" parameter in runtime', a),
						!1
					}
					return !0
				},
				d.prototype.newTransaction = function (a) {
					this.transactions[a.type][a.id] = a,
					this.emit("newTransaction", {
						transaction: a
					})
				},
				d.prototype.destroyTransaction = function (a) {
					delete this.transactions[a.type][a.id],
					this.emit("transactionDestroyed", {
						transaction: a
					})
				},
				d.prototype.newMessage = function (a) {
					this.emit("newMessage", a)
				},
				d.prototype.newRTCSession = function (a) {
					this.emit("newRTCSession", a)
				},
				d.prototype.registered = function (a) {
					this.emit("registered", a)
				},
				d.prototype.unregistered = function (a) {
					this.emit("unregistered", a)
				},
				d.prototype.registrationFailed = function (a) {
					this.emit("registrationFailed", a)
				},
				d.prototype.receiveRequest = function (a) {
					var b,
					c,
					d,
					e,
					f = a.method;
					if (a.ruri.user !== this.configuration.uri.user && a.ruri.user !== this.contact.uri.user)
						return l("Request-URI does not point to us"), void(a.method !== o.ACK && a.reply_sl(404));
					if (a.ruri.scheme === o.SIPS)
						return void a.reply_sl(416);
					if (!s.checkTransaction(this, a)) {
						if (f === o.INVITE ? new s.InviteServerTransaction(a, this) : f !== o.ACK && f !== o.CANCEL && new s.NonInviteServerTransaction(a, this), f === o.OPTIONS)
							a.reply(200);
						else if (f === o.MESSAGE) {
							if (0 === this.listeners("newMessage").length)
								return void a.reply(405);
							d = new r(this),
							d.init_incoming(a)
						} else if (f === o.INVITE && !a.to_tag && 0 === this.listeners("newRTCSession").length)
							return void a.reply(405);
						if (a.to_tag)
							b = this.findDialog(a.call_id, a.from_tag, a.to_tag), b ? b.receiveRequest(a) : f === o.NOTIFY ? (c = this.findSession(a), c ? c.receiveRequest(a) : (l("received NOTIFY request for a non existent subscription"), a.reply(481, "Subscription does not exist"))) : f !== o.ACK && a.reply(481);
						else
							switch (f) {
							case o.INVITE:
								n.hasWebRTC() ? a.hasHeader("replaces") ? (e = a.replaces, b = this.findDialog(e.call_id, e.from_tag, e.to_tag), b ? (c = b.owner, c.isEnded() ? a.reply(603) : c.receiveRequest(a)) : a.reply(481)) : (c = new q(this), c.init_incoming(a)) : (l("INVITE received but WebRTC is not supported"), a.reply(488));
								break;
							case o.BYE:
								a.reply(481);
								break;
							case o.CANCEL:
								c = this.findSession(a),
								c ? c.receiveRequest(a) : l("received CANCEL request for a non existent session");
								break;
							case o.ACK:
								break;
							default:
								a.reply(405)
							}
					}
				},
				d.prototype.findSession = function (a) {
					var b = a.call_id + a.from_tag,
					c = this.sessions[b],
					d = a.call_id + a.to_tag,
					e = this.sessions[d];
					return c ? c : e ? e : null
				},
				d.prototype.findDialog = function (a, b, c) {
					var d = a + b + c,
					e = this.dialogs[d];
					return e ? e : (d = a + c + b, e = this.dialogs[d], e ? e : null)
				},
				d.prototype.loadConfig = function (a) {
					var b,
					c,
					i,
					j,
					k,
					n = {
						via_host: w.createRandomToken(12) + ".invalid",
						contact_uri: null,
						password: null,
						realm: null,
						ha1: null,
						register_expires: 600,
						register: !0,
						registrar_server: null,
						use_preloaded_route: !1,
						no_answer_timeout: 60,
						session_timers: !0
					};
					for (b in d.configuration_check.mandatory) {
						if (!a.hasOwnProperty(b))
							throw new x.ConfigurationError(b);
						if (c = a[b], i = d.configuration_check.mandatory[b].call(this, c), void 0 === i)
							throw new x.ConfigurationError(b, c);
						n[b] = i
					}
					for (b in d.configuration_check.optional)
						if (a.hasOwnProperty(b)) {
							if (c = a[b], w.isEmpty(c))
								continue;
							if (i = d.configuration_check.optional[b].call(this, c, a), void 0 === i)
								throw new x.ConfigurationError(b, c);
							n[b] = i
						}
					0 === n.display_name && (n.display_name = "0"),
					n.instance_id || (n.instance_id = w.newUUID()),
					n.jssip_id = w.createRandomToken(5),
					j = n.uri.clone(),
					j.user = null,
					n.hostport_params = j.toString().replace(/^sip:/i, "");
					var o = [];
					if (n.ws_servers && Array.isArray(n.ws_servers) && (o = o.concat(n.ws_servers)), n.sockets && Array.isArray(n.sockets) && (o = o.concat(n.sockets)), 0 === o.length)
						throw new x.ConfigurationError("sockets");
					try {
						this.transport = new t(o, {
								max_interval: n.connection_recovery_max_interval,
								min_interval: n.connection_recovery_min_interval
							}),
						this.transport.onconnecting = e.bind(this),
						this.transport.onconnect = f.bind(this),
						this.transport.ondisconnect = g.bind(this),
						this.transport.ondata = h.bind(this),
						delete n.connection_recovery_max_interval,
						delete n.connection_recovery_min_interval,
						delete n.ws_servers,
						delete n.sockets
					} catch (p) {
						throw m(p),
						new x.ConfigurationError("sockets", o)
					}
					n.authorization_user || (n.authorization_user = n.uri.user),
					n.registrar_server || (k = n.uri.clone(), k.user = null, k.clearParams(), k.clearHeaders(), n.registrar_server = k),
					n.no_answer_timeout = 1e3 * n.no_answer_timeout,
					n.contact_uri ? n.via_host = n.contact_uri.host : n.contact_uri = new y("sip", w.createRandomToken(8), n.via_host, null, {
							transport: "ws"
						}),
					this.contact = {
						pub_gruu: null,
						temp_gruu: null,
						uri: n.contact_uri,
						toString: function (a) {
							a = a || {};
							var b = a.anonymous || null,
							c = a.outbound || null,
							d = "<";
							return d += b ? this.temp_gruu || "sip:anonymous@anonymous.invalid;transport=ws" : this.pub_gruu || this.uri.toString(),
							!c || (b ? this.temp_gruu : this.pub_gruu) || (d += ";ob"),
							d += ">"
						}
					};
					for (b in n)
						d.configuration_skeleton[b].value = n[b];
					Object.defineProperties(this.configuration, d.configuration_skeleton);
					for (b in n)
						d.configuration_skeleton[b].value = "";
					l("configuration parameters after validation:");
					for (b in n)
						switch (b) {
						case "uri":
						case "registrar_server":
							l("- " + b + ": " + n[b]);
							break;
						case "password":
						case "ha1":
							l("- " + b + ": NOT SHOWN");
							break;
						default:
							l("- " + b + ": " + JSON.stringify(n[b]))
						}
				},
				d.configuration_skeleton = function () {
					var a,
					b,
					c,
					d = {},
					e = ["jssip_id", "hostport_params", "uri", "authorization_user", "contact_uri", "display_name", "instance_id", "no_answer_timeout", "session_timers", "password", "realm", "ha1", "register_expires", "registrar_server", "sockets", "use_preloaded_route", "ws_servers", "via_core_value", "via_host"],
					f = ["password", "realm", "ha1", "display_name"];
					for (a in e)
						b = e[a], c = f.indexOf(b) !== -1, d[b] = {
							value: "",
							writable: c,
							configurable: !1
						};
					return d.register = {
						value: "",
						writable: !0,
						configurable: !1
					},
					d
				}
				(),
				d.configuration_check = {
					mandatory: {
						uri: function (a) {
							var b;
							return /^sip:/i.test(a) || (a = o.SIP + ":" + a),
							b = y.parse(a),
							b && b.user ? b : void 0
						}
					},
					optional: {
						authorization_user: function (a) {
							return z.parse('"' + a + '"', "quoted_string") === -1 ? void 0 : a
						},
						connection_recovery_max_interval: function (a) {
							var b;
							if (w.isDecimal(a) && (b = Number(a), b > 0))
								return b
						},
						connection_recovery_min_interval: function (a) {
							var b;
							if (w.isDecimal(a) && (b = Number(a), b > 0))
								return b
						},
						contact_uri: function (a) {
							if ("string" == typeof a) {
								var b = z.parse(a, "SIP_URI");
								if (b !== -1)
									return b
							}
						},
						display_name: function (a) {
							return z.parse('"' + a + '"', "display_name") === -1 ? void 0 : a
						},
						instance_id: function (a) {
							return /^uuid:/i.test(a) && (a = a.substr(5)),
							z.parse(a, "uuid") === -1 ? void 0 : a
						},
						no_answer_timeout: function (a) {
							var b;
							if (w.isDecimal(a) && (b = Number(a), b > 0))
								return b
						},
						session_timers: function (a) {
							if ("boolean" == typeof a)
								return a
						},
						password: function (a) {
							return String(a)
						},
						realm: function (a) {
							return String(a)
						},
						ha1: function (a) {
							return String(a)
						},
						register: function (a) {
							if ("boolean" == typeof a)
								return a
						},
						register_expires: function (a) {
							var b;
							if (w.isDecimal(a) && (b = Number(a), b > 0))
								return b
						},
						registrar_server: function (a) {
							var b;
							return /^sip:/i.test(a) || (a = o.SIP + ":" + a),
							b = y.parse(a),
							b ? b.user ? void 0 : b : void 0
						},
						sockets: function (a) {
							var b,
							c;
							if (v.isSocket(a))
								a = [{
										socket: a
									}
								];
							else {
								if (!Array.isArray(a) || !a.length)
									return;
								for (c = a.length, b = 0; b < c; b++)
									v.isSocket(a[b]) && (a[b] = {
											socket: a[b]
										})
							}
							return a
						},
						use_preloaded_route: function (a) {
							if ("boolean" == typeof a)
								return a
						},
						ws_servers: function (a) {
							var b,
							c,
							d = [];
							if ("string" == typeof a)
								a = [{
										ws_uri: a
									}
								];
							else {
								if (!Array.isArray(a) || !a.length)
									return;
								for (c = a.length, b = 0; b < c; b++)
									"string" == typeof a[b] && (a[b] = {
											ws_uri: a[b]
										})
							}
							for (c = a.length, b = 0; b < c; b++)
								try {
									d.push({
										socket: new u(a[b].ws_uri),
										weight: a[b].weight || 0
									})
								} catch (e) {
									return void m(e)
								}
							return d
						}
					}
				}
			}, {
				"./Constants": 1,
				"./Exceptions": 5,
				"./Grammar": 6,
				"./Message": 8,
				"./Parser": 10,
				"./RTCSession": 11,
				"./Registrator": 16,
				"./SIPMessage": 18,
				"./Socket": 19,
				"./Transactions": 21,
				"./Transport": 22,
				"./URI": 24,
				"./Utils": 25,
				"./WebSocketInterface": 26,
				"./sanityCheck": 27,
				debug: 33,
				events: 28,
				rtcninja: 38,
				util: 32
			}
		],
		24: [function (a, b, c) {
				function d(a, b, c, d, f, g) {
					var h,
					i;
					if (!c)
						throw new TypeError('missing or invalid "host" parameter');
					a = a || e.SIP,
					this.parameters = {},
					this.headers = {};
					for (h in f)
						this.setParam(h, f[h]);
					for (i in g)
						this.setHeader(i, g[i]);
					Object.defineProperties(this, {
						scheme: {
							get: function () {
								return a
							},
							set: function (b) {
								a = b.toLowerCase()
							}
						},
						user: {
							get: function () {
								return b
							},
							set: function (a) {
								b = a
							}
						},
						host: {
							get: function () {
								return c
							},
							set: function (a) {
								c = a.toLowerCase()
							}
						},
						port: {
							get: function () {
								return d
							},
							set: function (a) {
								d = 0 === a ? a : parseInt(a, 10) || null
							}
						}
					})
				}
				b.exports = d;
				var e = a("./Constants"),
				f = a("./Utils"),
				g = a("./Grammar");
				d.prototype = {
					setParam: function (a, b) {
						a && (this.parameters[a.toLowerCase()] = "undefined" == typeof b || null === b ? null : b.toString())
					},
					getParam: function (a) {
						if (a)
							return this.parameters[a.toLowerCase()]
					},
					hasParam: function (a) {
						if (a)
							return this.parameters.hasOwnProperty(a.toLowerCase()) && !0 || !1
					},
					deleteParam: function (a) {
						var b;
						if (a = a.toLowerCase(), this.parameters.hasOwnProperty(a))
							return b = this.parameters[a], delete this.parameters[a], b
					},
					clearParams: function () {
						this.parameters = {}
					},
					setHeader: function (a, b) {
						this.headers[f.headerize(a)] = Array.isArray(b) ? b : [b]
					},
					getHeader: function (a) {
						if (a)
							return this.headers[f.headerize(a)]
					},
					hasHeader: function (a) {
						if (a)
							return this.headers.hasOwnProperty(f.headerize(a)) && !0 || !1
					},
					deleteHeader: function (a) {
						var b;
						if (a = f.headerize(a), this.headers.hasOwnProperty(a))
							return b = this.headers[a], delete this.headers[a], b
					},
					clearHeaders: function () {
						this.headers = {}
					},
					clone: function () {
						return new d(this.scheme, this.user, this.host, this.port, JSON.parse(JSON.stringify(this.parameters)), JSON.parse(JSON.stringify(this.headers)))
					},
					toString: function () {
						var a,
						b,
						c,
						d,
						e = [];
						d = this.scheme + ":",
						this.user && (d += f.escapeUser(this.user) + "@"),
						d += this.host,
						(this.port || 0 === this.port) && (d += ":" + this.port);
						for (b in this.parameters)
							d += ";" + b, null !== this.parameters[b] && (d += "=" + this.parameters[b]);
						for (a in this.headers)
							for (c = 0; c < this.headers[a].length; c++)
								e.push(a + "=" + this.headers[a][c]);
						return e.length > 0 && (d += "?" + e.join("&")),
						d
					},
					toAor: function (a) {
						var b;
						return b = this.scheme + ":",
						this.user && (b += f.escapeUser(this.user) + "@"),
						b += this.host,
						a && (this.port || 0 === this.port) && (b += ":" + this.port),
						b
					}
				},
				d.parse = function (a) {
					return a = g.parse(a, "SIP_URI"),
					a !== -1 ? a : void 0
				}
			}, {
				"./Constants": 1,
				"./Grammar": 6,
				"./Utils": 25
			}
		],
		25: [function (a, b, c) {
				var d = {};
				b.exports = d;
				var e = a("./Constants"),
				f = a("./URI"),
				g = a("./Grammar");
				d.str_utf8_length = function (a) {
					return unescape(encodeURIComponent(a)).length
				},
				d.isFunction = function (a) {
					return void 0 !== a && "[object Function]" === Object.prototype.toString.call(a)
				},
				d.isString = function (a) {
					return void 0 !== a && "[object String]" === Object.prototype.toString.call(a)
				},
				d.isDecimal = function (a) {
					return !isNaN(a) && parseFloat(a) === parseInt(a, 10)
				},
				d.isEmpty = function (a) {
					if (null === a || "" === a || void 0 === a || Array.isArray(a) && 0 === a.length || "number" == typeof a && isNaN(a))
						return !0
				},
				d.hasMethods = function (a) {
					for (var b, c = 1; b = arguments[c++]; )
						if (this.isFunction(a[b]))
							return !1;
					return !0
				},
				d.createRandomToken = function (a, b) {
					var c,
					d,
					e = "";
					for (b = b || 32, c = 0; c < a; c++)
						d = Math.random() * b | 0, e += d.toString(b);
					return e
				},
				d.newTag = function () {
					return d.createRandomToken(10)
				},
				d.newUUID = function () {
					var a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
							var b = 16 * Math.random() | 0,
							c = "x" === a ? b : 3 & b | 8;
							return c.toString(16)
						});
					return a
				},
				d.hostType = function (a) {
					if (a)
						return a = g.parse(a, "host"), a !== -1 ? a.host_type : void 0
				},
				d.normalizeTarget = function (a, b) {
					var c,
					g,
					h,
					i;
					if (a) {
						if (a instanceof f)
							return a;
						if ("string" == typeof a) {
							switch (g = a.split("@"), g.length) {
							case 1:
								if (!b)
									return;
								h = a,
								i = b;
								break;
							case 2:
								h = g[0],
								i = g[1];
								break;
							default:
								h = g.slice(0, g.length - 1).join("@"),
								i = g[g.length - 1]
							}
							return h = h.replace(/^(sips?|tel):/i, ""),
							/^[\-\.\(\)]*\+?[0-9\-\.\(\)]+$/.test(h) && (h = h.replace(/[\-\.\(\)]/g, "")),
							a = e.SIP + ":" + d.escapeUser(h) + "@" + i,
							(c = f.parse(a)) ? c : void 0
						}
					} else ;
				},
				d.escapeUser = function (a) {
					return encodeURIComponent(decodeURIComponent(a)).replace(/%3A/gi, ":").replace(/%2B/gi, "+").replace(/%3F/gi, "?").replace(/%2F/gi, "/")
				},
				d.headerize = function (a) {
					var b,
					c = {
						"Call-Id": "Call-ID",
						Cseq: "CSeq",
						"Www-Authenticate": "WWW-Authenticate"
					},
					d = a.toLowerCase().replace(/_/g, "-").split("-"),
					e = "",
					f = d.length;
					for (b = 0; b < f; b++)
						0 !== b && (e += "-"), e += d[b].charAt(0).toUpperCase() + d[b].substring(1);
					return c[e] && (e = c[e]),
					e
				},
				d.sipErrorCause = function (a) {
					var b;
					for (b in e.SIP_ERROR_CAUSES)
						if (e.SIP_ERROR_CAUSES[b].indexOf(a) !== -1)
							return e.causes[b];
					return e.causes.SIP_FAILURE_CODE
				},
				d.getRandomTestNetIP = function () {
					function a(a, b) {
						return Math.floor(Math.random() * (b - a + 1) + a)
					}
					return "192.0.2." + a(1, 254)
				},
				d.calculateMD5 = function (a) {
					function b(a, b) {
						return a << b | a >>> 32 - b
					}
					function c(a, b) {
						var c,
						d,
						e,
						f,
						g;
						return e = 2147483648 & a,
						f = 2147483648 & b,
						c = 1073741824 & a,
						d = 1073741824 & b,
						g = (1073741823 & a) + (1073741823 & b),
						c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
					}
					function d(a, b, c) {
						return a & b | ~a & c
					}
					function e(a, b, c) {
						return a & c | b & ~c
					}
					function f(a, b, c) {
						return a ^ b ^ c
					}
					function g(a, b, c) {
						return b ^ (a | ~c)
					}
					function h(a, e, f, g, h, i, j) {
						return a = c(a, c(c(d(e, f, g), h), j)),
						c(b(a, i), e)
					}
					function i(a, d, f, g, h, i, j) {
						return a = c(a, c(c(e(d, f, g), h), j)),
						c(b(a, i), d)
					}
					function j(a, d, e, g, h, i, j) {
						return a = c(a, c(c(f(d, e, g), h), j)),
						c(b(a, i), d)
					}
					function k(a, d, e, f, h, i, j) {
						return a = c(a, c(c(g(d, e, f), h), j)),
						c(b(a, i), d)
					}
					function l(a) {
						for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; i < c; )
							b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
						return b = (i - i % 4) / 4,
						h = i % 4 * 8,
						g[b] = g[b] | 128 << h,
						g[f - 2] = c << 3,
						g[f - 1] = c >>> 29,
						g
					}
					function m(a) {
						var b,
						c,
						d = "",
						e = "";
						for (c = 0; c <= 3; c++)
							b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
						return d
					}
					function n(a) {
						a = a.replace(/\r\n/g, "\n");
						for (var b = "", c = 0; c < a.length; c++) {
							var d = a.charCodeAt(c);
							d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
						}
						return b
					}
					var o,
					p,
					q,
					r,
					s,
					t,
					u,
					v,
					w,
					x = [],
					y = 7,
					z = 12,
					A = 17,
					B = 22,
					C = 5,
					D = 9,
					E = 14,
					F = 20,
					G = 4,
					H = 11,
					I = 16,
					J = 23,
					K = 6,
					L = 10,
					M = 15,
					N = 21;
					for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)
						p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
					var O = m(t) + m(u) + m(v) + m(w);
					return O.toLowerCase()
				}
			}, {
				"./Constants": 1,
				"./Grammar": 6,
				"./URI": 24
			}
		],
		26: [function (a, b, c) {
				function d(a) {
					j("new()");
					var b = null,
					c = null;
					this.ws = null,
					Object.defineProperties(this, {
						via_transport: {
							get: function () {
								return c
							},
							set: function (a) {
								c = a.toUpperCase()
							}
						},
						sip_uri: {
							get: function () {
								return b
							}
						},
						url: {
							get: function () {
								return a
							}
						}
					});
					var d = i.parse(a, "absoluteURI");
					if (d === -1)
						throw k("invalid WebSocket URI: " + a), new TypeError("Invalid argument: " + a);
					if ("wss" !== d.scheme && "ws" !== d.scheme)
						throw k("invalid WebSocket URI scheme: " + d.scheme), new TypeError("Invalid argument: " + a);
					b = "sip:" + d.host + (d.port ? ":" + d.port : "") + ";transport=ws",
					this.via_transport = d.scheme
				}
				function e() {
					j("WebSocket " + this.url + " connected"),
					this.onconnect()
				}
				function f(a) {
					j("WebSocket " + this.url + " closed"),
					a.wasClean === !1 && j("WebSocket abrupt disconnection"),
					this.ondisconnect(a.wasClean, a.code, a.reason)
				}
				function g(a) {
					j("received WebSocket message"),
					this.ondata(a.data)
				}
				function h(a) {
					k("WebSocket " + this.url + " error: " + a)
				}
				b.exports = d;
				var i = a("./Grammar"),
				j = a("debug")("JsSIP:WebSocketInterface"),
				k = a("debug")("JsSIP:ERROR:WebSocketInterface");
				d.prototype.connect = function () {
					if (j("connect()"), this.isConnected())
						return void j("WebSocket " + this.url + " is already connected");
					if (this.isConnecting())
						return void j("WebSocket " + this.url + " is connecting");
					this.ws && this.ws.close(),
					j("connecting to WebSocket " + this.url);
					try {
						this.ws = new WebSocket(this.url, "sip"),
						this.ws.binaryType = "arraybuffer",
						this.ws.onopen = e.bind(this),
						this.ws.onclose = f.bind(this),
						this.ws.onmessage = g.bind(this),
						this.ws.onerror = h.bind(this)
					} catch (a) {
						h.call(this, a)
					}
				},
				d.prototype.disconnect = function () {
					j("disconnect()"),
					this.ws && (this.ws.close(), this.ws = null)
				},
				d.prototype.send = function (a) {
					return j("send()"),
					this.isConnected() ? (this.ws.send(a), !0) : (k("unable to send message, WebSocket is not open"), !1)
				},
				d.prototype.isConnected = function () {
					return this.ws && this.ws.readyState === this.ws.OPEN
				},
				d.prototype.isConnecting = function () {
					return this.ws && this.ws.readyState === this.ws.CONNECTING
				}
			}, {
				"./Grammar": 6,
				debug: 33
			}
		],
		27: [function (a, b, c) {
				function d(a, b, c) {
					var d,
					e;
					for (m = a, n = b, o = c, d = v.length; d--; )
						if (e = v[d](m), e === !1)
							return !1;
					if (m instanceof r.IncomingRequest) {
						for (d = t.length; d--; )
							if (e = t[d](m), e === !1)
								return !1
					} else if (m instanceof r.IncomingResponse)
						for (d = u.length; d--; )
							if (e = u[d](m), e === !1)
								return !1;
					return !0
				}
				function e() {
					if ("sip" !== m.s("to").uri.scheme)
						return l(416), !1
				}
				function f() {
					if (!m.to_tag && m.call_id.substr(0, 5) === n.configuration.jssip_id)
						return l(482), !1
				}
				function g() {
					var a = s.str_utf8_length(m.body),
					b = m.getHeader("content-length");
					if (a < b)
						return l(400), !1
				}
				function h() {
					var a,
					b,
					c = m.from_tag,
					d = m.call_id,
					e = m.cseq;
					if (!m.to_tag)
						if (m.method === q.INVITE) {
							if (n.transactions.ist[m.via_branch])
								return !1;
							for (b in n.transactions.ist)
								if (a = n.transactions.ist[b], a.request.from_tag === c && a.request.call_id === d && a.request.cseq === e)
									return l(482), !1
						} else {
							if (n.transactions.nist[m.via_branch])
								return !1;
							for (b in n.transactions.nist)
								if (a = n.transactions.nist[b], a.request.from_tag === c && a.request.call_id === d && a.request.cseq === e)
									return l(482), !1
						}
				}
				function i() {
					if (m.getHeaders("via").length > 1)
						return p("more than one Via header field present in the response, dropping the response"), !1
				}
				function j() {
					var a = s.str_utf8_length(m.body),
					b = m.getHeader("content-length");
					if (a < b)
						return p("message body length is lower than the value in Content-Length header field, dropping the response"), !1
				}
				function k() {
					for (var a = ["from", "to", "call_id", "cseq", "via"], b = a.length; b--; )
						if (!m.hasHeader(a[b]))
							return p("missing mandatory header field : " + a[b] + ", dropping the response"), !1
				}
				function l(a) {
					var b,
					c = "SIP/2.0 " + a + " " + q.REASON_PHRASE[a] + "\r\n",
					d = m.getHeaders("via"),
					e = d.length,
					f = 0;
					for (f; f < e; f++)
						c += "Via: " + d[f] + "\r\n";
					b = m.getHeader("To"),
					m.to_tag || (b += ";tag=" + s.newTag()),
					c += "To: " + b + "\r\n",
					c += "From: " + m.getHeader("From") + "\r\n",
					c += "Call-ID: " + m.call_id + "\r\n",
					c += "CSeq: " + m.cseq + " " + m.method + "\r\n",
					c += "\r\n",
					o.send(c)
				}
				b.exports = d;
				var m,
				n,
				o,
				p = a("debug")("JsSIP:sanityCheck"),
				q = a("./Constants"),
				r = a("./SIPMessage"),
				s = a("./Utils"),
				t = [],
				u = [],
				v = [];
				t.push(e),
				t.push(f),
				t.push(g),
				t.push(h),
				u.push(i),
				u.push(j),
				v.push(k)
			}, {
				"./Constants": 1,
				"./SIPMessage": 18,
				"./Utils": 25,
				debug: 33
			}
		],
		28: [function (a, b, c) {
				function d() {
					this._events = this._events || {},
					this._maxListeners = this._maxListeners || void 0
				}
				function e(a) {
					return "function" == typeof a
				}
				function f(a) {
					return "number" == typeof a
				}
				function g(a) {
					return "object" == typeof a && null !== a
				}
				function h(a) {
					return void 0 === a
				}
				b.exports = d,
				d.EventEmitter = d,
				d.prototype._events = void 0,
				d.prototype._maxListeners = void 0,
				d.defaultMaxListeners = 10,
				d.prototype.setMaxListeners = function (a) {
					if (!f(a) || a < 0 || isNaN(a))
						throw TypeError("n must be a positive number");
					return this._maxListeners = a,
					this
				},
				d.prototype.emit = function (a) {
					var b,
					c,
					d,
					f,
					i,
					j;
					if (this._events || (this._events = {}), "error" === a && (!this._events.error || g(this._events.error) && !this._events.error.length)) {
						if (b = arguments[1], b instanceof Error)
							throw b;
						throw TypeError('Uncaught, unspecified "error" event.')
					}
					if (c = this._events[a], h(c))
						return !1;
					if (e(c))
						switch (arguments.length) {
						case 1:
							c.call(this);
							break;
						case 2:
							c.call(this, arguments[1]);
							break;
						case 3:
							c.call(this, arguments[1], arguments[2]);
							break;
						default:
							f = Array.prototype.slice.call(arguments, 1),
							c.apply(this, f)
						}
					else if (g(c))
						for (f = Array.prototype.slice.call(arguments, 1), j = c.slice(), d = j.length, i = 0; i < d; i++)
							j[i].apply(this, f);
					return !0
				},
				d.prototype.addListener = function (a, b) {
					var c;
					if (!e(b))
						throw TypeError("listener must be a function");
					return this._events || (this._events = {}),
					this._events.newListener && this.emit("newListener", a, e(b.listener) ? b.listener : b),
					this._events[a] ? g(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b,
					g(this._events[a]) && !this._events[a].warned && (c = h(this._maxListeners) ? d.defaultMaxListeners : this._maxListeners, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), "function" == typeof console.trace && console.trace())),
					this
				},
				d.prototype.on = d.prototype.addListener,
				d.prototype.once = function (a, b) {
					function c() {
						this.removeListener(a, c),
						d || (d = !0, b.apply(this, arguments))
					}
					if (!e(b))
						throw TypeError("listener must be a function");
					var d = !1;
					return c.listener = b,
					this.on(a, c),
					this
				},
				d.prototype.removeListener = function (a, b) {
					var c,
					d,
					f,
					h;
					if (!e(b))
						throw TypeError("listener must be a function");
					if (!this._events || !this._events[a])
						return this;
					if (c = this._events[a], f = c.length, d = -1, c === b || e(c.listener) && c.listener === b)
						delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
					else if (g(c)) {
						for (h = f; h-- > 0; )
							if (c[h] === b || c[h].listener && c[h].listener === b) {
								d = h;
								break
							}
						if (d < 0)
							return this;
						1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(d, 1),
						this._events.removeListener && this.emit("removeListener", a, b)
					}
					return this
				},
				d.prototype.removeAllListeners = function (a) {
					var b,
					c;
					if (!this._events)
						return this;
					if (!this._events.removeListener)
						return 0 === arguments.length ? this._events = {}
					 : this._events[a] && delete this._events[a],
					this;
					if (0 === arguments.length) {
						for (b in this._events)
							"removeListener" !== b && this.removeAllListeners(b);
						return this.removeAllListeners("removeListener"),
						this._events = {},
						this
					}
					if (c = this._events[a], e(c))
						this.removeListener(a, c);
					else if (c)
						for (; c.length; )
							this.removeListener(a, c[c.length - 1]);
					return delete this._events[a],
					this
				},
				d.prototype.listeners = function (a) {
					var b;
					return b = this._events && this._events[a] ? e(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
				},
				d.prototype.listenerCount = function (a) {
					if (this._events) {
						var b = this._events[a];
						if (e(b))
							return 1;
						if (b)
							return b.length
					}
					return 0
				},
				d.listenerCount = function (a, b) {
					return a.listenerCount(b)
				}
			}, {}
		],
		29: [function (a, b, c) {
				"function" == typeof Object.create ? b.exports = function (a, b) {
					a.super_ = b,
					a.prototype = Object.create(b.prototype, {
							constructor: {
								value: a,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						})
				}
				 : b.exports = function (a, b) {
					a.super_ = b;
					var c = function () {};
					c.prototype = b.prototype,
					a.prototype = new c,
					a.prototype.constructor = a
				}
			}, {}
		],
		30: [function (a, b, c) {
				function d() {
					m && k && (m = !1, k.length ? l = k.concat(l) : n = -1, l.length && e())
				}
				function e() {
					if (!m) {
						var a = h(d);
						m = !0;
						for (var b = l.length; b; ) {
							for (k = l, l = []; ++n < b; )
								k && k[n].run();
							n = -1,
							b = l.length
						}
						k = null,
						m = !1,
						i(a)
					}
				}
				function f(a, b) {
					this.fun = a,
					this.array = b
				}
				function g() {}
				var h,
				i,
				j = b.exports = {};
				!function () {
					try {
						h = setTimeout
					} catch (a) {
						h = function () {
							throw new Error("setTimeout is not defined")
						}
					}
					try {
						i = clearTimeout
					} catch (a) {
						i = function () {
							throw new Error("clearTimeout is not defined")
						}
					}
				}
				();
				var k,
				l = [],
				m = !1,
				n = -1;
				j.nextTick = function (a) {
					var b = new Array(arguments.length - 1);
					if (arguments.length > 1)
						for (var c = 1; c < arguments.length; c++)
							b[c - 1] = arguments[c];
					l.push(new f(a, b)),
					1 !== l.length || m || h(e, 0)
				},
				f.prototype.run = function () {
					this.fun.apply(null, this.array)
				},
				j.title = "browser",
				j.browser = !0,
				j.env = {},
				j.argv = [],
				j.version = "",
				j.versions = {},
				j.on = g,
				j.addListener = g,
				j.once = g,
				j.off = g,
				j.removeListener = g,
				j.removeAllListeners = g,
				j.emit = g,
				j.binding = function (a) {
					throw new Error("process.binding is not supported")
				},
				j.cwd = function () {
					return "/"
				},
				j.chdir = function (a) {
					throw new Error("process.chdir is not supported")
				},
				j.umask = function () {
					return 0
				}
			}, {}
		],
		31: [function (a, b, c) {
				b.exports = function (a) {
					return a && "object" == typeof a && "function" == typeof a.copy && "function" == typeof a.fill && "function" == typeof a.readUInt8
				}
			}, {}
		],
		32: [function (a, b, c) {
				(function (b, d) {
					function e(a, b) {
						var d = {
							seen: [],
							stylize: g
						};
						return arguments.length >= 3 && (d.depth = arguments[2]),
						arguments.length >= 4 && (d.colors = arguments[3]),
						p(b) ? d.showHidden = b : b && c._extend(d, b),
						v(d.showHidden) && (d.showHidden = !1),
						v(d.depth) && (d.depth = 2),
						v(d.colors) && (d.colors = !1),
						v(d.customInspect) && (d.customInspect = !0),
						d.colors && (d.stylize = f),
						i(d, a, d.depth)
					}
					function f(a, b) {
						var c = e.styles[b];
						return c ? "[" + e.colors[c][0] + "m" + a + "[" + e.colors[c][1] + "m" : a
					}
					function g(a, b) {
						return a
					}
					function h(a) {
						var b = {};
						return a.forEach(function (a, c) {
							b[a] = !0
						}),
						b
					}
					function i(a, b, d) {
						if (a.customInspect && b && A(b.inspect) && b.inspect !== c.inspect && (!b.constructor || b.constructor.prototype !== b)) {
							var e = b.inspect(d, a);
							return t(e) || (e = i(a, e, d)),
							e
						}
						var f = j(a, b);
						if (f)
							return f;
						var g = Object.keys(b),
						p = h(g);
						if (a.showHidden && (g = Object.getOwnPropertyNames(b)), z(b) && (g.indexOf("message") >= 0 || g.indexOf("description") >= 0))
							return k(b);
						if (0 === g.length) {
							if (A(b)) {
								var q = b.name ? ": " + b.name : "";
								return a.stylize("[Function" + q + "]", "special")
							}
							if (w(b))
								return a.stylize(RegExp.prototype.toString.call(b), "regexp");
							if (y(b))
								return a.stylize(Date.prototype.toString.call(b), "date");
							if (z(b))
								return k(b)
						}
						var r = "",
						s = !1,
						u = ["{", "}"];
						if (o(b) && (s = !0, u = ["[", "]"]), A(b)) {
							var v = b.name ? ": " + b.name : "";
							r = " [Function" + v + "]"
						}
						if (w(b) && (r = " " + RegExp.prototype.toString.call(b)), y(b) && (r = " " + Date.prototype.toUTCString.call(b)), z(b) && (r = " " + k(b)), 0 === g.length && (!s || 0 == b.length))
							return u[0] + r + u[1];
						if (d < 0)
							return w(b) ? a.stylize(RegExp.prototype.toString.call(b), "regexp") : a.stylize("[Object]", "special");
						a.seen.push(b);
						var x;
						return x = s ? l(a, b, d, p, g) : g.map(function (c) {
								return m(a, b, d, p, c, s)
							}),
						a.seen.pop(),
						n(x, r, u)
					}
					function j(a, b) {
						if (v(b))
							return a.stylize("undefined", "undefined");
						if (t(b)) {
							var c = "'" + JSON.stringify(b).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
							return a.stylize(c, "string")
						}
						return s(b) ? a.stylize("" + b, "number") : p(b) ? a.stylize("" + b, "boolean") : q(b) ? a.stylize("null", "null") : void 0
					}
					function k(a) {
						return "[" + Error.prototype.toString.call(a) + "]"
					}
					function l(a, b, c, d, e) {
						for (var f = [], g = 0, h = b.length; g < h; ++g)
							F(b, String(g)) ? f.push(m(a, b, c, d, String(g), !0)) : f.push("");
						return e.forEach(function (e) {
							e.match(/^\d+$/) || f.push(m(a, b, c, d, e, !0))
						}),
						f
					}
					function m(a, b, c, d, e, f) {
						var g,
						h,
						j;
						if (j = Object.getOwnPropertyDescriptor(b, e) || {
								value: b[e]
							}, j.get ? h = j.set ? a.stylize("[Getter/Setter]", "special") : a.stylize("[Getter]", "special") : j.set && (h = a.stylize("[Setter]", "special")), F(d, e) || (g = "[" + e + "]"), h || (a.seen.indexOf(j.value) < 0 ? (h = q(c) ? i(a, j.value, null) : i(a, j.value, c - 1), h.indexOf("\n") > -1 && (h = f ? h.split("\n").map(function (a) {
												return "  " + a
											}).join("\n").substr(2) : "\n" + h.split("\n").map(function (a) {
												return "   " + a
											}).join("\n"))) : h = a.stylize("[Circular]", "special")), v(g)) {
							if (f && e.match(/^\d+$/))
								return h;
							g = JSON.stringify("" + e),
							g.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (g = g.substr(1, g.length - 2), g = a.stylize(g, "name")) : (g = g.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), g = a.stylize(g, "string"))
						}
						return g + ": " + h
					}
					function n(a, b, c) {
						var d = 0,
						e = a.reduce(function (a, b) {
								return d++,
								b.indexOf("\n") >= 0 && d++,
								a + b.replace(/\u001b\[\d\d?m/g, "").length + 1
							}, 0);
						return e > 60 ? c[0] + ("" === b ? "" : b + "\n ") + " " + a.join(",\n  ") + " " + c[1] : c[0] + b + " " + a.join(", ") + " " + c[1]
					}
					function o(a) {
						return Array.isArray(a)
					}
					function p(a) {
						return "boolean" == typeof a
					}
					function q(a) {
						return null === a
					}
					function r(a) {
						return null == a
					}
					function s(a) {
						return "number" == typeof a
					}
					function t(a) {
						return "string" == typeof a
					}
					function u(a) {
						return "symbol" == typeof a
					}
					function v(a) {
						return void 0 === a
					}
					function w(a) {
						return x(a) && "[object RegExp]" === C(a)
					}
					function x(a) {
						return "object" == typeof a && null !== a
					}
					function y(a) {
						return x(a) && "[object Date]" === C(a)
					}
					function z(a) {
						return x(a) && ("[object Error]" === C(a) || a instanceof Error)
					}
					function A(a) {
						return "function" == typeof a
					}
					function B(a) {
						return null === a || "boolean" == typeof a || "number" == typeof a || "string" == typeof a || "symbol" == typeof a || "undefined" == typeof a
					}
					function C(a) {
						return Object.prototype.toString.call(a)
					}
					function D(a) {
						return a < 10 ? "0" + a.toString(10) : a.toString(10)
					}
					function E() {
						var a = new Date,
						b = [D(a.getHours()), D(a.getMinutes()), D(a.getSeconds())].join(":");
						return [a.getDate(), J[a.getMonth()], b].join(" ")
					}
					function F(a, b) {
						return Object.prototype.hasOwnProperty.call(a, b)
					}
					var G = /%[sdj%]/g;
					c.format = function (a) {
						if (!t(a)) {
							for (var b = [], c = 0; c < arguments.length; c++)
								b.push(e(arguments[c]));
							return b.join(" ")
						}
						for (var c = 1, d = arguments, f = d.length, g = String(a).replace(G, function (a) {
									if ("%%" === a)
										return "%";
									if (c >= f)
										return a;
									switch (a) {
									case "%s":
										return String(d[c++]);
									case "%d":
										return Number(d[c++]);
									case "%j":
										try {
											return JSON.stringify(d[c++])
										} catch (b) {
											return "[Circular]"
										}
									default:
										return a
									}
								}), h = d[c]; c < f; h = d[++c])
							g += q(h) || !x(h) ? " " + h : " " + e(h);
						return g
					},
					c.deprecate = function (a, e) {
						function f() {
							if (!g) {
								if (b.throwDeprecation)
									throw new Error(e);
								b.traceDeprecation ? console.trace(e) : console.error(e),
								g = !0
							}
							return a.apply(this, arguments)
						}
						if (v(d.process))
							return function () {
								return c.deprecate(a, e).apply(this, arguments)
							};
						if (b.noDeprecation === !0)
							return a;
						var g = !1;
						return f
					};
					var H,
					I = {};
					c.debuglog = function (a) {
						if (v(H) && (H = b.env.NODE_DEBUG || ""), a = a.toUpperCase(), !I[a])
							if (new RegExp("\\b" + a + "\\b", "i").test(H)) {
								var d = b.pid;
								I[a] = function () {
									var b = c.format.apply(c, arguments);
									console.error("%s %d: %s", a, d, b)
								}
							} else
								I[a] = function () {};
						return I[a]
					},
					c.inspect = e,
					e.colors = {
						bold: [1, 22],
						italic: [3, 23],
						underline: [4, 24],
						inverse: [7, 27],
						white: [37, 39],
						grey: [90, 39],
						black: [30, 39],
						blue: [34, 39],
						cyan: [36, 39],
						green: [32, 39],
						magenta: [35, 39],
						red: [31, 39],
						yellow: [33, 39]
					},
					e.styles = {
						special: "cyan",
						number: "yellow",
						"boolean": "yellow",
						undefined: "grey",
						"null": "bold",
						string: "green",
						date: "magenta",
						regexp: "red"
					},
					c.isArray = o,
					c.isBoolean = p,
					c.isNull = q,
					c.isNullOrUndefined = r,
					c.isNumber = s,
					c.isString = t,
					c.isSymbol = u,
					c.isUndefined = v,
					c.isRegExp = w,
					c.isObject = x,
					c.isDate = y,
					c.isError = z,
					c.isFunction = A,
					c.isPrimitive = B,
					c.isBuffer = a("./support/isBuffer");
					var J = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					c.log = function () {
						console.log("%s - %s", E(), c.format.apply(c, arguments))
					},
					c.inherits = a("inherits"),
					c._extend = function (a, b) {
						if (!b || !x(b))
							return a;
						for (var c = Object.keys(b), d = c.length; d--; )
							a[c[d]] = b[c[d]];
						return a
					}
				}).call(this, a("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./support/isBuffer": 31,
				_process: 30,
				inherits: 29
			}
		],
		33: [function (a, b, c) {
				function d() {
					return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
				}
				function e() {
					var a = arguments,
					b = this.useColors;
					if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + c.humanize(this.diff), !b)
						return a;
					var d = "color: " + this.color;
					a = [a[0], d, "color: inherit"].concat(Array.prototype.slice.call(a, 1));
					var e = 0,
					f = 0;
					return a[0].replace(/%[a-z%]/g, function (a) {
						"%%" !== a && (e++, "%c" === a && (f = e))
					}),
					a.splice(f, 0, d),
					a
				}
				function f() {
					return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
				}
				function g(a) {
					try {
						null == a ? c.storage.removeItem("debug") : c.storage.debug = a
					} catch (b) {}
				}
				function h() {
					var a;
					try {
						a = c.storage.debug
					} catch (b) {}
					return a
				}
				function i() {
					try {
						return window.localStorage
					} catch (a) {}
				}
				c = b.exports = a("./debug"),
				c.log = f,
				c.formatArgs = e,
				c.save = g,
				c.load = h,
				c.useColors = d,
				c.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : i(),
				c.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
				c.formatters.j = function (a) {
					return JSON.stringify(a)
				},
				c.enable(h())
			}, {
				"./debug": 34
			}
		],
		34: [function (a, b, c) {
				function d() {
					return c.colors[k++ % c.colors.length]
				}
				function e(a) {
					function b() {}
					function e() {
						var a = e,
						b = +new Date,
						f = b - (j || b);
						a.diff = f,
						a.prev = j,
						a.curr = b,
						j = b,
						null == a.useColors && (a.useColors = c.useColors()),
						null == a.color && a.useColors && (a.color = d());
						var g = Array.prototype.slice.call(arguments);
						g[0] = c.coerce(g[0]),
						"string" != typeof g[0] && (g = ["%o"].concat(g));
						var h = 0;
						g[0] = g[0].replace(/%([a-z%])/g, function (b, d) {
								if ("%%" === b)
									return b;
								h++;
								var e = c.formatters[d];
								if ("function" == typeof e) {
									var f = g[h];
									b = e.call(a, f),
									g.splice(h, 1),
									h--
								}
								return b
							}),
						"function" == typeof c.formatArgs && (g = c.formatArgs.apply(a, g));
						var i = e.log || c.log || console.log.bind(console);
						i.apply(a, g)
					}
					b.enabled = !1,
					e.enabled = !0;
					var f = c.enabled(a) ? e : b;
					return f.namespace = a,
					f
				}
				function f(a) {
					c.save(a);
					for (var b = (a || "").split(/[\s,]+/), d = b.length, e = 0; e < d; e++)
						b[e] && (a = b[e].replace(/\*/g, ".*?"), "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$")))
				}
				function g() {
					c.enable("")
				}
				function h(a) {
					var b,
					d;
					for (b = 0, d = c.skips.length; b < d; b++)
						if (c.skips[b].test(a))
							return !1;
					for (b = 0, d = c.names.length; b < d; b++)
						if (c.names[b].test(a))
							return !0;
					return !1
				}
				function i(a) {
					return a instanceof Error ? a.stack || a.message : a
				}
				c = b.exports = e,
				c.coerce = i,
				c.disable = g,
				c.enable = f,
				c.enabled = h,
				c.humanize = a("ms"),
				c.names = [],
				c.skips = [],
				c.formatters = {};
				var j,
				k = 0
			}, {
				ms: 35
			}
		],
		35: [function (a, b, c) {
				function d(a) {
					if (a = "" + a, !(a.length > 1e4)) {
						var b = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a);
						if (b) {
							var c = parseFloat(b[1]),
							d = (b[2] || "ms").toLowerCase();
							switch (d) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return c * l;
							case "days":
							case "day":
							case "d":
								return c * k;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return c * j;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return c * i;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return c * h;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return c
							}
						}
					}
				}
				function e(a) {
					return a >= k ? Math.round(a / k) + "d" : a >= j ? Math.round(a / j) + "h" : a >= i ? Math.round(a / i) + "m" : a >= h ? Math.round(a / h) + "s" : a + "ms"
				}
				function f(a) {
					return g(a, k, "day") || g(a, j, "hour") || g(a, i, "minute") || g(a, h, "second") || a + " ms"
				}
				function g(a, b, c) {
					if (!(a < b))
						return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
				}
				var h = 1e3,
				i = 60 * h,
				j = 60 * i,
				k = 24 * j,
				l = 365.25 * k;
				b.exports = function (a, b) {
					return b = b || {},
					"string" == typeof a ? d(a) : b["long"] ? f(a) : e(a)
				}
			}, {}
		],
		36: [function (a, b, c) {
				(function (c) {
					"use strict";
					function d(a) {
						function b(a) {
							return function () {
								throw new Error("rtcninja: WebRTC not supported, missing " + a + " [browser: " + g.name + " " + g.version + "]");
							}
						}
						if (t && g.chrome && s >= 32 || g.android && g.chrome && s >= 39 || t && g.opera && s >= 27 || g.android && g.opera && s >= 24 || g.android && g.webkit && !g.chrome && s >= 37 || f.webkitGetUserMedia && e.webkitRTCPeerConnection)
							u = !0, j = f.webkitGetUserMedia.bind(f), k = e.webkitRTCPeerConnection, l = e.RTCSessionDescription, m = e.RTCIceCandidate, n = e.MediaStreamTrack, n && n.getSources ? o = n.getSources.bind(n) : f.getMediaDevices && (o = f.getMediaDevices.bind(f)), p = function (a, b) {
								return a.src = URL.createObjectURL(b),
								a
							},
						q = !0,
						r = !1;
						else if (t && g.firefox && s >= 22 || g.android && g.firefox && s >= 33 || f.mozGetUserMedia && e.mozRTCPeerConnection)
							u = !0, j = f.mozGetUserMedia.bind(f), k = e.mozRTCPeerConnection, l = e.mozRTCSessionDescription, m = e.mozRTCIceCandidate, n = e.MediaStreamTrack, p = function (a, b) {
								return a.src = URL.createObjectURL(b),
								a
							},
						q = !1,
						r = !1;
						else if (a.plugin && "function" == typeof a.plugin.isRequired && a.plugin.isRequired() && "function" == typeof a.plugin.isInstalled && a.plugin.isInstalled()) {
							var c = a.plugin["interface"];
							u = !0,
							j = c.getUserMedia,
							k = c.RTCPeerConnection,
							l = c.RTCSessionDescription,
							m = c.RTCIceCandidate,
							n = c.MediaStreamTrack,
							n && n.getSources ? o = n.getSources.bind(n) : f.getMediaDevices && (o = f.getMediaDevices.bind(f)),
							p = c.attachMediaStream,
							q = c.canRenegotiate,
							r = !0
						} else
							f.getUserMedia && e.RTCPeerConnection && (u = !0, j = f.getUserMedia.bind(f), k = e.RTCPeerConnection, l = e.RTCSessionDescription, m = e.RTCIceCandidate, n = e.MediaStreamTrack, n && n.getSources ? o = n.getSources.bind(n) : f.getMediaDevices && (o = f.getMediaDevices.bind(f)), p = e.attachMediaStream || function (a, b) {
								return a.src = URL.createObjectURL(b),
								a
							}, q = !0, r = !1);
						return d.hasWebRTC = function () {
							return u
						},
						j ? d.getUserMedia = function (a, b, c) {
							h("getUserMedia() | constraints: %o", a);
							try {
								j(a, function (a) {
									h("getUserMedia() | success"),
									b && b(a)
								}, function (a) {
									h("getUserMedia() | error:", a),
									c && c(a)
								})
							} catch (d) {
								i("getUserMedia() | error:", d),
								c && c(d)
							}
						}
						 : d.getUserMedia = function (a, c, d) {
							i("getUserMedia() | WebRTC not supported"),
							d ? d(new Error("rtcninja: WebRTC not supported, missing getUserMedia [browser: " + g.name + " " + g.version + "]")) : b("getUserMedia")
						},
						d.RTCPeerConnection = k || b("RTCPeerConnection"),
						d.RTCSessionDescription = l || b("RTCSessionDescription"),
						d.RTCIceCandidate = m || b("RTCIceCandidate"),
						d.MediaStreamTrack = n || b("MediaStreamTrack"),
						d.getMediaDevices = o,
						d.attachMediaStream = p || b("attachMediaStream"),
						d.canRenegotiate = q,
						d.closeMediaStream = function (a) {
							if (a)
								try {
									h("closeMediaStream() | calling stop() on all the MediaStreamTrack");
									var b,
									c,
									d;
									if (a.getTracks)
										for (b = a.getTracks(), c = 0, d = b.length; c < d; c += 1)
											b[c].stop();
									else {
										for (b = a.getAudioTracks(), c = 0, d = b.length; c < d; c += 1)
											b[c].stop();
										for (b = a.getVideoTracks(), c = 0, d = b.length; c < d; c += 1)
											b[c].stop()
									}
								} catch (e) {
									"function" != typeof a.stop && "object" != typeof a.stop || (h("closeMediaStream() | calling stop() on the MediaStream"), a.stop())
								}
						},
						d.fixPeerConnectionConfig = function (a) {
							var b,
							c,
							d,
							e,
							f;
							for (Array.isArray(a.iceServers) || (a.iceServers = []), b = 0, c = a.iceServers.length; b < c; b += 1)
								d = a.iceServers[b], e = d.hasOwnProperty("urls"), f = d.hasOwnProperty("url"), "object" == typeof d && (e && !f ? d.url = Array.isArray(d.urls) ? d.urls[0] : d.urls : !e && f && (d.urls = Array.isArray(d.url) ? d.url.slice() : d.url), f && Array.isArray(d.url) && (d.url = d.url[0]))
						},
						d.fixRTCOfferOptions = function (a) {
							a = a || {},
							r ? (a.hasOwnProperty("offerToReceiveAudio") && (a.mandatory = a.mandatory || {}, a.mandatory.OfferToReceiveAudio = !!a.offerToReceiveAudio), a.hasOwnProperty("offerToReceiveVideo") && (a.mandatory = a.mandatory || {}, a.mandatory.OfferToReceiveVideo = !!a.offerToReceiveVideo)) : (a.mandatory && a.mandatory.hasOwnProperty("OfferToReceiveAudio") && (a.offerToReceiveAudio = a.mandatory.OfferToReceiveAudio ? 1 : 0), a.mandatory && a.mandatory.hasOwnProperty("OfferToReceiveVideo") && (a.offerToReceiveVideo = a.mandatory.OfferToReceiveVideo ? 1 : 0), delete a.mandatory)
						},
						d
					}
					b.exports = d;
					var e,
					f,
					g = a("bowser"),
					h = a("debug")("rtcninja:Adapter"),
					i = a("debug")("rtcninja:ERROR:Adapter"),
					j = null,
					k = null,
					l = null,
					m = null,
					n = null,
					o = null,
					p = null,
					q = !1,
					r = !1,
					s = Number(g.version) || 0,
					t = !(g.mobile || g.tablet && !(g.msie && s >= 10)),
					u = !1;
					i.log = console.warn.bind(console),
					e = c.window || c,
					f = e.navigator || {}
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				bowser: 40,
				debug: 33
			}
		],
		37: [function (a, b, c) {
				"use strict";
				function d(a, b) {
					l("new | [pcConfig:%o, pcConstraints:%o]", a, b),
					e.call(this, a),
					this.pcConstraints = b,
					this.ourLocalDescription = null,
					this.ourSignalingState = null,
					this.ourIceConnectionState = null,
					this.ourIceGatheringState = null,
					this.timerGatheringTimeout = null,
					this.timerGatheringTimeoutAfterRelay = null,
					this.ignoreIceGathering = !1,
					this.closed = !1,
					h.call(this),
					j.call(this)
				}
				function e(a) {
					this.pcConfig = k(!0, a),
					n.fixPeerConnectionConfig(this.pcConfig),
					this.options = {
						iceTransportsRelay: "relay" === this.pcConfig.iceTransports,
						iceTransportsNone: "none" === this.pcConfig.iceTransports,
						gatheringTimeout: this.pcConfig.gatheringTimeout,
						gatheringTimeoutAfterRelay: this.pcConfig.gatheringTimeoutAfterRelay
					},
					delete this.pcConfig.gatheringTimeout,
					delete this.pcConfig.gatheringTimeoutAfterRelay,
					l("setConfigurationAndOptions | processed pcConfig: %o", this.pcConfig)
				}
				function f() {
					return this.closed || this.pc && "closed" === this.pc.iceConnectionState
				}
				function g() {
					var a = this,
					b = this.pc;
					b.onnegotiationneeded = function (b) {
						f.call(a) || (l("onnegotiationneeded()"), a.onnegotiationneeded && a.onnegotiationneeded(b))
					},
					b.onicecandidate = function (b) {
						var c,
						d,
						e;
						if (!f.call(a) && !a.ignoreIceGathering && !a.options.iceTransportsNone)
							if (c = b.candidate) {
								if (d = o.REGEXP_RELAY_CANDIDATE.test(c.candidate), a.options.iceTransportsRelay && !d)
									return;
								d && !a.timerGatheringTimeoutAfterRelay && "number" == typeof a.options.gatheringTimeoutAfterRelay && (l("onicecandidate() | first relay candidate found, ending gathering in %d ms", a.options.gatheringTimeoutAfterRelay), a.timerGatheringTimeoutAfterRelay = setTimeout(function () {
											f.call(a) || (l("forced end of candidates after timeout"), delete a.timerGatheringTimeoutAfterRelay, clearTimeout(a.timerGatheringTimeout), delete a.timerGatheringTimeout, a.ignoreIceGathering = !0, a.onicecandidate && a.onicecandidate({
													candidate: null
												}, null))
										}, a.options.gatheringTimeoutAfterRelay)),
								e = new n.RTCIceCandidate({
										sdpMid: c.sdpMid,
										sdpMLineIndex: c.sdpMLineIndex,
										candidate: c.candidate
									}),
								null === p.normalizeCandidate && (o.REGEXP_NORMALIZED_CANDIDATE.test(c.candidate) ? p.normalizeCandidate = !1 : (l('onicecandidate() | normalizing ICE candidates syntax (remove "a=" and "\\r\\n")'), p.normalizeCandidate = !0)),
								p.normalizeCandidate && (e.candidate = c.candidate.replace(o.REGEXP_FIX_CANDIDATE, "")),
								l("onicecandidate() | m%d(%s) %s", e.sdpMLineIndex, e.sdpMid || "no mid", e.candidate),
								a.onicecandidate && a.onicecandidate(b, e)
							} else
								l("onicecandidate() | end of candidates"), clearTimeout(a.timerGatheringTimeout), delete a.timerGatheringTimeout, clearTimeout(a.timerGatheringTimeoutAfterRelay), delete a.timerGatheringTimeoutAfterRelay, a.onicecandidate && a.onicecandidate(b, null)
					},
					b.onaddstream = function (b) {
						f.call(a) || (l("onaddstream() | stream: %o", b.stream), a.onaddstream && a.onaddstream(b, b.stream))
					},
					b.onremovestream = function (b) {
						f.call(a) || (l("onremovestream() | stream: %o", b.stream), a.onremovestream && a.onremovestream(b, b.stream))
					},
					b.ondatachannel = function (b) {
						f.call(a) || (l("ondatachannel() | datachannel: %o", b.channel), a.ondatachannel && a.ondatachannel(b, b.channel))
					},
					b.onsignalingstatechange = function (c) {
						b.signalingState !== a.ourSignalingState && (l("onsignalingstatechange() | signalingState: %s", b.signalingState), a.ourSignalingState = b.signalingState, a.onsignalingstatechange && a.onsignalingstatechange(c, b.signalingState))
					},
					b.oniceconnectionstatechange = function (c) {
						b.iceConnectionState !== a.ourIceConnectionState && (l("oniceconnectionstatechange() | iceConnectionState: %s", b.iceConnectionState), a.ourIceConnectionState = b.iceConnectionState, a.oniceconnectionstatechange && a.oniceconnectionstatechange(c, b.iceConnectionState))
					},
					b.onicegatheringstatechange = function (c) {
						f.call(a) || b.iceGatheringState !== a.ourIceGatheringState && (l("onicegatheringstatechange() | iceGatheringState: %s", b.iceGatheringState), a.ourIceGatheringState = b.iceGatheringState, a.onicegatheringstatechange && a.onicegatheringstatechange(c, b.iceGatheringState))
					},
					b.onidentityresult = function (b) {
						f.call(a) || (l("onidentityresult()"), a.onidentityresult && a.onidentityresult(b))
					},
					b.onpeeridentity = function (b) {
						f.call(a) || (l("onpeeridentity()"), a.onpeeridentity && a.onpeeridentity(b))
					},
					b.onidpassertionerror = function (b) {
						f.call(a) || (l("onidpassertionerror()"), a.onidpassertionerror && a.onidpassertionerror(b))
					},
					b.onidpvalidationerror = function (b) {
						f.call(a) || (l("onidpvalidationerror()"), a.onidpvalidationerror && a.onidpvalidationerror(b))
					}
				}
				function h() {
					this.pcConstraints ? this.pc = new n.RTCPeerConnection(this.pcConfig, this.pcConstraints) : this.pc = new n.RTCPeerConnection(this.pcConfig),
					g.call(this)
				}
				function i() {
					var a = this.pc,
					b = this.options,
					c = null;
					return a.localDescription ? (b.iceTransportsRelay ? c = a.localDescription.sdp.replace(o.REGEXP_SDP_NON_RELAY_CANDIDATES, "") : b.iceTransportsNone && (c = a.localDescription.sdp.replace(o.REGEXP_SDP_CANDIDATES, "")), this.ourLocalDescription = new n.RTCSessionDescription({
								type: a.localDescription.type,
								sdp: c || a.localDescription.sdp
							}), this.ourLocalDescription) : (this.ourLocalDescription = null, null)
				}
				function j() {
					var a = this;
					Object.defineProperties(this, {
						peerConnection: {
							get: function () {
								return a.pc
							}
						},
						signalingState: {
							get: function () {
								return a.pc.signalingState
							}
						},
						iceConnectionState: {
							get: function () {
								return a.pc.iceConnectionState
							}
						},
						iceGatheringState: {
							get: function () {
								return a.pc.iceGatheringState
							}
						},
						localDescription: {
							get: function () {
								return i.call(a)
							}
						},
						remoteDescription: {
							get: function () {
								return a.pc.remoteDescription
							}
						},
						peerIdentity: {
							get: function () {
								return a.pc.peerIdentity
							}
						}
					})
				}
				b.exports = d;
				var k = a("merge"),
				l = a("debug")("rtcninja:RTCPeerConnection"),
				m = a("debug")("rtcninja:ERROR:RTCPeerConnection"),
				n = a("./Adapter"),
				o = {
					REGEXP_NORMALIZED_CANDIDATE: new RegExp(/^candidate:/i),
					REGEXP_FIX_CANDIDATE: new RegExp(/(^a=|\r|\n)/gi),
					REGEXP_RELAY_CANDIDATE: new RegExp(/ relay /i),
					REGEXP_SDP_CANDIDATES: new RegExp(/^a=candidate:.*\r\n/gim),
					REGEXP_SDP_NON_RELAY_CANDIDATES: new RegExp(/^a=candidate:(.(?!relay ))*\r\n/gim)
				},
				p = {
					normalizeCandidate: null
				};
				m.log = console.warn.bind(console),
				d.prototype.createOffer = function (a, b, c) {
					l("createOffer()");
					var d = this;
					n.fixRTCOfferOptions(c),
					this.pc.createOffer(function (b) {
						f.call(d) || (l("createOffer() | success"), a && a(b))
					}, function (a) {
						f.call(d) || (m("createOffer() | error:", a), b && b(a))
					}, c)
				},
				d.prototype.createAnswer = function (a, b, c) {
					l("createAnswer()");
					var d = this;
					this.pc.createAnswer(function (b) {
						f.call(d) || (l("createAnswer() | success"), a && a(b))
					}, function (a) {
						f.call(d) || (m("createAnswer() | error:", a), b && b(a))
					}, c)
				},
				d.prototype.setLocalDescription = function (a, b, c) {
					function d() {
						"number" == typeof e.options.gatheringTimeout && "complete" !== e.pc.iceGatheringState && (l("setLocalDescription() | ending gathering in %d ms (gatheringTimeout option)", e.options.gatheringTimeout), e.timerGatheringTimeout = setTimeout(function () {
									f.call(e) || (l("forced end of candidates after gatheringTimeout timeout"), delete e.timerGatheringTimeout, clearTimeout(e.timerGatheringTimeoutAfterRelay), delete e.timerGatheringTimeoutAfterRelay, e.ignoreIceGathering = !0, e.onicecandidate && e.onicecandidate({
											candidate: null
										}, null))
								}, e.options.gatheringTimeout))
					}
					l("setLocalDescription()");
					var e = this;
					this.pc.setLocalDescription(a, function () {
						f.call(e) || (l("setLocalDescription() | success"), clearTimeout(e.timerGatheringTimeout), delete e.timerGatheringTimeout, clearTimeout(e.timerGatheringTimeoutAfterRelay), delete e.timerGatheringTimeoutAfterRelay, d(), b && b())
					}, function (a) {
						f.call(e) || (m("setLocalDescription() | error:", a), c && c(a))
					}),
					this.ignoreIceGathering = !1
				},
				d.prototype.setRemoteDescription = function (a, b, c) {
					l("setRemoteDescription()");
					var d = this;
					this.pc.setRemoteDescription(a, function () {
						f.call(d) || (l("setRemoteDescription() | success"), b && b())
					}, function (a) {
						f.call(d) || (m("setRemoteDescription() | error:", a), c && c(a))
					})
				},
				d.prototype.updateIce = function (a) {
					l("updateIce() | pcConfig: %o", a),
					e.call(this, a),
					this.pc.updateIce(this.pcConfig),
					this.ignoreIceGathering = !1
				},
				d.prototype.addIceCandidate = function (a, b, c) {
					l("addIceCandidate() | candidate: %o", a);
					var d = this;
					this.pc.addIceCandidate(a, function () {
						f.call(d) || (l("addIceCandidate() | success"), b && b())
					}, function (a) {
						f.call(d) || (m("addIceCandidate() | error:", a), c && c(a))
					})
				},
				d.prototype.getConfiguration = function () {
					return l("getConfiguration()"),
					this.pc.getConfiguration()
				},
				d.prototype.getLocalStreams = function () {
					return l("getLocalStreams()"),
					this.pc.getLocalStreams()
				},
				d.prototype.getRemoteStreams = function () {
					return l("getRemoteStreams()"),
					this.pc.getRemoteStreams()
				},
				d.prototype.getStreamById = function (a) {
					return l("getStreamById() | streamId: %s", a),
					this.pc.getStreamById(a)
				},
				d.prototype.addStream = function (a) {
					l("addStream() | stream: %s", a),
					this.pc.addStream(a)
				},
				d.prototype.removeStream = function (a) {
					l("removeStream() | stream: %o", a),
					this.pc.removeStream(a)
				},
				d.prototype.close = function () {
					l("close()"),
					this.closed = !0,
					clearTimeout(this.timerGatheringTimeout),
					delete this.timerGatheringTimeout,
					clearTimeout(this.timerGatheringTimeoutAfterRelay),
					delete this.timerGatheringTimeoutAfterRelay,
					this.pc.close()
				},
				d.prototype.createDataChannel = function () {
					return l("createDataChannel()"),
					this.pc.createDataChannel.apply(this.pc, arguments)
				},
				d.prototype.createDTMFSender = function (a) {
					return l("createDTMFSender()"),
					this.pc.createDTMFSender(a)
				},
				d.prototype.getStats = function () {
					return l("getStats()"),
					this.pc.getStats.apply(this.pc, arguments)
				},
				d.prototype.setIdentityProvider = function () {
					return l("setIdentityProvider()"),
					this.pc.setIdentityProvider.apply(this.pc, arguments)
				},
				d.prototype.getIdentityAssertion = function () {
					return l("getIdentityAssertion()"),
					this.pc.getIdentityAssertion()
				},
				d.prototype.reset = function (a) {
					l("reset() | pcConfig: %o", a);
					var b = this.pc;
					b.onnegotiationneeded = null,
					b.onicecandidate = null,
					b.onaddstream = null,
					b.onremovestream = null,
					b.ondatachannel = null,
					b.onsignalingstatechange = null,
					b.oniceconnectionstatechange = null,
					b.onicegatheringstatechange = null,
					b.onidentityresult = null,
					b.onpeeridentity = null,
					b.onidpassertionerror = null,
					b.onidpvalidationerror = null,
					clearTimeout(this.timerGatheringTimeout),
					delete this.timerGatheringTimeout,
					clearTimeout(this.timerGatheringTimeoutAfterRelay),
					delete this.timerGatheringTimeoutAfterRelay,
					l("reset() | closing current peerConnection"),
					b.close(),
					e.call(this, a),
					h.call(this)
				}
			}, {
				"./Adapter": 36,
				debug: 33,
				merge: 41
			}
		],
		38: [function (a, b, c) {
				"use strict";
				function d(a) {
					var b = i(a || {});
					return k = !0,
					d.RTCPeerConnection = j,
					d.getUserMedia = b.getUserMedia,
					d.RTCSessionDescription = b.RTCSessionDescription,
					d.RTCIceCandidate = b.RTCIceCandidate,
					d.MediaStreamTrack = b.MediaStreamTrack,
					d.getMediaDevices = b.getMediaDevices,
					d.attachMediaStream = b.attachMediaStream,
					d.closeMediaStream = b.closeMediaStream,
					d.canRenegotiate = b.canRenegotiate,
					b.hasWebRTC() ? (f("WebRTC supported"), !0) : (g("WebRTC not supported"), !1)
				}
				b.exports = d;
				var e = a("bowser"),
				f = a("debug")("rtcninja"),
				g = a("debug")("rtcninja:ERROR"),
				h = a("./version"),
				i = a("./Adapter"),
				j = a("./RTCPeerConnection"),
				k = !1;
				g.log = console.warn.bind(console),
				f("version %s", h),
				f("detected browser: %s %s [mobile:%s, tablet:%s, android:%s, ios:%s]", e.name, e.version, !!e.mobile, !!e.tablet, !!e.android, !!e.ios),
				d.hasWebRTC = function () {
					return k || d(),
					i.hasWebRTC()
				},
				Object.defineProperty(d, "version", {
					get: function () {
						return h
					}
				}),
				Object.defineProperty(d, "called", {
					get: function () {
						return k
					}
				}),
				d.debug = a("debug"),
				d.browser = e
			}, {
				"./Adapter": 36,
				"./RTCPeerConnection": 37,
				"./version": 39,
				bowser: 40,
				debug: 33
			}
		],
		39: [function (a, b, c) {
				"use strict";
				b.exports = a("../package.json").version
			}, {
				"../package.json": 42
			}
		],
		40: [function (b, c, d) {
				!function (b, d) {
					"undefined" != typeof c && c.exports ? c.exports = d() : "function" == typeof a && a.amd ? a(d) : this[b] = d()
				}
				("bowser", function () {
					function a(a) {
						function c(b) {
							var c = a.match(b);
							return c && c.length > 1 && c[1] || ""
						}
						function d(b) {
							var c = a.match(b);
							return c && c.length > 1 && c[2] || ""
						}
						var e,
						f = c(/(ipod|iphone|ipad)/i).toLowerCase(),
						g = /like android/i.test(a),
						h = !g && /android/i.test(a),
						i = /nexus\s*[0-6]\s*/i.test(a),
						j = !i && /nexus\s*[0-9]+/i.test(a),
						k = /CrOS/.test(a),
						l = /silk/i.test(a),
						m = /sailfish/i.test(a),
						n = /tizen/i.test(a),
						o = /(web|hpw)os/i.test(a),
						p = /windows phone/i.test(a),
						q = !p && /windows/i.test(a),
						r = !f && !l && /macintosh/i.test(a),
						s = !h && !m && !n && !o && /linux/i.test(a),
						t = c(/edge\/(\d+(\.\d+)?)/i),
						u = c(/version\/(\d+(\.\d+)?)/i),
						v = /tablet/i.test(a),
						w = !v && /[^-]mobi/i.test(a),
						x = /xbox/i.test(a);
						/opera|opr|opios/i.test(a) ? e = {
							name: "Opera",
							opera: b,
							version: u || c(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
						}
						 : /coast/i.test(a) ? e = {
							name: "Opera Coast",
							coast: b,
							version: u || c(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
						}
						 : /yabrowser/i.test(a) ? e = {
							name: "Yandex Browser",
							yandexbrowser: b,
							version: u || c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
						}
						 : /ucbrowser/i.test(a) ? e = {
							name: "UC Browser",
							ucbrowser: b,
							version: c(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
						}
						 : /mxios/i.test(a) ? e = {
							name: "Maxthon",
							maxthon: b,
							version: c(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
						}
						 : /epiphany/i.test(a) ? e = {
							name: "Epiphany",
							epiphany: b,
							version: c(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
						}
						 : /puffin/i.test(a) ? e = {
							name: "Puffin",
							puffin: b,
							version: c(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
						}
						 : /sleipnir/i.test(a) ? e = {
							name: "Sleipnir",
							sleipnir: b,
							version: c(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
						}
						 : /k-meleon/i.test(a) ? e = {
							name: "K-Meleon",
							kMeleon: b,
							version: c(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
						}
						 : p ? (e = {
								name: "Windows Phone",
								windowsphone: b
							}, t ? (e.msedge = b, e.version = t) : (e.msie = b, e.version = c(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(a) ? e = {
							name: "Internet Explorer",
							msie: b,
							version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i)
						}
						 : k ? e = {
							name: "Chrome",
							chromeos: b,
							chromeBook: b,
							chrome: b,
							version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
						}
						 : /chrome.+? edge/i.test(a) ? e = {
							name: "Microsoft Edge",
							msedge: b,
							version: t
						}
						 : /vivaldi/i.test(a) ? e = {
							name: "Vivaldi",
							vivaldi: b,
							version: c(/vivaldi\/(\d+(\.\d+)?)/i) || u
						}
						 : m ? e = {
							name: "Sailfish",
							sailfish: b,
							version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
						}
						 : /seamonkey\//i.test(a) ? e = {
							name: "SeaMonkey",
							seamonkey: b,
							version: c(/seamonkey\/(\d+(\.\d+)?)/i)
						}
						 : /firefox|iceweasel|fxios/i.test(a) ? (e = {
								name: "Firefox",
								firefox: b,
								version: c(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
							}, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(a) && (e.firefoxos = b)) : l ? e = {
							name: "Amazon Silk",
							silk: b,
							version: c(/silk\/(\d+(\.\d+)?)/i)
						}
						 : /phantom/i.test(a) ? e = {
							name: "PhantomJS",
							phantom: b,
							version: c(/phantomjs\/(\d+(\.\d+)?)/i)
						}
						 : /slimerjs/i.test(a) ? e = {
							name: "SlimerJS",
							slimer: b,
							version: c(/slimerjs\/(\d+(\.\d+)?)/i)
						}
						 : /blackberry|\bbb\d+/i.test(a) || /rim\stablet/i.test(a) ? e = {
							name: "BlackBerry",
							blackberry: b,
							version: u || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
						}
						 : o ? (e = {
								name: "WebOS",
								webos: b,
								version: u || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
							}, /touchpad\//i.test(a) && (e.touchpad = b)) : /bada/i.test(a) ? e = {
							name: "Bada",
							bada: b,
							version: c(/dolfin\/(\d+(\.\d+)?)/i)
						}
						 : n ? e = {
							name: "Tizen",
							tizen: b,
							version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || u
						}
						 : /qupzilla/i.test(a) ? e = {
							name: "QupZilla",
							qupzilla: b,
							version: c(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || u
						}
						 : /chromium/i.test(a) ? e = {
							name: "Chromium",
							chromium: b,
							version: c(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || u
						}
						 : /chrome|crios|crmo/i.test(a) ? e = {
							name: "Chrome",
							chrome: b,
							version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
						}
						 : h ? e = {
							name: "Android",
							version: u
						}
						 : /safari|applewebkit/i.test(a) ? (e = {
								name: "Safari",
								safari: b
							}, u && (e.version = u)) : f ? (e = {
								name: "iphone" == f ? "iPhone" : "ipad" == f ? "iPad" : "iPod"
							}, u && (e.version = u)) : e = /googlebot/i.test(a) ? {
							name: "Googlebot",
							googlebot: b,
							version: c(/googlebot\/(\d+(\.\d+))/i) || u
						}
						 : {
							name: c(/^(.*)\/(.*) /),
							version: d(/^(.*)\/(.*) /)
						},
						!e.msedge && /(apple)?webkit/i.test(a) ? (/(apple)?webkit\/537\.36/i.test(a) ? (e.name = e.name || "Blink", e.blink = b) : (e.name = e.name || "Webkit", e.webkit = b), !e.version && u && (e.version = u)) : !e.opera && /gecko\//i.test(a) && (e.name = e.name || "Gecko", e.gecko = b, e.version = e.version || c(/gecko\/(\d+(\.\d+)?)/i)),
						e.msedge || !h && !e.silk ? f ? (e[f] = b, e.ios = b) : r ? e.mac = b : x ? e.xbox = b : q ? e.windows = b : s && (e.linux = b) : e.android = b;
						var y = "";
						e.windowsphone ? y = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : f ? (y = c(/os (\d+([_\s]\d+)*) like mac os x/i), y = y.replace(/[_\s]/g, ".")) : h ? y = c(/android[ \/-](\d+(\.\d+)*)/i) : e.webos ? y = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : e.blackberry ? y = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : e.bada ? y = c(/bada\/(\d+(\.\d+)*)/i) : e.tizen && (y = c(/tizen[\/\s](\d+(\.\d+)*)/i)),
						y && (e.osversion = y);
						var z = y.split(".")[0];
						return v || j || "ipad" == f || h && (3 == z || z >= 4 && !w) || e.silk ? e.tablet = b : (w || "iphone" == f || "ipod" == f || h || i || e.blackberry || e.webos || e.bada) && (e.mobile = b),
						e.msedge || e.msie && e.version >= 10 || e.yandexbrowser && e.version >= 15 || e.vivaldi && e.version >= 1 || e.chrome && e.version >= 20 || e.firefox && e.version >= 20 || e.safari && e.version >= 6 || e.opera && e.version >= 10 || e.ios && e.osversion && e.osversion.split(".")[0] >= 6 || e.blackberry && e.version >= 10.1 ? e.a = b : e.msie && e.version < 10 || e.chrome && e.version < 20 || e.firefox && e.version < 20 || e.safari && e.version < 6 || e.opera && e.version < 10 || e.ios && e.osversion && e.osversion.split(".")[0] < 6 ? e.c = b : e.x = b,
						e
					}
					var b = !0,
					c = a("undefined" != typeof navigator ? navigator.userAgent : "");
					return c.test = function (a) {
						for (var b = 0; b < a.length; ++b) {
							var d = a[b];
							if ("string" == typeof d && d in c)
								return !0
						}
						return !1
					},
					c._detect = a,
					c
				})
			}, {}
		],
		41: [function (a, b, c) {
				!function (a) {
					function c(a, b) {
						if ("object" !== e(a))
							return b;
						for (var d in b)
							"object" === e(a[d]) && "object" === e(b[d]) ? a[d] = c(a[d], b[d]) : a[d] = b[d];
						return a
					}
					function d(a, b, d) {
						var g = d[0],
						h = d.length;
						(a || "object" !== e(g)) && (g = {});
						for (var i = 0; i < h; ++i) {
							var j = d[i],
							k = e(j);
							if ("object" === k)
								for (var l in j) {
									var m = a ? f.clone(j[l]) : j[l];
									b ? g[l] = c(g[l], m) : g[l] = m
								}
						}
						return g
					}
					function e(a) {
						return {}
						.toString.call(a).slice(8, -1).toLowerCase()
					}
					var f = function (a) {
						return d(a === !0, !1, arguments)
					},
					g = "merge";
					f.recursive = function (a) {
						return d(a === !0, !0, arguments)
					},
					f.clone = function (a) {
						var b,
						c,
						d = a,
						g = e(a);
						if ("array" === g)
							for (d = [], c = a.length, b = 0; b < c; ++b)
								d[b] = f.clone(a[b]);
						else if ("object" === g) {
							d = {};
							for (b in a)
								d[b] = f.clone(a[b])
						}
						return d
					},
					a ? b.exports = f : window[g] = f
				}
				("object" == typeof b && b && "object" == typeof b.exports && b.exports)
			}, {}
		],
		42: [function (a, b, c) {
				b.exports = {
					name: "rtcninja",
					version: "0.6.7",
					description: "WebRTC API wrapper to deal with different browsers",
					author: {
						name: "IĂąaki Baz Castillo",
						email: "inaki.baz@eface2face.com",
						url: "http://eface2face.com"
					},
					contributors: [{
							name: "JesĂşs PĂŠrez",
							email: "jesus.perez@eface2face.com"
						}
					],
					license: "MIT",
					main: "lib/rtcninja.js",
					homepage: "https://github.com/eface2face/rtcninja.js",
					repository: {
						type: "git",
						url: "git+https://github.com/eface2face/rtcninja.js.git"
					},
					keywords: ["webrtc"],
					engines: {
						node: ">=0.10.32"
					},
					dependencies: {
						bowser: "^1.2.0",
						debug: "^2.2.0",
						merge: "^1.2.0"
					},
					devDependencies: {
						browserify: "^13.0.1",
						gulp: "git+https://github.com/gulpjs/gulp.git#4.0",
						"gulp-expect-file": "0.0.7",
						"gulp-filelog": "^0.4.1",
						"gulp-header": "^1.8.2",
						"gulp-jscs": "^3.0.2",
						"gulp-jscs-stylish": "^1.4.0",
						"gulp-jshint": "^2.0.1",
						"gulp-rename": "^1.2.2",
						"gulp-uglify": "^1.5.3",
						"jshint-stylish": "^2.2.0",
						"vinyl-source-stream": "^1.1.0"
					},
					gitHead: "d36b02d0503ca152771692935a4096130f28dc5d",
					bugs: {
						url: "https://github.com/eface2face/rtcninja.js/issues"
					},
					_id: "rtcninja@0.6.7",
					scripts: {},
					_shasum: "f7c8855f2c0e41ae08c638375bad1dc977369ec2",
					_from: "rtcninja@>=0.6.7 <0.7.0",
					_npmVersion: "2.14.20",
					_nodeVersion: "4.4.1",
					_npmUser: {
						name: "ibc",
						email: "ibc@aliax.net"
					},
					dist: {
						shasum: "f7c8855f2c0e41ae08c638375bad1dc977369ec2",
						tarball: "https://registry.npmjs.org/rtcninja/-/rtcninja-0.6.7.tgz"
					},
					maintainers: [{
							name: "ibc",
							email: "ibc@aliax.net"
						}
					],
					_npmOperationalInternal: {
						host: "packages-16-east.internal.npmjs.com",
						tmp: "tmp/rtcninja-0.6.7.tgz_1464431140092_0.9943081210367382"
					},
					directories: {},
					_resolved: "https://registry.npmjs.org/rtcninja/-/rtcninja-0.6.7.tgz"
				}
			}, {}
		],
		43: [function (a, b, c) {
				var d = b.exports = {
					v: [{
							name: "version",
							reg: /^(\d*)$/
						}
					],
					o: [{
							name: "origin",
							reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
							names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
							format: "%s %s %d %s IP%d %s"
						}
					],
					s: [{
							name: "name"
						}
					],
					i: [{
							name: "description"
						}
					],
					u: [{
							name: "uri"
						}
					],
					e: [{
							name: "email"
						}
					],
					p: [{
							name: "phone"
						}
					],
					z: [{
							name: "timezones"
						}
					],
					r: [{
							name: "repeats"
						}
					],
					t: [{
							name: "timing",
							reg: /^(\d*) (\d*)/,
							names: ["start", "stop"],
							format: "%d %d"
						}
					],
					c: [{
							name: "connection",
							reg: /^IN IP(\d) (\S*)/,
							names: ["version", "ip"],
							format: "IN IP%d %s"
						}
					],
					b: [{
							push: "bandwidth",
							reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
							names: ["type", "limit"],
							format: "%s:%s"
						}
					],
					m: [{
							reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
							names: ["type", "port", "protocol", "payloads"],
							format: "%s %d %s %s"
						}
					],
					a: [{
							push: "rtp",
							reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
							names: ["payload", "codec", "rate", "encoding"],
							format: function (a) {
								return a.encoding ? "rtpmap:%d %s/%s/%s" : a.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
							}
						}, {
							push: "fmtp",
							reg: /^fmtp:(\d*) ([\S| ]*)/,
							names: ["payload", "config"],
							format: "fmtp:%d %s"
						}, {
							name: "control",
							reg: /^control:(.*)/,
							format: "control:%s"
						}, {
							name: "rtcp",
							reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
							names: ["port", "netType", "ipVer", "address"],
							format: function (a) {
								return null != a.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
							}
						}, {
							push: "rtcpFbTrrInt",
							reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
							names: ["payload", "value"],
							format: "rtcp-fb:%d trr-int %d"
						}, {
							push: "rtcpFb",
							reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
							names: ["payload", "type", "subtype"],
							format: function (a) {
								return null != a.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
							}
						}, {
							push: "ext",
							reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
							names: ["value", "uri", "config"],
							format: function (a) {
								return null != a.config ? "extmap:%s %s %s" : "extmap:%s %s"
							}
						}, {
							push: "crypto",
							reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
							names: ["id", "suite", "config", "sessionConfig"],
							format: function (a) {
								return null != a.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
							}
						}, {
							name: "setup",
							reg: /^setup:(\w*)/,
							format: "setup:%s"
						}, {
							name: "mid",
							reg: /^mid:([^\s]*)/,
							format: "mid:%s"
						}, {
							name: "msid",
							reg: /^msid:(.*)/,
							format: "msid:%s"
						}, {
							name: "ptime",
							reg: /^ptime:(\d*)/,
							format: "ptime:%d"
						}, {
							name: "maxptime",
							reg: /^maxptime:(\d*)/,
							format: "maxptime:%d"
						}, {
							name: "direction",
							reg: /^(sendrecv|recvonly|sendonly|inactive)/
						}, {
							name: "icelite",
							reg: /^(ice-lite)/
						}, {
							name: "iceUfrag",
							reg: /^ice-ufrag:(\S*)/,
							format: "ice-ufrag:%s"
						}, {
							name: "icePwd",
							reg: /^ice-pwd:(\S*)/,
							format: "ice-pwd:%s"
						}, {
							name: "fingerprint",
							reg: /^fingerprint:(\S*) (\S*)/,
							names: ["type", "hash"],
							format: "fingerprint:%s %s"
						}, {
							push: "candidates",
							reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
							names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation"],
							format: function (a) {
								var b = "candidate:%s %d %s %d %s %d typ %s";
								return b += null != a.raddr ? " raddr %s rport %d" : "%v%v",
								b += null != a.tcptype ? " tcptype %s" : "%v",
								null != a.generation && (b += " generation %d"),
								b
							}
						}, {
							name: "endOfCandidates",
							reg: /^(end-of-candidates)/
						}, {
							name: "remoteCandidates",
							reg: /^remote-candidates:(.*)/,
							format: "remote-candidates:%s"
						}, {
							name: "iceOptions",
							reg: /^ice-options:(\S*)/,
							format: "ice-options:%s"
						}, {
							push: "ssrcs",
							reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
							names: ["id", "attribute", "value"],
							format: "ssrc:%d %s:%s"
						}, {
							push: "ssrcGroups",
							reg: /^ssrc-group:(\w*) (.*)/,
							names: ["semantics", "ssrcs"],
							format: "ssrc-group:%s %s"
						}, {
							name: "msidSemantic",
							reg: /^msid-semantic:\s?(\w*) (\S*)/,
							names: ["semantic", "token"],
							format: "msid-semantic: %s %s"
						}, {
							push: "groups",
							reg: /^group:(\w*) (.*)/,
							names: ["type", "mids"],
							format: "group:%s %s"
						}, {
							name: "rtcpMux",
							reg: /^(rtcp-mux)/
						}, {
							name: "rtcpRsize",
							reg: /^(rtcp-rsize)/
						}, {
							name: "sctpmap",
							reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
							names: ["sctpmapNumber", "app", "maxMessageSize"],
							format: function (a) {
								return null != a.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
							}
						}, {
							push: "invalid",
							names: ["value"]
						}
					]
				};
				Object.keys(d).forEach(function (a) {
					var b = d[a];
					b.forEach(function (a) {
						a.reg || (a.reg = /(.*)/),
						a.format || (a.format = "%s")
					})
				})
			}, {}
		],
		44: [function (a, b, c) {
				var d = a("./parser"),
				e = a("./writer");
				c.write = e,
				c.parse = d.parse,
				c.parseFmtpConfig = d.parseFmtpConfig,
				c.parsePayloads = d.parsePayloads,
				c.parseRemoteCandidates = d.parseRemoteCandidates
			}, {
				"./parser": 45,
				"./writer": 46
			}
		],
		45: [function (a, b, c) {
				var d = function (a) {
					return String(Number(a)) === a ? Number(a) : a
				},
				e = function (a, b, c, e) {
					if (e && !c)
						b[e] = d(a[1]);
					else
						for (var f = 0; f < c.length; f += 1)
							null != a[f + 1] && (b[c[f]] = d(a[f + 1]))
				},
				f = function (a, b, c) {
					var d = a.name && a.names;
					a.push && !b[a.push] ? b[a.push] = [] : d && !b[a.name] && (b[a.name] = {});
					var f = a.push ? {}
					 : d ? b[a.name] : b;
					e(c.match(a.reg), f, a.names, a.name),
					a.push && b[a.push].push(f)
				},
				g = a("./grammar"),
				h = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
				c.parse = function (a) {
					var b = {},
					c = [],
					d = b;
					return a.split(/(\r\n|\r|\n)/).filter(h).forEach(function (a) {
						var b = a[0],
						e = a.slice(2);
						"m" === b && (c.push({
								rtp: [],
								fmtp: []
							}), d = c[c.length - 1]);
						for (var h = 0; h < (g[b] || []).length; h += 1) {
							var i = g[b][h];
							if (i.reg.test(e))
								return f(i, d, e)
						}
					}),
					b.media = c,
					b
				};
				var i = function (a, b) {
					var c = b.split(/=(.+)/, 2);
					return 2 === c.length && (a[c[0]] = d(c[1])),
					a
				};
				c.parseFmtpConfig = function (a) {
					return a.split(/\;\s?/).reduce(i, {})
				},
				c.parsePayloads = function (a) {
					return a.split(" ").map(Number)
				},
				c.parseRemoteCandidates = function (a) {
					for (var b = [], c = a.split(" ").map(d), e = 0; e < c.length; e += 3)
						b.push({
							component: c[e],
							ip: c[e + 1],
							port: c[e + 2]
						});
					return b
				}
			}, {
				"./grammar": 43
			}
		],
		46: [function (a, b, c) {
				var d = a("./grammar"),
				e = /%[sdv%]/g,
				f = function (a) {
					var b = 1,
					c = arguments,
					d = c.length;
					return a.replace(e, function (a) {
						if (b >= d)
							return a;
						var e = c[b];
						switch (b += 1, a) {
						case "%%":
							return "%";
						case "%s":
							return String(e);
						case "%d":
							return Number(e);
						case "%v":
							return ""
						}
					})
				},
				g = function (a, b, c) {
					var d = b.format instanceof Function ? b.format(b.push ? c : c[b.name]) : b.format,
					e = [a + "=" + d];
					if (b.names)
						for (var g = 0; g < b.names.length; g += 1) {
							var h = b.names[g];
							b.name ? e.push(c[b.name][h]) : e.push(c[b.names[g]])
						}
					else
						e.push(c[b.name]);
					return f.apply(null, e)
				},
				h = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
				i = ["i", "c", "b", "a"];
				b.exports = function (a, b) {
					b = b || {},
					null == a.version && (a.version = 0),
					null == a.name && (a.name = " "),
					a.media.forEach(function (a) {
						null == a.payloads && (a.payloads = "")
					});
					var c = b.outerOrder || h,
					e = b.innerOrder || i,
					f = [];
					return c.forEach(function (b) {
						d[b].forEach(function (c) {
							c.name in a && null != a[c.name] ? f.push(g(b, c, a)) : c.push in a && null != a[c.push] && a[c.push].forEach(function (a) {
								f.push(g(b, c, a))
							})
						})
					}),
					a.media.forEach(function (a) {
						f.push(g("m", d.m[0], a)),
						e.forEach(function (b) {
							d[b].forEach(function (c) {
								c.name in a && null != a[c.name] ? f.push(g(b, c, a)) : c.push in a && null != a[c.push] && a[c.push].forEach(function (a) {
									f.push(g(b, c, a))
								})
							})
						})
					}),
					f.join("\r\n") + "\r\n"
				}
			}, {
				"./grammar": 43
			}
		],
		47: [function (a, b, c) {
				b.exports = {
					name: "jssip",
					title: "JsSIP",
					description: "the Javascript SIP library",
					version: "2.0.2",
					homepage: "http://jssip.net",
					author: "JosĂŠ Luis MillĂĄn <jmillan@aliax.net> (https://github.com/jmillan)",
					contributors: ["IĂąaki Baz Castillo <ibc@aliax.net> (https://github.com/ibc)", "SaĂşl Ibarra CorretgĂŠ <saghul@gmail.com> (https://github.com/saghul)"],
					main: "lib/JsSIP.js",
					keywords: ["sip", "websocket", "webrtc", "node", "browser", "library"],
					license: "MIT",
					repository: {
						type: "git",
						url: "https://github.com/versatica/JsSIP.git"
					},
					bugs: {
						url: "https://github.com/versatica/JsSIP/issues"
					},
					dependencies: {
						debug: "^2.2.0",
						rtcninja: "^0.6.7",
						"sdp-transform": "^1.6.2"
					},
					devDependencies: {
						browserify: "^13.0.1",
						gulp: "git+https://github.com/gulpjs/gulp.git#4.0",
						"gulp-expect-file": "0.0.7",
						"gulp-header": "1.8.2",
						"gulp-jshint": "^2.0.1",
						"gulp-nodeunit-runner": "^0.2.2",
						"gulp-rename": "^1.2.2",
						"gulp-uglify": "^1.5.3",
						"gulp-util": "^3.0.7",
						jshint: "^2.9.2",
						"jshint-stylish": "^2.2.0",
						pegjs: "0.7.0",
						"vinyl-buffer": "^1.0.0",
						"vinyl-source-stream": "^1.1.0"
					},
					scripts: {
						test: "gulp test"
					}
				}
			}, {}
		]
	}, {}, [7])(7)
}), function (a) {
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = a();
	else if ("function" == typeof define && define.amd)
		define([], a);
	else {
		var b;
		b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
		b.io = a()
	}
}
(function () {
	var a;
	return function b(a, c, d) {
		function e(g, h) {
			if (!c[g]) {
				if (!a[g]) {
					var i = "function" == typeof require && require;
					if (!h && i)
						return i(g, !0);
					if (f)
						return f(g, !0);
					var j = new Error("Cannot find module '" + g + "'");
					throw j.code = "MODULE_NOT_FOUND",
					j
				}
				var k = c[g] = {
					exports: {}
				};
				a[g][0].call(k.exports, function (b) {
					var c = a[g][1][b];
					return e(c ? c : b)
				}, k, k.exports, b, a, c, d)
			}
			return c[g].exports
		}
		for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
			e(d[g]);
		return e
	}
	({
		1: [function (a, b, c) {
				b.exports = a("./lib/")
			}, {
				"./lib/": 2
			}
		],
		2: [function (a, b, c) {
				b.exports = a("./socket"),
				b.exports.parser = a("engine.io-parser")
			}, {
				"./socket": 3,
				"engine.io-parser": 19
			}
		],
		3: [function (a, b, c) {
				(function (c) {
					function d(a, b) {
						if (!(this instanceof d))
							return new d(a, b);
						b = b || {},
						a && "object" == typeof a && (b = a, a = null),
						a ? (a = k(a), b.hostname = a.host, b.secure = "https" == a.protocol || "wss" == a.protocol, b.port = a.port, a.query && (b.query = a.query)) : b.host && (b.hostname = k(b.host).host),
						this.secure = null != b.secure ? b.secure : c.location && "https:" == location.protocol,
						b.hostname && !b.port && (b.port = this.secure ? "443" : "80"),
						this.agent = b.agent || !1,
						this.hostname = b.hostname || (c.location ? location.hostname : "localhost"),
						this.port = b.port || (c.location && location.port ? location.port : this.secure ? 443 : 80),
						this.query = b.query || {},
						"string" == typeof this.query && (this.query = m.decode(this.query)),
						this.upgrade = !1 !== b.upgrade,
						this.path = (b.path || "/engine.io").replace(/\/$/, "") + "/",
						this.forceJSONP = !!b.forceJSONP,
						this.jsonp = !1 !== b.jsonp,
						this.forceBase64 = !!b.forceBase64,
						this.enablesXDR = !!b.enablesXDR,
						this.timestampParam = b.timestampParam || "t",
						this.timestampRequests = b.timestampRequests,
						this.transports = b.transports || ["polling", "websocket"],
						this.readyState = "",
						this.writeBuffer = [],
						this.policyPort = b.policyPort || 843,
						this.rememberUpgrade = b.rememberUpgrade || !1,
						this.binaryType = null,
						this.onlyBinaryUpgrades = b.onlyBinaryUpgrades,
						this.perMessageDeflate = !1 !== b.perMessageDeflate && (b.perMessageDeflate || {}),
						!0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
						this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
						this.pfx = b.pfx || null,
						this.key = b.key || null,
						this.passphrase = b.passphrase || null,
						this.cert = b.cert || null,
						this.ca = b.ca || null,
						this.ciphers = b.ciphers || null,
						this.rejectUnauthorized = void 0 === b.rejectUnauthorized ? null : b.rejectUnauthorized;
						var e = "object" == typeof c && c;
						e.global === e && b.extraHeaders && Object.keys(b.extraHeaders).length > 0 && (this.extraHeaders = b.extraHeaders),
						this.open()
					}
					function e(a) {
						var b = {};
						for (var c in a)
							a.hasOwnProperty(c) && (b[c] = a[c]);
						return b
					}
					var f = a("./transports"),
					g = a("component-emitter"),
					h = a("debug")("engine.io-client:socket"),
					i = a("indexof"),
					j = a("engine.io-parser"),
					k = a("parseuri"),
					l = a("parsejson"),
					m = a("parseqs");
					b.exports = d,
					d.priorWebsocketSuccess = !1,
					g(d.prototype),
					d.protocol = j.protocol,
					d.Socket = d,
					d.Transport = a("./transport"),
					d.transports = a("./transports"),
					d.parser = a("engine.io-parser"),
					d.prototype.createTransport = function (a) {
						h('creating transport "%s"', a);
						var b = e(this.query);
						b.EIO = j.protocol,
						b.transport = a,
						this.id && (b.sid = this.id);
						var c = new f[a]({
								agent: this.agent,
								hostname: this.hostname,
								port: this.port,
								secure: this.secure,
								path: this.path,
								query: b,
								forceJSONP: this.forceJSONP,
								jsonp: this.jsonp,
								forceBase64: this.forceBase64,
								enablesXDR: this.enablesXDR,
								timestampRequests: this.timestampRequests,
								timestampParam: this.timestampParam,
								policyPort: this.policyPort,
								socket: this,
								pfx: this.pfx,
								key: this.key,
								passphrase: this.passphrase,
								cert: this.cert,
								ca: this.ca,
								ciphers: this.ciphers,
								rejectUnauthorized: this.rejectUnauthorized,
								perMessageDeflate: this.perMessageDeflate,
								extraHeaders: this.extraHeaders
							});
						return c
					},
					d.prototype.open = function () {
						var a;
						if (this.rememberUpgrade && d.priorWebsocketSuccess && this.transports.indexOf("websocket") != -1)
							a = "websocket";
						else {
							if (0 === this.transports.length) {
								var b = this;
								return void setTimeout(function () {
									b.emit("error", "No transports available")
								}, 0)
							}
							a = this.transports[0]
						}
						this.readyState = "opening";
						try {
							a = this.createTransport(a)
						} catch (c) {
							return this.transports.shift(),
							void this.open()
						}
						a.open(),
						this.setTransport(a)
					},
					d.prototype.setTransport = function (a) {
						h("setting transport %s", a.name);
						var b = this;
						this.transport && (h("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
						this.transport = a,
						a.on("drain", function () {
							b.onDrain()
						}).on("packet", function (a) {
							b.onPacket(a)
						}).on("error", function (a) {
							b.onError(a)
						}).on("close", function () {
							b.onClose("transport close")
						})
					},
					d.prototype.probe = function (a) {
						function b() {
							if (m.onlyBinaryUpgrades) {
								var b = !this.supportsBinary && m.transport.supportsBinary;
								l = l || b
							}
							l || (h('probe transport "%s" opened', a), k.send([{
											type: "ping",
											data: "probe"
										}
									]), k.once("packet", function (b) {
									if (!l)
										if ("pong" == b.type && "probe" == b.data) {
											if (h('probe transport "%s" pong', a), m.upgrading = !0, m.emit("upgrading", k), !k)
												return;
											d.priorWebsocketSuccess = "websocket" == k.name,
											h('pausing current transport "%s"', m.transport.name),
											m.transport.pause(function () {
												l || "closed" != m.readyState && (h("changing transport and sending upgrade packet"), j(), m.setTransport(k), k.send([{
																type: "upgrade"
															}
														]), m.emit("upgrade", k), k = null, m.upgrading = !1, m.flush())
											})
										} else {
											h('probe transport "%s" failed', a);
											var c = new Error("probe error");
											c.transport = k.name,
											m.emit("upgradeError", c)
										}
								}))
						}
						function c() {
							l || (l = !0, j(), k.close(), k = null)
						}
						function e(b) {
							var d = new Error("probe error: " + b);
							d.transport = k.name,
							c(),
							h('probe transport "%s" failed because of error: %s', a, b),
							m.emit("upgradeError", d)
						}
						function f() {
							e("transport closed")
						}
						function g() {
							e("socket closed")
						}
						function i(a) {
							k && a.name != k.name && (h('"%s" works - aborting "%s"', a.name, k.name), c())
						}
						function j() {
							k.removeListener("open", b),
							k.removeListener("error", e),
							k.removeListener("close", f),
							m.removeListener("close", g),
							m.removeListener("upgrading", i)
						}
						h('probing transport "%s"', a);
						var k = this.createTransport(a, {
								probe: 1
							}),
						l = !1,
						m = this;
						d.priorWebsocketSuccess = !1,
						k.once("open", b),
						k.once("error", e),
						k.once("close", f),
						this.once("close", g),
						this.once("upgrading", i),
						k.open()
					},
					d.prototype.onOpen = function () {
						if (h("socket open"), this.readyState = "open", d.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
							h("starting upgrade probes");
							for (var a = 0, b = this.upgrades.length; a < b; a++)
								this.probe(this.upgrades[a])
						}
					},
					d.prototype.onPacket = function (a) {
						if ("opening" == this.readyState || "open" == this.readyState)
							switch (h('socket receive: type "%s", data "%s"', a.type, a.data), this.emit("packet", a), this.emit("heartbeat"), a.type) {
							case "open":
								this.onHandshake(l(a.data));
								break;
							case "pong":
								this.setPing(),
								this.emit("pong");
								break;
							case "error":
								var b = new Error("server error");
								b.code = a.data,
								this.onError(b);
								break;
							case "message":
								this.emit("data", a.data),
								this.emit("message", a.data)
							}
						else
							h('packet received with socket readyState "%s"', this.readyState)
					},
					d.prototype.onHandshake = function (a) {
						this.emit("handshake", a),
						this.id = a.sid,
						this.transport.query.sid = a.sid,
						this.upgrades = this.filterUpgrades(a.upgrades),
						this.pingInterval = a.pingInterval,
						this.pingTimeout = a.pingTimeout,
						this.onOpen(),
						"closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
					},
					d.prototype.onHeartbeat = function (a) {
						clearTimeout(this.pingTimeoutTimer);
						var b = this;
						b.pingTimeoutTimer = setTimeout(function () {
								"closed" != b.readyState && b.onClose("ping timeout")
							}, a || b.pingInterval + b.pingTimeout)
					},
					d.prototype.setPing = function () {
						var a = this;
						clearTimeout(a.pingIntervalTimer),
						a.pingIntervalTimer = setTimeout(function () {
								h("writing ping packet - expecting pong within %sms", a.pingTimeout),
								a.ping(),
								a.onHeartbeat(a.pingTimeout)
							}, a.pingInterval)
					},
					d.prototype.ping = function () {
						var a = this;
						this.sendPacket("ping", function () {
							a.emit("ping")
						})
					},
					d.prototype.onDrain = function () {
						this.writeBuffer.splice(0, this.prevBufferLen),
						this.prevBufferLen = 0,
						0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
					},
					d.prototype.flush = function () {
						"closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (h("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
					},
					d.prototype.write = d.prototype.send = function (a, b, c) {
						return this.sendPacket("message", a, b, c),
						this
					},
					d.prototype.sendPacket = function (a, b, c, d) {
						if ("function" == typeof b && (d = b, b = void 0), "function" == typeof c && (d = c, c = null), "closing" != this.readyState && "closed" != this.readyState) {
							c = c || {},
							c.compress = !1 !== c.compress;
							var e = {
								type: a,
								data: b,
								options: c
							};
							this.emit("packetCreate", e),
							this.writeBuffer.push(e),
							d && this.once("flush", d),
							this.flush()
						}
					},
					d.prototype.close = function () {
						function a() {
							d.onClose("forced close"),
							h("socket closing - telling transport to close"),
							d.transport.close()
						}
						function b() {
							d.removeListener("upgrade", b),
							d.removeListener("upgradeError", b),
							a()
						}
						function c() {
							d.once("upgrade", b),
							d.once("upgradeError", b)
						}
						if ("opening" == this.readyState || "open" == this.readyState) {
							this.readyState = "closing";
							var d = this;
							this.writeBuffer.length ? this.once("drain", function () {
								this.upgrading ? c() : a()
							}) : this.upgrading ? c() : a()
						}
						return this
					},
					d.prototype.onError = function (a) {
						h("socket error %j", a),
						d.priorWebsocketSuccess = !1,
						this.emit("error", a),
						this.onClose("transport error", a)
					},
					d.prototype.onClose = function (a, b) {
						if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
							h('socket close with reason: "%s"', a);
							var c = this;
							clearTimeout(this.pingIntervalTimer),
							clearTimeout(this.pingTimeoutTimer),
							this.transport.removeAllListeners("close"),
							this.transport.close(),
							this.transport.removeAllListeners(),
							this.readyState = "closed",
							this.id = null,
							this.emit("close", a, b),
							c.writeBuffer = [],
							c.prevBufferLen = 0
						}
					},
					d.prototype.filterUpgrades = function (a) {
						for (var b = [], c = 0, d = a.length; c < d; c++)
							~i(this.transports, a[c]) && b.push(a[c]);
						return b
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./transport": 4,
				"./transports": 5,
				"component-emitter": 15,
				debug: 17,
				"engine.io-parser": 19,
				indexof: 23,
				parsejson: 26,
				parseqs: 27,
				parseuri: 28
			}
		],
		4: [function (a, b, c) {
				function d(a) {
					this.path = a.path,
					this.hostname = a.hostname,
					this.port = a.port,
					this.secure = a.secure,
					this.query = a.query,
					this.timestampParam = a.timestampParam,
					this.timestampRequests = a.timestampRequests,
					this.readyState = "",
					this.agent = a.agent || !1,
					this.socket = a.socket,
					this.enablesXDR = a.enablesXDR,
					this.pfx = a.pfx,
					this.key = a.key,
					this.passphrase = a.passphrase,
					this.cert = a.cert,
					this.ca = a.ca,
					this.ciphers = a.ciphers,
					this.rejectUnauthorized = a.rejectUnauthorized,
					this.extraHeaders = a.extraHeaders
				}
				var e = a("engine.io-parser"),
				f = a("component-emitter");
				b.exports = d,
				f(d.prototype),
				d.prototype.onError = function (a, b) {
					var c = new Error(a);
					return c.type = "TransportError",
					c.description = b,
					this.emit("error", c),
					this
				},
				d.prototype.open = function () {
					return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()),
					this
				},
				d.prototype.close = function () {
					return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()),
					this
				},
				d.prototype.send = function (a) {
					if ("open" != this.readyState)
						throw new Error("Transport not open");
					this.write(a)
				},
				d.prototype.onOpen = function () {
					this.readyState = "open",
					this.writable = !0,
					this.emit("open")
				},
				d.prototype.onData = function (a) {
					var b = e.decodePacket(a, this.socket.binaryType);
					this.onPacket(b)
				},
				d.prototype.onPacket = function (a) {
					this.emit("packet", a)
				},
				d.prototype.onClose = function () {
					this.readyState = "closed",
					this.emit("close")
				}
			}, {
				"component-emitter": 15,
				"engine.io-parser": 19
			}
		],
		5: [function (a, b, c) {
				(function (b) {
					function d(a) {
						var c,
						d = !1,
						h = !1,
						i = !1 !== a.jsonp;
						if (b.location) {
							var j = "https:" == location.protocol,
							k = location.port;
							k || (k = j ? 443 : 80),
							d = a.hostname != location.hostname || k != a.port,
							h = a.secure != j
						}
						if (a.xdomain = d, a.xscheme = h, c = new e(a), "open" in c && !a.forceJSONP)
							return new f(a);
						if (!i)
							throw new Error("JSONP disabled");
						return new g(a)
					}
					var e = a("xmlhttprequest-ssl"),
					f = a("./polling-xhr"),
					g = a("./polling-jsonp"),
					h = a("./websocket");
					c.polling = d,
					c.websocket = h
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./polling-jsonp": 6,
				"./polling-xhr": 7,
				"./websocket": 9,
				"xmlhttprequest-ssl": 10
			}
		],
		6: [function (a, b, c) {
				(function (c) {
					function d() {}
					function e(a) {
						f.call(this, a),
						this.query = this.query || {},
						h || (c.___eio || (c.___eio = []), h = c.___eio),
						this.index = h.length;
						var b = this;
						h.push(function (a) {
							b.onData(a)
						}),
						this.query.j = this.index,
						c.document && c.addEventListener && c.addEventListener("beforeunload", function () {
							b.script && (b.script.onerror = d)
						}, !1)
					}
					var f = a("./polling"),
					g = a("component-inherit");
					b.exports = e;
					var h,
					i = /\n/g,
					j = /\\n/g;
					g(e, f),
					e.prototype.supportsBinary = !1,
					e.prototype.doClose = function () {
						this.script && (this.script.parentNode.removeChild(this.script), this.script = null),
						this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null),
						f.prototype.doClose.call(this)
					},
					e.prototype.doPoll = function () {
						var a = this,
						b = document.createElement("script");
						this.script && (this.script.parentNode.removeChild(this.script), this.script = null),
						b.async = !0,
						b.src = this.uri(),
						b.onerror = function (b) {
							a.onError("jsonp poll error", b)
						};
						var c = document.getElementsByTagName("script")[0];
						c ? c.parentNode.insertBefore(b, c) : (document.head || document.body).appendChild(b),
						this.script = b;
						var d = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
						d && setTimeout(function () {
							var a = document.createElement("iframe");
							document.body.appendChild(a),
							document.body.removeChild(a)
						}, 100)
					},
					e.prototype.doWrite = function (a, b) {
						function c() {
							d(),
							b()
						}
						function d() {
							if (e.iframe)
								try {
									e.form.removeChild(e.iframe)
								} catch (a) {
									e.onError("jsonp polling iframe removal error", a)
								}
							try {
								var b = '<iframe src="javascript:0" name="' + e.iframeId + '">';
								f = document.createElement(b)
							} catch (a) {
								f = document.createElement("iframe"),
								f.name = e.iframeId,
								f.src = "javascript:0"
							}
							f.id = e.iframeId,
							e.form.appendChild(f),
							e.iframe = f
						}
						var e = this;
						if (!this.form) {
							var f,
							g = document.createElement("form"),
							h = document.createElement("textarea"),
							k = this.iframeId = "eio_iframe_" + this.index;
							g.className = "socketio",
							g.style.position = "absolute",
							g.style.top = "-1000px",
							g.style.left = "-1000px",
							g.target = k,
							g.method = "POST",
							g.setAttribute("accept-charset", "utf-8"),
							h.name = "d",
							g.appendChild(h),
							document.body.appendChild(g),
							this.form = g,
							this.area = h
						}
						this.form.action = this.uri(),
						d(),
						a = a.replace(j, "\\\n"),
						this.area.value = a.replace(i, "\\n");
						try {
							this.form.submit()
						} catch (l) {}
						this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
							"complete" == e.iframe.readyState && c()
						}
						 : this.iframe.onload = c
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./polling": 8,
				"component-inherit": 16
			}
		],
		7: [function (a, b, c) {
				(function (c) {
					function d() {}
					function e(a) {
						if (i.call(this, a), c.location) {
							var b = "https:" == location.protocol,
							d = location.port;
							d || (d = b ? 443 : 80),
							this.xd = a.hostname != c.location.hostname || d != a.port,
							this.xs = a.secure != b
						} else
							this.extraHeaders = a.extraHeaders
					}
					function f(a) {
						this.method = a.method || "GET",
						this.uri = a.uri,
						this.xd = !!a.xd,
						this.xs = !!a.xs,
						this.async = !1 !== a.async,
						this.data = void 0 != a.data ? a.data : null,
						this.agent = a.agent,
						this.isBinary = a.isBinary,
						this.supportsBinary = a.supportsBinary,
						this.enablesXDR = a.enablesXDR,
						this.pfx = a.pfx,
						this.key = a.key,
						this.passphrase = a.passphrase,
						this.cert = a.cert,
						this.ca = a.ca,
						this.ciphers = a.ciphers,
						this.rejectUnauthorized = a.rejectUnauthorized,
						this.extraHeaders = a.extraHeaders,
						this.create()
					}
					function g() {
						for (var a in f.requests)
							f.requests.hasOwnProperty(a) && f.requests[a].abort()
					}
					var h = a("xmlhttprequest-ssl"),
					i = a("./polling"),
					j = a("component-emitter"),
					k = a("component-inherit"),
					l = a("debug")("engine.io-client:polling-xhr");
					b.exports = e,
					b.exports.Request = f,
					k(e, i),
					e.prototype.supportsBinary = !0,
					e.prototype.request = function (a) {
						return a = a || {},
						a.uri = this.uri(),
						a.xd = this.xd,
						a.xs = this.xs,
						a.agent = this.agent || !1,
						a.supportsBinary = this.supportsBinary,
						a.enablesXDR = this.enablesXDR,
						a.pfx = this.pfx,
						a.key = this.key,
						a.passphrase = this.passphrase,
						a.cert = this.cert,
						a.ca = this.ca,
						a.ciphers = this.ciphers,
						a.rejectUnauthorized = this.rejectUnauthorized,
						a.extraHeaders = this.extraHeaders,
						new f(a)
					},
					e.prototype.doWrite = function (a, b) {
						var c = "string" != typeof a && void 0 !== a,
						d = this.request({
								method: "POST",
								data: a,
								isBinary: c
							}),
						e = this;
						d.on("success", b),
						d.on("error", function (a) {
							e.onError("xhr post error", a)
						}),
						this.sendXhr = d
					},
					e.prototype.doPoll = function () {
						l("xhr poll");
						var a = this.request(),
						b = this;
						a.on("data", function (a) {
							b.onData(a)
						}),
						a.on("error", function (a) {
							b.onError("xhr poll error", a)
						}),
						this.pollXhr = a
					},
					j(f.prototype),
					f.prototype.create = function () {
						var a = {
							agent: this.agent,
							xdomain: this.xd,
							xscheme: this.xs,
							enablesXDR: this.enablesXDR
						};
						a.pfx = this.pfx,
						a.key = this.key,
						a.passphrase = this.passphrase,
						a.cert = this.cert,
						a.ca = this.ca,
						a.ciphers = this.ciphers,
						a.rejectUnauthorized = this.rejectUnauthorized;
						var b = this.xhr = new h(a),
						d = this;
						try {
							l("xhr open %s: %s", this.method, this.uri),
							b.open(this.method, this.uri, this.async);
							try {
								if (this.extraHeaders) {
									b.setDisableHeaderCheck(!0);
									for (var e in this.extraHeaders)
										this.extraHeaders.hasOwnProperty(e) && b.setRequestHeader(e, this.extraHeaders[e])
								}
							} catch (g) {}
							if (this.supportsBinary && (b.responseType = "arraybuffer"), "POST" == this.method)
								try {
									this.isBinary ? b.setRequestHeader("Content-type", "application/octet-stream") : b.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
								} catch (g) {}
							"withCredentials" in b && (b.withCredentials = !0),
							this.hasXDR() ? (b.onload = function () {
								d.onLoad()
							}, b.onerror = function () {
								d.onError(b.responseText)
							}) : b.onreadystatechange = function () {
								4 == b.readyState && (200 == b.status || 1223 == b.status ? d.onLoad() : setTimeout(function () {
										d.onError(b.status)
									}, 0))
							},
							l("xhr data %s", this.data),
							b.send(this.data)
						} catch (g) {
							return void setTimeout(function () {
								d.onError(g)
							}, 0)
						}
						c.document && (this.index = f.requestsCount++, f.requests[this.index] = this)
					},
					f.prototype.onSuccess = function () {
						this.emit("success"),
						this.cleanup()
					},
					f.prototype.onData = function (a) {
						this.emit("data", a),
						this.onSuccess()
					},
					f.prototype.onError = function (a) {
						this.emit("error", a),
						this.cleanup(!0)
					},
					f.prototype.cleanup = function (a) {
						if ("undefined" != typeof this.xhr && null !== this.xhr) {
							if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = d : this.xhr.onreadystatechange = d, a)
								try {
									this.xhr.abort()
								} catch (b) {}
							c.document && delete f.requests[this.index],
							this.xhr = null
						}
					},
					f.prototype.onLoad = function () {
						var a;
						try {
							var b;
							try {
								b = this.xhr.getResponseHeader("Content-Type").split(";")[0]
							} catch (c) {}
							if ("application/octet-stream" === b)
								a = this.xhr.response;
							else if (this.supportsBinary)
								try {
									a = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
								} catch (c) {
									for (var d = new Uint8Array(this.xhr.response), e = [], f = 0, g = d.length; f < g; f++)
										e.push(d[f]);
									a = String.fromCharCode.apply(null, e)
								}
							else
								a = this.xhr.responseText
						} catch (c) {
							this.onError(c)
						}
						null != a && this.onData(a)
					},
					f.prototype.hasXDR = function () {
						return "undefined" != typeof c.XDomainRequest && !this.xs && this.enablesXDR
					},
					f.prototype.abort = function () {
						this.cleanup()
					},
					c.document && (f.requestsCount = 0, f.requests = {}, c.attachEvent ? c.attachEvent("onunload", g) : c.addEventListener && c.addEventListener("beforeunload", g, !1))
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./polling": 8,
				"component-emitter": 15,
				"component-inherit": 16,
				debug: 17,
				"xmlhttprequest-ssl": 10
			}
		],
		8: [function (a, b, c) {
				function d(a) {
					var b = a && a.forceBase64;
					k && !b || (this.supportsBinary = !1),
					e.call(this, a)
				}
				var e = a("../transport"),
				f = a("parseqs"),
				g = a("engine.io-parser"),
				h = a("component-inherit"),
				i = a("yeast"),
				j = a("debug")("engine.io-client:polling");
				b.exports = d;
				var k = function () {
					var b = a("xmlhttprequest-ssl"),
					c = new b({
							xdomain: !1
						});
					return null != c.responseType
				}
				();
				h(d, e),
				d.prototype.name = "polling",
				d.prototype.doOpen = function () {
					this.poll()
				},
				d.prototype.pause = function (a) {
					function b() {
						j("paused"),
						c.readyState = "paused",
						a()
					}
					var c = this;
					if (this.readyState = "pausing", this.polling || !this.writable) {
						var d = 0;
						this.polling && (j("we are currently polling - waiting to pause"), d++, this.once("pollComplete", function () {
								j("pre-pause polling complete"),
								--d || b()
							})),
						this.writable || (j("we are currently writing - waiting to pause"), d++, this.once("drain", function () {
								j("pre-pause writing complete"),
								--d || b()
							}))
					} else
						b()
				},
				d.prototype.poll = function () {
					j("polling"),
					this.polling = !0,
					this.doPoll(),
					this.emit("poll")
				},
				d.prototype.onData = function (a) {
					var b = this;
					j("polling got data %s", a);
					var c = function (a, c, d) {
						return "opening" == b.readyState && b.onOpen(),
						"close" == a.type ? (b.onClose(), !1) : void b.onPacket(a)
					};
					g.decodePayload(a, this.socket.binaryType, c),
					"closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : j('ignoring poll - transport state "%s"', this.readyState))
				},
				d.prototype.doClose = function () {
					function a() {
						j("writing close packet"),
						b.write([{
									type: "close"
								}
							])
					}
					var b = this;
					"open" == this.readyState ? (j("transport open - closing"), a()) : (j("transport not open - deferring close"), this.once("open", a))
				},
				d.prototype.write = function (a) {
					var b = this;
					this.writable = !1;
					var c = function () {
						b.writable = !0,
						b.emit("drain")
					},
					b = this;
					g.encodePayload(a, this.supportsBinary, function (a) {
						b.doWrite(a, c)
					})
				},
				d.prototype.uri = function () {
					var a = this.query || {},
					b = this.secure ? "https" : "http",
					c = "";
					!1 !== this.timestampRequests && (a[this.timestampParam] = i()),
					this.supportsBinary || a.sid || (a.b64 = 1),
					a = f.encode(a),
					this.port && ("https" == b && 443 != this.port || "http" == b && 80 != this.port) && (c = ":" + this.port),
					a.length && (a = "?" + a);
					var d = this.hostname.indexOf(":") !== -1;
					return b + "://" + (d ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
				}
			}, {
				"../transport": 4,
				"component-inherit": 16,
				debug: 17,
				"engine.io-parser": 19,
				parseqs: 27,
				"xmlhttprequest-ssl": 10,
				yeast: 30
			}
		],
		9: [function (a, b, c) {
				(function (c) {
					function d(a) {
						var b = a && a.forceBase64;
						b && (this.supportsBinary = !1),
						this.perMessageDeflate = a.perMessageDeflate,
						e.call(this, a)
					}
					var e = a("../transport"),
					f = a("engine.io-parser"),
					g = a("parseqs"),
					h = a("component-inherit"),
					i = a("yeast"),
					j = a("debug")("engine.io-client:websocket"),
					k = c.WebSocket || c.MozWebSocket,
					l = k;
					if (!l && "undefined" == typeof window)
						try {
							l = a("ws")
						} catch (m) {}
					b.exports = d,
					h(d, e),
					d.prototype.name = "websocket",
					d.prototype.supportsBinary = !0,
					d.prototype.doOpen = function () {
						if (this.check()) {
							var a = this.uri(),
							b = void 0,
							c = {
								agent: this.agent,
								perMessageDeflate: this.perMessageDeflate
							};
							c.pfx = this.pfx,
							c.key = this.key,
							c.passphrase = this.passphrase,
							c.cert = this.cert,
							c.ca = this.ca,
							c.ciphers = this.ciphers,
							c.rejectUnauthorized = this.rejectUnauthorized,
							this.extraHeaders && (c.headers = this.extraHeaders),
							this.ws = k ? new l(a) : new l(a, b, c),
							void 0 === this.ws.binaryType && (this.supportsBinary = !1),
							this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer",
							this.addEventListeners()
						}
					},
					d.prototype.addEventListeners = function () {
						var a = this;
						this.ws.onopen = function () {
							a.onOpen()
						},
						this.ws.onclose = function () {
							a.onClose()
						},
						this.ws.onmessage = function (b) {
							a.onData(b.data)
						},
						this.ws.onerror = function (b) {
							a.onError("websocket error", b)
						}
					},
					"undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (d.prototype.onData = function (a) {
						var b = this;
						setTimeout(function () {
							e.prototype.onData.call(b, a)
						}, 0)
					}),
					d.prototype.write = function (a) {
						function b() {
							d.emit("flush"),
							setTimeout(function () {
								d.writable = !0,
								d.emit("drain")
							}, 0)
						}
						var d = this;
						this.writable = !1;
						for (var e = a.length, g = 0, h = e; g < h; g++)
							!function (a) {
								f.encodePacket(a, d.supportsBinary, function (f) {
									if (!k) {
										var g = {};
										if (a.options && (g.compress = a.options.compress), d.perMessageDeflate) {
											var h = "string" == typeof f ? c.Buffer.byteLength(f) : f.length;
											h < d.perMessageDeflate.threshold && (g.compress = !1)
										}
									}
									try {
										k ? d.ws.send(f) : d.ws.send(f, g)
									} catch (i) {
										j("websocket closed before onclose event")
									}
									--e || b()
								})
							}
						(a[g])
					},
					d.prototype.onClose = function () {
						e.prototype.onClose.call(this)
					},
					d.prototype.doClose = function () {
						"undefined" != typeof this.ws && this.ws.close()
					},
					d.prototype.uri = function () {
						var a = this.query || {},
						b = this.secure ? "wss" : "ws",
						c = "";
						this.port && ("wss" == b && 443 != this.port || "ws" == b && 80 != this.port) && (c = ":" + this.port),
						this.timestampRequests && (a[this.timestampParam] = i()),
						this.supportsBinary || (a.b64 = 1),
						a = g.encode(a),
						a.length && (a = "?" + a);
						var d = this.hostname.indexOf(":") !== -1;
						return b + "://" + (d ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
					},
					d.prototype.check = function () {
						return !(!l || "__initialize" in l && this.name === d.prototype.name)
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"../transport": 4,
				"component-inherit": 16,
				debug: 17,
				"engine.io-parser": 19,
				parseqs: 27,
				ws: void 0,
				yeast: 30
			}
		],
		10: [function (a, b, c) {
				var d = a("has-cors");
				b.exports = function (a) {
					var b = a.xdomain,
					c = a.xscheme,
					e = a.enablesXDR;
					try {
						if ("undefined" != typeof XMLHttpRequest && (!b || d))
							return new XMLHttpRequest
					} catch (f) {}
					try {
						if ("undefined" != typeof XDomainRequest && !c && e)
							return new XDomainRequest
					} catch (f) {}
					if (!b)
						try {
							return new ActiveXObject("Microsoft.XMLHTTP")
						} catch (f) {}
				}
			}, {
				"has-cors": 22
			}
		],
		11: [function (a, b, c) {
				function d(a, b, c) {
					function d(a, e) {
						if (d.count <= 0)
							throw new Error("after called too many times");
						--d.count,
						a ? (f = !0, b(a), b = c) : 0 !== d.count || f || b(null, e)
					}
					var f = !1;
					return c = c || e,
					d.count = a,
					0 === a ? b() : d
				}
				function e() {}
				b.exports = d
			}, {}
		],
		12: [function (a, b, c) {
				b.exports = function (a, b, c) {
					var d = a.byteLength;
					if (b = b || 0, c = c || d, a.slice)
						return a.slice(b, c);
					if (b < 0 && (b += d), c < 0 && (c += d), c > d && (c = d), b >= d || b >= c || 0 === d)
						return new ArrayBuffer(0);
					for (var e = new Uint8Array(a), f = new Uint8Array(c - b), g = b, h = 0; g < c; g++, h++)
						f[h] = e[g];
					return f.buffer
				}
			}, {}
		],
		13: [function (a, b, c) {
				!function (a) {
					"use strict";
					c.encode = function (b) {
						var c,
						d = new Uint8Array(b),
						e = d.length,
						f = "";
						for (c = 0; c < e; c += 3)
							f += a[d[c] >> 2], f += a[(3 & d[c]) << 4 | d[c + 1] >> 4], f += a[(15 & d[c + 1]) << 2 | d[c + 2] >> 6], f += a[63 & d[c + 2]];
						return e % 3 === 2 ? f = f.substring(0, f.length - 1) + "=" : e % 3 === 1 && (f = f.substring(0, f.length - 2) + "=="),
						f
					},
					c.decode = function (b) {
						var c,
						d,
						e,
						f,
						g,
						h = .75 * b.length,
						i = b.length,
						j = 0;
						"=" === b[b.length - 1] && (h--, "=" === b[b.length - 2] && h--);
						var k = new ArrayBuffer(h),
						l = new Uint8Array(k);
						for (c = 0; c < i; c += 4)
							d = a.indexOf(b[c]), e = a.indexOf(b[c + 1]), f = a.indexOf(b[c + 2]), g = a.indexOf(b[c + 3]), l[j++] = d << 2 | e >> 4, l[j++] = (15 & e) << 4 | f >> 2, l[j++] = (3 & f) << 6 | 63 & g;
						return k
					}
				}
				("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
			}, {}
		],
		14: [function (a, b, c) {
				(function (a) {
					function c(a) {
						for (var b = 0; b < a.length; b++) {
							var c = a[b];
							if (c.buffer instanceof ArrayBuffer) {
								var d = c.buffer;
								if (c.byteLength !== d.byteLength) {
									var e = new Uint8Array(c.byteLength);
									e.set(new Uint8Array(d, c.byteOffset, c.byteLength)),
									d = e.buffer
								}
								a[b] = d
							}
						}
					}
					function d(a, b) {
						b = b || {};
						var d = new f;
						c(a);
						for (var e = 0; e < a.length; e++)
							d.append(a[e]);
						return b.type ? d.getBlob(b.type) : d.getBlob()
					}
					function e(a, b) {
						return c(a),
						new Blob(a, b || {})
					}
					var f = a.BlobBuilder || a.WebKitBlobBuilder || a.MSBlobBuilder || a.MozBlobBuilder,
					g = function () {
						try {
							var a = new Blob(["hi"]);
							return 2 === a.size
						} catch (b) {
							return !1
						}
					}
					(),
					h = g && function () {
						try {
							var a = new Blob([new Uint8Array([1, 2])]);
							return 2 === a.size
						} catch (b) {
							return !1
						}
					}
					(),
					i = f && f.prototype.append && f.prototype.getBlob;
					b.exports = function () {
						return g ? h ? a.Blob : e : i ? d : void 0
					}
					()
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {}
		],
		15: [function (a, b, c) {
				function d(a) {
					if (a)
						return e(a)
				}
				function e(a) {
					for (var b in d.prototype)
						a[b] = d.prototype[b];
					return a
				}
				b.exports = d,
				d.prototype.on = d.prototype.addEventListener = function (a, b) {
					return this._callbacks = this._callbacks || {},
					(this._callbacks[a] = this._callbacks[a] || []).push(b),
					this
				},
				d.prototype.once = function (a, b) {
					function c() {
						d.off(a, c),
						b.apply(this, arguments)
					}
					var d = this;
					return this._callbacks = this._callbacks || {},
					c.fn = b,
					this.on(a, c),
					this
				},
				d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function (a, b) {
					if (this._callbacks = this._callbacks || {}, 0 == arguments.length)
						return this._callbacks = {},
					this;
					var c = this._callbacks[a];
					if (!c)
						return this;
					if (1 == arguments.length)
						return delete this._callbacks[a], this;
					for (var d, e = 0; e < c.length; e++)
						if (d = c[e], d === b || d.fn === b) {
							c.splice(e, 1);
							break
						}
					return this
				},
				d.prototype.emit = function (a) {
					this._callbacks = this._callbacks || {};
					var b = [].slice.call(arguments, 1),
					c = this._callbacks[a];
					if (c) {
						c = c.slice(0);
						for (var d = 0, e = c.length; d < e; ++d)
							c[d].apply(this, b)
					}
					return this
				},
				d.prototype.listeners = function (a) {
					return this._callbacks = this._callbacks || {},
					this._callbacks[a] || []
				},
				d.prototype.hasListeners = function (a) {
					return !!this.listeners(a).length
				}
			}, {}
		],
		16: [function (a, b, c) {
				b.exports = function (a, b) {
					var c = function () {};
					c.prototype = b.prototype,
					a.prototype = new c,
					a.prototype.constructor = a
				}
			}, {}
		],
		17: [function (a, b, c) {
				function d() {
					return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
				}
				function e() {
					var a = arguments,
					b = this.useColors;
					if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + c.humanize(this.diff), !b)
						return a;
					var d = "color: " + this.color;
					a = [a[0], d, "color: inherit"].concat(Array.prototype.slice.call(a, 1));
					var e = 0,
					f = 0;
					return a[0].replace(/%[a-z%]/g, function (a) {
						"%%" !== a && (e++, "%c" === a && (f = e))
					}),
					a.splice(f, 0, d),
					a
				}
				function f() {
					return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
				}
				function g(a) {
					try {
						null == a ? c.storage.removeItem("debug") : c.storage.debug = a
					} catch (b) {}
				}
				function h() {
					var a;
					try {
						a = c.storage.debug
					} catch (b) {}
					return a
				}
				function i() {
					try {
						return window.localStorage
					} catch (a) {}
				}
				c = b.exports = a("./debug"),
				c.log = f,
				c.formatArgs = e,
				c.save = g,
				c.load = h,
				c.useColors = d,
				c.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : i(),
				c.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
				c.formatters.j = function (a) {
					return JSON.stringify(a)
				},
				c.enable(h())
			}, {
				"./debug": 18
			}
		],
		18: [function (a, b, c) {
				function d() {
					return c.colors[k++ % c.colors.length]
				}
				function e(a) {
					function b() {}
					function e() {
						var a = e,
						b = +new Date,
						f = b - (j || b);
						a.diff = f,
						a.prev = j,
						a.curr = b,
						j = b,
						null == a.useColors && (a.useColors = c.useColors()),
						null == a.color && a.useColors && (a.color = d());
						var g = Array.prototype.slice.call(arguments);
						g[0] = c.coerce(g[0]),
						"string" != typeof g[0] && (g = ["%o"].concat(g));
						var h = 0;
						g[0] = g[0].replace(/%([a-z%])/g, function (b, d) {
								if ("%%" === b)
									return b;
								h++;
								var e = c.formatters[d];
								if ("function" == typeof e) {
									var f = g[h];
									b = e.call(a, f),
									g.splice(h, 1),
									h--
								}
								return b
							}),
						"function" == typeof c.formatArgs && (g = c.formatArgs.apply(a, g));
						var i = e.log || c.log || console.log.bind(console);
						i.apply(a, g)
					}
					b.enabled = !1,
					e.enabled = !0;
					var f = c.enabled(a) ? e : b;
					return f.namespace = a,
					f
				}
				function f(a) {
					c.save(a);
					for (var b = (a || "").split(/[\s,]+/), d = b.length, e = 0; e < d; e++)
						b[e] && (a = b[e].replace(/\*/g, ".*?"), "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$")))
				}
				function g() {
					c.enable("")
				}
				function h(a) {
					var b,
					d;
					for (b = 0, d = c.skips.length; b < d; b++)
						if (c.skips[b].test(a))
							return !1;
					for (b = 0, d = c.names.length; b < d; b++)
						if (c.names[b].test(a))
							return !0;
					return !1
				}
				function i(a) {
					return a instanceof Error ? a.stack || a.message : a
				}
				c = b.exports = e,
				c.coerce = i,
				c.disable = g,
				c.enable = f,
				c.enabled = h,
				c.humanize = a("ms"),
				c.names = [],
				c.skips = [],
				c.formatters = {};
				var j,
				k = 0
			}, {
				ms: 25
			}
		],
		19: [function (a, b, c) {
				(function (b) {
					function d(a, b) {
						var d = "b" + c.packets[a.type] + a.data.data;
						return b(d)
					}
					function e(a, b, d) {
						if (!b)
							return c.encodeBase64Packet(a, d);
						var e = a.data,
						f = new Uint8Array(e),
						g = new Uint8Array(1 + e.byteLength);
						g[0] = r[a.type];
						for (var h = 0; h < f.length; h++)
							g[h + 1] = f[h];
						return d(g.buffer)
					}
					function f(a, b, d) {
						if (!b)
							return c.encodeBase64Packet(a, d);
						var e = new FileReader;
						return e.onload = function () {
							a.data = e.result,
							c.encodePacket(a, b, !0, d)
						},
						e.readAsArrayBuffer(a.data)
					}
					function g(a, b, d) {
						if (!b)
							return c.encodeBase64Packet(a, d);
						if (q)
							return f(a, b, d);
						var e = new Uint8Array(1);
						e[0] = r[a.type];
						var g = new u([e.buffer, a.data]);
						return d(g)
					}
					function h(a, b, c) {
						for (var d = new Array(a.length), e = m(a.length, c), f = function (a, c, e) {
							b(c, function (b, c) {
								d[a] = c,
								e(b, d)
							})
						}, g = 0; g < a.length; g++)
							f(g, a[g], e)
					}
					var i = a("./keys"),
					j = a("has-binary"),
					k = a("arraybuffer.slice"),
					l = a("base64-arraybuffer"),
					m = a("after"),
					n = a("utf8"),
					o = navigator.userAgent.match(/Android/i),
					p = /PhantomJS/i.test(navigator.userAgent),
					q = o || p;
					c.protocol = 3;
					var r = c.packets = {
						open: 0,
						close: 1,
						ping: 2,
						pong: 3,
						message: 4,
						upgrade: 5,
						noop: 6
					},
					s = i(r),
					t = {
						type: "error",
						data: "parser error"
					},
					u = a("blob");
					c.encodePacket = function (a, c, f, h) {
						"function" == typeof c && (h = c, c = !1),
						"function" == typeof f && (h = f, f = null);
						var i = void 0 === a.data ? void 0 : a.data.buffer || a.data;
						if (b.ArrayBuffer && i instanceof ArrayBuffer)
							return e(a, c, h);
						if (u && i instanceof b.Blob)
							return g(a, c, h);
						if (i && i.base64)
							return d(a, h);
						var j = r[a.type];
						return void 0 !== a.data && (j += f ? n.encode(String(a.data)) : String(a.data)),
						h("" + j)
					},
					c.encodeBase64Packet = function (a, d) {
						var e = "b" + c.packets[a.type];
						if (u && a.data instanceof b.Blob) {
							var f = new FileReader;
							return f.onload = function () {
								var a = f.result.split(",")[1];
								d(e + a)
							},
							f.readAsDataURL(a.data)
						}
						var g;
						try {
							g = String.fromCharCode.apply(null, new Uint8Array(a.data))
						} catch (h) {
							for (var i = new Uint8Array(a.data), j = new Array(i.length), k = 0; k < i.length; k++)
								j[k] = i[k];
							g = String.fromCharCode.apply(null, j)
						}
						return e += b.btoa(g),
						d(e)
					},
					c.decodePacket = function (a, b, d) {
						if ("string" == typeof a || void 0 === a) {
							if ("b" == a.charAt(0))
								return c.decodeBase64Packet(a.substr(1), b);
							if (d)
								try {
									a = n.decode(a);
								} catch (e) {
									return t
								}
							var f = a.charAt(0);
							return Number(f) == f && s[f] ? a.length > 1 ? {
								type: s[f],
								data: a.substring(1)
							}
							 : {
								type: s[f]
							}
							 : t
						}
						var g = new Uint8Array(a),
						f = g[0],
						h = k(a, 1);
						return u && "blob" === b && (h = new u([h])), {
							type: s[f],
							data: h
						}
					},
					c.decodeBase64Packet = function (a, c) {
						var d = s[a.charAt(0)];
						if (!b.ArrayBuffer)
							return {
								type: d,
								data: {
									base64: !0,
									data: a.substr(1)
								}
							};
						var e = l.decode(a.substr(1));
						return "blob" === c && u && (e = new u([e])), {
							type: d,
							data: e
						}
					},
					c.encodePayload = function (a, b, d) {
						function e(a) {
							return a.length + ":" + a
						}
						function f(a, d) {
							c.encodePacket(a, !!g && b, !0, function (a) {
								d(null, e(a))
							})
						}
						"function" == typeof b && (d = b, b = null);
						var g = j(a);
						return b && g ? u && !q ? c.encodePayloadAsBlob(a, d) : c.encodePayloadAsArrayBuffer(a, d) : a.length ? void h(a, f, function (a, b) {
							return d(b.join(""))
						}) : d("0:")
					},
					c.decodePayload = function (a, b, d) {
						if ("string" != typeof a)
							return c.decodePayloadAsBinary(a, b, d);
						"function" == typeof b && (d = b, b = null);
						var e;
						if ("" == a)
							return d(t, 0, 1);
						for (var f, g, h = "", i = 0, j = a.length; i < j; i++) {
							var k = a.charAt(i);
							if (":" != k)
								h += k;
							else {
								if ("" == h || h != (f = Number(h)))
									return d(t, 0, 1);
								if (g = a.substr(i + 1, f), h != g.length)
									return d(t, 0, 1);
								if (g.length) {
									if (e = c.decodePacket(g, b, !0), t.type == e.type && t.data == e.data)
										return d(t, 0, 1);
									var l = d(e, i + f, j);
									if (!1 === l)
										return
								}
								i += f,
								h = ""
							}
						}
						return "" != h ? d(t, 0, 1) : void 0
					},
					c.encodePayloadAsArrayBuffer = function (a, b) {
						function d(a, b) {
							c.encodePacket(a, !0, !0, function (a) {
								return b(null, a)
							})
						}
						return a.length ? void h(a, d, function (a, c) {
							var d = c.reduce(function (a, b) {
									var c;
									return c = "string" == typeof b ? b.length : b.byteLength,
									a + c.toString().length + c + 2
								}, 0),
							e = new Uint8Array(d),
							f = 0;
							return c.forEach(function (a) {
								var b = "string" == typeof a,
								c = a;
								if (b) {
									for (var d = new Uint8Array(a.length), g = 0; g < a.length; g++)
										d[g] = a.charCodeAt(g);
									c = d.buffer
								}
								b ? e[f++] = 0 : e[f++] = 1;
								for (var h = c.byteLength.toString(), g = 0; g < h.length; g++)
									e[f++] = parseInt(h[g]);
								e[f++] = 255;
								for (var d = new Uint8Array(c), g = 0; g < d.length; g++)
									e[f++] = d[g]
							}),
							b(e.buffer)
						}) : b(new ArrayBuffer(0))
					},
					c.encodePayloadAsBlob = function (a, b) {
						function d(a, b) {
							c.encodePacket(a, !0, !0, function (a) {
								var c = new Uint8Array(1);
								if (c[0] = 1, "string" == typeof a) {
									for (var d = new Uint8Array(a.length), e = 0; e < a.length; e++)
										d[e] = a.charCodeAt(e);
									a = d.buffer,
									c[0] = 0
								}
								for (var f = a instanceof ArrayBuffer ? a.byteLength : a.size, g = f.toString(), h = new Uint8Array(g.length + 1), e = 0; e < g.length; e++)
									h[e] = parseInt(g[e]);
								if (h[g.length] = 255, u) {
									var i = new u([c.buffer, h.buffer, a]);
									b(null, i)
								}
							})
						}
						h(a, d, function (a, c) {
							return b(new u(c))
						})
					},
					c.decodePayloadAsBinary = function (a, b, d) {
						"function" == typeof b && (d = b, b = null);
						for (var e = a, f = [], g = !1; e.byteLength > 0; ) {
							for (var h = new Uint8Array(e), i = 0 === h[0], j = "", l = 1; 255 != h[l]; l++) {
								if (j.length > 310) {
									g = !0;
									break
								}
								j += h[l]
							}
							if (g)
								return d(t, 0, 1);
							e = k(e, 2 + j.length),
							j = parseInt(j);
							var m = k(e, 0, j);
							if (i)
								try {
									m = String.fromCharCode.apply(null, new Uint8Array(m))
								} catch (n) {
									var o = new Uint8Array(m);
									m = "";
									for (var l = 0; l < o.length; l++)
										m += String.fromCharCode(o[l])
								}
							f.push(m),
							e = k(e, j)
						}
						var p = f.length;
						f.forEach(function (a, e) {
							d(c.decodePacket(a, b, !0), e, p)
						})
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./keys": 20,
				after: 11,
				"arraybuffer.slice": 12,
				"base64-arraybuffer": 13,
				blob: 14,
				"has-binary": 21,
				utf8: 29
			}
		],
		20: [function (a, b, c) {
				b.exports = Object.keys || function (a) {
					var b = [],
					c = Object.prototype.hasOwnProperty;
					for (var d in a)
						c.call(a, d) && b.push(d);
					return b
				}
			}, {}
		],
		21: [function (a, b, c) {
				(function (c) {
					function d(a) {
						function b(a) {
							if (!a)
								return !1;
							if (c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File)
								return !0;
							if (e(a)) {
								for (var d = 0; d < a.length; d++)
									if (b(a[d]))
										return !0
							} else if (a && "object" == typeof a) {
								a.toJSON && (a = a.toJSON());
								for (var f in a)
									if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f]))
										return !0
							}
							return !1
						}
						return b(a)
					}
					var e = a("isarray");
					b.exports = d
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				isarray: 24
			}
		],
		22: [function (a, b, c) {
				try {
					b.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
				} catch (d) {
					b.exports = !1
				}
			}, {}
		],
		23: [function (a, b, c) {
				var d = [].indexOf;
				b.exports = function (a, b) {
					if (d)
						return a.indexOf(b);
					for (var c = 0; c < a.length; ++c)
						if (a[c] === b)
							return c;
					return -1
				}
			}, {}
		],
		24: [function (a, b, c) {
				b.exports = Array.isArray || function (a) {
					return "[object Array]" == Object.prototype.toString.call(a)
				}
			}, {}
		],
		25: [function (a, b, c) {
				function d(a) {
					if (a = "" + a, !(a.length > 1e4)) {
						var b = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a);
						if (b) {
							var c = parseFloat(b[1]),
							d = (b[2] || "ms").toLowerCase();
							switch (d) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return c * l;
							case "days":
							case "day":
							case "d":
								return c * k;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return c * j;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return c * i;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return c * h;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return c
							}
						}
					}
				}
				function e(a) {
					return a >= k ? Math.round(a / k) + "d" : a >= j ? Math.round(a / j) + "h" : a >= i ? Math.round(a / i) + "m" : a >= h ? Math.round(a / h) + "s" : a + "ms"
				}
				function f(a) {
					return g(a, k, "day") || g(a, j, "hour") || g(a, i, "minute") || g(a, h, "second") || a + " ms"
				}
				function g(a, b, c) {
					if (!(a < b))
						return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
				}
				var h = 1e3,
				i = 60 * h,
				j = 60 * i,
				k = 24 * j,
				l = 365.25 * k;
				b.exports = function (a, b) {
					return b = b || {},
					"string" == typeof a ? d(a) : b["long"] ? f(a) : e(a)
				}
			}, {}
		],
		26: [function (a, b, c) {
				(function (a) {
					var c = /^[\],:{}\s]*$/,
					d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
					e = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
					f = /(?:^|:|,)(?:\s*\[)+/g,
					g = /^\s+/,
					h = /\s+$/;
					b.exports = function (b) {
						return "string" == typeof b && b ? (b = b.replace(g, "").replace(h, ""), a.JSON && JSON.parse ? JSON.parse(b) : c.test(b.replace(d, "@").replace(e, "]").replace(f, "")) ? new Function("return " + b)() : void 0) : null
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {}
		],
		27: [function (a, b, c) {
				c.encode = function (a) {
					var b = "";
					for (var c in a)
						a.hasOwnProperty(c) && (b.length && (b += "&"), b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
					return b
				},
				c.decode = function (a) {
					for (var b = {}, c = a.split("&"), d = 0, e = c.length; d < e; d++) {
						var f = c[d].split("=");
						b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
					}
					return b
				}
			}, {}
		],
		28: [function (a, b, c) {
				var d = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
				e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
				b.exports = function (a) {
					var b = a,
					c = a.indexOf("["),
					f = a.indexOf("]");
					c != -1 && f != -1 && (a = a.substring(0, c) + a.substring(c, f).replace(/:/g, ";") + a.substring(f, a.length));
					for (var g = d.exec(a || ""), h = {}, i = 14; i--; )
						h[e[i]] = g[i] || "";
					return c != -1 && f != -1 && (h.source = b, h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"), h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), h.ipv6uri = !0),
					h
				}
			}, {}
		],
		29: [function (b, c, d) {
				(function (b) {
					!function (e) {
						function f(a) {
							for (var b, c, d = [], e = 0, f = a.length; e < f; )
								b = a.charCodeAt(e++), b >= 55296 && b <= 56319 && e < f ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
							return d
						}
						function g(a) {
							for (var b, c = a.length, d = -1, e = ""; ++d < c; )
								b = a[d], b > 65535 && (b -= 65536, e += u(b >>> 10 & 1023 | 55296), b = 56320 | 1023 & b), e += u(b);
							return e
						}
						function h(a) {
							if (a >= 55296 && a <= 57343)
								throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value")
						}
						function i(a, b) {
							return u(a >> b & 63 | 128)
						}
						function j(a) {
							if (0 == (4294967168 & a))
								return u(a);
							var b = "";
							return 0 == (4294965248 & a) ? b = u(a >> 6 & 31 | 192) : 0 == (4294901760 & a) ? (h(a), b = u(a >> 12 & 15 | 224), b += i(a, 6)) : 0 == (4292870144 & a) && (b = u(a >> 18 & 7 | 240), b += i(a, 12), b += i(a, 6)),
							b += u(63 & a | 128)
						}
						function k(a) {
							for (var b, c = f(a), d = c.length, e = -1, g = ""; ++e < d; )
								b = c[e], g += j(b);
							return g
						}
						function l() {
							if (t >= s)
								throw Error("Invalid byte index");
							var a = 255 & r[t];
							if (t++, 128 == (192 & a))
								return 63 & a;
							throw Error("Invalid continuation byte")
						}
						function m() {
							var a,
							b,
							c,
							d,
							e;
							if (t > s)
								throw Error("Invalid byte index");
							if (t == s)
								return !1;
							if (a = 255 & r[t], t++, 0 == (128 & a))
								return a;
							if (192 == (224 & a)) {
								var b = l();
								if (e = (31 & a) << 6 | b, e >= 128)
									return e;
								throw Error("Invalid continuation byte")
							}
							if (224 == (240 & a)) {
								if (b = l(), c = l(), e = (15 & a) << 12 | b << 6 | c, e >= 2048)
									return h(e), e;
								throw Error("Invalid continuation byte")
							}
							if (240 == (248 & a) && (b = l(), c = l(), d = l(), e = (15 & a) << 18 | b << 12 | c << 6 | d, e >= 65536 && e <= 1114111))
								return e;
							throw Error("Invalid UTF-8 detected")
						}
						function n(a) {
							r = f(a),
							s = r.length,
							t = 0;
							for (var b, c = []; (b = m()) !== !1; )
								c.push(b);
							return g(c)
						}
						var o = "object" == typeof d && d,
						p = "object" == typeof c && c && c.exports == o && c,
						q = "object" == typeof b && b;
						q.global !== q && q.window !== q || (e = q);
						var r,
						s,
						t,
						u = String.fromCharCode,
						v = {
							version: "2.0.0",
							encode: k,
							decode: n
						};
						if ("function" == typeof a && "object" == typeof a.amd && a.amd)
							a(function () {
								return v
							});
						else if (o && !o.nodeType)
							if (p)
								p.exports = v;
							else {
								var w = {},
								x = w.hasOwnProperty;
								for (var y in v)
									x.call(v, y) && (o[y] = v[y])
							}
						else
							e.utf8 = v
					}
					(this)
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {}
		],
		30: [function (a, b, c) {
				"use strict";
				function d(a) {
					var b = "";
					do
						b = h[a % i] + b, a = Math.floor(a / i);
					while (a > 0);
					return b
				}
				function e(a) {
					var b = 0;
					for (l = 0; l < a.length; l++)
						b = b * i + j[a.charAt(l)];
					return b
				}
				function f() {
					var a = d(+new Date);
					return a !== g ? (k = 0, g = a) : a + "." + d(k++)
				}
				for (var g, h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = 64, j = {}, k = 0, l = 0; l < i; l++)
					j[h[l]] = l;
				f.encode = d,
				f.decode = e,
				b.exports = f
			}, {}
		],
		31: [function (a, b, c) {
				function d(a, b) {
					"object" == typeof a && (b = a, a = void 0),
					b = b || {};
					var c,
					d = e(a),
					f = d.source,
					j = d.id,
					k = d.path,
					l = i[j] && k in i[j].nsps,
					m = b.forceNew || b["force new connection"] || !1 === b.multiplex || l;
					return m ? (h("ignoring socket cache for %s", f), c = g(f, b)) : (i[j] || (h("new io instance for %s", f), i[j] = g(f, b)), c = i[j]),
					c.socket(d.path)
				}
				var e = a("./url"),
				f = a("socket.io-parser"),
				g = a("./manager"),
				h = a("debug")("socket.io-client");
				b.exports = c = d;
				var i = c.managers = {};
				c.protocol = f.protocol,
				c.connect = d,
				c.Manager = a("./manager"),
				c.Socket = a("./socket")
			}, {
				"./manager": 32,
				"./socket": 34,
				"./url": 35,
				debug: 39,
				"socket.io-parser": 47
			}
		],
		32: [function (a, b, c) {
				function d(a, b) {
					return this instanceof d ? (a && "object" == typeof a && (b = a, a = void 0), b = b || {}, b.path = b.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = b, this.reconnection(b.reconnection !== !1), this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0), this.reconnectionDelay(b.reconnectionDelay || 1e3), this.reconnectionDelayMax(b.reconnectionDelayMax || 5e3), this.randomizationFactor(b.randomizationFactor || .5), this.backoff = new m({
								min: this.reconnectionDelay(),
								max: this.reconnectionDelayMax(),
								jitter: this.randomizationFactor()
							}), this.timeout(null == b.timeout ? 2e4 : b.timeout), this.readyState = "closed", this.uri = a, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new h.Encoder, this.decoder = new h.Decoder, this.autoConnect = b.autoConnect !== !1, void(this.autoConnect && this.open())) : new d(a, b)
				}
				var e = a("engine.io-client"),
				f = a("./socket"),
				g = a("component-emitter"),
				h = a("socket.io-parser"),
				i = a("./on"),
				j = a("component-bind"),
				k = a("debug")("socket.io-client:manager"),
				l = a("indexof"),
				m = a("backo2"),
				n = Object.prototype.hasOwnProperty;
				b.exports = d,
				d.prototype.emitAll = function () {
					this.emit.apply(this, arguments);
					for (var a in this.nsps)
						n.call(this.nsps, a) && this.nsps[a].emit.apply(this.nsps[a], arguments)
				},
				d.prototype.updateSocketIds = function () {
					for (var a in this.nsps)
						n.call(this.nsps, a) && (this.nsps[a].id = this.engine.id)
				},
				g(d.prototype),
				d.prototype.reconnection = function (a) {
					return arguments.length ? (this._reconnection = !!a, this) : this._reconnection
				},
				d.prototype.reconnectionAttempts = function (a) {
					return arguments.length ? (this._reconnectionAttempts = a, this) : this._reconnectionAttempts
				},
				d.prototype.reconnectionDelay = function (a) {
					return arguments.length ? (this._reconnectionDelay = a, this.backoff && this.backoff.setMin(a), this) : this._reconnectionDelay
				},
				d.prototype.randomizationFactor = function (a) {
					return arguments.length ? (this._randomizationFactor = a, this.backoff && this.backoff.setJitter(a), this) : this._randomizationFactor
				},
				d.prototype.reconnectionDelayMax = function (a) {
					return arguments.length ? (this._reconnectionDelayMax = a, this.backoff && this.backoff.setMax(a), this) : this._reconnectionDelayMax
				},
				d.prototype.timeout = function (a) {
					return arguments.length ? (this._timeout = a, this) : this._timeout
				},
				d.prototype.maybeReconnectOnOpen = function () {
					!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
				},
				d.prototype.open = d.prototype.connect = function (a) {
					if (k("readyState %s", this.readyState), ~this.readyState.indexOf("open"))
						return this;
					k("opening %s", this.uri),
					this.engine = e(this.uri, this.opts);
					var b = this.engine,
					c = this;
					this.readyState = "opening",
					this.skipReconnect = !1;
					var d = i(b, "open", function () {
							c.onopen(),
							a && a()
						}),
					f = i(b, "error", function (b) {
							if (k("connect_error"), c.cleanup(), c.readyState = "closed", c.emitAll("connect_error", b), a) {
								var d = new Error("Connection error");
								d.data = b,
								a(d)
							} else
								c.maybeReconnectOnOpen()
						});
					if (!1 !== this._timeout) {
						var g = this._timeout;
						k("connect attempt will timeout after %d", g);
						var h = setTimeout(function () {
								k("connect attempt timed out after %d", g),
								d.destroy(),
								b.close(),
								b.emit("error", "timeout"),
								c.emitAll("connect_timeout", g)
							}, g);
						this.subs.push({
							destroy: function () {
								clearTimeout(h)
							}
						})
					}
					return this.subs.push(d),
					this.subs.push(f),
					this
				},
				d.prototype.onopen = function () {
					k("open"),
					this.cleanup(),
					this.readyState = "open",
					this.emit("open");
					var a = this.engine;
					this.subs.push(i(a, "data", j(this, "ondata"))),
					this.subs.push(i(a, "ping", j(this, "onping"))),
					this.subs.push(i(a, "pong", j(this, "onpong"))),
					this.subs.push(i(a, "error", j(this, "onerror"))),
					this.subs.push(i(a, "close", j(this, "onclose"))),
					this.subs.push(i(this.decoder, "decoded", j(this, "ondecoded")))
				},
				d.prototype.onping = function () {
					this.lastPing = new Date,
					this.emitAll("ping")
				},
				d.prototype.onpong = function () {
					this.emitAll("pong", new Date - this.lastPing)
				},
				d.prototype.ondata = function (a) {
					this.decoder.add(a)
				},
				d.prototype.ondecoded = function (a) {
					this.emit("packet", a)
				},
				d.prototype.onerror = function (a) {
					k("error", a),
					this.emitAll("error", a)
				},
				d.prototype.socket = function (a) {
					function b() {
						~l(d.connecting, c) || d.connecting.push(c)
					}
					var c = this.nsps[a];
					if (!c) {
						c = new f(this, a),
						this.nsps[a] = c;
						var d = this;
						c.on("connecting", b),
						c.on("connect", function () {
							c.id = d.engine.id
						}),
						this.autoConnect && b()
					}
					return c
				},
				d.prototype.destroy = function (a) {
					var b = l(this.connecting, a);
					~b && this.connecting.splice(b, 1),
					this.connecting.length || this.close()
				},
				d.prototype.packet = function (a) {
					k("writing packet %j", a);
					var b = this;
					b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0, this.encoder.encode(a, function (c) {
							for (var d = 0; d < c.length; d++)
								b.engine.write(c[d], a.options);
							b.encoding = !1,
							b.processPacketQueue()
						}))
				},
				d.prototype.processPacketQueue = function () {
					if (this.packetBuffer.length > 0 && !this.encoding) {
						var a = this.packetBuffer.shift();
						this.packet(a)
					}
				},
				d.prototype.cleanup = function () {
					k("cleanup");
					for (var a; a = this.subs.shift(); )
						a.destroy();
					this.packetBuffer = [],
					this.encoding = !1,
					this.lastPing = null,
					this.decoder.destroy()
				},
				d.prototype.close = d.prototype.disconnect = function () {
					k("disconnect"),
					this.skipReconnect = !0,
					this.reconnecting = !1,
					"opening" == this.readyState && this.cleanup(),
					this.backoff.reset(),
					this.readyState = "closed",
					this.engine && this.engine.close()
				},
				d.prototype.onclose = function (a) {
					k("onclose"),
					this.cleanup(),
					this.backoff.reset(),
					this.readyState = "closed",
					this.emit("close", a),
					this._reconnection && !this.skipReconnect && this.reconnect()
				},
				d.prototype.reconnect = function () {
					if (this.reconnecting || this.skipReconnect)
						return this;
					var a = this;
					if (this.backoff.attempts >= this._reconnectionAttempts)
						k("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
					else {
						var b = this.backoff.duration();
						k("will wait %dms before reconnect attempt", b),
						this.reconnecting = !0;
						var c = setTimeout(function () {
								a.skipReconnect || (k("attempting reconnect"), a.emitAll("reconnect_attempt", a.backoff.attempts), a.emitAll("reconnecting", a.backoff.attempts), a.skipReconnect || a.open(function (b) {
										b ? (k("reconnect attempt error"), a.reconnecting = !1, a.reconnect(), a.emitAll("reconnect_error", b.data)) : (k("reconnect success"), a.onreconnect())
									}))
							}, b);
						this.subs.push({
							destroy: function () {
								clearTimeout(c)
							}
						})
					}
				},
				d.prototype.onreconnect = function () {
					var a = this.backoff.attempts;
					this.reconnecting = !1,
					this.backoff.reset(),
					this.updateSocketIds(),
					this.emitAll("reconnect", a)
				}
			}, {
				"./on": 33,
				"./socket": 34,
				backo2: 36,
				"component-bind": 37,
				"component-emitter": 38,
				debug: 39,
				"engine.io-client": 1,
				indexof: 42,
				"socket.io-parser": 47
			}
		],
		33: [function (a, b, c) {
				function d(a, b, c) {
					return a.on(b, c), {
						destroy: function () {
							a.removeListener(b, c)
						}
					}
				}
				b.exports = d
			}, {}
		],
		34: [function (a, b, c) {
				function d(a, b) {
					this.io = a,
					this.nsp = b,
					this.json = this,
					this.ids = 0,
					this.acks = {},
					this.receiveBuffer = [],
					this.sendBuffer = [],
					this.connected = !1,
					this.disconnected = !0,
					this.io.autoConnect && this.open()
				}
				var e = a("socket.io-parser"),
				f = a("component-emitter"),
				g = a("to-array"),
				h = a("./on"),
				i = a("component-bind"),
				j = a("debug")("socket.io-client:socket"),
				k = a("has-binary");
				b.exports = c = d;
				var l = {
					connect: 1,
					connect_error: 1,
					connect_timeout: 1,
					connecting: 1,
					disconnect: 1,
					error: 1,
					reconnect: 1,
					reconnect_attempt: 1,
					reconnect_failed: 1,
					reconnect_error: 1,
					reconnecting: 1,
					ping: 1,
					pong: 1
				},
				m = f.prototype.emit;
				f(d.prototype),
				d.prototype.subEvents = function () {
					if (!this.subs) {
						var a = this.io;
						this.subs = [h(a, "open", i(this, "onopen")), h(a, "packet", i(this, "onpacket")), h(a, "close", i(this, "onclose"))]
					}
				},
				d.prototype.open = d.prototype.connect = function () {
					return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this.emit("connecting"), this)
				},
				d.prototype.send = function () {
					var a = g(arguments);
					return a.unshift("message"),
					this.emit.apply(this, a),
					this
				},
				d.prototype.emit = function (a) {
					if (l.hasOwnProperty(a))
						return m.apply(this, arguments), this;
					var b = g(arguments),
					c = e.EVENT;
					k(b) && (c = e.BINARY_EVENT);
					var d = {
						type: c,
						data: b
					};
					return d.options = {},
					d.options.compress = !this.flags || !1 !== this.flags.compress,
					"function" == typeof b[b.length - 1] && (j("emitting packet with ack id %d", this.ids), this.acks[this.ids] = b.pop(), d.id = this.ids++),
					this.connected ? this.packet(d) : this.sendBuffer.push(d),
					delete this.flags,
					this
				},
				d.prototype.packet = function (a) {
					a.nsp = this.nsp,
					this.io.packet(a)
				},
				d.prototype.onopen = function () {
					j("transport is open - connecting"),
					"/" != this.nsp && this.packet({
						type: e.CONNECT
					})
				},
				d.prototype.onclose = function (a) {
					j("close (%s)", a),
					this.connected = !1,
					this.disconnected = !0,
					delete this.id,
					this.emit("disconnect", a)
				},
				d.prototype.onpacket = function (a) {
					if (a.nsp == this.nsp)
						switch (a.type) {
						case e.CONNECT:
							this.onconnect();
							break;
						case e.EVENT:
							this.onevent(a);
							break;
						case e.BINARY_EVENT:
							this.onevent(a);
							break;
						case e.ACK:
							this.onack(a);
							break;
						case e.BINARY_ACK:
							this.onack(a);
							break;
						case e.DISCONNECT:
							this.ondisconnect();
							break;
						case e.ERROR:
							this.emit("error", a.data)
						}
				},
				d.prototype.onevent = function (a) {
					var b = a.data || [];
					j("emitting event %j", b),
					null != a.id && (j("attaching ack callback to event"), b.push(this.ack(a.id))),
					this.connected ? m.apply(this, b) : this.receiveBuffer.push(b)
				},
				d.prototype.ack = function (a) {
					var b = this,
					c = !1;
					return function () {
						if (!c) {
							c = !0;
							var d = g(arguments);
							j("sending ack %j", d);
							var f = k(d) ? e.BINARY_ACK : e.ACK;
							b.packet({
								type: f,
								id: a,
								data: d
							})
						}
					}
				},
				d.prototype.onack = function (a) {
					var b = this.acks[a.id];
					"function" == typeof b ? (j("calling ack %s with %j", a.id, a.data), b.apply(this, a.data), delete this.acks[a.id]) : j("bad ack %s", a.id)
				},
				d.prototype.onconnect = function () {
					this.connected = !0,
					this.disconnected = !1,
					this.emit("connect"),
					this.emitBuffered()
				},
				d.prototype.emitBuffered = function () {
					var a;
					for (a = 0; a < this.receiveBuffer.length; a++)
						m.apply(this, this.receiveBuffer[a]);
					for (this.receiveBuffer = [], a = 0; a < this.sendBuffer.length; a++)
						this.packet(this.sendBuffer[a]);
					this.sendBuffer = []
				},
				d.prototype.ondisconnect = function () {
					j("server disconnect (%s)", this.nsp),
					this.destroy(),
					this.onclose("io server disconnect")
				},
				d.prototype.destroy = function () {
					if (this.subs) {
						for (var a = 0; a < this.subs.length; a++)
							this.subs[a].destroy();
						this.subs = null
					}
					this.io.destroy(this)
				},
				d.prototype.close = d.prototype.disconnect = function () {
					return this.connected && (j("performing disconnect (%s)", this.nsp), this.packet({
							type: e.DISCONNECT
						})),
					this.destroy(),
					this.connected && this.onclose("io client disconnect"),
					this
				},
				d.prototype.compress = function (a) {
					return this.flags = this.flags || {},
					this.flags.compress = a,
					this
				}
			}, {
				"./on": 33,
				"component-bind": 37,
				"component-emitter": 38,
				debug: 39,
				"has-binary": 41,
				"socket.io-parser": 47,
				"to-array": 51
			}
		],
		35: [function (a, b, c) {
				(function (c) {
					function d(a, b) {
						var d = a,
						b = b || c.location;
						null == a && (a = b.protocol + "//" + b.host),
						"string" == typeof a && ("/" == a.charAt(0) && (a = "/" == a.charAt(1) ? b.protocol + a : b.host + a), /^(https?|wss?):\/\//.test(a) || (f("protocol-less url %s", a), a = "undefined" != typeof b ? b.protocol + "//" + a : "https://" + a), f("parse %s", a), d = e(a)),
						d.port || (/^(http|ws)$/.test(d.protocol) ? d.port = "80" : /^(http|ws)s$/.test(d.protocol) && (d.port = "443")),
						d.path = d.path || "/";
						var g = d.host.indexOf(":") !== -1,
						h = g ? "[" + d.host + "]" : d.host;
						return d.id = d.protocol + "://" + h + ":" + d.port,
						d.href = d.protocol + "://" + h + (b && b.port == d.port ? "" : ":" + d.port),
						d
					}
					var e = a("parseuri"),
					f = a("debug")("socket.io-client:url");
					b.exports = d
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				debug: 39,
				parseuri: 45
			}
		],
		36: [function (a, b, c) {
				function d(a) {
					a = a || {},
					this.ms = a.min || 100,
					this.max = a.max || 1e4,
					this.factor = a.factor || 2,
					this.jitter = a.jitter > 0 && a.jitter <= 1 ? a.jitter : 0,
					this.attempts = 0
				}
				b.exports = d,
				d.prototype.duration = function () {
					var a = this.ms * Math.pow(this.factor, this.attempts++);
					if (this.jitter) {
						var b = Math.random(),
						c = Math.floor(b * this.jitter * a);
						a = 0 == (1 & Math.floor(10 * b)) ? a - c : a + c
					}
					return 0 | Math.min(a, this.max)
				},
				d.prototype.reset = function () {
					this.attempts = 0
				},
				d.prototype.setMin = function (a) {
					this.ms = a
				},
				d.prototype.setMax = function (a) {
					this.max = a
				},
				d.prototype.setJitter = function (a) {
					this.jitter = a
				}
			}, {}
		],
		37: [function (a, b, c) {
				var d = [].slice;
				b.exports = function (a, b) {
					if ("string" == typeof b && (b = a[b]), "function" != typeof b)
						throw new Error("bind() requires a function");
					var c = d.call(arguments, 2);
					return function () {
						return b.apply(a, c.concat(d.call(arguments)))
					}
				}
			}, {}
		],
		38: [function (a, b, c) {
				function d(a) {
					if (a)
						return e(a)
				}
				function e(a) {
					for (var b in d.prototype)
						a[b] = d.prototype[b];
					return a
				}
				b.exports = d,
				d.prototype.on = d.prototype.addEventListener = function (a, b) {
					return this._callbacks = this._callbacks || {},
					(this._callbacks["$" + a] = this._callbacks["$" + a] || []).push(b),
					this
				},
				d.prototype.once = function (a, b) {
					function c() {
						this.off(a, c),
						b.apply(this, arguments)
					}
					return c.fn = b,
					this.on(a, c),
					this
				},
				d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function (a, b) {
					if (this._callbacks = this._callbacks || {}, 0 == arguments.length)
						return this._callbacks = {},
					this;
					var c = this._callbacks["$" + a];
					if (!c)
						return this;
					if (1 == arguments.length)
						return delete this._callbacks["$" + a], this;
					for (var d, e = 0; e < c.length; e++)
						if (d = c[e], d === b || d.fn === b) {
							c.splice(e, 1);
							break
						}
					return this
				},
				d.prototype.emit = function (a) {
					this._callbacks = this._callbacks || {};
					var b = [].slice.call(arguments, 1),
					c = this._callbacks["$" + a];
					if (c) {
						c = c.slice(0);
						for (var d = 0, e = c.length; d < e; ++d)
							c[d].apply(this, b)
					}
					return this
				},
				d.prototype.listeners = function (a) {
					return this._callbacks = this._callbacks || {},
					this._callbacks["$" + a] || []
				},
				d.prototype.hasListeners = function (a) {
					return !!this.listeners(a).length
				}
			}, {}
		],
		39: [function (a, b, c) {
				arguments[4][17][0].apply(c, arguments)
			}, {
				"./debug": 40,
				dup: 17
			}
		],
		40: [function (a, b, c) {
				arguments[4][18][0].apply(c, arguments)
			}, {
				dup: 18,
				ms: 44
			}
		],
		41: [function (a, b, c) {
				(function (c) {
					function d(a) {
						function b(a) {
							if (!a)
								return !1;
							if (c.Buffer && c.Buffer.isBuffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File)
								return !0;
							if (e(a)) {
								for (var d = 0; d < a.length; d++)
									if (b(a[d]))
										return !0
							} else if (a && "object" == typeof a) {
								a.toJSON && "function" == typeof a.toJSON && (a = a.toJSON());
								for (var f in a)
									if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f]))
										return !0
							}
							return !1
						}
						return b(a)
					}
					var e = a("isarray");
					b.exports = d
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				isarray: 43
			}
		],
		42: [function (a, b, c) {
				arguments[4][23][0].apply(c, arguments)
			}, {
				dup: 23
			}
		],
		43: [function (a, b, c) {
				arguments[4][24][0].apply(c, arguments)
			}, {
				dup: 24
			}
		],
		44: [function (a, b, c) {
				arguments[4][25][0].apply(c, arguments)
			}, {
				dup: 25
			}
		],
		45: [function (a, b, c) {
				arguments[4][28][0].apply(c, arguments)
			}, {
				dup: 28
			}
		],
		46: [function (a, b, c) {
				(function (b) {
					var d = a("isarray"),
					e = a("./is-buffer");
					c.deconstructPacket = function (a) {
						function b(a) {
							if (!a)
								return a;
							if (e(a)) {
								var f = {
									_placeholder: !0,
									num: c.length
								};
								return c.push(a),
								f
							}
							if (d(a)) {
								for (var g = new Array(a.length), h = 0; h < a.length; h++)
									g[h] = b(a[h]);
								return g
							}
							if ("object" == typeof a && !(a instanceof Date)) {
								var g = {};
								for (var i in a)
									g[i] = b(a[i]);
								return g
							}
							return a
						}
						var c = [],
						f = a.data,
						g = a;
						return g.data = b(f),
						g.attachments = c.length, {
							packet: g,
							buffers: c
						}
					},
					c.reconstructPacket = function (a, b) {
						function c(a) {
							if (a && a._placeholder) {
								var e = b[a.num];
								return e
							}
							if (d(a)) {
								for (var f = 0; f < a.length; f++)
									a[f] = c(a[f]);
								return a
							}
							if (a && "object" == typeof a) {
								for (var g in a)
									a[g] = c(a[g]);
								return a
							}
							return a
						}
						return a.data = c(a.data),
						a.attachments = void 0,
						a
					},
					c.removeBlobs = function (a, c) {
						function f(a, i, j) {
							if (!a)
								return a;
							if (b.Blob && a instanceof Blob || b.File && a instanceof File) {
								g++;
								var k = new FileReader;
								k.onload = function () {
									j ? j[i] = this.result : h = this.result,
									--g || c(h)
								},
								k.readAsArrayBuffer(a)
							} else if (d(a))
								for (var l = 0; l < a.length; l++)
									f(a[l], l, a);
							else if (a && "object" == typeof a && !e(a))
								for (var m in a)
									f(a[m], m, a)
						}
						var g = 0,
						h = a;
						f(h),
						g || c(h)
					}
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {
				"./is-buffer": 48,
				isarray: 43
			}
		],
		47: [function (a, b, c) {
				function d() {}
				function e(a) {
					var b = "",
					d = !1;
					return b += a.type,
					c.BINARY_EVENT != a.type && c.BINARY_ACK != a.type || (b += a.attachments, b += "-"),
					a.nsp && "/" != a.nsp && (d = !0, b += a.nsp),
					null != a.id && (d && (b += ",", d = !1), b += a.id),
					null != a.data && (d && (b += ","), b += l.stringify(a.data)),
					k("encoded %j as %s", a, b),
					b
				}
				function f(a, b) {
					function c(a) {
						var c = n.deconstructPacket(a),
						d = e(c.packet),
						f = c.buffers;
						f.unshift(d),
						b(f)
					}
					n.removeBlobs(a, c)
				}
				function g() {
					this.reconstructor = null
				}
				function h(a) {
					var b = {},
					d = 0;
					if (b.type = Number(a.charAt(0)), null == c.types[b.type])
						return j();
					if (c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type) {
						for (var e = ""; "-" != a.charAt(++d) && (e += a.charAt(d), d != a.length); );
						if (e != Number(e) || "-" != a.charAt(d))
							throw new Error("Illegal attachments");
						b.attachments = Number(e)
					}
					if ("/" == a.charAt(d + 1))
						for (b.nsp = ""; ++d; ) {
							var f = a.charAt(d);
							if ("," == f)
								break;
							if (b.nsp += f, d == a.length)
								break
						}
					else
						b.nsp = "/";
					var g = a.charAt(d + 1);
					if ("" !== g && Number(g) == g) {
						for (b.id = ""; ++d; ) {
							var f = a.charAt(d);
							if (null == f || Number(f) != f) {
								--d;
								break
							}
							if (b.id += a.charAt(d), d == a.length)
								break
						}
						b.id = Number(b.id)
					}
					if (a.charAt(++d))
						try {
							b.data = l.parse(a.substr(d))
						} catch (h) {
							return j()
						}
					return k("decoded %s as %j", a, b),
					b
				}
				function i(a) {
					this.reconPack = a,
					this.buffers = []
				}
				function j(a) {
					return {
						type: c.ERROR,
						data: "parser error"
					}
				}
				var k = a("debug")("socket.io-parser"),
				l = a("json3"),
				m = (a("isarray"), a("component-emitter")),
				n = a("./binary"),
				o = a("./is-buffer");
				c.protocol = 4,
				c.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"],
				c.CONNECT = 0,
				c.DISCONNECT = 1,
				c.EVENT = 2,
				c.ACK = 3,
				c.ERROR = 4,
				c.BINARY_EVENT = 5,
				c.BINARY_ACK = 6,
				c.Encoder = d,
				c.Decoder = g,
				d.prototype.encode = function (a, b) {
					if (k("encoding packet %j", a), c.BINARY_EVENT == a.type || c.BINARY_ACK == a.type)
						f(a, b);
					else {
						var d = e(a);
						b([d])
					}
				},
				m(g.prototype),
				g.prototype.add = function (a) {
					var b;
					if ("string" == typeof a)
						b = h(a), c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type ? (this.reconstructor = new i(b), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", b)) : this.emit("decoded", b);
					else {
						if (!o(a) && !a.base64)
							throw new Error("Unknown type: " + a);
						if (!this.reconstructor)
							throw new Error("got binary data when not reconstructing a packet");
						b = this.reconstructor.takeBinaryData(a),
						b && (this.reconstructor = null, this.emit("decoded", b))
					}
				},
				g.prototype.destroy = function () {
					this.reconstructor && this.reconstructor.finishedReconstruction()
				},
				i.prototype.takeBinaryData = function (a) {
					if (this.buffers.push(a), this.buffers.length == this.reconPack.attachments) {
						var b = n.reconstructPacket(this.reconPack, this.buffers);
						return this.finishedReconstruction(),
						b
					}
					return null
				},
				i.prototype.finishedReconstruction = function () {
					this.reconPack = null,
					this.buffers = []
				}
			}, {
				"./binary": 46,
				"./is-buffer": 48,
				"component-emitter": 49,
				debug: 39,
				isarray: 43,
				json3: 50
			}
		],
		48: [function (a, b, c) {
				(function (a) {
					function c(b) {
						return a.Buffer && a.Buffer.isBuffer(b) || a.ArrayBuffer && b instanceof ArrayBuffer
					}
					b.exports = c
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {}
		],
		49: [function (a, b, c) {
				arguments[4][15][0].apply(c, arguments)
			}, {
				dup: 15
			}
		],
		50: [function (b, c, d) {
				(function (b) {
					(function () {
						function e(a, b) {
							function c(a) {
								if (c[a] !== q)
									return c[a];
								var e;
								if ("bug-string-char-index" == a)
									e = "a" != "a"[0];
								else if ("json" == a)
									e = c("json-stringify") && c("json-parse");
								else {
									var g,
									h = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
									if ("json-stringify" == a) {
										var i = b.stringify,
										k = "function" == typeof i && t;
										if (k) {
											(g = function () {
												return 1
											}).toJSON = g;
											try {
												k = "0" === i(0) && "0" === i(new d) && '""' == i(new f) && i(s) === q && i(q) === q && i() === q && "1" === i(g) && "[1]" == i([g]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({
														a: [g, !0, !1, null, "\0\b\n\f\r\t"]
													}) == h && "1" === i(null, g) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == i(new j((-1)))
											} catch (l) {
												k = !1
											}
										}
										e = k
									}
									if ("json-parse" == a) {
										var m = b.parse;
										if ("function" == typeof m)
											try {
												if (0 === m("0") && !m(!1)) {
													g = m(h);
													var n = 5 == g.a.length && 1 === g.a[0];
													if (n) {
														try {
															n = !m('"\t"')
														} catch (l) {}
														if (n)
															try {
																n = 1 !== m("01")
															} catch (l) {}
														if (n)
															try {
																n = 1 !== m("1.")
															} catch (l) {}
													}
												}
											} catch (l) {
												n = !1
											}
										e = n
									}
								}
								return c[a] = !!e
							}
							a || (a = i.Object()),
							b || (b = i.Object());
							var d = a.Number || i.Number,
							f = a.String || i.String,
							h = a.Object || i.Object,
							j = a.Date || i.Date,
							k = a.SyntaxError || i.SyntaxError,
							l = a.TypeError || i.TypeError,
							m = a.Math || i.Math,
							n = a.JSON || i.JSON;
							"object" == typeof n && n && (b.stringify = n.stringify, b.parse = n.parse);
							var o,
							p,
							q,
							r = h.prototype,
							s = r.toString,
							t = new j((-0xc782b5b800cec));
							try {
								t = t.getUTCFullYear() == -109252 && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
							} catch (u) {}
							if (!c("json")) {
								var v = "[object Function]",
								w = "[object Date]",
								x = "[object Number]",
								y = "[object String]",
								z = "[object Array]",
								A = "[object Boolean]",
								B = c("bug-string-char-index");
								if (!t)
									var C = m.floor, D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, b) {
										return D[b] + 365 * (a - 1970) + C((a - 1969 + (b =  + (b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
									};
								if ((o = r.hasOwnProperty) || (o = function (a) {
										var b,
										c = {};
										return (c.__proto__ = null, c.__proto__ = {
												toString: 1
											}, c).toString != s ? o = function (a) {
											var b = this.__proto__,
											c = a in(this.__proto__ = null, this);
											return this.__proto__ = b,
											c
										}
										 : (b = c.constructor, o = function (a) {
											var c = (this.constructor || b).prototype;
											return a in this && !(a in c && this[a] === c[a])
										}),
										c = null,
										o.call(this, a)
									}), p = function (a, b) {
									var c,
									d,
									e,
									f = 0;
									(c = function () {
										this.valueOf = 0
									}).prototype.valueOf = 0,
									d = new c;
									for (e in d)
										o.call(d, e)
											 && f++;
										return c = d = null,
										f ? p = 2 == f ? function (a, b) {
											var c,
											d = {},
											e = s.call(a) == v;
											for (c in a)
												e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
										}
										 : function (a, b) {
											var c,
											d,
											e = s.call(a) == v;
											for (c in a)
												e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
											(d || o.call(a, c = "constructor")) && b(c)
										}
										 : (d = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function (a, b) {
											var c,
											e,
											f = s.call(a) == v,
											h = !f && "function" != typeof a.constructor && g[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
											for (c in a)
												f && "prototype" == c || !h.call(a, c) || b(c);
											for (e = d.length; c = d[--e]; h.call(a, c) && b(c));
										}),
										p(a, b)
									}, !c("json-stringify")) {
										var F = {
											92: "\\\\",
											34: '\\"',
											8: "\\b",
											12: "\\f",
											10: "\\n",
											13: "\\r",
											9: "\\t"
										},
										G = "000000",
										H = function (a, b) {
											return (G + (b || 0)).slice(-a)
										},
										I = "\\u00",
										J = function (a) {
											for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); c < d; c++) {
												var g = a.charCodeAt(c);
												switch (g) {
												case 8:
												case 9:
												case 10:
												case 12:
												case 13:
												case 34:
												case 92:
													b += F[g];
													break;
												default:
													if (g < 32) {
														b += I + H(2, g.toString(16));
														break
													}
													b += e ? f[c] : a.charAt(c)
												}
											}
											return b + '"'
										},
										K = function (a, b, c, d, e, f, g) {
											var h,
											i,
											j,
											k,
											m,
											n,
											r,
											t,
											u,
											v,
											B,
											D,
											F,
											G,
											I,
											L;
											try {
												h = b[a]
											} catch (M) {}
											if ("object" == typeof h && h)
												if (i = s.call(h), i != w || o.call(h, "toJSON"))
													"function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a));
												else if (h > -1 / 0 && h < 1 / 0) {
													if (E) {
														for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++);
														for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++);
														m = 1 + m - E(j, k),
														n = (h % 864e5 + 864e5) % 864e5,
														r = C(n / 36e5) % 24,
														t = C(n / 6e4) % 60,
														u = C(n / 1e3) % 60,
														v = n % 1e3
													} else
														j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
													h = (j <= 0 || j >= 1e4 ? (j < 0 ? "-" : "+") + H(6, j < 0 ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
												} else
													h = null;
											if (c && (h = c.call(b, a, h)), null === h)
												return "null";
											if (i = s.call(h), i == A)
												return "" + h;
											if (i == x)
												return h > -1 / 0 && h < 1 / 0 ? "" + h : "null";
											if (i == y)
												return J("" + h);
											if ("object" == typeof h) {
												for (G = g.length; G--; )
													if (g[G] === h)
														throw l();
												if (g.push(h), B = [], I = f, f += e, i == z) {
													for (F = 0, G = h.length; F < G; F++)
														D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D);
													L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
												} else
													p(d || h, function (a) {
														var b = K(a, h, c, d, e, f, g);
														b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
													}), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
												return g.pop(),
												L
											}
										};
										b.stringify = function (a, b, c) {
											var d,
											e,
											f,
											h;
											if (g[typeof b] && b)
												if ((h = s.call(b)) == v)
													e = b;
												else if (h == z) {
													f = {};
													for (var i, j = 0, k = b.length; j < k; i = b[j++], h = s.call(i), (h == y || h == x) && (f[i] = 1));
												}
											if (c)
												if ((h = s.call(c)) == x) {
													if ((c -= c % 1) > 0)
														for (d = "", c > 10 && (c = 10); d.length < c; d += " ");
												} else
													h == y && (d = c.length <= 10 ? c : c.slice(0, 10));
											return K("", (i = {}, i[""] = a, i), e, f, d, "", [])
										}
									}
								if (!c("json-parse")) {
									var L,
									M,
									N = f.fromCharCode,
									O = {
										92: "\\",
										34: '"',
										47: "/",
										98: "\b",
										116: "\t",
										110: "\n",
										102: "\f",
										114: "\r"
									},
									P = function () {
										throw L = M = null,
										k()
									},
									Q = function () {
										for (var a, b, c, d, e, f = M, g = f.length; L < g; )
											switch (e = f.charCodeAt(L)) {
											case 9:
											case 10:
											case 13:
											case 32:
												L++;
												break;
											case 123:
											case 125:
											case 91:
											case 93:
											case 58:
											case 44:
												return a = B ? f.charAt(L) : f[L],
												L++,
												a;
											case 34:
												for (a = "@", L++; L < g; )
													if (e = f.charCodeAt(L), e < 32)
														P();
													else if (92 == e)
														switch (e = f.charCodeAt(++L)) {
														case 92:
														case 34:
														case 47:
														case 98:
														case 116:
														case 110:
														case 102:
														case 114:
															a += O[e],
															L++;
															break;
														case 117:
															for (b = ++L, c = L + 4; L < c; L++)
																e = f.charCodeAt(L), e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70 || P();
															a += N("0x" + f.slice(b, L));
															break;
														default:
															P()
														}
													else {
														if (34 == e)
															break;
														for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e; )
															e = f.charCodeAt(++L);
														a += f.slice(b, L)
													}
												if (34 == f.charCodeAt(L))
													return L++, a;
												P();
											default:
												if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && e <= 57) {
													for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && e <= 57) && P(), d = !1; L < g && (e = f.charCodeAt(L), e >= 48 && e <= 57); L++);
													if (46 == f.charCodeAt(L)) {
														for (c = ++L; c < g && (e = f.charCodeAt(c), e >= 48 && e <= 57); c++);
														c == L && P(),
														L = c
													}
													if (e = f.charCodeAt(L), 101 == e || 69 == e) {
														for (e = f.charCodeAt(++L), 43 != e && 45 != e || L++, c = L; c < g && (e = f.charCodeAt(c), e >= 48 && e <= 57); c++);
														c == L && P(),
														L = c
													}
													return +f.slice(b, L)
												}
												if (d && P(), "true" == f.slice(L, L + 4))
													return L += 4, !0;
												if ("false" == f.slice(L, L + 5))
													return L += 5, !1;
												if ("null" == f.slice(L, L + 4))
													return L += 4, null;
												P()
											}
										return "$"
									},
									R = function (a) {
										var b,
										c;
										if ("$" == a && P(), "string" == typeof a) {
											if ("@" == (B ? a.charAt(0) : a[0]))
												return a.slice(1);
											if ("[" == a) {
												for (b = []; a = Q(), "]" != a; c || (c = !0))
													c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
												return b
											}
											if ("{" == a) {
												for (b = {}; a = Q(), "}" != a; c || (c = !0))
													c && ("," == a ? (a = Q(), "}" == a && P()) : P()), "," != a && "string" == typeof a && "@" == (B ? a.charAt(0) : a[0]) && ":" == Q() || P(), b[a.slice(1)] = R(Q());
												return b
											}
											P()
										}
										return a
									},
									S = function (a, b, c) {
										var d = T(a, b, c);
										d === q ? delete a[b] : a[b] = d
									},
									T = function (a, b, c) {
										var d,
										e = a[b];
										if ("object" == typeof e && e)
											if (s.call(e) == z)
												for (d = e.length; d--; )
													S(e, d, c);
											else
												p(e, function (a) {
													S(e, a, c)
												});
										return c.call(a, b, e)
									};
									b.parse = function (a, b) {
										var c,
										d;
										return L = 0,
										M = "" + a,
										c = R(Q()),
										"$" != Q() && P(),
										L = M = null,
										b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
									}
								}
							}
							return b.runInContext = e,
							b
						}
						var f = "function" == typeof a && a.amd,
						g = {
							"function": !0,
							object: !0
						},
						h = g[typeof d] && d && !d.nodeType && d,
						i = g[typeof window] && window || this,
						j = h && g[typeof c] && c && !c.nodeType && "object" == typeof b && b;
						if (!j || j.global !== j && j.window !== j && j.self !== j || (i = j), h && !f)
							e(i, h);
						else {
							var k = i.JSON,
							l = i.JSON3,
							m = !1,
							n = e(i, i.JSON3 = {
										noConflict: function () {
											return m || (m = !0, i.JSON = k, i.JSON3 = l, k = l = null),
											n
										}
									});
							i.JSON = {
								parse: n.parse,
								stringify: n.stringify
							}
						}
						f && a(function () {
							return n
						})
					}).call(this)
				}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
			}, {}
		],
		51: [function (a, b, c) {
				function d(a, b) {
					var c = [];
					b = b || 0;
					for (var d = b || 0; d < a.length; d++)
						c[d - b] = a[d];
					return c
				}
				b.exports = d
			}, {}
		]
	}, {}, [31])(31)
});
/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 * as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2013
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */
var SUPPORTED_ALGS = 7;
!function (a) {
	"use strict";
	function b(a, b) {
		this.highOrder = a,
		this.lowOrder = b
	}
	function c(a, b) {
		var c,
		d,
		e,
		f = [],
		g = [],
		h = 0;
		if ("UTF8" === b)
			for (d = 0; d < a.length; d += 1)
				for (c = a.charCodeAt(d), g = [], 2048 < c ? (g[0] = 224 | (61440 & c) >>> 12, g[1] = 128 | (4032 & c) >>> 6, g[2] = 128 | 63 & c) : 128 < c ? (g[0] = 192 | (1984 & c) >>> 6, g[1] = 128 | 63 & c) : g[0] = c, e = 0; e < g.length; e += 1)
					f[h >>> 2] |= g[e] << 24 - 8 * (h % 4), h += 1;
		else if ("UTF16" === b)
			for (d = 0; d < a.length; d += 1)
				c = a.charCodeAt(d), f[h >>> 2] |= a.charCodeAt(d) << 16 - 8 * (h % 4), h += 2;
		return {
			value: f,
			binLen: 8 * h
		}
	}
	function d(a) {
		var b,
		c,
		d = [],
		e = a.length;
		if (0 !== e % 2)
			throw "String of HEX type must be in byte increments";
		for (b = 0; b < e; b += 2) {
			if (c = parseInt(a.substr(b, 2), 16), isNaN(c))
				throw "String of HEX type contains invalid characters";
			d[b >>> 3] |= c << 24 - 4 * (b % 8)
		}
		return {
			value: d,
			binLen: 4 * e
		}
	}
	function e(a) {
		var b,
		c,
		d,
		e,
		f,
		g,
		h = [],
		i = 0,
		j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/))
			throw "Invalid character in base-64 string";
		if (g = a.indexOf("="), a = a.replace(/\=/g, ""), -1 !== g && g < a.length)
			throw "Invalid '=' found in base-64 string";
		for (c = 0; c < a.length; c += 4) {
			for (f = a.substr(c, 4), e = 0, d = 0; d < f.length; d += 1)
				b = j.indexOf(f[d]), e |= b << 18 - 6 * d;
			for (d = 0; d < f.length - 1; d += 1)
				h[i >> 2] |= (e >>> 16 - 8 * d & 255) << 24 - 8 * (i % 4), i += 1
		}
		return {
			value: h,
			binLen: 8 * i
		}
	}
	function f(a, b) {
		var c,
		d,
		e = "0123456789abcdef",
		f = "",
		g = 4 * a.length;
		for (c = 0; c < g; c += 1)
			d = a[c >>> 2] >>> 8 * (3 - c % 4), f += e.charAt(d >>> 4 & 15) + e.charAt(15 & d);
		return b.outputUpper ? f.toUpperCase() : f
	}
	function g(a, b) {
		var c,
		d,
		e,
		f = "",
		g = 4 * a.length,
		h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		for (c = 0; c < g; c += 3)
			for (e = (a[c >>> 2] >>> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >>> 2] >>> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >>> 2] >>> 8 * (3 - (c + 2) % 4) & 255, d = 0; d < 4; d += 1)
				f += 8 * c + 6 * d <= 32 * a.length ? h.charAt(e >>> 6 * (3 - d) & 63) : b.b64Pad;
		return f
	}
	function h(a) {
		var b = {
			outputUpper: !1,
			b64Pad: "="
		};
		try {
			a.hasOwnProperty("outputUpper") && (b.outputUpper = a.outputUpper),
			a.hasOwnProperty("b64Pad") && (b.b64Pad = a.b64Pad)
		} catch (c) {}
		if ("boolean" != typeof b.outputUpper)
			throw "Invalid outputUpper formatting option";
		if ("string" != typeof b.b64Pad)
			throw "Invalid b64Pad formatting option";
		return b
	}
	function i(a, b) {
		return a << b | a >>> 32 - b
	}
	function j(a, b) {
		return a >>> b | a << 32 - b
	}
	function k(a, c) {
		var d = null,
		e = new b(a.highOrder, a.lowOrder);
		return d = 32 >= c ? new b(e.highOrder >>> c | e.lowOrder << 32 - c & 4294967295, e.lowOrder >>> c | e.highOrder << 32 - c & 4294967295) : new b(e.lowOrder >>> c - 32 | e.highOrder << 64 - c & 4294967295, e.highOrder >>> c - 32 | e.lowOrder << 64 - c & 4294967295)
	}
	function l(a, b) {
		return a >>> b
	}
	function m(a, c) {
		var d = null;
		return d = 32 >= c ? new b(a.highOrder >>> c, a.lowOrder >>> c | a.highOrder << 32 - c & 4294967295) : new b(0, a.highOrder >>> c - 32)
	}
	function n(a, b, c) {
		return a ^ b ^ c
	}
	function o(a, b, c) {
		return a & b ^ ~a & c
	}
	function p(a, c, d) {
		return new b(a.highOrder & c.highOrder ^ ~a.highOrder & d.highOrder, a.lowOrder & c.lowOrder ^ ~a.lowOrder & d.lowOrder)
	}
	function q(a, b, c) {
		return a & b ^ a & c ^ b & c
	}
	function r(a, c, d) {
		return new b(a.highOrder & c.highOrder ^ a.highOrder & d.highOrder ^ c.highOrder & d.highOrder, a.lowOrder & c.lowOrder ^ a.lowOrder & d.lowOrder ^ c.lowOrder & d.lowOrder)
	}
	function s(a) {
		return j(a, 2) ^ j(a, 13) ^ j(a, 22)
	}
	function t(a) {
		var c = k(a, 28),
		d = k(a, 34),
		e = k(a, 39);
		return new b(c.highOrder ^ d.highOrder ^ e.highOrder, c.lowOrder ^ d.lowOrder ^ e.lowOrder)
	}
	function u(a) {
		return j(a, 6) ^ j(a, 11) ^ j(a, 25)
	}
	function v(a) {
		var c = k(a, 14),
		d = k(a, 18),
		e = k(a, 41);
		return new b(c.highOrder ^ d.highOrder ^ e.highOrder, c.lowOrder ^ d.lowOrder ^ e.lowOrder)
	}
	function w(a) {
		return j(a, 7) ^ j(a, 18) ^ l(a, 3)
	}
	function x(a) {
		var c = k(a, 1),
		d = k(a, 8),
		e = m(a, 7);
		return new b(c.highOrder ^ d.highOrder ^ e.highOrder, c.lowOrder ^ d.lowOrder ^ e.lowOrder)
	}
	function y(a) {
		return j(a, 17) ^ j(a, 19) ^ l(a, 10)
	}
	function z(a) {
		var c = k(a, 19),
		d = k(a, 61),
		e = m(a, 6);
		return new b(c.highOrder ^ d.highOrder ^ e.highOrder, c.lowOrder ^ d.lowOrder ^ e.lowOrder)
	}
	function A(a, b) {
		var c = (65535 & a) + (65535 & b),
		d = (a >>> 16) + (b >>> 16) + (c >>> 16);
		return (65535 & d) << 16 | 65535 & c
	}
	function B(a, b, c, d) {
		var e = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d),
		f = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16);
		return (65535 & f) << 16 | 65535 & e
	}
	function C(a, b, c, d, e) {
		var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e),
		g = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16);
		return (65535 & g) << 16 | 65535 & f
	}
	function D(a, c) {
		var d,
		e,
		f,
		g;
		return d = (65535 & a.lowOrder) + (65535 & c.lowOrder),
		e = (a.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d >>> 16),
		f = (65535 & e) << 16 | 65535 & d,
		d = (65535 & a.highOrder) + (65535 & c.highOrder) + (e >>> 16),
		e = (a.highOrder >>> 16) + (c.highOrder >>> 16) + (d >>> 16),
		g = (65535 & e) << 16 | 65535 & d,
		new b(g, f)
	}
	function E(a, c, d, e) {
		var f,
		g,
		h,
		i;
		return f = (65535 & a.lowOrder) + (65535 & c.lowOrder) + (65535 & d.lowOrder) + (65535 & e.lowOrder),
		g = (a.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f >>> 16),
		h = (65535 & g) << 16 | 65535 & f,
		f = (65535 & a.highOrder) + (65535 & c.highOrder) + (65535 & d.highOrder) + (65535 & e.highOrder) + (g >>> 16),
		g = (a.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (f >>> 16),
		i = (65535 & g) << 16 | 65535 & f,
		new b(i, h)
	}
	function F(a, c, d, e, f) {
		var g,
		h,
		i,
		j;
		return g = (65535 & a.lowOrder) + (65535 & c.lowOrder) + (65535 & d.lowOrder) + (65535 & e.lowOrder) + (65535 & f.lowOrder),
		h = (a.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f.lowOrder >>> 16) + (g >>> 16),
		i = (65535 & h) << 16 | 65535 & g,
		g = (65535 & a.highOrder) + (65535 & c.highOrder) + (65535 & d.highOrder) + (65535 & e.highOrder) + (65535 & f.highOrder) + (h >>> 16),
		h = (a.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (f.highOrder >>> 16) + (g >>> 16),
		j = (65535 & h) << 16 | 65535 & g,
		new b(j, i)
	}
	function G(a, b) {
		var c,
		d,
		e,
		f,
		g,
		h,
		j,
		k,
		l,
		m = [],
		p = o,
		r = n,
		s = q,
		t = i,
		u = A,
		v = C,
		w = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
		for (a[b >>> 5] |= 128 << 24 - b % 32, a[(b + 65 >>> 9 << 4) + 15] = b, l = a.length, j = 0; j < l; j += 16) {
			for (c = w[0], d = w[1], e = w[2], f = w[3], g = w[4], k = 0; k < 80; k += 1)
				k < 16 ? m[k] = a[k + j] : m[k] = t(m[k - 3] ^ m[k - 8] ^ m[k - 14] ^ m[k - 16], 1), h = k < 20 ? v(t(c, 5), p(d, e, f), g, 1518500249, m[k]) : k < 40 ? v(t(c, 5), r(d, e, f), g, 1859775393, m[k]) : k < 60 ? v(t(c, 5), s(d, e, f), g, 2400959708, m[k]) : v(t(c, 5), r(d, e, f), g, 3395469782, m[k]), g = f, f = e, e = t(d, 30), d = c, c = h;
			w[0] = u(c, w[0]),
			w[1] = u(d, w[1]),
			w[2] = u(e, w[2]),
			w[3] = u(f, w[3]),
			w[4] = u(g, w[4])
		}
		return w
	}
	function H(a, c, d) {
		var e,
		f,
		g,
		h,
		i,
		j,
		k,
		l,
		m,
		n,
		G,
		H,
		I,
		J,
		K,
		L,
		M,
		N,
		O,
		P,
		Q,
		R,
		S,
		T,
		U,
		V,
		W,
		X,
		Y,
		Z = [],
		$ = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
		_ = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
		aa = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
		if (("SHA-224" === d || "SHA-256" === d) && 2 & SUPPORTED_ALGS)
			H = 64, I = (c + 65 >>> 9 << 4) + 15, L = 16, M = 1, W = Number, N = A, O = B, P = C, Q = w, R = y, S = s, T = u, V = q, U = o, G = "SHA-224" === d ? _ : aa;
		else {
			if ("SHA-384" !== d && "SHA-512" !== d || !(4 & SUPPORTED_ALGS))
				throw "Unexpected error in SHA-2 implementation";
			H = 80,
			I = (c + 128 >>> 10 << 5) + 31,
			L = 32,
			M = 2,
			W = b,
			N = D,
			O = E,
			P = F,
			Q = x,
			R = z,
			S = t,
			T = v,
			V = r,
			U = p,
			$ = [new W($[0], 3609767458), new W($[1], 602891725), new W($[2], 3964484399), new W($[3], 2173295548), new W($[4], 4081628472), new W($[5], 3053834265), new W($[6], 2937671579), new W($[7], 3664609560), new W($[8], 2734883394), new W($[9], 1164996542), new W($[10], 1323610764), new W($[11], 3590304994), new W($[12], 4068182383), new W($[13], 991336113), new W($[14], 633803317), new W($[15], 3479774868), new W($[16], 2666613458), new W($[17], 944711139), new W($[18], 2341262773), new W($[19], 2007800933), new W($[20], 1495990901), new W($[21], 1856431235), new W($[22], 3175218132), new W($[23], 2198950837), new W($[24], 3999719339), new W($[25], 766784016), new W($[26], 2566594879), new W($[27], 3203337956), new W($[28], 1034457026), new W($[29], 2466948901), new W($[30], 3758326383), new W($[31], 168717936), new W($[32], 1188179964), new W($[33], 1546045734), new W($[34], 1522805485), new W($[35], 2643833823), new W($[36], 2343527390), new W($[37], 1014477480), new W($[38], 1206759142), new W($[39], 344077627), new W($[40], 1290863460), new W($[41], 3158454273), new W($[42], 3505952657), new W($[43], 106217008), new W($[44], 3606008344), new W($[45], 1432725776), new W($[46], 1467031594), new W($[47], 851169720), new W($[48], 3100823752), new W($[49], 1363258195), new W($[50], 3750685593), new W($[51], 3785050280), new W($[52], 3318307427), new W($[53], 3812723403), new W($[54], 2003034995), new W($[55], 3602036899), new W($[56], 1575990012), new W($[57], 1125592928), new W($[58], 2716904306), new W($[59], 442776044), new W($[60], 593698344), new W($[61], 3733110249), new W($[62], 2999351573), new W($[63], 3815920427), new W(3391569614, 3928383900), new W(3515267271, 566280711), new W(3940187606, 3454069534), new W(4118630271, 4000239992), new W(116418474, 1914138554), new W(174292421, 2731055270), new W(289380356, 3203993006), new W(460393269, 320620315), new W(685471733, 587496836), new W(852142971, 1086792851), new W(1017036298, 365543100), new W(1126000580, 2618297676), new W(1288033470, 3409855158), new W(1501505948, 4234509866), new W(1607167915, 987167468), new W(1816402316, 1246189591)],
			G = "SHA-384" === d ? [new W(3418070365, _[0]), new W(1654270250, _[1]), new W(2438529370, _[2]), new W(355462360, _[3]), new W(1731405415, _[4]), new W(41048885895, _[5]), new W(3675008525, _[6]), new W(1203062813, _[7])] : [new W(aa[0], 4089235720), new W(aa[1], 2227873595), new W(aa[2], 4271175723), new W(aa[3], 1595750129), new W(aa[4], 2917565137), new W(aa[5], 725511199), new W(aa[6], 4215389547), new W(aa[7], 327033209)]
		}
		for (a[c >>> 5] |= 128 << 24 - c % 32, a[I] = c, X = a.length, J = 0; J < X; J += L) {
			for (e = G[0], f = G[1], g = G[2], h = G[3], i = G[4], j = G[5], k = G[6], l = G[7], K = 0; K < H; K += 1)
				K < 16 ? Z[K] = new W(a[K * M + J], a[K * M + J + 1]) : Z[K] = O(R(Z[K - 2]), Z[K - 7], Q(Z[K - 15]), Z[K - 16]), m = P(l, T(i), U(i, j, k), $[K], Z[K]), n = N(S(e), V(e, f, g)), l = k, k = j, j = i, i = N(h, m), h = g, g = f, f = e, e = N(m, n);
			G[0] = N(e, G[0]),
			G[1] = N(f, G[1]),
			G[2] = N(g, G[2]),
			G[3] = N(h, G[3]),
			G[4] = N(i, G[4]),
			G[5] = N(j, G[5]),
			G[6] = N(k, G[6]),
			G[7] = N(l, G[7])
		}
		if ("SHA-224" === d && 2 & SUPPORTED_ALGS)
			Y = [G[0], G[1], G[2], G[3], G[4], G[5], G[6]];
		else if ("SHA-256" === d && 2 & SUPPORTED_ALGS)
			Y = G;
		else if ("SHA-384" === d && 4 & SUPPORTED_ALGS)
			Y = [G[0].highOrder, G[0].lowOrder, G[1].highOrder, G[1].lowOrder, G[2].highOrder, G[2].lowOrder, G[3].highOrder, G[3].lowOrder, G[4].highOrder, G[4].lowOrder, G[5].highOrder, G[5].lowOrder];
		else {
			if (!("SHA-512" === d && 4 & SUPPORTED_ALGS))
				throw "Unexpected error in SHA-2 implementation";
			Y = [G[0].highOrder, G[0].lowOrder, G[1].highOrder, G[1].lowOrder, G[2].highOrder, G[2].lowOrder, G[3].highOrder, G[3].lowOrder, G[4].highOrder, G[4].lowOrder, G[5].highOrder, G[5].lowOrder, G[6].highOrder, G[6].lowOrder, G[7].highOrder, G[7].lowOrder]
		}
		return Y
	}
	var I = function (a, b, i) {
		var j = 0,
		k = [0],
		l = "",
		m = null;
		if (l = i || "UTF8", "UTF8" !== l && "UTF16" !== l)
			throw "encoding must be UTF8 or UTF16";
		if ("HEX" === b) {
			if (0 !== a.length % 2)
				throw "srcString of HEX type must be in byte increments";
			m = d(a),
			j = m.binLen,
			k = m.value
		} else if ("ASCII" === b || "TEXT" === b)
			m = c(a, l), j = m.binLen, k = m.value;
		else {
			if ("B64" !== b)
				throw "inputFormat must be HEX, TEXT, ASCII, or B64";
			m = e(a),
			j = m.binLen,
			k = m.value
		}
		this.getHash = function (a, b, c, d) {
			var e,
			i = null,
			l = k.slice(),
			m = j;
			if (3 === arguments.length ? "number" != typeof c && (d = c, c = 1) : 2 === arguments.length && (c = 1), c !== parseInt(c, 10) || 1 > c)
				throw "numRounds must a integer >= 1";
			switch (b) {
			case "HEX":
				i = f;
				break;
			case "B64":
				i = g;
				break;
			default:
				throw "format must be HEX or B64"
			}
			if ("SHA-1" === a && 1 & SUPPORTED_ALGS)
				for (e = 0; e < c; e++)
					l = G(l, m), m = 160;
			else if ("SHA-224" === a && 2 & SUPPORTED_ALGS)
				for (e = 0; e < c; e++)
					l = H(l, m, a), m = 224;
			else if ("SHA-256" === a && 2 & SUPPORTED_ALGS)
				for (e = 0; e < c; e++)
					l = H(l, m, a), m = 256;
			else if ("SHA-384" === a && 4 & SUPPORTED_ALGS)
				for (e = 0; e < c; e++)
					l = H(l, m, a), m = 384;
			else {
				if (!("SHA-512" === a && 4 & SUPPORTED_ALGS))
					throw "Chosen SHA variant is not supported";
				for (e = 0; e < c; e++)
					l = H(l, m, a), m = 512
			}
			return i(l, h(d))
		},
		this.getHMAC = function (a, b, i, m, n) {
			var o,
			p,
			q,
			r,
			s,
			t,
			u,
			v,
			w,
			x = [],
			y = [],
			z = null;
			switch (m) {
			case "HEX":
				o = f;
				break;
			case "B64":
				o = g;
				break;
			default:
				throw "outputFormat must be HEX or B64"
			}
			if ("SHA-1" === i && 1 & SUPPORTED_ALGS)
				q = 64, w = 160;
			else if ("SHA-224" === i && 2 & SUPPORTED_ALGS)
				q = 64, w = 224;
			else if ("SHA-256" === i && 2 & SUPPORTED_ALGS)
				q = 64, w = 256;
			else if ("SHA-384" === i && 4 & SUPPORTED_ALGS)
				q = 128, w = 384;
			else {
				if (!("SHA-512" === i && 4 & SUPPORTED_ALGS))
					throw "Chosen SHA variant is not supported";
				q = 128,
				w = 512
			}
			if ("HEX" === b)
				z = d(a), v = z.binLen, p = z.value;
			else if ("ASCII" === b || "TEXT" === b)
				z = c(a, l), v = z.binLen, p = z.value;
			else {
				if ("B64" !== b)
					throw "inputFormat must be HEX, TEXT, ASCII, or B64";
				z = e(a),
				v = z.binLen,
				p = z.value
			}
			if (r = 8 * q, u = q / 4 - 1, q < v / 8) {
				if ("SHA-1" === i && 1 & SUPPORTED_ALGS)
					p = G(p, v);
				else {
					if (!(6 & SUPPORTED_ALGS))
						throw "Unexpected error in HMAC implementation";
					p = H(p, v, i)
				}
				p[u] &= 4294967040
			} else
				q > v / 8 && (p[u] &= 4294967040);
			for (s = 0; s <= u; s += 1)
				x[s] = 909522486 ^ p[s], y[s] = 1549556828 ^ p[s];
			if ("SHA-1" === i && 1 & SUPPORTED_ALGS)
				t = G(y.concat(G(x.concat(k), r + j)), r + w);
			else {
				if (!(6 & SUPPORTED_ALGS))
					throw "Unexpected error in HMAC implementation";
				t = H(y.concat(H(x.concat(k), r + j, i)), r + w, i)
			}
			return o(t, h(n))
		}
	};
	"function" == typeof define ? define(function () {
		return I
	}) : "undefined" != typeof exports ? "undefined" != typeof module && module.exports ? module.exports = exports = I : exports = I : a.jsSHA = I
}
(this), !function (a) {
	"use strict";
	var b = function (a, b, c) {
		function d() {}
		function e() {
			var a = (Math.random() + 1).toString(36);
			return a.substring(2, a.length)
		}
		function f() {
			return window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : Date.now()
		}
		function g() {
			var a = f();
			return a + _a.currentOffset
		}
		function h() {
			return window.performance.now ? window.performance.now() : null
		}
		function i() {
			"function" == typeof navigator.getBattery && navigator.getBattery().then(function (a) {
				ta = a
			})
		}
		function j() {
			return ta ? ta.level : void 0
		}
		function k() {
			return ta ? ta.charging : void 0
		}
		function l() {
			navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.enumerateDevices().then(function (a) {
				sa = a
			})
		}
		function m() {
			Ia || window.addEventListener("beforeunload", function (a) {
				var b;
				for (b in Za)
					Za.hasOwnProperty(b) && Ub(kb.userLeft, null, b, Za[b].ucID, null, null, null);
				return "Are you sure you want to close the call?"
			})
		}
		function n(a, b) {
			setTimeout(function () {
				var b = g(),
				c = b - a.data.apiTS;
				a.data.timeShift = c,
				ka(a.type, a.action, a.data, a.callback)
			}, b)
		}
		function o(a, b, c, d, e) {
			var f = dc(c, d),
			g = null;
			f ? (g = h(), Ub(kb.mediaPlaybackStartEvent, b, c, a, {
					ssrc: e,
					highResTs: g
				}, f, null)) : console.error("sendMediaStartEvent: Invalid pcHash")
		}
		function p(a, b, c, d, e) {
			var f = dc(c, d),
			g = null;
			f ? (g = h(), Ub(kb.mediaSuspendedEvent, b, c, a, {
					ssrc: e,
					highResTs: g
				}, f, null)) : console.error("sendMediaSuspendedEvent: Invalid pcHash")
		}
		function q(a, b, c, d, e) {
			var f = document.getElementById(c);
			if (f) {
				var g = Za[b].ucID;
				f.oncanplay = function () {
					o(g, a, b, d, e)
				},
				f.onsuspend = function () {
					p(g, a, b, d, e)
				}
			}
		}
		function r(a) {
			var b = Wa.codebase,
			c = !1;
			if (null === a)
				c = !1;
			else if (b === Eb.firefox) {
				var d = typeof mozRTCPeerConnection,
				e = typeof RTCPeerConnection;
				"undefined" !== d && a instanceof mozRTCPeerConnection ? c = !0 : "undefined" !== e && a instanceof RTCPeerConnection && (c = !0)
			} else
				null !== ib && a instanceof ib && (c = !0), ("function" == typeof a || b === Eb.edge) && (c = !0);
			return c
		}
		function s(a, b) {
			var d,
			e;
			return a && (b === Eb.chrome ? (d = a.googLocalAddress, d.concat(":", a.googRemoteAddress)) : b === Eb.firefox && (d = a.localAddr, d.concat(":", a.remoteAddr))),
			e = new c(d, "TEXT"),
			e.getHash("SHA-1", "B64")
		}
		function t() {
			var a;
			return a = navigator.onLine === !0 ? "online" : "offline"
		}
		function u(a, b) {
			var c = Fb.unknown,
			d = null;
			if (b === Eb.chrome)
				void 0 !== a && (void 0 !== a.data.googFrameRateReceived || void 0 !== a.data.googFrameRateSent ? c = Fb.video : (void 0 !== a.data.audioInputLevel || void 0 !== a.data.audioOutputLevel) && (c = Fb.audio), d = a.data.googCodecName);
			else {
				if (b !== Eb.firefox)
					return;
				void 0 !== a && (void 0 !== a.data.mediaType ? c = a.data.mediaType : void 0 !== a.data.framerateMean && (c = Fb.video))
			}
			return cb.hasOwnProperty(a.data.ssrc) && (cb[a.data.ssrc].mediaType = c, cb[a.data.ssrc].codec = d),
			c
		}
		function v(a, b) {
			var c;
			return b === Eb.chrome ? void 0 !== a.data.googFrameRateOutput ? c = parseInt(a.data.googFrameRateOutput, 10) : void 0 !== a.data.googFrameRateDecoded ? c = parseInt(a.data.googFrameRateDecoded, 10) : void 0 !== a.data.googFrameRateReceived ? c = parseInt(a.data.googFrameRateReceived, 10) : void 0 !== a.data.googFrameRateSent && (c = parseInt(a.data.googFrameRateSent, 10)) : b === Eb.firefox && void 0 !== a.data.framerateMean && (c = parseInt(a.data.framerateMean, 10)),
			void 0 !== c && (c = isNaN(c) || 0 > c ? null : c),
			c
		}
		function w(a, b) {
			var c = "unavailable";
			if (b === Eb.chrome) {
				var d,
				e,
				f;
				d = v(a, b),
				void 0 !== a.data.googFrameWidthReceived ? f = a.data.googFrameWidthReceived : void 0 !== a.data.googFrameWidthSent && (f = a.data.googFrameWidthSent),
				void 0 !== a.data.googFrameHeightReceived ? e = a.data.googFrameHeightReceived : void 0 !== a.data.googFrameHeightSent && (e = a.data.googFrameHeightSent),
				void 0 !== d && void 0 !== f && void 0 !== e && f > 0 && e > 0 && (c = f.concat("x", e, "@", d))
			} else
				b === Eb.firefox;
			return c
		}
		function x(a, b) {
			var c;
			return b === Eb.chrome ? void 0 !== a.data.googFrameWidthReceived ? c = a.data.googFrameWidthReceived : void 0 !== a.data.googFrameWidthSent && (c = a.data.googFrameWidthSent) : b === Eb.firefox,
			c
		}
		function y(a) {
			var b;
			return b = isNaN(a) || 0 > a ? null : a
		}
		function z(a, b) {
			var c;
			if (b === Eb.chrome) {
				if (void 0 !== a && void 0 !== a.data.googRtt)
					return c = y(parseInt(a.data.googRtt, 10))
			} else if (b === Eb.firefox) {
				if (void 0 !== a && void 0 !== a.data.mozRtt)
					return c = y(parseInt(a.data.mozRtt, 10))
			} else if (b === Eb.edge && a && a.data.roundTripTime)
				return c = y(parseInt(a.data.roundTripTime, 10))
		}
		function A(a) {
			var b = isNaN(a) ? null : a;
			return b
		}
		function B(a, b) {
			var c;
			if (b === Eb.chrome) {
				if (void 0 !== a && void 0 !== a.data.googJitterReceived)
					return c = A(parseInt(a.data.googJitterReceived, 10)), c && (c /= 1e3), c
			} else if (b === Eb.firefox && void 0 !== a && void 0 !== a.data.jitter)
				return c = A(parseInt(a.data.jitter, 10))
		}
		function C(a, b) {
			if (b.sort(), b.length > 0) {
				var c = a / 100 * b.length;
				c = Math.ceil(c);
				var d = b[c - 1];
				return d
			}
		}
		function D(a, b, c) {
			var d;
			return b === Fb.audio ? a < c.audio.gThreshold ? d = ub.excellent : a > c.audio.gThreshold && a < c.audio.rThreshold ? d = ub.fair : a > c.audio.rThreshold && (d = ub.bad) : b === Fb.video && (a < c.video.gThreshold ? d = ub.excellent : a > c.video.gThreshold && a < c.video.rThreshold ? d = ub.fair : a > c.video.rThreshold && (d = ub.bad)),
			d
		}
		function E(a, b, c) {
			var d;
			return b === Fb.audio ? a > c.audio.gThreshold ? d = ub.excellent : a > c.audio.rThreshold && a < c.audio.gThreshold ? d = ub.fair : a < c.audio.rThreshold && (d = ub.bad) : b === Fb.video && (a > c.video.gThreshold ? d = ub.excellent : a > c.video.rThreshold && a < c.video.gThreshold ? d = ub.fair : a < c.video.rThreshold && (d = ub.bad)),
			d
		}
		function F() {
			var a,
			b,
			c = 0,
			d = 0;
			for (a = 0; a < arguments.length; a++)
				void 0 !== arguments[a] && null !== arguments[a] && (c += arguments[a], d++);
			return d > 0 && (c /= d, c = Math.floor(c), c === ub.excellent ? b = vb.excellent : c === ub.fair ? b = vb.fair : c === ub.bad && (b = vb.bad)),
			b
		}
		function G(a, b, c) {
			var d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m = [];
			if (void 0 !== a.lastStatsSent && void 0 !== a.lastStatsSent.statistics.Transport)
				for (f = a.lastStatsSent.statistics.Transport, g = a.latestEventSent, h = void 0, d = 0; d < b.length; d++) {
					for (k = {}, h = void 0, e = 0; e < f.length; e++)
						if (b[d].hash === f[e].hash) {
							h = f[e];
							break
						}
					void 0 !== h && (i = parseInt(h.bytesReceived, 10), j = parseInt(h.bytesSent, 10), k.hash = b[d].hash, l = c - g, l > 0 && (k.receivedBwKbps = 8 * (parseInt(b[d].bytesReceived, 10) - i) / l, k.sentBwKbps = 8 * (parseInt(b[d].bytesSent, 10) - j) / l, void 0 !== h.packetsSent && void 0 !== b[d].packetsSent && (k.sentPacketRate = (parseInt(b[d].packetsSent, 10) - parseInt(h.packetsSent, 10)) / (l / 1e3)), void 0 !== h.packetsReceived && void 0 !== b[d].packetsReceived && (k.receivedPacketRate = (parseInt(b[d].packetsReceived, 10) - parseInt(h.packetsReceived, 10)) / (l / 1e3))), k.rtt = b[d].googRtt, m.push(k))
				}
			return m
		}
		function H(a, b, c, d) {
			var e = [];
			return c === Eb.firefox ? e = null : c === Eb.chrome && (e = G(a, b, d)),
			e
		}
		function I(a) {
			if (a = A(a), null !== a) {
				var b = 0 > a ? null : a;
				return b
			}
		}
		function J(a, b, c, d, e, f, g) {
			return void 0 === a[c] && (a[c] = {}),
			void 0 === a[c].streams && (a[c].streams = {}),
			void 0 === a[c].streams[b] && (a[c].streams[b] = {}),
			void 0 === a[c].streams[b][e] && (a[c].streams[b][e] = {}),
			void 0 === a[c].streams[b][e][d] && (a[c].streams[b][e][d] = {}),
			void 0 === a[c].streams[b][e][d].totalTimeMs && (g ? a[c].streams[b][e][d][f] = [] : a[c].streams[b][e][d][f] = 0),
			a
		}
		function K(a, b, c, d, e, f, g, h, i) {
			var j,
			k,
			l,
			m,
			n,
			o,
			p,
			q,
			r,
			s,
			t,
			y,
			B,
			G,
			H,
			K,
			L,
			M,
			N,
			O,
			P,
			Q,
			R,
			S,
			T = null,
			U = null,
			V = null,
			W = null,
			X = null,
			Y = null,
			Z = null,
			$ = null,
			_ = null,
			aa = null,
			ba = null,
			ca = null,
			da = null,
			ea = null;
			for (o in b.streams[c].outbound)
				if (b.streams[c].outbound.hasOwnProperty(o)) {
					Q = b.streams[c].outbound[o].data,
					void 0 !== e.streams[c] && void 0 !== e.streams[c].outbound && void 0 !== e.streams[c].outbound[o] ? (j = A(parseInt(e.streams[c].outbound[o].data.bytesSent, 10)), k = a.lastStatsSent.apiTS, K = A(parseInt(e.streams[c].outbound[o].data.packetsSent, 10)), M = A(parseInt(e.streams[c].outbound[o].data.packetsLost, 10)), N = A(parseInt(e.streams[c].outbound[o].data.discardedPackets, 10))) : (j = 0, k = g, M = 0, K = 0, N = 0),
					m = g,
					B = m - k,
					p = u(b.streams[c].outbound[o], f),
					q = w(b.streams[c].outbound[o], f),
					r = v(b.streams[c].outbound[o], f),
					s = x(b.streams[c].outbound[o], f),
					void 0 === d.streams[c] && (d.streams[c] = {}),
					void 0 === d.streams[c].outbound && (d.streams[c].outbound = {}),
					d.streams[c].outbound[o] = {},
					n = z(b.streams[c].outbound[o], f),
					l = A(parseInt(Q.bytesSent, 10)),
					null !== l && null !== j && j > l && (j = 0, Ib(Ba, Ca, "log", {
							msg: "getstats: curBytesSent < prevBytesSent counter reset",
							conferenceID: h,
							ucID: i
						})),
					void 0 !== Q.droppedFrames && (O = I(parseInt(Q.droppedFrames, 10)), null !== O && null !== N && N > O && (N = 0), null !== O && null !== N && (P = O - N)),
					L = I(parseInt(Q.packetsLost, 10)),
					null !== L && null !== M && (U = L - M),
					H = I(parseInt(Q.packetsSent, 10)),
					null !== H && null !== K && (G = H - K),
					void 0 !== U && void 0 !== G && G + U > 0 && (V = U / (G + U)),
					B > 0 && (null !== l && null !== j && (T = 8 * (l - j) / B), void 0 !== G && (ca = G / (B / 1e3))),
					a = J(a, c, "rttInfo", o, "outbound", "rttArray", !0),
					a = J(a, c, "fractionalLossInfo", o, "outbound", "fractionalLossArray", !0),
					a = J(a, c, "timeElapse", o, "outbound", "totalTimeMs", !1),
					a = J(a, c, "frameWidthInfo", o, "outbound", "frameWidthArray", !0),
					a = J(a, c, "frameRateInfo", o, "outbound", "frameRateArray", !0),
					void 0 !== n && null !== n && a.rttInfo.streams[c].outbound[o].rttArray.push(parseInt(n, 10)),
					void 0 !== V && null !== V && a.fractionalLossInfo.streams[c].outbound[o].fractionalLossArray.push(V),
					void 0 !== r && null !== r && a.frameRateInfo.streams[c].outbound[o].frameRateArray.push(parseInt(r, 10)),
					void 0 !== s && null !== s && a.frameWidthInfo.streams[c].outbound[o].frameWidthArray.push(parseInt(s, 10)),
					W = C(95, a.rttInfo.streams[c].outbound[o].rttArray),
					Z = C(95, a.fractionalLossInfo.streams[c].outbound[o].fractionalLossArray),
					ea = C(95, a.frameWidthInfo.streams[c].outbound[o].frameWidthArray),
					da = C(95, a.frameRateInfo.streams[c].outbound[o].frameRateArray),
					null !== l && null !== j && l > j && (a.timeElapse.streams[c].outbound[o].totalTimeMs = a.timeElapse.streams[c].outbound[o].totalTimeMs + B),
					a.timeElapse.streams[c].outbound[o].totalTimeMs > 0 && null !== l && (ba = 8 * l / a.timeElapse.streams[c].outbound[o].totalTimeMs),
					d.streams[c].outbound[o] = {
						csioIntMs: B,
						csioIntFL: V,
						csioIntPR: ca,
						csioIntBRKbps: T,
						csioMediaType: p,
						csioSig2Latency: W,
						csioAvgBRKbps: ba,
						csioTimeElapseMs: a.timeElapse.streams[c].outbound[o].totalTimeMs,
						csioRes: q,
						csioPercentileFl: Z,
						csioIntFramesDropped: P,
						csioPercentileFrameRate: da,
						csioPercentileFrameWidth: ea
					};
					for (R in Q)
						Q.hasOwnProperty(R) && (d.streams[c].outbound[o][R] = Q[R]);
					p === Fb.audio ? (S = W + 40, X = D(S, p, Db), Y = E(T, p, zb), t = F(X, Y), d.streams[c].outbound[o].csioMark = t, d.streams[c].outbound[o].csioeM = S) : p === Fb.video && (y = parseInt(a.rttInfo.streams[c].outbound[o].frameRate, 10), $ = E(r / y, p, Ab), _ = D(n, p, Bb), aa = E(T, p, zb), t = F($, _, aa), a.rttInfo.streams[c].outbound[o].frameRate = r, d.streams[c].outbound[o].csioMark = t)
				}
		}
		function L(a, b, c, d, e, f, g, h, i) {
			var j,
			k,
			l,
			m,
			n,
			o,
			p,
			q,
			r,
			s,
			t,
			y,
			G,
			H,
			K,
			L,
			M,
			N,
			O,
			P,
			Q,
			R,
			S,
			T,
			U,
			V,
			W,
			X,
			Y = null,
			Z = null,
			$ = null,
			_ = null,
			aa = null,
			ba = null,
			ca = null,
			da = null,
			ea = null,
			fa = null,
			ga = null,
			ha = null,
			ia = null;
			for (q in b.streams[c].inbound)
				if (b.streams[c].inbound.hasOwnProperty(q)) {
					U = b.streams[c].inbound[q].data,
					void 0 !== e.streams[c] && void 0 !== e.streams[c].inbound && void 0 !== e.streams[c].inbound[q] ? (j = A(parseInt(e.streams[c].inbound[q].data.bytesReceived, 10)), n = A(parseInt(e.streams[c].inbound[q].data.packetsLost, 10)), Q = A(parseInt(e.streams[c].inbound[q].data.packetsReceived, 10)), k = a.lastStatsSent.apiTS, S = A(parseInt(e.streams[c].inbound[q].data.discardedPackets, 10))) : (j = 0, k = g, n = 0, Q = 0, S = 0),
					r = u(b.streams[c].inbound[q], f),
					s = w(b.streams[c].inbound[q], f),
					y = v(b.streams[c].inbound[q], f),
					t = B(b.streams[c].inbound[q], f),
					X = x(b.streams[c].inbound[q], f),
					p = z(b.streams[c].inbound[q], f),
					l = A(parseInt(U.bytesReceived, 10)),
					null !== l && null !== j && j > l && (j = 0, n = 0, Q = 0, Ib(Ba, Ca, "log", {
							msg: "getstats: curBytesReceived < prevBytesReceived counter reset",
							conferenceID: h,
							ucID: i
						})),
					o = I(parseInt(U.packetsLost, 10)),
					m = g,
					void 0 === d.streams[c] && (d.streams[c] = {}),
					void 0 === d.streams[c].inbound && (d.streams[c].inbound = {}),
					d.streams[c].inbound[q] = {},
					null !== o && null !== n && (Z = o - n),
					void 0 !== U.discardedPackets && (R = I(parseInt(U.discardedPackets, 10)), null !== R && null !== S && S > R && (S = 0), null !== R && null !== S && (T = R - S)),
					P = I(parseInt(U.packetsReceived, 10)),
					G = P - Q,
					void 0 !== Z && null !== G && G + Z > 0 && (_ = Z / (G + Z)),
					O = m - k,
					O > 0 && (null !== l && null !== j && (Y = 8 * (l - j) / O), null !== G && ($ = G / (O / 1e3))),
					a = J(a, c, "rttInfo", q, "inbound", "rttArray", !0),
					a = J(a, c, "timeElapse", q, "inbound", "totalTimeMs", !1),
					a = J(a, c, "jitterInfo", q, "inbound", "jitterArray", !0),
					a = J(a, c, "fractionalLossInfo", q, "inbound", "fractionalLossArray", !0),
					a = J(a, c, "frameWidthInfo", q, "inbound", "frameWidthArray", !0),
					a = J(a, c, "frameRateInfo", q, "inbound", "frameRateArray", !0),
					void 0 !== p && null !== p && a.rttInfo.streams[c].inbound[q].rttArray.push(parseInt(p, 10)),
					void 0 !== t && null !== t && a.jitterInfo.streams[c].inbound[q].jitterArray.push(parseInt(t, 10)),
					void 0 !== _ && null !== _ && a.fractionalLossInfo.streams[c].inbound[q].fractionalLossArray.push(_),
					void 0 !== y && null !== y && a.frameRateInfo.streams[c].inbound[q].frameRateArray.push(parseInt(y, 10)),
					void 0 !== X && null !== X && a.frameWidthInfo.streams[c].inbound[q].frameWidthArray.push(parseInt(X, 10)),
					aa = C(95, a.rttInfo.streams[c].inbound[q].rttArray),
					ba = C(95, a.jitterInfo.streams[c].inbound[q].jitterArray),
					ca = C(95, a.fractionalLossInfo.streams[c].inbound[q].fractionalLossArray),
					ha = C(95, a.frameRateInfo.streams[c].inbound[q].frameRateArray),
					ia = C(95, a.frameWidthInfo.streams[c].inbound[q].frameWidthArray),
					null !== l && null !== j && l > j && (a.timeElapse.streams[c].inbound[q].totalTimeMs = a.timeElapse.streams[c].inbound[q].totalTimeMs + O),
					null !== l && a.timeElapse.streams[c].inbound[q].totalTimeMs > 0 && (ga = 8 * l / a.timeElapse.streams[c].inbound[q].totalTimeMs),
					d.streams[c].inbound[q] = {
						csioIntMs: O,
						csioIntFL: _,
						csioIntPR: $,
						csioIntBRKbps: Y,
						csioSig2Latency: aa,
						csioAvgBRKbps: ga,
						csioMediaType: r,
						csioTimeElapseMs: a.timeElapse.streams[c].inbound[q].totalTimeMs,
						csioIntPktRcv: G,
						csioIntPktLoss: Z,
						csioPercentileJitter: ba,
						csioRes: s,
						csioPercentileFl: ca,
						csioIntPktDiscarded: T,
						csioPercentileFrameRate: ha,
						csioPercentileFrameWidth: ia
					};
					for (V in U)
						U.hasOwnProperty(V) && (d.streams[c].inbound[q][V] = U[V]);
					r === Fb.audio ? (W = aa + 40, da = D(W, r, Db), ea = D(_, r, Cb), fa = E(Y, r, zb), H = F(da, ea, fa), d.streams[c].inbound[q].csioMark = H, d.streams[c].inbound[q].csioeM = W) : r === Fb.video && (K = a.rttInfo.streams[c].inbound[q].frameRate, L = E(y / K, r, Ab), M = D(p, r, Bb), N = E(Y, r, zb), H = F(L, M, N), a.rttInfo.streams[c].inbound[q].frameRate = y, d.streams[c].inbound[q].csioMark = H)
				}
		}
		function M(a, b, c, d, e, f) {
			var g = {
				streams: {}
			};
			g.fabricState = a.pcState,
			g.connectionState = t();
			var h = null;
			h = a.lastStatsSent ? a.lastStatsSent.statistics : {
				streams: {}
			};
			var i;
			for (i in b.streams)
				b.streams.hasOwnProperty(i) && (void 0 !== b.streams[i].inbound && L(a, b, i, g, h, c, d, e, f), void 0 !== b.streams[i].outbound && K(a, b, i, g, h, c, d, e, f), void 0 === g.streams[i] && (g.streams[i] = {}), b.streams[i].cname && (g.streams[i].cname = b.streams[i].cname), b.streams[i].usage && (g.streams[i].usage = b.streams[i].usage), b.streams[i].msid && (g.streams[i].msid = b.streams[i].msid), b.streams[i].userID && (g.streams[i].userID = b.streams[i].userID), b.streams[i].associatedVideoTag && (g.streams[i].associatedVideoTag = b.streams[i].associatedVideoTag));
			if (c === Eb.firefox)
				for (i in g.streams)
					g.streams.hasOwnProperty(i) && void 0 !== g.streams[i].inbound && void 0 !== g.streams[i].inbound[tb.remote] && (void 0 === g.streams[i].outbound && (g.streams[i].outbound = {}), void 0 === g.streams[i].outbound[tb.local] && (g.streams[i].outbound[tb.local] = {}), g.streams[i].outbound[tb.local].rtt = g.streams[i].inbound[tb.remote].rtt);
			return g
		}
		function N(a) {
			var b,
			c,
			d;
			for (b in a.streams)
				if (a.streams.hasOwnProperty(b)) {
					if (a.streams[b].inbound)
						for (d in a.streams[b].inbound)
							a.streams[b].inbound.hasOwnProperty(d) && (c = a.streams[b].inbound[d].mark, c === vb.bad ? a.streams[b].inbound[d].mark = 2 : c === vb.fair ? a.streams[b].inbound[d].mark = 1 : a.streams[b].inbound[d].mark = 0);
					if (a.streams[b].outbound)
						for (d in a.streams[b].outbound)
							a.streams[b].outbound.hasOwnProperty(d) && (c = a.streams[b].outbound[d].mark, c === vb.bad ? a.streams[b].outbound[d].mark = 2 : c === vb.fair ? a.streams[b].outbound[d].mark = 1 : a.streams[b].outbound[d].mark = 0)
				}
			return a
		}
		function O(a, b, c) {
			var d,
			e,
			f;
			for (d = 0; d < a.length; d++)
				e = b[a[d].localCandidateId], f = c[a[d].remoteCandidateId], a[d].localAddr = e.ipAddress + ":" + e.portNumber, a[d].remoteAddr = f.ipAddress + ":" + f.portNumber, a[d].localAddrType = e.candidateType, a[d].remoteAddrType = f.candidateType, a[d].transportType = e.transport;
			return a
		}
		function P(a) {
			var b = {};
			a.connectionState && (b.connectionState = a.connectionState),
			a.fabricState && (b.fabricState = a.fabricState),
			Ha && (b.conferenceURL = Ha);
			var c,
			d,
			e,
			f;
			b.streams = {};
			for (c in a.streams)
				if (a.streams.hasOwnProperty(c)) {
					if (void 0 === b.streams[c] && (b.streams[c] = {}), a.streams[c].cname && (b.streams[c].cname = a.streams[c].cname), a.streams[c].msid && (b.streams[c].msid = a.streams[c].msid), a.streams[c].userID && (b.streams[c].remoteUserID = a.streams[c].userID), a.streams[c].usage && (b.streams[c].usageLabel = a.streams[c].usage), a.streams[c].associatedVideoTag && (b.streams[c].associatedVideoTag = a.streams[c].associatedVideoTag), void 0 !== a.streams[c].inbound)
						for (d in a.streams[c].inbound)
							a.streams[c].inbound.hasOwnProperty(d) && (e = a.streams[c].inbound[d], d === tb.local && (b.streams[c].reportType = tb.inbound, e.hasOwnProperty("csioIntFL") && (b.streams[c].fractionLoss = e.csioIntFL), e.hasOwnProperty("csioIntBRKbps") && (b.streams[c].bitrate = e.csioIntBRKbps), e.hasOwnProperty("csioMark") && (b.streams[c].quality = e.csioMark), e.hasOwnProperty("csioMediaType") && (b.streams[c].mediaType = e.csioMediaType), e.hasOwnProperty("googRtt") && (b.streams[c].rtt = e.googRtt), e.hasOwnProperty("mozRtt") && (b.streams[c].rtt = e.mozRtt), e.hasOwnProperty("roundTripTime") && (b.streams[c].rtt = e.roundTripTime), e.hasOwnProperty("jitter") && (b.streams[c].jitter = e.jitter), e.hasOwnProperty("googJitterReceived") && (b.streams[c].jitter = e.googJitterReceived), e.hasOwnProperty("audioOutputLevel") && (b.streams[c].audioOutputLevel = e.audioOutputLevel), e.hasOwnProperty("audioInputLevel") && (b.streams[c].audioInputLevel = e.audioInputLevel)));
					if (void 0 !== a.streams[c].outbound)
						for (d in a.streams[c].outbound)
							a.streams[c].outbound.hasOwnProperty(d) && d === tb.local && (f = a.streams[c].outbound[d], b.streams[c].reportType = tb.outbound, f.hasOwnProperty("csioIntFL") && (b.streams[c].fractionLoss = f.csioIntFL), f.hasOwnProperty("csioIntBRKbps") && (b.streams[c].bitrate = f.csioIntBRKbps), f.hasOwnProperty("csioMark") && (b.streams[c].quality = f.csioMark), f.hasOwnProperty("csioMediaType") && (b.streams[c].mediaType = f.csioMediaType), f.hasOwnProperty("googRtt") && (b.streams[c].rtt = f.googRtt), f.hasOwnProperty("mozRtt") && (b.streams[c].rtt = f.mozRtt), f.hasOwnProperty("roundTripTime") && (b.streams[c].rtt = f.roundTripTime), f.hasOwnProperty("jitter") && (b.streams[c].jitter = f.jitter), f.hasOwnProperty("googJitterReceived") && (b.streams[c].jitter = f.googJitterReceived), f.hasOwnProperty("audioInputLevel") && (b.streams[c].audioInputLevel = f.audioInputLevel), f.hasOwnProperty("audioOutputLevel") && (b.streams[c].audioOutputLevel = f.audioOutputLevel))
				}
			return b
		}
		function Q(a, b, c, e, f, h) {
			var i = g();
			a.hasOwnProperty("token") && a.hasOwnProperty("ucID") && ja() && !ab ? (d("Pushing to the cloud ", a), ka(lb.processedStats, jb.fabricStats, a, h), b.latestEventSent = i, b.lastFabricState = b.pcState) : (a.clockUnsynced = ab, Pb({
					type: lb.processedStats,
					action: jb.fabricStats,
					data: a
				}), a.hasOwnProperty("token") || vc(Ba, Ea, f))
		}
		function R(a, b, c, d, e, h, i) {
			function l(l) {
				var m = g(),
				n = f();
				void 0 === e.lastRawStatsSentInterval || null === e.lastRawStatsSentInterval ? e.lastRawStatsSentInterval = n - e.statsPollingStart : e.lastRawStatsSentInterval = n - e.rawstatsTS + e.lastRawStatsSentInterval,
				void 0 === e.lastProcessedStatsSentInterval || null === e.lastProcessedStatsSentInterval ? e.lastProcessedStatsSentInterval = n - e.statsPollingStart : e.lastProcessedStatsSentInterval = n - e.rawstatsTS + e.lastProcessedStatsSentInterval,
				e.rawstatsTS = n;
				var o = {},
				p = Wa.codebase;
				o.version = xa,
				o.appID = Ba,
				o.conferenceID = encodeURIComponent(c),
				o.apiTS = m,
				o.timeShift = 0,
				o.fabricState = e.pcState,
				o.pcID = e.pcHash,
				void 0 !== d && (o.ucID = d),
				Fa ? o.token = Fa.challenge.token : vc(Ba, Ea, a),
				o.localID = encodeURIComponent(a),
				o.remoteID = encodeURIComponent(b),
				o.deviceID = Ga;
				var q,
				r,
				t,
				u,
				v,
				w,
				x,
				y,
				z = {
					streams: {}
				},
				A = null,
				B = !1,
				C = !1,
				D = {},
				E = {};
				if (p === Eb.firefox && "Safari" !== Wa.name)
					A = [], l.forEach(function (a) {
						A.push(a)
					});
				else if (p === Eb.chrome && "Safari" !== Wa.name)
					A = l.result();
				else {
					A = [];
					for (q in l)
						l.hasOwnProperty(q) && A.push(l[q])
				}
				for (q = 0; q < A.length; ++q)
					r = W(A[q]), t = T(JSON.parse(r), p), X(t) || (t.hasOwnProperty("Transport") ? (u = "Transport", z.hasOwnProperty(u) || (z[u] = []), p !== Eb.firefox ? (parseInt(t[u].bytesReceived, 10) > 0 || parseInt(t[u].bytesSent, 10) > 0) && (z[u].push(t[u]), "true" === t[u].googActiveConnection && (o.activeConnectionIndex = z[u].length)) : (z[u].push(t[u]), "true" === t[u].selected && (o.activeConnectionIndex = z[u].length))) : t.hasOwnProperty("localCandidate") ? D[t.localCandidate.id] = t.localCandidate : t.hasOwnProperty("remoteCandidate") ? E[t.remoteCandidate.id] = t.remoteCandidate : t.hasOwnProperty("bwe") ? z.bwe = t.bwe : (w = Rb(t.ssrc), void 0 !== w && w.localStartTime || (y = Tb(b, c, d, e, h, null), y && (C = !0), w = Rb(t.ssrc)), w && (v = w.remoteUserID), void 0 === v && (v = b), void 0 === z.streams[t.ssrc] && (z.streams[t.ssrc] = {
										userID: v
									}, void 0 !== w && (z.streams[t.ssrc].cname = w.cname, z.streams[t.ssrc].msid = w.msid)), t.inbound ? (void 0 === z.streams[t.ssrc].inbound && (z.streams[t.ssrc].inbound = {}), x = z.streams[t.ssrc].inbound, x[t.reportType] = {
										data: t.data
									}, w && (z.streams[t.ssrc].usage = w.usage, z.streams[t.ssrc].associatedVideoTag = w.associatedVideoTag)) : (void 0 === z.streams[t.ssrc].outbound && (z.streams[t.ssrc].outbound = {}), z.streams[t.ssrc].outbound[t.reportType] = {
										data: t.data
									})));
				p === Eb.firefox && (z.Transport = O(z.Transport, D, E));
				var F;
				if (z.Transport)
					for (F = 0; F < z.Transport.length; F++)
						z.Transport[F].hash = s(z.Transport[F], p);
				o.statistics = z,
				z.Transport && (B = V(z.Transport, e)),
				B && gc(h, kb.updatedConfiguration, c),
				e.pcState === wb.disrupted && $(o);
				var G = M(e, z, p, m, c, d);
				if (z.Transport && (G.Transport = H(e, z.Transport, p, m)), z.bwe && (G.bwe = z.bwe), void 0 === e.processedStatsTupleArray && (e.processedStatsTupleArray = []), ua) {
					var I = P(G);
					ua(I)
				}
				G.apiTS = m,
				G.batteryStatus = {},
				G.batteryStatus.batteryLevel = j(),
				G.batteryStatus.isBatteryCharging = k(),
				G = N(G),
				e.processedStatsTupleArray.push(G),
				o.processedStatistics = e.processedStatsTupleArray,
				e.lastStatsSent = o;
				var J = oa(o),
				K = oa(o);
				delete J.processedStatistics,
				delete K.statistics,
				C && Ub(kb.ssrcMap, b, c, d, Sb(), e.pcHash),
				(e.lastProcessedStatsSentInterval >= La || e.initialPhaseOver) && (e.processedStatsTupleArray = [], Q(K, e, c, b, a, i), e.lastProcessedStatsSentInterval = 0)
			}
			return l
		}
		function S(a) {
			var b;
			return xb.hasOwnProperty(a) ? a === xb.createOffer || a === xb.createAnswer || a === xb.setRemoteDescription ? b = yb.negotiationFailure : a === xb.setLocalDescription ? b = yb.sdpError : a === xb.addIceCandidate ? b = yb.sdpError : a === xb.getUserMedia ? b = yb.mediaConfigError : a === xb.iceConnectionFailure ? b = yb.iceFailure : a === xb.signalingError ? b = yb.signalingError : (a === xb.applicationLog || xb.applicationError) && (b = yb.applicationLog) : b = Jb.invalidWebRTCFunctionName,
			b
		}
		function T(a, b) {
			var c = {};
			return b === Eb.firefox ? "inboundrtp" === a.type || "outboundrtp" === a.type ? (c.ssrc = a.ssrc, c.inbound = "inboundrtp" === a.type, c.data = a, c.mediaType = a.mediaType, c.reportType = "true" === a.isRemote ? "remote" : "local") : "candidatepair" === a.type && a.selected ? c.Transport = a : "localcandidate" === a.type ? c.localCandidate = a : "remotecandidate" === a.type && (c.remoteCandidate = a) : b === Eb.chrome ? "ssrc" === a.type ? (c.reportType = "local", a.bytesSent ? c.inbound = !1 : c.inbound = !0, c.ssrc = a.ssrc, c.data = a) : "googCandidatePair" === a.type ? c.Transport = a : "VideoBwe" === a.type && (c.bwe = a) : b === Eb.edge && ("inbound-rtp" === a.type || "outbound-rtp" === a.type ? (c.ssrc = a.ssrc, c.inbound = "inbound-rtp" === a.type, c.data = a, c.reportType = "local") : "transport" === a.type && (c.Transport = a)),
			c
		}
		function U(a) {
			var b = "None";
			switch (a) {
			case 0:
				b = "TURN/TLS";
				break;
			case 1:
				b = "TURN/TCP";
				break;
			case 2:
				b = "TURN/UDP"
			}
			return b
		}
		function V(a, b) {
			var c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k = !1,
			l = "None",
			m = !1,
			n = function (a) {
				var b = a.typePreference >> 24;
				return "rtp" === a.protocol && a.address === c && (b >= 0 && 2 >= b && (l = U(b)), !0)
			};
			for (i = 0; i < a.length; i++)
				if (j = a[i], navigator.mozGetUserMedia && "candidatepair" === j.type && "true" === j.selected ? (m = !0, c = j.localAddr, d = j.remoteAddr, e = j.localAddrType, f = j.remoteAddrType, g = j.transportType) : "googCandidatePair" === j.type && "true" === j.googActiveConnection && (m = !0, c = j.googLocalAddress, d = j.googRemoteAddress, e = j.googLocalCandidateType, f = j.googRemoteCandidateType, g = j.googTransportType), m) {
					h = 0 === c.indexOf("["),
					b.iceCandidates.some(n);
					break
				}
			var o = b.transportData;
			return (void 0 === o || o.localAddr !== c || o.remoteAddr !== d || o.localAddrType !== e || o.remoteAddrType !== f || o.transportType !== g) && (b.transportData = {
					localAddr: c,
					remoteAddr: d,
					localAddrType: e,
					remoteAddrType: f,
					transportType: g,
					ipv6: h,
					relayType: l
				}, k = !0),
			k
		}
		function W(a) {
			var b = "";
			b += '{"Timestamp":"',
			b += a.timestamp instanceof Date ? a.timestamp.getTime().toString() : a.timestamp,
			b += '",',
			a.type && (b += '"type" : "' + a.type + '",');
			var c = 0;
			if (a.names) {
				var d = a.names();
				for (c = 0; c < d.length; ++c)
					b += '"', b += d[c], b += '" : "', b += a.stat(d[c]), b += '"', c + 1 !== d.length && (b += ",")
			} else {
				var e = Object.keys(a).length;
				c = 0;
				var f;
				for (f in a)
					a.hasOwnProperty(f) && (c++, "timestamp" !== f && (b += '"', b += f, b += '" : "', b += a[f], b += '"', e > c && (b += ",")))
			}
			return b += "}"
		}
		function X(a) {
			if (null === a)
				return !0;
			if (a.length > 0)
				return !1;
			if (0 === a.length)
				return !0;
			var b;
			for (b in a)
				if (a.hasOwnProperty(b))
					return !1;
			return !0
		}
		function Y(a) {
			return {
				magicKey: a,
				statsSubmissionInterval: Sa,
				endpoint: Ya,
				localUserName: Da
			}
		}
		function Z(a, b, c) {
			var d = Za[a];
			void 0 === d && (Za[a] = {}, Za[a].participants = null, c && (Za[a].userJoinedSent = !0), b && (Za[a].refreshPresence = b))
		}
		function $(a) {
			var b,
			c = a.statistics.outbound;
			if (void 0 !== c)
				for (b in c)
					c.hasOwnProperty(b) && (navigator.mozGetUserMedia && c[b].data.mozRtt ? c[b].data.mozRtt = 0 : c[b].data.googRtt && (c[b].data.googRtt = 0))
		}
		function _(a) {
			return clearInterval(a),
			null
		}
		function aa() {
			var a;
			for (a in Za)
				Za.hasOwnProperty(a) && (Za[a].refreshPresence = _(Za[a].refreshPresence), delete Za[a].refreshPresence);
			qa()
		}
		function ba() {
			var a,
			b = function (a) {
				return setInterval(function () {
					Wb(a)
				}, Ua)
			};
			for (a in Za)
				Za.hasOwnProperty(a) && (Wb(a), Za[a].refreshPresence = b(a));
			ra()
		}
		function ca(a) {
			var b = Za[a],
			c = !1;
			return void 0 !== b && b.participants && b.participants.length > 0 && (c = !0),
			c
		}
		function da(a, b) {
			var c = Za[a],
			d = [];
			if (void 0 === c)
				d.push(b), Za[a].participants = d;
			else {
				var e = c.participants;
				null === e ? (d.push(b), c.participants = d) : e.push(b)
			}
		}
		function ea(a) {
			var b = !1;
			if (!Za[a])
				return {
					conferenceFinished: b,
					ucID: null
				};
			var c = Za[a].ucID;
			return 0 === Za[a].participants.length && (_(Za[a].refreshPresence), qa(), delete Za[a], b = !0), {
				conferenceFinished: b,
				ucID: c
			}
		}
		function fa(a, b) {
			Ub(kb.userLeft, null, a, b, null, null, null),
			eb = _(eb),
			qa(),
			db = Mb,
			Mb = null
		}
		function ga(a, b, c) {
			var d = !1;
			if (null !== a && void 0 === a.challenge)
				return d;
			if (null !== a && a.challenge.appID === b && a.challenge.userID === encodeURIComponent(c)) {
				var e = null;
				if (navigator.mozGetUserMedia) {
					var f = a.challenge.expires.split(" ").join("T");
					e = Date.parse(f)
				} else
					e = new Date(a.challenge.expires);
				var h = new Date(g());
				e > h && (d = !0)
			}
			return d
		}
		function ha(a, b) {
			var c = JSON.parse(window.sessionStorage.getItem("csio_ucid_data"));
			c || (c = {}),
			c[a] || (c[a] = {}),
			c[a].ucID = b,
			window.sessionStorage.setItem("csio_ucid_data", JSON.stringify(c)),
			Ha[a] = za + Ba + "/conferences/" + encodeURIComponent(a) + "/" + b + "/general"
		}
		function ia(a) {
			var b = JSON.parse(window.sessionStorage.getItem("csio_ucid_data"));
			return b[a] ? b[a].ucID : null
		}
		function ja() {
			return Pa
		}
		function ka(a, b, c, d) {
			a === lb.clockSync ? ja() ? (_a.syncStartTime = f(), c.syncStartTime = _a.syncStartTime, c.offsetResultsLength = _a.offsetResults.length, Oa.emit(a, JSON.stringify(c)), d && b !== jb.fabricStats && d(nb.success, b + " sent to the backend.")) : setTimeout(function () {
				wc()
			}, 100) : ga(Fa, Ba, Ca) ? ab && c.action !== kb.userJoined && c.action !== kb.refreshPresence && c.action !== kb.fabricSetupFailed || !ja() ? (c.clockUnsynced = ab, Pb({
					type: b,
					action: a,
					data: c,
					callback: d
				})) : (Oa.emit(a, JSON.stringify(c)), d && b !== jb.fabricStats && d(nb.success, b + " sent to the backend.")) : vc(Ba, Ea, Ca, function (e, f) {
				e !== nb.success ? (e === pb.authOngoing && (c.clockUnsynced = ab, Pb({
							type: b,
							action: a,
							data: c,
							callback: d
						})), d && e !== pb.authOngoing && d(e, f)) : e === nb.success && "SDK authentication successful." === f && (ab && b !== kb.userJoined && c.action !== kb.refreshPresence && c.action !== kb.fabricSetupFailed || !ja() ? (c.clockUnsynced = ab, Pb({
							type: b,
							action: a,
							data: c,
							callback: d
						})) : (c.token = Fa.challenge.token, Oa.emit(a, JSON.stringify(c)), d && b !== jb.fabricStats && d(nb.success, b + " sent to the backend.")))
			})
		}
		function la(a, b, d, e, f) {
			var g = new c(b, "TEXT"),
			h = g.getHMAC(a, "TEXT", "SHA-1", "B64"),
			i = {};
			i.version = xa,
			i.challenge = {},
			i.challenge.response = h,
			i.challenge.original = b,
			i.appID = d,
			i.userID = encodeURIComponent(e),
			i.authType = ya;
			var j = va + "o/challenge";
			Hb(j, JSON.stringify(i), function (c) {
				var g;
				if (200 === c.status)
					g = JSON.parse(c.response), void 0 !== g.challenge.status && g.challenge.status !== nb.ok ? g.challenge.reason === ob.csProtoError ? (Ma = !1, ma(f)) : g.challenge.reason === ob.csNoAuthState && (Na || (Na = setTimeout(function () {
									vc(Ba, Ea, Ca, f)
								}, Va))) : (g.appID = d, window.localStorage.setItem("auth_data", JSON.stringify(g)), Ba = d, Ea = a, Ca = e, Fa = g, Ma = !1, Sa = parseInt(g.challenge.submissionInterval, 10), Ta = g.challenge.collectSDP, f && f(nb.success, "SDK authentication successful."), ja() ? (Ob(), f && f(nb.success, "WebSocket establishment successful.")) : yc(va + Ra, function (a, b) {
							void 0 !== f && f(a, b)
						}));
				else if (200 !== c.status && ((502 === c.status || 0 === c.status) && setTimeout(function () {
							la(a, b, d, e, f)
						}, Va), f)) {
					var h;
					400 === c.status ? (h = c.responseText, f(nb.authError, h)) : 502 === c.status || 0 === c.status ? (h = "HTTP " + c.status + ", " + c.statusText + ". Server temporarily unavailable. Retrying in " + Va + "ms", f(nb.appConnectivityError, h)) : (h = "HTTP " + c.status + ", " + c.statusText + ". " + c.responseText, f(nb.httpError, h))
				}
			})
		}
		function ma(a) {
			return a ? void a(nb.csProtoError, "Fatal authentication error. Invalid auth protocol message.") : void console.error("Fatal authentication error. Invalid auth protocol message.")
		}
		function na(a) {
			a && a(pb.authOngoing, null)
		}
		function oa(a) {
			if (null === a || "object" != typeof a)
				return a;
			var b,
			c = new a.constructor;
			for (b in a)
				a.hasOwnProperty(b) && (c[b] = oa(a[b]));
			return c
		}
		function pa() {
			var a = {};
			Object.keys(Za).forEach(function (b) {
				var c = Za[b];
				if (!c)
					return !0;
				var d,
				e,
				f = {
					ucID: c.ucID,
					userJoinedSent: c.userJoinedSent
				},
				g = [];
				if (c.participants) {
					var h,
					i = c.participants;
					for (d = 0; d < i.length; d++)
						e = {},
					h = i[d],
					e = {
						pcID: h.pcHash,
						pcState: h.pcState,
						iceConnectionState: h.iceConnectionState,
						iceGatheringState: h.iceGatheringState,
						iceCandidatesNumber: h.iceCandidates.length,
						remoteUserID: h.remoteUserID
					},
					g.push(e)
				}
				f.participants = g,
				a[b] = f
			});
			var b = {
				authStatus: !!Fa,
				clockSync: !ab,
				stateMachine: a,
				pageURL: window.location.href,
				eventType: "warn",
				version: xa
			};
			Ib(Ba, Ca, "stateMachine", b)
		}
		function qa() {
			fb || (fb = setInterval(function () {
						pa()
					}, gb))
		}
		function ra() {
			_(fb),
			fb = null
		}
		var sa,
		ta,
		ua,
		va = "https://collector.callstats.io:443/",
		wa = "443",
		xa = "3.13.1",
		ya = "BasicAuth",
		za = "https://dashboard.callstats.io/apps/",
		Aa = "https://dashboard.callstats.io/api-internal/v1/qmodelthresholds",
		Ba = -1,
		Ca = "",
		Da = null,
		Ea = null,
		Fa = null,
		Ga = null,
		Ha = {},
		Ia = !1,
		Ja = !1,
		Ka = 3e4,
		La = 1e4,
		Ma = !1,
		Na = null,
		Oa = null,
		Pa = !1,
		Qa = !1,
		Ra = "collectCallStats",
		Sa = 15e3,
		Ta = !1,
		Ua = 1e4,
		Va = 5e3,
		Wa = detectBrowserInfo(),
		Xa = measureAppLoadingPerformance(Wa),
		Ya = {
			type: "browser",
			name: Wa.name,
			ver: Wa.ver,
			os: Wa.os
		},
		Za = {},
		$a = {
			statsSubmissionIntervalInMS: [1e3, 2e3, 5e3, 1e4],
			statsSubmissionPhaseDurationInMS: [1e4, 3e4, 8e4, 18e4],
			currentActivePhaseIndex: 0
		},
		_a = {
			currentOffset: 0,
			offsetResults: [],
			syncStartTime: null,
			syncAttempts: 5,
			syncHandler: null,
			maxAllowedLatency: 6e4
		},
		ab = !0,
		bb = [],
		cb = {},
		db = null,
		eb = null,
		fb = null,
		gb = 2e4,
		hb = 100,
		ib = null;
		"Firefox" === Wa.name ? ib = mozRTCPeerConnection : "Chrome" === Wa.name || "Opera" === Wa.name ? ib = webkitRTCPeerConnection : "Safari" === Wa.name ? d("Browser type Safari") : "Edge" === Wa.name && (ib = window.RTCPeerConnection);
		var jb = {
			fabricSetup: "fabricSetup",
			fabricSetupFailed: "fabricSetupFailed",
			fabricHold: "fabricHold",
			fabricResume: "fabricResume",
			audioMute: "audioMute",
			audioUnmute: "audioUnmute",
			videoPause: "videoPause",
			videoResume: "videoResume",
			fabricUsageEvent: "fabricUsageEvent",
			fabricStats: "fabricStats",
			fabricTerminated: "fabricTerminated",
			screenShareStart: "screenShareStart",
			screenShareStop: "screenShareStop",
			dominantSpeaker: "dominantSpeaker",
			userIDChangedEvent: "userIDChangedEvent",
			activeDeviceList: "activeDeviceList",
			applicationErrorLog: "applicationErrorLog"
		},
		kb = {
			fabricDisrupted: "fabricDisrupted",
			autoFabricSetup: "autoFabricSetup",
			autoFabricSetupFailed: "autoFabricSetupFailed",
			userJoined: "userJoined",
			userLeft: "userLeft",
			fabricStatsCaching: "fabricStatsCaching",
			updatedConfiguration: "updatedConfiguration",
			refreshPresence: "refreshPresence",
			ssrcMap: "ssrcMap",
			mediaPlaybackStartEvent: "mediaPlaybackStartEvent",
			mediaSuspendedEvent: "mediaSuspendedEvent"
		},
		lb = {
			sdpSubmission: "sdpSubmissionEvent",
			rtpStats: "rtpStats",
			processedStats: "processedStats",
			callStatsEvent: "callStatsEvent",
			registerPresence: "registerPresence",
			userFeedback: "userFeedbackEvent",
			clockSync: "clockSync"
		},
		mb = {
			success: "success",
			failure: "failure"
		},
		nb = {
			httpError: "httpError",
			authError: "authError",
			wsChannelFailure: "wsChannelFailure",
			success: "success",
			csProtoError: "csProtoError",
			appConnectivityError: "appConnectivityError",
			ok: "OK"
		},
		ob = {
			csProtoError: "Protocol fields cannot be empty.",
			csNoAuthState: "Authentication state unavailable in server."
		},
		pb = {
			authOngoing: "authOngoing"
		},
		qb = {
			audio: "audio",
			video: "video",
			data: "data",
			screen: "screen",
			multiplex: "multiplex",
			unbundled: "unbundled"
		},
		rb = {
			local: "local",
			remote: "remote"
		},
		sb = {
			excellent: 5,
			good: 4,
			fair: 3,
			poor: 2,
			bad: 1
		},
		tb = {
			local: "local",
			remote: "remote",
			inbound: "inbound",
			outbound: "outbound"
		},
		ub = {
			excellent: 3,
			fair: 2,
			bad: 1
		},
		vb = {
			excellent: "excellent",
			fair: "fair",
			bad: "bad"
		},
		wb = {
			established: "established",
			initializing: "initializing",
			failed: "failed",
			disrupted: "disrupted"
		},
		xb = {
			createOffer: "createOffer",
			createAnswer: "createAnswer",
			setLocalDescription: "setLocalDescription",
			setRemoteDescription: "setRemoteDescription",
			addIceCandidate: "addIceCandidate",
			getUserMedia: "getUserMedia",
			iceConnectionFailure: "iceConnectionFailure",
			signalingError: "signalingError",
			applicationError: "applicationError",
			applicationLog: "applicationLog"
		},
		yb = {
			mediaConfigError: "MediaConfigError",
			negotiationFailure: "NegotiationFailure",
			sdpError: "SDPGenerationError",
			iceFailure: "IceConnectionFailure",
			transportFailure: "TransportFailure",
			signalingError: "SignalingError",
			applicationError: "ApplicationError",
			applicationLog: "ApplicationLog"
		},
		zb = {
			video: {
				gThreshold: 1024,
				rThreshold: 256
			},
			audio: {
				gThreshold: 30,
				rThreshold: 8
			}
		},
		Ab = {
			video: {
				gThreshold: .8,
				rThreshold: .3
			}
		},
		Bb = {
			video: {
				gThreshold: 400,
				rThreshold: 1e3
			}
		},
		Cb = {
			video: {
				gThreshold: 10,
				rThreshold: 50
			},
			audio: {
				gThreshold: 15,
				rThreshold: 30
			}
		},
		Db = {
			audio: {
				gThreshold: 240,
				rThreshold: 400
			}
		},
		Eb = {
			chrome: "Chrome",
			firefox: "Firefox",
			edge: "Edge"
		},
		Fb = {
			unknown: "unknown",
			audio: "audio",
			video: "video"
		},
		Gb = function (a, b) {
			var c = null,
			d = null,
			e = null,
			g = new XMLHttpRequest;
			g && (g.open("GET", encodeURI(a)), c = f(), g.onload = function () {
				d = f(),
				e = d - c,
				b(g, e)
			}, g.send())
		},
		Hb = function (a, b, c) {
			var d = new XMLHttpRequest;
			d && (d.open("POST", encodeURI(a)), d.setRequestHeader("Content-Type", "application/json"), d.onload = function () {
				c(d)
			}, d.send(b))
		},
		Ib = function (a, b, c, d) {
			var e = va + "generics",
			f = {
				appID: a,
				userID: encodeURIComponent(b),
				version: xa,
				eventType: c,
				data: d
			};
			Hb(e, JSON.stringify(f), function (a) {
				200 === a.status || 200 !== a.status
			})
		};
		window.addEventListener("error", function (a) {
			if (a && a.filename && a.filename.indexOf("callstats") > -1) {
				var b,
				c = !1,
				d = {
					fileName: a.filename,
					line: a.lineno,
					col: a.colno,
					jsVersion: xa,
					eventType: "error",
					message: a.message,
					pageURL: window.location.href
				};
				for (b in Za)
					Za.hasOwnProperty(b) && (d.conferenceID = b, Ib(Ba, Ca, "onErrorLog", d), c = !0);
				c || Ib(Ba, Ca, "onErrorLog", d)
			}
		});
		var Jb = {
			invalidWebRTCFunctionName: "Invalid WebRTC function name"
		},
		Kb = "fabricSetupFailed error reported by the developer",
		Lb = "Connectivity Failure",
		Mb = e(),
		Nb = function (a, b) {
			if (!Fa)
				return void vc(Ba, Ea, Ca);
			if (!ab) {
				var c,
				d,
				e,
				f,
				h = g(),
				i = [],
				j = Math.max(Sa / bb.length, hb);
				for (c = 0; c < bb.length; c++)
					if (e = bb[c], e.data.action !== kb.userJoined) {
						if (e.data.token = Fa.challenge.token, a && e.data.apiTS >= h - b || !e.data.ucID) {
							if (f = decodeURIComponent(e.data.conferenceID), !Za[f])
								continue;
							e.data.ucID = Za[f].ucID
						}
						if (e.data.clockUnsynced && (e.data.apiTS += _a.currentOffset), e.action === jb.fabricStats && e.data.clockUnsynced && e.data.processedStatistics && e.data.processedStatistics.length > 0)
							for (d = 0; d < e.data.processedStatistics.length; d++)
								e.data.processedStatistics[d].apiTS += _a.currentOffset;
						delete e.data.clockUnsynced,
						n(e, j * (c + 1))
					} else
						i.push(bb[c]);
				bb = i
			}
		},
		Ob = function () {
			if (!Fa)
				return void vc(Ba, Ea, Ca);
			var a,
			b,
			c = [],
			d = Math.max(Sa / bb.length, hb);
			for (a = 0; a < bb.length; a++)
				b = bb[a], b.type !== lb.callStatsEvent || b.data.action !== kb.userJoined && b.data.action !== jb.fabricSetupFailed ? c.push(bb[a]) : (b.data.token = Fa.challenge.token, b.data.clockUnsynced && (b.data.apiTS = b.data.apiTS + _a.currentOffset), b.data.value && (b.data.value.statsSubmissionInterval = Sa), n(b, d * (a + 1)));
			bb = c
		},
		Pb = function (a) {
			bb.push(a)
		},
		Qb = function (a, b) {
			var c = RegExp.prototype.test.bind(/^([a-z])=(.*)/),
			d = /^ssrc:(\d*) ([\w_]*):(.*)/,
			e = /^ssrc-group:SIM (\d*)/;
			a.split(/(\r\n|\r|\n)/).filter(c).forEach(function (a) {
				var c = a[0],
				h = a.slice(2);
				if ("a" === c) {
					if (d.test(h)) {
						var i = h.match(d),
						j = i[1];
						void 0 === cb[j] && (cb[j] = {}),
						cb[j][i[2]] = i[3],
						cb[j].localStartTime = f(),
						cb[j].syncedStartTime = g(),
						cb[j].streamType = b
					}
					e.test(h) && (void 0 === cb.ssrcGroup && (cb.ssrcGroup = {}, cb.ssrcGroup[b] = {}), cb.ssrcGroup[b].simulcastGroup = h.match(/\d+/g))
				}
			})
		},
		Rb = function (a) {
			return cb[a]
		},
		Sb = function () {
			return cb
		},
		Tb = function (a, b, c, d, e, f) {
			if (!e.localDescription || !e.remoteDescription)
				return !1;
			var g = e.localDescription.sdp,
			h = e.remoteDescription.sdp;
			if (!g || !h || g === d.localSDP && h === d.remoteSDP)
				return !1;
			if (Qb(g, tb.outbound), Qb(h, tb.inbound), Ta) {
				var i = {
					sdp: {}
				};
				i.sdp.localSDP = g !== d.localSDP ? g : -1,
				i.sdp.remoteSDP = h !== d.remoteSDP ? h : -1,
				Vb(a, b, c, i, d.pcHash, f)
			}
			return d.localSDP = g,
			d.remoteSDP = h,
			!0
		},
		Ub = function (a, b, c, d, e, f, h) {
			if (!a)
				return void console.error("sendEvent: Invalid eventType ");
			var i = g(),
			j = {
				version: xa,
				apiTS: i,
				action: a,
				localID: encodeURIComponent(Ca),
				remoteID: encodeURIComponent(b),
				conferenceID: encodeURIComponent(c),
				timeShift: 0,
				appID: Ba,
				ucID: d,
				pcID: f,
				deviceID: Ga,
				value: e
			};
			return null === b && (j.remoteID = null),
			null === c ? void Ib(Ba, Ca, "log", {
				msg: "conferenceID is null in sendEvent for " + a
			}) : void(Fa && ja() && (d && !ab || a === kb.userJoined || a === jb.fabricSetupFailed || a === kb.refreshPresence) ? (j.token = Fa.challenge.token, ka(lb.callStatsEvent, a, j, h)) : (j.clockUnsynced = ab, Fa || vc(Ba, Ea, Ca), a !== kb.fabricStatsCaching && a !== kb.refreshPresence && Pb({
						type: lb.callStatsEvent,
						action: lb.callStatsEvent,
						data: j,
						callback: h
					})))
		},
		Vb = function (a, b, c, d, e, f) {
			var h = g(),
			i = {
				version: xa,
				appID: Ba,
				conferenceID: encodeURIComponent(b),
				ucID: c,
				apiTS: h,
				localID: encodeURIComponent(Ca),
				remoteID: encodeURIComponent(a),
				pcID: e,
				deviceID: Ga,
				sdpPayload: d
			};
			Fa && ja() && c && !ab ? (i.token = Fa.challenge.token, ka(lb.sdpSubmission, lb.sdpSubmission, i, f)) : (i.clockUnsynced = ab, Pb({
					type: lb.sdpSubmission,
					action: lb.sdpSubmission,
					data: i,
					callback: f
				}), Fa || vc(Ba, Ea, Ca))
		},
		Wb = function (a) {
			var b = {
				ucID: Za[a].ucID,
				magicKey: Mb,
				endpoint: Ya,
				fabricState: {},
				connectedDevices: sa
			},
			c = Za[a];
			if (c && c.participants) {
				var d,
				e = c.participants,
				f = 0;
				for (f = 0; f < e.length; f++)
					d = e[f], b.fabricState[f] = {
						pc: d.pcHash,
						userId: d.remoteUserID,
						pcState: d.pcState,
						iceConnectionState: d.pc.iceConnectionState,
						iceGatheringState: d.pc.iceGatheringState,
						iceCandidatesNumber: d.iceCandidates.length,
						numNegotiationNeededCalls: d.numNegotiationNeededCalls
					}
			}
			ab || (b.clockSyncOffset = _a.currentOffset),
			Ub(kb.refreshPresence, null, a, Za[a].ucID, b, null)
		},
		Xb = function (a) {
			var b = {
				appID: Ba,
				userID: encodeURIComponent(Ca),
				version: xa,
				endpoint: Ya,
				pagePerf: Xa,
				endpointID: Ga,
				wsID: a.io.engine.id
			};
			-1 !== Ba && Fa && (b.token = Fa.challenge.token, a.emit(lb.registerPresence, JSON.stringify(b)))
		},
		Yb = function () {
			var a = window.localStorage.getItem("feedback"),
			b = JSON.parse(window.localStorage.getItem("auth_data"));
			if (null !== a) {
				var c = JSON.parse(a),
				d = b.challenge.token === c.token;
				d || Ca !== c.userID || (c.token = b.challenge.token, d = !0),
				d ? ka(lb.userFeedback, lb.userFeedback, c) : window.localStorage.removeItem("feedback")
			}
		},
		Zb = function (a, b) {
			var c = {};
			return c.status = a,
			b && (c.message = b),
			c
		},
		$b = function (a, b, d, e, g, h) {
			if (!a || !b || null === d || void 0 === d || 0 >= a)
				return console.error("initialize: Argument missing/invalid"), Zb(mb.failure, "initialize: Argument missing/invalid");
			if ("string" == typeof a && (a = parseInt(a, 10)), Ba = a, Ea = b, "object" == typeof d ? (Da = d.userName, Ca = d.displayName) : Ca = d, h && (h.disableBeforeUnloadHandler === !0 && (Ia = !0), (null !== h.applicationVersion || void 0 !== h.applicationVersion) && (Ya.appVer = h.applicationVersion)), m(), Ga = window.localStorage.getItem("endpointID"), null === Ga) {
				var i = f(),
				j = Math.random() * i,
				k = new c(j.toString(), "TEXT");
				Ga = k.getHash("SHA-1", "B64"),
				window.localStorage.setItem("endpointID", Ga)
			}
			l(),
			ua = g;
			var n = JSON.parse(window.localStorage.getItem("auth_data"));
			return ga(n, a, d) ? (e && e(nb.success, "SDK already authenticated."), Sa = parseInt(n.challenge.submissionInterval, 10), Ta = n.challenge.collectSDP, Fa = n, ja() || yc(va + Ra, e)) : vc(a, b, d, e),
			Zb(mb.success)
		},
		_b = function (a) {
			return function (b) {
				return b.remoteUserID === a || void 0
			}
		},
		ac = function (a, b) {
			var c = !1,
			d = null;
			return Za[a] && Za[a].participants && (d = Za[a].participants.filter(_b(b))),
			c = !!(d && d.length > 0)
		},
		bc = function (a) {
			return function (b) {
				return b.pc === a || void 0
			}
		},
		cc = function (a, b) {
			var c = null,
			d = null;
			return Za[a] && Za[a].participants && (d = Za[a].participants.filter(bc(b))),
			c = d && d.length > 0 ? d[0] : null
		},
		dc = function (a, b) {
			var c = null,
			d = null;
			return c = cc(a, b),
			c && (d = c.pcHash),
			d
		},
		ec = function (a) {
			var b = null,
			c = null,
			d = null;
			for (b in Za)
				if (Za.hasOwnProperty(b) && (d = cc(b, a))) {
					c = {
						fabric: d,
						conferenceID: b
					};
					break
				}
			return c
		},
		fc = function (a, b) {
			var c = 0;
			if (a && Za[b].participants)
				for (c = 0; c < Za[b].participants.length; c++)
					if (Za[b].participants[c].pcHash === a.pcHash) {
						Za[b].participants.splice(c, 1);
						break
					}
		},
		gc = function (a, b, c, d) {
			if (!a || !b || !c)
				return console.error("sendFabricEvent: Arguments missing/Invalid"), Zb(mb.failure, "sendFabricEvent: Arguments missing/Invalid");
			if (!Ba || 0 > Ba || !Ea || "" === Ca || !Za[c])
				return console.error("sendFabricEvent: SDK is not initialized or no Fabrics added."), Zb(mb.failure, "sendFabricEvent: SDK is not initialized or no Fabrics added.");
			if (b === jb.fabricSetupFailed)
				return console.error("sendFabricEvent: Unsupported fabricEvent fabricSetupFailed"), Zb(mb.failure, "sendFabricEvent: Unsupported fabricEvent fabricSetupFailed");
			if (!r(a))
				return console.error("sendFabricEvent: Invalid PeerConnection object passed"), Zb(mb.failure, "sendFabricEvent: Invalid PeerConnection object passed");
			if (!jb.hasOwnProperty(b) && !kb.hasOwnProperty(b))
				return console.error("sendFabricEvent: Invalid fabricEvents value: ", b), Zb(mb.failure, "sendFabricEvent: Invalid fabricEvents value: " + b);
			var e = null,
			g = null,
			h = f(),
			i = Za[c],
			j = null;
			if (void 0 === i)
				return console.error("sendFabricEvent: Conference ID not found!"), Zb(mb.failure, "sendFabricEvent: Conference ID not found!");
			if (j = cc(c, a), null === j)
				return console.error("sendFabricEvent: fabricData is null"), Zb(mb.failure, "sendFabricEvent: fabricData is null");
			g = j.remoteUserID;
			var k = j.startTime;
			if (!(b === jb.fabricSetup || b === kb.autoFabricSetup && j.fabricSetupSent)) {
				if (b === kb.autoFabricSetup) {
					var l = h - j.startTime;
					e = {
						setupDelay: l,
						iceCandidates: j.iceCandidates,
						iceGatheringDelay: j.gatheringIceCandidatesDelay,
						iceConnectivityDelay: j.connectivityIceStatusDelay
					},
					j.pcState = wb.established,
					j.fabricSetupSent = !0
				} else if (b === kb.autoFabricSetupFailed)
					e = {
						failureDelay: j.setupFailureTime,
						reason: yb.iceFailure,
						domError: Lb
					};
				else if (b === kb.fabricDisrupted)
					e = {
						disruptionDelay: j.connectivityIceStatusDelay
					};
				else if (b === kb.updatedConfiguration)
					e = j.transportData;
				else if (b === jb.fabricSetupFailed) {
					var m = h - k;
					e = {
						failureDelay: m,
						reason: yb.iceFailure,
						domError: Kb,
						fabricState: j.pcState,
						iceConnectionState: j.pc.iceConnectionState,
						"function": xb.iceConnectionFailure,
						magicKey: Mb,
						endpoint: Ya
					}
				} else if (b === jb.activeDeviceList) {
					if (!d || !d.deviceList)
						return console.error("sendFabricEvent: Arguments missing/Invalid"), Zb(mb.failure, "sendFabricEvent: Arguments missing/Invalid");
					e = {
						magicKey: Mb,
						endpoint: Ya,
						activeDevicelist: d.deviceList
					}
				}
				if (Ub(b, g, c, i.ucID, e, j.pcHash, j.pcCallback), (b === jb.fabricTerminated || b === kb.autoFabricSetupFailed || b === jb.fabricSetupFailed) && Za[c].participants) {
					j && (j.statsInterval = _(j.statsInterval), fc(j, c));
					var n = ea(c);
					n.conferenceFinished && fa(c, n.ucID)
				}
				if ((b === jb.fabricSetup || b === jb.fabricUsageEvent) && !j.fabricUsageSent) {
					var o = j.fabricUsage;
					j.fabricUsageSent = !0,
					Ub(jb.fabricUsageEvent, g, c, i.ucID, o, j.pcHash, null)
				}
				return Zb(mb.success)
			}
		},
		hc = function (a, b, c) {
			return b ? b : a && a[c] ? a[c].sdp : -1
		},
		ic = function (a, b, c, d, g, h) {
			if (void 0 === a || !c || !b)
				return console.error("reportError: Arguments missing/invalid"), Zb(mb.error, "reportError: Arguments missing/invalid");
			if (0 > Ba || !Ba || !Ea || "" === Ca)
				return console.error("reportError: SDK is not initialized"), Zb(mb.error, "reportError: SDK is not initialized");
			if (!xb.hasOwnProperty(c))
				return console.error("reportError: Invalid webRTC functionName value: %o", c), Zb(mb.error, "reportError: Invalid webRTC functionName value: " + c);
			void 0 === d && console.warn("reportError: Missing dom error parameter");
			var i,
			j = null,
			k = null,
			l = f(),
			m = Za[b],
			n = null;
			if (i = S(c), d && d instanceof DOMException)
				d = {
					message: d.message,
					name: d.name
				};
			else if (d && "object" == typeof d) {
				var o = {};
				d.hasOwnProperty("message") && (o.message = d.message),
				d.hasOwnProperty("name") && (o.name = d.name),
				d.hasOwnProperty("constraintName") && (o.constraintName = d.constraintName),
				d.hasOwnProperty("stack") && (o.stack = d.stack),
				d = o
			}
			if (r(a)) {
				if (void 0 === m)
					return console.error("reportError: Conference ID not found!"), Zb(mb.error, "reportError: Conference ID not found!");
				if (n = cc(b, a), null === n)
					return console.error("reportError: Invalid pcObject passed as argument"), Zb(mb.error, "reportError: Invalid pcObject passed as argument");
				k = n.remoteUserID;
				var p = n.startTime,
				q = l - p;
				if (j = {
						failureDelay: q,
						reason: i,
						domError: d,
						fabricState: n.pcState,
						iceConnectionState: n.pc.iceConnectionState,
						"function": c,
						magicKey: Mb,
						endpoint: Ya
					}, c === xb.applicationLog || c === xb.applicationError ? Ub(jb.applicationErrorLog, k, b, m.ucID, j, n.pcHash, n.pcCallback) : Ub(jb.fabricSetupFailed, k, b, m.ucID, j, n.pcHash, n.pcCallback), g || h || a && a.localDescription || a && a.remoteDescription) {
					var s = {
						sdp: {}
					};
					s.sdp.localSDP = hc(a, g, "localDescription"),
					s.sdp.remoteSDP = hc(a, h, "remoteDescription"),
					Vb(k, b, m.ucID, s, n.pcHash)
				}
			} else {
				null === Mb && (Mb = e());
				var t = e();
				j = {
					failureDelay: 0,
					reason: i,
					domError: d,
					"function": c,
					magicKey: Mb,
					endpoint: Ya
				},
				c === xb.applicationLog || c === xb.applicationError ? Ub(jb.applicationErrorLog, k, b, null, j, t, null) : Ub(jb.fabricSetupFailed, k, b, null, j, t, null)
			}
			return Zb(mb.success)
		},
		jc = function (a, b, c) {
			if (!b || !a)
				return console.error("sendUserFeedback: Arguments missing/Invalid"), Zb(mb.error, "sendUserFeedback: Arguments missing/Invalid");
			if ("object" != typeof b)
				return console.error("sendUserFeedback: Invalid feedback object."), Zb(mb.error, "sendUserFeedback: Invalid feedback object.");
			if (0 === Object.keys(b).length)
				return console.error("sendUserFeedback: Feedback data object must not be empty."), Zb(mb.error, "sendUserFeedback: Feedback data object must not be empty.");
			if (!b.hasOwnProperty("overall"))
				return console.error("sendUserFeedback: Feedback data object must contain 'conferenceID', 'userID' and 'overall' keys."), Zb(mb.error, "sendUserFeedback: Feedback data object must contain 'conferenceID', 'userID' and 'overall' keys.");
			var d = Za[a],
			e = null;
			void 0 !== d && void 0 !== d.ucID && (e = d.ucID);
			var f = null;
			if (f = null === Mb ? db : Mb, null === e && (e = ia(a)), null === e)
				return console.error("sendUserFeedback: ucID unavailable"), Zb(mb.error, "sendUserFeedback: ucID unavailable");
			var g = {
				conferenceID: encodeURIComponent(a),
				magicKey: f,
				appID: Ba,
				version: xa,
				ucID: e,
				userID: encodeURIComponent(b.userID),
				userQoe: {
					overall: b.overall
				}
			};
			return b.hasOwnProperty("video") ? g.userQoe.video = b.video : g.userQoe.video = -1,
			b.hasOwnProperty("audio") ? g.userQoe.audio = b.audio : g.userQoe.audio = -1,
			b.hasOwnProperty("screen") ? g.userQoe.screen = b.screen : g.userQoe.screen = -1,
			b.hasOwnProperty("comment") ? g.userQoe.comment = b.comment : g.userQoe.comment = -1,
			Fa && !ab ? (g.token = Fa.challenge.token, window.localStorage.setItem("feedback", JSON.stringify(g)), ka(lb.userFeedback, lb.userFeedback, g, c)) : (g.clockUnsynced = ab, Pb({
					type: lb.userFeedback,
					action: lb.userFeedback,
					data: g,
					callback: c
				}), vc(Ba, Ea, Ca)),
			Zb(mb.success)
		},
		kc = function (a, b, c, d, e, f) {
			var g = null;
			if (g = "object" == typeof b ? b.displayName : b, !(a && c && g && d && e))
				return console.error("associateMstWithUserID: Arguments missing"), Zb(mb.error, "associateMstWithUserID: Arguments missing");
			if ("" === c || "" === g || "" === d || "" === e)
				return console.error("associateMstWithUserID: conferenceID or remoteUserID or ssrc MUST not be empty"), Zb(mb.error, "associateMstWithUserID: conferenceID or remoteUserID or ssrc MUST not be empty");
			if (!r(a))
				return console.error("associateMstWithUserID: Invalid PeerConnection object passed"), Zb(mb.error, "associateMstWithUserID: Invalid PeerConnection object passed");
			var h = Za[c];
			if (void 0 === h)
				return console.error("associateMstWithUserID: conferenceID doesn't exist"), Zb(mb.error, "associateMstWithUserID: conferenceID doesn't exist");
			var i = null;
			if (i = cc(c, a), null === i)
				return console.error("associateMstWithUserID: Unknown pcObject passed"), Zb(mb.error, "associateMstWithUserID: Unknown pcObject passed");
			var j = Rb(d);
			return void 0 === j && (cb[d] = {}, j = Rb(d)),
			j.remoteUserID = g,
			j.ssrc = d,
			j.associatedVideoTag = f,
			j.usageLabel = e,
			f && g !== Ca && q(g, c, f, a, d),
			Zb(mb.success)
		},
		lc = function (a, b, c, d, g) {
			var h = null,
			i = {
				authStatus: !!Fa,
				clockSync: !ab,
				msg: "addNewFabric called",
				eventType: "warn",
				pageURL: window.location.href,
				conferenceID: d,
				version: xa
			};
			if (Ib(Ba, Ca, "stateMachine", i), h = "object" == typeof b ? b.displayName : b, !(a && h && c && d))
				return console.error("addNewFabric: Arguments missing/Invalid"), Zb(mb.error, "addNewFabric: Arguments missing/Invalid");
			if (0 > Ba || !Ba || !Ea || "" === Ca)
				return console.error("addNewFabric: SDK not initialized."), Zb(mb.error, "addNewFabric: SDK not initialized");
			if ("" === d || "" === h)
				return console.error("addNewFabric: conferenceID or remoteUserID MUST not be empty"), Zb(mb.error, "addNewFabric: conferenceID or remoteUserID MUST not be empty");
			if (!r(a))
				return console.error("addNewFabric: Invalid PeerConnection object passed"), Zb(mb.error, "addNewFabric: Invalid PeerConnection object passed");
			if (!qb.hasOwnProperty(c) || c instanceof Function)
				return console.error("addNewFabric: Invalid fabricUsage value"), Zb(mb.error, "addNewFabric: Invalid fabricUsage value");
			var j = f();
			null === Mb && (Mb = e());
			var k = null,
			l = !1;
			if (!ca(d)) {
				var m = Y(Mb);
				Ub(kb.userJoined, null, d, null, m, null, null),
				l = !0,
				i = {
					authStatus: !!Fa,
					clockSync: !ab,
					msg: "userJoined sent",
					pageURL: window.location.href,
					eventType: "warn",
					conferenceID: d,
					version: xa
				},
				Ib(Ba, Ca, "stateMachine", i)
			}
			a.addEventListener("icecandidate", rc, !1),
			a.addEventListener("iceconnectionstatechange", qc, !1),
			a.addEventListener("signalingstatechange", nc, !1),
			a.addEventListener("negotiationneeded", pc, !1);
			var n = e(),
			o = {
				pc: a,
				remoteUserID: h,
				fabricUsage: c,
				magicKey: Mb,
				startTime: j,
				pcCallback: g,
				pcState: wb.initializing,
				fabricSetupSent: !1,
				iceCandidates: [],
				iceConnectionState: a.iceConnectionState,
				latestEventSent: j,
				pcHash: n,
				localSDP: -1,
				remoteSDP: -1,
				statsInterval: null,
				initialPhaseOver: !1,
				intervalAdaptionPhase: !0,
				gatheringIceCandidatesDelay: 0,
				connectivityIceStatusDelay: 0,
				numNegotiationNeededCalls: 0
			};
			return "function" == typeof a && (a.callstatsID = e()),
			("connected" === a.iceConnectionState || "completed" === a.iceConnectionState) && (o.pcState = wb.established),
			Z(d, k, l),
			cc(d, a) || da(d, o),
			o.pcState === wb.established && (gc(a, kb.autoFabricSetup, d), oc(o, a, d, h)),
			Zb(mb.success)
		},
		mc = function (a, b, c, d) {
			if (!(a && c && d && b))
				return console.error("reportUserIDChange: Arguments missing/Invalid"), Zb(mb.error, "reportUserIDChange: Arguments missing/Invalid");
			if (0 > Ba || !Ba || !Ea || "" === Ca)
				return console.error("reportUserIDChange: SDK not initialized."), Zb(mb.error, "reportUserIDChange: SDK not initialized");
			if ("" === c || "" === b)
				return console.error("reportUserIDChange: id or  conferenceID MUST not be empty"), Zb(mb.error, "reportUserIDChange: id or  conferenceID MUST not be empty");
			if (!r(a))
				return console.error("reportUserIDChange: Invalid PeerConnection object passed"), Zb(mb.error, "reportUserIDChange: Invalid PeerConnection object passed");
			var e,
			f = null,
			g = Za[b];
			if (void 0 === g)
				return console.error("reportUserIDChange: Conference ID not found!"), Zb(mb.error, "reportUserIDChange: Conference ID not found!");
			var h = null;
			if (void 0 === g.ucID)
				return console.error("reportUserIDChange: addNewFabric was not called"), Ib(Ba, Ca, "log", {
					msg: "### reportUserIDChange: addNewFabric was not called"
				}), Zb(mb.error, "reportUserIDChange: addNewFabric was not called");
			if (h = g.ucID, f = cc(b, a), null === f)
				return console.error("reportUserIDChange: Invalid pcObject passed as argument"), Zb(mb.error, "reportUserIDChange: Invalid pcObject passed as argument");
			var i = {
				id: c,
				idType: d
			};
			return Ub(jb.userIDChangedEvent, e, b, h, i, null, f.pcCallback),
			Zb(mb.success)
		},
		nc = function (a) {
			if (a) {
				var b,
				c = Wa.codebase,
				d = null;
				if (c === Eb.firefox)
					b = a.target;
				else if (c === Eb.chrome)
					b = a.srcElement;
				else {
					if (c !== Eb.edge)
						return void console.error("PeerConnection signaling state changed: unsupported code base");
					b = a.pc
				}
				if (void 0 !== b) {
					var e = b.signalingState;
					"closed" === e && (d = ec(b), d && d.fabric && gc(b, jb.fabricTerminated, d.conferenceID))
				}
			}
		},
		oc = function (a, b, c, d) {
			null === a.statsInterval && (a.statsPollingStart = f(), sc(b, c, d), a.statsInterval = setInterval(sc, $a.statsSubmissionIntervalInMS[$a.currentActivePhaseIndex], b, c, d))
		},
		pc = function (a) {
			if (a) {
				var b,
				c = Wa.codebase;
				if (c === Eb.firefox)
					b = a.target;
				else if (c === Eb.chrome)
					b = a.srcElement;
				else {
					if (c !== Eb.edge)
						return void console.error("PeerConnection negotiation needed: unsupported code base");
					b = a.pc
				}
				if (void 0 !== b) {
					var d = null;
					d = ec(b),
					d && d.fabric && d.fabric.numNegotiationNeededCalls++
				}
			}
		},
		qc = function (a) {
			if (a) {
				var b,
				c = Wa.codebase;
				if (c === Eb.firefox)
					b = a.target;
				else if (c === Eb.chrome)
					b = a.srcElement;
				else {
					if (c !== Eb.edge)
						return void console.error("PeerConnection ICE connection state changed: unsupported code base");
					b = a.pc
				}
				if (void 0 !== b) {
					var d,
					e,
					g,
					h,
					i = null,
					j = null;
					j = ec(b),
					j && j.fabric && (i = j.fabric, d = j.conferenceID, e = i.remoteUserID, g = f(), h = g - i.startTime, "complete" === b.iceGatheringState && "checking" === b.iceConnectionState && (i.gatheringIceCandidatesDelay = h), "connected" === b.iceConnectionState || "completed" === b.iceConnectionState ? (i.connectivityIceStatusDelay = h, i.pcState === wb.initializing ? i.fabricSetupSent || gc(i.pc, kb.autoFabricSetup, d) : i.pcState === wb.disrupted && gc(i.pc, kb.fabricDisrupted, d), i.pcState = wb.established, oc(i, b, d, e)) : "failed" === b.iceConnectionState ? (i.setupFailureTime = h, gc(i.pc, kb.autoFabricSetupFailed, d), i.pcState = wb.failed) : "disconnected" === b.iceConnectionState && (i.startTime = f(), i.pcState = wb.disrupted, i.pcCallback && i.pcCallback(nb.appConnectivityError, "Connectivity check for PC object to " + e + " failed.")), i.iceConnectionState = b.iceConnectionState)
				}
			}
		},
		rc = function (a) {
			var b,
			c,
			d;
			if (null !== a.candidate) {
				var e = a.candidate.candidate;
				c = e.split(" ");
				var f = "1" === c[1] ? "rtp" : "rtcp";
				"0" !== c[5] && (d = -1 !== c[4].indexOf(":"), b = {
						transport: c[2],
						protocol: f,
						typePreference: c[3],
						address: d ? "[" + c[4] + "]:" + c[5] : c[4] + ":" + c[5],
						type: c[7],
						media: a.candidate.sdpMid
					})
			}
			var g,
			h = Wa.codebase;
			if (h === Eb.firefox)
				g = a.target;
			else if (h === Eb.chrome)
				g = a.srcElement;
			else {
				if (h !== Eb.edge)
					return void console.error("PeerConnection ICE candidate found: unsupported code base");
				g = a.pc
			}
			if (void 0 !== g) {
				var i = null;
				i = ec(g),
				i && i.fabric && void 0 !== b && -1 === i.fabric.iceCandidates.indexOf(b) && i.fabric.iceCandidates.push(b)
			}
		},
		sc = function (a, b, c) {
			if (!Za.hasOwnProperty(b))
				return void console.error("ConferenceID %o doesn't exist. Can't call getStats for it.", b);
			if (!ac(b, c))
				return void console.error("Remote user ID %o doesn't exist. Can't call getStats for it.", c);
			if ("closed" === a.signalingState)
				return gc(a, jb.fabricTerminated, b), !0;
			var d = cc(b, a);
			if (d.pcState !== wb.established && d.lastFabricState === d.pcState)
				return !0;
			var e = Wa.codebase,
			g = Wa.name,
			h = Za[b].ucID;
			e === Eb.firefox || "Safari" === g ? a.getStats(null, R(Ca, c, b, h, d, a, d.pcCallback), function (a) {
				Ib(Ba, Ca, "log", {
					msg: "### " + e + " getStats reports error " + JSON.stringify(a)
				})
			}) : e === Eb.chrome ? a.getStats(R(Ca, c, b, h, d, a, d.pcCallback)) : e === Eb.edge && a.getStats().then(R(Ca, c, b, h, d, a, d.pcCallback))["catch"](function (a) {
				Ib(Ba, Ca, "log", {
					msg: "### " + e + " getStats reports error " + JSON.stringify(a)
				})
			});
			var i,
			j = f(),
			k = j - d.statsPollingStart,
			l = 5e3;
			(k > $a.statsSubmissionPhaseDurationInMS[$a.currentActivePhaseIndex] && d.intervalAdaptionPhase || Ja === !0) && (_(d.statsInterval), Ja ? (i = Ka, d.intervalAdaptionPhase = !1, Ja = !1) : $a.currentActivePhaseIndex < $a.statsSubmissionIntervalInMS.length - 1 ? ($a.currentActivePhaseIndex += 1, i = $a.statsSubmissionIntervalInMS[$a.currentActivePhaseIndex]) : (i = Sa, d.intervalAdaptionPhase = !1), i > l && (d.initialPhaseOver = !0), d.statsInterval = setInterval(sc, i, a, b, c))
		},
		tc = function (a, b, c) {
			b.hasOwnProperty(a) && (b[a].hasOwnProperty("video") && (b[a].video.isGreaterBetter ? (c.video.gThreshold = b[a].video.upperThreshold, c.video.rThreshold = b[a].video.lowerThreshold) : (c.video.gThreshold = b[a].video.lowerThreshold, c.video.rThreshold = b[a].video.upperThreshold)), b[a].hasOwnProperty("audio") && (b[a].audio.isGreaterBetter ? (c.audio.gThreshold = b[a].audio.upperThreshold, c.audio.rThreshold = b[a].audio.lowerThreshold) : (c.audio.gThreshold = b[a].audio.lowerThreshold, c.audio.rThreshold = b[a].audio.upperThreshold)))
		},
		uc = function () {
			Gb(Aa, function (a) {
				if (200 === a.status) {
					var b = JSON.parse(a.responseText);
					tc("eModelThreshold", b, Db),
					tc("throughputThreshold", b, zb),
					tc("fractionalLossThreshold", b, Cb),
					tc("rttThreshold", b, Bb),
					tc("currOverPrevFrameRateThreshold", b, Ab)
				}
			})
		},
		vc = function (a, b, c, d) {
			if (!(void 0 === a || void 0 === b || void 0 === c || 0 >= a || 0 > c)) {
				if (Ma)
					return void na(d);
				Na && (clearTimeout(Na), Na = null),
				Ma = !0;
				var e = va + "o/authorize",
				f = {
					appID: a,
					userID: encodeURIComponent(c),
					version: xa,
					authType: ya
				};
				Hb(e, JSON.stringify(f), function (e) {
					var f;
					if (200 === e.status)
						f = JSON.parse(e.response), void 0 !== f.authorize.status && f.authorize.status !== nb.ok ? f.reason === ob.csProtoError && (Ma = !1, ma(d)) : la(b, f.authorize.challenge, a, c, d);
					else if (200 !== e.status && (Ma = !1, (502 === e.status || 0 === e.status || 500 === e.status) && (Na || (Na = setTimeout(function () {
											vc(a, b, c, d)
										}, Va))), void 0 !== d)) {
						var g;
						400 === e.status ? (g = e.responseText, d(nb.authError, g)) : 502 === e.status || 0 === e.status || 500 === e.status ? (g = "HTTP " + e.status + ", " + e.statusText + ". Server temporarily unavailable. Retrying in " + Va + "ms", d(nb.appConnectivityError, g)) : (g = "HTTP " + e.status + ", " + e.statusText + ". " + e.responseText, d(nb.httpError, g))
					}
				})
			}
		},
		wc = function () {
			var a = va + "clockSync",
			b = null,
			c = null;
			Gb(a, function (a, d) {
				200 === a.status && (b = JSON.parse(a.response), c = f(), xc(b, d, c))
			})
		},
		xc = function (a, b, c) {
			if (ab) {
				var d = b / 2;
				if (d > _a.maxAllowedLatency)
					_a.offsetResults = [], Ib(Ba, Ca, "log", {
						msg: "clockSync restarting"
					});
				else {
					var e = a.now + d,
					f = e - c;
					_a.offsetResults.push(f)
				}
				if (_a.offsetResults.length >= _a.syncAttempts) {
					var g = _a.offsetResults.reduce(function (a, b) {
							return a + b
						});
					_a.currentOffset = g / _a.offsetResults.length,
					_a.offsetResults = [],
					ab = !1,
					Ib(Ba, Ca, "log", {
						msg: "clockSync Done"
					})
				} else
					ab && setTimeout(function () {
						wc()
					}, 100)
			}
		},
		yc = function (a, c) {
			return Pa ? (Ib(Ba, Ca, "log", {
					msg: "### _setupChannel is called when already connected!"
				}), void(c && c(nb.success, "WebSocket establishment successful."))) : Oa ? void Ib(Ba, Ca, "log", {
				msg: "### _setupChannel is called when _connection is not null and not connected! Let's rely on auto reconnect!"
			}) : (Oa = b.connect(a, {
						port: wa,
						reconnect: !0,
						"reconnection delay": 500,
						"max reconnection attempts": 500,
						reconnectionDelayMax: 8e3
					}), Oa.on("connect", function () {
					Ib(Ba, Ca, "log", {
						msg: "Successfully connected to the backend",
						io_ver: b.protocol
					}),
					Pa = !0,
					_a.syncHandler || (Ib(Ba, Ca, "log", {
							msg: "start clockSync"
						}), _a.offsetResults = [], wc(), _a.syncHandler = !0),
					Ob(),
					Qa ? ba() : Xb(Oa),
					Qa = !1
				}), Oa.on("disconnect", function () {
					Pa = !1,
					aa(),
					ab && (_a.offsetResults = [], _a.syncHandler = null, ab = !1),
					c && c(nb.httpError, "Connection to the server disappeared.")
				}), Oa.on("connect_failed", function () {
					Pa = !1,
					c && c(nb.wsChannelFailure, "WebSocket establishment failed.")
				}), Oa.on("reconnect", function () {
					Qa = !0
				}), Oa.on("reconnect_failed", function () {
					Pa = !1
				}), void Oa.on("response", function (a) {
					var b = f(),
					d = JSON.parse(a);
					if ("Error" === d.status)
						"Invalid client token." === d.reason && (Fa = null, vc(Ba, Ea, Ca)), c && c(nb.csProtoError, a.reason);
					else if ("200 OK" === d.status)
						if ("feedback" === d.event)
							window.localStorage.removeItem("feedback");
						else if (d.event === kb.userJoined || d.event === kb.refreshPresence) {
							var e,
							g = !1,
							h = null,
							i = decodeURIComponent(d.conferenceID),
							j = function (a) {
								return setInterval(function () {
									Wb(a)
								}, Ua)
							};
							for (e in Za)
								if (Za.hasOwnProperty(e) && e === i) {
									Za[e].ucID !== d.ucID && (g = !0, ha(e, d.ucID), h = d.conferenceCreationTS ? d.conferenceCreationTS : d.conferenceDuration),
									d.event !== kb.userJoined || Za[e].refreshPresence || (Za[e].refreshPresence = j(i), ra()),
									Za[e].ucID = d.ucID;
									break
								}
							Yb(),
							Nb(g, h)
						} else
							d.event === lb.clockSync && xc(d, b)
				}))
		};
		return i(),
		uc(),
		wc(),
		qa(), {
			version: xa,
			initialize: $b,
			fabricEvent: jb,
			addNewFabric: lc,
			sendFabricEvent: gc,
			sendUserFeedback: jc,
			associateMstWithUserID: kc,
			csError: nb,
			fabricUsage: qb,
			qualityRating: sb,
			webRTCFunctions: xb,
			reportError: ic,
			reportUserIDChange: mc,
			userIDType: rb,
			callStatsAPIReturnStatus: mb
		}
	};
	"function" == typeof define && define.amd ? define("callstats", ["jquery", "socketio", "sha"], b) : a.callstats = b
}
(this);
var T1 = 500, T2 = 4e3, T4 = 5e3, Timers = {
	T1: T1,
	T2: T2,
	T4: T4,
	TIMER_B: 64 * T1,
	TIMER_D: 0 * T1,
	TIMER_F: 64 * T1,
	TIMER_H: 64 * T1,
	TIMER_I: 0 * T1,
	TIMER_J: 0 * T1,
	TIMER_K: 0 * T4,
	TIMER_L: 64 * T1,
	TIMER_M: 64 * T1,
	PROVISIONAL_RESPONSE_INTERVAL: 6e4
}, voxbone = voxbone || {};
extend(voxbone, {
	Request: {
		param: function (a) {
			var b = "";
			for (var c in a)
				a.hasOwnProperty(c) && (b.length > 0 && (b += "&"), b += c + "=" + encodeURIComponent(a[c]));
			return b
		},
		post: function (a, b, c) {
			var d = new XMLHttpRequest,
			e = this.param(b);
			d.open("POST", a),
			d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
			d.onload = function () {
				"function" == typeof c && c({
					status: d.status,
					message: d.responseText
				})
			},
			d.send(e)
		},
		jsonp: function (a, b) {
			var c = a + (a.indexOf("?") + 1 ? "&" : "?"),
			d = document.getElementsByTagName("head")[0],
			e = document.createElement("script");
			c += this.param(b),
			e.type = "text/javascript",
			e.src = c,
			this.currentScript && d.removeChild(currentScript),
			d.appendChild(e)
		}
	}
}), JsSIP.C.SESSION_EXPIRES = 3600, JsSIP.debug.enable("JsSIP:*"), JsSIP.debug.log = function () {
	var a = arguments[0].indexOf("ERROR") === -1 ? JsSIP.VoxboneLogger.loginfo : JsSIP.VoxboneLogger.logerror;
	return a.apply(this, arguments)
}, JsSIP.VoxboneLogger = {
	loginfo: function () {
		var a = Array.prototype.slice.call(arguments);
		info.apply(console, a)
	},
	logerror: function () {
		var a = Array.prototype.slice.call(arguments);
		error.apply(console, a)
	},
	setError: function (a) {
		error = a
	},
	setInfo: function (a) {
		info = a
	}
}, JsSIP.VoxboneLogger.setInfo(function () {
	var a = Array.prototype.slice.call(arguments);
	voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.INFO && console.log.apply(console, a),
	5 == a.length ? (voxbone.Logger.addLogToBuffer("INFO: " + a[0]), voxbone.Logger.addLogToBuffer("INFO: " + a[3])) : voxbone.Logger.addLogToBuffer("INFO: " + a[0])
}), JsSIP.VoxboneLogger.setError = function () {
	var a = Array.prototype.slice.call(arguments);
	voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.ERROR && console.error.apply(console, a),
	5 == a.length ? (voxbone.Logger.addLogToBuffer("ERROR: " + a[0]), voxbone.Logger.addLogToBuffer("ERROR: " + a[3])) : voxbone.Logger.addLogToBuffer("ERROR: " + a[0])
}, extend(voxbone, {
	Logger: {
		loginfo: function (a) {
			voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.INFO && console.log(a),
			voxbone.Logger.addLogToBuffer("INFO: " + a)
		},
		logerror: function (a) {
			voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.ERROR && console.log(a),
			voxbone.Logger.addLogToBuffer("ERROR: " + a)
		},
		addLogToBuffer: function (a) {
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat("\r\n"),
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat(a)
		},
		log_level: {
			NONE: 0,
			ERROR: 1,
			INFO: 2
		}
	}
}), extend(voxbone, {
	Pinger: {
		pingResults: [],
		ping: function (a, b) {
			var c = (new Date).getTime(),
			d = this,
			e = this.recordPingResult;
			this.img = new Image,
			d.inUse = !0,
			this.img.onload = function () {
				var b = (new Date).getTime() - c;
				e(a, b),
				d.inUse = !1
			},
			this.img.onerror = function (b) {
				d.inUse = !1,
				e(a, -1)
			},
			this.img.src = b + "?" + (new Date).getTime(),
			this.timer = setTimeout(function () {
					d.inUse && (d.inUse = !1, e(a, -1))
				}, 1500)
		},
		recordPingResult: function (a, b) {
			voxbone.Logger.loginfo("[ping] " + a + " replied in " + b);
			var c = {
				name: a,
				ping: b
			};
			voxbone.Pinger.pingResults.push(c)
		},
		getBestPop: function () {
			var a = void 0;
			if (0 == this.pingResults.length)
				a = {
					name: "BE",
					ping: -1
				};
			else
				for (var b = 0; b < this.pingResults.length; b++) {
					var c = this.pingResults[b];
					(void 0 == a || c.ping > 0 && (a.ping < 0 || c.ping < a.ping)) && (a = c)
				}
			return a
		}
	}
}), extend(voxbone, {
	WebRTC: {
		callStats: void 0,
		audioComponentName: "peer-audio",
		videoComponentName: "peer-video",
		allowVideo: !1,
		authServerURL: "https://webrtcauth.ringring.be",
		basicAuthServerURL: "https://webrtcauth.ringring.be",
		webrtcLogs: "",
		rtcSession: {},
		callid: "",
		previous_callid: "",
		audioContext: void 0,
		localVolume: 0,
		localVolumeTimer: void 0,
		dtmfTimer: void 0,
		audioScriptProcessor: {},
		preferedPop: void 0,
		configuration: {
			authorization_user: void 0,
			password: void 0,
			ws_servers: void 0,
			stun_servers: void 0,
			turn_servers: void 0,
			log_level: voxbone.Logger.log_level.INFO,
			post_logs: !1,
			post_logs_nocall: !1,
			webrtc_log: void 0,
			uri: "sip:voxrtc@voxbone.com",
			trace_sip: !0,
			register: !1,
			dialer_string: void 0,
			digit_duration: 100,
			digit_gap: 500
		},
		customEventHandler: {
			progress: function (a) {},
			accepted: function (a) {},
			getUserMediaFailed: function (a) {
				voxbone.Logger.logerror("Failed to access mic/camera")
			},
			localMediaVolume: function (a) {},
			failed: function (a) {},
			ended: function (a) {},
			authExpired: function (a) {},
			getUserMediaAccepted: function (a) {
				voxbone.Logger.loginfo("local media accepted")
			}
		},
		phone: void 0,
		context: void 0,
		init: function (a) {
			voxbone.Logger.loginfo("auth server: " + this.authServerURL);
			var b = {
				username: a.username,
				password: a.password
			};
			$.ajax({
				url: this.authServerURL,
				data: b,
				type: "GET",
				success: function(result){
					voxbone.WebRTC.processAuthData(result);
				}
			})
		},
		processAuthData: function (a) {
			if (this.configuration.ws_servers = a.wss, this.configuration.stun_servers = a.stunServers, this.configuration.turn_servers = a.turnServers, this.configuration.webrtc_log = a.log, this.configuration.authorization_user = a.username, this.configuration.password = a.password, "undefined" == typeof this.preferedPop) {
				voxbone.Logger.loginfo("prefered pop undefined, pinging...."),
				this.pingServers = a.pingServers;
				for (var b = 0; b < this.pingServers.length; b++)
					voxbone.Pinger.ping(b, this.pingServers[b])
			} else
				voxbone.Logger.loginfo("preferred pop already set to " + this.preferedPop);
			var c = this.getAuthExpiration();
			c > 0 && (voxbone.Logger.loginfo("Credential expires in " + c + " seconds"), setTimeout(this.customEventHandler.authExpired, 750 * c));
			var d = a.callStatsCredentials;
			voxbone.WebRTC.callStats = new callstats(null, io, jsSHA);
			var e = function (a, b) {
				voxbone.Logger.loginfo("callStats Status: errCode= " + a + " Msg= " + b)
			},
			f = a.username.split(":")[1];
			voxbone.WebRTC.callStats.initialize(d.appId, d.appSecret, f, e, null, null)
		},
		getAuthExpiration: function (a) {
			var b = Math.floor((new Date).getTime() / 1e3),
			c = this.configuration.authorization_user.split(/:/);
			return c[0] - b
		},
		initAudioElement: function (a, b) {
			var c = document.getElementById(a);
			return c || (c = document.createElement("audio"), c.id = a, c.hidden = !1, c.autoplay = !0, document.body.appendChild(c)),
			c.src = (window.URL ? URL : webkitURL).createObjectURL(b),
			c
		},
		initVideoElement: function (a, b) {
			var c = document.getElementById(a);
			return c || (c = document.createElement("video"), c.id = a, c.hidden = !1, c.autoplay = !0, document.body.appendChild(c)),
			c.src = (window.URL ? URL : webkitURL).createObjectURL(b),
			c
		},
		sendPreConfiguredDtmf: function (a) {
			var b = void 0,
			c = 0,
			d = !1;
			if (void 0 !== voxbone.WebRTC.dtmfTimer && (clearTimeout(voxbone.WebRTC.dtmfTimer), voxbone.WebRTC.dtmfTime = void 0), a.length > 0) {
				if (a[0].indexOf("ms") != -1 ? c = parseInt(a[0].substring(0, a[0].indexOf("ms"))) : b = a[0], a = a.slice(1, a.length), void 0 !== b) {
					Date.now();
					voxbone.WebRTC.rtcSession.sendDTMF(b),
					d = !0
				}
				if (a.length > 0) {
					var e = c > 0 ? c - voxbone.WebRTC.configuration.digit_gap : voxbone.WebRTC.configuration.digit_gap + voxbone.WebRTC.configuration.digit_duration;
					e < 0 && (e = 0),
					voxbone.WebRTC.dtmfTimer = setTimeout(function () {
							voxbone.WebRTC.sendPreConfiguredDtmf(a)
						}, e)
				}
			}
		},
		postCallRating: function (a, b, c, d) {
			if (void 0 !== voxbone.WebRTC.previous_callid) {
				var e = {
					payload_type: "webrtc_call_rating",
					username: voxbone.WebRTC.configuration.authorization_user,
					password: voxbone.WebRTC.configuration.password,
					callid: voxbone.WebRTC.previous_callid,
					e164: a,
					url: d,
					rating: b,
					comment: c
				},
				f = voxbone.WebRTC.configuration.webrtc_log;
				voxbone.Request.post(f, e),
				voxbone.WebRTC.previous_callid = void 0
			}
		},
		postLogsToServer: function () {
			if (voxbone.WebRTC.configuration.post_logs === !0 && void 0 !== voxbone.WebRTC.configuration.webrtc_log) {
				var a = voxbone.WebRTC.configuration.webrtc_log,
				b = {
					payload_type: "webrtc_logs",
					username: voxbone.WebRTC.configuration.authorization_user,
					password: voxbone.WebRTC.configuration.password,
					callid: voxbone.WebRTC.callid,
					pop: voxbone.WebRTC.preferedPop,
					context: voxbone.WebRTC.context,
					uri: voxbone.WebRTC.configuration.uri,
					logs: voxbone.WebRTC.webrtcLogs
				};
				voxbone.Request.post(a, b)
			}
		},
		cleanUp: function () {
			void 0 !== voxbone.WebRTC.localVolumeTimer && (clearInterval(voxbone.WebRTC.localVolumeTimer), voxbone.WebRTC.localVolumeTimer = void 0),
			void 0 !== voxbone.WebRTC.audioScriptProcessor && (void 0 !== voxbone.WebRTC.audioContext && void 0 !== voxbone.WebRTC.audioContext.destination && voxbone.WebRTC.audioScriptProcessor.disconnect(voxbone.WebRTC.audioContext.destination), voxbone.WebRTC.audioScriptProcessor = void 0),
			void 0 !== voxbone.WebRTC.dtmfTimer && (clearTimeout(voxbone.WebRTC.dtmfTimer), voxbone.WebRTC.dtmfTimer = void 0),
			voxbone.WebRTC.cleanAudioElement(voxbone.WebRTC.audioComponentName),
			voxbone.WebRTC.previous_callid = voxbone.WebRTC.callid,
			voxbone.WebRTC.callid = "",
			voxbone.WebRTC.webrtcLogs = "",
			voxbone.WebRTC.rtcSession = {},
			delete voxbone.WebRTC.phone
		},
		cleanAudioElement: function (a) {
			var b = document.getElementById(a);
			return b && (b.removeAttribute("src"), b.load()),
			b
		},
		call: function (a,b) {
			voxbone.WebRTC.configuration.uri = b + "@voxbone.com";
			var b = new JsSIP.URI("sip", a, "voxout.voxbone.com");
			void 0 === this.preferedPop && (this.preferedPop = voxbone.Pinger.getBestPop().name),
			voxbone.Logger.loginfo("prefered pop: ", this.preferedPop);
			var c = [];
			c.push("X-Voxbone-Pop: " + this.preferedPop),
			this.context && c.push("X-Voxbone-Context: " + this.context);
			var d = {
				eventHandlers: {
					peerconnection: function (a) {
						var b = a.peerconnection.getLocalStreams();
						voxbone.Logger.loginfo("streams " + b.length);
						for (var c = 0; c < b.length; c++)
							if (b[c].getAudioTracks().length > 0) {
								try {
									void 0 === voxbone.WebRTC.audioContext && (voxbone.WebRTC.audioContext = new AudioContext)
								} catch (a) {
									voxbone.Logger.logerror("Web Audio API not supported " + a)
								}
								voxbone.WebRTC.audioScriptProcessor = voxbone.WebRTC.audioContext.createScriptProcessor(0, 1, 1);
								var d = voxbone.WebRTC.audioContext.createMediaStreamSource(b[c]);
								d.connect(voxbone.WebRTC.audioScriptProcessor),
								voxbone.WebRTC.audioScriptProcessor.connect(voxbone.WebRTC.audioContext.destination),
								voxbone.WebRTC.audioScriptProcessor.onaudioprocess = function (a) {
									var b,
									c = a.inputBuffer.getChannelData(0),
									d = 0;
									for (b = 0; b < c.length; ++b)
										d += c[b] * c[b];
									voxbone.WebRTC.localVolume = Math.sqrt(d / c.length)
								},
								voxbone.WebRTC.localVolumeTimer = setInterval(function () {
										var a = {
											localVolume: voxbone.WebRTC.localVolume.toFixed(2)
										};
										voxbone.WebRTC.customEventHandler.localMediaVolume(a)
									}, 200);
								break
							}
					},
					sending: function (a) {
						voxbone.WebRTC.callid = a.request.call_id;
						var b = voxbone.WebRTC.rtcSession.connection.pc,
						c = voxbone.WebRTC.rtcSession.remote_identity.uri.user;
						voxbone.WebRTC.callStats.addNewFabric(b, c, voxbone.WebRTC.callStats.fabricUsage.audio, voxbone.WebRTC.callid, null)
					},
					progress: function (a) {
						voxbone.WebRTC.customEventHandler.progress(a)
					},
					failed: function (a) {
						var b,
						c = voxbone.WebRTC.callid,
						d = voxbone.WebRTC.callStats;
						switch (voxbone.Logger.logerror("Call (" + c + ") failed. Cause: " + a.cause), "undefined" != typeof voxbone.WebRTC.rtcSession.connection && (b = voxbone.WebRTC.rtcSession.connection.pc), a.cause) {
						case JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS:
							"object" == typeof b && d.reportError(b, c, d.webRTCFunctions.getUserMedia),
							voxbone.WebRTC.customEventHandler.getUserMediaFailed(a);
							break;
						case JsSIP.C.causes.INCOMPATIBLE_SDP:
						case JsSIP.C.causes.MISSING_SDP:
							"object" == typeof b && d.reportError(b, c, d.webRTCFunctions.createOffer);
							break;
						case JsSIP.C.causes.BYE:
						case JsSIP.C.causes.CANCELED:
						case JsSIP.C.causes.NO_ANSWER:
						case JsSIP.C.causes.EXPIRES:
						case JsSIP.C.causes.NO_ACK:
						case JsSIP.C.causes.BUSY:
						case JsSIP.C.causes.REJECTED:
						case JsSIP.C.causes.REDIRECTED:
						case JsSIP.C.causes.UNAVAILABLE:
						case JsSIP.C.causes.NOT_FOUND:
							"object" == typeof b && d.reportError(b, c, d.webRTCFunctions.applicationError);
							break;
						case JsSIP.C.causes.DIALOG_ERROR:
						case JsSIP.C.causes.BAD_MEDIA_DESCRIPTION:
						case JsSIP.C.causes.RTP_TIMEOUT:
						case JsSIP.C.causes.SIP_FAILURE_CODE:
						case JsSIP.C.causes.REQUEST_TIMEOUT:
						case JsSIP.C.causes.CONNECTION_ERROR:
						case JsSIP.C.causes.INTERNAL_ERROR:
						case JsSIP.C.causes.ADDRESS_INCOMPLETE:
						case JsSIP.C.causes.AUTHENTICATION_ERROR:
						default:
							"object" == typeof b && d.reportError(b, c, d.webRTCFunctions.signalingError)
						}
						voxbone.WebRTC.postLogsToServer(),
						voxbone.WebRTC.cleanUp(),
						voxbone.WebRTC.customEventHandler.failed(a)
					},
					accepted: function (a) {
						voxbone.WebRTC.customEventHandler.accepted(a)
					},
					addstream: function (a) {
						if (voxbone.WebRTC.allowVideo ? voxbone.WebRTC.initVideoElement(voxbone.WebRTC.videoComponentName, a.stream) : voxbone.WebRTC.initAudioElement(voxbone.WebRTC.audioComponentName, a.stream), void 0 !== voxbone.WebRTC.configuration.dialer_string && voxbone.WebRTC.configuration.dialer_string.length > 0) {
							var b = voxbone.WebRTC.configuration.dialer_string.split(",");
							voxbone.WebRTC.sendPreConfiguredDtmf(b)
						}
					},
					ended: function (a) {
						voxbone.WebRTC.postLogsToServer(),
						voxbone.WebRTC.cleanUp(),
						voxbone.WebRTC.customEventHandler.ended(a)
					}
				},
				extraHeaders: [],
				pcConfig: {},
				mediaConstraints: {
					audio: !0,
					video: voxbone.WebRTC.allowVideo
				}
			};
			if (void 0 !== this.configuration.stun_servers || void 0 !== this.configuration.turn_servers) {
				for (var e = [], f = 0; f < this.configuration.stun_servers.length; f++)
					e.push(this.configuration.stun_servers[f]);
				for (var f = 0; f < this.configuration.turn_servers.length; f++)
					e.push(this.configuration.turn_servers[f]);
				d.pcConfig.iceServers = e,
				d.pcConfig.gatheringTimeoutAfterRelay = 5e3
			}
			d.pcConfig.iceCandidatePoolSize = 10,
			d.extraHeaders = c,
			void 0 === this.phone ? (this.phone = new JsSIP.UA(this.configuration), this.phone.once("connected", function () {
					voxbone.WebRTC.rtcSession = voxbone.WebRTC.phone.call(b.toAor(), d)
				}), this.phone.on("newRTCSession", function (a) {
					a.session.on("connecting", function (a) {
						voxbone.WebRTC.customEventHandler.getUserMediaAccepted(a)
					}),
					a.session.on("reinvite", function (b) {
						request = b.request;
						var c = ["Contact: " + a.session.contact];
						handleSessionTimersInIncomingRequest.call(a.session, request, c),
						request.reply(200, null, c, null, function () {
							self.status = JsSIP.C.STATUS_WAITING_FOR_ACK,
							setInvite2xxTimer.call(a.session, request, null),
							setACKTimer.call(a.session)
						})
					})
				}), this.phone.start()) : (this.phone.configuration = this.configuration, this.rtcSession = this.phone.call(b.toAor(), d))
		},
		isCallOpen: function () {
			return "function" == typeof voxbone.WebRTC.rtcSession.isEstablished && "function" == typeof voxbone.WebRTC.rtcSession.isInProgress && (voxbone.WebRTC.rtcSession.isInProgress() === !0 || voxbone.WebRTC.rtcSession.isEstablished() === !0)
		},
		sendDTMF: function (a) {
			this.rtcSession.sendDTMF(a)
		},
		hangup: function () {
			void 0 !== this.rtcSession && this.rtcSession.terminate()
		},
		isMuted: !1,
		mute: function () {
			for (var a = this.rtcSession.connection.getLocalStreams(), b = 0; b < a.length; b++)
				for (var c = 0; c < a[b].getAudioTracks().length; c++)
					a[b].getAudioTracks()[c].enabled = !1;
			this.isMuted = !0,
			voxbone.WebRTC.callStats.sendFabricEvent(this.rtcSession.connection.pc, voxbone.WebRTC.callStats.fabricEvent.audioMute, voxbone.WebRTC.callid)
		},
		unmute: function () {
			for (var a = this.rtcSession.connection.getLocalStreams(), b = 0; b < a.length; b++)
				for (var c = 0; c < a[b].getAudioTracks().length; c++)
					a[b].getAudioTracks()[c].enabled = !0;
			this.isMuted = !1,
			voxbone.WebRTC.callStats.sendFabricEvent(this.rtcSession.connection.pc, voxbone.WebRTC.callStats.fabricEvent.audioUnmute, voxbone.WebRTC.callid)
		},
		unloadHandler: function () {
			"function" == typeof voxbone.WebRTC.rtcSession.hangup ? (voxbone.Logger.loginfo("Page unloading while a call was in progress, hanging up"), voxbone.WebRTC.hangup(), voxbone.WebRTC.postLogsToServer()) : 1 == voxbone.WebRTC.configuration.post_logs_nocall && voxbone.WebRTC.postLogsToServer()
		},
		isWebRTCSupported: function () {
			if (window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia) {
				var a = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
				if (a) {
					var b = new RegExp("firefox/([0-9])+"),
					c = new RegExp("([0-9])+"),
					d = b.exec(navigator.userAgent.toLowerCase())[0],
					e = c.exec(d)[0];
					if (e < 23)
						return !1
				}
				return !0
			}
			return !1
		}
	}
});
