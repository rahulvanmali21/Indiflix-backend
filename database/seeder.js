const  faker  = require("faker");
const { Content } = require("../Models");

// await Content.remove({});

let contentSeeder = function () {
    let contents = [];
    for(let i = 0 ;i<=100 ;i++){

        let content_documents =  {};
        content_documents.title =faker.commerce.productName();
        content_documents.description =faker.commerce.productDescription();
        content_documents.genre = faker.random.arrayElements(['Action', 'Adventure', 'Thriller', "Horror", "Documentary", "Romance", "Drama","History"])
        content_documents.content_type = faker.random.arrayElement(["MOVIE","TV_SHOW"])
        console.log(i);

        contents.push(content_documents);   
    }
    console.log(contents);
    
    Content.insertMany(contents).then(_=>{
        console.log("data inserted");
    }).catch(_=>{
        console.log(_);
    })
}


module.exports = contentSeeder;

