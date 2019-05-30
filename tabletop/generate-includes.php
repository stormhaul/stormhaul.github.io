<?php

function getDirContents($dir, &$results = array()){
    $files = scandir($dir, SCANDIR_SORT_NONE);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $results[] = $path;
        } else if($value != "." && $value != "..") {
            getDirContents($path, $results);
            $results[] = $path;
        }
    }

    return $results;
}

function getInclude(string $localFilePath): string
{
    return "<script type='text/javascript' src='$localFilePath'></script>";
}

$root = __DIR__;
$src = '';
$files = getDirContents('./');
$filetypes = ['\.js'];

foreach ($files as $file) {
    if (!preg_match('/(' . implode('|', $filetypes) . ')$/', $file)) {
        continue;
    }
    $localFilePath = str_replace($root .'/'. $src, '', $file);
    echo getInclude($localFilePath);
}