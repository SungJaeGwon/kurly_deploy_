<?
    include_once('./kurly_header.php');

    $userId = 'gksmf519';
    $userPw = 'gksmf51912';

    $sql = "SELECT  userId, userName, userHp, userAddress 
            FROM    green_kurly_table 
            WHERE   userId='$userId' AND userPw='$userPw'";
    $res = mysqli_query($conn, $sql);

    // 로그인 회원인경우 데이터 응답
    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'"}';
    }
    else{
        echo '';
    }

?>