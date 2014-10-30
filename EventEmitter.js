//TP

//Implement EventName Emitter (Observer design pattern)

//Part 1
/*
En JS, l'equivalent d un HashMap est un objet
Reference pour comprende les fonctions à implémentés http://nodejs.org/api/events.html
*/

//fonction constructeur
function EventEmitter(){
//HashMap [ eventName -> [fn1, fn2, …] ]
// callbacks : objet dont chaque attribut est un eventName associé à un tableau de plusieurs fonctions callbacks
this.callbacks = {};
}

EventEmitter.prototype = {
	//adds a listener to the end of the listeners array for the specified event
	on:function(eventName, fn){
		if (!this.callbacks.hasOwnProperty(eventName)) {
			this.callbacks[eventName] = []; //guard
		}
			//on push
			this.callbacks[eventName].push(fn);
		return this; //for chaining
	},

	//remove an event
	off:function(eventName){
		if(typeof eventName === "undefinded"){
			delete this.callbacks.eventName;
		}
	},

	//remove all listeners
	off:function(){
		for(var key in this.callbacks){
			delete this.callbacks[key];
		}
		return this; //for chaining
	},

	//execute each of the listeners in order with the supplied arguments
	emit:function(eventName){
		if (!this.callbacks.hasOwnProperty(eventName)) {
			return;	
		}
		console.log("eventName reconnu");
		//récupérer le tableau dans une variable, soir l'eventName
		var args = Array.prototype.slice.call(arguments, 1);
		var funcs = this.callbacks[eventName];
		//il faut utiliser un apply
		funcs.forEach(function(func){
			func.apply(null, args);
		})
		return this; //for chaining
	}

};

//Part 2 Implement chaining, .off()
var em = new EventEmitter(); //fonction constructeur
em
.on("event1", console.log.bind(console)) 
.on("event2", console.log.bind(console)) 
.emit("event1", 1).emit("event2",2) 
.off()
.emit("event1", 1).emit("event2",2);