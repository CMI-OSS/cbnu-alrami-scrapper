import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import cx from "classnames";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import $ from "./style.module.scss";

type Props = {
  inputId: string;
  inputPw: string;
};

export default function LoginForm() {
  const [ message, setMessage ] = useState("");
  const [ isFocusId, setFocusId ] = useState(false);
  const [ isFocusPw, setFocusPw ] = useState(false);
  const [ isLock, setLock ] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = register("id", { required: true });
  const password = register("password", { required: true });

  useEffect(() => {
    if (errors.id) {
      setMessage("아이디를 입력해주세요.");
      return;
    }
    if (errors.password) {
      setMessage("비밀번호를 입력해주세요.");
      return;
    }
    setMessage("");
  }, [ errors.id, errors.password ]);

  const onSubmit = (data: Props) => {
    console.log(data);
  };

  return (
    <main className={$.main}>
      <span>CMI 관리자</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cx($.idBox, {
            [$.focus]: isFocusId,
          })}
        >
          <IoPersonOutline className={$.icon} />
          <input
            className={$.input}
            placeholder="아이디"
            name={id.name}
            onChange={id.onChange}
            onFocus={() => setFocusId(true)}
            onBlur={() => setFocusId(false)}
            ref={id.ref}
          />
        </div>
        <div
          className={cx($.pwBox, {
            [$.focus]: isFocusPw,
          })}
        >
          <button
            className={$.lockBox}
            type="button"
            onClick={() => setLock(!isLock)}
          >
            {isLock ? (
              <AiOutlineLock className={cx($.icon, $.lock)} />
            ) : (
              <AiOutlineUnlock className={cx($.icon, $.unLock)} />
            )}
          </button>
          <input
            type={isLock ? "password" : "text"}
            placeholder="비밀번호"
            name={password.name}
            onChange={password.onChange}
            onFocus={() => setFocusPw(true)}
            onBlur={() => setFocusPw(false)}
            ref={password.ref}
          />
        </div>
        <p>{message}</p>
        <input className={$.submit} type="submit" value="로그인" />
      </form>
      <img
        alt="우왕이와 친구들"
        src="https://user-images.githubusercontent.com/62797441/141838255-94117137-98fb-4159-920b-5c9051e6998a.jpg"
      />
    </main>
  );
}
