function Ball(x, y, color, dx, dy){
    this.x = x;
    this.y = y;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.element = document.createElement('div');

    this.element.style.position = 'absolute';
    this.element.style.marginLeft = this.x + 'px';
    this.element.style.marginTop = this.y + 'px';
    this.element.style.width = '30px';
    this.element.style.height = '30px';
    this.element.style.borderRadius = '50%';
    this.element.style.backgroundColor = this.color;
}


function move(ballObj){
    var positionX = parseInt(ballObj.element.style.getPropertyValue('margin-left'));
    var positionY = parseInt(ballObj.element.style.getPropertyValue('margin-top'));
    setInterval(function(){
        positionX += ballObj.dx;
        positionY += ballObj.dy;
        ballObj.element.style.marginLeft = positionX + 'px';
        ballObj.element.style.marginTop = positionY + 'px';
        if (positionX >= 570 || positionX <= 0){
            ballObj.dx = -ballObj.dx;
        }
        if(positionY <= 0 || positionY >= 370){
            ballObj.dy = -ballObj.dy;
        }

    }, 100);
}

var balls = [
    //{ x: 200, y: 300, color: 'red'},
    //{ x: 400, y: 300, color: 'yellow'},
    //{ x: 290, y: 100, color: 'green'},
    //{ x: 500, y: 200, color: 'blue'},
    //{ x: 550, y: 300, color: 'grey'},
    //{ x: 190, y: 150, color: 'orange'},
    //{ x: 350, y: 250, color: 'black'},
    //{ x: 230, y: 110, color: 'purple'},
    //{ x: 110, y: 220, color: 'pink'},
    //{ x: 260, y: 250, color: 'indigo'},
    //{ x: 310, y: 270, color: 'violet'},
    //{ x: 500, y: 310, color: 'lightblue'},
]

function selectBall(){
    for ( var i = 0; i < 10; i++){
        var x = parseInt(Math.random() * 600 );
        var y = parseInt(Math.random() * 400 );
        var r = parseInt(Math.random() * 255);
        var g = parseInt(Math.random() * 255);
        var b = parseInt(Math.random() * 255);
        var temp = {};
        temp.x = x;
        temp.y = y;
        temp.color = 'rgb('+r+','+g+','+b+')';
        balls.push(temp);
        console.log(balls);
    }
}

selectBall();


var box = document.getElementById('box');
var allBalls = [];
balls.forEach( function(ball) {
    var dx = parseInt( Math.random() * 40 - 20);
    var dy = parseInt( Math.random() * 40 - 20);
    if (dx === 0 ){ dx = -5;}
    if( dy === 0 ){ dy = -10;}
    var ballObj = new Ball(ball.x, ball.y, ball.color, dx, dy);
    box.appendChild(ballObj.element);
    move(ballObj);
    allBalls.push(ballObj);
});

function calculateDistance(){
    for ( var i = 0; i < allBalls.length; i++ ){
        var x1 = parseInt(allBalls[i].element.style.getPropertyValue('margin-left'));
        var y1 = parseInt(allBalls[i].element.style.getPropertyValue('margin-top'));
        for ( var j = i+1; j < allBalls.length; j++){
            var x2 = parseInt(allBalls[j].element.style.getPropertyValue('margin-left'));
            var y2 = parseInt(allBalls[j].element.style.getPropertyValue('margin-top'));
            var distX = x1 - x2;
            var distY = y1 - y2;
            var dist = Math.sqrt( distX * distX + distY * distY);
            if (dist < 35){
                if(allBalls[i].dx > 0 && allBalls[j] > 0){
                    allBalls[i].dy = -allBalls[i].dy;
                    allBalls[j].dy = -allBalls[j].dy;
                }
                allBalls[i].dx = -allBalls[i].dx;
                
                allBalls[j].dx = -allBalls[j].dx;
                
            }
            
        }
    }
}

setInterval( function(){
    calculateDistance();
}, 1);

