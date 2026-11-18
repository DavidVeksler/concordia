# Space data centers: source ledger

Fact check for the public page "Why build data centers in space". Every figure the page prints must trace to a row here. Access date for every row: 2026-11-14 (SD45 to SD48: 2026-11-15).

Status key:

- **VERIFIED-PRIMARY**: value read on the primary source (agency report, filing, paper, company document).
- **VERIFIED-SECONDARY**: value read on credible reporting or a mirror of the primary; the primary itself was paywalled, unreadable or not located.
- **CORRECTED**: the claimed value is wrong or mis-framed; print the corrected value given.
- **UNVERIFIED**: no source found; do not print as fact.
- **CUT**: drop from the page.

Derived numbers (arithmetic on sourced inputs) are marked "derived" in the note and show the inputs.

## Summary

| ID | Figure | Status |
| --- | --- | --- |
| SD1 | Data centers 415 TWh in 2024, about 1.5% of world electricity | VERIFIED-PRIMARY |
| SD2 | About 945 TWh by 2030 (IEA Base Case), just under 3% | VERIFIED-PRIMARY |
| SD3 | Data center electricity grew 12%/yr over the last five years | VERIFIED-PRIMARY |
| SD4 | Accelerated servers about 30%/yr | CORRECTED (projection, not history) |
| SD5 | US data centers about 180 TWh in 2024, more than 4% of US use | VERIFIED-PRIMARY |
| SD6 | LBNL: 176 TWh in 2023, 4.4% | VERIFIED-PRIMARY |
| SD7 | Solar constant 1,361 W/m2 (1360.8 +/- 0.5) | VERIFIED-PRIMARY |
| SD8 | Sunlight intercepted by Earth about 173,000 TW | VERIFIED-PRIMARY (derived) |
| SD9 | Earth land area about 1.49 x 10^8 km2; surface 5.10 x 10^14 m2 | VERIFIED-SECONDARY |
| SD10 | Utility solar averages about 40 W per m2 of land | CORRECTED (about 11 to 13 W/m2) |
| SD11 | 1% of land in solar gives about 60 TW | CORRECTED (about 17 to 19 TW) |
| SD12 | 1 W/m2 of global waste-heat forcing needs about 510 TW | VERIFIED-PRIMARY (derived) |
| SD13 | Starcloud-1 flew an Nvidia H100 in November 2025 | VERIFIED-SECONDARY |
| SD14 | Starcloud was formerly Lumen Orbit | VERIFIED-SECONDARY |
| SD15 | Starcloud FCC filing for up to 88,000 satellites | VERIFIED-PRIMARY |
| SD16 | SpaceX FCC filing 2026-01-30, up to one million satellites | VERIFIED-PRIMARY |
| SD17 | SpaceX: about 100 kW per tonne | VERIFIED-SECONDARY (reword) |
| SD18 | Suncatcher: two prototypes with Planet by early 2027 | VERIFIED-PRIMARY |
| SD19 | Suncatcher: panels up to 8x as productive as on the ground | VERIFIED-PRIMARY (reword) |
| SD20 | Suncatcher: Trillium TPU radiation results | VERIFIED-PRIMARY |
| SD21 | Suncatcher: launch below about $200/kg by the mid-2030s | VERIFIED-PRIMARY |
| SD22 | McCalip: 1 GW orbital about $42.4B vs about $15.9B ground | CORRECTED |
| SD23 | McCalip interactive cost model URL | VERIFIED-PRIMARY |
| SD24 | McCalip "of Varda" | VERIFIED-SECONDARY (say "formerly of Varda" or omit) |
| SD25 | Falcon 9 about $2,700/kg | CORRECTED |
| SD26 | Ground data center about $11M per MW excluding chips | CORRECTED ($17.6M) |
| SD27 | DGX H100: 130 kg, 10.2 kW max | VERIFIED-PRIMARY |
| SD28 | Flight radiators about 5 kg/m2 at the optimistic end | VERIFIED-SECONDARY |
| SD29 | ISS-class radiators about 15 kg/m2 | VERIFIED-PRIMARY (derived) |
| SD30 | ISS radiators reject about 130 to 200 W/m2 | CORRECTED |
| SD31 | About 30 t per MW for a near-term orbital design (Varma) | VERIFIED-PRIMARY |
| SD32 | AI accelerators about $35/W | VERIFIED-SECONDARY (reword) |
| SD33 | AI data center about $50B per GW all-in | VERIFIED-SECONDARY (print $50B to $60B) |
| SD34 | Space solar arrays about 100 W/kg today | VERIFIED-PRIMARY |
| SD35 | Starship target $100 to 200/kg | VERIFIED-SECONDARY (aspirational) |
| SD36 | Data center PPAs $0.03 to 0.06/kWh | CORRECTED |
| SD37 | Grid interconnection waits of 7 to 12 years in some markets | CORRECTED |
| SD38 | Earth-Moon 384,400 km, 1.28 s one way | VERIFIED-PRIMARY |
| SD39 | GEO 35,786 km, about 0.24 s up and down | VERIFIED-PRIMARY |
| SD40 | Chip life halves per 10 K of junction temperature | VERIFIED-SECONDARY (rule of thumb; give Arrhenius form) |
| SD41 | H100 junction temperature rating | VERIFIED-SECONDARY |
| SD42 | SiC power devices rated to 175 C junction | VERIFIED-PRIMARY |
| SD43 | GaN operating range | UNVERIFIED |
| SD44 | Published TID/SEE results for the H100 on Starcloud-1 | UNVERIFIED (none published) |
| SD45 | ML GPU energy efficiency doubles about every 3.0 years | VERIFIED-SECONDARY |
| SD46 | Permanent GPU failures about 6 % a year (Llama 3 run) | VERIFIED-SECONDARY (derived) |
| SD47 | H100 residual value 11 to 19 % of list in 2027 (conservative) | VERIFIED-SECONDARY (vendor appraisal) |
| SD48 | Hyperscaler server lives 5 to 6 years | VERIFIED-SECONDARY |

## Demand and energy

### SD1. Global data center electricity, 2024

- **Print:** Data centers used about 415 TWh in 2024, about 1.5% of the world's electricity.
- **Value found:** "around 415 terawatt hours (TWh), or about 1.5% of global electricity consumption in 2024".
- **Source:** IEA, *Energy and AI*, chapter "Energy demand from AI". https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
- **Publisher, date:** International Energy Agency, 2025 (report released April 2025; citation reads "IEA (2025), Energy and AI, IEA, Paris").
- **Status:** VERIFIED-PRIMARY.

### SD2. Global data center electricity, 2030

