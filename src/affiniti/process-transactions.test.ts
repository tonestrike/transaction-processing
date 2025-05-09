import { processTransactions } from "./process-transactions";

describe("processTransactions", () => {
  describe("Scenario 1", () => {
    // Card 1: Normal transactions to establish baseline (Scenario 1)
    const card1Transactions = [
      {
        cardNumber: "4111111111111111",
        amount: 50,
        country: "USA",
        timestamp: "2025-03-13T10:00:00.000Z",
        category: "groceries",
        scenarioName: "SCENARIO 1: Normal transaction pattern",
      },
      // Expected risk score: 0
      {
        cardNumber: "4111111111111111",
        amount: 75,
        country: "USA",
        timestamp: "2025-03-14T14:30:00.000Z",
        category: "restaurant",
      },
      // Expected risk score: 0
      {
        cardNumber: "4111111111111111",
        amount: 120,
        country: "USA",
        timestamp: "2025-03-15T16:45:00.000Z",
        category: "retail",
      },
      // Expected risk score: 20 due to the average transaction amount
      {
        cardNumber: "4111111111111111",
        amount: 500,
        country: "USA",
        timestamp: "2025-03-16T09:15:00.000Z",
        category: "electronics",
        scenarioName: "SCENARIO 2: Unusual Amount",
      },
      // Expected risk score: 20
      {
        cardNumber: "4111111111111111",
        amount: 100,
        country: "USA",
        timestamp: "2025-03-17T11:30:00.000Z",
        category: "electronics",
        scenarioName: "SCENARIO 3: Suspicious Category Sequence",
      },
      // Expected risk score: 50 due to category sequence
      {
        cardNumber: "4111111111111111",
        amount: 200,
        country: "USA",
        timestamp: "2025-03-17T13:45:00.000Z",
        category: "pawn_shop",
      },

      // Expected risk score: 100 due to unusual location
      {
        cardNumber: "4111111111111111",
        amount: 150,
        country: "Nigeria",
        timestamp: "2025-03-18T10:00:00.000Z",
        category: "online",
        scenarioName: "SCENARIO 4: Unusual Location",
      },
    ];

    it("should process transactions correctly", () => {
      const result = processTransactions(card1Transactions);

      const card1 = result["4111111111111111"];

      expect(card1).toBeDefined();
      expect(card1.status).toBe("AT_RISK");
      expect(card1.fraudRiskScore).toBe(100);
    });
  });

  describe("Scenario 2", () => {
    const card2Transactions = [
      // Expected risk score: 0
      {
        cardNumber: "5555555555554444",
        amount: 100,
        country: "Canada",
        timestamp: "2025-03-16T08:30:00.000Z",
        category: "groceries",
        scenarioName:
          "SCENARIO 5: Multiple triggered rules on a different card",
      },
      // Expected risk score: 0
      {
        cardNumber: "5555555555554444",
        amount: 150,
        country: "Canada",
        timestamp: "2025-03-17T12:15:00.000Z",
        category: "restaurant",
      },
      // Expected risk score: 20 due to category sequence
      {
        cardNumber: "5555555555554444",
        amount: 200,
        country: "Canada",
        timestamp: "2025-03-18T09:45:00.000Z",
        category: "atm",
      },
      // Expected risk score: 50 due to transaction amount
      {
        cardNumber: "5555555555554444",
        amount: 1500,
        country: "Canada",
        timestamp: "2025-03-18T10:30:00.000Z",
        category: "jewelry",
      },

      // Card 2: Now at risk (Scenario 6)
      // TODO: Is this correct? Should the card be at risk?
      // Expected risk score: 50
      {
        cardNumber: "5555555555554444",
        amount: 50,
        country: "Canada",
        timestamp: "2025-03-18T14:00:00.000Z",
        category: "groceries",
        scenarioName:
          "SCENARIO 6: Card is now AT_RISK, all transactions declined",
      },
    ];

    it("should process transactions correctly", () => {
      const result = processTransactions(card2Transactions);

      const card2 = result["5555555555554444"];

      expect(card2).toBeDefined();
      expect(card2.status).toBe("MONITORING");
      expect(card2.fraudRiskScore).toBe(50);
    });
  });

  describe("Scenario 3", () => {
    const card3Transactions = [
      // Expected risk score: 0
      {
        cardNumber: "3782822463100005",
        amount: 100,
        country: "UK",
        timestamp: "2025-03-17T15:30:00.000Z",
        category: "online_gaming",
        scenarioName: "SCENARIO 7: Another suspicious category sequence",
      },
      // Expected risk score: 50 due to the average transaction amount
      {
        cardNumber: "3782822463100005",
        amount: 500,
        country: "UK",
        timestamp: "2025-03-18T11:20:00.000Z",
        category: "luxury_goods",
      },
    ];

    it("should process transactions correctly", () => {
      const result = processTransactions(card3Transactions);

      const card3 = result["3782822463100005"];

      expect(card3).toBeDefined();
      expect(card3.status).toBe("MONITORING");
      expect(card3.fraudRiskScore).toBe(50);
    });
  });

  describe.only("Scenario 4", () => {
    const card4Transactions = [
      // Expected risk score: 0
      {
        cardNumber: "6011111111111117",
        amount: 50,
        country: "France",
        timestamp: "2025-03-13T09:15:00.000Z",
        category: "restaurant",
        scenarioName: "SCENARIO 8: Multiple countries, no unusual location",
      },
      // Expected risk score: 0
      {
        cardNumber: "6011111111111117",
        amount: 75,
        country: "Italy",
        timestamp: "2025-03-14T10:45:00.000Z",
        category: "retail",
      },
      // Expected risk score: 0
      {
        cardNumber: "6011111111111117",
        amount: 100,
        country: "Spain",
        timestamp: "2025-03-15T13:30:00.000Z",
        category: "hotel",
      },
      // Expected risk score: 0
      {
        cardNumber: "6011111111111117",
        amount: 80,
        country: "Germany",
        timestamp: "2025-03-16T16:20:00.000Z",
        category: "transport",
      },
      // Expected risk score: 0
      {
        cardNumber: "6011111111111117",
        amount: 60,
        country: "Portugal",
        timestamp: "2025-03-17T11:00:00.000Z",
        category: "entertainment",
      },
      // Expected risk score: 20 due to average transaction amount
      {
        cardNumber: "6011111111111117",
        amount: 200,
        country: "Spain",
        timestamp: "2025-03-18T12:30:00.000Z",
        category: "restaurant",
      },
    ];

    it("should process transactions correctly", () => {
      const result = processTransactions(card4Transactions);

      const card4 = result["6011111111111117"];

      expect(card4).toBeDefined();
      expect(card4.status).toBe("MONITORING");
      expect(card4.fraudRiskScore).toBe(20);
    });
  });
});
