export interface GetData<T> {
  message: string
  data: T
  timestamp: Date
}

export enum LocalStorageName {
  internet_shop_token = 'internet-shop-token',
}
