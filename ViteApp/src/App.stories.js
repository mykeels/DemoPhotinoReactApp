import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { SongPicker } from "./components";
import sampleSong from "./common/data/sample-song.json";

export default {
  title: "App",
  component: App,
  decorators: []
};

const queryClient = new QueryClient();
const asset = (url) => {
  const publicUrl = `${process.env.STORYBOOK_PUBLIC_URL || "/"}`;
  const root = publicUrl === "." ? "" : publicUrl;
  return String(`${root}${url}`).replace("//", "/");
};

console.log(asset(`/sounds/something-just-like-this.mp3`));

export const Index = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={location.pathname}>
      <App
        getSongById={async (id) => ({
          id,
          ...sampleSong,
          ...records.find((r) => r.id === id),
          audioUrl: asset(`/sounds/something-just-like-this.mp3`),
          lyrics: sampleSong.lines
            .reduce((arr, line) => arr.concat(line.text), [])
            .join("\n")
        })}
        SongPicker={(props) => (
          <SongPicker {...props} getSongRecords={async () => records} />
        )}
      />
    </BrowserRouter>
  </QueryClientProvider>
);

var records = [
  {
    id: "1",
    title: "Something just like this - The Chainsmokers & Coldplay",
    updatedAt: "2016-05-25T01:00:00.123"
  }
];
