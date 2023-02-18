import { Link } from "react-router-dom";

import { useSubscribeBoardsQuery } from "@hooks/api/subscribe";
import { Plus } from "src/components/atoms/icon";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import Status from "src/page/Subscription/Status";

import $ from "./style.module.scss";

function Subscription() {
  const { data: subscribeBoards } = useSubscribeBoardsQuery();

  return (
    <SettingTemplate
      title="구독/알림"
      right={
        <Link to="/subscription/setting">
          <Plus size={16} stroke="#aaaaaa" />
        </Link>
      }
      className={$.subscription}
    >
      {subscribeBoards?.map((board) => {
        return (
          <Link to={`/preview?boardId=${board.boardId}`}>
            <div key={board.boardId} className={$.item}>
              <span>{board.name}</span>
              <Status boardId={board.boardId} />
            </div>
          </Link>
        );
      })}
    </SettingTemplate>
  );
}

export default Subscription;