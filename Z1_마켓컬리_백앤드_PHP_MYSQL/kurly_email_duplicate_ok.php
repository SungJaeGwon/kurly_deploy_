<?
    include_once('./kurly_header.php');

    $userEmail = $_POST['userEmail'];

    $sql = "SELECT * FROM green_kurly_table WHERE userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo 1;
    }
    else{
        echo 0;
    }

?>