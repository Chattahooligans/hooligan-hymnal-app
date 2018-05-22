import _ from 'lodash';

export const Songs = require('../data/songs.json');
export const Songbook = require('../data/songbook.json');

export function getFeaturedSongs(allSongs = Songs) {
  try {
    let songList = [];
    Songbook.chapters.forEach(chapterChild => {
      chapterChild.songs.forEach(songChild => {
        if (true === songChild.featured) {
          try {
            // does this song exist in the database?
            songList.push(Songs.filter(song => song._id === songChild._id)[0]);
          } catch (err) {
            console.log(songChild._id + ' not found in songs database');
          }
        }
      });
    });
    return [_.sample(songList)];
  } catch (err) {
    return [_.sample(allSongs)];
  }
}
