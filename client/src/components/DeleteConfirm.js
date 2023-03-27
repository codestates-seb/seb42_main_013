import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentBtn } from "../styles/Buttons";
import { Buttons, ModalBackdrop, ModalContainer, ModalView } from "./CreateModal";
import deletePillData from "../util/deletePillData";

const Comment = styled.div`
  margin-top: 8px;
  text-align: center;
  font-size: 16px;
`


function DeleteConfirm ({openDeleteHanlder,data, setData}) {
  const navigate = useNavigate();
  const target = useSelector((state) => state.target);
  const deleteDataHandler = () => {
    deletePillData(target.id,navigate)
      .then((res)=>{
        console.log("aaa")
        let deletedData = data.filter((ele)=>ele.detailSupplementId !== target.id)
        setData(deletedData)
        openDeleteHanlder()
      })
  }
  return (
    <ModalContainer>
      <ModalBackdrop onClick={()=>openDeleteHanlder()}>


      <ModalView onClick={(e) => e.stopPropagation()}>
        <Comment>
          데이터를 삭제하시겠습니까?
        </Comment>
       <Buttons>
         <CurrentBtn type="button" onClick={()=>openDeleteHanlder()}>취소</CurrentBtn>
         <CurrentBtn type="button" onClick={deleteDataHandler}>삭제</CurrentBtn>
       </Buttons>
      </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  )
}

export default DeleteConfirm;