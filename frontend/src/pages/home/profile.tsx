import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

function Profile() {
  // const isAuth = useSelector((state) => state.auth);
  // // console.log(isAuth.userID);
  //
  // const { data: profileData, status: profileStatus } = useProfile(
  //     isAuth.userID
  // );

  return (
    <>
      <Navbar />
      <div className="py-5 flex md:py-2 container px-3 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
        <Sidebar />
        <div className="content w-full">
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>الاسم</h3>
            <p>lorem</p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>حساب جوجل</h3>
            <p>lorem</p>
          </div>
          {/* <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>الميلاد</h3>
            <p>
              {getFieldData(profileData.data.user.birthDate, profileStatus)}
            </p>
          </div> */}
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3> تاكيد الحساب</h3>
            <p>الحساب غير معفل</p>
          </div>

          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3> فصيله الدم </h3>
            <p>lorem</p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>رقم المحمول</h3>
            <p>lorem</p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl py-5">
            <h3>المحافظة</h3>
            <p>lorem</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
