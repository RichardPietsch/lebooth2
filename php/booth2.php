<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'takePicture' : takePicture();break;

    }
}

function takePicture() {

    echo '0000-test';
}

?>
