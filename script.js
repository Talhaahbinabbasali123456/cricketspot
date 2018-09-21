let odiRanking = [
"1 England",
"2 India",
"3 New Zealand",
"4 South Arfrica",
"5 Pakistan",
"6 Autrailia",
"7 Bangladesh",
"8 Srilanka",
"9 Westindies",
"10 Afghanistan"
];

let t20Ranking = [
"1 Pakistan",
"2 India",
"3 Australia",
"4 England",
"5 New Zealand",
"6 South Africa",
"7 West Indies",
"8 Afghanistan",
"9 Sri Lanka",
"10 Bangladesh"
];

let testRanking = [
"1 India",
"2 South Africa",
"3 Australia",
"4 England",
"5 New Zealand",
"6 Sri Lanka",
"7 Pakistan",
"8 West Indies",
"9 Bangladesh",
"10 Zimbabwe"
];
let animateClass = ["data-aos='fade-right'", "data-aos='fade-left'", "data-aos='fade-bottom'", "data-aos='fade-up'"]
let imgs = ["img/ab.png","img/pakistan.jpg","img/aw.jpg","img/cricket.png","img/grow.jpg"];

function changeBg() {
	let imgUrl = imgs[Math.floor(Math.random()*imgs.length)];
	document.querySelector(".header").style.transition = `3s`;
	document.querySelector(".header").style["background-image"] = `url(${imgUrl})`;	
}

setInterval(changeBg,9000);


function onloadFunc() {
	AOS.init();

	for (let i=0; i<10; i++) {
		document.querySelector('.sec-odi').innerHTML += 
		`<p class='hidden-div'>
		<em>${odiRanking[i]}</em>
		<p>`;
	}
	for (let i=0; i<10; i++) {
		document.querySelector('.sec-t20').innerHTML += 
		`<p class='hidden-div'>
		<em>${t20Ranking[i]}</em>
		<p>`;
	}
	for (let i=0; i<10; i++) {
		document.querySelector('.sec-test').innerHTML += 
		`<p class='hidden-div'>
		<em>${testRanking[i]}</em>
		<p>`;
	}


	$.ajax({
		url : "https://newsapi.org/v2/top-headlines?sources=espn-cric-info&apiKey=63430dfe88784548827757ee5af53812",
		success: function(data){
			console.log(data)
			for (let i=0; i<4; i++) {
				document.querySelector(".news-sec").innerHTML += 
				`<div class='loop-generate-div' ${animateClass[i]}">
				<img src='${data.articles[i].urlToImage}'>
				<p class='news-para'>${data.articles[i].description}</p>
				</div>`;
			}
			
		}
	})

	$.ajax({
		url : "http://cricapi.com/api/matchCalendar?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2",
		success: function(data){
			console.log(data)
			for (let i=0; i<8; i++) {
				document.querySelector(".fixture-sec").innerHTML += 
				`<div class='fixture-div' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
				<p class='team-para'>${data.data[i].name}</p>
				<p class='match-time'>${data.data[i].date}</p>
				<input class='id' type='search' placeholder='Enter a squad code'>
				<p class='code'>${data.data[i].unique_id}</p>
				<p class='match-time anno-time'>Squad will announced 1-2 hour before match Time</p>
				<button onclick='squad${[i]}()' class='btn'>Squad</button>
				<div class='squad-container'>
				<div>
				<p class='squad'></p>
				</div>
				<div>
				<p class='squad-2'></p>
				</div>
				<div>
				<span class="close"></span>
				</div>`;
			}
			
		}
	})

}
function squad0() {
	document.querySelector(".btn").innerHTML += ` <i class="fa fa-spinner fa-spin"></i>`;
	let code = document.querySelector(".code").innerHTML;
	let inp = document.querySelector(".id").value = code;
	$.ajax({
		url : `http://cricapi.com/api/fantasySquad?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&unique_id=${inp}`,
		success: function(datav){
			console.log(datav)
			if (inp == "") {
				alert("Enter a code"); 
			} else {

				document.querySelector (".anno-time").innerHTML = "";
				document.querySelector(".squad").innerHTML = `<h4>${datav.squad[0].name}</h4>`;
				document.querySelector(".squad-2").innerHTML = `<h4>${datav.squad[1].name}</h4>`; 

				for (let i=0; i<16; i++) {
					document.querySelector(".squad").innerHTML += 
					`<p class='squad'>${datav.squad[0].players[i].name}</p>`;
				}

				for (let i=0; i<16; i++) {
					document.querySelector(".squad-2").innerHTML += 
					`<p class='squad'>${datav.squad[1].players[i].name}</p>`;

				}
				document.querySelector('.close').innerHTML = `<i class="fas fa-chevron-circle-up" onclick="removeSquad()"></i>`;

			}
		}
	})
	function removeSpin() {
		document.querySelector(".btn").innerHTML = `Squad`;
	}
	setInterval(removeSpin,3000);

}

function removeSquad() {
	document.querySelector(".squad").innerHTML = "";
	document.querySelector(".squad-2").innerHTML = "";
	document.querySelector('.close').innerHTML = "";

}
function moreInfo() {
	document.querySelector(".absolute-more").style.display = "inline-block";
	document.querySelector(".more-span").innerHTML = `<i class="fas fa-chevron-circle-up" onclick="moreInfoClose()"> More</i>`;
}
function moreInfoClose() {
	document.querySelector(".absolute-more").style.display = "none";
	document.querySelector(".more-span").innerHTML = `<i class="fas fa-chevron-circle-down" onclick="moreInfo()"> More</i>`;	
}
function massageRemove() {
	document.querySelector(".absolute-massage").style.transition = '2s';
	document.querySelector(".absolute-massage").style.display = 'none';
}

function formPage() {
	document.querySelector(".load-player").innerHTML += ` <i class="fa fa-spinner fa-spin"></i>`;
	document.querySelector(".form").style.display = "flex";
	function remove() {
		document.querySelector(".load-player").innerHTML = `Chart`;
	}
	setInterval(remove,3000);
}
function apiMassage() {
	document.querySelector(".loading-api").innerHTML += ` <i class="fa fa-spinner fa-spin"></i>`;
	document.querySelector(".form-api").style.display = "flex";	
	function remove() {
		document.querySelector(".loading-api").innerHTML = `API`;
	}
	setInterval(remove,3000);
}
function removeApiForm() {
	document.querySelector(".form-api").style.display = "none";
}
function newPageChecker() {
	let userName = document.querySelector('input').value;
	if (userName === ""){
		alert("enter a name");
	} else {
		alert("success");
		document.querySelector('input').value = "";
		window.location.replace("more-index/player.html");
	}
}
function cancelForm() {
	document.querySelector(".form").style.display = "none";

}
function signup() {
	alert("currently unavailaible");
}

function login() {
	alert("currently unavailaible");
}