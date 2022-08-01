# wanted_pre_onboarding

---

# 목차

1. 프로젝트 소개
2. DB 설계
3. API 설계
4. Test code 설계
5. Git commit 메시지 컨벤션

---

# 1. 프로젝트 소개

이 과제는 기업의 채용을 위한 웹 서비스를 구현한 것입니다. 회사는 채용 공고를 생성하고, 지원자는 지원할 수 있는 API를 구현하는 것이 목적입니다.


## Run

#### 1. 환경변수 파일 생성

* DB와 연동되어야 서버 실행이 가능합니다.
* **.env** 파일 내용
```
# ? 부분에 사용하는 DB 정보를 입력합니다.
DB_USER = ?
DB_PASSWORD = ?
DB_DATABSE = ?
```

#### 2. 서버 실행
```
# 작업 경로로 이동
$ cd /back

# 서버 실행 명령어 실행
$ npm start
```

#### 3. 접속
```
http://localhost:3000
```


## Skill stack / Dependencies
* Back
  * Node.js (v16.13.0)
  * Express (v4.18.1)
  * MySQL (v8.0.28)
  * Sequelize (v6.20.1)
* Test
  * Mocha (v10.0.0)
  * Should (v13.2.3)
  * Supertest (v6.2.3)

---

# 2. DB 설계
* REBMS: MySQL
* DB_NAME: wanted_preonboarding
* DB_TABLES:
	1. recruits
	2. users

## tables
#### recruits
No | Column Name | Datatype | Key | Null | 비고
-- | ----------- | -------- | --- | ---- | --- |
1 | id | INT | PK | Not Null | Auto Increment
2 | companyName | VARCHAR(15) |  | Not Null |  
3 | country | VARCHAR(30) |  | Not Null |  
4 | location | VARCHAR(30) |  | Not Null |
5 | recruitPosition | VARCHAR(30) |  | Not Null |
6 | signingBonus | INT |  | Not Null |
7 | recruitDescribe | VARCHAR(300) |  | Not Null |
8 | skillStack | VARCHAR(100) |  | Not Null | 
9 | createAt | DATETIME |  | Not Null | 
10 | updateAt | DATETIME |  | Not Null | 

#### users
No | Column Name | Datatype | Key | Null | 비고
-- | ----------- | -------- | --- | ---- | --- |
1 | id | INT | PK | Not Null | Auto Increment
2 | email | VARCHAR(45) |  | Not Null | Unique
3 | userName | VARCHAR(15) |  | Not Null |  
4 | password | VARCHAR(100) |  | Not Null |
5 | createAt | DATETIME |  | Not Null | 
6 | updateAt | DATETIME |  | Not Null | 
7 | RecruitId | INT | FK | Not Null |

