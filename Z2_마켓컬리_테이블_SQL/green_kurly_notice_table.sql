--
-- 공지사항 게시판 테이블 구조 `green_kurly_notice_table`
--

CREATE TABLE `green_kurly_notice_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `wType` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wSubject` varchar(250) NOT NULL,
  `wContent` text NOT NULL,
  `wName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wId` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wHit` int DEFAULT NULL,
  `wDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  FOREIGN KEY(wId) REFERENCES  green_kurly_admin_table(adminId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
