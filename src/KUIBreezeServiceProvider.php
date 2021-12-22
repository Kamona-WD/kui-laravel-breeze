<?php

namespace KUI\Breeze;

use Illuminate\Support\ServiceProvider;

class KUIBreezeServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if (!$this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            Console\ReplaceCommand::class,
        ]);
    }
}
