<?
    include_once('./kurly_header.php');
    
    
    $adminId       = "gksmf519";
    $adminPw       = "gksmf519123";
    $adminName     = "이순신";    
    $adminEmail    = "gwonsj94@naver.com";
    $adminHp       = "010-9965-4607";
    $adminAddress  = "서울시 신촌로 우리집";
   
    // 관리자 회원 가입 저장
    $sql = "INSERT INTO green_kurly_admin_table (adminId, adminPw, adminName, adminEmail, adminHp, adminAddress)
            VALUES ('$adminId','$adminPw','$adminName','$adminEmail','$adminHp','$adminAddress')";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo "관리자 회원 테이블 저장 성공!";
    }
    else{
        echo "관리자 회원 테이블 저장 실패!";
    }

?>