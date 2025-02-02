<?php

namespace KUI\Breeze\Console;

use Illuminate\Filesystem\Filesystem;

trait ReplaceBlade
{
    protected function replaceBlade()
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) {
            return [
                '@alpinejs/anchor' => '^3.14.8',
                '@alpinejs/resize' => '^3.14.8',
                '@alpinejs/collapse' => '^3.4.2',
                '@iconify/tailwind' => '^1.2.0',
                '@iconify-json/tabler' => '^1.2.15',
                'perfect-scrollbar' => '^1.5.5',
            ] + $packages;
        });

        // Views...
        (new Filesystem)->ensureDirectoryExists(resource_path('views/auth'));
        (new Filesystem)->ensureDirectoryExists(resource_path('views/layouts'));
        (new Filesystem)->ensureDirectoryExists(resource_path('views/components'));
        (new Filesystem)->ensureDirectoryExists(resource_path('views/profile'));
        (new Filesystem)->ensureDirectoryExists(resource_path('views/buttons-showcase'));

        // Clean directories
        (new Filesystem)->cleanDirectory(resource_path('views/auth'));
        (new Filesystem)->cleanDirectory(resource_path('views/layouts'));
        (new Filesystem)->cleanDirectory(resource_path('views/components'));
        (new Filesystem)->cleanDirectory(resource_path('views/profile'));
        (new Filesystem)->cleanDirectory(resource_path('views/buttons-showcase'));
        (new Filesystem)->cleanDirectory(resource_path('js/plugins'));

        copy(__DIR__ . '/../../stubs/blade/views/dashboard.blade.php', resource_path('views/dashboard.blade.php'));

        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/auth', resource_path('views/auth'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/components', resource_path('views/components'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/profile', resource_path('views/profile'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/buttons-showcase', resource_path('views/buttons-showcase'));

        
        copy(__DIR__ . '/../../stubs/blade/views/layouts/app.blade.php', resource_path('views/layouts/app.blade.php'));
        copy(__DIR__ . '/../../stubs/blade/views/layouts/guest.blade.php', resource_path('views/layouts/guest.blade.php'));
        
        // Routes
        copy(__DIR__ . '/../../stubs/blade/web.php', base_path('routes/web.php'));
        
        // Assets
        copy(__DIR__ . '/../../stubs/blade/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/common/css/app.css', resource_path('css/app.css'));
        copy(__DIR__ . '/../../stubs/blade/js/app.js', resource_path('js/app.js'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/js/plugins', resource_path('js/plugins'));

        $this->afterReplaceFiles();

        return 0;
    }
}