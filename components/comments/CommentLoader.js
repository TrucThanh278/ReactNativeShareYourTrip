import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";

const addDepthToComments = (comments, depth = 0) => {
	return comments.map((comment) => ({
		...comment,
		depth,
		replies: addDepthToComments(comment.replies || [], depth + 1),
	}));
};

const CommentLoader = ({ postId, children }) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);

	const loadComments = async (postId, page) => {
		if (page > 0 && hasNextPage) {
			try {
				let url = `${endpoints.comments(postId)}?page=${page}`;
				const res = await APIs.get(url);
				if (res.data.next === null) {
					setHasNextPage(false);
				}
				const newComments = addDepthToComments(res.data.results);
				if (page === 1) {
					setComments(newComments);
				} else {
					setComments((prevComments) => [
						...prevComments,
						...newComments,
					]);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		setLoading(true);
		loadComments(postId, page);
	}, [postId, page]);

	return children({ comments, loading, setPage, hasNextPage });
};

export default CommentLoader;
