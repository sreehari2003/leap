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

// import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
public class TaskController {
    private static final Logger logger = Logger.getLogger(TaskController.class.getName());
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<ResponseTask<Iterable<Task>>> getAllTasks() {
        Optional<Iterable<Task>> tasks = taskService.getAllTasks();
        if (tasks != null) {
            ResponseTask<Iterable<Task>> responseTodoList = new ResponseTask<>("Item added to todo list", HttpStatus.OK,
                    tasks.get());
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<ResponseTask<Iterable<Task>>>(responseTodoList, HttpStatus.OK);
        } else {
            ResponseTask<Iterable<Task>> responseTodoList = new ResponseTask<>("Couldnt find the tasks",
                    HttpStatus.BAD_REQUEST, null);
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<>(responseTodoList, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public ResponseEntity<ResponseTask<Optional<Task>>> AddItemTolist(@Valid @RequestBody Task task) {

        Optional<Task> savedTask = taskService.saveTask(task);

        if (savedTask.isPresent()) {
            ResponseTask<Optional<Task>> responseTodoList = new ResponseTask<>("Item added to todo list",
                    HttpStatus.CREATED,
                    savedTask);
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<>(responseTodoList, HttpStatus.CREATED);
        } else {

            ResponseTask<Optional<Task>> responseTodoList = new ResponseTask<>("Item Not added to todo list",
                    HttpStatus.BAD_REQUEST, null);
            logger.info(responseTodoList.getMessage() + ". code: " + responseTodoList.getCode());
            return new ResponseEntity<>(responseTodoList, HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseTask<Void>> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            ResponseTask<Void> response = new ResponseTask<>("Item deleted from todo list", HttpStatus.OK);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ResponseTask<Void> response = new ResponseTask<>("Failed to delete item from todo list",
                    HttpStatus.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
