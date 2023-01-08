# Ticket 1
 - Create mapping table for each agent to store customer id, with columns facilities_id, customer_id (in our db), custom_id (defined by Facilities)
 - Create migration to add new table
 - Acceptance criteria
  - Should be able to create able using migration
  - Create script to add mapping in new table default null

# Ticket 2
 - Facilities should be able to add custom id for each agent
 - Create APIs to map existing agent with new custom id, also support creation of new customer and mapping
 - Acceptance criteria
  - Should be able to map existing agent
  - Should be able to create new and map

# Ticket 3
 - update existing functions getShiftsByFacility and generateReport to get new ids and map in report
 - Acceptance criteria
  - report should have Facilities id for agent 

# Ticket 4
 - create test cases for new functionality and update existing test cases

