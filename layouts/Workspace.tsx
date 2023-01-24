import React, { FC, useCallback } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect } from "react-router";

// children 을 쓰려면 FC Type을 쓰면됨
// children props로 사용
const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const onLogout = useCallback(() => {
    axios
      .post("http://logcalhost:3095/api/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        mutate(false)
      });
  }, []);

  //swr 전역적으로 데이터 관리
  if(!data) {
    return <Redirect to="/login"/>;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
