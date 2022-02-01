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
    const eurRaw = await fetch('https://www.nbrb.by/api/exrates/rates/451');
    const eurData = await eurRaw.json();
    countries.push({
      name: 'Euro',
      abbr: eurData.Cur_Abbreviation,
      value: usdData.Cur_OfficialRate / eurData.Cur_OfficialRate * eurData.Cur_Scale,
    })
    const rubRaw = await fetch('https://www.nbrb.by/api/exrates/rates/456');
    const rubData = await rubRaw.json();
    countries.push({
      name: 'Russian ruble',
      abbr: rubData.Cur_Abbreviation,
      value: usdData.Cur_OfficialRate / rubData.Cur_OfficialRate * rubData.Cur_Scale,
    })
    return countries
  }
}
