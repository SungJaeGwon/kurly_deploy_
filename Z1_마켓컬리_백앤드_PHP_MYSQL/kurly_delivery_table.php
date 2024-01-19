<?
    include_once('./kurly_header.php');

    $SQL = "CREATE TABLE green_kurly_delivery_table (
        `idx`            INT                 NOT NULL        PRIMARY KEY         AUTO_INCREMENT      COMMENT '자동증가번호(PK)',
        `userId`         VARCHAR(16)         NOT NULL                                                COMMENT '회원아이디(FK)',
        `받는분이름`      VARCHAR(50)         NULL                                                    COMMENT '받는분 이름',
        `받는분휴대폰`    VARCHAR(13)         NULL                                                    COMMENT '받는분 휴대폰',
        `기본배송지여부`  VARCHAR(10)         NULL            DEFAULT 'YES'                           COMMENT '기본배송지여부',
        `배송시요청사항`  VARCHAR(250)        NULL            DEFAULT 'YES'                           COMMENT '배송시요청사항',
        `우편번호`       VARCHAR(16)         NOT NULL                                                 COMMENT '우편번호',
        `주소1`          VARCHAR(250)        NOT NULL                                                 COMMENT '주소1',
        `주소2`          VARCHAR(250)        NOT NULL                                                 COMMENT '주소2',
        `등록일시`      timestamp            NULL            DEFAULT CURRENT_TIMESTAMP                COMMENT '등록일시',
        FOREIGN KEY(userId) REFERENCES green_kurly_table(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "배송지 테이블 생성 실패";
    }
    else{
        echo "배송지 테이블 생성 성공";
    }
?>