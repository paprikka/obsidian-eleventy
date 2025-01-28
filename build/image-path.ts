import { makeAbsoluteUrl } from "./absolute-url.js";
import { Image } from "@11ty/eleventy-img";
import SiteData from "../src/_data/site.js";

type ImageWidth = number;

const absoluteUrl = makeAbsoluteUrl(SiteData.rootUrl);

export async function imagePath(src: string, widths: ImageWidth[] = [1200]): Promise<string> {
  let metadata = await new Image(src, { widths, formats: ["jpeg"] });
  const stats = metadata.getFullStats(metadata);

  const relativeUrl = stats?.jpeg?.[0]?.url ?? src;
  const url = absoluteUrl(relativeUrl);
  return url;
}
