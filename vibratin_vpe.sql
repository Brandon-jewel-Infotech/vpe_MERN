-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2024 at 07:10 PM
-- Server version: 8.0.37
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vibratin_vpe`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_details`
--

CREATE TABLE `address_details` (
  `id` int NOT NULL,
  `gmap_link` varchar(255) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `aadhar_pic` text,
  `user_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address_details`
--

INSERT INTO `address_details` (`id`, `gmap_link`, `address_line_1`, `address_line_2`, `city`, `state`, `zip`, `aadhar_pic`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'link', NULL, NULL, 'city', 'state', '789654', 'public/uploads/undefined', 86, '2024-04-27 20:26:18', '2024-04-27 20:26:18'),
(2, 'link', NULL, NULL, 'city', 'state', '789654', 'public/uploads/undefined', 87, '2024-04-27 20:27:30', '2024-04-27 20:27:30'),
(3, 'asdfklsadkf.asdfiasdfos.sadfoasdfosadf', NULL, NULL, 'sdfg', 'sdfgsdfg', '4354542', '', 89, '2024-05-06 05:32:08', '2024-06-13 11:06:01'),
(4, 'oadssdjkfo', NULL, NULL, 'jiofadsjofijadf', 'ojfioasdjof', 'iofadsojfoadf', 'public/uploads/undefined', 91, '2024-05-06 06:29:42', '2024-05-06 06:29:42'),
(5, 'asdfnokadsnf', NULL, NULL, 'nfdijsanfk', 'jnk', 'kfnd', 'public/uploads/undefined', 93, '2024-05-06 06:32:15', '2024-05-06 06:32:15'),
(6, 'l', NULL, NULL, 'nfo', 'dlsnlnfl', 'nsk', 'public/uploads/undefined', 96, '2024-05-06 06:33:54', '2024-05-06 06:33:54'),
(7, 'l', NULL, NULL, 'nfo', 'dlsnlnfl', 'nsk', 'public/uploads/undefined', 98, '2024-05-06 06:39:50', '2024-05-06 06:39:50');

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` int NOT NULL,
  `holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_address` varchar(255) DEFAULT NULL,
  `upi` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bank_details`
--

INSERT INTO `bank_details` (`id`, `holder_name`, `account_number`, `ifsc_code`, `bank_name`, `bank_address`, `upi`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, NULL, '7189234261548', 'ABC00123', 'Bank', 'Bank address', 'upi@bank', 87, '2024-04-27 20:27:30', '2024-04-27 20:27:30'),
(2, NULL, '23930490348', 'asdfds43', 'jncjsn', 'njkjkk', 'sdfdsd', 89, '2024-05-06 05:32:08', '2024-05-06 05:32:08'),
(3, NULL, '238042932389', 'asdnfn', 'nkasdnfasdnf', 'nlka', 'ksadfjkasdjn', 91, '2024-05-06 06:29:42', '2024-05-06 06:29:42'),
(4, NULL, '39203', 'knnjknj', 'nl', 'knjkn', 'knkkjnk', 93, '2024-05-06 06:32:15', '2024-05-06 06:32:15'),
(5, NULL, '34343', 'mladskfnadslkf', 'lkasdfamsdf', 'lmskdfamsdlf', 'skdnfalfdknlsd', 96, '2024-05-06 06:33:54', '2024-05-06 06:33:54'),
(6, NULL, '34343', 'mladskfnadslkf', 'lkasdfamsdf', 'lmskdfamsdlf', 'skdnfalfdknlsd', 98, '2024-05-06 06:39:50', '2024-05-06 06:39:50');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int NOT NULL,
  `createdBy` int DEFAULT NULL,
  `qty` int DEFAULT '0',
  `total` int DEFAULT '0',
  `variant_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Electronic', '2024-04-22 16:04:25', '2024-06-12 09:06:06'),
(6, 'Furniture', '0000-00-00 00:00:00', '2024-06-12 09:04:40'),
(10, 'Fashion', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Hardware', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Accessories', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Test Updated', '2024-07-10 12:48:12', '2024-07-10 12:48:27');

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

CREATE TABLE `coins` (
  `id` int NOT NULL,
  `numOfCoins` int DEFAULT NULL,
  `perUnit` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `contact`, `whatsapp`, `email`, `createdAt`, `updatedAt`) VALUES
(4, 'Test Company', '2212122112', '4323432343', 'test@gmail.com', '2024-06-13 04:59:42', '2024-06-13 04:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int NOT NULL,
  `employer` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `wallet` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employer`, `name`, `email`, `password`, `contact`, `role`, `wallet`, `createdAt`, `updatedAt`) VALUES
