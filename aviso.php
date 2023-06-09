<!doctype html>
<html>
    <head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Pago exitoso</title>
        <link rel="shortcut icon" href="favicon.png" />
        <link href="css/reset.css" rel="stylesheet" type="text/css">
        <link href="css/fonts.css" rel="stylesheet" type="text/css">
        <link href="css/utilidades.css" rel="stylesheet" type="text/css">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href="css/animations.css" rel="stylesheet" type="text/css">
        <link href="css/responsive.css" rel="stylesheet" type="text/css">

        <!-- HTML 5 for older browsers -->
		<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
		<!--[if lt IE 9]>
			<script src="js/html5.js"></script>
		<![endif]-->

        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="https://js.openpay.mx/openpay.v1.min.js"></script>
        <script type='text/javascript' src="https://js.openpay.mx/openpay-data.v1.min.js"></script>
        <script type="text/javascript" src="js/sweetalert.min.js"></script>
        <script type="text/javascript" src="js/menu.js"></script>

        <script type="text/javascript">
            $(document).ready(function()
            {
                $.ajax({
                    data	: {	customer_id:localStorage.getItem('customer_id'),transccion_id: '<?php echo $_GET['id']?>'},
                    type	: "post",
                    dataType: "json",
                    url: "http://3.212.162.49/validarPago",
                    success	: function(Respuesta)
                    {
                        if(Respuesta['status']=="completed")
                        {
                            $.ajax({
                                data	: {	order_pago_id:localStorage.getItem('order_pago_id'),customer_id:localStorage.getItem('customer_id'),order_id:localStorage.getItem('order_id'),token:localStorage.getItem('token')},
                                type	: "post",
                                dataType: "json",
                                url: "http://3.212.162.49/actualizarStatus",
                                success	: function(Respuesta)
                                {
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                    console.log(XMLHttpRequest+" - "+textStatus+" "+errorThrown);
                                }
                            }).fail( function( jqXHR, textStatus, errorThrown ) {
                                console.log(jqXHR+" "+textStatus+" "+errorThrown);
                            });
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        console.log(XMLHttpRequest+" - "+textStatus+" "+errorThrown);
                    }
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                    console.log(jqXHR+" "+textStatus+" "+errorThrown);
                });
            });
        </script>
    </head>

    <body class="fadeIn u-textCenter">
        <section class="slider">
            <div class="Fase-Item Fase-Item--4">
                <div class="Fase-Center u-inline-block u-textCenter u-box-sizing">
                    <div class="Fase-ContentFase4 u-inline-block u-textCenter">
                        <h2 class="Fase-TitleFase3"><strong>¡Su pago fue realizado con éxito!</strong>
                    </div>
                </div>
            </div>
        </section>
    </body>
</html>
