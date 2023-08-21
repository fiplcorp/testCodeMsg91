// const { send } = require('process');

const sendOtpService = require('msg91-sdk').SendOtpService;
const otpService = new sendOtpService("400942AtuyTILm64b90212P1", "400942Ttd6O7dGL64ae90caP1");

// const msg91 = require("msg91-api")("400942AtuyTILm64b90212P1");

// const sdk = require("msg91-sdk")("400942Ttd6O7dGL64ae90caP1");

// //"400942AtuyTILm64b90212P1", "400942Ttd6O7dGL64ae90caP1"
module.exports=class MSG91Module{
    constructor(props){
        if(!props) return {err:'no parameters found, provide phone number and otp'}
        this.state={
            phoneNumber:props.phoneNumber,
            otp:props.otp
        };

        
    }
    async msgSendMobile(){
        otpService.otpLength = 6 // 'XXXXXX'
        otpService.otpExpiry = 5 // In minutes
        otpService.setOTPTemplateId('64c37c7dd6fc0513a0430222')
        
        const aOptions = {
            // templateID:'64c37c7dd6fc0513a0430222',
            // otp_length:6,
            // otp_expiry:5,
            mobile: this.state.phoneNumber,// Mandatory param along with country dial code
            otp: this.state.otp,
            
        }
        // console.log(aOptions)

    
        return otpService.sendOTP(aOptions).then((e) => {
        //Handle success result
        console.log(e)
        return {status:'ok',e}
         }).catch((e) => {
             console.log(e)
          //Handle failure result
          return e

         })
     }
     async msgVerifyOtp(props){
        if(props){
            const VOptions={otp:props.enteredOTP,mobile:props.phoneNumber}
            console.log(VOptions)
            return otpService.verifyOTP(VOptions).then((e)=>{
                // console.log(e)
                return {status:'ok',e}
            }).catch((e)=>{
                // console.log(e)
                return e
            })

        }
     }
}

