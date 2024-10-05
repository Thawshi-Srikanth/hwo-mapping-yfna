type ExoPlanetType = {
  objectid: number; //primary key
  pl_name: string; //name of the planet
  hostname: string; //name of the star
  pl_letter: string; //letter of the planet
  sy_snum: number; //number of stars
  sy_pnum: number; //number of planets
  sy_mnum: number; //number of moons
  discoverymethod: string;
  disc_year: number; //year of discovery
  disc_telescope: string; //name of the telescope
  disc_instrument: string; //name of the instrument
  st_rad: number; //stellar Radius [Solar Radius]
  pl_orbper: number; //Orbital Period [days]
  pl_rade: number; //Planet Radius [Earth Radius]
  pl_radeerr1: number; //Planet Radius Upper Unc. [Earth Radius]
  pl_radeerr2: number; //Planet Radius Lower Unc. [Earth Radius]
  pl_radelim: number; //Planet Radius Limit Flag
  pl_bmasser: number; //Planet Mass  or Mass*sin(i) [Earth Mass]
  pl_denser: number; //Planet Density [g/cm^3]
  rastring: number; //Right Ascension [sexagesimal]
  ra: number; //Right Ascension [decimal]
  decstr: number; //Declination [sexagesimal]
  dec: number; //Declination [decimal]
  sy_dist: number; //Distance [parsecs]
  pl_orbsmax: number; //Semi-Major Axis [AU]
  sy_plx: number; //Parallax [mas]
  sy_bmag: number; //B (Johnson) Magnitude
  st_spectype: string; //Spectral Type
} & Record<string, unknown>;

export default ExoPlanetType;
