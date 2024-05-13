import React, { FC } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
const AdminRestaurantsCard: FC = () => {
    return (
        <>

            <div className="flex flex-wrap justify-around  mt-14">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div
                        key={index}
                        className="relative  bg-admin-secondary-add  w-64 h-20 rounded-md  border-2  shadow-md p-2 mb-4"
                    >
                        <div className="flex w-full h-full items-center justify-between gap-4">
                            <div className="w-20 h-16 flex-shrink-0 mr-2 relative mt-6">
                                <img
                                    src="https://www.papajohns.az/img/content/pj_logo_web_new.png"
                                    alt="papa"
                                    className="rounded-md"
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <p className="text-gray-900 text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    Papa Johns
                                </p>
                                <p className="text-sm font-medium text-admin-restaurant-card-category whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    Pizza
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button >
                                    <span>
                                        <MdDeleteForever className="fill-admin-delete-icon w-5 h-5" />
                                    </span>
                                </button>
                                <button>
                                    <span>
                                        <MdEdit className="fill-admin-edit-icon w-5 h-5" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminRestaurantsCard;

