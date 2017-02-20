import Video from 'Video';
import {auth, db} from 'Firebase';

// Variabili Globali
// Check-In
let durata = null;
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
  aggiornaMappa();
  aggiungiEsperienze();
  cercaAllenamenti();
  chat();
  classifica();
  controlloCookies();
  creaAllenamenti();
  eliminaEsperienze();
  follow();
  // impostazioni();
  modificaProfilo();
  multimediaPopup();
  notifiche();
  post();
  registrati();
  salta();
  splashScreen();
  valutazione();
});

// TODO: Spostare nell'apposita funzione quando pronta
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
  $('body').addClass('ui-alt-icon');
  $('#menu-principale').panel();
  $('#popup-notifiche').enhanceWithin().popup();
  $('#pubblica').hashtags();
  $('.classifica-griglia li a .valutazione span')
  .addClass('stella-attiva-profilo');
}

/**
 * Accesso
 *
 * Gestisce le procedure di accesso dell'utente registrato.
 * - Proprietario e opt-in;
 */
function accedi() {
  console.log('accedi');
  auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged');
    // [START_EXCLUDE silent]
    // document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      console.log('user: ' + user.email + ' = ' + user.uid);
      bacheca();

      // User is signed in.
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;
      // [START_EXCLUDE silent]
// document.getElementById('quickstart-sign-in-status').textContent = 'S. in';
// document.getElementById('quickstart-sign-in').textContent = 'Sign out';
// document.getElementById('quickstart-account-details').textContent =
// JSON.stringify(user, null, '  ');
      $.mobile.changePage('#bacheca', 'fade');
    } else {
      console.log('no user');
      // location.href = '#accedi';
      $.mobile.changePage('#accesso', 'fade');
      // User is signed out.
      // [START_EXCLUDE silent]
// document.getElementById('quickstart-sign-in-status').textContent = 'S. out';
// document.getElementById('quickstart-sign-in').textContent = 'Sign in';
// document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    // document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
  });

  $('#signout').on('vclick', () => {
    auth.signOut();
  });

  $('#accedi-login').on('vclick', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
    const user = $('#username-login').val();
    console.log(user);
    const password = $('#password-login').val();
    firebase.auth().signInWithEmailAndPassword(user, password)
      .catch(function(error) {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
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
    auth.signInWithRedirect(provider);
    auth.getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      // const user = result.user;
    }).catch(function(error) {
      console.log(error);
      // TODO: Handle Errors here.
    });
  });
}

/**
 * Aggiorna Mappa
 *
 * Gestisce le funzionalità di caricamento della mappa
 */
function aggiornaMappa() {
  $('#aggiorna-mappa').on('vclick', () => {
    google.maps.event.trigger(mappa, 'resize');
    toast('Mappa aggiornata');
  });
}

/**
 * Aggiungi Esperienze
 *
 * Gestisce le funzionalità di aggiunta degli elementi descrittivi
 * nel profilo utente
 * - url: localhost non è consentito. Verificare in produzione
 */
