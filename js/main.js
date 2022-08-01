const FLOOR = 'floor'
const WALL = 'wall'
const TARGET = 'target'

const BOX = 'box'
const GOLD = 'gold'
const GLUE = 'glue'
const CLOCK = 'clock'

const GAMER_RED = 'gamer-red'
const GAMER_GREEN = 'gamer-green'
const GAMER = 'gamer'
var gamer = 'gamer'

var gGameScore = 100
var gNumOfTargets = 2
var gBoard
var gGamerPos
var isGameOn = false
var gIsGlued = false
var gIsGolded = false
var gClockCount = 0

const elTargets = document.querySelector('.targets')
const elScore = document.querySelector('.score')
const elBtn = document.querySelector('.btn')
const elWonLost = document.querySelector('.wonLost')

var gClockIntervalId
var gGoldIntervalId
var gGlueIntervalId

initGame()
function initGame() {
	elTargets.innerHTML = gNumOfTargets
	isGameOn = true
	gGamerPos = { i: 3, j: 3 }
	gBoard = createBoard()
	setElements(gBoard)
	renderBoard(gBoard)
	addElements()
}

function setElements(board) {
	board[1][1].type = WALL
	board[1][2].type = WALL
	board[1][3].type = WALL
	board[1][4].type = WALL
	board[1][5].type = WALL
	board[1][6].type = WALL
	board[1][7].type = WALL
	board[1][8].type = WALL
	board[1][9].type = WALL
	board[1][10].type = WALL
	board[1][11].type = WALL
	board[1][12].type = WALL
	board[2][1].type = WALL
	board[2][12].type = WALL
	board[3][1].type = WALL
	board[3][12].type = WALL
	board[4][1].type = WALL
	board[4][12].type = WALL
	board[5][1].type = WALL
	board[5][12].type = WALL
	board[6][1].type = WALL
	board[6][12].type = WALL
	board[7][1].type = WALL
	board[7][12].type = WALL
	board[8][1].type = WALL
	board[8][2].type = WALL
	board[8][5].type = WALL
	board[8][6].type = WALL
	board[8][7].type = WALL
	board[8][8].type = WALL
	board[8][9].type = WALL
	board[8][10].type = WALL
	board[8][11].type = WALL
	board[8][12].type = WALL
	board[9][2].type = WALL
	board[9][3].type = WALL
	board[9][4].type = WALL
	board[9][5].type = WALL

	board[2][2].type = FLOOR
	board[2][3].type = FLOOR
	board[2][4].type = FLOOR
	board[2][5].type = FLOOR
	board[2][6].type = FLOOR
	board[2][7].type = FLOOR
	board[2][8].type = FLOOR
	board[2][9].type = FLOOR
	board[2][10].type = FLOOR
	board[2][11].type = FLOOR
	board[3][2].type = FLOOR
	board[3][3].type = FLOOR
	board[3][4].type = FLOOR
	board[3][5].type = FLOOR
	board[3][6].type = FLOOR
	board[3][7].type = FLOOR
	board[3][8].type = FLOOR
	board[3][9].type = FLOOR
	board[3][10].type = FLOOR
	board[3][11].type = FLOOR
	board[4][2].type = FLOOR
	board[4][3].type = FLOOR
	board[4][4].type = FLOOR
	board[4][5].type = FLOOR
	board[4][6].type = FLOOR
	board[4][7].type = FLOOR
	board[4][8].type = FLOOR
	board[4][9].type = FLOOR
	board[4][10].type = FLOOR
	board[4][11].type = FLOOR
	board[5][2].type = FLOOR
	board[5][3].type = FLOOR
	board[5][4].type = FLOOR
	board[5][5].type = FLOOR
	board[5][6].type = FLOOR
	board[5][7].type = FLOOR
	board[5][8].type = FLOOR
	board[5][9].type = FLOOR
	board[5][10].type = FLOOR
	board[5][11].type = FLOOR
	board[6][2].type = FLOOR
	board[6][3].type = FLOOR
	board[6][4].type = FLOOR
	board[6][5].type = FLOOR
	board[6][6].type = FLOOR
	board[6][7].type = FLOOR
	board[6][8].type = FLOOR
	board[6][9].type = FLOOR
	board[6][10].type = FLOOR
	board[6][11].type = FLOOR
	board[7][2].type = FLOOR
	board[7][3].type = FLOOR
	board[7][4].type = FLOOR
	board[7][5].type = FLOOR
	board[7][6].type = FLOOR
	board[7][7].type = FLOOR
	board[7][8].type = FLOOR
	board[7][9].type = FLOOR
	board[7][10].type = FLOOR
	board[7][11].type = FLOOR
	board[8][3].type = FLOOR
	board[8][4].type = FLOOR

	board[4][4].type = TARGET
	board[6][3].type = TARGET
	board[5][5].gameElement = BOX
	board[7][5].gameElement = BOX

	board[gGamerPos.i][gGamerPos.j].gameElement = gamer
}

