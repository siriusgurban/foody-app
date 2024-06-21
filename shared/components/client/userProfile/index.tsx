import { getProfileInfo, putProfileInfo, userProfileType } from "@/shared/services/axios";
import { Box, Text, Image, Input, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fileStorage } from "@/server/configs/firebase";
import { useRouter } from "next/router";
function UserProfile() {
  const { push } = useRouter()
  const [userDatas, setUserDatas] = useState<userProfileType>({
    name: '',
  username: '',
  "img_url": '',
  phone: '',
    fullname: '',
    email: "",
    address:""
})

  const [imgUrl, setImgUrl] = useState<any>("");
  
  const [imgOnload, setImgOnload] = useState(false);  
  
  function getValues(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

setUserDatas((prev:userProfileType)=>({...prev,img_url:imgUrl,[name]:value,
}))


  }

  const date: Date = new Date();

  function reLogin() {
    const loginDate: number | null = parseInt(
      localStorage.getItem("loginDate") || "",
      10
    );
    const currentSecond: number = date.getTime();
    const timeDifference: number = currentSecond - (loginDate || 0);

    if (!localStorage.getItem("userInfo")) {
      // toast.error("You need to be logged in !");
      setTimeout(() => {
        // push("/login");
      }, 750);
      return;
    }

    if (timeDifference / 1000 >= 3600) {
      // toast.error("Your browsing session has expired !");
      setTimeout(() => {
        // push("/login");
      }, 750);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("tokenObj");
    } else if (timeDifference / 1000 >= 3540) {
      // toast.warning(
      //   "You will be logged out from the site in the next 1 minutes.!"
      // );
    }
  }

  // console.log(userDatas);
  function isValidAzerbaijanPhoneNumber(phoneNumber:string) {
    const azPhoneNumberRegex = /^994(50|51|55|70|77|10)\d{7}$/;

    return azPhoneNumberRegex.test(phoneNumber);
  }

  async function getUserDatas() {
    const res = await getProfileInfo()
    // console.log(res?.data.user);
    setUserDatas(res?.data?.user)
  }

  useEffect(() => {
   
    getUserDatas()
    reLogin()
  },[])

  function getİmage(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e?.target?.files?.[0]?.name;
    if (!name) {
      return;
    }
    const imageRef = ref(fileStorage, `files/images/${name}`);


    const file = e?.target?.files?.[0];
    if (!file) {
      return;
    }
    uploadBytes(imageRef, file).then((snapshot) => {
      setImgOnload(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setImgOnload(false);
        setImgUrl(url);
     
      });
    });
  }





  function isObjectFullyFilled(obj: userProfileType) {
   
    
    if (Object.values(obj).length <=5) {
      return false
    }
    
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
  }

  async function updateUserData() {

    if (! isObjectFullyFilled(userDatas)) {
      // Toast.warning("Please fill the all inputs!")
  return
}
   
    if (!isValidAzerbaijanPhoneNumber(userDatas?.phone)) {
      
      // toast.warning("Invalid phone number!")
      return

    }
    

    const res = await putProfileInfo(userDatas)
    // console.log(res);
    const localUser: any = localStorage?.getItem("userInfo");
    
    
    if (res?.status === 200) {
      // toast.success("Your informations have been updated successfully!");
      const newProfil = JSON.parse(localUser)
      newProfil.username = res.data.user.username
      newProfil.fullname = res.data.user.fullname
      console.log(newProfil);
      localStorage.setItem("userInfo", JSON.stringify(newProfil))
      push("/")
      return
    }
  //  console.log(res);
   
}
  return (
    <>
     <main>
       
    <section className="m-4 sm:m-8 flex justify-center gap-10">
         
  

    <div data-aos="fade-left" className="w-full flex  flex-col  sm:px-8 sm:py-10 flex-wrap gap-x-1 gap-y-8 bg-white sm:bg-whiteLight1">
      <h2 className=" font-semibold text-3xl text-grayText2">ad</h2>

      <input onChange={getİmage} type="file" id="file" accept="image/*"  className=" hidden" />
      <label htmlFor="file"> 
      <div className=" w-full flex  justify-center ">
        <img
          width={146}
            height={0}
            // src={"user-profile-upload.svg"}
          src= {`${
              imgOnload ? "/loadingImg.jpg" : imgUrl ? imgUrl : "/user-profile-upload.svg"
            }`}
          alt="upload"
          className="cursor-pointer"
        />
      </div>
      </label>
  

      <div className=" sm:m-10 flex flex-wrap justify-between gap-4  ">
        <div className="">
          <label>cd</label>
          <br />
          <input
            onChange={getValues}
            className=" w-[286px] sm:w-[444px] overflow-hidden h-14 p-3 rounded  bg-[#F3F4F6]  sm:bg-white"
            type="text"
            name="phone"
            placeholder="+994"
            value={userDatas?.phone}
            
          />
        </div>
        <div className="">
          <label>Email</label>
          <br />
          <input
            className="w-[286px] sm:w-[444px] overflow-hidden h-14 p-3 rounded bg-[#F3F4F6]  sm:bg-white"
            type="text"
            name="contact"
            id=""
            placeholder="example@gmail.com"
            disabled
            value={userDatas?.email}
          />
        </div>
        <div className="">
          <label>azzaz</label>
          <br />
          <input
             onChange={getValues}
            className="w-[286px] sm:w-[444px] overflow-hidden h-14 p-3 rounded bg-[#F3F4F6]  sm:bg-white"
            type="text"
            name="username"
            placeholder="Example Example"
            value={userDatas?.username}
          />
        </div>
        <div className="">
          <label>zaxs</label>
          <br />
          <input
             onChange={getValues}
            className="w-[286px] sm:w-[444px] overflow-hidden h-14 p-3 rounded bg-[#F3F4F6]  sm:bg-white"
            type="text"
            name="addsres"
            placeholder="Ataturk 45 Ganclik Baku"
            value={userDatas?.address}
          />
        </div>
        <div className="">
          <label>wddwd</label>
          <br />
          <input
             onChange={getValues}
            className="w-[286px] sm:w-[444px] overflow-hidden h-14 p-3 rounded bg-[#F3F4F6]  sm:bg-white"
            type="text"
            name="fullname"
            placeholder="example example"
            value={userDatas?.fullname}
          />
        </div>
        <div className=" flex items-end ">
          <button
            onClick={updateUserData}
            className=" w-[286px] sm:w-[444px] h-[53px] rounded bg-[#6FCF97] transition-transform transform duration-300 hover:scale-95">
           zcxv
          </button>
        </div>
      </div>

     
    </div>
  </section>

 
</main>
</>
);
};
     


export default UserProfile;
