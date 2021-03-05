export const properties = {
  name: '',
  symbol: '',
  description: '',
  type: ['PoW', 'PoS'] as const,
  creationdate: 0,
  smartcontract: '',
  '+': '',
  '-': '',
  website: '',
  github: ''
}

type Transform<T> = { [K in keyof T]: 
  T[K] extends readonly any[] ? T[K][number] : T[K] 
}

export type Blockchain = Transform<typeof properties>;