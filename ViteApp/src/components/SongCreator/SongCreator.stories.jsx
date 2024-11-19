import React from "react";

import { SongCreator } from "./";
import { LyricsTabView } from "./components/LyricsTabView";
import sampleSong from "../../common/data/sample-song.json";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "components/SongCreator",
  component: SongCreator
};

export const NoDurations = () => (
  <BrowserRouter>
    <SongCreator
      audioUrl={"./sounds/something-just-like-this.mp3"}
      defaults={{
        lines: sampleSong.lines.map((line, i) => ({ ...line, duration: 1, from: i })),
        background: sampleSong.background
      }}
      LyricsTabView={(props) => (
        <LyricsTabView
          {...props}
          lines={sampleSong.lines.map((line, i) => ({ ...line, duration: 1, from: i }))}
          title="Something just like this"
          defaults={{
            text: sampleSong.lines.map((line) => line.text).join("\n"),
            active: "pretty"
          }}
          onSave={() => {}}
        />
      )}
    />
  </BrowserRouter>
);

export const WithDurations = () => (
  <BrowserRouter>
    <SongCreator
      audioUrl={"./sounds/something-just-like-this.mp3"}
      defaults={{
        lines: sampleSong.lines,
        background: sampleSong.background
      }}
      LyricsTabView={(props) => (
        <LyricsTabView
          {...props}
          title="Something just like this"
          lines={sampleSong.lines}
          defaults={{
            text: sampleSong.lines.map((line) => line.text).join("\n"),
            active: "pretty"
          }}
          onSave={() => {}}
        />
      )}
    />
  </BrowserRouter>
);
