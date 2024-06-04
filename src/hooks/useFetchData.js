import { useQuery } from "react-query";

import { useRef } from "react";
import { getData } from "../services/service";

export const useFetchData = () => {
  const countRef = useRef(0);

  const { data, isLoading } = useQuery(
    ["fetchData"],
    async () => {
      countRef.current += 1;
      return await getData();
    },
    {
      refetchInterval: () => 5000,
    }
  );

  return { data, isLoading };
};