## ERD
![users-recruits](https://user-images.githubusercontent.com/80298502/173796311-64ea6e81-3cca-429e-b543-52ab70b67e90.JPG)

* users 테이블의 외래키 RecruitId와 recruits 테이블의 id 연결을 통해 테이블 관계 형성(1:N)

---

# 3. API 설계

## 채용공고 등록
* URL: /register
* METHOD: POST
* Request
```
{
    "companyName" : "당근마켓",
    "recruitPosition" : "검색팀 백엔드 인턴",
    "country": "한국",
    "location": "서울",
    "signingBonus" : 1000000,
    "recruitDescribe" : "당근마켓 검색팀에서 백엔드로 일할 인턴을 채용합니다 ...",
    "skillStack" : "node.js Mysql"
}
```
* Response
	* status: 201
```
{
    "id": 4,
    "companyName": "당근마켓",
    "recruitPosition": "검색팀 백엔드 인턴",
    "country": "한국",
    "location": "서울",
    "signingBonus": 1000000,
    "recruitDescribe": "당근마켓 검색팀에서 백엔드로 일할 인턴을 채용합니다 ...",
    "skillStack": "node.js Mysql",
    "updatedAt": "2022-06-14T14:03:59.325Z",
    "createdAt": "2022-06-14T14:03:59.325Z"
}
```

## 채용공고 수정
* URL: /recruits/:id
* METHOD: PUT
* Request
	* url: /recruits/4
```
{
    "companyName" : "당근",
    "country" : "대한민국"
}
```
* Response
	* status: 200
```
{
    "id": 4,
    "companyName": "당근",
    "country": "대한민국",
    "location": "서울",
    "recruitPosition": "검색팀 백엔드 인턴",
    "signingBonus": 1000000,
    "recruitDescribe": "당근마켓 검색팀에서 백엔드로 일할 인턴을 채용합니다 ...",
    "skillStack": "node.js Mysql",
    "createdAt": "2022-06-14T14:03:59.000Z",
    "updatedAt": "2022-06-14T14:04:17.859Z"
}
```

## 채용공고 삭제
* URL: /recruits/:id
* METHOD: DELETE
* Response
	* status: 204

## 채용공고 목록 조회
* URL: /recruits
* METHOD: GET
* Request
	* url: /recruits
* Response
	* status: 200
```
[
    {
        "id": 1,
        "companyName": "라인",
        "country": "한국",
        "location": "판교",
        "recruitPosition": "경력 백엔드",
        "signingBonus": 500000,
        "skillStack": "JAVA"
    },
    {
        "id": 2,
        "companyName": "당근마켓",
        "country": "한국",
        "location": "서울",
        "recruitPosition": "신입 백엔드",
        "signingBonus": 5000000,
        "skillStack": "node.js"
    },
    {
        "id": 3,
        "companyName": "당근마켓",
        "country": "한국",
        "location": "서울",
        "recruitPosition": "신입 프론트엔드",
        "signingBonus": 5000000,
        "skillStack": "react.js"
    },
    {
        "id": 4,
        "companyName": "당근마켓",
        "country": "한국",
        "location": "서울",
        "recruitPosition": "node.js 개발자",
        "signingBonus": 500000,
        "skillStack": "node.js"
    }
]
```

## 채용공고 검색
* URL: /search
* METHOD: GET
* Request
	* url: /search?keyword=node.js
* Response
	* status: 200
```
[
    {
        "id": 4,
        "companyName": "당근",
        "country": "한국",
        "location": "서울",
        "recruitPosition": "node.js 개발자",
        "signingBonus": 500000,
        "skillStack": "node.js"
    },
    {
        "id": 2,
        "companyName": "당근마켓",
        "country": "한국",
        "location": "서울",
        "recruitPosition": "신입 백엔드",
        "signingBonus": 5000000,
        "skillStack": "node.js"
    }
]
```

## 채용 상세페이지 조회
* URL: /recruits/:id
* METHOD: GET
* Request
	* url: /recruits/2
* Response
	* status: 200
```
{
    "id": 2,
    "companyName": "당근마켓",
    "country": "한국",
    "location": "서울",
    "recruitPosition": "신입 백엔드",
    "signingBonus": 5000000,
    "skillStack": "node.js",
    "recruitDescribe": "당근마켓 검색팀에서 인턴을 모집합니다 ...",
    "otherRecruits": [
        3,
        4
    ]
}
```

---

# 4. Test code 설계
> API별 기능 테스트 실시

## 채용공고 등록 테스트
* 성공 시
	* 생성된 객체의 id 반환
	* 입력한 companyName 반환
* 실패 시
	* compnanyName 파라미터 누락 시 400 반환

## 채용공고 수정 테스트
* 성공 시
	* 변경된 companyName을 응답
	* 변경된 recruitPosition을 응답
	* 변경된 signingBonus을 응답
	* 변경된 recruitDescribe을 응답
	* 변경된skillStack을 응답

## 채용공고 삭제 테스트
* 성공 시
	* 204 응답

## 채용공고 목록 조회 테스트
* 성공 시
	* 채용 공고 객체를 담은 배열 응답

## 채용공고 상세 페이지 조회 테스트
* 성공 시
	* id와 일치한 채용 상세페이지를 반환
* 실패 시
	* id로 객체를 찾을 수 없는 경우 404 응답

---

# 5. Git commit 메시지 컨벤션

> 커밋 메시지를 어떠한 근거로 작성할 것인지 명시

* "태그 : 제목" 의 형태이며, : 뒤에만 space가 있습니다.

작업 | 설명 | 비고
--- | --- | --- |
Feat | 새로운 기능 생성 및 파일 추가 | 
Docs | 문서 생성 및 수정 | 
Upgrade | 기존 기능 수정 | 성능 향상 O
Refactor | 기존 기능 수정 | 성능 향상 X
Delete | 기능 제거 및 파일 삭제 | 
Test | 테스트 코드 추가 및 리팩토링
Fix | 오류 수정

#### 제목
- 제목의 총 글자 수는 50자 이내로 작성

#### 본문
- 본문은 한 줄당 72자 내로 작성
- 본문의 내용은 양에 구애받지 않고 최대한 상세히 작성
- 어떻게 변경했는지보다 **무엇을 변경했는지** 또는 **왜 변경했는지** 설명

#### Commit Message 예시
```
Feat: 초기 환경 설정

* index.js : 프로젝트의 메인 코드 파일
* bin/www.js : express 모듈 연결하고 포트 지정하는 부분
* config/config.js : 시퀄라이즈 환경 설정
```

