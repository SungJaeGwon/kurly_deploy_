--
-- 장바구니 테이블 구조 `green_kurly_cart_table`
--

CREATE TABLE green_kurly_cart_table (
    `idx`   INT  NOT NULL  AUTO_INCREMENT  COMMENT '장바구니 고유번호 기본키 PK',
    `userId`  VARCHAR(16)  NOT NULL  COMMENT '회원아이디 외래키 FK 회원테이블 참조',
    `번호`   VARCHAR(30)  NOT NULL  COMMENT '상품 번호',
    `이미지`  VARCHAR(250) NOT NULL  COMMENT '상품 이미지',
    `제품명`  VARCHAR(100) NOT NULL  COMMENT '제품명',
    `할인율`  DOUBLE   NOT NULL  COMMENT '할인율',
    `판매가`  INT  COMMENT '판매가',
    `제품특징`  VARCHAR(100) COMMENT '제품특징',
    `제조사`   VARCHAR(50) COMMENT '제조사',
    `제조일시`  VARCHAR(30) COMMENT '제조일시',
    `판매처`   VARCHAR(50) COMMENT '판매처',
    `보관방법`  VARCHAR(20) NOT NULL COMMENT '보관방법',
    `배송`  VARCHAR(20)   COMMENT '판매처',
    `옵션`  VARCHAR(20)   COMMENT '옵션',
    `옵션상품목록` VARCHAR(250)  COMMENT '제품특징',
    `정가` INT  NOT NULL  COMMENT '정가',
    `일시`  VARCHAR(30) COMMENT '일시',
    `제품코드`  VARCHAR(250)  NOT NULL COMMENT '제품코드 번호+옵션상품명',
    `장바구니상품명`  VARCHAR(250) COMMENT '옵션목록 상품명',
    `수량`  INT  NOT NULL COMMENT '수량',
    `등록일`   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '등록일',
    PRIMARY KEY(`idx`),    
    FOREIGN KEY(`userId`)  REFERENCES  green_kurly_table(`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci  COMMENT '장바구니 고유번호 기본키 PK';