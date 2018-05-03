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
    // randomNumber: function (min, max) {
    //   return Math.floor(min + Math.random() * (max + 1 - min));
    // },
    // addZero: function (number) {
    //   return number < 10 ? '0' + number : number;
    // },
    // changeItem: function (array, i, j) {
    //   var x = array[i];
    //   array[i] = array[j];
    //   array[j] = x;
    // },
    // copyArr: function (arr) {
    //   var photos = [];
    //   for (var j = 0; j < arr.length; j++) {
    //     photos[j] = arr[j];
    //   }
    //   return photos;
    // },
    // shuffle: function (arr) {
    //   for (var j = 0; j < arr.length; j++) {
    //     var k = this.randomNumber(0, arr.length - 1);
    //     window.util.changeItem(arr, j, k);
    //   }
    //   return arr;
    // },
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
