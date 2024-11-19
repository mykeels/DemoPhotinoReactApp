import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { sleep } from "../../common";
import { Capabilities } from "./components";
import { SongExporter } from "./SongExporter";

import { SongExports } from "./SongExports";

export default {
  title: "components/SongExports",
  component: SongExports,
  decorators: []
};

export const NoCapability = () => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
      <SongExports
        getSongRecords={async () => records}
        Capabilities={(props) => (
          <Capabilities
            {...props}
            getCapabilities={async () => ({ nodeJS: false, ffmpeg: false })}
          />
        )}
      />
    </BrowserRouter>
  </QueryClientProvider>
);

export const CanExport = () => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
      <SongExports
        getSongRecords={async () => records}
        getExports={async () => []}
        Capabilities={(props) => (
          <Capabilities
            {...props}
            getCapabilities={async () => ({ nodeJS: true, ffmpeg: true })}
          />
        )}
        SongExporter={(props) => (
          <SongExporter
            {...props}
            duration={1}
            startExport={() =>
              mockEventSource({
                messages: [
                  "Output Filepath: C:\\hello-world.mp4",
                  "5 rendered, 5 encoded",
                  "15 rendered, 15 encoded",
                  "45 rendered, 45 encoded",
                  "60 rendered, 60 encoded",
                  "Muxing Audio",
                  "Encoded in 500ms"
                ].map((output) => ({ output }))
              })
            }
            stopExport={async () => {}}
          />
        )}
      />
    </BrowserRouter>
  </QueryClientProvider>
);

var records = [
  {
    id: "1",
    title: "Hello World",
    updatedAt: "2016-05-25T01:00:00.123"
  },
  {
    id: "2",
    title: "Hello World",
    updatedAt: "2016-05-25T01:00:00.123"
  },
  {
    id: "3",
    title: "Hello World",
    updatedAt: "2016-05-25T01:00:00.123"
  }
];

/**
 *
 * @param {object} props
 * @param {any[]} props.messages
 * @param {number} timeout
 */
function mockEventSource({ messages }, timeout = 1000) {
  const evtSource = {
    onmessage: () => {}
  };
  setTimeout(async () => {
    for (let msg of messages) {
      evtSource.onmessage({ data: JSON.stringify(msg) });
      await sleep(timeout);
    }
  }, timeout);
  return evtSource;
}
