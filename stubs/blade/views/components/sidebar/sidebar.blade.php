<x-sidebar.overlay />

<aside
    x-sidebar
    class="fixed inset-y-0 z-40 flex w-64 -translate-x-full flex-col gap-6 bg-white py-3 shadow-lg transition-all duration-200 dark:bg-dark-eval-1 md:transition-[width] lg:translate-x-0"
    :class="{
         'translate-x-0 w-64': isOpen || isHovered,
        '-translate-x-full w-64 md:w-16 md:translate-x-0': !isOpen && !isHovered,
    }"
    @resize.window="handleWindowResize"
>
    <x-sidebar.header />

    <x-sidebar.content />

    <x-sidebar.footer />
</aside>
