// dicionário implementado com árvore PATRICIA
// Alunos: Hugo Alvares, Artur Xiol, Marco Aurélio

var patricia = {

	arvore3000 : {},
	arvore250 : {},
	dicionarioAtualIngles : {},
	dicionarioAtualPortugues : {},

	// constrói árvore patricia de acordo com tabela dada no pdf
	populaArvorePatricia : function(){
		dicionario.constroiDicionarios();
		var arrayIngles3000 = dicionario.arrayIngles3000;
		var arrayIngles250 = dicionario.arrayIngles250;
		var elementoAtual;
		for (var idx in arrayIngles3000) {
			elementoAtual = arrayIngles3000[idx];
			patricia.insereNaArvore(elementoAtual, patricia.arvore3000);
		}
		for (var idx in arrayIngles250) {
			elementoAtual = arrayIngles250[idx];
			patricia.insereNaArvore(elementoAtual, patricia.arvore250);
		}
	},

	// função inspirada nos seguintes links: (todo o resto do código é de autoria própria)
	// http://stackoverflow.com/questions/28448100/how-does-one-build-a-radix-tree-in-javascript
    // http://stackoverflow.com/questions/28534473/how-can-i-read-this-radix-tree-structure-to-determine-next-string-probability
	insereNaArvore : function(texto, arvore){
		if (texto.length == 0) {
			return {};
		} else {
			var ch = texto[0]; // pega o primeiro caracter
			if(!arvore[ch]) { // cria um novo nodo
				arvore[ch] = {valor:ch,filhos:{}};
			}
			var substr = texto.substring(1); // remove o primeiro caracter
			if(substr) { // repete para o resto da palavra
				arvore[ch].filhos = patricia.insereNaArvore(substr,arvore[ch].filhos)
			}
			return arvore;
		}
	},

	// função disparada automaticamente quando uma letra é digitada
	procura : function(texto){
		// zera o campo de resultados
		$('.resultBox').val('');

		// valida para evitar erros caso o usuário apague tudo
		if (texto.length > 0) {

			// inicia a busca pela árvore de 250 elementos
			var arvore = patricia.arvore250;
			arvore = patricia.trataFormatoArvore(texto, arvore);

			// valida se nível ainda existe na árvore de 250 elementos
			if (arvore != undefined) {

				// define dicionário atual
				patricia.dicionarioAtualIngles = dicionario.arrayIngles250;
				patricia.dicionarioAtualPortugues = dicionario.arrayPortugues250;

				// constroi todas as possibilidades na arvore de 250 elementos
				patricia.constroiPossibilidades(texto, arvore['filhos'], '');
			} else {

				// define dicionário atual
				patricia.dicionarioAtualIngles = dicionario.arrayIngles3000;
				patricia.dicionarioAtualPortugues = dicionario.arrayPortugues3000;

				// constroi todas as possibilidades na arvore de 3000 elementos
				arvore = patricia.arvore3000;
				arvore = patricia.trataFormatoArvore(texto, arvore);
				patricia.constroiPossibilidades(texto, arvore['filhos'], '');
			}
		}
	},

	// trata formato da arvore
	trataFormatoArvore : function(texto, arvore) {
		if (texto.length > 1) {
			// caso o tamanho do texto a pesquisar seja maior que um,
			// é necessário posicionar a árvore na altura certa
			var posInicial = texto.split("");
			var textoParaPosicionar = texto.substr(1);
			arvore = patricia.vaiPraPosicaoNaArvore(textoParaPosicionar, arvore[posInicial[0]]);
		} else {
			// caso seja somente uma letra, posiciona a árvore de outro modo
			arvore = arvore[texto];
		}
		return arvore;
	},

	// função utilizada para ir para a altura certa na árvore
	vaiPraPosicaoNaArvore : function(texto, arvore){
		var arrayPalavra = texto.split("");
		for (var idx = 0; idx < arrayPalavra.length; idx++) {
			if (arvore == undefined) {
				return undefined;
			} else {
				arvore = arvore['filhos'][arrayPalavra[idx]];
			}
		}
		return arvore;
	},

	// função recursiva para construir todas as possibilidades a partir de um ponto da árvore
	constroiPossibilidades : function(string, arvore, letraAnterior){
		string += letraAnterior;

		// valida se existem elementos filhos
		if (!($.isEmptyObject(arvore))) {
			// se posição da árvore tiver filhos, continua a construção das possibilidades
			for (var idx in arvore) {
				patricia.constroiPossibilidades(string, arvore[idx]['filhos'], arvore[idx]['valor']);
			}
		} else {
			// coloca a possível palavra na tela
			var traducao = patricia.dicionarioAtualPortugues[patricia.dicionarioAtualIngles.indexOf(string)];
			$('.resultBox').val($('.resultBox').val() + string + ' - ' + traducao + '\n');
		}
	}

}