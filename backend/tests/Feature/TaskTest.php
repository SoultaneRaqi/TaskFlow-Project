<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase; // Nettoie la BDD après chaque test

    public function test_can_get_tasks()
    {
        $response = $this->getJson('/api/tasks');
        $response->assertStatus(200);
    }

    public function test_can_create_task()
    {
        $response = $this->postJson('/api/tasks', ['title' => 'Test Task', 'status' => 'pending']);
        $response->assertStatus(201); // 201 = Created
        $this->assertDatabaseHas('tasks', ['title' => 'Test Task']);
    }
}