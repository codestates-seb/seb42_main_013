import { useState } from "react"
import emptyBarcodeImg from  "../images/plzAddBarcode.png"


function FileInput ({barcode, FileInput}) {
  const [src, setSrc] = useState(emptyBarcodeImg)
  const [img, setImg] = useState(emptyBarcodeImg)
  const [IsDetectorAvailable,setIsDetectorAvailable] = useState(false)

  const inputImgHandler = (e) => {
    e.target.files && rendering(e.target.files[0])
    e.target.files && setImg(e.target.files[0])
    //인풋에 파일이 입력된 경우 렌더링
  }
  const rendering = (file) => {
    const reader = new FileReader ()
    reader.readAsDataURL(file)
    reader.onload = e => {
      setSrc(e.target.result)
    }
  }
  
  if (!window.BarcodeDetector) {
    //! console.log(window.BarcodeDetector) 로도 조회가능
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");
    // setIsDetectorAvailable(true)
  }
  // const barcodeDetector = new BarcodeDetector();
  // 지원하는 포맷 확인하기
  // (async () => {
    // console.log(await BarcodeDetector.getSupportedFormats()); // ["aztec", "code_128" ... ]
  // })();

  // img && barcodeDetector
  // .detect(img)
  // .then((barcodes) => {
  //   barcodes.forEach((barcode) => console.log(barcode.rawValue));
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // const aaa = async (image) => {
  //   try {
  //     // const barcodes = await barcodeDetector.detect(image);
  //     // console.log(barcodes)
  //     // barcodes.forEach(barcode => searchProductDatabase(barcode));
  //   } catch (e) {
  //     console.error('Barcode detection failed:', e);
  //   }
  // }



  return(

    <>
      <input type="file" accept="image/*" onChange={inputImgHandler}/>
      <img src={src} alt="preview-img"/>
    </>
  )
}

export default FileInput;