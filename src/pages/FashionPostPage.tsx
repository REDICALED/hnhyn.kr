// import SwipeToSlide from '@/components/Slide'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import FashionDropDown from '@/components/FashionDropDown';
import { ImageZoom } from '@/atoms/ModalAtom'
import { useRecoilState } from 'recoil';
import loading from '@/assets/images/button_text/fashion/loading.png';

function FashionPostPage() {
    let { title } = useParams();
    console.log(title)
    const [imagelist, setImageList] = useState<string[]>([]);
    const [, setImageZoom] = useRecoilState(ImageZoom);
    const [ opacityswitch , setOpacitySwitch] = useState(false);


    const GetImages = async () => {
        let titlelist: string[] = [];
        let cnt = 0;
        await fetch(`/fashion/${title}/sub.txt`)
        .then(response => response.text())
        .then(text => {
            cnt = parseInt(text.split('\n')[0], 10);
            console.log("sub.txt:" + cnt); // 파일 내용 출력 또는 원하는 처리 수행
        })
        .catch(error => {
            console.error('Error reading sub.txt:', error);
        });
        for (let i = 0; i < cnt; i++) {
            titlelist.push(`/fashion/${title}/${i}image.jpg`);
        }
        setImageList(titlelist);
    }

    useEffect(() => {
        const fetchData = async () => {
            await GetImages();
            console.log(imagelist);
        };
        fetchData();
    }, [])

    return (
        <>
        <FashionDropDown />
        { <div className={ !opacityswitch ? ' animate-spin opacity-100 duration-500 transition-opacity ease-in-out fixed inset-0 flex justify-center items-center ' : ' hidden fixed inset-0 flex justify-center items-center opacity-0 duration-500 transition-opacity ease-in-out'}>
            <img className="h-[5vh]" src={loading} alt="Loading" />
            </div>}
        <div className={opacityswitch ? 'opacity-100 duration-500 transition-opacity ease-in-out' : 'opacity-0 duration-500 transition-opacity ease-in-out' + " w-full"}>            
            <div className='h-[8vh]'></div>
            <div className=' flex-row flex flex-nowrap overflow-x-scroll '>
                {imagelist.map((imgurl, index) => (
                    <img key={index} onLoad={ ()=>{
                        index === 0 && setOpacitySwitch(true);    
                    }} onClick={()=>{setImageZoom(imgurl);}} className=" object-contain h-[84vh] px-[0.5vw]  " src={imgurl} alt={`${title}`} tabIndex={index} />
                ))}
            </div>
        </div>
        </>
    )
}

export default FashionPostPage