import { directive } from '.';
import { get, set } from 'lodash-es'
import { isDOM } from '../utils';

const hiddenStyle = {
  display: 'none',
}

directive("v-if", {
  create: (value) => {
    if (!value) return false;
  },
});


directive("v-show", {
  create: (value, props) => {
    if (!value) {
      if (props.style) {
        props.style.display = 'none';
      } else {
        props.style = hiddenStyle;
      }
    }
  },
});

directive("v-model", {
  create: (value, props) => {
    if (!value || !Array.isArray(value)) return;

    const [model, field] = value;
    props.value = get(model, field);
    props.onChange = (e) => {
      set(model, field, e.target.value);
    }
  },
})

directive("v-focus", {
  show: (ref) => {
    ref?.focus?.();
  },
})

directive("v-copy", {
  create: (value, props) => {
    function copyText() {
      var element = createElement(value);
      element.select();
      element.setSelectionRange(0, element.value.length);
      document.execCommand("copy");
      element.remove();
    }

    //创建临时的输入框元素
    function createElement(text) {
      var isRTL = document.documentElement.getAttribute("dir") === "rtl";
      var element = document.createElement("textarea");
      // 防止在ios中产生缩放效果
      element.style.fontSize = "12pt";
      // 重置盒模型
      element.style.border = "0";
      element.style.padding = "0";
      element.style.margin = "0";
      // 将元素移到屏幕外
      element.style.position = "absolute";
      element.style[isRTL ? "right" : "left"] = "-9999px";
      // 移动元素到页面底部
      let yPosition = window.pageYOffset || document.documentElement.scrollTop;
      element.style.top = `${yPosition}px`;
      //设置元素只读
      element.setAttribute("readonly", "");
      element.value = text;
      document.body.appendChild(element);
      return element;
    }

    const originOnClick = props.onClick;

    props.onClick = function () {
      copyText();
      if (originOnClick) {
        originOnClick(...arguments);
      }
    };
  },
});

directive("v-text", {
  create: (value, props) => {
    props.children = [value];
  },
})


directive("v-html", {
  create: (value, props) => {
    props.dangerouslySetInnerHTML = {
      __html: value,
    };
  },
})
