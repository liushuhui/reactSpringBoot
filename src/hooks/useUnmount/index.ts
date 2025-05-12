import { useEffect } from "react";
import { isFunction } from "../../utils";
import useLatest from "../useLatest";

const useUnmount = (fn: () => void) => {
  if (!isFunction(fn)) {
    console.error(`useMount: fn must be a function!, but get ${typeof fn}`);
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export default useUnmount;
