import {
  Channels,
  Chats,
  Header, LogOutButton,
  MenuScroll,
  ProfileImg, ProfileModal,
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
    //과거값 반전
    setShowUserMenu((prev) => !prev)
  }, []);

  //swr 전역적으로 데이터 관리
  // if (!data) {
  //   return <Redirect to="/login" />;
  // }


  return (
    <div>
      <Header>test</Header>
      <RightMenu>
        <span onClick={onClickUserProfile}>
          <ProfileImg
            src={gravatar.url(data?.nickname, { s: "28px", d: "retro" })}
            alt={data?.nickname}
          />
          {showUserMenu &&
            <Menu show={showUserMenu} onCloseModal={onClickUserProfile} style={{top:0, right:38}}>
              <ProfileModal>
              <img src={gravatar.url(data?.nickname, { s: "28px", d: "retro" })}
                   alt={data?.nickname}/>
                <div>
                  <span id="profile-name">{data?.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
              </ProfileModal>
              <LogOutButton></LogOutButton>
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
          chats!!!
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
