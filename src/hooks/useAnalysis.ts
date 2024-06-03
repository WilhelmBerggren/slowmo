import { createContext, useContext, useState } from "react";
import { analyzeText } from "../analysis";

type Analysis = { numWords: number; numLetters: number };
export const AnalysisCache = createContext(new Map<string, Analysis>());

export function useAnalysis() {
  const analysisCache = useContext(AnalysisCache);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Analysis>();

  function performAnalysis(text: string) {
    if (analysisCache.has(text)) {
      setResult(analysisCache.get(text));
      return;
    }
    setLoading(true);
    analyzeText(text)
      .then((res) => {
        setResult(res);
        analysisCache.set(text, res);
      })
      .catch((err) => setError(`${err}`))
      .finally(() => setLoading(false));
  }

  return {
    error,
    result,
    loading,
    performAnalysis,
  };
}