- **Print:** In the IEA Base Case, about 945 TWh by 2030, just under 3% of world electricity.
- **Value found:** "reach around 945 TWh by 2030 in the Base Case", "representing just under 3% of total global electricity consumption in 2030".
- **Source:** same as SD1.
- **Status:** VERIFIED-PRIMARY.

### SD3. Historical growth rate

- **Print:** Data center electricity use grew about 12% a year over the five years to 2024.
- **Value found:** "It has grown at 12% per year over the last five years."
- **Source:** same as SD1.
- **Status:** VERIFIED-PRIMARY.

### SD4. Accelerated servers

- **Claimed:** accelerated servers about 30%/yr.
- **Value found:** electricity use of accelerated servers "is projected to grow by 30% annually in the Base Case" (to 2030).
- **Source:** same as SD1.
- **Status:** CORRECTED. Print: "The IEA projects electricity use by accelerated (AI) servers to grow about 30% a year to 2030." It is a forward projection, not a past rate.

### SD5. US data centers, 2024

- **Print:** US data centers used about 180 TWh in 2024, more than 4% of US electricity.
- **Value found:** IEA *Electricity Mid-Year Update 2025*: US data centres "consumed around 180 TWh of electricity in 2024, according to the IEA's Energy and AI report". The "more than 4% of US electricity consumption from all sources" wording appears in a published extract of *Energy and AI* (reglobal.org); the IEA web chapter read here gives no share.
- **Sources:** IEA, *Electricity Mid-Year Update 2025*, demand chapter. https://www.iea.org/reports/electricity-mid-year-update-2025/demand-global-electricity-use-to-grow-strongly-in-2025-and-2026 . Extract: https://reglobal.org/energy-for-ai-iea/
- **Publisher, date:** IEA, July 2025.
- **Status:** VERIFIED-PRIMARY for 180 TWh; share VERIFIED-SECONDARY. Cross-check: 180 TWh against LBNL's 4.4% for 176 TWh in 2023 (SD6) is consistent.

### SD6. LBNL figure (the other US number)

- **Print (if used):** LBNL estimated 176 TWh for 2023, about 4.4% of US electricity, rising to 325 to 580 TWh (6.7% to 12%) by 2028.
- **Value found:** "data centers consumed about 4.4% of total U.S. electricity in 2023"; 176 TWh; "approximately 6.7 to 12% of total U.S. electricity by 2028".
- **Source:** US DOE, "DOE Releases New Report Evaluating Increase in Electricity Demand from Data Centers" (announcing LBNL, *2024 United States Data Center Energy Usage Report*, Shehabi et al.). https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers
- **Publisher, date:** US Department of Energy / Lawrence Berkeley National Laboratory, 2024-12-20.
- **Status:** VERIFIED-PRIMARY. Note: 176 TWh is LBNL's 2023 value; 180 TWh is IEA's 2024 value. Do not mix the two years in one sentence.

### SD7. Solar constant

- **Print:** Sunlight above the atmosphere delivers about 1,361 W/m2.
- **Value found:** total solar irradiance at the 2008 solar minimum "1360.8 +/- 0.5 W m-2" (SORCE/TIM), lower than the older 1365.4 canonical value.
- **Source:** Kopp, G. and J. Lean, "A new, lower value of total solar irradiance: Evidence and climate significance", *Geophys. Res. Lett.* 38, L01706, doi:10.1029/2010GL045777. NASA ESPO record: https://espo.nasa.gov/node/30086
- **Date:** January 2011.
- **Status:** VERIFIED-PRIMARY.

### SD8. Sunlight intercepted by Earth

- **Print:** Earth intercepts about 173,000 TW of sunlight.
- **Value found (derived):** 1,361 W/m2 x pi x (6,371 km)^2 = 1,361 x 1.275 x 10^14 m2 = 1.736 x 10^17 W = about 173,500 TW.
- **Sources:** SD7 for the irradiance; Earth mean radius 6,371 km (standard value).
- **Status:** VERIFIED-PRIMARY (derived).

### SD9. Earth land and surface area

- **Print:** Earth's land area is about 149 million km2; its whole surface about 510 million km2 (5.10 x 10^14 m2).
- **Value found:** World area: total "510.072 million sq km", land "148.94 million sq km", water "361.132 million sq km".
- **Source:** CIA, *The World Factbook*, field "Area" (mirror). https://start.csail.mit.edu/mirror/cia.gov/library/publications/the-world-factbook/fields/2147.html . The live cia.gov country page now carries a 2026-02-04 notice that the Factbook has been sunset.
- **Publisher:** US Central Intelligence Agency (mirror hosted by MIT CSAIL).
- **Status:** VERIFIED-SECONDARY (mirror of the primary).

### SD10. Average solar output per m2 of land

- **Claimed:** about 40 W/m2 average output.
- **Value found:** median US utility-scale PV energy density for plants built in 2019: "447 MWh/acre (2.2 acres/GWh) for fixed-tilt and 394 MWh/acre (2.5 acres/GWh) for tracking". Power density 0.35 MWdc/acre (fixed) and 0.24 MWdc/acre (tracking). Acreage is the polygon around the arrays; in the paper's example the array is 69% of the whole site.
- **Derived:** 447 MWh/yr per acre = 447e6 Wh / 8,766 h / 4,047 m2 = 12.6 W/m2 (fixed tilt); 394 MWh gives 11.1 W/m2 (tracking). Over the whole fenced site, roughly 8 to 9 W/m2.
- **Source:** Bolinger, M. and G. Bolinger, "Land Requirements for Utility-Scale PV: An Empirical Update on Power and Energy Density", *IEEE Journal of Photovoltaics* (2022), doi:10.1109/JPHOTOV.2021.3136805; LBNL summary deck. https://emp.lbl.gov/sites/default/files/emp-files/land_requirements_for_utility-scale_pv.pdf
- **Publisher, date:** Lawrence Berkeley National Laboratory, 2022-02-01.
- **Status:** CORRECTED. Print about 11 to 13 W per m2 of array land (US 2019 medians). 40 W/m2 is roughly the mean output per m2 of panel (about 20% of about 200 W/m2 mean insolation), not per m2 of land.

### SD11. "1% of land in solar"

- **Claimed:** 1% of land at about 40 W/m2 gives about 60 TW.
- **Derived with SD9 and SD10:** 1% of 1.4894 x 10^14 m2 = 1.49 x 10^12 m2; x 11.1 to 12.6 W/m2 = 16.5 to 18.8 TW. At 40 W/m2 it would be 59.6 TW.
- **Status:** CORRECTED. Print "about 17 to 19 TW of average output" (or "about 18 TW"). If the page wants a 60 TW scenario it needs about 3.3% of land at today's densities.

