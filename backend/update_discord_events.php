<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$postBody = file_get_contents('php://input');

if (!$postBody) {
    http_response_code(401);
}



$data = json_decode($postBody, true);

$DISCORD_INFO_URL = $_ENV['DISCORD_INFO_URL'];

$query = $DISCORD_INFO_URL . '?data=Events';
$result = file_get_contents($query);

file_put_contents(__DIR__ . '/cache/discord/events.json', $result);

echo $result;
