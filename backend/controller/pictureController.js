const picture = require("../model/picture");

//add a picture  controller 

const addPicture = async (req, res) => {
    try{
        const {quote, image, device ,commentsCount, userId} = req.body;
        const newPicture = new picture({
            quote,
            image,
            device,
            commentsCount,
            userId
        })
        res.status(201)({message: "Picture created successfully"});
    }catch(error){
        console.log('Error adding picture : ',error);
        res.status(500).json({message: "Internal server error"});
    }
};

const viewPicture = async (req, res) => {
    try{
        const pictureID = req.params.id;
        const picture = await picture.findById(pictureID);
        if(!picture){
            return res.status(404).json({message: "Picture not found"});
        }

        //check if user is authorised to view picture or not 
        res.status(200).json({picture});
    }catch(error){
        console.log('Error viewing picture : ',error);
            res.status(500).json({message: "Internal server error"});
    }
}

const editPicture = async (req, res) => {
    try{
        const pictureID = req.params.id;
        const {quote, image, device ,commentsCount, userId } = req.body;
        const picture = await picture.findByIdAndUpdate(pictureID, {
            quote,
            image,
            device,
            commentsCount,
            userId
        }, {new: true});

        if(!picture){
            return res.status(404).json({message: "Picture not found"});
        }
    }catch(error){
        console.error('Error editing picture : ',error.message);
            res.status(500).json({message: "Internal server error"});
    }
}

const deletePicture = async (req, res) => {
    try{
        const pictureID = req.params.id;
        const deletePicture = await picture.findByIdAndDelete(pictureID);
        if(!deletePicture){
            return res.status(404).json({message: "Picture not found"});
        }

        //check if user is authorized to delete the pictiure or not
        res.status (200).json({message: "Picture deleted successfully"});
    }catch(error){
        console.error('Error deleting picture : ',error.message);
            res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    addPicture,
    viewPicture,
    editPicture,
    deletePicture
}