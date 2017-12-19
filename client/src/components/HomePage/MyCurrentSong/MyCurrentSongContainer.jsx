/* eslint-disable max-len, no-console */
import React from 'react';
import axios from 'axios';
import MySongModal from './MySongModal';

class MyCurrentSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtworkLink: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.albumArtworkLink || (prevProps.currentMySong.trackID !== this.props.currentMySong.trackID)) {
      if (this.props.currentMySong.trackID) {
        axios({
          method: 'GET',
          url: `/api/spotifyAPI/albumArtwork?trackID=${this.props.currentMySong.trackID}`,
        })
          .then((response) => {
            this.setState({
              albumArtworkLink: response.data[1].url,
            });
          })
          .catch(err => console.error(err, err));
      }
    }
  }

  render() {
    return (
      <div id="current-song">
        <MySongModal
          spotifyId={this.props.spotifyId}
          spotifyToken={this.props.spotifyToken}
          onMySongChange={this.props.onMySongChange}
        />
        <div className="current-song-info">
          {this.state.albumArtworkLink && <img className="current-song-artwork" src={this.state.albumArtworkLink} alt="Album Artwork" />}
          <div id="current-song-details">
            <div className="song-title">{this.props.currentMySong.trackName}</div>
            <div className="song-artist">{this.props.currentMySong.trackArtist}</div>
            <div className="song-note">Note: {this.props.currentMySong.note}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCurrentSongContainer;
