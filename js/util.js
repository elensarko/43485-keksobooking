'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    randomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    addZero: function (number) {
      return number < 10 ? '0' + number : number;
    },
    changeItem: function (array, i, j) {
      var x = array[i];
      array[i] = array[j];
      array[j] = x;
    },
    copyArr: function (arr) {
      var photos = [];
      for (var j = 0; j < arr.length; j++) {
        photos[j] = arr[j];
      }
      return photos;
    },
    shuffle: function (arr) {
      for (var j = 0; j < arr.length; j++) {
        var k = window.util.randomNumber(0, arr.length - 1);
        window.util.changeItem(arr, j, k);
      }
      return arr;
    }
  };
})();
