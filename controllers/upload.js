const uploadImage = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Image Uploaded Successfully",
            file: req.file
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error" + error.message
        })        
    }
}

module.exports = {
    uploadImage
}