import { Config } from "remotion";
import { webpackOverride } from "./src/webpack-override";

//Config.Rendering.setConcurrency(1);
Config.Rendering.setImageFormat("jpeg");
Config.Output.setOverwriteOutput(true);

Config.Bundling.overrideWebpackConfig(webpackOverride);
