var userID=window.sessionStorage.getItem("userID");
var goeasy  = GoEasy.getInstance({
    host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey:"BC-e4bdb4c1acae429c9d1393b1bed9d584",
    modules:['im']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});
   //建立连接
   goeasy.connect({
    id:userID, //pubsub选填，im必填
    data:{"avatar":"/image/A.jpg","nickname":"Neo"}, //必须是一个对象，pubsub选填，im必填，用于上下线提醒和查询在线用户列表时，扩展更多的属性
    onSuccess: function () {  //连接成功
      console.log("GoEasy connect successfully.") //连接成功
    },
    onFailed: function (error) { //连接失败
      console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
    },
    onProgress:function(attempts) { //连接或自动重连中
      console.log("GoEasy is connecting", attempts);
    }
});

var im = goeasy.im;

var onPrivateMessageReceived = function(message) {
    //文字消息
    // {
    //     "messageId": "8f0e27a0c7e111eab347b726da4416bd",
    //     "timestamp": 1594958217087,
    //     "type": "text",
    //     "senderId": "3bb179af-bcc5-4fe0-9dac-c05688484649",
    //     "payload": {
    //         "text": "Hello, GoEasyIM"
    //     },
    //     "receiverId": "fdee46b0-4b01-4590-bdba-6586d7617f95"
    // }
    console.log("received private message:" + JSON.stringify(message));
    $('.block').each(function(){
        if(this.dataset.id==message.senderId){
            $(this).attr("class","blockNewMessage");
        }
    })
    // console.log($('.blockSelect').dataset.id);
    im.markPrivateMessageAsRead({
        userId:window.sessionStorage.getItem("otherID"),  //聊天对象的userId
        onSuccess: function () { //标记成功
            console.log("Marked as read successfully.") 
        },
        onFailed: function (error) { //标记失败
            console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
        }
    });
};

//监听和接收单聊消息
im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, onPrivateMessageReceived);

$(document).ready(function(){
    console.log(userID);
    $.ajax({
        url:"http://localhost:8001/user/getUserInformation",
        type:"GET",
        data:{
            userID:userID
        },
        dataType:'json',
        success:function(res){
            var temp=res.data.nick_name;
            console.log(temp);
            $('.nickName').html(temp);
        },
        error:function(){
           alert("1调用失败！")
        }
    })
    var i='';
    i+='<img src="./image/B.jpg" alt="" class="cover">';
    $('.userimg').html(i); 
});

$('#addFriend').click(function(){
    $('.chatList').empty();
    var i='';
    i+='<div class="search_chat">'+
        '<div>'+
        '<input type="text" placeholder="Search or start new chat" class="searchFriendId">'+
        '<span class="iconfont icon-comment"></span>'+
        '</div>'+
        '<span>'+
        '<button class="searchButton">搜索</button>'+
        '</span>'+
        '</div>';
    $('.chatList').append(i);
})

$(document).on('click', '.searchButton', function () {
    // $('.chatList').empty();
    var friendId=$('.searchFriendId').val();
    console.log(friendId);
    $.ajax({
        url:"http://localhost:8001/user/getUserInformation",
        type:"GET",
        data:{
            userID:parseInt(friendId)
        },
        dataType:'json',
        async:false,
        success:function(res){
            var i="";
                i+='<div class="blockDisable" data-id='+
                res.data.user_id+
                '>'+
                '<div class="imgbx">'+
                '<img src="./image/heart.png" alt="" class="cover">'+
                '</div>'+
                '<div class="details">'+
                '<div class="listHead">'+
                '<H4>'+
                res.data.nick_name+
                '</H4>'+
                '<button class="addNewFrinend">添加好友</button>'+  
                '</div>'+
                '</div>'+
                '</div>';
                console.log(i);
                $('.chatList').append(i);
        },
        error:function(){
           alert("没有该用户！");
        }
    })
})

