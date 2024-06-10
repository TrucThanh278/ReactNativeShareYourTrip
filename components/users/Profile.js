import { Image, ScrollView, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Avatar, Button, IconButton, Card } from "react-native-paper";
import Styles from "./Styles";

const Profile = () => {
	return (
		<ScrollView style={[MyStyles.container]}>
			<View style={Styles.header}>
				<IconButton icon="arrow-left" onPress={() => {}} />
				<Text style={Styles.headerTitle}>Anette</Text>
				<IconButton icon="dots-vertical" onPress={() => {}} />
			</View>

			<View style={Styles.profileContainer}>
				<Avatar.Image
					size={80}
					source={{
						uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
					}}
					style={Styles.avatar}
				/>
				<View style={Styles.profileDetails}>
					<Text style={Styles.name}>Anette</Text>
					<Text style={Styles.followText}>7,467 Followers</Text>
					<Text style={Styles.followText}>109 Following</Text>
					<Button
						mode="contained"
						onPress={() => {}}
						style={Styles.followButton}
					>
						Nhắn tin
					</Button>
				</View>
			</View>

			<View style={Styles.collections}>
				<Text style={Styles.sectionTitle}>Personal Collections</Text>
				<ScrollView horizontal style={{ height: 150 }}>
					<View
						style={{
							height: "100%",
							position: "relative",
							width: 250,
							margin: 5,
						}}
					>
						<Image
							source={{
								uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
							}}
							style={{ width: "100%", height: "100%" }}
						/>
						<View
							style={{
								position: "absolute",
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
								backgroundColor: "rgba(0,0,0,0.2)",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Content</Text>
						</View>
					</View>

					<View
						style={{
							height: "100%",
							position: "relative",
							width: 250,
							margin: 5,
						}}
					>
						<Image
							source={{
								uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
							}}
							style={{ width: "100%", height: "100%" }}
						/>
						<View
							style={{
								position: "absolute",
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
								backgroundColor: "rgba(0,0,0,0.2)",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Content</Text>
						</View>
					</View>

					<View
						style={{
							height: "100%",
							position: "relative",
							width: 250,
							margin: 5,
						}}
					>
						<Image
							source={{
								uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
							}}
							style={{ width: "100%", height: "100%" }}
						/>
						<View
							style={{
								position: "absolute",
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
								backgroundColor: "rgba(0,0,0,0.2)",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Content</Text>
						</View>
					</View>
				</ScrollView>
			</View>

			<View style={Styles.stats}>
				<Text style={Styles.sectionTitle}>Tours</Text>
				<View style={Styles.statItem}>
					<Text style={Styles.statLabel}>Planned</Text>
					<Text style={Styles.statValue}>441</Text>
				</View>
				<View style={Styles.statItem}>
					<Text style={Styles.statLabel}>Completed</Text>
					<Text style={Styles.statValue}>825</Text>
				</View>

				<Text style={Styles.sectionTitle}>Highlights</Text>
				<View style={Styles.statItem}>
					<Text style={Styles.statLabel}>Recommended</Text>
					<Text style={Styles.statValue}>1674</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default Profile;
