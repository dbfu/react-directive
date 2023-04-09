import { isFunction, clone } from 'lodash-es'

import { directiveMap } from './directive';

const refMap = new WeakMap();

export const isDOM = (element) => {
  return element instanceof HTMLElement;
}

export const hasOwnProperty = Object.prototype.hasOwnProperty;

function execHiddenDirective(props, ref) {
  directiveMap.forEach((handle, key) => {
    if (props && hasOwnProperty.call(props, key)) {
      handle?.hidden?.(ref, props[key], props, refMap.get(ref))
    }
  });
}

function execShowDirective(props, ref) {
  directiveMap.forEach((handle, key) => {
    if (props && hasOwnProperty.call(props, key)) {
      handle?.show?.(ref, props[key], props, refMap.get(ref))
    }
  });
}

export const transformProps = (props) => {

  const originProps = clone(props);

  for (let [key, handle] of directiveMap) {
    if (props && hasOwnProperty.call(props, key)) {
      const value = props[key];
      if (handle?.create?.(value, props) === false) {
        return false;
      }
      delete props[key];
    }
  }

  const originRef = props.ref;

  props.ref = (ref) => {
    if (!ref) return;

    const oldProps = refMap.get(ref);
    if (oldProps) {
      // 如果上一次display为none，当前不为none，则说明组件由隐藏变为显示，所以触发show事件
      if ((oldProps?.style?.display === 'none' && originProps?.style?.display !== 'none')) {
        execShowDirective(originProps, ref);
      }

      // 如果上一次display不为none，当前为none，则说明组件由显示变为隐藏，所以触发hidden事件
      if ((oldProps?.style?.display !== 'none' && originProps?.style?.display === 'none')) {
        execHiddenDirective(originProps, ref);
      }
    } else {
      // 能获取到ref说明组件已经渲染了，并且只需要执行一次
      directiveMap.forEach((handle, key) => {
        if (originProps && hasOwnProperty.call(originProps, key)) {
          handle?.mounted?.(ref, originProps[key], originProps, refMap.get(ref))
        }
      });

      if ((originProps?.style?.display !== 'none')) {
        execShowDirective(originProps, ref);
      } else {
        execHiddenDirective(originProps, ref);
      }
    }

    if (originRef) {
      if (isFunction(originRef)) {
        originRef(ref);
      } else if (hasOwnProperty.call(originRef, 'current')) {
        originRef.current = ref;
      }
    }

    refMap.set(ref, props);
  }
}