$('#haoyou').click(function(){
    $('#IconSelect').attr("id","haoyou");
    $(this).attr("id","IconSelect");
    $('.chatList').empty();
    var friendList=[];
    $.ajax({
        url:"http://localhost:8001/user/getFriend",
        type:"GET",
        data:{
            userID:userID
        },
        dataType:'json',
        async:false,
        success:function(res){
            friendList=res.data;
            console.log(friendList);
        },
        error:function(){
           alert("2调用失败！")
        }
    })
    console.log(friendList.length);
    for(var i=0;i<friendList.length;i++)
    {
        $.ajax({
            url:"http://localhost:8001/user/getUserInformation",
            type:"GET",
            data:{
                userID:friendList[i]
            },
            dataType:'json',
            async:false,
            success:function(res){
                var i="";
                i+='<div class="block" data-id='+
                res.data.user_id+
                '>'+
                '<div class="imgbx">'+
                '<img src="./image/heart.png" alt="" class="cover">'+
                '</div>'+
                '<div class="details">'+
                '<div class="listHead">'+
                '<H4>'+
                res.data.nick_name+
                '</H4>'+
                '<button class="deleteFriend" data-id='+
                res.data.user_id+
                '>删除好友</button>'+
                // '<p class="time">10:56</p>'+
                '</div>'+
                '</div>'+
                '</div>';
                $('.chatList').append(i);
            },
            error:function(){
               alert("3调用失败！")
            }
        })
    }
})
$('#group').click(function(){
    $('#IconSelect').attr("id","group");
    $(this).attr("id","IconSelect");
    $('.chatList').empty();
    var groupList=[];
    $.ajax({
        url:"http://localhost:8001/user/getUserGroup",
        type:"GET",
        data:{
            userID:userID
        },
        dataType:'json',
        async:false,
        success:function(res){
            groupList=res.data;
        },
        error:function(){
           alert("4调用失败！")
        }
    })
    for(var i=0;i<groupList.length;i++){
        $.ajax({
            url:"http://localhost:8001/user/getGroupInformation",
            type:"GET",
            data:{
                groupID:groupList[i]
            },
            dataType:'json',
            async:false,
            success:function(res){
                // console.log(res.data);
                var i="";
                i+='<div class="blockGroup" data-id='+
                res.data.group_id+
                '>'+
                '<div class="imgbx">'+
                '<img src="./image/heart.png" alt="" class="cover">'+
                '</div>'+
                '<div class="details">'+
                '<div class="listHead">'+
                '<H4>'+
                res.data.group_name+
                '</H4>'+
                '<button class="deleteGroup" data-id='+
                res.data.group_id+
                '>删除群组</button>'+
                // '<p class="time">10:56</p>'+
                '</div>'+
                '</div>'+
                '</div>';
                $('.chatList').append(i);
            },
            error:function(){
               alert("5调用失败！")
            }
        })
    }
    
})
$('#gerenzhongxin').click(function(){
    $('#IconSelect').attr("id","gerenzhongxin");
    $(this).attr("id","IconSelect");
    $('.chatList').empty();
    $.ajax({
        url:"http://localhost:8001/user/getUserInformation",
        type:"GET",
        data:{
            userID:userID
        },
        dataType:'json',
        async:false,
        success:function(res){
            var i='';
            i+='<div class="single-member effect-3">'+
            '<div class="member-image">'+
            '<img src="./image/female.png" alt="Member">'+
            '</div>'+
            '<div class="member-info">'+
            '<h3>'+
            res.data.nick_name+
            '</h3>'+
            '<h5>'+
            res.data.area+
            '</h5>'+
            '<p>'+
            res.data.signature+
            '</p>'+
            '<div class="social-touch">'+
            '    <a class="fb-touch" href="#"></a>'+
            '    <a class="tweet-touch" href="#"></a>'+
            '    <a class="linkedin-touch" href="#"></a>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="changeInformation">'+
            '<button class="btn_changeInformation">'+
            '    <span>更改信息</span>'+
            '</button>'+
            '</div>';   
            $('.chatList').append(i);          
        },
        error:function(){
           alert("6调用失败！")
        }
    })
})

