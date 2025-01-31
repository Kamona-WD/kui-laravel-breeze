import forms from '@tailwindcss/forms'
import twPlugin from '@kui-dashboard/tailwindcss-plugin'
import { addIconSelectors } from '@iconify/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{vue,js,jsx}',
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
