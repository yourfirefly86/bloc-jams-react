import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hover: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

handleHover(e) {
  e.target.className = "ion-md-play";
}

handleHoverOff(e) {
  e.target.className = "song-number";
}

playOrPause(e) {
  this.state.isPlaying ? e.target.className = "ion-md-play" : e.target.className = "ion-md-pause";
}

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
              {
              this.state.album.songs.map( (song, index) =>
              <tr className="album" key={index} onClick={() => this.handleSongClick(song)}>
                <td className="index-actions"> <button className="index-number"
                onMouseEnter={(e) => this.handleHover(e)}
                onMouseLeave={(e) => this.handleHoverOff(e)}
                onClick={(e) => this.playOrPause(e)}> {index+1} </button></td>
                <td id="song-title">{song.title}</td>
                <td id="song-duration">{song.duration}</td>
                </tr>
            )
          }
          <script src="https://unpkg.com/ionicons@4.2.4/dist/ionicons.js"></script>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
