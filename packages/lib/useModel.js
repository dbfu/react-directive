import { useState, useMemo, useRef } from 'react'
import { isPlainObject } from 'lodash-es'

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

function observer(initialVal, cb) {

  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isPlainObject(res) || Array.isArray(res) ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}

function useModel(initialState) {
  const [, update] = useState({});

  const stateRef = useRef(initialState);

  const state = useMemo(() => {
    return observer(stateRef.current, () => {
      update({});
    })
  }, []);


  return state;
}

export default useModel;