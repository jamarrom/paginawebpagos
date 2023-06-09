	var seleccion_menu = true;

	$(document).ready(function()
	{
		$(".MainMenu-ItemList").click(function()
		{
			$(".MainMenu-List").addClass("MenuAlterno-Ocultar");
			seleccion_menu=true;
		});

	   	$(".MainMenu-IcoMenu").click(function()
		{
			if(seleccion_menu)
			{  
				$(".MainMenu-List").css({"display": "inline-block"},250);
				$(".MainMenu-List").removeClass("MenuAlterno-Ocultar");
				seleccion_menu=false;
			}
			else
			{
				$(".MainMenu-List").addClass("MenuAlterno-Ocultar");
				seleccion_menu=true;
			}
		});
	});