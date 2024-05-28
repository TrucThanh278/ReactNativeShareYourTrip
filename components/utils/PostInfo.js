
import React from 'react';
import { TouchableHighlight, View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Button,
    Card,
    Paragraph,
    TextInput,
    Title,
} from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import Hashtag from "../hashtags/Hashtag";
import PostImages from "../posts/PostImages";
import { useNavigation } from '@react-navigation/native';

const PostInfo = ({ post, loading }) => {
    const navigation = useNavigation();



    return (
        <Card style={[MyStyles.margin, MyStyles.border]}>
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
                onPress={() => navigation.navigate('ProfileNavigator', { userId: post.user.id })}
            >
                <Card.Title
                    title={`${post.user.first_name} ${post.user.last_name}`}
                    subtitle={post.user.followers}
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
                        Chi tiết
                    </Button>
                )}
            </Card.Actions>
        </Card>
    );
};

export default PostInfo;
