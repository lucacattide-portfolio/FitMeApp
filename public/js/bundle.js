/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Video = __webpack_require__(1);
	
	var _Video2 = _interopRequireDefault(_Video);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Main
	$(document).ready(function () {
	  console.log('document ready event');
	  $('#carica').on('vclick', function () {
	    console.log('#carica click event');
	    var file = $('#video-input').get(0).files[0];
	    _Video2.default.uploadTestVideo(file);
	  });
	  $('body').addClass('ui-alt-icon');
	  accedi();
	  registrati();
	  salta();
	  splashScreen();
	  valutazione();
	});
	
	// Opacità contenuti (FOUC Fix)
	$(document).bind('pagecontainershow', function () {
	  $('body').css('opacity', '1');
	});
	
	// Swipe
	$(document).on('pagecreate', '.ui-page', function () {
	  console.log('creata');
	  $(document).on('swipeleft', '[data-role="page"]', function (event) {
	    console.log('sx');
	    if (event.handled !== true) {
	      var nextPage = $(undefined).next('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      console.log(nextPage + 'next -  ', id + ' id - ', 'catturato');
	      if (nextPage.length > 0 && id === 'start') {
	        console.log('cambio');
	        $(':mobile-pagecontainer').pagecontainer('change', nextPage, {
	          transition: 'slide',
	          reverse: false
	        }, true, true);
	        event.handled = true;
	      }
	    }
	    return false;
	  });
	  $(document).on('swiperight', '[data-role="page"]', function (event) {
	    console.log('dx');
	    if (event.handled !== true) {
	      var prevPage = $(undefined).prev('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      console.log(prevPage + 'prev -  ', id + ' id - ', 'catturato');
	      if (prevPage.length > 0 && id === 'tour-1') {
	        console.log('cambio');
	        $(':mobile-pagecontainer').pagecontainer('change', prevPage, {
	          transition: 'slide',
	          reverse: true
	        }, true, true);
	        event.handled = true;
	      }
	    }
	    return false;
	  });
	});
	
	/**
	 * Accesso
	 *
	 * Gestisce le procedure di accesso dell'utente registrato.
	 */
	function accedi() {
	  $('#accedi-login').on('vclick tap', function () {
	    // TODO: Qui avviene l'invio delle informazioni a firebase
	  });
	  $('#accedi-facebook').on('vclick tap', function () {
	    // TODO: Qui avviene l'invio delle informazioni a Facebook
	  });
	  $('#accedi-google').on('vclick tap', function () {
	    // TODO: Qui avviene l'invio delle informazioni a Google
	  });
	}
	
	/**
	 * Registrazione
	 *
	 * Gestisce le procedure di registrazione dell'utente ospite.
	 */
	function registrati() {
	  $('#registrati-login').on('vclick tap', function () {
	    $(':mobile-pagecontainer').pagecontainer('change', '#registrazione', {
	      transition: 'slide',
	      reverse: false
	    }, true, true);
	  });
	  $('#registrati-signup').on('vclick tap', function () {
	    // TODO: Qui avviene l'invio delle informazioni a firebase
	  });
	}
	
	/**
	 * Salta tour iniziale
	 *
	 * Verifica se è il primo avvio od un successivo;
	 * Determina la visualizzazione o l'oscuramento del tutorial iniziale.
	 */
	function salta() {
	  if (typeof Storage !== 'undefined') {
	    if (window.localStorage.getItem('tour') !== null) {
	      $('.tour').remove();
	    } else {
	      $('#salta, #avvia').on('vclick tap', function () {
	        window.localStorage.setItem('tour', 'disattivo');
	      });
	    }
	  } else {
	    $('cookies-alert').addClass('cookies-avviso');
	    $('cookies-alert').popup('open', {
	      transition: 'fade'
	    });
	    setTimeout(function () {
	      $('cookies-alert').popup('close');
	      $('cookies-alert').removeClass('cookies-avviso');
	    }, 3000);
	  }
	}
	
	/**
	 * Splash Screen
	 */
	function splashScreen() {
	  if (typeof Storage !== 'undefined') {
	    if (window.localStorage.getItem('tour') !== null) {
	      setTimeout(function () {
	        $.mobile.changePage('#accesso', 'fade');
	        $('#splash').remove();
	      }, 3000);
	    } else {
	      setTimeout(function () {
	        $.mobile.changePage('#start', 'fade');
	        $('#splash').remove();
	      }, 3000);
	    }
	  } else {
	    $('cookies-alert').addClass('cookies-avviso');
	    $('cookies-alert').popup('open', {
	      transition: 'fade'
	    });
	    setTimeout(function () {
	      $('cookies-alert').popup('close');
	      $('cookies-alert').removeClass('cookies-avviso');
	    }, 3000);
	  }
	}
	
	/**
	 * Valutazione
	 * Gestisce le interazioni con il sistema di valutazione utente:
	 * - Selezione e aspetto
	 */
	function valutazione() {
	  var _this = this;
	
	  $('.stella').hover(function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) {
	      $('.stella').removeClass('stella-disattiva');
	      $('.stella').addClass('stella-attiva');
	      $(_this).next().removeClass('stella-attiva');
	      $(_this).next().addClass('stella-disattiva');
	    }
	  }, function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) {
	      $('.stella').removeClass('stella-attiva');
	      $('.stella').addClass('stella-disattiva');
	    }
	  });
	  $('.stella').on('vclick tap', function () {
	    $(_this).addClass('stella-attiva-click');
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Firebase = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Video = function () {
	  function Video() {
	    _classCallCheck(this, Video);
	  }
	
	  _createClass(Video, null, [{
	    key: 'getVideo',
	    // eslint-disable-line
	    value: function getVideo() {// eslint-disable-line
	    }
	  }, {
	    key: 'uploadTestVideo',
	    value: function uploadTestVideo(file) {
	      // eslint-disable-line
	      console.log('uploadTestVideo');
	
	      var testVideoEntry = _Firebase.db.ref('test-videos').push({
	        uploadedAt: _Firebase.TIMESTAMP,
	        originalFilename: 'test-video.mp4',
	        status: 'incomplete'
	      });
	
	      var testVideoKey = testVideoEntry.key;
	      console.log('testVideoKey:' + testVideoKey);
	      var testVideoRef = _Firebase.store.ref('/videos/' + testVideoKey);
	      testVideoRef.put(file).then(function (snapshot) {
	        // eslint-disable-line
	        console.log('Updating record');
	        testVideoEntry.update({
	          status: 'complete'
	        }, function () {
	          console.log('Record updated');
	        });
	      });
	
	      return testVideoKey;
	    }
	
	    /*
	    TODO: dal getter viene restituito un JSON
	    riadattare se necessario i parametri
	    */
	
	  }, {
	    key: 'setTestVideoData',
	    value: function setTestVideoData(uuid) {
	      // eslint-disable-line
	      console.log('setTestVideoData');
	      _Firebase.db.ref('test-video').set({
	        uuid: uuid
	      });
	    }
	  }]);
	
	  return Video;
	}();
	
	exports.default = Video;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var firebaseConfig = {
	  apiKey: 'AIzaSyAssBBEv9KKOeqH0lFVDemuC5FE21-i8lo',
	  authDomain: 'fitmeapp-64482.firebaseapp.com',
	  databaseURL: 'https://fitmeapp-64482.firebaseio.com',
	  storageBucket: 'fitmeapp-64482.appspot.com',
	  messagingSenderId: '407537037152'
	};
	
	firebase.initializeApp(firebaseConfig);
	
	var store = firebase.storage();
	var db = firebase.database();
	var TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;
	// const fileRef = ref.child('test-video.avi');
	
	exports.db = db;
	exports.store = store;
	exports.TIMESTAMP = TIMESTAMP;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map