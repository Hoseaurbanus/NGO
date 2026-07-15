<?php
namespace Config;

class Routes
{
    public static $routes = [];

    public static function get($uri, $handler): void
    {
        self::$routes['GET'][$uri] = $handler;
    }

    public static function post($uri, $handler): void
    {
        self::$routes['POST'][$uri] = $handler;
    }

    public static function put($uri, $handler): void
    {
        self::$routes['PUT'][$uri] = $handler;
    }

    public static function delete($uri, $handler): void
    {
        self::$routes['DELETE'][$uri] = $handler;
    }

    public static function match(string $method, string $uri): ?array
    {
        $method = strtoupper($method);
        if (isset(self::$routes[$method][$uri])) {
            return self::$routes[$method][$uri];
        }
        foreach (self::$routes[$method] ?? [] as $route => $handler) {
            $pattern = preg_replace('/\{(\w+)\}/', '(?P<$1>[^/]+)', $route);
            $pattern = '#^' . $pattern . '$#';
            if (preg_match($pattern, $uri, $matches)) {
                return ['handler' => $handler, 'params' => $matches];
            }
        }
        return null;
    }

    public static function init(): void
    {
        $v1 = '/api/v1';

        self::get($v1 . '/programs', ['ProgramController', 'index']);
        self::get($v1 . '/programs/{id}', ['ProgramController', 'show']);
        self::post($v1 . '/programs', ['ProgramController', 'store']);
        self::put($v1 . '/programs/{id}', ['ProgramController', 'update']);
        self::delete($v1 . '/programs/{id}', ['ProgramController', 'destroy']);

        self::get($v1 . '/projects', ['ProjectController', 'index']);
        self::get($v1 . '/projects/{id}', ['ProjectController', 'show']);
        self::post($v1 . '/projects', ['ProjectController', 'store']);
        self::put($v1 . '/projects/{id}', ['ProjectController', 'update']);
        self::delete($v1 . '/projects/{id}', ['ProjectController', 'destroy']);

        self::get($v1 . '/events', ['EventController', 'index']);
        self::get($v1 . '/events/{id}', ['EventController', 'show']);
        self::post($v1 . '/events', ['EventController', 'store']);
        self::put($v1 . '/events/{id}', ['EventController', 'update']);
        self::delete($v1 . '/events/{id}', ['EventController', 'destroy']);

        self::get($v1 . '/news', ['NewsController', 'index']);
        self::get($v1 . '/news/{id}', ['NewsController', 'show']);
        self::post($v1 . '/news', ['NewsController', 'store']);
        self::put($v1 . '/news/{id}', ['NewsController', 'update']);
        self::delete($v1 . '/news/{id}', ['NewsController', 'destroy']);

        self::get($v1 . '/donations', ['DonationController', 'index']);
        self::post($v1 . '/donations', ['DonationController', 'store']);
        self::get($v1 . '/donations/history', ['DonationController', 'history']);

        self::get($v1 . '/campaigns', ['CampaignController', 'index']);
        self::get($v1 . '/campaigns/{id}', ['CampaignController', 'show']);
        self::post($v1 . '/campaigns', ['CampaignController', 'store']);

        self::get($v1 . '/volunteers', ['VolunteerController', 'index']);
        self::post($v1 . '/volunteers', ['VolunteerController', 'store']);
        self::put($v1 . '/volunteers/{id}/approve', ['VolunteerController', 'approve']);
        self::put($v1 . '/volunteers/{id}/reject', ['VolunteerController', 'reject']);

        self::get($v1 . '/gallery', ['GalleryController', 'index']);
        self::post($v1 . '/gallery', ['GalleryController', 'store']);
        self::delete($v1 . '/gallery/{id}', ['GalleryController', 'destroy']);

        self::get($v1 . '/testimonials', ['TestimonialController', 'index']);
        self::post($v1 . '/testimonials', ['TestimonialController', 'store']);

        self::get($v1 . '/partners', ['PartnerController', 'index']);
        self::post($v1 . '/partners', ['PartnerController', 'store']);

        self::get($v1 . '/careers', ['CareerController', 'index']);
        self::get($v1 . '/careers/{id}', ['CareerController', 'show']);
        self::post($v1 . '/careers', ['CareerController', 'store']);
        self::post($v1 . '/careers/{id}/apply', ['CareerController', 'apply']);

        self::get($v1 . '/messages', ['MessageController', 'index']);
        self::post($v1 . '/messages', ['MessageController', 'store']);
        self::put($v1 . '/messages/{id}/read', ['MessageController', 'markRead']);

        self::post($v1 . '/newsletter/subscribe', ['NewsletterController', 'subscribe']);
        self::delete($v1 . '/newsletter/unsubscribe', ['NewsletterController', 'unsubscribe']);

        self::post($v1 . '/auth/login', ['AuthController', 'login']);
        self::post($v1 . '/auth/register', ['AuthController', 'register']);
        self::post($v1 . '/auth/refresh', ['AuthController', 'refresh']);
        self::post($v1 . '/auth/logout', ['AuthController', 'logout']);
        self::post($v1 . '/auth/forgot-password', ['AuthController', 'forgotPassword']);
        self::post($v1 . '/auth/reset-password', ['AuthController', 'resetPassword']);

        self::get($v1 . '/users', ['UserController', 'index']);
        self::get($v1 . '/users/{id}', ['UserController', 'show']);
        self::put($v1 . '/users/{id}', ['UserController', 'update']);

        self::get($v1 . '/settings', ['SettingController', 'index']);
        self::put($v1 . '/settings', ['SettingController', 'update']);

        self::get($v1 . '/reports/dashboard', ['ReportController', 'dashboard']);
        self::get($v1 . '/reports/donations', ['ReportController', 'donations']);
        self::get($v1 . '/reports/volunteers', ['ReportController', 'volunteers']);
    }
}

Routes::init();
