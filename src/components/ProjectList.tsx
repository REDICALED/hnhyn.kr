import { useRecoilState } from "recoil";

import { GitProjectListFine, GitProjectListFashion,GitModifyProjectTitle, GitProjectListTmp, GitRepo, GitMainImage } from "@/atoms/GitAtom";
import { useEffect, } from "react";
import  { ReactComponent as DeleteSVG }  from "../assets/images/button_icon/delete.svg";
import  { ReactComponent as LoadSVG }  from "../assets/images/button_icon/load.svg";
import { fileMainImageSet, fileDelete } from "./GitFileMod";
import { GitFileBlock } from "@/atoms/ModalAtom";

const ProjectList = () => {
    const [projectfine ] = useRecoilState(GitProjectListFine);
    const [projectfashion ] = useRecoilState(GitProjectListFashion);
    const [modifyprojecttitle, SetModifyProjectTitle ] = useRecoilState(GitModifyProjectTitle);
    const [mainimages, SetGitMainImage ] = useRecoilState(GitMainImage);

    const [repo, ] = useRecoilState(GitRepo);
    // const [tags, ] = useRecoilState(GitTag);
    // const [path, ] = useRecoilState(GitPath);
    // const [, setContents] = useRecoilState(GitContents);
    const [projecttmp, SetProjectListTmp ] = useRecoilState(GitProjectListTmp);
    const [, setFileBlock] = useRecoilState(GitFileBlock);


    useEffect(() => {
        if(repo === "fine") {
            SetProjectListTmp(projectfine);
        }
        else
            SetProjectListTmp(projectfashion);
    }, [projectfine, projectfashion]);

    useEffect(() => {
        if(repo === "fine") {
            SetProjectListTmp(projectfine);
        }
        else
        SetProjectListTmp(projectfashion);
      }, [repo]);

    const ModifyProjectTitleList = async (checked: boolean, titlename: string) => {
        if (checked) {
            await SetModifyProjectTitle([...modifyprojecttitle, titlename]);
        }
        else {
             await SetModifyProjectTitle(modifyprojecttitle.filter((item: any) => item !== titlename));
        }
        console.log(modifyprojecttitle.length);
    }
    
    const ModifyMainList = async (checked: boolean, titlename: string) => {
        if (checked) {
            await SetGitMainImage([...mainimages, titlename]);
        }
        else {
             await SetGitMainImage(mainimages.filter((item: any) => item !== titlename));
        }
        console.log(mainimages);
    }
//수정필요
    return (
        <div className="w-1/2 mr-[1vw] ">
            <div className="text-black w-full bg-white min-h-[85vh] max-h-[85vh] overflow-y-scroll rounded-2xl">
            <ul>
                {projecttmp.map((item: any, index: number) => (
                    <>
                    {index !== 0 && <div className=" h-px bg-gray-400 mb-1 ml-2 mr-2 mt-2" />}
                    
                    <div className=" w-full flex items-center">
                    <label key={index} className=" w-11/12 group flex items-center ml-2 mr-2 mt-2 mb-1">
                            <input type="checkbox" onChange={(e)=>{
                                ModifyProjectTitleList(e.target.checked, item.fulltitle);
                            }} className=" mr-2 peer w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 focus:ring-2" />
                            <li className=" duration-200 w-full pb-3 sm:pb-4 rounded-xl text-black pt-1 bg-gray-200 border-2 border-gray-200 hover:bg-gray-300 peer-checked:bg-gray-400" >
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <img className="w-20 h-20 mt-3 ml-2" src={item.image} alt={item.title}/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xl font-medium text-black truncate ">
                                            {item.title}
                                        </p>
                                        <p className="text-xl text-black truncate ">
                                            {item.datetime}
                                        </p>
                                    </div>
                                </div>
                            </li>
                    </label>
                    <div className=" ml-2 mr-2 block bg-black w-px h-20 mx-auto my-2"/>
                                <input type="checkbox" onChange={(e)=>{
                                        ModifyMainList(e.target.checked, item.fulltitle);
                                        }} className=" mr-2 peer w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 focus:ring-2" />
                    </div>
                    </>
                ))}
            </ul>
            </div>

            <div className=" flex justify-center ">
                <button onClick={()=>{fileDelete(repo, modifyprojecttitle, setFileBlock);
                    SetGitMainImage([]);
                    SetModifyProjectTitle([]);
                }} type="button" className={` transition-all duration-300 mt-[1vh] mr-[1vw] min-w-[19vw] max-w-[20vw] min-h-[10vh] max-h-[10vh] text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-center inline-flex items-center ${modifyprojecttitle.length < 1 ? `bg-slate-300 opacity-25` : `bg-white`}`} disabled={modifyprojecttitle.length < 1}>
            <DeleteSVG className=" hidden md:hidden lg:block xl:block min-w-[5vw] max-w-[5vw]" preserveAspectRatio="xMinYMid meet" width={130} height={130} viewBox="-100 -150 800 800" fill="none" />
            <p className=" justify-center min-w-[15vw] max-w-[15vw] xs:min-w-[20vw] sm:min-w-[20vw] sm:text-l md:min-w-[20vw] md:text-xl lg:text-xl xl:text-3xl pr-[1vw]">삭제하기</p> 
                </button>
{/* 이부분 mainlist 수정하는거로 수정, 함수 구현만 하면됨 atom 있음 */}
            { <button onClick={()=>{fileMainImageSet(repo, mainimages, setFileBlock);
                SetGitMainImage([]);
                SetModifyProjectTitle([]);
            }}  type="button" className={`transition-all duration-300 mt-[1vh] mr-[1vw] min-w-[19vw] max-w-[20vw] min-h-[10vh] max-h-[10vh] text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-center inline-flex items-center ${mainimages.length < 1 ? `bg-slate-300 opacity-25` : `bg-white`}` } disabled={mainimages.length < 1} >
            <LoadSVG className=" hidden md:hidden lg:block xl:block min-w-[5vw] max-w-[5vw]" preserveAspectRatio="xMinYMid meet" width={130} height={130} viewBox="-100 -150 800 800" fill="none" />
            <p className=" justify-center min-w-[15vw] max-w-[15vw] xs:min-w-[20vw] sm:min-w-[20vw] sm:text-l md:min-w-[20vw] md:text-xl lg:text-xl xl:text-3xl pr-[1vw]">메인 세팅</p> 
            </button>}
            </div>
        </div>
        
    );
};

export default ProjectList;