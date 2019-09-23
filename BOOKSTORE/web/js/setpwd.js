var tit = document.getElementsByClassName("tit")[0].getElementsByTagName("li");
var div = document.getElementsByClassName("cont")[0].getElementsByTagName("div");
var oname = document.getElementById("tname");
var opwd = document.getElementById("pwd");
var ocpwd = document.getElementById("cpwd");
var otel = document.getElementById("tel");
var label = document.getElementById("err");
var label1 = document.getElementById("err1");
document.querySelector("#btn1").onclick = function () {
    let uname = oname.value.trim();
    let utel = otel.value.trim();

    if (uname != "" && utel != "") {
        let url = `http://localhost:3000/select`;
        let obj = { username: `${uname}`, tel: `${utel}` };
        console.log(obj)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { 'Content-Type': "application/x-www-form-urlencoded" }
        }).then(data => data.json()).then(res => {
            console.log(res);
            if (res.msg == "验证成功") {
                div[0].className = ""
                tit[1].className = "active";
                div[1].className = "active";
                let uname1=res.username;
               next(uname1);
            } else {
                label.innerHTML = res.msg;
            }
        })
    } else {

        label.innerHTML = "用户名或手机号为空!"
    }

}

function next(uname){
    document.querySelector("#btn2").onclick = function () {
        let upwd = opwd.value.trim();
        let ucpwd = ocpwd.value.trim();
        console.log(upwd,ucpwd);
        if (upwd != "" && ucpwd != "") {
            if (upwd == ucpwd) {
                let url = `http://localhost:3000/set`;
                let obj = { username: `${uname}`, password: `${upwd}` };
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                }).then(data => data.json()).then(res => {
                    console.log(res);
                    if (res.msg == "重置成功") {
                        div[1].className="";
                        tit[2].className = "active";
                        div[2].className = "active";
                    }
                })
            } else {
                label1.innerHTML = "密码不一致!"
            }

        } else {
            label1.innerHTML = "密码或确认密码为空!"
        }

    }
}
