'use strict';

(function () {
  var OFFER_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var NUMBER_OF_CARDS = 8;
  window.LOCATION_COORDINATES = {
    xMin: 300,
    xMax: 900,
    yMin: 150,
    yMax: 500
  };

  var renderArr = function () {
    var arr = [];
    for (var i = 0; i < NUMBER_OF_CARDS; i++) {
      var location = {
        x: window.util.randomNumber(LOCATION_COORDINATES.xMin, LOCATION_COORDINATES.xMax),
        y: window.util.randomNumber(LOCATION_COORDINATES.yMin, LOCATION_COORDINATES.yMax)
      };

      arr[i] = {
        author: {
          avatar: 'img/avatars/user' + window.util.addZero(i + 1) + '.png'
        },
        offer: {
          title: OFFER_TITLE[window.util.randomNumber(0, OFFER_TITLE.length - 1)],
          address: location.x + ', ' + location.y,
          price: window.util.randomNumber(PRICE_MIN, PRICE_MAX),
          type: OFFER_TYPE[window.util.randomNumber(0, OFFER_TYPE.length - 1)],
          rooms: window.util.randomNumber(ROOMS_MIN, ROOMS_MAX),
          guests: window.util.randomNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: OFFER_CHECKIN[window.util.randomNumber(0, OFFER_CHECKIN.length - 1)],
          checkout: OFFER_CHECKOUT[window.util.randomNumber(0, OFFER_CHECKOUT.length - 1)],
          features: OFFER_FEATURES.slice(0, window.util.randomNumber(0, OFFER_FEATURES.length - 1)),
          description: '',
          photos: window.util.shuffle(window.util.copyArr(OFFER_PHOTOS))
        },
        location: location
      };
    }
    return arr;
  };
  window.OFFERS = renderArr();
})();
