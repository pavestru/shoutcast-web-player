import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { get } from "axios";
import "./App.css";
import logo from "./logo.png";

import tuneinAsx from "./icons/tunein-asx.png";
import tuneinPls from "./icons/tunein-pls.png";
import tuneinQtl from "./icons/tunein-qtl.png";
import tuneinRam from "./icons/tunein-ram.png";

import Player from "./Player";
import RecentTracksList from "./RecentTracksList";

import charMap from "./charMap";

import config, {
  pageTitle,
  centovaCastUrl,
  shoutCastUrl,
  ignoreTracksContaining,
  tuneinLinks
} from "./config.json";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isIOS =
  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

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
    if (
      track.title.toLowerCase().includes(substring.toLowerCase()) ||
      track.artist.toLowerCase().includes(substring.toLowerCase())
    ) {
      return false;
    }
  }
  return true;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentTracks: [],
      streamUrl: `${shoutCastUrl}?${Date.now()}`
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

  handlePause = () => {
    // Update stream URL in order to invalidate cache
    this.setState({
      streamUrl: `${shoutCastUrl}?${Date.now()}`
    });
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
        </div>
        {!isSafari || !config.isSafariNonCompliant ? (
          <div>
            <div className="App__live">
              <strong>Práve hrá:</strong>
            </div>
            <Player
              artist={artist}
              title={title}
              streamUrl={this.state.streamUrl}
              onPause={this.handlePause}
            />
            {!!recentTracks.length && (
              <RecentTracksList tracks={recentTracks} />
            )}
          </div>
        ) : isIOS ? (
          <div>
            Pracujeme na našej vlastnej mobilnej aplikácii. Zatiaľ použite
            aplikáciu
            <div className="App__appStoreLink">
              <a href={config.appStoreLink}>
                <img alt="Logo" src={config.appImgUri} />
                {config.appName}
              </a>
            </div>
          </div>
        ) : (
          <div>
            Ľutujeme, ale rádio nie je možné prehrať v prehliadači Safari.
            Prosím, použite iný prehliadač (napr. Firefox, Chrome alebo Opera).
          </div>
        )}
        <div className="other-options">
          Ďalšie možnosti prehrávania:
          <div>
            <a href={tuneinLinks.pls}>
              <img alt="pls" src={tuneinPls} />
            </a>
            <a href={tuneinLinks.asx}>
              <img alt="asx" src={tuneinAsx} />
            </a>
            <a href={tuneinLinks.ram}>
              <img alt="ram" src={tuneinRam} />
            </a>
            <a href={tuneinLinks.qtl}>
              <img alt="qtl" src={tuneinQtl} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