function addElements() {
	gClockIntervalId = setInterval(() => setRandomGameElement(CLOCK), 10000)
	gGoldIntervalId = setInterval(() => setRandomGameElement(GOLD), 10000)
	gGlueIntervalId = setInterval(() => setRandomGameElement(GLUE), 10000)
}

function setRandomGameElement(element) {
	if (!isGameOn) return
	var randomI = getRandomNum(0, gBoard.length - 1)
	var randomJ = getRandomNum(0, gBoard[0].length - 1)
	var randLocation = { i: randomI, j: randomJ }
	var randCell = gBoard[randomI][randomJ]
	if (randCell.type !== FLOOR || randCell.gameElement !== null) {
		setRandomGameElement(element)
	} else {
		switch (element) {
			case CLOCK:
				randCell.gameElement = CLOCK
				renderCell(randCell, randLocation, CLOCK)
				setTimeout(() => {
					randCell.gameElement = null
					renderCell(randCell, randLocation, CLOCK)
				}, 5000)
				break
			case GOLD:
				randCell.gameElement = GOLD
				renderCell(randCell, randLocation, GOLD)
				setTimeout(() => {
					randCell.gameElement = null
					renderCell(randCell, randLocation, GOLD)
				}, 5000)
				break
			case GLUE:
				randCell.gameElement = GLUE
				renderCell(randCell, randLocation, GLUE)
				if (!gIsGlued) {
					setTimeout(() => {
						randCell.gameElement = null
						renderCell(randCell, randLocation, GLUE)
					}, 5000)
				}

				break
		}
	}
}

function createBoard() {
	var board = createMat(12, 14)
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: null, gameElement: null }
			board[i][j] = cell
		}
	}
	return board
}

function renderBoard(board) {
	var strHtml = ''
	for (var i = 0; i < board.length; i++) {
		strHtml += '<tr>'
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j]
			var cellClass = getClassName({ i: i, j: j }, currCell)
			strHtml += `<td onclick="moveTo(${i},${j})" class="cell ${cellClass}"`
			strHtml += `></td>`
		}
		strHtml += '</tr>'
	}
	var elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHtml
}

function handleKey(e) {
	var i = gGamerPos.i
	var j = gGamerPos.j
	switch (e.key) {
		case 'ArrowUp':
			moveTo(i - 1, j)
			break
		case 'ArrowRight':
			moveTo(i, j + 1)
			break
		case 'ArrowDown':
			moveTo(i + 1, j)
			break
		case 'ArrowLeft':
			moveTo(i, j - 1)
			break
	}
}

function validMove(i, j) {
	var iAbsDiff = Math.abs(i - gGamerPos.i)
	var jAbsDiff = Math.abs(j - gGamerPos.j)
	if (
		(iAbsDiff === 1 && jAbsDiff === 0) ||
		(jAbsDiff === 1 && iAbsDiff === 0) ||
		iAbsDiff === gBoard.length - 1 ||
		jAbsDiff === gBoard[0].length - 1
	) {
		return true
	}
	return false
}

