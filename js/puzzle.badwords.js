// namespace PUZZLE
var PUZZLE = (function (my) {

my.badwords = [
"abbo",
"abbo",
"abortion",
"adult porn",
"adult rated",
"adult sex",
"adult sight",
"adult sights",
"adult site",
"adult sites",
"adult toy",
"adultpic",
"adultpics",
"adultpictures",
"adultsex",
"adultsite",
"adultsites",
"adulttoy",
"adulttoys",
"anal",
"anal sex",
"analannie",
"analsex",
"analsex",
"angie",
"anus",
"arab",
"arabs",
"areola",
"argie",
"aroused",
"Arse",
"arse",
"Arsehole",
"arsehole",
"asian",
"ass",
"assbagger",
"assblaster",
"assclown",
"asscowboy",
"asses",
"assfuck",
"assfucker",
"asshat",
"asshole",
"assholes",
"asshore",
"assjockey",
"asskiss",
"asskisser",
"assklown",
"asslick",
"asslicker",
"asslover",
"assman",
"assmonkey",
"assmunch",
"assmuncher",
"asspacker",
"asspirate",
"asspuppies",
"assranger",
"asswhore",
"asswipe",
"balls",
"ballsack",
"banging",
"barely legal",
"barelylegal",
"barf",
"barface",
"barfface",
"bast",
"bastard ",
"bazongas",
"bazooms",
"beaner",
"beastality",
"beastial",
"beastiality",
"beastiality",
"beatoff",
"beat-off",
"beatyourmeat",
"bestial",
"bestiality",
"bestiality",
"biatch",
"biatch",
"bicurious",
"big boobies",
"big boobs",
"big cock",
"big cocks",
"big hooters",
"big jugs",
"big tits",
"bigass",
"bigbastard",
"bigbutt",
"bigcocks",
"bigdicks",
"bigger",
"bisexual",
"bi-sexual",
"bitch",
"bitcher",
"bitches",
"bitchez",
"bitchin",
"bitching",
"bitchslap",
"bitchy",
"biteme",
"blackman",
"blacks",
"blind",
"bloody",
"blow",
"blow job",
"blow jobs",
"blowjob",
"blowjobs",
"boang",
"bogan",
"bohunk",
"bollick",
"bollock",
"Bollocks",
"boner",
"bong",
"boob",
"boobies",
"boobs",
"booby",
"boody",
"boong",
"boonga",
"boonie",
"booty",
"bootycall",
"bountybar",
"bra",
"brea5t",
"breast",
"breastjob",
"breastlover",
"breastman",
"brothel",
"bugger",
"buggered",
"buggery",
"bullcrap",
"bulldike",
"bulldyke",
"bullshit",
"bumblefuck",
"bumfuck",
"bunga",
"bunghole",
"buried",
"burn",
"butchbabes",
"butchdike",
"butchdyke",
"butt",
"buttbang",
"butt-bang",
"buttface",
"buttfuck",
"butt-fuck",
"buttfucker",
"butt-fucker",
"buttfuckers",
"butt-fuckers",
"butthead",
"buttman",
"buttmunch",
"buttmuncher",
"buttpirate",
"buttplug",
"buttstain",
"byatch",
"cacker",
"cameljockey",
"cameltoe",
"carpetmuncher",
"carruth",
"chav",
"cherrypopper",
"chickslick",
"chinaman",
"chinaman",
"chinamen",
"chinamen",
"chink",
"chinky",
"choad",
"chode",
"christ",
"cigs",
"clamdigger",
"clamdiver",
"clit",
"clitoris",
"clits",
"clittie",
"clitty",
"clogwog",
"cocaine",
"cock",
"cock",
"cock licker",
"cock lickers",
"cock licking",
"cock ring",
"cock rings",
"cock sucker",
"cock suckers",
"cock sucking",
"cockblock",
"cockblocker",
"cockcowboy",
"cockfight",
"cockhead",
"cockknob",
"cocklick",
"cocklicker",
"cocklickers",
"cocklover",
"cocknob",
"cockqueen",
"cockrider",
"cocksman",
"cocksmith",
"cocksmoker",
"cocksucer",
"cocksuck",
"cocksuck ",
"cocksucked ",
"cocksucker",
"cocksuckers",
"cocksucking",
"cocktail",
"cocktease",
"cocky",
"cohee",
"coitus",
"colored",
"coloured",
"come stain",
"come stains",
"commie",
"condom",
"coolie",
"cooly",
"coon",
"coondog",
"copulate",
"cornhole",
"cotton picker",
"cotton pickers",
"cottonpickers",
"cra5h",
"crabs",
"crack",
"crackpipe",
"crackwhore",
"crack-whore",
"crap",
"crapola",
"crapper",
"crappy",
"crime",
"crimes",
"crotch",
"crotchjockey",
"crotchmonkey",
"crotchrot",
"cum",
"cum pics",
"cum shots",
"cumbubble",
"cumfest",
"cuming",
"cumjockey",
"cumm",
"cummer",
"cumming",
"cumquat",
"cumqueen",
"cums",
"cumshot",
"cunilingus",
"cunillingus",
"cunn",
"cunnilingus",
"cunntt",
"Cunt",
"cunt",
"cunt",
"cunteyed",
"cuntfuck",
"cuntfucker",
"cuntlick ",
"cuntlicker ",
"cuntlicking ",
"cunts",
"cuntsucker",
"cybersex",
"cyberslimer",
"dago",
"dahmer",
"dammit",
"damn",
"damnit",
"darkie",
"darkies",
"darky",
"dead",
"deapthroat",
"deepthroat",
"defecate",
"dego",
"dego",
"deth",
"devil",
"devilworshipper",
"dick",
"dickbrain",
"dicked",
"dickforbrains",
"dickhead",
"dickless",
"dicklick",
"dicklicker",
"dickman",
"dickwad",
"dickwad",
"dickweed",
"diddle",
"dike",
"dildo",
"dildos",
"dingleberry",
"dink",
"dipshit",
"dipstick",
"dirty",
"dive",
"dix",
"dixiedike",
"dixiedyke",
"doggie style",
"doggiestyle",
"doggy style",
"doggystyle",
"dong",
"doodoo",
"doo-doo",
"dope",
"dragqueen",
"dragqween",
"dripdick",
"drug",
"drunk",
"drunken",
"dumb",
"dumbass",
"dumbbitch",
"dumbfuck",
"dyefly",
"dyke",
"easyslut",
"eatballs",
"eatme",
"eatpussy",
"ecstacy",
"ejaculate",
"ejaculate",
"ejaculated",
"ejaculates",
"ejaculating ",
"ejaculation",
"enema",
"erect",
"erection",
"ero",
"escort",
"ethnic",
"evl",
"excrement",
"explicit sex",
"facefucker",
"faeces",
"fag",
"fagging",
"Faggot",
"faggot",
"faggots",
"fagot",
"failed",
"failure",
"fannyfucker",
"fart",
"farted ",
"farting ",
"farty ",
"fastfuck",
"fat",
"fatah",
"fatass",
"fatfuck",
"fatfucker",
"fatso",
"fckcum",
"fear",
"feces",
"felatio ",
"felch",
"felcher",
"felching",
"fellatio",
"feltch",
"feltcher",
"feltching",
"fetish",
"fight",
"filipina",
"filipino",
"fingerfood",
"fingerfuck ",
"fingerfucked ",
"fingerfucker ",
"fingerfuckers",
"fingerfucking ",
"fire",
"firing",
"fister",
"fistfuck",
"fistfucked ",
"fistfucker ",
"fistfucking ",
"fisting",
"fisting",
"flange",
"flasher",
"flatulence",
"floo",
"flydie",
"flydye",
"fok",
"fondle",
"footaction",
"footfuck",
"footfucker",
"footlicker",
"footstar",
"fore",
"foreskin",
"forni",
"fornicate",
"foursome",
"fourtwenty",
"fraud",
"freakfuck",
"freakyfucker",
"free nude",
"free porn",
"free sex",
"freefuck",
"fu",
"fubar",
"fuc",
"fucck",
"Fuck",
"fuck",
"fuck",
"fucka",
"fuckable",
"fuckbag",
"fuckbuddy",
"fucked",
"fuckedup",
"fucker",
"fuckers",
"fuckface",
"fuckfest",
"fuckfreak",
"fuckfriend",
"fuckhead",
"fuckher",
"fuckin",
"fuckina",
"fucking",
"fuckingbitch",
"fuckinnuts",
"fuckinright",
"fuckit",
"fuckknob",
"fuckme ",
"fuckmehard",
"fuckmonkey",
"fuckoff",
"fuckpig",
"fucks",
"fucktard",
"fuckwhore",
"fuckyou",
"fudgepacker",
"fugly",
"fuk",
"fuks",
"funeral",
"funfuck",
"fungus",
"fuuck",
"gangbang",
"gangbanged ",
"gangbanger",
"gangsta",
"gatorbait",
"Gay",
"gay",
"gay cock",
"gay cocks",
"gay porn",
"gay sex",
"gaymuthafuckinwhore",
"gaysex ",
"geez",
"geezer",
"geni",
"genital",
"german",
"getiton",
"gin",
"ginzo",
"gipp",
"girls",
"givehead",
"glazeddonut",
"glory hole",
"glory holes",
"gob",
"god",
"godammit",
"goddamit",
"goddammit",
"goddamn",
"goddamned",
"goddamnes",
"goddamnit",
"goddamnmuthafucker",
"goldenshower",
"gonorrehea",
"gonzagas",
"gook",
"gotohell",
"goy",
"goyim",
"greaseball",
"gringo",
"groe",
"gross",
"grostulation",
"gubba",
"gummer",
"gun",
"gyp",
"gypo",
"gypp",
"gyppie",
"gyppo",
"gyppy",
"hamas",
"handjob",
"hapa",
"hard cock",
"hard cocks",
"hard core adult",
"hard core amateur",
"hard core amateurs",
"hard core gay",
"hard core porn",
"hard core sex",
"hard core teen",
"hard core teens",
"hardcore adult",
"hardcore adult",
"hardcore amateur",
"hardcore amateurs",
"hardcore gay",
"hardcore porn",
"hardcore sex",
"hardcore teen",
"hardcore teens",
"harder",
"hardon",
"harem",
"headfuck",
"headlights",
"hebe",
"heeb",
"hell",
"henhouse",
"heroin",
"herpes",
"heterosexual",
"hijack",
"hijacker",
"hijacking",
"hillbillies",
"hindoo",
"hiscock",
"hitler",
"hitlerism",
"hitlerist",
"hiv",
"ho",
"hobo",
"hodgie",
"hoes",
"hole",
"holestuffer",
"homicide",
"homo",
"homobangers",
"Homosexual",
"homosexual",
"honger",
"honk",
"honkers",
"honkey",
"honky",
"hook",
"hooker",
"hookers",
"hooters",
"hore",
"hork",
"horn",
"horney",
"horniest",
"horny",
"horseshit",
"hosejob",
"hoser",
"hostage",
"hotdamn",
"hotpussy",
"hottotrot",
"huge cock",
"huge cocks",
"hummer",
"husky",
"hussy",
"hustler",
"hymen",
"hymie",
"hymie",
"iblowu",
"idiot",
"ikey",
"illegal",
"incest",
"insest",
"intercourse",
"interracial",
"intheass",
"inthebuff",
"israel",
"israeli",
"israel's",
"italiano",
"itch",
"jackass",
"jackoff",
"jackshit",
"jacktheripper",
"jade",
"jap",
"japanese",
"japcrap",
"japs",
"jebus",
"jeez",
"jerkoff",
"jesus",
"jesuschrist",
"Jew",
"jew",
"jewish",
"jiga",
"jigaboo",
"jigg",
"jigga",
"jiggabo",
"jigger ",
"jiggy",
"jihad",
"jijjiboo",
"jimfish",
"jism",
"jism",
"jiz ",
"jizim",
"jizjuice",
"jizm ",
"jizz",
"jizz",
"jizzim",
"jizzum",
"jizzum",
"joint",
"juggalo",
"jugs",
"junglebunnies",
"junglebunny",
"junglebunny",
"kaffer",
"kaffir",
"kaffre",
"kafir",
"kanake",
"kid",
"kigger",
"kike",
"kike",
"kikes",
"kill",
"killed",
"killer",
"killing",
"kills",
"kink",
"kinky",
"kissass",
"kkk",
"knife",
"knockers",
"kock",
"kondum",
"koon",
"kotex",
"krap",
"krappy",
"kraut",
"kum",
"kumbubble",
"kumbullbe",
"kummer",
"kumming",
"kumquat",
"kums",
"kunilingus",
"kunnilingus",
"kunt",
"ky",
"kyke",
"lactate",
"laid",
"lapdance",
"latin",
"lesbain",
"lesbayn",
"Lesbian",
"lesbian",
"lesbian pussy",
"lesbian sex",
"lesbin",
"lesbo",
"lez",
"lezbe",
"lezbefriends",
"lezbo",
"lezz",
"lezzo",
"liberal",
"libido",
"lick cock",
"lick pussy",
"licker",
"licking cock",
"licking cocks",
"licking pussy",
"lickme",
"licks cock",
"licks cock",
"licks cocks",
"licks pussy",
"licktwat",
"lies",
"limey",
"limpdick",
"limy",
"lingerie",
"liquor",
"live sex",
"livesex",
"loadedgun",
"lolita",
"looser",
"loser",
"lotion",
"lovebone",
"lovegoo",
"lovegun",
"lovejuice",
"lovemuscle",
"lovepistol",
"loverocket",
"lowlife",
"lsd",
"lubejob",
"lucifer",
"luckycammeltoe",
"lugan",
"lynch",
"macaca",
"mad",
"mafia",
"magicwand",
"mams",
"manhater",
"manpaste",
"marijuana",
"mastabate",
"mastabater",
"masterbate",
"masterbating",
"masterblaster",
"mastrabator",
"masturbate",
"masturbates",
"masturbating",
"mattressprincess",
"meatbeatter",
"meatrack",
"meth",
"mexican",
"mgger",
"mggor",
"mickeyfinn",
"mideast",
"milf",
"minority",
"mockey",
"mockie",
"mocky",
"mofo",
"moky",
"moles",
"molest",
"molestation",
"molester",
"molestor",
"moneyshot",
"mooncricket",
"mormon",
"moron",
"moslem",
"mosshead",
"mothafuck",
"mothafucka",
"mothafuckaz",
"mothafucked ",
"mothafucker",
"mothafuckin",
"mothafucking ",
"mothafuckings",
"motherfuck",
"motherfucked",
"Motherfucker",
"motherfucker",
"motherfuckin",
"motherfucking",
"motherfuckings",
"motherlovebone",
"mpeg sex",
"muff",
"muffdive",
"muffdiver",
"muffindiver",
"mufflikcer",
"mulatto",
"muncher",
"munt",
"murder",
"murderer",
"muslim",
"naked",
"naked pre teen",
"naked preteen",
"naked preteens",
"naked teen",
"naked teens",
"naked virgins",
"narcotic",
"nasty",
"nasty girl",
"nasty girls",
"nasty sex",
"nastybitch",
"nastyho",
"nastyslut",
"nastywhore",
"nazi",
"necro",
"negro",
"negroes",
"negroid",
"negro's",
"nig",
"niger",
"nigerian",
"nigerians",
"nigg",
"nigga",
"niggah",
"niggaracci",
"niggard",
"niggarded",
"niggarding",
"niggardliness",
"niggardliness's",
"niggardly",
"niggards",
"niggard's",
"niggas",
"niggaz",
"Nigger",
"nigger",
"Nigger",
"Niger",
"nigor",
"nigra",
"nigar",
"niggor",
"niggur",
"nigga",
"niggah",
"niggar",
"nigguh",
"niggress",
"niggerhead",
"niggerhole",
"niggers",
"niggers",
"nigger's",
"niggle",
"niggled",
"niggles",
"niggling",
"nigglings",
"niggor",
"niggur",
"niglet",
"nignog",
"nigr",
"nigra",
"nigre",
"nip",
"nipple",
"nipplering",
"nittit",
"nlgger",
"nlggor",
"nofuckingway",
"nook",
"nookey",
"nookie",
"noonan",
"nooner",
"nude",
"nude girl",
"nude girls",
"nude preteens",
"nude teens",
"nude virgins",
"nudger",
"nuke",
"nutfucker",
"nymph",
"ontherag",
"oral",
"oral sex",
"oralsex",
"orga",
"orgasim ",
"orgasm",
"orgies",
"orgy",
"osama",
"Paki",
"paki",
"palesimian",
"palestinian",
"pansies",
"pansy",
"panti",
"panties",
"payo",
"pearlnecklace",
"peck",
"pecker",
"peckerwood",
"pee",
"peehole",
"peep shows",
"peep sshow",
"pee-pee",
"peepshow",
"peepshows",
"peepshpw",
"pendy",
"penetration",
"peni5",
"penile",
"penis",
"penises",
"penthouse",
"period",
"perv",
"phonesex",
"phuck",
"phuk",
"phuked",
"phuking",
"phukked",
"phukking",
"phungky",
"phuq",
"pi55",
"picaninny",
"piccaninny",
"pickaninny",
"piker",
"pikey",
"piky",
"pimp",
"pimped",
"pimper",
"pimpjuic",
"pimpjuice",
"pimpsimp",
"pindick",
"piss",
"Piss off",
"piss scene",
"piss scenes",
"pissed",
"Pissed off",
"pisser",
"pisses ",
"pisshead",
"pissin ",
"pissing",
"pissing scene",
"pissing scenes",
"pissoff ",
"pistol",
"pixie",
"pixxx",
"pixy",
"playboy",
"playgirl",
"pocha",
"pocho",
"pocketpool",
"pohm",
"polack",
"polelocks",
"pom",
"pommie",
"pommy",
"poo",
"poon",
"poontang",
"poop",
"pooper",
"pooperscooper",
"pooping",
"poorwhitetrash",
"popimp",
"porch monkey",
"porch monkeys",
"porchmonkey",
"porchmonkeys",
"porn",
"porn sex",
"pornflick",
"pornking",
"porno",
"pornography",
"pornopass",
"pornprincess",
"pot",
"poverty",
"premature",
"pric",
"Prick",
"prick",
"prickhead",
"primetime",
"propaganda",
"pros",
"prostitute",
"protestant",
"pu55i",
"pu55y",
"pube",
"pubic",
"pubiclice",
"pud",
"pudboy",
"pudd",
"puddboy",
"puke",
"puntang",
"purinapricness",
"puss",
"pussie",
"pussies",
"pussies",
"pussy",
"pussy licking",
"pussy sucking",
"pussycat",
"pussyeater",
"pussyfucker",
"pussylicker",
"pussylips",
"pussylover",
"pussypounder",
"pusy",
"quashie",
"queef",
"queer",
"quickie",
"quim",
"quims",
"ra8s",
"rabbi",
"racial",
"racist",
"radical",
"radicals",
"raghead",
"randy",
"rape",
"raped",
"raper",
"rapist",
"rearend",
"rearentry",
"rectum",
"redlight",
"redneck",
"reefer",
"reestie",
"refugee",
"reject",
"remains",
"rentafuck",
"republican",
"retard",
"Retarded",
"retarded",
"ribbed",
"rigger",
"rim jobs",
"rimjob",
"rimming",
"roach",
"robber",
"roundeye",
"rump",
"russki",
"russkie",
"sadis",
"sadom",
"samckdaddy",
"sandm",
"sandnigger",
"satan",
"scag",
"scallywag",
"scat",
"schlong",
"screw",
"screwyou",
"scrotum",
"scum",
"semen",
"seppo",
"servant",
"sex",
"sex chat",
"sex kitten",
"sex kittens",
"sex porn",
"sex show",
"sex shows",
"sex site",
"sex sites",
"sex video",
"sex videos",
"sexed",
"sexfarm",
"sexhound",
"sexhouse",
"sexing",
"sexkitten",
"sexpot",
"sexslave",
"sextogo",
"sextoy",
"sextoys",
"sexual",
"sexually",
"sexwhore",
"sexxx",
"sexy",
"sexy teen",
"sexy teens",
"sexymoma",
"sexy-slim",
"Shag",
"shag",
"shaggin",
"shagging",
"shat",
"shav",
"shaved pussy",
"shawtypimp",
"sheeney",
"shhit",
"shinola",
"Shit",
"shit",
"shitcan",
"shitdick",
"shite",
"shiteater",
"shited",
"shitface",
"shitfaced",
"shitfit",
"shitforbrains",
"shitfuck",
"shitfucker",
"shitfull",
"shithapens",
"shithappens",
"shithead",
"shithouse",
"shiting",
"shitlist",
"shitola",
"shitoutofluck",
"shits",
"shitstain",
"shitted",
"shitter",
"shitting",
"shitty ",
"shoot",
"shooting",
"shortfuck",
"showtime",
"sick",
"sissy",
"sixsixsix",
"sixtynine",
"sixtyniner",
"skank",
"skankbitch",
"skankfuck",
"skankwhore",
"skanky",
"skankybitch",
"skankywhore",
"skinflute",
"skum",
"skumbag",
"Slag",
"slant",
"slanteye",
"slapper",
"slaughter",
"slav",
"slave",
"slavedriver",
"sleezebag",
"sleezeball",
"slideitin",
"slime",
"slimeball",
"slimebucket",
"slopehead",
"slopey",
"slopy",
"slut",
"sluts",
"sluts",
"slutt",
"slutting",
"slutty",
"slutwear",
"slutwhore",
"smack",
"smackthemonkey",
"smut",
"snatch",
"snatchpatch",
"snigger",
"sniggered",
"sniggering",
"sniggers",
"snigger's",
"sniper",
"snot",
"snowback",
"snownigger",
"sob",
"Sodding",
"sodom",
"sodomise",
"sodomite",
"sodomize",
"sodomy",
"sonofabitch",
"sonofbitch",
"sooty",
"sos",
"soviet",
"spaghettibender",
"spaghettinigger",
"spank",
"spankthemonkey",
"Spastic",
"Spastic",
"spear chucker",
"spear chuckers",
"sperm",
"spermacide",
"spermbag",
"spermhearder",
"spermherder",
"spic",
"spick",
"spig",
"spigotty",
"spik",
"spit",
"spitter",
"splittail",
"spooge",
"spooge",
"spreadeagle",
"spunk",
"spunky",
"squaw",
"stagg",
"stiffy",
"strapon",
"stringer",
"stripclub",
"stroke",
"stroking",
"stupid",
"stupidfuck",
"stupidfucker",
"suck",
"suck cock",
"suck cocks",
"suckdick",
"sucker",
"sucking cock",
"sucking cocks",
"suckme",
"suckmyass",
"suckmydick",
"suckmytit",
"suckoff",
"sucks cocks",
"suicide",
"swallow",
"swallower",
"swalow",
"swastika",
"sweetness",
"syphilis",
"taboo",
"taff",
"tampon",
"tang",
"tantra",
"tarbaby",
"tard",
"teat",
"teen pussy",
"teensex",
"terror",
"terrorist",
"teste",
"testicle",
"testicles",
"thicklips",
"thirdeye",
"thirdleg",
"threesome",
"threeway",
"tight pussy",
"tight virgin",
"tight virgins",
"timbernigger",
"tinkle",
"tit",
"titbitnipply",
"titfuck",
"titfucker",
"titfuckin",
"titjob",
"titlicker",
"titlover",
"tits",
"tittie",
"titties",
"titties",
"titty",
"tnt",
"toilet",
"tongethruster",
"tongue",
"tonguethrust",
"tonguetramp",
"tortur",
"torture",
"tosser",
"towelhead",
"trailertrash",
"tramp",
"trannie",
"tranny",
"transexual",
"transsexual",
"transvestite",
"triplex",
"trisexual",
"trojan",
"trots",
"tuckahoe",
"tunneloflove",
"turd",
"turnon",
"Twat",
"twat",
"twats",
"twink",
"twinkie",
"twobitwhore",
"uck",
"uk",
"unfuckable",
"upskirt",
"uptheass",
"upthebutt",
"urinary",
"urinate",
"urine",
"usama",
"uterus",
"vagina",
"vaginal",
"vatican",
"vibr",
"vibrater",
"vibrator",
"video sex",
"vietcong",
"violence",
"virgin",
"virgin ass",
"virgin asses",
"virgin pussy",
"virginbreaker",
"virtual sex",
"vomit",
"vulva",
"wab",
"wank",
"Wanker",
"wanker",
"wanking",
"waysted",
"weapon",
"weenie",
"weewee",
"welcher",
"welfare",
"wetb",
"wetback",
"wetbacks",
"wetspot",
"whacker",
"whash",
"whigger",
"whiskey",
"whiskeydick",
"whiskydick",
"whit",
"whitenigger",
"whites",
"whitetrash",
"whitey",
"whitey",
"whities",
"whiz",
"whop",
"Whore",
"Whore",
"whore",
"whorefucker",
"whorehouse",
"whorehouses",
"whores",
"wigger",
"willie",
"williewanker",
"willy",
"wn",
"wog",
"wog",
"women's",
"wop",
"wops",
"wtf",
"wuss",
"wuzzie",
"xrated",
"xtc",
"xxx",
"xxxrated",
"yankee",
"yellowman",
"zigabo",
"zipperhead",
"foureyes",
"fuck face",
"shit face"
];

return my;
}(PUZZLE || {}));