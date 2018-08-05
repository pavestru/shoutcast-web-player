import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { get } from "axios";
import "./App.css";
import logo from "./logo.png";

import Player from "./Player";
import RecentTracksList from "./RecentTracksList";

import charMap from "./charMap";

import {
  pageTitle,
  centovaCastUrl,
  shoutCastUrl,
  ignoreTracksContaining
} from "./config.json";

const fixChars = text => {
  let newText = text + "";
  for (let ch in charMap) {
    const re = new RegExp(ch, "g");
    newText = newText.replace(re, charMap[ch]);
  }
  return newText;
};

const ignoreTracksFilter = track => {
  for (const substring of ignoreTracksContaining) {
    if (track.title.toLowerCase().includes(substring.toLowerCase())) {
      return false;
    }
  }
  return true;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentTracks: []
    };
  }

  async componentDidMount() {
    this.getRecentTracks();
    setInterval(this.getRecentTracks, 15 * 1000);
  }

  getRecentTracks = async () => {
    try {
      const response = await get(centovaCastUrl, {
        params: {
          m: "recenttracks.get",
          username: "radiopokoj",
          rid: "radiopokoj",
          _: Date.now()
        }
      });

      this.setState({
        recentTracks: response.data.data[0]
          .map(trackObj => ({
            artist: fixChars(trackObj.artist),
            title: fixChars(trackObj.title),
            time: trackObj.time
          }))
          .filter(ignoreTracksFilter)
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { recentTracks } = this.state;
    const artist = recentTracks.length > 0 ? recentTracks[0].artist : "";
    const title = recentTracks.length > 0 ? recentTracks[0].title : "";
    console.log("re-render");
    return (
      <div className="App">
        <Helmet>
          <title>
            {artist || title
              ? `${title} - ${artist} | ${pageTitle}`
              : pageTitle}
          </title>
        </Helmet>
        <div className="App-header">
          <img src={logo} alt="Logo" />
          <div className="App__live">
            <strong>Práve hrá:</strong>
          </div>
        </div>
        <Player
          artist={artist}
          title={title}
          streamUrl={`${shoutCastUrl}?${Date.now()}`}
        />
        {!!recentTracks.length && <RecentTracksList tracks={recentTracks} />}
      </div>
    );
  }
}

export default App;
