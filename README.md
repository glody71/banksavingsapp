# Bank Saving System

**Deskripsi Singkat:**  
Sistem manajemen tabungan bank yang memungkinkan pengguna untuk membuat akun, melakukan deposit, withdraw, dan melihat histori transaksi secara real-time.

---
- **Frontend** → React (Vite + TypeScript)
- **Backend** → Node.js (Express + PostgreSQL)

## 1. System Specification

### a. Database Design
Database menggunakan PostgreSQL. Struktur tabel utama:  

**Customer**  

| Column     | Type       | Description          |
|------------|-----------|--------------------|
| id         | SERIAL     | Primary Key         |
| name       | VARCHAR    | Nama customer       |

**Account**  

| Column     | Type          | Description                  |
|------------|---------------|-----------------------------|
| id         | SERIAL        | Primary Key                 |
| customer_id| INTEGER       | Foreign Key ke Customer      |
| packet     | VARCHAR       | Jenis paket tabungan         |
| balance    | NUMERIC(10,2) | Saldo tabungan              |

**Transaction**  

| Column      | Type          | Description                  |
|-------------|---------------|-----------------------------|
| id          | SERIAL        | Primary Key                 |
| account_id  | INTEGER       | Foreign Key ke Account      |
| type        | VARCHAR       | Deposit / Withdraw          |
| amount      | NUMERIC(10,2) | Nominal transaksi           |
| created_at  | TIMESTAMP     | Waktu transaksi             |

---

### b. APIs Needed
- `GET /customers` – Ambil daftar customer  
- `POST /customers` – Tambah customer baru  
- `GET /accounts/:customerId` – Ambil daftar akun milik customer  
- `POST /accounts` – Buat akun baru  
- `POST /transactions/deposit` – Deposit ke akun  
- `POST /transactions/withdraw` – Withdraw dari akun  
- `GET /transactions/:accountId` – Ambil histori transaksi akun  

---

### c. API Calls per Screen

| Screen          | API Called                   | Purpose                   |
|-----------------|-----------------------------|---------------------------|
| Customer List    | `GET /customers`             | Tampilkan semua customer  |
| Customer Detail  | `GET /accounts/:id`          | Tampilkan akun customer   |
| Account Page     | `POST /transactions/deposit` | Deposit uang              |
| Account Page     | `POST /transactions/withdraw`| Withdraw uang             |
| Transaction Page | `GET /transactions/:id`      | Tampilkan histori         |

---

### d. API Documentation
- Menggunakan **APIARY** atau **Swagger**.  
- Contoh endpoint:  
  - `POST /transactions/deposit`  
    ```json
    {
      "account_id": 1,
      "amount": 100000
    }
    ```
    Response:  
    ```json
    {
      "success": true,
      "balance": 150000
    }
    ```

---

### e. API Collection
- Menggunakan **Postman**  
- Buat environment:  
  - `BASE_URL = http://localhost:3000`  

---

