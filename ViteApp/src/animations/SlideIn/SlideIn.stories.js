import React from "react";
import { AbsoluteFill } from "remotion";
import { Player } from "@remotion/player";

import { SlideIn } from "./index";
import { frames } from "../../common";

export default {
  title: "animations/SlideIn",
  component: SlideIn,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<{ from: "top" | "bottom" | "left" | "right" }>}
 */
const SlideInComponent = ({ from }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <SlideIn duration={1} from={from}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </SlideIn>
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

export const FromBottom = () => <SlideInComponent from="bottom" />;

export const FromTop = () => <SlideInComponent from="top" />;

export const FromLeft = () => <SlideInComponent from="left" />;

export const FromRight = () => <SlideInComponent from="right" />;
