'use strict';

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
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 150;
var LOCATION_Y_MAX = 500;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
var WIDTH_PIN_IMAGE = 40;
var HEIGHT_PIN_IMAGE = 40;
var WIDTH_AVATAR_IMAGE = 70;
var HEIGHT_AVATAR_IMAGE = 70;
var WIDTH_PHOTO = 45;
var HEIGHT_PHOTO = 40;

var dictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var addZero = function (number) {
  return number < 10 ? '0' + number : number;
};

var changeItem = function (array, i, j) {
  var x = array[i];
  array[i] = array[j];
  array[j] = x;
};

var copyArr = function (arr) {
  var photos = [];
  for (var j = 0; j < arr.length; j++) {
    photos[j] = arr[j];
  }
  return photos;
};

var shuffle = function (arr) {
  for (var j = 0; j < arr.length; j++) {
    var k = randomNumber(0, arr.length - 1);
    changeItem(arr, j, k);
  }
  return arr;
};

var renderArr = function () {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    var location = {
      x: randomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      y: randomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };

    arr[i] = {
      author: {
        avatar: 'img/avatars/user' + addZero(i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLE[randomNumber(0, OFFER_TITLE.length - 1)],
        address: location.x + ', ' + location.y,
        price: randomNumber(PRICE_MIN, PRICE_MAX),
        type: OFFER_TYPE[randomNumber(0, OFFER_TYPE.length - 1)],
        rooms: randomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: randomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: OFFER_CHECKIN[randomNumber(0, OFFER_CHECKIN.length - 1)],
        checkout: OFFER_CHECKOUT[randomNumber(0, OFFER_CHECKOUT.length - 1)],
        features: OFFER_FEATURES.slice(0, randomNumber(0, OFFER_FEATURES.length - 1)),
        description: '',
        photos: shuffle(copyArr(OFFER_PHOTOS))
      },
      location: location
    };
  }
  return arr;
};

document.querySelector('.map').classList.remove('map--faded');

var makePinButton = function (tagName, className, type, pinX, pinY) {
  var x = pinX + WIDTH_PIN / 2;
  var y = pinY + HEIGHT_PIN;
  var style = 'left:' + x + 'px; top:' + y + 'px;';
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.type = type;
  element.style = style;
  return element;
};

var makeImage = function (tagName, src, alt, width, height) {
  var element = document.createElement(tagName);
  element.src = src;
  element.alt = alt;
  element.width = width;
  element.height = height;
  return element;
};

var renderPin = function (arr) {
  var pinButton = makePinButton('button', 'map__pin', 'button', arr.location.x, arr.location.y);
  var pinImg = makeImage('img', arr.author.avatar, arr.offer.title, WIDTH_PIN_IMAGE, HEIGHT_PIN_IMAGE);
  pinButton.appendChild(pinImg);
  return pinButton;
};

var pinList = document.querySelector('.map__pins');
var createFragmentPins = function () {
  var fragment = document.createDocumentFragment();
  var arr = renderArr();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  pinList.appendChild(fragment);
};

createFragmentPins();

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var renderCard = function (arr) {
  var cardItem = makeElement('article', 'map__card');

  var cardImg = makeImage('img', arr.author.avatar, 'Аватар пользователя', WIDTH_AVATAR_IMAGE, HEIGHT_AVATAR_IMAGE);
  cardImg.classList.add('popup__avatar');
  cardItem.appendChild(cardImg);

  var cardButtonClose = makeElement('button', 'popup__close');
  cardButtonClose.type = 'button';
  cardItem.appendChild(cardButtonClose);

  var cardTitle = makeElement('h4', 'popup__title', arr.offer.title);
  cardItem.appendChild(cardTitle);

  var cardTextAddress = makeElement('p', 'popup__text', arr.offer.address);
  cardTextAddress.classList.add('popup__text--address');
  cardItem.appendChild(cardTextAddress);

  var cardTextPrice = makeElement('p', 'popup__text', arr.offer.price + '₽/ночь');
  cardTextPrice.classList.add('popup__text--price');
  cardItem.appendChild(cardTextPrice);

  var cardType = makeElement('h4', 'popup__type', dictionary[arr.offer.type]);
  cardItem.appendChild(cardType);

  var cardCapacity = makeElement('p', 'popup__text', arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей');
  cardCapacity.classList.add('popup__text--capacity');
  cardItem.appendChild(cardCapacity);

  var cardTime = makeElement('p', 'popup__text', 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout);
  cardTime.classList.add('popup__text--time');
  cardItem.appendChild(cardTime);

  var cardFeatures = makeElement('ul', 'popup__features');
  cardItem.appendChild(cardFeatures);

  for (var i = 0; i < arr.offer.features.length; i++) {
    var cardFeature = makeElement('li', 'popup__feature');
    cardFeature.classList.add('popup__feature--' + arr.offer.features[i]);
    cardFeatures.appendChild(cardFeature);
  }

  var cardDescription = makeElement('p', 'popup__description', arr.offer.description);
  cardItem.appendChild(cardDescription);

  var cardPhotos = makeElement('div', 'popup__photos');
  cardItem.appendChild(cardPhotos);

  for (i = 0; i < arr.offer.photos.length; i++) {
    var cardPhoto = makeImage('img', arr.offer.photos[i], 'Фотография жилья', WIDTH_PHOTO, HEIGHT_PHOTO);
    cardPhoto.classList.add('popup__photo');
    cardPhotos.appendChild(cardPhoto);
  }

  return cardItem;
};

var card = document.querySelector('.map');
var createFragmentCard = function () {
  var fragment = document.createDocumentFragment();
  var arr = renderArr()[0];
  fragment.appendChild(renderCard(arr));
  card.insertBefore(fragment, card.children[1]);
};

createFragmentCard();
