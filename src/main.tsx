import React from 'react'
import ReactDOM from 'react-dom/client'
import { Tooltip } from 'react-tooltip'
import { ToastContainer } from 'react-toastify'

import App from './App.tsx'

import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <Tooltip id="tooltip" />
        <ToastContainer
            position='bottom-left'
            autoClose={2000}
        />
    </React.StrictMode>,
)
