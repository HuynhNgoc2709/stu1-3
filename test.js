var gbStu = qSell('button.rpStu')
if (gbStu.length > 0) {
  for (var t, i = 0; i < gbStu.length; i++) {
    var e = i + 1
    gbStu[i].id = 'link4sub-' + e
    gbStu[i].disabled = true
  }
  gbStu[0].disabled = false
  gbStu[gbStu.length - 1].classList.add('last')
} else {
  for (var nbStu = qSell('#Ctn-STU > *'), i = 0; i < nbStu.length; i++) {
    nbStu[i].removeAttribute('disabled')
    nbStu[i].classList.remove('full')
    nbStu[i].classList.add('unlock')
    nbStu[i].style = 'background-color: rgb(0, 221, 0);'
  }
}
var stuBar = getid('stuBar'),
  arrStuM1 = [],
  arrStuM2 = [],
  stuM1 = qSell('#Ctn-STU > .rpStu')
if (stuM1.length > 0) {
  for (var i = 0; i < stuM1.length; i++) {
    var r = stuM1[i].getAttribute('id')
    arrStuM1.push(r)
    getid('prog02').innerHTML = arrStuM1.length
    var n = 100 / arrStuM1.length
    stuBar.setAttribute('s-width', '0')
    stuBar.setAttribute('p-width', n)
  }
}
function stuProgress(_0x5b6504) {
  getid(_0x5b6504).classList.contains('done') &&
    setTimeout(() => {
      var _0x2b3f1f = getid(_0x5b6504).getAttribute('id')
      arrStuM2.push(_0x2b3f1f)
      var _0x154041 = arrStuM1.indexOf(_0x2b3f1f)
      _0x154041 > -1 && arrStuM1.splice(_0x154041, 1)
      getid('prog01').innerHTML = arrStuM2.length
      var _0x8f15ef = stuBar.getAttribute('t-width')
      null != _0x8f15ef && stuBar.setAttribute('s-width', _0x8f15ef)
      var _0x4b9441 = stuBar.getAttribute('p-width') * arrStuM2.length
      stuBar.setAttribute('t-width', _0x4b9441)
      '100' == _0x4b9441 && addCt(stuBar, 's')
      var _0x217aa0 = 0
      !(function _0x1ce853() {
        if (0 == _0x217aa0) {
          _0x217aa0 = 1
          var _0x2be40b = getid('stuBar'),
            _0x1f5e53 = _0x2be40b.getAttribute('s-width'),
            _0xbf96bc = _0x2be40b.getAttribute('t-width'),
            _0x3ebe31 = setInterval(function _0x31a266() {
              _0x1f5e53 >= 100
                ? (clearInterval(_0x3ebe31), (_0x217aa0 = 0))
                : ++_0x1f5e53 <= _0xbf96bc &&
                  ((_0x2be40b.style.width = _0x1f5e53.toFixed(0) + '%'),
                  100 == _0xbf96bc &&
                    Number(_0xbf96bc) - _0x1f5e53.toFixed(0) <= 1 &&
                    (_0x2be40b.style.width = '100%'))
            }, 25)
        }
      })()
    }, tPg)
  getid(_0x5b6504).classList.contains('last') &&
    setTimeout(() => {
      for (
        var _0x47b010 = qSell('#Ctn-STU > .full'), _0x56d015 = 0;
        _0x56d015 < _0x47b010.length;
        _0x56d015++
      ) {
        _0x47b010[_0x56d015].removeAttribute('disabled')
        _0x47b010[_0x56d015].setAttribute(
          'style',
          'background-color: rgba(0, 221, 0, 1)'
        )
        remCt(_0x47b010[_0x56d015], 'full')
        addCt(_0x47b010[_0x56d015], 'unlock')
      }
    }, tDelayU)
}
function synSTUbtn(_0x3d10e1, _0x4c1238, _0x4c3f5c) {
  'ADD' === _0x3d10e1 || 'UPD' === _0x3d10e1
    ? (objStuBtn[_0x4c1238] = {
        id: _0x4c1238,
        status: _0x4c3f5c,
      })
    : 'DEL' === _0x3d10e1 && delete objStuBtn[_0x4c1238]
  sessionStorage.setItem(LS_STU, JSON.stringify(objStuBtn))
}
function gSTUbtn(_0x5441b6, _0x38261a) {
  let _0x4fab8d = getid(_0x5441b6)
  if (_0x4fab8d) {
    if (
      ((_0x4fab8d.innerHTML = 'Completed'),
      addCt(qSel('#' + _0x5441b6), 'done'),
      _0x4fab8d.nextElementSibling.removeAttribute('disabled'),
      _0x4fab8d.classList.contains('last'))
    ) {
      let _0x1c4494 = qSell('#Ctn-STU > .full')
      _0x1c4494.forEach((_0x494717) => {
        _0x494717.removeAttribute('disabled')
        _0x494717.style.backgroundColor = 'rgba(0, 221, 0, 1)'
        remCt(_0x494717, 'full')
        addCt(_0x494717, 'unlock')
      })
    }
    arrStuM2.push(_0x5441b6)
    let _0x395b05 = arrStuM1.indexOf(_0x5441b6)
    _0x395b05 > -1 && arrStuM1.splice(_0x395b05, 1)
    getid('prog01').innerHTML = arrStuM2.length
    stuBar.style.width = n * arrStuM2.length + '%'
    n * arrStuM2.length == 100 && addCt(stuBar, 's')
  }
}
function handleStu(_0x411cab) {
  idElmt = getid(_0x411cab)
  synSTUbtn('ADD', 'link_4sub_com', linkSTU)
  synSTUbtn('ADD', _0x411cab, idElmt.innerText)
  remCt(idElmt, 'loader')
  addCt(idElmt, 'done')
  idElmt.innerText = txtCompleted
  stuProgress(_0x411cab)
}
linkSTU === objStuBtn.link_4sub_com?.status
  ? Object.entries(objStuBtn).forEach(([_0x1586f9, _0x187f04]) => {
      gSTUbtn(_0x1586f9, _0x187f04)
    })
  : sessionStorage.removeItem(LS_STU)
