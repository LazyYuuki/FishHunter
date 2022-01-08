/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ server)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _userInput_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);



var socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)();

// var form = document.getElementById('form');
// var input = document.getElementById('input');

function server() {

  // form.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit('chat message', input.value);
  //     input.value = '';
  //   }
  // });

  (0,_userInput_js__WEBPACK_IMPORTED_MODULE_1__["default"])(socket)

  // socket.on('message', function (msg) {
  //   var item = document.createElement('li');
  //   item.textContent = msg;
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

}

/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "protocol": () => (/* reexport safe */ socket_io_parser__WEBPACK_IMPORTED_MODULE_3__.protocol),
/* harmony export */   "Manager": () => (/* reexport safe */ _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager),
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket),
/* harmony export */   "io": () => (/* binding */ lookup),
/* harmony export */   "connect": () => (/* binding */ lookup),
/* harmony export */   "default": () => (/* binding */ lookup)
/* harmony export */ });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27);



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0,_url_js__WEBPACK_IMPORTED_MODULE_0__.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager,
    Socket: _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */



/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var parseuri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = parseuri__WEBPACK_IMPORTED_MODULE_0__(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}


/***/ }),
/* 4 */
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var backo2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);






class Manager extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new backo2__WEBPACK_IMPORTED_MODULE_4__({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || socket_io_parser__WEBPACK_IMPORTED_MODULE_2__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new engine_io_client__WEBPACK_IMPORTED_MODULE_0__.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", (err) => {
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "ping", this.onping.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "data", this.ondata.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "close", this.onclose.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new _socket_js__WEBPACK_IMPORTED_MODULE_1__.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket),
/* harmony export */   "protocol": () => (/* binding */ protocol),
/* harmony export */   "Transport": () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.Transport),
/* harmony export */   "transports": () => (/* reexport safe */ _transports_index_js__WEBPACK_IMPORTED_MODULE_2__.transports),
/* harmony export */   "installTimerFunctions": () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_3__.installTimerFunctions)
/* harmony export */ });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);


const protocol = _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket.protocol;





/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var parseqs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var parseuri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);






class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    constructor(uri, opts = {}) {
        super();
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = parseuri__WEBPACK_IMPORTED_MODULE_3__(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = parseuri__WEBPACK_IMPORTED_MODULE_3__(opts.host).host;
        }
        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
            this.opts.query = parseqs__WEBPACK_IMPORTED_MODULE_2__.decode(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                addEventListener("beforeunload", () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                }, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close");
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
        const query = clone(this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        return new _transports_index_js__WEBPACK_IMPORTED_MODULE_0__.transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", () => {
            this.onClose("transport close");
        });
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", msg => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = err => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api private
     */
    onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState &&
            this.opts.upgrade &&
            this.transport.pause) {
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @api private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            this.transport.send(this.writeBuffer);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = this.writeBuffer.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api public
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, desc) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, desc);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
Socket.protocol = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
function clone(obj) {
    const o = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = obj[i];
        }
    }
    return o;
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transports": () => (/* binding */ transports)
/* harmony export */ });
/* harmony import */ var _polling_xhr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _websocket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);


const transports = {
    websocket: _websocket_js__WEBPACK_IMPORTED_MODULE_1__.WS,
    polling: _polling_xhr_js__WEBPACK_IMPORTED_MODULE_0__.XHR
};


/***/ }),
/* 9 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XHR": () => (/* binding */ XHR),
/* harmony export */   "Request": () => (/* binding */ Request)
/* harmony export */ });
/* harmony import */ var _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* global attachEvent */





/**
 * Empty function
 */
function empty() { }
const hasXHR2 = (function () {
    const xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        xdomain: false
    });
    return null != xhr.responseType;
})();
class XHR extends _polling_js__WEBPACK_IMPORTED_MODULE_4__.Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", err => {
            this.onError("xhr post error", err);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", err => {
            this.onError("xhr poll error", err);
        });
        this.pollXhr = req;
    }
}
class Request extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_3__.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
        super();
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
        const opts = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_0__["default"](opts));
        try {
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon successful response.
     *
     * @api private
     */
    onSuccess() {
        this.emit("success");
        this.cleanup();
    }
    /**
     * Called if we have data.
     *
     * @api private
     */
    onData(data) {
        this.emit("data", data);
        this.onSuccess();
    }
    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
        this.emit("error", err);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.onData(data);
        }
    }
    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
        this.cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in _globalThis_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var has_cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
// browser shim for xmlhttprequest module


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors__WEBPACK_IMPORTED_MODULE_0__)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new _globalThis_js__WEBPACK_IMPORTED_MODULE_1__["default"][["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}


/***/ }),
/* 11 */
/***/ ((module) => {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})());


/***/ }),
/* 13 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "installTimerFunctions": () => (/* binding */ installTimerFunctions)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }
    else {
        obj.setTimeoutFn = setTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
        obj.clearTimeoutFn = clearTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * Expose `Emitter`.
 */

exports.Emitter = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 15 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Polling": () => (/* binding */ Polling)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var yeast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var parseqs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);




class Polling extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    constructor() {
        super(...arguments);
        this.polling = false;
    }
    /**
     * Transport name.
     */
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
        this.polling = true;
        this.doPoll();
        this.emit("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
        const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose();
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_3__.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emit("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
        this.writable = false;
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_3__.encodePayload)(packets, data => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emit("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast__WEBPACK_IMPORTED_MODULE_1__();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = parseqs__WEBPACK_IMPORTED_MODULE_2__.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transport": () => (/* binding */ Transport)
/* harmony export */ });
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



class Transport extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api protected
     */
    onError(msg, desc) {
        const err = new Error(msg);
        // @ts-ignore
        err.type = "TransportError";
        // @ts-ignore
        err.description = desc;
        super.emit("error", err);
        return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
        if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
        }
        return this;
    }
    /**
     * Closes the transport.
     *
     * @api public
     */
    close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api public
     */
    send(packets) {
        if ("open" === this.readyState) {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @api protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emit("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api protected
     */
    onData(data) {
        const packet = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_0__.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @api protected
     */
    onPacket(packet) {
        super.emit("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api protected
     */
    onClose() {
        this.readyState = "closed";
        super.emit("close");
    }
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "protocol": () => (/* binding */ protocol),
/* harmony export */   "encodePacket": () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "encodePayload": () => (/* binding */ encodePayload),
/* harmony export */   "decodePacket": () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "decodePayload": () => (/* binding */ decodePayload)
/* harmony export */ });
/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);


const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__["default"])(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__["default"])(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
const protocol = 4;



/***/ }),
/* 18 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (encodePacket);


/***/ }),
/* 19 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PACKET_TYPES": () => (/* binding */ PACKET_TYPES),
/* harmony export */   "PACKET_TYPES_REVERSE": () => (/* binding */ PACKET_TYPES_REVERSE),
/* harmony export */   "ERROR_PACKET": () => (/* binding */ ERROR_PACKET)
/* harmony export */ });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };



/***/ }),
/* 20 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var base64_arraybuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0,base64_arraybuffer__WEBPACK_IMPORTED_MODULE_1__.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (decodePacket);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/*
 * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
var encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
var decode = function (base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


//# sourceMappingURL=base64-arraybuffer.es5.js.map


/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS": () => (/* binding */ WS)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var parseqs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var yeast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);






// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
        return "websocket";
    }
    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0,_util_js__WEBPACK_IMPORTED_MODULE_3__.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.WebSocket(uri, protocols)
                        : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.WebSocket(uri)
                    : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emit("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = ev => this.onData(ev.data);
        this.ws.onerror = e => this.onError("websocket error", e);
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.encodePacket)(packet, this.supportsBinary, data => {
                // always create a new object (GH-437)
                const opts = {};
                if (!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0,_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.nextTick)(() => {
                        this.writable = true;
                        this.emit("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast__WEBPACK_IMPORTED_MODULE_2__();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = parseqs__WEBPACK_IMPORTED_MODULE_1__.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
        return (!!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.WebSocket &&
            !("__initialize" in _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_4__.WebSocket && this.name === WS.prototype.name));
    }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "WebSocket": () => (/* binding */ WebSocket),
/* harmony export */   "usingBrowserWebSocket": () => (/* binding */ usingBrowserWebSocket),
/* harmony export */   "defaultBinaryType": () => (/* binding */ defaultBinaryType)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const WebSocket = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"].WebSocket || _globalThis_js__WEBPACK_IMPORTED_MODULE_0__["default"].MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__.Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "open", this.onopen.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "packet", this.onpacket.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "error", this.onerror.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * ```
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     * ```
     *
     * @returns self
     * @public
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "protocol": () => (/* binding */ protocol),
/* harmony export */   "PacketType": () => (/* binding */ PacketType),
/* harmony export */   "Encoder": () => (/* binding */ Encoder),
/* harmony export */   "Decoder": () => (/* binding */ Decoder)
/* harmony export */ });
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);



/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.hasBinary)(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__.Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.isBinary)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPacket)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),
/* 28 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deconstructPacket": () => (/* binding */ deconstructPacket),
/* harmony export */   "reconstructPacket": () => (/* binding */ reconstructPacket)
/* harmony export */ });
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_0__.isBinary)(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),
/* 29 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBinary": () => (/* binding */ isBinary),
/* harmony export */   "hasBinary": () => (/* binding */ hasBinary)
/* harmony export */ });
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on)
/* harmony export */ });
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}


/***/ }),
/* 31 */
/***/ ((module) => {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 32 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ userInputHandler)
/* harmony export */ });
/* harmony import */ var keyboardjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);


function userInputHandler(socket) {
  keyboardjs__WEBPACK_IMPORTED_MODULE_0__.bind("w", () => {
    socket.emit("payload", {
      username: socket.id,
      action: "w"
    })
  })

  keyboardjs__WEBPACK_IMPORTED_MODULE_0__.bind("s", () => {
    socket.emit("payload", {
      username: socket.id,
      action: "s"
    })
  })
}

/***/ }),
/* 33 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var KeyCombo = /*#__PURE__*/function () {
    function KeyCombo(keyComboStr) {
      _classCallCheck(this, KeyCombo);

      this.sourceStr = keyComboStr;
      this.subCombos = KeyCombo.parseComboStr(keyComboStr);
      this.keyNames = this.subCombos.reduce(function (memo, nextSubCombo) {
        return memo.concat(nextSubCombo);
      }, []);
    }

    _createClass(KeyCombo, [{
      key: "check",
      value: function check(pressedKeyNames) {
        var startingKeyNameIndex = 0;

        for (var i = 0; i < this.subCombos.length; i += 1) {
          startingKeyNameIndex = this._checkSubCombo(this.subCombos[i], startingKeyNameIndex, pressedKeyNames);

          if (startingKeyNameIndex === -1) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "isEqual",
      value: function isEqual(otherKeyCombo) {
        if (!otherKeyCombo || typeof otherKeyCombo !== 'string' && _typeof(otherKeyCombo) !== 'object') {
          return false;
        }

        if (typeof otherKeyCombo === 'string') {
          otherKeyCombo = new KeyCombo(otherKeyCombo);
        }

        if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
          return false;
        }

        for (var i = 0; i < this.subCombos.length; i += 1) {
          if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
            return false;
          }
        }

        for (var _i = 0; _i < this.subCombos.length; _i += 1) {
          var subCombo = this.subCombos[_i];

          var otherSubCombo = otherKeyCombo.subCombos[_i].slice(0);

          for (var j = 0; j < subCombo.length; j += 1) {
            var keyName = subCombo[j];
            var index = otherSubCombo.indexOf(keyName);

            if (index > -1) {
              otherSubCombo.splice(index, 1);
            }
          }

          if (otherSubCombo.length !== 0) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "_checkSubCombo",
      value: function _checkSubCombo(subCombo, startingKeyNameIndex, pressedKeyNames) {
        subCombo = subCombo.slice(0);
        pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);
        var endIndex = startingKeyNameIndex;

        for (var i = 0; i < subCombo.length; i += 1) {
          var keyName = subCombo[i];

          if (keyName[0] === '\\') {
            var escapedKeyName = keyName.slice(1);

            if (escapedKeyName === KeyCombo.comboDeliminator || escapedKeyName === KeyCombo.keyDeliminator) {
              keyName = escapedKeyName;
            }
          }

          var index = pressedKeyNames.indexOf(keyName);

          if (index > -1) {
            subCombo.splice(i, 1);
            i -= 1;

            if (index > endIndex) {
              endIndex = index;
            }

            if (subCombo.length === 0) {
              return endIndex;
            }
          }
        }

        return -1;
      }
    }]);

    return KeyCombo;
  }();
  KeyCombo.comboDeliminator = '>';
  KeyCombo.keyDeliminator = '+';

  KeyCombo.parseComboStr = function (keyComboStr) {
    var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);

    var combo = [];

    for (var i = 0; i < subComboStrs.length; i += 1) {
      combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
    }

    return combo;
  };

  KeyCombo._splitStr = function (str, deliminator) {
    var s = str;
    var d = deliminator;
    var c = '';
    var ca = [];

    for (var ci = 0; ci < s.length; ci += 1) {
      if (ci > 0 && s[ci] === d && s[ci - 1] !== '\\') {
        ca.push(c.trim());
        c = '';
        ci += 1;
      }

      c += s[ci];
    }

    if (c) {
      ca.push(c.trim());
    }

    return ca;
  };

  var Locale = /*#__PURE__*/function () {
    function Locale(name) {
      _classCallCheck(this, Locale);

      this.localeName = name;
      this.activeTargetKeys = [];
      this.pressedKeys = [];
      this._appliedMacros = [];
      this._keyMap = {};
      this._killKeyCodes = [];
      this._macros = [];
    }

    _createClass(Locale, [{
      key: "bindKeyCode",
      value: function bindKeyCode(keyCode, keyNames) {
        if (typeof keyNames === 'string') {
          keyNames = [keyNames];
        }

        this._keyMap[keyCode] = keyNames;
      }
    }, {
      key: "bindMacro",
      value: function bindMacro(keyComboStr, keyNames) {
        if (typeof keyNames === 'string') {
          keyNames = [keyNames];
        }

        var handler = null;

        if (typeof keyNames === 'function') {
          handler = keyNames;
          keyNames = null;
        }

        var macro = {
          keyCombo: new KeyCombo(keyComboStr),
          keyNames: keyNames,
          handler: handler
        };

        this._macros.push(macro);
      }
    }, {
      key: "getKeyCodes",
      value: function getKeyCodes(keyName) {
        var keyCodes = [];

        for (var keyCode in this._keyMap) {
          var index = this._keyMap[keyCode].indexOf(keyName);

          if (index > -1) {
            keyCodes.push(keyCode | 0);
          }
        }

        return keyCodes;
      }
    }, {
      key: "getKeyNames",
      value: function getKeyNames(keyCode) {
        return this._keyMap[keyCode] || [];
      }
    }, {
      key: "setKillKey",
      value: function setKillKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.setKillKey(keyCodes[i]);
          }

          return;
        }

        this._killKeyCodes.push(keyCode);
      }
    }, {
      key: "pressKey",
      value: function pressKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.pressKey(keyCodes[i]);
          }

          return;
        }

        this.activeTargetKeys.length = 0;
        var keyNames = this.getKeyNames(keyCode);

        for (var _i = 0; _i < keyNames.length; _i += 1) {
          this.activeTargetKeys.push(keyNames[_i]);

          if (this.pressedKeys.indexOf(keyNames[_i]) === -1) {
            this.pressedKeys.push(keyNames[_i]);
          }
        }

        this._applyMacros();
      }
    }, {
      key: "releaseKey",
      value: function releaseKey(keyCode) {
        if (typeof keyCode === 'string') {
          var keyCodes = this.getKeyCodes(keyCode);

          for (var i = 0; i < keyCodes.length; i += 1) {
            this.releaseKey(keyCodes[i]);
          }
        } else {
          var keyNames = this.getKeyNames(keyCode);

          var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);

          if (killKeyCodeIndex !== -1) {
            this.pressedKeys.length = 0;
          } else {
            for (var _i2 = 0; _i2 < keyNames.length; _i2 += 1) {
              var index = this.pressedKeys.indexOf(keyNames[_i2]);

              if (index > -1) {
                this.pressedKeys.splice(index, 1);
              }
            }
          }

          this.activeTargetKeys.length = 0;

          this._clearMacros();
        }
      }
    }, {
      key: "_applyMacros",
      value: function _applyMacros() {
        var macros = this._macros.slice(0);

        for (var i = 0; i < macros.length; i += 1) {
          var macro = macros[i];

          if (macro.keyCombo.check(this.pressedKeys)) {
            if (macro.handler) {
              macro.keyNames = macro.handler(this.pressedKeys);
            }

            for (var j = 0; j < macro.keyNames.length; j += 1) {
              if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
                this.pressedKeys.push(macro.keyNames[j]);
              }
            }

            this._appliedMacros.push(macro);
          }
        }
      }
    }, {
      key: "_clearMacros",
      value: function _clearMacros() {
        for (var i = 0; i < this._appliedMacros.length; i += 1) {
          var macro = this._appliedMacros[i];

          if (!macro.keyCombo.check(this.pressedKeys)) {
            for (var j = 0; j < macro.keyNames.length; j += 1) {
              var index = this.pressedKeys.indexOf(macro.keyNames[j]);

              if (index > -1) {
                this.pressedKeys.splice(index, 1);
              }
            }

            if (macro.handler) {
              macro.keyNames = null;
            }

            this._appliedMacros.splice(i, 1);

            i -= 1;
          }
        }
      }
    }]);

    return Locale;
  }();

  var Keyboard = /*#__PURE__*/function () {
    function Keyboard(targetWindow, targetElement, targetPlatform, targetUserAgent) {
      _classCallCheck(this, Keyboard);

      this._locale = null;
      this._currentContext = '';
      this._contexts = {};
      this._listeners = [];
      this._appliedListeners = [];
      this._locales = {};
      this._targetElement = null;
      this._targetWindow = null;
      this._targetPlatform = '';
      this._targetUserAgent = '';
      this._isModernBrowser = false;
      this._targetKeyDownBinding = null;
      this._targetKeyUpBinding = null;
      this._targetResetBinding = null;
      this._paused = false;
      this._contexts.global = {
        listeners: this._listeners,
        targetWindow: targetWindow,
        targetElement: targetElement,
        targetPlatform: targetPlatform,
        targetUserAgent: targetUserAgent
      };
      this.setContext('global');
    }

    _createClass(Keyboard, [{
      key: "setLocale",
      value: function setLocale(localeName, localeBuilder) {
        var locale = null;

        if (typeof localeName === 'string') {
          if (localeBuilder) {
            locale = new Locale(localeName);
            localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
          } else {
            locale = this._locales[localeName] || null;
          }
        } else {
          locale = localeName;
          localeName = locale._localeName;
        }

        this._locale = locale;
        this._locales[localeName] = locale;

        if (locale) {
          this._locale.pressedKeys = locale.pressedKeys;
        }

        return this;
      }
    }, {
      key: "getLocale",
      value: function getLocale(localName) {
        localName || (localName = this._locale.localeName);
        return this._locales[localName] || null;
      }
    }, {
      key: "bind",
      value: function bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        if (keyComboStr === null || typeof keyComboStr === 'function') {
          preventRepeatByDefault = releaseHandler;
          releaseHandler = pressHandler;
          pressHandler = keyComboStr;
          keyComboStr = null;
        }

        if (keyComboStr && _typeof(keyComboStr) === 'object' && typeof keyComboStr.length === 'number') {
          for (var i = 0; i < keyComboStr.length; i += 1) {
            this.bind(keyComboStr[i], pressHandler, releaseHandler);
          }

          return this;
        }

        this._listeners.push({
          keyCombo: keyComboStr ? new KeyCombo(keyComboStr) : null,
          pressHandler: pressHandler || null,
          releaseHandler: releaseHandler || null,
          preventRepeat: preventRepeatByDefault || false,
          preventRepeatByDefault: preventRepeatByDefault || false,
          executingHandler: false
        });

        return this;
      }
    }, {
      key: "addListener",
      value: function addListener(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "on",
      value: function on(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "bindPress",
      value: function bindPress(keyComboStr, pressHandler, preventRepeatByDefault) {
        return this.bind(keyComboStr, pressHandler, null, preventRepeatByDefault);
      }
    }, {
      key: "bindRelease",
      value: function bindRelease(keyComboStr, releaseHandler) {
        return this.bind(keyComboStr, null, releaseHandler, preventRepeatByDefault);
      }
    }, {
      key: "unbind",
      value: function unbind(keyComboStr, pressHandler, releaseHandler) {
        if (keyComboStr === null || typeof keyComboStr === 'function') {
          releaseHandler = pressHandler;
          pressHandler = keyComboStr;
          keyComboStr = null;
        }

        if (keyComboStr && _typeof(keyComboStr) === 'object' && typeof keyComboStr.length === 'number') {
          for (var i = 0; i < keyComboStr.length; i += 1) {
            this.unbind(keyComboStr[i], pressHandler, releaseHandler);
          }

          return this;
        }

        for (var _i = 0; _i < this._listeners.length; _i += 1) {
          var listener = this._listeners[_i];
          var comboMatches = !keyComboStr && !listener.keyCombo || listener.keyCombo && listener.keyCombo.isEqual(keyComboStr);
          var pressHandlerMatches = !pressHandler && !releaseHandler || !pressHandler && !listener.pressHandler || pressHandler === listener.pressHandler;
          var releaseHandlerMatches = !pressHandler && !releaseHandler || !releaseHandler && !listener.releaseHandler || releaseHandler === listener.releaseHandler;

          if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
            this._listeners.splice(_i, 1);

            _i -= 1;
          }
        }

        return this;
      }
    }, {
      key: "removeListener",
      value: function removeListener(keyComboStr, pressHandler, releaseHandler) {
        return this.unbind(keyComboStr, pressHandler, releaseHandler);
      }
    }, {
      key: "off",
      value: function off(keyComboStr, pressHandler, releaseHandler) {
        return this.unbind(keyComboStr, pressHandler, releaseHandler);
      }
    }, {
      key: "setContext",
      value: function setContext(contextName) {
        if (this._locale) {
          this.releaseAllKeys();
        }

        if (!this._contexts[contextName]) {
          var globalContext = this._contexts.global;
          this._contexts[contextName] = {
            listeners: [],
            targetWindow: globalContext.targetWindow,
            targetElement: globalContext.targetElement,
            targetPlatform: globalContext.targetPlatform,
            targetUserAgent: globalContext.targetUserAgent
          };
        }

        var context = this._contexts[contextName];
        this._currentContext = contextName;
        this._listeners = context.listeners;
        this.stop();
        this.watch(context.targetWindow, context.targetElement, context.targetPlatform, context.targetUserAgent);
        return this;
      }
    }, {
      key: "getContext",
      value: function getContext() {
        return this._currentContext;
      }
    }, {
      key: "withContext",
      value: function withContext(contextName, callback) {
        var previousContextName = this.getContext();
        this.setContext(contextName);
        callback();
        this.setContext(previousContextName);
        return this;
      }
    }, {
      key: "watch",
      value: function watch(targetWindow, targetElement, targetPlatform, targetUserAgent) {
        var _this = this;

        this.stop();
        var win = typeof globalThis !== 'undefined' ? globalThis : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : {};

        if (!targetWindow) {
          if (!win.addEventListener && !win.attachEvent) {
            throw new Error('Cannot find window functions addEventListener or attachEvent.');
          }

          targetWindow = win;
        } // Handle element bindings where a target window is not passed


        if (typeof targetWindow.nodeType === 'number') {
          targetUserAgent = targetPlatform;
          targetPlatform = targetElement;
          targetElement = targetWindow;
          targetWindow = win;
        }

        if (!targetWindow.addEventListener && !targetWindow.attachEvent) {
          throw new Error('Cannot find addEventListener or attachEvent methods on targetWindow.');
        }

        this._isModernBrowser = !!targetWindow.addEventListener;
        var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || '';
        var platform = targetWindow.navigator && targetWindow.navigator.platform || '';
        targetElement && targetElement !== null || (targetElement = targetWindow.document);
        targetPlatform && targetPlatform !== null || (targetPlatform = platform);
        targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);

        this._targetKeyDownBinding = function (event) {
          _this.pressKey(event.keyCode, event);

          _this._handleCommandBug(event, platform);
        };

        this._targetKeyUpBinding = function (event) {
          _this.releaseKey(event.keyCode, event);
        };

        this._targetResetBinding = function (event) {
          _this.releaseAllKeys(event);
        };

        this._bindEvent(targetElement, 'keydown', this._targetKeyDownBinding);

        this._bindEvent(targetElement, 'keyup', this._targetKeyUpBinding);

        this._bindEvent(targetWindow, 'focus', this._targetResetBinding);

        this._bindEvent(targetWindow, 'blur', this._targetResetBinding);

        this._targetElement = targetElement;
        this._targetWindow = targetWindow;
        this._targetPlatform = targetPlatform;
        this._targetUserAgent = targetUserAgent;
        var currentContext = this._contexts[this._currentContext];
        currentContext.targetWindow = this._targetWindow;
        currentContext.targetElement = this._targetElement;
        currentContext.targetPlatform = this._targetPlatform;
        currentContext.targetUserAgent = this._targetUserAgent;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this._targetElement || !this._targetWindow) {
          return;
        }

        this._unbindEvent(this._targetElement, 'keydown', this._targetKeyDownBinding);

        this._unbindEvent(this._targetElement, 'keyup', this._targetKeyUpBinding);

        this._unbindEvent(this._targetWindow, 'focus', this._targetResetBinding);

        this._unbindEvent(this._targetWindow, 'blur', this._targetResetBinding);

        this._targetWindow = null;
        this._targetElement = null;
        return this;
      }
    }, {
      key: "pressKey",
      value: function pressKey(keyCode, event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.pressKey(keyCode);

        this._applyBindings(event);

        return this;
      }
    }, {
      key: "releaseKey",
      value: function releaseKey(keyCode, event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.releaseKey(keyCode);

        this._clearBindings(event);

        return this;
      }
    }, {
      key: "releaseAllKeys",
      value: function releaseAllKeys(event) {
        if (this._paused) {
          return this;
        }

        if (!this._locale) {
          throw new Error('Locale not set');
        }

        this._locale.pressedKeys.length = 0;

        this._clearBindings(event);

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._paused) {
          return this;
        }

        if (this._locale) {
          this.releaseAllKeys();
        }

        this._paused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this._paused = false;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.releaseAllKeys();
        this._listeners.length = 0;
        return this;
      }
    }, {
      key: "_bindEvent",
      value: function _bindEvent(targetElement, eventName, handler) {
        return this._isModernBrowser ? targetElement.addEventListener(eventName, handler, false) : targetElement.attachEvent('on' + eventName, handler);
      }
    }, {
      key: "_unbindEvent",
      value: function _unbindEvent(targetElement, eventName, handler) {
        return this._isModernBrowser ? targetElement.removeEventListener(eventName, handler, false) : targetElement.detachEvent('on' + eventName, handler);
      }
    }, {
      key: "_getGroupedListeners",
      value: function _getGroupedListeners() {
        var listenerGroups = [];
        var listenerGroupMap = [];
        var listeners = this._listeners;

        if (this._currentContext !== 'global') {
          listeners = [].concat(_toConsumableArray(listeners), _toConsumableArray(this._contexts.global.listeners));
        }

        listeners.sort(function (a, b) {
          return (b.keyCombo ? b.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
        }).forEach(function (l) {
          var mapIndex = -1;

          for (var i = 0; i < listenerGroupMap.length; i += 1) {
            if (listenerGroupMap[i] === null && l.keyCombo === null || listenerGroupMap[i] !== null && listenerGroupMap[i].isEqual(l.keyCombo)) {
              mapIndex = i;
            }
          }

          if (mapIndex === -1) {
            mapIndex = listenerGroupMap.length;
            listenerGroupMap.push(l.keyCombo);
          }

          if (!listenerGroups[mapIndex]) {
            listenerGroups[mapIndex] = [];
          }

          listenerGroups[mapIndex].push(l);
        });
        return listenerGroups;
      }
    }, {
      key: "_applyBindings",
      value: function _applyBindings(event) {
        var _this2 = this;

        var preventRepeat = false;
        event || (event = {});

        event.preventRepeat = function () {
          preventRepeat = true;
        };

        event.pressedKeys = this._locale.pressedKeys.slice(0);
        var activeTargetKeys = this._locale.activeTargetKeys;

        var pressedKeys = this._locale.pressedKeys.slice(0);

        var listenerGroups = this._getGroupedListeners();

        var _loop = function _loop(i) {
          var listeners = listenerGroups[i];
          var keyCombo = listeners[0].keyCombo;

          if (keyCombo === null || keyCombo.check(pressedKeys) && activeTargetKeys.some(function (k) {
            return keyCombo.keyNames.includes(k);
          })) {
            for (var j = 0; j < listeners.length; j += 1) {
              var listener = listeners[j];

              if (!listener.executingHandler && listener.pressHandler && !listener.preventRepeat) {
                listener.executingHandler = true;
                listener.pressHandler.call(_this2, event);
                listener.executingHandler = false;

                if (preventRepeat || listener.preventRepeatByDefault) {
                  listener.preventRepeat = true;
                  preventRepeat = false;
                }
              }

              if (_this2._appliedListeners.indexOf(listener) === -1) {
                _this2._appliedListeners.push(listener);
              }
            }

            if (keyCombo) {
              for (var _j = 0; _j < keyCombo.keyNames.length; _j += 1) {
                var index = pressedKeys.indexOf(keyCombo.keyNames[_j]);

                if (index !== -1) {
                  pressedKeys.splice(index, 1);
                  _j -= 1;
                }
              }
            }
          }
        };

        for (var i = 0; i < listenerGroups.length; i += 1) {
          _loop(i);
        }
      }
    }, {
      key: "_clearBindings",
      value: function _clearBindings(event) {
        event || (event = {});
        event.pressedKeys = this._locale.pressedKeys.slice(0);

        for (var i = 0; i < this._appliedListeners.length; i += 1) {
          var listener = this._appliedListeners[i];
          var keyCombo = listener.keyCombo;

          if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
            listener.preventRepeat = false;

            if (keyCombo !== null || event.pressedKeys.length === 0) {
              this._appliedListeners.splice(i, 1);

              i -= 1;
            }

            if (!listener.executingHandler && listener.releaseHandler) {
              listener.executingHandler = true;
              listener.releaseHandler.call(this, event);
              listener.executingHandler = false;
            }
          }
        }
      }
    }, {
      key: "_handleCommandBug",
      value: function _handleCommandBug(event, platform) {
        // On Mac when the command key is kept pressed, keyup is not triggered for any other key.
        // In this case force a keyup for non-modifier keys directly after the keypress.
        var modifierKeys = ["shift", "ctrl", "alt", "capslock", "tab", "command"];

        if (platform.match("Mac") && this._locale.pressedKeys.includes("command") && !modifierKeys.includes(this._locale.getKeyNames(event.keyCode)[0])) {
          this._targetKeyUpBinding(event);
        }
      }
    }]);

    return Keyboard;
  }();

  function us(locale, platform, userAgent) {
    // general
    locale.bindKeyCode(3, ['cancel']);
    locale.bindKeyCode(8, ['backspace']);
    locale.bindKeyCode(9, ['tab']);
    locale.bindKeyCode(12, ['clear']);
    locale.bindKeyCode(13, ['enter']);
    locale.bindKeyCode(16, ['shift']);
    locale.bindKeyCode(17, ['ctrl']);
    locale.bindKeyCode(18, ['alt', 'menu']);
    locale.bindKeyCode(19, ['pause', 'break']);
    locale.bindKeyCode(20, ['capslock']);
    locale.bindKeyCode(27, ['escape', 'esc']);
    locale.bindKeyCode(32, ['space', 'spacebar']);
    locale.bindKeyCode(33, ['pageup']);
    locale.bindKeyCode(34, ['pagedown']);
    locale.bindKeyCode(35, ['end']);
    locale.bindKeyCode(36, ['home']);
    locale.bindKeyCode(37, ['left']);
    locale.bindKeyCode(38, ['up']);
    locale.bindKeyCode(39, ['right']);
    locale.bindKeyCode(40, ['down']);
    locale.bindKeyCode(41, ['select']);
    locale.bindKeyCode(42, ['printscreen']);
    locale.bindKeyCode(43, ['execute']);
    locale.bindKeyCode(44, ['snapshot']);
    locale.bindKeyCode(45, ['insert', 'ins']);
    locale.bindKeyCode(46, ['delete', 'del']);
    locale.bindKeyCode(47, ['help']);
    locale.bindKeyCode(145, ['scrolllock', 'scroll']);
    locale.bindKeyCode(188, ['comma', ',']);
    locale.bindKeyCode(190, ['period', '.']);
    locale.bindKeyCode(191, ['slash', 'forwardslash', '/']);
    locale.bindKeyCode(192, ['graveaccent', '`']);
    locale.bindKeyCode(219, ['openbracket', '[']);
    locale.bindKeyCode(220, ['backslash', '\\']);
    locale.bindKeyCode(221, ['closebracket', ']']);
    locale.bindKeyCode(222, ['apostrophe', '\'']); // 0-9

    locale.bindKeyCode(48, ['zero', '0']);
    locale.bindKeyCode(49, ['one', '1']);
    locale.bindKeyCode(50, ['two', '2']);
    locale.bindKeyCode(51, ['three', '3']);
    locale.bindKeyCode(52, ['four', '4']);
    locale.bindKeyCode(53, ['five', '5']);
    locale.bindKeyCode(54, ['six', '6']);
    locale.bindKeyCode(55, ['seven', '7']);
    locale.bindKeyCode(56, ['eight', '8']);
    locale.bindKeyCode(57, ['nine', '9']); // numpad

    locale.bindKeyCode(96, ['numzero', 'num0']);
    locale.bindKeyCode(97, ['numone', 'num1']);
    locale.bindKeyCode(98, ['numtwo', 'num2']);
    locale.bindKeyCode(99, ['numthree', 'num3']);
    locale.bindKeyCode(100, ['numfour', 'num4']);
    locale.bindKeyCode(101, ['numfive', 'num5']);
    locale.bindKeyCode(102, ['numsix', 'num6']);
    locale.bindKeyCode(103, ['numseven', 'num7']);
    locale.bindKeyCode(104, ['numeight', 'num8']);
    locale.bindKeyCode(105, ['numnine', 'num9']);
    locale.bindKeyCode(106, ['nummultiply', 'num*']);
    locale.bindKeyCode(107, ['numadd', 'num+']);
    locale.bindKeyCode(108, ['numenter']);
    locale.bindKeyCode(109, ['numsubtract', 'num-']);
    locale.bindKeyCode(110, ['numdecimal', 'num.']);
    locale.bindKeyCode(111, ['numdivide', 'num/']);
    locale.bindKeyCode(144, ['numlock', 'num']); // function keys

    locale.bindKeyCode(112, ['f1']);
    locale.bindKeyCode(113, ['f2']);
    locale.bindKeyCode(114, ['f3']);
    locale.bindKeyCode(115, ['f4']);
    locale.bindKeyCode(116, ['f5']);
    locale.bindKeyCode(117, ['f6']);
    locale.bindKeyCode(118, ['f7']);
    locale.bindKeyCode(119, ['f8']);
    locale.bindKeyCode(120, ['f9']);
    locale.bindKeyCode(121, ['f10']);
    locale.bindKeyCode(122, ['f11']);
    locale.bindKeyCode(123, ['f12']);
    locale.bindKeyCode(124, ['f13']);
    locale.bindKeyCode(125, ['f14']);
    locale.bindKeyCode(126, ['f15']);
    locale.bindKeyCode(127, ['f16']);
    locale.bindKeyCode(128, ['f17']);
    locale.bindKeyCode(129, ['f18']);
    locale.bindKeyCode(130, ['f19']);
    locale.bindKeyCode(131, ['f20']);
    locale.bindKeyCode(132, ['f21']);
    locale.bindKeyCode(133, ['f22']);
    locale.bindKeyCode(134, ['f23']);
    locale.bindKeyCode(135, ['f24']); // secondary key symbols

    locale.bindMacro('shift + `', ['tilde', '~']);
    locale.bindMacro('shift + 1', ['exclamation', 'exclamationpoint', '!']);
    locale.bindMacro('shift + 2', ['at', '@']);
    locale.bindMacro('shift + 3', ['number', '#']);
    locale.bindMacro('shift + 4', ['dollar', 'dollars', 'dollarsign', '$']);
    locale.bindMacro('shift + 5', ['percent', '%']);
    locale.bindMacro('shift + 6', ['caret', '^']);
    locale.bindMacro('shift + 7', ['ampersand', 'and', '&']);
    locale.bindMacro('shift + 8', ['asterisk', '*']);
    locale.bindMacro('shift + 9', ['openparen', '(']);
    locale.bindMacro('shift + 0', ['closeparen', ')']);
    locale.bindMacro('shift + -', ['underscore', '_']);
    locale.bindMacro('shift + =', ['plus', '+']);
    locale.bindMacro('shift + [', ['opencurlybrace', 'opencurlybracket', '{']);
    locale.bindMacro('shift + ]', ['closecurlybrace', 'closecurlybracket', '}']);
    locale.bindMacro('shift + \\', ['verticalbar', '|']);
    locale.bindMacro('shift + ;', ['colon', ':']);
    locale.bindMacro('shift + \'', ['quotationmark', '\'']);
    locale.bindMacro('shift + !,', ['openanglebracket', '<']);
    locale.bindMacro('shift + .', ['closeanglebracket', '>']);
    locale.bindMacro('shift + /', ['questionmark', '?']);

    if (platform.match('Mac')) {
      locale.bindMacro('command', ['mod', 'modifier']);
    } else {
      locale.bindMacro('ctrl', ['mod', 'modifier']);
    } //a-z and A-Z


    for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
      var keyName = String.fromCharCode(keyCode + 32);
      var capitalKeyName = String.fromCharCode(keyCode);
      locale.bindKeyCode(keyCode, keyName);
      locale.bindMacro('shift + ' + keyName, capitalKeyName);
      locale.bindMacro('capslock + ' + keyName, capitalKeyName);
    } // browser caveats


    var semicolonKeyCode = userAgent.match('Firefox') ? 59 : 186;
    var dashKeyCode = userAgent.match('Firefox') ? 173 : 189;
    var equalKeyCode = userAgent.match('Firefox') ? 61 : 187;
    var leftCommandKeyCode;
    var rightCommandKeyCode;

    if (platform.match('Mac') && (userAgent.match('Safari') || userAgent.match('Chrome'))) {
      leftCommandKeyCode = 91;
      rightCommandKeyCode = 93;
    } else if (platform.match('Mac') && userAgent.match('Opera')) {
      leftCommandKeyCode = 17;
      rightCommandKeyCode = 17;
    } else if (platform.match('Mac') && userAgent.match('Firefox')) {
      leftCommandKeyCode = 224;
      rightCommandKeyCode = 224;
    }

    locale.bindKeyCode(semicolonKeyCode, ['semicolon', ';']);
    locale.bindKeyCode(dashKeyCode, ['dash', '-']);
    locale.bindKeyCode(equalKeyCode, ['equal', 'equalsign', '=']);
    locale.bindKeyCode(leftCommandKeyCode, ['command', 'windows', 'win', 'super', 'leftcommand', 'leftwindows', 'leftwin', 'leftsuper']);
    locale.bindKeyCode(rightCommandKeyCode, ['command', 'windows', 'win', 'super', 'rightcommand', 'rightwindows', 'rightwin', 'rightsuper']); // kill keys

    locale.setKillKey('command');
  }

  var keyboard = new Keyboard();
  keyboard.setLocale('us', us);
  keyboard.Keyboard = Keyboard;
  keyboard.Locale = Locale;
  keyboard.KeyCombo = KeyCombo;

  return keyboard;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQuanMiLCJzb3VyY2VzIjpbIi4uL2xpYi9rZXktY29tYm8uanMiLCIuLi9saWIvbG9jYWxlLmpzIiwiLi4vbGliL2tleWJvYXJkLmpzIiwiLi4vbG9jYWxlcy91cy5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIEtleUNvbWJvIHtcbiAgY29uc3RydWN0b3Ioa2V5Q29tYm9TdHIpIHtcbiAgICB0aGlzLnNvdXJjZVN0ciA9IGtleUNvbWJvU3RyO1xuICAgIHRoaXMuc3ViQ29tYm9zID0gS2V5Q29tYm8ucGFyc2VDb21ib1N0cihrZXlDb21ib1N0cik7XG4gICAgdGhpcy5rZXlOYW1lcyAgPSB0aGlzLnN1YkNvbWJvcy5yZWR1Y2UoKG1lbW8sIG5leHRTdWJDb21ibykgPT5cbiAgICAgIG1lbW8uY29uY2F0KG5leHRTdWJDb21ibyksIFtdKTtcbiAgfVxuXG4gIGNoZWNrKHByZXNzZWRLZXlOYW1lcykge1xuICAgIGxldCBzdGFydGluZ0tleU5hbWVJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YkNvbWJvcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgc3RhcnRpbmdLZXlOYW1lSW5kZXggPSB0aGlzLl9jaGVja1N1YkNvbWJvKFxuICAgICAgICB0aGlzLnN1YkNvbWJvc1tpXSxcbiAgICAgICAgc3RhcnRpbmdLZXlOYW1lSW5kZXgsXG4gICAgICAgIHByZXNzZWRLZXlOYW1lc1xuICAgICAgKTtcbiAgICAgIGlmIChzdGFydGluZ0tleU5hbWVJbmRleCA9PT0gLTEpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGlzRXF1YWwob3RoZXJLZXlDb21ibykge1xuICAgIGlmIChcbiAgICAgICFvdGhlcktleUNvbWJvIHx8XG4gICAgICB0eXBlb2Ygb3RoZXJLZXlDb21ibyAhPT0gJ3N0cmluZycgJiZcbiAgICAgIHR5cGVvZiBvdGhlcktleUNvbWJvICE9PSAnb2JqZWN0J1xuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICh0eXBlb2Ygb3RoZXJLZXlDb21ibyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG90aGVyS2V5Q29tYm8gPSBuZXcgS2V5Q29tYm8ob3RoZXJLZXlDb21ibyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3ViQ29tYm9zLmxlbmd0aCAhPT0gb3RoZXJLZXlDb21iby5zdWJDb21ib3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJDb21ib3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLnN1YkNvbWJvc1tpXS5sZW5ndGggIT09IG90aGVyS2V5Q29tYm8uc3ViQ29tYm9zW2ldLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YkNvbWJvcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3ViQ29tYm8gICAgICA9IHRoaXMuc3ViQ29tYm9zW2ldO1xuICAgICAgY29uc3Qgb3RoZXJTdWJDb21ibyA9IG90aGVyS2V5Q29tYm8uc3ViQ29tYm9zW2ldLnNsaWNlKDApO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN1YkNvbWJvLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGtleU5hbWUgPSBzdWJDb21ib1tqXTtcbiAgICAgICAgY29uc3QgaW5kZXggICA9IG90aGVyU3ViQ29tYm8uaW5kZXhPZihrZXlOYW1lKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIG90aGVyU3ViQ29tYm8uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG90aGVyU3ViQ29tYm8ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBfY2hlY2tTdWJDb21ibyhzdWJDb21ibywgc3RhcnRpbmdLZXlOYW1lSW5kZXgsIHByZXNzZWRLZXlOYW1lcykge1xuICAgIHN1YkNvbWJvID0gc3ViQ29tYm8uc2xpY2UoMCk7XG4gICAgcHJlc3NlZEtleU5hbWVzID0gcHJlc3NlZEtleU5hbWVzLnNsaWNlKHN0YXJ0aW5nS2V5TmFtZUluZGV4KTtcblxuICAgIGxldCBlbmRJbmRleCA9IHN0YXJ0aW5nS2V5TmFtZUluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViQ29tYm8ubGVuZ3RoOyBpICs9IDEpIHtcblxuICAgICAgbGV0IGtleU5hbWUgPSBzdWJDb21ib1tpXTtcbiAgICAgIGlmIChrZXlOYW1lWzBdID09PSAnXFxcXCcpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZEtleU5hbWUgPSBrZXlOYW1lLnNsaWNlKDEpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXNjYXBlZEtleU5hbWUgPT09IEtleUNvbWJvLmNvbWJvRGVsaW1pbmF0b3IgfHxcbiAgICAgICAgICBlc2NhcGVkS2V5TmFtZSA9PT0gS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3JcbiAgICAgICAgKSB7XG4gICAgICAgICAga2V5TmFtZSA9IGVzY2FwZWRLZXlOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gcHJlc3NlZEtleU5hbWVzLmluZGV4T2Yoa2V5TmFtZSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBzdWJDb21iby5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgICAgaWYgKGluZGV4ID4gZW5kSW5kZXgpIHtcbiAgICAgICAgICBlbmRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJDb21iby5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZW5kSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xufVxuXG5LZXlDb21iby5jb21ib0RlbGltaW5hdG9yID0gJz4nO1xuS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3IgICA9ICcrJztcblxuS2V5Q29tYm8ucGFyc2VDb21ib1N0ciA9IGZ1bmN0aW9uKGtleUNvbWJvU3RyKSB7XG4gIGNvbnN0IHN1YkNvbWJvU3RycyA9IEtleUNvbWJvLl9zcGxpdFN0cihrZXlDb21ib1N0ciwgS2V5Q29tYm8uY29tYm9EZWxpbWluYXRvcik7XG4gIGNvbnN0IGNvbWJvICAgICAgICA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IHN1YkNvbWJvU3Rycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbWJvLnB1c2goS2V5Q29tYm8uX3NwbGl0U3RyKHN1YkNvbWJvU3Ryc1tpXSwgS2V5Q29tYm8ua2V5RGVsaW1pbmF0b3IpKTtcbiAgfVxuICByZXR1cm4gY29tYm87XG59XG5cbktleUNvbWJvLl9zcGxpdFN0ciA9IGZ1bmN0aW9uKHN0ciwgZGVsaW1pbmF0b3IpIHtcbiAgY29uc3QgcyAgPSBzdHI7XG4gIGNvbnN0IGQgID0gZGVsaW1pbmF0b3I7XG4gIGxldCBjICA9ICcnO1xuICBjb25zdCBjYSA9IFtdO1xuXG4gIGZvciAobGV0IGNpID0gMDsgY2kgPCBzLmxlbmd0aDsgY2kgKz0gMSkge1xuICAgIGlmIChjaSA+IDAgJiYgc1tjaV0gPT09IGQgJiYgc1tjaSAtIDFdICE9PSAnXFxcXCcpIHtcbiAgICAgIGNhLnB1c2goYy50cmltKCkpO1xuICAgICAgYyA9ICcnO1xuICAgICAgY2kgKz0gMTtcbiAgICB9XG4gICAgYyArPSBzW2NpXTtcbiAgfVxuICBpZiAoYykgeyBjYS5wdXNoKGMudHJpbSgpKTsgfVxuXG4gIHJldHVybiBjYTtcbn07XG4iLCJpbXBvcnQgeyBLZXlDb21ibyB9IGZyb20gJy4va2V5LWNvbWJvJztcblxuXG5leHBvcnQgY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubG9jYWxlTmFtZSAgICAgICAgICA9IG5hbWU7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXRLZXlzID0gW107XG4gICAgdGhpcy5wcmVzc2VkS2V5cyAgICAgICAgID0gW107XG4gICAgdGhpcy5fYXBwbGllZE1hY3JvcyAgICAgID0gW107XG4gICAgdGhpcy5fa2V5TWFwICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fa2lsbEtleUNvZGVzICAgICAgID0gW107XG4gICAgdGhpcy5fbWFjcm9zICAgICAgICAgICAgID0gW107XG4gIH1cblxuICBiaW5kS2V5Q29kZShrZXlDb2RlLCBrZXlOYW1lcykge1xuICAgIGlmICh0eXBlb2Yga2V5TmFtZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBrZXlOYW1lcyA9IFtrZXlOYW1lc107XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5TWFwW2tleUNvZGVdID0ga2V5TmFtZXM7XG4gIH07XG5cbiAgYmluZE1hY3JvKGtleUNvbWJvU3RyLCBrZXlOYW1lcykge1xuICAgIGlmICh0eXBlb2Yga2V5TmFtZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBrZXlOYW1lcyA9IFsga2V5TmFtZXMgXTtcbiAgICB9XG5cbiAgICBsZXQgaGFuZGxlciA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBrZXlOYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaGFuZGxlciA9IGtleU5hbWVzO1xuICAgICAga2V5TmFtZXMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hY3JvID0ge1xuICAgICAga2V5Q29tYm8gOiBuZXcgS2V5Q29tYm8oa2V5Q29tYm9TdHIpLFxuICAgICAga2V5TmFtZXMgOiBrZXlOYW1lcyxcbiAgICAgIGhhbmRsZXIgIDogaGFuZGxlclxuICAgIH07XG5cbiAgICB0aGlzLl9tYWNyb3MucHVzaChtYWNybyk7XG4gIH07XG5cbiAgZ2V0S2V5Q29kZXMoa2V5TmFtZSkge1xuICAgIGNvbnN0IGtleUNvZGVzID0gW107XG4gICAgZm9yIChjb25zdCBrZXlDb2RlIGluIHRoaXMuX2tleU1hcCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9rZXlNYXBba2V5Q29kZV0uaW5kZXhPZihrZXlOYW1lKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7IGtleUNvZGVzLnB1c2goa2V5Q29kZXwwKTsgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5Q29kZXM7XG4gIH07XG5cbiAgZ2V0S2V5TmFtZXMoa2V5Q29kZSkge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXBba2V5Q29kZV0gfHwgW107XG4gIH07XG5cbiAgc2V0S2lsbEtleShrZXlDb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXlDb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qga2V5Q29kZXMgPSB0aGlzLmdldEtleUNvZGVzKGtleUNvZGUpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlDb2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLnNldEtpbGxLZXkoa2V5Q29kZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2tpbGxLZXlDb2Rlcy5wdXNoKGtleUNvZGUpO1xuICB9O1xuXG4gIHByZXNzS2V5KGtleUNvZGUpIHtcbiAgICBpZiAodHlwZW9mIGtleUNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBrZXlDb2RlcyA9IHRoaXMuZ2V0S2V5Q29kZXMoa2V5Q29kZSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUNvZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMucHJlc3NLZXkoa2V5Q29kZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGFyZ2V0S2V5cy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IGtleU5hbWVzID0gdGhpcy5nZXRLZXlOYW1lcyhrZXlDb2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleU5hbWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhcmdldEtleXMucHVzaChrZXlOYW1lc1tpXSk7XG4gICAgICBpZiAodGhpcy5wcmVzc2VkS2V5cy5pbmRleE9mKGtleU5hbWVzW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wcmVzc2VkS2V5cy5wdXNoKGtleU5hbWVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9hcHBseU1hY3JvcygpO1xuICB9O1xuXG4gIHJlbGVhc2VLZXkoa2V5Q29kZSkge1xuICAgIGlmICh0eXBlb2Yga2V5Q29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGtleUNvZGVzID0gdGhpcy5nZXRLZXlDb2RlcyhrZXlDb2RlKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Q29kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlS2V5KGtleUNvZGVzW2ldKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBrZXlOYW1lcyAgICAgICAgID0gdGhpcy5nZXRLZXlOYW1lcyhrZXlDb2RlKTtcbiAgICAgIGNvbnN0IGtpbGxLZXlDb2RlSW5kZXggPSB0aGlzLl9raWxsS2V5Q29kZXMuaW5kZXhPZihrZXlDb2RlKTtcblxuICAgICAgaWYgKGtpbGxLZXlDb2RlSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMucHJlc3NlZEtleXMubGVuZ3RoID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5TmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihrZXlOYW1lc1tpXSk7XG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmVUYXJnZXRLZXlzLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLl9jbGVhck1hY3JvcygpO1xuICAgIH1cbiAgfTtcblxuICBfYXBwbHlNYWNyb3MoKSB7XG4gICAgY29uc3QgbWFjcm9zID0gdGhpcy5fbWFjcm9zLnNsaWNlKDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFjcm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBtYWNybyA9IG1hY3Jvc1tpXTtcbiAgICAgIGlmIChtYWNyby5rZXlDb21iby5jaGVjayh0aGlzLnByZXNzZWRLZXlzKSkge1xuICAgICAgICBpZiAobWFjcm8uaGFuZGxlcikge1xuICAgICAgICAgIG1hY3JvLmtleU5hbWVzID0gbWFjcm8uaGFuZGxlcih0aGlzLnByZXNzZWRLZXlzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hY3JvLmtleU5hbWVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihtYWNyby5rZXlOYW1lc1tqXSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWRLZXlzLnB1c2gobWFjcm8ua2V5TmFtZXNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hcHBsaWVkTWFjcm9zLnB1c2gobWFjcm8pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfY2xlYXJNYWNyb3MoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcHBsaWVkTWFjcm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBtYWNybyA9IHRoaXMuX2FwcGxpZWRNYWNyb3NbaV07XG4gICAgICBpZiAoIW1hY3JvLmtleUNvbWJvLmNoZWNrKHRoaXMucHJlc3NlZEtleXMpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFjcm8ua2V5TmFtZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucHJlc3NlZEtleXMuaW5kZXhPZihtYWNyby5rZXlOYW1lc1tqXSk7XG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hY3JvLmhhbmRsZXIpIHtcbiAgICAgICAgICBtYWNyby5rZXlOYW1lcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXBwbGllZE1hY3Jvcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IExvY2FsZSB9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7IEtleUNvbWJvIH0gZnJvbSAnLi9rZXktY29tYm8nO1xuXG5cbmV4cG9ydCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldFdpbmRvdywgdGFyZ2V0RWxlbWVudCwgdGFyZ2V0UGxhdGZvcm0sIHRhcmdldFVzZXJBZ2VudCkge1xuICAgIHRoaXMuX2xvY2FsZSAgICAgICAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50Q29udGV4dCAgICAgICA9ICcnO1xuICAgIHRoaXMuX2NvbnRleHRzICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fbGlzdGVuZXJzICAgICAgICAgICAgPSBbXTtcbiAgICB0aGlzLl9hcHBsaWVkTGlzdGVuZXJzICAgICA9IFtdO1xuICAgIHRoaXMuX2xvY2FsZXMgICAgICAgICAgICAgID0ge307XG4gICAgdGhpcy5fdGFyZ2V0RWxlbWVudCAgICAgICAgPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldFdpbmRvdyAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl90YXJnZXRQbGF0Zm9ybSAgICAgICA9ICcnO1xuICAgIHRoaXMuX3RhcmdldFVzZXJBZ2VudCAgICAgID0gJyc7XG4gICAgdGhpcy5faXNNb2Rlcm5Ccm93c2VyICAgICAgPSBmYWxzZTtcbiAgICB0aGlzLl90YXJnZXRLZXlEb3duQmluZGluZyA9IG51bGw7XG4gICAgdGhpcy5fdGFyZ2V0S2V5VXBCaW5kaW5nICAgPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyAgID0gbnVsbDtcbiAgICB0aGlzLl9wYXVzZWQgICAgICAgICAgICAgICA9IGZhbHNlO1xuXG4gICAgdGhpcy5fY29udGV4dHMuZ2xvYmFsID0ge1xuICAgICAgbGlzdGVuZXJzOiB0aGlzLl9saXN0ZW5lcnMsXG4gICAgICB0YXJnZXRXaW5kb3csXG4gICAgICB0YXJnZXRFbGVtZW50LFxuICAgICAgdGFyZ2V0UGxhdGZvcm0sXG4gICAgICB0YXJnZXRVc2VyQWdlbnRcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250ZXh0KCdnbG9iYWwnKTtcbiAgfVxuXG4gIHNldExvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVCdWlsZGVyKSB7XG4gICAgbGV0IGxvY2FsZSA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBsb2NhbGVOYW1lID09PSAnc3RyaW5nJykge1xuXG4gICAgICBpZiAobG9jYWxlQnVpbGRlcikge1xuICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGxvY2FsZU5hbWUpO1xuICAgICAgICBsb2NhbGVCdWlsZGVyKGxvY2FsZSwgdGhpcy5fdGFyZ2V0UGxhdGZvcm0sIHRoaXMuX3RhcmdldFVzZXJBZ2VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhbGUgPSB0aGlzLl9sb2NhbGVzW2xvY2FsZU5hbWVdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsZSAgICAgPSBsb2NhbGVOYW1lO1xuICAgICAgbG9jYWxlTmFtZSA9IGxvY2FsZS5fbG9jYWxlTmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhbGUgICAgICAgICAgICAgID0gbG9jYWxlO1xuICAgIHRoaXMuX2xvY2FsZXNbbG9jYWxlTmFtZV0gPSBsb2NhbGU7XG4gICAgaWYgKGxvY2FsZSkge1xuICAgICAgdGhpcy5fbG9jYWxlLnByZXNzZWRLZXlzID0gbG9jYWxlLnByZXNzZWRLZXlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0TG9jYWxlKGxvY2FsTmFtZSkge1xuICAgIGxvY2FsTmFtZSB8fCAobG9jYWxOYW1lID0gdGhpcy5fbG9jYWxlLmxvY2FsZU5hbWUpO1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVzW2xvY2FsTmFtZV0gfHwgbnVsbDtcbiAgfVxuXG4gIGJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIsIHByZXZlbnRSZXBlYXRCeURlZmF1bHQpIHtcbiAgICBpZiAoa2V5Q29tYm9TdHIgPT09IG51bGwgfHwgdHlwZW9mIGtleUNvbWJvU3RyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0ID0gcmVsZWFzZUhhbmRsZXI7XG4gICAgICByZWxlYXNlSGFuZGxlciAgICAgICAgID0gcHJlc3NIYW5kbGVyO1xuICAgICAgcHJlc3NIYW5kbGVyICAgICAgICAgICA9IGtleUNvbWJvU3RyO1xuICAgICAga2V5Q29tYm9TdHIgICAgICAgICAgICA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAga2V5Q29tYm9TdHIgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ciA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBrZXlDb21ib1N0ci5sZW5ndGggPT09ICdudW1iZXInXG4gICAgKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUNvbWJvU3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYmluZChrZXlDb21ib1N0cltpXSwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaCh7XG4gICAgICBrZXlDb21ibyAgICAgICAgICAgICAgOiBrZXlDb21ib1N0ciA/IG5ldyBLZXlDb21ibyhrZXlDb21ib1N0cikgOiBudWxsLFxuICAgICAgcHJlc3NIYW5kbGVyICAgICAgICAgIDogcHJlc3NIYW5kbGVyICAgICAgICAgICB8fCBudWxsLFxuICAgICAgcmVsZWFzZUhhbmRsZXIgICAgICAgIDogcmVsZWFzZUhhbmRsZXIgICAgICAgICB8fCBudWxsLFxuICAgICAgcHJldmVudFJlcGVhdCAgICAgICAgIDogcHJldmVudFJlcGVhdEJ5RGVmYXVsdCB8fCBmYWxzZSxcbiAgICAgIHByZXZlbnRSZXBlYXRCeURlZmF1bHQ6IHByZXZlbnRSZXBlYXRCeURlZmF1bHQgfHwgZmFsc2UsXG4gICAgICBleGVjdXRpbmdIYW5kbGVyICAgICAgOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRMaXN0ZW5lcihrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlciwgcHJldmVudFJlcGVhdEJ5RGVmYXVsdCkge1xuICAgIHJldHVybiB0aGlzLmJpbmQoa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIsIHByZXZlbnRSZXBlYXRCeURlZmF1bHQpO1xuICB9XG5cbiAgb24oa2V5Q29tYm9TdHIsIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIsIHByZXZlbnRSZXBlYXRCeURlZmF1bHQpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kKGtleUNvbWJvU3RyLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KTtcbiAgfVxuXG4gIGJpbmRQcmVzcyhrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZChrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCBudWxsLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KTtcbiAgfVxuXG4gIGJpbmRSZWxlYXNlKGtleUNvbWJvU3RyLCByZWxlYXNlSGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLmJpbmQoa2V5Q29tYm9TdHIsIG51bGwsIHJlbGVhc2VIYW5kbGVyLCBwcmV2ZW50UmVwZWF0QnlEZWZhdWx0KTtcbiAgfVxuXG4gIHVuYmluZChrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcikge1xuICAgIGlmIChrZXlDb21ib1N0ciA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5Q29tYm9TdHIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlbGVhc2VIYW5kbGVyID0gcHJlc3NIYW5kbGVyO1xuICAgICAgcHJlc3NIYW5kbGVyICAgPSBrZXlDb21ib1N0cjtcbiAgICAgIGtleUNvbWJvU3RyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBrZXlDb21ib1N0ciAmJlxuICAgICAgdHlwZW9mIGtleUNvbWJvU3RyID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIGtleUNvbWJvU3RyLmxlbmd0aCA9PT0gJ251bWJlcidcbiAgICApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Q29tYm9TdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoa2V5Q29tYm9TdHJbaV0sIHByZXNzSGFuZGxlciwgcmVsZWFzZUhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy5fbGlzdGVuZXJzW2ldO1xuXG4gICAgICBjb25zdCBjb21ib01hdGNoZXMgICAgICAgICAgPSAha2V5Q29tYm9TdHIgJiYgIWxpc3RlbmVyLmtleUNvbWJvIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIua2V5Q29tYm8gJiYgbGlzdGVuZXIua2V5Q29tYm8uaXNFcXVhbChrZXlDb21ib1N0cik7XG4gICAgICBjb25zdCBwcmVzc0hhbmRsZXJNYXRjaGVzICAgPSAhcHJlc3NIYW5kbGVyICYmICFyZWxlYXNlSGFuZGxlciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFwcmVzc0hhbmRsZXIgJiYgIWxpc3RlbmVyLnByZXNzSGFuZGxlciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNzSGFuZGxlciA9PT0gbGlzdGVuZXIucHJlc3NIYW5kbGVyO1xuICAgICAgY29uc3QgcmVsZWFzZUhhbmRsZXJNYXRjaGVzID0gIXByZXNzSGFuZGxlciAmJiAhcmVsZWFzZUhhbmRsZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcmVsZWFzZUhhbmRsZXIgJiYgIWxpc3RlbmVyLnJlbGVhc2VIYW5kbGVyIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZUhhbmRsZXIgPT09IGxpc3RlbmVyLnJlbGVhc2VIYW5kbGVyO1xuXG4gICAgICBpZiAoY29tYm9NYXRjaGVzICYmIHByZXNzSGFuZGxlck1hdGNoZXMgJiYgcmVsZWFzZUhhbmRsZXJNYXRjaGVzKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyKGtleUNvbWJvU3RyLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMudW5iaW5kKGtleUNvbWJvU3RyLCBwcmVzc0hhbmRsZXIsIHJlbGVhc2VIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZihrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLnVuYmluZChrZXlDb21ib1N0ciwgcHJlc3NIYW5kbGVyLCByZWxlYXNlSGFuZGxlcik7XG4gIH1cblxuICBzZXRDb250ZXh0KGNvbnRleHROYW1lKSB7XG4gICAgaWYodGhpcy5fbG9jYWxlKSB7IHRoaXMucmVsZWFzZUFsbEtleXMoKTsgfVxuXG4gICAgaWYgKCF0aGlzLl9jb250ZXh0c1tjb250ZXh0TmFtZV0pIHtcbiAgICAgIGNvbnN0IGdsb2JhbENvbnRleHQgPSB0aGlzLl9jb250ZXh0cy5nbG9iYWw7XG4gICAgICB0aGlzLl9jb250ZXh0c1tjb250ZXh0TmFtZV0gPSB7XG4gICAgICAgIGxpc3RlbmVycyAgICAgIDogW10sXG4gICAgICAgIHRhcmdldFdpbmRvdyAgIDogZ2xvYmFsQ29udGV4dC50YXJnZXRXaW5kb3csXG4gICAgICAgIHRhcmdldEVsZW1lbnQgIDogZ2xvYmFsQ29udGV4dC50YXJnZXRFbGVtZW50LFxuICAgICAgICB0YXJnZXRQbGF0Zm9ybSA6IGdsb2JhbENvbnRleHQudGFyZ2V0UGxhdGZvcm0sXG4gICAgICAgIHRhcmdldFVzZXJBZ2VudDogZ2xvYmFsQ29udGV4dC50YXJnZXRVc2VyQWdlbnRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgY29udGV4dCAgICAgICAgPSB0aGlzLl9jb250ZXh0c1tjb250ZXh0TmFtZV07XG4gICAgdGhpcy5fY3VycmVudENvbnRleHQgPSBjb250ZXh0TmFtZTtcbiAgICB0aGlzLl9saXN0ZW5lcnMgICAgICA9IGNvbnRleHQubGlzdGVuZXJzO1xuXG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy53YXRjaChcbiAgICAgIGNvbnRleHQudGFyZ2V0V2luZG93LFxuICAgICAgY29udGV4dC50YXJnZXRFbGVtZW50LFxuICAgICAgY29udGV4dC50YXJnZXRQbGF0Zm9ybSxcbiAgICAgIGNvbnRleHQudGFyZ2V0VXNlckFnZW50XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudENvbnRleHQ7XG4gIH1cblxuICB3aXRoQ29udGV4dChjb250ZXh0TmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBwcmV2aW91c0NvbnRleHROYW1lID0gdGhpcy5nZXRDb250ZXh0KCk7XG4gICAgdGhpcy5zZXRDb250ZXh0KGNvbnRleHROYW1lKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgICB0aGlzLnNldENvbnRleHQocHJldmlvdXNDb250ZXh0TmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdhdGNoKHRhcmdldFdpbmRvdywgdGFyZ2V0RWxlbWVudCwgdGFyZ2V0UGxhdGZvcm0sIHRhcmdldFVzZXJBZ2VudCkge1xuICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgY29uc3Qgd2luID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6XG4gICAgICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgICAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDpcbiAgICAgICAgICAgICAgICB7fTtcblxuICAgIGlmICghdGFyZ2V0V2luZG93KSB7XG4gICAgICBpZiAoIXdpbi5hZGRFdmVudExpc3RlbmVyICYmICF3aW4uYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCB3aW5kb3cgZnVuY3Rpb25zIGFkZEV2ZW50TGlzdGVuZXIgb3IgYXR0YWNoRXZlbnQuJyk7XG4gICAgICB9XG4gICAgICB0YXJnZXRXaW5kb3cgPSB3aW47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGVsZW1lbnQgYmluZGluZ3Mgd2hlcmUgYSB0YXJnZXQgd2luZG93IGlzIG5vdCBwYXNzZWRcbiAgICBpZiAodHlwZW9mIHRhcmdldFdpbmRvdy5ub2RlVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRhcmdldFVzZXJBZ2VudCA9IHRhcmdldFBsYXRmb3JtO1xuICAgICAgdGFyZ2V0UGxhdGZvcm0gID0gdGFyZ2V0RWxlbWVudDtcbiAgICAgIHRhcmdldEVsZW1lbnQgICA9IHRhcmdldFdpbmRvdztcbiAgICAgIHRhcmdldFdpbmRvdyAgICA9IHdpbjtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFdpbmRvdy5hZGRFdmVudExpc3RlbmVyICYmICF0YXJnZXRXaW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgYWRkRXZlbnRMaXN0ZW5lciBvciBhdHRhY2hFdmVudCBtZXRob2RzIG9uIHRhcmdldFdpbmRvdy4nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc01vZGVybkJyb3dzZXIgPSAhIXRhcmdldFdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuXG4gICAgY29uc3QgdXNlckFnZW50ID0gdGFyZ2V0V2luZG93Lm5hdmlnYXRvciAmJiB0YXJnZXRXaW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcbiAgICBjb25zdCBwbGF0Zm9ybSAgPSB0YXJnZXRXaW5kb3cubmF2aWdhdG9yICYmIHRhcmdldFdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0gIHx8ICcnO1xuXG4gICAgdGFyZ2V0RWxlbWVudCAgICYmIHRhcmdldEVsZW1lbnQgICAhPT0gbnVsbCB8fCAodGFyZ2V0RWxlbWVudCAgID0gdGFyZ2V0V2luZG93LmRvY3VtZW50KTtcbiAgICB0YXJnZXRQbGF0Zm9ybSAgJiYgdGFyZ2V0UGxhdGZvcm0gICE9PSBudWxsIHx8ICh0YXJnZXRQbGF0Zm9ybSAgPSBwbGF0Zm9ybSk7XG4gICAgdGFyZ2V0VXNlckFnZW50ICYmIHRhcmdldFVzZXJBZ2VudCAhPT0gbnVsbCB8fCAodGFyZ2V0VXNlckFnZW50ID0gdXNlckFnZW50KTtcblxuICAgIHRoaXMuX3RhcmdldEtleURvd25CaW5kaW5nID0gKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnByZXNzS2V5KGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcbiAgICAgIHRoaXMuX2hhbmRsZUNvbW1hbmRCdWcoZXZlbnQsIHBsYXRmb3JtKTtcbiAgICB9O1xuICAgIHRoaXMuX3RhcmdldEtleVVwQmluZGluZyA9IChldmVudCkgPT4ge1xuICAgICAgdGhpcy5yZWxlYXNlS2V5KGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcbiAgICB9O1xuICAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyA9IChldmVudCkgPT4ge1xuICAgICAgdGhpcy5yZWxlYXNlQWxsS2V5cyhldmVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuX2JpbmRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5ZG93bicsIHRoaXMuX3RhcmdldEtleURvd25CaW5kaW5nKTtcbiAgICB0aGlzLl9iaW5kRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXVwJywgICB0aGlzLl90YXJnZXRLZXlVcEJpbmRpbmcpO1xuICAgIHRoaXMuX2JpbmRFdmVudCh0YXJnZXRXaW5kb3csICAnZm9jdXMnLCAgIHRoaXMuX3RhcmdldFJlc2V0QmluZGluZyk7XG4gICAgdGhpcy5fYmluZEV2ZW50KHRhcmdldFdpbmRvdywgICdibHVyJywgICAgdGhpcy5fdGFyZ2V0UmVzZXRCaW5kaW5nKTtcblxuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQgICA9IHRhcmdldEVsZW1lbnQ7XG4gICAgdGhpcy5fdGFyZ2V0V2luZG93ICAgID0gdGFyZ2V0V2luZG93O1xuICAgIHRoaXMuX3RhcmdldFBsYXRmb3JtICA9IHRhcmdldFBsYXRmb3JtO1xuICAgIHRoaXMuX3RhcmdldFVzZXJBZ2VudCA9IHRhcmdldFVzZXJBZ2VudDtcblxuICAgIGNvbnN0IGN1cnJlbnRDb250ZXh0ICAgICAgICAgICA9IHRoaXMuX2NvbnRleHRzW3RoaXMuX2N1cnJlbnRDb250ZXh0XTtcbiAgICBjdXJyZW50Q29udGV4dC50YXJnZXRXaW5kb3cgICAgPSB0aGlzLl90YXJnZXRXaW5kb3c7XG4gICAgY3VycmVudENvbnRleHQudGFyZ2V0RWxlbWVudCAgID0gdGhpcy5fdGFyZ2V0RWxlbWVudDtcbiAgICBjdXJyZW50Q29udGV4dC50YXJnZXRQbGF0Zm9ybSAgPSB0aGlzLl90YXJnZXRQbGF0Zm9ybTtcbiAgICBjdXJyZW50Q29udGV4dC50YXJnZXRVc2VyQWdlbnQgPSB0aGlzLl90YXJnZXRVc2VyQWdlbnQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKCF0aGlzLl90YXJnZXRFbGVtZW50IHx8ICF0aGlzLl90YXJnZXRXaW5kb3cpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl91bmJpbmRFdmVudCh0aGlzLl90YXJnZXRFbGVtZW50LCAna2V5ZG93bicsIHRoaXMuX3RhcmdldEtleURvd25CaW5kaW5nKTtcbiAgICB0aGlzLl91bmJpbmRFdmVudCh0aGlzLl90YXJnZXRFbGVtZW50LCAna2V5dXAnLCAgIHRoaXMuX3RhcmdldEtleVVwQmluZGluZyk7XG4gICAgdGhpcy5fdW5iaW5kRXZlbnQodGhpcy5fdGFyZ2V0V2luZG93LCAgJ2ZvY3VzJywgICB0aGlzLl90YXJnZXRSZXNldEJpbmRpbmcpO1xuICAgIHRoaXMuX3VuYmluZEV2ZW50KHRoaXMuX3RhcmdldFdpbmRvdywgICdibHVyJywgICAgdGhpcy5fdGFyZ2V0UmVzZXRCaW5kaW5nKTtcblxuICAgIHRoaXMuX3RhcmdldFdpbmRvdyAgPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQgPSBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcmVzc0tleShrZXlDb2RlLCBldmVudCkge1xuICAgIGlmICh0aGlzLl9wYXVzZWQpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICBpZiAoIXRoaXMuX2xvY2FsZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0xvY2FsZSBub3Qgc2V0Jyk7IH1cblxuICAgIHRoaXMuX2xvY2FsZS5wcmVzc0tleShrZXlDb2RlKTtcbiAgICB0aGlzLl9hcHBseUJpbmRpbmdzKGV2ZW50KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVsZWFzZUtleShrZXlDb2RlLCBldmVudCkge1xuICAgIGlmICh0aGlzLl9wYXVzZWQpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICBpZiAoIXRoaXMuX2xvY2FsZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0xvY2FsZSBub3Qgc2V0Jyk7IH1cblxuICAgIHRoaXMuX2xvY2FsZS5yZWxlYXNlS2V5KGtleUNvZGUpO1xuICAgIHRoaXMuX2NsZWFyQmluZGluZ3MoZXZlbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZWxlYXNlQWxsS2V5cyhldmVudCkge1xuICAgIGlmICh0aGlzLl9wYXVzZWQpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICBpZiAoIXRoaXMuX2xvY2FsZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0xvY2FsZSBub3Qgc2V0Jyk7IH1cblxuICAgIHRoaXMuX2xvY2FsZS5wcmVzc2VkS2V5cy5sZW5ndGggPSAwO1xuICAgIHRoaXMuX2NsZWFyQmluZGluZ3MoZXZlbnQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7IHJldHVybiB0aGlzOyB9XG4gICAgaWYgKHRoaXMuX2xvY2FsZSkgeyB0aGlzLnJlbGVhc2VBbGxLZXlzKCk7IH1cbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMucmVsZWFzZUFsbEtleXMoKTtcbiAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2JpbmRFdmVudCh0YXJnZXRFbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5faXNNb2Rlcm5Ccm93c2VyID9cbiAgICAgIHRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKSA6XG4gICAgICB0YXJnZXRFbGVtZW50LmF0dGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgX3VuYmluZEV2ZW50KHRhcmdldEVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9pc01vZGVybkJyb3dzZXIgP1xuICAgICAgdGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpIDpcbiAgICAgIHRhcmdldEVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICBfZ2V0R3JvdXBlZExpc3RlbmVycygpIHtcbiAgICBjb25zdCBsaXN0ZW5lckdyb3VwcyAgID0gW107XG4gICAgY29uc3QgbGlzdGVuZXJHcm91cE1hcCA9IFtdO1xuXG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICBpZiAodGhpcy5fY3VycmVudENvbnRleHQgIT09ICdnbG9iYWwnKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbLi4ubGlzdGVuZXJzLCAuLi50aGlzLl9jb250ZXh0cy5nbG9iYWwubGlzdGVuZXJzXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuc29ydChcbiAgICAgIChhLCBiKSA9PlxuICAgICAgICAoYi5rZXlDb21ibyA/IGIua2V5Q29tYm8ua2V5TmFtZXMubGVuZ3RoIDogMCkgLVxuICAgICAgICAoYS5rZXlDb21ibyA/IGEua2V5Q29tYm8ua2V5TmFtZXMubGVuZ3RoIDogMClcbiAgICApLmZvckVhY2goKGwpID0+IHtcbiAgICAgIGxldCBtYXBJbmRleCA9IC0xO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lckdyb3VwTWFwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lckdyb3VwTWFwW2ldID09PSBudWxsICYmIGwua2V5Q29tYm8gPT09IG51bGwgfHxcbiAgICAgICAgICAgIGxpc3RlbmVyR3JvdXBNYXBbaV0gIT09IG51bGwgJiYgbGlzdGVuZXJHcm91cE1hcFtpXS5pc0VxdWFsKGwua2V5Q29tYm8pKSB7XG4gICAgICAgICAgbWFwSW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWFwSW5kZXggPT09IC0xKSB7XG4gICAgICAgIG1hcEluZGV4ID0gbGlzdGVuZXJHcm91cE1hcC5sZW5ndGg7XG4gICAgICAgIGxpc3RlbmVyR3JvdXBNYXAucHVzaChsLmtleUNvbWJvKTtcbiAgICAgIH1cbiAgICAgIGlmICghbGlzdGVuZXJHcm91cHNbbWFwSW5kZXhdKSB7XG4gICAgICAgIGxpc3RlbmVyR3JvdXBzW21hcEluZGV4XSA9IFtdO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXJHcm91cHNbbWFwSW5kZXhdLnB1c2gobCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGlzdGVuZXJHcm91cHM7XG4gIH1cblxuICBfYXBwbHlCaW5kaW5ncyhldmVudCkge1xuICAgIGxldCBwcmV2ZW50UmVwZWF0ID0gZmFsc2U7XG5cbiAgICBldmVudCB8fCAoZXZlbnQgPSB7fSk7XG4gICAgZXZlbnQucHJldmVudFJlcGVhdCA9ICgpID0+IHsgcHJldmVudFJlcGVhdCA9IHRydWU7IH07XG4gICAgZXZlbnQucHJlc3NlZEtleXMgICA9IHRoaXMuX2xvY2FsZS5wcmVzc2VkS2V5cy5zbGljZSgwKTtcblxuICAgIGNvbnN0IGFjdGl2ZVRhcmdldEtleXMgPSB0aGlzLl9sb2NhbGUuYWN0aXZlVGFyZ2V0S2V5cztcbiAgICBjb25zdCBwcmVzc2VkS2V5cyAgICAgID0gdGhpcy5fbG9jYWxlLnByZXNzZWRLZXlzLnNsaWNlKDApO1xuICAgIGNvbnN0IGxpc3RlbmVyR3JvdXBzICAgPSB0aGlzLl9nZXRHcm91cGVkTGlzdGVuZXJzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVyR3JvdXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSBsaXN0ZW5lckdyb3Vwc1tpXTtcbiAgICAgIGNvbnN0IGtleUNvbWJvICA9IGxpc3RlbmVyc1swXS5rZXlDb21ibztcblxuICAgICAgaWYgKFxuICAgICAgICBrZXlDb21ibyA9PT0gbnVsbCB8fFxuICAgICAgICBrZXlDb21iby5jaGVjayhwcmVzc2VkS2V5cykgJiZcbiAgICAgICAgYWN0aXZlVGFyZ2V0S2V5cy5zb21lKGsgPT4ga2V5Q29tYm8ua2V5TmFtZXMuaW5jbHVkZXMoaykpXG4gICAgICApIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaXN0ZW5lcnMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbal07XG5cbiAgICAgICAgICBpZiAoIWxpc3RlbmVyLmV4ZWN1dGluZ0hhbmRsZXIgJiYgbGlzdGVuZXIucHJlc3NIYW5kbGVyICYmICFsaXN0ZW5lci5wcmV2ZW50UmVwZWF0KSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5leGVjdXRpbmdIYW5kbGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpc3RlbmVyLnByZXNzSGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmV4ZWN1dGluZ0hhbmRsZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnRSZXBlYXQgfHwgbGlzdGVuZXIucHJldmVudFJlcGVhdEJ5RGVmYXVsdCkge1xuICAgICAgICAgICAgICBsaXN0ZW5lci5wcmV2ZW50UmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldmVudFJlcGVhdCAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9hcHBsaWVkTGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGllZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29tYm8pIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGtleUNvbWJvLmtleU5hbWVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHByZXNzZWRLZXlzLmluZGV4T2Yoa2V5Q29tYm8ua2V5TmFtZXNbal0pO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICBwcmVzc2VkS2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICBqIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NsZWFyQmluZGluZ3MoZXZlbnQpIHtcbiAgICBldmVudCB8fCAoZXZlbnQgPSB7fSk7XG4gICAgZXZlbnQucHJlc3NlZEtleXMgPSB0aGlzLl9sb2NhbGUucHJlc3NlZEtleXMuc2xpY2UoMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FwcGxpZWRMaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy5fYXBwbGllZExpc3RlbmVyc1tpXTtcbiAgICAgIGNvbnN0IGtleUNvbWJvID0gbGlzdGVuZXIua2V5Q29tYm87XG4gICAgICBpZiAoa2V5Q29tYm8gPT09IG51bGwgfHwgIWtleUNvbWJvLmNoZWNrKHRoaXMuX2xvY2FsZS5wcmVzc2VkS2V5cykpIHtcbiAgICAgICAgbGlzdGVuZXIucHJldmVudFJlcGVhdCA9IGZhbHNlO1xuICAgICAgICBpZiAoa2V5Q29tYm8gIT09IG51bGwgfHwgZXZlbnQucHJlc3NlZEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fYXBwbGllZExpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbGlzdGVuZXIuZXhlY3V0aW5nSGFuZGxlciAmJiBsaXN0ZW5lci5yZWxlYXNlSGFuZGxlcikge1xuICAgICAgICAgIGxpc3RlbmVyLmV4ZWN1dGluZ0hhbmRsZXIgPSB0cnVlO1xuICAgICAgICAgIGxpc3RlbmVyLnJlbGVhc2VIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgIGxpc3RlbmVyLmV4ZWN1dGluZ0hhbmRsZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVDb21tYW5kQnVnKGV2ZW50LCBwbGF0Zm9ybSkge1xuICAgIC8vIE9uIE1hYyB3aGVuIHRoZSBjb21tYW5kIGtleSBpcyBrZXB0IHByZXNzZWQsIGtleXVwIGlzIG5vdCB0cmlnZ2VyZWQgZm9yIGFueSBvdGhlciBrZXkuXG4gICAgLy8gSW4gdGhpcyBjYXNlIGZvcmNlIGEga2V5dXAgZm9yIG5vbi1tb2RpZmllciBrZXlzIGRpcmVjdGx5IGFmdGVyIHRoZSBrZXlwcmVzcy5cbiAgICBjb25zdCBtb2RpZmllcktleXMgPSBbXCJzaGlmdFwiLCBcImN0cmxcIiwgXCJhbHRcIiwgXCJjYXBzbG9ja1wiLCBcInRhYlwiLCBcImNvbW1hbmRcIl07XG4gICAgaWYgKHBsYXRmb3JtLm1hdGNoKFwiTWFjXCIpICYmIHRoaXMuX2xvY2FsZS5wcmVzc2VkS2V5cy5pbmNsdWRlcyhcImNvbW1hbmRcIikgJiZcbiAgICAgICAgIW1vZGlmaWVyS2V5cy5pbmNsdWRlcyh0aGlzLl9sb2NhbGUuZ2V0S2V5TmFtZXMoZXZlbnQua2V5Q29kZSlbMF0pKSB7XG4gICAgICB0aGlzLl90YXJnZXRLZXlVcEJpbmRpbmcoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZnVuY3Rpb24gdXMobG9jYWxlLCBwbGF0Zm9ybSwgdXNlckFnZW50KSB7XG5cbiAgLy8gZ2VuZXJhbFxuICBsb2NhbGUuYmluZEtleUNvZGUoMywgICBbJ2NhbmNlbCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDgsICAgWydiYWNrc3BhY2UnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg5LCAgIFsndGFiJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTIsICBbJ2NsZWFyJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTMsICBbJ2VudGVyJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTYsICBbJ3NoaWZ0J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTcsICBbJ2N0cmwnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxOCwgIFsnYWx0JywgJ21lbnUnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxOSwgIFsncGF1c2UnLCAnYnJlYWsnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgyMCwgIFsnY2Fwc2xvY2snXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgyNywgIFsnZXNjYXBlJywgJ2VzYyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDMyLCAgWydzcGFjZScsICdzcGFjZWJhciddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDMzLCAgWydwYWdldXAnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzNCwgIFsncGFnZWRvd24nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzNSwgIFsnZW5kJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMzYsICBbJ2hvbWUnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgzNywgIFsnbGVmdCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDM4LCAgWyd1cCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDM5LCAgWydyaWdodCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQwLCAgWydkb3duJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNDEsICBbJ3NlbGVjdCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQyLCAgWydwcmludHNjcmVlbiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQzLCAgWydleGVjdXRlJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNDQsICBbJ3NuYXBzaG90J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNDUsICBbJ2luc2VydCcsICdpbnMnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg0NiwgIFsnZGVsZXRlJywgJ2RlbCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDQ3LCAgWydoZWxwJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTQ1LCBbJ3Njcm9sbGxvY2snLCAnc2Nyb2xsJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTg4LCBbJ2NvbW1hJywgJywnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxOTAsIFsncGVyaW9kJywgJy4nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxOTEsIFsnc2xhc2gnLCAnZm9yd2FyZHNsYXNoJywgJy8nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxOTIsIFsnZ3JhdmVhY2NlbnQnLCAnYCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDIxOSwgWydvcGVuYnJhY2tldCcsICdbJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMjIwLCBbJ2JhY2tzbGFzaCcsICdcXFxcJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMjIxLCBbJ2Nsb3NlYnJhY2tldCcsICddJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMjIyLCBbJ2Fwb3N0cm9waGUnLCAnXFwnJ10pO1xuXG4gIC8vIDAtOVxuICBsb2NhbGUuYmluZEtleUNvZGUoNDgsIFsnemVybycsICcwJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNDksIFsnb25lJywgJzEnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1MCwgWyd0d28nLCAnMiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDUxLCBbJ3RocmVlJywgJzMnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1MiwgWydmb3VyJywgJzQnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1MywgWydmaXZlJywgJzUnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1NCwgWydzaXgnLCAnNiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDU1LCBbJ3NldmVuJywgJzcnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg1NiwgWydlaWdodCcsICc4J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoNTcsIFsnbmluZScsICc5J10pO1xuXG4gIC8vIG51bXBhZFxuICBsb2NhbGUuYmluZEtleUNvZGUoOTYsIFsnbnVtemVybycsICdudW0wJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoOTcsIFsnbnVtb25lJywgJ251bTEnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSg5OCwgWydudW10d28nLCAnbnVtMiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDk5LCBbJ251bXRocmVlJywgJ251bTMnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDAsIFsnbnVtZm91cicsICdudW00J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTAxLCBbJ251bWZpdmUnLCAnbnVtNSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEwMiwgWydudW1zaXgnLCAnbnVtNiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEwMywgWydudW1zZXZlbicsICdudW03J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA0LCBbJ251bWVpZ2h0JywgJ251bTgnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDUsIFsnbnVtbmluZScsICdudW05J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTA2LCBbJ251bW11bHRpcGx5JywgJ251bSonXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDcsIFsnbnVtYWRkJywgJ251bSsnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDgsIFsnbnVtZW50ZXInXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMDksIFsnbnVtc3VidHJhY3QnLCAnbnVtLSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDExMCwgWydudW1kZWNpbWFsJywgJ251bS4nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMTEsIFsnbnVtZGl2aWRlJywgJ251bS8nXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxNDQsIFsnbnVtbG9jaycsICdudW0nXSk7XG5cbiAgLy8gZnVuY3Rpb24ga2V5c1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTEyLCBbJ2YxJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTEzLCBbJ2YyJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE0LCBbJ2YzJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE1LCBbJ2Y0J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE2LCBbJ2Y1J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE3LCBbJ2Y2J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE4LCBbJ2Y3J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTE5LCBbJ2Y4J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTIwLCBbJ2Y5J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTIxLCBbJ2YxMCddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyMiwgWydmMTEnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjMsIFsnZjEyJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTI0LCBbJ2YxMyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyNSwgWydmMTQnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjYsIFsnZjE1J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTI3LCBbJ2YxNiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEyOCwgWydmMTcnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMjksIFsnZjE4J10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTMwLCBbJ2YxOSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEzMSwgWydmMjAnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMzIsIFsnZjIxJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoMTMzLCBbJ2YyMiddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKDEzNCwgWydmMjMnXSk7XG4gIGxvY2FsZS5iaW5kS2V5Q29kZSgxMzUsIFsnZjI0J10pO1xuXG4gIC8vIHNlY29uZGFyeSBrZXkgc3ltYm9sc1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIGAnLCBbJ3RpbGRlJywgJ34nXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgMScsIFsnZXhjbGFtYXRpb24nLCAnZXhjbGFtYXRpb25wb2ludCcsICchJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDInLCBbJ2F0JywgJ0AnXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgMycsIFsnbnVtYmVyJywgJyMnXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgNCcsIFsnZG9sbGFyJywgJ2RvbGxhcnMnLCAnZG9sbGFyc2lnbicsICckJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDUnLCBbJ3BlcmNlbnQnLCAnJSddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA2JywgWydjYXJldCcsICdeJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDcnLCBbJ2FtcGVyc2FuZCcsICdhbmQnLCAnJiddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyA4JywgWydhc3RlcmlzaycsICcqJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDknLCBbJ29wZW5wYXJlbicsICcoJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDAnLCBbJ2Nsb3NlcGFyZW4nLCAnKSddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAtJywgWyd1bmRlcnNjb3JlJywgJ18nXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgPScsIFsncGx1cycsICcrJ10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIFsnLCBbJ29wZW5jdXJseWJyYWNlJywgJ29wZW5jdXJseWJyYWNrZXQnLCAneyddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyBdJywgWydjbG9zZWN1cmx5YnJhY2UnLCAnY2xvc2VjdXJseWJyYWNrZXQnLCAnfSddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyBcXFxcJywgWyd2ZXJ0aWNhbGJhcicsICd8J10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIDsnLCBbJ2NvbG9uJywgJzonXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgXFwnJywgWydxdW90YXRpb25tYXJrJywgJ1xcJyddKTtcbiAgbG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAhLCcsIFsnb3BlbmFuZ2xlYnJhY2tldCcsICc8J10pO1xuICBsb2NhbGUuYmluZE1hY3JvKCdzaGlmdCArIC4nLCBbJ2Nsb3NlYW5nbGVicmFja2V0JywgJz4nXSk7XG4gIGxvY2FsZS5iaW5kTWFjcm8oJ3NoaWZ0ICsgLycsIFsncXVlc3Rpb25tYXJrJywgJz8nXSk7XG5cbiAgaWYgKHBsYXRmb3JtLm1hdGNoKCdNYWMnKSkge1xuICAgIGxvY2FsZS5iaW5kTWFjcm8oJ2NvbW1hbmQnLCBbJ21vZCcsICdtb2RpZmllciddKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbGUuYmluZE1hY3JvKCdjdHJsJywgWydtb2QnLCAnbW9kaWZpZXInXSk7XG4gIH1cblxuICAvL2EteiBhbmQgQS1aXG4gIGZvciAobGV0IGtleUNvZGUgPSA2NTsga2V5Q29kZSA8PSA5MDsga2V5Q29kZSArPSAxKSB7XG4gICAgdmFyIGtleU5hbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUgKyAzMik7XG4gICAgdmFyIGNhcGl0YWxLZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcbiAgXHRsb2NhbGUuYmluZEtleUNvZGUoa2V5Q29kZSwga2V5TmFtZSk7XG4gIFx0bG9jYWxlLmJpbmRNYWNybygnc2hpZnQgKyAnICsga2V5TmFtZSwgY2FwaXRhbEtleU5hbWUpO1xuICBcdGxvY2FsZS5iaW5kTWFjcm8oJ2NhcHNsb2NrICsgJyArIGtleU5hbWUsIGNhcGl0YWxLZXlOYW1lKTtcbiAgfVxuXG4gIC8vIGJyb3dzZXIgY2F2ZWF0c1xuICBjb25zdCBzZW1pY29sb25LZXlDb2RlID0gdXNlckFnZW50Lm1hdGNoKCdGaXJlZm94JykgPyA1OSAgOiAxODY7XG4gIGNvbnN0IGRhc2hLZXlDb2RlICAgICAgPSB1c2VyQWdlbnQubWF0Y2goJ0ZpcmVmb3gnKSA/IDE3MyA6IDE4OTtcbiAgY29uc3QgZXF1YWxLZXlDb2RlICAgICA9IHVzZXJBZ2VudC5tYXRjaCgnRmlyZWZveCcpID8gNjEgIDogMTg3O1xuICBsZXQgbGVmdENvbW1hbmRLZXlDb2RlO1xuICBsZXQgcmlnaHRDb21tYW5kS2V5Q29kZTtcbiAgaWYgKHBsYXRmb3JtLm1hdGNoKCdNYWMnKSAmJiAodXNlckFnZW50Lm1hdGNoKCdTYWZhcmknKSB8fCB1c2VyQWdlbnQubWF0Y2goJ0Nocm9tZScpKSkge1xuICAgIGxlZnRDb21tYW5kS2V5Q29kZSAgPSA5MTtcbiAgICByaWdodENvbW1hbmRLZXlDb2RlID0gOTM7XG4gIH0gZWxzZSBpZihwbGF0Zm9ybS5tYXRjaCgnTWFjJykgJiYgdXNlckFnZW50Lm1hdGNoKCdPcGVyYScpKSB7XG4gICAgbGVmdENvbW1hbmRLZXlDb2RlICA9IDE3O1xuICAgIHJpZ2h0Q29tbWFuZEtleUNvZGUgPSAxNztcbiAgfSBlbHNlIGlmKHBsYXRmb3JtLm1hdGNoKCdNYWMnKSAmJiB1c2VyQWdlbnQubWF0Y2goJ0ZpcmVmb3gnKSkge1xuICAgIGxlZnRDb21tYW5kS2V5Q29kZSAgPSAyMjQ7XG4gICAgcmlnaHRDb21tYW5kS2V5Q29kZSA9IDIyNDtcbiAgfVxuICBsb2NhbGUuYmluZEtleUNvZGUoc2VtaWNvbG9uS2V5Q29kZSwgICAgWydzZW1pY29sb24nLCAnOyddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKGRhc2hLZXlDb2RlLCAgICAgICAgIFsnZGFzaCcsICctJ10pO1xuICBsb2NhbGUuYmluZEtleUNvZGUoZXF1YWxLZXlDb2RlLCAgICAgICAgWydlcXVhbCcsICdlcXVhbHNpZ24nLCAnPSddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKGxlZnRDb21tYW5kS2V5Q29kZSwgIFsnY29tbWFuZCcsICd3aW5kb3dzJywgJ3dpbicsICdzdXBlcicsICdsZWZ0Y29tbWFuZCcsICdsZWZ0d2luZG93cycsICdsZWZ0d2luJywgJ2xlZnRzdXBlciddKTtcbiAgbG9jYWxlLmJpbmRLZXlDb2RlKHJpZ2h0Q29tbWFuZEtleUNvZGUsIFsnY29tbWFuZCcsICd3aW5kb3dzJywgJ3dpbicsICdzdXBlcicsICdyaWdodGNvbW1hbmQnLCAncmlnaHR3aW5kb3dzJywgJ3JpZ2h0d2luJywgJ3JpZ2h0c3VwZXInXSk7XG5cbiAgLy8ga2lsbCBrZXlzXG4gIGxvY2FsZS5zZXRLaWxsS2V5KCdjb21tYW5kJyk7XG59O1xuIiwiaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2xpYi9rZXlib2FyZCc7XG5pbXBvcnQgeyBMb2NhbGUgfSBmcm9tICcuL2xpYi9sb2NhbGUnO1xuaW1wb3J0IHsgS2V5Q29tYm8gfSBmcm9tICcuL2xpYi9rZXktY29tYm8nO1xuaW1wb3J0IHsgdXMgfSBmcm9tICcuL2xvY2FsZXMvdXMnO1xuXG5jb25zdCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCgpO1xuXG5rZXlib2FyZC5zZXRMb2NhbGUoJ3VzJywgdXMpO1xuXG5rZXlib2FyZC5LZXlib2FyZCA9IEtleWJvYXJkO1xua2V5Ym9hcmQuTG9jYWxlID0gTG9jYWxlO1xua2V5Ym9hcmQuS2V5Q29tYm8gPSBLZXlDb21ibztcblxuZXhwb3J0IGRlZmF1bHQga2V5Ym9hcmQ7XG4iXSwibmFtZXMiOlsiS2V5Q29tYm8iLCJrZXlDb21ib1N0ciIsInNvdXJjZVN0ciIsInN1YkNvbWJvcyIsInBhcnNlQ29tYm9TdHIiLCJrZXlOYW1lcyIsInJlZHVjZSIsIm1lbW8iLCJuZXh0U3ViQ29tYm8iLCJjb25jYXQiLCJwcmVzc2VkS2V5TmFtZXMiLCJzdGFydGluZ0tleU5hbWVJbmRleCIsImkiLCJsZW5ndGgiLCJfY2hlY2tTdWJDb21ibyIsIm90aGVyS2V5Q29tYm8iLCJzdWJDb21ibyIsIm90aGVyU3ViQ29tYm8iLCJzbGljZSIsImoiLCJrZXlOYW1lIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZW5kSW5kZXgiLCJlc2NhcGVkS2V5TmFtZSIsImNvbWJvRGVsaW1pbmF0b3IiLCJrZXlEZWxpbWluYXRvciIsInN1YkNvbWJvU3RycyIsIl9zcGxpdFN0ciIsImNvbWJvIiwicHVzaCIsInN0ciIsImRlbGltaW5hdG9yIiwicyIsImQiLCJjIiwiY2EiLCJjaSIsInRyaW0iLCJMb2NhbGUiLCJuYW1lIiwibG9jYWxlTmFtZSIsImFjdGl2ZVRhcmdldEtleXMiLCJwcmVzc2VkS2V5cyIsIl9hcHBsaWVkTWFjcm9zIiwiX2tleU1hcCIsIl9raWxsS2V5Q29kZXMiLCJfbWFjcm9zIiwia2V5Q29kZSIsImhhbmRsZXIiLCJtYWNybyIsImtleUNvbWJvIiwia2V5Q29kZXMiLCJnZXRLZXlDb2RlcyIsInNldEtpbGxLZXkiLCJwcmVzc0tleSIsImdldEtleU5hbWVzIiwiX2FwcGx5TWFjcm9zIiwicmVsZWFzZUtleSIsImtpbGxLZXlDb2RlSW5kZXgiLCJfY2xlYXJNYWNyb3MiLCJtYWNyb3MiLCJjaGVjayIsIktleWJvYXJkIiwidGFyZ2V0V2luZG93IiwidGFyZ2V0RWxlbWVudCIsInRhcmdldFBsYXRmb3JtIiwidGFyZ2V0VXNlckFnZW50IiwiX2xvY2FsZSIsIl9jdXJyZW50Q29udGV4dCIsIl9jb250ZXh0cyIsIl9saXN0ZW5lcnMiLCJfYXBwbGllZExpc3RlbmVycyIsIl9sb2NhbGVzIiwiX3RhcmdldEVsZW1lbnQiLCJfdGFyZ2V0V2luZG93IiwiX3RhcmdldFBsYXRmb3JtIiwiX3RhcmdldFVzZXJBZ2VudCIsIl9pc01vZGVybkJyb3dzZXIiLCJfdGFyZ2V0S2V5RG93bkJpbmRpbmciLCJfdGFyZ2V0S2V5VXBCaW5kaW5nIiwiX3RhcmdldFJlc2V0QmluZGluZyIsIl9wYXVzZWQiLCJnbG9iYWwiLCJsaXN0ZW5lcnMiLCJzZXRDb250ZXh0IiwibG9jYWxlQnVpbGRlciIsImxvY2FsZSIsIl9sb2NhbGVOYW1lIiwibG9jYWxOYW1lIiwicHJlc3NIYW5kbGVyIiwicmVsZWFzZUhhbmRsZXIiLCJwcmV2ZW50UmVwZWF0QnlEZWZhdWx0IiwiYmluZCIsInByZXZlbnRSZXBlYXQiLCJleGVjdXRpbmdIYW5kbGVyIiwidW5iaW5kIiwibGlzdGVuZXIiLCJjb21ib01hdGNoZXMiLCJpc0VxdWFsIiwicHJlc3NIYW5kbGVyTWF0Y2hlcyIsInJlbGVhc2VIYW5kbGVyTWF0Y2hlcyIsImNvbnRleHROYW1lIiwicmVsZWFzZUFsbEtleXMiLCJnbG9iYWxDb250ZXh0IiwiY29udGV4dCIsInN0b3AiLCJ3YXRjaCIsImNhbGxiYWNrIiwicHJldmlvdXNDb250ZXh0TmFtZSIsImdldENvbnRleHQiLCJ3aW4iLCJnbG9iYWxUaGlzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiRXJyb3IiLCJub2RlVHlwZSIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsInBsYXRmb3JtIiwiZG9jdW1lbnQiLCJldmVudCIsIl9oYW5kbGVDb21tYW5kQnVnIiwiX2JpbmRFdmVudCIsImN1cnJlbnRDb250ZXh0IiwiX3VuYmluZEV2ZW50IiwiX2FwcGx5QmluZGluZ3MiLCJfY2xlYXJCaW5kaW5ncyIsImV2ZW50TmFtZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsImxpc3RlbmVyR3JvdXBzIiwibGlzdGVuZXJHcm91cE1hcCIsInNvcnQiLCJhIiwiYiIsImZvckVhY2giLCJsIiwibWFwSW5kZXgiLCJfZ2V0R3JvdXBlZExpc3RlbmVycyIsInNvbWUiLCJrIiwiaW5jbHVkZXMiLCJjYWxsIiwibW9kaWZpZXJLZXlzIiwibWF0Y2giLCJ1cyIsImJpbmRLZXlDb2RlIiwiYmluZE1hY3JvIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2FwaXRhbEtleU5hbWUiLCJzZW1pY29sb25LZXlDb2RlIiwiZGFzaEtleUNvZGUiLCJlcXVhbEtleUNvZGUiLCJsZWZ0Q29tbWFuZEtleUNvZGUiLCJyaWdodENvbW1hbmRLZXlDb2RlIiwia2V5Ym9hcmQiLCJzZXRMb2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQ2FBLFFBQWI7RUFDRSxvQkFBWUMsV0FBWixFQUF5QjtFQUFBOztFQUN2QixTQUFLQyxTQUFMLEdBQWlCRCxXQUFqQjtFQUNBLFNBQUtFLFNBQUwsR0FBaUJILFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QkgsV0FBdkIsQ0FBakI7RUFDQSxTQUFLSSxRQUFMLEdBQWlCLEtBQUtGLFNBQUwsQ0FBZUcsTUFBZixDQUFzQixVQUFDQyxJQUFELEVBQU9DLFlBQVA7RUFBQSxhQUNyQ0QsSUFBSSxDQUFDRSxNQUFMLENBQVlELFlBQVosQ0FEcUM7RUFBQSxLQUF0QixFQUNZLEVBRFosQ0FBakI7RUFFRDs7RUFOSDtFQUFBO0VBQUEsMEJBUVFFLGVBUlIsRUFReUI7RUFDckIsVUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0I7O0VBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtULFNBQUwsQ0FBZVUsTUFBbkMsRUFBMkNELENBQUMsSUFBSSxDQUFoRCxFQUFtRDtFQUNqREQsUUFBQUEsb0JBQW9CLEdBQUcsS0FBS0csY0FBTCxDQUNyQixLQUFLWCxTQUFMLENBQWVTLENBQWYsQ0FEcUIsRUFFckJELG9CQUZxQixFQUdyQkQsZUFIcUIsQ0FBdkI7O0VBS0EsWUFBSUMsb0JBQW9CLEtBQUssQ0FBQyxDQUE5QixFQUFpQztFQUFFLGlCQUFPLEtBQVA7RUFBZTtFQUNuRDs7RUFDRCxhQUFPLElBQVA7RUFDRDtFQW5CSDtFQUFBO0VBQUEsNEJBcUJVSSxhQXJCVixFQXFCeUI7RUFDckIsVUFDRSxDQUFDQSxhQUFELElBQ0EsT0FBT0EsYUFBUCxLQUF5QixRQUF6QixJQUNBLFFBQU9BLGFBQVAsTUFBeUIsUUFIM0IsRUFJRTtFQUFFLGVBQU8sS0FBUDtFQUFlOztFQUVuQixVQUFJLE9BQU9BLGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7RUFDckNBLFFBQUFBLGFBQWEsR0FBRyxJQUFJZixRQUFKLENBQWFlLGFBQWIsQ0FBaEI7RUFDRDs7RUFFRCxVQUFJLEtBQUtaLFNBQUwsQ0FBZVUsTUFBZixLQUEwQkUsYUFBYSxDQUFDWixTQUFkLENBQXdCVSxNQUF0RCxFQUE4RDtFQUM1RCxlQUFPLEtBQVA7RUFDRDs7RUFDRCxXQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1QsU0FBTCxDQUFlVSxNQUFuQyxFQUEyQ0QsQ0FBQyxJQUFJLENBQWhELEVBQW1EO0VBQ2pELFlBQUksS0FBS1QsU0FBTCxDQUFlUyxDQUFmLEVBQWtCQyxNQUFsQixLQUE2QkUsYUFBYSxDQUFDWixTQUFkLENBQXdCUyxDQUF4QixFQUEyQkMsTUFBNUQsRUFBb0U7RUFDbEUsaUJBQU8sS0FBUDtFQUNEO0VBQ0Y7O0VBRUQsV0FBSyxJQUFJRCxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLEtBQUtULFNBQUwsQ0FBZVUsTUFBbkMsRUFBMkNELEVBQUMsSUFBSSxDQUFoRCxFQUFtRDtFQUNqRCxZQUFNSSxRQUFRLEdBQVEsS0FBS2IsU0FBTCxDQUFlUyxFQUFmLENBQXRCOztFQUNBLFlBQU1LLGFBQWEsR0FBR0YsYUFBYSxDQUFDWixTQUFkLENBQXdCUyxFQUF4QixFQUEyQk0sS0FBM0IsQ0FBaUMsQ0FBakMsQ0FBdEI7O0VBRUEsYUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxRQUFRLENBQUNILE1BQTdCLEVBQXFDTSxDQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFDM0MsY0FBTUMsT0FBTyxHQUFHSixRQUFRLENBQUNHLENBQUQsQ0FBeEI7RUFDQSxjQUFNRSxLQUFLLEdBQUtKLGFBQWEsQ0FBQ0ssT0FBZCxDQUFzQkYsT0FBdEIsQ0FBaEI7O0VBRUEsY0FBSUMsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtFQUNkSixZQUFBQSxhQUFhLENBQUNNLE1BQWQsQ0FBcUJGLEtBQXJCLEVBQTRCLENBQTVCO0VBQ0Q7RUFDRjs7RUFDRCxZQUFJSixhQUFhLENBQUNKLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7RUFDOUIsaUJBQU8sS0FBUDtFQUNEO0VBQ0Y7O0VBRUQsYUFBTyxJQUFQO0VBQ0Q7RUEzREg7RUFBQTtFQUFBLG1DQTZEaUJHLFFBN0RqQixFQTZEMkJMLG9CQTdEM0IsRUE2RGlERCxlQTdEakQsRUE2RGtFO0VBQzlETSxNQUFBQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsS0FBVCxDQUFlLENBQWYsQ0FBWDtFQUNBUixNQUFBQSxlQUFlLEdBQUdBLGVBQWUsQ0FBQ1EsS0FBaEIsQ0FBc0JQLG9CQUF0QixDQUFsQjtFQUVBLFVBQUlhLFFBQVEsR0FBR2Isb0JBQWY7O0VBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSSxRQUFRLENBQUNILE1BQTdCLEVBQXFDRCxDQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFFM0MsWUFBSVEsT0FBTyxHQUFHSixRQUFRLENBQUNKLENBQUQsQ0FBdEI7O0VBQ0EsWUFBSVEsT0FBTyxDQUFDLENBQUQsQ0FBUCxLQUFlLElBQW5CLEVBQXlCO0VBQ3ZCLGNBQU1LLGNBQWMsR0FBR0wsT0FBTyxDQUFDRixLQUFSLENBQWMsQ0FBZCxDQUF2Qjs7RUFDQSxjQUNFTyxjQUFjLEtBQUt6QixRQUFRLENBQUMwQixnQkFBNUIsSUFDQUQsY0FBYyxLQUFLekIsUUFBUSxDQUFDMkIsY0FGOUIsRUFHRTtFQUNBUCxZQUFBQSxPQUFPLEdBQUdLLGNBQVY7RUFDRDtFQUNGOztFQUVELFlBQU1KLEtBQUssR0FBR1gsZUFBZSxDQUFDWSxPQUFoQixDQUF3QkYsT0FBeEIsQ0FBZDs7RUFDQSxZQUFJQyxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCO0VBQ2RMLFVBQUFBLFFBQVEsQ0FBQ08sTUFBVCxDQUFnQlgsQ0FBaEIsRUFBbUIsQ0FBbkI7RUFDQUEsVUFBQUEsQ0FBQyxJQUFJLENBQUw7O0VBQ0EsY0FBSVMsS0FBSyxHQUFHRyxRQUFaLEVBQXNCO0VBQ3BCQSxZQUFBQSxRQUFRLEdBQUdILEtBQVg7RUFDRDs7RUFDRCxjQUFJTCxRQUFRLENBQUNILE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7RUFDekIsbUJBQU9XLFFBQVA7RUFDRDtFQUNGO0VBQ0Y7O0VBQ0QsYUFBTyxDQUFDLENBQVI7RUFDRDtFQTVGSDs7RUFBQTtFQUFBO0VBK0ZBeEIsUUFBUSxDQUFDMEIsZ0JBQVQsR0FBNEIsR0FBNUI7RUFDQTFCLFFBQVEsQ0FBQzJCLGNBQVQsR0FBNEIsR0FBNUI7O0VBRUEzQixRQUFRLENBQUNJLGFBQVQsR0FBeUIsVUFBU0gsV0FBVCxFQUFzQjtFQUM3QyxNQUFNMkIsWUFBWSxHQUFHNUIsUUFBUSxDQUFDNkIsU0FBVCxDQUFtQjVCLFdBQW5CLEVBQWdDRCxRQUFRLENBQUMwQixnQkFBekMsQ0FBckI7O0VBQ0EsTUFBTUksS0FBSyxHQUFVLEVBQXJCOztFQUVBLE9BQUssSUFBSWxCLENBQUMsR0FBRyxDQUFiLEVBQWlCQSxDQUFDLEdBQUdnQixZQUFZLENBQUNmLE1BQWxDLEVBQTBDRCxDQUFDLElBQUksQ0FBL0MsRUFBa0Q7RUFDaERrQixJQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVy9CLFFBQVEsQ0FBQzZCLFNBQVQsQ0FBbUJELFlBQVksQ0FBQ2hCLENBQUQsQ0FBL0IsRUFBb0NaLFFBQVEsQ0FBQzJCLGNBQTdDLENBQVg7RUFDRDs7RUFDRCxTQUFPRyxLQUFQO0VBQ0QsQ0FSRDs7RUFVQTlCLFFBQVEsQ0FBQzZCLFNBQVQsR0FBcUIsVUFBU0csR0FBVCxFQUFjQyxXQUFkLEVBQTJCO0VBQzlDLE1BQU1DLENBQUMsR0FBSUYsR0FBWDtFQUNBLE1BQU1HLENBQUMsR0FBSUYsV0FBWDtFQUNBLE1BQUlHLENBQUMsR0FBSSxFQUFUO0VBQ0EsTUFBTUMsRUFBRSxHQUFHLEVBQVg7O0VBRUEsT0FBSyxJQUFJQyxFQUFFLEdBQUcsQ0FBZCxFQUFpQkEsRUFBRSxHQUFHSixDQUFDLENBQUNyQixNQUF4QixFQUFnQ3lCLEVBQUUsSUFBSSxDQUF0QyxFQUF5QztFQUN2QyxRQUFJQSxFQUFFLEdBQUcsQ0FBTCxJQUFVSixDQUFDLENBQUNJLEVBQUQsQ0FBRCxLQUFVSCxDQUFwQixJQUF5QkQsQ0FBQyxDQUFDSSxFQUFFLEdBQUcsQ0FBTixDQUFELEtBQWMsSUFBM0MsRUFBaUQ7RUFDL0NELE1BQUFBLEVBQUUsQ0FBQ04sSUFBSCxDQUFRSyxDQUFDLENBQUNHLElBQUYsRUFBUjtFQUNBSCxNQUFBQSxDQUFDLEdBQUcsRUFBSjtFQUNBRSxNQUFBQSxFQUFFLElBQUksQ0FBTjtFQUNEOztFQUNERixJQUFBQSxDQUFDLElBQUlGLENBQUMsQ0FBQ0ksRUFBRCxDQUFOO0VBQ0Q7O0VBQ0QsTUFBSUYsQ0FBSixFQUFPO0VBQUVDLElBQUFBLEVBQUUsQ0FBQ04sSUFBSCxDQUFRSyxDQUFDLENBQUNHLElBQUYsRUFBUjtFQUFvQjs7RUFFN0IsU0FBT0YsRUFBUDtFQUNELENBakJEOztNQzFHYUcsTUFBYjtFQUNFLGtCQUFZQyxJQUFaLEVBQWtCO0VBQUE7O0VBQ2hCLFNBQUtDLFVBQUwsR0FBMkJELElBQTNCO0VBQ0EsU0FBS0UsZ0JBQUwsR0FBd0IsRUFBeEI7RUFDQSxTQUFLQyxXQUFMLEdBQTJCLEVBQTNCO0VBQ0EsU0FBS0MsY0FBTCxHQUEyQixFQUEzQjtFQUNBLFNBQUtDLE9BQUwsR0FBMkIsRUFBM0I7RUFDQSxTQUFLQyxhQUFMLEdBQTJCLEVBQTNCO0VBQ0EsU0FBS0MsT0FBTCxHQUEyQixFQUEzQjtFQUNEOztFQVRIO0VBQUE7RUFBQSxnQ0FXY0MsT0FYZCxFQVd1QjVDLFFBWHZCLEVBV2lDO0VBQzdCLFVBQUksT0FBT0EsUUFBUCxLQUFvQixRQUF4QixFQUFrQztFQUNoQ0EsUUFBQUEsUUFBUSxHQUFHLENBQUNBLFFBQUQsQ0FBWDtFQUNEOztFQUVELFdBQUt5QyxPQUFMLENBQWFHLE9BQWIsSUFBd0I1QyxRQUF4QjtFQUNEO0VBakJIO0VBQUE7RUFBQSw4QkFtQllKLFdBbkJaLEVBbUJ5QkksUUFuQnpCLEVBbUJtQztFQUMvQixVQUFJLE9BQU9BLFFBQVAsS0FBb0IsUUFBeEIsRUFBa0M7RUFDaENBLFFBQUFBLFFBQVEsR0FBRyxDQUFFQSxRQUFGLENBQVg7RUFDRDs7RUFFRCxVQUFJNkMsT0FBTyxHQUFHLElBQWQ7O0VBQ0EsVUFBSSxPQUFPN0MsUUFBUCxLQUFvQixVQUF4QixFQUFvQztFQUNsQzZDLFFBQUFBLE9BQU8sR0FBRzdDLFFBQVY7RUFDQUEsUUFBQUEsUUFBUSxHQUFHLElBQVg7RUFDRDs7RUFFRCxVQUFNOEMsS0FBSyxHQUFHO0VBQ1pDLFFBQUFBLFFBQVEsRUFBRyxJQUFJcEQsUUFBSixDQUFhQyxXQUFiLENBREM7RUFFWkksUUFBQUEsUUFBUSxFQUFHQSxRQUZDO0VBR1o2QyxRQUFBQSxPQUFPLEVBQUlBO0VBSEMsT0FBZDs7RUFNQSxXQUFLRixPQUFMLENBQWFqQixJQUFiLENBQWtCb0IsS0FBbEI7RUFDRDtFQXJDSDtFQUFBO0VBQUEsZ0NBdUNjL0IsT0F2Q2QsRUF1Q3VCO0VBQ25CLFVBQU1pQyxRQUFRLEdBQUcsRUFBakI7O0VBQ0EsV0FBSyxJQUFNSixPQUFYLElBQXNCLEtBQUtILE9BQTNCLEVBQW9DO0VBQ2xDLFlBQU16QixLQUFLLEdBQUcsS0FBS3lCLE9BQUwsQ0FBYUcsT0FBYixFQUFzQjNCLE9BQXRCLENBQThCRixPQUE5QixDQUFkOztFQUNBLFlBQUlDLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7RUFBRWdDLFVBQUFBLFFBQVEsQ0FBQ3RCLElBQVQsQ0FBY2tCLE9BQU8sR0FBQyxDQUF0QjtFQUEyQjtFQUM5Qzs7RUFDRCxhQUFPSSxRQUFQO0VBQ0Q7RUE5Q0g7RUFBQTtFQUFBLGdDQWdEY0osT0FoRGQsRUFnRHVCO0VBQ25CLGFBQU8sS0FBS0gsT0FBTCxDQUFhRyxPQUFiLEtBQXlCLEVBQWhDO0VBQ0Q7RUFsREg7RUFBQTtFQUFBLCtCQW9EYUEsT0FwRGIsRUFvRHNCO0VBQ2xCLFVBQUksT0FBT0EsT0FBUCxLQUFtQixRQUF2QixFQUFpQztFQUMvQixZQUFNSSxRQUFRLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkwsT0FBakIsQ0FBakI7O0VBQ0EsYUFBSyxJQUFJckMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lDLFFBQVEsQ0FBQ3hDLE1BQTdCLEVBQXFDRCxDQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFDM0MsZUFBSzJDLFVBQUwsQ0FBZ0JGLFFBQVEsQ0FBQ3pDLENBQUQsQ0FBeEI7RUFDRDs7RUFDRDtFQUNEOztFQUVELFdBQUttQyxhQUFMLENBQW1CaEIsSUFBbkIsQ0FBd0JrQixPQUF4QjtFQUNEO0VBOURIO0VBQUE7RUFBQSw2QkFnRVdBLE9BaEVYLEVBZ0VvQjtFQUNoQixVQUFJLE9BQU9BLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7RUFDL0IsWUFBTUksUUFBUSxHQUFHLEtBQUtDLFdBQUwsQ0FBaUJMLE9BQWpCLENBQWpCOztFQUNBLGFBQUssSUFBSXJDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5QyxRQUFRLENBQUN4QyxNQUE3QixFQUFxQ0QsQ0FBQyxJQUFJLENBQTFDLEVBQTZDO0VBQzNDLGVBQUs0QyxRQUFMLENBQWNILFFBQVEsQ0FBQ3pDLENBQUQsQ0FBdEI7RUFDRDs7RUFDRDtFQUNEOztFQUVELFdBQUsrQixnQkFBTCxDQUFzQjlCLE1BQXRCLEdBQStCLENBQS9CO0VBQ0EsVUFBTVIsUUFBUSxHQUFHLEtBQUtvRCxXQUFMLENBQWlCUixPQUFqQixDQUFqQjs7RUFDQSxXQUFLLElBQUlyQyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHUCxRQUFRLENBQUNRLE1BQTdCLEVBQXFDRCxFQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFDM0MsYUFBSytCLGdCQUFMLENBQXNCWixJQUF0QixDQUEyQjFCLFFBQVEsQ0FBQ08sRUFBRCxDQUFuQzs7RUFDQSxZQUFJLEtBQUtnQyxXQUFMLENBQWlCdEIsT0FBakIsQ0FBeUJqQixRQUFRLENBQUNPLEVBQUQsQ0FBakMsTUFBMEMsQ0FBQyxDQUEvQyxFQUFrRDtFQUNoRCxlQUFLZ0MsV0FBTCxDQUFpQmIsSUFBakIsQ0FBc0IxQixRQUFRLENBQUNPLEVBQUQsQ0FBOUI7RUFDRDtFQUNGOztFQUVELFdBQUs4QyxZQUFMO0VBQ0Q7RUFuRkg7RUFBQTtFQUFBLCtCQXFGYVQsT0FyRmIsRUFxRnNCO0VBQ2xCLFVBQUksT0FBT0EsT0FBUCxLQUFtQixRQUF2QixFQUFpQztFQUMvQixZQUFNSSxRQUFRLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkwsT0FBakIsQ0FBakI7O0VBQ0EsYUFBSyxJQUFJckMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lDLFFBQVEsQ0FBQ3hDLE1BQTdCLEVBQXFDRCxDQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFDM0MsZUFBSytDLFVBQUwsQ0FBZ0JOLFFBQVEsQ0FBQ3pDLENBQUQsQ0FBeEI7RUFDRDtFQUVGLE9BTkQsTUFNTztFQUNMLFlBQU1QLFFBQVEsR0FBVyxLQUFLb0QsV0FBTCxDQUFpQlIsT0FBakIsQ0FBekI7O0VBQ0EsWUFBTVcsZ0JBQWdCLEdBQUcsS0FBS2IsYUFBTCxDQUFtQnpCLE9BQW5CLENBQTJCMkIsT0FBM0IsQ0FBekI7O0VBRUEsWUFBSVcsZ0JBQWdCLEtBQUssQ0FBQyxDQUExQixFQUE2QjtFQUMzQixlQUFLaEIsV0FBTCxDQUFpQi9CLE1BQWpCLEdBQTBCLENBQTFCO0VBQ0QsU0FGRCxNQUVPO0VBQ0wsZUFBSyxJQUFJRCxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHUCxRQUFRLENBQUNRLE1BQTdCLEVBQXFDRCxHQUFDLElBQUksQ0FBMUMsRUFBNkM7RUFDM0MsZ0JBQU1TLEtBQUssR0FBRyxLQUFLdUIsV0FBTCxDQUFpQnRCLE9BQWpCLENBQXlCakIsUUFBUSxDQUFDTyxHQUFELENBQWpDLENBQWQ7O0VBQ0EsZ0JBQUlTLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7RUFDZCxtQkFBS3VCLFdBQUwsQ0FBaUJyQixNQUFqQixDQUF3QkYsS0FBeEIsRUFBK0IsQ0FBL0I7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQsYUFBS3NCLGdCQUFMLENBQXNCOUIsTUFBdEIsR0FBK0IsQ0FBL0I7O0VBQ0EsYUFBS2dELFlBQUw7RUFDRDtFQUNGO0VBOUdIO0VBQUE7RUFBQSxtQ0FnSGlCO0VBQ2IsVUFBTUMsTUFBTSxHQUFHLEtBQUtkLE9BQUwsQ0FBYTlCLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBZjs7RUFDQSxXQUFLLElBQUlOLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdrRCxNQUFNLENBQUNqRCxNQUEzQixFQUFtQ0QsQ0FBQyxJQUFJLENBQXhDLEVBQTJDO0VBQ3pDLFlBQU11QyxLQUFLLEdBQUdXLE1BQU0sQ0FBQ2xELENBQUQsQ0FBcEI7O0VBQ0EsWUFBSXVDLEtBQUssQ0FBQ0MsUUFBTixDQUFlVyxLQUFmLENBQXFCLEtBQUtuQixXQUExQixDQUFKLEVBQTRDO0VBQzFDLGNBQUlPLEtBQUssQ0FBQ0QsT0FBVixFQUFtQjtFQUNqQkMsWUFBQUEsS0FBSyxDQUFDOUMsUUFBTixHQUFpQjhDLEtBQUssQ0FBQ0QsT0FBTixDQUFjLEtBQUtOLFdBQW5CLENBQWpCO0VBQ0Q7O0VBQ0QsZUFBSyxJQUFJekIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2dDLEtBQUssQ0FBQzlDLFFBQU4sQ0FBZVEsTUFBbkMsRUFBMkNNLENBQUMsSUFBSSxDQUFoRCxFQUFtRDtFQUNqRCxnQkFBSSxLQUFLeUIsV0FBTCxDQUFpQnRCLE9BQWpCLENBQXlCNkIsS0FBSyxDQUFDOUMsUUFBTixDQUFlYyxDQUFmLENBQXpCLE1BQWdELENBQUMsQ0FBckQsRUFBd0Q7RUFDdEQsbUJBQUt5QixXQUFMLENBQWlCYixJQUFqQixDQUFzQm9CLEtBQUssQ0FBQzlDLFFBQU4sQ0FBZWMsQ0FBZixDQUF0QjtFQUNEO0VBQ0Y7O0VBQ0QsZUFBSzBCLGNBQUwsQ0FBb0JkLElBQXBCLENBQXlCb0IsS0FBekI7RUFDRDtFQUNGO0VBQ0Y7RUFoSUg7RUFBQTtFQUFBLG1DQWtJaUI7RUFDYixXQUFLLElBQUl2QyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtpQyxjQUFMLENBQW9CaEMsTUFBeEMsRUFBZ0RELENBQUMsSUFBSSxDQUFyRCxFQUF3RDtFQUN0RCxZQUFNdUMsS0FBSyxHQUFHLEtBQUtOLGNBQUwsQ0FBb0JqQyxDQUFwQixDQUFkOztFQUNBLFlBQUksQ0FBQ3VDLEtBQUssQ0FBQ0MsUUFBTixDQUFlVyxLQUFmLENBQXFCLEtBQUtuQixXQUExQixDQUFMLEVBQTZDO0VBQzNDLGVBQUssSUFBSXpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdnQyxLQUFLLENBQUM5QyxRQUFOLENBQWVRLE1BQW5DLEVBQTJDTSxDQUFDLElBQUksQ0FBaEQsRUFBbUQ7RUFDakQsZ0JBQU1FLEtBQUssR0FBRyxLQUFLdUIsV0FBTCxDQUFpQnRCLE9BQWpCLENBQXlCNkIsS0FBSyxDQUFDOUMsUUFBTixDQUFlYyxDQUFmLENBQXpCLENBQWQ7O0VBQ0EsZ0JBQUlFLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7RUFDZCxtQkFBS3VCLFdBQUwsQ0FBaUJyQixNQUFqQixDQUF3QkYsS0FBeEIsRUFBK0IsQ0FBL0I7RUFDRDtFQUNGOztFQUNELGNBQUk4QixLQUFLLENBQUNELE9BQVYsRUFBbUI7RUFDakJDLFlBQUFBLEtBQUssQ0FBQzlDLFFBQU4sR0FBaUIsSUFBakI7RUFDRDs7RUFDRCxlQUFLd0MsY0FBTCxDQUFvQnRCLE1BQXBCLENBQTJCWCxDQUEzQixFQUE4QixDQUE5Qjs7RUFDQUEsVUFBQUEsQ0FBQyxJQUFJLENBQUw7RUFDRDtFQUNGO0VBQ0Y7RUFuSkg7O0VBQUE7RUFBQTs7TUNDYW9ELFFBQWI7RUFDRSxvQkFBWUMsWUFBWixFQUEwQkMsYUFBMUIsRUFBeUNDLGNBQXpDLEVBQXlEQyxlQUF6RCxFQUEwRTtFQUFBOztFQUN4RSxTQUFLQyxPQUFMLEdBQTZCLElBQTdCO0VBQ0EsU0FBS0MsZUFBTCxHQUE2QixFQUE3QjtFQUNBLFNBQUtDLFNBQUwsR0FBNkIsRUFBN0I7RUFDQSxTQUFLQyxVQUFMLEdBQTZCLEVBQTdCO0VBQ0EsU0FBS0MsaUJBQUwsR0FBNkIsRUFBN0I7RUFDQSxTQUFLQyxRQUFMLEdBQTZCLEVBQTdCO0VBQ0EsU0FBS0MsY0FBTCxHQUE2QixJQUE3QjtFQUNBLFNBQUtDLGFBQUwsR0FBNkIsSUFBN0I7RUFDQSxTQUFLQyxlQUFMLEdBQTZCLEVBQTdCO0VBQ0EsU0FBS0MsZ0JBQUwsR0FBNkIsRUFBN0I7RUFDQSxTQUFLQyxnQkFBTCxHQUE2QixLQUE3QjtFQUNBLFNBQUtDLHFCQUFMLEdBQTZCLElBQTdCO0VBQ0EsU0FBS0MsbUJBQUwsR0FBNkIsSUFBN0I7RUFDQSxTQUFLQyxtQkFBTCxHQUE2QixJQUE3QjtFQUNBLFNBQUtDLE9BQUwsR0FBNkIsS0FBN0I7RUFFQSxTQUFLWixTQUFMLENBQWVhLE1BQWYsR0FBd0I7RUFDdEJDLE1BQUFBLFNBQVMsRUFBRSxLQUFLYixVQURNO0VBRXRCUCxNQUFBQSxZQUFZLEVBQVpBLFlBRnNCO0VBR3RCQyxNQUFBQSxhQUFhLEVBQWJBLGFBSHNCO0VBSXRCQyxNQUFBQSxjQUFjLEVBQWRBLGNBSnNCO0VBS3RCQyxNQUFBQSxlQUFlLEVBQWZBO0VBTHNCLEtBQXhCO0VBUUEsU0FBS2tCLFVBQUwsQ0FBZ0IsUUFBaEI7RUFDRDs7RUEzQkg7RUFBQTtFQUFBLDhCQTZCWTVDLFVBN0JaLEVBNkJ3QjZDLGFBN0J4QixFQTZCdUM7RUFDbkMsVUFBSUMsTUFBTSxHQUFHLElBQWI7O0VBQ0EsVUFBSSxPQUFPOUMsVUFBUCxLQUFzQixRQUExQixFQUFvQztFQUVsQyxZQUFJNkMsYUFBSixFQUFtQjtFQUNqQkMsVUFBQUEsTUFBTSxHQUFHLElBQUloRCxNQUFKLENBQVdFLFVBQVgsQ0FBVDtFQUNBNkMsVUFBQUEsYUFBYSxDQUFDQyxNQUFELEVBQVMsS0FBS1gsZUFBZCxFQUErQixLQUFLQyxnQkFBcEMsQ0FBYjtFQUNELFNBSEQsTUFHTztFQUNMVSxVQUFBQSxNQUFNLEdBQUcsS0FBS2QsUUFBTCxDQUFjaEMsVUFBZCxLQUE2QixJQUF0QztFQUNEO0VBQ0YsT0FSRCxNQVFPO0VBQ0w4QyxRQUFBQSxNQUFNLEdBQU85QyxVQUFiO0VBQ0FBLFFBQUFBLFVBQVUsR0FBRzhDLE1BQU0sQ0FBQ0MsV0FBcEI7RUFDRDs7RUFFRCxXQUFLcEIsT0FBTCxHQUE0Qm1CLE1BQTVCO0VBQ0EsV0FBS2QsUUFBTCxDQUFjaEMsVUFBZCxJQUE0QjhDLE1BQTVCOztFQUNBLFVBQUlBLE1BQUosRUFBWTtFQUNWLGFBQUtuQixPQUFMLENBQWF6QixXQUFiLEdBQTJCNEMsTUFBTSxDQUFDNUMsV0FBbEM7RUFDRDs7RUFFRCxhQUFPLElBQVA7RUFDRDtFQW5ESDtFQUFBO0VBQUEsOEJBcURZOEMsU0FyRFosRUFxRHVCO0VBQ25CQSxNQUFBQSxTQUFTLEtBQUtBLFNBQVMsR0FBRyxLQUFLckIsT0FBTCxDQUFhM0IsVUFBOUIsQ0FBVDtFQUNBLGFBQU8sS0FBS2dDLFFBQUwsQ0FBY2dCLFNBQWQsS0FBNEIsSUFBbkM7RUFDRDtFQXhESDtFQUFBO0VBQUEseUJBMERPekYsV0ExRFAsRUEwRG9CMEYsWUExRHBCLEVBMERrQ0MsY0ExRGxDLEVBMERrREMsc0JBMURsRCxFQTBEMEU7RUFDdEUsVUFBSTVGLFdBQVcsS0FBSyxJQUFoQixJQUF3QixPQUFPQSxXQUFQLEtBQXVCLFVBQW5ELEVBQStEO0VBQzdENEYsUUFBQUEsc0JBQXNCLEdBQUdELGNBQXpCO0VBQ0FBLFFBQUFBLGNBQWMsR0FBV0QsWUFBekI7RUFDQUEsUUFBQUEsWUFBWSxHQUFhMUYsV0FBekI7RUFDQUEsUUFBQUEsV0FBVyxHQUFjLElBQXpCO0VBQ0Q7O0VBRUQsVUFDRUEsV0FBVyxJQUNYLFFBQU9BLFdBQVAsTUFBdUIsUUFEdkIsSUFFQSxPQUFPQSxXQUFXLENBQUNZLE1BQW5CLEtBQThCLFFBSGhDLEVBSUU7RUFDQSxhQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdYLFdBQVcsQ0FBQ1ksTUFBaEMsRUFBd0NELENBQUMsSUFBSSxDQUE3QyxFQUFnRDtFQUM5QyxlQUFLa0YsSUFBTCxDQUFVN0YsV0FBVyxDQUFDVyxDQUFELENBQXJCLEVBQTBCK0UsWUFBMUIsRUFBd0NDLGNBQXhDO0VBQ0Q7O0VBQ0QsZUFBTyxJQUFQO0VBQ0Q7O0VBRUQsV0FBS3BCLFVBQUwsQ0FBZ0J6QyxJQUFoQixDQUFxQjtFQUNuQnFCLFFBQUFBLFFBQVEsRUFBZ0JuRCxXQUFXLEdBQUcsSUFBSUQsUUFBSixDQUFhQyxXQUFiLENBQUgsR0FBK0IsSUFEL0M7RUFFbkIwRixRQUFBQSxZQUFZLEVBQVlBLFlBQVksSUFBYyxJQUYvQjtFQUduQkMsUUFBQUEsY0FBYyxFQUFVQSxjQUFjLElBQVksSUFIL0I7RUFJbkJHLFFBQUFBLGFBQWEsRUFBV0Ysc0JBQXNCLElBQUksS0FKL0I7RUFLbkJBLFFBQUFBLHNCQUFzQixFQUFFQSxzQkFBc0IsSUFBSSxLQUwvQjtFQU1uQkcsUUFBQUEsZ0JBQWdCLEVBQVE7RUFOTCxPQUFyQjs7RUFTQSxhQUFPLElBQVA7RUFDRDtFQXZGSDtFQUFBO0VBQUEsZ0NBeUZjL0YsV0F6RmQsRUF5RjJCMEYsWUF6RjNCLEVBeUZ5Q0MsY0F6RnpDLEVBeUZ5REMsc0JBekZ6RCxFQXlGaUY7RUFDN0UsYUFBTyxLQUFLQyxJQUFMLENBQVU3RixXQUFWLEVBQXVCMEYsWUFBdkIsRUFBcUNDLGNBQXJDLEVBQXFEQyxzQkFBckQsQ0FBUDtFQUNEO0VBM0ZIO0VBQUE7RUFBQSx1QkE2Rks1RixXQTdGTCxFQTZGa0IwRixZQTdGbEIsRUE2RmdDQyxjQTdGaEMsRUE2RmdEQyxzQkE3RmhELEVBNkZ3RTtFQUNwRSxhQUFPLEtBQUtDLElBQUwsQ0FBVTdGLFdBQVYsRUFBdUIwRixZQUF2QixFQUFxQ0MsY0FBckMsRUFBcURDLHNCQUFyRCxDQUFQO0VBQ0Q7RUEvRkg7RUFBQTtFQUFBLDhCQWlHWTVGLFdBakdaLEVBaUd5QjBGLFlBakd6QixFQWlHdUNFLHNCQWpHdkMsRUFpRytEO0VBQzNELGFBQU8sS0FBS0MsSUFBTCxDQUFVN0YsV0FBVixFQUF1QjBGLFlBQXZCLEVBQXFDLElBQXJDLEVBQTJDRSxzQkFBM0MsQ0FBUDtFQUNEO0VBbkdIO0VBQUE7RUFBQSxnQ0FxR2M1RixXQXJHZCxFQXFHMkIyRixjQXJHM0IsRUFxRzJDO0VBQ3ZDLGFBQU8sS0FBS0UsSUFBTCxDQUFVN0YsV0FBVixFQUF1QixJQUF2QixFQUE2QjJGLGNBQTdCLEVBQTZDQyxzQkFBN0MsQ0FBUDtFQUNEO0VBdkdIO0VBQUE7RUFBQSwyQkF5R1M1RixXQXpHVCxFQXlHc0IwRixZQXpHdEIsRUF5R29DQyxjQXpHcEMsRUF5R29EO0VBQ2hELFVBQUkzRixXQUFXLEtBQUssSUFBaEIsSUFBd0IsT0FBT0EsV0FBUCxLQUF1QixVQUFuRCxFQUErRDtFQUM3RDJGLFFBQUFBLGNBQWMsR0FBR0QsWUFBakI7RUFDQUEsUUFBQUEsWUFBWSxHQUFLMUYsV0FBakI7RUFDQUEsUUFBQUEsV0FBVyxHQUFHLElBQWQ7RUFDRDs7RUFFRCxVQUNFQSxXQUFXLElBQ1gsUUFBT0EsV0FBUCxNQUF1QixRQUR2QixJQUVBLE9BQU9BLFdBQVcsQ0FBQ1ksTUFBbkIsS0FBOEIsUUFIaEMsRUFJRTtFQUNBLGFBQUssSUFBSUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1gsV0FBVyxDQUFDWSxNQUFoQyxFQUF3Q0QsQ0FBQyxJQUFJLENBQTdDLEVBQWdEO0VBQzlDLGVBQUtxRixNQUFMLENBQVloRyxXQUFXLENBQUNXLENBQUQsQ0FBdkIsRUFBNEIrRSxZQUE1QixFQUEwQ0MsY0FBMUM7RUFDRDs7RUFDRCxlQUFPLElBQVA7RUFDRDs7RUFFRCxXQUFLLElBQUloRixFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLEtBQUs0RCxVQUFMLENBQWdCM0QsTUFBcEMsRUFBNENELEVBQUMsSUFBSSxDQUFqRCxFQUFvRDtFQUNsRCxZQUFNc0YsUUFBUSxHQUFHLEtBQUsxQixVQUFMLENBQWdCNUQsRUFBaEIsQ0FBakI7RUFFQSxZQUFNdUYsWUFBWSxHQUFZLENBQUNsRyxXQUFELElBQWdCLENBQUNpRyxRQUFRLENBQUM5QyxRQUExQixJQUNGOEMsUUFBUSxDQUFDOUMsUUFBVCxJQUFxQjhDLFFBQVEsQ0FBQzlDLFFBQVQsQ0FBa0JnRCxPQUFsQixDQUEwQm5HLFdBQTFCLENBRGpEO0VBRUEsWUFBTW9HLG1CQUFtQixHQUFLLENBQUNWLFlBQUQsSUFBaUIsQ0FBQ0MsY0FBbEIsSUFDRixDQUFDRCxZQUFELElBQWlCLENBQUNPLFFBQVEsQ0FBQ1AsWUFEekIsSUFFRkEsWUFBWSxLQUFLTyxRQUFRLENBQUNQLFlBRnREO0VBR0EsWUFBTVcscUJBQXFCLEdBQUcsQ0FBQ1gsWUFBRCxJQUFpQixDQUFDQyxjQUFsQixJQUNGLENBQUNBLGNBQUQsSUFBbUIsQ0FBQ00sUUFBUSxDQUFDTixjQUQzQixJQUVGQSxjQUFjLEtBQUtNLFFBQVEsQ0FBQ04sY0FGeEQ7O0VBSUEsWUFBSU8sWUFBWSxJQUFJRSxtQkFBaEIsSUFBdUNDLHFCQUEzQyxFQUFrRTtFQUNoRSxlQUFLOUIsVUFBTCxDQUFnQmpELE1BQWhCLENBQXVCWCxFQUF2QixFQUEwQixDQUExQjs7RUFDQUEsVUFBQUEsRUFBQyxJQUFJLENBQUw7RUFDRDtFQUNGOztFQUVELGFBQU8sSUFBUDtFQUNEO0VBOUlIO0VBQUE7RUFBQSxtQ0FnSmlCWCxXQWhKakIsRUFnSjhCMEYsWUFoSjlCLEVBZ0o0Q0MsY0FoSjVDLEVBZ0o0RDtFQUN4RCxhQUFPLEtBQUtLLE1BQUwsQ0FBWWhHLFdBQVosRUFBeUIwRixZQUF6QixFQUF1Q0MsY0FBdkMsQ0FBUDtFQUNEO0VBbEpIO0VBQUE7RUFBQSx3QkFvSk0zRixXQXBKTixFQW9KbUIwRixZQXBKbkIsRUFvSmlDQyxjQXBKakMsRUFvSmlEO0VBQzdDLGFBQU8sS0FBS0ssTUFBTCxDQUFZaEcsV0FBWixFQUF5QjBGLFlBQXpCLEVBQXVDQyxjQUF2QyxDQUFQO0VBQ0Q7RUF0Skg7RUFBQTtFQUFBLCtCQXdKYVcsV0F4SmIsRUF3SjBCO0VBQ3RCLFVBQUcsS0FBS2xDLE9BQVIsRUFBaUI7RUFBRSxhQUFLbUMsY0FBTDtFQUF3Qjs7RUFFM0MsVUFBSSxDQUFDLEtBQUtqQyxTQUFMLENBQWVnQyxXQUFmLENBQUwsRUFBa0M7RUFDaEMsWUFBTUUsYUFBYSxHQUFHLEtBQUtsQyxTQUFMLENBQWVhLE1BQXJDO0VBQ0EsYUFBS2IsU0FBTCxDQUFlZ0MsV0FBZixJQUE4QjtFQUM1QmxCLFVBQUFBLFNBQVMsRUFBUSxFQURXO0VBRTVCcEIsVUFBQUEsWUFBWSxFQUFLd0MsYUFBYSxDQUFDeEMsWUFGSDtFQUc1QkMsVUFBQUEsYUFBYSxFQUFJdUMsYUFBYSxDQUFDdkMsYUFISDtFQUk1QkMsVUFBQUEsY0FBYyxFQUFHc0MsYUFBYSxDQUFDdEMsY0FKSDtFQUs1QkMsVUFBQUEsZUFBZSxFQUFFcUMsYUFBYSxDQUFDckM7RUFMSCxTQUE5QjtFQU9EOztFQUVELFVBQU1zQyxPQUFPLEdBQVUsS0FBS25DLFNBQUwsQ0FBZWdDLFdBQWYsQ0FBdkI7RUFDQSxXQUFLakMsZUFBTCxHQUF1QmlDLFdBQXZCO0VBQ0EsV0FBSy9CLFVBQUwsR0FBdUJrQyxPQUFPLENBQUNyQixTQUEvQjtFQUVBLFdBQUtzQixJQUFMO0VBQ0EsV0FBS0MsS0FBTCxDQUNFRixPQUFPLENBQUN6QyxZQURWLEVBRUV5QyxPQUFPLENBQUN4QyxhQUZWLEVBR0V3QyxPQUFPLENBQUN2QyxjQUhWLEVBSUV1QyxPQUFPLENBQUN0QyxlQUpWO0VBT0EsYUFBTyxJQUFQO0VBQ0Q7RUFuTEg7RUFBQTtFQUFBLGlDQXFMZTtFQUNYLGFBQU8sS0FBS0UsZUFBWjtFQUNEO0VBdkxIO0VBQUE7RUFBQSxnQ0F5TGNpQyxXQXpMZCxFQXlMMkJNLFFBekwzQixFQXlMcUM7RUFDakMsVUFBTUMsbUJBQW1CLEdBQUcsS0FBS0MsVUFBTCxFQUE1QjtFQUNBLFdBQUt6QixVQUFMLENBQWdCaUIsV0FBaEI7RUFFQU0sTUFBQUEsUUFBUTtFQUVSLFdBQUt2QixVQUFMLENBQWdCd0IsbUJBQWhCO0VBRUEsYUFBTyxJQUFQO0VBQ0Q7RUFsTUg7RUFBQTtFQUFBLDBCQW9NUTdDLFlBcE1SLEVBb01zQkMsYUFwTXRCLEVBb01xQ0MsY0FwTXJDLEVBb01xREMsZUFwTXJELEVBb01zRTtFQUFBOztFQUNsRSxXQUFLdUMsSUFBTDtFQUVBLFVBQU1LLEdBQUcsR0FBRyxPQUFPQyxVQUFQLEtBQXNCLFdBQXRCLEdBQW9DQSxVQUFwQyxHQUNBLE9BQU83QixNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxHQUNBLE9BQU84QixNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxHQUNBLEVBSFo7O0VBS0EsVUFBSSxDQUFDakQsWUFBTCxFQUFtQjtFQUNqQixZQUFJLENBQUMrQyxHQUFHLENBQUNHLGdCQUFMLElBQXlCLENBQUNILEdBQUcsQ0FBQ0ksV0FBbEMsRUFBK0M7RUFDN0MsZ0JBQU0sSUFBSUMsS0FBSixDQUFVLCtEQUFWLENBQU47RUFDRDs7RUFDRHBELFFBQUFBLFlBQVksR0FBRytDLEdBQWY7RUFDRCxPQWJpRTs7O0VBZ0JsRSxVQUFJLE9BQU8vQyxZQUFZLENBQUNxRCxRQUFwQixLQUFpQyxRQUFyQyxFQUErQztFQUM3Q2xELFFBQUFBLGVBQWUsR0FBR0QsY0FBbEI7RUFDQUEsUUFBQUEsY0FBYyxHQUFJRCxhQUFsQjtFQUNBQSxRQUFBQSxhQUFhLEdBQUtELFlBQWxCO0VBQ0FBLFFBQUFBLFlBQVksR0FBTStDLEdBQWxCO0VBQ0Q7O0VBRUQsVUFBSSxDQUFDL0MsWUFBWSxDQUFDa0QsZ0JBQWQsSUFBa0MsQ0FBQ2xELFlBQVksQ0FBQ21ELFdBQXBELEVBQWlFO0VBQy9ELGNBQU0sSUFBSUMsS0FBSixDQUFVLHNFQUFWLENBQU47RUFDRDs7RUFFRCxXQUFLdEMsZ0JBQUwsR0FBd0IsQ0FBQyxDQUFDZCxZQUFZLENBQUNrRCxnQkFBdkM7RUFFQSxVQUFNSSxTQUFTLEdBQUd0RCxZQUFZLENBQUN1RCxTQUFiLElBQTBCdkQsWUFBWSxDQUFDdUQsU0FBYixDQUF1QkQsU0FBakQsSUFBOEQsRUFBaEY7RUFDQSxVQUFNRSxRQUFRLEdBQUl4RCxZQUFZLENBQUN1RCxTQUFiLElBQTBCdkQsWUFBWSxDQUFDdUQsU0FBYixDQUF1QkMsUUFBakQsSUFBOEQsRUFBaEY7RUFFQXZELE1BQUFBLGFBQWEsSUFBTUEsYUFBYSxLQUFPLElBQXZDLEtBQWdEQSxhQUFhLEdBQUtELFlBQVksQ0FBQ3lELFFBQS9FO0VBQ0F2RCxNQUFBQSxjQUFjLElBQUtBLGNBQWMsS0FBTSxJQUF2QyxLQUFnREEsY0FBYyxHQUFJc0QsUUFBbEU7RUFDQXJELE1BQUFBLGVBQWUsSUFBSUEsZUFBZSxLQUFLLElBQXZDLEtBQWdEQSxlQUFlLEdBQUdtRCxTQUFsRTs7RUFFQSxXQUFLdkMscUJBQUwsR0FBNkIsVUFBQzJDLEtBQUQsRUFBVztFQUN0QyxRQUFBLEtBQUksQ0FBQ25FLFFBQUwsQ0FBY21FLEtBQUssQ0FBQzFFLE9BQXBCLEVBQTZCMEUsS0FBN0I7O0VBQ0EsUUFBQSxLQUFJLENBQUNDLGlCQUFMLENBQXVCRCxLQUF2QixFQUE4QkYsUUFBOUI7RUFDRCxPQUhEOztFQUlBLFdBQUt4QyxtQkFBTCxHQUEyQixVQUFDMEMsS0FBRCxFQUFXO0VBQ3BDLFFBQUEsS0FBSSxDQUFDaEUsVUFBTCxDQUFnQmdFLEtBQUssQ0FBQzFFLE9BQXRCLEVBQStCMEUsS0FBL0I7RUFDRCxPQUZEOztFQUdBLFdBQUt6QyxtQkFBTCxHQUEyQixVQUFDeUMsS0FBRCxFQUFXO0VBQ3BDLFFBQUEsS0FBSSxDQUFDbkIsY0FBTCxDQUFvQm1CLEtBQXBCO0VBQ0QsT0FGRDs7RUFJQSxXQUFLRSxVQUFMLENBQWdCM0QsYUFBaEIsRUFBK0IsU0FBL0IsRUFBMEMsS0FBS2MscUJBQS9DOztFQUNBLFdBQUs2QyxVQUFMLENBQWdCM0QsYUFBaEIsRUFBK0IsT0FBL0IsRUFBMEMsS0FBS2UsbUJBQS9DOztFQUNBLFdBQUs0QyxVQUFMLENBQWdCNUQsWUFBaEIsRUFBK0IsT0FBL0IsRUFBMEMsS0FBS2lCLG1CQUEvQzs7RUFDQSxXQUFLMkMsVUFBTCxDQUFnQjVELFlBQWhCLEVBQStCLE1BQS9CLEVBQTBDLEtBQUtpQixtQkFBL0M7O0VBRUEsV0FBS1AsY0FBTCxHQUF3QlQsYUFBeEI7RUFDQSxXQUFLVSxhQUFMLEdBQXdCWCxZQUF4QjtFQUNBLFdBQUtZLGVBQUwsR0FBd0JWLGNBQXhCO0VBQ0EsV0FBS1csZ0JBQUwsR0FBd0JWLGVBQXhCO0VBRUEsVUFBTTBELGNBQWMsR0FBYSxLQUFLdkQsU0FBTCxDQUFlLEtBQUtELGVBQXBCLENBQWpDO0VBQ0F3RCxNQUFBQSxjQUFjLENBQUM3RCxZQUFmLEdBQWlDLEtBQUtXLGFBQXRDO0VBQ0FrRCxNQUFBQSxjQUFjLENBQUM1RCxhQUFmLEdBQWlDLEtBQUtTLGNBQXRDO0VBQ0FtRCxNQUFBQSxjQUFjLENBQUMzRCxjQUFmLEdBQWlDLEtBQUtVLGVBQXRDO0VBQ0FpRCxNQUFBQSxjQUFjLENBQUMxRCxlQUFmLEdBQWlDLEtBQUtVLGdCQUF0QztFQUVBLGFBQU8sSUFBUDtFQUNEO0VBcFFIO0VBQUE7RUFBQSwyQkFzUVM7RUFDTCxVQUFJLENBQUMsS0FBS0gsY0FBTixJQUF3QixDQUFDLEtBQUtDLGFBQWxDLEVBQWlEO0VBQUU7RUFBUzs7RUFFNUQsV0FBS21ELFlBQUwsQ0FBa0IsS0FBS3BELGNBQXZCLEVBQXVDLFNBQXZDLEVBQWtELEtBQUtLLHFCQUF2RDs7RUFDQSxXQUFLK0MsWUFBTCxDQUFrQixLQUFLcEQsY0FBdkIsRUFBdUMsT0FBdkMsRUFBa0QsS0FBS00sbUJBQXZEOztFQUNBLFdBQUs4QyxZQUFMLENBQWtCLEtBQUtuRCxhQUF2QixFQUF1QyxPQUF2QyxFQUFrRCxLQUFLTSxtQkFBdkQ7O0VBQ0EsV0FBSzZDLFlBQUwsQ0FBa0IsS0FBS25ELGFBQXZCLEVBQXVDLE1BQXZDLEVBQWtELEtBQUtNLG1CQUF2RDs7RUFFQSxXQUFLTixhQUFMLEdBQXNCLElBQXRCO0VBQ0EsV0FBS0QsY0FBTCxHQUFzQixJQUF0QjtFQUVBLGFBQU8sSUFBUDtFQUNEO0VBbFJIO0VBQUE7RUFBQSw2QkFvUlcxQixPQXBSWCxFQW9Sb0IwRSxLQXBScEIsRUFvUjJCO0VBQ3ZCLFVBQUksS0FBS3hDLE9BQVQsRUFBa0I7RUFBRSxlQUFPLElBQVA7RUFBYzs7RUFDbEMsVUFBSSxDQUFDLEtBQUtkLE9BQVYsRUFBbUI7RUFBRSxjQUFNLElBQUlnRCxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtFQUFvQzs7RUFFekQsV0FBS2hELE9BQUwsQ0FBYWIsUUFBYixDQUFzQlAsT0FBdEI7O0VBQ0EsV0FBSytFLGNBQUwsQ0FBb0JMLEtBQXBCOztFQUVBLGFBQU8sSUFBUDtFQUNEO0VBNVJIO0VBQUE7RUFBQSwrQkE4UmExRSxPQTlSYixFQThSc0IwRSxLQTlSdEIsRUE4UjZCO0VBQ3pCLFVBQUksS0FBS3hDLE9BQVQsRUFBa0I7RUFBRSxlQUFPLElBQVA7RUFBYzs7RUFDbEMsVUFBSSxDQUFDLEtBQUtkLE9BQVYsRUFBbUI7RUFBRSxjQUFNLElBQUlnRCxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtFQUFvQzs7RUFFekQsV0FBS2hELE9BQUwsQ0FBYVYsVUFBYixDQUF3QlYsT0FBeEI7O0VBQ0EsV0FBS2dGLGNBQUwsQ0FBb0JOLEtBQXBCOztFQUVBLGFBQU8sSUFBUDtFQUNEO0VBdFNIO0VBQUE7RUFBQSxtQ0F3U2lCQSxLQXhTakIsRUF3U3dCO0VBQ3BCLFVBQUksS0FBS3hDLE9BQVQsRUFBa0I7RUFBRSxlQUFPLElBQVA7RUFBYzs7RUFDbEMsVUFBSSxDQUFDLEtBQUtkLE9BQVYsRUFBbUI7RUFBRSxjQUFNLElBQUlnRCxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtFQUFvQzs7RUFFekQsV0FBS2hELE9BQUwsQ0FBYXpCLFdBQWIsQ0FBeUIvQixNQUF6QixHQUFrQyxDQUFsQzs7RUFDQSxXQUFLb0gsY0FBTCxDQUFvQk4sS0FBcEI7O0VBRUEsYUFBTyxJQUFQO0VBQ0Q7RUFoVEg7RUFBQTtFQUFBLDRCQWtUVTtFQUNOLFVBQUksS0FBS3hDLE9BQVQsRUFBa0I7RUFBRSxlQUFPLElBQVA7RUFBYzs7RUFDbEMsVUFBSSxLQUFLZCxPQUFULEVBQWtCO0VBQUUsYUFBS21DLGNBQUw7RUFBd0I7O0VBQzVDLFdBQUtyQixPQUFMLEdBQWUsSUFBZjtFQUVBLGFBQU8sSUFBUDtFQUNEO0VBeFRIO0VBQUE7RUFBQSw2QkEwVFc7RUFDUCxXQUFLQSxPQUFMLEdBQWUsS0FBZjtFQUVBLGFBQU8sSUFBUDtFQUNEO0VBOVRIO0VBQUE7RUFBQSw0QkFnVVU7RUFDTixXQUFLcUIsY0FBTDtFQUNBLFdBQUtoQyxVQUFMLENBQWdCM0QsTUFBaEIsR0FBeUIsQ0FBekI7RUFFQSxhQUFPLElBQVA7RUFDRDtFQXJVSDtFQUFBO0VBQUEsK0JBdVVhcUQsYUF2VWIsRUF1VTRCZ0UsU0F2VTVCLEVBdVV1Q2hGLE9BdlV2QyxFQXVVZ0Q7RUFDNUMsYUFBTyxLQUFLNkIsZ0JBQUwsR0FDTGIsYUFBYSxDQUFDaUQsZ0JBQWQsQ0FBK0JlLFNBQS9CLEVBQTBDaEYsT0FBMUMsRUFBbUQsS0FBbkQsQ0FESyxHQUVMZ0IsYUFBYSxDQUFDa0QsV0FBZCxDQUEwQixPQUFPYyxTQUFqQyxFQUE0Q2hGLE9BQTVDLENBRkY7RUFHRDtFQTNVSDtFQUFBO0VBQUEsaUNBNlVlZ0IsYUE3VWYsRUE2VThCZ0UsU0E3VTlCLEVBNlV5Q2hGLE9BN1V6QyxFQTZVa0Q7RUFDOUMsYUFBTyxLQUFLNkIsZ0JBQUwsR0FDTGIsYUFBYSxDQUFDaUUsbUJBQWQsQ0FBa0NELFNBQWxDLEVBQTZDaEYsT0FBN0MsRUFBc0QsS0FBdEQsQ0FESyxHQUVMZ0IsYUFBYSxDQUFDa0UsV0FBZCxDQUEwQixPQUFPRixTQUFqQyxFQUE0Q2hGLE9BQTVDLENBRkY7RUFHRDtFQWpWSDtFQUFBO0VBQUEsMkNBbVZ5QjtFQUNyQixVQUFNbUYsY0FBYyxHQUFLLEVBQXpCO0VBQ0EsVUFBTUMsZ0JBQWdCLEdBQUcsRUFBekI7RUFFQSxVQUFJakQsU0FBUyxHQUFHLEtBQUtiLFVBQXJCOztFQUNBLFVBQUksS0FBS0YsZUFBTCxLQUF5QixRQUE3QixFQUF1QztFQUNyQ2UsUUFBQUEsU0FBUyxnQ0FBT0EsU0FBUCxzQkFBcUIsS0FBS2QsU0FBTCxDQUFlYSxNQUFmLENBQXNCQyxTQUEzQyxFQUFUO0VBQ0Q7O0VBRURBLE1BQUFBLFNBQVMsQ0FBQ2tELElBQVYsQ0FDRSxVQUFDQyxDQUFELEVBQUlDLENBQUo7RUFBQSxlQUNFLENBQUNBLENBQUMsQ0FBQ3JGLFFBQUYsR0FBYXFGLENBQUMsQ0FBQ3JGLFFBQUYsQ0FBVy9DLFFBQVgsQ0FBb0JRLE1BQWpDLEdBQTBDLENBQTNDLEtBQ0MySCxDQUFDLENBQUNwRixRQUFGLEdBQWFvRixDQUFDLENBQUNwRixRQUFGLENBQVcvQyxRQUFYLENBQW9CUSxNQUFqQyxHQUEwQyxDQUQzQyxDQURGO0VBQUEsT0FERixFQUlFNkgsT0FKRixDQUlVLFVBQUNDLENBQUQsRUFBTztFQUNmLFlBQUlDLFFBQVEsR0FBRyxDQUFDLENBQWhCOztFQUNBLGFBQUssSUFBSWhJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcwSCxnQkFBZ0IsQ0FBQ3pILE1BQXJDLEVBQTZDRCxDQUFDLElBQUksQ0FBbEQsRUFBcUQ7RUFDbkQsY0FBSTBILGdCQUFnQixDQUFDMUgsQ0FBRCxDQUFoQixLQUF3QixJQUF4QixJQUFnQytILENBQUMsQ0FBQ3ZGLFFBQUYsS0FBZSxJQUEvQyxJQUNBa0YsZ0JBQWdCLENBQUMxSCxDQUFELENBQWhCLEtBQXdCLElBQXhCLElBQWdDMEgsZ0JBQWdCLENBQUMxSCxDQUFELENBQWhCLENBQW9Cd0YsT0FBcEIsQ0FBNEJ1QyxDQUFDLENBQUN2RixRQUE5QixDQURwQyxFQUM2RTtFQUMzRXdGLFlBQUFBLFFBQVEsR0FBR2hJLENBQVg7RUFDRDtFQUNGOztFQUNELFlBQUlnSSxRQUFRLEtBQUssQ0FBQyxDQUFsQixFQUFxQjtFQUNuQkEsVUFBQUEsUUFBUSxHQUFHTixnQkFBZ0IsQ0FBQ3pILE1BQTVCO0VBQ0F5SCxVQUFBQSxnQkFBZ0IsQ0FBQ3ZHLElBQWpCLENBQXNCNEcsQ0FBQyxDQUFDdkYsUUFBeEI7RUFDRDs7RUFDRCxZQUFJLENBQUNpRixjQUFjLENBQUNPLFFBQUQsQ0FBbkIsRUFBK0I7RUFDN0JQLFVBQUFBLGNBQWMsQ0FBQ08sUUFBRCxDQUFkLEdBQTJCLEVBQTNCO0VBQ0Q7O0VBQ0RQLFFBQUFBLGNBQWMsQ0FBQ08sUUFBRCxDQUFkLENBQXlCN0csSUFBekIsQ0FBOEI0RyxDQUE5QjtFQUNELE9BcEJEO0VBc0JBLGFBQU9OLGNBQVA7RUFDRDtFQW5YSDtFQUFBO0VBQUEsbUNBcVhpQlYsS0FyWGpCLEVBcVh3QjtFQUFBOztFQUNwQixVQUFJNUIsYUFBYSxHQUFHLEtBQXBCO0VBRUE0QixNQUFBQSxLQUFLLEtBQUtBLEtBQUssR0FBRyxFQUFiLENBQUw7O0VBQ0FBLE1BQUFBLEtBQUssQ0FBQzVCLGFBQU4sR0FBc0IsWUFBTTtFQUFFQSxRQUFBQSxhQUFhLEdBQUcsSUFBaEI7RUFBdUIsT0FBckQ7O0VBQ0E0QixNQUFBQSxLQUFLLENBQUMvRSxXQUFOLEdBQXNCLEtBQUt5QixPQUFMLENBQWF6QixXQUFiLENBQXlCMUIsS0FBekIsQ0FBK0IsQ0FBL0IsQ0FBdEI7RUFFQSxVQUFNeUIsZ0JBQWdCLEdBQUcsS0FBSzBCLE9BQUwsQ0FBYTFCLGdCQUF0Qzs7RUFDQSxVQUFNQyxXQUFXLEdBQVEsS0FBS3lCLE9BQUwsQ0FBYXpCLFdBQWIsQ0FBeUIxQixLQUF6QixDQUErQixDQUEvQixDQUF6Qjs7RUFDQSxVQUFNbUgsY0FBYyxHQUFLLEtBQUtRLG9CQUFMLEVBQXpCOztFQVRvQixpQ0FXWGpJLENBWFc7RUFZbEIsWUFBTXlFLFNBQVMsR0FBR2dELGNBQWMsQ0FBQ3pILENBQUQsQ0FBaEM7RUFDQSxZQUFNd0MsUUFBUSxHQUFJaUMsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhakMsUUFBL0I7O0VBRUEsWUFDRUEsUUFBUSxLQUFLLElBQWIsSUFDQUEsUUFBUSxDQUFDVyxLQUFULENBQWVuQixXQUFmLEtBQ0FELGdCQUFnQixDQUFDbUcsSUFBakIsQ0FBc0IsVUFBQUMsQ0FBQztFQUFBLGlCQUFJM0YsUUFBUSxDQUFDL0MsUUFBVCxDQUFrQjJJLFFBQWxCLENBQTJCRCxDQUEzQixDQUFKO0VBQUEsU0FBdkIsQ0FIRixFQUlFO0VBQ0EsZUFBSyxJQUFJNUgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tFLFNBQVMsQ0FBQ3hFLE1BQTlCLEVBQXNDTSxDQUFDLElBQUksQ0FBM0MsRUFBOEM7RUFDNUMsZ0JBQUkrRSxRQUFRLEdBQUdiLFNBQVMsQ0FBQ2xFLENBQUQsQ0FBeEI7O0VBRUEsZ0JBQUksQ0FBQytFLFFBQVEsQ0FBQ0YsZ0JBQVYsSUFBOEJFLFFBQVEsQ0FBQ1AsWUFBdkMsSUFBdUQsQ0FBQ08sUUFBUSxDQUFDSCxhQUFyRSxFQUFvRjtFQUNsRkcsY0FBQUEsUUFBUSxDQUFDRixnQkFBVCxHQUE0QixJQUE1QjtFQUNBRSxjQUFBQSxRQUFRLENBQUNQLFlBQVQsQ0FBc0JzRCxJQUF0QixDQUEyQixNQUEzQixFQUFpQ3RCLEtBQWpDO0VBQ0F6QixjQUFBQSxRQUFRLENBQUNGLGdCQUFULEdBQTRCLEtBQTVCOztFQUVBLGtCQUFJRCxhQUFhLElBQUlHLFFBQVEsQ0FBQ0wsc0JBQTlCLEVBQXNEO0VBQ3BESyxnQkFBQUEsUUFBUSxDQUFDSCxhQUFULEdBQXlCLElBQXpCO0VBQ0FBLGdCQUFBQSxhQUFhLEdBQVksS0FBekI7RUFDRDtFQUNGOztFQUVELGdCQUFJLE1BQUksQ0FBQ3RCLGlCQUFMLENBQXVCbkQsT0FBdkIsQ0FBK0I0RSxRQUEvQixNQUE2QyxDQUFDLENBQWxELEVBQXFEO0VBQ25ELGNBQUEsTUFBSSxDQUFDekIsaUJBQUwsQ0FBdUIxQyxJQUF2QixDQUE0Qm1FLFFBQTVCO0VBQ0Q7RUFDRjs7RUFFRCxjQUFJOUMsUUFBSixFQUFjO0VBQ1osaUJBQUssSUFBSWpDLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUdpQyxRQUFRLENBQUMvQyxRQUFULENBQWtCUSxNQUF0QyxFQUE4Q00sRUFBQyxJQUFJLENBQW5ELEVBQXNEO0VBQ3BELGtCQUFNRSxLQUFLLEdBQUd1QixXQUFXLENBQUN0QixPQUFaLENBQW9COEIsUUFBUSxDQUFDL0MsUUFBVCxDQUFrQmMsRUFBbEIsQ0FBcEIsQ0FBZDs7RUFDQSxrQkFBSUUsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtFQUNoQnVCLGdCQUFBQSxXQUFXLENBQUNyQixNQUFaLENBQW1CRixLQUFuQixFQUEwQixDQUExQjtFQUNBRixnQkFBQUEsRUFBQyxJQUFJLENBQUw7RUFDRDtFQUNGO0VBQ0Y7RUFDRjtFQWhEaUI7O0VBV3BCLFdBQUssSUFBSVAsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lILGNBQWMsQ0FBQ3hILE1BQW5DLEVBQTJDRCxDQUFDLElBQUksQ0FBaEQsRUFBbUQ7RUFBQSxjQUExQ0EsQ0FBMEM7RUFzQ2xEO0VBQ0Y7RUF2YUg7RUFBQTtFQUFBLG1DQXlhaUIrRyxLQXphakIsRUF5YXdCO0VBQ3BCQSxNQUFBQSxLQUFLLEtBQUtBLEtBQUssR0FBRyxFQUFiLENBQUw7RUFDQUEsTUFBQUEsS0FBSyxDQUFDL0UsV0FBTixHQUFvQixLQUFLeUIsT0FBTCxDQUFhekIsV0FBYixDQUF5QjFCLEtBQXpCLENBQStCLENBQS9CLENBQXBCOztFQUVBLFdBQUssSUFBSU4sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLNkQsaUJBQUwsQ0FBdUI1RCxNQUEzQyxFQUFtREQsQ0FBQyxJQUFJLENBQXhELEVBQTJEO0VBQ3pELFlBQU1zRixRQUFRLEdBQUcsS0FBS3pCLGlCQUFMLENBQXVCN0QsQ0FBdkIsQ0FBakI7RUFDQSxZQUFNd0MsUUFBUSxHQUFHOEMsUUFBUSxDQUFDOUMsUUFBMUI7O0VBQ0EsWUFBSUEsUUFBUSxLQUFLLElBQWIsSUFBcUIsQ0FBQ0EsUUFBUSxDQUFDVyxLQUFULENBQWUsS0FBS00sT0FBTCxDQUFhekIsV0FBNUIsQ0FBMUIsRUFBb0U7RUFDbEVzRCxVQUFBQSxRQUFRLENBQUNILGFBQVQsR0FBeUIsS0FBekI7O0VBQ0EsY0FBSTNDLFFBQVEsS0FBSyxJQUFiLElBQXFCdUUsS0FBSyxDQUFDL0UsV0FBTixDQUFrQi9CLE1BQWxCLEtBQTZCLENBQXRELEVBQXlEO0VBQ3ZELGlCQUFLNEQsaUJBQUwsQ0FBdUJsRCxNQUF2QixDQUE4QlgsQ0FBOUIsRUFBaUMsQ0FBakM7O0VBQ0FBLFlBQUFBLENBQUMsSUFBSSxDQUFMO0VBQ0Q7O0VBQ0QsY0FBSSxDQUFDc0YsUUFBUSxDQUFDRixnQkFBVixJQUE4QkUsUUFBUSxDQUFDTixjQUEzQyxFQUEyRDtFQUN6RE0sWUFBQUEsUUFBUSxDQUFDRixnQkFBVCxHQUE0QixJQUE1QjtFQUNBRSxZQUFBQSxRQUFRLENBQUNOLGNBQVQsQ0FBd0JxRCxJQUF4QixDQUE2QixJQUE3QixFQUFtQ3RCLEtBQW5DO0VBQ0F6QixZQUFBQSxRQUFRLENBQUNGLGdCQUFULEdBQTRCLEtBQTVCO0VBQ0Q7RUFDRjtFQUNGO0VBQ0Y7RUE3Ykg7RUFBQTtFQUFBLHNDQStib0IyQixLQS9icEIsRUErYjJCRixRQS9iM0IsRUErYnFDO0VBQ2pDO0VBQ0E7RUFDQSxVQUFNeUIsWUFBWSxHQUFHLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFBeUIsVUFBekIsRUFBcUMsS0FBckMsRUFBNEMsU0FBNUMsQ0FBckI7O0VBQ0EsVUFBSXpCLFFBQVEsQ0FBQzBCLEtBQVQsQ0FBZSxLQUFmLEtBQXlCLEtBQUs5RSxPQUFMLENBQWF6QixXQUFiLENBQXlCb0csUUFBekIsQ0FBa0MsU0FBbEMsQ0FBekIsSUFDQSxDQUFDRSxZQUFZLENBQUNGLFFBQWIsQ0FBc0IsS0FBSzNFLE9BQUwsQ0FBYVosV0FBYixDQUF5QmtFLEtBQUssQ0FBQzFFLE9BQS9CLEVBQXdDLENBQXhDLENBQXRCLENBREwsRUFDd0U7RUFDdEUsYUFBS2dDLG1CQUFMLENBQXlCMEMsS0FBekI7RUFDRDtFQUNGO0VBdmNIOztFQUFBO0VBQUE7O0VDSE8sU0FBU3lCLEVBQVQsQ0FBWTVELE1BQVosRUFBb0JpQyxRQUFwQixFQUE4QkYsU0FBOUIsRUFBeUM7RUFFOUM7RUFDQS9CLEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsQ0FBbkIsRUFBd0IsQ0FBQyxRQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLENBQW5CLEVBQXdCLENBQUMsV0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixDQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxPQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsT0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLE9BQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxNQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxPQUFELEVBQVUsT0FBVixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLFVBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLE9BQUQsRUFBVSxVQUFWLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsUUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLFVBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsTUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLE1BQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxJQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsT0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLE1BQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxRQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsYUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLFNBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxVQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXdCLENBQUMsUUFBRCxFQUFXLEtBQVgsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBd0IsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF3QixDQUFDLE1BQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxZQUFELEVBQWUsUUFBZixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLE9BQUQsRUFBVSxHQUFWLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsUUFBRCxFQUFXLEdBQVgsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxPQUFELEVBQVUsY0FBVixFQUEwQixHQUExQixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLGFBQUQsRUFBZ0IsR0FBaEIsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxhQUFELEVBQWdCLEdBQWhCLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsV0FBRCxFQUFjLElBQWQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxjQUFELEVBQWlCLEdBQWpCLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsWUFBRCxFQUFlLElBQWYsQ0FBeEIsRUF0QzhDOztFQXlDOUM3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBdkI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBQyxLQUFELEVBQVEsR0FBUixDQUF2QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF1QixDQUFDLEtBQUQsRUFBUSxHQUFSLENBQXZCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBdkI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBQyxNQUFELEVBQVMsR0FBVCxDQUF2QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF1QixDQUFDLE1BQUQsRUFBUyxHQUFULENBQXZCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsS0FBRCxFQUFRLEdBQVIsQ0FBdkI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBQyxPQUFELEVBQVUsR0FBVixDQUF2QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF1QixDQUFDLE9BQUQsRUFBVSxHQUFWLENBQXZCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBdkIsRUFsRDhDOztFQXFEOUM3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBdkI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBQyxRQUFELEVBQVcsTUFBWCxDQUF2QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixFQUFuQixFQUF1QixDQUFDLFFBQUQsRUFBVyxNQUFYLENBQXZCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEVBQW5CLEVBQXVCLENBQUMsVUFBRCxFQUFhLE1BQWIsQ0FBdkI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxTQUFELEVBQVksTUFBWixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLFNBQUQsRUFBWSxNQUFaLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsUUFBRCxFQUFXLE1BQVgsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxVQUFELEVBQWEsTUFBYixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLFVBQUQsRUFBYSxNQUFiLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxhQUFELEVBQWdCLE1BQWhCLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsUUFBRCxFQUFXLE1BQVgsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxVQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsYUFBRCxFQUFnQixNQUFoQixDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLFlBQUQsRUFBZSxNQUFmLENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsV0FBRCxFQUFjLE1BQWQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxTQUFELEVBQVksS0FBWixDQUF4QixFQXJFOEM7O0VBd0U5QzdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxJQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsSUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLElBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxJQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsSUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLElBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxJQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsSUFBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLElBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsS0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsS0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsS0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsS0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEI7RUFDQTdELEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxLQUFELENBQXhCO0VBQ0E3RCxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsS0FBRCxDQUF4QjtFQUNBN0QsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQixHQUFuQixFQUF3QixDQUFDLEtBQUQsQ0FBeEIsRUEvRjhDOztFQWtHOUM3RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxhQUFELEVBQWdCLGtCQUFoQixFQUFvQyxHQUFwQyxDQUE5QjtFQUNBOUQsRUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixXQUFqQixFQUE4QixDQUFDLElBQUQsRUFBTyxHQUFQLENBQTlCO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsUUFBRCxFQUFXLEdBQVgsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixZQUF0QixFQUFvQyxHQUFwQyxDQUE5QjtFQUNBOUQsRUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixXQUFqQixFQUE4QixDQUFDLFNBQUQsRUFBWSxHQUFaLENBQTlCO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxXQUFELEVBQWMsS0FBZCxFQUFxQixHQUFyQixDQUE5QjtFQUNBOUQsRUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixXQUFqQixFQUE4QixDQUFDLFVBQUQsRUFBYSxHQUFiLENBQTlCO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsV0FBRCxFQUFjLEdBQWQsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxZQUFELEVBQWUsR0FBZixDQUE5QjtFQUNBOUQsRUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixXQUFqQixFQUE4QixDQUFDLFlBQUQsRUFBZSxHQUFmLENBQTlCO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxnQkFBRCxFQUFtQixrQkFBbkIsRUFBdUMsR0FBdkMsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxpQkFBRCxFQUFvQixtQkFBcEIsRUFBeUMsR0FBekMsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsQ0FBQyxhQUFELEVBQWdCLEdBQWhCLENBQS9CO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFdBQWpCLEVBQThCLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBOUI7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsQ0FBQyxlQUFELEVBQWtCLElBQWxCLENBQS9CO0VBQ0E5RCxFQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFlBQWpCLEVBQStCLENBQUMsa0JBQUQsRUFBcUIsR0FBckIsQ0FBL0I7RUFDQTlELEVBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsQ0FBQyxtQkFBRCxFQUFzQixHQUF0QixDQUE5QjtFQUNBOUQsRUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixXQUFqQixFQUE4QixDQUFDLGNBQUQsRUFBaUIsR0FBakIsQ0FBOUI7O0VBRUEsTUFBSTdCLFFBQVEsQ0FBQzBCLEtBQVQsQ0FBZSxLQUFmLENBQUosRUFBMkI7RUFDekIzRCxJQUFBQSxNQUFNLENBQUM4RCxTQUFQLENBQWlCLFNBQWpCLEVBQTRCLENBQUMsS0FBRCxFQUFRLFVBQVIsQ0FBNUI7RUFDRCxHQUZELE1BRU87RUFDTDlELElBQUFBLE1BQU0sQ0FBQzhELFNBQVAsQ0FBaUIsTUFBakIsRUFBeUIsQ0FBQyxLQUFELEVBQVEsVUFBUixDQUF6QjtFQUNELEdBNUg2Qzs7O0VBK0g5QyxPQUFLLElBQUlyRyxPQUFPLEdBQUcsRUFBbkIsRUFBdUJBLE9BQU8sSUFBSSxFQUFsQyxFQUFzQ0EsT0FBTyxJQUFJLENBQWpELEVBQW9EO0VBQ2xELFFBQUk3QixPQUFPLEdBQUdtSSxNQUFNLENBQUNDLFlBQVAsQ0FBb0J2RyxPQUFPLEdBQUcsRUFBOUIsQ0FBZDtFQUNBLFFBQUl3RyxjQUFjLEdBQUdGLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnZHLE9BQXBCLENBQXJCO0VBQ0R1QyxJQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CcEcsT0FBbkIsRUFBNEI3QixPQUE1QjtFQUNBb0UsSUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixhQUFhbEksT0FBOUIsRUFBdUNxSSxjQUF2QztFQUNBakUsSUFBQUEsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixnQkFBZ0JsSSxPQUFqQyxFQUEwQ3FJLGNBQTFDO0VBQ0EsR0FySTZDOzs7RUF3STlDLE1BQU1DLGdCQUFnQixHQUFHbkMsU0FBUyxDQUFDNEIsS0FBVixDQUFnQixTQUFoQixJQUE2QixFQUE3QixHQUFtQyxHQUE1RDtFQUNBLE1BQU1RLFdBQVcsR0FBUXBDLFNBQVMsQ0FBQzRCLEtBQVYsQ0FBZ0IsU0FBaEIsSUFBNkIsR0FBN0IsR0FBbUMsR0FBNUQ7RUFDQSxNQUFNUyxZQUFZLEdBQU9yQyxTQUFTLENBQUM0QixLQUFWLENBQWdCLFNBQWhCLElBQTZCLEVBQTdCLEdBQW1DLEdBQTVEO0VBQ0EsTUFBSVUsa0JBQUo7RUFDQSxNQUFJQyxtQkFBSjs7RUFDQSxNQUFJckMsUUFBUSxDQUFDMEIsS0FBVCxDQUFlLEtBQWYsTUFBMEI1QixTQUFTLENBQUM0QixLQUFWLENBQWdCLFFBQWhCLEtBQTZCNUIsU0FBUyxDQUFDNEIsS0FBVixDQUFnQixRQUFoQixDQUF2RCxDQUFKLEVBQXVGO0VBQ3JGVSxJQUFBQSxrQkFBa0IsR0FBSSxFQUF0QjtFQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtFQUNELEdBSEQsTUFHTyxJQUFHckMsUUFBUSxDQUFDMEIsS0FBVCxDQUFlLEtBQWYsS0FBeUI1QixTQUFTLENBQUM0QixLQUFWLENBQWdCLE9BQWhCLENBQTVCLEVBQXNEO0VBQzNEVSxJQUFBQSxrQkFBa0IsR0FBSSxFQUF0QjtFQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtFQUNELEdBSE0sTUFHQSxJQUFHckMsUUFBUSxDQUFDMEIsS0FBVCxDQUFlLEtBQWYsS0FBeUI1QixTQUFTLENBQUM0QixLQUFWLENBQWdCLFNBQWhCLENBQTVCLEVBQXdEO0VBQzdEVSxJQUFBQSxrQkFBa0IsR0FBSSxHQUF0QjtFQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxHQUF0QjtFQUNEOztFQUNEdEUsRUFBQUEsTUFBTSxDQUFDNkQsV0FBUCxDQUFtQkssZ0JBQW5CLEVBQXdDLENBQUMsV0FBRCxFQUFjLEdBQWQsQ0FBeEM7RUFDQWxFLEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUJNLFdBQW5CLEVBQXdDLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBeEM7RUFDQW5FLEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUJPLFlBQW5CLEVBQXdDLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsR0FBdkIsQ0FBeEM7RUFDQXBFLEVBQUFBLE1BQU0sQ0FBQzZELFdBQVAsQ0FBbUJRLGtCQUFuQixFQUF3QyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLEtBQXZCLEVBQThCLE9BQTlCLEVBQXVDLGFBQXZDLEVBQXNELGFBQXRELEVBQXFFLFNBQXJFLEVBQWdGLFdBQWhGLENBQXhDO0VBQ0FyRSxFQUFBQSxNQUFNLENBQUM2RCxXQUFQLENBQW1CUyxtQkFBbkIsRUFBd0MsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixLQUF2QixFQUE4QixPQUE5QixFQUF1QyxjQUF2QyxFQUF1RCxjQUF2RCxFQUF1RSxVQUF2RSxFQUFtRixZQUFuRixDQUF4QyxFQTNKOEM7O0VBOEo5Q3RFLEVBQUFBLE1BQU0sQ0FBQ2pDLFVBQVAsQ0FBa0IsU0FBbEI7RUFDRDs7TUMzSkt3RyxRQUFRLEdBQUcsSUFBSS9GLFFBQUo7RUFFakIrRixRQUFRLENBQUNDLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUJaLEVBQXpCO0VBRUFXLFFBQVEsQ0FBQy9GLFFBQVQsR0FBb0JBLFFBQXBCO0VBQ0ErRixRQUFRLENBQUN2SCxNQUFULEdBQWtCQSxNQUFsQjtFQUNBdUgsUUFBUSxDQUFDL0osUUFBVCxHQUFvQkEsUUFBcEI7Ozs7Ozs7OyJ9


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


(0,_socket_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
})();

/******/ })()
;