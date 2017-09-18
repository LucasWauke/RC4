// --------------------
//    Algoritmo RC4
// --------------------
// https://www.youtube.com/watch?v=G3HajuqYH2U

window.onload = function(){
	document.getElementById('criptografar').addEventListener('click', cripto); 
	document.getElementById('descriptografar').addEventListener('click', descripto);

	//----------- funcoes -----------

	// --- funcoes principais

	// faz um xor entre a mensagem e o keystream
	function cripto(){
		mensagemBin = arrayTextoParaBin(document.getElementById('mensagem').value.split(''));
		outputPrgaBin = arrayAsciiParaBinario(prga());

		document.getElementById('cripto').value = xor(joinESplit(mensagemBin), joinESplit(outputPrgaBin)).join('');	
	}

	// faz um xor da keystream com texto cifrado
	function descripto(){
		if( document.getElementById('cripto').value.length > 0){
			cifradoBin = arrayTextoParaBin(document.getElementById('cripto').value.split(''));
			outputPrgaBin = arrayAsciiParaBinario(prga());

			document.getElementById("descripto").value = xor(joinESplit(cifradoBin), joinESplit(outputPrgaBin)).join('');
		}
		else { alert('Gerar texto cifrado ')};
	}

	// o intuito dessa funcao e fazer um array de 256 bits embaralhados
	function ksa(){
		//inicia um array que sera de 0 a 256
		var s = [];
		// inicia um array que sera uma repeticao da chave ate 256 caracteres
		var chaveArray = [];
		//pega o valor da campo da chave
		var chave = document.getElementById('chave').value.split('');
		//contador para nao dar index out of bound na chave
		var cont = 0;

		// popula os arrays; converte os caracteres da chave em asc e os repete ate 256
		for(var i = 0; i < 256; i++){
			if (i % chave.length == 0 && i !=0 ) { cont = 0}
			chaveArray.push(textoParaAscii(chave[cont]));
			s.push(i);
			cont++;
		}

		// embaralha vetor de 256 numeros trocando a posicao de i com uma posicao gerada
		// aleatoriamente com uma conta envolvendo o numero da iteracao da chaveArray
		var j = 0;
		for(var i = 0; i < 256; i++){
			j = ( j + s[i] + chaveArray[i]) % 256;		
			var temp = s[i];
			s[i] = s[j]; 
			s[j] = s[i];
		}
		return s;
	}

	// o intuito dessa funcao e gerar um array do tamanho da mensagem
	// com numeros pseudo-aleatorios
	function prga(){
		var mensagem = document.getElementById('mensagem').value.split('');
		var s = ksa();
		var i = 0;
		var j = 0;
		var output = [];
		// o j ira somar com um valor aleatorio e recebra o resto de divisao desse com 256
		// depois o elemento de s da posicao j ira trocar com i, para embaralhar mais o array s
		// output ira receber o elemento de s que esta na posicao de s[j] + s[i] % 256
		// isso ira gerar uma sequencia de numeros pseudo-aleatorios chamados keystream, o qual sera feito
		// um xor com a mensagem original para gerar um texto criptografado
		for(var k = 0; k < mensagem.length; k++){
			i = (i + 1) % 256;
			j = (j + s[i]) % 256;
			var temp = s[i];
			s[i] = s[j];
			s[j] = s[i];
			output[k] = s[((s[i] + s[j]) % 256)];
		}
		return output;
	}

	// --- funcoes auxiliares logicas

	// faz o xor para criptografar ou descriptografar
	function xor(binarioUm, binarioDois){
		var auxCifrado = [];
		var cifrado =[];
		var bin = [];		
		for (var i = 0; i <= binarioUm.length; i++) {
			if ( i % 8 == 0 && i != 0){
				bin.splice(0,8,ascParaTexto(binarioParaAscii(bin.join(''))));
				cifrado.push(auxCifrado.concat(bin));
				bin = [];
			}
			bin.push(binarioUm[i] ^ binarioDois[i]);			
		}
		return cifrado;
	}

	// funcao que converte array de caracteres em array de binario
	function arrayTextoParaBin(vetorInput){
		var vetorOutput = []
		for (var i = 0 ; i < vetorInput.length ; i++) {
			var bin = asciiParaBinario(textoParaAscii(vetorInput[i]));
			bin.length < 8 ? vetorOutput.push('0'.repeat( 8 - bin.length ) + bin) : vetorOutput.push(bin);
		}
		return vetorOutput;
	}

	// converte array de asc para um de binario
	function arrayAsciiParaBinario(vetorInput){
		var vetorOutput = [];
		for(var i = 0; i < vetorInput.length; i++){
			var bin = asciiParaBinario(vetorInput[i]);
			bin.length < 8 ? vetorOutput.push('0'.repeat( 8 - bin.length ) + bin) : vetorOutput.push(bin);
		}
		return vetorOutput;
	}

	// Fiz para poder separar os arrays de binarios e transformar em um so
	function joinESplit(vetor){
		var aux = vetor.join('');		
		return aux.split('');
	}

	// --- funcoes auxiliares de conversao

	// converte char para ascII
	function textoParaAscii(texto){ return texto.charCodeAt(0);	}

	// converte o codigo ascII em numero binário
	function asciiParaBinario(asc){ return (asc >>> 0).toString(2);	}

	// converte binario para asc
	function binarioParaAscii(bin){ return parseInt(bin, 2); }

	// converte asc para texto
	function ascParaTexto(asc){	return String.fromCharCode(asc); }
}
