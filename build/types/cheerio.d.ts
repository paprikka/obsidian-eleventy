declare module "cheerio" {
  type CheerioElement = {
    type: string;
    name: string;
    tagName: string;
    attribs: { [key: string]: string };
    children: CheerioElement[];
  };

  type CheerioSelector = {
    attr(name: string, value?: string): string | undefined | CheerioSelector;
    text(): string;
    html(): string | null;
    parent(): CheerioSelector;
    prev(): CheerioSelector;
    append(content: CheerioSelector): CheerioSelector;
    prependTo(target: CheerioSelector): CheerioSelector;
    nextUntil(selector: string): CheerioSelector;
    wrap(content: CheerioSelector): CheerioSelector;
    toString(): string;
    length: number;
    [0]: CheerioElement;
    each(callback: (index: number, element: CheerioElement) => void): CheerioSelector;
    map<T>(callback: (this: CheerioElement, index: number, element: CheerioElement) => T): { get(): T[] };
  };

  type CheerioAPI = {
    (selector: string): CheerioSelector;
    load(content: string): CheerioAPI;
    root(): CheerioSelector;
  } & ((selector: string) => CheerioSelector);

  function load(content: string): CheerioAPI;

  export { CheerioElement as Element, CheerioSelector as Cheerio, CheerioAPI, load };
} 
