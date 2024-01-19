<?
    include_once('./kurly_header.php');

    $adminName = $_POST['adminName'];
    $adminHp = $_POST['adminHp'];

    $sql = "SELECT adminId, adminGaib FROM green_kurly_admin_table 
            WHERE adminName='$adminName' AND adminHp='$adminHp'";
    $res = mysqli_query($conn, $sql);

    // 회원 아이디와 가입일자 응답 => JSON 형식으로 응답
    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['adminId'].'", "가입일": "'.$record['adminGaib'].'"}';
    }
    else{
        echo '';
    }

?>