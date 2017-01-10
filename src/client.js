import Video from 'Video';
import {auth} from 'Firebase';

// Variabili Globali
// Salvataggio
let linguaPrec = null;
let lingua = null;
let dntPrec = null;
let dnt = null;
let cookiesPrec = null;
let cookies = null;
// Check-In
let mappa = null;
// Milano
let defaultLatLng = new google.maps.LatLng(45.4626482, 9.0376489);
let latlng = null;
let indirizzo = null;
// let pulsante = null;
let timer = null;
let markers = [];

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
  allenamenti();
  eliminaEsperienze();
  follow();
  impostazioni();
  modificaProfilo();
  multimediaPopup();
  notifiche();
  post();
  registrati();
  salta();
  splashScreen();
  valutazione();
});

$(document).bind('pagecontainershow', () => {
  $('body').css('opacity', '1');
});

// Impostazioni
$(document).bind('pagecontainerbeforechange', '#impostazioni', function() {
  salva();
});
$(document).on('pagecreate', '#checkin', function() {
  document.addEventListener('ready', function() {
    allenamenti();
  }, false);
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
$(document).on('vclick', '#scrivi-summary', function() {
  $.mobile.changePage($(this).attr('href'), 'fade');
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
  let placeholder = $('#pubblica').val();
  $('body').addClass('ui-alt-icon');
  $('#menu-principale').panel();
  $('#popup-notifiche').enhanceWithin().popup();
  $('#pubblica').hashtags();
  $('#pubblica, .pubblica-commento').focus(function() {
    if ($(this).val() === placeholder) {
      $(this).val('');
      $(this).css('color', '#fff');
    }
  });
  $('#pubblica, .pubblica-commento').blur(function() {
    if ($(this).val() === '') {
      $(this).val(placeholder);
      $(this).css('color', '#3C3C3B');
    }
  });
  $('#ricerca-avanzata').on('vclick', (e) => {
    e.preventDefault();
    $('#ricerca-avanzata-container').slideDown();
  });
}

/**
 * Accesso
 *
 * Gestisce le procedure di accesso dell'utente registrato.
 * - Proprietario e opt-in;
 */
function accedi() {
  console.log('accedi');
  $('#accedi-login').on('vclick', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
  });
  $('#accedi-facebook').on('vclick', () => {
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
  $('[data-name="esperienze"]').on('vclick', function() {
    $('#aggiungi-esperienza-popup h2').html('Aggiungi Esperienza');
  });
  $('[data-name="qualifiche"]').on('vclick', function() {
    $('#aggiungi-esperienza-popup h2').html('Aggiungi Qualifica');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Allenamenti
 * Gestisce le procedure di inizializzazione e geolocalizzazione
 * dei dispositivi degli utenti:
 * - I dati dei marker sono estratti dal file 'allenamenti-callback'
 * @param {mappa} mappa - Oggetto mappa visualizzata
 */
function allenamenti() {
  mappa = new google.maps.Map(document.getElementById('mappa'), {
    zoom: 12,
    center: defaultLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  $('<script src="js/allenamenti-callback.js"></script>')
  .insertBefore('#maps-api');
  $('#aggiorna-mappa').on('vclick', () => {
    toast('Mappa aggiornata');
  });
}
window.allenamentiCallback = function(results) {
  for (let i = 0; i < results.features.length; i++) {
    let coords = results.features[i].geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    let valutazione = results.features[i].properties.valutazione;
    let stelle = null;
    switch (valutazione) {
    case 1:
      stelle = '<span class="stella stella-attiva"></span>';
      break;
    case 2:
      stelle = '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>';
      break;
    case 3:
      stelle = '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>';
      break;
    case 4:
      stelle = '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>';
      break;
    case 5:
      stelle = '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>'+
        '<span class="stella stella-attiva"></span>';
      break;
    default:
      stelle = null;
    }
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<div id="bodyContent">'+
    '<div class="container-info">'+
    '<div class="container-avatar-info"'+
    ' style="background-image: url(img/avatar-2.png);"></div>'+
    '<div class="container-user-info">'+
    '<h2 class="nome-info">'+
    results.features[i].properties.nome +' '+
    results.features[i].properties.cognome +
    '</h2>'+
    '<span class="titolo-info">Trainer</span>'+
    '<div class="valutazione">'+
    stelle +
    '</div>'+
    '</div>'+
    '<div class="container-training-info">'+
    '<div>Allenamento: '+
    '<span class="tipo-info evidenza">'+
    results.features[i].properties.allenamento +
    '</span></div>'+
    '<div>Presso: '+
    '<span class="indirizzo-info evidenza">'+
    results.features[i].properties.indirizzo +
    '</span></div>'+
    '</div>'+
    '<hr>'+
    '<div class="social-info">'+
    /* TODO: Questo like deve comparire in bacheca come un aggiornamento e
     * nelle notifiche dell'utente destinatario
     */
    '<a href="#" class="like-info"><i aria-hidden="true"></i> Mi piace</a>'+
    '<a href="#chat" class="contatta-info ui-btn ui-btn-inline">CONTATTA</a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 220,
      minHeight: 186,
    });
    let marker = new google.maps.Marker({
      position: latLng,
      map: mappa,
      title: 'Allenamenti in corso',
    });
    marker.addListener('click', function() {
      infowindow.open(mappa, marker);
    });
  }
  $(document).on('vclick', '.like-info', function() {
    if (!$('i', this).hasClass('fa fa-thumbs-up')) {
      $('i', this).addClass('fa fa-thumbs-up');
      $(this).addClass('opaco');
      toast('Hai messo mi piace al workout di '+
      $(this).parents('.container-info').find('.nome-info').text());
    } else {
      $('i', this).removeClass('fa fa-thumbs-up');
      $(this).removeClass('opaco');
    }
  });
  $(document).on('vclick', '.contatta-info', function() {
    $.mobile.changePage($(this).attr('href'), 'fade');
  });
};

/**
 * Elimina Esperienze
 *
 * Gestisce le funzionalità di cancellazione degli elementi descrittivi
 * nel profilo utente
 */
function eliminaEsperienze() {
  $('.elimina-esperienza').on('vclick', function() {
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
  $('#segui-summary').on('vclick', function() {
    if (!$(this).hasClass('seguito')) {
      $(this).addClass('seguito');
      $(this).html('Seguito');
      toast('Profilo seguito');
    } else {
      $(this).removeClass('seguito');
      $(this).html('Segui');
      toast('Profilo rimosso');
    }
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Impostazioni
 * @param {linguaPrec} linguaPrec - Impostazione lingua
 precedentemente selezionata;
 * @param {lingua} lingua - Lingua attiva;
 * @param {dntPrec} dntPrec - Impostazione anti-tracciamento
 precedentemente selezionata;
 * @param {dnt} dnt - Anti-tracciamento attivo;
 * @param {cookiesPrec} cookiesPrec -Impostazione cookies
 precedentemente selezionata;
 * @param {cookies} cookies - Cookies attivi;
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
        toast('Italiano selezionato');
      } else if (window.localStorage.getItem('linguaImpostazioni') === 'en') {
        window.location = 'index_en.html#impostazioni';
        toast('English selected');
      }
    });
    $(document).on('change', '#dnt', function() {
      dnt = this.value;
      window.localStorage.setItem('dntImpostazioni', dnt);
      if (!$(this).parent().hasClass('ui-flipswitch-active')) {
        toast('Sistema anti-tracciamento attivato');
      } else {
        toast('Sistema anti-tracciamento disattivato');
      }
    });
    $(document).on('change', '#cookies_terze_parti', function() {
      cookies = this.value;
      window.localStorage.setItem('cookiesImpostazioni', cookies);
      if (!$(this).parent().hasClass('ui-flipswitch-active')) {
        toast('Cookies disattivati');
      } else {
        toast('Cookies attivati');
      }
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
  $('#multimedia a').on('vclick', function() {
    let url = $('.foto-video', this).attr('data-url');
    $('.multimedia-popup-foto').attr('src', url);
    $('#multimedia-popup').removeClass('ui-overlay-shadow');
  });
  $('.multimedia-post').on('vclick', function() {
    let url = $('img', this).attr('src');
    // TODO: Inizializzare variabile con path video destinazione
    let urlVideo;
    $('#multimedia-post-popup img, #multimedia-post-popup video,').remove();
    if ($(this).attr('data-ext') === 'foto') {
      $('#multimedia-post-popup').append(
        '<img class="multimedia-popup-foto" src="'+ url +'" alt="">');
    } else if ($(this).attr('data-ext') === 'video') {
      $('#multimedia-post-popup video').remove();
      $('#multimedia-post-popup').append(
        '<video class="multimedia-popup-video" poster="'+
        url +'" type="video/mp4" controls>'+
        '<source src="'+ urlVideo +'"</source>'
        +'</video>');
    }
    $('#multimedia-post-popup').removeClass('ui-overlay-shadow');
  });
  $('.like-bacheca a:not(".commenta"), .like-popup a').on(
    'vclick', function() {
      $('i', this).toggleClass('fa fa-thumbs-up');
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
  */
  let stati = {
    'evento': {
      'azione': {
        'messo': 'ha messo',
        'like': 'mi piace',
      },
      'commento': 'ha commentato',
      'valutazione': {
        'voto': 'ti ha valutato',
      },
      'aggiornamento': 'ha aggiornato',
      'pubblicazione': 'ha pubblicato',
      'modifica': 'ha modificato',
      'follow': {
        'segue': 'ora segue',
        'seguito': 'ti segue',
      },
      'messaggio': {
        'ricevuto': 'ti ha mandato un messaggio',
      },
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
      'pubblicazione-video': 'un nuovo video',
      'modifica-foto': 'una sua foto',
      'modifica-video': 'un suo video',
    },
  };
  $('.link-notifica[data-state="unread"] .notifica-container')
  .addClass('sfondo-accento');
}

/**
 * Posting
 *
 * Gestisce le azioni di pubblicazione degli inputs degli utenti.
 * - Bacheca
 * -- Status;
 * -- Foto;
 * -- Video;
 * TODO: La gestione dei testi predefiniti dei post segue lo stesso sistema
 * utilizzato per le notifiche (vedi funzione).
 */
function post() {
  $('#post-foto-link').on('vclick', () => {
    $('#container-video-sfoglia').slideUp();
    $('#container-foto-sfoglia').slideDown();
  });
  $('#post-video-link').on('vclick', () => {
    $('#container-foto-sfoglia').slideUp();
    $('#container-video-sfoglia').slideDown();
  });
  $('.mi-piace').on('vclick', function() {
    if ($('i', this).hasClass('fa fa-thumbs-up')) {
      $(this).addClass('opaco');
      toast('Hai messo mi piace al post di ' +
      $(this).parents('.post-container')
      .find('.post-notifiche .utente-post').text());
    }
  });
  $('.commenta').on('vclick', function() {
    $(this).addClass('opaco');
    $(this).parent().next().slideDown();
  });
  $(document).on('pagecontainerchange', () => {
    $('.commenta').removeClass('opaco');
    $('.container-sfoglia-post, .commenti-bacheca').slideUp();
  });
}

/**
 * Registrazione
 *
 * Gestisce le procedure di registrazione dell'utente ospite.
 */
function registrati() {
  $('#registrati-login').on('vclick', () => {
    $(':mobile-pagecontainer').pagecontainer('change', '#registrazione', {
      transition: 'slide',
      reverse: false,
    }, true, true);
  });
  $('#registrati-signup').on('vclick', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
  });
}

/**
 * Salvataggio impostazioni
 * @param {dnt} dnt - Anti-tracciamento attivo;
 * @param {cookiesPrec} cookiesPrec -Impostazione cookies
 precedentemente selezionata;
 * @param {cookies} cookies - Cookies attivi;
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
      $('#salta, #avvia').on('vclick', () => {
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
  $('.stella').on('vclick', function() {
    $('.stella').removeClass('stella-attiva stella-attiva-click');
    $(this).addClass('stella-attiva stella-attiva-click');
    $(this).prevAll().addClass('stella-attiva stella-attiva-click');
    toast('Votazione effettuata');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}
