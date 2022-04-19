import React from "react";

import { useLocation } from "react-router-dom";

// https://v5.reactrouter.com/web/example/query-parameters
export default function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [ search ]);
}
