import { useEffect, useState } from "react";
import emptyBarcodeImg from "../images/plzAddBarcode.png";
import DetectorNotAvailable from "../images/DetectorNotAvailable.png";



function FileInput({ setBarcode, barcode, isDetectorAvailable, setIsDetectorAvailable }) {
  const [src, setSrc] = useState(emptyBarcodeImg);
  const inputImgHandler = (e) => {
    e.target.files && rendering(e.target.files[0]);
    //인풋에 파일이 입력된 경우 렌더링
  };
  const rendering = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setSrc(e.target.result);
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => detect(image);
    };
  };

  const detect = (image) => {
    // eslint-disable-next-line
    const barcodeDetector = new BarcodeDetector();
    barcodeDetector
      .detect(image)
      .then((barcodes) => {
        //datainput 객체로 저장중이므로 이렇게 저장
        setBarcode({ barcode: barcodes[0].rawValue });
        // alert(barcodes[0].rawValue);
      })
      .catch((e) => {
        setIsDetectorAvailable(false);
        alert("스캔에 실패하였습니다. 숫자를 직접 기입해주세요.");
        console.log(e);
      });
  };

  // 아래코드 바로 쓰면 무한렌더링 발생
  // !window.BarcodeDetector&& setIsDetectorAvailable(false)
  // window.BarcodeDetector&& setIsDetectorAvailable(true)

  useEffect(() => {
    if (!window.BarcodeDetector) {
      setIsDetectorAvailable(false);
      setSrc(DetectorNotAvailable);
      console.log("Barcode Detector is not supported by this browser.");
    } else {
      setIsDetectorAvailable(true);
      console.log("Barcode Detector supported!");
    }
  }, []);

  return (
    <>
      {isDetectorAvailable && 
      <>
      <input type="file" accept="image/*" onChange={inputImgHandler} />
      <img src={src} alt="preview-img" />
      </>
      }
    </>
  );
}

export default FileInput;
