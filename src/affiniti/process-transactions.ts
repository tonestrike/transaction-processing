import {
  CardStatus,
  suspiciousCategorySequence,
  Transaction,
} from "./process-transactions.types";

// Anything card with fraud score greater than this should be marked as at risk
const maxFraudRiskScore = 80;

class CreditCard {
  number: string;
  status: CardStatus;
  fraudRiskScore: number;
  last5Countries: string[];
  transactions: Transaction[];
  transactionCount: number;
  averageTransactionAmount: number;

  lastCategory: string;

  totalAmountProcessed: number;

  constructor(creditCardNumber: string) {
    this.number = creditCardNumber;
    this.status = CardStatus.MONITORING;
    this.fraudRiskScore = 0;

    this.transactions = [];
    this.last5Countries = [];

    this.transactionCount = 0;
    this.averageTransactionAmount = 0;

    this.totalAmountProcessed = 0;
    this.lastCategory = "";
  }

  addTransaction(transaction: Transaction): boolean {
    // Check if card is already at risk - all transactions should be declined
    if (this.status === CardStatus.AT_RISK) {
      return false;
    }

    let violatedLastCountryRule: boolean = false;
    if (
      this.last5Countries.length === 5 &&
      !this.last5Countries.includes(transaction.country)
    ) {
      this.fraudRiskScore += 50;
      violatedLastCountryRule = true;
    }

    // Check for unusually large transaction amount
    if (
      this.averageTransactionAmount &&
      transaction.amount > this.averageTransactionAmount * 2
    ) {
      this.fraudRiskScore += 20;
    }

    this.transactionCount++;
    this.transactions.push(transaction);

    this.totalAmountProcessed += transaction.amount;
    this.averageTransactionAmount =
      this.totalAmountProcessed / this.transactionCount;

    // Check for suspicious category sequence
    const suspiciousNextCategory =
      suspiciousCategorySequence[this.lastCategory];
    if (suspiciousNextCategory === transaction.category) {
      this.fraudRiskScore += 30;
    }

    // Update the last 5 countries list
    if (this.last5Countries.length === 5) {
      this.last5Countries.shift(); // Remove the oldest country
    }
    this.last5Countries.push(transaction.country); // Add the new country

    // Keep track of last category of transaction
    this.lastCategory = transaction.category;

    // Update status based on fraud risk score
    this.status =
      this.fraudRiskScore > maxFraudRiskScore
        ? CardStatus.AT_RISK
        : CardStatus.MONITORING;

    const declined =
      violatedLastCountryRule || this.status === CardStatus.AT_RISK;

    return !declined;
  }
}

const creditCardMap: Record<string, CreditCard> = {};

export const processTransactions = (transactions: Transaction[]) => {
  // Clear the credit card map before processing to ensure test independence
  for (const key in creditCardMap) {
    delete creditCardMap[key];
  }

  for (let i = 0; i < transactions.length; i++) {
    const currentTransaction = transactions[i];
    const existingCreditCard =
      creditCardMap[currentTransaction.cardNumber] ||
      new CreditCard(currentTransaction.cardNumber);

    creditCardMap[existingCreditCard.number] = existingCreditCard;

    const approved = existingCreditCard.addTransaction(currentTransaction);

    const transactionResult = `==== Transaction Processing Result ====
Card: ${existingCreditCard.number}
Amount: $${currentTransaction.amount.toFixed(2)}
Country: ${currentTransaction.country}
Category: ${currentTransaction.category}
Timestamp: ${currentTransaction.timestamp}
Decision: ${!approved ? "DECLINED" : "ACCEPTED"}
Card Status: ${existingCreditCard.status}
Fraud Risk Score: ${existingCreditCard.fraudRiskScore}`;
    console.log(transactionResult);
  }

  for (const creditCardNumber in creditCardMap) {
    const creditCard = creditCardMap[creditCardNumber];

    const creditCardSummary = `----------------------------------------
Card: ${creditCard.number}
Status: ${creditCard.status}
Fraud Risk Score: ${creditCard.fraudRiskScore}`;
    console.log(creditCardSummary);
  }

  // Return the credit card map for direct access in tests
  return { ...creditCardMap };
};
