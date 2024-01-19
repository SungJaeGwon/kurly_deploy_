<?

include_once('./kurly_header.php');


$SQL = "CREATE TABLE green_kurly_admin_table (
    idx            INT           NOT NULL AUTO_INCREMENT,
    adminId        VARCHAR(16)   NOT NULL,
    adminPw        VARCHAR(16)   NOT NULL,   
    adminName      VARCHAR(50)   NOT NULL,
    adminEmail     VARCHAR(250)  NULL,
    adminHp        VARCHAR(13)   NULL,
    adminAddress   VARCHAR(500)  NULL,
    adminGaib      timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";



$result = mysqli_query($conn, $SQL);
if($result==false){
    echo "관리자 회원 테이블 만들기 실패!!!";
}
else{
    echo "관리자 회원 테이블 만들기 성공!!!";
}


?>



