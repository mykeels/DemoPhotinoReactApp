import React, { useEffect } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * @typedef {object} FadeOutProps
 * @property {any} children
 * @property {JSX.Element | React.FC<{ style: React.CSSProperties }>} [children]
 */

/**
 * @type {React.FC<FadeOutProps & { [key: string]: any }>}
 */
export const FadeOut = ({ children, onChange }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, durationInFrames], [1, 0]);

  useEffect(() => {
    typeof onChange === "function" && onChange({ opacity });
  }, [opacity]);

  const Component = typeof children === "function" ? children : null;

  return children ? (
    typeof children === "function" ? (
      <Component style={{ opacity }} />
    ) : (
      <div className="relative z-10" style={{ opacity }}>
        {children}
      </div>
    )
  ) : null;
};

FadeOut.defaultProps = {};
