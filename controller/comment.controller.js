const CommentRepository = require("../repository/comment.repository")

exports.getCommentByContentId = async (req, res) => {
	try {
		const comment = await CommentRepository.getCommentByContentId(req.query)
		res.status(200).send({ success: true, error: false, data: comment })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}

exports.getCommentById = async (req, res) => {
	try {
		const comment = await CommentRepository.getCommentById(req.params.commentId)
		res.status(200).send({ success: true, error: false, data: comment })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}

exports.addComment = async (req, res) => {
	try {
		await CommentRepository.addComment({
			userId: req.userId,
			contentId: req.body.contentId,
			contentType: req.body.contentType,
			text: req.body.text,
			parentId: req.body.parentId
		})
		res.status(200).send({ success: true, error: false })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}

exports.removeCommentByContentId = async (req, res) => {
	try {
		await CommentRepository.removeCommentByContentId(req.body.contentId, req.body.contentType)
		res.status(200).send({ success: true, error: false, data: comment })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}

exports.removeCommentById = async (req, res) => {
	try {
		await CommentRepository.removeCommentById(req.params.commentId)
		res.status(200).send({ success: true, error: false, data: comment })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}

exports.updateInteraction = async (req, res) => {
	try {
		let count = 0
		if (liked) count++
		else count--

		const body = {
			commentId: req.body.commentId,
			type: req.body.type,
			count
		}
		await CommentRepository.updateCommentInteraction(body)
		res.status(200).send({ success: true, error: false, data: comment })
		return
	} catch (err) {
		res.status(400).send({ success: false, error: true, message: err })
	}
}