$(document).on('click', '.btn_changeInformation', function () {
    $('.chatList').empty();
    console.log(111);
    var i='';
    i+='<div class="changeInformationBox">'+
    '<div>'+
        '<input type="text" placeholder="请输入新的昵称" class="newName">'+
    '</div>'+
    '<br>'+
    '<div>'+
    '    <input type="text" placeholder="请输入新的密码" id="" class="newPassword">'+
    '</div>'+
    '<br>'+
    '<div>'+
        '<input type="text" placeholder="请输入新的地区" id="" class="newArea">'+
    '</div>'+
    '<br>'+
    '<div>'+
        '<input type="text" placeholder="请输入新的邮箱" id="" class="newEmail">'+
    '</div>'+
    '<br>'+
    '<div>'+
        '<input type="text" placeholder="请输入新的个性签名" id="" class="newSentence">'+
    '</div>'+
    '</div>'+
    '<div class="newInformationBox">'+
    '<button class="submitNewInformation">'+
        '<span>提交</span>'+
    '</button>'+
    '</div>';
    $('.chatList').append(i); 
})

$(document).on('click', '.submitNewInformation', function () {
    var newName=$('.newName').val();
    var newPassword=$('.newPassword').val();
    var newArea=$('.newArea').val();
    var newEmail=$('.newEmail').val();
    var newSentence=$('.newSentence').val();
    console.log(newName,newPassword,newArea,newEmail,newSentence);
    $.ajax({
        url:"http://localhost:8001/user/updateInformation",
        type:"POST",
        data:{
            userID:userID,
            newName:newName,
            newPassword:newPassword,
            newArea:newArea,
            newEmail:newEmail,
            newSentence:newSentence
        },
        dataType:'json',
        async:false,
        success:function(res){
            $('.chatList').empty();
           alert("修改成功！")

        },
        error:function(){
           alert("3调用失败！")
        }
    })


})









