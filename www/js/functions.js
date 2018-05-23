var path="http://catalunyaprobass.com/tfg/";
var idpaciente=1; //FAAAAKE
function getserverprofileimg(tkn){
	$.ajax({url:path+"ajax/getuserbytoken.php",type:"POST",dataType:"JSON",data:"token="+tkn,success:function(r){
		console.log(r)
		if(r.error==""){  $(".dropdown-menu .profilepic").append("<img src='img/profiles/"+r.id+".jpg'>");
		   localStorage.setItem("PROFILE_IMG_SRC", r.id+".jpg" );
		}
		
	}})
	
} 

function getlocalprofileimg(){
	  if(supportsHTML5Storage()) { 
	     var profileimg      = localStorage.getItem("PROFILE_IMG_SRC");
	  $(".dropdown-menu .profilepic").append("<img src='"+path+"img/profiles/"+profileimg+"'>");
	  $("#profile-image1").attr("src",path+"img/profiles/"+profileimg);
	  }

 }

function getLocalProfile(callback){
    var profiletoken      = localStorage.getItem("USRTOKEN");

    if(profiletoken!== null
       ) {
        callback(profiletoken);
    }
}
 
function loadProfile() {
    if(!supportsHTML5Storage()) { return false; }
       getLocalProfile(function(profiletoken) {
            tokenlogin(profiletoken);
		 
    });
}

function getprofile(){
	if(supportsHTML5Storage()) { getlocalprofileimg();
   // selectlocalpatient();
  }
	 
 if(!homepage){loadProfile();}
	}
 
function supportsHTML5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
 function  LocalStorageData(tkn,id) {
    if(!supportsHTML5Storage()) { return false; }
    localStorage.setItem("PROFILE_IMG_SRC", id+".jpg" );
    localStorage.setItem("USRTOKEN",tkn );
    
}


function tokenlogin(tkn){
	$.ajax({url:path+"ajax/dologin.php",type:"POST",data:"token="+tkn,success:function(r){
		rdata=r.split("-");

		if(rdata[0].replace(" ","")=="1"){
			$(".dropdown-menu .profilepic").append("<img src='img/profiles/"+rdata[2]+".jpg'>");
			
		 
if(!homepage){document.location="index.html";}
		}else{
			
		// 	document.location="login.html";
				 }}})
	}

