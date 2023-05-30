import {
  AddButton,
  Channels,
  Chats,
  Header, LogOutButton,
  MenuScroll,
  ProfileImg, ProfileModal,
  RightMenu, WorkspaceButton,
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
import {Link} from "react-router-dom";
import {IUser} from "@typings/db";
import Modal from "@components/Modal";
import {Button, Input, Label} from "@pages/SignUp/style";
import useInput from "@hooks/useInput";


//lodable로 불러오기
const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"))

// children 을 쓰려면 FC Type을 쓰면됨
// children props로 사용
const Workspace: FC = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('')
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('')

  //users에서 워크스페이스 정보까지 함께 내려줌
  // const { data, error, mutate } = useSWR<IUser | false>("/api/users", fetcher);
  let data = {nickname: 'aaa' ,email: 'wlsgml0229@naver.com', Workspaces: [{id:1, name:'ababab'}]}

  const onLogout = useCallback(() => {
    axios
      .post("http://logcalhost:3095/api/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  // 토글함수
  const onClickUserProfile = useCallback(() => {
    //과거값 반전
    setShowUserMenu((prev) => !prev)
  }, []);

  const onCloseUserProfile = useCallback((e) => {
    //이벤트 버블링 막아야지 정상동작
    e.stopPropagation();
    setShowUserMenu(false);
  },[])

  const onCreateWorkSpace = useCallback(() => {

  },[])
  const onCloseModal = useCallback(() => {
    console.log('close');
    setShowCreateWorkspaceModal(false);
  },[])

  //swr 전역적으로 데이터 관리 -> data 없을때 처리 안해주면 아래에서 에러남
  if (!data) {
    // return <Redirect to="/login" />;
  }

  const onClickCreateWorkspace = useCallback(() => {
    console.log('click')
    setShowCreateWorkspaceModal(true);
  },[]);

  return (
    <div>
      <Header>test</Header>
      <RightMenu>
        <span onClick={onClickUserProfile}>
          <ProfileImg
            src={gravatar.url(data.nickname, { s: "28px", d: "retro" })}
            alt={data.nickname}
          />
          {showUserMenu &&
            <Menu show={showUserMenu} onCloseModal={onCloseUserProfile} style={{top:0, right:38}}>
              <ProfileModal>
              <img src={gravatar.url(data.nickname, { s: "28px", d: "retro" })}
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
        <Workspaces>
          {data?.Workspaces.map((ws) => {
            return (
                //a tag 대체
                <Link key={ws.id} to={`workspace/${123}/channel/일반`}>
                  <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
                </Link>
            )
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
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
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal} >
        <form onSubmit={onCreateWorkSpace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl}/>
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Workspace;
