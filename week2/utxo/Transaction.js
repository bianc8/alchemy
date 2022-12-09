class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs
    this.outputUTXOs = outputUTXOs
  }
  execute() {
    this.inputUTXOs.forEach((utxo) => {
      if (utxo.spent) {
        throw new Error("input utxos cannot be already spent");
      }
      input += utxo.amount;
    })
    this.outputUTXOs.forEach((utxo) => {
      output += utxo.amount;
    })
    if (input < output) {
      throw new Error("input utxos are lower than output utxos")
    }
    this.inputUTXOs.forEach((utxo) => {
      utxo.spent = true;
    });
    this.fee = input - output;
      if (this.fee < 0) {
        throw new Error("transaction fee should at least be zero");
      }
  }
}

module.exports = Transaction;