import { Challenge } from './types';

export const defaultCategories = [
  'Speaking',
  'Communication',
  'Teamwork',
  'Creativity',
  'Critical thinking',
  'Quick thinking',
  'Icebreakers',
  'Acting',
  'Roleplay',
  'Debate',
  'Humor'
];

export const initialChallenges: Challenge[] = [
  // Speaking
  { id: '1', text: 'Sell a broken umbrella to the class in 30 seconds.', category: 'Speaking', enabled: true },
  { id: '2', text: 'Give a one-minute presentation on why sleep is essential for human creativity.', category: 'Speaking', enabled: true },
  { id: '3', text: 'Convince the class that learning a second language gives you real super-powers.', category: 'Speaking', enabled: true },
  { id: '4', text: 'Deliver an enthusiastic pitch for a product that silences morning alarm sounds.', category: 'Speaking', enabled: true },
  { id: '5', text: 'Explain a complex topic you love (space, music, or cooking) in under 45 seconds.', category: 'Speaking', enabled: true },
  { id: '6', text: 'Give an impromptu acceptance speech for "Best Listener of the Year".', category: 'Speaking', enabled: true },
  { id: '7', text: 'Deliver a 30-second motivational speech to convince students to drink more water.', category: 'Speaking', enabled: true },

  // Communication
  { id: '8', text: 'Invent a secret two-gesture handshake with the person next to you and demonstrate it.', category: 'Communication', enabled: true },
  { id: '9', text: 'Guide a partner across an imaginary obstacle course using only directional clap signals.', category: 'Communication', enabled: true },
  { id: '10', text: 'Have a 1-minute conversation using only questions.', category: 'Communication', enabled: true },
  { id: '11', text: 'Describe an intricate geometric shape using only hand gestures—your group must guess it.', category: 'Communication', enabled: true },
  { id: '12', text: 'Explain how to tie a shoe without using the words "shoe", "lace", "loop", or "tie".', category: 'Communication', enabled: true },
  { id: '13', text: 'Communicate a 3-step instructions list to your group using only silent facial expressions.', category: 'Communication', enabled: true },
  { id: '14', text: 'Express five different emotions in 20 seconds using only vocal hums.', category: 'Communication', enabled: true },

  // Teamwork
  { id: '15', text: 'Without talking, arrange yourselves in alphabetical order by first name.', category: 'Teamwork', enabled: true },
  { id: '16', text: 'Count to 10 as a group without two people speaking at the same time.', category: 'Teamwork', enabled: true },
  { id: '17', text: 'Form a human chain and pass an imaginary fragile glass sculpture around the circle.', category: 'Teamwork', enabled: true },
  { id: '18', text: 'Work together to build the tallest stable tower using only 5 pens and 3 notebooks on your table.', category: 'Teamwork', enabled: true },
  { id: '19', text: 'Coordinate with your group to stand up from sitting on the floor at the exact same millisecond.', category: 'Teamwork', enabled: true },
  { id: '20', text: 'Synchronize a rhythmic group hand-clap beat that speeds up and slows down together seamlessly.', category: 'Teamwork', enabled: true },
  { id: '21', text: 'As a team, create a silent 5-second human statue depicting "Victory".', category: 'Teamwork', enabled: true },

  // Creativity
  { id: '22', text: 'Explain the concept of the internet to a time-traveler from the year 1800.', category: 'Creativity', enabled: true },
  { id: '23', text: 'Describe the color blue to someone who has never experienced sight.', category: 'Creativity', enabled: true },
  { id: '24', text: 'Come up with three completely new alternative uses for a standard metal paperclip.', category: 'Creativity', enabled: true },
  { id: '25', text: 'Invent a brand new national holiday and explain its traditions and signature dish.', category: 'Creativity', enabled: true },
  { id: '26', text: 'Design a futuristic smartphone feature that solves an everyday campus inconvenience.', category: 'Creativity', enabled: true },
  { id: '27', text: 'Pitch a new Olympic sport that combines chess and an outdoor physical activity.', category: 'Creativity', enabled: true },
  { id: '28', text: 'Create a slogan and logo concept in the air for a café that serves warm soup in edible bowls.', category: 'Creativity', enabled: true },

  // Critical thinking
  { id: '29', text: 'Defend the worst superpower you can think of and explain how it could actually save the day.', category: 'Critical thinking', enabled: true },
  { id: '30', text: 'Identify three unintended positive consequences if humans no longer needed to sleep.', category: 'Critical thinking', enabled: true },
  { id: '31', text: 'Propose a fair solution for sharing a single laptop among 5 students with deadlines at 5 PM.', category: 'Critical thinking', enabled: true },
  { id: '32', text: 'Evaluate whether AI should be allowed to referee professional Olympic sports matches.', category: 'Critical thinking', enabled: true },
  { id: '33', text: 'Analyze why ancient architecture like the Roman aqueducts stood for millennia without modern software.', category: 'Critical thinking', enabled: true },
  { id: '34', text: 'You have 3 boxes labeled Apples, Oranges, and Mixed. All labels are wrong. How do you fix them picking 1 fruit?', category: 'Critical thinking', enabled: true },
  { id: '35', text: 'Propose a creative campus rule that would boost overall student happiness by 50%.', category: 'Critical thinking', enabled: true },

  // Quick thinking
  { id: '36', text: 'Name 5 things you cannot bring on a commercial airplane in under 10 seconds.', category: 'Quick thinking', enabled: true },
  { id: '37', text: 'Rapidly list 7 red objects you can find in a standard classroom or home within 10 seconds.', category: 'Quick thinking', enabled: true },
  { id: '38', text: 'Name 5 world capital cities in under 8 seconds.', category: 'Quick thinking', enabled: true },
  { id: '39', text: 'List 6 items found in a kitchen that do not require electricity in 10 seconds.', category: 'Quick thinking', enabled: true },
  { id: '40', text: 'Spell the word "COMMUNICATION" backwards as fast as you can.', category: 'Quick thinking', enabled: true },
  { id: '41', text: 'Name 5 ocean mammals within 7 seconds.', category: 'Quick thinking', enabled: true },
  { id: '42', text: 'List 5 subjects you would study at an academy for time travelers in 10 seconds.', category: 'Quick thinking', enabled: true },

  // Icebreakers
  { id: '43', text: 'Find someone in the room who shares your favorite cuisine or dish.', category: 'Icebreakers', enabled: true },
  { id: '44', text: 'Share your most amusing or harmless hidden talent with your table.', category: 'Icebreakers', enabled: true },
  { id: '45', text: 'If you could instantly master any musical instrument overnight, which would you pick and why?', category: 'Icebreakers', enabled: true },
  { id: '46', text: 'Mention one book, podcast, or documentary that genuinely changed your perspective on life.', category: 'Icebreakers', enabled: true },
  { id: '47', text: 'Share the story behind your favorite pair of shoes or item of clothing.', category: 'Icebreakers', enabled: true },
  { id: '48', text: 'If you could visit any historic era for 24 hours safely, where and when would you go?', category: 'Icebreakers', enabled: true },
  { id: '49', text: 'What is one habit or routine that always puts you in a productive mood?', category: 'Icebreakers', enabled: true },

  // Acting
  { id: '50', text: 'Act out your morning routine at 4x fast-forward speed.', category: 'Acting', enabled: true },
  { id: '51', text: 'Mime making a complex gourmet pizza from scratch without making a single sound.', category: 'Acting', enabled: true },
  { id: '52', text: 'Read the back of a snack wrapper or textbook cover as if it were a dramatic monologue.', category: 'Acting', enabled: true },
  { id: '53', text: 'Re-enact a famous movie scene using classroom stationery as props.', category: 'Acting', enabled: true },
  { id: '54', text: 'Pantomime getting caught in a sudden heavy rainstorm while holding a heavy box.', category: 'Acting', enabled: true },
  { id: '55', text: 'Silently act out a detective discovering a vital clue under a magnifying glass.', category: 'Acting', enabled: true },
  { id: '56', text: 'Perform a silent comedy skit where your umbrella keeps blowing inside out in heavy wind.', category: 'Acting', enabled: true },

  // Roleplay
  { id: '57', text: 'Roleplay a job interview where you are applying to be a professional dragon trainer.', category: 'Roleplay', enabled: true },
  { id: '58', text: 'Roleplay a customer returning an invisible clock because it keeps ticking backward.', category: 'Roleplay', enabled: true },
  { id: '59', text: 'Roleplay two tour guides giving conflicting historical facts about a plain wooden chair.', category: 'Roleplay', enabled: true },
  { id: '60', text: 'Roleplay an astronaut calling mission control to report that their space garden grew a giant pumpkin.', category: 'Roleplay', enabled: true },
  { id: '61', text: 'Roleplay a hotel concierge helping a guest who only speaks in musical melodies.', category: 'Roleplay', enabled: true },
  { id: '62', text: 'Roleplay an art critic giving a profound analysis of a blank white sheet of paper.', category: 'Roleplay', enabled: true },
  { id: '63', text: 'Roleplay a museum curator explaining why a lost shoe belongs in the royal artifact gallery.', category: 'Roleplay', enabled: true },

  // Debate
  { id: '64', text: 'Debate: Are hot dogs considered sandwiches? You have 60 seconds to state your case.', category: 'Debate', enabled: true },
  { id: '65', text: 'Debate: Would you rather have the ability to teleport anywhere or read minds?', category: 'Debate', enabled: true },
  { id: '66', text: 'Debate: Is physical paper superior to digital tablet screens for taking lecture notes?', category: 'Debate', enabled: true },
  { id: '67', text: 'Debate: Should university lectures start no earlier than 10:00 AM?', category: 'Debate', enabled: true },
  { id: '68', text: 'Debate: Is it better to be an early bird or a night owl for long-term academic success?', category: 'Debate', enabled: true },
  { id: '69', text: 'Debate: Should urban cities ban all personal cars in downtown centers in favor of public transit?', category: 'Debate', enabled: true },
  { id: '70', text: 'Debate: Is audiobook listening equivalent to reading a physical book?', category: 'Debate', enabled: true },

  // Humor
  { id: '71', text: 'Pitch a blockbuster movie concept starring a heroic potato.', category: 'Humor', enabled: true },
  { id: '72', text: 'Apologize profusely to an inanimate classroom chair for bumping into it.', category: 'Humor', enabled: true },
  { id: '73', text: 'Sing the alphabet song using your most dramatic operatic opera voice.', category: 'Humor', enabled: true },
  { id: '74', text: 'Dramatically announce your entrance into the classroom as if entering a championship boxing ring.', category: 'Humor', enabled: true },
  { id: '75', text: 'Create a fake commercial advertisement for invisible socks.', category: 'Humor', enabled: true },
  { id: '76', text: 'Give a 30-second weather forecast for a planet where it rains warm maple syrup.', category: 'Humor', enabled: true },
  { id: '77', text: 'Explain to your team why a rubber duck should be elected president of the student council.', category: 'Humor', enabled: true }
];

