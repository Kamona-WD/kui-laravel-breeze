# K UI Breeze starter

Different UI for [larave/breeze](https://github.com/laravel/breeze).

[![License](https://img.shields.io/github/license/Kamona-WD/kui-laravel-breeze)](https://github.com/Kamona-WD/kui-laravel-breeze/blob/main/LICENSE.md)
[![Release](https://img.shields.io/github/release/Kamona-WD/kui-laravel-breeze)](https://github.com/Kamona-WD/kui-laravel-breeze/releases)
[![Total Downloads](https://img.shields.io/packagist/dt/kamona/kui-laravel-breeze.svg)](https://packagist.org/packages/kamona/kui-laravel-breeze)

#### Note

We recommend installing this package on a project that you are starting from scratch.

#### Usage

1. Fresh install Laravel >= 8.0 and `cd` to your app.
2. Install laravel/breeze

```sh
composer require laravel/breeze --dev

# after finish run this command

php artisan breeze:install blade
```

3. Install kamona/kui-laravel-breeze

```sh
composer require kamona/kui-laravel-breeze --dev

# after finish run this command

php artisan kui-breeze:replace blade

# then
npm install && npm run dev # or yarn && yarn dev
```

4. Configure your database.
5. Run `php artisan migrate`.
6. `npm install && npm run dev`
7. `php artisan serve`

#### Navigation

You will found sidebar links in `resources/views/components/sidebar/content.blade.php`.

#### Screens

|                             |                             |
| --------------------------- | --------------------------- |
| ![Shocase 1](screens/1.PNG) | ![Shocase 7](screens/7.PNG) |
| ![Shocase 2](screens/2.PNG) | ![Shocase 8](screens/8.PNG) |
| ![Shocase 3](screens/3.PNG) | ![Shocase 4](screens/4.PNG) |
| ![Shocase 6](screens/6.PNG) | ![Shocase 5](screens/5.PNG) |
