function calcularTotal(ferramentas, comprar) {
  let valorTotaldaComprar = 0;
  verificaSeListaVazia(ferramentas, comprar);

  for (
    let indexFerramentas = 0;
    indexFerramentas < ferramentas.length;
    indexFerramentas++
  ) {
    const itemLista = ferramentas[indexFerramentas];
       for (let j = 0; j < comprar.length; j++) {
      if (comprar[j] === itemLista.nome) {
        valorTotaldaComprar += itemLista.preco;
      }
    }
  }

  if (valorTotaldaComprar === 0)
    throw new Error("Nenhuma ferramenta desejada encontrada.");

  return `O valor a pagar pelas ferramentas (UFT, TOSCA) é R$ ${valorTotaldaComprar}.00`;
}

function verificaSeListaVazia(calcularTotal, comprar) {
  if (calcularTotal.length === 0 || comprar.length === 0)
    throw new Error("Ambas as listas precisam ter ao menos um item.");
}

module.exports = {
  calcularTotal,
};
