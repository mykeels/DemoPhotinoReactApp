import { Player } from "@remotion/player";

import { PhotoSlideshow } from "./index.jsx";
import sampleSong from "../../../../common/data/sample-song.json";
import { frames } from "../../../../common/utils/index.js";

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
    autoPlay={!import.meta.env.VITE_PREVENT_AUTOPLAY}
    loop
    controls
  />
);
