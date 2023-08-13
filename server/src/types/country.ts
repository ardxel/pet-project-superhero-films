export interface ICountry {
  code: string,
  name: string,
  currency: {
    currencyName: string,
    currencyCode: string,
    currencySymbol: string
  },
  geo: {
    latitude: number,
    longitude: number,
    capital: string,
    phone: string
  }
}