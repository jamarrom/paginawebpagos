
	var numAsntIdaC = 0;
	var numAsntVueltaC = 0;
	var numAsntEdicionC = 0;
	var listAsientosDisponibleIda = new Array();
	var listAsientosCompradosIda = new Array();
	var listAsientosOcupadosIda = new Array();
	var listAsientosDisponibleVuelta = new Array();
	var listAsientosCompradosVuelta = new Array();
	var listAsientosOcupadosVuelta = new Array();
	var listAsientosDisponibleEdicion = new Array();
	var listAsientosCompradosEdicion = new Array();
	var listAsientosOcupadosEdicion = new Array();
	var listaPrecios = new Array();
	var listaCompras = new Array();
	var totalCompraGen = 0;
	var comisionCompraGen = 0;
	var slider1;
	var listCompraFinal = new Array();
	var id_c_e = -1;
	var revertir = false;
	var mySelectT;

	var socket = io.connect('https://socket-acxede.tobecorporativo.mx', {/* Options */ });
	var socket2 = io.connect('https://socket-acxede.tobecorporativo.mx', {/* Options */ });
	
	const conectarSocket = async () => {
		socket = io('https://socket-acxede.tobecorporativo.mx/');

		socket.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socket.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSala = async(data,callback) => {
		socket.emit('entrar-sala',data, callback)
	}

	const conectarSocket2 = async () => {
		socket2 = io('https://socket-acxede.tobecorporativo.mx/');

		socket2.on('connect', () => {
			console.log('Este usuario se conecto 2');
		})

		socket2.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSala2 = async(data,callback) => {
		socket2.emit('entrar-sala',data, callback)
	}

	Conekta.setPublicKey('key_ArQur5PAK9fHoaLM5hkxvFg');

	var conektaSuccessResponseHandler = function(token) {
		var $form = $("#CarritoCompras-frmCard");
		$form.append($('<input type="hidden" name="conektaTokenId" id="conektaTokenId">').val(token.id));
		//$form.get(0).submit(); //Hace submit
		
		//$(".CarritoCompras-ErrorCompras").html("");
		//$(".CarritoCompras-ErrorCompras").slideUp("slow");
	
		var listProductoCompras = new Array();
		var datosPerson = new Array();
	
		datosPerson = new datosPersona();
		datosPerson.email = $("#txtEmail").val();
		datosPerson.telefono = $("#txtTelefono").val();
	    //alert(totalCompraGen);
		
		//console.log(listProductoCompras);
		//alert("->"+token.id);
		$.ajax({
				data	: {	txtTitular:$("#txtNombre").val(),totalCompra:totalCompraGen,listaComprar:listaComprasText(),txtKo:token.id,dataPersona:JSON.stringify(datosPerson) },
				type	: "post",
				dataType: "json",
				url: "ajax/procesarOrdenCard.php",
				success	: function(Respuesta)
				{
					console.log(Respuesta);
					$(".Cargado img").slideUp('slow');

					//console.log(Respuesta[0]['texto']+" "+Respuesta[0]['customer_id']+" "+Respuesta[0]['orde_id']);
															
					if(Respuesta[0]['texto']=="Exito"||Respuesta[0]['texto']==">Exito")
					{
						//swal("Carrito de compras", "Muchas gracias, su compra a sido realizada con éxito.", "success");
	
						cargarDatosFinalesCompra(token.id,Respuesta[0]['customer_id'],Respuesta[0]['orde_id']);
						borrarCookieCarrito();
						$("body").removeClass("Etapa3");
						$("body").addClass("Etapa4");
	
						cargarDatosCompraFinales();

						$('html, body').animate(
						{
							scrollTop: $(".Header").offset().top
						}, 1000, 'swing');

						slider1.goToNextSlide();
						/*setTimeout(function()						
						{
							window.location.href="index.php";
						}, 6000);*/
					}				
					else
					{
						console.log(Respuesta);
						swal("Carrito de compras", "Lo sentimos su compra no pudo ser realizada, intente más tarde por favor.", "warning");										
					}													
			}
		});
	};

	var conektaErrorResponseHandler = function(response) {
		console.log(response)
		//$(".Cargado img").slideUp('slow');
		//$(".CarritoCompras-ErrorCompras").html("<p style='padding-top: 30px;'>"+response.message_to_purchaser+"</p>");
		//$(".CarritoCompras-ErrorCompras").slideDown("slow");
	};

	

	$(document).ready(function() 
    {		
		slider1 = $('.slider').bxSlider({
			mode: 'fade',
			auto: false,
			touchEnabled: false,
			controls: false,
			pager: false
		});

		/*alert("Yes");
		$.ajax(
			{
				url: "ajax/procesarOrdenCardOpen.php",
				data	:{},
				type	: "GET",
				dataType : "html",
				success	: function(Respuesta)
				{
					console.log(Respuesta);
				}		
			});*/

			

		/*$.ajax(
			{
				url: "ajax/prueba2.php",
				data	:{},
				type	: "GET",
				dataType : "json",
				success	: function(Respuesta)
				{
					console.log(Respuesta[0]['texto']+" "+Respuesta[0]['customer_id']+" "+Respuesta[0]['orde_id']);
				}		
			});*/	



		//slider1.goToNextSlide();

		/*
		socket.on('connect', () => {
			socketAsientos({
				scheduleDeparture_id: $("#stHorarioVuelta").val(),
				departure_date: formatoFecha($("#txtFechaVuelta").val())
			})
		})

		const socketAsientos = async(data) => {
			console.log(data);

			socket.emit('actualizarAsientos',data, (data) => {

			})
		}*/

		
		//Lista select
		var mySelect = $('.lista').fancySelect();
		cargarDestino();

		$(".datepicker").datepicker(
		{
			dateFormat: 'dd/mm/yy',
			minDate: new Date()
		});

		//Select 1
		$(".Fase-Select").eq(0).click(function(){
			if(!$(".Fase-Select").eq(0).hasClass("activo")){
				$(".Fase-ContentSelect1").css({"display":"none"});

				$(".Fase-Select").removeClass("activo");

				$(this).addClass("activo");
				$(".Fase-ContentSelect1").eq(0).css({"display":"block"});
			}
			else {
				$(this).removeClass("activo");
				$(".Fase-ContentSelect1").eq(0).css({"display":"none"});
			}			
		});

		//Cambio en texto destino 
		$("select[name=stDestino]").change(function(){

			if($('select[name=stDestino]').val()!="Destino"){
	            $(".Fase-DatDestino").html($('select[name=stDestino] option:selected').text());
				$(".Fase-TextDestino").removeClass("Fase-TextDestino");
			}
		});

		//Tipo de viaje
		$('input[name=rdViaje]').on('change', function(e) {
			if($(this).val()=="Si")
				$(".Fase-ContentViajeVuelta").slideDown("swing");
			else 
				$(".Fase-ContentViajeVuelta").slideUp("swing");
		});

		//Select 2
		$(".Fase-Select").eq(1).click(function(){
			if($("#stDestino").val()=="Destino")
				swal("Aviso:", "Es necesario indicar el Destino.","warning");
			else {
				if(!$(".Fase-Select").eq(1).hasClass("activo")){
					$(".Fase-ContentSelect1").css({"display":"none"});
					$(".Fase-Select").removeClass("activo");

					$(this).addClass("activo");
					$(".Fase-ContentSelect1").eq(1).css({"display":"block"});
				}
				else {
					$(this).removeClass("activo");
					$(".Fase-ContentSelect1").eq(1).css({"display":"none"});
				}
			}			
		});

		//Cambio de fecha de ida para cargar horarios
		$("#txtFechaIda").change(function(){
            $(".Fase-DatViajeIda").html($('#txtFechaIda').val());
			$(".Fase-ViajeIda").removeClass("Temporal");

			cargarHorarioI();
		});

		//Texto de viaje de ida	
		$("select[name=stHorario]").change(function(){
            $(".Fase-DatViajeIda").html($('#txtFechaIda').val()+" "+$('select[name=stHorario] option:selected').text());
			
			cargarAsientoDeIda();
		});

		//Cambio de fecha de vuelta para cargar horarios	
		$("#txtFechaVuelta").change(function(){
            $(".Fase-DatViajeVuelta").html($('#txtFechaVuelta').val());
			$(".Fase-ViajeVuelta").removeClass("Temporal");

			cargarHorarioV();
		});

		//Texto de viaje de vuelta
		$("select[name=stHorarioVuelta]").change(function(){
            $(".Fase-DatViajeVuelta").html($('#txtFechaVuelta').val()+" "+$('select[name=stHorarioVuelta] option:selected').text());
			
			cargarAsientoDeVuelta()
		});

		//Horarios edicion
		$("select[name=stHorarioE]").change(function(){			
			cargarAsientoDeEdicion();
		});

		$("#txtFechaE").change(function(){
			cargarHorarioEdicion();
		});
		

		//Select 3
		$(".Fase-Select").eq(2).click(function(){
			if(!$(".Fase-Select").eq(2).hasClass("activo")){
				$(".Fase-ContentSelect1").css({"display":"none"});
				$(".Fase-Select").removeClass("activo");

				$(this).addClass("activo");
				$(".Fase-ContentSelect1").eq(2).css({"display":"block"});
			}
			else {
				$(this).removeClass("activo");
				$(".Fase-ContentSelect1").eq(2).css({"display":"none"});
			}
		});

		//Asientos de ida
		$(".Fase-SelectAsientos").eq(0).click(function(){

			if(parseInt($("#stCantidad").val())>0) {
				if(!$(".Fase-SelectAsientos").eq(0).hasClass("activo")){
					$(this).addClass("activo");
					$(".Fase-ContentBan").eq(0).css({"display":"block"});
				}
				else {
						$(this).removeClass("activo");
						$(".Fase-ContentBan").eq(0).css({"display":"none"});
					}
				}
			else{
					swal("Aviso:", "Es necesario indicar la cantidad de pasajeros.","warning");
						
					if(!$(".Fase-Select").eq(0).hasClass("activo"))
						$(".Fase-Select").eq(0).click();
		
					$(".fancy-select").eq(1).effect('pulsate', { times:2 }, 1000);
				}
		});

		//Asientos de vuelta
		$(".Fase-SelectAsientos").eq(1).click(function(){
			if(parseInt($("#stCantidad").val())>0) {
				if(!$(".Fase-SelectAsientos").eq(1).hasClass("activo")){
					$(this).addClass("activo");
					$(".Fase-ContentBan").eq(1).css({"display":"block"});
				}
				else {
					$(this).removeClass("activo");
					$(".Fase-ContentBan").eq(1).css({"display":"none"});
				}
			}
			else{
				swal("Aviso:", "Es necesario indicar la cantidad de pasajeros.","warning");
				
				if(!$(".Fase-Select").eq(0).hasClass("activo"))
					$(".Fase-Select").eq(0).click();


				$(".fancy-select").eq(1).effect('pulsate', { times:2 }, 1000);
			}
		});

		//Boton de la pantalla 1
		$(".Fase-BtnFase1").click(function() {

			if(validarDatos(numAsntIdaC,numAsntVueltaC)) {

				$(".Fase-ListCompras").html("");
				cargarDatosCompra();
				$("body").addClass("Etapa2");

				$('html, body').animate(
				{
					scrollTop: $(".Header").offset().top
				}, 1000, 'swing');

				slider1.goToNextSlide();
			}	
			else {
				$(".Fase-ListErrores").css({"display":"block"});

				setTimeout(function(){
					$(".Fase-ListErrores").css({"display":"none"});
				},5000);
			}
		});	
		
		$(".Fase-BtnFase2").click(function() {
			var camposValidos = true;
			var validarEdad = true;

			if(listaComprasText()!=''){

				if(parseInt($("#stCantidad").val())==1)
					if($("#stTipoBoleto0").val()==4) 
						validarEdad = false;

				if(validarEdad){
					for(var j=0; j<listaCompras.length; j++) {
						if(listaCompras[j]['activo']==1){
							if($("#txtPasajero"+j).val()=="" || $("#txtEdadPasajero"+j).val()=="")
							{
								camposValidos = false;
							}
						}
					}
	
					if(camposValidos) {
						$("body").removeClass("Etapa2");
						$("body").addClass("Etapa3");
		
						$('html, body').animate(
						{
							scrollTop: $(".Header").offset().top
						}, 1000, 'swing');
		
						slider1.goToNextSlide();
					}
					else
					{
						swal("Aviso:", "Debe de llevar todos los campos.", "warning");
					}	
				}
				else
					{
						swal("Aviso:", "El menor de edad no puede viajar solo.", "warning");
					}
			}
			else
				swal("Carrito de compras", "Está vacío.", "warning");
		});

		$(".Fase-BtnFase3").click(function() {
			if(validar_campoC("#txtNombre",8,"Nombre"))
				if(validar_campoC("#txtTelefono",7,"Número de Teléfono"))
					if(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test($("#txtEmail").val()))
					{	
						if(validar_campoC("#txtTarjeta",15,"Número de Tarjeta"))
							if(validarTarjeta("#txtTarjeta"))
								if(validar_campoC("#txtMes",2,"MM"))
									if(validar_campoC("#txtAnio",4,"AAAA"))
										if(validarFechaVigencia("#txtMes","#txtAnio"))
											if(validar_campoC("#txtCvc",3,"CVC"))
												if(validarCVC("#txtCvc"))
													{
														$(".Cargado img").slideDown('slow');
																		
														var $form = $("#CarritoCompras-frmCard");
		
														Conekta.Token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
													
													}
													
					}
					else {
						$("#txtEmail").effect('pulsate', { times:2 }, 1000);		
						$("#txtEmail").focus();   
					}
			});

			$(".Fase-BtnAnterior").click(function(){
				slider1.goToPrevSlide();
			});


			$("#btnCancelarEdicion").click(function(){
				
				if(revertir){
					if($("#Fase-ListAsientosEditar .Fase-ItemAsiento.activo").html()!=undefined)
					{
						var posAsiE = encontrarPosiAsientoE(listaCompras[id_c_e]['asiento']);
						$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posAsiE).click();
					}

					if(listaCompras[id_c_e]['tipoViaje']==1)
					{
						var data = {
							seat: listaCompras[id_c_e]['asiento'].toLowerCase()
						}
	
						socket.emit('seleccionar-asiento',data);
					}
					else if(listaCompras[id_c_e]['tipoViaje']==2)
					{
						var data = {
							seat: listaCompras[id_c_e]['asiento'].toLowerCase()
						}
	
						socket2.emit('seleccionar-asiento',data);
					}	
				}

				$(".ContentModificarDatos").css({"display":"none"});
			});

			$("#btnActualizarEdicion").click(function(){	
				//console.log(listaCompras);
				//alert($("#Fase-ListAsientosEditar .Fase-ItemAsiento.activo").eq(id_c_e).html()+"<-"+id_c_e);
				//alert(listaCompras[id_c_e]['asiento']);
				if($("#stHorarioE").val()!="Horario" && $("#Fase-ListAsientosEditar .Fase-ItemAsiento.activo").html()!=undefined)
				{
					listaCompras[id_c_e]['Fecha'] = $("#txtFechaE").val();
					listaCompras[id_c_e]['hora'] =$('#stHorarioE').val();
					listaCompras[id_c_e]['horaT'] = $('select[name=stHorarioE] option:selected').text();
					listaCompras[id_c_e]['asiento'] = $("#Fase-ListAsientosEditar .Fase-ItemAsiento.activo").html();
					listaCompras[id_c_e]['route_id'] = $('#ih-travel-router_idE').val();
					listaCompras[id_c_e]['vehicle_id'] = $('#ih-vehicle_idE').val();
					listaCompras[id_c_e]['departure_date'] = $("#ih-trave-departure_dateE").val();
					listaCompras[id_c_e]['departure_time'] = $("#ih-trave-departure-timeE").val();
					
					//alert(listaCompras[id_c_e]['asiento']);
	
					$("#itemList"+id_c_e+" .Fase-DestinoComra").html("Viaje de <strong>"+listaCompras[id_c_e]['destinoO']+" a "+listaCompras[id_c_e]['destinoD']+"</strong>");
					$("#itemList"+id_c_e+" p").eq(2).html("El día "+diaSemana(listaCompras[id_c_e]['Fecha'])+" a las "+horaDelDia(listaCompras[id_c_e]['horaT'])+" UNIDAD "+listaCompras[id_c_e]['vehicle_id']+" - ASIENTO "+listaCompras[id_c_e]['asiento']+"");		
				
					$(".ContentModificarDatos").css({"display":"none"});
					console.log(listaCompras);
				}
				else
					swal("Aviso:", "Es necesario llenar todos los campos.","warning");
				
				
				
			});
			
    });


	//Carga de destino en select
	function cargarDestino(){	
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/lugares-destino",
			data	:{},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{
				var listDestinos ="";

				for(var j=0; j < Respuesta["data"].length; j++)
				{
					listDestinos += "<option value='"+Respuesta["data"][j]["id"]+"'>"+Respuesta["data"][j]["name"]+"</option>";					
					$(".fancy-select ul").eq(0).append("<li data-value='"+Respuesta["data"][j]["id"]+"'>"+Respuesta["data"][j]["name"]+"</li>")
				}
								
				$("#stDestino").append(listDestinos);
			}		
		});	
	}

	//Carga de horarios de ida
	function cargarHorarioI(){	
		var fechaIdaF = formatoFecha($("#txtFechaIda").val());
		
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/horario-rutas",
			data	:{
				arrive_place_id: $("#stDestino").val(),
				date: fechaIdaF
			},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{		
				//console.log(Respuesta);
				var listHorarios ="<option>Horario</option>";
				$(".fancy-select ul").eq(2).html("");
				$(".fancy-select ul").eq(2).append("<li data-value='Horario' class='selected'>Horario</li>");

				//alert(Respuesta["data"]["horarios"].length);
				for(var j=0; j < Respuesta["data"]["horarios"].length; j++)
				{
					listHorarios += "<option value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</option>";					
					$(".fancy-select ul").eq(2).append("<li data-value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</li>")
				}
				
				//alert(listHorarios);
				$("#stHorario").html("");
				$("#stHorario").append(listHorarios);
			}		
		});	
	}

	//Carga de horarios de vuelta
	function cargarHorarioV(){	
		var fechaVueltaF = formatoFecha($("#txtFechaVuelta").val());
		var idV = 1;

		if($("#stDestino").val()==1)
			idV = 2;
	
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/horario-rutas",
			data	:{
				arrive_place_id: idV,
				date: fechaVueltaF
			},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{				
				var listHorarios ="<option>Horario</option>";
				$(".fancy-select ul").eq(3).html("");
				$(".fancy-select ul").eq(3).append("<li data-value='Horario' class='selected'>Horario</li>");

				for(var j=0; j < Respuesta["data"]["horarios"].length; j++)
				{
					listHorarios += "<option value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</option>";					
					$(".fancy-select ul").eq(3).append("<li data-value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</li>")
				}
								
				$("#stHorarioVuelta").html("");
				$("#stHorarioVuelta").append(listHorarios);
			}		
		});
	}



	function cargarHorarioEdicion(){	
		var fechaEdi = formatoFecha($("#txtFechaE").val());
		//alert(fechaIdaE+"---"+$("#hdDestinoEdicion").val());
		if($("#txtFechaE").val()!=""&&$("#hdDestinoEdicion").val()!=""){
			//alert(fechaEdi+"---"+$("#hdDestinoEdicion").val());

			$.ajax(
			{
				url: "https://admin.acxede.mx/api/v1/guest/catalogo/horario-rutas",
				data	:{
					arrive_place_id: $("#hdDestinoEdicion").val(),
					date: fechaEdi
				},
				type	: "GET",
				dataType : "json",
				success	: function(Respuesta)
				{				
					console.log(Respuesta+"-------"+Respuesta["data"]["horarios"].length);
					var listHorarios ="<option selected>Horario</option>";
					$("#formCompraEditar .fancy-select ul").html("");
					$("#formCompraEditar .fancy-select ul").append("<li data-value='Horario' class='selected'>Horario</li>");


					for(var j=0; j < Respuesta["data"]["horarios"].length; j++)
					{
						listHorarios += "<option value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</option>";					
						$("#formCompraEditar .fancy-select ul").append("<li data-value='"+Respuesta["data"]["horarios"][j]["id"]+"'>"+Respuesta["data"]["horarios"][j]["hora"]+"</li>")
					}
									

					$("#Fase-ListAsientosEditar .Fase-ItemAsiento").removeClass("activo");
					$("#Fase-ListAsientosEditar .Fase-ItemAsiento").removeClass("Ocupado");
					$("#formCompraEditar .trigger").html("Horario");
					$("#stHorarioE").html("");
					$("#stHorarioE").append(listHorarios);
				}		
			});	
		}
	}



	//Carga asientos de ida
	function cargarAsientoDeIda(){	
	
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/status-asientos",
			data	:{
				scheduleDeparture_id: $("#stHorario").val(),
				departure_date: formatoFecha($("#txtFechaIda").val())
			},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{
				//console.log(Respuesta);
				listaPrecios = Respuesta["data"]["lista_precios"];

				$('#ih-travel-router_id').val(Respuesta["data"]["json_socket"]["route_id"]);
				$('#ih-vehicle_id').val(Respuesta["data"]["json_socket"]["vehicle_id"]);
				$("#ih-trave-departure_date").val(Respuesta["data"]["json_socket"]["departure_date"]);
				$("#ih-trave-departure-time").val(Respuesta["data"]["json_socket"]["departure_time"]);

				//alert($('#ih-travel-router_id').val());
				conectarSocket();

				socketEntrarSala({
					route_id: $('#ih-travel-router_id').val(),
					vehicle_id: $('#ih-vehicle_id').val(),
					departure_date: $("#ih-trave-departure_date").val(),
					departure_time: $("#ih-trave-departure-time").val()
				},(data)=>{
					console.log("Este es el data del callback conectar sala",data);
					listAsientosOcupadosIda = data.asientos_ocupados;
					//alert(listAsientosOcupadosIda.length);
					updateSeatsStatus(listAsientosOcupadosIda)
				})

				socket.on('seatsChanged',()=> {
					socket.emit('getSeats',{},(data) => {
						console.log("Obtenemos el listado de asientos ocupados cuando alguien cambia",data);
						listAsientosOcupadosIda = data.asientos_ocupados;
						updateSeatsStatus(listAsientosOcupadosIda)
					})
				})

				socket.on('asientos-comprados',(data)=> {
					console.log(data);
					listAsientosCompradosIda = data.asientos_ocupados;
					updateSeatsStatus(listAsientosOcupadosIda)
				})
		
				
				console.log(Respuesta);
				listAsientosDisponibleIda = Respuesta["data"]["asientos_disponibles"];
				listAsientosCompradosIda = Respuesta["data"]["asientos_comprados"];
				//updateSeatsStatus(listAsientosCompradosIda);
				//alert(listAsientosOcupadosIda.length);

				/*
				var listAsientos ="";
				alert(Respuesta["data"]["asientos_disponibles"].length);
								
				for(var j=0; j < Respuesta["data"]["asientos_disponibles"].length; j++)
				{
					listAsientos += " <li data-id='"+Respuesta["data"]["asientos_disponibles"][j]+"' class='u-efecto'>"+Respuesta["data"]["asientos_disponibles"][j]+"</li>";					
				}
								
				$("#Fase-ListAsientosIda").append(listAsientos);*/
			}		
		});			
		
		/*setTimeout(function(){
			
			//Guardar asientos seleccionados de ida
			$("#Fase-ListAsientosIda li").each(function(m)
			{
				$(this).click(function()
				{
					if(!$(this).hasClass("Ocupado")){
						
						if(!$(this).hasClass("activo")){
							if(numAsntIdaC < parseInt($("#stCantidad").val()))
							{
								$("#Fase-ListAsientosIda li").eq(m).addClass("activo");
								numAsntIdaC = numAsntIdaC + 1;

								var data = {
									seat: $("#Fase-ListAsientosIda li").eq(m).html()
								}

								socket.emit('seleccionar-asiento',data);
							}
							else
								swal("Aviso:", "Ya selecciono todos los asientos.","warning");						
						}
						else {
							$("#Fase-ListAsientosIda li").eq(m).removeClass("activo");
							numAsntIdaC = numAsntIdaC - 1;

							var data = {
								seat: $("#Fase-ListAsientosIda li").eq(m).html()
							}

							socket.emit('eliminar-asiento',data);
						}
					}
					else
						swal("Aviso:", "El asiento ya fue ocupado.","warning");

					
					var listAsientos = "";
					var n = 0;
		
					$("#Fase-ListAsientosIda li").each(function(m){
						if($(this).hasClass("activo")){
							if(n==0) {
								listAsientos = $(this).html();
							}
							else {
								listAsientos += ", "+ $(this).html();
							}
							n++;
						}
					});
	
					$(".Fase-DatAsientos").eq(0).html(listAsientos);
				})
			});
		},1000);*/




		//setTimeout(function(){

			//alert("Entro 1");
			$(".Fase-DatAsientos").eq(0).html("");
			$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").removeClass("activo");
			$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").unbind();
			numAsntIdaC=0;
			//Guardar asientos seleccionados de ida
			$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").each(function(m)
			{
				$(this).click(function()
				{
					if(!$(this).hasClass("Ocupado")){
						
						if(!$(this).hasClass("activo")){
							//alert("Entro 2");
							if(numAsntIdaC < parseInt($("#stCantidad").val()))
							{
								//alert("Entro 3: "+m);

								$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).addClass("activo");
								$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).addClass("activo");
								$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).addClass("activo");
								numAsntIdaC = numAsntIdaC + 1;

								var data = {
									seat: $("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).html().toLowerCase()
								}

								socket.emit('seleccionar-asiento',data);
							}
							else{
								swal("Aviso:", "Ya selecciono todos los asientos.","warning");
							}
						}
						else {
							$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).removeClass("activo");
							numAsntIdaC = numAsntIdaC - 1;

							var data = {
								seat: $("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(m).html().toLowerCase()
							}

							socket.emit('eliminar-asiento',data);
						}
					}
					else
						swal("Aviso:", "El asiento ya fue ocupado.","warning");

					
					var listAsientos = "";
					var n = 0;
		
					$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").each(function(m){
						if($(this).hasClass("activo")){
							if(n==0) {
								listAsientos = $(this).html();
							}
							else {
								listAsientos += ", "+ $(this).html();
							}
							n++;
						}
					});

					$(".Fase-DatAsientos").eq(0).html(listAsientos);


													
					if(!(numAsntIdaC < parseInt($("#stCantidad").val()))){
						$(".TextAsientoSelecciones").html("Asientos elegidos:");
						$(".AsientoSelecciones").html("I: "+$(".Fase-DatAsientos").eq(0).html());
					}

				})
			});
		//},2000);



	}



	//Carga asientos de vuelta
	function cargarAsientoDeVuelta(){	
	
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/status-asientos",
			data	:{
				scheduleDeparture_id: $("#stHorarioVuelta").val(),
				departure_date: formatoFecha($("#txtFechaVuelta").val())
			},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{
				$('#ih-travel-router_idV').val(Respuesta["data"]["json_socket"]["route_id"]);
				$('#ih-vehicle_idV').val(Respuesta["data"]["json_socket"]["vehicle_id"]);
				$("#ih-trave-departure_dateV").val(Respuesta["data"]["json_socket"]["departure_date"]);
				$("#ih-trave-departure-timeV").val(Respuesta["data"]["json_socket"]["departure_time"]);

				//alert($('#ih-travel-router_idV').val());

				conectarSocket2();

				socketEntrarSala2({
					route_id: $('#ih-travel-router_idV').val(),
					vehicle_id: $('#ih-vehicle_idV').val(),
					departure_date: $("#ih-trave-departure_dateV").val(),
					departure_time: $("#ih-trave-departure-timeV").val()
				},(data)=>{
					console.log("Este es el data del callback conectar sala V",data);
					listAsientosOcupadosVuelta = data.asientos_ocupados;
					//alert(listAsientosOcupadosIda.length);
					updateSeatsStatusV(listAsientosOcupadosVuelta)
				})

				socket2.on('seatsChanged',()=> {
					socket2.emit('getSeats',{},(data) => {
						console.log("Obtenemos el listado de asientos ocupados cuando alguien cambia V",data);
						listAsientosOcupadosVuelta = data.asientos_ocupados;
						updateSeatsStatusV(listAsientosOcupadosVuelta)
					})
				})

				socket2.on('asientos-comprados',(data)=> {
					console.log(data);
					listAsientosCompradosVuelta = data.asientos_ocupados;
					updateSeatsStatusV(listAsientosOcupadosVuelta)
				})
				
				console.log(Respuesta);
				listAsientosDisponibleVuelta = Respuesta["data"]["asientos_disponibles"];
				listAsientosCompradosVuelta = Respuesta["data"]["asientos_comprados"];
				
				/*
				var listAsientos ="";
				for(var j=0; j < Respuesta["data"]["asientos_disponibles"].length; j++)
				{
					listAsientos += " <li data-id='"+Respuesta["data"]["asientos_disponibles"][j]+"' class='u-efecto'>"+Respuesta["data"]["asientos_disponibles"][j]+"</li>";					
				}
								
				$("#Fase-ListAsientosVuelta").append(listAsientos);*/
			}		
		});			
		
		/*setTimeout(function(){
			
			//Guardar asientos seleccionados de vuelta
			$("#Fase-ListAsientosVuelta li").each(function(m)
			{
				$(this).click(function()
				{
					if(!$(this).hasClass("activo")){
						if(numAsntVueltaC < parseInt($("#stCantidad").val()))
						{
							$("#Fase-ListAsientosVuelta li").eq(m).addClass("activo");
							numAsntVueltaC = numAsntVueltaC + 1;

							/*var data = {
								seat: $("#Fase-ListAsientosVuelta li").eq(m).html()
							}

							socket.emit('seleccionar-asiento',data);
						}
						else
							swal("Aviso:", "Ya selecciono todos los asientos.","warning");	
					}
					else{
						$("#Fase-ListAsientosVuelta li").eq(m).removeClass("activo");
						numAsntVueltaC = numAsntVueltaC - 1;

						/*var data = {
							seat: $("#Fase-ListAsientosVuelta li").eq(m).html()
						}

						socket.emit('eliminar-asiento',data);
					}

					var listAsientos = "";
					var n = 0;

					$("#Fase-ListAsientosVuelta li").each(function(m){
						if($(this).hasClass("activo")){
							if(n==0) {
								listAsientos = $(this).html();
							}
							else {
								listAsientos += ", "+ $(this).html();
							}
							n++;
						}
					});

					$(".Fase-DatAsientos").eq(1).html(listAsientos);
				})
			});

		},1000);*/


		//setTimeout(function(){
			$(".Fase-DatAsientos").eq(1).html("");
			$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").removeClass("activo");
			$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").unbind();

			//Guardar asientos seleccionados de vuelta
			$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").each(function(m)
			{
				$(this).click(function()
				{
					if(!$(this).hasClass("activo")){
						if(numAsntVueltaC < parseInt($("#stCantidad").val()))
						{
							$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(m).addClass("activo");
							numAsntVueltaC = numAsntVueltaC + 1;

							var data = {
								seat: $("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(m).html().toLowerCase()
							}

							socket2.emit('seleccionar-asiento',data);
						}
						else
							swal("Aviso:", "Ya selecciono todos los asientos.","warning");	
					}
					else{
						$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(m).removeClass("activo");
						numAsntVueltaC = numAsntVueltaC - 1;

						var data = {
							seat: $("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(m).html().toLowerCase()
						}

						socket2.emit('eliminar-asiento',data);
					}

					var listAsientos = "";
					var n = 0;

					$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").each(function(m){
						if($(this).hasClass("activo")){
							if(n==0) {
								listAsientos = $(this).html();
							}
							else {
								listAsientos += ", "+ $(this).html();
							}
							n++;
						}
					});

					$(".Fase-DatAsientos").eq(1).html(listAsientos);

					if(!(numAsntVueltaC < parseInt($("#stCantidad").val()))){
						$(".AsientoSelecciones").append(" - V:"+$(".Fase-DatAsientos").eq(1).html());
					}
				})
			});

		//},1000);


	}



	//Carga asientos de edicion
	function cargarAsientoDeEdicion(){
		//alert($("#stHorarioE").val()+"<-->"+$("#txtFechaE").val());
		$.ajax(
		{
			url: "https://admin.acxede.mx/api/v1/guest/catalogo/status-asientos",
			data	:{
				scheduleDeparture_id: $("#stHorarioE").val(),
				departure_date: formatoFecha($("#txtFechaE").val())
			},
			type	: "GET",
			dataType : "json",
			success	: function(Respuesta)
			{
				$('#ih-travel-router_idE').val(Respuesta["data"]["json_socket"]["route_id"]);
				$('#ih-vehicle_idE').val(Respuesta["data"]["json_socket"]["vehicle_id"]);
				$("#ih-trave-departure_dateE").val(Respuesta["data"]["json_socket"]["departure_date"]);
				$("#ih-trave-departure-timeE").val(Respuesta["data"]["json_socket"]["departure_time"]);

				conectarSocketBole();

				socketEntrarSalaBole({
					route_id: $('#ih-travel-router_idE').val(),
					vehicle_id: $('#ih-vehicle_idE').val(),
					departure_date: $("#ih-trave-departure_dateE").val(),
					departure_time: $("#ih-trave-departure-timeE").val()
				},(data)=>{
					console.log("Este es el data del callback conectar sala B",data);
					
					listAsientosOcupadosEdicion = data.asientos_ocupados;
					updateSeatsStatusE(listAsientosOcupadosEdicion)
				})

				socketB.on('seatsChanged',()=> {
					socketB.emit('getSeats',{},(data) => {
						console.log("Obtenemos el listado de asientos ocupados cuando alguien cambia",data);
						
						listAsientosOcupadosEdicion = data.asientos_ocupados;
						updateSeatsStatusE(listAsientosOcupadosEdicion)
					})
				})

				socketB.on('asientos-comprados',(data)=> {
					console.log(data);
					
					listAsientosCompradosEdicion = data.asientos_ocupados;
					updateSeatsStatusE(listAsientosOcupadosEdicion)
				})
		
				
				//console.log(Respuesta);
				listAsientosDisponibleEdicion = Respuesta["data"]["asientos_disponibles"];
				listAsientosCompradosEdicion = Respuesta["data"]["asientos_comprados"];
				
			}		
		});			



			$("#Fase-ListAsientosEditar .Fase-ItemAsiento").removeClass("activo");
			$("#Fase-ListAsientosEditar .Fase-ItemAsiento").unbind();
			numAsntEdicionC=0;
			//Guardar asientos seleccionados de ida
			$("#Fase-ListAsientosEditar .Fase-ItemAsiento").each(function(m)
			{
				$(this).click(function()
				{
					if(!$(this).hasClass("Ocupado")){
						
						if(!$(this).hasClass("activo")){
							if(numAsntEdicionC < 1)
							{
								$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(m).addClass("activo");
								
								numAsntEdicionC = numAsntEdicionC + 1;

								var data = {
									seat: $("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(m).html().toLowerCase()
								}

								socketB.emit('seleccionar-asiento',data);
							}
							else
								swal("Aviso:", "Ya selecciono el asiento.","warning");						
						}
						else {
							$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(m).removeClass("activo");
							numAsntEdicionC = numAsntEdicionC - 1;

							var data = {
								seat: $("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(m).html().toLowerCase()
							}

							socketB.emit('eliminar-asiento',data);
						}
					}
					else
						swal("Aviso:", "El asiento ya fue ocupado.","warning");
				})
			});

		
				
			if(id_c_e>=0){
				//console.log(listaCompras);
				///alert($("#stHorarioE").val()+" "+listaCompras[id_c_e]['hora']+" "+$("#txtFechaE").val()+" "+listaCompras[id_c_e]['Fecha']);
				if(($("#stHorarioE").val()==listaCompras[id_c_e]['hora'])&&($("#txtFechaE").val()==listaCompras[id_c_e]['Fecha']))
				{
					if(listaCompras[id_c_e]['tipoViaje']==1) {
						var posAsi = encontrarPosiAsiento(listaCompras[id_c_e]['asiento']);
						if($("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posAsi).hasClass("activo")) {
							var data = {
								seat: listaCompras[id_c_e]['asiento']
							}
							socket.emit('eliminar-asiento',data);	

							revertir = true;
						}

						setTimeout(function() {
							var posAsiE = encontrarPosiAsientoE(listaCompras[id_c_e]['asiento']);
							$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posAsiE).click();
						},1000);
					}
					else if(listaCompras[id_c_e]['tipoViaje']==2) {
						var posAsi = encontrarPosiAsientoV(listaCompras[id_c_e]['asiento']);
						if($("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posAsi).hasClass("activo")) {
							var data = {
								seat: listaCompras[id_c_e]['asiento']
							}
							socket2.emit('eliminar-asiento',data);	

							revertir = true;
						}

						setTimeout(function() {
							var posAsiE = encontrarPosiAsientoE(listaCompras[id_c_e]['asiento']);
							$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posAsiE).click();
						},1000);

						/*//var posAsi = encontrarPosiAsientoV(listaCompras[id_c_e]['asiento']);
						var posAsiE = encontrarPosiAsientoE(listaCompras[id_c_e]['asiento']);

						//if($("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posAsi).hasClass("activo"))
							//$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posAsi).click();

						$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posAsiE).click();*/
					}
				}
			}
	
	}


	//Validación de datos de la pantalla 1
	function validarDatos(numAsntIdaC,numAsntVueltaC) {
		var listCamposFaltantes = "";
		var ban = true;
		var activarSelec1 = false;
		var activarSelec2 = false;
		var activarSelec3 = false;

		if(!validar_campo("#stDestino",1, "Destino")){
			listCamposFaltantes += "<li>*Destino</li>";
			activarSelec1 = true;
		}
			
		if(!($('input:radio[name=rdViaje]:checked').val()=="Si" || $('input:radio[name=rdViaje]:checked').val()=="No")) {
			listCamposFaltantes += "<li>*¿Es viaje redondo?</li>";
			activarSelec1 = true;
		}
			
		if(!validar_campo("#stCantidad",1, "0")) {
			listCamposFaltantes += "<li>*¿Cuántos pasajeros?</li>";
			activarSelec1 = true;
		}

		if(!validar_campo("#txtFechaIda",1, "Fecha")) {
			listCamposFaltantes += "<li>*Fecha Viaje Ida</li>";
			activarSelec2 = true;
		}

		if(!validar_campo("#stHorario",1, "Horario")) {
			listCamposFaltantes += "<li>*Hora Viaje Ida</li>";
			activarSelec2 = true;
		}

		if($('input:radio[name=rdViaje]:checked').val()=="Si"){
			if(!validar_campo("#txtFechaVuelta",1, "Fecha")) {
				listCamposFaltantes += "<li>*Fecha Viaje Vuelta</li>";
				activarSelec2 = true;
			}
	
			if(!validar_campo("#stHorarioVuelta",1, "Horario")) {
				listCamposFaltantes += "<li>*Hora Viaje Vuelta</li>";
				activarSelec2 = true;
			}
		}		
		
		if($(".Fase-DatAsientos").eq(0).html()==""){
			listCamposFaltantes += "<li>*Asientos de ida</li>";
			activarSelec3 = true;
		}

		if(numAsntIdaC != parseInt($("#stCantidad").val())){
			listCamposFaltantes += "<li>*Debe de indicar todos los asientos de ida</li>";
			activarSelec3 = true;
		}
		

		if($('input:radio[name=rdViaje]:checked').val()=="Si"){
			if($(".Fase-DatAsientos").eq(1).html()==""){
				listCamposFaltantes += "<li>*Asientos de vuelta</li>";
				activarSelec3 = true;
			}

			if(numAsntVueltaC != parseInt($("#stCantidad").val())){
				listCamposFaltantes += "<li>*Debe de indicar todos los asientos de vuelta</li>";
				activarSelec3 = true;
			}
	
		}

		$(".Fase-ListErrores ul").html(listCamposFaltantes);
		
		if(activarSelec1) {
			if(!$(".Fase-Select").eq(0).hasClass("activo"))
				$(".Fase-Select").eq(0).click();
		} 
			
		if(activarSelec2) {
			if(!$(".Fase-Select").eq(1).hasClass("activo"))
				$(".Fase-Select").eq(1).click();
		} 


		if(activarSelec3) {
			if(!$(".Fase-Select").eq(2).hasClass("activo"))
				$(".Fase-Select").eq(2).click();
		} 

		
		if(activarSelec1==true || activarSelec2==true || activarSelec3==true) 
			ban = false;


		return ban;
	}
	
	function validar_campo(campo,cant_num, place)
 	{ 
  		var ban = true;
  
    	if(/^\s+$/.test($(campo).val()) || $(campo).val().length < cant_num ||  $(campo).val() == place)
			ban = false;
		
  		return ban;
	}

	function updateSeatsStatus(listAsientosOcupados) {

		$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").removeClass("Ocupado");

		for(var j=0; j<listAsientosOcupados.length; j++){
			var posEnc = encontrarPosiAsiento(listAsientosOcupados[j]);

			if(!$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}

		//alert(listAsientosCompradosIda.length);
		for(var j=0; j<listAsientosCompradosIda.length;j++)
		{
			var posEnc = encontrarPosiAsiento(listAsientosCompradosIda[j]);

			if(!$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}
	}


	function updateSeatsStatusV(listAsientosOcupados) {

		$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").removeClass("Ocupado");

		for(var j=0; j<listAsientosOcupados.length; j++){
			var posEnc = encontrarPosiAsientoV(listAsientosOcupados[j]);

			if(!$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}

		//alert(listAsientosCompradosIda.length);
		for(var j=0; j<listAsientosCompradosVuelta.length;j++)
		{
			var posEnc = encontrarPosiAsientoV(listAsientosCompradosVuelta[j]);

			if(!$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}




		/*$("#Fase-ListAsientosIda li").removeClass("Ocupado");

		for(var j=0; j<listAsientosOcupados.length; j++){
			var posEnc = encontrarPosiAsiento(listAsientosOcupados[j]);

			if(!$("#Fase-ListAsientosIda li").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosIda li").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosIda li").eq(posEnc).removeClass("Ocupado");
			}
		}*/
	}


	function updateSeatsStatusE(listAsientosOcupados) {

		$("#Fase-ListAsientosEditar .Fase-ItemAsiento").removeClass("Ocupado");

		for(var j=0; j<listAsientosOcupados.length; j++){
			var posEnc = encontrarPosiAsientoE(listAsientosOcupados[j]);

			if(!$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}


		for(var j=0; j<listAsientosCompradosEdicion.length;j++)
		{
			var posEnc = encontrarPosiAsientoE(listAsientosCompradosEdicion[j]);

			if(!$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).hasClass("Ocupado")){
				$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).addClass("Ocupado");
			}
			else {
				$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(posEnc).removeClass("Ocupado");
			}
		}
	}

	function encontrarPosiAsiento(asientoB) {
		for(var j=0; j<15; j++){
			//alert(asientoB.toLowerCase()+" "+$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(j).html().toLowerCase());
			if(asientoB.toLowerCase()==$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(j).html().toLowerCase()){
				return j;
			}
				
		}
	}

	function encontrarPosiAsientoV(asientoB) {
		for(var j=0; j<15; j++){
			//alert(asientoB.toLowerCase()+" "+$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(j).html().toLowerCase());
			if(asientoB.toLowerCase()==$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento").eq(j).html().toLowerCase()){
				return j;
			}
				
		}
	}

	function encontrarPosiAsientoE(asientoB) {
		for(var j=0; j<15; j++){
			//alert(asientoB.toLowerCase()+" "+$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(j).html().toLowerCase());
			if(asientoB.toLowerCase()==$("#Fase-ListAsientosEditar .Fase-ItemAsiento").eq(j).html().toLowerCase()){
				return j;
			}
				
		}
	}

	//Pagina 2
	function cargarDatosCompra() {
		var posiLC = listaCompras.length;

		var numPer = parseInt($("#stCantidad").val());
		var numM = 1;
		var itemList = "";
		var destinoI = $('select[name=stDestino] option:selected').text();
		var destinoI_id = $("#stDestino").val();
		var destinoR = "";
		var destinoR_id = "";
		var horaI = $('select[name=stHorario] option:selected').text();
		var horaV = $('select[name=stHorarioVuelta] option:selected').text();

		if(destinoI=="Huimanguillo"){
			destinoR = "Villahermosa";
			destinoR_id = 1;
		}			
		else if(destinoI=="Villahermosa"){
			destinoR = "Huimanguillo";
			destinoI_id = 2;
		}

		if($('input:radio[name=rdViaje]:checked').val()=="Si")
			numM = 2;

		var subTotalCompra = 0;
		var comisionCompraT = 0.034;
		var comisionCompra = 0;
		var totalCompra = 0;
		var posLInt = 0;

		for(var j=0; j<numPer; j++){
			
			listaCompras[posiLC] = new Array();
			listaCompras[posiLC]['destinoO_id'] = destinoR_id;
			listaCompras[posiLC]['destinoO'] = destinoR;
			listaCompras[posiLC]['destinoD_id'] = destinoI_id;
			listaCompras[posiLC]['destinoD'] = destinoI;
			listaCompras[posiLC]['Fecha'] = $("#txtFechaIda").val();
			listaCompras[posiLC]['hora'] =$('#stHorario').val();
			listaCompras[posiLC]['horaT'] = $('select[name=stHorario] option:selected').text();
			listaCompras[posiLC]['asiento'] = $("#Fase-ListAsientosIdaN .Fase-ItemAsiento.activo").eq(j).html();
			listaCompras[posiLC]['tipoBoleto'] = 1;
			listaCompras[posiLC]['precio'] =listaPrecios[0]['amount'];
			listaCompras[posiLC]['tipoViaje'] = 1;
			listaCompras[posiLC]['route_id'] = $('#ih-travel-router_id').val();
			listaCompras[posiLC]['vehicle_id'] = $('#ih-vehicle_id').val();
			listaCompras[posiLC]['departure_date'] = $("#ih-trave-departure_date").val();
			listaCompras[posiLC]['departure_time'] = $("#ih-trave-departure-time").val();
			listaCompras[posiLC]['activo'] = 1;
			posiLC++;


			subTotalCompra = subTotalCompra + parseInt(listaPrecios[0]['amount']);

			itemList += "<li id='itemList"+posLInt+"'>";
			itemList += "<p class='Fase-PrecioBoleto u-positionAbsolute'><strong>$"+listaPrecios[0]['amount']+"</strong></p>";
			itemList += "<div class='Fase-ColListCompras u-inline-block'>";
				itemList += "<p class='Fase-DestinoComra'>";
				itemList += "Viaje de <strong>"+destinoR+" a "+destinoI+"</strong>";
				itemList += "</p>";
				itemList += "<p>";
				itemList += "El día "+diaSemana($("#txtFechaIda").val())+" a las "+horaDelDia(horaI)+" UNIDAD "+$('#ih-vehicle_id').val()+" - ASIENTO "+$("#Fase-ListAsientosIdaN .Fase-ItemAsiento.activo").eq(j).html()+"";
				itemList += "</p>";

				itemList += "<div class='Fase-DatosPasajero'>";
				itemList += "<input class='Fase-TxtPasajero' type='text' name='txtPasajero"+posLInt+"' id='txtPasajero"+posLInt+"' placeholder='Nombre del pasajero' onkeyup='fnTxtPasajero("+posLInt+")'>";
				itemList += "<input class='Fase-TxtEdad' type='text' name='txtEdadPasajero"+posLInt+"' id='txtEdadPasajero"+posLInt+"' placeholder='Edad' onkeyup='fnTxtEdad("+posLInt+")' maxlength=3>";
				itemList += "</div>";

				itemList += "<p class='Fase-TextTipoBoleto u-inline-block'>Tipo de boleto</p>";
				itemList += "<div class='u-inline-block'>";
					itemList += "<select class='listaT2' name='stTipoBoleto"+posLInt+"' id='stTipoBoleto"+posLInt+"' onchange='actualizarPrecioBoleto("+posLInt+")'>";
					for(var a=0; a<listaPrecios.length; a++) {
						itemList += "<option value='"+listaPrecios[a]['id']+"'>"+listaPrecios[a]['name']+"</option>";
					}
					itemList += "</select>";
				itemList += "</div>";
			itemList += "</div> ";

			itemList += "<p class='Fase-OpcionesListCompras u-inline-block'>";
			itemList += "<a class='Fase-BtnEliminarCompra' onclick='borrarCompra("+posLInt+")'></a>";
			itemList += "<a class='Fase-BtnEditarCompra' onclick='editarCompra("+posLInt+")'>Modificar datos</a>";
			itemList += "</p>";
			itemList += "</li>";

			posLInt = posLInt + 1;

			if($('input:radio[name=rdViaje]:checked').val()=="Si"){
				listaCompras[posiLC] = new Array();
				listaCompras[posiLC]['destinoO_id'] = destinoI_id;
				listaCompras[posiLC]['destinoO'] = destinoI;
				listaCompras[posiLC]['destinoD_id'] = destinoR_id;
				listaCompras[posiLC]['destinoD'] = destinoR;
				listaCompras[posiLC]['Fecha'] = $("#txtFechaVuelta").val();
				listaCompras[posiLC]['hora'] =$('#stHorarioVuelta').val();
				listaCompras[posiLC]['horaT'] = $('select[name=stHorarioVuelta] option:selected').text();
				listaCompras[posiLC]['asiento'] = $("#Fase-ListAsientosVueltaN .Fase-ItemAsiento.activo").eq(j).html();
				listaCompras[posiLC]['tipoBoleto'] = 1;
				listaCompras[posiLC]['precio'] =listaPrecios[0]['amount'];
				listaCompras[posiLC]['tipoViaje'] = 2;
				listaCompras[posiLC]['route_id'] = $('#ih-travel-router_idV').val();
				listaCompras[posiLC]['vehicle_id'] = $('#ih-vehicle_idV').val();
				listaCompras[posiLC]['departure_date'] = $("#ih-trave-departure_dateV").val();
				listaCompras[posiLC]['departure_time'] = $("#ih-trave-departure-timeV").val();
				listaCompras[posiLC]['activo'] = 1;
				posiLC++;

				subTotalCompra = subTotalCompra + parseInt(listaPrecios[0]['amount']);

				itemList += "<li id='itemList"+posLInt+"'>";
				itemList += "<p class='Fase-PrecioBoleto u-positionAbsolute'><strong>$"+listaPrecios[0]['amount']+"</strong></p>";
				itemList += "<div class='Fase-ColListCompras u-inline-block'>";
					itemList += "<p class='Fase-DestinoComra'>";
					itemList += "Viaje de <strong>"+destinoI+" a "+destinoR+"</strong>";
					itemList += "</p>";
					itemList += "<p>";
					itemList += "El día "+diaSemana($("#txtFechaVuelta").val())+" a las "+horaDelDia(horaV)+" "+$("#Fase-ListAsientosVueltaN .Fase-ItemAsiento.activo").eq(j).html()+"";
					itemList += "</p>";

					itemList += "<div class='Fase-DatosPasajero'>";
					itemList += "<input class='Fase-TxtPasajero' type='text' name='txtPasajero"+posLInt+"' id='txtPasajero"+posLInt+"' placeholder='Nombre del pasajero'>";
					itemList += "<input class='Fase-TxtEdad' type='text' name='txtEdadPasajero"+posLInt+"' id='txtEdadPasajero"+posLInt+"' placeholder='Edad' maxlength=3>";
					itemList += "</div>";	

					itemList += "<p class='Fase-TextTipoBoleto u-inline-block'>Tipo de boleto</p>";
					itemList += "<div class='u-inline-block'>";
						itemList += "<select class='listaT2' name='stTipoBoleto"+posLInt+"' id='stTipoBoleto"+posLInt+"' onchange='actualizarPrecioBoleto("+posLInt+")'>";
						for(var a=0; a<listaPrecios.length; a++) {
							itemList += "<option value='"+listaPrecios[a]['id']+"'>"+listaPrecios[a]['name']+"</option>";
						}
						itemList += "</select>";
					itemList += "</div>";
				itemList += "</div> ";

				itemList += "<p class='Fase-OpcionesListCompras u-inline-block'>";
					itemList += "<a class='Fase-BtnEliminarCompra' onclick='borrarCompra("+posLInt+")'></a>";
					itemList += "<a class='Fase-BtnEditarCompra' onclick='editarCompra("+posLInt+")'>Modificar datos</a>";
				itemList += "</p>";
				itemList += "</li>";

				posLInt = posLInt + 1;
			}
		}

		var subTCom = ((subTotalCompra * comisionCompraT)+3);
		comisionCompra = (subTCom * 0.16) + subTCom + 0.31;
		totalCompra = comisionCompra + subTotalCompra;

		comisionCompraGen = comisionCompra.toFixed(2);
		totalCompraGen = (totalCompra).toFixed(2);
		
		$(".dtSubtotal").html(subTotalCompra);
		$(".dtComision").html(comisionCompra.toFixed(2));
		$(".dtTotal").html(totalCompra.toFixed(2));

		$("#ListCompras").html(itemList);
		mySelectT = $('.listaT').fancySelect();

		console.log(listaCompras);		



		$(".Fase-TxtEdad").on('input', function (evt) {
			// Allow only numbers.
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		});

		$(".Fase-TxtEdad" ).blur(function() {
				$(".Fase-TxtEdad").each(function(m)
				{
					if(parseInt($(this).val())<0 || parseInt($(this).val())>115)
						$(this).val("");
				});
		  });

		$(".Fase-TxtEdad").each(function(m) {
			$(this).click(function() {
				$(".Fase-TxtEdad").eq(m).removeAttr("placeholder");
			  });
		});


		$(".Fase-TxtPasajero").each(function(m) {
			$(this).click(function() {
				$(".Fase-TxtPasajero").eq(m).removeAttr("placeholder");
			  });
		});
	}


	function fnTxtPasajero(pos) {
		if($('input:radio[name=rdViaje]:checked').val()=="Si"){
			$("#txtPasajero"+(pos+1)).val($("#txtPasajero"+pos).val());
		}	
	}

	function fnTxtEdad(pos) {
		if($('input:radio[name=rdViaje]:checked').val()=="Si"){
			$("#txtEdadPasajero"+(pos+1)).val($("#txtEdadPasajero"+pos).val());
		}	
	}

	//Obtiene el dia de la semana
	function diaSemana(f) {
		let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
		let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
 
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

		if(tipo=="A.M.")
		{
			horaN = hora.substr(0,5)+" del día";
		}
		else {
			var horaP = parseInt(hora.substr(0,2));

			if((horaP>=1 && horaP < 6) || horaP == 12)
				horaN = hora.substr(0,5)+" de la tarde";
			else if(horaP >= 6 && horaP < 12)
				horaN = hora.substr(0,5)+" de la noche";
		}

		return horaN;
	}


	function formatoFecha(fecha)
	{
		return (fecha.substr(-4,4)+"-"+fecha.substr(3,2)+"-"+fecha.substr(0,2));
	}

	function actualizarPrecioBoleto(pos) {
		if($("#stTipoBoleto"+pos).val()==2 || $("#stTipoBoleto"+pos).val()==3 || $("#stTipoBoleto"+pos).val()==7) {
			swal({
				title: "Terminos y condiciones del servicios",
				text: "Deberá mostrar una credencial vigente que acredite que es: "+$("select[name=stTipoBoleto"+pos+"] option:selected").text()+" para abordar",
				buttons: ["No acepto", "Acepto"],
			}).then(function(value) {
				if (value) {
					var posTP = buscarTipoPrecio($("#stTipoBoleto"+pos).val());
			
					listaCompras[pos]['tipoBoleto'] = listaPrecios[posTP]['id'];
					listaCompras[pos]['precio'] = listaPrecios[posTP]['amount'];
					$(".Fase-PrecioBoleto strong").eq(pos).html("$"+listaPrecios[posTP]['amount']);
		
					actualizarPreciosBoletos();
				}
				else {
					$("#stTipoBoleto"+pos).val("1");
					$("#itemList"+pos+" .trigger").html($("select[name=stTipoBoleto"+pos+"] option:selected").text());					
				}
			});	
		}
		else if($("#stTipoBoleto"+pos).val()==4) {
			swal({
				title: "Terminos y condiciones del servicios",
				text: "Los menores de edad deben de ir acompañados por un adulto",
				buttons: ["No acepto", "Acepto"],
			}).then(function(value) {
				if (value) {
					var posTP = buscarTipoPrecio($("#stTipoBoleto"+pos).val());
			
					listaCompras[pos]['tipoBoleto'] = listaPrecios[posTP]['id'];
					listaCompras[pos]['precio'] = listaPrecios[posTP]['amount'];
					$(".Fase-PrecioBoleto strong").eq(pos).html("$"+listaPrecios[posTP]['amount']);
		
					actualizarPreciosBoletos();
				}
				else {
					$("#stTipoBoleto"+pos).val("1");
					$("#itemList"+pos+" .trigger").html($("select[name=stTipoBoleto"+pos+"] option:selected").text());					
				}
			});	
		}
		else {
			var posTP = buscarTipoPrecio($("#stTipoBoleto"+pos).val());
			
				listaCompras[pos]['tipoBoleto'] = listaPrecios[posTP]['id'];
				listaCompras[pos]['precio'] = listaPrecios[posTP]['amount'];
				$(".Fase-PrecioBoleto strong").eq(pos).html("$"+listaPrecios[posTP]['amount']);
	
				actualizarPreciosBoletos();
		}
		
	}

	function buscarTipoPrecio(tipo_id) {
		for(var j=0; j < listaPrecios.length; j++)
			if(listaPrecios[j]['id']==tipo_id)
				return j;
	}

	function actualizarPreciosBoletos() {		
		var subTotalCompra = 0;
		var comisionCompraT = 0.034;
		var comisionCompra = 0;
		var totalCompra = 0;

		for(var j=0; j<listaCompras.length; j++)
			if(listaCompras[j]['activo']==1)
				subTotalCompra += parseInt(listaCompras[j]['precio']);

		var subTCom = ((subTotalCompra * comisionCompraT)+3);
		comisionCompra = (subTCom * 0.16) + subTCom + 0.31;
		totalCompra = comisionCompra + subTotalCompra;

		comisionCompraGen = comisionCompra.toFixed(2);
		totalCompraGen = (totalCompra).toFixed(2);

		$(".dtSubtotal").html(subTotalCompra);
		$(".dtComision").html(comisionCompra.toFixed(2));
		$(".dtTotal").html(totalCompra.toFixed(2));
	}

	function validarTarjeta(campo)
 	{ 
  		var ban = true;
  
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
  		var ban = true;
  
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
  		var ban = true;
  
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

	function listaComprasText() {
		var listCompraT = "";

		for(var j=0; j<listaCompras.length; j++) {
			if(listaCompras[j]['activo']==1){
				if(listCompraT=="")
					listCompraT = " Boleto de "+listaCompras[j]['destinoO'] + " a " + listaCompras[j]['destinoD'] + " el " + listaCompras[j]['Fecha'] + " a las " +listaCompras[j]['horaT'];
				else
					listCompraT += ", Boleto de "+listaCompras[j]['destinoO'] + " a " + listaCompras[j]['destinoD'] + " el " + listaCompras[j]['Fecha'] + " a las " +listaCompras[j]['horaT'];
			}
		}
			
		return listCompraT;
	}


	//Pagina 3
	function cargarDatosCompraFinales() {
		var itemList = "";

		for(var j=0; j<listaCompras.length; j++) {
			if(listaCompras[j]['activo']==1){
				itemList += "<li>";
					itemList += "<p class='Fase-DestinoComra'>";
					itemList += "Viaje de <strong>"+listaCompras[j]['destinoO']+" a "+listaCompras[j]['destinoD']+"</strong>";
					itemList += "</p>";
					itemList += "<p>";
					itemList += "El día "+diaSemana(listaCompras[j]['Fecha'])+" a las "+horaDelDia(listaCompras[j]['horaT'])+" UNIDAD "+$('#ih-vehicle_id').val()+" - ASIENTO "+listaCompras[j]['asiento']+" - "+$("select[name=stTipoBoleto"+j+"] option:selected").text();
					itemList += "</p>";
				itemList += "</li>";

			}
		}

		$("#ListComprasDetalle").html(itemList);
		//console.log(listaCompras);
	}


	function validar_campoC(campo,cant_num, place)
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

	
//DatosPersona
function datosPersona()
{
	this.email = null
	this.telefono = null
}

//Editar compra
function editarCompra(posi) {
	swal({
		title: "Confirmar",
		text: "¿Desea editar los datos de este boleto?",
		buttons: ["No", "Si"],
	}).then(function(value) {
		if (value) {
			id_c_e = posi;
			$("#txtFechaE").val("").change();
			$("#hdDestinoEdicion").val(listaCompras[posi]['destinoD_id']);
			$("#txtFechaE").val(listaCompras[posi]['Fecha']).change();
			

			///alert(listaCompras[posi]['hora']);
			setTimeout(function() {
				console.log(listaCompras[posi]['hora']+"--");
				$("#stHorarioE option[value="+ listaCompras[posi]['hora'] +"]").attr("selected",true).change();			
			}, 1000);

			//$("#stHorarioE").val(listaCompras[posi]['hora']);
			
			$(".ContentModificarDatos").css({"display":"block"});	
		}
	});
}

//Eliminar compra
function borrarCompra(posi) {
	swal({
		title: "Confirmar",
		text: "¿Desea eliminar este boleto?",
		buttons: ["No", "Si"],
	}).then(function(value) {
		if (value) {
			listaCompras[posi]['activo'] = 0;
			$("#itemList"+posi).slideUp("slow");

			actualizarPreciosBoletos();
			//console.log(listaProductosIguales);
		}
	});
}


function cargarDatosFinalesCompra(token,customer_id,order_id) {

	var travels = new Object();
	var listaFechaCompras = new Array();


	for(var j=0; j<listaCompras.length; j++){
		if(listaCompras[j]['activo']==1){
			
			if(!existenFechas(listaFechaCompras,listaCompras[j]['departure_date'],listaCompras[j]['hora'])){
				var posiFC = listaFechaCompras.length;

				listaFechaCompras[posiFC] = new Array();
				listaFechaCompras[posiFC]['fecha'] = listaCompras[j]['departure_date'];
				listaFechaCompras[posiFC]['hora'] = listaCompras[j]['hora'];	
				listaFechaCompras[posiFC]['route_id'] = listaCompras[j]['route_id'];
				listaFechaCompras[posiFC]['hora'] = listaCompras[j]['hora'];
				listaFechaCompras[posiFC]['departure_date'] = listaCompras[j]['departure_date'];
				listaFechaCompras[posiFC]['departure_time'] = listaCompras[j]['departure_time'];
			}
		}
	}

	for(var j=0; j<listaFechaCompras.length; j++){
		travels[j] = new Object();
		travels[j]['travel'] = new Object();
		travels[j]['passengers'] = new Object();

		var travel = new Object();
		travel['route_id'] = listaFechaCompras[j]['route_id'];
		travel['schedule_departure_id'] = listaFechaCompras[j]['hora'];
		travel['departure_date'] = listaFechaCompras[j]['departure_date'];
		travel['departure_time'] = listaFechaCompras[j]['departure_time'];

		travels[j]['travel'] = travel;

		for(var a=0; a<listaCompras.length; a++){
			if(listaCompras[a]['activo']==1){
				//alert(listaFechaCompras[j]['fecha']+" = "+listaCompras[a]['departure_date'] +" "+ listaFechaCompras[j]['hora']+" = "+listaCompras[a]['hora']);
				if(listaFechaCompras[j]['fecha']==listaCompras[a]['departure_date'] && listaFechaCompras[j]['hora']==listaCompras[a]['hora']){
					travels[j]['passengers'][listaCompras[a]['asiento']] = new Object();
					travels[j]['passengers'][listaCompras[a]['asiento']]['price_id'] = listaCompras[a]['tipoBoleto'];
					travels[j]['passengers'][listaCompras[a]['asiento']]['full_name'] = $("#txtPasajero"+a).val();
					travels[j]['passengers'][listaCompras[a]['asiento']]['age'] = $("#txtEdadPasajero"+a).val();
				}
			}
		}
	}

	const myJson = {
		travels,
		invoice: 
			{
				comission: comisionCompraGen,
				total: totalCompraGen,
				payed_by: $("#txtNombre").val(),
				payed_by_email: $("#txtEmail").val(),
				payed_by_phone: $("#txtTelefono").val(),
				token_conekta : token,
				token_customer_id :customer_id,
				token_order_id : order_id
			}
		
	}

	console.log(myJson);

	$.post( "https://admin.acxede.mx/api/v1/guest/venta/guardar", myJson, function(data) {
		console.log('Hurray!!!... se ejecuto el ajax')
		console.log("esto me trae el response", data);

		$('#pdfDescarga').attr('href', data['invoice_url']);
	} );





	/*
		var passengers = new Object();

	for(var j=0; j<listaCompras.length; j++){
		if(listaCompras[j]['activo']==1)
			if(listaCompras[j]['tipoViaje']==1){
				var travel = new Object();
				travel['route_id'] = listaCompras[j]['route_id'];
				travel['schedule_departure_id'] = listaCompras[j]['hora'];
				travel['departure_date'] = listaCompras[j]['departure_date'];
				travel['departure_time'] = listaCompras[j]['departure_time'];

				passengers[listaCompras[j]['asiento']] = new Object();
				passengers[listaCompras[j]['asiento']]['price_id'] = listaCompras[j]['tipoBoleto'];
				passengers[listaCompras[j]['asiento']]['travel'] = new Object();
				passengers[listaCompras[j]['asiento']]['travel'] = travel;


				travels[0]['passengers'][listaCompras[j]['asiento']] = new Object();
				travels[0]['passengers'][listaCompras[j]['asiento']]['price_id'] = listaCompras[j]['tipoBoleto'];
				travels[0]['passengers'][listaCompras[j]['asiento']]['travel'] = new Object();
				travels[0]['passengers'][listaCompras[j]['asiento']]['travel'] = travel;
			}
	}

	console.log(travels);

	travels[1] = new Object();
	travels[1]['passengers'] = new Object();
	var passengersV = new Object();

	for(var j=0; j<listaCompras.length; j++){
		if(listaCompras[j]['activo']==1)
			if(listaCompras[j]['tipoViaje']==2){

				var travel = new Object();
				travel['route_id'] = listaCompras[j]['route_id'];
				travel['schedule_departure_id'] = listaCompras[j]['hora'];
				travel['departure_date'] = listaCompras[j]['departure_date'];
				travel['departure_time'] = listaCompras[j]['departure_time'];
			

				passengersV[listaCompras[j]['asiento']] = new Object();
				passengersV[listaCompras[j]['asiento']]['price_id'] = listaCompras[j]['tipoBoleto'];
				passengersV[listaCompras[j]['asiento']]['travel'] = new Object();
				passengersV[listaCompras[j]['asiento']]['travel'] = travel;

				travels[1]['passengers'][listaCompras[j]['asiento']] = new Object();
				travels[1]['passengers'][listaCompras[j]['asiento']]['price_id'] = listaCompras[j]['tipoBoleto'];
				travels[1]['passengers'][listaCompras[j]['asiento']]['travel'] = new Object();
				travels[1]['passengers'][listaCompras[j]['asiento']]['travel'] = travel;
			}
	}
	
	const myJson = {
				travels: [{
					passengers,
				},
				{
					passengersV
				}
					
				],
				invoice: 
					{
						comission: comisionCompraGen,
						total: totalCompraGen,
						payed_by: $("#txtNombre").val(),
						payed_by_email: $("#txtEmail").val(),
						payed_by_phone: $("#txtTelefono").val(),
						token_conekta : token,
						token_customer_id :customer_id,
						token_order_id : order_id
					}
				
	}

	const myJson2 = {
		travels,
		invoice: 
			{
				comission: comisionCompraGen,
				total: totalCompraGen,
				payed_by: $("#txtNombre").val(),
				payed_by_email: $("#txtEmail").val(),
				payed_by_phone: $("#txtTelefono").val(),
				token_conekta : token,
				token_customer_id :customer_id,
				token_order_id : order_id
			}
		
	}

	console.log(myJson);
	console.log(myJson2);
	*/

	//console.log(myJson);
	//console.log(JSON.stringify(Object.assign({},listCompraFinal['travels'][0]['travel'])));
	//console.log(listCompraFinal);
	//console.log(JSON.stringify(listCompraFinal));
	//console.log(JSON.stringify(Object.assign({},listCompraFinal)));

	//console.log(JSON.stringify(Object.assign({},listCompraFinal['invoice'])));

	//JSON.stringify(listCompraFinal, JSON.stringify(invoice))
	//alert(JSON.stringify(Object.assign({},listCompraFinal)));
	
}



function existenFechas(listaFechaCompras,fecha,hora){
	for(var j=0; j<listaFechaCompras.length; j++){
		//alert(asientoB.toLowerCase()+" "+$("#Fase-ListAsientosIdaN .Fase-ItemAsiento").eq(j).html().toLowerCase());
		if(listaFechaCompras[j]['fecha']==fecha && listaFechaCompras[j]['hora']==hora){
			return true;
		}			
	}

	return false;
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