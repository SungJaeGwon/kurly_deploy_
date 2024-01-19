<?
    include_once('./kurly_header.php');
    
   
    // 관리자 회원 가입 저장
    $sql = "INSERT INTO green_kurly_admin_table (adminId, adminPw, adminName, adminEmail, adminHp, adminAddress) VALUES 
            ('gksmf519','gksmf519123','이순신','gksmf5191@naver.com','010-9965-4607','서울시 강남구 논현동 123'),
            ('gksmf5191','gksmf519124','이소영','gksmf5192@naver.com','010-3248-7942','서울시 서초구 서초동 777'),
            ('gksmf5192','gksmf519125','김수정','gksmf5193@naver.com','010-6332-6441','서울시 서대문구 연희동 356'),
            ('gksmf5193','gksmf519126','조지현','gksmf5194@naver.com','010-8486-1234','서울시 중구 연수로 89'),
            ('gksmf5194','gksmf519127','정지연','gksmf5195@naver.com','010-9578-7890','서울시 강동구 길동 16')";

            
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo "관리자 회원 테이블 5명 저장 성공!";
    }
    else{
        echo "관리자 회원 테이블 5명 저장 실패!";
    }

?>