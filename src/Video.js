import {db} from 'Firebase';

class Video { // eslint-disable-line
  static setTestVideoData(uuid) { // eslint-disable-line
    console.log('setTestVideoData');
    db.ref('test-video').set({
      uuid: uuid,
    });
  }
}

export default Video;
