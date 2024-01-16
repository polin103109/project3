import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './Context/UserContext.jsx'
import { SpinnerProvider } from './Context/Wheelcontext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
            <SpinnerProvider>
                <App />
            </SpinnerProvider>
        </UserProvider>
  </React.StrictMode>,
)
