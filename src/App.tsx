import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './Styles/mainTheme'
import Layout from './Layout'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <Layout>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App