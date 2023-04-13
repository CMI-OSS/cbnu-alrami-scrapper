import { boardTree } from "@shared/board-tree/board-tree.generated";

import 건축공학과 from "./건축공학과";

const script = {
  url: "https://safety.cbnu.ac.kr/index.php?mid=safety_sub04",
  site_id: boardTree.전공.공과대학.안전공학과.공지사항.id,
  site: "안전공학과",
  category: "공지사항",
};

export default { ...건축공학과, ...script };