### SD12. Waste-heat forcing

- **Claimed:** 1 W/m2 of global forcing needs about 510 TW.
- **Check:** 1 W/m2 x 5.10 x 10^14 m2 (SD9) = 510 TW. Correct.
- **Comparison source:** Flanner (2009): "Averaged globally, this forcing is only +0.028 W m-2, but over the continental United States and western Europe, it is +0.39 and +0.68 W m-2, respectively." Continental-scale warming of 0.4 to 0.9 C appeared in one 2100 scenario, "but not by current or 2040 estimates". 0.028 W/m2 x 5.1 x 10^14 m2 = about 14 TW, consistent with world primary energy use at the time.
- **Source:** Flanner, M. G., "Integrating anthropogenic heat flux with global climate models", *Geophys. Res. Lett.* 36, L02801, doi:10.1029/2008GL036465 (published 2009-01-16). UCAR/NCAR library record with abstract: https://ckanprod.data-commons.k8s.ucar.edu/dataset/251dce25-af33-4e20-9325-e0b49d30e840
- **Status:** VERIFIED-PRIMARY (arithmetic and abstract). The AGU page returned 403; the abstract was read on the NCAR library record.

## Orbital state of play

### SD13. Starcloud-1

- **Print:** Starcloud-1, a 60 kg satellite carrying an Nvidia H100, launched on 2025-11-02 on SpaceX's Bandwagon-4 rideshare.
- **Value found:** "The 60 kg (132 lb) Starcloud-1 satellite"; liftoff "1:09:59 a.m. EDT (0509:59 UTC)" from Cape Canaveral SLC-40; Nvidia called it "the first time a state-of-the-art, data center-class GPU is in outer space".
- **Source:** Spaceflight Now, "Live coverage: Commercial space station demo, data center precursor to launch on SpaceX Bandwagon mission". https://spaceflightnow.com/2025/11/01/live-coverage-commercial-space-station-demo-data-center-precursor-to-launch-on-spacex-bandwagon-mission
- **Date:** 2025-11-01/02.
- **Status:** VERIFIED-SECONDARY. No Starcloud or Nvidia press release was located. Later reports (CNBC 2025-12-10, via secondary copies) say the H100 trained a small nanoGPT model in orbit; those are company claims.

### SD14. Former name

- **Print:** Starcloud (formerly Lumen Orbit).
- **Value found:** rebrand from Lumen Orbit to Starcloud reported with a $10M seed extension.
- **Sources:** DatacenterDynamics, "Lumen Orbit rebrands to Starcloud, raises another $10m for in-orbit data centers" https://datacenterdynamics.com/en/news/lumen-orbit-rebrands-to-starcloud-raises-another-10m-for-in-orbit-data-centers ; GeekWire https://www.geekwire.com/2025/lumen-orbit-starcloud-10m-space-data-centers/
- **Date:** February to March 2025 (sources differ).
- **Status:** VERIFIED-SECONDARY (from search results; articles not opened).

### SD15. Starcloud FCC application

- **Print:** Starcloud has applied to the FCC for up to 88,000 satellites in sun-synchronous orbit between 600 and 850 km. It is an application, not an approval.
- **Value found:** "a constellation of up to 88,000 satellites", "at altitudes between 600 km and 850 km"; File No. SAT-LOA-20260202-00073, call sign S00803; date filed 2026-02-04; accepted for filing in Report No. SAT-01982.
- **Source:** FCC Space Bureau, Public Notice "Applications Accepted for Filing", Report No. SAT-01982. https://docs.fcc.gov/public/attachments/DOC-419509A1.txt
- **Publisher, date:** Federal Communications Commission, 2026-03-13.
- **Status:** VERIFIED-PRIMARY.

### SD16. SpaceX FCC application

- **Print:** On 2026-01-30 SpaceX applied to the FCC for an orbital data center system of up to one million satellites at 500 to 2,000 km.
- **Value found:** "SPACE BUREAU ACCEPTS FOR FILING SPACEX'S APPLICATION FOR ORBITAL DATA CENTERS"; applicant Space Exploration Holdings, LLC; ICFS File No. SAT-LOA-20260108-00016 (Call Sign S00798), "filed Jan. 30, 2026"; "up to one million satellites"; altitudes 500 km to 2,000 km; comments due 2026-03-06.
- **Source:** FCC Public Notice DA 26-113. https://docs.fcc.gov/public/attachments/DA-26-113A1.txt (PDF: https://docs.fcc.gov/public/attachments/DA-26-113A1.pdf)
- **Publisher, date:** FCC, released 2026-02-04.
- **Status:** VERIFIED-PRIMARY. The file number is SAT-LOA-20260108-00016 (the ICFS record was opened 2026-01-08); the filing date is 2026-01-30.

### SD17. SpaceX "100 kW per tonne"

- **Claimed:** about 100 kW of compute per tonne.
- **Value found:** The Register, reporting the filing: the system "could deliver on the order of 100 kW of power per metric ton allocated to computing". Musk's posts use the same figure (100 kW/ton; a million tons a year giving 100 GW a year), per secondary reports.
- **Source:** The Register, "SpaceX wants to fill Earth orbit with a million datacenter satellites". https://www.theregister.com/2026/02/05/spacex_1m_satellite_datacenter/
- **Date:** 2026-02-05.
- **Status:** VERIFIED-SECONDARY. The filing narrative itself was not read. Print it as SpaceX's own claim: "SpaceX says the system could deliver on the order of 100 kW of power per tonne allocated to computing."

### SD18. Suncatcher prototypes

- **Print:** Google's Project Suncatcher plans a learning mission with Planet: two prototype satellites by early 2027.
- **Value found:** a learning mission with Planet "slated to launch two prototype satellites by early 2027".
- **Source:** Travis Beals, "Exploring a space-based, scalable AI infrastructure system design", Google Research blog. https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/
- **Publisher, date:** Google Research, 2025-11-04.
- **Status:** VERIFIED-PRIMARY. Secondary reports name Transporter-18 as the first ride; not checked.

### SD19. Orbit productivity

- **Claimed:** panels in dawn-dusk sun-synchronous orbit up to 8x as productive as on the ground.
- **Value found:** blog: in the right orbit a panel can be "up to 8 times more productive than on earth". Paper: up to 8x more solar energy per year than a mid-latitude panel on Earth, stated as a general figure for near-continuous-sun orbits; the design itself uses a dawn-dusk sun-synchronous orbit at 650 km mean altitude.
- **Sources:** SD18; Aguera y Arcas, Beals, Biggs, Bloom, Fischbacher, Gromov, Koster, Pravahan, Manyika, "Towards a future space-based, highly scalable AI infrastructure system design", arXiv:2511.19468v1. https://arxiv.org/html/2511.19468v1
- **Date:** blog 2025-11-04; preprint submitted 2025-11-22.
- **Status:** VERIFIED-PRIMARY. Print "up to 8 times the energy of a panel at mid-latitudes on Earth", attributed to Google.

