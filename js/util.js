'use strict';

(function () {
  var Keycode = {
    ESE: 27,
    ENTER: 13
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    },
    debounce: function (fun, interval) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, interval);
      };
    }
  };
})();
