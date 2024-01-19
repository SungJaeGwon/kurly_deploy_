<?
    include_once('./kurly_header.php');

    $adminEmail = $_POST['adminEmail'];

    $sql = "SELECT * FROM green_kurly_admin_table WHERE adminEmail='$adminEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) >= 1 ){
        echo 1;
    }
    else{
        echo 0;
    }

?>