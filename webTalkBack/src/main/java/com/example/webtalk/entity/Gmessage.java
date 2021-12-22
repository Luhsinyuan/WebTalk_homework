package com.example.webtalk.entity;

import lombok.Data;

@Data
public class Gmessage {
    private int gmsg_id;
    private String gmsg_content;
    private int gmsg_from;
    private int gmsg_to;
    private String gmsg_time;
}
