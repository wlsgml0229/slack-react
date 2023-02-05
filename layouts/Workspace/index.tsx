import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "@layouts/Workspace/style";
import React, { FC, useCallback, useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router";
import gravatar from "gravatar";
import loadable from "@loadable/component";
import Menu from "@components/Menu";


//lodable로 불러오기
const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"))

// children 을 쓰려면 FC Type을 쓰면됨
// children props로 사용
const Workspace: FC = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const onLogout = useCallback(() => {
    axios
      .post("http://logcalhost:3095/api/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        mutate(false);
      });
  }, []);

  // 토글함수
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev)
  }, []);

  //swr 전역적으로 데이터 관리
  if (!data) {
    return <Redirect to="/login" />;
  }


  return (
    <div>
      <Header></Header>
      <RightMenu>
        <span onClick={onClickUserProfile}>
          <ProfileImg
            src={gravatar.url(data.email, { s: "28px", d: "retro" })}
            alt={data.nickname}
          />
          {showUserMenu &&
            <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
              프로필 메뉴
            </Menu>
          }
        </span>
      </RightMenu>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>workspaces</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>MenuScroll</MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
