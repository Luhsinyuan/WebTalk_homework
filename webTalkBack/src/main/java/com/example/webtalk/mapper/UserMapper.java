package com.example.webtalk.mapper;

import com.example.webtalk.entity.Gmessage;
import com.example.webtalk.entity.Group;
import com.example.webtalk.entity.Umessage;
import com.example.webtalk.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {

    @Select("select friend_id from friend where user_id=#{userID}")
    List<Integer> getFriend(@Param("userID") Integer userID);

    @Select("select * from user where user_id=#{userID}")
    User getUser(@Param("userID") Integer userID);


    @Insert("insert into user(nick_name,sex,avatar,password,area,email) values(#{nickName},#{sex},#{avatar},#{password},#{area},#{email})")
    Integer addUser(@Param("nickName") String nickName,@Param("sex") String sex,
                    @Param("avatar") String avatar,@Param("password") String password,@Param("area") String area,
                    @Param("email") String email);

    @Select("select * from user where user_id=#{userID}")
    User login(@Param("userID") Integer userID);

    @Insert("insert into user(nick_name,sex,avatar,password,area,email) " +
            "values (#{user.nick_name}," +
            "#{user.sex},"+
            "#{user.avatar},"+
            "#{user.password},"+
            "#{user.area},"+
            "#{user.email})")
    @Options(useGeneratedKeys = true,keyProperty = "user.user_id")
    Integer register(@Param("user") User user);

    @Select("select group_id from take where user_id=#{userID}")
    List<Integer> getGroup(@Param("userID") int userID);

    @Select("select * from `group` where group_id = ${groupID}")
    Group getGroupInformation(@Param("groupID") int groupID);

    @Insert("insert into umessage(msg_content,msg_from,msg_to)  " +
            "values(#{message.msg_content}," +
            "#{message.msg_from}," +
            "#{message.msg_to}" +
            ")")
    Integer sendUMessage(@Param("message") Umessage message);

    @Insert("insert into gmessage(gmsg_content,gmsg_from,gmsg_to) " +
            "values(#{gmessage.gmsg_content}," +
            "#{gmessage.gmsg_from}," +
            "#{gmessage.gmsg_to}" +
            ")")
    Integer sendGMessage(@Param("gmessage") Gmessage gmessage);

    @Update("update user set nick_name=#{newName},password=#{newPassword},area=#{newArea},email=#{newEmail}," +
            "signature=#{newSentence} where user_id=#{userID}")
    Integer updateInformation(@Param("userID") int userID,
                              @Param("newName") String newName,
                              @Param("newPassword") String newPassword,
                              @Param("newArea") String newArea,
                              @Param("newEmail") String newEmail,
                              @Param("newSentence") String newSentence);

    @Insert("insert into friend(user_id,friend_id) values(#{userID},#{friendID})")
    Integer addFriend(@Param("userID") int userID,@Param("friendID") int friendID);

    @Select("select * from umessage where (msg_from=#{userID} and msg_to=#{friendID}) or (msg_from=#{friendID} and msg_to=#{userID})")
    List<Umessage> getHistory(@Param("userID") int userID,@Param("friendID") int friendID);

    @Delete("delete from umessage where msg_id=#{umessageID}")
    Integer deleteInformation(@Param("umessageID") int umessageID);

    @Delete("delete from friend where user_id=#{userID} and friend_id=#{friendID}")
    Integer deleteFriend(@Param("userID") int userID,@Param("friendID") int friendID);

    @Select("select * from gmessage where gmsg_to=#{groupID}")
    List<Gmessage> getGroupHistory(@Param("groupID") int groupID);

    @Delete("delete from gmessage where gmsg_id=#{gmessageID}")
    Integer deleteGroupMessage(@Param("gmessageID") int gmessageID);
}
