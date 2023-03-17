import styled from "styled-components";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--black-100);
  input {
    display: none;
  }
`

const ImageDiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: var(--black-500);
  margin: var(--gap-md);
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
`

const ImageLabel = styled.label`
  padding: var(--gap-sm);
  color: #ffffff;
  font-size: 14px;
  background-color: var(--blue-100);
  border-radius: 5px;
  cursor: pointer;
  :hover {background-color: #6b91ed} :active {background-color: #6b91ed}
`

function ImageEditor() {
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const { pathname } = useLocation();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setImgFile(reader.result);
      };
  };

  return (
    <ImageContainer>
      {pathname === "/setuserinfo" ? <h3>프로필 사진</h3> : null}
      <ImageDiv>
        {imgFile ? <img src={imgFile} alt="프로필 이미지" /> : null}
      </ImageDiv>
      <ImageLabel htmlFor="profileImg">이미지 선택하기</ImageLabel>
      <input
        type="file"
        id="profileImg"
        accept="image/*"
        ref={imgRef}
        onChange={saveImgFile} />
    </ImageContainer>
  )
}

export default ImageEditor;