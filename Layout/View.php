<?php

namespace Layout;

use InvalidArgumentException;

class View
{
    private $parameters;

    public function render($name, array $parameters = array())
    {
        foreach ($parameters as $key => $value) {
            $this->$key = $value;
        }
        $this->parameters = $parameters;
        include "Layout/View/$name";
        echo "\n";
    }

    public function addFile($fileType, $fileName) {
        switch ($fileType) {
            case "css": return $this->addCssFile($fileName);
            case "js": return $this->addJsFile($fileName);
            default:
                throw new InvalidArgumentException("Unknown filetype");
        }
    }

    protected function addJsFile($filename) {
        $filename = "public/$filename";
        return "<script type=\"text/javascript\" src=\"$filename\"></script>\n";
    }

    protected function addCssFile($filename) {
        $filename = "public/$filename";
        return "<link rel=\"stylesheet\" type=\"text/css\" href=\"$filename\" />\n";
    }
}