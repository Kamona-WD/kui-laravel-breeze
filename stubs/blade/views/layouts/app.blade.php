<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'K UI') }}</title>

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
        :class="{ dark: $store.darkMode.value }"
    >
        <div class="min-h-screen flex text-gray-900 bg-gray-100 dark:bg-dark-eval-0 dark:text-gray-100">
            <!-- Sidebar -->
            <x-sidebar.sidebar />

            <!-- Page Wrapper -->
            <div
                class="flex-1 flex flex-col min-h-screen transition-[margin] duration-150 md:ms-16 lg:ms-64"
                :class="{
                    'lg:ms-64': $store.sidebar.isOpen,
                }"
            >

                <!-- Navbar -->
                <x-navbar />

                <div class="container mx-auto flex-1 flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
                    <!-- Page Heading -->
                    <header class="flex-shrink-0 w-full">
                        {{ $header }}
                    </header>
    
                    <!-- Page Content -->
                    <main class="flex-1 w-full">
                        {{ $slot }}
                    </main>
    
                    <!-- Page Footer -->
                    <x-footer />
                </div>
            </div>
        </div>
    </div>
</body>
</html>
