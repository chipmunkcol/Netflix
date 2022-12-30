React에 TypeScript, Recoil, React Query를 한 움큼씩 넣어보자🎨

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

## 4. 

splice vs slice => splice는 기존 배열을 뭉갠다. api로 100개 자료에서 앞에꺼 20개만 가져온다고 할때 splice로 잘라서 여러번 호출하면 0~20 21~40 41~60 번째 배열을 가져오니 주의하자. 

type 설정 정말 빡친다 아직 웨 쓰는지 모르겠다

<ThemeProvider theme={theme}>으로 전역 styled 제어 해줄 때 styled.d.ts 로 선언해줘야 되는데 이때 파일명 styled.d.ts로 고정임 다른 이름안됨 

와 옆으로 스크롤바 생기는거 진짜 빡친다
width를 100vh같이 고정값으로 주는거 조심하자 가급적 %로 100%!!

let copy = [...LikedArr]; // 불변성 조심하자(ts에 안걸리는)스프레드 연산자 깜빡해서 엄청 해맸네