function moveTo(i, j) {
	if (gIsGlued) return
	if (!isGameOn) return
	if (!validMove(i, j)) return
	var prevCell = gBoard[gGamerPos.i][gGamerPos.j]
	var targetCell = gBoard[i][j]
	var prevLocation = { i: gGamerPos.i, j: gGamerPos.j }
	var targetLocation = { i, j }
	if (targetCell.type === WALL) return
	if (gClockCount > 0) {
		gClockCount--
		gGameScore++
	}
	gamer = GAMER
	gGameScore--
	elScore.innerHTML -= 1
	checkGameOver()
	prevCell.gameElement = null
	renderCell(prevCell, prevLocation, gamer)
	switch (targetCell.gameElement) {
		case GLUE:
			gIsGlued = true
			gamer = GAMER_RED
			renderCell(targetCell, targetLocation, GLUE)
			renderCell(targetCell, targetLocation, gamer)
			setTimeout(() => {
				renderCell(targetCell, targetLocation, GAMER_RED)
				gIsGlued = false
				renderCell(targetCell, targetLocation, GLUE)
				gamer = GAMER
			}, 5000)
			break
		case BOX:
			moveBox(prevCell, prevLocation, targetCell, targetLocation)

			break
		case CLOCK:
			gIsClocked = 10
			renderCell(targetCell, targetLocation, CLOCK)
			gamer = GAMER_GREEN
			renderCell(targetCell, targetLocation, gamer)
			gamer = GAMER
			break
		case GOLD:
			gIsGolded = true
			gGameScore += 100
			elScore.innerHTML = gGameScore
			// renderCell(targetCell, targetLocation, GOLD)
			gamer = GAMER_GREEN
			renderCell(targetCell, targetLocation, gamer)
			gamer = GAMER
			break

		case null:
			renderCell(targetCell, targetLocation, gamer)
			break
	}
	if (targetCell.type === TARGET) {
		renderCell(targetCell, targetLocation, gamer)
		renderCell(targetCell, targetLocation, TARGET)
		renderCell(targetCell, targetLocation, 'gamer-on-target')
	}
	if (prevCell.type === TARGET) {
		renderCell(prevCell, prevLocation, gamer)
		renderCell(prevCell, prevLocation, 'gamer-on-target')
		renderCell(prevCell, prevLocation, TARGET)
	}

	targetCell.gameElement = gamer
	gGamerPos.i = i
	gGamerPos.j = j
}

function renderCell(cell, location, value) {
	var cellSelector = '.' + getClassName(location, cell)
	var idSelector = cellSelector.slice(0, cellSelector.indexOf(' '))
	var elCell = document.querySelector(idSelector)
	elCell.classList.toggle(value)
}

function getClassName(location, currCell) {
	const SEP = ' '
	var cellClass = `cell-${location.i}-${location.j}`
	if (currCell.type === FLOOR) {
		cellClass += SEP + FLOOR
	}
	if (currCell.type === WALL) {
		cellClass += SEP + WALL
	}
	if (currCell.type === TARGET) {
		cellClass += SEP + FLOOR + SEP + TARGET
	}

	switch (currCell.gameElement) {
		case gamer:
			cellClass += SEP + gamer
			break
		case BOX:
			cellClass += SEP + BOX
			break
	}
	return cellClass
}

function moveBox(prevCell, prevLocation, targetCell, targetLocation) {
	var nextBoxLocation = { i: prevLocation.i, j: prevLocation.j }
	switch (prevLocation.i - targetLocation.i) {
		case -1:
			nextBoxLocation.i = targetLocation.i + 1
			break
		case 1:
			nextBoxLocation.i = targetLocation.i - 1
			break
	}
	switch (prevLocation.j - targetLocation.j) {
		case -1:
			nextBoxLocation.j = targetLocation.j + 1
			break
		case 1:
			nextBoxLocation.j = targetLocation.j - 1
			break
	}
	var nextBoxCell = gBoard[nextBoxLocation.i][nextBoxLocation.j]
	if (nextBoxCell.type === WALL || nextBoxCell.gameElement === BOX) {
		return
	}
	nextBoxCell.gameElement = BOX

	if (nextBoxCell.type === TARGET) {
		gNumOfTargets--
		elTargets.innerHTML = gNumOfTargets
		renderCell(nextBoxCell, nextBoxLocation, TARGET)
		renderCell(nextBoxCell, nextBoxLocation, 'box-on-target')
		checkGameOver()
	} else {
		renderCell(nextBoxCell, nextBoxLocation, BOX)
	}
	if (targetCell.type === TARGET) {
		gNumOfTargets++
		elTargets.innerHTML = gNumOfTargets
		renderCell(targetCell, targetLocation, 'box-on-target')
		renderCell(targetCell, targetLocation, 'target')
		renderCell(targetCell, targetLocation, gamer)
	} else {
		renderCell(targetCell, targetLocation, gamer)
		renderCell(targetCell, targetLocation, BOX)
	}
	gGamerPos.i = targetLocation.i
	gGamerPos.j = targetLocation.j
}

function checkGameOver() {
	if (gNumOfTargets === 0) {
		isGameOn = false
		elWonLost.innerHTML += ' YOU WON!'
	}
	if (gGameScore === 0) {
		isGameOn = false
		elWonLost.innerHTML += ' YOU LOST!'
	}
}
