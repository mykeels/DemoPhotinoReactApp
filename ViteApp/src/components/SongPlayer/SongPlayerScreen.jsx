import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import { getSongById } from "../../common/services";
import { SongPlayer } from "./SongPlayer";

/**
 * @typedef {object} SongPlayerScreenProps
 * @property {any} [className]
 * @property {(id: string) => Promise<SongFileContent>} [getSongById]
 */

/**
 * @type {React.FC<SongPlayerScreenProps & { [key: string]: any }>}
 */
export const SongPlayerScreen = ({ getSongById }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: song } = useQuery(["songs", id], () => getSongById(id));

  useEffect(() => {
    /** @param {KeyboardEvent} e */
    const onEscapeKeyPressed = (e) => {
      e.key === "Escape" && navigate("/");
    };
    window.addEventListener("keypress", onEscapeKeyPressed);
    return () => {
      window.removeEventListener("keypress", onEscapeKeyPressed);
    };
  }, []);

  return song ? (
    <SongPlayer
      song={song}
      onPlayEnd={() => navigate("/")}
      width={window?.innerWidth}
      height={window?.innerHeight}
      isFullscreen
    />
  ) : null;
};

SongPlayerScreen.defaultProps = {
  getSongById
};
