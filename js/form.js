'use strict';

(function () {
  var TITLE_LENGTH_MAX = 30;
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var SHOW_MESSAGE_TIMEOUT = 3000;

  var pinProportions = window.constants.PIN_PROPORTIONS;
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('input[name=address]');
  var adFormElement = document.querySelector('.ad-form');
  var inputTitleElement = adFormElement.querySelector('input[name=title]');

  inputTitleElement.addEventListener('invalid', function () {
    if (inputTitleElement.validity.tooShort) {
      inputTitleElement.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (inputTitleElement.validity.tooLong) {
      inputTitleElement.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (inputTitleElement.validity.valueMissing) {
      inputTitleElement.setCustomValidity('Обязательное поле');
    } else {
      inputTitleElement.setCustomValidity('');
    }
  });

  inputTitleElement.addEventListener('input', function (evt) {
    var target = evt.target;
    // if (target.value.length < TITLE_LENGTH_MAX) {
    //   target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    // } else {
    //   target.setCustomValidity('');
    // }
    target.setCustomValidity(target.value.length < TITLE_LENGTH_MAX ? 'Заголовок должен состоять минимум из 30-ти символов' : '');
  });

  var dictionary = window.constants.Dictionary;
  var selectTypeElement = adFormElement.querySelector('select[name=type]');
  var inputPriceElement = adFormElement.querySelector('input[name=price]');

  var changeInputPrice = function () {
    inputPriceElement.setAttribute('min', dictionary[selectTypeElement.value].minPrice);
    inputPriceElement.placeholder = dictionary[selectTypeElement.value].minPrice;
  };

  selectTypeElement.addEventListener('change', function () {
    changeInputPrice();
  });

  inputPriceElement.addEventListener('invalid', function () {
    if (inputPriceElement.validity.rangeOverflow) {
      inputPriceElement.setCustomValidity('Цена превышает максимальное значение: ' + inputPriceElement.max);
    } else if (inputPriceElement.validity.rangeUnderflow) {
      inputPriceElement.setCustomValidity('Цена ниже минимального значения: ' + inputPriceElement.min);
    } else if (inputPriceElement.validity.valueMissing) {
      inputPriceElement.setCustomValidity('Обязательное поле');
    } else {
      inputPriceElement.setCustomValidity('');
    }
  });

  inputPriceElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (Number(target.value) < inputPriceElement.min) {
      target.setCustomValidity('Цена ниже минимального значения: ' + inputPriceElement.min);
    } else if (Number(target.value) > inputPriceElement.max) {
      target.setCustomValidity('Цена ' + target.value + ' превышает максимальное значение: ' + inputPriceElement.max);
    } else {
      target.setCustomValidity('');
    }
  });

  var selectTimeinElement = adFormElement.querySelector('select[name=timein]');
  var selectTimeoutElement = adFormElement.querySelector('select[name=timeout]');

  var changeSelection = function (arr1, arr2) {
    arr1.value = arr2.value;
  };

  selectTimeinElement.addEventListener('change', function () {
    changeSelection(selectTimeoutElement, selectTimeinElement);
  });

  selectTimeoutElement.addEventListener('change', function () {
    changeSelection(selectTimeinElement, selectTimeoutElement);
  });

  var selectRoomsElement = adFormElement.querySelector('select[name=rooms]');
  var selectCapacityElement = adFormElement.querySelector('select[name=capacity]');

  var changeSelectCapacity = function () {
    if (selectCapacityElement.options.length > 0) {
      [].forEach.call(selectCapacityElement.options, function (item) {
        item.selected = ROOMS_CAPACITY[selectRoomsElement.value][0] === item.value;
        item.disabled = ROOMS_CAPACITY[selectRoomsElement.value].indexOf(item.value) === -1;
      });
    }
  };

  selectRoomsElement.addEventListener('change', function () {
    changeSelectCapacity();
  });

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.request('https://js.dump.academy/keksobooking', 'POST', function () {
      window.page.deactivate();
      var successElement = document.querySelector('.success');
      successElement.classList.remove('hidden');
      setTimeout(function () {
        successElement.classList.add('hidden');
      }, SHOW_MESSAGE_TIMEOUT);
    }, function (response) {
      var errorMassage = document.createElement('div');
      errorMassage.style = 'margin: 0 auto; text-align: center; color: red;';
      errorMassage.style.fontSize = '16px';
      errorMassage.textContent = response + '. Попробуйте отправить форму еще раз.';
      adFormElement.insertAdjacentElement('beforeend', errorMassage);
      setTimeout(function () {
        errorMassage.parentNode.removeChild(errorMassage);
      }, SHOW_MESSAGE_TIMEOUT);
    }, new FormData(adFormElement));
    evt.preventDefault();
  });

  window.form = {
    setAddressValues: function () {
      var coordinatePinX = mapPinMainElement.offsetLeft + pinProportions.mainPinWidth / 2;
      var coordinatePinY = mapPinMainElement.offsetTop;
      if (mapElement.classList.contains('map--faded')) {
        coordinatePinY += pinProportions.mainPinHeight / 2;
      } else {
        coordinatePinY += pinProportions.mainPinHeight + pinProportions.pointerHeight;
      }
      inputAddressElement.value = Math.floor(coordinatePinX) + ', ' + Math.floor(coordinatePinY);
    },
    reset: function () {
      adFormElement.reset();
      changeSelectCapacity();
      window.form.setAddressValues();
    }
  };

  window.form.setAddressValues();
})();
