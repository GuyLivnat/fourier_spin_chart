import HomeChart from "../components/chart/HomeChart";

const HomePage = () => {
  const units = 256; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = [];

  return (
    <section className="container-fluid">
      <div className="row">
        <HomeChart {...{ units, coeff }} />
      </div>
    </section>
  );
};

export default HomePage;
