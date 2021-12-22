package com.example.webtalk.controller;

import com.example.webtalk.entity.*;
import com.example.webtalk.mapper.UserMapper;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("user")
@RestController
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @GetMapping("getFriend")
    public Result getFriend(int userID){

        List<Integer> temp=userMapper.getFriend(userID);
        return Result.ok(temp);
    }

    @GetMapping("getUserInformation")
    public  Result getUserInformation(int userID){
        User temp=userMapper.getUser(userID);
        return Result.ok(temp);
    }
    @PostMapping("addUser")
    public Result addUser(String nickName,String sex,String avatar,String password,String area,String email){
        int code=userMapper.addUser(nickName,sex,avatar,password,area,email);
        if(code==1){
            return Result.ok();
        }
        else{
            return Result.fail();
        }
    }
    @PostMapping("register")
    public Result register(User user){
        int code=userMapper.register(user);
        int user_id=user.getUser_id();
        if(code==1){
            return Result.ok(user_id);
        }
        else{
            return Result.fail();
        }
    }
    @PostMapping("login")
    public Result login(int userID,String password){
        User user=userMapper.login(userID);
        if(password.equals(user.getPassword())){
            return Result.ok();
        }
        else{
            return Result.fail();
        }
    }
    @GetMapping("getUserGroup")
    public Result getUserGroup(int userID){
        List<Integer> temp=userMapper.getGroup(userID);
        if(temp.isEmpty()){
            return Result.fail();
        }
        else {
            return Result.ok(temp);
        }
    }
    @GetMapping("getGroupInformation")
    public Result getGroupInformation(int groupID){
        Group group=userMapper.getGroupInformation(groupID);
        return Result.ok(group);
    }

    @PostMapping("sendUMessage")
    public Result sendUMessage(Umessage umessage){
        int code=userMapper.sendUMessage(umessage);
        if(code==1){
            return Result.ok(code);
        }
        else {
            return Result.fail();
        }
    }
    @PostMapping("sendGMessage")
    public Result sendGMessage(Gmessage gmessage){
        int code=userMapper.sendGMessage(gmessage);
        if(code==1){
            return Result.ok(code);
        }
        else {
            return Result.fail();
        }
    }
    @PostMapping("updateInformation")
    public Result updateInformation(int userID,
                                    String newName,
                                    String newPassword,
                                    String newArea,
                                    String newEmail,
                                    String newSentence){
        int code=userMapper.updateInformation(userID,newName,newPassword,newArea,newEmail,newSentence);
        if(code==1){
            return Result.ok(code);
        }
        else {
            return Result.fail();
        }
    }
    @PostMapping("addFriend")
    public Result addFriend(int userID,int friendID){
        int code1=userMapper.addFriend(userID,friendID);
        int code2=userMapper.addFriend(friendID,userID);

        return Result.ok();
    }
    @GetMapping("getHistory")
    public Result getHistory(int userID,int friendID){
        List<Umessage> messageList=userMapper.getHistory(userID,friendID);
        return Result.ok(messageList);
    }

    @PostMapping("deleteInformation")
    public Result deleteInformation(int umessageID){
        int code=userMapper.deleteInformation(umessageID);
        if(code==1){
            return Result.ok(code);
        }
        else {
            return Result.fail();
        }
    }
    @PostMapping("deleteFriend")
    public Result deleteFriend(int userID,int friendID){
        int code1=userMapper.deleteFriend(userID,friendID);
        int code2=userMapper.deleteFriend(friendID,userID);
        return Result.ok();
    }

    @GetMapping("getGroupHistory")
    public Result getGroupHistory(int groupID){
        List<Gmessage> temp=new ArrayList<>();
        temp=userMapper.getGroupHistory(groupID);
        return Result.ok(temp);
    }
    @PostMapping("deleteGroupMessage")
    public Result deleteGroupMessage(int gmessageID){
        int code=userMapper.deleteGroupMessage(gmessageID);
        if(code==1){
            return Result.ok(code);
        }
        else {
            return Result.fail();
        }
    }
}
