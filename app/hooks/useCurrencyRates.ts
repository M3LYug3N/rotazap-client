import { useEffect, useState } from "react";

import { fetchCurrencyRates } from "@/libs/api/rates";

export type Rates = {
  USD: number;
  EUR: number;
  CNY: number;
};

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCurrencyRates()
      .then(({ rates, date }) => {
        setRates(rates);
        setDate(date);
      })
      .catch(err => setError(err));
  }, []);

  return { rates, date, error };
};
