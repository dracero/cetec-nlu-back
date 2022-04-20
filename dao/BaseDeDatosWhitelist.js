import whitelist from "../models/whitelist.js";

class BaseDeDatosWhitelist {
    
    constructor(){
        this.whitelistModel = whitelist;
    }

    async is_in_whitelist (email) {
      if (email == null || email === '') {
        console.log("Error: email vacío.");
      }
      
      return whitelist.findOne({email: email})
                      .lean()
                      .then(result => { return result !== null })
                      .catch(e => { throw e });
    }

}

export default BaseDeDatosWhitelist;