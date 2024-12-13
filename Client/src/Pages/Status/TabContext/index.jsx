import { createContext, useState, React } from 'react';

const StatusFormContext = createContext({
    form: {},
    setForm: ()=>{},
});

const StatusFormProvider = ({ children }) => {
	const [form, setForm] = useState({
		companyName: "",
		url: "",
		timezone: "America/Toronto",
		color: "#4169E1",
		//which fields matching below?
		publish: false,
		logo: null,
		monitors: [],
		showUptimePercentage: false,
		showBarcode: false,
	});

	return (
        <StatusFormContext.Provider value={{ form, setForm}}>
			{children}
		</StatusFormContext.Provider>
	);
};

export { StatusFormContext, StatusFormProvider };