import React from 'react'
import { Link } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'

import './home.less'

const Home: React.FC = () => {
  const [greetMsg, setGreetMsg] = React.useState('')
  const [name, setName] = React.useState('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }))
  }

  return (
    <div className="home container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row mt-md mb-md">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            greet()
          }}
        >
          <input id="greet-input" onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." />
          <button type="submit">Greet</button>
        </form>
      </div>
      <p>{greetMsg}</p>

      <div className="flex center mt-md">
        <Link to="/demo">More demo</Link>
      </div>

      <div className="flex center mt-md">
        <a
          onClick={() => {
            $.window.createWindow('Demo')
          }}
        >
          More demo (New window)
        </a>
      </div>
    </div>
  )
}

export default Home
