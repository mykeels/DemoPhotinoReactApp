import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {
  SongCreator,
  TitleCreatorScreen,
  SongPlayerScreen,
  SongPicker,
  SongUploaderScreen,
  SongUploader
} from "./components";
import { LyricsTabView } from "./components/SongCreator/components/LyricsTabView";
import { getSongById, saveSongFileContents } from "./common/services";
import { SongCreatorScreen } from "./components/SongCreator";
import { Redirect } from "./common";
import { SongExporterScreen } from "./components/SongExporter";

/**
 * @typedef {object} AppProps
 * @property {(id: string) => Promise<SongFileContent>} [getSongById]
 * @property {(content: SongFileContent) => Promise<SongFileContent>} [saveSongFileContents]
 * @property {React.FC<Pick<import("./components").SongPickerProps, "onNewSong" | "onSelectSong" | "onPlaySong">>} [SongPicker]
 */

/** @type {React.FC<AppProps>} */
export const App = ({ getSongById, saveSongFileContents, SongPicker }) => {
  /** @type {ReactState<SongFileContent>} */
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const selectSong = async (record) => {
    const song = await getSongById(record.id);
    setState(song);
    navigate(`/create/${song.id}`);
  };
  const playSong = async (record) => {
    const song = await getSongById(record.id);
    setState(song);

    navigate(`/play/${song.id}`);
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SongPicker
              onNewSong={() => {
                navigate("/create/set-title");
              }}
              onSelectSong={selectSong}
              onPlaySong={playSong}
            />
          }
        />
        <Route
          path="/play/:id"
          element={<SongPlayerScreen getSongById={getSongById} />}
        />
        <Route
          path="/create/set-title"
          element={
            <TitleCreatorScreen
              onTitleChanged={(data) => {
                setState((state) => ({ ...state, ...data }));
              }}
            />
          }
        />
        <Route
          path="/create/upload-audio"
          element={
            <SongUploaderScreen
              onAudioFileReceived={(audioUrl) => {
                setState((state) => ({
                  ...state,
                  audioUrl,
                  background: {
                    type: "images",
                    colors: [
                      `#00aaff`,
                      `#ffaa00`,
                      `#0000ff`,
                      `#00ff00`,
                      `#ff0000`,
                      `#00aaff`
                    ],
                    images: []
                  }
                }));
              }}
              SongUploader={(props) => (
                <SongUploader {...props} title={state?.title} />
              )}
            />
          }
        />
        <Route
          path="/create"
          element={
            state?.audioUrl ? (
              <SongCreator
                title={state?.title}
                audioUrl={state?.audioUrl}
                onReset={() => {
                  setState(null);
                  navigate("/");
                }}
                defaults={{
                  lines: state?.lines,
                  background: state?.background
                }}
                LyricsTabView={(props) => (
                  <LyricsTabView
                    {...props}
                    defaults={{
                      active: "pretty",
                      text: state?.lyrics
                    }}
                  />
                )}
                onSave={(content) => {
                  content["id"] = state?.id;
                  return saveSongFileContents({
                    ...content,
                    id: state?.id,
                    audioUrl: state?.audioUrl,
                    lyrics: ""
                  }).then((content) => {
                    setState({ ...state, id: content.id });
                    navigate(`/create/${content.id}`);
                  });
                }}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/create/:id"
          element={
            <SongCreatorScreen
              getSongById={getSongById}
              SongCreator={(props) => (
                <SongCreator
                  {...props}
                  onReset={() => {
                    setState(null);
                    navigate("/");
                  }}
                />
              )}
            />
          }
        />
        <Route path="/exports" element={<SongExporterScreen />} />
      </Routes>
    </>
  );
};

App.defaultProps = {
  getSongById,
  saveSongFileContents,
  SongPicker: (props) => <SongPicker {...props} />
};
