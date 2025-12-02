import { useEffect, useState } from "react";
import {
  getCustomer,
  getAccountsByCustomer,
  createAccount,
  getDeposito,
  createCustomer,
} from "../services/api";

// Ant Design
import {
  Card,
  Spin,
  Typography,
  List,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";

import type { Customer, Account, DepositoType } from "../types";

const { Title, Text } = Typography;
const { Option } = Select;

import { useNavigate } from "react-router-dom";

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [depositoTypes, setDepositoTypes] = useState<DepositoType[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerForm] = Form.useForm();

  const navigate = useNavigate();

  // Load customers + deposito types
  useEffect(() => {
    const load = async () => {
      const c = await getCustomer();
      const d = await getDeposito();
      setCustomers(c);
      setDepositoTypes(d);
    };
    load();
  }, []);

  // Select customer
  const handleSelectCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setLoading(true);

    const res = await getAccountsByCustomer(customer.id);
    setAccounts(res);
    setLoading(false);
  };

  // Create customer
  const handleCreateCustomer = async () => {
    try {
      const values = await customerForm.validateFields();

      await createCustomer({ name: values.name });

      message.success("Customer created!");

      customerForm.resetFields();
      setCustomerModalOpen(false);

      // Reload customer list
      const updated = await getCustomer();
      setCustomers(updated);
    } catch (err) {
      console.error(err);
      message.error("Error creating customer");
    }
  };

  // Create account
  const handleCreateAccount = async () => {
    try {
      const values = await form.validateFields();

      await createAccount({
        packet: values.packet,
        deposito_type_id: Number(values.deposito_type_id),
        balance: values.balance,
        customer_id: selectedCustomer!.id,
      });

      message.success("Account created!");

      setModalOpen(false);
      form.resetFields();

      // Reload accounts
      const res = await getAccountsByCustomer(selectedCustomer!.id);
      setAccounts(res);
    } catch (err) {
      console.error(err);
      message.error("Error creating account");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Customers</Title>

      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setCustomerModalOpen(true)}
      >
        + Create New Customer
      </Button>

      {/* Customer List */}
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={customers}
        renderItem={(customer) => (
          <List.Item>
            <Card hoverable onClick={() => handleSelectCustomer(customer)}>
              <Text strong>{customer.name}</Text>
            </Card>
          </List.Item>
        )}
      />

      {/* Accounts Section */}
      {selectedCustomer && (
        <div style={{ marginTop: 32 }}>
          <Title level={4}>Accounts owned by {selectedCustomer.name}</Title>

          <Button
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={() => setModalOpen(true)}
          >
            + Create New Account
          </Button>

          {loading ? (
            <Spin style={{ marginTop: 20 }} />
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              style={{ marginTop: 20 }}
              dataSource={accounts}
              locale={{ emptyText: "No accounts found for this customer." }}
              renderItem={(acc) => (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => navigate(`/account/${acc.id}`)}
                  >
                    <p>
                      <Text strong>Packet:</Text> {acc.packet}
                    </p>
                    <p>
                      <Text strong>Balance:</Text> {acc.balance}
                    </p>
                    <p>
                      <Text strong>Deposito:</Text> {acc.deposito_name}
                    </p>
                    <p>
                      <Text strong>Return:</Text> {acc.yearly_return}% / year
                    </p>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </div>
      )}
      {/* Create Customer Modal */}
      <Modal
        title="Create New Customer"
        open={customerModalOpen}
        onCancel={() => setCustomerModalOpen(false)}
        onOk={handleCreateCustomer}
        okText="Create"
      >
        <Form layout="vertical" form={customerForm}>
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: "Customer name is required!" }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Account Modal */}
      <Modal
        title="Create New Account"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleCreateAccount}
        okText="Create"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Packet"
            name="packet"
            rules={[{ required: true, message: "Packet required!" }]}
          >
            <Input placeholder="Example: Gold Plan" />
          </Form.Item>

          <Form.Item
            label="Deposito Type"
            name="deposito_type_id"
            rules={[{ required: true, message: "Choose a deposito type" }]}
          >
            <Select placeholder="Select deposito type">
              {depositoTypes.map((d) => (
                <Option key={d.id} value={d.id}>
                  {d.name} — {d.yearly_return}%
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Initial Balance" name="balance">
            <Input type="number" placeholder="0" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
