import React, { useState } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import ImageViewing from "react-native-image-viewing";

const PostImages = ({ images }) => {
	const [visible, setVisible] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);
	const [currentImages, setCurrentImages] = useState([]);

	const openImageViewer = (index, images) => {
		setImageIndex(index);
		setCurrentImages(images);
		setVisible(true);
	};

	const renderImages = () => {
		switch (images.length) {
			case 1:
				return (
					<View>
						<TouchableOpacity
							key={images[0].id}
							style={{ width: "100%", height: 200 }}
							onPress={() => openImageViewer(0, images)}
						>
							<Image
								source={{ uri: images[0].image }}
								style={{ width: "100%", height: 200 }}
							/>
						</TouchableOpacity>
					</View>
				);
			case 2:
				return (
					<View style={{ flexDirection: "row" }}>
						{images.map((image, index) => (
							<TouchableOpacity
								key={image.id}
								style={{ flex: 1, height: 200 }}
								onPress={() => openImageViewer(index, images)}
							>
								<Image
									source={{ uri: image.image }}
									style={{ flex: 1, height: 200 }}
								/>
							</TouchableOpacity>
						))}
					</View>
				);
			case 3:
				return (
					<View>
						<TouchableOpacity
							key={images[0].id}
							style={{ width: "100%", height: 200 }}
							onPress={() => openImageViewer(0, images)}
						>
							<Image
								source={{ uri: images[0].image }}
								style={{ width: "100%", height: 200 }}
							/>
						</TouchableOpacity>
						<View style={{ flexDirection: "row" }}>
							{images.slice(1).map((image, index) => (
								<TouchableOpacity
									key={image.id}
									style={{ flex: 1, height: 200 }}
									onPress={() =>
										openImageViewer(index + 1, images)
									}
								>
									<Image
										source={{ uri: image.image }}
										style={{ flex: 1, height: 200 }}
									/>
								</TouchableOpacity>
							))}
						</View>
					</View>
				);
			default:
				return (
					<View>
						<View style={{ flexDirection: "row" }}>
							{images.slice(0, 2).map((image, index) => (
								<TouchableOpacity
									key={image.id}
									style={{ flex: 1, height: 200 }}
									onPress={() =>
										openImageViewer(index, images)
									}
								>
									<Image
										source={{ uri: image.image }}
										style={{ flex: 1, height: 200 }}
									/>
								</TouchableOpacity>
							))}
						</View>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								key={images[2].id}
								style={{ flex: 1, height: 200 }}
								onPress={() => openImageViewer(2, images)}
							>
								<Image
									source={{ uri: images[2].image }}
									style={{ flex: 1, height: 200 }}
								/>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
									height: 200,
									position: "relative",
								}}
							>
								<TouchableOpacity
									key={images[3].id}
									style={{ width: "100%", height: "100%" }}
									onPress={() => openImageViewer(3, images)}
								>
									<Image
										source={{ uri: images[3].image }}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</TouchableOpacity>
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
										<TouchableOpacity
											onPress={() =>
												openImageViewer(3, images)
											}
										>
											<Text
												style={{
													color: "white",
													fontSize: 30,
												}}
											>
												+{images.length - 4}
											</Text>
										</TouchableOpacity>
									</View>
								)}
							</View>
						</View>
					</View>
				);
		}
	};

	return (
		<View>
			{renderImages()}
			<ImageViewing
				images={currentImages.map((img) => ({ uri: img.image }))}
				imageIndex={imageIndex}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			/>
		</View>
	);
};

export default PostImages;
