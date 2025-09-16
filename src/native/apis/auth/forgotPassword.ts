import { NativeAPIHandler } from "@/native/types";
import axios from "axios";

const forgotPassword: NativeAPIHandler = async (event, email: string) => {
    const response = await axios.post("/auth/forgot-password", { email });
    return response.data;
}

export default forgotPassword;