function listarTickets(proveedor, indicador){
    $.ajax({
        type: "GET",
        dataType: "xml",
        data:{
            grupo:proveedor,
            indicador:indicador
        },
        url: "ListarTicketsProveedor",
        cache:false,
        async: false, //blocks window close
        success: function(xml){
            $(xml).find('ticket').each(function(){
                var id = $(this).find('id').text();
                                var idSmall = $(this).find('idSmall').text();

                var idGrupo = $(this).find('idgrupo').text();
                var fechaapertura = $(this).find('fechaapertura').text();
                var estado = $(this).find('estado').text();

                $("#contenidoTablaTicket").append('<tr><td><span class="hidden-xs">'+id+'</span><span class="visible-xs">'+idSmall+'</span></td><td>'+fechaapertura+'</td><td>'+estado+'</td><td>'+idGrupo+'</td></tr>');
                
             //     $("#contenidoTablaTicket").append('<tr><td>'+id+'</td><td>'+fechaapertura+'</td><td>'+estado+'</td><td>'+idGrupo+'</td></tr>');

            });
            descripcion=$(xml).find('descripcion').text();
            // $("#mensaje").css('display','none');
            // $(".refresh").delay(500).fadeIn();
        },

        beforeSend: function () {
            //  $("#mensaje").css('display','block');
        },

        error:function(){
            alert("Error al conectar con el servicio JSP");
        }

    });
};