function llamadaAjax() {
    $.ajax({
        type : "GET",
        dataType : "xml",
        url : "getTablaResumen",
        cache:false,
        async : true, // blocks window close
        timeout: 120000, // sets timeout to 120 seconds
        success : function(xml) {
            $('#example tbody').empty();

            $(xml).find('PerformaceProveedor').each(
                function() {
                    var proveedor = $(this).find('proveedor').text();
                    var idProveedor = $(this).find('idProveedor').text();

                    var ticketsHoy = $(this).find('ticketsHoy').text();
                   
					var n = $(this).find('valores').text().split(",");
                    var c = $(this).find('colores').text().split(",");

					// c[0]

					
                    $("#contenidoTabla").append(
                        '<tr data-proveedor="' + proveedor
                        + '" ><td class="empresa"> <a href="ViewProveedor.jsp?proveedor='+proveedor+'&id='+idProveedor+'" target="_self">' + proveedor
                        + '</td><td data-i="1"><div class="' +  c[0]
                        + '"></div>' + n[0]
                        + '</td><td data-i="2" > <div  class="'+ c[1]+'"></div>'
                        + n[1] + '</td> <td data-i="3"> <div class="'
                        +  c[2]
                        + '"></div>' + n[2]
                        + '</td><td data-i="4"><div class="'
                        +  c[3]
                        + '" ></div>' + n[3]
                        + '</td><td data-i="5"><div class="'
                        +  c[4] + '"></div>'
                        + n[4] + '</td></tr>').fadeIn(
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


