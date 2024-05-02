import './App.css'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './Store/Store'
import { BrowserRouter } from 'react-router-dom'

function App() {


  return (
    <>
        <Provider store={store} >
      <BrowserRouter>
          <Home />
      </BrowserRouter>
        </Provider>
    </>
  )
}

export default App
