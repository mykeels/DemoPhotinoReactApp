import React from "react";
import { AbsoluteFill } from "remotion";
import { Player } from "@remotion/player";

import { SlideOut } from "./index";
import { frames } from "../../common";

export default {
  title: "animations/SlideOut",
  component: SlideOut,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<{ to: "top" | "bottom" | "left" | "right" }>}
 */
const SlideOutComponent = ({ to }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <SlideOut duration={duration} to={to}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </SlideOut>
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

export const ToBottom = () => <SlideOutComponent to="bottom" />;

export const ToTop = () => <SlideOutComponent to="top" />;

export const ToLeft = () => <SlideOutComponent to="left" />;

export const ToRight = () => <SlideOutComponent to="right" />;