(3, 50, 'Test Employee', 'asdf@adf.adsf', '$2b$10$9cOCRX8Z5bkkIimMBQp4Rud1QGsMY0oi8M.NglLsKd8F5NvbOT6Ya', '3232232332', 4, 0, '2024-06-26 05:36:26', '2024-06-26 05:36:26');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `url` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `variant_id`, `url`, `createdAt`, `updatedAt`) VALUES
(16, 18, NULL, '/public/products/f0ff1f34-fdfe-482e-863e-fb8fcb487335-1719387874926.jpg', '2024-06-26 07:44:35', '2024-06-26 07:44:35'),
(17, 18, NULL, '/public/products/86b8e1ed-6795-4b80-b067-24251c5a8403-1719387874928.jpg', '2024-06-26 07:44:35', '2024-06-26 07:44:35'),
(18, 18, NULL, '/public/products/6ca8da54-3edf-4f2d-b230-38842df6a10b-1719387874929.jpg', '2024-06-26 07:44:35', '2024-06-26 07:44:35'),
(19, 18, NULL, '/public/products/15954830-fd50-412d-811a-def455536d6d-1719387874929.jpg', '2024-06-26 07:44:35', '2024-06-26 07:44:35'),
(20, 18, NULL, '/public/products/9978b143-be55-45e2-8dff-2b18741d85a0-1719387874932.jpg', '2024-06-26 07:44:35', '2024-06-26 07:44:35'),
(41, 17, NULL, '/public/products/f407f150-05b5-4423-9424-a9e210e75765-1719567404254.png', '2024-06-28 09:36:46', '2024-06-28 09:36:46'),
(43, NULL, 7, '/public/products/27b708cb-24fe-4041-8171-505651519f1b-1719567414321.png', '2024-06-28 09:36:54', '2024-06-28 09:36:54'),
(44, NULL, 9, '/public/products/e88a5e29-180a-43b8-a428-caad4c32844c-1719567420541.png', '2024-06-28 09:37:00', '2024-06-28 09:37:00'),
(56, 19, NULL, '/public/products/8b881b12-ef9d-47c1-bc34-6f1e73e21f8d-1719907381891.png', '2024-07-02 08:03:05', '2024-07-02 08:03:05'),
(57, NULL, 10, '/public/products/df6ed7bd-23a6-4194-bb98-5e69b398fb29-1719907497769.png', '2024-07-02 08:04:58', '2024-07-02 08:04:58'),
(58, 17, NULL, '/public/products/fb193431-e7b0-41b4-870c-923c29a8e637-1720616299294.jpg', '2024-07-10 12:58:19', '2024-07-10 12:58:19'),
(59, NULL, 7, '/public/products/7ef0049e-27dc-4d0c-9f32-2daf11c381e5-1720616311727.jpg', '2024-07-10 12:58:34', '2024-07-10 12:58:34');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `sender` int DEFAULT NULL,
  `reciever` int DEFAULT NULL,
  `content` text,
  `status` int DEFAULT '3',
  `seen` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `receiver` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sender`, `reciever`, `content`, `status`, `seen`, `createdAt`, `updatedAt`, `receiver`) VALUES
(44, NULL, 50, 'Order request for Test Product   processed successfully by Saksham Goyal2', 3, 1, '2024-07-10 13:16:27', '2024-07-10 13:16:27', NULL),
(45, NULL, 50, 'Order request for Test Product   replied by Saksham Goyal2', 3, 1, '2024-07-10 13:16:44', '2024-07-10 13:16:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `createdBy` int NOT NULL,
  `receiver` int NOT NULL,
  `stage` int DEFAULT '1',
  `prod_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `prices` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_lists`
--

CREATE TABLE `order_lists` (
  `id` int NOT NULL,
  `createdBy` int NOT NULL,
  `receiver` int NOT NULL,
  `prod_id` int NOT NULL,
  `stage` int NOT NULL,
  `qty` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `prices` int NOT NULL,
  `order_group` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_lists`
