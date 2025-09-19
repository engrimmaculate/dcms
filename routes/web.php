<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard-new');
    })->name('dashboard');

    Route::get('courses', function () {
        return Inertia::render('Courses');
    })->name('courses');

    Route::get('students', function () {
        return Inertia::render('Students');
    })->name('students');

    Route::get('instructors', function () {
        return Inertia::render('Instructors');
    })->name('instructors');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
