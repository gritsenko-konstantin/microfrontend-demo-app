import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TioCommonProps {}

const StyledTioCommon = styled.div`
  color: pink;
`;

export function TioCommon(props: TioCommonProps) {
  return (
    <StyledTioCommon>
      <h1>Welcome to TioCommon!</h1>
    </StyledTioCommon>
  );
}

export default TioCommon;
