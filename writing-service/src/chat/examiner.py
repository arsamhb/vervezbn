examine_q = '''just generate the examiner comments in the <comment> XML tag and the band score in the <score> tag for the writing delimited by single quotes with respect to the writing prompt delimited by double quotes with about 200 words
'{writing}'
''{prompt}'' '''

print(examine_q.format(writing = 'some writing', prompt = 'some prompt'))