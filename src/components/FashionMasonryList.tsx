import { Key } from "react";
import { Link } from "react-router-dom";

export const FashionMasonryList = (props: any) => {
    
    return (
            props.imglist.map((title: string, index: Key | null | undefined) => (
                    <Link key={index} to={'/fashion/post/' + title} className=''>
                        <div className={"hover:scale-105 hover:-translate-y-3 duration-500 transition-all border border-solid border-black mx-[0.5vw] my-[0.75vh]" }>
                            <img loading='lazy' className="" key={index} src={`/fashion/${title}/title.jpg`} alt={`${title}`} />
                        </div>
                    </Link>
            ))
    )
}

export default FashionMasonryList;