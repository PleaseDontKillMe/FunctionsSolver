<?php

use Layout\View;

function __autoload($class_name) {
    include $class_name . '.php';
}

$pageName = isset($_GET['page']) ? $_GET['page'] : "home";
$pageName = strtolower($pageName);

$modelViewMap = [
    "home" => "_formula_page.phtml",
    "about" => "_about_delta_page.phtml",
    "author" => "_author.phtml",
    "default" => "_404.phtml"
];

$pageName = array_key_exists($pageName, $modelViewMap) ? $pageName : "default";

$pageFileName = $modelViewMap[$pageName];


$view = new View();
$view->render($pageFileName, [
    "title" => "Function Solver"
]);
