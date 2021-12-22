package com.example.webtalk.entity;


import lombok.Data;

@Data
public class User {
    private Integer user_id;
    private String nick_name;
    private String sex;
    private String avatar;
    private String password;
    private String area;
    private String email;
    private String signature;

}
