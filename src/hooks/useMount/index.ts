import { useEffect } from "react";
import { isFunction } from "../../utils";

const useMount = (fn: () => void) => {
  if (!isFunction(fn)) {
    console.error(`useMount: fn must be a function!, but get ${typeof fn}`);
  }

  useEffect(() => {
    fn?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