--

INSERT INTO `order_lists` (`id`, `createdBy`, `receiver`, `prod_id`, `stage`, `qty`, `variant_id`, `prices`, `order_group`, `createdAt`, `updatedAt`) VALUES
(5, 50, 50, 18, 4, 2, NULL, 64, 1, '2024-07-03 10:01:34', '2024-07-10 13:07:58'),
(6, 50, 50, 19, 6, 9, 10, 288, 1, '2024-07-03 10:01:34', '2024-07-10 13:08:02'),
(7, 50, 50, 18, 3, 1, NULL, 32, 2, '2024-07-03 10:03:48', '2024-07-06 07:30:36'),
(8, 50, 50, 19, 4, 1, 10, 32, 3, '2024-07-03 10:05:31', '2024-07-09 11:06:42'),
(9, 50, 50, 18, 6, 18, NULL, 576, 4, '2024-07-10 13:15:21', '2024-07-10 13:16:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price_b2b` int NOT NULL,
  `price_b2c` int NOT NULL,
  `category_id` int NOT NULL,
  `subCategory_id` int NOT NULL,
  `company_id` int NOT NULL,
  `availability` int NOT NULL DEFAULT '1',
  `description` text NOT NULL,
  `instock` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `reward_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price_b2b`, `price_b2c`, `category_id`, `subCategory_id`, `company_id`, `availability`, `description`, `instock`, `created_by`, `reward_id`, `createdAt`, `updatedAt`) VALUES
(17, 'asdfasdf', 23, 42, 1, 4, 4, 23, 'fadssdfasdf\ndasfasdf\nadsf\nasd\nf', 0, 50, NULL, '2024-06-19 12:09:47', '2024-07-10 13:00:54'),
(18, 'Test Product ', 32, 324, 1, 2, 4, 2, 'This is the description for test product', 0, 50, NULL, '2024-06-26 07:44:34', '2024-07-10 13:15:21'),
(19, 'New Test Product', 43, 534, 1, 4, 4, 32, 'This is description for new test product', 1, 50, NULL, '2024-07-02 08:03:01', '2024-07-02 08:03:01');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int NOT NULL,
  `createdBy` int NOT NULL,
  `description` text,
  `status` int DEFAULT '1' COMMENT '1 is pending ',
  `role` int NOT NULL DEFAULT '0',
  `receiver` int NOT NULL DEFAULT '0',
  `response` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `createdBy`, `description`, `status`, `role`, `receiver`, `response`, `createdAt`, `updatedAt`) VALUES
