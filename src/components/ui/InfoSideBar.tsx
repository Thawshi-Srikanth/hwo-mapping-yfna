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
      className={`absolute top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[20%] bg-black bg-opacity-55 z-20 p-2
         text-white flex flex-col gap-3 overflow-y-scroll transform transition-transform duration-300 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
    >
      <div className="flex flex-row justify-end">
        <div
          className="cursor-pointer text-lg p-2 bg-black text-red-500 hover:text-red-800"
          onClick={toggleSideNav}
        >
          X
        </div>
      </div>
      <Accordion value={selected} onChange={setSelected}>
        <AccordionItem value="item1" trigger="HWO?">
          <p>
            NASA is advancing its search for life in the universe with plans for
            its next major astrophysics mission, expected to launch in the
            2040s. Known as the Habitable Worlds Observatory (HWO), this mission
            aims to find and study habitable planets beyond the solar system.
            Building on previous concepts (LUVOIR and HabEx), HWO will focus on
            directly imaging at least 25 potentially habitable planets and
            analyzing their atmospheres for biosignatures like oxygen and
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
  );
}
