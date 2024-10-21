import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setNetworkService } from "./NetworkService";
import NetworkService from "./NetworkService";
import { store } from "../store";

const NetworkServiceProvider = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const networkService = new NetworkService(store, dispatch, navigate);
	setNetworkService(networkService);
	return children;
};

export default NetworkServiceProvider;
