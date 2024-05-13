

import React from 'react';
import { AddIcon } from '@chakra-ui/icons'

import AdminRestaurantsDropdown from '@/shared/components/adminRestaurantsDropdown';

import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards';

const Restaurants: React.FC = () => {
  return (
    <div className="bg-admin-bg min-h-screen flex justify-between">
      <div></div>
      {/* right side */}
      <div className="max-w-7xl py-6 w-10/12">
        <div className="bg-white overflow-hidden shadow-sm rounded-2xl">
          <div className="p-6 flex  justify-between items-center bg-admin-secondary ">
            <h1 className="text-xl font-semibold text-admin-secondary-heading ">Restaurants</h1>
            <div className="flex gap-2  ">
              <div className=''>
                <AdminRestaurantsDropdown className2='' />
              </div>
              <button className=" text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-2xl "><span><AddIcon boxSize={2} color="white" /></span>ADD RESTAURANT</button>
            </div>
          </div>
        </div>
        <AdminRestaurantsCard />
      </div>
    </div>
  );
};

export default Restaurants;




// import React, { useState } from 'react';
// import { AddIcon } from '@chakra-ui/icons'

// import AdminRestaurantsDropdown from '@/shared/components/adminRestaurantsDropdown';

// import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards';

// const Restaurants: React.FC = () => {
//   return (
//     <div className="bg-admin-bg min-h-screen flex justify-between">
//       <div></div>
//       {/* right side */}
//       <div className="max-w-7xl py-6 lg:px-8 w-10/12">
//         <div className="bg-white overflow-hidden shadow-sm rounded-2xl">
//           <div className="p-6 flex flex-col sm:flex-row justify-between items-center bg-admin-secondary sm:gap-4">

//             <h1 className="text-xl font-semibold text-admin-secondary-heading sm:mt-0 mt-2">Restaurants</h1>

//             <div className="flex gap-2 w-full sm:w-auto">
//               <div className='hidden sm:block'>
//                 <AdminRestaurantsDropdown className2='' />
//               </div>
//               <button className=" text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-2xl w-full sm:w-auto"><span><AddIcon boxSize={2} color="white" /></span>ADD RESTAURANT</button>
//             </div>
//           </div>
//         </div>

//         <AdminRestaurantsCard />
//       </div>
//     </div>
//   );
// };

// export default Restaurants;

