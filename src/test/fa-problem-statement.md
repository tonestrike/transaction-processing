# Fraud Analysis and Report

## Problem Statement

- Write a program that processes a list of credit card transactions to determine whether a transaction should be ACCEPTED or DECLINED based on Fraud Rules that you'll have to implement.

- Determine what the Fraud Risk Score of a card is based on the transactions that have been processed and output that as a report.

- If the Card's Fraud Risk Score > 80 then the card is in `AT_RISK` status, and **all further transactions will be declined**. If the card has a Fraud Risk Score <= 80 then the card is in `MONITORING` status.

## Requirements

Fraud Rules that need to be implemented:

1. Unusual Location: If the transaction is from a country that is not one of the last 5 countries transacted on this card.

   - +50 Fraud Risk Score on the card.
   - Transaction is immediately DECLINED.

2. Unusual Amount: If the transaction amount is more than double the current transaction average

   - +20 Fraud Risk Score on the card.

3. Suspicious Category Sequence: If there are back to back transactions at the following merchant categories
   ```
   'atm' -> 'jewelry'
   'online_gaming' -> 'luxury_goods'
   'electronics' -> 'pawn_shop'
   ```
   - +30 Fraud Risk Score

## Output

Example output for a transaction

```
==== Transaction Processing Result ====
Card: ****1111
Amount: $50.00
Country: USA
Category: groceries
Timestamp: 2025-03-13T10:00:00.000Z
Decision: ACCEPTED
Card Status: MONITORING
Fraud Risk Score: 0
```

Example output for the final risk report

```
----------------------------------------
Card: ****1111
Status: AT_RISK
Fraud Risk Score: 100

```

<details>
<summary> Sample Inputs </summary>

<details>
<summary>Javascript</summary>

```
const sampleTransactions = [
  // Card 1: Normal transactions to establish baseline (Scenario 1)
  {
    cardNumber: '4111111111111111',
    amount: 50,
    country: 'USA',
    timestamp: '2025-03-13T10:00:00.000Z',
    category: 'groceries',
    scenarioName: 'SCENARIO 1: Normal transaction pattern'
  },
  {
    cardNumber: '4111111111111111',
    amount: 75,
    country: 'USA',
    timestamp: '2025-03-14T14:30:00.000Z',
    category: 'restaurant'
  },
  {
    cardNumber: '4111111111111111',
    amount: 120,
    country: 'USA',
    timestamp: '2025-03-15T16:45:00.000Z',
    category: 'retail'
  },

  // Card 1: Unusual Amount (Scenario 2)
  {
    cardNumber: '4111111111111111',
    amount: 500,
    country: 'USA',
    timestamp: '2025-03-16T09:15:00.000Z',
    category: 'electronics',
    scenarioName: 'SCENARIO 2: Unusual Amount'
  },

  // Card 1: Suspicious Category Sequence (Scenario 3)
  {
    cardNumber: '4111111111111111',
    amount: 100,
    country: 'USA',
    timestamp: '2025-03-17T11:30:00.000Z',
    category: 'electronics',
    scenarioName: 'SCENARIO 3: Suspicious Category Sequence'
  },
  {
    cardNumber: '4111111111111111',
    amount: 200,
    country: 'USA',
    timestamp: '2025-03-17T13:45:00.000Z',
    category: 'pawn_shop'
  },

  // Card 1: Unusual Location (Scenario 4)
  {
    cardNumber: '4111111111111111',
    amount: 150,
    country: 'Nigeria',
    timestamp: '2025-03-18T10:00:00.000Z',
    category: 'online',
    scenarioName: 'SCENARIO 4: Unusual Location'
  },

  // Card 2: Multiple triggered rules (Scenario 5)
  {
    cardNumber: '5555555555554444',
    amount: 100,
    country: 'Canada',
    timestamp: '2025-03-16T08:30:00.000Z',
    category: 'groceries',
    scenarioName: 'SCENARIO 5: Multiple triggered rules on a different card'
  },
  {
    cardNumber: '5555555555554444',
    amount: 150,
    country: 'Canada',
    timestamp: '2025-03-17T12:15:00.000Z',
    category: 'restaurant'
  },
  {
    cardNumber: '5555555555554444',
    amount: 200,
    country: 'Canada',
    timestamp: '2025-03-18T09:45:00.000Z',
    category: 'atm'
  },
  {
    cardNumber: '5555555555554444',
    amount: 1500,
    country: 'Canada',
    timestamp: '2025-03-18T10:30:00.000Z',
    category: 'jewelry'
  },

  // Card 2: Now at risk (Scenario 6)
  {
    cardNumber: '5555555555554444',
    amount: 50,
    country: 'Canada',
    timestamp: '2025-03-18T14:00:00.000Z',
    category: 'groceries',
    scenarioName: 'SCENARIO 6: Card is now AT_RISK, all transactions declined'
  },

  // Additional scenarios

  // Card 3: Testing another suspicious sequence
  {
    cardNumber: '3782822463100005',
    amount: 100,
    country: 'UK',
    timestamp: '2025-03-17T15:30:00.000Z',
    category: 'online_gaming',
    scenarioName: 'SCENARIO 7: Another suspicious category sequence'
  },
  {
    cardNumber: '3782822463100005',
    amount: 500,
    country: 'UK',
    timestamp: '2025-03-18T11:20:00.000Z',
    category: 'luxury_goods'
  },

  // Card 4: Multiple countries but no unusual location
  {
    cardNumber: '6011111111111117',
    amount: 50,
    country: 'France',
    timestamp: '2025-03-13T09:15:00.000Z',
    category: 'restaurant',
    scenarioName: 'SCENARIO 8: Multiple countries, no unusual location'
  },
  {
    cardNumber: '6011111111111117',
    amount: 75,
    country: 'Italy',
    timestamp: '2025-03-14T10:45:00.000Z',
    category: 'retail'
  },
  {
    cardNumber: '6011111111111117',
    amount: 100,
    country: 'Spain',
    timestamp: '2025-03-15T13:30:00.000Z',
    category: 'hotel'
  },
  {
    cardNumber: '6011111111111117',
    amount: 80,
    country: 'Germany',
    timestamp: '2025-03-16T16:20:00.000Z',
    category: 'transport'
  },
  {
    cardNumber: '6011111111111117',
    amount: 60,
    country: 'Portugal',
    timestamp: '2025-03-17T11:00:00.000Z',
    category: 'entertainment'
  },
  // This should be fine as it's one of the last 5 countries
  {
    cardNumber: '6011111111111117',
    amount: 200,
    country: 'Spain',
    timestamp: '2025-03-18T12:30:00.000Z',
    category: 'restaurant'
  }
];
```

</details>

</details>
