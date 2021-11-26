const config = {
    title: 'NPRI Sector Overview: Oil Sands Extraction',
    introSlide: {
        logo: {
            src: 'https://i.imgur.com/BDdw5aN.png',
            altText: 'Logo'
        },
        title: 'NPRI Sector Overview: Oil Sands Extraction',
        subtitle: 'It also summarizes what steps facilities in this sector take to mitigate their environmental impacts'
    },
    slides: [
        {
            title: 'Overview',
            panel: [
                {
                    title: 'Overview',
                    content: `**Oil Sands Extraction** is part of the National Pollutant Release Inventory's (NPRI) Sector Overview series. This sector overview explores NPRI substances released, disposed, and transferred by this industry. It also summarizes what steps facilities in this sector take to mitigate their environmental impacts.

Businesses, institutions and other facilities across Canada must report their releases, transfers and disposals of pollutants to air, water and land annually to the Government of Canada's NPRI. The information collected is public, helps governments set environmental priorities and monitor environmental performance, and provides Canadians with an opportunity to learn about pollution in their surroundings.`,
                    type: 'text'
                },
                {
                    src: './images/NPRIpictogramme-2016data-EN__1553797637582__w1430.jpg',
                    type: 'image'
                }
            ]
        },
        {
            title: 'Oil sands deposits',
            panel: [
                {
                    title: 'Oil sands deposits',
                    content: `There are three large oil sands deposits in Canada:

- The Athabasca;
- Peace River; and
- Cold Lake.

All three of the deposits are located in northern Alberta except for a small portion of the Cold Lake deposit, which extends into Saskatchewan. Together, these deposits cover [142,000 square kilometres](asdf) and are estimated to contain 166.3 billion barrels.

The oil sands extraction sector is a major contributor to Canada’s economy, with more than 528,000 people deriving direct, indirect and induced employment from the oil sands and its supporting sectors. To date, [$243 billion of capital expenditures has been invested in the oil sands industry](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/what-are-oil-sands/18089), and the sector produces [2.9 million barrels of oil per day](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/oil-supply-and-demand/18086).

This map shows the three oil sands areas. The actual geological deposits themselves cover larger areas.`,
                    type: 'text'
                },
                {
                    config: './configs/OilSandsDeposits.json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Oil sands extraction',
            panel: [
                {
                    title: 'Oil sands extraction',
                    content: `The oil found in oil sands deposits is primarily bitumen, a very heavy and viscous oil. Bitumen does not flow easily at room temperature and requires unconventional methods to extract. Bitumen is extracted either from surface mining or in-situ using a variety of methods.

The choice between surface mining and thermal in-situ is solely determined by the depth of the oil deposit. Surface mining is used to reach deposits to a maximum depth of 70 meters below the surface; thermal in-situ wells extract bitumen at greater depths.

Surface mining involves digging up large areas with large excavators. The resulting bitumen and sand mixture is mixed with hot water and sodium hydroxide (NaOH) to separate the bitumen. During this process, the bitumen rises to the top of large separation vessels as a froth. This froth bitumen is further processed in a froth treatment unit to extract the bitumen. Most of the material dug up in an oil sands surface mine is clay and sand. The bitumen extracted makes up about 10% of this material.`,
                    type: 'text'
                },
                {
                    src: './images/GettyImages-187242601__1554821467033__w1920.jpg',
                    type: 'image'
                }
            ]
        },
        {
            title: 'In-situ extraction',
            panel: [
                {
                    title: 'In-situ extraction',
                    content: `In-situ extraction generally involves pumping high-pressure steam deep underground. This heats the bitumen to the point that it flows and can be brought up to the surface. If the bitumen has a low enough viscosity that it can be extracted using conventional methods, the in-situ operations do not need to use thermal methods to promote extraction. This sector overview addresses only those sites using thermal extraction methods, as they are much more energy-intensive.

Thermal in-situ facilities have a much smaller physical footprint than surface mining operations, and they do not produce tailings that need to be stored on-site. They also use significantly less water as compared to surface mining facilities. Thermal in-situ facilities are more energy intensive than mines, due to the production of steam. However, new technologies and industry research are focused on [reducing in-situ energy intensity](https://www.cosia.ca/initiatives/greenhouse-gases).`,
                    type: 'text'
                },
                {
                    src: './images/SurfaceExtractionEnglish__1563813765181__w791.png',
                    type: 'image'
                }
            ]
        },
        {
            title: 'Where are facilities located?',
            panel: [
                {
                    title: 'Where are facilities located?',
                    content: `Oil sands extraction facilities that report to the NPRI are located exclusively in northern Alberta, particularly around the municipality of Fort McMurray. Of the facilities that reported in 2017, 23 of them are in the Peace River deposit, 5 in the Cold Lake deposit and 35 in the Athabasca deposit. Also included in this map is an upgrader facility in Fort Saskatchewan, Alberta, that upgrades oil from the Canadian Natural Resources’ Muskeg River oil sands surface mining facility. Of the facilities that reported to the NPRI, seven of them are surface mining operations, one was an [upgrader facility](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/upgrading-oil-sands-and-heavy-oil/5875) and the remaining 56 were in-situ facilities. The category “Other” refers to facilities that do not use thermal methods for extraction.
| **Facility location** | **Thermal in-situ** | **Surface mining** | **Other** | **Total** |
| ----------------------| ------------------- | ------------------ | --------- | --------- |
| Athabasca             | 23                  | 7                  | 5         | **35**    |
| Peace River           | 4                   | 0                  | 19        | **23**    |
| Cold Lake             | 5                   | 0                  | 0         | **5**     |
| Total                 | 32                  | 7                  | 24        | **63**    |

**Oil sands facilities reporting to the NPRI - 2017**`,
                    type: 'text'
                },
                {
                    config: './configs/OilSandsFacilityLocations2017.json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'NPRI substances reported for oil sands mining facilities',
            panel: [
                {
                    title: 'NPRI substances reported for oil sands mining facilities',
                    content: `Seven oil sands surface mining facilities reported to the NPRI in 2017. These facilities reported information on 72 different substances and substance groups for 2017, representing a total of 285,000 tonnes of pollutants released, disposed of and transferred. Almost 80% of this amount, 227,000 tonnes, is the release of criteria air contaminants (CACs) such as particulate matter (PM), nitrogen oxides (NO), sulphur dioxide (SO2), carbon monoxide (CO) and volatile organic compounds

(VOCs). CACs are precursors to smog and contribute to poor air quality.

The seven mining oil sands surface mining facilities that reported to the NPRI are listed below. Click

on the facility names to see a breakdown of what each facility reported. For more information on how to use and interpret NPRI data please [click here](https://www.canada.ca/en/environment-climate-change/services/national-pollutant-release-inventory/using-interpreting-data.html).

- Canadian Natural Resources' Muskeg River and Jackpine Mines and Horizon Processing Plant and Mine;
- Fort Hills Oil Sands Mine;
- Imperial Oil Kearl Processing Plant and Mine;
- Suncor Energy Inc. Oil Sands; and
- Syncrude Canada Aurora North Mine Site, and Mildred Lake.

Note that even though the Muskeg River and Jackpine Mines are stand alone mines, for the purposes of NPRI reporting, Canadian Natural Resources reports information for them as one facility.

It can be challenging to make direct comparisons between these facilities. While all of the facilities are involved in the extraction and processing of bitumen, their operations differ. Some facilities, such as the Kearl and Fort Hills mines, are primarily mines and do not upgrade their bitumen on-site. These facilities generally have particulate matter (PM) as a much larger proportion of their reported releases. Facilities that have upgraders on-site generally report larger amounts of sulphur dioxide (SO2) releases.

You can explore each facility using satellite imagery.

Satellite imagery as of 2011.`,
                    type: 'text'
                },
                {
                    config: './configs/ReleasesandDisposalsbyMiningFacilitiesin2017(satellite).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Criteria air contaminant releases from oil sands mines',
            panel: [
                {
                    title: 'Criteria air contaminant releases from oil sands mines',
                    content: `Reported Criteria Air Contaminant (CAC) emissions from oil sands surface mining operations have stayed relatively constant since 2009, ranging between 195,000 tonnes and 227,000 tonnes released per year. At the same time, however, production from these facilities has increased significantly, going from 300 million barrels produced in 2009 to 466 million barrels produced in 2017, an increase of over 50%. As a result, the amount of releases per barrel of oil produced from these operations has gone down steadily and significantly, decreasing 34% between 2009 and 2017.`,
                    type: 'text'
                },
                {
                    src: './images/slide%206%20-%20mining%20trends__1553275702559__w592.jpg',
                    type: 'image'
                }
            ]
        },
        {
            title: 'Mine tailings reported',
            panel: [
                {
                    title: 'Mine tailings reported',
                    content: `Processing mined oil sands to remove the bitumen leaves behind a mix of water, sand, and clay with trace amounts of metals, polycyclic aromatic hydrocarbons (PAHs) and other volatile organic compounds (VOCs). This left-over mixture, known as mine [tailings](https://www.ec.gc.ca/inrp-npri/default.asp?lang=En&n=FEC85072&offset=1&toc=show), is disposed of in purpose-built, monitored [tailings impoundment areas](https://www.nrcan.gc.ca/mining-materials/publications/13924).

In 2017, oil sands mining operations reporting to the NPRI reported information on 47 substances disposed of in tailings impoundment areas, totalling 50,300 tonnes.

Substances disposed of as tailings can be grouped into three broad categories:

1. Metals (28,900 tonnes);
2. Volatile organic compounds (VOCs) (6,800 tonnes); and
3. Others (14,700 tonnes).

While the tailings reported by these mines have large amounts of manganese, ammonia (NH3), and phosphorus, the substances of greater concern are some of the volatile organics, such as benzene (C6H6), toluene (C7H8), ethylbenzene (C8H10), and xylene (C8H10) (labelled as BTEX in the figure), and 19 different polycyclic aromatic hydrocarbons (PAHs).`,
                    type: 'text'
                },
                {
                    images: [
                        {
                            src: 'images/09-01-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-02-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-03-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-04-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-05-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-06-tailings.jpg',
                            type: 'image'
                        },
                        {
                            src: 'images/09-07-tailings.jpg',
                            type: 'image'
                        }
                    ],
                    loop: true,
                    caption: 'This is example caption text for a slideshow panel.',
                    type: 'slideshow'
                }
            ]
        },
        {
            title: 'Reported mine tailings from oil sands surface mining facilities',
            panel: [
                {
                    title: 'Reported mine tailings from oil sands surface mining facilities',
                    content: `Similar to comparing release and transfer profiles, it is difficult to compare the seven oil sands surface mining facilities in terms of what they dispose of in their tailings impoundment areas. These facilities vary greatly in their size and in how much bitumen processing occurs on-site. Breakdowns of reported tailings for each facility are provided below.

- Canadian Natural Resources Muskeg River and Jackpine Mines, and Horizon Oil Sands Processing Plant and Mine;
- Fort Hills Oil Sands Mine;
- Imperial Oil Kearl Processing Plant and Mine;
- Suncor Energy Inc. Oil Sands; and
- Syncrude Canada Aurora North Mine Site, and Mildred Lake.

The facility with the most tailings disposed of in 2017 was Canadian Natural Resources Muskeg River and Jackpine Mine sites accounting for 40% of all tailings reported by the seven oil sands surface mining operations. Manganese made up the largest amount of tailings for four of the reporting facilities.

You can explore each facility using satellite imagery.

Satellite imagery as of 2011.`,
                    type: 'text'
                },
                {
                    config: './configs/ReleasesandDisposalsbyMiningFacilitiesin2017(topo).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Trends in mine tailings reported from surface mining facilities',
            panel: [
                {
                    title: 'Trends in mine tailings reported from surface mining facilities',
                    content: `Total reported tailings from oil sands surface mining facilities have increased by 3% between 2009 and 2017, an increase of 1,700 tonnes. Five of these facilities have been in production and have reported to the NPRI since before 2009. All of these facilities reported increases in their total tailings disposals between 2016 and 2017, with the exception of Syncrude’s Mildred Lake facility.`,
                    type: 'text'
                },
                {
                    config: './configs/TailingsfromMiningFacilities2009to2017(timeslider).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Thermal in situ facilities',
            panel: [
                {
                    title: 'Thermal in situ facilities',
                    content: `The other main method used for extracting bitumen from the oil sands is thermal in-situ. Bitumen is usually too heavy and viscous to be pumped out from deep underground using conventional means and must be heated up before extraction. This heat is provided by injecting high pressure steam deep underground to heat up the bitumen so it can be pumped out of the ground.

There are various different methods for steam injection. Two of the primary methods used for in-situ extraction are Cyclic Steam Stimulation (CSS) and Steam Assisted Gravity Drainage (SAGD). CSS uses one pipe drilled into the ground. Steam is injected and then the heated bitumen is pumped back up the same pipe. In this way, the well is cycled between injection and production. SAGD uses two drill holes that run horizontal after reaching the appropriate depth. Steam is injected into one pipe and the heated bitumen flows into and is pumped out of the other pipe. SAGD wells are able to continuously produce instead of being cycled between injection and production like CSS.

Compared to surface mining, thermal in-situ operations are much more energy intensive, as energy is required to create the steam that is injected. On the other hand, thermal in-situ methods are much less disruptive to the natural habitat, as the operation has a much smaller footprint and the land does not have to be cleared to access the bitumen. Thermal in-situ facilities also do not produce tailings that need to be impounded and managed.`,
                    type: 'text'
                },
                {
                    src: './images/OilSands___1565005967929__w774.png',
                    type: 'image'
                }
            ]
        },
        {
            title: 'NPRI releases from thermal in-situ facilities',
            panel: [
                {
                    title: 'NPRI releases from thermal in-situ facilities',
                    content: `There were 32 thermal in-situ facilities that reported to the NPRI in 2017. The primary emission sources from these facilities are the combustion equipment used to generate steam and the compression equipment, which runs on fossil fuel, used to inject the steam underground.

Thermal in-situ facilities reported 62,000 tonnes of releases to air in 2017 and very little else. As discussed, the process does not produce tailings. Recovered water from the injected steam is generally treated on-site and reused.

The air releases reported by thermal in-situ facilities is almost entirely (99%) criteria air contaminants (CACs), which was mostly carbon monoxide (CO) and nitrogen oxides (NOx) (23,000 tonnes each). Other CACs reported were sulphur dioxide (SO2) (10,000 tonnes), volatile organic compounds (VOCs) (3,400 tonnes) and fine particulate matter (PM) (570 tonnes). Non-CAC substances reported, albeit in very small amounts, included the following:

- Ammonia (NH₃);
- Benzene (C6H6);
- Hexanes (C6H14); and
- Xylene (C8H10).`,
                    type: 'text'
                },
                {
                    config: './configs/ReleasestoAirbyInSituFacilitiesforAllSubstancesin2017.json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Trends in NPRI substances released from in-situ facilities',
            panel: [
                {
                    title: 'Trends in NPRI substances released from in-situ facilities',
                    content: `The number of thermal in-situ facilities reporting to the NPRI has almost doubled over the last nine reporting years, going from 18 in 2009 to 32 in 2017. The number of facilities peaked in 2015 at 38.

This change in the number of facilities reporting over time follows changes in the sector as a whole. The price of oil rose significantly in 2009 and 2010, and remained high until 2015. This fueled significant growth in this sector, with many new facilities coming online and reporting for the first time. A significant drop in the price of oil in 2015 led to a slowdown in the number of new facilities coming online, and even to some facilities suspending operations.`,
                    type: 'text'
                },
                {
                    config: './configs/ReleasestoAirbyInSituFacilitiesforAllSubstances2009to2017(timeslider).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'NPRI releases from thermal in-situ facilities - Part 2',
            panel: [
                {
                    title: 'NPRI releases from thermal in-situ facilities - Part 2',
                    content: `Reported CAC emissions from thermal in-situ operations have increased along with the increase in the number of facilities reporting since 2009.

The increase in emissions seen in 2017 is likely due to a rebound in the price of oil in that year. Twenty-five of the remaining 32 facilities reporting to the NPRI increased their reported CAC emissions between 2016 and 2017.

While thermal in-situ facilities have reported an increase in reported CAC emissions, this has been coupled with an even larger and steady increase in bitumen production. Bitumen production from thermal in-situ operations increased over 140% between 2009 and 2016. CAC releases per barrel produced have decreased substantially over this time, almost 50%.`,
                    type: 'text'
                },
                {
                    src: './images/Slide%2013%20-%20InSitu%20Trends__1554406944277__w594.jpg',
                    type: 'image'
                }
            ]
        },
        {
            title: 'Managing environmental impacts',
            panel: [
                {
                    title: 'Managing environmental impacts',
                    content: `The Government of Canada’s policy towards oil sands development is that private companies make business decisions given regulations that protect current and future Canadian interests. The provinces have jurisdiction over oil and gas development within their provincial boundaries, and environmental protection is a shared responsibility by the Government of Canada and the provinces. The federal government participates in the environmental assessment process through the Joint Review Panel for proposed surface mine developments, while the Government of Alberta is responsible for the assessment of proposed in-situ developments.

Governments at all levels are committed to balancing economic benefits and environmental stewardship from the development of this sector. Oil sands projects undergo significant environmental assessments before they are approved and they are subject to extensive environmental monitoring throughout the project’s life. Please visit the **[Canada-Alberta Oil Sands Monitoring Program](https://www.canada.ca/en/environment-climate-change/services/oil-sands-monitoring.html)** for more information.

While emissions of pollutants have risen from this sector as it has grown, the oil sands industry has been very successful in reducing its emissions per barrel of oil produced.

Oil sands surface mining facilities in Alberta take much of their water from the Athabasca River. The provincial government sets limits on how much water can be drawn, based on the season, through the **[Surface Water Quantity Management Framework for the Lower Athabasca River](https://open.alberta.ca/publications/9781460121733)**, which insures that annual withdrawals never exceed 3% of the river’s flow.`,
                    type: 'text'
                },
                {
                    src: './images/GettyImages-516166467__1554821531978__w1920.jpg',
                    type: 'image'
                }
            ]
        },
        {
            title: 'Pollution in your neighbourhood',
            panel: [
                {
                    title: 'Pollution in your neighbourhood',
                    content: `You can identify the facilities and pollutants in your community by entering your postal code in the NPRI online data search. For further analysis, check out [other NPRI maps and datasets](https://www.canada.ca/en/environment-climate-change/services/national-pollutant-release-inventory/tools-resources-data/exploredata.html).`,
                    type: 'text'
                },
                {
                    title: 'NPRI data',
                    content: `We have packaged the data in different ways for different uses. You can search the entire database, download subsets of data, or view the data on maps.

### Search NPRI data

[Search our database](https://pollution-waste.canada.ca/national-release-inventory/archives/index.cfm?lang=En) for 1994 to 2017 pollutant releases in your area, as well as information about the facility(s).

### Download NPRI data

These easy-to-use files let you dig deeper into the data in a variety of ways

- [Single year tables](https://open.canada.ca/data/en/dataset/1fb7d8d4-7713-4ec6-b957-4a882a84fed3 "Single year tables"),
    - annual tables of our most popular data fields. One table for each of the last 3 years
- [Five year summaries](https://open.canada.ca/data/en/dataset/ea0dc8ae-d93c-4e24-9f61-946f1736a26f "Five year summaries")
    - summaries by air, water or land releases grouped by province, industry type or substance
- [All years datasets](https://open.canada.ca/data/en/dataset/40e01423-7728-429c-ac9d-2954385ccdfb "All years datasets")
    - annual data since 1994 on pollutant quantities, comments and geolocations
- [Complete reported datasets](https://open.canada.ca/data/en/dataset/06022cc0-a31e-4b4c-850d-d4dccda5f3ac "Complete reported datasets")
    - comprehensive datasets going back to 1994`,
                    type: 'text'
                }
            ]
        },
        // TODO: remove temporary sample test for chart panels
        {
            title: 'DQV Chart',
            panel: [
                {
                    title: 'DQV Chart',
                    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus, magna in pulvinar tincidunt, magna velit feugiat sem, nec rhoncus lectus tortor quis turpis. Vivamus erat velit, feugiat at nisl lacinia, pulvinar tempus nunc. Nulla suscipit vulputate dapibus. Fusce tincidunt neque nunc, sed porta lacus elementum vitae. Suspendisse imperdiet interdum ipsum, id aliquet lectus aliquet sit amet. Aliquam erat volutpat. Nulla convallis nisl sodales nunc ullamcorper pulvinar. Nulla ornare justo id sapien porta gravida. Cras condimentum, felis id pretium malesuada, lorem lorem viverra nisi, sit amet molestie mi nulla nec velit. Integer semper lorem scelerisque tellus iaculis finibus. Aliquam efficitur sodales elit nec sodales. Sed vitae ipsum quis eros vulputate luctus.`,
                    type: 'text'
                },
                {
                    src: './charts/chartConfig.json',
                    type: 'chart'
                }
            ]
        }
    ],
    contextLink:
        'https://www.canada.ca/en/environment-climate-change/services/national-pollutant-release-inventory/tools-resources-data/exploredata.html',
    contextLabel: 'Explore National Pollutant Release Inventory data',
    lang: 'en'
};

export default config;
