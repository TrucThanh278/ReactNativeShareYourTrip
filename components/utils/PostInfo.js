
// import React from 'react';
// import { TouchableHighlight, View } from "react-native";
// import {
//     ActivityIndicator,
//     Avatar,
//     Button,
//     Card,
//     Paragraph,
//     TextInput,
//     Title,
// } from "react-native-paper";
// import MyStyles from "../../styles/MyStyles";
// import Hashtag from "../hashtags/Hashtag";
// import PostImages from "../posts/PostImages";
// import { useNavigation } from '@react-navigation/native';

// const PostInfo = ({ post, loading }) => {
//     const navigation = useNavigation();



//     return (
//         <Card style={[MyStyles.margin, MyStyles.border]}>
//             <TouchableHighlight
//                 activeOpacity={0.5}
//                 underlayColor="#DDDDDD"
//                 onPress={() => navigation.navigate('ProfileNavigator', { userId: post.user.id })}
//             >
//                 <Card.Title
//                     title={`${post.user.first_name} ${post.user.last_name}`}
//                     subtitle={post.user.following}
//                     left={(props) => (
//                         <Avatar.Image
//                             {...props}
//                             size={50}
//                             source={{
//                                 uri: post.user.avatar,
//                             }}
//                         />
//                     )}
//                 />
//             </TouchableHighlight>

//             <Card.Content style={{ margin: 0 }}>
//                 <Title>{post.title}</Title>
//                 <Paragraph>
//                     {post.starting_point} to {post.end_point}
//                 </Paragraph>
                
//                 {<Hashtag hashtags={post.hashtags} />}
//             </Card.Content>
//             {loading && <ActivityIndicator />}
//             {<PostImages images={post.images} />}
//             <Card.Actions>
//                 <View style={{ flex: 1 }}>
//                     <TextInput
//                         style={{
//                             borderRadius: 10,
//                             width: "100%",
//                             backgroundColor: "#fff",
//                         }}
//                         placeholder={"Nhập comment..."}
//                         mode="outlined"
//                         label={"Comment"}
//                     />
//                 </View>
//                 {post.active ? (
//                     <></>
//                 ) : (
//                     <Button
//                         icon={"send-circle"}
//                         onPress={() =>
//                             navigation.navigate("PostDetail", {
//                                 postId: post.id,
//                             })
//                         }
//                     >
//                         Chi tiết
//                     </Button>
//                 )}
//             </Card.Actions>
//         </Card>
//     );
// };

// export default PostInfo;


// import React, { useState, useEffect } from 'react';
// import { Alert, TouchableHighlight, View } from "react-native";
// import {
//     ActivityIndicator,
//     Avatar,
//     Button,
//     Card,
//     Paragraph,
//     TextInput,
//     Title,
// } from "react-native-paper";
// import MyStyles from "../../styles/MyStyles";
// import Hashtag from "../hashtags/Hashtag";
// import PostImages from "../posts/PostImages";
// import { useNavigation } from '@react-navigation/native';

// const PostInfo = ({ post, loading }) => {
//     const navigation = useNavigation();
//     const [averageRating, setAverageRating] = useState(null);

//     const fetchAverageRating = async (postId) => {
//         try {
//             const response = await fetch(`http://192.168.1.50:8000/posts/${postId}/average_rating/`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setAverageRating(data.average_rating);
//         } catch (error) {
//             console.error("Error fetching average rating:", error);
//             Alert.alert("Error", `Failed to fetch average rating: ${error.message}`);
//         }
//     };

//     useEffect(() => {
//         fetchAverageRating(post.id);
//     }, [post.id]);

//     return (
//         <Card style={[MyStyles.margin, MyStyles.border]}>
//             <TouchableHighlight
//                 activeOpacity={0.5}
//                 underlayColor="#DDDDDD"
//                 onPress={() => navigation.navigate('ProfileNavigator', { userId: post.user.id })}
//             >
//                 <Card.Title
//                     title={`${post.user.first_name} ${post.user.last_name}`}
//                     subtitle={post.user.following}
//                     left={(props) => (
//                         <Avatar.Image
//                             {...props}
//                             size={50}
//                             source={{
//                                 uri: post.user.avatar,
//                             }}
//                         />
//                     )}
//                 />
//             </TouchableHighlight>

//             <Card.Content style={{ margin: 0 }}>
//                 <Title>{post.title}</Title>
//                 <Paragraph>
//                     {post.starting_point} to {post.end_point}
//                 </Paragraph>
                
