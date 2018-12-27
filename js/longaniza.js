var config = {
    apiKey: "AIzaSyB0D0QzeUsDVemRpRA6Xu2Purja_3QAUgQ",
    authDomain: "queso-8.firebaseapp.com",
    databaseURL: "https://queso-8.firebaseio.com",
    projectId: "queso-8",
    storageBucket: "queso-8.appspot.com",
    messagingSenderId: "997827618296"
  };
  firebase.initializeApp(config);
/*.................................................................*/


function connect(){
   var user,pass,mapa,k;
   user=document.getElementById("username").value;
   pass=document.getElementById("pass").value;
   mensaje("","procesando","",2);
   mapa="USER/USERID/"+user;
    db_le(mapa,"snap");
    setTimeout(function(){
        k=getEle().snap;
        if (k=="null"){
            mensaje("","usuario no existente","",1);
        }
        else{
            mapa="USER/USERID/"+user+"/pass";
            db_le(mapa,"snap");
            setTimeout(function(){
                k=getEle().snap;
                if(pass==k){
                    saveEle("user",user);
                    saveEle("pass",pass);
                    /*banco();*/
                    setTimeout(function(){
                        location.href="./dashboard.html";
                    },1000);
                }
                else{mensaje("","contrasena incorrecta","",1);}
            },1000);
        }
    },1000);
}
function reg(){
    var name,last,id_user,pass,mapa;
    id_user=document.getElementById("id_user").value;
    mensaje("","procesando","",2);
    mapa="USER/USERID/"+id_user;
    alert(mapa);
    db_le(mapa,"snap");

    setTimeout(function(){
        if (getEle().snap=="null"){
            db_wr(mapa,1);
        }
        else  {
            mensaje("upss","hay un error","",2);
            document.getElementById("id").value="id ya utilizado";
            document.getElementById("id").style="color:red";
        }
    },1000);
    
}   
function sing_d(){
    desc();
}
function desc(){
    saveEle("user","");
    saveEle("pass","");
    location.href="./login.html";
}
function db_le(mapa,colector){
    var db=firebase.database().ref(mapa);
    db.on('value',function(snapshot){
        k=snapshot.val();
        
        saveEle(colector,snapshot.val());
    });   
}
function db_wr(mapa,style){
    var db=firebase.database().ref(mapa);
    if(style==1){
        db.set({
            name:document.getElementById("name_r").value,
            last:document.getElementById("lastname_r").value,
            id_user:document.getElementById("id_user").value,
            pass:document.getElementById("pass").value,
            balance:"10000"
        })
        mensaje("","registro sastifatorio","",1);
        location.href="./login.html";
    }
    if(style==2){
        db.update({
            balance:getEle().Var
        })
    }
    
}
function con(cap,name){
    if (getEle().usuario =="" || getEle().usuario == null ){
        setTimeout(function(){
            location.href="./login.html";
        },3500);

        mensaje("aun no iniciado","seccion","redirecionado",2);

    }
    else{
        
        procesar_compra();
        setTimeout(function(){
            dow(cap,name);

        },1000) ;
    }
}
function procesar_compra(){
    var val_act,valor_art,restante;
    var mapa="USER/USERID/"+getEle().usuario+"/balance";
    db_le(mapa,"balance");
    setTimeout(function(){
        val_act=parseInt(getEle().balance);
        valor_art=parseInt(document.getElementById("price").innerHTML);
        if(val_act >= valor_art){
            mensaje("","procesando","",2);
            restante=parseInt(val_act-valor_art);
            saveEle("Var",restante);
            mapa="USER/USERID/"+getEle().usuario;
            db_wr(mapa,2);
        }
        else{
            mensaje("","no posee suficiente balance","",1);
        }
    },1000)
}
function login_effet(o){
    if (o==0){
        document.getElementById("hollow").style="display:initial";
    }
    if (o==1){
        document.getElementById("hollow").style="display:none";
    }
}
function banco(){
    var a,name_last,name,last,id,mapa;
    a=getEle().usuario;
    if (a==""){
        document.getElementById("id").innerHTML="-";
        document.getElementById("name").innerHTML="-";
        document.getElementById("balance").innerHTML="-";
        document.getElementById("option").innerHTML="Debe iniciar secion";
    }
    if(a!=""){
        mapa="USER/USERID/"+a+"/name";
        document.getElementById("id").innerHTML=getEle().usuario;
        db_le(mapa,"name");
        document.getElementById("name").innerHTML=getEle().name;
        db_le("USER/USERID/"+getEle().usuario+"/balance","balance");
        document.getElementById("balance").innerHTML=getEle().balance;
        document.getElementById("option").innerHTML="salir";}
}
//colectores//
function dow(cap,name){
    var ds = firebase.storage().ref();
    li=["haito/","absolute duo/","Absolute Solitude/","Arifureta/","black bullet/","Bungaku Shoujo/","ero-manga/","goblin slayer/","konosuba/","kuro no hiera/","Mahouka Koukou No Rettousei/" ];
    var a=ds.child(li[cap]+name).getDownloadURL().then(function(url){
        
        if(url !="" && url!=null && url!=undefined){
        setTimeout(function(){
            noti("on"); 
            document.getElementById("m_1").innerHTML="Compra completada";
            document.getElementById("m_2").innerHTML="";
            document.getElementById("m_2.1").setAttribute("href",String(url));
            document.getElementById("m_3").innerHTML="Descargue su compra";
        },4000)
        }
        else{
            mensaje("error,pero aun asi","pago a sido","efectuado:v",2);
        }
       
    });  
}
function noti(on_off){
    if (on_off=="off"){
        document.getElementById("c_1_1").style="top:-30%;transition:1s;";
    }
    if(on_off=="on"){
       document.getElementById("c_1_1").style="top:30%;transition:1s;";
    }    
}
function mensaje(m_1,m_2,m_3,style){
    if (style==1){
        noti("on");
        document.getElementById("m_1").innerHTML=m_1;
        document.getElementById("m_2").innerHTML=m_2; 
        document.getElementById("m_3").innerHTML=m_3;
    }
    else if(style==2){
        noti("on");
        document.getElementById("m_1").innerHTML=m_1;
        document.getElementById("m_2").innerHTML=m_2; 
        document.getElementById("m_3").innerHTML=m_3;
        
        setTimeout(function(){
            noti("off");
        },5000);
    }
    
}
function getEle(){
    return {
    usuario:localStorage.getItem("user"),
    id:localStorage.getItem("id_user"),
    pass:localStorage.getItem("pass"),
    name:localStorage.getItem("name"),
    last:localStorage.getItem("last"),
    balance:localStorage.getItem("balance"),
    snap:localStorage.getItem("snap"),
    Var:localStorage.getItem("Var")
    }
}
function saveEle(key,dato){
    if (key=="user"){
        localStorage.setItem("user",dato);
    }
    if (key=="id_user"){
        localStorage.setItem("id_user",dato);
    }
    if (key=="pass"){
        localStorage.setItem("pass",dato);
    }
    if (key=="name"){
        localStorage.setItem("name",dato);
    }
    if (key=="last"){
        localStorage.setItem("last",dato);
    }if (key=="balance"){
        localStorage.setItem("balance",dato);
    }
    if (key=="snap"){
        localStorage.setItem("snap",dato);
    }
    if (key=="Var"){
        localStorage.setItem("Var",dato)
    }
}
