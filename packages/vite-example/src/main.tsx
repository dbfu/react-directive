import React from 'react'
import ReactDOM from 'react-dom/client'
import { get, set } from 'lodash-es'
import App from './App'
import './index.css'


import { directive } from '@dbfu/react-directive/directive'





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