$("#btn-send-message").click(function(){
    var otherID=window.sessionStorage.getItem("otherID");
    console.log("button");
    var user_input_area = $("#user-input-value").val();
    $("#user-input-value").val("");
    console.log(user_input_area);
    if (user_input_area.length == 0 ){
        
    }else{
        update_chatWindow(user_input_area, 1);
        if(otherID.length<3){
            $.ajax({
                url:"http://localhost:8001/user/sendUMessage",
                type:"POST",
                data:{
                    "msg_content":user_input_area,
                    "msg_from":userID,
                    "msg_to":otherID
                },
                dataType:'json',
                async:false,
                success:function(res){
                    console.log(res);
                },
                error:function(){
                   alert("6调用失败！")
                }
            })
        }
        else{
            $.ajax({
                url:"http://localhost:8001/user/sendGMessage",
                type:"POST",
                data:{
                    "gmsg_content":user_input_area,
                    "gmsg_from":userID,
                    "gmsg_to":otherID
                },
                dataType:'json',
                async:false,
                success:function(res){
                    console.log(res);
                },
                error:function(){
                   alert("6调用失败！")
                }
            })
        }
        
        // user_input_area.text("");
        // $('.chatBox').scrollTop($('.chatBox')[0].scrollHeight);
    }
//创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
    let textMessage = im.createTextMessage({
    text:user_input_area, //消息内容
    to : {
        type : GoEasy.IM_SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
        id : window.sessionStorage.getItem("otherID"),
        data:{"avatar":"/www/xxx.png","nickname":"Neo"} //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
    }
    });

//发送消息
    im.sendMessage({
    message:textMessage,
    onSuccess: function (message) { //发送成功
      console.log("Private message sent successfully.", message);
    },
    onFailed: function (error) { //发送失败
      console.log('Failed to send private message，code:' + error.code +' ,error ' + error.content);
    }
    });
    
});
function update_chatWindow(incoming_message,from) {
    if(from === 1){
        var msg_html = my_message_html(incoming_message);
    }else if(from === 0){
        var msg_html = chatter_message_html(incoming_message);
    }
    $(".chatBox").append(msg_html);
}
function my_message_html(incoming_message){
    var time=new Date();
    var hours=time.getHours();
    hours=hours<10?('0'+hours):hours;
    var mins=time.getMinutes();
    mins = mins < 10 ? ('0' + mins) : mins; 
    var seconds=time.getSeconds();
    seconds=seconds < 10 ? ('0' + seconds) : seconds; 
    var newMessage = '<div class="message my_message">' +
        '<p>' + incoming_message + '<br>' +
        '<span>' +hours+':'+mins+':'+seconds+
        '</span></p>' +
        '</div>';
    return newMessage;
}
$(document).on('click', '.block', function () {
    $(".chatBox").empty();
    $('.blockSelect').attr("class","block");
    $(this).attr("class","blockSelect");
    $('.rightSide .header').empty();
    console.log(this.dataset.id);
    window.sessionStorage.setItem("otherID",this.dataset.id);
    $.ajax({
        url:"http://localhost:8001/user/getUserInformation",
        type:"GET",
        data:{
            userID:this.dataset.id
        },
        dataType:'json',
        success:function(res){
            var i='';
            i+='<div class="imgText">'+
            '<div class="userimg">'+
            '<img src="./image/B.jpg" alt="" class="cover">'+
            '</div>'+
            '<h4 class="toName">'+
            res.data.nick_name+
            '<br><span class="status">online</span></h4>'+
            '</div>';
            $('.rightSide .header').append(i);
        },
        error:function(){
           alert("1调用失败！")
        }
    })
    $.ajax({
        url:"http://localhost:8001/user/getHistory",
        type:"GET",
        data:{
            userID:userID,
            friendID:this.dataset.id
        },
        dataType:'json',
        success:function(res){
            for(var i=0;i<res.data.length;i++){
                var l='';
                if(res.data[i].msg_from==userID){
                    l+='<div class="message my_message" data-id='+
                        res.data[i].msg_id+
                        '>'+
                        '<span class="operation">'+
                        '<button class="chehui" data-id='+
                        res.data[i].msg_id+
                        '>撤回</button>'+
                        '<button class="zhuanfa" data-id='+
                        res.data[i].msg_id+
                        '>转发</button>'+
                        '</span>'+
                        '<p>'+
                        res.data[i].msg_content+
                        '<br><span>'+
                        res.data[i].msg_time+
                        '</span></p>'+
                        '</div>';
                }
                else{
                    l+='<div class="message friend_message"data-id='+
                        res.data[i].msg_id+
                    '   >'+
                        '<p>'+
                        res.data[i].msg_content+
                        '<br><span>'+
                        res.data[i].msg_time+
                        '</span></p>'+
                        // '<span class="operation">'+
                        // '<button class="chehui" data-id='+
                        // res.data[i].msg_id+
                        // '>撤回</button>'+
                        // '<button class="zhuanfa" data-id='+
                        // res.data[i].msg_id+
                        // '>转发</button>'+
                        // '</span>'+
                        '</div>';
                }
                $(".chatBox").append(l);
            }
        },
        error:function(){
           alert("1调用失败！")
        }
    })
  });

  $(document).on('click', '.blockNewMessage', function () {
    $('.blockSelect').attr("class","block");
    $(this).attr("class","blockSelect");
    $('.rightSide .header').empty();
    console.log(this.dataset.id);
    window.sessionStorage.setItem("otherID",this.dataset.id);
    $.ajax({
        url:"http://localhost:8001/user/getUserInformation",
        type:"GET",
        data:{
            userID:this.dataset.id
        },
        dataType:'json',
        success:function(res){
            var i='';
            i+='<div class="imgText">'+
            '<div class="userimg">'+
            '<img src="./image/B.jpg" alt="" class="cover">'+
            '</div>'+
            '<h4 class="toName">'+
            res.data.nick_name+
            '<br><span class="status">online</span></h4>'+
            '</div>';
            $('.rightSide .header').append(i);
        },
        error:function(){
           alert("1调用失败！")
        }
    })
  });

  $(document).on('click', '.addNewFrinend', function () {
    var friendId=$('.searchFriendId').val();
    $.ajax({
        url:"http://localhost:8001/user/addFriend",
        type:"POST",
        data:{
            userID:userID,
            friendID:friendId
        },
        dataType:'json',
        success:function(res){
            alert("添加好友成功！");
        },
        error:function(){
           alert("1调用失败！")
        }
    })
    
  })
// function chatter_message_html(incoming_message) {
//     var newMessage =  '<div class="current-chatter-wrapper">'+
//         '<div class="chatter-avatar">'+
//             '<img src="./image/iron.png" alt="...">'+
//         '</div>'+
//             '<div class="chatter-message container">'+incoming_message+'</div>'+

