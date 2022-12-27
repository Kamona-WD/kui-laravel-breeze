<x-app-layout>
    <x-slot name="header">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-semibold leading-tight">
                {{ __('Text Buttons') }}
            </h2>

            <x-button
                target="_blank"
                href="https://github.com/kamona-wd/kui-laravel-breeze"
                variant="black"
                class="items-center max-w-xs gap-2"
            >
                <x-icons.github class="w-6 h-6" aria-hidden="true" />

                <span>Star on Github</span>
            </x-button>
        </div>
    </x-slot>

    <p class="py-4 text-gray-600 dark:text-gray-400">Useless Pages to demo sidebar.</p>

    <div class="py-6">
        @php
            $variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'black'];

            $sizes = ['sm', 'base', 'lg'];
        @endphp


        <div class="grid items-center gap-4">
            @foreach ($variants as $variant)
                <div class="grid items-start grid-cols-3 gap-4 justify-items-center">
                    @foreach ($sizes as $size)
                        <x-button
                            :variant="$variant"
                            size="{{ $size }}"
                        >
                            Button
                        </x-button>
                    @endforeach
                </div>
            @endforeach
        </div>
    </div>
</x-app-layout>
