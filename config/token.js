import jwt from "jsonwebtoken"

const genToken=async (userId)=>{
try{
    let token=await jwt.sign({userId},process.env.JWT_SECRET);
    return token
} catch (error){
    console.log(error);
}
}
export default genToken