var L = /* @__PURE__ */ ((t) => (t[t.UP = 1] = "UP", t[t.DOWN = 2] = "DOWN", t[t.LEFT = 3] = "LEFT", t[t.RIGHT = 4] = "RIGHT", t[t.CENTER = 5] = "CENTER", t))(L || {}), Y = /* @__PURE__ */ ((t) => (t[t.ALWAYS = 0] = "ALWAYS", t[t.ON_EVENT = 1] = "ON_EVENT", t[t.NEVER = 2] = "NEVER", t[t.ON_TRIGGER = 3] = "ON_TRIGGER", t[t.ON_REQUEST = 4] = "ON_REQUEST", t))(Y || {});
const J = ["Always", "On Event", "Never", "On Trigger"], _t = ["#666", "#422", "#333", "#224", "#626"];
var S = /* @__PURE__ */ ((t) => (t[t.DEFAULT = 0] = "DEFAULT", t[t.BOX_SHAPE = 1] = "BOX_SHAPE", t[t.ROUND_SHAPE = 2] = "ROUND_SHAPE", t[t.CIRCLE_SHAPE = 3] = "CIRCLE_SHAPE", t[t.CARD_SHAPE = 4] = "CARD_SHAPE", t[t.ARROW_SHAPE = 5] = "ARROW_SHAPE", t[t.GRID_SHAPE = 6] = "GRID_SHAPE", t))(S || {});
const gt = ["default", "box", "round", "circle", "card", "arrow", "square"];
var G = /* @__PURE__ */ ((t) => (t[t.INPUT = 0] = "INPUT", t[t.OUTPUT = 1] = "OUTPUT", t))(G || {}), rt = /* @__PURE__ */ ((t) => (t[t.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", t[t.LINEAR_LINK = 1] = "LINEAR_LINK", t[t.SPLINE_LINK = 2] = "SPLINE_LINK", t))(rt || {});
const Ht = ["Straight", "Linear", "Spline"];
var q = /* @__PURE__ */ ((t) => (t[t.NORMAL_TITLE = 0] = "NORMAL_TITLE", t[t.NO_TITLE = 1] = "NO_TITLE", t[t.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", t[t.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", t))(q || {}), O = /* @__PURE__ */ ((t) => (t[t.EVENT = -2] = "EVENT", t[t.ACTION = -1] = "ACTION", t[t.DEFAULT = 0] = "DEFAULT", t))(O || {});
const yt = ["*", "array", "object", "number", "string", "enum", "boolean", "table"];
var st = /* @__PURE__ */ ((t) => (t.VERTICAL_LAYOUT = "vertical", t.HORIZONTAL_LAYOUT = "horizontal", t))(st || {});
function pt(t, e, s) {
  return e > t ? e : s < t ? s : t;
}
function ut(t, e) {
  return t.reduce((s, n) => {
    const i = e(n);
    return s[i] = n, s;
  }, {});
}
function vt(t, e) {
  return e in t ? t[e] : null;
}
function ct(t, e) {
  return e in t.constructor ? t.constructor[e] : null;
}
function Ct(t, e) {
  if (t.target !== e)
    return;
  const s = t.clientX - Number.parseInt(window.getComputedStyle(e).left), n = t.clientY - Number.parseInt(window.getComputedStyle(e).top), i = (l) => {
    if (l.buttons === 0) {
      o();
      return;
    }
    e.style.top = `${l.clientY - n}px`, e.style.left = `${l.clientX - s}px`;
  }, o = () => {
    window.removeEventListener("mousemove", i), window.removeEventListener("mouseup", o);
  };
  window.addEventListener("mousemove", i), window.addEventListener("mouseup", o);
}
function dt(t) {
  return t.addEventListener("mousedown", (e) => Ct(e, t)), t.classList.add("draggable"), t;
}
function W(t) {
  return t === O.EVENT ? "Event" : t === O.ACTION ? "Action" : t === O.DEFAULT ? "Default" : t;
}
function bt(t) {
  return t === O.EVENT || t === O.ACTION || t === O.DEFAULT || typeof t == "string";
}
const A = class {
  /** Register a node class so it can be listed when the user wants to create a new one */
  static registerNodeType(t) {
    A.debug && console.log(`Node registered: ${t.type}`);
    const e = t.name, s = t.type;
    if (!s)
      throw `Config has no type: ${t}`;
    if (A.debug && console.debug(e, s), t.category === null || t.category === "") {
      const i = s.lastIndexOf("/");
      t.category = s.substring(0, i);
    }
    t.title || (t.title = e);
    const n = A.registered_node_types[s];
    if (n && console.warn(`replacing node type: ${s}`), t.supported_extensions)
      for (const i in t.supported_extensions) {
        const o = t.supported_extensions[i];
        o && o.constructor === String && (A.node_types_by_file_extension[o.toLowerCase()] = t);
      }
    t.class.__LITEGRAPH_TYPE__ = s, A.registered_node_types[s] = t, t.class.name && (A.Nodes[e] = t), A.onNodeTypeRegistered && A.onNodeTypeRegistered(s, t), n && A.onNodeTypeReplaced && A.onNodeTypeReplaced(s, t, n);
  }
  /** removes a node type from the system */
  static unregisterNodeType(t) {
    let e;
    if (typeof t == "string" ? e = A.registered_node_types[t] : e = t, !e)
      throw `node type not found: ${t}`;
    delete A.registered_node_types[e.type], e.constructor.name && delete A.Nodes[e.constructor.name];
  }
  /**
   * Save a slot type and his node
   * @method registerSlotType
   * @param {string | object} type name of the node or the node constructor itself
   * @param {string} slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  static registerNodeAndSlotType(t, e, s = !1) {
    let n;
    if (typeof t == "string" ? n = A.registered_node_types[t] : "type" in t ? n = A.registered_node_types[t.type] : n = t, !n)
      throw new Error(`Node not registered!${t}`);
    const i = n.class.__litegraph_type__;
    let o;
    typeof e == "string" ? o = e.split(",") : e === O.EVENT || e === O.ACTION ? o = ["_event_"] : o = ["*"];
    for (let l = 0; l < o.length; ++l) {
      let a = o[l];
      a === "" && (a = "*");
      const r = s ? "registered_slot_out_types" : "registered_slot_in_types";
      typeof this[r][a] > "u" && (this[r][a] = { nodes: [] }), this[r][a].nodes.push(i), a !== "_event_" && a !== "*" && (s ? A.slot_types_out.includes(a.toLowerCase()) || (A.slot_types_out.push(a.toLowerCase()), A.slot_types_out.sort()) : A.slot_types_in.includes(a.toLowerCase()) || (A.slot_types_in.push(a.toLowerCase()), A.slot_types_in.sort()));
    }
  }
  /** Removes all previously registered node's types. */
  static clearRegisteredTypes() {
    A.registered_node_types = {}, A.node_types_by_file_extension = {}, A.Nodes = {}, A.searchbox_extras = {};
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
  //     let params = Array(func.length);
  //     let code = "";
  //     let names = LiteGraph.getParameterNames(func);
  //     for (let i = 0; i < names.length; ++i) {
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
  //     let classobj = Function(code) as any;
  //     classobj.title = name.split("/").pop();
  //     classobj.desc = "Generated from " + func.name;
  //     classobj.prototype.onExecute = function onExecute() {
  //         for (let i = 0; i < params.length; ++i) {
  //             params[i] = this.getInputData(i);
  //         }
  //         let r = func.apply(this, params);
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
  //     for (let i in LiteGraph.registered_node_types) {
  //         let type = LiteGraph.registered_node_types[i];
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
  static createNode(t, e, s = {}) {
    let n = null, i;
    if (typeof t == "string")
      i = t;
    else if (i = t.__LITEGRAPH_TYPE__, !i)
      throw console.error(t), "Node was not registered yet!";
    if (n = A.registered_node_types[i], !n)
      return console.warn(
        `GraphNode type "${t}" not registered.`
      ), null;
    e = e || n.title || i;
    let o = null;
    const l = s.constructorArgs || [];
    if (A.catch_exceptions)
      try {
        o = new n.class(e, ...l);
      } catch (c) {
        return console.error("Error creating node!", c), null;
      }
    else
      o = new n.class(e, ...l);
    if (o.class = n.class, o.type = i, !o.title && e && (o.title = e), o.properties || (o.properties = {}), o.properties_info || (o.properties_info = []), o.flags || (o.flags = {}), o.size || (o.size = o.computeSize()), o.pos || (o.pos = [A.DEFAULT_POSITION[0], A.DEFAULT_POSITION[1]]), o.mode || (o.mode = Y.ALWAYS), s.instanceProps)
      for (const c in s.instanceProps)
        o[c] = s.instanceProps[c];
    const a = vt(n.class, "propertyLayout");
    if (a) {
      A.debug && console.debug("Found property layout!", a);
      for (const c of a) {
        const { name: d, defaultValue: u, type: _, options: m } = c;
        o.addProperty(d, u, _, m);
      }
    }
    const r = vt(n.class, "slotLayout");
    if (r) {
      if (A.debug && console.debug("Found slot layout!", r), r.inputs)
        for (const c of r.inputs) {
          const { name: d, type: u, options: _ } = c;
          o.addInput(d, u, _);
        }
      if (r.outputs)
        for (const c of r.outputs) {
          const { name: d, type: u, options: _ } = c;
          o.addOutput(d, u, _);
        }
    }
    return o.onNodeCreated && o.onNodeCreated(), o;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   */
  static getNodeType(t) {
    return A.registered_node_types[t];
  }
  /**
   * Returns a list of node types matching one category
   * @method getNodeTypesInCategory
   * @param {string} category category name
   * @param {string} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the node classes
   */
  static getNodeTypesInCategory(t, e) {
    const s = [];
    for (const n in A.registered_node_types) {
      const i = A.registered_node_types[n];
      i.filter === e && (t === "" ? i.category === null && s.push(i) : i.category === t && s.push(i));
    }
    return A.auto_sort_node_types && s.sort((n, i) => n.title.localeCompare(i.title)), s;
  }
  /**
   * Returns a list with all the node type categories
   * @method getNodeTypesCategories
   * @param {string} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the names of the categories
   */
  static getNodeTypesCategories(t) {
    const e = { "": 1 };
    for (const n in A.registered_node_types) {
      const i = A.registered_node_types[n];
      if (i.category && !i.hide_in_node_lists) {
        if (i.filter !== t)
          continue;
        e[i.category] = 1;
      }
    }
    const s = [];
    for (const n in e)
      s.push(n);
    return A.auto_sort_node_types ? s.sort() : s;
  }
  /** debug purposes: reloads all the js scripts that matches a wildcard */
  static reloadNodes(t) {
    const e = document.getElementsByTagName("script"), s = [];
    for (let i = 0; i < e.length; i++)
      s.push(e[i]);
    const n = document.getElementsByTagName("head")[0];
    t = document.location.href + t;
    for (let i = 0; i < s.length; i++) {
      const o = s[i].src;
      if (!(!o || o.substr(0, t.length) !== t))
        try {
          A.debug && console.log(`Reloading: ${o}`);
          const l = document.createElement("script");
          l.type = "text/javascript", l.src = o, n.appendChild(l), n.removeChild(s[i]);
        } catch (l) {
          if (A.throw_errors)
            throw l;
          A.debug && console.log(`Error while reloading ${o}`);
        }
    }
    A.debug && console.log("Nodes reloaded");
  }
  // TODO move
  // separated just to improve if it doesn't work
  static cloneObject(t, e) {
    if (t === null)
      return null;
    const s = JSON.parse(JSON.stringify(t));
    if (!e)
      return s;
    for (const n in s)
      e[n] = s[n];
    return e;
  }
  /**
   * Returns if the types of two slots are compatible (taking into account wildcards, etc)
   * @method isValidConnection
   * @param {string} type_a
   * @param {string} type_b
   * @return {boolean} true if they can be connected
   */
  static isValidConnection(t, e) {
    if ((t === "" || t === "*") && (t = O.DEFAULT), (e === "" || e === "*") && (e = O.DEFAULT), !t || !e || t === e || t === O.EVENT && e === O.ACTION || t === O.ACTION && e === O.EVENT)
      return !0;
    if (t = String(t), e = String(e), t = t.toLowerCase(), e = e.toLowerCase(), !t.includes(",") && !e.includes(","))
      return t === e;
    const s = t.split(","), n = e.split(",");
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
  static compareObjects(t, e) {
    for (const s in t)
      if (t[s] !== e[s])
        return !1;
    return !0;
  }
  static distance(t, e) {
    return Math.sqrt(
      (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1])
    );
  }
  static colorToString(t) {
    return `rgba(${Math.round(t[0] * 255).toFixed()},${Math.round(t[1] * 255).toFixed()},${Math.round(t[2] * 255).toFixed()},${t.length === 4 ? t[3].toFixed(2) : "1.0"})`;
  }
  static isInsideRectangle(t, e, s, n, i, o) {
    return s < t && s + i > t && n < e && n + o > e;
  }
  // [minx,miny,maxx,maxy]
  static growBounding(t, e, s) {
    return e < t[0] ? t[0] = e : e > t[2] && (t[2] = e), s < t[1] ? t[1] = s : s > t[3] && (t[3] = s), t;
  }
  static isInsideBounding(t, e) {
    return !(t[0] < e[0][0] || t[1] < e[0][1] || t[0] > e[1][0] || t[1] > e[1][1]);
  }
  // bounding overlap, format: [ startx, starty, width, height ]
  static overlapBounding(t, e) {
    const s = t[0] + t[2], n = t[1] + t[3], i = e[0] + e[2], o = e[1] + e[3];
    return !(t[0] > i || t[1] > o || s < e[0] || n < e[1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  static hex2num(t) {
    t.charAt(0) === "#" && (t = t.slice(1)), t = t.toUpperCase();
    const e = "0123456789ABCDEF";
    let s, n = 0, i, o;
    for (let l = 0; l < 6; l += 2)
      i = e.indexOf(t.charAt(l)), o = e.indexOf(t.charAt(l + 1)), s[n] = i * 16 + o, n++;
    return s;
  }
  // Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex(t) {
    const e = "0123456789ABCDEF";
    let s = "#", n, i;
    for (let o = 0; o < 3; o++)
      n = t[o] / 16, i = t[o] % 16, s += e.charAt(n) + e.charAt(i);
    return s;
  }
  // ContextMenu: typeof ContextMenu;
  // static extendClass<A, B>(target: A, origin: B): A & B;
  // static getParameterNames(func: string | Function): string[];
  /* helper for interaction: pointer, touch, mouse Listeners
       used by LGraphCanvas DragAndScale ContextMenu */
  static pointerListenerAdd(t, e, s, n = !1) {
    if (!t || !t.addEventListener || !e || typeof s != "function")
      return;
    let i = A.pointerevents_method, o = e;
    if (i === "pointer" && !window.PointerEvent)
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
        t.addEventListener(i + o, s, n);
      case "leave":
      case "cancel":
      case "gotpointercapture":
      case "lostpointercapture":
        if (i !== "mouse")
          return t.addEventListener(i + o, s, n);
      default:
        return t.addEventListener(o, s, n);
    }
  }
  static pointerListenerRemove(t, e, s, n = !1) {
    if (!(!t || !t.removeEventListener || !e || typeof s != "function"))
      switch (e) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (A.pointerevents_method === "pointer" || A.pointerevents_method === "mouse") && t.removeEventListener(A.pointerevents_method + e, s, n);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (A.pointerevents_method === "pointer")
            return t.removeEventListener(A.pointerevents_method + e, s, n);
        default:
          return t.removeEventListener(e, s, n);
      }
  }
};
let h = A;
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
class lt {
  processMouseDown(e) {
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const s = e;
    this.adjustMouseEvent(s);
    const n = this.getCanvasWindow();
    n.document, b.active_canvas = this;
    let i = !1;
    const o = s.clientX, l = s.clientY;
    this.ds.viewport = this.viewport;
    const a = !this.viewport || this.viewport && o >= this.viewport[0] && o < this.viewport[0] + this.viewport[2] && l >= this.viewport[1] && l < this.viewport[1] + this.viewport[3];
    if (this.skip_events || (h.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), h.pointerListenerAdd(n.document, "move", this._mousemove_callback, !0), h.pointerListenerAdd(n.document, "up", this._mouseup_callback, !0)), !a)
      return;
    let r = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes, 5), c = !1;
    const d = h.getTime(), u = !(s instanceof PointerEvent) || !s.isPrimary, _ = d - this.last_mouseclick < 300 && u;
    if (this.mouse[0] = s.clientX, this.mouse[1] = s.clientY, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.last_click_position_offset = [this.offset_mouse[0], this.offset_mouse[1]], this.pointer_is_down && u ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), U.closeAllContextMenus(n), this.search_box && this.search_box.close(), !(this.onMouse && this.onMouse(s) === !0)) {
      if (s.which === 1 && !this.pointer_is_double) {
        if (s.ctrlKey && this.allow_interaction && !this.read_only && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = s.canvasX, this.dragging_rectangle[1] = s.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, c = !0), h.alt_drag_do_clone_nodes && s.altKey && r && this.allow_interaction && !c && !this.read_only) {
          const p = r.clone();
          p && (p.pos[0] += 5, p.pos[1] += 5, this.graph.add(p, { doCalcSize: !1 }), r = p, c = !0, i || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = r), this.selected_nodes[r.id] || this.processNodeSelected(r, s)));
        }
        let m = !1;
        if (r && this.allow_interaction && !c && !this.read_only) {
          if (!this.live_mode && !r.flags.pinned && this.bringToFront(r), !this.connecting_node && !r.flags.collapsed && !this.live_mode)
            if (!c && r.resizable !== !1 && h.isInsideRectangle(s.canvasX, s.canvasY, r.pos[0] + r.size[0] - 5, r.pos[1] + r.size[1] - 5, 10, 10))
              this.graph.beforeChange(), this.resizing_node = r, this.canvas.style.cursor = "se-resize", c = !0;
            else {
              if (r.outputs)
                for (let p = 0, f = r.outputs.length; p < f; ++p) {
                  const v = r.outputs[p], y = r.getConnectionPos(!1, p);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    y[0] - 15,
                    y[1] - 10,
                    30,
                    20
                  )) {
                    this.connecting_node = r, this.connecting_output = v, this.connecting_output.slot_index = p, this.connecting_pos = r.getConnectionPos(!1, p), this.connecting_slot = p, h.shift_click_do_break_link_from && s.shiftKey && r.disconnectOutput(p), _ ? r.onOutputDblClick && r.onOutputDblClick(p, s) : r.onOutputClick && r.onOutputClick(p, s), c = !0;
                    break;
                  }
                }
              if (r.inputs)
                for (let p = 0, f = r.inputs.length; p < f; ++p) {
                  const v = r.inputs[p], y = r.getConnectionPos(!0, p);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    y[0] - 15,
                    y[1] - 10,
                    30,
                    20
                  )) {
                    if (_ ? r.onInputDblClick && r.onInputDblClick(p, s) : r.onInputClick && r.onInputClick(p, s), v.link !== null) {
                      const g = this.graph.links[v.link];
                      h.click_do_break_link_to && (r.disconnectInput(p), this.dirty_bgcanvas = !0, c = !0), (this.allow_reconnect_links || s.shiftKey) && (h.click_do_break_link_to || r.disconnectInput(p), this.connecting_node = this.graph._nodes_by_id[g.origin_id], this.connecting_slot = g.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, c = !0);
                    }
                    c || (this.connecting_node = r, this.connecting_input = v, this.connecting_input.slot_index = p, this.connecting_pos = r.getConnectionPos(!0, p), this.connecting_slot = p, this.dirty_bgcanvas = !0, c = !0);
                  }
                }
            }
          if (!c) {
            const p = [s.canvasX - r.pos[0], s.canvasY - r.pos[1]], f = this.processNodeWidgets(r, this.graph_mouse, s);
            f && (i = !0, this.node_widget = [r, f]), _ && this.selected_nodes[r.id] && (r.onDblClick && r.onDblClick(s, p, this), this.processNodeDblClicked(r), i = !0), r.onMouseDown && r.onMouseDown(s, p, this) ? i = !0 : (r.subgraph && !r.skip_subgraph_button && !r.flags.collapsed && p[0] > r.size[0] - h.NODE_TITLE_HEIGHT && p[1] < 0 && setTimeout(() => {
              this.openSubgraph(r.subgraph);
            }, 10), this.live_mode && (m = !0, i = !0)), i || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = r), this.selected_nodes[r.id] || this.processNodeSelected(r, s)), this.dirty_canvas = !0;
          }
        } else if (!c) {
          let p = !1;
          if (r && r.subgraph && !r.skip_subgraph_button) {
            const f = [s.canvasX - r.pos[0], s.canvasY - r.pos[1]];
            !r.flags.collapsed && f[0] > r.size[0] - h.NODE_TITLE_HEIGHT && f[1] < 0 && (p = !0, setTimeout(() => {
              this.openSubgraph(r.subgraph);
            }, 10));
          }
          if (!p) {
            if (this.allow_interaction && !this.read_only) {
              const f = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
              f !== null && (this.showLinkMenu(f, s), this.over_link_center = null);
            }
            this.selected_group = this.graph.getGroupOnPos(s.canvasX, s.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only && this.allow_interaction && (s.ctrlKey && (this.dragging_rectangle = null), h.distance([s.canvasX, s.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]) * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes()), _ && !this.read_only && this.allow_searchbox && this.allow_interaction && (this.showSearchBox(s), s.preventDefault(), s.stopPropagation()), m = !0;
          }
        }
        !c && m && this.allow_dragcanvas && (this.dragging_canvas = !0);
      } else if (s.which === 2) {
        if (h.middle_click_slot_add_default_node && r && this.allow_interaction && !c && !this.read_only && !this.connecting_node && !r.flags.collapsed && !this.live_mode) {
          let m = null, p = null, f = null;
          if (r.outputs)
            for (let v = 0, y = r.outputs.length; v < y; ++v) {
              const g = r.outputs[v], N = r.getConnectionPos(!1, v);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, N[0] - 15, N[1] - 10, 30, 20)) {
                m = g, p = v, f = !0;
                break;
              }
            }
          if (r.inputs)
            for (let v = 0, y = r.inputs.length; v < y; ++v) {
              const g = r.inputs[v], N = r.getConnectionPos(!0, v);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, N[0] - 15, N[1] - 10, 30, 20)) {
                m = g, p = v, f = !1;
                break;
              }
            }
          if (m && p !== !1) {
            const v = 0.5 - (p + 1) / (f ? r.outputs.length : r.inputs.length), y = r.getBounding(), g = [
              f ? y[0] + y[2] : y[0],
              // + node_bounding[0]/this.canvas.width*150
              s.canvasY - 80
              // + node_bounding[0]/this.canvas.width*66 // vertical "derive"
            ];
            this.createDefaultNodeForSlot("AUTO", {
              nodeFrom: f ? r : null,
              slotFrom: f ? p : null,
              nodeTo: f ? null : r,
              slotTo: f ? null : p,
              position: g,
              // ,e: e
              posAdd: [f ? 30 : -30, -v * 130],
              // -alphaPosY*30]
              posSizeFix: [f ? 0 : -1, 0]
              // -alphaPosY*2*/
            });
          }
        }
      } else if ((s.which === 3 || this.pointer_is_double) && this.allow_interaction && !c && !this.read_only) {
        let m = null;
        if (r)
          m = { type: "node", item: r }, Object.keys(this.selected_nodes).length && (this.selected_nodes[r.id] || s.shiftKey || s.ctrlKey || s.metaKey) ? this.selected_nodes[r.id] || this.selectNodes([r], !0) : this.selectNodes([r]);
        else {
          const p = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
          p !== null && (this.over_link_center = null, this.dirty_canvas = !0, m = { type: "link", item: p });
        }
        this.processContextMenu(m, s);
      }
      if (this.selected_group_moving = !1, this.selected_group && !this.selected_group_resizing) {
        const p = (this.selected_group.fontSize || h.DEFAULT_GROUP_FONT_SIZE) * 1.4;
        h.isInsideRectangle(s.canvasX, s.canvasY, this.selected_group.pos[0], this.selected_group.pos[1], this.selected_group.size[0], p) && (this.selected_group_moving = !0);
      }
      return this.last_mouse[0] = s.clientX, this.last_mouse[1] = s.clientY, this.last_mouseclick = h.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!n.document.activeElement || n.document.activeElement.nodeName.toLowerCase() !== "input" && n.document.activeElement.nodeName.toLowerCase() !== "textarea") && s.preventDefault(), s.stopPropagation(), this.onMouseDown && this.onMouseDown(s), !1;
    }
  }
  processMouseMove(e) {
    var l, a;
    const s = e;
    if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    b.active_canvas = this, this.adjustMouseEvent(s);
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
        const r = i[0] / this.ds.scale, c = i[1] / this.ds.scale;
        this.selected_group.move(r, c, s.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
      }
      this.dirty_bgcanvas = !0;
    } else if (this.dragging_canvas)
      this.ds.offset[0] += i[0] / this.ds.scale, this.ds.offset[1] += i[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
    else {
      const r = this.allow_interaction && !this.read_only;
      this.connecting_node && (this.dirty_canvas = !0);
      const c = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes);
      if (r)
        for (let d = 0, u = this.graph._nodes.length; d < u; ++d) {
          const _ = this.graph._nodes[d];
          if (_.mouseOver && c !== _) {
            _.mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this);
            const m = this.node_over;
            this.node_over = null, this.dirty_canvas = !0, m !== this.node_over && ((l = this.onHoverChange) == null || l.call(this, this.node_over, m));
          }
        }
      if (c) {
        if (c.redraw_on_mouse && (this.dirty_canvas = !0), r) {
          if (!c.mouseOver) {
            c.mouseOver = !0;
            const d = this.node_over;
            this.node_over = c, this.dirty_canvas = !0, d !== this.node_over && ((a = this.onHoverChange) == null || a.call(this, this.node_over, d)), c.onMouseEnter && c.onMouseEnter(s, [s.canvasX - c.pos[0], s.canvasY - c.pos[1]], this);
          }
          if (c.onMouseMove && c.onMouseMove(s, [s.canvasX - c.pos[0], s.canvasY - c.pos[1]], this), this.connecting_node) {
            if (this.connecting_output) {
              const d = this._highlight_input || [0, 0];
              if (!this.isOverNodeBox(c, s.canvasX, s.canvasY)) {
                const u = this.isOverNodeInput(c, s.canvasX, s.canvasY, d);
                if (u !== -1 && c.inputs[u]) {
                  const _ = c.inputs[u].type;
                  h.isValidConnection(this.connecting_output.type, _) && (this._highlight_input = d, this._highlight_input_slot = c.inputs[u]);
                } else
                  this._highlight_input = null, this._highlight_input_slot = null;
              }
            } else if (this.connecting_input) {
              const d = this._highlight_output || [0, 0];
              if (!this.isOverNodeBox(c, s.canvasX, s.canvasY)) {
                const u = this.isOverNodeOutput(c, s.canvasX, s.canvasY, d);
                if (u !== -1 && c.outputs[u]) {
                  const _ = c.outputs[u].type;
                  h.isValidConnection(this.connecting_input.type, _) && (this._highlight_output = d);
                } else
                  this._highlight_output = null;
              }
            }
          }
          this.canvas && (h.isInsideRectangle(
            s.canvasX,
            s.canvasY,
            c.pos[0] + c.size[0] - 5,
            c.pos[1] + c.size[1] - 5,
            5,
            5
          ) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
        }
      } else {
        const d = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
        d !== this.over_link_center && (this.over_link_center = d, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
      }
      if (r) {
        if (this.node_capturing_input && this.node_capturing_input !== c && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(s, [s.canvasX - this.node_capturing_input.pos[0], s.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
          for (const d in this.selected_nodes) {
            const u = this.selected_nodes[d];
            u.pos[0] += i[0] / this.ds.scale, u.pos[1] += i[1] / this.ds.scale;
          }
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
        if (this.resizing_node && !this.live_mode) {
          const d = [s.canvasX - this.resizing_node.pos[0], s.canvasY - this.resizing_node.pos[1]], u = this.resizing_node.computeSize();
          d[0] = Math.max(u[0], d[0]), d[1] = Math.max(u[1], d[1]), this.resizing_node.setSize(d), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
      }
    }
    return o && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = o), s.preventDefault(), !1;
  }
  processMouseUp(e) {
    const s = e, n = !(s instanceof PointerEvent) || !s.isPrimary;
    if (!n)
      return !1;
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const o = this.getCanvasWindow().document;
    b.active_canvas = this, this.skip_events || (h.pointerListenerRemove(o, "move", this._mousemove_callback, !0), h.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), h.pointerListenerRemove(o, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(s);
    const l = h.getTime();
    if (s.click_time = l - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), s.which === 1) {
      if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, s), this.node_widget = null, this.selected_group) {
        const r = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), c = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
        this.selected_group.move(r, c, s.ctrlKey), this.selected_group.pos[0] = Math.round(
          this.selected_group.pos[0]
        ), this.selected_group.pos[1] = Math.round(
          this.selected_group.pos[1]
        ), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
      }
      this.selected_group_resizing = !1;
      const a = this.graph.getNodeOnPos(
        s.canvasX,
        s.canvasY,
        this.visible_nodes
      );
      if (this.dragging_rectangle) {
        if (this.graph) {
          const r = this.graph._nodes, c = new Float32Array(4), d = Math.abs(this.dragging_rectangle[2]), u = Math.abs(this.dragging_rectangle[3]), _ = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - d : this.dragging_rectangle[0], m = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - u : this.dragging_rectangle[1];
          if (this.dragging_rectangle[0] = _, this.dragging_rectangle[1] = m, this.dragging_rectangle[2] = d, this.dragging_rectangle[3] = u, !a || d > 10 && u > 10) {
            const p = [];
            for (let f = 0; f < r.length; ++f) {
              const v = r[f];
              v.getBounding(c), h.overlapBounding(
                this.dragging_rectangle,
                c
              ) && p.push(v);
            }
            p.length && this.selectNodes(p, s.shiftKey);
          } else
            this.selectNodes([a], s.shiftKey || s.ctrlKey);
        }
        this.dragging_rectangle = null;
      } else if (this.connecting_node) {
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        const c = (this.connecting_output || this.connecting_input).type;
        if (a) {
          if (this.connecting_output) {
            const d = this.isOverNodeInput(
              a,
              s.canvasX,
              s.canvasY
            );
            d !== -1 ? this.connecting_node.connect(this.connecting_slot, a, d) : this.connecting_node.connectByTypeInput(this.connecting_slot, a, c);
          } else if (this.connecting_input) {
            const d = this.isOverNodeOutput(
              a,
              s.canvasX,
              s.canvasY
            );
            d !== -1 ? a.connect(d, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, a, c);
          }
        } else
          h.release_link_on_empty_shows_menu && (s.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(s, { node_from: this.connecting_node, slotFrom: this.connecting_output, type_filter_in: this.connecting_output.type }) : this.connecting_input && this.showSearchBox(s, { node_to: this.connecting_node, slotFrom: this.connecting_input, type_filter_out: this.connecting_input.type }) : this.connecting_output ? this.showConnectionMenu({ nodeFrom: this.connecting_node, slotFrom: this.connecting_output, e: s }) : this.connecting_input && this.showConnectionMenu({ nodeTo: this.connecting_node, slotTo: this.connecting_input, e: s }));
        this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
      } else if (this.resizing_node)
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;
      else if (this.node_dragged) {
        const r = this.node_dragged;
        r && s.click_time < 300 && r.isShowingTitle(!0) && h.isInsideRectangle(
          s.canvasX,
          s.canvasY,
          r.pos[0],
          r.pos[1] - h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT
        ) && r.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
      } else
        !this.graph.getNodeOnPos(
          s.canvasX,
          s.canvasY,
          this.visible_nodes
        ) && s.click_time < 300 && this.deselectAllNodes(), this.dirty_canvas = !0, this.dragging_canvas = !1, this.node_over && this.node_over.onMouseUp && this.node_over.onMouseUp(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this), this.node_capturing_input && this.node_capturing_input.onMouseUp && this.node_capturing_input.onMouseUp(s, [
          s.canvasX - this.node_capturing_input.pos[0],
          s.canvasY - this.node_capturing_input.pos[1]
        ], this);
    } else
      s.which === 2 ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : s.which === 3 && (this.dirty_canvas = !0, this.dragging_canvas = !1);
    return n && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), s.stopPropagation(), s.preventDefault(), !1;
  }
  processMouseWheel(e) {
    const s = e;
    if (!this.graph || !this.allow_dragcanvas)
      return;
    const n = s.wheelDeltaY !== null ? s.wheelDeltaY : s.detail * -60;
    this.adjustMouseEvent(s);
    const i = s.clientX, o = s.clientY;
    if (!(!this.viewport || this.viewport && i >= this.viewport[0] && i < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3]))
      return;
    let a = this.ds.scale;
    return n > 0 ? a *= 1.1 : n < 0 && (a *= 1 / 1.1), this.ds.changeScale(a, [s.clientX, s.clientY]), this.graph.change(), s.preventDefault(), !1;
  }
}
const K = class {
  /** changes the zoom level of the graph (default is 1), you can pass also a place used to pivot the zoom */
  setZoom(t, e) {
    this.ds.changeScale(t, e), this.maxZoom && this.ds.scale > this.maxZoom ? this.scale = this.maxZoom : this.minZoom && this.ds.scale < this.minZoom && (this.scale = this.minZoom);
  }
  /** brings a node to front (above all other nodes) */
  bringToFront(t) {
    const e = this.graph._nodes.indexOf(t);
    e !== -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.push(t));
  }
  /** sends a node to the back (below all other nodes) */
  sendToBack(t) {
    const e = this.graph._nodes.indexOf(t);
    e !== -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.unshift(t));
  }
  /** checks which nodes are visible (inside the camera area) */
  computeVisibleNodes(t, e = []) {
    const s = e;
    s.length = 0, t = t || this.graph._nodes;
    for (let n = 0, i = t.length; n < i; ++n) {
      const o = t[n];
      this.live_mode && !o.onDrawBackground && !o.onDrawForeground || h.overlapBounding(this.visible_area, o.getBounding(K.temp)) && s.push(o);
    }
    return s;
  }
  /** renders the whole canvas content, by rendering in two separated canvas, one containing the background grid and the connections, and one containing the nodes) */
  draw(t = !1, e = !1) {
    if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0)
      return;
    const s = h.getTime();
    this.render_time = (s - this.last_draw_time) * 1e-3, this.last_draw_time = s, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_bgcanvas || e || this.always_render_background || this.graph && this.graph._last_trigger_time && s - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || t) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame += 1;
  }
  /** draws the front canvas (the one containing all the nodes) */
  drawFrontCanvas() {
    this.dirty_canvas = !1, this.ctx || (this.ctx = this.canvas.getContext("2d"));
    const t = this.ctx;
    if (!t)
      return;
    const e = this.canvas, s = this.viewport || this.dirty_area;
    if (s && (t.save(), t.beginPath(), t.rect(s[0], s[1], s[2], s[3]), t.clip()), this.clear_background && (s ? t.clearRect(s[0], s[1], s[2], s[3]) : t.clearRect(0, 0, e.width, e.height)), this.bgcanvas === this.canvas ? this.drawBackCanvas() : t.drawImage(this.bgcanvas, 0, 0), this.onRender && this.onRender(e, t), this.show_info && this.renderInfo(t, s ? s[0] : 0, s ? s[1] : 0), this.graph) {
      t.save(), this.ds.toCanvasContext(t);
      const n = this.computeVisibleNodes(
        null,
        this.visible_nodes
      );
      for (let i = 0; i < n.length; ++i) {
        const o = n[i];
        t.save(), t.translate(o.pos[0], o.pos[1]), this.drawNode(o, t), t.restore();
      }
      if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(t)), this.connecting_pos !== null) {
        t.lineWidth = this.connections_width;
        let i = null;
        const o = this.connecting_output || this.connecting_input, l = o.type;
        let a = o.dir;
        a === null && (this.connecting_output ? a = this.connecting_node.horizontal ? L.DOWN : L.RIGHT : a = this.connecting_node.horizontal ? L.UP : L.LEFT);
        const r = o.shape;
        switch (l) {
          case O.EVENT:
            i = h.EVENT_LINK_COLOR;
            break;
          default:
            i = h.CONNECTING_LINK_COLOR;
        }
        this.renderLink(
          t,
          this.connecting_pos,
          [this.graph_mouse[0], this.graph_mouse[1]],
          null,
          !1,
          null,
          i,
          a,
          L.CENTER
        ), t.beginPath(), r === S.BOX_SHAPE ? (t.rect(
          this.connecting_pos[0] - 6 + 0.5,
          this.connecting_pos[1] - 5 + 0.5,
          14,
          10
        ), t.fill(), t.beginPath(), t.rect(
          this.graph_mouse[0] - 6 + 0.5,
          this.graph_mouse[1] - 5 + 0.5,
          14,
          10
        )) : r === S.ARROW_SHAPE ? (t.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + 0.5), t.closePath()) : (t.arc(
          this.connecting_pos[0],
          this.connecting_pos[1],
          4,
          0,
          Math.PI * 2
        ), t.fill(), t.beginPath(), t.arc(
          this.graph_mouse[0],
          this.graph_mouse[1],
          4,
          0,
          Math.PI * 2
        )), t.fill(), t.fillStyle = "#ffcc00";
        const c = this._highlight_input_slot.shape;
        this._highlight_input && (t.beginPath(), c === S.ARROW_SHAPE ? (t.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + 0.5), t.closePath()) : t.arc(
          this._highlight_input[0],
          this._highlight_input[1],
          6,
          0,
          Math.PI * 2
        ), t.fill()), this._highlight_output && (t.beginPath(), c === S.ARROW_SHAPE ? (t.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + 0.5), t.closePath()) : t.arc(
          this._highlight_output[0],
          this._highlight_output[1],
          6,
          0,
          Math.PI * 2
        ), t.fill());
      }
      this.dragging_rectangle && (t.strokeStyle = "#FFF", t.strokeRect(
        this.dragging_rectangle[0],
        this.dragging_rectangle[1],
        this.dragging_rectangle[2],
        this.dragging_rectangle[3]
      )), this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(t, this.over_link_center) : this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, null, this), this.onDrawForeground && this.onDrawForeground(t, this.visible_area), t.restore();
    }
    this._graph_stack && this._graph_stack.length && this.render_subgraph_panels && this.drawSubgraphPanel(t), this.onDrawOverlay && this.onDrawOverlay(t), s && t.restore();
  }
  /**
   * draws the panel in the corner that shows subgraph properties
   * @method drawSubgraphPanel
   */
  drawSubgraphPanel(t) {
    const e = this.graph, s = e._subgraph_node;
    if (!s) {
      console.warn("subgraph without subnode");
      return;
    }
    this.drawSubgraphPanelLeft(e, s, t), this.drawSubgraphPanelRight(e, s, t);
  }
  drawSubgraphPanelLeft(t, e, s) {
    const n = e.inputs ? e.inputs.length : 0, i = 200, o = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    if (s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(10, 10, i, (n + 1) * o + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left", s.fillText("Graph Inputs", 20, 34), this.drawButton(i - 20, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let l = 50;
    if (s.font = "14px Arial", e.inputs)
      for (let a = 0; a < e.inputs.length; ++a) {
        const r = e.inputs[a];
        r.not_subgraph_input || (s.fillStyle = "#9C9", s.beginPath(), s.arc(i - 16, l, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(r.name, 30, l + o * 0.75), s.fillStyle = "#777", s.fillText(W(r.type), 130, l + o * 0.75), l += o);
      }
    this.drawButton(20, l + 2, i - 20, o - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(e);
  }
  drawSubgraphPanelRight(t, e, s) {
    const n = e.outputs ? e.outputs.length : 0, i = this.bgcanvas.width, o = 200, l = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(i - o - 10, 10, o, (n + 1) * l + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left";
    const a = "Graph Outputs", r = s.measureText(a).width;
    if (s.fillText(a, i - r - 20, 34), this.drawButton(i - o, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let c = 50;
    if (s.font = "14px Arial", e.outputs)
      for (let d = 0; d < e.outputs.length; ++d) {
        const u = e.outputs[d];
        u.not_subgraph_output || (s.fillStyle = "#9C9", s.beginPath(), s.arc(i - o + 16, c, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(u.name, i - o + 30, c + l * 0.75), s.fillStyle = "#777", s.fillText(W(u.type), i - o + 130, c + l * 0.75), c += l);
      }
    this.drawButton(i - o, c + 2, o - 20, l - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(e);
  }
  // Draws a button into the canvas overlay and computes if it was clicked using the immediate gui paradigm
  drawButton(t, e, s, n, i, o = h.NODE_DEFAULT_COLOR, l = "#555", a = h.NODE_TEXT_COLOR, r = !1) {
    const c = !this.block_click && (r || this.allow_interaction && !this.read_only), d = this.ctx;
    let u = this.offset_mouse;
    const _ = c && h.isInsideRectangle(u[0], u[1], t, e, s, n);
    u = this.last_click_position_offset;
    const m = c && u && this.pointer_is_down && h.isInsideRectangle(u[0], u[1], t, e, s, n);
    d.fillStyle = _ ? l : o, m && (d.fillStyle = "#AAA"), d.beginPath(), d.roundRect(t, e, s, n, [4]), d.fill(), i !== null && i.constructor === String && (d.fillStyle = a, d.textAlign = "center", d.font = `${n * 0.65 | 0}px Arial`, d.fillText(i, t + s * 0.5, e + n * 0.75), d.textAlign = "left");
    const p = m && c;
    return m && this.blockClick(), p;
  }
  /** draws every group area in the background */
  drawGroups(t, e) {
    if (!this.graph)
      return;
    const s = this.graph._groups;
    e.save(), e.globalAlpha = 0.5 * this.editor_alpha;
    for (let n = 0; n < s.length; ++n) {
      const i = s[n];
      if (!h.overlapBounding(this.visible_area, i._bounding))
        continue;
      e.fillStyle = i.color || "#335", e.strokeStyle = i.color || "#335";
      const o = i._pos, l = i._size;
      e.globalAlpha = 0.25 * this.editor_alpha, e.beginPath(), e.rect(o[0] + 0.5, o[1] + 0.5, l[0], l[1]), e.fill(), e.globalAlpha = this.editor_alpha, e.stroke(), e.beginPath(), e.moveTo(o[0] + l[0], o[1] + l[1]), e.lineTo(o[0] + l[0] - 10, o[1] + l[1]), e.lineTo(o[0] + l[0], o[1] + l[1] - 10), e.fill();
      const a = i.font_size || h.DEFAULT_GROUP_FONT_SIZE;
      e.font = `${a}px Arial`, e.textAlign = "left", e.fillText(i.title, o[0] + 4, o[1] + a);
    }
    e.restore();
  }
  /** draws some useful stats in the corner of the canvas */
  renderInfo(t, e = 10, s) {
    s = s || this.canvas.height - 80, t.save(), t.translate(e, s), t.font = "10px Arial", t.fillStyle = "#888", t.textAlign = "left", this.graph ? (t.fillText(`T: ${this.graph.globaltime.toFixed(2)}s`, 5, 13 * 1), t.fillText(`I: ${this.graph.iteration}`, 5, 13 * 2), t.fillText(`N: ${this.graph._nodes.length} [${this.visible_nodes.length}]`, 5, 13 * 3), t.fillText(`V: ${this.graph._version}`, 5, 13 * 4), t.fillText(`FPS:${this.fps.toFixed(2)}`, 5, 13 * 5)) : t.fillText("No graph selected", 5, 13 * 1), t.restore();
  }
  /** draws the back canvas (the one containing the background and the connections) */
  drawBackCanvas() {
    const t = this.bgcanvas;
    (t.width !== this.canvas.width || t.height !== this.canvas.height) && (t.width = this.canvas.width, t.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    const e = this.bgctx, s = this.viewport || [0, 0, e.canvas.width, e.canvas.height];
    if (this.clear_background && e.clearRect(s[0], s[1], s[2], s[3]), this._graph_stack && this._graph_stack.length && this.render_subgraph_stack_header) {
      e.save();
      const o = this._graph_stack[this._graph_stack.length - 1].graph, l = this.graph._subgraph_node;
      e.strokeStyle = l.bgcolor, e.lineWidth = 10, e.strokeRect(1, 1, t.width - 2, t.height - 2), e.lineWidth = 1, e.font = "40px Arial", e.textAlign = "center", e.fillStyle = l.bgcolor || "#AAA";
      let a = "";
      for (let r = 1; r < this._graph_stack.length; ++r)
        a += `${o._subgraph_node.getTitle()} >> `;
      e.fillText(
        a + l.getTitle(),
        t.width * 0.5,
        40
      ), e.restore();
    }
    let n = !1;
    if (this.onRenderBackground && this.onRenderBackground(t, e) && (n = !0), this.viewport || (e.restore(), e.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
      if (e.save(), this.ds.toCanvasContext(e), this.background_image && this.ds.scale > 0.5 && !n) {
        this.zoom_modify_alpha ? e.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : e.globalAlpha = this.editor_alpha, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !1, (!this._bg_img || this._bg_img.name !== this.background_image) && (this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image, this._bg_img.onload = () => {
          this.draw(!0, !0);
        });
        let i = null;
        this._pattern === null && this._bg_img.width > 0 ? (i = e.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = i) : i = this._pattern, i && (e.fillStyle = i, e.fillRect(
          this.visible_area[0],
          this.visible_area[1],
          this.visible_area[2],
          this.visible_area[3]
        ), e.fillStyle = "transparent"), e.globalAlpha = 1, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && !this.live_mode && this.drawGroups(t, e), this.onDrawBackground && this.onDrawBackground(e, this.visible_area), h.debug && (e.fillStyle = "red", e.fillRect(this.visible_area[0] + 10, this.visible_area[1] + 10, this.visible_area[2] - 20, this.visible_area[3] - 20)), this.render_canvas_border && (e.strokeStyle = "#235", e.strokeRect(0, 0, t.width, t.height)), this.render_connections_shadows ? (e.shadowColor = "#000", e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 6) : e.shadowColor = "rgba(0,0,0,0)", !this.live_mode && this.render_connections && this.drawConnections(e), e.shadowColor = "rgba(0,0,0,0)", e.restore();
    }
    this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
  }
  /** draws the given node inside the canvas */
  drawNode(t, e) {
    this.current_node = t;
    const s = t.color || t.constructor.color || h.NODE_DEFAULT_COLOR;
    let n = t.bgcolor || t.constructor.bgcolor || h.NODE_DEFAULT_BGCOLOR;
    t.mouseOver;
    const i = this.ds.scale < 0.6;
    if (this.live_mode) {
      t.flags.collapsed || (e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas));
      return;
    }
    const o = this.editor_alpha;
    if (e.globalAlpha = o, this.render_shadows && !i ? (e.shadowColor = h.DEFAULT_SHADOW_COLOR, e.shadowOffsetX = 2 * this.ds.scale, e.shadowOffsetY = 2 * this.ds.scale, e.shadowBlur = 3 * this.ds.scale) : e.shadowColor = "transparent", t.flags.collapsed && t.onDrawCollapsed && t.onDrawCollapsed(e, this) === !0)
      return;
    const l = t.shape || S.BOX_SHAPE, a = K.temp_vec2;
    K.temp_vec2.set(t.size);
    const r = t.horizontal;
    if (t.flags.collapsed) {
      e.font = this.inner_text_font;
      const p = t.getTitle ? t.getTitle() : t.title;
      p !== null && (t._collapsed_width = Math.min(
        t.size[0],
        e.measureText(p).width + h.NODE_TITLE_HEIGHT * 2
      ), a[0] = t._collapsed_width, a[1] = 0);
    }
    t.clip_area && (e.save(), e.beginPath(), l === S.BOX_SHAPE ? e.rect(0, 0, a[0], a[1]) : l === S.ROUND_SHAPE ? e.roundRect(0, 0, a[0], a[1], [10]) : l === S.CIRCLE_SHAPE && e.arc(
      a[0] * 0.5,
      a[1] * 0.5,
      a[0] * 0.5,
      0,
      Math.PI * 2
    ), e.clip()), t.has_errors && (n = "red"), this.drawNodeShape(
      t,
      e,
      [a[0], a[1]],
      s,
      n,
      t.is_selected,
      t.mouseOver
    ), e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas), e.textAlign = r ? "center" : "left", e.font = this.inner_text_font;
    const c = !i, d = this.connecting_output, u = this.connecting_input;
    e.lineWidth = 1;
    let _ = 0;
    const m = [0, 0];
    if (t.flags.collapsed) {
      if (this.render_collapsed_slots) {
        let p = null, f = null;
        if (t.inputs)
          for (let v = 0; v < t.inputs.length; v++) {
            const y = t.inputs[v];
            if (y.link !== null) {
              p = y;
              break;
            }
          }
        if (t.outputs)
          for (let v = 0; v < t.outputs.length; v++) {
            const y = t.outputs[v];
            !y.links || !y.links.length || (f = y);
          }
        if (p) {
          let v = 0, y = h.NODE_TITLE_HEIGHT * -0.5;
          r && (v = t._collapsed_width * 0.5, y = -h.NODE_TITLE_HEIGHT), e.fillStyle = "#686", e.beginPath(), p.shape === S.BOX_SHAPE ? e.rect(v - 7 + 0.5, y - 4, 14, 8) : p.shape === S.ARROW_SHAPE ? (e.moveTo(v + 8, y), e.lineTo(v + -4, y - 4), e.lineTo(v + -4, y + 4), e.closePath()) : e.arc(v, y, 4, 0, Math.PI * 2), e.fill();
        }
        if (f) {
          let v = t._collapsed_width, y = h.NODE_TITLE_HEIGHT * -0.5;
          r && (v = t._collapsed_width * 0.5, y = 0), e.fillStyle = "#686", e.strokeStyle = "black", e.beginPath(), f.shape === S.BOX_SHAPE ? e.rect(v - 7 + 0.5, y - 4, 14, 8) : f.shape === S.ARROW_SHAPE ? (e.moveTo(v + 6, y), e.lineTo(v - 6, y - 4), e.lineTo(v - 6, y + 4), e.closePath()) : e.arc(v, y, 4, 0, Math.PI * 2), e.fill();
        }
      }
    } else {
      if (t.inputs)
        for (let p = 0; p < t.inputs.length; p++) {
          const f = t.inputs[p], v = f.type, y = f.shape;
          e.globalAlpha = o, this.connecting_output && !h.isValidConnection(f.type, d.type) ? e.globalAlpha = 0.4 * o : e.globalAlpha = o, e.fillStyle = f.link !== null ? f.color_on || b.DEFAULT_CONNECTION_COLORS_BY_TYPE[v] || b.DEFAULT_CONNECTION_COLORS.input_on : f.color_off || b.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[v] || b.DEFAULT_CONNECTION_COLORS_BY_TYPE[v] || b.DEFAULT_CONNECTION_COLORS.input_off;
          const g = t.getConnectionPos(!0, p, [m[0], m[1]]);
          if (g[0] -= t.pos[0], g[1] -= t.pos[1], _ < g[1] + h.NODE_SLOT_HEIGHT * 0.5 && (_ = g[1] + h.NODE_SLOT_HEIGHT * 0.5), e.beginPath(), f.shape === S.BOX_SHAPE ? r ? e.rect(
            g[0] - 5 + 0.5,
            g[1] - 8 + 0.5,
            10,
            14
          ) : e.rect(
            g[0] - 6 + 0.5,
            g[1] - 5 + 0.5,
            14,
            10
          ) : y === S.ARROW_SHAPE ? (e.moveTo(g[0] + 8, g[1] + 0.5), e.lineTo(g[0] - 4, g[1] + 6 + 0.5), e.lineTo(g[0] - 4, g[1] - 6 + 0.5), e.closePath()) : y === S.GRID_SHAPE ? (e.rect(g[0] - 4, g[1] - 4, 2, 2), e.rect(g[0] - 1, g[1] - 4, 2, 2), e.rect(g[0] + 2, g[1] - 4, 2, 2), e.rect(g[0] - 4, g[1] - 1, 2, 2), e.rect(g[0] - 1, g[1] - 1, 2, 2), e.rect(g[0] + 2, g[1] - 1, 2, 2), e.rect(g[0] - 4, g[1] + 2, 2, 2), e.rect(g[0] - 1, g[1] + 2, 2, 2), e.rect(g[0] + 2, g[1] + 2, 2, 2)) : i ? e.rect(g[0] - 4, g[1] - 4, 8, 8) : e.arc(g[0], g[1], 4, 0, Math.PI * 2), e.fill(), c) {
            const N = f.label !== null ? f.label : f.name;
            N && (e.fillStyle = h.NODE_TEXT_COLOR, r || f.dir === L.UP ? e.fillText(N, g[0], g[1] - 10) : e.fillText(N, g[0] + 10, g[1] + 5));
          }
        }
      if (e.textAlign = r ? "center" : "right", e.strokeStyle = "black", t.outputs)
        for (let p = 0; p < t.outputs.length; p++) {
          const f = t.outputs[p], v = f.type, y = f.shape;
          this.connecting_input && !h.isValidConnection(u.type, v) ? e.globalAlpha = 0.4 * o : e.globalAlpha = o;
          const g = t.getConnectionPos(!1, p, m);
          g[0] -= t.pos[0], g[1] -= t.pos[1], _ < g[1] + h.NODE_SLOT_HEIGHT * 0.5 && (_ = g[1] + h.NODE_SLOT_HEIGHT * 0.5), e.fillStyle = f.links && f.links.length ? f.color_on || b.DEFAULT_CONNECTION_COLORS_BY_TYPE[v] || b.DEFAULT_CONNECTION_COLORS.output_on : f.color_off || b.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[v] || b.DEFAULT_CONNECTION_COLORS_BY_TYPE[v] || b.DEFAULT_CONNECTION_COLORS.output_off, e.beginPath();
          let N = !0;
          if (y === S.BOX_SHAPE ? r ? e.rect(
            g[0] - 5 + 0.5,
            g[1] - 8 + 0.5,
            10,
            14
          ) : e.rect(
            g[0] - 6 + 0.5,
            g[1] - 5 + 0.5,
            14,
            10
          ) : y === S.ARROW_SHAPE ? (e.moveTo(g[0] + 8, g[1] + 0.5), e.lineTo(g[0] - 4, g[1] + 6 + 0.5), e.lineTo(g[0] - 4, g[1] - 6 + 0.5), e.closePath()) : y === S.GRID_SHAPE ? (e.rect(g[0] - 4, g[1] - 4, 2, 2), e.rect(g[0] - 1, g[1] - 4, 2, 2), e.rect(g[0] + 2, g[1] - 4, 2, 2), e.rect(g[0] - 4, g[1] - 1, 2, 2), e.rect(g[0] - 1, g[1] - 1, 2, 2), e.rect(g[0] + 2, g[1] - 1, 2, 2), e.rect(g[0] - 4, g[1] + 2, 2, 2), e.rect(g[0] - 1, g[1] + 2, 2, 2), e.rect(g[0] + 2, g[1] + 2, 2, 2), N = !1) : i ? e.rect(g[0] - 4, g[1] - 4, 8, 8) : e.arc(g[0], g[1], 4, 0, Math.PI * 2), e.fill(), !i && N && e.stroke(), c) {
            const E = f.label !== null ? f.label : f.name;
            E && (e.fillStyle = h.NODE_TEXT_COLOR, r || f.dir === L.DOWN ? e.fillText(E, g[0], g[1] - 8) : e.fillText(E, g[0] - 10, g[1] + 5));
          }
        }
      if (e.textAlign = "left", e.globalAlpha = 1, t.widgets) {
        let p = _;
        (r || t.widgets_up) && (p = 2), t.widgets_start_y !== null && (p = t.widgets_start_y), this.drawNodeWidgets(
          t,
          p,
          e,
          this.node_widget && this.node_widget[0] === t ? this.node_widget[1] : null
        );
      }
    }
    t.clip_area && e.restore(), e.globalAlpha = 1;
  }
  /** used by this.over_link_center */
  drawLinkTooltip(t, e) {
    const s = e._pos;
    if (this.allow_interaction && !this.read_only && (t.fillStyle = "black", t.beginPath(), t.arc(s[0], s[1], 3, 0, Math.PI * 2), t.fill()), e.data === null || this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, e, this) === !0)
      return;
    const n = e.data;
    let i = null;
    if (n.constructor === Number ? i = n.toFixed(2) : n.constructor === String ? i = `"${n}"` : n.constructor === Boolean ? i = String(n) : n.toToolTip ? i = n.toToolTip() : i = `[${n.constructor.name}]`, i === null)
      return;
    i = i.substr(0, 30), t.font = "14px Courier New";
    const l = t.measureText(i).width + 20, a = 24;
    t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(s[0] - l * 0.5, s[1] - 15 - a, l, a, [3]), t.moveTo(s[0] - 10, s[1] - 15), t.lineTo(s[0] + 10, s[1] - 15), t.lineTo(s[0], s[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(i, s[0], s[1] - 15 - a * 0.3);
  }
  /** draws the shape of the given node in the canvas */
  drawNodeShape(t, e, s, n, i, o, l) {
    e.strokeStyle = n, e.fillStyle = i;
    const a = h.NODE_TITLE_HEIGHT, r = this.ds.scale < 0.5, c = t.shape || t.constructor.shape || S.ROUND_SHAPE, d = t.titleMode, u = t.isShowingTitle(l), _ = K.tmp_area;
    _[0] = 0, _[1] = u ? -a : 0, _[2] = s[0] + 1, _[3] = u ? s[1] + a : s[1];
    const m = e.globalAlpha;
    if (e.beginPath(), c === S.BOX_SHAPE || r ? e.fillRect(_[0], _[1], _[2], _[3]) : c === S.ROUND_SHAPE || c === S.CARD_SHAPE ? e.roundRect(
      _[0],
      _[1],
      _[2],
      _[3],
      c === S.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]
    ) : c === S.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5,
      0,
      Math.PI * 2
    ), e.fill(), !t.flags.collapsed && u && (e.shadowColor = "transparent", e.fillStyle = "rgba(0,0,0,0.2)", e.fillRect(0, -1, _[2], 2)), e.shadowColor = "transparent", t.onDrawBackground && t.onDrawBackground(e, this, this.canvas, this.graph_mouse), u || d === q.TRANSPARENT_TITLE) {
      if (t.onDrawTitleBar)
        t.onDrawTitleBar(e, this, a, s, this.ds.scale, n);
      else if (d !== q.TRANSPARENT_TITLE && (t.constructor.title_color || this.render_title_colored)) {
        const v = t.constructor.title_color || n;
        if (t.flags.collapsed && (e.shadowColor = h.DEFAULT_SHADOW_COLOR), this.use_gradients) {
          let y = b.gradients[v];
          y || (y = b.gradients[v] = e.createLinearGradient(0, 0, 400, 0), y.addColorStop(0, v), y.addColorStop(1, "#000")), e.fillStyle = y;
        } else
          e.fillStyle = v;
        e.beginPath(), c === S.BOX_SHAPE || r ? e.rect(0, -a, s[0] + 1, a) : (c === S.ROUND_SHAPE || c === S.CARD_SHAPE) && e.roundRect(
          0,
          -a,
          s[0] + 1,
          a,
          t.flags.collapsed ? [this.round_radius] : [this.round_radius, this.round_radius, 0, 0]
        ), e.fill(), e.shadowColor = "transparent";
      }
      let p = null;
      h.node_box_coloured_by_mode && _t[t.mode] && (p = _t[t.mode]), h.node_box_coloured_when_on && (p = t.action_triggered ? "#FFF" : t.execute_triggered ? "#AAA" : p);
      const f = 10;
      if (t.onDrawTitleBox ? t.onDrawTitleBox(e, this, a, s, this.ds.scale) : c === S.ROUND_SHAPE || c === S.CIRCLE_SHAPE || c === S.CARD_SHAPE ? (r && (e.fillStyle = "black", e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        f * 0.5 + 1,
        0,
        Math.PI * 2
      ), e.fill()), e.fillStyle = t.boxcolor || p || h.NODE_DEFAULT_BOXCOLOR, r ? e.fillRect(a * 0.5 - f * 0.5, a * -0.5 - f * 0.5, f, f) : (e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        f * 0.5,
        0,
        Math.PI * 2
      ), e.fill())) : (r && (e.fillStyle = "black", e.fillRect(
        (a - f) * 0.5 - 1,
        (a + f) * -0.5 - 1,
        f + 2,
        f + 2
      )), e.fillStyle = t.boxcolor || p || h.NODE_DEFAULT_BOXCOLOR, e.fillRect(
        (a - f) * 0.5,
        (a + f) * -0.5,
        f,
        f
      )), e.globalAlpha = m, t.onDrawTitleText && t.onDrawTitleText(
        e,
        this,
        a,
        s,
        this.ds.scale,
        this.title_text_font,
        o
      ), !r) {
        e.font = this.title_text_font;
        const v = String(t.getTitle());
        v && (o ? e.fillStyle = h.NODE_SELECTED_TITLE_COLOR : e.fillStyle = t.constructor.title_text_color || this.node_title_color, t.flags.collapsed ? (e.textAlign = "left", e.fillText(
          v.substr(0, 20),
          // avoid urls too long
          a,
          // + measure.width * 0.5,
          h.NODE_TITLE_TEXT_Y - a
        ), e.textAlign = "left") : (e.textAlign = "left", e.fillText(
          v,
          a,
          h.NODE_TITLE_TEXT_Y - a
        )));
      }
      if (!t.flags.collapsed && t.subgraph && !t.skip_subgraph_button) {
        const v = h.NODE_TITLE_HEIGHT, y = t.size[0] - v, g = h.isInsideRectangle(this.graph_mouse[0] - t.pos[0], this.graph_mouse[1] - t.pos[1], y + 2, -v + 2, v - 4, v - 4);
        e.fillStyle = g ? "#888" : "#555", c === S.BOX_SHAPE || r ? e.fillRect(y + 2, -v + 2, v - 4, v - 4) : (e.beginPath(), e.roundRect(y + 2, -v + 2, v - 4, v - 4, [4]), e.fill()), e.fillStyle = "#333", e.beginPath(), e.moveTo(y + v * 0.2, -v * 0.6), e.lineTo(y + v * 0.8, -v * 0.6), e.lineTo(y + v * 0.5, -v * 0.3), e.fill();
      }
      t.onDrawTitle && t.onDrawTitle(e, this);
    }
    o && (t.onBounding && t.onBounding(_), d === q.TRANSPARENT_TITLE && (_[1] -= a, _[3] += a), e.lineWidth = 1, e.globalAlpha = 0.8, e.beginPath(), c === S.BOX_SHAPE ? e.rect(
      -6 + _[0],
      -6 + _[1],
      12 + _[2],
      12 + _[3]
    ) : c === S.ROUND_SHAPE || c === S.CARD_SHAPE && t.flags.collapsed ? e.roundRect(
      -6 + _[0],
      -6 + _[1],
      12 + _[2],
      12 + _[3],
      [this.round_radius * 2]
    ) : c === S.CARD_SHAPE ? e.roundRect(
      -6 + _[0],
      -6 + _[1],
      12 + _[2],
      12 + _[3],
      [this.round_radius * 2, 2, this.round_radius * 2, 2]
    ) : c === S.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5 + 6,
      0,
      Math.PI * 2
    ), e.strokeStyle = h.NODE_BOX_OUTLINE_COLOR, e.stroke(), e.strokeStyle = n, e.globalAlpha = 1), t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered > 0 && t.action_triggered--;
  }
  /** draws every connection visible in the canvas */
  drawConnections(t) {
    const e = h.getTime(), s = this.visible_area, n = K.margin_area;
    n[0] = s[0] - 20, n[1] = s[1] - 20, n[2] = s[2] + 40, n[3] = s[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;
    const i = this.graph._nodes;
    for (let o = 0, l = i.length; o < l; ++o) {
      const a = i[o];
      if (!(!a.inputs || !a.inputs.length))
        for (let r = 0; r < a.inputs.length; ++r) {
          const c = a.inputs[r];
          if (!c || c.link === null)
            continue;
          const d = c.link, u = this.graph.links[d];
          if (!u)
            continue;
          const _ = this.graph.getNodeById(u.origin_id);
          if (_ === null)
            continue;
          const m = u.origin_slot;
          let p = null;
          m === -1 ? p = [
            _.pos[0] + 10,
            _.pos[1] + 10
          ] : p = _.getConnectionPos(
            !1,
            m,
            K.tempA
          );
          const f = a.getConnectionPos(!0, r, K.tempB), v = K.link_bounding;
          if (v[0] = p[0], v[1] = p[1], v[2] = f[0] - p[0], v[3] = f[1] - p[1], v[2] < 0 && (v[0] += v[2], v[2] = Math.abs(v[2])), v[3] < 0 && (v[1] += v[3], v[3] = Math.abs(v[3])), !h.overlapBounding(v, n))
            continue;
          const y = _.outputs[m], g = a.inputs[r];
          if (!y || !g)
            continue;
          const N = y.dir || (_.horizontal ? L.DOWN : L.RIGHT), E = g.dir || (a.horizontal ? L.UP : L.LEFT);
          if (this.renderLink(
            t,
            p,
            f,
            u,
            !1,
            !1,
            null,
            N,
            E
          ), u && u._last_time && e - u._last_time < 1e3) {
            const T = 2 - (e - u._last_time) * 2e-3, M = t.globalAlpha;
            t.globalAlpha = M * T, this.renderLink(
              t,
              p,
              f,
              u,
              !0,
              !0,
              "white",
              N,
              E
            ), t.globalAlpha = M;
          }
        }
    }
    t.globalAlpha = 1;
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
  renderLink(t, e, s, n, i, o, l, a, r, c) {
    n && this.visible_links.push(n), !l && n && (l = n.color || this.link_type_colors[n.type]), l || (l = this.default_link_color), n !== null && this.highlighted_links[n.id] && (l = "#FFF"), a = a || L.RIGHT, r = r || L.LEFT;
    const d = h.distance(e, s);
    this.render_connections_border && this.ds.scale > 0.6 && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", c = c || 1, c > 1 && (t.lineWidth = 0.5), t.beginPath();
    for (let _ = 0; _ < c; _ += 1) {
      const m = (_ - (c - 1) * 0.5) * 5;
      if (this.links_render_mode === rt.SPLINE_LINK) {
        t.moveTo(e[0], e[1] + m);
        let p = 0, f = 0, v = 0, y = 0;
        switch (a) {
          case L.LEFT:
            p = d * -0.25;
            break;
          case L.RIGHT:
            p = d * 0.25;
            break;
          case L.UP:
            f = d * -0.25;
            break;
          case L.DOWN:
            f = d * 0.25;
            break;
        }
        switch (r) {
          case L.LEFT:
            v = d * -0.25;
            break;
          case L.RIGHT:
            v = d * 0.25;
            break;
          case L.UP:
            y = d * -0.25;
            break;
          case L.DOWN:
            y = d * 0.25;
            break;
        }
        t.bezierCurveTo(
          e[0] + p,
          e[1] + f + m,
          s[0] + v,
          s[1] + y + m,
          s[0],
          s[1] + m
        );
      } else if (this.links_render_mode === rt.LINEAR_LINK) {
        t.moveTo(e[0], e[1] + m);
        let p = 0, f = 0, v = 0, y = 0;
        switch (a) {
          case L.LEFT:
            p = -1;
            break;
          case L.RIGHT:
            p = 1;
            break;
          case L.UP:
            f = -1;
            break;
          case L.DOWN:
            f = 1;
            break;
        }
        switch (r) {
          case L.LEFT:
            v = -1;
            break;
          case L.RIGHT:
            v = 1;
            break;
          case L.UP:
            y = -1;
            break;
          case L.DOWN:
            y = 1;
            break;
        }
        const g = 15;
        t.lineTo(
          e[0] + p * g,
          e[1] + f * g + m
        ), t.lineTo(
          s[0] + v * g,
          s[1] + y * g + m
        ), t.lineTo(s[0], s[1] + m);
      } else if (this.links_render_mode === rt.STRAIGHT_LINK) {
        t.moveTo(e[0], e[1]);
        let p = e[0], f = e[1], v = s[0], y = s[1];
        a === L.RIGHT ? p += 10 : f += 10, r === L.LEFT ? v -= 10 : y -= 10, t.lineTo(p, f), t.lineTo((p + v) * 0.5, f), t.lineTo((p + v) * 0.5, y), t.lineTo(v, y), t.lineTo(s[0], s[1]);
      } else
        return;
    }
    this.render_connections_border && this.ds.scale > 0.6 && !i && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke()), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = l, t.stroke();
    const u = this.computeConnectionPoint(e, s, 0.5, a, r);
    if (n && n._pos && (n._pos[0] = u[0], n._pos[1] = u[1]), this.ds.scale >= 0.6 && this.highquality_render && r !== L.CENTER) {
      if (this.render_connection_arrows) {
        const _ = this.computeConnectionPoint(
          e,
          s,
          0.25,
          a,
          r
        ), m = this.computeConnectionPoint(
          e,
          s,
          0.26,
          a,
          r
        ), p = this.computeConnectionPoint(
          e,
          s,
          0.75,
          a,
          r
        ), f = this.computeConnectionPoint(
          e,
          s,
          0.76,
          a,
          r
        );
        let v = 0, y = 0;
        this.render_curved_connections ? (v = -Math.atan2(m[0] - _[0], m[1] - _[1]), y = -Math.atan2(f[0] - p[0], f[1] - p[1])) : y = v = s[1] > e[1] ? 0 : Math.PI, t.save(), t.translate(_[0], _[1]), t.rotate(v), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore(), t.save(), t.translate(p[0], p[1]), t.rotate(y), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore();
      }
      t.beginPath(), t.arc(u[0], u[1], 5, 0, Math.PI * 2), t.fill();
    }
    if (o) {
      t.fillStyle = l;
      for (let _ = 0; _ < 5; ++_) {
        const m = (h.getTime() * 1e-3 + _ * 0.2) % 1, p = this.computeConnectionPoint(
          e,
          s,
          m,
          a,
          r
        );
        t.beginPath(), t.arc(p[0], p[1], 5, 0, 2 * Math.PI), t.fill();
      }
    }
  }
  computeConnectionPoint(t, e, s, n = L.RIGHT, i = L.LEFT) {
    const o = h.distance(t, e), l = t, a = [t[0], t[1]], r = [e[0], e[1]], c = e;
    switch (n) {
      case L.LEFT:
        a[0] += o * -0.25;
        break;
      case L.RIGHT:
        a[0] += o * 0.25;
        break;
      case L.UP:
        a[1] += o * -0.25;
        break;
      case L.DOWN:
        a[1] += o * 0.25;
        break;
    }
    switch (i) {
      case L.LEFT:
        r[0] += o * -0.25;
        break;
      case L.RIGHT:
        r[0] += o * 0.25;
        break;
      case L.UP:
        r[1] += o * -0.25;
        break;
      case L.DOWN:
        r[1] += o * 0.25;
        break;
    }
    const d = (1 - s) * (1 - s) * (1 - s), u = 3 * ((1 - s) * (1 - s)) * s, _ = 3 * (1 - s) * (s * s), m = s * s * s, p = d * l[0] + u * a[0] + _ * r[0] + m * c[0], f = d * l[1] + u * a[1] + _ * r[1] + m * c[1];
    return [p, f];
  }
  drawExecutionOrder(t) {
    t.shadowColor = "transparent", t.globalAlpha = 0.25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = 0.75;
    const e = this.visible_nodes;
    for (let s = 0; s < e.length; ++s) {
      const n = e[s];
      t.fillStyle = "black", t.fillRect(
        n.pos[0] - h.NODE_TITLE_HEIGHT,
        n.pos[1] - h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), n.order === 0 && t.strokeRect(
        n.pos[0] - h.NODE_TITLE_HEIGHT + 0.5,
        n.pos[1] - h.NODE_TITLE_HEIGHT + 0.5,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), t.fillStyle = "#FFF", t.fillText(
        `${n.order}`,
        n.pos[0] + h.NODE_TITLE_HEIGHT * -0.5,
        n.pos[1] - 6
      );
    }
    t.globalAlpha = 1;
  }
  /** draws the widgets stored inside a node */
  drawNodeWidgets(t, e, s, n) {
    if (!t.widgets || !t.widgets.length)
      return;
    const i = t.size[0], o = t.widgets;
    e += 2;
    const l = h.NODE_WIDGET_HEIGHT, a = this.ds.scale > 0.5;
    s.save(), s.globalAlpha = this.editor_alpha;
    const r = h.WIDGET_OUTLINE_COLOR, c = h.WIDGET_BGCOLOR, d = h.WIDGET_TEXT_COLOR, u = h.WIDGET_SECONDARY_TEXT_COLOR, _ = 15;
    for (let m = 0; m < o.length; ++m) {
      const p = o[m];
      if (p.hidden)
        continue;
      let f = e;
      p.y && (f = p.y), p.last_y = f, s.strokeStyle = r, s.fillStyle = "#222", s.textAlign = "left", p.disabled && (s.globalAlpha *= 0.5);
      const v = p.width || i;
      switch (p.type) {
        case "button":
          p.clicked && (s.fillStyle = "#AAA", p.clicked = !1, this.dirty_canvas = !0), s.fillRect(_, f, v - _ * 2, l), a && !p.disabled && !h.ignore_all_widget_events && s.strokeRect(_, f, v - _ * 2, l), a && (s.textAlign = "center", s.fillStyle = d, s.fillText(p.name, v * 0.5, f + l * 0.7));
          break;
        case "toggle":
          s.textAlign = "left", s.strokeStyle = r, s.fillStyle = c, s.beginPath(), a ? s.roundRect(_, f, v - _ * 2, l, [l * 0.5]) : s.rect(_, f, v - _ * 2, l), s.fill(), a && !p.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = p.value ? "#89A" : "#333", s.beginPath(), s.arc(v - _ * 2, f + l * 0.5, l * 0.36, 0, Math.PI * 2), s.fill(), a && (s.fillStyle = u, p.name !== null && s.fillText(p.name, _ * 2, f + l * 0.7), s.fillStyle = p.value ? d : u, s.textAlign = "right", s.fillText(
            p.value ? p.options.on || "true" : p.options.off || "false",
            v - 40,
            f + l * 0.7
          ));
          break;
        case "slider":
          s.fillStyle = c, s.fillRect(_, f, v - _ * 2, l);
          const y = p.options.max - p.options.min, g = (p.value - p.options.min) / y;
          if (s.fillStyle = n === p ? "#89A" : "#678", s.fillRect(_, f, g * (v - _ * 2), l), a && !p.disabled && s.strokeRect(_, f, v - _ * 2, l), p.marker) {
            const N = (+p.marker - p.options.min) / y;
            s.fillStyle = "#AA9", s.fillRect(_ + N * (v - _ * 2), f, 2, l);
          }
          a && (s.textAlign = "center", s.fillStyle = d, s.fillText(
            `${p.name}  ${Number(p.value).toFixed(3)}`,
            v * 0.5,
            f + l * 0.7
          ));
          break;
        case "number":
        case "combo":
          if (s.textAlign = "left", s.strokeStyle = r, s.fillStyle = c, s.beginPath(), a ? s.roundRect(_, f, v - _ * 2, l, [l * 0.5]) : s.rect(_, f, v - _ * 2, l), s.fill(), a)
            if (!p.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = d, !p.disabled && !h.ignore_all_widget_events && (s.beginPath(), s.moveTo(_ + 16, f + 5), s.lineTo(_ + 6, f + l * 0.5), s.lineTo(_ + 16, f + l - 5), s.fill(), s.beginPath(), s.moveTo(v - _ - 16, f + 5), s.lineTo(v - _ - 6, f + l * 0.5), s.lineTo(v - _ - 16, f + l - 5), s.fill()), s.fillStyle = u, s.fillText(p.name, _ * 2 + 5, f + l * 0.7), s.fillStyle = d, s.textAlign = "right", p.type === "number")
              s.fillText(
                Number(p.value).toFixed(
                  p.options.precision !== void 0 ? p.options.precision : 3
                ),
                v - _ * 2 - 20,
                f + l * 0.7
              );
            else {
              let N = p.value;
              if (p.options.values) {
                let E = p.options.values;
                E.constructor === Function && (E = E()), E && E.constructor !== Array && (N = E[p.value]);
              }
              s.fillText(
                N,
                v - _ * 2 - 20,
                f + l * 0.7
              );
            }
          break;
        case "string":
        case "text":
          s.textAlign = "left", s.strokeStyle = r, s.fillStyle = c, s.beginPath(), a ? s.roundRect(_, f, v - _ * 2, l, [l * 0.5]) : s.rect(_, f, v - _ * 2, l), s.fill(), a && (p.disabled || s.stroke(), s.save(), s.beginPath(), s.rect(_, f, v - _ * 2, l), s.clip(), s.fillStyle = u, p.name !== null && s.fillText(p.name, _ * 2, f + l * 0.7), s.fillStyle = d, s.textAlign = "right", s.fillText(String(p.value).substr(0, p.options.max_length || 30), v - _ * 2, f + l * 0.7), s.restore());
          break;
        default:
          p.draw && p.draw(s, t, v, f, l);
          break;
      }
      e += (p.computeSize ? p.computeSize(v)[1] : l) + 4, s.globalAlpha = this.editor_alpha;
    }
    s.restore(), s.textAlign = "left";
  }
};
let P = K;
P.temp = new Float32Array(4);
P.temp_vec2 = new Float32Array(2);
P.tmp_area = new Float32Array(4);
P.margin_area = new Float32Array(4);
P.link_bounding = new Float32Array(4);
P.tempA = [0, 0];
P.tempB = [0, 0];
class ht {
  constructor(e = "Group") {
    this.fontSize = h.DEFAULT_GROUP_FONT_SIZE, this._nodes = [], this.graph = null, this._bounding = new Float32Array([10, 10, 140, 80]), this.title = e, this.color = b.node_colors.pale_blue ? b.node_colors.pale_blue.groupcolor : "#AAA", this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4);
  }
  get bounding() {
    return this._bounding;
  }
  get pos() {
    return [this._pos[0], this._pos[1]];
  }
  set pos(e) {
    !e || e.length < 2 || (this._pos[0] = e[0], this._pos[1] = e[1]);
  }
  get size() {
    return [this._size[0], this._size[1]];
  }
  set size(e) {
    !e || e.length < 2 || (this._size[0] = Math.max(140, e[0]), this._size[1] = Math.max(80, e[1]));
  }
  configure(e) {
    this.title = e.title, this._bounding.set(e.bounding), this.color = e.color, this.font = e.font;
  }
  serialize() {
    const e = this._bounding;
    return {
      title: this.title,
      bounding: [
        Math.round(e[0]),
        Math.round(e[1]),
        Math.round(e[2]),
        Math.round(e[3])
      ],
      color: this.color,
      font: this.font
    };
  }
  move(e, s, n) {
    if (this._pos[0] += e, this._pos[1] += s, !n)
      for (let i = 0; i < this._nodes.length; ++i) {
        const o = this._nodes[i];
        o.pos[0] += e, o.pos[1] += s;
      }
  }
  recomputeInsideNodes() {
    this._nodes.length = 0;
    const e = this.graph._nodes, s = new Float32Array(4);
    for (let n = 0; n < e.length; ++n) {
      const i = e[n];
      i.getBounding(s), h.overlapBounding(this._bounding, s) && this._nodes.push(i);
    }
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(e, s, n = 0, i = !1) {
    let o = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    return i && (o = 0), this.pos[0] - 4 - n < e && this.pos[0] + this.size[0] + 4 + n > e && this.pos[1] - o - n < s && this.pos[1] + this.size[1] + n > s;
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(e, s = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [e, s]);
  }
}
let at;
const St = new Uint8Array(16);
function At() {
  if (!at && (at = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !at))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return at(St);
}
const z = [];
for (let t = 0; t < 256; ++t)
  z.push((t + 256).toString(16).slice(1));
function Lt(t, e = 0) {
  return (z[t[e + 0]] + z[t[e + 1]] + z[t[e + 2]] + z[t[e + 3]] + "-" + z[t[e + 4]] + z[t[e + 5]] + "-" + z[t[e + 6]] + z[t[e + 7]] + "-" + z[t[e + 8]] + z[t[e + 9]] + "-" + z[t[e + 10]] + z[t[e + 11]] + z[t[e + 12]] + z[t[e + 13]] + z[t[e + 14]] + z[t[e + 15]]).toLowerCase();
}
const Dt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), mt = {
  randomUUID: Dt
};
function Q(t, e, s) {
  if (mt.randomUUID && !e && !t)
    return mt.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || At)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    s = s || 0;
    for (let i = 0; i < 16; ++i)
      e[s + i] = n[i];
    return e;
  }
  return Lt(n);
}
class it {
  constructor(e, s, n, i, o, l) {
    this.data = null, this._pos = [0, 0], this._last_time = 0, this.id = e, this.type = s, this.origin_id = n, this.origin_slot = i, this.target_id = o, this.target_slot = l;
  }
  static configure(e) {
    return Array.isArray(e) ? new it(e[0], e[5], e[1], e[2], e[3], e[4]) : new it(e.id, e.type, e.origin_id, e.origin_slot, e.target_id, e.target_slot);
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
const ft = class {
  constructor(t) {
    this.desc = "", this.pos = [0, 0], this.subgraph = null, this.skip_subgraph_button = !1, this.priority = 0, this.removable = !0, this.clonable = !0, this.collapsable = !0, this.titleMode = q.NORMAL_TITLE, this.serialize_widgets = !1, this.hide_in_node_lists = !1, this.block_delete = !1, this.ignore_remove = !1, this.last_serialization = null, this._relative_id = null, this.exec_version = 0, this.action_call = null, this.execute_triggered = 0, this.action_triggered = 0, this.console = [], this.title = t || "Unnamed", this.size = [h.NODE_WIDTH, 60], this.graph = null, this.pos = [10, 10], h.use_uuids ? this.id = Q() : this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
  }
  get slotLayout() {
    return "slotLayout" in this.constructor ? this.constructor.slotLayout : null;
  }
  /** configure a node from an object containing the serialized info */
  configure(t) {
    this.graph && this.graph._version++;
    for (const s in t) {
      if (s === "properties") {
        for (const n in t.properties)
          this.properties[n] = t.properties[n], this.onPropertyChanged && this.onPropertyChanged(n, t.properties[n]);
        continue;
      }
      t[s] !== null && (typeof t[s] == "object" ? this[s] && this[s].configure ? this[s].configure(t[s]) : this[s] = h.cloneObject(t[s], this[s]) : this[s] = t[s]);
    }
    t.title || (this.title = ct(this, "title") || this.title);
    const e = t.bgColor;
    if (e !== null && (this.bgcolor || (this.bgcolor = e)), this.inputs)
      for (let s = 0; s < this.inputs.length; ++s) {
        const n = this.inputs[s], i = this.graph ? this.graph.links[n.link] : null;
        n.properties || (n.properties = {}), this.onConnectionChange && this.onConnectionChange(G.INPUT, s, !0, i, n), this.onInputAdded && this.onInputAdded(n);
      }
    if (this.outputs)
      for (let s = 0; s < this.outputs.length; ++s) {
        const n = this.outputs[s];
        if (n.properties || (n.properties = {}), !!n.links) {
          for (let i = 0; i < n.links.length; ++i) {
            const o = this.graph ? this.graph.links[n.links[i]] : null;
            this.onConnectionChange && this.onConnectionChange(G.OUTPUT, s, !0, o, n);
          }
          this.onOutputAdded && this.onOutputAdded(n);
        }
      }
    if (this.widgets) {
      for (let s = 0; s < this.widgets.length; ++s) {
        const n = this.widgets[s];
        n && n.options && n.options.property && this.properties[n.options.property] && (n.value = JSON.parse(JSON.stringify(this.properties[n.options.property])));
      }
      if (t.widgets_values)
        for (let s = 0; s < t.widgets_values.length; ++s)
          this.widgets[s] && (this.widgets[s].value = t.widgets_values[s]);
    }
    this.onConfigure && this.onConfigure(t);
  }
  /** serialize the content */
  serialize() {
    const t = {
      id: this.id,
      type: this.type,
      pos: this.pos,
      size: this.size,
      flags: h.cloneObject(this.flags),
      order: this.order,
      mode: this.mode
    };
    if (this.constructor === ft && this.last_serialization)
      return this.last_serialization;
    if (this.inputs && (t.inputs = this.inputs), this.outputs) {
      for (let e = 0; e < this.outputs.length; e++)
        delete this.outputs[e]._data;
      t.outputs = this.outputs;
    }
    if (this.title && this.title !== this.constructor.title && (t.title = this.title), this.properties && (t.properties = h.cloneObject(this.properties)), this.widgets && this.serialize_widgets) {
      t.widgets_values = [];
      for (let e = 0; e < this.widgets.length; ++e)
        this.widgets[e] ? t.widgets_values[e] = this.widgets[e].value : t.widgets_values[e] = null;
    }
    return t.type || (t.type = this.constructor.type), this.color && (t.color = this.color), this.bgcolor && (t.bgcolor = this.bgcolor), this.boxcolor && (t.boxcolor = this.boxcolor), this.shape && (t.shape = this.shape), this.onSerialize && this.onSerialize(t), t;
  }
  /** Creates a clone of this node  */
  clone(t = { forNode: {} }) {
    const e = h.createNode(this.type);
    if (!e)
      return null;
    const s = h.cloneObject(this.serialize());
    if (s.inputs)
      for (let n = 0; n < s.inputs.length; ++n)
        s.inputs[n].link = null;
    if (s.outputs)
      for (let n = 0; n < s.outputs.length; ++n)
        s.outputs[n].links && (s.outputs[n].links.length = 0);
    return delete s.id, h.use_uuids && (s.id = Q()), e.configure(s), e;
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
    var e;
    let t = this.graph;
    for (; t && t._is_subgraph; )
      t = (e = t._subgraph_node) == null ? void 0 : e.graph;
    return t === null || t._is_subgraph ? null : t;
  }
  *iterateParentSubgraphNodes() {
    var e;
    let t = this.graph._subgraph_node;
    for (; t; )
      yield t, t = (e = t.graph) == null ? void 0 : e._subgraph_node;
  }
  /** sets the value of a property */
  setProperty(t, e) {
    if (this.properties || (this.properties = {}), e === this.properties[t])
      return;
    const s = this.properties[t];
    if (this.properties[t] = e, this.graph && this.graph._version++, this.onPropertyChanged && this.onPropertyChanged(t, e, s) === !1 && (this.properties[t] = s), this.widgets)
      for (let n = 0; n < this.widgets.length; ++n) {
        const i = this.widgets[n];
        if (i && i.options.property === t) {
          i.value = e;
          break;
        }
      }
  }
  getInputSlotProperty(t, e) {
    if (!this.inputs || !this.graph || t === -1 || t >= this.inputs.length)
      return;
    const s = this.inputs[t];
    if (s)
      return s.properties || (s.properties = {}), s.properties[e];
  }
  getOutputSlotProperty(t, e) {
    if (!this.outputs || !this.graph || t === -1 || t >= this.outputs.length)
      return;
    const s = this.outputs[t];
    if (s)
      return s.properties || (s.properties = {}), s.properties[e];
  }
  setInputSlotProperty(t, e, s) {
    if (!this.inputs || !this.graph || t === -1 || t >= this.inputs.length)
      return;
    const n = this.inputs[t];
    if (!n || (n.properties || (n.properties = {}), s === n.properties[e]))
      return;
    const i = n.properties[e];
    n.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(G.INPUT, t, n, e, s, i) === !1 && (n.properties[e] = i);
  }
  setOutputSlotProperty(t, e, s) {
    if (!this.outputs || !this.graph || t === -1 || t >= this.outputs.length)
      return;
    const n = this.outputs[t];
    if (!n || (n.properties || (n.properties = {}), s === n.properties[e]))
      return;
    const i = n.properties[e];
    n.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(G.OUTPUT, t, n, e, s, i) === !1 && (n.properties[e] = i);
  }
  /** sets the output data */
  setOutputData(t, e) {
    if (!this.outputs || !this.graph || t === -1 || t >= this.outputs.length)
      return;
    const s = this.outputs[t];
    if (s && (h.serialize_slot_data ? s._data = e : s._data = void 0, this.outputs[t].links))
      for (let n = 0; n < this.outputs[t].links.length; n++) {
        const i = this.outputs[t].links[n], o = this.graph.links[i];
        o && (o.data = e);
      }
  }
  /** sets the output data */
  setOutputDataType(t, e) {
    if (!this.outputs || t === -1 || t >= this.outputs.length)
      return;
    const s = this.outputs[t];
    if (s && (s.type = e, this.outputs[t].links))
      for (let n = this.outputs[t].links.length - 1; n >= 0; n--) {
        const i = this.outputs[t].links[n], o = this.graph.links[i];
        if (o) {
          o.type = e;
          const l = this.graph.getNodeById(o.target_id);
          if (l) {
            const a = l.getInputInfo(o.target_slot);
            a && !h.isValidConnection(e, a.type) && l.disconnectInput(o.target_slot);
          }
        }
      }
  }
  *iterateInputInfo() {
    for (let t = 0; t < this.inputs.length; t++)
      yield this.inputs[t];
  }
  /**
   * Retrieves the input data (data traveling through the connection) from one slot
   * @param slot
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns undefined
   */
  getInputData(t, e) {
    if (!this.inputs || !this.graph || t >= this.inputs.length || this.inputs[t].link === null)
      return;
    const s = this.inputs[t].link, n = this.graph.links[s];
    if (!n)
      return h.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], s), null;
    if (!e)
      return n.data;
    const i = this.graph.getNodeById(n.origin_id);
    return i && (i.updateOutputData ? i.updateOutputData(n.origin_slot) : i.onExecute && i.onExecute(null, {})), n.data;
  }
  /**
   * Retrieves the input data type (in case this supports multiple input types)
   * @param slot
   * @return datatype in string format
   */
  getInputDataType(t) {
    if (!this.inputs || t >= this.inputs.length || this.inputs[t].link === null)
      return null;
    const e = this.inputs[t].link, s = this.graph.links[e];
    if (!s)
      return h.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], e), null;
    const n = this.graph.getNodeById(s.origin_id);
    if (!n)
      return s.type;
    const i = n.outputs[s.origin_slot];
    return i && i.type !== -1 ? i.type : null;
  }
  /**
   * Retrieves the input data from one slot using its name instead of slot number
   * @param slot_name
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns null
   */
  getInputDataByName(t, e) {
    const s = this.findInputSlotIndexByName(t);
    return s === -1 ? null : this.getInputData(s, e);
  }
  /** tells you if there is a connection in one input slot */
  isInputConnected(t) {
    return this.inputs ? t < this.inputs.length && this.inputs[t].link !== null : !1;
  }
  /** tells you info about an input connection (which node, type, etc) */
  getInputInfo(t) {
    return this.inputs && t < this.inputs.length ? this.inputs[t] : null;
  }
  /**
   * Returns the link info in the connection of an input slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputLink(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      const e = this.inputs[t];
      return this.graph.links[e.link];
    }
    return null;
  }
  /** returns the node connected in the input slot */
  getInputNode(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      const e = this.inputs[t].link, s = this.graph.links[e];
      if (!s)
        return h.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], e), null;
      const n = this.graph.getNodeById(s.origin_id);
      if (n)
        return n;
    }
    return null;
  }
  /** returns the value of an input with this name, otherwise checks if there is a property with that name */
  getInputOrProperty(t) {
    if (!this.inputs || !this.inputs.length || !this.graph)
      return this.properties ? this.properties[t] : null;
    for (let e = 0, s = this.inputs.length; e < s; ++e) {
      const n = this.inputs[e];
      if (t === n.name && n.link !== null) {
        const i = this.graph.links[n.link];
        if (i)
          return i.data;
      }
    }
    return this.properties[t];
  }
  /** sets the input data type */
  setInputDataType(t, e) {
    if (!this.inputs || !this.graph || t === -1 || t >= this.inputs.length)
      return;
    const s = this.inputs[t];
    if (s && (s.type = e, s.link)) {
      const n = s.link, i = this.graph.links[n];
      i.type = e;
      const o = this.graph.getNodeById(i.origin_id);
      if (o) {
        const l = o.getOutputInfo(i.origin_slot);
        l && !h.isValidConnection(l.type, e) && o.disconnectOutput(i.origin_slot);
      }
    }
  }
  /**
   * Returns the output slot in another node that an input in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputSlotConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return null;
    if (t >= 0 && t < this.outputs.length) {
      const e = this.inputs[t];
      if (e.link) {
        const s = this.graph.links[e.link];
        return this.graph.getNodeById(s.origin_id).outputs[s.origin_slot];
      }
    }
    return null;
  }
  *iterateOutputInfo() {
    for (let t = 0; t < this.outputs.length; t++)
      yield this.outputs[t];
  }
  /** tells you the last output data that went in that slot */
  getOutputData(t) {
    return !this.outputs || !this.graph || t >= this.outputs.length ? null : this.outputs[t]._data;
  }
  /**
   * Returns the link info in the connection of an output slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputLinks(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      const e = this.outputs[t];
      if (e.links) {
        const s = [];
        for (const n of e.links)
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
  getInputSlotsConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      const e = this.outputs[t];
      if (e.links) {
        const s = [];
        for (const n of e.links) {
          const i = this.graph.links[n], o = this.graph.getNodeById(i.target_id);
          s.push(o.inputs[i.target_slot]);
        }
        return s;
      }
    }
    return [];
  }
  /** tells you info about an output connection (which node, type, etc) */
  getOutputInfo(t) {
    return this.outputs && t < this.outputs.length ? this.outputs[t] : null;
  }
  /** tells you if there is a connection in one output slot */
  isOutputConnected(t) {
    return !this.outputs || !this.graph ? !1 : t < this.outputs.length && this.outputs[t].links && this.outputs[t].links.length > 0;
  }
  /** tells you if there is any connection in the output slots */
  isAnyOutputConnected() {
    if (!this.outputs || !this.graph)
      return !1;
    for (let t = 0; t < this.outputs.length; ++t)
      if (this.outputs[t].links && this.outputs[t].links.length)
        return !0;
    return !1;
  }
  /** retrieves all the nodes connected to this output slot */
  getOutputNodes(t) {
    if (!this.outputs || this.outputs.length === 0 || !this.graph || t >= this.outputs.length)
      return null;
    const e = this.outputs[t];
    if (!e.links || e.links.length === 0)
      return null;
    const s = [];
    for (let n = 0; n < e.links.length; n++) {
      const i = e.links[n], o = this.graph.links[i];
      if (o) {
        const l = this.graph.getNodeById(o.target_id);
        l && s.push(l);
      }
    }
    return s;
  }
  *iterateAllLinks() {
    if (this.graph) {
      for (const t of this.iterateInputInfo())
        if (t.link) {
          const e = this.graph.links[t.link];
          e && (yield e);
        }
      for (const t of this.iterateOutputInfo())
        if (t.links !== null)
          for (const e of t.links) {
            const s = this.graph.links[e];
            s && (yield s);
          }
    }
  }
  addOnTriggerInput() {
    const t = this.findInputSlotIndexByName("onTrigger");
    return t === -1 ? (this.addInput("onTrigger", O.EVENT, { optional: !0, nameLocked: !0 }), this.findInputSlotIndexByName("onTrigger")) : t;
  }
  addOnExecutedOutput() {
    const t = this.findOutputSlotIndexByName("onExecuted");
    return t === -1 ? (this.addOutput("onExecuted", O.ACTION, { optional: !0, nameLocked: !0 }), this.findOutputSlotIndexByName("onExecuted")) : t;
  }
  onAfterExecuteNode(t, e) {
    const s = this.findOutputSlotIndexByName("onExecuted");
    s !== -1 && this.triggerSlot(s, t, null, e);
  }
  changeMode(t) {
    switch (t) {
      case Y.ON_EVENT:
        break;
      case Y.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case Y.NEVER:
        break;
      case Y.ALWAYS:
        break;
      case Y.ON_REQUEST:
        break;
      default:
        return !1;
    }
    return this.mode = t, !0;
  }
  doExecute(t, e = {}) {
    this.onExecute && (e.action_call || (e.action_call = `${this.id}_exec_${Math.floor(Math.random() * 9999)}`), this.graph.nodes_executing[this.id] = !0, this.onExecute(t, e), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, e && e.action_call && (this.action_call = e.action_call, this.graph.nodes_executedAction[this.id] = e.action_call)), this.execute_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(t, e);
  }
  /**
   * Triggers an action, wrapped by logics to control execution flow
   * @method actionDo
   * @param {string} action name
   * @param {*} param
   */
  actionDo(t, e, s = {}) {
    this.onAction && (s.action_call || (s.action_call = `${this.id}_${t || "action"}_${Math.floor(Math.random() * 9999)}`), this.graph.nodes_actioning[this.id] = t || "actioning", this.onAction(t, e, s), this.graph.nodes_actioning[this.id] = !1, s && s.action_call && (this.action_call = s.action_call, this.graph.nodes_executedAction[this.id] = s.action_call)), this.action_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(e, s);
  }
  /**  Triggers an event in this node, this will trigger any output with the same name */
  trigger(t, e, s) {
    if (!(!this.outputs || !this.outputs.length)) {
      this.graph && (this.graph._last_trigger_time = h.getTime());
      for (let n = 0; n < this.outputs.length; ++n) {
        const i = this.outputs[n];
        !i || i.type !== O.EVENT || t && i.name !== t || this.triggerSlot(n, e, null, s);
      }
    }
  }
  /**
   * Triggers an slot event in this node
   * @param slot the index of the output slot
   * @param param
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  triggerSlot(t, e, s, n = {}) {
    if (!this.outputs)
      return;
    if (t === null) {
      console.error("slot must be a number");
      return;
    }
    typeof t != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
    const i = this.outputs[t];
    if (!i)
      return;
    const o = i.links;
    if (!(!o || !o.length)) {
      this.graph && (this.graph._last_trigger_time = h.getTime());
      for (let l = 0; l < o.length; ++l) {
        const a = o[l];
        if (s !== null && s !== a)
          continue;
        const r = this.graph.links[o[l]];
        if (!r)
          continue;
        r._last_time = h.getTime();
        const c = this.graph.getNodeById(r.target_id);
        if (c) {
          if (c.inputs[r.target_slot], n.link = r, n.originNode = this, c.mode === Y.ON_TRIGGER)
            n.action_call || (n.action_call = `${this.id}_trigg_${Math.floor(Math.random() * 9999)}`), c.onExecute && c.doExecute(e, n);
          else if (c.onAction) {
            n.action_call || (n.action_call = `${this.id}_act_${Math.floor(Math.random() * 9999)}`);
            const d = c.inputs[r.target_slot];
            c.actionDo(d.name, e, n);
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
  clearTriggeredSlot(t, e) {
    if (!this.outputs)
      return;
    const s = this.outputs[t];
    if (!s)
      return;
    const n = s.links;
    if (!(!n || !n.length))
      for (let i = 0; i < n.length; ++i) {
        const o = n[i];
        if (e !== null && e !== o)
          continue;
        const l = this.graph.links[n[i]];
        l && (l._last_time = 0);
      }
  }
  /**
   * changes node size and triggers callback
   * @method setSize
   * @param {vec2} size
   */
  setSize(t) {
    this.size = t, this.onResize && this.onResize(this.size);
  }
  /**
   * add a new property to this node
   * @param name
   * @param default_value
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of the property (like values, etc)
   */
  addProperty(t, e, s, n) {
    const i = { name: t, type: s, default_value: e };
    if (n)
      for (const o in n)
        i[o] = n[o];
    return this.properties_info || (this.properties_info = []), this.properties_info.push(i), this.properties || (this.properties = {}), this.properties[t] = e, i;
  }
  /**
   * add a new output slot to use in this node
   * @param name
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(t, e = O.DEFAULT, s) {
    const n = { name: t, type: e, links: [], properties: {} };
    if (s)
      for (const i in s)
        n[i] = s[i];
    return (n.shape === null || n.shape === S.DEFAULT) && (e === "array" ? n.shape = S.GRID_SHAPE : (e === O.EVENT || e === O.ACTION) && (n.shape = S.BOX_SHAPE)), (e === O.EVENT || e === O.ACTION) && (n.shape = S.BOX_SHAPE), this.outputs || (this.outputs = []), this.outputs.push(n), this.onOutputAdded && this.onOutputAdded(n), h.auto_load_slot_types && h.registerNodeAndSlotType(this, e, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing output slot */
  removeOutput(t) {
    const e = this.outputs[t];
    this.disconnectOutput(t), this.outputs.splice(t, 1);
    for (let s = t; s < this.outputs.length; ++s) {
      if (!this.outputs[s] || !this.outputs[s].links)
        continue;
      const n = this.outputs[s].links;
      for (let i = 0; i < n.length; ++i) {
        const o = this.graph.links[n[i]];
        o && (o.origin_slot -= 1);
      }
    }
    this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(t, e), this.setDirtyCanvas(!0, !0);
  }
  moveOutput(t, e) {
    const s = this.outputs[t];
    if (s === null || e < 0 || e > this.outputs.length - 1)
      return;
    const n = this.outputs[e];
    if (s.links)
      for (const i of s.links) {
        const o = this.graph.links[i];
        o.origin_slot = e;
      }
    if (n.links)
      for (const i of n.links) {
        const o = this.graph.links[i];
        o.origin_slot = t;
      }
    this.outputs[e] = s, this.outputs[t] = n;
  }
  /**
   * add a new input slot to use in this node
   * @param name
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(t, e = O.DEFAULT, s) {
    const n = { name: t, type: e, link: null, properties: {} };
    if (s)
      for (const i in s)
        n[i] = s[i];
    return (n.shape === null || n.shape === S.DEFAULT) && (e === "array" ? n.shape = S.GRID_SHAPE : (e === O.EVENT || e === O.ACTION) && (n.shape = S.BOX_SHAPE)), this.inputs || (this.inputs = []), this.inputs.push(n), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(n), h.registerNodeAndSlotType(this, e), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing input slot */
  removeInput(t) {
    this.disconnectInput(t);
    const e = this.inputs.splice(t, 1);
    for (let s = t; s < this.inputs.length; ++s) {
      if (!this.inputs[s])
        continue;
      const n = this.graph.links[this.inputs[s].link];
      n && (n.target_slot -= 1);
    }
    this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(t, e[0]), this.setDirtyCanvas(!0, !0);
  }
  moveInput(t, e) {
    const s = this.inputs[t];
    if (s === null || e < 0 || e > this.inputs.length - 1)
      return;
    const n = this.inputs[e];
    if (s.link !== null) {
      const i = this.graph.links[s.link];
      i.target_slot = e;
    }
    if (n.link !== null) {
      const i = this.graph.links[n.link];
      i.target_slot = t;
    }
    this.inputs[e] = s, this.inputs[t] = n;
  }
  /**
   * add an special connection to this node (used for special kinds of graphs)
   * @param name
   * @param type string defining the input type ("vec3","number",...)
   * @param pos position of the connection inside the node
   * @param direction if is input or output
   */
  addConnection(t, e, s, n) {
    const i = {
      name: t,
      type: e,
      pos: s,
      direction: n,
      links: null
    };
    return this.connections.push(i), i;
  }
  /** computes the size of a node according to its inputs and output slots */
  computeSize(t = [0, 0]) {
    const e = ct(this, "overrideSize");
    if (e)
      return e.concat();
    let s = Math.max(
      this.inputs ? this.inputs.length : 1,
      this.outputs ? this.outputs.length : 1
    );
    const n = t;
    s = Math.max(s, 1);
    const i = h.NODE_TEXT_SIZE, o = c(this.title);
    let l = 0, a = 0;
    if (this.inputs)
      for (let d = 0, u = this.inputs.length; d < u; ++d) {
        const _ = this.inputs[d], m = _.label || _.name || "", p = c(m);
        l < p && (l = p);
      }
    if (this.outputs)
      for (let d = 0, u = this.outputs.length; d < u; ++d) {
        const _ = this.outputs[d], m = _.label || _.name || "", p = c(m);
        a < p && (a = p);
      }
    if (n[0] = Math.max(l + a + 10, o), n[0] = Math.max(n[0], h.NODE_WIDTH), this.widgets && this.widgets.length)
      for (const d of this.widgets)
        n[0] = Math.max(n[0], d.width || h.NODE_WIDTH * 1.5);
    n[1] = (this.constructor.slot_start_y || 0) + s * h.NODE_SLOT_HEIGHT;
    let r = 0;
    if (this.widgets && this.widgets.length) {
      for (let d = 0, u = this.widgets.length; d < u; ++d) {
        const _ = this.widgets[d];
        _.hidden || (_.computeSize ? r += _.computeSize(n[0])[1] + 4 : r += h.NODE_WIDGET_HEIGHT + 4);
      }
      r += 8;
    }
    this.widgets_up ? n[1] = Math.max(n[1], r) : this.widgets_start_y !== null ? n[1] = Math.max(n[1], r + this.widgets_start_y) : n[1] += r;
    function c(d) {
      return d ? i * d.length * 0.6 : 0;
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
  getPropertyInfo(t) {
    let e = null;
    if (this.properties_info) {
      for (let s = 0; s < this.properties_info.length; ++s)
        if (this.properties_info[s].name === t) {
          e = this.properties_info[s];
          break;
        }
    }
    return this.constructor[`@${t}`] && (e = this.constructor[`@${t}`]), this.constructor.widgets_info && this.constructor.widgets_info[t] && (e = this.constructor.widgets_info[t]), !e && this.onGetPropertyInfo && (e = this.onGetPropertyInfo(t)), e || (e = {}), e.type || (e.type = typeof this.properties[t]), e.widget === "combo" && (e.type = "enum"), e;
  }
  /**
   * https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
   * @return created widget
   */
  addWidget(t, e, s, n, i) {
    this.widgets || (this.widgets = []), !i && n && n.constructor === Object && (i = n, n = null), i && i.constructor === String && (i = { property: i }), n && n.constructor === String && (i || (i = {}), i.property = n, n = null), n && n.constructor !== Function && (console.warn("addWidget: callback must be a function"), n = null);
    const o = {
      type: t.toLowerCase(),
      name: e,
      value: s,
      callback: n,
      options: i || {}
    };
    if (o.options.y !== void 0 && (o.y = o.options.y), !n && !o.options.callback && !o.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), t === "combo" && !o.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    return this.widgets.push(o), this.setSize(this.computeSize()), o;
  }
  addCustomWidget(t) {
    return this.widgets || (this.widgets = []), this.widgets.push(t), this.setSize(this.computeSize()), t;
  }
  setWidgetHidden(t, e) {
    t.hidden = e, this.setSize(this.computeSize());
  }
  /**
   * returns the bounding of the object, used for rendering purposes
   * @return [x, y, width, height]
   */
  getBounding(t) {
    return t = t || new Float32Array(4), t[0] = this.pos[0] - 4, t[1] = this.pos[1] - h.NODE_TITLE_HEIGHT, t[2] = this.size[0] + 4, t[3] = this.flags.collapsed ? h.NODE_TITLE_HEIGHT : this.size[1] + h.NODE_TITLE_HEIGHT, this.onBounding && this.onBounding(t), t;
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(t, e, s = 0, n = !1) {
    let i = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    if (n && (i = 0), this.flags && this.flags.collapsed) {
      if (h.isInsideRectangle(
        t,
        e,
        this.pos[0] - s,
        this.pos[1] - h.NODE_TITLE_HEIGHT - s,
        (this._collapsed_width || h.NODE_COLLAPSED_WIDTH) + 2 * s,
        h.NODE_TITLE_HEIGHT + 2 * s
      ))
        return !0;
    } else if (this.pos[0] - 4 - s < t && this.pos[0] + this.size[0] + 4 + s > t && this.pos[1] - i - s < e && this.pos[1] + this.size[1] + s > e)
      return !0;
    return !1;
  }
  /** checks if a point is inside a node slot, and returns info about which slot */
  getSlotInPosition(t, e) {
    const s = [0, 0];
    if (this.inputs)
      for (let n = 0, i = this.inputs.length; n < i; ++n) {
        const o = this.inputs[n];
        if (this.getConnectionPos(!0, n, s), h.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { input: o, slot: n, link_pos: s };
      }
    if (this.outputs)
      for (let n = 0, i = this.outputs.length; n < i; ++n) {
        const o = this.outputs[n];
        if (this.getConnectionPos(!1, n, s), h.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { output: o, slot: n, link_pos: s };
      }
    return null;
  }
  is(t) {
    const e = t.__LITEGRAPH_TYPE__;
    return e !== null && this.type === e;
  }
  /**
   * returns the input slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return the slot (-1 if not found)
   */
  findInputSlotIndexByName(t, e = !1, s) {
    if (!this.inputs)
      return -1;
    for (let n = 0, i = this.inputs.length; n < i; ++n)
      if (!(e && this.inputs[n].link && this.inputs[n].link !== null) && !(s && s.includes(this.inputs[n].type)) && (!t || t === this.inputs[n].name))
        return n;
    return -1;
  }
  findInputSlotByName(t, e = !1, s) {
    if (!this.inputs)
      return null;
    for (let n = 0, i = this.inputs.length; n < i; ++n)
      if (!(e && this.inputs[n].link && this.inputs[n].link !== null) && !(s && s.includes(this.inputs[n].type)) && (!t || t === this.inputs[n].name))
        return this.inputs[n];
    return null;
  }
  /**
   * returns the output slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return  the slot (-1 if not found)
   */
  findOutputSlotIndexByName(t, e = !1, s) {
    if (!this.outputs)
      return -1;
    for (let n = 0, i = this.outputs.length; n < i; ++n)
      if (!(e && this.outputs[n].links && this.outputs[n].links !== null) && !(s && s.includes(this.outputs[n].type)) && (!t || t === this.outputs[n].name))
        return n;
    return -1;
  }
  findOutputSlotByName(t, e = !1, s) {
    if (!this.outputs)
      return null;
    for (let n = 0, i = this.outputs.length; n < i; ++n)
      if (!(e && this.outputs[n].links && this.outputs[n].links !== null) && !(s && s.includes(this.outputs[n].type)) && (!t || t === this.outputs[n].name))
        return this.outputs[n];
    return null;
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotIndexByType(t, e = !1, s = !1) {
    return this.findSlotByType(!0, t, !1, e, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotIndexByType(t, e = !1, s = !1) {
    return this.findSlotByType(!1, t, !1, e, s);
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotByType(t, e = !1, s = !1) {
    return this.findSlotByType(!0, t, !1, e, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotByType(t, e = !1, s = !1) {
    return this.findSlotByType(!1, t, !1, e, s);
  }
  /**
   * returns the output (or input) slot with a given type, -1 if not found
   * @method findSlotByType
   * @param {boolean} input uise inputs instead of outputs
   * @param {string} type the type of the slot
   * @param {boolean} preferFreeSlot if we want a free slot (if not found, will return the first of the type anyway)
   * @return {number_or_object} the slot (-1 if not found)
   */
  findSlotByType(t, e, s, n = !1, i = !1) {
    n = n || !1, i = i || !1;
    const o = t ? this.inputs : this.outputs;
    if (!o)
      return s ? null : -1;
    (e === "" || e === "*") && (e = 0);
    for (let l = 0, a = o.length; l < a; ++l) {
      const r = `${e}`.toLowerCase().split(","), d = `${o[l].type === "0" || o[l].type === "*" ? "0" : o[l].type}`.toLowerCase().split(",");
      for (let u = 0; u < r.length; u++)
        for (let _ = 0; _ < d.length; _++)
          if (r[u] === "_event_" && (r[u] = O.EVENT), d[u] === "_event_" && (d[u] = O.EVENT), r[u] === "*" && (r[u] = O.DEFAULT), d[u] === "*" && (d[u] = O.DEFAULT), r[u] === d[_]) {
            const m = o[l];
            if (n && m.links && m.links !== null || m.link && m.link !== null)
              continue;
            return s ? m : l;
          }
    }
    if (n && !i)
      for (let l = 0, a = o.length; l < a; ++l) {
        const r = `${e}`.toLowerCase().split(","), d = `${o[l].type === "0" || o[l].type === "*" ? "0" : o[l].type}`.toLowerCase().split(",");
        for (let u = 0; u < r.length; u++)
          for (let _ = 0; _ < d.length; _++)
            if (r[u] === "*" && (r[u] = O.DEFAULT), d[u] === "*" && (d[u] = O.DEFAULT), r[u] === d[_])
              return s ? o[l] : l;
      }
    return s ? null : -1;
  }
  /**
   * connect this node output to the input of another node BY TYPE
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param targetNode
   * @param targetSlotType
   * @param optsIn
   */
  connectByTypeInput(t, e, s, n = {}) {
    const o = Object.assign({
      createEventInCase: !0,
      firstFreeIfOutputGeneralInCase: !0,
      generalTypeInCase: !0
    }, n);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let l = s;
    s === O.EVENT ? l = O.ACTION : s === O.ACTION && (l = O.EVENT);
    const a = e.findInputSlotIndexByType(l, !0);
    if (a >= 0 && a !== null)
      return h.debug && console.debug(`CONNbyTYPE type ${s} for ${a}`), this.connect(t, e, a);
    if (h.debug && console.log(`type ${s} not found or not free?`), o.createEventInCase && s === O.EVENT)
      return h.debug && console.debug(`connect WILL CREATE THE onTrigger ${s} to ${e}`), this.connect(t, e, -1);
    if (o.generalTypeInCase) {
      const r = e.findInputSlotIndexByType(O.DEFAULT, !0, !0);
      if (h.debug && console.debug("connect TO a general type (*, 0), if not found the specific type ", s, " to ", e, "RES_SLOT:", r), r >= 0)
        return this.connect(t, e, r);
    }
    if (o.firstFreeIfOutputGeneralInCase && (s === 0 || s === "*" || s === "")) {
      const r = e.findInputSlotIndexByName(null, !0, [O.EVENT]);
      if (h.debug && console.debug("connect TO TheFirstFREE ", s, " to ", e, "RES_SLOT:", r), r >= 0)
        return this.connect(t, e, r);
    }
    return h.debug && console.error("no way to connect type: ", s, " to targetNODE ", e), null;
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param sourceNode
   * @param sourceSlotType
   * @param optsIn
   */
  connectByTypeOutput(t, e, s, n = {}) {
    const o = Object.assign({
      createEventInCase: !0,
      firstFreeIfInputGeneralInCase: !0,
      generalTypeInCase: !0
    }, n);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let l = s;
    s === O.EVENT ? l = O.ACTION : s === O.ACTION && (l = O.EVENT);
    const a = e.findOutputSlotIndexByType(l, !0);
    if (a >= 0 && a !== null)
      return console.debug(`CONNbyTYPE OUT! type ${s} for ${a} to ${l}`), e.connect(a, this, t);
    if (o.generalTypeInCase) {
      const r = e.findOutputSlotIndexByType(0, !0, !0);
      if (r >= 0)
        return e.connect(r, this, t);
    }
    if ((o.createEventInCase && s === O.EVENT || s === O.ACTION) && h.do_add_triggers_slots) {
      const r = e.addOnExecutedOutput();
      return e.connect(r, this, t);
    }
    if (o.firstFreeIfInputGeneralInCase && (s === 0 || s === "*" || s === "")) {
      const r = e.findOutputSlotIndexByName(null, !0, [O.EVENT, O.ACTION]);
      if (r >= 0)
        return e.connect(r, this, t);
    }
    return console.error("no way to connect byOUT type: ", s, " to sourceNODE ", e), console.error(`type OUT! ${s} not found or not free?`), null;
  }
  /**
   * connect this node output to the input of another node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param  targetNode the target node
   * @param  targetSlot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
   * @return {object} the linkInfo is created, otherwise null
   */
  connect(t, e, s) {
    if (s = s || 0, !this.graph)
      throw new Error("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t === -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${t}`), null;
    } else if (!this.outputs || t >= this.outputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), null;
    if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
      throw "target node is null";
    if (e === this)
      return h.debug && console.error("Connect: Error, can't connect node to itself!"), null;
    if (!e.graph)
      throw new Error("Connect: Error, target node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof s == "string") {
      if (s = e.findInputSlotIndexByName(s), s === -1)
        return h.debug && console.error(
          `Connect: Error, no slot of name ${s}`
        ), null;
    } else if (s === O.EVENT)
      if (h.do_add_triggers_slots)
        e.changeMode(Y.ON_TRIGGER), s = e.findInputSlotIndexByName("onTrigger");
      else
        return h.debug && console.error("Connect: Error, can't connect event target slot"), null;
    else if (!e.inputs || s >= e.inputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), null;
    let n = !1;
    const i = e.inputs[s];
    let o = null;
    const l = this.outputs[t];
    if (!this.outputs[t])
      return h.debug && (console.warn(`Connect: Invalid slot passed: ${t}`), console.warn(this.outputs)), null;
    if (e.onBeforeConnectInput && (s = e.onBeforeConnectInput(s)), s === -1 || s === null || !h.isValidConnection(l.type, i.type))
      return this.setDirtyCanvas(!1, !0), n && this.graph.connectionChange(this, o), console.warn("Connect: Invalid connection: ", s, l.type, i.type), null;
    if (h.debug && console.debug("valid connection", l.type, i.type), e.onConnectInput && e.onConnectInput(s, l.type, l, this, t) === !1)
      return h.debug && console.debug("onConnectInput blocked", l.type, i.type), null;
    if (this.onConnectOutput && this.onConnectOutput(t, i.type, i, e, s) === !1)
      return h.debug && console.debug("onConnectOutput blocked", l.type, i.type), null;
    if (e.inputs[s] && e.inputs[s].link !== null && (this.graph.beforeChange(), e.disconnectInput(s, { doProcessChange: !1 }), n = !0), l.links !== null && l.links.length)
      switch (l.type) {
        case O.EVENT:
          h.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(t, null, { doProcessChange: !1 }), n = !0);
          break;
      }
    let a;
    return h.use_uuids ? a = Q() : a = ++this.graph.last_link_id, o = new it(
      a,
      i.type || l.type,
      this.id,
      t,
      e.id,
      s
    ), this.graph.links[o.id] && console.error("Link already exists in graph!", o.id, o, this.graph.links[o.id]), this.graph.links[o.id] = o, l.links === null && (l.links = []), l.links.push(o.id), e.inputs[s].link = o.id, this.graph && this.graph._version++, this.onConnectionChange && this.onConnectionChange(
      G.OUTPUT,
      t,
      !0,
      o,
      l
    ), e.onConnectionChange && e.onConnectionChange(
      G.INPUT,
      s,
      !0,
      o,
      i
    ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
      G.INPUT,
      e,
      s,
      this,
      t
    ), this.graph.onNodeConnectionChange(
      G.OUTPUT,
      this,
      t,
      e,
      s
    )), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, o), o;
  }
  /**
   * disconnect one output to an specific node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param targetNode the target node to which this slot is connected [Optional, if not targetNode is specified all nodes will be disconnected]
   * @return if it was disconnected successfully
   */
  disconnectOutput(t, e, s) {
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t === -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${t}`), !1;
    } else if (!this.outputs || t >= this.outputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), !1;
    const n = this.outputs[t];
    if (!n || !n.links || n.links.length === 0)
      return !1;
    if (e) {
      if (e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
        throw "Target Node not found";
      for (let i = 0, o = n.links.length; i < o; i++) {
        const l = n.links[i], a = this.graph.links[l];
        if (a.target_id === e.id) {
          n.links.splice(i, 1);
          const r = e.inputs[a.target_slot];
          r.link = null, delete this.graph.links[l], this.graph && this.graph._version++, e.onConnectionChange && e.onConnectionChange(
            G.INPUT,
            a.target_slot,
            !1,
            a,
            r
          ), this.onConnectionChange && this.onConnectionChange(
            G.OUTPUT,
            t,
            !1,
            a,
            n
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            G.OUTPUT,
            this,
            t
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            G.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            G.INPUT,
            e,
            a.target_slot
          ));
          break;
        }
      }
    } else {
      for (let i = 0, o = n.links.length; i < o; i++) {
        const l = n.links[i], a = this.graph.links[l];
        if (!a)
          continue;
        const r = this.graph.getNodeById(a.target_id);
        let c = null;
        this.graph && this.graph._version++, r && (c = r.inputs[a.target_slot], c.link = null, r.onConnectionChange && r.onConnectionChange(
          G.INPUT,
          a.target_slot,
          !1,
          a,
          c
        ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
          G.INPUT,
          r,
          a.target_slot
        )), delete this.graph.links[l], this.onConnectionChange && this.onConnectionChange(
          G.OUTPUT,
          t,
          !1,
          a,
          n
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          G.OUTPUT,
          this,
          t
        ), this.graph.onNodeConnectionChange(
          G.INPUT,
          r,
          a.target_slot
        ));
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
  disconnectInput(t, e = {}) {
    if (typeof t == "string") {
      if (t = this.findInputSlotIndexByName(t), t === -1)
        return h.debug && console.error(`Connect: Error, no slot of name ${t}`), !1;
    } else if (!this.inputs || t >= this.inputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), !1;
    const s = this.inputs[t];
    if (!s)
      return !1;
    const n = this.inputs[t].link;
    if (n !== null) {
      this.inputs[t].link = null;
      const i = this.graph.links[n];
      if (i) {
        const o = this.graph.getNodeById(i.origin_id);
        if (!o)
          return !1;
        const l = o.outputs[i.origin_slot];
        if (!l || !l.links || l.links.length === 0)
          return !1;
        for (let a = 0, r = l.links.length; a < r; a++) {
          if (l.links[a] === n) {
            l.links.splice(a, 1);
            break;
          }
          delete this.graph.links[n], this.graph && this.graph._version++, this.onConnectionChange && this.onConnectionChange(
            G.INPUT,
            t,
            !1,
            i,
            s
          ), o.onConnectionChange && o.onConnectionChange(
            G.OUTPUT,
            a,
            !1,
            i,
            l
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            G.OUTPUT,
            o,
            a
          ), this.graph.onNodeConnectionChange(G.INPUT, this, t));
        }
      }
    }
    return this.setDirtyCanvas(!1, !0), this.graph && this.graph.connectionChange(this), !0;
  }
  /**
   * returns the center of a connection point in canvas coords
   * @param is_input true if an input slot, false if it is an output
   * @param slotNumber
   * @param out a place to store the output, to free garbage
   * @param ignore_collapsed
   * @return the position
   */
  getConnectionPos(t, e, s = [0, 0], n = !1) {
    let i = 0;
    t && this.inputs && (i = this.inputs.length), !t && this.outputs && (i = this.outputs.length);
    const o = h.NODE_SLOT_HEIGHT * 0.5;
    if (this.flags.collapsed && !n) {
      const l = this._collapsed_width || h.NODE_COLLAPSED_WIDTH;
      return this.horizontal ? (s[0] = this.pos[0] + l * 0.5, t ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1]) : (t ? s[0] = this.pos[0] : s[0] = this.pos[0] + l, s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT * 0.5), s;
    }
    return t && e === -1 ? (s[0] = this.pos[0] + h.NODE_TITLE_HEIGHT * 0.5, s[1] = this.pos[1] + h.NODE_TITLE_HEIGHT * 0.5, s) : t && i > e && this.inputs[e].pos ? (s[0] = this.pos[0] + this.inputs[e].pos[0], s[1] = this.pos[1] + this.inputs[e].pos[1], s) : !t && i > e && this.outputs[e].pos ? (s[0] = this.pos[0] + this.outputs[e].pos[0], s[1] = this.pos[1] + this.outputs[e].pos[1], s) : this.horizontal ? (s[0] = this.pos[0] + (e + 0.5) * (this.size[0] / i), t ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1] + this.size[1], s) : (t ? s[0] = this.pos[0] + o : s[0] = this.pos[0] + this.size[0] + 1 - o, s[1] = this.pos[1] + (e + 0.7) * h.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), s);
  }
  /** Force align to grid */
  alignToGrid() {
    this.pos[0] = h.CANVAS_GRID_SIZE * Math.round(this.pos[0] / h.CANVAS_GRID_SIZE), this.pos[1] = h.CANVAS_GRID_SIZE * Math.round(this.pos[1] / h.CANVAS_GRID_SIZE);
  }
  /** Console output */
  trace(t) {
    this.console || (this.console = []), this.console.push(t), this.console.length > ft.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, t);
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(t, e = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [t, e]);
  }
  loadImage(t) {
    const e = new Image();
    e.src = h.node_images_path + t;
    const s = this;
    return e.onload = function() {
      s.setDirtyCanvas(!0);
    }, e;
  }
  /** Allows getting onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(t) {
    if (!this.graph || !this.graph.list_of_graphcanvas)
      return;
    const e = this.graph.list_of_graphcanvas;
    for (let s = 0; s < e.length; ++s) {
      const n = e[s];
      !t && n.node_capturing_input !== this || (n.node_capturing_input = t ? this : null);
    }
  }
  isShowingTitle(t) {
    return this.titleMode === q.TRANSPARENT_TITLE || this.titleMode === q.NO_TITLE ? !1 : (this.titleMode === q.AUTOHIDE_TITLE && t, !0);
  }
  /** Collapse the node to make it smaller on the canvas */
  collapse(t = !1) {
    this.graph._version++, !(this.collapsable === !1 && !t) && (this.flags.collapsed ? this.flags.collapsed = !1 : this.flags.collapsed = !0, this.setDirtyCanvas(!0, !0));
  }
  /** Forces the node to do not move or realign on Z */
  pin(t) {
    this.graph._version++, t === void 0 ? this.flags.pinned = !this.flags.pinned : this.flags.pinned = t;
  }
  localToScreen(t, e, s) {
    return [
      (t + this.pos[0]) * s.ds.scale + s.ds.offset[0],
      (e + this.pos[1]) * s.ds.scale + s.ds.offset[1]
    ];
  }
  getOptionalSlots() {
    return ct(this, "optionalSlots");
  }
};
let tt = ft;
tt.MAX_CONSOLE = 100;
function Tt() {
  let t = [];
  return t = t.concat(yt), t = t.concat([O.ACTION]), t = t.concat(h.slot_types_in.map((e) => e.toUpperCase())), t;
}
function Pt() {
  return Tt().map(W);
}
class X extends tt {
  constructor(e) {
    super(e), this.properties = {
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
      W(this.properties.type),
      this.setType.bind(this),
      { values: Pt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      W(this.properties.type),
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
  setName(e) {
    if (e === null || e === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (e = s.getValidGraphInputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let s = e;
    e === "-1" || e === "Action" ? s = O.ACTION : e === "-2" || e === "Event" ? s = O.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, s;
    return (s = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  /** ensures the type in the node output and the type in the associated graph input are the same */
  updateType() {
    const e = this.properties.type;
    this.typeWidget.value = W(e);
    const s = this.outputs[0];
    s.type !== e && (h.isValidConnection(s.type, e) || this.disconnectOutput(0), s.type = e), e === "array" ? s.shape = S.GRID_SHAPE : e === O.EVENT || e === O.ACTION ? s.shape = S.BOX_SHAPE : s.shape = S.DEFAULT, e === "number" ? (this.valueWidget.type = "number", this.valueWidget.value = 0) : e === "boolean" ? (this.valueWidget.type = "toggle", this.valueWidget.value = !0) : e === "string" ? (this.valueWidget.type = "text", this.valueWidget.value = "") : (this.valueWidget.type = null, this.valueWidget.value = null), this.properties.value = this.valueWidget.value, this.graph && this.nameInGraph && bt(e) ? (this.graph.changeInputType(this.nameInGraph, e), s.type !== e && this.setOutputDataType(0, e)) : console.error("[GraphInput] Can't change output to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, s) {
    if (e === "name") {
      if (s === "" || s === this.nameInGraph || s === "enabled")
        return !1;
      this.graph && (this.nameInGraph ? this.graph.renameInput(this.nameInGraph, s) : this.graph.addInput(s, `${this.properties.type}`, null)), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      e === "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, s) {
    this.properties.type === O.EVENT && this.triggerSlot(0, s);
  }
  onExecute() {
    const e = this.properties.name, s = this.graph.inputs[e];
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
X.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
h.registerNodeType({
  class: X,
  title: "Input",
  desc: "Input of the graph",
  type: "graph/input",
  hide_in_node_lists: !0
});
function Et() {
  let t = [];
  return t = t.concat(yt), t = t.concat([O.EVENT]), t = t.concat(h.slot_types_out), t;
}
function Rt() {
  return Et().map(W);
}
class V extends tt {
  constructor(e) {
    super(e), this.properties = {
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
      W(this.properties.type),
      this.setType.bind(this),
      { values: Rt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      W(this.properties.type),
      this.setType.bind(this)
    ), this.widgets_up = !0;
  }
  setName(e) {
    if (e === null || e === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (e = s.getValidGraphOutputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let s = e;
    e === "-1" || e === "Action" ? s = O.ACTION : e === "-2" || e === "Event" ? s = O.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, s;
    return (s = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  updateType() {
    let e = this.properties.type;
    const s = this.inputs[0];
    this.typeWidget && (this.typeWidget.value = W(e)), e === "array" ? s.shape = S.GRID_SHAPE : e === O.EVENT || e === O.ACTION ? s.shape = S.BOX_SHAPE : s.shape = S.DEFAULT, s.type !== e && ((e === "action" || e === "event") && (e = O.EVENT), h.isValidConnection(s.type, e) || this.disconnectInput(0), s.type = e), this.graph && this.nameInGraph && bt(e) ? (this.graph.changeOutputType(this.nameInGraph, e), s.type !== e && this.setInputDataType(0, e)) : console.error("Can't change GraphOutput to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, s) {
    if (e === "name") {
      if (s === "" || s === this.nameInGraph || s === "enabled")
        return !1;
      this.graph ? this.nameInGraph ? this.graph.renameOutput(this.nameInGraph, s) : this.graph.addOutput(s, `${this.properties.type}`, null) : console.error("[GraphOutput] missing graph!", e, s), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      e === "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, s, n) {
    const i = this.getParentSubgraph();
    if (!i)
      return;
    const o = i.findOutputSlotIndexByName(this.properties.name);
    o === null || i.outputs[o] === null || i.triggerSlot(o, s);
  }
  onExecute() {
    const e = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, e);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeOutput(this.nameInGraph);
  }
}
V.slotLayout = {
  inputs: [
    { name: "", type: "" }
  ],
  outputs: []
};
h.registerNodeType({
  class: V,
  title: "Output",
  desc: "Output of the graph",
  type: "graph/output",
  hide_in_node_lists: !0
});
var Mt = /* @__PURE__ */ ((t) => (t[t.STATUS_STOPPED = 1] = "STATUS_STOPPED", t[t.STATUS_RUNNING = 2] = "STATUS_RUNNING", t))(Mt || {});
const Nt = class {
  constructor(t) {
    this.supported_types = null, this.vars = {}, this.extra = {}, this.inputs = {}, this.outputs = {}, this.links = {}, this.list_of_graphcanvas = [], this._nodes = [], this._groups = [], this._nodes_by_id = {}, this._nodes_executable = null, this._nodes_in_order = [], this._version = -1, this._last_trigger_time = 0, this._is_subgraph = !1, this._subgraph_node = null, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.execution_timer_id = -1, this.execution_time = 0, this.errors_in_execution = !1, h.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
  }
  getSupportedTypes() {
    return this.supported_types || Nt.DEFAULT_SUPPORTED_TYPES;
  }
  /*
     * Gets the root graph above any subgraphs.
     */
  getRootGraph() {
    const t = Array.from(this.iterateParentGraphs()), e = t[t.length - 1];
    return e._is_subgraph ? null : e;
  }
  *iterateParentGraphs() {
    var e;
    let t = this;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  /** Removes all nodes from this graph */
  clear() {
    if (this.stop(), this.status = 1, this.last_node_id = 0, this.last_link_id = 0, this._version = -1, this._nodes)
      for (let t = 0; t < this._nodes.length; ++t) {
        const e = this._nodes[t];
        e.onRemoved && e.onRemoved();
      }
    this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._groups = [], this.links = {}, this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = 0.01, this.elapsed_time = 0.01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.inputs = {}, this.outputs = {}, this.change(), this.sendActionToCanvas("clear");
  }
  /** Attach Canvas to this graph */
  attachCanvas(t) {
    if (!(t instanceof b))
      throw "attachCanvas expects a LGraphCanvas instance";
    t.graph && t.graph !== this && t.graph.detachCanvas(t), t.graph = this, this.list_of_graphcanvas || (this.list_of_graphcanvas = []), this.list_of_graphcanvas.push(t);
  }
  /** Detach Canvas to this graph */
  detachCanvas(t) {
    if (!this.list_of_graphcanvas)
      return;
    const e = this.list_of_graphcanvas.indexOf(t);
    e !== -1 && (t.graph = null, this.list_of_graphcanvas.splice(e, 1));
  }
  /**
   * Starts running this graph every interval millisecond.
   * @param interval amount of milliseconds between executions, if zero then it renders to the monitor refresh rate
   */
  start(t) {
    if (this.status === 2)
      return;
    this.status = 2, this.onPlayEvent && this.onPlayEvent(), this.sendEventToAllNodes("onStart"), this.starttime = h.getTime(), this.last_update_time = this.starttime, t = t || 0;
    const e = this;
    if (t === 0 && typeof window < "u" && window.requestAnimationFrame) {
      let s = function() {
        e.execution_timer_id === -1 && (window.requestAnimationFrame(s), e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep());
      };
      this.execution_timer_id = -1, s();
    } else
      this.execution_timer_id = setInterval(() => {
        e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep();
      }, t);
  }
  /** Stops the execution loop of the graph */
  stop() {
    this.status !== 1 && (this.status = 1, this.onStopEvent && this.onStopEvent(), this.execution_timer_id !== null && (this.execution_timer_id !== -1 && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
  }
  /**
   * Run N steps (cycles) of the graph
   * @param num number of steps to run, default is 1
   * @param do_not_catch_errors if you want to try/catch errors
   * @param limit
   */
  runStep(t = 1, e = !1, s) {
    const n = h.getTime();
    this.globaltime = 1e-3 * (n - this.starttime);
    const i = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (!i)
      return;
    if (s = s || i.length, e) {
      for (let a = 0; a < t; a++) {
        for (let r = 0; r < s; ++r) {
          const c = i[r];
          c.mode === Y.ALWAYS && c.onExecute && c.doExecute();
        }
        this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
      }
      this.onAfterExecute && this.onAfterExecute();
    } else
      try {
        for (let a = 0; a < t; a++) {
          for (let r = 0; r < s; ++r) {
            const c = i[r];
            c.mode === Y.ALWAYS && c.onExecute && c.onExecute(null, {});
          }
          this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
        }
        this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
      } catch (a) {
        if (this.errors_in_execution = !0, h.throw_errors)
          throw a;
        h.debug && console.log(`Error during execution: ${a}`), this.stop();
      }
    const o = h.getTime();
    let l = o - n;
    l === 0 && (l = 1), this.execution_time = 1e-3 * l, this.globaltime += 1e-3 * l, this.iteration += 1, this.elapsed_time = (o - this.last_update_time) * 1e-3, this.last_update_time = o, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
  }
  /**
   * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
   * nodes with only inputs.)
   */
  updateExecutionOrder() {
    this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];
    for (let t = 0; t < this._nodes_in_order.length; ++t)
      if (this._nodes_in_order[t].onExecute) {
        const e = this._nodes_in_order[t];
        this._nodes_executable.push(e);
      }
  }
  *computeExecutionOrderRecursive(t = !1, e) {
    for (const s of this.computeExecutionOrder(t, e))
      if (yield s, s.is(Z))
        for (const n of s.subgraph.computeExecutionOrderRecursive(t, e))
          yield n;
  }
  /** This is more internal, it computes the executable nodes in order and returns it */
  computeExecutionOrder(t = !1, e) {
    let s = [];
    const n = [], i = {}, o = {}, l = {};
    for (let r = 0, c = this._nodes.length; r < c; ++r) {
      const d = this._nodes[r];
      if (t && !d.onExecute)
        continue;
      i[d.id] = d;
      let u = 0;
      if (d.inputs)
        for (let _ = 0, m = d.inputs.length; _ < m; _++)
          d.inputs[_] && d.inputs[_].link !== null && (u += 1);
      u === 0 ? (n.push(d), e && (d._level = 1)) : (e && (d._level = 0), l[d.id] = u);
    }
    for (; n.length !== 0; ) {
      const r = n.shift();
      if (s.push(r), delete i[r.id], !!r.outputs)
        for (let c = 0; c < r.outputs.length; c++) {
          const d = r.outputs[c];
          if (!(d === null || d.links === null || d.links.length === 0))
            for (let u = 0; u < d.links.length; u++) {
              const _ = d.links[u], m = this.links[_];
              if (!m || o[m.id])
                continue;
              const p = this.getNodeById(m.target_id);
              if (p === null) {
                o[m.id] = !0;
                continue;
              }
              e && (!p._level || p._level <= r._level) && (p._level = r._level + 1), o[m.id] = !0, l[p.id] -= 1, l[p.id] === 0 && n.push(p);
            }
        }
    }
    for (const r of Object.keys(i).sort())
      s.push(i[r]);
    s.length !== this._nodes.length && h.debug && console.warn("something went wrong, nodes missing");
    const a = s.length;
    for (let r = 0; r < a; ++r)
      s[r].order = r;
    s = s.sort((r, c) => {
      const d = r.constructor.priority || r.priority || 0, u = c.constructor.priority || c.priority || 0;
      return d === u ? r.order - c.order : d - u;
    });
    for (let r = 0; r < a; ++r)
      s[r].order = r;
    return s;
  }
  /**
   * Returns all the nodes that could affect this one (ancestors) by crawling all the inputs recursively.
   * It doesn't include the node itself
   * @return an array with all the LGraphNodes that affect this node, in order of execution
   */
  getAncestors(t) {
    const e = [], s = [t], n = {};
    for (; s.length; ) {
      const i = s.shift();
      if (i.inputs) {
        !n[i.id] && i !== t && (n[i.id] = !0, e.push(i));
        for (let o = 0; o < i.inputs.length; ++o) {
          const l = i.getInputNode(o);
          l && !e.includes(l) && s.push(l);
        }
      }
    }
    return e.sort((i, o) => i.order - o.order), e;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(t = 100, e = st.HORIZONTAL_LAYOUT) {
    const s = this.computeExecutionOrder(!1, !0), n = [];
    for (let o = 0; o < s.length; ++o) {
      const l = s[o], a = l._level || 1;
      n[a] || (n[a] = []), n[a].push(l);
    }
    let i = t;
    for (let o = 0; o < n.length; ++o) {
      const l = n[o];
      if (!l)
        continue;
      let a = 100, r = t + h.NODE_TITLE_HEIGHT;
      for (let c = 0; c < l.length; ++c) {
        const d = l[c];
        d.pos[0] = e === st.VERTICAL_LAYOUT ? r : i, d.pos[1] = e === st.VERTICAL_LAYOUT ? i : r;
        const u = e === st.VERTICAL_LAYOUT ? 1 : 0;
        d.size[u] > a && (a = d.size[u]);
        const _ = e === st.VERTICAL_LAYOUT ? 0 : 1;
        r += d.size[_] + t + h.NODE_TITLE_HEIGHT;
      }
      i += a + t;
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
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      yield e;
  }
  /**
   * Iterates all nodes in this graph and subgraphs.
   */
  *iterateNodesInOrderRecursive() {
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      if (yield e, e.subgraph !== null)
        for (const s of e.subgraph.iterateNodesInOrderRecursive())
          yield s;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClass(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e !== null)
      for (const s of this.iterateNodesInOrder())
        s.type === e && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClassRecursive(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e !== null)
      for (const s of this.iterateNodesInOrderRecursive())
        s.type === e && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfTypeRecursive(t) {
    for (const e of this.iterateNodesInOrderRecursive())
      e.type === t && (yield e);
  }
  /**
   * Sends an event to all the nodes, useful to trigger stuff
   * @param eventName the name of the event (function to be called)
   * @param params parameters in array format
   * @param mode node mode
   */
  sendEventToAllNodes(t, e = [], s = Y.ALWAYS) {
    if (this._nodes_in_order ? this._nodes_in_order : this._nodes)
      for (const i of this.iterateNodesInOrder()) {
        if (i.type === "basic/subgraph" && t !== "onExecute") {
          i.mode === s && i.sendEventToAllNodes(t, e, s);
          continue;
        }
        !i[t] || i.mode !== s || (e === void 0 ? i[t]() : e && e.constructor === Array ? i[t].apply(i, e) : i[t](e));
      }
  }
  sendActionToCanvas(t, e = []) {
    if (this.list_of_graphcanvas)
      for (let s = 0; s < this.list_of_graphcanvas.length; ++s) {
        const n = this.list_of_graphcanvas[s];
        n[t] && n[t].apply(n, e);
      }
  }
  addGroup(t) {
    return this._groups.push(t), this.setDirtyCanvas(!0), this.change(), t.graph = this, this._version++, t;
  }
  /**
   * Adds a new node instance to this graph
   * @param node the instance of the node
   * @param options
   */
  add(t, e = {}) {
    if (console.log(t.id, this._nodes_by_id[t.id]), t.id !== -1 && this._nodes_by_id[t.id] && (console.warn(
      `LiteGraph：已经有一个节点具有此ID，请修改它：${t.id}`
    ), h.use_uuids ? t.id = Q() : t.id = ++this.last_node_id), e.pos && (isNaN(e.pos[0]) || isNaN(e.pos[1])))
      throw "LiteGraph: Node position contained NaN(s)!";
    if (this._nodes.length >= h.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return h.use_uuids ? t.id || (t.id = Q()) : t.id === null || t.id === -1 ? t.id = ++this.last_node_id : this.last_node_id < t.id && (this.last_node_id = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, e.pos && (t.pos = e.pos), t.onAdded && t.onAdded(this), this.config.align_to_grid && t.alignToGrid(), e.skipComputeOrder || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(t, e), this.setDirtyCanvas(!0), this.change(), t;
  }
  /** Removes a node from the graph */
  remove(t, e = {}) {
    if (t instanceof ht) {
      const n = this._groups.indexOf(t);
      n !== -1 && this._groups.splice(n, 1), t.graph = null, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[t.id] === null || t.ignore_remove)
      return;
    if (this.beforeChange(), t.inputs)
      for (let n = 0; n < t.inputs.length; n++)
        t.inputs[n].link !== null && t.disconnectInput(n);
    if (t.outputs)
      for (let n = 0; n < t.outputs.length; n++) {
        const i = t.outputs[n];
        i.links !== null && i.links.length && t.disconnectOutput(n);
      }
    if (t.onRemoved && t.onRemoved(e), t.graph = null, this._version++, this.list_of_graphcanvas)
      for (let n = 0; n < this.list_of_graphcanvas.length; ++n) {
        const i = this.list_of_graphcanvas[n];
        i.selected_nodes[t.id] && delete i.selected_nodes[t.id], i.node_dragged === t && (i.node_dragged = null);
      }
    const s = this._nodes.indexOf(t);
    s !== -1 && this._nodes.splice(s, 1), delete this._nodes_by_id[t.id], this.onNodeRemoved && this.onNodeRemoved(t, e), this.sendActionToCanvas("checkPanels"), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
  }
  /** Returns a node by its id. */
  getNodeById(t) {
    return t === null ? null : this._nodes_by_id[t];
  }
  /** Returns a node by its id. */
  getNodeByIdRecursive(t) {
    const e = this.getNodeById(t);
    if (e !== null)
      return e;
    for (const s of this.iterateNodesOfClass(Z)) {
      const n = s.subgraph.getNodeByIdRecursive(t);
      if (n)
        return n;
    }
    return null;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param type the class itself (not a string)
   * @param result
   * @return a list with all the nodes of this type
   */
  findNodesByClass(t, e = []) {
    e.length = 0;
    for (const s of this.iterateNodesOfClass(t))
      e.push(s);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @param result
   * @return a list with all the nodes of this type
   */
  findNodesByType(t, e = []) {
    t = t.toLowerCase(), e.length = 0;
    for (let s = 0, n = this._nodes.length; s < n; ++s)
      this._nodes[s].type.toLowerCase() === t && e.push(this._nodes[s]);
    return e;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param type the class itself (not a string)
   * @param result
   * @return a list with all the nodes of this type
   */
  findNodesByClassRecursive(t, e = []) {
    e.length = 0;
    for (const s of this.iterateNodesOfClassRecursive(t))
      e.push(s);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @param result
   * @return a list with all the nodes of this type
   */
  findNodesByTypeRecursive(t, e = []) {
    t = t.toLowerCase(), e.length = 0;
    for (const s of this.iterateNodesOfTypeRecursive(t))
      e.push(s);
    return e;
  }
  /**
   * Returns the first node that matches a name in its title
   * @param title the name of the node to search
   * @return the node or null
   */
  findNodeByTitle(t) {
    for (let e = 0, s = this._nodes.length; e < s; ++e)
      if (this._nodes[e].title === t)
        return this._nodes[e];
    return null;
  }
  /**
   * Returns a list of nodes that matches a name
   * @param title the name of the node to search
   * @return a list with all the nodes with this name
   */
  findNodesByTitle(t) {
    const e = [];
    for (let s = 0, n = this._nodes.length; s < n; ++s)
      this._nodes[s].title === t && e.push(this._nodes[s]);
    return e;
  }
  /**
   * Returns the top-most node in this position of the canvas
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @param nodesList a list with all the nodes to search from, by default is all the nodes in the graph
   * @param margin
   * @return the node at this position or null
   */
  getNodeOnPos(t, e, s, n) {
    s = s || this._nodes;
    const i = null;
    for (let o = s.length - 1; o >= 0; o--) {
      const l = s[o], a = l.titleMode === q.NO_TITLE;
      if (l.isPointInside(t, e, n, a))
        return l;
    }
    return i;
  }
  /**
   * Returns the top-most group in that position
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @return the group or null
   */
  getGroupOnPos(t, e) {
    for (let s = this._groups.length - 1; s >= 0; s--) {
      const n = this._groups[s];
      if (n.isPointInside(t, e, 2, !0))
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
    let t = !1;
    for (let e = 0; e < this._nodes.length; e++) {
      const s = this._nodes[e], n = h.registered_node_types[s.type];
      if (s.constructor === n.class)
        continue;
      console.log(`node being replaced by newer version: ${s.type}`);
      const i = h.createNode(s.type);
      t = !0, this._nodes[e] = i, i.configure(s.serialize()), i.graph = this, this._nodes_by_id[i.id] = i, s.inputs && (i.inputs = s.inputs.concat()), s.outputs && (i.outputs = s.outputs.concat());
    }
    return this.updateExecutionOrder(), t;
  }
  // ********** GLOBALS *****************
  onAction(t, e, s = {}) {
    for (const n of this.iterateNodesOfClass(X))
      if (n.properties.name === t) {
        n.actionDo(t, e, s);
        break;
      }
  }
  trigger(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  triggerSlot(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  /** Tell this graph it has a global graph input of this type */
  addInput(t, e, s) {
    this.inputs[t] || (this.beforeChange(), this.inputs[t] = { name: t, type: e, value: s }, this._version++, this.afterChange(), this.onInputAdded && this.onInputAdded(t, e, s), this.onInputsOutputsChange && this.onInputsOutputsChange());
  }
  /** Assign a data to the global graph input */
  setInputData(t, e) {
    const s = this.inputs[t];
    s && (s.value = e);
  }
  /** Returns the current value of a global graph input */
  getInputData(t) {
    const e = this.inputs[t];
    return e ? e.value : null;
  }
  /** Changes the name of a global graph input */
  renameInput(t, e) {
    if (e !== t)
      return this.inputs[t] ? this.inputs[e] ? (console.error("there is already one input with that name"), !1) : (this.inputs[e] = this.inputs[t], delete this.inputs[t], this._version++, this.onInputRenamed && this.onInputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of global graph input */
  changeInputType(t, e) {
    if (!this.inputs[t])
      return !1;
    if (this.inputs[t].type && String(this.inputs[t].type).toLowerCase() === String(e).toLowerCase())
      return;
    const s = this.inputs[t].type;
    return this.inputs[t].type = e, this._version++, this.onInputTypeChanged && this.onInputTypeChanged(t, s, e), !0;
  }
  /** Removes a global graph input */
  removeInput(t) {
    return this.inputs[t] ? (delete this.inputs[t], this._version++, this.onInputRemoved && this.onInputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Creates a global graph output */
  addOutput(t, e, s) {
    this.outputs[t] = { name: t, type: e, value: s }, this._version++, this.onOutputAdded && this.onOutputAdded(t, e, s), this.onInputsOutputsChange && this.onInputsOutputsChange();
  }
  /** Assign data to the global output */
  setOutputData(t, e) {
    const s = this.outputs[t];
    s && (s.value = e);
  }
  /** Returns the current value of a global graph output */
  getOutputData(t) {
    const e = this.outputs[t];
    return e ? e.value : null;
  }
  /** Renames a global graph output */
  renameOutput(t, e) {
    return this.outputs[t] ? this.outputs[e] ? (console.error("there is already one output with that name"), !1) : (this.outputs[e] = this.outputs[t], delete this.outputs[t], this._version++, this.onOutputRenamed && this.onOutputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of global graph output */
  changeOutputType(t, e) {
    if (!this.outputs[t])
      return !1;
    if (this.outputs[t].type && String(this.outputs[t].type).toLowerCase() === String(e).toLowerCase())
      return;
    const s = this.outputs[t].type;
    return this.outputs[t].type = e, this._version++, this.onOutputTypeChanged && this.onOutputTypeChanged(t, s, e), !0;
  }
  /** Removes a global graph output */
  removeOutput(t) {
    return this.outputs[t] ? (delete this.outputs[t], this._version++, this.onOutputRemoved && this.onOutputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /* TODO implement
      triggerInput(name: string, value: any): void {
          let nodes = this.findNodesByTitle(name);
          for (let i = 0; i < nodes.length; ++i) {
              nodes[i].onTrigger(value);
          }
      }
  
      setCallback(name: string, func: (...args: any[]) => any): void {
          let nodes = this.findNodesByTitle(name);
          for (let i = 0; i < nodes.length; ++i) {
              nodes[i].setTrigger(func);
          }
      }
      */
  /** used for undo, called before any change is made to the graph */
  beforeChange(t) {
    this.onBeforeChange && this.onBeforeChange(this, t), this.sendActionToCanvas("onBeforeChange", [this]);
  }
  /** used to resend actions, called after any change is made to the graph */
  afterChange(t) {
    this.onAfterChange && this.onAfterChange(this, t), this.sendActionToCanvas("onAfterChange", [this]);
  }
  connectionChange(t, e) {
    this.updateExecutionOrder(), this.onConnectionChange && this.onConnectionChange(t), this._version++, this.sendActionToCanvas("onConnectionChange");
  }
  /** returns if the graph is in live mode */
  isLive() {
    if (!this.list_of_graphcanvas)
      return !1;
    for (let t = 0; t < this.list_of_graphcanvas.length; ++t)
      if (this.list_of_graphcanvas[t].live_mode)
        return !0;
    return !1;
  }
  /** clears the triggered slot animation in all links (stop visual animation) */
  clearTriggeredSlots() {
    for (const t in this.links) {
      const e = this.links[t];
      e && e._last_time && (e._last_time = 0);
    }
  }
  /* Called when something visually changed (not the graph!) */
  change() {
    h.debug && console.log("Graph changed"), this.sendActionToCanvas("setDirty", [!0, !0]), this.onChange && this.onChange(this);
  }
  setDirtyCanvas(t = !1, e = !1) {
    this.sendActionToCanvas("setDirty", [t, e]);
  }
  /** Destroys a link */
  removeLink(t) {
    const e = this.links[t];
    if (!e)
      return;
    const s = this.getNodeById(e.target_id);
    s && s.disconnectInput(e.target_slot);
  }
  /** Creates an Object containing all the info about this graph; it can be serialized */
  serialize() {
    const t = [];
    for (let i = 0, o = this._nodes.length; i < o; ++i)
      t.push(this._nodes[i].serialize());
    const e = [];
    for (const i in this.links) {
      let o = this.links[i];
      if (!o.serialize) {
        console.error(
          "weird LLink bug, link info is not a LLink but a regular object",
          o
        );
        const l = it.configure(o);
        for (const a in o)
          l[a] = o[a];
        this.links[i] = l, o = l;
      }
      e.push(o.serialize());
    }
    const s = [];
    for (let i = 0; i < this._groups.length; ++i)
      s.push(this._groups[i].serialize());
    const n = {
      last_node_id: this.last_node_id,
      last_link_id: this.last_link_id,
      nodes: t,
      links: e,
      groups: s,
      config: this.config,
      extra: this.extra,
      version: h.VERSION
    };
    return this.onSerialize && this.onSerialize(n), n;
  }
  /**
   * Configure a graph from a JSON string
   * @param data configure a graph from a JSON string
   * @param keep_old
   * @returns if there was any error parsing
   */
  configure(t, e) {
    if (!t)
      return;
    e || this.clear();
    const s = t.nodes;
    if (t.links && t.links.constructor === Array) {
      const i = [];
      for (let o = 0; o < t.links.length; ++o) {
        const l = t.links[o];
        if (!l) {
          console.warn("serialized graph link data contains errors, skipping.");
          continue;
        }
        const a = it.configure(l);
        i[a.id] = a;
      }
      t.links = i;
    }
    for (const i in t)
      i === "nodes" || i === "groups" || (this[i] = t[i]);
    let n = !1;
    if (this._nodes = [], s) {
      for (let i = 0, o = s.length; i < o; ++i) {
        const l = s[i];
        let a = h.createNode(l.type, l.title);
        a || (console.error(
          `Node not found or has errors: ${l.type}`
        ), a = new tt(), a.last_serialization = l, a.has_errors = !0, n = !0), a.id = l.id, this.add(a, { addedBy: "configure", skipComputeOrder: !0 });
      }
      for (let i = 0, o = s.length; i < o; ++i) {
        const l = s[i], a = this.getNodeById(l.id);
        a && a.configure(l);
      }
    }
    if (this._groups.length = 0, t.groups)
      for (let i = 0; i < t.groups.length; ++i) {
        const o = new ht();
        o.configure(t.groups[i]), this.addGroup(o);
      }
    return this.updateExecutionOrder(), this.extra = t.extra || {}, this.onConfigure && this.onConfigure(t), this._version++, this.setDirtyCanvas(!0, !0), n;
  }
  load(t, e) {
    const s = this;
    if (t.constructor === File || t.constructor === Blob) {
      const i = new FileReader();
      i.addEventListener("load", (o) => {
        const l = JSON.parse(i.result);
        s.configure(l), e && e(l);
      }), i.readAsText(t);
      return;
    }
    const n = new XMLHttpRequest();
    n.open("GET", t, !0), n.send(null), n.onload = function(i) {
      if (n.status !== 200) {
        console.error("Error loading graph:", n.status, n.response);
        return;
      }
      const o = JSON.parse(n.response);
      s.configure(o), e && e(o);
    }, n.onerror = function(i) {
      console.error("Error loading graph:", i);
    };
  }
};
let Ot = Nt;
Ot.DEFAULT_SUPPORTED_TYPES = ["number", "string", "boolean"];
function kt(t) {
  const e = { nodeIDs: {}, linkIDs: {} };
  for (const s of t.nodes) {
    const n = s.id, i = Q();
    if (s.id = i, e.nodeIDs[n] || e.nodeIDs[i])
      throw new Error(`New/old node UUID wasn't unique in changed map! ${n} ${i}`);
    e.nodeIDs[n] = i, e.nodeIDs[i] = n;
  }
  for (const s of t.links) {
    const n = s[0], i = Q();
    if (s[0] = i, e.linkIDs[n] || e.linkIDs[i])
      throw new Error(`New/old link UUID wasn't unique in changed map! ${n} ${i}`);
    e.linkIDs[n] = i, e.linkIDs[i] = n;
    const o = s[1], l = s[3];
    if (!e.nodeIDs[o])
      throw new Error(`Old node UUID not found in mapping! ${o}`);
    if (s[1] = e.nodeIDs[o], !e.nodeIDs[l])
      throw new Error(`Old node UUID not found in mapping! ${l}`);
    s[3] = e.nodeIDs[l];
  }
  for (const s of t.nodes) {
    for (const n of s.inputs)
      n.link && (n.link = e.linkIDs[n.link]);
    for (const n of s.outputs)
      n.links && (n.links = n.links.map((i) => e.linkIDs[i]));
  }
  for (const s of t.nodes)
    if (s.type === "graph/subgraph") {
      const n = kt(s.subgraph);
      e.nodeIDs = { ...e.nodeIDs, ...n.nodeIDs }, e.linkIDs = { ...e.linkIDs, ...n.linkIDs };
    }
  return e;
}
function Gt(t, e) {
  for (const s of t.iterateNodesInOrderRecursive())
    s.onReassignID && s.onReassignID(e);
}
const It = class extends tt {
  constructor(t, e) {
    super(t), this.properties = {
      enabled: !0
    }, this.size = [140, 80], this.enabled = !0, this.subgraph = (e || It.default_lgraph_factory)(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0;
    const s = (n, i) => {
      const o = i.bind(this);
      return function(...l) {
        n == null || n.apply(this, l), o(...l);
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
    var e;
    let t = this.graph;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  onDblClick(t, e, s) {
    const n = this;
    setTimeout(() => {
      s.openSubgraph(n.subgraph);
    }, 10);
  }
  onAction(t, e, s) {
    const { originNode: n, link: i } = s;
    if (!n || !i)
      return;
    const o = i.target_slot;
    this.getInnerGraphInputByIndex(o).triggerSlot(0, e);
  }
  onExecute() {
    if (this.enabled = this.getInputOrProperty("enabled"), !!this.enabled) {
      if (this.inputs)
        for (let t = 0; t < this.inputs.length; t++) {
          const e = this.inputs[t], s = this.getInputData(t);
          this.subgraph.setInputData(e.name, s);
        }
      if (this.subgraph.runStep(), this.outputs)
        for (let t = 0; t < this.outputs.length; t++) {
          const e = this.outputs[t], s = this.subgraph.getOutputData(e.name);
          this.setOutputData(t, s);
        }
    }
  }
  sendEventToAllNodes(t, e, s) {
    this.enabled && this.subgraph.sendEventToAllNodes(t, e, s);
  }
  onDrawBackground(t, e, s, n) {
  }
  // override onMouseDown(e, localpos, graphcanvas)
  // {
  // 	let y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  // 	if(localpos[1] > y)
  // 	{
  // 		graphcanvas.showSubgraphPropertiesDialog(this);
  // 	}
  // }
  // override onMouseDown(e: MouseEventExt, localpos: Vector2, graphcanvas: LGraphCanvas): boolean | undefined {
  //     let y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
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
    const t = this.inputs ? this.inputs.length : 0, e = this.outputs ? this.outputs.length : 0;
    return [200, Math.max(t, e) * h.NODE_SLOT_HEIGHT + h.NODE_SLOT_HEIGHT * 0.5];
  }
  //* *** INPUTS ***********************************
  onSubgraphTrigger(t, e) {
  }
  onSubgraphNodeAdded(t, e) {
    var s, n;
    (s = this.graph) != null && s.onNodeAdded && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (n = this.graph) == null || n.onNodeAdded(t, e));
  }
  onSubgraphNodeRemoved(t, e) {
    var s, n;
    (s = this.graph) != null && s.onNodeRemoved && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (n = this.graph) == null || n.onNodeRemoved(t, e));
  }
  onSubgraphNewInput(t, e) {
    this.findInputSlotIndexByName(t) === -1 && this.addInput(t, e);
  }
  onSubgraphRenamedInput(t, e) {
    const s = this.findInputSlotIndexByName(t);
    if (s === -1)
      return;
    const n = this.getInputInfo(s);
    n.name = e;
  }
  onSubgraphTypeChangeInput(t, e, s) {
    const n = this.findInputSlotIndexByName(t);
    if (n === -1)
      return;
    const i = this.getInputInfo(n);
    i.type = s;
  }
  onSubgraphRemovedInput(t) {
    const e = this.findInputSlotIndexByName(t);
    e !== -1 && this.removeInput(e);
  }
  //* *** OUTPUTS ***********************************
  onSubgraphNewOutput(t, e) {
    this.findOutputSlotIndexByName(t) === -1 && this.addOutput(t, e);
  }
  onSubgraphRenamedOutput(t, e) {
    const s = this.findOutputSlotIndexByName(t);
    if (s === -1)
      return;
    const n = this.getOutputInfo(s);
    n.name = e;
  }
  onSubgraphTypeChangeOutput(t, e, s) {
    const n = this.findOutputSlotIndexByName(t);
    if (n === -1)
      return;
    const i = this.getOutputInfo(n);
    i.type = s;
  }
  onSubgraphRemovedOutput(t) {
    const e = this.findOutputSlotIndexByName(t);
    e !== -1 && this.removeOutput(e);
  }
  // *****************************************************
  getExtraMenuOptions(t, e) {
    const s = this;
    return [
      {
        content: "Open",
        callback() {
          t.openSubgraph(s.subgraph);
        }
      }
    ];
  }
  onResize(t) {
    console.error("TEST subgraph resize");
  }
  serialize() {
    const t = tt.prototype.serialize.call(this);
    return t.subgraph = this.subgraph.serialize(), t;
  }
  // no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()
  onConfigure(t) {
    super.onConfigure && super.onConfigure(t), this.subgraph._is_subgraph = !0, this.subgraph._subgraph_node = this;
    for (const e of this.subgraph.iterateNodesInOrder())
      (e.is(X) || e.is(V)) && (e.properties.subgraphID = this.id);
  }
  onReassignID() {
    for (const t of this.subgraph.iterateNodesInOrder())
      (t.is(X) || t.is(V)) && (t.properties.subgraphID = this.id);
  }
  clone(t = { forNode: {} }) {
    var i, o, l, a;
    const e = h.createNode(this.type), s = this.serialize();
    let n = null;
    if (h.use_uuids) {
      const r = h.cloneObject(s.subgraph);
      n = kt(r), s.subgraph = r;
    }
    return delete s.id, delete s.inputs, delete s.outputs, e.configure(s), h.use_uuids && Gt(e.subgraph, n), (i = t.forNode)[o = this.id] || (i[o] = {}), t.forNode[this.id].subgraphNewIDMapping = n, (l = t.forNode)[a = e.id] || (l[a] = {}), t.forNode[e.id].subgraphNewIDMapping = n, e;
  }
  buildFromNodes(t) {
    var v, y;
    if (t = t.filter((g) => !g.is(X) && !g.is(V)), t.length === 0)
      return;
    const e = {}, s = {}, n = {}, i = t.reduce((g, N) => (g[N.id] = N, g), {});
    let o = Number.MAX_SAFE_INTEGER, l = 0, a = Number.MAX_SAFE_INTEGER, r = 0;
    for (const g of Object.values(t))
      o = Math.min(g.pos[0], o), l = Math.max(g.pos[0] + g.size[0], l), a = Math.min(g.pos[1], a), r = Math.max(g.pos[1] + g.size[1], r);
    const c = {};
    for (const g of t) {
      c[g.id] = g;
      for (let N = 0; N < g.inputs.length; N++) {
        const E = g.getInputLink(N);
        if (E) {
          const T = g.getConnectionPos(!0, N), M = g.getInputInfo(N), F = g.getInputNode(N);
          F && (c[F.id] = F), i[E.origin_id] !== null ? n[E.id] = [E, T] : e[E.id] = [E, T, M.name];
        }
      }
      for (let N = 0; N < g.outputs.length; N++) {
        const E = g.getOutputLinks(N);
        for (const T of E) {
          const M = g.getConnectionPos(!1, N), F = g.getOutputInfo(N), I = g.graph.getNodeById(T.target_id);
          I && (c[I.id] = I), i[T.target_id] !== null ? n[T.id] = [T, M] : s[T.id] = [T, M, F.name];
        }
      }
    }
    const d = Object.values(e), u = Object.values(s);
    d.sort((g, N) => g[1][1] - N[1][1]), u.sort((g, N) => g[1][1] - N[1][1]), h.debug && (console.debug("NODES", Object.keys(t)), console.debug("IN", Object.keys(e)), console.debug("OUT", Object.keys(s)), console.debug("INNER", Object.keys(n)));
    const _ = {}, m = {};
    for (const g of t) {
      const N = [g.pos[0] - o, g.pos[1] - a], E = g.id;
      g.graph.remove(g, { removedBy: "moveIntoSubgraph" }), this.subgraph.add(g, { addedBy: "moveIntoSubgraph", prevNodeID: E }), g.pos = N, c[E] = g, c[g.id] = g;
    }
    let p = 0, f = 0;
    for (const [g, N, E] of d) {
      let T = null;
      if (_[g.origin_id] && (T = _[g.origin_id][g.origin_slot]), !T && (T = this.addGraphInput(E, g.type, [-200, p]), p += T.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !T)) {
        console.error("Failed creating subgraph output pair!", g);
        continue;
      }
      const M = c[g.origin_id], F = c[g.target_id];
      M.connect(g.origin_slot, this, T.outerInputIndex), T.innerNode.connect(0, F, g.target_slot), _[v = g.origin_id] || (_[v] = {}), _[g.origin_id][g.origin_slot] = T;
    }
    for (const [g, N, E] of u) {
      let T = null;
      if (m[g.target_id] && (T = m[g.target_id][g.target_slot]), !T && (T = this.addGraphOutput(E, g.type, [l - o + 200, f]), f += T.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !T)) {
        console.error("Failed creating subgraph output pair!", g);
        continue;
      }
      const M = c[g.origin_id], F = c[g.target_id];
      M.connect(g.origin_slot, T.innerNode, 0), this.connect(T.outerOutputIndex, F, g.target_slot), m[y = g.target_id] || (m[y] = {}), m[g.target_id][g.origin_slot] = T;
    }
    for (const [g, N] of Object.values(n)) {
      const E = c[g.origin_id], T = c[g.target_id];
      E.connect(g.origin_slot, T, g.target_slot);
    }
  }
  addGraphInput(t, e, s) {
    t = this.getValidGraphInputName(t);
    const n = h.createNode(X);
    if (n === null)
      return null;
    let i = e;
    e === O.EVENT ? i = O.ACTION : e === O.ACTION && (e = O.EVENT), console.warn("[Subgraph] addGraphInput", t, e, i, s), n.setProperty("name", t), n.setProperty("type", e), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const o = n.computeSize();
    s && (n.pos = [s[0] - o[0] * 0.5, s[1] - o[1] * 0.5]), this.subgraph.addInput(t, i, null);
    const l = this.inputs.length - 1, a = this.inputs[l];
    return { innerNode: n, outerInput: a, outerInputIndex: l };
  }
  addGraphOutput(t, e, s) {
    t = this.getValidGraphOutputName(t);
    const n = h.createNode(V);
    if (n === null)
      return null;
    let i = e;
    e === O.EVENT ? e = O.ACTION : e === O.ACTION && (i = O.EVENT), console.warn("[Subgraph] addGraphOutput", t, e, i, s), n.setProperty("name", t), n.setProperty("type", e), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const o = n.computeSize();
    s && (n.pos = [s[0], s[1] - o[1] * 0.5]), this.subgraph.addOutput(t, i, null);
    const l = this.outputs.length - 1, a = this.outputs[l];
    return { innerNode: n, outerOutput: a, outerOutputIndex: l };
  }
  removeGraphInput(t) {
    if (this.findInputSlotIndexByName(t) === null) {
      console.error("[Subgraph] No input in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(X).filter((n) => n.properties.name === t);
    if (s.length > 0)
      for (const n of s)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphInputs found on input removal", t);
      const n = this.findInputSlotIndexByName(t);
      n !== -1 && this.removeInput(n);
    }
  }
  removeGraphOutput(t) {
    if (this.findOutputSlotIndexByName(t) === null) {
      console.error("[Subgraph] No output in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(V).filter((n) => n.properties.name === t);
    if (s.length > 0)
      for (const n of s)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphOutputs found on output removal", t);
      const n = this.findOutputSlotIndexByName(t);
      n !== -1 && this.removeOutput(n);
    }
  }
  getValidGraphInputName(t) {
    t || (t = "newInput");
    let e = t, s = this.getInnerGraphInput(e), n = 1;
    for (; s !== null; )
      e = `${t}_${n++}`, s = this.getInnerGraphInput(e);
    return e;
  }
  getValidGraphOutputName(t) {
    t || (t = "newOutput");
    let e = t, s = this.getInnerGraphOutput(e), n = 1;
    for (; s !== null; )
      e = `${t}_${n++}`, s = this.getInnerGraphOutput(e);
    return e;
  }
  getInnerGraphOutput(t) {
    return this.subgraph._nodes.find((s) => s.is(V) && s.properties.name === t) || null;
  }
  getInnerGraphInput(t) {
    return this.subgraph._nodes.find((s) => s.is(X) && s.properties.name === t) || null;
  }
  getInnerGraphOutputByIndex(t) {
    const e = this.getOutputInfo(t);
    return e ? this.getInnerGraphOutput(e.name) : null;
  }
  getInnerGraphInputByIndex(t) {
    const e = this.getInputInfo(t);
    return e ? this.getInnerGraphInput(e.name) : null;
  }
  moveNodesToParentGraph(t) {
    if (t = t.filter((p) => !p.is(X) && !p.is(V)), t.length === 0)
      return;
    const e = this, s = e.graph;
    let n = Number.MAX_SAFE_INTEGER, i = 0, o = Number.MAX_SAFE_INTEGER, l = 0;
    for (const p of Object.values(t))
      n = Math.min(p.pos[0], n), i = Math.max(p.pos[0] + p.size[0], i), o = Math.min(p.pos[1], o), l = Math.max(p.pos[1] + p.size[1], l);
    const a = i - n, r = l - o, c = e.pos[0] + e.size[0] / 2 - a / 2, d = e.pos[1] + e.size[1] / 2 - r / 2, u = {}, _ = {};
    for (const [p, f] of t.entries())
      _[f.id] = f;
    for (const p of t)
      for (const f of p.iterateAllLinks()) {
        const v = f.target_id === p.id, y = p.getConnectionPos(v, v ? f.target_slot : f.origin_slot);
        _[f.origin_id] !== null && _[f.target_id] !== null && (u[f.id] = [f, y]);
      }
    const m = {};
    for (const [p, f] of t.entries()) {
      const v = [f.pos[0] - n + c, f.pos[1] - o + d], y = f.id;
      f.graph.remove(f, { removedBy: "moveOutOfSubgraph" }), s.add(f, { addedBy: "moveOutOfSubgraph", prevNodeID: y }), f.pos = v, m[y] = f;
    }
    for (const [p, f] of Object.values(u)) {
      const v = _[p.origin_id], y = _[p.target_id];
      v.connect(p.origin_slot, y, p.target_slot);
    }
    return m;
  }
  convertNodesToSubgraphInputs(t) {
    var a;
    if (t = t.filter((r) => !r.is(X) && !r.is(V)), t.length === 0)
      return;
    const e = ut(t, (r) => r.id), s = [], n = {}, i = this.subgraph;
    for (const r of t)
      for (const c of r.iterateAllLinks()) {
        if (e[c.origin_id] === null)
          throw new Error("Can't convert to input with an origin link outward");
        if (e[c.target_id] === null) {
          s.push(c);
          const d = [0, 0];
          r.getConnectionPos(!1, c.target_slot, d), n[r.id] = [[r.pos[0], r.pos[1]], d];
        }
      }
    const o = this.moveNodesToParentGraph(t), l = {};
    for (const r of s) {
      const c = i.getNodeById(r.target_id), d = c.getInputInfo(r.target_slot);
      l[a = r.origin_id] || (l[a] = {});
      let u = l[r.origin_id][r.origin_slot];
      if (u === null) {
        const m = this.getValidGraphInputName(d.name);
        u = this.addGraphInput(m, d.type), l[r.origin_id][r.origin_slot] = u;
        const [p, f] = n[r.origin_id], v = u.innerNode.pos, y = u.innerNode.computeSize(), g = u.innerNode.getConnectionPos(!0, 0), N = [u.innerNode.pos[0] - g[0], u.innerNode.pos[1] - g[1]], E = [f[0] + N[0] - y[0], f[1] + N[1]];
        console.warn("newPos", v, "size", u.innerNode.size, "connPos", f, "newConPos", g, "offset", N), u.innerNode.pos = E;
      }
      o[r.origin_id].connect(r.origin_slot, this, u.outerInputIndex), u.innerNode.connect(0, c, r.target_slot);
    }
  }
  convertNodesToSubgraphOutputs(t) {
    var a;
    if (t = t.filter((r) => !r.is(X) && !r.is(V)), t.length === 0)
      return;
    const e = ut(t, (r) => r.id), s = [], n = {}, i = this.subgraph;
    for (const r of t)
      for (const c of r.iterateAllLinks())
        if (e[c.origin_id] === null) {
          s.push(c);
          const d = [0, 0];
          r.getConnectionPos(!0, c.origin_slot, d), n[r.id] = [[r.pos[0], r.pos[1]], d];
        } else if (e[c.target_id] === null)
          throw new Error("Can't convert to input with an origin link outward");
    const o = this.moveNodesToParentGraph(t), l = {};
    for (const r of s) {
      const c = i.getNodeById(r.origin_id), d = c.getOutputInfo(r.origin_slot);
      l[a = r.target_id] || (l[a] = {});
      let u = l[r.target_id][r.target_slot];
      if (u === null) {
        u = this.addGraphOutput(name, d.type), l[r.target_id][r.target_slot] = u;
        const [m, p] = n[r.target_id], f = u.innerNode.getConnectionPos(!0, 0), v = [u.innerNode.pos[0] - f[0], u.innerNode.pos[1] - f[1]], y = [p[0] + v[0], p[1] + v[1]];
        u.innerNode.pos = y;
      }
      const _ = o[r.target_id];
      c.connect(r.origin_slot, u.innerNode, 0), this.connect(u.outerOutputIndex, _, r.target_slot);
    }
  }
};
let Z = It;
Z.default_lgraph_factory = () => new Ot();
Z.slotLayout = {
  inputs: [],
  outputs: []
};
Z.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
Z.optionalSlots = {
  outputs: [
    { name: "enabled", type: "boolean" }
  ]
};
h.registerNodeType({
  class: Z,
  title: "Subgraph",
  desc: "Graph inside a node",
  title_color: "#334",
  type: "graph/subgraph"
});
class w {
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(e = "", s, n, i, o = !1, l = null) {
    const a = this, r = document.createElement("div");
    if (r.is_modified = !1, r.className = "graphdialog rounded", o) {
      let T = 5;
      typeof s != "string" && (s = JSON.stringify(s, null, 2));
      const M = (s.match(/\n/g) || "").length + 1;
      T = pt(M, 5, 10), r.innerHTML = `
<span class='name'></span>
<textarea autofocus rows='${T}' cols='30' class='value'></textarea>
<button class='rounded'>OK</button>
`;
    } else
      r.innerHTML = `
<span class='name'></span>
<input autofocus type='text' class='value'/>
<button class='rounded'>OK</button>`;
    r.close = function() {
      a.prompt_box = null, r.parentNode && r.parentNode.removeChild(r);
    };
    const d = b.active_canvas.canvas;
    d.parentNode.appendChild(r), this.ds.scale > 1 && (r.style.transform = `scale(${this.ds.scale})`);
    let u = null, _ = 0;
    h.pointerListenerAdd(r, "leave", (T) => {
      _ || h.dialog_close_on_mouse_leave && !r.is_modified && h.dialog_close_on_mouse_leave && T.buttons === 0 && (u = setTimeout(r.close, h.dialog_close_on_mouse_leave_delay));
    }), h.pointerListenerAdd(r, "enter", (T) => {
      h.dialog_close_on_mouse_leave && u && clearTimeout(u);
    });
    const m = r.querySelectorAll("select");
    m && m.forEach((T) => {
      T.addEventListener("click", (M) => {
        _++;
      }), T.addEventListener("blur", (M) => {
        _ = 0;
      }), T.addEventListener("change", (M) => {
        _ = -1;
      });
    }), a.prompt_box && a.prompt_box.close(), a.prompt_box = r;
    const p = r.querySelector(".name");
    p.innerText = e;
    const f = r.querySelector(".value");
    f.value = s;
    const v = f;
    if (v.addEventListener("keydown", function(T) {
      if (r.is_modified = !0, T.keyCode === 27)
        r.close();
      else if (T.keyCode === 13 && T.target instanceof Element && T.target.localName !== "textarea")
        n && n(this.value), r.close();
      else
        return;
      T.preventDefault(), T.stopPropagation();
    }), l)
      for (const [T, M] of Object.entries(l))
        v.style[T] = M;
    r.querySelector("button").addEventListener("click", (T) => {
      n && n(v.value), a.setDirty(!0), r.close();
    });
    const g = d.getBoundingClientRect();
    let N = -20, E = -20;
    return g && (N -= g.left, E -= g.top), i ? (r.style.left = `${i.clientX}px`, r.style.top = `${i.clientY}px`) : (r.style.left = `${d.width * 0.5 + N}px`, r.style.top = `${d.height * 0.5 + E}px`), console.warn(r.style.left, r.style.top), console.warn(i), setTimeout(() => {
      v.focus();
    }, 10), dt(r), r;
  }
  showSearchBox(e, s = {}) {
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
    const i = this, o = b.active_canvas, l = o.canvas, a = l.ownerDocument || document, r = e, c = document.createElement("div");
    c.className = "litegraph litesearchbox graphdialog rounded", c.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", s.do_type_filter && (c.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", c.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), c.innerHTML += "<div class='helper'></div>", a.fullscreenElement ? a.fullscreenElement.appendChild(c) : (a.body.appendChild(c), a.body.style.overflow = "hidden");
    let d = null, u = null;
    if (s.do_type_filter && (d = c.querySelector(".slot_in_type_filter"), u = c.querySelector(".slot_out_type_filter")), c.close = function() {
      i.search_box = null, this.blur(), l.focus(), a.body.style.overflow = "", setTimeout(() => {
        i.canvas.focus();
      }, 20), c.parentNode && c.parentNode.removeChild(c);
    }, this.ds.scale > 1 && (c.style.transform = `scale(${this.ds.scale})`), s.hide_on_mouse_leave) {
      let I = 0, D = null;
      h.pointerListenerAdd(c, "enter", (C) => {
        D && (clearTimeout(D), D = null);
      }), h.pointerListenerAdd(c, "leave", (C) => {
        I || (D = setTimeout(() => {
          c.close();
        }, 500));
      }), s.do_type_filter && (d.addEventListener("click", (C) => {
        I++;
      }), d.addEventListener("blur", (C) => {
        I = 0;
      }), d.addEventListener("change", (C) => {
        I = -1;
      }), u.addEventListener("click", (C) => {
        I++;
      }), u.addEventListener("blur", (C) => {
        I = 0;
      }), u.addEventListener("change", (C) => {
        I = -1;
      }));
    }
    i.search_box && i.search_box.close(), i.search_box = c;
    const _ = c.querySelector(".helper");
    let m = null, p = null, f = null;
    const v = (I) => {
      if (I)
        if (i.onSearchBoxSelection)
          i.onSearchBoxSelection(I, r, o);
        else {
          const D = h.searchbox_extras[I.toLowerCase()];
          D && (I = D.type), o.graph.beforeChange();
          const C = h.createNode(I);
          if (C && (C.pos = o.convertEventToCanvasOffset(
            r
          ), o.graph.add(C)), D && D.data) {
            if (D.data.properties)
              for (const k in D.data.properties)
                C.addProperty(`${k}`, D.data.properties[k]);
            if (D.data.inputs) {
              C.inputs = [];
              for (const k in D.data.inputs)
                C.addInput(
                  D.data.inputs[k][0],
                  D.data.inputs[k][1]
                );
            }
            if (D.data.outputs) {
              C.outputs = [];
              for (const k in D.data.outputs)
                C.addOutput(
                  D.data.outputs[k][0],
                  D.data.outputs[k][1]
                );
            }
            D.data.title && (C.title = D.data.title), D.data.json && C.configure(D.data.json);
          }
          if (s.node_from) {
            let k = null;
            switch (typeof s.slotFrom) {
              case "string":
                k = s.node_from.findOutputSlotIndexByName(s.slotFrom);
                break;
              case "object":
                s.slotFrom.name ? k = s.node_from.findOutputSlotIndexByName(s.slotFrom.name) : k = -1, k === -1 && typeof s.slotFrom.slot_index < "u" && (k = s.slotFrom.slot_index);
                break;
              case "number":
                k = s.slotFrom;
                break;
              default:
                k = 0;
            }
            k = k, typeof s.node_from.outputs[k] !== void 0 && k !== null && k > -1 && s.node_from.connectByTypeInput(k, C, s.node_from.outputs[k].type);
          }
          if (s.node_to) {
            let k = null;
            switch (typeof s.slotFrom) {
              case "string":
                k = s.node_to.findInputSlotIndexByName(s.slotFrom);
                break;
              case "number":
                k = s.slotFrom;
                break;
              default:
                k = 0;
            }
            typeof s.node_to.inputs[k] !== void 0 && k !== null && k > -1 && s.node_to.connectByTypeOutput(k, C, s.node_to.inputs[k].type);
          }
          o.graph.afterChange();
        }
      c.close();
    }, y = (I) => {
      const D = f;
      f && f.classList.remove("selected"), f ? (f = I ? f.nextSibling : f.previousSibling, f || (f = D)) : f = I ? _.childNodes[0] : _.childNodes[_.childNodes.length], f && (f.classList.add("selected"), f.scrollIntoView({ block: "end", behavior: "smooth" }));
    }, g = (I, D, C, k, R, x = {}) => {
      const B = Object.assign({
        skipFilter: !1,
        inTypeOverride: null,
        outTypeOverride: null
      }, x), H = h.registered_node_types[I];
      if (H.hide_in_node_lists || D && H.filter !== D || (!s.show_all_if_empty || C) && !I.toLowerCase().includes(C))
        return !1;
      if (s.do_type_filter && !B.skipFilter) {
        const nt = I;
        let j = k == null ? void 0 : k.value;
        if (B.inTypeOverride !== null && (j = B.inTypeOverride), k && j && h.registered_slot_in_types[j] && h.registered_slot_in_types[j].nodes && h.registered_slot_in_types[j].nodes.includes(nt) === !1 || (j = R == null ? void 0 : R.value, B.outTypeOverride !== null && (j = B.outTypeOverride), R && j && h.registered_slot_out_types[j] && h.registered_slot_out_types[j].nodes && h.registered_slot_out_types[j].nodes.includes(nt) === !1))
          return !1;
      }
      return !0;
    }, N = () => {
      p = null;
      let I = E.value;
      if (m = null, _.innerHTML = "", !I && !s.show_all_if_empty)
        return;
      if (i.onSearchBox) {
        const C = i.onSearchBox(_, I, o);
        if (C)
          for (let k = 0; k < C.length; ++k)
            D(C[k]);
      } else {
        let C = 0;
        I = I.toLowerCase();
        const k = o.filter || o.graph.filter;
        let R, x;
        s.do_type_filter && i.search_box ? (R = i.search_box.querySelector(".slot_in_type_filter"), x = i.search_box.querySelector(".slot_out_type_filter")) : (R = null, x = null);
        for (const B in h.searchbox_extras) {
          const H = h.searchbox_extras[B];
          if ((!s.show_all_if_empty || I) && !H.desc.toLowerCase().includes(I))
            continue;
          const nt = h.registered_node_types[H.type];
          if (!(nt && nt.filter !== k) && g(H.type, k, I, R, x) && (D(H.desc, "searchbox_extra"), b.search_limit !== -1 && C++ > b.search_limit))
            break;
        }
        let et = null;
        if (Array.prototype.filter)
          et = Object.keys(h.registered_node_types).filter((H) => g(H, k, I, R, x));
        else {
          et = [];
          for (const B in h.registered_node_types)
            g(B, k, I, R, x) && et.push(B);
        }
        for (let B = 0; B < et.length && (D(et[B]), !(b.search_limit !== -1 && C++ > b.search_limit)); B++)
          ;
        if (s.show_general_after_typefiltered && (R != null && R.value || x != null && x.value)) {
          const B = [];
          for (const H in h.registered_node_types)
            g(H, k, I, R, x, { inTypeOverride: R && R.value ? "*" : null, outTypeOverride: x && x.value ? "*" : null }) && B.push(H);
          for (let H = 0; H < B.length && (D(B[H], "generic_type"), !(b.search_limit !== -1 && C++ > b.search_limit)); H++)
            ;
        }
        if ((R != null && R.value || x != null && x.value) && (_ == null ? void 0 : _.childNodes.length) === 0 && s.show_general_if_none_on_typefilter) {
          const B = [];
          for (const H in h.registered_node_types)
            g(H, k, I, R, x, { skipFilter: !0 }) && B.push(H);
          for (let H = 0; H < B.length && (D(B[H], "not_in_filter"), !(b.search_limit !== -1 && C++ > b.search_limit)); H++)
            ;
        }
      }
      function D(C, k) {
        const R = document.createElement("div");
        m || (m = C), R.innerText = C, R.dataset.type = escape(C), R.className = "litegraph lite-search-item", k && (R.className += ` ${k}`), R.addEventListener("click", function(x) {
          v(unescape(this.dataset.type));
        }), _.appendChild(R);
      }
    };
    let E = c.querySelector("input");
    if (E && (E.addEventListener("blur", function(I) {
      this.focus();
    }), E.addEventListener("keydown", (I) => {
      if (I.keyCode === 38)
        y(!1);
      else if (I.keyCode === 40)
        y(!0);
      else if (I.keyCode === 27)
        c.close();
      else if (I.keyCode === 13)
        f ? v(f.innerHTML) : m ? v(m) : c.close();
      else {
        p && clearInterval(p), p = setTimeout(N, h.search_box_refresh_interval_ms);
        return;
      }
      return I.preventDefault(), I.stopPropagation(), I.stopImmediatePropagation(), !0;
    })), s.do_type_filter) {
      if (d) {
        const I = h.slot_types_in, D = I.length;
        (s.type_filter_in === O.EVENT || s.type_filter_in === O.ACTION) && (s.type_filter_in = "_event_");
        for (let C = 0; C < D; C++) {
          const k = document.createElement("option");
          k.value = I[C], k.innerHTML = I[C], d.appendChild(k), s.type_filter_in !== null && `${s.type_filter_in}`.toLowerCase() === `${I[C]}`.toLowerCase() && (k.selected = !0);
        }
        d.addEventListener("change", N);
      }
      if (u) {
        const I = h.slot_types_out, D = I.length;
        (s.type_filter_out === O.EVENT || s.type_filter_out === O.ACTION) && (s.type_filter_out = "_event_");
        for (let C = 0; C < D; C++) {
          const k = document.createElement("option");
          k.value = I[C], k.innerHTML = I[C], u.appendChild(k), s.type_filter_out !== null && `${s.type_filter_out}`.toLowerCase() === `${I[C]}`.toLowerCase() && (k.selected = !0);
        }
        u.addEventListener("change", N);
      }
    }
    const T = l.getBoundingClientRect(), M = (r ? r.clientX : T.left + T.width * 0.5) - 80, F = (r ? r.clientY : T.top + T.height * 0.5) - 20;
    return c.style.left = `${M}px`, c.style.top = `${F}px`, r.layerY > T.height - 200 && (_.style.maxHeight = `${T.height - r.layerY - 20}px`), E.focus(), s.show_all_on_open && N(), c;
  }
  showShowNodePanel(e) {
    this.closePanels();
    const s = this.getCanvasWindow(), n = this, i = this.createPanel(e.title || "", {
      closable: !0,
      window: s,
      onOpen() {
      },
      onClose() {
        n.node_panel = null;
      }
    });
    n.node_panel = i, i.id = "node-panel", i.node = e, i.classList.add("settings");
    function o() {
      i.content.innerHTML = "", i.addHTML(`<span class='node_type'>${e.type}</span><span class='node_desc'>${e.constructor.desc || ""}</span><span class='separator'></span>`), i.addHTML("<h3>Properties</h3>");
      const l = function(r, c) {
        switch (n.graph.beforeChange(e), r) {
          case "Title":
            e.title = c;
            break;
          case "Mode":
            const d = Object.values(J).indexOf(c);
            d >= Y.ALWAYS && J[d] ? e.changeMode(d) : console.warn(`unexpected mode: ${c}`);
            break;
          case "Color":
            b.node_colors[c] ? (e.color = b.node_colors[c].color, e.bgcolor = b.node_colors[c].bgcolor) : console.warn(`unexpected color: ${c}`);
            break;
          default:
            e.setProperty(r, c);
            break;
        }
        n.graph.afterChange(), n.dirty_canvas = !0;
      };
      i.addWidget("string", "Title", e.title, {}, l), i.addWidget("combo", "Mode", J[e.mode], { values: J }, l);
      let a = "";
      e.color !== void 0 && (a = Object.keys(b.node_colors).filter((r) => b.node_colors[r].color === e.color)[0]), i.addWidget("combo", "Color", a, { values: Object.keys(b.node_colors) }, l);
      for (const r in e.properties) {
        const c = e.properties[r], d = e.getPropertyInfo(r);
        d.type, !(e.onAddPropertyToPanel && e.onAddPropertyToPanel(r, i)) && i.addWidget(d.widget || d.type, r, c, d, l);
      }
      i.addSeparator(), e.onShowCustomPanelInfo && e.onShowCustomPanelInfo(i), i.footer.innerHTML = "", i.addButton("Delete", () => {
        e.block_delete || (e.graph.remove(e), i.close());
      }).classList.add("delete");
    }
    i.inner_showCodePad = function(l) {
      i.classList.remove("settings"), i.classList.add("centered"), i.alt_content.innerHTML = "<textarea class='code'></textarea>";
      const a = i.alt_content.querySelector("textarea"), r = function() {
        i.toggleAltContent(!1), i.toggleFooterVisibility(!0), a.parentNode.removeChild(a), i.classList.add("settings"), i.classList.remove("centered"), o();
      };
      a.value = e.properties[l], a.addEventListener("keydown", (u) => {
        u.code === "Enter" && u.ctrlKey && (e.setProperty(l, a.value), r());
      }), i.toggleAltContent(!0), i.toggleFooterVisibility(!1), a.style.height = "calc(100% - 40px)";
      const c = i.addButton("Assign", () => {
        e.setProperty(l, a.value), r();
      });
      i.alt_content.appendChild(c);
      const d = i.addButton("Close", r);
      d.style.float = "right", i.alt_content.appendChild(d);
    }, o(), this.canvas.parentNode.appendChild(i);
  }
  showSubgraphPropertiesDialog(e) {
    console.log("showing subgraph properties dialog");
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const n = this.createPanel("Subgraph Inputs", { closable: !0, width: 500 });
    n.node = e, n.classList.add("subgraph_dialog");
    const i = e;
    if (!i.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function l() {
      if (n.clear(), e.inputs)
        for (let p = 0; p < e.inputs.length; ++p) {
          const f = e.inputs[p];
          if (f.not_subgraph_input)
            continue;
          const v = `
<button class="delete">&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, y = n.addHTML(v, "subgraph_property");
          y.dataset.name = f.name, y.dataset.slot = `${p}`, y.querySelector(".name").innerText = f.name, y.querySelector(".type").innerText = W(f.type), y.querySelector(".delete").addEventListener("click", function(E) {
            const T = this.parentNode.dataset.name;
            i.removeGraphInput(T), l();
          });
          const g = y.querySelector(".move_up");
          g.disabled = p <= 0, g.addEventListener("click", function(E) {
            const T = +this.parentNode.dataset.slot;
            T < 0 || (i.moveInput(T, T - 1), l());
          });
          const N = y.querySelector(".move_down");
          N.disabled = p >= e.inputs.length - 1, N.addEventListener("click", function(E) {
            const T = +this.parentNode.dataset.slot;
            T > e.inputs.length - 1 || (i.moveInput(T, T + 1), l());
          });
        }
    }
    const a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, r = n.addHTML(a, "subgraph_property extra", !0), c = r.querySelector(".name"), d = r.querySelector(".type"), u = r.querySelector("button");
    for (const p of Tt()) {
      const f = document.createElement("option");
      f.value = p, f.innerHTML = W(p), d.appendChild(f), p === "*" && (f.selected = !0);
    }
    const _ = () => {
      const p = c.value;
      let f = d.value;
      f === "-1" ? f = O.ACTION : f === "-2" && (f = O.EVENT), !(!p || e.findInputSlotIndexByName(p) !== -1) && (this.addGraphInputNode(e, p, f), c.value = "", d.value = "", l(), c.focus());
    }, m = (p) => {
      p.keyCode === 13 ? (_(), p.preventDefault()) : p.keyCode === 27 && (n.close(), p.preventDefault());
    };
    return u.addEventListener("click", _), c.addEventListener("keydown", m), d.addEventListener("keydown", m), l(), this.canvas.parentNode.appendChild(n), c.focus(), n;
  }
  showSubgraphPropertiesDialogRight(e) {
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const n = this.createPanel("Subgraph Outputs", { closable: !0, width: 500 });
    n.node = e, n.classList.add("subgraph_dialog");
    const i = e;
    if (!i.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function l() {
      if (n.clear(), e.outputs)
        for (let p = 0; p < e.outputs.length; ++p) {
          const f = e.outputs[p];
          if (f.not_subgraph_output)
            continue;
          const v = `
<button>&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, y = n.addHTML(v, "subgraph_property");
          y.dataset.name = f.name, y.dataset.slot = `${p}`, y.querySelector(".name").innerText = f.name, y.querySelector(".type").innerText = W(f.type), y.querySelector("button").addEventListener("click", function(E) {
            const T = this.parentNode.dataset.name;
            i.removeGraphOutput(T), l();
          });
          const g = y.querySelector(".move_up");
          g.disabled = p <= 0, g.addEventListener("click", function(E) {
            const T = +this.parentNode.dataset.slot;
            T < 0 || (i.moveOutput(T, T - 1), l());
          });
          const N = y.querySelector(".move_down");
          N.disabled = p >= e.outputs.length - 1, N.addEventListener("click", function(E) {
            const T = +this.parentNode.dataset.slot;
            T > e.outputs.length - 1 || (i.moveOutput(T, T + 1), l());
          });
        }
    }
    const a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, r = n.addHTML(a, "subgraph_property extra", !0), c = r.querySelector(".name"), d = r.querySelector(".type"), u = r.querySelector("button");
    for (const p of Et()) {
      const f = document.createElement("option");
      f.value = p, f.innerHTML = W(p), d.appendChild(f), p === "*" && (f.selected = !0);
    }
    const _ = () => {
      const p = c.value;
      let f = d.value;
      f === "-1" ? f = O.ACTION : f === "-2" && (f = O.EVENT), !(!p || e.findOutputSlotIndexByName(p) !== -1) && (this.addGraphOutputNode(e, p, f), c.value = "", d.value = "", l(), c.focus());
    }, m = (p) => {
      p.keyCode === 13 ? (_(), p.preventDefault()) : p.keyCode === 27 && (n.close(), p.preventDefault());
    };
    return u.addEventListener("click", _), c.addEventListener("keydown", m), d.addEventListener("keydown", m), l(), this.canvas.parentNode.appendChild(n), c.focus(), n;
  }
  showConnectionMenu(e = {}) {
    const s = e.nodeFrom && e.slotFrom, n = !s && e.nodeTo && e.slotTo;
    if (!s && !n)
      return console.warn("No data passed to showConnectionMenu"), !1;
    const i = s ? e.nodeFrom : e.nodeTo, o = s ? e.slotFrom : e.slotTo;
    let l, a = null;
    switch (typeof o) {
      case "string":
        a = s ? i.findOutputSlotIndexByName(o) : i.findInputSlotIndexByName(o), l = s ? i.outputs[o] : i.inputs[o];
        break;
      case "object":
        l = o, a = s ? i.findOutputSlotIndexByName(l.name) : i.findInputSlotIndexByName(l.name);
        break;
      case "number":
        a = o, l = s ? i.outputs[a] : i.inputs[a];
        break;
      default:
        return console.error("Can't get slot information", o), !1;
    }
    const r = [{ content: "Add Node" }, $.SEPARATOR];
    i.graph._is_subgraph && (s ? r.push({ content: "Add Subgraph Output" }) : r.push({ content: "Add Subgraph Input" }), r.push($.SEPARATOR)), this.allow_searchbox && (r.push({ content: "Search" }), r.push($.SEPARATOR));
    const c = l.type === O.EVENT ? "_event_" : l.type, d = s ? h.slot_types_default_out : h.slot_types_default_in, u = d[c];
    if (console.warn("FROMSL", d, u), d && d[c])
      if (Array.isArray(u))
        for (const y of u) {
          const g = typeof y == "string" ? y : (y == null ? void 0 : y.title) || (y == null ? void 0 : y.node);
          r.push({ content: g, value: y });
        }
      else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${u}`);
    const _ = (y) => {
      const g = i.graph._subgraph_node, N = [y.canvasX, y.canvasY];
      g.addGraphInput(l.name, l.type, N).innerNode.connect(0, i, a);
    }, m = (y) => {
      const g = i.graph._subgraph_node, N = [y.canvasX, y.canvasY], E = g.addGraphOutput(l.name, l.type, N);
      i.connect(a, E.innerNode, 0);
    }, p = (y) => {
      const g = Object.assign(e, {
        position: [e.e.canvasX, e.e.canvasY]
      });
      this.createDefaultNodeForSlot(y, g) ? console.log("node created", y) : console.error("node not in defaults", y);
    }, f = (y, g, N) => {
      switch (y.content) {
        case "Add Node":
          b.onMenuAdd(y, g, N, v, (E) => {
            s ? e.nodeFrom.connectByTypeInput(a, E, c) : e.nodeTo.connectByTypeOutput(a, E, c);
          });
          break;
        case "Add Subgraph Input":
          _(this.adjustMouseEvent(N));
          break;
        case "Add Subgraph Output":
          m(this.adjustMouseEvent(N));
          break;
        case "Search":
          s ? this.showSearchBox(N, { node_from: e.nodeFrom, slotFrom: l, type_filter_in: c }) : this.showSearchBox(N, { node_to: e.nodeTo, slotFrom: l, type_filter_out: c });
          break;
        default:
          p(y.value);
          break;
      }
    };
    let v = new U(r, {
      event: e.e,
      title: (l && l.name !== "" ? l.name + (c ? " | " : "") : "") + (l && c ? c : ""),
      callback: f
    });
    return !1;
  }
  getLinkMenuOptions(e) {
    const s = this.graph.getNodeById(e.origin_id), n = this.graph.getNodeById(e.target_id);
    let i = null;
    s && s.outputs && s.outputs[e.origin_slot] && (i = s.outputs[e.origin_slot].type);
    let o = null;
    n && n.outputs && n.outputs[e.target_slot] && (o = n.inputs[e.target_slot].type);
    const l = (d) => {
      console.debug("node autoconnect"), !(!d.inputs || !d.inputs.length || !d.outputs || !d.outputs.length) && s.connectByTypeInput(e.origin_slot, d, i) && (d.connectByTypeInput(e.target_slot, n, o), d.pos[0] -= d.size[0] * 0.5);
    }, a = (d, u, _, m, p) => {
      b.onMenuAdd(d, u, _, m, l);
    }, r = () => {
      this.graph.removeLink(e.id);
    };
    let c = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: a
      },
      $.SEPARATOR,
      {
        content: "Delete",
        has_submenu: !0,
        callback: r
      },
      $.SEPARATOR
    ];
    return this.graph.onGetLinkMenuOptions && (c = this.graph.onGetLinkMenuOptions(c, e)), s.getExtraLinkOptions && (c = s.getExtraLinkOptions(this, e, G.OUTPUT, c)), n.getExtraLinkOptions && (c = n.getExtraLinkOptions(this, e, G.INPUT, c)), c;
  }
  showLinkMenu(e, s) {
    const n = this.getLinkMenuOptions(e);
    return new U(n, {
      event: s,
      title: e.data !== null ? e.data.constructor.name : null,
      extra: e
    }), !1;
  }
  /*
     * Shows a popup for editing one of the LGraphNode.properties.
     */
  showEditPropertyValue(e, s, n = {}) {
    if (!e || e.properties[s] === void 0 || h.ignore_all_widget_events)
      return;
    const i = e.getPropertyInfo(s), o = i.type;
    let l = "";
    if (o === "string" || o === "number" || o === "array" || o === "object")
      if (i.multiline) {
        let m = e.properties[s], p = 5;
        if (o !== "string") {
          m = JSON.stringify(m, null, 2);
          const f = (m.match(/\n/g) || "").length + 1;
          p = pt(f, 5, 10);
        }
        l = `<textarea autofocus type='text' rows='${p}' cols='30' class='value'>${m || ""}</textarea>`;
      } else
        l = "<input autofocus type='text' class='value'/>";
    else if ((o === "enum" || o === "combo") && i.values) {
      l = "<select autofocus type='text' class='value'>";
      for (const m in i.values) {
        let p = m;
        Array.isArray(i.values) && (p = i.values[m]), l += `<option value='${p}' ${p === e.properties[s] ? "selected" : ""}>${i.values[m]}</option>`;
      }
      l += "</select>";
    } else if (o === "boolean" || o === "toggle")
      l = `<input autofocus type='checkbox' class='value' ${e.properties[s] ? "checked" : ""}/>`;
    else {
      console.warn(`unknown type: ${o}`);
      return;
    }
    const a = this.createDialog(
      `<span class='name'>${i.label ? i.label : s}</span>${l}<button>OK</button>`,
      n
    );
    let r = null;
    if ((o === "enum" || o === "combo") && i.values)
      r = a.querySelector("select"), r.addEventListener("change", (m) => {
        a.modified(), u(m.target.value);
      });
    else if (o === "boolean" || o === "toggle")
      r = a.querySelector("input"), r && r.addEventListener("click", (m) => {
        a.modified(), u(!!r.checked);
      });
    else if (i.multiline ? r = a.querySelector("textarea") : r = a.querySelector("input"), r) {
      r.addEventListener("blur", function(p) {
        this.focus();
      });
      let m = e.properties[s] !== void 0 ? e.properties[s] : "";
      if (o !== "string") {
        let p = null;
        i.multiline && (p = 2), m = JSON.stringify(m, null, p);
      }
      if (r.value = m, r.addEventListener("keydown", (p) => {
        let f = !1;
        p.keyCode === 27 ? (a.close(), f = !0) : p.keyCode === 13 && !i.multiline ? (d(), f = !0) : p.keyCode !== 13 && a.modified(), f && (p.preventDefault(), p.stopPropagation());
      }), i.inputStyle)
        for (const [p, f] of Object.entries(i.inputStyle))
          r.style[p] = f;
    }
    r && r.focus();
    const c = () => {
      n.onclose && n.onclose(), a.close(), e.setDirtyCanvas(!0, !0);
    }, d = () => {
      o !== "boolean" && o !== "toggle" ? u(r.value) : c();
    }, u = (m) => {
      i && i.values && i.values.constructor === Object && i.values[m] !== void 0 && (m = i.values[m]), typeof e.properties[s] == "number" && (m = Number(m)), (o === "array" || o === "object") && (m = JSON.parse(m)), e.setProperty(s, m), c();
    };
    return a.querySelector("button").addEventListener("click", d), dt(a), a;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(e, s = { checkForInput: !1, closeOnLeave: !0, closeOnLeave_checkModified: !0 }) {
    const n = document.createElement("div");
    n.className = "graphdialog", n.innerHTML = e, n.is_modified = !1;
    const i = this.canvas.getBoundingClientRect();
    let o = -20, l = -20;
    if (i && (o -= i.left, l -= i.top), s.position ? (o = s.position[0], l = s.position[1]) : s.event ? (o = s.event.clientX, l = s.event.clientY) : (o += this.canvas.width * 0.5, l += this.canvas.height * 0.5), n.style.left = `${o}px`, n.style.top = `${l}px`, this.canvas.parentNode.appendChild(n), s.checkForInput) {
      const d = n.querySelectorAll("input");
      d && d.forEach((u) => {
        u.addEventListener("keydown", (_) => {
          if (n.modified(), _.keyCode === 27)
            n.close();
          else if (_.keyCode !== 13)
            return;
          _.preventDefault(), _.stopPropagation();
        }), u.focus();
      });
    }
    n.modified = function() {
      n.is_modified = !0;
    }, n.close = function() {
      n.parentNode && n.parentNode.removeChild(n);
    };
    let a = null, r = 0;
    n.addEventListener("mouseleave", (d) => {
      r || (s.closeOnLeave || h.dialog_close_on_mouse_leave) && !n.is_modified && h.dialog_close_on_mouse_leave && d.buttons === 0 && (a = setTimeout(n.close, h.dialog_close_on_mouse_leave_delay));
    }), n.addEventListener("mouseenter", (d) => {
      (s.closeOnLeave || h.dialog_close_on_mouse_leave) && a && clearTimeout(a);
    });
    const c = n.querySelectorAll("select");
    return c && c.forEach((d) => {
      d.addEventListener("click", (u) => {
        r++;
      }), d.addEventListener("blur", (u) => {
        r = 0;
      }), d.addEventListener("change", (u) => {
        r = -1;
      });
    }), n;
  }
  getCanvasMenuOptions() {
    let e = null;
    if (this.getMenuOptions ? e = this.getMenuOptions(this) : (e = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: b.onMenuAdd
      },
      { content: "Add Group", callback: b.onGroupAdd }
      // { content: "Arrange", callback: that.graph.arrange },
      // {content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], this._graph_stack && this._graph_stack.length > 0 && e.push($.SEPARATOR, {
      content: "Close subgraph",
      callback: this.closeSubgraph.bind(this)
    })), this.getExtraMenuOptions) {
      const s = this.getExtraMenuOptions(this, e);
      s && (e = e.concat(s));
    }
    return e;
  }
  getNodeMenuOptions(e) {
    let s = [];
    e.getMenuOptions ? s = e.getMenuOptions(this) : (s = [
      {
        content: "Inputs",
        has_submenu: !0,
        disabled: !0,
        callback: b.showMenuNodeOptionalInputs
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: b.showMenuNodeOptionalOutputs
      },
      $.SEPARATOR,
      {
        content: "Properties",
        has_submenu: !0,
        disabled: h.ignore_all_widget_events,
        callback: b.onShowMenuNodeProperties
      },
      $.SEPARATOR,
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: b.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: b.onMenuNodeMode
      }
    ], e.resizable !== !1 && s.push({
      content: "Resize",
      callback: b.onMenuResizeNode
    }), s.push(
      {
        content: "Collapse",
        callback: b.onMenuNodeCollapse
      },
      { content: "Pin", callback: b.onMenuNodePin },
      {
        content: "Colors",
        has_submenu: !0,
        callback: b.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: b.onMenuNodeShapes
      },
      $.SEPARATOR
    ));
    const n = e.getOptionalSlots();
    if (n && (n.inputs && n.inputs.length > 0 && typeof s[0] == "object" && (s[0].disabled = !1), n.outputs && n.outputs.length && typeof s[1] == "object" && (s[1].disabled = !1)), e.getExtraMenuOptions) {
      const o = e.getExtraMenuOptions(this, s);
      o && (o.push($.SEPARATOR), s = o.concat(s));
    }
    e.clonable !== !1 && s.push({
      content: "Clone",
      callback: b.onMenuNodeClone
    }), s.push({
      content: "To Subgraph",
      callback: b.onMenuNodeToSubgraph
    });
    let i = Object.values(this.selected_nodes || {});
    if (i.length || (i = [e]), i = i.filter((o) => !o.is(X) && !o.is(V)), s.push({
      content: "To Parent Graph",
      disabled: !e.graph._is_subgraph || i.length === 0,
      callback: b.onMenuNodeToParentGraph
    }), e.graph._is_subgraph) {
      const o = (c) => {
        let d = 0;
        const u = ut(c, (_) => _.id);
        for (const _ of c)
          for (const m of _.iterateAllLinks()) {
            if (u[m.origin_id] === null)
              return 0;
            u[m.target_id] === null && (d += 1);
          }
        return d;
      }, l = (c) => {
        let d = 0;
        const u = ut(c, (_) => _.id);
        for (const _ of c)
          for (const m of _.iterateAllLinks())
            if (u[m.origin_id] === null)
              d += 1;
            else if (u[m.target_id] === null)
              return 0;
        return d;
      }, a = o(i);
      s.push({
        content: `To Subgraph Input${a > 1 ? "s" : ""}`,
        disabled: a === 0,
        callback: b.onMenuNodeToSubgraphInputs
      });
      const r = l(i);
      s.push({
        content: `To Subgraph Output${r > 1 ? "s" : ""}`,
        disabled: r === 0,
        callback: b.onMenuNodeToSubgraphOutputs
      });
    }
    return s.push($.SEPARATOR, {
      content: "Remove",
      disabled: !(e.removable !== !1 && !e.block_delete),
      callback: b.onMenuNodeRemove
    }), e.graph && e.graph.onGetNodeMenuOptions && (s = e.graph.onGetNodeMenuOptions(s, e)), s;
  }
  getGroupMenuOptions(e) {
    return [
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: b.onShowPropertyEditor
      },
      {
        content: "Color",
        has_submenu: !0,
        callback: b.onMenuNodeColors
      },
      {
        content: "Font size",
        value: { name: "fontSize", type: "number" },
        callback: b.onShowPropertyEditor
      },
      $.SEPARATOR,
      { content: "Remove", callback: b.onMenuNodeRemove }
    ];
  }
  /** Called when mouse right click */
  processContextMenu(e, s) {
    const i = b.active_canvas.getCanvasWindow(), o = s;
    let l = null, a = null, r = null;
    e !== null && (r = e.item, e.type === "node" && (l = e.item), e.type === "link" && (a = e.item));
    let c = null;
    const d = {
      event: o,
      extra: r
    };
    l !== null && (d.title = l.type);
    let u = null;
    l !== null && (u = l.getSlotInPosition(o.canvasX, o.canvasY), b.active_node = l);
    const _ = (f) => {
      const v = f.slot;
      l.graph.beforeChange(), v.input ? l.removeInput(v.slot) : v.output && l.removeOutput(v.slot), l.graph.afterChange();
    }, m = (f) => {
      const v = f.slot;
      l.graph.beforeChange(), v.output ? l.disconnectOutput(v.slot) : v.input && l.disconnectInput(v.slot), l.graph.afterChange();
    }, p = (f) => {
      const v = f.slot, y = v.input ? l.getInputInfo(v.slot) : l.getOutputInfo(v.slot), g = this.createDialog(
        "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
        d
      ), N = g.querySelector("input");
      N && y && (N.value = y.label || "");
      const E = () => {
        l.graph.beforeChange(), N.value && (y && (y.label = N.value), this.setDirty(!0)), g.close(), l.graph.afterChange();
      };
      g.querySelector("button").addEventListener("click", E), N.addEventListener("keydown", (T) => {
        if (g.is_modified = !0, T.keyCode === 27)
          g.close();
        else if (T.keyCode === 13)
          E();
        else if (T.keyCode !== 13 && T.target instanceof Element && T.target.localName !== "textarea")
          return;
        T.preventDefault(), T.stopPropagation();
      }), N.focus();
    };
    if (u) {
      if (c = [], l.getSlotMenuOptions)
        c = l.getSlotMenuOptions(u);
      else {
        u && u.output && u.output.links && u.output.links.length && c.push({ content: "Disconnect Links", slot: u, callback: m });
        const v = u.input || u.output;
        v.removable && c.push(
          v.locked ? "Cannot remove" : { content: "Remove Slot", slot: u, callback: _ }
        ), v.nameLocked || c.push({ content: "Rename Slot", slot: u, callback: p });
      }
      const f = (u.input ? u.input.type : u.output.type) || "*";
      d.title = W(f);
    } else if (l)
      c = this.getNodeMenuOptions(l);
    else if (a)
      c = this.getLinkMenuOptions(a);
    else {
      c = this.getCanvasMenuOptions();
      const f = this.graph.getGroupOnPos(
        o.canvasX,
        o.canvasY
      );
      f && c.push($.SEPARATOR, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: f,
          options: this.getGroupMenuOptions(f)
        }
      });
    }
    c && new U(c, d, i);
  }
  createPanel(e, s = {}) {
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
    return s.onOpen && (i.onOpen = s.onOpen), s.onClose && (i.onClose = s.onClose), i.title_element = i.querySelector(".dialog-title"), i.title_element.innerText = e, i.content = i.querySelector(".dialog-content"), i.alt_content = i.querySelector(".dialog-alt-content"), i.footer = i.querySelector(".dialog-footer"), i.close = function() {
      i.onClose && typeof i.onClose == "function" && i.onClose(), i.parentNode && i.parentNode.removeChild(i), this.parentNode && this.parentNode.removeChild(this);
    }, i.toggleAltContent = function(o = !1) {
      let l, a;
      typeof o < "u" ? (l = o ? "block" : "none", a = o ? "none" : "block") : (l = i.alt_content.style.display !== "block" ? "block" : "none", a = i.alt_content.style.display !== "block" ? "none" : "block"), i.alt_content.style.display = l, i.content.style.display = a;
    }, i.toggleFooterVisibility = function(o = !1) {
      let l;
      typeof o < "u" ? l = o ? "block" : "none" : l = i.footer.style.display !== "block" ? "block" : "none", i.footer.style.display = l;
    }, i.clear = function() {
      this.content.innerHTML = "";
    }, i.addHTML = function(o, l, a) {
      const r = document.createElement("div");
      return l && (r.className = l), r.innerHTML = o, a ? i.footer.appendChild(r) : i.content.appendChild(r), r;
    }, i.addButton = function(o, l, a) {
      const r = document.createElement("button");
      return r.innerText = o, r.options = a, r.classList.add("btn"), r.addEventListener("click", l), i.footer.appendChild(r), r;
    }, i.addSeparator = function() {
      const o = document.createElement("div");
      return o.className = "separator", i.content.appendChild(o), o;
    }, i.addWidget = function(o, l, a, r = {}, c) {
      let d = String(a);
      o = o.toLowerCase(), o === "number" && (d = a.toFixed(3));
      const u = document.createElement("div");
      u.className = "property", u.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      const _ = u.querySelector(".property_name");
      _.innerText = r.label || l;
      const m = u.querySelector(".property_value");
      if (m.innerText = d, u.dataset.property = l, u.dataset.type = r.type || o, u.options = r, u.value = a, o === "code")
        u.addEventListener("click", function(f) {
          i.inner_showCodePad(this.dataset.property);
        });
      else if (o === "boolean")
        u.classList.add("boolean"), a && u.classList.add("bool-on"), u.addEventListener("click", function() {
          const f = this.dataset.property;
          this.value = !this.value, this.classList.toggle("bool-on");
          const v = this.querySelector(".property_value");
          v.innerText = this.value ? "true" : "false", p(f, this.value);
        });
      else if (o === "string" || o === "number")
        m.setAttribute("contenteditable", "true"), m.addEventListener("keydown", function(f) {
          f.code === "Enter" && (o !== "string" || !f.shiftKey) && (f.preventDefault(), this.blur());
        }), m.addEventListener("blur", function() {
          let f = this.innerText;
          const v = this.parentNode, y = v.dataset.property;
          v.dataset.type === "number" && (f = Number(f)), p(y, f);
        });
      else if ((o === "enum" || o === "combo") && "values" in r) {
        const f = b.getPropertyPrintableValue(a, r.values);
        m.innerText = f, m.addEventListener("click", function(v) {
          let y = r.values || [];
          typeof y == "function" && (console.error("Values by callback not supported in panel.addWidget!", y), y = []);
          const N = this.parentNode.dataset.property, E = this, T = Array.from(y).map((F) => ({ content: F }));
          new U(T, {
            event: v,
            className: "dark",
            callback: M
          }, n);
          function M(F, I, D) {
            return E.innerText = F.content, p(N, F.content), !1;
          }
        });
      }
      i.content.appendChild(u);
      function p(f, v) {
        r.callback && r.callback(f, v, r), c && c(f, v, r);
      }
      return u;
    }, i.onOpen && typeof i.onOpen == "function" && i.onOpen(), i;
  }
  checkPanels() {
    if (!this.canvas)
      return;
    const e = this.canvas.parentNode.querySelectorAll(".litegraph.dialog");
    for (let s = 0; s < e.length; ++s) {
      const n = e[s];
      if (n.node && (n.node.graph || n.close(), n.node.graph !== this.graph)) {
        if (n.node.is(Z) && this.graph._is_subgraph && this.graph === n.node.subgraph)
          continue;
        n.close();
      }
    }
  }
  closePanels() {
    let e = document.querySelector("#node-panel");
    e && e.close(), e = document.querySelector("#option-panel"), e && e.close();
  }
}
w.onShowPropertyEditor = function(t, e, s, n, i) {
  const o = t.value;
  console.log(o);
  const l = o.name, a = i[l], r = document.createElement("div");
  r.is_modified = !1, r.className = "graphdialog", r.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", r.close = function() {
    r.parentNode && r.parentNode.removeChild(r);
  };
  const c = r.querySelector(".name");
  c.innerText = l;
  const d = r.querySelector(".value");
  if (d && (d.value = a, d.addEventListener("blur", function(E) {
    this.focus();
  }), d.addEventListener("keydown", (E) => {
    if (r.is_modified = !0, E.keyCode === 27)
      r.close();
    else if (E.keyCode === 13)
      v();
    else if (E.keyCode !== 13 && E.target instanceof Element && E.target.localName !== "textarea")
      return;
    E.preventDefault(), E.stopPropagation();
  }), o.inputStyle))
    for (const [E, T] of Object.entries(o.inputStyle))
      d.style[E] = T;
  const _ = b.active_canvas.canvas, m = _.getBoundingClientRect();
  let p = -20, f = -20;
  m && (p -= m.left, f -= m.top), s ? (r.style.left = `${s.clientX + p}px`, r.style.top = `${s.clientY + f}px`) : (r.style.left = `${_.width * 0.5 + p}px`, r.style.top = `${_.height * 0.5 + f}px`);
  const v = () => {
    d && y(d.value);
  }, y = (E) => {
    o.type === "number" ? E = Number(E) : o.type === "boolean" && (E = !!E);
    const T = i[l];
    i[l] = E, i.onJSPropertyChanged && i.onJSPropertyChanged(l, E, T) === !1 && (i[l] = T), r.parentNode && r.parentNode.removeChild(r), i.setDirtyCanvas(!0, !0);
  };
  r.querySelector("button").addEventListener("click", v), _.parentNode.appendChild(r), d && d.focus();
  let N = null;
  r.addEventListener("mouseleave", (E) => {
    h.dialog_close_on_mouse_leave && !r.is_modified && h.dialog_close_on_mouse_leave && E.buttons === 0 && (N = setTimeout(r.close, h.dialog_close_on_mouse_leave_delay));
  }), r.addEventListener("mouseenter", (E) => {
    h.dialog_close_on_mouse_leave && N && clearTimeout(N);
  }), dt(r);
};
w.onGroupAdd = function(t, e, s, n) {
  const i = b.active_canvas;
  i.getCanvasWindow();
  const o = new ht();
  o.pos = i.convertEventToCanvasOffset(s), i.graph.addGroup(o);
};
w.onMenuAdd = function(t, e, s, n, i) {
  const o = b.active_canvas, l = o.getCanvasWindow(), a = o.graph;
  if (!a)
    return;
  function r(c, d) {
    const u = h.getNodeTypesCategories(o.filter || a.filter).filter((p) => p.startsWith(c)), _ = [];
    u.map((p) => {
      if (!p)
        return;
      const f = new RegExp(`^(${c})`), v = p.replace(f, "").split("/")[0], y = c === "" ? `${v}/` : `${c + v}/`;
      let g = v;
      g.includes("::") && (g = g.split("::")[1]), _.findIndex((E) => E.value === y) === -1 && _.push(
        {
          value: y,
          content: g,
          has_submenu: !0,
          callback(E, T, M, F) {
            r(E.value, F);
          }
        }
      );
    }), h.getNodeTypesInCategory(c.slice(0, -1), o.filter || a.filter).map((p) => {
      if (p.hide_in_node_lists)
        return;
      const f = {
        value: p.class,
        content: p.title,
        has_submenu: !1,
        callback(v, y, g, N) {
          const E = N.getFirstEvent();
          o.graph.beforeChange();
          const T = h.createNode(v.value);
          T && (T.pos = o.convertEventToCanvasOffset(E), o.graph.add(T)), i && i(T), o.graph.afterChange();
        }
      };
      _.push(f);
    }), new U(_, { event: s, parentMenu: d }, l);
  }
  return r("", n), !1;
};
w.showMenuNodeOptionalInputs = function(t, e, s, n, i) {
  if (!i)
    return;
  const o = this, a = b.active_canvas.getCanvasWindow(), r = i.getOptionalSlots().inputs;
  let c = [];
  if (r)
    for (let u = 0; u < r.length; u++) {
      const _ = r[u];
      if (!_) {
        c.push($.SEPARATOR);
        continue;
      }
      let { name: m, type: p, options: f } = _;
      f || (f = {}), f.label && (m = f.label), f.removable = !0;
      const v = { content: m, value: _ };
      p === O.ACTION && (v.className = "event"), c.push(v);
    }
  if (i.onMenuNodeInputs) {
    const u = i.onMenuNodeInputs(c);
    u && (c = u);
  }
  if (!c.length) {
    console.log("no input entries");
    return;
  }
  new U(
    c,
    {
      event: s,
      callback: d,
      parentMenu: n,
      node: i
    },
    a
  );
  function d(u, _, m, p) {
    if (i && (u.callback && u.callback.call(o, i, u, m, p), u.value)) {
      const f = u.value;
      i.graph.beforeChange(), i.addInput(f.name, f.type, f.options), i.onNodeOptionalInputAdd && i.onNodeOptionalInputAdd(u.value), i.setDirtyCanvas(!0, !0), i.graph.afterChange();
    }
  }
  return !1;
};
w.showMenuNodeOptionalOutputs = function(t, e, s, n, i) {
  if (!i)
    return;
  const o = this, a = b.active_canvas.getCanvasWindow(), r = i.getOptionalSlots().outputs;
  let c = [];
  if (r)
    for (let u = 0; u < r.length; u++) {
      const _ = r[u];
      if (!_) {
        c.push($.SEPARATOR);
        continue;
      }
      let { name: m, type: p, options: f } = _;
      if (i.flags && i.flags.skip_repeated_outputs && i.findOutputSlotIndexByName(_[0]) !== -1)
        continue;
      f || (f = {}), f.label && (m = f.label), f.removable = !0;
      const v = { content: m, value: [m, p, f] };
      p === O.EVENT && (v.className = "event"), c.push(v);
    }
  if (this.onMenuNodeOutputs && (c = this.onMenuNodeOutputs(c)), h.do_add_triggers_slots && i.findOutputSlotIndexByName("onExecuted") === -1 && c.push({ content: "On Executed", value: ["onExecuted", O.EVENT, { nameLocked: !0 }], className: "event" }), i.onMenuNodeOutputs) {
    const u = i.onMenuNodeOutputs(c);
    u && (c = u);
  }
  if (!c.length)
    return;
  const d = function(u, _, m, p) {
    if (!i || (u.callback && u.callback.call(o, i, u, m, p), !u.value))
      return;
    const f = u.value[1];
    if (f && (f.constructor === Object || f.constructor === Array)) {
      const v = [];
      for (const y in f)
        v.push({ content: y, value: f[y] });
      return new U(v, {
        event: m,
        callback: d,
        parentMenu: n,
        node: i
      }), !1;
    } else {
      const v = u.value;
      i.graph.beforeChange(), i.addOutput(v.name, v.type, v.options), i.onNodeOptionalOutputAdd && i.onNodeOptionalOutputAdd(u.value), i.setDirtyCanvas(!0, !0), i.graph.afterChange();
    }
  };
  return new U(
    c,
    {
      event: s,
      callback: d,
      parentMenu: n,
      node: i
    },
    a
  ), !1;
};
w.onMenuResizeNode = function(t, e, s, n, i) {
  if (!i)
    return;
  const o = function(a) {
    a.size = a.computeSize(), a.onResize && a.onResize(a.size);
  }, l = b.active_canvas;
  if (!l.selected_nodes || Object.keys(l.selected_nodes).length <= 1)
    o(i);
  else
    for (const a in l.selected_nodes)
      o(l.selected_nodes[a]);
  i.setDirtyCanvas(!0, !0);
};
w.onShowMenuNodeProperties = function(t, e, s, n, i) {
  if (!i || !i.properties)
    return;
  const o = b.active_canvas, l = o.getCanvasWindow(), a = [];
  for (const c in i.properties) {
    let d = i.properties[c] !== void 0 ? i.properties[c] : " ";
    typeof d == "object" && (d = JSON.stringify(d));
    const u = i.getPropertyInfo(c);
    (u.type === "enum" || u.type === "combo") && (d = b.getPropertyPrintableValue(d, u.values)), d = b.decodeHTML(d), a.push({
      content: `<span class='property_name'>${u.label ? u.label : c}</span><span class='property_value'>${d}</span>`,
      value: c
    });
  }
  if (!a.length)
    return;
  new U(
    a,
    {
      event: s,
      callback: r,
      parentMenu: n,
      allow_html: !0,
      node: i
    },
    l
  );
  function r(c, d, u, _) {
    if (!i)
      return;
    const m = this.getBoundingClientRect();
    o.showEditPropertyValue(i, c.value, {
      position: [m.left, m.top]
    });
  }
  return !1;
};
w.onResizeNode = function(t, e, s, n, i) {
  i && (i.size = i.computeSize(), i.setDirtyCanvas(!0, !0));
};
w.onMenuNodeCollapse = function(t, e, s, n, i) {
  i.graph.beforeChange(
    /* ? */
  );
  const o = function(a) {
    a.collapse();
  }, l = b.active_canvas;
  if (!l.selected_nodes || Object.keys(l.selected_nodes).length <= 1)
    o(i);
  else
    for (const a in l.selected_nodes)
      o(l.selected_nodes[a]);
  i.graph.afterChange(
    /* ? */
  );
};
w.onMenuNodePin = function(t, e, s, n, i) {
  i.pin();
};
w.onMenuNodeMode = function(t, e, s, n, i) {
  const o = Array.from(J).map((a) => ({ content: a }));
  new U(
    o,
    { event: s, callback: l, parentMenu: n, node: i }
  );
  function l(a) {
    if (!i)
      return;
    const r = Object.values(J).indexOf(a.content), c = function(u) {
      r >= Y.ALWAYS && J[r] ? u.changeMode(r) : (console.warn(`unexpected mode: ${a}`), u.changeMode(Y.ALWAYS));
    }, d = b.active_canvas;
    if (!d.selected_nodes || Object.keys(d.selected_nodes).length <= 1)
      c(i);
    else
      for (const u in d.selected_nodes)
        c(d.selected_nodes[u]);
  }
  return !1;
};
w.onMenuNodeColors = function(t, e, s, n, i) {
  if (!i)
    throw "no node for color";
  const o = [];
  o.push({
    value: null,
    content: "<span style='display: block; padding-left: 4px;'>No color</span>"
  });
  for (const a in b.node_colors) {
    const r = b.node_colors[a], c = {
      value: a,
      content: `<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid ${r.color}; background-color:${r.bgcolor}'>${a}</span>`
    };
    o.push(c);
  }
  new U(o, {
    event: s,
    callback: l,
    parentMenu: n,
    node: i,
    allow_html: !0
  });
  function l(a) {
    if (!i)
      return;
    const r = a.value ? b.node_colors[a.value] : null, c = function(u) {
      r ? u instanceof ht ? u.color = r.groupcolor : (u.color = r.color, u.bgcolor = r.bgcolor) : (delete u.color, u instanceof tt && delete u.bgcolor);
    }, d = b.active_canvas;
    if (!d.selected_nodes || Object.keys(d.selected_nodes).length <= 1)
      c(i);
    else
      for (const u in d.selected_nodes)
        c(d.selected_nodes[u]);
    i.setDirtyCanvas(!0, !0);
  }
  return !1;
};
w.onMenuNodeShapes = function(t, e, s, n, i) {
  if (!i)
    throw "no node passed";
  const o = Array.from(gt).map((a) => ({ content: a }));
  new U(o, {
    event: s,
    callback: l,
    parentMenu: n,
    node: i
  });
  function l(a) {
    if (!i)
      return;
    i.graph.beforeChange(
      /* ? */
    );
    const r = function(d) {
      d.shape = gt.indexOf(a.content);
    }, c = b.active_canvas;
    if (!c.selected_nodes || Object.keys(c.selected_nodes).length <= 1)
      r(i);
    else
      for (const d in c.selected_nodes)
        r(c.selected_nodes[d]);
    i.graph.afterChange(
      /* ? */
    ), i.setDirtyCanvas(!0);
  }
  return !1;
};
w.onMenuNodeRemove = function(t, e, s, n, i) {
  if (!i)
    throw "no node passed";
  const o = i.graph;
  o.beforeChange();
  const l = function(r) {
    r.removable !== !1 && o.remove(r);
  }, a = b.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    l(i);
  else
    for (const r in a.selected_nodes)
      l(a.selected_nodes[r]);
  o.afterChange(), i.setDirtyCanvas(!0, !0);
};
w.onMenuNodeToSubgraph = function(t, e, s, n, i) {
  const o = i.graph, l = b.active_canvas;
  if (!l)
    return;
  let a = Object.values(l.selected_nodes || {});
  a.length || (a = [i]);
  const r = h.createNode("graph/subgraph", null, { constructorArgs: [null] });
  r.pos = i.pos.concat(), o.add(r), r.buildFromNodes(a), l.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
w.onMenuNodeToSubgraphInputs = function(t, e, s, n, i) {
  const o = b.active_canvas;
  if (!o)
    return;
  const l = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !l) {
    console.error("[To Subgraph Inputs] Current graph is not a subgraph!", i.graph);
    return;
  }
  let a = Object.values(o.selected_nodes || {});
  a.length || (a = [i]), l.convertNodesToSubgraphInputs(a), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
w.onMenuNodeToSubgraphOutputs = function(t, e, s, n, i) {
  const o = b.active_canvas;
  if (!o)
    return;
  const l = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !l) {
    console.error("[To Subgraph Outputs] Current graph is not a subgraph!", i.graph);
    return;
  }
  let a = Object.values(o.selected_nodes || {});
  a.length || (a = [i]), l.convertNodesToSubgraphOutputs(a), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
w.onMenuNodeToParentGraph = function(t, e, s, n, i) {
  const o = b.active_canvas;
  if (!o)
    return;
  const l = i.graph._subgraph_node;
  if (!i.graph._is_subgraph || !l) {
    console.error("[To Parent Graph] Current graph is not a subgraph!", i.graph);
    return;
  }
  let a = Object.values(o.selected_nodes || {});
  a.length || (a = [i]), l.moveNodesToParentGraph(a), o.deselectAllNodes(), i.setDirtyCanvas(!0, !0);
};
w.onMenuNodeClone = function(t, e, s, n, i) {
  const o = b.active_canvas;
  (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1) && o.selectNode(i), o.cloneSelection();
};
class Bt {
  constructor(e, s = !1) {
    this.offset = [0, 0], this.scale = 1, this.max_scale = 10, this.min_scale = 0.1, this.onredraw = null, this.enabled = !0, this.last_mouse = [0, 0], this.element = null, this.visible_area = new Float32Array([0, 0, 0, 0]), this.viewport = null, this.dragging = !1, this._binded_mouse_callback = null, e && (this.element = e, s || this.bindEvents(e));
  }
  bindEvents(e) {
    this.last_mouse = [0, 0], this._binded_mouse_callback = this.onMouse.bind(this), h.pointerListenerAdd(e, "down", this._binded_mouse_callback), h.pointerListenerAdd(e, "move", this._binded_mouse_callback), h.pointerListenerAdd(e, "up", this._binded_mouse_callback), e.addEventListener(
      "mousewheel",
      this._binded_mouse_callback,
      !1
    ), e.addEventListener("wheel", this._binded_mouse_callback, !1);
  }
  computeVisibleArea(e) {
    if (!this.element) {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      return;
    }
    let s = this.element.width, n = this.element.height, i = -this.offset[0], o = -this.offset[1];
    e && (i += e[0] / this.scale, o += e[1] / this.scale, s = e[2], n = e[3]);
    const l = i + s / this.scale, a = o + n / this.scale;
    this.visible_area[0] = i, this.visible_area[1] = o, this.visible_area[2] = l - i, this.visible_area[3] = a - o;
  }
  onMouse(e) {
    if (!this.enabled)
      return;
    const s = this.element, n = s.getBoundingClientRect(), i = e, o = i.clientX - n.left, l = i.clientY - n.top;
    i.canvasX = o, i.canvasX = l, i.dragging = this.dragging;
    const a = !this.viewport || this.viewport && o >= this.viewport[0] && o < this.viewport[0] + this.viewport[2] && l >= this.viewport[1] && l < this.viewport[1] + this.viewport[3];
    if (i.type === `${h.pointerevents_method}down` && a)
      this.dragging = !0, h.pointerListenerRemove(s, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "up", this._binded_mouse_callback);
    else if (i.type === `${h.pointerevents_method}move`) {
      const r = o - this.last_mouse[0], c = l - this.last_mouse[1];
      this.dragging && this.mouseDrag(r, c);
    } else
      i.type === `${h.pointerevents_method}up` ? (this.dragging = !1, h.pointerListenerRemove(document, "move", this._binded_mouse_callback), h.pointerListenerRemove(document, "up", this._binded_mouse_callback), h.pointerListenerAdd(s, "move", this._binded_mouse_callback)) : a && (i.type === "mousewheel" || i.type === "wheel" || i.type === "DOMMouseScroll") && (i.eventType = "mousewheel", i.type === "wheel" ? i.wheel = -i.deltaY : i.wheel = i.wheelDeltaY !== null ? i.wheelDeltaY : i.detail * -60, i.delta = i.wheelDelta ? i.wheelDelta / 40 : i.deltaY ? -i.deltaY / 3 : 0, this.changeDeltaScale(1 + i.delta * 0.05, [i.clientX, i.clientY]));
    if (this.last_mouse[0] = o, this.last_mouse[1] = l, a)
      return i.preventDefault(), i.stopPropagation(), !1;
  }
  toCanvasContext(e) {
    e.scale(this.scale, this.scale), e.translate(this.offset[0], this.offset[1]);
  }
  convertOffsetToCanvas(e) {
    return [
      (e[0] + this.offset[0]) * this.scale,
      (e[1] + this.offset[1]) * this.scale
    ];
  }
  convertCanvasToOffset(e, s = [0, 0]) {
    return s[0] = e[0] / this.scale - this.offset[0], s[1] = e[1] / this.scale - this.offset[1], s;
  }
  mouseDrag(e, s) {
    this.offset[0] += e / this.scale, this.offset[1] += s / this.scale, this.onredraw && this.onredraw(this);
  }
  changeScale(e, s) {
    if (e < this.min_scale ? e = this.min_scale : e > this.max_scale && (e = this.max_scale), e === this.scale || !this.element)
      return;
    const n = this.element.getBoundingClientRect();
    if (!n)
      return;
    s = s || [
      n.width * 0.5,
      n.height * 0.5
    ], s[0] -= n.left, s[1] -= n.top;
    const i = this.convertCanvasToOffset(s);
    this.scale = e, Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
    const o = this.convertCanvasToOffset(s), l = [
      o[0] - i[0],
      o[1] - i[1]
    ];
    this.offset[0] += l[0], this.offset[1] += l[1], this.onredraw && this.onredraw(this);
  }
  changeDeltaScale(e, s) {
    this.changeScale(this.scale * e, s);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
const ot = class {
  constructor(t, e, s = {}) {
    this.link_type_colors = {}, this.node_panel = null, this.options_panel = null, this.render_time = 0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_reconnect_links = !0, this.allow_searchbox = !0, this.always_render_background = !1, this.background_image = ot.DEFAULT_BACKGROUND_IMAGE, this.block_click = !1, this.clear_background = !0, this.connecting_pos = null, this.connecting_slot = null, this.connecting_input = null, this.connecting_output = null, this.connections_width = 3, this.current_node = null, this.drag_mode = !1, this.dragging_rectangle = null, this.ds = new Bt(), this.editor_alpha = 1, this.filter = null, this.highquality_render = !0, this.skip_events = !1, this.last_mouse_position = [0, 0], this.last_click_position = [0, 0], this.last_click_position_offset = [0, 0], this.last_mouse_dragging = !1, this.links_render_mode = rt.SPLINE_LINK, this.live_mode = !1, this.mouse = [0, 0], this.offset_mouse = [0, 0], this.graph_mouse = [0, 0], this.node_widget = null, this.maxZoom = null, this.minZoom = null, this.multi_select = !1, this.over_link_center = null, this.pause_rendering = !1, this.read_only = !1, this.render_canvas_border = !0, this.render_collapsed_slots = !0, this.render_connection_arrows = !1, this.render_connections_border = !0, this.render_connections_shadows = !1, this.render_connections = !0, this.render_curved_connections = !1, this.render_execution_order = !1, this.render_link_tooltip = !0, this.render_only_selected = !0, this.render_shadows = !0, this.render_title_colored = !0, this.render_subgraph_panels = !0, this.render_subgraph_stack_header = !0, this.round_radius = 8, this.set_canvas_dirty_on_mouse_event = !0, this.show_info = !0, this.use_gradients = !1, this.visible_links = [], this.zoom_modify_alpha = !0, this.pointer_is_down = !1, this.pointer_is_double = !1, this._highlight_input = null, this._highlight_input_slot = null, this._highlight_output = null, this._graph_stack = [], this._bg_img = null, this._pattern = null, this._pattern_img = null, this.search_box = null, this.prompt_box = null, this._events_binded = !1, this.resizing_node = null, typeof t == "string" && (t = document.querySelector(t)), this.skip_events = s.skip_events || !1, this.title_text_font = `${h.NODE_TEXT_SIZE}px Arial`, this.inner_text_font = `normal ${h.NODE_SUBTEXT_SIZE}px Arial`, this.node_title_color = h.NODE_TITLE_COLOR, this.default_link_color = h.LINK_COLOR, this.link_type_colors = h.cloneObject(ot.DEFAULT_LINK_TYPE_COLORS), this.canvas_mouse = this.graph_mouse, this.visible_area = this.ds.visible_area, this.viewport = s.viewport || null, e && e.attachCanvas(this), this.setCanvas(t, s.skip_events), this.clear(), s.skip_render || this.startRendering(), this.autoresize = s.autoresize;
  }
  static getFileExtension(t) {
    const e = t.indexOf("?");
    e !== -1 && (t = t.substr(0, e));
    const s = t.lastIndexOf(".");
    return s === -1 ? "" : t.substr(s + 1).toLowerCase();
  }
  static decodeHTML(t) {
    const e = document.createElement("div");
    return e.innerText = t, e.innerHTML;
  }
  static getPropertyPrintableValue(t, e) {
    if (!e || e.constructor === Array)
      return String(t);
    if (e.constructor === Object) {
      let s = "";
      for (const n in e)
        if (e[n] === t) {
          s = n;
          break;
        }
      return `${String(t)} (${s})`;
    }
  }
  get scale() {
    return this.ds.scale;
  }
  set scale(t) {
    this.ds.scale = t;
  }
  /** clears all the data inside */
  clear() {
    this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.visible_nodes = [], this.node_dragged = null, this.node_over = null, this.node_capturing_input = null, this.connecting_node = null, this.highlighted_links = {}, this.dragging_canvas = !1, this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer_is_down = !1, this.pointer_is_double = !1, this.onClear && this.onClear();
  }
  /** assigns a graph, you can reassign graphs to the same canvas */
  setGraph(t, e = !1) {
    if (this.graph !== t) {
      if (e || this.clear(), !t && this.graph) {
        this.graph.detachCanvas(this);
        return;
      }
      t.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0);
    }
  }
  /** opens a graph contained inside a node in the current graph */
  openSubgraph(t) {
    if (!t)
      throw "graph cannot be null";
    if (this.graph === t)
      throw "graph cannot be the same";
    if (this.clear(), this.graph) {
      this._graph_stack || (this._graph_stack = []);
      const s = [this.ds.offset[0], this.ds.offset[1]];
      this._graph_stack.push({ graph: this.graph, offset: s, scale: this.ds.scale });
    }
    h.debug && (console.warn("SubGraph opened", t), console.warn("Graph inputs", t.inputs), console.warn("Graph outputs", t.outputs)), t.attachCanvas(this);
    const e = [0, 0];
    if (t._nodes.length > 0) {
      let s = Number.MAX_SAFE_INTEGER, n = 0, i = Number.MAX_SAFE_INTEGER, o = 0;
      for (const l of t.iterateNodesInOrder())
        s = Math.min(l.pos[0], s), n = Math.max(l.pos[0] + l.size[0], n), i = Math.min(l.pos[1], i), o = Math.max(l.pos[1] + l.size[1], o);
      e[0] = -(s + (n - s) / 2) + this.canvas.width / 2, e[1] = -(i + (o - i) / 2) + this.canvas.height / 2;
    }
    this.ds.offset = e, this.ds.scale = 1, this.checkPanels(), this.setDirty(!0, !0);
  }
  closeAllSubgraphs() {
    for (; this._graph_stack && this._graph_stack.length > 0; )
      this.closeSubgraph();
  }
  /** closes a subgraph contained inside a node */
  closeSubgraph() {
    if (!this._graph_stack || this._graph_stack.length === 0)
      return;
    const t = this.graph._subgraph_node, { graph: e, offset: s, scale: n } = this._graph_stack.pop();
    this.selected_nodes = {}, this.highlighted_links = {}, e.attachCanvas(this), this.setDirty(!0, !0), t && (this.centerOnNode(t), this.selectNodes([t])), this.ds.offset = s, this.ds.scale = n;
  }
  /** assigns a canvas */
  setCanvas(t, e = !1) {
    if (t && typeof t == "string" && (t = document.getElementById(t), !t))
      throw "Error creating LiteGraph canvas: Canvas not found";
    if (t = t, t !== this.canvas && (!t && this.canvas && (e || this.unbindEvents()), this.canvas = t, this.ds.element = t, !!t)) {
      if (t.className += " lgraphcanvas", t.data = this, t.tabIndex = 1, this.bgcanvas = null, this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height), t.getContext === null)
        throw t.localName !== "canvas" ? `Element supplied for LGraphCanvas must be a <canvas> element, you passed a ${t.localName}` : "This browser doesn't support Canvas";
      e || this.bindEvents(), this.adjustCanvasForHiDPI();
    }
  }
  // used in some events to capture them
  _doNothing(t) {
    return t.preventDefault(), !1;
  }
  _doReturnTrue(t) {
    return t.preventDefault(), !0;
  }
  /** binds mouse, keyboard, touch and drag events to the canvas */
  bindEvents() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }
    const t = this.canvas, s = this.getCanvasWindow().document;
    this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), h.pointerListenerAdd(t, "down", this._mousedown_callback, !0), t.addEventListener("mousewheel", this._mousewheel_callback, !1), h.pointerListenerAdd(t, "up", this._mouseup_callback, !0), h.pointerListenerAdd(t, "move", this._mousemove_callback), t.addEventListener("contextmenu", this._doNothing), t.addEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback,
      !1
    ), this._key_callback = this.processKey.bind(this), t.addEventListener("keydown", this._key_callback, !0), s.addEventListener("keyup", this._key_callback, !0), this._ondrop_callback = this.processDrop.bind(this), t.addEventListener("dragover", this._doNothing, !1), t.addEventListener("dragend", this._doNothing, !1), t.addEventListener("drop", this._ondrop_callback, !1), t.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
  }
  /** unbinds mouse events from the canvas */
  unbindEvents() {
    if (!this._events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }
    h.debug && console.log("pointerevents: unbindEvents");
    const e = this.getCanvasWindow().document;
    h.pointerListenerRemove(this.canvas, "move", this._mousedown_callback), h.pointerListenerRemove(this.canvas, "up", this._mousedown_callback), h.pointerListenerRemove(this.canvas, "down", this._mousedown_callback), this.canvas.removeEventListener(
      "mousewheel",
      this._mousewheel_callback
    ), this.canvas.removeEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback
    ), this.canvas.removeEventListener("keydown", this._key_callback), e.removeEventListener("keyup", this._key_callback), this.canvas.removeEventListener("contextmenu", this._doNothing), this.canvas.removeEventListener("drop", this._ondrop_callback), this.canvas.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = null, this._mousewheel_callback = null, this._key_callback = null, this._ondrop_callback = null, this._events_binded = !1;
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
  setDirty(t = !1, e = !1) {
    t && (this.dirty_canvas = !0), e && (this.dirty_bgcanvas = !0);
  }
  /**
   * Used to attach the canvas in a popup
   * @return the window where the canvas is attached (the DOM root node)
   */
  getCanvasWindow() {
    return this.canvas ? this.canvas.ownerDocument.defaultView : window;
  }
  adjustCanvasForHiDPI(t) {
    if (t || (t = window.devicePixelRatio), t === 1 || !this.canvas.parentNode)
      return;
    const e = this.canvas.parentNode.getBoundingClientRect(), { width: s, height: n } = e;
    this.canvas.width = s * t, this.canvas.height = n * t, this.canvas.style.width = `${s}px`, this.canvas.style.height = `${n}px`, this.canvas.getContext("2d").scale(t, t);
  }
  /** starts rendering the content of the canvas when needed */
  startRendering() {
    if (this.is_rendering)
      return;
    this.is_rendering = !0, t.call(this);
    function t() {
      this.pause_rendering || this.draw();
      const e = this.getCanvasWindow();
      this.is_rendering && e.requestAnimationFrame(t.bind(this));
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
  createDefaultNodeForSlot(t, e = {}) {
    const s = this, n = e.nodeFrom && e.slotFrom !== null, i = !n && e.nodeTo && e.slotTo !== null;
    if (e = { ...{
      position: [0, 0],
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, ...e }, !n && !i)
      return console.warn(`No data passed to createDefaultNodeForSlot ${e.nodeFrom} ${e.slotFrom} ${e.nodeTo} ${e.slotTo}`), !1;
    if (!t)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    const l = n ? e.nodeFrom : e.nodeTo;
    let a = n ? e.slotFrom : e.slotTo, r = null;
    switch (typeof a) {
      case "string":
        r = n ? l.findOutputSlotIndexByName(a) : l.findInputSlotIndexByName(a), a = n ? l.outputs[a] : l.inputs[a];
        break;
      case "object":
        r = n ? l.findOutputSlotIndexByName(a.name) : l.findInputSlotIndexByName(a.name);
        break;
      case "number":
        r = a, a = n ? l.outputs[a] : l.inputs[a];
        break;
      case "undefined":
      default:
        return console.warn(`Cant get slot information ${a}`), !1;
    }
    a = a, (!a || !r) && console.warn(`createDefaultNodeForSlot bad slotX ${a} ${r}`);
    const c = a.type === O.EVENT ? "_event_" : a.type, d = n ? h.slot_types_default_out : h.slot_types_default_in, u = d[c];
    if (d && u) {
      a.link !== null || a.links && a.links.length > 0;
      let _ = null;
      if (Array.isArray(u)) {
        for (const m in u)
          if (t === d[c][m] || t === "AUTO") {
            _ = d[c][m], h.debug && console.log(`opts.nodeType === slotTypesDefault[fromSlotType][typeX] :: ${t}`);
            break;
          }
      } else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${u}`);
      if (_) {
        let m = null;
        typeof _ == "object" && _.node && (m = _, _ = _.node);
        const p = h.createNode(_);
        if (p) {
          if (m) {
            if (m.properties)
              for (const g in m.properties)
                p.addProperty(g, m.properties[g]);
            if (m.inputs) {
              p.inputs = [];
              for (const g in m.inputs)
                p.addOutput(
                  m.inputs[g][0],
                  m.inputs[g][1]
                );
            }
            if (m.outputs) {
              p.outputs = [];
              for (const g in m.outputs)
                p.addOutput(
                  m.outputs[g][0],
                  m.outputs[g][1]
                );
            }
            m.title && (p.title = m.title), m.json && p.configure(m.json);
          }
          console.warn("PLACING", p.type, e);
          const f = e.position[0] + e.posAdd[0] + (e.posSizeFix[0] ? e.posSizeFix[0] * p.size[0] : 0), v = e.position[1] + e.posAdd[1] + (e.posSizeFix[1] ? e.posSizeFix[1] * p.size[1] : 0), y = [f, v];
          return s.graph.add(p, { pos: y }), n ? e.nodeFrom.connectByTypeInput(r, p, c) : e.nodeTo.connectByTypeOutput(r, p, c), n && i && console.debug("connecting in between"), !0;
        } else
          console.log(`failed creating ${_}`);
      }
    }
    return !1;
  }
  /** returns true if a position (in graph space) is on top of a node little corner box */
  isOverNodeBox(t, e, s) {
    const n = h.NODE_TITLE_HEIGHT;
    return !!h.isInsideRectangle(
      e,
      s,
      t.pos[0] + 2,
      t.pos[1] + 2 - n,
      n - 4,
      n - 4
    );
  }
  /** returns slot index if a position (in graph space) is on top of a node input slot */
  isOverNodeInput(t, e, s, n) {
    if (t.inputs)
      for (let i = 0, o = t.inputs.length; i < o; ++i) {
        const l = t.getConnectionPos(!0, i);
        let a = !1;
        if (t.horizontal ? a = h.isInsideRectangle(
          e,
          s,
          l[0] - 5,
          l[1] - 10,
          10,
          20
        ) : a = h.isInsideRectangle(
          e,
          s,
          l[0] - 10,
          l[1] - 5,
          40,
          10
        ), a)
          return n && (n[0] = l[0], n[1] = l[1]), i;
      }
    return -1;
  }
  /**
   * returns the INDEX if a position (in graph space) is on top of a node output slot
   * @method isOverNodeOuput
   */
  isOverNodeOutput(t, e, s, n) {
    if (t.outputs)
      for (let i = 0, o = t.outputs.length; i < o; ++i) {
        t.outputs[i];
        const l = t.getConnectionPos(!1, i);
        let a = !1;
        if (t.horizontal ? a = h.isInsideRectangle(
          e,
          s,
          l[0] - 5,
          l[1] - 10,
          10,
          20
        ) : a = h.isInsideRectangle(
          e,
          s,
          l[0] - 10,
          l[1] - 5,
          40,
          10
        ), a)
          return n && (n[0] = l[0], n[1] = l[1]), i;
      }
    return -1;
  }
  findLinkCenterAtPos(t, e) {
    for (let s = 0; s < this.visible_links.length; ++s) {
      const n = this.visible_links[s];
      if (this.graph && this.graph.links[n.id] === null)
        continue;
      const i = n._pos;
      if (!(!i || t < i[0] - 4 || t > i[0] + 4 || e < i[1] - 4 || e > i[1] + 4))
        return n;
    }
    return null;
  }
  /** process a key event */
  processKey(t) {
    if (!this.graph)
      return;
    let e = !1;
    if (h.debug && console.log("processKey", t), t.target instanceof Element && t.target.localName === "input")
      return;
    const s = this.allow_interaction && !this.read_only;
    if (t.type === "keydown") {
      if (t.keyCode === 32 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.dragging_canvas = !0, e = !0), t.keyCode === 27 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.node_panel && this.node_panel.close(), this.options_panel && this.options_panel.close(), e = !0), s && (t.keyCode === 65 && t.ctrlKey && (this.selectNodes(), e = !0), t.code === "KeyX" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.cutToClipboard(), e = !0), t.code === "KeyC" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.copyToClipboard(), e = !0), t.code === "KeyV" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.pasteFromClipboard(), t.code === "KeyD" && (t.metaKey || t.ctrlKey) && !t.shiftKey && (this.cloneSelection(), e = !0), (t.keyCode === 46 || t.keyCode === 8) && t.target instanceof Element && t.target.localName !== "input" && t.target.localName !== "textarea" && (this.deleteSelectedNodes(), e = !0), this.selected_nodes))
        for (const n in this.selected_nodes)
          this.selected_nodes[n].onKeyDown && this.selected_nodes[n].onKeyDown(t);
    } else if (t.type === "keyup" && (t.keyCode === 32 && (this.dragging_canvas = !1), s && this.selected_nodes))
      for (const n in this.selected_nodes)
        this.selected_nodes[n].onKeyUp && this.selected_nodes[n].onKeyUp(t);
    if (this.graph.change(), e)
      return t.preventDefault(), t.stopImmediatePropagation(), !1;
  }
  cutToClipboard() {
    this.copyToClipboard(), this.deleteSelectedNodes();
  }
  copyToClipboard() {
    const t = {
      nodes: [],
      nodeCloneData: {},
      links: []
    };
    let e = 0;
    const s = [];
    for (const n in this.selected_nodes) {
      const i = this.selected_nodes[n];
      i._relative_id = e, s.push(i), e += 1;
    }
    for (let n = 0; n < s.length; ++n) {
      const i = s[n];
      if (!i.clonable)
        continue;
      const o = { forNode: {} }, l = i.clone(o);
      if (!l) {
        console.warn(`node type not found: ${i.type}`);
        continue;
      }
      if (t.nodes.push(l.serialize()), t.nodeCloneData[l.id] = {
        prevNodeID: i.id,
        cloneData: o
      }, i.inputs && i.inputs.length)
        for (let a = 0; a < i.inputs.length; ++a) {
          const r = i.inputs[a];
          if (!r || r.link === null)
            continue;
          const c = this.graph.links[r.link];
          if (!c)
            continue;
          const d = this.graph.getNodeById(
            c.origin_id
          );
          !d || !this.selected_nodes[d.id] || !this.selected_nodes[d.id].clonable || t.links.push([
            d._relative_id,
            c.origin_slot,
            // j,
            i._relative_id,
            c.target_slot
          ]);
        }
    }
    localStorage.setItem(
      "litegrapheditor_clipboard",
      JSON.stringify(t)
    );
  }
  pasteFromClipboard() {
    const t = localStorage.getItem("litegrapheditor_clipboard");
    if (!t)
      return;
    this.graph.beforeChange();
    const e = JSON.parse(t);
    let s = null, n = null;
    for (let o = 0; o < e.nodes.length; ++o)
      s ? (s[0] > e.nodes[o].pos[0] && (s[0] = e.nodes[o].pos[0], n[0] = o), s[1] > e.nodes[o].pos[1] && (s[1] = e.nodes[o].pos[1], n[1] = o)) : (s = [e.nodes[o].pos[0], e.nodes[o].pos[1]], n = [o, o]);
    const i = [];
    for (let o = 0; o < e.nodes.length; ++o) {
      const l = e.nodes[o], a = h.createNode(l.type);
      if (a) {
        a.configure(l), a.pos[0] += this.graph_mouse[0] - s[0], a.pos[1] += this.graph_mouse[1] - s[1];
        const { cloneData: r, prevNodeID: c } = e.nodeCloneData[a.id];
        this.graph.add(a, { doProcessChange: !1, addedBy: "paste", prevNodeID: c, cloneData: r }), i.push(a);
      }
    }
    for (let o = 0; o < e.links.length; ++o) {
      const l = e.links[o], a = i[l[0]], r = i[l[2]];
      a && r ? a.connect(l[1], r, l[3]) : console.warn("Warning, nodes missing on pasting");
    }
    this.selectNodes(i), this.graph.afterChange();
  }
  cloneSelection() {
    if (!this.selected_nodes || Object.keys(this.selected_nodes).length === 0)
      return;
    this.graph.beforeChange();
    const t = {}, e = [], s = {};
    for (const i of Object.values(this.selected_nodes))
      for (const o of i.iterateAllLinks())
        this.selected_nodes[o.origin_id] && this.selected_nodes[o.target_id] && e.push(o);
    const n = function(i) {
      if (i.clonable === !1)
        return;
      const o = i.id, l = { forNode: {} }, a = i.clone(l);
      a && (s[o] = a, a.pos = [i.pos[0] + 5, i.pos[1] + 5], i.graph.add(a, { addedBy: "cloneSelection", prevNodeID: o, prevNode: i, cloneData: l }), t[a.id] = a);
    };
    for (const i in this.selected_nodes)
      n(this.selected_nodes[i]);
    for (const i of e) {
      const o = s[i.origin_id], l = s[i.target_id];
      o && l && o.connect(i.origin_slot, l, i.target_slot);
    }
    Object.keys(t).length && this.selectNodes(Object.values(t)), this.graph.afterChange(), this.setDirty(!0, !0);
  }
  processDrop(t) {
    const e = t;
    e.preventDefault(), this.adjustMouseEvent(e);
    const s = e.clientX, n = e.clientY;
    if (!(!this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && n >= this.viewport[1] && n < this.viewport[1] + this.viewport[3]))
      return;
    const o = [e.canvasX, e.canvasY], l = this.graph ? this.graph.getNodeOnPos(o[0], o[1]) : null;
    if (!l) {
      let a = null;
      this.onDropItem && (a = this.onDropItem(e)), a || this.checkDropItem(e);
      return;
    }
    if (l.onDropFile || l.onDropData) {
      const a = e.dataTransfer.files;
      if (a && a.length)
        for (let r = 0; r < a.length; r++) {
          const c = e.dataTransfer.files[0], d = c.name;
          if (ot.getFileExtension(d), l.onDropFile && l.onDropFile(c), l.onDropData) {
            const u = new FileReader();
            u.onload = function(m) {
              const p = m.target.result;
              l.onDropData(p, d, c);
            };
            const _ = c.type.split("/")[0];
            _ === "text" || _ === "" ? u.readAsText(c) : _ === "image" ? u.readAsDataURL(c) : u.readAsArrayBuffer(c);
          }
        }
    }
    return !!(l.onDropItem && l.onDropItem(e) || this.onDropItem && this.onDropItem(e));
  }
  checkDropItem(t) {
    const e = t;
    if (e.dataTransfer.files.length) {
      const s = e.dataTransfer.files[0], n = ot.getFileExtension(s.name).toLowerCase(), i = h.node_types_by_file_extension[n];
      if (i) {
        this.graph.beforeChange();
        const o = h.createNode(i.type);
        o.pos = [e.canvasX, e.canvasY], this.graph.add(o), o.onDropFile && o.onDropFile(s), this.graph.afterChange();
      }
    }
  }
  processNodeDblClicked(t) {
    this.onShowNodePanel ? this.onShowNodePanel(t) : this.showShowNodePanel(t), this.onNodeDblClicked && this.onNodeDblClicked(t), this.setDirty(!0);
  }
  processNodeSelected(t, e) {
    this.selectNode(t, e && (e.shiftKey || e.ctrlKey || this.multi_select)), this.onNodeSelected && this.onNodeSelected(t);
  }
  /** selects a given node (or adds it to the current selection) */
  selectNode(t, e = !1) {
    t === null ? this.deselectAllNodes() : this.selectNodes([t], e);
  }
  /** selects several nodes (or adds them to the current selection) */
  selectNodes(t, e = !1) {
    e || this.deselectAllNodes(), t = t || this.graph._nodes, typeof t == "string" && (t = [t]);
    for (const s in t) {
      const n = t[s];
      if (n.is_selected) {
        this.deselectNode(n);
        continue;
      }
      if (!n.is_selected && n.onSelected && n.onSelected(), n.is_selected = !0, this.selected_nodes[n.id] = n, n.inputs)
        for (let i = 0; i < n.inputs.length; ++i)
          this.highlighted_links[n.inputs[i].link] = !0;
      if (n.outputs)
        for (let i = 0; i < n.outputs.length; ++i) {
          const o = n.outputs[i];
          if (o.links)
            for (let l = 0; l < o.links.length; ++l)
              this.highlighted_links[o.links[l]] = !0;
        }
    }
    this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** removes a node from the current selection */
  deselectNode(t) {
    if (t.is_selected) {
      if (t.onDeselected && t.onDeselected(), t.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(t), t.inputs)
        for (let e = 0; e < t.inputs.length; ++e)
          delete this.highlighted_links[t.inputs[e].link];
      if (t.outputs)
        for (let e = 0; e < t.outputs.length; ++e) {
          const s = t.outputs[e];
          if (s.links)
            for (let n = 0; n < s.links.length; ++n)
              delete this.highlighted_links[s.links[n]];
        }
    }
  }
  /** removes all nodes from the current selection */
  deselectAllNodes() {
    if (!this.graph)
      return;
    const t = this.graph._nodes;
    for (let e = 0, s = t.length; e < s; ++e) {
      const n = t[e];
      n.is_selected && (n.onDeselected && n.onDeselected(), n.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(n));
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** deletes all nodes in the current selection from the graph */
  deleteSelectedNodes() {
    this.graph.beforeChange();
    for (const t in this.selected_nodes) {
      const e = this.selected_nodes[t];
      if (!e.block_delete) {
        if (e.inputs && e.inputs.length && e.outputs && e.outputs.length && h.isValidConnection(e.inputs[0].type, e.outputs[0].type) && e.inputs[0].link && e.outputs[0].links && e.outputs[0].links.length) {
          const s = e.graph.links[e.inputs[0].link], n = e.graph.links[e.outputs[0].links[0]], i = e.getInputNode(0), o = e.getOutputNodes(0)[0];
          i && o && i.connect(s.origin_slot, o, n.target_slot);
        }
        this.graph.remove(e), this.onNodeDeselected && this.onNodeDeselected(e);
      }
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.setDirty(!0), this.graph.afterChange();
  }
  /** centers the camera on a given node */
  centerOnNode(t) {
    this.ds.offset[0] = -t.pos[0] - t.size[0] * 0.5 + this.canvas.width * 0.5 / this.ds.scale, this.ds.offset[1] = -t.pos[1] - t.size[1] * 0.5 + this.canvas.height * 0.5 / this.ds.scale, this.setDirty(!0, !0);
  }
  /**
   * adds some useful properties to a mouse event, like the position in graph coordinates
   * @method adjustMouseEvent
   */
  adjustMouseEvent(t) {
    const e = t;
    let s = 0, n = 0;
    if (this.canvas) {
      const i = this.canvas.getBoundingClientRect();
      s = e.clientX - i.left, n = e.clientY - i.top;
    } else
      s = e.clientX, n = e.clientY;
    return this.last_mouse_position[0] = s, this.last_mouse_position[1] = n, e.canvasX = s / this.ds.scale - this.ds.offset[0], e.canvasY = n / this.ds.scale - this.ds.offset[1], e;
  }
  /** process an event on widgets */
  processNodeWidgets(t, e, s, n) {
    if (!t.widgets || !t.widgets.length || h.ignore_all_widget_events)
      return null;
    const i = e[0] - t.pos[0], o = e[1] - t.pos[1], l = t.size[0], a = this, r = this.getCanvasWindow();
    for (let d = 0; d < t.widgets.length; ++d) {
      const u = t.widgets[d];
      if (!u || u.disabled)
        continue;
      const _ = u.computeSize ? u.computeSize(l)[1] : h.NODE_WIDGET_HEIGHT, m = u.width || l;
      if (u !== n && (i < 6 || i > m - 12 || o < u.last_y || o > u.last_y + _ || u.last_y === void 0))
        continue;
      const p = u.value;
      switch (u.type) {
        case "button":
          s.type === `${h.pointerevents_method}down` && (u.callback && setTimeout(() => {
            u.callback(u, a, t, e, s);
          }, 20), u.clicked = !0, this.dirty_canvas = !0);
          break;
        case "slider":
          u.options.max - u.options.min;
          const f = pt((i - 15) / (m - 30), 0, 1);
          u.value = u.options.min + (u.options.max - u.options.min) * f, u.callback && setTimeout(() => {
            c(u, u.value);
          }, 20), this.dirty_canvas = !0;
          break;
        case "number":
        case "combo":
          const v = u.value;
          if (s.type === `${h.pointerevents_method}move` && u.type === "number")
            s.deltaX && (u.value += s.deltaX * (u.options.step || 0.1)), u.options.min !== null && u.value < u.options.min && (u.value = u.options.min), u.options.max !== null && u.value > u.options.max && (u.value = u.options.max);
          else if (s.type === `${h.pointerevents_method}down`) {
            let y = u.options.values;
            if (y && typeof y == "function") {
              const E = u.options.values;
              y = E(u, t);
            }
            let g = null;
            u.type !== "number" && (g = Array.isArray(y) ? y : Object.keys(y));
            const N = i < 40 ? -1 : i > m - 40 ? 1 : 0;
            if (u.type === "number")
              u.value += N * (u.options.step || 0.1), u.options.min !== null && u.value < u.options.min && (u.value = u.options.min), u.options.max !== null && u.value > u.options.max && (u.value = u.options.max);
            else if (N) {
              let E = -1;
              this.last_mouseclick = 0, y.constructor === Object ? E = g.indexOf(String(u.value)) + N : E = g.indexOf(u.value) + N, E >= g.length && (E = g.length - 1), E < 0 && (E = 0), Array.isArray(y) ? u.value = y[E] : u.value = E;
            } else {
              let E = function(F, I, D) {
                let C = F.content;
                return y !== g && (C = T.indexOf(C)), this.value = C, c(this, C), a.dirty_canvas = !0, !1;
              };
              const T = y !== g ? Object.values(y) : y, M = Array.from(T).map((F) => ({ content: F }));
              new U(M, {
                scale: Math.max(1, this.ds.scale),
                event: s,
                className: "dark",
                callback: E.bind(u)
              }, r);
            }
          } else if (s.type === `${h.pointerevents_method}up` && u.type === "number") {
            const y = i < 40 ? -1 : i > m - 40 ? 1 : 0;
            s.click_time < 200 && y === 0 && this.prompt("Value", u.value, function(g) {
              this.value = Number(g), c(this, this.value);
            }.bind(u), s);
          }
          v !== u.value && setTimeout(
            function() {
              c(this, this.value);
            }.bind(u),
            20
          ), this.dirty_canvas = !0;
          break;
        case "toggle":
          s.type === `${h.pointerevents_method}down` && (u.value = !u.value, setTimeout(() => {
            c(u, u.value);
          }, 20));
          break;
        case "string":
        case "text":
          s.type === `${h.pointerevents_method}down` && this.prompt("Value", u.value, function(y) {
            this.value = y, c(this, y);
          }.bind(u), s, u.options ? u.options.multiline : !1, u.options.inputStyle);
          break;
        default:
          u.mouse && (this.dirty_canvas = u.mouse(s, [i, o], t));
          break;
      }
      return p !== u.value && (t.onWidgetChanged && t.onWidgetChanged(u, p), t.graph._version++), u;
    }
    function c(d, u) {
      d.value = u, d.options && d.options.property && t.properties[d.options.property] !== void 0 && t.setProperty(d.options.property, u), d.callback && d.callback(d.value, a, t, e, s);
    }
    return null;
  }
  adjustNodesSize() {
    const t = this.graph._nodes;
    for (let e = 0; e < t.length; ++e)
      t[e].size = t[e].computeSize();
    this.setDirty(!0, !0);
  }
  /** resizes the canvas to a given size, if no size is passed, then it tries to fill the parentNode */
  resize(t, e) {
    if (!t && !e) {
      const s = this.canvas.parentNode;
      t = s.offsetWidth, e = s.offsetHeight;
    }
    this.canvas.width === t && this.canvas.height === e || (this.canvas.width = t, this.canvas.height = e, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.adjustCanvasForHiDPI(), this.setDirty(!0, !0));
  }
  isAreaClicked(t, e, s, n, i) {
    let o = this.offset_mouse;
    h.isInsideRectangle(o[0], o[1], t, e, s, n), o = this.last_click_position;
    const l = o && h.isInsideRectangle(o[0], o[1], t, e, s, n), a = l && !this.block_click;
    return l && i && this.blockClick(), a;
  }
  /**
   * switches to live mode (node shapes are not rendered, only the content)
   * this feature was designed when graphs where meant to create user interfaces
   */
  switchLiveMode(t) {
    if (!t) {
      this.live_mode = !this.live_mode, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
      return;
    }
    const e = this, s = this.live_mode ? 1.1 : 0.9;
    this.live_mode && (this.live_mode = !1, this.editor_alpha = 0.1);
    const n = setInterval(() => {
      e.editor_alpha *= s, e.dirty_canvas = !0, e.dirty_bgcanvas = !0, s < 1 && e.editor_alpha < 0.01 && (clearInterval(n), s < 1 && (e.live_mode = !0)), s > 1 && e.editor_alpha > 0.99 && (clearInterval(n), e.editor_alpha = 1);
    }, 1);
  }
  onNodeSelectionChange() {
  }
  touchHandler(t) {
  }
  convertOffsetToCanvas(t) {
    return this.ds.convertOffsetToCanvas(t);
  }
  convertCanvasToOffset(t, e = [0, 0]) {
    return this.ds.convertCanvasToOffset(t, e);
  }
  /** converts event coordinates from canvas2D to graph coordinates */
  convertEventToCanvasOffset(t) {
    const e = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([
      t.clientX - e.left,
      t.clientY - e.top
    ]);
  }
  addGraphInputNode(t, e, s) {
    const n = this.graph.findNodesByClass(X).find((l) => l.properties.name === e);
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
    const o = t.addGraphInput(e, s, i);
    if (o) {
      const l = o.innerNode;
      this.selectNodes([l]), this.graph.afterChange();
    } else
      console.error("graph input node not found:", s);
  }
  addGraphOutputNode(t, e, s) {
    const n = this.graph.findNodesByClass(V).find((l) => l.properties.name === e);
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
    const o = t.addGraphOutput(e, s, i);
    if (o) {
      const l = o.innerNode;
      this.selectNodes([l]), this.graph.afterChange();
    } else
      console.error("graph output node not found:", s);
  }
  getCanvasMenuOptions() {
    return w.prototype.getCanvasMenuOptions.apply(this, arguments);
  }
  getNodeMenuOptions(t) {
    return w.prototype.getNodeMenuOptions.apply(this, arguments);
  }
  getLinkMenuOptions(t) {
    return w.prototype.getLinkMenuOptions.apply(this, arguments);
  }
  getGroupMenuOptions(t) {
    return w.prototype.getGroupMenuOptions.apply(this, arguments);
  }
  checkPanels() {
    w.prototype.checkPanels.apply(this, arguments);
  }
  closePanels() {
    w.prototype.closePanels.apply(this, arguments);
  }
  createDialog(t, e) {
    return w.prototype.createDialog.apply(this, arguments);
  }
  createPanel(t, e = {}) {
    return w.prototype.createPanel.apply(this, arguments);
  }
  showSearchBox(t, e = {}) {
    return w.prototype.showSearchBox.apply(this, arguments);
  }
  prompt(t = "", e, s, n, i = !1, o = null) {
    return w.prototype.prompt.apply(this, arguments);
  }
  showConnectionMenu(t = {}) {
    return w.prototype.showConnectionMenu.apply(this, arguments);
  }
  showLinkMenu(t, e) {
    return w.prototype.showLinkMenu.apply(this, arguments);
  }
  showEditPropertyValue(t, e, s) {
    return w.prototype.showEditPropertyValue.apply(this, arguments);
  }
  showShowNodePanel(t) {
    w.prototype.showShowNodePanel.apply(this, arguments);
  }
  showSubgraphPropertiesDialog(t) {
    return w.prototype.showSubgraphPropertiesDialog.apply(this, arguments);
  }
  showSubgraphPropertiesDialogRight(t) {
    return w.prototype.showSubgraphPropertiesDialogRight.apply(this, arguments);
  }
  processContextMenu(t, e) {
    w.prototype.processContextMenu.apply(this, arguments);
  }
  /*
     * Events
     */
  processMouseMove(t) {
    return lt.prototype.processMouseMove.apply(this, arguments);
  }
  processMouseDown(t) {
    return lt.prototype.processMouseDown.apply(this, arguments);
  }
  processMouseUp(t) {
    return lt.prototype.processMouseUp.apply(this, arguments);
  }
  processMouseWheel(t) {
    return lt.prototype.processMouseWheel.apply(this, arguments);
  }
  /*
     * Rendering
     */
  setZoom(t, e) {
    P.prototype.setZoom.apply(this, arguments);
  }
  bringToFront(t) {
    P.prototype.bringToFront.apply(this, arguments);
  }
  sendToBack(t) {
    P.prototype.sendToBack.apply(this, arguments);
  }
  computeVisibleNodes(t, e = []) {
    return P.prototype.computeVisibleNodes.apply(this, arguments);
  }
  draw(t = !1, e = !1) {
    P.prototype.draw.apply(this, arguments);
  }
  drawFrontCanvas() {
    P.prototype.drawFrontCanvas.apply(this, arguments);
  }
  drawSubgraphPanel(t) {
    P.prototype.drawSubgraphPanel.apply(this, arguments);
  }
  drawSubgraphPanelLeft(t, e, s) {
    P.prototype.drawSubgraphPanelLeft.apply(this, arguments);
  }
  drawSubgraphPanelRight(t, e, s) {
    P.prototype.drawSubgraphPanelRight.apply(this, arguments);
  }
  drawButton(t, e, s, n, i, o = h.NODE_DEFAULT_COLOR, l = "#555", a = h.NODE_TEXT_COLOR, r = !0) {
    return P.prototype.drawButton.apply(this, arguments);
  }
  drawBackCanvas() {
    P.prototype.drawBackCanvas.apply(this, arguments);
  }
  renderInfo(t, e = 10, s) {
    P.prototype.renderInfo.apply(this, arguments);
  }
  drawNode(t, e) {
    P.prototype.drawNode.apply(this, arguments);
  }
  drawLinkTooltip(t, e) {
    P.prototype.drawLinkTooltip.apply(this, arguments);
  }
  drawNodeShape(t, e, s, n, i, o, l) {
    P.prototype.drawNodeShape.apply(this, arguments);
  }
  drawConnections(t) {
    P.prototype.drawConnections.apply(this, arguments);
  }
  renderLink(t, e, s, n, i, o, l, a, r, c) {
    P.prototype.renderLink.apply(this, arguments);
  }
  computeConnectionPoint(t, e, s, n = L.RIGHT, i = L.LEFT) {
    return P.prototype.computeConnectionPoint.apply(this, arguments);
  }
  drawExecutionOrder(t) {
    P.prototype.drawExecutionOrder.apply(this, arguments);
  }
  drawNodeWidgets(t, e, s, n) {
    P.prototype.drawNodeWidgets.apply(this, arguments);
  }
  drawGroups(t, e) {
    P.prototype.drawGroups.apply(this, arguments);
  }
};
let b = ot;
b.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
b.node_colors = {
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
b.DEFAULT_LINK_TYPE_COLORS = {
  [O.ACTION]: h.ACTION_LINK_COLOR,
  [O.EVENT]: h.EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
};
b.DEFAULT_CONNECTION_COLORS = {
  input_off: "#778",
  input_on: "#7F7",
  // "#BBD"
  output_off: "#778",
  output_on: "#7F7"
  // "#BBD"
};
b.DEFAULT_CONNECTION_COLORS_BY_TYPE = {
  number: "#7F7",
  string: "#77F",
  boolean: "#F77"
};
b.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF = {
  number: "#474",
  string: "#447",
  boolean: "#744"
};
b.active_canvas = null;
b.active_node = null;
b.onMenuCollapseAll = w.onMenuCollapseAll;
b.onMenuNodeEdit = w.onMenuNodeEdit;
b.onShowPropertyEditor = w.onShowPropertyEditor;
b.onGroupAdd = w.onGroupAdd;
b.onMenuAdd = w.onMenuAdd;
b.showMenuNodeOptionalInputs = w.showMenuNodeOptionalInputs;
b.showMenuNodeOptionalOutputs = w.showMenuNodeOptionalOutputs;
b.onShowMenuNodeProperties = w.onShowMenuNodeProperties;
b.onResizeNode = w.onResizeNode;
b.onMenuResizeNode = w.onMenuResizeNode;
b.onMenuNodeCollapse = w.onMenuNodeCollapse;
b.onMenuNodePin = w.onMenuNodePin;
b.onMenuNodeMode = w.onMenuNodeMode;
b.onMenuNodeColors = w.onMenuNodeColors;
b.onMenuNodeShapes = w.onMenuNodeShapes;
b.onMenuNodeRemove = w.onMenuNodeRemove;
b.onMenuNodeClone = w.onMenuNodeClone;
b.onMenuNodeToSubgraph = w.onMenuNodeToSubgraph;
b.onMenuNodeToSubgraphInputs = w.onMenuNodeToSubgraphInputs;
b.onMenuNodeToSubgraphOutputs = w.onMenuNodeToSubgraphOutputs;
b.onMenuNodeToParentGraph = w.onMenuNodeToParentGraph;
var $ = /* @__PURE__ */ ((t) => (t[t.SEPARATOR = 0] = "SEPARATOR", t))($ || {});
class U {
  static trigger(e, s, n, i) {
    const o = document.createEvent("CustomEvent");
    return o.initCustomEvent(s, !0, !0, n), o.target = i, e.dispatchEvent && e.dispatchEvent(o), o;
  }
  static isCursorOverElement(e, s) {
    const n = e.clientX, i = e.clientY, o = s.getBoundingClientRect();
    return o ? i > o.top && i < o.top + o.height && n > o.left && n < o.left + o.width : !1;
  }
  static closeAllContextMenus(e) {
    e = e || window;
    const s = e.document.querySelectorAll(".litecontextmenu");
    if (!s.length)
      return;
    const n = Array.from(s);
    for (const i of n)
      i.close();
  }
  constructor(e, s = {}, n) {
    this.options = s;
    const i = this;
    s.parentMenu && (s.parentMenu.constructor !== this.constructor ? (console.error(
      "parentMenu must be of class ContextMenu, ignoring it"
    ), s.parentMenu = null) : (this.parentMenu = s.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    let o = null;
    s.event && (o = s.event.constructor.name), o !== "MouseEvent" && o !== "CustomEvent" && o !== "PointerEvent" && (console.error(
      `Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (${o})`
    ), s.event = null);
    const l = document.createElement("div");
    l.className = "litegraph litecontextmenu litemenubar-panel", s.className && (l.className += ` ${s.className}`), l.style.pointerEvents = "none", setTimeout(() => {
      l.style.pointerEvents = "auto";
    }, 100), h.pointerListenerAdd(l, "up", (u) => (u.preventDefault(), !0), !0), l.addEventListener(
      "contextmenu",
      (u) => (u.button !== 2 || u.preventDefault(), !1),
      !0
    ), l.close = () => {
      l.parentNode.removeChild(l);
    }, h.pointerListenerAdd(l, "down", (u) => {
      if (u.button === 2)
        return i.close(), u.preventDefault(), !0;
    }, !0);
    function a(u) {
      const _ = Number.parseInt(l.style.top);
      return l.style.top = `${(_ + u.deltaY * s.scroll_speed).toFixed()}px`, u.preventDefault(), !0;
    }
    if (s.scroll_speed || (s.scroll_speed = 0.1), l.addEventListener("wheel", a, !0), l.addEventListener("mousewheel", a, !0), this.root = l, s.title) {
      const u = document.createElement("div");
      u.className = "litemenu-title", u.innerHTML = s.title, l.appendChild(u);
    }
    this.values = [];
    for (let u = 0; u < e.length; u++) {
      const _ = e[u];
      let m = "";
      _ === 0 ? m = "" : typeof _ == "string" ? m = _ : m = _.content, this.addItem(m, _, s);
    }
    h.pointerListenerAdd(l, "enter", (u) => {
      l.closing_timer && clearTimeout(l.closing_timer);
    });
    let r = document;
    s.event && s.event.target instanceof Node && (r = s.event.target.ownerDocument), r || (r = document), r.fullscreenElement ? r.fullscreenElement.appendChild(l) : r.body.appendChild(l);
    let c = s.left || 0, d = s.top || 0;
    if (s.event) {
      if (c = s.event.clientX - 10, d = s.event.clientY - 10, s.title && (d -= 20), s.parentMenu) {
        const m = s.parentMenu.root.getBoundingClientRect();
        c = m.left + m.width;
      }
      const u = document.body.getBoundingClientRect(), _ = l.getBoundingClientRect();
      u.height === 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), u.width && c > u.width - _.width - 10 && (c = u.width - _.width - 10), u.height && d > u.height - _.height - 10 && (d = u.height - _.height - 10);
    }
    l.style.left = `${c}px`, l.style.top = `${d}px`, s.scale && (l.style.transform = `scale(${s.scale})`);
  }
  addItem(e, s, n = {}) {
    const i = this, o = document.createElement("div");
    o.className = "litemenu-entry submenu";
    let l = !1;
    typeof s == "string" && (s = { content: s }), s === 0 ? o.classList.add("separator") : (o.innerHTML = s.title ? s.title : e, s.disabled && (l = !0, o.classList.add("disabled")), (s.submenu || s.has_submenu) && o.classList.add("has_submenu"), typeof s == "function" ? o.dataset.value = e : o.dataset.value = `${this.values.length}`, s.className && (o.className += ` ${s.className}`)), this.values.push(s), this.root.appendChild(o), l || o.addEventListener("click", c), n.autoopen && h.pointerListenerAdd(o, "enter", r);
    const a = this;
    function r(d) {
      const u = this.value;
      !u || !u.has_submenu || c.call(this, d);
    }
    function c(d) {
      const u = Number.parseInt(this.dataset.value), _ = a.values[u];
      h.debug && console.debug("ContextMenu inner_onclick", u, _);
      const m = b.active_canvas;
      if (!m)
        return;
      const p = m.adjustMouseEvent(d);
      let f = !0;
      if (i.current_submenu && i.current_submenu.close(p), n.callback && n.callback.call(
        this,
        _,
        n,
        p,
        i,
        n.node
      ) === !0 && (f = !1), _ && typeof _ == "object" && (_.callback && !n.ignore_item_callbacks && _.disabled !== !0 && _.callback.call(
        this,
        _,
        n,
        p,
        i,
        n.extra
      ) === !0 && (f = !1), _.submenu)) {
        if (!_.submenu.options)
          throw "ContextMenu submenu needs options";
        new U(_.submenu.options, {
          callback: _.submenu.callback,
          event: p,
          parentMenu: i,
          ignore_item_callbacks: _.submenu.ignore_item_callbacks,
          title: _.submenu.title,
          extra: _.submenu.extra,
          autoopen: n.autoopen
        }), f = !1;
      }
      f && !i.lock && i.close();
    }
    return o;
  }
  close(e, s) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !s && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, e === void 0 ? this.parentMenu.close() : e && !U.isCursorOverElement(e, this.parentMenu.root) && U.trigger(this.parentMenu.root, `${h.pointerevents_method}leave`, e)), this.current_submenu && this.current_submenu.close(e, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
  }
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
}
export {
  yt as BASE_SLOT_TYPES,
  S as BuiltInSlotShape,
  O as BuiltInSlotType,
  U as ContextMenu,
  $ as ContextMenuSpecialItem,
  L as Dir,
  Bt as DragAndScale,
  X as GraphInput,
  V as GraphOutput,
  G as LConnectionKind,
  Ot as LGraph,
  b as LGraphCanvas,
  lt as LGraphCanvas_Events,
  P as LGraphCanvas_Rendering,
  w as LGraphCanvas_UI,
  ht as LGraphGroup,
  tt as LGraphNode,
  Mt as LGraphStatus,
  it as LLink,
  st as LayoutDirection,
  rt as LinkRenderMode,
  Ht as LinkRenderModeNames,
  h as LiteGraph,
  _t as NODE_MODE_COLORS,
  J as NODE_MODE_NAMES,
  Y as NodeMode,
  gt as SLOT_SHAPE_NAMES,
  Z as Subgraph,
  q as TitleMode,
  pt as clamp,
  W as getLitegraphTypeName,
  Tt as getSlotTypesIn,
  Pt as getSlotTypesInFormatted,
  Et as getSlotTypesOut,
  Rt as getSlotTypesOutFormatted,
  vt as getStaticProperty,
  ct as getStaticPropertyOnInstance,
  bt as isValidLitegraphType,
  dt as makeDraggable,
  kt as reassignGraphIDs,
  ut as toHashMap
};
