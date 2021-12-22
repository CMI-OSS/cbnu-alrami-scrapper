import { ScenarioType } from "@shared/types";

const scenarios: ScenarioType[] = [
  {
    id: 1,
    title: "소프트웨어학과",
    subTitle: "공지사항",
    tags: [
      "전자정보대학",
      "관리 요망",
      "테스트 태그",
      "많은",
      "태그가",
      "있을 때",
      "이렇게",
      "보입니다",
    ],
    group: "전자정보대학",
    state: "clean",
  },
  {
    id: 2,
    title: "컴퓨터공학과",
    subTitle: "공지사항",
    tags: [ "전자정보대학" ],
    group: "전자정보대학",
    state: "excluded",
  },
  {
    id: 3,
    title: "정보통신학과",
    subTitle: "공지사항",
    tags: [ "전자정보대학" ],
    group: "전자정보대학",
    state: "warning",
  },
  {
    id: 4,
    title: "전자공학부",
    subTitle: "공지사항",
    tags: [ "전자정보대학" ],
    group: "전자정보대학",
    state: "error",
  },
  {
    id: 5,
    title: "전기공학부",
    subTitle: "공지사항",
    tags: [ "전자정보대학" ],
    group: "전자정보대학",
    state: "error",
  },
  {
    id: 6,
    title: "지능로봇공학과",
    subTitle: "공지사항",
    tags: [ "전자정보대학" ],
    group: "전자정보대학",
    state: "error",
  },
  {
    id: 7,
    title: "심리학과",
    subTitle: "공지사항",
    tags: [ "사회과학대학" ],
    group: "사회과학대학",
    state: "clean",
  },
  {
    id: 8,
    title: "사회학과",
    subTitle: "공지사항",
    tags: [ "사회과학대학" ],
    group: "사회과학대학",
    state: "error",
  },
  {
    id: 9,
    title: "정치외교학과",
    subTitle: "공지사항",
    tags: [ "사회과학대학" ],
    group: "사회과학대학",
    state: "error",
  },
  {
    id: 10,
    title: "철학과",
    subTitle: "공지사항",
    tags: [ "인문대학" ],
    group: "인문대학",
    state: "clean",
  },
];

export default scenarios;
