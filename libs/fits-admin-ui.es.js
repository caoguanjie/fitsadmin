import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createTextVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createTextVNode("3333");
const _hoisted_2 = /* @__PURE__ */ createTextVNode("Primary");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("Success");
const _hoisted_4 = /* @__PURE__ */ createTextVNode("Info");
const _hoisted_5 = /* @__PURE__ */ createTextVNode("Warning");
const _hoisted_6 = /* @__PURE__ */ createTextVNode("Danger");
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u4E2D\u6587");
function _sfc_render(_ctx, _cache) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_row = resolveComponent("el-row");
  return openBlock(), createBlock(_component_el_row, { class: "mb-4" }, {
    default: withCtx(() => [
      createVNode(_component_el_button, null, {
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "primary" }, {
        default: withCtx(() => [
          _hoisted_2
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "success" }, {
        default: withCtx(() => [
          _hoisted_3
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "info" }, {
        default: withCtx(() => [
          _hoisted_4
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "warning" }, {
        default: withCtx(() => [
          _hoisted_5
        ]),
        _: 1
      }),
      createVNode(_component_el_button, { type: "danger" }, {
        default: withCtx(() => [
          _hoisted_6
        ]),
        _: 1
      }),
      createVNode(_component_el_button, null, {
        default: withCtx(() => [
          _hoisted_7
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var ButtonTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const FitAdminUI = {
  install: (app) => {
    app.component("FitsButtonTest", ButtonTest);
  }
};
export { FitAdminUI as default };
