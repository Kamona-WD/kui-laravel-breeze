<footer class="flex w-full flex-shrink-0 flex-col items-center gap-2 lg:flex-row lg:justify-between">
    <div x-data class="text-sm text-gray-500 dark:text-gray-400">
        ©<span x-text="new Date().getFullYear()"></span>
        K UI, All rights reserved
    </div>

    <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <span>Hand-crafted &amp; Made with </span>

        <div class="inline-flex">
            <span class="sr-only">love</span>
            <x-icon name="tabler--heart-filled" class="w-5 h-5 text-red-500" />
        </div>

        <span>by</span>

        <a href="https://github.com/Kamona-WD" target="_blank" class="text-blue-600 hover:underline"> Ahmed Kamel </a>
    </div>
</footer>