function trylogin(){
	
	$.ajax({url:path+"ajax/dologin.php",type:"POST",data:"username="+$("#inputUser").val()+"&password="+$("#inputPassword").val(),error:function(){alert("se produjo un error al acceder al servidor");},success:function(r){
		rdata=r.split("-");
		if(rdata[0].replace(" ","")=="1"){

			
			//if($("input[type=checkbox]").is(":checked")==true){
//			 esto fuera  porque debe recordarlo siempre
			LocalStorageData(rdata[1],rdata[2]);
				
			//}
				$(".dropdown-menu .profilepic").append("<img src='"+path+"img/profiles/"+rdata[2]+".jpg'>");
			 document.location="index.html";
		}
		else{
			$(".alertalogin").slideDown();
			$(".alertalogin .alert").html(rdata[1])
			$("#inputUser,#inputPassword").bind("focus",function(){
				if($(".alertalogin").is(":visible")){ $(".alertalogin").slideUp("fast") }
				})
			}
		}})
	
	}
	
	
	function setdailymedication(id,val){

		seguro=true;
		if(val==0){
		if(confirm("¿Eliminar toma?")){
		seguro=true;
		}else{seguro=false;}}
				console.log(seguro)
		if(seguro){
		var _id=id;
		var _ok=val;
		$.ajax({url:path+"ajax/setdailymedication.php",type:"POST",data:"id="+_id+"&ok="+_ok,success:function(r){
			if(r.replace(" ","")=="1"){
	if(_ok==1){
		$("#dailymed"+_id).removeClass("inactivo");	$("#dailymed"+_id).addClass("glyphicon-ok-circle").addClass("activo");
		
 

		}	else{
				$("#dailymed"+_id).addClass("inactivo");	$("#dailymed"+_id).removeClass("activo");
		 
			
			}
		setTimeout(function(){document.location.reload();},1000);	
					
				}
			}})
		}//seguro=true
	 
		}
		
		
		
		function sendmealintake(patient,meal,intake){
		var _meal=meal;	cargando();
		$.ajax({url:path+"ajax/setdailymeal.php",type:"POST",data:"patient="+patient+"&meal="+meal+"&intake="+intake,success:function(r){
		
			if(r.replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendmealintake[data-id="+_meal+"]").unbind("click").css("opacity",.5).fadeOut();
				$.each($("#material"+_meal+" input:not(:checked)"),function(k,v){
					
					$(v).parent().remove();
					
				})
				
			$("#material"+_meal+" input:checked").replaceWith('<span class="glyphicon glyphicon-ok activo"></span> ');
				$("a[data-rel="+_meal+"]").parent().addClass("lleno");
				$("a[data-rel="+_meal+"]").prepend('<span class="glyphicon glyphicon-ok"></span>')	
				cargado();
				}else{
					alerta("Se produjo un error al enviar la ingesta");
					}
					}
			})
		}
		
			function sendwaterintake(patient,intake){
		 	cargando();
		$.ajax({url:path+"ajax/setdailywater.php",type:"POST",data:"patient="+patient+"&intake="+intake,success:function(r){
		
			if(r.replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendmealintake[data-id='water']").unbind("click").css("opacity",.5)
							$(".b_sendmealintake[data-id='water']").unbind("click").css("opacity",.5).fadeOut();
				$.each($("#materialwater input:not(:checked)"),function(k,v){
					
					$(v).parent().remove();
					
				})
				
			$("#materialwater input:checked").replaceWith('<span class="glyphicon glyphicon-ok activo"></span> ');
				$("a[data-rel=water]").parent().addClass("lleno");
				$("a[data-rel=water]").prepend('<span class="glyphicon glyphicon-ok"></span>')	
				cargado();
				}else{
				
					alerta("Se produjo un error al enviar la ingesta");
					}
					}
			})
		}
		
		
			function sendurine(patient,times,colour,appearance){
		 	cargando();
		$.ajax({url:path+"ajax/setdailyurine.php",type:"POST",data:"patient="+patient+"&times="+times+"&colour="+colour+"&appearance="+appearance,success:function(r){
			if(r.replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendurine").unbind("click").css("opacity",.5).fadeOut();
		
				$.each($("#material1 input,#material1 select"),function(k,v){
					
					$(v).parent().remove();
					
				})
				
			$("#material1 input,#material1 select").replaceWith('<span class="glyphicon glyphicon-ok activo"></span> ');
				$("a[data-rel=1]").parent().addClass("lleno");
				$("a[data-rel=1]").prepend('<span class="glyphicon glyphicon-ok"></span>')	
				cargado();
				document.location.reload();
				}else{
					alerta("Se produjo un error al enviar los datos");
					}
					}
			})
		}
		
			function sendstools(patient,times,consistency,appearance){
		 cargando();
		$.ajax({url:path+"ajax/setdailystools.php",type:"POST",data:"patient="+patient+"&times="+times+"&consistency="+consistency+"&appearance="+appearance,success:function(r){
			if(r.replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendstools").unbind("click").css("opacity",.5).fadeOut();
		
				$.each($("#material2 input,#material2 select"),function(k,v){
					
					$(v).parent().remove();
					
				})
				
			$("#material2 input,#material2 select").replaceWith('<span class="glyphicon glyphicon-ok activo"></span> ');
				$("a[data-rel=2]").parent().addClass("lleno");
				$("a[data-rel=2]").prepend('<span class="glyphicon glyphicon-ok"></span>')	
				cargado();document.location.reload();
				}else{
					alerta("Se produjo un error al enviar los datos");
					}
					}
			})
		}
		
		

		function sendsleep(patient,asleep,hours){
		 	cargando();
		$.ajax({url:path+"ajax/setdailysleep.php",type:"POST",data:"patient="+patient+"&asleep="+asleep+"&hours="+hours,success:function(r){
			if(r.replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendsleep").unbind("click").css("opacity",.5).fadeOut();
		
			cargado();
				document.location.reload();
				}else{
					alerta("Se produjo un error al enviar los datos");
					}
					}
			})
		}
		

		function sendhygiene(patient,checked,cream,wound,type){
		 	cargando();
		$.ajax({url:path+"ajax/setdailyhygiene.php",type:"POST",data:"usrtoken="+ localStorage.getItem("USRTOKEN")+"&patient="+patient+"&checked="+checked+"&cream="+cream+"&wound="+wound+"&type="+type,success:function(r){
			var respuesta=r.split("-");
			if(respuesta[0].replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				$(".b_sendhygiene").unbind("click").css("opacity",.5).fadeOut();
		//aqui ponemos lo de subir foto , por ajax  id a enviar respuesta[1];
			cargado();
			 document.location.reload();
				//la recarga una vez se haya subido la foto
				}else{
					alerta("Se produjo un error al enviar los datos");
					}
					}
			})
		}
		


		
			function showinbox(){
			$(".mensajes").slideDown(800,"",function(){
			scrollto($(".mensajes"))
				});if($(".newmessage").is(":visible")){
				$(".newmessage").slideUp()
				}
			 
 
		}		
			
		
		function scrollto(el){
				$('html, body').animate({
        scrollTop: $(el).offset().top
    }, 1000);
			}
		
		function shownewmessage(){
			$(".newmessage").slideDown(800,"",function(){
			scrollto($(".newmessage"))
				});if($(".mensajes").is(":visible")){
				$(".mensajes").slideUp()
				}
			if($(".enviados").is(":visible")){
				$(".enviados").slideUp()
				}
			
			}

	function replymessage(id,sbj,to){
			$(".newmessage").slideDown(800,"",function(){
			scrollto($(".newmessage"));
				$(".newmessage #subject").val("Re:"+sbj);
					$(".newmessage #to").val(to);
				});
		if($(".mensajes").is(":visible")){
				$(".mensajes").slideUp()
				}
			
			}


			

			
			
				function fsendmessage(to,subject,_body){
	 
		$.ajax({url:path+"ajax/sendmessage.php",type:"POST",data:"to="+to+"&subject="+subject+"&body="+_body,success:function(r){
			if(r.replace(" ","")=="1"){
				$(".newmessage").after('<div class="alert alert-success text-center" role="alert"> Mensaje enviado con éxito</div>')
				$(".alert-success").css("display","none");;
			$(".newmessage").slideUp(500,"",function(){$(".alert-success").fadeIn()});
				}else{
					alerta("Se produjo un error al enviar el mensaje");
					}
					}
			})
		}
		
