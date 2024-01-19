<?
    include_once('./kurly_header.php');

    $adminId = $_POST['adminId'];
    $adminHp = $_POST['adminHp'];
    $adminPw = $_POST['adminPw'];

    $sql = "UPDATE green_kurly_admin_table SET adminPw='$adminPw' WHERE adminId='$adminId'";
    $res = mysqli_query($conn, $sql);
 
    if( $res == true ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>


