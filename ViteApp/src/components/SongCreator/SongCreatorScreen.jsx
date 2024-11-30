import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { getSongById, saveSongFileContents } from "../../common/services/index.js";
import { LyricsTabView } from "./components/LyricsTabView/index.jsx";
import { SongCreator } from "./SongCreator.jsx";
import { useCacheInvalidation } from "../../hooks/index.js";

/**
 * @typedef {object} SongCreatorScreenProps
 * @property {any} [className]
 * @property {React.FC<import("./SongCreator").SongCreatorProps>} [SongCreator]
 * @property {(id: string) => Promise<SongFileContent>} [getSongById]
 * @property {(content: SongFileContent) => Promise<SongFileContent>} [saveSongFileContents]
 */

/**
 * @type {React.FC<SongCreatorScreenProps & { [key: string]: any }>}
 */
export const SongCreatorScreen = ({
  SongCreator,
  getSongById,
  saveSongFileContents
}) => {
  const { id } = useParams();
  const { data: song } = useQuery(["songs", id], () => getSongById(id));
  const { updateCache } = useCacheInvalidation(["songs", id]);
  const { mutateAsync: saveSong } = useMutation(saveSongFileContents, {
    onMutate: (variables) => {
      updateCache((content) => ({ ...content, ...variables, id }));
    }
  });
  return song ? (
    <SongCreator
      id={id}
      audioUrl={song.audioUrl}
      title={song.title}
      defaults={{
        lines: song?.lines,
        background: song?.background
      }}
      onSave={async (content) => {
        return saveSong({
          ...content,
          audioUrl: content.audioUrl
        });
      }}
      LyricsTabView={(props) => (
        <LyricsTabView
          {...props}
          title={song?.title}
          defaults={{
            active: "pretty",
            text: song?.lyrics
          }}
        />
      )}
    />
  ) : null;
};

SongCreatorScreen.defaultProps = {
  SongCreator,
  getSongById,
  saveSongFileContents
};
