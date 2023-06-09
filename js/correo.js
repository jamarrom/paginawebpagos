			$(document).ready(function()
			{
				$("#btnEnviarHeader").click(function()
				{				
					if(validar_campo("#txtNombreH",4,"NOMBRE"))
	    				if((/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test($("#txtEmailH").val())))
						{
							if(validar_campo("#txtTelefonoH",7,"TELÉFONO"))
								if(validar_campoSelect("#stTipoH",".fancy-select",0,0, "0"))
								{
									$("#ContactoMsjHeader").css({"display": "block"});
									$("#ContactoMsjHeader").html("<img src='images/loading.gif' width='50px' />");
							
									$.ajax(
									{
										url		: "enviar.php",
										type	: "POST",
										data	: 
										{
											txtNombre		: $("#txtNombreH").val(),
											txtEmail		: $("#txtEmailH").val(),
											txtTelefono		: $("#txtTelefonoH").val(),
											txtTipo			: $("#stTipoH").val()
										},
										success	: function(HTMLRespuesta)
										{
											$("#formContactoHeader")[0].reset();
											$("#formContacto")[0].reset();
											$('select').trigger('change');

											$("#ContactoMsjHeader").html(HTMLRespuesta);
	
											setTimeout(function(){
												$("#ContactoMsjHeader").slideUp('slow');
											},3000);
										}
									})
								}
							} 
							else
							{
								$("#txtEmailH").effect('pulsate', { times:2 }, 1000);		
								$("#txtEmailH").focus();   
							}   
				})
				
				
				$("#btnEnviar").click(function()
				{				
					if(validar_campo("#txtNombre",4,"NOMBRE"))
	    				if((/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test($("#txtEmail").val())))
						{
							if(validar_campo("#txtTelefono",7,"TELÉFONO"))
								if(validar_campoSelect("#stTipo",".fancy-select",1,0, "0"))	
								{
									$("#ContactoMsj").css({"display": "block"});
									$("#ContactoMsj").html("<img src='images/loading.gif' width='50px' />");
							
									$.ajax(
									{
										url		: "enviar.php",
										type	: "POST",
										data	: 
										{
											txtNombre		: $("#txtNombre").val(),
											txtEmail		: $("#txtEmail").val(),
											txtTelefono		: $("#txtTelefono").val(),
											txtTipo			: $("#stTipo").val()
										},
										success	: function(HTMLRespuesta)
										{
											$("#formContactoHeader")[0].reset();
											$("#formContacto")[0].reset();
											$('select').trigger('change');

											$("#ContactoMsj").html(HTMLRespuesta);
	
											setTimeout(function(){
												$("#ContactoMsj").slideUp('slow');
											},3000);
										}
									})
								}
							} 
							else
							{
								$("#txtEmail").effect('pulsate', { times:2 }, 1000);		
								$("#txtEmail").focus();   
							}   
				})
			});
			
			
			function validar_campo(campo,cant_num, place)
 			{ 
  				var ban = true;
  
     			if(/^\s+$/.test($(campo).val()) || $(campo).val().length < cant_num ||  $(campo).val() == place)
	  			{
					$(campo).effect('pulsate', { times:2 }, 1000);		
					$(campo).focus();
					ban = false;		
	  			}
  			return ban;
			}
			 
			function validar_campoSelect(campo,ejecutarValidacion,posicion,cant_num, place)
			{ 
				var ban = true;
	  
				if(/^\s+$/.test($(campo).val()) || $(campo).val().length < cant_num ||  $(campo).val() == place)
				{
					$(ejecutarValidacion).eq(posicion).effect('pulsate', { times:2 }, 1000);		
					$(ejecutarValidacion).eq(posicion).focus();
					ban = false;		
				}
			return ban;
			}
