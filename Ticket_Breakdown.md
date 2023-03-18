# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 Database changes


#### Ticket 1.1 Create new table `facility_agent`

Need to create new table `facility_agent` for storing Facility Agent's id with structure:
`facility_id | agent_id | facility_agent_id`

**Result**: Database migration script

**Estimate**: 2h

#### Ticket 1.2 Import agents data

Need to import data to new table for existing agents. 
Facility would give CSV data which we would map on our database. 
We can use Agent's `email`/`phone`/`name` values for matching. 

**Result**: Migration script which will be run from terminal with command:

`npm run migration:facility-external-id --file {PATH}`

**Estimate**: 2d

### Ticket 2 UI changes

Need to add ability for Facilities to edit agent's external id.
(It could be new page/application or changing an existing one)

**Result**: Facility manager opens `/agent/{id}` page and see new editable field there `External Id`

**Estimate**: 4h

### Ticket 3 Code changes

#### Ticket 3.1 Change `getShiftsByFacility`to support external id for Agent

Need to change `getShiftsByFacility` to return `facility_agent_id` inside Shift metadata.

**Result**: Fixed tests

**Estimate**: 2h

#### Ticket 3 Change `generateReport` to support external id for Agent

Need to change `generateReport` to show `facility_agent_id` in report

**Result**: Generated reports will show external agent's id

**Estimate**: 2h