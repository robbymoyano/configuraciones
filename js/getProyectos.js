function getProyectos(){
	/*
	* Autor: Robby Moyano
	* Date: Agosto 2017
	* https://github.com/robbymoyano
	*/
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: "data/proyectos.xml",
		cache:false,
		async: false,
		success: function(xml){
			$(xml).find('proyecto').each(function(){
				var name = $(this).find('name').text();
				var dateStart = $(this).find('dateStart').text();
				var dateEnd = $(this).find('dateEnd').text();
				var label = $(this).find('label').text();

				var work = $(this).find('work').text();
				var completado = $(this).find('completado').text();


				var ini=Date.UTC(dateStart.substr(0,4),dateStart.substr(4,2)-1,dateStart.substr(6,2));
				var fin=Date.UTC(dateEnd.substr(0,4),dateEnd.substr(4,2)-1,dateEnd.substr(6,2));
				var myInterval = { from:ini, to: fin,label:label };
				var arreglo=[myInterval];
				var myTask={name:name, intervals:arreglo};
				console.info(myTask);
				tasks.push(myTask);
				mapComplete.push(completado);
				mapWork.push(work);
				categories.push('');
			});

			mapWork.reverse();
			mapComplete.reverse();

			$(xml).find('categoria').each(function(){
				var name = $(this).find('name').text();
				var size = parseInt($(this).find('size').text());
				var color = $(this).find('color').text();
				var myLabel={label:{text:name},color:"#"+color,from:0,to:0,zIndex:-4,size:size };
				plotBands.push(myLabel);
			});

			plotBands.reverse();
			var acumulado=0;
			for(var i=0;i<plotBands.length;i++){
				var desde=acumulado-0.5;
				acumulado=acumulado+plotBands[i].size;
				var hasta=acumulado-0.5;
				plotBands[i].from=desde;
				plotBands[i].to=hasta;
			}

			plotBands.reverse();
			console.info(plotBands);

			$(xml).find('proyectos').each(
				function() {
					var mifecha = $(this).attr("min");
					minYYYY=parseInt(mifecha.substr(0,4));
					minMM=parseInt(mifecha.substr(4,2));
					minDD=parseInt(mifecha.substr(6,2))-10;
				});

			$(xml).find('proyectos').each(
				function() {
					var mifecha = $(this).attr("max");
					maxYYYY=parseInt(mifecha.substr(0,4));
					maxMM=parseInt(mifecha.substr(4,2));
					maxDD=parseInt(mifecha.substr(6,2))+3;
				});

		},

		beforeSend: function () {
		},

		error:function(){
			alert("Error al extraer los datos");
		}
	});
};