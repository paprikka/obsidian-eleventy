declare module "@11ty/eleventy-img" {
  type ImageOptions = {
    widths: number[];
    formats: string[];
  };

  type ImageStats = {
    jpeg?: Array<{
      url: string;
    }>;
  };

  class Image {
    constructor(src: string, options: ImageOptions);
    getFullStats(metadata: any): ImageStats;
  }

  export { Image };
} 