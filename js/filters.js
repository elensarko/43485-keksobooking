'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };

  var mapFiltersElement = document.querySelector('.map__filters');

  mapFiltersElement.addEventListener('change', function () {
    window.pin.remove();
    window.card.closePopup();
    window.filters.updatePins(window.data.OFFERS);
  });

  var filterByValue = function (filteredOffers, element, property) {
    return filteredOffers.filter(function (offerData) {
      return offerData.offer[property].toString() === element.value;
    });
  };

  var filterByPrice = function (filteredOffers, priceFilter) {
    return filteredOffers.filter(function (offerData) {

      var priceFilterValues = {
        'middle': offerData.offer.price >= PRICES_TO_COMPARE.low && offerData.offer.price < PRICES_TO_COMPARE.high,
        'low': offerData.offer.price < PRICES_TO_COMPARE.low,
        'high': offerData.offer.price >= PRICES_TO_COMPARE.high
      };
      return priceFilterValues[priceFilter.value];
    });
  };

  var filterByFeatures = function (filteredOffers, item) {
    return filteredOffers.filter(function (offerData) {
      return offerData.offer.features.indexOf(item.value) >= 0;
    });
  };

  var updatePins = function (offers) {
    var filteredOffers = offers.slice();
    var selectorFilterElements = mapFiltersElement.querySelectorAll('select');
    var featuresFilterElements = mapFiltersElement.querySelectorAll('input[type=checkbox]:checked');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    if (selectorFilterElements.length !== null) {
      [].forEach.call(selectorFilterElements, function (item) {
        if (item.value === 'any') {
          return;
        }
        filteredOffers = (item.id !== 'housing-price') ? filterByValue(filteredOffers, item, FilterRules[item.id]) : filterByPrice(filteredOffers, item);
      });
    }

    if (featuresFilterElements !== null) {
      [].forEach.call(featuresFilterElements, function (item) {
        filteredOffers = filterByFeatures(filteredOffers, item);
      });
    }

    if (filteredOffers.length) {
      window.pin.create(filteredOffers);
    }
  };

  window.filters = {
    updatePins: window.util.debounce(updatePins, 500)
  };

})();
