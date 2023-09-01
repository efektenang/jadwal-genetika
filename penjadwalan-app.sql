-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2023 at 10:42 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `penjadwalan-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('D814kwbj_ipJjrrFasCqZ7WXHSn_niQO', '2023-09-01 09:27:17', '{\"cookie\":{\"originalMaxAge\":3599998,\"expires\":\"2023-09-01T09:26:53.765Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"userId\":\"7a752f83-bd2a-47c6-86ea-c9dc6bc55382\"}', '2023-09-01 08:24:52', '2023-09-01 08:27:17');

-- --------------------------------------------------------

--
-- Table structure for table `t_dosen`
--

CREATE TABLE `t_dosen` (
  `id` int(11) NOT NULL,
  `nidn` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_dosen`
--

INSERT INTO `t_dosen` (`id`, `nidn`, `name`, `phone`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '1909010023', 'M. ARIZKI', '98798342342', 1, '2023-02-11 07:50:34', '2023-02-11 07:50:34'),
(2, '1909010024', 'Aulil S.kom', '546345623', 1, '2023-02-11 07:50:43', '2023-02-11 07:50:43'),
(3, '1909010032', 'Ahmad Fajar', '084377323423', 1, '2023-02-13 07:35:24', '2023-06-22 13:11:37'),
(4, '1909010002', 'Fariz ', '08783242', 1, '2023-02-13 07:35:48', '2023-07-20 09:55:34'),
(5, '190212308', 'Mega', '082347757483', 1, '2023-03-07 09:59:39', '2023-06-27 03:44:18'),
(6, '1201', 'Al-Khowarizmi, S.Kom, M.Kom', '123456', 1, '2023-03-08 04:42:28', '2023-03-08 04:42:28'),
(7, '1202', 'Amrullah, S.Kom., M.Kom', '12345', 1, '2023-03-08 04:42:46', '2023-03-08 04:42:46'),
(8, '1203', 'Andi Zulherry, S.Kom., M.Kom', '12345', 1, '2023-03-08 04:43:07', '2023-03-08 04:43:07'),
(9, '1204', 'Ferdy Riza ST, M.Kom', '12345', 1, '2023-03-08 04:43:30', '2023-03-08 04:43:30'),
(10, '1205', 'Martiano S.Pd, S.Kom., M.Kom', '12345', 1, '2023-03-08 04:43:54', '2023-03-08 04:43:54'),
(11, '1206', 'Mulkan Azhari, S.Kom, M.Kom', '12345', 1, '2023-03-08 04:44:11', '2023-03-08 04:44:11'),
(12, '1207', 'Yoshida Sary, S.E., S.Kom., M.Kom', '12345', 1, '2023-03-08 04:44:31', '2023-03-08 04:44:31'),
(14, '1208', 'Zuli Agustina Gultom, M.Si', '12345', 1, '2023-03-08 04:45:00', '2023-03-08 04:45:00'),
(15, '1209', 'Indah Purnama Sari, ST.,M.Kom', '12345', 1, '2023-03-08 04:45:21', '2023-03-08 04:45:21'),
(16, '1210', 'Al Hamidy, S.Kom, M.I.T., Ph.D', '12345', 1, '2023-03-08 04:45:38', '2023-03-08 04:45:38'),
(17, '1211', 'Halim Maulana, ST, M.Kom', '12345', 1, '2023-03-08 04:45:52', '2023-03-08 04:45:52'),
(18, '1212', 'Dr. Zainal Azis, M.M., M.Si', '12345', 1, '2023-03-08 04:46:16', '2023-03-08 04:46:16'),
(19, '1213', 'Ina Zainah Nasution, S.Sos.I, M.Pd.I', '12345', 1, '2023-03-08 04:46:37', '2023-03-08 04:46:37'),
(20, '1214', 'Lutfi Basit, S.Sos., M.I.Kom', '12345', 1, '2023-03-08 04:47:17', '2023-03-08 04:47:17'),
(21, '1215', 'Rizaldy Khoir, S.kom., M.kom', '12345', 1, '2023-03-08 04:55:22', '2023-03-08 04:55:22'),
(22, '1216', 'Nadlrah Naimi, S.Ag., M.A', '1234', 1, '2023-03-08 04:57:27', '2023-03-08 04:57:27'),
(23, '1217', 'Erwin Asmadi, S.H., M.H', '12345', 1, '2023-03-08 04:58:02', '2023-03-08 04:58:02'),
(24, '1218', 'Winarti, S.Pd., M.Pd', '12345', 1, '2023-03-08 04:58:39', '2023-03-08 04:58:39'),
(25, '1219', 'Farhan', '123123123', 1, '2023-03-13 04:27:55', '2023-06-21 12:07:01'),
(26, '1220', 'Maskum, S.Pd., S.Kom', '123456', 1, '2023-03-13 10:33:52', '2023-03-13 10:33:52'),
(27, '1221', 'Siddiq Pohan', '123123123', 1, '2023-03-13 10:40:30', '2023-03-13 10:40:30'),
(28, '1222', 'Yoga gans', '019201920', 1, '2023-03-15 08:01:43', '2023-03-15 08:01:43'),
(32, '111222333', 'user', '231313', 3, '2023-07-13 07:59:30', '2023-07-13 07:59:30'),
(33, '1111', 'Dosen Baru', '12432432', 1, '2023-08-23 02:26:13', '2023-08-23 02:26:13'),
(34, '12312332', 'Muhammad Arizki', '7987928374', 1, '2023-08-23 04:28:58', '2023-08-23 04:28:58'),
(35, '123123213', 'Yoshida Sari', '6564', 1, '2023-08-23 04:30:01', '2023-09-01 04:52:05'),
(36, '190901078778', 'rizky', '98729423', 1, '2023-08-23 04:31:47', '2023-08-23 04:31:47'),
(38, '32423423', 'Muhammad ', '098729423', 3, '2023-08-25 11:14:40', '2023-08-25 11:22:55'),
(41, '34535', 'ricki', '234234', 3, '2023-08-25 11:24:36', '2023-08-25 11:41:58'),
(42, '12888777', 'Muhammad Arizky', '1234567', 5, '2023-08-28 10:27:56', '2023-08-28 10:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `t_hari`
--

CREATE TABLE `t_hari` (
  `id` int(11) NOT NULL,
  `hari` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_hari`
--

INSERT INTO `t_hari` (`id`, `hari`, `createdAt`, `updatedAt`) VALUES
(1, 'Senin', '2023-02-17 03:05:53', '2023-02-17 03:05:53'),
(2, 'Selasa', '2023-02-17 03:05:59', '2023-02-17 03:05:59'),
(3, 'Rabu', '2023-02-17 03:06:03', '2023-02-17 03:06:03'),
(4, 'Kamis', '2023-02-17 03:06:08', '2023-02-17 03:06:08'),
(5, 'Jum\'at', '2023-02-17 03:06:14', '2023-02-17 03:06:14'),
(6, 'Sabtu', '2023-02-17 03:06:19', '2023-02-17 03:06:19');

-- --------------------------------------------------------

--
-- Table structure for table `t_jadwal`
--

CREATE TABLE `t_jadwal` (
  `id` int(11) NOT NULL,
  `id_pengampu` int(10) NOT NULL,
  `id_jam` int(10) DEFAULT NULL,
  `id_hari` int(10) DEFAULT NULL,
  `id_ruang` int(10) DEFAULT NULL,
  `userId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_jadwal`
--

INSERT INTO `t_jadwal` (`id`, `id_pengampu`, `id_jam`, `id_hari`, `id_ruang`, `userId`) VALUES
(2770, 13, 11, 6, 18, 1),
(2771, 16, 2, 6, 11, 1),
(2772, 17, 1, 2, 12, 1),
(2773, 18, 11, 1, 2, 1),
(2774, 19, 8, 6, 4, 1),
(2775, 21, 12, 2, 6, 1),
(2776, 22, 9, 2, 7, 1),
(2777, 25, 1, 3, 14, 1),
(2778, 27, 3, 4, 18, 1),
(2779, 28, 6, 1, 19, 1),
(2780, 29, 9, 3, 24, 1),
(2781, 31, 2, 3, 23, 1),
(2782, 32, 8, 4, 15, 1),
(2783, 33, 6, 3, 12, 1),
(2784, 34, 6, 3, 14, 1),
(2785, 35, 5, 1, 16, 1),
(2786, 36, 2, 1, 26, 1),
(2787, 37, 10, 4, 25, 1),
(2788, 38, 8, 2, 14, 1),
(2789, 40, 2, 4, 17, 1),
(2790, 41, 9, 2, 19, 1),
(2791, 42, 7, 2, 21, 1),
(2792, 43, 6, 1, 21, 1),
(2793, 44, 10, 5, 26, 1),
(2794, 45, 2, 2, 20, 1),
(2795, 46, 2, 4, 3, 1),
(2796, 47, 3, 4, 25, 1),
(2797, 49, 4, 1, 18, 1),
(2798, 50, 11, 6, 10, 1),
(2799, 52, 11, 6, 20, 1),
(2800, 53, 1, 2, 7, 1),
(2801, 55, 6, 6, 7, 1),
(2802, 56, 2, 4, 12, 1),
(2803, 58, 2, 4, 22, 1),
(2804, 59, 5, 3, 19, 1),
(2805, 61, 5, 6, 25, 1),
(2806, 62, 9, 3, 5, 1),
(2807, 64, 7, 6, 5, 1),
(2808, 65, 2, 5, 13, 1),
(2809, 68, 3, 3, 17, 1),
(2810, 70, 8, 4, 22, 1),
(2811, 71, 10, 3, 10, 1),
(2812, 72, 2, 2, 23, 1),
(2813, 73, 2, 2, 14, 1),
(2814, 74, 9, 6, 20, 1),
(2815, 75, 4, 6, 3, 1),
(2816, 76, 7, 4, 21, 1),
(2817, 77, 8, 5, 5, 1),
(2818, 78, 10, 1, 7, 1),
(2819, 79, 3, 3, 5, 1),
(2820, 81, 4, 2, 21, 1),
(2821, 82, 8, 3, 19, 1),
(2822, 83, 9, 4, 19, 1),
(2823, 85, 8, 1, 10, 1),
(2824, 86, 7, 2, 1, 1),
(2825, 87, 3, 1, 10, 1),
(2826, 96, 1, 2, 1, 1),
(2827, 100, 1, 2, 17, 1),
(2828, 102, 7, 5, 23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `t_matkul`
--

CREATE TABLE `t_matkul` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(255) DEFAULT NULL,
  `matkul` varchar(255) DEFAULT NULL,
  `sks` varchar(255) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `prodi` varchar(100) NOT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_matkul`
--

INSERT INTO `t_matkul` (`id`, `kode_mk`, `matkul`, `sks`, `semester`, `jenis`, `prodi`, `userId`, `createdAt`, `updatedAt`) VALUES
(0, 'ISI330181', 'Prak. Bahasa Query', '1', '3', 'praktek', 'sistem-informasi', 1, '2023-03-08 03:37:57', '2023-03-08 03:37:57'),
(5, 'ISI8833', 'Manajemen Sistem Informasi', '2', '6', 'teori', 'sistem-informasi', 1, '2023-03-07 10:00:13', '2023-03-07 10:00:13'),
(6, 'ISI110012', 'Agama', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:37:21', '2023-03-08 02:37:21'),
(7, 'ISI110022', 'Pendidikan Pancasila', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:37:50', '2023-03-08 02:37:50'),
(8, 'ISI110013', 'Pengantar Teknologi Sistem Informasi', '3', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:39:07', '2023-03-08 02:39:07'),
(9, 'ISI120012', 'Algoritma & Pemrograman', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:39:58', '2023-03-08 02:39:58'),
(10, 'ISI130021', 'Prak. Algoritma & Pemrograman', '1', '1', 'praktek', 'sistem-informasi', 1, '2023-03-08 02:41:05', '2023-03-08 02:41:05'),
(11, 'ISI130032', 'Sistem Basis Data', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:44:29', '2023-03-08 02:44:29'),
(12, 'ISI130041', 'Prak. Sistem Basis Data', '1', '1', 'praktek', 'sistem-informasi', 1, '2023-03-08 02:44:58', '2023-03-08 02:46:22'),
(15, 'ISI130042', 'Bahasa Inggris', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:46:43', '2023-03-08 02:46:43'),
(16, 'ISI130033', 'Bahasa Indonesia', '2', '1', 'teori', 'sistem-informasi', 1, '2023-03-08 02:47:41', '2023-03-08 02:47:41'),
(17, 'ISI310072', 'Muamalah', '2', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:32:50', '2023-03-08 03:32:50'),
(18, 'ISI330152', 'Pemrograman Berbasis Objek', '2', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:36:07', '2023-03-08 03:36:07'),
(19, 'ISI330161', 'Prak. Pemgrograman Berbasis Objek', '1', '3', 'praktek', 'sistem-informasi', 1, '2023-03-08 03:36:49', '2023-03-08 03:36:49'),
(20, 'ISI330172', 'Bahasa Query', '2', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:37:32', '2023-03-08 03:37:32'),
(22, '', 'Interaksi Manusia dan Komputer', '2', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:38:44', '2023-03-08 03:38:44'),
(23, 'ISI330203', 'Sistem Informasi Manajemen', '3', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:39:17', '2023-03-08 03:39:17'),
(24, 'ISI330212', 'Statistika dan Probabilitas', '2', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:39:51', '2023-03-08 03:39:51'),
(25, 'ISI330221', 'Prak. Statistika dan Probabilitas', '1', '3', 'praktek', 'sistem-informasi', 1, '2023-03-08 03:40:27', '2023-03-08 03:40:27'),
(26, 'ITI330233', 'Analisis dan Perancangan Sistem Informasi', '3', '3', 'teori', 'sistem-informasi', 1, '2023-03-08 03:41:20', '2023-03-08 03:41:20'),
(27, 'ISI530323', 'Sistem Internet of Things', '3', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:42:49', '2023-03-08 03:42:49'),
(28, 'ISI530332', 'Pemrograman Mobile', '2', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:43:22', '2023-03-08 03:43:22'),
(29, 'ISI530341', 'Prak. Pemrograman Mobile', '1', '5', 'praktek', 'sistem-informasi', 1, '2023-03-08 03:44:02', '2023-03-08 03:46:53'),
(30, 'ISI520033', 'Metode Penelitian', '3', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:44:42', '2023-03-08 03:44:42'),
(33, 'ISI530353', 'Rekayasa Perangkat Lunak', '3', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:47:18', '2023-03-08 03:47:18'),
(34, 'ISI530363', 'Audit Sistem Informasi', '3', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:48:28', '2023-03-08 03:48:28'),
(35, 'ISI530372', 'Sistem Informasi Enterprise', '3', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:48:53', '2023-03-08 03:48:53'),
(36, 'ISI530383', 'Arsitektur Sistem dan Teknologi Informasi', '2', '5', 'teori', 'sistem-informasi', 1, '2023-03-08 03:49:24', '2023-03-08 03:49:24'),
(37, 'ISI730443', 'Data Mining', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:53:34', '2023-03-08 03:53:34'),
(38, 'ISI730452', 'Etika Profesi IT', '2', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:54:02', '2023-03-08 03:54:02'),
(39, 'ISI720051', 'Kuliah Kerja Nyata (KKN)', '3', '7', 'praktek', 'sistem-informasi', 1, '2023-03-08 03:55:28', '2023-03-08 03:55:28'),
(40, 'ISI720062', 'Kewirausahaan', '2', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:55:55', '2023-03-08 03:55:55'),
(41, 'ISI730463', 'Forensik IT', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:56:38', '2023-03-08 03:56:38'),
(42, 'ISI720073', 'Penulisan Proposal', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:57:20', '2023-03-08 03:57:20'),
(43, 'ISI740043', 'Sistem Informasi Geografis', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:57:59', '2023-03-08 03:57:59'),
(44, 'ISI740053', 'E-Business ', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:58:36', '2023-03-08 03:58:36'),
(45, 'ISI740063', 'Enterprise Application Integration', '3', '7', 'teori', 'sistem-informasi', 1, '2023-03-08 03:59:04', '2023-03-08 03:59:04'),
(49, '9287342', 'Algoritma Genetika', '1', '1', 'teori', 'sistem-informasi', 1, '2023-08-23 02:26:53', '2023-08-23 02:26:53'),
(50, '43rg', 'Bahasa Inggris', '1', '1', 'praktek', 'sistem-informasi', 3, '2023-08-25 11:47:01', '2023-08-25 11:55:33'),
(53, 'ISI5ad', 'Bahasa Inggris', '1', '1', 'teori', 'sistem-informasi', 3, '2023-08-25 12:34:38', '2023-08-25 12:34:38'),
(54, 'ISI5ad22', 'Bahasa Inggris u', '1', '1', 'teori', 'sains data', 3, '2023-08-25 14:28:01', '2023-08-25 14:36:21'),
(55, 'ITI5200338', 'Bahasa Inggris', '2', '1', 'teori', 'teknologi-informasi', 5, '2023-08-28 07:12:28', '2023-08-28 07:12:28'),
(56, 'ISI5223424', 'Rekayasa Perangkat Lunak', '2', '1', 'teori', 'teknologi-informasi', 5, '2023-08-28 07:21:48', '2023-08-28 07:21:48'),
(57, 'ISI12123322', 'Pengantar Sistem Informasi', '3', '1', 'teori', 'teknologi-informasi', 5, '2023-08-28 07:22:46', '2023-08-28 07:22:46');

-- --------------------------------------------------------

--
-- Table structure for table `t_pengampu`
--

CREATE TABLE `t_pengampu` (
  `id` int(11) NOT NULL,
  `id_mk` varchar(255) DEFAULT NULL,
  `id_dosen` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `tahun_akademik` varchar(255) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_pengampu`
--

INSERT INTO `t_pengampu` (`id`, `id_mk`, `id_dosen`, `kelas`, `tahun_akademik`, `userId`, `createdAt`, `updatedAt`) VALUES
(13, '6', '8', 'A', '2023-2024', 1, '2023-03-08 05:04:38', '2023-03-14 09:34:13'),
(16, '16', '24', 'A', '2023-2024', 1, '2023-03-08 05:18:34', '2023-03-08 05:18:34'),
(17, '16', '24', 'B', '2023-2024', 1, '2023-03-08 05:18:50', '2023-03-08 05:18:50'),
(18, '9', '25', 'A', '2023-2024', 1, '2023-03-08 09:34:25', '2023-03-13 07:34:36'),
(19, '9', '17', 'B', '2023-2024', 1, '2023-03-08 09:34:41', '2023-03-08 09:34:41'),
(21, '10', '25', 'A', '2023-2024', 1, '2023-03-08 09:35:57', '2023-03-13 07:36:55'),
(22, '10', '17', 'B', '2023-2024', 1, '2023-03-08 09:36:09', '2023-03-08 09:36:09'),
(25, '15', '1', 'A', '2023-2024', 1, '2023-03-08 09:40:42', '2023-03-08 09:40:42'),
(27, '15', '5', 'C', '2023-2024', 1, '2023-03-08 09:41:06', '2023-03-13 10:13:39'),
(28, '7', '23', 'A', '2023-2024', 1, '2023-03-08 09:41:33', '2023-03-08 09:41:33'),
(29, '7', '23', 'B', '2023-2024', 1, '2023-03-08 09:41:52', '2023-03-08 09:41:52'),
(31, '8', '6', 'A', '2023-2024', 1, '2023-03-08 09:42:42', '2023-03-08 09:42:42'),
(32, '8', '3', 'B', '2023-2024', 1, '2023-03-08 09:43:02', '2023-03-13 10:11:15'),
(33, '8', '17', 'C', '2023-2024', 1, '2023-03-08 09:43:16', '2023-03-13 15:43:05'),
(34, '11', '2', 'A', '2023-2024', 1, '2023-03-08 09:43:47', '2023-03-08 09:43:47'),
(35, '11', '2', 'B', '2023-2024', 1, '2023-03-08 09:44:00', '2023-03-08 09:44:00'),
(36, '11', '8', 'C', '2023-2024', 1, '2023-03-08 09:44:12', '2023-03-14 05:14:28'),
(37, '26', '9', 'A', '2023-2024', 1, '2023-03-13 03:31:44', '2023-03-13 03:31:44'),
(38, '26', '26', 'B', '2023-2024', 1, '2023-03-13 03:31:59', '2023-03-13 10:35:28'),
(40, '20', '1', 'A', '2023-2024', 1, '2023-03-13 03:33:25', '2023-03-13 03:33:25'),
(41, '20', '27', 'B', '2023-2024', 1, '2023-03-13 03:33:42', '2023-03-13 10:41:17'),
(42, '37', '1', 'A', '2023-2024', 1, '2023-03-13 03:34:35', '2023-08-26 08:34:02'),
(43, '49', '27', 'B', '2023-2024', 1, '2023-03-13 03:34:52', '2023-08-26 08:33:50'),
(44, '22', '19', 'A', '2023-2024', 1, '2023-03-13 04:16:46', '2023-03-13 10:32:08'),
(45, '22', '3', 'B', '2023-2024', 1, '2023-03-13 04:17:01', '2023-03-13 07:38:07'),
(46, '22', '12', 'C', '2023-2024', 1, '2023-03-13 04:17:14', '2023-03-13 04:17:14'),
(47, '17', '22', 'A', '2023-2024', 1, '2023-03-13 04:17:43', '2023-03-13 04:17:43'),
(49, '17', '5', 'C', '2023-2024', 1, '2023-03-13 04:18:20', '2023-03-13 04:18:20'),
(50, '18', '7', 'A', '2023-2024', 1, '2023-03-13 04:19:00', '2023-03-13 04:19:00'),
(52, '18', '11', 'C', '2023-2024', 1, '2023-03-13 04:19:44', '2023-03-13 04:19:44'),
(53, '19', '7', 'A', '2023-2024', 1, '2023-03-13 04:19:56', '2023-03-13 04:19:56'),
(55, '19', '11', 'C', '2023-2024', 1, '2023-03-13 04:20:29', '2023-03-13 04:20:29'),
(56, '23', '6', 'A', '2023-2024', 1, '2023-03-13 04:21:20', '2023-03-13 04:21:20'),
(58, '23', '20', 'C', '2023-2024', 1, '2023-03-13 04:22:09', '2023-03-13 07:32:25'),
(59, '24', '18', 'A', '2023-2024', 1, '2023-03-13 04:22:23', '2023-03-13 04:22:23'),
(61, '24', '15', 'C', '2023-2024', 1, '2023-03-13 04:22:49', '2023-03-13 04:22:49'),
(62, '25', '18', 'A', '2023-2024', 1, '2023-03-13 04:23:06', '2023-03-13 04:23:06'),
(64, '25', '15', 'C', '2023-2024', 1, '2023-03-13 04:23:33', '2023-03-13 04:23:33'),
(65, '36', '9', 'A', '2023-2024', 1, '2023-03-13 04:24:32', '2023-03-13 04:24:32'),
(68, '34', '3', 'A', '2023-2024', 1, '2023-03-13 04:25:27', '2023-03-13 04:25:27'),
(70, '34', '16', 'C', '2023-2024', 1, '2023-03-13 04:25:59', '2023-03-13 07:38:58'),
(71, '30', '10', 'A', '2023-2024', 1, '2023-03-13 04:26:20', '2023-03-13 04:26:20'),
(72, '30', '10', 'B', '2023-2024', 1, '2023-03-13 04:26:31', '2023-03-13 04:26:31'),
(73, '30', '28', 'C', '2023-2024', 1, '2023-03-13 04:26:43', '2023-06-26 07:47:50'),
(74, '28', '25', 'A', '2023-2024', 1, '2023-03-13 04:28:11', '2023-03-13 04:28:11'),
(75, '28', '26', 'B', '2023-2024', 1, '2023-03-13 04:28:22', '2023-03-13 10:34:48'),
(76, '28', '4', 'C', '2023-2024', 1, '2023-03-13 04:28:37', '2023-03-13 07:39:34'),
(77, '29', '25', 'A', '2023-2024', 1, '2023-03-13 04:29:04', '2023-03-13 04:29:04'),
(78, '29', '26', 'B', '2023-2024', 1, '2023-03-13 04:29:15', '2023-03-13 10:34:28'),
(79, '29', '4', 'C', '2023-2024', 1, '2023-03-13 04:29:27', '2023-03-13 07:39:48'),
(81, '33', '21', 'B', '2023-2024', 1, '2023-03-13 04:30:31', '2023-03-13 10:38:47'),
(82, '33', '14', 'C', '2023-2024', 1, '2023-03-13 04:30:49', '2023-03-13 04:30:49'),
(83, '35', '20', 'A', '2023-2024', 1, '2023-03-13 04:31:08', '2023-03-13 04:31:08'),
(85, '35', '16', 'C', '2023-2024', 1, '2023-03-13 04:31:54', '2023-03-13 04:31:54'),
(86, '27', '12', 'A', '2023-2024', 1, '2023-03-13 04:32:07', '2023-03-13 04:32:07'),
(87, '27', '14', 'B', '2023-2024', 1, '2023-03-13 04:32:19', '2023-03-13 10:37:33'),
(90, '37', '18', 'C', '2020-2021', 1, '2023-03-13 04:33:08', '2023-03-13 04:33:08'),
(96, '40', '8', 'A', '2023-2024', 1, '2023-03-13 04:34:53', '2023-03-14 05:12:29'),
(100, '43', '21', 'A', '2023-2024', 1, '2023-03-13 04:35:50', '2023-03-13 04:35:50'),
(102, '6', '22', 'B', '2023-2024', 1, '2023-03-14 09:34:46', '2023-03-14 09:34:46'),
(104, '6', '1', 'B', '', 1, '2023-06-23 04:08:37', '2023-06-23 04:08:37'),
(106, '6', '1', 'D', '2020-2021', 1, '2023-06-23 04:26:04', '2023-06-23 08:29:52'),
(110, '48', '31', 'A', '2020-2021', 4, '2023-06-26 10:10:13', '2023-06-26 10:10:13'),
(111, '50', '38', 'A', '2020-2021', 3, '2023-08-25 14:41:44', '2023-08-25 14:41:44'),
(112, '54', '38', 'A', '2020-2021', 3, '2023-08-25 14:46:14', '2023-08-25 14:46:14'),
(113, '55', '42', 'A', '2020-2021', 5, '2023-08-28 10:28:05', '2023-08-28 10:28:05'),
(114, '56', '42', 'C', '2020-2021', 5, '2023-09-01 07:56:07', '2023-09-01 07:56:07');

-- --------------------------------------------------------

--
-- Table structure for table `t_ruang`
--

CREATE TABLE `t_ruang` (
  `id` int(11) NOT NULL,
  `no_ruang` varchar(255) DEFAULT NULL,
  `kapasitas` varchar(255) DEFAULT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_ruang`
--

INSERT INTO `t_ruang` (`id`, `no_ruang`, `kapasitas`, `jenis`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '601 ', '45', 'teori', 1, '2023-02-22 03:54:54', '2023-02-22 03:55:12'),
(2, '602', '45', 'teori', 1, '2023-02-22 03:55:06', '2023-02-22 03:55:06'),
(3, '603', '45', 'teori', 1, '2023-02-22 03:55:21', '2023-02-22 03:55:21'),
(4, '604', '45', 'teori', 1, '2023-02-22 03:55:34', '2023-02-22 03:55:34'),
(5, '605', '40', 'praktek', 1, '2023-02-22 03:55:44', '2023-02-22 03:55:44'),
(6, '606', '40', 'praktek', 1, '2023-02-22 03:55:56', '2023-02-22 03:55:56'),
(7, '607', '40', 'praktek', 1, '2023-02-22 03:56:06', '2023-02-22 03:56:06'),
(8, '608', '40', 'praktek', 1, '2023-02-22 03:56:16', '2023-02-22 03:56:16'),
(9, '701', '45', 'teori', 1, '2023-02-22 03:56:26', '2023-02-22 03:56:26'),
(10, '702', '45', 'teori', 1, '2023-02-22 03:56:34', '2023-02-22 03:56:34'),
(11, '703', '45', 'teori', 1, '2023-02-22 03:56:46', '2023-02-22 03:56:46'),
(12, '704', '45', 'teori', 1, '2023-02-22 03:56:55', '2023-02-22 03:56:55'),
(13, '505', '40', 'teori', 1, '2023-02-22 03:57:27', '2023-02-22 03:57:27'),
(14, '506', '45', 'teori', 1, '2023-02-22 03:57:35', '2023-02-22 03:57:35'),
(15, '507', '45', 'teori', 1, '2023-02-22 03:57:42', '2023-02-22 03:57:42'),
(16, '508', '45', 'teori', 1, '2023-02-22 03:57:50', '2023-02-22 03:57:50'),
(17, '705', '45', 'teori', 1, '2023-03-13 07:55:38', '2023-03-13 07:55:38'),
(18, '706', '40', 'teori', 1, '2023-03-13 07:55:53', '2023-03-13 07:55:53'),
(19, '707', '45', 'teori', 1, '2023-03-13 07:56:04', '2023-03-13 07:56:04'),
(20, '708', '40', 'teori', 1, '2023-03-13 07:56:14', '2023-03-13 07:56:14'),
(21, '501', '45', 'teori', 1, '2023-03-13 09:08:56', '2023-03-13 09:08:56'),
(22, '502', '45', 'teori', 1, '2023-03-13 09:09:04', '2023-03-13 09:09:04'),
(23, '503', '45', 'teori', 1, '2023-03-13 09:09:10', '2023-03-13 09:09:10'),
(24, '504', '45', 'teori', 1, '2023-03-13 09:09:17', '2023-03-13 09:09:17'),
(25, '601', '40', 'teori', 1, '2023-06-06 09:56:26', '2023-06-06 09:56:26'),
(26, '601', '45', 'teori', 1, '2023-06-07 10:23:52', '2023-06-07 10:23:52'),
(29, '9999', '45', 'teori', 4, '2023-06-26 10:09:27', '2023-06-26 10:09:27'),
(30, '501', '45', 'teori', 3, '2023-08-25 11:54:10', '2023-08-25 11:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `t_waktu`
--

CREATE TABLE `t_waktu` (
  `id` int(11) NOT NULL,
  `range_waktu` varchar(255) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_waktu`
--

INSERT INTO `t_waktu` (`id`, `range_waktu`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '08.00-08.50', 1, '2023-02-22 03:48:48', '2023-03-09 07:41:23'),
(2, '08.50-09.30 ', 1, '2023-02-22 03:49:11', '2023-03-09 07:41:33'),
(3, '09.40-10.30 ', 1, '2023-02-22 03:49:29', '2023-03-09 07:41:53'),
(4, '10.30-11.20 ', 1, '2023-02-22 03:49:41', '2023-03-09 07:42:21'),
(5, '11.20-12.10 ', 1, '2023-02-22 03:50:01', '2023-03-09 07:42:43'),
(6, '13.30-14.10', 1, '2023-02-22 03:50:13', '2023-02-22 03:50:13'),
(7, '14.20-15.00', 1, '2023-02-22 03:50:35', '2023-02-22 03:50:35'),
(8, '15.10-15.50', 1, '2023-02-22 03:50:46', '2023-02-22 03:50:46'),
(9, '16.00-16-40', 1, '2023-02-22 03:51:01', '2023-02-22 03:51:01'),
(10, '16.40-17.30', 1, '2023-03-09 07:44:28', '2023-06-06 08:50:36'),
(11, '17.30-18.20', 1, '2023-03-09 07:44:50', '2023-03-09 07:44:50'),
(12, '18.30-19.20', 1, '2023-03-09 07:45:12', '2023-03-09 07:45:12'),
(15, '99.99-99.99', 4, '2023-06-26 10:09:39', '2023-06-26 10:09:39'),
(17, '11.11-11.10', 3, '2023-08-25 12:10:00', '2023-08-25 12:11:44');

-- --------------------------------------------------------

--
-- Table structure for table `t_waktu_khusus`
--

CREATE TABLE `t_waktu_khusus` (
  `id` int(11) NOT NULL,
  `kode_dosen` varchar(255) DEFAULT NULL,
  `kode_hari` varchar(255) DEFAULT NULL,
  `kode_waktu` varchar(255) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `t_waktu_khusus`
--

INSERT INTO `t_waktu_khusus` (`id`, `kode_dosen`, `kode_hari`, `kode_waktu`, `userId`, `createdAt`, `updatedAt`) VALUES
(28, '5', '2', '5', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, '5', '2', '6', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, '18', '2', '3', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, '18', '2', '5', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, '1', '1', '1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, '1', '1', '2', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, '3', '1', '1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, '3', '1', '2', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `prodi` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `prodi`, `createdAt`, `updatedAt`) VALUES
(1, '7a752f83-bd2a-47c6-86ea-c9dc6bc55382', 'sistem informasi', 'si@umsu.ac.id', '$argon2id$v=19$m=65536,t=3,p=4$JZWuICWv6cYC2SwV3v0GZw$lAAlioFHus8G/ma6VWYROiUfTPE8Auqa2Klil/1QV9g', 'user', '', '2023-05-11 02:50:31', '2023-07-07 07:47:15'),
(2, '0c4923ad-b47a-4dd2-b56f-9ba3d124d995', 'prodi akuntansi', 'user@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ti/jCuHhMmsaaUZwcQSqXw$b2fkHLUHsGq7RqbJqbGIHKu5qLmz/UggJHCE5gGT6ls', 'user', '', '2023-05-20 02:38:52', '2023-06-24 03:54:01'),
(3, '2118901e-4eb1-4f32-82ee-bbb47e59c019', 'Admin Aji', 'aji@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$C9nf58reIMJxQtOS0C+CsQ$7FkXjNFjY1EzBWhGy1gEGikPGRIJcrKgGX2ZJ6PnELA', 'user', '', '2023-06-12 10:35:30', '2023-08-25 10:58:35'),
(4, '63b697c4-f5d3-4784-ba8f-862c99ca706a', 'Rizky Boy', 'rizky@umsu.ac.id', '$argon2id$v=19$m=65536,t=3,p=4$04me1Z+MLYRq0Gro/lkyDA$jSDDzjpcum75tH1RnC0h+Jd42ccDsqCDdS55gQQu6V0', 'admin', '', '2023-06-26 04:33:34', '2023-07-20 10:00:05'),
(5, 'e3f2b335-9f73-4e1d-9413-87816e20af5c', 'Teknologi Informasi', 'ti@umsu.ac.id', '$argon2id$v=19$m=65536,t=3,p=4$u8A2wYibchdJgHeCSPiNZA$Ce+OSjs3aIB7GZF4udsgDadXKAFRF5l+mLl855cReyU', 'prodi', 'teknologi-informasi', '2023-08-26 08:57:52', '2023-08-26 08:57:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `t_dosen`
--
ALTER TABLE `t_dosen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nidn` (`nidn`);

--
-- Indexes for table `t_hari`
--
ALTER TABLE `t_hari`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_jadwal`
--
ALTER TABLE `t_jadwal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_matkul`
--
ALTER TABLE `t_matkul`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_mk` (`kode_mk`);

--
-- Indexes for table `t_pengampu`
--
ALTER TABLE `t_pengampu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_ruang`
--
ALTER TABLE `t_ruang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_waktu`
--
ALTER TABLE `t_waktu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_waktu_khusus`
--
ALTER TABLE `t_waktu_khusus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_dosen`
--
ALTER TABLE `t_dosen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `t_hari`
--
ALTER TABLE `t_hari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `t_jadwal`
--
ALTER TABLE `t_jadwal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2829;

--
-- AUTO_INCREMENT for table `t_matkul`
--
ALTER TABLE `t_matkul`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `t_pengampu`
--
ALTER TABLE `t_pengampu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `t_ruang`
--
ALTER TABLE `t_ruang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `t_waktu`
--
ALTER TABLE `t_waktu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `t_waktu_khusus`
--
ALTER TABLE `t_waktu_khusus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
