import codes from "@/data/exRatesCodes";

export default class CurrencyApiService {
  static async getCountries() {
    const countries = []
    const usdRaw = await fetch('https://www.nbrb.by/api/exrates/rates/431');
    const usdData = await usdRaw.json();
    countries.push({
      name: 'Belorussian ruble',
      abbr: 'BYN',
      value: usdData.Cur_OfficialRate / usdData.Cur_Scale,
    })
    for (const code in codes) {
      const raw = await fetch(`https://www.nbrb.by/api/exrates/rates/${codes[code].code}`);
      const data = await raw.json();
      countries.push({
        name: codes[code].name,
        abbr: code,
        value: usdData.Cur_OfficialRate / data.Cur_OfficialRate * data.Cur_Scale,
      })
    }
    return countries
  }
}
