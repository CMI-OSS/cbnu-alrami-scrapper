const { writeFileSync } = require("fs");

const root = {
  전공: {
    경영대학: {
      경영정보학과: {
        학부공지: {},
        대학원공지: {},
      },
      경영학부: {
        대학공지: {},
      },
      국제경영학과: {
        학부공지: {},
      },
    },
    공과대학: {
      건축공학과: {
        공지사항: {},
      },
      건축학과: { 공지사항: {} },
      공업화학과: { 공지사항: {} },
      기계공학부: { 공지사항: {} },
      도시공학과: { 공지사항: {} },
      신소재공학과: { 공지사항: {} },
      안전공학과: { 공지사항: {} },
      토목공학부: { 공지사항: {} },
      화학공학과: { 공지사항: {} },
      환경공학과: { 공지사항: {} },
    },
    농업생명환경대학: {
      농업경제학과: { 공지사항: {} },
      목재종이학과: { 공지사항: {} },
      바이오시스템공학과: { 공지사항: {} },
      산림학과: { 공지사항: {} },
      식물의학과: { 공지사항: {} },
      식물자원학과: { 공지사항: {} },
      식품생명공학과: { 공지사항: {} },
      원예학과: { 공지사항: {} },
      지역건설공학과: { 공지사항: {} },
      축산학과: { 공지사항: {} },
      특용식물학과: { 공지사항: {} },
      환경생명화학과: { 공지사항: {} },
    },
    사범대학: {
      교유학과: { 공지사항: {} },
      국어교육과: { 공지사항: {} },
      물리교육과: { 공지사항: {} },
      사회교육과: { 공지사항: {} },
      생물교육과: { 공지사항: {} },
      수학교육과: { 공지사항: {} },
      역사교육과: { 공지사항: {} },
      영어교육과: { 공지사항: {} },
      윤리교육과: { 공지사항: {} },
      지구과학교육과: { 공지사항: {} },
      지리교육과: { 공지사항: {} },
      체육교육과: { 공지사항: {} },
      화학교육과: { 공지사항: {} },
    },
    사회과학대학: {
      경제학과: { 공지사항: {} },
      사회학과: { 공지사항: {} },
      심리학과: { 공지사항: {} },
      정치외교학과: { 공지사항: {} },
      행정학과: { 공지사항: {} },
    },
    생활과학대학: {
      소비자학과: { 공지사항: {} },
      식품영양학과: { 공지사항: {} },
      아동복지학과: { 공지사항: {} },
      의류학과: { 공지사항: {} },
      주거환경학과: { 공지사항: {} },
    },
    수의과대학: {
      수의예과: { 공지사항: {} },
      수의학과: { 공지사항: {} },
    },
    약학대학: {
      공지사항: {},
    },
    융합학과군: {
      디자인학과: { 공지사항: {} },
      조형예술학과: { 공지사항: {} },
    },
    의과대학: { 공지사항: {} },
    인문대학: {
      고고미술사학과: { 공지사항: {} },
      국어국문학과: { 공지사항: {} },
      독일언어문화학과: { 공지사항: {} },
      러시아언어문화학과: { 공지사항: {} },
      사학과: { 공지사항: {} },
      영어영문학과: { 공지사항: {} },
      중어중문학과: { 공지사항: {} },
      철학과: { 공지사항: {} },
      프랑스언어문화학과: { 공지사항: {} },
    },
    자연과학대학: {
      물리학과: { 공지사항: {} },
      미생물학과: { 공지사항: {} },
      생물학과: { 공지사항: {} },
      생화학과: { 공지사항: {} },
      수학과: { 공지사항: {} },
      정보통계학과: { 공지사항: {} },
      지구환경과학과: { 공지사항: {} },
      천문우주학과: { 공지사항: {} },
      화학과: { 공지사항: {} },
    },
    전자정보대학: {
      소프트웨어학부: { 공지사항: {} },
      전기공학부: { 공지사항: {} },
      전자공학부: { 공지사항: {} },
      정보통신공학부: { 공지사항: {} },
      컴퓨터공학과: { 공지사항: {} },
      지능로봇공학과: { 공지사항: {} },
    },
  },
  공통: {
    충북대학교: { 공지사항: {}, 학사장학: {}, 행사세미나: {} },
    학생생활관: { 공지사항: {} },
    국제교류본부: { 공지사항: {} },
    linc사업단: { 공지사항: {} },
    sw중심대학사업단: { 공지사항: {} },
    취업지원본부: { 공지사항: {} },
  },
};

let insertBoardSql = ``;
let insertBoardTreeSql = ``;

function genBoardId(parent) {
  let num = 1;

  const format = (num) => (num < 10 ? `0${num}` : num.toString());

  const parentId = parent?.id ?? "";
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in parent) {
    // eslint-disable-next-line no-continue
    if (key === "id") continue;
    // eslint-disable-next-line no-param-reassign
    parent[key] = {
      id: Number(parentId + format(num)),
      ...parent[key],
    };
    insertBoardSql += `INSERT INTO board (id, name, url) VALUES(${parent[key].id},'${key}','');\n`;
    insertBoardTreeSql += `INSERT INTO board_tree (board_id, parent_board_id) VALUES(${
      parent[key].id
    }, ${parentId || null});\n`;
    genBoardId(parent[key]);
    num += 1;
  }
}
genBoardId(root);

writeFileSync("board-tree.generated.json", JSON.stringify(root));
writeFileSync(
  "board-tree.generated.sql",
  `${insertBoardSql}\n${insertBoardTreeSql}`,
);
