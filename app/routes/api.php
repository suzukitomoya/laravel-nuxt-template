<?php

use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return \Illuminate\Support\Facades\Response::json([
        'message' => 'Hello, Laravel API!',
    ]);
});
