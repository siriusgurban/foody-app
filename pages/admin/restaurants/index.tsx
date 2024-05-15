<<<<<<< HEAD
import React, { useState } from 'react';
=======


import React from 'react';
>>>>>>> 429f866357165122f44e4991965f36b328b3d633
import { AddIcon } from '@chakra-ui/icons'

import AdminRestaurantsDropdown from '@/shared/components/adminRestaurantsDropdown';

import AdminRestaurantsCard from '@/shared/components/adminRestaurantCards';

import AdminAddUpdateModal from '@/shared/components/adminAddUpdateModal';

const Restaurants: React.FC = () => {
  const [hideModal, setHideModal] = useState<boolean>(true);

  function showHideModal() {
    setHideModal((prev) => !prev);
  }
  return (
    <div className="bg-admin-bg min-h-screen flex justify-between font-display">
      <div></div>
      <AdminAddUpdateModal onClickClose={showHideModal} show={hideModal} text="Add Restaurant " />
      {/* right side */}
      <div className="max-w-7xl py-6 lg:px-8 w-10/12">
        <div className="bg-white overflow-hidden shadow-sm rounded-2xl">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center bg-admin-secondary sm:gap-4">

            <h1 className="text-xl font-semibold text-admin-secondary-heading sm:mt-0 mt-2">Restaurants</h1>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className='hidden sm:block'>
                <AdminRestaurantsDropdown className2='' />
              </div>
              <button onClick={showHideModal} className=" text-admin-secondary-add bg-admin-add-button-bg text-sm px-4 py-2  rounded-2xl w-full sm:w-auto"><span><AddIcon boxSize={2} color="white" /></span>ADD RESTAURANT</button>
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

