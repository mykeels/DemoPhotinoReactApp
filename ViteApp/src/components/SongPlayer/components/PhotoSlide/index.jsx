import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig
} from "remotion";

/**
 * @typedef {object} PhotoSlideProps
 * @property {any} [children]
 * @property {string} [imageURL]
 */

/**
 * @type {React.FC<PhotoSlideProps & { [key: string]: any }>}
 */
export const PhotoSlide = ({ children, imageURL }) => {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: {
      damping: 200
    },
    durationInFrames: 30
  });

  const entranceOffset = interpolate(entrance, [0, 1], [height, 0]);

  const wave = Math.cos(frame / 15) * 10 + entranceOffset;

  return (
    <AbsoluteFill
      className="bg-gray-100 items-center justify-center"
    >
      {imageURL ? (
        <Img
          className="h-full w-full block absolute top-0 left-0"
          src={imageURL}
        />
      ) : null}
      {children ? (
        <div
          className="p-8 z-10 text-4xl text-white font-bold relative"
          style={{ transform: `translateY(${wave}px)` }}
        >
          <div className="bg-gray-500 h-full w-full absolute top-0 left-0 z-0 opacity-50 rounded" />
          <div className="z-10 relative">{children}</div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

PhotoSlide.defaultProps = {};
