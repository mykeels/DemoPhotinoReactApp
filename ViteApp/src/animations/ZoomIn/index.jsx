import React, { useEffect } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * @typedef {object} ZoomInProps
 * @property {any} children
 * @property {number} [size]
 * @property {JSX.Element | React.FC<{ style: React.CSSProperties }>} [children]
 */

/**
 * @type {React.FC<ZoomInProps & { [key: string]: any }>}
 */
export const ZoomIn = ({ children, size, onChange }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const zoom = 1 + interpolate(frame, [0, durationInFrames], [0, size]);

  const transform = `scale(${zoom})`;

  useEffect(() => {
    typeof onChange === "function" && onChange({ transform });
  }, [transform]);

  const Component = typeof children === "function" ? children : null;

  return children ? (
    typeof children === "function" ? (
      <Component style={{ transform }} />
    ) : (
      <div className="relative z-10" style={{ transform }}>
        {children}
      </div>
    )
  ) : null;
};

ZoomIn.defaultProps = {
  size: 0.1
};
