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
	  inizializza();
	  accedi();
	  aggiungiEsperienze();
	  eliminaEsperienze();
	  follow();
	  modificaProfilo();
	  multimediaPopup();
	  notifiche();
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
	  $(document).on('swipeleft', '[data-role="page"]', function (event) {
	    if (event.handled !== true) {
	      var nextPage = $(this).next('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      if (nextPage.length > 0 && id === 'start') {
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
	    if (event.handled !== true) {
	      var prevPage = $(this).prev('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      if (prevPage.length > 0 && id === 'tour-1') {
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
	 * Inizializzazione
	 *
	 * Gestisce le inizializzazioni degli elementi front-end.
	 */
	function inizializza() {
	  $('body').addClass('ui-alt-icon');
	  $('#menu-principale').panel();
	  $('#popup-notifiche').enhanceWithin().popup();
	}
	
	/**
	 * Accesso
	 *
	 * Gestisce le procedure di accesso dell'utente registrato.
	 * - Proprietario e opt-in;
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
	 * Aggiungi Esperienze
	 *
	 * Gestisce le funzionalità di aggiunta degli elementi descrittivi
	 * nel profilo utente
	 */
	function aggiungiEsperienze() {
	  $('[data-name="esperienze"]').on('vclick tap', function () {
	    $('#aggiungi-esperienza-popup h2').html('Aggiungi Esperienza');
	  });
	  $('[data-name="qualifiche"]').on('vclick tap', function () {
	    $('#aggiungi-esperienza-popup h2').html('Aggiungi Qualifica');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Elimina Esperienze
	 *
	 * Gestisce le funzionalità di cancellazione degli elementi descrittivi
	 * nel profilo utente
	 */
	function eliminaEsperienze() {
	  $('.elimina-esperienza').on('vclick tap', function () {
	    $(this).parents('.anagrafica-container').remove();
	    toast('Esperienza eliminata');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Follow
	 *
	 * Gestisce le funzionalità di feed di:
	 * - Profili;
	 * - Bacheche;
	 * - Varie ed eventuali;
	 */
	function follow() {
	  $('#segui-summary').on('vclick tap', function () {
	    $(this).addClass('seguito');
	    $(this).html('Seguito');
	    toast('Profilo seguito');
	    // TODO: Verificare condizione
	    /* if (!$(this).hasClass('seguito')) {
	      $(this).addClass('seguito');
	      $(this).html('Seguito');
	      toast('Profilo seguito');
	    } else {
	      $(this).removeClass('seguito');
	      $(this).html('Segui');
	      toast('Profilo rimosso');
	    }*/
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Modifica Profilo
	 *
	 * Gestisce la modifica dei dati personali
	 */
	function modificaProfilo() {}
	// TODO: Caricamento/Memorizzazione stato/dati su DB
	
	
	/**
	 * Multimedia - Popup
	 *
	 * Gestisce l'apertura dinamica di foto e video a tutto schermo
	 */
	function multimediaPopup() {
	  $('#multimedia a').on('vclick tap', function () {
	    var url = $('.foto-video', this).attr('data-url');
	    $('.multimedia-popup-foto').attr('src', url);
	    $('#multimedia-popup').removeClass('ui-overlay-shadow');
	  });
	  $('.like-popup a').on('vclick tap', function () {
	    // TODO: Verificare metodo - toggle buggato?
	    $('i', this).toggleClass('a fa-thumbs-up');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Notifiche
	 *
	 * Gestisce il sistema di notifiche.
	 * - Stati di ricezione e lettura;
	 * - Aspetto;
	 */
	function notifiche() {
	  /* TODO: Riattivare stati in fase back-end
	  * Output automatico dei messaggi di notifica in base all'azione
	  * Al trigger di un evento viene invocata la proprietà corrispondente
	  * e resa come testo in notifica.
	  * Legenda:
	  * evento -> .evento-notifica
	  ** like -> .social-keyword
	  * oggetto -> .oggetto-notifica
	  let stati = {
	    'evento': {
	      'azione': {
	        'messo': 'ha messo',
	        'like': 'mi piace'
	      },
	      'commento': 'ha commentato',
	      'valutazione': {
	        'voto': 'ti ha valutato'
	      },
	      'aggiornamento': 'ha aggiornato',
	      'pubblicazione': 'ha pubblicato',
	      'modifica': 'ha modificato',
	      'follow': {
	        'segue': 'ora segue',
	        'seguito': 'ti segue'
	      },
	      'messaggio': {
	        'ricevuto': 'ti ha mandato un messaggio'
	      }
	    },
	    'oggetto': {
	      'like-foto': 'alla tua foto',
	      'like-foto-utente': 'alla sua foto',
	      'like-video': 'al tuo video',
	      'like-video-utente': 'al suo video',
	      'commento-foto': 'la tua foto',
	      'commento-foto-utente': 'la sua foto',
	      'commento-video': 'il tuo video',
	      'commento-video-utente': 'il suo video',
	      'aggiornamento-avatar': 'la sua foto del profilo',
	      'aggiornamento-nome': 'il suo nome',
	      'aggiornamento-eta': 'la sua età',
	      'aggiornamento-citta': 'la sua città',
	      'pubblicazione-esperienza': 'una nuova esperienza',
	      'pubblicazione-qualifica': 'una nuova qualifica',
	      'pubblicazione-foto': 'una nuova foto',
	      'pubblicazione-video: 'un nuovo video',
	      'modifica-foto': 'una sua foto',
	      'modifica-video': 'un suo video'
	    }
	  };
	  */
	  $('.link-notifica[data-state="unread"] .notifica-container').addClass('sfondo-accento');
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
	  } else toast('Cookies disabilitati. Alcune funzioni sono disattivate');
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
	  } else toast('Cookies disabilitati. Alcune funzioni sono disattivate');
	}
	
	/**
	 * Toast
	 * @param {string} messaggio - Testo della notifica
	 * Gestisce le notifiche di sistema.
	 */
	function toast(messaggio) {
	  $('<div id="toast" ' + 'class="ui-loader ui-overlay-shadow ui-body-a ui-corner-all"><h3>' + messaggio + '</h3></div>').css({
	    'display': 'block',
	    'position': 'fixed',
	    'text-align': 'center',
	    'width': '270px',
	    'z-index': 9999,
	    'font-size': '.8rem',
	    'top': 'auto',
	    'left': '0',
	    'right': '0',
	    'margin': '0 auto',
	    'bottom': '2em' }).appendTo($.mobile.pageContainer).delay(1500).fadeOut(400, function () {
	    $(this).remove();
	  });
	}
	
	/**
	 * Valutazione
	 * Gestisce le interazioni con il sistema di valutazione utente:
	 * - Selezione e aspetto;
	 */
	function valutazione() {
	  $('.stella').hover(function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) {
	      $(this).addClass('stella-attiva');
	      $(this).prevAll().addClass('stella-attiva');
	    }
	  }, function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) $('.stella').removeClass('stella-attiva');
	  });
	  $('.stella').on('vclick tap', function () {
	    $('.stella').removeClass('stella-attiva stella-attiva-click');
	    $(this).addClass('stella-attiva stella-attiva-click');
	    $(this).prevAll().addClass('stella-attiva stella-attiva-click');
	    toast('Votazione effettuata');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
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