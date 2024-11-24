import Connect from "../../utils/connect";
import Error from "./error";

export default Connect(Error, state => state);
