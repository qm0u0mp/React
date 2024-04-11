import React, { ChangeEvent, useState } from 'react'
import './style.css';
import SignInBackground from 'assets/image/sign-in-background.png';
import SignUpBackground from 'assets/image/sign-up-background.png';
import InputBox from 'components/Inputbox';

type AuthPage = 'sign-in'|'sign-up';

// SNS ==========================================================================================================
interface SnsContainerProps{
  title: String;
}

function SnsContainer({title} : SnsContainerProps) {

  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    alert(type);
  }
  
  return (
    <div className='authentication-sns-container'>
      <div className='sns-container-title label'>{title}</div>
      <div className='sns-button-container'>
        <div className='sns-button kakao-button'onClick={() => onSnsButtonClickHandler('kakao')}></div>
        <div className='sns-button naver-button' onClick={() => onSnsButtonClickHandler('naver')}></div>
      </div>
    </div>
  );
}

// 로그인 ==========================================================================================================
interface Props{
  onLinkClickHandler: () => void 
}

function SignIn({onLinkClickHandler} : Props) {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const onSignInButtonClickHandler = () => {
    alert(`아이디 : ${id} / 비밀번호 : ${password}`);
    setId('');
    setPassword('');
  };

  return(
    <div className='authentication-contents'>
      <div className='authentication-input-container'>
        <InputBox 
          label='아이디' 
          type='text'
          value={id}
          placeholder='아이디를 입력해주세요.'
          onChangeHandler={onIdChangeHandler}
        />
        <InputBox 
          label='비밀번호' 
          type='password'
          value={password}
          placeholder='비밀번호를 입력해주세요.'
          onChangeHandler={onPasswordChangeHandler}
        />
      </div>
      <div className='authentication-button-container'>
        <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
        <div id="sign-up-link" className="text-link" onClick={onLinkClickHandler}>회원가입</div>
      </div>
      <div className='short-divider'></div>
      <SnsContainer title='SNS 로그인'/>
    </div>
  )
}

// 회원가입 ==========================================================================================================
function SignUp({onLinkClickHandler}: Props){

  const[id, setId] = useState<string>('');
  const[password, setPassword] = useState<string>('');
  const[passwords, setPasswords] = useState<string>('');
  const[email, setEmail] = useState<string>('');
  const[emailNumber, setEmailNumber] = useState<string>('');

  const[idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
  const[emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const[emailNumberButtonStatus, setEmailNumberButtonStatus] = useState<boolean>(false);

  // 아이디
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setId(value);
    setIdButtonStatus(value !== '');
  }

  // 비밀번호
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
  }

  // 비밀번호 확인
  const onPasswordsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswords(value);
  }

  // 이메일
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
    setEmailButtonStatus(value !== '');
  }

  // 이메일 확인
  const onEmailNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailNumber(value);
    setEmailNumberButtonStatus(value !== '');
  }


  const onIdButtonClickHandler = () => {
    if(!idButtonStatus) {
      return;
    }

    alert(id);
  }

  const onEmailButtonClickHandler = () => {
    if(!emailButtonStatus) {
      return;
    }

    alert(email);
  }

  const onEmailNumberButtonClickHandler = () => {
    if(!emailNumberButtonStatus) {
      return;
    }

    alert(emailNumber);
  }

  const onSignInButtonClickHandler = () => {

  }

  return(
    <div className='authentication-contents'>
        <SnsContainer title='SNS 회원가입'/>
        <div className='short-divider'></div>
        <div className='authentication-input-container'>
          <InputBox 
            label='아이디' 
            type='text' 
            value={id} 
            placeholder='아이디를 입력해주세요.' 
            onChangeHandler={onIdChangeHandler} 
            buttonTitle='중복확인' 
            buttonStatus={idButtonStatus}
            onButtonClickHandler={onIdButtonClickHandler}
          />

          <InputBox 
            label='비밀번호' 
            type='password' 
            value={password} 
            placeholder='비밀번호를 입력해주세요.' 
            onChangeHandler={onPasswordChangeHandler} 
          />

          <InputBox 
            label='비밀번호 확인' 
            type='password' 
            value={passwords} 
            placeholder='비밀번호를 입력해주세요.' 
            onChangeHandler={onPasswordsChangeHandler}
          />

          <InputBox 
            label='이메일' 
            type='text' 
            value={email} 
            placeholder='이메일을 입력해주세요.' 
            onChangeHandler={onEmailChangeHandler} 
            buttonTitle='이메일 인증' 
            buttonStatus={emailButtonStatus}
            onButtonClickHandler={onEmailButtonClickHandler}
          />

          <InputBox 
            label='인증번호' 
            type='text' 
            value={emailNumber} 
            placeholder='인증번호를 입력해주세요.' 
            onChangeHandler={onEmailNumberChangeHandler} 
            buttonTitle='인증확인' 
            buttonStatus={emailNumberButtonStatus}
            onButtonClickHandler={onEmailNumberButtonClickHandler}
          />
        </div>
        <div className='authentication-button-container'>
          <div className="disable-button full-width" onClick={onSignInButtonClickHandler}>회원가입</div>
          <div id="sign-up-link" className="text-link" onClick={onLinkClickHandler}>로그인</div>
        </div>
    </div>
  )
}

// 브라우저 ==========================================================================================================
export default function Authentication() {
  
  const [page, setPage] = useState<AuthPage>('sign-in');
  
  const onLinkClickHandler = () => {
    if(page === 'sign-in'){
      setPage('sign-up');
    } else {
      setPage('sign-in');
    }
  }

  const AuthenticationContents = page === 'sign-in' ? <SignIn onLinkClickHandler={onLinkClickHandler}/> : <SignUp onLinkClickHandler={onLinkClickHandler}/>;

  const imageBoxStyle = {backgroundImage: `url(${page === 'sign-in' ? SignInBackground : SignUpBackground})`}

  return( 
    <div id="authentication-wrapper">
      <div className='authentication-image-box' style={imageBoxStyle}></div>
      <div className='authentication-box'>
        <div className='authentication-container'>
          <div className='authentication-title h1'>{'임대 주택 가격 서비스'}</div>
          {AuthenticationContents}
        </div>
      </div>
  </div>
  );
}
