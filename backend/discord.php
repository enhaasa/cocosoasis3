<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;

if (!$type) {
    echo 'Missing parameters';
    return;
}

$DISCORD_INFO_URL = $_ENV['DISCORD_INFO_URL'];

switch ($type) {
    case 'events':

        $query = $DISCORD_INFO_URL . '?data=Events';

        $result = file_get_contents($query);

        echo $result;

        break;
}
