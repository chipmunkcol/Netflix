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