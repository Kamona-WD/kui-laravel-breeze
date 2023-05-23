import './bootstrap'
import '../css/app.css'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'K UI'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        return render(<App {...props} />, el)
    },
    progress: {
        color: '#a855f7'
    }
})
