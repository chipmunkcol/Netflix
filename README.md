🔧기술스택 (TypeScript/ Recoil/ React Query/ Styled-Components)

# Netflix 클론코딩입니당 :)
 [구경하기🙄](https://react-master-green.vercel.app/)

## 🎮 주요기능
    - 영화(상영작, 인기작, top10) 페이지(OpenApi)
    - tv(상영작, 인기작, top10) 페이지(OpenApi)
    - 내가 찜한 콘텐츠 보기(LocalStorage & recoil)
    - 검색 기능(query & debounce)
        => 무한스크롤(useInview) 
        => lazyLoad(IntersectionObserver)

##  🎨 Styled
    - White Mode (styled-components & recoil)
    - 슬라이더 (useRef)
    - 헤더 스크롤 시 변경(eventlitener & thorttle)
    - nav 클릭 시 이동하는 공(useMacth)
    
## 🙆‍ 트러블슈팅

    0) debounec & lazyLoad
    검색페이지 뭔가 load시간 거슬려서 고민하다가 debounce & lazyLoad 적용함
    또, 무한스크롤로 바꾸고나니 검색에 따라 이미지가 엄청 쏟아져서 lazyLoad 잘 적용했다 이것저것 연습하기 좋았음!

    1) detail 모달창 고화질 이미지를 어떻게 이질감없이 보여줄 수 있을까?
        
<details>

<summary>①일단 코드로 해결해볼라고했음 (실패)</summary>

```JavaScript
const [getPost, setGetPost] = useState(clickPosterImg || "") // posterImg를 props로 받아서 api 요청 1회 감소(모달 켜지는시간 체감될만큼 빨라짐)
const [check, setCheck] = useState(false)
function getPostOriginal (){
const 고화질이미지 = getPosterImg(movie?.backdrop_path || "") //고화질 이미지 불러오는 동안 기존 사진 보여주자
setTimeout(() => {
setGetPost(고화질이미지) 
}, 1000);
}
// 생각한대로 작동은 하는데 뭔가 고화질 바뀌면서 렌더링 하는게 마음에 안들긴함 lazyLoad도 안통하고 뭔가 css 효과로 해결방법 있을거같은데..

useEffect(()=>{
if(movie) { 
getPostOriginal() 
} else { 
setTimeout(() => {
setGetPost(getPosterImg(data?.backdrop_path || "")); setCheck(true) 
}, 1000);
} // props로 캐싱했으니 url로 바로 들어오는거 대응
},[check])
``` 
</details>

<details>

<summary>②lazyLoad ①번이랑 비슷한느낌이어서 안될거 같긴했는데 역시 안됨(실패)</summary>

</details>

<details>

<summary>③react-progressive-graceful-image 라이브러리(성공!)</summary>
    킹-갓 [react-progressive-graceful-image] 라이브러리로 해결봤음 라이브러리 안쓰고 해볼라했는데 typeScript실력 이슈로 실패함 이미지 로딩 중에는 저화질 이미지 보여주고 자연스럽게 고화질이 보여짐!
    기존 슬라이더 이미지를 w500 정도 화질로 보여주다가 w200 으로 바꾸고 필요할때만 화질을 올리려고 progressiveImage 조금씩 넣어주니까 페이지 속도가 말도 안되게 올라갔다
    이미지가 속도에 영향주는건 알고있었는데 직접 체감해보니까 상당히 좋았음!
</details>

</br>

    2) splice vs slice 
    splice는 기존 배열을 뭉갠다. api로 100개 자료에서 앞에꺼 20개만 가져온다고 할때 splice로 잘라서 여러번 호출하면 0~20 21~40 41~60 번째 배열을 가져오니 주의하자. 

    3) type 핸들링
    openAPI 다 쓸건 아니지만 모든 객체에 타입을 주고 싶었다. 콘솔에서 [Store object as global variable] 로 temp 변수에 넣은 뒤 Object.keys(temp1) & Object.values(temp1).map(v=> typeof(v))로 key값을 비교적 쉽게 type 지정 해줄 수 있었음

    4) styled-components로 <ThemeProvider theme={theme}>을 줄때 typescript 자동완성 도움을 받으려면 선언 파일을 따로 작성해줘야됨. styled.d.ts 로 선언해줘야 되는데 이때 파일명 styled.d.ts로 고정임 다른 이름안됨 파일명 다른걸로 했다가 한참 고생했다.

    5) Immutable 
    let copy = [...LikedArr]; // 불변성 조심하자 (ts에 안걸리더라..?) 스프레드 연산자 깜빡해서 엄청 해맸네

    6) width: 100% vs 100vw 
    기존에 100vw로 잡았을때는 괜찮았는데 하위 컴포넌트 css값 주다보니까 기존에 잡았던 100vw가 좌로 스크롤바가 생기는 원인이 되었다. 컴포넌트 끼리 서로 영향을 주는걸 더 고민하면서 작업해야겠다
    (+슬라이더는 상위 div에 overflow-hidden을 줘야됨.)

    7) 영화 data랑 tv data랑 openApi type값이 조금씩 달라서 컴포넌트랑 커스텀훅을 더 재활용 못한거같아 아쉽다. 로컬스토리지에 담을 때 마저 type이 다르니 따로 담고 찜한 콘텐츠에도 따로 보여주게밖에 구현을 못해서 너무 아쉬움..
    고정된 type값이라도 변환해서 사용하거나 || 로 선택적 type 받는 거 더 연습해봐야겠다.
    
    
    
</br>

# 🧐프로젝트 중에 학습한 내용
## 1. styled-components
    - 속성 ${props => props.bgColor || 'yellow'}
    - 상속 const Circle = styled(Box)
    - 애니메이션 const spin = keyframes >> animation : ${spin} 1s infinite;
    - 색상(객체) <ThemeProvider theme={darkTheme}> <App /> </ThemeProvider>

## 2. TypeScript
    - Props에 type 주기
        -> interface TypeProps {
            bgColor: string
        }
        const Components = ({bgColor} : TypeProps) => return <div>{bgColor}</div>

    - styled에 type 주기
        -> const Components = () => {
            return <Styled bgColor={bgColor}/>
        }
        const Styled = styled.div<TypeProps>`
        background-color: ${props=>props.bgColor};
        `
    - HTML에 type 주기
        -> onChange = (e: React.ChangeEvent<HTMLInpulElement>) => {};
        -> form = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        };

## 3. React Router V6
    - createBrowserRouter & errorElement
        -> export const router = createBrowserRouter([{
            path:"/",
            element: <Root />,
            children: [
            {
                path:'',
                element: <Home />
            },  
            {
                path:'about',
                element: <About />,
                errorElement: <ErrorComponent />
            }
            errorElement: <Error/>
        }])

    - Outlet
        -> this 느낌의 구조로 createBrowserRouter에서 children으로 설정한 component를 렌더링 할 수 있음 

    - useOutletContext (children component로 props 넘기기)
        -> <Outlet context={userName: 'jack'}>
            
            interface UserNameType {
                userNage: string
            }
            const {userName} = useOutletContext<UserNameType>();
