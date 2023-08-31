import { styled } from "styled-components";


export const MainHome = styled.div`
    background: linear-gradient(to bottom, ${(props => props.theme.representativeColor)}, ${(props => props.theme.colors.background)}) ;
    height: 100vh;
    width: 100%;
`