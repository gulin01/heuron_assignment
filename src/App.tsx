import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Assignment1 from './pages/Assignment1'
import Assignment2 from './pages/Assignment2'
import NotFound from './pages/NotFound'
import { GrayscaleProvider } from './context/GrayScaleContext'
import Home from './pages/Home'
import Assignment3 from './pages/Assignment3'

function App() {
  return (
    <div className='App'>
      <GrayscaleProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/task1' element={<Assignment1 />} />
            <Route path='/task2' element={<Assignment2 />} />
            <Route path='/task3' element={<Assignment3 />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </GrayscaleProvider>
    </div>
  )
}

export default App
