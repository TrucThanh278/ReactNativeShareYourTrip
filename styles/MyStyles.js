import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	subject: {
		fontSize: 25,
		fontWeight: "bold",
		color: "blue",
	},
	row: {
		flexDirection: "row",
	},
	wrap: {
		flexWrap: "wrap",
	},
	flexEnd: {
		justifyContent: "flex-end",
	},
	margin: {
		margin: 5,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 20,
	},
	rowHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	searchBar: {
		flex: 11, 
		marginRight: 8,
	},
	buttonPlan: {
		flex: 1,
		justifyContent: "center"
	},
	nameUser:{
		fontSize: 18
	},
	followersUser: {
		
	},

	border: {
    container: {
        flex: 1,
        marginTop: 50
    }, subject: {
        fontSize: 25,
        fontWeight: "bold",
        color: "blue"
    }, row: {
        flexDirection: 'row'
    }, wrap: {
        flexWrap: "wrap"
    }, margin: {
        margin: 1
    }, avatar: {
        width: 50,
        height: 50,
        borderRadius: 20
        
    }, name: {
        color: "green",
		fontWeight: 500
    }, absolute: {
        position: "absolute",
    },
    flexEnd: {
		justifyContent: "flex-end",
	},
    border: {
		borderWidth: 0,
		borderRadius: 0,
	},
	lightTheme: {
		colors: {
			primary: "rgb(42, 107, 41)",
			onPrimary: "rgb(255, 255, 255)",
			primaryContainer: "rgb(172, 244, 161)",
			onPrimaryContainer: "rgb(0, 34, 2)",
			secondary: "rgb(83, 99, 78)",
			onSecondary: "rgb(255, 255, 255)",
			secondaryContainer: "rgb(214, 232, 206)",
			onSecondaryContainer: "rgb(17, 31, 15)",
			tertiary: "rgb(56, 101, 106)",
			onTertiary: "rgb(255, 255, 255)",
			tertiaryContainer: "rgb(188, 235, 240)",
			onTertiaryContainer: "rgb(0, 32, 34)",
			error: "rgb(186, 26, 26)",
			onError: "rgb(255, 255, 255)",
			errorContainer: "rgb(255, 218, 214)",
			onErrorContainer: "rgb(65, 0, 2)",
			background: "rgb(252, 253, 246)",
			onBackground: "rgb(26, 28, 25)",
			surface: "rgb(252, 253, 246)",
			onSurface: "rgb(26, 28, 25)",
			surfaceVariant: "rgb(222, 228, 216)",
			onSurfaceVariant: "rgb(66, 73, 63)",
			outline: "rgb(115, 121, 111)",
			outlineVariant: "rgb(194, 200, 188)",
			shadow: "rgb(0, 0, 0)",
			scrim: "rgb(0, 0, 0)",
			inverseSurface: "rgb(47, 49, 45)",
			inverseOnSurface: "rgb(241, 241, 235)",
			inversePrimary: "rgb(145, 216, 136)",
			elevation: {
				level0: "transparent",
				level1: "rgb(242, 246, 236)",
				level2: "rgb(235, 241, 230)",
				level3: "rgb(229, 237, 223)",
				level4: "rgb(227, 236, 221)",
				level5: "rgb(223, 233, 217)",
			},
			surfaceDisabled: "rgba(26, 28, 25, 0.12)",
			onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
			backdrop: "rgba(44, 50, 42, 0.4)",
		},
	},
	darkTheme: {
		colors: {
			primary: "rgb(145, 216, 136)",
			onPrimary: "rgb(0, 57, 7)",
			primaryContainer: "rgb(12, 82, 19)",
			onPrimaryContainer: "rgb(172, 244, 161)",
			secondary: "rgb(186, 204, 179)",
			onSecondary: "rgb(38, 52, 35)",
			secondaryContainer: "rgb(60, 75, 56)",
			onSecondaryContainer: "rgb(214, 232, 206)",
			tertiary: "rgb(160, 207, 211)",
			onTertiary: "rgb(0, 54, 59)",
			tertiaryContainer: "rgb(30, 77, 82)",
			onTertiaryContainer: "rgb(188, 235, 240)",
			error: "rgb(255, 180, 171)",
			onError: "rgb(105, 0, 5)",
			errorContainer: "rgb(147, 0, 10)",
			onErrorContainer: "rgb(255, 180, 171)",
			background: "rgb(26, 28, 25)",
			onBackground: "rgb(226, 227, 221)",
			surface: "rgb(26, 28, 25)",
			onSurface: "rgb(226, 227, 221)",
			surfaceVariant: "rgb(66, 73, 63)",
			onSurfaceVariant: "rgb(194, 200, 188)",
			outline: "rgb(140, 147, 136)",
			outlineVariant: "rgb(66, 73, 63)",
			shadow: "rgb(0, 0, 0)",
			scrim: "rgb(0, 0, 0)",
			inverseSurface: "rgb(226, 227, 221)",
			inverseOnSurface: "rgb(47, 49, 45)",
			inversePrimary: "rgb(42, 107, 41)",
			elevation: {
				level0: "transparent",
				level1: "rgb(32, 37, 31)",
				level2: "rgb(36, 43, 34)",
				level3: "rgb(39, 49, 37)",
				level4: "rgb(40, 51, 38)",
				level5: "rgb(43, 54, 41)",
			},
			surfaceDisabled: "rgba(226, 227, 221, 0.12)",
			onSurfaceDisabled: "rgba(226, 227, 221, 0.38)",
			backdrop: "rgba(44, 50, 42, 0.4)",
		},
	},
	sendIcon: {
		marginLeft: 10,
    }
},});
