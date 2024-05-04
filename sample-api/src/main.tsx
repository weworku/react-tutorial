import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // https://qiita.com/asahina820/items/665c55594cfd55e6f14a
  // StrictMode は副作用を検出するためにレンダリングを2回行う！！
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
