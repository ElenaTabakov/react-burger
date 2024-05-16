import loader from "../images/loader.gif";
import Style from './loader.module.css'

export const Loader = () => {
  return <img src={loader} alt="icon loader" className={Style.loader} />;
};
