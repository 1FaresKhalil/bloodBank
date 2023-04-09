import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

function History() {
  return (
    <>
      <Navbar />
      <div className="py-5 flex md:py-2 container px-0 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
        <Sidebar />
        <table className="grow ">
          <thead className="bg-red-500 ">
            <tr className="text-white">
              <td className="font-bold p-4">تاريخ التبرع</td>
              <td className="font-bold py-4 ">مكان التبرع</td>
              <td className="font-bold py-4">#</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="px-4">2/3/2001</td>
              <td>مستشفي الاسكندرية الجامعي</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default History;
