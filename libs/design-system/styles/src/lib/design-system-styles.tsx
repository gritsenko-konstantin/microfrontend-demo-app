import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DesignSystemStylesProps {}

const StyledDesignSystemStyles = styled.div`
  color: pink;
`;

export function DesignSystemStyles(props: DesignSystemStylesProps) {
  return (
    <StyledDesignSystemStyles>
      <h1>Welcome to DesignSystemStyles!</h1>
    </StyledDesignSystemStyles>
  );
}

export default DesignSystemStyles;
