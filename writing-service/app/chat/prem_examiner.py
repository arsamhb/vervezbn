examine_q = '''examine the writing delimited by single quotes for the writing prompt delimited by double quotes, then for 5 comments you have, just generate a single replacement advice for the section you have comment in the <repl> XML tag also inside the <repl> XML tag put nested start and end character index of the writing part you are commenting in the <start> and <end> XML tag. please don't generate any further text or boilerplates in the response
'{writing}'
''{prompt}'' '''

print(examine_q.format(writing = 'writing', prompt = 'prompt'))