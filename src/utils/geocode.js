const request=require('postman-request')

const geocode = (location, callback) => {
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibnVzcmF0NTIiLCJhIjoiY2t1ZWo3eG9qMWhyOTJvbXhxcGRtcnZxaCJ9.Lg6YQepLhsIPJAsgBYuXBQ&limit=1`


request({ url, json: true }, (error, {body}) => {

    if (error) {

callback('can not join server', undefined)
     } else if (body.features.length===0) {
     
callback('no place found like you added', undefined)

    }


    else {


        const {coordinates:geometry} = body.features[0].geometry
        const {place_name:place} = body.features[0]
        callback(undefined, {
            longtitude: geometry[0],
            lattitude: geometry[1],
            place
        })
      
    }
   
})

}


module.exports=geocode