const {Content} = require("../Models");
 const contentSeeder = require("../database/seeder")

let ContentController = {
    index:async(req,res)=>{
        // contentSeeder();
           let contents = await Content.find({}).populate("stream_id").select('stream_id title content_type').where("content_type","MOVIE")
           res.json(contents)
    },
    show: async (req, res) => {
        res.json(req.content);
    },
    store: async (req, res) => {
        try {
            const {
                title,
                content_id,
                description,
                tags,
                content_type,
                genre
            } = req.body;
            // check tilte exist
            let content = await  Content.findOne({title});
            if(content) {
                res.status(422).json({
                    errors:[{
                        title:"Title already used"
                    }]
                });
            }
            let data =  {
                title,
                description,
                tags,
                content_type,
                genre
            }
            content_id && content_id!=null && (data.content_id = content_id);
            content = new Content(data);
            let result=  await content.save();
            res.status(200).json({
                success:true,
                result:result
            });
        } catch (error) {
            console.log(error);
            res.status(422).json({
                errors:[{
                    message:"Something went wrong!"
                }]
            });
        }
        
    },
    edit: () => {

    },
    delete: () => {

    },
    genre: async (req,res) => {
        const values = Content.schema.path('genre').caster.enumValues;
        res.status(200).json(values);
    },


}



module.exports = ContentController;
