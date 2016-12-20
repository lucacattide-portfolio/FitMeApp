import Video from 'Video';

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
  multimediaPopup();
  registrati();
  salta();
  splashScreen();
  valutazione();
});

// Opacità contenuti (FOUC Fix)
$(document).bind('pagecontainershow', () => {
  $('body').css('opacity', '1');
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
  $('#cookies-alert').enhanceWithin().popup();
  $('#popup-notifiche').enhanceWithin().popup();
}

/**
 * Accesso
 *
 * Gestisce le procedure di accesso dell'utente registrato.
 */
function accedi() {
  $('#accedi-login').on('vclick tap', () => {
    // TODO: Qui avviene l'invio delle informazioni a firebase
  });
  $('#accedi-facebook').on('vclick tap', () => {
    // TODO: Qui avviene l'invio delle informazioni a Facebook
  });
  $('#accedi-google').on('vclick tap', () => {
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
    toast('Esperienza eliminata.');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}

/**
 * Follow
 *
 * Gestisce le funzionalità di feed di profili, bacheche, varie ed eventuali
 */
function follow() {
  $('#segui-summary').on('vclick tap', function() {
    $(this).addClass('seguito');
    $(this).html('Seguito');
    toast('Profilo seguito.');
    /*
    TODO: Verificare condizione
    if ($(this).hasClass('seguito')) {
      $(this).addClass('seguito');
      $(this).html('Seguito');
      toast('Profilo seguito.')
    } else {
      $(this).removeClass('seguito');
      $(this).html('Segui');
      toast('Profilo rimosso.')
    }
    */
  });
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
    $(this).toggleClass('a fa-thumbs-up');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
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
 * Salta tour iniziale
 *
 * Verifica se è il primo avvio od un successivo;
 * Determina la visualizzazione o l'oscuramento del tutorial iniziale.
 */
function salta() {
  if (typeof(Storage) !== 'undefined')
    if (window.localStorage.getItem('tour') !== null) {
      $('.tour').remove();
    } else {
      $('#salta, #avvia').on('vclick tap', () => {
        window.localStorage.setItem('tour', 'disattivo');
      });
    }
  else {
    $('cookies-alert').addClass('cookies-avviso');
    $('cookies-alert').popup('open', {
      transition: 'fade',
    });
    setTimeout(() => {
      $('cookies-alert').popup('close');
      $('cookies-alert').removeClass('cookies-avviso');
    }, 3000);
  }
}

/**
 * Splash Screen
 */
function splashScreen() {
  if (typeof(Storage) !== 'undefined')
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
  else {
    $('cookies-alert').addClass('cookies-avviso');
    $('cookies-alert').popup('open', {
      transition: 'fade',
    });
    setTimeout(() => {
      $('cookies-alert').popup('close');
      $('cookies-alert').removeClass('cookies-avviso');
    }, 3000);
  }
}

/**
 * Toast
 * @param {string} messaggio - Testo della notifica
 * Gestisce le notifiche al volo in popup
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
 * - Selezione e aspetto
 */
function valutazione() {
  $('.stella').hover(function() {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $(this).addClass('stella-attiva');
      $(this).prevAll().addClass('stella-attiva');
    }
  }, function() {
    if (!$('.stella').hasClass('stella-attiva-click'))
      $('.stella').removeClass('stella-attiva');
  });
  $('.stella').on('vclick tap', function() {
    $('.stella').removeClass('stella-attiva stella-attiva-click');
    $(this).addClass('stella-attiva stella-attiva-click');
    $(this).prevAll().addClass('stella-attiva stella-attiva-click');
    toast('Votazione effettuata.');
  });
  // TODO: Caricamento/Memorizzazione stato/dati su DB
}
