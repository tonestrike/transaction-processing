export const suspiciousCategorySequence = {
  atm: "jewelry",
  online_gaming: "luxury_goods",
  electronics: "pawn_shop",
};

export enum CardStatus {
  "AT_RISK" = "AT_RISK",
  "MONITORING" = "MONITORING",
}

export type Transaction = {
  cardNumber: string;
  amount: number;
  country: string;
  timestamp: string;
  category: string;
};