(1, 87, NULL, 2, 0, 0, '', '2024-04-27 20:27:30', '2024-04-27 20:52:50'),
(2, 89, NULL, 2, 0, 0, 'Test response', '2024-05-06 05:32:08', '2024-06-13 11:06:00'),
(3, 91, NULL, 1, 0, 0, NULL, '2024-05-06 06:29:42', '2024-05-06 06:29:42'),
(4, 93, NULL, 1, 0, 0, NULL, '2024-05-06 06:32:15', '2024-05-06 06:32:15'),
(5, 96, NULL, 1, 0, 0, NULL, '2024-05-06 06:33:54', '2024-05-06 06:33:54'),
(6, 98, NULL, 1, 0, 0, NULL, '2024-05-06 06:39:50', '2024-05-06 06:39:50'),
(7, 13, 'I want to request a new category : fssdfadsafdasd fsadflsa dfsadf', 1, 2, 0, NULL, '2024-05-14 08:33:44', '2024-05-14 08:33:44'),
(8, 50, 'I want to request a new sub category (Heater) under category id (1) named (Electronic) ', 1, 2, 0, NULL, '2024-06-15 07:49:05', '2024-06-15 07:49:05'),
(9, 50, 'I want to request a new company  : \n        \nCompany Name : Test Company 1 \n        \nCompany Toll Free : 3234443443\n        \nCompany Whatsapp Number : 3443344334\n        \nCompany Email : sdfasdf@asdf.adsf', 1, 2, 0, NULL, '2024-06-15 09:10:23', '2024-06-15 09:10:23'),
(10, 50, 'I want to request a new sub category (Test Sub Category Request) under category id (1) named (Electronic) ', 1, 2, 0, NULL, '2024-06-15 09:19:55', '2024-06-15 09:19:55'),
(11, 50, 'I want to request a new sub category (Test request) under category id (1) named (Electronic) ', 2, 2, 0, 'Test response', '2024-07-10 12:54:39', '2024-07-10 12:55:47');

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `coins` varchar(255) NOT NULL DEFAULT '0',
  `stage` int NOT NULL DEFAULT '1',
  `status` int NOT NULL,
  `conditions` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cat_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `cat_id`, `createdAt`, `updatedAt`) VALUES
