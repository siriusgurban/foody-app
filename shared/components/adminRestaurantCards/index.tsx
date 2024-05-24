import { getRestuarants } from "@/shared/services/restaurants";
import { useQuery } from "@tanstack/react-query";
import { resolveSoa } from "dns";
import Image from "next/image";
import React, { FC } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

interface Restaurant {
    name: string;
    img_url: string;
    cuisine: string;
    id: any;

}

interface AdminRestaurantsCardProps {
    onClick: (id: any) => void;
}

// get
const AdminRestaurantsCard: FC<AdminRestaurantsCardProps> = ({ onClick }) => {
    const { data } = useQuery({
        queryFn: getRestuarants,
        queryKey: ['restaurants'],
    });


    const truncateText = (text: string, length: number) => {
        if (text.length > length) {
            return text.slice(0, length) + '...';
        }
        return text;
    };


    console.log(data?.data?.result?.data, "restaurant");

    const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? [];

    return (
        <>
            {restaurantsDatas.map((restaurant, index) => (
                <div
                    key={index}
                    className="relative bg-admin-secondary-add w-64 h-20 rounded-md border-2 shadow-md p-2 mb-4 font-display"
                >
                    <div className="flex w-full h-full items-center justify-between gap-4">
                        <div className="w-20 h-16 flex-shrink-0 mr-2 relative mt-6 ">
                            {/* <div className="w-full h-full relative"> */}
                            <Image
                                src={restaurant.img_url}
                                alt={restaurant.name}
                                className=" w-full h-full object-cover pb-3 pt-0   rounded-sm"
                                width={100}
                                height={100}

                            />

                            {/* </div> */}

                        </div>
                        <div className="flex flex-col flex-grow">
                            <p className="text-gray-900 text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {truncateText(restaurant.name, 9)}
                            </p>
                            <p className="text-sm font-medium text-admin-restaurant-card-category whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {truncateText(restaurant.cuisine, 9)}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button onClick={() => onClick(restaurant.id)}>
                                <span>
                                    <MdDeleteForever className="fill-admin-delete-icon w-5 h-5    hover:fill-pink-900  hover:scale-95 transition-all duration-500 " />
                                </span>
                            </button>
                            <button>
                                <span>
                                    <MdEdit className="fill-admin-edit-icon w-5 h-5  hover:fill-green-800  hover:scale-95 transition-all duration-500" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AdminRestaurantsCard;

