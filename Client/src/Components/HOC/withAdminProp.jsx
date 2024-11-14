import { useSelector } from "react-redux";

const withAdminProp = (WrappedComponent) => {
	const WithAdminProp = (props) => {
		const { user } = useSelector((state) => state.auth);
		const isAdmin =
			(user?.role?.includes("admin") ?? false) ||
			(user?.role?.includes("superadmin") ?? false);

		return (
			<WrappedComponent
				{...props}
				isAdmin={isAdmin}
			/>
		);
	};

	const wrappedComponentName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";
	WithAdminProp.displayName = `WithAdminProp(${wrappedComponentName})`;

	return WithAdminProp;
};

export default withAdminProp;
