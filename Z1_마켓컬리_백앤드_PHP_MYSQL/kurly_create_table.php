<?

include_once('./kurly_header.php');


$SQL = "CREATE TABLE green_kurly_table (
    userId        VARCHAR(16)   NOT NULL,
    userPw        VARCHAR(16)   NOT NULL,   
    userName      VARCHAR(50)   NOT NULL,
    userEmail     VARCHAR(250)  NOT NULL,
    userHp        VARCHAR(13)   NOT NULL,
    userAddress   VARCHAR(250)  NOT NULL,
    userGender    VARCHAR(4)    NULL,
    userBirth     VARCHAR(10)   NULL,
    userAddInput  VARCHAR(250)  NULL,
    userService   VARCHAR(1000) NOT NULL,
    userGaib      timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";

$result = mysqli_query($conn, $SQL);
if($result==false){
    echo "테이블 만들기 실패!!!";
}
else{
    echo "테이블 만들기 성공!!!";
}


?>



