declare module "slugify" {
  type SlugifyOptions = {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
  };

  function slugify(str: string, options?: SlugifyOptions): string;
  
  export = slugify;
} 