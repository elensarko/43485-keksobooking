'use strict';

(function () {
  var TITLE_LENGTH_MAX = 30;
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var pinProportions = window.constants.PIN_PROPORTIONS;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('input[name=address]');
  var adForm = document.querySelector('.ad-form');
  var inputTitle = adForm.querySelector('input[name=title]');

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < TITLE_LENGTH_MAX) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var dictionary = window.constants.Dictionary;
  var selectType = adForm.querySelector('select[name=type]');
  var inputPrice = adForm.querySelector('input[name=price]');

  var changeInputPrice = function () {
    inputPrice.setAttribute('min', dictionary[selectType.value].minPrice);
    inputPrice.placeholder = dictionary[selectType.value].minPrice;
  };

  selectType.addEventListener('change', function () {
    changeInputPrice();
  });

  inputPrice.addEventListener('invalid', function () {
    if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity('Цена превышает максимальное значение: ' + inputPrice.max);
    } else if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity('Цена ниже минимального значения: ' + inputPrice.min);
    } else if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
    }
  });

  inputPrice.addEventListener('input', function (evt) {
    var target = evt.target;
    if (Number(target.value) < inputPrice.min) {
      target.setCustomValidity('Цена ниже минимального значения: ' + inputPrice.min);
    } else if (Number(target.value) > inputPrice.max) {
      target.setCustomValidity('Цена ' + target.value + ' превышает максимальное значение: ' + inputPrice.max);
    } else {
      target.setCustomValidity('');
    }
  });

  var selectTimein = adForm.querySelector('select[name=timein]');
  var selectTimeout = adForm.querySelector('select[name=timeout]');

  var changeSelection = function (arr1, arr2) {
    arr1.value = arr2.value;
  };

  selectTimein.addEventListener('change', function () {
    changeSelection(selectTimeout, selectTimein);
  });

  selectTimeout.addEventListener('change', function () {
    changeSelection(selectTimein, selectTimeout);
  });

  var selectRooms = adForm.querySelector('select[name=rooms]');
  var selectCapacity = adForm.querySelector('select[name=capacity]');

  var changeSelectCapacity = function () {
    if (selectCapacity.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[selectRooms.value][0] === item.value) ? true : false;
        item.disabled = (ROOMS_CAPACITY[selectRooms.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };

  selectRooms.addEventListener('change', function () {
    changeSelectCapacity();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.request('https://js.dump.academy/keksobooking', 'POST', function () {
      window.page.deactivate();
      var success = document.querySelector('.success');
      success.classList.remove('hidden');
    }, function (response) {
      var errorMassage = document.createElement('div');
      errorMassage.style = 'margin: 0 auto; text-align: center; color: red;';
      errorMassage.style.fontSize = '16px';
      errorMassage.textContent = response + '. Попробуйте отправить форму еще раз.';
      adForm.insertAdjacentElement('beforeend', errorMassage);
      setTimeout(function () {
        errorMassage.parentNode.removeChild(errorMassage);
      }, 3000);
    }, new FormData(adForm));
    evt.preventDefault();
  });

  var adFormReset = adForm.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', window.page.deactivate);

  window.form = {
    setAddressValues: function () {
      var coordinatePinX = mapPinMain.offsetLeft + pinProportions.mainPinWidth / 2;
      var coordinatePinY = mapPinMain.offsetTop;
      if (map.classList.contains('map--faded')) {
        coordinatePinY += pinProportions.mainPinHeight / 2;
      } else {
        coordinatePinY += pinProportions.mainPinHeight + pinProportions.pointerHeight;
      }
      inputAddress.value = Math.floor(coordinatePinX) + ', ' + Math.floor(coordinatePinY);
    },
    resetAdForm: function () {
      adForm.reset();
      window.form.setAddressValues();
    }
  };

  window.form.setAddressValues();
})();
