console.log("fala tu");
var codigo = 0;

if(document.getElementById('cadastro') != null){
	document.getElementById('cadastro').addEventListener('submit', cadastrar);
}else if (document.getElementById('corpo') != null){
	mostrarTarefa();
}

function cadastrar(e){

	var opcao = document.getElementById('exampleFormControlSelect11').value;
	var necessidade = document.getElementById('exampleFormControlSelect1').value;
	var titulo = document.getElementById('exampleFormControlInput1').value;
	var descricao = document.getElementById('exampleFormControlTextarea1').value;
	var date = new Date();

	if(titulo == "" ){
		alert("Preencha todos os campos!");
		return false;
	}else if(localStorage.getItem('banco') != null ){
		console.log('kkkk4');
		var tarefas = JSON.parse(localStorage.getItem('banco'));
		for(var i = 0; i < tarefas.length; i++){
			var teste = tarefas[i].tituloTarefa;
			console.log(teste + titulo);
		 	if(titulo == teste){
			  alert("Já existe um card com esse titulo");
			  return false;
		  }
		}
	}

	if(opcao == "Tarefa"){
		var tarefa = {
			tituloTarefa: titulo,
			descricaoTarefa: descricao,
			necessidadeTarefa: necessidade,
			dia: date.getDate(),
			mes: date.getMonth()+1,
			codigoTarefa: codigo+1,
			status: false
		};
		console.log("é sim");
	}else{
		console.log("n é");
	}

if(localStorage.getItem('banco') === null){
		var tarefas = [];
		tarefas.push(tarefa);
		localStorage.setItem('banco', JSON.stringify(tarefas));
	} else {
		var tarefas = JSON.parse(localStorage.getItem('banco'));
		tarefas.push(tarefa);
		localStorage.setItem('banco', JSON.stringify(tarefas));
	}

	document.getElementById('cadastro').reset();

	mostrarTarefa();

	e.preventDefault();
}

function removeCard(titulo){
	var tarefas = JSON.parse(localStorage.getItem('banco'));
	console.log(tarefas);
	
	 for(var i = 0 ; i < tarefas.length; i++){
		if(tarefas[i].tituloTarefa == titulo){
			tarefas.splice(i, 1);
		}
	}

	localStorage.setItem('banco', JSON.stringify(tarefas));

	mostrarTarefa();
}

function aumentarTarefa(titulo){
	var tarefas = JSON.parse(localStorage.getItem('banco'));
	var aumentartarefaResultado = document.getElementById('aleatorio');
	
	console.log("entrei");

	aumentartarefaResultado.innerHTML = '';
	

	for(var i = 0; i < tarefas.length; i++){
		if(tarefas[i].tituloTarefa == titulo){
		var titulo = tarefas[i].tituloTarefa;
		var descricao = tarefas[i].descricaoTarefa;
		//var numero = tarefas[i].codigoTarefa;
		var dia = tarefas[i].dia;
		var mes = tarefas[i].mes;
		var status = tarefas[i].status;
		var stats;
		if(status == false){
			stats = "Pendente"
		}else{
			stats = "Concluido"
		}
		console.log(titulo);
		aumentartarefaResultado.innerHTML += '<div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" ' +
		'aria-labelledby="TituloModalCentralizado" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document">' + 
		'<div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="TituloModalCentralizado">' +	titulo +
		'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>' +
		'</div><div class="modal-body">'+ '<b>Descrição: </b>' + descricao + '<br/>' + '<b>Status: </b> ' + stats +'</div><div class="modal-footer"></div></div></div></div>';
		}
	}
}

function concluirTarefa(titulo){
	console.log("tamo concluindp")
	var tarefas = JSON.parse(localStorage.getItem('banco'));
	for(var i = 0; i < tarefas.length; i++){
		if(tarefas[i].tituloTarefa == titulo){
			tarefas[i].status = true;
			console.log(tarefas[i].tituloTarefa);
			console.log(tarefas[i].status);
	 		document.getElementById(titulo).style.backgroundColor = "#00800052";
		}
	}

	localStorage.setItem('banco', JSON.stringify(tarefas));
}

function mostrarTarefa(){
	var tarefas = JSON.parse(localStorage.getItem('banco'));
	var tarefaResultado = document.getElementById('corpo');
	

	tarefaResultado.innerHTML = '';
	

	for(var i = 0; i < tarefas.length; i++){
		var titulo = tarefas[i].tituloTarefa;
		var descricao = tarefas[i].descricaoTarefa;
		//var numero = tarefas[i].codigoTarefa;
		var dia = tarefas[i].dia;
		var mes = tarefas[i].mes;
		var status = tarefas[i].status;
		if(tarefas[i].necessidadeTarefa == 0){
			if(status == true){
				tarefaResultado.innerHTML += '<tr id="'+ titulo +'" style="background-color: #00800052"><th scope="row">' + titulo + '</td><td>' + dia + '/' + mes + '</td><td>' +
				'<button type="button" class="btn btn-success" onclick="concluirTarefa(\''+ titulo +'\')">Concluir</button>' +
				'<button type="button" class="btn btn-info" data-toggle="modal" onclick="aumentarTarefa(\''+ titulo +'\')" data-target="#ExemploModalCentralizado" id="visualizar">Vizualizar</button>' +
				'<button type="button" class="btn btn-danger" onclick="removeCard(\''+ titulo +'\')">Excluir</button>' + 
				'</td></tr>';
			}else{
				tarefaResultado.innerHTML += '<tr id="'+ titulo +'" ><th scope="row">' + titulo + '</td><td>' + dia + '/' + mes + '</td><td>' +
				'<button type="button" class="btn btn-success" onclick="concluirTarefa(\''+ titulo +'\')">Concluir</button>' +
				'<button type="button" class="btn btn-info" data-toggle="modal" onclick="aumentarTarefa(\''+ titulo +'\')" data-target="#ExemploModalCentralizado" id="visualizar">Vizualizar</button>' +
				'<button type="button" class="btn btn-danger" onclick="removeCard(\''+ titulo +'\')">Excluir</button>' + 
				'</td></tr>';
			}
		}else if(tarefas[i].necessidadeTarefa == 1){
			if(status == true){
				tarefaResultado.innerHTML += '<tr id="'+ titulo +'" style="background-color: #00800052; color:red;"><th scope="row">' + titulo + '</td><td>' + dia + '/' + mes + '</td><td>' +
				'<button type="button" class="btn btn-success" onclick="concluirTarefa(\''+ titulo +'\')">Concluir</button>' +
				'<button type="button" class="btn btn-info" data-toggle="modal" onclick="aumentarTarefa(\''+ titulo +'\')" data-target="#ExemploModalCentralizado" id="visualizar">Vizualizar</button>' +
				'<button type="button" class="btn btn-danger" onclick="removeCard(\''+ titulo +'\')">Excluir</button>' + 
				'</td></tr>';
			}else{
					tarefaResultado.innerHTML += '<tr id="'+ titulo +'" style="color:red;"><th scope="row">' + titulo + '</td><td>' + dia + '/' + mes + '</td><td>' +
			'<button type="button" class="btn btn-success" onclick="concluirTarefa(\''+ titulo +'\')" >Concluir</button>' +
			'<button type="button" class="btn btn-info" data-toggle="modal" data-target="#ExemploModalCentralizado" id="visualizar">Vizualizar</button>' +
			'<button type="button" class="btn btn-danger" onclick="removeCard(\''+ titulo +'\')">Excluir</button>' + 
			'</td></tr>';
				}
			

	}

}

}
