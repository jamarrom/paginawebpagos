var totalCompraGen = 0;
let order_pago_id = 0;

	/*OpenPay.setId('mlgazpb4rfr5oy4frt0d');
    OpenPay.setApiKey('pk_e2fdf28eda15493da35ce7f21ec8f488');
	OpenPay.setSandboxMode(true);*/

	// OpenPay.setId('mc2lujsx0twl7jcqwbdr');
  // OpenPay.setApiKey('pk_25c9b9c4a7eb4136baced593fc0ae8cc');
	// OpenPay.setSandboxMode(true);

	Conekta.setPublicKey('key_MtjaPWHsnoSMwJrLrllOIj5');

  // var deviceSessionId = OpenPay.deviceData.setup("CarritoCompras-frmCard", "deviceIdHiddenFieldName");

	// function onSuccess(response) {
	// 	console.log(response);
	// 	console.log(response.data.id);
	// 	console.log(deviceSessionId);
	// 	const textCompra = "Pago de "+$("#txtNombreCompleto").val()+" por el monto de $"+totalCompraGen;

	// 	$.ajax({
	// 		data	: {	txtNombre:$("#txtNombre").val(),txtApellidos:$("#txtApellidos").val(),txtTelefono:$("#txtTelefono").val(),txtEmail:$("#txtEmail").val(),totalCompra:totalCompraGen,listaComprar:textCompra,source_id:response.data.id,device_session_id : deviceSessionId },
	// 		type	: "post",
	// 		dataType: "json",
	// 		//url: "ajax/procesarOrdenCardOpen.php",
	// 		//url: "ajax/procesarOrdenCardOpenSegurite.php",
	// 		url: "https://admin.bioesensi-crm.com/procesarOrdenOpenpay",
	// 		success	: function(Respuesta)
	// 		{
	// 			window.rspt = Respuesta['texto'];
	// 			console.log(Respuesta);

	// 			$(".Cargado img").slideUp('slow');

	// 			if(Respuesta['texto']=="Exito"||Respuesta['texto']==">Exito")
	// 			{
	// 				localStorage.setItem('order_pago_id',order_pago_id);
	// 				localStorage.setItem('token',response.data.id);
	// 				localStorage.setItem('customer_id',Respuesta['customer_id']);
	// 				localStorage.setItem('order_id',Respuesta['orde_id']);

	// 				window.location.href = Respuesta['url'];
	// 			}
	// 			else
	// 			{
	// 			  $(".Cargado img").slideUp('slow');
	// 				console.log(Respuesta);
	// 				swal("Sistema de compras", "Lo sentimos su cpago no pudo ser realizada, intente más tarde por favor.", "warning");										
	// 			}
	// 		},
	// 		error: function(XMLHttpRequest, textStatus, errorThrown) {
	// 		    $(".Cargado img").slideUp('slow');
	// 		    swal("Sistema de compras", "", "warning");
	// 		}

	// 	}).fail( function( jqXHR, textStatus, errorThrown ) {
	// 	    $(".Cargado img").slideUp('slow');
  //           swal("Sistema de compras", "Lo sentimos su compra no pudo ser realizada, transcasión declinada, intente más tarde por favor.", "warning");
  //       });
	// }

	// function onError(response) {
	// 	console.log(response);
	// 	$(".Cargado img").slideUp('slow');
	// 	swal("Carrito de compras", "Lo sentimos su pago no pudo ser realizado, transcasión declinada, intente más tarde por favor.", "warning");
	// }






	var conektaSuccessResponseHandler = function(token) {
		var $form = $("#CarritoCompras-frmCard");
		$form.append($('<input type="hidden" name="conektaTokenId" id="conektaTokenId">').val(token.id));

		const textCompra = "Pago de "+$("#txtNombreCompleto").val()+" por el monto de $"+totalCompraGen;

		$.ajax({
			data	: {	txtNombre:$("#txtNombre").val(),txtApellidos:$("#txtApellidos").val(),txtTelefono:$("#txtTelefono").val(),txtEmail:$("#txtEmail").val(),totalCompra:totalCompraGen,listaComprar:textCompra,txtKo:token.id },
			type	: "post",
			dataType: "json",
			//url: "ajax/procesarOrdenCardOpen.php",
			//url: "ajax/procesarOrdenCardOpenSegurite.php",
			url: "https://admin.bioesensi-crm.com/procesarOrdenOpenpay",
			success	: function(Respuesta)
			{
				window.rspt = Respuesta['texto'];
				console.log(Respuesta);

				$(".Cargado img").slideUp('slow');

				if(Respuesta['texto']=="Exito"||Respuesta['texto']==">Exito")
				{
					localStorage.setItem('order_pago_id',order_pago_id);
					localStorage.setItem('token',Respuesta['openpay_id']);
					localStorage.setItem('customer_id',Respuesta['customer_id']);
					localStorage.setItem('order_id',Respuesta['orde_id']);

					window.location.href = "aviso";
				}
				else
				{
				  $(".Cargado img").slideUp('slow');
					console.log(Respuesta);
					swal("Sistema de compras", "Lo sentimos su pago no pudo ser realizadO, intente más tarde por favor.", "warning");										
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			    $(".Cargado img").slideUp('slow');
			    swal("Sistema de compras", "", "warning");
			}

		}).fail( function( jqXHR, textStatus, errorThrown ) {
		    $(".Cargado img").slideUp('slow');
            swal("Sistema de compras", "Lo sentimos su pago no pudo ser realizado, transcasión declinada, intente más tarde por favor.", "warning");
        });
	};

	var conektaErrorResponseHandler = function(response) {
		console.log(response);
		$(".Cargado img").slideUp('slow');
		swal("Carrito de compras", "Lo sentimos su pago no pudo ser realizado, transcasión declinada, intente más tarde por favor.", "warning");

	};






	$(document).ready(function()
  {
		let urlB = window.location.href;
		//alert(urlB);

		if(urlB==="https://www.bioesensi-crm.com")
			window.location.href = "https://www.bioesensi-crm.com/?ordenPago=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlX2lkIjoiMyIsImZlY2hhIjoiMjAyMy0wNi0xOVQxMTozNjowMi45MDJaIiwiaWF0IjoxNjg3MTc0NTYyLCJleHAiOjE2ODcyNjA5NjJ9.7G6DEIMnvrw4xa2gl9kLe8NcwAKBsnim6FawpHVIPZs";

		var prodId = getParameterByName('ordenPago');

		$.ajax(
			{
				url: "https://admin.bioesensi-crm.com/consultarOrdenPago",
				data	:{
					ordenPago:prodId
				},
				type	: "GET",
				dataType : "json",
				success	: function(Respuesta)
				{
					if(Respuesta.ordenPago!=null) {
						const nombre = Respuesta.ordenPago.clientes.nombre+" "+Respuesta.ordenPago.clientes.apellidos;
						totalCompraGen = Respuesta.ordenPago.monto;
						order_pago_id = Respuesta.ordenPago.orden_pago_id;

						$(".Fase-TitleFase2 span").html(nombre);
						$(".dtTotal").html(Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Respuesta.ordenPago.monto));
						$("#txtNombreCompleto").val(nombre);
						$("#txtNombre").val(Respuesta.ordenPago.clientes.nombre);
						$("#txtApellidos").val(Respuesta.ordenPago.clientes.apellidos);
						$("#txtTelefono").val(Respuesta.ordenPago.clientes.telefono);
						$("#txtEmail").val(Respuesta.ordenPago.clientes.email);

						if(Respuesta.ordenPago.status.status_id==2) {
							$(".TextAviso").css({"display":"block"});
							$(".ContentDatosForm").css({"display":"none"});
						}
					}
					else {
						swal("Sistemas de compras", "Lo sentimos la url de la orden de pago es inválida.", "warning");
					}
				},error: function(XMLHttpRequest, textStatus, errorThrown) {
						$(".Cargado img").slideUp('slow');
						swal("Sistemas de compras", "Tenemos problemas para conectar con el sistema.", "warning");
				}
			}).fail( function( jqXHR, textStatus, errorThrown ) {
					$(".Cargado img").slideUp('slow');
					swal("Sistemas de compras", "Tenemos problemas para conectar con el sistema.", "warning");
				});


		$(".Fase-BtnFase3").click(function() {
			if(validar_campoC("#txtNombreCompleto",8,"Nombre"))
				if(validar_campoC("#txtTelefono",7,"Número de Teléfono"))
					if(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test($("#txtEmail").val()))
					{
						if(validar_campoC("#txtTarjeta",15,"Número de Tarjeta"))
							if(validarTarjeta("#txtTarjeta"))
								if(validar_campoC("#txtMes",2,"MM"))
									if(validar_campoC("#txtAnio",2,"AA"))
										if(validarFechaVigencia("#txtMes","#txtAnio"))
											if(validar_campoC("#txtCvc",3,"CVC"))
												if(validarCVC("#txtCvc"))
												{
													$(".Cargado img").slideDown('slow');

													let $form = $("#CarritoCompras-frmCard");
													Conekta.Token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
												}
					}
					else {
						$("#txtEmail").effect('pulsate', { times:2 }, 1000);
						$("#txtEmail").focus();
					}
			});
	});


	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function validar_campo(campo,cant_num, place)
 	{
  		let ban = true;

    	if(/^\s+$/.test($(campo).val()) || $(campo).val().length < cant_num ||  $(campo).val() == place)
			ban = false;

  		return ban;
	}

	//Obtiene el dia de la semana
	function diaSemana(f) {
		let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
		let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

		var fI = (f.substr(-4,4)+"-"+f.substr(3,2)+"-"+f.substr(0,2));

		let date = new Date(fI.replace(/-+/g, '/'));

		var fechaNum = date.getDate();
		var mes_name = date.getMonth();

		return (dias[date.getDay()-1] + " " + fechaNum + " de " + meses[mes_name] + " de " + date.getFullYear());
	}

	//Determina la hora del dia
	function horaDelDia(hora) {
		var horaN = "";
		var tipo = hora.substr(-4,4);

		horaN = hora;

		return horaN;
	}

	function formatoFecha(fecha)
	{
		return (fecha.substr(-4,4)+"-"+fecha.substr(3,2)+"-"+fecha.substr(0,2));
	}

	function validarTarjeta(campo)
 	{
  		let ban = true;

			if(!Conekta.card.validateNumber($(campo).val()))
				{
				$(campo).effect('pulsate', { times:2 }, 1000);
				$(campo).focus();
				ban = false;
			}
  		return ban;
	}


	function validarCVC(campo)
 	{
  		let ban = true;

			if(!Conekta.card.validateCVC($(campo).val()))
			{
				$(campo).effect('pulsate', { times:2 }, 1000);
				$(campo).focus();
				ban = false;
	  	}
  	return ban;
	}

	function validarFechaVigencia(campo,campo2)
 	{
  	let ban = true;

		if(!Conekta.card.validateExpirationDate($(campo).val(), $(campo2).val()))
	  {
			$(campo).effect('pulsate', { times:2 }, 1000);
			$(campo).focus();
			$(campo2).effect('pulsate', { times:2 }, 1000);
			$(campo2).focus();
			ban = false;
	  }
  	return ban;
	}

	function borrarCookieCarrito(){
		document.cookie.split(";").forEach(function(c) {
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
		});
	}

	function validar_campoC(campo,cant_num, place)
 	{
  		let ban = true;

     	if(/^\s+$/.test($(campo).val()) || $(campo).val().length < cant_num ||  $(campo).val() == place)
	  	{
				$(campo).effect('pulsate', { times:2 }, 1000);
				$(campo).focus();
				ban = false;
			}
  	return ban;
	}


$(function(){
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
	 };

	 if (isMobile.Android())
	 {

	 }
	 else if (isMobile.BlackBerry())
	 {

	 }
	 else if (isMobile.iOS())
	 {
	 }
	 else if (isMobile.Opera())
	 {
	 }
	 else if (isMobile.Windows())
	 {
	 }
	 else
	 {
		$('.Seletlista').fancySelect();
	 }
});