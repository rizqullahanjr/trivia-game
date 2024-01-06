<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->integer('id');
            $table->string('name', 10);
            $table->string('active_avatar', 255)->nullable();
            $table->integer('diamond')->default(50);
            $table->integer('highest_score')->default(0);
            $table->integer('total_score')->default(0);
            $table->timestamps();

            $table->primary('id');
            $table->foreign('id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('active_avatar')->references('image')->on('avatars')
                ->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
