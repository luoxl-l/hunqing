
    var uname = document.getElementById("user_name");
    var upwd = document.getElementById("pwd");
    var ucpwd = document.getElementById("cpwd");
    var utel = document.getElementById("tel");
    var uerror_tip = document.getElementsByClassName("error_tip");
    var btn = document.querySelector("button");
    uname.onblur = function() {
        if(this.value === ""){
            uerror_tip[0].innerHTML = "请输入用户名！";
            uerror_tip[0].style.display = "block";
        }else {
            uerror_tip[0].innerHTML = "";
            uerror_tip[0].style.display = "none";
        }
    }

    upwd.onblur = function() {
        if(this.value === ""){
            uerror_tip[1].innerHTML = "请输入密码！";
            uerror_tip[1].style.display = "block";
        }else if(this.value.length < 6){
            uerror_tip[1].innerHTML = "密码长度不能少于6位";
            uerror_tip[1].style.display = "block";
        }else {
            uerror_tip[1].innerHTML = "";
            uerror_tip[1].style.display = "none";
        }
    }
    ucpwd.onblur = function() {
        if(this.value !== upwd.value ){
            uerror_tip[2].innerHTML = "两次密码不一致！";
            uerror_tip[2].style.display = "block";
        }else if(this.value === ""){
            uerror_tip[2].innerHTML = "请输入密码！";
            uerror_tip[2].style.display = "block";
        }else {
            uerror_tip[2].innerHTML = "";
            uerror_tip[2].style.display = "none";
        }
    }
    utel.onblur = function() {
        if(this.value === ""){
            uerror_tip[3].innerHTML = "请输入手机号！";
            uerror_tip[3].style.display = "block";
        }else if(!isTel(this.value)){
            uerror_tip[3].innerHTML = "手机号格式不正确！";
            uerror_tip[3].style.display = "block";
        }else {
            uerror_tip[3].innerHTML = "";
            uerror_tip[3].style.display = "none";
        }
    }
    function isTel(num) {
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (phone.test(num)) {
            return true;
        } else {
            return false;
        }
    }
    
    function infrom(){
        var coun=0
        for(var j = 0 ; j < uerror_tip.length ; j++){
            if(uerror_tip[j].style.display === "block"){
                coun++;
            }
            
        }
        return coun;
        
    }

    btn.onclick=function(){
       var count= infrom();
        if(count ==0){
            let oname=uname.value.trim();
            let opwd=upwd.value.trim();
            let ocpwd=ucpwd.value.trim();
            let otel=utel.value.trim();
            if(oname !=""&&opwd !=""&&otel!=""&&ocpwd !=""){
                let obj = { username: `${oname}`, password: `${opwd}`, tel: `${otel}` }
                console.log(obj);
                fetch('http://localhost:3000/register', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                }).then(data => data.json()).then(res => {
                    console.log(res);
    
                    alert(res.msg);
                    if (res.msg == "注册成功") {
                        window.location.href = "login.html";
                    }
                })
            }else{
                alert("请将信息填写正确及完整");
            }
            }
           
    }