### SD20. TPU radiation testing (also answers item 23 for Suncatcher)

- **Print:** Google put a Trillium (v6e) TPU in a 67 MeV proton beam. The HBM memory showed irregularities after 2 krad(Si); no hard failures up to 15 krad(Si), the maximum tested, against an expected 750 rad(Si) over five years behind about 10 mm aluminum-equivalent shielding.
- **Value found (paper):** 67 MeV protons, UC Davis Crocker Nuclear Laboratory; HBM irregularities "after a cumulative dose of 2 krad(Si)"; no hard TID failures up to "15 krad(Si) on a single chip"; about 150 rad(Si)/yr behind about 10 mm Al-equivalent, so about 750 rad(Si) over 5 years. Single-event rates: HBM uncorrectable ECC about 1 per 50 rad (inference estimate); core logic and SRAM about 150 rad per event; system crashes (SEFI) about once per 5 krad per chip; silent data corruption about 1 per 10^7 rad in one run.
- **Sources:** SD19 paper; SD18 blog.
- **Status:** VERIFIED-PRIMARY. All results are ground beam tests, not on-orbit data.

### SD21. Launch price threshold

- **Print:** Google's learning-curve analysis suggests launch to LEO may fall below about $200/kg by the mid-2030s, where launch cost becomes roughly comparable to terrestrial data center energy cost per kW-year.
- **Value found:** "may reach" <= $200/kg by the mid-2030s; learning rate about 20% per doubling of cumulative mass (18% to 24%); at $200/kg, about $810/kW/yr for a Starlink v2-type satellite (range $810 to $7,500 across satellite types) against US data center power spend of about $570 to $3,000/kW/yr.
- **Sources:** SD19 paper; SD18 blog.
- **Status:** VERIFIED-PRIMARY. It is a projection.

### SD22. McCalip cost comparison

- **Claimed:** 1 GW orbital about $42.4B vs about $15.9B on the ground.
- **Values found (three model versions):**
  - TechCrunch (2026-02-11): baseline 1 GW orbital "might cost $42.4 billion", "almost 3x its ground-bound equivalent"; no ground dollar figure given.
  - IEEE Spectrum (2026-02-26): about $51.1B orbital vs about $16B terrestrial, five years including launch and operations, about 4,300 satellites.
  - Live model read 2026-11-14 (default sliders): orbital $31.2B ($31.20/W) vs terrestrial $14.8B ($14.80/W, on-site gas), 5 years, about 37,000 satellites, $1,000/kg launch, GPUs excluded.
- **Sources:** https://techcrunch.com/2026/02/11/why-the-economics-of-orbital-ai-are-so-brutal ; https://spectrum.ieee.org/orbital-data-centers ; https://andrewmccalip.com/space-datacenters
- **Status:** CORRECTED. The $42.4B and $15.9B numbers come from different versions and never appeared as a pair in a source read here. Print the ratio with the version: "McCalip's model put a 1 GW orbital facility at roughly three times the cost of a ground one over five years (for example $51B vs $16B in the version IEEE Spectrum reported in February 2026)", or quote the live defaults with the access date. State that the model excludes GPUs.

### SD23. McCalip model URL

- **Value found:** "Economics of Orbital vs Terrestrial Data Centers", Andrew McCalip, interactive (time horizon 3 to 10 years, sliders, 1 to 100 GW per IEEE Spectrum). https://andrewmccalip.com/space-datacenters
- **Date:** not shown on the page; author says it is updated live.
- **Status:** VERIFIED-PRIMARY. The page's orbital line items ($9.0B + $22.2B + $3.1B + $1.0B = $35.3B) do not sum to its $31.2B headline as rendered; avoid quoting the breakdown.

### SD24. McCalip affiliation

- **Value found:** org-chart sites list him as Head of R&D at Varda Space Industries; a later post reports him leaving Varda for an entrepreneur-in-residence role at Paradigm. TechCrunch calls him "a space engineer" and does not mention Varda.
- **Sources:** https://theorg.com/org/varda/org-chart/andrew-mccalip (search result, not opened); TechCrunch as SD22.
- **Status:** VERIFIED-SECONDARY. Print "engineer Andrew McCalip, formerly head of R&D at Varda" only after a primary check, otherwise just "engineer Andrew McCalip".

## Mass and cost

### SD25. Falcon 9 price per kg

- **Claimed:** about $2,700/kg.
- **Values found:** NASA Ames (2018): "SpaceX's Falcon 9 now advertises a cost of $62 million to launch 22,800 kg to LEO, $2,720/kg" (list price, expendable maximum payload). TechCrunch 2026: "roughly $3,600/kg" today. SpaceX's capabilities sheet listed a $69.75M standard price (cited in search results; the PDF returned 404), which over 22,800 kg is about $3,060/kg; reusable missions carry less than 22,800 kg, so the real list price per kg is higher.
- **Sources:** Harry W. Jones, "The Recent Large Reduction in Space Launch Cost", NASA Ames, ICES-2018. https://ntrs.nasa.gov/citations/20200001093 (seen in search; quote from search extract). TechCrunch as SD22.
- **Status:** CORRECTED. Print "about $3,000/kg at list price, more like $3,600/kg on a reusable flight" or "$2,700/kg at the 2018 list price". $2,700/kg alone understates today's price.

### SD26. Ground data center build cost

- **Claimed:** about $11M per MW excluding chips.
- **Value found:** "All-in greenfield development costs in the United States and Canada average $17.6M per megawatt for the most modern facilities, excluding chips and GPUs"; up 21% per MW since the previous edition (Q4 2024). Secondary reports give a range of $8.9M to $23.3M per MW. Varma (SD31) uses $11.3M/MW for shell and core, up to $25M/MW with AI fit-out; that source for $11.3M was not located.
- **Source:** Cushman & Wakefield, press release "Cushman & Wakefield Releases 2026 Data Center Development Cost Guide, Citing 21% Rise in Per-MW Construction Costs". https://ir.cushmanwakefield.com/news/press-release-details/2026/Cushman--Wakefield-Releases-2026-Data-Center-Development-Cost-Guide-Citing-21-Rise-in-Per-MW-Construction-Costs/default.aspx ; guide: https://www.cushmanwakefield.com/en/united-states/insights/data-center-development-cost-guide
- **Date:** 2026 (press release page dated 2026-09-03; IREI coverage dated 2026-08-20).
- **Status:** CORRECTED. Print "about $17.6M per MW excluding chips (Cushman & Wakefield, 2026, US and Canada average)".

