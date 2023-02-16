import axios from "axios";
import { NOCODB_API_BASEURL, NOCODB_API_TOKEN } from "./index";

export const nocodbApiHanlder = axios.create({
	baseURL: NOCODB_API_BASEURL,
	timeout: 1000,
	headers: { "xc-token": NOCODB_API_TOKEN },
});
