import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { LyricsTabView } from "./";

export default {
  title: "components/SongCreator/components/LyricsTabView",
  component: LyricsTabView,
  decorators: []
};

export const Index = () => {
  /** @type {ReactState<LyricLine[]>} */
  const [lines, setLines] = useState([]);

  return (
    <BrowserRouter>
      <LyricsTabView
        defaults={{ text: somethingJustLikeThisLyrics }}
        lines={lines}
        onLinesChanged={setLines}
      />
    </BrowserRouter>
  );
};

export const Cursor5 = () => {
  /** @type {ReactState<LyricLine[]>} */
  const [lines, setLines] = useState([]);

  return (
    <BrowserRouter>
      <LyricsTabView
        defaults={{ text: somethingJustLikeThisLyrics, active: "pretty" }}
        lines={lines}
        onLinesChanged={setLines}
        cursor={5}
      />
    </BrowserRouter>
  );
};

export const Empty = () => {
  /** @type {ReactState<LyricLine[]>} */
  const [lines, setLines] = useState([]);

  return (
    <BrowserRouter>
      <LyricsTabView
        defaults={{ text: "" }}
        lines={lines}
        onLinesChanged={setLines}
        cursor={5}
      />
    </BrowserRouter>
  );
};

export const WithTitle = () => {
  /** @type {ReactState<LyricLine[]>} */
  const [lines, setLines] = useState([]);

  return (
    <BrowserRouter>
      <LyricsTabView
        title="Something just like this"
        defaults={{ text: somethingJustLikeThisLyrics }}
        lines={lines}
        onLinesChanged={setLines}
      />
    </BrowserRouter>
  );
};

var somethingJustLikeThisLyrics = `I've been reading books of old
The legends and the myths
Achilles and his gold

But she said, where d'you wanna go?
How much you wanna risk?
I'm not looking for somebody
With some superhuman gifts
With some superhuman gifts
Some superhero
Some fairytale bliss
Just something I can turn to
Somebody I can miss`;
