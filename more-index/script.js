

let pidTest = 
[
"253802",
"7656",
"277906",
"303669",
"219889"
];
let ranktest = 
[
"1st   Virat kohli",
"2nd   Steve Smith",
"3rd   Kane Williamson",
"4th   Joe root",
"5th   David warner"
];

let pidOdi = 
[
"253802",
"348144",
"303669",
"34102 ",
"219889"
];
let rankOdi = 
[
"1st   Virat kohli",
"2nd   Babar azam",
"3rd   Joe root",
"4th   Rohit sharma",
"5th   David warner"
];

let pidT20 = 
[
"5334",
"512191",
"422108",
"232359",
"348144"
];
let rankt20 = 
[
"1st   Aaron Finch",
"2nd   Fakhar zaman",
"3rd   K. L. Rahul",
"4th   Colin Munro",
"5th   Babar azam"
];
let imgs = ["../img/ab.png","../img/pakistan.jpg","../img/aw.jpg","../img/cricket.png","../img/grow.jpg"];

function changeBg() {
	let imgUrl = imgs[Math.floor(Math.random()*imgs.length)];
	document.querySelector(".header").style.transition = `3s`;
	document.querySelector(".header").style["background-image"] = `url(${imgUrl})`;	
}

setInterval(changeBg,9000);


function searchPlayer() {
	document.querySelector(".src-btn").innerHTML += `<i class="fa fa-spinner fa-spin"></i>`;
	function re() {
		document.querySelector(".src-btn").innerHTML = `Search`;
	}
	setInterval(re,5000);
	let userPush = document.querySelector("#player-name").value;
	$.ajax({
		url : `http://cricapi.com/api/playerFinder?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&name=${userPush}`,
		success: function(data){
			console.log(data)
			let emptyData = `${data.data}`;
			if (emptyData === "") {
				let dataPid = `${data.data}`
			} else {
				document.querySelector("#pid").innerHTML = `${data.data[0].pid}`;
			}
			let pidNumber = document.querySelector("#pid").innerHTML;
			$.ajax({
				url : `http://cricapi.com/api/playerStats?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&pid=${pidNumber}`,
				success: function(data){
					console.log(data)
					let pidN = `${data.pid}`;
					if (userPush == "") {
						alert("Enter A Player Name");
					} else if (emptyData == '') {
						alert("not found");
					}
					else {
						document.querySelector(".profile-cont").innerHTML = `
						<div class="image" style="background-image: url(${data.imageURL})" data-aos="flip-right">
						</div>
						<div class='info-text'>
						<p class="profile" data-aos="flip-right">${data.profile}</p>
						<p class="name" data-aos="flip-left">Name : ${data.name}</p>
						<p class="born" data-aos="flip-right">Date Of Birth : ${data.born}</p>
						<p class="country" data-aos="flip-left">Country : ${data.country}</p>
						<p class="age" data-aos="flip-right">Age : ${data.currentAge}</p>
						</div>`
					}

				}
			})
		}
	})
}


function onloadFunc() {
	AOS.init();

	for (let i=0; i<5; i++) {
		document.querySelector(".profile-container").innerHTML += `
		<h2>${ranktest[i]}</h2>
		<br>
		<canvas id='myChart${[i]}' data-aos="flip-left"></canvas>
		`;

		$.ajax({
			url : `http://cricapi.com/api/playerStats?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&pid=${pidTest[i]}`,
			success: function(data){
				console.log(data);
				let domestic = data.data.batting.listA.Runs;
				let firstClass = data.data.batting.firstClass.Runs;
				let ODIruns = data.data.batting.ODIs.Runs;
				let Testruns = data.data.batting.tests.Runs;
				var ctx = document.getElementById(`myChart${[i]}`).getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: ["First Class Score", "Domestic Score", "ODI Score", "Test Score"],
						datasets: [{
							label: `${data.fullName}`,
							data: [domestic, firstClass, ODIruns, Testruns],
							backgroundColor: [
							'rgba(255, 43, 152, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)'
							],
							borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				});
			}
		});

	}




	for (let i=0; i<5; i++) {
		document.querySelector(".profile-container2").innerHTML += `
		<h2>${rankOdi[i]}</h2>
		<br>
		<canvas class='myChart${[i]}' id='myChart' data-aos="flip-up"></canvas>`;

		$.ajax({
			url : `http://cricapi.com/api/playerStats?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&pid=${pidOdi[i]}`,
			success: function(data){
				console.log(data);
				let domestic = data.data.batting.listA.Runs;
				let firstClass = data.data.batting.firstClass.Runs;
				let ODIruns = data.data.batting.ODIs.Runs;
				var ctx = document.querySelector(`.myChart${[i]}`).getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: ["First Class Score", "Domestic Score", "ODI Score", "Test Score"],
						datasets: [{
							label: `${data.fullName}`,
							data: [domestic, firstClass, ODIruns],
							backgroundColor: [
							'rgba(255, 43, 152, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)'
							],
							borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				});
			}
		});

	}




	for (let i=0; i<5; i++) {
		document.querySelector(".profile-container3").innerHTML += `
		<h2>${rankt20[i]}</h2>
		<br>
		<canvas class='myyChart${[i]}' id='myChart' data-aos="flip-left"></canvas>`;

		$.ajax({
			url : `http://cricapi.com/api/playerStats?apikey=wd8xbtSzwMWjks9e0K6hR8cMmDE2&pid=${pidT20[i]}`,
			success: function(data){
				console.log(data);
				let domestic = data.data.batting.listA.Runs;
				let firstClass = data.data.batting.firstClass.Runs;
				let ODIruns = data.data.batting.ODIs.Runs;
				var ctx = document.querySelector(`.myyChart${[i]}`).getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: ["First Class Score", "Domestic Score", "ODI Score", "Test Score"],
						datasets: [{
							label: `${data.fullName}`,
							data: [domestic, firstClass, ODIruns],
							backgroundColor: [
							'rgba(255, 43, 152, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)'
							],
							borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				});
			}
		});

	}
}

function test() {
	document.querySelector(".graph-div-test").style.display = "block";
	document.querySelector(".btn1").innerHTML = `<button class='arrow' onclick='closeSec1()'><i class="fas fa-arrow-alt-circle-up"></i></button>`;

}
function closeSec1() {
	document.querySelector(".graph-div-test").style.display = "none";
	document.querySelector(".btn1").innerHTML = `<button class="test-class" onclick="test()">Test Players Ranking</button>`;
}


function odi() {
	document.querySelector(".graph-div-odi").style.display = "block";
	document.querySelector(".btn2").innerHTML = `<button class='arrow' onclick='closeSec2()'><i class="fas fa-arrow-alt-circle-up"></i></button>`;

}
function closeSec2() {
	document.querySelector(".graph-div-odi").style.display = "none";
	document.querySelector(".btn2").innerHTML = `<button class="odi-class" onclick="odi()">ODI Players Ranking</button>`;
}

function t20() {
	document.querySelector(".graph-div-t20").style.display = "block";
	document.querySelector(".btn3").innerHTML = `<button class='arrow' onclick='closeSec3()'><i class="fas fa-arrow-alt-circle-up"></i></button>`;

}
function closeSec3() {
	document.querySelector(".graph-div-t20").style.display = "none";
	document.querySelector(".btn3").innerHTML = `<button class="t20-class" onclick="t20()">T20 Players Ranking</button>`;
}




