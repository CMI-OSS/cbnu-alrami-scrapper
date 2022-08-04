import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MapArrow } from "@components/atoms/icon/MapArrow";
import ChipGroup from "@components/molecules/ChipGroup";
import BorderBox from "src/components/atoms/BorderBox";
import { useAppDispatch } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import { imageList, menuList } from "../../../__mocks__/index";
import $ from "./style.module.scss";

interface Props {
  menuType: number;
}
function PlaceDetail({ menuType }: Props) {
  const dispatch = useAppDispatch();
  const [ menu, setMenu ] = useState(0);

  const handleMenu = (idx: number) => {
    setMenu(idx);
    dispatch(setHashMenu({ hashNumber: idx }));
  };

  return (
    <>
      <div className={$.header}>
        <NavLink to="/map" className={$.link}>
          <MapArrow />
          <span className="blind">뒤로가기</span>
        </NavLink>
        <h1 className={$.title}>캠퍼스맵</h1>
        <NavLink to="/call" className={$.place_link}>
          제보하기
        </NavLink>
      </div>
      <ChipGroup
        list={menuList}
        handleSelectMenu={handleMenu}
        menuType={menuType}
      />
      <BorderBox className={$.tooltip} style={{ width: "auto" }}>
        <span className={$.tooltip_title}>
          식사는 현재 베타버전으로, 다양한 맛집이 더 추가될 예정입니다.
        </span>
      </BorderBox>
      <div className={$.content}>
        <div className={$.image_list}>
          {imageList.map((item, idx) => {
            return (
              <NavLink
                to={`/place/school/detail/${idx + 1}`}
                className={$.item}
                key={item.id}
              >
                <img
                  className={$.school_image}
                  src={item.src}
                  alt={item.name}
                />
                <div className={$.summary}>
                  <strong className={$.summary_title}>{item.name}</strong>
                  <span className={$.summary_description}>
                    {item.description}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PlaceDetail;