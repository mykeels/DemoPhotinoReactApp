import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import { SongUploader } from "./";

export default {
  title: "components/SongUploader",
  component: SongUploader,
  decorators: []
};

const SongUploaderComponent = (props) => {
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
      <SongUploader {...props} onAudioFileReceived={setUrl} />
    </>
  );
};

export const Index = () => (
  <QueryClientProvider client={new QueryClient()}>
    <SongUploaderComponent />
  </QueryClientProvider>
);

export const CanFetchFromYoutube = () => (
  <QueryClientProvider client={new QueryClient()}>
    <SongUploaderComponent
      getCapabilities={async () => ({ nodeJS: "14.16.0" })}
    />
  </QueryClientProvider>
);
