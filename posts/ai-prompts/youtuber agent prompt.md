hey snappo I want you to create me an agent who will be my youtube helper

create a youtube agent using the example from https://github.com/digitalknk/openclaw-runbook/blob/main/examples/agent-prompts.md
- make a config like the example config on that github repository
- use openai-codex 5.3 as the primary, then opus 4.6, sonnet, and haiku as fallbacks, because we will be using tool calls I think — please let me know if there’s a different prioritization you might suggest
- save the prompt to workspace/agents/youtuber.md

here’s some of the stuff i want you to do, create the responsibilities, approach, constraints, output format from these guidelines. Let’s work together on this, so please give me some back and forth if you need it

you will help me post and publish videos in YouTube studio under my brand account frankthetankjj, under my google account frankchen07

i have a certain way of processing these videos, ideally, what i want to happen:

1. i drop the video files into a folder
2. for each jiujitsu session, i usually take two videos, but sometimes there is only one. 
3. based on the video metadata, i usually rename the .mov file to YYYYMMDD-[day of the week][morning/afternoon/night]-[10psj/10psm] depending on where i am — so it might look something like 20260318-mondaynight-10psj-rolling-footage-view2.mov or 20260304-wednesdaymorning-10psm-rolling-footage-view1.mov
4. you can tell from the video metadata the day and time, if the start time is from 4am to 12pm, it’s morning, if it’s from 12pm to 6pm it’s afternoon and if it’s from 6pm to 12am, then it is night
5. i’m unsure how you might be able to recognize location, if there is location metadata, san mateo california is 10psm and san jose california is 10psj — maybe if were unsure, we can just put 10p and not worry about it
6. the next step after renaming is compressing the file - once we know the compressed file is good, we can temporarily trash the original file so we don’t eat up too much space, and the compressed file takes the name of the original file — it should be something like 20260318-mondaynight-10psj-rolling-footage-view2.mov, the size of the file will just be smaller
7. then i make a copy of the compressed file with no audio and append the label “ytready” to it — this goes to youtube studio, nnother copy of the compressed file with audio goes to an external hard drive that I can plug in
8. at this point, we have a bunch of videos that are being uploaded that have “ytready” suffixed (no audio), and the compressed videos (with audio) that have been saved on the hard drive
9. at this point, i need you to ask me if there was teaching footage here because it needs audio (or maybe you can ask earlier if you think it makes more computational sense), and i need to let you know which days and time they are so you can make another copy of those compressed videos with audio and rename them to YYYY-MM-DD-teaching-class-fc.mov
10. we then take those teaching videos and upload to youtube studio and also save a copy in the hard drive in a different location
11. we wipe the slate clean of any files that have been finished uploading or finished saving on the hard drive, and we’re ready for the next batch.

  this was a lot so please do intake it, and ask clarifying questions on what you might need, what i might need to setup, anything that’s not clear, and let’s create a plan on doing this together

---

[since this initial prompt, i've made additional micro-improvements to this process]

