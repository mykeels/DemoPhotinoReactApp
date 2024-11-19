import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { sleep } from "../../common";

import { TitleCreator } from "./";

export default {
  title: "components/TitleCreator",
  component: TitleCreator,
  decorators: []
};

const queryClient = new QueryClient();

export const Index = () => (
  <QueryClientProvider client={queryClient}>
    <TitleCreator
      onTitleChanged={console.log}
      getLyrics={async () => lyrics}
      getLyricsOptions={async (text) => {
        if (!text) {
          return [];
        }
        await sleep(1000);
        return [
          {
            id: "1",
            title: "Terminator by Asake",
            url: "demo-url-1"
          },
          {
            id: "2",
            title: "Terminator by Lil Yachty",
            url: "demo-url-2"
          }
        ];
      }}
    />
  </QueryClientProvider>
);

var lyrics = `[Verse 1]
Awe
Come make we talk, I no be killer-killer, hire-hire (Hire-hire)
This your lovin' get meanin' for my body oh
I wan light my, wey my lighter? Ah-yah, ah-yah (Ah-yah, ah-yah)
This your colour no be fake oh, omo mummy

[Pre-Chorus]
My banana, oh my bana' (Oh my bana')
Come chop my bana' (Come chop my bana')
Sh'oni power?
B'oni, kowa (B'oni, kowa)
Elemi l'oma last (Elemi l'oma last)
Eji malaika, eji malaika (Eji malaika)
Wey my sutana, ah-ahn?
[Chorus]
'Cause you dey amaze, you dey amaze me
Your body amazin', don't be late
Don't keep me waitin'
No procrastinatin'
Terminator
We don get agreement oh
No terminatin'
Ngbo ngbo na ngbo ngbo
Nsuh suh na nsuh suh

[Verse 2]
Mi ra noh, ida leka moraino
Fada mo kaino (Fada mo kaino)
Fami mora, baby, o kin shey minor
Omo ope ti gbera tan
K'oye k'oma gbe'le ju
Mr. Money, mowa available
You be my cross, my agbelebu
Emi ma gbe e de'be bi Gokada, I dey deliver stable

[Pre-Chorus]
My banana, oh my bana' (Oh my bana')
Come chop my bana' (Come chop my bana')
Sh'oni power?
B'oni, kowa (B'oni, kowa)
Elemi l'oma last (Elemi l'oma last)
Eji malaika, eji malaika (Eji malaika)
Wey my sutana, ah-ahn?
`;
