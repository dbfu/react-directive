# @dbfu/react-directive

在react项目中使用vue指令，支持自定义指令。

## 安装依赖

```
npm i @dbfu/react-directive
```

## 使用说明

如果使用typescript，修改tsconfig.json文件

```js
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@dbfu/react-directive",
  }
}
```

如果使用webpack打包，修改babel.config.json或修改.babelrc

```js
// .babelrc / babel.config.json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "@dbfu/react-directive"
      }
    ]
  ]
}

```

如果使用vite

```js
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@dbfu/react-directive'
  })],
})
```


如果使用umi，先安装@babel/preset-react依赖，然后修改.umirc配置文件

```js
 import { defineConfig } from "umi";

export default defineConfig({
  extraBabelPresets: [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "@dbfu/react-directive"
      }
    ]
  ],
});
```

如果使用react-create-app，先安装@babel/preset-react，然后修改package.json文件，添加babel属性。

```js
{
"babel": {
    "presets": [
      "react-app",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic",
          "importSource": "@dbfu/react-directive"
        }
      ]
    ]
  },
}
```

然后就可以在项目中，使用框架内置的指令

```js
function App() {

  const model = useModel({ name: "jack" });

  return (
    <div v-if={false} v-show={false} v-model={[model, "name"]}>
  )
}
```

# 内置指令使用文档

## v-if

和vue中的v-if一样，这个不仅可以对原生dom使用，还能对组件进行使用。

## v-show

和vue中的v-show一样，这个只能对原生dom使用，因为会修改dom元素的style中display属性，如果组件支持style.display属性的话，也可以使用v-show。

## v-model

这个指令效果和vue中的v-model差不多，但是用法有点区别，创建的对象必须用useModel这个hooks包装一下，还有v-model指令需要传数组，第一个值是对象，第二个参数是对象里面的key，支持多层级key。看下面的例子:

```jsx
import useModel from '@dbfu/react-directive/useModel'

function App() {
 
 const model = useModel({ user: { name: 'tom' } });

 return (
  <div>
    <input v-model={[model, 'user.name']} />
    <div>{model?.user?.name}</div>
  </div>
 )
}

```

## v-focus

表单元素自动获得焦点，和原生autoFocus属性不同的是，这个可以在一开始`display：none`的情况下，后面再显示时也能自动获取焦点，这个autoFocus就实现不了。只要组件实现了focus方法，也可以对组件进行使用。

## v-copy

点击当前元素时，会把当前指令的值复制到剪切板上，只要支持onClick事件，无论组件或原生dom元素，都可以使用这个指令

## v-text

和vue实现效果一样，只支持原生dom元素。

## v-html

和vue实现效果一样，只支持原生dom元素。

# 自定义指令

在项目入口，从`@dbfu/react-directive/directive`引入`directive`，然后就可以自定义指令了。语法如下：

```js
import { directive } from "@dbfu/react-directive/directive"

// name 指令名称
directive("name", {
  // 组件渲染之前，在createElement的时候，在这个生命周期可以处理组件props，然后组件渲染的时候，可以拿到处理后的props。注意这个方法只要组件一重新render，就会触发一次。如果返回false这个组件就不渲染了。
  // value：当前指令的值
  // props：当前组件的props
  create: (value, props) => {
     // example v-show的实现
     if(value === false) {
       if(props?.style) {
         props.style.display = 'none';
       } else {
         props.style = { display: 'none' };
       }
     } 
  },
  // dom元素和组件渲染的时候触发，正常情况只会触发一次。如果组件多次销毁和渲染，每次渲染都会触发这个方法。
  // 这个方法里面不能处理props，但是可以拿到组件引用活dom元素引用，可以去调用组件或dom元素的方法
  // ref：如果是组件则是组件引用，如果是dom元素就是dom的引用。
  // value：当前指令的值
  // props：当前组件的props
  mounted: (ref, value, props) => {
     // example v-text的实现
     if(isDOM(ref)) {
       ref.innerText = value;
     }

      // example v-html的实现
     if(isDOM(ref)) {
       ref.innerHTML = value;
     } 
  },
  // 这个方法是组件style.display由none转换为block时触发
  // 参数和mounted一样
  show: (ref, value, props) => {
     // example v-focus的实现
     ref?.focus?.();
  },
  // 和show相反
  hidden: (ref, value, props) => {
    // 暂无使用场景
  }
});
```
