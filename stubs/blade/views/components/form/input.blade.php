@props([
    'disabled' => false,
    'icon' => null,
    'iconClasses' => 'w-5 h-5',
])

@if($icon)
    <div class="relative text-gray-500 focus-within:text-gray-900 dark:focus-within:text-gray-400">
        <div
            aria-hidden="true"
            class="absolute inset-y-0 flex items-center px-4 pointer-events-none"
        >
            <x-kui-icon name="{{ $icon }}" class="{{ $iconClasses }}" />
        </div>

        <input
            {{ $disabled ? 'disabled' : '' }}
            {!! $attributes->merge([
                    'class' => 'pl-11 pr-4 py-2 border-gray-400 rounded-md focus:border-gray-400 focus:ring
                    focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-600 dark:bg-dark-eval-1
                    dark:text-gray-300 dark:focus:ring-offset-dark-eval-1',
                ])
            !!}
        >
    </div>
@else
    <input
        {{ $disabled ? 'disabled' : '' }}
        {!! $attributes->merge([
                'class' => 'px-4 py-2 border-gray-400 rounded-md focus:border-gray-400 focus:ring
                focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-600 dark:bg-dark-eval-1
                dark:text-gray-300 dark:focus:ring-offset-dark-eval-1',
            ])
        !!}
    >
@endif