function deletemessage(id){
	var _id=id;
	$.ajax({url:path+"ajax/deletemessage.php",type:"POST",data:"id="+id,success:function(r){
			if(r.replace(" ","")=="1"){
			 $("#message"+_id).slideUp();
				}else{
					alerta("Se produjo un error al eliminar el mensaje");
					}
					}
			})
		}

		function selectpatient(id){
			
			$.ajax({url:path+"ajax/setpatient.php",type:"POST",data:"usrtoken="+ localStorage.getItem("USRTOKEN"),success:function(r){
				respuesta=r.split("-");
				
			if(respuesta[0].replace(" ","")=="1"){
				//todo en orden --supongo que habrá que borrar  o inhabilitar el boton
				console.log(respuesta);
	 $("span.pacientenombre").html(respuesta[1]);
				}else{
					alerta("Se produjo un error al recuperar la información del paciente");
					}
					}
			})
			
			}
		
		function cargando(){$(".loading").fadeIn();}
function cargado(){$(".loading").fadeOut();}
		
function alerta(str){
	//luego hay que cambiar esto por alguna alerta de PhoneGap si es posible
	alert(str);
	}		
	
	function loaduserdatam(){
	 $.ajax({url:path+"ajax/getuserdata.php",dataType:"JSON",type:"POST",data:"tkn="+localStorage.getItem("USRTOKEN"),success:function(r){
 $(".profilepic img").attr("src",path+"img/profiles/"+r.id+".jpg");  $("#profile-image1").attr("src",path+"img/profiles/"+r.id+".jpg");
	 $(".username").html(r.username);	selectpatient(0);
	 $(".useremail").html(r.email);
	  $(".userole").html(r.rolname);
	   $(".useremail").html(r.email);
	    $(".useremail").html(r.email);
	 }})
	}
	
	function loadmessages(){
	 $.ajax({url:path+"ajax/getmessages.php",type:"POST",data:"tkn="+localStorage.getItem("USRTOKEN"),success:function(r){
$(".msglist").html(r);
	 }})
	}
	  function playblop(e){$(e).addClass('animated tada');$("#blop").trigger("play");}
	  
			function loadcontacts(){
	 $.ajax({url:path+"ajax/getcontacts.php",type:"POST",data:"tkn="+localStorage.getItem("USRTOKEN"),success:function(r){
$("select#to").replaceWith(r);
	 }})
	}
	
		function loadpatients(){
	 $.ajax({url:path+"ajax/getpatients.php",type:"POST",data:"tkn="+localStorage.getItem("USRTOKEN"),success:function(r){
$(".patients").html(r);
	 }})
	}
	
	function loadnavbar(){
	
	 $.ajax({url:path+"navbar.php",success:function(r){$(".navbar-fixed-top").replaceWith(r);loaduserdatam()}})
	    $.ajax({url:path+"paciente.php",type:"POST",data:"tkn="+localStorage.getItem("USRTOKEN"),success:function(r){$(".patient").replaceWith(r)}})
	
	}



	  
