import axios from "axios";
import type { Customer, Account, DepositoType, Transaction } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

//getCustomer
export const getCustomer = async (): Promise<Customer[]> => {
  try {
    const res = await api.get<Customer[]>("/customers");
    return res.data;
  } catch (err) {
    console.error("Error getCustomer:", err);
    throw err;
  }
};

//getAccount by Customer
export const getAccountsByCustomer = async (
  customerId: number
): Promise<Account[]> => {
  try {
    const res = await api.get<Account[]>(`/accounts/customer/${customerId}`);
    return res.data;
  } catch (err) {
    console.error("Error getAccountsByCustomer:", err);
    throw err;
  }
};

//createCustomer
export const createCustomer = async (data: {
  name: string;
}): Promise<Customer> => {
  try {
    const res = await api.post<Customer>("/customers", data);
    return res.data;
  } catch (err) {
    console.error("Error createCustomer:", err);
    throw err;
  }
};

//deleteCustomer
export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await api.delete(`/customers/${id}`);
    console.log("Customer dihapus");
  } catch (err) {
    console.error("Error deleteCustomer:", err);
    throw err;
  }
};

//updateCustomer
export const updateCustomer = async (
  id: number,
  data: { name: string }
): Promise<Customer> => {
  try {
    const res = await api.put(`/customers/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updateCustomer:", err);
    throw err;
  }
};

//getDeposito
export const getDeposito = async (): Promise<DepositoType[]> => {
  try {
    const res = await api.get<DepositoType[]>("/deposito");
    return res.data;
  } catch (err) {
    console.error("Error getDeposito:", err);
    throw err;
  }
};

//createDeposito
export const createDeposito = async (data: {
  name: string;
  yearly_return: string;
}): Promise<DepositoType> => {
  try {
    const res = await api.post<DepositoType>("/deposito", data);
    return res.data;
  } catch (err) {
    console.error("Error createDeposito:", err);
    throw err;
  }
};

//deleteDeposito
export const deleteDeposito = async (id: number): Promise<void> => {
  try {
    await api.delete(`/deposito/${id}`);
  } catch (err) {
    console.error("Error deleteDeposito:", err);
    throw err;
  }
};

//updateDeposito
export const updateDeposito = async (
  id: number,
  data: { name: string; yearly_return: string }
): Promise<DepositoType> => {
  try {
    const res = await api.put(`/deposito/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updateDeposito:", err);
    throw err;
  }
};

//getAccount
export const getAccounts = async (): Promise<Account[]> => {
  try {
    const res = await api.get<Account[]>("/accounts");
    return res.data;
  } catch (err) {
    console.error("Error getAccounts:", err);
    throw err;
  }
};

//createAccount
export const createAccount = async (data: {
  packet: string;
  customer_id: number;
  deposito_type_id: number;
  balance?: string; // opsional
}): Promise<Account> => {
  try {
    const res = await api.post<Account>("/accounts", data);
    return res.data;
  } catch (err) {
    console.error("Error createAccount:", err);
    throw err;
  }
};

//updateAccount
export const updateAccount = async (
  id: number,
  data: {
    packet: string;
    customer_id: number;
    deposito_type_id: number;
    balance?: string;
  }
): Promise<Account> => {
  try {
    const res = await api.put<Account>(`/accounts/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updateAccount:", err);
    throw err;
  }
};

//deleteAccount
export const deleteAccount = async (id: number): Promise<void> => {
  try {
    await api.delete(`/accounts/${id}`);
  } catch (err) {
    console.error("Error deleteAccount:", err);
    throw err;
  }
};

//getAccountById
export const getAccountById = async (id: number): Promise<Account> => {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
};

// Get all transactions
export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await api.get<Transaction[]>("/transactions");
    return res.data;
  } catch (err) {
    console.error("Error getAllTransactions:", err);
    throw err;
  }
};

export const createTransaction = async (data: {
  account_id: number;
  type: "deposit" | "withdraw";
  amount: number;
  transaction_date?: string;
}) => {
  try {
    const res = await api.post("/transactions", data);
    return res.data;
  } catch (err) {
    console.error("Error createTransaction:", err);
    throw err;
  }
};

export const getTransactionsByAccount = async (accountId: number) => {
  try {
    const res = await api.get(`/transactions/account/${accountId}`);
    return res.data;
  } catch (err) {
    console.error("Error getTransactionsByAccount:", err);
    throw err;
  }
};



