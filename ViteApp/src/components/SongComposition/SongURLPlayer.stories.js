import React from "react";
import { Player } from "@remotion/player";
import { frames } from "../../common/utils";

import { SongURLPlayer } from "./SongURLPlayer";

export default {
  title: "components/SongURLPlayer",
  component: SongURLPlayer,
  decorators: []
};

export const Index = () => (
  <Player
    component={SongURLPlayer}
    durationInFrames={frames(131)}
    fps={60}
    compositionWidth={1280}
    compositionHeight={720}
    inputProps={{
      url: "http://localhost:5000/songs/3afbe273-71ec-49a6-92fc-742bd46d65ad"
    }}
    controls
  />
);
