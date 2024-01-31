package com.todo.task.service;

import com.todo.task.model.Task;
import com.todo.task.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.Optional;

import org.springframework.stereotype.Service;

// import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Dependency Injection
    public TaskService(TaskRepository dbPool) {
        this.taskRepository = dbPool;
    }

    public Optional<Iterable<Task>> getAllTasks() {
        if (taskRepository == null) {
            return Optional.empty();
        }

        return Optional.of(taskRepository.findAll());

    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Optional<Task> saveTask(Task task) {
        if (taskRepository == null) {
            return Optional.empty();
        }

        return Optional.of(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Long taskId, Task updatedTask) {
        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        // Update the fields of the existing task with the values from the updated task
        existingTask.setTodoTitle(updatedTask.getTodoTitle());
        existingTask.setTodoDescription(updatedTask.getTodoDescription());
        existingTask.setComplete(updatedTask.isComplete());

        return taskRepository.save(existingTask);
    }

    public String test() {
        return "test";
    }
}