const config = {
    title: 'NPRI Sector Overview: Oil Sands Extraction',
    introSlide: {
        logo: {
            src: '',
            altText: ''
        },
        title: 'NPRI Sector Overview: Oil Sands Extraction',
        subtitle: ''
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
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/NPRIpictogramme-2016data-EN__1553797637582__w1430.jpg',
                    type: 'image',
                    altText:
                        'An image describing the flow from industry of on-site releases to air, water, and land, on-site disposals, off-site disposals, and off-site transfers.'
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

All three of the deposits are located in northern Alberta except for a small portion of the Cold Lake deposit, which extends into Saskatchewan. Together, these deposits cover [142,000 square kilometres](https://www.nrcan.gc.ca/our-natural-resources/energy-sources-distribution/clean-fossil-fuels/technical-overview/5851?_ga=2.92936030.219303224.1637701004-1958057264.1607712157) and are estimated to contain 166.3 billion barrels.

The oil sands extraction sector is a major contributor to Canada’s economy, with more than 528,000 people deriving direct, indirect and induced employment from the oil sands and its supporting sectors. To date, an estimated $325 billion of capital expenditures has been invested in the oil sands industry, and the sector produces 2.95 million barrels of oil per day.

This map shows a generalized potential extent of the three oil sands areas. The actual geological deposits themselves cover larger areas.`,
                    type: 'text'
                },
                {
                    config: '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/OilSandsDeposits.json',
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
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/GettyImages-187242601__1554821467033__w1920.jpg',
                    type: 'image',
                    altText: 'An image showing an aerial view of an oil sands extraction facility.'
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
                    src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/Slide 3 - mine vs insitu.jpg',
                    type: 'image',
                    altText:
                        'A diagram showing the extraction process involving pumping high-pressure steam deep underground.'
                }
            ]
        },
        {
            title: 'Where are facilities located?',
            panel: [
                {
                    title: 'Where are facilities located?',
                    content: `Oil sands extraction facilities that report to the NPRI are located exclusively in northern Alberta, particularly around the municipality of Fort McMurray. Of the facilities that reported in 2019, 1 of them are in the Peace River deposit, 5 in the Cold Lake deposit and 30 in the Athabasca deposit. Also included in this map is an upgrader facility in Fort Saskatchewan, Alberta, that upgrades oil from the Canadian Natural Resources’ Muskeg River oil sands surface mining facility. Of the facilities that reported to the NPRI, seven of them are surface mining operations, one was an [upgrader facility](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/upgrading-oil-sands-and-heavy-oil/5875) and the remaining 30 were in-situ facilities.
#### Oil sands facilities reporting to the NPRI - 2019
| **Facility location** | **Thermal in-situ** | **Surface mining** | **Upgrader** | **Total** |
| ----------------------| ------------------- | ------------------ | --------- | --------- |
| Athabasca             | 23                  | 7                  | 0         | **30**    |
| Peace River           | 1                   | 0                  | 0         | **1**     |
| Cold Lake             | 5                   | 0                  | 0         | **5**     |
| Other                 | 1                   | 0                  | 1         | **2**     |
| Total                 | 30                  | 7                  | 1         | **38**    |
`,
                    type: 'text'
                },
                {
                    config: '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/OilSandsFacilityLocations2019.json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'NPRI substances reported for oil sands mining facilities',
            panel: [
                {
                    title: 'NPRI substances reported for oil sands mining facilities',
                    content: `Seven oil sands surface mining facilities reported to the NPRI in 2019. These facilities reported information on 70 different substances and substance groups for 2019, representing a total of 319,888 tonnes of pollutants released, disposed of and transferred. Almost 76% of this amount, 242,395 tonnes, is the release of criteria air contaminants (CACs) such as particulate matter (PM), nitrogen oxides (NOx), sulphur dioxide (SO<sub>2</sub>), carbon monoxide (CO) and volatile organic compounds (VOCs). CACs are precursors to smog and contribute to poor air quality.

The seven oil sands surface mining facilities that reported to the NPRI are listed below. Click on the facility names to see a breakdown of what each facility reported.

- Canadian Natural Resources' Muskeg River and Jackpine Mines and Horizon Processing Plant and Mine;
- Fort Hills Oil Sands Mine;
- Imperial Oil Kearl Processing Plant and Mine;
- Suncor Energy Inc. Oil Sands; and
- Syncrude Canada Aurora North Mine Site, and Mildred Lake.
`,
                    type: 'text'
                },
                {
                    images: [
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/1_AuroraNorth_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Syncrude Canada Ltd., Aurora North Mine Site 2019 Releases and Disposals (Tonnes): Particulate Matter Releases- 10733,66%; Tailings- 2957,18%; Volatile Organic Compound Releases-1149,7%; Carbon Monoxide Releases- 807,5%; Nitrogen Oxide Releases- 589,4%; Other Releases- 27,0%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/2_FortHills_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Fort Hills Energy L.P., Fort Hills Oil Sands, 2019 Releases and Dispostals (Tonnes): Particulate Matter Releases- 14701,57%; Tailings- 8322,32%; Nitrogen Oxide Releases- 1071,4%; Volatile Organic Compound Releases- 710,3%; Carbon Monoxide Releases- 793,3%; Other Releases- 178,1%; Sulphur Dioxide Releases- 34,0%; Other Disposals and Transfers- 105,0%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/3_Horizon_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Canadian Natural Resources Limited, Horizon Oil Sands Processing Plant and Mine 2019 Releases and Dispostals (Tonnes): Volatile Organic Compound Releases- 10815,33%; Particulate Matter Releases- 6518,20%; Tailings- 5700,18%; Sulphur Dioxide Releases- 2754,8%; Nitrogen Oxide Releases- 2621,8%; Carbon Monoxide Releases- 2576,8%; Other Releases- 1581,5%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/4_Kearl_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Imperial Oil Resources Limited, Kearl Oil Sands Processing Plant and Mine 2019 Releases and Disposals (Tonnes): Particulate Matter Releases- 24564,81%, Carbon Monoxide Releases- 2271,8%, Volatile Organic Compound Releases- 2265,7%; Nitrogen Oxide Releases- 723,2%; Other Releases- 255,1%; Tailings- 238,1%; Other Disposals and Transfers- 43,0%.'
                        },
                        {
                            src:
                                '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/5_MuskegJackpine_R5_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Canadian Natural Upgrading Ltd., Canadian Natural Upgrading Limited Muskeg River Mine and Jackpine Mine 2019 Releases and Disposals (Tonnes): Tailings- 23716,65%; Particulate Matter Releases- 6381,18%; Volatile Organic Compound Releases- 4828,13%; Nitrogen Oxide Releases- 1014,3%; Other Releases- 359,1%; Carbon Monoxide Releases- 152,0%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/6_Suncor_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Suncore Energy Oil Sands Limited Partnership, Suncor Energy Inc. Oil Sands 2019 Releases and Disposals (Tonnes): Particulate Matter Releases- 36725,39%; Volatile Organic Compound Releases- 14807,16%; Sulphur Dioxide Releases- 13404,14%; Nitrogen Oxide Releases- 13110,14%; Tailings- 9516,10%; Carbon Monoxide Releases- 3216,3%; Other Releases- 2346,3%; Other Disposals and Transfers- 748,1%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/substances/7_Syncrude_RelDisp.PNG',
                            type: 'image',
                            altText:
                                'Syncrude Canada Ltd., Syncrude Canada Ltd 2019 Releases and Disposals (Tonnes): Sulphur Dioxide Releases- 27763,33%; Tailings- 17490,21%; Nitrogen Oxide Releases- 13322,16%; Particulate Matter Releases- 11731,14%; Volatile Organic Compound Releases- 5728,7%; Carbon Monoxide Releases- 4609,5%; Other Releases- 2992,3%; Other Disposals and Transfers- 896,1%.'
                        }
                    ],
                    loop: true,
                    caption: 'NPRI substances reported for oil sands mining facilities.',
                    type: 'slideshow'
                }
            ]
        },
        {
            title: 'NPRI substances reported for oil sands mining facilities',
            panel: [
                {
                    title: 'NPRI substances reported for oil sands mining facilities',
                    content: `For more information on the use and interpretation of NPRI data, please see our [guide](https://www.canada.ca/en/environment-climate-change/services/national-pollutant-release-inventory/using-interpreting-data.html).
Note that even though the Muskeg River and Jackpine Mines are stand alone mines, for the purposes of NPRI reporting, Canadian Natural Resources reports information for them as one facility.

It can be challenging to make direct comparisons between these facilities. While all of the facilities are involved in the extraction and processing of bitumen, their operations differ. Some facilities, such as the Kearl and Fort Hills mines, are primarily mines and do not upgrade their bitumen on-site. These facilities generally have particulate matter (PM) as a much larger proportion of their reported releases. Facilities that have upgraders on-site generally report larger amounts of sulphur dioxide (SO<sub>2</sub>) releases.

You can explore each facility using satellite imagery.`,
                    type: 'text'
                },
                {
                    config:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/ReleasesandDisposalsbyMiningFacilitiesin2019(satellite).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Criteria air contaminant releases from oil sands mines',
            panel: [
                {
                    title: 'Criteria air contaminant releases from oil sands mines',
                    content: `Reported Criteria Air Contaminant (CAC) emissions from oil sands surface mining operations have increased since 2010, ranging between 225,080 (2010) tonnes and 243,000 (2019) tonnes released per year. At the same time, production from these facilities has increased significantly, going from 357 million barrels produced in 2010 to 587 million barrels produced in 2019, an increase of over 60%. As a result, the amount of releases per barrel of oil produced from these operations has gone down steadily and significantly, decreasing 24% between 2010 and 2019.`,
                    type: 'text'
                },
                {
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/Criteria air contaminant releases from oil sands mines_1.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: 'Year',
                        yAxisLabel: 'CAC releases',
                        title: 'Oil Sands Surface Mining, CAC Releases (tonnes) 2010 to 2019',
                        subtitle: '',
                        type: 'bar'
                    }
                }
            ]
        },
        {
            title: 'Criteria air contaminant releases from oil sands mines',
            panel: [
                {
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/Criteria air contaminant releases from oil sands mines_2.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: 'Year',
                        yAxisLabel: 'Barrels per year',
                        title: 'Barrels Per Year produced by Alberta Surface Mines 2010 to 2019',
                        subtitle: '',
                        type: 'bar'
                    }
                },
                {
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/Criteria air contaminant releases from oil sands mines_3.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: 'Year',
                        yAxisLabel: 'Releases per 1000 barrels',
                        title: 'CAC releases (tonnes) per 1000 barrels of Bitumen for 2010 to 2019',
                        subtitle: '',
                        type: 'line'
                    }
                }
            ]
        },
        {
            title: 'Mine tailings reported',
            panel: [
                {
                    title: 'Mine tailings reported',
                    content: `Processing mined oil sands to remove the bitumen leaves behind a mix of water, sand, and clay with trace amounts of metals, polycyclic aromatic hydrocarbons (PAHs) and other volatile organic compounds (VOCs). This left-over mixture, known as mine tailings, is disposed of in purpose-built, monitored [tailings impoundment areas](https://www.nrcan.gc.ca/mining-materials/publications/13924).

In 2019, oil sands mining operations reporting to the NPRI reported information on 49 substances disposed of in tailings impoundment areas, totalling 67,940 tonnes.

Substances disposed of as tailings can be grouped into four broad categories:

1. Metals (40,257 tonnes);
2. Volatile organic compounds (VOCs) (8,099 tonnes);
3. Polycyclic Aromatic Hydrocarbons (PAHs) (360 tonnes); and
4. Others (16,118 tonnes).

While the tailings reported by these mines have large amounts of manganese, ammonia (NH₃), and phosphorus, the substances of greater concern are some of the volatile organics, such as benzene (C<sub>6</sub>H<sub>6</sub>), toluene (C<sub>7</sub>H<sub>8</sub>), ethylbenzene (C<sub>8</sub>H<sub>10</sub>), and xylene (C<sub>8</sub>H<sub>10</sub>) (labelled as BTEX in the figure), and 19 different polycyclic aromatic hydrocarbons (PAHs).`,
                    type: 'text'
                },
                {
                    src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/Mine tailings reported.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: '',
                        yAxisLabel: 'Substances',
                        title: 'Top 10 substances in oil sands tailings reported to the NPRI in 2019',
                        subtitle: '',
                        type: 'bar'
                    }
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
- Syncrude Canada Aurora North Mine Site, and Syncrude Canada Ltd. (formerly Mildred Lake).`,
                    type: 'text'
                },
                {
                    images: [
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/AuroraNorth_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Syncrude Canada Ltd., Aurora North Mine Site 2019 Tailings (Tonnes): Ammonia- 412,14%; Manganese- 1755,60%; PAH- 35,1%; Phenol- 3,0%; Phosphorus- 155,5%; Other substances- 597,20%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/FortHills_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Fort Hill Energy L.P., Fort Hills Oil Sands 2019 Tailings (Tonnes): Ammonia- 537,6%; BTEX (benzene, toluene, ethylbenzene, xylene)- 4,0%; Manganese- 4925,59%; PAH- 0,0%; Phosphorus- 1650,20%; Other substances- 1205,15%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/Horizon_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Canadian Natural Resources Limited, Horizon Oil Sands Processing Plant and Mine 2019 Tailings (Tonnes): Ammonia- 273,5%; BTEX (benzene, toluene, ethylbenzene, xylene)- 373,6%; PAH- 104,2%; Other substances- 4950,87%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/Kearl_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Imperial Oil Resources Limited, Kearl Oil Sands Processing Plant and Mine 2019 Tailings (Tonnes): Ammonia- 116,49%; BTEX (benzene, toluene, ethylbenzene, xylene)- 0,0%; Manganese- 38,16%; PAH- 0,0%; n-Hexane- 3,1%; Phosphorus- 49,21%; Other substances- 32,13%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/Muskeg_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Canadian Natural Upgrading Ltd., Canadian Natural Upgrading Limited Muskeg River Mine and Jackpine Mine 2019 Tailings (Tonnes): Ammonia- 193,1%; BTEX (benzene, toluene, ethylbenzene, xylene)- 303,1%; Manganese- 7735,33%; PAH- 52,0%; n-Hexane- 4370,19%; Phosphorus- 5984,25%; Other substances- 5082,21%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/Suncor_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Suncor Energy Oil Sands Limited Partnership, Suncor Energy Inc. Oil Sands Tailings (Tonnes): Ammonia- 577,6%; BTEX (benzene, toluene, ethylbenzene, xylene)- 2259,24%; Manganese- 1794,19%; PAH- 132,1%; Phenol- 72,1%; Phosphorus- 2381,25%; Other substances- 2311,24%.'
                        },
                        {
                            src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/tailings/Syncrude_Tailings.PNG',
                            type: 'image',
                            altText:
                                'Syncrude Canada Ltd., Syncrude Canada Ltd. 2019 Tailings (Tonnes): Ammonia- 713,4%; BTEX (benzene, toluene, ethylbenzene, xylene)- 1237,7%; Manganese- 9460,54%; PAH- 36,0%; Phenol- 8,0%; Phosphorus- 4094,24%; Other substances- 1942,11%.'
                        }
                    ],
                    loop: true,
                    caption: 'Reported mine tailings from oil sands surface mining facilities',
                    type: 'slideshow'
                }
            ]
        },
        {
            title: 'Reported mine tailings from oil sands surface mining facilities',
            panel: [
                {
                    title: 'Reported mine tailings from oil sands surface mining facilities',
                    content: `The facility with the most tailings disposed of in 2019 was Canadian Natural Resources Muskeg River and Jackpine Mine sites accounting for 35% of all tailings reported by the seven oil sands surface mining operations. Manganese made up the largest amount of tailings for four of the reporting facilities.

You can explore each facility using satellite imagery.`,
                    type: 'text'
                },
                {
                    config:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/ReleasesandDisposalsbyMiningFacilitiesin2019(satellite).json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Trends in mine tailings reported from surface mining facilities',
            panel: [
                {
                    title: 'Trends in mine tailings reported from surface mining facilities',
                    content: `Total reported tailings from oil sands surface mining facilities have increased by 56% between 2010 and 2019, an increase of 24,517 tonnes. Five of these facilities have been in production and have reported to the NPRI since before 2010. Of these facilities, four reported increases in their total tailings disposals between 2018 and 2019 and three reported decreases.`,
                    type: 'text'
                },
                {
                    config:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/TailingsfromMiningFacilities2010to2019(timeslider).json',
                    type: 'map',
                    timeSlider: {
                        range: [2010, 2019],
                        start: [2010, 2019],
                        attribute: 'Reporting_Year___Année'
                    }
                }
            ]
        },
        {
            title: 'In situ facilities',
            panel: [
                {
                    title: 'In situ facilities',
                    content: `The other main method used for extracting bitumen from the oil sands is in-situ. Bitumen is usually too heavy and viscous to be pumped out from deep underground using conventional means and must be heated up before extraction. This heat is provided by injecting high pressure steam deep underground to heat up the bitumen so it can be pumped out of the ground.

There are various different methods for steam injection. Two of the primary methods used for in-situ extraction are Cyclic Steam Stimulation (CSS) and Steam Assisted Gravity Drainage (SAGD). CSS uses one pipe drilled into the ground. Steam is injected and then the heated bitumen is pumped back up the same pipe. In this way, the well is cycled between injection and production. SAGD uses two drill holes that run horizontal after reaching the appropriate depth. Steam is injected into one pipe and the heated bitumen flows into and is pumped out of the other pipe. SAGD wells are able to continuously produce instead of being cycled between injection and production like CSS.

Compared to surface mining, in-situ operations are much more energy intensive, as energy is required to create the steam that is injected. On the other hand, in-situ methods are much less disruptive to the natural habitat, as the operation has a much smaller footprint and the land does not have to be cleared to access the bitumen. In-situ facilities also do not produce tailings that need to be impounded and managed.`,
                    type: 'text'
                },
                {
                    src: '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/Slide 10 - SAGD vs CSS.jpg',
                    type: 'image',
                    altText:
                        'A diagram demonstrating steam assisted gravity drainage and cyclic steam stimulation processes in oil sands extraction.'
                }
            ]
        },
        {
            title: 'NPRI releases from in-situ facilities',
            panel: [
                {
                    title: 'NPRI releases from thermal in-situ facilities',
                    content: `There were 30 in-situ facilities that reported to the NPRI in 2019. The primary emission sources from these facilities are the combustion equipment used to generate steam and the compression equipment, which runs on fossil fuel, used to inject the steam underground.

In-situ facilities reported 70,500 tonnes of releases to air in 2019 and very little else. As discussed, the process does not produce tailings. Recovered water from the injected steam is generally treated on-site and reused.

The air releases reported by in-situ facilities is almost entirely (98%) criteria air contaminants (CACs), which was mostly carbon monoxide (CO) (23,000 tonnes) and nitrogen oxides (NOx) (24,000 tonnes). Other CACs reported were sulphur dioxide (SO<sub>2</sub>) (17,000 tonnes), volatile organic compounds (VOCs) (2,800 tonnes) and fine particulate matter (PM) (2,000 tonnes). Non-CAC substances reported, albeit in very small amounts, included the following:

- Ammonia (NH<sub>3</sub>);
- Benzene (C<sub>6</sub>H<sub>6</sub>);
- Hexanes (C<sub>6</sub>H<sub>14</sub>); and
- Chlorine (Cl<sub>2</sub>)`,
                    type: 'text'
                },
                {
                    config:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/ReleasestoAirbyInSituFacilitiesforAllSubstancesin2019.json',
                    type: 'map'
                }
            ]
        },
        {
            title: 'Trends in NPRI substances released from in-situ facilities',
            panel: [
                {
                    title: 'Trends in NPRI substances released from in-situ facilities',
                    content: `The number of in-situ facilities reporting to the NPRI remained the same in 2019 as in 2010, at 30 facilities.  The number of facilities peaked in 2015 at 38. For the purpose of this overview and incorporating all facilities that support oil sands extraction, batteries and compressor stations are included in the data.

This change in the number of facilities reporting over time follows changes in the sector as a whole. The price of oil rose significantly in 2009 and 2010, and remained high until 2015. This fueled significant growth in this sector, with many new facilities coming online and reporting for the first time. A significant drop in the price of oil in 2015 led to a slowdown in the number of new facilities coming online, and even to some facilities suspending operations.`,
                    type: 'text'
                },
                {
                    config:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/ramp-config/en/ReleasestoAirbyInSituFacilitiesforAllSubstances2010to2019(timeslider).json',
                    type: 'map',
                    timeSlider: {
                        range: [2010, 2019],
                        start: [2010, 2019],
                        attribute: 'Reporting_Year___Année'
                    }
                }
            ]
        },
        {
            title: 'NPRI releases from in-situ facilities',
            panel: [
                {
                    title: 'NPRI releases from in-situ facilities',
                    content: `Reported CAC emissions from in-situ operations have increased along with the increase in the number of facilities reporting since 2010.

The increase in emissions seen in 2017 is likely due to a rebound in the price of oil in that year. Between 2018 and 2019, 18 in situ facilities reporting to the NPRI increased their reported CAC emissions.

While in-situ facilities have reported an increase in reported CAC emissions, this has been coupled with an even larger and steady increase in bitumen production. Bitumen production from in-situ operations increased over 102% between 2010 and 2019. CAC releases per barrel produced have decreased substantially over this time, almost 21%.`,
                    type: 'text'
                },
                {
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/NPRI releases from thermal in-situ facilities_1.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: 'Year',
                        yAxisLabel: 'CAC Emissions (tonnes)',
                        title: 'CAC Emissions from In-Situ Facilities reporting to the NPRI, 2010-2019',
                        subtitle: '',
                        type: 'bar'
                    }
                },
                {
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/charts/en/NPRI releases from thermal in-situ facilities_2.csv',
                    type: 'chart',
                    options: {
                        xAxisLabel: 'Year',
                        yAxisLabel: 'Barrels per year',
                        title: 'Bitumen production from In-Situ Oil Sands from 2010-2019 (Barrels per year)',
                        subtitle: '',
                        type: 'line'
                    }
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
                    src:
                        '410b88da-0ed1-4749-903f-5e76c24e2e5f/assets/en/GettyImages-516166467__1554821531978__w1920.jpg',
                    type: 'image',
                    altText: 'An aerial view of the Athabasca River.'
                }
            ]
        },
        {
            title: 'Pollution in your neighborhood',
            panel: [
                {
                    title: 'Pollution in your neighborhood',
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

- [Single year tables](https://open.canada.ca/data/en/dataset/1fb7d8d4-7713-4ec6-b957-4a882a84fed3),
  - annual tables of our most popular data fields. One table for each of the last 3 years
- [Five year summaries](https://open.canada.ca/data/en/dataset/ea0dc8ae-d93c-4e24-9f61-946f1736a26f)
  - summaries by air, water or land releases grouped by province, industry type or substance
- [All years datasets](https://open.canada.ca/data/en/dataset/40e01423-7728-429c-ac9d-2954385ccdfb)
  - annual data since 1994 on pollutant quantities, comments and geolocations
- [Complete reported datasets](https://open.canada.ca/data/en/dataset/06022cc0-a31e-4b4c-850d-d4dccda5f3ac)
  - comprehensive datasets going back to 1994`,
                    type: 'text'
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
