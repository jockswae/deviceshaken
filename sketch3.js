// 센서 활성화 함수 (사용자 상호작용 필요)
function activateSensors() {
  // p5.js가 제공하는 유틸리티 함수
  // DeviceOrientationEvent : 모바일 기기의 방향 센서 접근
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          console.log("센서 접근 허용됨");
        } else {
          console.log("센서 접근 거부됨");
        }
      })
      .catch(console.error);
  }
  // 버튼을 숨기거나 제거하여 중복 클릭 방지
  this.remove();
}

function setup() {
  createCanvas(innerWidth, height);
  setShakeThreshold(30);
  activebtn = createButton("Active Sensors");
  activebtn.position(20, 40);
  activebtn.mousePressed();
}
function draw() {
  background(255);
}
function deviceShaken() {
  bgcolor = Color(random(255), random(255), random(255));
}
