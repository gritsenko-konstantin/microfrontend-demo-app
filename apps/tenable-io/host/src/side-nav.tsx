
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Link } from 'react-router-dom';

const Navigation = styled.div`
    background: ${themeGet('colors.primary_light')};
`;

const NavigationItem = styled(Link)`
    background: ${themeGet('colors.primary')};
    border: 1px solid ${themeGet('colors.primary_dark')};
    border-top: none;
    color: ${themeGet('colors.white_text')};
    display: block;
    font-size: ${themeGet('fontSizes.1')};
    width: 200px;
    padding: ${themeGet('space.2')};
    text-decoration: none;

    :hover {
        background: ${themeGet('colors.primary_dark')};
    }
`;

export function SideNav() {
    return (
        <Navigation>
            <NavigationItem to='/app1'>App 1</NavigationItem>
            <NavigationItem to='/app2'>App 2</NavigationItem>
        </Navigation>
    );
}

export default SideNav;
