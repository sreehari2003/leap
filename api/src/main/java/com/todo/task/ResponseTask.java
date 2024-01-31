package com.todo.task;

import org.springframework.http.HttpStatus;

public class ResponseTask {
    private String message;
    private int code;
    private HttpStatus httpStatus;

    public ResponseTask(String message, HttpStatus httpStatus) {
        this.message = message;
        this.code = httpStatus.value();
        this.httpStatus = httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

}