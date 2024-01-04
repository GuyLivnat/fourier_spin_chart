import CaretLeftIcon from "../assets/icons/CaretLeftIcon";
import { useSearchParams } from "react-router-dom";
import TutorialPage_1 from "./tutorials/TutorialPage_1";
import TutorialPage_2 from "./tutorials/TutorialPage_2";
import TutorialPage_3 from "./tutorials/TutorialPage_3";
import TutorialPage_4 from "./tutorials/TutorialPage_4";
import TutorialPage_5 from "./tutorials/TutorialPage_5";
import TutorialPage_6 from "./tutorials/TutorialPage_6";
import TutorialPage_7 from "./tutorials/TutorialPage_7";
import Button from "../components/general_components/Button";
import CareRightIcon from "../assets/icons/CaretRightIcon";

const TutorialPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const nextPage = () => {
    if (page < 7) setSearchParams({ page: page + 1 });
  };
  const previousPage = () => {
    if (page > 1) setSearchParams({ page: page - 1 });
  };
  const jumpToPage = (toPage) => {
    setSearchParams({ page: toPage });
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

  const pageNavigation = [];

  for (const number in pages) {
    pageNavigation.push(
      <Button
        key={number}
        handleClick={() => jumpToPage(number)}
        text={number}
        className="btn btn-outline-primary"
        isDisabled={parseInt(number) === page}
      />
    );
  }

  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-md-10 row col-12">
        <h1 className="mb-3 mt-3">Tutorial</h1>
        <div>
          <h2>
            {page < 5 ? "The Visual" : page < 7 ? "The Fourier" : "The End"}
          </h2>
          {page < 8 && pages[page]}
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Button
            handleClick={previousPage}
            className="btn btn-outline-primary"
            text={
              <p className="m-0">
                <CaretLeftIcon />
                Previous
              </p>
            }
            isDisabled={page < 2}
          />
          {pageNavigation}
          <Button
            handleClick={nextPage}
            className="btn btn-outline-primary"
            text={
              <p className="m-0">
                Next
                <CareRightIcon />
              </p>
            }
            isDisabled={page > 6}
          />
        </div>
      </div>
    </section>
  );
};

export default TutorialPage;
