'use strict';

window.activatePage = (function () {
  var selects = document.querySelectorAll('select');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  return {
    activate: function () {
      map.classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
      }
      document.querySelector('fieldset').disabled = false;
      window.setAddressValues();
      window.pin.createFragmentPins(window.data.OFFERS);
      mapPinMain.removeEventListener('mousedown', window.activatePage.activate);
    }
};
})();
