/// <reference types="node" />

declare class Domain {
  private readonly onerror: (er: any) => void
  public readonly ids: Set<number>
  public readonly parent?: Domain
  public destroyed: boolean
  constructor(
    onerror: (
      er: any,
      event: 'uncaughtException' | 'unhandledRejection'
    ) => void
  )
  destroy(): void
}

export = Domain
