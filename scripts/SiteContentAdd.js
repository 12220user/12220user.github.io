// exemple 0 name | 1 main icon | 2 width | 3 height | 4 text(small) | 5 text(Large)
let data=[
    // 1 item Shop item
    [   
        "Shop Tool" , './img/shop-tool-data/ShopToolLogo.png',
        700,700, 
        'Shop tool - a tool for quickly and conveniently creating an in-game store and filling it.',
        '<div class=\\\'1\\\'><h2>Name</h2><p>Hello world</p></div>'
    ]
    ,
    // 2 item testex
    [   
        "Tested" , './img/bg-code-blur.png',
        1000,700, 
        "this item createt becouse me need test site content maker system.",
        "<div class=\\\'1\\\'> <h2>Name</h2> <p><span class=\\\'r-text\\\'>Hello</span> world</p></div>"
    ]

];


let container = document.getElementById("content");
let fullscreemFrame = document.getElementById("frame");
//fullscreemFrame.style.display = 'none';


function GetHTMLBlock(name,w ,h , smtext , img , fullData){
    return '<div class="project-block" style="width: '+w+'px; height: '+h+'px">'+
    '<div class="bg-project-block" style="background-image: url('+ img +');">' +
        '<div class="focus-content">' +
            '<div class="prg-foc-content">'+
                '<div class="text">'+
                    '<h2>'+name+'</h2>'+
                    '<p>'+smtext+'</p>'+
                '</div>'+
                '<br>'+
                '<div class="button" onclick="OnClickEvent(\''+name+'\' , \''+fullData+'\')">Open</div>'+
            '</div></div></div></div>';
}

function SetObject(obj){
    container.innerHTML += GetHTMLBlock(obj[0] , obj[2] , obj[3] , obj[4] , obj[1], obj[5]);
}

function OnClickEvent(name , _data){
    fullscreemFrame.style.display ='block';

    //open
    document.getElementById('frame-header-name').innerText = name;
    document.getElementById('fullscreen-data-content').innerHTML = _data;
}

function Exit(){
    fullscreemFrame.style.display ='none';
}

for(let i = 0 ; i < data.length; i++)
{
    SetObject(data[i]);
}