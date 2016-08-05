var locations = [
	['C8A,C3 ESCORIAL, EL', -4.132340873032904, 40.58526341206354, 'renfe'],
	['C3 ARANJUEZ', -3.6183087155788534, 40.03482999966204, 'renfe'],
	['C8B,C8A,C7A,C2 POZO, EL', -3.656236677060628, 40.37589683066269, 'renfe'],
	['C4B COLMENAR VIEJO', -3.775739397669033, 40.64496375864319, 'renfe'],
	['C4B TRES CANTOS', -3.715658187516108, 40.59843432028959, 'renfe'],
	['C8B NEGRALES, LOS', -4.021902200116179, 40.63857036511661, 'renfe'],
	['C8B,C8A,C2 GUADALAJARA', -3.182395901634457, 40.64407407437585, 'renfe'],
	['C5 PUENTE ALCOCER', -3.7051623515759196, 40.35028419087438, 'renfe'],
	['C4B,C4A MARGARITAS-UNIVERSIDAD, LAS', -3.7273842066249596, 40.3230380125779, 'renfe'],
	['C3 SAN CRISTOBAL DE LOS ANGELES', -3.6838512878170317, 40.34235797336966, 'renfe'],
	['C5 HUMANES', -3.8284707713425004, 40.25564509791133, 'renfe'],
	['C5 RETAMAS, LAS', -3.8424290490152093, 40.341888262253306, 'renfe'],
	['C8B,C8A,C7B,C7A,C2,C10,C1 RECOLETOS', -3.690860168662181, 40.42340722037788, 'renfe'],
	['C3 CIEMPOZUELOS', -3.6100285714107483, 40.159061714481, 'renfe'],
	['C8B,C8A,C7A,C2 GARENA, LA', -3.393175553062696, 40.48043378959678, 'renfe'],
	['C5 ZARZAQUEMADA', -3.748309009266251, 40.34085078582151, 'renfe'],
	['C4B,C4A CANTOBLANCO UNIVERSIDAD', -3.700350089046243, 40.54378164271301, 'renfe'],
	['C8B,C8A,C2 AZUQUECA', -3.2654710436649586, 40.56103158601735, 'renfe'],
	['C3A SAN MARTIN DE LA VEGA', -3.5673885044227713, 40.21923629169069, 'renfe'],
	['C3 GETAFE INDUSTRIAL', -3.7076968896061073, 40.30547507602646, 'renfe'],
	['C8B,C8A,C7A,C2 ALCALA DE HENARES', -3.36634599145341, 40.48902645581435, 'renfe'],
	['C7B,C10,C1 PIRAMIDES', -3.711340849570373, 40.40258924053827, 'renfe'],
	['C8A SANTA MARIA DE LA ALAMEDA', -4.2693363071191675, 40.56891189927277, 'renfe'],
	['C4B,C4A GETAFE CENTRO', -3.733941538507802, 40.31009543734795, 'renfe'],
	['C4B,C4A FUENCARRAL', -3.6823496723526987, 40.50155659988708, 'renfe'],
	['C5 LAGUNA', -3.7442290734301906, 40.39917500552787, 'renfe'],
	['C7B,C10,C1 FUENTE DE LA MORA', -3.6628292423433653, 40.48474241872994, 'renfe'],
	['C5 ALCORCON', -3.8317329680280507, 40.35007387019672, 'renfe'],
	['C5 SERNA, LA', -3.79248579465189, 40.29671794744547, 'renfe'],
	['C3 VALDEMORO', -3.664814931411815, 40.19604109974169, 'renfe'],
	['C8B,C8A,C7A,C3 PITIS', -3.7258523130550314, 40.49510242367337, 'renfe'],
	['C5 SAN JOSE DE VALDERAS', -3.815890583674296, 40.356529122367085, 'renfe'],
	['C3 CASAR, EL', -3.709845118285879, 40.31846219316345, 'renfe'],
	['C5 FANJUL', -3.768574733931224, 40.38364628363051, 'renfe'],
	['C8B,C8A,C7B,C7A,C4B,C4A,C3,C2,C10,C1 CHAMARTIN', -3.6824760538919663, 40.47209661587491, 'renfe'],
	['C8B MOLINOS, LOS', -4.0668239755113, 40.707340451013856, 'renfe'],
	['C8B ALPEDRETE', -4.035071174563291, 40.65815480149421, 'renfe'],
	['C5 MOSTOLES', -3.863498357970568, 40.32849849725135, 'renfe'],
	['C5 ORCASITAS', -3.704416802152046, 40.366901573432514, 'renfe'],
	['C8B,C8A,C3,C10 PINAR DE LAS ROZAS', -3.882165482028544, 40.522293666305785, 'renfe'],
	['C9 PUERTO NAVACERRADA', -4.004685438728572, 40.78437057943294, 'renfe'],
	['C8A,C3 SAN YAGO', -4.03111510485268, 40.61785877795126, 'renfe'],
	['C8B,C8A,C3,C10 GALAPAGAR-LA NAVATA', -3.9818645123204304, 40.600108568081104, 'renfe'],
	['C4B,C4A,C3 VILLAVERDE BAJO', -3.6839904368945735, 40.35263659694155, 'renfe'],
	['C8B,C8A,C7A,C2 TORREJON DE ARDOZ', -3.479826256038893, 40.45460199633802, 'renfe'],
	['C8B,C8A,C7A,C2 COSLADA', -3.5611460818264886, 40.42373119999163, 'renfe'],
	['C5 EMBAJADORES', -3.7026348612362754, 40.40511996575412, 'renfe'],
	['C4B,C4A GETAFE SECTOR 3', -3.7373403788407433, 40.288244501611274, 'renfe'],
	['C8B,C8A,C2 MECO', -3.2986644989324536, 40.53461744623458, 'renfe'],
	['C7A,C10 POZUELO', -3.8001238808112303, 40.447261142142715, 'renfe'],
	['C3A,C3 PINTO', -3.7037400147520514, 40.24278574000684, 'renfe'],
	['C8B,C8A,C7A,C2 VICALVARO', -3.595935728121022, 40.40131368896358, 'renfe'],
	['C8B,C8A,C7A,C2 VALLECAS', -3.6245600124410924, 40.38220746123745, 'renfe'],
	['C5 AGUILAS, LAS', -3.7802803096805615, 40.381180486062775, 'renfe'],
	['C4B,C4A,C3 SOL', -3.7030985703651282, 40.41683792323015, 'renfe'],
	['C7A,C10 MAJADAHONDA', -3.8453554529488922, 40.47427229122904, 'renfe'],
	['C5 DOCE DE OCTUBRE', -3.698616801851457, 40.378954911231034, 'renfe'],
	['C5 MOSTOLES EL SOTO', -3.882340346608399, 40.33088786339554, 'renfe'],
	['C8B,C8A,C7A,C2 SAN FERNANDO HENARES', -3.533852774412929, 40.44266236639195, 'renfe'],
	['C4A VALDELASFUENTES', -3.6543415738040306, 40.5474387048921, 'renfe'],
	['C9 COTOS', -3.9645353659229237, 40.822251018393416, 'renfe'],
	['C5,C4B,C4A VILLAVERDE ALTO', -3.7119321337718123, 40.341224559152614, 'renfe'],
	['C4B GOLOSO, EL', -3.7140759472205445, 40.55857120691977, 'renfe'],
	['C3 SAN CRISTOBAL INDUSTRIAL', -3.6987200154416366, 40.33190856561465, 'renfe'],
	['C4B,C4A PARLA', -3.769366608165016, 40.24076440538317, 'renfe'],
	['C4A ALCOBENDAS-S.S. DE LOS REYES', -3.635189517256521, 40.54656362142589, 'renfe'],
	['C8B,C8A,C2 ALCALA DE HENARES UNIVERSIDAD', -3.3354175945101763, 40.50533655792817, 'renfe'],
	['C5 ALUCHE', -3.760750755646777, 40.3856259629233, 'renfe'],
	['C7B,C10,C1 DELICIAS', -3.692769303958508, 40.400368655255136, 'renfe'],
	['C8B COLLADO MEDIANO', -4.035878597243552, 40.69274929779372, 'renfe'],
	['C9,C8B CERCEDILLA', -4.065909184377562, 40.7375632062849, 'renfe'],
	['C8A ROBLEDO DE CHAVELA', -4.246718597927304, 40.520772953926745, 'renfe'],
	['C7A,C10 BARRIAL-C.COM.POZUELO, EL', -3.807746256678054, 40.465370167715996, 'renfe'],
	['C8B,C8A,C7A,C2 ASAMBLEA DE MADRID-ENTREVIAS', -3.668014620222691, 40.381667299128736, 'renfe'],
	['C5 FUENLABRADA', -3.7988623246663344, 40.28267378684156, 'renfe'],
	['C8A,C3 ZORRERAS, LAS', -4.046068274173796, 40.60940934842415, 'renfe'],
	['C5 CUATRO VIENTOS', -3.7914430316704917, 40.37769919600768, 'renfe'],
	['C8B,C8A,C3,C10 TORRELODONES', -3.9565497079131866, 40.574502096621345, 'renfe'],
	['C5 LEGANES', -3.771485716065576, 40.328977617825345, 'renfe'],
	['C8B,C8A,C3,C10 MATAS, LAS', -3.8968410487820586, 40.55251328616828, 'renfe'],
	['C4A UNIVERSIDAD P. COMILLAS', -3.6833429668171997, 40.554054470191595, 'renfe'],
	['C8B,C8A,C3,C10 VILLALBA', -4.008107082443233, 40.62635885201418, 'renfe'],
	['C5 PARQUE POLVORANCA', -3.783349405049752, 40.31250120452746, 'renfe'],
	['C7B,C5,C10,C1 MENDEZ ALVARO', -3.678083338970974, 40.395374592051084, 'renfe'],
	['C8B,C8A,C7A,C2 SANTA EUGENIA', -3.609063938616696, 40.38698386794485, 'renfe'],
	['C8B,C8A,C7B,C7A,C5,C4B,C4A,C3,C2,C10,C1 ATOCHA', -3.6893092922477035, 40.40658757248981, 'renfe'],
	['C8B,C8A,C7A,C3 RAMON Y CAJAL', -3.694745805222428, 40.48823962074882, 'renfe'],
	['C3A PARQUE DE OCIO', -3.596359658795819, 40.23406421805669, 'renfe'],
	['C8B,C8A,C7B,C7A,C4B,C4A,C3,C2,C10,C1 NUEVOS MINISTERIOS', -3.6923477127573605, 40.446614561260304, 'renfe'],
	['C7A,C10 ARAVACA', -3.78586762936711, 40.44832290177939, 'renfe'],
	['C8A ZARZALEJO', -4.158172021890661, 40.53871189248955, 'renfe'],
	['C7B,C7A,C10,C1 PRINCIPE PIO', -3.7202701213541407, 40.4210655670417, 'renfe'],
	['C7A,C10 ROZAS, LAS', -3.8681329112529435, 40.494229289727414, 'renfe']
]