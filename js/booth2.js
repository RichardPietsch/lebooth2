var state;

$(document).ready(function(){

  state='IDLE';
  hello();

});

function hello(){
  //Let's listen to some clicks, no matter where:
  $("#maincontainer").click(onInteraction);
}


function onInteraction(e){

  if (e.target.id=="qrcode"){
    //Somebody tapped on the qr code, let's show them:
    state='QR-ACTIVE';
    //show help overlay
    $("#helpoverlay").css({display:'block'});
    $("#helpoverlay").animate({opacity:'1.0'},500);
  } else if (state=='QR-ACTIVE'){
    //hide help overlay
    $("#helpoverlay").animate({opacity:'0'},500,function(){
      $("#helpoverlay").css({display:'none'});
      state='IDLE';
    });
  }
  else if (state=='IDLE'){
    state='DONT-TOUCH';

    //animate some elements on the page
    $("#arrowup").css({opacity:0,top:'100px'});
    $("#arrowup").animate({opacity:1,top:'10px'},3000);
    $("#intro").animate({opacity:0});
    $("#qrcode").animate({opacity:0},500);

    //start count-down
    $("#cambtn").animate({opacity:0},100,function(){
      $("#countdown-3").animate({opacity:1},100,function(){
        $("#countdown-3").animate({transform: "scale(1.1)"},800,function(){
          $("#countdown-3").animate({opacity:0},100,function(){
            $("#countdown-2").animate({opacity:1},100,function(){
              $("#countdown-2").animate({transform: "scale(1.1)"},800,function(){
                $("#countdown-2").animate({opacity:0},100,function(){
                  $("#countdown-1").animate({opacity:1},100,function(){
                    $("#countdown-1").animate({transform: "scale(1.1)"},800,function(){
                      $("#countdown-1").animate({opacity:0},100,function(){
                        $("#flash").css({display:'block',opacity:1})
                        //and now actually take a pic...
                        takePicture();
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

  } else if (state=='USER-SELECT'){
    //user can make a choice now
    state='DONT-TOUCH'
    switch (e.target.id) {
      case "approvebtn":
      //user approved of the image
      $("#approvebtn").animate({opacity:0},250);
      $("#deletebtn").animate({opacity:0},250);
      $("#heart").animate({opacity:1},330);
      $(".shot").animate({width:'880px',height:'528px',top:'-24px',left:'-40px'},330,function(){
        $(".shot").delay(1000).animate({opacity:0},250,function(){
          $("#latestPhoto").empty();
          setToBeginning();
        })
        $("#heart").delay(1000).animate({opacity:0},250);
        $("#latestPhoto").delay(1000).animate({opacity:0},250);
      });
      break;
      case "deletebtn":
      //user wants to delete image
      $("#approvebtn").animate({opacity:0},250);
      $("#deletebtn").animate({opacity:0},250);
      $(".shot").animate({width:'0px',height:'0px',top:'480px',opacity:0},750,function(){
        $("#latestPhoto").empty();
        setToBeginning();
      });
      break;
      default:
      //oh that wasn't a valid interaction?
      state='USER-SELECT';
      break;

    }
  }
}

function takePicture(){
  //call some funny php
  $.ajax({ url: 'php/booth2.php',
  data: {action: 'takePicture'},
  type: 'post',
  success: function(output) {
    console.log('filename: ' + output);
    var lastPicture = output+".jpg";
    showLastPicture(lastPicture);
  }
});
}

function showLastPicture(filename){
  //show the latest picture
  console.log('Here is a new pic');
  $("#latestPhoto").empty();
  $("#latestPhoto").append("<img class='shot' src='shots/"+filename+"'>")
  $("#latestPhoto").css({opacity:1})
  $("#flash").animate({opacity:0},1000,function(){
    state='USER-SELECT'
    $("#flash").css({display:'none'});
    $("#arrowup").css({opacity:0});
    $("#approvebtn").animate({opacity:1},500);
    $("#deletebtn").delay(1000).animate({opacity:1},1000)
  });
}

function setToBeginning(){

  $("#qrcode").animate({opacity:1},500);
  $("#cambtn").animate({opacity:1},500,function(){
    $('#intro').animate({opacity:1},750);
    state='IDLE';
  });
}
