import { Fragment, jsxDEV as jsxDEV_ } from 'react/jsx-dev-runtime';
import { transformProps } from '../utils';

import '../directive/default'

function jsxDEV(type, config, maybeKey, source, self) {

  let _type = type;

  const result = transformProps(config);
  // 如果返回false，则表示不渲染组件
  if (result === false) {
    return null;
  }

  if (result) {
    _type = result;
  }

  return jsxDEV_(type, config, maybeKey, source, self);
}

export { Fragment, jsxDEV };