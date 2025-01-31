@props([
    'icon',
    'iconClasses' => 'w-6 h-6'
])

<div class="relative text-gray-500 focus-within:text-gray-900 dark:focus-within:text-gray-400">
    <div
        aria-hidden="true"
        class="absolute inset-y-0 flex items-center px-4 pointer-events-none"
    >
        <x-kui-icon name="{{ $icon }}" class="{{ $iconClasses }}" />
    </div>

    {{ $slot }}
</div>
