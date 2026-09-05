
var station_data = {
        "station_1": ["남태령", "금호", "신이문", "문래", "산본", "방배", "월곡", "역촌"],
        "station_2": ["동작", "건대입구", "신길", "약수", "동대문", "노량진", "노원", "신사", "성수"],
        "station_3": ["잠실", "종로3가", "충무로", "동대문역사문화공원", "디지털미디어시티", "고속터미널", "영등포"],
        "station_4": ["신도림", "시청", "사당", "대곡", "홍대입구", "인천", "공덕"],
        "station_5": ["서울역", "김포공항", "용산", "왕십리", "수원", "청량리"]
    }

var station_1 = station_data["station_1"];
var station_2 = station_data["station_2"];
var station_3 = station_data["station_3"];
var station_4 = station_data["station_4"];
var station_5 = station_data["station_5"];


let all_station_index = station_1.concat(station_2.concat(station_3.concat(station_4.concat(station_5))));
var inventory = [];


$("html, body").css({overflow:'hidden'}).bind('touchmove');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function gacha() {
    // 1~1000 중에 확률 분배: 1성은 70%, 2성은 30%
    let probability = 1000;
    let station_1_rate = 400;
    let station_2_rate = 300;
    let station_3_rate = 150;
    let station_4_rate = 100;
    let station_5_rate = 50;
    var roulette = [];
    let current = 0;
    for(let i = 0; i<station_1.length; i++) {
        roulette.push(Math.floor(current += station_1_rate / station_1.length));
    }
    for(let i = 0; i<station_2.length; i++) {
        roulette.push(Math.floor(current += station_2_rate / station_2.length));
    }
    for(let i = 0; i<station_3.length; i++) {
        roulette.push(Math.floor(current += station_3_rate / station_3.length));
    }
    for(let i = 0; i<station_4.length; i++) {
        roulette.push(Math.floor(current += station_4_rate / station_4.length));
    }
    for(let i = 0; i<station_5.length; i++) {
        roulette.push(Math.floor(current += station_5_rate / station_5.length));
    }
    
    number = Math.random() * 1000;

    for(let i = 0; i<roulette.length;i++) {
        if (roulette[i]>number) {
            result = all_station_index[i];
            rarity = 1;
            if (station_1.includes(result)) {rarity = 1;}
            if (station_2.includes(result)) {rarity = 2;}
            if (station_3.includes(result)) {rarity = 3;}
            if (station_4.includes(result)) {rarity = 4;}
            if (station_5.includes(result)) {rarity = 5;}
            return [result, rarity]
        }
    }

}

function play() {
    $(".title").css('transition-duration', "1s");
    $(".title").css('transform', "translateX(80rem)");
    $("#gachabtn").css('transform', "translateX(-80rem)");
    $("#listbtn").css('transform', "translateX(80rem)");

    result = gacha();
    inventory.push(result);

    setTimeout(() => display(result), 1200);
    
}

function display(result) {
    $("#result").css(
        {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width":"100%",
            "height":"100%"
        }
    );

    // 페이지 생성
    $("#result").css("visibility", "visible");
    $("#rerollbtn").css("opacity", "1");
    $("#result img").css("opacity", "1")
    
    // 캡슐 뚜껑 회전
    $('.capsule_upper').css("transform", "rotateZ(50deg)");
    if (result[0]=="서울역") { $(".result-title").text(`${result[0]}`); }
    else {
        $(".result-title").text(`${result[0]}역`);
    }
    
    $(".result-rarity").text("◆".repeat(result[1]));
    if (result[1] > 3) {
        $(".result-rarity").css("color", "#e9d631")
    }
    

    sleep(500).then(() => {
        
        
        $(".result-title").css("opacity", "1");
        $(".result-rarity").css("opacity", "1");
        
        $(".result-title").css("font-size", "3rem");

    });

    sleep(1000).then(() => {
        if (result[1] > 3) {
            $(".result-rarity").css("filter", "drop-shadow(0 0 30px #e9d631")
        }
    });
    

    
}

function reset() {
    $("#result img, #result button").css("opacity", "0");
    $("#result").css("visibility", "hidden");
    sleep(50).then(() => {
        

        $(".title").css("transform", "translateX(0rem)");
        $('.capsule_upper').css("transform", "rotateZ(0deg)");

        $(".result-title").css("opacity", "0");
        $(".result-title").css("font-size", "2rem");
        $(".result-rarity").css("opacity", "0");
        $(".result-rarity").css("filter", "none");
        $(".result-rarity").css("color", "#0f0f0f");

        $("#gachabtn").css("transform", "translateX(0rem)");
        $("#listbtn").css("transform", "translateX(0rem)");




        $("#result").css("opacity", "1");


    });

    
}

function list() {
    $("#inspection").css(
        {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width":"100%",
            "height":"100%",
            "visibility": "visible",
            "transition-duration": "0.3s",
            "backdrop-filter": "blur(10px)"
        }
    );
    for(let i=0; i<inventory.length; i++) {
        if (inventory[i][1] > 3) {
            $("#inventory").append(`<h1>${inventory[i][0]} <span class="gold">${"◆".repeat(inventory[i][1])}</span></h1>`)
        } else {
            $("#inventory").append(`<h1>${inventory[i][0]} ${"◆".repeat(inventory[i][1])}</h1>`)
    
        }
    }

}

function closelist() {
    $("#inspection").css(
        {   
            "backdrop-filter": "blur(0px)",
            "visibility": "hidden"
        }
    );
    $("#inventory").html("")
}