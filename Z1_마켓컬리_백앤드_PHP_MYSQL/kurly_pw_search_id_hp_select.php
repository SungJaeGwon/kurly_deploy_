<?
    include_once('./kurly_header.php');

    $userId = $_POST['userId'];
    $userHp = $_POST['userHp'];

    $sql = "SELECT * FROM green_kurly_table 
            WHERE userId='$userId' AND userHp='$userHp'";
    $res = mysqli_query($conn, $sql);
 
    if( mysqli_num_rows($res) > 0 ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>