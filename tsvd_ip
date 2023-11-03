function checkIPAndClearExpiredIPs() {
				fetch("https://api64.ipify.org?format=json")
				.then(response => response.json())
				.then(data => {
				var userIP = data.ip;
				var visitedIPs = JSON.parse(localStorage.getItem("visitedIPs")) || [];
				var copyButton = document.getElementById("copyButton");
				
				var currentDate = new Date();
				var currentDay = currentDate.getDate();
				
				var lastStoredDate = localStorage.getItem("lastStoredDate");
				
				if (lastStoredDate && parseInt(lastStoredDate) !== currentDay) {
				localStorage.removeItem("visitedIPs");
				}
				
				if (visitedIPs.includes(userIP)) {
				document.getElementsByClassName("rpStu ad s-AD")[0].style.display = "none";
				
				var div = document.getElementById("stu-Prog");
				if (div) {
				    div.parentNode.removeChild(div);
				}
				
				copyButton.disabled = false;
				} else {
				if (copyButton.disabled === false) {
				visitedIPs.push(userIP);
				localStorage.setItem("visitedIPs", JSON.stringify(visitedIPs));
				localStorage.setItem("lastStoredDate", currentDay.toString());
				}
				}
				});
				}
