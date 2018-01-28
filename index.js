const sparkly = require("sparkly");
const os = require("os");

let options = [];
let history = [];

module.exports ={
	render: function(block){
		return new Promise((resolve, reject) => {
			let cpus = os.cpus();

			let stdout = "";

			cpus.forEach(function(cpu, key){
				if(options[key] === undefined){
					options[key] = {
						min: cpu.speed,
						max: cpu.speed
					}

					history[key] = [];
				}

				if(cpu.speed > options[key].max){
					options[key].max = cpu.speed;
				} else if(cpu.speed < options[key].mix){
					options[key].min = cpu.speed;
				}

				history[key].push(cpu.speed);

				if(history[key].length > 5){
					history[key].shift();
				}

				stdout += " " + sparkly(history[key], options[key]) + " ";
			});

			resolve({
				text: "  "+stdout+" "
			});
		});
	},
}

