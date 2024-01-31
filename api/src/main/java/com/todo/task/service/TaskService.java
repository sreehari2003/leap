package com.todo.task.service;

import com.todo.task.model.Task;
import com.todo.task.repository.TaskRepository;

import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import java.util.Optional;

@Service
public class TaskService {

    // @Autowired
    private TaskRepository taskRepository;

    public Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public String test() {
        return "test";
    }
}
