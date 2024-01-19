<?
    include_once('./kurly_header.php');

    $adminId = $_POST['adminId'];

    $sql = "SELECT * FROM green_kurly_admin_table WHERE adminId='$adminId'";
    $res = mysqli_query($conn, $sql);

    // $res 안에 내용을 카운트 => mysqli_num_rows() 함수
    // 존재하는 아이디이면 중복된 아이디 이다. 
    if( mysqli_num_rows($res) >= 1 ){
        echo 1;
    }
    else{
        echo 0;
    }

?>