import { useState } from "react";
import Accordion, { AccordionItem } from "./Accordian";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function InfoSideNav({ isOpen, toggleSideNav }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className={`fixed top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[30%] bg-black/95 backdrop-blur-sm z-30 
      shadow-2xl border-r border-white/10 p-4 text-white flex flex-col gap-4 overflow-y-auto
      transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Information</h2>
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-red-500 hover:text-red-400"
          onClick={toggleSideNav}
          aria-label="Close information panel"
        >
          <span className="text-lg">×</span>
        </button>
      </div>

      <div className="space-y-2">
        <Accordion value={selected} onChange={setSelected} className="space-y-2">
          <AccordionItem value="item1" trigger="HWO?">
            <p>
              NASA is advancing its search for life in the universe with plans
              for its next major astrophysics mission, expected to launch in the
              2040s. Known as the Habitable Worlds Observatory (HWO), this
              mission aims to find and study habitable planets beyond the solar
              system. Building on previous concepts (LUVOIR and HabEx), HWO will
              focus on directly imaging at least 25 potentially habitable planets
              and analyzing their atmospheres for biosignatures like oxygen and
              methane. The observatory will also offer groundbreaking capabilities
              for studying the universe with unmatched sensitivity, enhancing our
              understanding of galaxy evolution and cosmic structures.
            </p>
          </AccordionItem>
          <AccordionItem value="item2" trigger="SNR?">
            <p>
              SNR stands for Signal-to-Noise Ratio. It is a measure used in
              science and engineering to compare the level of a desired signal to
              the level of background noise. In the context of exoplanet
              detection, SNR helps determine how clearly a planet's signal can be
              detected against the noise coming from its host star and other
              background sources. A higher SNR indicates a clearer signal, making
              it easier to characterize the exoplanet. For exoplanet observations,
              an SNR greater than 5 is typically required to reliably detect and
              study the planet.
            </p>
            <img
              src="/images/accordion/snr.png"
              className="w-[60%] mx-auto"
              alt="SNR formula"
            />
            <ul className="text-xs text-start">
              <li>
                <strong>SNR:</strong> Signal-to-Noise Ratio (clarity of the
                exoplanet’s signal).
              </li>
              <li>
                <strong>
                  SNR<sub>0</sub>:
                </strong>{" "}
                Baseline signal-to-noise ratio (e.g., 100).
              </li>
              <li>
                <strong>
                  R<sub>*</sub>:
                </strong>{" "}
                Stellar radius (in solar radii,{" "}
                <em>
                  R<sub>☉</sub>
                </em>
                ).
              </li>
              <li>
                <strong>
                  R<sub>P</sub>:
                </strong>{" "}
                Planetary radius (in Earth radii,{" "}
                <em>
                  R<sub>⊕</sub>
                </em>
                ).
              </li>
              <li>
                <strong>D:</strong> Telescope diameter (in meters).
              </li>
              <li>
                <strong>ES:</strong> Distance to the planetary system (in
                parsecs).
              </li>
              <li>
                <strong>PS:</strong> Planet-star distance (in astronomical units,
                AU).
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem value="item3" trigger="SNR Detection Ranges?">
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
          </AccordionItem>
          <AccordionItem value="item4" trigger="Clean Data?">
            <p>
              In the NASA Exoplanet Archive, some exoplanet data may not be
              observed or may be missing. In this context, "clean data" refers to
              exoplanets that have the most comprehensive dataset available,
              allowing them to be effectively rendered in the app's 3D space.
            </p>
          </AccordionItem>
          <AccordionItem value="item5" trigger="Galaxy View?">
            <p>
              This view presents the entire galaxy in 3D. Due to performance
              considerations, only the black hole (Sagittarius A*), Earth, and
              exoplanets are rendered in this view. Users can rotate, zoom, and
              pan around the center of the galaxy, which is marked by the black
              hole.
            </p>
          </AccordionItem>
          <AccordionItem value="item6" trigger="HWO View?">
            <p>
              This view provides the perspective from the HWO Telescope, allowing
              users to only rotate and pan.
            </p>
          </AccordionItem>
          <AccordionItem value="item7" trigger="Start Spectral Types?">
            <ul>
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
          </AccordionItem>
          <AccordionItem value="item8" trigger="Start Luminosity Classes?">
            <ul>
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
          </AccordionItem>
          <AccordionItem
            value="item9"
            trigger="Habitable Zones VS Habitable Planets?"
          >
            <ul className="text-xs">
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
          </AccordionItem>
          <AccordionItem value="item10" trigger="How to Find the Habitable Zone?">
            <ul className="text-xs">
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
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