(1, 'LED', 1, '2024-04-22 16:04:49', '2024-04-22 16:04:49'),
(2, 'Washing Machine', 1, '2024-04-22 16:04:49', '2024-04-22 16:04:49'),
(4, 'AC', 1, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(5, 'Refrigerator', 1, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(6, 'Chair', 6, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(7, 'Table', 6, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(9, 'Lawn', 6, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(10, 'Mens', 10, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(11, 'Screwdriver', 11, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(12, 'Watch', 12, '2024-04-22 16:34:49', '2024-04-22 16:34:49'),
(16, 'Test', 1, '2024-07-10 12:47:59', '2024-07-10 12:47:59'),
(17, 'Test 12', 19, '2024-07-10 12:48:20', '2024-07-10 12:48:20');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `txn_image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL COMMENT '1 is admin\r\n2 is seller\r\n3 is employee\r\n4 is moderator\r\n',
  `categoryId` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` int NOT NULL COMMENT '1 is pending\r\n2 is accepted\r\n3 is rejected\r\n4 is declined',
  `gstin` varchar(255) NOT NULL,
  `customers` text,
  `suppliers` text,
  `wallet` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `password`, `role`, `categoryId`, `code`, `status`, `gstin`, `customers`, `suppliers`, `wallet`, `createdAt`, `updatedAt`) VALUES
(13, 'VPE Seller', 'admin@gmail.com', '7894561230', '$2b$10$QKECYM9FcgLgYHPD8/jkGeUSE0prXlj7JSP7GZjkCav3aq3N5dkry', 1, 1, '36EDA0', 3, '', '', '', 0, '2023-05-02 21:14:19', '2024-04-22 16:37:14'),
(47, 'Saksham Goyal', 'sell@gmail.com', '+919602600423', '$2b$10$RTxfhO2j7XcOalcRryzl9ebn8fb6Y7cMvRiJ06z9GNZxwkSBNyeZ.', 2, 1, '64D1D6', 3, 'DNFH123654', '64D1D6,', 'B7CBCD,', 0, '2023-06-03 00:15:49', '2024-04-22 16:37:14'),
(50, 'Saksham Goyal2', 'seller@gmail.com', '+919602600423', '$2b$10$FoDJcm10fJZbBBke61b97.hXCvhlOz3M8WZWao5mqSXwjHbG/l3C2', 2, 1, 'B7CBCD', 2, 'DNFH123654', '64D1D6,', 'B7CBCD,', 0, '2023-06-05 18:54:27', '2024-07-10 12:55:47'),
(73, 'furniturte', 'fur@gmail.com', '7894561230', '$2b$10$giH0Cwgs20AhKiWZ4jCiC.nFDBEgr6zQ.KwZ/d3USoxtVobp39yUy', 2, 6, '0B2FD9', 3, 'GSTIN0001', '', '', 0, '2023-07-03 19:27:49', '2024-04-22 16:37:14'),
(78, 'fashion', 'fashion@gmail.com', '7894561230', '$2b$10$OP6NdhmQgB84T.jnB30qye4SlRb36jNi.FZuOnOMA8xBdHJP3Ra2G', 2, 10, 'B6C441', 1, 'DNFH123654', '', '', 0, '2023-07-10 18:00:43', '2024-04-22 16:37:14'),
(79, 'New Seller', 'newseller@gmail.com', '5646896165', '$2b$10$WcjNhbn/O/pu7AfOLxSWpuj9q4t4HYrArGnTIk.ck074QCknFqcVS', 2, 1, '8C9A7C', 3, 'dsaf', '', '', 0, '2023-09-12 00:06:45', '2024-04-22 16:37:14'),
(80, 'Name', 'Name', 'Name', '$2b$10$DC88mg.DyYhDn8ilqAfQEuCBLz7dlaeR2O/Noyr8tz02sjlwTWrry', 2, 1, '2FBF46', 1, 'Name', NULL, NULL, NULL, '2024-04-27 19:27:57', '2024-04-27 19:27:57'),
(81, 'Demo', 'demo@gmail.com', '7896541230', '$2b$10$74hgChYwzzd.gdFg.mJrhekiwPdky/dTqNomghRaWuPcsGisc8FS2', 2, 1, 'F56EB6', 1, '7986545120.0', NULL, NULL, NULL, '2024-04-27 20:16:38', '2024-04-27 20:16:38'),
(84, 'Demo', 'demo3@gmail.com', '7896541230', '$2b$10$FC8/KujDL6gLNdVpjg4acOaGUW16BUNvlWYQIsdkCUW4tR1UL5KGW', 2, 1, '58C2F1', 1, '7986545120.0', NULL, NULL, NULL, '2024-04-27 20:23:52', '2024-04-27 20:23:52'),
(86, 'Demo', 'demoac@gmail.com', '7896541230', '$2b$10$1IPkDtiomgpDmWKFDETN8O/I/NtQr0BwVWnt9soXFc5OIBh.9iNse', 2, 1, 'A880DB', 1, '7986545120.0', NULL, NULL, NULL, '2024-04-27 20:26:18', '2024-04-27 20:26:18'),
(87, 'Demo', 'demoacs@gmail.com', '7896541230', '$2b$10$upab0UHZy7Qz0baHJeLUYupIM5dKkbyQeq68YXFFmx6.2kFxX0OD.', 2, 1, '6590A1', 1, '7986545120.0', NULL, NULL, NULL, '2024-04-27 20:27:30', '2024-04-27 20:27:30'),
(88, 'Anuraag', 'anuraagchetia77@gmail.com', '9365631300', '$2b$10$E/9ZjALOSoNS.y8dw91aFO03mgzesMDsVTsTn3pCQTzktU6K2Upae', 2, 1, 'CD6829', 1, 'GST12', NULL, NULL, NULL, '2024-04-27 20:49:40', '2024-04-27 20:49:40'),
(89, 'Test', 'asdffdsa@sfdg.com', '23344555632', '$2b$10$Ai0dKLb85ngC5fzg/mdqB.pS5.clMaq5OD5i0JRwcpdIjzA1VOWMO', 2, 10, '51DF78', 2, 'adsfasdjfo', NULL, NULL, NULL, '2024-05-06 05:32:07', '2024-06-13 11:06:01'),
(91, 'adsfadfasdfs', 'fodsao@asdif.asdf', '4380493324', '$2b$10$IruFtamUYk5g.qtjWKm8ZuZOiz8AB.iaGFpG/dncelgN42g4MMWqW', 2, 10, '66DAC9', 1, 'akjdsfkasdf', NULL, NULL, NULL, '2024-05-06 06:29:42', '2024-05-06 06:29:42'),
(93, 'dskfdnfa', 'jnfksadnf@asd.adsf', '43u84383948', '$2b$10$BhYgzgWy2u.V.MQN0c2CJOTjBpXwt0oBq1N0PJghw46V3hUSXmcrS', 2, 10, 'E5E3FB', 1, 'sadkfakdnf', NULL, NULL, NULL, '2024-05-06 06:32:15', '2024-05-06 06:32:15'),
(96, 'askadfmklad', 'nadskfnad@klasskmdfasd.fas', 'lndlsasakf', '$2b$10$UiH9Focgn/mzcG5Xk6Jt8eIrBwAt8bejHzDgfll8C.fZ.omlrlp2i', 2, 12, 'E1430B', 1, 'sdkfnakdf', NULL, NULL, NULL, '2024-05-06 06:33:54', '2024-05-06 06:33:54'),
(98, 'askadfmklad', 'nadskfnaasdfd@klasskmdfasd.fas', 'lndlsasakf', '$2b$10$YrbD7pub5D95vxsxvOlZTePijUxm0FYkfoTUUD5PjYdbWrcKkhWlG', 2, 12, '4DE922', 1, 'sdkfnakdf', NULL, NULL, NULL, '2024-05-06 06:39:50', '2024-05-06 06:39:50');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price_b2b` int NOT NULL,
  `price_b2c` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`id`, `name`, `price_b2b`, `price_b2c`, `product_id`, `description`, `qty`, `createdAt`, `updatedAt`) VALUES
(7, 'Test Variant 1', 32, 232, 17, 'asdfasd a sdf asd f ', 34, '2024-06-25 11:36:45', '2024-07-10 12:57:56'),
(9, 'Test Variant 3', 24, 534, 17, 'adsjfads fasdif asdfnas', 231, '2024-06-25 11:37:43', '2024-07-03 10:01:34'),
(10, 'Test Variant 1', 32, 545, 19, 'This is test variant 1 description', 89, '2024-07-02 08:04:57', '2024-07-03 10:05:31');

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
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `variant_id` (`variant_id`),
  ADD KEY `product_id` (`product_id`);

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
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employer` (`employer`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `reciever` (`reciever`),
  ADD KEY `receiver` (`receiver`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `receiver` (`receiver`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `order_lists`
--
ALTER TABLE `order_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `receiver` (`receiver`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subCategory_id` (`subCategory_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `reward_id` (`reward_id`);

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
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `code_2` (`code`),
  ADD KEY `categoryId` (`categoryId`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_lists`
--
ALTER TABLE `order_lists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address_details`
--
ALTER TABLE `address_details`
  ADD CONSTRAINT `address_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD CONSTRAINT `bank_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_4` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_5` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`employer`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`reciever`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order_lists`
--
ALTER TABLE `order_lists`
  ADD CONSTRAINT `order_lists_ibfk_5` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_lists_ibfk_6` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_lists_ibfk_7` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_lists_ibfk_8` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_10` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_6` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_7` FOREIGN KEY (`subCategory_id`) REFERENCES `subcategories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_8` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_9` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `variants`
--
ALTER TABLE `variants`
  ADD CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