for (let i = 1; i <= 11; i++) {
  let s = qSel('#link4sub-' + i)
  null != s &&
    s.addEventListener('click', () => {
      if (s.classList.contains('done') || s.classList.contains('s-AD')) {
        if (!s.classList.contains('done') && s.classList.contains('s-AD')) {
          addCt(s, 'loader')
          s.innerText = txtAd2
          let _0x190bea = setInterval(() => {
              'unfilled' == qSel(xAD).getAttribute('data-ad-status') &&
                (clearInterval(_0x190bea),
                clearTimeout(_0x4b1647),
                clearTimeout(_0x15aa78),
                setTimeout(() => {
                  handleStu('link4sub-' + i)
                  qSel('.rpStu.s-AD + #link4sub-2') &&
                    setTimeout(() => {
                      getid('link4sub-2').removeAttribute('disabled')
                    }, tDelay)
                }, 2000))
            }, 100),
            _0x4b1647 = setTimeout(() => {
              clearInterval(_0x190bea)
              qSel('.rpStu.s-AD').insertAdjacentHTML(
                'beforebegin',
                '<p id="xnAD" class="note">' + txtAd3 + '</p>'
              )
              stC('xnAD')
            }, 1000),
            _0x15aa78 = setTimeout(() => {
              stAd(xAD)
              qSel(xAD).parentNode.setAttribute('dt-ad', 'true')
              var _0x305253 = qSel(xAD),
                _0x3abf5b = () => {
                  qSel(xAD).parentNode.removeAttribute('dt-ad')
                  console.log('Click...')
                    synSTUbtn('ADD', 'link4sub-' + i, 'done')
                  setTimeout(() => {
                    handleStu('link4sub-' + i)
                    stC('link4sub-' + i)
                    addCt(getid('xnAD'), 'hidden')
                    qSel('.rpStu.s-AD + #link4sub-2') &&
                      setTimeout(() => {
                        getid('link4sub-2').removeAttribute('disabled')
                      }, tDelay)
                  }, 5000)
                }
              qSel(xAD).addEventListener('click', () => {
                _0x3abf5b()
              })
              var _0x41635e = document.querySelector(xAD + ' iframe')
              null != _0x41635e &&
                window.addEventListener('blur', function () {
                  document.activeElement == _0x41635e && _0x3abf5b()
                })
            }, 4500)
        }
      } else {
        Date.now()
        addCt(s, 'loader')
        s.innerText = txtLoading
        setTimeout(() => {
          handleStu('link4sub-' + i)
          null != qSel('#link4sub-' + (i + 1)) &&
            setTimeout(() => {
              getid('link4sub-' + (i + 1)).removeAttribute('disabled')
            }, tDelay)
        }, tLoader)
      }
    })
}
