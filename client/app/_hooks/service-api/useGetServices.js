import { useEffect, useState } from "react";

export default function useGetServices() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await fetchServiceData();

      console.log("res", res);

      setError(null);
      setData(res.data);
    } catch (error) {
      console.log("failed to fetch services", error);
      setData([]);
      setError({ message: "Failed to fetch services", error });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
}

async function fetchServiceData() {
  const response = await fetch(`/api/services`);

  console.log("response", response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}
