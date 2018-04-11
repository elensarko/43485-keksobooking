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
var NUMBER_OF_CARDS = 8;
var LOCATION_COORDINATES = {
  xMin: 300,
  xMax: 900,
  yMin: 150,
  yMax: 500
};
var PIN_PROPORTIONS = {
  width: 50,
  heading: 70,
  imageWidth: 40,
  imageHeight: 40,
  mainPinWidth: 65,
  mainPinHeight: 65,
  pointerWidth: 10,
  pointerHeight: 22
};
var dictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
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
  for (var i = 0; i < NUMBER_OF_CARDS; i++) {
    var location = {
      x: randomNumber(LOCATION_COORDINATES.xMin, LOCATION_COORDINATES.xMax),
      y: randomNumber(LOCATION_COORDINATES.yMin, LOCATION_COORDINATES.yMax)
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
var OFFERS = renderArr();

var makePinButton = function (tagName, className, type, pinX, pinY, index) {
  var x = pinX - PIN_PROPORTIONS.width / 2;
  var y = pinY + PIN_PROPORTIONS.heading;
  var style = 'left:' + x + 'px; top:' + y + 'px;';
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.type = type;
  element.style = style;
  element.dataset.index = index;
  return element;
};

var makeImage = function (src, alt, width, height) {
  var element = document.createElement('img');
  element.src = src;
  element.alt = alt;
  element.width = width;
  element.height = height;
  return element;
};

var renderPin = function (arr, i) {
  var pinButton = makePinButton('button', 'map__pin', 'button', arr.location.x, arr.location.y, i);
  var pinImg = makeImage(arr.author.avatar, arr.offer.title, PIN_PROPORTIONS.imageWidth, PIN_PROPORTIONS.imageHeight);
  pinButton.appendChild(pinImg);
  return pinButton;
};

var pinList = document.querySelector('.map__pins');
var createFragmentPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i], i));
  }
  pinList.appendChild(fragment);
};

var similarCardTemplate = document.querySelector('#similar-card-template')
  .content
  .querySelector('.map__card');

var cardElement = similarCardTemplate.cloneNode(true);
var container = cardElement.querySelector('.popup__photos');
var templateImg = container.querySelector('.popup__photo').cloneNode(true);
container.querySelector('.popup__photo').remove();

var renderCard = function (arr) {

  cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
  cardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = dictionary[arr.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

  var feature = cardElement.querySelectorAll('.popup__feature');
  for (var i = arr.offer.features.length; i < feature.length; i++) {
    feature[i].style = 'display: none;';
  }

  cardElement.querySelector('.popup__description').textContent = arr.offer.description;

  container.innerHTML = '';
  for (i = 0; i < arr.offer.photos.length; i++) {
    var image = templateImg.cloneNode(true);
    image.src = arr.offer.photos[i];
    container.appendChild(image);
  }

  return cardElement;
};

var map = document.querySelector('.map');
var activatePage = function () {
  map.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (var i = 0; i < document.querySelectorAll('select').length; i++) {
    document.querySelectorAll('select')[i].disabled = false;
  }
  document.querySelector('fieldset').disabled = false;
  setAddressValues();
  createFragmentPins(OFFERS);
  mapPinMain.removeEventListener('mouseup', activatePage);
};

var mapPinMain = map.querySelector('.map__pin--main');
var inputAddress = document.querySelector('input[name=address]');
var setAddressValues = function () {
  var coordinatePinX = mapPinMain.offsetLeft + PIN_PROPORTIONS.mainPinWidth / 2;
  var coordinatePinY = mapPinMain.offsetTop;
  if (map.classList.contains('map--faded')) {
    coordinatePinY += PIN_PROPORTIONS.mainPinHeight / 2;
  } else {
    coordinatePinY += PIN_PROPORTIONS.mainPinHeight + PIN_PROPORTIONS.pointerHeight;
  }
  inputAddress.value = coordinatePinX + ', ' + coordinatePinY;
};

setAddressValues();

mapPinMain.addEventListener('mouseup', activatePage);

var mapPins = map.querySelector('.map__pins');
mapPins.addEventListener('click', function (evt) {
  var button = evt.target;
  while (button && button.tagName !== 'BUTTON') {
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

