const path = require("path");
const { renderMedia } = require("@remotion/renderer");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");

const optionDefinitions = [
  {
    name: "rendererUrl",
    alias: "r",
    type: String,
    description: "URL to Video Renderer Module containing compositions"
  },
  { name: "out", alias: "o", type: String },
  { name: "duration", alias: "d", type: Number },
  {
    name: "karaokeUrl",
    alias: "k",
    type: String,
    description: "URL to JSON file containing karaoke information"
  },
  {
    name: "help",
    alias: "h",
    type: Boolean,
    description: "Display this usage guide."
  }
];
const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage([
  {
    header: "MeeKaraoke",
    content: "Render Karaoke videos made by the MeeKaraoke app"
  },
  {
    header: "Options",
    optionList: optionDefinitions
  },
  {
    content: "Project home: https://github.com/mykeels/MeeKaraoke"
  }
]);

(async () => {
  try {
    if (options.help) {
      console.log(usage);
      return;
    }
    const assert = (condition, message) => {
      if (!condition) {
        console.assert(condition, message);
        process.exit(1);
      }
    };
    assert(!!options.out, "Missing command option --out=<filepath.mp4>");
    assert(!!options.duration, "Missing command option --duration=<number>");
    assert(!!options.karaokeUrl, "Missing command option --karaokeUrl=<string>");
    const apiRootUrl =
      process.env.REACT_APP_API_ROOT || "http://localhost:5000";
    const serveUrl = options.rendererUrl || `${apiRootUrl}/app/renderer/`;
    const fps = 60;
    const outputLocation = path.resolve(options.out);
    const width = 1280,
      height = 720;
    const duration = String(options.duration);
    const karaokeUrl = options.karaokeUrl;
    console.log(
      [
        `Renderer URL: ${serveUrl}`,
        `Output Filepath: ${outputLocation}`,
        `Video Size: ${width}x${height}, FPS: ${fps}, Duration: ${duration}s`,
        `Karaoke URL: ${karaokeUrl}`
      ].join("\n")
    );
    await renderMedia({
      serveUrl,
      outputLocation,
      composition: {
        id: "SongComposition",
        width,
        height,
        fps,
        durationInFrames: fps * Number(duration)
      },
      codec: "h264",
      envVariables: {
        REMOTION_FRAMES_PER_SECOND: String(fps),
        REMOTION_VIDEO_URL: karaokeUrl,
        REMOTION_VIDEO_DURATION: duration
      },
      onStart: () => console.log("Encoding ..."),
      onProgress: ({
        renderedFrames,
        encodedFrames,
        encodedDoneIn,
        renderedDoneIn,
        stitchStage
      }) => {
        if (stitchStage === "muxing") {
          // Second pass, adding audio to the video
          console.log("Muxing audio...");
        }
        // Amount of frame encoded into a video
        console.log(`${renderedFrames} rendered, ${encodedFrames} encoded`);
        // Time to create images of all frames
        if (renderedDoneIn !== null) {
          console.log(`Rendered in ${renderedDoneIn}ms`);
        }
        // Time to encode video from images
        if (encodedDoneIn !== null) {
          console.log(`Encoded in ${encodedDoneIn}ms`);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
})();
