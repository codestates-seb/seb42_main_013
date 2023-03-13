import styled from "styled-components";
import { AddBtn } from "../pages/DataCreate";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataInput from "./DataInput";



export const ModalBackdrop = styled.div`
  /* top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
  /* 위 대신 아래로 하면 기존 컴포넌트도 안밀리고 좋음 */
  inset: 0px;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  z-index: -1;
  @media (min-width: 1024px){
    padding-left: 460px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1200;
`;



export const ModalView = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: #ffffff;
  margin: auto;
  padding: 8px;
  max-width: 428px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 16px;
  gap: var(--gap-sm);
  >div:first-child{
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`


function CreateModal ({isOpen, openContainsModalHandler, data, setData}) {

  return (
    <>
      <ModalContainer>
        {isOpen === true ? <ModalBackdrop onClick={openContainsModalHandler}>
          <div></div>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <div className="closeBtn"><AddBtn><FontAwesomeIcon icon={faTimes}/></AddBtn></div>
            <div>성분명</div>
            {/* <DataInput/> */}
            <div>함량</div>
            {/* <DataInput/> */}
          </ModalView>
        </ModalBackdrop> : null}
      </ModalContainer>
    </>
  )

}

export default CreateModal;