import styled from "styled-components"

interface ISlderBtn{
    onclickPrev: ()=>void;
    onclickNext: ()=>void;
    number: number;
}

function SliderBtn ({onclickPrev, onclickNext, number}:ISlderBtn) {
    return(
        <>
        <ButtonAreaL number={number} onClick={onclickPrev}>
            <ButtonL className="button" >{"<"}</ButtonL>
        </ButtonAreaL>
        <ButtonAreaR number={number} onClick={onclickNext}>
            <ButtonR className="button" >{">"}</ButtonR>
        </ButtonAreaR>
        </>
    )
}

const ButtonAreaL = styled.div<{number:number}>`
position: absolute;
top: ${props=>props.number === 1 ? "86.7%" : props.number === 2 ? "128.7%" : "167.7%"};
width: 50px;
height: 170px;
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
opacity: 1;
cursor: pointer;
`
const ButtonAreaR = styled(ButtonAreaL)`
right: 0;
`
const ButtonL = styled.span`
font-weight: 800;
font-size: 36px;
position: absolute;
z-index: 999;
top: 40%;
opacity: 1;
`
const ButtonR = styled(ButtonL)`
`

export default SliderBtn;