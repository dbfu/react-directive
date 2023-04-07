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
    function copy() {
      navigator.clipboard.writeText(value);
    }

    const originOnClick = props.onClick;

    props.onClick = function () {
      copy();
      if (originOnClick) {
        originOnClick(...arguments);
      }
    }
  },
})

directive("v-text", {
  mounted: (ref, value) => {
    if (isDOM(ref)) {
      ref.innerText = value;
    }
  },
})


directive("v-html", {
  mounted: (ref, value) => {
    if (isDOM(ref)) {
      ref.innerHTML = value;
    }
  },
})