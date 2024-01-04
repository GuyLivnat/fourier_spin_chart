import { Link } from "react-router-dom";
import mushu from "../../assets/defaults/mushu";
import TutorialChart from "../../components/chart/TutorialChart";

const TutorialPage_6 = () => {
  return (
    <div>
      <p>
        In the Sandbox, you can use the upload button in the Saved Chains tool
        and give it any SVG image with a single {"<path>"} for it to generate
        the appropriate chain of circles that expresses it.
      </p>
      <p>
        For more information on which tools are avalable and their options,
        visit the <Link to="/help">Help</Link> section.
      </p>
      <p>
        To get the party started, visit the <Link to="/sandbox">Sandbox</Link>!
      </p>
    </div>
  );
};

export default TutorialPage_6;
