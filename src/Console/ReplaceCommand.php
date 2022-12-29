<?php

namespace KUI\Breeze\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class ReplaceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kui-breeze:replace {stack=blade : The development stack that should be replaced (blade,vue,vue-jsx,react)}
                            {--composer=global : Absolute path to the Composer binary which should be used to install packages}
                            {--vite : Vitejs}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Replace laravel\\breeze views.';

    protected $isVite = false;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->writeLogo();

        if (file_exists(base_path('vite.config.js')) || $this->option('vite')) {
            $this->isVite = true;
        }

        // Favicon
        $this->replaceFavIcon();

        if ($this->argument('stack') === 'blade') {
            return $this->replaceBlade();
        }

        if ($this->argument('stack') === 'vue') {
            return $this->replaceVue('sfc');
        }

        if ($this->argument('stack') === 'vue-jsx') {
            return $this->replaceVue('jsx');
        }

        if ($this->argument('stack') === 'react') {
            return $this->replaceReact();
        }
    }

    protected function replaceBlade()
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) {
            return [
                '@alpinejs/collapse' => '^3.4.2',
                'postcss-import' => '^14.0.2',
                'perfect-scrollbar' => '^1.5.5'
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

        copy(__DIR__ . '/../../stubs/blade/views/dashboard.blade.php', resource_path('views/dashboard.blade.php'));

        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/auth', resource_path('views/auth'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/components', resource_path('views/components'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/profile', resource_path('views/profile'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/blade/views/buttons-showcase', resource_path('views/buttons-showcase'));

        if (!$this->isVite) {
            copy(__DIR__ . '/../../stubs/blade/views/layouts/app.mix.blade.php', resource_path('views/layouts/app.blade.php'));
            copy(__DIR__ . '/../../stubs/blade/views/layouts/guest.mix.blade.php', resource_path('views/layouts/guest.blade.php'));
        } else {
            copy(__DIR__ . '/../../stubs/blade/views/layouts/app.vite.blade.php', resource_path('views/layouts/app.blade.php'));
            copy(__DIR__ . '/../../stubs/blade/views/layouts/guest.vite.blade.php', resource_path('views/layouts/guest.blade.php'));
        }

        // Routes
        copy(__DIR__ . '/../../stubs/blade/web.php', base_path('routes/web.php'));

        // Assets
        copy(__DIR__ . '/../../stubs/blade/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/common/css/app.css', resource_path('css/app.css'));
        copy(__DIR__ . '/../../stubs/blade/js/app.js', resource_path('js/app.js'));

        // Icons
        $this->requireComposerPackages('blade-ui-kit/blade-heroicons:^1.2');

        $this->components->info('Breeze scaffolding replaced successfully.');
        $this->components->info('Please execute the "npm install && npm run dev" command to build your assets.');
    }

    protected function replaceVue($type)
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) use ($type) {
            $extraPackages = [
                '@heroicons/vue' => '^1.0.4',
                '@vueuse/core' => '^6.5.3',
                'postcss-import' => '^14.0.2',
                'perfect-scrollbar' => '^1.5.5'
            ];

            if (!$this->isVite) {
                $extraPackages += ['@vue/babel-plugin-jsx' => '^1.1.0'];
            } else {
                $extraPackages += ['@vitejs/plugin-vue-jsx' => '^1.3.10'];
            }

            if ($type == 'jsx') {
                $extraPackages += ['@headlessui/vue' => '^1.4.3'];
            }

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
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/' . $type . '/Components', resource_path('js/Components'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Composables', resource_path('js/Composables'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/' . $type . '/Layouts', resource_path('js/Layouts'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/' . $type . '/Pages', resource_path('js/Pages'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/vue/js/Icons', resource_path('js/Components/Icons'));

        // Tailwind / Assets...
        copy(__DIR__ . '/../../stubs/vue/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/common/css/app.css', resource_path('css/app.css'));

        if (!$this->isVite) {
            copy(__DIR__ . '/../../stubs/common/inertia/layout/app.mix.blade.php', resource_path('views/app.blade.php'));
            copy(__DIR__ . '/../../stubs/vue/js/' . $type . '/app.mix.js', resource_path('js/app.js'));
            copy(__DIR__ . '/../../stubs/vue/.babelrc', base_path('.babelrc'));
        } else {
            copy(__DIR__ . '/../../stubs/common/inertia/layout/app.vite.blade.php', resource_path('views/app.blade.php'));
            copy(__DIR__ . '/../../stubs/vue/js/' . $type . '/app.vite.js', resource_path('js/app.js'));
            copy(__DIR__ . '/../../stubs/vue/vite.config.js', base_path('vite.config.js'));
        }

        $this->components->info('Breeze scaffolding replaced successfully.');
        $this->components->info('Please execute the "npm install && npm run dev" command to build your assets.');
    }

    protected function replaceReact()
    {
        // NPM Packages...
        $this->updateNodePackages(function ($packages) {
            return [
                '@headlessui/react' => '^1.4.2',
                '@heroicons/react' => '^1.0.5',
                'postcss-import' => '^14.0.2',
                'react-transition-group' => '^4.4.2',
                'perfect-scrollbar' => '^1.5.5'
            ] + $packages;
        });

        // Routes
        copy(__DIR__ . '/../../stubs/react/web.php', base_path('routes/web.php'));

        // Components + Pages...
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Components'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Hooks'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Layouts'));
        (new Filesystem)->ensureDirectoryExists(resource_path('js/Pages'));

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

        if (!$this->isVite) {
            copy(__DIR__ . '/../../stubs/common/inertia/layout/app.mix.blade.php', resource_path('views/app.blade.php'));
            copy(__DIR__ . '/../../stubs/react/js/app.mix.js', resource_path('js/app.js'));
        } else {
            copy(__DIR__ . '/../../stubs/common/inertia/layout/app.vite.blade.php', resource_path('views/app.blade.php'));
            copy(__DIR__ . '/../../stubs/react/js/app.vite.js', resource_path('js/app.jsx'));

            $this->replaceInFile("'resources/js/app.js'", "'resources/js/app.jsx'", resource_path('views/app.blade.php'));
        }

        $this->components->info('Breeze scaffolding replaced successfully.');
        $this->components->info('Please execute the "npm install && npm run dev" command to build your assets.');
    }

    protected function replaceFavIcon()
    {
        (new Filesystem)->ensureDirectoryExists(base_path('public'));
        copy(__DIR__ . '/../../stubs/common/favicon.ico', base_path('public/favicon.ico'));
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     * Installs the given Composer Packages into the application.
     *
     * @param  mixed  $packages
     * @return void
     */
    protected function requireComposerPackages($packages)
    {
        $composer = $this->option('composer');

        if ($composer !== 'global') {
            $command = ['php', $composer, 'require'];
        }

        $command = array_merge(
            $command ?? ['composer', 'require'],
            is_array($packages) ? $packages : func_get_args()
        );

        (new Process($command, base_path(), ['COMPOSER_MEMORY_LIMIT' => '-1']))
            ->setTimeout(null)
            ->run(function ($type, $output) {
                $this->output->write($output);
            });
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     * Update the "package.json" file.
     *
     * @param  callable  $callback
     * @param  bool  $dev
     * @return void
     */
    protected static function updateNodePackages(callable $callback, $dev = true)
    {
        if (!file_exists(base_path('package.json'))) {
            return;
        }

        $configurationKey = $dev ? 'devDependencies' : 'dependencies';

        $packages = json_decode(file_get_contents(base_path('package.json')), true);

        $packages[$configurationKey] = $callback(
            array_key_exists($configurationKey, $packages) ? $packages[$configurationKey] : [],
            $configurationKey
        );

        ksort($packages[$configurationKey]);

        file_put_contents(
            base_path('package.json'),
            json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
        );
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     * Replace a given string within a given file.
     *
     * @param  string  $search
     * @param  string  $replace
     * @param  string  $path
     * @return void
     */
    protected function replaceInFile($search, $replace, $path)
    {
        file_put_contents($path, str_replace($search, $replace, file_get_contents($path)));
    }

    protected function writeLogo()
    {
        $logo = PHP_EOL . '<fg=bright-blue>
██╗  ██╗     ██╗   ██╗██╗
██║ ██╔╝     ██║   ██║██║
█████╔╝█████╗██║   ██║██║
██╔═██╗╚════╝██║   ██║██║
██║  ██╗     ╚██████╔╝██║
╚═╝  ╚═╝      ╚═════╝ ╚═╝
        </>' . PHP_EOL;

        return $this->line($logo);
    }
}
