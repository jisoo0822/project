$(document).ready(function(){
    $(".sub_menu").hide();
    $(".nav_title>a").click(function(){
        $(".sub_menu").stop().slideToggle(200);
    });
});