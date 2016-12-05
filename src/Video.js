import {db, store, TIMESTAMP} from 'Firebase';

class Video { // eslint-disable-line
  static getVideo() { // eslint-disable-line
  }

  static uploadTestVideo(file) { // eslint-disable-line
    console.log('uploadTestVideo');

    let testVideoEntry = db.ref('test-videos').push({
      uploadedAt: TIMESTAMP,
      originalFilename: 'test-video.mp4',
      status: 'incomplete',
    });

    let testVideoKey = testVideoEntry.key;
    console.log('testVideoKey:' + testVideoKey);
    let testVideoRef = store.ref('/videos/' + testVideoKey);
    testVideoRef.put(file).then(function(snapshot) { // eslint-disable-line
      console.log('Updating record');
      testVideoEntry.update({
        status: 'complete',
      }, () => {
        console.log('Record updated');
      });
    });

    return testVideoKey;
  }

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
