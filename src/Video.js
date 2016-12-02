import {db} from 'Firebase';

class Video { // eslint-disable-line
  // Getter
  static getVideo() { // eslint-disable-line    
    // Setta un listener per ogni nuova selezione
    $('video-input').on('change', function() {
      // Dichiarazione ed assegnazione vettore file
      /*
      TODO: Trovare un'alternativa per utilizzare this.
      Linter rende errore su $(this)
      */
      let fileCaricato = $('video-input').get(0).files[0];
      // Dichiarazione ed assegnazione proprietà file
      let nomeVideo = fileCaricato.name;
      let tipoVideo = fileCaricato.type;
      let dimensioneVideo = fileCaricato.size;
      // Dichiarazione ed assegnazione oggetto video
      let video = {nomeVideo, tipoVideo, dimensioneVideo};
      return video; // Restituisce info video
    }, false);
  }
  // Setter
  /*
  TODO: dal getter viene restituito un JSON
  riadattare se necessario i parametri
  */
  static setTestVideoData(uuid) { // eslint-disable-line
    console.log('setTestVideoData');
    db.ref('test-video').set({
      uuid: uuid,
    });
  }

}

export default Video;
