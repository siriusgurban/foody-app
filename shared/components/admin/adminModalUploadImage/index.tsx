import React from 'react';
import { IoMdCloudUpload } from "react-icons/io";
interface Props {
    onChange?: any;
}

const AdminModalUploadImage: React.FC<Props> = ({ onChange }: Props) => {
    return (
        <div className=" cursor-pointer bg-admin-modal-frame-bg h-full flex rounded-2xl items-center justify-center ">
            <div className=" relative ">
                <input
                    onChange={onChange}
                    type="file"
                    className=" cursor-pointer absolute opacity-0 w-full h-full  font-display"
                />
                <IoMdCloudUpload className=' h-10 w-14  fill-admin-modal-upload-icon' />
                <p className=" text-admin-text font-medium text-lg font-display">Upload</p>
            </div>
        </div>
    );
};

export default AdminModalUploadImage;
