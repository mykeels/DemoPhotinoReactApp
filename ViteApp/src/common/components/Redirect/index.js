import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {object} RedirectProps
 * @property {string} to
 */

/**
 * @type {React.FC<RedirectProps & { [key: string]: any }>}
 */
export const Redirect = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return <div></div>;
};

Redirect.defaultProps = {};
