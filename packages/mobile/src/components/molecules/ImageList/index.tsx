import { NavLink } from "react-router-dom";

import { Plus } from "@components/atoms/icon";

import $ from "./style.module.scss";

type detailImageType = {
  id: number;
  src: string;
  alt: string;
};
type Props = {
  isMoreContents: boolean;
  detailImageList: detailImageType[];
};

function ImageList({ isMoreContents, detailImageList }: Props) {
  return (
    <ul className={$["menu-list"]}>
      {detailImageList.map((item, index) => {
        return (
          <>
            <li key={item.id} className={$["menu-item"]}>
              <img className={$["menu-image"]} src={item.src} alt={item.alt} />
              {isMoreContents && index === 2 && (
                <NavLink to="/more" className={$["more-status"]}>
                  <Plus
                    className={$["more-plus"]}
                    width="35"
                    height="36"
                    color="#FFFFFF"
                  />
                  {/* <ImagePlus className={$["more-plus"]} /> */}
                  <span className={$["more-text"]}>더보기</span>
                </NavLink>
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}

export default ImageList;
