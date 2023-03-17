import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className=" h-screen bg-[#2B2E4A]">
      <div className="flex flex-col justify-center items-center container w-full h-full mx-auto">
        <h1 className="text-9xl font-extrabold text-red-600 mb-7">عفواً</h1>
        <p className="text-3xl font-bold text-white mb-5">
          هذه الصفحة غير موجودة
        </p>
        <p className="text-white text-center text-lg mb-5">
          الرجاء التأكد من رابط الصفحة أو العودة الى الصفحة الرئيسية
        </p>
        <Link
          to="/"
          className="transition-all duration-300 px-4 py-3 rounded-md bg-gradient-to-r from-red-600 via-[#903749] to-red-600 bg-200% hover:bg-right-bottom text-white flex items-center gap-2 text-lg"
        >
          <FaHome /> العودة الى الرئيسية
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
