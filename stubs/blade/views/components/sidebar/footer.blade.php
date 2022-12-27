<div class="px-3 flex-shrink-0 lg:hidden">
    <x-button
        type="button"
        icon-only
        variant="secondary"
        x-show="!isSidebarOpen"
        x-on:click="isSidebarOpen = !isSidebarOpen"
        sr-text="Toggle sidebar"
    >
        <x-icons.menu-fold-left
            x-show="isSidebarOpen"
            class="w-6 h-6"
        />

        <x-icons.menu-fold-right
            x-show="!isSidebarOpen"
            class="w-6 h-6"
        />
    </x-button>
</div>
