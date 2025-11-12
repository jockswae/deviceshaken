let key = "b40e8bf2dddb4f2491281c1a5ecc7db1";
let keyword = "design";
let language = "en";
let address1 = "https://newsapi.org/v2/everything?q=";
let address2 = "&language=";
let address3 =
  "&from=2025-11-01&to=2025-11-09&sortBy=popularity&pageSize=10&apiKey=";
let url;
let keyInput;
let langInput;
// let rawtxt = "";
let words = [];

function preload() {
  url = `${address1}${keyword}${address2}${language}${address3}${key}`;
  loadJSON(url, gotData);
}
function gotData(data) {
  //print(data); //data는 JSON 객체.

  // step 1. 텍스트 합치기
  let articles = data.articles;
  let rawtxt = "";
  if (articles) {
    for (let i = 0; i < articles.length; i++) {
      rawtxt += articles[i].description;
    }
    //print(rawtxt);
  }

  /////////////// step 2. 정리하기 ///////////////

  // step 2-1. 일괄 소문자
  // 텍스트 비교, 분석시 대소문자 차이 없애기 위해
  // 검색 및 필터링 정확도 향상
  // '데이터 정규화'. API를 통해 가져온 데이터의 형식을 표준화하여 일관성 주기.
  let lowertxt = rawtxt.toLowerCase();
  //print(lowertxt);

  // step 2-2. 특수문자를 공백으로 교체하기
  // /.../ 정규 표현식 리터럴의 시작과 끝 의미.
  // [] 문자 집합 - 정규표현식 리터럴은 이 안에 포함된 문자중 하나를 찾으려고
  // g 전역 플래그 : 문자열 끝까지 검색. 없으면 가장 먼저 일치하는 하나만 찾고 검색 멈춤.
  let cleantxt = lowertxt.replace(/[!?.,"':;(){}]/g, " ");
  //print(cleantxt);
  // ex) 공백 제거하기
  // let trimmedtxt = lowertxt.replace(/[ ]/g, "");

  // step 2-3. 단어 배열로 바꾸기
  let cleanwords = cleantxt.split(/\s+/);
  // print(words);

  // step 4-1. 정렬하기 오름차순 / 내림차순
  //let sortedWords = cleanwords.sort();
  // words = cleanwords.sort((a, b) => {
  //   if (a < b) {
  //     return 1;
  //   } else if (a > b) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // });

  // step 4-2. 정렬하기 길이 짧은순 / 길이 긴순
  // 비교함수. 세가지 값중 하나 반환해야함: 음수,양수,0
  //words = cleanwords.sort((a, b) => {
  // 길이 짧은 순
  // return a.length - b.length;
  // a: 10, b: 5. 결과 양수. b가 앞으로.
  // a: 5, b: 10, 결과 음수. a가 앞으로.
  // 길이 긴 순
  // return b.length - a.length;
  // a: 10, b:5. 결과 음수 -5. a가 앞으로.
  // a: 5, b: 10. 결과 양수 5. b가 앞으로.
  //});
  //words = cleanwords.sort();

  // step 5. 필터링하기. 배열 메서드.
  ////// i 를 포함하는 문자열만 포함하기
  // 방법 1
  // string.include('i') : i 는 string만 받음. true/false 반환.
  // words = cleanwords.filter((word) => word.includes("i"));
  // 방법 2
  // string.match('i') : i는 정규표현식만 받음.
  words = cleanwords.filter((word) => word.match(/[아]/g));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  keyInput = createInput("design");
  keyInput.position(20, 40);
  keyInput.changed(updateData);
  langInput = createSelect();
  langInput.position(180, 40);
  langInput.option("ko");
  langInput.option("en");
  langInput.selected("en");
  langInput.changed(updateData);
}

function updateData() {
  language = langInput.value();
  keyword = keyInput.value();
  url = `${address1}${keyword}${address2}${language}${address3}${key}`;
  loadJSON(url, gotData);
}

function draw() {
  background(255);

  // step 3. 그리기
  let fsize = 60;
  textSize(fsize);
  let x = 0;
  let y = fsize * 2;
  for (let i = 0; i < words.length; i++) {
    let t = words[i];
    let tw = textWidth(t);
    text(words[i], x, y);
    x += tw + fsize / 2;
    if (x > width - 150) {
      y += fsize;
      x = 0;
    }
  }
}

