import React, { ActivityIndicator, View } from "react-native";
import { Chip } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";

const Hashtag = ({ hashtags }) => {
	return (
		<View
			style={[
				MyStyles.row,
				MyStyles.wrap,
				MyStyles.flexEnd,
				MyStyles.margin,
			]}
		>
			{hashtags === null ? (
				<ActivityIndicator />
			) : (
				<>
					{hashtags.map((item) => (
						<Chip
							key={item.id}
							style={MyStyles.margin}
							icon="pound"
						>
							{item.hashtag}
						</Chip>
					))}
				</>
			)}
		</View>
	);
};

export default Hashtag;
