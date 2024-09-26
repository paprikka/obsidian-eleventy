import { makeAbsoluteUrl } from "../../build/absolute-url.js";

const domain = "untested.sonnet.io";
const rootUrl = `https://${domain}`;

export default {
  rootUrl,
  buildTime: new Date(),
  description: "Projects, experiments and toys by Rafał Pastuszak",
  name: "Untested",
  defaultCover: makeAbsoluteUrl(rootUrl)("/assets/cover-default.png"),
  defaultTitle: "Untested · Rafał Pastuszak",
};
