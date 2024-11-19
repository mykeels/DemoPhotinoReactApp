type LyricLine = {
  text: string;
  duration: number;
  from: number;
};

type Song = LyricLine[];

type SongRecord = {
  id: string;
  title: string;
  audioFilePath: string;
  songFilePath: string;
  createdAt: string;
  updatedAt: string;
};

type SongBackground<TBackgroundOptions extends string> = {
  type: TBackgroundOptions;
} & Record<TBackgroundOptions, string[]>;

type SongFileContent = {
  id?: string;
  title: string;
  lyrics: string;
  audioUrl: string;
  background: SongBackground<"colors" | "images">;
  lines?: LyricLine[];
  duration: number;
};

type SongExport = {
  id: string;
  outputFilepath: string;
  duration: number;
  progress: {
    encoded: number;
    rendered: number;
    muxingAudio: number;
    complete: boolean;
  };
};
