<?php

namespace KUI\Breeze\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Process;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\select;

class ReplaceCommand extends Command implements PromptsForMissingInput
{
    use ReplaceBlade;
    use ReplaceVue;
    use ReplaceReact;

    protected $signature = 'kui-breeze:replace {stack : The development stack that should be replaced (blade,vue,react)}
                            {--install : Install node pakages}
                            {--composer=global : Absolute path to the Composer binary which should be used to install packages}';

    protected $description = 'Replace laravel\\breeze views.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $this->writeLogo();

        // Favicon
        $this->replaceFavIcon();

        if ($this->argument('stack') === 'blade') {
            return $this->replaceBlade();
        }

        if ($this->argument('stack') === 'vue') {
            return $this->replaceVue();
        }

        if ($this->argument('stack') === 'react') {
            return $this->replaceReact();
        }
    }

    protected function replaceFavIcon(): void
    {
        (new Filesystem)->ensureDirectoryExists(base_path('public'));
        copy(__DIR__ . '/../../stubs/common/favicon.ico', base_path('public/favicon.ico'));
    }

    protected function afterReplaceFiles(): void
    {
        $this->components->success('Breeze scaffolding replaced successfully.');

        $this->installNodePakages();

        if(!$this->option('install')) {
            $this->components->info('Please execute the "npm install && npm run dev" command to build your assets.');
        }
    }

    protected function installNodePakages(): void
    {
        if($this->option('install')) {
            $this->components->info('Installing and building Node dependencies.');

            if (file_exists(base_path('pnpm-lock.yaml'))) {
                $this->runCommands(['pnpm install', 'pnpm run build']);
            } elseif (file_exists(base_path('yarn.lock'))) {
                $this->runCommands(['yarn install', 'yarn run build']);
            } elseif (file_exists(base_path('bun.lockb'))) {
                $this->runCommands(['bun install', 'bun run build']);
            } elseif (file_exists(base_path('deno.lock'))) {
                $this->runCommands(['deno install', 'deno task build']);
            } else {
                $this->runCommands(['npm install', 'npm run build']);
            }
        }
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     */
    protected function requireComposerPackages($packages): void
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
     * Copied from https://github.com/laravel/breeze/blob/2.x/src/Console/InstallCommand.php
     */
    protected function runCommands($commands): void
    {
        $process = Process::fromShellCommandline(implode(' && ', $commands), null, null, null, null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $this->output->writeln('  <bg=yellow;fg=black> WARN </> '.$e->getMessage().PHP_EOL);
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    '.$line);
        });
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     */
    protected static function updateNodePackages(callable $callback, $dev = true): void
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

    protected function promptForMissingArgumentsUsing()
    {
        return [
            'stack' => fn () => select(
                label: 'Which Breeze stack would you like to replace?',
                options: [
                    'blade' => 'Blade',
                    'react' => 'React',
                    'vue' => 'Vue',
                ],
                scroll: 3,
            ),
        ];
    }

    protected function afterPromptingForMissingArguments(InputInterface $input, OutputInterface $output): void
    {
        $input->setOption('install', confirm(
            label: 'Would you like to install node pakages?',
            default: $this->option('install')
        ));
    }

    /**
     * Copied from https://github.com/laravel/breeze/blob/1.x/src/Console/InstallCommand.php
     */
    protected function replaceInFile(string $search, string  $replace, string $path): void
    {
        file_put_contents($path, str_replace($search, $replace, file_get_contents($path)));
    }

    protected function writeLogo(): null
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
