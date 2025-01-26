<nav
    aria-label="secondary"
    x-data="{ open: false }"
    class="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-2 transition-transform duration-500 dark:bg-dark-eval-1"
    :class="{
        '-translate-y-full': scrollingDown,
        'translate-y-0 shadow-lg': scrollingUp,
    }">

    <div class="flex items-center gap-3">
        <x-button
            type="button"
            class="md:hidden"
            icon-only
            variant="secondary"
            sr-text="Toggle dark mode"
            x-on:click="$store.darkMode.toggle()"
        >
            <x-icon x-show="!$store.darkMode.value" name="tabler--moon" class="w-6 h-6" />
            <x-icon x-show="$store.darkMode.value" name="tabler--sun" class="w-6 h-6" />
        </x-button>
    </div>

    <div class="flex items-center gap-3">
        <x-button
            type="button"
            class="hidden md:inline-flex"
            icon-only
            variant="secondary"
            sr-text="Toggle dark mode"
            x-on:click="$store.darkMode.toggle()"
        >
            <x-icon x-show="!$store.darkMode.value" name="tabler--moon" class="w-6 h-6" />
            <x-icon x-show="$store.darkMode.value" name="tabler--sun" class="w-6 h-6" />
        </x-button>

        <x-dropdown align="right" width="48">
            <x-slot name="trigger">
                <button
                    class="inline-flex items-center gap-1 p-2 text-sm font-medium text-gray-500 rounded-md transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-eval-1 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <div>{{ Auth::user()->name }}</div>

                    <x-icon name="tabler--chevron-down" />
                </button>
            </x-slot>

            <x-slot name="content">
                <!-- Profile -->
                <x-dropdown-link
                    :href="route('profile.edit')"
                >
                    {{ __('Profile') }}
                </x-dropdown-link>

                <!-- Authentication -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <x-dropdown-link
                        :href="route('logout')"
                        onclick="event.preventDefault(); this.closest('form').submit();"
                    >
                        {{ __('Log Out') }}
                    </x-dropdown-link>
                </form>
            </x-slot>
        </x-dropdown>
    </div>
</nav>

<!-- Mobile bottom bar -->
<div
    class="fixed inset-x-0 z-10 bottom-0 flex items-center justify-between px-4 py-4 sm:px-6 transition-transform duration-500 bg-white md:hidden dark:bg-dark-eval-1"
    :class="{
        'translate-y-full': scrollingDown,
        'translate-y-0 shadow-t-lg': scrollingUp,
    }"
>
    <x-button
        type="button"
        icon-only
        variant="secondary"
        sr-text="Search"
    >
        <x-icon name="tabler--search" class="w-6 h-6" />
    </x-button>

    <a href="{{ route('dashboard') }}">
        <x-application-logo aria-hidden="true" class="w-10 h-10" />

        <span class="sr-only">Dashboard</span>
    </a>

    <x-button
        type="button"
        icon-only
        variant="secondary"
        sr-text="Open main menu"
        x-on:click="$store.sidebar.open()"
    >
        <x-icon name="tabler--menu" class="w-6 h-6" />
    </x-button>
</div>