### SD27. DGX H100

- **Print:** An Nvidia DGX H100 (8 GPUs) weighs about 130 kg and draws up to 10.2 kW.
- **Value found:** system weight "287.6 lbs (130.45 kg) max"; system power usage "10.2 kW max"; power supplies "6 x 3.3 kW"; operating temperature "5 C to 30 C".
- **Source:** NVIDIA, *DGX H100/H200 User Guide*, "Introduction to NVIDIA DGX H100/H200 Systems". https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html
- **Status:** VERIFIED-PRIMARY. 10.2 kW is the system maximum (six 3.3 kW supplies in a 4+2 arrangement give 13.2 kW of supply capacity with redundancy).

### SD28. Optimistic flight radiator areal mass

- **Claimed:** about 5 kg/m2 at the optimistic end.
- **Values found:** Varma uses 5 kg/m2 two-sided and calls it an aggressive lightweight assumption (SD31). NASA Glenn: metal spacecraft radiators about 10 kg/m2; a carbon-carbon design estimated at 2.2 kg/m2 against a 2 kg/m2 goal.
- **Sources:** SD31; NASA Tech Briefs, "Lightweight Carbon-Carbon High-Temperature Space Radiator" (LEW-18210-1), Glenn Research Center. https://www.techbriefs.com/component/content/article/3156-lew-18210-1
- **Date:** NASA brief 2008-09-01.
- **Status:** VERIFIED-SECONDARY. 5 kg/m2 is a modeling assumption, not a flown system. Print "about 5 kg/m2, an aggressive assumption; carbon-carbon designs on paper reach about 2 kg/m2, metal radiators are about 10".

### SD29. ISS-class radiator areal mass

- **Print:** ISS radiators weigh about 14 to 17 kg per m2 of panel.
- **Value found:** EATCS radiator ORU: eight panels, "76.4 feet (23.3 meters) by 11.2 feet (3.4 meters)", "2,475 pounds (1,122.64 kilograms)". Photovoltaic radiator (PVR): "1,633 pounds (740.7 kilograms)", deployed "3.12 meters by 13.6 meters".
- **Derived:** EATCS 1,122.6 kg / 79.2 m2 = 14.2 kg/m2; PVR 740.7 kg / 42.4 m2 = 17.5 kg/m2 (planform area).
- **Source:** Boeing/NASA, "Active Thermal Control System (ATCS) Overview". https://www.nasa.gov/wp-content/uploads/2021/02/473486main_iss_atcs_overview.pdf
- **Date:** file modified 2006-11-21.
- **Status:** VERIFIED-PRIMARY (derived). "About 15 kg/m2" is fine.

### SD30. ISS radiator heat rejection per m2

- **Claimed:** about 130 to 200 W/m2.
- **Value found:** EATCS "35 kW of heat rejection per loop for a total capability of 70 kW", six radiator ORUs; each PVR "can reject up to 14 kW of heat into deep space", four PVRs.
- **Derived (planform area):** EATCS 70 kW / (6 x 79.2 m2) = 147 W/m2; PVR 14 kW / 42.4 m2 = 330 W/m2; whole US segment (70 + 4 x 14 = 126 kW over 645 m2) = 195 W/m2. Nanjangud reports the same 195 W/m2 overall (CA2).
- **Source:** SD29.
- **Status:** CORRECTED. Print "ISS radiators reject about 150 to 330 W per m2 of panel (about 200 averaged)". These run near room temperature; Spectrum (CA6) gives about 450 W/m2 for a hotter design radiator.

### SD31. Mass per MW (Varma)

