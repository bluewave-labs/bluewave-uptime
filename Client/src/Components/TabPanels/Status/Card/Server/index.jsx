import TextInput from "../../../../Inputs/TextInput";
import { ServerStartAdornment, ServerEndAdornment } from "../../../../Inputs/TextInput/Adornments";


const Server = ({ id, removeItem, value, onChange }) => {
	return (
		<TextInput
			type="text"
			startAdornment={<ServerStartAdornment />}
			endAdornment={
				<ServerEndAdornment
					id={id}
					removeItem={removeItem}
				/>
			}
			id={id}
			value= {value}
			onChange ={ onChange }
		></TextInput>
	);
};

export default Server;