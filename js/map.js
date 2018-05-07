'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');

  mapPinMainElement.addEventListener('mousedown', window.page.activate);

  var mapPinsElement = mapElement.querySelector('.map__pins');
  mapPinsElement.addEventListener('click', function (evt) {
    var element = evt.target;
    while (element && element.tagName !== 'BUTTON') {
      element = element.parentNode;
    }
    if (!element) {
      return;
    }
    if (typeof element.dataset.index === 'undefined') {
      return;
    }
    mapElement.insertBefore(window.card.render(window.data.OFFERS[element.dataset.index]), mapElement.children[1]);
  });

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var checkBoundaries = function (shift) {
      var coordinates = window.constants.LOCATION_COORDINATES;
      var pinHeight = window.constants.PIN_PROPORTIONS.mainPinHeight;
      var pinWidth = window.constants.PIN_PROPORTIONS.mainPinWidth;
      var pointerHeight = window.constants.PIN_PROPORTIONS.pointerHeight;

      if (mapPinMainElement.offsetTop + shift.y + pinHeight + pointerHeight <= coordinates.yMin && shift.y < 0) {
        mapPinMainElement.style.top = coordinates.yMin - pinHeight - pointerHeight + 'px';
      }
      if (mapPinMainElement.offsetTop + shift.y + pinHeight + pointerHeight >= coordinates.yMax && shift.y > 0) {
        mapPinMainElement.style.top = coordinates.yMax - pinHeight - pointerHeight + 'px';
      }
      if (mapPinMainElement.offsetLeft + shift.x + pinWidth / 2 <= coordinates.xMin && shift.x < 0) {
        mapPinMainElement.style.left = coordinates.xMin - pinWidth / 2 + 'px';
      }
      if (mapPinMainElement.offsetLeft + shift.x + pinWidth / 2 >= coordinates.xMax && shift.x > 0) {
        mapPinMainElement.style.left = coordinates.xMax - pinWidth / 2 + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMainElement.style.top = (mapPinMainElement.offsetTop + shift.y) + 'px';
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft + shift.x) + 'px';

      checkBoundaries(shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.setAddressValues();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
