export interface Customer {
  id: number;
  name: string;
}

export interface Account {
  id: number;
  packet: string;
  customer_id: number;
  deposito_type_id: number;
  balance: number;
  customer_name: string;
  deposito_name: string;
  yearly_return: string;
}

export interface DepositoType {
  id: number;
  name: string;
  yearly_return: string;
}

export interface Transaction {
  id?: number;
  account_id: number;
  type: "deposit" | "withdraw";
  amount: number;
  transaction_date?: string;
  created_at?: string;
}
