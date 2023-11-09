import HomeChart from "../components/chart/HomeChart";
import welcome from "../assets/defaults/welcome";

const HomePage = () => {
  const units = 512; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = welcome;

  return (
    <section className="container-fluid">
      <div className="row">
        <HomeChart {...{ units, coeff }} />
      </div>
    </section>
  );
};

export default HomePage;
