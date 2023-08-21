const MSG91Module=require("./msg91");

const generateOTP=()=>{
    return  Math.floor(1000 + Math.random() * 9000)
}   


const testFn=async (phoneNumber)=>{
    const generatedOTP=generateOTP();
    const msg=new MSG91Module({phoneNumber:phoneNumber,otp:generatedOTP})

    const res=await msg.msgSendMobile()
    // console.log(res,123)
    const enteredOTP=generatedOTP;
    // const enteredOTP=123456;

    if(res.type=="success"){
        const verifyStatus=  await msg.msgVerifyOtp({enteredOTP,phoneNumber}) //put otp here, and user number again to verify
        console.log(verifyStatus)

    }
    else{
        console.log("otp failed to send, enter otp sent on mail or resend otp")
    }

}
testFn('') //enter phone number