- **Print:** Samir Varma's model puts a near-term orbital data center at about 30 t per MW in the best orbit (about 41 t/MW in a generic orbit). The model excludes chip purchase cost.
- **Value found:** about 30 t/MW best orbit, about 41 t/MW generic; radiator about 3.3 t/MW; compute about 12.8 t/MW (DGX H100 proxy); 150 W/kg solar; 5 kg/m2 radiator at 75 C; Falcon 9 about $2,700/kg.
- **Source:** Samir Varma, "Musk's Space Data Centers Are a Bet That Moore's Law Stays Slow". https://samirvarma.substack.com/p/musks-space-data-centers-are-a-bet
- **Date:** 2026-06-15.
- **Status:** VERIFIED-PRIMARY (author's own model). Cross-check: IEEE Spectrum's McCalip version, 4,300 satellites totaling 30 million kg for 1 GW, also gives about 30 t/MW.

### SD32. Accelerator cost per watt

- **Claimed:** AI accelerators about $35/W of IT power.
- **Value found:** Jensen Huang, Nvidia Q2 FY2026 earnings call (August 2025): one gigawatt costs "between $50 billion and $60 billion", of which about $35 billion is Nvidia chips and systems.
- **Source:** CNBC, "Nvidia plans to invest up to $100 billion in OpenAI as part of data center buildout". https://www.cnbc.com/2025/09/22/nvidia-openai-data-center.html ; transcript: https://www.alphaspread.com/security/nasdaq/nvda/earnings-calls/q2-2026 (search result).
- **Date:** call 2025-08-27; CNBC 2025-09-22.
- **Status:** VERIFIED-SECONDARY. The $35B is per GW of data center capacity and includes Nvidia networking and systems, so print "about $35 per watt of data center capacity goes to Nvidia hardware (Huang, 2025)". Secondary reports of the August 2026 call give about $40B per GW of Nvidia content for Vera Rubin; not verified.

### SD33. All-in cost per GW

- **Print:** An AI data center costs about $50 to 60 billion per gigawatt all-in (Huang, August 2025).
- **Source:** SD32.
- **Status:** VERIFIED-SECONDARY. Print the range, not "$50B".

### SD34. Space solar specific power

- **Print:** Flight roll-out solar arrays deliver roughly 70 to 125 W/kg at beginning of life.
- **Value found (Redwire ROSA table, BOL power / mass):** Diamond 3.3 kW / 36 kg (92 W/kg); Opal 5.3 kW / 42.7 kg (124); Sapphire 12.9 kW / 160 kg (81); Tanzanite 17.6 kW / 180 kg (98); SunStone 28 kW / 331 kg (85); Phenacite 37 kW / 521 kg (71). Redwire's marketing elsewhere states 100 to 120 W/kg (search result).
- **Source:** Redwire, "ROSA" product page. https://rdw.com/product-archive/power/rosa/
- **Status:** VERIFIED-PRIMARY (derived from the vendor table). "About 100 W/kg" is fair. Varma's 150 W/kg is labeled best-in-class; NASA-funded development targets of 225 to 500 W/kg are not flight hardware.

### SD35. Starship target price

- **Print:** SpaceX's long-run goal for Starship is on the order of $100 to $200 per kg; it has not yet been demonstrated.
- **Values found:** Musk, 2022-02-10: "I'm highly confident it would be less than $10 million" per launch (CNBC). At the roughly 100 t payload SpaceX quotes for a reusable Starship this implies under $100/kg (derived; payload not in the article). Breakthrough Institute: Starship projected "between $100 to $200/kg", optimistically (CA3). Google projects <= $200/kg by the mid-2030s (SD21).
- **Source:** CNBC, "Elon Musk, defending the value of space travel, presents SpaceX's Starship as the 'holy grail'". https://www.cnbc.com/2022/02/11/elon-musk-spacexs-starship-is-solution-to-efficient-space-travel.html
- **Date:** 2022-02-11.
- **Status:** VERIFIED-SECONDARY. Mark as aspirational on the page.

### SD36. Power purchase agreement prices

- **Claimed:** $0.03 to 0.06/kWh.
- **Value found:** LevelTen North America, Q2 2026, 25th-percentile offers: solar $52.65/MWh, wind $61.19/MWh. LevelTen's own post gives only the quarter-on-quarter changes (solar down 4.8%, wind up 5.5%); the full report is paywalled.
- **Sources:** pv magazine USA, "Solar PPA prices dip in Q2 while wind climbs as July 4 tax credit deadline looms, reports LevelTen". https://pv-magazine-usa.com/2026/07/27/solar-ppa-prices-dip-in-q2-while-wind-climbs-as-july-4-tax-credit-deadline-looms-reports-levelten/ ; LevelTen post https://www.leveltenenergy.com/post/levelten-north-american-ppa-price-index-q2-2026 (2026-07-21).
- **Date:** 2026-07-27.
- **Status:** CORRECTED. Print "about $0.05 to 0.06 per kWh for new North American solar and wind PPAs (LevelTen P25, Q2 2026)". The $0.03 low end is not supported for current offers. A PPA price is not the delivered cost of firm power.

### SD37. Grid connection waits

- **Claimed:** 7 to 12 years in some markets.
- **Values found:**
  - Dominion Energy (Northern Virginia): connection time for large data centers (over 100 MW) expected to rise by one to three years, to "as long as seven years" (Bloomberg, from Dominion's letter).
  - London: grid connection queues for data centres "now span from 7-13 years", against 3-7 years in other major European cities (Buro Happold, author of the GLA study "London's Data Centre Future Growth Forecasts and Strategic Insights").
  - Generation side, for context: LBNL *Queued Up 2024* reports projects built in 2023 took nearly five years from interconnection request to commercial operation (search result).
- **Sources:** Bloomberg Law, "Data Centers Face Seven-Year Wait for Dominion Power Hookups" https://news.bloomberglaw.com/environment-and-energy/data-centers-face-seven-year-wait-for-power-hookups-in-virginia (2024-08-30); PBC Today, "Powering the AI economy: How can London meet soaring data centre demand?" by Yalena Coleman (Buro Happold) https://www.pbctoday.co.uk/news/digital-construction-news/powering-ai-economy-how-can-london-meet-soaring-data-centre-demand/165476/ (2026-09-08); LBNL https://emp.lbl.gov/publications/queued-2024-edition-characteristics
- **Status:** CORRECTED. Print "up to seven years for large data centers in Northern Virginia (Dominion, 2024) and 7 to 13 years in London (Buro Happold, 2026)". Both are secondary reports of the primary statements.

### SD38. Earth-Moon latency

- **Print:** The Moon is 384,400 km away on average, so light takes about 1.28 s one way and about 2.6 s for a round trip.
- **Value found:** semimajor axis "0.3844" x 10^6 km; perigee 0.3633, apogee 0.4055 x 10^6 km.
- **Derived:** 384,400 km / 299,792 km/s = 1.282 s (center to center; surface to surface about 1.26 s; 1.21 to 1.35 s across perigee to apogee).
- **Source:** NASA NSSDCA, "Moon Fact Sheet", David R. Williams. https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
- **Date:** last updated 2024-01-11.
- **Status:** VERIFIED-PRIMARY.

### SD39. GEO latency

- **Print:** Geostationary satellites sit 35,786 km up, so one hop up and down takes about 0.24 s; a request and its reply through GEO take about 0.48 s.
- **Value found:** "at an altitude of 35 786 km".
- **Derived:** 2 x 35,786 km / 299,792 km/s = 0.239 s at the sub-satellite point; longer at low elevation angles.
- **Source:** ESA, "Geostationary orbit". https://esa.int/ESA_Multimedia/Images/2020/03/Geostationary_orbit (seen in search; quote from search extract)
- **Status:** VERIFIED-PRIMARY. Be explicit whether "round trip" means one up-and-down hop (0.24 s) or a full request and response (0.48 s).

### SD40. Chip life versus temperature

- **Claimed rule:** life halves per 10 K of junction temperature.
- **Check:** temperature-driven wear-out follows Arrhenius: acceleration factor AF = exp[(Ea/k)(1/T1 - 1/T2)], k = 8.617 x 10^-5 eV/K. A factor of 2 per 10 K implies Ea = k ln2 / (1/T1 - 1/T2): 0.56 eV near 300 K, 0.75 eV near 350 K, 0.84 eV near 375 K. With Ea = 0.7 eV a 10 K rise at 350 K shortens life by a factor of 1.9. So the rule matches about 0.7 eV only near 350 K and understates the effect at higher temperatures.
- **Activation energies found:** electromigration in pure Al 0.5 to 0.7 eV; TDDB 0.8 to 0.9 eV; hot carriers negative (-0.2 to -0.06 eV, worse when cold). Electromigration is modeled by Black's equation, MTTF = A J^-n exp(Ea/kT). JEDEC JEP122H (2016), "Failure Mechanisms and Models for Semiconductor Devices", is the standard reference; its tables were not accessible.
- **Sources:** "Reliability Models for Failure Mechanisms", EESemi. https://eesemi.com/relmodels.htm ; JEDEC JEP122H listing https://standards.globalspec.com/std/10047309/jedec-jep-122 (search result).
- **Status:** VERIFIED-SECONDARY. Print the Arrhenius form with "Ea of about 0.7 eV, which near 350 K works out to roughly halving per 10 K", rather than the bare rule.

### SD41. GPU junction temperature rating

- **Print:** The H100 is qualified at an average GPU temperature of 87 C (HBM 95 C); slowdown and shutdown limits sit a few degrees above the operating limit.
- **Value found:** H100 PCIe product brief (PB-11133-001, v02, November 2022): "Thermal qualification temperature GPU HBM TAVG = 87C THBM = 95C"; maximum operating temperature TLIMIT = 0 C, hardware slowdown TLIMIT = -2 C, hardware shutdown TLIMIT = -5 C (offsets from a per-card limit). nvidia-smi readouts reported for an H100 SXM5: max operating 85 C, slowdown 87 C, shutdown 90 C (third-party blog).
- **Source:** NVIDIA H100 PCIe GPU Product Brief, mirrored at https://openzeka.com/wp-content/uploads/2023/12/PB-11133-001_v01.pdf and manuals.plus (search results; no nvidia.com copy located). DGX H100 ambient limit 5 to 30 C (SD27).
- **Status:** VERIFIED-SECONDARY. TPU junction ratings: no public figure found; do not print one.

### SD42. SiC operating range

- **Print:** Silicon carbide power devices are rated to a 175 C junction.
- **Value found:** Wolfspeed CAB525F12XM3 SiC MOSFET module: "High Junction Temperature (175 C) Operation"; Operational Virtual Junction Temperature TVJ(op) -40 to 175 C.
- **Source:** Wolfspeed, CAB525F12XM3 data sheet, Rev. 3. https://assets.wolfspeed.com/uploads/2025/02/Wolfspeed_CAB525F12XM3_data_sheet.pdf
- **Date:** September 2024.
- **Status:** VERIFIED-PRIMARY. Some SiC parts are rated 200 to 225 C (TT Electronics, per secondary reports); these are power switches, not logic.

### SD43. GaN operating range

- **Value found:** only an RF knowledge-base site: GaN-on-SiC absolute maximum 225 to 275 C, recommended operation below 150 to 175 C for high reliability.
- **Source:** https://rfessentials.com/rf-knowledge-base/what-is-the-recommended-maximum-junction-temperature-for-gan-hemt-devices/ (search result).
- **Status:** UNVERIFIED. Needs a manufacturer datasheet before printing.

### SD44. On-orbit radiation results for the H100

- **Value found:** no published TID or SEE results from Starcloud-1. One blog reports beam-test numbers (no SEL or SEFI above LET 80 MeV cm2/mg, TID above 120 krad(Si)) without citing a test report. IEEE Spectrum (CA7) says Starcloud-1's radiator was too weak to let the H100 run at full power.
- **Status:** UNVERIFIED. Print only "Starcloud has not published radiation data from Starcloud-1." For TPUs use SD20.

### SD45. Efficiency clock (Epoch AI)

- **Print:** energy efficiency (FLOP/s per watt) of ML GPUs doubles about every 3.0 years (5th to 95th percentile 2.7 to 3.3), 26 % a year; general-purpose GPUs 2.7 years. Peak spec-sheet figures, not realised work.
- **Source:** Epoch AI, "Trends in machine learning hardware" (2023, updated 2025). https://epoch.ai/blog/trends-in-machine-learning-hardware
- **Use:** the Today and Cheap launch efficiency gain (26 %/yr), which sets both energy growth and obsolescence.
- **Status:** VERIFIED-SECONDARY (read through search summaries of Epoch's own pages; reopen the page before quoting the interval).

### SD46. Permanent GPU failure rate

- **Print:** in Meta's Llama 3 405B run, 148 of 419 unplanned interruptions over 54 days on 16,384 H100s were faulty GPUs: 148 / 16,384 / 54 x 365 = 6.1 % a year. Counting HBM3 failures too gives about 9 %. These are interruptions, not confirmed replacements, over one 54-day window that includes burn-in.
- **Source:** Meta, "The Llama 3 Herd of Models" (2024), section on reliability; Tom's Hardware summary, 2024-07-28.
- **Use:** the 5 %/yr failure-rate default at an 85 C junction [EST], the lower end because burn-in inflates the run's rate.
- **Status:** VERIFIED-SECONDARY (derived from the reported counts).

### SD47. Used-accelerator value

- **Print:** American Compute's H100 appraisal: conservative band 11 to 19 % of original list price in 2027, 5 to 7 % in 2028; moderate band 19 to 42 % in 2027; typical realised sale about $14,250 for a used H100 SXM in 2026. 2026 listings run about half to three quarters of new, inflated by scarcity.
- **Source:** American Compute, H100 appraisal. https://www.amcompute.com/appraisals/h100
- **Use:** the ground resale default: a used chip sells for 50 % of a new chip's price per unit of its remaining relative work, so a 5-year-old chip fetches about 16 % of its price at a 3-year efficiency doubling.
- **Status:** VERIFIED-SECONDARY (vendor appraisal, not audited transactions).

### SD48. Operator retirement practice

- **Print:** Amazon cut the useful life of a subset of servers from six to five years from 2025-01-01, citing the pace of AI development; Meta lengthened servers to 5.5 years from 2025-01-01; Microsoft and Alphabet use six years. Critics argue AI accelerators earn for two to three years.
- **Source:** CNBC, "AI GPU depreciation: CoreWeave, Nvidia and Michael Burry", 2025-11-14; company 10-K filings (not reopened).
- **Use:** the check on the computed ground retirement age (Samir Varma's fifth point): the model gives 6.4 years at the Today inputs.
- **Status:** VERIFIED-SECONDARY.

## Competing analyses

### CA1. Samir Varma

- **Title:** "Musk's Space Data Centers Are a Bet That Moore's Law Stays Slow". https://samirvarma.substack.com/p/musks-space-data-centers-are-a-bet
- **Author, date:** Samir Varma, 2026-06-15.
- **Thesis:** The case for orbital data centers turns less on cooling or launch than on how slowly accelerator work-per-watt improves, since slow improvement lets orbital hardware earn its launch cost before it is obsolete.
- **Key numbers:** about 30 t/MW best orbit, 41 t/MW generic; radiator 5 kg/m2 two-sided at 75 C rejecting about 750 W/m2 to deep space; solar 150 W/kg; Falcon 9 about $2,700/kg; Starship hypothetical $100 to 300/kg; ground $11.3M/MW shell and core, up to $25M/MW with AI fit-out. Chip purchase cost excluded.
- **Correspondence (2026-11-15, attribution allowed):** the retirement-age rule e^x - 1 - x = (ln 2 / D)(K / h) and five changes the calculator now carries; he narrows his article's nine-year optimum to a launch-only model and its three-year ground cadence to an assumption. Summary: `space-data-centers-spec.md` section 11.
- **Second note (2026-11-16):** reproduces the 6.4-year ground age at a 0.5 resale share independently; asks to source the share or show its sensitivity (8.4 years at none, 5.2 at 0.7). Done 2026-11-18 (spec section 11.2).

### CA2. Angadh Nanjangud (two posts)

- **Starcloud:** "No way Starcloud's putting a data centre in space in a Starship or $8.2 million". https://angadh.com/space-data-centers-1 . First published 2025-06-20, revised 2026-07-27 (marked 85% complete). Thesis: Starcloud's 40 MW in one 100 t Starship launch for $8.2M is infeasible; it needs 17 to 22 launches. Numbers: 128,000 m2 of solar at Starcloud's 312 W/m2; ISS radiators 195 W/m2 overall and 14.2 to 17.5 kg/m2 (15.0 combined); about 63,000 m2 of radiator; total about 1,687 t; cost $85M to $130M with optimistic launch prices, $1.7B to $2.2B at about $100M per launch. The post's own counts are not fully consistent (iROSA launch count).
- **Suncatcher:** "Notes on Google's Space Data Centers". https://angadh.com/space-data-centers-2 . First published 2025-11-05, revised 2026-07-27 (early draft). Thesis: Google's many-small-satellite cluster scales more plausibly than a monolith, but Google never quantifies heat rejection, and realistic radiators could double or triple satellite mass. Numbers: 81 satellites at about 28 kW and 575 kg each (2.26 MW, about 47 t); ISS-density radiators add about 660 kg per satellite; Starlink-class radiators handle about 1 to 2 kW versus 10 to 28 kW of TPU heat.

### CA3. Breakthrough Institute

- **Title (verified, matches the claimed title):** "Data Centers Won't Be In Space Anytime Soon". https://thebreakthrough.org/issues/energy/data-centers-wont-be-in-space-anytime-soon
- **Author, date:** Ryan Alimento, Climate and Energy Analyst, 2026-02-17.
- **Thesis:** Radiation, reliability and hardware turnover remain unsolved, so AI infrastructure stays on Earth for the foreseeable future.
- **Key numbers:** Falcon 9 cut launch cost from about $11,500/kg to $1,500/kg; Starship optimistically $100 to 200/kg; orbital panels get about 25% more useful sunlight; Llama 3 training on H100s saw 419 unexpected interruptions in 54 days; AI chips last 2 to 3 years in training against a one-year release cycle; triple modular redundancy triples cooling and power.
- **Note:** its $1,500/kg Falcon figure conflicts with SD25; do not reuse it.

### CA4. Doug Natelson

- **Title:** "Data centers in space make no sense to me". http://nanoscale.blogspot.com/2026/02/data-centers-in-space-make-no-sense-to.html
- **Author, date:** Douglas Natelson, *nanoscale views*, 2026-02-08.
- **Thesis:** Vacuum makes waste heat hard to shed and leading-edge chips are radiation-sensitive, so orbital data centers make no sense with current or near-future technology; the money would do more in energy-efficient computing.
- **Key numbers:** radiators realistically below 1,000 K; an ideal black body at 1,000 K emits about 57 kW/m2; tens of MW need hundreds to thousands of m2; at 500 K the area rises 16-fold (comment).

### CA5. IEEE Spectrum, June 2026

- **Title:** "Why Orbital Data Centers Are Harder Than Silicon Valley Thinks", subtitle "Shedding heat will require ingenious new designs". https://spectrum.ieee.org/orbital-data-centers-heat
- **Author, date:** Andrew Cavalier, principal analyst, ABI Research; published online 2026-06-11 (July 2026 print issue).
- **Thesis:** Radiation is the only way to shed heat in vacuum, and radiator area scaling with power makes orbital data centers far costlier than terrestrial ones.
- **Key numbers:** a 700 W H100-class chip needs just under 3 m2 of radiator at 20 C, 1.4 m2 at 60 C, about 1 m2 at 85 C, nearly 2.0 m2 at 60 C end of life; a 40 kW rack needs 80 m2; 100 MW needs at least 2,500 such radiators; area grows about 40% over 5 years from emissivity loss; solar arrays about 400 W/m2 and radiators about 450 W/m2; radiators and arrays 65% to 70% of satellite mass; even at $44/kg launch, a GPU-year in space costs at least ten times one on Earth.

### CA6. IEEE Spectrum, February 2026 (McCalip numbers)

- **Title:** "How Stupid Would It Be to Put Data Centers in Space?". https://spectrum.ieee.org/orbital-data-centers
- **Author, date:** Glenn Zorpette, 2026-02-26.
- **Thesis:** McCalip's Starlink-based model puts orbit at about three times the terrestrial cost, expensive but not dismissible.
- **Key numbers:** about $51.1B orbital vs about $16B ground for 1 GW over five years; about 4,300 satellites, 30 million kg; about 240 to 250 kW and 1,024 m2 of PV per satellite.

### CA7. IEEE Spectrum, July 2026 editorial

- **Title:** "The Space-based Data Center Hype Machine Is Already in Orbit". https://spectrum.ieee.org/orbital-data-center-hype
- **Author, date:** Harry Goldstein, Editor in Chief, 2026-07-01.
- **Thesis:** Launch cadence, manufacturing rate and cooling math do not support claims that orbit will soon be the cheapest place for AI compute.
- **Key numbers:** one million satellites at 60 per Starship launch is 16,666 launches, against SpaceX's record 165 orbital launches in 2025; Starlink builds about 4,000 satellites a year; Starcloud-1's radiator could not let its H100 run at full power.

### Also relevant

- Tim Fernholz, "Why the economics of orbital AI are so brutal", TechCrunch, 2026-02-11. https://techcrunch.com/2026/02/11/why-the-economics-of-orbital-ai-are-so-brutal . Falcon 9 about $3,600/kg; ground power $570 to $3,000 per kW-year; Starlink-class orbital power about $14,700 per kW-year.

## Status counts

Figures SD1 to SD48:

| Status | Count | IDs |
| --- | --- | --- |
| VERIFIED-PRIMARY | 22 | SD1, SD2, SD3, SD5, SD6, SD7, SD8, SD12, SD15, SD16, SD18, SD19, SD20, SD21, SD23, SD27, SD29, SD31, SD34, SD38, SD39, SD42 |
| VERIFIED-SECONDARY | 15 | SD9, SD13, SD14, SD17, SD24, SD28, SD32, SD33, SD35, SD40, SD41, SD45, SD46, SD47, SD48 |
| CORRECTED | 9 | SD4, SD10, SD11, SD22, SD25, SD26, SD30, SD36, SD37 |
| UNVERIFIED | 2 | SD43, SD44 |
| CUT | 0 | none |

Competing analyses CA1 to CA7: all located and read.
