import { useRef } from "react";
import { isPlainObject } from "es-toolkit/compat";
import useCreation from "../useCreation";
import useUpdate from "../useUpdate";

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

function observer<T extends Record<string, any>>(
  initialVal: T,
  cb: () => void
): T {
  const existingProxy = proxyMap.get(initialVal);
  // debugger
  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      console.log("get", res);
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!descriptor?.configurable && !descriptor?.writable) {
        return res;
      }
      return isPlainObject(res) || Array.isArray(res) ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      console.log("set", ret);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      console.log("delete", ret);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  console.log("end", proxy);
  return proxy;
}

function useReactive<S extends Record<string, any>>(initialState: S): S {
  const update = useUpdate();
  const stateRef = useRef<S>(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
}

export default useReactive;
