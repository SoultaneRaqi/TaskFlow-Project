<?php
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);

Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'UP', 'database' => 'OK']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'DOWN', 'database' => 'Error'], 500);
    }
});