//         '</div>';
//     return newMessage;
// }
$(document).on('click', '.chehui', function () {
    var self=this;
    // console.log(this.dataset.id.length);
    if(this.dataset.id.length>=4){
        $.ajax({
            url:"http://localhost:8001/user/deleteGroupMessage",
            type:"POST",
            data:{
                gmessageID:this.dataset.id
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
                $(self).parent().parent().css("display","none");
                alert("撤回信息成功！");
            },
            error:function(){
               alert("1调用失败！")
            }
        })
    }
    else{
        $.ajax({
            url:"http://localhost:8001/user/deleteInformation",
            type:"POST",
            data:{
                umessageID:this.dataset.id
            },
            dataType:'json',
            success:function(res){
                $(self).parent().parent().css("display","none");
                alert("撤回信息成功！");
            },
            error:function(){
               alert("1调用失败！")
            }
        })
    }
    
})
$(document).on('click', '.deleteFriend', function () {
    var self=this;
    var friendID=this.dataset.id;
    // var friendID=$(this).parent().parent().parent().dataset.id;
    $.ajax({
        url:"http://localhost:8001/user/deleteFriend",
        type:"POST",
        data:{
            userID:userID,
            friendID:friendID
        },
        dataType:'json',
        success:function(res){
            $(self).parent().parent().parent().css("display","none");
            alert("删除好友成功！");
        },
        error:function(){
           alert("1调用失败！")
        }
    })
})

$(document).on('click', '.blockGroup', function () {
    console.log(this.dataset.id);
    $(".chatBox").empty();
    $('.blockSelect').attr("class","block");
    $(this).attr("class","blockSelect");
    $('.rightSide .header').empty();
    console.log(this.dataset.id);
    window.sessionStorage.setItem("otherID",this.dataset.id);
    $.ajax({
        url:"http://localhost:8001/user/getGroupInformation",
        type:"GET",
        data:{
            groupID:this.dataset.id
        },
        dataType:'json',
        success:function(res){
            var i='';
            i+='<div class="imgText">'+
            '<div class="userimg">'+
            '<img src="./image/B.jpg" alt="" class="cover">'+
            '</div>'+
            '<h4 class="toName">'+
            res.data.group_name+
            '</h4>'+
            '</div>';
            $('.rightSide .header').append(i);
        },
        error:function(){
           alert("1调用失败！")
        }
    })
    $.ajax({
        url:"http://localhost:8001/user/getGroupHistory",
        type:"GET",
        data:{
            groupID:this.dataset.id
        },
        dataType:'json',
        success:function(res){
            // console.log("getHistory");
            // console.log(res.data);
            for(var i=0;i<res.data.length;i++){
                var l='';
                if(res.data[i].gmsg_from==userID){
                    l+='<div class="message my_message" data-id='+
                        res.data[i].gmsg_id+
                        '>'+
                        '<span class="operation">'+
                        '<button class="chehui" data-id='+
                        res.data[i].gmsg_id+
                        '>撤回</button>'+
                        '<button class="zhuanfa" data-id='+
                        res.data[i].gmsg_id+
                        '>转发</button>'+
                        '</span>'+
                        '<p>'+
                        res.data[i].gmsg_content+
                        '<br><span>'+
                        res.data[i].msg_time+
                        '</span></p>'+
                        '</div>';
                }
                else{
                    l+='<div class="message friend_message"data-id='+
                        res.data[i].gmsg_id+
                    '   >'+
                        '<p>'+
                        res.data[i].gmsg_content+
                        '<br><span>'+
                        res.data[i].gmsg_id+
                        '</span></p>'+
                        // '<span class="operation">'+
                        // '<button class="chehui" data-id='+
                        // res.data[i].msg_id+
                        // '>撤回</button>'+
                        // '<button class="zhuanfa" data-id='+
                        // res.data[i].msg_id+
                        // '>转发</button>'+
                        // '</span>'+
                        '</div>';
                }
                $(".chatBox").append(l);
            }
        },
        error:function(){
           alert("1调用失败！")
        }
    })
})
 