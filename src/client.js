import Video from 'Video';
import {auth} from 'Firebase';

// Variabili Globali
let linguaPrec = null;
let lingua = null;
let dntPrec = null;
let dnt = null;
let cookiesPrec = null;
let cookies = null;

// Main
$(document).ready(() => {
  console.log('document ready event');
  $('#carica').on('vclick', () => {
    console.log('#carica click event');
    let file = $('#video-input').get(0).files[0];
    Video.uploadTestVideo(file);
  });
  inizializza();
  accedi();
  aggiungiEsperienze();
  eliminaEsperienze();
  follow();
  impostazioni();
  modificaProfilo();
  multimediaPopup();
  notifiche();
  registrati();
  salta();
  splashScreen();
  valutazione();
});

// Opacità contenuti (FOUC Fix)
$(document).bind('pagecontainershow', () => {
  $('body').css('opacity', '1');
});

// Impostazioni
$(document).bind('pagecontainerbeforechange', '#impostazioni', function() {
  salva();
});
$(document).on('pagecreate', '#impostazioni', function() {
  document.addEventListener('ready', function() {
    opzioni();
    salva();
  }, false);
  $(document).bind('pagecontainerbeforechange', function() {
    salva();
  });
});

// Swipe
$(document).on('pagecreate', '.ui-page', () => {
  $(document).on('swipeleft', '[data-role="page"]', function(event) {
    if (event.handled !== true) {
      let nextPage = $(this).next('[data-role="page"]');
      let id = $.mobile.activePage.attr('id');
      if (nextPage.length > 0 && (id === 'start')) {
        $(':mobile-pagecontainer').pagecontainer('change', nextPage, {
          transition: 'slide',
          reverse: false,
        }, true, true);
        event.handled = true;
      }
    }
    return false;
  });
  $(document).on('swiperight', '[data-role="page"]', function(event) {
    if (event.handled !== true) {
      let prevPage = $(this).prev('[data-role="page"]');
      let id = $.mobile.activePage.attr('id');
      if (prevPage.length > 0 && (id === 'tour-1')) {
        $( ':mobile-pagecontainer' ).pagecontainer('change', prevPage, {
          transition: 'slide',
          reverse: true,
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
  console.log('accedi');
  $('#accedi-login').on('vclick tap', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
  });
  $('#accedi-facebook').on('vclick tap', () => {
    // TODO: Qui avviene l'invio delle informazioni a Facebook
  });
  $('#accedi-google').on('vclick', () => {
    console.log('provider');
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });
    auth.onAuthStateChanged((user) => {
      console.log('user');
      console.log(user);
    });
    auth.signInWithRedirect(provider);
    auth.getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
    }).catch(function(error) {
      console.log(error);
      // TODO: Handle Errors here.
    });
  });
}

/**
 * Aggiungi Esperienze
 *
 * Gestisce le funzionalità di aggiunta degli elementi descrittivi
 * nel profilo utente
 */
function aggiungiEsperienze() {
  $('[data-name="esperienze"]').on('vclick tap', function() {
    $('#aggiungi-esperienza-popup h2').html('Aggiungi Esperienza');
  });
  $('[data-name="qualifiche"]').on('vclick tap', function() {
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
  $('.elimina-esperienza').on('vclick tap', function() {
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
  $('#segui-summary').on('vclick tap', function() {
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
 * Impostazioni
 *@param {linguaPrec} linguaPrec - Impostazione lingua
 precedentemente selezionata;
 *@param {lingua} lingua - Lingua attiva;
 *@param {dntPrec} dntPrec - Impostazione anti-tracciamento
 precedentemente selezionata;
 *@param {dnt} dnt - Anti-tracciamento attivo;
 *@param {cookiesPrec} cookiesPrec -Impostazione cookies
 precedentemente selezionata;
 *@param {cookies} cookies - Cookies attivi;
 * Gestisce il caricamento ed il salvataggio delle opzioni disponibili.
 */
function impostazioni() {
  linguaPrec = $('#lingua option:selected').val();
  dntPrec = $('#dnt option:selected').val();
  cookiesPrec = $('#cookies_terze_parti option:selected').val();
  if (typeof(Storage) !== 'undefined') {
    if (window.localStorage.getItem('linguaImpostazioni') !== null) {
      lingua = window.localStorage.getItem('linguaImpostazioni');
    } else {
      // TODO: Cambiare path in produzione
      if (window.location === (('http://localhost:5000/index.html')
      || ('http://localhost:5000/index.html#impostazioni'))) {
        lingua = 'it';
      } else if (window.location === (('http://localhost:5000/index.html/index_en.html')
      || ('http://localhost:5000/index_en.html#impostazioni'))) {
        lingua = 'en';
      }
    }
    if (window.localStorage.getItem('dntImpostazioni') !== null) {
      dnt = window.localStorage.getItem('dntImpostazioni');
    } else {
      dnt = 'off';
    }
    if (window.localStorage.getItem('cookiesImpostazioni') !== null) {
      cookies = window.localStorage.getItem('cookiesImpostazioni');
    } else {
      cookies = 'off';
    }
    if (linguaPrec !== lingua) {
      $('#lingua option:selected').removeAttr('selected');
    }
    if (dntPrec !== dnt) {
      $('#dnt option:selected').removeAttr('selected');
    }
    if (cookiesPrec !== cookies) {
      $('#cookies_terze_parti option:selected').removeAttr('selected');
    }
    if ($('#lingua option[value="'+ lingua +'"]')
    .attr('selected') === undefined) {
      $('#lingua option[value="'+ lingua +'"]').attr('selected', 'selected');
    }
    if ($('#dnt option[value="'+ dnt +'"]').attr('selected') === undefined) {
      $('#dnt option[value="'+ dnt +'"]').attr('selected', 'selected');
    }
    if ($('#cookies_terze_parti option[value="'+ cookies +'"]')
    .attr('selected') === undefined) {
      $('#cookies_terze_parti option[value="'+ cookies +'"]')
      .attr('selected', 'selected');
    }
    if ($('#lingua option[value="'+ lingua +'"]:selected')
    .val() === 'on') {
      $('#lingua-menu a:contains("'+ lingua +'")')
      .addClass('ui-btn-active');
    } else {
      $('#lingua-menu a:contains("'+ lingua +'")')
      .removeClass('ui-btn-active');
    }
    if ($('#dnt option[value="'+ dnt +'"]:selected')
    .val() === 'on') {
      $('#dnt').parent('.ui-flipswitch').addClass('ui-flipswitch-active');
    } else {
      $('#dnt').parent('.ui-flipswitch').removeClass('ui-flipswitch-active');
    }
    if ($('#cookies_terze_parti option[value="'+ cookies +'"]:selected')
    .val() === 'on') {
      $('#cookies_terze_parti').parent('.ui-flipswitch')
      .addClass('ui-flipswitch-active');
    } else {
      $('#cookies_terze_parti').parent('.ui-flipswitch')
      .removeClass('ui-flipswitch-active');
    }
    $(document).on('change', '#lingua', function() {
      lingua = this.value;
      window.localStorage.setItem('linguaImpostazioni', lingua);
      if (window.localStorage.getItem('linguaImpostazioni') === 'it') {
        window.location = 'index.html#impostazioni';
      } else if (window.localStorage.getItem('linguaImpostazioni') === 'en') {
        window.location = 'index_en.html#impostazioni';
      }
    });
    $(document).on('change', '#dnt', function() {
      dnt = this.value;
      window.localStorage.setItem('dntImpostazioni', dnt);
    });
    $(document).on('change', '#cookies_terze_parti', function() {
      cookies = this.value;
      window.localStorage.setItem('cookiesImpostazioni', cookies);
    });
    if (window.localStorage.getItem('dntImpostazioni') !== null) {
      window.localStorage.removeItem('privacyGeo');
    }
  } else {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  }
}

/**
 * Modifica Profilo
 *
 * Gestisce la modifica dei dati personali
 */
function modificaProfilo() {
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Multimedia - Popup
 *
 * Gestisce l'apertura dinamica di foto e video a tutto schermo
 */
function multimediaPopup() {
  $('#multimedia a').on('vclick tap', function() {
    let url = $('.foto-video', this).attr('data-url');
    $('.multimedia-popup-foto').attr('src', url);
    $('#multimedia-popup').removeClass('ui-overlay-shadow');
  });
  $('.like-popup a').on('vclick tap', function() {
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
  $('.link-notifica[data-state="unread"] .notifica-container')
  .addClass('sfondo-accento');
}

/**
 * Registrazione
 *
 * Gestisce le procedure di registrazione dell'utente ospite.
 */
function registrati() {
  $('#registrati-login').on('vclick tap', () => {
    $(':mobile-pagecontainer').pagecontainer('change', '#registrazione', {
      transition: 'slide',
      reverse: false,
    }, true, true);
  });
  $('#registrati-signup').on('vclick tap', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
  });
}

/**
 * Salvataggio impostazioni
 *@param {dnt} dnt - Anti-tracciamento attivo;
 *@param {cookiesPrec} cookiesPrec -Impostazione cookies
 precedentemente selezionata;
 *@param {cookies} cookies - Cookies attivi;
 * Gestisce il salvataggio delle opzioni disponibili.
 */
function salva() {
  if (typeof(Storage) !== 'undefined') {
    window.localStorage.setItem('linguaImpostazioni', lingua);
    window.localStorage.setItem('dntImpostazioni', dnt);
    window.localStorage.setItem('cookiesImpostazioni', cookies);
  } else {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  }
}

/**
 * Salta tour iniziale
 *
 * Verifica se è il primo avvio od un successivo;
 * Determina la visualizzazione o l'oscuramento del tutorial iniziale.
 */
function salta() {
  if (typeof(Storage) !== 'undefined') {
    if (window.localStorage.getItem('tour') !== null) {
      $('.tour').remove();
    } else {
      $('#salta, #avvia').on('vclick tap', () => {
        window.localStorage.setItem('tour', 'disattivo');
      });
    }
  } else {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  }
}

/**
 * Splash Screen
 */
function splashScreen() {
  if (typeof(Storage) !== 'undefined') {
    if (window.localStorage.getItem('tour') !== null) {
      setTimeout(() => {
        $.mobile.changePage('#accesso', 'fade');
        $('#splash').remove();
      }, 3000);
    } else {
      setTimeout(() => {
        $.mobile.changePage('#start', 'fade');
        $('#splash').remove();
      }, 3000);
    }
  } else {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  }
}

/**
 * Toast
 * @param {string} messaggio - Testo della notifica
 * Gestisce le notifiche di sistema.
 */
function toast(messaggio) {
  $('<div id="toast" '+
  'class="ui-loader ui-overlay-shadow ui-body-a ui-corner-all"><h3>'
  +messaggio+'</h3></div>').css({
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
    'bottom': '2em'})
    .appendTo( $.mobile.pageContainer ).delay( 1500 ).fadeOut( 400, function() {
      $(this).remove();
    });
}

/**
 * Valutazione
 * Gestisce le interazioni con il sistema di valutazione utente:
 * - Selezione e aspetto;
 */
function valutazione() {
  $('.stella').hover(function() {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $(this).addClass('stella-attiva');
      $(this).prevAll().addClass('stella-attiva');
    }
  }, function() {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $('.stella').removeClass('stella-attiva');
    }
  });
  $('.stella').on('vclick tap', function() {
    $('.stella').removeClass('stella-attiva stella-attiva-click');
    $(this).addClass('stella-attiva stella-attiva-click');
    $(this).prevAll().addClass('stella-attiva stella-attiva-click');
    toast('Votazione effettuata');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}
