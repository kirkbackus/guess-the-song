export interface Song {
  id: string;
  title: string;
  artist: string;
  path: string;
  hint: string;
  category: 'games' | 'pop';
  decade: 'retro' | '80s' | '90s' | '2000s' | '2010s' | '2020s';
  genre: 'game' | 'pop' | 'rock';
}

export const SONGS: Song[] = [
  {
    "id": "mario",
    "title": "Super Mario Bros. Main Theme",
    "artist": "Koji Kondo",
    "path": "midi/mario.mid",
    "hint": "NES classic about a plumber rescuing a princess in the Mushroom Kingdom",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "zelda",
    "title": "The Legend of Zelda Theme",
    "artist": "Koji Kondo",
    "path": "midi/zelda.mid",
    "hint": "NES classic action-adventure theme for a hero named Link",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "tetris",
    "title": "Tetris Theme (Korobeiniki)",
    "artist": "Hirokazu Tanaka",
    "path": "midi/tetris.mid",
    "hint": "A Russian folk song turned blocks-stacking puzzle theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "10-hollow-knight-the-grimm-troupe",
    "title": "10 Hollow Knight   The Grimm Troupe",
    "artist": "Video Game Composer",
    "path": "midi/10-hollow-knight-the-grimm-troupe.mid",
    "hint": "Iconic soundtrack theme from the game 10 Hollow Knight   The Grimm Troupe",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "9999999",
    "title": "9999999",
    "artist": "Portal 2",
    "path": "midi/9999999.mid",
    "hint": "Iconic soundtrack theme from the game Portal 2",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "a-place-to-rest",
    "title": "A Place To Rest",
    "artist": "Undertale Yellow",
    "path": "midi/a-place-to-rest.mid",
    "hint": "Iconic soundtrack theme from the game Undertale Yellow",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "all-kass-songs-meledy-zelda-breath-of-the-wild",
    "title": "All Kass Songs Meledy    Zelda Breath Of The Wild",
    "artist": "JvP",
    "path": "midi/all-kass-songs-meledy-zelda-breath-of-the-wild.mid",
    "hint": "Iconic soundtrack theme from the game JvP",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "an-enigmatic-encounter-undertale-last-breath",
    "title": "An Enigmatic Encounter    Undertale Last Breath",
    "artist": "Video Game Composer",
    "path": "midi/an-enigmatic-encounter-undertale-last-breath.mid",
    "hint": "Iconic soundtrack theme from the game An Enigmatic Encounter    Undertale Last Breath",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "animal-crossing-kk-lullaby-aircheck",
    "title": "Animal Crossing   KK Lullaby Aircheck",
    "artist": "Video Game Composer",
    "path": "midi/animal-crossing-kk-lullaby-aircheck.mid",
    "hint": "Iconic soundtrack theme from the game Animal Crossing   KK Lullaby Aircheck",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "avengers-endgame-portals",
    "title": "Avengers Endgame Portals",
    "artist": "Video Game Composer",
    "path": "midi/avengers-endgame-portals.mid",
    "hint": "Iconic soundtrack theme from the game Avengers Endgame Portals",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "back-on-track-geometry-dash",
    "title": "Back On Track Geometry Dash",
    "artist": "Video Game Composer",
    "path": "midi/back-on-track-geometry-dash.mid",
    "hint": "Iconic soundtrack theme from the game Back On Track Geometry Dash",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "battle-black-kyurem-white-kyurem-pokemon-black-2-and-white-2",
    "title": "Battle! Black Kyurem   White Kyurem   Pokemon Black 2 And White 2",
    "artist": "Video Game Composer",
    "path": "midi/battle-black-kyurem-white-kyurem-pokemon-black-2-and-white-2.mid",
    "hint": "Iconic soundtrack theme from the game Battle! Black Kyurem   White Kyurem   Pokemon Black 2 And White 2",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "c418-danny",
    "title": "C418   Danny",
    "artist": "Minecraft OST",
    "path": "midi/c418-danny.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft OST",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "c418-alpha",
    "title": "C418 Alpha",
    "artist": "Minecraft Volume Beta",
    "path": "midi/c418-alpha.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft Volume Beta",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "castlevania-2-simon-s-quest-bloody-tears",
    "title": "Castlevania 2  Simon's Quest   Bloody Tears",
    "artist": "Video Game Composer",
    "path": "midi/castlevania-2-simon-s-quest-bloody-tears.mid",
    "hint": "Iconic soundtrack theme from the game Castlevania 2  Simon's Quest   Bloody Tears",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "chrono-symphonic-darkness-dueling",
    "title": "Chrono Symphonic   Darkness Dueling",
    "artist": "8 Bit Sawtooth",
    "path": "midi/chrono-symphonic-darkness-dueling.mid",
    "hint": "Iconic soundtrack theme from the game 8 Bit Sawtooth",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "chrono-trigger-wind-scene",
    "title": "Chrono Trigger   Wind Scene",
    "artist": "Video Game Composer",
    "path": "midi/chrono-trigger-wind-scene.mid",
    "hint": "Iconic soundtrack theme from the game Chrono Trigger   Wind Scene",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "dear-may-2nd-2023-and-jul-4-2023-and-sep-17-2022-please-exit-brain-okay-greenpath-hollow-knight",
    "title": "Dear May 2nd 2023 And Jul 4 2023 And Sep 17 2022, Please Exit Brain Okay Greenpath   Hollow Knight",
    "artist": "Video Game Composer",
    "path": "midi/dear-may-2nd-2023-and-jul-4-2023-and-sep-17-2022-please-exit-brain-okay-greenpath-hollow-knight.mid",
    "hint": "Iconic soundtrack theme from the game Dear May 2nd 2023 And Jul 4 2023 And Sep 17 2022, Please Exit Brain Okay Greenpath   Hollow Knight",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "deltarune-a-cyber-s-world",
    "title": "Deltarune  A CYBER'S WORLD",
    "artist": "Pixel Phil",
    "path": "midi/deltarune-a-cyber-s-world.mid",
    "hint": "Iconic soundtrack theme from the game Pixel Phil",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "doom-e1m1",
    "title": "Doom   E1M1",
    "artist": "Video Game Composer",
    "path": "midi/doom-e1m1.mid",
    "hint": "Iconic soundtrack theme from the game Doom   E1M1",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "elder-scrolls-v-skyrim-dragonborn-theme",
    "title": "Elder Scrolls V   Skyrim   Dragonborn Theme",
    "artist": "Video Game Composer",
    "path": "midi/elder-scrolls-v-skyrim-dragonborn-theme.mid",
    "hint": "Iconic soundtrack theme from the game Elder Scrolls V   Skyrim   Dragonborn Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "enter-hallownest-hollow-knight",
    "title": "Enter Hallownest   Hollow Knight",
    "artist": "Video Game Composer",
    "path": "midi/enter-hallownest-hollow-knight.mid",
    "hint": "Iconic soundtrack theme from the game Enter Hallownest   Hollow Knight",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "final-fantasy-vii-final-fantasy-vii-main-theme",
    "title": "Final Fantasy VII   Final Fantasy VII Main Theme",
    "artist": "Video Game Composer",
    "path": "midi/final-fantasy-vii-final-fantasy-vii-main-theme.mid",
    "hint": "Iconic soundtrack theme from the game Final Fantasy VII   Final Fantasy VII Main Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "final-fantasy-vii-one-winged-angel",
    "title": "Final Fantasy VII   One Winged Angel",
    "artist": "Better Version",
    "path": "midi/final-fantasy-vii-one-winged-angel.mid",
    "hint": "Iconic soundtrack theme from the game Better Version",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "friday-theme-roblox-3008",
    "title": "Friday Theme   Roblox 3008",
    "artist": "Video Game Composer",
    "path": "midi/friday-theme-roblox-3008.mid",
    "hint": "Iconic soundtrack theme from the game Friday Theme   Roblox 3008",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "goron-city",
    "title": "Goron City",
    "artist": "Day   Legend Of Zelda Breath Of The Wild",
    "path": "midi/goron-city.mid",
    "hint": "Iconic soundtrack theme from the game Day   Legend Of Zelda Breath Of The Wild",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "greens-jam-animation-vs-minecraft-episode-16-music-block-battle",
    "title": "Greens Jam   Animation Vs Minecraft Episode 16  Music Block Battle",
    "artist": "Video Game Composer",
    "path": "midi/greens-jam-animation-vs-minecraft-episode-16-music-block-battle.mid",
    "hint": "Iconic soundtrack theme from the game Greens Jam   Animation Vs Minecraft Episode 16  Music Block Battle",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "guiding-light",
    "title": "Guiding Light",
    "artist": "Roblox DOORS Credits To Planet Earth",
    "path": "midi/guiding-light.mid",
    "hint": "Iconic soundtrack theme from the game Roblox DOORS Credits To Planet Earth",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "halo-2-menu",
    "title": "Halo 2   Menu",
    "artist": "Video Game Composer",
    "path": "midi/halo-2-menu.mid",
    "hint": "Iconic soundtrack theme from the game Halo 2   Menu",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "halo-reach-overture-from-the-beginning",
    "title": "Halo Reach Overture. From The Beginning",
    "artist": "Video Game Composer",
    "path": "midi/halo-reach-overture-from-the-beginning.mid",
    "hint": "Iconic soundtrack theme from the game Halo Reach Overture. From The Beginning",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "heavensward-final-fantasy-xiv-3-0",
    "title": "Heavensward   Final Fantasy XIV 3.0",
    "artist": "Rutuweianzhice",
    "path": "midi/heavensward-final-fantasy-xiv-3-0.mid",
    "hint": "Iconic soundtrack theme from the game Rutuweianzhice",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "hollow-knight-mantis-lords-theme",
    "title": "Hollow Knight   Mantis Lords Theme",
    "artist": "Video Game Composer",
    "path": "midi/hollow-knight-mantis-lords-theme.mid",
    "hint": "Iconic soundtrack theme from the game Hollow Knight   Mantis Lords Theme",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "hollow-knight-hornet",
    "title": "Hollow Knight  Hornet",
    "artist": "By BidoofTheInfectedJedi EDITED BY",
    "path": "midi/hollow-knight-hornet.mid",
    "hint": "Iconic soundtrack theme from the game By BidoofTheInfectedJedi EDITED BY",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "hopes-and-dreams-undertale",
    "title": "Hopes And Dreams   Undertale",
    "artist": "WIP",
    "path": "midi/hopes-and-dreams-undertale.mid",
    "hint": "Iconic soundtrack theme from the game WIP",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "inside-the-castle-walls-super-mario-64",
    "title": "Inside The Castle Walls   Super Mario 64",
    "artist": "Video Game Composer",
    "path": "midi/inside-the-castle-walls-super-mario-64.mid",
    "hint": "Iconic soundtrack theme from the game Inside The Castle Walls   Super Mario 64",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "kass-theme",
    "title": "Kass' Theme",
    "artist": "Bandoneon Medley   7th Anniversary Special  The Legend Of Zelda  Breath Of The Wild",
    "path": "midi/kass-theme.mid",
    "hint": "Iconic soundtrack theme from the game Bandoneon Medley   7th Anniversary Special  The Legend Of Zelda  Breath Of The Wild",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "kingdom-hearts-dearly-beloved",
    "title": "Kingdom Hearts   Dearly Beloved",
    "artist": "Video Game Composer",
    "path": "midi/kingdom-hearts-dearly-beloved.mid",
    "hint": "Iconic soundtrack theme from the game Kingdom Hearts   Dearly Beloved",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "kirby-super-star-gourmet-race",
    "title": "Kirby Super Star   Gourmet Race",
    "artist": "Video Game Composer",
    "path": "midi/kirby-super-star-gourmet-race.mid",
    "hint": "Iconic soundtrack theme from the game Kirby Super Star   Gourmet Race",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "kirby-super-star-marx-boss-battle",
    "title": "Kirby Super Star   Marx Boss Battle",
    "artist": "Video Game Composer",
    "path": "midi/kirby-super-star-marx-boss-battle.mid",
    "hint": "Iconic soundtrack theme from the game Kirby Super Star   Marx Boss Battle",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "korobeiniki",
    "title": "Korobeiniki",
    "artist": "Tetris Theme",
    "path": "midi/korobeiniki.mid",
    "hint": "Iconic soundtrack theme from the game Tetris Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "last-surprise-persona-5-strikers",
    "title": "Last Surprise   Persona 5 Strikers",
    "artist": "Video Game Composer",
    "path": "midi/last-surprise-persona-5-strikers.mid",
    "hint": "Iconic soundtrack theme from the game Last Surprise   Persona 5 Strikers",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "legend-of-zelda-overworld",
    "title": "Legend Of Zelda   Overworld",
    "artist": "Video Game Composer",
    "path": "midi/legend-of-zelda-overworld.mid",
    "hint": "Iconic soundtrack theme from the game Legend Of Zelda   Overworld",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "legend-of-zelda-breath-of-the-wild-kass-theme",
    "title": "Legend Of Zelda  Breath Of The Wild   Kass' Theme",
    "artist": "Video Game Composer",
    "path": "midi/legend-of-zelda-breath-of-the-wild-kass-theme.mid",
    "hint": "Iconic soundtrack theme from the game Legend Of Zelda  Breath Of The Wild   Kass' Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "lena-raine-creator",
    "title": "Lena Raine   Creator",
    "artist": "Minecraft OST",
    "path": "midi/lena-raine-creator.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft OST",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "lena-raine-creator-minecraft-completed-cover-",
    "title": "Lena Raine   Creator [Minecraft] [COMPLETED COVER]",
    "artist": "Video Game Composer",
    "path": "midi/lena-raine-creator-minecraft-completed-cover-.mid",
    "hint": "Iconic soundtrack theme from the game Lena Raine   Creator [Minecraft] [COMPLETED COVER]",
    "category": "games",
    "decade": "2020s",
    "genre": "game"
  },
  {
    "id": "luigis-mansion-main-theme",
    "title": "Luigis Mansion   Main Theme",
    "artist": "Video Game Composer",
    "path": "midi/luigis-mansion-main-theme.mid",
    "hint": "Iconic soundtrack theme from the game Luigis Mansion   Main Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "mf-doom-one-beer",
    "title": "MF DOOM   One Beer",
    "artist": "Video Game Composer",
    "path": "midi/mf-doom-one-beer.mid",
    "hint": "Iconic soundtrack theme from the game MF DOOM   One Beer",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "main-theme",
    "title": "Main Theme",
    "artist": "Animal Crossing New Horizons",
    "path": "midi/main-theme.mid",
    "hint": "Iconic soundtrack theme from the game Animal Crossing New Horizons",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "mario-bros-super-mario-bros-theme",
    "title": "Mario Bros.   Super Mario Bros. Theme",
    "artist": "Video Game Composer",
    "path": "midi/mario-bros-super-mario-bros-theme.mid",
    "hint": "Iconic soundtrack theme from the game Mario Bros.   Super Mario Bros. Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "megalovania",
    "title": "Megalovania",
    "artist": "Pixel Phil",
    "path": "midi/megalovania.mid",
    "hint": "Iconic soundtrack theme from the game Pixel Phil",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "mice-on-venus-minecraft",
    "title": "Mice On Venus   Minecraft",
    "artist": "Video Game Composer",
    "path": "midi/mice-on-venus-minecraft.mid",
    "hint": "Iconic soundtrack theme from the game Mice On Venus   Minecraft",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-death",
    "title": "Minecraft   Death",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-death.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   Death",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-livingmice",
    "title": "Minecraft   LivingMice",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-livingmice.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   LivingMice",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-moogcity-clavinet-",
    "title": "Minecraft   MoogCity(clavinet)",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-moogcity-clavinet-.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   MoogCity(clavinet)",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-moogcity",
    "title": "Minecraft   MoogCity",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-moogcity.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   MoogCity",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-parody-of-coldplay-s-viva-la-vida-fallen-kingdom",
    "title": "Minecraft   Parody Of Coldplay S Viva La Vida   Fallen Kingdom",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-parody-of-coldplay-s-viva-la-vida-fallen-kingdom.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   Parody Of Coldplay S Viva La Vida   Fallen Kingdom",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-pigstep",
    "title": "Minecraft   Pigstep",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-pigstep.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   Pigstep",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-sweden-instrumental-remake-",
    "title": "Minecraft   Sweden(Instrumental)(Remake)",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-sweden-instrumental-remake-.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   Sweden(Instrumental)(Remake)",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-sweden",
    "title": "Minecraft   Sweden",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-sweden.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   Sweden",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-wet-hands",
    "title": "Minecraft   Wet Hands",
    "artist": "Piano Solo",
    "path": "midi/minecraft-wet-hands.mid",
    "hint": "Iconic soundtrack theme from the game Piano Solo",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-wethands",
    "title": "Minecraft   WetHands",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-wethands.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft   WetHands",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "minecraft-theme",
    "title": "Minecraft Theme",
    "artist": "Video Game Composer",
    "path": "midi/minecraft-theme.mid",
    "hint": "Iconic soundtrack theme from the game Minecraft Theme",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "nada-personal-soda-stereo",
    "title": "Nada Personal   Soda Stereo",
    "artist": "Video Game Composer",
    "path": "midi/nada-personal-soda-stereo.mid",
    "hint": "Iconic soundtrack theme from the game Nada Personal   Soda Stereo",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "nightmare-king-hollow-knight",
    "title": "Nightmare King   Hollow Knight",
    "artist": "Video Game Composer",
    "path": "midi/nightmare-king-hollow-knight.mid",
    "hint": "Iconic soundtrack theme from the game Nightmare King   Hollow Knight",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "oneshot-dying-light",
    "title": "Oneshot DYING LIGHT",
    "artist": "A OneShot Megalovania Remix",
    "path": "midi/oneshot-dying-light.mid",
    "hint": "Iconic soundtrack theme from the game A OneShot Megalovania Remix",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "otherside-minecraft",
    "title": "Otherside   Minecraft",
    "artist": "Video Game Composer",
    "path": "midi/otherside-minecraft.mid",
    "hint": "Iconic soundtrack theme from the game Otherside   Minecraft",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "pigstep-minecraft-ost",
    "title": "Pigstep   Minecraft OST",
    "artist": "Video Game Composer",
    "path": "midi/pigstep-minecraft-ost.mid",
    "hint": "Iconic soundtrack theme from the game Pigstep   Minecraft OST",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "pokemon-pokemon-center-theme",
    "title": "Pokemon   Pokemon Center Theme",
    "artist": "Video Game Composer",
    "path": "midi/pokemon-pokemon-center-theme.mid",
    "hint": "Iconic soundtrack theme from the game Pokemon   Pokemon Center Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "pokemon-black-white-dreamyard-pinwheel-forest",
    "title": "Pokemon Black White Dreamyard Pinwheel Forest",
    "artist": "Video Game Composer",
    "path": "midi/pokemon-black-white-dreamyard-pinwheel-forest.mid",
    "hint": "Iconic soundtrack theme from the game Pokemon Black White Dreamyard Pinwheel Forest",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "pokemon-redblueyellow-wild-pokemon-battle",
    "title": "Pokemon RedBlueYellow   Wild Pokemon Battle",
    "artist": "Video Game Composer",
    "path": "midi/pokemon-redblueyellow-wild-pokemon-battle.mid",
    "hint": "Iconic soundtrack theme from the game Pokemon RedBlueYellow   Wild Pokemon Battle",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "portal-still-alive",
    "title": "Portal   Still Alive",
    "artist": "Video Game Composer",
    "path": "midi/portal-still-alive.mid",
    "hint": "Iconic soundtrack theme from the game Portal   Still Alive",
    "category": "games",
    "decade": "2000s",
    "genre": "game"
  },
  {
    "id": "portal-2-cara-mia",
    "title": "Portal 2   Cara Mia",
    "artist": "Video Game Composer",
    "path": "midi/portal-2-cara-mia.mid",
    "hint": "Iconic soundtrack theme from the game Portal 2   Cara Mia",
    "category": "games",
    "decade": "2000s",
    "genre": "game"
  },
  {
    "id": "quartz-quadrant-present-from-the-sonic-cd-japanese",
    "title": "Quartz Quadrant Present   From The Sonic CD Japanese",
    "artist": "Video Game Composer",
    "path": "midi/quartz-quadrant-present-from-the-sonic-cd-japanese.mid",
    "hint": "Iconic soundtrack theme from the game Quartz Quadrant Present   From The Sonic CD Japanese",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "rain-deference-for-darkness-halo-3-odst",
    "title": "Rain, Deference For Darkness   Halo 3 ODST",
    "artist": "Video Game Composer",
    "path": "midi/rain-deference-for-darkness-halo-3-odst.mid",
    "hint": "Iconic soundtrack theme from the game Rain, Deference For Darkness   Halo 3 ODST",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "reconstructing-more-science-portal-2",
    "title": "Reconstructing More Science   Portal 2",
    "artist": "Video Game Composer",
    "path": "midi/reconstructing-more-science-portal-2.mid",
    "hint": "Iconic soundtrack theme from the game Reconstructing More Science   Portal 2",
    "category": "games",
    "decade": "2000s",
    "genre": "game"
  },
  {
    "id": "roblox-doors-elevator-jam-midi",
    "title": "Roblox Doors   Elevator Jam Midi",
    "artist": "Video Game Composer",
    "path": "midi/roblox-doors-elevator-jam-midi.mid",
    "hint": "Iconic soundtrack theme from the game Roblox Doors   Elevator Jam Midi",
    "category": "games",
    "decade": "2020s",
    "genre": "game"
  },
  {
    "id": "roddy-ricch-ballin-midi-optimized-for-roblox-the-wild-west",
    "title": "Roddy Ricch   Ballin Midi Optimized For Roblox The Wild West",
    "artist": "Video Game Composer",
    "path": "midi/roddy-ricch-ballin-midi-optimized-for-roblox-the-wild-west.mid",
    "hint": "Iconic soundtrack theme from the game Roddy Ricch   Ballin Midi Optimized For Roblox The Wild West",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "sealed-vessel",
    "title": "Sealed Vessel",
    "artist": "Hollow Knight OST   WIP",
    "path": "midi/sealed-vessel.mid",
    "hint": "Iconic soundtrack theme from the game Hollow Knight OST   WIP",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "showdown-undertale-yellow",
    "title": "Showdown   Undertale Yellow",
    "artist": "JvP",
    "path": "midi/showdown-undertale-yellow.mid",
    "hint": "Iconic soundtrack theme from the game JvP",
    "category": "games",
    "decade": "2020s",
    "genre": "game"
  },
  {
    "id": "sonic-the-hedgehog-green-hill-zone",
    "title": "Sonic The Hedgehog   Green Hill Zone",
    "artist": "Video Game Composer",
    "path": "midi/sonic-the-hedgehog-green-hill-zone.mid",
    "hint": "Iconic soundtrack theme from the game Sonic The Hedgehog   Green Hill Zone",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "sonic-exe-hill-act-0",
    "title": "Sonic.exe Hill Act 0",
    "artist": "Video Game Composer",
    "path": "midi/sonic-exe-hill-act-0.mid",
    "hint": "Iconic soundtrack theme from the game Sonic.exe Hill Act 0",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "subwoofer-lullaby-c418-minecraft",
    "title": "Subwoofer Lullaby C418  Minecraft",
    "artist": "Video Game Composer",
    "path": "midi/subwoofer-lullaby-c418-minecraft.mid",
    "hint": "Iconic soundtrack theme from the game Subwoofer Lullaby C418  Minecraft",
    "category": "games",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "super-mario-64-medley",
    "title": "Super Mario 64   Medley",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-64-medley.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario 64   Medley",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-64-slide",
    "title": "Super Mario 64   Slide",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-64-slide.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario 64   Slide",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-bros-1-super-mario-bros-main-theme-with-left-hand-chords",
    "title": "Super Mario Bros. 1   Super Mario Bros   Main Theme With Left Hand Chords",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-bros-1-super-mario-bros-main-theme-with-left-hand-chords.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Bros. 1   Super Mario Bros   Main Theme With Left Hand Chords",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "super-mario-bros-1-super-mario-bros-main-theme",
    "title": "Super Mario Bros. 1   Super Mario Bros   Main Theme",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-bros-1-super-mario-bros-main-theme.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Bros. 1   Super Mario Bros   Main Theme",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-athletic",
    "title": "Super Mario Land 2 6 Golden Coins   Athletic",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-athletic.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Athletic",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-boss-battle",
    "title": "Super Mario Land 2 6 Golden Coins   Boss Battle",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-boss-battle.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Boss Battle",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-ending-theme",
    "title": "Super Mario Land 2 6 Golden Coins   Ending Theme",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-ending-theme.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Ending Theme",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-file-select",
    "title": "Super Mario Land 2 6 Golden Coins   File Select",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-file-select.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   File Select",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-haunted-house",
    "title": "Super Mario Land 2 6 Golden Coins   Haunted House",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-haunted-house.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Haunted House",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-map",
    "title": "Super Mario Land 2 6 Golden Coins   Map",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-map.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Map",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-overworld",
    "title": "Super Mario Land 2 6 Golden Coins   Overworld",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-overworld.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Overworld",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-seashore",
    "title": "Super Mario Land 2 6 Golden Coins   Seashore",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-seashore.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Seashore",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-star-maze",
    "title": "Super Mario Land 2 6 Golden Coins   Star Maze",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-star-maze.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Star Maze",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-the-moon",
    "title": "Super Mario Land 2 6 Golden Coins   The Moon",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-the-moon.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   The Moon",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-land-2-6-golden-coins-zone-medley",
    "title": "Super Mario Land 2 6 Golden Coins   Zone Medley",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-land-2-6-golden-coins-zone-medley.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario Land 2 6 Golden Coins   Zone Medley",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-rpg-forest-maze",
    "title": "Super Mario RPG   Forest Maze",
    "artist": "Video Game Composer",
    "path": "midi/super-mario-rpg-forest-maze.mid",
    "hint": "Iconic soundtrack theme from the game Super Mario RPG   Forest Maze",
    "category": "games",
    "decade": "90s",
    "genre": "game"
  },
  {
    "id": "super-mario-world-ending-theme",
    "title": "Super Mario World   Ending Theme",
    "artist": "Tom Brier",
    "path": "midi/super-mario-world-ending-theme.mid",
    "hint": "Iconic soundtrack theme from the game Tom Brier",
    "category": "games",
    "decade": "80s",
    "genre": "game"
  },
  {
    "id": "super-smash-bros-brawl-ground-theme-super-mario-bros",
    "title": "Super Smash Bros Brawl   Ground Theme Super Mario Bros",
    "artist": "Video Game Composer",
    "path": "midi/super-smash-bros-brawl-ground-theme-super-mario-bros.mid",
    "hint": "Iconic soundtrack theme from the game Super Smash Bros Brawl   Ground Theme Super Mario Bros",
    "category": "games",
    "decade": "2000s",
    "genre": "game"
  },
  {
    "id": "rickroll",
    "title": "Never Gonna Give You Up",
    "artist": "Rick Astley",
    "path": "midi/rickroll.mid",
    "hint": "The ultimate 80s pop song used to prank people on the internet",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "billiejean",
    "title": "Billie Jean",
    "artist": "Michael Jackson",
    "path": "midi/billiejean.mid",
    "hint": "Michael Jackson 80s hit with an iconic bassline and moonwalk dance",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "takeonme",
    "title": "Take On Me",
    "artist": "A-ha",
    "path": "midi/takeonme.mid",
    "hint": "80s synth-pop track by Norwegian band A-ha with a famous high-pitched chorus",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "21-guns",
    "title": "21 Guns",
    "artist": "Green Day",
    "path": "midi/21-guns.mid",
    "hint": "Famous 80s/90s pop/rock hit by Green Day",
    "category": "pop",
    "decade": "90s",
    "genre": "rock"
  },
  {
    "id": "505-arctic-monkeys",
    "title": "505   Arctic Monkeys",
    "artist": "Various Artists",
    "path": "midi/505-arctic-monkeys.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "a-ha-take-on-me",
    "title": "A HA.Take On Me",
    "artist": "Various Artists",
    "path": "midi/a-ha-take-on-me.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "abba-dancing-queen",
    "title": "ABBA   Dancing Queen",
    "artist": "Various Artists",
    "path": "midi/abba-dancing-queen.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "acdc-highway-to-hell",
    "title": "ACDC.Highway To Hell",
    "artist": "Various Artists",
    "path": "midi/acdc-highway-to-hell.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "acdc-thunderstruck",
    "title": "ACDC.Thunderstruck",
    "artist": "Various Artists",
    "path": "midi/acdc-thunderstruck.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "ace-of-base-happy-nation",
    "title": "ACE OF BASE.Happy Nation",
    "artist": "Various Artists",
    "path": "midi/ace-of-base-happy-nation.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "america-a-horse-with-no-name",
    "title": "AMERICA.A Horse With No Name",
    "artist": "Various Artists",
    "path": "midi/america-a-horse-with-no-name.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "abba-lay-all-your-love-on-me",
    "title": "Abba   Lay All Your Love On Me",
    "artist": "Various Artists",
    "path": "midi/abba-lay-all-your-love-on-me.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "america-the-beautiful",
    "title": "America The Beautiful",
    "artist": "Various Artists",
    "path": "midi/america-the-beautiful.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "retro",
    "genre": "pop"
  },
  {
    "id": "american-idiot-green-day",
    "title": "American Idiot   Green Day",
    "artist": "Fixed Drums",
    "path": "midi/american-idiot-green-day.mid",
    "hint": "Famous 80s/90s pop/rock hit by Fixed Drums",
    "category": "pop",
    "decade": "2000s",
    "genre": "pop"
  },
  {
    "id": "arctic-monkeys-r-u-mine",
    "title": "Arctic Monkeys   R U Mine",
    "artist": "Various Artists",
    "path": "midi/arctic-monkeys-r-u-mine.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "arctic-monkeys-when-the-sun-goes-down",
    "title": "Arctic Monkeys   When The Sun Goes Down",
    "artist": "Various Artists",
    "path": "midi/arctic-monkeys-when-the-sun-goes-down.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "avicii-levels",
    "title": "Avicii   Levels",
    "artist": "Skrillex Remix",
    "path": "midi/avicii-levels.mid",
    "hint": "Famous 80s/90s pop/rock hit by Skrillex Remix",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "avicii-waiting-for-love",
    "title": "Avicii   Waiting For Love",
    "artist": "Various Artists",
    "path": "midi/avicii-waiting-for-love.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "black-sabbath-paranoid",
    "title": "BLACK SABBATH.Paranoid",
    "artist": "Various Artists",
    "path": "midi/black-sabbath-paranoid.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "rock"
  },
  {
    "id": "bowie-starman",
    "title": "BOWIE.Starman",
    "artist": "Various Artists",
    "path": "midi/bowie-starman.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "backstreet-boys-i-want-it-that-way",
    "title": "Backstreet Boys   I Want It That Way",
    "artist": "Various Artists",
    "path": "midi/backstreet-boys-i-want-it-that-way.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "billy-joel-piano-man",
    "title": "Billy Joel   Piano Man",
    "artist": "Various Artists",
    "path": "midi/billy-joel-piano-man.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "boulevard-of-broken-dreams-green-day-ippantekina",
    "title": "Boulevard Of Broken Dreams   Green Day   Ippantekina",
    "artist": "Various Artists",
    "path": "midi/boulevard-of-broken-dreams-green-day-ippantekina.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "2000s",
    "genre": "pop"
  },
  {
    "id": "buddy-holly-weezer-2",
    "title": "Buddy Holly   Weezer 2",
    "artist": "Various Artists",
    "path": "midi/buddy-holly-weezer-2.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "buddy-holly-weezer",
    "title": "Buddy Holly   Weezer",
    "artist": "Various Artists",
    "path": "midi/buddy-holly-weezer.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "clash-royale-little-prince-arena-theme",
    "title": "Clash Royale Little Prince Arena Theme",
    "artist": "Converted",
    "path": "midi/clash-royale-little-prince-arena-theme.mid",
    "hint": "Famous 80s/90s pop/rock hit by Converted",
    "category": "pop",
    "decade": "2010s",
    "genre": "game"
  },
  {
    "id": "coldplay-clocks",
    "title": "Coldplay   Clocks",
    "artist": "Full Song",
    "path": "midi/coldplay-clocks.mid",
    "hint": "Famous 80s/90s pop/rock hit by Full Song",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "coldplay-viva-la-vida",
    "title": "Coldplay   Viva La Vida",
    "artist": "Various Artists",
    "path": "midi/coldplay-viva-la-vida.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "coldplay-yellow",
    "title": "Coldplay   Yellow",
    "artist": "Various Artists",
    "path": "midi/coldplay-yellow.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "coolio-gangstas-paradise",
    "title": "Coolio   Gangstas Paradise",
    "artist": "Various Artists",
    "path": "midi/coolio-gangstas-paradise.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "coolio-gangsta-s-paradise",
    "title": "Coolio   Gangsta's Paradise",
    "artist": "Gangster's Paradise",
    "path": "midi/coolio-gangsta-s-paradise.mid",
    "hint": "Famous 80s/90s pop/rock hit by Gangster's Paradise",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "daft-punk-around-the-world",
    "title": "Daft Punk   Around The World",
    "artist": "Various Artists",
    "path": "midi/daft-punk-around-the-world.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "daft-punk-one-more-time",
    "title": "Daft Punk   One More Time",
    "artist": "Various Artists",
    "path": "midi/daft-punk-one-more-time.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "does-the-journey-seem-long",
    "title": "Does The Journey Seem Long",
    "artist": "Various Artists",
    "path": "midi/does-the-journey-seem-long.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "europe-the-final-countdown",
    "title": "EUROPE.The Final Countdown",
    "artist": "Various Artists",
    "path": "midi/europe-the-final-countdown.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "elton-john-bennie-and-the-jets-edit-by-sesh",
    "title": "Elton John   Bennie And The Jets   Edit By Sesh",
    "artist": "Various Artists",
    "path": "midi/elton-john-bennie-and-the-jets-edit-by-sesh.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "elton-john-i-m-still-standing",
    "title": "Elton John   I'm Still Standing",
    "artist": "Various Artists",
    "path": "midi/elton-john-i-m-still-standing.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "2000s",
    "genre": "pop"
  },
  {
    "id": "elton-john-rocket-man",
    "title": "Elton John   Rocket Man",
    "artist": "Various Artists",
    "path": "midi/elton-john-rocket-man.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "exit-music",
    "title": "Exit Music",
    "artist": "For A Film   Radiohead",
    "path": "midi/exit-music.mid",
    "hint": "Famous 80s/90s pop/rock hit by For A Film   Radiohead",
    "category": "pop",
    "decade": "80s",
    "genre": "rock"
  },
  {
    "id": "good-riddance",
    "title": "Good Riddance",
    "artist": "Time Of Your Life Green Day",
    "path": "midi/good-riddance.mid",
    "hint": "Famous 80s/90s pop/rock hit by Time Of Your Life Green Day",
    "category": "pop",
    "decade": "90s",
    "genre": "rock"
  },
  {
    "id": "green-day-basket-case",
    "title": "Green Day   Basket Case",
    "artist": "Various Artists",
    "path": "midi/green-day-basket-case.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "green-day-holiday",
    "title": "Green Day   Holiday",
    "artist": "Various Artists",
    "path": "midi/green-day-holiday.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "2000s",
    "genre": "pop"
  },
  {
    "id": "green-day-wake-me-up-when-september-ends",
    "title": "Green Day   Wake Me Up When September Ends",
    "artist": "Various Artists",
    "path": "midi/green-day-wake-me-up-when-september-ends.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "2000s",
    "genre": "pop"
  },
  {
    "id": "green-day-welcome-to-paradise-v7",
    "title": "Green Day   Welcome To Paradise V7",
    "artist": "Various Artists",
    "path": "midi/green-day-welcome-to-paradise-v7.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "guns-n-roses-sweet-child-o-mine",
    "title": "Guns N Roses   Sweet Child O Mine",
    "artist": "Various Artists",
    "path": "midi/guns-n-roses-sweet-child-o-mine.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "rock"
  },
  {
    "id": "hey-brother-avicii",
    "title": "Hey Brother Avicii",
    "artist": "Various Artists",
    "path": "midi/hey-brother-avicii.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "in-the-air-tonight",
    "title": "In The Air Tonight",
    "artist": "Phil Collins",
    "path": "midi/in-the-air-tonight.mid",
    "hint": "Famous 80s/90s pop/rock hit by Phil Collins",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "killer-queen-queen",
    "title": "Killer Queen   Queen",
    "artist": "Various Artists",
    "path": "midi/killer-queen-queen.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "led-zeppelin-stairway-to-heaven",
    "title": "LED ZEPPELIN.Stairway To Heaven",
    "artist": "Various Artists",
    "path": "midi/led-zeppelin-stairway-to-heaven.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "linkin-park-numb",
    "title": "Linkin Park   Numb",
    "artist": "Tim Dawes Remix",
    "path": "midi/linkin-park-numb.mid",
    "hint": "Famous 80s/90s pop/rock hit by Tim Dawes Remix",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "linkin-park-one-step-closer",
    "title": "Linkin Park   One Step Closer",
    "artist": "Various Artists",
    "path": "midi/linkin-park-one-step-closer.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "metallica-enter-sandman",
    "title": "Metallica   Enter Sandman",
    "artist": "Various Artists",
    "path": "midi/metallica-enter-sandman.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "metallica-master-of-puppets",
    "title": "Metallica   Master Of Puppets",
    "artist": "Various Artists",
    "path": "midi/metallica-master-of-puppets.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "metallica-nothing-else-matters",
    "title": "Metallica   Nothing Else Matters",
    "artist": "Various Artists",
    "path": "midi/metallica-nothing-else-matters.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "michael-jackson-beat-it",
    "title": "Michael Jackson   Beat It",
    "artist": "Various Artists",
    "path": "midi/michael-jackson-beat-it.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "michael-jackson-billie-jean",
    "title": "Michael Jackson   Billie Jean",
    "artist": "Various Artists",
    "path": "midi/michael-jackson-billie-jean.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "oasis-wonderwall",
    "title": "OASIS.Wonderwall",
    "artist": "Various Artists",
    "path": "midi/oasis-wonderwall.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "pink-floyd-brain-damage",
    "title": "Pink Floyd   Brain Damage",
    "artist": "Various Artists",
    "path": "midi/pink-floyd-brain-damage.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "queen-bohemian-rhapsody",
    "title": "Queen   Bohemian Rhapsody",
    "artist": "Various Artists",
    "path": "midi/queen-bohemian-rhapsody.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "rdr2-ost-american-venom",
    "title": "RDR2 OST   American Venom",
    "artist": "Various Artists",
    "path": "midi/rdr2-ost-american-venom.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "2010s",
    "genre": "pop"
  },
  {
    "id": "radiohead-creep",
    "title": "Radiohead   Creep",
    "artist": "Various Artists",
    "path": "midi/radiohead-creep.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "radiohead-no-surprises",
    "title": "Radiohead   No Surprises",
    "artist": "Various Artists",
    "path": "midi/radiohead-no-surprises.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "red-hot-chili-peppers-californication",
    "title": "Red Hot Chili Peppers   Californication",
    "artist": "Various Artists",
    "path": "midi/red-hot-chili-peppers-californication.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "smash-mouth-all-star",
    "title": "SMASH MOUTH.All Star",
    "artist": "Various Artists",
    "path": "midi/smash-mouth-all-star.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "scar-tissue-red-hot-chili-peppers",
    "title": "Scar Tissue   Red Hot Chili Peppers",
    "artist": "Various Artists",
    "path": "midi/scar-tissue-red-hot-chili-peppers.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "scorpions-rock-you-like-a-hurricane",
    "title": "Scorpions   Rock You Like A Hurricane",
    "artist": "Various Artists",
    "path": "midi/scorpions-rock-you-like-a-hurricane.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "smashing-pumpkins-1979",
    "title": "Smashing Pumpkins   1979",
    "artist": "Various Artists",
    "path": "midi/smashing-pumpkins-1979.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "90s",
    "genre": "pop"
  },
  {
    "id": "soundgarden-black-hole-sun",
    "title": "Soundgarden   Black Hole Sun",
    "artist": "Various Artists",
    "path": "midi/soundgarden-black-hole-sun.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "starships-nicki-minaj",
    "title": "Starships   Nicki Minaj",
    "artist": "Various Artists",
    "path": "midi/starships-nicki-minaj.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-love-me-do",
    "title": "THE BEATLES   Love Me Do",
    "artist": "Various Artists",
    "path": "midi/the-beatles-love-me-do.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-hey-jude",
    "title": "THE BEATLES.Hey Jude",
    "artist": "Various Artists",
    "path": "midi/the-beatles-hey-jude.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "toto-africa",
    "title": "TOTO.Africa",
    "artist": "Various Artists",
    "path": "midi/toto-africa.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "team-america-america",
    "title": "Team America   America",
    "artist": "Various Artists",
    "path": "midi/team-america-america.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "thanks-for-the-sabbath-school",
    "title": "Thanks For The Sabbath School",
    "artist": "Various Artists",
    "path": "midi/thanks-for-the-sabbath-school.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-because",
    "title": "The Beatles   Because",
    "artist": "Various Artists",
    "path": "midi/the-beatles-because.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-carry-that-weight",
    "title": "The Beatles   Carry That Weight",
    "artist": "1",
    "path": "midi/the-beatles-carry-that-weight.mid",
    "hint": "Famous 80s/90s pop/rock hit by 1",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-come-together",
    "title": "The Beatles   Come Together",
    "artist": "Various Artists",
    "path": "midi/the-beatles-come-together.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-golden-slumbers",
    "title": "The Beatles   Golden Slumbers",
    "artist": "Various Artists",
    "path": "midi/the-beatles-golden-slumbers.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-her-majesty",
    "title": "The Beatles   Her Majesty",
    "artist": "Various Artists",
    "path": "midi/the-beatles-her-majesty.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-here-comes-the-sun",
    "title": "The Beatles   Here Comes The Sun",
    "artist": "Various Artists",
    "path": "midi/the-beatles-here-comes-the-sun.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-i-want-you",
    "title": "The Beatles   I Want You",
    "artist": "Various Artists",
    "path": "midi/the-beatles-i-want-you.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-maxwell-s-silver-hammer",
    "title": "The Beatles   Maxwell's Silver Hammer",
    "artist": "Various Artists",
    "path": "midi/the-beatles-maxwell-s-silver-hammer.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-mean-mr-mustard",
    "title": "The Beatles   Mean Mr. Mustard",
    "artist": "Various Artists",
    "path": "midi/the-beatles-mean-mr-mustard.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-octopus-s-garden",
    "title": "The Beatles   Octopus's Garden",
    "artist": "Various Artists",
    "path": "midi/the-beatles-octopus-s-garden.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-oh-darling",
    "title": "The Beatles   Oh! Darling",
    "artist": "Various Artists",
    "path": "midi/the-beatles-oh-darling.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-old-brown-shoe",
    "title": "The Beatles   Old Brown Shoe",
    "artist": "Various Artists",
    "path": "midi/the-beatles-old-brown-shoe.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-polythene-pam",
    "title": "The Beatles   Polythene Pam",
    "artist": "Various Artists",
    "path": "midi/the-beatles-polythene-pam.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-she-came-in-through-the-bathroom-window",
    "title": "The Beatles   She Came In Through The Bathroom Window",
    "artist": "Various Artists",
    "path": "midi/the-beatles-she-came-in-through-the-bathroom-window.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-something",
    "title": "The Beatles   Something",
    "artist": "Various Artists",
    "path": "midi/the-beatles-something.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-strawberry-fields-forever",
    "title": "The Beatles   Strawberry Fields Forever",
    "artist": "Various Artists",
    "path": "midi/the-beatles-strawberry-fields-forever.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-sun-king",
    "title": "The Beatles   Sun King",
    "artist": "Various Artists",
    "path": "midi/the-beatles-sun-king.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-the-ballad-of-john-and-yoko",
    "title": "The Beatles   The Ballad Of John And Yoko",
    "artist": "Various Artists",
    "path": "midi/the-beatles-the-ballad-of-john-and-yoko.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-the-end",
    "title": "The Beatles   The End",
    "artist": "Various Artists",
    "path": "midi/the-beatles-the-end.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-beatles-you-never-give-me-your-money",
    "title": "The Beatles   You Never Give Me Your Money",
    "artist": "Various Artists",
    "path": "midi/the-beatles-you-never-give-me-your-money.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-chain-fleetwood-mac",
    "title": "The Chain   Fleetwood Mac",
    "artist": "Various Artists",
    "path": "midi/the-chain-fleetwood-mac.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-nights-avicii",
    "title": "The Nights   Avicii",
    "artist": "Various Artists",
    "path": "midi/the-nights-avicii.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-smashing-pumpkins-disarm-v4",
    "title": "The Smashing Pumpkins   Disarm V4",
    "artist": "Various Artists",
    "path": "midi/the-smashing-pumpkins-disarm-v4.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "the-smashing-pumpkins-zero",
    "title": "The Smashing Pumpkins ~ Zero",
    "artist": "Various Artists",
    "path": "midi/the-smashing-pumpkins-zero.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "van-halen-love-walks-in",
    "title": "Van Halen   Love Walks In",
    "artist": "Various Artists",
    "path": "midi/van-halen-love-walks-in.mid",
    "hint": "Famous 80s/90s pop/rock hit by Various Artists",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  },
  {
    "id": "waterloo-abba",
    "title": "Waterloo   ABBA",
    "artist": "Piano Cover",
    "path": "midi/waterloo-abba.mid",
    "hint": "Famous 80s/90s pop/rock hit by Piano Cover",
    "category": "pop",
    "decade": "80s",
    "genre": "pop"
  }
];
