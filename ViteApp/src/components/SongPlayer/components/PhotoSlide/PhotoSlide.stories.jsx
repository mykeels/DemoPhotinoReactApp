import { Player } from "@remotion/player";

import { PhotoSlide } from "./index.jsx";
import { frames } from "../../../../common/utils/index.js";

export default {
  title: "components/SongPlayer/components/PhotoSlide",
  component: PhotoSlide,
  decorators: []
};


export const Index = () => (
  <Player
    component={() => <PhotoSlide imageURL={image}>Hello World</PhotoSlide>}
    durationInFrames={frames(2)}
    fps={frames(1)}
    compositionWidth={1280}
    compositionHeight={720}
    controls
    autoPlay={!import.meta.env.VITE_PREVENT_AUTOPLAY}
    loop
  />
);

var image =
  "https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1084&q=80";
