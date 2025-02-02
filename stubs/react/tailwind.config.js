import forms from '@tailwindcss/forms'
import { addIconSelectors } from '@iconify/tailwind'
import twPlugin from '@kui-dashboard/tailwindcss-plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx}',
    ],

    theme: {
        extend: {

        },
    },

    plugins: [
        forms,
        twPlugin,
        addIconSelectors(['tabler']),
    ],
}
