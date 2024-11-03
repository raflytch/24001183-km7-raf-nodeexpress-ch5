# Car Management API

Car Management API adalah sistem yang digunakan untuk mengelola data mobil dengan fitur CRUD yang dilengkapi dengan otentikasi berbasis token dan peran pengguna. API ini mendukung fitur otorisasi dengan role-based access control (RBAC) dan mengelola file gambar mobil menggunakan ImageKit. Sistem ini juga dilengkapi dengan dokumentasi API berbasis Swagger untuk memudahkan pengembang dalam memahami endpoint yang tersedia.

### Pencipta

Rafly Aziz Abdillah

### Clone Project

```bash
git clone https://github.com/raflytch/24001183-km7-raf-nodeexpress-ch5
cd 24001183-km7-raf-nodeexpress-ch5
npm install
```

## Fitur

- **Authentication dan Authorization**:
  - Pengguna dapat mendaftar dan login dengan otentikasi berbasis JWT.
  - Peran pengguna terbagi menjadi `Superadmin`, `Admin`, dan `Member`, yang memiliki akses berbeda untuk setiap fitur.
    - **Superadmin**: Memiliki hak penuh untuk mengelola pengguna dan data mobil. Dapat membuat, memperbarui, dan menghapus pengguna serta mobil.
    - **Admin**: Dapat mengelola data mobil dan melihat daftar pengguna, tetapi tidak dapat mengelola data pengguna.
    - **Member**: Memiliki akses terbatas dan dapat melihat data mobil yang tersedia tanpa akses manajemen.
- **Manajemen Pengguna**:
  - `Superadmin` dapat membuat, memperbarui, dan menghapus pengguna.
  - `Superadmin` dan `Admin` dapat melihat daftar pengguna.
- **Hashing Password**:
  - Password pengguna di-hash menggunakan **bcrypt** sebelum disimpan ke database. Saat pengguna mendaftar atau memperbarui password, hash baru dibuat untuk menjaga keamanan.
- **Manajemen Mobil**:
  - Endpoint CRUD untuk mengelola data mobil, termasuk fitur upload gambar menggunakan ImageKit.
  - Filter berdasarkan ketersediaan (`isAvailable`), nama, tipe, harga, dll.
  - Hanya `Superadmin` dan `Admin` yang dapat menambahkan, memperbarui, dan menghapus data mobil.
- **Health Check**:
  - Endpoint untuk memeriksa status API.
- **Penanganan Rute yang Hilang**:
  - Mengimplementasikan middleware untuk menangani rute yang tidak ditemukan (404). Jika endpoint yang diminta tidak ada, API akan mengembalikan respons dengan status 404 dan pesan yang sesuai.

## Tech Stack

- **Node.js** - Runtime JavaScript untuk menjalankan backend
- **Express.js** - Framework web untuk Node.js
- **Sequelize** - ORM untuk PostgreSQL
- **PostgreSQL** - Database relasional
- **JWT (jsonwebtoken)** - Otentikasi berbasis token
- **Bcrypt** - Untuk hashing password
- **Multer** - Middleware untuk menangani file upload
- **ImageKit** - Media management untuk penyimpanan gambar
- **Swagger UI** - Dokumentasi API
- **Nodemon** - Alat untuk mengembangkan aplikasi Node.js dengan restart otomatis
- **dotenv** - Untuk mengelola environment variables

## Cara Penggunaan

1. **Instalasi dan Konfigurasi**

   - Clone repository ini dan jalankan `npm install` untuk mengunduh semua dependencies.
   - Buat file `.env` dengan isi sebagai berikut:

     ```plaintext
     DB_NAME=
     DB_USERNAME=
     DB_PASSWORD=
     PORT=
     DB_HOST=
     JWT_SECRET=
     JWT_EXPIRED=
     SEED_USER_PASSWORD=
     IMAGEKIT_PUBLIC_KEY=
     IMAGEKIT_PRIVATE_KEY=
     IMAGEKIT_URL=
     ```

2. **Menjalankan Server**

   - Untuk menjalankan dalam mode pengembangan:
     ```bash
     npm run dev
     ```
   - Untuk menjalankan dalam mode produksi:
     ```bash
     npm start
     ```

3. **Dokumentasi API**

   - Akses dokumentasi API melalui Swagger UI pada endpoint:
     ```plaintext
     http://localhost:3000/api-docs/
     ```

4. **Menggunakan Fitur Otorisasi di Swagger**
   - Setelah membuka Swagger UI, klik ikon gembok (Authorize) yang terletak di pojok kanan atas.
   - Masukkan token JWT yang didapat setelah melakukan login, dan klik "Authorize". Ini akan memungkinkan akses ke endpoint yang memerlukan autentikasi.

## Struktur Endpoint Utama

- **Auth Routes** (`/auth`)

  - `POST /register` - Mendaftarkan pengguna baru
  - `POST /login` - Login pengguna
  - `GET /token` - Memeriksa validitas token pengguna

- **User Routes** (`/users`)

  - `GET /` - Mendapatkan semua pengguna (Hanya `Superadmin` dan `Admin`)
  - `GET /:id` - Mendapatkan data pengguna berdasarkan ID (Hanya `Superadmin` dan `Admin`)
  - `POST /` - Membuat pengguna baru (Hanya `Superadmin`)
  - `PATCH /:id` - Memperbarui data pengguna (Hanya `Superadmin`)
  - `DELETE /:id` - Menghapus pengguna (Hanya `Superadmin` dan `Admin`)

- **Car Routes** (`/cars`)

  - `GET /` - Mendapatkan daftar mobil dengan filter opsional
  - `GET /:id` - Mendapatkan detail mobil berdasarkan ID
  - `POST /` - Menambahkan mobil baru (Hanya `Superadmin` dan `Admin`)
  - `PATCH /:id` - Memperbarui data mobil (Hanya `Superadmin` dan `Admin`)
  - `DELETE /:id` - Menghapus mobil (Hanya `Superadmin` dan `Admin`)

- **System Routes** (`/system`)

  - `GET /health-check` - Memeriksa status API

## Script Command

- **Database Commands**
  - `npm run db:create` - Membuat database
  - `npm run db:drop` - Menghapus database
  - `npm run db:migrate` - Menjalankan migrasi database
  - `npm run db:migrate:undo` - Membatalkan migrasi database
  - `npm run db:seed` - Menjalankan seed data
  - `npm run db:seed:undo` - Membatalkan seed data

## Catatan Tambahan

- Pastikan semua konfigurasi di `.env` sudah diisi dengan benar agar sistem berjalan sesuai yang diharapkan.
- Pastikan token dikirim pada setiap request yang memerlukan autentikasi untuk mengakses endpoint.

### Lisensi

Proyek ini dikerjakan oleh **Rafly Aziz Abdillah**.

### Link GitHub

[Rafly Aziz Abdillah](https://github.com/raflytch)
