<?
    include_once('./kurly_header.php');

    $userId = 'gksmf519';
    $userHp = '010-9965-4607';
    $userPw = '9999999999';

    $sql = "UPDATE green_kurly_table SET userPw='$userPw' WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
 
    if( !$res ){    
        echo "다시 시도해 주세요";        
    }
    else{
        echo "비밀번호가 변경되었습니다.";
    }

?>