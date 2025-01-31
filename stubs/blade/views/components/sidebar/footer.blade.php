<div class="px-3 flex-shrink-0 lg:hidden">
    <x-button
        type="button"
        icon-only
        variant="secondary"
        x-on:click="toggle()"
        x-show="isOpen"
        sr-text="Toggle sidebar"
    >
        <x-icons.menu-fold-left
            x-show="isOpen"
            class="w-6 h-6"
        />

        <x-icons.menu-fold-right
            x-show="!isOpen"
            class="w-6 h-6"
        />
    </x-button>
</div>
