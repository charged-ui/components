import "./vendor/lit.js";
function m(e) {
  return function(t) {
    return customElements.get(e) || customElements.define(e, t), t;
  };
}
export {
  m as c
};
