<div class="flex flex-shrink-0 items-center justify-between px-3">
    <!-- Logo -->
    <a
        href="{{ route('dashboard') }}"
        class="inline-flex items-center gap-2"
    >
        <x-application-logo aria-hidden="true" class="w-10 h-auto" />

        <span class="sr-only">Dashboard</span>
    </a>

    <!-- Toggle button -->
    <x-button
        type="button"
        icon-only
        sr-text="Toggle sidebar"
        variant="secondary"
        x-show="isOpen || isHovered"
        x-on:click="toggle"
    >
        <x-icons.menu-fold-right
            x-show="!isOpen"
            aria-hidden="true"
            class="hidden w-6 h-6 lg:block"
        />

        <x-icons.menu-fold-left
            x-show="isOpen"
            aria-hidden="true"
            class="hidden w-6 h-6 lg:block"
        />

        <x-icon
            name="tabler--x"
            class="w-6 h-6 lg:hidden"
        />
    </x-button>
</div>
