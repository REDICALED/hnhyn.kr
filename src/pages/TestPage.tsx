import { useEffect } from 'react';
import { GitProjectListFashion, GitProjectListFine } from '@/atoms/GitAtom';
import { useRecoilState } from 'recoil';

function TestPage() {
    const [ projectlistfine , setProjectListFine ] = useRecoilState(GitProjectListFine);
    const [ , setProjectListFashion ] = useRecoilState(GitProjectListFashion);

    useEffect(() => {
            filetmpRead('fine');
    },[]);

    const filetmpRead = async (repos: string) => {
        const filePath = `/${repos}/titlelist.txt`;
        let resultArray: any[] = [];
        // 파일 가져오기
        if (repos === "fine")
          setProjectListFine([]);
        else
          setProjectListFashion([]);
        //수정필요
        await fetch(filePath)
            .then(response => response.text())
            .then(async data => {
                // console.log(data); // 파일 내용 출력
                const array: string[] = data.split(",");
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
                            resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[1].trim(), image: imageURL , datetime: datetime}];
                        } else {
                            // 이미지를 가져오지 못한 경우, 기본 이미지를 사용하거나 다른 처리를 수행할 수 있음
                            resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[1].trim(), image: '기본 이미지 경로' , datetime: "datetime"}];
                        }
                    } catch (error) {
                        console.error('타이틀 이미지 가져오기 실패:', error);
                        // 이미지를 가져오지 못한 경우, 기본 이미지를 사용하거나 다른 처리를 수행할 수 있음
                        resultArray = [...resultArray, { fulltitle:array[i].trim(), title: array[i].split("-")[1].trim(), image: '기본 이미지 경로' , datetime: "datetime"}];
                    }
                  if (repos === "fine")
                    setProjectListFine(resultArray);
                  else
                    setProjectListFashion(resultArray);
                }
            });
      };


    return (
        <>
            <div className="text-white">Test Page list</div>

            <div className="flex-row ml-2 mr-2 ">
                <ul className="flex flex-wrap items-stretch">
                {projectlistfine.map((item: any, index: number) => (
                    <label key={index} className="group">
                        <div className="mt-2 mr-1 mb-1 min-w-[32vw] max-w-[32vw]">
                            <li className=" " >
                                    <div className="">
                                        <img className=" min-w-[32vw] max-w-[32vw] mt-3 ml-2" src={item.image} alt={item.title}/>
                                    </div>
                            </li>
                        </div>
                    </label>
                ))}
            </ul>
            </div>
        </>
    )
}

export default TestPage;
