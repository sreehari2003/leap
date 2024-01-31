package com.todo.task.service;

import com.todo.task.model.Task;
import com.todo.task.repository.TaskRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
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

    public String test() {
        return "test";
    }
}
