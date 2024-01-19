<?

    include_once('./kurly_header.php');

    // 리액트에서 폼전송한 데이터
    $userId       = $_POST['userId'];
    $userPw       = $_POST['userPw'];
    $userName     = $_POST['userName'];
    $userEmail    = $_POST['userEmail'];
    $userHp       = $_POST['userHp'];
    $userAddress  = $_POST['userAddress'];
    $userGender   = $_POST['userGender'];
    $userBirth    = $_POST['userBirth'];
    $userAddInput = $_POST['userAddInput'];
    $userService  = $_POST['userService'];

    $sql = "INSERT INTO green_kurly_table (userId, userPw, userName, userEmail, userHp, userAddress, userGender, userBirth, userAddInput, userService)
    VALUES ('$userId','$userPw','$userName','$userEmail','$userHp','$userAddress','$userGender','$userBirth','$userAddInput','$userService')";
    $result = mysqli_query($conn, $sql); 

    if($result===true){
        echo 1;
    }
    else{
        echo 0;
    }

   
?>