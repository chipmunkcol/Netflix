import styled from "styled-components";

interface CircleProps {
    bgColor: string,
}

const Circle = ({bgColor} : CircleProps) => {
    return(
        <Draw bgColor={bgColor}/>
    );
}

const Draw = styled.div<CircleProps>`
    width: 100px;
    height: 100px;
    background-color: ${props => props.bgColor};
    border-radius: 50px;
`

export default Circle;