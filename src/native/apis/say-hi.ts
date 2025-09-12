import { NATIVE_API_SAY_HI } from "../constants";
import { NativeAPIHandler } from "../types";

const sayHi: NativeAPIHandler = (event, name) => {
  console.log(`Hi ${name}!`);
  event.sender.send(NATIVE_API_SAY_HI, `Hello ${name} from ipc main`);
};

export default sayHi;
