import './bootstrap'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/react'

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'K UI'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(<App {...props} />, el)
    },
    progress: {
        color: '#a855f7'
    }
})
