import { codes } from '@/data/exRatesCodes';

export interface IRate {
  name: string;
  abbr: string;
  value: number;
}

export default class CurrencyService {
  static async getCountries() {
    const rates: IRate[] = [];
    const usdRaw = await fetch('https://www.nbrb.by/api/exrates/rates/431');
    const usdData = await usdRaw.json();
    rates.push({
      name: 'Рубль',
      abbr: 'BYN',
      value: usdData.Cur_OfficialRate / usdData.Cur_Scale,
    });
    for (const code in codes) {
      const raw = await fetch(
        `https://www.nbrb.by/api/exrates/rates/${
          codes[code as keyof typeof codes].code
        }`
      );
      const data = await raw.json();
      rates.push({
        name: codes[code as keyof typeof codes].name,
        abbr: code,
        value:
          (usdData.Cur_OfficialRate / data.Cur_OfficialRate) * data.Cur_Scale,
      });
    }
    return rates;
  }
}
