import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";


const Imgscreen = styled.div`
  touch-action: pan-y;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
`
const ImgBoxes = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  transition-timing-function: ease-out;
  gap: 8px;
`
const ImgBox = styled.div`
  border: 1px solid var(--black-300);
  border-radius: 5px;
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .camera{
    position: absolute;
    inset: 0px;
    margin: auto;
    /* absolute position 에서 가운데 놓기 */
    width: 30px;
    height: 30px;
    >g{
      fill: none;
      fill-rule: evenodd;
      >g{
        transform: translate(4.779px, 6.111px);
        stroke: var(--black-300);
        stroke-width: 1.3;
      }
    }
  } 
`
const Omega3=styled.div`
  background: url(${(props) => props.url}) no-repeat no-repeat 2.81% 96.711%;
	background-size: 250px 250px;
	width: 37px;
	height: 98px;
  scale: 0.5;
`

function SelectImg(){


  return(
    <Imgscreen>
      <Swiper
        spaceBetween={4}
        slidesPerView={5}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
     <ImgBoxes>

        
          <ImgBox>
            <svg className="camera">
              <g>
                <path d="M0 0h30v30H0z" />
                <g>
                  <path d="M11.792 0c.399 0 .717.056.955.17.179.084.346.199.503.344l.153.155.631.703c.122.13.234.233.337.31a.95.95 0 0 0 .34.16c.125.031.292.047.503.047l2.906-.003c1.284 0 2.324 1.062 2.324 2.37v11.151c0 1.31-1.04 2.37-2.324 2.37H2.324c-1.283 0-2.324-1.06-2.324-2.37V4.257c0-1.31 1.04-2.37 2.324-2.37h2.983c.245-.009.432-.045.559-.108.11-.055.23-.145.36-.27l.134-.137.631-.703c.2-.22.418-.387.657-.5.19-.09.432-.144.725-.162L8.603 0h3.189z" />
                  <circle cx="10.142" cy="9.529" r="3.556" />
                </g>  
              </g>
            </svg>
          </ImgBox>
        <ImgBox><Omega3 url={process.env.PUBLIC_URL + '/images/pillVectorImg.png'} /></ImgBox>
    </ImgBoxes>
  </Imgscreen>
  )

}

export default SelectImg;