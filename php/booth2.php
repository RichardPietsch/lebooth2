<?php
	if(isset($_POST['action']) && !empty($_POST['action'])) {
		$action = $_POST['action'];
		switch($action) {
			case 'bootup' : bootup();break;
			case 'takepicture' : takepicture();break;
			case 'updatecounter' : updatecounter();break;
			default:break;
		}
}

	function bootup(){
	$startnumber = file_get_contents('imagecounter.txt');
	echo ($startnumber);
	}

	function takepicture(){
		//exec ('sudo gphoto2 --capture-image-and-download --filename "../images/capture-%Y%m%d-%H%M%S.%C" 2>&1',$out);
		exec ('sudo gphoto2 --capture-image-and-download --filename "../images/'.$_POST['imagecounter'].'.%C"',$out);
		echo($_POST['imagecounter']);
	}

	function updatecounter(){
		file_put_contents('imagecounter.txt',$_POST['newnumber'],LOCK_EX);
		echo(file_get_contents('imagecounter.txt'));
	}

?>
