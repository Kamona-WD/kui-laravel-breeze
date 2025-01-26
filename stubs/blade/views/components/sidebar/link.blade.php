@props([
    'isActive' => false,
    'title' => '',
    'collapsible' => false,
    'icon' => null,
])

@php
    $isActiveClasses =  $isActive ? 'text-white bg-purple-500 shadow-lg hover:bg-purple-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2';

    $classes = 'flex-shrink-0 flex items-center gap-2 p-2 transition-colors rounded-md overflow-hidden ' . $isActiveClasses;

    if($collapsible) $classes .= ' w-full';
@endphp

@if ($collapsible)
    <button type="button" {{ $attributes->merge(['class' => $classes]) }} >
        @if ($icon)
            <x-icon name="{{ $icon }}" class="flex-shrink-0 w-6 h-6" />
        @else
            <x-icon name="tabler--circle" class="flex-shrink-0 w-6 h-6" />
        @endif

        <span
            class="text-base font-medium whitespace-nowrap"
            x-show="isOpen || isHovered"
        >
            {{ $title }}
        </span>

        <span
            x-show="isOpen || isHovered"
            aria-hidden="true"
            class="relative block ml-auto w-6 h-6"
        >
            <span
                :class="open ? '-rotate-45' : 'rotate-45'"
                class="absolute right-[9px] bg-gray-400 mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200"
            ></span>

            <span
                :class="open ? 'rotate-45' : '-rotate-45'"
                class="absolute left-[9px] bg-gray-400 mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200"
            ></span>
        </span>
    </button>
@else
    <a {{ $attributes->merge(['class' => $classes]) }}>
        @if ($icon)
            <x-icon name="{{ $icon }}" class="flex-shrink-0 w-6 h-6" />
        @else
            <x-icon name="tabler--circle" class="flex-shrink-0 w-6 h-6" />
        @endif

        <span
            class="text-base font-medium"
            x-show="isOpen || isHovered"
        >
            {{ $title }}
        </span>
    </a>
@endif
