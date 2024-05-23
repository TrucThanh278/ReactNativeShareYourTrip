import React from "react";
import { View, Image, Text } from "react-native";

const PostImages = ({ images }) => {
	const renderImages = () => {
		switch (images.length) {
			case 1:
				return (
					<Image
						source={{ uri: images[0].image }}
						style={{ width: "100%", height: 200 }}
					/>
				);
			case 2:
				return (
					<View style={{ flexDirection: "row" }}>
						{images.map((image, index) => (
							<Image
								key={index}
								source={{ uri: image.image }}
								style={{ flex: 1, height: 200 }}
							/>
						))}
					</View>
				);
			case 3:
				return (
					<View>
						<Image
							source={{ uri: images[0].image }}
							style={{ width: "100%", height: 200 }}
						/>
						<View style={{ flexDirection: "row" }}>
							{images.slice(1).map((image, index) => (
								<Image
									key={index}
									source={{ uri: image.image }}
									style={{ flex: 1, height: 200 }}
								/>
							))}
						</View>
					</View>
				);
			default:
				return (
					<View>
						<View style={{ flexDirection: "row" }}>
							{images.slice(0, 2).map((image, index) => (
								<Image
									key={index}
									source={{ uri: image.image }}
									style={{ flex: 1, height: 200 }}
								/>
							))}
						</View>
						<View style={{ flexDirection: "row" }}>
							<Image
								source={{ uri: images[2].image }}
								style={{ flex: 1, height: 200 }}
							/>
							<View
								style={{
									flex: 1,
									height: 200,
									position: "relative",
								}}
							>
								<Image
									source={{ uri: images[3].image }}
									style={{ width: "100%", height: "100%" }}
								/>
								{images.length > 4 && (
									<View
										style={{
											position: "absolute",
											top: 0,
											right: 0,
											bottom: 0,
											left: 0,
											backgroundColor: "rgba(0,0,0,0.5)",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text
											style={{
												color: "white",
												fontSize: 30,
											}}
										>
											+{images.length - 4}
										</Text>
									</View>
								)}
							</View>
						</View>
					</View>
				);
		}
	};

	return <View>{renderImages()}</View>;
};

export default PostImages;
