var A = /* @__PURE__ */ ((e) => (e[e.UP = 1] = "UP", e[e.DOWN = 2] = "DOWN", e[e.LEFT = 3] = "LEFT", e[e.RIGHT = 4] = "RIGHT", e[e.CENTER = 5] = "CENTER", e))(A || {}), X = /* @__PURE__ */ ((e) => (e[e.ALWAYS = 0] = "ALWAYS", e[e.ON_EVENT = 1] = "ON_EVENT", e[e.NEVER = 2] = "NEVER", e[e.ON_TRIGGER = 3] = "ON_TRIGGER", e[e.ON_REQUEST = 4] = "ON_REQUEST", e))(X || {});
const ie = ["Always", "On Event", "Never", "On Trigger"], ye = ["#666", "#422", "#333", "#224", "#626"];
var C = /* @__PURE__ */ ((e) => (e[e.DEFAULT = 0] = "DEFAULT", e[e.BOX_SHAPE = 1] = "BOX_SHAPE", e[e.ROUND_SHAPE = 2] = "ROUND_SHAPE", e[e.CIRCLE_SHAPE = 3] = "CIRCLE_SHAPE", e[e.CARD_SHAPE = 4] = "CARD_SHAPE", e[e.ARROW_SHAPE = 5] = "ARROW_SHAPE", e[e.GRID_SHAPE = 6] = "GRID_SHAPE", e))(C || {});
const be = ["default", "box", "round", "circle", "card", "arrow", "square"];
var H = /* @__PURE__ */ ((e) => (e[e.INPUT = 0] = "INPUT", e[e.OUTPUT = 1] = "OUTPUT", e))(H || {}), pe = /* @__PURE__ */ ((e) => (e[e.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", e[e.LINEAR_LINK = 1] = "LINEAR_LINK", e[e.SPLINE_LINK = 2] = "SPLINE_LINK", e))(pe || {});
const ze = ["Straight", "Linear", "Spline"];
var ee = /* @__PURE__ */ ((e) => (e[e.NORMAL_TITLE = 0] = "NORMAL_TITLE", e[e.NO_TITLE = 1] = "NO_TITLE", e[e.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", e[e.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", e))(ee || {}), O = /* @__PURE__ */ ((e) => (e[e.EVENT = -2] = "EVENT", e[e.ACTION = -1] = "ACTION", e[e.DEFAULT = 0] = "DEFAULT", e))(O || {});
const Ne = ["*", "array", "object", "number", "string", "enum", "boolean", "table"];
var ae = /* @__PURE__ */ ((e) => (e.VERTICAL_LAYOUT = "vertical", e.HORIZONTAL_LAYOUT = "horizontal", e))(ae || {});
function _e(e, t, s) {
  return t > e ? t : s < e ? s : e;
}
function de(e, t) {
  return e.reduce((s, n) => {
    const i = t(n);
    return s[i] = n, s;
  }, {});
}
function Te(e, t) {
  return t in e ? e[t] : null;
}
function ge(e, t) {
  return t in e.constructor ? e.constructor[t] : null;
}
function De(e, t) {
  if (e.target !== t)
    return;
  const s = e.clientX - Number.parseInt(window.getComputedStyle(t).left), n = e.clientY - Number.parseInt(window.getComputedStyle(t).top), i = (a) => {
    if (a.buttons === 0) {
      o();
      return;
    }
    t.style.top = `${a.clientY - n}px`, t.style.left = `${a.clientX - s}px`;
  }, o = () => {
    window.removeEventListener("mousemove", i), window.removeEventListener("mouseup", o);
  };
  window.addEventListener("mousemove", i), window.addEventListener("mouseup", o);
}
function ve(e) {
  return e.addEventListener("mousedown", (t) => De(t, e)), e.classList.add("draggable"), e;
}
function V(e) {
  return e === O.EVENT ? "Event" : e === O.ACTION ? "Action" : e === O.DEFAULT ? "Default" : e;
}
function Oe(e) {
  return e === O.EVENT || e === O.ACTION || e === O.DEFAULT || typeof e == "string";
}
const w = class {
  /** Register a node class so it can be listed when the user wants to create a new one */
  static registerNodeType(e) {
    w.debug && console.log(`Node registered: ${e.type}`);
    const t = e.name, s = e.type;
    if (!s)
      throw `Config has no type: ${e}`;
    if (w.debug && console.debug(t, s), e.category == null || e.category === "") {
      const i = s.lastIndexOf("/");
      e.category = s.substring(0, i);
    }
    e.title || (e.title = t);
    const n = w.registered_node_types[s];
    if (n && console.warn(`replacing node type: ${s}`), e.supported_extensions)
      for (const i in e.supported_extensions) {
        const o = e.supported_extensions[i];
        o && o.constructor === String && (w.node_types_by_file_extension[o.toLowerCase()] = e);
      }
    e.class.__LITEGRAPH_TYPE__ = s, w.registered_node_types[s] = e, e.class.name && (w.Nodes[t] = e), w.onNodeTypeRegistered && w.onNodeTypeRegistered(s, e), n && w.onNodeTypeReplaced && w.onNodeTypeReplaced(s, e, n);
  }
  /** removes a node type from the system */
  static unregisterNodeType(e) {
    let t;
    if (typeof e == "string" ? t = w.registered_node_types[e] : t = e, !t)
      throw `node type not found: ${e}`;
    delete w.registered_node_types[t.type], t.constructor.name && delete w.Nodes[t.constructor.name];
  }
  /**
   * Save a slot type and his node
   * @method registerSlotType
   * @param {string | object} type name of the node or the node constructor itself
   * @param {string} slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  static registerNodeAndSlotType(e, t, s = !1) {
    let n;
    if (typeof e == "string" ? n = w.registered_node_types[e] : "type" in e ? n = w.registered_node_types[e.type] : n = e, !n)
      throw `Node not registered!${e}`;
    const i = n.class.__litegraph_type__;
    if (typeof t == "string")
      var o = t.split(",");
    else if (t == O.EVENT || t == O.ACTION)
      var o = ["_event_"];
    else
      var o = ["*"];
    for (let a = 0; a < o.length; ++a) {
      let r = o[a];
      r === "" && (r = "*");
      const l = s ? "registered_slot_out_types" : "registered_slot_in_types";
      typeof this[l][r] > "u" && (this[l][r] = { nodes: [] }), this[l][r].nodes.push(i), r !== "_event_" && r !== "*" && (s ? w.slot_types_out.includes(r.toLowerCase()) || (w.slot_types_out.push(r.toLowerCase()), w.slot_types_out.sort()) : w.slot_types_in.includes(r.toLowerCase()) || (w.slot_types_in.push(r.toLowerCase()), w.slot_types_in.sort()));
    }
  }
  /** Removes all previously registered node's types. */
  static clearRegisteredTypes() {
    w.registered_node_types = {}, w.node_types_by_file_extension = {}, w.Nodes = {}, w.searchbox_extras = {};
  }
  /**
   * Create a new node type by passing a function, it wraps it with a proper class and generates inputs according to the parameters of the function.
   * Useful to wrap simple methods that do not require properties, and that only process some input to generate an output.
   * @param name node name with namespace (p.e.: 'math/sum')
   * @param func
   * @param param_types an array containing the type of every parameter, otherwise parameters will accept any type
   * @param return_type string with the return type, otherwise it will be generic
   * @param properties properties to be configurable
   */
  // static wrapFunctionAsNode(
  //     name: string,
  //     func: (...args: any[]) => any,
  //     param_types?: string[],
  //     return_type?: string,
  //     properties?: object
  // ): void {
  //     var params = Array(func.length);
  //     var code = "";
  //     var names = LiteGraph.getParameterNames(func);
  //     for (var i = 0; i < names.length; ++i) {
  //         code +=
  //         "this.addInput('" +
  //             names[i] +
  //             "'," +
  //             (param_types && param_types[i]
  //                 ? "'" + param_types[i] + "'"
  //                 : "0") +
  //             ");\n";
  //     }
  //     code +=
  //     "this.addOutput('out'," +
  //         (return_type ? "'" + return_type + "'" : 0) +
  //         ");\n";
  //     if (properties) {
  //         code +=
  //         "this.properties = " + JSON.stringify(properties) + ";\n";
  //     }
  //     var classobj = Function(code) as any;
  //     classobj.title = name.split("/").pop();
  //     classobj.desc = "Generated from " + func.name;
  //     classobj.prototype.onExecute = function onExecute() {
  //         for (var i = 0; i < params.length; ++i) {
  //             params[i] = this.getInputData(i);
  //         }
  //         var r = func.apply(this, params);
  //         this.setOutputData(0, r);
  //     };
  //     LiteGraph.registerNodeType(name, classobj);
  // }
  /**
   * Adds this method to all node types, existing and to be created
   * (You can add it to LGraphNode.prototype but then existing node types wont have it)
   */
  // static addNodeMethod(name: string, func: (...args: any[]) => any): void {
  //     LGraphNode.prototype[name] = func;
  //     for (var i in LiteGraph.registered_node_types) {
  //         var type = LiteGraph.registered_node_types[i];
  //         if (type.prototype[name]) {
  //             type.prototype["_" + name] = type.prototype[name];
  //         } //keep old in case of replacing
  //         type.prototype[name] = func;
  //     }
  // }
  /**
   * Create a node of a given type with a name. The node is not attached to any graph yet.
   * @param type full name of the node class. p.e. "math/sin"
   * @param name a name to distinguish from other nodes
   * @param options to set options
   */
  static createNode(e, t, s = {}) {
    let n = null, i;
    if (typeof e == "string")
      i = e;
    else if (i = e.__LITEGRAPH_TYPE__, !i)
      throw console.error(e), "Node was not registered yet!";
    if (n = w.registered_node_types[i], !n)
      return console.warn(
        `GraphNode type "${e}" not registered.`
      ), null;
    t = t || n.title || i;
    let o = null;
    const a = s.constructorArgs || [];
    if (w.catch_exceptions)
      try {
        o = new n.class(t, ...a);
      } catch (u) {
        return console.error("Error creating node!", u), null;
      }
    else
      o = new n.class(t, ...a);
    if (o.class = n.class, o.type = i, !o.title && t && (o.title = t), o.properties || (o.properties = {}), o.properties_info || (o.properties_info = []), o.flags || (o.flags = {}), o.size || (o.size = o.computeSize()), o.pos || (o.pos = [w.DEFAULT_POSITION[0], w.DEFAULT_POSITION[1]]), o.mode || (o.mode = X.ALWAYS), s.instanceProps)
      for (const u in s.instanceProps)
        o[u] = s.instanceProps[u];
    const r = Te(n.class, "propertyLayout");
    if (r) {
      w.debug && console.debug("Found property layout!", r);
      for (const u of r) {
        const { name: f, defaultValue: c, type: p, options: v } = u;
        o.addProperty(f, c, p, v);
      }
    }
    const l = Te(n.class, "slotLayout");
    if (l) {
      if (w.debug && console.debug("Found slot layout!", l), l.inputs)
        for (const u of l.inputs) {
          const { name: f, type: c, options: p } = u;
          o.addInput(f, c, p);
        }
      if (l.outputs)
        for (const u of l.outputs) {
          const { name: f, type: c, options: p } = u;
          o.addOutput(f, c, p);
        }
    }
    return o.onNodeCreated && o.onNodeCreated(), o;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   */
  static getNodeType(e) {
    return w.registered_node_types[e];
  }
  /**
   * Returns a list of node types matching one category
   * @method getNodeTypesInCategory
   * @param {string} category category name
   * @param {string} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the node classes
   */
  static getNodeTypesInCategory(e, t) {
    const s = [];
    for (const n in w.registered_node_types) {
      const i = w.registered_node_types[n];
      i.filter == t && (e == "" ? i.category == null && s.push(i) : i.category == e && s.push(i));
    }
    return w.auto_sort_node_types && s.sort((n, i) => n.title.localeCompare(i.title)), s;
  }
  /**
   * Returns a list with all the node type categories
   * @method getNodeTypesCategories
   * @param {string} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the names of the categories
   */
  static getNodeTypesCategories(e) {
    const t = { "": 1 };
    for (var s in w.registered_node_types) {
      const i = w.registered_node_types[s];
      if (i.category && !i.hide_in_node_lists) {
        if (i.filter != e)
          continue;
        t[i.category] = 1;
      }
    }
    const n = [];
    for (var s in t)
      n.push(s);
    return w.auto_sort_node_types ? n.sort() : n;
  }
  /** debug purposes: reloads all the js scripts that matches a wildcard */
  static reloadNodes(e) {
    const t = document.getElementsByTagName("script"), s = [];
    for (var n = 0; n < t.length; n++)
      s.push(t[n]);
    const i = document.getElementsByTagName("head")[0];
    e = document.location.href + e;
    for (var n = 0; n < s.length; n++) {
      const a = s[n].src;
      if (!(!a || a.substr(0, e.length) != e))
        try {
          w.debug && console.log(`Reloading: ${a}`);
          const r = document.createElement("script");
          r.type = "text/javascript", r.src = a, i.appendChild(r), i.removeChild(s[n]);
        } catch (r) {
          if (w.throw_errors)
            throw r;
          w.debug && console.log(`Error while reloading ${a}`);
        }
    }
    w.debug && console.log("Nodes reloaded");
  }
  // TODO move
  // separated just to improve if it doesn't work
  static cloneObject(e, t) {
    if (e == null)
      return null;
    const s = JSON.parse(JSON.stringify(e));
    if (!t)
      return s;
    for (const n in s)
      t[n] = s[n];
    return t;
  }
  /**
   * Returns if the types of two slots are compatible (taking into account wildcards, etc)
   * @method isValidConnection
   * @param {string} type_a
   * @param {string} type_b
   * @return {boolean} true if they can be connected
   */
  static isValidConnection(e, t) {
    if ((e == "" || e === "*") && (e = O.DEFAULT), (t == "" || t === "*") && (t = O.DEFAULT), !e || !t || e == t || e == O.EVENT && t == O.ACTION || e == O.ACTION && t == O.EVENT)
      return !0;
    if (e = String(e), t = String(t), e = e.toLowerCase(), t = t.toLowerCase(), !e.includes(",") && !t.includes(","))
      return e == t;
    const s = e.split(","), n = t.split(",");
    for (let i = 0; i < s.length; ++i)
      for (let o = 0; o < n.length; ++o)
        if (this.isValidConnection(s[i], n[o]))
          return !0;
    return !1;
  }
  static getTime() {
    return Date.now();
  }
  // static LLink: typeof LLink;
  // static LGraph: typeof LGraph;
  // static DragAndScale: typeof DragAndScale;
  static compareObjects(e, t) {
    for (const s in e)
      if (e[s] != t[s])
        return !1;
    return !0;
  }
  static distance(e, t) {
    return Math.sqrt(
      (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
    );
  }
  static colorToString(e) {
    return `rgba(${Math.round(e[0] * 255).toFixed()},${Math.round(e[1] * 255).toFixed()},${Math.round(e[2] * 255).toFixed()},${e.length == 4 ? e[3].toFixed(2) : "1.0"})`;
  }
  static isInsideRectangle(e, t, s, n, i, o) {
    return s < e && s + i > e && n < t && n + o > t;
  }
  // [minx,miny,maxx,maxy]
  static growBounding(e, t, s) {
    return t < e[0] ? e[0] = t : t > e[2] && (e[2] = t), s < e[1] ? e[1] = s : s > e[3] && (e[3] = s), e;
  }
  static isInsideBounding(e, t) {
    return !(e[0] < t[0][0] || e[1] < t[0][1] || e[0] > t[1][0] || e[1] > t[1][1]);
  }
  // bounding overlap, format: [ startx, starty, width, height ]
  static overlapBounding(e, t) {
    const s = e[0] + e[2], n = e[1] + e[3], i = t[0] + t[2], o = t[1] + t[3];
    return !(e[0] > i || e[1] > o || s < t[0] || n < t[1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  static hex2num(e) {
    e.charAt(0) == "#" && (e = e.slice(1)), e = e.toUpperCase();
    const t = "0123456789ABCDEF";
    let s, n = 0, i, o;
    for (let a = 0; a < 6; a += 2)
      i = t.indexOf(e.charAt(a)), o = t.indexOf(e.charAt(a + 1)), s[n] = i * 16 + o, n++;
    return s;
  }
  // Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex(e) {
    const t = "0123456789ABCDEF";
    let s = "#", n, i;
    for (let o = 0; o < 3; o++)
      n = e[o] / 16, i = e[o] % 16, s += t.charAt(n) + t.charAt(i);
    return s;
  }
  // ContextMenu: typeof ContextMenu;
  // static extendClass<A, B>(target: A, origin: B): A & B;
  // static getParameterNames(func: string | Function): string[];
  /* helper for interaction: pointer, touch, mouse Listeners
       used by LGraphCanvas DragAndScale ContextMenu */
  static pointerListenerAdd(e, t, s, n = !1) {
    if (!e || !e.addEventListener || !t || typeof s != "function")
      return;
    let i = w.pointerevents_method, o = t;
    if (i == "pointer" && !window.PointerEvent)
      switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log(`Converting pointer[${o}] : down move up cancel enter TO touchstart touchmove touchend, etc ..`), o) {
        case "down": {
          i = "touch", o = "start";
          break;
        }
        case "move": {
          i = "touch";
          break;
        }
        case "up": {
          i = "touch", o = "end";
          break;
        }
        case "cancel": {
          i = "touch";
          break;
        }
        case "enter": {
          console.log("debug: Should I send a move event?");
          break;
        }
        default:
          console.warn(`PointerEvent not available in this browser ? The event ${o} would not be called`);
      }
    switch (o) {
      case "down":
      case "up":
      case "move":
      case "over":
      case "out":
      case "enter":
        e.addEventListener(i + o, s, n);
      case "leave":
      case "cancel":
      case "gotpointercapture":
      case "lostpointercapture":
        if (i != "mouse")
          return e.addEventListener(i + o, s, n);
      default:
        return e.addEventListener(o, s, n);
    }
  }
  static pointerListenerRemove(e, t, s, n = !1) {
    if (!(!e || !e.removeEventListener || !t || typeof s != "function"))
      switch (t) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (w.pointerevents_method == "pointer" || w.pointerevents_method == "mouse") && e.removeEventListener(w.pointerevents_method + t, s, n);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (w.pointerevents_method == "pointer")
            return e.removeEventListener(w.pointerevents_method + t, s, n);
        default:
          return e.removeEventListener(t, s, n);
      }
  }
};
let h = w;
h.VERSION = 10;
h.CANVAS_GRID_SIZE = 10;
h.NODE_TITLE_HEIGHT = 20;
h.NODE_TITLE_TEXT_Y = 15;
h.NODE_SLOT_HEIGHT = 20;
h.NODE_WIDGET_HEIGHT = 20;
h.NODE_WIDTH = 140;
h.NODE_MIN_WIDTH = 50;
h.NODE_COLLAPSED_RADIUS = 10;
h.NODE_COLLAPSED_WIDTH = 80;
h.NODE_TITLE_COLOR = "#999";
h.NODE_SELECTED_TITLE_COLOR = "#FFF";
h.NODE_TEXT_SIZE = 14;
h.NODE_TEXT_COLOR = "#AAA";
h.NODE_SUBTEXT_SIZE = 12;
h.NODE_DEFAULT_COLOR = "#333";
h.NODE_DEFAULT_BGCOLOR = "#353535";
h.NODE_DEFAULT_BOXCOLOR = "#666";
h.NODE_DEFAULT_SHAPE = "box";
h.NODE_BOX_OUTLINE_COLOR = "#FFF";
h.DEFAULT_SHADOW_COLOR = "rgba(0,0,0,0.5)";
h.DEFAULT_GROUP_FONT_SIZE = 24;
h.WIDGET_BGCOLOR = "#222";
h.WIDGET_OUTLINE_COLOR = "#666";
h.WIDGET_TEXT_COLOR = "#DDD";
h.WIDGET_SECONDARY_TEXT_COLOR = "#999";
h.LINK_COLOR = "#9A9";
h.EVENT_LINK_COLOR = "#A86";
h.ACTION_LINK_COLOR = "#86A";
h.CONNECTING_LINK_COLOR = "#AFA";
h.MAX_NUMBER_OF_NODES = 1e3;
h.DEFAULT_POSITION = [100, 100];
h.proxy = null;
h.node_images_path = "";
h.debug = !1;
h.catch_exceptions = !0;
h.throw_errors = !0;
h.allow_scripts = !1;
h.registered_node_types = {};
h.node_types_by_file_extension = {};
h.Nodes = {};
h.Globals = {};
h.searchbox_extras = {};
h.auto_sort_node_types = !1;
h.node_box_coloured_when_on = !1;
h.node_box_coloured_by_mode = !1;
h.dialog_close_on_mouse_leave = !0;
h.dialog_close_on_mouse_leave_delay = 500;
h.shift_click_do_break_link_from = !1;
h.click_do_break_link_to = !1;
h.search_hide_on_mouse_leave = !0;
h.search_filter_enabled = !1;
h.search_show_all_on_open = !0;
h.auto_load_slot_types = !1;
h.registered_slot_in_types = {};
h.registered_slot_out_types = {};
h.slot_types_in = [];
h.slot_types_out = [];
h.slot_types_default_in = {};
h.slot_types_default_out = {};
h.alt_drag_do_clone_nodes = !1;
h.do_add_triggers_slots = !1;
h.allow_multi_output_for_events = !0;
h.middle_click_slot_add_default_node = !1;
h.release_link_on_empty_shows_menu = !1;
h.ignore_all_widget_events = !1;
h.pointerevents_method = "mouse";
h.use_uuids = !1;
h.search_box_refresh_interval_ms = 250;
h.graph_inputs_outputs_use_combo_widget = !1;
h.serialize_slot_data = !1;
class Pe {
  constructor(t, s = !1) {
    this.offset = [0, 0], this.scale = 1, this.max_scale = 10, this.min_scale = 0.1, this.onredraw = null, this.enabled = !0, this.last_mouse = [0, 0], this.element = null, this.visible_area = new Float32Array([0, 0, 0, 0]), this.viewport = null, this.dragging = !1, this._binded_mouse_callback = null, t && (this.element = t, s || this.bindEvents(t));
  }
  bindEvents(t) {
    this.last_mouse = [0, 0], this._binded_mouse_callback = this.onMouse.bind(this), h.pointerListenerAdd(t, "down", this._binded_mouse_callback), h.pointerListenerAdd(t, "move", this._binded_mouse_callback), h.pointerListenerAdd(t, "up", this._binded_mouse_callback), t.addEventListener(
      "mousewheel",
      this._binded_mouse_callback,
      !1
    ), t.addEventListener("wheel", this._binded_mouse_callback, !1);
  }
  computeVisibleArea(t) {
    if (!this.element) {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      return;
    }
    let s = this.element.width, n = this.element.height, i = -this.offset[0], o = -this.offset[1];
    t && (i += t[0] / this.scale, o += t[1] / this.scale, s = t[2], n = t[3]);
    const a = i + s / this.scale, r = o + n / this.scale;
    this.visible_area[0] = i, this.visible_area[1] = o, this.visible_area[2] = a - i, this.visible_area[3] = r - o;
  }
  onMouse(t) {
    if (!this.enabled)
      return;
    const s = this.element, n = s.getBoundingClientRect(), i = t, o = i.clientX - n.left, a = i.clientY - n.top;
    i.canvasX = o, i.canvasX = a, i.dragging = this.dragging;
    const r = !this.viewport || this.viewport && o >= this.viewport[0] && o < this.viewport[0] + this.viewport[2] && a >= this.viewport[1] && a < this.viewport[1] + this.viewport[3];
    if (i.type == `${h.pointerevents_method}down` && r)
      this.dragging = !0, h.pointerListenerRemove(s, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "up", this._binded_mouse_callback);
    else if (i.type == `${h.pointerevents_method}move`) {
      const l = o - this.last_mouse[0], u = a - this.last_mouse[1];
      this.dragging && this.mouseDrag(l, u);
    } else
      i.type == `${h.pointerevents_method}up` ? (this.dragging = !1, h.pointerListenerRemove(document, "move", this._binded_mouse_callback), h.pointerListenerRemove(document, "up", this._binded_mouse_callback), h.pointerListenerAdd(s, "move", this._binded_mouse_callback)) : r && (i.type == "mousewheel" || i.type == "wheel" || i.type == "DOMMouseScroll") && (i.eventType = "mousewheel", i.type == "wheel" ? i.wheel = -i.deltaY : i.wheel = i.wheelDeltaY != null ? i.wheelDeltaY : i.detail * -60, i.delta = i.wheelDelta ? i.wheelDelta / 40 : i.deltaY ? -i.deltaY / 3 : 0, this.changeDeltaScale(1 + i.delta * 0.05, [i.clientX, i.clientY]));
    if (this.last_mouse[0] = o, this.last_mouse[1] = a, r)
      return i.preventDefault(), i.stopPropagation(), !1;
  }
  toCanvasContext(t) {
    t.scale(this.scale, this.scale), t.translate(this.offset[0], this.offset[1]);
  }
  convertOffsetToCanvas(t) {
    return [
      (t[0] + this.offset[0]) * this.scale,
      (t[1] + this.offset[1]) * this.scale
    ];
  }
  convertCanvasToOffset(t, s = [0, 0]) {
    return s[0] = t[0] / this.scale - this.offset[0], s[1] = t[1] / this.scale - this.offset[1], s;
  }
  mouseDrag(t, s) {
    this.offset[0] += t / this.scale, this.offset[1] += s / this.scale, this.onredraw && this.onredraw(this);
  }
  changeScale(t, s) {
    if (t < this.min_scale ? t = this.min_scale : t > this.max_scale && (t = this.max_scale), t == this.scale || !this.element)
      return;
    const n = this.element.getBoundingClientRect();
    if (!n)
      return;
    s = s || [
      n.width * 0.5,
      n.height * 0.5
    ], s[0] -= n.left, s[1] -= n.top;
    const i = this.convertCanvasToOffset(s);
    this.scale = t, Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
    const o = this.convertCanvasToOffset(s), a = [
      o[0] - i[0],
      o[1] - i[1]
    ];
    this.offset[0] += a[0], this.offset[1] += a[1], this.onredraw && this.onredraw(this);
  }
  changeDeltaScale(t, s) {
    this.changeScale(this.scale * t, s);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
class he {
  processMouseDown(t) {
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const s = t;
    this.adjustMouseEvent(s);
    const n = this.getCanvasWindow();
    n.document, N.active_canvas = this;
    const i = s.clientX, o = s.clientY;
    this.ds.viewport = this.viewport;
    const a = !this.viewport || this.viewport && i >= this.viewport[0] && i < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3];
    if (this.skip_events || (h.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), h.pointerListenerAdd(n.document, "move", this._mousemove_callback, !0), h.pointerListenerAdd(n.document, "up", this._mouseup_callback, !0)), !a)
      return;
    let r = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes, 5), l = !1;
    const u = h.getTime(), f = !(s instanceof PointerEvent) || !s.isPrimary, c = u - this.last_mouseclick < 300 && f;
    if (this.mouse[0] = s.clientX, this.mouse[1] = s.clientY, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.last_click_position_offset = [this.offset_mouse[0], this.offset_mouse[1]], this.pointer_is_down && f ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), z.closeAllContextMenus(n), this.search_box && this.search_box.close(), !(this.onMouse && this.onMouse(s) === !0)) {
      if (s.which == 1 && !this.pointer_is_double) {
        if (s.ctrlKey && this.allow_interaction && !this.read_only && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = s.canvasX, this.dragging_rectangle[1] = s.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, l = !0), h.alt_drag_do_clone_nodes && s.altKey && r && this.allow_interaction && !l && !this.read_only) {
          const T = r.clone();
          T && (T.pos[0] += 5, T.pos[1] += 5, this.graph.add(T, { doCalcSize: !1 }), r = T, l = !0, y || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = r), this.selected_nodes[r.id] || this.processNodeSelected(r, s)));
        }
        let E = !1;
        if (r && this.allow_interaction && !l && !this.read_only) {
          if (!this.live_mode && !r.flags.pinned && this.bringToFront(r), !this.connecting_node && !r.flags.collapsed && !this.live_mode)
            if (!l && r.resizable !== !1 && h.isInsideRectangle(s.canvasX, s.canvasY, r.pos[0] + r.size[0] - 5, r.pos[1] + r.size[1] - 5, 10, 10))
              this.graph.beforeChange(), this.resizing_node = r, this.canvas.style.cursor = "se-resize", l = !0;
            else {
              if (r.outputs)
                for (var p = 0, v = r.outputs.length; p < v; ++p) {
                  var _ = r.outputs[p], g = r.getConnectionPos(!1, p);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    g[0] - 15,
                    g[1] - 10,
                    30,
                    20
                  )) {
                    this.connecting_node = r, this.connecting_output = _, this.connecting_output.slot_index = p, this.connecting_pos = r.getConnectionPos(!1, p), this.connecting_slot = p, h.shift_click_do_break_link_from && s.shiftKey && r.disconnectOutput(p), c ? r.onOutputDblClick && r.onOutputDblClick(p, s) : r.onOutputClick && r.onOutputClick(p, s), l = !0;
                    break;
                  }
                }
              if (r.inputs)
                for (var p = 0, v = r.inputs.length; p < v; ++p) {
                  var d = r.inputs[p], g = r.getConnectionPos(!0, p);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    g[0] - 15,
                    g[1] - 10,
                    30,
                    20
                  )) {
                    if (c ? r.onInputDblClick && r.onInputDblClick(p, s) : r.onInputClick && r.onInputClick(p, s), d.link !== null) {
                      const S = this.graph.links[d.link];
                      h.click_do_break_link_to && (r.disconnectInput(p), this.dirty_bgcanvas = !0, l = !0), (this.allow_reconnect_links || s.shiftKey) && (h.click_do_break_link_to || r.disconnectInput(p), this.connecting_node = this.graph._nodes_by_id[S.origin_id], this.connecting_slot = S.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, l = !0);
                    }
                    l || (this.connecting_node = r, this.connecting_input = d, this.connecting_input.slot_index = p, this.connecting_pos = r.getConnectionPos(!0, p), this.connecting_slot = p, this.dirty_bgcanvas = !0, l = !0);
                  }
                }
            }
          if (!l) {
            var y = !1, m = [s.canvasX - r.pos[0], s.canvasY - r.pos[1]];
            const T = this.processNodeWidgets(r, this.graph_mouse, s);
            T && (y = !0, this.node_widget = [r, T]), c && this.selected_nodes[r.id] && (r.onDblClick && r.onDblClick(s, m, this), this.processNodeDblClicked(r), y = !0), r.onMouseDown && r.onMouseDown(s, m, this) ? y = !0 : (r.subgraph && !r.skip_subgraph_button && !r.flags.collapsed && m[0] > r.size[0] - h.NODE_TITLE_HEIGHT && m[1] < 0 && setTimeout(() => {
              this.openSubgraph(r.subgraph);
            }, 10), this.live_mode && (E = !0, y = !0)), y || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = r), this.selected_nodes[r.id] || this.processNodeSelected(r, s)), this.dirty_canvas = !0;
          }
        } else if (!l) {
          let T = !1;
          if (r && r.subgraph && !r.skip_subgraph_button) {
            var m = [s.canvasX - r.pos[0], s.canvasY - r.pos[1]];
            !r.flags.collapsed && m[0] > r.size[0] - h.NODE_TITLE_HEIGHT && m[1] < 0 && (T = !0, setTimeout(() => {
              this.openSubgraph(r.subgraph);
            }, 10));
          }
          if (!T) {
            if (this.allow_interaction && !this.read_only) {
              const b = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
              b != null && (this.showLinkMenu(b, s), this.over_link_center = null);
            }
            this.selected_group = this.graph.getGroupOnPos(s.canvasX, s.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only && this.allow_interaction && (s.ctrlKey && (this.dragging_rectangle = null), h.distance([s.canvasX, s.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]) * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes()), c && !this.read_only && this.allow_searchbox && this.allow_interaction && (this.showSearchBox(s), s.preventDefault(), s.stopPropagation()), E = !0;
          }
        }
        !l && E && this.allow_dragcanvas && (this.dragging_canvas = !0);
      } else if (s.which == 2) {
        if (h.middle_click_slot_add_default_node && r && this.allow_interaction && !l && !this.read_only && !this.connecting_node && !r.flags.collapsed && !this.live_mode) {
          let E = null, T = null, b = null;
          if (r.outputs)
            for (var p = 0, v = r.outputs.length; p < v; ++p) {
              var _ = r.outputs[p], g = r.getConnectionPos(!1, p);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, g[0] - 15, g[1] - 10, 30, 20)) {
                E = _, T = p, b = !0;
                break;
              }
            }
          if (r.inputs)
            for (var p = 0, v = r.inputs.length; p < v; ++p) {
              var d = r.inputs[p], g = r.getConnectionPos(!0, p);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, g[0] - 15, g[1] - 10, 30, 20)) {
                E = d, T = p, b = !1;
                break;
              }
            }
          if (E && T !== !1) {
            const I = 0.5 - (T + 1) / (b ? r.outputs.length : r.inputs.length), S = r.getBounding(), B = [
              b ? S[0] + S[2] : S[0],
              // + node_bounding[0]/this.canvas.width*150
              s.canvasY - 80
              // + node_bounding[0]/this.canvas.width*66 // vertical "derive"
            ];
            this.createDefaultNodeForSlot("AUTO", {
              nodeFrom: b ? r : null,
              slotFrom: b ? T : null,
              nodeTo: b ? null : r,
              slotTo: b ? null : T,
              position: B,
              // ,e: e
              posAdd: [b ? 30 : -30, -I * 130],
              // -alphaPosY*30]
              posSizeFix: [b ? 0 : -1, 0]
              // -alphaPosY*2*/
            });
          }
        }
      } else if ((s.which == 3 || this.pointer_is_double) && this.allow_interaction && !l && !this.read_only) {
        let E = null;
        if (r)
          E = { type: "node", item: r }, Object.keys(this.selected_nodes).length && (this.selected_nodes[r.id] || s.shiftKey || s.ctrlKey || s.metaKey) ? this.selected_nodes[r.id] || this.selectNodes([r], !0) : this.selectNodes([r]);
        else {
          const T = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
          T != null && (this.over_link_center = null, this.dirty_canvas = !0, E = { type: "link", item: T });
        }
        this.processContextMenu(E, s);
      }
      if (this.selected_group_moving = !1, this.selected_group && !this.selected_group_resizing) {
        const T = (this.selected_group.fontSize || h.DEFAULT_GROUP_FONT_SIZE) * 1.4;
        h.isInsideRectangle(s.canvasX, s.canvasY, this.selected_group.pos[0], this.selected_group.pos[1], this.selected_group.size[0], T) && (this.selected_group_moving = !0);
      }
      return this.last_mouse[0] = s.clientX, this.last_mouse[1] = s.clientY, this.last_mouseclick = h.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!n.document.activeElement || n.document.activeElement.nodeName.toLowerCase() != "input" && n.document.activeElement.nodeName.toLowerCase() != "textarea") && s.preventDefault(), s.stopPropagation(), this.onMouseDown && this.onMouseDown(s), !1;
    }
  }
  processMouseMove(t) {
    const s = t;
    if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    N.active_canvas = this, this.adjustMouseEvent(s);
    const n = [s.clientX, s.clientY];
    this.mouse[0] = n[0], this.mouse[1] = n[1];
    const i = [
      n[0] - this.last_mouse[0],
      n[1] - this.last_mouse[1]
    ];
    if (this.last_mouse = n, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.block_click)
      return s.preventDefault(), !1;
    s.dragging = this.last_mouse_dragging, this.node_widget && (this.processNodeWidgets(
      this.node_widget[0],
      this.graph_mouse,
      s,
      this.node_widget[1]
    ), this.dirty_canvas = !0);
    const o = this.selected_group;
    if (this.selected_group && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = null), this.dragging_rectangle)
      this.dragging_rectangle[2] = s.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = s.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;
    else if (this.selected_group && !this.read_only && this.allow_interaction) {
      if (this.selected_group_resizing)
        this.selected_group.size = [
          s.canvasX - this.selected_group.pos[0],
          s.canvasY - this.selected_group.pos[1]
        ];
      else {
        const u = i[0] / this.ds.scale, f = i[1] / this.ds.scale;
        this.selected_group.move(u, f, s.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
      }
      this.dirty_bgcanvas = !0;
    } else if (this.dragging_canvas)
      this.ds.offset[0] += i[0] / this.ds.scale, this.ds.offset[1] += i[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
    else {
      const u = this.allow_interaction && !this.read_only;
      this.connecting_node && (this.dirty_canvas = !0);
      const f = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes);
      if (u)
        for (let c = 0, p = this.graph._nodes.length; c < p; ++c) {
          const v = this.graph._nodes[c];
          if (v.mouseOver && f != v) {
            v.mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this);
            const _ = this.node_over;
            this.node_over = null, this.dirty_canvas = !0, _ != this.node_over && this.onHoverChange(this.node_over, _);
          }
        }
      if (f) {
        if (f.redraw_on_mouse && (this.dirty_canvas = !0), u) {
          if (!f.mouseOver) {
            f.mouseOver = !0;
            const c = this.node_over;
            this.node_over = f, this.dirty_canvas = !0, c != this.node_over && this.onHoverChange(this.node_over, c), f.onMouseEnter && f.onMouseEnter(s, [s.canvasX - f.pos[0], s.canvasY - f.pos[1]], this);
          }
          if (f.onMouseMove && f.onMouseMove(s, [s.canvasX - f.pos[0], s.canvasY - f.pos[1]], this), this.connecting_node) {
            if (this.connecting_output) {
              var a = this._highlight_input || [0, 0];
              if (!this.isOverNodeBox(f, s.canvasX, s.canvasY)) {
                var r = this.isOverNodeInput(f, s.canvasX, s.canvasY, a);
                if (r != -1 && f.inputs[r]) {
                  var l = f.inputs[r].type;
                  h.isValidConnection(this.connecting_output.type, l) && (this._highlight_input = a, this._highlight_input_slot = f.inputs[r]);
                } else
                  this._highlight_input = null, this._highlight_input_slot = null;
              }
            } else if (this.connecting_input) {
              var a = this._highlight_output || [0, 0];
              if (!this.isOverNodeBox(f, s.canvasX, s.canvasY)) {
                var r = this.isOverNodeOutput(f, s.canvasX, s.canvasY, a);
                if (r != -1 && f.outputs[r]) {
                  var l = f.outputs[r].type;
                  h.isValidConnection(this.connecting_input.type, l) && (this._highlight_output = a);
                } else
                  this._highlight_output = null;
              }
            }
          }
          this.canvas && (h.isInsideRectangle(
            s.canvasX,
            s.canvasY,
            f.pos[0] + f.size[0] - 5,
            f.pos[1] + f.size[1] - 5,
            5,
            5
          ) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
        }
      } else {
        const c = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
        c != this.over_link_center && (this.over_link_center = c, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
      }
      if (u) {
        if (this.node_capturing_input && this.node_capturing_input != f && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(s, [s.canvasX - this.node_capturing_input.pos[0], s.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
          for (const c in this.selected_nodes) {
            const p = this.selected_nodes[c];
            p.pos[0] += i[0] / this.ds.scale, p.pos[1] += i[1] / this.ds.scale;
          }
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
        if (this.resizing_node && !this.live_mode) {
          const c = [s.canvasX - this.resizing_node.pos[0], s.canvasY - this.resizing_node.pos[1]], p = this.resizing_node.computeSize();
          c[0] = Math.max(p[0], c[0]), c[1] = Math.max(p[1], c[1]), this.resizing_node.setSize(c), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
      }
    }
    return o && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = o), s.preventDefault(), !1;
  }
  processMouseUp(t) {
    const s = t, n = !(s instanceof PointerEvent) || !s.isPrimary;
    if (!n)
      return !1;
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const o = this.getCanvasWindow().document;
    N.active_canvas = this, this.skip_events || (h.pointerListenerRemove(o, "move", this._mousemove_callback, !0), h.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), h.pointerListenerRemove(o, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(s);
    const a = h.getTime();
    if (s.click_time = a - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), s.which == 1) {
      if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, s), this.node_widget = null, this.selected_group) {
        const u = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), f = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
        this.selected_group.move(u, f, s.ctrlKey), this.selected_group.pos[0] = Math.round(
          this.selected_group.pos[0]
        ), this.selected_group.pos[1] = Math.round(
          this.selected_group.pos[1]
        ), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
      }
      this.selected_group_resizing = !1;
      var r = this.graph.getNodeOnPos(
        s.canvasX,
        s.canvasY,
        this.visible_nodes
      );
      if (this.dragging_rectangle) {
        if (this.graph) {
          const u = this.graph._nodes, f = new Float32Array(4), c = Math.abs(this.dragging_rectangle[2]), p = Math.abs(this.dragging_rectangle[3]), v = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - c : this.dragging_rectangle[0], _ = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - p : this.dragging_rectangle[1];
          if (this.dragging_rectangle[0] = v, this.dragging_rectangle[1] = _, this.dragging_rectangle[2] = c, this.dragging_rectangle[3] = p, !r || c > 10 && p > 10) {
            const g = [];
            for (let d = 0; d < u.length; ++d) {
              const y = u[d];
              y.getBounding(f), h.overlapBounding(
                this.dragging_rectangle,
                f
              ) && g.push(y);
            }
            g.length && this.selectNodes(g, s.shiftKey);
          } else
            this.selectNodes([r], s.shiftKey || s.ctrlKey);
        }
        this.dragging_rectangle = null;
      } else if (this.connecting_node) {
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        const f = (this.connecting_output || this.connecting_input).type;
        if (r) {
          if (this.connecting_output) {
            var l = this.isOverNodeInput(
              r,
              s.canvasX,
              s.canvasY
            );
            l != -1 ? this.connecting_node.connect(this.connecting_slot, r, l) : this.connecting_node.connectByTypeInput(this.connecting_slot, r, f);
          } else if (this.connecting_input) {
            var l = this.isOverNodeOutput(
              r,
              s.canvasX,
              s.canvasY
            );
            l != -1 ? r.connect(l, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, r, f);
          }
        } else
          h.release_link_on_empty_shows_menu && (s.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(s, { node_from: this.connecting_node, slotFrom: this.connecting_output, type_filter_in: this.connecting_output.type }) : this.connecting_input && this.showSearchBox(s, { node_to: this.connecting_node, slotFrom: this.connecting_input, type_filter_out: this.connecting_input.type }) : this.connecting_output ? this.showConnectionMenu({ nodeFrom: this.connecting_node, slotFrom: this.connecting_output, e: s }) : this.connecting_input && this.showConnectionMenu({ nodeTo: this.connecting_node, slotTo: this.connecting_input, e: s }));
        this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
      } else if (this.resizing_node)
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;
      else if (this.node_dragged) {
        var r = this.node_dragged;
        r && s.click_time < 300 && r.isShowingTitle(!0) && h.isInsideRectangle(
          s.canvasX,
          s.canvasY,
          r.pos[0],
          r.pos[1] - h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT
        ) && r.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
      } else {
        var r = this.graph.getNodeOnPos(
          s.canvasX,
          s.canvasY,
          this.visible_nodes
        );
        !r && s.click_time < 300 && this.deselectAllNodes(), this.dirty_canvas = !0, this.dragging_canvas = !1, this.node_over && this.node_over.onMouseUp && this.node_over.onMouseUp(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this), this.node_capturing_input && this.node_capturing_input.onMouseUp && this.node_capturing_input.onMouseUp(s, [
          s.canvasX - this.node_capturing_input.pos[0],
          s.canvasY - this.node_capturing_input.pos[1]
        ], this);
      }
    } else
      s.which == 2 ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : s.which == 3 && (this.dirty_canvas = !0, this.dragging_canvas = !1);
    return n && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), s.stopPropagation(), s.preventDefault(), !1;
  }
  processMouseWheel(t) {
    const s = t;
    if (!this.graph || !this.allow_dragcanvas)
      return;
    const n = s.wheelDeltaY != null ? s.wheelDeltaY : s.detail * -60;
    this.adjustMouseEvent(s);
    const i = s.clientX, o = s.clientY;
    if (!(!this.viewport || this.viewport && i >= this.viewport[0] && i < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3]))
      return;
    let r = this.ds.scale;
    return n > 0 ? r *= 1.1 : n < 0 && (r *= 1 / 1.1), this.ds.changeScale(r, [s.clientX, s.clientY]), this.graph.change(), s.preventDefault(), !1;
  }
}
const Q = class {
  /** changes the zoom level of the graph (default is 1), you can pass also a place used to pivot the zoom */
  setZoom(e, t) {
    this.ds.changeScale(e, t), this.maxZoom && this.ds.scale > this.maxZoom ? this.scale = this.maxZoom : this.minZoom && this.ds.scale < this.minZoom && (this.scale = this.minZoom);
  }
  /** brings a node to front (above all other nodes) */
  bringToFront(e) {
    const t = this.graph._nodes.indexOf(e);
    t != -1 && (this.graph._nodes.splice(t, 1), this.graph._nodes.push(e));
  }
  /** sends a node to the back (below all other nodes) */
  sendToBack(e) {
    const t = this.graph._nodes.indexOf(e);
    t != -1 && (this.graph._nodes.splice(t, 1), this.graph._nodes.unshift(e));
  }
  /** checks which nodes are visible (inside the camera area) */
  computeVisibleNodes(e, t = []) {
    const s = t;
    s.length = 0, e = e || this.graph._nodes;
    for (let n = 0, i = e.length; n < i; ++n) {
      const o = e[n];
      this.live_mode && !o.onDrawBackground && !o.onDrawForeground || h.overlapBounding(this.visible_area, o.getBounding(Q.temp)) && s.push(o);
    }
    return s;
  }
  /** renders the whole canvas content, by rendering in two separated canvas, one containing the background grid and the connections, and one containing the nodes) */
  draw(e = !1, t = !1) {
    if (!this.canvas || this.canvas.width == 0 || this.canvas.height == 0)
      return;
    const s = h.getTime();
    this.render_time = (s - this.last_draw_time) * 1e-3, this.last_draw_time = s, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_bgcanvas || t || this.always_render_background || this.graph && this.graph._last_trigger_time && s - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || e) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame += 1;
  }
  /** draws the front canvas (the one containing all the nodes) */
  drawFrontCanvas() {
    this.dirty_canvas = !1, this.ctx || (this.ctx = this.canvas.getContext("2d"));
    const e = this.ctx;
    if (!e)
      return;
    const t = this.canvas, s = this.viewport || this.dirty_area;
    if (s && (e.save(), e.beginPath(), e.rect(s[0], s[1], s[2], s[3]), e.clip()), this.clear_background && (s ? e.clearRect(s[0], s[1], s[2], s[3]) : e.clearRect(0, 0, t.width, t.height)), this.bgcanvas == this.canvas ? this.drawBackCanvas() : e.drawImage(this.bgcanvas, 0, 0), this.onRender && this.onRender(t, e), this.show_info && this.renderInfo(e, s ? s[0] : 0, s ? s[1] : 0), this.graph) {
      e.save(), this.ds.toCanvasContext(e);
      const i = this.computeVisibleNodes(
        null,
        this.visible_nodes
      );
      for (let o = 0; o < i.length; ++o) {
        const a = i[o];
        e.save(), e.translate(a.pos[0], a.pos[1]), this.drawNode(a, e), e.restore();
      }
      if (this.render_execution_order && this.drawExecutionOrder(e), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(e)), this.connecting_pos != null) {
        e.lineWidth = this.connections_width;
        let o = null;
        const a = this.connecting_output || this.connecting_input, r = a.type;
        let l = a.dir;
        l == null && (this.connecting_output ? l = this.connecting_node.horizontal ? A.DOWN : A.RIGHT : l = this.connecting_node.horizontal ? A.UP : A.LEFT);
        const u = a.shape;
        switch (r) {
          case O.EVENT:
            o = h.EVENT_LINK_COLOR;
            break;
          default:
            o = h.CONNECTING_LINK_COLOR;
        }
        if (this.renderLink(
          e,
          this.connecting_pos,
          [this.graph_mouse[0], this.graph_mouse[1]],
          null,
          !1,
          null,
          o,
          l,
          A.CENTER
        ), e.beginPath(), u === C.BOX_SHAPE ? (e.rect(
          this.connecting_pos[0] - 6 + 0.5,
          this.connecting_pos[1] - 5 + 0.5,
          14,
          10
        ), e.fill(), e.beginPath(), e.rect(
          this.graph_mouse[0] - 6 + 0.5,
          this.graph_mouse[1] - 5 + 0.5,
          14,
          10
        )) : u === C.ARROW_SHAPE ? (e.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + 0.5), e.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + 0.5), e.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + 0.5), e.closePath()) : (e.arc(
          this.connecting_pos[0],
          this.connecting_pos[1],
          4,
          0,
          Math.PI * 2
        ), e.fill(), e.beginPath(), e.arc(
          this.graph_mouse[0],
          this.graph_mouse[1],
          4,
          0,
          Math.PI * 2
        )), e.fill(), e.fillStyle = "#ffcc00", this._highlight_input) {
          e.beginPath();
          var n = this._highlight_input_slot.shape;
          n === C.ARROW_SHAPE ? (e.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + 0.5), e.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + 0.5), e.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + 0.5), e.closePath()) : e.arc(
            this._highlight_input[0],
            this._highlight_input[1],
            6,
            0,
            Math.PI * 2
          ), e.fill();
        }
        this._highlight_output && (e.beginPath(), n === C.ARROW_SHAPE ? (e.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + 0.5), e.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + 0.5), e.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + 0.5), e.closePath()) : e.arc(
          this._highlight_output[0],
          this._highlight_output[1],
          6,
          0,
          Math.PI * 2
        ), e.fill());
      }
      this.dragging_rectangle && (e.strokeStyle = "#FFF", e.strokeRect(
        this.dragging_rectangle[0],
        this.dragging_rectangle[1],
        this.dragging_rectangle[2],
        this.dragging_rectangle[3]
      )), this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(e, this.over_link_center) : this.onDrawLinkTooltip && this.onDrawLinkTooltip(e, null, this), this.onDrawForeground && this.onDrawForeground(e, this.visible_area), e.restore();
    }
    this._graph_stack && this._graph_stack.length && this.render_subgraph_panels && this.drawSubgraphPanel(e), this.onDrawOverlay && this.onDrawOverlay(e), s && e.restore();
  }
  /**
   * draws the panel in the corner that shows subgraph properties
   * @method drawSubgraphPanel
   */
  drawSubgraphPanel(e) {
    const t = this.graph, s = t._subgraph_node;
    if (!s) {
      console.warn("subgraph without subnode");
      return;
    }
    this.drawSubgraphPanelLeft(t, s, e), this.drawSubgraphPanelRight(t, s, e);
  }
  drawSubgraphPanelLeft(e, t, s) {
    const n = t.inputs ? t.inputs.length : 0, i = 200, o = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    if (s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(10, 10, i, (n + 1) * o + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left", s.fillText("Graph Inputs", 20, 34), this.drawButton(i - 20, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let a = 50;
    if (s.font = "14px Arial", t.inputs)
      for (let r = 0; r < t.inputs.length; ++r) {
        const l = t.inputs[r];
        l.not_subgraph_input || (s.fillStyle = "#9C9", s.beginPath(), s.arc(i - 16, a, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(l.name, 30, a + o * 0.75), s.fillStyle = "#777", s.fillText(V(l.type), 130, a + o * 0.75), a += o);
      }
    this.drawButton(20, a + 2, i - 20, o - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(t);
  }
  drawSubgraphPanelRight(e, t, s) {
    const n = t.outputs ? t.outputs.length : 0, i = this.bgcanvas.width, o = 200, a = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(i - o - 10, 10, o, (n + 1) * a + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left";
    const r = "Graph Outputs", l = s.measureText(r).width;
    if (s.fillText(r, i - l - 20, 34), this.drawButton(i - o, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let u = 50;
    if (s.font = "14px Arial", t.outputs)
      for (let f = 0; f < t.outputs.length; ++f) {
        const c = t.outputs[f];
        c.not_subgraph_output || (s.fillStyle = "#9C9", s.beginPath(), s.arc(i - o + 16, u, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(c.name, i - o + 30, u + a * 0.75), s.fillStyle = "#777", s.fillText(V(c.type), i - o + 130, u + a * 0.75), u += a);
      }
    this.drawButton(i - o, u + 2, o - 20, a - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(t);
  }
  // Draws a button into the canvas overlay and computes if it was clicked using the immediate gui paradigm
  drawButton(e, t, s, n, i, o = h.NODE_DEFAULT_COLOR, a = "#555", r = h.NODE_TEXT_COLOR, l = !1) {
    const u = !this.block_click && (l || this.allow_interaction && !this.read_only), f = this.ctx;
    let c = this.offset_mouse;
    const p = u && h.isInsideRectangle(c[0], c[1], e, t, s, n);
    c = this.last_click_position_offset;
    const v = u && c && this.pointer_is_down && h.isInsideRectangle(c[0], c[1], e, t, s, n);
    f.fillStyle = p ? a : o, v && (f.fillStyle = "#AAA"), f.beginPath(), f.roundRect(e, t, s, n, [4]), f.fill(), i != null && i.constructor == String && (f.fillStyle = r, f.textAlign = "center", f.font = `${n * 0.65 | 0}px Arial`, f.fillText(i, e + s * 0.5, t + n * 0.75), f.textAlign = "left");
    const _ = v && u;
    return v && this.blockClick(), _;
  }
  /** draws every group area in the background */
  drawGroups(e, t) {
    if (!this.graph)
      return;
    const s = this.graph._groups;
    t.save(), t.globalAlpha = 0.5 * this.editor_alpha;
    for (let n = 0; n < s.length; ++n) {
      const i = s[n];
      if (!h.overlapBounding(this.visible_area, i._bounding))
        continue;
      t.fillStyle = i.color || "#335", t.strokeStyle = i.color || "#335";
      const o = i._pos, a = i._size;
      t.globalAlpha = 0.25 * this.editor_alpha, t.beginPath(), t.rect(o[0] + 0.5, o[1] + 0.5, a[0], a[1]), t.fill(), t.globalAlpha = this.editor_alpha, t.stroke(), t.beginPath(), t.moveTo(o[0] + a[0], o[1] + a[1]), t.lineTo(o[0] + a[0] - 10, o[1] + a[1]), t.lineTo(o[0] + a[0], o[1] + a[1] - 10), t.fill();
      const r = i.font_size || h.DEFAULT_GROUP_FONT_SIZE;
      t.font = `${r}px Arial`, t.textAlign = "left", t.fillText(i.title, o[0] + 4, o[1] + r);
    }
    t.restore();
  }
  /** draws some useful stats in the corner of the canvas */
  renderInfo(e, t = 10, s) {
    s = s || this.canvas.height - 80, e.save(), e.translate(t, s), e.font = "10px Arial", e.fillStyle = "#888", e.textAlign = "left", this.graph ? (e.fillText(`T: ${this.graph.globaltime.toFixed(2)}s`, 5, 13 * 1), e.fillText(`I: ${this.graph.iteration}`, 5, 13 * 2), e.fillText(`N: ${this.graph._nodes.length} [${this.visible_nodes.length}]`, 5, 13 * 3), e.fillText(`V: ${this.graph._version}`, 5, 13 * 4), e.fillText(`FPS:${this.fps.toFixed(2)}`, 5, 13 * 5)) : e.fillText("No graph selected", 5, 13 * 1), e.restore();
  }
  /** draws the back canvas (the one containing the background and the connections) */
  drawBackCanvas() {
    const e = this.bgcanvas;
    (e.width != this.canvas.width || e.height != this.canvas.height) && (e.width = this.canvas.width, e.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    const t = this.bgctx, s = this.viewport || [0, 0, t.canvas.width, t.canvas.height];
    if (this.clear_background && t.clearRect(s[0], s[1], s[2], s[3]), this._graph_stack && this._graph_stack.length && this.render_subgraph_stack_header) {
      t.save();
      const o = this._graph_stack[this._graph_stack.length - 1].graph, a = this.graph._subgraph_node;
      t.strokeStyle = a.bgcolor, t.lineWidth = 10, t.strokeRect(1, 1, e.width - 2, e.height - 2), t.lineWidth = 1, t.font = "40px Arial", t.textAlign = "center", t.fillStyle = a.bgcolor || "#AAA";
      let r = "";
      for (let l = 1; l < this._graph_stack.length; ++l)
        r += `${o._subgraph_node.getTitle()} >> `;
      t.fillText(
        r + a.getTitle(),
        e.width * 0.5,
        40
      ), t.restore();
    }
    let n = !1;
    if (this.onRenderBackground && this.onRenderBackground(e, t) && (n = !0), this.viewport || (t.restore(), t.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
      if (t.save(), this.ds.toCanvasContext(t), this.background_image && this.ds.scale > 0.5 && !n) {
        this.zoom_modify_alpha ? t.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : t.globalAlpha = this.editor_alpha, t.imageSmoothingEnabled = t.imageSmoothingEnabled = !1, (!this._bg_img || this._bg_img.name != this.background_image) && (this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image, this._bg_img.onload = () => {
          this.draw(!0, !0);
        });
        let i = null;
        this._pattern == null && this._bg_img.width > 0 ? (i = t.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = i) : i = this._pattern, i && (t.fillStyle = i, t.fillRect(
          this.visible_area[0],
          this.visible_area[1],
          this.visible_area[2],
          this.visible_area[3]
        ), t.fillStyle = "transparent"), t.globalAlpha = 1, t.imageSmoothingEnabled = t.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && !this.live_mode && this.drawGroups(e, t), this.onDrawBackground && this.onDrawBackground(t, this.visible_area), h.debug && (t.fillStyle = "red", t.fillRect(this.visible_area[0] + 10, this.visible_area[1] + 10, this.visible_area[2] - 20, this.visible_area[3] - 20)), this.render_canvas_border && (t.strokeStyle = "#235", t.strokeRect(0, 0, e.width, e.height)), this.render_connections_shadows ? (t.shadowColor = "#000", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 6) : t.shadowColor = "rgba(0,0,0,0)", !this.live_mode && this.render_connections && this.drawConnections(t), t.shadowColor = "rgba(0,0,0,0)", t.restore();
    }
    this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
  }
  /** draws the given node inside the canvas */
  drawNode(e, t) {
    this.current_node = e;
    const s = e.color || e.constructor.color || h.NODE_DEFAULT_COLOR;
    let n = e.bgcolor || e.constructor.bgcolor || h.NODE_DEFAULT_BGCOLOR;
    e.mouseOver;
    const i = this.ds.scale < 0.6;
    if (this.live_mode) {
      e.flags.collapsed || (t.shadowColor = "transparent", e.onDrawForeground && e.onDrawForeground(t, this, this.canvas));
      return;
    }
    const o = this.editor_alpha;
    if (t.globalAlpha = o, this.render_shadows && !i ? (t.shadowColor = h.DEFAULT_SHADOW_COLOR, t.shadowOffsetX = 2 * this.ds.scale, t.shadowOffsetY = 2 * this.ds.scale, t.shadowBlur = 3 * this.ds.scale) : t.shadowColor = "transparent", e.flags.collapsed && e.onDrawCollapsed && e.onDrawCollapsed(t, this) == !0)
      return;
    const a = e.shape || C.BOX_SHAPE, r = Q.temp_vec2;
    Q.temp_vec2.set(e.size);
    const l = e.horizontal;
    if (e.flags.collapsed) {
      t.font = this.inner_text_font;
      const b = e.getTitle ? e.getTitle() : e.title;
      b != null && (e._collapsed_width = Math.min(
        e.size[0],
        t.measureText(b).width + h.NODE_TITLE_HEIGHT * 2
      ), r[0] = e._collapsed_width, r[1] = 0);
    }
    e.clip_area && (t.save(), t.beginPath(), a == C.BOX_SHAPE ? t.rect(0, 0, r[0], r[1]) : a == C.ROUND_SHAPE ? t.roundRect(0, 0, r[0], r[1], [10]) : a == C.CIRCLE_SHAPE && t.arc(
      r[0] * 0.5,
      r[1] * 0.5,
      r[0] * 0.5,
      0,
      Math.PI * 2
    ), t.clip()), e.has_errors && (n = "red"), this.drawNodeShape(
      e,
      t,
      [r[0], r[1]],
      s,
      n,
      e.is_selected,
      e.mouseOver
    ), t.shadowColor = "transparent", e.onDrawForeground && e.onDrawForeground(t, this, this.canvas), t.textAlign = l ? "center" : "left", t.font = this.inner_text_font;
    const u = !i, f = this.connecting_output, c = this.connecting_input;
    t.lineWidth = 1;
    let p = 0;
    const v = [0, 0];
    if (e.flags.collapsed) {
      if (this.render_collapsed_slots) {
        let b = null, I = null;
        if (e.inputs)
          for (let S = 0; S < e.inputs.length; S++) {
            const B = e.inputs[S];
            if (B.link != null) {
              b = B;
              break;
            }
          }
        if (e.outputs)
          for (let S = 0; S < e.outputs.length; S++) {
            const B = e.outputs[S];
            !B.links || !B.links.length || (I = B);
          }
        if (b) {
          var E = 0, T = h.NODE_TITLE_HEIGHT * -0.5;
          l && (E = e._collapsed_width * 0.5, T = -h.NODE_TITLE_HEIGHT), t.fillStyle = "#686", t.beginPath(), b.shape === C.BOX_SHAPE ? t.rect(E - 7 + 0.5, T - 4, 14, 8) : b.shape === C.ARROW_SHAPE ? (t.moveTo(E + 8, T), t.lineTo(E + -4, T - 4), t.lineTo(E + -4, T + 4), t.closePath()) : t.arc(E, T, 4, 0, Math.PI * 2), t.fill();
        }
        if (I) {
          var E = e._collapsed_width, T = h.NODE_TITLE_HEIGHT * -0.5;
          l && (E = e._collapsed_width * 0.5, T = 0), t.fillStyle = "#686", t.strokeStyle = "black", t.beginPath(), I.shape === C.BOX_SHAPE ? t.rect(E - 7 + 0.5, T - 4, 14, 8) : I.shape === C.ARROW_SHAPE ? (t.moveTo(E + 6, T), t.lineTo(E - 6, T - 4), t.lineTo(E - 6, T + 4), t.closePath()) : t.arc(E, T, 4, 0, Math.PI * 2), t.fill();
        }
      }
    } else {
      if (e.inputs)
        for (let b = 0; b < e.inputs.length; b++) {
          const I = e.inputs[b];
          var _ = I.type, g = I.shape;
          t.globalAlpha = o, this.connecting_output && !h.isValidConnection(I.type, f.type) ? t.globalAlpha = 0.4 * o : t.globalAlpha = o, t.fillStyle = I.link != null ? I.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[_] || N.DEFAULT_CONNECTION_COLORS.input_on : I.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[_] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[_] || N.DEFAULT_CONNECTION_COLORS.input_off;
          var d = e.getConnectionPos(!0, b, [v[0], v[1]]);
          d[0] -= e.pos[0], d[1] -= e.pos[1], p < d[1] + h.NODE_SLOT_HEIGHT * 0.5 && (p = d[1] + h.NODE_SLOT_HEIGHT * 0.5), t.beginPath();
          var y = !0;
          if (I.shape === C.BOX_SHAPE ? l ? t.rect(
            d[0] - 5 + 0.5,
            d[1] - 8 + 0.5,
            10,
            14
          ) : t.rect(
            d[0] - 6 + 0.5,
            d[1] - 5 + 0.5,
            14,
            10
          ) : g === C.ARROW_SHAPE ? (t.moveTo(d[0] + 8, d[1] + 0.5), t.lineTo(d[0] - 4, d[1] + 6 + 0.5), t.lineTo(d[0] - 4, d[1] - 6 + 0.5), t.closePath()) : g === C.GRID_SHAPE ? (t.rect(d[0] - 4, d[1] - 4, 2, 2), t.rect(d[0] - 1, d[1] - 4, 2, 2), t.rect(d[0] + 2, d[1] - 4, 2, 2), t.rect(d[0] - 4, d[1] - 1, 2, 2), t.rect(d[0] - 1, d[1] - 1, 2, 2), t.rect(d[0] + 2, d[1] - 1, 2, 2), t.rect(d[0] - 4, d[1] + 2, 2, 2), t.rect(d[0] - 1, d[1] + 2, 2, 2), t.rect(d[0] + 2, d[1] + 2, 2, 2), y = !1) : i ? t.rect(d[0] - 4, d[1] - 4, 8, 8) : t.arc(d[0], d[1], 4, 0, Math.PI * 2), t.fill(), u) {
            var m = I.label != null ? I.label : I.name;
            m && (t.fillStyle = h.NODE_TEXT_COLOR, l || I.dir == A.UP ? t.fillText(m, d[0], d[1] - 10) : t.fillText(m, d[0] + 10, d[1] + 5));
          }
        }
      if (t.textAlign = l ? "center" : "right", t.strokeStyle = "black", e.outputs)
        for (let b = 0; b < e.outputs.length; b++) {
          const I = e.outputs[b];
          var _ = I.type, g = I.shape;
          this.connecting_input && !h.isValidConnection(c.type, _) ? t.globalAlpha = 0.4 * o : t.globalAlpha = o;
          var d = e.getConnectionPos(!1, b, v);
          d[0] -= e.pos[0], d[1] -= e.pos[1], p < d[1] + h.NODE_SLOT_HEIGHT * 0.5 && (p = d[1] + h.NODE_SLOT_HEIGHT * 0.5), t.fillStyle = I.links && I.links.length ? I.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[_] || N.DEFAULT_CONNECTION_COLORS.output_on : I.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[_] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[_] || N.DEFAULT_CONNECTION_COLORS.output_off, t.beginPath();
          var y = !0;
          if (g === C.BOX_SHAPE ? l ? t.rect(
            d[0] - 5 + 0.5,
            d[1] - 8 + 0.5,
            10,
            14
          ) : t.rect(
            d[0] - 6 + 0.5,
            d[1] - 5 + 0.5,
            14,
            10
          ) : g === C.ARROW_SHAPE ? (t.moveTo(d[0] + 8, d[1] + 0.5), t.lineTo(d[0] - 4, d[1] + 6 + 0.5), t.lineTo(d[0] - 4, d[1] - 6 + 0.5), t.closePath()) : g === C.GRID_SHAPE ? (t.rect(d[0] - 4, d[1] - 4, 2, 2), t.rect(d[0] - 1, d[1] - 4, 2, 2), t.rect(d[0] + 2, d[1] - 4, 2, 2), t.rect(d[0] - 4, d[1] - 1, 2, 2), t.rect(d[0] - 1, d[1] - 1, 2, 2), t.rect(d[0] + 2, d[1] - 1, 2, 2), t.rect(d[0] - 4, d[1] + 2, 2, 2), t.rect(d[0] - 1, d[1] + 2, 2, 2), t.rect(d[0] + 2, d[1] + 2, 2, 2), y = !1) : i ? t.rect(d[0] - 4, d[1] - 4, 8, 8) : t.arc(d[0], d[1], 4, 0, Math.PI * 2), t.fill(), !i && y && t.stroke(), u) {
            var m = I.label != null ? I.label : I.name;
            m && (t.fillStyle = h.NODE_TEXT_COLOR, l || I.dir == A.DOWN ? t.fillText(m, d[0], d[1] - 8) : t.fillText(m, d[0] - 10, d[1] + 5));
          }
        }
      if (t.textAlign = "left", t.globalAlpha = 1, e.widgets) {
        let b = p;
        (l || e.widgets_up) && (b = 2), e.widgets_start_y != null && (b = e.widgets_start_y), this.drawNodeWidgets(
          e,
          b,
          t,
          this.node_widget && this.node_widget[0] == e ? this.node_widget[1] : null
        );
      }
    }
    e.clip_area && t.restore(), t.globalAlpha = 1;
  }
  /** used by this.over_link_center */
  drawLinkTooltip(e, t) {
    const s = t._pos;
    if (this.allow_interaction && !this.read_only && (e.fillStyle = "black", e.beginPath(), e.arc(s[0], s[1], 3, 0, Math.PI * 2), e.fill()), t.data == null || this.onDrawLinkTooltip && this.onDrawLinkTooltip(e, t, this) == !0)
      return;
    const n = t.data;
    let i = null;
    if (n.constructor === Number ? i = n.toFixed(2) : n.constructor === String ? i = `"${n}"` : n.constructor === Boolean ? i = String(n) : n.toToolTip ? i = n.toToolTip() : i = `[${n.constructor.name}]`, i == null)
      return;
    i = i.substr(0, 30), e.font = "14px Courier New";
    const a = e.measureText(i).width + 20, r = 24;
    e.shadowColor = "black", e.shadowOffsetX = 2, e.shadowOffsetY = 2, e.shadowBlur = 3, e.fillStyle = "#454", e.beginPath(), e.roundRect(s[0] - a * 0.5, s[1] - 15 - r, a, r, [3]), e.moveTo(s[0] - 10, s[1] - 15), e.lineTo(s[0] + 10, s[1] - 15), e.lineTo(s[0], s[1] - 5), e.fill(), e.shadowColor = "transparent", e.textAlign = "center", e.fillStyle = "#CEC", e.fillText(i, s[0], s[1] - 15 - r * 0.3);
  }
  /** draws the shape of the given node in the canvas */
  drawNodeShape(e, t, s, n, i, o, a) {
    t.strokeStyle = n, t.fillStyle = i;
    const r = h.NODE_TITLE_HEIGHT, l = this.ds.scale < 0.5, u = e.shape || e.constructor.shape || C.ROUND_SHAPE, f = e.titleMode, c = e.isShowingTitle(a), p = Q.tmp_area;
    p[0] = 0, p[1] = c ? -r : 0, p[2] = s[0] + 1, p[3] = c ? s[1] + r : s[1];
    const v = t.globalAlpha;
    if (t.beginPath(), u == C.BOX_SHAPE || l ? t.fillRect(p[0], p[1], p[2], p[3]) : u == C.ROUND_SHAPE || u == C.CARD_SHAPE ? t.roundRect(
      p[0],
      p[1],
      p[2],
      p[3],
      u == C.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]
    ) : u == C.CIRCLE_SHAPE && t.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5,
      0,
      Math.PI * 2
    ), t.fill(), !e.flags.collapsed && c && (t.shadowColor = "transparent", t.fillStyle = "rgba(0,0,0,0.2)", t.fillRect(0, -1, p[2], 2)), t.shadowColor = "transparent", e.onDrawBackground && e.onDrawBackground(t, this, this.canvas, this.graph_mouse), c || f == ee.TRANSPARENT_TITLE) {
      if (e.onDrawTitleBar)
        e.onDrawTitleBar(t, this, r, s, this.ds.scale, n);
      else if (f != ee.TRANSPARENT_TITLE && (e.constructor.title_color || this.render_title_colored)) {
        const d = e.constructor.title_color || n;
        if (e.flags.collapsed && (t.shadowColor = h.DEFAULT_SHADOW_COLOR), this.use_gradients) {
          let y = N.gradients[d];
          y || (y = N.gradients[d] = t.createLinearGradient(0, 0, 400, 0), y.addColorStop(0, d), y.addColorStop(1, "#000")), t.fillStyle = y;
        } else
          t.fillStyle = d;
        t.beginPath(), u == C.BOX_SHAPE || l ? t.rect(0, -r, s[0] + 1, r) : (u == C.ROUND_SHAPE || u == C.CARD_SHAPE) && t.roundRect(
          0,
          -r,
          s[0] + 1,
          r,
          e.flags.collapsed ? [this.round_radius] : [this.round_radius, this.round_radius, 0, 0]
        ), t.fill(), t.shadowColor = "transparent";
      }
      let _ = null;
      h.node_box_coloured_by_mode && ye[e.mode] && (_ = ye[e.mode]), h.node_box_coloured_when_on && (_ = e.action_triggered ? "#FFF" : e.execute_triggered ? "#AAA" : _);
      const g = 10;
      if (e.onDrawTitleBox ? e.onDrawTitleBox(t, this, r, s, this.ds.scale) : u == C.ROUND_SHAPE || u == C.CIRCLE_SHAPE || u == C.CARD_SHAPE ? (l && (t.fillStyle = "black", t.beginPath(), t.arc(
        r * 0.5,
        r * -0.5,
        g * 0.5 + 1,
        0,
        Math.PI * 2
      ), t.fill()), t.fillStyle = e.boxcolor || _ || h.NODE_DEFAULT_BOXCOLOR, l ? t.fillRect(r * 0.5 - g * 0.5, r * -0.5 - g * 0.5, g, g) : (t.beginPath(), t.arc(
        r * 0.5,
        r * -0.5,
        g * 0.5,
        0,
        Math.PI * 2
      ), t.fill())) : (l && (t.fillStyle = "black", t.fillRect(
        (r - g) * 0.5 - 1,
        (r + g) * -0.5 - 1,
        g + 2,
        g + 2
      )), t.fillStyle = e.boxcolor || _ || h.NODE_DEFAULT_BOXCOLOR, t.fillRect(
        (r - g) * 0.5,
        (r + g) * -0.5,
        g,
        g
      )), t.globalAlpha = v, e.onDrawTitleText && e.onDrawTitleText(
        t,
        this,
        r,
        s,
        this.ds.scale,
        this.title_text_font,
        o
      ), !l) {
        t.font = this.title_text_font;
        const d = String(e.getTitle());
        d && (o ? t.fillStyle = h.NODE_SELECTED_TITLE_COLOR : t.fillStyle = e.constructor.title_text_color || this.node_title_color, e.flags.collapsed ? (t.textAlign = "left", t.fillText(
          d.substr(0, 20),
          // avoid urls too long
          r,
          // + measure.width * 0.5,
          h.NODE_TITLE_TEXT_Y - r
        ), t.textAlign = "left") : (t.textAlign = "left", t.fillText(
          d,
          r,
          h.NODE_TITLE_TEXT_Y - r
        )));
      }
      if (!e.flags.collapsed && e.subgraph && !e.skip_subgraph_button) {
        const d = h.NODE_TITLE_HEIGHT, y = e.size[0] - d, m = h.isInsideRectangle(this.graph_mouse[0] - e.pos[0], this.graph_mouse[1] - e.pos[1], y + 2, -d + 2, d - 4, d - 4);
        t.fillStyle = m ? "#888" : "#555", u == C.BOX_SHAPE || l ? t.fillRect(y + 2, -d + 2, d - 4, d - 4) : (t.beginPath(), t.roundRect(y + 2, -d + 2, d - 4, d - 4, [4]), t.fill()), t.fillStyle = "#333", t.beginPath(), t.moveTo(y + d * 0.2, -d * 0.6), t.lineTo(y + d * 0.8, -d * 0.6), t.lineTo(y + d * 0.5, -d * 0.3), t.fill();
      }
      e.onDrawTitle && e.onDrawTitle(t, this);
    }
    o && (e.onBounding && e.onBounding(p), f == ee.TRANSPARENT_TITLE && (p[1] -= r, p[3] += r), t.lineWidth = 1, t.globalAlpha = 0.8, t.beginPath(), u == C.BOX_SHAPE ? t.rect(
      -6 + p[0],
      -6 + p[1],
      12 + p[2],
      12 + p[3]
    ) : u == C.ROUND_SHAPE || u == C.CARD_SHAPE && e.flags.collapsed ? t.roundRect(
      -6 + p[0],
      -6 + p[1],
      12 + p[2],
      12 + p[3],
      [this.round_radius * 2]
    ) : u == C.CARD_SHAPE ? t.roundRect(
      -6 + p[0],
      -6 + p[1],
      12 + p[2],
      12 + p[3],
      [this.round_radius * 2, 2, this.round_radius * 2, 2]
    ) : u == C.CIRCLE_SHAPE && t.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5 + 6,
      0,
      Math.PI * 2
    ), t.strokeStyle = h.NODE_BOX_OUTLINE_COLOR, t.stroke(), t.strokeStyle = n, t.globalAlpha = 1), e.execute_triggered > 0 && e.execute_triggered--, e.action_triggered > 0 && e.action_triggered--;
  }
  /** draws every connection visible in the canvas */
  drawConnections(e) {
    const t = h.getTime(), s = this.visible_area, n = Q.margin_area;
    n[0] = s[0] - 20, n[1] = s[1] - 20, n[2] = s[2] + 40, n[3] = s[3] + 40, e.lineWidth = this.connections_width, e.fillStyle = "#AAA", e.strokeStyle = "#AAA", e.globalAlpha = this.editor_alpha;
    const i = this.graph._nodes;
    for (let o = 0, a = i.length; o < a; ++o) {
      const r = i[o];
      if (!(!r.inputs || !r.inputs.length))
        for (let l = 0; l < r.inputs.length; ++l) {
          const u = r.inputs[l];
          if (!u || u.link == null)
            continue;
          const f = u.link, c = this.graph.links[f];
          if (!c)
            continue;
          const p = this.graph.getNodeById(c.origin_id);
          if (p == null)
            continue;
          const v = c.origin_slot;
          let _ = null;
          v == -1 ? _ = [
            p.pos[0] + 10,
            p.pos[1] + 10
          ] : _ = p.getConnectionPos(
            !1,
            v,
            Q.tempA
          );
          const g = r.getConnectionPos(!0, l, Q.tempB), d = Q.link_bounding;
          if (d[0] = _[0], d[1] = _[1], d[2] = g[0] - _[0], d[3] = g[1] - _[1], d[2] < 0 && (d[0] += d[2], d[2] = Math.abs(d[2])), d[3] < 0 && (d[1] += d[3], d[3] = Math.abs(d[3])), !h.overlapBounding(d, n))
            continue;
          const y = p.outputs[v], m = r.inputs[l];
          if (!y || !m)
            continue;
          const E = y.dir || (p.horizontal ? A.DOWN : A.RIGHT), T = m.dir || (r.horizontal ? A.UP : A.LEFT);
          if (this.renderLink(
            e,
            _,
            g,
            c,
            !1,
            !1,
            null,
            E,
            T
          ), c && c._last_time && t - c._last_time < 1e3) {
            const b = 2 - (t - c._last_time) * 2e-3, I = e.globalAlpha;
            e.globalAlpha = I * b, this.renderLink(
              e,
              _,
              g,
              c,
              !0,
              !0,
              "white",
              E,
              T
            ), e.globalAlpha = I;
          }
        }
    }
    e.globalAlpha = 1;
  }
  /**
   * draws a link between two points
   * @param a start pos
   * @param b end pos
   * @param link the link object with all the link info
   * @param skipBorder ignore the shadow of the link
   * @param flow show flow animation (for events)
   * @param color the color for the link
   * @param startDir the direction enum
   * @param endDir the direction enum
   * @param numSublines number of sublines (useful to represent vec3 or rgb)
   */
  renderLink(e, t, s, n, i, o, a, r, l, u) {
    n && this.visible_links.push(n), !a && n && (a = n.color || this.link_type_colors[n.type]), a || (a = this.default_link_color), n != null && this.highlighted_links[n.id] && (a = "#FFF"), r = r || A.RIGHT, l = l || A.LEFT;
    const f = h.distance(t, s);
    this.render_connections_border && this.ds.scale > 0.6 && (e.lineWidth = this.connections_width + 4), e.lineJoin = "round", u = u || 1, u > 1 && (e.lineWidth = 0.5), e.beginPath();
    for (var c = 0; c < u; c += 1) {
      const y = (c - (u - 1) * 0.5) * 5;
      if (this.links_render_mode == pe.SPLINE_LINK) {
        e.moveTo(t[0], t[1] + y);
        var p = 0, v = 0, _ = 0, g = 0;
        switch (r) {
          case A.LEFT:
            p = f * -0.25;
            break;
          case A.RIGHT:
            p = f * 0.25;
            break;
          case A.UP:
            v = f * -0.25;
            break;
          case A.DOWN:
            v = f * 0.25;
            break;
        }
        switch (l) {
          case A.LEFT:
            _ = f * -0.25;
            break;
          case A.RIGHT:
            _ = f * 0.25;
            break;
          case A.UP:
            g = f * -0.25;
            break;
          case A.DOWN:
            g = f * 0.25;
            break;
        }
        e.bezierCurveTo(
          t[0] + p,
          t[1] + v + y,
          s[0] + _,
          s[1] + g + y,
          s[0],
          s[1] + y
        );
      } else if (this.links_render_mode == pe.LINEAR_LINK) {
        e.moveTo(t[0], t[1] + y);
        var p = 0, v = 0, _ = 0, g = 0;
        switch (r) {
          case A.LEFT:
            p = -1;
            break;
          case A.RIGHT:
            p = 1;
            break;
          case A.UP:
            v = -1;
            break;
          case A.DOWN:
            v = 1;
            break;
        }
        switch (l) {
          case A.LEFT:
            _ = -1;
            break;
          case A.RIGHT:
            _ = 1;
            break;
          case A.UP:
            g = -1;
            break;
          case A.DOWN:
            g = 1;
            break;
        }
        const I = 15;
        e.lineTo(
          t[0] + p * I,
          t[1] + v * I + y
        ), e.lineTo(
          s[0] + _ * I,
          s[1] + g * I + y
        ), e.lineTo(s[0], s[1] + y);
      } else if (this.links_render_mode == pe.STRAIGHT_LINK) {
        e.moveTo(t[0], t[1]);
        let m = t[0], E = t[1], T = s[0], b = s[1];
        r == A.RIGHT ? m += 10 : E += 10, l == A.LEFT ? T -= 10 : b -= 10, e.lineTo(m, E), e.lineTo((m + T) * 0.5, E), e.lineTo((m + T) * 0.5, b), e.lineTo(T, b), e.lineTo(s[0], s[1]);
      } else
        return;
    }
    this.render_connections_border && this.ds.scale > 0.6 && !i && (e.strokeStyle = "rgba(0,0,0,0.5)", e.stroke()), e.lineWidth = this.connections_width, e.fillStyle = e.strokeStyle = a, e.stroke();
    var d = this.computeConnectionPoint(t, s, 0.5, r, l);
    if (n && n._pos && (n._pos[0] = d[0], n._pos[1] = d[1]), this.ds.scale >= 0.6 && this.highquality_render && l != A.CENTER) {
      if (this.render_connection_arrows) {
        const y = this.computeConnectionPoint(
          t,
          s,
          0.25,
          r,
          l
        ), m = this.computeConnectionPoint(
          t,
          s,
          0.26,
          r,
          l
        ), E = this.computeConnectionPoint(
          t,
          s,
          0.75,
          r,
          l
        ), T = this.computeConnectionPoint(
          t,
          s,
          0.76,
          r,
          l
        );
        let b = 0, I = 0;
        this.render_curved_connections ? (b = -Math.atan2(m[0] - y[0], m[1] - y[1]), I = -Math.atan2(T[0] - E[0], T[1] - E[1])) : I = b = s[1] > t[1] ? 0 : Math.PI, e.save(), e.translate(y[0], y[1]), e.rotate(b), e.beginPath(), e.moveTo(-5, -3), e.lineTo(0, 7), e.lineTo(5, -3), e.fill(), e.restore(), e.save(), e.translate(E[0], E[1]), e.rotate(I), e.beginPath(), e.moveTo(-5, -3), e.lineTo(0, 7), e.lineTo(5, -3), e.fill(), e.restore();
      }
      e.beginPath(), e.arc(d[0], d[1], 5, 0, Math.PI * 2), e.fill();
    }
    if (o) {
      e.fillStyle = a;
      for (var c = 0; c < 5; ++c) {
        const m = (h.getTime() * 1e-3 + c * 0.2) % 1;
        var d = this.computeConnectionPoint(
          t,
          s,
          m,
          r,
          l
        );
        e.beginPath(), e.arc(d[0], d[1], 5, 0, 2 * Math.PI), e.fill();
      }
    }
  }
  computeConnectionPoint(e, t, s, n = A.RIGHT, i = A.LEFT) {
    const o = h.distance(e, t), a = e, r = [e[0], e[1]], l = [t[0], t[1]], u = t;
    switch (n) {
      case A.LEFT:
        r[0] += o * -0.25;
        break;
      case A.RIGHT:
        r[0] += o * 0.25;
        break;
      case A.UP:
        r[1] += o * -0.25;
        break;
      case A.DOWN:
        r[1] += o * 0.25;
        break;
    }
    switch (i) {
      case A.LEFT:
        l[0] += o * -0.25;
        break;
      case A.RIGHT:
        l[0] += o * 0.25;
        break;
      case A.UP:
        l[1] += o * -0.25;
        break;
      case A.DOWN:
        l[1] += o * 0.25;
        break;
    }
    const f = (1 - s) * (1 - s) * (1 - s), c = 3 * ((1 - s) * (1 - s)) * s, p = 3 * (1 - s) * (s * s), v = s * s * s, _ = f * a[0] + c * r[0] + p * l[0] + v * u[0], g = f * a[1] + c * r[1] + p * l[1] + v * u[1];
    return [_, g];
  }
  drawExecutionOrder(e) {
    e.shadowColor = "transparent", e.globalAlpha = 0.25, e.textAlign = "center", e.strokeStyle = "white", e.globalAlpha = 0.75;
    const t = this.visible_nodes;
    for (let s = 0; s < t.length; ++s) {
      const n = t[s];
      e.fillStyle = "black", e.fillRect(
        n.pos[0] - h.NODE_TITLE_HEIGHT,
        n.pos[1] - h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), n.order == 0 && e.strokeRect(
        n.pos[0] - h.NODE_TITLE_HEIGHT + 0.5,
        n.pos[1] - h.NODE_TITLE_HEIGHT + 0.5,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), e.fillStyle = "#FFF", e.fillText(
        `${n.order}`,
        n.pos[0] + h.NODE_TITLE_HEIGHT * -0.5,
        n.pos[1] - 6
      );
    }
    e.globalAlpha = 1;
  }
  /** draws the widgets stored inside a node */
  drawNodeWidgets(e, t, s, n) {
    if (!e.widgets || !e.widgets.length)
      return;
    const i = e.size[0], o = e.widgets;
    t += 2;
    const a = h.NODE_WIDGET_HEIGHT, r = this.ds.scale > 0.5;
    s.save(), s.globalAlpha = this.editor_alpha;
    const l = h.WIDGET_OUTLINE_COLOR, u = h.WIDGET_BGCOLOR, f = h.WIDGET_TEXT_COLOR, c = h.WIDGET_SECONDARY_TEXT_COLOR, p = 15;
    for (let g = 0; g < o.length; ++g) {
      const d = o[g];
      if (d.hidden)
        continue;
      let y = t;
      d.y && (y = d.y), d.last_y = y, s.strokeStyle = l, s.fillStyle = "#222", s.textAlign = "left", d.disabled && (s.globalAlpha *= 0.5);
      const m = d.width || i;
      switch (d.type) {
        case "button":
          d.clicked && (s.fillStyle = "#AAA", d.clicked = !1, this.dirty_canvas = !0), s.fillRect(p, y, m - p * 2, a), r && !d.disabled && !h.ignore_all_widget_events && s.strokeRect(p, y, m - p * 2, a), r && (s.textAlign = "center", s.fillStyle = f, s.fillText(d.name, m * 0.5, y + a * 0.7));
          break;
        case "toggle":
          s.textAlign = "left", s.strokeStyle = l, s.fillStyle = u, s.beginPath(), r ? s.roundRect(p, y, m - p * 2, a, [a * 0.5]) : s.rect(p, y, m - p * 2, a), s.fill(), r && !d.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = d.value ? "#89A" : "#333", s.beginPath(), s.arc(m - p * 2, y + a * 0.5, a * 0.36, 0, Math.PI * 2), s.fill(), r && (s.fillStyle = c, d.name != null && s.fillText(d.name, p * 2, y + a * 0.7), s.fillStyle = d.value ? f : c, s.textAlign = "right", s.fillText(
            d.value ? d.options.on || "true" : d.options.off || "false",
            m - 40,
            y + a * 0.7
          ));
          break;
        case "slider":
          s.fillStyle = u, s.fillRect(p, y, m - p * 2, a);
          var v = d.options.max - d.options.min, _ = (d.value - d.options.min) / v;
          if (s.fillStyle = n == d ? "#89A" : "#678", s.fillRect(p, y, _ * (m - p * 2), a), r && !d.disabled && s.strokeRect(p, y, m - p * 2, a), d.marker) {
            const E = (+d.marker - d.options.min) / v;
            s.fillStyle = "#AA9", s.fillRect(p + E * (m - p * 2), y, 2, a);
          }
          r && (s.textAlign = "center", s.fillStyle = f, s.fillText(
            `${d.name}  ${Number(d.value).toFixed(3)}`,
            m * 0.5,
            y + a * 0.7
          ));
          break;
        case "number":
        case "combo":
          if (s.textAlign = "left", s.strokeStyle = l, s.fillStyle = u, s.beginPath(), r ? s.roundRect(p, y, m - p * 2, a, [a * 0.5]) : s.rect(p, y, m - p * 2, a), s.fill(), r)
            if (!d.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = f, !d.disabled && !h.ignore_all_widget_events && (s.beginPath(), s.moveTo(p + 16, y + 5), s.lineTo(p + 6, y + a * 0.5), s.lineTo(p + 16, y + a - 5), s.fill(), s.beginPath(), s.moveTo(m - p - 16, y + 5), s.lineTo(m - p - 6, y + a * 0.5), s.lineTo(m - p - 16, y + a - 5), s.fill()), s.fillStyle = c, s.fillText(d.name, p * 2 + 5, y + a * 0.7), s.fillStyle = f, s.textAlign = "right", d.type == "number")
              s.fillText(
                Number(d.value).toFixed(
                  d.options.precision !== void 0 ? d.options.precision : 3
                ),
                m - p * 2 - 20,
                y + a * 0.7
              );
            else {
              let E = d.value;
              if (d.options.values) {
                let T = d.options.values;
                T.constructor === Function && (T = T()), T && T.constructor !== Array && (E = T[d.value]);
              }
              s.fillText(
                E,
                m - p * 2 - 20,
                y + a * 0.7
              );
            }
          break;
        case "string":
        case "text":
          s.textAlign = "left", s.strokeStyle = l, s.fillStyle = u, s.beginPath(), r ? s.roundRect(p, y, m - p * 2, a, [a * 0.5]) : s.rect(p, y, m - p * 2, a), s.fill(), r && (d.disabled || s.stroke(), s.save(), s.beginPath(), s.rect(p, y, m - p * 2, a), s.clip(), s.fillStyle = c, d.name != null && s.fillText(d.name, p * 2, y + a * 0.7), s.fillStyle = f, s.textAlign = "right", s.fillText(String(d.value).substr(0, d.options.max_length || 30), m - p * 2, y + a * 0.7), s.restore());
          break;
        default:
          d.draw && d.draw(s, e, m, y, a);
          break;
      }
      t += (d.computeSize ? d.computeSize(m)[1] : a) + 4, s.globalAlpha = this.editor_alpha;
    }
    s.restore(), s.textAlign = "left";
  }
};
let M = Q;
M.temp = new Float32Array(4);
M.temp_vec2 = new Float32Array(2);
M.tmp_area = new Float32Array(4);
M.margin_area = new Float32Array(4);
M.link_bounding = new Float32Array(4);
M.tempA = [0, 0];
M.tempB = [0, 0];
class fe {
  constructor(t = "Group") {
    this.fontSize = h.DEFAULT_GROUP_FONT_SIZE, this._nodes = [], this.graph = null, this._bounding = new Float32Array([10, 10, 140, 80]), this.title = t, this.color = N.node_colors.pale_blue ? N.node_colors.pale_blue.groupcolor : "#AAA", this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4);
  }
  get bounding() {
    return this._bounding;
  }
  get pos() {
    return [this._pos[0], this._pos[1]];
  }
  set pos(t) {
    !t || t.length < 2 || (this._pos[0] = t[0], this._pos[1] = t[1]);
  }
  get size() {
    return [this._size[0], this._size[1]];
  }
  set size(t) {
    !t || t.length < 2 || (this._size[0] = Math.max(140, t[0]), this._size[1] = Math.max(80, t[1]));
  }
  configure(t) {
    t.bounding, this.title = t.title, this._bounding.set(t.bounding), this.color = t.color, this.font = t.font;
  }
  serialize() {
    const t = this._bounding;
    return {
      title: this.title,
      bounding: [
        Math.round(t[0]),
        Math.round(t[1]),
        Math.round(t[2]),
        Math.round(t[3])
      ],
      color: this.color,
      font: this.font
    };
  }
  move(t, s, n) {
    if (this._pos[0] += t, this._pos[1] += s, !n)
      for (let i = 0; i < this._nodes.length; ++i) {
        const o = this._nodes[i];
        o.pos[0] += t, o.pos[1] += s;
      }
  }
  recomputeInsideNodes() {
    this._nodes.length = 0;
    const t = this.graph._nodes, s = new Float32Array(4);
    for (let n = 0; n < t.length; ++n) {
      const i = t[n];
      i.getBounding(s), h.overlapBounding(this._bounding, s) && this._nodes.push(i);
    }
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(t, s, n = 0, i = !1) {
    let o = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    return i && (o = 0), this.pos[0] - 4 - n < t && this.pos[0] + this.size[0] + 4 + n > t && this.pos[1] - o - n < s && this.pos[1] + this.size[1] + n > s;
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(t, s = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [t, s]);
  }
}
let ce;
const Re = new Uint8Array(16);
function Me() {
  if (!ce && (ce = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ce))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ce(Re);
}
const $ = [];
for (let e = 0; e < 256; ++e)
  $.push((e + 256).toString(16).slice(1));
function Ge(e, t = 0) {
  return ($[e[t + 0]] + $[e[t + 1]] + $[e[t + 2]] + $[e[t + 3]] + "-" + $[e[t + 4]] + $[e[t + 5]] + "-" + $[e[t + 6]] + $[e[t + 7]] + "-" + $[e[t + 8]] + $[e[t + 9]] + "-" + $[e[t + 10]] + $[e[t + 11]] + $[e[t + 12]] + $[e[t + 13]] + $[e[t + 14]] + $[e[t + 15]]).toLowerCase();
}
const Be = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ee = {
  randomUUID: Be
};
function ne(e, t, s) {
  if (Ee.randomUUID && !t && !e)
    return Ee.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || Me)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    s = s || 0;
    for (let i = 0; i < 16; ++i)
      t[s + i] = n[i];
    return t;
  }
  return Ge(n);
}
class le {
  constructor(t, s, n, i, o, a) {
    this.data = null, this._pos = [0, 0], this._last_time = 0, this.id = t, this.type = s, this.origin_id = n, this.origin_slot = i, this.target_id = o, this.target_slot = a;
  }
  static configure(t) {
    return Array.isArray(t) ? new le(t[0], t[5], t[1], t[2], t[3], t[4]) : new le(t.id, t.type, t.origin_id, t.origin_slot, t.target_id, t.target_slot);
  }
  serialize() {
    return [
      this.id,
      this.origin_id,
      this.origin_slot,
      this.target_id,
      this.target_slot,
      this.type
    ];
  }
}
const me = class {
  constructor(e) {
    this.desc = "", this.pos = [0, 0], this.subgraph = null, this.skip_subgraph_button = !1, this.priority = 0, this.removable = !0, this.clonable = !0, this.collapsable = !0, this.titleMode = ee.NORMAL_TITLE, this.serialize_widgets = !1, this.hide_in_node_lists = !1, this.block_delete = !1, this.ignore_remove = !1, this.last_serialization = null, this._relative_id = null, this.exec_version = 0, this.action_call = null, this.execute_triggered = 0, this.action_triggered = 0, this.console = [], this.title = e || "Unnamed", this.size = [h.NODE_WIDTH, 60], this.graph = null, this.pos = [10, 10], h.use_uuids ? this.id = ne() : this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
  }
  get slotLayout() {
    return "slotLayout" in this.constructor ? this.constructor.slotLayout : null;
  }
  /** configure a node from an object containing the serialized info */
  configure(e) {
    this.graph && this.graph._version++;
    for (const n in e) {
      if (n == "properties") {
        for (const i in e.properties)
          this.properties[i] = e.properties[i], this.onPropertyChanged && this.onPropertyChanged(i, e.properties[i]);
        continue;
      }
      e[n] != null && (typeof e[n] == "object" ? this[n] && this[n].configure ? this[n].configure(e[n]) : this[n] = h.cloneObject(e[n], this[n]) : this[n] = e[n]);
    }
    e.title || (this.title = ge(this, "title") || this.title);
    const t = e.bgColor;
    if (t != null && (this.bgcolor || (this.bgcolor = t)), this.inputs)
      for (let n = 0; n < this.inputs.length; ++n) {
        const i = this.inputs[n], o = this.graph ? this.graph.links[i.link] : null;
        i.properties || (i.properties = {}), this.onConnectionsChange && this.onConnectionsChange(H.INPUT, n, !0, o, i), this.onInputAdded && this.onInputAdded(i);
      }
    if (this.outputs)
      for (var s = 0; s < this.outputs.length; ++s) {
        const n = this.outputs[s];
        if (n.properties || (n.properties = {}), !!n.links) {
          for (let i = 0; i < n.links.length; ++i) {
            const o = this.graph ? this.graph.links[n.links[i]] : null;
            this.onConnectionsChange && this.onConnectionsChange(H.OUTPUT, s, !0, o, n);
          }
          this.onOutputAdded && this.onOutputAdded(n);
        }
      }
    if (this.widgets) {
      for (var s = 0; s < this.widgets.length; ++s) {
        const i = this.widgets[s];
        i && i.options && i.options.property && this.properties[i.options.property] && (i.value = JSON.parse(JSON.stringify(this.properties[i.options.property])));
      }
      if (e.widgets_values)
        for (var s = 0; s < e.widgets_values.length; ++s)
          this.widgets[s] && (this.widgets[s].value = e.widgets_values[s]);
    }
    this.onConfigure && this.onConfigure(e);
  }
  /** serialize the content */
  serialize() {
    const e = {
      id: this.id,
      type: this.type,
      pos: this.pos,
      size: this.size,
      flags: h.cloneObject(this.flags),
      order: this.order,
      mode: this.mode
    };
    if (this.constructor === me && this.last_serialization)
      return this.last_serialization;
    if (this.inputs && (e.inputs = this.inputs), this.outputs) {
      for (var t = 0; t < this.outputs.length; t++)
        delete this.outputs[t]._data;
      e.outputs = this.outputs;
    }
    if (this.title && this.title != this.constructor.title && (e.title = this.title), this.properties && (e.properties = h.cloneObject(this.properties)), this.widgets && this.serialize_widgets) {
      e.widgets_values = [];
      for (var t = 0; t < this.widgets.length; ++t)
        this.widgets[t] ? e.widgets_values[t] = this.widgets[t].value : e.widgets_values[t] = null;
    }
    return e.type || (e.type = this.constructor.type), this.color && (e.color = this.color), this.bgcolor && (e.bgcolor = this.bgcolor), this.boxcolor && (e.boxcolor = this.boxcolor), this.shape && (e.shape = this.shape), this.onSerialize && this.onSerialize(e), e;
  }
  /** Creates a clone of this node  */
  clone(e = { forNode: {} }) {
    const t = h.createNode(this.type);
    if (!t)
      return null;
    const s = h.cloneObject(this.serialize());
    if (s.inputs)
      for (var n = 0; n < s.inputs.length; ++n)
        s.inputs[n].link = null;
    if (s.outputs)
      for (var n = 0; n < s.outputs.length; ++n)
        s.outputs[n].links && (s.outputs[n].links.length = 0);
    return delete s.id, h.use_uuids && (s.id = ne()), t.configure(s), t;
  }
  /** serialize and stringify */
  toString() {
    return JSON.stringify(this.serialize());
  }
  /** get the title string */
  getTitle() {
    return this.title || this.constructor.title;
  }
  getRootGraph() {
    var t;
    let e = this.graph;
    for (; e && e._is_subgraph; )
      e = (t = e._subgraph_node) == null ? void 0 : t.graph;
    return e == null || e._is_subgraph ? null : e;
  }
  *iterateParentSubgraphNodes() {
    var t;
    let e = this.graph._subgraph_node;
    for (; e; )
      yield e, e = (t = e.graph) == null ? void 0 : t._subgraph_node;
  }
  /** sets the value of a property */
  setProperty(e, t) {
    if (this.properties || (this.properties = {}), t === this.properties[e])
      return;
    const s = this.properties[e];
    if (this.properties[e] = t, this.graph && this.graph._version++, this.onPropertyChanged && this.onPropertyChanged(e, t, s) === !1 && (this.properties[e] = s), this.widgets)
      for (let n = 0; n < this.widgets.length; ++n) {
        const i = this.widgets[n];
        if (i && i.options.property == e) {
          i.value = t;
          break;
        }
      }
  }
  getInputSlotProperty(e, t) {
    if (!this.inputs || !this.graph || e == -1 || e >= this.inputs.length)
      return;
    const s = this.inputs[e];
    if (s)
      return s.properties || (s.properties = {}), s.properties[t];
  }
  getOutputSlotProperty(e, t) {
    if (!this.outputs || !this.graph || e == -1 || e >= this.outputs.length)
      return;
    const s = this.outputs[e];
    if (s)
      return s.properties || (s.properties = {}), s.properties[t];
  }
  setInputSlotProperty(e, t, s) {
    if (!this.inputs || !this.graph || e == -1 || e >= this.inputs.length)
      return;
    const n = this.inputs[e];
    if (!n || (n.properties || (n.properties = {}), s === n.properties[t]))
      return;
    const i = n.properties[t];
    n.properties[t] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(H.INPUT, e, n, t, s, i) === !1 && (n.properties[t] = i);
  }
  setOutputSlotProperty(e, t, s) {
    if (!this.outputs || !this.graph || e == -1 || e >= this.outputs.length)
      return;
    const n = this.outputs[e];
    if (!n || (n.properties || (n.properties = {}), s === n.properties[t]))
      return;
    const i = n.properties[t];
    n.properties[t] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(H.OUTPUT, e, n, t, s, i) === !1 && (n.properties[t] = i);
  }
  /** sets the output data */
  setOutputData(e, t) {
    if (!this.outputs || !this.graph || e == -1 || e >= this.outputs.length)
      return;
    const s = this.outputs[e];
    if (s && (h.serialize_slot_data ? s._data = t : s._data = void 0, this.outputs[e].links))
      for (let n = 0; n < this.outputs[e].links.length; n++) {
        const i = this.outputs[e].links[n], o = this.graph.links[i];
        o && (o.data = t);
      }
  }
  /** sets the output data */
  setOutputDataType(e, t) {
    if (!this.outputs || e == -1 || e >= this.outputs.length)
      return;
    const s = this.outputs[e];
    if (s && (s.type = t, this.outputs[e].links))
      for (let n = this.outputs[e].links.length - 1; n >= 0; n--) {
        const i = this.outputs[e].links[n], o = this.graph.links[i];
        if (o) {
          o.type = t;
          const a = this.graph.getNodeById(o.target_id);
          if (a) {
            const r = a.getInputInfo(o.target_slot);
            r && !h.isValidConnection(t, r.type) && a.disconnectInput(o.target_slot);
          }
        }
      }
  }
  *iterateInputInfo() {
    for (let e = 0; e < this.inputs.length; e++)
      yield this.inputs[e];
  }
  /**
   * Retrieves the input data (data traveling through the connection) from one slot
   * @param slot
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns undefined
   */
  getInputData(e, t) {
    if (!this.inputs || !this.graph || e >= this.inputs.length || this.inputs[e].link == null)
      return;
    const s = this.inputs[e].link, n = this.graph.links[s];
    if (!n)
      return h.debug && console.error(`Link not found in slot ${e}!`, this, this.inputs[e], s), null;
    if (!t)
      return n.data;
    const i = this.graph.getNodeById(n.origin_id);
    return i && (i.updateOutputData ? i.updateOutputData(n.origin_slot) : i.onExecute && i.onExecute(null, {})), n.data;
  }
  /**
   * Retrieves the input data type (in case this supports multiple input types)
   * @param slot
   * @return datatype in string format
   */
  getInputDataType(e) {
    if (!this.inputs || e >= this.inputs.length || this.inputs[e].link == null)
      return null;
    const t = this.inputs[e].link, s = this.graph.links[t];
    if (!s)
      return h.debug && console.error(`Link not found in slot ${e}!`, this, this.inputs[e], t), null;
    const n = this.graph.getNodeById(s.origin_id);
    if (!n)
      return s.type;
    const i = n.outputs[s.origin_slot];
    return i && i.type != -1 ? i.type : null;
  }
  /**
   * Retrieves the input data from one slot using its name instead of slot number
   * @param slot_name
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns null
   */
  getInputDataByName(e, t) {
    const s = this.findInputSlotIndexByName(e);
    return s == -1 ? null : this.getInputData(s, t);
  }
  /** tells you if there is a connection in one input slot */
  isInputConnected(e) {
    return this.inputs ? e < this.inputs.length && this.inputs[e].link != null : !1;
  }
  /** tells you info about an input connection (which node, type, etc) */
  getInputInfo(e) {
    return this.inputs && e < this.inputs.length ? this.inputs[e] : null;
  }
  /**
   * Returns the link info in the connection of an input slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputLink(e) {
    if (!this.inputs || !this.graph)
      return null;
    if (e < this.inputs.length) {
      const t = this.inputs[e];
      return this.graph.links[t.link];
    }
    return null;
  }
  /** returns the node connected in the input slot */
  getInputNode(e) {
    if (!this.inputs || !this.graph)
      return null;
    if (e < this.inputs.length) {
      const t = this.inputs[e].link, s = this.graph.links[t];
      if (!s)
        return h.debug && console.error(`Link not found in slot ${e}!`, this, this.inputs[e], t), null;
      const n = this.graph.getNodeById(s.origin_id);
      if (n)
        return n;
    }
    return null;
  }
  /** returns the value of an input with this name, otherwise checks if there is a property with that name */
  getInputOrProperty(e) {
    if (!this.inputs || !this.inputs.length || !this.graph)
      return this.properties ? this.properties[e] : null;
    for (let t = 0, s = this.inputs.length; t < s; ++t) {
      const n = this.inputs[t];
      if (e == n.name && n.link != null) {
        const i = this.graph.links[n.link];
        if (i)
          return i.data;
      }
    }
    return this.properties[e];
  }
  /** sets the input data type */
  setInputDataType(e, t) {
    if (!this.inputs || !this.graph || e == -1 || e >= this.inputs.length)
      return;
    const s = this.inputs[e];
    if (s && (s.type = t, s.link)) {
      const n = s.link, i = this.graph.links[n];
      i.type = t;
      const o = this.graph.getNodeById(i.origin_id);
      if (o) {
        const a = o.getOutputInfo(i.origin_slot);
        a && !h.isValidConnection(a.type, t) && o.disconnectOutput(i.origin_slot);
      }
    }
  }
  /**
   * Returns the output slot in another node that an input in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputSlotConnectedTo(e) {
    if (!this.outputs || !this.graph)
      return null;
    if (e >= 0 && e < this.outputs.length) {
      const t = this.inputs[e];
      if (t.link) {
        const s = this.graph.links[t.link];
        return this.graph.getNodeById(s.origin_id).outputs[s.origin_slot];
      }
    }
    return null;
  }
  *iterateOutputInfo() {
    for (let e = 0; e < this.outputs.length; e++)
      yield this.outputs[e];
  }
  /** tells you the last output data that went in that slot */
  getOutputData(e) {
    return !this.outputs || !this.graph || e >= this.outputs.length ? null : this.outputs[e]._data;
  }
  /**
   * Returns the link info in the connection of an output slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputLinks(e) {
    if (!this.outputs || !this.graph)
      return [];
    if (e >= 0 && e < this.outputs.length) {
      const t = this.outputs[e];
      if (t.links) {
        const s = [];
        for (const n of t.links)
          s.push(this.graph.links[n]);
        return s;
      }
    }
    return [];
  }
  /**
   * Returns the input slots in other nodes that an output in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputSlotsConnectedTo(e) {
    if (!this.outputs || !this.graph)
      return [];
    if (e >= 0 && e < this.outputs.length) {
      const t = this.outputs[e];
      if (t.links) {
        const s = [];
        for (const n of t.links) {
          const i = this.graph.links[n], o = this.graph.getNodeById(i.target_id);
          s.push(o.inputs[i.target_slot]);
        }
        return s;
      }
    }
    return [];
  }
  /** tells you info about an output connection (which node, type, etc) */
  getOutputInfo(e) {
    return this.outputs && e < this.outputs.length ? this.outputs[e] : null;
  }
  /** tells you if there is a connection in one output slot */
  isOutputConnected(e) {
    return !this.outputs || !this.graph ? !1 : e < this.outputs.length && this.outputs[e].links && this.outputs[e].links.length > 0;
  }
  /** tells you if there is any connection in the output slots */
  isAnyOutputConnected() {
    if (!this.outputs || !this.graph)
      return !1;
    for (let e = 0; e < this.outputs.length; ++e)
      if (this.outputs[e].links && this.outputs[e].links.length)
        return !0;
    return !1;
  }
  /** retrieves all the nodes connected to this output slot */
  getOutputNodes(e) {
    if (!this.outputs || this.outputs.length == 0 || !this.graph || e >= this.outputs.length)
      return null;
    const t = this.outputs[e];
    if (!t.links || t.links.length == 0)
      return null;
    const s = [];
    for (let n = 0; n < t.links.length; n++) {
      const i = t.links[n], o = this.graph.links[i];
      if (o) {
        const a = this.graph.getNodeById(o.target_id);
        a && s.push(a);
      }
    }
    return s;
  }
  *iterateAllLinks() {
    if (this.graph) {
      for (const e of this.iterateInputInfo())
        if (e.link) {
          const t = this.graph.links[e.link];
          t && (yield t);
        }
      for (const e of this.iterateOutputInfo())
        if (e.links != null)
          for (const t of e.links) {
            const s = this.graph.links[t];
            s && (yield s);
          }
    }
  }
  addOnTriggerInput() {
    const e = this.findInputSlotIndexByName("onTrigger");
    return e == -1 ? (this.addInput("onTrigger", O.EVENT, { optional: !0, nameLocked: !0 }), this.findInputSlotIndexByName("onTrigger")) : e;
  }
  addOnExecutedOutput() {
    const e = this.findOutputSlotIndexByName("onExecuted");
    return e == -1 ? (this.addOutput("onExecuted", O.ACTION, { optional: !0, nameLocked: !0 }), this.findOutputSlotIndexByName("onExecuted")) : e;
  }
  onAfterExecuteNode(e, t) {
    const s = this.findOutputSlotIndexByName("onExecuted");
    s != -1 && this.triggerSlot(s, e, null, t);
  }
  changeMode(e) {
    switch (e) {
      case X.ON_EVENT:
        break;
      case X.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case X.NEVER:
        break;
      case X.ALWAYS:
        break;
      case X.ON_REQUEST:
        break;
      default:
        return !1;
    }
    return this.mode = e, !0;
  }
  doExecute(e, t = {}) {
    this.onExecute && (t.action_call || (t.action_call = `${this.id}_exec_${Math.floor(Math.random() * 9999)}`), this.graph.nodes_executing[this.id] = !0, this.onExecute(e, t), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, t && t.action_call && (this.action_call = t.action_call, this.graph.nodes_executedAction[this.id] = t.action_call)), this.execute_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(e, t);
  }
  /**
   * Triggers an action, wrapped by logics to control execution flow
   * @method actionDo
   * @param {string} action name
   * @param {*} param
   */
  actionDo(e, t, s = {}) {
    this.onAction && (s.action_call || (s.action_call = `${this.id}_${e || "action"}_${Math.floor(Math.random() * 9999)}`), this.graph.nodes_actioning[this.id] = e || "actioning", this.onAction(e, t, s), this.graph.nodes_actioning[this.id] = !1, s && s.action_call && (this.action_call = s.action_call, this.graph.nodes_executedAction[this.id] = s.action_call)), this.action_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(t, s);
  }
  /**  Triggers an event in this node, this will trigger any output with the same name */
  trigger(e, t, s) {
    if (!(!this.outputs || !this.outputs.length)) {
      this.graph && (this.graph._last_trigger_time = h.getTime());
      for (let n = 0; n < this.outputs.length; ++n) {
        const i = this.outputs[n];
        !i || i.type !== O.EVENT || e && i.name != e || this.triggerSlot(n, t, null, s);
      }
    }
  }
  /**
   * Triggers an slot event in this node
   * @param slot the index of the output slot
   * @param param
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  triggerSlot(e, t, s, n = {}) {
    if (!this.outputs)
      return;
    if (e == null) {
      console.error("slot must be a number");
      return;
    }
    typeof e != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
    const i = this.outputs[e];
    if (!i)
      return;
    const o = i.links;
    if (!(!o || !o.length)) {
      this.graph && (this.graph._last_trigger_time = h.getTime());
      for (let a = 0; a < o.length; ++a) {
        const r = o[a];
        if (s != null && s != r)
          continue;
        const l = this.graph.links[o[a]];
        if (!l)
          continue;
        l._last_time = h.getTime();
        const u = this.graph.getNodeById(l.target_id);
        if (u) {
          if (u.inputs[l.target_slot], n.link = l, n.originNode = this, u.mode === X.ON_TRIGGER)
            n.action_call || (n.action_call = `${this.id}_trigg_${Math.floor(Math.random() * 9999)}`), u.onExecute && u.doExecute(t, n);
          else if (u.onAction) {
            n.action_call || (n.action_call = `${this.id}_act_${Math.floor(Math.random() * 9999)}`);
            const f = u.inputs[l.target_slot];
            u.actionDo(f.name, t, n);
          }
        }
      }
    }
  }
  /**
   * clears the trigger slot animation
   * @param slot the index of the output slot
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  clearTriggeredSlot(e, t) {
    if (!this.outputs)
      return;
    const s = this.outputs[e];
    if (!s)
      return;
    const n = s.links;
    if (!(!n || !n.length))
      for (let i = 0; i < n.length; ++i) {
        const o = n[i];
        if (t != null && t != o)
          continue;
        const a = this.graph.links[n[i]];
        a && (a._last_time = 0);
      }
  }
  /**
   * changes node size and triggers callback
   * @method setSize
   * @param {vec2} size
   */
  setSize(e) {
    this.size = e, this.onResize && this.onResize(this.size);
  }
  /**
   * add a new property to this node
   * @param name
   * @param default_value
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of the property (like values, etc)
   */
  addProperty(e, t, s, n) {
    const i = { name: e, type: s, default_value: t };
    if (n)
      for (const o in n)
        i[o] = n[o];
    return this.properties_info || (this.properties_info = []), this.properties_info.push(i), this.properties || (this.properties = {}), this.properties[e] = t, i;
  }
  /**
   * add a new output slot to use in this node
   * @param name
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(e, t = O.DEFAULT, s) {
    const n = { name: e, type: t, links: [], properties: {} };
    if (s)
      for (const i in s)
        n[i] = s[i];
    return (n.shape == null || n.shape == C.DEFAULT) && (t == "array" ? n.shape = C.GRID_SHAPE : (t === O.EVENT || t === O.ACTION) && (n.shape = C.BOX_SHAPE)), (t === O.EVENT || t === O.ACTION) && (n.shape = C.BOX_SHAPE), this.outputs || (this.outputs = []), this.outputs.push(n), this.onOutputAdded && this.onOutputAdded(n), h.auto_load_slot_types && h.registerNodeAndSlotType(this, t, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing output slot */
  removeOutput(e) {
    const t = this.outputs[e];
    this.disconnectOutput(e), this.outputs.splice(e, 1);
    for (let s = e; s < this.outputs.length; ++s) {
      if (!this.outputs[s] || !this.outputs[s].links)
        continue;
      const n = this.outputs[s].links;
      for (let i = 0; i < n.length; ++i) {
        const o = this.graph.links[n[i]];
        o && (o.origin_slot -= 1);
      }
    }
    this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(e, t), this.setDirtyCanvas(!0, !0);
  }
  moveOutput(e, t) {
    const s = this.outputs[e];
    if (s == null || t < 0 || t > this.outputs.length - 1)
      return;
    const n = this.outputs[t];
    if (s.links)
      for (const i of s.links) {
        const o = this.graph.links[i];
        o.origin_slot = t;
      }
    if (n.links)
      for (const i of n.links) {
        const o = this.graph.links[i];
        o.origin_slot = e;
      }
    this.outputs[t] = s, this.outputs[e] = n;
  }
  /**
   * add a new input slot to use in this node
   * @param name
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(e, t = O.DEFAULT, s) {
    const n = { name: e, type: t, link: null, properties: {} };
    if (s)
      for (const i in s)
        n[i] = s[i];
    return (n.shape == null || n.shape == C.DEFAULT) && (t == "array" ? n.shape = C.GRID_SHAPE : (t === O.EVENT || t === O.ACTION) && (n.shape = C.BOX_SHAPE)), this.inputs || (this.inputs = []), this.inputs.push(n), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(n), h.registerNodeAndSlotType(this, t), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing input slot */
  removeInput(e) {
    this.disconnectInput(e);
    const t = this.inputs.splice(e, 1);
    for (let s = e; s < this.inputs.length; ++s) {
      if (!this.inputs[s])
        continue;
      const n = this.graph.links[this.inputs[s].link];
      n && (n.target_slot -= 1);
    }
    this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(e, t[0]), this.setDirtyCanvas(!0, !0);
  }
  moveInput(e, t) {
    const s = this.inputs[e];
    if (s == null || t < 0 || t > this.inputs.length - 1)
      return;
    const n = this.inputs[t];
    if (s.link != null) {
      const i = this.graph.links[s.link];
      i.target_slot = t;
    }
    if (n.link != null) {
      const i = this.graph.links[n.link];
      i.target_slot = e;
    }
    this.inputs[t] = s, this.inputs[e] = n;
  }
  /**
   * add an special connection to this node (used for special kinds of graphs)
   * @param name
   * @param type string defining the input type ("vec3","number",...)
   * @param pos position of the connection inside the node
   * @param direction if is input or output
   */
  addConnection(e, t, s, n) {
    const i = {
      name: e,
      type: t,
      pos: s,
      direction: n,
      links: null
    };
    return this.connections.push(i), i;
  }
  /** computes the size of a node according to its inputs and output slots */
  computeSize(e = [0, 0]) {
    const t = ge(this, "overrideSize");
    if (t)
      return t.concat();
    let s = Math.max(
      this.inputs ? this.inputs.length : 1,
      this.outputs ? this.outputs.length : 1
    );
    const n = e;
    s = Math.max(s, 1);
    const i = h.NODE_TEXT_SIZE, o = v(this.title);
    let a = 0, r = 0;
    if (this.inputs)
      for (var l = 0, u = this.inputs.length; l < u; ++l) {
        const _ = this.inputs[l];
        var f = _.label || _.name || "", c = v(f);
        a < c && (a = c);
      }
    if (this.outputs)
      for (var l = 0, u = this.outputs.length; l < u; ++l) {
        const d = this.outputs[l];
        var f = d.label || d.name || "", c = v(f);
        r < c && (r = c);
      }
    if (n[0] = Math.max(a + r + 10, o), n[0] = Math.max(n[0], h.NODE_WIDTH), this.widgets && this.widgets.length)
      for (const _ of this.widgets)
        n[0] = Math.max(n[0], _.width || h.NODE_WIDTH * 1.5);
    n[1] = (this.constructor.slot_start_y || 0) + s * h.NODE_SLOT_HEIGHT;
    let p = 0;
    if (this.widgets && this.widgets.length) {
      for (var l = 0, u = this.widgets.length; l < u; ++l) {
        const d = this.widgets[l];
        d.hidden || (d.computeSize ? p += d.computeSize(n[0])[1] + 4 : p += h.NODE_WIDGET_HEIGHT + 4);
      }
      p += 8;
    }
    this.widgets_up ? n[1] = Math.max(n[1], p) : this.widgets_start_y != null ? n[1] = Math.max(n[1], p + this.widgets_start_y) : n[1] += p;
    function v(_) {
      return _ ? i * _.length * 0.6 : 0;
    }
    return this.constructor.min_height && n[1] < this.constructor.min_height && (n[1] = this.constructor.min_height), n[1] += 6, n;
  }
  /**
   * returns all the info available about a property of this node.
   *
   * @method getPropertyInfo
   * @param {string} property name of the property
   * @return {object} the object with all the available info
   */
  getPropertyInfo(e) {
    let t = null;
    if (this.properties_info) {
      for (let s = 0; s < this.properties_info.length; ++s)
        if (this.properties_info[s].name == e) {
          t = this.properties_info[s];
          break;
        }
    }
    return this.constructor[`@${e}`] && (t = this.constructor[`@${e}`]), this.constructor.widgets_info && this.constructor.widgets_info[e] && (t = this.constructor.widgets_info[e]), !t && this.onGetPropertyInfo && (t = this.onGetPropertyInfo(e)), t || (t = {}), t.type || (t.type = typeof this.properties[e]), t.widget == "combo" && (t.type = "enum"), t;
  }
  /**
   * https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
   * @return created widget
   */
  addWidget(e, t, s, n, i) {
    this.widgets || (this.widgets = []), !i && n && n.constructor === Object && (i = n, n = null), i && i.constructor === String && (i = { property: i }), n && n.constructor === String && (i || (i = {}), i.property = n, n = null), n && n.constructor !== Function && (console.warn("addWidget: callback must be a function"), n = null);
    const o = {
      type: e.toLowerCase(),
      name: t,
      value: s,
      callback: n,
      options: i || {}
    };
    if (o.options.y !== void 0 && (o.y = o.options.y), !n && !o.options.callback && !o.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), e == "combo" && !o.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    return this.widgets.push(o), this.setSize(this.computeSize()), o;
  }
  addCustomWidget(e) {
    return this.widgets || (this.widgets = []), this.widgets.push(e), this.setSize(this.computeSize()), e;
  }
  setWidgetHidden(e, t) {
    e.hidden = t, this.setSize(this.computeSize());
  }
  /**
   * returns the bounding of the object, used for rendering purposes
   * @return [x, y, width, height]
   */
  getBounding(e) {
    return e = e || new Float32Array(4), e[0] = this.pos[0] - 4, e[1] = this.pos[1] - h.NODE_TITLE_HEIGHT, e[2] = this.size[0] + 4, e[3] = this.flags.collapsed ? h.NODE_TITLE_HEIGHT : this.size[1] + h.NODE_TITLE_HEIGHT, this.onBounding && this.onBounding(e), e;
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(e, t, s = 0, n = !1) {
    let i = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    if (n && (i = 0), this.flags && this.flags.collapsed) {
      if (h.isInsideRectangle(
        e,
        t,
        this.pos[0] - s,
        this.pos[1] - h.NODE_TITLE_HEIGHT - s,
        (this._collapsed_width || h.NODE_COLLAPSED_WIDTH) + 2 * s,
        h.NODE_TITLE_HEIGHT + 2 * s
      ))
        return !0;
    } else if (this.pos[0] - 4 - s < e && this.pos[0] + this.size[0] + 4 + s > e && this.pos[1] - i - s < t && this.pos[1] + this.size[1] + s > t)
      return !0;
    return !1;
  }
  /** checks if a point is inside a node slot, and returns info about which slot */
  getSlotInPosition(e, t) {
    const s = [0, 0];
    if (this.inputs)
      for (var n = 0, i = this.inputs.length; n < i; ++n) {
        const o = this.inputs[n];
        if (this.getConnectionPos(!0, n, s), h.isInsideRectangle(
          e,
          t,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { input: o, slot: n, link_pos: s };
      }
    if (this.outputs)
      for (var n = 0, i = this.outputs.length; n < i; ++n) {
        const r = this.outputs[n];
        if (this.getConnectionPos(!1, n, s), h.isInsideRectangle(
          e,
          t,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { output: r, slot: n, link_pos: s };
      }
    return null;
  }
  is(e) {
    const t = e.__LITEGRAPH_TYPE__;
    return t != null && this.type === t;
  }
  /**
   * returns the input slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return the slot (-1 if not found)
   */
  findInputSlotIndexByName(e, t = !1, s) {
    if (!this.inputs)
      return -1;
    for (let n = 0, i = this.inputs.length; n < i; ++n)
      if (!(t && this.inputs[n].link && this.inputs[n].link != null) && !(s && s.includes(this.inputs[n].type)) && (!e || e == this.inputs[n].name))
        return n;
    return -1;
  }
  findInputSlotByName(e, t = !1, s) {
    if (!this.inputs)
      return null;
    for (let n = 0, i = this.inputs.length; n < i; ++n)
      if (!(t && this.inputs[n].link && this.inputs[n].link != null) && !(s && s.includes(this.inputs[n].type)) && (!e || e == this.inputs[n].name))
        return this.inputs[n];
    return null;
  }
  /**
   * returns the output slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return  the slot (-1 if not found)
   */
  findOutputSlotIndexByName(e, t = !1, s) {
    if (!this.outputs)
      return -1;
    for (let n = 0, i = this.outputs.length; n < i; ++n)
      if (!(t && this.outputs[n].links && this.outputs[n].links != null) && !(s && s.includes(this.outputs[n].type)) && (!e || e == this.outputs[n].name))
        return n;
    return -1;
  }
  findOutputSlotByName(e, t = !1, s) {
    if (!this.outputs)
      return null;
    for (let n = 0, i = this.outputs.length; n < i; ++n)
      if (!(t && this.outputs[n].links && this.outputs[n].links != null) && !(s && s.includes(this.outputs[n].type)) && (!e || e == this.outputs[n].name))
        return this.outputs[n];
    return null;
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotIndexByType(e, t = !1, s = !1) {
    return this.findSlotByType(!0, e, !1, t, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotIndexByType(e, t = !1, s = !1) {
    return this.findSlotByType(!1, e, !1, t, s);
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotByType(e, t = !1, s = !1) {
    return this.findSlotByType(!0, e, !1, t, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotByType(e, t = !1, s = !1) {
    return this.findSlotByType(!1, e, !1, t, s);
  }
  /**
   * returns the output (or input) slot with a given type, -1 if not found
   * @method findSlotByType
   * @param {boolean} input uise inputs instead of outputs
   * @param {string} type the type of the slot
   * @param {boolean} preferFreeSlot if we want a free slot (if not found, will return the first of the type anyway)
   * @return {number_or_object} the slot (-1 if not found)
   */
  findSlotByType(e, t, s, n = !1, i = !1) {
    n = n || !1, i = i || !1;
    const o = e ? this.inputs : this.outputs;
    if (!o)
      return s ? null : -1;
    (t == "" || t == "*") && (t = 0);
    for (var a = 0, r = o.length; a < r; ++a) {
      var l = `${t}`.toLowerCase().split(","), u = o[a].type == "0" || o[a].type == "*" ? "0" : o[a].type;
      const f = `${u}`.toLowerCase().split(",");
      for (let c = 0; c < l.length; c++)
        for (let p = 0; p < f.length; p++)
          if (l[c] == "_event_" && (l[c] = O.EVENT), f[c] == "_event_" && (f[c] = O.EVENT), l[c] == "*" && (l[c] = O.DEFAULT), f[c] == "*" && (f[c] = O.DEFAULT), l[c] == f[p]) {
            const v = o[a];
            if (n && v.links && v.links !== null || v.link && v.link !== null)
              continue;
            return s ? v : a;
          }
    }
    if (n && !i)
      for (var a = 0, r = o.length; a < r; ++a) {
        var l = `${t}`.toLowerCase().split(","), u = o[a].type == "0" || o[a].type == "*" ? "0" : o[a].type;
        const _ = `${u}`.toLowerCase().split(",");
        for (let g = 0; g < l.length; g++)
          for (let d = 0; d < _.length; d++)
            if (l[g] == "*" && (l[g] = O.DEFAULT), _[g] == "*" && (_[g] = O.DEFAULT), l[g] == _[d])
              return s ? o[a] : a;
      }
    return s ? null : -1;
  }
  /**
   * connect this node output to the input of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the input slot type of the target node
   * @return {object} the link_info is created, otherwise null
   */
  connectByTypeInput(e, t, s, n = {}) {
    const o = Object.assign({
      createEventInCase: !0,
      firstFreeIfOutputGeneralInCase: !0,
      generalTypeInCase: !0
    }, n);
    t && t.constructor === Number && (t = this.graph.getNodeById(t));
    let a = s;
    s === O.EVENT ? a = O.ACTION : s === O.ACTION && (a = O.EVENT);
    const r = t.findInputSlotIndexByType(a, !0);
    if (r >= 0 && r !== null)
      return h.debug && console.debug(`CONNbyTYPE type ${s} for ${r}`), this.connect(e, t, r);
    if (h.debug && console.log(`type ${s} not found or not free?`), o.createEventInCase && s == O.EVENT)
      return h.debug && console.debug(`connect WILL CREATE THE onTrigger ${s} to ${t}`), this.connect(e, t, -1);
    if (o.generalTypeInCase) {
      const l = t.findInputSlotIndexByType(O.DEFAULT, !0, !0);
      if (h.debug && console.debug("connect TO a general type (*, 0), if not found the specific type ", s, " to ", t, "RES_SLOT:", l), l >= 0)
        return this.connect(e, t, l);
    }
    if (o.firstFreeIfOutputGeneralInCase && (s == 0 || s == "*" || s == "")) {
      const l = t.findInputSlotIndexByName(null, !0, [O.EVENT]);
      if (h.debug && console.debug("connect TO TheFirstFREE ", s, " to ", t, "RES_SLOT:", l), l >= 0)
        return this.connect(e, t, l);
    }
    return h.debug && console.error("no way to connect type: ", s, " to targetNODE ", t), null;
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the output slot type of the target node
   * @return {object} the link_info is created, otherwise null
   */
  connectByTypeOutput(e, t, s, n = {}) {
    const o = Object.assign({
      createEventInCase: !0,
      firstFreeIfInputGeneralInCase: !0,
      generalTypeInCase: !0
    }, n);
    t && t.constructor === Number && (t = this.graph.getNodeById(t));
    let a = s;
    if (s === O.EVENT ? a = O.ACTION : s === O.ACTION && (a = O.EVENT), r = t.findOutputSlotIndexByType(a, !0), r >= 0 && r !== null)
      return console.debug(`CONNbyTYPE OUT! type ${s} for ${r} to ${a}`), t.connect(r, this, e);
    if (o.generalTypeInCase) {
      var r = t.findOutputSlotIndexByType(0, !0, !0);
      if (r >= 0)
        return t.connect(r, this, e);
    }
    if ((o.createEventInCase && s == O.EVENT || s == O.ACTION) && h.do_add_triggers_slots) {
      var r = t.addOnExecutedOutput();
      return t.connect(r, this, e);
    }
    if (o.firstFreeIfInputGeneralInCase && (s == 0 || s == "*" || s == "")) {
      const l = t.findOutputSlotIndexByName(null, !0, [O.EVENT, O.ACTION]);
      if (l >= 0)
        return t.connect(l, this, e);
    }
    return console.error("no way to connect byOUT type: ", s, " to sourceNODE ", t), console.error(`type OUT! ${s} not found or not free?`), null;
  }
  /**
   * connect this node output to the input of another node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param  targetNode the target node
   * @param  targetSlot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
   * @return {object} the linkInfo is created, otherwise null
   */
  connect(e, t, s) {
    if (s = s || 0, !this.graph)
      throw new Error("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof e == "string") {
      if (e = this.findOutputSlotIndexByName(e), e == -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${e}`), null;
    } else if (!this.outputs || e >= this.outputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), null;
    if (t && t.constructor === Number && (t = this.graph.getNodeById(t)), !t)
      throw "target node is null";
    if (t == this)
      return h.debug && console.error("Connect: Error, can't connect node to itself!"), null;
    if (!t.graph)
      throw new Error("Connect: Error, target node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof s == "string") {
      if (s = t.findInputSlotIndexByName(s), s == -1)
        return h.debug && console.error(
          `Connect: Error, no slot of name ${s}`
        ), null;
    } else if (s === O.EVENT)
      if (h.do_add_triggers_slots)
        t.changeMode(X.ON_TRIGGER), s = t.findInputSlotIndexByName("onTrigger");
      else
        return h.debug && console.error("Connect: Error, can't connect event target slot"), null;
    else if (!t.inputs || s >= t.inputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), null;
    let n = !1;
    const i = t.inputs[s];
    let o = null;
    const a = this.outputs[e];
    if (!this.outputs[e])
      return h.debug && (console.warn(`Connect: Invalid slot passed: ${e}`), console.warn(this.outputs)), null;
    if (t.onBeforeConnectInput && (s = t.onBeforeConnectInput(s)), s === -1 || s === null || !h.isValidConnection(a.type, i.type))
      return this.setDirtyCanvas(!1, !0), n && this.graph.connectionChange(this, o), console.warn("Connect: Invalid connection: ", s, a.type, i.type), null;
    if (h.debug && console.debug("valid connection", a.type, i.type), t.onConnectInput && t.onConnectInput(s, a.type, a, this, e) === !1)
      return h.debug && console.debug("onConnectInput blocked", a.type, i.type), null;
    if (this.onConnectOutput && this.onConnectOutput(e, i.type, i, t, s) === !1)
      return h.debug && console.debug("onConnectOutput blocked", a.type, i.type), null;
    if (t.inputs[s] && t.inputs[s].link != null && (this.graph.beforeChange(), t.disconnectInput(s, { doProcessChange: !1 }), n = !0), a.links !== null && a.links.length)
      switch (a.type) {
        case O.EVENT:
          h.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(e, null, { doProcessChange: !1 }), n = !0);
          break;
      }
    let r;
    return h.use_uuids ? r = ne() : r = ++this.graph.last_link_id, o = new le(
      r,
      i.type || a.type,
      this.id,
      e,
      t.id,
      s
    ), this.graph.links[o.id] && console.error("Link already exists in graph!", o.id, o, this.graph.links[o.id]), this.graph.links[o.id] = o, a.links == null && (a.links = []), a.links.push(o.id), t.inputs[s].link = o.id, this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
      H.OUTPUT,
      e,
      !0,
      o,
      a
    ), t.onConnectionsChange && t.onConnectionsChange(
      H.INPUT,
      s,
      !0,
      o,
      i
    ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
      H.INPUT,
      t,
      s,
      this,
      e
    ), this.graph.onNodeConnectionChange(
      H.OUTPUT,
      this,
      e,
      t,
      s
    )), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, o), o;
  }
  /**
   * disconnect one output to an specific node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param targetNode the target node to which this slot is connected [Optional, if not targetNode is specified all nodes will be disconnected]
   * @return if it was disconnected successfully
   */
  disconnectOutput(e, t, s) {
    if (typeof e == "string") {
      if (e = this.findOutputSlotIndexByName(e), e == -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${e}`), !1;
    } else if (!this.outputs || e >= this.outputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), !1;
    const n = this.outputs[e];
    if (!n || !n.links || n.links.length == 0)
      return !1;
    if (t) {
      if (t.constructor === Number && (t = this.graph.getNodeById(t)), !t)
        throw "Target Node not found";
      for (var i = 0, o = n.links.length; i < o; i++) {
        var a = n.links[i], r = this.graph.links[a];
        if (r.target_id == t.id) {
          n.links.splice(i, 1);
          var l = t.inputs[r.target_slot];
          l.link = null, delete this.graph.links[a], this.graph && this.graph._version++, t.onConnectionsChange && t.onConnectionsChange(
            H.INPUT,
            r.target_slot,
            !1,
            r,
            l
          ), this.onConnectionsChange && this.onConnectionsChange(
            H.OUTPUT,
            e,
            !1,
            r,
            n
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            H.OUTPUT,
            this,
            e
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            H.OUTPUT,
            this,
            e
          ), this.graph.onNodeConnectionChange(
            H.INPUT,
            t,
            r.target_slot
          ));
          break;
        }
      }
    } else {
      for (var i = 0, o = n.links.length; i < o; i++) {
        var a = n.links[i], r = this.graph.links[a];
        if (r) {
          var t = this.graph.getNodeById(r.target_id), l = null;
          this.graph && this.graph._version++, t && (l = t.inputs[r.target_slot], l.link = null, t.onConnectionsChange && t.onConnectionsChange(
            H.INPUT,
            r.target_slot,
            !1,
            r,
            l
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            H.INPUT,
            t,
            r.target_slot
          )), delete this.graph.links[a], this.onConnectionsChange && this.onConnectionsChange(
            H.OUTPUT,
            e,
            !1,
            r,
            n
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            H.OUTPUT,
            this,
            e
          ), this.graph.onNodeConnectionChange(
            H.INPUT,
            t,
            r.target_slot
          ));
        }
      }
      n.links = null;
    }
    return this.setDirtyCanvas(!1, !0), this.graph.connectionChange(this), !0;
  }
  /**
   * disconnect one input
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @return if it was disconnected successfully
   */
  disconnectInput(e, t = {}) {
    if (typeof e == "string") {
      if (e = this.findInputSlotIndexByName(e), e == -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${e}`), !1;
    } else if (!this.inputs || e >= this.inputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), !1;
    const s = this.inputs[e];
    if (!s)
      return !1;
    const n = this.inputs[e].link;
    if (n != null) {
      this.inputs[e].link = null;
      const a = this.graph.links[n];
      if (a) {
        const r = this.graph.getNodeById(a.origin_id);
        if (!r)
          return !1;
        const l = r.outputs[a.origin_slot];
        if (!l || !l.links || l.links.length == 0)
          return !1;
        for (var i = 0, o = l.links.length; i < o; i++)
          if (l.links[i] == n) {
            l.links.splice(i, 1);
            break;
          }
        delete this.graph.links[n], this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
          H.INPUT,
          e,
          !1,
          a,
          s
        ), r.onConnectionsChange && r.onConnectionsChange(
          H.OUTPUT,
          i,
          !1,
          a,
          l
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          H.OUTPUT,
          r,
          i
        ), this.graph.onNodeConnectionChange(H.INPUT, this, e));
      }
    }
    return this.setDirtyCanvas(!1, !0), this.graph && this.graph.connectionChange(this), !0;
  }
  /**
   * returns the center of a connection point in canvas coords
   * @param is_input true if if a input slot, false if it is an output
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param out a place to store the output, to free garbage
   * @return the position
   */
  getConnectionPos(e, t, s = [0, 0], n = !1) {
    let i = 0;
    e && this.inputs && (i = this.inputs.length), !e && this.outputs && (i = this.outputs.length);
    const o = h.NODE_SLOT_HEIGHT * 0.5;
    if (this.flags.collapsed && !n) {
      const a = this._collapsed_width || h.NODE_COLLAPSED_WIDTH;
      return this.horizontal ? (s[0] = this.pos[0] + a * 0.5, e ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1]) : (e ? s[0] = this.pos[0] : s[0] = this.pos[0] + a, s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT * 0.5), s;
    }
    return e && t == -1 ? (s[0] = this.pos[0] + h.NODE_TITLE_HEIGHT * 0.5, s[1] = this.pos[1] + h.NODE_TITLE_HEIGHT * 0.5, s) : e && i > t && this.inputs[t].pos ? (s[0] = this.pos[0] + this.inputs[t].pos[0], s[1] = this.pos[1] + this.inputs[t].pos[1], s) : !e && i > t && this.outputs[t].pos ? (s[0] = this.pos[0] + this.outputs[t].pos[0], s[1] = this.pos[1] + this.outputs[t].pos[1], s) : this.horizontal ? (s[0] = this.pos[0] + (t + 0.5) * (this.size[0] / i), e ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1] + this.size[1], s) : (e ? s[0] = this.pos[0] + o : s[0] = this.pos[0] + this.size[0] + 1 - o, s[1] = this.pos[1] + (t + 0.7) * h.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), s);
  }
  /** Force align to grid */
  alignToGrid() {
    this.pos[0] = h.CANVAS_GRID_SIZE * Math.round(this.pos[0] / h.CANVAS_GRID_SIZE), this.pos[1] = h.CANVAS_GRID_SIZE * Math.round(this.pos[1] / h.CANVAS_GRID_SIZE);
  }
  /** Console output */
  trace(e) {
    this.console || (this.console = []), this.console.push(e), this.console.length > me.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, e);
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(e, t = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [e, t]);
  }
  loadImage(e) {
    const t = new Image();
    t.src = h.node_images_path + e;
    const s = this;
    return t.onload = function() {
      s.setDirtyCanvas(!0);
    }, t;
  }
  /** Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(e) {
    if (!this.graph || !this.graph.list_of_graphcanvas)
      return;
    const t = this.graph.list_of_graphcanvas;
    for (let s = 0; s < t.length; ++s) {
      const n = t[s];
      !e && n.node_capturing_input != this || (n.node_capturing_input = e ? this : null);
    }
  }
  isShowingTitle(e) {
    return this.titleMode == ee.TRANSPARENT_TITLE || this.titleMode == ee.NO_TITLE ? !1 : (this.titleMode == ee.AUTOHIDE_TITLE && e, !0);
  }
  /** Collapse the node to make it smaller on the canvas */
  collapse(e = !1) {
    this.graph._version++, !(this.collapsable === !1 && !e) && (this.flags.collapsed ? this.flags.collapsed = !1 : this.flags.collapsed = !0, this.setDirtyCanvas(!0, !0));
  }
  /** Forces the node to do not move or realign on Z */
  pin(e) {
    this.graph._version++, e === void 0 ? this.flags.pinned = !this.flags.pinned : this.flags.pinned = e;
  }
  localToScreen(e, t, s) {
    return [
      (e + this.pos[0]) * s.ds.scale + s.ds.offset[0],
      (t + this.pos[1]) * s.ds.scale + s.ds.offset[1]
    ];
  }
  getOptionalSlots() {
    return ge(this, "optionalSlots");
  }
};
let oe = me;
oe.MAX_CONSOLE = 100;
function Ie() {
  let e = [];
  return e = e.concat(Ne), e = e.concat([O.ACTION]), e = e.concat(h.slot_types_in.map((t) => t.toUpperCase())), e;
}
function He() {
  return Ie().map(V);
}
class j extends oe {
  constructor(t) {
    super(t), this.properties = {
      name: "",
      type: "number",
      value: 0,
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 90];
    const s = this;
    this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), h.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      V(this.properties.type),
      this.setType.bind(this),
      { values: He }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      V(this.properties.type),
      this.setType.bind(this)
    ), this.valueWidget = this.addWidget(
      "number",
      "Value",
      this.properties.value,
      (n) => {
        s.setProperty("value", n);
      }
    ), this.widgets_up = !0;
  }
  setName(t) {
    if (t == null || t === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (t = s.getValidGraphInputName(t), this.setProperty("name", t));
  }
  setType(t) {
    t || (t = "*");
    let s = t;
    t === "-1" || t === "Action" ? s = O.ACTION : t === "-2" || t === "Event" ? s = O.EVENT : t === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var t, s;
    return (s = (t = this.graph._subgraph_node) == null ? void 0 : t.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  /** ensures the type in the node output and the type in the associated graph input are the same */
  updateType() {
    const t = this.properties.type;
    this.typeWidget.value = V(t);
    const s = this.outputs[0];
    s.type != t && (h.isValidConnection(s.type, t) || this.disconnectOutput(0), s.type = t), t == "array" ? s.shape = C.GRID_SHAPE : t === O.EVENT || t === O.ACTION ? s.shape = C.BOX_SHAPE : s.shape = C.DEFAULT, t == "number" ? (this.valueWidget.type = "number", this.valueWidget.value = 0) : t == "boolean" ? (this.valueWidget.type = "toggle", this.valueWidget.value = !0) : t == "string" ? (this.valueWidget.type = "text", this.valueWidget.value = "") : (this.valueWidget.type = null, this.valueWidget.value = null), this.properties.value = this.valueWidget.value, this.graph && this.nameInGraph && Oe(t) ? (this.graph.changeInputType(this.nameInGraph, t), s.type !== t && this.setOutputDataType(0, t)) : console.error("[GraphInput] Can't change output to type", t, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(t, s) {
    if (t == "name") {
      if (s == "" || s == this.nameInGraph || s == "enabled")
        return !1;
      this.graph && (this.nameInGraph ? this.graph.renameInput(this.nameInGraph, s) : this.graph.addInput(s, `${this.properties.type}`, null)), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      t == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(t, s) {
    this.properties.type == O.EVENT && this.triggerSlot(0, s);
  }
  onExecute() {
    const t = this.properties.name, s = this.graph.inputs[t];
    if (!s) {
      this.setOutputData(0, this.properties.value);
      return;
    }
    this.setOutputData(0, s.value !== void 0 ? s.value : this.properties.value);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeInput(this.nameInGraph);
  }
}
j.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
h.registerNodeType({
  class: j,
  title: "Input",
  desc: "Input of the graph",
  type: "graph/input",
  hide_in_node_lists: !0
});
function ke() {
  let e = [];
  return e = e.concat(Ne), e = e.concat([O.EVENT]), e = e.concat(h.slot_types_out), e;
}
function Fe() {
  return ke().map(V);
}
class K extends oe {
  constructor(t) {
    super(t), this.properties = {
      name: "",
      type: "number",
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 60], this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), h.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      V(this.properties.type),
      this.setType.bind(this),
      { values: Fe }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      V(this.properties.type),
      this.setType.bind(this)
    ), this.widgets_up = !0;
  }
  setName(t) {
    if (t == null || t === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (t = s.getValidGraphOutputName(t), this.setProperty("name", t));
  }
  setType(t) {
    t || (t = "*");
    let s = t;
    t === "-1" || t === "Action" ? s = O.ACTION : t === "-2" || t === "Event" ? s = O.EVENT : t === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var t, s;
    return (s = (t = this.graph._subgraph_node) == null ? void 0 : t.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  updateType() {
    let t = this.properties.type;
    const s = this.inputs[0];
    this.typeWidget && (this.typeWidget.value = V(t)), t == "array" ? s.shape = C.GRID_SHAPE : t === O.EVENT || t === O.ACTION ? s.shape = C.BOX_SHAPE : s.shape = C.DEFAULT, s.type != t && ((t == "action" || t == "event") && (t = O.EVENT), h.isValidConnection(s.type, t) || this.disconnectInput(0), s.type = t), this.graph && this.nameInGraph && Oe(t) ? (this.graph.changeOutputType(this.nameInGraph, t), s.type !== t && this.setInputDataType(0, t)) : console.error("Can't change GraphOutput to type", t, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(t, s) {
    if (t == "name") {
      if (s == "" || s == this.nameInGraph || s == "enabled")
        return !1;
      this.graph ? this.nameInGraph ? this.graph.renameOutput(this.nameInGraph, s) : this.graph.addOutput(s, `${this.properties.type}`, null) : console.error("[GraphOutput] missing graph!", t, s), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      t == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(t, s, n) {
    const i = this.getParentSubgraph();
    if (!i)
      return;
    const o = i.findOutputSlotIndexByName(this.properties.name);
    o == null || i.outputs[o] == null || i.triggerSlot(o, s);
  }
  onExecute() {
    const t = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, t);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeOutput(this.nameInGraph);
  }
}
K.slotLayout = {
  inputs: [
    { name: "", type: "" }
  ],
  outputs: []
};
h.registerNodeType({
  class: K,
  title: "Output",
  desc: "Output of the graph",
  type: "graph/output",
  hide_in_node_lists: !0
});
var xe = /* @__PURE__ */ ((e) => (e[e.STATUS_STOPPED = 1] = "STATUS_STOPPED", e[e.STATUS_RUNNING = 2] = "STATUS_RUNNING", e))(xe || {});
const Ce = class {
  constructor(e) {
    this.supported_types = null, this.vars = {}, this.extra = {}, this.inputs = {}, this.outputs = {}, this.links = {}, this.list_of_graphcanvas = [], this._nodes = [], this._groups = [], this._nodes_by_id = {}, this._nodes_executable = null, this._nodes_in_order = [], this._version = -1, this._last_trigger_time = 0, this._is_subgraph = !1, this._subgraph_node = null, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.execution_timer_id = -1, this.execution_time = 0, this.errors_in_execution = !1, h.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), e && this.configure(e);
  }
  getSupportedTypes() {
    return this.supported_types || Ce.DEFAULT_SUPPORTED_TYPES;
  }
  /*
     * Gets the root graph above any subgraphs.
     */
  getRootGraph() {
    const e = Array.from(this.iterateParentGraphs()), t = e[e.length - 1];
    return t._is_subgraph ? null : t;
  }
  *iterateParentGraphs() {
    var t;
    let e = this;
    for (; e; )
      yield e, e = (t = e._subgraph_node) == null ? void 0 : t.graph;
  }
  /** Removes all nodes from this graph */
  clear() {
    if (this.stop(), this.status = 1, this.last_node_id = 0, this.last_link_id = 0, this._version = -1, this._nodes)
      for (let e = 0; e < this._nodes.length; ++e) {
        const t = this._nodes[e];
        t.onRemoved && t.onRemoved();
      }
    this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._groups = [], this.links = {}, this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = 0.01, this.elapsed_time = 0.01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.inputs = {}, this.outputs = {}, this.change(), this.sendActionToCanvas("clear");
  }
  /** Attach Canvas to this graph */
  attachCanvas(e) {
    if (!(e instanceof N))
      throw "attachCanvas expects a LGraphCanvas instance";
    e.graph && e.graph != this && e.graph.detachCanvas(e), e.graph = this, this.list_of_graphcanvas || (this.list_of_graphcanvas = []), this.list_of_graphcanvas.push(e);
  }
  /** Detach Canvas to this graph */
  detachCanvas(e) {
    if (!this.list_of_graphcanvas)
      return;
    const t = this.list_of_graphcanvas.indexOf(e);
    t != -1 && (e.graph = null, this.list_of_graphcanvas.splice(t, 1));
  }
  /**
   * Starts running this graph every interval milliseconds.
   * @param interval amount of milliseconds between executions, if 0 then it renders to the monitor refresh rate
   */
  start(e) {
    if (this.status == 2)
      return;
    this.status = 2, this.onPlayEvent && this.onPlayEvent(), this.sendEventToAllNodes("onStart"), this.starttime = h.getTime(), this.last_update_time = this.starttime, e = e || 0;
    const t = this;
    if (e == 0 && typeof window < "u" && window.requestAnimationFrame) {
      let s = function() {
        t.execution_timer_id == -1 && (window.requestAnimationFrame(s), t.onBeforeStep && t.onBeforeStep(), t.runStep(1, !t.catch_errors), t.onAfterStep && t.onAfterStep());
      };
      this.execution_timer_id = -1, s();
    } else
      this.execution_timer_id = setInterval(() => {
        t.onBeforeStep && t.onBeforeStep(), t.runStep(1, !t.catch_errors), t.onAfterStep && t.onAfterStep();
      }, e);
  }
  /** Stops the execution loop of the graph */
  stop() {
    this.status != 1 && (this.status = 1, this.onStopEvent && this.onStopEvent(), this.execution_timer_id != null && (this.execution_timer_id != -1 && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
  }
  /**
   * Run N steps (cycles) of the graph
   * @param num number of steps to run, default is 1
   * @param do_not_catch_errors if you want to try/catch errors
   */
  runStep(e = 1, t = !1, s) {
    const n = h.getTime();
    this.globaltime = 1e-3 * (n - this.starttime);
    const i = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (!i)
      return;
    if (s = s || i.length, t) {
      for (var o = 0; o < e; o++) {
        for (var a = 0; a < s; ++a) {
          var r = i[a];
          r.mode == X.ALWAYS && r.onExecute && r.doExecute();
        }
        this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
      }
      this.onAfterExecute && this.onAfterExecute();
    } else
      try {
        for (var o = 0; o < e; o++) {
          for (var a = 0; a < s; ++a) {
            var r = i[a];
            r.mode == X.ALWAYS && r.onExecute && r.onExecute(null, {});
          }
          this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
        }
        this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
      } catch (f) {
        if (this.errors_in_execution = !0, h.throw_errors)
          throw f;
        h.debug && console.log(`Error during execution: ${f}`), this.stop();
      }
    const l = h.getTime();
    let u = l - n;
    u == 0 && (u = 1), this.execution_time = 1e-3 * u, this.globaltime += 1e-3 * u, this.iteration += 1, this.elapsed_time = (l - this.last_update_time) * 1e-3, this.last_update_time = l, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
  }
  /**
   * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
   * nodes with only inputs.
   */
  updateExecutionOrder() {
    this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];
    for (let e = 0; e < this._nodes_in_order.length; ++e)
      if (this._nodes_in_order[e].onExecute) {
        const t = this._nodes_in_order[e];
        this._nodes_executable.push(t);
      }
  }
  *computeExecutionOrderRecursive(e = !1, t) {
    for (const s of this.computeExecutionOrder(e, t))
      if (yield s, s.is(te))
        for (const n of s.subgraph.computeExecutionOrderRecursive(e, t))
          yield n;
  }
  /** This is more internal, it computes the executable nodes in order and returns it */
  computeExecutionOrder(e = !1, t) {
    let s = [];
    const n = [], i = {}, o = {}, a = {};
    for (var r = 0, f = this._nodes.length; r < f; ++r) {
      const p = this._nodes[r];
      if (e && !p.onExecute)
        continue;
      i[p.id] = p;
      let v = 0;
      if (p.inputs)
        for (var l = 0, u = p.inputs.length; l < u; l++)
          p.inputs[l] && p.inputs[l].link != null && (v += 1);
      v == 0 ? (n.push(p), t && (p._level = 1)) : (t && (p._level = 0), a[p.id] = v);
    }
    for (; n.length != 0; ) {
      const c = n.shift();
      if (s.push(c), delete i[c.id], !!c.outputs)
        for (var r = 0; r < c.outputs.length; r++) {
          const v = c.outputs[r];
          if (!(v == null || v.links == null || v.links.length == 0))
            for (var l = 0; l < v.links.length; l++) {
              const g = v.links[l], d = this.links[g];
              if (!d || o[d.id])
                continue;
              const y = this.getNodeById(d.target_id);
              if (y == null) {
                o[d.id] = !0;
                continue;
              }
              t && (!y._level || y._level <= c._level) && (y._level = c._level + 1), o[d.id] = !0, a[y.id] -= 1, a[y.id] == 0 && n.push(y);
            }
        }
    }
    for (const c of Object.keys(i).sort())
      s.push(i[c]);
    s.length != this._nodes.length && h.debug && console.warn("something went wrong, nodes missing");
    for (var f = s.length, r = 0; r < f; ++r)
      s[r].order = r;
    s = s.sort((c, p) => {
      const v = c.constructor.priority || c.priority || 0, _ = p.constructor.priority || p.priority || 0;
      return v == _ ? c.order - p.order : v - _;
    });
    for (var r = 0; r < f; ++r)
      s[r].order = r;
    return s;
  }
  /**
   * Returns all the nodes that could affect this one (ancestors) by crawling all the inputs recursively.
   * It doesn't include the node itself
   * @return an array with all the LGraphNodes that affect this node, in order of execution
   */
  getAncestors(e) {
    const t = [], s = [e], n = {};
    for (; s.length; ) {
      const i = s.shift();
      if (i.inputs) {
        !n[i.id] && i != e && (n[i.id] = !0, t.push(i));
        for (let o = 0; o < i.inputs.length; ++o) {
          const a = i.getInputNode(o);
          a && !t.includes(a) && s.push(a);
        }
      }
    }
    return t.sort((i, o) => i.order - o.order), t;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(e = 100, t = ae.HORIZONTAL_LAYOUT) {
    const s = this.computeExecutionOrder(!1, !0), n = [];
    for (let o = 0; o < s.length; ++o) {
      const a = s[o], r = a._level || 1;
      n[r] || (n[r] = []), n[r].push(a);
    }
    let i = e;
    for (let o = 0; o < n.length; ++o) {
      const a = n[o];
      if (!a)
        continue;
      let r = 100, l = e + h.NODE_TITLE_HEIGHT;
      for (let u = 0; u < a.length; ++u) {
        const f = a[u];
        f.pos[0] = t == ae.VERTICAL_LAYOUT ? l : i, f.pos[1] = t == ae.VERTICAL_LAYOUT ? i : l;
        const c = t == ae.VERTICAL_LAYOUT ? 1 : 0;
        f.size[c] > r && (r = f.size[c]);
        const p = t == ae.VERTICAL_LAYOUT ? 0 : 1;
        l += f.size[p] + e + h.NODE_TITLE_HEIGHT;
      }
      i += r + e;
    }
    this.setDirtyCanvas(!0, !0);
  }
  /**
   * Returns the amount of time the graph has been running in milliseconds
   * @return number of milliseconds the graph has been running
   */
  getTime() {
    return this.globaltime;
  }
  /**
   * Returns the amount of time accumulated using the fixedtime_lapse var. This is used in context where the time increments should be constant
   * @return number of milliseconds the graph has been running
   */
  getFixedTime() {
    return this.fixedtime;
  }
  /**
   * Returns the amount of time it took to compute the latest iteration. Take into account that this number could be not correct
   * if the nodes are using graphical actions
   * @return number of milliseconds it took the last cycle
   */
  getElapsedTime() {
    return this.elapsed_time;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesInOrder() {
    const e = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const t of e)
      yield t;
  }
  /**
   * Iterates all nodes in this graph and subgraphs.
   */
  *iterateNodesInOrderRecursive() {
    const e = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const t of e)
      if (yield t, t.subgraph != null)
        for (const s of t.subgraph.iterateNodesInOrderRecursive())
          yield s;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClass(e) {
    const t = e.__LITEGRAPH_TYPE__;
    if (t != null)
      for (const s of this.iterateNodesInOrder())
        s.type === t && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClassRecursive(e) {
    const t = e.__LITEGRAPH_TYPE__;
    if (t != null)
      for (const s of this.iterateNodesInOrderRecursive())
        s.type === t && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfTypeRecursive(e) {
    for (const t of this.iterateNodesInOrderRecursive())
      t.type === e && (yield t);
  }
  /**
   * Sends an event to all the nodes, useful to trigger stuff
   * @param eventName the name of the event (function to be called)
   * @param params parameters in array format
   */
  sendEventToAllNodes(e, t = [], s = X.ALWAYS) {
    if (this._nodes_in_order ? this._nodes_in_order : this._nodes)
      for (const i of this.iterateNodesInOrder()) {
        if (i.type === "basic/subgraph" && e != "onExecute") {
          i.mode == s && i.sendEventToAllNodes(e, t, s);
          continue;
        }
        !i[e] || i.mode != s || (t === void 0 ? i[e]() : t && t.constructor === Array ? i[e].apply(i, t) : i[e](t));
      }
  }
  sendActionToCanvas(e, t = []) {
    if (this.list_of_graphcanvas)
      for (let s = 0; s < this.list_of_graphcanvas.length; ++s) {
        const n = this.list_of_graphcanvas[s];
        n[e] && n[e].apply(n, t);
      }
  }
  addGroup(e) {
    return this._groups.push(e), this.setDirtyCanvas(!0), this.change(), e.graph = this, this._version++, e;
  }
  /**
   * Adds a new node instance to this graph
   * @param node the instance of the node
   */
  add(e, t = {}) {
    if (e.id != -1 && this._nodes_by_id[e.id] != null && (console.warn(
      "LiteGraph: there is already a node with this ID, changing it",
      e.id
    ), h.use_uuids ? e.id = ne() : e.id = ++this.last_node_id), t.pos && (isNaN(t.pos[0]) || isNaN(t.pos[1])))
      throw "LiteGraph: Node position contained NaN(s)!";
    if (this._nodes.length >= h.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return h.use_uuids ? e.id || (e.id = ne()) : e.id == null || e.id == -1 ? e.id = ++this.last_node_id : this.last_node_id < e.id && (this.last_node_id = e.id), e.graph = this, this._version++, this._nodes.push(e), this._nodes_by_id[e.id] = e, t.pos && (e.pos = t.pos), e.onAdded && e.onAdded(this), this.config.align_to_grid && e.alignToGrid(), t.skipComputeOrder || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(e, t), this.setDirtyCanvas(!0), this.change(), e;
  }
  /** Removes a node from the graph */
  remove(e, t = {}) {
    if (e instanceof fe) {
      const i = this._groups.indexOf(e);
      i != -1 && this._groups.splice(i, 1), e.graph = null, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[e.id] == null || e.ignore_remove)
      return;
    if (this.beforeChange(), e.inputs)
      for (var s = 0; s < e.inputs.length; s++)
        e.inputs[s].link != null && e.disconnectInput(s);
    if (e.outputs)
      for (var s = 0; s < e.outputs.length; s++) {
        const o = e.outputs[s];
        o.links != null && o.links.length && e.disconnectOutput(s);
      }
    if (e.onRemoved && e.onRemoved(t), e.graph = null, this._version++, this.list_of_graphcanvas)
      for (var s = 0; s < this.list_of_graphcanvas.length; ++s) {
        const o = this.list_of_graphcanvas[s];
        o.selected_nodes[e.id] && delete o.selected_nodes[e.id], o.node_dragged == e && (o.node_dragged = null);
      }
    const n = this._nodes.indexOf(e);
    n != -1 && this._nodes.splice(n, 1), delete this._nodes_by_id[e.id], this.onNodeRemoved && this.onNodeRemoved(e, t), this.sendActionToCanvas("checkPanels"), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
  }
  /** Returns a node by its id. */
  getNodeById(e) {
    return e == null ? null : this._nodes_by_id[e];
  }
  /** Returns a node by its id. */
  getNodeByIdRecursive(e) {
    const t = this.getNodeById(e);
    if (t != null)
      return t;
    for (const s of this.iterateNodesOfClass(te)) {
      const n = s.subgraph.getNodeByIdRecursive(e);
      if (n)
        return n;
    }
    return null;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClass(e, t = []) {
    t.length = 0;
    for (const s of this.iterateNodesOfClass(e))
      t.push(s);
    return t;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByType(s, t = []) {
    var s = s.toLowerCase();
    t.length = 0;
    for (let n = 0, i = this._nodes.length; n < i; ++n)
      this._nodes[n].type.toLowerCase() == s && t.push(this._nodes[n]);
    return t;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClassRecursive(e, t = []) {
    t.length = 0;
    for (const s of this.iterateNodesOfClassRecursive(e))
      t.push(s);
    return t;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByTypeRecursive(s, t = []) {
    var s = s.toLowerCase();
    t.length = 0;
    for (const n of this.iterateNodesOfTypeRecursive(s))
      t.push(n);
    return t;
  }
  /**
   * Returns the first node that matches a name in its title
   * @param title the name of the node to search
   * @return the node or null
   */
  findNodeByTitle(e) {
    for (let t = 0, s = this._nodes.length; t < s; ++t)
      if (this._nodes[t].title == e)
        return this._nodes[t];
    return null;
  }
  /**
   * Returns a list of nodes that matches a name
   * @param title the name of the node to search
   * @return a list with all the nodes with this name
   */
  findNodesByTitle(e) {
    const t = [];
    for (let s = 0, n = this._nodes.length; s < n; ++s)
      this._nodes[s].title == e && t.push(this._nodes[s]);
    return t;
  }
  /**
   * Returns the top-most node in this position of the canvas
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @param nodesList a list with all the nodes to search from, by default is all the nodes in the graph
   * @return the node at this position or null
   */
  getNodeOnPos(e, t, s, n) {
    s = s || this._nodes;
    const i = null;
    for (let o = s.length - 1; o >= 0; o--) {
      const a = s[o], r = a.titleMode == ee.NO_TITLE;
      if (a.isPointInside(e, t, n, r))
        return a;
    }
    return i;
  }
  /**
   * Returns the top-most group in that position
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @return the group or null
   */
  getGroupOnPos(e, t) {
    for (let s = this._groups.length - 1; s >= 0; s--) {
      const n = this._groups[s];
      if (n.isPointInside(e, t, 2, !0))
        return n;
    }
    return null;
  }
  /**
   * Checks that the node type matches the node type registered, used when replacing a nodetype by a newer version during execution
   * this replaces the ones using the old version with the new version
   * @method checkNodeTypes
   */
  checkNodeTypes() {
    let e = !1;
    for (let t = 0; t < this._nodes.length; t++) {
      const s = this._nodes[t], n = h.registered_node_types[s.type];
      if (s.constructor == n.class)
        continue;
      console.log(`node being replaced by newer version: ${s.type}`);
      const i = h.createNode(s.type);
      e = !0, this._nodes[t] = i, i.configure(s.serialize()), i.graph = this, this._nodes_by_id[i.id] = i, s.inputs && (i.inputs = s.inputs.concat()), s.outputs && (i.outputs = s.outputs.concat());
    }
    return this.updateExecutionOrder(), e;
  }
  // ********** GLOBALS *****************
  onAction(e, t, s = {}) {
    for (const n of this.iterateNodesOfClass(j))
      if (n.properties.name == e) {
        n.actionDo(e, t, s);
        break;
      }
  }
  trigger(e, t) {
    this.onTrigger && this.onTrigger(e, t);
  }
  triggerSlot(e, t) {
    this.onTrigger && this.onTrigger(e, t);
  }
  /** Tell this graph it has a global graph input of this type */
  addInput(e, t, s) {
    this.inputs[e] || (this.beforeChange(), this.inputs[e] = { name: e, type: t, value: s }, this._version++, this.afterChange(), this.onInputAdded && this.onInputAdded(e, t, s), this.onInputsOutputsChange && this.onInputsOutputsChange());
  }
  /** Assign a data to the global graph input */
  setInputData(e, t) {
    const s = this.inputs[e];
    s && (s.value = t);
  }
  /** Returns the current value of a global graph input */
  getInputData(e) {
    const t = this.inputs[e];
    return t ? t.value : null;
  }
  /** Changes the name of a global graph input */
  renameInput(e, t) {
    if (t != e)
      return this.inputs[e] ? this.inputs[t] ? (console.error("there is already one input with that name"), !1) : (this.inputs[t] = this.inputs[e], delete this.inputs[e], this._version++, this.onInputRenamed && this.onInputRenamed(e, t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph input */
  changeInputType(e, t) {
    if (!this.inputs[e])
      return !1;
    if (this.inputs[e].type && String(this.inputs[e].type).toLowerCase() == String(t).toLowerCase())
      return;
    const s = this.inputs[e].type;
    return this.inputs[e].type = t, this._version++, this.onInputTypeChanged && this.onInputTypeChanged(e, s, t), !0;
  }
  /** Removes a global graph input */
  removeInput(e) {
    return this.inputs[e] ? (delete this.inputs[e], this._version++, this.onInputRemoved && this.onInputRemoved(e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Creates a global graph output */
  addOutput(e, t, s) {
    this.outputs[e] = { name: e, type: t, value: s }, this._version++, this.onOutputAdded && this.onOutputAdded(e, t, s), this.onInputsOutputsChange && this.onInputsOutputsChange();
  }
  /** Assign a data to the global output */
  setOutputData(e, t) {
    const s = this.outputs[e];
    s && (s.value = t);
  }
  /** Returns the current value of a global graph output */
  getOutputData(e) {
    const t = this.outputs[e];
    return t ? t.value : null;
  }
  /** Renames a global graph output */
  renameOutput(e, t) {
    return this.outputs[e] ? this.outputs[t] ? (console.error("there is already one output with that name"), !1) : (this.outputs[t] = this.outputs[e], delete this.outputs[e], this._version++, this.onOutputRenamed && this.onOutputRenamed(e, t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph output */
  changeOutputType(e, t) {
    if (!this.outputs[e])
      return !1;
    if (this.outputs[e].type && String(this.outputs[e].type).toLowerCase() == String(t).toLowerCase())
      return;
    const s = this.outputs[e].type;
    return this.outputs[e].type = t, this._version++, this.onOutputTypeChanged && this.onOutputTypeChanged(e, s, t), !0;
  }
  /** Removes a global graph output */
  removeOutput(e) {
    return this.outputs[e] ? (delete this.outputs[e], this._version++, this.onOutputRemoved && this.onOutputRemoved(e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /* TODO implement
      triggerInput(name: string, value: any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].onTrigger(value);
          }
      }
  
      setCallback(name: string, func: (...args: any[]) => any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].setTrigger(func);
          }
      }
      */
  /** used for undo, called before any change is made to the graph */
  beforeChange(e) {
    this.onBeforeChange && this.onBeforeChange(this, e), this.sendActionToCanvas("onBeforeChange", [this]);
  }
  /** used to resend actions, called after any change is made to the graph */
  afterChange(e) {
    this.onAfterChange && this.onAfterChange(this, e), this.sendActionToCanvas("onAfterChange", [this]);
  }
  connectionChange(e, t) {
    this.updateExecutionOrder(), this.onConnectionChange && this.onConnectionChange(e), this._version++, this.sendActionToCanvas("onConnectionChange");
  }
  /** returns if the graph is in live mode */
  isLive() {
    if (!this.list_of_graphcanvas)
      return !1;
    for (let e = 0; e < this.list_of_graphcanvas.length; ++e)
      if (this.list_of_graphcanvas[e].live_mode)
        return !0;
    return !1;
  }
  /** clears the triggered slot animation in all links (stop visual animation) */
  clearTriggeredSlots() {
    for (const e in this.links) {
      const t = this.links[e];
      t && t._last_time && (t._last_time = 0);
    }
  }
  /* Called when something visually changed (not the graph!) */
  change() {
    h.debug && console.log("Graph changed"), this.sendActionToCanvas("setDirty", [!0, !0]), this.onChange && this.onChange(this);
  }
  setDirtyCanvas(e = !1, t = !1) {
    this.sendActionToCanvas("setDirty", [e, t]);
  }
  /** Destroys a link */
  removeLink(e) {
    const t = this.links[e];
    if (!t)
      return;
    const s = this.getNodeById(t.target_id);
    s && s.disconnectInput(t.target_slot);
  }
  /** Creates a Object containing all the info about this graph, it can be serialized */
  serialize() {
    const e = [];
    for (var t = 0, s = this._nodes.length; t < s; ++t)
      e.push(this._nodes[t].serialize());
    const n = [];
    for (const a in this.links) {
      let r = this.links[a];
      if (!r.serialize) {
        console.error(
          "weird LLink bug, link info is not a LLink but a regular object",
          r
        );
        const l = le.configure(r);
        for (const u in r)
          l[u] = r[u];
        this.links[a] = l, r = l;
      }
      n.push(r.serialize());
    }
    const i = [];
    for (var t = 0; t < this._groups.length; ++t)
      i.push(this._groups[t].serialize());
    const o = {
      last_node_id: this.last_node_id,
      last_link_id: this.last_link_id,
      nodes: e,
      links: n,
      groups: i,
      config: this.config,
      extra: this.extra,
      version: h.VERSION
    };
    return this.onSerialize && this.onSerialize(o), o;
  }
  /**
   * Configure a graph from a JSON string
   * @param data configure a graph from a JSON string
   * @returns if there was any error parsing
   */
  configure(e, t) {
    if (!e)
      return;
    t || this.clear();
    const s = e.nodes;
    if (e.links && e.links.constructor === Array) {
      const l = [];
      for (var n = 0; n < e.links.length; ++n) {
        const u = e.links[n];
        if (!u) {
          console.warn("serialized graph link data contains errors, skipping.");
          continue;
        }
        const f = le.configure(u);
        l[f.id] = f;
      }
      e.links = l;
    }
    for (const l in e)
      l == "nodes" || l == "groups" || (this[l] = e[l]);
    let i = !1;
    if (this._nodes = [], s) {
      for (var n = 0, o = s.length; n < o; ++n) {
        var a = s[n], r = h.createNode(a.type, a.title);
        r || (console.error(
          `Node not found or has errors: ${a.type}`
        ), r = new oe(), r.last_serialization = a, r.has_errors = !0, i = !0), r.id = a.id, this.add(r, { addedBy: "configure", skipComputeOrder: !0 });
      }
      for (var n = 0, o = s.length; n < o; ++n) {
        var a = s[n], r = this.getNodeById(a.id);
        r && r.configure(a);
      }
    }
    if (this._groups.length = 0, e.groups)
      for (var n = 0; n < e.groups.length; ++n) {
        const u = new fe();
        u.configure(e.groups[n]), this.addGroup(u);
      }
    return this.updateExecutionOrder(), this.extra = e.extra || {}, this.onConfigure && this.onConfigure(e), this._version++, this.setDirtyCanvas(!0, !0), i;
  }
  load(e, t) {
    const s = this;
    if (e.constructor === File || e.constructor === Blob) {
      const i = new FileReader();
      i.addEventListener("load", (o) => {
        const a = JSON.parse(i.result);
        s.configure(a), t && t(a);
      }), i.readAsText(e);
      return;
    }
    const n = new XMLHttpRequest();
    n.open("GET", e, !0), n.send(null), n.onload = function(i) {
      if (n.status !== 200) {
        console.error("Error loading graph:", n.status, n.response);
        return;
      }
      const o = JSON.parse(n.response);
      s.configure(o), t && t(o);
    }, n.onerror = function(i) {
      console.error("Error loading graph:", i);
    };
  }
};
let we = Ce;
we.DEFAULT_SUPPORTED_TYPES = ["number", "string", "boolean"];
function Se(e) {
  const t = { nodeIDs: {}, linkIDs: {} };
  for (const s of e.nodes) {
    const n = s.id, i = ne();
    if (s.id = i, t.nodeIDs[n] || t.nodeIDs[i])
      throw new Error(`New/old node UUID wasn't unique in changed map! ${n} ${i}`);
    t.nodeIDs[n] = i, t.nodeIDs[i] = n;
  }
  for (const s of e.links) {
    const n = s[0], i = ne();
    if (s[0] = i, t.linkIDs[n] || t.linkIDs[i])
      throw new Error(`New/old link UUID wasn't unique in changed map! ${n} ${i}`);
    t.linkIDs[n] = i, t.linkIDs[i] = n;
    const o = s[1], a = s[3];
    if (!t.nodeIDs[o])
      throw new Error(`Old node UUID not found in mapping! ${o}`);
    if (s[1] = t.nodeIDs[o], !t.nodeIDs[a])
      throw new Error(`Old node UUID not found in mapping! ${a}`);
    s[3] = t.nodeIDs[a];
  }
  for (const s of e.nodes) {
    for (const n of s.inputs)
      n.link && (n.link = t.linkIDs[n.link]);
    for (const n of s.outputs)
      n.links && (n.links = n.links.map((i) => t.linkIDs[i]));
  }
  for (const s of e.nodes)
    if (s.type === "graph/subgraph") {
      const n = Se(s.subgraph);
      t.nodeIDs = { ...t.nodeIDs, ...n.nodeIDs }, t.linkIDs = { ...t.linkIDs, ...n.linkIDs };
    }
  return t;
}
function Ue(e, t) {
  for (const s of e.iterateNodesInOrderRecursive())
    s.onReassignID && s.onReassignID(t);
}
const Ae = class extends oe {
  constructor(e, t) {
    super(e), this.properties = {
      enabled: !0
    }, this.size = [140, 80], this.enabled = !0, this.subgraph = (t || Ae.default_lgraph_factory)(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0;
    const s = (n, i) => {
      const o = i.bind(this);
      return function(...a) {
        n == null || n.apply(this, a), o(...a);
      };
    };
    this.subgraph.onTrigger = s(this.subgraph.onTrigger, this.onSubgraphTrigger), this.subgraph.onNodeAdded = s(this.subgraph.onNodeAdded, this.onSubgraphNodeAdded), this.subgraph.onNodeRemoved = s(this.subgraph.onNodeRemoved, this.onSubgraphNodeRemoved), this.subgraph.onInputAdded = s(this.subgraph.onInputAdded, this.onSubgraphNewInput), this.subgraph.onInputRenamed = s(this.subgraph.onInputRenamed, this.onSubgraphRenamedInput), this.subgraph.onInputTypeChanged = s(this.subgraph.onInputTypeChanged, this.onSubgraphTypeChangeInput), this.subgraph.onInputRemoved = s(this.subgraph.onInputRemoved, this.onSubgraphRemovedInput), this.subgraph.onOutputAdded = s(this.subgraph.onOutputAdded, this.onSubgraphNewOutput), this.subgraph.onOutputRenamed = s(this.subgraph.onOutputRenamed, this.onSubgraphRenamedOutput), this.subgraph.onOutputTypeChanged = s(this.subgraph.onOutputTypeChanged, this.onSubgraphTypeChangeOutput), this.subgraph.onOutputRemoved = s(this.subgraph.onOutputRemoved, this.onSubgraphRemovedOutput);
  }
  // getRootGraph(): LGraph | null {
  //     const graphs = Array.from(this.iterateParentGraphs());
  //     const graph = graphs[graphs.length - 1]
  //     // console.warn(graph._is_subgraph)
  //     if (graph._is_subgraph)
  //         return null;
  //     return graph;
  // }
  *iterateParentGraphs() {
    var t;
    let e = this.graph;
    for (; e; )
      yield e, e = (t = e._subgraph_node) == null ? void 0 : t.graph;
  }
  onDblClick(e, t, s) {
    const n = this;
    setTimeout(() => {
      s.openSubgraph(n.subgraph);
    }, 10);
  }
  onAction(e, t, s) {
    const { originNode: n, link: i } = s;
    if (!n || !i)
      return;
    const o = i.target_slot;
    this.getInnerGraphInputByIndex(o).triggerSlot(0, t);
  }
  onExecute() {
    if (this.enabled = this.getInputOrProperty("enabled"), !!this.enabled) {
      if (this.inputs)
        for (var e = 0; e < this.inputs.length; e++) {
          const s = this.inputs[e];
          var t = this.getInputData(e);
          this.subgraph.setInputData(s.name, t);
        }
      if (this.subgraph.runStep(), this.outputs)
        for (var e = 0; e < this.outputs.length; e++) {
          const n = this.outputs[e];
          var t = this.subgraph.getOutputData(n.name);
          this.setOutputData(e, t);
        }
    }
  }
  sendEventToAllNodes(e, t, s) {
    this.enabled && this.subgraph.sendEventToAllNodes(e, t, s);
  }
  onDrawBackground(e, t, s, n) {
  }
  // override onMouseDown(e, localpos, graphcanvas)
  // {
  // 	var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  // 	if(localpos[1] > y)
  // 	{
  // 		graphcanvas.showSubgraphPropertiesDialog(this);
  // 	}
  // }
  // override onMouseDown(e: MouseEventExt, localpos: Vector2, graphcanvas: LGraphCanvas): boolean | undefined {
  //     var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  //     console.log(0)
  //     if (localpos[1] > y) {
  //         if (localpos[0] < this.size[0] / 2) {
  //             console.log(1)
  //             graphcanvas.showSubgraphPropertiesDialog(this);
  //         } else {
  //             console.log(2)
  //             graphcanvas.showSubgraphPropertiesDialogRight(this);
  //         }
  //     }
  //     return false;
  // }
  computeSize() {
    const e = this.inputs ? this.inputs.length : 0, t = this.outputs ? this.outputs.length : 0;
    return [200, Math.max(e, t) * h.NODE_SLOT_HEIGHT + h.NODE_SLOT_HEIGHT * 0.5];
  }
  //* *** INPUTS ***********************************
  onSubgraphTrigger(e, t) {
  }
  onSubgraphNodeAdded(e, t) {
    var s, n;
    (s = this.graph) != null && s.onNodeAdded && (t.subgraphs || (t.subgraphs = []), t.subgraphs.push(this), (n = this.graph) == null || n.onNodeAdded(e, t));
  }
  onSubgraphNodeRemoved(e, t) {
    var s, n;
    (s = this.graph) != null && s.onNodeRemoved && (t.subgraphs || (t.subgraphs = []), t.subgraphs.push(this), (n = this.graph) == null || n.onNodeRemoved(e, t));
  }
  onSubgraphNewInput(e, t) {
    this.findInputSlotIndexByName(e) == -1 && this.addInput(e, t);
  }
  onSubgraphRenamedInput(e, t) {
    const s = this.findInputSlotIndexByName(e);
    if (s == -1)
      return;
    const n = this.getInputInfo(s);
    n.name = t;
  }
  onSubgraphTypeChangeInput(e, t, s) {
    const n = this.findInputSlotIndexByName(e);
    if (n == -1)
      return;
    const i = this.getInputInfo(n);
    i.type = s;
  }
  onSubgraphRemovedInput(e) {
    const t = this.findInputSlotIndexByName(e);
    t != -1 && this.removeInput(t);
  }
  //* *** OUTPUTS ***********************************
  onSubgraphNewOutput(e, t) {
    this.findOutputSlotIndexByName(e) == -1 && this.addOutput(e, t);
  }
  onSubgraphRenamedOutput(e, t) {
    const s = this.findOutputSlotIndexByName(e);
    if (s == -1)
      return;
    const n = this.getOutputInfo(s);
    n.name = t;
  }
  onSubgraphTypeChangeOutput(e, t, s) {
    const n = this.findOutputSlotIndexByName(e);
    if (n == -1)
      return;
    const i = this.getOutputInfo(n);
    i.type = s;
  }
  onSubgraphRemovedOutput(e) {
    const t = this.findOutputSlotIndexByName(e);
    t != -1 && this.removeOutput(t);
  }
  // *****************************************************
  getExtraMenuOptions(e, t) {
    const s = this;
    return [
      {
        content: "Open",
        callback() {
          e.openSubgraph(s.subgraph);
        }
      }
    ];
  }
  onResize(e) {
    console.error("TEST subgraph resize");
  }
  serialize() {
    const e = oe.prototype.serialize.call(this);
    return e.subgraph = this.subgraph.serialize(), e;
  }
  // no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()
  onConfigure(e) {
    super.onConfigure && super.onConfigure(e), this.subgraph._is_subgraph = !0, this.subgraph._subgraph_node = this;
    for (const t of this.subgraph.iterateNodesInOrder())
      (t.is(j) || t.is(K)) && (t.properties.subgraphID = this.id);
  }
  onReassignID() {
    for (const e of this.subgraph.iterateNodesInOrder())
      (e.is(j) || e.is(K)) && (e.properties.subgraphID = this.id);
  }
  clone(e = { forNode: {} }) {
    var i, o, a, r;
    const t = h.createNode(this.type), s = this.serialize();
    let n = null;
    if (h.use_uuids) {
      const l = h.cloneObject(s.subgraph);
      n = Se(l), s.subgraph = l;
    }
    return delete s.id, delete s.inputs, delete s.outputs, t.configure(s), h.use_uuids && Ue(t.subgraph, n), (i = e.forNode)[o = this.id] || (i[o] = {}), e.forNode[this.id].subgraphNewIDMapping = n, (a = e.forNode)[r = t.id] || (a[r] = {}), e.forNode[t.id].subgraphNewIDMapping = n, t;
  }
  buildFromNodes(e) {
    var d, y;
    if (e = e.filter((m) => !m.is(j) && !m.is(K)), e.length === 0)
      return;
    const t = {}, s = {}, n = {}, i = e.reduce((m, E) => (m[E.id] = E, m), {});
    let o = Number.MAX_SAFE_INTEGER, a = 0, r = Number.MAX_SAFE_INTEGER, l = 0;
    for (const m of Object.values(e))
      o = Math.min(m.pos[0], o), a = Math.max(m.pos[0] + m.size[0], a), r = Math.min(m.pos[1], r), l = Math.max(m.pos[1] + m.size[1], l);
    const u = {};
    for (const m of e) {
      u[m.id] = m;
      for (let E = 0; E < m.inputs.length; E++) {
        const T = m.getInputLink(E);
        if (T) {
          const b = m.getConnectionPos(!0, E), I = m.getInputInfo(E), S = m.getInputNode(E);
          S && (u[S.id] = S), i[T.origin_id] != null ? n[T.id] = [T, b] : t[T.id] = [T, b, I.name];
        }
      }
      for (let E = 0; E < m.outputs.length; E++) {
        const T = m.getOutputLinks(E);
        for (const b of T) {
          const I = m.getConnectionPos(!1, E), S = m.getOutputInfo(E), B = m.graph.getNodeById(b.target_id);
          B && (u[B.id] = B), i[b.target_id] != null ? n[b.id] = [b, I] : s[b.id] = [b, I, S.name];
        }
      }
    }
    const f = Object.values(t), c = Object.values(s);
    f.sort((m, E) => m[1][1] - E[1][1]), c.sort((m, E) => m[1][1] - E[1][1]), h.debug && (console.debug("NODES", Object.keys(e)), console.debug("IN", Object.keys(t)), console.debug("OUT", Object.keys(s)), console.debug("INNER", Object.keys(n)));
    const p = {}, v = {};
    for (const m of e) {
      const E = [m.pos[0] - o, m.pos[1] - r], T = m.id;
      m.graph.remove(m, { removedBy: "moveIntoSubgraph" }), this.subgraph.add(m, { addedBy: "moveIntoSubgraph", prevNodeID: T }), m.pos = E, u[T] = m, u[m.id] = m;
    }
    let _ = 0, g = 0;
    for (const [m, E, T] of f) {
      let b = null;
      if (p[m.origin_id] && (b = p[m.origin_id][m.origin_slot]), !b && (b = this.addGraphInput(T, m.type, [-200, _]), _ += b.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !b)) {
        console.error("Failed creating subgraph output pair!", m);
        continue;
      }
      const I = u[m.origin_id], S = u[m.target_id];
      I.connect(m.origin_slot, this, b.outerInputIndex), b.innerNode.connect(0, S, m.target_slot), p[d = m.origin_id] || (p[d] = {}), p[m.origin_id][m.origin_slot] = b;
    }
    for (const [m, E, T] of c) {
      let b = null;
      if (v[m.target_id] && (b = v[m.target_id][m.target_slot]), !b && (b = this.addGraphOutput(T, m.type, [a - o + 200, g]), g += b.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !b)) {
        console.error("Failed creating subgraph output pair!", m);
        continue;
      }
      const I = u[m.origin_id], S = u[m.target_id];
      I.connect(m.origin_slot, b.innerNode, 0), this.connect(b.outerOutputIndex, S, m.target_slot), v[y = m.target_id] || (v[y] = {}), v[m.target_id][m.origin_slot] = b;
    }
    for (const [m, E] of Object.values(n)) {
      const T = u[m.origin_id], b = u[m.target_id];
      T.connect(m.origin_slot, b, m.target_slot);
    }
  }
  addGraphInput(e, t, s) {
    e = this.getValidGraphInputName(e);
    const n = h.createNode(j);
    if (n == null)
      return null;
    let i = t;
    t === BuiltInSlotType.EVENT ? i = BuiltInSlotType.ACTION : t === BuiltInSlotType.ACTION && (t = BuiltInSlotType.EVENT), console.warn("[Subgraph] addGraphInput", e, t, i, s), n.setProperty("name", e), n.setProperty("type", t), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const o = n.computeSize();
    s && (n.pos = [s[0] - o[0] * 0.5, s[1] - o[1] * 0.5]), this.subgraph.addInput(e, i, null);
    const a = this.inputs.length - 1, r = this.inputs[a];
    return { innerNode: n, outerInput: r, outerInputIndex: a };
  }
  addGraphOutput(e, t, s) {
    e = this.getValidGraphOutputName(e);
    const n = h.createNode(K);
    if (n == null)
      return null;
    let i = t;
    t === BuiltInSlotType.EVENT ? t = BuiltInSlotType.ACTION : t === BuiltInSlotType.ACTION && (i = BuiltInSlotType.EVENT), console.warn("[Subgraph] addGraphOutput", e, t, i, s), n.setProperty("name", e), n.setProperty("type", t), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const o = n.computeSize();
    s && (n.pos = [s[0], s[1] - o[1] * 0.5]), this.subgraph.addOutput(e, i, null);
    const a = this.outputs.length - 1, r = this.outputs[a];
    return { innerNode: n, outerOutput: r, outerOutputIndex: a };
  }
  removeGraphInput(e) {
    if (this.findInputSlotIndexByName(e) == null) {
      console.error("[Subgraph] No input in slot!", e);
      return;
    }
    const s = this.subgraph.findNodesByClass(j).filter((n) => n.properties.name === e);
    if (s.length > 0)
      for (const n of s)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphInputs found on input removal", e);
      const n = this.findInputSlotIndexByName(e);
      n !== -1 && this.removeInput(n);
    }
  }
  removeGraphOutput(e) {
    if (this.findOutputSlotIndexByName(e) == null) {
      console.error("[Subgraph] No output in slot!", e);
      return;
    }
    const s = this.subgraph.findNodesByClass(K).filter((n) => n.properties.name === e);
    if (s.length > 0)
      for (const n of s)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphOutputs found on output removal", e);
      const n = this.findOutputSlotIndexByName(e);
      n !== -1 && this.removeOutput(n);
    }
  }
  getValidGraphInputName(e) {
    e || (e = "newInput");
    let t = e, s = this.getInnerGraphInput(t), n = 1;
    for (; s != null; )
      t = `${e}_${n++}`, s = this.getInnerGraphInput(t);
    return t;
  }
  getValidGraphOutputName(e) {
    e || (e = "newOutput");
    let t = e, s = this.getInnerGraphOutput(t), n = 1;
    for (; s != null; )
      t = `${e}_${n++}`, s = this.getInnerGraphOutput(t);
    return t;
  }
  getInnerGraphOutput(e) {
    return this.subgraph._nodes.find((s) => s.is(K) && s.properties.name === e) || null;
  }
  getInnerGraphInput(e) {
    return this.subgraph._nodes.find((s) => s.is(j) && s.properties.name === e) || null;
  }
  getInnerGraphOutputByIndex(e) {
    const t = this.getOutputInfo(e);
    return t ? this.getInnerGraphOutput(t.name) : null;
  }
  getInnerGraphInputByIndex(e) {
    const t = this.getInputInfo(e);
    return t ? this.getInnerGraphInput(t.name) : null;
  }
  moveNodesToParentGraph(e) {
    if (e = e.filter((_) => !_.is(j) && !_.is(K)), e.length === 0)
      return;
    const t = this, s = t.graph;
    let n = Number.MAX_SAFE_INTEGER, i = 0, o = Number.MAX_SAFE_INTEGER, a = 0;
    for (const _ of Object.values(e))
      n = Math.min(_.pos[0], n), i = Math.max(_.pos[0] + _.size[0], i), o = Math.min(_.pos[1], o), a = Math.max(_.pos[1] + _.size[1], a);
    const r = i - n, l = a - o, u = t.pos[0] + t.size[0] / 2 - r / 2, f = t.pos[1] + t.size[1] / 2 - l / 2, c = {}, p = {};
    for (const [_, g] of e.entries())
      p[g.id] = g;
    for (const _ of e)
      for (const g of _.iterateAllLinks()) {
        const d = g.target_id === _.id, y = _.getConnectionPos(d, d ? g.target_slot : g.origin_slot);
        p[g.origin_id] != null && p[g.target_id] != null && (c[g.id] = [g, y]);
      }
    const v = {};
    for (const [_, g] of e.entries()) {
      const d = [g.pos[0] - n + u, g.pos[1] - o + f], y = g.id;
      g.graph.remove(g, { removedBy: "moveOutOfSubgraph" }), s.add(g, { addedBy: "moveOutOfSubgraph", prevNodeID: y }), g.pos = d, v[y] = g;
    }
    for (const [_, g] of Object.values(c)) {
      const d = p[_.origin_id], y = p[_.target_id];
      d.connect(_.origin_slot, y, _.target_slot);
    }
    return v;
  }
  convertNodesToSubgraphInputs(e) {
    var r;
    if (e = e.filter((l) => !l.is(j) && !l.is(K)), e.length === 0)
      return;
    const t = de(e, (l) => l.id), s = [], n = {}, i = this.subgraph;
    for (const l of e)
      for (const u of l.iterateAllLinks()) {
        if (t[u.origin_id] == null)
          throw new Error("Can't convert to input with an origin link outward");
        if (t[u.target_id] == null) {
          s.push(u);
          const f = [0, 0];
          l.getConnectionPos(!1, u.target_slot, f), n[l.id] = [[l.pos[0], l.pos[1]], f];
        }
      }
    const o = this.moveNodesToParentGraph(e), a = {};
    for (const l of s) {
      const u = i.getNodeById(l.target_id), f = u.getInputInfo(l.target_slot);
      a[r = l.origin_id] || (a[r] = {});
      let c = a[l.origin_id][l.origin_slot];
      if (c == null) {
        const v = this.getValidGraphInputName(f.name);
        c = this.addGraphInput(v, f.type), a[l.origin_id][l.origin_slot] = c;
        const [_, g] = n[l.origin_id], d = c.innerNode.pos, y = c.innerNode.computeSize(), m = c.innerNode.getConnectionPos(!0, 0), E = [c.innerNode.pos[0] - m[0], c.innerNode.pos[1] - m[1]], T = [g[0] + E[0] - y[0], g[1] + E[1]];
        console.warn("newPos", d, "size", c.innerNode.size, "connPos", g, "newConPos", m, "offset", E), c.innerNode.pos = T;
      }
      o[l.origin_id].connect(l.origin_slot, this, c.outerInputIndex), c.innerNode.connect(0, u, l.target_slot);
    }
  }
  convertNodesToSubgraphOutputs(e) {
    var r;
    if (e = e.filter((l) => !l.is(j) && !l.is(K)), e.length === 0)
      return;
    const t = de(e, (l) => l.id), s = [], n = {}, i = this.subgraph;
    for (const l of e)
      for (const u of l.iterateAllLinks())
        if (t[u.origin_id] == null) {
          s.push(u);
          const f = [0, 0];
          l.getConnectionPos(!0, u.origin_slot, f), n[l.id] = [[l.pos[0], l.pos[1]], f];
        } else if (t[u.target_id] == null)
          throw new Error("Can't convert to input with an origin link outward");
    const o = this.moveNodesToParentGraph(e), a = {};
    for (const l of s) {
      const u = i.getNodeById(l.origin_id), f = u.getOutputInfo(l.origin_slot);
      a[r = l.target_id] || (a[r] = {});
      let c = a[l.target_id][l.target_slot];
      if (c == null) {
        c = this.addGraphOutput(name, f.type), a[l.target_id][l.target_slot] = c;
        const [v, _] = n[l.target_id], g = c.innerNode.getConnectionPos(!0, 0), d = [c.innerNode.pos[0] - g[0], c.innerNode.pos[1] - g[1]], y = [_[0] + d[0], _[1] + d[1]];
        c.innerNode.pos = y;
      }
      const p = o[l.target_id];
      u.connect(l.origin_slot, c.innerNode, 0), this.connect(c.outerOutputIndex, p, l.target_slot);
    }
  }
};
let te = Ae;
te.default_lgraph_factory = () => new we();
te.slotLayout = {
  inputs: [],
  outputs: []
};
te.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
te.optionalSlots = {
  outputs: [
    { name: "enabled", type: "boolean" }
  ]
};
h.registerNodeType({
  class: te,
  title: "Subgraph",
  desc: "Graph inside a node",
  title_color: "#334",
  type: "graph/subgraph"
});
class k {
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(t = "", s, n, i, o = !1, a = null) {
    const r = this, l = document.createElement("div");
    if (l.is_modified = !1, l.className = "graphdialog rounded", o) {
      let b = 5;
      typeof s != "string" && (s = JSON.stringify(s, null, 2));
      const I = (s.match(/\n/g) || "").length + 1;
      b = _e(I, 5, 10), l.innerHTML = `
<span class='name'></span>
<textarea autofocus rows='${b}' cols='30' class='value'></textarea>
<button class='rounded'>OK</button>
`;
    } else
      l.innerHTML = `
<span class='name'></span>
<input autofocus type='text' class='value'/>
<button class='rounded'>OK</button>`;
    l.close = function() {
      r.prompt_box = null, l.parentNode && l.parentNode.removeChild(l);
    };
    const f = N.active_canvas.canvas;
    f.parentNode.appendChild(l), this.ds.scale > 1 && (l.style.transform = `scale(${this.ds.scale})`);
    let c = null, p = 0;
    h.pointerListenerAdd(l, "leave", (b) => {
      p || h.dialog_close_on_mouse_leave && !l.is_modified && h.dialog_close_on_mouse_leave && b.buttons === 0 && (c = setTimeout(l.close, h.dialog_close_on_mouse_leave_delay));
    }), h.pointerListenerAdd(l, "enter", (b) => {
      h.dialog_close_on_mouse_leave && c && clearTimeout(c);
    });
    const v = l.querySelectorAll("select");
    v && v.forEach((b) => {
      b.addEventListener("click", (I) => {
        p++;
      }), b.addEventListener("blur", (I) => {
        p = 0;
      }), b.addEventListener("change", (I) => {
        p = -1;
      });
    }), r.prompt_box && r.prompt_box.close(), r.prompt_box = l;
    const _ = l.querySelector(".name");
    _.innerText = t;
    const g = l.querySelector(".value");
    g.value = s;
    const d = g;
    if (d.addEventListener("keydown", function(b) {
      if (l.is_modified = !0, b.keyCode == 27)
        l.close();
      else if (b.keyCode == 13 && b.target instanceof Element && b.target.localName != "textarea")
        n && n(this.value), l.close();
      else
        return;
      b.preventDefault(), b.stopPropagation();
    }), a)
      for (const [b, I] of Object.entries(a))
        d.style[b] = I;
    l.querySelector("button").addEventListener("click", (b) => {
      n && n(d.value), r.setDirty(!0), l.close();
    });
    const m = f.getBoundingClientRect();
    let E = -20, T = -20;
    return m && (E -= m.left, T -= m.top), i ? (l.style.left = `${i.clientX}px`, l.style.top = `${i.clientY}px`) : (l.style.left = `${f.width * 0.5 + E}px`, l.style.top = `${f.height * 0.5 + T}px`), console.warn(l.style.left, l.style.top), console.warn(i), setTimeout(() => {
      d.focus();
    }, 10), ve(l), l;
  }
  showSearchBox(t, s = {}) {
    const n = {
      slotFrom: null,
      node_from: null,
      node_to: null,
      do_type_filter: h.search_filter_enabled,
      // TODO check for registered_slot_[in/out]_types not empty // this will be checked for functionality enabled : filter on slot type, in and out
      type_filter_in: null,
      // these are default: pass to set initially set values
      type_filter_out: null,
      show_general_if_none_on_typefilter: !0,
      show_general_after_typefiltered: !0,
      hide_on_mouse_leave: h.search_hide_on_mouse_leave,
      show_all_if_empty: !0,
      show_all_on_open: h.search_show_all_on_open
    };
    s = Object.assign(n, s);
    const i = this, o = N.active_canvas, a = o.canvas, r = a.ownerDocument || document, l = t, u = document.createElement("div");
    u.className = "litegraph litesearchbox graphdialog rounded", u.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", s.do_type_filter && (u.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", u.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), u.innerHTML += "<div class='helper'></div>", r.fullscreenElement ? r.fullscreenElement.appendChild(u) : (r.body.appendChild(u), r.body.style.overflow = "hidden");
    let f = null, c = null;
    if (s.do_type_filter && (f = u.querySelector(".slot_in_type_filter"), c = u.querySelector(".slot_out_type_filter")), u.close = function() {
      i.search_box = null, this.blur(), a.focus(), r.body.style.overflow = "", setTimeout(() => {
        i.canvas.focus();
      }, 20), u.parentNode && u.parentNode.removeChild(u);
    }, this.ds.scale > 1 && (u.style.transform = `scale(${this.ds.scale})`), s.hide_on_mouse_leave) {
      let L = 0, G = null;
      h.pointerListenerAdd(u, "enter", (D) => {
        G && (clearTimeout(G), G = null);
      }), h.pointerListenerAdd(u, "leave", (D) => {
        L || (G = setTimeout(() => {
          u.close();
        }, 500));
      }), s.do_type_filter && (f.addEventListener("click", (D) => {
        L++;
      }), f.addEventListener("blur", (D) => {
        L = 0;
      }), f.addEventListener("change", (D) => {
        L = -1;
      }), c.addEventListener("click", (D) => {
        L++;
      }), c.addEventListener("blur", (D) => {
        L = 0;
      }), c.addEventListener("change", (D) => {
        L = -1;
      }));
    }
    i.search_box && i.search_box.close(), i.search_box = u;
    const p = u.querySelector(".helper");
    let v = null, _ = null, g = null;
    const d = (L) => {
      if (L)
        if (i.onSearchBoxSelection)
          i.onSearchBoxSelection(L, l, o);
        else {
          const P = h.searchbox_extras[L.toLowerCase()];
          P && (L = P.type), o.graph.beforeChange();
          const R = h.createNode(L);
          if (R && (R.pos = o.convertEventToCanvasOffset(
            l
          ), o.graph.add(R)), P && P.data) {
            if (P.data.properties)
              for (var G in P.data.properties)
                R.addProperty(`${G}`, P.data.properties[G]);
            if (P.data.inputs) {
              R.inputs = [];
              for (var G in P.data.inputs)
                R.addInput(
                  P.data.inputs[G][0],
                  P.data.inputs[G][1]
                );
            }
            if (P.data.outputs) {
              R.outputs = [];
              for (var G in P.data.outputs)
                R.addOutput(
                  P.data.outputs[G][0],
                  P.data.outputs[G][1]
                );
            }
            P.data.title && (R.title = P.data.title), P.data.json && R.configure(P.data.json);
          }
          if (s.node_from) {
            var D = null;
            switch (typeof s.slotFrom) {
              case "string":
                D = s.node_from.findOutputSlotIndexByName(s.slotFrom);
                break;
              case "object":
                s.slotFrom.name ? D = s.node_from.findOutputSlotIndexByName(s.slotFrom.name) : D = -1, D == -1 && typeof s.slotFrom.slot_index < "u" && (D = s.slotFrom.slot_index);
                break;
              case "number":
                D = s.slotFrom;
                break;
              default:
                D = 0;
            }
            D = D, typeof s.node_from.outputs[D] !== void 0 && D !== null && D > -1 && s.node_from.connectByTypeInput(D, R, s.node_from.outputs[D].type);
          }
          if (s.node_to) {
            var D = null;
            switch (typeof s.slotFrom) {
              case "string":
                D = s.node_to.findInputSlotIndexByName(s.slotFrom);
                break;
              case "number":
                D = s.slotFrom;
                break;
              default:
                D = 0;
            }
            typeof s.node_to.inputs[D] !== void 0 && D !== null && D > -1 && s.node_to.connectByTypeOutput(D, R, s.node_to.inputs[D].type);
          }
          o.graph.afterChange();
        }
      u.close();
    }, y = (L) => {
      const G = g;
      g && g.classList.remove("selected"), g ? (g = L ? g.nextSibling : g.previousSibling, g || (g = G)) : g = L ? p.childNodes[0] : p.childNodes[p.childNodes.length], g && (g.classList.add("selected"), g.scrollIntoView({ block: "end", behavior: "smooth" }));
    }, m = (L, G, D, P, R, q = {}) => {
      const x = Object.assign({
        skipFilter: !1,
        inTypeOverride: null,
        outTypeOverride: null
      }, q), Y = h.registered_node_types[L];
      if (Y.hide_in_node_lists || G && Y.filter != G || (!s.show_all_if_empty || D) && !L.toLowerCase().includes(D))
        return !1;
      if (s.do_type_filter && !x.skipFilter) {
        const se = L;
        let Z = P == null ? void 0 : P.value;
        if (x.inTypeOverride != null && (Z = x.inTypeOverride), P && Z && h.registered_slot_in_types[Z] && h.registered_slot_in_types[Z].nodes) {
          var U = h.registered_slot_in_types[Z].nodes.includes(se);
          if (U === !1)
            return !1;
        }
        if (Z = R == null ? void 0 : R.value, x.outTypeOverride != null && (Z = x.outTypeOverride), R && Z && h.registered_slot_out_types[Z] && h.registered_slot_out_types[Z].nodes) {
          var U = h.registered_slot_out_types[Z].nodes.includes(se);
          if (U === !1)
            return !1;
        }
      }
      return !0;
    }, E = () => {
      _ = null;
      let L = T.value;
      if (v = null, p.innerHTML = "", !L && !s.show_all_if_empty)
        return;
      if (i.onSearchBox) {
        const R = i.onSearchBox(p, L, o);
        if (R)
          for (var G = 0; G < R.length; ++G)
            P(R[G]);
      } else {
        let R = 0;
        L = L.toLowerCase();
        const q = o.filter || o.graph.filter;
        let F, x;
        s.do_type_filter && i.search_box ? (F = i.search_box.querySelector(".slot_in_type_filter"), x = i.search_box.querySelector(".slot_out_type_filter")) : (F = null, x = null);
        for (const Y in h.searchbox_extras) {
          const U = h.searchbox_extras[Y];
          if ((!s.show_all_if_empty || L) && !U.desc.toLowerCase().includes(L))
            continue;
          const se = h.registered_node_types[U.type];
          if (!(se && se.filter != q) && m(U.type, q, L, F, x) && (P(U.desc, "searchbox_extra"), N.search_limit !== -1 && R++ > N.search_limit))
            break;
        }
        var D = null;
        if (Array.prototype.filter)
          var D = Object.keys(h.registered_node_types).filter((se) => m(se, q, L, F, x));
        else {
          D = [];
          for (const Y in h.registered_node_types)
            m(Y, q, L, F, x) && D.push(Y);
        }
        for (var G = 0; G < D.length && (P(D[G]), !(N.search_limit !== -1 && R++ > N.search_limit)); G++)
          ;
        if (s.show_general_after_typefiltered && (F != null && F.value || x != null && x.value)) {
          const Y = [];
          for (const U in h.registered_node_types)
            m(U, q, L, F, x, { inTypeOverride: F && F.value ? "*" : null, outTypeOverride: x && x.value ? "*" : null }) && Y.push(U);
          for (let U = 0; U < Y.length && (P(Y[U], "generic_type"), !(N.search_limit !== -1 && R++ > N.search_limit)); U++)
            ;
        }
        if ((F != null && F.value || x != null && x.value) && (p == null ? void 0 : p.childNodes.length) == 0 && s.show_general_if_none_on_typefilter) {
          const Y = [];
          for (const U in h.registered_node_types)
            m(U, q, L, F, x, { skipFilter: !0 }) && Y.push(U);
          for (let U = 0; U < Y.length && (P(Y[U], "not_in_filter"), !(N.search_limit !== -1 && R++ > N.search_limit)); U++)
            ;
        }
      }
      function P(R, q) {
        const F = document.createElement("div");
        v || (v = R), F.innerText = R, F.dataset.type = escape(R), F.className = "litegraph lite-search-item", q && (F.className += ` ${q}`), F.addEventListener("click", function(x) {
          d(unescape(this.dataset.type));
        }), p.appendChild(F);
      }
    };
    var T = u.querySelector("input");
    if (T && (T.addEventListener("blur", function(L) {
      this.focus();
    }), T.addEventListener("keydown", (L) => {
      if (L.keyCode == 38)
        y(!1);
      else if (L.keyCode == 40)
        y(!0);
      else if (L.keyCode == 27)
        u.close();
      else if (L.keyCode == 13)
        g ? d(g.innerHTML) : v ? d(v) : u.close();
      else {
        _ && clearInterval(_), _ = setTimeout(E, h.search_box_refresh_interval_ms);
        return;
      }
      return L.preventDefault(), L.stopPropagation(), L.stopImmediatePropagation(), !0;
    })), s.do_type_filter) {
      if (f) {
        var b = h.slot_types_in, I = b.length;
        (s.type_filter_in == O.EVENT || s.type_filter_in == O.ACTION) && (s.type_filter_in = "_event_");
        for (var S = 0; S < I; S++) {
          var B = document.createElement("option");
          B.value = b[S], B.innerHTML = b[S], f.appendChild(B), s.type_filter_in !== null && `${s.type_filter_in}`.toLowerCase() == `${b[S]}`.toLowerCase() && (B.selected = !0);
        }
        f.addEventListener("change", E);
      }
      if (c) {
        var b = h.slot_types_out, I = b.length;
        (s.type_filter_out == O.EVENT || s.type_filter_out == O.ACTION) && (s.type_filter_out = "_event_");
        for (var S = 0; S < I; S++) {
          var B = document.createElement("option");
          B.value = b[S], B.innerHTML = b[S], c.appendChild(B), s.type_filter_out !== null && `${s.type_filter_out}`.toLowerCase() == `${b[S]}`.toLowerCase() && (B.selected = !0);
        }
        c.addEventListener("change", E);
      }
    }
    const J = a.getBoundingClientRect(), re = (l ? l.clientX : J.left + J.width * 0.5) - 80, Le = (l ? l.clientY : J.top + J.height * 0.5) - 20;
    return u.style.left = `${re}px`, u.style.top = `${Le}px`, l.layerY > J.height - 200 && (p.style.maxHeight = `${J.height - l.layerY - 20}px`), T.focus(), s.show_all_on_open && E(), u;
  }
  showShowNodePanel(t) {
    this.closePanels();
    const s = this.getCanvasWindow(), n = this, i = this.createPanel(t.title || "", {
      closable: !0,
      window: s,
      onOpen() {
      },
      onClose() {
        n.node_panel = null;
      }
    });
    n.node_panel = i, i.id = "node-panel", i.node = t, i.classList.add("settings");
    function o() {
      i.content.innerHTML = "", i.addHTML(`<span class='node_type'>${t.type}</span><span class='node_desc'>${t.constructor.desc || ""}</span><span class='separator'></span>`), i.addHTML("<h3>Properties</h3>");
      const a = function(l, u) {
        switch (n.graph.beforeChange(t), l) {
          case "Title":
            t.title = u;
            break;
          case "Mode":
            var f = Object.values(ie).indexOf(u);
            f >= X.ALWAYS && ie[f] ? t.changeMode(f) : console.warn(`unexpected mode: ${u}`);
            break;
          case "Color":
            N.node_colors[u] ? (t.color = N.node_colors[u].color, t.bgcolor = N.node_colors[u].bgcolor) : console.warn(`unexpected color: ${u}`);
            break;
          default:
            t.setProperty(l, u);
            break;
        }
        n.graph.afterChange(), n.dirty_canvas = !0;
      };
      i.addWidget("string", "Title", t.title, {}, a), i.addWidget("combo", "Mode", ie[t.mode], { values: ie }, a);
      let r = "";
      t.color !== void 0 && (r = Object.keys(N.node_colors).filter((l) => N.node_colors[l].color == t.color)[0]), i.addWidget("combo", "Color", r, { values: Object.keys(N.node_colors) }, a);
      for (const l in t.properties) {
        const u = t.properties[l], f = t.getPropertyInfo(l);
        f.type, !(t.onAddPropertyToPanel && t.onAddPropertyToPanel(l, i)) && i.addWidget(f.widget || f.type, l, u, f, a);
      }
      i.addSeparator(), t.onShowCustomPanelInfo && t.onShowCustomPanelInfo(i), i.footer.innerHTML = "", i.addButton("Delete", () => {
        t.block_delete || (t.graph.remove(t), i.close());
      }).classList.add("delete");
    }
    i.inner_showCodePad = function(a) {
      i.classList.remove("settings"), i.classList.add("centered"), i.alt_content.innerHTML = "<textarea class='code'></textarea>";
      const r = i.alt_content.querySelector("textarea"), l = function() {
        i.toggleAltContent(!1), i.toggleFooterVisibility(!0), r.parentNode.removeChild(r), i.classList.add("settings"), i.classList.remove("centered"), o();
      };
      r.value = t.properties[a], r.addEventListener("keydown", (c) => {
        c.code == "Enter" && c.ctrlKey && (t.setProperty(a, r.value), l());
      }), i.toggleAltContent(!0), i.toggleFooterVisibility(!1), r.style.height = "calc(100% - 40px)";
      const u = i.addButton("Assign", () => {
        t.setProperty(a, r.value), l();
      });
      i.alt_content.appendChild(u);
      const f = i.addButton("Close", l);
      f.style.float = "right", i.alt_content.appendChild(f);
    }, o(), this.canvas.parentNode.appendChild(i);
  }
  showSubgraphPropertiesDialog(t) {
    console.log("showing subgraph properties dialog");
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const n = this.createPanel("Subgraph Inputs", { closable: !0, width: 500 });
    n.node = t, n.classList.add("subgraph_dialog");
    const i = t;
    if (!i.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function a() {
      if (n.clear(), t.inputs)
        for (let _ = 0; _ < t.inputs.length; ++_) {
          const g = t.inputs[_];
          if (g.not_subgraph_input)
            continue;
          const d = `
<button class="delete">&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, y = n.addHTML(d, "subgraph_property");
          y.dataset.name = g.name, y.dataset.slot = `${_}`, y.querySelector(".name").innerText = g.name, y.querySelector(".type").innerText = V(g.type), y.querySelector(".delete").addEventListener("click", function(T) {
            const b = this.parentNode.dataset.name;
            i.removeGraphInput(b), a();
          });
          const m = y.querySelector(".move_up");
          m.disabled = _ <= 0, m.addEventListener("click", function(T) {
            const b = +this.parentNode.dataset.slot;
            b < 0 || (i.moveInput(b, b - 1), a());
          });
          const E = y.querySelector(".move_down");
          E.disabled = _ >= t.inputs.length - 1, E.addEventListener("click", function(T) {
            const b = +this.parentNode.dataset.slot;
            b > t.inputs.length - 1 || (i.moveInput(b, b + 1), a());
          });
        }
    }
    const r = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = n.addHTML(r, "subgraph_property extra", !0), u = l.querySelector(".name"), f = l.querySelector(".type"), c = l.querySelector("button");
    for (const _ of Ie()) {
      const g = document.createElement("option");
      g.value = _, g.innerHTML = V(_), f.appendChild(g), _ === "*" && (g.selected = !0);
    }
    const p = () => {
      const _ = u.value;
      let g = f.value;
      g === "-1" ? g = O.ACTION : g === "-2" && (g = O.EVENT), !(!_ || t.findInputSlotIndexByName(_) != -1) && (this.addGraphInputNode(t, _, g), u.value = "", f.value = "", a(), u.focus());
    }, v = (_) => {
      _.keyCode == 13 ? (p(), _.preventDefault()) : _.keyCode == 27 && (n.close(), _.preventDefault());
    };
    return c.addEventListener("click", p), u.addEventListener("keydown", v), f.addEventListener("keydown", v), a(), this.canvas.parentNode.appendChild(n), u.focus(), n;
  }
  showSubgraphPropertiesDialogRight(t) {
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const n = this.createPanel("Subgraph Outputs", { closable: !0, width: 500 });
    n.node = t, n.classList.add("subgraph_dialog");
    const i = t;
    if (!i.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function a() {
      if (n.clear(), t.outputs)
        for (let _ = 0; _ < t.outputs.length; ++_) {
          const g = t.outputs[_];
          if (g.not_subgraph_output)
            continue;
          const d = `
<button>&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, y = n.addHTML(d, "subgraph_property");
          y.dataset.name = g.name, y.dataset.slot = `${_}`, y.querySelector(".name").innerText = g.name, y.querySelector(".type").innerText = V(g.type), y.querySelector("button").addEventListener("click", function(T) {
            const b = this.parentNode.dataset.name;
            i.removeGraphOutput(b), a();
          });
          const m = y.querySelector(".move_up");
          m.disabled = _ <= 0, m.addEventListener("click", function(T) {
            const b = +this.parentNode.dataset.slot;
            b < 0 || (i.moveOutput(b, b - 1), a());
          });
          const E = y.querySelector(".move_down");
          E.disabled = _ >= t.outputs.length - 1, E.addEventListener("click", function(T) {
            const b = +this.parentNode.dataset.slot;
            b > t.outputs.length - 1 || (i.moveOutput(b, b + 1), a());
          });
        }
    }
    const r = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = n.addHTML(r, "subgraph_property extra", !0), u = l.querySelector(".name"), f = l.querySelector(".type"), c = l.querySelector("button");
    for (const _ of ke()) {
      const g = document.createElement("option");
      g.value = _, g.innerHTML = V(_), f.appendChild(g), _ === "*" && (g.selected = !0);
    }
    const p = () => {
      const _ = u.value;
      let g = f.value;
      g === "-1" ? g = O.ACTION : g === "-2" && (g = O.EVENT), !(!_ || t.findOutputSlotIndexByName(_) != -1) && (this.addGraphOutputNode(t, _, g), u.value = "", f.value = "", a(), u.focus());
    }, v = (_) => {
      _.keyCode == 13 ? (p(), _.preventDefault()) : _.keyCode == 27 && (n.close(), _.preventDefault());
    };
    return c.addEventListener("click", p), u.addEventListener("keydown", v), f.addEventListener("keydown", v), a(), this.canvas.parentNode.appendChild(n), u.focus(), n;
  }
  showConnectionMenu(t = {}) {
    const s = t.nodeFrom && t.slotFrom, n = !s && t.nodeTo && t.slotTo;
    if (!s && !n)
      return console.warn("No data passed to showConnectionMenu"), !1;
    const i = s ? t.nodeFrom : t.nodeTo, o = s ? t.slotFrom : t.slotTo;
    let a, r = null;
    switch (typeof o) {
      case "string":
        r = s ? i.findOutputSlotIndexByName(o) : i.findInputSlotIndexByName(o), a = s ? i.outputs[o] : i.inputs[o];
        break;
      case "object":
        a = o, r = s ? i.findOutputSlotIndexByName(a.name) : i.findInputSlotIndexByName(a.name);
        break;
      case "number":
        r = o, a = s ? i.outputs[r] : i.inputs[r];
        break;
      default:
        return console.error("Can't get slot information", o), !1;
    }
    const l = [{ content: "Add Node" }, W.SEPARATOR];
    i.graph._is_subgraph && (s ? l.push({ content: "Add Subgraph Output" }) : l.push({ content: "Add Subgraph Input" }), l.push(W.SEPARATOR)), this.allow_searchbox && (l.push({ content: "Search" }), l.push(W.SEPARATOR));
    const u = a.type == O.EVENT ? "_event_" : a.type, f = s ? h.slot_types_default_out : h.slot_types_default_in, c = f[u];
    if (console.warn("FROMSL", f, c), f && f[u])
      if (Array.isArray(c))
        for (const y of c) {
          const m = typeof y == "string" ? y : (y == null ? void 0 : y.title) || (y == null ? void 0 : y.node);
          l.push({ content: m, value: y });
        }
      else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${c}`);
    const p = (y) => {
      const m = i.graph._subgraph_node, E = [y.canvasX, y.canvasY];
      m.addGraphInput(a.name, a.type, E).innerNode.connect(0, i, r);
    }, v = (y) => {
      const m = i.graph._subgraph_node, E = [y.canvasX, y.canvasY], T = m.addGraphOutput(a.name, a.type, E);
      i.connect(r, T.innerNode, 0);
    }, _ = (y) => {
      const m = Object.assign(t, {
        position: [t.e.canvasX, t.e.canvasY]
      });
      this.createDefaultNodeForSlot(y, m) ? console.log("node created", y) : console.error("node not in defaults", y);
    }, g = (y, m, E) => {
      switch (y.content) {
        case "Add Node":
          N.onMenuAdd(y, m, E, d, (T) => {
            s ? t.nodeFrom.connectByTypeInput(r, T, u) : t.nodeTo.connectByTypeOutput(r, T, u);
          });
          break;
        case "Add Subgraph Input":
          p(this.adjustMouseEvent(E));
          break;
        case "Add Subgraph Output":
          v(this.adjustMouseEvent(E));
          break;
        case "Search":
          s ? this.showSearchBox(E, { node_from: t.nodeFrom, slotFrom: a, type_filter_in: u }) : this.showSearchBox(E, { node_to: t.nodeTo, slotFrom: a, type_filter_out: u });
          break;
        default:
          _(y.value);
          break;
      }
    };
    var d = new z(l, {
      event: t.e,
      title: (a && a.name != "" ? a.name + (u ? " | " : "") : "") + (a && u ? u : ""),
      callback: g
    });
    return !1;
  }
  getLinkMenuOptions(t) {
    const s = this.graph.getNodeById(t.origin_id), n = this.graph.getNodeById(t.target_id);
    let i = null;
    s && s.outputs && s.outputs[t.origin_slot] && (i = s.outputs[t.origin_slot].type);
    let o = null;
    n && n.outputs && n.outputs[t.target_slot] && (o = n.inputs[t.target_slot].type);
    const a = (f) => {
      console.debug("node autoconnect"), !(!f.inputs || !f.inputs.length || !f.outputs || !f.outputs.length) && s.connectByTypeInput(t.origin_slot, f, i) && (f.connectByTypeInput(t.target_slot, n, o), f.pos[0] -= f.size[0] * 0.5);
    }, r = (f, c, p, v, _) => {
      N.onMenuAdd(f, c, p, v, a);
    }, l = () => {
      this.graph.removeLink(t.id);
    };
    let u = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: r
      },
      W.SEPARATOR,
      {
        content: "Delete",
        has_submenu: !0,
        callback: l
      },
      W.SEPARATOR
    ];
    return this.graph.onGetLinkMenuOptions && (u = this.graph.onGetLinkMenuOptions(u, t)), s.getExtraLinkOptions && (u = s.getExtraLinkOptions(this, t, H.OUTPUT, u)), n.getExtraLinkOptions && (u = n.getExtraLinkOptions(this, t, H.INPUT, u)), u;
  }
  showLinkMenu(t, s) {
    const n = this.getLinkMenuOptions(t);
    return new z(n, {
      event: s,
      title: t.data != null ? t.data.constructor.name : null,
      extra: t
    }), !1;
  }
  /*
     * Shows a popup for editing one of the LGraphNode.properties.
     */
  showEditPropertyValue(t, s, n = {}) {
    if (!t || t.properties[s] === void 0 || h.ignore_all_widget_events)
      return;
    const i = t.getPropertyInfo(s), o = i.type;
    let a = "";
    if (o == "string" || o == "number" || o == "array" || o == "object")
      if (i.multiline) {
        let v = t.properties[s], _ = 5;
        if (o !== "string") {
          v = JSON.stringify(v, null, 2);
          const g = (v.match(/\n/g) || "").length + 1;
          _ = _e(g, 5, 10);
        }
        a = `<textarea autofocus type='text' rows='${_}' cols='30' class='value'>${v || ""}</textarea>`;
      } else
        a = "<input autofocus type='text' class='value'/>";
    else if ((o == "enum" || o == "combo") && i.values) {
      a = "<select autofocus type='text' class='value'>";
      for (const v in i.values) {
        let _ = v;
        Array.isArray(i.values) && (_ = i.values[v]), a += `<option value='${_}' ${_ == t.properties[s] ? "selected" : ""}>${i.values[v]}</option>`;
      }
      a += "</select>";
    } else if (o == "boolean" || o == "toggle")
      a = `<input autofocus type='checkbox' class='value' ${t.properties[s] ? "checked" : ""}/>`;
    else {
      console.warn(`unknown type: ${o}`);
      return;
    }
    const r = this.createDialog(
      `<span class='name'>${i.label ? i.label : s}</span>${a}<button>OK</button>`,
      n
    );
    let l = null;
    if ((o == "enum" || o == "combo") && i.values)
      l = r.querySelector("select"), l.addEventListener("change", (v) => {
        r.modified(), c(v.target.value);
      });
    else if (o == "boolean" || o == "toggle")
      l = r.querySelector("input"), l && l.addEventListener("click", (v) => {
        r.modified(), c(!!l.checked);
      });
    else if (i.multiline ? l = r.querySelector("textarea") : l = r.querySelector("input"), l) {
      l.addEventListener("blur", function(_) {
        this.focus();
      });
      let v = t.properties[s] !== void 0 ? t.properties[s] : "";
      if (o !== "string") {
        let _ = null;
        i.multiline && (_ = 2), v = JSON.stringify(v, null, _);
      }
      if (l.value = v, l.addEventListener("keydown", (_) => {
        let g = !1;
        _.keyCode == 27 ? (r.close(), g = !0) : _.keyCode == 13 && !i.multiline ? (f(), g = !0) : _.keyCode != 13 && r.modified(), g && (_.preventDefault(), _.stopPropagation());
      }), i.inputStyle)
        for (const [_, g] of Object.entries(i.inputStyle))
          l.style[_] = g;
    }
    l && l.focus();
    const u = () => {
      n.onclose && n.onclose(), r.close(), t.setDirtyCanvas(!0, !0);
    }, f = () => {
      o != "boolean" && o != "toggle" ? c(l.value) : u();
    }, c = (v) => {
      i && i.values && i.values.constructor === Object && i.values[v] != null && (v = i.values[v]), typeof t.properties[s] == "number" && (v = Number(v)), (o == "array" || o == "object") && (v = JSON.parse(v)), t.setProperty(s, v), u();
    };
    return r.querySelector("button").addEventListener("click", f), ve(r), r;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(t, s = { checkForInput: !1, closeOnLeave: !0, closeOnLeave_checkModified: !0 }) {
    const n = document.createElement("div");
    n.className = "graphdialog", n.innerHTML = t, n.is_modified = !1;
    const i = this.canvas.getBoundingClientRect();
    let o = -20, a = -20;
    if (i && (o -= i.left, a -= i.top), s.position ? (o = s.position[0], a = s.position[1]) : s.event ? (o = s.event.clientX, a = s.event.clientY) : (o += this.canvas.width * 0.5, a += this.canvas.height * 0.5), n.style.left = `${o}px`, n.style.top = `${a}px`, this.canvas.parentNode.appendChild(n), s.checkForInput) {
      const f = n.querySelectorAll("input");
      f && f.forEach((c) => {
        c.addEventListener("keydown", (p) => {
          if (n.modified(), p.keyCode == 27)
            n.close();
          else if (p.keyCode != 13)
            return;
          p.preventDefault(), p.stopPropagation();
        }), c.focus();
      });
    }
    n.modified = function() {
      n.is_modified = !0;
    }, n.close = function() {
      n.parentNode && n.parentNode.removeChild(n);
    };
    let r = null, l = 0;
    n.addEventListener("mouseleave", (f) => {
      l || (s.closeOnLeave || h.dialog_close_on_mouse_leave) && !n.is_modified && h.dialog_close_on_mouse_leave && f.buttons === 0 && (r = setTimeout(n.close, h.dialog_close_on_mouse_leave_delay));
    }), n.addEventListener("mouseenter", (f) => {
      (s.closeOnLeave || h.dialog_close_on_mouse_leave) && r && clearTimeout(r);
    });
    const u = n.querySelectorAll("select");
    return u && u.forEach((f) => {
      f.addEventListener("click", (c) => {
        l++;
      }), f.addEventListener("blur", (c) => {
        l = 0;
      }), f.addEventListener("change", (c) => {
        l = -1;
      });
    }), n;
  }
  getCanvasMenuOptions() {
    let t = null;
    if (this.getMenuOptions ? t = this.getMenuOptions(this) : (t = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: N.onMenuAdd
      },
      { content: "Add Group", callback: N.onGroupAdd }
      // { content: "Arrange", callback: that.graph.arrange },
      // {content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], this._graph_stack && this._graph_stack.length > 0 && t.push(W.SEPARATOR, {
      content: "Close subgraph",
      callback: this.closeSubgraph.bind(this)
    })), this.getExtraMenuOptions) {
      const s = this.getExtraMenuOptions(this, t);
      s && (t = t.concat(s));
    }
    return t;
  }
  getNodeMenuOptions(t) {
    let s = [];
    t.getMenuOptions ? s = t.getMenuOptions(this) : (s = [
      {
        content: "Inputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalInputs
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalOutputs
      },
      W.SEPARATOR,
      {
        content: "Properties",
        has_submenu: !0,
        disabled: h.ignore_all_widget_events,
        callback: N.onShowMenuNodeProperties
      },
      W.SEPARATOR,
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: N.onMenuNodeMode
      }
    ], t.resizable !== !1 && s.push({
      content: "Resize",
      callback: N.onMenuResizeNode
    }), s.push(
      {
        content: "Collapse",
        callback: N.onMenuNodeCollapse
      },
      { content: "Pin", callback: N.onMenuNodePin },
      {
        content: "Colors",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: N.onMenuNodeShapes
      },
      W.SEPARATOR
    ));
    const n = t.getOptionalSlots();
    if (n && (n.inputs && n.inputs.length > 0 && typeof s[0] == "object" && (s[0].disabled = !1), n.outputs && n.outputs.length && typeof s[1] == "object" && (s[1].disabled = !1)), t.getExtraMenuOptions) {
      const o = t.getExtraMenuOptions(this, s);
      o && (o.push(W.SEPARATOR), s = o.concat(s));
    }
    t.clonable !== !1 && s.push({
      content: "Clone",
      callback: N.onMenuNodeClone
    }), s.push({
      content: "To Subgraph",
      callback: N.onMenuNodeToSubgraph
    });
    let i = Object.values(this.selected_nodes || {});
    if (i.length || (i = [t]), i = i.filter((o) => !o.is(j) && !o.is(K)), s.push({
      content: "To Parent Graph",
      disabled: !t.graph._is_subgraph || i.length === 0,
      callback: N.onMenuNodeToParentGraph
    }), t.graph._is_subgraph) {
      const o = (u) => {
        let f = 0;
        const c = de(u, (p) => p.id);
        for (const p of u)
          for (const v of p.iterateAllLinks()) {
            if (c[v.origin_id] == null)
              return 0;
            c[v.target_id] == null && (f += 1);
          }
        return f;
      }, a = (u) => {
        let f = 0;
        const c = de(u, (p) => p.id);
        for (const p of u)
          for (const v of p.iterateAllLinks())
            if (c[v.origin_id] == null)
              f += 1;
            else if (c[v.target_id] == null)
              return 0;
        return f;
      }, r = o(i);
      s.push({
        content: `To Subgraph Input${r > 1 ? "s" : ""}`,
        disabled: r === 0,
        callback: N.onMenuNodeToSubgraphInputs
      });
      const l = a(i);
      s.push({
        content: `To Subgraph Output${l > 1 ? "s" : ""}`,
        disabled: l === 0,
        callback: N.onMenuNodeToSubgraphOutputs
      });
    }
    return s.push(W.SEPARATOR, {
      content: "Remove",
      disabled: !(t.removable !== !1 && !t.block_delete),
      callback: N.onMenuNodeRemove
    }), t.graph && t.graph.onGetNodeMenuOptions && (s = t.graph.onGetNodeMenuOptions(s, t)), s;
  }
  getGroupMenuOptions(t) {
    return [
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Color",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Font size",
        value: { name: "fontSize", type: "number" },
        callback: N.onShowPropertyEditor
      },
      W.SEPARATOR,
      { content: "Remove", callback: N.onMenuNodeRemove }
    ];
  }
  /** Called when mouse right click */
  processContextMenu(t, s) {
    const i = N.active_canvas.getCanvasWindow(), o = s;
    let a = null, r = null, l = null;
    t != null && (l = t.item, t.type === "node" && (a = t.item), t.type === "link" && (r = t.item));
    let u = null;
    const f = {
      event: o,
      extra: l
    };
    a != null && (f.title = a.type);
    let c = null;
    a != null && (c = a.getSlotInPosition(o.canvasX, o.canvasY), N.active_node = a);
    const p = (g) => {
      const d = g.slot;
      a.graph.beforeChange(), d.input ? a.removeInput(d.slot) : d.output && a.removeOutput(d.slot), a.graph.afterChange();
    }, v = (g) => {
      const d = g.slot;
      a.graph.beforeChange(), d.output ? a.disconnectOutput(d.slot) : d.input && a.disconnectInput(d.slot), a.graph.afterChange();
    }, _ = (g) => {
      const d = g.slot, y = d.input ? a.getInputInfo(d.slot) : a.getOutputInfo(d.slot), m = this.createDialog(
        "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
        f
      ), E = m.querySelector("input");
      E && y && (E.value = y.label || "");
      const T = () => {
        a.graph.beforeChange(), E.value && (y && (y.label = E.value), this.setDirty(!0)), m.close(), a.graph.afterChange();
      };
      m.querySelector("button").addEventListener("click", T), E.addEventListener("keydown", (b) => {
        if (m.is_modified = !0, b.keyCode == 27)
          m.close();
        else if (b.keyCode == 13)
          T();
        else if (b.keyCode != 13 && b.target instanceof Element && b.target.localName != "textarea")
          return;
        b.preventDefault(), b.stopPropagation();
      }), E.focus();
    };
    if (c) {
      if (u = [], a.getSlotMenuOptions)
        u = a.getSlotMenuOptions(c);
      else {
        c && c.output && c.output.links && c.output.links.length && u.push({ content: "Disconnect Links", slot: c, callback: v });
        const d = c.input || c.output;
        d.removable && u.push(
          d.locked ? "Cannot remove" : { content: "Remove Slot", slot: c, callback: p }
        ), d.nameLocked || u.push({ content: "Rename Slot", slot: c, callback: _ });
      }
      const g = (c.input ? c.input.type : c.output.type) || "*";
      f.title = V(g);
    } else if (a)
      u = this.getNodeMenuOptions(a);
    else if (r)
      u = this.getLinkMenuOptions(r);
    else {
      u = this.getCanvasMenuOptions();
      const g = this.graph.getGroupOnPos(
        o.canvasX,
        o.canvasY
      );
      g && u.push(W.SEPARATOR, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: g,
          options: this.getGroupMenuOptions(g)
        }
      });
    }
    u && new z(u, f, i);
  }
  createPanel(t, s = {}) {
    const n = s.window || window, i = document.createElement("div");
    if (i.className = "litegraph dialog", i.innerHTML = `
<div class='dialog-header'><span class='dialog-title'></span></div>
<div class='dialog-content'></div>
<div style='display:none;' class='dialog-alt-content'></div>
<div class='dialog-footer'></div>`, i.header = i.querySelector(".dialog-header"), s.width && (i.style.width = s.width + (s.width.constructor === Number ? "px" : "")), s.height && (i.style.height = s.height + (s.height.constructor === Number ? "px" : "")), s.closable) {
      const o = document.createElement("span");
      o.innerHTML = "&#10005;", o.classList.add("close"), o.addEventListener("click", () => {
        i.close();
      }), i.header.appendChild(o);
    }
    return s.onOpen && (i.onOpen = s.onOpen), s.onClose && (i.onClose = s.onClose), i.title_element = i.querySelector(".dialog-title"), i.title_element.innerText = t, i.content = i.querySelector(".dialog-content"), i.alt_content = i.querySelector(".dialog-alt-content"), i.footer = i.querySelector(".dialog-footer"), i.close = function() {
      i.onClose && typeof i.onClose == "function" && i.onClose(), i.parentNode && i.parentNode.removeChild(i), this.parentNode && this.parentNode.removeChild(this);
    }, i.toggleAltContent = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none", r = o ? "none" : "block";
      else
        var a = i.alt_content.style.display != "block" ? "block" : "none", r = i.alt_content.style.display != "block" ? "none" : "block";
      i.alt_content.style.display = a, i.content.style.display = r;
    }, i.toggleFooterVisibility = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none";
      else
        var a = i.footer.style.display != "block" ? "block" : "none";
      i.footer.style.display = a;
    }, i.clear = function() {
      this.content.innerHTML = "";
    }, i.addHTML = function(o, a, r) {
      const l = document.createElement("div");
      return a && (l.className = a), l.innerHTML = o, r ? i.footer.appendChild(l) : i.content.appendChild(l), l;
    }, i.addButton = function(o, a, r) {
      const l = document.createElement("button");
      return l.innerText = o, l.options = r, l.classList.add("btn"), l.addEventListener("click", a), i.footer.appendChild(l), l;
    }, i.addSeparator = function() {
      const o = document.createElement("div");
      return o.className = "separator", i.content.appendChild(o), o;
    }, i.addWidget = function(o, a, r, l = {}, u) {
      var f = String(r);
      o = o.toLowerCase(), o == "number" && (f = r.toFixed(3));
      const c = document.createElement("div");
      c.className = "property", c.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      const p = c.querySelector(".property_name");
      p.innerText = l.label || a;
      const v = c.querySelector(".property_value");
      if (v.innerText = f, c.dataset.property = a, c.dataset.type = l.type || o, c.options = l, c.value = r, o == "code")
        c.addEventListener("click", function(g) {
          i.inner_showCodePad(this.dataset.property);
        });
      else if (o == "boolean")
        c.classList.add("boolean"), r && c.classList.add("bool-on"), c.addEventListener("click", function() {
          const g = this.dataset.property;
          this.value = !this.value, this.classList.toggle("bool-on");
          const d = this.querySelector(".property_value");
          d.innerText = this.value ? "true" : "false", _(g, this.value);
        });
      else if (o == "string" || o == "number")
        v.setAttribute("contenteditable", "true"), v.addEventListener("keydown", function(g) {
          g.code == "Enter" && (o != "string" || !g.shiftKey) && (g.preventDefault(), this.blur());
        }), v.addEventListener("blur", function() {
          let g = this.innerText;
          const d = this.parentNode, y = d.dataset.property;
          d.dataset.type == "number" && (g = Number(g)), _(y, g);
        });
      else if ((o == "enum" || o == "combo") && "values" in l) {
        var f = N.getPropertyPrintableValue(r, l.values);
        v.innerText = f, v.addEventListener("click", function(d) {
          let y = l.values || [];
          typeof y == "function" && (console.error("Values by callback not supported in panel.addWidget!", y), y = []);
          const E = this.parentNode.dataset.property, T = this, b = Array.from(y).map((S) => ({ content: S }));
          new z(b, {
            event: d,
            className: "dark",
            callback: I
          }, n);
          function I(S, B, J) {
            return T.innerText = S.content, _(E, S.content), !1;
          }
        });
      }
      i.content.appendChild(c);
      function _(g, d) {
        l.callback && l.callback(g, d, l), u && u(g, d, l);
      }
      return c;
    }, i.onOpen && typeof i.onOpen == "function" && i.onOpen(), i;
  }
  checkPanels() {
    if (!this.canvas)
      return;
    const t = this.canvas.parentNode.querySelectorAll(".litegraph.dialog");
    for (let s = 0; s < t.length; ++s) {
      const n = t[s];
      if (n.node && (n.node.graph || n.close(), n.node.graph != this.graph)) {
        if (n.node.is(te) && this.graph._is_subgraph && this.graph === n.node.subgraph)
          continue;
        n.close();
      }
    }
  }
  closePanels() {
    var t = document.querySelector("#node-panel");
    t && t.close();
    var t = document.querySelector("#option-panel");
    t && t.close();
  }
}
k.onShowPropertyEditor = function(e, t, s, n, i) {
  const o = e.value, a = o.name, r = i[a], l = document.createElement("div");
  l.is_modified = !1, l.className = "graphdialog", l.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", l.close = function() {
    l.parentNode && l.parentNode.removeChild(l);
  };
  const u = l.querySelector(".name");
  u.innerText = a;
  const f = l.querySelector(".value");
  if (f && (f.value = r, f.addEventListener("blur", function(T) {
    this.focus();
  }), f.addEventListener("keydown", (T) => {
    if (l.is_modified = !0, T.keyCode == 27)
      l.close();
    else if (T.keyCode == 13)
      d();
    else if (T.keyCode != 13 && T.target instanceof Element && T.target.localName != "textarea")
      return;
    T.preventDefault(), T.stopPropagation();
  }), o.inputStyle))
    for (const [T, b] of Object.entries(o.inputStyle))
      f.style[T] = b;
  const p = N.active_canvas.canvas, v = p.getBoundingClientRect();
  let _ = -20, g = -20;
  v && (_ -= v.left, g -= v.top), s ? (l.style.left = `${s.clientX + _}px`, l.style.top = `${s.clientY + g}px`) : (l.style.left = `${p.width * 0.5 + _}px`, l.style.top = `${p.height * 0.5 + g}px`);
  const d = () => {
    f && y(f.value);
  }, y = (T) => {
    o.type == "number" ? T = Number(T) : o.type == "boolean" && (T = !!T);
    const b = i[a];
    i[a] = T, i.onJSPropertyChanged && i.onJSPropertyChanged(a, T, b) === !1 && (i[a] = b), l.parentNode && l.parentNode.removeChild(l), i.setDirtyCanvas(!0, !0);
  };
  l.querySelector("button").addEventListener("click", d), p.parentNode.appendChild(l), f && f.focus();
  let E = null;
  l.addEventListener("mouseleave", (T) => {
    h.dialog_close_on_mouse_leave && !l.is_modified && h.dialog_close_on_mouse_leave && T.buttons === 0 && (E = setTimeout(l.close, h.dialog_close_on_mouse_leave_delay));
  }), l.addEventListener("mouseenter", (T) => {
    h.dialog_close_on_mouse_leave && E && clearTimeout(E);
  }), ve(l);
};
k.onGroupAdd = function(e, t, s, n) {
  const i = N.active_canvas;
  i.getCanvasWindow();
  const o = new fe();
  o.pos = i.convertEventToCanvasOffset(s), i.graph.addGroup(o);
};
k.onMenuAdd = function(e, t, s, n, i) {
  const o = N.active_canvas, a = o.getCanvasWindow(), r = o.graph;
  if (!r)
    return;
  function l(u, f) {
    const c = h.getNodeTypesCategories(o.filter || r.filter).filter((_) => _.startsWith(u)), p = [];
    c.map((_) => {
      if (!_)
        return;
      const g = new RegExp(`^(${u})`), d = _.replace(g, "").split("/")[0], y = u === "" ? `${d}/` : `${u + d}/`;
      let m = d;
      m.includes("::") && (m = m.split("::")[1]), p.findIndex((T) => T.value === y) === -1 && p.push(
        {
          value: y,
          content: m,
          has_submenu: !0,
          callback(T, b, I, S) {
            l(T.value, S);
          }
        }
      );
    }), h.getNodeTypesInCategory(u.slice(0, -1), o.filter || r.filter).map((_) => {
      if (_.hide_in_node_lists)
        return;
      const g = {
        value: _.class,
        content: _.title,
        has_submenu: !1,
        callback(d, y, m, E) {
          const T = E.getFirstEvent();
          o.graph.beforeChange();
          const b = h.createNode(d.value);
          b && (b.pos = o.convertEventToCanvasOffset(T), o.graph.add(b)), i && i(b), o.graph.afterChange();
        }
      };
      p.push(g);
    }), new z(p, { event: s, parentMenu: f }, a);
  }
  return l("", n), !1;
};
k.showMenuNodeOptionalInputs = function(e, t, s, n, i) {
  if (!i)
    return;
  const o = this, r = N.active_canvas.getCanvasWindow(), l = i.getOptionalSlots().inputs;
  let u = [];
  if (l)
    for (let c = 0; c < l.length; c++) {
      const p = l[c];
      if (!p) {
        u.push(W.SEPARATOR);
        continue;
      }
      let { name: v, type: _, options: g } = p;
      g || (g = {}), g.label && (v = g.label), g.removable = !0;
      const d = { content: v, value: p };
      _ == O.ACTION && (d.className = "event"), u.push(d);
    }
  if (i.onMenuNodeInputs) {
    const c = i.onMenuNodeInputs(u);
    c && (u = c);
  }
  if (!u.length) {
    console.log("no input entries");
    return;
  }
  new z(
    u,
    {
      event: s,
      callback: f,
      parentMenu: n,
      node: i
    },
    r
  );
  function f(c, p, v, _) {
    if (i && (c.callback && c.callback.call(o, i, c, v, _), c.value)) {
      const g = c.value;
      i.graph.beforeChange(), i.addInput(g.name, g.type, g.options), i.onNodeOptionalInputAdd && i.onNodeOptionalInputAdd(c.value), i.setDirtyCanvas(!0, !0), i.graph.afterChange();
    }
  }
  return !1;
};
k.showMenuNodeOptionalOutputs = function(e, t, s, n, i) {
  if (!i)
    return;
  const o = this, r = N.active_canvas.getCanvasWindow(), l = i.getOptionalSlots().outputs;
  let u = [];
  if (l)
    for (let c = 0; c < l.length; c++) {
      const p = l[c];
      if (!p) {
        u.push(W.SEPARATOR);
        continue;
      }
      let { name: v, type: _, options: g } = p;
      if (i.flags && i.flags.skip_repeated_outputs && i.findOutputSlotIndexByName(p[0]) != -1)
        continue;
      g || (g = {}), g.label && (v = g.label), g.removable = !0;
      const d = { content: v, value: [v, _, g] };
      _ == O.EVENT && (d.className = "event"), u.push(d);
    }
  if (this.onMenuNodeOutputs && (u = this.onMenuNodeOutputs(u)), h.do_add_triggers_slots && i.findOutputSlotIndexByName("onExecuted") == -1 && u.push({ content: "On Executed", value: ["onExecuted", O.EVENT, { nameLocked: !0 }], className: "event" }), i.onMenuNodeOutputs) {
    const c = i.onMenuNodeOutputs(u);
    c && (u = c);
  }
  if (!u.length)
    return;
  const f = function(c, p, v, _) {
    if (!i || (c.callback && c.callback.call(o, i, c, v, _), !c.value))
      return;
    const g = c.value[1];
    if (g && (g.constructor === Object || g.constructor === Array)) {
      const d = [];
      for (const y in g)
        d.push({ content: y, value: g[y] });
      return new z(d, {
        event: v,
        callback: f,
        parentMenu: n,
        node: i
      }), !1;
    } else {
      const d = c.value;
      i.graph.beforeChange(), i.addOutput(d.name, d.type, d.options), i.onNodeOptionalOutputAdd && i.onNodeOptionalOutputAdd(c.value), i.setDirtyCanvas(!0, !0), i.graph.afterChange();
    }
  };
  return new z(
    u,
    {
      event: s,
      callback: f,
      parentMenu: n,
      node: i
    },
    r
  ), !1;
};
k.onMenuResizeNode = function(e, t, s, n, i) {
  if (!i)
    return;
  const o = function(r) {
    r.size = r.computeSize(), r.onResize && r.onResize(r.size);
  }, a = N.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    o(i);
  else
    for (const r in a.selected_nodes)
      o(a.selected_nodes[r]);
  i.setDirtyCanvas(!0, !0);
};
k.onShowMenuNodeProperties = function(e, t, s, n, i) {
  if (!i || !i.properties)
    return;
  const o = N.active_canvas, a = o.getCanvasWindow(), r = [];
  for (const u in i.properties) {
    let f = i.properties[u] !== void 0 ? i.properties[u] : " ";
    typeof f == "object" && (f = JSON.stringify(f));
    const c = i.getPropertyInfo(u);
    (c.type == "enum" || c.type == "combo") && (f = N.getPropertyPrintableValue(f, c.values)), f = N.decodeHTML(f), r.push({
      content: `<span class='property_name'>${c.label ? c.label : u}</span><span class='property_value'>${f}</span>`,
      value: u
    });
  }
  if (!r.length)
    return;
  new z(
    r,
    {
      event: s,
      callback: l,
      parentMenu: n,
      allow_html: !0,
      node: i
    },
    a
  );
  function l(u, f, c, p) {
    if (!i)
      return;
    const v = this.getBoundingClientRect();
    o.showEditPropertyValue(i, u.value, {
      position: [v.left, v.top]
    });
  }
  return !1;
};
k.onResizeNode = function(e, t, s, n, i) {
  i && (i.size = i.computeSize(), i.setDirtyCanvas(!0, !0));
};
k.onMenuNodeCollapse = function(e, t, s, n, i) {
  i.graph.beforeChange(
    /* ? */
  );
  const o = function(r) {
    r.collapse();
  }, a = N.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    o(i);
  else
    for (const r in a.selected_nodes)
      o(a.selected_nodes[r]);
  i.graph.afterChange(
    /* ? */
  );
};
k.onMenuNodePin = function(e, t, s, n, i) {
  i.pin();
};
k.onMenuNodeMode = function(e, t, s, n, i) {
  const o = Array.from(ie).map((r) => ({ content: r }));
  new z(
    o,
    { event: s, callback: a, parentMenu: n, node: i }
  );
  function a(r) {
    if (!i)
      return;
    const l = Object.values(ie).indexOf(r.content), u = function(c) {
      l >= X.ALWAYS && ie[l] ? c.changeMode(l) : (console.warn(`unexpected mode: ${r}`), c.changeMode(X.ALWAYS));
    }, f = N.active_canvas;
    if (!f.selected_nodes || Object.keys(f.selected_nodes).length <= 1)
      u(i);
    else
      for (const c in f.selected_nodes)
        u(f.selected_nodes[c]);
  }
  return !1;
};
k.onMenuNodeColors = function(e, t, s, n, i) {
  if (!i)
    throw "no node for color";
  const o = [];
  o.push({
    value: null,
    content: "<span style='display: block; padding-left: 4px;'>No color</span>"
  });
  for (const r in N.node_colors) {
    const l = N.node_colors[r], u = {
      value: r,
      content: `<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid ${l.color}; background-color:${l.bgcolor}'>${r}</span>`
    };
    o.push(u);
  }
  new z(o, {
    event: s,
    callback: a,
    parentMenu: n,
    node: i,
    allow_html: !0
  });
  function a(r) {
    if (!i)
      return;
    const l = r.value ? N.node_colors[r.value] : null, u = function(c) {
      l ? c instanceof fe ? c.color = l.groupcolor : (c.color = l.color, c.bgcolor = l.bgcolor) : (delete c.color, c instanceof oe && delete c.bgcolor);
    }, f = N.active_canvas;
    if (!f.selected_nodes || Object.keys(f.selected_nodes).length <= 1)
      u(i);
    else
      for (const c in f.selected_nodes)
        u(f.selected_nodes[c]);
    i.setDirtyCanvas(!0, !0);
  }
  return !1;
};
k.onMenuNodeShapes = function(e, t, s, n, i) {
  if (!i)
    throw "no node passed";
  const o = Array.from(be).map((r) => ({ content: r }));
  new z(o, {
    event: s,
    callback: a,
    parentMenu: n,
    node: i
  });
  function a(r) {
    if (!i)
      return;
    i.graph.beforeChange(
      /* ? */
    );
    const l = function(f) {
      f.shape = be.indexOf(r.content);
    }, u = N.active_canvas;
    if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1)
      l(i);
    else
      for (const f in u.selected_nodes)
        l(u.selected_nodes[f]);
    i.graph.afterChange(
      /* ? */
    ), i.setDirtyCanvas(!0);
  }
  return !1;
};
k.onMenuNodeRemove = function(e, t, s, n, i) {
  if (!i)
    throw "no node passed";
  const o = i.graph;
  o.beforeChange();
  const a = function(l) {
    l.removable !== !1 && o.remove(l);
  }, r = N.active_canvas;
  if (!r.selected_nodes || Object.keys(r.selected_nodes).length <= 1)
    a(i);
  else
    for (const l in r.selected_nodes)
      a(r.selected_nodes[l]);
  o.afterChange(), i.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraph = function(e, t, s, n, i) {
  const o = i.graph, a = N.active_canvas;
  if (!a)
    return;
  let r = Object.values(a.selected_nodes || {});
  r.length || (r = [i]);
  const l = h.createNode("graph/subgraph", null, { constructorArgs: [null] });
  l.pos = i.pos.concat(), o.add(l), l.buildFromNodes(r), a.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraphInputs = function(e, t, s, n, i) {
  const o = N.active_canvas;
  if (!o)
    return;
  const a = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !a) {
    console.error("[To Subgraph Inputs] Current graph is not a subgraph!", i.graph);
    return;
  }
  let r = Object.values(o.selected_nodes || {});
  r.length || (r = [i]), a.convertNodesToSubgraphInputs(r), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraphOutputs = function(e, t, s, n, i) {
  const o = N.active_canvas;
  if (!o)
    return;
  const a = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !a) {
    console.error("[To Subgraph Outputs] Current graph is not a subgraph!", i.graph);
    return;
  }
  let r = Object.values(o.selected_nodes || {});
  r.length || (r = [i]), a.convertNodesToSubgraphOutputs(r), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToParentGraph = function(e, t, s, n, i) {
  const o = N.active_canvas;
  if (!o)
    return;
  const a = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !a) {
    console.error("[To Parent Graph] Current graph is not a subgraph!", i.graph);
    return;
  }
  let r = Object.values(o.selected_nodes || {});
  r.length || (r = [i]), a.moveNodesToParentGraph(r), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
k.onMenuNodeClone = function(e, t, s, n, i) {
  const o = N.active_canvas;
  (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1) && o.selectNode(i), o.cloneSelection();
};
const ue = class {
  constructor(e, t, s = {}) {
    this.link_type_colors = {}, this.node_panel = null, this.options_panel = null, this.render_time = 0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_reconnect_links = !0, this.allow_searchbox = !0, this.always_render_background = !1, this.background_image = ue.DEFAULT_BACKGROUND_IMAGE, this.block_click = !1, this.clear_background = !0, this.connecting_pos = null, this.connecting_slot = null, this.connecting_input = null, this.connecting_output = null, this.connections_width = 3, this.current_node = null, this.drag_mode = !1, this.dragging_rectangle = null, this.ds = new Pe(), this.editor_alpha = 1, this.filter = null, this.highquality_render = !0, this.skip_events = !1, this.last_mouse_position = [0, 0], this.last_click_position = [0, 0], this.last_click_position_offset = [0, 0], this.last_mouse_dragging = !1, this.links_render_mode = LinkRenderMode.SPLINE_LINK, this.live_mode = !1, this.mouse = [0, 0], this.offset_mouse = [0, 0], this.graph_mouse = [0, 0], this.node_widget = null, this.maxZoom = null, this.minZoom = null, this.multi_select = !1, this.over_link_center = null, this.pause_rendering = !1, this.read_only = !1, this.render_canvas_border = !0, this.render_collapsed_slots = !0, this.render_connection_arrows = !1, this.render_connections_border = !0, this.render_connections_shadows = !1, this.render_connections = !0, this.render_curved_connections = !1, this.render_execution_order = !1, this.render_link_tooltip = !0, this.render_only_selected = !0, this.render_shadows = !0, this.render_title_colored = !0, this.render_subgraph_panels = !0, this.render_subgraph_stack_header = !0, this.round_radius = 8, this.set_canvas_dirty_on_mouse_event = !0, this.show_info = !0, this.use_gradients = !1, this.visible_links = [], this.zoom_modify_alpha = !0, this.pointer_is_down = !1, this.pointer_is_double = !1, this._highlight_input = null, this._highlight_input_slot = null, this._highlight_output = null, this._graph_stack = [], this._bg_img = null, this._pattern = null, this._pattern_img = null, this.search_box = null, this.prompt_box = null, this._events_binded = !1, this.resizing_node = null, typeof e == "string" && (e = document.querySelector(e)), this.skip_events = s.skip_events || !1, this.title_text_font = `${h.NODE_TEXT_SIZE}px Arial`, this.inner_text_font = `normal ${h.NODE_SUBTEXT_SIZE}px Arial`, this.node_title_color = h.NODE_TITLE_COLOR, this.default_link_color = h.LINK_COLOR, this.link_type_colors = h.cloneObject(ue.DEFAULT_LINK_TYPE_COLORS), this.canvas_mouse = this.graph_mouse, this.visible_area = this.ds.visible_area, this.viewport = s.viewport || null, t && t.attachCanvas(this), this.setCanvas(e, s.skip_events), this.clear(), s.skip_render || this.startRendering(), this.autoresize = s.autoresize;
  }
  static getFileExtension(e) {
    const t = e.indexOf("?");
    t != -1 && (e = e.substr(0, t));
    const s = e.lastIndexOf(".");
    return s == -1 ? "" : e.substr(s + 1).toLowerCase();
  }
  static decodeHTML(e) {
    const t = document.createElement("div");
    return t.innerText = e, t.innerHTML;
  }
  static getPropertyPrintableValue(e, t) {
    if (!t || t.constructor === Array)
      return String(e);
    if (t.constructor === Object) {
      let s = "";
      for (const n in t)
        if (t[n] == e) {
          s = n;
          break;
        }
      return `${String(e)} (${s})`;
    }
  }
  get scale() {
    return this.ds.scale;
  }
  set scale(e) {
    this.ds.scale = e;
  }
  /** clears all the data inside */
  clear() {
    this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.visible_nodes = [], this.node_dragged = null, this.node_over = null, this.node_capturing_input = null, this.connecting_node = null, this.highlighted_links = {}, this.dragging_canvas = !1, this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer_is_down = !1, this.pointer_is_double = !1, this.onClear && this.onClear();
  }
  /** assigns a graph, you can reassign graphs to the same canvas */
  setGraph(e, t = !1) {
    if (this.graph != e) {
      if (t || this.clear(), !e && this.graph) {
        this.graph.detachCanvas(this);
        return;
      }
      e.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0);
    }
  }
  /** opens a graph contained inside a node in the current graph */
  openSubgraph(e) {
    if (!e)
      throw "graph cannot be null";
    if (this.graph == e)
      throw "graph cannot be the same";
    if (this.clear(), this.graph) {
      this._graph_stack || (this._graph_stack = []);
      const s = [this.ds.offset[0], this.ds.offset[1]];
      this._graph_stack.push({ graph: this.graph, offset: s, scale: this.ds.scale });
    }
    h.debug && (console.warn("SubGraph opened", e), console.warn("Graph inputs", e.inputs), console.warn("Graph outputs", e.outputs)), e.attachCanvas(this);
    const t = [0, 0];
    if (e._nodes.length > 0) {
      let s = Number.MAX_SAFE_INTEGER, n = 0, i = Number.MAX_SAFE_INTEGER, o = 0;
      for (const a of e.iterateNodesInOrder())
        s = Math.min(a.pos[0], s), n = Math.max(a.pos[0] + a.size[0], n), i = Math.min(a.pos[1], i), o = Math.max(a.pos[1] + a.size[1], o);
      t[0] = -(s + (n - s) / 2) + this.canvas.width / 2, t[1] = -(i + (o - i) / 2) + this.canvas.height / 2;
    }
    this.ds.offset = t, this.ds.scale = 1, this.checkPanels(), this.setDirty(!0, !0);
  }
  closeAllSubgraphs() {
    for (; this._graph_stack && this._graph_stack.length > 0; )
      this.closeSubgraph();
  }
  /** closes a subgraph contained inside a node */
  closeSubgraph() {
    if (!this._graph_stack || this._graph_stack.length == 0)
      return;
    const e = this.graph._subgraph_node, { graph: t, offset: s, scale: n } = this._graph_stack.pop();
    this.selected_nodes = {}, this.highlighted_links = {}, t.attachCanvas(this), this.setDirty(!0, !0), e && (this.centerOnNode(e), this.selectNodes([e])), this.ds.offset = s, this.ds.scale = n;
  }
  /** assigns a canvas */
  setCanvas(e, t = !1) {
    if (e && typeof e == "string" && (e = document.getElementById(e), !e))
      throw "Error creating LiteGraph canvas: Canvas not found";
    if (e = e, e !== this.canvas && (!e && this.canvas && (t || this.unbindEvents()), this.canvas = e, this.ds.element = e, !!e)) {
      if (e.className += " lgraphcanvas", e.data = this, e.tabIndex = 1, this.bgcanvas = null, this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height), e.getContext == null)
        throw e.localName != "canvas" ? `Element supplied for LGraphCanvas must be a <canvas> element, you passed a ${e.localName}` : "This browser doesn't support Canvas";
      t || this.bindEvents(), this.adjustCanvasForHiDPI();
    }
  }
  // used in some events to capture them
  _doNothing(e) {
    return e.preventDefault(), !1;
  }
  _doReturnTrue(e) {
    return e.preventDefault(), !0;
  }
  /** binds mouse, keyboard, touch and drag events to the canvas */
  bindEvents() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }
    const e = this.canvas, s = this.getCanvasWindow().document;
    this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), h.pointerListenerAdd(e, "down", this._mousedown_callback, !0), e.addEventListener("mousewheel", this._mousewheel_callback, !1), h.pointerListenerAdd(e, "up", this._mouseup_callback, !0), h.pointerListenerAdd(e, "move", this._mousemove_callback), e.addEventListener("contextmenu", this._doNothing), e.addEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback,
      !1
    ), this._key_callback = this.processKey.bind(this), e.addEventListener("keydown", this._key_callback, !0), s.addEventListener("keyup", this._key_callback, !0), this._ondrop_callback = this.processDrop.bind(this), e.addEventListener("dragover", this._doNothing, !1), e.addEventListener("dragend", this._doNothing, !1), e.addEventListener("drop", this._ondrop_callback, !1), e.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
  }
  /** unbinds mouse events from the canvas */
  unbindEvents() {
    if (!this._events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }
    h.debug && console.log("pointerevents: unbindEvents");
    const t = this.getCanvasWindow().document;
    h.pointerListenerRemove(this.canvas, "move", this._mousedown_callback), h.pointerListenerRemove(this.canvas, "up", this._mousedown_callback), h.pointerListenerRemove(this.canvas, "down", this._mousedown_callback), this.canvas.removeEventListener(
      "mousewheel",
      this._mousewheel_callback
    ), this.canvas.removeEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback
    ), this.canvas.removeEventListener("keydown", this._key_callback), t.removeEventListener("keyup", this._key_callback), this.canvas.removeEventListener("contextmenu", this._doNothing), this.canvas.removeEventListener("drop", this._ondrop_callback), this.canvas.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = null, this._mousewheel_callback = null, this._key_callback = null, this._ondrop_callback = null, this._events_binded = !1;
  }
  /**
   * this function allows to render the canvas using WebGL instead of Canvas2D
   * this is useful if you plant to render 3D objects inside your nodes, it uses litegl.js for webgl and canvas2DtoWebGL to emulate the Canvas2D calls in webGL
   */
  enableWebGL() {
  }
  /**
   * marks as dirty the canvas, this way it will be rendered again
   * @param fg if the foreground canvas is dirty (the one containing the nodes)
   * @param bg if the background canvas is dirty (the one containing the wires)
   */
  setDirty(e = !1, t = !1) {
    e && (this.dirty_canvas = !0), t && (this.dirty_bgcanvas = !0);
  }
  /**
   * Used to attach the canvas in a popup
   * @return the window where the canvas is attached (the DOM root node)
   */
  getCanvasWindow() {
    return this.canvas ? this.canvas.ownerDocument.defaultView : window;
  }
  adjustCanvasForHiDPI(e) {
    if (e || (e = window.devicePixelRatio), e == 1 || !this.canvas.parentNode)
      return;
    const t = this.canvas.parentNode.getBoundingClientRect(), { width: s, height: n } = t;
    this.canvas.width = s * e, this.canvas.height = n * e, this.canvas.style.width = `${s}px`, this.canvas.style.height = `${n}px`, this.canvas.getContext("2d").scale(e, e);
  }
  /** starts rendering the content of the canvas when needed */
  startRendering() {
    if (this.is_rendering)
      return;
    this.is_rendering = !0, e.call(this);
    function e() {
      this.pause_rendering || this.draw();
      const t = this.getCanvasWindow();
      this.is_rendering && t.requestAnimationFrame(e.bind(this));
    }
  }
  /** stops rendering the content of the canvas (to save resources) */
  stopRendering() {
    this.is_rendering = !1;
  }
  // used to block future mouse events (because of im gui)
  blockClick() {
    this.block_click = !0, this.last_mouseclick = 0;
  }
  createDefaultNodeForSlot(e, t = {}) {
    const s = this, n = t.nodeFrom && t.slotFrom !== null, i = !n && t.nodeTo && t.slotTo !== null;
    if (t = { ...{
      position: [0, 0],
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, ...t }, !n && !i)
      return console.warn(`No data passed to createDefaultNodeForSlot ${t.nodeFrom} ${t.slotFrom} ${t.nodeTo} ${t.slotTo}`), !1;
    if (!e)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    const a = n ? t.nodeFrom : t.nodeTo;
    let r = n ? t.slotFrom : t.slotTo, l = null;
    switch (typeof r) {
      case "string":
        l = n ? a.findOutputSlotIndexByName(r) : a.findInputSlotIndexByName(r), r = n ? a.outputs[r] : a.inputs[r];
        break;
      case "object":
        l = n ? a.findOutputSlotIndexByName(r.name) : a.findInputSlotIndexByName(r.name);
        break;
      case "number":
        l = r, r = n ? a.outputs[r] : a.inputs[r];
        break;
      case "undefined":
      default:
        return console.warn(`Cant get slot information ${r}`), !1;
    }
    r = r, (!r || !l) && console.warn(`createDefaultNodeForSlot bad slotX ${r} ${l}`);
    const u = r.type == BuiltInSlotType.EVENT ? "_event_" : r.type, f = n ? h.slot_types_default_out : h.slot_types_default_in, c = f[u];
    if (f && c) {
      r.link !== null || r.links && r.links.length > 0;
      let v = null;
      if (Array.isArray(c)) {
        for (const _ in c)
          if (e == f[u][_] || e == "AUTO") {
            v = f[u][_], h.debug && console.log(`opts.nodeType == slotTypesDefault[fromSlotType][typeX] :: ${e}`);
            break;
          }
      } else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${c}`);
      if (v) {
        let _ = null;
        typeof v == "object" && v.node && (_ = v, v = v.node);
        const g = h.createNode(v);
        if (g) {
          if (_) {
            if (_.properties)
              for (var p in _.properties)
                g.addProperty(p, _.properties[p]);
            if (_.inputs) {
              g.inputs = [];
              for (var p in _.inputs)
                g.addOutput(
                  _.inputs[p][0],
                  _.inputs[p][1]
                );
            }
            if (_.outputs) {
              g.outputs = [];
              for (var p in _.outputs)
                g.addOutput(
                  _.outputs[p][0],
                  _.outputs[p][1]
                );
            }
            _.title && (g.title = _.title), _.json && g.configure(_.json);
          }
          console.warn("PLACING", g.type, t);
          const d = t.position[0] + t.posAdd[0] + (t.posSizeFix[0] ? t.posSizeFix[0] * g.size[0] : 0), y = t.position[1] + t.posAdd[1] + (t.posSizeFix[1] ? t.posSizeFix[1] * g.size[1] : 0), m = [d, y];
          return s.graph.add(g, { pos: m }), n ? t.nodeFrom.connectByTypeInput(l, g, u) : t.nodeTo.connectByTypeOutput(l, g, u), n && i && console.debug("connecting in between"), !0;
        } else
          console.log(`failed creating ${v}`);
      }
    }
    return !1;
  }
  /** returns true if a position (in graph space) is on top of a node little corner box */
  isOverNodeBox(e, t, s) {
    const n = h.NODE_TITLE_HEIGHT;
    return !!h.isInsideRectangle(
      t,
      s,
      e.pos[0] + 2,
      e.pos[1] + 2 - n,
      n - 4,
      n - 4
    );
  }
  /** returns slot index if a position (in graph space) is on top of a node input slot */
  isOverNodeInput(e, t, s, n) {
    if (e.inputs)
      for (let i = 0, o = e.inputs.length; i < o; ++i) {
        const a = e.getConnectionPos(!0, i);
        let r = !1;
        if (e.horizontal ? r = h.isInsideRectangle(
          t,
          s,
          a[0] - 5,
          a[1] - 10,
          10,
          20
        ) : r = h.isInsideRectangle(
          t,
          s,
          a[0] - 10,
          a[1] - 5,
          40,
          10
        ), r)
          return n && (n[0] = a[0], n[1] = a[1]), i;
      }
    return -1;
  }
  /**
   * returns the INDEX if a position (in graph space) is on top of a node output slot
   * @method isOverNodeOuput
   */
  isOverNodeOutput(e, t, s, n) {
    if (e.outputs)
      for (let i = 0, o = e.outputs.length; i < o; ++i) {
        e.outputs[i];
        const a = e.getConnectionPos(!1, i);
        let r = !1;
        if (e.horizontal ? r = h.isInsideRectangle(
          t,
          s,
          a[0] - 5,
          a[1] - 10,
          10,
          20
        ) : r = h.isInsideRectangle(
          t,
          s,
          a[0] - 10,
          a[1] - 5,
          40,
          10
        ), r)
          return n && (n[0] = a[0], n[1] = a[1]), i;
      }
    return -1;
  }
  findLinkCenterAtPos(e, t) {
    for (let s = 0; s < this.visible_links.length; ++s) {
      const n = this.visible_links[s];
      if (this.graph && this.graph.links[n.id] == null)
        continue;
      const i = n._pos;
      if (!(!i || e < i[0] - 4 || e > i[0] + 4 || t < i[1] - 4 || t > i[1] + 4))
        return n;
    }
    return null;
  }
  /** process a key event */
  processKey(e) {
    if (!this.graph)
      return;
    let t = !1;
    if (h.debug && console.log("processKey", e), e.target instanceof Element && e.target.localName == "input")
      return;
    const s = this.allow_interaction && !this.read_only;
    if (e.type == "keydown") {
      if (e.keyCode == 32 && !(e.metaKey || e.ctrlKey || e.shiftKey) && (this.dragging_canvas = !0, t = !0), e.keyCode == 27 && !(e.metaKey || e.ctrlKey || e.shiftKey) && (this.node_panel && this.node_panel.close(), this.options_panel && this.options_panel.close(), t = !0), s && (e.keyCode == 65 && e.ctrlKey && (this.selectNodes(), t = !0), e.code == "KeyX" && (e.metaKey || e.ctrlKey) && !e.shiftKey && this.selected_nodes && (this.cutToClipboard(), t = !0), e.code == "KeyC" && (e.metaKey || e.ctrlKey) && !e.shiftKey && this.selected_nodes && (this.copyToClipboard(), t = !0), e.code == "KeyV" && (e.metaKey || e.ctrlKey) && !e.shiftKey && this.pasteFromClipboard(), e.code == "KeyD" && (e.metaKey || e.ctrlKey) && !e.shiftKey && (this.cloneSelection(), t = !0), (e.keyCode == 46 || e.keyCode == 8) && e.target instanceof Element && e.target.localName != "input" && e.target.localName != "textarea" && (this.deleteSelectedNodes(), t = !0), this.selected_nodes))
        for (var n in this.selected_nodes)
          this.selected_nodes[n].onKeyDown && this.selected_nodes[n].onKeyDown(e);
    } else if (e.type == "keyup" && (e.keyCode == 32 && (this.dragging_canvas = !1), s && this.selected_nodes))
      for (var n in this.selected_nodes)
        this.selected_nodes[n].onKeyUp && this.selected_nodes[n].onKeyUp(e);
    if (this.graph.change(), t)
      return e.preventDefault(), e.stopImmediatePropagation(), !1;
  }
  cutToClipboard() {
    this.copyToClipboard(), this.deleteSelectedNodes();
  }
  copyToClipboard() {
    const e = {
      nodes: [],
      nodeCloneData: {},
      links: []
    };
    let t = 0;
    const s = [];
    for (const n in this.selected_nodes) {
      const i = this.selected_nodes[n];
      i._relative_id = t, s.push(i), t += 1;
    }
    for (let n = 0; n < s.length; ++n) {
      const i = s[n];
      if (!i.clonable)
        continue;
      const o = { forNode: {} }, a = i.clone(o);
      if (!a) {
        console.warn(`node type not found: ${i.type}`);
        continue;
      }
      if (e.nodes.push(a.serialize()), e.nodeCloneData[a.id] = {
        prevNodeID: i.id,
        cloneData: o
      }, i.inputs && i.inputs.length)
        for (let r = 0; r < i.inputs.length; ++r) {
          const l = i.inputs[r];
          if (!l || l.link == null)
            continue;
          const u = this.graph.links[l.link];
          if (!u)
            continue;
          const f = this.graph.getNodeById(
            u.origin_id
          );
          !f || !this.selected_nodes[f.id] || !this.selected_nodes[f.id].clonable || e.links.push([
            f._relative_id,
            u.origin_slot,
            // j,
            i._relative_id,
            u.target_slot
          ]);
        }
    }
    localStorage.setItem(
      "litegrapheditor_clipboard",
      JSON.stringify(e)
    );
  }
  pasteFromClipboard() {
    const e = localStorage.getItem("litegrapheditor_clipboard");
    if (!e)
      return;
    this.graph.beforeChange();
    const t = JSON.parse(e);
    let s = null, n = null;
    for (var i = 0; i < t.nodes.length; ++i)
      s ? (s[0] > t.nodes[i].pos[0] && (s[0] = t.nodes[i].pos[0], n[0] = i), s[1] > t.nodes[i].pos[1] && (s[1] = t.nodes[i].pos[1], n[1] = i)) : (s = [t.nodes[i].pos[0], t.nodes[i].pos[1]], n = [i, i]);
    const o = [];
    for (var i = 0; i < t.nodes.length; ++i) {
      const r = t.nodes[i], l = h.createNode(r.type);
      if (l) {
        l.configure(r), l.pos[0] += this.graph_mouse[0] - s[0], l.pos[1] += this.graph_mouse[1] - s[1];
        const { cloneData: u, prevNodeID: f } = t.nodeCloneData[l.id];
        this.graph.add(l, { doProcessChange: !1, addedBy: "paste", prevNodeID: f, cloneData: u }), o.push(l);
      }
    }
    for (var i = 0; i < t.links.length; ++i) {
      const r = t.links[i], l = o[r[0]], u = o[r[2]];
      l && u ? l.connect(r[1], u, r[3]) : console.warn("Warning, nodes missing on pasting");
    }
    this.selectNodes(o), this.graph.afterChange();
  }
  cloneSelection() {
    if (!this.selected_nodes || Object.keys(this.selected_nodes).length === 0)
      return;
    this.graph.beforeChange();
    const e = {}, t = [], s = {};
    for (const i of Object.values(this.selected_nodes))
      for (const o of i.iterateAllLinks())
        this.selected_nodes[o.origin_id] && this.selected_nodes[o.target_id] && t.push(o);
    const n = function(i) {
      if (i.clonable == !1)
        return;
      const o = i.id, a = { forNode: {} }, r = i.clone(a);
      r && (s[o] = r, r.pos = [i.pos[0] + 5, i.pos[1] + 5], i.graph.add(r, { addedBy: "cloneSelection", prevNodeID: o, prevNode: i, cloneData: a }), e[r.id] = r);
    };
    for (const i in this.selected_nodes)
      n(this.selected_nodes[i]);
    for (const i of t) {
      const o = s[i.origin_id], a = s[i.target_id];
      o && a && o.connect(i.origin_slot, a, i.target_slot);
    }
    Object.keys(e).length && this.selectNodes(Object.values(e)), this.graph.afterChange(), this.setDirty(!0, !0);
  }
  processDrop(e) {
    const t = e;
    t.preventDefault(), this.adjustMouseEvent(t);
    const s = t.clientX, n = t.clientY;
    if (!(!this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && n >= this.viewport[1] && n < this.viewport[1] + this.viewport[3]))
      return;
    const o = [t.canvasX, t.canvasY], a = this.graph ? this.graph.getNodeOnPos(o[0], o[1]) : null;
    if (!a) {
      let u = null;
      this.onDropItem && (u = this.onDropItem(t)), u || this.checkDropItem(t);
      return;
    }
    if (a.onDropFile || a.onDropData) {
      const u = t.dataTransfer.files;
      if (u && u.length)
        for (let f = 0; f < u.length; f++) {
          var r = t.dataTransfer.files[0], l = r.name;
          if (ue.getFileExtension(l), a.onDropFile && a.onDropFile(r), a.onDropData) {
            const c = new FileReader();
            c.onload = function(v) {
              const _ = v.target.result;
              a.onDropData(_, l, r);
            };
            const p = r.type.split("/")[0];
            p == "text" || p == "" ? c.readAsText(r) : p == "image" ? c.readAsDataURL(r) : c.readAsArrayBuffer(r);
          }
        }
    }
    return !!(a.onDropItem && a.onDropItem(t) || this.onDropItem && this.onDropItem(t));
  }
  checkDropItem(e) {
    const t = e;
    if (t.dataTransfer.files.length) {
      const s = t.dataTransfer.files[0], n = ue.getFileExtension(s.name).toLowerCase(), i = h.node_types_by_file_extension[n];
      if (i) {
        this.graph.beforeChange();
        const o = h.createNode(i.type);
        o.pos = [t.canvasX, t.canvasY], this.graph.add(o), o.onDropFile && o.onDropFile(s), this.graph.afterChange();
      }
    }
  }
  processNodeDblClicked(e) {
    this.onShowNodePanel ? this.onShowNodePanel(e) : this.showShowNodePanel(e), this.onNodeDblClicked && this.onNodeDblClicked(e), this.setDirty(!0);
  }
  processNodeSelected(e, t) {
    this.selectNode(e, t && (t.shiftKey || t.ctrlKey || this.multi_select)), this.onNodeSelected && this.onNodeSelected(e);
  }
  /** selects a given node (or adds it to the current selection) */
  selectNode(e, t = !1) {
    e == null ? this.deselectAllNodes() : this.selectNodes([e], t);
  }
  /** selects several nodes (or adds them to the current selection) */
  selectNodes(e, t = !1) {
    t || this.deselectAllNodes(), e = e || this.graph._nodes, typeof e == "string" && (e = [e]);
    for (const n in e) {
      const i = e[n];
      if (i.is_selected) {
        this.deselectNode(i);
        continue;
      }
      if (!i.is_selected && i.onSelected && i.onSelected(), i.is_selected = !0, this.selected_nodes[i.id] = i, i.inputs)
        for (var s = 0; s < i.inputs.length; ++s)
          this.highlighted_links[i.inputs[s].link] = !0;
      if (i.outputs)
        for (var s = 0; s < i.outputs.length; ++s) {
          const a = i.outputs[s];
          if (a.links)
            for (let r = 0; r < a.links.length; ++r)
              this.highlighted_links[a.links[r]] = !0;
        }
    }
    this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** removes a node from the current selection */
  deselectNode(e) {
    if (e.is_selected) {
      if (e.onDeselected && e.onDeselected(), e.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(e), e.inputs)
        for (var t = 0; t < e.inputs.length; ++t)
          delete this.highlighted_links[e.inputs[t].link];
      if (e.outputs)
        for (var t = 0; t < e.outputs.length; ++t) {
          const n = e.outputs[t];
          if (n.links)
            for (let i = 0; i < n.links.length; ++i)
              delete this.highlighted_links[n.links[i]];
        }
    }
  }
  /** removes all nodes from the current selection */
  deselectAllNodes() {
    if (!this.graph)
      return;
    const e = this.graph._nodes;
    for (let t = 0, s = e.length; t < s; ++t) {
      const n = e[t];
      n.is_selected && (n.onDeselected && n.onDeselected(), n.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(n));
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** deletes all nodes in the current selection from the graph */
  deleteSelectedNodes() {
    this.graph.beforeChange();
    for (const e in this.selected_nodes) {
      const t = this.selected_nodes[e];
      if (!t.block_delete) {
        if (t.inputs && t.inputs.length && t.outputs && t.outputs.length && h.isValidConnection(t.inputs[0].type, t.outputs[0].type) && t.inputs[0].link && t.outputs[0].links && t.outputs[0].links.length) {
          const s = t.graph.links[t.inputs[0].link], n = t.graph.links[t.outputs[0].links[0]], i = t.getInputNode(0), o = t.getOutputNodes(0)[0];
          i && o && i.connect(s.origin_slot, o, n.target_slot);
        }
        this.graph.remove(t), this.onNodeDeselected && this.onNodeDeselected(t);
      }
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.setDirty(!0), this.graph.afterChange();
  }
  /** centers the camera on a given node */
  centerOnNode(e) {
    this.ds.offset[0] = -e.pos[0] - e.size[0] * 0.5 + this.canvas.width * 0.5 / this.ds.scale, this.ds.offset[1] = -e.pos[1] - e.size[1] * 0.5 + this.canvas.height * 0.5 / this.ds.scale, this.setDirty(!0, !0);
  }
  /**
   * adds some useful properties to a mouse event, like the position in graph coordinates
   * @method adjustMouseEvent
   */
  adjustMouseEvent(e) {
    const t = e;
    let s = 0, n = 0;
    if (this.canvas) {
      const i = this.canvas.getBoundingClientRect();
      s = t.clientX - i.left, n = t.clientY - i.top;
    } else
      s = t.clientX, n = t.clientY;
    return this.last_mouse_position[0] = s, this.last_mouse_position[1] = n, t.canvasX = s / this.ds.scale - this.ds.offset[0], t.canvasY = n / this.ds.scale - this.ds.offset[1], t;
  }
  /** process an event on widgets */
  processNodeWidgets(e, t, s, n) {
    if (!e.widgets || !e.widgets.length || h.ignore_all_widget_events)
      return null;
    const i = t[0] - e.pos[0], o = t[1] - e.pos[1], a = e.size[0], r = this, l = this.getCanvasWindow();
    for (let y = 0; y < e.widgets.length; ++y) {
      var u = e.widgets[y];
      if (!u || u.disabled)
        continue;
      const m = u.computeSize ? u.computeSize(a)[1] : h.NODE_WIDGET_HEIGHT, E = u.width || a;
      if (!(u != n && (i < 6 || i > E - 12 || o < u.last_y || o > u.last_y + m || u.last_y === void 0))) {
        var f = u.value;
        switch (u.type) {
          case "button":
            s.type === `${h.pointerevents_method}down` && (u.callback && setTimeout(() => {
              u.callback(u, r, e, t, s);
            }, 20), u.clicked = !0, this.dirty_canvas = !0);
            break;
          case "slider":
            u.options.max - u.options.min;
            var c = _e((i - 15) / (E - 30), 0, 1);
            u.value = u.options.min + (u.options.max - u.options.min) * c, u.callback && setTimeout(() => {
              d(u, u.value);
            }, 20), this.dirty_canvas = !0;
            break;
          case "number":
          case "combo":
            var f = u.value;
            if (s.type == `${h.pointerevents_method}move` && u.type == "number")
              s.deltaX && (u.value += s.deltaX * (u.options.step || 0.1)), u.options.min != null && u.value < u.options.min && (u.value = u.options.min), u.options.max != null && u.value > u.options.max && (u.value = u.options.max);
            else if (s.type == `${h.pointerevents_method}down`) {
              var p = u.options.values;
              if (p && typeof p == "function") {
                const b = u.options.values;
                p = b(u, e);
              }
              var v = null;
              u.type != "number" && (v = Array.isArray(p) ? p : Object.keys(p));
              var _ = i < 40 ? -1 : i > E - 40 ? 1 : 0;
              if (u.type == "number")
                u.value += _ * (u.options.step || 0.1), u.options.min != null && u.value < u.options.min && (u.value = u.options.min), u.options.max != null && u.value > u.options.max && (u.value = u.options.max);
              else if (_) {
                let b = -1;
                this.last_mouseclick = 0, p.constructor === Object ? b = v.indexOf(String(u.value)) + _ : b = v.indexOf(u.value) + _, b >= v.length && (b = v.length - 1), b < 0 && (b = 0), Array.isArray(p) ? u.value = p[b] : u.value = b;
              } else {
                let b = function(S, B, J) {
                  let re = S.content;
                  return p != v && (re = g.indexOf(re)), this.value = re, d(this, re), r.dirty_canvas = !0, !1;
                };
                var g = p != v ? Object.values(p) : p;
                const I = Array.from(g).map((S) => ({ content: S }));
                new z(I, {
                  scale: Math.max(1, this.ds.scale),
                  event: s,
                  className: "dark",
                  callback: b.bind(u)
                }, l);
              }
            } else if (s.type == `${h.pointerevents_method}up` && u.type == "number") {
              var _ = i < 40 ? -1 : i > E - 40 ? 1 : 0;
              s.click_time < 200 && _ == 0 && this.prompt("Value", u.value, function(I) {
                this.value = Number(I), d(this, this.value);
              }.bind(u), s);
            }
            f != u.value && setTimeout(
              function() {
                d(this, this.value);
              }.bind(u),
              20
            ), this.dirty_canvas = !0;
            break;
          case "toggle":
            s.type == `${h.pointerevents_method}down` && (u.value = !u.value, setTimeout(() => {
              d(u, u.value);
            }, 20));
            break;
          case "string":
          case "text":
            s.type == `${h.pointerevents_method}down` && this.prompt("Value", u.value, function(b) {
              this.value = b, d(this, b);
            }.bind(u), s, u.options ? u.options.multiline : !1, u.options.inputStyle);
            break;
          default:
            u.mouse && (this.dirty_canvas = u.mouse(s, [i, o], e));
            break;
        }
        return f != u.value && (e.onWidgetChanged && e.onWidgetChanged(u, f), e.graph._version++), u;
      }
    }
    function d(y, m) {
      y.value = m, y.options && y.options.property && e.properties[y.options.property] !== void 0 && e.setProperty(y.options.property, m), y.callback && y.callback(y.value, r, e, t, s);
    }
    return null;
  }
  adjustNodesSize() {
    const e = this.graph._nodes;
    for (let t = 0; t < e.length; ++t)
      e[t].size = e[t].computeSize();
    this.setDirty(!0, !0);
  }
  /** resizes the canvas to a given size, if no size is passed, then it tries to fill the parentNode */
  resize(e, t) {
    if (!e && !t) {
      const s = this.canvas.parentNode;
      e = s.offsetWidth, t = s.offsetHeight;
    }
    this.canvas.width == e && this.canvas.height == t || (this.canvas.width = e, this.canvas.height = t, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.adjustCanvasForHiDPI(), this.setDirty(!0, !0));
  }
  isAreaClicked(e, t, s, n, i) {
    let o = this.offset_mouse;
    h.isInsideRectangle(o[0], o[1], e, t, s, n), o = this.last_click_position;
    const a = o && h.isInsideRectangle(o[0], o[1], e, t, s, n), r = a && !this.block_click;
    return a && i && this.blockClick(), r;
  }
  /**
   * switches to live mode (node shapes are not rendered, only the content)
   * this feature was designed when graphs where meant to create user interfaces
   */
  switchLiveMode(e) {
    if (!e) {
      this.live_mode = !this.live_mode, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
      return;
    }
    const t = this, s = this.live_mode ? 1.1 : 0.9;
    this.live_mode && (this.live_mode = !1, this.editor_alpha = 0.1);
    var n = setInterval(() => {
      t.editor_alpha *= s, t.dirty_canvas = !0, t.dirty_bgcanvas = !0, s < 1 && t.editor_alpha < 0.01 && (clearInterval(n), s < 1 && (t.live_mode = !0)), s > 1 && t.editor_alpha > 0.99 && (clearInterval(n), t.editor_alpha = 1);
    }, 1);
  }
  onNodeSelectionChange() {
  }
  touchHandler(e) {
  }
  convertOffsetToCanvas(e) {
    return this.ds.convertOffsetToCanvas(e);
  }
  convertCanvasToOffset(e, t = [0, 0]) {
    return this.ds.convertCanvasToOffset(e, t);
  }
  /** converts event coordinates from canvas2D to graph coordinates */
  convertEventToCanvasOffset(e) {
    const t = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([
      e.clientX - t.left,
      e.clientY - t.top
    ]);
  }
  addGraphInputNode(e, t, s) {
    const n = this.graph.findNodesByClass(j).find((a) => a.properties.name === t);
    if (n) {
      this.selectNodes([n]);
      return;
    }
    (!s || s === "") && (s = "*");
    const i = [
      this.canvas.width * 0.25 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const o = e.addGraphInput(t, s, i);
    if (o) {
      const a = o.innerNode;
      this.selectNodes([a]), this.graph.afterChange();
    } else
      console.error("graph input node not found:", s);
  }
  addGraphOutputNode(e, t, s) {
    const n = this.graph.findNodesByClass(K).find((a) => a.properties.name === t);
    if (n) {
      this.selectNodes([n]);
      return;
    }
    (!s || s === "") && (s = "*");
    const i = [
      this.canvas.width * 0.75 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const o = e.addGraphOutput(t, s, i);
    if (o) {
      const a = o.innerNode;
      this.selectNodes([a]), this.graph.afterChange();
    } else
      console.error("graph output node not found:", s);
  }
  getCanvasMenuOptions() {
    return k.prototype.getCanvasMenuOptions.apply(this, arguments);
  }
  getNodeMenuOptions(e) {
    return k.prototype.getNodeMenuOptions.apply(this, arguments);
  }
  getLinkMenuOptions(e) {
    return k.prototype.getLinkMenuOptions.apply(this, arguments);
  }
  getGroupMenuOptions(e) {
    return k.prototype.getGroupMenuOptions.apply(this, arguments);
  }
  checkPanels() {
    k.prototype.checkPanels.apply(this, arguments);
  }
  closePanels() {
    k.prototype.closePanels.apply(this, arguments);
  }
  createDialog(e, t) {
    return k.prototype.createDialog.apply(this, arguments);
  }
  createPanel(e, t = {}) {
    return k.prototype.createPanel.apply(this, arguments);
  }
  showSearchBox(e, t = {}) {
    return k.prototype.showSearchBox.apply(this, arguments);
  }
  prompt(e = "", t, s, n, i = !1, o = null) {
    return k.prototype.prompt.apply(this, arguments);
  }
  showConnectionMenu(e = {}) {
    return k.prototype.showConnectionMenu.apply(this, arguments);
  }
  showLinkMenu(e, t) {
    return k.prototype.showLinkMenu.apply(this, arguments);
  }
  showEditPropertyValue(e, t, s) {
    return k.prototype.showEditPropertyValue.apply(this, arguments);
  }
  showShowNodePanel(e) {
    k.prototype.showShowNodePanel.apply(this, arguments);
  }
  showSubgraphPropertiesDialog(e) {
    return k.prototype.showSubgraphPropertiesDialog.apply(this, arguments);
  }
  showSubgraphPropertiesDialogRight(e) {
    return k.prototype.showSubgraphPropertiesDialogRight.apply(this, arguments);
  }
  processContextMenu(e, t) {
    k.prototype.processContextMenu.apply(this, arguments);
  }
  /*
     * Events
     */
  processMouseMove(e) {
    return he.prototype.processMouseMove.apply(this, arguments);
  }
  processMouseDown(e) {
    return he.prototype.processMouseDown.apply(this, arguments);
  }
  processMouseUp(e) {
    return he.prototype.processMouseUp.apply(this, arguments);
  }
  processMouseWheel(e) {
    return he.prototype.processMouseWheel.apply(this, arguments);
  }
  /*
     * Rendering
     */
  setZoom(e, t) {
    M.prototype.setZoom.apply(this, arguments);
  }
  bringToFront(e) {
    M.prototype.bringToFront.apply(this, arguments);
  }
  sendToBack(e) {
    M.prototype.sendToBack.apply(this, arguments);
  }
  computeVisibleNodes(e, t = []) {
    return M.prototype.computeVisibleNodes.apply(this, arguments);
  }
  draw(e = !1, t = !1) {
    M.prototype.draw.apply(this, arguments);
  }
  drawFrontCanvas() {
    M.prototype.drawFrontCanvas.apply(this, arguments);
  }
  drawSubgraphPanel(e) {
    M.prototype.drawSubgraphPanel.apply(this, arguments);
  }
  drawSubgraphPanelLeft(e, t, s) {
    M.prototype.drawSubgraphPanelLeft.apply(this, arguments);
  }
  drawSubgraphPanelRight(e, t, s) {
    M.prototype.drawSubgraphPanelRight.apply(this, arguments);
  }
  drawButton(e, t, s, n, i, o = h.NODE_DEFAULT_COLOR, a = "#555", r = h.NODE_TEXT_COLOR, l = !0) {
    return M.prototype.drawButton.apply(this, arguments);
  }
  drawBackCanvas() {
    M.prototype.drawBackCanvas.apply(this, arguments);
  }
  renderInfo(e, t = 10, s) {
    M.prototype.renderInfo.apply(this, arguments);
  }
  drawNode(e, t) {
    M.prototype.drawNode.apply(this, arguments);
  }
  drawLinkTooltip(e, t) {
    M.prototype.drawLinkTooltip.apply(this, arguments);
  }
  drawNodeShape(e, t, s, n, i, o, a) {
    M.prototype.drawNodeShape.apply(this, arguments);
  }
  drawConnections(e) {
    M.prototype.drawConnections.apply(this, arguments);
  }
  renderLink(e, t, s, n, i, o, a, r, l, u) {
    M.prototype.renderLink.apply(this, arguments);
  }
  computeConnectionPoint(e, t, s, n = Dir.RIGHT, i = Dir.LEFT) {
    return M.prototype.computeConnectionPoint.apply(this, arguments);
  }
  drawExecutionOrder(e) {
    M.prototype.drawExecutionOrder.apply(this, arguments);
  }
  drawNodeWidgets(e, t, s, n) {
    M.prototype.drawNodeWidgets.apply(this, arguments);
  }
  drawGroups(e, t) {
    M.prototype.drawGroups.apply(this, arguments);
  }
};
let N = ue;
N.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
N.node_colors = {
  red: { color: "#322", bgcolor: "#533", groupcolor: "#A88" },
  brown: { color: "#332922", bgcolor: "#593930", groupcolor: "#b06634" },
  green: { color: "#232", bgcolor: "#353", groupcolor: "#8A8" },
  blue: { color: "#223", bgcolor: "#335", groupcolor: "#88A" },
  pale_blue: { color: "#2a363b", bgcolor: "#3f5159", groupcolor: "#3f789e" },
  cyan: { color: "#233", bgcolor: "#355", groupcolor: "#8AA" },
  purple: { color: "#323", bgcolor: "#535", groupcolor: "#a1309b" },
  yellow: { color: "#432", bgcolor: "#653", groupcolor: "#b58b2a" },
  black: { color: "#222", bgcolor: "#000", groupcolor: "#444" }
};
N.DEFAULT_LINK_TYPE_COLORS = {
  [BuiltInSlotType.ACTION]: h.ACTION_LINK_COLOR,
  [BuiltInSlotType.EVENT]: h.EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
};
N.DEFAULT_CONNECTION_COLORS = {
  input_off: "#778",
  input_on: "#7F7",
  // "#BBD"
  output_off: "#778",
  output_on: "#7F7"
  // "#BBD"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE = {
  number: "#7F7",
  string: "#77F",
  boolean: "#F77"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF = {
  number: "#474",
  string: "#447",
  boolean: "#744"
};
N.active_canvas = null;
N.active_node = null;
N.onMenuCollapseAll = k.onMenuCollapseAll;
N.onMenuNodeEdit = k.onMenuNodeEdit;
N.onShowPropertyEditor = k.onShowPropertyEditor;
N.onGroupAdd = k.onGroupAdd;
N.onMenuAdd = k.onMenuAdd;
N.showMenuNodeOptionalInputs = k.showMenuNodeOptionalInputs;
N.showMenuNodeOptionalOutputs = k.showMenuNodeOptionalOutputs;
N.onShowMenuNodeProperties = k.onShowMenuNodeProperties;
N.onResizeNode = k.onResizeNode;
N.onMenuResizeNode = k.onMenuResizeNode;
N.onMenuNodeCollapse = k.onMenuNodeCollapse;
N.onMenuNodePin = k.onMenuNodePin;
N.onMenuNodeMode = k.onMenuNodeMode;
N.onMenuNodeColors = k.onMenuNodeColors;
N.onMenuNodeShapes = k.onMenuNodeShapes;
N.onMenuNodeRemove = k.onMenuNodeRemove;
N.onMenuNodeClone = k.onMenuNodeClone;
N.onMenuNodeToSubgraph = k.onMenuNodeToSubgraph;
N.onMenuNodeToSubgraphInputs = k.onMenuNodeToSubgraphInputs;
N.onMenuNodeToSubgraphOutputs = k.onMenuNodeToSubgraphOutputs;
N.onMenuNodeToParentGraph = k.onMenuNodeToParentGraph;
var W = /* @__PURE__ */ ((e) => (e[e.SEPARATOR = 0] = "SEPARATOR", e))(W || {});
class z {
  static trigger(t, s, n, i) {
    const o = document.createEvent("CustomEvent");
    return o.initCustomEvent(s, !0, !0, n), o.target = i, t.dispatchEvent && t.dispatchEvent(o), o;
  }
  static isCursorOverElement(t, s) {
    const n = t.clientX, i = t.clientY, o = s.getBoundingClientRect();
    return o ? i > o.top && i < o.top + o.height && n > o.left && n < o.left + o.width : !1;
  }
  static closeAllContextMenus(t) {
    t = t || window;
    const s = t.document.querySelectorAll(".litecontextmenu");
    if (!s.length)
      return;
    const n = Array.from(s);
    for (const i of n)
      i.close();
  }
  constructor(t, s = {}, n) {
    this.options = s;
    const i = this;
    s.parentMenu && (s.parentMenu.constructor !== this.constructor ? (console.error(
      "parentMenu must be of class ContextMenu, ignoring it"
    ), s.parentMenu = null) : (this.parentMenu = s.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    let o = null;
    s.event && (o = s.event.constructor.name), o !== "MouseEvent" && o !== "CustomEvent" && o !== "PointerEvent" && (console.error(
      `Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (${o})`
    ), s.event = null);
    const a = document.createElement("div");
    a.className = "litegraph litecontextmenu litemenubar-panel", s.className && (a.className += ` ${s.className}`), a.style.pointerEvents = "none", setTimeout(() => {
      a.style.pointerEvents = "auto";
    }, 100), h.pointerListenerAdd(a, "up", (c) => (c.preventDefault(), !0), !0), a.addEventListener(
      "contextmenu",
      (c) => (c.button != 2 || c.preventDefault(), !1),
      !0
    ), a.close = () => {
      a.parentNode.removeChild(a);
    }, h.pointerListenerAdd(a, "down", (c) => {
      if (c.button == 2)
        return i.close(), c.preventDefault(), !0;
    }, !0);
    function r(c) {
      const p = Number.parseInt(a.style.top);
      return a.style.top = `${(p + c.deltaY * s.scroll_speed).toFixed()}px`, c.preventDefault(), !0;
    }
    if (s.scroll_speed || (s.scroll_speed = 0.1), a.addEventListener("wheel", r, !0), a.addEventListener("mousewheel", r, !0), this.root = a, s.title) {
      const c = document.createElement("div");
      c.className = "litemenu-title", c.innerHTML = s.title, a.appendChild(c);
    }
    this.values = [];
    for (let c = 0; c < t.length; c++) {
      const p = t[c];
      let v = "";
      p === 0 ? v = "" : typeof p == "string" ? v = p : v = p.content, this.addItem(v, p, s);
    }
    h.pointerListenerAdd(a, "enter", (c) => {
      a.closing_timer && clearTimeout(a.closing_timer);
    });
    let l = document;
    s.event && s.event.target instanceof Node && (l = s.event.target.ownerDocument), l || (l = document), l.fullscreenElement ? l.fullscreenElement.appendChild(a) : l.body.appendChild(a);
    let u = s.left || 0, f = s.top || 0;
    if (s.event) {
      if (u = s.event.clientX - 10, f = s.event.clientY - 10, s.title && (f -= 20), s.parentMenu) {
        const v = s.parentMenu.root.getBoundingClientRect();
        u = v.left + v.width;
      }
      const c = document.body.getBoundingClientRect(), p = a.getBoundingClientRect();
      c.height == 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), c.width && u > c.width - p.width - 10 && (u = c.width - p.width - 10), c.height && f > c.height - p.height - 10 && (f = c.height - p.height - 10);
    }
    a.style.left = `${u}px`, a.style.top = `${f}px`, s.scale && (a.style.transform = `scale(${s.scale})`);
  }
  addItem(t, s, n = {}) {
    const i = this, o = document.createElement("div");
    o.className = "litemenu-entry submenu";
    let a = !1;
    typeof s == "string" && (s = { content: s }), s === 0 ? o.classList.add("separator") : (o.innerHTML = s.title ? s.title : t, s.disabled && (a = !0, o.classList.add("disabled")), (s.submenu || s.has_submenu) && o.classList.add("has_submenu"), typeof s == "function" ? o.dataset.value = t : o.dataset.value = `${this.values.length}`, s.className && (o.className += ` ${s.className}`)), this.values.push(s), this.root.appendChild(o), a || o.addEventListener("click", u), n.autoopen && h.pointerListenerAdd(o, "enter", l);
    const r = this;
    function l(f) {
      const c = this.value;
      !c || !c.has_submenu || u.call(this, f);
    }
    function u(f) {
      const c = Number.parseInt(this.dataset.value), p = r.values[c];
      h.debug && console.debug("ContextMenu inner_onclick", c, p);
      const v = N.active_canvas;
      if (!v)
        return;
      const _ = v.adjustMouseEvent(f);
      let g = !0;
      if (i.current_submenu && i.current_submenu.close(_), n.callback) {
        var d = n.callback.call(
          this,
          p,
          n,
          _,
          i,
          n.node
        );
        d === !0 && (g = !1);
      }
      if (p && typeof p == "object") {
        if (p.callback && !n.ignore_item_callbacks && p.disabled !== !0) {
          var d = p.callback.call(
            this,
            p,
            n,
            _,
            i,
            n.extra
          );
          d === !0 && (g = !1);
        }
        if (p.submenu) {
          if (!p.submenu.options)
            throw "ContextMenu submenu needs options";
          new z(p.submenu.options, {
            callback: p.submenu.callback,
            event: _,
            parentMenu: i,
            ignore_item_callbacks: p.submenu.ignore_item_callbacks,
            title: p.submenu.title,
            extra: p.submenu.extra,
            autoopen: n.autoopen
          }), g = !1;
        }
      }
      g && !i.lock && i.close();
    }
    return o;
  }
  close(t, s) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !s && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, t === void 0 ? this.parentMenu.close() : t && !z.isCursorOverElement(t, this.parentMenu.root) && z.trigger(this.parentMenu.root, `${h.pointerevents_method}leave`, t)), this.current_submenu && this.current_submenu.close(t, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
  }
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
}
export {
  Ne as BASE_SLOT_TYPES,
  C as BuiltInSlotShape,
  O as BuiltInSlotType,
  z as ContextMenu,
  W as ContextMenuSpecialItem,
  A as Dir,
  Pe as DragAndScale,
  j as GraphInput,
  K as GraphOutput,
  H as LConnectionKind,
  we as LGraph,
  N as LGraphCanvas,
  he as LGraphCanvas_Events,
  M as LGraphCanvas_Rendering,
  k as LGraphCanvas_UI,
  fe as LGraphGroup,
  oe as LGraphNode,
  xe as LGraphStatus,
  le as LLink,
  ae as LayoutDirection,
  pe as LinkRenderMode,
  ze as LinkRenderModeNames,
  h as LiteGraph,
  ye as NODE_MODE_COLORS,
  ie as NODE_MODE_NAMES,
  X as NodeMode,
  be as SLOT_SHAPE_NAMES,
  te as Subgraph,
  ee as TitleMode,
  _e as clamp,
  V as getLitegraphTypeName,
  Ie as getSlotTypesIn,
  He as getSlotTypesInFormatted,
  ke as getSlotTypesOut,
  Fe as getSlotTypesOutFormatted,
  Te as getStaticProperty,
  ge as getStaticPropertyOnInstance,
  Oe as isValidLitegraphType,
  ve as makeDraggable,
  Se as reassignGraphIDs,
  de as toHashMap
};
