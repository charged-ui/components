function t(e) {
  return function(n) {
    return customElements.get(e) || customElements.define(e, n), n;
  };
}
export {
  t as c
};
