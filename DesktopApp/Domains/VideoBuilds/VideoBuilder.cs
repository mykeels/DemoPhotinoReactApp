using System.IO;
using System.Text.RegularExpressions;
using Mykeels.Processes;

namespace MeeKaraoke;

public class VideoBuilder
{
    public Guid SongId { get; set; }
    public string OutputFilepath { get; set; } = String.Empty;
    public string Command { get; set; } = String.Empty;
    public double Duration { get; set; }
    public string ScriptPath
    {
        get
        {
            return Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/scripts/render-media.script.js"
            );
        }
    }

    public async Task<string> Build(VideoBuildModel model, Action<string>? onProgress = null)
    {
        this.SongId = model.SongId;
        if (model.Song == null)
        {
            throw new NullReferenceException();
        }
        this.Duration = model.Song.Duration;
        var outputFilepath = Path.Combine(
            Environment.GetFolderPath(
                Environment.SpecialFolder.MyVideos
            ),
            "MeeKaraoke",
            $"{model.SongId.ToString()}.mp4"
        );
        this.OutputFilepath = outputFilepath;
        var karaokeUrl = $"{WebApp.Address}/Songs/{model.SongId}";
        this.Command = $"node {this.ScriptPath} --out=\"{outputFilepath}\" --duration={model.Song.Duration + 3}" +
            $" --karaokeUrl={karaokeUrl} --rendererUrl={VideoBuildModel.RendererUrl}";

        return await Task.Run(() =>
        {
            var process = Shell.Run(
                new List<string>() {
                    this.Command
                },
                outputHandler: (output) =>
                {
                    var notAllowed = new List<string>() { String.Empty, "Error: " };
                    if (!notAllowed.Contains(output))
                    {
                        if (output.StartsWith("Error:"))
                        {
                            if (onProgress != null) {
                                onProgress(Regex.Replace(output, "^Error: ", ""));
                            }
                        }
                        else
                        {
                            if (onProgress != null) {
                                onProgress(output.Replace($"{Directory.GetCurrentDirectory()}>", ""));
                            }
                        }
                    }
                    Console.WriteLine(output);
                }
            );
            process.WaitForExit();
            return outputFilepath;
        });
    }
}