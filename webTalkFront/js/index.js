function check_login()
{
 var name=$("#user_name").val();
 var pass=$("#password").val();
 console.log(name);
 console.log(pass);
 $.ajax({
     url:"http://localhost:8001/user/login",
     type:"POST",
     data:{
         userID:name,
         password:pass
     },
     dataType:'json',
     success:function(){
        window.sessionStorage.setItem("userID",name);
        window.location.href="main.html";
     },
     error:function(){
        $("#login_form").removeClass('shake_effect');  
        setTimeout(function()
        {
         $("#login_form").addClass('shake_effect')
        },1);
     }
 })
}
function check_register(){
    var name = $("#r_user_name").val();
    var pass = $("#r_password").val();
    var sex = $("#r_sex").val();
    var area = $("#r_area").val();
    var email = $("#r_email").val();
    console.log(name,pass,sex,area,email);
    if(name!="" && pass!="" && email != ""&&sex!=""&&area!="")
     {
        $.ajax({
            url:"http://localhost:8001/user/register",
            type:"POST",    
            data:{
                "nick_name":name,
                "sex":sex,
                "avatar":"xxxx",
                "password":pass,
                "area":area,
                "email":email
            },
            dataType:"json",
            success:function(res){
                $('form').animate({
                    height: 'toggle',
                    opacity: 'toggle'
                }, 'slow');
                alert("注册成功！您的账号ID为："+res.data);
            },
            error:function(){
               $("#login_form").removeClass('shake_effect');  
               setTimeout(function()
               {
                $("#login_form").addClass('shake_effect')
               },1);
               alert("注册失败！");
            }
        })
     }
     else
     {
      $("#login_form").removeClass('shake_effect');  
      setTimeout(function()
      {
       $("#login_form").addClass('shake_effect')
      },1);  
     }
}
$(function(){
    $("#create").click(function(){
        check_register();
        return false;
    })
    $("#login").click(function(){
        check_login();
        return false;
    })
    $('.message a').click(function () {
        $('form').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });
})