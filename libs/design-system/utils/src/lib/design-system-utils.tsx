import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DesignSystemUtilsProps {}

const StyledDesignSystemUtils = styled.div`
  color: pink;
`;

export function DesignSystemUtils(props: DesignSystemUtilsProps) {
  return (
    <StyledDesignSystemUtils>
      <h1>Welcome to DesignSystemUtils!</h1>
    </StyledDesignSystemUtils>
  );
}

export default DesignSystemUtils;
