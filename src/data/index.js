import _ from 'lodash';

export const getFeaturedSong = (songbook, allSongs) => {
  if (songbook && allSongs && allSongs.length) {
    let featuredSongs = [];

    songbook.chapters.forEach(chapter => {
      chapter.songs.forEach(songChild => {
        if (songChild.featured) {
          // does this song id exist in the songs list
          featuredSongs.push(
            allSongs.filter(song => song._id === songChild._id)[0]
          );
        }
      });
    });
    if (featuredSongs.length) {
      return _.sample(featuredSongs);
    } else {
      return DEFAULT_SONG;
    }
  } else {
    return DEFAULT_SONG;
  }
};

const DEFAULT_SONG = {
  _id: 1,
  category: 'game',
  create_time: '',
  update_time: '',
  title: 'Chattanooga Choo Choo',
  lyrics:
    "Pardon me, boy\nIs that the Chattanooga Choo Choo?\nTrack twenty-nine\nCan you give me a shine?\nI can afford to board the\nChattanooga Choo Choo?\nI've got my fare\nAnd just a trifle to spare.\n\nWhen you hear the whistle\nBlowin' eight to the bar!\nThen you know that\nTennessee is not very far!\nShovel all the coal in\nGotta keep it rollin'\nWoo, woo, Chattanooga\nThere you are! (x4)",
  tbd_various_boolean_flags: '',
  reference_title: 'by the Glenn Miller Orchestra',
  reference_link: '',
  instructions: '',
  player_id: -1,
  override_html: '',
  delete_local: ''
};
