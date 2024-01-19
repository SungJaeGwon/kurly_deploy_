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


