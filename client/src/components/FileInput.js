import { useState } from "react"



function FileInput () {
  const [imgFile, setImgFile] = useState("")
  const handler = (e) => {
    setImgFile(e.target.value)
    console.log(imgFile)
  }
  // const barcodeDetector = new BarcodeDetector({
  //   formats: [
  //     'aztec',
  //     'code_128',
  //     'code_39',
  //     'code_93',
  //     'codabar',
  //     'data_matrix',
  //     'ean_13',
  //     'ean_8',
  //     'itf',
  //     'pdf417',
  //     'qr_code',
  //     'upc_a',
  //     'upc_e'
  //   ],
  // });
  // barcodeDetector
  // .detect("https://upload.wikimedia.org/wikipedia/en/f/f4/LiveBarcodeApp.jpg")
  // .then((barcodes) => {
  //   barcodes.forEach((barcode) => console.log(barcode.rawValue));
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  return(
    <>
    <input type="file" value={imgFile} accept="image/*" onChange={handler}/>
    <img src={imgFile} />
    
    </>
  )
}

export default FileInput;