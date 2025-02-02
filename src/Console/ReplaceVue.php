<?php

namespace KUI\Breeze\Console;

use Illuminate\Filesystem\Filesystem;

trait ReplaceVue
{
    protected function replaceVue()
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) {
            $extraPackages = [
                '@headlessui/vue' => '^1.7.13',
                '@vueuse/core' => '^10.1.2',
                '@vitejs/plugin-vue-jsx' => '^4.1.1',
                '@iconify/tailwind' => '^1.2.0',
                '@iconify-json/tabler' => '^1.2.15',
                '@kui-dashboard/tailwindcss-plugin' => '^0.1.0',
                'perfect-scrollbar' => '^1.5.5',
                'tailwind-merge' => '^2.6.0',
            ];

            return $extraPackages + $packages;
        });

        // Routes
        copy(__DIR__ . '/../../stubs/vue/web.php', base_path('routes/web.php'));

        // Components + Pages...
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Components'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Composables'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Layouts'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Pages'));

        // Clean directories
        (new Filesystem)->cleanDirectory(resource_path('js/Components'));
        (new Filesystem)->cleanDirectory(resource_path('js/Composables'));
        (new Filesystem)->cleanDirectory(resource_path('js/Layouts'));
        (new Filesystem)->cleanDirectory(resource_path('js/Pages'));

        // Copy
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Components', resource_path('js/Components'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Composables', resource_path('js/Composables'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Layouts', resource_path('js/Layouts'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Pages', resource_path('js/Pages'));

        // Tailwind / Assets...
        copy(__DIR__ . '/../../stubs/vue/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/common/css/app.css', resource_path('css/app.css'));

        copy(__DIR__ . '/../../stubs/common/inertia/layout/app.blade.php', resource_path('views/app.blade.php'));
        copy(__DIR__ . '/../../stubs/vue/js/app.js', resource_path('js/app.js'));
        copy(__DIR__ . '/../../stubs/vue/vite.config.js', base_path('vite.config.js'));

        $this->afterReplaceFiles();

        return 0;
    }
}