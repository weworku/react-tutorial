import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('saito')
  // React のstrict mode では、初回に２回レンダリングされる。
  useEffect((): void => {
    //fetch('APIのエンドポイントを記述')
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        setName(data.name);
      })
      .catch(error => console.error("Fetching data failed", error));
  }, [name]);// 空の依存配列を渡すことで、コンポーネントのマウント時に一度だけ実行される

  return (
    <>
      Hello World!<br />
      {name}
    </>
  )
}

export default App
