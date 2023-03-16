import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CreateModal from "../components/CreateModal";
import Swiper from "../components/Swiper";
import DataInput, { DeleteBtn, RealInput } from "../components/DataInput";
import Tags from "../components/Tags";

const DataCreateContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 48px - 64px);
  flex-direction: column;
  justify-content: space-around;
  padding: 24px 20px 40px;
  background-color: white;
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
  > h3 {
    font-family: "NanumBarunGothicBold";
    color: var(--black-200);
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    gap: 2px;
  }
  p {
    font-size: 14px;
    font-weight: 700;
    color: var(--blue-100);
    display: block;
  }
  > div {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
    width: 100%;
    line-height: 100%;
    align-items: center;
  }
`;
export const OptionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  /* line-height: var(--component-height); */
  border-width: 0;
  border-radius: 30px;
  padding: 0 10px;
  text-align: center;
  color: ${(props) => (props.notselected ? "var(--black-200)" : "white")};
  background-color: ${(props) => (props.notselected ? "#D9D9D9" : "var(--blue-100)")};
  font-size: 14px;
  cursor: ${(props) => (props.nobtn ? "pointer" : "null")};
  > div {
    margin-left: 0;
  }
  svg {
    margin-right: ${(props) => (props.nobtn ? "0" : "-5.625px")};
    color: ${(props) => (props.notselected ? "var(--black-200)" : "white")};
  }
  > button {
    background-color: transparent;
    border: none;
    margin-left: 3px;
    width: 14px;
    margin-right: 0;
  }
`;
const Box = styled.div`
  display: inline-block;
`;

export const AddBtn = styled.button`
  color: white;
  background-color: var(--blue-100);
  border: none;
  margin: 4px 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  > button {
    color: red;
  }
`;

const Cycle = styled.div`
  display: flex;
  border: 1px solid;
  justify-content: center;
  border-color: ${(props) => (props.selected ? "var(--blue-100)" : "var(--black-400)")};
  color: ${(props) => (props.selected ? "var(--blue-100)" : "var(--black-400)")};
  border-radius: 5px;
  padding: 0px 8px;
  cursor: pointer;
  flex: 1;
  transition: all 100ms cubic-bezier(1, 0, 1, 1);
  &.everyday {
    flex: 1;
  }
  &.ndays {
    flex: ${(props) => (props.isEditMode ? "6" : "1")};
  }
  > span {
    padding: 8px 0px;
    opacity: ${(props) => (props.isEditMode ? "0" : "1")};
  }
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 16px;
    :hover {
      color: #53b483;
    }
  }
`;

function DataCrete() {
  const [isOpen, setIsOpen] = useState(false);
  const [whichData, setWhichData] = useState("");
  const openeModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState({
    dataID: null,
    type: "supplement",
    img: null,
    name: "",
    ingredients: [],
    expiryDate: "",
    currentQty: "",
    totalQty: "",
    startDate: new Date().toISOString().substring(0, 10),
    endDate: "",
    cycle: "1",
    time: [],
    dose: 1,
  });
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);
  const openEditHandler = () => {
    setData({ ...data, cycle: "" });
    setEditMode(true);
  };
  const cycleHandler = (e) => {
    setData({ ...data, cycle: e.target.value });
  };
  const blurHandler = (e) => {
    setEditMode(false);
    !e.target.value && setData({ ...data, cycle: "1" });
  };
  const deleteIngredient = (ele, idx) => {
    setData({ ...data, ingredients: [...data.ingredients.slice(0, idx), ...data.ingredients.slice(idx + 1)] });
  };
  const deleteTime = (ele, idx) => {
    setData({ ...data, time: [...data.time.slice(0, idx), ...data.time.slice(idx + 1)] });
  };

  return (
    <DataCreateContainer>
      <InputSection>
        <h3>종류</h3>
        <div>
          <OptionTag
            nobtn={1}
            notselected={data.type !== "supplement"}
            onClick={() => {
              setData({ ...data, type: "supplement" });
            }}
          >
            영양제
            <AddBtn>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
                <path d="m8.5 8.5 7 7"></path>
              </svg>
            </AddBtn>
          </OptionTag>
          <OptionTag
            nobtn={1}
            notselected={data.type !== "drug"}
            onClick={() => {
              setData({ ...data, type: "drug" });
            }}
          >
            처방약
            <AddBtn>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="7" cy="7" r="5"></circle>
                <circle cx="17" cy="17" r="5"></circle>
                <path d="M12 17h10"></path>
                <path d="m3.46 10.54 7.08-7.08"></path>
              </svg>
            </AddBtn>
          </OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>이미지</h3>
        <Swiper />
      </InputSection>
      <InputSection>
        <h3>
          약 이름<p>*</p>
        </h3>
        <div>
          <DataInput required={1} type="text" data={data} setData={setData} name="name" />
        </div>
      </InputSection>
      <InputSection>
        <h3>주요 성분</h3>
        <div>
          {data.ingredients.map((ele, idx) => {
            return <Tags key={idx} ele={ele} idx={idx} deleteEleHandler={deleteIngredient} />;
          })}
          <AddBtn
            onClick={() => {
              setWhichData("ingredients");
              openeModalHandler();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>소비기한</h3>
        <div>
          <DataInput type="date" data={data} setData={setData} value="expiryDate" />
        </div>
      </InputSection>
      <InputSection>
        <h3>잔여알수 / 전체용량<p>*</p></h3>
        <Box>
          <DataInput max={data.totalQty} placeholder="잔여알수" required={1} type="number" name="currentQty" data={data} setData={setData} />
          /
          <DataInput placeholder="전체용량" required={1} type="number" name="totalQty" data={data} setData={setData} />
        </Box>
      </InputSection>
      <InputSection>
        <h3>복용 기간</h3>
        <div>
          <DataInput required={1} placeholder="시작일" type="date" name="startDate" data={data} setData={setData} />
          ~
          <DataInput min={data.startDate} placeholder="종료일" type="date" name="endDate" data={data} setData={setData} />
        </div>
      </InputSection>
      <InputSection>
        <h3>
          복용 주기<p>*</p>
        </h3>
        <div>
          <Cycle className="everyday" selected={data.cycle === "1" ? 1 : 0} onClick={() => setData({ ...data, cycle: "1" })}>
            <span>매일</span>
          </Cycle>
          <Cycle className="ndays" selected={data.cycle !== "1" ? 1 : 0} onClick={openEditHandler} isEditMode={isEditMode}>
            {isEditMode && (
              <>
                <RealInput type="number" value={data.cycle} ref={inputEl} onBlur={blurHandler} onChange={cycleHandler} placeholder="몇일마다 복용하시나요" />
                <DeleteBtn value={1}>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </DeleteBtn>
              </>
            )}
            {!isEditMode && <span>{data.cycle === "1" ? "N" : data.cycle}일</span>}
          </Cycle>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 시간</h3>
        <div>
          {data.time.map((ele, idx) => {
            return <Tags key={idx} ele={ele} idx={idx} deleteEleHandler={deleteTime} />;
          })}
          <AddBtn
            onClick={() => {
              setWhichData("time");
              openeModalHandler();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>
          1회 복용량<p>*</p>
        </h3>
        <div>
          <DataInput required={1} min={1} placeholder="1회 복용량" type="number" name="dose" data={data} setData={setData} />
        </div>
      </InputSection>

      {isOpen && <CreateModal name={whichData} isOpen={isOpen} openModalHandler={openeModalHandler} data={data} setData={setData} />}
    </DataCreateContainer>
  );
}

export default DataCrete;
