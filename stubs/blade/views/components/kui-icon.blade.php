@props(['name'])

@php
$baseClasses = 'iconify ' . $name
@endphp

<span aria-hidden="true" {{ $attributes->merge(['class' => $baseClasses]) }}></span>