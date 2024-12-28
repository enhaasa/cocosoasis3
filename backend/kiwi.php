<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;
$category_id = isset($_GET['category_id']) ? htmlspecialchars($_GET['category_id']) : null;

if (!$type) {
    echo 'Missing type parameters!';
    return;
}

$KIWI_BASE_URL = $_ENV['KIWI_BASE_URL'];
$KIWI_REALM_ID = $_ENV['KIWI_REALM_ID'];

switch ($type) {
    case 'menu':
        $query = $KIWI_BASE_URL . '/dining_menu?realm_id=' . $KIWI_REALM_ID;
        $result = file_get_contents($query);

        echo $result;

        break;

    case 'specialMenuItem':
        if (!$category_id) {
            echo 'Missing category_id parameter!';
            return;
        }

        $query = $KIWI_BASE_URL . '/special_menu_item?category_id=' . $category_id;
        $result = file_get_contents($query);

        echo $result;

        break;
}
