\*\* 취중진담 프로젝트 
- 기존에 php와 mySql, javascript를 활용해 팀프로젝트로 만들었던 웹사이트 취중진담을 react.js와 node.js를 활용해 마이그레이션과 리팩토링 작업을 하였다.

- typescript
  개발 과정에서 정적 타입을 통한 개발을 경험해보고 싶다는 생각에 중간에 typescript를 끼워 넣었다.
 typescript에 대해 타입을 선언하는 과정이 굉장히 번거로울 것이라 예상했지만, 라이브러리와의 호환 때문에 겪는 문제라거나, 초기 컴파일 시간이 이렇게 크게 늘어나리라고는 예상하지 못했었다. 라이브러리와의 호환은 이전 버전의 라이브러리를 사용하면 문제를 해결했지만, 초기 컴파일 시간은 줄이기 위해 추후에 번들링과 리액트쿼리를 사용해 랜더링 속도를 앞당기는 방법에 대해 추가적인 공부를 해보고 싶다는 생각이 들었다. 
  그럼에도 타입 에러를 통해 에러를 잡아주기에 예상치 못한 런타임에러들을 많이 줄어주는데 도움이 되었다. type에 적응해가면서 개발 속도가 아주 조금 올라가는 것을 경험했다. 작은 프로젝트이기에 타입스크립트의 장점을 크게 경험하기는 어려웠지만, 안정적인 개발에 왜 타입스크립트가 필요한지를 경험하게 되었다. 

- mysql 
 
- multerS3 - quill image-handler
 기존에는 프로젝트를 진행하며 이미지에 대한 처리를 하지 않았지만 커뮤니티의 기능의 완성도를 높여보고 싶다는 생각에 이미지 처리를 위해 quill의 이미지 핸들러와 multerS3 그리고 이미지를 저장하기 위한 네이버 클라우드 s3를 활용하였다. 
 이미지를 업로드하는 처리 자체는 어렵지 않았지만, 게시글을 수정하는 과정에서 에디터 내에서 이미지의 위치를 기존과 동일하게 설정하게 하는 것이 굉장히 어려웠다. 특히 

- jwt, hash
 비밀번호의 설정 처리 



\*\* 03.21
댓글 더보기 기능으로 변경시키기
이 후 마이페이지 완성 시키고 유저 정보에 이미지 추가시키기 

\*\* 03.21
이미지 처리... 그냥 contents 필드에 이미지를 저장하는 것으로 정리하기...
\*\* 03.19
어제 한 일..
이미지가 있는 경우의 수정과 업로드 부분에 대한 개선
1. 이미지를 에디터에 올려둔 뒤 삭제시, 수정시에 업로드할 때의 자잘한 버그 개선
2. 수정시 위치
3. 조회시 이미지의 위치들에 대한 개선 

오늘 할 일 
1. 수정 페이지에도 해당 옵저버 사용해서 상태 저장 지우기 
2. 댓글 15개 제한 후 넥스트 토큰 값으로 더보기? 기능
3. 마이페이지 해결하기 


\*\* 03.18
글쓰기페이지의 이미지 업로드 수정까지 해결

-> view 페이지에서 저장된 값의 range 위치에 이미지가 위치했으면 좋겠음 
-> 싱글이 아닌 멀티로 이미지를 등록하던지 --> 이미지 배열화 
-- 싱글로만 작동하도록 하던지 

우선은 range값은 필요가 없음 -> boardImgFile의 필드를 배열화 시킬것 타입도 배열로 변경 




\*\* 03.17
현재까지


\*\* 03.16
퀼 이미지 리사이즈 해결 못함...

\*\* 03.14
React Query
React Query는 서버 상태 관리를 위한 라이브러리입니다. 서버에서 데이터를 비동기적으로 불러오고, 캐싱, 동기화, 업데이트 등의 작업을 도와주는 도구입니다. React Query를 사용하면 데이터 불러오기, 캐싱, 데이터 상태 관리 등을 용이하게 할 수 있으며, 이는 주로 데이터 페칭과 관련된 비동기 작업에 초점을 맞춥니다.
list 관련된 곳에 사용할 것 
\*\* 03.12
list page -> 로직들 정리 
\*\* 03.11
- 해야할 일

통합 검색 -> 게시글 검색 기능
텍스트 에디터 만들기 write 페이지 손 보기 - 

\*\* 03.07
- 현재까지 완성한 부분
-> 유저 기능 완성,
-> 댓글
-> 게시글 완성

- 추가 개선 사항,,, 무한스크롤 구현, 스크롤 스무스 구현, -> 해결 

해결해야할 일,
 마이페이지 완성시키기, 술 리뷰 페이지 완성시키기. 


\*\* 02.21
-   view 페이지 다듬고 댓글 기능 -> 좋아요, 조회수 기능 해결하기


\*\* 02.19
내일 할 일

-   view 페이지 다듬고 댓글 기능 -> 좋아요, 조회수 기능 해결하기

오늘 한 일

-   write, read 해결했음
-   listAll 함수 구현 중에 비동기 방식 때문에 어려움을 겪음 해당 함수에 관련 문제 해결 방안을 적어두었음

