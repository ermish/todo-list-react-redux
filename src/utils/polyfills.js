/* eslint-disable */

export function createPolyfills() {
  if (!Array.prototype.last) {
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
  }
}
