import Video from 'Video';

// Main
$(document).ready(() => {
  console.log('document ready event');
  $('#carica').on('vclick', () => {
    console.log('#carica click event');
    let file = $('#video-input').get(0).files[0];
    Video.uploadTestVideo(file);
  });
  $('body').addClass('ui-alt-icon');
  accedi();
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
  console.log('creata');
  $(document).on('swipeleft', '[data-role="page"]', (event) => {
    console.log('sx');
    if (event.handled !== true) {
      let nextPage = $(this).next('[data-role="page"]');
      let id = $.mobile.activePage.attr('id');
      console.log(nextPage + 'next -  ', id + ' id - ', 'catturato');
      if (nextPage.length > 0 && (id === 'start')) {
        console.log('cambio');
        $(':mobile-pagecontainer').pagecontainer('change', nextPage, {
          transition: 'slide',
          reverse: false,
        }, true, true);
        event.handled = true;
      }
    }
    return false;
  });
  $(document).on('swiperight', '[data-role="page"]', (event) => {
    console.log('dx');
    if (event.handled !== true) {
      let prevPage = $(this).prev('[data-role="page"]');
      let id = $.mobile.activePage.attr('id');
      console.log(prevPage + 'prev -  ', id + ' id - ', 'catturato');
      if (prevPage.length > 0 && (id === 'tour-1')) {
        console.log('cambio');
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
 * Valutazione
 * Gestisce le interazioni con il sistema di valutazione utente:
 * - Selezione e aspetto
 */
function valutazione() {
  $('.stella').hover(() => {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $('.stella').removeClass('stella-disattiva');
      $('.stella').addClass('stella-attiva');
      $(this).next().removeClass('stella-attiva');
      $(this).next().addClass('stella-disattiva');
    }
  }, () => {
    if (!$('.stella').hasClass('stella-attiva-click')) {
      $('.stella').removeClass('stella-attiva');
      $('.stella').addClass('stella-disattiva');
    }
  });
  $('.stella').on('vclick tap', () => {
    $(this).addClass('stella-attiva-click');
  });
}
