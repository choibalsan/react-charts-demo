export interface Position {
  id: string,
  asOf: string,
  asset: string,
  quantity: number,
  price: number,
}

export interface FullPosition extends Position {
  type: string,
  value: number,
}
