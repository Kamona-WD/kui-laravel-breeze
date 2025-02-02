<?php

namespace KUI\Breeze\Console;

use Illuminate\Filesystem\Filesystem;

trait ReplaceReact
{
    protected function replaceReact()
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) {
            return [
                '@headlessui/react' => '^1.7.14',
                '@iconify-json/tabler' => '^1.2.15',
                '@iconify/tailwind' => '^1.2.0',
                '@kui-dashboard/tailwindcss-plugin' => '^0.1.0',
                'react-transition-group' => '^4.4.2',
                'perfect-scrollbar' => '^1.5.5',
                'tailwind-merge' => '^3.0.1',
            ] + $packages;
        });

        // Routes
        copy(__DIR__ . '/../../stubs/react/web.php', base_path('routes/web.php'));

        // Components + Pages...
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Components'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Hooks'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Layouts'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Pages'));
        (new Filesystem)->ensureDirectoryExists(resource_path('views'));

        // Clean directories
        (new Filesystem)->cleanDirectory(resource_path('js/Components'));
        (new Filesystem)->cleanDirectory(resource_path('js/Hooks'));
        (new Filesystem)->cleanDirectory(resource_path('js/Layouts'));
        (new Filesystem)->cleanDirectory(resource_path('js/Pages'));

        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react/js/Components', resource_path('js/Components'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react/js/Hooks', resource_path('js/Hooks'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react/js/Layouts', resource_path('js/Layouts'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/react/js/Pages', resource_path('js/Pages'));

        // Tailwind / Assets...
        copy(__DIR__ . '/../../stubs/react/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/common/css/app.css', resource_path('css/app.css'));

        copy(__DIR__ . '/../../stubs/common/inertia/layout/app.blade.php', resource_path('views/app.blade.php'));
        copy(__DIR__ . '/../../stubs/react/js/app.jsx', resource_path('js/app.jsx'));
        
        copy(__DIR__ . '/../../stubs/react/views/app.blade.php', resource_path('views/app.blade.php'));

        $this->replaceInFile("'resources/js/app.js'", "'resources/js/app.jsx'", resource_path('views/app.blade.php'));

        $this->afterReplaceFiles();

        return 0;
    }
}