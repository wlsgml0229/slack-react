import React, { FC, useCallback } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";

// children 을 쓰려면 FC Type을 쓰면됨
// children props로 사용
const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR("/api/users", fetcher);
  const onLogout = useCallback(() => {
    axios
      .post("http://logcalhost:3095/api/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      });
  }, []);

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
