import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

// props.to 값에 따라 StyledLink를 사용할 것인지 StyledButton 사용할 것인지 설정
// props.cyan ? 1 : 0 한 이유는 styled() 함수로 감싸서 만든 컴포넌트의 경우에는 props가 필터링 되지 않기 때문이다.
// cyan={true} 라는 값이 Link에서 사용하는 a태그에 그대로 전달되는데, a 태그는 boolean 값이 임의 props로 설정되는 것을 허용하지 않는다.
// 그렇기 때문에 boolean을 숫자로 변환해준다.
const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

// 버튼이 받아오는 props를 모두 styledButton에 전달하는 의미
//const Button = (props) => <StyledButton {...props} />;
// const Button = ({ to, history, ...rest }) => {
//   const onClick = (e) => {
//     // to가 있다면 to로 페이지 이동
//     if (to) {
//       history.push(to);
//     }
//     if (rest.onClick) {
//       rest.onClick(e);
//     }
//   };
//   return <StyledButton {...rest} onClick={onClick} />;
// };

// export default withRouter(Button);
export default Button;
