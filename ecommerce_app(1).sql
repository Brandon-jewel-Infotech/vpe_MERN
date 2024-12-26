-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 06:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_details`
--

CREATE TABLE `address_details` (
  `id` int(11) NOT NULL,
  `gmap_link` varchar(255) DEFAULT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `aadhar_pic` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `address_details`
--

INSERT INTO `address_details` (`id`, `gmap_link`, `address_line_1`, `address_line_2`, `city`, `state`, `zip`, `aadhar_pic`, `user_id`) VALUES
(9, '', '121 Mangal Vihar', 'opp.Jain Mandir ,Gopalpura byepass', 'jaipur', 'Rajasthan', '302018', '', 47),
(11, '', '121 Mangal Vihar', 'opp.Jain Mandir ,Gopalpura byepass', 'Jaioyr', 'Rajasthan', '302018', '', 50),
(14, '8', '1234567', '234567', '345678', '345678', '34567', '', 73),
(18, '', 'Address line 1', 'Address lin 2 ', 'Jpr', 'Raj', '741025', 'public/uploads/78-1689012043841-aadhar_pic.jpg', 78),
(19, 'vfds', 'jnohsda', 'zscas', 'dsadsa', 'dafa', '12003', '', 79);

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` int(11) NOT NULL,
  `holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_address` text DEFAULT NULL,
  `upi` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bank_details`
--

INSERT INTO `bank_details` (`id`, `holder_name`, `account_number`, `ifsc_code`, `bank_name`, `bank_address`, `upi`, `user_id`) VALUES
(6, '', '0', '', '', '', '9602600@paytm', 47),
(8, '', '0', '', '', '', '7410852963@pay', 50),
(10, '', '', '', '', '', '234567890@hsjsxk', 73),
(14, '', '', '', '', '', '7410852963@paytm', 78),
(15, 'dsfa', 'fdsa', '', '', '', 'fdsa', 79);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `createdBy` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `variant_id` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`createdBy`, `product_id`, `qty`, `variant_id`, `createdAt`, `total`) VALUES
(47, '40', '1', '0', '2023-12-02', 15000),
(50, '34,37,38', '51,11,11', '1,0,6', '2023-12-01', 7947000);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'electronics'),
(6, 'Furniture'),
(10, 'Fashion'),
(11, 'Hardware'),
(12, 'Accessories');

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

CREATE TABLE `coins` (
  `id` int(11) NOT NULL,
  `numOfCoins` int(255) NOT NULL,
  `perUnit` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coins`
--

INSERT INTO `coins` (`id`, `numOfCoins`, `perUnit`) VALUES
(1, 100, 10),
(2, 200, 5);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `contact`, `whatsapp`, `email`, `created_at`) VALUES
(1, 'Samsung', '7410852963', '7410852963', 'info@samsung.com', '2023-06-04 06:25:55'),
(2, 'Haier', '7410852963', '7894561230', 'haierEmail', '2023-06-04 07:17:44'),
(3, 'Airr', '7896541322', '7410258963', 'airr.com', '2023-06-04 08:12:37'),
(4, 'Haier', '18004442223', '7410852963', 'support@haier.com', '2023-07-10 17:56:45');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employer` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employer`, `name`, `email`, `password`, `contact`, `role`) VALUES
(2, 13, 'Mod', 'mod@gmail.com', '$2b$10$8IGe4OJGgU/UeUL8EX/1Ae2YdMgTysZwqwBCU6GK3aXwCOFW0cbl.', '1234567890', 0),
(6, 47, 'Employee ', 'employee@gmail.com', '$2b$10$bIMaI4PpKeTAe/tPNRssre6YYofYLD4t6OS4rHm4wdmkfSfxsMyrO', '7894561230', 4);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `reciever` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 3 COMMENT '1=success 2=warning 3=info 4=error',
  `seen` int(11) NOT NULL DEFAULT 1 COMMENT '0=true 1=false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sender`, `reciever`, `content`, `createdAt`, `status`, `seen`) VALUES
