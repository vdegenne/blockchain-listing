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

export const properties = [
  { name: 'name', fullname: 'Name', type: '' },
  { name: 'symbol', fullname: 'Symbol', type: '' },
  { name: 'description', fullname: 'Description', type: ''},
  { name: 'codename', fullname: 'Code name', type: ''},
  { name: 'type', fullname: 'Type', type: ['PoW', 'PoS'] as const },
  { name: 'creationdate', fullname: 'Creation date', type: 0 },
  { name: 'smartcontract', fullname: 'Smart contract', type: '' },
  { name: 'plus', fullname: '+', type: '' },
  { name: 'minus', fullname: '-', type: '' },
  { name: 'website', fullname: 'Website', type: '' },
  { name: 'github', fullname: 'Github', type: '' },
]

export type Blockchain = {
  name: string;
  symbol: string;
  description: string;
  codename: string,
  type: 'PoW'|'PoS';
  creationdate: number;
  smartcontract: string;
  plus:string;
  minus:string;
  website:string;
  github:string;
}

// const propertiesObject = Object.fromEntries(properties.map(prop => [prop.name, prop.type]))

// type Transform<T extends ReadonlyArray<unknown>> = {
//   [K in keyof T]: 
//   T[K] extends readonly any[] ? T[K][number] : T[K] 
// }

// export type Blockchain = Transform<typeof properties>;
// type TypeOf = typeof properties;

// type Test2 = typeof properties[number];
// const test: Test = []