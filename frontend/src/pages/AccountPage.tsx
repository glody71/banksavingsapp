import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Spin,
  Typography,
  Form,
  InputNumber,
  DatePicker,
  Button,
  message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getAccountById, createTransaction } from "../services/api";
import type { Account } from "../types";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- ini untuk navigasi
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [endingBalance, setEndingBalance] = useState<number | null>(null);
  const [monthlyReturn, setMonthlyReturn] = useState<number | null>(null);

  const [depositForm] = Form.useForm();
  const [withdrawForm] = Form.useForm();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAccountById(Number(id));
        setAccount(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Spin style={{ marginTop: 40, marginLeft: 30 }} />;
  if (!account) return <Title level={4}>Account not found.</Title>;

  const handleDeposit = async (values: any) => {
    try {
      setDepositLoading(true);
      await createTransaction({
        account_id: account.id,
        type: "deposit",
        amount: values.amount,
        transaction_date: values.date
          ? values.date.format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      });
      const updatedAccount = await getAccountById(account.id);
      setAccount(updatedAccount);
      message.success("Deposit successful!");
      depositForm.resetFields();
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Deposit failed");
    } finally {
      setDepositLoading(false);
    }
  };

  const handleWithdraw = async (values: any) => {
    try {
      setWithdrawLoading(true);
      const withdrawAmount = values.amount;
      const depositDate = values.date;

      if (withdrawAmount > account.balance) {
        message.error("Cannot withdraw more than current balance!");
        return;
      }

      const startDate = dayjs(depositDate);
      const endDate = dayjs();
      const months = endDate.diff(startDate, "month");

      const monthly = parseFloat(account.yearly_return) / 12 / 100;
      setMonthlyReturn(monthly * 100);

      const ending = (account.balance - withdrawAmount) + (account.balance * months * monthly);
      setEndingBalance(ending);

      await createTransaction({
        account_id: account.id,
        type: "withdraw",
        amount: withdrawAmount,
        transaction_date: depositDate.format("YYYY-MM-DD"),
      });

      const updatedAccount = await getAccountById(account.id);
      setAccount(updatedAccount);
      message.success("Withdrawal successful!");
      withdrawForm.resetFields();
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Withdrawal failed");
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <LeftOutlined
          style={{ fontSize: 24, cursor: "pointer", marginRight: 12 }}
          onClick={() => navigate(-1)} // <- kembali ke halaman sebelumnya
        />
        <Title level={3} style={{ margin: 0 }}>Account Detail</Title>
      </div>

      <Card style={{ marginTop: 20 }}>
        <h1><Text strong>Customer:</Text> {account.customer_name}</h1>
        <p><Text strong>Account ID:</Text> {account.id}</p>
        <p><Text strong>Packet:</Text> {account.packet}</p>
        <p><Text strong>Balance:</Text> {account.balance}</p>
        <p><Text strong>Deposito Type:</Text> {account.deposito_name}</p>
        <p><Text strong>Return / Year:</Text> {account.yearly_return}%</p>
      </Card>

      {/* Deposit Form */}
      <Card title="Deposit" style={{ marginTop: 20 }}>
        <Form form={depositForm} onFinish={handleDeposit} layout="inline">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Enter deposit amount" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="date" label="Deposit Date">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={depositLoading}>
              Deposit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Withdraw Form */}
      <Card title="Withdraw" style={{ marginTop: 20 }}>
        <Form form={withdrawForm} onFinish={handleWithdraw} layout="inline">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Enter withdraw amount" }]}
          >
            <InputNumber min={1} max={account.balance} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Deposit Date"
            rules={[{ required: true, message: "Select deposit date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={withdrawLoading}>
              Withdraw
            </Button>
          </Form.Item>
        </Form>

        {monthlyReturn !== null && (
          <p style={{ marginTop: 16 }}>
            <Text strong>Monthly Return:</Text> {monthlyReturn.toFixed(2)}%
          </p>
        )}

        {endingBalance !== null && (
          <p>
            <Text strong>Ending Balance:</Text> {endingBalance.toFixed(2)}
          </p>
        )}
      </Card>
    </div>
  );
}