(6, 50, 47, 'Success', '2023-09-11 21:34:55', 3, 1),
(7, 50, 47, 'This Deal is done', '2023-09-11 21:35:18', 3, 1),
(8, 50, 47, 'This Deal is done', '2023-09-11 21:35:42', 3, 1),
(9, 50, 47, 'This Deal is done', '2023-09-11 21:35:45', 3, 1),
(10, 47, 50, 'Your order is accepted', '2023-09-11 23:53:45', 3, 1),
(11, 47, 50, 'Your order is rejected', '2023-09-12 00:01:14', 3, 1),
(12, 50, 47, 'Your order is cancelled', '2023-09-12 00:01:57', 3, 1),
(13, 50, 47, 'Your order is cancelled', '2023-09-12 23:54:26', 3, 1),
(14, 47, 50, 'Your order is accepted', '2023-09-13 17:24:39', 3, 1),
(15, 47, 50, 'Your order is rejected', '2023-09-13 17:25:52', 3, 1),
(16, 50, 47, 'Your order is accepted', '2023-09-13 17:28:44', 3, 1),
(38, 79, 79, 'The seller has replied to your requested order list', '2023-10-02 21:21:09', 3, 1),
(57, 50, 50, 'The seller has replied to your requested order list', '2023-10-02 22:48:34', 3, 1),
(58, 50, 79, 'The seller has replied to your requested order list', '2023-10-03 17:04:36', 3, 1),
(59, 50, 79, 'The seller has replied to your requested order list', '2023-10-03 17:15:21', 3, 1),
(60, 50, 79, 'The seller has replied to your requested order list', '2023-10-03 17:16:21', 3, 1),
(61, 50, 79, 'The seller has replied to your requested order list', '2023-10-03 17:24:09', 3, 1),
(62, 50, 47, 'The seller has replied to your requested order list', '2023-10-03 18:53:30', 3, 1),
(63, 47, 50, 'The seller has replied to your requested order list', '2023-10-03 18:56:40', 3, 1),
(64, 50, 79, 'The seller has replied to your requested order list', '2023-10-03 21:25:16', 3, 1),
(65, 50, 79, 'The seller has declined to your requested order list', '2023-10-03 21:26:02', 3, 1),
(66, 50, 50, 'Your order has been cancelled', '2023-10-03 23:50:13', 3, 1),
(67, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 00:00:54', 3, 1),
(68, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 00:12:05', 3, 1),
(69, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 00:13:19', 3, 1),
(70, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:04:26', 3, 1),
(71, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:04:30', 3, 1),
(72, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:05:55', 3, 1),
(73, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:08:26', 3, 1),
(74, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:10:28', 3, 1),
(75, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-04 17:10:57', 3, 1),
(76, 47, 50, 'The seller has declined to your requested order list', '2023-10-04 20:13:33', 3, 1),
(77, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 16:48:02', 3, 1),
(78, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 16:59:13', 3, 1),
(79, 47, 50, 'The seller has declined to your requested order list', '2023-10-06 16:59:50', 3, 1),
(80, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:00:02', 3, 1),
(81, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:02:20', 3, 1),
(82, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:02:40', 3, 1),
(83, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:02:44', 3, 1),
(84, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:02:48', 3, 1),
(85, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:06:13', 3, 1),
(86, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:08:39', 3, 1),
(87, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:08:43', 3, 1),
(88, 47, 50, 'The seller has declined to your requested order list', '2023-10-06 17:10:16', 3, 1),
(89, 47, 47, 'The seller has declined to your requested order list', '2023-10-06 17:11:16', 3, 1),
(90, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:11:25', 3, 1),
(91, 47, 50, 'The seller has declined to your requested order list', '2023-10-06 17:11:29', 3, 1),
(92, 47, 50, 'The seller has replied to your requested order list', '2023-10-06 17:14:17', 3, 1),
(93, 47, 50, 'The seller has replied to your requested order list', '2023-10-06 17:14:52', 3, 1),
(94, 47, 50, 'The seller has replied to your requested order list', '2023-10-06 17:19:04', 3, 1),
(95, 47, 50, 'The seller has replied to your requested order list', '2023-10-06 17:19:42', 3, 1),
(96, 47, 50, 'The seller has declined to your requested order list', '2023-10-06 17:19:47', 3, 1),
(97, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:24:33', 3, 1),
(98, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:25:33', 3, 1),
(99, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:26:00', 3, 1),
(100, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:26:29', 3, 1),
(101, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:26:57', 3, 1),
(102, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:27:36', 3, 1),
(103, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:27:58', 3, 1),
(104, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:29:55', 3, 1),
(105, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:30:54', 3, 1),
(106, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:31:05', 3, 1),
(107, 47, 79, 'The seller has declined to your requested order list', '2023-10-06 17:31:08', 3, 1),
(108, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:31:51', 3, 1),
(109, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:33:10', 3, 1),
(110, 47, 79, 'The seller has replied to your requested order list', '2023-10-06 17:34:20', 3, 1),
(111, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-06 17:35:04', 3, 1),
(112, 47, 47, 'Your order has been cancelled', '2023-10-07 18:06:45', 3, 1),
(113, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:36:28', 3, 1),
(114, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:36:54', 3, 1),
(115, 47, 79, 'The seller has declined to your requested order list', '2023-10-07 18:37:18', 3, 1),
(116, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:47:54', 3, 1),
(117, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:48:30', 3, 1),
(118, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:49:09', 3, 1),
(119, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:50:24', 3, 1),
(120, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:51:03', 3, 1),
(121, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:51:31', 3, 1),
(122, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:54:23', 3, 1),
(123, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:55:03', 3, 1),
(124, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:55:28', 3, 1),
(125, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:55:29', 3, 1),
(126, 47, 79, 'The seller has replied to your requested order list', '2023-10-07 18:55:45', 3, 1),
(127, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 19:34:06', 3, 1),
(128, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 19:45:47', 3, 1),
(129, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 20:59:49', 3, 1),
(130, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:00:00', 3, 1),
(131, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:00:25', 3, 1),
(132, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:00:27', 3, 1),
(133, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:18:10', 3, 1),
(134, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:20:56', 3, 1),
(135, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:21:33', 3, 1),
(136, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:24:18', 3, 1),
(137, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:28:14', 3, 1),
(138, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 21:28:38', 3, 1),
(139, 47, 79, 'Your order request has been denied by the seller', '2023-10-07 21:39:42', 3, 1),
(140, 47, 47, 'Your order has been cancelled', '2023-10-07 22:13:10', 3, 1),
(141, 47, 47, 'Order Declined', '2023-10-07 22:21:27', 3, 1),
(142, 47, 47, 'Order Declined', '2023-10-07 22:22:20', 3, 1),
(143, 47, 47, 'Order Declined', '2023-10-07 22:22:48', 3, 1),
(144, 47, 47, 'Order Declined', '2023-10-07 22:23:16', 3, 1),
(145, 47, 47, 'Order Declined', '2023-10-07 22:24:57', 3, 1),
(146, 47, 47, 'Order Declined', '2023-10-07 22:25:47', 3, 1),
(147, 50, 50, 'Order Declined', '2023-10-07 22:27:07', 3, 1),
(148, 47, 47, 'Order Declined', '2023-10-07 22:29:23', 3, 1),
(149, 47, 47, 'The seller has replied to your requested order list', '2023-10-07 22:30:19', 3, 1),
(150, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 23:36:51', 3, 1),
(151, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 23:36:52', 3, 1),
(152, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-07 23:37:35', 3, 1),
(153, 79, 79, 'The seller has replied to your requested order list', '2023-10-07 23:38:14', 3, 1),
(154, 50, 50, 'The seller has replied to your requested order list', '2023-10-07 23:39:16', 3, 1),
(155, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 18:10:59', 3, 1),
(156, 47, 50, 'Your order request has been denied by the seller', '2023-10-09 18:11:03', 3, 1),
(157, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 18:25:56', 3, 1),
(158, 47, 50, 'Your order request has been denied by the seller', '2023-10-09 18:25:59', 3, 1),
(159, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 20:22:06', 3, 1),
(160, 47, 50, 'Your order request has been denied by the seller', '2023-10-09 20:22:08', 3, 1),
(161, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 22:51:12', 3, 1),
(162, 47, 50, 'Your order request has been denied by the seller', '2023-10-09 22:51:15', 3, 1),
(163, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 22:56:02', 3, 1),
(164, 50, 50, 'The seller has replied to your requested order list', '2023-10-09 22:57:01', 3, 1),
(165, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 23:01:02', 3, 1),
(166, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-09 23:01:04', 3, 1),
(167, 50, 50, 'The seller has replied to your requested order list', '2023-10-09 23:01:28', 3, 1),
(168, 50, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-10 19:19:41', 3, 1),
(169, 50, 79, 'Your order request has been denied by the seller', '2023-10-10 19:19:46', 3, 1),
(170, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 17:39:12', 3, 1),
(171, 47, 79, 'Your order request has been denied by the seller', '2023-10-11 17:39:14', 3, 1),
(172, 79, 79, 'The seller has replied to your requested order list', '2023-10-11 17:40:23', 3, 1),
(173, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 17:41:14', 3, 1),
(174, 47, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 17:42:23', 3, 1),
(175, 47, 79, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 17:43:37', 3, 1),
(176, 47, 79, 'Your order request has been denied by the seller', '2023-10-11 17:45:14', 3, 1),
(177, 47, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:14:59', 3, 1),
(178, 47, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:15:02', 3, 1),
(179, 47, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:19:16', 3, 1),
(180, 47, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:19:17', 3, 1),
(181, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:22:57', 3, 1),
(182, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:24:54', 3, 1),
(183, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:25:37', 3, 1),
(184, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:29:03', 3, 1),
(185, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:29:04', 3, 1),
(186, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:29:31', 3, 1),
(187, 50, 50, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:31:01', 3, 1),
(188, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:31:02', 3, 1),
(189, 50, 47, 'Your order request has been processed and the seller can accept it partially', '2023-10-11 18:31:03', 3, 1),
(190, 50, 79, 'Your order request has been denied by the seller', '2023-10-11 18:31:34', 3, 1),
(191, 50, 47, 'This Deal is done', '2023-10-12 21:03:08', 3, 1),
(192, 47, 79, 'Your order request has been denied by the seller', '2023-11-16 22:22:42', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `createdBy` int(11) DEFAULT NULL,
  `reciever` int(11) DEFAULT NULL,
  `stage` int(11) DEFAULT 1 COMMENT '\r\n * 1 :  Pending\r\n * 2 :  Processed\r\n * 3 :  Partially Accepted\r\n * 4 :  Rejected\r\n * 5 :  Cancelled By User\r\n',
  `prod_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `prices` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`createdBy`, `reciever`, `stage`, `prod_id`, `qty`, `variant_id`, `id`, `createdAt`, `prices`, `group_id`) VALUES
(79, 50, 1, 32, 31, 0, 83, '2023-10-11 18:28:07', 5000, 166832),
(79, 47, 1, 34, 31, 0, 84, '2023-10-11 18:28:07', 150000, 975317),
(79, 47, 1, 33, 31, 6, 85, '2023-10-11 18:28:08', 10000, 146964),
(79, 50, 3, 32, 10, 0, 86, '2023-10-11 18:31:32', 5000, 964575),
(79, 47, 3, 34, 10, 0, 87, '2023-10-11 18:31:33', 150000, 529040),
(79, 47, 3, 34, 10, 0, 88, '2023-11-16 22:22:41', 150000, 467549);

-- --------------------------------------------------------

--
-- Table structure for table `order_list`
--

CREATE TABLE `order_list` (
  `createdBy` int(11) NOT NULL,
  `reciever` varchar(255) NOT NULL,
  `prod_id` varchar(255) NOT NULL,
  `stage` varchar(255) NOT NULL COMMENT '\r\n * 1 :  Pending\r\n * 2 :  Processed\r\n * 3 :  Partially Accepted\r\n * 4 :  Rejected\r\n * 5 :  Cancelled By User\r\n * 6 :  Completed\r\n',
  `id` int(11) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `variant_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `prices` varchar(255) NOT NULL,
  `order_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_list`
--

INSERT INTO `order_list` (`createdBy`, `reciever`, `prod_id`, `stage`, `id`, `qty`, `variant_id`, `createdAt`, `prices`, `order_group`) VALUES
(79, '50', '32', '1', 188, '31', '0', '2023-10-11 18:27:58', '5000', 331902),
(79, '47', '34', '1', 189, '31', '0', '2023-10-11 18:27:58', '150000', 331902),
(79, '47', '33', '1', 190, '31', '6', '2023-10-11 18:27:58', '10000', 331902),
(79, '50', '32', '1', 191, '11', '0', '2023-10-11 18:28:25', '5000', 372515),
(79, '47', '34', '3', 192, '10', '0', '2023-10-11 18:28:25', '150000', 372515),
(79, '47', '33', '4', 193, '10', '6', '2023-10-11 18:28:25', '10000', 372515),
(79, '50', '32', '3', 194, '10', '0', '2023-10-11 18:30:29', '5000', 661569),
(79, '47', '34', '3', 195, '10', '0', '2023-10-11 18:30:29', '150000', 661569),
(79, '47', '33', '4', 196, '10', '6', '2023-10-11 18:30:29', '10000', 661569),
(79, '50', '32', '1', 197, '11', '0', '2023-10-11 21:24:20', '5000', 576670),
(79, '47', '34', '1', 198, '11', '0', '2023-10-11 21:24:20', '150000', 576670),
(79, '47', '33', '1', 199, '11', '6', '2023-10-11 21:24:20', '10000', 576670),
(79, '50', '32', '1', 200, '25', '0', '2023-10-11 21:25:11', '5000', 93019),
(79, '47', '34', '1', 201, '15', '0', '2023-10-11 21:25:11', '150000', 93019),
(79, '47', '33', '1', 202, '15', '6', '2023-10-11 21:25:11', '10000', 93019),
(79, '50', '32', '1', 203, '35', '0', '2023-10-11 21:38:37', '5000', 753442),
(79, '47', '34', '1', 204, '35', '0', '2023-10-11 21:38:37', '150000', 753442),
(79, '47', '33', '1', 205, '35', '6', '2023-10-11 21:38:37', '10000', 753442),
(50, '47', '34', '1', 206, '3', '0', '2023-11-25 20:41:01', '150000', 370578),
(47, '50', '32', '1', 207, '1', '0', '2023-11-27 20:40:17', '5000', 589792),
(47, '50', '36', '1', 208, '1', '0', '2023-11-27 20:40:17', '123', 589792),
(47, '50', '32', '1', 209, '1', '0', '2023-11-27 20:41:49', '5000', 121596),
(47, '50', '36', '1', 210, '1', '0', '2023-11-27 20:41:49', '123', 121596),
(47, '50', '32', '1', 211, '1', '0', '2023-11-27 22:21:49', '5000', 177314),
(47, '50', '36', '1', 212, '1', '0', '2023-11-27 22:21:49', '123', 177314),
(47, '50', '32', '1', 213, '1', '0', '2023-11-27 22:33:42', '5000', 87678),
(47, '50', '36', '1', 214, '1', '0', '2023-11-27 22:33:42', '123', 87678),
(47, '50', '32', '1', 215, '1', '0', '2023-11-27 22:36:02', '5000', 855800),
(47, '50', '36', '1', 216, '1', '0', '2023-11-27 22:36:02', '123', 855800),
(47, '50', '32', '1', 217, '1', '0', '2023-11-27 22:36:12', '5000', 991766),
(47, '50', '36', '1', 218, '1', '0', '2023-11-27 22:36:12', '123', 991766),
(47, '50', '32', '1', 219, '1', '0', '2023-11-27 22:53:20', '5000', 741662),
(47, '50', '36', '1', 220, '1', '0', '2023-11-27 22:53:20', '123', 741662),
(50, '47', '34', '1', 221, '11', '0', '2023-11-28 17:21:58', '150000', 27774),
(50, '47', '34', '1', 222, '11', '0', '2023-11-28 18:21:27', '150000', 795630),
(50, '47', '34', '1', 223, '11', '0', '2023-11-28 18:22:47', '150000', 903103),
(50, '47', '34', '1', 224, '11', '0', '2023-11-28 18:23:16', '150000', 913527),
(50, '47', '34', '1', 225, '11', '0', '2023-11-28 18:23:38', '150000', 716707),
(47, '50', '32', '1', 226, '1', '0', '2023-11-28 18:24:14', '5000', 548335),
(47, '50', '32', '1', 227, '1', '0', '2023-11-28 18:25:26', '5000', 847035),
(47, '50', '32', '1', 228, '1', '0', '2023-11-28 18:29:00', '5000', 532338),
(47, '50', '32', '1', 229, '1', '0', '2023-11-28 18:29:27', '5000', 312574),
(47, '50', '32', '1', 230, '1', '0', '2023-11-28 18:30:29', '5000', 571441),
(47, '50', '32', '1', 231, '1', '0', '2023-11-28 18:31:15', '5000', 997361),
(47, '50', '32', '1', 232, '1', '0', '2023-11-28 18:32:49', '5000', 700224),
(47, '50', '32', '1', 233, '1', '0', '2023-11-28 18:33:31', '5000', 524525),
(50, '47', '34', '1', 234, '1', '0', '2023-11-28 21:32:28', '150000', 761294),
(47, '50', '32', '1', 235, '1', '0', '2023-11-28 21:34:43', '5000', 320211),
(47, '50', '32', '1', 236, '1', '0', '2023-11-28 21:38:53', '5000', 107234),
(47, '50', '36', '1', 237, '1', '0', '2023-11-28 21:38:53', '123', 107234),
(47, '50', '32', '1', 238, '1', '0', '2023-11-28 21:40:02', '5000', 920480),
(47, '50', '36', '1', 239, '1', '0', '2023-11-28 21:40:02', '123', 920480),
(50, '47', '34', '1', 240, '1', '0', '2023-11-28 22:39:38', '150000', 818119),
(50, '47', '33', '1', 241, '1', '6', '2023-11-28 22:39:38', '10000', 818119),
(50, '47', '34', '1', 242, '1', '0', '2023-11-28 22:49:58', '150000', 436485),
(50, '47', '37', '1', 243, '1', '0', '2023-11-28 22:49:58', '12000', 436485),
(50, '47', '38', '1', 244, '1', '0', '2023-11-28 22:49:58', '15000', 436485),
(50, '47', '34', '1', 245, '1', '0', '2023-11-28 22:50:28', '150000', 78535),
(50, '47', '37', '1', 246, '1', '0', '2023-11-28 22:50:28', '12000', 78535),
(50, '47', '38', '1', 247, '1', '0', '2023-11-28 22:50:28', '15000', 78535),
(50, '47', '34', '1', 248, '1', '0', '2023-11-28 22:50:41', '150000', 838977),
(50, '47', '37', '1', 249, '1', '0', '2023-11-28 22:50:41', '12000', 838977),
(50, '47', '38', '1', 250, '1', '0', '2023-11-28 22:50:41', '15000', 838977),
(47, '50', '32', '1', 251, '1', '0', '2023-11-28 23:16:35', '5000', 895838),
(47, '50', '39', '1', 252, '1', '0', '2023-11-28 23:16:35', '1300', 895838),
(47, '50', '36', '1', 253, '1', '0', '2023-11-28 23:16:35', '123', 895838),
(50, '47', '34', '1', 254, '1', '0', '2023-11-28 23:21:45', '150000', 588939),
(50, '47', '37', '1', 255, '1', '0', '2023-11-28 23:21:45', '12000', 588939),
(50, '47', '38', '1', 256, '1', '0', '2023-11-28 23:21:45', '15000', 588939),
(50, '47', '34', '1', 257, '1', '0', '2023-11-28 23:31:21', '150000', 943850);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `price_b2b` int(11) NOT NULL,
  `price_b2c` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `availability` int(11) NOT NULL DEFAULT 1 COMMENT 'stock number ',
  `description` text NOT NULL,
  `instock` tinyint(1) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `reward_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price_b2b`, `price_b2c`, `category_id`, `subcategory_id`, `company_id`, `availability`, `description`, `instock`, `created_by`, `created_at`, `reward_id`) VALUES
(32, 'WD 2TB Elements Portable External Hard Drive - USB 3.0', 'public\\uploads\\1686828626291-61IBBVJvSDL._AC_SY879_.jpg,', 5000, 6000, 1, 5, 1, 150, '<p>USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system</p>', 0, 50, '2023-06-15 11:30:26', 23),
(33, 'dummy ', 'public\\uploads\\1687599267720-team-1.jpg,public\\uploads\\1687599267721-team-2.jpg,public\\uploads\\1687599267724-team-3.jpg,public\\uploads\\1687599267725-team-4.jpg,', 10000, 15000, 1, 3, 3, 499, '<p>This is the description of the products</p>', 0, 47, '2023-06-24 09:34:27', 24),
(34, 'Very awesome   Fridge', 'public\\uploads\\1688496880406-fridge.jpg,', 150000, 200000, 1, 5, 1, 10000, '<h2>Fridge of your dreams&nbsp;</h2><p>This is the the best refrigerator</p><ul><li>Time efficient</li><li>Very good</li></ul>', 0, 47, '2023-07-04 18:54:40', 23),
(35, 'Very awesome  office Chair ', 'public\\uploads\\1688504073442-about-logo.png,public\\uploads\\1688504073443-logo.png,public\\uploads\\1688504073443-tom.jpg,', 4000, 5000, 6, 7, 1, 200, '<p>This chair will never break and is very comfortable&nbsp;</p><ul><li>No exchange&nbsp;</li><li>No returns&nbsp;</li><li>Only chairs</li></ul>', 0, 73, '2023-07-04 20:54:33', 25),
(37, 'Television', 'public\\uploads\\1698752613119-nature5.jpeg,', 12000, 13000, 1, 1, 1, 123, 'Product description', 0, 47, '2023-10-31 17:13:33', 27),
(38, 'Mobile Phone', 'public\\uploads\\1698838576738-nature.jpeg,', 15000, 17000, 1, 1, 1, 100, '<p>Product description</p><p>This is a mobile phone.</p>', 0, 47, '2023-11-01 17:06:16', 23),
(39, 'Smart Watches', 'public\\uploads\\1700331550086-nature.jpeg,', 1300, 1400, 1, 1, 1, 100, '<p>Product description</p><p>This is a smart watch</p>', 0, 50, '2023-11-18 23:49:10', 27),
(40, 'Refrigerator ', 'public\\uploads\\1700480041627-nature.jpeg,public\\uploads\\1700480041628-nature1.jpeg,', 15000, 18000, 1, 5, 2, 120, '<p>Product description</p><p>This is a refrigerator of Haier company.</p>', 0, 50, '2023-11-20 17:04:01', 0),
(41, 'New Product 01', 'public\\uploads\\1702735162083-nature.jpeg,public\\uploads\\1702735162084-nature1.jpeg,public\\uploads\\1702735162085-nature3.jpeg,public\\uploads\\1702735162085-nature4.jpeg,public\\uploads\\1702735162087-nature5.jpeg,public\\uploads\\1702735162092-user.jpeg,public\\uploads\\1702735162092-user2.jpeg,', 12000, 15000, 1, 3, 2, 1000, '<p>Product description This is a good product&nbsp;</p>', 0, 47, '2023-12-16 19:29:22', 0),
(42, 'New Product 02', 'public\\uploads\\1702735545471-nature5.jpeg,public\\uploads\\1702735545471-user.jpeg,public\\uploads\\1702735545472-user2.jpeg,', 15000, 25000, 1, 1, 3, 100, '<p>Product description This is a good product&nbsp;</p><p>&nbsp;</p>', 0, 79, '2023-12-16 19:35:45', 23);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 = open ; 2 = declined ; 3 = approved; 4 = closed',
  `role` int(11) NOT NULL DEFAULT 0 COMMENT '0 = account creation ; \r\n1 = connection request; \r\n2 = query ;\r\n\r\nCompany or catgeory creations will go as a query\r\n',
  `receiver` int(11) NOT NULL DEFAULT 0 COMMENT '0 = admin/mod ; else = user_id (business etc) ',
  `response` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `createdBy`, `description`, `status`, `role`, `receiver`, `response`, `created_at`) VALUES
(28, 47, 'Please add \nCompany : Airr\n  Toll Free number : 7896541322 \n   Whatsapp Number : 7410258963 \n email : airr.com', 3, 2, 0, 'added', '2023-06-03 00:15:49'),
(30, 50, NULL, 3, 0, 0, '', '2023-06-05 18:54:27'),
(31, 47, 'I want to request a new category : Fashion', 4, 2, 0, '', '2023-06-14 15:30:06'),
(32, 47, 'I want to request a new company  : \n      \nCompany Name : Asus\n      \nCompany Toll Free : 1800435465\n      \nCompany Whatsapp Number : 7896541230\n      \nCompany Email : support@asus.com', 3, 2, 0, 'Added the company ', '2023-06-14 15:30:53'),
(33, 50, 'Test', 4, 2, 0, '', '2023-06-19 16:22:51'),
(34, 50, 'I want to add new category\nName : Fashion', 4, 2, 0, '', '2023-06-19 16:34:32'),
(35, 50, 'dummy\n', 4, 2, 0, '', '2023-06-19 16:34:57'),
(36, 50, 'tets', 4, 2, 0, '', '2023-06-19 16:35:10'),
(37, 50, 'test', 4, 2, 0, '', '2023-06-19 16:35:59'),
(38, 50, 'test', 4, 2, 0, '', '2023-06-19 16:37:24'),
(39, 50, 'test', 4, 2, 0, '', '2023-06-19 16:38:05'),
(41, 73, NULL, 3, 0, 0, '', '2023-07-03 19:27:49'),
(45, 78, NULL, 1, 0, 0, NULL, '2023-07-10 18:00:43'),
(46, 47, 'I want to request a new category : Fashion', 1, 2, 0, NULL, '2023-07-10 19:47:47'),
(47, 47, 'I want to request a new company  : \n      \nCompany Name : Samsung\n      \nCompany Toll Free : 18005553362\n      \nCompany Whatsapp Number : 7410258633\n      \nCompany Email : support@samsung.com', 1, 2, 0, NULL, '2023-07-10 19:47:54'),
(48, 47, 'I want to request a new subcategory : dddd \n For category : 1', 1, 2, 0, NULL, '2023-07-10 19:48:18'),
(49, 50, 'I want to add new category', 1, 2, 0, NULL, '2023-09-11 18:30:09'),
(50, 50, 'I want to add new category here', 1, 2, 0, NULL, '2023-09-11 18:33:29'),
(51, 79, NULL, 3, 0, 0, '', '2023-09-12 00:06:45'),
(52, 50, 'I want to buy this product', 3, 2, 0, 'Yes I can provide this order', '2023-09-13 23:22:23'),
(53, 47, 'I want to request a new subcategory : hdfds \n For category : 6', 1, 2, 0, NULL, '2023-10-31 16:58:56');

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `name` varchar(255) NOT NULL DEFAULT 'Fixed Numerical' COMMENT 'fixed numerical fixed percentage and variable offer ',
  `coins` varchar(255) NOT NULL DEFAULT '0',
  `stage` int(11) NOT NULL DEFAULT 1 COMMENT '1= assigned 2= transaction completed',
  `status` int(11) NOT NULL COMMENT '1=fixed numerical 2=fixed percentage 3=variable numerical',
  `conditions` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`name`, `coins`, `stage`, `status`, `conditions`, `id`) VALUES
('Scheme 1', '10,12,15', 1, 3, '5,8,15', 23),
('Scheme 3', '12', 1, 1, '1', 24),
('Scheme 2', '', 1, 2, '5', 25),
('Scheme 5', '', 1, 2, '2', 27),
('Scheme 8', '5,10,14', 1, 3, '10,25,35', 28);

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `name`, `cat_id`) VALUES
(1, 'LED', 1),
(3, 'TV', 1),
(4, 'AC', 1),
(5, 'Refrigerator', 1),
(6, 'Chair', 6),
(7, 'Table', 6),
(9, 'Lawn', 6),
(10, 'Mens', 10),
(11, 'Screwdriver', 11),
(12, 'Watch', 12);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `status` int(11) DEFAULT NULL,
  `txn_image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `created_at`, `status`, `txn_image`) VALUES
(1, 1, '2023-06-27 20:00:59', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 2 COMMENT '1: Admin , 2 : business , 3 : Mod , 4 : employee',
  `category` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1: Pending , 2 : Declined , 3 : Accepted, 4 : Suspended',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `gstin` varchar(255) NOT NULL,
  `customers` text NOT NULL,
  `suppliers` text NOT NULL,
  `wallet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `password`, `role`, `category`, `code`, `status`, `created_at`, `gstin`, `customers`, `suppliers`, `wallet`) VALUES
(13, 'VPE Seller', 'admin@gmail.com', '7894561230', '$2b$10$QKECYM9FcgLgYHPD8/jkGeUSE0prXlj7JSP7GZjkCav3aq3N5dkry', 1, '1', '36EDA0', 3, '2023-05-02 21:14:19', '', '', '', 0),
(47, 'Saksham Goyal', 'sell@gmail.com', '+919602600423', '$2b$10$RTxfhO2j7XcOalcRryzl9ebn8fb6Y7cMvRiJ06z9GNZxwkSBNyeZ.', 2, '1', '64D1D6', 3, '2023-06-03 00:15:49', 'DNFH123654', '64D1D6,', 'B7CBCD,', 0),
(50, 'Saksham Goyal2', 'seller@gmail.com', '+919602600423', '$2b$10$FoDJcm10fJZbBBke61b97.hXCvhlOz3M8WZWao5mqSXwjHbG/l3C2', 2, '1', 'B7CBCD', 3, '2023-06-05 18:54:27', 'DNFH123654', '64D1D6,', 'B7CBCD,', 0),
(73, 'furniturte', 'fur@gmail.com', '7894561230', '$2b$10$giH0Cwgs20AhKiWZ4jCiC.nFDBEgr6zQ.KwZ/d3USoxtVobp39yUy', 2, '6', '0B2FD9', 3, '2023-07-03 19:27:49', 'GSTIN0001', '', '', 0),
(78, 'fashion', 'fashion@gmail.com', '7894561230', '$2b$10$OP6NdhmQgB84T.jnB30qye4SlRb36jNi.FZuOnOMA8xBdHJP3Ra2G', 2, '10', 'B6C441', 1, '2023-07-10 18:00:43', 'DNFH123654', '', '', 0),
(79, 'New Seller', 'newseller@gmail.com', '5646896165', '$2b$10$WcjNhbn/O/pu7AfOLxSWpuj9q4t4HYrArGnTIk.ck074QCknFqcVS', 2, '1', '8C9A7C', 3, '2023-09-12 00:06:45', 'dsaf', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price_b2b` int(11) NOT NULL,
  `price_b2c` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`id`, `name`, `price_b2b`, `price_b2c`, `image`, `product_id`, `description`, `qty`) VALUES
(6, 'Dummy Variant', 10000, 15000, 'public\\uploads\\1687599313483-team-4.jpg,', 33, 'This is the description for the variant only ', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_details`
--
ALTER TABLE `address_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`createdBy`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employer` (`employer`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delete` (`sender`),
  ADD KEY `delete user` (`reciever`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`,`subcategory_id`,`company_id`,`created_by`),
  ADD KEY `subcategory_id` (`subcategory_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_details`
--
ALTER TABLE `address_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address_details`
--
ALTER TABLE `address_details`
  ADD CONSTRAINT `address_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD CONSTRAINT `bank_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`employer`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `delete` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `delete user` FOREIGN KEY (`reciever`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variants`
--
ALTER TABLE `variants`
  ADD CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
