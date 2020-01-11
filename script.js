
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let scoreBlock = document.querySelector("span#score");
console.log(scoreBlock);

function clearField (ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let score = 0;

let circle = {
    'radius': 10,
    'color': 'yellow',
    'speed': 2,
    'route': {
        'top': true,
        'right': true,
    },
    'pos': {
        'x': 450,
        'y': 200,
    },
};

let block = {
    'color': 'green',
    'speed': 5,
    'size': {
        'width': 10,
        'height': 50,
    },
    'pos': {
        'x': canvas.width - 10,
        'y': 200 - 25,
    },
}


function createCircle (ctx) {
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.pos.x, circle.pos.y, circle.radius, 0, Math.PI*2, true);
    ctx.fill();
}

function routeCircleY () {
    if (circle.route.top && circle.pos.y - circle.radius < 0) {
        circle.route.top = false;
    } else if (!circle.route.top && circle.pos.y + circle.radius > canvas.height) {
        circle.route.top = true;
    }
}

function routeCircleX () {
    if (circle.route.right && circle.pos.x + circle.radius > canvas.width) {
        circle.route.right = false;
    } else if (!circle.route.right && circle.pos.x - circle.radius < 0) {
        circle.route.right = true;
    }
}

function moveCircle () {
    if (circle.route.top) {
        circle.pos.y -= circle.speed;
    } else {
        circle.pos.y += circle.speed;
    }

    if (circle.route.right) {
        circle.pos.x += circle.speed;
    } else {
        circle.pos.x -= circle.speed;
    }
}

function createBlock (ctx) {
    ctx.fillStyle = block.color;
    ctx.beginPath();
    ctx.fillRect(block.pos.x, block.pos.y, block.size.width, block.size.height);
    ctx.fill();
}

function showScore () {
    scoreBlock.innerHTML = score;
}

document.addEventListener('keydown', function(event) {
    if (event.code == "ArrowDown" && block.pos.y + block.size.height <= canvas.height) {
        block.pos.y += block.speed;
    } else if (event.code == "ArrowUp" && block.pos.y >= 0) {
        block.pos.y -= block.speed;
    }
});

showScore();

let playGame = setInterval(function () {
    clearField(ctx, canvas);
    routeCircleY();
    routeCircleX();
    moveCircle();
    createCircle(ctx);
    createBlock(ctx);

    if (circle.pos.y >= block.pos.y && circle.pos.y <= block.pos.y + block.size.height && circle.pos.x >= block.pos.x) {
        circle.route.right = false;
        score++;

        if (score % 2 == 0 && block.speed < 15) {
            block.speed++;
        }

        if (circle.speed < 5) {
            circle.speed += 0.05; 
        }
        
        showScore();
    } else if ((circle.pos.y <= block.pos.y || circle.pos.y >= block.pos.y + block.size.height) && circle.pos.x > block.pos.x) {
        clearInterval(playGame);
        alert("Ваш счёт: " + score);
    }
}, 1000/60);