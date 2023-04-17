var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 캐릭터 점프 중복 가능
// 공룡이 달리는 애니메이션 -> frame으로 구현
// 점수 추가

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'cat.png';

// 캐릭터 등장 좌표, 사이즈, 속성
var cat = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y)
    }
}

// 캐릭터 그리기
cat.draw();



// 장애물 이미지 불러오기
var img2 = new Image();
img2.src = 'wave.png';

// 장애물 속성
class Wave {
    constructor() {
        // 장애물 등장 좌표
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        
        // 이미지를 var로 선언 후 밑의 코드처럼 사용
        ctx.drawImage(img2, this.x, this.y)
    }
}

// 장애물 그리기
var wave = new Wave();
wave.draw();


var timer = 0;
var wave2 = [];
var jumpTimer = 0;
var animation;

// 1초에 60번 코드 실행하기
function frame() {
 animation = requestAnimationFrame(frame) // 웹 브라우저 기본 기능 requestAnimationFrame() 사용
 timer ++;

 // canvas 초기화 (캐릭터 이동 잔상 지우기)
 ctx.clearRect(0,0,canvas.width,canvas.height);

 // 1초에 한 번 wave 그리기
 if (timer % 200 === 0 ){ // 120프레임 중 한 번
     var wave = new Wave();
     
     // wave2 배열 생성 후 catcus 계속 생성해서 보관
     wave2.push(wave);
     }

    wave2.forEach((a, i, o)=> { // cacuts2 배열에 있는 거 다 그리기
        // a.x --; // x좌표 1씩 감소하기 때문에 캐릭터 쪽으로 이동

        // x좌표가 0미만이면 제거하기
        if (a.x < 0 ) {
            o.splice(i,1);
        }
        a.x -= 2;

        // 충돌 체크는 여기서
        충돌(cat, a);

        a.draw();
    })

    // 스페이스바 누를 시 캐릭터 점프 기능
    if (jump == true) {
        cat.y -= 2;
        jumpTimer++;
    }
    if (jump == false) { // 200px 이상으로 올라가지 않도록
        if(cat.y < 200)
        cat.y++;
    }
    if(jumpTimer > 50) {
        jump = false;
        jumpTimer = 0;
    }
    cat.draw();
}

frame();

// 충돌 체크
function 충돌(cat, wave) {
    var x축차이 = wave.x - (cat.x + cat.width);
    var y축차이 = wave.y - (cat.y + cat.height);
    if (x축차이 < 0 && y축차이 < 0) {
        ctx.clearRect(0,0, canvas.width, canvas.height); // 캔버스 초기화
        cancelAnimationFrame(animation) // 애니메이션 정지
    }
}


var jump = false;

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jump = true;
    }
})