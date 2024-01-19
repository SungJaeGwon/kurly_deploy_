<?
    include_once('./kurly_header.php');

    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];

    $sql = "SELECT userId, userGaib FROM green_kurly_table 
            WHERE userName='$userName' AND userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "가입일": "'.$record['userGaib'].'"}';
    }
    else{
        echo '';
    }

?>