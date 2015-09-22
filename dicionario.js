// dicionário implementado com árvore PATRICIA
// Alunos: Hugo Alvares, Artur Xiol, Marco Aurélio

var dicionario = {

	arrayIngles3000 : [],
	arrayPortugues3000 : [],
	arrayIngles250 : [],
	arrayPortugues250 : [],

	constroiDicionarios : function() {
		dicionario.montaTabela3000();
		dicionario.montaTabela250();
	},

	montaTabela3000 : function() {
		var tabela = $('.tabela3000 td');
		dicionario.arrayIngles3000 = dicionario.constroiArray3000(tabela[0].innerHTML);
		dicionario.arrayPortugues3000 = dicionario.constroiArray3000(tabela[1].innerHTML);
	},

	constroiArray3000 : function(str){
		var array = str.split('<br>');
		var currentObject;
		var newArray = [];
		for (var idx in array) {
			currentObject = array[idx];
			currentObject = currentObject.substr(currentObject.indexOf(' ') + 1);
			if (currentObject != "") {
				newArray.push(currentObject);
			}
		}
		return newArray;
	},

	montaTabela250 : function() {
		var tabela = $('.tabela250');
		dicionario.constroiArray250(tabela);
	},

	// função inspirada no exemplo do link abaixo (todo o resto é criação própria)
	// http://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
	constroiArray250 : function(table) {
	    var arrayIngles = [];
	    var arrayPortugues = [];
	    var temp;
	    var stringIngles;
	    var stringPortugues;
	    table.find('tr').each(function (rowIndex, r) {
	        temp = $(this).find('th,td');
	        stringIngles = temp[0].innerHTML.substr(5);
	        stringPortugues = temp[1].innerHTML.substr(5);

	        // insere no dicionario
            arrayIngles.push(stringIngles);
            arrayPortugues.push(stringPortugues);
	    });

	    // retira a primeira linha (lixo)
	    arrayIngles.shift();
	    arrayPortugues.shift();
	    dicionario.arrayIngles250 = arrayIngles;
		dicionario.arrayPortugues250 = arrayPortugues;
	}

}