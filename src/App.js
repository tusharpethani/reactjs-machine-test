import React from 'react'
import ThemeProvider from './theme'
import FoodList from './page/FoodList'

const App = () => {
  return (
    <ThemeProvider>
      <FoodList />
    </ThemeProvider>
  )
}

export default App