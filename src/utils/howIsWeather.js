
const request=require('postman-request')




const howIsWeather =(long, latt, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fb3753aabdb37cac2559f056095ffaaf&query=${long},${latt}`;
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("unable to connect server", undefined);
      } else if (body.error) {
        callback("you wright some information wrong", undefined);
      } else {
        const {temperature:temp} = body.current
        const  {feelslike}  = body.current
         callback(undefined, { temp, feelslike });
        
      }
    });
  };

module.exports=howIsWeather