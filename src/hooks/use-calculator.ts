"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useForm,
  type UseFormReturn,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodType } from "zod";

interface UseCalculatorOptions<TInput extends FieldValues, TResult> {
  schema: ZodType<TInput>;
  defaults: DefaultValues<TInput>;
  calculate: (input: TInput) => TResult;
  storageKey?: string;
}

interface UseCalculatorReturn<TInput extends FieldValues, TResult> {
  form: UseFormReturn<TInput>;
  results: TResult | null;
  isCalculated: boolean;
  onCalculate: () => void;
  onReset: () => void;
}

export function useCalculator<TInput extends FieldValues, TResult>({
  schema,
  defaults,
  calculate,
  storageKey,
}: UseCalculatorOptions<TInput, TResult>): UseCalculatorReturn<
  TInput,
  TResult
> {
  const [results, setResults] = useState<TResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Load persisted values from localStorage
  const getInitialValues = useCallback((): DefaultValues<TInput> => {
    if (!storageKey || typeof window === "undefined") {
      return defaults;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved) as DefaultValues<TInput>;
      }
    } catch {
      // Ignore parse errors and fall back to defaults
    }
    return defaults;
  }, [storageKey, defaults]);

  const form = useForm<TInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    defaultValues: getInitialValues(),
  });

  // Persist inputs to localStorage when storageKey is provided
  useEffect(() => {
    if (!storageKey) return;

    const subscription = form.watch((values) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        // Ignore storage errors (e.g. quota exceeded)
      }
    });

    return () => subscription.unsubscribe();
  }, [form, storageKey]);

  // Restore saved inputs on mount
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as TInput;
        form.reset(parsed as DefaultValues<TInput>);
      }
    } catch {
      // Ignore parse errors
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCalculate = useCallback(() => {
    form.handleSubmit((data) => {
      const result = calculate(data);
      setResults(result);
      setIsCalculated(true);
    })();
  }, [form, calculate]);

  const onReset = useCallback(() => {
    form.reset(defaults);
    setResults(null);
    setIsCalculated(false);

    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // Ignore storage errors
      }
    }
  }, [form, defaults, storageKey]);

  return {
    form,
    results,
    isCalculated,
    onCalculate,
    onReset,
  };
}
