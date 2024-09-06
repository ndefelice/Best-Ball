import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Header from "@/components/header"
  
  export default function Home() {
    return (
      <div>
        <Header />
        <Accordion type="single" collapsible>
  
          <AccordionItem value="item-1">
            <AccordionTrigger><strong>Overview</strong></AccordionTrigger>
            <AccordionContent>
            Best ball is a format where the best possible lineup is automatically selected for each team. At the end of the week, 
            the highest-scoring players are automatically inserted into the starting lineup spots.
            </AccordionContent>
            <AccordionContent>
            There is no roster management in this format. That means the team a manager drafts will be their team for the entire season. You don't have
            to worry about weekly waivers, trades, or setting lineups.
            </AccordionContent>
            <AccordionContent>
            There is also no weekly matchups. The standings for each league are determined by your team's total points scored (PF).
            </AccordionContent>
            <AccordionContent>
            In this torunament, teams are randomly placed in individual, 12 team leagues on Sleeper. At the end of the regular season (14 weeks), 
            the top 2 scoring teams from each league merge for a playoff and compete for 1st, 2nd, and 3rd place payouts.
            </AccordionContent>
          </AccordionItem>
    
          <AccordionItem value="item-2">
            <AccordionTrigger><strong>Prize Pool</strong></AccordionTrigger>
            <AccordionContent>
            This league is a <strong>$25 buy-in</strong>. If you don't pay by Week 4 of the NFL season (September 26th), you will be eliminated from the tournament.
            </AccordionContent>
            <AccordionContent>
              •  <strong>1st place:</strong> 70% of the prize pool
            </AccordionContent>
            <AccordionContent>
              •  <strong>2nd place:</strong> 20% of the prize pool
            </AccordionContent>
            <AccordionContent>
              •  <strong>3rd place:</strong> 10% of the prize pool
            </AccordionContent>
          </AccordionItem>
    
          <AccordionItem value="item-3">
            <AccordionTrigger><strong>League Settings</strong></AccordionTrigger>
            <AccordionContent>
            <strong>Number of teams per league:</strong> 12
            </AccordionContent>
            <AccordionContent>
            <strong>Scoring format:</strong> PPR
            </AccordionContent>
            <AccordionContent>
            <strong>Regular Season:</strong> Weeks 1-14
            </AccordionContent>
            <AccordionContent>
            <strong>Playoffs:</strong> Weeks 15-17
            </AccordionContent>
            <AccordionContent>
            <strong>Draft format:</strong> Snake Draft, 90 sec per pick
            </AccordionContent>
            <AccordionContent>
            <strong>Roster spots:</strong> 
            </AccordionContent>
            <AccordionContent>
              •  1 QB, 
              </AccordionContent>
              <AccordionContent>
              •  2 RB, 
              </AccordionContent>
              <AccordionContent>
              •  3 WR, 
              </AccordionContent>
              <AccordionContent>
              •  1 TE, 
              </AccordionContent>
              <AccordionContent>
              •  1 FLEX,
              </AccordionContent>
              <AccordionContent>
              •  12 Bench
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
  