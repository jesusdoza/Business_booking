import { useState, useEffect } from "react";

export default function useGetAppointments(date) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setError(null);
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetchAppointmentsData({
          signal: controller.signal,
          date,
        });
        console.log('resposnse:',res)
        setError(null);
        setData(res);
      } catch (error) {
        console.log("failed to fetch appointment Data", error);
        setData([]);
        setError({ message: "failed to fetch appointment Data", error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [date]);
  return { data, error, isLoading };
}

async function fetchAppointmentsData({ date, signal }) {
  const params = new URLSearchParams({ date });
  const response = await fetch(`/api/appointment/all?${params}`, { signal });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
