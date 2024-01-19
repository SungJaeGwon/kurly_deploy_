-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-11-14 17:42
-- 서버 버전: 8.0.34
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `moonjong`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `green_kurly_table`
--

CREATE TABLE `green_kurly_table` (
  `userId` varchar(16) NOT NULL,
  `userPw` varchar(16) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(250) NOT NULL,
  `userHp` varchar(13) NOT NULL,
  `userAddress` varchar(250) NOT NULL,
  `userGender` varchar(4) DEFAULT NULL,
  `userBirth` varchar(10) DEFAULT NULL,
  `userAddInput` varchar(250) DEFAULT NULL,
  `userService` varchar(1000) NOT NULL,
  `userGaib` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`userId`) 
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


+--------------+---------------+------+-----+-------------------+-------------------+
| Field        | Type          | Null | Key | Default           | Extra             |
+--------------+---------------+------+-----+-------------------+-------------------+
| userId       | varchar(16)   | NO   | PRI | NULL              |                   |
| userPw       | varchar(16)   | NO   |     | NULL              |                   |
| userName     | varchar(50)   | NO   |     | NULL              |                   |
| userEmail    | varchar(250)  | NO   |     | NULL              |                   |
| userHp       | varchar(13)   | NO   |     | NULL              |                   |
| userAddress  | varchar(250)  | NO   |     | NULL              |                   |
| userGender   | varchar(4)    | YES  |     | NULL              |                   |
| userBirth    | varchar(10)   | YES  |     | NULL              |                   |
| userAddInput | varchar(250)  | YES  |     | NULL              |                   |
| userService  | varchar(1000) | NO   |     | NULL              |                   |
| userGaib     | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+---------------+------+-----+-------------------+-------------------+
11 rows in set (0.01 sec)

--
-- 테이블의 덤프 데이터 `green_kurly_table`
--

INSERT INTO `green_kurly_table` (`userId`, `userPw`, `userName`, `userEmail`, `userHp`, `userAddress`, `userGender`, `userBirth`, `userAddInput`, `userService`, `userGaib`) VALUES
('moonjong', 'moonjong123', '이순신', 'moonjong@naver.com', '010-7942-5305', '서울시 신촌로 우리집', '여성', '1970-09-29', '추천인 아이디 moonjong', '이용약관동의 필수 내용 3가지 입력', '2023-11-14 06:53:52'),
('moonseonjong', 'moonjong123', '문선종', 'moonseonjong@naver.com', '010-7942-5305', '(03785) 서울 서대문구 신촌로1길 5  (창천동) 567', '남자', '1970-9-9', '친구초대 추천인 아이디 moonjong ', '이용약관 동의(필수),개인정보 수집∙이용 동의(필수),개인정보 수집∙이용 동의(선택),무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택),SNS,이메일,본인은 만 14세 이상입니다.(필수)', '2023-11-14 07:06:52');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `green_kurly_table`
--
ALTER TABLE `green_kurly_table`
  ADD PRIMARY KEY (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
