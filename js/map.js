'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', activatePage);

  var mapPins = map.querySelector('.map__pins');
  mapPins.addEventListener('click', function (evt) {
    var button = evt.target;
    while (button && button.tagName.toLowerCase() !== 'button') {
      button = evt.target.parentNode;
    }
    if (!button) {
      return;
    }
    if (typeof button.dataset.index === 'undefined') {
      return;
    }
    map.insertBefore(renderCard(OFFERS[button.dataset.index]), map.children[1]);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetTop - shift.y < LOCATION_COORDINATES.yMin - PIN_PROPORTIONS.mainPinHeight - PIN_PROPORTIONS.pointerHeight) {
        mapPinMain.style.top = LOCATION_COORDINATES.yMin - PIN_PROPORTIONS.mainPinHeight - PIN_PROPORTIONS.pointerHeight + 'px';
      }
      if (mapPinMain.offsetTop - shift.y > LOCATION_COORDINATES.yMax + PIN_PROPORTIONS.mainPinHeight / 2 + PIN_PROPORTIONS.pointerHeight) {
        mapPinMain.style.top = LOCATION_COORDINATES.yMax + PIN_PROPORTIONS.mainPinHeight / 2 + PIN_PROPORTIONS.pointerHeight + 'px';
      }
      if (mapPinMain.offsetLeft - shift.x < LOCATION_COORDINATES.xMin - PIN_PROPORTIONS.mainPinWidth / 2) {
        mapPinMain.style.left = LOCATION_COORDINATES.xMin - PIN_PROPORTIONS.mainPinWidth / 2 + 'px';
      }
      if (mapPinMain.offsetLeft - shift.x > LOCATION_COORDINATES.xMax - PIN_PROPORTIONS.mainPinWidth / 2) {
        mapPinMain.style.left = LOCATION_COORDINATES.xMax - PIN_PROPORTIONS.mainPinWidth / 2 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddressValues();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
