  
var gbStu = qSell('button.rpStu');
if (gbStu.length > 0) {
	for (var i = 0; i < gbStu.length; i++) {
		var nmB = i + 1;
		gbStu[i].id = "link4sub-" + nmB;
		gbStu[i].disabled = true;
	}
	gbStu[0].disabled = false
	var lastStu = gbStu[gbStu.length - 1];
	lastStu.classList.add('last');
} else {
	var nbStu = qSell('#Ctn-STU > *');
	for (var i = 0; i < nbStu.length; i++) {
		nbStu[i].removeAttribute('disabled');
		nbStu[i].classList.remove('full');
		nbStu[i].classList.add('unlock');
		nbStu[i].style = 'background-color: rgb(0, 221, 0);';
	}
}


// Progress bar
var stuBar = getid('stuBar')
	, arrStuM1 = []
	, arrStuM2 = [];
var stuM1 = qSell('#Ctn-STU > .rpStu');
if (stuM1.length > 0) {
	for (var i = 0; i < stuM1.length; i++) {
		var gIdstuM1 = stuM1[i].getAttribute('id');
		arrStuM1.push(gIdstuM1);
		getid('prog02').innerHTML = arrStuM1.length;
		var pWidth = 100 / arrStuM1.length;
		stuBar.setAttribute('s-width', '0');
		stuBar.setAttribute('p-width', pWidth);
	}
}

function stuProgress(e) {
	if (getid(e).classList.contains('done')) {
		setTimeout(() => {
			var gIdstuM2 = getid(e).getAttribute('id');
			arrStuM2.push(gIdstuM2);
			var indexAr = arrStuM1.indexOf(gIdstuM2);
			if (indexAr > -1) {
				arrStuM1.splice(indexAr, 1)
			}
			getid('prog01').innerHTML = arrStuM2.length;
			var gTwidth = stuBar.getAttribute('t-width');
			if (gTwidth != null) {
				stuBar.setAttribute('s-width', gTwidth);
			}
			var gPwidth = stuBar.getAttribute('p-width')
				, tWidth = gPwidth * arrStuM2.length;
			stuBar.setAttribute('t-width', tWidth);
			if (tWidth == '100') {
				addCt(stuBar, 's')
			}
			var ii = 0;

			function movePg() {
				if (ii == 0) {
					ii = 1;
					var elstuBar = getid('stuBar')
						, swidth = elstuBar.getAttribute('s-width')
						, twidth = elstuBar.getAttribute('t-width')
						, idPg = setInterval(framePg, 25);

					function framePg() {
						if (swidth >= 100) {
							clearInterval(idPg);
							ii = 0;
						} else {
							swidth++;
							if (swidth <= twidth) {
								elstuBar.style.width = swidth.toFixed(0) + '%';
								if (twidth == 100 && Number(twidth) - swidth.toFixed(0) <= 1) {
									elstuBar.style.width = '100%';
								}
							}
						}
					}
				}
			}
			movePg();
		}, tPg);
	}

	if (getid(e).classList.contains('last')) {
		setTimeout(() => {
			var bFileStu = qSell('#Ctn-STU > .full');
			for (var i = 0; i < bFileStu.length; i++) {
				bFileStu[i].removeAttribute('disabled');
				bFileStu[i].setAttribute('style', 'background-color: rgba(0, 221, 0, 1)');
				remCt(bFileStu[i], 'full');
				addCt(bFileStu[i], 'unlock')
			}
		}, tDelayU);
	}

}


// xu ly click btn
function handleStu(id) {
	idElmt = getid(id);
	synSTUbtn('ADD', 'link_4sub_com', linkSTU);
	synSTUbtn('ADD', id, idElmt.innerText);
	remCt(idElmt, 'loader');
	addCt(idElmt, 'done');
	idElmt.innerText = txtCompleted;
	stuProgress(id);
} 


for (let i = 1; i <= 11; i++) {
	const elmt = qSel(`#link4sub-${i}`);
	if (elmt != null) {
		elmt.addEventListener('click', () => {
			if (!elmt.classList.contains('done') && !elmt.classList.contains('s-AD')) {
				if ( getid('msgWr') != null ) getid('msgWr').remove()
				let timeStar = Date.now();

				addCt(elmt, 'loader');
				elmt.innerText = txtLoading;

			const doneBtn = setTimeout(() => {
						handleStu(`link4sub-${i}`);
						if(getid('msgWr') != null) getid('msgWr').remove()
						if (qSel(`#link4sub-${i + 1}`) != null) {
							setTimeout(() => {
								getid(`link4sub-${i + 1}`).removeAttribute('disabled');
							}, tDelay);
						}
					}, tLoader);

			} else if (!elmt.classList.contains('done') && elmt.classList.contains('s-AD')) {
				addCt(elmt, 'loader');
				this.innerText = txtAd2;

				//theo dõi ads
				let fAD = setInterval(() => {
					var adStatus = qSel(xAD).getAttribute("data-ad-status");
					if (adStatus == "unfilled") {
						clearInterval(fAD);
						clearTimeout(showNote);
						clearTimeout(sToAD);

						setTimeout(() => {
							handleStu(`link4sub-${i}`);
							if (qSel(".rpStu.s-AD + #link4sub-2")) {
								setTimeout(() => {
									getid('link4sub-2').removeAttribute('disabled');
								}, tDelay);
							}
						}, 2000);
					} 
				}, 100);

				const showNote = setTimeout (() =>{
					clearInterval(fAD);
					qSel('.rpStu.s-AD').insertAdjacentHTML('beforebegin', '<p id="xnAD" class="note">' + txtAd3 + '</p>');
					stC("xnAD");
				}, 1000)

				const sToAD = setTimeout(() => {
					//chuyen den qc
					stAd(xAD);
					qSel(xAD).parentNode.setAttribute("dt-ad", "true");

					//goi ham xu ly
					var adElement = qSel(xAD);

					var rAD = () => {
						qSel(xAD).parentNode.removeAttribute("dt-ad");
						console.log('Click...');

						xQK.sc("G_CLICK", 1, {
									secure: 1,
									"max-age": 43200
								});

						setTimeout(() => {
							handleStu(`link4sub-${i}`);
							stC(`link4sub-${i}`);
							addCt(getid("xnAD"), "hidden");
							if (qSel(".rpStu.s-AD + #link4sub-2")) {
							setTimeout(() => {
								getid('link4sub-2').removeAttribute('disabled');
							}, tDelay);
							} 
						}, 5000);
					};

					qSel(xAD).addEventListener("click", () => {
						rAD();
					});

					var adContainer = document.querySelector(xAD +" iframe")
					if (adContainer != null) {
						window.addEventListener("blur", function() {
							if (document.activeElement == adContainer) {
								rAD();
							}
						});
					}

				}, 4500);
			}
		});
	}
}
  
