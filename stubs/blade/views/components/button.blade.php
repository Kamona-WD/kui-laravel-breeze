@props([
    'variant' => 'primary',
    'iconOnly' => false,
    'srText' => '',
    'href' => false,
    'size' => 'base',
    'disabled' => false,
    'pill' => false,
    'squared' => false
])

@php

    $baseClasses = 'inline-flex items-center transition-colors font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-eval-2';

    switch ($variant) {
        case 'primary':
            $variantClasses = 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500';
        break;
        case 'secondary':
            $variantClasses = 'bg-white text-gray-500 hover:bg-gray-100 focus:ring-purple-500 dark:text-gray-400 dark:bg-dark-eval-1 dark:hover:bg-dark-eval-2 dark:hover:text-gray-200';
        break;
        case 'success':
            $variantClasses = 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500';
        break;
        case 'danger':
            $variantClasses = 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500';
        break;
        case 'warning':
            $variantClasses = 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500';
        break;
        case 'info':
            $variantClasses = 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500';
        break;
        case 'black':
            $variantClasses = 'bg-black text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-black dark:hover:bg-dark-eval-3';
        break;
        default:
            $variantClasses = 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500';
    }

    switch ($size) {
        case 'sm':
            $sizeClasses = $iconOnly ? 'p-1.5' : 'px-2.5 py-1.5 text-sm';
        break;
        case 'base':
            $sizeClasses = $iconOnly ? 'p-2' : 'px-4 py-2 text-base';
        break;
        case 'lg':
        default:
            $sizeClasses = $iconOnly ? 'p-3' : 'px-5 py-2 text-xl';
        break;
    }

    $classes = $baseClasses . ' ' . $sizeClasses . ' ' . $variantClasses;

    if(!$squared && !$pill){
        $classes .= ' rounded-md';
    } else if ($pill) {
        $classes .= ' rounded-full';

    }

@endphp

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
        {{ $slot }}
        @if($iconOnly)
            <span class="sr-only">{{ $srText ?? '' }}</span>
        @endif
    </a>
@else
    <button {{ $attributes->merge(['type' => 'submit', 'class' => $classes]) }}>
        {{ $slot }}
        @if($iconOnly)
            <span class="sr-only">{{ $srText ?? '' }}</span>
        @endif
    </button>
@endif