//                 {<Hashtag hashtags={post.hashtags} />}
//                 {averageRating !== null && (
//                     <Paragraph>Average Rating: {averageRating.toFixed(2)}</Paragraph>
//                 )}
//             </Card.Content>
//             {loading && <ActivityIndicator />}
//             {<PostImages images={post.images} />}
//             <Card.Actions>
//                 <View style={{ flex: 1 }}>
//                     <TextInput
//                         style={{
//                             borderRadius: 10,
//                             width: "100%",
//                             backgroundColor: "#fff",
//                         }}
//                         placeholder={"Nhập comment..."}
//                         mode="outlined"
//                         label={"Comment"}
//                     />
//                 </View>
//                 {post.active ? (
//                     <></>
//                 ) : (
//                     <Button
//                         icon={"send-circle"}
//                         onPress={() =>
//                             navigation.navigate("PostDetail", {
//                                 postId: post.id,
//                             })
//                         }
//                     >
//                         Chi tiết
//                     </Button>
//                 )}
//                 <Button
//                     icon={"star"}
//                     onPress={() =>
//                         navigation.navigate("RatingDetail", {
//                             postId: post.id,
//                         })
//                     }
//                 >
//                     Xem đánh giá
//                 </Button>
//             </Card.Actions>
//         </Card>
//     );
// };

// export default PostInfo;

import React, { useState, useEffect } from 'react';
import { Alert, TouchableHighlight, View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Button,
    Card,
    Paragraph,
    TextInput,
    Title,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon set
import MyStyles from "../../styles/MyStyles";
import Hashtag from "../hashtags/Hashtag";
import PostImages from "../posts/PostImages";
import { useNavigation } from '@react-navigation/native'; 

const PostInfo = ({ post, loading }) => {
    const navigation = useNavigation();
    const [averageRating, setAverageRating] = useState(null);

    const fetchAverageRating = async (postId) => {
        try {
            const response = await fetch(`http://172.16.12.10:8000/posts/${postId}/average_rating/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAverageRating(data.average_rating);
        } catch (error) {
            console.error("Error fetching average rating:", error);
            Alert.alert("Error", `Failed to fetch average rating: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchAverageRating(post.id);
    }, [post.id]);

    // Hàm này tạo một array các component Icon dựa trên giá trị averageRating
    const renderStars = () => {
        const stars = [];
        if (averageRating !== null) {
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <Icon
                        key={i}
                        name={i <= Math.round(averageRating) ? 'star' : 'star-o'} // Sử dụng icon 'star' hoặc 'star-o' tùy thuộc vào giá trị averageRating
                        size={20}
                        color="#FFD700" // Màu của icon sao
                    />
                );
            }
        }
        return stars;
    };

    return (
        <Card style={[MyStyles.margin, MyStyles.border]}>
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
                onPress={() => navigation.navigate('ProfileNavigator', { userId: post.user.id })}
            >
                <Card.Title
                    title={`${post.user.first_name} ${post.user.last_name}`}
                    subtitle={post.user.following}
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            size={50}
                            source={{
                                uri: post.user.avatar,
                            }}
                        />
                    )}
                />
            </TouchableHighlight>

            <Card.Content style={{ margin: 0 }}>
                <Title>{post.title}</Title>
                <Paragraph>
                    {post.starting_point} to {post.end_point}
                </Paragraph>
                
                {<Hashtag hashtags={post.hashtags} />}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {renderStars()} 
                    {averageRating !== null && (
                        <Paragraph style={{ marginLeft: 5 }}>Average Rating: {averageRating.toFixed(2)}</Paragraph>
                    )}
                </View>
            </Card.Content>
            {loading && <ActivityIndicator />}
            {<PostImages images={post.images} />}
            <Card.Actions>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            width: "100%",
                            backgroundColor: "#fff",
                        }}
                        placeholder={"Nhập comment..."}
                        mode="outlined"
                        label={"Comment"}
                    />
                </View>
                {post.active ? (
                    <></>
                ) : (
                    <Button
                        icon={"send-circle"}
                        onPress={() =>
                            navigation.navigate("PostDetail", {
                                postId: post.id,
                            })
                        }
                    >
                        Detail
                    </Button>
                )}
                <Button
                    icon={"star"}
                    onPress={() =>
                        navigation.navigate("RatingDetail", {
                            postId: post.id,
                        })
                    }
                >
                    Rating
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default PostInfo;
