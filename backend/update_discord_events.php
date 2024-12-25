<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

function extractHttpCode($text)
{
    $pattern = '/HTTP Code: (\d+)/';

    if (preg_match($pattern, $text, $matches)) {
        return (int)$matches[1];
    }

    return "200";
}

$DISCORD_INFO_URL = $_ENV['DISCORD_INFO_URL'];

$query = $DISCORD_INFO_URL . '?data=Events';
$result = file_get_contents($query);
$responsecode = extractHttpCode($result);

file_put_contents(__DIR__ . '/responsecode.txt', $responsecode);
file_put_contents(__DIR__ . '/result.txt', $result);

if ($responsecode == '200') {
    file_put_contents(__DIR__ . '/cache/discord/events.json', $result);
}

echo $result;
