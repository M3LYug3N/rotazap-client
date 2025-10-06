import axios from "axios";

export type Rates = {
  USD: number;
  EUR: number;
  CNY: number;
};

export interface CurrencyRatesResult {
  rates: Rates;
  date: string;
}

export const fetchCurrencyRates = async (): Promise<CurrencyRatesResult> => {
  try {
    const res = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");

    const valutes = res.data.Valute;
    const date = res.data.Date;

    const rates: Rates = {
      USD: valutes.USD.Value,
      EUR: valutes.EUR.Value,
      CNY: valutes.CNY.Value
    };

    return { rates, date };
  } catch (error) {
    console.error("Ошибка запроса к ЦБ РФ:", error);
    throw new Error("Failed to fetch rates");
  }
};
