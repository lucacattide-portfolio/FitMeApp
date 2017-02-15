/**
 * Oggetto Marker (Allenamento)
 *
 * Ogni 'feature' rappresenta il marker di un allenamento nella mappa.
 * TODO: l'oggetto deve essere restituito da DB (JSON/JSONP)
 * con i seguenti attributi, previo salvataggio tramite check-in dell'utente:
 * - 'allenamento' viene caricato da DB a seconda della selezione
 * - nella creazione del check-in;
 * - 'indirizzo' è ottenuto convertendo le coordinate stesse
 * - (vedi geolocalizzazione inversa), caricato da DB a seconda della selezione
 * - nella creazione del check-in.
*/
allenamentiCallback({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'avatar': '../img/avatar.png',
        'nome': 'Tizio',
        'cognome': 'Caio',
        'tipo': 'trainer',
        'valutazione': '5',
        'allenamento': 'calisthenics',
        'indirizzo': 'Duomo di Milano',
        'durata': '',
        'contatta': true,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [45.4640976, 9.1919265],
      },
    },
    {
      'type': 'Feature',
      'properties': {
        'avatar': '../img/avatar-2.png',
        'nome': 'Sara',
        'cognome': 'Tipo',
        'tipo': 'fitter',
        'valutazione': '3',
        'allenamento': 'calisthenics',
        'indirizzo': 'Parco Ravizza, Milano',
        'durata': '',
        'contatta': false,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [45.4474196, 9.19251],
      },
    },
    {
      'type': 'Feature',
      'properties': {
        'avatar': '../img/avatar-6.png',
        'nome': 'Aldo',
        'cognome': 'Moro',
        'tipo': 'fitter',
        'valutazione': '4',
        'allenamento': 'body building',
        'indirizzo': 'Workout Milano, Milano',
        'durata': '',
        'contatta': true,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [45.4408559, 9.189975],
      },
    },
  ],
});
