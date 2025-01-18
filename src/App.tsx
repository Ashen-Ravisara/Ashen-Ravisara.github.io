import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './Styles/mainTheme'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App