할 일 순서

1. write 페이지 완성 시키기 user 정보 제외하고

-   게시글 카테고리
-   SQL Injection 보안 이슈: 현재 쿼리 문자열에 직접 변수를 삽입하고 있습니다. 이런 방식은 SQL Injection 공격에 취약하므로, 대신에 파라미터화된 쿼리(parameterized query)나 prepared statement를 사용하는 것이 좋습니다.



\*\* 02.22 - typescript
npm i -g typescript
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
tsc --init
server 
npm install --save-dev typescript @types/node @types/express

\*\* 02.14
리팩토링 시작 날짜
클라이언트 라이브러리 설치
npm i swiper
npm i sass
npm i axios
npm i http-proxy-middleware
npm i react-router-dom
npm i react-redux
npm i @reduxjs/toolkit
npm i react-places-autocomplete
npm i locomotive-scroll,

서버단 라이브러리 설치
npm i nodemon
npm i mysql
npm i express
npm install --save-dev ts-node-dev
npm install jsonwebtoken bcryptjs
npm install dotenv

- 외래 키
-- 외래 키 검사 해제
SET FOREIGN_KEY_CHECKS=0;

-- 외래 키 검사 재활성화
SET FOREIGN_KEY_CHECKS=1;

- TABLE 
CREATE TABLE drinkMember(
  myMemberId INT(10) UNSIGNED AUTO_INCREMENT,
  youId VARCHAR(20) NOT NULL,
  youPass VARCHAR(20) NOT NULL,
  youName VARCHAR(5) NOT NULL,
  youNick VARCHAR(10) NOT NULL,
  youEmail VARCHAR(40) NOT NULL,
  youBirth INT(8) NOT NULL,
  youAddress VARCHAR(80) NOT NULL,
  youImgFile VARCHAR(100) DEFAULT NULL,
  youImgSize VARCHAR(100) DEFAULT NULL,
  memberDelete BOOLEAN DEFAULT 1,
  regTime INT(20) NOT NULL,
  PRIMARY KEY(myMemberID)
) CHARSET=utf8;

CREATE TABLE drinkBoard (
  boardId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED NOT NULL,
  boardCategory VARCHAR(10) NOT NULL,
  boardTitle VARCHAR(255) NOT NULL,
  boardContents LONGTEXT NOT NULL,
  boardAuthor VARCHAR(10) NOT NULL,
  boardView INT(100) NOT NULL,
  boardLike INT(100) NOT NULL,
  boardComment INT(100) NOT NULL,
  boardImgFile VARCHAR(100) DEFAULT NULL,
  boardImgSize VARCHAR(100) DEFAULT NULL,
  boardDelete BOOLEAN DEFAULT 1,
  regTime INT(40) NOT NULL,
  PRIMARY KEY (boardId)
) CHARSET=utf8;

ALTER TABLE drinkBoard ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE;

CREATE TABLE drinkLikes (
  likeId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED,
  boardId INT(10) NOT NULL,
  acId INT(10) UNSIGNED,
  likeCategory VARCHAR(10) NOT NULL,
  likeDelete BOOLEAN DEFAULT 1,
  regTime INT(40) NOT NULL,
  PRIMARY KEY (likeId)
) CHARSET=utf8;

ALTER TABLE drinkLikes ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE SET NULL, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE SET NULL;

CREATE TABLE drinkComment (
  commentId INT(10) UNSIGNED AUTO_INCREMENT,
  myMemberId INT(10) UNSIGNED,
  boardId INT(10) NOT NULL,
  acId INT(10) UNSIGNED,
  commentCategory VARCHAR(10) NOT NULL,
  commentName VARCHAR(20) NOT NULL,
  commentPass VARCHAR(20) NOT NULL,
  commentMsg VARCHAR(225) NOT NULL,
  commentDelete BOOLEAN DEFAULT 1,
  regTime INT(20) NOT NULL,
  PRIMARY KEY (commentId)
) CHARSET=utf8;

ALTER TABLE drinkComment ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE SET NULL, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE SET NULL;

CREATE TABLE drinkList (
  acId INT(10) UNSIGNED AUTO_INCREMENT,
  acCategory VARCHAR(10) NOT NULL,
  acImgPath VARCHAR(255) NOT NULL,
  acName VARCHAR(40) NOT NULL,
  acCompany VARCHAR(20) NOT NULL,
  acDesc LONGTEXT NOT NULL,
  acView INT(100) NOT NULL,
  acLike INT(100) NOT NULL,
  acComment INT(100) NOT NULL,
  acAbv FLOAT NOT NULL,
  acDelete BOOLEAN DEFAULT 1,
  PRIMARY KEY (acId)
) CHARSET=utf8;

ALTER TABLE drinkList ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE;

ALTER TABLE drinkLikes ADD CONSTRAINT FK_myMemberId FOREIGN KEY (myMemberId) REFERENCES drinkMember(myMemberId) ON DELETE CASCADE, ADD CONSTRAINT FK_acId FOREIGN KEY (acId) REFERENCES drinkList(acId) ON DELETE CASCADE;