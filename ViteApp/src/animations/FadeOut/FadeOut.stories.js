import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { FadeOut } from ".";
import { frames } from "../../common";

export default {
  title: "animations/FadeOut",
  component: FadeOut,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<{ size?: number }>}
 */
const FadeOutComponent = ({ size }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <FadeOut size={size}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </FadeOut>
      </AbsoluteFill>
    )}
    durationInFrames={frames(duration)}
    fps={frames(1)}
    compositionWidth={640}
    compositionHeight={320}
    autoPlay={!process.env.REACT_APP_PREVENT_AUTOPLAY}
    loop
    controls
  />
);

export const Index = () => <FadeOutComponent />;
