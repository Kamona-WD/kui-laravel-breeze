<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
    />

    <!-- Styles -->
    <style>
        [x-cloak] {
            display: none;
        }
    </style>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased">
    <div
        x-data="globalState"
        :class="{dark: $store.darkMode.value}"
    >
        <div class="text-gray-900 bg-gray-100 dark:text-gray-200 dark:bg-dark-eval-0">
            <div class="container mx-auto py-6 min-h-screen flex flex-col gap-24">
                <div class="flex flex-1 flex-col items-center justify-center gap-24">
                    <div>
                        <a href="/">
                            <x-application-logo class="w-20 h-20" />
                        </a>
                    </div>

                    <main class="w-full sm:max-w-md">
                        {{ $slot }}
                    </main>
                </div>

                <x-footer />
            </div>
        </div>

        <div class="fixed top-10 right-10">
            <x-button
                type="button"
                icon-only
                variant="secondary"
                sr-text="Toggle dark mode"
                x-on:click="$store.darkMode.toggle()"
            >
                <x-kui-icon
                    x-show="!$store.darkMode.value"
                    name="tabler--moon"
                    class="w-6 h-6"
                />

                <x-kui-icon
                    x-show="$store.darkMode.value"
                    name="tabler--sun"
                    class="w-6 h-6"
                />
            </x-button>
        </div>
    </div>
</body>
</html>
