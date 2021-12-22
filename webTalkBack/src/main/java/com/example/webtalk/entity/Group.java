package com.example.webtalk.entity;

import lombok.Data;

@Data
public class Group {
    private int group_id;
    private String group_name;
    private int Group_master;
    private String group_avatar;
    private String group_create_time;
}
