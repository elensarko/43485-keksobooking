'use strict';

(function () {
  var selectElements = document.querySelectorAll('select');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormResetElement = adForm.querySelector('.ad-form__reset');

  var setDisabledValue = function (element, value) {
    [].forEach.call(element, function (item) {
      item.disabled = value;
    });
  };

  window.page = {
    activate: function () {
      mapElement.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      setDisabledValue(selectElements, false);
      setDisabledValue(fieldsetElements, false);

      window.form.setAddressValues();

      window.backend.request('https://js.dump.academy/keksobooking/data', 'GET', function (response) {
        response.forEach(function (offer, index) {
          offer.index = index;
        });
        window.data = {
          OFFERS: response
        };
        window.pin.create(window.data.OFFERS);
      });

      adFormResetElement.addEventListener('click', window.page.deactivate);
      mapPinMainElement.removeEventListener('mousedown', window.page.activate);
    },
    deactivate: function () {
      window.form.reset();

      adForm.classList.add('ad-form--disabled');

      setDisabledValue(selectElements, true);
      setDisabledValue(fieldsetElements, true);

      window.card.closePopup();
      window.pin.remove();
      window.pin.reset();
      mapElement.classList.add('map--faded');
      window.form.setAddressValues();

      adFormResetElement.removeEventListener('click', window.page.deactivate);
      mapPinMainElement.addEventListener('mousedown', window.page.activate);
    }
  };
})();
