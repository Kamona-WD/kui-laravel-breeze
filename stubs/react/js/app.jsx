import './bootstrap'
import '../css/app.css'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { primaryColor } from '@kui-dashboard/tailwindcss-plugin'

import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'K-UI'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
         const root = createRoot(el)

        root.render(<App {...props} />)
    },
    progress: {
        color: primaryColor
    }
})
