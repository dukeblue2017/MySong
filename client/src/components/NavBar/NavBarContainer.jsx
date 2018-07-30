import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import Search from './Search';

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() { // eslint-disable-line
    axios.delete('/api/deleteSession');
    window.location.hash = '';
  }

  render() {
    return (
      <div id="navbar">
        <div>
          <Search
            spotifyId={this.props.spotifyId}
            following={this.props.following}
            refreshfollowing={this.props.refreshFollowing}
            options={this.props.options}
          />
        </div>
        <div className="logo">MySong</div>
        <div className="user-and-logout">
          <div className="username">{this.props.username}</div>
          <Button id="logout-button" onClick={this.handleLogOut}>Log Out</Button>
        </div>
      </div>
    );
  }
}

export default NavBarContainer;
