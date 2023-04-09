import React, { useState, forwardRef, useImperativeHandle } from 'react'
import useModel from '@dbfu/react-directive/useModel'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Demo = forwardRef((_, ref) => {

  useImperativeHandle(ref, () => {
    return {
      name: 'demo'
    }
  }, []);


  return (
    <div>demo</div>
  )
})


function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false);

  const ref = React.createRef<any>();

  const model = useModel({ name: 'tom' });

  return (
    <div className="App">
      <Demo v-if={false} ref={ref} v-copy="4444" />
      <input v-focus v-show={show} />
      <div v-if={show} v-copy="44444">copy</div>
      <div
        onClick={() => {
          console.log(2222)
          console.log(ref.current)
        }}
        v-if="dddd"
      >
        {model.name}
      </div>
      <div v-model={[model, '222']} style={{ display: 'inline-block' }} title='6666' v-show={323232}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1
        onClick={() => {
          setShow(prev => !prev)
        }}
      >
        Vite + React
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p style={{ height: 800 }} className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div >
  )
}

export default App
