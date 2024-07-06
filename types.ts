type Entry {
  relativePath: string,
  absolutePath: string,
  fileName: string,
  links: {
    as: string,
    to: string,
    // TODO: a better name to distinguish between the links
    // - to unpublished/hidden content
    // - actually dead links
    isDead: boolean, 
  }[]
}

type ResourceMap = Map<string, Entry>

// TODO: resolve other link types like embeds, header references, etc.


