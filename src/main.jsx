import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QuizController from './components/QuizController'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizController/>
  </StrictMode>,
)