function sendnails(){
	cargando();
		$.ajax({url:path+"ajax/setdailynail.php",type:"POST",data:"usertkn="+localStorage.getItem("USRTOKEN")+"&patient="+idpaciente+"&id="+$("select[name='nail']").val(),success:function(r){
			cargado();if(r.replace(" ","")=="0"){
			
			alerta("Se produjo un error al guardar los datos");
		 
			}else{
				cargado(); //	document.location.reload();
				
			}
		}})
	
}



	  
	  function setupheals(){
 
		  $(".b_sendnails").click(sendnails)
		  
	  $('.material input').bootstrapToggle({width:'100%'})
 $(".nav-pills li a").click(function(e){
	 $(".material:visible").slideToggle();
$("#material"+$(e.currentTarget).attr("data-rel")).slideToggle();
 
	 })
 
$(".material input").change(function(e){
	if($(e.currentTarget).prop('checked')){
	$.ajax({url:path+"ajax/setdailyheal.php",type:"POST",data:"usertkn="+localStorage.getItem("USRTOKEN")+"&patient="+idpaciente+"&id="+$(e.currentTarget).val(),success:function(r){
		if(r.replace(" ","")=="0"){
			alerta("Se produjo un error al guardar los datos");
			$(e.currentTarget).bootstrapToggle('off');
			}
		}})
	}else{
		
		$.ajax({url:path+"ajax/deletedailyheal.php",type:"POST",data:"usertkn="+localStorage.getItem("USRTOKEN")+"&patient="+idpaciente+"&id="+$(e.currentTarget).val(),success:function(r){
		if(r.replace(" ","")=="0"){
			alerta("Se produjo un error al guardar los datos");
			$(e.currentTarget).bootstrapToggle('off');
			}
			
		}})
		
		}
	}) 
	
	  
	  
	 }
		
		
		
		function sendvitalsigns(){
	cargando();
		$.ajax({url:path+"ajax/setdailysigns.php",type:"POST",data:"usertkn="+localStorage.getItem("USRTOKEN")+"&patient="+idpaciente+"&temperature="+$("input[name='temperature']").val()+"&pressure="+$("input[name='pressure']").val()+"&saturation="+$("input[name='saturation']").val()+"&heartrate="+$("input[name='heartrate']").val(),success:function(r){
			cargado();if(r.replace(" ","")=="0"){
			
			alerta("Se produjo un error al guardar los datos");
		 
			}else{
				cargado();setTimeout(function(){//document.location.reload();
				},300);
				
			}
		}})
	
}

function logout(){localStorage.removeItem("USRTOKEN"); document.location='login.html'}
 function restrict(){
	 
  
	 if(!localStorage.getItem("USRTOKEN")){ document.location='login.html'}}


function showsent(){$(".enviados").slideDown();
				   if($(".mensajes").is(":visible")){
				$(".mensajes").slideUp()
				}
				   }
 