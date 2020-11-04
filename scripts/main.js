$(window).scroll(function () { 
    $("#head").attr("class" , $(window).scrollTop() > 820?"head__bar":"");
});