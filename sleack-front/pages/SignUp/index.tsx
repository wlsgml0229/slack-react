import useInput from "@hooks/useInput";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Form, Error, Label, Input, LinkContainer, Button, Header, Success } from "./style";

//커스텀 컴포넌트 추가
const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMissMatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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
    console.log(email, nickname, password, passwordCheck);
    //초기화 - 요청보내기 이전의 데이터가 남아있는걸 방지 하기 위해서 요청보내기직전에 초기화추가
    setSignUpError('');
    setSignUpSuccess(false);
    if(!mismatchError && nickname) {
     axios.post('/api/users', {email, nickname, password}).then((res) => {
        setSignUpSuccess(true)
     }).catch((err)=>{
      setSignUpError(err.response.data);
     }).finally(()=> {

     })
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
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && (
            <Success>회원가입되었습니다! 로그인해주세요.</Success>
          )}
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
