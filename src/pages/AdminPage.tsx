import { useEffect, useState } from "react";
// import { Octokit } from "octokit";
import { Link } from 'react-router-dom';

import { useRecoilState } from "recoil";

import { FileRequire, TitleRequire, GitFileBlock,LoginRequire } from "@/atoms/ModalAtom";
import { LoginValid } from "@/atoms/LoginValidAtom";
import { GitRepo, GitContents, GitPath, GitProjectListFashion, GitProjectListFine, GitTag, GitMainImage, GitModifyProjectTitle,  } from "@/atoms/GitAtom";

import { Navigate } from "react-router-dom";
import PreviewTitles from "@/components/PreviewTitles";
import PreviewFiles from "../components/PreviewFiles";
// import { getFunc, updateFunc, createFunc, createImage } from "@/components/GitFunc";
import ProjectList from "@/components/ProjectList";

import  { ReactComponent as CreateSVG }  from "../assets/images/button_icon/create.svg";
import  { ReactComponent as FixSVG }  from "../assets/images/button_icon/fix.svg";
import { fileWrite, fileCreate, getDiff } from "@/components/GitFileMod";
import { getFunc } from "@/components/GitFunc";
import { Octokit } from "octokit";



const App = () => {
  const [imageuploaded, setImageUploaded] = useState(false);
  const [titleimageuploaded, setTitleImageUploaded] = useState(false);
  const [untitled, setUntitled] = useState(false);

  const [, SetModifyProjectTitle ] = useRecoilState(GitModifyProjectTitle);
  const [, SetGitMainImage ] = useRecoilState(GitMainImage);
  const [repo, setRepo] = useRecoilState(GitRepo);
  const [tags, setTag] = useRecoilState(GitTag);
  const [path, setPath] = useRecoilState(GitPath);
  const [contents, setContents] = useRecoilState(GitContents);
  const [, setTitleRequire] = useRecoilState(TitleRequire);
  const [ ,setFileRequire] = useRecoilState(FileRequire);
  const [ ,setLoginRequire] = useRecoilState(LoginRequire);
  const [loginvalid ] = useRecoilState(LoginValid);
  const [fileblock, setFileBlock] = useRecoilState(GitFileBlock);
  const [ , setProjectListFine ] = useRecoilState(GitProjectListFine);
  const [ , setProjectListFashion ] = useRecoilState(GitProjectListFashion);

  //atoms

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
    if(path === "") {
      setUntitled(true);
    }
  }, [path]);
  useEffect(() => {
    if (fileblock === false)
      {
        filetmpRead('fine');
        filetmpRead('fashion');
      }
  }, [fileblock]);

  if (loginvalid === 0) {
    setLoginRequire(true);
      return (<Navigate to="/" />);
  }

  return (
    <div className=" overflow-auto min-h-screen w-full h-full flex pt-5 pb-5 pl-4 bg-black">
      <div className="w-1/2">
        <div className="min-h-[6vh] max-h-[6vh]">
          <Link to='/'>
            <div className="min-h-[4vh] max-h-[4vh] text-5xl text-white font-serif font-extrabold text-with-hover-underline"> Hnhyn</div>
          </Link>
        </div>
        <button className=" bg-white m-3 w-1/12" onClick={()=>{getDiff(path);}}>
            퍼블리시!
        </button>
        <div className=" min-h-[8vh] max-h-[8vh]  ">
          <label htmlFor="genre" className=" block text-l font-medium text-white">Select a Genre</label>
          <select id="genre" 
          onChange={
            (e:any) => {
              setRepo(e.target.value);
              setTag(e.target.value === "fine" ? "works" : "fashionimages");
              }
          } 
          className=" min-h-[5vh] max-h-[5vh] bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[45vw] ">
            <option value="fine">Fine Art</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        <div className=" min-h-[5vh] max-h-[5vh]  ">
          <select
          value={tags}
          onChange={
            (e:any) => {
              setTag(e.target.value);
              }
          } 
          className=" min-h-[5vh] max-h-[5vh] bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[45vw] ">
            <option value={repo === "fine" ? 'works' : 'fashionimages'}>{repo === "fine" ? 'Works' : 'Fashion Images'}</option>
            <option value={repo === "fine" ? 'exhibitions' : 'objects'}> {repo === "fine" ? 'Exhibitions' : 'Objects'} </option>
          </select>
        </div>

        <div className="relative  w-[45vw] flex mt-3">
            <input disabled={ untitled ? true : false } value={path} onChange={(e:any) => {setPath(e.target.value);
            }} type="text" id="floating_filled" className="block rounded px-2.5 pb-2.5 min-h-[5vh] max-h-[5vh] pt-5 w-full text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />        
              <label htmlFor="floating_filled" className="absolute text-l text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Title</label>
            <div className="flex items-center pl-1 pr-5 ">
              <input readOnly={untitled ? true : false} checked={untitled ? true : false} onChange={()=>{ untitled ? setUntitled(false) : setUntitled(true) }} id="checked-checkbox" type="checkbox" value="" className="w-4 min-h-[2vh] max-h-[2vh] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
              <label htmlFor="checked-checkbox" className="ms-1 text-l font-medium text-white">Untitled</label>
            </div>
            {/* title 선택 시, 주제 입력칸 자동 완성 메서드 */}
        </div>

        <div className=" w-[45vw] pt-5 min-h-[20vh] max-h-[40vh]">
          <textarea
            name="main_content" placeholder="본문 내용을 입력하세요" value={contents}
            onChange={(e:any) => setContents(e.target.value)}
            className="w-full min-h-[20vh] max-h-[40vh] border-2 border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex pt-5  w-[45vw] min-h-[20vh] max-h-[40vh]">
          <div className=" transition-all duration-300 relative overflow-scroll w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50  hover:bg-gray-300">            <label htmlFor="title-file" className="flex flex-col">
              <div className="flex flex-col pt-1 pb-6">
                <ul id="title-list" className="text-sm text-black "></ul>
                { !titleimageuploaded && <p className="text-s text-center text-black">타이틀 이미지</p>}
              </div>
              <input id="title-file" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0" multiple onChange={
                () => {
                  setTitleImageUploaded(PreviewTitles);
                }}/>
            </label>
          </div>
        </div>

        <div className="flex pt-5  w-[45vw] min-h-[20vh] max-h-[40vh]">
          <div className=" transition-all duration-300 relative overflow-scroll w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50  hover:bg-gray-300">
            <label htmlFor="dropzone-file" className="flex flex-col">
              <div className="flex flex-col pt-1 pb-6">
                <ul id="file-list" className="text-sm text-black "></ul>
                { !imageuploaded && <p className="text-s text-center text-black">컨텐츠 이미지 (최대 20장)</p>}
              </div>
              <input id="dropzone-file" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0" multiple onChange={
                () => {
                  setImageUploaded(PreviewFiles);
                }}/>
            </label>
          </div>
        </div>
        <div className="flex justify-center w-[45vw]">
          <button onClick={()=>{
            fileCreate(repo, path, contents, tags, imageuploaded , titleimageuploaded, untitled, setFileRequire, setTitleRequire, setFileBlock );
            SetGitMainImage([]);
            SetModifyProjectTitle([]);
          }} type="button" className=" transition-all duration-300 mt-[1vh] mr-[1vw] min-w-[19vw] max-w-[20vw] min-h-[10vh] max-h-[10vh] text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-center inline-flex items-center">
            <CreateSVG className=" hidden md:hidden lg:block xl:block min-w-[4vw] max-w-[4vw]" preserveAspectRatio="xMinYMid meet" width={130} height={130} viewBox="-100 -150 800 800" fill="none" />
            <p className=" justify-center min-w-[15vw] max-w-[15vw] xs:min-w-[20vw] sm:min-w-[20vw] sm:text-l md:min-w-[20vw] md:text-xl lg:text-xl xl:text-3xl pr-[1vw]">업로드</p> 
          </button>

          <button onClick={()=>{fileWrite(repo, path, contents, setFileBlock)
            SetGitMainImage([]);
            SetModifyProjectTitle([]);
          }
        } type="button" className=" transition-all duration-300 mt-[1vh] mr-[1vw] min-w-[19vw] max-w-[20vw] min-h-[10vh] max-h-[10vh] text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-center inline-flex items-center">
            <FixSVG className=" hidden md:hidden lg:block xl:block min-w-[4vw] max-w-[4vw]" preserveAspectRatio="xMinYMid meet" width={130} height={130} viewBox="-100 -150 800 800" fill="none" />
            <p className=" justify-center min-w-[15vw] max-w-[15vw] xs:min-w-[20vw] sm:min-w-[20vw] sm:text-l md:min-w-[20vw] md:text-xl lg:text-xl xl:text-3xl pr-[1vw]">수정하기</p> 
          </button>
        </div>
      </div>

      <ProjectList />
    </div>
  );
};

export default App;