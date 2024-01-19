--
-- 관리자 테이블 구조 `green_kurly_admin_table`
--

CREATE TABLE `green_kurly_admin_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `adminId` varchar(16) NOT NULL,
  `adminPw` varchar(16) NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `adminEmail` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adminHp` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adminAddress` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adminGaib` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
