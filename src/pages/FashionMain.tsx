// import SwipeToSlide from '@/components/Slide'
import { useEffect, useState } from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import FashionDropDown from '@/components/FashionDropDown'
import { Link, useParams } from 'react-router-dom';


const FashionMain = () => {
    const [realarray, setRealArray] = useState<string[]>([]);
    const [fetchpath, ] = useState("/fashion/titlelist.txt");
    const [ posttag , setPostTag] = useState('');
    const [opacityswitch, setOpacitySwitch] = useState(false);


    let tags = useParams();
    if (tags.tags !== undefined && tags.tags !== 'fashionimages' && tags.tags !== 'objects') {
        window.location.href = '/fashion';
    }
    const GetImages = async () => {
        if (posttag === '') {
            let titlelist: string = '';
            await fetch(`${fetchpath}`)
            .then(response => response.text())
            .then(async text => {
                titlelist = text.trimEnd();
                let tmp = titlelist.split(",").filter(title => title.trim() !== "").reverse();
                    setRealArray(tmp);
            })
            .catch(error => {
                console.error('Error reading titlelist:', error);
            });
            return ;
        }
        let titlelist: string = '';
        await fetch(`${fetchpath}`)
        .then(response => response.text())
        .then(async text => {
            titlelist = text.trimEnd();
            let tmp = titlelist.split(",").filter(title => title.trim() !== "").reverse();
                let returnlist = [];
                for (let i = 0; i < tmp.length; i++) {
                    if (tmp[i].includes(posttag)) {
                         returnlist.push(tmp[i]);
                    }
                }
                setRealArray(returnlist);
            
        })
        .catch(error => {
            console.error('Error reading titlelist:', error);
        });
    }

    useEffect(() => {
        setPostTag(tags.tags ?? '');
    }, [tags.tags])

    useEffect(() => {
        const effectgetimages = async () => {
            await GetImages();
        }
            effectgetimages();
    }, [posttag])

    useEffect(() => {
        // realarray가 변경될 때마다 실행되는 효과
        setOpacitySwitch(true); // 변경되기 전에 opacity를 0으로 설정
        // realarray 변경 후에 opacity를 100으로 설정
        setTimeout(() => setOpacitySwitch(false), 500);
    }, [realarray]);
    return (
        <>
            <FashionDropDown setPostTag={setPostTag}/>
            <div className='mx-[1vw] pt-[1vh]'>
                { 
                    (
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 750: 2, 900: 3}}
                        className={opacityswitch ? ' opacity-0' : 'opacity-100' + ' duration-500 transition-opacity ease-in-out'}
                    >
                        <Masonry className=''>
                            {realarray.map((title, index) => (
                                <Link key={index} to={'/fashion/post/' + title} className=''>
                                    <div className=" transition-all duration-300 hover:-translate-y-[0.75vh] border border-solid border-black mx-[0.5vw] my-[0.75vh]">
                                        <img loading='lazy' className="" key={index} src={`/fashion/${title}/title.jpg`} alt={`${title}`} />
                                    </div>
                                </Link>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                )}
            </div>
        </>
    )
}

export default FashionMain