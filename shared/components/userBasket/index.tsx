
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getRestuarants } from '@/shared/services/restaurants';
import { useRouter } from 'next/router';
import AdminModalButton from '../adminModalButton';
import UserBasketCard from '../userBasketCard';


interface Restaurant {
    name: string;
    img_url: string;
    cuisine: string;
    id: any;
}

interface Props {

}

const UserBasket: FC<Props> = ({ }) => {
    const { t } = useTranslation('client');
    const { data } = useQuery({
        queryFn: getRestuarants,
        queryKey: ["restaurants"],
    });

    const navigate = useRouter();
    const restaurantsDatas: Restaurant[] = data?.data?.result?.data ?? [];

    return (
        <div className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-client-gray7 ">
            <h2 className=" text-client-main-gray2 font-semibold text-3xl">
                {t('Your Basket')}
            </h2>
            <div className="flex items-center gap-2 text-3xl border-b-2   border-client-gray5 pb-4">
                <Image
                    width={20}
                    height={20}
                    src="/basketRed.svg"
                    alt="userBasket"
                />
                <p className="  text-base  text-client-main-red font-medium">
                    {8} {t("items")}
                </p>
            </div>
            <div className="mb-5 max-h-[300px] overflow-y-auto ">
                {restaurantsDatas.map((restaurant) => (
                    <>

                        <UserBasketCard
                            clearBasket={() => console.log(`Clearing ${restaurant.id}`)}
                            decreaseCount={() => console.log(`Decreasing ${restaurant.id}`)}
                            increaseCount={() => console.log(`Increasing ${restaurant.id}`)}
                            name={restaurant?.name}
                            price={8}
                            count={2}
                            src={restaurant?.img_url}
                            alt={restaurant?.name}
                        />
                        <UserBasketCard
                            clearBasket={() => console.log(`Clearing ${restaurant.id}`)}
                            decreaseCount={() => console.log(`Decreasing ${restaurant.id}`)}
                            increaseCount={() => console.log(`Increasing ${restaurant.id}`)}
                            name={restaurant?.name}
                            price={8}
                            count={2}
                            src={restaurant?.img_url}
                            alt={restaurant?.name}
                        />
                        <UserBasketCard
                            clearBasket={() => console.log(`Clearing ${restaurant.id}`)}
                            decreaseCount={() => console.log(`Decreasing ${restaurant.id}`)}
                            increaseCount={() => console.log(`Increasing ${restaurant.id}`)}
                            name={restaurant?.name}
                            price={8}
                            count={2}
                            src={restaurant?.img_url}
                            alt={restaurant?.name}
                        />

                    </>

                ))}

            </div>


            <div className="  bg-client-main-red text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
                <p className="font-medium text-2xl">{t("Checkout")}</p>
                <AdminModalButton

                    className="bg-white   text-client-main-red rounded-full py-1 px-16 font-medium text-lg hover:scale-95 transition-all duration-500"
                    text={`8`}
                // onClick={() => navigate.push("/checkout")}
                />
            </div>
        </div>
    );
}

export default UserBasket;

// export async function getStaticProps({ locale }: { locale: any }) {
//     return {
//         props: { ...(await serverSideTranslations(locale, ['client'])) },
//     }
// }

