import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './Styles/mainTheme'
import Layout from './Layout'
import HomeScreen from './Pages/Home/HomeScreen'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App