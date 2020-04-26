import { Alert } from "react-native";

// eslint-disable-next-line import/prefer-default-export
export const error = message => {
	Alert.alert('An error occurred', message);
};
