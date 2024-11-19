import React from "react";
import { Player } from "@remotion/player";

import { PhotoSlideshow } from "./index";
import sampleSong from "../../../../common/data/sample-song.json";
import { frames } from "../../../../common/utils";

export default {
  title: "components/SongPlayer/components/PhotoSlideshow",
  component: PhotoSlideshow,
  decorators: []
};

export const Index = () => (
  <Player
    component={() => (
      <PhotoSlideshow
        images={sampleSong.background.images}
      ></PhotoSlideshow>
    )}
    durationInFrames={Math.ceil(frames(sampleSong.duration))}
    fps={frames(1)}
    compositionWidth={640}
    compositionHeight={320}
    autoPlay={!process.env.REACT_APP_PREVENT_AUTOPLAY}
    loop
    controls
  />
);
