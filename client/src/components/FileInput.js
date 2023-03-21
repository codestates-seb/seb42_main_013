import { useState } from "react"



function FileInput () {
  const [src, setSrc] = useState("")
  const [img, setImg] = useState()
  const handler = (e) => {
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
  // const barcodeDetector = new BarcodeDetector();
  // 지원하는 포맷 확인하기
  (async () => {
    // console.log(await BarcodeDetector.getSupportedFormats()); // ["aztec", "code_128" ... ]
  })();

  // img && barcodeDetector
  // .detect(img)
  // .then((barcodes) => {
  //   barcodes.forEach((barcode) => console.log(barcode.rawValue));
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  if (!("BarcodeDetector" in window)) {
    //! console.log(window.BarcodeDetector) 로도 조회가능
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");
  }
  const aaa = async (image) => {
    try {
      // const barcodes = await barcodeDetector.detect(image);
      // console.log(barcodes)
      // barcodes.forEach(barcode => searchProductDatabase(barcode));
    } catch (e) {
      console.error('Barcode detection failed:', e);
    }
  }

  aaa(img)


    return(

    <>
    <input type="file" accept="image/*" onChange={handler}/>
    <img src={src} />
    
    </>
  )
}

export default FileInput;