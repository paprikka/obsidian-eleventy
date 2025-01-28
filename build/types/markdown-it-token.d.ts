type Attrs = [string, string];

export default class Token {
  type: string;
  tag: string;
  attrs: Attrs[] | null;
  children: Token[] | null;
  content: string;
  hidden: boolean;
  block: boolean;
  nesting: number;
  level: number;
  map: [number, number] | null;
  markup: string;
  info: string;
  meta: any;
  attrIndex(name: string): number;
  attrPush(attrData: [string, string]): void;
  attrSet(name: string, value: string): void;
  attrGet(name: string): string | null;
  attrJoin(name: string, value: string): void;
} 
