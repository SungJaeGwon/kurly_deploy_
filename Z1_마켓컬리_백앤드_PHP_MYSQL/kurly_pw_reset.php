<?
    include_once('./kurly_header.php');

    $userId = $_POST['userId'];
    $userHp = $_POST['userHp'];
    $userPw = $_POST['userPw'];

    $sql = "UPDATE green_kurly_table SET userPw='$userPw' WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
 
    if( $res == true ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>