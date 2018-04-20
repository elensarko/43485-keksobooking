'use strict';

window.constants = {
  LOCATION_COORDINATES: {
    xMin: 300,
    xMax: 900,
    yMin: 150,
    yMax: 500
  },
  PIN_PROPORTIONS: {
    width: 50,
    heading: 70,
    imageWidth: 40,
    imageHeight: 40,
    mainPinWidth: 65,
    mainPinHeight: 65,
    pointerWidth: 10,
    pointerHeight: 22
  },
  DICTIONARY: {
    palace: {
      translate: 'Дворец',
      minPrice: 10000
    },
    flat: {
      translate: 'Квартира',
      minPrice: 1000
    },
    house: {
      translate: 'Дом',
      minPrice: 5000
    },
    bungalo: {
      translate: 'Лачуга',
      minPrice: 0
    }
  }
};
