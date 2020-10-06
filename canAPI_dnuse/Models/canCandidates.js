const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let canCandidateSchema = new Schema(
  {
    firstName:    { type: String },
    lastName:     { type: String },
    email:        { type: String },
    location:     { type:String  },
    rate:         { type: String },
    gender:       { type: String },
    phone:        { type:String  },
    resumeDetails:{ type:String  },
    country:{ type:String  },
    zipcode:{ type:String  },
    aboutMe:{ type:String  },
    address:{ type:String  },
    resumePath:{type:String}
  },{
    collection:"canCandidates"
  }
);
module.exports = mongoose.model('canCandidates', canCandidateSchema);