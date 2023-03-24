import styled from "styled-components"


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
  background: url(${(props) => props.url}) no-repeat 2.81% 96.711%;
	background-size: calc(250px) calc(250px);
	width: 37px;
	height: 98px;
  scale: 0.5;
  align-self: center;
`
const CapsuleRed=styled.div`
  background: url(${(props) => props.url}) no-repeat 22.654% 96.646%;
	width: 63px;
	height: 172px;
`
const EllipseWhite=styled.div`
  background: url(${(props) => props.url}) no-repeat 40.92% 97.183%;
	width: 65px;
	height: 145px;
`
const CircleBrown=styled.div`
  background: url(${(props) => props.url}) no-repeat 59.765% 97.647%;
	width: 75px;
	height: 75px;
`
const CircleYellow1=styled.div`
  background: url(${(props) => props.url}) no-repeat 97.297% 97.537%;
	width: 93px;
	height: 94px;
`
const CirclePink=styled.div`
  background: url(${(props) => props.url}) no-repeat 60.471% 76.706%;
	width: 75px;
	height: 75px;
`
const CircleWhite=styled.div`
  background: url(${(props) => props.url}) no-repeat 80.094% 72.664%;
	width: 73px;
	height: 72px;
`
const Omega2=styled.div`
  background: url(${(props) => props.url}) no-repeat 64.486% 48.579%;
	width: 72px;
	height: 113px;
`
const CircleYellowGreen=styled.div`
  background: url(${(props) => props.url}) no-repeat 1.624% 48.492%;
	width: 69px;
	height: 69px;
`
const CircleDeepPink=styled.div`
  background: url(${(props) => props.url}) no-repeat 21.995% 47.315%;
	width: 109px;
	height: 109px;
`
const CapsulePlain=styled.div`
  background: url(${(props) => props.url}) no-repeat 3.661% 4.878%;
	width: 63px;
	height: 172px;
`
const CapsuleBrown=styled.div`
  background: url(${(props) => props.url}) no-repeat 20.982% 5.352%;
	width: 52px;
	height: 145px;
`
const CircleSmallYellow=styled.div`
  background: url(${(props) => props.url}) no-repeat 46.188% 44.719%;
	width: 54px;
	height: 55px;
`
const CapsuleColor=styled.div`
  background: url(${(props) => props.url}) no-repeat 96.774% 3.409%;
	width: 159px;
	height: 60px;
`
const CircleMixPink=styled.div`
  background: url(${(props) => props.url}) no-repeat 71.845% 22.141%;
	width: 88px;
	height: 89px;
`
const CapsuleOrange=styled.div`
  background: url(${(props) => props.url}) no-repeat 98% 49.189%;
	width: 50px;
	height: 130px;
`
const RhombusWhite=styled.div`
  background: url(${(props) => props.url}) no-repeat 84.272% 48.446%;
	width: 74px;
	height: 114px;
`

function Swiper(){


  return(
    <Imgscreen>
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

export default Swiper;