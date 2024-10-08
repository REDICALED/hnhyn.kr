// import { LoginRequire } from '@/atoms/ModalAtom';
import { LoginValid } from '@/atoms/LoginValidAtom';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GitProjectListFashion, GitProjectListFine } from '@/atoms/GitAtom';
import { getFunc } from '@/components/GitFunc';
import { Octokit } from 'octokit';
import fashionimages from '@/assets/images/button_text/main/fashionimages.png';
// import works from '@/assets/images/button_text/main/works.png';
import hanhyeon_black from '@/assets/images/button_text/main/hanhyeon_black.png';


const MainPage = () => {
    // const [, setLoginRequire] = useRecoilState(LoginRequire);
    const [loginvalid, SetLoginValid] = useRecoilState(LoginValid);
    const [ , setProjectListFine ] = useRecoilState(GitProjectListFine);
    const [ , setProjectListFashion ] = useRecoilState(GitProjectListFashion);
    const filetmpRead = async (repos: string) => {
        const octokit = new Octokit({
            auth: import.meta.env.VITE_APP_TOKEN,
        });
        const titleresult = await getFunc(octokit, `${repos}/titlelist.txt`);
        let tmp = decodeURIComponent(escape(window.atob(titleresult.data.content)));
        let resultArray: any[] = [];
        // 파일 가져오기
        if (repos === "fine")
          setProjectListFine([]);
        else
          setProjectListFashion([]);
        //수정필요?
        console.log(tmp); // 파일 내용 출력
        const array: string[] = tmp.split(",");
        for (let i = 0; i < array.length - 1; i++) {
            const titleImagePath = `/${repos}/${array[i].trim()}/title.jpg`;
            const nowdate: number = parseInt(array[i].split("-")[0].trim());
            const datetime = new Date(nowdate).toLocaleString();
            // console.log("datetime:" + datetime);
            try {
                const response = await fetch(titleImagePath); // 타이틀 이미지 가져오기
                if (response.ok) {
                    const titleImageBlob = await response.blob(); // 이미지를 Blob 형식으로 변환
                    const imageURL = URL.createObjectURL(titleImageBlob); // Blob을 URL로 변환
                    resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[2].trim(), image: imageURL , datetime: datetime}];
                } else {
                    // 이미지를 가져오지 못한 경우, 기본 이미지를 사용하거나 다른 처리를 수행할 수 있음
                    resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[2].trim(), image: '기본 이미지 경로' , datetime: "datetime"}];
                }
            } catch (error) {
                console.error('타이틀 이미지 가져오기 실패:', error);
                // 이미지를 가져오지 못한 경우, 기본 이미지를 사용하거나 다른 처리를 수행할 수 있음
                resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[2].trim(), image: '기본 이미지 경로' , datetime: "datetime"}];
            }
            if (repos === "fine")
            setProjectListFine(resultArray);
            else
            setProjectListFashion(resultArray);
        }
      };

    useEffect(() => {
        if (loginvalid === 1) {
            filetmpRead('fine');
            filetmpRead('fashion');
            SetLoginValid(loginvalid + 1);
        }
    },[loginvalid]);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>  
        <div className='flex flex-col items-start'>

        <div className=' mt-[3vh] mx-[10vw]'>
        <img src={hanhyeon_black}/>

        </div>
        <Link to='/fashion' className=' mt-[3vh] mx-[10vw] hover:opacity-70 transition-opacity'>
            <img src={fashionimages}/>
        </Link>
            <div></div>

        {/* <Link to='/TestPage'>
            <div className='text-with-hover-underline text-black lg:text-5xl text-3xl font-serif font-extrabold ml-5 mt-10 mb-10'>
                TestPage
            </div>
        </Link> */}

        { loginvalid !== 0 && <Link to='/Admin'>
            <div className='text-with-hover-underline text-black lg:text-5xl text-3xl font-serif font-extrabold ml-5 mt-10 mb-10'>
                admin page.
            </div>
        </Link>}

        {/* { loginvalid === 0 && <button onClick={() => {setLoginRequire(true);}} className='text-black lg:text-5xl text-3xl font-serif font-extrabold ml-5 mt-10 mb-10'>
            login
        </button>} */}
        </div>
        </div>
    );
}

export default MainPage;
