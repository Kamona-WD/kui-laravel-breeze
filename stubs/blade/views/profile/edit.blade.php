<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl leading-tight">
            {{ __('Profile') }}
        </h2>
    </x-slot>

    <div x-tabs class="bg-white dark:bg-dark-eval-2 overflow-hidden rounded-md shadow-md">
        <div x-tabs:btns class="dark:bg-gray-800 grid items-center justify-center w-full grid-cols-1 select-none md:grid-cols-3">
            <button x-tabs:btn type="button" :class="{ 'bg-primary text-white': active }"
                class="relative overflow-hidden z-20 inline-flex items-center justify-center w-full px-4 py-2 font-medium transition-all cursor-pointer whitespace-nowrap">
                Profile information
            </button>
            <button x-tabs:btn type="button" :class="{ 'bg-primary text-white': active }"
                class="relative overflow-hidden z-20 inline-flex items-center justify-center w-full px-4 py-2 font-medium transition-all cursor-pointer whitespace-nowrap">
                Password
            </button>
            <button x-tabs:btn type="button" :class="{ 'bg-primary text-white': active }"
                class="relative overflow-hidden z-20 inline-flex items-center justify-center w-full px-4 py-2 font-medium transition-all cursor-pointer whitespace-nowrap">
                Delete
            </button>
            <div x-tabs:marker class="absolute left-0 z-10 h-full duration-300 ease-out" x-cloak>
                <div class="w-full h-full bg-primary shadow-sm"></div>
            </div>
        </div>

        <div x-tabs:panels class="w-full">
            <div x-tabs:panel x-collapse class="relative">
                <div class="p-4 sm:p-8">
                    <div class="max-w-xl">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>
            </div>

            <div x-tabs:panel x-collapse x-cloak class="relative">
                <div class="p-4 sm:p-8">
                    <div class="max-w-xl">
                        @include('profile.partials.update-password-form')
                    </div>
                </div>
            </div>

            <div x-tabs:panel x-collapse class="relative" x-cloak>
                <div class="p-4 sm:p-8">
                    <div class="max-w-xl">
                        @include('profile.partials.delete-user-form')
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
