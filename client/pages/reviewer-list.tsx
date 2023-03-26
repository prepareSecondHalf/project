/**components */
import Header from 'components/Header';
import Footer from 'components/Footer';

const ReviewerList = () => {
  return (
    <>
      <Header />
      <section className="w-full px-96 py-20 bg-[#ebdefc] text-[40px] font-josefin font-bold">
        <h1>Banner of the List</h1>
      </section>
      <main className="w-full h-fit px-96 bg-[#ffffff] font-josefin">
        <section className="flex justify-between items-center py-20 text-[20px]">
          <div className="text-[32px] font-bold">Conditions</div>
          <div className="flex">
            <div className="mr-8">정렬 Radio button</div>
            <div className="mr-8">언어 Select box</div>
            <div>검색 Search bar</div>
          </div>
        </section>
        <section>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return (
              <div key={item} className="w-full flex mb-16">
                <div className="w-72 h-60 bg-[#ebdefc]">Image of the {item}th Reviewer</div>
                <div className="p-8">
                  <div>Name of the {item}th Reviewer</div>
                  <div className="flex gap-x-4">
                    <div>Price</div>
                    <div>Rate</div>
                  </div>
                  <div>Description of the {item}th Reviewer</div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ReviewerList;
