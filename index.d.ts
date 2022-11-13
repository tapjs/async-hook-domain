/// <reference types="node" />

declare class Domain {
  private readonly onerror: (er: any) => void
  private ids: Set<number>
  private parent?: Domain
  public destroyed: boolean
  constructor (onerror: (er: any) => void)
  destroy (): void
}

export = Domain
