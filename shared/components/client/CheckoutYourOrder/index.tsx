import { getBasket } from "@/shared/services/basket";
import { useQuery } from "@tanstack/react-query";

type BasketItem = {
  count: number;
  name: string;
  amount: number;
};

function CheckoutYourOrder() {
  const { data } = useQuery({
    queryFn: getBasket,
    queryKey: ['basket'],
  });

  //console.log("basket", data?.data?.result?.data?.items);

  const allBaskets: BasketItem[] = data?.data?.result?.data?.items ?? [];
  const totalAmmount = data?.data?.result?.data?.total_amount
  //console.log("basket", totalAmmount);

  return (
    <div className="flex h-full justify-center ml-2 w-full md:h-50 mb-5">
      <div className=" md:bg-[#f2f5fb] bg-[#FFFFFF] text-[#828282] w-[347px] pt-8 rounded md:shadow-lg shadow-none xl:p-5 lg:p-2 p-1">
        <h1 className="text-[#4F4F4F] text-[30px] h-8 font-semibold leading-6 text-left block md:hidden mb-6">
          Checkout
        </h1>
        <h1 className="md:text-center text-lg font-medium mb-4">Your Order</h1>
        <div className="flex flex-col mt-4 justify-center items-center gap-4 pr-5 w-full">
          {allBaskets.map((item, index) => (
            <ul
              key={index}
              className="text-lg flex mb-4 gap-6 justify-between font-medium items-center w-[90%] mx-8"
            >
              <li className="mb-2">
                {item.count} <span className="text-sm">x</span> {item.name}
              </li>
              <li className="mb-2">{item.amount} $</li>
            </ul>
          ))}
          
        </div>
        <div className="">
          <hr className="mx-3 h-[1px] border text-[#E0E0E0]" />
          <div className="flex justify-between mx-2 md:mx-5 items-center gap-4 mt-4">
            <ul className="text-lg font-medium">
              <li>Total</li>
            </ul>
            <ul className="text-lg font-normal">
              <li>{totalAmmount} $</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutYourOrder;
