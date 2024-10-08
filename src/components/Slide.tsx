import { Component } from "react";
import Slider from "react-slick";
import mainimg1 from '@/assets/images/mainslide/main1.jpg';
import mainimg2 from '@/assets/images/mainslide/main2.jpg';
import mainimg3 from '@/assets/images/mainslide/main3.jpg';
import mainimg4 from '@/assets/images/mainslide/main4.jpg';

export default class PauseOnHover extends Component {
    render() {
      var settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: true,
        speed: 1300,
        dots: false,
        arrows: true,
        
        responsive: [ // 반응형 웹 구현 옵션
		{ 
			breakpoint: 768, //화면 사이즈 768px일 때
			settings: {	
				//위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
				slidesToShow: 1,
        arrows: false, 
			} 
		}]
      };
      return (
        <div className="">
          <Slider {...settings}>
              <div>
                <img className=" mx-auto " src={mainimg1} alt='asd'></img>
              </div>
              <div>
                  <img className=" mx-auto " src={mainimg2} alt='asd'></img>
              </div>
              <div>
                <img className=" mx-auto " src={mainimg3} alt='asd'></img>
              </div>
              <div>
                <img className=" mx-auto " src={mainimg4} alt='asd'></img>
              </div>
          </Slider>
        </div>
      );
    }
  }