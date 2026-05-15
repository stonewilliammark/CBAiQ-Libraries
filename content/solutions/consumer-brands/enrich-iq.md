# Enrich iQ

## Metadata

- Solution name: Enrich iQ
- Alternate or legacy names: CRM Enrichment (CommBank iQ)
- Status: Emerging
- Vertical: Consumer Brands
- Commercial owner: Tom Pinnell
- Technical owner: Anthony Sparke
- Standard LOE [Link](https://commbank.sharepoint.com/:w:/r/sites/IB%26M-CommBankiQCustomer/Shared%20Documents/Product%20%26%20Tech/Product%20Development/Solution%20catalogue/LEO%20Templates/2025.07_CommBank%20iQ_Letter%20of%20Engagement_Petbarn_Greencross_Enrich%20iQ.docx?d=w13821889af6b4787b5ced2d94cc1517b&csf=1&web=1&e=Ye9UDl) *Client example, required docx template link update*
- Example BD Materials (*links to be provided*)
- Example Deliverables [Link](https://commbank.sharepoint.com/:x:/r/sites/IB&M-CommBankiQCustomer/_layouts/15/Doc.aspx?sourcedoc=%7B9F45BCC9-3B19-4FC6-BB1B-EE129CDB4475%7D&file=EnrichiQ%20-%20Petbarn%20Postcode%20-%20202510.csv&wdLOR=c92CFA20D-BB2E-4971-9D39-2F208E6D256E&action=default&mobileredirect=true)
- SOP [Link](https://commbank.atlassian.net/wiki/spaces/CIQ/pages/1310164833/SOP+7+EnrichiQ)
- GitHub Repo [Link](https://github.com/CBA-IB-M-CommBank-iQ-Analysts-RSTD/Enrichment-iQ)
- Last updated: 8 May 2026
- Version: 1.00

## Solution overview

### What this solution is

Enrich iQ is a CRM enrichment solution that appends privacy-compliant, transaction-derived customer insights to a client's existing customer database. It enhances each record with demographic, behavioural and spend-based attributes using microsegment modelling. Outputs are delivered as a flat-file extract (CSV) suitable for direct CRM ingestion.

### What problem or need it addresses

Organisations typically lack visibility into how their customers spend outside their own brand. This limits personalisation, targeting and growth decisions. Enrich iQ fills this gap by adding external behavioural context to first-party data.

### Who it is for

Consumer-facing organisations with an existing CRM, particularly marketing, CRM and analytics teams focused on customer growth, retention and personalisation.

### Positioning

Position Enrich iQ as a CRM enrichment layer powered by real transaction data that improves the effectiveness of existing customer data and marketing activity. It is not a standalone platform or a raw data product.

### What this solution is and is not for

This solution is for:

- Consumer-facing organisations with an existing CRM.
- Marketing, CRM and analytics teams.
- Businesses focused on customer growth, retention and personalisation.

This solution is not for:

- Building or replacing a CRM.
- Providing individual-level banking data.
- End-to-end campaign execution or analytics.

## Customer needs and decisions supported

### Customer needs addressed


- Better understand customer behaviour beyond the client’s own channels.
- Improve targeting and personalisation.
- Increase marketing efficiency and customer value.

### Common questions

*[Initial themes drawn from the client lead description and the Petbarn / Greencross LOE are listed below as a starting point.]*

**Core question 1 — Who are my customers and how should I prioritise them?**

- Which customer segments are highest value or highest growth?
- What does the demographic and lifestyle profile of my customers look like?

**Core question 2 — How do my customers spend outside my brand?**

- What share of wallet do I hold within my category?
- Where are competitors winning spend that could come to me?
- Where is white space for new ranges or private-label brands?

**Core question 3 — How should I target and personalise my marketing?**

- Which attributes can I use to tailor offers and messaging?
- How do my customers behave online versus in-store?

### Supporting decisions

### Supporting decisions

| Decision | How this solution helps | What it does not answer |
|---|---|---|
| Which customers should we prioritise? | Identifies high-value and high-growth segments using spend and behavioural indicators. | Commercial constraints or campaign design. |
| How should we target and personalise? | Provides enriched attributes for segmentation and tailored offers. | Creative, channel or execution strategy. |
| Where are we missing share of wallet? | Highlights competitor engagement and category spend gaps. | Underlying drivers of behaviour. |

### How the data answers these questions

*[To be completed alongside client lead validation of the Common questions section above.]*

| Question | Data and capability used | How a client lead would walk through it |
|---|---|---|
| | | |

### Common customer questions or objections

Insights are aggregated and de-identified — no individual banking data is shared and no transfer of personal information is required.

Outputs are designed for direct CRM ingestion and activation, so the client can use enriched attributes immediately within their existing marketing workflows.

*[Further objections to be added from client lead input — e.g. coverage, refresh cadence, sample size by microsegment, integration with existing CDP or CRM tools.]*

## Delivery options and capabilities

### Delivery options

Enrich iQ is delivered as a batch flat-file extract (CSV) covering the full customer base, suitable for ingestion into the client's CRM. The example deliverable referenced in the catalogue is a postcode-level enrichment file.


### Core capabilities

| Capability area | Current-state capability |
|---|---|
| Microsegment enrichment | Microsegment-based enrichment of CRM records with near 1:1 precision, privacy-compliant by design. |
| Demographics and lifestyle | Demographic, lifestyle and affluence attributes appended at microsegment level. |
| Category spend | Category spend, frequency and penetration metrics, including share of wallet. |
| Brand engagement | Brand preference indicators and target-brand share of wallet within category. |
| Competitor share of wallet | Competitor share of wallet insights, including competitor engagement and category spend gaps. |
| Channel behaviour | Online versus in-store spend behaviour, including BNPL usage. |
| Bespoke features | Option to define bespoke features aligned to client needs. |

## Components

Based on the commercial source document, Enrich iQ is delivered as a batch extract of enriched attributes, typically as a CSV for CRM ingestion, across the full customer base. Any recurring Excel-based dashboard, monthly refresh or historical trend views should be confirmed separately before being presented as current-state delivery.

### Metrics

| Category | Metric | What it measures | Available values |
|---|---|---|---|
| Demographic profile | Age band — penetration, proportion and affinity | Proportion of microsegment by age band | — |
| Demographic profile | Gender — penetration, proportion and affinity | Proportion of microsegment by gender | — |
| Demographic profile | Lifestage — penetration, proportion and affinity | Proportion of microsegment by lifestage | — |
| Demographic profile | Affluence — penetration, proportion and affinity | Proportion of microsegment by Affluence bands | — |
| Demographic profile | Average Affluence | Average Affluence value within the microsegment | — |
| Demographic profile | Crowds — penetration, proportion and affinity (Optional) | Proportion of microsegment by Q.Crowds | — |
| Demographic profile | BMP — penetration, proportion and affinity | *[Definition not provided in source Excel — to confirm with analyst owner.]* | — |
| Brand and category engagement | Spend per Capita | Average spend per resident within microsegment. Uses MMiQ industry groupings. | — |
| Brand and category engagement | Transactions per Customer | Average transactions per category customer within microsegment | — |
| Brand and category engagement | Brand share of wallet | Target brand spend within category. The target brand must sit within the category. Requires brand-customer input; calculated as an average score metric. | — |
| Brand and category engagement | Category Share of Wallet | Proportion of total retail spend that is spent within category | — |
| Brand and category engagement | Customer Penetration | Proportion of residents who spent with category | — |
| Brand and category engagement | Affinity vs base | Index of penetration against the national average (microsegment penetration / national penetration) | — |
| Channel behaviour — BNPL | BNPL Penetration | Proportion of residents who spent with BNPL | — |
| Channel behaviour — BNPL | BNPL Affinity | Index of BNPL penetration against the national average | — |
| Channel behaviour — BNPL | BNPL Share of Wallet | Proportion of total retail spend that is within BNPL | — |
| Channel behaviour — BNPL | BNPL Share of Wallet Affinity | Index of BNPL share of wallet against the national average | — |
| Channel behaviour — Online | Online Penetration | Proportion of residents who have shopped online at least once | — |
| Channel behaviour — Online | Online Penetration Affinity | Index of online penetration against the national average | — |
| Channel behaviour — Online | Discretionary Online Penetration | Proportion of residents who have shopped Discretionary online | — |
| Channel behaviour — Online | Discretionary Online Penetration Affinity | Index of Discretionary online penetration against the national average | — |
| Channel behaviour — Online | Essential Online Penetration | Proportion of residents who have shopped Essential online | — |
| Channel behaviour — Online | Essential Online Penetration Affinity | Index of Essential online penetration against the national average | — |
| Channel behaviour — Online | Online Share of Wallet | Proportion of total retail spend that was purchased online | — |
| Channel behaviour — Online | Online Share of Wallet Affinity | Index of online share of wallet against the national average | — |
| Channel behaviour — Online | Discretionary Online Share of Wallet | Proportion of total Discretionary spend that was purchased online | — |
| Channel behaviour — Online | Discretionary Online Share of Wallet Affinity | Index of Discretionary online share of wallet against the national average | — |
| Channel behaviour — Online | Essential Online Share of Wallet | Proportion of total Essential spend that was purchased online | — |
| Channel behaviour — Online | Essential Online Share of Wallet Affinity | Index of Essential online share of wallet against the national average | — |
| Channel behaviour — Online | Online Spend per Capita | Average microsegment spend per capita online | — |
| Channel behaviour — Online | Discretionary Online Spend per Capita | Average microsegment Discretionary spend per capita online | — |
| Channel behaviour — Online | Essential Online Spend per Capita | Average microsegment Essential spend per capita online | — |
| Macro-category spend | Discretionary Spend per Capita | Average microsegment Discretionary spend per capita | — |
| Macro-category spend | Essential Spend per Capita | Average microsegment Essential spend per capita | — |
| Industry deep-dive (Optional) | Industry Spend per Capita | Average spend per resident within microsegment | — |
| Industry deep-dive (Optional) | Industry Transactions per Customer | Average transactions per category customer within microsegment | — |
| Industry deep-dive (Optional) | Industry Category Share of Wallet | Proportion of total retail spend that is spent within category | — |
| Industry deep-dive (Optional) | Industry Penetration | Proportion of residents who spent with category | — |
| Industry deep-dive (Optional) | Industry National Affinity | Index of penetration against the national average | — |

### Dimensions

The Solution Components tab does not record any standalone dimensions for Enrich iQ. The dimensional structure is embedded in the configurable inputs below — each customer record is enriched at the level of a microsegment defined by the chosen geography and demographic attributes, plus brand-customer status where a target brand is specified.

| Dimension | Available values |
|---|---|
| — | — |

### Configurable inputs

| Input | What the client provides |
|---|---|
| Target brand (Required) | Brand of focus for the customer universe. Source notes record this as "Yes/No" — to confirm whether the input captures target-brand presence as a flag or the brand name itself. |
| Industry deep dive (Optional) | Industries to run industry-level metrics on. Only relevant for target-brand projects. |
| Time Period (Required) | Number of months for analysis. Default is 12 months. Used for both microsegment logic and reporting metrics. |
| Geography (Required) | Geographic level for segmentation. Available levels are SA1, SA2, SA3, SA4 and Postcode. Suburb and State are on the roadmap. Select one only. Care needed around data size if too many microsegments are produced. |
| Demographics (Optional) | Demographic attributes for segmentation. Age band and Gender are built. Affluence, Lifestage, Crowds and Family Flag are on the roadmap. Select none, one, or multiple. Underlying data covers all ages across 12 bands. |

### Edge cases and exceptions

The components above describe the standard solution. The following items are exceptions worth being aware of when discussing scope with clients, grouped by type.

**Add-ons versus standard.** The Crowds demographic profile metric, the Industry deep-dive metric set, and the Industry deep dive configurable input are recorded as Optional in the source Excel. All other metrics and the remaining configurable inputs are Standard or Required. There is no formally named add-on package documented for Enrich iQ.

**Constraints on what's available.**

- Brand share of wallet only works where the target brand sits within a defined category, and requires a brand-customer input.
- Industry deep-dive metrics are only relevant for target-brand projects.
- Care is needed around data size if the chosen geography and demographic combination produces a very large number of microsegments.

## Pricing and cost notes

*[Placeholder — to be populated with client lead and analyst input. Known price levers from current materials include the geography level chosen, the number and type of demographic attributes used to define microsegments, whether a target brand is in scope, the number of industries selected for industry deep-dive, and the time period covered.]*

## Relationship to other solutions

### Relationship to adjacent solutions

Enrich iQ sits within the Consumer Brands solution family. It complements the broader CommBank iQ analytics offering by working at customer record level, where most other Consumer Brands solutions work at brand, market or location level.

It works alongside Local Consumer Intelligence, which focuses on geographic insights rather than CRM enrichment.


### Known overlaps

Enrich iQ shares microsegment methodology with geodemographic solutions in the portfolio. The key practical distinction is that Enrich iQ operates at customer record level (appending attributes to the client's own CRM), whereas geodemographic solutions describe locations or geographies rather than identified customer records.

The practical distinction:

- Enrich iQ answers, "Who are my customers and how do they behave outside my brand, at the level of my own CRM records?"


## Risks, gaps and dependencies

### Known gaps or ambiguities

The definition of the BMP demographic profile metric is not provided in the source Excel and needs to be confirmed with the analyst owner.

The Target brand input row has "Yes/No" in its notes column, which is at odds with the definition ("Brand of focus for customer universe"). To confirm whether the input captures target-brand presence as a flag or the brand name itself.

### Key risks in how the solution is described or applied

- Misunderstood as individual-level banking data, when in fact it is microsegment-based enrichment.
- Overlap confusion with broader analytics, CDP or campaign management capabilities — Enrich iQ enriches the client's existing CRM data and does not replace any of those tools.

### Dependencies

- Quality of the client's CRM data, which determines how cleanly enriched attributes can be matched and used.
- The client's ability to ingest and activate enriched attributes within their existing tools.
- Internal client capability to execute targeted marketing based on the enriched insights.

## Appendix

### Parking lot — items captured but not currently delivered

Inclusion here does not imply a commitment to deliver.

**Metrics not currently delivered.**


**Dimensions not currently delivered.**


**Add-ons or packages scoped but not currently delivered.**


**Other items captured but not currently delivered.**


### Change log

| Version | Date | Author | Summary of changes |
|---|---|---|---|
| 1.00 | 8 May 2026 | Mantas Zegeris-Kaleda | Initial draft from catalogue Excel and client lead description. |
