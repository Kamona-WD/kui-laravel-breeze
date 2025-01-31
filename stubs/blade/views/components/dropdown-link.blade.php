<a {{ $attributes->merge(['class' => 'block px-4 py-2 text-sm leading-5 text-gray-800 transition duration-150 ease-in-out hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white dark:focus:bg-primary dark:focus:text-white']) }}>
    {{ $slot }}
</a>
