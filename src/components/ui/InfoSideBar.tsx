import { useState } from "react";
import Accordion, { AccordionItem } from "./Accordian";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose } from "react-icons/io5";
import styles from './InfoSideBar.module.css';

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function InfoSideNav({ isOpen, toggleSideNav }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[30%] 
          bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F] z-30 
          shadow-2xl border-r border-purple-900/20 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-md bg-[#0A0A0F]/90 px-6 py-4 border-b border-purple-900/20">
          <div className="flex justify-between items-center mb-4">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            >
              Information
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-purple-900/10 hover:bg-purple-900/20 
                transition-colors duration-200 text-purple-400"
              onClick={toggleSideNav}
              aria-label="Close information panel"
            >
              <IoClose size={20} />
            </motion.button>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/5 border border-purple-900/20 rounded-xl 
                text-purple-200 placeholder-purple-300/30 focus:outline-none focus:border-purple-900/40
                focus:ring-2 focus:ring-purple-900/10 transition-all duration-200"
            />
            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400/50" size={18} />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 ${styles.customScrollbar}`}>
          <Accordion value={selected} onChange={setSelected} className="space-y-3">
            <AccordionItem 
              value="item1" 
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                    border border-purple-900/20 hover:border-purple-900/30 
                    transition-all duration-200 text-purple-200 font-medium"
                >
                  What is HWO?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <p className="leading-relaxed">
                  NASA is advancing its search for life in the universe with plans
                  for its next major astrophysics mission, expected to launch in the
                  2040s. Known as the Habitable Worlds Observatory (HWO), this
                  mission aims to find and study habitable planets beyond the solar
                  system.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-purple-400"></span>
                    <span>Direct imaging of at least 25 potentially habitable planets</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-purple-400"></span>
                    <span>Analysis of atmospheres for biosignatures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-purple-400"></span>
                    <span>Enhanced understanding of galaxy evolution</span>
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>

            <AccordionItem value="item2" trigger={
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
              >
                Signal-to-Noise Ratio (SNR)
              </motion.div>
            }>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20"
              >
                <p className="text-purple-200/90 leading-relaxed mb-4">
                  SNR is a measure used to compare the level of a desired signal to background noise. 
                  In exoplanet detection, it determines how clearly a planet's signal can be detected 
                  against its host star and other sources.
                </p>
                <img
                  src="/images/accordion/snr.png"
                  className="w-[60%] mx-auto rounded-lg border border-purple-900/20 mb-4"
                  alt="SNR formula"
                />
                <div className="space-y-2 text-sm text-purple-200/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>SNR &lt; 3: Unreliable detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>SNR 3-5: Marginal detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>SNR &gt; 5: Confident detection</span>
                  </div>
                </div>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item3"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  SNR Detection Ranges?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <ul className="text-justify">
                  <li className="nowrap">
                    <strong className="text-red-900">SNR &lt; 3:</strong> Unreliable
                    detection, indistinguishable from noise.
                  </li>
                  <li>
                    <strong className="text-red-600">SNR 3 to 5:</strong> Marginal
                    detection, might need follow-up to confirm.
                  </li>
                  <li>
                    <strong className="text-orange-400">SNR 5 to 10:</strong> Minimum
                    threshold for confident detection.
                  </li>
                  <li>
                    <strong className="text-yellow-400">SNR 10 to 20:</strong> Clear
                    detection with good confidence.
                  </li>
                  <li>
                    <strong className="text-green-900">SNR 20 to 50:</strong>{" "}
                    High-confidence detection, enabling precise measurements.
                  </li>
                  <li>
                    <strong className="text-green-500">SNR &gt;= 50:</strong> Very
                    strong detection, suitable for detailed analysis.
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item4"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  Clean Data?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <p className="leading-relaxed">
                  In the NASA Exoplanet Archive, some exoplanet data may not be
                  observed or may be missing. In this context, "clean data" refers to
                  exoplanets that have the most comprehensive dataset available,
                  allowing them to be effectively rendered in the app's 3D space.
                </p>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item5"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  Galaxy View?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <p className="leading-relaxed">
                  This view presents the entire galaxy in 3D. Due to performance
                  considerations, only the black hole (Sagittarius A*), Earth, and
                  exoplanets are rendered in this view. Users can rotate, zoom, and
                  pan around the center of the galaxy, which is marked by the black
                  hole.
                </p>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item6"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  HWO View?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <p className="leading-relaxed">
                  This view provides the perspective from the HWO Telescope, allowing
                  users to only rotate and pan.
                </p>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item7"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  Start Spectral Types?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <ul className="text-white/90 leading-relaxed list-disc pl-5 space-y-1">
                  <li>
                    <strong>O</strong>: Extremely hot, blue stars, short-lived,
                    massive.
                  </li>
                  <li>
                    <strong>B</strong>: Blue-white, still very hot and massive,
                    luminous.
                  </li>
                  <li>
                    <strong>A</strong>: White, prominent hydrogen lines, hot but less
                    massive.
                  </li>
                  <li>
                    <strong>F</strong>: Yellow-white, moderate temperature, can host
                    planets.
                  </li>
                  <li>
                    <strong>G</strong>: Yellow, like the Sun, habitable zone
                    potential.
                  </li>
                  <li>
                    <strong>K</strong>: Orange, cooler than the Sun, long-lived.
                  </li>
                  <li>
                    <strong>M</strong>: Red dwarfs, cool, small, very long lifespans.
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item8"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  Start Luminosity Classes?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <ul className="text-white/90 leading-relaxed list-disc pl-5 space-y-1">
                  <li>
                    <strong>I</strong>: Supergiants (massive, evolved stars)
                  </li>
                  <li>
                    <strong>II</strong>: Bright giants
                  </li>
                  <li>
                    <strong>III</strong>: Giants (evolved stars)
                  </li>
                  <li>
                    <strong>IV</strong>: Subgiants (intermediate stage)
                  </li>
                  <li>
                    <strong>V</strong>: Main-sequence stars (like the Sun)
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item9"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  Habitable Zones VS Habitable Planets?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <ul className="text-white/90 leading-relaxed list-disc pl-5 space-y-1">
                  <li className="mb-1">
                    <strong>Habitable Zone</strong> refers to the region around a
                    star where conditions might allow for liquid water to exist on a
                    planet’s surface, which is considered a key requirement for life.
                    The exact location of the habitable zone depends on the star’s
                    temperature and size. Hotter, larger stars have their habitable
                    zones farther out, while cooler, smaller stars have zones closer
                    in. However, just being in the habitable zone doesn’t guarantee
                    that a planet is habitable—it only means that the temperature
                    might be right for water to remain liquid.
                  </li>
                  <li>
                    <strong>Habitable Planets</strong> are planets that meet a
                    broader set of criteria that could support life. In addition to
                    being located within the habitable zone, these planets need
                    other favorable conditions, such as a stable atmosphere, suitable
                    gravity, the presence of water, the right chemical composition,
                    and protection from harmful radiation (e.g., via a magnetic
                    field). While being in the habitable zone is important, planets
                    need a combination of many factors to truly be considered
                    habitable, including surface temperature, atmospheric composition,
                    and more.
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>
            <AccordionItem
              value="item10"
              trigger={
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 rounded-xl bg-purple-900/5 hover:bg-purple-900/10 
                  border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-200 text-purple-200 font-medium"
                >
                  How to Find the Habitable Zone?
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 mt-2 rounded-xl bg-purple-900/5 border border-purple-900/20 text-purple-200/90"
              >
                <ul className="text-white/90 leading-relaxed list-disc pl-5 space-y-1">
                  <li>
                    {" "}
                    <strong>1.Stellar Luminosity Calculation:</strong>{" "}
                  </li>
                  <li className="mb-1">
                    To calculate the luminosity of a star, you use the
                    Stefan-Boltzmann Law, which relates a star's temperature and
                    radius to its luminosity:
                    <img
                      src="/images/accordion/st_lum_calc.png"
                      className="w-[60%] mx-auto mt-1"
                      alt="stellar luminosity formula"
                    />
                  </li>
                  <li>
                    <strong>L</strong>: Luminosity of the star
                  </li>
                  <li>
                    <strong>R</strong>: Radius of the star
                  </li>
                  <li>
                    <strong>T</strong>: Surface temperature of the star
                  </li>
                  <li>
                    <strong>σ</strong>: Stefan-Boltzmann constant (5.67×10
                    <sup>−8</sup> W m<sup>−2</sup> K<sup>−4</sup>)
                  </li>
                  <li className="mt-2">
                    {" "}
                    <strong>2.Calculate The Habitable Zone Boundaries</strong>{" "}
                  </li>
                  <li>
                    The habitable zone boundaries are commonly calculated using
                    empirical formulae derived from stellar luminosity and
                    temperature.
                    <img
                      src="/images/accordion/DinnerDouter.png"
                      className="w-[60%] mx-auto mt-1"
                      alt="Inner and outer habitable zone formula"
                    />
                  </li>
                  <li>
                    <strong>
                      d<sub>inner</sub>
                    </strong>
                    : Distance of the inner edge of the habitable zone (in AU)
                  </li>
                  <li>
                    <strong>
                      d<sub>outer</sub>
                    </strong>
                    : Distance of the outer edge of the habitable zone (in AU)
                  </li>
                  <li>
                    <strong>L</strong>: Luminosity of the star
                    <strong>
                      L<sub>⊙</sub>
                    </strong>
                    )
                  </li>
                  <li>
                    <strong>
                      L<sub>⊙</sub>
                    </strong>
                    : Solar luminosity (3.828×10
                    <sup>26</sup>W)
                  </li>
                  <li className="mt-2">
                    {" "}
                    <strong>
                      3.Check the ExoPlanet is Orbiting Within the Habitable Zone{" "}
                    </strong>{" "}
                  </li>
                  <li>
                    <img
                      src="/images/accordion/hzrange_calc.png"
                      className="w-[90%] mx-auto my-1"
                      alt="habitable zone formula"
                    />
                  </li>
                </ul>
              </motion.div>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer Gradient */}
        <div className="h-6 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />
      </motion.div>

    </AnimatePresence>
  );
}
