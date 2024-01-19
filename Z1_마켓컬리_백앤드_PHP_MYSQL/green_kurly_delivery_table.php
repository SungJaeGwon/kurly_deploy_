<?
    include_once('./kurly_header.php');

    $SQL = "CREATE TABLE `green_kurly_delivery_table` (
        `idx`   INT     NOT NULL    PRIMARY KEY     AUTO_INCREMENT  COMMENT '자동증가번호(PK)',
        `userId`    VARCHAR(16)     NOT NULL    COMMENT '회원 아이디 외래키(FK)',
        `받는분이름`  VARCHAR(50)     NULL    COMMENT '받는분 이름',
        `받는분휴대폰`  VARCHAR(13)    NULL    COMMENT '받는분 휴대폰',
        `기본배송지여부`  VARCHAR(10)   NULL   DEFAULT 'YES'  COMMENT '기본배송지여부',
        `배송시요청사항`  VARCHAR(250)   NULL   DEFAULT '문앞에 놓아주세요'  COMMENT '배송시요청사항',
        `우편번호`  VARCHAR(16)    NOT NULL    COMMENT '우편번호',
        `주소1`  VARCHAR(250)     NOT NULL    COMMENT '주소1',
        `주소2`  VARCHAR(250)     NOT NULL    COMMENT '주소2',
        `등록일시` TIMESTAMP    NULL    DEFAULT CURRENT_TIMESTAMP    COMMENT '등록일시',
        FOREIGN KEY(userId) REFERENCES green_kurly_table(userId)
    )  ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ";

    $result = mysqli_query($conn, $SQL);

    if($result==false){
        echo "배송지등록 테이블 등록 성공";
    }
    else{
        echo " 응 아냐";
    } 
    

    
   

?>