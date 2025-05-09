# Credit Card Fraud Analysis System

This project processes credit card transactions and analyzes them for potential fraud based on a set of predefined rules.

## Features

- Processes credit card transactions and determines if they should be ACCEPTED or DECLINED
- Calculates a Fraud Risk Score for each card
- Changes card status to AT_RISK if Fraud Risk Score exceeds 80
- Automatically declines all transactions for cards marked as AT_RISK

## Fraud Rules

1. **Unusual Location**: +50 to Fraud Risk Score if transaction is from a country not in the last 5 countries transacted on this card. Transaction is immediately DECLINED.

2. **Unusual Amount**: +20 to Fraud Risk Score if transaction amount is more than double the current transaction average.

3. **Suspicious Category Sequence**: +30 to Fraud Risk Score if there are back-to-back transactions in these category sequences:
   - 'atm' -> 'jewelry'
   - 'online_gaming' -> 'luxury_goods'
   - 'electronics' -> 'pawn_shop'

## Installation

```bash
pnpm i
```

## Usage

Run the tests to verify the functionality:

```bash
pnpm test
```

## Project Structure

- `src/affiniti/process-transactions.ts`: Main logic for processing transactions
- `src/affiniti/process-transactions.types.ts`: TypeScript type definitions
- `src/affiniti/process-transactions.test.ts`: Test suite

## Technologies Used

- TypeScript
- Jest (for testing)
- csv-parser (for processing CSV files)
