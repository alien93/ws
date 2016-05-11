
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema();
CommentSchema.add({
	author:{
		type:Schema.Types.ObjectId,
		ref:User,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	commentDate:{
		type:Date,
		required:true,
		default:Date.now
	},
	comments:[CommentSchema]
});

var TaskVersionSchema = new Schema();
TaskVersionSchema.add({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	modifiedBy:{
		type:Schema.Types.ObjectId,
		ref:User,
		required:true
	},
	dateModified:{
		type:Date,
		default:Date.now,
		required:true
	},
	assignedTo:{
		type:Schema.Types.ObjectId,
		ref:User
	},
	status:{
		name:{
			type:String,
			required:true
		},
		value:{
			type:Number,
			required:true
		}
	},
	priority:{
		name:{
			type:String,
			required:true
		},
		value:{
			type:Number,
			required:true
		}
	},
	comments:[CommentSchema]
});

var TaskSchema = new Schema();
TaskSchema.add({
	code:{
		type:String,
		required:true,
		unique:true
	},
	taskVersions:[TaskVersionSchema]

});

var TeamSchema = new Schema();
TeamSchema.add({
	name:{
		type:String,
		required:true,
		unique:true
	},
	users:[{type:Schema.Types.ObjectId,ref:User}],
	projects:[{type:Schema.Types.ObjectId, ref:Project}]
});

var ProjectSchema = new Schema();
ProjectSchema.add({
	name:{
		type:String,
		required:true,
		unique:true	
	},
	createdOn:{
		type:Date,
		default:Date.now,
		required:true
	},
	administrator:{
		type: Schema.Types.ObjectId,
		ref:User,
		required:true
	},
	teams:[{type:Schema.Types.ObjectId,ref:Team}],
	tasks:[TaskSchema]
});

var UserSchema = new Schema({
	type:{
		type:String,
		enum:['Administrator','Programmer'],
		required:true
	},
	username:{
		type:String,
		required:true,
		unique:true		
	},
	password:{
		type:String,
		required:true
	},
	registeredOn:{
		type:Date,
		default: Date.now
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	projects:[{type:Schema.Types.ObjectId, ref:Project}],
	tasks:[{type:Schema.Types.ObjectId, ref:TaskSchema}],
	teams:[{type:Schema.Types.ObjectId, ref:Team}]
});



var Task = mongoose.model('Task',TaskSchema);
var TaskVersion = mongoose.model('TaskVersion',TaskVersionSchema);
var Project = mongoose.model('Project',ProjectSchema);
var User = mongoose.model('User',UserSchema);
var Comment = mongoose.model('Comment',CommentSchema);
var Team = mongoose.model('Team',TeamSchema);

module.exports = User;
module.exports = Project;
module.exports = Task;
module.exports = Comment;
module.exports = TaskVersion;
module.exports = Team;