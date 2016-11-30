import Video from 'Video';


// fileRef.put(file).then(function(snapshot) {
//   console.log('Uploaded a file!');
// });

function testFunc() { // eslint-disable-line
  $('#test').append('jquery test');
}


$(document).ready(() => {
  $('#test').click(() => Video.setTestVideoData('test'));
  $('#test').click(() => Video.setTestVideoData('test'));
});
