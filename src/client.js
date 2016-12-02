import Video from 'Video';

// fileRef.put(file).then(function(snapshot) {
//   console.log('Uploaded a file!');
// });

// Main
$(document).ready(() => {
  let video = Video.getVideo(); // Ottieni il file caricato
  console.log(video);
  // Al click del pulsante invia al server
  $('#carica').on('click tap', () => Video.setTestVideoData(video));
});
