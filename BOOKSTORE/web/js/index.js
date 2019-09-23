var o = sessionStorage.getItem("username");
console.log(o);
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");
var tip = document.getElementById("tip");
var fl = document.getElementById("fl");
var book=document.getElementById("book");
var rm=document.getElementById("rm")
a3.className="yc";
tip.className="yc";
fl.className="yc";
btna()
var sp=document.getElementsByClassName("ts")[0];
if (o != null) {
    a1.innerHTML = `欢迎用户${o}`;
    a1.removeAttribute("href");
    a3.className="xs";
    a2.className="yc";
    sp.innerHTML="";
    fl.className="xs";
    load();
    rm.className="yc";
    a4.onmouseover=function(){
        a4.className="a4";
    }
}

a3.onclick = function () {
    a1.innerHTML = `登录`
    a1.setAttribute("href", "login.html");
    a3.className="yc";
    a2.className="xs";
    sp.innerHTML="如需获得更多图书信息，请先登录!";
    ul.innerHTML="";
    div.innerHTML="";
    fl.className="yc";
    btna()
    rm.className="xs";
}
function btna(){
    a4.onmouseover=function(){
    tip.className="xs";
    a4.className="ta";
}
a4.onmouseleave=function(){
    tip.className="yc";
    a4.className="";
}
}
var dl=document.getElementById("rt");
fetch("http://localhost:3000/books/rm").then(data => {
    //    return data.text();
    return data.json();//json对象格式
}).then(res => {
    let arr = res.data;
    // console.log(arr);
    arr.forEach(item => {
        //    console.log(item.catalog);
        var dd = document.createElement("dd");
        var d2 = document.createElement("div");
        d2.className="d2";
        var img = document.createElement("img");
        img.src = item.img;
        var p=document.createElement('p');
        p.innerHTML=item.title;
        var div=document.createElement("div");
        div.innerHTML=item.tags;
       d2.appendChild(img);
       d2.appendChild(div);
        dd.appendChild(d2);
        dd.appendChild(p);
        dl.appendChild(dd);
    });

})


var ul = document.createElement("ul");
ul.className="ul1";
var div = document.createElement("div");
div.className = "cont";
function load() {
fetch("http://localhost:3000/btype").then(data => {
    //    return data.text();
    return data.json();//json对象格式
}).then(res => {
    let arr = res.data;
    // console.log(arr);
    arr.forEach(item => {
        //    console.log(item.catalog);
        var li = document.createElement("li");
        li.innerHTML = item.catalog;
        ul.appendChild(li);
    });
    let lis = document.getElementsByTagName("li");
    var id;
    lis[0].setAttribute("class", "active1");
    fetch(`http://localhost:3000/books?id=242`).then(data => {
        //    return data.text();
        return data.json();//json对象格式

    }).then(res => {
        cre(res.data);
    });

    for (let i = 0; i < lis.length; i++) {

        lis[i].onclick = function () {

            for (let j = 0; j < lis.length; j++) {

                lis[j].setAttribute("class", "");
            }

            this.setAttribute("class", "active1");
            id = arr[i].id;
            fetch(`http://localhost:3000/books?id=${id}`).then(data => {
                //    return data.text();
                return data.json();//json对象格式

            }).then(res => {
               
                cre(res.data)
                   
                
            });

        }

    }
});
}

function cre(data) {
    div.innerHTML = "";
    var brr = data;
    console.log(brr);
    brr.forEach(item => {
        var divs = document.createElement("div");
        divs.className = "divs";
        var img = document.createElement("img");
        img.src = item.img;
        var p1 = document.createElement("p");
        p1.className = "p1";
        var s1 = document.createElement("span");
        s1.className = "s1";
        s1.innerHTML = item.title;
        p1.appendChild(s1);
        var s2 = document.createElement("span");
        s2.className = "s2";
        s2.innerHTML = item.catalog;
        p1.appendChild(s2);
        var s3 = document.createElement("span");
        s3.className = "s3";
        s3.innerHTML = item.tags;
        p1.appendChild(s3);
        var p2 = document.createElement("p");
        p2.className = "p2";
        p2.innerHTML = item.sub1;
        var p3 = document.createElement("p");
        p3.className = "p3";
        p3.innerHTML = item.sub2;
        var p4 = document.createElement("p");
        p4.className = "p4";
        var s4 = document.createElement("span");
        s4.className = "s4";
        s4.innerHTML = item.reading;
        p4.appendChild(s4);
        var s5 = document.createElement("span");
        s5.className = "s5";
        s5.innerHTML = item.bytime;
        p4.appendChild(s5);
        var button = document.createElement("button");
        button.innerHTML="加入书架";
       
        button.onclick=function(){
            console.log(item.bid);
            
        }
       
        divs.appendChild(img);
        divs.appendChild(p1);
        divs.appendChild(p2);
        divs.appendChild(p3);
        divs.appendChild(p4);
        divs.appendChild(button);
        div.appendChild(divs);
    });
    
}

book.appendChild(ul);
book.appendChild(div);







