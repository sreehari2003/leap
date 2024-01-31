package com.todo.task.controller;

import com.todo.task.ResponseTask;
import com.todo.task.model.Task;
import com.todo.task.service.TaskService;
import java.util.logging.Logger;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private static final Logger logger = Logger.getLogger(TaskController.class.getName());
    @Autowired
    private TaskService taskService;

    @GetMapping
    public Optional<Iterable<Task>> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public ResponseEntity<ResponseTask> AddItemTolist(@Valid @RequestBody Task task) {

        Optional<Task> t = taskService.saveTask(task);

        if (t != null) {
            ResponseTask responseTodoList = new ResponseTask("Item added to todo list", HttpStatus.CREATED);
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<ResponseTask>(responseTodoList, HttpStatus.CREATED);

        } else {
            ResponseTask responseTodoList = new ResponseTask("Item Not added to todo list",
                    HttpStatus.BAD_REQUEST);
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<ResponseTask>(responseTodoList, HttpStatus.BAD_REQUEST);
        }

    }

    // @PutMapping("/{id}")
    // public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
    // // TODO: Implement update logic
    // return taskService.saveTask(task);
    // }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
