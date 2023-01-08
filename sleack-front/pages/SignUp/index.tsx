import React, { useCallback, useState } from "react";
import { Form, Error, Label, Input, LinkContainer, Button, Header } from "./style";

//커스텀 컴포넌트 추가
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMissMatchError] = useState(false);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[]);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  },[]);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
    setMissMatchError(e.target.value !== passwordCheck)
    // deps 에 passwordCheck 만 변하는지 넣어준 이유
    // 이 함수 기준으로 외부변수 체크하도록 넣음
  },[passwordCheck]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setMissMatchError(e.target.value !== password)
  },[password]);

  const onSubmit = useCallback((e) => {
    e.prventDefault();
    console.log(email, nickname, password, passwordCheck)
    if(!mismatchError) {
      console.log('서버로 회원가입')
    }
  },[email,nickname,password,passwordCheck]);

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {/* {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && (
            <Success>회원가입되었습니다! 로그인해주세요.</Success>
          )} */}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};
export default SignUp;
