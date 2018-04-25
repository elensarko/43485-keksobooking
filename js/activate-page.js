'use strict';

(function () {
  var selects = document.querySelectorAll('select');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  window.activatePage = {
    activate: function () {
      map.classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
      }
      for (i = 0; i < fieldset.length; i++) {
        fieldset[i].disabled = false;
      };
      window.setAddressValues();
      window.pin.createFragmentPins(window.data.OFFERS);
      mapPinMain.removeEventListener('mousedown', window.activatePage.activate);
    }
  };
})();
