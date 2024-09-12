import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// mount function to start up the app
const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    )
}

// case 1: development and in isolated, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')

    if (devRoot) {
        mount(devRoot)
    }
}

// case 2: running through container, export mount function
export { mount }