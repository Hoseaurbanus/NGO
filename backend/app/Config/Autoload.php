<?php
namespace Config;

class Autoload
{
    public $psr4 = [
        'App'         => APP_PATH,
        'Config'      => APP_PATH . 'Config',
        'Controllers' => APP_PATH . 'Controllers',
        'Models'      => APP_PATH . 'Models',
        'Libraries'   => APP_PATH . 'Libraries',
        'Helpers'     => APP_PATH . 'Helpers',
        'Filters'     => APP_PATH . 'Filters',
        'Entities'    => APP_PATH . 'Entities',
    ];

    public $classmap = [];

    public static function register(): void
    {
        $autoload = new self();
        spl_autoload_register(function ($class) use ($autoload) {
            foreach ($autoload->psr4 as $prefix => $baseDir) {
                $len = strlen($prefix);
                if (strncmp($prefix, $class, $len) === 0) {
                    $relativeClass = substr($class, $len);
                    $file = $baseDir . '/' . str_replace('\\', '/', $relativeClass) . '.php';
                    if (file_exists($file)) {
                        require $file;
                        return;
                    }
                }
            }
            if (isset($autoload->classmap[$class])) {
                $file = $autoload->classmap[$class];
                if (file_exists($file)) {
                    require $file;
                }
            }
        });
    }
}

Autoload::register();
