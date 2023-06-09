
			var listCanales = new Array();
			
			$(document).ready(function() 
      		{
				ObtenerListaDeCanales('https://pastebin.com/raw/ffGsL3m0');

				//<![CDATA[
					jwplayer('reproductor').setup({
						//URL m3u8 que queremos reproducir
						file: "http://aztkhlslive-i.akamaihd.net/hls/live/572724/az7/master.m3u8",
						width: "700",
						skin: "five",
						height: "400",
						title: 'Tuintertv',
						image: "",
						logo: {
						file: "",
						position: 'top-right',
						margin: '0',
						link: ""
						},
						stretching: "fill",
						autostart: "true",
						abouttext: '',
						aboutlink: '',
					});
				// ]]>


				setTimeout(function()						
				{
					$(".Header-Logo").addClass("fadeIn");
				}, 500);
				
				setTimeout(function()						
				{
					$(".Header-Text1").addClass("slideLeft");
				}, 600);
				
				setTimeout(function()						
				{
					$(".Header-Text2").addClass("slideLeft");
				}, 900);

				setTimeout(function()						
				{
					$(".Header-Form").addClass("slideUp");
				}, 1100);
            });
			
			//Animaciones
			$(window).scroll(function() 
			{					
				$('.aparecerSlideUp').each(function()
		  		{
				 	var altura = $(this).offset().top-500;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("slideUp");		  
				 });
				 
				 $('.aparecerSlideDown').each(function()
		  		{
				 	var altura = $(this).offset().top-500;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("slideDown");		  
				 });	
				  	
				$('.aparecerRight').each(function()
		  		{
				 	var altura = $(this).offset().top-500;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("slideRight");		  
		  		});	
				
				$('.aparecerSlideLeft').each(function()
		  		{
				 	var altura = $(this).offset().top-500;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("slideLeft");		  
		  		});	
				
				$('.aparecerFadeIn').each(function()
		  		{
				 	var altura = $(this).offset().top-500;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("fadeIn");		  
				});	
				  
				$('.aparecerFadeIn2').each(function()
		  		{
				 	var altura = $(this).offset().top-600;						
				   	var topOfWindow = $(window).scrollTop();
		   
			 		if (topOfWindow > altura) 
						$(this).addClass("fadeIn");		  
		  		});	  
			});

			function ObtenerListaDeCanales(urlCanales) {
				$.ajax(
				{
					url			: "obtenerCanales.php",
					data		: {
									url: urlCanales
								},
					type		: "POST",
					dataType	: 'json',
					success		: function(Respuesta)
					{
						//alert(Respuesta);
						//alert(Respuesta.length);

						listCanales = Respuesta['list']['item'];
						//alert(listCanales.length);

						//listCanales = Respuesta;

						//alert(listCanales.length);
						$(".ListReproductor").html("");

						var canal = "";

						for(var j=0; j < listCanales.length; j++)
						{
							if(j>-1) {	
								canal+="<li>";
								canal+="<a onclick=\"cambiarVideo('"+listCanales[j]['media_url']+"')\" class='u-inline-block'>";
								canal+="<figure class='u-inline-block u-imagenFondoCover' style=\"background-image: url('"+listCanales[j]['thumb_square']+"');\"></figure>";
								canal+="<h3 class='u-inline-block u-efecto'>"+listCanales[j]['title']+"</h3>";
								canal+="</a>";
								canal+="</li>";
							}	
							
							//alert(listCanales[j]['title']);	
						}
						$(".ListReproductor").append(canal);

						$(".ListReproductor li").each(function(w)
						{
							$(this).click(function()
							{
								$(".ListReproductor li").removeClass('activo');
								$(this).addClass('activo');		
							});
						});
					}
				});
			}


			function cambiarVideo(url){
				jwplayer('reproductor').setup({
					//URL m3u8 que queremos reproducir
					file: url,
					width: "700",
					skin: "five",
					height: "400",
					title: 'Tuintertv',
					image: "",
					logo: {
					file: "",
					position: 'top-right',
					margin: '0',
					link: ""
					},
					stretching: "fill",
					autostart: true,
					abouttext: '',
					aboutlink: '',
				});
			}

