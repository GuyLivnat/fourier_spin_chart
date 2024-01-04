import MushuSVG from "../assets/tutorial/mushuSVG";
import TutorialChart from "../components/chart/TutorialChart";
import mushu from "../assets/defaults/mushu";
import { useSearchParams } from "react-router-dom";
import TutorialPage_1 from "../components/tutorials/TutorialPage_1";
import TutorialPage_2 from "../components/tutorials/TutorialPage_2";
import TutorialPage_3 from "../components/tutorials/TutorialPage_3";
import TutorialPage_4 from "../components/tutorials/TutorialPage_4";
import TutorialPage_5 from "../components/tutorials/TutorialPage_5";
import TutorialPage_6 from "../components/tutorials/TutorialPage_6";
import TutorialPage_7 from "../components/tutorials/TutorialPage_7";

const TutorialPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));

  const nextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const previousPage = () => {
    setSearchParams({ page: page - 1 });
  };
  const pages = {
    1: <TutorialPage_1 />,
    2: <TutorialPage_2 />,
    3: <TutorialPage_3 />,
    4: <TutorialPage_4 />,
    5: <TutorialPage_5 />,
    6: <TutorialPage_6 />,
    7: <TutorialPage_7 />,
  };

  return (
    <section className="row justify-content-center gx-0">
      {page < 8 && <button onClick={nextPage}>next</button>}
      {page > 1 && <button onClick={previousPage}>previous</button>}
      <div className="col-lg-8 col-10">
        <h1 className="mb-3 mt-3">Tutorial</h1>
        <h2>
          {page < 5 ? "The Visual" : page < 7 ? "The Fourier" : "The End"}
        </h2>
        {page < 8 && pages[page]}
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default TutorialPage;
