package com.todo.task.repository;

import com.todo.task.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
    // You can add custom query methods here if needed
}
