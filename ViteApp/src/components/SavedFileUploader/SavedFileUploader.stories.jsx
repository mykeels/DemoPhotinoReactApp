import React, { useState } from "react";

import { SavedFileUploader } from ".";

export default {
  title: "components/SavedFileUploader",
  component: SavedFileUploader,
  decorators: []
};

export const Index = () => {
  const [url, setUrl] = useState(null);
  return (
    <>
      {url ? (
        <div className="z-10 block w-full h-screen bg-lavender-100 fixed top-0 left-0 justify-center items-center">
          <audio controls className="inline-block w-full">
            <source src={url} type="audio/mpeg" />
          </audio>
        </div>
      ) : null}
      <SavedFileUploader onAudioFileReceived={setUrl} />
    </>
  );
};
