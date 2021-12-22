package com.example.webtalk.entity;

import lombok.Data;

@Data
public class Umessage {
    private int msg_id;
    private String msg_content;
    private String msg_from;
    private String msg_to;
    private String msg_time;
}
