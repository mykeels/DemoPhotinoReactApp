import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Capabilities } from ".";

export default {
  title: "components/SongExporter/Capabilities",
  component: Capabilities,
  decorators: []
};

const queryClient = new QueryClient();

export const NoCapabilities = () => (
  <QueryClientProvider client={queryClient}>
    <Capabilities
      onCapabilitiesChanged={() => {}}
      getCapabilities={async () => ({ ffmpeg: false, nodeJS: false })}
    />
  </QueryClientProvider>
);

export const HasNodeJs = () => (
  <QueryClientProvider client={queryClient}>
    <Capabilities
      onCapabilitiesChanged={() => {}}
      getCapabilities={async () => ({ ffmpeg: false, nodeJS: true })}
    />
  </QueryClientProvider>
);

export const HasFfmpeg = () => (
  <QueryClientProvider client={queryClient}>
    <Capabilities
      onCapabilitiesChanged={() => {}}
      getCapabilities={async () => ({ ffmpeg: true, nodeJS: false })}
    />
  </QueryClientProvider>
);

export const HasAll = () => (
  <QueryClientProvider client={queryClient}>
    <Capabilities
      onCapabilitiesChanged={() => {}}
      getCapabilities={async () => ({ ffmpeg: true, nodeJS: true })}
    />
  </QueryClientProvider>
);
