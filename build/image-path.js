import { makeAbsoluteUrl } from "./absolute-url.js";
import { Image } from "@11ty/eleventy-img";
import SiteData from "../src/_data/site.js";

const absoluteUrl = makeAbsoluteUrl(SiteData.rootUrl);
export async function imagePath(src, widths = [1200]) {
  let metadata = await new Image(src, { widths, formats: ["jpeg"] });
  const stats = metadata.getFullStats(metadata);

  const relativeUrl = stats?.jpeg?.[0]?.url;
  const url = absoluteUrl(relativeUrl);
  return url;
}
