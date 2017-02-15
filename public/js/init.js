/**
 * Questo file contiene tutte le implementazioni jQuery mobile.
 * che contrastano con l'incapsulamento dello stack.
 * Gli eventi esclusivi di jQuery Mobile devono essere caricati in uno
 * scope globale.
 */

// Variabili Globali
// Salvataggio/Caricamento Impostazioni
let linguaPrec = null;
let lingua = null;
let dntPrec = null;
let dnt = null;
let cookiesPrec = null;
let cookies = null;

// FOUC Fix - Check-In
$(document).bind('pagecontainershow', () => {
  $('body').css('opacity', '1');
  controlloCheckIn();
});

// Impostazioni
$(document).bind('pagecontainerbeforechange', () => {
  impostazioni();
  salva();
});
$(document).bind('pagecreate', () => {
  salva();
});

/**
 * Controllo Checkin
 *
 * Gestisce le procedure di attivazione e disattivazione
 * della geolocalizzazione in base alle impostazioni selezionate
 */
function controlloCheckIn() {
  if (typeof(Storage) === 'undefined') {
    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
  } else {
    if ((window.localStorage.getItem('dntImpostazioni') === null) ||
    (window.localStorage.getItem('dntImpostazioni') === 'off')) {
      if ((window.localStorage.getItem('privacyGeo') === null)) {
        $('#checkin-pulsante').attr({
          'href': '#consenso',
          'data-rel': 'popup',
          'data-position-to': 'window',
          'data-transition': 'pop',
        });
      } else {
        $('#checkin-pulsante').attr('href', '#checkin-crea')
        .removeAttr('data-rel data-position-to data-transition');
      }
    } else {
      $('#checkin-pulsante').attr({
        'href': '#avviso-dnt',
        'data-rel': 'popup',
        'data-position-to': 'window',
        'data-transition': 'pop',
      });
    }
  }
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
        toast('Sistema anti-tracciamento disttivato');
      } else {
        toast('Sistema anti-tracciamento attivato');
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
