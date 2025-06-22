import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  RouterProvider } from 'react-router-dom'
import { routers } from './routers/AppRouters.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
         <RouterProvider router={routers} />

    </Provider>
)
