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
    "calc" => "_calc_delta.phtml"
];

$view = new View();
$pageFileName = array_key_exists($pageName, $modelViewMap)
    ? $modelViewMap[$pageName] : "_404.phtml";

$view->render($pageFileName, [
    "title" => "Function Solver"
]);
