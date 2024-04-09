var D = /* @__PURE__ */ ((t) => (t[t.UP = 1] = "UP", t[t.DOWN = 2] = "DOWN", t[t.LEFT = 3] = "LEFT", t[t.RIGHT = 4] = "RIGHT", t[t.CENTER = 5] = "CENTER", t))(D || {}), W = /* @__PURE__ */ ((t) => (t[t.ALWAYS = 0] = "ALWAYS", t[t.ON_EVENT = 1] = "ON_EVENT", t[t.NEVER = 2] = "NEVER", t[t.ON_TRIGGER = 3] = "ON_TRIGGER", t[t.ON_REQUEST = 4] = "ON_REQUEST", t))(W || {});
const Q = ["Always", "On Event", "Never", "On Trigger"], gt = ["#666", "#422", "#333", "#224", "#626"];
var A = /* @__PURE__ */ ((t) => (t[t.DEFAULT = 0] = "DEFAULT", t[t.BOX_SHAPE = 1] = "BOX_SHAPE", t[t.ROUND_SHAPE = 2] = "ROUND_SHAPE", t[t.CIRCLE_SHAPE = 3] = "CIRCLE_SHAPE", t[t.CARD_SHAPE = 4] = "CARD_SHAPE", t[t.ARROW_SHAPE = 5] = "ARROW_SHAPE", t[t.GRID_SHAPE = 6] = "GRID_SHAPE", t))(A || {});
const vt = ["default", "box", "round", "circle", "card", "arrow", "square"];
var B = /* @__PURE__ */ ((t) => (t[t.INPUT = 0] = "INPUT", t[t.OUTPUT = 1] = "OUTPUT", t))(B || {}), lt = /* @__PURE__ */ ((t) => (t[t.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", t[t.LINEAR_LINK = 1] = "LINEAR_LINK", t[t.SPLINE_LINK = 2] = "SPLINE_LINK", t))(lt || {});
const Ft = ["Straight", "Linear", "Spline"];
var Z = /* @__PURE__ */ ((t) => (t[t.NORMAL_TITLE = 0] = "NORMAL_TITLE", t[t.NO_TITLE = 1] = "NO_TITLE", t[t.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", t[t.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", t))(Z || {}), k = /* @__PURE__ */ ((t) => (t[t.EVENT = -2] = "EVENT", t[t.ACTION = -1] = "ACTION", t[t.DEFAULT = 0] = "DEFAULT", t))(k || {});
const bt = ["*", "array", "object", "number", "string", "enum", "boolean", "table"];
var st = /* @__PURE__ */ ((t) => (t.VERTICAL_LAYOUT = "vertical", t.HORIZONTAL_LAYOUT = "horizontal", t))(st || {});
function dt(t, e, s) {
  return e > t ? e : s < t ? s : t;
}
function ht(t, e) {
  return t.reduce((s, o) => {
    const n = e(o);
    return s[n] = o, s;
  }, {});
}
function mt(t, e) {
  return e in t ? t[e] : null;
}
function pt(t, e) {
  return e in t.constructor ? t.constructor[e] : null;
}
function St(t, e) {
  if (t.target !== e)
    return;
  const s = t.clientX - Number.parseInt(window.getComputedStyle(e).left), o = t.clientY - Number.parseInt(window.getComputedStyle(e).top), n = (a) => {
    if (a.buttons === 0) {
      r();
      return;
    }
    e.style.top = `${a.clientY - o}px`, e.style.left = `${a.clientX - s}px`;
  }, r = () => {
    window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", r);
  };
  window.addEventListener("mousemove", n), window.addEventListener("mouseup", r);
}
function ft(t) {
  return t.addEventListener("mousedown", (e) => St(e, t)), t.classList.add("draggable"), t;
}
function X(t) {
  return t === k.EVENT ? "Event" : t === k.ACTION ? "Action" : t === k.DEFAULT ? "Default" : t;
}
function Tt(t) {
  return t === k.EVENT || t === k.ACTION || t === k.DEFAULT || typeof t == "string";
}
const L = class {
  /** Register a node class so it can be listed when the user wants to create a new one */
  static registerNodeType(t) {
    L.debug && console.log(`Node registered: ${t.type}`);
    const e = t.name, s = t.type;
    if (!s)
      throw `Config has no type: ${t}`;
    if (L.debug && console.debug(e, s), t.category === null || t.category === "") {
      const n = s.lastIndexOf("/");
      t.category = s.substring(0, n);
    }
    t.title || (t.title = e);
    const o = L.registered_node_types[s];
    if (o && console.warn(`replacing node type: ${s}`), t.supported_extensions)
      for (const n in t.supported_extensions) {
        const r = t.supported_extensions[n];
        r && r.constructor === String && (L.node_types_by_file_extension[r.toLowerCase()] = t);
      }
    t.class.__LITEGRAPH_TYPE__ = s, L.registered_node_types[s] = t, t.class.name && (L.Nodes[e] = t), L.onNodeTypeRegistered && L.onNodeTypeRegistered(s, t), o && L.onNodeTypeReplaced && L.onNodeTypeReplaced(s, t, o);
  }
  /** removes a node type from the system */
  static unregisterNodeType(t) {
    let e;
    if (typeof t == "string" ? e = L.registered_node_types[t] : e = t, !e)
      throw `node type not found: ${t}`;
    delete L.registered_node_types[e.type], e.constructor.name && delete L.Nodes[e.constructor.name];
  }
  /**
   * Save a slot type and his node
   * @method registerSlotType
   * @param {string | object} type name of the node or the node constructor itself
   * @param {string} slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  static registerNodeAndSlotType(t, e, s = !1) {
    let o;
    if (typeof t == "string" ? o = L.registered_node_types[t] : "type" in t ? o = L.registered_node_types[t.type] : o = t, !o)
      throw new Error(`Node not registered!${t}`);
    const n = o.class.__litegraph_type__;
    let r;
    typeof e == "string" ? r = e.split(",") : e === k.EVENT || e === k.ACTION ? r = ["_event_"] : r = ["*"];
    for (let a = 0; a < r.length; ++a) {
      let u = r[a];
      u === "" && (u = "*");
      const l = s ? "registered_slot_out_types" : "registered_slot_in_types";
      typeof this[l][u] > "u" && (this[l][u] = { nodes: [] }), this[l][u].nodes.push(n), u !== "_event_" && u !== "*" && (s ? L.slot_types_out.includes(u.toLowerCase()) || (L.slot_types_out.push(u.toLowerCase()), L.slot_types_out.sort()) : L.slot_types_in.includes(u.toLowerCase()) || (L.slot_types_in.push(u.toLowerCase()), L.slot_types_in.sort()));
    }
  }
  /** Removes all previously registered node's types. */
  static clearRegisteredTypes() {
    L.registered_node_types = {}, L.node_types_by_file_extension = {}, L.Nodes = {}, L.searchbox_extras = {};
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
    let o = null, n;
    if (typeof t == "string")
      n = t;
    else if (n = t.__LITEGRAPH_TYPE__, !n)
      throw console.error(t), "Node was not registered yet!";
    if (o = L.registered_node_types[n], !o)
      return console.warn(
        `GraphNode type "${t}" not registered.`
      ), null;
    e = e || o.title || n;
    let r = null;
    const a = s.constructorArgs || [];
    if (L.catch_exceptions)
      try {
        r = new o.class(e, ...a);
      } catch (p) {
        return console.error("Error creating node!", p), null;
      }
    else
      r = new o.class(e, ...a);
    if (r.class = o.class, r.type = n, !r.title && e && (r.title = e), r.properties || (r.properties = {}), r.properties_info || (r.properties_info = []), r.flags || (r.flags = {}), r.size || (r.size = r.computeSize()), r.pos || (r.pos = [L.DEFAULT_POSITION[0], L.DEFAULT_POSITION[1]]), r.mode || (r.mode = W.ALWAYS), s.instanceProps)
      for (const p in s.instanceProps)
        r[p] = s.instanceProps[p];
    const u = mt(o.class, "propertyLayout");
    if (u) {
      L.debug && console.debug("Found property layout!", u);
      for (const p of u) {
        const { name: f, defaultValue: c, type: g, options: y } = p;
        r.addProperty(f, c, g, y);
      }
    }
    const l = mt(o.class, "slotLayout");
    if (l) {
      if (L.debug && console.debug("Found slot layout!", l), l.inputs)
        for (const p of l.inputs) {
          const { name: f, type: c, options: g } = p;
          r.addInput(f, c, g);
        }
      if (l.outputs)
        for (const p of l.outputs) {
          const { name: f, type: c, options: g } = p;
          r.addOutput(f, c, g);
        }
    }
    return r.onNodeCreated && r.onNodeCreated(), r;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   */
  static getNodeType(t) {
    return L.registered_node_types[t];
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
    for (const o in L.registered_node_types) {
      const n = L.registered_node_types[o];
      n.filter === e && (t === "" ? n.category === null && s.push(n) : n.category === t && s.push(n));
    }
    return L.auto_sort_node_types && s.sort((o, n) => o.title.localeCompare(n.title)), s;
  }
  /**
   * Returns a list with all the node type categories
   * @method getNodeTypesCategories
   * @param {string} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the names of the categories
   */
  static getNodeTypesCategories(t) {
    const e = { "": 1 };
    for (const o in L.registered_node_types) {
      const n = L.registered_node_types[o];
      if (n.category && !n.hide_in_node_lists) {
        if (n.filter !== t)
          continue;
        e[n.category] = 1;
      }
    }
    const s = [];
    for (const o in e)
      s.push(o);
    return L.auto_sort_node_types ? s.sort() : s;
  }
  /** debug purposes: reloads all the js scripts that matches a wildcard */
  static reloadNodes(t) {
    const e = document.getElementsByTagName("script"), s = [];
    for (let n = 0; n < e.length; n++)
      s.push(e[n]);
    const o = document.getElementsByTagName("head")[0];
    t = document.location.href + t;
    for (let n = 0; n < s.length; n++) {
      const r = s[n].src;
      if (!(!r || r.substr(0, t.length) !== t))
        try {
          L.debug && console.log(`Reloading: ${r}`);
          const a = document.createElement("script");
          a.type = "text/javascript", a.src = r, o.appendChild(a), o.removeChild(s[n]);
        } catch (a) {
          if (L.throw_errors)
            throw a;
          L.debug && console.log(`Error while reloading ${r}`);
        }
    }
    L.debug && console.log("Nodes reloaded");
  }
  // TODO move
  // separated just to improve if it doesn't work
  static cloneObject(t, e) {
    if (t === null)
      return null;
    const s = JSON.parse(JSON.stringify(t));
    if (!e)
      return s;
    for (const o in s)
      e[o] = s[o];
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
    if ((t === "" || t === "*") && (t = k.DEFAULT), (e === "" || e === "*") && (e = k.DEFAULT), !t || !e || t === e || t === k.EVENT && e === k.ACTION || t === k.ACTION && e === k.EVENT)
      return !0;
    if (t = String(t), e = String(e), t = t.toLowerCase(), e = e.toLowerCase(), !t.includes(",") && !e.includes(","))
      return t === e;
    const s = t.split(","), o = e.split(",");
    for (let n = 0; n < s.length; ++n)
      for (let r = 0; r < o.length; ++r)
        if (this.isValidConnection(s[n], o[r]))
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
  static isInsideRectangle(t, e, s, o, n, r) {
    return s < t && s + n > t && o < e && o + r > e;
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
    const s = t[0] + t[2], o = t[1] + t[3], n = e[0] + e[2], r = e[1] + e[3];
    return !(t[0] > n || t[1] > r || s < e[0] || o < e[1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  static hex2num(t) {
    t.charAt(0) === "#" && (t = t.slice(1)), t = t.toUpperCase();
    const e = "0123456789ABCDEF";
    let s, o = 0, n, r;
    for (let a = 0; a < 6; a += 2)
      n = e.indexOf(t.charAt(a)), r = e.indexOf(t.charAt(a + 1)), s[o] = n * 16 + r, o++;
    return s;
  }
  // Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex(t) {
    const e = "0123456789ABCDEF";
    let s = "#", o, n;
    for (let r = 0; r < 3; r++)
      o = t[r] / 16, n = t[r] % 16, s += e.charAt(o) + e.charAt(n);
    return s;
  }
  // ContextMenu: typeof ContextMenu;
  // static extendClass<A, B>(target: A, origin: B): A & B;
  // static getParameterNames(func: string | Function): string[];
  /* helper for interaction: pointer, touch, mouse Listeners
       used by LGraphCanvas DragAndScale ContextMenu */
  static pointerListenerAdd(t, e, s, o = !1) {
    if (!t || !t.addEventListener || !e || typeof s != "function")
      return;
    let n = L.pointerevents_method, r = e;
    if (n === "pointer" && !window.PointerEvent)
      switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log(`Converting pointer[${r}] : down move up cancel enter TO touchstart touchmove touchend, etc ..`), r) {
        case "down": {
          n = "touch", r = "start";
          break;
        }
        case "move": {
          n = "touch";
          break;
        }
        case "up": {
          n = "touch", r = "end";
          break;
        }
        case "cancel": {
          n = "touch";
          break;
        }
        case "enter": {
          console.log("debug: Should I send a move event?");
          break;
        }
        default:
          console.warn(`PointerEvent not available in this browser ? The event ${r} would not be called`);
      }
    switch (r) {
      case "down":
      case "up":
      case "move":
      case "over":
      case "out":
      case "enter":
        t.addEventListener(n + r, s, o);
      case "leave":
      case "cancel":
      case "gotpointercapture":
      case "lostpointercapture":
        if (n !== "mouse")
          return t.addEventListener(n + r, s, o);
      default:
        return t.addEventListener(r, s, o);
    }
  }
  static pointerListenerRemove(t, e, s, o = !1) {
    if (!(!t || !t.removeEventListener || !e || typeof s != "function"))
      switch (e) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (L.pointerevents_method === "pointer" || L.pointerevents_method === "mouse") && t.removeEventListener(L.pointerevents_method + e, s, o);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (L.pointerevents_method === "pointer")
            return t.removeEventListener(L.pointerevents_method + e, s, o);
        default:
          return t.removeEventListener(e, s, o);
      }
  }
};
let h = L;
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
class at {
  processMouseDown(e) {
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const s = e;
    this.adjustMouseEvent(s);
    const o = this.getCanvasWindow();
    o.document, T.active_canvas = this;
    let n = !1;
    const r = s.clientX, a = s.clientY;
    this.ds.viewport = this.viewport;
    const u = !this.viewport || this.viewport && r >= this.viewport[0] && r < this.viewport[0] + this.viewport[2] && a >= this.viewport[1] && a < this.viewport[1] + this.viewport[3];
    if (this.skip_events || (h.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), h.pointerListenerAdd(o.document, "move", this._mousemove_callback, !0), h.pointerListenerAdd(o.document, "up", this._mouseup_callback, !0)), !u)
      return;
    let l = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes, 5), p = !1;
    const f = h.getTime(), c = !(s instanceof PointerEvent) || !s.isPrimary, g = f - this.last_mouseclick < 300 && c;
    if (this.mouse[0] = s.clientX, this.mouse[1] = s.clientY, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.last_click_position_offset = [this.offset_mouse[0], this.offset_mouse[1]], this.pointer_is_down && c ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), z.closeAllContextMenus(o), this.search_box && this.search_box.close(), !(this.onMouse && this.onMouse(s) === !0)) {
      if (s.which === 1 && !this.pointer_is_double) {
        if (s.ctrlKey && this.allow_interaction && !this.read_only && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = s.canvasX, this.dragging_rectangle[1] = s.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, p = !0), h.alt_drag_do_clone_nodes && s.altKey && l && this.allow_interaction && !p && !this.read_only) {
          const d = l.clone();
          d && (d.pos[0] += 5, d.pos[1] += 5, this.graph.add(d, { doCalcSize: !1 }), l = d, p = !0, n || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = l), this.selected_nodes[l.id] || this.processNodeSelected(l, s)));
        }
        let y = !1;
        if (l && this.allow_interaction && !p && !this.read_only) {
          if (!this.live_mode && !l.flags.pinned && this.bringToFront(l), !this.connecting_node && !l.flags.collapsed && !this.live_mode)
            if (!p && l.resizable !== !1 && h.isInsideRectangle(s.canvasX, s.canvasY, l.pos[0] + l.size[0] - 5, l.pos[1] + l.size[1] - 5, 10, 10))
              this.graph.beforeChange(), this.resizing_node = l, this.canvas.style.cursor = "se-resize", p = !0;
            else {
              if (l.outputs)
                for (let d = 0, _ = l.outputs.length; d < _; ++d) {
                  const m = l.outputs[d], b = l.getConnectionPos(!1, d);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    b[0] - 15,
                    b[1] - 10,
                    30,
                    20
                  )) {
                    this.connecting_node = l, this.connecting_output = m, this.connecting_output.slot_index = d, this.connecting_pos = l.getConnectionPos(!1, d), this.connecting_slot = d, h.shift_click_do_break_link_from && s.shiftKey && l.disconnectOutput(d), g ? l.onOutputDblClick && l.onOutputDblClick(d, s) : l.onOutputClick && l.onOutputClick(d, s), p = !0;
                    break;
                  }
                }
              if (l.inputs)
                for (let d = 0, _ = l.inputs.length; d < _; ++d) {
                  const m = l.inputs[d], b = l.getConnectionPos(!0, d);
                  if (h.isInsideRectangle(
                    s.canvasX,
                    s.canvasY,
                    b[0] - 15,
                    b[1] - 10,
                    30,
                    20
                  )) {
                    if (g ? l.onInputDblClick && l.onInputDblClick(d, s) : l.onInputClick && l.onInputClick(d, s), m.link !== null) {
                      const v = this.graph.links[m.link];
                      h.click_do_break_link_to && (l.disconnectInput(d), this.dirty_bgcanvas = !0, p = !0), (this.allow_reconnect_links || s.shiftKey) && (h.click_do_break_link_to || l.disconnectInput(d), this.connecting_node = this.graph._nodes_by_id[v.origin_id], this.connecting_slot = v.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, p = !0);
                    }
                    p || (this.connecting_node = l, this.connecting_input = m, this.connecting_input.slot_index = d, this.connecting_pos = l.getConnectionPos(!0, d), this.connecting_slot = d, this.dirty_bgcanvas = !0, p = !0);
                  }
                }
            }
          if (!p) {
            const d = [s.canvasX - l.pos[0], s.canvasY - l.pos[1]], _ = this.processNodeWidgets(l, this.graph_mouse, s);
            _ && (n = !0, this.node_widget = [l, _]), g && this.selected_nodes[l.id] && (l.onDblClick && l.onDblClick(s, d, this), this.processNodeDblClicked(l), n = !0), l.onMouseDown && l.onMouseDown(s, d, this) ? n = !0 : (l.subgraph && !l.skip_subgraph_button && !l.flags.collapsed && d[0] > l.size[0] - h.NODE_TITLE_HEIGHT && d[1] < 0 && setTimeout(() => {
              this.openSubgraph(l.subgraph);
            }, 10), this.live_mode && (y = !0, n = !0)), n || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = l), this.selected_nodes[l.id] || this.processNodeSelected(l, s)), this.dirty_canvas = !0;
          }
        } else if (!p) {
          let d = !1;
          if (l && l.subgraph && !l.skip_subgraph_button) {
            const _ = [s.canvasX - l.pos[0], s.canvasY - l.pos[1]];
            !l.flags.collapsed && _[0] > l.size[0] - h.NODE_TITLE_HEIGHT && _[1] < 0 && (d = !0, setTimeout(() => {
              this.openSubgraph(l.subgraph);
            }, 10));
          }
          if (!d) {
            if (this.allow_interaction && !this.read_only) {
              const _ = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
              _ !== null && (this.showLinkMenu(_, s), this.over_link_center = null);
            }
            this.selected_group = this.graph.getGroupOnPos(s.canvasX, s.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only && this.allow_interaction && (s.ctrlKey && (this.dragging_rectangle = null), h.distance([s.canvasX, s.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]) * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes()), g && !this.read_only && this.allow_searchbox && this.allow_interaction && (this.showSearchBox(s), s.preventDefault(), s.stopPropagation()), y = !0;
          }
        }
        !p && y && this.allow_dragcanvas && (this.dragging_canvas = !0);
      } else if (s.which === 2) {
        if (h.middle_click_slot_add_default_node && l && this.allow_interaction && !p && !this.read_only && !this.connecting_node && !l.flags.collapsed && !this.live_mode) {
          let y = null, d = null, _ = null;
          if (l.outputs)
            for (let m = 0, b = l.outputs.length; m < b; ++m) {
              const v = l.outputs[m], O = l.getConnectionPos(!1, m);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                y = v, d = m, _ = !0;
                break;
              }
            }
          if (l.inputs)
            for (let m = 0, b = l.inputs.length; m < b; ++m) {
              const v = l.inputs[m], O = l.getConnectionPos(!0, m);
              if (h.isInsideRectangle(s.canvasX, s.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                y = v, d = m, _ = !1;
                break;
              }
            }
          if (y && d !== !1) {
            const m = 0.5 - (d + 1) / (_ ? l.outputs.length : l.inputs.length), b = l.getBounding(), v = [
              _ ? b[0] + b[2] : b[0],
              // + node_bounding[0]/this.canvas.width*150
              s.canvasY - 80
              // + node_bounding[0]/this.canvas.width*66 // vertical "derive"
            ];
            this.createDefaultNodeForSlot("AUTO", {
              nodeFrom: _ ? l : null,
              slotFrom: _ ? d : null,
              nodeTo: _ ? null : l,
              slotTo: _ ? null : d,
              position: v,
              // ,e: e
              posAdd: [_ ? 30 : -30, -m * 130],
              // -alphaPosY*30]
              posSizeFix: [_ ? 0 : -1, 0]
              // -alphaPosY*2*/
            });
          }
        }
      } else if ((s.which === 3 || this.pointer_is_double) && this.allow_interaction && !p && !this.read_only) {
        let y = null;
        if (l)
          y = { type: "node", item: l }, Object.keys(this.selected_nodes).length && (this.selected_nodes[l.id] || s.shiftKey || s.ctrlKey || s.metaKey) ? this.selected_nodes[l.id] || this.selectNodes([l], !0) : this.selectNodes([l]);
        else {
          const d = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
          d !== null && (this.over_link_center = null, this.dirty_canvas = !0, y = { type: "link", item: d });
        }
        this.processContextMenu(y, s);
      }
      if (this.selected_group_moving = !1, this.selected_group && !this.selected_group_resizing) {
        const d = (this.selected_group.fontSize || h.DEFAULT_GROUP_FONT_SIZE) * 1.4;
        h.isInsideRectangle(s.canvasX, s.canvasY, this.selected_group.pos[0], this.selected_group.pos[1], this.selected_group.size[0], d) && (this.selected_group_moving = !0);
      }
      return this.last_mouse[0] = s.clientX, this.last_mouse[1] = s.clientY, this.last_mouseclick = h.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!o.document.activeElement || o.document.activeElement.nodeName.toLowerCase() !== "input" && o.document.activeElement.nodeName.toLowerCase() !== "textarea") && s.preventDefault(), s.stopPropagation(), this.onMouseDown && this.onMouseDown(s), !1;
    }
  }
  processMouseMove(e) {
    const s = e;
    if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    T.active_canvas = this, this.adjustMouseEvent(s);
    const o = [s.clientX, s.clientY];
    this.mouse[0] = o[0], this.mouse[1] = o[1];
    const n = [
      o[0] - this.last_mouse[0],
      o[1] - this.last_mouse[1]
    ];
    if (this.last_mouse = o, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.block_click)
      return s.preventDefault(), !1;
    s.dragging = this.last_mouse_dragging, this.node_widget && (this.processNodeWidgets(
      this.node_widget[0],
      this.graph_mouse,
      s,
      this.node_widget[1]
    ), this.dirty_canvas = !0);
    const r = this.selected_group;
    if (this.selected_group && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = null), this.dragging_rectangle)
      this.dragging_rectangle[2] = s.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = s.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;
    else if (this.selected_group && !this.read_only && this.allow_interaction) {
      if (this.selected_group_resizing)
        this.selected_group.size = [
          s.canvasX - this.selected_group.pos[0],
          s.canvasY - this.selected_group.pos[1]
        ];
      else {
        const a = n[0] / this.ds.scale, u = n[1] / this.ds.scale;
        this.selected_group.move(a, u, s.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
      }
      this.dirty_bgcanvas = !0;
    } else if (this.dragging_canvas)
      this.ds.offset[0] += n[0] / this.ds.scale, this.ds.offset[1] += n[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
    else {
      const a = this.allow_interaction && !this.read_only;
      this.connecting_node && (this.dirty_canvas = !0);
      const u = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes);
      if (a)
        for (let l = 0, p = this.graph._nodes.length; l < p; ++l) {
          const f = this.graph._nodes[l];
          if (f.mouseOver && u !== f) {
            f.mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this);
            const c = this.node_over;
            this.node_over = null, this.dirty_canvas = !0, c !== this.node_over && this.onHoverChange(this.node_over, c);
          }
        }
      if (u) {
        if (u.redraw_on_mouse && (this.dirty_canvas = !0), a) {
          if (!u.mouseOver) {
            u.mouseOver = !0;
            const l = this.node_over;
            this.node_over = u, this.dirty_canvas = !0, l !== this.node_over && this.onHoverChange(this.node_over, l), u.onMouseEnter && u.onMouseEnter(s, [s.canvasX - u.pos[0], s.canvasY - u.pos[1]], this);
          }
          if (u.onMouseMove && u.onMouseMove(s, [s.canvasX - u.pos[0], s.canvasY - u.pos[1]], this), this.connecting_node) {
            if (this.connecting_output) {
              const l = this._highlight_input || [0, 0];
              if (!this.isOverNodeBox(u, s.canvasX, s.canvasY)) {
                const p = this.isOverNodeInput(u, s.canvasX, s.canvasY, l);
                if (p !== -1 && u.inputs[p]) {
                  const f = u.inputs[p].type;
                  h.isValidConnection(this.connecting_output.type, f) && (this._highlight_input = l, this._highlight_input_slot = u.inputs[p]);
                } else
                  this._highlight_input = null, this._highlight_input_slot = null;
              }
            } else if (this.connecting_input) {
              const l = this._highlight_output || [0, 0];
              if (!this.isOverNodeBox(u, s.canvasX, s.canvasY)) {
                const p = this.isOverNodeOutput(u, s.canvasX, s.canvasY, l);
                if (p !== -1 && u.outputs[p]) {
                  const f = u.outputs[p].type;
                  h.isValidConnection(this.connecting_input.type, f) && (this._highlight_output = l);
                } else
                  this._highlight_output = null;
              }
            }
          }
          this.canvas && (h.isInsideRectangle(
            s.canvasX,
            s.canvasY,
            u.pos[0] + u.size[0] - 5,
            u.pos[1] + u.size[1] - 5,
            5,
            5
          ) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
        }
      } else {
        const l = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
        l !== this.over_link_center && (this.over_link_center = l, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
      }
      if (a) {
        if (this.node_capturing_input && this.node_capturing_input !== u && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(s, [s.canvasX - this.node_capturing_input.pos[0], s.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
          for (const l in this.selected_nodes) {
            const p = this.selected_nodes[l];
            p.pos[0] += n[0] / this.ds.scale, p.pos[1] += n[1] / this.ds.scale;
          }
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
        if (this.resizing_node && !this.live_mode) {
          const l = [s.canvasX - this.resizing_node.pos[0], s.canvasY - this.resizing_node.pos[1]], p = this.resizing_node.computeSize();
          l[0] = Math.max(p[0], l[0]), l[1] = Math.max(p[1], l[1]), this.resizing_node.setSize(l), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
      }
    }
    return r && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = r), s.preventDefault(), !1;
  }
  processMouseUp(e) {
    const s = e, o = !(s instanceof PointerEvent) || !s.isPrimary;
    if (!o)
      return !1;
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    const r = this.getCanvasWindow().document;
    T.active_canvas = this, this.skip_events || (h.pointerListenerRemove(r, "move", this._mousemove_callback, !0), h.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), h.pointerListenerRemove(r, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(s);
    const a = h.getTime();
    if (s.click_time = a - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), s.which === 1) {
      if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, s), this.node_widget = null, this.selected_group) {
        const l = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), p = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
        this.selected_group.move(l, p, s.ctrlKey), this.selected_group.pos[0] = Math.round(
          this.selected_group.pos[0]
        ), this.selected_group.pos[1] = Math.round(
          this.selected_group.pos[1]
        ), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
      }
      this.selected_group_resizing = !1;
      const u = this.graph.getNodeOnPos(
        s.canvasX,
        s.canvasY,
        this.visible_nodes
      );
      if (this.dragging_rectangle) {
        if (this.graph) {
          const l = this.graph._nodes, p = new Float32Array(4), f = Math.abs(this.dragging_rectangle[2]), c = Math.abs(this.dragging_rectangle[3]), g = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - f : this.dragging_rectangle[0], y = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - c : this.dragging_rectangle[1];
          if (this.dragging_rectangle[0] = g, this.dragging_rectangle[1] = y, this.dragging_rectangle[2] = f, this.dragging_rectangle[3] = c, !u || f > 10 && c > 10) {
            const d = [];
            for (let _ = 0; _ < l.length; ++_) {
              const m = l[_];
              m.getBounding(p), h.overlapBounding(
                this.dragging_rectangle,
                p
              ) && d.push(m);
            }
            d.length && this.selectNodes(d, s.shiftKey);
          } else
            this.selectNodes([u], s.shiftKey || s.ctrlKey);
        }
        this.dragging_rectangle = null;
      } else if (this.connecting_node) {
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        const p = (this.connecting_output || this.connecting_input).type;
        if (u) {
          if (this.connecting_output) {
            const f = this.isOverNodeInput(
              u,
              s.canvasX,
              s.canvasY
            );
            f !== -1 ? this.connecting_node.connect(this.connecting_slot, u, f) : this.connecting_node.connectByTypeInput(this.connecting_slot, u, p);
          } else if (this.connecting_input) {
            const f = this.isOverNodeOutput(
              u,
              s.canvasX,
              s.canvasY
            );
            f !== -1 ? u.connect(f, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, u, p);
          }
        } else
          h.release_link_on_empty_shows_menu && (s.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(s, { node_from: this.connecting_node, slotFrom: this.connecting_output, type_filter_in: this.connecting_output.type }) : this.connecting_input && this.showSearchBox(s, { node_to: this.connecting_node, slotFrom: this.connecting_input, type_filter_out: this.connecting_input.type }) : this.connecting_output ? this.showConnectionMenu({ nodeFrom: this.connecting_node, slotFrom: this.connecting_output, e: s }) : this.connecting_input && this.showConnectionMenu({ nodeTo: this.connecting_node, slotTo: this.connecting_input, e: s }));
        this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
      } else if (this.resizing_node)
        this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;
      else if (this.node_dragged) {
        const l = this.node_dragged;
        l && s.click_time < 300 && l.isShowingTitle(!0) && h.isInsideRectangle(
          s.canvasX,
          s.canvasY,
          l.pos[0],
          l.pos[1] - h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT,
          h.NODE_TITLE_HEIGHT
        ) && l.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
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
    return o && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), s.stopPropagation(), s.preventDefault(), !1;
  }
  processMouseWheel(e) {
    const s = e;
    if (!this.graph || !this.allow_dragcanvas)
      return;
    const o = s.wheelDeltaY !== null ? s.wheelDeltaY : s.detail * -60;
    this.adjustMouseEvent(s);
    const n = s.clientX, r = s.clientY;
    if (!(!this.viewport || this.viewport && n >= this.viewport[0] && n < this.viewport[0] + this.viewport[2] && r >= this.viewport[1] && r < this.viewport[1] + this.viewport[3]))
      return;
    let u = this.ds.scale;
    return o > 0 ? u *= 1.1 : o < 0 && (u *= 1 / 1.1), this.ds.changeScale(u, [s.clientX, s.clientY]), this.graph.change(), s.preventDefault(), !1;
  }
}
const q = class {
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
    for (let o = 0, n = t.length; o < n; ++o) {
      const r = t[o];
      this.live_mode && !r.onDrawBackground && !r.onDrawForeground || h.overlapBounding(this.visible_area, r.getBounding(q.temp)) && s.push(r);
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
      const o = this.computeVisibleNodes(
        null,
        this.visible_nodes
      );
      for (let n = 0; n < o.length; ++n) {
        const r = o[n];
        t.save(), t.translate(r.pos[0], r.pos[1]), this.drawNode(r, t), t.restore();
      }
      if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(t)), this.connecting_pos !== null) {
        t.lineWidth = this.connections_width;
        let n = null;
        const r = this.connecting_output || this.connecting_input, a = r.type;
        let u = r.dir;
        u === null && (this.connecting_output ? u = this.connecting_node.horizontal ? D.DOWN : D.RIGHT : u = this.connecting_node.horizontal ? D.UP : D.LEFT);
        const l = r.shape;
        switch (a) {
          case k.EVENT:
            n = h.EVENT_LINK_COLOR;
            break;
          default:
            n = h.CONNECTING_LINK_COLOR;
        }
        this.renderLink(
          t,
          this.connecting_pos,
          [this.graph_mouse[0], this.graph_mouse[1]],
          null,
          !1,
          null,
          n,
          u,
          D.CENTER
        ), t.beginPath(), l === A.BOX_SHAPE ? (t.rect(
          this.connecting_pos[0] - 6 + 0.5,
          this.connecting_pos[1] - 5 + 0.5,
          14,
          10
        ), t.fill(), t.beginPath(), t.rect(
          this.graph_mouse[0] - 6 + 0.5,
          this.graph_mouse[1] - 5 + 0.5,
          14,
          10
        )) : l === A.ARROW_SHAPE ? (t.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + 0.5), t.closePath()) : (t.arc(
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
        const p = this._highlight_input_slot.shape;
        this._highlight_input && (t.beginPath(), p === A.ARROW_SHAPE ? (t.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + 0.5), t.closePath()) : t.arc(
          this._highlight_input[0],
          this._highlight_input[1],
          6,
          0,
          Math.PI * 2
        ), t.fill()), this._highlight_output && (t.beginPath(), p === A.ARROW_SHAPE ? (t.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + 0.5), t.closePath()) : t.arc(
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
    const o = e.inputs ? e.inputs.length : 0, n = 200, r = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    if (s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(10, 10, n, (o + 1) * r + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left", s.fillText("Graph Inputs", 20, 34), this.drawButton(n - 20, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let a = 50;
    if (s.font = "14px Arial", e.inputs)
      for (let u = 0; u < e.inputs.length; ++u) {
        const l = e.inputs[u];
        l.not_subgraph_input || (s.fillStyle = "#9C9", s.beginPath(), s.arc(n - 16, a, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(l.name, 30, a + r * 0.75), s.fillStyle = "#777", s.fillText(X(l.type), 130, a + r * 0.75), a += r);
      }
    this.drawButton(20, a + 2, n - 20, r - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(e);
  }
  drawSubgraphPanelRight(t, e, s) {
    const o = e.outputs ? e.outputs.length : 0, n = this.bgcanvas.width, r = 200, a = Math.floor(h.NODE_SLOT_HEIGHT * 1.6);
    s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(n - r - 10, 10, r, (o + 1) * a + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left";
    const u = "Graph Outputs", l = s.measureText(u).width;
    if (s.fillText(u, n - l - 20, 34), this.drawButton(n - r, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    let p = 50;
    if (s.font = "14px Arial", e.outputs)
      for (let f = 0; f < e.outputs.length; ++f) {
        const c = e.outputs[f];
        c.not_subgraph_output || (s.fillStyle = "#9C9", s.beginPath(), s.arc(n - r + 16, p, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(c.name, n - r + 30, p + a * 0.75), s.fillStyle = "#777", s.fillText(X(c.type), n - r + 130, p + a * 0.75), p += a);
      }
    this.drawButton(n - r, p + 2, r - 20, a - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(e);
  }
  // Draws a button into the canvas overlay and computes if it was clicked using the immediate gui paradigm
  drawButton(t, e, s, o, n, r = h.NODE_DEFAULT_COLOR, a = "#555", u = h.NODE_TEXT_COLOR, l = !1) {
    const p = !this.block_click && (l || this.allow_interaction && !this.read_only), f = this.ctx;
    let c = this.offset_mouse;
    const g = p && h.isInsideRectangle(c[0], c[1], t, e, s, o);
    c = this.last_click_position_offset;
    const y = p && c && this.pointer_is_down && h.isInsideRectangle(c[0], c[1], t, e, s, o);
    f.fillStyle = g ? a : r, y && (f.fillStyle = "#AAA"), f.beginPath(), f.roundRect(t, e, s, o, [4]), f.fill(), n !== null && n.constructor === String && (f.fillStyle = u, f.textAlign = "center", f.font = `${o * 0.65 | 0}px Arial`, f.fillText(n, t + s * 0.5, e + o * 0.75), f.textAlign = "left");
    const d = y && p;
    return y && this.blockClick(), d;
  }
  /** draws every group area in the background */
  drawGroups(t, e) {
    if (!this.graph)
      return;
    const s = this.graph._groups;
    e.save(), e.globalAlpha = 0.5 * this.editor_alpha;
    for (let o = 0; o < s.length; ++o) {
      const n = s[o];
      if (!h.overlapBounding(this.visible_area, n._bounding))
        continue;
      e.fillStyle = n.color || "#335", e.strokeStyle = n.color || "#335";
      const r = n._pos, a = n._size;
      e.globalAlpha = 0.25 * this.editor_alpha, e.beginPath(), e.rect(r[0] + 0.5, r[1] + 0.5, a[0], a[1]), e.fill(), e.globalAlpha = this.editor_alpha, e.stroke(), e.beginPath(), e.moveTo(r[0] + a[0], r[1] + a[1]), e.lineTo(r[0] + a[0] - 10, r[1] + a[1]), e.lineTo(r[0] + a[0], r[1] + a[1] - 10), e.fill();
      const u = n.font_size || h.DEFAULT_GROUP_FONT_SIZE;
      e.font = `${u}px Arial`, e.textAlign = "left", e.fillText(n.title, r[0] + 4, r[1] + u);
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
      const r = this._graph_stack[this._graph_stack.length - 1].graph, a = this.graph._subgraph_node;
      e.strokeStyle = a.bgcolor, e.lineWidth = 10, e.strokeRect(1, 1, t.width - 2, t.height - 2), e.lineWidth = 1, e.font = "40px Arial", e.textAlign = "center", e.fillStyle = a.bgcolor || "#AAA";
      let u = "";
      for (let l = 1; l < this._graph_stack.length; ++l)
        u += `${r._subgraph_node.getTitle()} >> `;
      e.fillText(
        u + a.getTitle(),
        t.width * 0.5,
        40
      ), e.restore();
    }
    let o = !1;
    if (this.onRenderBackground && this.onRenderBackground(t, e) && (o = !0), this.viewport || (e.restore(), e.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
      if (e.save(), this.ds.toCanvasContext(e), this.background_image && this.ds.scale > 0.5 && !o) {
        this.zoom_modify_alpha ? e.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : e.globalAlpha = this.editor_alpha, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !1, (!this._bg_img || this._bg_img.name !== this.background_image) && (this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image, this._bg_img.onload = () => {
          this.draw(!0, !0);
        });
        let n = null;
        this._pattern === null && this._bg_img.width > 0 ? (n = e.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = n) : n = this._pattern, n && (e.fillStyle = n, e.fillRect(
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
    let o = t.bgcolor || t.constructor.bgcolor || h.NODE_DEFAULT_BGCOLOR;
    t.mouseOver;
    const n = this.ds.scale < 0.6;
    if (this.live_mode) {
      t.flags.collapsed || (e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas));
      return;
    }
    const r = this.editor_alpha;
    if (e.globalAlpha = r, this.render_shadows && !n ? (e.shadowColor = h.DEFAULT_SHADOW_COLOR, e.shadowOffsetX = 2 * this.ds.scale, e.shadowOffsetY = 2 * this.ds.scale, e.shadowBlur = 3 * this.ds.scale) : e.shadowColor = "transparent", t.flags.collapsed && t.onDrawCollapsed && t.onDrawCollapsed(e, this) === !0)
      return;
    const a = t.shape || A.BOX_SHAPE, u = q.temp_vec2;
    q.temp_vec2.set(t.size);
    const l = t.horizontal;
    if (t.flags.collapsed) {
      e.font = this.inner_text_font;
      const d = t.getTitle ? t.getTitle() : t.title;
      d !== null && (t._collapsed_width = Math.min(
        t.size[0],
        e.measureText(d).width + h.NODE_TITLE_HEIGHT * 2
      ), u[0] = t._collapsed_width, u[1] = 0);
    }
    t.clip_area && (e.save(), e.beginPath(), a === A.BOX_SHAPE ? e.rect(0, 0, u[0], u[1]) : a === A.ROUND_SHAPE ? e.roundRect(0, 0, u[0], u[1], [10]) : a === A.CIRCLE_SHAPE && e.arc(
      u[0] * 0.5,
      u[1] * 0.5,
      u[0] * 0.5,
      0,
      Math.PI * 2
    ), e.clip()), t.has_errors && (o = "red"), this.drawNodeShape(
      t,
      e,
      [u[0], u[1]],
      s,
      o,
      t.is_selected,
      t.mouseOver
    ), e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas), e.textAlign = l ? "center" : "left", e.font = this.inner_text_font;
    const p = !n, f = this.connecting_output, c = this.connecting_input;
    e.lineWidth = 1;
    let g = 0;
    const y = [0, 0];
    if (t.flags.collapsed) {
      if (this.render_collapsed_slots) {
        let d = null, _ = null;
        if (t.inputs)
          for (let m = 0; m < t.inputs.length; m++) {
            const b = t.inputs[m];
            if (b.link !== null) {
              d = b;
              break;
            }
          }
        if (t.outputs)
          for (let m = 0; m < t.outputs.length; m++) {
            const b = t.outputs[m];
            !b.links || !b.links.length || (_ = b);
          }
        if (d) {
          let m = 0, b = h.NODE_TITLE_HEIGHT * -0.5;
          l && (m = t._collapsed_width * 0.5, b = -h.NODE_TITLE_HEIGHT), e.fillStyle = "#686", e.beginPath(), d.shape === A.BOX_SHAPE ? e.rect(m - 7 + 0.5, b - 4, 14, 8) : d.shape === A.ARROW_SHAPE ? (e.moveTo(m + 8, b), e.lineTo(m + -4, b - 4), e.lineTo(m + -4, b + 4), e.closePath()) : e.arc(m, b, 4, 0, Math.PI * 2), e.fill();
        }
        if (_) {
          let m = t._collapsed_width, b = h.NODE_TITLE_HEIGHT * -0.5;
          l && (m = t._collapsed_width * 0.5, b = 0), e.fillStyle = "#686", e.strokeStyle = "black", e.beginPath(), _.shape === A.BOX_SHAPE ? e.rect(m - 7 + 0.5, b - 4, 14, 8) : _.shape === A.ARROW_SHAPE ? (e.moveTo(m + 6, b), e.lineTo(m - 6, b - 4), e.lineTo(m - 6, b + 4), e.closePath()) : e.arc(m, b, 4, 0, Math.PI * 2), e.fill();
        }
      }
    } else {
      if (t.inputs)
        for (let d = 0; d < t.inputs.length; d++) {
          const _ = t.inputs[d], m = _.type, b = _.shape;
          e.globalAlpha = r, this.connecting_output && !h.isValidConnection(_.type, f.type) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r, e.fillStyle = _.link !== null ? _.color_on || T.DEFAULT_CONNECTION_COLORS_BY_TYPE[m] || T.DEFAULT_CONNECTION_COLORS.input_on : _.color_off || T.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[m] || T.DEFAULT_CONNECTION_COLORS_BY_TYPE[m] || T.DEFAULT_CONNECTION_COLORS.input_off;
          const v = t.getConnectionPos(!0, d, [y[0], y[1]]);
          if (v[0] -= t.pos[0], v[1] -= t.pos[1], g < v[1] + h.NODE_SLOT_HEIGHT * 0.5 && (g = v[1] + h.NODE_SLOT_HEIGHT * 0.5), e.beginPath(), _.shape === A.BOX_SHAPE ? l ? e.rect(
            v[0] - 5 + 0.5,
            v[1] - 8 + 0.5,
            10,
            14
          ) : e.rect(
            v[0] - 6 + 0.5,
            v[1] - 5 + 0.5,
            14,
            10
          ) : b === A.ARROW_SHAPE ? (e.moveTo(v[0] + 8, v[1] + 0.5), e.lineTo(v[0] - 4, v[1] + 6 + 0.5), e.lineTo(v[0] - 4, v[1] - 6 + 0.5), e.closePath()) : b === A.GRID_SHAPE ? (e.rect(v[0] - 4, v[1] - 4, 2, 2), e.rect(v[0] - 1, v[1] - 4, 2, 2), e.rect(v[0] + 2, v[1] - 4, 2, 2), e.rect(v[0] - 4, v[1] - 1, 2, 2), e.rect(v[0] - 1, v[1] - 1, 2, 2), e.rect(v[0] + 2, v[1] - 1, 2, 2), e.rect(v[0] - 4, v[1] + 2, 2, 2), e.rect(v[0] - 1, v[1] + 2, 2, 2), e.rect(v[0] + 2, v[1] + 2, 2, 2)) : n ? e.rect(v[0] - 4, v[1] - 4, 8, 8) : e.arc(v[0], v[1], 4, 0, Math.PI * 2), e.fill(), p) {
            const O = _.label !== null ? _.label : _.name;
            O && (e.fillStyle = h.NODE_TEXT_COLOR, l || _.dir === D.UP ? e.fillText(O, v[0], v[1] - 10) : e.fillText(O, v[0] + 10, v[1] + 5));
          }
        }
      if (e.textAlign = l ? "center" : "right", e.strokeStyle = "black", t.outputs)
        for (let d = 0; d < t.outputs.length; d++) {
          const _ = t.outputs[d], m = _.type, b = _.shape;
          this.connecting_input && !h.isValidConnection(c.type, m) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r;
          const v = t.getConnectionPos(!1, d, y);
          v[0] -= t.pos[0], v[1] -= t.pos[1], g < v[1] + h.NODE_SLOT_HEIGHT * 0.5 && (g = v[1] + h.NODE_SLOT_HEIGHT * 0.5), e.fillStyle = _.links && _.links.length ? _.color_on || T.DEFAULT_CONNECTION_COLORS_BY_TYPE[m] || T.DEFAULT_CONNECTION_COLORS.output_on : _.color_off || T.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[m] || T.DEFAULT_CONNECTION_COLORS_BY_TYPE[m] || T.DEFAULT_CONNECTION_COLORS.output_off, e.beginPath();
          let O = !0;
          if (b === A.BOX_SHAPE ? l ? e.rect(
            v[0] - 5 + 0.5,
            v[1] - 8 + 0.5,
            10,
            14
          ) : e.rect(
            v[0] - 6 + 0.5,
            v[1] - 5 + 0.5,
            14,
            10
          ) : b === A.ARROW_SHAPE ? (e.moveTo(v[0] + 8, v[1] + 0.5), e.lineTo(v[0] - 4, v[1] + 6 + 0.5), e.lineTo(v[0] - 4, v[1] - 6 + 0.5), e.closePath()) : b === A.GRID_SHAPE ? (e.rect(v[0] - 4, v[1] - 4, 2, 2), e.rect(v[0] - 1, v[1] - 4, 2, 2), e.rect(v[0] + 2, v[1] - 4, 2, 2), e.rect(v[0] - 4, v[1] - 1, 2, 2), e.rect(v[0] - 1, v[1] - 1, 2, 2), e.rect(v[0] + 2, v[1] - 1, 2, 2), e.rect(v[0] - 4, v[1] + 2, 2, 2), e.rect(v[0] - 1, v[1] + 2, 2, 2), e.rect(v[0] + 2, v[1] + 2, 2, 2), O = !1) : n ? e.rect(v[0] - 4, v[1] - 4, 8, 8) : e.arc(v[0], v[1], 4, 0, Math.PI * 2), e.fill(), !n && O && e.stroke(), p) {
            const N = _.label !== null ? _.label : _.name;
            N && (e.fillStyle = h.NODE_TEXT_COLOR, l || _.dir === D.DOWN ? e.fillText(N, v[0], v[1] - 8) : e.fillText(N, v[0] - 10, v[1] + 5));
          }
        }
      if (e.textAlign = "left", e.globalAlpha = 1, t.widgets) {
        let d = g;
        (l || t.widgets_up) && (d = 2), t.widgets_start_y !== null && (d = t.widgets_start_y), this.drawNodeWidgets(
          t,
          d,
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
    const o = e.data;
    let n = null;
    if (o.constructor === Number ? n = o.toFixed(2) : o.constructor === String ? n = `"${o}"` : o.constructor === Boolean ? n = String(o) : o.toToolTip ? n = o.toToolTip() : n = `[${o.constructor.name}]`, n === null)
      return;
    n = n.substr(0, 30), t.font = "14px Courier New";
    const a = t.measureText(n).width + 20, u = 24;
    t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(s[0] - a * 0.5, s[1] - 15 - u, a, u, [3]), t.moveTo(s[0] - 10, s[1] - 15), t.lineTo(s[0] + 10, s[1] - 15), t.lineTo(s[0], s[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(n, s[0], s[1] - 15 - u * 0.3);
  }
  /** draws the shape of the given node in the canvas */
  drawNodeShape(t, e, s, o, n, r, a) {
    e.strokeStyle = o, e.fillStyle = n;
    const u = h.NODE_TITLE_HEIGHT, l = this.ds.scale < 0.5, p = t.shape || t.constructor.shape || A.ROUND_SHAPE, f = t.titleMode, c = t.isShowingTitle(a), g = q.tmp_area;
    g[0] = 0, g[1] = c ? -u : 0, g[2] = s[0] + 1, g[3] = c ? s[1] + u : s[1];
    const y = e.globalAlpha;
    if (e.beginPath(), p === A.BOX_SHAPE || l ? e.fillRect(g[0], g[1], g[2], g[3]) : p === A.ROUND_SHAPE || p === A.CARD_SHAPE ? e.roundRect(
      g[0],
      g[1],
      g[2],
      g[3],
      p === A.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]
    ) : p === A.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5,
      0,
      Math.PI * 2
    ), e.fill(), !t.flags.collapsed && c && (e.shadowColor = "transparent", e.fillStyle = "rgba(0,0,0,0.2)", e.fillRect(0, -1, g[2], 2)), e.shadowColor = "transparent", t.onDrawBackground && t.onDrawBackground(e, this, this.canvas, this.graph_mouse), c || f === Z.TRANSPARENT_TITLE) {
      if (t.onDrawTitleBar)
        t.onDrawTitleBar(e, this, u, s, this.ds.scale, o);
      else if (f !== Z.TRANSPARENT_TITLE && (t.constructor.title_color || this.render_title_colored)) {
        const m = t.constructor.title_color || o;
        if (t.flags.collapsed && (e.shadowColor = h.DEFAULT_SHADOW_COLOR), this.use_gradients) {
          let b = T.gradients[m];
          b || (b = T.gradients[m] = e.createLinearGradient(0, 0, 400, 0), b.addColorStop(0, m), b.addColorStop(1, "#000")), e.fillStyle = b;
        } else
          e.fillStyle = m;
        e.beginPath(), p === A.BOX_SHAPE || l ? e.rect(0, -u, s[0] + 1, u) : (p === A.ROUND_SHAPE || p === A.CARD_SHAPE) && e.roundRect(
          0,
          -u,
          s[0] + 1,
          u,
          t.flags.collapsed ? [this.round_radius] : [this.round_radius, this.round_radius, 0, 0]
        ), e.fill(), e.shadowColor = "transparent";
      }
      let d = null;
      h.node_box_coloured_by_mode && gt[t.mode] && (d = gt[t.mode]), h.node_box_coloured_when_on && (d = t.action_triggered ? "#FFF" : t.execute_triggered ? "#AAA" : d);
      const _ = 10;
      if (t.onDrawTitleBox ? t.onDrawTitleBox(e, this, u, s, this.ds.scale) : p === A.ROUND_SHAPE || p === A.CIRCLE_SHAPE || p === A.CARD_SHAPE ? (l && (e.fillStyle = "black", e.beginPath(), e.arc(
        u * 0.5,
        u * -0.5,
        _ * 0.5 + 1,
        0,
        Math.PI * 2
      ), e.fill()), e.fillStyle = t.boxcolor || d || h.NODE_DEFAULT_BOXCOLOR, l ? e.fillRect(u * 0.5 - _ * 0.5, u * -0.5 - _ * 0.5, _, _) : (e.beginPath(), e.arc(
        u * 0.5,
        u * -0.5,
        _ * 0.5,
        0,
        Math.PI * 2
      ), e.fill())) : (l && (e.fillStyle = "black", e.fillRect(
        (u - _) * 0.5 - 1,
        (u + _) * -0.5 - 1,
        _ + 2,
        _ + 2
      )), e.fillStyle = t.boxcolor || d || h.NODE_DEFAULT_BOXCOLOR, e.fillRect(
        (u - _) * 0.5,
        (u + _) * -0.5,
        _,
        _
      )), e.globalAlpha = y, t.onDrawTitleText && t.onDrawTitleText(
        e,
        this,
        u,
        s,
        this.ds.scale,
        this.title_text_font,
        r
      ), !l) {
        e.font = this.title_text_font;
        const m = String(t.getTitle());
        m && (r ? e.fillStyle = h.NODE_SELECTED_TITLE_COLOR : e.fillStyle = t.constructor.title_text_color || this.node_title_color, t.flags.collapsed ? (e.textAlign = "left", e.fillText(
          m.substr(0, 20),
          // avoid urls too long
          u,
          // + measure.width * 0.5,
          h.NODE_TITLE_TEXT_Y - u
        ), e.textAlign = "left") : (e.textAlign = "left", e.fillText(
          m,
          u,
          h.NODE_TITLE_TEXT_Y - u
        )));
      }
      if (!t.flags.collapsed && t.subgraph && !t.skip_subgraph_button) {
        const m = h.NODE_TITLE_HEIGHT, b = t.size[0] - m, v = h.isInsideRectangle(this.graph_mouse[0] - t.pos[0], this.graph_mouse[1] - t.pos[1], b + 2, -m + 2, m - 4, m - 4);
        e.fillStyle = v ? "#888" : "#555", p === A.BOX_SHAPE || l ? e.fillRect(b + 2, -m + 2, m - 4, m - 4) : (e.beginPath(), e.roundRect(b + 2, -m + 2, m - 4, m - 4, [4]), e.fill()), e.fillStyle = "#333", e.beginPath(), e.moveTo(b + m * 0.2, -m * 0.6), e.lineTo(b + m * 0.8, -m * 0.6), e.lineTo(b + m * 0.5, -m * 0.3), e.fill();
      }
      t.onDrawTitle && t.onDrawTitle(e, this);
    }
    r && (t.onBounding && t.onBounding(g), f === Z.TRANSPARENT_TITLE && (g[1] -= u, g[3] += u), e.lineWidth = 1, e.globalAlpha = 0.8, e.beginPath(), p === A.BOX_SHAPE ? e.rect(
      -6 + g[0],
      -6 + g[1],
      12 + g[2],
      12 + g[3]
    ) : p === A.ROUND_SHAPE || p === A.CARD_SHAPE && t.flags.collapsed ? e.roundRect(
      -6 + g[0],
      -6 + g[1],
      12 + g[2],
      12 + g[3],
      [this.round_radius * 2]
    ) : p === A.CARD_SHAPE ? e.roundRect(
      -6 + g[0],
      -6 + g[1],
      12 + g[2],
      12 + g[3],
      [this.round_radius * 2, 2, this.round_radius * 2, 2]
    ) : p === A.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5 + 6,
      0,
      Math.PI * 2
    ), e.strokeStyle = h.NODE_BOX_OUTLINE_COLOR, e.stroke(), e.strokeStyle = o, e.globalAlpha = 1), t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered > 0 && t.action_triggered--;
  }
  /** draws every connection visible in the canvas */
  drawConnections(t) {
    const e = h.getTime(), s = this.visible_area, o = q.margin_area;
    o[0] = s[0] - 20, o[1] = s[1] - 20, o[2] = s[2] + 40, o[3] = s[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;
    const n = this.graph._nodes;
    for (let r = 0, a = n.length; r < a; ++r) {
      const u = n[r];
      if (!(!u.inputs || !u.inputs.length))
        for (let l = 0; l < u.inputs.length; ++l) {
          const p = u.inputs[l];
          if (!p || p.link === null)
            continue;
          const f = p.link, c = this.graph.links[f];
          if (!c)
            continue;
          const g = this.graph.getNodeById(c.origin_id);
          if (g === null)
            continue;
          const y = c.origin_slot;
          let d = null;
          y === -1 ? d = [
            g.pos[0] + 10,
            g.pos[1] + 10
          ] : d = g.getConnectionPos(
            !1,
            y,
            q.tempA
          );
          const _ = u.getConnectionPos(!0, l, q.tempB), m = q.link_bounding;
          if (m[0] = d[0], m[1] = d[1], m[2] = _[0] - d[0], m[3] = _[1] - d[1], m[2] < 0 && (m[0] += m[2], m[2] = Math.abs(m[2])), m[3] < 0 && (m[1] += m[3], m[3] = Math.abs(m[3])), !h.overlapBounding(m, o))
            continue;
          const b = g.outputs[y], v = u.inputs[l];
          if (!b || !v)
            continue;
          const O = b.dir || (g.horizontal ? D.DOWN : D.RIGHT), N = v.dir || (u.horizontal ? D.UP : D.LEFT);
          if (this.renderLink(
            t,
            d,
            _,
            c,
            !1,
            !1,
            null,
            O,
            N
          ), c && c._last_time && e - c._last_time < 1e3) {
            const E = 2 - (e - c._last_time) * 2e-3, G = t.globalAlpha;
            t.globalAlpha = G * E, this.renderLink(
              t,
              d,
              _,
              c,
              !0,
              !0,
              "white",
              O,
              N
            ), t.globalAlpha = G;
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
  renderLink(t, e, s, o, n, r, a, u, l, p) {
    o && this.visible_links.push(o), !a && o && (a = o.color || this.link_type_colors[o.type]), a || (a = this.default_link_color), o !== null && this.highlighted_links[o.id] && (a = "#FFF"), u = u || D.RIGHT, l = l || D.LEFT;
    const f = h.distance(e, s);
    this.render_connections_border && this.ds.scale > 0.6 && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", p = p || 1, p > 1 && (t.lineWidth = 0.5), t.beginPath();
    for (let g = 0; g < p; g += 1) {
      const y = (g - (p - 1) * 0.5) * 5;
      if (this.links_render_mode === lt.SPLINE_LINK) {
        t.moveTo(e[0], e[1] + y);
        let d = 0, _ = 0, m = 0, b = 0;
        switch (u) {
          case D.LEFT:
            d = f * -0.25;
            break;
          case D.RIGHT:
            d = f * 0.25;
            break;
          case D.UP:
            _ = f * -0.25;
            break;
          case D.DOWN:
            _ = f * 0.25;
            break;
        }
        switch (l) {
          case D.LEFT:
            m = f * -0.25;
            break;
          case D.RIGHT:
            m = f * 0.25;
            break;
          case D.UP:
            b = f * -0.25;
            break;
          case D.DOWN:
            b = f * 0.25;
            break;
        }
        t.bezierCurveTo(
          e[0] + d,
          e[1] + _ + y,
          s[0] + m,
          s[1] + b + y,
          s[0],
          s[1] + y
        );
      } else if (this.links_render_mode === lt.LINEAR_LINK) {
        t.moveTo(e[0], e[1] + y);
        let d = 0, _ = 0, m = 0, b = 0;
        switch (u) {
          case D.LEFT:
            d = -1;
            break;
          case D.RIGHT:
            d = 1;
            break;
          case D.UP:
            _ = -1;
            break;
          case D.DOWN:
            _ = 1;
            break;
        }
        switch (l) {
          case D.LEFT:
            m = -1;
            break;
          case D.RIGHT:
            m = 1;
            break;
          case D.UP:
            b = -1;
            break;
          case D.DOWN:
            b = 1;
            break;
        }
        const v = 15;
        t.lineTo(
          e[0] + d * v,
          e[1] + _ * v + y
        ), t.lineTo(
          s[0] + m * v,
          s[1] + b * v + y
        ), t.lineTo(s[0], s[1] + y);
      } else if (this.links_render_mode === lt.STRAIGHT_LINK) {
        t.moveTo(e[0], e[1]);
        let d = e[0], _ = e[1], m = s[0], b = s[1];
        u === D.RIGHT ? d += 10 : _ += 10, l === D.LEFT ? m -= 10 : b -= 10, t.lineTo(d, _), t.lineTo((d + m) * 0.5, _), t.lineTo((d + m) * 0.5, b), t.lineTo(m, b), t.lineTo(s[0], s[1]);
      } else
        return;
    }
    this.render_connections_border && this.ds.scale > 0.6 && !n && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke()), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = a, t.stroke();
    const c = this.computeConnectionPoint(e, s, 0.5, u, l);
    if (o && o._pos && (o._pos[0] = c[0], o._pos[1] = c[1]), this.ds.scale >= 0.6 && this.highquality_render && l !== D.CENTER) {
      if (this.render_connection_arrows) {
        const g = this.computeConnectionPoint(
          e,
          s,
          0.25,
          u,
          l
        ), y = this.computeConnectionPoint(
          e,
          s,
          0.26,
          u,
          l
        ), d = this.computeConnectionPoint(
          e,
          s,
          0.75,
          u,
          l
        ), _ = this.computeConnectionPoint(
          e,
          s,
          0.76,
          u,
          l
        );
        let m = 0, b = 0;
        this.render_curved_connections ? (m = -Math.atan2(y[0] - g[0], y[1] - g[1]), b = -Math.atan2(_[0] - d[0], _[1] - d[1])) : b = m = s[1] > e[1] ? 0 : Math.PI, t.save(), t.translate(g[0], g[1]), t.rotate(m), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore(), t.save(), t.translate(d[0], d[1]), t.rotate(b), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore();
      }
      t.beginPath(), t.arc(c[0], c[1], 5, 0, Math.PI * 2), t.fill();
    }
    if (r) {
      t.fillStyle = a;
      for (let g = 0; g < 5; ++g) {
        const y = (h.getTime() * 1e-3 + g * 0.2) % 1, d = this.computeConnectionPoint(
          e,
          s,
          y,
          u,
          l
        );
        t.beginPath(), t.arc(d[0], d[1], 5, 0, 2 * Math.PI), t.fill();
      }
    }
  }
  computeConnectionPoint(t, e, s, o = D.RIGHT, n = D.LEFT) {
    const r = h.distance(t, e), a = t, u = [t[0], t[1]], l = [e[0], e[1]], p = e;
    switch (o) {
      case D.LEFT:
        u[0] += r * -0.25;
        break;
      case D.RIGHT:
        u[0] += r * 0.25;
        break;
      case D.UP:
        u[1] += r * -0.25;
        break;
      case D.DOWN:
        u[1] += r * 0.25;
        break;
    }
    switch (n) {
      case D.LEFT:
        l[0] += r * -0.25;
        break;
      case D.RIGHT:
        l[0] += r * 0.25;
        break;
      case D.UP:
        l[1] += r * -0.25;
        break;
      case D.DOWN:
        l[1] += r * 0.25;
        break;
    }
    const f = (1 - s) * (1 - s) * (1 - s), c = 3 * ((1 - s) * (1 - s)) * s, g = 3 * (1 - s) * (s * s), y = s * s * s, d = f * a[0] + c * u[0] + g * l[0] + y * p[0], _ = f * a[1] + c * u[1] + g * l[1] + y * p[1];
    return [d, _];
  }
  drawExecutionOrder(t) {
    t.shadowColor = "transparent", t.globalAlpha = 0.25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = 0.75;
    const e = this.visible_nodes;
    for (let s = 0; s < e.length; ++s) {
      const o = e[s];
      t.fillStyle = "black", t.fillRect(
        o.pos[0] - h.NODE_TITLE_HEIGHT,
        o.pos[1] - h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), o.order === 0 && t.strokeRect(
        o.pos[0] - h.NODE_TITLE_HEIGHT + 0.5,
        o.pos[1] - h.NODE_TITLE_HEIGHT + 0.5,
        h.NODE_TITLE_HEIGHT,
        h.NODE_TITLE_HEIGHT
      ), t.fillStyle = "#FFF", t.fillText(
        `${o.order}`,
        o.pos[0] + h.NODE_TITLE_HEIGHT * -0.5,
        o.pos[1] - 6
      );
    }
    t.globalAlpha = 1;
  }
  /** draws the widgets stored inside a node */
  drawNodeWidgets(t, e, s, o) {
    if (!t.widgets || !t.widgets.length)
      return;
    const n = t.size[0], r = t.widgets;
    e += 2;
    const a = h.NODE_WIDGET_HEIGHT, u = this.ds.scale > 0.5;
    s.save(), s.globalAlpha = this.editor_alpha;
    const l = h.WIDGET_OUTLINE_COLOR, p = h.WIDGET_BGCOLOR, f = h.WIDGET_TEXT_COLOR, c = h.WIDGET_SECONDARY_TEXT_COLOR, g = 15;
    for (let y = 0; y < r.length; ++y) {
      const d = r[y];
      if (d.hidden)
        continue;
      let _ = e;
      d.y && (_ = d.y), d.last_y = _, s.strokeStyle = l, s.fillStyle = "#222", s.textAlign = "left", d.disabled && (s.globalAlpha *= 0.5);
      const m = d.width || n;
      switch (d.type) {
        case "button":
          d.clicked && (s.fillStyle = "#AAA", d.clicked = !1, this.dirty_canvas = !0), s.fillRect(g, _, m - g * 2, a), u && !d.disabled && !h.ignore_all_widget_events && s.strokeRect(g, _, m - g * 2, a), u && (s.textAlign = "center", s.fillStyle = f, s.fillText(d.name, m * 0.5, _ + a * 0.7));
          break;
        case "toggle":
          s.textAlign = "left", s.strokeStyle = l, s.fillStyle = p, s.beginPath(), u ? s.roundRect(g, _, m - g * 2, a, [a * 0.5]) : s.rect(g, _, m - g * 2, a), s.fill(), u && !d.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = d.value ? "#89A" : "#333", s.beginPath(), s.arc(m - g * 2, _ + a * 0.5, a * 0.36, 0, Math.PI * 2), s.fill(), u && (s.fillStyle = c, d.name !== null && s.fillText(d.name, g * 2, _ + a * 0.7), s.fillStyle = d.value ? f : c, s.textAlign = "right", s.fillText(
            d.value ? d.options.on || "true" : d.options.off || "false",
            m - 40,
            _ + a * 0.7
          ));
          break;
        case "slider":
          s.fillStyle = p, s.fillRect(g, _, m - g * 2, a);
          const b = d.options.max - d.options.min, v = (d.value - d.options.min) / b;
          if (s.fillStyle = o === d ? "#89A" : "#678", s.fillRect(g, _, v * (m - g * 2), a), u && !d.disabled && s.strokeRect(g, _, m - g * 2, a), d.marker) {
            const O = (+d.marker - d.options.min) / b;
            s.fillStyle = "#AA9", s.fillRect(g + O * (m - g * 2), _, 2, a);
          }
          u && (s.textAlign = "center", s.fillStyle = f, s.fillText(
            `${d.name}  ${Number(d.value).toFixed(3)}`,
            m * 0.5,
            _ + a * 0.7
          ));
          break;
        case "number":
        case "combo":
          if (s.textAlign = "left", s.strokeStyle = l, s.fillStyle = p, s.beginPath(), u ? s.roundRect(g, _, m - g * 2, a, [a * 0.5]) : s.rect(g, _, m - g * 2, a), s.fill(), u)
            if (!d.disabled && !h.ignore_all_widget_events && s.stroke(), s.fillStyle = f, !d.disabled && !h.ignore_all_widget_events && (s.beginPath(), s.moveTo(g + 16, _ + 5), s.lineTo(g + 6, _ + a * 0.5), s.lineTo(g + 16, _ + a - 5), s.fill(), s.beginPath(), s.moveTo(m - g - 16, _ + 5), s.lineTo(m - g - 6, _ + a * 0.5), s.lineTo(m - g - 16, _ + a - 5), s.fill()), s.fillStyle = c, s.fillText(d.name, g * 2 + 5, _ + a * 0.7), s.fillStyle = f, s.textAlign = "right", d.type === "number")
              s.fillText(
                Number(d.value).toFixed(
                  d.options.precision !== void 0 ? d.options.precision : 3
                ),
                m - g * 2 - 20,
                _ + a * 0.7
              );
            else {
              let O = d.value;
              if (d.options.values) {
                let N = d.options.values;
                N.constructor === Function && (N = N()), N && N.constructor !== Array && (O = N[d.value]);
              }
              s.fillText(
                O,
                m - g * 2 - 20,
                _ + a * 0.7
              );
            }
          break;
        case "string":
        case "text":
          s.textAlign = "left", s.strokeStyle = l, s.fillStyle = p, s.beginPath(), u ? s.roundRect(g, _, m - g * 2, a, [a * 0.5]) : s.rect(g, _, m - g * 2, a), s.fill(), u && (d.disabled || s.stroke(), s.save(), s.beginPath(), s.rect(g, _, m - g * 2, a), s.clip(), s.fillStyle = c, d.name !== null && s.fillText(d.name, g * 2, _ + a * 0.7), s.fillStyle = f, s.textAlign = "right", s.fillText(String(d.value).substr(0, d.options.max_length || 30), m - g * 2, _ + a * 0.7), s.restore());
          break;
        default:
          d.draw && d.draw(s, t, m, _, a);
          break;
      }
      e += (d.computeSize ? d.computeSize(m)[1] : a) + 4, s.globalAlpha = this.editor_alpha;
    }
    s.restore(), s.textAlign = "left";
  }
};
let R = q;
R.temp = new Float32Array(4);
R.temp_vec2 = new Float32Array(2);
R.tmp_area = new Float32Array(4);
R.margin_area = new Float32Array(4);
R.link_bounding = new Float32Array(4);
R.tempA = [0, 0];
R.tempB = [0, 0];
class ct {
  constructor(e = "Group") {
    this.fontSize = h.DEFAULT_GROUP_FONT_SIZE, this._nodes = [], this.graph = null, this._bounding = new Float32Array([10, 10, 140, 80]), this.title = e, this.color = T.node_colors.pale_blue ? T.node_colors.pale_blue.groupcolor : "#AAA", this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4);
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
    e.bounding, this.title = e.title, this._bounding.set(e.bounding), this.color = e.color, this.font = e.font;
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
  move(e, s, o) {
    if (this._pos[0] += e, this._pos[1] += s, !o)
      for (let n = 0; n < this._nodes.length; ++n) {
        const r = this._nodes[n];
        r.pos[0] += e, r.pos[1] += s;
      }
  }
  recomputeInsideNodes() {
    this._nodes.length = 0;
    const e = this.graph._nodes, s = new Float32Array(4);
    for (let o = 0; o < e.length; ++o) {
      const n = e[o];
      n.getBounding(s), h.overlapBounding(this._bounding, s) && this._nodes.push(n);
    }
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(e, s, o = 0, n = !1) {
    let r = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    return n && (r = 0), this.pos[0] - 4 - o < e && this.pos[0] + this.size[0] + 4 + o > e && this.pos[1] - r - o < s && this.pos[1] + this.size[1] + o > s;
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(e, s = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [e, s]);
  }
}
let ut;
const At = new Uint8Array(16);
function Lt() {
  if (!ut && (ut = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ut))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ut(At);
}
const $ = [];
for (let t = 0; t < 256; ++t)
  $.push((t + 256).toString(16).slice(1));
function Dt(t, e = 0) {
  return ($[t[e + 0]] + $[t[e + 1]] + $[t[e + 2]] + $[t[e + 3]] + "-" + $[t[e + 4]] + $[t[e + 5]] + "-" + $[t[e + 6]] + $[t[e + 7]] + "-" + $[t[e + 8]] + $[t[e + 9]] + "-" + $[t[e + 10]] + $[t[e + 11]] + $[t[e + 12]] + $[t[e + 13]] + $[t[e + 14]] + $[t[e + 15]]).toLowerCase();
}
const Pt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), yt = {
  randomUUID: Pt
};
function tt(t, e, s) {
  if (yt.randomUUID && !e && !t)
    return yt.randomUUID();
  t = t || {};
  const o = t.random || (t.rng || Lt)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, e) {
    s = s || 0;
    for (let n = 0; n < 16; ++n)
      e[s + n] = o[n];
    return e;
  }
  return Dt(o);
}
class it {
  constructor(e, s, o, n, r, a) {
    this.data = null, this._pos = [0, 0], this._last_time = 0, this.id = e, this.type = s, this.origin_id = o, this.origin_slot = n, this.target_id = r, this.target_slot = a;
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
const _t = class {
  constructor(t) {
    this.desc = "", this.pos = [0, 0], this.subgraph = null, this.skip_subgraph_button = !1, this.priority = 0, this.removable = !0, this.clonable = !0, this.collapsable = !0, this.titleMode = Z.NORMAL_TITLE, this.serialize_widgets = !1, this.hide_in_node_lists = !1, this.block_delete = !1, this.ignore_remove = !1, this.last_serialization = null, this._relative_id = null, this.exec_version = 0, this.action_call = null, this.execute_triggered = 0, this.action_triggered = 0, this.console = [], this.title = t || "Unnamed", this.size = [h.NODE_WIDTH, 60], this.graph = null, this.pos = [10, 10], h.use_uuids ? this.id = tt() : this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
  }
  get slotLayout() {
    return "slotLayout" in this.constructor ? this.constructor.slotLayout : null;
  }
  /** configure a node from an object containing the serialized info */
  configure(t) {
    this.graph && this.graph._version++;
    for (const s in t) {
      if (s === "properties") {
        for (const o in t.properties)
          this.properties[o] = t.properties[o], this.onPropertyChanged && this.onPropertyChanged(o, t.properties[o]);
        continue;
      }
      t[s] !== null && (typeof t[s] == "object" ? this[s] && this[s].configure ? this[s].configure(t[s]) : this[s] = h.cloneObject(t[s], this[s]) : this[s] = t[s]);
    }
    t.title || (this.title = pt(this, "title") || this.title);
    const e = t.bgColor;
    if (e !== null && (this.bgcolor || (this.bgcolor = e)), this.inputs)
      for (let s = 0; s < this.inputs.length; ++s) {
        const o = this.inputs[s], n = this.graph ? this.graph.links[o.link] : null;
        o.properties || (o.properties = {}), this.onConnectionsChange && this.onConnectionsChange(B.INPUT, s, !0, n, o), this.onInputAdded && this.onInputAdded(o);
      }
    if (this.outputs)
      for (let s = 0; s < this.outputs.length; ++s) {
        const o = this.outputs[s];
        if (o.properties || (o.properties = {}), !!o.links) {
          for (let n = 0; n < o.links.length; ++n) {
            const r = this.graph ? this.graph.links[o.links[n]] : null;
            this.onConnectionsChange && this.onConnectionsChange(B.OUTPUT, s, !0, r, o);
          }
          this.onOutputAdded && this.onOutputAdded(o);
        }
      }
    if (this.widgets) {
      for (let s = 0; s < this.widgets.length; ++s) {
        const o = this.widgets[s];
        o && o.options && o.options.property && this.properties[o.options.property] && (o.value = JSON.parse(JSON.stringify(this.properties[o.options.property])));
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
    if (this.constructor === _t && this.last_serialization)
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
      for (let o = 0; o < s.inputs.length; ++o)
        s.inputs[o].link = null;
    if (s.outputs)
      for (let o = 0; o < s.outputs.length; ++o)
        s.outputs[o].links && (s.outputs[o].links.length = 0);
    return delete s.id, h.use_uuids && (s.id = tt()), e.configure(s), e;
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
      for (let o = 0; o < this.widgets.length; ++o) {
        const n = this.widgets[o];
        if (n && n.options.property === t) {
          n.value = e;
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
    const o = this.inputs[t];
    if (!o || (o.properties || (o.properties = {}), s === o.properties[e]))
      return;
    const n = o.properties[e];
    o.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(B.INPUT, t, o, e, s, n) === !1 && (o.properties[e] = n);
  }
  setOutputSlotProperty(t, e, s) {
    if (!this.outputs || !this.graph || t === -1 || t >= this.outputs.length)
      return;
    const o = this.outputs[t];
    if (!o || (o.properties || (o.properties = {}), s === o.properties[e]))
      return;
    const n = o.properties[e];
    o.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(B.OUTPUT, t, o, e, s, n) === !1 && (o.properties[e] = n);
  }
  /** sets the output data */
  setOutputData(t, e) {
    if (!this.outputs || !this.graph || t === -1 || t >= this.outputs.length)
      return;
    const s = this.outputs[t];
    if (s && (h.serialize_slot_data ? s._data = e : s._data = void 0, this.outputs[t].links))
      for (let o = 0; o < this.outputs[t].links.length; o++) {
        const n = this.outputs[t].links[o], r = this.graph.links[n];
        r && (r.data = e);
      }
  }
  /** sets the output data */
  setOutputDataType(t, e) {
    if (!this.outputs || t === -1 || t >= this.outputs.length)
      return;
    const s = this.outputs[t];
    if (s && (s.type = e, this.outputs[t].links))
      for (let o = this.outputs[t].links.length - 1; o >= 0; o--) {
        const n = this.outputs[t].links[o], r = this.graph.links[n];
        if (r) {
          r.type = e;
          const a = this.graph.getNodeById(r.target_id);
          if (a) {
            const u = a.getInputInfo(r.target_slot);
            u && !h.isValidConnection(e, u.type) && a.disconnectInput(r.target_slot);
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
    const s = this.inputs[t].link, o = this.graph.links[s];
    if (!o)
      return h.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], s), null;
    if (!e)
      return o.data;
    const n = this.graph.getNodeById(o.origin_id);
    return n && (n.updateOutputData ? n.updateOutputData(o.origin_slot) : n.onExecute && n.onExecute(null, {})), o.data;
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
    const o = this.graph.getNodeById(s.origin_id);
    if (!o)
      return s.type;
    const n = o.outputs[s.origin_slot];
    return n && n.type !== -1 ? n.type : null;
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
      const o = this.graph.getNodeById(s.origin_id);
      if (o)
        return o;
    }
    return null;
  }
  /** returns the value of an input with this name, otherwise checks if there is a property with that name */
  getInputOrProperty(t) {
    if (!this.inputs || !this.inputs.length || !this.graph)
      return this.properties ? this.properties[t] : null;
    for (let e = 0, s = this.inputs.length; e < s; ++e) {
      const o = this.inputs[e];
      if (t === o.name && o.link !== null) {
        const n = this.graph.links[o.link];
        if (n)
          return n.data;
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
      const o = s.link, n = this.graph.links[o];
      n.type = e;
      const r = this.graph.getNodeById(n.origin_id);
      if (r) {
        const a = r.getOutputInfo(n.origin_slot);
        a && !h.isValidConnection(a.type, e) && r.disconnectOutput(n.origin_slot);
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
        for (const o of e.links)
          s.push(this.graph.links[o]);
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
        for (const o of e.links) {
          const n = this.graph.links[o], r = this.graph.getNodeById(n.target_id);
          s.push(r.inputs[n.target_slot]);
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
    for (let o = 0; o < e.links.length; o++) {
      const n = e.links[o], r = this.graph.links[n];
      if (r) {
        const a = this.graph.getNodeById(r.target_id);
        a && s.push(a);
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
    return t === -1 ? (this.addInput("onTrigger", k.EVENT, { optional: !0, nameLocked: !0 }), this.findInputSlotIndexByName("onTrigger")) : t;
  }
  addOnExecutedOutput() {
    const t = this.findOutputSlotIndexByName("onExecuted");
    return t === -1 ? (this.addOutput("onExecuted", k.ACTION, { optional: !0, nameLocked: !0 }), this.findOutputSlotIndexByName("onExecuted")) : t;
  }
  onAfterExecuteNode(t, e) {
    const s = this.findOutputSlotIndexByName("onExecuted");
    s !== -1 && this.triggerSlot(s, t, null, e);
  }
  changeMode(t) {
    switch (t) {
      case W.ON_EVENT:
        break;
      case W.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case W.NEVER:
        break;
      case W.ALWAYS:
        break;
      case W.ON_REQUEST:
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
      for (let o = 0; o < this.outputs.length; ++o) {
        const n = this.outputs[o];
        !n || n.type !== k.EVENT || t && n.name !== t || this.triggerSlot(o, e, null, s);
      }
    }
  }
  /**
   * Triggers an slot event in this node
   * @param slot the index of the output slot
   * @param param
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  triggerSlot(t, e, s, o = {}) {
    if (!this.outputs)
      return;
    if (t === null) {
      console.error("slot must be a number");
      return;
    }
    typeof t != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
    const n = this.outputs[t];
    if (!n)
      return;
    const r = n.links;
    if (!(!r || !r.length)) {
      this.graph && (this.graph._last_trigger_time = h.getTime());
      for (let a = 0; a < r.length; ++a) {
        const u = r[a];
        if (s !== null && s !== u)
          continue;
        const l = this.graph.links[r[a]];
        if (!l)
          continue;
        l._last_time = h.getTime();
        const p = this.graph.getNodeById(l.target_id);
        if (p) {
          if (p.inputs[l.target_slot], o.link = l, o.originNode = this, p.mode === W.ON_TRIGGER)
            o.action_call || (o.action_call = `${this.id}_trigg_${Math.floor(Math.random() * 9999)}`), p.onExecute && p.doExecute(e, o);
          else if (p.onAction) {
            o.action_call || (o.action_call = `${this.id}_act_${Math.floor(Math.random() * 9999)}`);
            const f = p.inputs[l.target_slot];
            p.actionDo(f.name, e, o);
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
    const o = s.links;
    if (!(!o || !o.length))
      for (let n = 0; n < o.length; ++n) {
        const r = o[n];
        if (e !== null && e !== r)
          continue;
        const a = this.graph.links[o[n]];
        a && (a._last_time = 0);
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
  addProperty(t, e, s, o) {
    const n = { name: t, type: s, default_value: e };
    if (o)
      for (const r in o)
        n[r] = o[r];
    return this.properties_info || (this.properties_info = []), this.properties_info.push(n), this.properties || (this.properties = {}), this.properties[t] = e, n;
  }
  /**
   * add a new output slot to use in this node
   * @param name
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(t, e = k.DEFAULT, s) {
    const o = { name: t, type: e, links: [], properties: {} };
    if (s)
      for (const n in s)
        o[n] = s[n];
    return (o.shape === null || o.shape === A.DEFAULT) && (e === "array" ? o.shape = A.GRID_SHAPE : (e === k.EVENT || e === k.ACTION) && (o.shape = A.BOX_SHAPE)), (e === k.EVENT || e === k.ACTION) && (o.shape = A.BOX_SHAPE), this.outputs || (this.outputs = []), this.outputs.push(o), this.onOutputAdded && this.onOutputAdded(o), h.auto_load_slot_types && h.registerNodeAndSlotType(this, e, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), o;
  }
  /** remove an existing output slot */
  removeOutput(t) {
    const e = this.outputs[t];
    this.disconnectOutput(t), this.outputs.splice(t, 1);
    for (let s = t; s < this.outputs.length; ++s) {
      if (!this.outputs[s] || !this.outputs[s].links)
        continue;
      const o = this.outputs[s].links;
      for (let n = 0; n < o.length; ++n) {
        const r = this.graph.links[o[n]];
        r && (r.origin_slot -= 1);
      }
    }
    this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(t, e), this.setDirtyCanvas(!0, !0);
  }
  moveOutput(t, e) {
    const s = this.outputs[t];
    if (s === null || e < 0 || e > this.outputs.length - 1)
      return;
    const o = this.outputs[e];
    if (s.links)
      for (const n of s.links) {
        const r = this.graph.links[n];
        r.origin_slot = e;
      }
    if (o.links)
      for (const n of o.links) {
        const r = this.graph.links[n];
        r.origin_slot = t;
      }
    this.outputs[e] = s, this.outputs[t] = o;
  }
  /**
   * add a new input slot to use in this node
   * @param name
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(t, e = k.DEFAULT, s) {
    const o = { name: t, type: e, link: null, properties: {} };
    if (s)
      for (const n in s)
        o[n] = s[n];
    return (o.shape === null || o.shape === A.DEFAULT) && (e === "array" ? o.shape = A.GRID_SHAPE : (e === k.EVENT || e === k.ACTION) && (o.shape = A.BOX_SHAPE)), this.inputs || (this.inputs = []), this.inputs.push(o), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(o), h.registerNodeAndSlotType(this, e), this.setDirtyCanvas(!0, !0), o;
  }
  /** remove an existing input slot */
  removeInput(t) {
    this.disconnectInput(t);
    const e = this.inputs.splice(t, 1);
    for (let s = t; s < this.inputs.length; ++s) {
      if (!this.inputs[s])
        continue;
      const o = this.graph.links[this.inputs[s].link];
      o && (o.target_slot -= 1);
    }
    this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(t, e[0]), this.setDirtyCanvas(!0, !0);
  }
  moveInput(t, e) {
    const s = this.inputs[t];
    if (s === null || e < 0 || e > this.inputs.length - 1)
      return;
    const o = this.inputs[e];
    if (s.link !== null) {
      const n = this.graph.links[s.link];
      n.target_slot = e;
    }
    if (o.link !== null) {
      const n = this.graph.links[o.link];
      n.target_slot = t;
    }
    this.inputs[e] = s, this.inputs[t] = o;
  }
  /**
   * add an special connection to this node (used for special kinds of graphs)
   * @param name
   * @param type string defining the input type ("vec3","number",...)
   * @param pos position of the connection inside the node
   * @param direction if is input or output
   */
  addConnection(t, e, s, o) {
    const n = {
      name: t,
      type: e,
      pos: s,
      direction: o,
      links: null
    };
    return this.connections.push(n), n;
  }
  /** computes the size of a node according to its inputs and output slots */
  computeSize(t = [0, 0]) {
    const e = pt(this, "overrideSize");
    if (e)
      return e.concat();
    let s = Math.max(
      this.inputs ? this.inputs.length : 1,
      this.outputs ? this.outputs.length : 1
    );
    const o = t;
    s = Math.max(s, 1);
    const n = h.NODE_TEXT_SIZE, r = p(this.title);
    let a = 0, u = 0;
    if (this.inputs)
      for (let f = 0, c = this.inputs.length; f < c; ++f) {
        const g = this.inputs[f], y = g.label || g.name || "", d = p(y);
        a < d && (a = d);
      }
    if (this.outputs)
      for (let f = 0, c = this.outputs.length; f < c; ++f) {
        const g = this.outputs[f], y = g.label || g.name || "", d = p(y);
        u < d && (u = d);
      }
    if (o[0] = Math.max(a + u + 10, r), o[0] = Math.max(o[0], h.NODE_WIDTH), this.widgets && this.widgets.length)
      for (const f of this.widgets)
        o[0] = Math.max(o[0], f.width || h.NODE_WIDTH * 1.5);
    o[1] = (this.constructor.slot_start_y || 0) + s * h.NODE_SLOT_HEIGHT;
    let l = 0;
    if (this.widgets && this.widgets.length) {
      for (let f = 0, c = this.widgets.length; f < c; ++f) {
        const g = this.widgets[f];
        g.hidden || (g.computeSize ? l += g.computeSize(o[0])[1] + 4 : l += h.NODE_WIDGET_HEIGHT + 4);
      }
      l += 8;
    }
    this.widgets_up ? o[1] = Math.max(o[1], l) : this.widgets_start_y !== null ? o[1] = Math.max(o[1], l + this.widgets_start_y) : o[1] += l;
    function p(f) {
      return f ? n * f.length * 0.6 : 0;
    }
    return this.constructor.min_height && o[1] < this.constructor.min_height && (o[1] = this.constructor.min_height), o[1] += 6, o;
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
  addWidget(t, e, s, o, n) {
    this.widgets || (this.widgets = []), !n && o && o.constructor === Object && (n = o, o = null), n && n.constructor === String && (n = { property: n }), o && o.constructor === String && (n || (n = {}), n.property = o, o = null), o && o.constructor !== Function && (console.warn("addWidget: callback must be a function"), o = null);
    const r = {
      type: t.toLowerCase(),
      name: e,
      value: s,
      callback: o,
      options: n || {}
    };
    if (r.options.y !== void 0 && (r.y = r.options.y), !o && !r.options.callback && !r.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), t === "combo" && !r.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    return this.widgets.push(r), this.setSize(this.computeSize()), r;
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
  isPointInside(t, e, s = 0, o = !1) {
    let n = this.graph && this.graph.isLive() ? 0 : h.NODE_TITLE_HEIGHT;
    if (o && (n = 0), this.flags && this.flags.collapsed) {
      if (h.isInsideRectangle(
        t,
        e,
        this.pos[0] - s,
        this.pos[1] - h.NODE_TITLE_HEIGHT - s,
        (this._collapsed_width || h.NODE_COLLAPSED_WIDTH) + 2 * s,
        h.NODE_TITLE_HEIGHT + 2 * s
      ))
        return !0;
    } else if (this.pos[0] - 4 - s < t && this.pos[0] + this.size[0] + 4 + s > t && this.pos[1] - n - s < e && this.pos[1] + this.size[1] + s > e)
      return !0;
    return !1;
  }
  /** checks if a point is inside a node slot, and returns info about which slot */
  getSlotInPosition(t, e) {
    const s = [0, 0];
    if (this.inputs)
      for (let o = 0, n = this.inputs.length; o < n; ++o) {
        const r = this.inputs[o];
        if (this.getConnectionPos(!0, o, s), h.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { input: r, slot: o, link_pos: s };
      }
    if (this.outputs)
      for (let o = 0, n = this.outputs.length; o < n; ++o) {
        const r = this.outputs[o];
        if (this.getConnectionPos(!1, o, s), h.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { output: r, slot: o, link_pos: s };
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
    for (let o = 0, n = this.inputs.length; o < n; ++o)
      if (!(e && this.inputs[o].link && this.inputs[o].link !== null) && !(s && s.includes(this.inputs[o].type)) && (!t || t === this.inputs[o].name))
        return o;
    return -1;
  }
  findInputSlotByName(t, e = !1, s) {
    if (!this.inputs)
      return null;
    for (let o = 0, n = this.inputs.length; o < n; ++o)
      if (!(e && this.inputs[o].link && this.inputs[o].link !== null) && !(s && s.includes(this.inputs[o].type)) && (!t || t === this.inputs[o].name))
        return this.inputs[o];
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
    for (let o = 0, n = this.outputs.length; o < n; ++o)
      if (!(e && this.outputs[o].links && this.outputs[o].links !== null) && !(s && s.includes(this.outputs[o].type)) && (!t || t === this.outputs[o].name))
        return o;
    return -1;
  }
  findOutputSlotByName(t, e = !1, s) {
    if (!this.outputs)
      return null;
    for (let o = 0, n = this.outputs.length; o < n; ++o)
      if (!(e && this.outputs[o].links && this.outputs[o].links !== null) && !(s && s.includes(this.outputs[o].type)) && (!t || t === this.outputs[o].name))
        return this.outputs[o];
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
  findSlotByType(t, e, s, o = !1, n = !1) {
    o = o || !1, n = n || !1;
    const r = t ? this.inputs : this.outputs;
    if (!r)
      return s ? null : -1;
    (e === "" || e === "*") && (e = 0);
    for (let a = 0, u = r.length; a < u; ++a) {
      const l = `${e}`.toLowerCase().split(","), f = `${r[a].type === "0" || r[a].type === "*" ? "0" : r[a].type}`.toLowerCase().split(",");
      for (let c = 0; c < l.length; c++)
        for (let g = 0; g < f.length; g++)
          if (l[c] === "_event_" && (l[c] = k.EVENT), f[c] === "_event_" && (f[c] = k.EVENT), l[c] === "*" && (l[c] = k.DEFAULT), f[c] === "*" && (f[c] = k.DEFAULT), l[c] === f[g]) {
            const y = r[a];
            if (o && y.links && y.links !== null || y.link && y.link !== null)
              continue;
            return s ? y : a;
          }
    }
    if (o && !n)
      for (let a = 0, u = r.length; a < u; ++a) {
        const l = `${e}`.toLowerCase().split(","), f = `${r[a].type === "0" || r[a].type === "*" ? "0" : r[a].type}`.toLowerCase().split(",");
        for (let c = 0; c < l.length; c++)
          for (let g = 0; g < f.length; g++)
            if (l[c] === "*" && (l[c] = k.DEFAULT), f[c] === "*" && (f[c] = k.DEFAULT), l[c] === f[g])
              return s ? r[a] : a;
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
  connectByTypeInput(t, e, s, o = {}) {
    const r = Object.assign({
      createEventInCase: !0,
      firstFreeIfOutputGeneralInCase: !0,
      generalTypeInCase: !0
    }, o);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let a = s;
    s === k.EVENT ? a = k.ACTION : s === k.ACTION && (a = k.EVENT);
    const u = e.findInputSlotIndexByType(a, !0);
    if (u >= 0 && u !== null)
      return h.debug && console.debug(`CONNbyTYPE type ${s} for ${u}`), this.connect(t, e, u);
    if (h.debug && console.log(`type ${s} not found or not free?`), r.createEventInCase && s === k.EVENT)
      return h.debug && console.debug(`connect WILL CREATE THE onTrigger ${s} to ${e}`), this.connect(t, e, -1);
    if (r.generalTypeInCase) {
      const l = e.findInputSlotIndexByType(k.DEFAULT, !0, !0);
      if (h.debug && console.debug("connect TO a general type (*, 0), if not found the specific type ", s, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    if (r.firstFreeIfOutputGeneralInCase && (s === 0 || s === "*" || s === "")) {
      const l = e.findInputSlotIndexByName(null, !0, [k.EVENT]);
      if (h.debug && console.debug("connect TO TheFirstFREE ", s, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    return h.debug && console.error("no way to connect type: ", s, " to targetNODE ", e), null;
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the output slot type of the target node
   * @return {object} the link_info is created, otherwise null
   */
  connectByTypeOutput(t, e, s, o = {}) {
    const r = Object.assign({
      createEventInCase: !0,
      firstFreeIfInputGeneralInCase: !0,
      generalTypeInCase: !0
    }, o);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let a = s;
    if (s === k.EVENT ? a = k.ACTION : s === k.ACTION && (a = k.EVENT), sourceSlot = e.findOutputSlotIndexByType(a, !0), sourceSlot >= 0 && sourceSlot !== null)
      return console.debug(`CONNbyTYPE OUT! type ${s} for ${sourceSlot} to ${a}`), e.connect(sourceSlot, this, t);
    if (r.generalTypeInCase) {
      const u = e.findOutputSlotIndexByType(0, !0, !0);
      if (u >= 0)
        return e.connect(u, this, t);
    }
    if ((r.createEventInCase && s === k.EVENT || s === k.ACTION) && h.do_add_triggers_slots) {
      const u = e.addOnExecutedOutput();
      return e.connect(u, this, t);
    }
    if (r.firstFreeIfInputGeneralInCase && (s === 0 || s === "*" || s === "")) {
      const u = e.findOutputSlotIndexByName(null, !0, [k.EVENT, k.ACTION]);
      if (u >= 0)
        return e.connect(u, this, t);
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
    } else if (s === k.EVENT)
      if (h.do_add_triggers_slots)
        e.changeMode(W.ON_TRIGGER), s = e.findInputSlotIndexByName("onTrigger");
      else
        return h.debug && console.error("Connect: Error, can't connect event target slot"), null;
    else if (!e.inputs || s >= e.inputs.length)
      return h.debug && console.error("Connect: Error, slot number not found"), null;
    let o = !1;
    const n = e.inputs[s];
    let r = null;
    const a = this.outputs[t];
    if (!this.outputs[t])
      return h.debug && (console.warn(`Connect: Invalid slot passed: ${t}`), console.warn(this.outputs)), null;
    if (e.onBeforeConnectInput && (s = e.onBeforeConnectInput(s)), s === -1 || s === null || !h.isValidConnection(a.type, n.type))
      return this.setDirtyCanvas(!1, !0), o && this.graph.connectionChange(this, r), console.warn("Connect: Invalid connection: ", s, a.type, n.type), null;
    if (h.debug && console.debug("valid connection", a.type, n.type), e.onConnectInput && e.onConnectInput(s, a.type, a, this, t) === !1)
      return h.debug && console.debug("onConnectInput blocked", a.type, n.type), null;
    if (this.onConnectOutput && this.onConnectOutput(t, n.type, n, e, s) === !1)
      return h.debug && console.debug("onConnectOutput blocked", a.type, n.type), null;
    if (e.inputs[s] && e.inputs[s].link !== null && (this.graph.beforeChange(), e.disconnectInput(s, { doProcessChange: !1 }), o = !0), a.links !== null && a.links.length)
      switch (a.type) {
        case k.EVENT:
          h.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(t, null, { doProcessChange: !1 }), o = !0);
          break;
      }
    let u;
    return h.use_uuids ? u = tt() : u = ++this.graph.last_link_id, r = new it(
      u,
      n.type || a.type,
      this.id,
      t,
      e.id,
      s
    ), this.graph.links[r.id] && console.error("Link already exists in graph!", r.id, r, this.graph.links[r.id]), this.graph.links[r.id] = r, a.links === null && (a.links = []), a.links.push(r.id), e.inputs[s].link = r.id, this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
      B.OUTPUT,
      t,
      !0,
      r,
      a
    ), e.onConnectionsChange && e.onConnectionsChange(
      B.INPUT,
      s,
      !0,
      r,
      n
    ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
      B.INPUT,
      e,
      s,
      this,
      t
    ), this.graph.onNodeConnectionChange(
      B.OUTPUT,
      this,
      t,
      e,
      s
    )), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, r), r;
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
    const o = this.outputs[t];
    if (!o || !o.links || o.links.length === 0)
      return !1;
    if (e) {
      if (e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
        throw "Target Node not found";
      for (let n = 0, r = o.links.length; n < r; n++) {
        const a = o.links[n], u = this.graph.links[a];
        if (u.target_id === e.id) {
          o.links.splice(n, 1);
          const l = e.inputs[u.target_slot];
          l.link = null, delete this.graph.links[a], this.graph && this.graph._version++, e.onConnectionsChange && e.onConnectionsChange(
            B.INPUT,
            u.target_slot,
            !1,
            u,
            l
          ), this.onConnectionsChange && this.onConnectionsChange(
            B.OUTPUT,
            t,
            !1,
            u,
            o
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            B.OUTPUT,
            this,
            t
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            B.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            B.INPUT,
            e,
            u.target_slot
          ));
          break;
        }
      }
    } else {
      for (let n = 0, r = o.links.length; n < r; n++) {
        const a = o.links[n], u = this.graph.links[a];
        if (!u)
          continue;
        const l = this.graph.getNodeById(u.target_id);
        let p = null;
        this.graph && this.graph._version++, l && (p = l.inputs[u.target_slot], p.link = null, l.onConnectionsChange && l.onConnectionsChange(
          B.INPUT,
          u.target_slot,
          !1,
          u,
          p
        ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
          B.INPUT,
          l,
          u.target_slot
        )), delete this.graph.links[a], this.onConnectionsChange && this.onConnectionsChange(
          B.OUTPUT,
          t,
          !1,
          u,
          o
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          B.OUTPUT,
          this,
          t
        ), this.graph.onNodeConnectionChange(
          B.INPUT,
          l,
          u.target_slot
        ));
      }
      o.links = null;
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
    const o = this.inputs[t].link;
    if (o !== null) {
      this.inputs[t].link = null;
      const n = this.graph.links[o];
      if (n) {
        const r = this.graph.getNodeById(n.origin_id);
        if (!r)
          return !1;
        const a = r.outputs[n.origin_slot];
        if (!a || !a.links || a.links.length === 0)
          return !1;
        for (let u = 0, l = a.links.length; u < l; u++)
          if (a.links[u] === o) {
            a.links.splice(u, 1);
            break;
          }
        delete this.graph.links[o], this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
          B.INPUT,
          t,
          !1,
          n,
          s
        ), r.onConnectionsChange && r.onConnectionsChange(
          B.OUTPUT,
          i,
          !1,
          n,
          a
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          B.OUTPUT,
          r,
          i
        ), this.graph.onNodeConnectionChange(B.INPUT, this, t));
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
  getConnectionPos(t, e, s = [0, 0], o = !1) {
    let n = 0;
    t && this.inputs && (n = this.inputs.length), !t && this.outputs && (n = this.outputs.length);
    const r = h.NODE_SLOT_HEIGHT * 0.5;
    if (this.flags.collapsed && !o) {
      const a = this._collapsed_width || h.NODE_COLLAPSED_WIDTH;
      return this.horizontal ? (s[0] = this.pos[0] + a * 0.5, t ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1]) : (t ? s[0] = this.pos[0] : s[0] = this.pos[0] + a, s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT * 0.5), s;
    }
    return t && e === -1 ? (s[0] = this.pos[0] + h.NODE_TITLE_HEIGHT * 0.5, s[1] = this.pos[1] + h.NODE_TITLE_HEIGHT * 0.5, s) : t && n > e && this.inputs[e].pos ? (s[0] = this.pos[0] + this.inputs[e].pos[0], s[1] = this.pos[1] + this.inputs[e].pos[1], s) : !t && n > e && this.outputs[e].pos ? (s[0] = this.pos[0] + this.outputs[e].pos[0], s[1] = this.pos[1] + this.outputs[e].pos[1], s) : this.horizontal ? (s[0] = this.pos[0] + (e + 0.5) * (this.size[0] / n), t ? s[1] = this.pos[1] - h.NODE_TITLE_HEIGHT : s[1] = this.pos[1] + this.size[1], s) : (t ? s[0] = this.pos[0] + r : s[0] = this.pos[0] + this.size[0] + 1 - r, s[1] = this.pos[1] + (e + 0.7) * h.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), s);
  }
  /** Force align to grid */
  alignToGrid() {
    this.pos[0] = h.CANVAS_GRID_SIZE * Math.round(this.pos[0] / h.CANVAS_GRID_SIZE), this.pos[1] = h.CANVAS_GRID_SIZE * Math.round(this.pos[1] / h.CANVAS_GRID_SIZE);
  }
  /** Console output */
  trace(t) {
    this.console || (this.console = []), this.console.push(t), this.console.length > _t.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, t);
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
  /** Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(t) {
    if (!this.graph || !this.graph.list_of_graphcanvas)
      return;
    const e = this.graph.list_of_graphcanvas;
    for (let s = 0; s < e.length; ++s) {
      const o = e[s];
      !t && o.node_capturing_input !== this || (o.node_capturing_input = t ? this : null);
    }
  }
  isShowingTitle(t) {
    return this.titleMode === Z.TRANSPARENT_TITLE || this.titleMode === Z.NO_TITLE ? !1 : (this.titleMode === Z.AUTOHIDE_TITLE && t, !0);
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
    return pt(this, "optionalSlots");
  }
};
let et = _t;
et.MAX_CONSOLE = 100;
function Et() {
  let t = [];
  return t = t.concat(bt), t = t.concat([k.ACTION]), t = t.concat(h.slot_types_in.map((e) => e.toUpperCase())), t;
}
function Rt() {
  return Et().map(X);
}
class V extends et {
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
      X(this.properties.type),
      this.setType.bind(this),
      { values: Rt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      X(this.properties.type),
      this.setType.bind(this)
    ), this.valueWidget = this.addWidget(
      "number",
      "Value",
      this.properties.value,
      (o) => {
        s.setProperty("value", o);
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
    e === "-1" || e === "Action" ? s = k.ACTION : e === "-2" || e === "Event" ? s = k.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
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
    this.typeWidget.value = X(e);
    const s = this.outputs[0];
    s.type !== e && (h.isValidConnection(s.type, e) || this.disconnectOutput(0), s.type = e), e === "array" ? s.shape = A.GRID_SHAPE : e === k.EVENT || e === k.ACTION ? s.shape = A.BOX_SHAPE : s.shape = A.DEFAULT, e === "number" ? (this.valueWidget.type = "number", this.valueWidget.value = 0) : e === "boolean" ? (this.valueWidget.type = "toggle", this.valueWidget.value = !0) : e === "string" ? (this.valueWidget.type = "text", this.valueWidget.value = "") : (this.valueWidget.type = null, this.valueWidget.value = null), this.properties.value = this.valueWidget.value, this.graph && this.nameInGraph && Tt(e) ? (this.graph.changeInputType(this.nameInGraph, e), s.type !== e && this.setOutputDataType(0, e)) : console.error("[GraphInput] Can't change output to type", e, this.graph, this.nameInGraph);
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
    this.properties.type === k.EVENT && this.triggerSlot(0, s);
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
V.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
h.registerNodeType({
  class: V,
  title: "Input",
  desc: "Input of the graph",
  type: "graph/input",
  hide_in_node_lists: !0
});
function Nt() {
  let t = [];
  return t = t.concat(bt), t = t.concat([k.EVENT]), t = t.concat(h.slot_types_out), t;
}
function Mt() {
  return Nt().map(X);
}
class j extends et {
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
      X(this.properties.type),
      this.setType.bind(this),
      { values: Mt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      X(this.properties.type),
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
    e === "-1" || e === "Action" ? s = k.ACTION : e === "-2" || e === "Event" ? s = k.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
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
    this.typeWidget && (this.typeWidget.value = X(e)), e === "array" ? s.shape = A.GRID_SHAPE : e === k.EVENT || e === k.ACTION ? s.shape = A.BOX_SHAPE : s.shape = A.DEFAULT, s.type !== e && ((e === "action" || e === "event") && (e = k.EVENT), h.isValidConnection(s.type, e) || this.disconnectInput(0), s.type = e), this.graph && this.nameInGraph && Tt(e) ? (this.graph.changeOutputType(this.nameInGraph, e), s.type !== e && this.setInputDataType(0, e)) : console.error("Can't change GraphOutput to type", e, this.graph, this.nameInGraph);
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
  onAction(e, s, o) {
    const n = this.getParentSubgraph();
    if (!n)
      return;
    const r = n.findOutputSlotIndexByName(this.properties.name);
    r === null || n.outputs[r] === null || n.triggerSlot(r, s);
  }
  onExecute() {
    const e = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, e);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeOutput(this.nameInGraph);
  }
}
j.slotLayout = {
  inputs: [
    { name: "", type: "" }
  ],
  outputs: []
};
h.registerNodeType({
  class: j,
  title: "Output",
  desc: "Output of the graph",
  type: "graph/output",
  hide_in_node_lists: !0
});
var Gt = /* @__PURE__ */ ((t) => (t[t.STATUS_STOPPED = 1] = "STATUS_STOPPED", t[t.STATUS_RUNNING = 2] = "STATUS_RUNNING", t))(Gt || {});
const Ot = class {
  constructor(t) {
    this.supported_types = null, this.vars = {}, this.extra = {}, this.inputs = {}, this.outputs = {}, this.links = {}, this.list_of_graphcanvas = [], this._nodes = [], this._groups = [], this._nodes_by_id = {}, this._nodes_executable = null, this._nodes_in_order = [], this._version = -1, this._last_trigger_time = 0, this._is_subgraph = !1, this._subgraph_node = null, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.execution_timer_id = -1, this.execution_time = 0, this.errors_in_execution = !1, h.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
  }
  getSupportedTypes() {
    return this.supported_types || Ot.DEFAULT_SUPPORTED_TYPES;
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
    if (!(t instanceof T))
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
    const o = h.getTime();
    this.globaltime = 1e-3 * (o - this.starttime);
    const n = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (!n)
      return;
    if (s = s || n.length, e) {
      for (let u = 0; u < t; u++) {
        for (let l = 0; l < s; ++l) {
          const p = n[l];
          p.mode === W.ALWAYS && p.onExecute && p.doExecute();
        }
        this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
      }
      this.onAfterExecute && this.onAfterExecute();
    } else
      try {
        for (let u = 0; u < t; u++) {
          for (let l = 0; l < s; ++l) {
            const p = n[l];
            p.mode === W.ALWAYS && p.onExecute && p.onExecute(null, {});
          }
          this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
        }
        this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
      } catch (u) {
        if (this.errors_in_execution = !0, h.throw_errors)
          throw u;
        h.debug && console.log(`Error during execution: ${u}`), this.stop();
      }
    const r = h.getTime();
    let a = r - o;
    a === 0 && (a = 1), this.execution_time = 1e-3 * a, this.globaltime += 1e-3 * a, this.iteration += 1, this.elapsed_time = (r - this.last_update_time) * 1e-3, this.last_update_time = r, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
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
      if (yield s, s.is(J))
        for (const o of s.subgraph.computeExecutionOrderRecursive(t, e))
          yield o;
  }
  /** This is more internal, it computes the executable nodes in order and returns it */
  computeExecutionOrder(t = !1, e) {
    let s = [];
    const o = [], n = {}, r = {}, a = {};
    for (let l = 0, p = this._nodes.length; l < p; ++l) {
      const f = this._nodes[l];
      if (t && !f.onExecute)
        continue;
      n[f.id] = f;
      let c = 0;
      if (f.inputs)
        for (let g = 0, y = f.inputs.length; g < y; g++)
          f.inputs[g] && f.inputs[g].link !== null && (c += 1);
      c === 0 ? (o.push(f), e && (f._level = 1)) : (e && (f._level = 0), a[f.id] = c);
    }
    for (; o.length !== 0; ) {
      const l = o.shift();
      if (s.push(l), delete n[l.id], !!l.outputs)
        for (let p = 0; p < l.outputs.length; p++) {
          const f = l.outputs[p];
          if (!(f === null || f.links === null || f.links.length === 0))
            for (let c = 0; c < f.links.length; c++) {
              const g = f.links[c], y = this.links[g];
              if (!y || r[y.id])
                continue;
              const d = this.getNodeById(y.target_id);
              if (d === null) {
                r[y.id] = !0;
                continue;
              }
              e && (!d._level || d._level <= l._level) && (d._level = l._level + 1), r[y.id] = !0, a[d.id] -= 1, a[d.id] === 0 && o.push(d);
            }
        }
    }
    for (const l of Object.keys(n).sort())
      s.push(n[l]);
    s.length !== this._nodes.length && h.debug && console.warn("something went wrong, nodes missing");
    const u = s.length;
    for (let l = 0; l < u; ++l)
      s[l].order = l;
    s = s.sort((l, p) => {
      const f = l.constructor.priority || l.priority || 0, c = p.constructor.priority || p.priority || 0;
      return f === c ? l.order - p.order : f - c;
    });
    for (let l = 0; l < u; ++l)
      s[l].order = l;
    return s;
  }
  /**
   * Returns all the nodes that could affect this one (ancestors) by crawling all the inputs recursively.
   * It doesn't include the node itself
   * @return an array with all the LGraphNodes that affect this node, in order of execution
   */
  getAncestors(t) {
    const e = [], s = [t], o = {};
    for (; s.length; ) {
      const n = s.shift();
      if (n.inputs) {
        !o[n.id] && n !== t && (o[n.id] = !0, e.push(n));
        for (let r = 0; r < n.inputs.length; ++r) {
          const a = n.getInputNode(r);
          a && !e.includes(a) && s.push(a);
        }
      }
    }
    return e.sort((n, r) => n.order - r.order), e;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(t = 100, e = st.HORIZONTAL_LAYOUT) {
    const s = this.computeExecutionOrder(!1, !0), o = [];
    for (let r = 0; r < s.length; ++r) {
      const a = s[r], u = a._level || 1;
      o[u] || (o[u] = []), o[u].push(a);
    }
    let n = t;
    for (let r = 0; r < o.length; ++r) {
      const a = o[r];
      if (!a)
        continue;
      let u = 100, l = t + h.NODE_TITLE_HEIGHT;
      for (let p = 0; p < a.length; ++p) {
        const f = a[p];
        f.pos[0] = e === st.VERTICAL_LAYOUT ? l : n, f.pos[1] = e === st.VERTICAL_LAYOUT ? n : l;
        const c = e === st.VERTICAL_LAYOUT ? 1 : 0;
        f.size[c] > u && (u = f.size[c]);
        const g = e === st.VERTICAL_LAYOUT ? 0 : 1;
        l += f.size[g] + t + h.NODE_TITLE_HEIGHT;
      }
      n += u + t;
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
  sendEventToAllNodes(t, e = [], s = W.ALWAYS) {
    if (this._nodes_in_order ? this._nodes_in_order : this._nodes)
      for (const n of this.iterateNodesInOrder()) {
        if (n.type === "basic/subgraph" && t !== "onExecute") {
          n.mode === s && n.sendEventToAllNodes(t, e, s);
          continue;
        }
        !n[t] || n.mode !== s || (e === void 0 ? n[t]() : e && e.constructor === Array ? n[t].apply(n, e) : n[t](e));
      }
  }
  sendActionToCanvas(t, e = []) {
    if (this.list_of_graphcanvas)
      for (let s = 0; s < this.list_of_graphcanvas.length; ++s) {
        const o = this.list_of_graphcanvas[s];
        o[t] && o[t].apply(o, e);
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
    if (t.id !== -1 && this._nodes_by_id[t.id] !== null && (console.warn(
      "LiteGraph: there is already a node with this ID, changing it",
      t.id
    ), h.use_uuids ? t.id = tt() : t.id = ++this.last_node_id), e.pos && (isNaN(e.pos[0]) || isNaN(e.pos[1])))
      throw "LiteGraph: Node position contained NaN(s)!";
    if (this._nodes.length >= h.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return h.use_uuids ? t.id || (t.id = tt()) : t.id === null || t.id === -1 ? t.id = ++this.last_node_id : this.last_node_id < t.id && (this.last_node_id = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, e.pos && (t.pos = e.pos), t.onAdded && t.onAdded(this), this.config.align_to_grid && t.alignToGrid(), e.skipComputeOrder || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(t, e), this.setDirtyCanvas(!0), this.change(), t;
  }
  /** Removes a node from the graph */
  remove(t, e = {}) {
    if (t instanceof ct) {
      const o = this._groups.indexOf(t);
      o !== -1 && this._groups.splice(o, 1), t.graph = null, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[t.id] === null || t.ignore_remove)
      return;
    if (this.beforeChange(), t.inputs)
      for (let o = 0; o < t.inputs.length; o++)
        t.inputs[o].link !== null && t.disconnectInput(o);
    if (t.outputs)
      for (let o = 0; o < t.outputs.length; o++) {
        const n = t.outputs[o];
        n.links !== null && n.links.length && t.disconnectOutput(o);
      }
    if (t.onRemoved && t.onRemoved(e), t.graph = null, this._version++, this.list_of_graphcanvas)
      for (let o = 0; o < this.list_of_graphcanvas.length; ++o) {
        const n = this.list_of_graphcanvas[o];
        n.selected_nodes[t.id] && delete n.selected_nodes[t.id], n.node_dragged === t && (n.node_dragged = null);
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
    for (const s of this.iterateNodesOfClass(J)) {
      const o = s.subgraph.getNodeByIdRecursive(t);
      if (o)
        return o;
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
    for (let s = 0, o = this._nodes.length; s < o; ++s)
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
    for (let s = 0, o = this._nodes.length; s < o; ++s)
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
  getNodeOnPos(t, e, s, o) {
    s = s || this._nodes;
    const n = null;
    for (let r = s.length - 1; r >= 0; r--) {
      const a = s[r], u = a.titleMode === Z.NO_TITLE;
      if (a.isPointInside(t, e, o, u))
        return a;
    }
    return n;
  }
  /**
   * Returns the top-most group in that position
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @return the group or null
   */
  getGroupOnPos(t, e) {
    for (let s = this._groups.length - 1; s >= 0; s--) {
      const o = this._groups[s];
      if (o.isPointInside(t, e, 2, !0))
        return o;
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
      const s = this._nodes[e], o = h.registered_node_types[s.type];
      if (s.constructor === o.class)
        continue;
      console.log(`node being replaced by newer version: ${s.type}`);
      const n = h.createNode(s.type);
      t = !0, this._nodes[e] = n, n.configure(s.serialize()), n.graph = this, this._nodes_by_id[n.id] = n, s.inputs && (n.inputs = s.inputs.concat()), s.outputs && (n.outputs = s.outputs.concat());
    }
    return this.updateExecutionOrder(), t;
  }
  // ********** GLOBALS *****************
  onAction(t, e, s = {}) {
    for (const o of this.iterateNodesOfClass(V))
      if (o.properties.name === t) {
        o.actionDo(t, e, s);
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
    for (let n = 0, r = this._nodes.length; n < r; ++n)
      t.push(this._nodes[n].serialize());
    const e = [];
    for (const n in this.links) {
      let r = this.links[n];
      if (!r.serialize) {
        console.error(
          "weird LLink bug, link info is not a LLink but a regular object",
          r
        );
        const a = it.configure(r);
        for (const u in r)
          a[u] = r[u];
        this.links[n] = a, r = a;
      }
      e.push(r.serialize());
    }
    const s = [];
    for (let n = 0; n < this._groups.length; ++n)
      s.push(this._groups[n].serialize());
    const o = {
      last_node_id: this.last_node_id,
      last_link_id: this.last_link_id,
      nodes: t,
      links: e,
      groups: s,
      config: this.config,
      extra: this.extra,
      version: h.VERSION
    };
    return this.onSerialize && this.onSerialize(o), o;
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
      const n = [];
      for (let r = 0; r < t.links.length; ++r) {
        const a = t.links[r];
        if (!a) {
          console.warn("serialized graph link data contains errors, skipping.");
          continue;
        }
        const u = it.configure(a);
        n[u.id] = u;
      }
      t.links = n;
    }
    for (const n in t)
      n === "nodes" || n === "groups" || (this[n] = t[n]);
    let o = !1;
    if (this._nodes = [], s) {
      for (let n = 0, r = s.length; n < r; ++n) {
        const a = s[n];
        let u = h.createNode(a.type, a.title);
        u || (console.error(
          `Node not found or has errors: ${a.type}`
        ), u = new et(), u.last_serialization = a, u.has_errors = !0, o = !0), u.id = a.id, this.add(u, { addedBy: "configure", skipComputeOrder: !0 });
      }
      for (let n = 0, r = s.length; n < r; ++n) {
        const a = s[n], u = this.getNodeById(a.id);
        u && u.configure(a);
      }
    }
    if (this._groups.length = 0, t.groups)
      for (let n = 0; n < t.groups.length; ++n) {
        const r = new ct();
        r.configure(t.groups[n]), this.addGroup(r);
      }
    return this.updateExecutionOrder(), this.extra = t.extra || {}, this.onConfigure && this.onConfigure(t), this._version++, this.setDirtyCanvas(!0, !0), o;
  }
  load(t, e) {
    const s = this;
    if (t.constructor === File || t.constructor === Blob) {
      const n = new FileReader();
      n.addEventListener("load", (r) => {
        const a = JSON.parse(n.result);
        s.configure(a), e && e(a);
      }), n.readAsText(t);
      return;
    }
    const o = new XMLHttpRequest();
    o.open("GET", t, !0), o.send(null), o.onload = function(n) {
      if (o.status !== 200) {
        console.error("Error loading graph:", o.status, o.response);
        return;
      }
      const r = JSON.parse(o.response);
      s.configure(r), e && e(r);
    }, o.onerror = function(n) {
      console.error("Error loading graph:", n);
    };
  }
};
let kt = Ot;
kt.DEFAULT_SUPPORTED_TYPES = ["number", "string", "boolean"];
function It(t) {
  const e = { nodeIDs: {}, linkIDs: {} };
  for (const s of t.nodes) {
    const o = s.id, n = tt();
    if (s.id = n, e.nodeIDs[o] || e.nodeIDs[n])
      throw new Error(`New/old node UUID wasn't unique in changed map! ${o} ${n}`);
    e.nodeIDs[o] = n, e.nodeIDs[n] = o;
  }
  for (const s of t.links) {
    const o = s[0], n = tt();
    if (s[0] = n, e.linkIDs[o] || e.linkIDs[n])
      throw new Error(`New/old link UUID wasn't unique in changed map! ${o} ${n}`);
    e.linkIDs[o] = n, e.linkIDs[n] = o;
    const r = s[1], a = s[3];
    if (!e.nodeIDs[r])
      throw new Error(`Old node UUID not found in mapping! ${r}`);
    if (s[1] = e.nodeIDs[r], !e.nodeIDs[a])
      throw new Error(`Old node UUID not found in mapping! ${a}`);
    s[3] = e.nodeIDs[a];
  }
  for (const s of t.nodes) {
    for (const o of s.inputs)
      o.link && (o.link = e.linkIDs[o.link]);
    for (const o of s.outputs)
      o.links && (o.links = o.links.map((n) => e.linkIDs[n]));
  }
  for (const s of t.nodes)
    if (s.type === "graph/subgraph") {
      const o = It(s.subgraph);
      e.nodeIDs = { ...e.nodeIDs, ...o.nodeIDs }, e.linkIDs = { ...e.linkIDs, ...o.linkIDs };
    }
  return e;
}
function Bt(t, e) {
  for (const s of t.iterateNodesInOrderRecursive())
    s.onReassignID && s.onReassignID(e);
}
const wt = class extends et {
  constructor(t, e) {
    super(t), this.properties = {
      enabled: !0
    }, this.size = [140, 80], this.enabled = !0, this.subgraph = (e || wt.default_lgraph_factory)(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0;
    const s = (o, n) => {
      const r = n.bind(this);
      return function(...a) {
        o == null || o.apply(this, a), r(...a);
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
    const o = this;
    setTimeout(() => {
      s.openSubgraph(o.subgraph);
    }, 10);
  }
  onAction(t, e, s) {
    const { originNode: o, link: n } = s;
    if (!o || !n)
      return;
    const r = n.target_slot;
    this.getInnerGraphInputByIndex(r).triggerSlot(0, e);
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
  onDrawBackground(t, e, s, o) {
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
    var s, o;
    (s = this.graph) != null && s.onNodeAdded && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (o = this.graph) == null || o.onNodeAdded(t, e));
  }
  onSubgraphNodeRemoved(t, e) {
    var s, o;
    (s = this.graph) != null && s.onNodeRemoved && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (o = this.graph) == null || o.onNodeRemoved(t, e));
  }
  onSubgraphNewInput(t, e) {
    this.findInputSlotIndexByName(t) === -1 && this.addInput(t, e);
  }
  onSubgraphRenamedInput(t, e) {
    const s = this.findInputSlotIndexByName(t);
    if (s === -1)
      return;
    const o = this.getInputInfo(s);
    o.name = e;
  }
  onSubgraphTypeChangeInput(t, e, s) {
    const o = this.findInputSlotIndexByName(t);
    if (o === -1)
      return;
    const n = this.getInputInfo(o);
    n.type = s;
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
    const o = this.getOutputInfo(s);
    o.name = e;
  }
  onSubgraphTypeChangeOutput(t, e, s) {
    const o = this.findOutputSlotIndexByName(t);
    if (o === -1)
      return;
    const n = this.getOutputInfo(o);
    n.type = s;
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
    const t = et.prototype.serialize.call(this);
    return t.subgraph = this.subgraph.serialize(), t;
  }
  // no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()
  onConfigure(t) {
    super.onConfigure && super.onConfigure(t), this.subgraph._is_subgraph = !0, this.subgraph._subgraph_node = this;
    for (const e of this.subgraph.iterateNodesInOrder())
      (e.is(V) || e.is(j)) && (e.properties.subgraphID = this.id);
  }
  onReassignID() {
    for (const t of this.subgraph.iterateNodesInOrder())
      (t.is(V) || t.is(j)) && (t.properties.subgraphID = this.id);
  }
  clone(t = { forNode: {} }) {
    var n, r, a, u;
    const e = h.createNode(this.type), s = this.serialize();
    let o = null;
    if (h.use_uuids) {
      const l = h.cloneObject(s.subgraph);
      o = It(l), s.subgraph = l;
    }
    return delete s.id, delete s.inputs, delete s.outputs, e.configure(s), h.use_uuids && Bt(e.subgraph, o), (n = t.forNode)[r = this.id] || (n[r] = {}), t.forNode[this.id].subgraphNewIDMapping = o, (a = t.forNode)[u = e.id] || (a[u] = {}), t.forNode[e.id].subgraphNewIDMapping = o, e;
  }
  buildFromNodes(t) {
    var m, b;
    if (t = t.filter((v) => !v.is(V) && !v.is(j)), t.length === 0)
      return;
    const e = {}, s = {}, o = {}, n = t.reduce((v, O) => (v[O.id] = O, v), {});
    let r = Number.MAX_SAFE_INTEGER, a = 0, u = Number.MAX_SAFE_INTEGER, l = 0;
    for (const v of Object.values(t))
      r = Math.min(v.pos[0], r), a = Math.max(v.pos[0] + v.size[0], a), u = Math.min(v.pos[1], u), l = Math.max(v.pos[1] + v.size[1], l);
    const p = {};
    for (const v of t) {
      p[v.id] = v;
      for (let O = 0; O < v.inputs.length; O++) {
        const N = v.getInputLink(O);
        if (N) {
          const E = v.getConnectionPos(!0, O), G = v.getInputInfo(O), x = v.getInputNode(O);
          x && (p[x.id] = x), n[N.origin_id] !== null ? o[N.id] = [N, E] : e[N.id] = [N, E, G.name];
        }
      }
      for (let O = 0; O < v.outputs.length; O++) {
        const N = v.getOutputLinks(O);
        for (const E of N) {
          const G = v.getConnectionPos(!1, O), x = v.getOutputInfo(O), w = v.graph.getNodeById(E.target_id);
          w && (p[w.id] = w), n[E.target_id] !== null ? o[E.id] = [E, G] : s[E.id] = [E, G, x.name];
        }
      }
    }
    const f = Object.values(e), c = Object.values(s);
    f.sort((v, O) => v[1][1] - O[1][1]), c.sort((v, O) => v[1][1] - O[1][1]), h.debug && (console.debug("NODES", Object.keys(t)), console.debug("IN", Object.keys(e)), console.debug("OUT", Object.keys(s)), console.debug("INNER", Object.keys(o)));
    const g = {}, y = {};
    for (const v of t) {
      const O = [v.pos[0] - r, v.pos[1] - u], N = v.id;
      v.graph.remove(v, { removedBy: "moveIntoSubgraph" }), this.subgraph.add(v, { addedBy: "moveIntoSubgraph", prevNodeID: N }), v.pos = O, p[N] = v, p[v.id] = v;
    }
    let d = 0, _ = 0;
    for (const [v, O, N] of f) {
      let E = null;
      if (g[v.origin_id] && (E = g[v.origin_id][v.origin_slot]), !E && (E = this.addGraphInput(N, v.type, [-200, d]), d += E.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !E)) {
        console.error("Failed creating subgraph output pair!", v);
        continue;
      }
      const G = p[v.origin_id], x = p[v.target_id];
      G.connect(v.origin_slot, this, E.outerInputIndex), E.innerNode.connect(0, x, v.target_slot), g[m = v.origin_id] || (g[m] = {}), g[v.origin_id][v.origin_slot] = E;
    }
    for (const [v, O, N] of c) {
      let E = null;
      if (y[v.target_id] && (E = y[v.target_id][v.target_slot]), !E && (E = this.addGraphOutput(N, v.type, [a - r + 200, _]), _ += E.innerNode.size[1] + h.NODE_SLOT_HEIGHT, !E)) {
        console.error("Failed creating subgraph output pair!", v);
        continue;
      }
      const G = p[v.origin_id], x = p[v.target_id];
      G.connect(v.origin_slot, E.innerNode, 0), this.connect(E.outerOutputIndex, x, v.target_slot), y[b = v.target_id] || (y[b] = {}), y[v.target_id][v.origin_slot] = E;
    }
    for (const [v, O] of Object.values(o)) {
      const N = p[v.origin_id], E = p[v.target_id];
      N.connect(v.origin_slot, E, v.target_slot);
    }
  }
  addGraphInput(t, e, s) {
    t = this.getValidGraphInputName(t);
    const o = h.createNode(V);
    if (o === null)
      return null;
    let n = e;
    e === BuiltInSlotType.EVENT ? n = BuiltInSlotType.ACTION : e === BuiltInSlotType.ACTION && (e = BuiltInSlotType.EVENT), console.warn("[Subgraph] addGraphInput", t, e, n, s), o.setProperty("name", t), o.setProperty("type", e), o.properties.subgraphID = this.id, this.subgraph.add(o);
    const r = o.computeSize();
    s && (o.pos = [s[0] - r[0] * 0.5, s[1] - r[1] * 0.5]), this.subgraph.addInput(t, n, null);
    const a = this.inputs.length - 1, u = this.inputs[a];
    return { innerNode: o, outerInput: u, outerInputIndex: a };
  }
  addGraphOutput(t, e, s) {
    t = this.getValidGraphOutputName(t);
    const o = h.createNode(j);
    if (o === null)
      return null;
    let n = e;
    e === BuiltInSlotType.EVENT ? e = BuiltInSlotType.ACTION : e === BuiltInSlotType.ACTION && (n = BuiltInSlotType.EVENT), console.warn("[Subgraph] addGraphOutput", t, e, n, s), o.setProperty("name", t), o.setProperty("type", e), o.properties.subgraphID = this.id, this.subgraph.add(o);
    const r = o.computeSize();
    s && (o.pos = [s[0], s[1] - r[1] * 0.5]), this.subgraph.addOutput(t, n, null);
    const a = this.outputs.length - 1, u = this.outputs[a];
    return { innerNode: o, outerOutput: u, outerOutputIndex: a };
  }
  removeGraphInput(t) {
    if (this.findInputSlotIndexByName(t) === null) {
      console.error("[Subgraph] No input in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(V).filter((o) => o.properties.name === t);
    if (s.length > 0)
      for (const o of s)
        this.subgraph.remove(o);
    else {
      console.warn("[Subgraph] No GraphInputs found on input removal", t);
      const o = this.findInputSlotIndexByName(t);
      o !== -1 && this.removeInput(o);
    }
  }
  removeGraphOutput(t) {
    if (this.findOutputSlotIndexByName(t) === null) {
      console.error("[Subgraph] No output in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(j).filter((o) => o.properties.name === t);
    if (s.length > 0)
      for (const o of s)
        this.subgraph.remove(o);
    else {
      console.warn("[Subgraph] No GraphOutputs found on output removal", t);
      const o = this.findOutputSlotIndexByName(t);
      o !== -1 && this.removeOutput(o);
    }
  }
  getValidGraphInputName(t) {
    t || (t = "newInput");
    let e = t, s = this.getInnerGraphInput(e), o = 1;
    for (; s !== null; )
      e = `${t}_${o++}`, s = this.getInnerGraphInput(e);
    return e;
  }
  getValidGraphOutputName(t) {
    t || (t = "newOutput");
    let e = t, s = this.getInnerGraphOutput(e), o = 1;
    for (; s !== null; )
      e = `${t}_${o++}`, s = this.getInnerGraphOutput(e);
    return e;
  }
  getInnerGraphOutput(t) {
    return this.subgraph._nodes.find((s) => s.is(j) && s.properties.name === t) || null;
  }
  getInnerGraphInput(t) {
    return this.subgraph._nodes.find((s) => s.is(V) && s.properties.name === t) || null;
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
    if (t = t.filter((d) => !d.is(V) && !d.is(j)), t.length === 0)
      return;
    const e = this, s = e.graph;
    let o = Number.MAX_SAFE_INTEGER, n = 0, r = Number.MAX_SAFE_INTEGER, a = 0;
    for (const d of Object.values(t))
      o = Math.min(d.pos[0], o), n = Math.max(d.pos[0] + d.size[0], n), r = Math.min(d.pos[1], r), a = Math.max(d.pos[1] + d.size[1], a);
    const u = n - o, l = a - r, p = e.pos[0] + e.size[0] / 2 - u / 2, f = e.pos[1] + e.size[1] / 2 - l / 2, c = {}, g = {};
    for (const [d, _] of t.entries())
      g[_.id] = _;
    for (const d of t)
      for (const _ of d.iterateAllLinks()) {
        const m = _.target_id === d.id, b = d.getConnectionPos(m, m ? _.target_slot : _.origin_slot);
        g[_.origin_id] !== null && g[_.target_id] !== null && (c[_.id] = [_, b]);
      }
    const y = {};
    for (const [d, _] of t.entries()) {
      const m = [_.pos[0] - o + p, _.pos[1] - r + f], b = _.id;
      _.graph.remove(_, { removedBy: "moveOutOfSubgraph" }), s.add(_, { addedBy: "moveOutOfSubgraph", prevNodeID: b }), _.pos = m, y[b] = _;
    }
    for (const [d, _] of Object.values(c)) {
      const m = g[d.origin_id], b = g[d.target_id];
      m.connect(d.origin_slot, b, d.target_slot);
    }
    return y;
  }
  convertNodesToSubgraphInputs(t) {
    var u;
    if (t = t.filter((l) => !l.is(V) && !l.is(j)), t.length === 0)
      return;
    const e = ht(t, (l) => l.id), s = [], o = {}, n = this.subgraph;
    for (const l of t)
      for (const p of l.iterateAllLinks()) {
        if (e[p.origin_id] === null)
          throw new Error("Can't convert to input with an origin link outward");
        if (e[p.target_id] === null) {
          s.push(p);
          const f = [0, 0];
          l.getConnectionPos(!1, p.target_slot, f), o[l.id] = [[l.pos[0], l.pos[1]], f];
        }
      }
    const r = this.moveNodesToParentGraph(t), a = {};
    for (const l of s) {
      const p = n.getNodeById(l.target_id), f = p.getInputInfo(l.target_slot);
      a[u = l.origin_id] || (a[u] = {});
      let c = a[l.origin_id][l.origin_slot];
      if (c === null) {
        const y = this.getValidGraphInputName(f.name);
        c = this.addGraphInput(y, f.type), a[l.origin_id][l.origin_slot] = c;
        const [d, _] = o[l.origin_id], m = c.innerNode.pos, b = c.innerNode.computeSize(), v = c.innerNode.getConnectionPos(!0, 0), O = [c.innerNode.pos[0] - v[0], c.innerNode.pos[1] - v[1]], N = [_[0] + O[0] - b[0], _[1] + O[1]];
        console.warn("newPos", m, "size", c.innerNode.size, "connPos", _, "newConPos", v, "offset", O), c.innerNode.pos = N;
      }
      r[l.origin_id].connect(l.origin_slot, this, c.outerInputIndex), c.innerNode.connect(0, p, l.target_slot);
    }
  }
  convertNodesToSubgraphOutputs(t) {
    var u;
    if (t = t.filter((l) => !l.is(V) && !l.is(j)), t.length === 0)
      return;
    const e = ht(t, (l) => l.id), s = [], o = {}, n = this.subgraph;
    for (const l of t)
      for (const p of l.iterateAllLinks())
        if (e[p.origin_id] === null) {
          s.push(p);
          const f = [0, 0];
          l.getConnectionPos(!0, p.origin_slot, f), o[l.id] = [[l.pos[0], l.pos[1]], f];
        } else if (e[p.target_id] === null)
          throw new Error("Can't convert to input with an origin link outward");
    const r = this.moveNodesToParentGraph(t), a = {};
    for (const l of s) {
      const p = n.getNodeById(l.origin_id), f = p.getOutputInfo(l.origin_slot);
      a[u = l.target_id] || (a[u] = {});
      let c = a[l.target_id][l.target_slot];
      if (c === null) {
        c = this.addGraphOutput(name, f.type), a[l.target_id][l.target_slot] = c;
        const [y, d] = o[l.target_id], _ = c.innerNode.getConnectionPos(!0, 0), m = [c.innerNode.pos[0] - _[0], c.innerNode.pos[1] - _[1]], b = [d[0] + m[0], d[1] + m[1]];
        c.innerNode.pos = b;
      }
      const g = r[l.target_id];
      p.connect(l.origin_slot, c.innerNode, 0), this.connect(c.outerOutputIndex, g, l.target_slot);
    }
  }
};
let J = wt;
J.default_lgraph_factory = () => new kt();
J.slotLayout = {
  inputs: [],
  outputs: []
};
J.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
J.optionalSlots = {
  outputs: [
    { name: "enabled", type: "boolean" }
  ]
};
h.registerNodeType({
  class: J,
  title: "Subgraph",
  desc: "Graph inside a node",
  title_color: "#334",
  type: "graph/subgraph"
});
class C {
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(e = "", s, o, n, r = !1, a = null) {
    const u = this, l = document.createElement("div");
    if (l.is_modified = !1, l.className = "graphdialog rounded", r) {
      let E = 5;
      typeof s != "string" && (s = JSON.stringify(s, null, 2));
      const G = (s.match(/\n/g) || "").length + 1;
      E = dt(G, 5, 10), l.innerHTML = `
<span class='name'></span>
<textarea autofocus rows='${E}' cols='30' class='value'></textarea>
<button class='rounded'>OK</button>
`;
    } else
      l.innerHTML = `
<span class='name'></span>
<input autofocus type='text' class='value'/>
<button class='rounded'>OK</button>`;
    l.close = function() {
      u.prompt_box = null, l.parentNode && l.parentNode.removeChild(l);
    };
    const f = T.active_canvas.canvas;
    f.parentNode.appendChild(l), this.ds.scale > 1 && (l.style.transform = `scale(${this.ds.scale})`);
    let c = null, g = 0;
    h.pointerListenerAdd(l, "leave", (E) => {
      g || h.dialog_close_on_mouse_leave && !l.is_modified && h.dialog_close_on_mouse_leave && E.buttons === 0 && (c = setTimeout(l.close, h.dialog_close_on_mouse_leave_delay));
    }), h.pointerListenerAdd(l, "enter", (E) => {
      h.dialog_close_on_mouse_leave && c && clearTimeout(c);
    });
    const y = l.querySelectorAll("select");
    y && y.forEach((E) => {
      E.addEventListener("click", (G) => {
        g++;
      }), E.addEventListener("blur", (G) => {
        g = 0;
      }), E.addEventListener("change", (G) => {
        g = -1;
      });
    }), u.prompt_box && u.prompt_box.close(), u.prompt_box = l;
    const d = l.querySelector(".name");
    d.innerText = e;
    const _ = l.querySelector(".value");
    _.value = s;
    const m = _;
    if (m.addEventListener("keydown", function(E) {
      if (l.is_modified = !0, E.keyCode === 27)
        l.close();
      else if (E.keyCode === 13 && E.target instanceof Element && E.target.localName !== "textarea")
        o && o(this.value), l.close();
      else
        return;
      E.preventDefault(), E.stopPropagation();
    }), a)
      for (const [E, G] of Object.entries(a))
        m.style[E] = G;
    l.querySelector("button").addEventListener("click", (E) => {
      o && o(m.value), u.setDirty(!0), l.close();
    });
    const v = f.getBoundingClientRect();
    let O = -20, N = -20;
    return v && (O -= v.left, N -= v.top), n ? (l.style.left = `${n.clientX}px`, l.style.top = `${n.clientY}px`) : (l.style.left = `${f.width * 0.5 + O}px`, l.style.top = `${f.height * 0.5 + N}px`), console.warn(l.style.left, l.style.top), console.warn(n), setTimeout(() => {
      m.focus();
    }, 10), ft(l), l;
  }
  showSearchBox(e, s = {}) {
    const o = {
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
    s = Object.assign(o, s);
    const n = this, r = T.active_canvas, a = r.canvas, u = a.ownerDocument || document, l = e, p = document.createElement("div");
    p.className = "litegraph litesearchbox graphdialog rounded", p.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", s.do_type_filter && (p.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", p.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), p.innerHTML += "<div class='helper'></div>", u.fullscreenElement ? u.fullscreenElement.appendChild(p) : (u.body.appendChild(p), u.body.style.overflow = "hidden");
    let f = null, c = null;
    if (s.do_type_filter && (f = p.querySelector(".slot_in_type_filter"), c = p.querySelector(".slot_out_type_filter")), p.close = function() {
      n.search_box = null, this.blur(), a.focus(), u.body.style.overflow = "", setTimeout(() => {
        n.canvas.focus();
      }, 20), p.parentNode && p.parentNode.removeChild(p);
    }, this.ds.scale > 1 && (p.style.transform = `scale(${this.ds.scale})`), s.hide_on_mouse_leave) {
      let w = 0, P = null;
      h.pointerListenerAdd(p, "enter", (S) => {
        P && (clearTimeout(P), P = null);
      }), h.pointerListenerAdd(p, "leave", (S) => {
        w || (P = setTimeout(() => {
          p.close();
        }, 500));
      }), s.do_type_filter && (f.addEventListener("click", (S) => {
        w++;
      }), f.addEventListener("blur", (S) => {
        w = 0;
      }), f.addEventListener("change", (S) => {
        w = -1;
      }), c.addEventListener("click", (S) => {
        w++;
      }), c.addEventListener("blur", (S) => {
        w = 0;
      }), c.addEventListener("change", (S) => {
        w = -1;
      }));
    }
    n.search_box && n.search_box.close(), n.search_box = p;
    const g = p.querySelector(".helper");
    let y = null, d = null, _ = null;
    const m = (w) => {
      if (w)
        if (n.onSearchBoxSelection)
          n.onSearchBoxSelection(w, l, r);
        else {
          const P = h.searchbox_extras[w.toLowerCase()];
          P && (w = P.type), r.graph.beforeChange();
          const S = h.createNode(w);
          if (S && (S.pos = r.convertEventToCanvasOffset(
            l
          ), r.graph.add(S)), P && P.data) {
            if (P.data.properties)
              for (const I in P.data.properties)
                S.addProperty(`${I}`, P.data.properties[I]);
            if (P.data.inputs) {
              S.inputs = [];
              for (const I in P.data.inputs)
                S.addInput(
                  P.data.inputs[I][0],
                  P.data.inputs[I][1]
                );
            }
            if (P.data.outputs) {
              S.outputs = [];
              for (const I in P.data.outputs)
                S.addOutput(
                  P.data.outputs[I][0],
                  P.data.outputs[I][1]
                );
            }
            P.data.title && (S.title = P.data.title), P.data.json && S.configure(P.data.json);
          }
          if (s.node_from) {
            let I = null;
            switch (typeof s.slotFrom) {
              case "string":
                I = s.node_from.findOutputSlotIndexByName(s.slotFrom);
                break;
              case "object":
                s.slotFrom.name ? I = s.node_from.findOutputSlotIndexByName(s.slotFrom.name) : I = -1, I === -1 && typeof s.slotFrom.slot_index < "u" && (I = s.slotFrom.slot_index);
                break;
              case "number":
                I = s.slotFrom;
                break;
              default:
                I = 0;
            }
            I = I, typeof s.node_from.outputs[I] !== void 0 && I !== null && I > -1 && s.node_from.connectByTypeInput(I, S, s.node_from.outputs[I].type);
          }
          if (s.node_to) {
            let I = null;
            switch (typeof s.slotFrom) {
              case "string":
                I = s.node_to.findInputSlotIndexByName(s.slotFrom);
                break;
              case "number":
                I = s.slotFrom;
                break;
              default:
                I = 0;
            }
            typeof s.node_to.inputs[I] !== void 0 && I !== null && I > -1 && s.node_to.connectByTypeOutput(I, S, s.node_to.inputs[I].type);
          }
          r.graph.afterChange();
        }
      p.close();
    }, b = (w) => {
      const P = _;
      _ && _.classList.remove("selected"), _ ? (_ = w ? _.nextSibling : _.previousSibling, _ || (_ = P)) : _ = w ? g.childNodes[0] : g.childNodes[g.childNodes.length], _ && (_.classList.add("selected"), _.scrollIntoView({ block: "end", behavior: "smooth" }));
    }, v = (w, P, S, I, M, U = {}) => {
      const H = Object.assign({
        skipFilter: !1,
        inTypeOverride: null,
        outTypeOverride: null
      }, U), F = h.registered_node_types[w];
      if (F.hide_in_node_lists || P && F.filter !== P || (!s.show_all_if_empty || S) && !w.toLowerCase().includes(S))
        return !1;
      if (s.do_type_filter && !H.skipFilter) {
        const ot = w;
        let K = I == null ? void 0 : I.value;
        if (H.inTypeOverride !== null && (K = H.inTypeOverride), I && K && h.registered_slot_in_types[K] && h.registered_slot_in_types[K].nodes && h.registered_slot_in_types[K].nodes.includes(ot) === !1 || (K = M == null ? void 0 : M.value, H.outTypeOverride !== null && (K = H.outTypeOverride), M && K && h.registered_slot_out_types[K] && h.registered_slot_out_types[K].nodes && h.registered_slot_out_types[K].nodes.includes(ot) === !1))
          return !1;
      }
      return !0;
    }, O = () => {
      d = null;
      let w = N.value;
      if (y = null, g.innerHTML = "", !w && !s.show_all_if_empty)
        return;
      if (n.onSearchBox) {
        const S = n.onSearchBox(g, w, r);
        if (S)
          for (let I = 0; I < S.length; ++I)
            P(S[I]);
      } else {
        let S = 0;
        w = w.toLowerCase();
        const I = r.filter || r.graph.filter;
        let M, U;
        s.do_type_filter && n.search_box ? (M = n.search_box.querySelector(".slot_in_type_filter"), U = n.search_box.querySelector(".slot_out_type_filter")) : (M = null, U = null);
        for (const H in h.searchbox_extras) {
          const F = h.searchbox_extras[H];
          if ((!s.show_all_if_empty || w) && !F.desc.toLowerCase().includes(w))
            continue;
          const ot = h.registered_node_types[F.type];
          if (!(ot && ot.filter !== I) && v(F.type, I, w, M, U) && (P(F.desc, "searchbox_extra"), T.search_limit !== -1 && S++ > T.search_limit))
            break;
        }
        let nt = null;
        if (Array.prototype.filter)
          Object.keys(h.registered_node_types).filter((F) => v(F, I, w, M, U));
        else {
          nt = [];
          for (const H in h.registered_node_types)
            v(H, I, w, M, U) && nt.push(H);
        }
        for (let H = 0; H < nt.length && (P(nt[H]), !(T.search_limit !== -1 && S++ > T.search_limit)); H++)
          ;
        if (s.show_general_after_typefiltered && (M != null && M.value || U != null && U.value)) {
          const H = [];
          for (const F in h.registered_node_types)
            v(F, I, w, M, U, { inTypeOverride: M && M.value ? "*" : null, outTypeOverride: U && U.value ? "*" : null }) && H.push(F);
          for (let F = 0; F < H.length && (P(H[F], "generic_type"), !(T.search_limit !== -1 && S++ > T.search_limit)); F++)
            ;
        }
        if ((M != null && M.value || U != null && U.value) && (g == null ? void 0 : g.childNodes.length) === 0 && s.show_general_if_none_on_typefilter) {
          const H = [];
          for (const F in h.registered_node_types)
            v(F, I, w, M, U, { skipFilter: !0 }) && H.push(F);
          for (let F = 0; F < H.length && (P(H[F], "not_in_filter"), !(T.search_limit !== -1 && S++ > T.search_limit)); F++)
            ;
        }
      }
      function P(S, I) {
        const M = document.createElement("div");
        y || (y = S), M.innerText = S, M.dataset.type = escape(S), M.className = "litegraph lite-search-item", I && (M.className += ` ${I}`), M.addEventListener("click", function(U) {
          m(unescape(this.dataset.type));
        }), g.appendChild(M);
      }
    };
    let N = p.querySelector("input");
    if (N && (N.addEventListener("blur", function(w) {
      this.focus();
    }), N.addEventListener("keydown", (w) => {
      if (w.keyCode === 38)
        b(!1);
      else if (w.keyCode === 40)
        b(!0);
      else if (w.keyCode === 27)
        p.close();
      else if (w.keyCode === 13)
        _ ? m(_.innerHTML) : y ? m(y) : p.close();
      else {
        d && clearInterval(d), d = setTimeout(O, h.search_box_refresh_interval_ms);
        return;
      }
      return w.preventDefault(), w.stopPropagation(), w.stopImmediatePropagation(), !0;
    })), s.do_type_filter) {
      if (f) {
        const w = h.slot_types_in, P = w.length;
        (s.type_filter_in === k.EVENT || s.type_filter_in === k.ACTION) && (s.type_filter_in = "_event_");
        for (let S = 0; S < P; S++) {
          const I = document.createElement("option");
          I.value = w[S], I.innerHTML = w[S], f.appendChild(I), s.type_filter_in !== null && `${s.type_filter_in}`.toLowerCase() === `${w[S]}`.toLowerCase() && (I.selected = !0);
        }
        f.addEventListener("change", O);
      }
      if (c) {
        const w = h.slot_types_out, P = w.length;
        (s.type_filter_out === k.EVENT || s.type_filter_out === k.ACTION) && (s.type_filter_out = "_event_");
        for (let S = 0; S < P; S++) {
          const I = document.createElement("option");
          I.value = w[S], I.innerHTML = w[S], c.appendChild(I), s.type_filter_out !== null && `${s.type_filter_out}`.toLowerCase() === `${w[S]}`.toLowerCase() && (I.selected = !0);
        }
        c.addEventListener("change", O);
      }
    }
    const E = a.getBoundingClientRect(), G = (l ? l.clientX : E.left + E.width * 0.5) - 80, x = (l ? l.clientY : E.top + E.height * 0.5) - 20;
    return p.style.left = `${G}px`, p.style.top = `${x}px`, l.layerY > E.height - 200 && (g.style.maxHeight = `${E.height - l.layerY - 20}px`), N.focus(), s.show_all_on_open && O(), p;
  }
  showShowNodePanel(e) {
    this.closePanels();
    const s = this.getCanvasWindow(), o = this, n = this.createPanel(e.title || "", {
      closable: !0,
      window: s,
      onOpen() {
      },
      onClose() {
        o.node_panel = null;
      }
    });
    o.node_panel = n, n.id = "node-panel", n.node = e, n.classList.add("settings");
    function r() {
      n.content.innerHTML = "", n.addHTML(`<span class='node_type'>${e.type}</span><span class='node_desc'>${e.constructor.desc || ""}</span><span class='separator'></span>`), n.addHTML("<h3>Properties</h3>");
      const a = function(l, p) {
        switch (o.graph.beforeChange(e), l) {
          case "Title":
            e.title = p;
            break;
          case "Mode":
            const f = Object.values(Q).indexOf(p);
            f >= W.ALWAYS && Q[f] ? e.changeMode(f) : console.warn(`unexpected mode: ${p}`);
            break;
          case "Color":
            T.node_colors[p] ? (e.color = T.node_colors[p].color, e.bgcolor = T.node_colors[p].bgcolor) : console.warn(`unexpected color: ${p}`);
            break;
          default:
            e.setProperty(l, p);
            break;
        }
        o.graph.afterChange(), o.dirty_canvas = !0;
      };
      n.addWidget("string", "Title", e.title, {}, a), n.addWidget("combo", "Mode", Q[e.mode], { values: Q }, a);
      let u = "";
      e.color !== void 0 && (u = Object.keys(T.node_colors).filter((l) => T.node_colors[l].color === e.color)[0]), n.addWidget("combo", "Color", u, { values: Object.keys(T.node_colors) }, a);
      for (const l in e.properties) {
        const p = e.properties[l], f = e.getPropertyInfo(l);
        f.type, !(e.onAddPropertyToPanel && e.onAddPropertyToPanel(l, n)) && n.addWidget(f.widget || f.type, l, p, f, a);
      }
      n.addSeparator(), e.onShowCustomPanelInfo && e.onShowCustomPanelInfo(n), n.footer.innerHTML = "", n.addButton("Delete", () => {
        e.block_delete || (e.graph.remove(e), n.close());
      }).classList.add("delete");
    }
    n.inner_showCodePad = function(a) {
      n.classList.remove("settings"), n.classList.add("centered"), n.alt_content.innerHTML = "<textarea class='code'></textarea>";
      const u = n.alt_content.querySelector("textarea"), l = function() {
        n.toggleAltContent(!1), n.toggleFooterVisibility(!0), u.parentNode.removeChild(u), n.classList.add("settings"), n.classList.remove("centered"), r();
      };
      u.value = e.properties[a], u.addEventListener("keydown", (c) => {
        c.code === "Enter" && c.ctrlKey && (e.setProperty(a, u.value), l());
      }), n.toggleAltContent(!0), n.toggleFooterVisibility(!1), u.style.height = "calc(100% - 40px)";
      const p = n.addButton("Assign", () => {
        e.setProperty(a, u.value), l();
      });
      n.alt_content.appendChild(p);
      const f = n.addButton("Close", l);
      f.style.float = "right", n.alt_content.appendChild(f);
    }, r(), this.canvas.parentNode.appendChild(n);
  }
  showSubgraphPropertiesDialog(e) {
    console.log("showing subgraph properties dialog");
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const o = this.createPanel("Subgraph Inputs", { closable: !0, width: 500 });
    o.node = e, o.classList.add("subgraph_dialog");
    const n = e;
    if (!n.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function a() {
      if (o.clear(), e.inputs)
        for (let d = 0; d < e.inputs.length; ++d) {
          const _ = e.inputs[d];
          if (_.not_subgraph_input)
            continue;
          const m = `
<button class="delete">&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, b = o.addHTML(m, "subgraph_property");
          b.dataset.name = _.name, b.dataset.slot = `${d}`, b.querySelector(".name").innerText = _.name, b.querySelector(".type").innerText = X(_.type), b.querySelector(".delete").addEventListener("click", function(N) {
            const E = this.parentNode.dataset.name;
            n.removeGraphInput(E), a();
          });
          const v = b.querySelector(".move_up");
          v.disabled = d <= 0, v.addEventListener("click", function(N) {
            const E = +this.parentNode.dataset.slot;
            E < 0 || (n.moveInput(E, E - 1), a());
          });
          const O = b.querySelector(".move_down");
          O.disabled = d >= e.inputs.length - 1, O.addEventListener("click", function(N) {
            const E = +this.parentNode.dataset.slot;
            E > e.inputs.length - 1 || (n.moveInput(E, E + 1), a());
          });
        }
    }
    const u = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = o.addHTML(u, "subgraph_property extra", !0), p = l.querySelector(".name"), f = l.querySelector(".type"), c = l.querySelector("button");
    for (const d of Et()) {
      const _ = document.createElement("option");
      _.value = d, _.innerHTML = X(d), f.appendChild(_), d === "*" && (_.selected = !0);
    }
    const g = () => {
      const d = p.value;
      let _ = f.value;
      _ === "-1" ? _ = k.ACTION : _ === "-2" && (_ = k.EVENT), !(!d || e.findInputSlotIndexByName(d) !== -1) && (this.addGraphInputNode(e, d, _), p.value = "", f.value = "", a(), p.focus());
    }, y = (d) => {
      d.keyCode === 13 ? (g(), d.preventDefault()) : d.keyCode === 27 && (o.close(), d.preventDefault());
    };
    return c.addEventListener("click", g), p.addEventListener("keydown", y), f.addEventListener("keydown", y), a(), this.canvas.parentNode.appendChild(o), p.focus(), o;
  }
  showSubgraphPropertiesDialogRight(e) {
    const s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    const o = this.createPanel("Subgraph Outputs", { closable: !0, width: 500 });
    o.node = e, o.classList.add("subgraph_dialog");
    const n = e;
    if (!n.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function a() {
      if (o.clear(), e.outputs)
        for (let d = 0; d < e.outputs.length; ++d) {
          const _ = e.outputs[d];
          if (_.not_subgraph_output)
            continue;
          const m = `
<button>&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, b = o.addHTML(m, "subgraph_property");
          b.dataset.name = _.name, b.dataset.slot = `${d}`, b.querySelector(".name").innerText = _.name, b.querySelector(".type").innerText = X(_.type), b.querySelector("button").addEventListener("click", function(N) {
            const E = this.parentNode.dataset.name;
            n.removeGraphOutput(E), a();
          });
          const v = b.querySelector(".move_up");
          v.disabled = d <= 0, v.addEventListener("click", function(N) {
            const E = +this.parentNode.dataset.slot;
            E < 0 || (n.moveOutput(E, E - 1), a());
          });
          const O = b.querySelector(".move_down");
          O.disabled = d >= e.outputs.length - 1, O.addEventListener("click", function(N) {
            const E = +this.parentNode.dataset.slot;
            E > e.outputs.length - 1 || (n.moveOutput(E, E + 1), a());
          });
        }
    }
    const u = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = o.addHTML(u, "subgraph_property extra", !0), p = l.querySelector(".name"), f = l.querySelector(".type"), c = l.querySelector("button");
    for (const d of Nt()) {
      const _ = document.createElement("option");
      _.value = d, _.innerHTML = X(d), f.appendChild(_), d === "*" && (_.selected = !0);
    }
    const g = () => {
      const d = p.value;
      let _ = f.value;
      _ === "-1" ? _ = k.ACTION : _ === "-2" && (_ = k.EVENT), !(!d || e.findOutputSlotIndexByName(d) !== -1) && (this.addGraphOutputNode(e, d, _), p.value = "", f.value = "", a(), p.focus());
    }, y = (d) => {
      d.keyCode === 13 ? (g(), d.preventDefault()) : d.keyCode === 27 && (o.close(), d.preventDefault());
    };
    return c.addEventListener("click", g), p.addEventListener("keydown", y), f.addEventListener("keydown", y), a(), this.canvas.parentNode.appendChild(o), p.focus(), o;
  }
  showConnectionMenu(e = {}) {
    const s = e.nodeFrom && e.slotFrom, o = !s && e.nodeTo && e.slotTo;
    if (!s && !o)
      return console.warn("No data passed to showConnectionMenu"), !1;
    const n = s ? e.nodeFrom : e.nodeTo, r = s ? e.slotFrom : e.slotTo;
    let a, u = null;
    switch (typeof r) {
      case "string":
        u = s ? n.findOutputSlotIndexByName(r) : n.findInputSlotIndexByName(r), a = s ? n.outputs[r] : n.inputs[r];
        break;
      case "object":
        a = r, u = s ? n.findOutputSlotIndexByName(a.name) : n.findInputSlotIndexByName(a.name);
        break;
      case "number":
        u = r, a = s ? n.outputs[u] : n.inputs[u];
        break;
      default:
        return console.error("Can't get slot information", r), !1;
    }
    const l = [{ content: "Add Node" }, Y.SEPARATOR];
    n.graph._is_subgraph && (s ? l.push({ content: "Add Subgraph Output" }) : l.push({ content: "Add Subgraph Input" }), l.push(Y.SEPARATOR)), this.allow_searchbox && (l.push({ content: "Search" }), l.push(Y.SEPARATOR));
    const p = a.type === k.EVENT ? "_event_" : a.type, f = s ? h.slot_types_default_out : h.slot_types_default_in, c = f[p];
    if (console.warn("FROMSL", f, c), f && f[p])
      if (Array.isArray(c))
        for (const b of c) {
          const v = typeof b == "string" ? b : (b == null ? void 0 : b.title) || (b == null ? void 0 : b.node);
          l.push({ content: v, value: b });
        }
      else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${c}`);
    const g = (b) => {
      const v = n.graph._subgraph_node, O = [b.canvasX, b.canvasY];
      v.addGraphInput(a.name, a.type, O).innerNode.connect(0, n, u);
    }, y = (b) => {
      const v = n.graph._subgraph_node, O = [b.canvasX, b.canvasY], N = v.addGraphOutput(a.name, a.type, O);
      n.connect(u, N.innerNode, 0);
    }, d = (b) => {
      const v = Object.assign(e, {
        position: [e.e.canvasX, e.e.canvasY]
      });
      this.createDefaultNodeForSlot(b, v) ? console.log("node created", b) : console.error("node not in defaults", b);
    }, _ = (b, v, O) => {
      switch (b.content) {
        case "Add Node":
          T.onMenuAdd(b, v, O, m, (N) => {
            s ? e.nodeFrom.connectByTypeInput(u, N, p) : e.nodeTo.connectByTypeOutput(u, N, p);
          });
          break;
        case "Add Subgraph Input":
          g(this.adjustMouseEvent(O));
          break;
        case "Add Subgraph Output":
          y(this.adjustMouseEvent(O));
          break;
        case "Search":
          s ? this.showSearchBox(O, { node_from: e.nodeFrom, slotFrom: a, type_filter_in: p }) : this.showSearchBox(O, { node_to: e.nodeTo, slotFrom: a, type_filter_out: p });
          break;
        default:
          d(b.value);
          break;
      }
    };
    let m = new z(l, {
      event: e.e,
      title: (a && a.name !== "" ? a.name + (p ? " | " : "") : "") + (a && p ? p : ""),
      callback: _
    });
    return !1;
  }
  getLinkMenuOptions(e) {
    const s = this.graph.getNodeById(e.origin_id), o = this.graph.getNodeById(e.target_id);
    let n = null;
    s && s.outputs && s.outputs[e.origin_slot] && (n = s.outputs[e.origin_slot].type);
    let r = null;
    o && o.outputs && o.outputs[e.target_slot] && (r = o.inputs[e.target_slot].type);
    const a = (f) => {
      console.debug("node autoconnect"), !(!f.inputs || !f.inputs.length || !f.outputs || !f.outputs.length) && s.connectByTypeInput(e.origin_slot, f, n) && (f.connectByTypeInput(e.target_slot, o, r), f.pos[0] -= f.size[0] * 0.5);
    }, u = (f, c, g, y, d) => {
      T.onMenuAdd(f, c, g, y, a);
    }, l = () => {
      this.graph.removeLink(e.id);
    };
    let p = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: u
      },
      Y.SEPARATOR,
      {
        content: "Delete",
        has_submenu: !0,
        callback: l
      },
      Y.SEPARATOR
    ];
    return this.graph.onGetLinkMenuOptions && (p = this.graph.onGetLinkMenuOptions(p, e)), s.getExtraLinkOptions && (p = s.getExtraLinkOptions(this, e, B.OUTPUT, p)), o.getExtraLinkOptions && (p = o.getExtraLinkOptions(this, e, B.INPUT, p)), p;
  }
  showLinkMenu(e, s) {
    const o = this.getLinkMenuOptions(e);
    return new z(o, {
      event: s,
      title: e.data !== null ? e.data.constructor.name : null,
      extra: e
    }), !1;
  }
  /*
     * Shows a popup for editing one of the LGraphNode.properties.
     */
  showEditPropertyValue(e, s, o = {}) {
    if (!e || e.properties[s] === void 0 || h.ignore_all_widget_events)
      return;
    const n = e.getPropertyInfo(s), r = n.type;
    let a = "";
    if (r === "string" || r === "number" || r === "array" || r === "object")
      if (n.multiline) {
        let y = e.properties[s], d = 5;
        if (r !== "string") {
          y = JSON.stringify(y, null, 2);
          const _ = (y.match(/\n/g) || "").length + 1;
          d = dt(_, 5, 10);
        }
        a = `<textarea autofocus type='text' rows='${d}' cols='30' class='value'>${y || ""}</textarea>`;
      } else
        a = "<input autofocus type='text' class='value'/>";
    else if ((r === "enum" || r === "combo") && n.values) {
      a = "<select autofocus type='text' class='value'>";
      for (const y in n.values) {
        let d = y;
        Array.isArray(n.values) && (d = n.values[y]), a += `<option value='${d}' ${d === e.properties[s] ? "selected" : ""}>${n.values[y]}</option>`;
      }
      a += "</select>";
    } else if (r === "boolean" || r === "toggle")
      a = `<input autofocus type='checkbox' class='value' ${e.properties[s] ? "checked" : ""}/>`;
    else {
      console.warn(`unknown type: ${r}`);
      return;
    }
    const u = this.createDialog(
      `<span class='name'>${n.label ? n.label : s}</span>${a}<button>OK</button>`,
      o
    );
    let l = null;
    if ((r === "enum" || r === "combo") && n.values)
      l = u.querySelector("select"), l.addEventListener("change", (y) => {
        u.modified(), c(y.target.value);
      });
    else if (r === "boolean" || r === "toggle")
      l = u.querySelector("input"), l && l.addEventListener("click", (y) => {
        u.modified(), c(!!l.checked);
      });
    else if (n.multiline ? l = u.querySelector("textarea") : l = u.querySelector("input"), l) {
      l.addEventListener("blur", function(d) {
        this.focus();
      });
      let y = e.properties[s] !== void 0 ? e.properties[s] : "";
      if (r !== "string") {
        let d = null;
        n.multiline && (d = 2), y = JSON.stringify(y, null, d);
      }
      if (l.value = y, l.addEventListener("keydown", (d) => {
        let _ = !1;
        d.keyCode === 27 ? (u.close(), _ = !0) : d.keyCode === 13 && !n.multiline ? (f(), _ = !0) : d.keyCode !== 13 && u.modified(), _ && (d.preventDefault(), d.stopPropagation());
      }), n.inputStyle)
        for (const [d, _] of Object.entries(n.inputStyle))
          l.style[d] = _;
    }
    l && l.focus();
    const p = () => {
      o.onclose && o.onclose(), u.close(), e.setDirtyCanvas(!0, !0);
    }, f = () => {
      r !== "boolean" && r !== "toggle" ? c(l.value) : p();
    }, c = (y) => {
      n && n.values && n.values.constructor === Object && n.values[y] !== void 0 && (y = n.values[y]), typeof e.properties[s] == "number" && (y = Number(y)), (r === "array" || r === "object") && (y = JSON.parse(y)), e.setProperty(s, y), p();
    };
    return u.querySelector("button").addEventListener("click", f), ft(u), u;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(e, s = { checkForInput: !1, closeOnLeave: !0, closeOnLeave_checkModified: !0 }) {
    const o = document.createElement("div");
    o.className = "graphdialog", o.innerHTML = e, o.is_modified = !1;
    const n = this.canvas.getBoundingClientRect();
    let r = -20, a = -20;
    if (n && (r -= n.left, a -= n.top), s.position ? (r = s.position[0], a = s.position[1]) : s.event ? (r = s.event.clientX, a = s.event.clientY) : (r += this.canvas.width * 0.5, a += this.canvas.height * 0.5), o.style.left = `${r}px`, o.style.top = `${a}px`, this.canvas.parentNode.appendChild(o), s.checkForInput) {
      const f = o.querySelectorAll("input");
      f && f.forEach((c) => {
        c.addEventListener("keydown", (g) => {
          if (o.modified(), g.keyCode === 27)
            o.close();
          else if (g.keyCode !== 13)
            return;
          g.preventDefault(), g.stopPropagation();
        }), c.focus();
      });
    }
    o.modified = function() {
      o.is_modified = !0;
    }, o.close = function() {
      o.parentNode && o.parentNode.removeChild(o);
    };
    let u = null, l = 0;
    o.addEventListener("mouseleave", (f) => {
      l || (s.closeOnLeave || h.dialog_close_on_mouse_leave) && !o.is_modified && h.dialog_close_on_mouse_leave && f.buttons === 0 && (u = setTimeout(o.close, h.dialog_close_on_mouse_leave_delay));
    }), o.addEventListener("mouseenter", (f) => {
      (s.closeOnLeave || h.dialog_close_on_mouse_leave) && u && clearTimeout(u);
    });
    const p = o.querySelectorAll("select");
    return p && p.forEach((f) => {
      f.addEventListener("click", (c) => {
        l++;
      }), f.addEventListener("blur", (c) => {
        l = 0;
      }), f.addEventListener("change", (c) => {
        l = -1;
      });
    }), o;
  }
  getCanvasMenuOptions() {
    let e = null;
    if (this.getMenuOptions ? e = this.getMenuOptions(this) : (e = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: T.onMenuAdd
      },
      { content: "Add Group", callback: T.onGroupAdd }
      // { content: "Arrange", callback: that.graph.arrange },
      // {content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], this._graph_stack && this._graph_stack.length > 0 && e.push(Y.SEPARATOR, {
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
        callback: T.showMenuNodeOptionalInputs
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: T.showMenuNodeOptionalOutputs
      },
      Y.SEPARATOR,
      {
        content: "Properties",
        has_submenu: !0,
        disabled: h.ignore_all_widget_events,
        callback: T.onShowMenuNodeProperties
      },
      Y.SEPARATOR,
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: T.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: T.onMenuNodeMode
      }
    ], e.resizable !== !1 && s.push({
      content: "Resize",
      callback: T.onMenuResizeNode
    }), s.push(
      {
        content: "Collapse",
        callback: T.onMenuNodeCollapse
      },
      { content: "Pin", callback: T.onMenuNodePin },
      {
        content: "Colors",
        has_submenu: !0,
        callback: T.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: T.onMenuNodeShapes
      },
      Y.SEPARATOR
    ));
    const o = e.getOptionalSlots();
    if (o && (o.inputs && o.inputs.length > 0 && typeof s[0] == "object" && (s[0].disabled = !1), o.outputs && o.outputs.length && typeof s[1] == "object" && (s[1].disabled = !1)), e.getExtraMenuOptions) {
      const r = e.getExtraMenuOptions(this, s);
      r && (r.push(Y.SEPARATOR), s = r.concat(s));
    }
    e.clonable !== !1 && s.push({
      content: "Clone",
      callback: T.onMenuNodeClone
    }), s.push({
      content: "To Subgraph",
      callback: T.onMenuNodeToSubgraph
    });
    let n = Object.values(this.selected_nodes || {});
    if (n.length || (n = [e]), n = n.filter((r) => !r.is(V) && !r.is(j)), s.push({
      content: "To Parent Graph",
      disabled: !e.graph._is_subgraph || n.length === 0,
      callback: T.onMenuNodeToParentGraph
    }), e.graph._is_subgraph) {
      const r = (p) => {
        let f = 0;
        const c = ht(p, (g) => g.id);
        for (const g of p)
          for (const y of g.iterateAllLinks()) {
            if (c[y.origin_id] === null)
              return 0;
            c[y.target_id] === null && (f += 1);
          }
        return f;
      }, a = (p) => {
        let f = 0;
        const c = ht(p, (g) => g.id);
        for (const g of p)
          for (const y of g.iterateAllLinks())
            if (c[y.origin_id] === null)
              f += 1;
            else if (c[y.target_id] === null)
              return 0;
        return f;
      }, u = r(n);
      s.push({
        content: `To Subgraph Input${u > 1 ? "s" : ""}`,
        disabled: u === 0,
        callback: T.onMenuNodeToSubgraphInputs
      });
      const l = a(n);
      s.push({
        content: `To Subgraph Output${l > 1 ? "s" : ""}`,
        disabled: l === 0,
        callback: T.onMenuNodeToSubgraphOutputs
      });
    }
    return s.push(Y.SEPARATOR, {
      content: "Remove",
      disabled: !(e.removable !== !1 && !e.block_delete),
      callback: T.onMenuNodeRemove
    }), e.graph && e.graph.onGetNodeMenuOptions && (s = e.graph.onGetNodeMenuOptions(s, e)), s;
  }
  getGroupMenuOptions(e) {
    return [
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: T.onShowPropertyEditor
      },
      {
        content: "Color",
        has_submenu: !0,
        callback: T.onMenuNodeColors
      },
      {
        content: "Font size",
        value: { name: "fontSize", type: "number" },
        callback: T.onShowPropertyEditor
      },
      Y.SEPARATOR,
      { content: "Remove", callback: T.onMenuNodeRemove }
    ];
  }
  /** Called when mouse right click */
  processContextMenu(e, s) {
    const n = T.active_canvas.getCanvasWindow(), r = s;
    let a = null, u = null, l = null;
    e !== null && (l = e.item, e.type === "node" && (a = e.item), e.type === "link" && (u = e.item));
    let p = null;
    const f = {
      event: r,
      extra: l
    };
    a !== null && (f.title = a.type);
    let c = null;
    a !== null && (c = a.getSlotInPosition(r.canvasX, r.canvasY), T.active_node = a);
    const g = (_) => {
      const m = _.slot;
      a.graph.beforeChange(), m.input ? a.removeInput(m.slot) : m.output && a.removeOutput(m.slot), a.graph.afterChange();
    }, y = (_) => {
      const m = _.slot;
      a.graph.beforeChange(), m.output ? a.disconnectOutput(m.slot) : m.input && a.disconnectInput(m.slot), a.graph.afterChange();
    }, d = (_) => {
      const m = _.slot, b = m.input ? a.getInputInfo(m.slot) : a.getOutputInfo(m.slot), v = this.createDialog(
        "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
        f
      ), O = v.querySelector("input");
      O && b && (O.value = b.label || "");
      const N = () => {
        a.graph.beforeChange(), O.value && (b && (b.label = O.value), this.setDirty(!0)), v.close(), a.graph.afterChange();
      };
      v.querySelector("button").addEventListener("click", N), O.addEventListener("keydown", (E) => {
        if (v.is_modified = !0, E.keyCode === 27)
          v.close();
        else if (E.keyCode === 13)
          N();
        else if (E.keyCode !== 13 && E.target instanceof Element && E.target.localName !== "textarea")
          return;
        E.preventDefault(), E.stopPropagation();
      }), O.focus();
    };
    if (c) {
      if (p = [], a.getSlotMenuOptions)
        p = a.getSlotMenuOptions(c);
      else {
        c && c.output && c.output.links && c.output.links.length && p.push({ content: "Disconnect Links", slot: c, callback: y });
        const m = c.input || c.output;
        m.removable && p.push(
          m.locked ? "Cannot remove" : { content: "Remove Slot", slot: c, callback: g }
        ), m.nameLocked || p.push({ content: "Rename Slot", slot: c, callback: d });
      }
      const _ = (c.input ? c.input.type : c.output.type) || "*";
      f.title = X(_);
    } else if (a)
      p = this.getNodeMenuOptions(a);
    else if (u)
      p = this.getLinkMenuOptions(u);
    else {
      p = this.getCanvasMenuOptions();
      const _ = this.graph.getGroupOnPos(
        r.canvasX,
        r.canvasY
      );
      _ && p.push(Y.SEPARATOR, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: _,
          options: this.getGroupMenuOptions(_)
        }
      });
    }
    p && new z(p, f, n);
  }
  createPanel(e, s = {}) {
    const o = s.window || window, n = document.createElement("div");
    if (n.className = "litegraph dialog", n.innerHTML = `
<div class='dialog-header'><span class='dialog-title'></span></div>
<div class='dialog-content'></div>
<div style='display:none;' class='dialog-alt-content'></div>
<div class='dialog-footer'></div>`, n.header = n.querySelector(".dialog-header"), s.width && (n.style.width = s.width + (s.width.constructor === Number ? "px" : "")), s.height && (n.style.height = s.height + (s.height.constructor === Number ? "px" : "")), s.closable) {
      const r = document.createElement("span");
      r.innerHTML = "&#10005;", r.classList.add("close"), r.addEventListener("click", () => {
        n.close();
      }), n.header.appendChild(r);
    }
    return s.onOpen && (n.onOpen = s.onOpen), s.onClose && (n.onClose = s.onClose), n.title_element = n.querySelector(".dialog-title"), n.title_element.innerText = e, n.content = n.querySelector(".dialog-content"), n.alt_content = n.querySelector(".dialog-alt-content"), n.footer = n.querySelector(".dialog-footer"), n.close = function() {
      n.onClose && typeof n.onClose == "function" && n.onClose(), n.parentNode && n.parentNode.removeChild(n), this.parentNode && this.parentNode.removeChild(this);
    }, n.toggleAltContent = function(r = !1) {
      typeof r < "u" || (n.alt_content.style.display, n.alt_content.style.display), n.alt_content.style.display = vTo, n.content.style.display = vAlt;
    }, n.toggleFooterVisibility = function(r = !1) {
      let a;
      typeof r < "u" ? a = r ? "block" : "none" : a = n.footer.style.display !== "block" ? "block" : "none", n.footer.style.display = a;
    }, n.clear = function() {
      this.content.innerHTML = "";
    }, n.addHTML = function(r, a, u) {
      const l = document.createElement("div");
      return a && (l.className = a), l.innerHTML = r, u ? n.footer.appendChild(l) : n.content.appendChild(l), l;
    }, n.addButton = function(r, a, u) {
      const l = document.createElement("button");
      return l.innerText = r, l.options = u, l.classList.add("btn"), l.addEventListener("click", a), n.footer.appendChild(l), l;
    }, n.addSeparator = function() {
      const r = document.createElement("div");
      return r.className = "separator", n.content.appendChild(r), r;
    }, n.addWidget = function(r, a, u, l = {}, p) {
      let f = String(u);
      r = r.toLowerCase(), r === "number" && (f = u.toFixed(3));
      const c = document.createElement("div");
      c.className = "property", c.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      const g = c.querySelector(".property_name");
      g.innerText = l.label || a;
      const y = c.querySelector(".property_value");
      if (y.innerText = f, c.dataset.property = a, c.dataset.type = l.type || r, c.options = l, c.value = u, r === "code")
        c.addEventListener("click", function(_) {
          n.inner_showCodePad(this.dataset.property);
        });
      else if (r === "boolean")
        c.classList.add("boolean"), u && c.classList.add("bool-on"), c.addEventListener("click", function() {
          const _ = this.dataset.property;
          this.value = !this.value, this.classList.toggle("bool-on");
          const m = this.querySelector(".property_value");
          m.innerText = this.value ? "true" : "false", d(_, this.value);
        });
      else if (r === "string" || r === "number")
        y.setAttribute("contenteditable", "true"), y.addEventListener("keydown", function(_) {
          _.code === "Enter" && (r !== "string" || !_.shiftKey) && (_.preventDefault(), this.blur());
        }), y.addEventListener("blur", function() {
          let _ = this.innerText;
          const m = this.parentNode, b = m.dataset.property;
          m.dataset.type === "number" && (_ = Number(_)), d(b, _);
        });
      else if ((r === "enum" || r === "combo") && "values" in l) {
        const _ = T.getPropertyPrintableValue(u, l.values);
        y.innerText = _, y.addEventListener("click", function(m) {
          let b = l.values || [];
          typeof b == "function" && (console.error("Values by callback not supported in panel.addWidget!", b), b = []);
          const O = this.parentNode.dataset.property, N = this, E = Array.from(b).map((x) => ({ content: x }));
          new z(E, {
            event: m,
            className: "dark",
            callback: G
          }, o);
          function G(x, w, P) {
            return N.innerText = x.content, d(O, x.content), !1;
          }
        });
      }
      n.content.appendChild(c);
      function d(_, m) {
        l.callback && l.callback(_, m, l), p && p(_, m, l);
      }
      return c;
    }, n.onOpen && typeof n.onOpen == "function" && n.onOpen(), n;
  }
  checkPanels() {
    if (!this.canvas)
      return;
    const e = this.canvas.parentNode.querySelectorAll(".litegraph.dialog");
    for (let s = 0; s < e.length; ++s) {
      const o = e[s];
      if (o.node && (o.node.graph || o.close(), o.node.graph !== this.graph)) {
        if (o.node.is(J) && this.graph._is_subgraph && this.graph === o.node.subgraph)
          continue;
        o.close();
      }
    }
  }
  closePanels() {
    let e = document.querySelector("#node-panel");
    e && e.close(), e = document.querySelector("#option-panel"), e && e.close();
  }
}
C.onShowPropertyEditor = function(t, e, s, o, n) {
  const r = t.value;
  console.log(r);
  const a = r.name, u = n[a], l = document.createElement("div");
  l.is_modified = !1, l.className = "graphdialog", l.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", l.close = function() {
    l.parentNode && l.parentNode.removeChild(l);
  };
  const p = l.querySelector(".name");
  p.innerText = a;
  const f = l.querySelector(".value");
  if (f && (f.value = u, f.addEventListener("blur", function(N) {
    this.focus();
  }), f.addEventListener("keydown", (N) => {
    if (l.is_modified = !0, N.keyCode === 27)
      l.close();
    else if (N.keyCode === 13)
      m();
    else if (N.keyCode !== 13 && N.target instanceof Element && N.target.localName !== "textarea")
      return;
    N.preventDefault(), N.stopPropagation();
  }), r.inputStyle))
    for (const [N, E] of Object.entries(r.inputStyle))
      f.style[N] = E;
  const g = T.active_canvas.canvas, y = g.getBoundingClientRect();
  let d = -20, _ = -20;
  y && (d -= y.left, _ -= y.top), s ? (l.style.left = `${s.clientX + d}px`, l.style.top = `${s.clientY + _}px`) : (l.style.left = `${g.width * 0.5 + d}px`, l.style.top = `${g.height * 0.5 + _}px`);
  const m = () => {
    f && b(f.value);
  }, b = (N) => {
    r.type === "number" ? N = Number(N) : r.type === "boolean" && (N = !!N);
    const E = n[a];
    n[a] = N, n.onJSPropertyChanged && n.onJSPropertyChanged(a, N, E) === !1 && (n[a] = E), l.parentNode && l.parentNode.removeChild(l), n.setDirtyCanvas(!0, !0);
  };
  l.querySelector("button").addEventListener("click", m), g.parentNode.appendChild(l), f && f.focus();
  let O = null;
  l.addEventListener("mouseleave", (N) => {
    h.dialog_close_on_mouse_leave && !l.is_modified && h.dialog_close_on_mouse_leave && N.buttons === 0 && (O = setTimeout(l.close, h.dialog_close_on_mouse_leave_delay));
  }), l.addEventListener("mouseenter", (N) => {
    h.dialog_close_on_mouse_leave && O && clearTimeout(O);
  }), ft(l);
};
C.onGroupAdd = function(t, e, s, o) {
  const n = T.active_canvas;
  n.getCanvasWindow();
  const r = new ct();
  r.pos = n.convertEventToCanvasOffset(s), n.graph.addGroup(r);
};
C.onMenuAdd = function(t, e, s, o, n) {
  const r = T.active_canvas, a = r.getCanvasWindow(), u = r.graph;
  if (!u)
    return;
  function l(p, f) {
    const c = h.getNodeTypesCategories(r.filter || u.filter).filter((d) => d.startsWith(p)), g = [];
    c.map((d) => {
      if (!d)
        return;
      const _ = new RegExp(`^(${p})`), m = d.replace(_, "").split("/")[0], b = p === "" ? `${m}/` : `${p + m}/`;
      let v = m;
      v.includes("::") && (v = v.split("::")[1]), g.findIndex((N) => N.value === b) === -1 && g.push(
        {
          value: b,
          content: v,
          has_submenu: !0,
          callback(N, E, G, x) {
            l(N.value, x);
          }
        }
      );
    }), h.getNodeTypesInCategory(p.slice(0, -1), r.filter || u.filter).map((d) => {
      if (d.hide_in_node_lists)
        return;
      const _ = {
        value: d.class,
        content: d.title,
        has_submenu: !1,
        callback(m, b, v, O) {
          const N = O.getFirstEvent();
          r.graph.beforeChange();
          const E = h.createNode(m.value);
          E && (E.pos = r.convertEventToCanvasOffset(N), r.graph.add(E)), n && n(E), r.graph.afterChange();
        }
      };
      g.push(_);
    }), new z(g, { event: s, parentMenu: f }, a);
  }
  return l("", o), !1;
};
C.showMenuNodeOptionalInputs = function(t, e, s, o, n) {
  if (!n)
    return;
  const r = this, u = T.active_canvas.getCanvasWindow(), l = n.getOptionalSlots().inputs;
  let p = [];
  if (l)
    for (let c = 0; c < l.length; c++) {
      const g = l[c];
      if (!g) {
        p.push(Y.SEPARATOR);
        continue;
      }
      let { name: y, type: d, options: _ } = g;
      _ || (_ = {}), _.label && (y = _.label), _.removable = !0;
      const m = { content: y, value: g };
      d === k.ACTION && (m.className = "event"), p.push(m);
    }
  if (n.onMenuNodeInputs) {
    const c = n.onMenuNodeInputs(p);
    c && (p = c);
  }
  if (!p.length) {
    console.log("no input entries");
    return;
  }
  new z(
    p,
    {
      event: s,
      callback: f,
      parentMenu: o,
      node: n
    },
    u
  );
  function f(c, g, y, d) {
    if (n && (c.callback && c.callback.call(r, n, c, y, d), c.value)) {
      const _ = c.value;
      n.graph.beforeChange(), n.addInput(_.name, _.type, _.options), n.onNodeOptionalInputAdd && n.onNodeOptionalInputAdd(c.value), n.setDirtyCanvas(!0, !0), n.graph.afterChange();
    }
  }
  return !1;
};
C.showMenuNodeOptionalOutputs = function(t, e, s, o, n) {
  if (!n)
    return;
  const r = this, u = T.active_canvas.getCanvasWindow(), l = n.getOptionalSlots().outputs;
  let p = [];
  if (l)
    for (let c = 0; c < l.length; c++) {
      const g = l[c];
      if (!g) {
        p.push(Y.SEPARATOR);
        continue;
      }
      let { name: y, type: d, options: _ } = g;
      if (n.flags && n.flags.skip_repeated_outputs && n.findOutputSlotIndexByName(g[0]) !== -1)
        continue;
      _ || (_ = {}), _.label && (y = _.label), _.removable = !0;
      const m = { content: y, value: [y, d, _] };
      d === k.EVENT && (m.className = "event"), p.push(m);
    }
  if (this.onMenuNodeOutputs && (p = this.onMenuNodeOutputs(p)), h.do_add_triggers_slots && n.findOutputSlotIndexByName("onExecuted") === -1 && p.push({ content: "On Executed", value: ["onExecuted", k.EVENT, { nameLocked: !0 }], className: "event" }), n.onMenuNodeOutputs) {
    const c = n.onMenuNodeOutputs(p);
    c && (p = c);
  }
  if (!p.length)
    return;
  const f = function(c, g, y, d) {
    if (!n || (c.callback && c.callback.call(r, n, c, y, d), !c.value))
      return;
    const _ = c.value[1];
    if (_ && (_.constructor === Object || _.constructor === Array)) {
      const m = [];
      for (const b in _)
        m.push({ content: b, value: _[b] });
      return new z(m, {
        event: y,
        callback: f,
        parentMenu: o,
        node: n
      }), !1;
    } else {
      const m = c.value;
      n.graph.beforeChange(), n.addOutput(m.name, m.type, m.options), n.onNodeOptionalOutputAdd && n.onNodeOptionalOutputAdd(c.value), n.setDirtyCanvas(!0, !0), n.graph.afterChange();
    }
  };
  return new z(
    p,
    {
      event: s,
      callback: f,
      parentMenu: o,
      node: n
    },
    u
  ), !1;
};
C.onMenuResizeNode = function(t, e, s, o, n) {
  if (!n)
    return;
  const r = function(u) {
    u.size = u.computeSize(), u.onResize && u.onResize(u.size);
  }, a = T.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    r(n);
  else
    for (const u in a.selected_nodes)
      r(a.selected_nodes[u]);
  n.setDirtyCanvas(!0, !0);
};
C.onShowMenuNodeProperties = function(t, e, s, o, n) {
  if (!n || !n.properties)
    return;
  const r = T.active_canvas, a = r.getCanvasWindow(), u = [];
  for (const p in n.properties) {
    let f = n.properties[p] !== void 0 ? n.properties[p] : " ";
    typeof f == "object" && (f = JSON.stringify(f));
    const c = n.getPropertyInfo(p);
    (c.type === "enum" || c.type === "combo") && (f = T.getPropertyPrintableValue(f, c.values)), f = T.decodeHTML(f), u.push({
      content: `<span class='property_name'>${c.label ? c.label : p}</span><span class='property_value'>${f}</span>`,
      value: p
    });
  }
  if (!u.length)
    return;
  new z(
    u,
    {
      event: s,
      callback: l,
      parentMenu: o,
      allow_html: !0,
      node: n
    },
    a
  );
  function l(p, f, c, g) {
    if (!n)
      return;
    const y = this.getBoundingClientRect();
    r.showEditPropertyValue(n, p.value, {
      position: [y.left, y.top]
    });
  }
  return !1;
};
C.onResizeNode = function(t, e, s, o, n) {
  n && (n.size = n.computeSize(), n.setDirtyCanvas(!0, !0));
};
C.onMenuNodeCollapse = function(t, e, s, o, n) {
  n.graph.beforeChange(
    /* ? */
  );
  const r = function(u) {
    u.collapse();
  }, a = T.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    r(n);
  else
    for (const u in a.selected_nodes)
      r(a.selected_nodes[u]);
  n.graph.afterChange(
    /* ? */
  );
};
C.onMenuNodePin = function(t, e, s, o, n) {
  n.pin();
};
C.onMenuNodeMode = function(t, e, s, o, n) {
  const r = Array.from(Q).map((u) => ({ content: u }));
  new z(
    r,
    { event: s, callback: a, parentMenu: o, node: n }
  );
  function a(u) {
    if (!n)
      return;
    const l = Object.values(Q).indexOf(u.content), p = function(c) {
      l >= W.ALWAYS && Q[l] ? c.changeMode(l) : (console.warn(`unexpected mode: ${u}`), c.changeMode(W.ALWAYS));
    }, f = T.active_canvas;
    if (!f.selected_nodes || Object.keys(f.selected_nodes).length <= 1)
      p(n);
    else
      for (const c in f.selected_nodes)
        p(f.selected_nodes[c]);
  }
  return !1;
};
C.onMenuNodeColors = function(t, e, s, o, n) {
  if (!n)
    throw "no node for color";
  const r = [];
  r.push({
    value: null,
    content: "<span style='display: block; padding-left: 4px;'>No color</span>"
  });
  for (const u in T.node_colors) {
    const l = T.node_colors[u], p = {
      value: u,
      content: `<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid ${l.color}; background-color:${l.bgcolor}'>${u}</span>`
    };
    r.push(p);
  }
  new z(r, {
    event: s,
    callback: a,
    parentMenu: o,
    node: n,
    allow_html: !0
  });
  function a(u) {
    if (!n)
      return;
    const l = u.value ? T.node_colors[u.value] : null, p = function(c) {
      l ? c instanceof ct ? c.color = l.groupcolor : (c.color = l.color, c.bgcolor = l.bgcolor) : (delete c.color, c instanceof et && delete c.bgcolor);
    }, f = T.active_canvas;
    if (!f.selected_nodes || Object.keys(f.selected_nodes).length <= 1)
      p(n);
    else
      for (const c in f.selected_nodes)
        p(f.selected_nodes[c]);
    n.setDirtyCanvas(!0, !0);
  }
  return !1;
};
C.onMenuNodeShapes = function(t, e, s, o, n) {
  if (!n)
    throw "no node passed";
  const r = Array.from(vt).map((u) => ({ content: u }));
  new z(r, {
    event: s,
    callback: a,
    parentMenu: o,
    node: n
  });
  function a(u) {
    if (!n)
      return;
    n.graph.beforeChange(
      /* ? */
    );
    const l = function(f) {
      f.shape = vt.indexOf(u.content);
    }, p = T.active_canvas;
    if (!p.selected_nodes || Object.keys(p.selected_nodes).length <= 1)
      l(n);
    else
      for (const f in p.selected_nodes)
        l(p.selected_nodes[f]);
    n.graph.afterChange(
      /* ? */
    ), n.setDirtyCanvas(!0);
  }
  return !1;
};
C.onMenuNodeRemove = function(t, e, s, o, n) {
  if (!n)
    throw "no node passed";
  const r = n.graph;
  r.beforeChange();
  const a = function(l) {
    l.removable !== !1 && r.remove(l);
  }, u = T.active_canvas;
  if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1)
    a(n);
  else
    for (const l in u.selected_nodes)
      a(u.selected_nodes[l]);
  r.afterChange(), n.setDirtyCanvas(!0, !0);
};
C.onMenuNodeToSubgraph = function(t, e, s, o, n) {
  const r = n.graph, a = T.active_canvas;
  if (!a)
    return;
  let u = Object.values(a.selected_nodes || {});
  u.length || (u = [n]);
  const l = h.createNode("graph/subgraph", null, { constructorArgs: [null] });
  l.pos = n.pos.concat(), r.add(l), l.buildFromNodes(u), a.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
C.onMenuNodeToSubgraphInputs = function(t, e, s, o, n) {
  const r = T.active_canvas;
  if (!r)
    return;
  const a = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !a) {
    console.error("[To Subgraph Inputs] Current graph is not a subgraph!", n.graph);
    return;
  }
  let u = Object.values(r.selected_nodes || {});
  u.length || (u = [n]), a.convertNodesToSubgraphInputs(u), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
C.onMenuNodeToSubgraphOutputs = function(t, e, s, o, n) {
  const r = T.active_canvas;
  if (!r)
    return;
  const a = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !a) {
    console.error("[To Subgraph Outputs] Current graph is not a subgraph!", n.graph);
    return;
  }
  let u = Object.values(r.selected_nodes || {});
  u.length || (u = [n]), a.convertNodesToSubgraphOutputs(u), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
C.onMenuNodeToParentGraph = function(t, e, s, o, n) {
  const r = T.active_canvas;
  if (!r)
    return;
  const a = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !a) {
    console.error("[To Parent Graph] Current graph is not a subgraph!", n.graph);
    return;
  }
  let u = Object.values(r.selected_nodes || {});
  u.length || (u = [n]), a.moveNodesToParentGraph(u), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
C.onMenuNodeClone = function(t, e, s, o, n) {
  const r = T.active_canvas;
  (!r.selected_nodes || Object.keys(r.selected_nodes).length <= 1) && r.selectNode(n), r.cloneSelection();
};
class Ht {
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
    let s = this.element.width, o = this.element.height, n = -this.offset[0], r = -this.offset[1];
    e && (n += e[0] / this.scale, r += e[1] / this.scale, s = e[2], o = e[3]);
    const a = n + s / this.scale, u = r + o / this.scale;
    this.visible_area[0] = n, this.visible_area[1] = r, this.visible_area[2] = a - n, this.visible_area[3] = u - r;
  }
  onMouse(e) {
    if (!this.enabled)
      return;
    const s = this.element, o = s.getBoundingClientRect(), n = e, r = n.clientX - o.left, a = n.clientY - o.top;
    n.canvasX = r, n.canvasX = a, n.dragging = this.dragging;
    const u = !this.viewport || this.viewport && r >= this.viewport[0] && r < this.viewport[0] + this.viewport[2] && a >= this.viewport[1] && a < this.viewport[1] + this.viewport[3];
    if (n.type === `${h.pointerevents_method}down` && u)
      this.dragging = !0, h.pointerListenerRemove(s, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "move", this._binded_mouse_callback), h.pointerListenerAdd(document, "up", this._binded_mouse_callback);
    else if (n.type === `${h.pointerevents_method}move`) {
      const l = r - this.last_mouse[0], p = a - this.last_mouse[1];
      this.dragging && this.mouseDrag(l, p);
    } else
      n.type === `${h.pointerevents_method}up` ? (this.dragging = !1, h.pointerListenerRemove(document, "move", this._binded_mouse_callback), h.pointerListenerRemove(document, "up", this._binded_mouse_callback), h.pointerListenerAdd(s, "move", this._binded_mouse_callback)) : u && (n.type === "mousewheel" || n.type === "wheel" || n.type === "DOMMouseScroll") && (n.eventType = "mousewheel", n.type === "wheel" ? n.wheel = -n.deltaY : n.wheel = n.wheelDeltaY !== null ? n.wheelDeltaY : n.detail * -60, n.delta = n.wheelDelta ? n.wheelDelta / 40 : n.deltaY ? -n.deltaY / 3 : 0, this.changeDeltaScale(1 + n.delta * 0.05, [n.clientX, n.clientY]));
    if (this.last_mouse[0] = r, this.last_mouse[1] = a, u)
      return n.preventDefault(), n.stopPropagation(), !1;
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
    const o = this.element.getBoundingClientRect();
    if (!o)
      return;
    s = s || [
      o.width * 0.5,
      o.height * 0.5
    ], s[0] -= o.left, s[1] -= o.top;
    const n = this.convertCanvasToOffset(s);
    this.scale = e, Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
    const r = this.convertCanvasToOffset(s), a = [
      r[0] - n[0],
      r[1] - n[1]
    ];
    this.offset[0] += a[0], this.offset[1] += a[1], this.onredraw && this.onredraw(this);
  }
  changeDeltaScale(e, s) {
    this.changeScale(this.scale * e, s);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
const rt = class {
  constructor(t, e, s = {}) {
    this.link_type_colors = {}, this.node_panel = null, this.options_panel = null, this.render_time = 0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_reconnect_links = !0, this.allow_searchbox = !0, this.always_render_background = !1, this.background_image = rt.DEFAULT_BACKGROUND_IMAGE, this.block_click = !1, this.clear_background = !0, this.connecting_pos = null, this.connecting_slot = null, this.connecting_input = null, this.connecting_output = null, this.connections_width = 3, this.current_node = null, this.drag_mode = !1, this.dragging_rectangle = null, this.ds = new Ht(), this.editor_alpha = 1, this.filter = null, this.highquality_render = !0, this.skip_events = !1, this.last_mouse_position = [0, 0], this.last_click_position = [0, 0], this.last_click_position_offset = [0, 0], this.last_mouse_dragging = !1, this.links_render_mode = lt.SPLINE_LINK, this.live_mode = !1, this.mouse = [0, 0], this.offset_mouse = [0, 0], this.graph_mouse = [0, 0], this.node_widget = null, this.maxZoom = null, this.minZoom = null, this.multi_select = !1, this.over_link_center = null, this.pause_rendering = !1, this.read_only = !1, this.render_canvas_border = !0, this.render_collapsed_slots = !0, this.render_connection_arrows = !1, this.render_connections_border = !0, this.render_connections_shadows = !1, this.render_connections = !0, this.render_curved_connections = !1, this.render_execution_order = !1, this.render_link_tooltip = !0, this.render_only_selected = !0, this.render_shadows = !0, this.render_title_colored = !0, this.render_subgraph_panels = !0, this.render_subgraph_stack_header = !0, this.round_radius = 8, this.set_canvas_dirty_on_mouse_event = !0, this.show_info = !0, this.use_gradients = !1, this.visible_links = [], this.zoom_modify_alpha = !0, this.pointer_is_down = !1, this.pointer_is_double = !1, this._highlight_input = null, this._highlight_input_slot = null, this._highlight_output = null, this._graph_stack = [], this._bg_img = null, this._pattern = null, this._pattern_img = null, this.search_box = null, this.prompt_box = null, this._events_binded = !1, this.resizing_node = null, typeof t == "string" && (t = document.querySelector(t)), this.skip_events = s.skip_events || !1, this.title_text_font = `${h.NODE_TEXT_SIZE}px Arial`, this.inner_text_font = `normal ${h.NODE_SUBTEXT_SIZE}px Arial`, this.node_title_color = h.NODE_TITLE_COLOR, this.default_link_color = h.LINK_COLOR, this.link_type_colors = h.cloneObject(rt.DEFAULT_LINK_TYPE_COLORS), this.canvas_mouse = this.graph_mouse, this.visible_area = this.ds.visible_area, this.viewport = s.viewport || null, e && e.attachCanvas(this), this.setCanvas(t, s.skip_events), this.clear(), s.skip_render || this.startRendering(), this.autoresize = s.autoresize;
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
      for (const o in e)
        if (e[o] === t) {
          s = o;
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
      let s = Number.MAX_SAFE_INTEGER, o = 0, n = Number.MAX_SAFE_INTEGER, r = 0;
      for (const a of t.iterateNodesInOrder())
        s = Math.min(a.pos[0], s), o = Math.max(a.pos[0] + a.size[0], o), n = Math.min(a.pos[1], n), r = Math.max(a.pos[1] + a.size[1], r);
      e[0] = -(s + (o - s) / 2) + this.canvas.width / 2, e[1] = -(n + (r - n) / 2) + this.canvas.height / 2;
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
    const t = this.graph._subgraph_node, { graph: e, offset: s, scale: o } = this._graph_stack.pop();
    this.selected_nodes = {}, this.highlighted_links = {}, e.attachCanvas(this), this.setDirty(!0, !0), t && (this.centerOnNode(t), this.selectNodes([t])), this.ds.offset = s, this.ds.scale = o;
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
    const e = this.canvas.parentNode.getBoundingClientRect(), { width: s, height: o } = e;
    this.canvas.width = s * t, this.canvas.height = o * t, this.canvas.style.width = `${s}px`, this.canvas.style.height = `${o}px`, this.canvas.getContext("2d").scale(t, t);
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
    const s = this, o = e.nodeFrom && e.slotFrom !== null, n = !o && e.nodeTo && e.slotTo !== null;
    if (e = { ...{
      position: [0, 0],
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, ...e }, !o && !n)
      return console.warn(`No data passed to createDefaultNodeForSlot ${e.nodeFrom} ${e.slotFrom} ${e.nodeTo} ${e.slotTo}`), !1;
    if (!t)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    const a = o ? e.nodeFrom : e.nodeTo;
    let u = o ? e.slotFrom : e.slotTo, l = null;
    switch (typeof u) {
      case "string":
        l = o ? a.findOutputSlotIndexByName(u) : a.findInputSlotIndexByName(u), u = o ? a.outputs[u] : a.inputs[u];
        break;
      case "object":
        l = o ? a.findOutputSlotIndexByName(u.name) : a.findInputSlotIndexByName(u.name);
        break;
      case "number":
        l = u, u = o ? a.outputs[u] : a.inputs[u];
        break;
      case "undefined":
      default:
        return console.warn(`Cant get slot information ${u}`), !1;
    }
    u = u, (!u || !l) && console.warn(`createDefaultNodeForSlot bad slotX ${u} ${l}`);
    const p = u.type === k.EVENT ? "_event_" : u.type, f = o ? h.slot_types_default_out : h.slot_types_default_in, c = f[p];
    if (f && c) {
      u.link !== null || u.links && u.links.length > 0;
      let g = null;
      if (Array.isArray(c)) {
        for (const y in c)
          if (t === f[p][y] || t === "AUTO") {
            g = f[p][y], h.debug && console.log(`opts.nodeType === slotTypesDefault[fromSlotType][typeX] :: ${t}`);
            break;
          }
      } else
        throw new TypeError(`Invalid default slot specifier, must be an array: ${c}`);
      if (g) {
        let y = null;
        typeof g == "object" && g.node && (y = g, g = g.node);
        const d = h.createNode(g);
        if (d) {
          if (y) {
            if (y.properties)
              for (const v in y.properties)
                d.addProperty(v, y.properties[v]);
            if (y.inputs) {
              d.inputs = [];
              for (const v in y.inputs)
                d.addOutput(
                  y.inputs[v][0],
                  y.inputs[v][1]
                );
            }
            if (y.outputs) {
              d.outputs = [];
              for (const v in y.outputs)
                d.addOutput(
                  y.outputs[v][0],
                  y.outputs[v][1]
                );
            }
            y.title && (d.title = y.title), y.json && d.configure(y.json);
          }
          console.warn("PLACING", d.type, e);
          const _ = e.position[0] + e.posAdd[0] + (e.posSizeFix[0] ? e.posSizeFix[0] * d.size[0] : 0), m = e.position[1] + e.posAdd[1] + (e.posSizeFix[1] ? e.posSizeFix[1] * d.size[1] : 0), b = [_, m];
          return s.graph.add(d, { pos: b }), o ? e.nodeFrom.connectByTypeInput(l, d, p) : e.nodeTo.connectByTypeOutput(l, d, p), o && n && console.debug("connecting in between"), !0;
        } else
          console.log(`failed creating ${g}`);
      }
    }
    return !1;
  }
  /** returns true if a position (in graph space) is on top of a node little corner box */
  isOverNodeBox(t, e, s) {
    const o = h.NODE_TITLE_HEIGHT;
    return !!h.isInsideRectangle(
      e,
      s,
      t.pos[0] + 2,
      t.pos[1] + 2 - o,
      o - 4,
      o - 4
    );
  }
  /** returns slot index if a position (in graph space) is on top of a node input slot */
  isOverNodeInput(t, e, s, o) {
    if (t.inputs)
      for (let n = 0, r = t.inputs.length; n < r; ++n) {
        const a = t.getConnectionPos(!0, n);
        let u = !1;
        if (t.horizontal ? u = h.isInsideRectangle(
          e,
          s,
          a[0] - 5,
          a[1] - 10,
          10,
          20
        ) : u = h.isInsideRectangle(
          e,
          s,
          a[0] - 10,
          a[1] - 5,
          40,
          10
        ), u)
          return o && (o[0] = a[0], o[1] = a[1]), n;
      }
    return -1;
  }
  /**
   * returns the INDEX if a position (in graph space) is on top of a node output slot
   * @method isOverNodeOuput
   */
  isOverNodeOutput(t, e, s, o) {
    if (t.outputs)
      for (let n = 0, r = t.outputs.length; n < r; ++n) {
        t.outputs[n];
        const a = t.getConnectionPos(!1, n);
        let u = !1;
        if (t.horizontal ? u = h.isInsideRectangle(
          e,
          s,
          a[0] - 5,
          a[1] - 10,
          10,
          20
        ) : u = h.isInsideRectangle(
          e,
          s,
          a[0] - 10,
          a[1] - 5,
          40,
          10
        ), u)
          return o && (o[0] = a[0], o[1] = a[1]), n;
      }
    return -1;
  }
  findLinkCenterAtPos(t, e) {
    for (let s = 0; s < this.visible_links.length; ++s) {
      const o = this.visible_links[s];
      if (this.graph && this.graph.links[o.id] === null)
        continue;
      const n = o._pos;
      if (!(!n || t < n[0] - 4 || t > n[0] + 4 || e < n[1] - 4 || e > n[1] + 4))
        return o;
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
        for (const o in this.selected_nodes)
          this.selected_nodes[o].onKeyDown && this.selected_nodes[o].onKeyDown(t);
    } else if (t.type === "keyup" && (t.keyCode === 32 && (this.dragging_canvas = !1), s && this.selected_nodes))
      for (const o in this.selected_nodes)
        this.selected_nodes[o].onKeyUp && this.selected_nodes[o].onKeyUp(t);
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
    for (const o in this.selected_nodes) {
      const n = this.selected_nodes[o];
      n._relative_id = e, s.push(n), e += 1;
    }
    for (let o = 0; o < s.length; ++o) {
      const n = s[o];
      if (!n.clonable)
        continue;
      const r = { forNode: {} }, a = n.clone(r);
      if (!a) {
        console.warn(`node type not found: ${n.type}`);
        continue;
      }
      if (t.nodes.push(a.serialize()), t.nodeCloneData[a.id] = {
        prevNodeID: n.id,
        cloneData: r
      }, n.inputs && n.inputs.length)
        for (let u = 0; u < n.inputs.length; ++u) {
          const l = n.inputs[u];
          if (!l || l.link === null)
            continue;
          const p = this.graph.links[l.link];
          if (!p)
            continue;
          const f = this.graph.getNodeById(
            p.origin_id
          );
          !f || !this.selected_nodes[f.id] || !this.selected_nodes[f.id].clonable || t.links.push([
            f._relative_id,
            p.origin_slot,
            // j,
            n._relative_id,
            p.target_slot
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
    let s = null, o = null;
    for (let r = 0; r < e.nodes.length; ++r)
      s ? (s[0] > e.nodes[r].pos[0] && (s[0] = e.nodes[r].pos[0], o[0] = r), s[1] > e.nodes[r].pos[1] && (s[1] = e.nodes[r].pos[1], o[1] = r)) : (s = [e.nodes[r].pos[0], e.nodes[r].pos[1]], o = [r, r]);
    const n = [];
    for (let r = 0; r < e.nodes.length; ++r) {
      const a = e.nodes[r], u = h.createNode(a.type);
      if (u) {
        u.configure(a), u.pos[0] += this.graph_mouse[0] - s[0], u.pos[1] += this.graph_mouse[1] - s[1];
        const { cloneData: l, prevNodeID: p } = e.nodeCloneData[u.id];
        this.graph.add(u, { doProcessChange: !1, addedBy: "paste", prevNodeID: p, cloneData: l }), n.push(u);
      }
    }
    for (let r = 0; r < e.links.length; ++r) {
      const a = e.links[r], u = n[a[0]], l = n[a[2]];
      u && l ? u.connect(a[1], l, a[3]) : console.warn("Warning, nodes missing on pasting");
    }
    this.selectNodes(n), this.graph.afterChange();
  }
  cloneSelection() {
    if (!this.selected_nodes || Object.keys(this.selected_nodes).length === 0)
      return;
    this.graph.beforeChange();
    const t = {}, e = [], s = {};
    for (const n of Object.values(this.selected_nodes))
      for (const r of n.iterateAllLinks())
        this.selected_nodes[r.origin_id] && this.selected_nodes[r.target_id] && e.push(r);
    const o = function(n) {
      if (n.clonable === !1)
        return;
      const r = n.id, a = { forNode: {} }, u = n.clone(a);
      u && (s[r] = u, u.pos = [n.pos[0] + 5, n.pos[1] + 5], n.graph.add(u, { addedBy: "cloneSelection", prevNodeID: r, prevNode: n, cloneData: a }), t[u.id] = u);
    };
    for (const n in this.selected_nodes)
      o(this.selected_nodes[n]);
    for (const n of e) {
      const r = s[n.origin_id], a = s[n.target_id];
      r && a && r.connect(n.origin_slot, a, n.target_slot);
    }
    Object.keys(t).length && this.selectNodes(Object.values(t)), this.graph.afterChange(), this.setDirty(!0, !0);
  }
  processDrop(t) {
    const e = t;
    e.preventDefault(), this.adjustMouseEvent(e);
    const s = e.clientX, o = e.clientY;
    if (!(!this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3]))
      return;
    const r = [e.canvasX, e.canvasY], a = this.graph ? this.graph.getNodeOnPos(r[0], r[1]) : null;
    if (!a) {
      let u = null;
      this.onDropItem && (u = this.onDropItem(e)), u || this.checkDropItem(e);
      return;
    }
    if (a.onDropFile || a.onDropData) {
      const u = e.dataTransfer.files;
      if (u && u.length)
        for (let l = 0; l < u.length; l++) {
          const p = e.dataTransfer.files[0], f = p.name;
          if (rt.getFileExtension(f), a.onDropFile && a.onDropFile(p), a.onDropData) {
            const c = new FileReader();
            c.onload = function(y) {
              const d = y.target.result;
              a.onDropData(d, f, p);
            };
            const g = p.type.split("/")[0];
            g === "text" || g === "" ? c.readAsText(p) : g === "image" ? c.readAsDataURL(p) : c.readAsArrayBuffer(p);
          }
        }
    }
    return !!(a.onDropItem && a.onDropItem(e) || this.onDropItem && this.onDropItem(e));
  }
  checkDropItem(t) {
    const e = t;
    if (e.dataTransfer.files.length) {
      const s = e.dataTransfer.files[0], o = rt.getFileExtension(s.name).toLowerCase(), n = h.node_types_by_file_extension[o];
      if (n) {
        this.graph.beforeChange();
        const r = h.createNode(n.type);
        r.pos = [e.canvasX, e.canvasY], this.graph.add(r), r.onDropFile && r.onDropFile(s), this.graph.afterChange();
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
      const o = t[s];
      if (o.is_selected) {
        this.deselectNode(o);
        continue;
      }
      if (!o.is_selected && o.onSelected && o.onSelected(), o.is_selected = !0, this.selected_nodes[o.id] = o, o.inputs)
        for (let n = 0; n < o.inputs.length; ++n)
          this.highlighted_links[o.inputs[n].link] = !0;
      if (o.outputs)
        for (let n = 0; n < o.outputs.length; ++n) {
          const r = o.outputs[n];
          if (r.links)
            for (let a = 0; a < r.links.length; ++a)
              this.highlighted_links[r.links[a]] = !0;
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
            for (let o = 0; o < s.links.length; ++o)
              delete this.highlighted_links[s.links[o]];
        }
    }
  }
  /** removes all nodes from the current selection */
  deselectAllNodes() {
    if (!this.graph)
      return;
    const t = this.graph._nodes;
    for (let e = 0, s = t.length; e < s; ++e) {
      const o = t[e];
      o.is_selected && (o.onDeselected && o.onDeselected(), o.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(o));
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
          const s = e.graph.links[e.inputs[0].link], o = e.graph.links[e.outputs[0].links[0]], n = e.getInputNode(0), r = e.getOutputNodes(0)[0];
          n && r && n.connect(s.origin_slot, r, o.target_slot);
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
    let s = 0, o = 0;
    if (this.canvas) {
      const n = this.canvas.getBoundingClientRect();
      s = e.clientX - n.left, o = e.clientY - n.top;
    } else
      s = e.clientX, o = e.clientY;
    return this.last_mouse_position[0] = s, this.last_mouse_position[1] = o, e.canvasX = s / this.ds.scale - this.ds.offset[0], e.canvasY = o / this.ds.scale - this.ds.offset[1], e;
  }
  /** process an event on widgets */
  processNodeWidgets(t, e, s, o) {
    if (!t.widgets || !t.widgets.length || h.ignore_all_widget_events)
      return null;
    const n = e[0] - t.pos[0], r = e[1] - t.pos[1], a = t.size[0], u = this, l = this.getCanvasWindow();
    for (let f = 0; f < t.widgets.length; ++f) {
      const c = t.widgets[f];
      if (!c || c.disabled)
        continue;
      const g = c.computeSize ? c.computeSize(a)[1] : h.NODE_WIDGET_HEIGHT, y = c.width || a;
      if (c !== o && (n < 6 || n > y - 12 || r < c.last_y || r > c.last_y + g || c.last_y === void 0))
        continue;
      const d = c.value;
      switch (c.type) {
        case "button":
          s.type === `${h.pointerevents_method}down` && (c.callback && setTimeout(() => {
            c.callback(c, u, t, e, s);
          }, 20), c.clicked = !0, this.dirty_canvas = !0);
          break;
        case "slider":
          c.options.max - c.options.min;
          const _ = dt((n - 15) / (y - 30), 0, 1);
          c.value = c.options.min + (c.options.max - c.options.min) * _, c.callback && setTimeout(() => {
            p(c, c.value);
          }, 20), this.dirty_canvas = !0;
          break;
        case "number":
        case "combo":
          const m = c.value;
          if (s.type === `${h.pointerevents_method}move` && c.type === "number")
            s.deltaX && (c.value += s.deltaX * (c.options.step || 0.1)), c.options.min !== null && c.value < c.options.min && (c.value = c.options.min), c.options.max !== null && c.value > c.options.max && (c.value = c.options.max);
          else if (s.type === `${h.pointerevents_method}down`) {
            let b = c.options.values;
            if (b && typeof b == "function") {
              const N = c.options.values;
              b = N(c, t);
            }
            let v = null;
            c.type !== "number" && (v = Array.isArray(b) ? b : Object.keys(b));
            const O = n < 40 ? -1 : n > y - 40 ? 1 : 0;
            if (c.type === "number")
              c.value += O * (c.options.step || 0.1), c.options.min !== null && c.value < c.options.min && (c.value = c.options.min), c.options.max !== null && c.value > c.options.max && (c.value = c.options.max);
            else if (O) {
              let N = -1;
              this.last_mouseclick = 0, b.constructor === Object ? N = v.indexOf(String(c.value)) + O : N = v.indexOf(c.value) + O, N >= v.length && (N = v.length - 1), N < 0 && (N = 0), Array.isArray(b) ? c.value = b[N] : c.value = N;
            } else {
              let N = function(x, w, P) {
                let S = x.content;
                return b !== v && (S = E.indexOf(S)), this.value = S, p(this, S), u.dirty_canvas = !0, !1;
              };
              const E = b !== v ? Object.values(b) : b, G = Array.from(E).map((x) => ({ content: x }));
              new z(G, {
                scale: Math.max(1, this.ds.scale),
                event: s,
                className: "dark",
                callback: N.bind(c)
              }, l);
            }
          } else if (s.type === `${h.pointerevents_method}up` && c.type === "number") {
            const b = n < 40 ? -1 : n > y - 40 ? 1 : 0;
            s.click_time < 200 && b === 0 && this.prompt("Value", c.value, function(v) {
              this.value = Number(v), p(this, this.value);
            }.bind(c), s);
          }
          m !== c.value && setTimeout(
            function() {
              p(this, this.value);
            }.bind(c),
            20
          ), this.dirty_canvas = !0;
          break;
        case "toggle":
          s.type === `${h.pointerevents_method}down` && (c.value = !c.value, setTimeout(() => {
            p(c, c.value);
          }, 20));
          break;
        case "string":
        case "text":
          s.type === `${h.pointerevents_method}down` && this.prompt("Value", c.value, function(b) {
            this.value = b, p(this, b);
          }.bind(c), s, c.options ? c.options.multiline : !1, c.options.inputStyle);
          break;
        default:
          c.mouse && (this.dirty_canvas = c.mouse(s, [n, r], t));
          break;
      }
      return d !== c.value && (t.onWidgetChanged && t.onWidgetChanged(c, d), t.graph._version++), c;
    }
    function p(f, c) {
      f.value = c, f.options && f.options.property && t.properties[f.options.property] !== void 0 && t.setProperty(f.options.property, c), f.callback && f.callback(f.value, u, t, e, s);
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
  isAreaClicked(t, e, s, o, n) {
    let r = this.offset_mouse;
    h.isInsideRectangle(r[0], r[1], t, e, s, o), r = this.last_click_position;
    const a = r && h.isInsideRectangle(r[0], r[1], t, e, s, o), u = a && !this.block_click;
    return a && n && this.blockClick(), u;
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
    const o = setInterval(() => {
      e.editor_alpha *= s, e.dirty_canvas = !0, e.dirty_bgcanvas = !0, s < 1 && e.editor_alpha < 0.01 && (clearInterval(o), s < 1 && (e.live_mode = !0)), s > 1 && e.editor_alpha > 0.99 && (clearInterval(o), e.editor_alpha = 1);
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
    const o = this.graph.findNodesByClass(V).find((a) => a.properties.name === e);
    if (o) {
      this.selectNodes([o]);
      return;
    }
    (!s || s === "") && (s = "*");
    const n = [
      this.canvas.width * 0.25 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphInput(e, s, n);
    if (r) {
      const a = r.innerNode;
      this.selectNodes([a]), this.graph.afterChange();
    } else
      console.error("graph input node not found:", s);
  }
  addGraphOutputNode(t, e, s) {
    const o = this.graph.findNodesByClass(j).find((a) => a.properties.name === e);
    if (o) {
      this.selectNodes([o]);
      return;
    }
    (!s || s === "") && (s = "*");
    const n = [
      this.canvas.width * 0.75 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphOutput(e, s, n);
    if (r) {
      const a = r.innerNode;
      this.selectNodes([a]), this.graph.afterChange();
    } else
      console.error("graph output node not found:", s);
  }
  getCanvasMenuOptions() {
    return C.prototype.getCanvasMenuOptions.apply(this, arguments);
  }
  getNodeMenuOptions(t) {
    return C.prototype.getNodeMenuOptions.apply(this, arguments);
  }
  getLinkMenuOptions(t) {
    return C.prototype.getLinkMenuOptions.apply(this, arguments);
  }
  getGroupMenuOptions(t) {
    return C.prototype.getGroupMenuOptions.apply(this, arguments);
  }
  checkPanels() {
    C.prototype.checkPanels.apply(this, arguments);
  }
  closePanels() {
    C.prototype.closePanels.apply(this, arguments);
  }
  createDialog(t, e) {
    return C.prototype.createDialog.apply(this, arguments);
  }
  createPanel(t, e = {}) {
    return C.prototype.createPanel.apply(this, arguments);
  }
  showSearchBox(t, e = {}) {
    return C.prototype.showSearchBox.apply(this, arguments);
  }
  prompt(t = "", e, s, o, n = !1, r = null) {
    return C.prototype.prompt.apply(this, arguments);
  }
  showConnectionMenu(t = {}) {
    return C.prototype.showConnectionMenu.apply(this, arguments);
  }
  showLinkMenu(t, e) {
    return C.prototype.showLinkMenu.apply(this, arguments);
  }
  showEditPropertyValue(t, e, s) {
    return C.prototype.showEditPropertyValue.apply(this, arguments);
  }
  showShowNodePanel(t) {
    C.prototype.showShowNodePanel.apply(this, arguments);
  }
  showSubgraphPropertiesDialog(t) {
    return C.prototype.showSubgraphPropertiesDialog.apply(this, arguments);
  }
  showSubgraphPropertiesDialogRight(t) {
    return C.prototype.showSubgraphPropertiesDialogRight.apply(this, arguments);
  }
  processContextMenu(t, e) {
    C.prototype.processContextMenu.apply(this, arguments);
  }
  /*
     * Events
     */
  processMouseMove(t) {
    return at.prototype.processMouseMove.apply(this, arguments);
  }
  processMouseDown(t) {
    return at.prototype.processMouseDown.apply(this, arguments);
  }
  processMouseUp(t) {
    return at.prototype.processMouseUp.apply(this, arguments);
  }
  processMouseWheel(t) {
    return at.prototype.processMouseWheel.apply(this, arguments);
  }
  /*
     * Rendering
     */
  setZoom(t, e) {
    R.prototype.setZoom.apply(this, arguments);
  }
  bringToFront(t) {
    R.prototype.bringToFront.apply(this, arguments);
  }
  sendToBack(t) {
    R.prototype.sendToBack.apply(this, arguments);
  }
  computeVisibleNodes(t, e = []) {
    return R.prototype.computeVisibleNodes.apply(this, arguments);
  }
  draw(t = !1, e = !1) {
    R.prototype.draw.apply(this, arguments);
  }
  drawFrontCanvas() {
    R.prototype.drawFrontCanvas.apply(this, arguments);
  }
  drawSubgraphPanel(t) {
    R.prototype.drawSubgraphPanel.apply(this, arguments);
  }
  drawSubgraphPanelLeft(t, e, s) {
    R.prototype.drawSubgraphPanelLeft.apply(this, arguments);
  }
  drawSubgraphPanelRight(t, e, s) {
    R.prototype.drawSubgraphPanelRight.apply(this, arguments);
  }
  drawButton(t, e, s, o, n, r = h.NODE_DEFAULT_COLOR, a = "#555", u = h.NODE_TEXT_COLOR, l = !0) {
    return R.prototype.drawButton.apply(this, arguments);
  }
  drawBackCanvas() {
    R.prototype.drawBackCanvas.apply(this, arguments);
  }
  renderInfo(t, e = 10, s) {
    R.prototype.renderInfo.apply(this, arguments);
  }
  drawNode(t, e) {
    R.prototype.drawNode.apply(this, arguments);
  }
  drawLinkTooltip(t, e) {
    R.prototype.drawLinkTooltip.apply(this, arguments);
  }
  drawNodeShape(t, e, s, o, n, r, a) {
    R.prototype.drawNodeShape.apply(this, arguments);
  }
  drawConnections(t) {
    R.prototype.drawConnections.apply(this, arguments);
  }
  renderLink(t, e, s, o, n, r, a, u, l, p) {
    R.prototype.renderLink.apply(this, arguments);
  }
  computeConnectionPoint(t, e, s, o = D.RIGHT, n = D.LEFT) {
    return R.prototype.computeConnectionPoint.apply(this, arguments);
  }
  drawExecutionOrder(t) {
    R.prototype.drawExecutionOrder.apply(this, arguments);
  }
  drawNodeWidgets(t, e, s, o) {
    R.prototype.drawNodeWidgets.apply(this, arguments);
  }
  drawGroups(t, e) {
    R.prototype.drawGroups.apply(this, arguments);
  }
};
let T = rt;
T.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
T.node_colors = {
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
T.DEFAULT_LINK_TYPE_COLORS = {
  [k.ACTION]: h.ACTION_LINK_COLOR,
  [k.EVENT]: h.EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
};
T.DEFAULT_CONNECTION_COLORS = {
  input_off: "#778",
  input_on: "#7F7",
  // "#BBD"
  output_off: "#778",
  output_on: "#7F7"
  // "#BBD"
};
T.DEFAULT_CONNECTION_COLORS_BY_TYPE = {
  number: "#7F7",
  string: "#77F",
  boolean: "#F77"
};
T.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF = {
  number: "#474",
  string: "#447",
  boolean: "#744"
};
T.active_canvas = null;
T.active_node = null;
T.onMenuCollapseAll = C.onMenuCollapseAll;
T.onMenuNodeEdit = C.onMenuNodeEdit;
T.onShowPropertyEditor = C.onShowPropertyEditor;
T.onGroupAdd = C.onGroupAdd;
T.onMenuAdd = C.onMenuAdd;
T.showMenuNodeOptionalInputs = C.showMenuNodeOptionalInputs;
T.showMenuNodeOptionalOutputs = C.showMenuNodeOptionalOutputs;
T.onShowMenuNodeProperties = C.onShowMenuNodeProperties;
T.onResizeNode = C.onResizeNode;
T.onMenuResizeNode = C.onMenuResizeNode;
T.onMenuNodeCollapse = C.onMenuNodeCollapse;
T.onMenuNodePin = C.onMenuNodePin;
T.onMenuNodeMode = C.onMenuNodeMode;
T.onMenuNodeColors = C.onMenuNodeColors;
T.onMenuNodeShapes = C.onMenuNodeShapes;
T.onMenuNodeRemove = C.onMenuNodeRemove;
T.onMenuNodeClone = C.onMenuNodeClone;
T.onMenuNodeToSubgraph = C.onMenuNodeToSubgraph;
T.onMenuNodeToSubgraphInputs = C.onMenuNodeToSubgraphInputs;
T.onMenuNodeToSubgraphOutputs = C.onMenuNodeToSubgraphOutputs;
T.onMenuNodeToParentGraph = C.onMenuNodeToParentGraph;
var Y = /* @__PURE__ */ ((t) => (t[t.SEPARATOR = 0] = "SEPARATOR", t))(Y || {});
class z {
  static trigger(e, s, o, n) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(s, !0, !0, o), r.target = n, e.dispatchEvent && e.dispatchEvent(r), r;
  }
  static isCursorOverElement(e, s) {
    const o = e.clientX, n = e.clientY, r = s.getBoundingClientRect();
    return r ? n > r.top && n < r.top + r.height && o > r.left && o < r.left + r.width : !1;
  }
  static closeAllContextMenus(e) {
    e = e || window;
    const s = e.document.querySelectorAll(".litecontextmenu");
    if (!s.length)
      return;
    const o = Array.from(s);
    for (const n of o)
      n.close();
  }
  constructor(e, s = {}, o) {
    this.options = s;
    const n = this;
    s.parentMenu && (s.parentMenu.constructor !== this.constructor ? (console.error(
      "parentMenu must be of class ContextMenu, ignoring it"
    ), s.parentMenu = null) : (this.parentMenu = s.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    let r = null;
    s.event && (r = s.event.constructor.name), r !== "MouseEvent" && r !== "CustomEvent" && r !== "PointerEvent" && (console.error(
      `Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (${r})`
    ), s.event = null);
    const a = document.createElement("div");
    a.className = "litegraph litecontextmenu litemenubar-panel", s.className && (a.className += ` ${s.className}`), a.style.pointerEvents = "none", setTimeout(() => {
      a.style.pointerEvents = "auto";
    }, 100), h.pointerListenerAdd(a, "up", (c) => (c.preventDefault(), !0), !0), a.addEventListener(
      "contextmenu",
      (c) => (c.button !== 2 || c.preventDefault(), !1),
      !0
    ), a.close = () => {
      a.parentNode.removeChild(a);
    }, h.pointerListenerAdd(a, "down", (c) => {
      if (c.button === 2)
        return n.close(), c.preventDefault(), !0;
    }, !0);
    function u(c) {
      const g = Number.parseInt(a.style.top);
      return a.style.top = `${(g + c.deltaY * s.scroll_speed).toFixed()}px`, c.preventDefault(), !0;
    }
    if (s.scroll_speed || (s.scroll_speed = 0.1), a.addEventListener("wheel", u, !0), a.addEventListener("mousewheel", u, !0), this.root = a, s.title) {
      const c = document.createElement("div");
      c.className = "litemenu-title", c.innerHTML = s.title, a.appendChild(c);
    }
    this.values = [];
    for (let c = 0; c < e.length; c++) {
      const g = e[c];
      let y = "";
      g === 0 ? y = "" : typeof g == "string" ? y = g : y = g.content, this.addItem(y, g, s);
    }
    h.pointerListenerAdd(a, "enter", (c) => {
      a.closing_timer && clearTimeout(a.closing_timer);
    });
    let l = document;
    s.event && s.event.target instanceof Node && (l = s.event.target.ownerDocument), l || (l = document), l.fullscreenElement ? l.fullscreenElement.appendChild(a) : l.body.appendChild(a);
    let p = s.left || 0, f = s.top || 0;
    if (s.event) {
      if (p = s.event.clientX - 10, f = s.event.clientY - 10, s.title && (f -= 20), s.parentMenu) {
        const y = s.parentMenu.root.getBoundingClientRect();
        p = y.left + y.width;
      }
      const c = document.body.getBoundingClientRect(), g = a.getBoundingClientRect();
      c.height === 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), c.width && p > c.width - g.width - 10 && (p = c.width - g.width - 10), c.height && f > c.height - g.height - 10 && (f = c.height - g.height - 10);
    }
    a.style.left = `${p}px`, a.style.top = `${f}px`, s.scale && (a.style.transform = `scale(${s.scale})`);
  }
  addItem(e, s, o = {}) {
    const n = this, r = document.createElement("div");
    r.className = "litemenu-entry submenu";
    let a = !1;
    typeof s == "string" && (s = { content: s }), s === 0 ? r.classList.add("separator") : (r.innerHTML = s.title ? s.title : e, s.disabled && (a = !0, r.classList.add("disabled")), (s.submenu || s.has_submenu) && r.classList.add("has_submenu"), typeof s == "function" ? r.dataset.value = e : r.dataset.value = `${this.values.length}`, s.className && (r.className += ` ${s.className}`)), this.values.push(s), this.root.appendChild(r), a || r.addEventListener("click", p), o.autoopen && h.pointerListenerAdd(r, "enter", l);
    const u = this;
    function l(f) {
      const c = this.value;
      !c || !c.has_submenu || p.call(this, f);
    }
    function p(f) {
      const c = Number.parseInt(this.dataset.value), g = u.values[c];
      h.debug && console.debug("ContextMenu inner_onclick", c, g);
      const y = T.active_canvas;
      if (!y)
        return;
      const d = y.adjustMouseEvent(f);
      let _ = !0;
      if (n.current_submenu && n.current_submenu.close(d), o.callback && o.callback.call(
        this,
        g,
        o,
        d,
        n,
        o.node
      ) === !0 && (_ = !1), g && typeof g == "object" && (g.callback && !o.ignore_item_callbacks && g.disabled !== !0 && g.callback.call(
        this,
        g,
        o,
        d,
        n,
        o.extra
      ) === !0 && (_ = !1), g.submenu)) {
        if (!g.submenu.options)
          throw "ContextMenu submenu needs options";
        new z(g.submenu.options, {
          callback: g.submenu.callback,
          event: d,
          parentMenu: n,
          ignore_item_callbacks: g.submenu.ignore_item_callbacks,
          title: g.submenu.title,
          extra: g.submenu.extra,
          autoopen: o.autoopen
        }), _ = !1;
      }
      _ && !n.lock && n.close();
    }
    return r;
  }
  close(e, s) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !s && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, e === void 0 ? this.parentMenu.close() : e && !z.isCursorOverElement(e, this.parentMenu.root) && z.trigger(this.parentMenu.root, `${h.pointerevents_method}leave`, e)), this.current_submenu && this.current_submenu.close(e, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
  }
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
}
export {
  bt as BASE_SLOT_TYPES,
  A as BuiltInSlotShape,
  k as BuiltInSlotType,
  z as ContextMenu,
  Y as ContextMenuSpecialItem,
  D as Dir,
  Ht as DragAndScale,
  V as GraphInput,
  j as GraphOutput,
  B as LConnectionKind,
  kt as LGraph,
  T as LGraphCanvas,
  at as LGraphCanvas_Events,
  R as LGraphCanvas_Rendering,
  C as LGraphCanvas_UI,
  ct as LGraphGroup,
  et as LGraphNode,
  Gt as LGraphStatus,
  it as LLink,
  st as LayoutDirection,
  lt as LinkRenderMode,
  Ft as LinkRenderModeNames,
  h as LiteGraph,
  gt as NODE_MODE_COLORS,
  Q as NODE_MODE_NAMES,
  W as NodeMode,
  vt as SLOT_SHAPE_NAMES,
  J as Subgraph,
  Z as TitleMode,
  dt as clamp,
  X as getLitegraphTypeName,
  Et as getSlotTypesIn,
  Rt as getSlotTypesInFormatted,
  Nt as getSlotTypesOut,
  Mt as getSlotTypesOutFormatted,
  mt as getStaticProperty,
  pt as getStaticPropertyOnInstance,
  Tt as isValidLitegraphType,
  ft as makeDraggable,
  It as reassignGraphIDs,
  ht as toHashMap
};
