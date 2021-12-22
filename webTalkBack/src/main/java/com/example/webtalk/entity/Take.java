package com.example.webtalk.entity;

import lombok.Data;

@Data
public class Take {
    private int user_id;
    private int group_id;
    private String role;
    private String add_time;
}
