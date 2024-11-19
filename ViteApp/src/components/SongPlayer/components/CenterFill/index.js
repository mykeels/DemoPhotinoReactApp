import React from "react";
import classNames from "classnames/dedupe";
import { AbsoluteFill } from "remotion";

/**
 * @typedef {object} CenterFillProps
 * @property {any} [className]
 * @property {React.CSSProperties} [style]
 * @property {any} [children]
 */

/**
 * @type {React.FC<CenterFillProps & { [key: string]: any }>}
 */
export const CenterFill = ({ children, className, style }) => {
  return (
    <AbsoluteFill
      className={classNames("items-center justify-center", className)}
      style={style}
    >
      {children}
    </AbsoluteFill>
  );
};

CenterFill.defaultProps = {};
