"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/ui/forms/inputs/search/SearchInput";

import axiosInstance from "@/libs/axios";

import styles from "@/styles/components/ui/forms/SearchForm.module.css";

interface Tip {
  brand: string;
  number: string;
  descr: string;
}

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Tip[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.trim().length >= 3) {
      const timeoutId = setTimeout(() => fetchSuggestions(query), 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const fetchSuggestions = async (input: string) => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();

    try {
      const response = await axiosInstance.get<Tip[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/search-tips`,
        {
          params: { number: input },
          signal: abortController.current.signal
        }
      );

      console.log("Response from search-tips API:", response.data); // Оставляем лог для проверки

      if (response.data && response.data.length > 0) {
        setSuggestions(response.data); // Убираем ненужную обработку
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Ошибка при получении подсказок:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (number: string) => {
    setQuery(number);
    setShowSuggestions(false);
    router.push(`/search/${encodeURIComponent(number)}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <SearchInput
        name="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите артикул детали..."
        onClear={() => {
          setQuery("");
          setSuggestions([]);
          setShowSuggestions(false);
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionList}>
          {suggestions.map((tip, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(tip.number)}
              className={styles.suggestionItem}
            >
              <span>{tip.brand}</span> - {tip.number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
