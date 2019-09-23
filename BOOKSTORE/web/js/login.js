let tName = document.getElementById("tName");
let tPwd = document.getElementById("tPwd");
let label = document.getElementById("err");
document.querySelector("button").onclick = function () {
    let uName = tName.value.trim();
    let uPwd = tPwd.value.trim();
    if (uName === "" || uPwd === "") {
        label.innerHTML = "用户名或密码为空!"
    }else{
        let url = `http://localhost:3000/login`;
        let obj = { username: `${uName}`, password: `${uPwd}` };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { 'Content-Type': "application/x-www-form-urlencoded" }
        }).then(data => data.json()).then(res => {
            console.log(res);
            
            if (res.msg == "登录成功") {
                window.location.href = "index.html";
                sessionStorage.setItem("username",`${uName}`);
            }else{
                label.innerHTML = res.msg;
            }
        })
    }
   
}