function aggiungiEsperienze() {
  $('[data-name="esperienze"]').on('vclick', function() {
    $('#aggiungi-esperienza-popup h2').html('Aggiungi Esperienza');
  });
  $('[data-name="qualifiche"]').on('vclick', function() {
    $('#aggiungi-esperienza-popup h2').html('Aggiungi Qualifica');
  });
  $(document).on('submit', '#form-aggiungi-popup', () => {
    if ($('#form-aggiungi-popup input[required]').val().length > 0) {
      $.ajax({
        type: 'POST',
        async: 'true',
        url: window.location.href + '#profilo',
        data: $('#form-aggiungi-popup').serializeArray(),
        beforeSend: function() {
          $.mobile.loading('show');
        },
        complete: function() {
          $.mobile.loading('hide');
        },
        success: function(response) {
          $(''+
          '<div id="alfa" class="ui-body sfondo-primario'+
          'anagrafica-container">'+
          '<div class="ui-grid-a anagrafica">'+
          '<div class="ui-block-a deseleziona">'+
          '<span class="evidenza">'+
          response[0].titolo +
          '</span>'+
          '<p class="palestra-esperienza">'+
          response[0].presso +
          '</p>'+
          '</div>'+
          '<div class="ui-block-b anno-esperienza">'+
          '<span>'+
          response[0].data +
          '</span>'+
          '<span href="#"'+
          'class="ui-btn ui-shadow ui-corner-all ui-icon-delete'+
          'ui-btn-icon-notext elimina-esperienza">'+
          '</span>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '').insertAfter('.esperienze .titolo-sezione');
          toast('Esperienza aggiunta');
          $('#form-aggiungi-popup').each(() => {
            $(this).reset();
          });
        },
        error: function(error) {
          toast('Errore: '+ error +' - Impossibile aggiungere esperienza');
        },
      });
    } else {
      toast('Errore: compilare i campi richiesti');
    }
    return false;
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Allenamenti - Callback
 * Gestisce le procedure di invocazione dei rispettivi
 * marker per ogni utente.
 * @param {results} results - Oggetto Collezione Markers
 */
window.allenamentiCallback = function(results) {
  for (let i = 0; i < results.features.length; i++) {
    let coords = results.features[i].geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    /**
     * TODO: Decommentare in fase di integrazione DB.
     * Stampa automaticamente le stelle in base alla proprietà 'valutazione'
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
    */
    let contatta = null;
    if (results.features[i].properties.contatta === true) {
      contatta = '<a id="contatta-chat" href="#chat" '+
      'class="contatta-info ui-btn ui-btn-inline">CONTATTA</a>';
    } else {
      contatta = '';
    }
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<div id="bodyContent">'+
    '<div class="container-info">'+
    '<div class="container-avatar-info"'+
    ' style="background-image: url('+
    results.features[i].properties.avatar +
    ');"></div>'+
    '<div class="container-user-info">'+
    '<h2 class="nome-info">'+
    results.features[i].properties.nome +' '+
    results.features[i].properties.cognome +
    '</h2>'+
    '<span class="titolo-info">'+
    results.features[i].properties.tipo +
    '</span>'+
    '<div class="valutazione">'+
    // TODO: Eliminare in fase di integrazione DB
    '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
    '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
    '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
    '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
    '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
    /**
     * TODO: Decommentare in fase di integrazione DB
     * Stampa automaticamente le stelle in base alla proprietà 'valutazione'
    stelle +
    */
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
    contatta +
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 220,
      minHeight: 186,
    });
    let marker = creaMarker(latLng, mappa,
    results.features[i].properties.indirizzo);
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
 * Classifica
 *
 * Gestisce le procedure di:
 * - Caricamento dei dati relativi ai profili degli utenti,
 * ordinati in base alla valutazione;
 * - Filtraggio dei risultati caricati, in base ai criteri
 * selezionati.
 */
function classifica() {
  // TODO: Caricamento/Memorizzazione stato/dati su DB
  $('.filtra-valutazione').change(function() {
    if ($(this).is(':checked')) {
      toast('Contenuti filtrati');
    }
  });
  $('.filtra-valutazione').on('vclick', () => {
    // TODO: Caricamento per 'valutazione'
  });
  $('.filtra-like').change(function() {
    if ($(this).is(':checked')) {
      toast('Contenuti filtrati');
    }
  });
  $('.filtra-like').on('vclick', () => {
    // TODO: Caricamento per 'valutazione'
  });
}

/**
 * Controllo Cookies
 *
 * Gestisce le procedure di disattivazione dei servizi di tracciamento:
 * - Cookies tecnici (autenticazione, ecc.);
 * - Google Analytics, tracking cookies, ecc.
 */
function controlloCookies() {
  /**
   * TODO: In futuro, con l'implementazione di tali risorse, gestire la
   * disattivazione di tali servizi, in base al controllo sullo stato della
   * relativa impostazione
   */
  if (typeof(Storage) !== 'undefined') {
    if (window.localStorage.getItem('cookiesImpostazioni') !== null) {
      // Disattiva Cookies
    }
  } else {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  }
}

/**
 * Cerca Allenamenti
 *
 * Gestisce le procedure di ricerca e filtraggio degli allenamenti attivi,
 * in base ai criteri selezionati
 */
function cercaAllenamenti() {
  $(document).on('submit', '#checkin-form', (e) => {
    e.preventDefault();
    for (let i = 0; i < markers.length; i++) {
      if ($('#categoria-checkin').val() !==
        markers[i].address) {
        // let marker = markers[i].address;
        // TODO: da debuggare - decommenta per errore -> marker.setMap(null);
      }
      if ($('#citta-checkin').val() !==
      markers[i].latLng) {
        // let marker = markers[i].latLng;
        // TODO: da debuggare - decommenta per errore -> marker.setMap(null);
      }
      /**
       * TODO: Implementare la condizione per la distanza
       * (dipende dal marker dell'allenamento dell'utente utilizzatore)
       * let markerUtente = <oggetto marker restituito>
       * let distanza =
       * google.maps.geometry.spherical
       * .computeDistanceBetween(markerUtente.coordinate,
       * $('#distanza-checkin').val());
       */
    }
    toast('Trovati' + $('#container-info').length + 'allenamenti');
    return false;
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Chat
 *
 * Gestisce le procedure di ricezione ed invio dei messaggi
 * tra gli utenti
 */
function chat() {
  $('#scrivi-summary, #contatta').on('vclick', (e) => {
    /** TODO: Implementare l'acquisizione dell'ID dei due utenti,
     * in modo da caricare successivamente la pagina con i rispettivi
     * accounts e le conversazioni precedenti.
     */
    e.preventDefault();
    $(':mobile-pagecontainer').pagecontainer('change', '#chat', {
      transition: 'slide',
      reverse: false,
    }, true, true);
  });
  $('#blocca-chat').on('vclick', () => {
    /**
     * TODO: Implementare il blocco dell'utente.
     * Sostituire 'nickname' col nome corrispondente
     */
    toast('Utente '+ $('.nickname.destinatario .nome-chat')
    .eq(0).text() +' bloccato');
  });
  $('#cancella-chat').on('vclick', () => {
    $('#chat .ui-body').remove();
    toast('Conversazione svuotata');
  });
  $(document).on('submit', '#invia-chat', () => {
    // TODO: Invocazione notifica
    notifiche('messaggio');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Crea Allenamenti
 *
 * Gestisce le procedure di aggiunta deu nuovi allenamenti sulla mappa
 * - url: localhost non è consentito. Verificare in produzione
 */
function creaAllenamenti() {
  $('#conferma').on('vclick', () => {
    if (typeof(Storage) !== 'undefined') {
      window.localStorage.setItem('privacyGeo', 'ok');
    } else {
      toast('Cookies disabilitati. Alcune funzioni sono disattivate');
    }
  });
  $(document).on('submit', '#form-checkin-crea', (e) => {
    e.preventDefault();
    if ($('#form-checkin-crea input[required]').val().length > 0) {
      durata = $('durata-checkin-crea').val();
      $.ajax({
        type: 'POST',
        async: 'true',
        url: window.location.href + '#checkin',
        data: $('#form-checkin-crea').serializeArray(),
        beforeSend: function() {
          $.mobile.loading('show');
        },
        complete: function() {
          $.mobile.loading('hide');
        },
        success: function(response) {
          allenamentiCallback.features.push(
            {
              'type': 'Feature',
              'properties': {
                // TODO: Sostituire inputs con dati dell'utente attivo da DB
                'avatar': '../img/avatar.png',
                'nome': 'Pippo',
                'cognome': 'Baudo',
                'tipo': 'Fitter',
                'valutazione': '3',
                'allenamento': response[0].categoria-checkin-crea,
                'indirizzo': response[0].localita-checkin-crea,
                'durata': response[0].durata-checkin-crea * 60000,
                'contatta': response[0].contatta-checkin-crea,
              },
              'geometry': {
                'type': 'Point',
                'coordinates': estraiCoordinate(response[0]
                .localita-checkin-crea),
              },
            }
          );
          $.mobile.changePage('#checkin', 'fade');
          toast('Allenamento creato');
          $('#form-checkin-crea').each(() => {
            $(this).reset();
          });
        },
        error: function(error) {
          toast('Errore: '+ error +' - Impossibile creare allenamento');
        },
      });
    } else {
      toast('Errore: compilare i campi richiesti');
    }
    return false;
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Crea Marker
 *
 * Gestisce le procedure di creazione e rimozione dinamica
 * dei marker della mappa
 * @param {latLng} latLng - Coordinate di posizione
 * @param {mappa} mappa - Oggetto mappa
 * @param {indirizzo} indirizzo - Indirizzo allenamento
 * @return {marker} marker - Oggetto Marker generato
 */
function creaMarker(latLng, mappa, indirizzo) {
  let marker = new google.maps.Marker({
    position: latLng,
    map: mappa,
    icon: '../img/marker-mappa.png',
    title: 'Allenamenti in corso',
    address: indirizzo,
  });
  markers.push(marker);
  if (durata !== null) {
    setTimeout(function() {
      marker.setMap(null);
      delete marker.position;
      delete marker.map;
      delete marker.icon;
      delete marker.title;
    }, durata);
  }
  return marker;
}

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
 * Estrai Coordinate
 *
 * Gestisce le funzionalità di estrazione di coordinate geografiche
 * a partire da un indirizzo
 * @param {localita} localita - Indirizzo inseito dall'utente
 */
function estraiCoordinate(localita) {
  let geocoder = new google.maps.Geocoder();
  let indirizzo = null;
  geocoder.geocode({
    'address': localita,
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      let latitudine = results[0].geometry.location.lat();
      let longitudine = results[0].geometry.location.lng();
      indirizzo = '['+ latitudine +', '+ longitudine +']';
    } else {
      toast('Errore: Impossibile localizzare il dispositivo');
    }
    return indirizzo;
  });
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
  // TODO: Invocazione notifica
  // notifiche();
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Modifica Profilo
 *
 * Gestisce la modifica dei dati personali
 * - url: localhost non è consentito. Verificare in produzione
 */
function modificaProfilo() {
  $(document).on('submit', '#form-modifica-profilo', () => {
    if ($('#form-modifica-profilo input[required]').val().length > 0) {
      $.ajax({
        type: 'POST',
        async: 'true',
        url: window.location.href + '#profilo',
        data: $('#form-modifica-profilo').serializeArray(),
        beforeSend: function() {
          $.mobile.loading('show');
        },
        complete: function() {
          $.mobile.loading('hide');
        },
        success: function(response) {
          $('#profilo .avatar').attr('style', 'background-image: url(img/'+
          response[0].avatar-modifica +
          '');
          $('#profilo .nome-profilo').html(response[0].nome-modifica);
          $('#profilo .sesso-profilo').html(response[0].sesso-modifica);
          $('#profilo .eta-profilo').html(response[0].eta-modifica);
          $('#profilo .citta-profilo').html(response[0].luogo-modifica);
          $.mobile.changePage('#profilo', 'fade');
          toast('Profilo aggiornato');
          $('#form-modifica-profilo').each(() => {
            $(this).reset();
          });
        },
        error: function(error) {
          toast('Errore: '+ error +' - Impossibile aggiornare il profilo');
        },
      });
    } else {
      toast('Errore: compilare i campi richiesti');
    }
    return false;
  });
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
    $('#multimedia-post-popup img, #multimedia-post-popup video').remove();
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
 * Gestisce il sistema di notifiche. Ogni azione che coinvolge un'interazione
 * con un'altro utente, genera una notifica.
 * - Stati di ricezione e lettura;
 * - Aspetto;
 * @param {tipo} tipo - Identifica il tipo di notifica:
 * - Nuovo messaggio;
 * - Tutto il resto;
 */
function notifiche(tipo) {
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
  */
  $('.link-notifica[data-state="unread"] .notifica-container')
  .addClass('sfondo-accento');
  if ($('.link-notifica[data-state="unread"]').length > 0) {
    $('<a href="#" class="notifica-badge ui-btn ui-corner-all'+
    'ui-btn-icon-notext ui-btn-b"></a>'
    +'').insertBefore('#notifiche-pulsante');
  }
  if (tipo === 'messaggio') {
    $('.notifica-badge').removeClass('ui-icon-star');
    $('.notifica-badge').addClass('ui-icon-comment');
  } else {
    $('.notifica-badge').removeClass('ui-icon-comment');
    $('.notifica-badge').addClass('ui-icon-star');
  }
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
  let placeholder = $('#pubblica').val();
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
      // TODO: Invocazione notifica
      // notifiche();
    }
  });
  $('.commenta').on('vclick', function() {
    $(this).addClass('opaco');
    $(this).parent().next().slideDown();
  });
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

  $(document).on('submit', '#form-post-bacheca', handlePostSubmitEvent);

  $(document).on('submit', '#form-post-commenti', (e) => {
    // TODO: Invocazione notifica
    e.preventDefault();
    // notifiche();
  });
  $(document).on('submit', '#form-ricerca', () => {
    // TODO: Implementare ricerca da DB
    toast('Ricerca effettuata');
  });
  $(document).on('submit', '#form-filtro-contenuti', () => {
    // TODO: Implementare filtro da DB
    toast('Contenuti filtrati');
  });
  $(document).on('pagecontainerchange', () => {
    $('.commenta').removeClass('opaco');
    $('.container-sfoglia-post, .commenti-bacheca').slideUp();
  });
}


/**
 * handlePostSubmitEvent - Sumbit a post
 *
 * @param  {type} e The event
 */
function handlePostSubmitEvent(e) {
  e.preventDefault();
  console.log($('#foto-post').val() === '');
  console.log(auth.currentUser.uid);
  const userRef = db.ref('user/' + auth.currentUser.uid);
  const postRef = db.ref('/post').push();
  console.log('postRef');
  console.log(postRef);
  const postId = postRef.key;
  console.log('postId ' + postId);

  let type = 'text';
  const post = {
    type: type,
    createdAt: new Date().getTime(),
    user: firebase.auth().currentUser.uid,
    userName: firebase.auth().currentUser.displayName,
    text: $('#pubblica').val(),
  };

  let postBroadcast = {};
  postBroadcast['/user/' + auth.currentUser.uid + '/feed/' + postId] = true;
  postBroadcast['/user/' + auth.currentUser.uid + '/posts/' + postId] = true;
  db.ref('user/' + auth.currentUser.uid + '/followers')
    .once('value', (data) => {
      console.log(data.val());
    });

  postRef.set(post, function(err) {
    if (err) {
      toast('Errore durante la creazione del post');
      return;
    }

    userRef.child('feed').child(postId).set(true);
    userRef.child('posts').child(postId).set(true);
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
    if (window.localStorage.getItem('tour') === null) {
      setTimeout(() => {
        $.mobile.changePage('#start', 'fade');
        $('#splash').remove();
      }, 3000);
    } else {
      setTimeout(() => {
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
      if ($(this).hasClass('stella-profilo')) {
        $(this).addClass('stella-attiva stella-attiva-profilo');
        $(this).prevAll().addClass('stella-attiva stella-attiva-profilo');
      } else {
        $(this).addClass('stella-attiva');
        $(this).prevAll().addClass('stella-attiva');
      }
    }
  }, function() {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $('.stella').removeClass('stella-attiva stella-attiva-profilo');
    }
  });
  $('.stella').on('vclick', function() {
    if ($(this).hasClass('stella-profilo')) {
      $('.stella')
      .removeClass('stella-attiva stella-attiva-profilo stella-attiva-click');
      $(this)
      .addClass('stella-attiva stella-attiva-profilo stella-attiva-click');
      $(this)
      .prevAll().addClass('stella-attiva stella-attiva-profilo'+
      ' stella-attiva-click');
    } else {
      $('.stella').removeClass('stella-attiva stella-attiva-click');
      $(this).addClass('stella-attiva stella-attiva-click');
      $(this).prevAll().addClass('stella-attiva stella-attiva-click');
    }
    toast('Votazione effettuata');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}


/**
 * bacheca - description
 *
 */
function bacheca() {
  console.log('displayName: ' + firebase.auth().currentUser.displayName);
  if (auth.currentUser) {
    const feedRef = db.ref('user/' + auth.currentUser.uid + '/feed');
    feedRef.limitToLast(15).on('child_added', addPostToFeedByKey);
  }
}

/**
 * addPostToFeedByKey - description
 *
 * @param  {DataSnapshot} postKey Post "stub"
 */
function addPostToFeedByKey(postKey) {
  console.log('addPostToFeedByKey ' + postKey.key);
  db.ref('post/' + postKey.key).once('value', addPostToFeed);
}

/**
 * addPostToFeed - description
 *
 * @param  {DataSnapshot} post Post data
 */
function addPostToFeed(post) {
  console.log('addPostToFeed');
  const postElement = $('#feed-container .post-container').first().clone();
  postElement.removeClass('template');
  postElement.attr('id', 'feed_post_' + post.key);
  postElement.find('.stato-update').html(post.val().text);
  postElement.find('.utente-post').html(post.val().userName);
  postElement.prependTo('#feed-container');
}
