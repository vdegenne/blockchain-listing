// export const properties = {
//   name: '',
//   symbol: '',
//   description: '',
//   type: ['PoW', 'PoS'] as const,
//   creationdate: 0,
//   smartcontract: '',
//   '+': '',
//   '-': '',
//   website: '',
//   github: ''
// }

export const tiers = ['S', 'A', 'B', 'C', 'D', 'E'] as const;

export const projectProperties = [
  { name: 'name', fullname: 'Name', type: 'textfield' },
  { name: 'description', fullname: 'Description', type: 'textarea' },
  { name: 'type', fullname: 'Type', type: 'textfield' },
  { name: 'blockchain', fullname: 'Blockchain', type: [] as const },
  { name: 'website', fullname: 'Website', type: 'textfield' },
  { name: 'github', fullname: 'Github', type: 'textfield' },
  { name: 'chart', fullname: 'Chart', type: 'textfield', helper: 'direct link to the chart page' },
  { name: 'tier', fullname: 'Tier', type: tiers }
] as const;

export const blockchainProperties = [
  { name: 'name', fullname: 'Name', type: 'textfield' },
  { name: 'symbol', fullname: 'Symbol', type: 'textfield' },
  { name: 'description', fullname: 'Description', type: 'textarea'},
  { name: 'codename', fullname: 'Code name', type: 'textfield', helper: 'par exemple "eth-erc20-ethereum"'},
  { name: 'type', fullname: 'Type', type: ['PoW', 'PoS'] as const },
  { name: 'creationdate', fullname: 'Creation date', type: 'number' },
  { name: 'smartcontract', fullname: 'Smart contract', type: 'textfield' },
  { name: 'plus', fullname: '+', type: 'textarea' },
  { name: 'minus', fullname: '-', type: 'textarea' },
  { name: 'website', fullname: 'Website', type: 'textfield' },
  { name: 'github', fullname: 'Github', type: 'textfield' },
];

export const projectTypes = ['blockchain', 'DeFi', 'protocol', 'Sharding', 'Bridge', 'NFT', 'Token', 'scam', 'shitcoin'] as const;
export type ProjectTypes = typeof projectTypes[number];

// export type Blockchain = {
//   name: string;
//   symbol: string;
//   description: string;
//   codename: string,
//   type: 'PoW'|'PoS';
//   creationdate: number;
//   smartcontract: string;
//   plus:string;
//   minus:string;
//   website:string;
//   github:string;
// }

// const propertiesObject = Object.fromEntries(properties.map(prop => [prop.name, prop.type]))

// type Transform<T extends ReadonlyArray<unknown>> = {
//   [K in keyof T]: 
//   T[K] extends readonly any[] ? T[K][number] : T[K] 
// }

// export type Blockchain = Transform<typeof properties>;
// type TypeOf = typeof properties;

// type Test2 = typeof properties[number];
// const test: Test = []
type FromProperties<P extends readonly unknown[]> = {
  [K in IndexKeys<P> as Name<P[K]>]: Type<P[K]>
}
type IndexKeys<A extends readonly unknown[]> = Exclude<keyof A, keyof []>;
type Name<O> = O extends { name: infer N } ? N extends string ? N : never : never; 
type Type<O> = 
  O extends { type: infer T }
  ?   T extends 'number' ? number 
    : T extends 'textfield' ? string 
    : T extends 'textarea' ? string
    : T extends readonly unknown[] ? T[number]
    : never // `name` property is not a number, string or array
  : never // object has no `type` property


export type Project = FromProperties<typeof projectProperties>;
export type Blockchain = FromProperties<typeof blockchainProperties>;