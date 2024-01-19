<?

    include_once('./kurly_header.php');

    // 리액트에서 폼전송한 데이터

    $adminId       = $_POST['adminId'];
    $adminPw       = $_POST['adminPw'];
    $adminName     = $_POST['adminName'];
    $adminEmail    = $_POST['adminEmail'];
    $adminHp       = $_POST['adminHp'];
    $adminAddress  = $_POST['adminAddress'];
    
    $sql = "INSERT INTO green_kurly_admin_table (adminId, adminPw, adminName, adminEmail, adminHp, adminAddress)
            VALUES ('$adminId','$adminPw','$adminName','$adminEmail','$adminHp','$adminAddress')";
    $result = mysqli_query($conn, $sql); 

    if($result===true){
        echo 1;
    }
    else{
        echo 0;
    }

   
?>