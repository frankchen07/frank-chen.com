hey snappo, i want you to create an agent who is a mechanic for my current car, a 2003 subaru wrx

create a mechanic agent using the example from agent-prompts.md

as a mechanic, what do you think is appropriate for model reasoning? let’s create priorities and fallbacks

save the prompt to workspace/agents/mechanic.md

for context, I’m basically going to feed you

- pdf receipts of parts bought
- csv of date, odometer, service location, and description of when services were performed, matched by dates of receipts of parts bought, because sometimes i didn’t get a receipt from the service location, along with odometer intervals obtained from the official manual and the next odometer checkup — this was my attempt at tracking when things needed to be done
- csv of cumulative parts and labor costs since receiving the car, including registration costs
- i have a small section on the cumulative parts and labor costs that attempted to track the last thing i had bought and the last service i had so i didn’t forget if i added it or not, but now that i have you, it should be easy to cross compare
- official pdf service manual of the 2003 subaru wrx
- csv of official parts i purchased and the product description and codes, so if i wanted to rebuy some parts, it would be easy to know what was OEM and official

where should i feed these pdfs to?

what I want from you is to help me track what services are coming up next, given the age of the car, given the services performed at the mileages and which intervals are coming up next, and/or when the next services are coming up based on time if mileage isn’t appropriate.
  
i also have details on the the most recent service included

ok, uploaded files in /inbox:

- car-YYYYMMDD are the pdf receipts of parts bought
- subaru-impreza-wrx-2003 csvs are maintenance checklists based on date, odometer, etc // last cost added // cumulative costs and costs since obtaining the car // and official oem part numbers and things // latest fixes is the txt file, is the entire story of the latest engine rebuild

here's some additional information you should know, not sure how to tabulate it:

- coming up, in another 3k miles, the mechanic wants me to come back in to check the oil since there's a new engine now
- it's at 150,211 miles right now, with a completely newly machined head with values and new short block (bottom)
- today 2026-03-23 at 16:00, i got a P0301 code, cylinder 1 misfire at a very low rpm, low speed in the parking lot, which worried me, but it seems it might be normal, everything is still running fine
- gonna try shifting at a slightly higher rpm, 2.8-3k instead of 2.5k
- mechanic asked me to keep the rpms around 2.5 to 3.5k for the duration of 5,000 miles

actually redo the build today, if you didn't account for the fact that there's a service schedule, and my service schedule, and then the fact that we're probably going to have to go off new intervals based on the condition of the car when i received it, but also many parts are at a different "lifespan", engine is completely new, other parts have just been replaced, the body is from 2003, etc

does that make sense? unless you accounted for it already since you have all the materials and you already accounted for it