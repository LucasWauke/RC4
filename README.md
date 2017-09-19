Projeto feito para faculdade na matéria de segurança de informação.

O RC4, diferente do OTP, não precisa ter uma mensagem do tamanho da chave. Ele irá iniciar um array de 256, incrementar ele, iniciar outro de 256 e repetir a chave enquanto for menor que 256. depois disso é feito uma operação para embaralhar o algoritmo, ou seja, retornará um array mais ou menos desse jeito: [215,210,30,111,...], ou seja, pseudo-aleatório. Depois disso, ele passa por outro algoritmo para gerar um keystream, um fluxo de dados do tamanho da mensagem para ser feito um xor com ela, gerando assim, um texto criptografado.

Obs: esse algoritmo foi reproduzido apenas para um trabalho acadêmico.