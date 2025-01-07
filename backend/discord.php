<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;

if (!$type) {
    echo 'Missing parameters';
    return;
}

switch ($type) {
    case 'events':

        $cache_directory = __DIR__ . '/cache/discord/events.json';
        $result = file_get_contents($cache_directory);

        echo $result;

        break;
}
