<?

    include_once('./kurly_header.php');

    $SQL = "CREATE TABLE green_kurly_cart_table (
        `idx`   INT  NOT NULL PRIMARY KEY  AUTO_INCREMENT,
        `userId`  VARCHAR(16)  NOT NULL,
        `번호`   VARCHAR(30)  NOT NULL,
        `이미지`  VARCHAR(250) NOT NULL,
        `제품명`  VARCHAR(100) NOT NULL,
        `할인율`  DOUBLE   NOT NULL,
        `판매가`  INT,
        `제품특징`  VARCHAR(100),
        `제조사`   VARCHAR(50),
        `제조일시`  VARCHAR(30),
        `판매처`   VARCHAR(50),
        `보관방법`  VARCHAR(20) NOT NULL,
        `배송`  VARCHAR(20),
        `옵션`  VARCHAR(20),
        `옵션상품목록` VARCHAR(250),
        `정가` INT  NOT NULL,
        `일시`  VARCHAR(30),
        `제품코드`  VARCHAR(250)  NOT NULL,
        `장바구니상품명`  VARCHAR(250),
        `수량`  INT  NOT NULL,
        `등록일`   TIMESTAMP  DEFAULT  CURRENT_TIMESTAMP  NOT NULL,        
        FOREIGN KEY(userId)  REFERENCES  green_kurly_table(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    $result = mysqli_query($conn, $SQL);

    if($result==false){
        echo "테이블 만들기 실패!!!";
    }
    else{
        echo "테이블 만들기 성공!!!";
    }
?>



