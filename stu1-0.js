var gbStu = qSell("button.rpStu");
if (gbStu.length > 0) {
	for (var t, i = 0; i < gbStu.length; i++) {
		var e = i + 1;
		gbStu[i].id = "link4sub-" + e, gbStu[i].disabled = !0
	}
	gbStu[0].disabled = !1, gbStu[gbStu.length - 1].classList.add("last")
} else
	for (var nbStu = qSell("#Ctn-STU > *"), i = 0; i < nbStu.length; i++) nbStu[i].removeAttribute("disabled"), nbStu[i].classList.remove("full"), nbStu[i]
		.classList.add("unlock"), nbStu[i].style = "background-color: rgb(0, 221, 0);";
var stuBar = getid("stuBar")
	, arrStuM1 = []
	, arrStuM2 = []
	, stuM1 = qSell("#Ctn-STU > .rpStu");
if (stuM1.length > 0)
	for (var i = 0; i < stuM1.length; i++) {
		var r = stuM1[i].getAttribute("id");
		arrStuM1.push(r), getid("prog02")
			.innerHTML = arrStuM1.length;
		var n = 100 / arrStuM1.length;
		stuBar.setAttribute("s-width", "0"), stuBar.setAttribute("p-width", n)
	}

function stuProgress(t) {
	getid(t)
		.classList.contains("done") && setTimeout(() => {
			var e = getid(t)
				.getAttribute("id");
			arrStuM2.push(e);
			var r = arrStuM1.indexOf(e);
			r > -1 && arrStuM1.splice(r, 1), getid("prog01")
				.innerHTML = arrStuM2.length;
			var n = stuBar.getAttribute("t-width");
			null != n && stuBar.setAttribute("s-width", n);
			var s = stuBar.getAttribute("p-width") * arrStuM2.length;
			stuBar.setAttribute("t-width", s), "100" == s && addCt(stuBar, "s");
			var u = 0;
			! function t() {
				if (0 == u) {
					u = 1;
					var e = getid("stuBar")
						, r = e.getAttribute("s-width")
						, n = e.getAttribute("t-width")
						, s = setInterval(function t() {
							r >= 100 ? (clearInterval(s), u = 0) : ++r <= n && (e.style.width = r.toFixed(0) + "%", 100 == n && Number(n) - r.toFixed(
								0) <= 1 && (e.style.width = "100%"))
						}, 25)
				}
			}()
		}, tPg), getid(t)
		.classList.contains("last") && setTimeout(() => {
			for (var t = qSell("#Ctn-STU > .full"), e = 0; e < t.length; e++) t[e].removeAttribute("disabled"), t[e].setAttribute("style",
				"background-color: rgba(0, 221, 0, 1)"), remCt(t[e], "full"), addCt(t[e], "unlock")
		}, tDelayU)
}



function handleStu(t) {
	idElmt = getid(t), synSTUbtn("ADD", "link_4sub_com", location.hostname), synSTUbtn("ADD", t, idElmt.innerText), remCt(idElmt, "loader"), addCt(idElmt,
		"done"), idElmt.innerText = txtCompleted, stuProgress(t)
}

for (let i = 1; i <= 11; i++) {
	let s = qSel(`#link4sub-${i}`);
	null != s && s.addEventListener("click", () => {
		if (s.classList.contains("done") || s.classList.contains("s-AD")) {
			if (!s.classList.contains("done") && s.classList.contains("s-AD")) {
				addCt(s, "loader"), this.innerText = txtAd2;
				let t = setInterval(() => {
						var n;
						"unfilled" == qSel(xAD)
							.getAttribute("data-ad-status") && (clearInterval(t), clearTimeout(e), clearTimeout(r), setTimeout(() => {
								handleStu(`link4sub-${i}`), qSel(".rpStu.s-AD + #link4sub-2") && setTimeout(() => {
									getid("link4sub-2")
										.removeAttribute("disabled")
								}, tDelay)
							}, 2e3))
					}, 100)
					, e = setTimeout(() => {
						clearInterval(t), qSel(".rpStu.s-AD")
							.insertAdjacentHTML("beforebegin", '<p id="xnAD" class="note">' + txtAd3 + "</p>"), stC("xnAD")
					}, 1e3)
					, r = setTimeout(() => {
						stAd(xAD), qSel(xAD)
							.parentNode.setAttribute("dt-ad", "true");
						var t = qSel(xAD)
							, e = () => {
								qSel(xAD)
									.parentNode.removeAttribute("dt-ad"), console.log("Click..."), xQK.sc("G_CLICK", 1, {
										secure: 1
										, "max-age": 43200
									}), setTimeout(() => {
										handleStu(`link4sub-${i}`), stC(`link4sub-${i}`), addCt(getid("xnAD"), "hidden"), qSel(
											".rpStu.s-AD + #link4sub-2") && setTimeout(() => {
											getid("link4sub-2")
												.removeAttribute("disabled")
										}, tDelay)
									}, 5e3)
							};
						qSel(xAD)
							.addEventListener("click", () => {
								e()
							});
						var r = document.querySelector(xAD + " iframe");
						null != r && window.addEventListener("blur", function() {
							document.activeElement == r && e()
						})
					}, 4500)
			}
		} else null != getid("msgWr") && getid("msgWr")
			.remove(), Date.now(), addCt(s, "loader"), s.innerText = txtLoading, setTimeout(() => {
				handleStu(`link4sub-${i}`), null != getid("msgWr") && getid("msgWr")
					.remove(), null != qSel(`#link4sub-${i+1}`) && setTimeout(() => {
						getid(`link4sub-${i+1}`)
							.removeAttribute("disabled")
					}, tDelay)
			}, tLoader)
	})
}
