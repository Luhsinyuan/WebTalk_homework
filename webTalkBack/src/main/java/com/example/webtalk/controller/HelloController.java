package com.example.webtalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RequestMapping("/")
@RestController
public class HelloController {


    @GetMapping("test")
    public String getHello() {
        return "hello";
    }
}
