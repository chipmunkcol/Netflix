import { useRecoilValue } from "recoil";
import styled from "styled-components"
import { whiteMode } from "../../state/whiteModeState";

interface ISlderBtn{
    onclickPrev: ()=>void;
    onclickNext: ()=>void;
    number?: number;
}
function SliderBtn ({onclickPrev, onclickNext, number}:ISlderBtn) {

const WhiteMode = useRecoilValue(whiteMode)

    return(
        <>
        <ButtonAreaL onClick={onclickPrev} number={number} WhiteMode={WhiteMode}>
            <ButtonL className="button" >{"<"}</ButtonL>
        </ButtonAreaL>
        <ButtonAreaR onClick={onclickNext} number={number} WhiteMode={WhiteMode}>
            <ButtonR className="button" >{">"}</ButtonR>
        </ButtonAreaR>
        </>
    )
}

const ButtonAreaL = styled.li<{number?:number, WhiteMode:boolean}>`
position: absolute;
top: ${props=>props.number === 3 ? "3%" : "23%"}; // top10 영화인 3번째 슬라이더
width: 50px;
height: 170px;
background-color: ${props=>props.WhiteMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"};
opacity: 0;
display: flex;
justify-content: center;
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