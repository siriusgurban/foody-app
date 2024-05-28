// import Image from 'next/image'
// import React from 'react'
// import ImageUploading from 'react-images-uploading'

// export function ImageUpload({ src }) {
//   const [images, setImages] = React.useState(src)
//   const maxNumber = 1

//   const onChange = (imageList: any, addUpdateIndex: any) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex)
//     setImages(imageList)
//   }

//   console.log(images, 'images')

//   return (
//     <ImageUploading
//       multiple
//       value={images}
//       onChange={onChange}
//       maxNumber={maxNumber}
//       dataURLKey="data_url"
//     >
//       {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
//         // write your building UI
//         <div className="upload__image-wrapper">
//           <button onClick={onImageUpload}>Click or Drop here</button>
//           &nbsp;
//           {imageList.map((image, index) => (
//             <div key={index} className="image-item">
//               <Image src={image['data_url']} alt="asd" width="100" />
//               <div className="image-item__btn-wrapper">
//                 {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
//                 <button onClick={() => onImageRemove(index)}>Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </ImageUploading>
//   )
// }
