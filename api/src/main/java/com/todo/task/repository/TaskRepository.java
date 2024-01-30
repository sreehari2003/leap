package com.todo.task.repository;

import com.todo.task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can add custom query methods here if needed
}
