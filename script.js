let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const GAME_BOARD_WIDTH = 500, GAME_BOARD_HEIGHT = 400;
const BALL_RADIUS = 7, BALL_RADIAN = 30;
let GAME_RENDER_SPEED = 10;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 90;

let x = canvas.width / 2;
let y = canvas.height - BALL_RADIAN;
let dx = 2;
let dy = -2;
let score = 0;


let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandle, false);
document.addEventListener("keyup", keyUpHandle, false);


function keyDownHandle(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandle(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}


let GameBoard = function (width, height) {
    this.width = width;
    this.height = height;
    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
    }
    //điểm số
    this.drawScore = function () {
        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Score:" + parseInt(score), 10, 20);
        score += 0.01;
    }
}
//bóng
let Ball = function () {
    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();
        x += dx;
        y += dy;
        if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
        if (y + dy < BALL_RADIUS) {
            dy = -dy;
        }
        if (y + dy > canvas.height - PADDLE_HEIGHT - 30) {
            if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
                dy = -dy;
            } else if (y + dy > canvas.height - BALL_RADIUS + 6) {
                alert(" Điểm của bạn là : " + parseInt(score));
                document.location.reload();
                clearInterval(interval);
            }
        }
    }
}
//thanh chặn bóng
let Paddle = function () {
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT - 30;
    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    //di chuyển thanh
    if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX += 7;

    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function drawGame() {
    let ball = new Ball(x, y, BALL_RADIAN, 10);
    let paddle = new Paddle(PADDLE_WIDTH, 200);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle(paddleX, PADDLE_WIDTH);
    gameBoard.drawScore();
}

let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
const interval = setInterval(drawGame, GAME_RENDER_SPEED);


