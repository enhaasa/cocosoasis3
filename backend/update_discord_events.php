<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$DISCORD_INFO_URL = $_ENV['DISCORD_INFO_URL'];

$query = $DISCORD_INFO_URL . '?data=Events';
$result = file_get_contents($query);

file_put_contents(__DIR__ . '/cache/discord/events.json', $result);

echo $result;
