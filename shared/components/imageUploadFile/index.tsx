// import { ErrorMessage, Field } from 'formik'

// export const imageUploadFile = () => {
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader()
//       fileReader.readAsDataURL(file)
//       fileReader.onload = () => {
//         resolve(fileReader.result)
//       }
//       fileReader.onerror = (error) => {
//         reject(error)
//       }
//     })
//   }

//   const handleIcon = async (e, setFieldValue) => {
//     const file = e.target.files[0]
//     //check the size of image
//     if (file?.size / 1024 / 1024 < 2) {
//       const base64 = await convertToBase64(file)
//       setFieldValue('profile_image', base64)
//     } else {
//       console.error('Image size must be of 2MB or less')
//     }
//   }

//   return (
//     <div className="mb-3 form-group">
//       <label className="required">Upload Photo</label>
//       <Field name="profile_image">
//         {({ form, field }) => {
//           const { setFieldValue } = form
//           return (
//             <input
//               type="file"
//               className="form-control"
//               required
//               onChange={(e) => handleIcon(e, setFieldValue)}
//             />
//           )
//         }}
//       </Field>
//       <div className="text-danger">
//         <ErrorMessage name="profile_image" />
//       </div>
//     </div>
//   )
// }
