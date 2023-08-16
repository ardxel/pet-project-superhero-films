import { useEffect, useMemo, useState } from 'react';

type Callback = (...args: any[]) => Promise<any>;

export function useFetch<T, F extends Callback>(fn: F, ...args: Parameters<typeof fn>) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fn>> | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fn(...args);
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [...args]);

  return { data, isLoading, error };
}

export function useLazyFetch<F extends Callback = Callback>(
  fn: F,
  ...args: Parameters<typeof fn>[]
): [
  (...args: Parameters<typeof fn>) => Promise<ReturnType<F>>,
  {
    data: Awaited<ReturnType<typeof fn>> | undefined;
    isLoading: boolean;
    error: any;
  },
] {
  const [data, setData] = useState<Awaited<ReturnType<typeof fn>> | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const lazyFetch = useMemo(
    () =>
      async (...args: Parameters<typeof fn>) => {
        setIsLoading(false);
        const data = await fn(args);
        setIsLoading(true);
        return data as ReturnType<typeof fn>;
      },
    [],
  );
  const response = { data, isLoading, error };

  return [lazyFetch, response];
}
