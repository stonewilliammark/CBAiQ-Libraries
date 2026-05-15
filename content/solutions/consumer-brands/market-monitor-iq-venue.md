# Market Monitor iQ — Venue

## Metadata

- Solution name: Market Monitor iQ — Venue
- Alternate or legacy names: Venue iQ; Hospitality iQ (Venue Insights)
- Status: Established
- Vertical: Consumer Brands
- Commercial owner: Naomi Adamson
- Technical owner: Alistair Knox
- Standard LOE [Link](https://commbank.sharepoint.com/:b:/r/sites/IB%26M-CommBankiQCustomer/Shared%20Documents/Product%20%26%20Tech/Product%20Development/Solution%20catalogue/LEO%20Templates/20250326%20CommBank%20iQ%20-%20Letter%20of%20Engagement%20-%20Urban-Purveyor-Group%20(Pacific-Hunter).pdf?csf=1&web=1&e=yfeGsO) *Client example pdf, required docx template link update*
- Example BD Materials (*links to be provided*)
- Example Deliverables [Link](https://commbank.sharepoint.com/:x:/r/sites/IB%26M-CommBankiQCustomer/Shared%20Documents/Product%20%26%20Tech/Consumer%20Brands/Monthly%20updates/202603/To%20client/202603%20Venue%20iQ%20-%20Endeavour%20Group.xlsx?d=w12ec87cc45bc46c1addd2977e515be74&csf=1&web=1&e=VGXamY&wdLOR=c75EFE1C2-395E-4B21-833A-1253D3F659E0)
- SOP [Link](https://commbank.atlassian.net/wiki/spaces/CIQ/pages/1719963380/Consumer+Brands+-+BAU+Process#Hospitality-iQ-Run)
- GitHub Repo [Link](https://github.com/CBA-IB-M-CommBank-iQ-Analysts-RSTD/council-iq/tree/main/Hospitality%20iQ)
- Last updated: 8 May 2026
- Version: 1.00

## Solution overview

### What this solution is

Market Monitor iQ — Venue is a venue-level competitive intelligence solution that uses CommBank transaction data to help operators understand how a venue is performing against its local market and selected competitors. It brings together local market share, performance drivers, daily trading patterns, customer mix and adjacent industry context to support venue and network decisions, and is currently delivered as a recurring Excel-based dashboard.

### What problem or need it addresses

Operators can usually see their own venue performance but often lack a clear view of what is happening outside their own walls. Venue is designed to close that gap by showing whether performance reflects venue-specific issues, competitor strength, or broader local market conditions. This helps clients assess local potential and make better decisions on investment, offer, service and operations.

### Who it is for

Venue is primarily for hospitality operators that need a local, venue-level understanding of competitive performance and customer behaviour. It is especially relevant for pub, bar and restaurant groups managing one or more venues and wanting to understand how each site is performing within its catchment and competitive set. The source material is hospitality-led, but the underlying use case extends to other venue-based operators where local competitive context matters.

### Positioning

Position Venue as a venue-level competitive intelligence solution for local market performance. Its role is to help operators understand where they are winning or losing, what is driving that performance, and what this means for practical decisions across venue strategy, operations and customer focus.

### What this solution is and is not for

This solution is for:

- Understanding venue performance in local context, including market share against local competitors.
- Diagnosing performance drivers such as customer penetration, spend per customer, spend per transaction and frequency.
- Reading daily trade patterns, including weekday versus weekend and day versus night.
- Understanding customer mix at a venue and where it differs from the local market.
- Putting venue performance in the context of nearby and adjacent categories.

This solution is not for:

- Tracking gambling activity or targeting gambling behaviour. Venue covers Food and Beverage electronic spend only, with no visibility of cash gaming transactions.
- Acquisition or marketing activity that targets vulnerable communities or sensitive demographic groups.
- Standalone investment cases that depend on factors outside transaction data, such as capex, lease, brand or operational inputs.

## Customer needs and decisions supported

### Customer needs addressed

Clients in this space are typically trying to understand whether a venue is under or over-performing relative to its local market, where the headroom for growth sits, when and why customers choose them or competitors, which customer groups they are over or under-indexing with, and how nearby and adjacent categories are moving. Venue brings these into a single recurring view at venue and catchment level.

### Common questions

The questions clients ask in this space cluster around the following core themes. Sub-questions underneath each core question are the more specific asks that come up in client conversations.

**Core question 1 — How is my venue performing against the local market?**

- How does my market share compare to local competitors and how is it trending?
- Is performance being driven by customer penetration, spend per customer, transaction frequency or spend per transaction?
- Where is the headroom for growth in my catchment?

**Core question 2 — Who is using my venue and how does that compare to the local market?**

- Which customer groups (age, affluence, lifestage) are over or under-indexing at my venue compared to the local market?
- Are visitors or residents driving my performance?
- Which customer groups are most likely to be acquisition opportunities?

**Core question 3 — When is my venue being used and how does that pattern compare?**

- How does my trade split across weekday and weekend, and across day and night?
- Where am I winning or losing share by daypart?

**Core question 4 — How is the broader local market and adjacent category context moving?**

- How are competitor venues and the wider local market trending?
- How are adjacent industries moving in my catchment, and how does that help interpret my own performance?

### Supporting decisions

Where the questions above tie to specific decisions, those are noted below:

- Local share and driver questions inform decisions on where to invest, prioritise or intervene across a venue network.
- Daily trade and driver questions inform decisions on offer, service style, pricing and operations, including whether issues are localised, competitor-driven or market-driven.
- Customer mix questions inform decisions on which customer groups to focus on for retention or acquisition.
- Trend and adjacent industry questions inform interpretation of trade changes over time, helping separate internal issues from local market or category movements.

These data points support the decisions above but do not on their own answer the full commercial case, the specific operational change required, the right creative or channel approach, or every external driver of change such as weather, events, site works or competitor refurbishments.

### How the data answers these questions

| Question | Data and capability used | How a client lead would walk through it |
|---|---|---|
| How is my venue performing against the local market? | Brand Share, Customer penetration, Spend Per Customer, Spend per transaction, Transaction frequency; Geographic hierarchy and Region name; Brand and Industry categories | Start with Brand Share at the venue's catchment level, then step into the underlying drivers (penetration, spend per customer, frequency, spend per transaction) to see where the gap to market is coming from. Compare across selected competitor brands and industry context. |
| Who is using my venue and how does that compare to the local market? | Demographics — Sales Contribution; Age, Affluence, Lifestage and Crowd dimensions; Customer type (Visitor/Resident) | Look at sales contribution by demographic for the venue and compare to the local market split. Cross with Visitor/Resident segmentation to see whether performance is driven by people who live nearby or by people travelling in. |
| When is my venue being used and how does that pattern compare? | TODDOW Market Share (peak/off-peak by early/late, day-level); Day of week and Time of day dimensions | Use the TODDOW market share view to compare venue performance across day-of-week and time-of-day cuts, and identify dayparts where share is strongest or weakest relative to the local market. |
| How is the broader local market and adjacent category context moving? | Market/Industry Sales; Brand Share at market level; Industry categories dimension | Read market and industry sales trends in the catchment alongside the venue's own performance, using the configured market industries to surface adjacent category movements that help interpret venue results. |

### Common customer questions or objections

How local is the insight? The source material supports a local catchment-based view, with references to postcode, locality and SA2/SA3 relevance. Geography should be described carefully, particularly in sensitive industry contexts.

Can reporting be tailored? Yes. The draft material explicitly references bespoke markets and competitor groups, with the client defining catchment, target venue, competitor list and reporting industries.

How is it delivered? Current evidence supports recurring Excel-based dashboard delivery with monthly refreshes and historical trend views.

Does this include gambling or gaming insights? No. Venue covers Food and Beverage electronic spend only, not gambling activity or cash gaming transactions.

Are there compliance limits? Yes. Results are subject to minimum sample thresholds and compliance rules, and some outputs may be omitted or aggregated where needed. Demographic insights may be restricted in sensitive contexts, including for venues in the most disadvantaged areas.

## Delivery options and capabilities

### Delivery options

Venue is currently delivered as a recurring Excel-based dashboard with monthly refresh and historical trend views. Subscription term, history depth and refresh cadence beyond monthly are not specified in the current materials and should be confirmed with the client lead and analyst owner.

### Core capabilities

| Capability area | Current-state capability |
|---|---|
| Local market share | Tracks venue share against local competitors and market benchmarks within the configured catchment. |
| Performance drivers | Decomposes performance into customer penetration, spend per customer, spend per transaction and transaction frequency. |
| Daily trade patterns | Provides time-of-day and day-of-week views to read weekday versus weekend and day versus night trade. |
| Customer profiling | Profiles customer mix by age, affluence, lifestage and crowd, where available and appropriate. |
| Adjacent industry tracking | Surfaces broader consumer behaviour and surrounding category performance to help interpret venue results. |
| Custom market design | Supports bespoke market definitions and competitor groups defined by the client. |

## Components

This section captures the components currently documented in the catalogue Excel for this solution. It is the structured technical view of what the solution contains. For specifics on how each metric is calculated, including transaction filters, customer definitions and aggregation rules, please speak directly to the analyst owner.

For Venue, metrics have been re-grouped into three categories that reflect how the solution is used: Driver (volume, share and rate metrics that explain performance against the local market), Customer (demographic mix), and Daily and time-of-day (trade pattern analysis, captured in the Excel as TODDOW).

### Metrics

| Category | Metric | What it measures | Available values |
|---|---|---|---|
| Driver | Market/Industry sales | Sales in period of time | Monthly and yearly plus year-on-year (market and industry) |
| Driver | Customer penetration | Proportion of customers who transact with brand or region market | Monthly and yearly plus year-on-year |
| Driver | Spend per customer | Spend per transacting customer | Monthly and yearly plus year-on-year (including brand, market and industry) |
| Driver | Spend per transaction | Spend per transaction | Monthly and yearly plus year-on-year (including brand, market and industry) |
| Driver | Transaction frequency | Transactions per transacting customer | Monthly and yearly plus year-on-year (including brand, market and industry) |
| Driver | Brand share | Proportion of spend with brand in market | Monthly and yearly plus year-on-year (including brand, market and industry) |
| Customer | Demographics — sales contribution | Proportion of sales by demographics for both market and brand | Age, Affluence, Lifestage, MR |
| Daily and time-of-day | Market share (TODDOW) | Market share by day, peak/off-peak by early/late, day by early/late | Monthly |

### Dimensions

| Dimension | Available values |
|---|---|
| Region name | Client-specific named region for the analysis |
| Geographic hierarchy | SA2, SA3, SA4, Postal Area, Locality, LGA |
| Customer type | Visitor / Resident segmentation |
| Age bands | — |
| Affluence segments | — |
| Lifestage segments | — |
| Crowd segments | — |
| Brand | Specific brand being analysed |
| Industry categories | Client-specific industry classifications |
| Day of week | — |
| Time of day | — (available for daily metrics only) |
| Monthly | — |

### Configurable inputs

| Input | What the client provides |
|---|---|
| Catchment area | Postcode, Locality, SA2 or SA3 defining the venue catchment |
| Target brand | Store name and brand for the target venue |
| Competitor brand list (5+) | Brands defining the competitor group in the catchment location |
| Market industries | Industry groupings (IL3) |

### Edge cases and exceptions

The components above describe the standard solution. The following items are exceptions worth being aware of when discussing scope with clients.

**Add-ons versus standard.** No add-on packages are documented in the catalogue Excel for Venue. The current materials describe a single standard configuration shaped by the four required client inputs (catchment, target brand, competitor list, market industries).

**Constraints on what's available.**

- Time of day cuts are available for daily metrics only.
- Quarterly time views are not currently available; monthly and yearly are the current cadences.
- Several driver metrics that are present in the Brand and Industries modules (Transaction Share, Spend Per Visit, Transaction count, Visits) are not yet live for Venue. These are listed in the appendix.

**Compliance and operational.**

- Results are subject to minimum sample thresholds and compliance rules, and some outputs may be omitted or aggregated where required.
- Insights are restricted for venues in the 30% most disadvantaged areas, including the removal of demographic insights for those venues.
- For pub and bar venues, insights should only be provided to CBA clients that have completed full ESG processes.
- Venue must be described as Food and Beverage electronic spend only, with no visibility of cash gaming transactions.
- Use in sensitive industry settings is subject to internal approval on what reporting, segmentation, geographic granularity and use cases are permitted.

**Sensitive industry guardrails.**

- Venue should only be used within clearly defined governance settings for sensitive industry applications.
- For pub and bar venues, insights should only be provided to CBA clients that have completed full ESG processes.
- The solution should be described as using Food and Beverage electronic spend only, with no visibility of cash gaming transactions.
- Insights should be restricted for venues in the 30% most disadvantaged areas. This includes the removal of demographic insights for venues in these areas.

## Pricing and cost notes

Known price levers from current materials include the number of locations covered, the number of industries included in market and adjacent category context, and the complexity of the catchment definition (for example, bespoke catchments versus standard SA2/SA3 boundaries).

Specific pricing observations and cost-to-serve concerns: *[to be added by client lead and analyst]*.

## Relationship to other solutions

### Relationship to adjacent solutions

Venue sits within the broader Market Monitor iQ family alongside Brand and Industries. It is more venue-led and more locally operational in its application — its focus is the venue and its catchment rather than broader brand or category performance alone — which makes it more relevant for local network, venue and operational decisions.

### Known overlaps

There is overlap with Market Monitor iQ — Brand and Market Monitor iQ — Industries because Venue still includes market share, trend and industry context. The practical distinction is that Venue applies those insights at venue and local catchment level, with stronger emphasis on local competitors, daily patterns and venue customer mix.

The practical distinction:

- Market Monitor iQ — Venue answers, "How is my venue performing against the local market and competitors?"
- Market Monitor iQ — Brand answers, "How is my brand performing against the market overall?"
- Market Monitor iQ — Industries answers, "How is my industry or category performing?"

## Risks, gaps and dependencies

### Known gaps or ambiguities

A key gap is clarity on exactly what has been approved through Comm Comm for reporting in a sensitive industry. That matters because Venue sits in an area where acceptable use, geography, customer segmentation and acquisition framing need to be tightly governed. Within the Market Monitor iQ family, Venue is also the least mature module and is being shaped further through the emerging solutions framework, which means some scope items remain in flux.

### Key risks in how the solution is described or applied

- Reputational damage if the insights appear to enable increased alcohol consumption or gambling targeting, especially in vulnerable communities. 
- How geographic granularity is presented — very local reporting may be seen as more sensitive in this context, particularly if paired with customer or acquisition language.
- Over-claiming what the data covers, as Venue should not be framed in a way that suggests visibility of gambling behaviour.

### Dependencies

- Compliance and minimum sample size rules, which may require suppression or aggregation of results.
- Client inputs to define venues, catchments, competitor sets, market industries and authorised users.
- Successful onboarding before delivery commences.
- Clear internal approval on what reporting, segmentation, geographic granularity and use cases are permitted in sensitive industry settings.

## Appendix

### Parking lot — items captured but not currently delivered

Inclusion here does not imply a commitment to deliver.

**Metrics not currently delivered.**

- Transaction Share (driver group): share of transactions with brand in market, scoped at monthly and yearly plus year-on-year cuts.
- Spend Per Visit (driver group): spend per unique day of transacting, scoped at monthly and yearly plus year-on-year cuts.
- Transaction count (driver group): total transactions, scoped at monthly and yearly plus year-on-year cuts.
- Visits (driver group): total visits as unique customer-and-day, scoped at monthly and yearly plus year-on-year cuts.

**Dimensions not currently delivered.**

- Quarterly time view as a dimension cut.

**Add-ons or packages scoped but not currently delivered.**



**Other items captured but not currently delivered.**



### Change log

| Version | Date | Author | Summary of changes |
|---|---|---|---|
| 1.00 | 8 May 2026 | Mantas Zegeris-Kaleda | Initial draft from catalogue Excel and client lead description. |
