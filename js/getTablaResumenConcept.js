function llamadaAjax(modo) {
    $.ajax({
        type : "GET",
        dataType : "xml",
        url : "http://10.72.47.113:7001/dashboard/getTablaResumen?mode="+modo,
        //url : "archivos/getTablaResumen.xml",
        cache:false,
        async : true, // blocks window close
        timeout: 120000, // sets timeout to 120 seconds
        success : function(xml) {
            $('#example tbody').empty();

            $(xml).find('PerformaceProveedor').each(
                function() {
                    var proveedor = $(this).find('proveedor').text();
                    var idProveedor = $(this).find('idroveedor').text();

                    var ticketsHoy = $(this).find('ticketsHoy').text();
                    var colorTicketsHoy = $(this).find('colorTicketsHoy')
                    .text();

                    var diasPromedio = $(this).find('diasPromedio').text();
                    var colorDiasPromedio = $(this).find(
                        'colorDiasPromedio').text();

                    var diasMaxAntiguo = $(this).find('diasMaxAntiguo')
                    .text();
                    var colorDiasMaxAntiguo = $(this).find(
                        'colorDiasMaxAntiguo').text();

                    var ticketsDosHoras = $(this).find('ticketsDosHoras')
                    .text();
                    var colorTicketsDosHoras = $(this).find(
                        'colorTicketsDosHoras').text();

                    var ticketBacklog = $(this).find('ticketBacklog')
                    .text();
                    var colorTicketBacklog = $(this).find(
                        'colorTicketBacklog').text();

                    $("#contenidoTabla").append(
                        '<tr data-proveedor="' + proveedor
                        + '" ><td class="empresa">' + proveedor
                        + '</td><td data-i="1"><div class="' + colorTicketsHoy
                        + '"> '+ ticketsHoy+'</div>'
                        + '</td><td data-i="2" > <div  class="'+colorDiasPromedio+'">'
                        + diasPromedio + '</div></td> <td data-i="3"> <div class="'
                        + colorDiasMaxAntiguo
                        + '">' + diasMaxAntiguo
                        + '</div></td><td data-i="4"><div class="'
                        + colorTicketsDosHoras
                        + '" >' + ticketsDosHoras
                        + '</div></td><td data-i="5"><div class="'
                        + colorTicketBacklog + '">'
                        + ticketBacklog + '</div></td></tr>').fadeIn(
                        'slow');

                });
            $('td').attr('data-toggle', 'modal');
            $('td').attr('data-target', '#myModal');
            $('td.empresa').removeAttr('data-toggle', 'modal');
            $('td.empresa').removeAttr('data-target', '#myModal');
            AjaxInfoGeneral();
            $('button.refresh').text('Refrescar');



            $("#contenidoTabla tr .verde").animate({
                "background-color" : "#5cb85c"
            });

            $("#contenidoTabla tr .amarillo").animate({
                "background-color" : "#f0ad4e"
            });

            $("#contenidoTabla tr .rojo").animate({
                "background-color" : "#d9534f"
            });
            /*
			 * $("#contenidoTabla tr .verde").animate({ "background-color" :
			 * "#5cb85c" }, function() { $("#contenidoTabla tr
			 * .amarillo").animate({ "background-color" : "#f0ad4e" },
			 * function() { $("#contenidoTabla tr .rojo").animate({
			 * "background-color" : "#d9534f" });
			 * 
			 * });
			 * 
			 * });
			 */

        },

        beforeSend : function() {

        },

        error : function() {
            alert("Error al conectar con el servicio JSP");
        }
    });
};