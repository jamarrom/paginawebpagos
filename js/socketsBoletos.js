
	var socketB = io.connect('https://socket-acxede.tobecorporativo.mx', { });

	const conectarSocketBole = async () => {
		socketB = io('https://socket-acxede.tobecorporativo.mx/');

		socketB.on('connect', () => {
			console.log('Este usuario se conecto B');
		})

		socketB.on('disconnect', () => {
			console.log('Este usuario ya se desconecto B');
		})
	}

	const socketEntrarSalaBole = async(data,callback) => {
		socketB.emit('entrar-sala',data, callback)
	}

	/*var socketB0 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB1 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB2 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB3 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB4 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB5 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB6 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB7 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB8 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB9 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB10 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB11 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB12 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB13 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB14 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB15 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB16 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB17 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB18 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB19 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB20 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB21 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB22 = io.connect('https://socket-acxede.tobecorporativo.mx', { });
	var socketB23 = io.connect('https://socket-acxede.tobecorporativo.mx', { });

	
	const conectarSocketBole0 = async () => {
		socketB0 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB0.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB0.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole0 = async(data,callback) => {
		socketB0.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole1 = async () => {
		socketB1 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB1.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB1.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole1 = async(data,callback) => {
		socketB1.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole2 = async () => {
		socketB2 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB2.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB2.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole2 = async(data,callback) => {
		socketB2.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole3 = async () => {
		socketB3 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB3.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB3.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole3 = async(data,callback) => {
		socketB3.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole4 = async () => {
		socketB4 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB4.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB4.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole4 = async(data,callback) => {
		socketB4.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole5 = async () => {
		socketB5 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB5.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB5.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole5 = async(data,callback) => {
		socketB5.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole6 = async () => {
		socketB6 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB6.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB6.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole6 = async(data,callback) => {
		socketB6.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole7 = async () => {
		socketB7 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB7.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB7.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole7 = async(data,callback) => {
		socketB7.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole8 = async () => {
		socketB8 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB8.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB8.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole8 = async(data,callback) => {
		socketB8.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole9 = async () => {
		socketB9 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB9.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB9.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole9 = async(data,callback) => {
		socketB9.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole10 = async () => {
		socketB10 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB10.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB10.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole10 = async(data,callback) => {
		socketB10.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole11 = async () => {
		socketB11 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB11.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB11.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole11 = async(data,callback) => {
		socketB11.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole12 = async () => {
		socketB12 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB12.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB12.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole12 = async(data,callback) => {
		socketB12.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole13 = async () => {
		socketB13 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB13.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB13.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole13 = async(data,callback) => {
		socketB13.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole14 = async () => {
		socketB14 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB14.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB14.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole14 = async(data,callback) => {
		socketB14.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole15 = async () => {
		socketB15 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB15.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB15.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole15 = async(data,callback) => {
		socketB15.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole16 = async () => {
		socketB16 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB16.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB16.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole16 = async(data,callback) => {
		socketB16.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole17 = async () => {
		socketB17 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB17.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB17.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole17 = async(data,callback) => {
		socketB17.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole18 = async () => {
		socketB18 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB18.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB18.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole18 = async(data,callback) => {
		socketB18.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole19 = async () => {
		socketB19 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB19.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB19.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole19 = async(data,callback) => {
		socketB19.emit('entrar-sala',data, callback)
	}


	const conectarSocketBole20 = async () => {
		socketB20 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB20.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB20.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole20 = async(data,callback) => {
		socketB20.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole21 = async () => {
		socketB21 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB21.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB21.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole21 = async(data,callback) => {
		socketB21.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole22 = async () => {
		socketB22 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB22.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB22.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole22 = async(data,callback) => {
		socketB22.emit('entrar-sala',data, callback)
	}

	const conectarSocketBole23 = async () => {
		socketB23 = io('https://socket-acxede.tobecorporativo.mx/');

		socketB23.on('connect', () => {
			console.log('Este usuario se conecto');
		})

		socketB23.on('disconnect', () => {
			console.log('Este usuario ya se desconecto');
		})
	}

	const socketEntrarSalaBole23 = async(data,callback) => {
		socketB23.emit('entrar-sala',data, callback)
	}*/