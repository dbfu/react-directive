import { Fragment, jsxDEV as jsxDEV_ } from 'react/jsx-dev-runtime';
import { transformProps } from '../utils';

import '../directive/default'

function jsxDEV(type, config, maybeKey, source, self) {
  console.log(config);

  // 如果返回false，则表示不渲染组件
  if (transformProps(config) === false) {
    return null;
  }

  return jsxDEV_(type, config, maybeKey, source, self);
}

export { Fragment, jsxDEV };