import styled from "styled-components";
import { AddBtn } from "../pages/dataCreate";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  text-align: center;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 300px;
  height: 100px;
  .btnBox{
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
  }
  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`


function CreateModal ({isOpen, openContainsModalHandler}) {

  return (
    <>
      <ModalContainer>
        {isOpen === true ? <ModalBackdrop onClick={openContainsModalHandler}>
          <div></div>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <div className="closeBtn"><AddBtn><FontAwesomeIcon icon={faTimes}/></AddBtn></div>

            <div className='desc'>HELLO CODESTATES!</div>
          </ModalView>
        </ModalBackdrop> : null}
      </ModalContainer>
    </>
  )

}

export default CreateModal;