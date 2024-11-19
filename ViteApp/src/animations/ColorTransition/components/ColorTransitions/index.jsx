import React from "react";
import {
  Sequence,
  useVideoConfig
} from "remotion";
import { ColorTransition } from "../..";
import { f2s, frames } from "../../../../common";

/**
 * @typedef {object} ColorTransitionsProps
 * @property {any} children
 * @property {JSX.Element | React.FC<{ style: React.CSSProperties }>} [children]
 * @property {string[]} colors
 * @property {number} [transitionDuration]
 */

/**
 * @type {React.FC<ColorTransitionsProps & { [key: string]: any }>}
 */
export const ColorTransitions = ({ children, colors, transitionDuration }) => {
  const { durationInFrames } = useVideoConfig();
  const durationInSeconds = f2s(durationInFrames);
  const imageCount = Math.ceil(durationInSeconds / transitionDuration);
  const repeatedColors = new Array(imageCount).fill(0).map((_, i) => ({
    from: colors[i % colors.length],
    to: colors[(i + 1) % colors.length]
  }));

  const Component = typeof children === "function" ? children : null;

  return (
    <>
      {repeatedColors.map((color, i) => (
        <Sequence
          key={`${color.from}-${color.to}-${i}`}
          from={i * frames(transitionDuration)}
          durationInFrames={frames(transitionDuration)}
          layout="none"
        >
          <ColorTransition from={color.from} to={color.to}>
            {({ style }) =>
              children ? (
                typeof children === "function" ? (
                  <Component style={{ color: style.color }} />
                ) : (
                  <div className="relative z-10" style={{ color: style.color }}>
                    {children}
                  </div>
                )
              ) : null
            }
          </ColorTransition>
        </Sequence>
      ))}
    </>
  );
};

ColorTransitions.defaultProps = {
  transitionDuration: 5
};
