import { Link } from "react-router-dom";

import fashion_hnhyn from '@/assets/images/button_text/fashion/hnhyn.png';
import fashion_listing from '@/assets/images/button_text/fashion/listing.png';
import others from '@/assets/images/button_text/fashion/others.png';
import others_ from '@/assets/images/button_text/fashion/others_.png';
import portraits from '@/assets/images/button_text/fashion/portraits.png';
import portraits_ from '@/assets/images/button_text/fashion/portraits_.png';
import only_bubble from '@/assets/images/button_text/fashion/bubble_dir.png';
import back_only from '@/assets/images/button_text/fashion/normal_dir.png';
import { useState } from "react";

export const FashionDropDown = (props: any) => {
    const [dropdownswitch, setDropDownSwitch] = useState(false);

    const handleSetPath = async (path:string) => {
        await props.setPostTag(path);
    }
    
    return (
        < div >
            <div className="flex flex-row fixed z-40 ">
                <div className={  window.location.href.includes('post') ? " ml-3 start-0 mt-[1.5vh]" : "ml-[2vw]" + ' start-0 mt-[2vh] '}>
                    <Link to={'/fashion'} className='' onClick={()=>{handleSetPath('')
                    }}>
                        <img className={  window.location.href.includes('post') ? "h-[5vh]" : "h-[7vh]"} src={fashion_hnhyn} alt="fashion_hnhyn" />
                    </Link>
                </div>

                <div className={ window.location.href.includes('post') ? 'opacity-100' : 'opacity-0 hidden' }>
                <div className='start-0 mt-[2.2vh] ml-5 z-40'>
                        <div className='relative'>
                            <img className='h-[3.5vh] cursor-pointer ' src={back_only} alt="fashion_hnhyn" />
                            <img onClick={() => { window.history.go(-1); }} className='absolute top-0 left-0 h-[3.5vh] cursor-pointer opacity-0 hover:opacity-100 transition-all duration-150' src={only_bubble} alt="fashion_hnhyn" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={ !window.location.href.includes('post') ? 'opacity-100' : 'opacity-0 hidden' }>
            <div onClick={() => setDropDownSwitch(!dropdownswitch)} className=' cursor-pointer h-[6vh] ml-[2vw] mt-[10.2vh] fixed z-40'>
                <img className=' h-[3vh]' src={fashion_listing} alt="fashion_listing" />
            </div>
            <div className=' ml-[2vw] mt-[12.2vh] fixed z-40'>
                <ul className={`${dropdownswitch ? " opacity-100 cursor-pointer" : " max-h-0 max-w-0 opacity-0 cursor-default"} transition-all duration-500 ease-in-out `}>
                    <div>
                        <li onClick={()=>{handleSetPath("fashionimages");
                        }}>
                            <Link to={'/fashion/fashionimages'} className=''>
                                <img className=' duration-500 transition-all mt-[3.5vh] h-[3.5vh]' src={window.location.href.includes('/fashionimages') ? portraits_ : portraits} alt="fashionimages" />
                            </Link>
                        </li>
                        <li onClick={()=>{handleSetPath("objects");
                        }}>
                            <Link to={'/fashion/objects'} className=''>
                                <img className=' transition-all duration-500 mt-[2.2vh] h-[3vh]' src={window.location.href.includes('/objects') ? others_ : others} alt="fashion_object" />
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
            </div>
            
        </div>
    )
};

export default FashionDropDown;