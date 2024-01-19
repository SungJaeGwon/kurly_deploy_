<?
    include_once('./kurly_header.php');

    $adminId = $_POST['adminId'];
    $adminHp = $_POST['adminHp'];

    $sql = "SELECT * FROM green_kurly_admin_table 
            WHERE adminId='$adminId' AND adminHp='$adminHp'";
    $res = mysqli_query($conn, $sql);
 
    if( mysqli_num_rows($res) > 0 ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>