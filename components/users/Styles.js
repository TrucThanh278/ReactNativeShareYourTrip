import { StyleSheet } from "react-native";

export default StyleSheet.create({
    view:{
        width: "100%",
        // alignSelf: "center",
        // marginTop: 70
    },
    input: {
        width: "100%",
        height: 50,
        padding: 10,
        marginBottom: 10,
        marginTop: 15,
        backgroundColor: "whitesmoke",
        borderRadius: 5
    },
    title: {
        fontSize: 30,
        fontWeight: "100",
        color: "white",
    },
    button: {
        alignSelf:"center",
        width: "60%",
        height: 50,
        textAlign: "center",
        padding: 10,
        backgroundColor: "green",
        color:"white",
        borderRadius: 10,
        marginTop:20,
        fontSize: 20,
        color: "white"
    }, 
    image: {
        width: 100,
        height: 100,
    },
    imgBackGround: {
        width: "100%",
        height: "100%",
        position: 'relative'
    },
    titleLogin: {
        color: "#4F850D",
        fontSize: 30,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    
})