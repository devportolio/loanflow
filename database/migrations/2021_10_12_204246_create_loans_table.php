<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('lender_id');
            $table->float('amount');
            $table->enum('frequency', ['daily', 'weekly', 'monthly'])->nullable();
            $table->unsignedInteger('duration')->nullable();
            $table->float('rate')->nullable();
            $table->boolean('has_interest')->default(0);
            $table->float('running_interest')->default(0);
            $table->date('date_started')->nullable();
            $table->enum('status', ['in-progress', 'pending', 'cancelled', 'completed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loans');
    }
}
