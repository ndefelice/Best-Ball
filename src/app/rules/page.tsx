import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/header';

import styles from './page.module.scss';
import { SegmentedControl } from '@blueprintjs/core';

export default function Home() {
  return (
    <div className={styles.segmentedControl}>
      <Header />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <strong>Overview</strong>
          </AccordionTrigger>
          <AccordionContent>
            In best ball, teams after the draft are final! There is NO 
            trading and NO weekly waivers (aka. NO adding or dropping players).
          </AccordionContent>
          <AccordionContent>
            Lineups don&apos;t need to be set going forward. Sleeper will
            automatically insert your top scoring players into your lineup for each week.
          </AccordionContent>
          <AccordionContent>
            There are also NO weekly matchups. The standings for each league are
            determined by your team&apos;s total points scored (PF).
          </AccordionContent>
          <AccordionContent>
            In this torunament, 48 teams are randomly placed into 4 separate, 12 team
            leagues on Sleeper. At the end of the regular season (14 weeks), the
            top 3 scoring teams from each league merge for a playoff. The bottom half (6) teams
            in points for Weeks 15 and 16 are eliminated from the playoffs. In Week 17, 
            championship week, the final 3 teams compete for 1st, 2nd, and 3rd place payouts. 
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <strong>Prize Pool</strong>
          </AccordionTrigger>
          <AccordionContent>
            This league is a <strong>$25 buy-in</strong>. If you don&apos;t pay
            by Week 4 of the NFL season (September 25th), you will be eliminated
            from the tournament.
          </AccordionContent>
          <AccordionContent>
            • <strong>1st place:</strong> $720 (60% of the prize pool)
          </AccordionContent>
          <AccordionContent>
            • <strong>2nd place:</strong> $360 (30% of the prize pool)
          </AccordionContent>
          <AccordionContent>
            • <strong>3rd place:</strong> $120 (10% of the prize pool)
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <strong>League Settings</strong>
          </AccordionTrigger>
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
            <strong>Draft format:</strong> Snake Draft, 60 sec per pick
          </AccordionContent>
          <AccordionContent>
            <strong>Roster spots:</strong>
          </AccordionContent>
          <AccordionContent>• 1 QB,</AccordionContent>
          <AccordionContent>• 2 RB,</AccordionContent>
          <AccordionContent>• 3 WR,</AccordionContent>
          <AccordionContent>• 1 TE,</AccordionContent>
          <AccordionContent>• 1 FLEX,</AccordionContent>
          <AccordionContent>• 12 Bench</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
